import { type ComponentChildren, h } from 'preact';

import { Control } from './control';
import { Field } from './field';

export function DatePicker({
  label,
  value,
  onChange,
}: {
  label: ComponentChildren;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <Control
        as="input"
        type="date"
        value={value}
        onInput={(e) => onChange(e.currentTarget.value)}
      />
    </Field>
  );
}
