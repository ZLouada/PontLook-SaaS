'use client';

import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import Card from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import { Flame, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { m } from 'framer-motion';
import { useDictionary } from './DictionaryProvider';

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
    cls: 'bg-accent/10 text-accent border-accent/20',
    barColor: 'from-accent to-accent-secondary',
    desc: 'Genuine, verified need at an earlier stage of the buying journey. Ideal for relationship-building.',
  },
  {
    icon: CheckCircle2,
    name: 'Follow-up',
    range: '<50',
    pct: '40%',
    cls: 'bg-slate-100 text-slate-500 border-slate-200',
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

export default function LeadTiers({ dict: propDict, lang }: LeadTiersProps = {}) {
  const contextDict = useDictionary();
  const dict = propDict || contextDict;

  return (
    <section className="relative bg-white py-28 lg:py-40 overflow-hidden" id="lead-quality">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={dict?.provider_teaser?.badge || 'Lead Quality Tiers'}
          title="You always know what you’re walking into"
          subtitle="Every opportunity is scored before delivery. The tier tells you exactly how ready the buyer is."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(defaultTiers || []).map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.name} delay={i * 0.1}>
                <Card className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${t.cls}`}
                      >
                        <Icon size={20} />
                      </span>
                      <Badge variant="slate">{t.range}</Badge>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-slate-900">
                      {t.name} Tier
                    </h3>

                    {/* Animated Lead Score Progress Meter */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden my-3">
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
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* Driver Card */}
        <Reveal
          className="mx-auto mt-14 max-w-4xl rounded-3xl bg-slate-50/90 text-slate-900 p-8 md:p-12 shadow-lg border border-slate-200/80 relative overflow-hidden"
          delay={0.1}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-accent-secondary/5 blur-xl pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-xl font-serif font-normal text-slate-900 mb-2">What drives the score</h3>
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
