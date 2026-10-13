"""Persistent data model and recurrence engine for a single to-do list.

One :class:`TodoPlusData` instance backs one Home Assistant config entry (one
todo list). It owns the persisted tasks plus the recurrence definitions and
implements the two recurrence modes described in :mod:`.recurrence`.

Terminology
-----------
* **item** -- a concrete task shown in the todo list. A recurring item is one
  materialised occurrence and carries a ``recurrence_id``.
* **recurrence** -- the definition (template + schedule) that materialises
  items. Fixed-mode definitions materialise items as calendar dates pass;
  after-completion definitions materialise the next item when the active one
  is completed.
"""

from __future__ import annotations

import logging
from collections.abc import Callable
from datetime import date, datetime, timedelta
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util
from homeassistant.util import uuid as uuid_util

from . import recurrence as rec
from .const import (
    DOMAIN,
    MAX_OUTSTANDING_FIXED,
    PRIORITY_NORMAL,
    PRIORITY_RANK,
    STORAGE_VERSION,
)

_LOGGER = logging.getLogger(__name__)

STATUS_NEEDS_ACTION = "needs_action"
STATUS_COMPLETED = "completed"


def _date_to_str(value: date | None) -> str | None:
    return value.isoformat() if value is not None else None


def _str_to_date(value: str | None) -> date | None:
    if not value:
        return None
    # Tolerate stored datetimes by keeping only the date component.
    return date.fromisoformat(value[:10])


def _coerce_date(value: Any) -> date | None:
    """Coerce a value coming from a service call / HA into a plain date."""
    if value is None:
        return None
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    if isinstance(value, str):
        return _str_to_date(value)
    raise ValueError(f"cannot interpret {value!r} as a date")


def _serialize_recurrence(definition: dict[str, Any]) -> dict[str, Any]:
    """Structured recurrence for the companion card (mirrors the input shape)."""
    if definition["mode"] == rec.MODE_FIXED:
        return {
            "mode": rec.MODE_FIXED,
            "freq": definition["freq"],
            "interval": definition.get("interval", 1),
            "byday": definition.get("byday"),
            "bymonthday": definition.get("bymonthday"),
            "bysetpos": definition.get("bysetpos"),
            "bymonth": definition.get("bymonth"),
            "count": definition.get("count"),
            "until": definition.get("until"),
        }
    return {
        "mode": rec.MODE_AFTER_COMPLETION,
        "interval": definition["interval"],
        "unit": definition["unit"],
    }


