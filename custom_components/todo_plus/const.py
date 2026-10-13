"""Constants for the todo_plus integration."""

from __future__ import annotations

DOMAIN = "todo_plus"
PLATFORMS = ["todo"]

STORAGE_VERSION = 1

# Config entry data keys
CONF_LIST_NAME = "name"

# Service names
SERVICE_CREATE_TASK = "create_task"
SERVICE_SET_RECURRENCE = "set_recurrence"
SERVICE_CLEAR_RECURRENCE = "clear_recurrence"
SERVICE_SET_START_DATE = "set_start_date"
SERVICE_SET_PRIORITY = "set_priority"
SERVICE_DELETE_TASK = "delete_task"
SERVICE_UPDATE_TASK = "update_task"
SERVICE_CLEAR_COMPLETED = "clear_completed"
SERVICE_SET_ASSIGNEE = "set_assignee"

# Priorities. Tasks default to normal; high sorts to the top, low to the bottom.
PRIORITY_LOW = "low"
PRIORITY_NORMAL = "normal"
PRIORITY_HIGH = "high"
PRIORITIES = (PRIORITY_HIGH, PRIORITY_NORMAL, PRIORITY_LOW)
# Sort rank (lower = higher up the list).
PRIORITY_RANK = {PRIORITY_HIGH: 0, PRIORITY_NORMAL: 1, PRIORITY_LOW: 2}

# Service / item field keys
ATTR_ITEM = "item"
ATTR_UID = "uid"
ATTR_SUMMARY = "summary"
ATTR_DESCRIPTION = "description"
ATTR_DUE_DATE = "due_date"
ATTR_START_DATE = "start_date"
ATTR_INTERVAL = "interval"
ATTR_UNIT = "unit"
ATTR_MODE = "mode"
# Fixed-mode (RRULE) fields.
ATTR_FREQ = "freq"
ATTR_BYDAY = "byday"
ATTR_BYMONTHDAY = "bymonthday"
ATTR_BYSETPOS = "bysetpos"
ATTR_BYMONTH = "bymonth"
ATTR_COUNT = "count"
ATTR_UNTIL = "until"
ATTR_PRIORITY = "priority"
ATTR_STATUS = "status"
ATTR_ASSIGNEE = "assignee"

# Safety cap: maximum number of outstanding (uncompleted) instances a single
# fixed-mode recurrence may generate before we stop materialising missed
# periods. Prevents runaway growth if a fixed task is ignored indefinitely.
MAX_OUTSTANDING_FIXED = 24
