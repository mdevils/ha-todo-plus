import { h } from 'preact';
import { useState } from 'preact/hooks';

import { Icon } from '../components/icon';
import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';
import { useTranslate } from '../providers/translations';

/** Inline "add a task" row: submits on Enter or the button, then clears. */
export function QuickAdd({
  onAdd,
  placeholder,
}: {
  onAdd: (summary: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState('');
  const t = useTranslate();

  const submit = () => {
    const summary = value.trim();
    if (!summary) return;
    onAdd(summary);
    setValue('');
  };

  return (
    // A real form so Enter submits and mobile keyboards show a submit action.
    <form
      class="quick-add"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <input
        class="quick-add-input"
        type="text"
        enterKeyHint="done"
        value={value}
        placeholder={placeholder ?? t('card.quick_add_placeholder')}
        onInput={(e) => setValue(e.currentTarget.value)}
      />
      <button type="submit" class="quick-add-button" aria-label={t('card.add_task')}>
        <Icon name="plus" size={20} />
      </button>
    </form>
  );
}

registerCss(css`
  .quick-add {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
  }
  .quick-add-input {
    flex: 1;
    min-width: 0;
    font: inherit;
    padding: 6px 0;
    border: none;
    border-bottom: 1px solid var(--divider-color);
    background: none;
    color: var(--primary-text-color);
  }
  .quick-add-input:focus {
    outline: none;
    border-bottom-color: var(--primary-color);
  }
  .quick-add-input::placeholder {
    color: var(--secondary-text-color);
  }
  .quick-add-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 4px;
    border: none;
    border-radius: 50%;
    background: none;
    color: var(--secondary-text-color);
    cursor: pointer;
  }
  .quick-add-button:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
`);
