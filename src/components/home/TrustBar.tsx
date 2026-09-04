'use client';

import { ShieldCheck, Building2, Target, TrendingUp } from 'lucide-react';
import { m } from 'framer-motion';

const values = [
  { icon: ShieldCheck, title: 'Verified Needs', desc: 'Pre-qualified enterprise demand' },
  { icon: Building2, title: 'Direct Access', desc: 'CHRO & L&D decision-makers' },
  { icon: Target, title: 'Zero Retainers', desc: 'Pay per qualified opportunity' },
  { icon: TrendingUp, title: 'GCC Focused', desc: 'Saudi Arabia, UAE & Gulf' },
];

export default function TrustBar() {
  return (
    <section className="relative bg-slate-50/80 text-slate-800 py-12 border-y border-slate-200/80 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent-secondary/5 to-accent/5 blur-xl pointer-events-none" />

      <div className="container-site relative z-10 px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <m.div
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 p-4.5 rounded-2xl bg-white border border-slate-200/70 shadow-sm hover:border-slate-300 hover:shadow transition-all duration-300 transform-gpu will-change-transform"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent border border-accent/20">
                  <Icon size={22} />
                </div>
                <div>
                  <span className="font-sans font-semibold text-sm text-slate-800 tracking-normal block">
                    {v.title}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5 font-sans font-medium">
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
