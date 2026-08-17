import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import MultiStepFunnel from '@/components/funnel/MultiStepFunnel';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import {
  ShieldCheck,
  Clock,
  BadgeDollarSign,
  Target,
  Briefcase,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Find Corporate Training: Get 3 Curated GCC Proposals',
  description:
    'Submit your enterprise training scope and receive 2-3 itemized proposals from verified GCC training providers within 48 hours. 100% free for hiring organizations.',
};

const trustMetrics = [
  { value: '120+', label: 'Vetted GCC Providers' },
  { value: '48 Hours', label: 'Proposal SLA' },
  { value: '$0 Cost', label: 'For Hiring Organizations' },
  { value: '100%', label: 'Confidentiality Guaranteed' },
];

const keyAdvantages = [
  {
    icon: Target,
    title: 'Precise GCC Domain Matching',
    text: 'We match your exact workforce transformation KPIs with specialized providers in Riyadh, Dubai, Abu Dhabi, and Doha who have delivered verified outcomes.',
  },
  {
    icon: ShieldCheck,
    title: 'Pre-Vetted Faculty & Accreditations',
    text: 'Every training provider in our network undergoes rigorous vetting for instructor credentials, client references, and local regulatory compliance.',
  },
  {
    icon: Briefcase,
    title: 'Zero Obligation & Zero Cost',
    text: 'Our matchmaking service is 100% free for hiring companies. Review detailed proposals and interview lead facilitators with zero commitment.',
  },
];

function FunnelLoadingFallback() {
  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-12">
      <div className="flex animate-pulse flex-col items-center space-y-4">
        <div className="h-6 w-48 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-72 rounded-full bg-slate-100 dark:bg-slate-800/60" />
        <div className="mt-8 h-64 w-full rounded-2xl bg-slate-100 dark:bg-slate-800/40" />
      </div>
    </div>
  );
}

export default async function FindTrainingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-32 pb-16 text-white sm:pt-36 sm:pb-24">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,82,255,0.15),_transparent_60%)]" />

        <div className="container-site relative z-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/60 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-sm">
              <Sparkles size={14} className="text-blue-400" />
              <span>For GCC CHROs, L&D Directors & Enterprise Leaders</span>
            </div>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-5xl sm:leading-[1.15]">
              Get <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">3 Curated Training Proposals</span> for Your Workforce
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Stop sifting through generic vendor catalogs. Submit your training requirements in 60 seconds, and we&apos;ll introduce you only to proven GCC training providers matched to your exact domain and regional context.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {trustMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center backdrop-blur-sm"
                >
                  <div className="text-xl font-extrabold text-white sm:text-2xl">{m.value}</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Guided Intake Funnel Section */}
      <section className="relative -mt-6 bg-slate-50 py-12 dark:bg-slate-950 sm:py-16">
        <div className="container-site">
          {/* Trust Guarantees header bar */}
          <div className="mx-auto mb-8 flex max-w-4xl flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <BadgeDollarSign size={16} className="text-blue-600 dark:text-blue-400" />
              <span>100% Free for Companies</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>Enterprise Confidentiality</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-blue-600 dark:text-blue-400" />
              <span>Auto-Saves Progress (~60s)</span>
            </span>
          </div>

          {/* Interactive Multi-Step Intake Wizard with Suspense for Search Params */}
          <div className="mx-auto max-w-4xl">
            <Suspense fallback={<FunnelLoadingFallback />}>
              <MultiStepFunnel initialLang={lang} />
            </Suspense>
          </div>

          {/* Advantage Cards */}
          <div className="mx-auto mt-24 max-w-5xl">
            <SectionHeading
              eyebrow="Why PontLook"
              title="How GCC Enterprises Benefit"
              subtitle="Designed specifically for enterprise procurement standards and high-impact human capital development."
            />

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {keyAdvantages.map((adv, i) => (
                <Reveal key={adv.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                      <adv.icon size={24} />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white">
                      {adv.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {adv.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
