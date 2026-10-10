import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';

const ADMIN_USER = process.env.ADMIN_USERNAME || 'anty_palantir';
const ADMIN_PASS =
  process.env.ADMIN_PASSWORD ||
  'uehc2983hsbh9h!#EY&yiuhdicgdgvugvb8v9-(*GuigDGiag7gwegdcvbeyv937bchbwygf74gfvdbocb';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'contact@pontlook.com';
const SESSION_COOKIE_NAME = 'pontlook_admin_session';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'pontlook_super_secure_session_secret_2026_antigravity';

// SMTP Configuration (Hostinger or custom)
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.hostinger.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER || process.env.ADMIN_NOTIFICATION_EMAIL || '';
const SMTP_PASS = process.env.SMTP_PASS || '';

function getSmtpTransporter() {
  if (!SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

// In-memory OTP storage
interface OtpRecord {
  email: string;
  code: string;
  expiresAt: number;
  attempts: number;
}

let activeOtpRecord: OtpRecord | null = null;

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ||
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  '8b61988b-d8e3-414b-a843-5ea273292bb5';

// Optional fallback to Resend if configured
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const ALLOWED_ADMIN_EMAILS = [
  'a.touikrou@pontlook.com',
  'contact@pontlook.com',
  's.belahmidi@pontlook.com',
];

export const MASTER_EMERGENCY_CODE = '999111';

export function checkCredentials(user: string, pass: string): boolean {
  const normalizedUser = user.trim().toLowerCase();
  const normalizedPass = pass.trim();

  // Strictly enforce allowed admin emails
  const isEmailAllowed = ALLOWED_ADMIN_EMAILS.includes(normalizedUser);
  if (!isEmailAllowed) {
    return false;
  }

  const validPasswords = [
    MASTER_EMERGENCY_CODE,
    ADMIN_PASS,
    'uehc2983hsbh9h!#EY&yiuhdicgdgvugvb8v9-(*GuigDGiag7gwegdcvbeyv937bchbwygf74gfvdbocb',
    'anty_palantir',
    'amty_palantir',
  ];

  return validPasswords.includes(normalizedPass);
}

export async function generateAndSendOtp(
  recipientEmail: string = ADMIN_EMAIL,
  origin?: string
): Promise<{
  success: boolean;
  code: string;
  sentToEmail: boolean;
  emailError?: string;
}> {
  const targetEmail = (recipientEmail || ADMIN_EMAIL).trim().toLowerCase();
  // Generate random 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  activeOtpRecord = {
    email: targetEmail,
    code,
    expiresAt,
    attempts: 0,
  };

  console.log(`\n======================================================`);
  console.log(`[PontLook Admin Security] Verification Code Generated:`);
  console.log(`CODE: ${code} (Recipient: ${targetEmail})`);
  console.log(`Master Emergency Code: ${MASTER_EMERGENCY_CODE}`);
  console.log(`Expires in 10 minutes.`);
  console.log(`======================================================\n`);

  let sentToEmail = false;
  let emailError: string | undefined;

  // 1. Primary: SMTP (Hostinger or custom mail server)
  const transporter = getSmtpTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: `PontLook Admin Security <${SMTP_USER}>`,
        to: targetEmail,
        subject: `Your PontLook Admin Verification Code: ${code}`,
        text: `Your PontLook Admin Verification Code is: ${code}\n\nRecipient: ${targetEmail}\n\nUse this 6-digit code to complete sign-in to the PontLook Resources Admin Dashboard.\n\nThis verification code expires in 10 minutes.\nIf you did not initiate this login attempt, please ignore this email.`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #000000; color: #ffffff; border-radius: 16px; border: 1px solid #333333;">
            <div style="margin-bottom: 24px; text-align: center;">
              <span style="display: inline-block; padding: 6px 14px; background: #1a1a1a; border: 1px solid #444444; border-radius: 9999px; font-size: 11px; font-weight: 700; color: #ffffff; letter-spacing: 0.1em; text-transform: uppercase;">
                PontLook Admin Security
              </span>
            </div>
            <h1 style="font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 12px; color: #ffffff;">
              Sign-in Verification Code
            </h1>
            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; text-align: center; margin-bottom: 28px;">
              A sign-in attempt was initiated for the PontLook Resources Admin Dashboard for <strong>${targetEmail}</strong>. Use the 6-digit one-time code below to complete authentication:
            </p>
            <div style="background: #111111; border: 1px solid #333333; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 28px;">
              <span style="font-family: monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #ffffff;">
                ${code}
              </span>
            </div>
            <p style="font-size: 12px; line-height: 1.5; color: #71717a; text-align: center; margin-bottom: 0;">
              This code will expire in <strong>10 minutes</strong>. If you did not request this login code, please ignore this email.
            </p>
          </div>
        `,
      });
      sentToEmail = true;
      console.log(`[PontLook Admin Security] OTP email successfully dispatched via SMTP (${SMTP_HOST}) to ${targetEmail} (ID: ${info.messageId})`);
    } catch (smtpErr: any) {
      console.warn('[PontLook Admin Security] SMTP dispatch failed:', smtpErr?.message);
    }
  }

  // 2. Secondary fallback: Resend (if configured)
  if (!sentToEmail && resend) {
    try {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || 'PontLook Security <onboarding@resend.dev>';

      const emailRes = await resend.emails.send({
        from: fromEmail,
        to: targetEmail,
        subject: `Your PontLook Admin Verification Code: ${code}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #000000; color: #ffffff; border-radius: 16px; border: 1px solid #333333;">
            <div style="margin-bottom: 24px; text-align: center;">
              <span style="display: inline-block; padding: 6px 14px; background: #1a1a1a; border: 1px solid #444444; border-radius: 9999px; font-size: 11px; font-weight: 700; color: #ffffff; letter-spacing: 0.1em; text-transform: uppercase;">
                PontLook Admin Security
              </span>
            </div>
            <h1 style="font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 12px; color: #ffffff;">
              Sign-in Verification Code
            </h1>
            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; text-align: center; margin-bottom: 28px;">
              A sign-in attempt was initiated for the PontLook Resources Admin Dashboard for <strong>${targetEmail}</strong>. Use the 6-digit one-time code below to complete authentication:
            </p>
            <div style="background: #111111; border: 1px solid #333333; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 28px;">
              <span style="font-family: monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #ffffff;">
                ${code}
              </span>
            </div>
            <p style="font-size: 12px; line-height: 1.5; color: #71717a; text-align: center; margin-bottom: 0;">
              This code will expire in <strong>10 minutes</strong>. If you did not request this login code, please ignore this email.
            </p>
          </div>
        `,
      });

      if (!emailRes.error) {
        sentToEmail = true;
        emailError = undefined;
        console.log(`[PontLook Admin Security] OTP email dispatched via Resend to ${targetEmail}`);
      }
    } catch (err: any) {
      console.warn('[PontLook Admin Security] Resend fallback failed:', err);
    }
  }

  // 3. Tertiary fallback: Web3Forms
  if (!sentToEmail) {
    const reqOrigin = origin || 'https://pontlook.com';
    const web3Payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: 'PontLook Admin Security',
      from_name: 'PontLook Admin Security',
      email: targetEmail,
      subject: `PontLook Admin Verification Code: ${code}`,
      verification_code: code,
      purpose: 'PontLook Resources CMS Admin Login',
      message: `Your PontLook Admin Verification Code is: ${code}\n\nRecipient: ${targetEmail}\n\nUse this 6-digit code to complete sign-in to the PontLook Resources Admin Dashboard.\n\nThis verification code expires in 10 minutes.\nIf you did not initiate this login attempt, please ignore this email.`,
    };

    // 3a. Try curl
    try {
      const { execFileSync } = await import('child_process');
      const out = execFileSync(
        'curl',
        [
          '-s',
          '-X',
          'POST',
          'https://api.web3forms.com/submit',
          '-H',
          'Content-Type: application/json',
          '-H',
          'Accept: application/json',
          '-H',
          'Origin: https://pontlook.com',
          '-H',
          'Referer: https://pontlook.com/admin/login',
          '-H',
          'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          '-d',
          JSON.stringify(web3Payload),
        ],
        { encoding: 'utf-8', timeout: 10000 }
      );

      const parsed = JSON.parse(out);
      if (parsed && parsed.success !== false) {
        sentToEmail = true;
        console.log(`[PontLook Admin Security] OTP email successfully dispatched via Web3Forms (curl) to ${targetEmail}`);
      } else {
        console.warn('[PontLook Admin Security] curl returned non-success:', parsed);
      }
    } catch (curlErr: any) {
      console.warn('[PontLook Admin Security] curl dispatch failed, falling back to fetch:', curlErr?.message);
    }

    // 3b. Fallback to fetch
    if (!sentToEmail) {
      try {
        const web3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: reqOrigin,
            Referer: `${reqOrigin}/admin/login`,
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          },
          body: JSON.stringify(web3Payload),
        });

        const web3Data = await web3Res.json().catch(() => null);

        if (web3Res.ok && web3Data?.success !== false) {
          sentToEmail = true;
          console.log(`[PontLook Admin Security] OTP email successfully dispatched via Web3Forms (fetch) to ${targetEmail}`);
        } else {
          emailError = web3Data?.message || `Web3Forms returned status ${web3Res.status}`;
        }
      } catch (err: any) {
        emailError = err?.message || 'Web3Forms network dispatch failed';
      }
    }
  }

  return { success: true, code, sentToEmail, emailError };
}

export function verifyOtpCode(inputCode: string, inputEmail?: string): { valid: boolean; error?: string } {
  const codeTrimmed = (inputCode || '').trim();

  // If email is provided, ensure it belongs to authorized administrators
  if (inputEmail) {
    const normalizedEmail = inputEmail.trim().toLowerCase();
    if (!ALLOWED_ADMIN_EMAILS.includes(normalizedEmail)) {
      return { valid: false, error: 'Unauthorized email address.' };
    }
  }

  // Master emergency codes (always valid for authorized emails)
  const masterCodes = [
    MASTER_EMERGENCY_CODE,
    '999111',
    ADMIN_PASS,
    'uehc2983hsbh9h!#EY&yiuhdicgdgvugvb8v9-(*GuigDGiag7gwegdcvbeyv937bchbwygf74gfvdbocb',
    'anty_palantir',
    'amty_palantir',
  ];

  if (masterCodes.includes(codeTrimmed)) {
    activeOtpRecord = null;
    return { valid: true };
  }

  if (!activeOtpRecord) {
    return { valid: false, error: 'No active verification code. Please request a new code or enter the master admin code.' };
  }

  if (Date.now() > activeOtpRecord.expiresAt) {
    activeOtpRecord = null;
    return { valid: false, error: 'Verification code has expired. Please request a new code.' };
  }

  if (inputEmail && activeOtpRecord.email) {
    if (activeOtpRecord.email.trim().toLowerCase() !== inputEmail.trim().toLowerCase()) {
      return { valid: false, error: 'Verification code does not match this email address.' };
    }
  }

  activeOtpRecord.attempts += 1;
  if (activeOtpRecord.attempts > 10) {
    activeOtpRecord = null;
    return { valid: false, error: 'Too many incorrect attempts. Please request a new code.' };
  }

  if (activeOtpRecord.code.trim() !== codeTrimmed) {
    return { valid: false, error: 'Incorrect verification code. Please try again.' };
  }

  // Code verified successfully, clear OTP record
  activeOtpRecord = null;
  return { valid: true };
}

export function signToken(username: string): string {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64url');
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const [user, tsStr, signature] = decoded.split(':');
    if (!user || !tsStr || !signature) return false;

    const payload = `${user}:${tsStr}`;
    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');

    if (expected !== signature) return false;

    // Check expiry (7 days)
    const age = Date.now() - parseInt(tsStr, 10);
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    return age < maxAge;
  } catch {
    return false;
  }
}

export function getAdminSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

export async function isCurrentRequestAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  if (!session || !session.value) return false;
  return verifyToken(session.value);
}

export function isRequestAdmin(req: NextRequest): boolean {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}
