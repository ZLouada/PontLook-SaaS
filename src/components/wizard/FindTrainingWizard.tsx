'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ClipboardCheck, Handshake, SearchCheck } from 'lucide-react';
import { computeLeadScore, STORAGE_KEY, type WizardData } from './schemas';
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
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved: Saved = JSON.parse(raw);
        if (saved?.data) setData(saved.data);
        if (saved?.step >= 1 && saved?.step <= 5) setStep(saved.step);
      }
    } catch {
      /* corrupted storage — start fresh */
    }
    setHydrated(true);
  }, []);

  const persist = (nextStep: number, nextData: WizardData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step: nextStep, data: nextData } satisfies Saved));
    } catch {
      /* storage unavailable — continue in-memory */
    }
  };

  const advance = (values: object) => {
    const merged = { ...data, ...values };
    setData(merged);
    if (step < 5) {
      const next = step + 1;
      setStep(next);
      persist(next, merged);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final submission — scoring is internal only, never shown to the company.
      const submission = { ...merged, _score: computeLeadScore(merged), submittedAt: new Date().toISOString() };
      try {
        localStorage.setItem('gcc-find-training-submission', JSON.stringify(submission));
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* non-blocking */
      }
      setDone(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const back = () => {
    const prev = Math.max(1, step - 1);
    setStep(prev);
    persist(prev, data);
  };

  if (!hydrated) {
    return <div className="card min-h-[420px] animate-pulse !p-10" aria-busy="true" />;
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card text-center !p-10 sm:!p-14"
      >
        <CheckCircle2 size={56} className="mx-auto text-emerald-500" />
        <h2 className="mt-6 text-3xl">Assessment received. Matching begins now.</h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed">
          Thank you — your needs assessment is with our qualification team. Here’s exactly what
          happens next:
        </p>
        <div className="mt-10 grid gap-6 text-left sm:grid-cols-3">
          {[
            { icon: ClipboardCheck, title: '1 · Qualification review', text: 'Within 2 business days we verify your requirements and may call to clarify scope.' },
            { icon: SearchCheck, title: '2 · Provider matching', text: 'We shortlist providers whose specialty, language, and track record fit your challenge.' },
            { icon: Handshake, title: '3 · Introduction', text: 'You receive curated introductions and compare proposals — free for companies.' },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl bg-slate-50 p-5">
              <s.icon size={22} className="text-blue-600" />
              <p className="mt-3 font-heading text-sm font-semibold text-slate-900">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
        <Link href="/insights" className="btn-secondary mt-10">
          Explore GCC training insights <ArrowRight size={16} />
        </Link>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Progress indicator */}
      <nav aria-label="Form progress" className="mb-8">
        <ol className="flex items-center gap-2">
          {stepLabels.map((label, i) => {
            const n = i + 1;
            const state = n < step ? 'done' : n === step ? 'current' : 'todo';
            return (
              <li key={label} className="flex flex-1 flex-col items-center gap-2">
                <span
                  aria-current={state === 'current' ? 'step' : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    state === 'done'
                      ? 'bg-blue-600 text-white'
                      : state === 'current'
                        ? 'bg-blue-400 text-white ring-4 ring-blue-50'
                        : 'bg-slate-100 text-slate-900 opacity-60'
                  }`}
                >
                  {n}
                </span>
                <span className={`hidden text-xs font-medium sm:block ${state === 'todo' ? 'text-slate-900 opacity-60' : 'text-slate-900'}`}>
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100" role="presentation">
          <motion.div
            className="h-full rounded-full bg-blue-600"
            animate={{ width: `${((step - 1) / 4) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </nav>

      <div className="card !p-7 sm:!p-10">
        <AnimatePresence mode="wait">
          <motion.div
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
