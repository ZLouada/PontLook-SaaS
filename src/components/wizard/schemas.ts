import { z } from 'zod';
export * from './trainingDomains';

export const GCC_COUNTRIES = [
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
  { code: 'OTHER', name: 'Other Region', dialCode: '+', flag: '🌐' },
] as const;

export const GCC_CITIES = [
  'Riyadh',
  'Dubai',
  'Abu Dhabi',
  'Doha',
  'Jeddah',
  'Kuwait City',
  'Manama',
  'Muscat',
  'Dammam / Khobar',
  'Other GCC Location',
] as const;

export interface TrainingDomainItem {
  id: string;
  title: string;
  subtitle: string;
  keywords: string[];
  iconName: 'Crown' | 'TrendingUp' | 'Cpu' | 'ShieldAlert' | 'Kanban' | 'Sliders';
}

export const TRAINING_DOMAINS: TrainingDomainItem[] = [
  {
    id: 'executive_leadership',
    title: 'Executive Leadership & Management',
    subtitle: 'C-Suite, Director Level, Strategic Alignment & Vision 2030 Leadership',
    keywords: ['leadership', 'c-suite', 'executive', 'management', 'vision 2030', 'strategy', 'change management', 'board', 'director'],
    iconName: 'Crown',
  },
  {
    id: 'b2b_sales',
    title: 'B2B Sales & Commercial Negotiation',
    subtitle: 'Enterprise Account Strategy, High-Stakes Deal Closing & Commercial Excellence',
    keywords: ['sales', 'b2b', 'negotiation', 'commercial', 'account management', 'deal closing', 'enterprise sales', 'revenue'],
    iconName: 'TrendingUp',
  },
  {
    id: 'ai_data_tech',
    title: 'AI, Data & Tech Transformation',
    subtitle: 'Generative AI for Executives, Data Literacy & Modern Tech Capability',
    keywords: ['ai', 'artificial intelligence', 'genai', 'generative ai', 'data', 'tech', 'digital transformation', 'analytics', 'cloud', 'python'],
    iconName: 'Cpu',
  },
  {
    id: 'grc_compliance',
    title: 'Governance, Risk & Compliance (GRC)',
    subtitle: 'GCC Regulatory Mandates, Board Oversight, Internal Audit & Risk Frameworks',
    keywords: ['grc', 'governance', 'risk', 'compliance', 'audit', 'esg', 'regulatory', 'cybersecurity', 'anti-money laundering', 'aml', 'sama', 'cma'],
    iconName: 'ShieldAlert',
  },
  {
    id: 'pm_agile',
    title: 'Project Management & Agile Delivery',
    subtitle: 'PMP, Agile Scrum, PMO Strategy & Megaproject Execution',
    keywords: ['pmp', 'project management', 'agile', 'scrum', 'pmo', 'megaprojects', 'prince2', 'delivery', 'kanban'],
    iconName: 'Kanban',
  },
  {
    id: 'other',
    title: 'Other Specialized Domain',
    subtitle: 'Custom workforce requirements, technical certifications, or niche programs',
    keywords: ['other', 'custom', 'niche', 'certifications', 'tailored', 'specialized', 'engineering', 'finance'],
    iconName: 'Sliders',
  },
];

export const DELIVERY_MODES = [
  {
    id: 'in_person',
    title: 'In-Person / Onsite',
    description: 'On-premises at your company HQ or dedicated GCC training venue.',
    badge: 'Popular for Executive Cohorts',
  },
  {
    id: 'virtual',
    title: 'Virtual Instructor-Led',
    description: 'Live interactive digital sessions via Zoom/Teams with collaborative breakouts.',
    badge: 'High Flexibility',
  },
  {
    id: 'hybrid',
    title: 'Hybrid (Blended Cohort)',
    description: 'Combined in-person immersion workshops and live digital reinforcement.',
    badge: 'Best Retention',
  },
] as const;

