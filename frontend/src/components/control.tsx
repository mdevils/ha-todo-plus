import { h, type JSX } from 'preact';
import { useLayoutEffect, useRef } from 'preact/hooks';

import { css } from '../dom/css';
import { registerCss } from '../dom/css-registry';

type InputControlProps = { as: 'input' } & JSX.IntrinsicElements['input'];
type TextareaControlProps = { as: 'textarea' } & JSX.IntrinsicElements['textarea'];
type SelectControlProps = { as: 'select' } & JSX.IntrinsicElements['select'];

export type ControlProps = InputControlProps | TextareaControlProps | SelectControlProps;

/** Textarea that starts one line tall and grows to fit its content. */
function AutoGrowTextarea(props: JSX.IntrinsicElements['textarea']) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [props.value]);
  return <textarea {...props} ref={ref} rows={1} />;
}

/** The single styled form control. Field-type components (TextField, Select, …)
 *  compose it so the input look lives in exactly one place. */
export function Control(props: ControlProps) {
  if (props.as === 'textarea') {
    const { as: _as, ...rest } = props;
    return <AutoGrowTextarea {...rest} class="control control-autogrow" />;
  }
  if (props.as === 'select') {
    const { as: _as, children, ...rest } = props;
    return (
      <select {...rest} class="control">
        {children}
      </select>
    );
  }
  const { as: _as, ...rest } = props;
  return <input {...rest} class="control" />;
}

registerCss(css`
  .control {
    font: inherit;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid var(--divider-color);
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .control-autogrow {
    resize: none;
    overflow: hidden;
  }
`);
