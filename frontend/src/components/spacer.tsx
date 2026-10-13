import { h } from 'preact';

export function Spacer({ height = 12 }: { height?: number }) {
  return <div style={{ height: `${height}px` }} />;
}
