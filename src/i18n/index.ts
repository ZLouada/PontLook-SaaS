import 'server-only';
import { en } from './dictionaries/en';
import { ar } from './dictionaries/ar';
import { defaultLocale, locales, Locale } from './config';

export { defaultLocale, locales };
export type { Locale };

const dictionaries = {
  en: en,
  ar: ar,
};

export type Dictionary = typeof en;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
};

