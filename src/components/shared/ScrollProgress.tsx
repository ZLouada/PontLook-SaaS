'use client';

import { useState, useEffect } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';

function ActiveScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left rtl:origin-right bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] pointer-events-none"
    />
  );
}

/**
 * Reading-progress line pinned to the top of the viewport. One of the few places
 * the brand blue appears — it marks interaction, not decoration.
 *
 * Performance: Deferred to avoid forcing DOM layout reflows during critical initial hydration.
 */
export default function ScrollProgress() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const enable = () => setActive(true);
    if (window.scrollY > 0) {
      enable();
      return;
    }

    window.addEventListener('scroll', enable, { once: true, passive: true });
    const timer = typeof window.requestIdleCallback !== 'undefined'
      ? window.requestIdleCallback(enable, { timeout: 3000 })
      : setTimeout(enable, 1500);

    return () => {
      window.removeEventListener('scroll', enable);
      if (typeof window.cancelIdleCallback !== 'undefined') {
        window.cancelIdleCallback(timer as number);
      } else {
        clearTimeout(timer as NodeJS.Timeout);
      }
    };
  }, []);

  if (!active) return null;
  return <ActiveScrollProgress />;
}

