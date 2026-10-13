// Tiny DOM/string helpers.

/** HTML-escape a value for safe interpolation into template strings. */
export function esc(s: unknown): string {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Render a Material Design Icon the same way HA does, via its global <ha-icon>. */
export function icon(name: string): string {
  return `<ha-icon icon="mdi:${name}"></ha-icon>`;
}

declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      'ha-card': HTMLAttributes<HTMLDivElement>;
      'ha-icon': HTMLAttributes<HTMLDivElement> & { icon: string };
    }
  }
}
