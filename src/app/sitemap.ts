import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE = 'https://pontlook.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    url: string;
    priority: number;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
  }> = [
    { url: `${BASE}/en`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/ar`, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${BASE}/en/find-training`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/en/for-providers`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE}/en/who-we-are`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/en/contact`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/en/faq`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/en/privacy-policy`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE}/en/terms-of-service`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${BASE}/en/returns-faq`, priority: 0.5, changeFrequency: 'yearly' },
  ];

  return routes.map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
