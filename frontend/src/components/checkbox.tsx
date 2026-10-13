import { h } from 'preact';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

export function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <input
      class="checkbox"
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.currentTarget.checked)}
    />
  );
}

registerCss(css`
  .checkbox {
    width: 20px;
    height: 20px;
    margin-top: 2px;
    flex: none;
    cursor: pointer;
    accent-color: var(--primary-color);
  }
`);
