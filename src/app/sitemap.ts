import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

const BASE = 'https://www.pontlook.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/for-providers', '/find-training', '/research', '/contact'].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.8,
  }));
  const posts = getAllPosts().map((p) => ({
    url: `${BASE}/research/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
