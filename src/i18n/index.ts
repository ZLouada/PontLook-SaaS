import 'server-only';
import { en } from './dictionaries/en';
import { defaultLocale, locales, Locale } from './config';

export { defaultLocale, locales };
export type { Locale };

const dictionaries = {
  en: en,
};

export type Dictionary = typeof en;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
};
