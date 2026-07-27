export const defaultLocale = 'en';
export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

/**
 * Returns the detected locale if valid, or strictly defaults to 'en'.
 */
export function getFallbackLocale(detectedLocale?: string | null): Locale {
  if (detectedLocale && (locales as readonly string[]).includes(detectedLocale)) {
    return detectedLocale as Locale;
  }
  return defaultLocale;
}