export const DELIVERY_LANGUAGES = [
  { id: 'arabic', label: 'Arabic Only', sublabel: 'العربية' },
  { id: 'english', label: 'English Only', sublabel: 'Global Standard' },
  { id: 'bilingual', label: 'Bilingual (Arabic & English)', sublabel: 'Most Popular for GCC Multinationals' },
] as const;

export const CUSTOMIZATION_OPTIONS = [
  {
    id: 'tailored',
    title: 'Tailored Cohort Program',
    description: 'Customized to your internal KPIs, proprietary case studies, and GCC organizational culture.',
    recommended: true,
  },
  {
    id: 'standard',
    title: 'Standard Off-the-Shelf Courseware',
    description: 'Established industry curriculum with standard professional accreditation.',
    recommended: false,
  },
] as const;

export const COHORT_SIZES = [
  { id: '1_5_execs', label: '1–5 Executives', sublabel: 'C-Level & Senior Leadership Intensive' },
  { id: '6_20_team', label: '6–20 Team Members', sublabel: 'Specialized Team / High-Potential Cohort' },
  { id: '21_50_dept', label: '21–50 Dept Scale', sublabel: 'Departmental Capability Upskilling' },
  { id: '50_plus_enterprise', label: '50+ Enterprise Wide', sublabel: 'Company-wide Transformation Program' },
] as const;

export const TIMELINES = [
  { id: 'immediate', label: 'Immediate (< 2 weeks)', priority: 'Urgent / Priority' },
  { id: 'within_30_days', label: 'Within 30 Days', priority: 'Standard Schedule' },
  { id: 'next_quarter', label: 'Next Quarter (60–90 Days)', priority: 'Planned Cycle' },
  { id: 'planning', label: 'Planning / Exploratory', priority: 'Budgeting Stage' },
] as const;

export const BUDGET_BANDS = [
  { id: 'under_10k', label: '< $10,000', sublabel: 'Focused Workshop / Small Cohort' },
  { id: '10k_25k', label: '$10,000 – $25,000', sublabel: 'Standard Multi-day Intensive' },
  { id: '25k_50k', label: '$25,000 – $50,000', sublabel: 'Comprehensive Multi-week Cohort' },
  { id: '50k_plus', label: '$50,000+', sublabel: 'Enterprise Academy / Organization Rollout' },
  { id: 'pending_guidance', label: 'Budget Pending Approval / Need Guidance', sublabel: 'Benchmark market rates with PontLook team' },
] as const;

// Consumer email domains to reject in Step 4
const CONSUMER_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'protonmail.com',
  'proton.me',
  'zoho.com',
  'mail.com',
  'live.com',
  'msn.com',
  'yandex.com',
  'yandex.ru',
  'gmx.com',
  'gmx.net',
  'fastmail.com',
  'inbox.com',
];

export function isCorporateEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1]?.toLowerCase().trim();
  if (!domain) return false;
  return !CONSUMER_EMAIL_DOMAINS.includes(domain);
}

// Validation schemas
export const step1DomainSchema = z
  .object({
    domains: z.array(z.string()).default([]),
    selectedDomains: z
      .union([
        z.array(z.string()),
        z.object({
          categories: z.array(z.string()),
          subDomains: z.array(z.string()),
        }),
      ])
      .optional(),
    otherDomainText: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      const hasDomains = Boolean(data.domains && data.domains.length > 0);
      const hasSelectedArray = Boolean(Array.isArray(data.selectedDomains) && data.selectedDomains.length > 0);
      const hasSelectedObj = Boolean(
        data.selectedDomains &&
          !Array.isArray(data.selectedDomains) &&
          ((data.selectedDomains.categories && data.selectedDomains.categories.length > 0) ||
            (data.selectedDomains.subDomains && data.selectedDomains.subDomains.length > 0))
      );
      return hasDomains || hasSelectedArray || hasSelectedObj;
    },
    {
      message: 'Please select at least one training domain or capability to begin matching.',
      path: ['domains'],
    }
  )
  .refine(
    (data) => {
      const domainsList = data.domains || (Array.isArray(data.selectedDomains) ? data.selectedDomains : []);
      if (domainsList.includes('other')) {
        return Boolean(data.otherDomainText && data.otherDomainText.trim().length > 1);
      }
      return true;
    },
    {
      message: 'Please specify your specialized training topic.',
      path: ['otherDomainText'],
    }
  );

