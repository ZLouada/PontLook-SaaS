'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { useCoarsePointer, haptic } from '@/lib/useDevice';

export interface PressProps {
  children: React.ReactNode;
  className?: string;
  /** How far the element sinks under a finger. 1 = default 3% scale drop. */
  strength?: number;
  /** Fire a short vibration on press where the platform supports it. */
  vibrate?: boolean;
  disabled?: boolean;
}

const SPRING = { type: 'spring' as const, stiffness: 520, damping: 32, mass: 0.45 };

/**
 * Touch press feedback.
 *
 * Desktop gets magnetic pull, tilt and spotlight from hover; a phone has none of
 * those, so the only moment a card can respond to a finger is the press itself.
 * This gives that moment a real spring instead of a CSS `active:scale` step, and
 * renders as a plain `div` on fine pointers so it never competes with the
 * desktop transforms.
 */
export default function Press({
  children,
  className = '',
  strength = 1,
  vibrate = false,
  disabled = false,
}: PressProps) {
  const isCoarse = useCoarsePointer();
  const reduce = useReducedMotion();

  if (disabled || !isCoarse || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={`transform-gpu ${className}`}
      whileTap={{ scale: 1 - 0.03 * strength }}
      transition={SPRING}
      onTapStart={vibrate ? () => haptic(8) : undefined}
    >
      {children}
    </m.div>
  );
}
