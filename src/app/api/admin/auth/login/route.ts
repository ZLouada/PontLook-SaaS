import { NextRequest, NextResponse } from 'next/server';
import { checkCredentials, signToken, getAdminSessionCookieName, ALLOWED_ADMIN_EMAILS } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const email = (username || '').trim().toLowerCase();
    const isAllowed = ALLOWED_ADMIN_EMAILS.includes(email);
    if (!isAllowed) {
      return NextResponse.json(
        {
          error:
            'Access restricted: Only authorized administrative accounts (a.touikrou@pontlook.com, contact@pontlook.com, s.belahmidi@pontlook.com) may sign in.',
        },
        { status: 401 }
      );
    }

    const isValid = checkCredentials(email, password.trim());
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password. Please check your credentials and try again.' },
        { status: 401 }
      );
    }

    const token = signToken(username.trim());
    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
    });

    response.cookies.set({
      name: getAdminSessionCookieName(),
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err: any) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing login' },
      { status: 500 }
    );
  }
}
