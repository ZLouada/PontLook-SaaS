import type { Metadata } from 'next';
import { Locale } from '@/i18n/config';

export const SITE_URL = 'https://pontlook.com';

/**
 * Builds canonical URL and internationalization hreflang alternates for a route.
 * @param lang Active language locale ('en' | 'ar')
 * @param path Relative path after locale without leading/trailing slashes (e.g. 'for-providers' or '')
 */
export function constructAlternates(lang: Locale, path: string = ''): Metadata['alternates'] {
  const normalizedPath = path ? `/${path.replace(/^\/+|\/+$/g, '')}` : '';
  const canonicalUrl = `${SITE_URL}/${lang}${normalizedPath}`;

  return {
    canonical: canonicalUrl,
    languages: {
      en: `${SITE_URL}/en${normalizedPath}`,
      'en-SA': `${SITE_URL}/en${normalizedPath}`,
      'en-AE': `${SITE_URL}/en${normalizedPath}`,
      ar: `${SITE_URL}/ar${normalizedPath}`,
      'ar-SA': `${SITE_URL}/ar${normalizedPath}`,
      'ar-AE': `${SITE_URL}/ar${normalizedPath}`,
      'x-default': `${SITE_URL}/en${normalizedPath}`,
    },
  };
}
