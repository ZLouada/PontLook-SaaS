'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { end: 500, suffix: '+', label: 'GCC companies monitored' },
  { end: 92, suffix: '%', label: 'leads reach a meeting' },
  { end: 14, suffix: ' days', label: 'avg. match to intro' },
  { end: 6, suffix: '', label: 'GCC countries covered' },
];

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref} className="font-heading text-5xl font-semibold text-foreground tabular-nums tracking-tight">
      {value}
      <span className="text-3xl text-primary ms-1">{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-white py-20 border-t border-border">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col ${i !== 0 ? 'lg:pl-8' : ''}`}>
              <Counter end={s.end} suffix={s.suffix} />
              <p className="mt-3 text-sm text-foreground-muted max-w-[200px]">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xs text-slate-400">
          Illustrative performance figures — updated as verified data becomes available.
        </p>
      </div>
    </section>
  );
}
