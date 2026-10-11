import { NextRequest, NextResponse } from 'next/server';
import {
  signToken,
  getAdminSessionCookieName,
  ALLOWED_ADMIN_EMAILS,
  generateAndSendOtp,
  verifyOtpCode,
} from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, otpCode, action } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Admin email is required.' },
        { status: 400 }
      );
    }

    const email = (username || '').trim().toLowerCase();
    const isAllowed = ALLOWED_ADMIN_EMAILS.includes(email);
    if (!isAllowed) {
      return NextResponse.json(
        {
          error: 'Access restricted: This email is not authorized to sign in.',
        },
        { status: 401 }
      );
    }

    // Step 2: Validate OTP Code
    if (otpCode) {
      const codeStr = String(otpCode).trim();
      const verifyResult = verifyOtpCode(codeStr, email);

      if (!verifyResult.valid) {
        return NextResponse.json(
          { error: verifyResult.error || 'Invalid or expired verification code.' },
          { status: 401 }
        );
      }

      // Successful verification! Create session token and set secure HTTP-only cookie
      const token = signToken(email);
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
    }

    // Step 1: Send verification code to the authorized email
    const origin =
      req.headers.get('origin') || req.headers.get('referer') || 'https://pontlook.com';
    const otpResult = await generateAndSendOtp(email, origin);

    return NextResponse.json({
      success: true,
      requireOtp: true,
      email,
      sentToEmail: otpResult.sentToEmail,
      message: 'Verification code required.',
    });
  } catch (err: any) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing login' },
      { status: 500 }
    );
  }
}
