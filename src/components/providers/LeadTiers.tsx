import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import { Flame, ThermometerSun, Sun, RotateCcw } from 'lucide-react';

const tiers = [
  {
    icon: Flame,
    name: 'Hot',
    range: '90–100',
    cls: 'bg-red-50 text-red-600 ring-red-100',
    desc: 'Verified decision-maker, confirmed budget, defined scope, start date within 30 days. Ready for proposal.',
  },
  {
    icon: ThermometerSun,
    name: 'Warm',
    range: '70–89',
    cls: 'bg-amber-50 text-amber-600 ring-amber-100',
    desc: 'Pain and authority confirmed. Budget or timeline still being finalized internally.',
  },
  {
    icon: Sun,
    name: 'Qualified',
    range: '50–69',
    cls: 'bg-primary-50 text-primary ring-primary-100',
    desc: 'Genuine, verified need at an earlier stage of the buying journey. Ideal for relationship-building.',
  },
  {
    icon: RotateCcw,
    name: 'Follow-up',
    range: '<50',
    cls: 'bg-slate-100 text-slate-500 ring-slate-200',
    desc: 'Signal detected but not yet qualified. We keep nurturing — you are never charged for these.',
  },
];

const signals = [
  'Decision-maker identity and authority verified',
  'Company size and organizational maturity',
  'Budget disclosed and sanity-checked',
  'Timeline to start',
  'Number and severity of pain points',
  'Depth and specificity of the challenge description',
];

export default function LeadTiers() {
  return (
    <section className="bg-white py-24" id="lead-quality">
      <div className="container-site">
        <SectionHeading
          eyebrow="Lead quality tiers"
          title="You always know what you’re walking into"
          subtitle="Every opportunity is scored before delivery. The tier tells you exactly how ready the buyer is."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className="card h-full !p-6">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${t.cls}`}>
                  <t.icon size={20} />
                </span>
                <p className="mt-4 font-heading text-lg font-semibold text-ink">
                  {t.name} <span className="ml-1 text-sm font-medium text-slate-400">{t.range}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-12 max-w-3xl rounded-3xl bg-sky-gradient p-8 shadow-soft" delay={0.1}>
          <h3 className="text-lg">What drives the score</h3>
          <p className="mt-2 text-sm leading-relaxed">
            We don’t publish the exact point values — the philosophy is simple: the more a buyer has
            verified about their own readiness, the higher the score.
          </p>
          <ul className="mt-4 grid gap-2.5 text-sm sm:grid-cols-2">
            {signals.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
