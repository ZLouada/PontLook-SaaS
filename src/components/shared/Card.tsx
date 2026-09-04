'use client';

import React from 'react';
import { m, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
  glow?: boolean;
  accentBorder?: boolean;
}

export default function Card({
  children,
  className = '',
  hoverLift = true,
  glow = false,
  accentBorder = false,
  ...props
}: CardProps) {
  return (
    <m.div
      whileHover={hoverLift ? { y: -5 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={`relative rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/70 shadow-sm transition-all duration-300 transform-gpu will-change-transform ${
        accentBorder
          ? 'border-blue-500/40 shadow-sm'
          : 'hover:border-slate-300 hover:shadow'
      } ${className}`}
      {...props}
    >
      {glow && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent/20 to-accent-secondary/20 blur-lg pointer-events-none -z-10" />
      )}
      {children}
    </m.div>
  );
}
