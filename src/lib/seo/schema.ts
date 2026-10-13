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
      url: `${SITE_URL}/images/brand/pontlook-logo-orange.png`,
      caption: 'PontLook Corporate Training Matchmaking Platform',
      width: 400,
      height: 100,
    },
    image: `${SITE_URL}/images/brand/og-main.png`,
    description:
      'Premier corporate training matchmaking platform connecting enterprise HR leaders with vetted, accredited corporate training academies across the GCC and internationally.',
    sameAs: [
      'https://www.linkedin.com/company/pontlook',
      'https://twitter.com/pontlook',
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

/**
 * 6. Provider Network Organization Schema
 */
export function buildProviderNetworkSchema({
  lang = 'en',
  canonicalUrl = `${SITE_URL}/for-providers`,
}: {
  lang?: 'en' | 'ar';
  canonicalUrl?: string;
} = {}) {
  const isAr = lang === 'ar';
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${canonicalUrl}#organization`,
    name: isAr ? 'شبكة مزودي التدريب المعتمدين | PontLook' : 'PontLook for Providers Network',
    legalName: 'PontLook Enterprise Matchmaking Ltd.',
    url: canonicalUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/brand/pontlook-logo-orange.png`,
      caption: 'PontLook for Providers Logo',
      width: 400,
      height: 100,
    },
    image: `${SITE_URL}/images/brand/og-providers.png`,
    description: isAr
      ? 'شبكة أكاديميات ومزودي التدريب المعتمدين للشركات في منطقة الشرق الأوسط والعالم.'
      : 'Accredited enterprise corporate training provider network connecting academies with verified corporate buyers.',
    sameAs: [
      'https://www.linkedin.com/company/pontlook',
      'https://twitter.com/pontlook',
    ],
  };
}

/**
 * 7. BlogPosting Schema
 */
export interface BlogPostingSchemaOptions {
  url: string;
  headline: string;
  description?: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  authorName?: string;
  lang?: 'en' | 'ar';
}

export function buildBlogPostingSchema({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName = 'PontLook Research',
  lang = 'en',
}: BlogPostingSchemaOptions) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    headline,
    inLanguage: lang === 'ar' ? 'ar' : 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'PontLook',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/brand/pontlook-logo-orange.png`,
        width: 400,
        height: 100,
      },
    },
  };

  if (description) {
    schema.description = description;
  }

  if (image) {
    schema.image = [image];
  }

  if (datePublished) {
    schema.datePublished = datePublished;
  }

  if (dateModified) {
    schema.dateModified = dateModified;
  } else if (datePublished) {
    schema.dateModified = datePublished;
  }

  return schema;
}

