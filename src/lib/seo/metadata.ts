import type { Metadata } from 'next';
import { CountryCode, getCountryData, COUNTRIES_DATA } from '@/data/geoData';

export const SITE_URL = 'https://pontlook.com';

/**
 * Returns the public canonical path for a country and language combination.
 */
export function getPublicCountryPath(countryCode: CountryCode, lang: 'en' | 'ar', subpath: string = ''): string {
  const country = getCountryData(countryCode);
  if (!country) return `/${lang}`;

  const cleanSub = subpath ? `/${subpath.replace(/^\/+|\/+$/g, '')}` : '';
  const prefix = lang === 'ar' && country.publicPathPrefix.ar
    ? country.publicPathPrefix.ar
    : country.publicPathPrefix.en;

  return `${prefix}${cleanSub}`;
}

/**
 * Builds reciprocal hreflangs and canonical URL for regional and localized routes.
 */
export function constructRegionalAlternates({
  countryCode,
  lang,
  subpath = '',
  citySlug,
}: {
  countryCode: CountryCode;
  lang: 'en' | 'ar';
  subpath?: string;
  citySlug?: string;
}): Metadata['alternates'] {
  const cleanSub = subpath ? `/${subpath.replace(/^\/+|\/+$/g, '')}` : '';
  const canonicalUrl = `${SITE_URL}${getPublicCountryPath(countryCode, lang, cleanSub)}`;

  // If page is city-specific, alternate between the supported languages of that country
  if (citySlug) {
    const country = getCountryData(countryCode);
    const languages: Record<string, string> = {};

    if (countryCode === 'ae') {
      languages['en-AE'] = `${SITE_URL}/ae/locations/${citySlug}`;
      languages['ar-AE'] = `${SITE_URL}/ar-ae/locations/${citySlug}`;
      languages['x-default'] = `${SITE_URL}/ae/locations/${citySlug}`;
    } else if (countryCode === 'sa') {
      languages['ar-SA'] = `${SITE_URL}/sa/locations/${citySlug}`;
      languages['en-SA'] = `${SITE_URL}/en-sa/locations/${citySlug}`;
      languages['x-default'] = `${SITE_URL}/sa/locations/${citySlug}`;
    } else if (countryCode === 'uk') {
      languages['en-GB'] = `${SITE_URL}/uk/locations/${citySlug}`;
      languages['x-default'] = `${SITE_URL}/uk/locations/${citySlug}`;
    } else if (countryCode === 'us') {
      languages['en-US'] = `${SITE_URL}/us/locations/${citySlug}`;
      languages['x-default'] = `${SITE_URL}/us/locations/${citySlug}`;
    } else if (countryCode === 'au') {
      languages['en-AU'] = `${SITE_URL}/au/locations/${citySlug}`;
      languages['x-default'] = `${SITE_URL}/au/locations/${citySlug}`;
    }

    return {
      canonical: canonicalUrl,
      languages,
    };
  }

  // Cross-market pages (country hubs, services directory, service verticals, provider directories)
  return {
    canonical: canonicalUrl,
    languages: {
      'en-AE': `${SITE_URL}/ae${cleanSub}`,
      'ar-AE': `${SITE_URL}/ar-ae${cleanSub}`,
      'ar-SA': `${SITE_URL}/sa${cleanSub}`,
      'en-SA': `${SITE_URL}/en-sa${cleanSub}`,
      'en-GB': `${SITE_URL}/uk${cleanSub}`,
      'en-US': `${SITE_URL}/us${cleanSub}`,
      'en-AU': `${SITE_URL}/au${cleanSub}`,
      'x-default': `${SITE_URL}/en${cleanSub}`,
    },
  };
}

/**
 * Standard alternates for main non-country routes.
 */
export function constructAlternates(lang: 'en' | 'ar', path: string = ''): Metadata['alternates'] {
  const normalizedPath = path ? `/${path.replace(/^\/+|\/+$/g, '')}` : '';
  const canonicalUrl = `${SITE_URL}/${lang}${normalizedPath}`;

  return {
    canonical: canonicalUrl,
    languages: {
      en: `${SITE_URL}/en${normalizedPath}`,
      'en-SA': `${SITE_URL}/en-sa${normalizedPath}`,
      'en-AE': `${SITE_URL}/ae${normalizedPath}`,
      'en-GB': `${SITE_URL}/uk${normalizedPath}`,
      'en-US': `${SITE_URL}/us${normalizedPath}`,
      'en-AU': `${SITE_URL}/au${normalizedPath}`,
      ar: `${SITE_URL}/ar${normalizedPath}`,
      'ar-SA': `${SITE_URL}/sa${normalizedPath}`,
      'ar-AE': `${SITE_URL}/ar-ae${normalizedPath}`,
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
