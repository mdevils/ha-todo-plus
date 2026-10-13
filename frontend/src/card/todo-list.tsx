import { Fragment, h, type VNode } from 'preact';
import { useCallback } from 'preact/hooks';

import { ActionButtons } from '../components/action-buttons';
import { Divider } from '../components/divider';
import { Header } from '../components/header';
import { Spacer } from '../components/spacer';
import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';
import { T } from '../providers/translations';
import { type Action, type ActionButton, type LayoutItem, type Section, type Task } from '../types';
import { todayIso } from '../utils/format';
import type { TranslateKey } from '../utils/i18n';
import { sortTasks } from '../utils/sort';
import { QuickAdd } from './quick-add';
import { TodoListItem } from './todo-list-item';

const SECTION_LABEL: Record<Section, TranslateKey> = {
  todo: 'card.section_todo',
  scheduled: 'card.section_scheduled',
  completed: 'card.section_completed',
};

const NO_LINGERING: ReadonlySet<string> = new Set();

/** A task is "scheduled" when it is not yet actionable — a future start (an
 *  upcoming recurring occurrence) or a due date still in the future. A completed
 *  task that is "lingering" (just checked, Completed block absent) stays in the
 *  To-do block until reload. */
function taskSection(task: Task, today: string, lingering: ReadonlySet<string>): Section {
  if (task.status === 'completed') return lingering.has(task.uid) ? 'todo' : 'completed';
  const upcoming =
    (task.start != null && task.start > today) || (task.due != null && task.due > today);
  return upcoming ? 'scheduled' : 'todo';
}

export function TodoList({
  tasks,
  layout,
  title,
  lingering = NO_LINGERING,
  onEdit,
  onToggle,
  onAdd,
  onAddTask,
  onClearCompleted,
}: {
  tasks: Task[];
  layout: LayoutItem[];
  /** Card title, used as the header block's default heading. */
  title?: string;
  lingering?: ReadonlySet<string>;
  onEdit?: (uid: string) => void;
  onToggle?: (uid: string, completed: boolean) => void;
  onAdd?: (summary: string) => void;
  onAddTask?: () => void;
  onClearCompleted?: () => void;
}) {
  const today = todayIso();
  const hasCompleted = tasks.some((task) => task.status === 'completed');

  const runAction = useCallback(
    (action: Action) => {
      if (action === 'add_task') onAddTask?.();
      else onClearCompleted?.();
    },
    [onAddTask, onClearCompleted],
  );

  // Drop `clear_completed` when there's nothing to clear, unless persisted.
  const visibleButtons = (buttons: ActionButton[]) =>
    buttons.filter(
      (button) => button.action !== 'clear_completed' || button.persist || hasCompleted,
    );

  const renderSection = (
    section: Section,
    key: number,
    title: string | null | undefined,
    sectionButtons: ActionButton[] | undefined,
  ): VNode | null => {
    const items = sortTasks(
      tasks.filter((task) => taskSection(task, today, lingering) === section),
    );
    if (items.length === 0) return null;
    // Omitted → default label; explicit null/"" → no heading.
    const heading = title === undefined ? <T token={SECTION_LABEL[section]} /> : title || null;
    const buttons = visibleButtons(sectionButtons ?? []);
    return (
      <section key={key} class="todo-list-section">
        {(heading || buttons.length > 0) && (
          <div class="todo-list-section-header">
            {heading ? <h3 class="todo-list-section-title">{heading}</h3> : <span />}
            {buttons.length > 0 && (
              <ActionButtons buttons={buttons} onAction={runAction} size="small" />
            )}
          </div>
        )}
        <ul class="todo-list">
          {items.map((task) => (
            <TodoListItem
              key={task.uid}
              task={task}
              today={today}
              onEdit={onEdit ? () => onEdit(task.uid) : undefined}
              onToggle={onToggle ? (completed) => onToggle(task.uid, completed) : undefined}
            />
          ))}
        </ul>
      </section>
    );
  };

  // The node each block renders to (null = nothing: an empty section, or a
  // quick-add with no handler). Dividers/spacers always produce a node here;
  // whether they survive is decided below.
  const nodes = layout.map((item, index): VNode | null => {
    switch (item.type) {
      case 'header': {
        const heading = item.title === undefined ? title : item.title;
        const buttons = visibleButtons(item.buttons ?? []);
        return (
          <Header key={index}>
            {heading ? <h2>{heading}</h2> : <span />}
            {buttons.length > 0 && <ActionButtons buttons={buttons} onAction={runAction} />}
          </Header>
        );
      }
      case 'buttons': {
        const buttons = visibleButtons(item.buttons);
        if (buttons.length === 0) return null;
        return (
          <div key={index} class="layout-buttons">
            <ActionButtons buttons={buttons} onAction={runAction} align={item.align ?? 'left'} />
          </div>
        );
      }
      case 'empty':
        return tasks.length === 0 ? (
          <div key={index} class="todo-list-empty">
            {item.text ?? <T token="card.no_tasks" />}
          </div>
        ) : null;
      case 'divider':
        return <Divider key={index} />;
      case 'spacer':
        return <Spacer key={index} height={item.height} />;
      case 'quick_add':
        return onAdd ? <QuickAdd key={index} onAdd={onAdd} placeholder={item.placeholder} /> : null;
      default:
        return renderSection(item.type, index, item.title, item.buttons);
    }
  });

  // A block is an "anchor" — something a separator is allowed to divide — when
  // it is visible content (a rendered section or quick-add) or a persistent
  // separator. Non-persistent separators are not anchors, so a run of them can
  // never keep itself (or its neighbours) alive.
  const isSeparator = (item: LayoutItem) => item.type === 'divider' || item.type === 'spacer';
  const isPersistent = (item: LayoutItem) => isSeparator(item) && 'persist' in item && item.persist;
  const anchors = layout.map((item, index) =>
    isSeparator(item) ? isPersistent(item) : nodes[index] !== null,
  );

  // Drop a non-persistent separator unless it sits between two anchors.
  const blocks = nodes.map((node, index) => {
    const item = layout[index];
    if (isSeparator(item) && !isPersistent(item)) {
      const dividesVisible =
        anchors.slice(0, index).some(Boolean) && anchors.slice(index + 1).some(Boolean);
      if (!dividesVisible) return null;
    }
    return node;
  });

  return <Fragment>{blocks}</Fragment>;
}

registerCss(css`
  .todo-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .todo-list-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin: 12px 12px 2px;
  }
  .todo-list-section-title {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--secondary-text-color);
  }
  .todo-list-empty {
    padding: 16px 12px;
    color: var(--secondary-text-color);
    text-align: center;
  }
  .layout-buttons {
    padding: 4px 12px;
  }
`);
