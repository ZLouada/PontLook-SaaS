'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, CheckCircle2, ClipboardCheck, Handshake, SearchCheck } from 'lucide-react';
import { calculateLeadScore } from '@/lib/lead-scoring';
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* non-blocking */
      }

      const scoreResult = calculateLeadScore(merged);
      const leadScore = scoreResult.score;
      const leadTier = scoreResult.tier;

      // Native HTML form POST to bypass CORS & JS blocking
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://api.web3forms.com/submit';

      const fields: Record<string, string> = {
        access_key: '8b61988b-d8e3-414b-a843-5ea273292bb5',
        subject: `New Lead Request from PontLook Website (${leadTier || 'Qualified'})`,
        from_name: 'PontLook Lead Engine',
        redirect: 'https://pontlook.com/en/contact?submitted=true',

        company_name: merged.companyName || '',
        website: merged.website || '',
        full_name: merged.fullName || '',
        business_email: merged.email || '',
        phone: merged.phone || '',
        years_in_business: merged.orgStage || '',
        specialties: merged.trainingType || '',
        challenges: Array.isArray(merged.challenges) ? merged.challenges.join(', ') : (merged.challenges || ''),
        primary_challenges: Array.isArray(merged.challenges) ? merged.challenges.join(', ') : (merged.challenges || ''),
        headcount: merged.employees || '',
        headcount_tier: merged.employees || '',
        employees_to_train: merged.employeesToTrain || '',
        budget: merged.budgetRange || '',
        allocated_budget: merged.budgetRange || '',
        timeline: merged.startDate || '',
        estimated_timeline: merged.startDate || '',
        description: merged.biggestChallenge || merged.notes || merged.successDefinition || '',
        challenge_notes: merged.notes || merged.biggestChallenge || merged.successDefinition || '',
        country: merged.country || '',
        city: merged.city || '',
        industry: merged.industry || '',
        job_title: merged.jobTitle || '',
        delivery_format: merged.deliveryFormat || '',
        language: merged.language || '',
        organization_stage: merged.orgStage || '',
        industry_experience_requirement: merged.industryExperience || '',
        worked_with_provider_before: merged.workedBefore || '',
        what_was_missing: merged.whatWasMissing || '',
        success_definition: merged.successDefinition || '',
        biggest_challenge: merged.biggestChallenge || '',
        additional_notes: merged.notes || '',
        lead_score: String(leadScore),
        lead_tier: leadTier,
        submitted_at: new Date().toISOString(),
      };

      Object.entries(fields).forEach(([k, v]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = k;
        input.value = v;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
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
