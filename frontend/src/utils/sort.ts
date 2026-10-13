import { PRIO_RANK } from '../constants';
import type { Task } from '../types';

/** Active before completed, then by priority, then due date, then summary. */
export function sortTasks(tasks: Task[]): Task[] {
  return tasks.slice().sort((a, b) => {
    const ac = a.status === 'completed';
    const bc = b.status === 'completed';
    if (ac !== bc) return ac ? 1 : -1;
    const byPriority = PRIO_RANK[a.priority] - PRIO_RANK[b.priority];
    if (byPriority) return byPriority;
    const aDue = a.due ?? '9999';
    const bDue = b.due ?? '9999';
    if (aDue !== bDue) return aDue < bDue ? -1 : 1;
    return a.summary.localeCompare(b.summary);
  });
}
