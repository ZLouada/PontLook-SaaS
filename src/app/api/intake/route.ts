import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { calculateLeadScore } from '@/lib/lead-scoring';
import { isCorporateEmail, TRAINING_DOMAINS, DELIVERY_MODES, COHORT_SIZES, TIMELINES, BUDGET_BANDS } from '@/components/wizard/schemas';
import { resolveDomainLabel } from '@/components/wizard/trainingDomains';

// Runtime config for Next.js API route
export const dynamic = 'force-dynamic';

// Incoming payload validation schema
const intakePayloadSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  jobTitle: z.string().trim().min(2, 'Job title required'),
  workEmail: z
    .string()
    .trim()
    .email('Invalid email')
    .refine((val) => isCorporateEmail(val), {
      message: 'Must be a corporate domain email',
    }),
  organizationName: z.string().trim().min(2, 'Organization name required'),
  country: z.string().min(1, 'Country required'),
  phoneCountryCode: z.string().default('+966'),
  phoneNumber: z.string().trim().min(7, 'Valid phone number required'),
  domains: z.array(z.string()).min(1, 'At least one domain required'),
  otherDomainText: z.string().optional().or(z.literal('')),
  deliveryMode: z.enum(['in_person', 'virtual', 'hybrid']),
  city: z.string().optional().or(z.literal('')),
  language: z.enum(['arabic', 'english', 'bilingual']),
  customization: z.enum(['tailored', 'standard']),
  cohortSize: z.enum(['1_5_execs', '6_20_team', '21_50_dept', '50_plus_enterprise']),
  timeline: z.enum(['immediate', 'within_30_days', 'next_quarter', 'planning']),
  budgetBand: z.enum(['under_10k', '10k_25k', '25k_50k', '50k_plus', 'pending_guidance']),
  additionalContext: z.string().optional().or(z.literal('')),
  _gotcha: z.string().optional().or(z.literal('')),
});

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const crmWebhookUrl = process.env.CRM_WEBHOOK_URL;
const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xppawggd';

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    const rawBody = await req.json().catch(() => null);
    if (!rawBody) {
      return NextResponse.json(
        { success: false, error: 'Invalid or empty JSON body' },
        { status: 400 }
      );
    }

    // Bot honeypot verification
    if (rawBody._gotcha && String(rawBody._gotcha).trim().length > 0) {
      console.warn('[Security] Bot honeypot triggered; request dropped');
      return NextResponse.json({
        success: true,
        leadId: `lead_bot_${Date.now()}`,
        tier: 'QUALIFIED',
        score: 0,
      });
    }

    // Validate request schema
    const validationResult = intakePayloadSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const data = validationResult.data;
    const leadId = `PL-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // 1. Calculate B2B Lead Score & Qualification Tier
    const leadScoreResult = calculateLeadScore({
      ...data,
      workEmail: data.workEmail,
      jobTitle: data.jobTitle,
      cohortSize: data.cohortSize,
      budgetBand: data.budgetBand,
      timeline: data.timeline,
      additionalContext: data.additionalContext,
    });

    // 2. Format Domain & Scope Labels
    const domainNames = data.domains
      .map((dId) => {
        if (dId === 'other') return data.otherDomainText ? `Specialized (${data.otherDomainText})` : 'Specialized/Other';
        return resolveDomainLabel(dId) || TRAINING_DOMAINS.find((t) => t.id === dId)?.title || dId;
      })
      .join(', ');

    const deliveryModeName =
      DELIVERY_MODES.find((m) => m.id === data.deliveryMode)?.title || data.deliveryMode;

    const cohortLabel =
      COHORT_SIZES.find((c) => c.id === data.cohortSize)?.label || data.cohortSize;

    const timelineLabel =
      TIMELINES.find((t) => t.id === data.timeline)?.label || data.timeline;

    const budgetLabel =
      BUDGET_BANDS.find((b) => b.id === data.budgetBand)?.label || data.budgetBand;

    const fullPhoneNumber = `${data.phoneCountryCode} ${data.phoneNumber}`.trim();

    // 3. Automated Buyer Confirmation Email via Resend
    let emailSent = false;
    if (resend) {
      try {
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PontLook Matching Intake Received</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1E293B; margin: 0; padding: 0; background-color: #F8FAFC; }
    .container { max-width: 600px; margin: 24px auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; }
    .header { background: #0F172A; padding: 32px 24px; text-align: center; color: #FFFFFF; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .content { padding: 32px 24px; }
    .badge { display: inline-block; background: #ECFDF5; color: #065F46; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; margin-bottom: 12px; }
    .roadmap { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .roadmap-item { margin-bottom: 14px; }
    .roadmap-item:last-child { margin-bottom: 0; }
    .roadmap-title { font-weight: 700; font-size: 13px; color: #0F172A; }
    .roadmap-desc { font-size: 12px; color: #64748B; margin-top: 2px; }
    .scope-box { background: #F1F5F9; border-radius: 12px; padding: 18px; font-size: 13px; margin: 20px 0; }
    .scope-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .scope-row:last-child { margin-bottom: 0; }
    .scope-label { color: #64748B; }
    .scope-value { font-weight: 600; color: #0F172A; text-align: right; }
    .footer { padding: 24px; text-align: center; font-size: 12px; color: #94A3B8; border-top: 1px solid #F1F5F9; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PontLook Matching Desk</h1>
      <p style="margin: 6px 0 0; color: #94A3B8; font-size: 13px;">GCC Corporate Training Intake &middot; Ref ${leadId}</p>
    </div>
    <div class="content">
      <span class="badge">&#10003; Verification Confirmed</span>
      <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 8px; color: #0F172A;">Hello ${data.fullName},</h2>
      <p style="font-size: 14px; margin: 0 0 20px; color: #475569;">
        We have received your corporate training specifications for <strong>${data.organizationName}</strong>. Our GCC qualification team is currently verifying faculty capacity across our network of 120+ vetted providers.
      </p>

      <div class="roadmap">
        <div class="roadmap-item">
          <div class="roadmap-title">&#9200; Within 24 Hours</div>
          <div class="roadmap-desc">Matching concierge validates instructor accreditations and schedule slots.</div>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-title">&#128233; Within 48 Hours</div>
          <div class="roadmap-desc">Receive 2–3 itemized proposals with custom syllabi and transparent pricing.</div>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-title">&#128274; Zero Obligation</div>
          <div class="roadmap-desc">Interview lead facilitators before making any procurement commitment.</div>
        </div>
      </div>

      <div class="scope-box">
        <div class="scope-row"><span class="scope-label">Training Scope:</span><span class="scope-value">${domainNames}</span></div>
        <div class="scope-row"><span class="scope-label">Delivery Mode:</span><span class="scope-value">${deliveryModeName} ${data.city ? `(${data.city})` : ''}</span></div>
        <div class="scope-row"><span class="scope-label">Target Cohort:</span><span class="scope-value">${cohortLabel}</span></div>
        <div class="scope-row"><span class="scope-label">Timeline:</span><span class="scope-value">${timelineLabel}</span></div>
        <div class="scope-row"><span class="scope-label">Budget Tier:</span><span class="scope-value">${budgetLabel}</span></div>
      </div>

      <p style="font-size: 13px; color: #64748B; margin: 24px 0 0;">
        If you need to adjust your scope or require fast-track scheduling, reply directly to this email or contact us at <a href="mailto:contact@pontlook.com" style="color: #0052FF;">contact@pontlook.com</a>.
      </p>
    </div>
    <div class="footer">
      &copy; 2026 PontLook &middot; Riyadh &middot; Dubai &middot; Doha &middot; Delaware<br>
      Enterprise Confidentiality Guarantee &middot; KSA PDPL Aligned
    </div>
  </div>
</body>
</html>
        `;

        await resend.emails.send({
          from: 'PontLook Matching Desk <concierge@pontlook.com>',
          to: [data.workEmail],
          subject: `[PontLook] Training Request Received: ${domainNames} (${data.organizationName})`,
          html: emailHtml,
        });
        emailSent = true;
      } catch (emailErr) {
        console.error('Failed to dispatch transactional email via Resend:', emailErr);
      }
    } else {
      console.log(`[Mock Resend Email] Transactional intake confirmation generated for ${data.workEmail}`);
    }

    // 4. Dispatch Internal Webhook to Slack / CRM / Formspree
    const webhookPayload = {
      event: 'lead_intake_created',
      leadId,
      tier: leadScoreResult.tier,
      score: leadScoreResult.score,
      buyer: {
        fullName: data.fullName,
        jobTitle: data.jobTitle,
        workEmail: data.workEmail,
        organizationName: data.organizationName,
        country: data.country,
        phoneNumber: fullPhoneNumber,
      },
      scope: {
        domains: domainNames,
        deliveryMode: deliveryModeName,
        city: data.city || 'N/A',
        language: data.language,
        customization: data.customization === 'tailored' ? 'Tailored Cohort' : 'Standard Courseware',
        cohortSize: cohortLabel,
        timeline: timelineLabel,
        budgetBand: budgetLabel,
        additionalContext: data.additionalContext || 'None',
      },
      checklist: leadScoreResult.checklist,
      submittedAt: new Date().toISOString(),
    };

    // Dispatch to Slack Webhook if configured
    if (slackWebhookUrl) {
      try {
        const tierEmoji = leadScoreResult.tier === 'HOT' ? '🔥' : leadScoreResult.tier === 'WARM' ? '⚡' : '🎯';
        await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `${tierEmoji} *New ${leadScoreResult.tier} Enterprise Lead (${leadScoreResult.score}/100)*: ${data.organizationName} (${data.country})\n• *Contact*: ${data.fullName} - ${data.jobTitle} (<mailto:${data.workEmail}|${data.workEmail}>)\n• *Domains*: ${domainNames}\n• *Cohort & Budget*: ${cohortLabel} | ${budgetLabel}\n• *Ref*: \`${leadId}\``,
          }),
        });
      } catch (slackErr) {
        console.error('Slack webhook dispatch failed:', slackErr);
      }
    }

    // Dispatch to CRM / Zapier / Formspree fallback
    if (crmWebhookUrl || formspreeEndpoint) {
      const targetUrl = crmWebhookUrl || formspreeEndpoint;
      try {
        await fetch(targetUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            form_type: 'B2B Enterprise Training Intake',
            ...webhookPayload,
          }),
        });
      } catch (crmErr) {
        console.error('CRM/Formspree webhook dispatch failed:', crmErr);
      }
    }

    const duration = Date.now() - startTime;
    console.log(`✅ [Intake API] Processed lead ${leadId} in ${duration}ms (Tier: ${leadScoreResult.tier}, Score: ${leadScoreResult.score})`);

    return NextResponse.json(
      {
        success: true,
        leadId,
        tier: leadScoreResult.tier,
        score: leadScoreResult.score,
        emailSent,
        message: 'Enterprise intake scope successfully registered and queued for matching.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unhandled error in /api/intake:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing intake' },
      { status: 500 }
    );
  }
}
