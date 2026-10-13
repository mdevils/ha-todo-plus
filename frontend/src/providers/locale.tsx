import { type ComponentChildren, createContext, h } from 'preact';
import { useContext } from 'preact/hooks';

import type { Locale } from '../types';

const LocaleContext = createContext<Locale>({ language: 'en' });

/** Shares Home Assistant's locale so dates/numbers format the HA way. */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ComponentChildren;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
