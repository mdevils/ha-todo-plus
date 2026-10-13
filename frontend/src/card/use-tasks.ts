import { useEffect, useState } from 'preact/hooks';

import { type TodoService, useTodoService } from '../providers/todo-service';
import type { Recurrence, Task } from '../types';
import { recurrenceServiceData, recurrenceToValue } from './recurrence-editor';
import type { TaskDraft } from './todo-item-dialog';

/** Canonical, key-order-independent comparison of two recurrences. */
function recurrenceEqual(a: Recurrence | null, b: Recurrence | null): boolean {
  const canon = (r: Recurrence | null) =>
    r === null
      ? 'null'
      : JSON.stringify(
          Object.keys(r)
            .sort()
            .map((key) => [key, (r as unknown as Record<string, unknown>)[key]]),
        );
  return canon(a) === canon(b);
}

// Client-only id for an optimistic task. Not crypto (crypto.randomUUID needs a
// secure context, which HTTP-served HA instances lack) — it's discarded on the
// next server push anyway, so a per-session counter is enough.
let optimisticSeq = 0;
function nextOptimisticUid(): string {
  optimisticSeq += 1;
  return `optimistic-${optimisticSeq}`;
}

/** Build the optimistic Task a draft represents (shown until the server confirms). */
function draftToTask(draft: TaskDraft, uid: string, status: Task['status']): Task {
  return {
    uid,
    summary: draft.summary,
    description: draft.description || null,
    status,
    due: draft.due || null,
    start: draft.start || null,
    priority: draft.priority,
    assignee: draft.assignee || null,
    recurrence: draft.recurring ? recurrenceToValue(draft.recurrence) : null,
  };
}

async function callCreate(call: TodoService, draft: TaskDraft): Promise<void> {
  const data: Record<string, unknown> = { summary: draft.summary, priority: draft.priority };
  if (draft.description) data.description = draft.description;
  if (draft.due) data.due_date = draft.due;
  if (draft.start) data.start_date = draft.start;
  if (draft.assignee) data.assignee = draft.assignee;
  if (draft.recurring) {
    Object.assign(data, recurrenceServiceData(recurrenceToValue(draft.recurrence)));
  }
  await call('create_task', data);
}

async function callUpdate(
  call: TodoService,
  uid: string,
  draft: TaskDraft,
  prev: Task | undefined,
): Promise<void> {
  const update: Record<string, unknown> = {
    uid,
    summary: draft.summary,
    description: draft.description,
    assignee: draft.assignee,
  };
  if (draft.due) update.due_date = draft.due;
  await call('update_task', update);

  if ((prev?.priority ?? 'normal') !== draft.priority) {
    await call('set_priority', { uid, priority: draft.priority });
  }

  const prevRecurrence = prev?.recurrence ?? null;
  const nextRecurrence = draft.recurring ? recurrenceToValue(draft.recurrence) : null;
  const startChanged = (prev?.start ?? '') !== draft.start;

  if (nextRecurrence) {
    // Re-running set_recurrence re-anchors the schedule, so only do it on a
    // real change (the anchor also moves when the start date changes).
    if (startChanged || !recurrenceEqual(prevRecurrence, nextRecurrence)) {
      const data: Record<string, unknown> = { uid, ...recurrenceServiceData(nextRecurrence) };
      if (draft.start) data.start_date = draft.start;
      await call('set_recurrence', data);
    }
  } else {
    if (prevRecurrence) await call('clear_recurrence', { uid });
    if (startChanged) {
      await call('set_start_date', draft.start ? { uid, start_date: draft.start } : { uid });
    }
  }
}

export interface UseTasks {
  tasks: Task[];
  addTask: (draft: TaskDraft) => Promise<void>;
  updateTask: (uid: string, draft: TaskDraft) => Promise<void>;
  toggleTask: (uid: string, completed: boolean) => Promise<void>;
  deleteTask: (uid: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
}

/**
 * Tasks with optimistic add/edit. The change is shown immediately, then the
 * server is authoritative: the overlay is dropped as soon as new `serverTasks`
 * arrive (or rolled back if the service call fails).
 */
export function useTasks(serverTasks: Task[]): UseTasks {
  const call = useTodoService();
  const [overlay, setOverlay] = useState<Task[] | null>(null);

  // Server is authoritative — discard the overlay whenever fresh data arrives.
  useEffect(() => setOverlay(null), [serverTasks]);

  const addTask = async (draft: TaskDraft): Promise<void> => {
    const optimistic = draftToTask(draft, nextOptimisticUid(), 'needs_action');
    setOverlay((current) => [...(current ?? serverTasks), optimistic]);
    try {
      await callCreate(call, draft);
    } catch (error) {
      setOverlay(null); // roll back to server state
      throw error;
    }
  };

  const updateTask = async (uid: string, draft: TaskDraft): Promise<void> => {
    const prev = serverTasks.find((task) => task.uid === uid);
    setOverlay((current) =>
      (current ?? serverTasks).map((task) =>
        task.uid === uid ? draftToTask(draft, uid, task.status) : task,
      ),
    );
    try {
      await callUpdate(call, uid, draft, prev);
    } catch (error) {
      setOverlay(null);
      throw error;
    }
  };

  const toggleTask = async (uid: string, completed: boolean): Promise<void> => {
    const status: Task['status'] = completed ? 'completed' : 'needs_action';
    setOverlay((current) =>
      (current ?? serverTasks).map((task) => (task.uid === uid ? { ...task, status } : task)),
    );
    try {
      await call('update_task', { uid, status });
    } catch (error) {
      setOverlay(null);
      throw error;
    }
  };

  const deleteTask = async (uid: string): Promise<void> => {
    setOverlay((current) => (current ?? serverTasks).filter((task) => task.uid !== uid));
    try {
      await call('delete_task', { uid });
    } catch (error) {
      setOverlay(null);
      throw error;
    }
  };

  const clearCompleted = async (): Promise<void> => {
    setOverlay((current) => (current ?? serverTasks).filter((task) => task.status !== 'completed'));
    try {
      await call('clear_completed', {});
    } catch (error) {
      setOverlay(null);
      throw error;
    }
  };

  return {
    tasks: overlay ?? serverTasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  };
}
