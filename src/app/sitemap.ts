import type { MetadataRoute } from 'next';
import { ALL_SOLUTION_SLUGS } from '@/data/seoLandingPages';

export const dynamic = 'force-static';

const BASE = 'https://pontlook.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    url: string;
    priority: number;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
  }> = [
    // Core Bilingual Platform Routes
    { url: `${BASE}/en`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/ar`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/en/find-training`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/ar/find-training`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/en/for-providers`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/ar/for-providers`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/en/who-we-are`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/ar/who-we-are`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/en/contact`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/ar/contact`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/en/faq`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/ar/faq`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/en/privacy-policy`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE}/ar/privacy-policy`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE}/en/terms-of-service`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE}/ar/terms-of-service`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE}/en/returns-faq`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE}/ar/returns-faq`, priority: 0.5, changeFrequency: 'yearly' },
  ];

  // Dynamic Programmatic Solutions Clusters (Bilingual EN & AR)
  for (const slug of ALL_SOLUTION_SLUGS) {
    routes.push({
      url: `${BASE}/en/solutions/${slug}`,
      priority: 0.8,
      changeFrequency: 'weekly',
    });
    routes.push({
      url: `${BASE}/ar/solutions/${slug}`,
      priority: 0.8,
      changeFrequency: 'weekly',
    });
  }

  return routes.map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
