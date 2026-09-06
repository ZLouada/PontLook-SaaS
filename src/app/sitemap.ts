import { MetadataRoute } from 'next';
import { ALL_SOLUTION_SLUGS } from '@/data/seoLandingPages';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pontlook.com';
  const now = new Date();

  const routes = [
    { path: '/en', priority: 1.0, freq: 'weekly' as const },
    { path: '/ar', priority: 1.0, freq: 'weekly' as const },
    { path: '/en/find-training', priority: 0.9, freq: 'weekly' as const },
    { path: '/ar/find-training', priority: 0.9, freq: 'weekly' as const },
    { path: '/en/for-providers', priority: 0.9, freq: 'weekly' as const },
    { path: '/ar/for-providers', priority: 0.9, freq: 'weekly' as const },
    { path: '/en/who-we-are', priority: 0.8, freq: 'monthly' as const },
    { path: '/ar/who-we-are', priority: 0.8, freq: 'monthly' as const },
    { path: '/en/contact', priority: 0.8, freq: 'monthly' as const },
    { path: '/ar/contact', priority: 0.8, freq: 'monthly' as const },
    { path: '/en/faq', priority: 0.7, freq: 'monthly' as const },
    { path: '/ar/faq', priority: 0.7, freq: 'monthly' as const },
    { path: '/en/privacy-policy', priority: 0.5, freq: 'yearly' as const },
    { path: '/ar/privacy-policy', priority: 0.5, freq: 'yearly' as const },
    { path: '/en/terms-of-service', priority: 0.5, freq: 'yearly' as const },
    { path: '/ar/terms-of-service', priority: 0.5, freq: 'yearly' as const },
    { path: '/en/returns-faq', priority: 0.5, freq: 'yearly' as const },
    { path: '/ar/returns-faq', priority: 0.5, freq: 'yearly' as const },
    // Programmatic Solutions Clusters (Bilingual EN & AR)
    ...ALL_SOLUTION_SLUGS.flatMap((slug) => [
      { path: `/en/solutions/${slug}`, priority: 0.8, freq: 'weekly' as const },
      { path: `/ar/solutions/${slug}`, priority: 0.8, freq: 'weekly' as const },
    ]),
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.freq,
    priority: route.priority,
  }));
}
