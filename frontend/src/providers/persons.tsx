import { type ComponentChildren, createContext, h } from 'preact';
import { useContext } from 'preact/hooks';

import type { Person } from '../types';

const PersonsContext = createContext<Person[]>([]);

/** Shares the list of assignable people (from `person.*` entities). */
export function PersonsProvider({
  persons,
  children,
}: {
  persons: Person[];
  children: ComponentChildren;
}) {
  return <PersonsContext.Provider value={persons}>{children}</PersonsContext.Provider>;
}

export function usePersons(): Person[] {
  return useContext(PersonsContext);
}

/** Resolve an assignee id to a display name; an unknown id (or free text) returns as-is. */
export function personName(persons: Person[], id: string): string {
  return persons.find((person) => person.id === id)?.name ?? id;
}
