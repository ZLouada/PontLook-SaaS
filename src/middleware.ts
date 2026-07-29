// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root request '/' immediately redirects to '/en' (defaultLocale) without checking browser language headers or cookies
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 308); // 308 Permanent Redirect
  }
}

export const config = {
  matcher: ['/'],
};