"""Pure date-math helpers for the todo_plus recurrence engine.

This module has no Home Assistant dependencies so it can be unit tested in
isolation. It depends only on the standard library and ``python-dateutil``
(which Home Assistant already ships). Everything operates on
:class:`datetime.date`.

Two recurrence modes are supported:

* ``fixed`` -- occurrences fall on a fixed calendar schedule described by an
  iCalendar RRULE (``dateutil.rrule``), anchored at the start date
  (``DTSTART``). Completing an occurrence never shifts the schedule. A new
  occurrence becomes due every time a schedule date passes, regardless of
  whether the previous one was completed (missed periods stack). This suits
  obligations like "pay rent on the 1st" or "every 2nd Monday".

* ``after_completion`` -- the next occurrence is scheduled ``interval`` after
  the task is actually completed. Only ever one active occurrence at a time.
  Delaying a completion delays the next occurrence, so a new task never appears
  "too soon" after finishing the previous one. This suits recurring tasks like
  "clean the kettle once a month".
"""

from __future__ import annotations

import calendar
from collections.abc import Iterator, Mapping
from datetime import date, datetime, timedelta
from typing import Any

from dateutil.rrule import (
    DAILY,
    FR,
    MO,
    MONTHLY,
    SA,
    SU,
    TH,
    TU,
    WE,
    WEEKLY,
    YEARLY,
    rrule,
)

# -- after_completion: interval + unit ------------------------------------- #

UNIT_DAYS = "days"
UNIT_WEEKS = "weeks"
UNIT_MONTHS = "months"
UNITS = (UNIT_DAYS, UNIT_WEEKS, UNIT_MONTHS)

MODE_FIXED = "fixed"
MODE_AFTER_COMPLETION = "after_completion"
MODES = (MODE_FIXED, MODE_AFTER_COMPLETION)

# -- fixed: RRULE vocabulary ------------------------------------------------ #

FREQ_DAILY = "daily"
FREQ_WEEKLY = "weekly"
FREQ_MONTHLY = "monthly"
FREQ_YEARLY = "yearly"
FREQS = (FREQ_DAILY, FREQ_WEEKLY, FREQ_MONTHLY, FREQ_YEARLY)

# Weekday codes as used by iCalendar BYDAY.
WEEKDAYS = ("MO", "TU", "WE", "TH", "FR", "SA", "SU")

_FREQ_MAP = {
    FREQ_DAILY: DAILY,
    FREQ_WEEKLY: WEEKLY,
    FREQ_MONTHLY: MONTHLY,
    FREQ_YEARLY: YEARLY,
}
_WEEKDAY_MAP = {"MO": MO, "TU": TU, "WE": WE, "TH": TH, "FR": FR, "SA": SA, "SU": SU}


def add_months(start: date, months: int) -> date:
    """Add ``months`` calendar months to ``start``, clamping the day.

    Adding a month to Jan 31 yields Feb 28 (or 29). Used by the
    ``after_completion`` mode, which steps from the completion date.
    """
    month_index = start.month - 1 + months
    year = start.year + month_index // 12
    month = month_index % 12 + 1
    day = min(start.day, calendar.monthrange(year, month)[1])
    return date(year, month, day)


def add_interval(start: date, interval: int, unit: str) -> date:
    """Return ``start`` advanced by one ``interval`` of ``unit``."""
    if interval < 1:
        raise ValueError("interval must be >= 1")
    if unit == UNIT_DAYS:
        return start + timedelta(days=interval)
    if unit == UNIT_WEEKS:
        return start + timedelta(weeks=interval)
    if unit == UNIT_MONTHS:
        return add_months(start, interval)
    raise ValueError(f"unknown unit: {unit!r}")


def _to_dt(value: date) -> datetime:
    return datetime(value.year, value.month, value.day)


def build_rrule(spec: Mapping[str, Any], anchor: date) -> rrule:
    """Build a :class:`dateutil.rrule.rrule` from a fixed-mode ``spec``.

    ``spec`` carries the structured RRULE fields (``freq``, ``interval``,
    ``byday``, ``bymonthday``, ``bysetpos``, ``bymonth``, ``count``, ``until``);
    ``anchor`` is the ``DTSTART``. Occurrences are produced at midnight.
    """
    freq = _FREQ_MAP.get(spec["freq"])
    if freq is None:
        raise ValueError(f"unknown freq: {spec['freq']!r}")

    kwargs: dict[str, Any] = {
        "freq": freq,
        "interval": spec.get("interval") or 1,
        "dtstart": _to_dt(anchor),
    }

    byday = spec.get("byday")
    if byday:
        kwargs["byweekday"] = [_WEEKDAY_MAP[code] for code in byday]
    if spec.get("bymonthday") is not None:
        kwargs["bymonthday"] = spec["bymonthday"]
    if spec.get("bysetpos") is not None:
        kwargs["bysetpos"] = spec["bysetpos"]
    if spec.get("bymonth") is not None:
        kwargs["bymonth"] = spec["bymonth"]
    if spec.get("count") is not None:
        kwargs["count"] = spec["count"]

    until = spec.get("until")
    if until:
        until_date = until if isinstance(until, date) else date.fromisoformat(str(until)[:10])
        # Inclusive of the whole day so an occurrence on the until-date counts.
        kwargs["until"] = datetime(until_date.year, until_date.month, until_date.day, 23, 59, 59)

    return rrule(**kwargs)


def latest_on_or_before(rule: rrule, reference: date) -> date | None:
    """The latest occurrence with date <= ``reference`` (the "current" one)."""
    dt = rule.before(datetime(reference.year, reference.month, reference.day, 23, 59, 59), inc=True)
    return dt.date() if dt is not None else None


def first_occurrence(rule: rrule) -> date | None:
    """The first occurrence of ``rule`` (>= its DTSTART), or ``None`` if empty."""
    for dt in rule:
        return dt.date()
    return None


def next_after(rule: rrule, reference: date) -> date | None:
    """The first occurrence strictly after ``reference``, or ``None`` at the end."""
    dt = rule.after(_to_dt(reference), inc=False)
    return dt.date() if dt is not None else None


def iter_after_through(rule: rrule, after: date | None, through: date) -> Iterator[date]:
    """Yield occurrence dates in (``after``, ``through``].

    When ``after`` is ``None`` iteration starts at the first occurrence. Stops
    at (and excludes) the first date past ``through``.
    """
    iterator = rule.xafter(_to_dt(after), inc=False) if after is not None else iter(rule)
    for dt in iterator:
        occ = dt.date()
        if occ > through:
            return
        yield occ
