import 'server-only';
import { en } from './dictionaries/en';
import { ar } from './dictionaries/ar';

const dictionaries = {
  en: en,
  ar: ar,
};

export type Dictionary = typeof en;
export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ?? dictionaries.en;
};
