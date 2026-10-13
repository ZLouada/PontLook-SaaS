'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const DynamicWhyDifferent = dynamic(() => import('./WhyDifferent'), { ssr: false });

interface DeferredWhyDifferentProps {
  fallback: React.ReactNode;
}

export default function DeferredWhyDifferent({ fallback }: DeferredWhyDifferentProps) {
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
    <div ref={containerRef}>
      {inView ? <DynamicWhyDifferent /> : fallback}
    </div>
  );
}
