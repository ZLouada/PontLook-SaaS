// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale } from '@/i18n/config';
import { verifySessionToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root request '/' immediately redirects to '/en' (defaultLocale) without checking browser language headers or cookies
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 308); // 308 Permanent Redirect
  }

  // Protect all /admin routes — redirect unauthenticated visitors to /login
  if (pathname.startsWith('/admin')) {
    const sessionCookie = request.cookies.get('admin_session')?.value;

    if (!sessionCookie) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifySessionToken(sessionCookie);
    if (!payload) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/login';
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Already logged-in admin visiting /login → redirect to dashboard
  if (pathname === '/login' || pathname === '/login/') {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    if (sessionCookie) {
      const payload = await verifySessionToken(sessionCookie);
      if (payload) {
        const dashboardUrl = request.nextUrl.clone();
        dashboardUrl.pathname = '/admin/bloggers';
        return NextResponse.redirect(dashboardUrl);
      }
    }
  }
}

export const config = {
  matcher: ['/', '/admin/:path*', '/login'],
};