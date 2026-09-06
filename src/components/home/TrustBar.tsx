'use client';

import { ShieldCheck, Building2, Target, TrendingUp } from 'lucide-react';
import { m } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';

export default function TrustBar() {
  const dict = useDictionary();

  const values = [
    {
      icon: ShieldCheck,
      title: dict.trust_bar?.needs?.title || 'Verified Needs',
      desc: dict.trust_bar?.needs?.desc || 'Pre-qualified enterprise demand'
    },
    {
      icon: Building2,
      title: dict.trust_bar?.access?.title || 'Direct Access',
      desc: dict.trust_bar?.access?.desc || 'CHRO & L&D decision-makers'
    },
    {
      icon: Target,
      title: dict.trust_bar?.retainers?.title || 'Zero Retainers',
      desc: dict.trust_bar?.retainers?.desc || 'Pay per qualified opportunity'
    },
    {
      icon: TrendingUp,
      title: dict.trust_bar?.gcc?.title || 'GCC Focused',
      desc: dict.trust_bar?.gcc?.desc || 'Saudi Arabia, UAE & Gulf'
    },
  ];
  return (
    <section className="relative bg-slate-50/80 text-slate-800 py-8 sm:py-12 border-y border-slate-200/80 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent-secondary/5 to-accent/5 blur-xl pointer-events-none" />

      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <m.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 p-3.5 sm:p-4.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-apple hover:shadow-lg hover:border-accent/30 backdrop-blur-sm transition-all duration-300 transform-gpu will-change-transform"
              >
                <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-slate-900 tracking-tight block">
                    {v.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500 block mt-0.5 font-normal leading-snug">
                    {v.desc}
                  </span>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
