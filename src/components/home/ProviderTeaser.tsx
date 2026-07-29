'use client';

import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight, Flame, ShieldCheck, Target, TrendingUp, Award } from 'lucide-react';
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
      borderCls: 'border-s-rose-500' 
    },
    { 
      icon: TrendingUp, 
      name: dict.provider_teaser.tiers.warm.name, 
      range: '70–89', 
      pct: '80%',
      desc: dict.provider_teaser.tiers.warm.desc, 
      cls: 'bg-amber-50 text-amber-600 border-amber-200', 
      barColor: 'from-amber-500 to-orange-500',
      borderCls: 'border-s-amber-500' 
    },
    { 
      icon: ShieldCheck, 
      name: dict.provider_teaser.tiers.qualified.name, 
      range: '50–69', 
      pct: '60%',
      desc: dict.provider_teaser.tiers.qualified.desc, 
      cls: 'bg-blue-50 text-primary border-blue-200', 
      barColor: 'from-blue-600 to-indigo-600',
      borderCls: 'border-s-primary' 
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/70 to-white py-24 lg:py-32 overflow-hidden border-y border-slate-200/60">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 end-10 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-blue-400/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site relative z-10 grid items-center gap-14 lg:grid-cols-2 px-6 sm:px-8 lg:px-12">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase mb-6 shadow-xs">
            <Award size={14} className="me-1.5 text-primary" />
            {dict.provider_teaser.badge}
          </span>
          <h2 className="text-3xl font-extrabold sm:text-5xl text-slate-900 font-heading tracking-tight leading-[1.12] font-poppins">
            {dict.provider_teaser.headline}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 font-sans">
            {dict.provider_teaser.subtitle}
          </p>
          <div className="mt-10 flex gap-4">
            <Link href={`/${lang}/for-providers`}>
              <m.div 
                whileHover={{ y: -3, boxShadow: '0 15px 30px -10px rgba(36,81,191,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex items-center px-8 py-4 text-base font-semibold rounded-full shadow-md transform-gpu cursor-pointer"
              >
                {dict.provider_teaser.btn} 
                <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
              </m.div>
            </Link>
          </div>
        </Reveal>
        
        <div className="space-y-5">
          {tiers.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.name} delay={i * 0.12}>
                <m.div 
                  whileHover={{ y: -4 }}
                  className={`flex flex-col gap-3 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-900/5 hover:border-blue-500/40 hover:shadow-xl transition-all duration-300 border-s-4 ${t.borderCls} relative z-20 transform-gpu will-change-transform`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${t.cls}`}>
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="font-heading font-bold text-base text-slate-900 font-poppins">
                          {t.name} <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide ms-2">Score {t.range}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {t.pct} Match
                    </span>
                  </div>

                  {/* Animated Lead Score Progress Meter */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
                    <m.div 
                      initial={{ width: '0%' }}
                      whileInView={{ width: t.pct }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15 + 0.2 }}
                      className={`h-full bg-gradient-to-r ${t.barColor} rounded-full`}
                    />
                  </div>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600 font-sans">
                    {t.desc}
                  </p>
                </m.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
