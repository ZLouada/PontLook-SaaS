'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { dur, ease } from '@/lib/motion';

export type SignalTone = 'inherit' | 'emerald' | 'amber' | 'violet' | 'cyan' | 'white' | 'accent';

const TONE: Record<Exclude<SignalTone, 'inherit'>, string> = {
  emerald: '#34D399',
  amber: '#FBBF24',
  violet: '#A78BFA',
  cyan: '#22D3EE',
  white: '#FFFFFF',
  accent: '#4D7CFF',
};

function resolveTone(tone: SignalTone) {
  return tone === 'inherit' ? 'currentColor' : TONE[tone];
}

interface SignalProps {
  /** Box size in px. The core dot and rings scale from this. */
  size?: number;
  /** `inherit` (default) picks up the parent's text colour. */
  tone?: SignalTone;
  /** Multiplier on the pulse period. 1 = 2.6s. */
  speed?: number;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Live status indicator — a core dot with two rings expanding out of it on a
 * staggered loop. Pure CSS (keyframes live in globals.css), so it costs nothing
 * on the main thread and needs no mount gate.
 */
export function Signal({
  size = 20,
  tone = 'inherit',
  speed = 1,
  label,
  className = '',
  style,
}: SignalProps) {
  const vars = {
    '--signal-size': `${size}px`,
    '--signal-color': resolveTone(tone),
    '--signal-period': `${(2.6 / Math.max(speed, 0.25)).toFixed(2)}s`,
  } as React.CSSProperties;

  const dot = (
    <span className="signal" style={vars} aria-hidden="true">
      <span className="signal-ring" />
      <span className="signal-ring signal-ring--late" />
      <span className="signal-core" />
    </span>
  );

  if (!label) {
    return <span className={`inline-flex shrink-0 ${className}`} style={style}>{dot}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`} style={style}>
      {dot}
      <span className="font-sans leading-none">{label}</span>
    </span>
  );
}

interface SealProps {
  size?: number;
  tone?: SignalTone;
  label?: string;
  className?: string;
}

/**
 * Confirmation mark for submitted forms and completed steps — a ring that draws
 * itself, then a check that draws inside it. Under `prefers-reduced-motion` both
 * render already complete.
 */
export function Seal({ size = 56, tone = 'white', label, className = '' }: SealProps) {
  const reduce = useReducedMotion();
  const color = resolveTone(tone);

  const draw = (delay: number) =>
    reduce
      ? { pathLength: 1, opacity: 1, transition: { duration: 0.01 } }
      : { pathLength: 1, opacity: 1, transition: { duration: dur.slower, delay, ease: ease.out } };

  return (
    <span className={`inline-flex flex-col items-center gap-3 ${className}`}>
      <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        {/* soft halo, settles after the mark completes */}
        <m.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ background: `radial-gradient(circle, ${color}22 0%, transparent 70%)` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 0.55], scale: [0.7, 1.15, 1] }}
          transition={reduce ? { duration: 0.01 } : { duration: 1.4, delay: 0.5, ease: ease.out }}
        />

        <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true" className="relative">
          <circle cx="24" cy="24" r="21" stroke={color} strokeOpacity="0.14" strokeWidth="1.5" />
          <m.circle
            cx="24"
            cy="24"
            r="21"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            transform="rotate(-90 24 24)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(0.05)}
          />
          <m.path
            d="M15.5 24.5 L21.5 30.5 L33 19"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(0.55)}
          />
        </svg>
      </span>

      {label && (
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">{label}</span>
      )}
    </span>
  );
}

export default Signal;
