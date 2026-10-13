import { h } from 'preact';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

export function Divider() {
  return <hr class="divider" />;
}

registerCss(css`
  .divider {
    margin: 8px 0;
    border: none;
    /* Full width, and heavier than the hairline between tasks. */
    border-top: 1px solid var(--secondary-text-color);
  }
`);
