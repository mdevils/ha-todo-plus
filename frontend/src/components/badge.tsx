import { ComponentChildren, h } from 'preact';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

export function Badge({
  overdue,
  pending,
  priority,
  children,
}: {
  overdue?: boolean;
  pending?: boolean;
  priority?: 'high' | 'low';
  children: ComponentChildren;
}) {
  return (
    <span
      class="badge"
      data-overdue={overdue ? '' : undefined}
      data-pending={pending ? '' : undefined}
      data-priority={priority}
    >
      {children}
    </span>
  );
}

registerCss(css`
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    padding: 2px 7px;
    border-radius: 10px;
    background: var(--secondary-background-color);
    color: var(--secondary-text-color);
    white-space: nowrap;
  }
  .badge[data-overdue],
  .badge[data-priority='high'] {
    background: var(--error-color);
    color: var(--text-primary-color, #fff);
  }
  .badge[data-pending] {
    opacity: 0.8;
    font-style: italic;
  }
  .badge[data-priority='low'] {
    opacity: 0.75;
  }
`);
