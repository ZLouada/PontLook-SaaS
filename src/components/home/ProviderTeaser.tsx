'use client';

import Reveal from '@/components/shared/Reveal';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import { ArrowRight, Flame, ShieldCheck, TrendingUp, Award } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePathname } from 'next/navigation';
import { m } from 'framer-motion';

export default function ProviderTeaser() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';

  const tiers = [
    {
      icon: Flame,
      name: dict.provider_teaser.tiers.hot.name,
      range: '90–100',
      pct: '95%',
      desc: dict.provider_teaser.tiers.hot.desc,
      cls: 'bg-rose-50 text-rose-600 border-rose-200',
      barColor: 'from-rose-500 to-red-600',
      borderCls: 'border-s-rose-500',
    },
    {
      icon: TrendingUp,
      name: dict.provider_teaser.tiers.warm.name,
      range: '70–89',
      pct: '80%',
      desc: dict.provider_teaser.tiers.warm.desc,
      cls: 'bg-amber-50 text-amber-600 border-amber-200',
      barColor: 'from-amber-500 to-orange-500',
      borderCls: 'border-s-amber-500',
    },
    {
      icon: ShieldCheck,
      name: dict.provider_teaser.tiers.qualified.name,
      range: '50–69',
      pct: '60%',
      desc: dict.provider_teaser.tiers.qualified.desc,
      cls: 'bg-accent/10 text-accent border-accent/20',
      barColor: 'from-accent to-accent-secondary',
      borderCls: 'border-s-accent',
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/70 to-white py-28 lg:py-40 overflow-hidden border-y border-slate-200/60">
      <div className="absolute top-1/2 end-10 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site relative z-10 grid items-center gap-14 lg:grid-cols-2 px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mb-6 inline-block">
            <Badge variant="accent" icon={<Award size={14} className="text-accent" />}>
              {dict.provider_teaser.badge}
            </Badge>
          </div>
          <h2 className="text-3xl font-heading font-semibold sm:text-5xl text-slate-800 tracking-tight leading-[1.12]">
            {dict.provider_teaser.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 font-sans">
            {dict.provider_teaser.subtitle}
          </p>
          <div className="mt-10 flex gap-4">
            <Button
              href={`/${lang}/for-providers`}
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
            >
              {dict.provider_teaser.btn}
            </Button>
          </div>
        </Reveal>

        <div className="space-y-5">
          {tiers.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.name} delay={i * 0.12}>
                <m.div
                  whileHover={{ y: -4 }}
                  className={`flex flex-col gap-3 p-6 rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:border-slate-300 hover:shadow transition-all duration-300 border-s-4 ${t.borderCls} relative z-20 transform-gpu will-change-transform`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${t.cls}`}
                      >
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="font-heading font-semibold text-lg text-slate-800 flex items-center gap-2">
                          <span>{t.name}</span>
                          <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wide">
                            Score {t.range}
                          </span>
                        </p>
                      </div>
                    </div>
                    <Badge variant="slate">{t.pct} Match</Badge>
                  </div>

                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
                    <m.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: t.pct }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15 + 0.2 }}
                      className={`h-full bg-gradient-to-r ${t.barColor} rounded-full`}
                    />
                  </div>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600 font-sans">{t.desc}</p>
                </m.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
