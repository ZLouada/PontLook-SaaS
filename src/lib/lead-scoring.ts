import { WizardData } from '@/components/wizard/schemas';

export type LeadTier = 'HOT' | 'WARM' | 'QUALIFIED';

export interface LeadScoreResult {
  score: number;
  tier: LeadTier;
  tierColor: string;
  checklist: {
    businessEmailVerified: boolean;
    companySizeValid: boolean;
    budgetAllocated: boolean;
    decisionMakerIdentified: boolean;
    highUrgencyTimeline: boolean;
    detailedContextProvided: boolean;
  };
}

export function calculateLeadScore(data: WizardData): LeadScoreResult {
  let score = 0;

  // 1. Business Email Check (max 15 pts)
  const isBusinessEmail = Boolean(
    data.email && !/@(gmail|yahoo|hotmail|outlook|icloud)\./i.test(data.email)
  );
  if (isBusinessEmail) score += 15;

  // 2. Company Size / Org Stage (max 20 pts)
  let companySizeValid = false;
  if (data.employees) {
    companySizeValid = true;
    if (data.employees === '5,000+' || data.employees === '1,001–5,000') {
      score += 20;
    } else if (data.employees === '501–1,000' || data.employees === '201–500') {
      score += 15;
    } else if (data.employees === '50–200') {
      score += 10;
    } else {
      score += 5;
    }
  }

  // 3. Allocated Budget Range (max 25 pts)
  let budgetAllocated = false;
  if (data.budgetRange) {
    if (data.budgetRange === '$100,000+' || data.budgetRange === '$50,000 – $100,000') {
      score += 25;
      budgetAllocated = true;
    } else if (data.budgetRange === '$25,000 – $50,000') {
      score += 20;
      budgetAllocated = true;
    } else if (data.budgetRange === '$10,000 – $25,000') {
      score += 15;
      budgetAllocated = true;
    } else if (data.budgetRange === 'Under $10,000') {
      score += 10;
    } else {
      score += 5;
    }
  }

  // 4. Decision Maker Job Title Seniority (max 15 pts)
  let decisionMakerIdentified = false;
  const title = (data.jobTitle || '').toLowerCase();
  if (title) {
    decisionMakerIdentified = true;
    if (
      title.includes('c-') ||
      title.includes('chief') ||
      title.includes('vp') ||
      title.includes('vice president') ||
      title.includes('director') ||
      title.includes('head') ||
      title.includes('partner') ||
      title.includes('owner') ||
      title.includes('ceo') ||
      title.includes('chro')
    ) {
      score += 15;
    } else if (title.includes('manager') || title.includes('lead')) {
      score += 10;
    } else {
      score += 5;
    }
  }

  // 5. Timeline Urgency (max 15 pts)
  let highUrgencyTimeline = false;
  if (data.startDate) {
    score += 15;
    highUrgencyTimeline = true;
  }

  // 6. Detailed Challenge Notes & Context (max 10 pts)
  let detailedContextProvided = false;
  const totalNotesLen =
    (data.biggestChallenge?.length || 0) +
    (data.successDefinition?.length || 0) +
    (data.notes?.length || 0);

  if (totalNotesLen >= 100) {
    score += 10;
    detailedContextProvided = true;
  } else if (totalNotesLen > 0) {
    score += 5;
  }

  // Cap score at 100
  const finalScore = Math.min(100, Math.max(0, score));

  // Priority Tier Assignment
  let tier: LeadTier = 'QUALIFIED';
  let tierColor = '#2563EB'; // Blue

  if (finalScore >= 90) {
    tier = 'HOT';
    tierColor = '#DC2626'; // Red/Hot
  } else if (finalScore >= 70) {
    tier = 'WARM';
    tierColor = '#D97706'; // Amber/Warm
  } else {
    tier = 'QUALIFIED';
    tierColor = '#2563EB'; // Blue/Qualified
  }

  return {
    score: finalScore,
    tier,
    tierColor,
    checklist: {
      businessEmailVerified: isBusinessEmail,
      companySizeValid,
      budgetAllocated,
      decisionMakerIdentified,
      highUrgencyTimeline,
      detailedContextProvided,
    },
  };
}
