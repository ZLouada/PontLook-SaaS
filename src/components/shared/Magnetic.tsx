'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';

export interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  activeDistance?: number;
  disabled?: boolean;
}

export default function Magnetic({
  children,
  className = '',
  strength = 0.35,
  activeDistance = 60,
  disabled = false,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 25, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouchDevice || !ref.current) return;
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
    [disabled, isTouchDevice, strength, activeDistance, rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (disabled || isTouchDevice) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className={`inline-block transform-gpu will-change-transform ${className}`}
    >
      {children}
    </m.div>
  );
}
