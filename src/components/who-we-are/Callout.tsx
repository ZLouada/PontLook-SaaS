'use client';

import React from 'react';
import { m } from 'framer-motion';

export interface CalloutData {
  id: string;
  label: string;
  labelAr?: string;
  x: number; // percentage of stage (0 to 100)
  y: number; // percentage of stage (0 to 100)
  lineEndX: number; // relative line offset
  lineEndY: number; // relative line offset
  minBreakpoint?: 'mobile' | 'tablet' | 'desktop';
}

interface CalloutProps {
  callout: CalloutData;
  visible: boolean;
  delay?: number;
  isAr?: boolean;
}

export default function Callout({
  callout,
  visible,
  delay = 0,
  isAr = false,
}: CalloutProps) {
  const displayLabel = (isAr && callout.labelAr) ? callout.labelAr : callout.label;

  const visibilityClass =
    callout.minBreakpoint === 'desktop'
      ? 'hidden lg:block'
      : callout.minBreakpoint === 'tablet'
      ? 'hidden sm:block'
      : 'block';

  return (
    <div
      style={{ left: `${callout.x}%`, top: `${callout.y}%` }}
      className={`absolute z-30 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 ${visibilityClass}`}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
        transition={{ duration: 0.5, delay: delay }}
        className="relative flex items-center gap-2"
      >
        {/* Pulsing Marker Node */}
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#3D7BFF] opacity-40" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2451BF] ring-2 ring-white/90 shadow-sm" />
        </div>

        {/* Callout Label Pill */}
        <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#2451BF]/15 shadow-sm">
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.08em] text-[#334155] uppercase whitespace-nowrap">
            {displayLabel}
          </span>
        </div>
      </m.div>
    </div>
  );
}
