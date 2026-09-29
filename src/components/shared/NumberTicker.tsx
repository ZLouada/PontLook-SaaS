'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
  decimalPlaces?: number;
  prefix?: string;
  suffix?: string;
}

/**
 * NumberTicker animates numbers smoothly using spring physics when scrolled into view.
 */
export default function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className = '',
  decimalPlaces = 0,
  prefix = '',
  suffix = '',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (shouldReduceMotion) {
      if (ref.current) {
        ref.current.textContent = `${prefix}${value.toFixed(decimalPlaces)}${suffix}`;
      }
      return;
    }

    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, value, direction, motionValue, shouldReduceMotion, decimalPlaces, prefix, suffix]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimalPlaces)}${suffix}`;
      }
    });
  }, [springValue, decimalPlaces, prefix, suffix, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums tracking-normal ${className}`}
    >
      {prefix}{shouldReduceMotion ? value : (direction === 'down' ? value : 0)}{suffix}
    </span>
  );
}
