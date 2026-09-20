'use client';

import React, { useEffect, useState } from 'react';
import { ThinkingOrb } from 'thinking-orbs';
import type { OrbState, OrbSize } from 'thinking-orbs';

interface OrbBadgeProps {
  state?: OrbState;
  size?: OrbSize;
  label?: string;
  speed?: number;
  className?: string;
  orbClassName?: string;
  style?: React.CSSProperties;
}

/**
 * SSR-safe, client-only wrapper for ThinkingOrb.
 * Ensures the HTML5 canvas only initializes after mounting, avoiding Next.js hydration mismatches.
 */
export default function OrbBadge({
  state = 'working',
  size = 20,
  label,
  speed = 1,
  className = '',
  orbClassName = '',
  style,
}: OrbBadgeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder box with matching dimensions to prevent layout shifts
    return (
      <div
        className={`inline-flex items-center gap-2 ${className}`}
        style={style}
        aria-hidden="true"
      >
        <span
          className="rounded-full bg-white/10 shrink-0 inline-block"
          style={{ width: size === 64 ? 56 : size, height: size === 64 ? 56 : size }}
        />
        {label && <span className="opacity-0">{label}</span>}
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2 ${className}`}
      style={style}
    >
      <div
        className={`shrink-0 flex items-center justify-center ${orbClassName}`}
        style={{ width: size === 64 ? 56 : size, height: size === 64 ? 56 : size }}
      >
        <ThinkingOrb
          state={state}
          size={size}
          theme="dark"
          speed={speed}
          style={{
            width: size === 64 ? 56 : size,
            height: size === 64 ? 56 : size,
          }}
        />
      </div>
      {label && <span className="font-sans leading-none">{label}</span>}
    </div>
  );
}

export { ThinkingOrb };
export type { OrbState, OrbSize };
