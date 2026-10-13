import { ComponentChildren, createContext, h } from 'preact';
import { useContext } from 'preact/hooks';

import { DICTS, translate, TranslateDict, TranslateKey } from '../utils/i18n';

const TranslationsContext = createContext<TranslateDict>(DICTS.en);

export function T({ token }: { token: TranslateKey }) {
  const dict = useContext(TranslationsContext);
  return translate(token, dict);
}

/** For places that need a translated string rather than a node (e.g. aria-label). */
export function useTranslate(): (token: TranslateKey) => string {
  const dict = useContext(TranslationsContext);
  return (token) => translate(token, dict);
}

export function TranslationsProvider({
  children,
  language,
}: {
  children: ComponentChildren;
  language: string;
}) {
  return (
    <TranslationsContext.Provider value={DICTS[language] ?? DICTS.en}>
      {children}
    </TranslationsContext.Provider>
  );
}
