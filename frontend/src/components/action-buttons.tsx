import { h } from 'preact';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';
import { useTranslate } from '../providers/translations';
import type { Action, ActionButton, ButtonsAlign, ButtonSize } from '../types';
import type { TranslateKey } from '../utils/i18n';
import { Icon, type IconName } from './icon';

/** Default label and icon per action, used when the button omits them. */
const ACTION_DEFAULTS: Record<Action, { label: TranslateKey; icon: IconName }> = {
  add_task: { label: 'card.add_task', icon: 'plus' },
  clear_completed: { label: 'card.clear_completed', icon: 'broom' },
};

/** Icon pixel size per button size. */
const ICON_SIZE: Record<ButtonSize, number> = { small: 15, medium: 18, large: 22 };

/** Renders a list of configurable buttons; `onAction` runs the pressed action.
 *  Without `align` the row is inline (hugs its content); with it, the row fills
 *  its width and distributes the buttons accordingly. */
export function ActionButtons({
  buttons,
  onAction,
  align,
  size = 'medium',
}: {
  buttons: ActionButton[];
  onAction: (action: Action) => void;
  align?: ButtonsAlign;
  /** Default size for the row; a button's own `size` wins. */
  size?: ButtonSize;
}) {
  const t = useTranslate();
  return (
    <div class="action-buttons" data-align={align}>
      {buttons.map((button, index) => {
        const defaults = ACTION_DEFAULTS[button.action];
        const label = button.text === undefined ? t(defaults.label) : button.text || null;
        const icon = button.icon === undefined ? defaults.icon : button.icon || null;
        const buttonSize = button.size ?? size;
        return (
          <button
            key={index}
            class="action-button"
            data-variant={button.variant}
            data-size={buttonSize}
            onClick={() => onAction(button.action)}
            aria-label={label ? undefined : t(defaults.label)}
          >
            {icon && <Icon name={icon as IconName} size={ICON_SIZE[buttonSize]} />}
            {label && <span>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}

registerCss(css`
  .action-buttons {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .action-buttons[data-align] {
    display: flex;
  }
  .action-buttons[data-align='left'] {
    justify-content: flex-start;
  }
  .action-buttons[data-align='right'] {
    justify-content: flex-end;
  }
  .action-buttons[data-align='center'] {
    justify-content: center;
  }
  .action-buttons[data-align='space_around'] {
    justify-content: space-around;
  }
  .action-buttons[data-align='space_between'] {
    justify-content: space-between;
  }
  .action-button {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    /* Default (primary) fill; variants below map to the primary/accent family. */
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    border: none;
    border-radius: 18px;
    padding: 6px 14px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .action-button[data-variant='dark'] {
    background: var(--dark-primary-color, var(--primary-color));
  }
  .action-button[data-variant='darker'] {
    background: var(--darker-primary-color, var(--primary-color));
  }
  .action-button[data-variant='light'] {
    background: var(--light-primary-color, var(--primary-color));
  }
  .action-button[data-variant='accent'] {
    background: var(--accent-color, var(--primary-color));
  }
  .action-button[data-variant='subtle'] {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    color: var(--primary-color);
  }
  .action-button[data-variant='subtle']:hover {
    background: color-mix(in srgb, var(--primary-color) 22%, transparent);
  }
  .action-button[data-size='small'] {
    gap: 3px;
    padding: 3px 10px;
    border-radius: 14px;
    font-size: 0.78rem;
  }
  .action-button[data-size='large'] {
    gap: 6px;
    padding: 8px 18px;
    border-radius: 22px;
    font-size: 1rem;
  }
`);
