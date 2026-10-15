import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

export const SITE_URL = 'https://pontlook.com';

/**
 * Construct 6-way hreflang alternates and self-referencing canonical URL
 * for GCC regional and country-specific routes.
 */
export function constructAlternates(lang: Locale | string, path: string = ''): Metadata['alternates'] {
  const normalizedPath = path ? `/${path.replace(/^\/+|\/+$/g, '')}` : '';
  const canonicalUrl = `${SITE_URL}/${lang}${normalizedPath}`;

  return {
    canonical: canonicalUrl,
    languages: {
      'en-SA': `${SITE_URL}/en-sa${normalizedPath}`,
      'ar-SA': `${SITE_URL}/ar-sa${normalizedPath}`,
      'en-AE': `${SITE_URL}/en-ae${normalizedPath}`,
      'ar-AE': `${SITE_URL}/ar-ae${normalizedPath}`,
      en: `${SITE_URL}/en${normalizedPath}`,
      ar: `${SITE_URL}/ar${normalizedPath}`,
      'x-default': `${SITE_URL}/en${normalizedPath}`,
    },
  };
}


/**
 * Dedicated icons and favicons for the For Providers section.
 */
export const providerIcons: Metadata['icons'] = {
  icon: [
    { url: '/favicon-providers.ico', sizes: 'any' },
    { url: '/favicon-providers-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-providers-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-providers-48x48.png', sizes: '48x48', type: 'image/png' },
    { url: '/android-chrome-providers-192x192.png', sizes: '192x192', type: 'image/png' },
    { url: '/android-chrome-providers-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
  shortcut: '/favicon-providers.ico',
  apple: [
    { url: '/apple-touch-icon-providers.png', sizes: '180x180', type: 'image/png' },
  ],
};
