'use client';

import React from 'react';
import { m } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Sparkles, Building2, Target } from 'lucide-react';

interface ScoopMatchesCardProps {
  isAr?: boolean;
}

/**
 * Card 2: Vetted Supplier Comparison with Optical "Scoop" Viewfinder
 * Fanned-out 3D perspective cards with a central magnifying reticle inspecting the top match.
 */
export default function ScoopMatchesCard({ isAr = false }: ScoopMatchesCardProps) {
  return (
    <div className="relative w-full rounded-2xl bg-white border border-neutral-200/90 p-2.5 sm:p-3.5 xl:p-4 overflow-hidden font-sans shadow-xs">
      {/* Top HUD Matching Header */}
      <div className="relative z-10 flex items-center justify-between pb-1.5 mb-1.5 sm:pb-2 sm:mb-2 border-b border-neutral-200/70 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-700">
          <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 font-semibold tracking-wider tabular-nums">[ 02_MATCH ]</span>
          <span className="font-heading font-semibold text-[10.5px] sm:text-xs tracking-tight">
            {isAr ? 'فرز العروض وتحليل الملاءمة' : 'Vetted Proposal Intelligence'}
          </span>
        </div>
        <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider">
          <Sparkles size={10} className="text-emerald-600 shrink-0" />
          <span>{isAr ? '3 عروض مطابقة' : '3 Ranked Matches'}</span>
        </div>
      </div>

      {/* 3D Stage with Fanned Cards and Central Scoop */}
      <div className="relative z-10 h-32 xs:h-36 sm:h-40 lg:h-36 xl:h-44 w-full flex items-center justify-center my-0.5 perspective-[900px] overflow-visible">
        {/* LEFT / BACK CARD - Supplier 01 */}
        <div
          className={`absolute -start-1 sm:start-2 w-26 xs:w-28 sm:w-32 xl:w-38 p-1.5 sm:p-2 rounded-xl bg-white/90 border border-neutral-200/90 shadow-sm opacity-60 sm:opacity-70 transition-transform ${
            isAr ? 'rotate-[7deg]' : '-rotate-[7deg]'
          } scale-90 translate-y-1 pointer-events-none`}
        >
          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] text-neutral-500 mb-0.5 sm:mb-1">
            <span className="font-mono">#01 ACADEMY</span>
            <span className="font-semibold text-neutral-700">89%</span>
          </div>
          <div className="text-[9px] sm:text-[10px] xl:text-[10.5px] font-bold text-neutral-800 truncate mb-1">
            {isAr ? 'أكاديمية القيادة' : 'Leadership Inst.'}
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-3/4 bg-neutral-200 rounded-full" />
            <div className="h-1.5 w-1/2 bg-neutral-100 rounded-full" />
          </div>
          <div className="mt-1 pt-1 border-t border-neutral-100 flex items-center gap-1 text-[7.5px] sm:text-[8px] text-neutral-400">
            <Building2 size={9} />
            <span>{isAr ? 'الرياض' : 'Riyadh HQ'}</span>
          </div>
        </div>

        {/* RIGHT / BACK CARD - Supplier 03 */}
        <div
          className={`absolute -end-1 sm:end-2 w-26 xs:w-28 sm:w-32 xl:w-38 p-1.5 sm:p-2 rounded-xl bg-white/90 border border-neutral-200/90 shadow-sm opacity-60 sm:opacity-70 transition-transform ${
            isAr ? '-rotate-[7deg]' : 'rotate-[7deg]'
          } scale-90 translate-y-1 pointer-events-none`}
        >
          <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] text-neutral-500 mb-0.5 sm:mb-1">
            <span className="font-mono">#03 TECH GUILD</span>
            <span className="font-semibold text-neutral-700">86%</span>
          </div>
          <div className="text-[9px] sm:text-[10px] xl:text-[10.5px] font-bold text-neutral-800 truncate mb-1">
            {isAr ? 'معهد الابتكار التقني' : 'Gulf Digital Lab'}
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-2/3 bg-neutral-200 rounded-full" />
            <div className="h-1.5 w-4/5 bg-neutral-100 rounded-full" />
          </div>
          <div className="mt-1 pt-1 border-t border-neutral-100 flex items-center gap-1 text-[7.5px] sm:text-[8px] text-neutral-400">
            <Building2 size={9} />
            <span>{isAr ? 'دبي / هجين' : 'Dubai / Hybrid'}</span>
          </div>
        </div>

        {/* CENTER HERO CARD - Supplier 02 (Recommended Winner) */}
        <m.div
          initial={{ y: 8, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-20 w-38 xs:w-42 sm:w-46 xl:w-52 p-2 sm:p-2.5 xl:p-3 rounded-xl bg-gradient-to-br from-[#122A1E] to-[#0A1A12] text-white border border-emerald-500/40 shadow-[0_10px_28px_rgba(10,35,22,0.25)]"
        >
          {/* Top Tag & Match Score */}
          <div className="flex items-center justify-between gap-1 pb-1 mb-1 border-b border-white/10">
            <span className="font-mono inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[7.5px] sm:text-[8.5px] font-semibold uppercase tracking-wider border border-emerald-400/30">
              <Sparkles size={8} />
              {isAr ? 'العرض الأفضل ملاءمة' : 'Top Match'}
            </span>
            <div className="flex items-center gap-1 font-mono text-[9.5px] sm:text-[10.5px] xl:text-[11.5px] font-bold text-emerald-300 tabular-nums">
              <span>98%</span>
              <span className="text-[7px] sm:text-[7.5px] text-emerald-400/70 font-normal">FIT</span>
            </div>
          </div>

          {/* Supplier Name */}
          <div className="mb-1">
            <div className="font-heading text-[9.5px] sm:text-[10.5px] xl:text-[11px] font-semibold tracking-tight leading-tight text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate">{isAr ? 'المركز الخليجي للتميز المؤسسي' : 'GCC Institute for Excellence'}</span>
            </div>
            <div className="font-sans text-[8px] sm:text-[8.5px] text-emerald-200/70 leading-snug mt-0.5 truncate">
              {isAr ? 'مسار قيادي وتقني متكامل مخصص' : 'Custom Corporate Leadership Syllabus'}
            </div>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 gap-1 sm:gap-1.5 pt-1 border-t border-white/10 text-[7.5px] sm:text-[8px] xl:text-[8.5px]">
            <div className="flex items-center gap-1 text-neutral-200">
              <ShieldCheck size={9} className="text-emerald-400 shrink-0" />
              <span className="truncate">{isAr ? 'معتمد رؤية 2030' : 'Vision 2030'}</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-200">
              <CheckCircle2 size={9} className="text-emerald-400 shrink-0" />
              <span className="truncate">{isAr ? 'جاهزية فورية' : 'Immediate Q2'}</span>
            </div>
          </div>

          {/* Mini Progress Ratio */}
          <div className="mt-1 w-full bg-black/30 rounded-full h-1 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[98%] rounded-full" />
          </div>
        </m.div>

        {/* FLOATING "SCOOP" / RADAR VIEWFINDER OVERLAY - Pure glowing lens, no crosshair grid lines */}
        <m.div
          animate={{
            scale: [1, 1.03, 1],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute z-30 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 xs:w-32 xs:h-32 sm:w-38 sm:h-38 xl:w-46 xl:h-46 rounded-full border border-emerald-400/50 shadow-[0_0_16px_rgba(52,211,153,0.2)]"
        >
          {/* Glass glare line */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-emerald-300/10 pointer-events-none" />

          {/* Radar sweep line */}
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full origin-center pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(52, 211, 153, 0.16) 45deg, transparent 46deg)',
            }}
          />

          {/* Floating Scoop Tag */}
          <div className="absolute -top-1.5 -end-1 bg-white text-neutral-900 border border-emerald-300 px-1.5 sm:px-2 py-0.5 rounded-full shadow-md text-[7.5px] sm:text-[8.5px] font-bold flex items-center gap-1">
            <Target size={8} className="text-emerald-600" />
            <span>{isAr ? 'دقة التطابق 98%' : '98% Alignment'}</span>
          </div>
        </m.div>
      </div>

      {/* Bottom Status Guarantee */}
      <div className="relative z-10 pt-1.5 sm:pt-2 border-t border-neutral-200/70 flex items-center justify-center text-center">
        <span className="inline-flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] xl:text-[11px] font-semibold text-neutral-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>
            {isAr
              ? 'مقارنة فنية ومالية حيادية بين أفضل 3 مراكز معتمدة'
              : 'Impartial 3-Way Technical & Price Comparison'}
          </span>
        </span>
      </div>
    </div>
  );
}
