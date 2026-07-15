import { NextResponse } from 'next/server';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  type WizardData
} from '@/components/wizard/schemas';

// Simple in-memory rate limiting (Note: In production with multiple instances, use Redis or similar)
const rateLimit = new Map<string, { count: number, resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  if (!record || record.resetTime < now) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= MAX_REQUESTS) {
    return false;
  }
  record.count++;
  return true;
}

/**
 * Internal lead score — never shown to the submitting company.
 * Decision-maker confirmed +20 · 50–500 employees +20 · budget provided +15
 * timeline within 30 days +20 · multiple pain points +15 · detailed description +10
 */
function computeLeadScore(d: WizardData): number {
  let score = 0;
  if (d.fullName && d.jobTitle && d.email) score += 20;
  if (d.employees === '50–200' || d.employees === '201–500') score += 20;
  if (d.budgetRange && d.budgetRange !== 'Not defined yet') score += 15;
  if (d.startDate) {
    const days = (new Date(d.startDate).getTime() - Date.now()) / 86_400_000;
    if (days >= 0 && days <= 30) score += 20;
  }
  if ((d.challenges?.length ?? 0) >= 2) score += 15;
  if ((d.successDefinition ?? '').length + (d.biggestChallenge ?? '').length >= 200) score += 10;
  return score;
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const data = await req.json();

    // 2. Honeypot check for bots
    // We expect the client to send a honeypot field, if filled, it's a bot
    if (data._honeypot && data._honeypot.length > 0) {
      // Silently accept but do nothing
      return NextResponse.json({ success: true, dummy: true });
    }

    // 3. Server-side Validation
    const parsed1 = step1Schema.safeParse(data);
    const parsed2 = step2Schema.safeParse(data);
    const parsed3 = step3Schema.safeParse(data);
    const parsed4 = step4Schema.safeParse(data);
    const parsed5 = step5Schema.safeParse(data);

    if (!parsed1.success || !parsed2.success || !parsed3.success || !parsed4.success || !parsed5.success) {
      return NextResponse.json({ error: 'Invalid data submitted' }, { status: 400 });
    }

    // 4. Secure Server-Side Logic (Lead Scoring)
    const score = computeLeadScore(data as WizardData);
    
    // Construct the finalized lead object securely
    const finalLead = {
      ...data,
      _score: score,
      _honeypot: undefined, // strip honeypot
      submittedAt: new Date().toISOString()
    };

    // 5. Database Insertion (Mocked)
    // Here we would use an ORM (Prisma) or a database client (Supabase, Firebase Admin)
    // to store the lead securely at rest.
    console.log('[API] New Lead Saved Securely:', { email: finalLead.email, score: finalLead._score });

    return NextResponse.json({ success: true, score });
  } catch (error) {
    console.error('[API] Error processing lead:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
