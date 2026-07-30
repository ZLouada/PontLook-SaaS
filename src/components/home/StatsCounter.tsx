'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, m } from 'framer-motion';
import { Building2, CheckCircle2, Clock, Globe } from 'lucide-react';

const stats = [
  { icon: Building2, end: 500, suffix: '+', label: 'GCC companies monitored' },
  { icon: CheckCircle2, end: 92, suffix: '%', label: 'leads reach a meeting' },
  { icon: Clock, end: 14, suffix: ' Days', label: 'avg. match to intro' },
  { icon: Globe, end: 6, suffix: ' Countries', label: 'GCC markets covered' },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const propsInView = useInView(ref, { once: true, margin: '-40px' });

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (propsInView) {
      animate(count, end, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [propsInView, end, count]);

  return (
    <span ref={ref} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight font-poppins">
      <m.span>{rounded}</m.span>
      <span className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 ms-1">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative bg-white dark:bg-slate-950 py-20 lg:py-28 border-t border-b border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-blue-400/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-6 sm:px-8 lg:px-12">
        {/* HP-Style Grid Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60 dark:divide-slate-800/80 border-t border-b border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 rounded-3xl p-4 sm:p-8 backdrop-blur-md">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <m.div 
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className={`flex flex-col items-center sm:items-start p-6 text-center sm:text-left transition-all duration-300 transform-gpu will-change-transform ${
                  i !== 0 ? 'sm:ps-8 lg:ps-10' : ''
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-5 border border-blue-100 dark:border-blue-900/50 shadow-xs">
                  <Icon size={24} />
                </div>
                <Counter end={s.end} suffix={s.suffix} />
                <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-400 font-sans tracking-wide leading-snug">
                  {s.label}
                </p>
              </m.div>
            );
          })}
        </div>
        
        <p className="mt-8 text-center text-xs font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
          Verified GCC B2B intelligence & enterprise metrics
        </p>
      </div>
    </section>
  );
}
