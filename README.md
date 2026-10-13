# Todo Plus — a recurring to-do system for Home Assistant

`todo_plus` is a custom Home Assistant integration that replaces the built-in
local to-do system with one that understands **start dates** and **recurring
tasks** with two distinct recurrence strategies.

It is implemented as a standard `todo` platform, so your lists appear in
the normal Home Assistant **To-do** panel, the To-do List dashboard card, and
work with the built-in `todo.*` services and voice assistants. The extra
capabilities that the to-do frontend can't express (start dates, recurrence)
are driven through dedicated `todo_plus.*` services.

## Features

1. **Name + description** per task — like the built-in to-do.
2. **Due date** per task — like the built-in to-do.
3. **Start date** per task — the task stays hidden from the list until that date.
4. **Priority** per task — `low` / `normal` (default) / `high`. High-priority tasks sort to the top of the list, low to the bottom.
5. **Assignee** per task — optional free-text person responsible (the card suggests your `person.*` names). Inherited by recurring occurrences.
6. **Lists** — configured like the built-in local to-do (one config entry = one list).
7. **Recurring tasks** — define a start date and an interval of *N days / N weeks / N months*.
8. **Two recurrence modes** (per task):
   - **`fixed`** — occurrences follow a fixed calendar schedule anchored at the
     start date. Completing a task never shifts the schedule, and a new
     occurrence appears every time a scheduled date passes *regardless of
     whether the previous one was done*. Missed periods stack up.
     _Use for: "pay rent on the 1st", "submit VAT on the 5th"._
   - **`after_completion`** — the next occurrence is scheduled *interval* after
     you actually complete the current one. There is only ever one active
     occurrence, and delaying a completion delays the next one, so a fresh task
     never pops up right after you finished the previous one.
     _Use for: "clean the kettle once a month", "descale the coffee machine"._

## Installation

### HACS (recommended)
Add this repository as a custom repository in HACS (category: **Integration**),
install **Todo Plus**, and restart Home Assistant. The companion Lovelace card
is bundled with the integration and registered automatically — no manual
dashboard-resource step needed.

### Manual
Copy the `custom_components/todo_plus` folder into your Home Assistant
`config/custom_components/` directory and restart Home Assistant. (The card is
inside that folder and auto-registers.)

## Configuration

Go to **Settings → Devices & Services → Add Integration → Todo Plus**, and enter a
list name. Add the integration again for each additional list. Each list shows
up as a `todo.<list_name>` entity.

## Usage

### Simple tasks
Use the normal To-do UI / card, or the built-in `todo.add_item` service. These
support name, description and due date.

The `todo_plus.create_task` service form is deliberately simple: only **name**,
**description** and **due date** are shown up front. Start date, priority and
recurrence live in a collapsed **Advanced options** section, so quick tasks stay
quick.

### Priority

```yaml
service: todo_plus.set_priority
target:
  entity_id: todo.household
data:
  item: "Take out the bins"
  priority: high
```

Priority can also be set when creating a task (in the Advanced section). High
tasks sort to the top of the list, low to the bottom; within a priority level
the manual order is preserved. Recurring tasks pass their priority on to every
future occurrence.

### Tasks with a start date
A task with a start date is hidden until that date arrives.

```yaml
service: todo_plus.set_start_date
target:
  entity_id: todo.household
data:
  item: "Book summer holiday"
  start_date: "2026-04-01"
```

### Recurring tasks

Create a recurring task in one call:

```yaml
# "Pay rent" on the 1st of every month, fixed schedule.
service: todo_plus.create_task
target:
  entity_id: todo.finance
data:
  summary: "Pay rent"
  start_date: "2026-01-01"
  interval: 1
  unit: months
  mode: fixed
```

```yaml
# "Clean the kettle" every month, measured from when you finish it.
service: todo_plus.create_task
target:
  entity_id: todo.household
data:
  summary: "Clean the kettle"
  description: "Descale with citric acid"
  start_date: "2026-01-01"
  interval: 1
  unit: months
  mode: after_completion
```

Or turn an existing task into a recurring one:

```yaml
service: todo_plus.set_recurrence
target:
  entity_id: todo.household
data:
  item: "Water the plants"
  interval: 3
  unit: days
  mode: after_completion
```

Stop a task recurring (existing occurrences stay as plain tasks):

```yaml
service: todo_plus.clear_recurrence
target:
  entity_id: todo.household
data:
  item: "Water the plants"
```

## Rich editing UI: the companion Lovelace card

Home Assistant's built-in to-do card cannot show or edit start date, priority,
assignee or recurrence — it only knows name/description/due. Todo Plus ships a
**custom Lovelace card** with a full add/edit dialog for every field.

The card is **bundled inside the integration** and served + registered
automatically (`frontend.add_extra_js_url`), so there is **no manual resource
step**. Just add it to a dashboard:

```yaml
type: custom:todo-plus-card
entity: todo.dela_po_domu   # your Todo Plus list entity
title: Household tasks       # optional
show_completed: true         # optional (default true)
```

The card reads a `tasks` attribute the integration publishes (containing the
extra fields, excluded from the recorder) and edits via the `todo_plus.*`
services. After upgrading, hard-refresh the browser to bypass caching.

## Development

The card (Preact + TypeScript, bundled into the component) and the Python
integration, their conventions, build/lint commands, localization, and the
card↔backend contract are documented in **[CONTRIBUTING.md](CONTRIBUTING.md)**.

Translations live in one place per language —
`custom_components/todo_plus/translations/<lang>.json` — used by the integration
at runtime and imported into the card bundle at build time (no runtime loading).

## How recurrence behaves

| Situation | `fixed` | `after_completion` |
|---|---|---|
| Anchor + interval | occurrences on `anchor, anchor+interval, anchor+2·interval, …` | next = `completion_date + interval` |
| Complete early | schedule unchanged; next still on its grid date | next moves earlier (relative to finish) |
| Complete late / skip a period | each missed period appears as its own task (stacks) | only one active task; next appears a full interval after you finally finish |
| Reveal | occurrence hidden until its scheduled start date | next occurrence hidden until `completion + interval` |

Monthly schedules are day-clamped safely: a task anchored on Jan 31 recurs on
Feb 28/29, Mar 31, Apr 30, … always measured from the original anchor (no drift).

A safety cap (24) limits how many outstanding occurrences a single ignored
`fixed` task can accumulate.

## Services

| Service | Purpose |
|---|---|
| `todo_plus.create_task` | Create a task; recurring if `interval`+`unit`+`mode` are given. |
| `todo_plus.set_recurrence` | Make an existing task recurring / change its recurrence. |
| `todo_plus.clear_recurrence` | Stop a task recurring. |
| `todo_plus.set_start_date` | Set or clear a task's start date. |
| `todo_plus.set_priority` | Set a task's priority (low/normal/high). |
| `todo_plus.set_assignee` | Set or clear who a task is assigned to. |
| `todo_plus.update_task` | Update name/description/due/status/assignee (works on hidden future-start tasks too). |
| `todo_plus.delete_task` | Delete a task by name or uid. |
| `todo_plus.clear_completed` | Remove all completed tasks from a list. |

All standard `todo.*` services (`add_item`, `update_item`, `remove_completed_items`, …) also work.

## Development / tests

The recurrence math and the data model have no Home Assistant dependency in
their core logic and can be exercised directly:

```bash
python3 tests/run_tests.py
```
