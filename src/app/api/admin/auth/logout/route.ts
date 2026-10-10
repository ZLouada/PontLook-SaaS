import { NextResponse } from 'next/server';
import { getAdminSessionCookieName } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(getAdminSessionCookieName());
  return response;
}
