'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

export interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  activeDistance?: number;
  disabled?: boolean;
}

/**
 * Wraps an element with a magnetic hover attraction effect.
 * On touch/coarse-pointer devices, renders a plain div with zero springs —
 * the springs were still computing in the background even when the early
 * return path was taken, because hooks can't be conditional.
 */
export default function Magnetic({
  children,
  className = '',
  strength = 0.35,
  activeDistance = 60,
  disabled = false,
}: MagneticProps) {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);

  useEffect(() => {
    setIsDesktopPointer(
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    );
  }, []);

  if (disabled || !isDesktopPointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MagneticDesktop
      className={className}
      strength={strength}
      activeDistance={activeDistance}
    >
      {children}
    </MagneticDesktop>
  );
}

/** Inner component that only mounts on desktop — springs only exist here. */
function MagneticDesktop({
  children,
  className,
  strength,
  activeDistance,
}: {
  children: React.ReactNode;
  className: string;
  strength: number;
  activeDistance: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 25, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < rect.width / 2 + activeDistance) {
        rawX.set(deltaX * strength);
        rawY.set(deltaY * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [strength, activeDistance, rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className={`transform-gpu will-change-transform ${className}`}
    >
      {children}
    </m.div>
  );
}
