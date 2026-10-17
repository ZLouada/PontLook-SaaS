'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const DynamicHowItWorks = dynamic(() => import('./HowItWorks'), { ssr: false });

interface DeferredHowItWorksProps {
  fallback: React.ReactNode;
}

export default function DeferredHowItWorks({ fallback }: DeferredHowItWorksProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) return;
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={containerRef} data-nav-light="true" data-nav-theme="light">
      {inView ? <DynamicHowItWorks /> : fallback}
    </div>
  );
}
