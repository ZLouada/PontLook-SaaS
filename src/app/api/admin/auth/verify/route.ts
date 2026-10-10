import { NextRequest, NextResponse } from 'next/server';
import {
  verifyOtpCode,
  signToken,
  getAdminSessionCookieName,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Verification code is required' },
        { status: 400 }
      );
    }

    const result = verifyOtpCode(code);
    if (!result.valid) {
      return NextResponse.json(
        { error: result.error || 'Invalid verification code' },
        { status: 400 }
      );
    }

    const token = signToken('anty_palantir');
    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
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
    console.error('Admin OTP verify error:', err);
    return NextResponse.json(
      { error: 'Internal server error verifying code' },
      { status: 500 }
    );
  }
}
