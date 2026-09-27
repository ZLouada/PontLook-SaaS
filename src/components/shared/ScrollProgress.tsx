'use client';

import { m, useScroll, useSpring } from 'framer-motion';

/**
 * Reading-progress line pinned to the top of the viewport. One of the few places
 * the brand blue appears — it marks interaction, not decoration.
 */
export default function ScrollProgress() {
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
