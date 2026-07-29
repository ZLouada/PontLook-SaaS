'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, m } from 'framer-motion';
import { Building2, CheckCircle2, Clock, Globe } from 'lucide-react';

const stats = [
  { icon: Building2, end: 500, suffix: '+', label: 'GCC companies monitored' },
  { icon: CheckCircle2, end: 92, suffix: '%', label: 'leads reach a meeting' },
  { icon: Clock, end: 14, suffix: ' Days', label: 'avg. match to intro' },
  { icon: Globe, end: 6, suffix: ' Markets', label: 'GCC countries covered' },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const celebrationRef = useRef<HTMLDivElement>(null);
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
    <span ref={ref} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tabular-nums tracking-tight font-poppins">
      <m.span>{rounded}</m.span>
      <span className="text-3xl sm:text-4xl text-primary ms-1">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white py-24 lg:py-32 border-t border-slate-200/60 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-blue-400/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

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
                whileHover={{ y: -5 }}
                className="flex flex-col items-start p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-xl shadow-slate-900/5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 transform-gpu will-change-transform"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary mb-6 border border-blue-100/80 shadow-xs">
                  <Icon size={24} />
                </div>
                <Counter end={s.end} suffix={s.suffix} />
                <p className="mt-3 text-sm font-semibold text-slate-600 font-sans tracking-wide leading-snug">
                  {s.label}
                </p>
              </m.div>
            );
          })}
        </div>
        
        <p className="mt-12 text-center text-xs font-semibold text-slate-400 tracking-wider uppercase">
          Verified GCC B2B intelligence & metrics
        </p>
      </div>
    </section>
  );
}
