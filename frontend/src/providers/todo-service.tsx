import { type ComponentChildren, createContext, h } from 'preact';
import { useContext } from 'preact/hooks';

/** Calls a `todo_plus.*` service for the card's entity (entity_id is pre-bound). */
export type TodoService = (service: string, data?: Record<string, unknown>) => Promise<void>;

const TodoServiceContext = createContext<TodoService>(() => Promise.resolve());

export function TodoServiceProvider({
  call,
  children,
}: {
  call: TodoService;
  children: ComponentChildren;
}) {
  return <TodoServiceContext.Provider value={call}>{children}</TodoServiceContext.Provider>;
}

export function useTodoService(): TodoService {
  return useContext(TodoServiceContext);
}
