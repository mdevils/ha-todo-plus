import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';

import { Button } from '../components/button';
import { Checkbox } from '../components/checkbox';
import { DatePicker } from '../components/date-picker';
import { Dialog } from '../components/dialog';
import { PersonSelect } from '../components/person-select';
import { Row } from '../components/row';
import { Select, type SelectOption } from '../components/select';
import { TextField } from '../components/text-field';
import { PRIORITIES } from '../constants';
import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';
import { T } from '../providers/translations';
import type { Priority, Task } from '../types';
import {
  type RecurrenceDraft,
  recurrenceDraftFromTask,
  RecurrenceEditor,
} from './recurrence-editor';

export interface TaskDraft {
  summary: string;
  description: string;
  due: string;
  start: string;
  priority: Priority;
  assignee: string;
  recurring: boolean;
  recurrence: RecurrenceDraft;
}

export function draftFromTask(task?: Task): TaskDraft {
  return {
    summary: task?.summary ?? '',
    description: task?.description ?? '',
    due: task?.due ?? '',
    start: task?.start ?? '',
    priority: task?.priority ?? 'normal',
    assignee: task?.assignee ?? '',
    recurring: task?.recurrence != null,
    recurrence: recurrenceDraftFromTask(task?.recurrence),
  };
}

/** Add (no `task`) or edit (with `task`) a task. Presentational: collects a
 *  draft and emits it via `onSubmit`; the card layer maps it to services. */
export function TodoItemDialog({
  task,
  onSubmit,
  onClose,
  onDelete,
}: {
  task?: Task;
  onSubmit: (draft: TaskDraft) => void;
  onClose: () => void;
  onDelete?: () => void;
}) {
  const [draft, setDraft] = useState<TaskDraft>(() => draftFromTask(task));
  const patch = (values: Partial<TaskDraft>) => setDraft((prev) => ({ ...prev, ...values }));

  const isEdit = task != null;
  const canSave = draft.summary.trim().length > 0;

  const priorityOptions: SelectOption<Priority>[] = PRIORITIES.map((priority) => ({
    value: priority,
    label: <T token={`card.prio_${priority}`} />,
  }));

  return (
    <Dialog
      heading={<T token={isEdit ? 'card.edit_task' : 'card.new_task'} />}
      onClose={onClose}
      footer={
        <Fragment>
          {isEdit && onDelete && (
            <Button variant="danger" onClick={onDelete}>
              <T token="card.delete" />
            </Button>
          )}
          <Button onClick={onClose}>
            <T token="card.cancel" />
          </Button>
          <Button variant="primary" disabled={!canSave} onClick={() => onSubmit(draft)}>
            <T token="card.save" />
          </Button>
        </Fragment>
      }
    >
      <TextField
        label={<T token="card.name" />}
        value={draft.summary}
        onChange={(summary) => patch({ summary })}
        required
        autofocus
      />
      <TextField
        label={<T token="card.description" />}
        value={draft.description}
        onChange={(description) => patch({ description })}
        multiline
      />
      <Row>
        <Select
          label={<T token="card.priority" />}
          value={draft.priority}
          options={priorityOptions}
          onChange={(priority) => patch({ priority })}
        />
        <PersonSelect
          label={<T token="card.assignee" />}
          value={draft.assignee}
          onChange={(assignee) => patch({ assignee })}
        />
      </Row>
      <Row>
        <DatePicker
          label={<T token="card.start_date" />}
          value={draft.start}
          onChange={(start) => patch({ start })}
        />
        <DatePicker
          label={<T token="card.due_date" />}
          value={draft.due}
          onChange={(due) => patch({ due })}
        />
      </Row>

      <label class="recurrence-toggle">
        <Checkbox checked={draft.recurring} onChange={(recurring) => patch({ recurring })} />
        <T token="card.recurring" />
      </label>

      {draft.recurring && (
        <RecurrenceEditor
          value={draft.recurrence}
          onPatch={(p) => patch({ recurrence: { ...draft.recurrence, ...p } })}
        />
      )}
    </Dialog>
  );
}

registerCss(css`
  .recurrence-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    font-size: 0.9rem;
  }
`);
