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
    <section className="relative bg-transparent text-white py-8 sm:py-10 border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-blue-600/10 blur-xl pointer-events-none" />

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
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 p-3.5 sm:p-4.5 rounded-2xl bg-slate-900/60 border border-white/10 shadow-xl hover:shadow-2xl hover:border-blue-500/40 backdrop-blur-xl transition-all duration-300 transform-gpu will-change-transform"
              >
                <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-[#4D7CFF] border border-blue-500/20">
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-white tracking-tight block">
                    {v.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400 block mt-0.5 font-normal leading-snug">
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
