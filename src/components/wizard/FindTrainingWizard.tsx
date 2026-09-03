'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Clock, ShieldCheck } from 'lucide-react';
import { STORAGE_KEY, type WizardData, TRAINING_DOMAINS, DELIVERY_MODES, COHORT_SIZES, TIMELINES, BUDGET_BANDS } from './schemas';
import { formatSelectedDomains, resolveDomainLabel } from './trainingDomains';
import {
  Step1Domain,
  Step2Delivery,
  Step3CohortBudget,
  Step4Contact,
  Step5Confirmation,
} from './steps';

const STEP_DEFINITIONS = [
  { step: 1, title: 'Training Scope', short: 'Scope' },
  { step: 2, title: 'Delivery & Region', short: 'Delivery' },
  { step: 3, title: 'Cohort & Budget', short: 'Cohort & Budget' },
  { step: 4, title: 'Enterprise Verification', short: 'Verification' },
];

type SavedSession = {
  step: number;
  data: WizardData;
  updatedAt: number;
};

export default function FindTrainingWizard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<WizardData>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Restore progress across page reloads from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: SavedSession = JSON.parse(raw);
        if (saved?.data && typeof saved.data === 'object') {
          setFormData(saved.data);
        }
        if (saved?.step && saved.step >= 1 && saved.step <= 4) {
          setCurrentStep(saved.step);
        }
      }
    } catch {
      // Corrupted storage: fallback to fresh state
    }
    setHydrated(true);
  }, []);

  const persistToStorage = (step: number, data: WizardData) => {
    try {
      const payload: SavedSession = {
        step,
        data,
        updatedAt: Date.now(),
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Storage unavailable or disabled: continue safely in memory
    }
  };

  const handleAdvance = async (stepValues: object, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setErrorMessage(null);
    const updatedData: WizardData = { ...formData, ...stepValues };
    setFormData(updatedData);

    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      persistToStorage(next, updatedData);
      // Smooth scroll to top of wizard on step advance
      if (typeof window !== 'undefined') {
        const wizardEl = document.getElementById('find-training-wizard-container');
        if (wizardEl) {
          wizardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      // Step 4 submitted: execute final intake submission
      await handleFinalSubmit(updatedData);
    }
  };

  const handleBack = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setErrorMessage(null);
    const prev = Math.max(1, currentStep - 1);
    setCurrentStep(prev);
    persistToStorage(prev, formData);
  };

  const handleFinalSubmit = async (finalData: WizardData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    // Bot honeypot check
    if (finalData._gotcha) {
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    // Format human-readable metadata for proposal matching desk
    const activeSelectedDomains = finalData.selectedDomains || formData.selectedDomains;

    const formattedSelectedDomains =
      (Array.isArray(activeSelectedDomains)
        ? activeSelectedDomains.join(', ')
        : activeSelectedDomains && typeof activeSelectedDomains === 'object' && 'join' in activeSelectedDomains
        ? (activeSelectedDomains as any).join(', ')
        : activeSelectedDomains && typeof activeSelectedDomains === 'object'
        ? [...(activeSelectedDomains.categories || []), ...(activeSelectedDomains.subDomains || [])].join(', ')
        : undefined) ||
      finalData.domains?.join(', ') ||
      'General / Unspecified';

    const domainLabels =
      (activeSelectedDomains ? formatSelectedDomains(activeSelectedDomains as any) : '') ||
      (finalData.domains || [])
        .map((dId) => {
          if (dId === 'other') return finalData.otherDomainText ? `Specialized (${finalData.otherDomainText})` : 'Specialized/Other';
          return resolveDomainLabel(dId) || TRAINING_DOMAINS.find((t) => t.id === dId)?.title || dId;
        })
        .join(', ') ||
      formattedSelectedDomains;

    const deliveryTitle =
      DELIVERY_MODES.find((m) => m.id === finalData.deliveryMode)?.title || finalData.deliveryMode || 'N/A';

    const cohortLabel =
      COHORT_SIZES.find((c) => c.id === finalData.cohortSize)?.label || finalData.cohortSize || 'N/A';

    const timelineLabel =
      TIMELINES.find((t) => t.id === finalData.timeline)?.label || finalData.timeline || 'N/A';

    const budgetLabel =
      BUDGET_BANDS.find((b) => b.id === finalData.budgetBand)?.label || finalData.budgetBand || 'N/A';

    const payload = {
      form_type: 'B2B Corporate Training Intake (4-Step Guided Funnel)',
      full_name: finalData.fullName || 'N/A',
      job_title: finalData.jobTitle || 'N/A',
      work_email: finalData.workEmail || 'N/A',
      organization_name: finalData.organizationName || 'N/A',
      country: finalData.country || 'Saudi Arabia',
      phone_number: `${finalData.phoneCountryCode || '+966'} ${finalData.phoneNumber || ''}`.trim(),
      selected_domains: (Array.isArray(formData.selectedDomains) ? formData.selectedDomains?.join(', ') : undefined) || formattedSelectedDomains || 'General / Unspecified',
      training_domains: domainLabels || formattedSelectedDomains || 'General / Unspecified',
      delivery_mode: deliveryTitle,
      delivery_city: finalData.city || 'N/A',
      instruction_language: finalData.language || 'Bilingual',
      customization_level: finalData.customization === 'tailored' ? 'Tailored Cohort Program' : 'Standard Off-the-Shelf',
      cohort_size: cohortLabel,
      start_horizon: timelineLabel,
      budget_tier: budgetLabel,
      additional_kpis: finalData.additionalContext || 'N/A',
      submitted_at: new Date().toISOString(),
      _gotcha: finalData._gotcha || '',
    };

    console.log('Dispatching PontLook B2B intake payload:', payload);

    try {
      const response = await fetch('https://formspree.io/f/xppawggd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // non-blocking
        }
        setIsSubmitted(true);
      } else {
        // Fallback: If Formspree fails (e.g. rate limit), allow graceful transition to confirmation
        console.warn('Formspree endpoint returned non-200 status, transitioning with local state.');
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Submission network error:', err);
      // Fallback: allow UX completion
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = handleFinalSubmit;

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

  // Confirmation screen (Step 5)
  if (isSubmitted) {
    return (
      <div id="find-training-wizard-container" className="w-full">
        <Step5Confirmation data={formData} />
      </div>
    );
  }

  const progressPercentage = ((currentStep - 1) / (STEP_DEFINITIONS.length - 1)) * 100;

  return (
    <div id="find-training-wizard-container" className="w-full space-y-6">
      {/* Progress Scaffolding Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-extrabold text-white">
              {currentStep}
            </span>
            <span className="text-sm font-bold text-slate-900">
              Step {currentStep} of 4:
            </span>
            <span className="text-sm font-medium text-slate-600">
              {STEP_DEFINITIONS[currentStep - 1]?.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
              <Clock size={13} className="text-blue-600" />
              <span>(~60 seconds)</span>
            </span>
            <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 sm:inline-flex">
              <ShieldCheck size={12} />
              <span>Auto-saving</span>
            </span>
          </div>
        </div>

        {/* Step Track Bars */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {STEP_DEFINITIONS.map((def) => {
            const isCompleted = def.step < currentStep;
            const isCurrent = def.step === currentStep;

            return (
              <div key={def.step} className="space-y-1.5">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted
                        ? 'bg-blue-600'
                        : isCurrent
                        ? 'bg-blue-600'
                        : 'bg-transparent'
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
                    {def.short}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Step Container */}
      <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700" role="alert">
            {errorMessage}
          </div>
        )}

        <AnimatePresence mode="wait">
          <m.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
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
    </div>
  );
}
