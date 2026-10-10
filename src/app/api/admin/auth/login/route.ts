import { NextRequest, NextResponse } from 'next/server';
import { checkCredentials, generateAndSendOtp } from '@/lib/admin-auth';

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

    const isValid = checkCredentials(username.trim(), password.trim());
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const origin = req.headers.get('origin') || req.headers.get('referer') || 'https://pontlook.com';
    const otpResult = await generateAndSendOtp(origin);

    return NextResponse.json({
      success: true,
      sentToEmail: otpResult.sentToEmail,
      message: otpResult.sentToEmail
        ? 'Verification code sent to contact@pontlook.com'
        : 'Failed to deliver verification email. Your fallback code is provided below for administrative access.',
      devCode: !otpResult.sentToEmail ? otpResult.code : undefined,
    });
  } catch (err: any) {
    console.error('Admin login error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing login' },
      { status: 500 }
    );
  }
}
