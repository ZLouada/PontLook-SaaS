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
  'Health & Safety', 'Technical / Role-specific', 'Not sure yet — need guidance',
] as const;

export const deliveryFormats = ['In-person', 'Virtual (live)', 'Hybrid', 'Self-paced e-learning', 'Flexible'] as const;
export const languages = ['Arabic', 'English', 'Bilingual (Arabic & English)'] as const;
export const budgetRanges = [
  'Under $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000 – $100,000',
  '$100,000+', 'Not defined yet',
] as const;
export const orgStages = ['Startup / scale-up', 'Established SME', 'Large enterprise', 'Government / semi-government'] as const;

export const step1Schema = z.object({
  companyName: z.string().trim().min(2, 'Company name is required').max(150, 'Company name is too long'),
  website: z
    .string()
    .trim()
    .min(4, 'Website is required')
    .max(500, 'URL is too long')
    .refine((v) => /^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(v), 'Enter a valid website'),
  country: z.enum(countries, { errorMap: () => ({ message: 'Select your country' }) }),
  city: z.string().trim().min(2, 'City is required').max(100, 'City name is too long'),
  industry: z.enum(industriesList, { errorMap: () => ({ message: 'Select your industry' }) }),
  employees: z.enum(employeeRanges, { errorMap: () => ({ message: 'Select company size' }) }),
  _honeypot: z.string().max(0, 'Bot detected').optional(),
});

export const step2Schema = z.object({
  fullName: z.string().trim().min(2, 'Your name is required').max(100, 'Name is too long'),
  jobTitle: z.string().trim().min(2, 'Job title is required').max(100, 'Job title is too long'),
  email: z
    .string()
    .trim()
    .max(254, 'Email is too long')
    .email('Enter a valid business email')
    .refine(
      (v) => !/@(gmail|yahoo|hotmail|outlook|icloud)\./i.test(v),
      'Please use your business email address',
    ),
  phone: z.string().trim().min(7, 'Enter a valid phone number').max(30, 'Phone number is too long'),
});

export const step3Schema = z.object({
  challenges: z.array(z.enum(challengesList)).min(1, 'Select at least one challenge'),
});

export const step4Schema = z.object({
  trainingType: z.enum(trainingTypes, { errorMap: () => ({ message: 'Select a training type' }) }),
  deliveryFormat: z.enum(deliveryFormats, { errorMap: () => ({ message: 'Select a delivery format' }) }),
  language: z.enum(languages, { errorMap: () => ({ message: 'Select a language' }) }),
  employeesToTrain: z.string().trim().min(1, 'How many employees need training?').max(20, 'Value is too long'),
  startDate: z.string().trim().min(1, 'Select a preferred start date').max(20, 'Invalid date'),
  budgetRange: z.enum(budgetRanges, { errorMap: () => ({ message: 'Select a budget range' }) }),
});

export const step5Schema = z.object({
  workedBefore: z.enum(['yes', 'no'], { errorMap: () => ({ message: 'Please choose one' }) }),
  whatWasMissing: z.string().trim().max(5000, 'Response is too long').optional(),
  successDefinition: z.string().trim().min(20, 'Help us match well — describe success in a sentence or two').max(5000, 'Response is too long'),
  industryExperience: z.enum(['required', 'preferred', 'flexible'], {
    errorMap: () => ({ message: 'Please choose one' }),
  }),
  orgStage: z.enum(orgStages, { errorMap: () => ({ message: 'Select your organization stage' }) }),
  biggestChallenge: z.string().trim().min(20, 'Give us at least a couple of sentences').max(5000, 'Response is too long'),
  notes: z.string().trim().max(5000, 'Notes are too long').optional(),
});

export type Step1 = z.infer<typeof step1Schema>;
export type Step2 = z.infer<typeof step2Schema>;
export type Step3 = z.infer<typeof step3Schema>;
export type Step4 = z.infer<typeof step4Schema>;
export type Step5 = z.infer<typeof step5Schema>;
export type WizardData = Partial<Step1 & Step2 & Step3 & Step4 & Step5>;

export const STORAGE_KEY = 'gcc-find-training-wizard';

