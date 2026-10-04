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
    <div className="container-site relative z-20 mx-auto px-2 xs:px-3 sm:px-6 lg:px-8 max-w-5xl w-full transition-transform duration-300 origin-center [@media(max-height:850px)_and_(min-width:1024px)]:scale-[0.92] [@media(max-height:760px)_and_(min-width:1024px)]:scale-[0.85] [@media(max-height:680px)_and_(min-width:1024px)]:scale-[0.78]">
      {/* ================================================================
          MASTER ECOMFLOW-INSPIRED COMPARISON CARD
          Fits entirely on one screen without inner scrolling
          ================================================================ */}
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-[#FAFAF7] shadow-xl p-3.5 sm:p-5 lg:p-6 relative overflow-hidden text-neutral-900">
        
        {/* Top Header Row (Ecomflow Style) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-neutral-200/80">
          <div>
            {/* Little dot + Eyebrow */}
            <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10.5px] font-semibold tracking-wider text-emerald-800 uppercase font-mono mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>{isAr ? 'طريقان. هدف واحد.' : 'TWO ROUTES. ONE DESTINATION.'}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-base sm:text-xl lg:text-2xl font-semibold text-neutral-900 font-heading tracking-tight leading-tight">
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

          <p className="text-[11px] sm:text-xs text-neutral-600 font-sans leading-relaxed max-w-sm sm:text-end">
            {isAr
              ? 'تشخيص فوري لاحتياج الكفاءات وربط مباشر مع مزودي تدريب معتمدين بميزانيات مؤكدة.'
              : 'Keep requirements aligned to verified budgets. Send each corporate mandate straight to vetted specialists.'}
          </p>
        </div>

        {/* ================================================================
            CARD 1: WITH PONTLOOK (Top Card - Mint / Sage Theme)
            ================================================================ */}
        <div className="rounded-xl sm:rounded-2xl border border-emerald-200/90 bg-[#EFF7ED] p-3 sm:p-4 lg:p-5 mb-2.5 sm:mb-3.5 relative overflow-hidden transition-all duration-300 hover:border-emerald-300 shadow-xs">
          
          {/* Card 1 Top Bar: Official PontLook Logo & Stat */}
          <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Official PontLook Logo Badge */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-950 flex items-center justify-center p-1.5 shadow-xs shrink-0 ring-1 ring-neutral-800">
                <Image
                  src="/images/brand/pontlook-icon-white.png"
                  alt="PontLook"
                  width={20}
                  height={20}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-neutral-950 font-heading block leading-tight">
                  {isAr ? 'مع بونت لوك' : 'With PontLook'}
                </span>
                <span className="text-[9px] sm:text-[11px] text-emerald-800 font-medium block">
                  {isAr ? 'منظومة المطابقة المباشرة' : 'Direct matchmaking protocol'}
                </span>
              </div>
            </div>

            {/* Big Stat Callout */}
            <div className="text-end shrink-0">
              <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium block leading-none">
                {isAr ? 'في المتوسط' : 'On average'}
              </span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-emerald-950 font-heading tracking-tight leading-none">
                  3–5
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-neutral-700">
                  {isAr ? 'أيام*' : 'days*'}
                </span>
              </div>
              <span className="text-[8px] sm:text-[9.5px] text-neutral-500 block leading-none mt-0.5">
                {isAr ? 'من الاحتياج إلى الاجتماع' : 'mandate to introduction'}
              </span>
            </div>
          </div>

          {/* Card 1 Pipeline Flow with FLASH LAMPS & CONNECTED BEAM */}
          <div className="relative my-2 sm:my-3 py-1">
            {/* Connecting Track with Pulsing Signal Beam & Flash Lamps (Desktop/Tablet) */}
            <div className="hidden sm:block absolute top-[20px] sm:top-[22px] left-12 right-12 h-[2px] -translate-y-1/2 bg-emerald-300/80 z-0">
              {/* Traveling light packet / laser signal beam */}
              <m.div
                animate={{ x: ['-10%', '110%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 w-24 h-[2px] bg-gradient-to-r from-transparent via-emerald-600 to-transparent shadow-[0_0_8px_#059669]"
              />

              {/* Flash Lamp 1: "is connected" (Between Step 1 & Step 2) */}
              <div className="absolute left-[25%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/95 border border-emerald-300 shadow-xs backdrop-blur-xs z-20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 shadow-[0_0_6px_#10B981]" />
                </span>
                <span className="text-[8px] font-mono font-bold text-emerald-900 tracking-wider whitespace-nowrap">
                  {isAr ? 'متصل' : 'is connected'}
                </span>
              </div>

              {/* Flash Lamp 2: "verified" (Between Step 2 & Step 3) */}
              <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/95 border border-emerald-300 shadow-xs backdrop-blur-xs z-20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 shadow-[0_0_6px_#10B981]" />
                </span>
                <span className="text-[8px] font-mono font-bold text-emerald-900 tracking-wider whitespace-nowrap">
                  {isAr ? 'معتمد' : 'verified'}
                </span>
              </div>

              {/* Flash Lamp 3: "matched" (Between Step 3 & Step 4) */}
              <div className="absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/95 border border-emerald-300 shadow-xs backdrop-blur-xs z-20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 shadow-[0_0_6px_#10B981]" />
                </span>
                <span className="text-[8px] font-mono font-bold text-emerald-900 tracking-wider whitespace-nowrap">
                  {isAr ? 'مطابق' : 'matched'}
                </span>
              </div>
            </div>

            {/* 4 Pipeline Nodes (Centered Ecomflow Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center bg-white/70 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-emerald-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs mb-1.5 relative z-10">
                  <Building2 size={17} />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-neutral-900 leading-tight">
                  {isAr ? 'المنشأة المستفيدة' : 'Your enterprise'}
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">
                  {isAr ? 'احتياج محدد وميزانية معتمدة' : 'Diagnosed skill gap & budget'}
                </span>
              </div>

              {/* Step 2 (Official PontLook Engine with Logo) */}
              <div className="flex flex-col items-center text-center bg-white/70 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-emerald-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-950 flex items-center justify-center p-2 shadow-md mb-1.5 border border-emerald-500/30 ring-2 ring-emerald-500/20 relative z-10">
                  <Image
                    src="/images/brand/pontlook-icon-white.png"
                    alt="PontLook Engine"
                    width={22}
                    height={22}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-neutral-950 leading-tight">
                  {isAr ? 'محرك PontLook' : 'PontLook Engine'}
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">
                  {isAr ? 'تشخيص الفجوة ومطابقة SLA' : 'Diagnose, vet & match'}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center bg-white/70 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-emerald-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs mb-1.5 relative z-10">
                  <Handshake size={17} />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-neutral-900 leading-tight">
                  {isAr ? 'تقديم مباشر وفوري' : 'Direct delivery'}
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">
                  {isAr ? 'اجتماع تنفيذي مع CHRO' : 'CHRO calendar access'}
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center bg-white/70 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-emerald-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs mb-1.5 relative z-10">
                  <BadgeCheck size={17} />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-neutral-900 leading-tight">
                  {isAr ? '2 إلى 3 خبراء فقط' : '2–3 Providers'}
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">
                  {isAr ? 'جاهزية فورية وضمان 5 أيام' : '5-day replacement SLA'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 1 Footer Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-emerald-200/80">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-neutral-800 font-medium">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>
                {isAr
                  ? 'منظومة مطابقة واحدة مؤكدة. ميزانيات معتمدة، وصفر رسائل باردة أو مناقصات عشوائية.'
                  : 'One verified alignment. Confirmed corporate budget, zero cold outreach, zero retainers.'}
              </span>
            </div>

            <Link
              href={`/${lang}/find-training`}
              className="inline-flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-semibold shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto"
            >
              <span>{isAr ? 'ابدأ المطابقة الآن' : 'Find your match'}</span>
              <ArrowRight size={12} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>

        {/* ================================================================
            CARD 2: THE TRADITIONAL WAY (Bottom Card - Sand / Stone Theme)
            ================================================================ */}
        <div className="rounded-xl sm:rounded-2xl border border-[#EBE3D7] bg-[#FAF7F0] p-3 sm:p-4 lg:p-4.5 mb-2 relative overflow-hidden transition-all duration-300 shadow-xs">
          
          {/* Card 2 Top Bar: Icon & Stat */}
          <div className="flex items-center justify-between gap-3 mb-2 sm:mb-2.5">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#EAE2D5] flex items-center justify-center text-neutral-600 shrink-0">
                <Users size={15} />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 font-heading block leading-tight">
                  {isAr ? 'الطريقة التقليدية' : 'The traditional way'}
                </span>
                <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium block">
                  {isAr ? 'إجراءات مطولة واحتكاك إداري' : 'Fragmented procurement'}
                </span>
              </div>
            </div>

            {/* Big Stat Callout */}
            <div className="text-end shrink-0">
              <span className="text-[9px] sm:text-[10px] text-neutral-500 font-medium block leading-none">
                {isAr ? 'يصل إلى' : 'Up to'}
              </span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-700 font-heading tracking-tight leading-none">
                  45
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-neutral-600">
                  {isAr ? 'يوماً' : 'days'}
                </span>
              </div>
              <span className="text-[8px] sm:text-[9.5px] text-neutral-500 block leading-none mt-0.5">
                {isAr ? 'تأخير وإرهاق إداري' : 'procurement friction'}
              </span>
            </div>
          </div>

          {/* Card 2 Pipeline Flow (5 Centered Steps with Dashed Line) */}
          <div className="relative my-2 sm:my-2.5 py-1">
            {/* Dashed Connecting Track (Desktop/Tablet) */}
            <div className="hidden sm:block absolute top-[18px] sm:top-[20px] left-10 right-10 h-[2px] -translate-y-1/2 border-t-2 border-dashed border-[#DDD4C5] z-0">
              {/* Friction Delay Marker */}
              <div className="absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#F2EDE2] border border-[#DDD4C5] shadow-xs z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[7.5px] font-mono font-bold text-neutral-600 tracking-wider whitespace-nowrap">
                  {isAr ? 'احتكاك وتأخير' : 'procurement lag'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1 relative z-10">
                  <FileText size={16} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 leading-tight">
                  {isAr ? 'موارد بشرية مرهقة' : 'Overwhelmed HR'}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'كتالوجات وملفات PDF' : 'Generic PDFs & course catalogs'}
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1 relative z-10">
                  <Mail size={16} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 leading-tight">
                  {isAr ? 'رسائل باردة مهدرة' : 'Cold spam outreach'}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'عروض عشوائية بدون ردود' : 'Hundreds of unread emails'}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1 relative z-10">
                  <XCircle size={16} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 leading-tight">
                  {isAr ? 'فرص غير موثوقة' : 'Dead-end leads'}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'غياب الميزانية والقرار' : 'No confirmed purchasing budget'}
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1 relative z-10">
                  <Clock size={16} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 leading-tight">
                  {isAr ? 'شهور من المفاوضات' : '4–8 weeks lost'}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'اجتماعات استكشافية ضائعة' : 'Endless vendor search calls'}
                </span>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center bg-white/60 sm:bg-transparent p-1.5 sm:p-0 rounded-lg sm:rounded-none border sm:border-0 border-[#EFE7D8]">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-1 relative z-10">
                  <Layers size={16} />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-neutral-800 leading-tight">
                  {isAr ? 'تدريب معلب وجاهز' : 'Off-the-shelf fit'}
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'فشل في تحقيق عائد حقيقي' : 'Fails to deliver actual ROI'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 Footer Row */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-600 font-medium pt-2 border-t border-[#E5DFD4]">
            <XCircle size={14} className="text-neutral-400 shrink-0" />
            <span>
              {isAr
                ? 'إجراءات معقدة وأسابيع مهدرة في البحث والمراسلات قبل العثور على أي خبير مؤهل.'
                : 'More handoffs. Weeks lost sifting generic course catalogs before any verified engagement.'}
            </span>
          </div>
        </div>

        {/* Bottom Footnote Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pt-2 text-[10px] text-neutral-500 font-sans">
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
            <ArrowRight size={11} className="rtl:-scale-x-100" />
          </Link>
        </div>

      </div>
    </div>
  );
}
