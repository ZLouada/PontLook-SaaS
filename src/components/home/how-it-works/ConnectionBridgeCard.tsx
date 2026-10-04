'use client';

import React from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import { Building2, GraduationCap, Check } from 'lucide-react';

interface ConnectionBridgeCardProps {
  isAr?: boolean;
}

/**
 * Card 3: Direct Connection Bridge (Enterprise <-> PontLook Hub <-> Vetted Specialist)
 * Matches the layout, sage-green aesthetic, connected conduits, and floating contract card
 * from HIMILAYA.md (Pasted image 20261004150519.png).
 */
export default function ConnectionBridgeCard({ isAr = false }: ConnectionBridgeCardProps) {
  return (
    <div className="relative w-full rounded-2xl bg-[#EDF3ED] border border-[#D5E2D5] p-3 sm:p-5 overflow-hidden font-sans shadow-inner">
      {/* Precision Technical Grid Background (Sage/Mint) */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #B8CEB8 1px, transparent 1px),
            linear-gradient(to bottom, #B8CEB8 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Meta Header */}
      <div className="relative z-10 flex items-center justify-between pb-2 mb-2 border-b border-[#D5E2D5] text-xs">
        <div className="flex items-center gap-1.5 text-[#244835]">
          <span className="font-mono text-[10px] text-[#4A725D] font-bold">[ 03_CONNECTION ]</span>
          <span className="font-semibold text-[11px] sm:text-xs">
            {isAr ? 'الربط المباشر بين الطرفين' : 'DIRECT ENTERPRISE ENGAGEMENT'}
          </span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E0EBE0] border border-[#BED2BE] text-[#1E3E2D] text-[10px] font-semibold">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
          </span>
          <span>{isAr ? 'اتصال مباشر مؤكد' : 'Direct Link Active'}</span>
        </div>
      </div>

      {/* Center Horizontal Pipeline Diagram Stage */}
      <div className="relative z-10 h-44 sm:h-48 w-full flex flex-col justify-center items-center my-0.5">
        {/* Horizontal Pipeline Track */}
        <div className="relative w-full max-w-xs sm:max-w-sm flex items-center justify-between px-2 sm:px-4">
          {/* Connector Line Track (Background) */}
          <div className="absolute left-6 right-6 sm:left-8 sm:end-8 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#3B654D]/60 pointer-events-none z-0" />

          {/* Animated Energy Signal traveling across the line */}
          <m.div
            animate={{
              left: ['8%', '88%', '8%'],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 -translate-y-1/2 w-7 h-[2px] bg-gradient-to-r from-transparent via-emerald-600 to-transparent pointer-events-none z-0"
          />

          {/* LEFT NODE: Enterprise / Company */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-[#2B543D]/30 flex items-center justify-center shadow-sm text-[#204230] transition-transform hover:scale-105">
              <Building2 size={18} strokeWidth={1.75} />
            </div>
            {/* Small Conduit Anchor Dot */}
            <div className="mt-1 w-1.5 h-1.5 rounded-xs bg-[#244835]" />
            <span className="mt-0.5 text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider text-[#244835] font-mono">
              {isAr ? 'المنشأة' : 'ENTERPRISE'}
            </span>
          </div>

          {/* CENTER NODE: PontLook Hub */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Pulsing Aura */}
            <div className="relative">
              <span className="animate-ping absolute inset-0 rounded-2xl bg-emerald-500/20 pointer-events-none" />
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-[#2B543D] p-1 flex items-center justify-center shadow-[0_4px_16px_rgba(36,72,53,0.18)]">
                {/* Isometric Cube Shape Frame */}
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <Image
                    src="/images/brand/pontlook-icon-orange.png"
                    alt="PontLook"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            {/* Conduit Anchor Dot */}
            <div className="mt-1 w-1.5 h-1.5 rounded-xs bg-[#244835]" />
            <span className="mt-0.5 text-[8.5px] sm:text-[9.5px] font-extrabold tracking-wider text-[#1E3E2D] font-mono lowercase">
              pontlook
            </span>
          </div>

          {/* RIGHT NODE: Vetted Provider */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-[#2B543D]/30 flex items-center justify-center shadow-sm text-[#204230] transition-transform hover:scale-105">
              <GraduationCap size={18} strokeWidth={1.75} />
            </div>
            {/* Small Conduit Anchor Dot */}
            <div className="mt-1 w-1.5 h-1.5 rounded-xs bg-[#244835]" />
            <span className="mt-0.5 text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-wider text-[#244835] font-mono">
              {isAr ? 'مركز التدريب' : 'PROVIDER'}
            </span>
          </div>
        </div>

        {/* FLOATING TILTED CONFIRMATION CARD (as in Pasted image 20261004150519.png) */}
        <m.div
          initial={{ opacity: 0, y: 10, rotate: isAr ? 2 : -2 }}
          animate={{ opacity: 1, y: 0, rotate: isAr ? 2 : -2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-20 mt-3 sm:mt-4 w-60 sm:w-72 bg-white rounded-2xl border border-[#C5D8C5] p-2 sm:p-2.5 shadow-[0_6px_20px_rgba(20,40,30,0.1)] flex items-center justify-between gap-2 transition-transform hover:rotate-0 hover:scale-[1.02]"
        >
          {/* Left Isometric Icon Box */}
          <div className="w-8 h-8 rounded-xl bg-[#EDF3ED] border border-[#CBDCCB] flex items-center justify-center text-[#244835] shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          {/* Center Text */}
          <div className="flex-1 min-w-0 text-start">
            <div className="text-[7.5px] sm:text-[8px] font-bold uppercase tracking-wider text-[#527963] font-mono">
              {isAr ? 'من التعاقد إلى تدشين التدريب' : 'FROM AGREEMENT TO KICKOFF'}
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-neutral-900 leading-tight truncate">
              {isAr ? 'عقد مباشر بدون وسطاء أو عمولات' : 'To scheduled corporate training.'}
            </div>
          </div>

          {/* Right Green Check */}
          <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0">
            <Check size={11} strokeWidth={2.8} />
          </div>
        </m.div>
      </div>

      {/* Bottom Fulfillment Status (Matching reference image) */}
      <div className="relative z-10 pt-2 border-t border-[#D5E2D5] flex items-center justify-center text-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[#244835]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          <span>
            {isAr
              ? 'مجاني بالكامل للشركات · تعاقد وتسديد مباشر مع مركز التدريب'
              : '100% Free for Companies · Direct Billing with Certified Provider'}
          </span>
        </span>
      </div>
    </div>
  );
}
