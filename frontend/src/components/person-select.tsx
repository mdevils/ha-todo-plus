import { type ComponentChildren, h } from 'preact';

import { usePersons } from '../providers/persons';
import { T } from '../providers/translations';
import { Select, type SelectOption } from './select';

export function PersonSelect({
  label,
  value,
  onChange,
}: {
  label: ComponentChildren;
  value: string;
  onChange: (value: string) => void;
}) {
  const persons = usePersons();
  const options: SelectOption<string>[] = [
    { value: '', label: <T token="card.unassigned" /> },
    ...persons.map((person) => ({ value: person.id, label: person.name })),
  ];
  // Keep the current value selectable even if it is not (or no longer) a known person.
  if (value && !persons.some((person) => person.id === value)) {
    options.push({ value, label: value });
  }
  return <Select label={label} value={value} options={options} onChange={onChange} />;
}
