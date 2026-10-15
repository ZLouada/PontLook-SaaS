import 'server-only';
import { en } from './dictionaries/en';
import { ar } from './dictionaries/ar';
import { defaultLocale, locales, Locale, isArabicLocale } from './config';

export { defaultLocale, locales };
export type { Locale };

export type Dictionary = typeof en;

const dictionaries: Record<'en' | 'ar', Dictionary> = {
  en,
  ar,
};

export const getDictionary = async (locale: Locale | string): Promise<Dictionary> => {
  return isArabicLocale(locale) ? dictionaries.ar : dictionaries.en;
};

