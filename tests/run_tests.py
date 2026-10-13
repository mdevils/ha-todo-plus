"""Dependency-free tests for the todo_plus recurrence engine and data model.

Run with:  python3 tests/run_tests.py

Home Assistant is not required. The store module's thin HA dependencies
(Store, callback, dt_util, uuid_util) are stubbed so the real recurrence and
task logic can be exercised directly.
"""

from __future__ import annotations

import importlib.util
import itertools
import os
import sys
import types
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PKG_DIR = os.path.join(ROOT, "custom_components", "todo_plus")


def _install_ha_stubs() -> None:
    def callback(fn):
        return fn

    core = types.ModuleType("homeassistant.core")
    core.HomeAssistant = object
    core.callback = callback

    storage = types.ModuleType("homeassistant.helpers.storage")

    class Store:
        def __init__(self, *a, **k):
            self._d = None

        async def async_load(self):
            return self._d

        def async_delay_save(self, fn, delay):
            self._d = fn()

    storage.Store = Store

    dtmod = types.ModuleType("homeassistant.util.dt")
    dtmod.now = lambda: None

    uuidmod = types.ModuleType("homeassistant.util.uuid")
    counter = itertools.count(1)
    uuidmod.random_uuid_hex = lambda: f"uid{next(counter):06d}"

    modules = {
        "homeassistant": types.ModuleType("homeassistant"),
        "homeassistant.core": core,
        "homeassistant.helpers": types.ModuleType("homeassistant.helpers"),
        "homeassistant.helpers.storage": storage,
        "homeassistant.util": types.ModuleType("homeassistant.util"),
        "homeassistant.util.dt": dtmod,
        "homeassistant.util.uuid": uuidmod,
    }
    sys.modules.update(modules)


def _load_pkg():
    pkg = types.ModuleType("todo_plus")
    pkg.__path__ = [PKG_DIR]
    sys.modules["todo_plus"] = pkg
    for sub in ("recurrence", "const", "store"):
        spec = importlib.util.spec_from_file_location(
            f"todo_plus.{sub}", os.path.join(PKG_DIR, f"{sub}.py")
        )
        module = importlib.util.module_from_spec(spec)
        sys.modules[f"todo_plus.{sub}"] = module
        spec.loader.exec_module(module)
    return sys.modules["todo_plus.recurrence"], sys.modules["todo_plus.store"], sys.modules["todo_plus.const"]


_PASS = 0


def check(cond, msg):
    global _PASS
    if not cond:
        raise AssertionError(f"FAIL: {msg}")
    _PASS += 1
    print(f"  ok  {msg}")


def pending(data, today):
    return [i for i in data.visible_items(today) if i["status"] == "needs_action"]


def test_recurrence(rec):
    print("\n[recurrence date math]")
    # after_completion helpers
    check(rec.add_months(date(2026, 1, 31), 1) == date(2026, 2, 28), "Jan31 +1mo -> Feb28")
    check(rec.add_months(date(2024, 1, 31), 1) == date(2024, 2, 29), "leap Feb29")
    check(rec.add_interval(date(2026, 2, 20), 1, "months") == date(2026, 3, 20), "after-completion +1mo")

    # fixed-mode RRULE helpers
    monthly = rec.build_rrule({"freq": "monthly", "interval": 1}, date(2026, 1, 31))
    # Jan 31 anchor: RRULE keeps the 31st and skips months without one (RRULE-correct).
    check(rec.latest_on_or_before(monthly, date(2026, 7, 22)) == date(2026, 5, 31),
          "monthly current = May 31 (Feb/Apr/Jun skipped)")
    biweekly = rec.build_rrule({"freq": "weekly", "interval": 2}, date(2026, 1, 1))
    check(rec.next_after(biweekly, date(2026, 1, 1)) == date(2026, 1, 15), "2-week next = Jan 15")
    third_tue = rec.build_rrule({"freq": "monthly", "byday": ["TU"], "bysetpos": 3}, date(2026, 1, 1))
    check(rec.first_occurrence(third_tue) == date(2026, 1, 20), "3rd Tuesday of Jan 2026 = 20th")
    mo_we = rec.build_rrule({"freq": "weekly", "byday": ["MO", "WE"]}, date(2026, 1, 1))
    got = list(rec.iter_after_through(mo_we, None, date(2026, 1, 12)))
    check(got == [date(2026, 1, 5), date(2026, 1, 7), date(2026, 1, 12)], f"Mon/Wed run: {got}")
    twice = rec.build_rrule({"freq": "daily", "count": 2}, date(2026, 1, 1))
    check(rec.next_after(twice, date(2026, 1, 2)) is None, "count=2 ends after the 2nd occurrence")
    until = rec.build_rrule({"freq": "daily", "until": "2026-01-03"}, date(2026, 1, 1))
    check(rec.latest_on_or_before(until, date(2026, 1, 9)) == date(2026, 1, 3), "until caps the schedule")


