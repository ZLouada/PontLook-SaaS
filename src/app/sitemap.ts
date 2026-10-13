import { MetadataRoute } from 'next';
import { getSitemapArticles } from '@/lib/payload/resources';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    { path: 'resources', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: 'resources/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: 'resources/podcasts', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: 'resources/downloads', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: 'resources/events', changeFrequency: 'weekly' as const, priority: 0.8 },
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

  // Fetch published articles dynamically from Payload CMS
  const articles = await getSitemapArticles();

  for (const article of articles) {
    const enUrl = `${baseUrl}/en/resources/blog/${article.slug}`;
    const arUrl = `${baseUrl}/ar/resources/blog/${article.slug}`;

    const rawDate = article.updatedAt || article.publishedAt;
    const lastModDate = rawDate ? new Date(rawDate) : undefined;
    const validLastMod = lastModDate && !isNaN(lastModDate.getTime()) ? lastModDate : undefined;

    // Language alternates based on actual content availability
    const languages: Record<string, string> = {};
    if (article.hasEn) languages.en = enUrl;
    if (article.hasAr) languages.ar = arUrl;
    if (article.hasEn) {
      languages['x-default'] = enUrl;
    } else if (article.hasAr) {
      languages['x-default'] = arUrl;
    }

    const hasMultipleLangs = Object.keys(languages).filter((k) => k !== 'x-default').length > 1;
    const alternates = hasMultipleLangs ? { languages } : undefined;

    // Only emit URLs for locales where the article actually exists and is not noindex
    if (article.hasEn) {
      routes.push({
        url: enUrl,
        lastModified: validLastMod,
        alternates,
      });
    }

    if (article.hasAr) {
      routes.push({
        url: arUrl,
        lastModified: validLastMod,
        alternates,
      });
    }
  }

  return routes;
}

