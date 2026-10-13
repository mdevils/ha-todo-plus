import en from '../../../custom_components/todo_plus/translations/en.json';
import ru from '../../../custom_components/todo_plus/translations/ru.json';

export type TranslateDict = typeof en;

export const DICTS: Record<string, TranslateDict> = {
  en,
  ru,
};

type ExtractTranslateKeys<T> = {
  [K in keyof T]: K extends string
    ? T[K] extends string
      ? K
      : `${K}.${ExtractTranslateKeys<T[K]>}`
    : never;
}[keyof T];
export type TranslateKey = ExtractTranslateKeys<TranslateDict>;

export interface DictStructure {
  [key: string]: DictStructure | string;
}

export function translate(token: TranslateKey, dict: TranslateDict) {
  let current = dict as DictStructure | string;
  for (const bit of token.split('.')) {
    if (typeof current === 'string') {
      throw new Error(`Key "${token}" is not valid for the given dictionary.`);
    } else {
      current = current[bit];
    }
  }
  return current as string;
}
//
// /** Primary language subtag, e.g. "ru-RU" -> "ru". */
// function primary(lang: string | undefined): string {
//   return (lang || 'en').split('-')[0].toLowerCase();
// }
//
// /** Translate `key` for `lang`, falling back to English then the key itself. */
// export function translate(lang: string | undefined, key: string): string {
//   const dict = DICTS[primary(lang)] ?? DICTS.en;
//   return dict[key] ?? DICTS.en[key] ?? key;
// }
