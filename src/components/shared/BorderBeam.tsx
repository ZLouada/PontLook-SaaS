'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * BorderBeam creates an animated laser glow that travels along the border perimeter
 * of its parent container. Parent must have `relative` positioning and overflow styling.
 */
export default function BorderBeam({
  className = '',
  size = 220,
  duration = 12,
  borderWidth = 1.5,
  anchor = 90,
  colorFrom = '#FF5C00',
  colorTo = '#4D7CFF',
  delay = 0,
}: BorderBeamProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      style={
        {
          '--size': size,
          '--duration': `${duration}s`,
          '--anchor': anchor,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute aspect-square w-[calc(var(--size)*1px)] animate-border-beam [animation-delay:var(--delay)] [animation-duration:var(--duration)] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] [offset-anchor:calc(var(--anchor)*1%)_50%] [offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]"
      />
    </div>
  );
}
