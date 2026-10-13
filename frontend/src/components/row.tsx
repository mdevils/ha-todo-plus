import { type ComponentChildren, h } from 'preact';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

/** Lays its children out on one line, each taking an equal share of the width. */
export function Row({ children }: { children: ComponentChildren }) {
  return <div class="row">{children}</div>;
}

registerCss(css`
  .row {
    display: flex;
    gap: 10px;
  }
  .row > * {
    flex: 1;
    min-width: 0;
  }
`);
