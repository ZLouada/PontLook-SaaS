export const PONTLOOK_CATEGORIES = [
  {
    value: 'leadership',
    labelEn: 'Leadership',
    labelAr: 'القيادة الإدارية',
  },
  {
    value: 'learning-and-development',
    labelEn: 'Learning & Development',
    labelAr: 'التعلم والتطوير',
  },
  {
    value: 'workforce-development',
    labelEn: 'Workforce Development',
    labelAr: 'تطوير القوى العاملة',
  },
  {
    value: 'ai-and-digital-skills',
    labelEn: 'AI & Digital Skills',
    labelAr: 'الذكاء الاصطناعي والمهارات الرقمية',
  },
  {
    value: 'onboarding-and-retention',
    labelEn: 'Onboarding & Retention',
    labelAr: 'تأهيل واستبقاء الكفاءات',
  },
  {
    value: 'nationalization',
    labelEn: 'Nationalization',
    labelAr: 'توطين الوظائف',
  },
  {
    value: 'training-roi',
    labelEn: 'Training ROI',
    labelAr: 'العائد على التدريب',
  },
  {
    value: 'corporate-culture',
    labelEn: 'Corporate Culture',
    labelAr: 'الثقافة المؤسسية',
  },
] as const;

export type PontLookCategorySlug = (typeof PONTLOOK_CATEGORIES)[number]['value'];

export const DEFAULT_CATEGORY_SLUG: PontLookCategorySlug = 'leadership';

export const CATEGORY_SELECT_OPTIONS = PONTLOOK_CATEGORIES.map((c) => ({
  label: c.labelEn,
  value: c.value,
}));

/**
 * Validates whether a given slug string matches one of the canonical 8 categories.
 */
export function isValidCategorySlug(slug?: string | null): slug is PontLookCategorySlug {
  if (!slug) return false;
  return PONTLOOK_CATEGORIES.some((c) => c.value === slug);
}

/**
 * Normalizes an arbitrary category string (or legacy string) to one of the 8 canonical slugs.
 * Falls back to 'leadership' if missing or unrecognized.
 */
export function normalizeCategorySlug(rawCategory?: string | null): PontLookCategorySlug {
  if (!rawCategory) return DEFAULT_CATEGORY_SLUG;
  const clean = rawCategory.trim().toLowerCase();

  // Direct match
  const directMatch = PONTLOOK_CATEGORIES.find((c) => c.value === clean);
  if (directMatch) return directMatch.value;

  // Match English label
  const labelEnMatch = PONTLOOK_CATEGORIES.find((c) => c.labelEn.toLowerCase() === clean);
  if (labelEnMatch) return labelEnMatch.value;

  // Match Arabic label
  const labelArMatch = PONTLOOK_CATEGORIES.find((c) => c.labelAr === clean);
  if (labelArMatch) return labelArMatch.value;

  // Fuzzy match common legacy keywords
  if (clean.includes('lead') || clean.includes('قياد')) return 'leadership';
  if (clean.includes('l&d') || clean.includes('learning') || clean.includes('تطوير') || clean.includes('تعلم')) {
    return 'learning-and-development';
  }
  if (clean.includes('workforce') || clean.includes('قوى عاملة')) return 'workforce-development';
  if (clean.includes('ai') || clean.includes('digital') || clean.includes('ذكاء') || clean.includes('رقمي')) {
    return 'ai-and-digital-skills';
  }
  if (clean.includes('onboarding') || clean.includes('retention') || clean.includes('استبقاء') || clean.includes('تأهيل')) {
    return 'onboarding-and-retention';
  }
  if (clean.includes('nationalization') || clean.includes('توطين') || clean.includes('سعودة')) {
    return 'nationalization';
  }
  if (clean.includes('roi') || clean.includes('عائد')) return 'training-roi';
  if (clean.includes('culture') || clean.includes('ثقافة')) return 'corporate-culture';

  return DEFAULT_CATEGORY_SLUG;
}

/**
 * Returns localized label for a category given a category slug or legacy name and locale.
 */
export function getCategoryLabel(category?: string | null, locale: string = 'en'): string {
  const isAr = locale.startsWith('ar');
  const slug = normalizeCategorySlug(category);
  const matched = PONTLOOK_CATEGORIES.find((c) => c.value === slug);

  if (!matched) {
    return isAr ? 'القيادة الإدارية' : 'Leadership';
  }

  return isAr ? matched.labelAr : matched.labelEn;
}
