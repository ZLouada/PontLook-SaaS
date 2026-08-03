import PDFDocument from 'pdfkit';
import { WizardData } from '@/components/wizard/schemas';
import { calculateLeadScore, LeadScoreResult } from './lead-scoring';

export interface ExtendedLeadData extends WizardData {
  referenceId?: string;
  submittedAt?: string;
  preferredContactMethod?: string;
  languagePreference?: string;
  referralSourceUrl?: string;
  targetAudience?: string;
  targetGeographicMarkets?: string[];
  preferredContractModel?: string;
}

export function generateLeadPdf(data: ExtendedLeadData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 40,
        size: 'A4',
        info: {
          Title: `PontLook Lead Report - ${data.companyName || 'Lead'}`,
          Author: 'PontLook Intelligence System',
        },
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', (err) => reject(err));

      const scoreResult: LeadScoreResult = calculateLeadScore(data);

      const refId = data.referenceId || `PL-LEAD-${Date.now().toString(36).toUpperCase()}`;
      const submittedAt = data.submittedAt || new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

      const primaryColor = '#0F172A'; // Slate 900
      const accentColor = '#2563EB';  // Blue 600
      const mutedColor = '#64748B';   // Slate 500
      const bgBoxColor = '#F8FAFC';   // Slate 50
      const borderColor = '#E2E8F0'; // Slate 200

      // Helper function to draw section headers
      const drawSectionHeader = (title: string, yPos: number) => {
        doc.rect(40, yPos, 515, 24).fill(primaryColor);
        doc
          .fillColor('#FFFFFF')
          .fontSize(11)
          .font('Helvetica-Bold')
          .text(title.toUpperCase(), 50, yPos + 6);
        return yPos + 32;
      };

      // Helper function to render key-value grid row
      const drawGridRow = (
        label1: string,
        val1: string,
        label2: string,
        val2: string,
        yPos: number
      ) => {
        doc.rect(40, yPos, 252, 34).fillAndStroke(bgBoxColor, borderColor);
        doc.rect(302, yPos, 253, 34).fillAndStroke(bgBoxColor, borderColor);

        doc.fillColor(mutedColor).fontSize(8).font('Helvetica-Bold').text(label1.toUpperCase(), 48, yPos + 6);
        doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica').text(val1 || 'N/A', 48, yPos + 18, { width: 236, ellipsis: true });

        doc.fillColor(mutedColor).fontSize(8).font('Helvetica-Bold').text(label2.toUpperCase(), 310, yPos + 6);
        doc.fillColor(primaryColor).fontSize(9.5).font('Helvetica').text(val2 || 'N/A', 310, yPos + 18, { width: 237, ellipsis: true });

        return yPos + 38;
      };

      // Helper for multiline full width text box
      const drawTextBox = (label: string, text: string, yPos: number) => {
        const content = text && text.trim() ? text.trim() : 'None provided';
        doc.font('Helvetica').fontSize(9);
        const textHeight = Math.max(28, doc.heightOfString(content, { width: 495 }) + 14);

        doc.rect(40, yPos, 515, textHeight + 14).fillAndStroke(bgBoxColor, borderColor);

        doc.fillColor(mutedColor).fontSize(8).font('Helvetica-Bold').text(label.toUpperCase(), 48, yPos + 6);
        doc.fillColor(primaryColor).fontSize(9).font('Helvetica').text(content, 48, yPos + 18, { width: 498 });

        return yPos + textHeight + 20;
      };

      // ─── HEADER SECTION ───
      // Logo Mark
      doc.rect(40, 40, 36, 36).fill(accentColor);
      doc.fillColor('#FFFFFF').fontSize(16).font('Helvetica-Bold').text('PL', 48, 50);

      // Title & Subtitle
      doc.fillColor(primaryColor).fontSize(16).font('Helvetica-Bold').text('PONTLOOK INTELLIGENCE', 86, 42);
      doc.fillColor(mutedColor).fontSize(11).font('Helvetica').text('Exhaustive Lead Intelligence Report', 86, 62);

      // Ref & Date Badge
      doc.rect(360, 40, 195, 36).fillAndStroke(bgBoxColor, borderColor);
      doc.fillColor(mutedColor).fontSize(8).font('Helvetica-Bold').text('LEAD REF ID:', 368, 45);
      doc.fillColor(primaryColor).fontSize(9).font('Helvetica-Bold').text(refId, 430, 45);

      doc.fillColor(mutedColor).fontSize(8).font('Helvetica-Bold').text('SUBMITTED:', 368, 60);
      doc.fillColor(primaryColor).fontSize(8.5).font('Helvetica').text(submittedAt, 430, 60);

      doc.moveTo(40, 86).lineTo(555, 86).strokeColor(borderColor).lineWidth(1).stroke();

      let currentY = 96;

      // ─── SECTION 1: Contact & Decision-Maker Details ───
      currentY = drawSectionHeader('1. Contact & Decision-Maker Details', currentY);
      currentY = drawGridRow(
        'Full Name', data.fullName || '',
        'Job Title / Role', data.jobTitle || '',
        currentY
      );
      currentY = drawGridRow(
        'Business Email', data.email || '',
        'Phone Number / WhatsApp', data.phone || '',
        currentY
      );
      currentY = drawGridRow(
        'Preferred Contact Method', data.preferredContactMethod || 'Email / WhatsApp / Phone',
        'Language Preference', data.languagePreference || data.language || '/en (English)',
        currentY
      );

      currentY += 6;

      // ─── SECTION 2: Company & Organizational Profile ───
      currentY = drawSectionHeader('2. Company & Organizational Profile', currentY);
      currentY = drawGridRow(
        'Company Name', data.companyName || '',
        'Website URL', data.website || '',
        currentY
      );
      currentY = drawGridRow(
        'Country & City / Region', `${data.country || 'N/A'}, ${data.city || 'N/A'}`,
        'Industry Sector', data.industry || '',
        currentY
      );
      currentY = drawGridRow(
        'Company Headcount Tier', data.employees || '',
        'Years in Business / Stage', data.orgStage || 'Established Organization',
        currentY
      );

      currentY += 6;

      // ─── SECTION 3: Workforce Challenges & Requirements (Corporate Buyers) ───
      currentY = drawSectionHeader('3. Workforce Challenges & Requirements', currentY);
      const challengesText = data.challenges && data.challenges.length > 0 ? data.challenges.join(', ') : 'None selected';
      currentY = drawGridRow(
        'Selected Primary Challenges', challengesText,
        'Target Audience to Train', data.targetAudience || 'Executives & Team Leads',
        currentY
      );
      currentY = drawGridRow(
        'Number of Employees to Train', data.employeesToTrain ? `${data.employeesToTrain} employees` : 'N/A',
        'Preferred Delivery Format', data.deliveryFormat || '',
        currentY
      );
      currentY = drawGridRow(
        'Estimated Start Timeline', data.startDate ? `Target: ${data.startDate}` : 'Immediate / 30 Days',
        'Allocated Budget Range', data.budgetRange || '',
        currentY
      );

      // Notes & Detailed Descriptions
      currentY = drawTextBox('Biggest Challenge & Background Notes', data.biggestChallenge || '', currentY);
      currentY = drawTextBox('Success Definition & Expected Outcomes', data.successDefinition || '', currentY);
      if (data.workedBefore === 'yes' && data.whatWasMissing) {
        currentY = drawTextBox('Previous Provider Gaps / Missed Expectations', data.whatWasMissing, currentY);
      }
      if (data.notes) {
        currentY = drawTextBox('Additional Requirements / Special Requests', data.notes, currentY);
      }

      // Check if page overflow is imminent before Section 4 & 5
      if (currentY > 640) {
        doc.addPage();
        currentY = 40;
      }

      // ─── SECTION 4: Provider Specializations & Capabilities (Training Firms) ───
      currentY = drawSectionHeader('4. Provider Specializations & Capabilities', currentY);
      currentY = drawGridRow(
        'Training Specialties Selected', data.trainingType || 'Leadership, Technical & Soft Skills',
        'Target Geographic Markets', data.targetGeographicMarkets ? data.targetGeographicMarkets.join(', ') : `${data.country || 'GCC Region'} & MENA`,
        currentY
      );
      currentY = drawGridRow(
        'Preferred Contract Model', data.preferredContractModel || 'Model A: Pay-Per-Lead (Qualified Introductions)',
        'Provider Industry Experience', data.industryExperience ? `Experience ${data.industryExperience}` : 'Flexible',
        currentY
      );

      currentY += 6;

      if (currentY > 640) {
        doc.addPage();
        currentY = 40;
      }

      // ─── SECTION 5: Automated Lead Intelligence & Scoring ───
      currentY = drawSectionHeader('5. Automated Lead Intelligence & Scoring', currentY);

      // Score Card Box
      doc.rect(40, currentY, 515, 60).fillAndStroke(bgBoxColor, borderColor);

      // Tier Badge Fill & Border
      let badgeBg = '#EFF6FF';
      let badgeText = '#2563EB';
      if (scoreResult.tier === 'HOT') {
        badgeBg = '#FEF2F2';
        badgeText = '#DC2626';
      } else if (scoreResult.tier === 'WARM') {
        badgeBg = '#FFFBEB';
        badgeText = '#D97706';
      }

      doc.rect(52, currentY + 12, 110, 36).fill(badgeBg);
      doc.fillColor(badgeText).fontSize(14).font('Helvetica-Bold').text(`[${scoreResult.tier}]`, 64, currentY + 22);

      // Score Text
      doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text(`Lead Score: ${scoreResult.score} / 100`, 180, currentY + 16);
      doc.fillColor(mutedColor).fontSize(9).font('Helvetica').text('Automated PontLook Lead Qualification System', 180, currentY + 34);

      currentY += 72;

      // ICP Verification Checklist
      doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text('ICP Verification Checklist:', 40, currentY);
      currentY += 16;

      const checklistItems = [
        { label: 'Business Email Domain Verified', pass: scoreResult.checklist.businessEmailVerified },
        { label: 'Target Company Size Validated', pass: scoreResult.checklist.companySizeValid },
        { label: 'Dedicated Training Budget Allocated', pass: scoreResult.checklist.budgetAllocated },
        { label: 'Decision-Maker Seniority Confirmed', pass: scoreResult.checklist.decisionMakerIdentified },
        { label: 'Urgent / High-Priority Timeline', pass: scoreResult.checklist.highUrgencyTimeline },
        { label: 'Detailed Scope & Requirement Notes Provided', pass: scoreResult.checklist.detailedContextProvided },
      ];

      checklistItems.forEach((item, idx) => {
        const col = idx % 2 === 0 ? 40 : 300;
        const rowY = currentY + Math.floor(idx / 2) * 18;

        const checkMark = item.pass ? '[PASS]' : '[PENDING]';
        const color = item.pass ? '#16A34A' : '#94A3B8';

        doc.fillColor(color).fontSize(8.5).font('Helvetica-Bold').text(checkMark, col, rowY);
        doc.fillColor(primaryColor).fontSize(8.5).font('Helvetica').text(item.label, col + 46, rowY);
      });

      currentY += Math.ceil(checklistItems.length / 2) * 18 + 12;

      // Referral Source URL
      doc.fillColor(mutedColor).fontSize(8).font('Helvetica-Bold').text('REFERRAL / SOURCE PAGE URL:', 40, currentY);
      doc.fillColor(accentColor).fontSize(8.5).font('Helvetica').text(data.referralSourceUrl || 'https://pontlook.com/en/find-training', 190, currentY);

      // Footer disclaimer on bottom of page
      doc.fillColor(mutedColor).fontSize(7.5).font('Helvetica').text('Confidential - Generated by PontLook Lead Qualification Engine for internal dispatch to contact@pontlook.com', 40, 790, { width: 515, align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
