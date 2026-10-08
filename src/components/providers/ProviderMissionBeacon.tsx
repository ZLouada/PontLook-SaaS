'use client';

import React, { useState, useEffect } from 'react';

interface ProviderMissionBeaconProps {
  isAr?: boolean;
}

export default function ProviderMissionBeacon({ isAr = false }: ProviderMissionBeaconProps) {
  const [timeStr, setTimeStr] = useState<string>('00:00:00 UTC+3');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in UTC+3 (Riyadh / Gulf standard time)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Riyadh',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTimeStr(`${formatted} AST (UTC+3)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border-b border-white/10 bg-[#07090E]/95 backdrop-blur-md text-slate-300 font-mono text-[11px] sm:text-xs">
      <div className="container-site max-w-7xl mx-auto py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Status indicator */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isAr ? 'النظام: نشط ومتحقق' : 'SYSTEM: OPERATIONAL'}</span>
          </div>

          <span className="hidden md:inline-block text-slate-500">|</span>

          <span className="hidden md:inline-block text-slate-400">
            {isAr ? 'بروتوكول الربط: BANT_RESOLVE_V4.2' : 'PROTOCOL: BANT_RESOLVE_V4.2'}
          </span>

          <span className="hidden lg:inline-block text-slate-500">|</span>

          <span className="hidden lg:inline-block text-sky-400 font-medium">
            {isAr ? 'مخصصات الموارد البشرية: هدف والنيطاقات نشطة' : 'SIGNALS: HRDF / NITAQAT / SAMA LIVE'}
          </span>
        </div>

        {/* Real-time Clock & Terminal Trigger */}
        <div className="flex items-center gap-3 ms-auto">
          <div className="text-slate-400 hidden sm:inline-flex items-center gap-1.5">
            <span className="text-slate-500">REGION:</span>
            <span className="text-slate-200">{timeStr}</span>
          </div>

          <a
            href="#intake-terminal"
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-sky-500/20 text-sky-300 border border-white/15 hover:border-sky-400/50 transition-colors text-[11px]"
          >
            <span>[</span>
            <span className="font-semibold">{isAr ? 'بوابة التسجيل' : 'ACCESS TERMINAL'}</span>
            <span>]</span>
          </a>
        </div>
      </div>
    </div>
  );
}
