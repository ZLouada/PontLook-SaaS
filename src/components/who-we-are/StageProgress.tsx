'use client';

import React from 'react';
import { m } from 'framer-motion';

interface StageProgressProps {
  currentStage: number; // 0..3
  themeProgress: number; // 0 = dark, 1 = light
  onSelectStage: (stageIndex: number) => void;
  className?: string;
  isAr?: boolean;
}

const STAGES = [
  { id: 'hero', name: 'Hero', nameAr: 'البداية' },
  { id: 'callouts', name: 'Story & Callouts', nameAr: 'القصة والتوفيق' },
  { id: 'mission', name: 'Mission & Vision', nameAr: 'المهمة والرؤية' },
  { id: 'impact', name: 'Our Impact', nameAr: 'الأثر والنتائج' },
];

export default function StageProgress({
  currentStage,
  themeProgress,
  onSelectStage,
  className = '',
  isAr = false,
}: StageProgressProps) {
  const isDark = themeProgress < 0.5;

  return (
    <nav
      aria-label={isAr ? 'مؤشر مراحل العرض التفاعلي' : 'Scene navigation indicator'}
      className={`inline-flex items-center gap-2 p-1.5 rounded-full backdrop-blur-md transition-colors duration-300 ${
        isDark ? 'bg-black/40 border border-white/10' : 'bg-white/60 border border-slate-200/80 shadow-sm'
      } ${className}`}
    >
      {STAGES.map((stage, idx) => {
        const isActive = currentStage === idx;
        const stageName = isAr ? stage.nameAr : stage.name;

        return (
          <button
            key={stage.id}
            type="button"
            onClick={() => onSelectStage(idx)}
            aria-label={`${isAr ? 'الانتقال إلى' : 'Go to'} ${stageName}`}
            aria-current={isActive ? 'step' : undefined}
            className="group relative flex items-center justify-center p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D7BFF] rounded-full transition-all"
          >
            <m.div
              layout
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              style={{
                width: isActive ? 44 : 28,
                height: 4,
                borderRadius: 2,
              }}
              className={`transition-colors duration-300 ${
                isActive
                  ? isDark
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                    : 'bg-[#2451BF] shadow-[0_0_8px_rgba(36,81,191,0.4)]'
                  : isDark
                  ? 'bg-white/30 group-hover:bg-white/50'
                  : 'bg-slate-400/40 group-hover:bg-slate-600/60'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
