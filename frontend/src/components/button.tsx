import { type ComponentChildren, h } from 'preact';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

export function Button({
  variant = 'secondary',
  type = 'button',
  disabled,
  onClick,
  children,
}: {
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  children: ComponentChildren;
}) {
  return (
    <button
      class="button"
      type={type}
      data-variant={variant === 'secondary' ? undefined : variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

registerCss(css`
  .button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font: inherit;
    border: none;
    border-radius: 18px;
    padding: 8px 16px;
    cursor: pointer;
    background: none;
    color: var(--primary-color);
  }
  .button[data-variant='primary'] {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }
  .button[data-variant='danger'] {
    color: var(--error-color);
  }
  .button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`);
