import { useRef } from 'preact/hooks';

/**
 * Returns a reference-stable version of `value`: the returned reference only
 * changes when the JSON-serialised value changes. This lets a downstream
 * `memo()` skip re-renders when a new `hass` push produces an equal-but-new
 * array (e.g. tasks/persons rebuilt from `hass.states`).
 */
export function useStableJson<T>(value: T): T {
  const ref = useRef<T>(value);
  if (ref.current !== value && JSON.stringify(ref.current) !== JSON.stringify(value)) {
    ref.current = value;
  }
  return ref.current;
}
