import { SignJWT, jwtVerify } from 'jose';
import { compareSync } from 'bcryptjs';

const JWT_SECRET = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set');
  return new TextEncoder().encode(secret);
};

export interface SessionPayload {
  email: string;
  role: 'admin';
}

/**
 * Verify admin login credentials against environment variables.
 */
export function verifyCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD_HASH not configured');
    return false;
  }

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
    return false;
  }

  return compareSync(password, adminHash);
}

/**
 * Create a signed JWT session token (24h expiry).
 */
export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email, role: 'admin' } satisfies SessionPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET());
}

/**
 * Verify a JWT session token and return the payload.
 */
export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
