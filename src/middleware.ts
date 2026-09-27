import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale } from '@/i18n/config';

interface RegionalMapping {
  prefix: string;
  targetLang: string;
  targetCountry: string;
}

const REGIONAL_REWRITES: RegionalMapping[] = [
  { prefix: '/ar-ae', targetLang: 'ar', targetCountry: 'ae' },
  { prefix: '/en-sa', targetLang: 'en', targetCountry: 'sa' },
  { prefix: '/ae', targetLang: 'en', targetCountry: 'ae' },
  { prefix: '/sa', targetLang: 'ar', targetCountry: 'sa' },
  { prefix: '/uk', targetLang: 'en', targetCountry: 'uk' },
  { prefix: '/us', targetLang: 'en', targetCountry: 'us' },
  { prefix: '/au', targetLang: 'en', targetCountry: 'au' },
];

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const isWww = host.startsWith('www.');
  const { pathname, search } = request.nextUrl;

  // 1. Check for blog redirects to external WordPress subdomain
  if (
    pathname === '/blog' ||
    pathname === '/blog/' ||
    pathname === '/en/blog' ||
    pathname === '/ar/blog' ||
    pathname.startsWith('/en/blog/') ||
    pathname.startsWith('/ar/blog/')
  ) {
    const blogPath =
      pathname
        .replace(/^\/(en|ar)\/blog/, '')
        .replace(/^\/blog/, '') || '/';
    return NextResponse.redirect(new URL(`https://blog.pontlook.com${blogPath}${search}`), 301);
  }

  // Determine if URL needs normalization (www removal, trailing slash stripping, or root locale addition)
  let targetHost = host;
  let targetPath = pathname;
  let shouldRedirect = false;

  // 2. Normalize www to non-www
  if (isWww) {
    targetHost = host.replace(/^www\./, '');
    shouldRedirect = true;
  }

  // 3. Normalize root path to default locale
  if (targetPath === '/') {
    targetPath = `/${defaultLocale}`;
    shouldRedirect = true;
  } else if (targetPath.length > 1 && targetPath.endsWith('/')) {
    // 4. Strip trailing slashes (e.g., /en/ -> /en, /ae/ -> /ae)
    targetPath = targetPath.replace(/\/+$/, '');
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    if (isWww) {
      const destination = `https://${targetHost.replace(/:[0-9]+$/, '')}${targetPath}${search}`;
      return NextResponse.redirect(new URL(destination), 301);
    }
    const targetUrl = new URL(request.url);
    targetUrl.pathname = targetPath;
    return NextResponse.redirect(targetUrl, 301);
  }

  // 5. Regional clean URL rewrites (e.g. /ae/locations/dubai -> /en/ae/locations/dubai)
  for (const mapping of REGIONAL_REWRITES) {
    if (targetPath === mapping.prefix || targetPath.startsWith(`${mapping.prefix}/`)) {
      const rest = targetPath.slice(mapping.prefix.length);
      const internalDestination = `/${mapping.targetLang}/${mapping.targetCountry}${rest}`;
      const rewriteUrl = new URL(request.url);
      rewriteUrl.pathname = internalDestination;
      return NextResponse.rewrite(rewriteUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml, manifest, images and assets with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|.*\\..*).*)',
    '/',
  ],
};