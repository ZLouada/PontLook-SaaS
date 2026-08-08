import { z } from 'zod';

export const countries = [
  'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
] as const;

export const industriesList = [
  'Banking & Finance', 'Retail & E-commerce', 'Healthcare', 'Oil, Gas & Energy',
  'Construction & Real Estate', 'Government & Semi-Government', 'Hospitality & Tourism',
  'Technology & Telecom', 'Logistics & Supply Chain', 'Manufacturing', 'Insurance',
  'Education', 'Other',
] as const;

export const employeeRanges = ['1–49', '50–200', '201–500', '501–1,000', '1,001–5,000', '5,000+'] as const;

export const challengesList = [
  'Leadership Development', 'Middle Managers', 'Employee Retention', 'High Staff Turnover',
  'Sales Performance', 'Customer Service', 'AI Adoption', 'Digital Transformation',
  'Compliance', 'Saudization', 'Emiratization', 'Onboarding', 'Communication Skills',
  'Team Productivity', 'Safety Training', 'Other',
] as const;

export const trainingTypes = [
  'Leadership & Management', 'Sales & Business Development', 'AI & Digital Skills',
  'Compliance & Regulatory', 'Soft Skills & Communication', 'Customer Experience',
  'Health & Safety', 'Technical / Role-specific', 'Not sure yet: need guidance',
] as const;

export const deliveryFormats = ['In-person', 'Virtual (live)', 'Hybrid', 'Self-paced e-learning', 'Flexible'] as const;
export const languages = ['Arabic', 'English', 'Bilingual (Arabic & English)'] as const;
export const budgetRanges = [
  'Under $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000 – $100,000',
  '$100,000+', 'Not defined yet',
] as const;
export const orgStages = ['Startup / scale-up', 'Established SME', 'Large enterprise', 'Government / semi-government'] as const;

export const step1Schema = z.object({
  companyName: z.string().trim().optional().or(z.literal('')),
  website: z.string().trim().optional().or(z.literal('')),
  country: z.string().optional().or(z.literal('')),
  city: z.string().trim().optional().or(z.literal('')),
  industry: z.string().optional().or(z.literal('')),
  employees: z.string().optional().or(z.literal('')),
  _honeypot: z.string().optional(),
});

export const step2Schema = z.object({
  fullName: z.string().trim().optional().or(z.literal('')),
  jobTitle: z.string().trim().optional().or(z.literal('')),
  email: z.string().trim().optional().or(z.literal('')),
  phone: z.string().trim().optional().or(z.literal('')),
});

export const step3Schema = z.object({
  challenges: z.array(z.string()).optional().default([]),
});

export const step4Schema = z.object({
  trainingType: z.string().optional().or(z.literal('')),
  deliveryFormat: z.string().optional().or(z.literal('')),
  language: z.string().optional().or(z.literal('')),
  employeesToTrain: z.string().trim().optional().or(z.literal('')),
  startDate: z.string().trim().optional().or(z.literal('')),
  budgetRange: z.string().optional().or(z.literal('')),
});

export const step5Schema = z.object({
  workedBefore: z.string().optional().or(z.literal('')),
  whatWasMissing: z.string().trim().optional().or(z.literal('')),
  successDefinition: z.string().trim().optional().or(z.literal('')),
  industryExperience: z.string().optional().or(z.literal('')),
  orgStage: z.string().optional().or(z.literal('')),
  biggestChallenge: z.string().trim().optional().or(z.literal('')),
  notes: z.string().trim().optional().or(z.literal('')),
});

export type Step1 = z.infer<typeof step1Schema>;
export type Step2 = z.infer<typeof step2Schema>;
export type Step3 = z.infer<typeof step3Schema>;
export type Step4 = z.infer<typeof step4Schema>;
export type Step5 = z.infer<typeof step5Schema>;
export type WizardData = Partial<Step1 & Step2 & Step3 & Step4 & Step5>;

export const STORAGE_KEY = 'gcc-find-training-wizard';

