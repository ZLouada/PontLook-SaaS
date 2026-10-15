export const defaultLocale = 'en';
export const locales = ['en', 'ar', 'en-sa', 'ar-sa', 'en-ae', 'ar-ae'] as const;
export type Locale = (typeof locales)[number];

export const i18n = {
  defaultLocale,
  locales,
};

export type Direction = 'ltr' | 'rtl';
export type BaseLang = 'en' | 'ar';
export type CountryCode = 'sa' | 'ae';

/**
 * Returns true if the locale is an Arabic dialect/locale ('ar', 'ar-sa', 'ar-ae')
 */
export function isArabicLocale(locale: string): boolean {
  return locale === 'ar' || locale === 'ar-sa' || locale === 'ar-ae';
}

/**
 * Returns layout direction ('rtl' for Arabic, 'ltr' for English)
 */
export function getLocaleDirection(locale: string): Direction {
  return isArabicLocale(locale) ? 'rtl' : 'ltr';
}

/**
 * Returns standardized HTML lang attribute string ('en', 'ar', 'en-SA', 'ar-SA', 'en-AE', 'ar-AE')
 */
export function getHtmlLang(locale: string): string {
  switch (locale) {
    case 'en-sa':
      return 'en-SA';
    case 'ar-sa':
      return 'ar-SA';
    case 'en-ae':
      return 'en-AE';
    case 'ar-ae':
      return 'ar-AE';
    case 'ar':
      return 'ar';
    case 'en':
    default:
      return 'en';
  }
}

/**
 * Returns base language ('en' | 'ar')
 */
export function getBaseLanguage(locale: string): BaseLang {
  return isArabicLocale(locale) ? 'ar' : 'en';
}

/**
 * Returns country overlay code if applicable ('sa' | 'ae' | null)
 */
export function getCountryCode(locale: string): CountryCode | null {
  if (locale === 'en-sa' || locale === 'ar-sa') return 'sa';
  if (locale === 'en-ae' || locale === 'ar-ae') return 'ae';
  return null;
}

/**
 * Returns the opposite language code in the same country market
 */
export function getOppositeLanguageLocale(locale: Locale | string): Locale {
  switch (locale) {
    case 'en-sa':
      return 'ar-sa';
    case 'ar-sa':
      return 'en-sa';
    case 'en-ae':
      return 'ar-ae';
    case 'ar-ae':
      return 'en-ae';
    case 'ar':
      return 'en';
    case 'en':
    default:
      return 'ar';
  }
}

/**
 * Returns the detected locale if valid, or strictly defaults to 'en'.
 */
export function getFallbackLocale(detectedLocale?: string | null): Locale {
  if (detectedLocale && (locales as readonly string[]).includes(detectedLocale)) {
    return detectedLocale as Locale;
  }
  return defaultLocale;
}