def test_fixed(store):
    print("\n[fixed mode: calendar-driven, stacks missed periods]")
    d = store.TodoPlusData(None, "fixed")
    d.create_task("Pay rent", description=None, due=None, start=date(2026, 1, 1),
                  spec={"mode": "fixed", "freq": "monthly", "interval": 1},
                  today=date(2026, 7, 22))
    vis = pending(d, date(2026, 7, 22))
    check(len(vis) == 1 and vis[0]["start"] == "2026-07-01", "current period only (no history spam)")

    d.async_daily_refresh(date(2026, 8, 1))
    check(len(pending(d, date(2026, 8, 1))) == 2, "unpaid July -> August stacks")

    aug = [i for i in pending(d, date(2026, 8, 1)) if i["start"] == "2026-08-01"][0]
    d.update_item(aug["uid"], status="completed", today=date(2026, 8, 3))
    d.async_daily_refresh(date(2026, 9, 1))
    starts = sorted(i["start"] for i in pending(d, date(2026, 9, 1)))
    check(starts == ["2026-07-01", "2026-09-01"], "completing Aug did not shift the grid")


def test_fixed_stays_editable(store):
    print("\n[fixed mode: complete + clear-completed keeps the task reachable]")
    d = store.TodoPlusData(None, "fix2")
    d.create_task("Pay rent", description=None, due=None, start=date(2026, 7, 1),
                  spec={"mode": "fixed", "freq": "monthly", "interval": 1},
                  today=date(2026, 7, 1))
    only = pending(d, date(2026, 7, 1))
    check(len(only) == 1, "one active occurrence")

    # Complete it while it is the sole occurrence...
    d.update_item(only[0]["uid"], status="completed", today=date(2026, 7, 5))
    # ...a future (pending) next occurrence must now exist so the task is not lost.
    active = [i for i in d._items if i["status"] != "completed"]
    check(len(active) == 1 and active[0]["start"] == "2026-08-01",
          "completion materialised the next occurrence (Aug 1, pending)")

    # Clearing completed history must NOT remove the recurring task.
    removed = d.clear_completed()
    check(removed == 1, "one completed item cleared")
    survivors = [i for i in d._items if i.get("recurrence_id")]
    check(len(survivors) == 1 and survivors[0]["start"] == "2026-08-01",
          "recurring task still present & editable after clear-completed")


def test_after_completion(store):
    print("\n[after_completion mode: relative to finishing]")
    d = store.TodoPlusData(None, "ac")
    d.create_task("Clean kettle", description="descale", due=None, start=date(2026, 1, 1),
                  spec={"mode": "after_completion", "interval": 1, "unit": "months"},
                  today=date(2026, 1, 1))
    vis = pending(d, date(2026, 1, 1))
    check(len(vis) == 1 and vis[0]["start"] == "2026-01-01", "one initial occurrence")

    d.update_item(vis[0]["uid"], status="completed", today=date(2026, 2, 20))
    nxt = [i for i in d._items if i["status"] == "needs_action"]
    check(len(nxt) == 1 and nxt[0]["start"] == "2026-03-20", "late finish Feb20 -> next Mar20 (full interval)")
    check(len(pending(d, date(2026, 3, 1))) == 0, "next hidden before its start date")
    check(len(pending(d, date(2026, 3, 20))) == 1, "next revealed on its start date")


def test_start_date_and_conversions(store, const):
    print("\n[start date + conversions + safety cap]")
    d = store.TodoPlusData(None, "misc")
    uid = d.add_item("Future task", start=date(2026, 8, 1))
    check(len(pending(d, date(2026, 7, 22))) == 0, "hidden before start date")
    check(len(pending(d, date(2026, 8, 1))) == 1, "visible on start date")

    # A hidden future-start task must still be resolvable and editable/completable
    # (the companion card edits these via todo_plus.update_task, not todo.update_item).
    check(d.resolve_uid(uid) == uid, "future-start task resolvable while hidden")
    d.update_item(uid, status="completed", today=date(2026, 7, 22))
    it = next(i for i in d._items if i["uid"] == uid)
    check(it["status"] == "completed", "future-start task completable while hidden")

    uid2 = d.add_item("Water plants", due=date(2026, 7, 25))
    d.set_recurrence(uid2, spec={"mode": "after_completion", "interval": 3, "unit": "days"},
                     start=date(2026, 7, 22), today=date(2026, 7, 22))
    vis = pending(d, date(2026, 7, 22))
    recurring = [i for i in vis if i["summary"] == "Water plants"]
    check(len(recurring) == 1 and recurring[0]["recurrence_id"], "set_recurrence converts item")

    d.clear_recurrence(recurring[0]["uid"])
    still = [i for i in d._items if i["summary"] == "Water plants"]
    check(all(i["recurrence_id"] is None for i in still), "clear_recurrence unlinks occurrences")

    d2 = store.TodoPlusData(None, "cap")
    d2.create_task("Ignored daily", description=None, due=None, start=date(2026, 1, 1),
                   spec={"mode": "fixed", "freq": "daily", "interval": 1},
                   today=date(2026, 1, 1))
    d2.async_daily_refresh(date(2027, 1, 1))
    outstanding = sum(1 for i in d2._items if i["status"] == "needs_action")
    check(outstanding <= const.MAX_OUTSTANDING_FIXED, f"fixed cap honoured ({outstanding})")


