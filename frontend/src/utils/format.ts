import type { Locale } from '../types';

/** Local calendar date as an ISO `YYYY-MM-DD` string. */
export function todayIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// Memoized per language, like HA's own date helpers.
const shortDateFormatters = new Map<string, Intl.DateTimeFormat>();

function shortDateFormatter(language: string): Intl.DateTimeFormat {
  // `"system"` means "use the browser/OS locale" (pass undefined to Intl).
  const key = language === 'system' ? '' : language;
  let formatter = shortDateFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(key || undefined, { day: 'numeric', month: 'short' });
    shortDateFormatters.set(key, formatter);
  }
  return formatter;
}

/** Short date ("5 Jul") in HA's language — mirrors the frontend's `formatShortDate`. */
export function formatShortDate(iso: string, locale: Locale): string {
  try {
    return shortDateFormatter(locale.language).format(new Date(`${iso}T00:00:00`));
  } catch {
    return iso;
  }
}
