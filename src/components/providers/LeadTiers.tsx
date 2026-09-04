'use client';

import React from 'react';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import Badge from '@/components/shared/Badge';
import { Flame, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { m } from 'framer-motion';

type LeadTiersProps = {
  dict?: any;
  lang?: string;
};

const defaultTiers = [
  {
    icon: Flame,
    name: 'Hot',
    range: '90–100',
    pct: '95%',
    cls: 'bg-rose-50 text-rose-600 border-rose-200',
    barColor: 'from-rose-500 to-red-600',
    desc: 'Verified decision-maker, confirmed budget, defined scope, start date within 30 days. Ready for proposal.',
  },
  {
    icon: TrendingUp,
    name: 'Warm',
    range: '70–89',
    pct: '80%',
    cls: 'bg-amber-50 text-amber-600 border-amber-200',
    barColor: 'from-amber-500 to-orange-500',
    desc: 'Pain and authority confirmed. Budget or timeline still being finalized internally.',
  },
  {
    icon: ShieldCheck,
    name: 'Qualified',
    range: '50–69',
    pct: '60%',
    cls: 'bg-blue-50 text-blue-600 border-blue-200',
    barColor: 'from-blue-500 to-indigo-600',
    desc: 'Genuine, verified need at an earlier stage of the buying journey. Ideal for relationship-building.',
  },
  {
    icon: CheckCircle2,
    name: 'Follow-up',
    range: '<50',
    pct: '40%',
    cls: 'bg-slate-100 text-slate-600 border-slate-200',
    barColor: 'from-slate-400 to-slate-500',
    desc: 'Signal detected but not yet qualified. We keep nurturing: you are never charged for these.',
  },
];

const defaultSignals = [
  'Decision-maker identity and authority verified',
  'Company size and organizational maturity',
  'Budget disclosed and sanity-checked',
  'Timeline to start',
  'Number and severity of pain points',
  'Depth and specificity of the challenge description',
];

export default function LeadTiers({ dict, lang }: LeadTiersProps = {}) {
  const eyebrow = dict?.provider_teaser?.badge || 'Lead Quality Tiers';
  const title = 'You always know what you’re walking into';
  const subtitle = 'Every opportunity is scored before delivery. The tier tells you exactly how ready the buyer is.';

  return (
    <section className="relative bg-white py-12 lg:py-16 rounded-3xl overflow-hidden shadow-sm border border-slate-200/80" id="lead-quality">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-blue-500/5 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(defaultTiers || []).map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="flex flex-col justify-between h-full bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 sm:p-7 hover:bg-white hover:shadow-lg hover:border-blue-500/30 transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${t.cls}`}
                      >
                        <Icon size={20} />
                      </span>
                      <Badge variant="slate">{t.range}</Badge>
                    </div>

                    <h3 className="font-heading text-xl font-semibold text-slate-800">
                      {t.name} Tier
                    </h3>

                    {/* Animated Lead Score Progress Meter */}
                    <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden my-3">
                      <m.div
                        initial={{ width: '0%' }}
                        whileInView={{ width: t.pct }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.12 + 0.2 }}
                        className={`h-full bg-gradient-to-r ${t.barColor} rounded-full`}
                      />
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-slate-600 font-sans">
                      {t.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Driver Card */}
        <Reveal
          className="mx-auto mt-14 max-w-4xl rounded-3xl bg-slate-50 border border-slate-200/70 text-slate-800 p-8 md:p-12 shadow-sm relative overflow-hidden"
          delay={0.1}
        >
          <div className="relative z-10">
            <h3 className="text-xl font-semibold text-slate-800 mb-2 font-heading">
              What drives the score
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-2xl">
              We don’t publish exact point algorithms: the philosophy is simple: the more a buyer has
              verified about their own readiness, the higher the score.
            </p>

            <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {(defaultSignals || []).map((s) => (
                <li key={s} className="flex items-center gap-2.5 text-slate-700 font-medium">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