def test_priority(store):
    print("\n[priority: default normal, sorts high -> low]")
    d = store.TodoPlusData(None, "prio")
    low = d.add_item("Low task", priority="low")
    normal = d.add_item("Normal task")  # default
    high = d.add_item("High task", priority="high")
    order = [i["summary"] for i in d.visible_items(date(2026, 1, 1))]
    check(order == ["High task", "Normal task", "Low task"], f"sorted by priority: {order}")

    default_item = next(i for i in d._items if i["uid"] == normal)
    check(default_item["priority"] == "normal", "default priority is normal")

    d.set_priority(normal, "high")
    order = [i["summary"] for i in d.visible_items(date(2026, 1, 1))]
    # Both are now high (stable within level keeps list order); low stays last.
    check(set(order[:2]) == {"High task", "Normal task"} and order[2] == "Low task",
          "set_priority promotes above low; stable within level")

    # Recurring tasks inherit priority into future occurrences.
    d2 = store.TodoPlusData(None, "prio2")
    d2.create_task("Bills", description=None, due=None, start=date(2026, 1, 1),
                   spec={"mode": "after_completion", "interval": 1, "unit": "months"},
                   priority="high", today=date(2026, 1, 1))
    occ = d2.visible_items(date(2026, 1, 1))[0]
    check(occ["priority"] == "high", "recurring occurrence carries priority")
    d2.update_item(occ["uid"], status="completed", today=date(2026, 2, 1))
    nxt = next(i for i in d2._items if i["status"] == "needs_action")
    check(nxt["priority"] == "high", "next occurrence inherits priority")


def test_export_and_reset(store):
    print("\n[export_tasks + re-recurrence does not orphan a definition]")
    d = store.TodoPlusData(None, "exp")
    d.create_task("Rent", description="pay it", due=None, start=date(2026, 1, 1),
                  spec={"mode": "fixed", "freq": "monthly", "interval": 1},
                  priority="high", today=date(2026, 1, 1))
    exported = d.export_tasks()
    check(len(exported) == 1, "one task exported")
    t = exported[0]
    check(t["priority"] == "high" and t["start"] == "2026-01-01", "export carries priority + start")
    check(
        t["recurrence"] == {
            "mode": "fixed", "freq": "monthly", "interval": 1, "byday": None,
            "bymonthday": None, "bysetpos": None, "bymonth": None,
            "count": None, "until": None,
        },
        "export carries structured recurrence",
    )

    # Re-configure the same task's recurrence; the old fixed definition must not
    # linger and keep materialising.
    uid = exported[0]["uid"]
    d.set_recurrence(uid, spec={"mode": "fixed", "freq": "weekly", "interval": 2},
                     start=date(2026, 1, 1), today=date(2026, 1, 1))
    check(len(d._recurrences) == 1, "old recurrence definition dropped (no orphan)")
    d.async_daily_refresh(date(2026, 3, 1))
    active = [i for i in d._items if i["status"] == "needs_action"]
    # Only the current 2-week schedule should be producing tasks (not two grids).
    rids = {i.get("recurrence_id") for i in active}
    check(len(rids) == 1, f"single active schedule after reset ({len(rids)})")


def test_assignee(store):
    print("\n[assignee: optional, clearable, inherited by recurrences]")
    d = store.TodoPlusData(None, "asg")
    uid = d.add_item("Plain task")
    check(next(i for i in d._items if i["uid"] == uid)["assignee"] is None,
          "default assignee is None")

    d.set_assignee(uid, "Alice")
    check(d.export_tasks()[0]["assignee"] == "Alice", "set_assignee sets + exported")

    # Empty string clears.
    d.set_assignee(uid, "")
    check(next(i for i in d._items if i["uid"] == uid)["assignee"] is None,
          "empty assignee clears")

    # update_item empty string clears; a value sets.
    d.update_item(uid, assignee="Bob", today=date(2026, 1, 1))
    check(next(i for i in d._items if i["uid"] == uid)["assignee"] == "Bob",
          "update_item sets assignee")
    d.update_item(uid, assignee="", today=date(2026, 1, 1))
    check(next(i for i in d._items if i["uid"] == uid)["assignee"] is None,
          "update_item empty clears assignee")

    # Recurring occurrences inherit the assignee and propagate on change.
    d2 = store.TodoPlusData(None, "asg2")
    d2.create_task("Water plants", description=None, due=None, start=date(2026, 1, 1),
                   spec={"mode": "after_completion", "interval": 2, "unit": "days"},
                   assignee="Alice", today=date(2026, 1, 1))
    occ = d2.visible_items(date(2026, 1, 1))[0]
    check(occ["assignee"] == "Alice", "recurring occurrence carries assignee")
    d2.set_assignee(occ["uid"], "Bob")  # change on the occurrence
    d2.update_item(occ["uid"], status="completed", today=date(2026, 1, 1))
    nxt = next(i for i in d2._items if i["status"] == "needs_action")
    check(nxt["assignee"] == "Bob", "next occurrence inherits updated assignee")


