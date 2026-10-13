import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';
import type { LayoutItem, Task } from '../types';
import { draftFromTask, TodoItemDialog } from './todo-item-dialog';
import { TodoList } from './todo-list';
import { useTasks } from './use-tasks';

/** `editing` is `null` (closed), `'new'` (add), or a task uid (edit). */
type Editing = 'new' | string | null;

export function Card({
  title,
  layout,
  tasks: serverTasks,
}: {
  title?: string;
  layout: LayoutItem[];
  tasks: Task[];
}) {
  const { tasks, addTask, updateTask, toggleTask, deleteTask, clearCompleted } =
    useTasks(serverTasks);
  const [editing, setEditing] = useState<Editing>(null);
  // Uids of items checked this session that should stay in To-do until reload
  // (only when there is no Completed block and the todo block enables it).
  const [lingering, setLingering] = useState<ReadonlySet<string>>(() => new Set());
  const rootRef = useRef<HTMLDivElement>(null);

  const todo = layout.find((item) => item.type === 'todo');
  const lingerCompleted = todo?.type === 'todo' ? todo.linger_completed !== false : true;
  const canLinger = lingerCompleted && !layout.some((item) => item.type === 'completed');

  // Surface errors as a native HA toast (bubbles + composed to escape the shadow roots).
  const notifyError = (error: unknown) => {
    const message = `Todo Plus: ${error instanceof Error ? error.message : String(error)}`;
    rootRef.current?.dispatchEvent(
      new CustomEvent('hass-notification', { bubbles: true, composed: true, detail: { message } }),
    );
  };

  const handleToggle = (uid: string, completed: boolean) => {
    if (canLinger) {
      setLingering((prev) => {
        const next = new Set(prev);
        if (completed) next.add(uid);
        else next.delete(uid);
        return next;
      });
    }
    toggleTask(uid, completed).catch(notifyError);
  };

  return (
    <ha-card ref={rootRef}>
      <TodoList
        tasks={tasks}
        layout={layout}
        title={title}
        lingering={lingering}
        onEdit={setEditing}
        onToggle={handleToggle}
        onAdd={(summary) => addTask({ ...draftFromTask(), summary }).catch(notifyError)}
        onAddTask={() => setEditing('new')}
        onClearCompleted={() => clearCompleted().catch(notifyError)}
      />

      {editing !== null && (
        <TodoItemDialog
          task={editing === 'new' ? undefined : tasks.find((task) => task.uid === editing)}
          onClose={() => setEditing(null)}
          onSubmit={(draft) => {
            // Optimistic: apply + close immediately; reconcile/roll back in the background.
            const pending = editing === 'new' ? addTask(draft) : updateTask(editing, draft);
            setEditing(null);
            pending.catch(notifyError);
          }}
          onDelete={
            editing === 'new'
              ? undefined
              : () => {
                  const pending = deleteTask(editing);
                  setEditing(null);
                  pending.catch(notifyError);
                }
          }
        />
      )}
    </ha-card>
  );
}

registerCss(css`
  ha-card {
    padding: 12px 4px 8px;
    user-select: text;
  }
`);
