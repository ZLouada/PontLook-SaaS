import nodemailer from 'nodemailer';
import { ExtendedLeadData } from './pdf-generator';
import { LeadScoreResult } from './lead-scoring';

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
}

export async function sendLeadNotificationEmail(
  data: ExtendedLeadData,
  pdfBuffer: Buffer,
  scoreResult: LeadScoreResult
): Promise<EmailDispatchResult> {
  const companyName = data.companyName ? data.companyName.trim() : 'Unknown_Company';
  const sanitizedCompanyName = companyName.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `PontLook_Full_Lead_${sanitizedCompanyName}.pdf`;

  const subject = `[ALL-FIELDS LEAD REPORT] ${companyName} — ${scoreResult.tier} (${scoreResult.score} pts)`;
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL || 'contact@pontlook.com';
  const sender = process.env.EMAIL_FROM || 'PontLook Intelligence <notifications@pontlook.com>';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #0F172A; line-height: 1.6;">
      <div style="background-color: #0F172A; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2 style="color: #FFFFFF; margin: 0; font-size: 20px;">Exhaustive Lead Intelligence Report</h2>
        <p style="color: #94A3B8; margin: 5px 0 0 0; font-size: 13px;">PontLook Lead Qualification System</p>
      </div>

      <div style="padding: 24px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 8px 8px; background-color: #FFFFFF;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; padding: 12px 16px; background-color: #F8FAFC; border-radius: 6px; border: 1px solid #E2E8F0;">
          <div>
            <span style="font-size: 12px; color: #64748B; font-weight: bold; text-transform: uppercase;">Lead Priority Tier:</span>
            <strong style="font-size: 16px; color: ${scoreResult.tierColor}; display: block; margin-top: 2px;">${scoreResult.tier} (${scoreResult.score}/100 pts)</strong>
          </div>
          <div>
            <span style="font-size: 12px; color: #64748B; font-weight: bold; text-transform: uppercase;">Company:</span>
            <strong style="font-size: 14px; color: #0F172A; display: block; margin-top: 2px;">${companyName}</strong>
          </div>
        </div>

        <p>A new comprehensive lead assessment has been submitted on PontLook. 100% of all captured form fields have been compiled into the attached PDF document.</p>

        <h3 style="font-size: 15px; border-bottom: 2px solid #2563EB; padding-bottom: 4px; margin-top: 20px;">Key Summary:</h3>
        <ul style="padding-left: 20px; font-size: 14px; color: #334155;">
          <li><strong>Decision Maker:</strong> ${data.fullName || 'N/A'} (${data.jobTitle || 'N/A'})</li>
          <li><strong>Email:</strong> ${data.email || 'N/A'}</li>
          <li><strong>Phone:</strong> ${data.phone || 'N/A'}</li>
          <li><strong>Location:</strong> ${data.country || 'N/A'}, ${data.city || 'N/A'}</li>
          <li><strong>Company Size:</strong> ${data.employees || 'N/A'}</li>
          <li><strong>Budget:</strong> ${data.budgetRange || 'N/A'}</li>
          <li><strong>Training Type:</strong> ${data.trainingType || 'N/A'}</li>
          <li><strong>Primary Challenges:</strong> ${data.challenges ? data.challenges.join(', ') : 'N/A'}</li>
        </ul>

        <div style="margin-top: 24px; padding: 12px; background-color: #EFF6FF; border: 1px solid #93C5FD; border-radius: 6px; font-size: 13px; color: #1E40AF;">
          📎 <strong>Attachment:</strong> <code>${filename}</code> (${Math.round(pdfBuffer.length / 1024)} KB)
        </div>
      </div>
    </div>
  `;

  // Check if SMTP configuration exists
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log(`[EMAIL DISPATCH SIMULATION] Email to ${recipient} with attachment ${filename} (${pdfBuffer.length} bytes). Subject: ${subject}`);
    return {
      success: true,
      simulated: true,
      messageId: `simulated-${Date.now()}`,
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Boolean(process.env.SMTP_SECURE === 'true'),
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: sender,
      to: recipient,
      subject,
      html: htmlBody,
      attachments: [
        {
          filename,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[EMAIL DISPATCH SUCCESS] Message ID: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      simulated: false,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`[EMAIL DISPATCH ERROR] Failed to send email: ${errorMessage}`);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
