"""To-do platform for the Todo Plus integration.

Each config entry becomes one :class:`TodoPlusListEntity`, which surfaces the
list in the normal Home Assistant to-do UI and routes the built-in ``todo.*``
services (create/update/delete/move) to the underlying :class:`TodoPlusData`.

Because the to-do frontend cannot edit start dates or recurrence, those are
exposed as entity services (``todo_plus.create_task``, ``set_recurrence``,
``clear_recurrence``, ``set_start_date``) registered here.
"""

from __future__ import annotations

from datetime import date, datetime
from typing import Any

import voluptuous as vol

from homeassistant.components.todo import (
    TodoItem,
    TodoItemStatus,
    TodoListEntity,
    TodoListEntityFeature,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv, entity_platform
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.event import async_track_time_change
from homeassistant.util import dt as dt_util

from . import recurrence as rec
from .const import (
    ATTR_ASSIGNEE,
    ATTR_BYDAY,
    ATTR_BYMONTH,
    ATTR_BYMONTHDAY,
    ATTR_BYSETPOS,
    ATTR_COUNT,
    ATTR_DESCRIPTION,
    ATTR_DUE_DATE,
    ATTR_FREQ,
    ATTR_INTERVAL,
    ATTR_ITEM,
    ATTR_MODE,
    ATTR_PRIORITY,
    ATTR_START_DATE,
    ATTR_STATUS,
    ATTR_SUMMARY,
    ATTR_UID,
    ATTR_UNIT,
    ATTR_UNTIL,
    DOMAIN,
    PRIORITIES,
    PRIORITY_NORMAL,
    SERVICE_CLEAR_COMPLETED,
    SERVICE_CLEAR_RECURRENCE,
    SERVICE_CREATE_TASK,
    SERVICE_DELETE_TASK,
    SERVICE_SET_ASSIGNEE,
    SERVICE_SET_PRIORITY,
    SERVICE_SET_RECURRENCE,
    SERVICE_SET_START_DATE,
    SERVICE_UPDATE_TASK,
)
from .store import STATUS_COMPLETED, STATUS_NEEDS_ACTION, TodoPlusData

# Shared recurrence fields (all optional). `mode` selects which subset applies:
# `after_completion` uses interval+unit; `fixed` uses the RRULE fields.
_RECURRENCE_FIELDS = {
    vol.Optional(ATTR_INTERVAL): vol.All(vol.Coerce(int), vol.Range(min=1)),
    vol.Optional(ATTR_UNIT): vol.In(rec.UNITS),
    vol.Optional(ATTR_FREQ): vol.In(rec.FREQS),
    vol.Optional(ATTR_BYDAY): vol.All(cv.ensure_list, [vol.In(rec.WEEKDAYS)]),
    vol.Optional(ATTR_BYMONTHDAY): vol.All(vol.Coerce(int), vol.Range(min=-31, max=31)),
    vol.Optional(ATTR_BYSETPOS): vol.All(vol.Coerce(int), vol.Range(min=-366, max=366)),
    vol.Optional(ATTR_BYMONTH): vol.All(vol.Coerce(int), vol.Range(min=1, max=12)),
    vol.Optional(ATTR_COUNT): vol.All(vol.Coerce(int), vol.Range(min=1)),
    vol.Optional(ATTR_UNTIL): cv.date,
}


def _build_recurrence_spec(
    *,
    mode: str | None,
    interval: int | None,
    unit: str | None,
    freq: str | None,
    byday: list[str] | None,
    bymonthday: int | None,
    bysetpos: int | None,
    bymonth: int | None,
    count: int | None,
    until: date | None,
) -> dict[str, Any] | None:
    """Validate and normalise recurrence fields into a store spec.

    Returns ``None`` when no recurrence was requested at all (create_task with
    a plain task). Raises :class:`ServiceValidationError` on invalid combos.
    """
    has_fixed = any(
        value is not None
        for value in (freq, byday, bymonthday, bysetpos, bymonth, count, until)
    )
    if mode is None and unit is None and interval is None and not has_fixed:
        return None
    if mode is None:
        raise ServiceValidationError("'mode' is required to configure a recurrence")

    if mode == rec.MODE_AFTER_COMPLETION:
        if not unit:
            raise ServiceValidationError("after_completion recurrence requires 'unit'")
        return {"mode": mode, "interval": interval or 1, "unit": unit}

    # fixed (RRULE)
    if not freq:
        raise ServiceValidationError("fixed recurrence requires 'freq'")
    if bymonthday == 0 or bysetpos == 0:
        raise ServiceValidationError("'bymonthday' / 'bysetpos' must be non-zero")
    return {
        "mode": mode,
        "freq": freq,
        "interval": interval or 1,
        "byday": byday or None,
        "bymonthday": bymonthday,
        "bysetpos": bysetpos,
        "bymonth": bymonth,
        "count": count,
        "until": until.isoformat() if until else None,
    }


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the to-do list for a config entry."""
    data: TodoPlusData = hass.data[DOMAIN][entry.entry_id]
    async_add_entities([TodoPlusListEntity(data, entry.entry_id, entry.title)])

    platform = entity_platform.async_get_current_platform()

    platform.async_register_entity_service(
        SERVICE_CREATE_TASK,
        {
            vol.Required(ATTR_SUMMARY): cv.string,
            vol.Optional(ATTR_DESCRIPTION): cv.string,
            vol.Optional(ATTR_DUE_DATE): cv.date,
            vol.Optional(ATTR_PRIORITY): vol.In(PRIORITIES),
            vol.Optional(ATTR_ASSIGNEE): cv.string,
            vol.Optional(ATTR_START_DATE): cv.date,
            vol.Optional(ATTR_MODE): vol.In(rec.MODES),
            **_RECURRENCE_FIELDS,
        },
        "async_create_task",
    )
    platform.async_register_entity_service(
        SERVICE_SET_RECURRENCE,
        {
            vol.Optional(ATTR_ITEM): cv.string,
            vol.Optional(ATTR_UID): cv.string,
            vol.Optional(ATTR_START_DATE): cv.date,
            vol.Required(ATTR_MODE): vol.In(rec.MODES),
            **_RECURRENCE_FIELDS,
        },
        "async_set_recurrence",
    )
    platform.async_register_entity_service(
        SERVICE_CLEAR_RECURRENCE,
        {
            vol.Optional(ATTR_ITEM): cv.string,
            vol.Optional(ATTR_UID): cv.string,
        },
        "async_clear_recurrence",
    )
    platform.async_register_entity_service(
        SERVICE_SET_START_DATE,
        {
            vol.Optional(ATTR_ITEM): cv.string,
            vol.Optional(ATTR_UID): cv.string,
            vol.Optional(ATTR_START_DATE): cv.date,
        },
        "async_set_start_date",
    )
    platform.async_register_entity_service(
        SERVICE_SET_PRIORITY,
        {
            vol.Optional(ATTR_ITEM): cv.string,
            vol.Optional(ATTR_UID): cv.string,
            vol.Required(ATTR_PRIORITY): vol.In(PRIORITIES),
        },
        "async_set_priority",
    )
    platform.async_register_entity_service(
        SERVICE_DELETE_TASK,
        {
            vol.Optional(ATTR_ITEM): cv.string,
            vol.Optional(ATTR_UID): cv.string,
        },
        "async_delete_task",
    )
    platform.async_register_entity_service(
        SERVICE_UPDATE_TASK,
        {
            vol.Optional(ATTR_ITEM): cv.string,
            vol.Optional(ATTR_UID): cv.string,
            vol.Optional(ATTR_SUMMARY): cv.string,
            vol.Optional(ATTR_DESCRIPTION): cv.string,
            vol.Optional(ATTR_DUE_DATE): cv.date,
            vol.Optional(ATTR_STATUS): vol.In([STATUS_NEEDS_ACTION, STATUS_COMPLETED]),
            vol.Optional(ATTR_ASSIGNEE): cv.string,
        },
        "async_update_task",
    )
    platform.async_register_entity_service(
        SERVICE_CLEAR_COMPLETED,
        {},
        "async_clear_completed",
    )
    platform.async_register_entity_service(
        SERVICE_SET_ASSIGNEE,
        {
            vol.Optional(ATTR_ITEM): cv.string,
            vol.Optional(ATTR_UID): cv.string,
            vol.Optional(ATTR_ASSIGNEE): cv.string,
        },
        "async_set_assignee",
    )


def _to_todo_status(status: str) -> TodoItemStatus:
    return (
        TodoItemStatus.COMPLETED
        if status == STATUS_COMPLETED
        else TodoItemStatus.NEEDS_ACTION
    )


class TodoPlusListEntity(TodoListEntity):
    """A Todo Plus list exposed as a to-do entity."""

    _attr_has_entity_name = False
    _attr_should_poll = False
    # The full task list is large and changes often; keep it out of the recorder.
    _unrecorded_attributes = frozenset({"tasks"})
    _attr_supported_features = (
        TodoListEntityFeature.CREATE_TODO_ITEM
        | TodoListEntityFeature.DELETE_TODO_ITEM
        | TodoListEntityFeature.UPDATE_TODO_ITEM
        | TodoListEntityFeature.MOVE_TODO_ITEM
        | TodoListEntityFeature.SET_DUE_DATE_ON_ITEM
        | TodoListEntityFeature.SET_DESCRIPTION_ON_ITEM
    )

    def __init__(self, data: TodoPlusData, entry_id: str, name: str) -> None:
        self._data = data
        self._attr_name = name
        self._attr_unique_id = entry_id

    # ------------------------------------------------------------------ #
    # Lifecycle
    # ------------------------------------------------------------------ #
    async def async_added_to_hass(self) -> None:
        """Register listeners and catch up any missed fixed occurrences."""
        self.async_on_remove(self._data.add_listener(self._data_changed))
        self.async_on_remove(
            async_track_time_change(
                self.hass, self._handle_midnight, hour=0, minute=0, second=10
            )
        )
        # Catch up occurrences that came due while Home Assistant was stopped.
        self._data.async_daily_refresh(self._today)

    @callback
    def _handle_midnight(self, _now) -> None:
        self._data.async_daily_refresh(self._today)

    @callback
    def _data_changed(self) -> None:
        if self.hass is None:
            return
        self.async_write_ha_state()
        self.async_update_listeners()

    @property
    def _today(self) -> date:
        return dt_util.now().date()

    # ------------------------------------------------------------------ #
    # To-do list read
    # ------------------------------------------------------------------ #
    @property
    def extra_state_attributes(self) -> dict[str, object]:
        # Exposes start date, priority and recurrence for the companion card,
        # which the standard todo item model cannot carry.
        return {"tasks": self._data.export_tasks()}

    @property
    def todo_items(self) -> list[TodoItem]:
        items = []
        for item in self._data.visible_items(self._today):
            due = item.get("due")
            items.append(
                TodoItem(
                    uid=item["uid"],
                    summary=item["summary"],
                    status=_to_todo_status(item["status"]),
                    due=date.fromisoformat(due) if due else None,
                    description=item.get("description"),
                )
            )
        return items

    # ------------------------------------------------------------------ #
    # Built-in todo.* services
    # ------------------------------------------------------------------ #
    async def async_create_todo_item(self, item: TodoItem) -> None:
        self._data.add_item(
            item.summary or "",
            description=item.description,
            due=self._coerce(item.due),
        )

    async def async_update_todo_item(self, item: TodoItem) -> None:
        # `status` may arrive as a TodoItemStatus enum or a plain string
        # depending on the HA version; normalise to our string form.
        status = item.status
        if status is not None:
            status = getattr(status, "value", status)
        self._data.update_item(
            item.uid,
            summary=item.summary,
            description=item.description,
            due=self._coerce(item.due),
            status=status,
            today=self._today,
        )

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        self._data.delete_items(uids)

    async def async_move_todo_item(
        self, uid: str, previous_uid: str | None = None
    ) -> None:
        self._data.move_item(uid, previous_uid)

    # ------------------------------------------------------------------ #
    # todo_plus.* entity services
    # ------------------------------------------------------------------ #
    async def async_create_task(
        self,
        summary: str,
        description: str | None = None,
        due_date: date | None = None,
        start_date: date | None = None,
        mode: str | None = None,
        interval: int | None = None,
        unit: str | None = None,
        freq: str | None = None,
        byday: list[str] | None = None,
        bymonthday: int | None = None,
        bysetpos: int | None = None,
        bymonth: int | None = None,
        count: int | None = None,
        until: date | None = None,
        priority: str = PRIORITY_NORMAL,
        assignee: str | None = None,
    ) -> None:
        spec = _build_recurrence_spec(
            mode=mode,
            interval=interval,
            unit=unit,
            freq=freq,
            byday=byday,
            bymonthday=bymonthday,
            bysetpos=bysetpos,
            bymonth=bymonth,
            count=count,
            until=until,
        )
        self._data.create_task(
            summary,
            description=description,
            due=due_date,
            start=start_date,
            spec=spec,
            priority=priority,
            assignee=assignee,
            today=self._today,
        )

    async def async_set_recurrence(
        self,
        mode: str,
        interval: int | None = None,
        unit: str | None = None,
        freq: str | None = None,
        byday: list[str] | None = None,
        bymonthday: int | None = None,
        bysetpos: int | None = None,
        bymonth: int | None = None,
        count: int | None = None,
        until: date | None = None,
        item: str | None = None,
        uid: str | None = None,
        start_date: date | None = None,
    ) -> None:
        spec = _build_recurrence_spec(
            mode=mode,
            interval=interval,
            unit=unit,
            freq=freq,
            byday=byday,
            bymonthday=bymonthday,
            bysetpos=bysetpos,
            bymonth=bymonth,
            count=count,
            until=until,
        )
        assert spec is not None  # mode is required by the schema
        self._data.set_recurrence(
            self._resolve(item, uid),
            spec=spec,
            start=start_date,
            today=self._today,
        )

    async def async_clear_recurrence(
        self, item: str | None = None, uid: str | None = None
    ) -> None:
        self._data.clear_recurrence(self._resolve(item, uid))

    async def async_set_start_date(
        self,
        start_date: date | None = None,
        item: str | None = None,
        uid: str | None = None,
    ) -> None:
        self._data.set_start_date(self._resolve(item, uid), start_date)

    async def async_set_priority(
        self,
        priority: str,
        item: str | None = None,
        uid: str | None = None,
    ) -> None:
        self._data.set_priority(self._resolve(item, uid), priority)

    async def async_set_assignee(
        self,
        item: str | None = None,
        uid: str | None = None,
        assignee: str | None = None,
    ) -> None:
        # No assignee provided clears it.
        self._data.set_assignee(self._resolve(item, uid), assignee)

    async def async_delete_task(
        self, item: str | None = None, uid: str | None = None
    ) -> None:
        self._data.delete_items([self._resolve(item, uid)])

    async def async_clear_completed(self) -> None:
        self._data.clear_completed()

    async def async_update_task(
        self,
        item: str | None = None,
        uid: str | None = None,
        summary: str | None = None,
        description: str | None = None,
        due_date: date | None = None,
        status: str | None = None,
        assignee: str | None = None,
    ) -> None:
        # Like todo.update_item, but resolves against ALL tasks (including
        # future-start ones hidden from the standard todo list), so the
        # companion card can edit/complete pending tasks too.
        self._data.update_item(
            self._resolve(item, uid),
            summary=summary,
            description=description,
            due=due_date,
            status=status,
            assignee=assignee,
            today=self._today,
        )

    # ------------------------------------------------------------------ #
    # Helpers
    # ------------------------------------------------------------------ #
    def _resolve(self, item: str | None, uid: str | None) -> str:
        target = uid or item
        if not target:
            raise ServiceValidationError("either 'uid' or 'item' must be provided")
        resolved = self._data.resolve_uid(target)
        if resolved is None:
            raise ServiceValidationError(f"no task matches {target!r}")
        return resolved

    @staticmethod
    def _coerce(due) -> date | None:
        if due is None:
            return None
        if isinstance(due, datetime):
            return due.date()
        return due
