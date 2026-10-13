import { h } from 'preact';
import { memo } from 'preact/compat';

import { CssProvider } from '../dom/css-registry';
import { LocaleProvider } from '../providers/locale';
import { PersonsProvider } from '../providers/persons';
import { type TodoService, TodoServiceProvider } from '../providers/todo-service';
import { TranslationsProvider } from '../providers/translations';
import type { LayoutItem, Locale, Person, Task } from '../types';
import { useStableJson } from '../utils/use-stable-json';
import { Card } from './card';

interface CardRootProps {
  title: string;
  layout: LayoutItem[];
  tasks: Task[];
  persons: Person[];
  locale: Locale;
  callService: TodoService;
}

export function CardRoot(props: CardRootProps) {
  // Stabilise the values rebuilt on every `hass` push so the memo below can skip.
  const tasks = useStableJson(props.tasks);
  const persons = useStableJson(props.persons);
  const locale = useStableJson(props.locale);
  return <CardRootContent {...props} tasks={tasks} persons={persons} locale={locale} />;
}

const CardRootContent = memo(function CardRootContent({
  title,
  layout,
  tasks,
  persons,
  locale,
  callService,
}: CardRootProps) {
  return (
    <CssProvider>
      <TranslationsProvider language={locale.language}>
        <LocaleProvider locale={locale}>
          <PersonsProvider persons={persons}>
            <TodoServiceProvider call={callService}>
              <Card title={title} layout={layout} tasks={tasks} />
            </TodoServiceProvider>
          </PersonsProvider>
        </LocaleProvider>
      </TranslationsProvider>
    </CssProvider>
  );
});
