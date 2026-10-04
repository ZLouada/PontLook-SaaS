import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pontlook.com';
  const now = new Date();

  // Core Platform Routes in English and Arabic
  const corePaths = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: 'who-we-are', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: 'find-training', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: 'find-training/request', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: 'find-training/apply', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: 'for-providers', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: 'for-providers/apply', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: 'contact', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: 'faq', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: 'returns-faq', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: 'terms-of-service', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: 'privacy-policy', changeFrequency: 'yearly' as const, priority: 0.5 },
  ];

  const routes: MetadataRoute.Sitemap = [];

  for (const item of corePaths) {
    const sub = item.path ? '/' + item.path : '';
    const enUrl = baseUrl + '/en' + sub;
    const arUrl = baseUrl + '/ar' + sub;

    // English version
    routes.push({
      url: enUrl,
      lastModified: now,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
      alternates: {
        languages: {
          en: enUrl,
          ar: arUrl,
          'x-default': enUrl,
        },
      },
    });

    // Arabic version
    routes.push({
      url: arUrl,
      lastModified: now,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
      alternates: {
        languages: {
          en: enUrl,
          ar: arUrl,
          'x-default': enUrl,
        },
      },
    });
  }

  return routes;
}
