import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE = 'https://pontlook.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/who-we-are', '/faq', '/for-providers', '/find-training', '/contact'].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }));
}
