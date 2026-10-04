'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  XCircle,
  Building2,
  Handshake,
  BadgeCheck,
  ArrowRight,
  Users,
  Mail,
  FileText,
  Clock,
  Layers,
} from '@/components/icons';
import { m } from 'framer-motion';

interface ComparisonToggleContentProps {
  lang?: 'en' | 'ar';
}

export default function ComparisonToggleContent({ lang = 'en' }: ComparisonToggleContentProps) {
  const isAr = lang === 'ar';

  return (
    <div className="relative z-20 mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-[96vw] 2xl:max-w-[1440px]">
      {/* ================================================================
          MASTER ECOMFLOW-INSPIRED COMPARISON CARD
          Spans full width like Ecomflow with generous, comfortable spacing
          ================================================================ */}
      <div className="rounded-3xl border border-neutral-200/90 bg-[#FAFAF7] shadow-xl p-5 sm:p-7 lg:p-9 relative overflow-hidden text-neutral-900">
        
        {/* Top Header Row (Ecomflow Style) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-neutral-200/80">
          <div>
            {/* Little dot + Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wider text-emerald-800 uppercase font-mono mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{isAr ? 'طريقان. هدف واحد.' : 'TWO ROUTES. ONE DESTINATION.'}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-neutral-900 font-heading tracking-tight leading-tight">
              {isAr ? (
                <>
                  نفس نقطة البداية.{' '}
                  <span className="text-neutral-500 font-normal">طريق مختلف وأكثر سرعة نحو الهدف.</span>
                </>
              ) : (
                <>
                  Same starting point.{' '}
                  <span className="text-neutral-500 font-normal">A different way forward.</span>
                </>
              )}
            </h2>
          </div>
        </div>

        {/* ================================================================
            CARD 1: WITH PONTLOOK (Top Card - Mint / Sage Theme)
            ================================================================ */}
        <div className="rounded-2xl sm:rounded-3xl border border-emerald-200/90 bg-[#EFF7ED] p-4 sm:p-6 lg:p-7 mb-3.5 sm:mb-5 relative overflow-hidden transition-all duration-300 hover:border-emerald-300 shadow-xs">
          
          {/* Card 1 Top Bar: Official PontLook Logo & Stat */}
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Official PontLook Logo Badge */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-950 flex items-center justify-center p-2 shadow-xs shrink-0 ring-1 ring-neutral-800">
                <Image
                  src="/images/brand/pontlook-icon-white.png"
                  alt="PontLook"
                  width={22}
                  height={22}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
              <div>
                <span className="text-sm sm:text-base lg:text-lg font-bold text-neutral-950 font-heading block leading-tight">
                  {isAr ? 'مع بونت لوك' : 'With PontLook'}
                </span>
                <span className="text-xs sm:text-sm text-emerald-800 font-medium block">
                  {isAr ? 'منظومة المطابقة المباشرة' : 'Direct matchmaking protocol'}
                </span>
              </div>
            </div>

            {/* Big Stat Callout */}
            <div className="text-end shrink-0">
              <span className="text-[10px] sm:text-xs text-neutral-500 font-medium block leading-none">
                {isAr ? 'في المتوسط' : 'On average'}
              </span>
              <div className="flex items-baseline justify-end gap-1 my-0.5">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950 font-heading tracking-tight leading-none">
                  3–5
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                  {isAr ? 'أيام*' : 'days*'}
                </span>
              </div>
              <span className="text-[9px] sm:text-xs text-neutral-500 block leading-none">
                {isAr ? 'من الاحتياج إلى الاجتماع' : 'mandate to introduction'}
              </span>
            </div>
          </div>

          {/* Card 1 Pipeline Flow: White Track Line with Green Flash Light */}
          <div className="relative my-3 sm:my-5 py-2">
            {/* White Connecting Track (From center of col 1 to center of col 4: left 12.5% to right 12.5%) */}
            <div className="hidden sm:block absolute top-[24px] sm:top-[28px] lg:top-[30px] left-[12.5%] right-[12.5%] h-[2.5px] -translate-y-1/2 bg-white rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.06)] z-0 overflow-visible">
              
              {/* Green Flash Light: Traveling laser energy pulse along the white line */}
              <m.div
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-[1.5px] h-[5.5px] w-44 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_14px_#10B981,0_0_22px_#059669] rounded-full pointer-events-none"
              />

              {/* Flash Lamp 1: "is connected" (Between Step 1 & Step 2, at 1/6 of road = ~16.7%) */}
              <div className="absolute left-[16.7%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.25)] z-20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold text-emerald-900 tracking-wider whitespace-nowrap">
                  {isAr ? 'متصل' : 'is connected'}
                </span>
              </div>

              {/* Flash Lamp 2: "verified" (Between Step 2 & Step 3, at midpoint of road = 50%) */}
              <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.25)] z-20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold text-emerald-900 tracking-wider whitespace-nowrap">
                  {isAr ? 'معتمد' : 'verified'}
                </span>
              </div>

              {/* Flash Lamp 3: "matched" (Between Step 3 & Step 4, at 5/6 of road = ~83.3%) */}
              <div className="absolute left-[83.3%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.25)] z-20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-mono font-bold text-emerald-900 tracking-wider whitespace-nowrap">
                  {isAr ? 'مطابق' : 'matched'}
                </span>
              </div>
            </div>

            {/* 4 Pipeline Nodes (Centered Ecomflow Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-emerald-100">
                <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs mb-2 relative z-10">
                  <Building2 size={20} />
                </div>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-neutral-900 leading-tight">
                  {isAr ? 'المنشأة المستفيدة' : 'Your enterprise'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-600 leading-tight mt-1">
                  {isAr ? 'احتياج محدد وميزانية معتمدة' : 'Diagnosed skill gap & budget'}
                </span>
              </div>

              {/* Step 2 (Official PontLook Engine with Logo) */}
              <div className="flex flex-col items-center text-center bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-emerald-100">
                <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl bg-neutral-950 flex items-center justify-center p-2.5 shadow-md mb-2 border border-emerald-500/40 ring-4 ring-emerald-500/20 relative z-10">
                  <Image
                    src="/images/brand/pontlook-icon-white.png"
                    alt="PontLook Engine"
                    width={26}
                    height={26}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-neutral-950 leading-tight">
                  {isAr ? 'محرك PontLook' : 'PontLook Engine'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-600 leading-tight mt-1">
                  {isAr ? 'تشخيص الفجوة ومطابقة SLA' : 'Diagnose, vet & match'}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-emerald-100">
                <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm mb-2 relative z-10 ring-2 ring-emerald-500/20">
                  <Handshake size={20} />
                </div>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-neutral-900 leading-tight">
                  {isAr ? 'تقديم مباشر وفوري' : 'Direct delivery'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-600 leading-tight mt-1">
                  {isAr ? 'اجتماع تنفيذي مع CHRO' : 'CHRO calendar access'}
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center bg-white/70 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-emerald-100">
                <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-2xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm mb-2 relative z-10 ring-2 ring-emerald-500/20">
                  <BadgeCheck size={20} />
                </div>
                <span className="text-xs sm:text-sm lg:text-base font-bold text-neutral-900 leading-tight">
                  {isAr ? '2 إلى 3 خبراء فقط' : '2–3 Providers'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-600 leading-tight mt-1">
                  {isAr ? 'جاهزية فورية وضمان 5 أيام' : '5-day replacement SLA'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 1 Action Button Row (Fixed & Spacious) */}
          <div className="flex items-center justify-end pt-3 sm:pt-4 border-t border-emerald-200/80">
            <Link
              href={`/${lang}/find-training`}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 group shrink-0"
            >
              <span>{isAr ? 'ابدأ المطابقة الآن' : 'Find your match'}</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform rtl:-scale-x-100" />
            </Link>
          </div>
        </div>

        {/* ================================================================
            CARD 2: THE TRADITIONAL WAY (Bottom Card - Sand / Stone Theme)
            ================================================================ */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#EBE3D7] bg-[#FAF7F0] p-4 sm:p-6 lg:p-7 mb-3 relative overflow-hidden transition-all duration-300 shadow-xs">
          
          {/* Card 2 Top Bar: Icon & Stat */}
          <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EAE2D5] flex items-center justify-center text-neutral-600 shrink-0">
                <Users size={17} />
              </div>
              <div>
                <span className="text-sm sm:text-base lg:text-lg font-bold text-neutral-800 font-heading block leading-tight">
                  {isAr ? 'الطريقة التقليدية' : 'The traditional way'}
                </span>
                <span className="text-xs sm:text-sm text-neutral-500 font-medium block">
                  {isAr ? 'إجراءات مطولة واحتكاك إداري' : 'Fragmented procurement'}
                </span>
              </div>
            </div>

            {/* Big Stat Callout */}
            <div className="text-end shrink-0">
              <span className="text-[10px] sm:text-xs text-neutral-500 font-medium block leading-none">
                {isAr ? 'يصل إلى' : 'Up to'}
              </span>
              <div className="flex items-baseline justify-end gap-1 my-0.5">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-700 font-heading tracking-tight leading-none">
                  45
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-600">
                  {isAr ? 'يوماً' : 'days'}
                </span>
              </div>
              <span className="text-[9px] sm:text-xs text-neutral-500 block leading-none">
                {isAr ? 'تأخير وإرهاق إداري' : 'procurement friction'}
              </span>
            </div>
          </div>

          {/* Card 2 Pipeline Flow (5 Centered Steps with Dashed Line) */}
          <div className="relative my-3 sm:my-4 py-2">
            {/* Dashed Connecting Track (Desktop/Tablet) */}
            <div className="hidden sm:block absolute top-[20px] sm:top-[22px] lg:top-[24px] left-[10%] right-[10%] h-[2px] -translate-y-1/2 border-t-2 border-dashed border-[#DDD4C5] z-0">
              {/* Friction Delay Marker */}
              <div className="absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F2EDE2] border border-[#DDD4C5] shadow-xs z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[8px] sm:text-[9px] font-mono font-bold text-neutral-600 tracking-wider whitespace-nowrap">
                  {isAr ? 'احتكاك وتأخير' : 'procurement lag'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-2 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1.5 relative z-10">
                  <FileText size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'موارد بشرية مرهقة' : 'Overwhelmed HR'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-1">
                  {isAr ? 'كتالوجات وملفات PDF' : 'Generic PDFs & course catalogs'}
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-2 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1.5 relative z-10">
                  <Mail size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'رسائل باردة مهدرة' : 'Cold spam outreach'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-1">
                  {isAr ? 'عروض عشوائية بدون ردود' : 'Hundreds of unread emails'}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-2 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1.5 relative z-10">
                  <XCircle size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'فرص غير موثوقة' : 'Dead-end leads'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-1">
                  {isAr ? 'غياب الميزانية والقرار' : 'No confirmed purchasing budget'}
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-2 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1.5 relative z-10">
                  <Clock size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'شهور من المفاوضات' : '4–8 weeks lost'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-1">
                  {isAr ? 'اجتماعات استكشافية ضائعة' : 'Endless vendor search calls'}
                </span>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-2 sm:p-0 rounded-xl sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1.5 relative z-10">
                  <Layers size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'تدريب معلب وجاهز' : 'Off-the-shelf fit'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-1">
                  {isAr ? 'فشل في تحقيق عائد حقيقي' : 'Fails to deliver actual ROI'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footnote Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2.5 text-xs sm:text-sm text-neutral-500 font-sans">
          <span>
            {isAr
              ? '* 3 إلى 5 أيام هو متوسط الفترة الزمنية من تحديد الاحتياج المؤسسي إلى الاجتماع المباشر مع الخبراء.'
              : '* 3–5 days is the average timeframe from corporate mandate to executive introduction with PontLook.'}
          </span>

          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-1 font-semibold text-neutral-700 hover:text-neutral-950 transition-colors self-start sm:self-auto"
          >
            <span>{isAr ? 'احجز جلسة استكشافية' : 'Book a discovery call'}</span>
            <ArrowRight size={13} className="rtl:-scale-x-100" />
          </Link>
        </div>

      </div>
    </div>
  );
}
