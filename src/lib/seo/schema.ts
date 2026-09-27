import { CityData, CountryData, ServiceVertical } from '@/data/geoData';
import { SITE_URL } from './metadata';

/**
 * 1. Global Organization Schema
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'PontLook',
    legalName: 'PontLook Enterprise Matchmaking Ltd.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/PontLook-Logo.png`,
      caption: 'PontLook Corporate Training Matchmaking Platform',
      width: 512,
      height: 512,
    },
    description:
      'Premier corporate training matchmaking platform connecting enterprise HR leaders with vetted, accredited corporate training academies across the GCC, UK, US, and Australia.',
    sameAs: [
      'https://www.linkedin.com/company/pontlook',
      'https://twitter.com/pontlook',
      'https://blog.pontlook.com',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'partnerships@pontlook.com',
        availableLanguage: ['en', 'ar'],
      },
    ],
  };
}

/**
 * 2. EducationalOrganization / LocalBusiness Schema for Cities
 */
export function buildCityOrganizationSchema({
  city,
  country,
  lang,
  canonicalUrl,
}: {
  city: CityData;
  country: CountryData;
  lang: 'en' | 'ar';
  canonicalUrl: string;
}) {
  const isAr = lang === 'ar';
  const cityName = isAr ? city.nameAr : city.nameEn;
  const countryName = isAr ? country.nameAr : country.nameEn;

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${canonicalUrl}#organization`,
    name: `PontLook ${cityName}`,
    url: canonicalUrl,
    logo: `${SITE_URL}/images/brand/pontlook-logo-orange.png`,
    description: isAr ? city.leadParagraphAr : city.leadParagraphEn,
    currenciesAccepted: country.currency,
    paymentAccepted: 'Corporate Invoicing, Bank Transfer',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressCountry: country.isoCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: city.lat,
      longitude: city.lng,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: cityName,
      },
      {
        '@type': 'Country',
        name: countryName,
      },
    ],
    parentOrganization: {
      '@type': 'Organization',
      name: 'PontLook',
      url: SITE_URL,
    },
  };
}

/**
 * 3. Service Schema for Service Catalog & Service Detail Pages
 */
export function buildServiceSchema({
  service,
  country,
  lang,
  canonicalUrl,
}: {
  service: ServiceVertical;
  country: CountryData;
  lang: 'en' | 'ar';
  canonicalUrl: string;
}) {
  const isAr = lang === 'ar';
  const serviceTitle = isAr ? service.titleAr : service.titleEn;
  const serviceDesc = isAr ? service.shortDescAr : service.shortDescEn;
  const countryName = isAr ? country.nameAr : country.nameEn;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonicalUrl}#service`,
    name: `${serviceTitle} in ${countryName}`,
    serviceType: serviceTitle,
    description: serviceDesc,
    provider: {
      '@type': 'Organization',
      name: 'PontLook',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: countryName,
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: isAr ? service.audienceAr : service.audienceEn,
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: canonicalUrl,
      availableLanguage: country.supportedLangs,
    },
    category: 'Corporate Training & Executive Capability Building',
  };
}

/**
 * 4. BreadcrumbList Schema
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * 5. FAQPage Schema
 */
export function buildFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
