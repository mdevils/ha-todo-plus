import { type ComponentChildren, h } from 'preact';

import { Control } from './control';
import { Field } from './field';

export interface SelectOption<T extends string> {
  value: T;
  label: ComponentChildren;
}

export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: ComponentChildren;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <Field label={label}>
      <Control as="select" value={value} onChange={(e) => onChange(e.currentTarget.value as T)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Control>
    </Field>
  );
}
