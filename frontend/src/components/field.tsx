import { ComponentChildren, h } from 'preact';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

/** Label + vertical layout for a form control. Styles only itself, never its child. */
export function Field({
  label,
  children,
}: {
  label: ComponentChildren;
  children: ComponentChildren;
}) {
  return (
    <label class="field">
      <span class="field-label">{label}</span>
      {children}
    </label>
  );
}

registerCss(css`
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 12px;
  }
  .field-label {
    font-size: 0.78rem;
    color: var(--secondary-text-color);
  }
`);
