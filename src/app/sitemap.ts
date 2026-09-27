import { MetadataRoute } from 'next';
import { ALL_SOLUTION_SLUGS } from '@/data/seoLandingPages';
import {
  ALL_COUNTRY_CODES,
  getCountryData,
  ALL_SERVICE_SLUGS,
} from '@/data/geoData';
import { getPublicCountryPath } from '@/lib/seo/metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pontlook.com';
  const now = new Date();

  // 1. Core Global Routes
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
          'x-default': `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          ar: `${baseUrl}/ar`,
          'x-default': `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/en/find-training`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/find-training`,
          ar: `${baseUrl}/ar/find-training`,
          'x-default': `${baseUrl}/en/find-training`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/find-training`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/find-training`,
          ar: `${baseUrl}/ar/find-training`,
          'x-default': `${baseUrl}/en/find-training`,
        },
      },
    },
    {
      url: `${baseUrl}/en/for-providers`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/for-providers`,
          ar: `${baseUrl}/ar/for-providers`,
          'x-default': `${baseUrl}/en/for-providers`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/for-providers`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/for-providers`,
          ar: `${baseUrl}/ar/for-providers`,
          'x-default': `${baseUrl}/en/for-providers`,
        },
      },
    },
    {
      url: `${baseUrl}/en/who-we-are`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/who-we-are`,
          ar: `${baseUrl}/ar/who-we-are`,
          'x-default': `${baseUrl}/en/who-we-are`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/who-we-are`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/who-we-are`,
          ar: `${baseUrl}/ar/who-we-are`,
          'x-default': `${baseUrl}/en/who-we-are`,
        },
      },
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/contact`,
          ar: `${baseUrl}/ar/contact`,
          'x-default': `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/contact`,
          ar: `${baseUrl}/ar/contact`,
          'x-default': `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/faq`,
          ar: `${baseUrl}/ar/faq`,
          'x-default': `${baseUrl}/en/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/faq`,
          ar: `${baseUrl}/ar/faq`,
          'x-default': `${baseUrl}/en/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ar/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ar/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/en/returns-faq`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ar/returns-faq`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 2. Programmatic Solutions Clusters
  const solutionRoutes: MetadataRoute.Sitemap = ALL_SOLUTION_SLUGS.flatMap((slug) => [
    {
      url: `${baseUrl}/en/solutions/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/solutions/${slug}`,
          ar: `${baseUrl}/ar/solutions/${slug}`,
          'x-default': `${baseUrl}/en/solutions/${slug}`,
        },
      },
    },
    {
      url: `${baseUrl}/ar/solutions/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/solutions/${slug}`,
          ar: `${baseUrl}/ar/solutions/${slug}`,
          'x-default': `${baseUrl}/en/solutions/${slug}`,
        },
      },
    },
  ]);

  // 3. International Country Hubs with Reciprocal Hreflangs
  const countryHubRoutes: MetadataRoute.Sitemap = [];
  const crossMarketAlternates: Record<string, string> = {
    'en-AE': `${baseUrl}/ae`,
    'ar-AE': `${baseUrl}/ar-ae`,
    'ar-SA': `${baseUrl}/sa`,
    'en-SA': `${baseUrl}/en-sa`,
    'en-GB': `${baseUrl}/uk`,
    'en-US': `${baseUrl}/us`,
    'en-AU': `${baseUrl}/au`,
    'x-default': `${baseUrl}/en`,
  };

  for (const countryCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(countryCode);
    if (!country) continue;

    for (const lang of country.supportedLangs) {
      const publicPath = getPublicCountryPath(countryCode, lang);
      countryHubRoutes.push({
        url: `${baseUrl}${publicPath}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.95,
        alternates: {
          languages: crossMarketAlternates,
        },
      });
    }
  }

  // 4. Regional City Landing Pages with Local Reciprocal Hreflangs
  const cityRoutes: MetadataRoute.Sitemap = [];

  for (const countryCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(countryCode);
    if (!country) continue;

    for (const city of country.cities) {
      const cityLangs: Record<string, string> = {};
      if (countryCode === 'ae') {
        cityLangs['en-AE'] = `${baseUrl}/ae/locations/${city.slug}`;
        cityLangs['ar-AE'] = `${baseUrl}/ar-ae/locations/${city.slug}`;
        cityLangs['x-default'] = `${baseUrl}/ae/locations/${city.slug}`;
      } else if (countryCode === 'sa') {
        cityLangs['ar-SA'] = `${baseUrl}/sa/locations/${city.slug}`;
        cityLangs['en-SA'] = `${baseUrl}/en-sa/locations/${city.slug}`;
        cityLangs['x-default'] = `${baseUrl}/sa/locations/${city.slug}`;
      } else if (countryCode === 'uk') {
        cityLangs['en-GB'] = `${baseUrl}/uk/locations/${city.slug}`;
        cityLangs['x-default'] = `${baseUrl}/uk/locations/${city.slug}`;
      } else if (countryCode === 'us') {
        cityLangs['en-US'] = `${baseUrl}/us/locations/${city.slug}`;
        cityLangs['x-default'] = `${baseUrl}/us/locations/${city.slug}`;
      } else if (countryCode === 'au') {
        cityLangs['en-AU'] = `${baseUrl}/au/locations/${city.slug}`;
        cityLangs['x-default'] = `${baseUrl}/au/locations/${city.slug}`;
      }

      for (const lang of country.supportedLangs) {
        const publicPath = getPublicCountryPath(countryCode, lang, `locations/${city.slug}`);
        cityRoutes.push({
          url: `${baseUrl}${publicPath}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.9,
          alternates: {
            languages: cityLangs,
          },
        });
      }
    }
  }

  // 5. Regional Locations Directory Pages
  const locationsDirectoryRoutes: MetadataRoute.Sitemap = [];
  const locationsAlternates: Record<string, string> = {
    'en-AE': `${baseUrl}/ae/locations`,
    'ar-AE': `${baseUrl}/ar-ae/locations`,
    'ar-SA': `${baseUrl}/sa/locations`,
    'en-SA': `${baseUrl}/en-sa/locations`,
    'en-GB': `${baseUrl}/uk/locations`,
    'en-US': `${baseUrl}/us/locations`,
    'en-AU': `${baseUrl}/au/locations`,
    'x-default': `${baseUrl}/en`,
  };

  for (const countryCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(countryCode);
    if (!country) continue;

    for (const lang of country.supportedLangs) {
      const publicPath = getPublicCountryPath(countryCode, lang, 'locations');
      locationsDirectoryRoutes.push({
        url: `${baseUrl}${publicPath}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: locationsAlternates,
        },
      });
    }
  }

  // 6. Country Services Catalog & Detail Pages
  const serviceRoutes: MetadataRoute.Sitemap = [];

  for (const countryCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(countryCode);
    if (!country) continue;

    // Services Catalog
    for (const lang of country.supportedLangs) {
      const publicPath = getPublicCountryPath(countryCode, lang, 'services');
      serviceRoutes.push({
        url: `${baseUrl}${publicPath}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: {
          languages: {
            'en-AE': `${baseUrl}/ae/services`,
            'ar-AE': `${baseUrl}/ar-ae/services`,
            'ar-SA': `${baseUrl}/sa/services`,
            'en-SA': `${baseUrl}/en-sa/services`,
            'en-GB': `${baseUrl}/uk/services`,
            'en-US': `${baseUrl}/us/services`,
            'en-AU': `${baseUrl}/au/services`,
            'x-default': `${baseUrl}/en`,
          },
        },
      });
    }

    // Individual Service Pages
    for (const serviceSlug of ALL_SERVICE_SLUGS) {
      const serviceAlternates: Record<string, string> = {
        'en-AE': `${baseUrl}/ae/services/${serviceSlug}`,
        'ar-AE': `${baseUrl}/ar-ae/services/${serviceSlug}`,
        'ar-SA': `${baseUrl}/sa/services/${serviceSlug}`,
        'en-SA': `${baseUrl}/en-sa/services/${serviceSlug}`,
        'en-GB': `${baseUrl}/uk/services/${serviceSlug}`,
        'en-US': `${baseUrl}/us/services/${serviceSlug}`,
        'en-AU': `${baseUrl}/au/services/${serviceSlug}`,
        'x-default': `${baseUrl}/en`,
      };

      for (const lang of country.supportedLangs) {
        const publicPath = getPublicCountryPath(countryCode, lang, `services/${serviceSlug}`);
        serviceRoutes.push({
          url: `${baseUrl}${publicPath}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.85,
          alternates: {
            languages: serviceAlternates,
          },
        });
      }
    }
  }

  // 7. Country Providers Directory Pages
  const providerRoutes: MetadataRoute.Sitemap = [];
  const providersAlternates: Record<string, string> = {
    'en-AE': `${baseUrl}/ae/providers`,
    'ar-AE': `${baseUrl}/ar-ae/providers`,
    'ar-SA': `${baseUrl}/sa/providers`,
    'en-SA': `${baseUrl}/en-sa/providers`,
    'en-GB': `${baseUrl}/uk/providers`,
    'en-US': `${baseUrl}/us/providers`,
    'en-AU': `${baseUrl}/au/providers`,
    'x-default': `${baseUrl}/en/for-providers`,
  };

  for (const countryCode of ALL_COUNTRY_CODES) {
    const country = getCountryData(countryCode);
    if (!country) continue;

    for (const lang of country.supportedLangs) {
      const publicPath = getPublicCountryPath(countryCode, lang, 'providers');
      providerRoutes.push({
        url: `${baseUrl}${publicPath}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: providersAlternates,
        },
      });
    }
  }

  return [
    ...coreRoutes,
    ...solutionRoutes,
    ...countryHubRoutes,
    ...cityRoutes,
    ...locationsDirectoryRoutes,
    ...serviceRoutes,
    ...providerRoutes,
  ];
}
