import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight, Flame, Sun, ThermometerSun } from 'lucide-react';

const tiers = [
  { icon: Flame, name: 'Hot', range: '90–100', desc: 'Verified decision-maker, confirmed budget, starts within 30 days.', cls: 'bg-red-50 text-red-600' },
  { icon: ThermometerSun, name: 'Warm', range: '70–89', desc: 'Confirmed pain and authority; budget or timeline still forming.', cls: 'bg-amber-50 text-amber-600' },
  { icon: Sun, name: 'Qualified', range: '50–69', desc: 'Genuine need verified; earlier in the buying journey.', cls: 'bg-primary-50 text-primary' },
];

export default function ProviderTeaser() {
  return (
    <section className="bg-white py-24">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-400">
            For training providers
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            A predictable pipeline of enterprise opportunities
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Every lead is scored on decision-maker verification, company size, budget, timeline,
            and depth of need — so you always know exactly what you’re walking into.
          </p>
          <Link href="/for-providers" className="btn-primary mt-8">
            Explore the partnership <ArrowRight size={17} />
          </Link>
        </Reveal>
        <div className="space-y-4">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="card flex items-start gap-4 !p-6">
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${t.cls}`}>
                  <t.icon size={20} />
                </span>
                <div>
                  <p className="font-heading font-semibold text-ink">
                    {t.name} <span className="ml-1 text-sm font-medium text-slate-400">{t.range}</span>
                  </p>
                  <p className="mt-1 text-sm">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
