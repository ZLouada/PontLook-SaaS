'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, CheckCircle2, ClipboardCheck, Handshake, SearchCheck } from 'lucide-react';
import { STORAGE_KEY, type WizardData } from './schemas';
import { ChallengesStep, CompanyStep, DecisionMakerStep, MatchingStep, ScopeStep } from './steps';

const stepLabels = ['Company', 'Decision Maker', 'Challenges', 'Requirements', 'Matching'];

type Saved = { step: number; data: WizardData };

export default function FindTrainingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<WizardData>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Restore progress across reloads
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: Saved = JSON.parse(raw);
        if (saved?.data) setFormData(saved.data);
        if (saved?.step >= 1 && saved?.step <= 5) setStep(saved.step);
      }
    } catch {
      /* corrupted storage: start fresh */
    }
    setHydrated(true);
  }, []);

  const persist = (nextStep: number, nextData: WizardData) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step: nextStep, data: nextData } satisfies Saved));
    } catch {
      /* storage unavailable: continue in-memory */
    }
  };

  const handleSubmit = async (
    e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent,
    finalValues?: object
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsLoading(true);
    const currentData = { ...formData, ...(finalValues || {}) };
    console.log('Submitting FindTrainingWizard form data...', currentData);

    try {
      const response = await fetch('https://formspree.io/f/xppawggd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          form_type: 'Looking for Training Request',
          company_name: currentData.companyName || (currentData as any).company || 'N/A',
          website: currentData.website || 'N/A',
          country: currentData.country || 'N/A',
          city: currentData.city || 'N/A',
          industry: currentData.industry || 'N/A',
          headcount: (currentData as any).headcount || currentData.employees || 'N/A',
          full_name: currentData.fullName || (currentData as any).name || 'N/A',
          job_title: currentData.jobTitle || (currentData as any).title || 'N/A',
          business_email: (currentData as any).businessEmail || currentData.email || 'N/A',
          phone: currentData.phone || 'N/A',
          challenges: Array.isArray(currentData.challenges) ? currentData.challenges.join(', ') : (currentData.challenges || 'N/A'),
          delivery_format: (currentData as any).format || currentData.deliveryFormat || 'N/A',
          budget: (currentData as any).budget || currentData.budgetRange || 'N/A',
          timeline: (currentData as any).timeline || currentData.startDate || 'N/A',
          description:
            (currentData as any).description ||
            currentData.biggestChallenge ||
            currentData.notes ||
            currentData.successDefinition ||
            'N/A',
          submitted_at: new Date().toISOString(),
        }),
      });

      const data = await response.json().catch(() => ({}));
      console.log('Formspree response:', data);

      if (response.ok) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          /* non-blocking */
        }
        setIsSubmitted(true);
      } else {
        alert('Submission failed. Please verify your details.');
      }
    } catch (error) {
      console.error('Network submission error:', error);
      alert('Network error submitting request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const advance = async (values: object, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const merged = { ...formData, ...values };
    setFormData(merged);
    if (step < 5) {
      const next = step + 1;
      setStep(next);
      persist(next, merged);
    } else {
      await handleSubmit(e, values);
    }
  };

  const back = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const prev = Math.max(1, step - 1);
    setStep(prev);
    persist(prev, formData);
  };

  if (!hydrated) {
    return <div className="card min-h-[420px] animate-pulse !p-10" aria-busy="true" />;
  }

  if (isSubmitted) {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center !p-10 sm:!p-14"
      >
        <CheckCircle2 size={56} className="mx-auto text-emerald-500" />
        <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
          Assessment received. Matching begins now.
        </h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Thank you, your needs assessment is with our qualification team. Here’s exactly what
          happens next:
        </p>
        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {[
            { icon: ClipboardCheck, title: '1 · Qualification review', text: 'Within 2 business days we verify your requirements and may call to clarify scope.' },
            { icon: SearchCheck, title: '2 · Provider matching', text: 'We shortlist providers whose specialty, language, and track record fit your challenge.' },
            { icon: Handshake, title: '3 · Introduction', text: 'You receive curated introductions and compare proposals: free for companies.' },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 p-5">
              <s.icon size={22} className="text-blue-600 dark:text-blue-400" />
              <p className="mt-3 font-heading text-sm font-semibold text-slate-900 dark:text-white">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.text}</p>
            </div>
          ))}
        </div>
        <Link href="/" className="btn-secondary mt-10 inline-flex items-center gap-2">
          Back to home <ArrowRight size={16} />
        </Link>
      </m.div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <nav aria-label="Form progress" className="mb-10">
        <div className="flex w-full items-end gap-1">
          {stepLabels.map((label, i) => {
            const n = i + 1;
            let state = 'todo';
            if (n < step) state = 'done';
            else if (n === step) state = 'current';

            let stateColor = 'text-slate-400';
            if (state === 'current') stateColor = 'text-primary';
            else if (state === 'done') stateColor = 'text-foreground';

            return (
              <div key={label} className="flex flex-1 flex-col gap-2">
                <span className={`text-[11px] font-semibold uppercase tracking-wider ${stateColor}`}>
                  {label}
                </span>
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                  {(state === 'done' || state === 'current') && (
                    <m.div
                      className="absolute inset-y-0 start-0 bg-primary rounded-full"
                      initial={{ width: state === 'current' ? '0%' : '100%' }}
                      animate={{ width: state === 'current' ? '50%' : '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="card !p-7 sm:!p-10">
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {stepLabels[step - 1]}
            </h2>
            <p className="mt-1 mb-7 text-sm text-slate-600 dark:text-slate-300">
              Step {step} of 5 · progress saves automatically
            </p>
            {step === 1 && <CompanyStep data={formData} onNext={advance} isSubmitting={isLoading} />}
            {step === 2 && <DecisionMakerStep data={formData} onNext={advance} onBack={back} isSubmitting={isLoading} />}
            {step === 3 && <ChallengesStep data={formData} onNext={advance} onBack={back} isSubmitting={isLoading} />}
            {step === 4 && <ScopeStep data={formData} onNext={advance} onBack={back} isSubmitting={isLoading} />}
            {step === 5 && <MatchingStep data={formData} onNext={advance} onBack={back} isSubmitting={isLoading} />}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
