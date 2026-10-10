import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale } from '@/i18n/config';

const LEGACY_REGIONAL_REDIRECTS: Record<string, string> = {
  '/ar-ae': '/ar',
  '/sa': '/ar',
  '/en-sa': '/en',
  '/ae': '/en',
  '/uk': '/en',
  '/us': '/en',
  '/au': '/en',
  '/en/solutions': '/en/find-training',
  '/ar/solutions': '/ar/find-training',
  '/solutions': '/en/find-training',
};

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const isWww = host.startsWith('www.');
  const { pathname, search } = request.nextUrl;

  // 1. Internal redirect for legacy /blog paths to /resources/blog
  if (
    pathname === '/blog' ||
    pathname === '/blog/' ||
    pathname === '/en/blog' ||
    pathname === '/ar/blog' ||
    pathname.startsWith('/en/blog/') ||
    pathname.startsWith('/ar/blog/')
  ) {
    const localeMatch = pathname.match(/^\/(en|ar)/);
    const targetLang = localeMatch ? localeMatch[1] : defaultLocale;
    const subPath = pathname
      .replace(/^\/(en|ar)\/blog/, '')
      .replace(/^\/blog/, '');
    const targetUrl = new URL(request.url);
    targetUrl.pathname = `/${targetLang}/resources/blog${subPath}`;
    return NextResponse.redirect(targetUrl, 301);
  }

const ALLOWED_HOSTS = ['pontlook.com', 'localhost', '127.0.0.1'];

function getSafeHost(rawHost: string): { host: string; protocol: string } {
  const cleanHost = rawHost.replace(/^www\./, '').replace(/:[0-9]+$/, '');
  const isAllowed = ALLOWED_HOSTS.includes(cleanHost) || cleanHost.endsWith('.vercel.app');
  const safeHost = isAllowed ? cleanHost : 'pontlook.com';
  const isLocal = safeHost.includes('localhost') || safeHost.includes('127.0.0.1');
  const protocol = isLocal ? 'http' : 'https';
  return { host: safeHost, protocol };
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
      const { host: safeHost, protocol } = getSafeHost(targetHost);
      const destination = `${protocol}://${safeHost}${targetPath}${search}`;
      return NextResponse.redirect(new URL(destination), 301);
    }
    const targetUrl = new URL(request.url);
    targetUrl.pathname = targetPath;
    return NextResponse.redirect(targetUrl, 301);
  }

  // 5. Legacy Regional & Solutions clean redirects
  for (const [prefix, destination] of Object.entries(LEGACY_REGIONAL_REDIRECTS)) {
    if (targetPath === prefix || targetPath.startsWith(`${prefix}/`)) {
      const redirectUrl = new URL(request.url);
      redirectUrl.pathname = destination;
      return NextResponse.redirect(redirectUrl, 301);
    }
  }

  // 6. Admin Portal Protection
  if (targetPath === '/admin' || (targetPath.startsWith('/admin/') && targetPath !== '/admin/login')) {
    const sessionCookie = request.cookies.get('pontlook_admin_session')?.value;
    if (!sessionCookie) {
      const loginUrl = new URL(request.url);
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
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