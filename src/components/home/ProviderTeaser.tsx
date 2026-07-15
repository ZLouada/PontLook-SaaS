'use client';

import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight, Flame, Sun, ThermometerSun } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePathname } from 'next/navigation';

export default function ProviderTeaser() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';

  const tiers = [
    { icon: Flame, name: dict.provider_teaser.tiers.hot.name, range: '90–100', desc: dict.provider_teaser.tiers.hot.desc, cls: 'bg-red-50 text-red-600', borderCls: 'border-s-red-500' },
    { icon: ThermometerSun, name: dict.provider_teaser.tiers.warm.name, range: '70–89', desc: dict.provider_teaser.tiers.warm.desc, cls: 'bg-amber-50 text-amber-600', borderCls: 'border-s-amber-500' },
    { icon: Sun, name: dict.provider_teaser.tiers.qualified.name, range: '50–69', desc: dict.provider_teaser.tiers.qualified.desc, cls: 'bg-primary-50 text-primary', borderCls: 'border-s-primary' },
  ];

  return (
    <section className="bg-gradient-to-b from-background to-primary-50/50 py-24 relative overflow-hidden border-y border-border">
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 glow-primary opacity-50 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-secondary pointer-events-none" />
      <div className="container-site relative z-10 grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-medium tracking-wide text-primary uppercase mb-6">
            {dict.provider_teaser.badge}
          </span>
          <h2 className="text-4xl font-semibold sm:text-5xl text-foreground font-heading tracking-tight leading-[1.15]">
            {dict.provider_teaser.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground-muted">
            {dict.provider_teaser.subtitle}
          </p>
          <div className="mt-10 flex gap-4">
            <Link href={`/${lang}/for-providers`} className="btn bg-primary text-white hover:bg-primary-600">
              {dict.provider_teaser.btn} <ArrowRight size={17} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </Reveal>
        
        <div className="space-y-4">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className={`flex items-start gap-5 p-6 rounded-[20px] bg-white border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-s-4 ${t.borderCls} relative z-20`}>
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${t.cls}`}>
                  <t.icon size={22} />
                </span>
                <div>
                  <p className="font-heading font-semibold text-slate-900 flex items-baseline gap-2">
                    {t.name} <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Score {t.range}</span>
                  </p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
