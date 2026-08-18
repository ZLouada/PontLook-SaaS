'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, m } from 'framer-motion';
import { Clock, ShieldCheck, Sparkles } from 'lucide-react';
import {
  STORAGE_KEY,
  type WizardData,
  TRAINING_DOMAINS,
  DELIVERY_MODES,
  COHORT_SIZES,
  TIMELINES,
  BUDGET_BANDS,
  GCC_CITIES,
} from '@/components/wizard/schemas';
import {
  Step1Domain,
  Step2Delivery,
  Step3CohortBudget,
  Step4Contact,
  Step5Confirmation,
} from '@/components/wizard/steps';
import { useFunnelAnalytics } from '@/hooks/useFunnelAnalytics';
import { getFunnelDictionary, type FunnelLocale } from '@/lib/i18n';
import TrustBadges from './TrustBadges';

const STEP_TITLES = [
  { step: 1, key: 'step1Short', titleEn: 'Training Scope', titleAr: 'المجال' },
  { step: 2, key: 'step2Short', titleEn: 'Delivery & Region', titleAr: 'أسلوب التنفيذ' },
  { step: 3, key: 'step3Short', titleEn: 'Cohort & Budget', titleAr: 'المجموعة والميزانية' },
  { step: 4, key: 'step4Short', titleEn: 'Enterprise Verification', titleAr: 'التحقق المؤسسي' },
];

export interface MultiStepFunnelProps {
  initialLang?: string;
  className?: string;
}

