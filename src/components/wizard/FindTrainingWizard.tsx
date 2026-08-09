'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, CheckCircle2, ClipboardCheck, Handshake, SearchCheck } from 'lucide-react';
import { STORAGE_KEY, type WizardData } from './schemas';
import { ChallengesStep, CompanyStep, DecisionMakerStep, MatchingStep, ScopeStep } from './steps';

const stepLabels = ['Company', 'Decision Maker', 'Challenges', 'Requirements', 'Matching'];

type Saved = { step: number; data: WizardData };

export default function FindTrainingWizard() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>({});
  const [done, setDone] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore progress across reloads
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: Saved = JSON.parse(raw);
        if (saved?.data) setData(saved.data);
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

  const advance = async (values: object) => {
    const merged = { ...data, ...values };
    setData(merged);
    if (step < 5) {
      const next = step + 1;
      setStep(next);
      persist(next, merged);
    } else {
      try {
        const res = await fetch('https://formspree.io/f/xppawggd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            company_name: merged.companyName || 'N/A',
            website: merged.website || 'N/A',
            full_name: merged.fullName || 'N/A',
            business_email: merged.email || 'N/A',
            phone: merged.phone || 'N/A',
            years_in_business: merged.orgStage || 'N/A',
            specialties: merged.trainingType || 'N/A',
            primary_challenges: Array.isArray(merged.challenges) ? merged.challenges.join(', ') : (merged.challenges || 'N/A'),
            headcount_tier: merged.employees || 'N/A',
            allocated_budget: merged.budgetRange || 'N/A',
            estimated_timeline: merged.startDate || 'N/A',
            challenge_notes: merged.biggestChallenge || merged.notes || merged.successDefinition || 'N/A',
            country: merged.country || 'N/A',
            city: merged.city || 'N/A',
            industry: merged.industry || 'N/A',
            job_title: merged.jobTitle || 'N/A',
            delivery_format: merged.deliveryFormat || 'N/A',
            language: merged.language || 'N/A',
            employees_to_train: merged.employeesToTrain || 'N/A',
            industry_experience: merged.industryExperience || 'N/A',
            worked_before: merged.workedBefore || 'N/A',
            what_was_missing: merged.whatWasMissing || 'N/A',
            success_definition: merged.successDefinition || 'N/A',
            notes: merged.notes || 'N/A',
          }),
        });

        if (res.ok) {
          try {
            sessionStorage.removeItem(STORAGE_KEY);
          } catch {
            /* non-blocking */
          }
          setDone(true);
        } else {
          alert('Submission error. Please check form inputs.');
        }
      } catch (err) {
        console.error('Formspree submission error:', err);
        alert('Network error submitting request.');
      } finally {
        /* no-op */
      }
    }
  };

  const back = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const prev = Math.max(1, step - 1);
    setStep(prev);
    persist(prev, data);
  };

  if (!hydrated) {
    return <div className="card min-h-[420px] animate-pulse !p-10" aria-busy="true" />;
  }

  if (done) {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center !p-10 sm:!p-14"
      >
        <CheckCircle2 size={56} className="mx-auto text-emerald-500" />
        <h2 className="mt-6 text-3xl">Assessment received. Matching begins now.</h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed">
          Thank you, your needs assessment is with our qualification team. Here’s exactly what
          happens next:
        </p>
        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {[
            { icon: ClipboardCheck, title: '1 · Qualification review', text: 'Within 2 business days we verify your requirements and may call to clarify scope.' },
            { icon: SearchCheck, title: '2 · Provider matching', text: 'We shortlist providers whose specialty, language, and track record fit your challenge.' },
            { icon: Handshake, title: '3 · Introduction', text: 'You receive curated introductions and compare proposals: free for companies.' },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl bg-slate-50 p-5">
              <s.icon size={22} className="text-blue-600" />
              <p className="mt-3 font-heading text-sm font-semibold text-slate-900">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
        <Link href="/en" className="btn-secondary mt-10">
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
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden relative">
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
            <h2 className="text-2xl">{stepLabels[step - 1]}</h2>
            <p className="mt-1 mb-7 text-sm text-body">
              Step {step} of 5 · progress saves automatically
            </p>
            {step === 1 && <CompanyStep data={data} onNext={advance} />}
            {step === 2 && <DecisionMakerStep data={data} onNext={advance} onBack={back} />}
            {step === 3 && <ChallengesStep data={data} onNext={advance} onBack={back} />}
            {step === 4 && <ScopeStep data={data} onNext={advance} onBack={back} />}
            {step === 5 && <MatchingStep data={data} onNext={advance} onBack={back} />}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
