'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, animate, m } from 'framer-motion';

const stats = [
  { end: 500, suffix: '+', label: 'GCC companies monitored' },
  { end: 92, suffix: '%', label: 'leads reach a meeting' },
  { end: 14, suffix: ' days', label: 'avg. match to intro' },
  { end: 6, suffix: '', label: 'GCC countries covered' },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      animate(count, end, {
        duration: 1.5,
        ease: 'easeOut',
      });
    }
  }, [inView, end, count]);

  return (
    <span ref={ref} className="font-heading text-6xl font-bold text-slate-900 tabular-nums tracking-tight">
      <m.span>{rounded}</m.span>
      <span className="text-4xl text-primary ms-1">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-white py-24 lg:py-32 border-t border-slate-200/50">
      <div className="container-site px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-10 lg:gap-8 lg:grid-cols-4 lg:divide-x lg:divide-slate-200/50">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center lg:items-start text-center lg:text-left ${i !== 0 ? 'lg:pl-10' : ''}`}>
              <Counter end={s.end} suffix={s.suffix} />
              <p className="mt-4 text-base sm:text-lg text-slate-500 font-medium max-w-[200px] leading-snug tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-center text-sm font-medium text-slate-400">
          Illustrative performance figures — updated as verified data becomes available.
        </p>
      </div>
    </section>
  );
}