export function MultiStepFunnel({ initialLang = 'en', className = '' }: MultiStepFunnelProps) {
  const searchParams = useSearchParams();
  const lang = (initialLang === 'ar' ? 'ar' : 'en') as FunnelLocale;
  const dict = useMemo(() => getFunnelDictionary(lang), [lang]);
  const isRtl = dict.dir === 'rtl';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<WizardData>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const analytics = useFunnelAnalytics();

  // 1. Pre-population: Parse URL parameters on mount and merge with sessionStorage
  useEffect(() => {
    let savedData: WizardData = {};
    let savedStep = 1;

    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.data) savedData = parsed.data;
        if (parsed?.step && parsed.step >= 1 && parsed.step <= 4) {
          savedStep = parsed.step;
        }
      }
    } catch {
      // Ignore sessionStorage parsing errors
    }

    // Dynamic URL Query Parameter Pre-Population
    // Handles: ?topic=leadership | ?domain=ai_data_tech | ?city=dubai | ?mode=virtual | ?lang=ar | ?cohort=6_20_team | ?budget=25k_50k
    const queryTopic = searchParams?.get('topic') || searchParams?.get('domain');
    const queryCity = searchParams?.get('city');
    const queryMode = searchParams?.get('mode') || searchParams?.get('delivery');
    const queryCohort = searchParams?.get('cohort') || searchParams?.get('size');
    const queryBudget = searchParams?.get('budget');
    const queryLanguage = searchParams?.get('instruction_lang') || searchParams?.get('lang');

    const prefilledData: WizardData = { ...savedData };

    // Topic / Domain Matching
    if (queryTopic) {
      const q = queryTopic.toLowerCase();
      if (q.includes('lead') || q.includes('exec') || q.includes('manage')) {
        prefilledData.domains = Array.from(new Set([...(prefilledData.domains || []), 'executive_leadership']));
      } else if (q.includes('sale') || q.includes('negotiat') || q.includes('commercial')) {
        prefilledData.domains = Array.from(new Set([...(prefilledData.domains || []), 'b2b_sales']));
      } else if (q.includes('ai') || q.includes('data') || q.includes('tech') || q.includes('digital')) {
        prefilledData.domains = Array.from(new Set([...(prefilledData.domains || []), 'ai_data_tech']));
      } else if (q.includes('grc') || q.includes('risk') || q.includes('compliance') || q.includes('governance')) {
        prefilledData.domains = Array.from(new Set([...(prefilledData.domains || []), 'grc_compliance']));
      } else if (q.includes('pmp') || q.includes('agile') || q.includes('project') || q.includes('scrum')) {
        prefilledData.domains = Array.from(new Set([...(prefilledData.domains || []), 'pm_agile']));
      } else {
        prefilledData.domains = Array.from(new Set([...(prefilledData.domains || []), 'other']));
        prefilledData.otherDomainText = queryTopic;
      }
    }

    // City Matching
    if (queryCity) {
      const matchedCity = GCC_CITIES.find(
        (c) => c.toLowerCase() === queryCity.toLowerCase() || c.toLowerCase().includes(queryCity.toLowerCase())
      );
      if (matchedCity) prefilledData.city = matchedCity;
    }

    // Delivery Mode Matching
    if (queryMode) {
      const m = queryMode.toLowerCase();
      if (m.includes('person') || m.includes('onsite')) prefilledData.deliveryMode = 'in_person';
      else if (m.includes('virtual') || m.includes('online')) prefilledData.deliveryMode = 'virtual';
      else if (m.includes('hybrid') || m.includes('blend')) prefilledData.deliveryMode = 'hybrid';
    }

    // Cohort Matching
    if (queryCohort) {
      const c = queryCohort.toLowerCase();
      if (c.includes('1') || c.includes('exec')) prefilledData.cohortSize = '1_5_execs';
      else if (c.includes('6') || c.includes('team')) prefilledData.cohortSize = '6_20_team';
      else if (c.includes('21') || c.includes('dept')) prefilledData.cohortSize = '21_50_dept';
      else if (c.includes('50') || c.includes('enterprise')) prefilledData.cohortSize = '50_plus_enterprise';
    }

    // Budget Matching
    if (queryBudget) {
      const b = queryBudget.toLowerCase();
      if (b.includes('10k_25k') || b.includes('20')) prefilledData.budgetBand = '10k_25k';
      else if (b.includes('25k_50k') || b.includes('30') || b.includes('40')) prefilledData.budgetBand = '25k_50k';
      else if (b.includes('50k') || b.includes('100')) prefilledData.budgetBand = '50k_plus';
      else if (b.includes('under') || b.includes('10')) prefilledData.budgetBand = 'under_10k';
      else if (b.includes('guide') || b.includes('pending')) prefilledData.budgetBand = 'pending_guidance';
    }

    // Language Matching
    if (queryLanguage) {
      const l = queryLanguage.toLowerCase();
      if (l === 'ar' || l.includes('arabic')) prefilledData.language = 'arabic';
      else if (l === 'en' || l.includes('english')) prefilledData.language = 'english';
      else if (l.includes('bi')) prefilledData.language = 'bilingual';
    }

    setFormData(prefilledData);
    setCurrentStep(savedStep);
    setHydrated(true);

    // Sync telemetry state
    analytics.syncState(savedStep, prefilledData);
  }, [searchParams, analytics]);

  // Persist current state to sessionStorage
  const persistSession = (step: number, data: WizardData) => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          step,
          data,
          updatedAt: Date.now(),
        })
      );
    } catch {
      // Storage unavailable
    }
  };

  // Advance to next step
  const handleAdvance = async (stepValues: object, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setSubmissionError(null);
    const updatedData: WizardData = { ...formData, ...stepValues };
    setFormData(updatedData);

    const stepNames = ['Training Scope', 'Delivery & Region', 'Cohort & Budget', 'Enterprise Verification'];
    analytics.trackStepCompleted(currentStep, stepNames[currentStep - 1] || `Step ${currentStep}`, updatedData);

    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      persistSession(next, updatedData);
      analytics.syncState(next, updatedData);

      // Smooth scroll to wizard top
      if (typeof window !== 'undefined') {
        const wizardContainer = document.getElementById('multistep-funnel-container');
        if (wizardContainer) {
          wizardContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Step 4 final submission
      await handleIntakeSubmission(updatedData);
    }
  };

  // Back navigation
  const handleBack = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSubmissionError(null);
    const prev = Math.max(1, currentStep - 1);
    analytics.trackStepBack(currentStep, prev);
    setCurrentStep(prev);
    persistSession(prev, formData);
    analytics.syncState(prev, formData);
  };

  // Final submission handler: Calls /api/intake with Formspree fallback
  const handleIntakeSubmission = async (finalData: WizardData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    // Bot honeypot filter
    if (finalData._gotcha) {
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    try {
      // Primary: Dispatch to Next.js /api/intake (which triggers Resend transactional email & Slack/CRM webhook)
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && resData.success) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // non-blocking
        }
        analytics.trackFormSubmitted(finalData, resData.score, resData.tier);
        setIsSubmitted(true);
      } else {
        // Fallback: If /api/intake returned error (or static host), try direct Formspree dispatch
        console.warn('/api/intake response not ok, attempting Formspree fallback...', resData);
        await fallbackFormspreeDispatch(finalData);
      }
    } catch (err) {
      console.warn('Network error calling /api/intake, attempting Formspree fallback...', err);
      await fallbackFormspreeDispatch(finalData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fallbackFormspreeDispatch = async (finalData: WizardData) => {
    try {
      await fetch('https://formspree.io/f/xppawggd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          form_type: 'B2B Corporate Training Intake',
          ...finalData,
          submitted_at: new Date().toISOString(),
        }),
      });
    } catch (fallbackErr) {
      console.error('Fallback dispatch error:', fallbackErr);
    }
    // Transition to confirmation screen so user experience remains flawless
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // non-blocking
    }
    analytics.trackFormSubmitted(finalData);
    setIsSubmitted(true);
  };

  if (!hydrated) {
    return (
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="flex animate-pulse flex-col items-center space-y-4">
          <div className="h-6 w-48 rounded-full bg-slate-200" />
          <div className="h-4 w-72 rounded-full bg-slate-100" />
          <div className="mt-8 h-64 w-full rounded-2xl bg-slate-100" />
        </div>
      </div>
    );
  }

  // Step 5: Post-Submission Match Confirmation Screen
  if (isSubmitted) {
    return (
      <div id="multistep-funnel-container" className={`w-full ${className}`} dir={dict.dir}>
        <Step5Confirmation data={formData} />
      </div>
    );
  }

  return (
    <div
      id="multistep-funnel-container"
      className={`w-full space-y-6 ${className}`}
      dir={dict.dir}
    >
      {/* Progress Scaffolding Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-extrabold text-white">
              {currentStep}
            </span>
            <span className="text-sm font-bold text-slate-900">
              {lang === 'ar' ? `الخطوة ${currentStep} من 4:` : `Step ${currentStep} of 4:`}
            </span>
            <span className="text-sm font-medium text-slate-600">
              {lang === 'ar' ? STEP_TITLES[currentStep - 1]?.titleAr : STEP_TITLES[currentStep - 1]?.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Clock size={13} className="text-blue-600" />
              <span>{dict.scaffolding.estimatedTime}</span>
            </span>
            <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 sm:inline-flex">
              <ShieldCheck size={12} />
              <span>{dict.scaffolding.autoSaving}</span>
            </span>
          </div>
        </div>

        {/* Step Track Bars */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {STEP_TITLES.map((def) => {
            const isCompleted = def.step < currentStep;
            const isCurrent = def.step === currentStep;

            return (
              <div key={def.step} className="space-y-1.5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted || isCurrent ? 'bg-blue-600' : 'bg-transparent'
                    }`}
                    style={{ width: isCompleted || isCurrent ? '100%' : '0%' }}
                  />
                </div>
                <div className="hidden sm:block">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      isCurrent
                        ? 'text-blue-600'
                        : isCompleted
                        ? 'text-slate-700'
                        : 'text-slate-400'
                    }`}
                  >
                    {lang === 'ar' ? def.titleAr : def.titleEn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Step Card Container */}
      <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        {submissionError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700" role="alert">
            {submissionError}
          </div>
        )}

        <AnimatePresence mode="wait">
          <m.div
            key={currentStep}
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {currentStep === 1 && (
              <Step1Domain
                data={formData}
                onNext={handleAdvance}
                isSubmitting={isSubmitting}
              />
            )}
            {currentStep === 2 && (
              <Step2Delivery
                data={formData}
                onNext={handleAdvance}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            )}
            {currentStep === 3 && (
              <Step3CohortBudget
                data={formData}
                onNext={handleAdvance}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            )}
            {currentStep === 4 && (
              <Step4Contact
                data={formData}
                onNext={handleAdvance}
                onBack={handleBack}
                isSubmitting={isSubmitting}
              />
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Trust & Accreditation Badges */}
      <TrustBadges />
    </div>
  );
}

export default MultiStepFunnel;
