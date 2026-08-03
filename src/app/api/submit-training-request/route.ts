import { NextResponse } from 'next/server';
import { generateLeadPdf } from '@/lib/pdf-generator';
import { sendLeadNotificationEmail } from '@/lib/email';
import { calculateLeadScore } from '@/lib/lead-scoring';
import { WizardData } from '@/components/wizard/schemas';

export async function POST(request: Request) {
  try {
    const body: WizardData & {
      referralSourceUrl?: string;
      languagePreference?: string;
      preferredContactMethod?: string;
    } = await request.json();

    // Honeypot bot protection
    if (body._honeypot && body._honeypot.trim().length > 0) {
      return NextResponse.json({ error: 'Bot submission rejected' }, { status: 400 });
    }

    // Required fields validation fallback
    if (!body.companyName || !body.email || !body.fullName) {
      return NextResponse.json(
        { error: 'Missing required lead fields (companyName, email, fullName)' },
        { status: 422 }
      );
    }

    // Enrich lead metadata
    const referenceId = `PL-LEAD-${Date.now().toString(36).toUpperCase()}`;
    const submittedAt = new Date().toISOString();

    const fullLeadData = {
      ...body,
      referenceId,
      submittedAt,
      preferredContactMethod: body.preferredContactMethod || 'Email / Phone / WhatsApp',
      languagePreference: body.languagePreference || body.language || '/en',
      referralSourceUrl: body.referralSourceUrl || 'https://pontlook.com/en/find-training',
      targetAudience: 'Executives, Managers & Key Staff',
      targetGeographicMarkets: body.country ? [body.country, 'GCC Region'] : ['Saudi Arabia', 'GCC Region'],
      preferredContractModel: 'Model A: Pay-Per-Lead (Qualified Introductions)',
    };

    // Calculate score & priority tier
    const scoreResult = calculateLeadScore(fullLeadData);

    // Generate PDF document buffer
    const pdfBuffer = await generateLeadPdf(fullLeadData);

    // Dispatch email with attached PDF
    const emailResult = await sendLeadNotificationEmail(fullLeadData, pdfBuffer, scoreResult);

    return NextResponse.json({
      success: true,
      referenceId,
      leadScore: scoreResult.score,
      leadTier: scoreResult.tier,
      emailSent: emailResult.success,
      emailSimulated: Boolean(emailResult.simulated),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown server error';
    console.error('[SUBMISSION API ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process submission', details: errorMessage },
      { status: 500 }
    );
  }
}
