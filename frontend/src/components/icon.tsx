import { type icons } from '@iconify/json/json/mdi.json';
import { h } from 'preact';
import { useMemo } from 'preact/hooks';

export type IconName = keyof typeof icons;

export function Icon({ name, size }: { name: IconName; size?: number }) {
  const style = useMemo(() => (size ? { '--mdc-icon-size': `${size}px` } : undefined), [size]);
  return <ha-icon icon={`mdi:${name}`} style={style} />;
}
