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
      <div className="relative z-10 h-52 sm:h-60 w-full flex flex-col justify-center items-center my-1">
        {/* Horizontal Pipeline Track */}
        <div className="relative w-full max-w-sm sm:max-w-md flex items-center justify-between px-2 sm:px-6">
          {/* Connector Line Track (Background) */}
          <div className="absolute left-6 right-6 sm:left-10 sm:end-10 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#3B654D]/60 pointer-events-none z-0" />

          {/* Animated Energy Signal traveling across the line */}
          <m.div
            animate={{
              left: ['8%', '88%', '8%'],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 -translate-y-1/2 w-8 h-[3px] bg-gradient-to-r from-transparent via-emerald-600 to-transparent blur-[1px] pointer-events-none z-0"
          />

          {/* LEFT NODE: Enterprise / Company */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/90 border border-[#2B543D]/30 flex items-center justify-center shadow-sm text-[#204230] transition-transform hover:scale-105">
              <Building2 size={20} strokeWidth={1.75} />
            </div>
            {/* Small Conduit Anchor Dot */}
            <div className="mt-1.5 w-2 h-2 rounded-xs bg-[#244835]" />
            <span className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#244835] font-mono">
              {isAr ? 'المنشأة' : 'ENTERPRISE'}
            </span>
          </div>

          {/* CENTER NODE: PontLook Hub */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Pulsing Aura */}
            <div className="relative">
              <span className="animate-ping absolute inset-0 rounded-2xl bg-emerald-500/20 pointer-events-none" />
              <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-white border-2 border-[#2B543D] p-1.5 flex items-center justify-center shadow-[0_4px_16px_rgba(36,72,53,0.18)]">
                {/* Isometric Cube Shape Frame */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <Image
                    src="/images/brand/pontlook-icon-orange.png"
                    alt="PontLook"
                    width={26}
                    height={26}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            {/* Conduit Anchor Dot */}
            <div className="mt-1.5 w-2 h-2 rounded-xs bg-[#244835]" />
            <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold tracking-wider text-[#1E3E2D] font-mono lowercase">
              pontlook
            </span>
          </div>

          {/* RIGHT NODE: Vetted Provider */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/90 border border-[#2B543D]/30 flex items-center justify-center shadow-sm text-[#204230] transition-transform hover:scale-105">
              <GraduationCap size={20} strokeWidth={1.75} />
            </div>
            {/* Small Conduit Anchor Dot */}
            <div className="mt-1.5 w-2 h-2 rounded-xs bg-[#244835]" />
            <span className="mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#244835] font-mono">
              {isAr ? 'مركز التدريب' : 'PROVIDER'}
            </span>
          </div>
        </div>

        {/* FLOATING TILTED CONFIRMATION CARD (as in Pasted image 20261004150519.png) */}
        <m.div
          initial={{ opacity: 0, y: 12, rotate: isAr ? 2 : -2 }}
          animate={{ opacity: 1, y: 0, rotate: isAr ? 2 : -2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-20 mt-4 sm:mt-5 w-64 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl border border-[#C5D8C5] p-2.5 sm:p-3 shadow-[0_8px_24px_rgba(20,40,30,0.1)] flex items-center justify-between gap-2.5 transition-transform hover:rotate-0 hover:scale-[1.02]"
        >
          {/* Left Isometric Icon Box */}
          <div className="w-9 h-9 rounded-xl bg-[#EDF3ED] border border-[#CBDCCB] flex items-center justify-center text-[#244835] shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          {/* Center Text */}
          <div className="flex-1 min-w-0 text-start">
            <div className="text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider text-[#527963] font-mono">
              {isAr ? 'من التعاقد إلى تدشين التدريب' : 'FROM AGREEMENT TO KICKOFF'}
            </div>
            <div className="text-[10.5px] sm:text-[12px] font-bold text-neutral-900 leading-tight truncate">
              {isAr ? 'عقد مباشر بدون وسطاء أو عمولات' : 'To scheduled corporate training.'}
            </div>
          </div>

          {/* Right Green Check */}
          <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0">
            <Check size={13} strokeWidth={2.8} />
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
