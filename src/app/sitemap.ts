import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE = 'https://pontlook.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { url: `${BASE}/en`, priority: 1.0 },
    { url: `${BASE}/en/who-we-are`, priority: 0.8 },
    { url: `${BASE}/en/for-providers`, priority: 0.8 },
    { url: `${BASE}/en/find-training`, priority: 0.8 },
    { url: `${BASE}/en/contact`, priority: 0.8 },
    { url: `${BASE}/en/faq`, priority: 0.8 },
    { url: `${BASE}/en/privacy-policy`, priority: 0.5 },
    { url: `${BASE}/en/terms-of-service`, priority: 0.5 },
    { url: `${BASE}/en/returns-faq`, priority: 0.5 },
    { url: 'https://blog.pontlook.com', priority: 0.8 },
  ];

  return routes.map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: r.priority,
  }));
}