export const step2DeliverySchema = z
  .object({
    deliveryMode: z.enum(['in_person', 'virtual', 'hybrid'], {
      required_error: 'Please select a delivery format.',
    }),
    city: z.string().optional().or(z.literal('')),
    language: z.enum(['arabic', 'english', 'bilingual'], {
      required_error: 'Please choose preferred delivery language.',
    }),
    customization: z.enum(['tailored', 'standard'], {
      required_error: 'Please select courseware customization level.',
    }),
  })
  .refine(
    (data) => {
      if ((data.deliveryMode === 'in_person' || data.deliveryMode === 'hybrid') && !data.city) {
        return false;
      }
      return true;
    },
    {
      message: 'Please select target GCC city for on-site sessions.',
      path: ['city'],
    }
  );

export const step3CohortBudgetSchema = z.object({
  cohortSize: z.enum(['1_5_execs', '6_20_team', '21_50_dept', '50_plus_enterprise'], {
    required_error: 'Please select target cohort size.',
  }),
  timeline: z.enum(['immediate', 'within_30_days', 'next_quarter', 'planning'], {
    required_error: 'Please select your target start timeline.',
  }),
  budgetBand: z.enum(['under_10k', '10k_25k', '25k_50k', '50k_plus', 'pending_guidance'], {
    required_error: 'Please select an estimated budget tier or request guidance.',
  }),
  additionalContext: z.string().optional().or(z.literal('')),
});

export const step4ContactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (minimum 2 characters).')
    .max(100, 'Name is too long.'),
  jobTitle: z
    .string()
    .trim()
    .max(120, 'Job title is too long.')
    .optional()
    .or(z.literal('')),
  workEmail: z
    .string()
    .trim()
    .min(3, 'Please enter your work email.')
    .email('Please enter a valid email address.'),
  organizationName: z
    .string()
    .trim()
    .max(120, 'Organization name is too long.')
    .optional()
    .or(z.literal('')),
  country: z.string().min(1, 'Please select your primary country of operation.'),
  phoneCountryCode: z.string().default('+966'),
  phoneNumber: z
    .string()
    .trim()
    .max(25, 'Phone number is too long.')
    .optional()
    .or(z.literal('')),
  _gotcha: z.string().optional().or(z.literal('')),
});

export type Step1Data = z.infer<typeof step1DomainSchema>;
export type Step2Data = z.infer<typeof step2DeliverySchema>;
export type Step3Data = z.infer<typeof step3CohortBudgetSchema>;
export type Step4Data = z.infer<typeof step4ContactSchema>;

export type WizardData = Partial<Step1Data & Step2Data & Step3Data & Step4Data> & {
  selectedDomains?:
    | string[]
    | {
        categories: string[];
        subDomains: string[];
      };
  // Legacy / fallback fields for backwards compatibility with lead-scoring
  companyName?: string;
  website?: string;
  industry?: string;
  employees?: string;
  employeesToTrain?: string;
  email?: string;
  phone?: string;
  challenges?: string[];
  trainingType?: string;
  deliveryFormat?: string;
  budgetRange?: string;
  startDate?: string;
  biggestChallenge?: string;
  notes?: string;
  successDefinition?: string;
  workedBefore?: string;
  orgStage?: string;
};

export const STORAGE_KEY = 'pontlook_b2b_training_intake_v2';
