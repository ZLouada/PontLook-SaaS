import 'server-only';
import { en } from './dictionaries/en';
import { ar } from './dictionaries/ar';
import saEnOverlay from './dictionaries/sa.en.json';
import saArOverlay from './dictionaries/sa.ar.json';
import aeEnOverlay from './dictionaries/ae.en.json';
import aeArOverlay from './dictionaries/ae.ar.json';
import { defaultLocale, locales, Locale } from './config';

export { defaultLocale, locales };
export type { Locale };

export type Dictionary = typeof en;

function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sVal = source[key];
    const tVal = (target as any)[key];
    if (
      sVal !== null &&
      typeof sVal === 'object' &&
      !Array.isArray(sVal) &&
      tVal !== null &&
      typeof tVal === 'object' &&
      !Array.isArray(tVal)
    ) {
      (result as any)[key] = deepMerge(tVal, sVal);
    } else {
      (result as any)[key] = sVal;
    }
  }
  return result;
}

// Pre-computed server-side dictionary cache for all 6 supported locales
const dictionaryCache: Record<string, Dictionary> = {
  en,
  ar,
  'en-sa': deepMerge(en, saEnOverlay),
  'ar-sa': deepMerge(ar, saArOverlay),
  'en-ae': deepMerge(en, aeEnOverlay),
  'ar-ae': deepMerge(ar, aeArOverlay),
};

export const getDictionary = async (locale: Locale | string): Promise<Dictionary> => {
  return dictionaryCache[locale] ?? dictionaryCache[defaultLocale] ?? en;
};
