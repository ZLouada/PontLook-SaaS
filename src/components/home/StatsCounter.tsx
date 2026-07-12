'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { end: 500, suffix: '+', label: 'GCC companies monitored for demand signals' },
  { end: 92, suffix: '%', label: 'of delivered leads reach a first meeting' },
  { end: 14, suffix: ' days', label: 'average time from match to introduction' },
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
    <span ref={ref} className="font-heading text-4xl font-bold text-white tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-cta-gradient py-20">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <Counter end={s.end} suffix={s.suffix} />
              <p className="mt-2 text-sm text-primary-100">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-primary-200">
          Illustrative performance figures — updated as verified data becomes available.
        </p>
      </div>
    </section>
  );
}
