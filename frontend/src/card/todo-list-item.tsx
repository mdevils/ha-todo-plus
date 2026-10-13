import { h } from 'preact';

import { Badge } from '../components/badge';
import { Checkbox } from '../components/checkbox';
import { Icon } from '../components/icon';
import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';
import { useLocale } from '../providers/locale';
import { personName, usePersons } from '../providers/persons';
import { T, useTranslate } from '../providers/translations';
import { Task } from '../types';
import { formatShortDate } from '../utils/format';

export function TodoListItem({
  task,
  today,
  onToggle,
  onEdit,
}: {
  task: Task;
  today: string;
  /** Wired in the interactive step; when absent the row is read-only. */
  onToggle?: (checked: boolean) => void;
  /** Opens the edit dialog. When absent, no edit affordance is shown. */
  onEdit?: () => void;
}) {
  const completed = task.status === 'completed';
  const pending = !completed && task.start != null && task.start > today;
  const overdue = !completed && task.due != null && task.due < today;
  const persons = usePersons();
  const locale = useLocale();
  const t = useTranslate();
  const hasBadges =
    task.priority !== 'normal' ||
    pending ||
    task.due != null ||
    task.recurrence != null ||
    task.assignee != null;

  return (
    <li
      class="todo-list-item"
      data-completed={completed ? '' : undefined}
      data-pending={pending ? '' : undefined}
    >
      <Checkbox checked={completed} onChange={(checked) => onToggle?.(checked)} />
      <div class="content">
        <div class="summary">{task.summary}</div>
        {task.description && <div class="description">{task.description}</div>}
        {hasBadges && (
          <div class="badges">
            {task.priority === 'high' && (
              <Badge priority="high">
                <T token="card.prio_high" />
              </Badge>
            )}
            {task.priority === 'low' && (
              <Badge priority="low">
                <T token="card.prio_low" />
              </Badge>
            )}
            {pending && task.start && (
              <Badge pending>
                <Icon name="calendar-clock" size={14} /> <T token="card.starts" />{' '}
                {formatShortDate(task.start, locale)}
              </Badge>
            )}
            {task.due && (
              <Badge overdue={overdue}>
                <Icon name="calendar" size={14} /> {formatShortDate(task.due, locale)}
              </Badge>
            )}
            {task.recurrence && (
              <Badge>
                <Icon name="repeat" size={14} />
              </Badge>
            )}
            {task.assignee && (
              <Badge>
                <Icon name="account" size={14} /> {personName(persons, task.assignee)}
              </Badge>
            )}
          </div>
        )}
      </div>
      {onEdit && (
        <div class="actions">
          <button class="todo-list-item-action" aria-label={t('card.edit_task')} onClick={onEdit}>
            <Icon name="pencil" size={20} />
          </button>
        </div>
      )}
    </li>
  );
}

registerCss(css`
  .todo-list-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 12px;
    border-top: 1px solid var(--divider-color);
  }
  .todo-list-item:first-child {
    border-top: none;
  }
  .todo-list-item[data-pending] {
    opacity: 0.6;
  }
  .todo-list-item .content {
    flex: 1;
    min-width: 0;
  }
  .todo-list-item .summary {
    color: var(--primary-text-color);
    font-size: 0.98rem;
    word-break: break-word;
  }
  .todo-list-item[data-completed] .summary {
    text-decoration: line-through;
    color: var(--secondary-text-color);
  }
  .todo-list-item .description {
    color: var(--secondary-text-color);
    font-size: 0.82rem;
    margin-top: 2px;
    word-break: break-word;
  }
  .todo-list-item .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 5px;
  }
  .todo-list-item .actions {
    flex: none;
  }
  .todo-list-item-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 4px;
    border: none;
    border-radius: 50%;
    background: none;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
  .todo-list-item-action:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
`);
