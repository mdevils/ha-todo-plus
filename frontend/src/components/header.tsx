import { ComponentChildren, h } from 'preact';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

export function Header({ children }: { children: ComponentChildren }) {
  return <div class="header">{children}</div>;
}

registerCss(css`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px 8px;
    gap: 8px;
  }
  .header h2 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--primary-text-color);
  }
`);
