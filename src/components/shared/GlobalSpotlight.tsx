'use client';

import React, { useEffect, useRef, useState } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

export default function GlobalSpotlight() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  // Stable ref so the mousemove handler never needs to be re-registered when
  // visible state changes (which would cause listener churn on every mouse move)
  const visibleRef = useRef(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring interpolation for cursor trailing
  const springX = useSpring(mouseX, { damping: 25, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 180 });

  useEffect(() => {
    // Only mount on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // Read from ref — no state dependency, handler registered exactly once
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden transition-opacity duration-500 select-none"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden="true"
    >
      <m.div
        className="absolute -top-[300px] -left-[300px] h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          background:
            'radial-gradient(circle, rgba(255, 92, 0, 0.045) 0%, rgba(255, 255, 255, 0.02) 35%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
}