def test_uncomplete(store):
    print("\n[uncomplete: reverses the spawned occurrence]")
    # after_completion: complete, then undo -> single active occurrence again,
    # the spawned successor removed.
    d = store.TodoPlusData(None, "unc_ac")
    d.create_task("Clean kettle", description=None, due=None, start=date(2026, 1, 1),
                  spec={"mode": "after_completion", "interval": 1, "unit": "months"},
                  today=date(2026, 1, 1))
    occ = pending(d, date(2026, 1, 1))[0]
    d.update_item(occ["uid"], status="completed", today=date(2026, 2, 20))
    check(len([i for i in d._items if i["status"] == "needs_action"]) == 1,
          "completion spawned exactly one successor")
    d.update_item(occ["uid"], status="needs_action", today=date(2026, 2, 20))
    actives = [i for i in d._items if i["status"] == "needs_action"]
    check(len(actives) == 1 and actives[0]["uid"] == occ["uid"],
          "undo removed the successor; original is active again")

    # fixed: completing the sole occurrence spawns the next; undo removes it and
    # rewinds the calendar cursor.
    d2 = store.TodoPlusData(None, "unc_fx")
    d2.create_task("Pay rent", description=None, due=None, start=date(2026, 7, 1),
                   spec={"mode": "fixed", "freq": "monthly", "interval": 1},
                   today=date(2026, 7, 1))
    only = pending(d2, date(2026, 7, 1))[0]
    grid_before = d2._recurrences[only["recurrence_id"]]["last_grid"]
    d2.update_item(only["uid"], status="completed", today=date(2026, 7, 5))
    check(len([i for i in d2._items if i["status"] != "completed"]) == 1,
          "fixed completion spawned the next occurrence")
    d2.update_item(only["uid"], status="needs_action", today=date(2026, 7, 5))
    survivors = [i for i in d2._items if i["status"] != "completed"]
    check(len(survivors) == 1 and survivors[0]["uid"] == only["uid"],
          "fixed undo removed the spawned occurrence")
    check(d2._recurrences[only["recurrence_id"]]["last_grid"] == grid_before,
          "fixed undo rewound the grid cursor")

    # Non-recurring uncomplete is a plain status flip.
    d3 = store.TodoPlusData(None, "unc_plain")
    uid = d3.add_item("One-off")
    d3.update_item(uid, status="completed", today=date(2026, 1, 1))
    d3.update_item(uid, status="needs_action", today=date(2026, 1, 1))
    it = next(i for i in d3._items if i["uid"] == uid)
    check(it["status"] == "needs_action" and it.get("completed_on") is None,
          "non-recurring uncomplete flips status cleanly")

    # Safety: a successor that was itself already completed must survive an undo
    # of the earlier occurrence (don't destroy real progress in a chain).
    d4 = store.TodoPlusData(None, "unc_chain")
    d4.create_task("Water plants", description=None, due=None, start=date(2026, 1, 1),
                   spec={"mode": "after_completion", "interval": 2, "unit": "days"},
                   today=date(2026, 1, 1))
    first = pending(d4, date(2026, 1, 1))[0]
    d4.update_item(first["uid"], status="completed", today=date(2026, 1, 1))
    second = next(i for i in d4._items if i["status"] == "needs_action")
    d4.update_item(second["uid"], status="completed", today=date(2026, 1, 3))
    d4.update_item(first["uid"], status="needs_action", today=date(2026, 1, 1))
    check(any(i["uid"] == second["uid"] for i in d4._items),
          "undo preserves a successor that was already acted on")


def main() -> int:
    _install_ha_stubs()
    rec, store, const = _load_pkg()
    test_recurrence(rec)
    test_fixed(store)
    test_fixed_stays_editable(store)
    test_after_completion(store)
    test_start_date_and_conversions(store, const)
    test_priority(store)
    test_export_and_reset(store)
    test_assignee(store)
    test_uncomplete(store)
    print(f"\nALL {_PASS} CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