class TodoPlusData:
    """Owns the tasks and recurrence definitions for one list."""

    def __init__(self, hass: HomeAssistant, entry_id: str) -> None:
        self._hass = hass
        self._store: Store = Store(hass, STORAGE_VERSION, f"{DOMAIN}.{entry_id}")
        self._items: list[dict[str, Any]] = []
        self._recurrences: dict[str, dict[str, Any]] = {}
        self._listeners: list[Callable[[], None]] = []

    # ------------------------------------------------------------------ #
    # Persistence
    # ------------------------------------------------------------------ #
    async def async_load(self) -> None:
        data = await self._store.async_load()
        if data:
            self._items = data.get("items", [])
            self._recurrences = data.get("recurrences", {})

    @callback
    def _persist(self) -> None:
        self._store.async_delay_save(
            lambda: {"items": self._items, "recurrences": self._recurrences}, 1.0
        )

    @callback
    def add_listener(self, listener: Callable[[], None]) -> Callable[[], None]:
        """Register a callback fired whenever the data changes."""
        self._listeners.append(listener)

        def _remove() -> None:
            self._listeners.remove(listener)

        return _remove

    @callback
    def _changed(self) -> None:
        self._persist()
        for listener in self._listeners:
            listener()

    # ------------------------------------------------------------------ #
    # Reads
    # ------------------------------------------------------------------ #
    @callback
    def visible_items(self, today: date) -> list[dict[str, Any]]:
        """Items to show in the list: completed ones, and pending ones whose
        start date has arrived (or which have no start date).

        Ordered by priority (high first, low last); the manual/insertion order
        is preserved within each priority level (stable sort)."""
        result = []
        for item in self._items:
            if item["status"] == STATUS_COMPLETED:
                result.append(item)
                continue
            start = _str_to_date(item.get("start"))
            if start is None or start <= today:
                result.append(item)
        result.sort(
            key=lambda i: PRIORITY_RANK.get(i.get("priority", PRIORITY_NORMAL), 1)
        )
        return result

    def _find_item(self, uid: str) -> dict[str, Any] | None:
        return next((i for i in self._items if i["uid"] == uid), None)

    @callback
    def export_tasks(self) -> list[dict[str, Any]]:
        """Full task data for the companion Lovelace card, including the fields
        the standard todo API can't carry (start date, priority, recurrence)."""
        out = []
        for item in self._items:
            rid = item.get("recurrence_id")
            definition = self._recurrences.get(rid) if rid else None
            out.append(
                {
                    "uid": item["uid"],
                    "summary": item["summary"],
                    "description": item.get("description"),
                    "status": item["status"],
                    "due": item.get("due"),
                    "start": item.get("start"),
                    "priority": item.get("priority", PRIORITY_NORMAL),
                    "assignee": item.get("assignee"),
                    "recurrence": (
                        _serialize_recurrence(definition) if definition else None
                    ),
                }
            )
        return out

    @callback
    def resolve_uid(self, item_or_uid: str) -> str | None:
        """Resolve a service ``item`` argument (a uid or a summary) to a uid."""
        if self._find_item(item_or_uid) is not None:
            return item_or_uid
        # Fall back to matching by summary (prefer pending items).
        matches = [i for i in self._items if i["summary"] == item_or_uid]
        if not matches:
            return None
        pending = [i for i in matches if i["status"] != STATUS_COMPLETED]
        return (pending or matches)[0]["uid"]

    # ------------------------------------------------------------------ #
    # Basic mutations (used by the built-in todo services / UI)
    # ------------------------------------------------------------------ #
    @callback
    def add_item(
        self,
        summary: str,
        *,
        description: str | None = None,
        due: date | None = None,
        start: date | None = None,
        priority: str = PRIORITY_NORMAL,
        assignee: str | None = None,
    ) -> str:
        uid = uuid_util.random_uuid_hex()
        self._items.append(
            {
                "uid": uid,
                "summary": summary,
                "description": description,
                "status": STATUS_NEEDS_ACTION,
                "due": _date_to_str(due),
                "start": _date_to_str(start),
                "priority": priority,
                "assignee": assignee or None,
                "recurrence_id": None,
                "completed_on": None,
            }
        )
        self._changed()
        return uid

    @callback
    def update_item(
        self,
        uid: str,
        *,
        summary: str | None = None,
        description: str | None = None,
        due: date | None = None,
        status: str | None = None,
        assignee: str | None = None,
        today: date,
    ) -> None:
        item = self._find_item(uid)
        if item is None:
            raise KeyError(uid)

        if summary is not None:
            item["summary"] = summary
        if description is not None:
            item["description"] = description
        if due is not None:
            item["due"] = _date_to_str(due)
        if assignee is not None:
            # Empty string clears the assignee.
            item["assignee"] = assignee or None

        if status is not None and status != item["status"]:
            self._apply_status_change(item, status, today)

        # Keep the recurrence template in sync with manual edits so future
        # occurrences inherit the latest values.
        rid = item.get("recurrence_id")
        if rid and rid in self._recurrences and (
            summary is not None or description is not None or assignee is not None
        ):
            definition = self._recurrences[rid]
            if summary is not None:
                definition["summary"] = summary
            if description is not None:
                definition["description"] = description
            if assignee is not None:
                definition["assignee"] = assignee or None

        self._changed()

    @callback
    def _apply_status_change(self, item: dict[str, Any], status: str, today: date) -> None:
        item["status"] = status
        if status == STATUS_COMPLETED:
            item["completed_on"] = _date_to_str(today)
            self._on_completed(item, today)
        else:
            item["completed_on"] = None
            self._on_uncompleted(item)

    @callback
    def delete_items(self, uids: list[str]) -> None:
        self._items = [i for i in self._items if i["uid"] not in uids]
        self._changed()

    @callback
    def clear_completed(self) -> int:
        """Remove all completed items. Returns how many were removed.

        Safe for recurring tasks: on completion each recurrence always keeps an
        active/pending occurrence, so clearing the completed history never makes
        a recurring task disappear."""
        before = len(self._items)
        self._items = [i for i in self._items if i["status"] != STATUS_COMPLETED]
        removed = before - len(self._items)
        if removed:
            self._changed()
        return removed

    @callback
    def move_item(self, uid: str, previous_uid: str | None) -> None:
        item = self._find_item(uid)
        if item is None:
            raise KeyError(uid)
        self._items.remove(item)
        if previous_uid is None:
            self._items.insert(0, item)
            self._changed()
            return
        for index, other in enumerate(self._items):
            if other["uid"] == previous_uid:
                self._items.insert(index + 1, item)
                break
        else:
            self._items.append(item)
        self._changed()

    # ------------------------------------------------------------------ #
    # Recurrence
    # ------------------------------------------------------------------ #
    @callback
    def create_task(
        self,
        summary: str,
        *,
        description: str | None,
        due: date | None,
        start: date | None,
        spec: dict[str, Any] | None,
        priority: str = PRIORITY_NORMAL,
        assignee: str | None = None,
        today: date,
    ) -> str:
        """Create a task, recurring if a recurrence ``spec`` is supplied."""
        if spec:
            anchor = start or due or today
            offset = (due - anchor).days if (due and anchor) else 0
            if offset < 0:
                offset = 0
            rid = self._create_recurrence(
                summary=summary,
                description=description,
                spec=spec,
                anchor=anchor,
                due_offset_days=offset,
                priority=priority,
                assignee=assignee,
                today=today,
            )
            self._changed()
            return rid
        return self.add_item(
            summary,
            description=description,
            due=due,
            start=start,
            priority=priority,
            assignee=assignee,
        )

    @callback
    def set_recurrence(
        self,
        uid: str,
        *,
        spec: dict[str, Any],
        start: date | None,
        today: date,
    ) -> None:
        """Turn an existing item into a recurring task and materialise it.

        If the item was already part of a recurrence, that old definition is
        dropped first (otherwise a stale fixed-mode definition would keep
        materialising occurrences forever)."""
        item = self._find_item(uid)
        if item is None:
            raise KeyError(uid)
        summary = item["summary"]
        description = item.get("description")
        priority = item.get("priority", PRIORITY_NORMAL)
        assignee = item.get("assignee")
        anchor = start or _str_to_date(item.get("start")) or _str_to_date(item.get("due")) or today
        due = _str_to_date(item.get("due"))
        offset = (due - anchor).days if due else 0
        if offset < 0:
            offset = 0
        # Drop any previous recurrence this item belonged to.
        old_rid = item.get("recurrence_id")
        if old_rid:
            self._drop_recurrence(old_rid)
        # Replace the ad-hoc item with the freshly materialised occurrence.
        if item in self._items:
            self._items.remove(item)
        self._create_recurrence(
            summary=summary,
            description=description,
            spec=spec,
            anchor=anchor,
            due_offset_days=offset,
            priority=priority,
            assignee=assignee,
            today=today,
        )
        self._changed()

    @callback
    def clear_recurrence(self, uid: str) -> None:
        """Stop a task recurring. Existing occurrences are kept as plain items."""
        item = self._find_item(uid)
        if item is None:
            raise KeyError(uid)
        rid = item.get("recurrence_id")
        if not rid:
            return
        self._drop_recurrence(rid)
        self._changed()

    @callback
    def _drop_recurrence(self, rid: str) -> None:
        """Remove a recurrence definition and unlink its occurrences."""
        self._recurrences.pop(rid, None)
        for other in self._items:
            if other.get("recurrence_id") == rid:
                other["recurrence_id"] = None

    @callback
    def set_start_date(self, uid: str, start: date | None) -> None:
        item = self._find_item(uid)
        if item is None:
            raise KeyError(uid)
        item["start"] = _date_to_str(start)
        self._changed()

    @callback
    def set_priority(self, uid: str, priority: str) -> None:
        item = self._find_item(uid)
        if item is None:
            raise KeyError(uid)
        item["priority"] = priority
        # Future occurrences of a recurring task inherit the new priority.
        rid = item.get("recurrence_id")
        if rid and rid in self._recurrences:
            self._recurrences[rid]["priority"] = priority
        self._changed()

    @callback
    def set_assignee(self, uid: str, assignee: str | None) -> None:
        item = self._find_item(uid)
        if item is None:
            raise KeyError(uid)
        item["assignee"] = assignee or None
        # Future occurrences of a recurring task inherit the new assignee.
        rid = item.get("recurrence_id")
        if rid and rid in self._recurrences:
            self._recurrences[rid]["assignee"] = assignee or None
        self._changed()

    @callback
    def _create_recurrence(
        self,
        *,
        summary: str,
        description: str | None,
        spec: dict[str, Any],
        anchor: date,
        due_offset_days: int,
        priority: str,
        assignee: str | None = None,
        today: date,
    ) -> str:
        rid = uuid_util.random_uuid_hex()
        mode = spec["mode"]
        definition: dict[str, Any] = {
            "id": rid,
            "summary": summary,
            "description": description,
            "mode": mode,
            "anchor": _date_to_str(anchor),
            "due_offset_days": due_offset_days,
            "priority": priority,
            "assignee": assignee or None,
            "seq": 0,
        }
        self._recurrences[rid] = definition

        if mode == rec.MODE_FIXED:
            definition.update(
                {
                    "freq": spec["freq"],
                    "interval": spec.get("interval") or 1,
                    "byday": spec.get("byday") or None,
                    "bymonthday": spec.get("bymonthday"),
                    "bysetpos": spec.get("bysetpos"),
                    "bymonth": spec.get("bymonth"),
                    "count": spec.get("count"),
                    "until": spec.get("until"),
                    "last_grid": None,
                }
            )
            rule = rec.build_rrule(definition, anchor)
            # Materialise the current period only (skip historical periods so a
            # back-dated anchor does not spam the list). Future periods appear
            # as their schedule dates pass; missed periods then stack.
            current = rec.latest_on_or_before(rule, today)
            if current is None:
                # The whole schedule is still in the future -- materialise its
                # first occurrence (hidden until its start) so the task exists.
                current = rec.first_occurrence(rule)
            if current is not None:
                self._materialize_fixed_date(definition, current)
                definition["last_grid"] = _date_to_str(current)
        else:  # after_completion
            definition.update({"interval": spec["interval"], "unit": spec["unit"]})
            # A single occurrence starting at the anchor.
            self._materialize_after_completion(definition, anchor)
        return rid

    @callback
    def _on_completed(self, item: dict[str, Any], today: date) -> None:
        rid = item.get("recurrence_id")
        if not rid:
            return
        definition = self._recurrences.get(rid)
        if definition is None:
            return
        # Record what this completion spawns so undoing it (_on_uncompleted) can
        # reverse the recurrence exactly, not just flip the status back.
        item["spawned_uid"] = None
        item.pop("prev_last_grid", None)
        if definition["mode"] == rec.MODE_AFTER_COMPLETION:
            # Next occurrence starts `interval` after the actual completion.
            next_start = rec.add_interval(today, definition["interval"], definition["unit"])
            item["spawned_uid"] = self._materialize_after_completion(definition, next_start)
        else:  # fixed
            # Calendar-driven: the next occurrence normally appears on its own
            # scheduled date (via async_daily_refresh). But if completing this
            # one leaves NO active occurrence, materialise the next schedule date
            # now (hidden until it arrives) so the recurring task stays visible
            # and editable, and survives "clear completed". Missed-period
            # stacking is handled independently by the daily refresh.
            has_active = any(
                i.get("recurrence_id") == rid and i["status"] != STATUS_COMPLETED
                for i in self._items
            )
            if not has_active:
                # Remember the schedule cursor so an undo can rewind it.
                item["prev_last_grid"] = definition.get("last_grid")
                rule = rec.build_rrule(definition, _str_to_date(definition["anchor"]))
                last_grid = _str_to_date(definition.get("last_grid"))
                nxt = (
                    rec.next_after(rule, last_grid)
                    if last_grid is not None
                    else rec.first_occurrence(rule)
                )
                if nxt is not None:  # None once a finite schedule is exhausted
                    item["spawned_uid"] = self._materialize_fixed_date(definition, nxt)
                    definition["last_grid"] = _date_to_str(nxt)

    @callback
    def _on_uncompleted(self, item: dict[str, Any]) -> None:
        """Reverse the recurrence side effects of a prior completion.

        Completing a recurring item spawns its successor (see _on_completed);
        undoing the completion must remove that successor so the task does not
        silently duplicate. Only an untouched *pending* successor is removed --
        if it has since been completed or otherwise acted on, its own history
        wins and the rewind is skipped."""
        spawned_uid = item.pop("spawned_uid", None)
        prev_last_grid = item.pop("prev_last_grid", None)
        if not spawned_uid:
            return
        spawned = self._find_item(spawned_uid)
        if spawned is None or spawned["status"] != STATUS_NEEDS_ACTION:
            return
        self._items.remove(spawned)
        rid = item.get("recurrence_id")
        definition = self._recurrences.get(rid) if rid else None
        if definition is not None and definition["mode"] == rec.MODE_FIXED:
            # Rewind the calendar cursor to where it stood before completion.
            definition["last_grid"] = prev_last_grid

    @callback
    def _materialize_fixed_date(self, definition: dict[str, Any], occurrence: date) -> str | None:
        uid = f"{definition['id']}:g{occurrence.isoformat()}"
        if self._find_item(uid) is not None:
            return None
        self._append_recurring_item(definition, uid, occurrence)
        return uid

    @callback
    def _materialize_after_completion(self, definition: dict[str, Any], start: date) -> str:
        definition["seq"] += 1
        uid = f"{definition['id']}:s{definition['seq']}"
        self._append_recurring_item(definition, uid, start)
        return uid

    @callback
    def _append_recurring_item(self, definition: dict[str, Any], uid: str, start: date) -> None:
        due_date = start
        offset = definition.get("due_offset_days")
        if offset:
            due_date = start + timedelta(days=offset)
        self._items.append(
            {
                "uid": uid,
                "summary": definition["summary"],
                "description": definition["description"],
                "status": STATUS_NEEDS_ACTION,
                "due": _date_to_str(due_date),
                "start": _date_to_str(start),
                "priority": definition.get("priority", PRIORITY_NORMAL),
                "assignee": definition.get("assignee"),
                "recurrence_id": definition["id"],
                "completed_on": None,
            }
        )

    @callback
    def async_daily_refresh(self, today: date) -> None:
        """Materialise newly-due fixed-mode occurrences. Called on startup and
        once a day. Pending items are revealed purely by the visibility filter,
        so this only needs to create the calendar-driven fixed occurrences."""
        changed = False
        for definition in self._recurrences.values():
            if definition["mode"] != rec.MODE_FIXED:
                continue
            anchor = _str_to_date(definition["anchor"])
            rule = rec.build_rrule(definition, anchor)
            target = rec.latest_on_or_before(rule, today)
            if target is None:
                continue  # whole schedule still in the future
            last_grid = _str_to_date(definition.get("last_grid"))
            if last_grid is not None and last_grid >= target:
                continue  # already caught up (or ahead, via a completion)
            outstanding = sum(
                1
                for i in self._items
                if i.get("recurrence_id") == definition["id"]
                and i["status"] != STATUS_COMPLETED
            )
            for occurrence in rec.iter_after_through(rule, last_grid, target):
                if outstanding >= MAX_OUTSTANDING_FIXED:
                    _LOGGER.warning(
                        "Fixed recurrence %s has %d outstanding occurrences; "
                        "skipping ahead to the current period without stacking more",
                        definition["summary"],
                        outstanding,
                    )
                    definition["last_grid"] = _date_to_str(target)
                    changed = True
                    break
                self._materialize_fixed_date(definition, occurrence)
                definition["last_grid"] = _date_to_str(occurrence)
                outstanding += 1
                changed = True
        # Always notify listeners so pending items reaching their start date are
        # revealed even when nothing was materialised.
        if changed:
            self._persist()
        for listener in self._listeners:
            listener()
