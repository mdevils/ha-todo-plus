import { type ComponentChildren, h } from 'preact';
import { useEffect } from 'preact/hooks';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

/** Generic modal shell: overlay + box, closes on backdrop click or Escape. */
export function Dialog({
  heading,
  onClose,
  children,
  footer,
}: {
  heading: ComponentChildren;
  onClose: () => void;
  children: ComponentChildren;
  footer?: ComponentChildren;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      class="dialog-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div class="dialog" role="dialog" aria-modal="true">
        <h3 class="dialog-heading">{heading}</h3>
        <div class="dialog-body">{children}</div>
        {footer && <div class="dialog-footer">{footer}</div>}
      </div>
    </div>
  );
}

registerCss(css`
  .dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgba(0, 0, 0, 0.45);
  }
  .dialog {
    width: 100%;
    max-width: 420px;
    max-height: 90vh;
    overflow: auto;
    padding: 18px;
    border-radius: 12px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  }
  .dialog-heading {
    margin: 0 0 12px;
    font-weight: 500;
  }
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 8px;
  }
`);
