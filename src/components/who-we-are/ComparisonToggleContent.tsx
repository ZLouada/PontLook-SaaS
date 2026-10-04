'use client';

import React from 'react';
import Link from 'next/link';
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
import Signal from '@/components/shared/Signal';

interface ComparisonToggleContentProps {
  lang?: 'en' | 'ar';
}

export default function ComparisonToggleContent({ lang = 'en' }: ComparisonToggleContentProps) {
  const isAr = lang === 'ar';

  return (
    <div className="container-site relative z-20 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
      {/* ================================================================
          MASTER ECOMFLOW-INSPIRED CARD
          Two routes, one destination: Side-by-side / stacked comparison
          ================================================================ */}
      <div className="rounded-3xl border border-neutral-200/90 bg-[#FAFAF7] shadow-xl p-5 sm:p-7 lg:p-9 relative overflow-hidden text-neutral-900">
        
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-neutral-200/80">
          <div>
            {/* Little dot + Eyebrow */}
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-wider text-emerald-800 uppercase font-mono mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>{isAr ? 'طريقان. هدف واحد.' : 'TWO ROUTES. ONE DESTINATION.'}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-900 font-heading tracking-tight leading-[1.2]">
              {isAr ? (
                <>
                  نفس نقطة البداية.<br />
                  طريق مختلف وأكثر سرعة نحو الهدف.
                </>
              ) : (
                <>
                  Same starting point.<br />
                  A different way forward.
                </>
              )}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed max-w-md lg:text-end">
            {isAr
              ? 'تشخيص فوري لفجوة المهارات وربط مباشر مع 2 إلى 3 مزودي تدريب معتمدين بميزانيات مؤكدة.'
              : 'Keep requirements aligned to verified enterprise budgets. Send each corporate mandate straight to pre-vetted specialists.'}
          </p>
        </div>

        {/* ================================================================
            CARD 1: WITH PONTLOOK (Top Card - Mint / Sage Theme)
            ================================================================ */}
        <div className="rounded-2xl border border-emerald-200/90 bg-[#EFF7ED] p-4 sm:p-6 mb-4 relative overflow-hidden transition-all duration-300 hover:border-emerald-300 shadow-xs">
          
          {/* Card 1 Top Bar: Brand & Stat */}
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-neutral-950 flex items-center justify-center text-white shadow-xs">
                <Signal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-neutral-950 font-heading block leading-tight">
                  {isAr ? 'مع بونت لوك' : 'With PontLook'}
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-800 font-medium block">
                  {isAr ? 'منظومة المطابقة المباشرة' : 'Direct matchmaking protocol'}
                </span>
              </div>
            </div>

            {/* Big Stat Callout */}
            <div className="text-end shrink-0">
              <span className="text-[10px] sm:text-xs text-neutral-500 font-medium block">
                {isAr ? 'في المتوسط' : 'On average'}
              </span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950 font-heading tracking-tight leading-none">
                  3–5
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                  {isAr ? 'أيام*' : 'days*'}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 block leading-tight">
                {isAr ? 'من الاحتياج إلى الاجتماع' : 'mandate to introduction'}
              </span>
            </div>
          </div>

          {/* Card 1 Pipeline Flow (Desktop Grid / Mobile Horizontal Scroll) */}
          <div className="relative my-4 sm:my-6 py-2">
            {/* Connecting Track (Desktop only) */}
            <div className="hidden lg:block absolute top-[28px] left-12 right-12 h-[2px] -translate-y-1/2 bg-emerald-200/90 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/80 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-emerald-100">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs mb-2">
                  <Building2 size={19} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                  {isAr ? 'المنشأة المستفيدة' : 'Your enterprise'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-600 leading-tight mt-0.5">
                  {isAr ? 'احتياج محدد وميزانية معتمدة' : 'Diagnosed skill gap & budget'}
                </span>
              </div>

              {/* Step 2 (PontLook Hub) */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/80 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-emerald-100">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-neutral-950 text-white flex items-center justify-center shadow-md mb-2">
                  <Signal size={18} className="text-emerald-400" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-950 leading-tight">
                  {isAr ? 'محرك PontLook' : 'PontLook Engine'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-600 leading-tight mt-0.5">
                  {isAr ? 'تشخيص الفجوة ومطابقة SLA' : 'Diagnose, vet & match'}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/80 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-emerald-100">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs mb-2">
                  <Handshake size={19} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                  {isAr ? 'تقديم مباشر وفوري' : 'Direct delivery'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-600 leading-tight mt-0.5">
                  {isAr ? 'اجتماع تنفيذي مع CHRO' : 'CHRO calendar introduction'}
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/80 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-emerald-100">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs mb-2">
                  <BadgeCheck size={19} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-900 leading-tight">
                  {isAr ? '2 إلى 3 خبراء فقط' : '2–3 Providers'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-600 leading-tight mt-0.5">
                  {isAr ? 'جاهزية فورية وضمان 5 أيام' : '5-day replacement SLA'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 1 Footer Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-emerald-200/80">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-800 font-medium">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>
                {isAr
                  ? 'منظومة مطابقة واحدة مؤكدة. ميزانيات معتمدة، وصفر رسائل باردة أو مناقصات عشوائية.'
                  : 'One verified alignment. Confirmed corporate budget, zero cold outreach, zero retainers.'}
              </span>
            </div>

            <Link
              href={`/${lang}/find-training`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto"
            >
              <span>{isAr ? 'ابدأ المطابقة الآن' : 'Find your match'}</span>
              <ArrowRight size={13} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>

        {/* ================================================================
            CARD 2: THE TRADITIONAL WAY (Bottom Card - Sand / Stone Theme)
            ================================================================ */}
        <div className="rounded-2xl border border-[#EBE3D7] bg-[#FAF7F0] p-4 sm:p-6 mb-3 relative overflow-hidden transition-all duration-300">
          
          {/* Card 2 Top Bar: Brand & Stat */}
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EAE2D5] flex items-center justify-center text-neutral-600">
                <Users size={16} />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-neutral-800 font-heading block leading-tight">
                  {isAr ? 'الطريقة التقليدية' : 'The traditional way'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 font-medium block">
                  {isAr ? 'إجراءات مطولة واحتكاك إداري' : 'Fragmented procurement'}
                </span>
              </div>
            </div>

            {/* Big Stat Callout */}
            <div className="text-end shrink-0">
              <span className="text-[10px] sm:text-xs text-neutral-500 font-medium block">
                {isAr ? 'يصل إلى' : 'Up to'}
              </span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-700 font-heading tracking-tight leading-none">
                  45
                </span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-600">
                  {isAr ? 'يوماً' : 'days'}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 block leading-tight">
                {isAr ? 'تأخير وإرهاق إداري' : 'procurement friction'}
              </span>
            </div>
          </div>

          {/* Card 2 Pipeline Flow (5 Fragmented Steps) */}
          <div className="relative my-4 sm:my-6 py-2">
            {/* Dashed Connecting Track (Desktop only) */}
            <div className="hidden lg:block absolute top-[28px] left-10 right-10 h-[2px] -translate-y-1/2 border-t-2 border-dashed border-[#DDD4C5] z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-[#EFE7D8]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-2">
                  <FileText size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'موارد بشرية مرهقة' : 'Overwhelmed HR'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'كتالوجات وملفات PDF معلبة' : 'Generic PDFs & course catalogs'}
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-[#EFE7D8]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-2">
                  <Mail size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'رسائل باردة مهدرة' : 'Cold spam outreach'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'عروض عشوائية بدون ردود' : 'Hundreds of unread emails'}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-[#EFE7D8]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-2">
                  <XCircle size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'فرص غير موثوقة' : 'Dead-end leads'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'غياب الميزانية والقرار' : 'No confirmed purchasing budget'}
                </span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-[#EFE7D8]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-2">
                  <Clock size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'شهور من المفاوضات' : '4–8 weeks lost'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'اجتماعات استكشافية ضائعة' : 'Endless vendor search calls'}
                </span>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start bg-white/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border sm:border-0 border-[#EFE7D8]">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F2EDE2] border border-[#DDD4C5] flex items-center justify-center text-neutral-600 mb-2">
                  <Layers size={18} />
                </div>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 leading-tight">
                  {isAr ? 'تدريب معلب وجاهز' : 'Off-the-shelf fit'}
                </span>
                <span className="text-[10px] sm:text-xs text-neutral-500 leading-tight mt-0.5">
                  {isAr ? 'فشل في تحقيق عائد حقيقي' : 'Fails to deliver actual ROI'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 Footer Row */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 font-medium pt-3 border-t border-[#E5DFD4]">
            <XCircle size={16} className="text-neutral-400 shrink-0" />
            <span>
              {isAr
                ? 'إجراءات معقدة وأسابيع مهدرة في البحث والمراسلات قبل العثور على أي خبير مؤهل.'
                : 'More handoffs. Weeks lost sifting generic course catalogs before any verified engagement.'}
            </span>
          </div>
        </div>

        {/* Bottom Footnote Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 text-[11px] text-neutral-500 font-sans">
          <span>
            {isAr
              ? '* 3 إلى 5 أيام هو متوسط الفترة الزمنية من تحديد الاحتياج المؤسسي إلى الاجتماع المباشر مع الخبراء.'
              : '* 3–5 days is the average timeframe from confirmed corporate mandate to executive introduction with PontLook.'}
          </span>

          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-1 font-semibold text-neutral-700 hover:text-neutral-950 transition-colors self-start sm:self-auto"
          >
            <span>{isAr ? 'احجز جلسة استكشافية' : 'Book a discovery call'}</span>
            <ArrowRight size={12} className="rtl:-scale-x-100" />
          </Link>
        </div>

      </div>
    </div>
  );
}
