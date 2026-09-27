'use client';

import React from 'react';

type Props = {
  /** One entry per marquee item. Repeated three times internally. */
  items: React.ReactNode[];
  /** Seconds for one full cycle. */
  duration?: number;
  /** Reverse travel direction — pass `true` for RTL. */
  reverse?: boolean;
  /** Space between items, in px. Applied as margin so the loop stays seamless. */
  gap?: number;
  className?: string;
};

/**
 * Infinite horizontal marquee. Driven by a CSS keyframe rather than a JS
 * animation, so `animation-play-state` genuinely pauses it on hover and on
 * keyboard focus within the track.
 *
 * Each item carries its own trailing margin instead of the track using `gap`.
 * That makes every item exactly (width + gap) wide, so travelling one third of
 * the track lands precisely on the next copy and the seam never shows.
 */
export default function Marquee({
  items,
  duration = 32,
  reverse = false,
  gap = 20,
  className = '',
}: Props) {
  const sequence = [0, 1, 2];

  return (
    <div className={`marquee relative overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max items-stretch"
        style={
          {
            '--marquee-duration': `${duration}s`,
            animationDirection: reverse ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {sequence.map((copy) =>
          items.map((item, i) => (
            <div
              key={`${copy}-${i}`}
              className="shrink-0"
              style={{ marginInlineEnd: gap }}
              aria-hidden={copy > 0 ? true : undefined}
            >
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
