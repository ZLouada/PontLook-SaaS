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
  Building2,
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
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
      <div className="flex animate-pulse flex-col items-center space-y-4">
        <div className="h-6 w-48 rounded-full bg-slate-200" />
        <div className="h-4 w-72 rounded-full bg-slate-100" />
        <div className="mt-8 h-64 w-full rounded-2xl bg-slate-100" />
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
      <div className="bg-hero-gradient">
        <section className="container-site relative z-10 pt-36 pb-16 text-center sm:pt-40 sm:pb-20">
          <Reveal className="mx-auto max-w-3xl">
            <span className="chip mx-auto inline-flex items-center gap-2">
              <Building2 size={14} className="text-primary" />
              <span>For GCC CHROs, L&D Directors & Enterprise Leaders</span>
            </span>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15]">
              Get <span className="gradient-text">3 Curated Training Proposals</span> for Your Workforce
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Stop sifting through generic vendor catalogs. Submit your training requirements in 60 seconds, and we&apos;ll introduce you only to proven GCC training providers matched to your exact domain and regional context.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {trustMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 text-center shadow-sm backdrop-blur-sm"
                >
                  <div className="text-xl font-extrabold text-slate-900 sm:text-2xl">{m.value}</div>
                  <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      {/* Main Guided Intake Funnel Section */}
      <section className="relative bg-slate-50/70 py-12 sm:py-16 border-t border-slate-100">
        <div className="container-site">
          {/* Trust Guarantees header bar */}
          <div className="mx-auto mb-8 flex max-w-4xl flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <BadgeDollarSign size={16} className="text-primary" />
              <span>100% Free for Companies</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-600" />
              <span>Enterprise Confidentiality</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-primary" />
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
                  <div className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all hover:border-slate-300 hover:shadow-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      <adv.icon size={24} />
                    </div>
                    <h3 className="mt-5 text-base font-bold text-slate-900">
                      {adv.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
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
