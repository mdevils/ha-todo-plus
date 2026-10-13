import { type ComponentChildren, h } from 'preact';

import { Control } from './control';
import { Field } from './field';

export function TextField({
  label,
  value,
  onChange,
  type = 'text',
  multiline,
  placeholder,
  required,
  min,
  max,
  autofocus,
}: {
  label: ComponentChildren;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  autofocus?: boolean;
}) {
  return (
    <Field label={label}>
      {multiline ? (
        <Control
          as="textarea"
          value={value}
          placeholder={placeholder}
          onInput={(e) => onChange(e.currentTarget.value)}
        />
      ) : (
        <Control
          as="input"
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          autofocus={autofocus}
          onInput={(e) => onChange(e.currentTarget.value)}
        />
      )}
    </Field>
  );
}
