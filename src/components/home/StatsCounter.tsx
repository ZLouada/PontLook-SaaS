'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, m, useReducedMotion } from 'framer-motion';
import { Building2, CheckCircle2, Clock, Globe } from 'lucide-react';
import Card from '@/components/shared/Card';
import { useDictionary } from '@/components/providers/DictionaryProvider';

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const propsInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  const count = useMotionValue(end);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (propsInView && !shouldReduceMotion) {
      count.set(0);
      const controls = animate(count, end, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
      });
      return () => controls.stop();
    }
  }, [propsInView, end, count, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tabular-nums tracking-[-0.03em] flex items-baseline"
    >
      <m.span>{rounded}</m.span>
      <span className="text-3xl sm:text-4xl text-accent ms-1 font-semibold">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  const dict = useDictionary();

  const stats = [
    { icon: Building2, end: dict.stats.companies.value, suffix: dict.stats.companies.suffix, label: dict.stats.companies.label },
    { icon: CheckCircle2, end: dict.stats.meetings.value, suffix: dict.stats.meetings.suffix, label: dict.stats.meetings.label },
    { icon: Clock, end: dict.stats.turnaround.value, suffix: dict.stats.turnaround.suffix, label: dict.stats.turnaround.label },
    { icon: Globe, end: dict.stats.markets.value, suffix: dict.stats.markets.suffix, label: dict.stats.markets.label },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-24 lg:py-36 border-t border-slate-200/60 overflow-hidden">
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-accent/[0.06] via-accent-secondary/[0.06] to-accent/[0.06] blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <m.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="transform-gpu will-change-transform"
              >
                <div className="h-full flex flex-col items-start p-6 sm:p-8 rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-apple hover:shadow-xl hover:border-accent/40 transition-all duration-300">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6 border border-accent/20">
                    <Icon size={22} />
                  </div>
                  <Counter end={s.end} suffix={s.suffix} />
                  <p className="mt-3 text-sm font-medium text-slate-600 tracking-normal leading-snug">
                    {s.label}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>

        <p className="mt-10 sm:mt-16 text-center text-xs font-mono font-medium text-slate-400 tracking-wider uppercase">
          {dict.stats.caption}
        </p>
      </div>
    </section>
  );
}
