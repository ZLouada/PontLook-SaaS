'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, m, useReducedMotion } from 'framer-motion';
import { Building2, CheckCircle2, Clock, Globe } from 'lucide-react';
import Card from '@/components/shared/Card';

const stats = [
  { icon: Building2, end: 500, suffix: '+', label: 'GCC companies monitored' },
  { icon: CheckCircle2, end: 92, suffix: '%', label: 'leads reach a meeting' },
  { icon: Clock, end: 14, suffix: ' Days', label: 'avg. match to intro' },
  { icon: Globe, end: 6, suffix: ' Markets', label: 'GCC countries covered' },
];

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
      className="font-mono text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-800 tabular-nums tracking-normal"
    >
      <m.span>{rounded}</m.span>
      <span className="text-3xl sm:text-4xl text-accent ms-1">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-28 lg:py-40 border-t border-slate-200/60 overflow-hidden">
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <m.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="transform-gpu will-change-transform"
              >
                <Card className="flex flex-col items-start p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent mb-6 border border-accent/20">
                    <Icon size={24} />
                  </div>
                  <Counter end={s.end} suffix={s.suffix} />
                  <p className="mt-3 text-sm font-medium text-slate-600 font-sans tracking-wide leading-snug">
                    {s.label}
                  </p>
                </Card>
              </m.div>
            );
          })}
        </div>

        <p className="mt-14 text-center text-xs font-mono font-medium text-slate-400 tracking-wider uppercase">
          Verified GCC B2B intelligence & metrics
        </p>
      </div>
    </section>
  );
}
