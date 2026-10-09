import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/preview/',
          '/staging/',
        ],
      },
    ],
    sitemap: [
      'https://pontlook.com/sitemap.xml',
    ],
  };
}
