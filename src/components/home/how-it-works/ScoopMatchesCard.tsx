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
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-neutral-50/90 via-white to-neutral-50/80 border border-neutral-200/80 p-3 sm:p-5 overflow-hidden font-sans shadow-inner">
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top HUD Matching Header */}
      <div className="relative z-10 flex items-center justify-between pb-2 mb-2 border-b border-neutral-200/70 text-xs">
        <div className="flex items-center gap-1.5 text-neutral-700">
          <span className="font-mono text-[10px] text-neutral-400 font-bold">[ 02_MATCH ]</span>
          <span className="font-semibold text-[11px] sm:text-xs">
            {isAr ? 'فرز العروض وتحليل الملاءمة' : 'Vetted Proposal Intelligence'}
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
          <Sparkles size={11} className="text-emerald-600 shrink-0" />
          <span>{isAr ? '3 عروض مطابقة' : '3 Ranked Matches'}</span>
        </div>
      </div>

      {/* 3D Stage with Fanned Cards and Central Scoop */}
      <div className="relative z-10 h-44 sm:h-48 w-full flex items-center justify-center my-0.5 perspective-[900px] overflow-visible">
        {/* LEFT / BACK CARD - Supplier 01 */}
        <div
          className={`absolute -start-1 sm:start-2 w-32 sm:w-38 p-2 rounded-xl bg-white/90 border border-neutral-200/90 shadow-sm opacity-60 sm:opacity-70 transition-transform ${
            isAr ? 'rotate-[7deg]' : '-rotate-[7deg]'
          } scale-90 translate-y-1 pointer-events-none`}
        >
          <div className="flex items-center justify-between text-[8.5px] text-neutral-500 mb-1">
            <span className="font-mono">#01 ACADEMY</span>
            <span className="font-semibold text-neutral-700">89%</span>
          </div>
          <div className="text-[9.5px] sm:text-[10.5px] font-bold text-neutral-800 truncate mb-1">
            {isAr ? 'أكاديمية القيادة' : 'Leadership Inst.'}
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-3/4 bg-neutral-200 rounded-full" />
            <div className="h-1.5 w-1/2 bg-neutral-100 rounded-full" />
          </div>
          <div className="mt-1.5 pt-1 border-t border-neutral-100 flex items-center gap-1 text-[8px] text-neutral-400">
            <Building2 size={9} />
            <span>{isAr ? 'الرياض' : 'Riyadh HQ'}</span>
          </div>
        </div>

        {/* RIGHT / BACK CARD - Supplier 03 */}
        <div
          className={`absolute -end-1 sm:end-2 w-32 sm:w-38 p-2 rounded-xl bg-white/90 border border-neutral-200/90 shadow-sm opacity-60 sm:opacity-70 transition-transform ${
            isAr ? '-rotate-[7deg]' : 'rotate-[7deg]'
          } scale-90 translate-y-1 pointer-events-none`}
        >
          <div className="flex items-center justify-between text-[8.5px] text-neutral-500 mb-1">
            <span className="font-mono">#03 TECH GUILD</span>
            <span className="font-semibold text-neutral-700">86%</span>
          </div>
          <div className="text-[9.5px] sm:text-[10.5px] font-bold text-neutral-800 truncate mb-1">
            {isAr ? 'معهد الابتكار التقني' : 'Gulf Digital Lab'}
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-2/3 bg-neutral-200 rounded-full" />
            <div className="h-1.5 w-4/5 bg-neutral-100 rounded-full" />
          </div>
          <div className="mt-1.5 pt-1 border-t border-neutral-100 flex items-center gap-1 text-[8px] text-neutral-400">
            <Building2 size={9} />
            <span>{isAr ? 'دبي / هجين' : 'Dubai / Hybrid'}</span>
          </div>
        </div>

        {/* CENTER HERO CARD - Supplier 02 (Recommended Winner) */}
        <m.div
          initial={{ y: 8, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-20 w-44 sm:w-52 p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-[#122A1E] to-[#0A1A12] text-white border border-emerald-500/40 shadow-[0_10px_28px_rgba(10,35,22,0.25)]"
        >
          {/* Top Tag & Match Score */}
          <div className="flex items-center justify-between gap-1 pb-1 mb-1.5 border-b border-white/10">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[8px] sm:text-[9px] font-bold border border-emerald-400/30">
              <Sparkles size={8} />
              {isAr ? 'العرض الأفضل ملاءمة' : 'Top Match'}
            </span>
            <div className="flex items-center gap-1 text-[10.5px] sm:text-[11.5px] font-black text-emerald-300 font-mono">
              <span>98%</span>
              <span className="text-[7.5px] text-emerald-400/70 font-normal">FIT</span>
            </div>
          </div>

          {/* Supplier Name */}
          <div className="mb-1.5">
            <div className="text-[10px] sm:text-[11px] font-bold leading-tight text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{isAr ? 'المركز الخليجي للتميز المؤسسي' : 'GCC Institute for Excellence'}</span>
            </div>
            <div className="text-[8.5px] text-emerald-200/70 leading-snug mt-0.5">
              {isAr ? 'مسار قيادي وتقني متكامل مخصص' : 'Custom Corporate Leadership Syllabus'}
            </div>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-white/10 text-[8px] sm:text-[8.5px]">
            <div className="flex items-center gap-1 text-neutral-200">
              <ShieldCheck size={10} className="text-emerald-400 shrink-0" />
              <span className="truncate">{isAr ? 'معتمد رؤية 2030' : 'Vision 2030'}</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-200">
              <CheckCircle2 size={10} className="text-emerald-400 shrink-0" />
              <span className="truncate">{isAr ? 'جاهزية فورية' : 'Immediate Q2'}</span>
            </div>
          </div>

          {/* Mini Progress Ratio */}
          <div className="mt-1.5 w-full bg-black/30 rounded-full h-1 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[98%] rounded-full" />
          </div>
        </m.div>

        {/* FLOATING "SCOOP" / RADAR VIEWFINDER OVERLAY - No backdrop-blur */}
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
          className="absolute z-30 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-emerald-400/50 shadow-[0_0_16px_rgba(52,211,153,0.25)]"
        >
          {/* Target Reticles (Crosshairs) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-2.5 bg-emerald-400" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-0.5 h-2.5 bg-emerald-400" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-emerald-400" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2.5 h-0.5 bg-emerald-400" />

          {/* Glass glare line */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-emerald-300/10 pointer-events-none" />

          {/* Radar sweep line */}
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full origin-center pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(52, 211, 153, 0.18) 45deg, transparent 46deg)',
            }}
          />

          {/* Floating Scoop Tag */}
          <div className="absolute -top-1.5 -end-1.5 bg-white text-neutral-900 border border-emerald-300 px-2 py-0.5 rounded-full shadow-md text-[8.5px] font-bold flex items-center gap-1">
            <Target size={9} className="text-emerald-600" />
            <span>{isAr ? 'دقة التطابق 98%' : '98% Alignment'}</span>
          </div>
        </m.div>
      </div>

      {/* Bottom Status Guarantee */}
      <div className="relative z-10 pt-2 border-t border-neutral-200/70 flex items-center justify-center text-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-600">
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
