'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, m, useReducedMotion } from 'framer-motion';
import { Building2, CalendarCheck, Clock, Globe } from 'lucide-react';
import Card from '@/components/shared/Card';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import OrbBadge, { type OrbState } from '@/components/shared/OrbBadge';

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
      className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tabular-nums tracking-[-0.03em] font-heading flex items-baseline"
    >
      <m.span>{rounded}</m.span>
      <span className="text-2xl sm:text-4xl text-neutral-400 ms-1 font-normal">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  const dict = useDictionary();

  const stats: Array<{
    icon: any;
    orb: OrbState;
    end: number;
    suffix: string;
    label: string;
  }> = [
    { icon: Building2, orb: 'working', end: dict.stats.companies.value, suffix: dict.stats.companies.suffix, label: dict.stats.companies.label },
    { icon: CalendarCheck, orb: 'connecting', end: dict.stats.meetings.value, suffix: dict.stats.meetings.suffix, label: dict.stats.meetings.label },
    { icon: Clock, orb: 'solving', end: dict.stats.turnaround.value, suffix: dict.stats.turnaround.suffix, label: dict.stats.turnaround.label },
    { icon: Globe, orb: 'searching', end: dict.stats.markets.value, suffix: dict.stats.markets.suffix, label: dict.stats.markets.label },
  ];

  return (
    <section className="relative bg-[#08090A] py-12 sm:py-16 lg:py-20 border-t border-[#26282D] overflow-hidden">
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-white/[0.02] blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

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
                <div className="h-full flex flex-col items-start p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#26282D] bg-[#0F1013] hover:border-white/20 transition-all duration-300 shadow-2xl">
                  <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-white border border-white/10 shadow-sm">
                      <Icon size={20} strokeWidth={1.75} className="sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <div className="p-1.5 rounded-full bg-[#16171B] border border-[#26282D]">
                      <OrbBadge state={s.orb} size={20} />
                    </div>
                  </div>
                  <Counter end={s.end} suffix={s.suffix} />
                  <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm font-normal text-neutral-400 tracking-normal leading-snug">
                    {s.label}
                  </p>
                </div>
              </m.div>
            );
          })}
        </div>

        <p className="mt-10 sm:mt-16 text-center text-xs font-semibold text-neutral-500 tracking-wider uppercase">
          {dict.stats.caption}
        </p>
      </div>
    </section>
  );
}
