'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  XCircle,
  CheckCircle2,
  BadgeCheck,
  SlidersHorizontal,
  Handshake,
  GraduationCap,
  TrendingUp,
  Workflow,
  ArrowRight,
  ArrowLeft,
  X,
  Target,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
} from '@/components/icons';
import { m, AnimatePresence } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import BorderGlow from '@/components/shared/BorderGlow';
import { spring, ease, dur } from '@/lib/motion';

interface WhoWeAreProps {
  lang?: 'en' | 'ar';
}

/* ==========================================================================
   SECTION 1: THE INTERACTIVE COMPARISON TOGGLE (ECOMFLOW INSPIRATION)
   ========================================================================== */
export function ComparisonToggleSection({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';
  const [mode, setMode] = useState<'pontlook' | 'traditional'>('pontlook');

  return (
    <section
      id="our-mission"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-16 sm:py-24 lg:py-28 transition-colors duration-500 overflow-hidden"
      aria-labelledby="comparison-title"
    >
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Toggle Switch Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs font-semibold uppercase tracking-wider font-sans">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
            <span>{isAr ? 'المقارنة المباشرة' : 'THE COMPARISON ENGINE'}</span>
          </div>

          <h2
            id="comparison-title"
            className="text-2xl sm:text-4xl lg:text-[42px] font-semibold text-neutral-900 font-heading tracking-tight leading-[1.18]"
          >
            {isAr
              ? 'كيف تعيد PontLook تعريف تدريب الشركات؟'
              : 'How PontLook Redefines Corporate Training'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-2xl">
            {isAr
              ? 'اختر الطريقة للاطلاع على الفارق بين البحث التقليدي المرهق ومنظومة بونت لوك المؤكدة والمترابطة.'
              : 'Toggle between the two approaches to see the shift from traditional procurement friction to verified direct matching.'}
          </p>

          {/* Interactive Mode Toggle Pill (Ecomflow Inspired) */}
          <div className="pt-2 flex items-center p-1 rounded-full bg-neutral-100 border border-neutral-300 shadow-inner">
            <button
              type="button"
              onClick={() => setMode('pontlook')}
              className={`relative px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                mode === 'pontlook'
                  ? 'text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {mode === 'pontlook' && (
                <m.div
                  layoutId="comparison-active-pill"
                  className="absolute inset-0 rounded-full bg-neutral-950"
                  transition={spring.soft}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={14} className={mode === 'pontlook' ? 'text-amber-400' : 'text-neutral-500'} />
                <span>{isAr ? 'طريقة بونت لوك' : 'The PontLook Way'}</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMode('traditional')}
              className={`relative px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                mode === 'traditional'
                  ? 'text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {mode === 'traditional' && (
                <m.div
                  layoutId="comparison-active-pill"
                  className="absolute inset-0 rounded-full bg-neutral-800"
                  transition={spring.soft}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <XCircle size={14} className={mode === 'traditional' ? 'text-red-400' : 'text-neutral-500'} />
                <span>{isAr ? 'الطريقة التقليدية' : 'The Traditional Way'}</span>
              </span>
            </button>
          </div>

        </div>

        {/* Content Box with Dark Pop-up Window Animation */}
        <AnimatePresence mode="wait">
          {mode === 'pontlook' ? (
            <m.div
              key="pontlook"
              initial={{ opacity: 0, scale: 0.94, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -22 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="rounded-3xl border border-[#26282D] bg-[#0B0C0E] p-6 sm:p-10 lg:p-12 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] relative overflow-hidden text-white"
            >
              {/* Dark Pop-up Window Header Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{isAr ? 'منظومة بونت لوك المباشرة • نشطة' : 'PONTLOOK DIRECT PROTOCOL • ACTIVE'}</span>
                </div>
                <span className="text-[11px] text-neutral-500 hidden sm:inline font-mono">GCC MATCH ENGINE</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Copy & Actions */}
                <div className="lg:col-span-5 flex flex-col items-start text-start space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isAr ? 'من التشتت إلى الترابط' : 'FROM SCATTERED TO CONNECTED'}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-semibold text-white leading-tight">
                    {isAr
                      ? 'منظومة متكاملة تعمل بتناغم تام.'
                      : 'Everything working beautifully together.'}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                    {isAr
                      ? 'نشخص فجوة المهارات الدقيقة ونربط المنشأة بـ 2 إلى 3 خبراء معتمدين كحد أقصى مع ميزانيات مؤكدة. وداعاً للرسائل الباردة والمناقصات العشوائية.'
                      : 'We diagnose the team’s exact skill gap and connect with 2 to 3 pre-vetted specialists with confirmed corporate budgets. No cold outreach, no bloated directories.'}
                  </p>

                  <div className="pt-2 w-full sm:w-auto">
                    <Magnetic strength={0.2} activeDistance={30}>
                      <Link
                        href={`/${lang}/find-training`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF5C00] hover:bg-[#FF7A2F] text-white font-medium text-xs sm:text-sm shadow-lg shadow-orange-500/25 transition-all active:scale-95"
                      >
                        <span>{isAr ? 'ابدأ المطابقة الآن' : 'Find your match'}</span>
                        <ArrowRight size={14} className="rtl:-scale-x-100" />
                      </Link>
                    </Magnetic>
                  </div>
                </div>

                {/* Right Column: Visual Connected Architecture Diagram */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-[#26282D] bg-[#121317] p-5 sm:p-7 shadow-xl space-y-6 font-sans">
                    
                    {/* Visual Connected Nodes Schema */}
                    <div className="relative py-4 px-2">
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center text-center relative z-10">
                        
                        {/* Node 1: Enterprise Buyer */}
                        <div className="p-3 sm:p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col items-center space-y-1">
                          <Building2 size={20} className="text-emerald-400" />
                          <span className="text-xs font-bold text-white">
                            {isAr ? 'طلب مؤكد' : 'Enterprise Need'}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-medium">
                            {isAr ? 'ميزانية معتمدة' : 'Verified Budget'}
                          </span>
                        </div>

                        {/* Central Hub: PontLook Core Matching Engine */}
                        <div className="p-3.5 sm:p-4 rounded-2xl border-2 border-[#FF5C00] bg-[#1C1E24] text-white flex flex-col items-center space-y-1 shadow-[0_0_25px_rgba(255,92,0,0.3)]">
                          <Signal size={22} className="text-amber-400" />
                          <span className="text-xs font-bold text-white">
                            {isAr ? 'محرك بونت لوك' : 'PontLook Engine'}
                          </span>
                          <span className="text-[10px] text-amber-300 font-medium">
                            {isAr ? 'تشخيص ومطابقة' : 'Fit & SLA'}
                          </span>
                        </div>

                        {/* Node 3: Vetted Specialist Providers */}
                        <div className="p-3 sm:p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 flex flex-col items-center space-y-1">
                          <BadgeCheck size={20} className="text-blue-400" />
                          <span className="text-xs font-bold text-white">
                            {isAr ? '2-3 خبراء معتمدون' : '2-3 Providers'}
                          </span>
                          <span className="text-[10px] text-blue-400 font-medium">
                            {isAr ? 'جاهزية التنفيذ' : 'Ready to Deliver'}
                          </span>
                        </div>

                      </div>

                      {/* Connected Luminous Line under nodes */}
                      <div className="absolute top-1/2 start-8 end-8 h-0.5 bg-gradient-to-r from-emerald-400 via-amber-400 to-blue-400 -translate-y-1/2 pointer-events-none shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    </div>

                    {/* 3 Summary Points */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">{isAr ? 'طلب مؤسسي موثق' : 'Verified Demand'}</span>
                          <span className="text-[11px] text-neutral-400">{isAr ? 'ميزانية معتمدة ومؤكدة' : 'Confirmed budget & intent'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">{isAr ? 'تقديم مباشر وفوري' : 'Direct Introduction'}</span>
                          <span className="text-[11px] text-neutral-400">{isAr ? 'اجتماع مع صناع القرار' : 'CHRO calendar access'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">{isAr ? 'صفر احتكاك مالي' : 'Zero Risk SLA'}</span>
                          <span className="text-[11px] text-neutral-400">{isAr ? 'دفع مقابل النتائج فقط' : '5-day replacement SLA'}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </m.div>
          ) : (
            <m.div
              key="traditional"
              initial={{ opacity: 0, scale: 0.94, y: 22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -22 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="rounded-3xl border border-red-500/30 bg-[#0E0B0B] p-6 sm:p-10 lg:p-12 shadow-[0_30px_70px_-15px_rgba(239,68,68,0.2)] relative overflow-hidden text-white"
            >
              {/* Dark Pop-up Window Header Bar (Red Warning Mode) */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-red-500/20 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>{isAr ? 'النموذج التقليدي • احتكاك عالي' : 'TRADITIONAL PROCUREMENT • HIGH FRICTION'}</span>
                </div>
                <span className="text-[11px] text-red-400/80 hidden sm:inline font-mono">STATUS: HIGH WASTE</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Column: Negative State Copy */}
                <div className="lg:col-span-5 flex flex-col items-start text-start space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[11px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{isAr ? 'تشتت وإرهاق إداري' : 'FRAGMENTED & OPAQUE'}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-semibold text-white leading-tight">
                    {isAr
                      ? 'تشتت، غموض، وإرهاق إداري.'
                      : 'Fragmented, opaque, and overwhelmed.'}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                    {isAr
                      ? 'تغرق فرق الموارد البشرية في كتالوجات غير مجدية، بينما يرسل مزودو التدريب مئات الرسائل الباردة بدون ردود أو بميزانيات وهمية.'
                      : 'Weeks lost sifting through generic course catalogs, bombarded by cold sales emails, or hosting exploratory discovery calls with leads who lack approved budget.'}
                  </p>

                  <div className="pt-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setMode('pontlook')}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <span>{isAr ? 'شاهد حل بونت لوك لهذا ←' : 'See how PontLook fixes this →'}</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Broken/Disconnected Visual Diagram */}
                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-red-500/20 bg-[#140F10] p-5 sm:p-7 shadow-xl space-y-6 font-sans">
                    
                    <div className="relative py-4 px-2">
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center text-center relative z-10">
                        
                        <div className="p-3 sm:p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex flex-col items-center space-y-1">
                          <Users size={20} className="text-red-400" />
                          <span className="text-xs font-bold text-white">
                            {isAr ? 'موارد بشرية مرهقة' : 'Overwhelmed HR'}
                          </span>
                          <span className="text-[10px] text-red-400 font-medium">
                            {isAr ? '100+ عرض مكرر' : 'Generic PDFs'}
                          </span>
                        </div>

                        {/* Broken Center Gap */}
                        <div className="p-3.5 sm:p-4 rounded-2xl border border-dashed border-red-500/40 bg-red-950/30 text-white flex flex-col items-center space-y-1">
                          <XCircle size={22} className="text-red-500" />
                          <span className="text-xs font-bold text-red-400">
                            {isAr ? 'انفصال تام' : 'Broken Bridge'}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-medium">
                            {isAr ? 'أسابيع ضائعة' : '4-8 Weeks Lost'}
                          </span>
                        </div>

                        <div className="p-3 sm:p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex flex-col items-center space-y-1">
                          <Handshake size={20} className="text-red-400" />
                          <span className="text-xs font-bold text-white">
                            {isAr ? 'مزود تدريب محبط' : 'Struggling Firm'}
                          </span>
                          <span className="text-[10px] text-red-400 font-medium">
                            {isAr ? 'رسائل باردة مهدرة' : 'Cold Spam Outreach'}
                          </span>
                        </div>

                      </div>

                      {/* Broken Red Line */}
                      <div className="absolute top-1/2 start-8 end-8 h-0.5 border-t-2 border-dashed border-red-500/40 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* 3 Friction Points */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-red-500/20 text-xs">
                      <div className="flex items-start gap-2">
                        <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">{isAr ? 'تأخير في الاختيار' : 'Weeks Lost'}</span>
                          <span className="text-[11px] text-neutral-400">{isAr ? 'شهور من المفاوضات' : 'Lengthy vendor searches'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">{isAr ? 'فرص غير موثوقة' : 'Dead End Leads'}</span>
                          <span className="text-[11px] text-neutral-400">{isAr ? 'غياب الميزانية والقرار' : 'No confirmed purchasing budget'}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">{isAr ? 'تدريب معلب وجاهز' : 'Off-the-Shelf Fits'}</span>
                          <span className="text-[11px] text-neutral-400">{isAr ? 'عدم سد فجوة الكفاءة' : 'Fails to deliver actual ROI'}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 2: LINEAR ISOMETRIC VALUE MODEL (LESS CONTENT, HIGH IMPACT)
   ========================================================================== */
export function ValueModelBilateral({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';

  const specs = [
    {
      code: 'SPEC // 01',
      title: isAr ? 'مجاني 100% للمؤسسات' : '100% Free for Buyers',
      desc: isAr
        ? 'وصول كامل إلى محرك التشخيص وقائمة الشركاء بدون أي اشتراكات أو عمولات خفية.'
        : 'Zero platform fees, retainers, or markups. Free requirements diagnosis and curated shortlist.',
      badge: isAr ? 'صفر تكلفة للمشتري' : 'Zero Buyer Cost',
      accent: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    },
    {
      code: 'SPEC // 02',
      title: isAr ? 'وصول تنفيذي مباشر' : 'Direct Executive Access',
      desc: isAr
        ? 'ربط مباشر مع مسؤولي الموارد البشرية والتدريب أصحاب الميزانيات وصلاحيات التعاقد المعتمدة.'
        : 'Direct connection to CHROs and L&D heads with pre-allocated corporate budgets.',
      badge: isAr ? 'صناع قرار معتمدون' : 'Verified Decision Makers',
      accent: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    },
    {
      code: 'SPEC // 03',
      title: isAr ? 'نموذج مبني على النتائج' : 'Success-Based Model',
      desc: isAr
        ? 'يدفع مزودو التدريب فقط عند استلام فرصة مؤكدة، مع ضمان استبدال فوري خلال 5 أيام.'
        : 'Providers only invest on verified introductions. 100% 5-day replacement SLA guarantee.',
      badge: isAr ? 'استثمار مرتبط بالنتيجة' : 'Zero Retainer Risk',
      accent: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    },
    {
      code: 'SPEC // 04',
      title: isAr ? 'دقة الاختيار (2 إلى 3 كحد أقصى)' : 'Curated Precision (2 to 3 Max)',
      desc: isAr
        ? 'نطرح 2 إلى 3 مزودين فقط لكل متطلب، لمنع حرب الأسعار وضمان المنافسة على الجودة.'
        : 'Introductions capped at 2 to 3 per mandate. Providers compete on merit, not price wars.',
      badge: isAr ? 'الدقة فوق الكمية' : 'Merit Over Volume',
      accent: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
    },
  ];

  return (
    <section
      id="value-model"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-16 sm:py-20 lg:py-24 border-t border-neutral-200 overflow-hidden"
      aria-labelledby="value-model-title"
    >
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs font-semibold uppercase tracking-wider font-sans">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>{isAr ? 'هيكلية النموذج التجاري' : 'BILATERAL VALUE ARCHITECTURE'}</span>
          </div>

          <h2
            id="value-model-title"
            className="text-2xl sm:text-4xl lg:text-[42px] font-semibold text-neutral-950 font-heading tracking-tight leading-[1.18]"
          >
            {isAr
              ? 'مواءمة ثنائية متكافئة. بدون أي رسوم اشتراك.'
              : 'Bilateral Alignment. Zero Platform Friction.'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'نموذج صُمم لتكافؤ المصالح: مجاني للمؤسسات والشركات، ومبني على النتائج لمزودي التدريب.'
              : 'A bilateral model engineered for alignment: free for corporate buyers, success-based for accredited training providers.'}
          </p>
        </div>

        {/* 4 Technical Architecture Specs (Dark Pop-up Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {specs.map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', damping: 22, stiffness: 300, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl border border-[#26282D] hover:border-white/30 bg-[#0B0C0E] hover:bg-[#121317] p-5 sm:p-6 flex flex-col justify-between shadow-[0_18px_40px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_-8px_rgba(0,0,0,0.45)] text-white transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/[0.08] transition-colors" />
              
              <div className="space-y-3 font-sans relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    {item.code}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${item.accent}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-heading font-semibold text-white leading-snug group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono relative z-10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PONTLOOK PROTOCOL</span>
                </span>
                <span className="text-white font-bold tracking-wider">VERIFIED</span>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 3: ATTIO-INSPIRED EDITORIAL QUOTE (DARK POP-UP BANNER ON WHITE CANVAS)
   ========================================================================== */
export function EditorialQuoteSection({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';

  return (
    <section
      id="editorial-quote"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-neutral-50 text-neutral-900 py-16 sm:py-24 border-t border-neutral-200 overflow-hidden"
    >
      <div className="container-site max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <m.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative rounded-3xl border border-[#26282D] bg-[#0B0C0E] p-8 sm:p-12 lg:p-14 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.38)] text-center text-white overflow-hidden space-y-6 group"
        >
          {/* Subtle pop-up window bar at top */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] uppercase tracking-wider text-neutral-400">
              {isAr ? 'شهادة موثقة • دول مجلس التعاون' : 'VERIFIED ENTERPRISE MANDATE • GCC'}
            </span>
            <span className="w-6" />
          </div>

          <BorderGlow glowColor="rgba(255, 92, 0, 0.25)" size={350} opacity={0.5} />
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/[0.04] rounded-full blur-3xl pointer-events-none" />

          {/* Quotation Mark */}
          <div className="text-amber-400/30 text-5xl sm:text-6xl font-serif select-none leading-none mx-auto">
            “
          </div>

          {/* The Quote Headline */}
          <blockquote className="text-xl sm:text-2xl lg:text-[28px] font-heading font-medium text-white leading-[1.38] tracking-tight max-w-3xl mx-auto">
            {isAr
              ? '«استبدلت بونت لوك أسابيع من التواصل العشوائي وأدلة المناقصات غير المجدية بطلب مؤسسي مؤكد يصل مباشرة إلى فريق قيادتنا.»'
              : '“PontLook replaced weeks of speculative cold outreach and dead RFP directories with verified enterprise demand delivered directly to our leadership team.”'}
          </blockquote>

          {/* Author / Entity Attribution */}
          <div className="pt-2 flex flex-col items-center justify-center space-y-1 font-sans">
            <div className="text-sm font-semibold text-white">
              {isAr ? 'مسؤول التدريب والتطوير المؤسسي' : 'Head of Corporate Learning & Talent'}
            </div>
            <div className="text-xs text-neutral-400">
              {isAr ? 'مجموعة مصرفية وصناعية كبرى · الرياض & دبي' : 'GCC Enterprise Financial Group · Riyadh & Dubai'}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 4: THE END TO END TRAINING JOURNEY (UNIFIED TIMELINE)
   ========================================================================== */
export function TrainingJourneyFlow({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      navTitle: isAr ? 'رصد وتشخيص الفجوة' : 'Enterprise Need',
      title: isAr ? 'تشخيص فجوة المهارات وتوثيق الميزانية' : 'Enterprise Skill Gap & Diagnostic',
      desc: isAr
        ? 'تحدد إدارة الموارد البشرية عجزاً تشغيلياً أو قيادياً حرجاً. استيعاب دقيق: حجم المجموعات، طريقة التنفيذ، المتطلبات بالرياض ودبي، والميزانية.'
        : 'HR identifies a critical operational or leadership deficiency. Deep intake: cohort sizing, delivery mode, Riyadh/Dubai onsite requirements, approved budget.',
      tag: isAr ? 'تم التحقق من النطاق والميزانية' : 'Scope & Budget Verified',
      icon: SlidersHorizontal,
      points: [
        isAr ? 'حصر الفجوات التشغيلية والقيادية بالتعاون مع مسؤولي الموارد البشرية' : 'Deficiency Tagged: Operational and leadership gap analysis',
        isAr ? 'تحديد دقيق لأعداد الموظفين المستهدفين والمدن (الرياض، دبي، أو افتراضياً)' : 'Cohort Sizing: Onsite Riyadh, Dubai, or live-virtual delivery',
        isAr ? 'مواءمة الميزانية المعتمدة قبل طرح المتطلبات على المزودين' : 'Budget Confirmed: Pre-allocated budget and learning objectives',
      ],
    },
    {
      num: '02',
      navTitle: isAr ? 'توفيق الخبراء' : 'Specialist Match',
      title: isAr ? 'توفيق دقيق ومختار (2 إلى 3 خبراء)' : 'Curated Specialist Matchmaking',
      desc: isAr
        ? 'فرز تحليلي وبشري يسلمك 2 إلى 3 خبراء معتمدين مع عروض متوافقة تماماً مع الميزانية. تتجاوز المؤسسة مكالمات المبيعات العشوائية وتقيّم الأنسب فوراً.'
        : 'Analyst-led curation delivering 2 to 3 vetted specialists with budget-aligned proposals. HR skips sales pitches and evaluates proven providers.',
      tag: isAr ? 'محرك بونت لوك المركزي' : 'PontLook Core Engine',
      icon: BadgeCheck,
      points: [
        isAr ? 'استلام 2 إلى 3 عروض مفصلة من نخبة مزودي التدريب المفحوصين' : '2 to 3 Curated Providers: Only elite approved providers evaluated',
        isAr ? 'تسعير شفاف وبنود واضحة متطابقة 100% مع الميزانية' : 'Budget Aligned Proposals: Clear pricing matched to approved budget',
        isAr ? 'درجة ثقة وملاءمة 98% مبنية على سجل تدريب مؤسسي موثق' : '98% Fit Confidence: Verified instructor credentials & past ratings',
      ],
    },
    {
      num: '03',
      navTitle: isAr ? 'تنفيذ مخصص' : 'Tailored Rollout',
      title: isAr ? 'تنفيذ تدريبي مخصص وتأهيل المجموعات' : 'Tailored Delivery Execution',
      desc: isAr
        ? 'توقيع التعاقد، مواءمة المناهج التدريبية، وبدء المدربين والخبراء. يركز مزودو التدريب بنسبة 100% على تقديم أعلى جودة وتفاعل.'
        : 'Contract execution, tailored curriculum, and facilitator onboarding. Providers focus 100% of their energy on high-impact workshop delivery.',
      tag: isAr ? 'جاهزية الانطلاق' : 'Kickoff Ready',
      icon: GraduationCap,
      points: [
        isAr ? 'مواءمة المحتوى التدريبي مع حالات عملية واقعية من بيئة المنشأة' : 'Tailored Curriculum: Content customized to strategic skill gaps',
        isAr ? 'اجتماع تنسيق مباشر مع كبار المدربين والميسرين قبل انطلاق البرنامج' : 'Facilitator Onboarding: Direct alignment with master trainers',
        isAr ? 'جاهزية كاملة للمتدربين مع تأهيل رقمي وجداول حضور دقيقة' : 'Cohort Readiness: Seamless kickoff and digital onboarding',
      ],
    },
    {
      num: '04',
      navTitle: isAr ? 'عائد موثق' : 'Measurable ROI',
      title: isAr ? 'إغلاق فجوة المهارات وعائد استثماري ملموس' : 'Closed Skill Gap & Measurable ROI',
      desc: isAr
        ? 'ارتقاء ملموس بالكفاءات، تقييم موظفين دقيق، وعائد استثماري مستدام لإدارة الشركة. تم سد فجوة الكفاءة بنجاح.'
        : 'Measurable capability uplift, employee post evaluation, and sustained ROI delivered to executive leadership.',
      tag: isAr ? 'عائد استثماري موثق' : 'Verified ROI Capture',
      icon: TrendingUp,
      points: [
        isAr ? 'قياس كمي ودقيق لارتقاء كفاءات المتدربين مقارنة بالتقييم القبلي' : 'Measurable Uplift: Documented workforce competency boost',
        isAr ? 'تقارير أثر تفصيلية واستبانات رضا موثقة تُقدم للإدارة التنفيذية' : 'Post Evaluation: Data-driven assessments & feedback analytics',
        isAr ? 'عائد استثماري ملموس ومستدام يعزز إنتاجية المنشأة ويقلل الهدر' : 'Defensible ROI: Tangible business return delivered to C-suite',
      ],
    },
  ];

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      id="training-journey"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-16 sm:py-24 border-t border-neutral-200 overflow-hidden"
      aria-labelledby="journey-title"
    >
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs font-semibold uppercase tracking-wider font-sans">
            <Workflow size={14} className="text-neutral-900" />
            <span>{isAr ? 'المراحل التشغيلية الأربع' : '4-STAGE OPERATIONAL ROADMAP'}</span>
          </div>

          <h2
            id="journey-title"
            className="text-2xl sm:text-4xl font-semibold text-neutral-950 font-heading tracking-tight leading-tight"
          >
            {isAr
              ? 'رحلة التدريب من التشخيص حتى قياس الأثر'
              : 'The End to End Training Journey'}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'جسر شفاف وسلس يربط الاحتياج التدريبي المشخص بالحلول العملية ذات العائد الاستثماري القابل للقياس.'
              : 'A seamless, transparent bridge from diagnosed skill deficit to measurable business impact.'}
          </p>
        </div>

        {/* 4 Step Switcher */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-6 w-full max-w-4xl mx-auto overflow-x-auto scrollbar-none py-1">
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`group relative shrink-0 sm:flex-1 min-w-[120px] sm:min-w-0 flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 rounded-xl border text-xs font-semibold cursor-pointer transition-all active:scale-95 ${
                  isActive
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-md shadow-black/20'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500 hover:text-neutral-950'
                }`}
              >
                <span className={`font-mono text-[11px] ${isActive ? 'text-amber-400' : 'text-neutral-400'}`}>
                  {st.num}
                </span>
                <span className="truncate">{st.navTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Card as Dark Pop-up Console */}
        <AnimatePresence mode="wait">
          <m.div
            key={currentStep.num}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="rounded-3xl border border-[#26282D] bg-[#0B0C0E] p-6 sm:p-10 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.38)] text-white space-y-6 relative overflow-hidden"
          >
            {/* Top Modal Window Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                STAGE {currentStep.num} • {isAr ? 'المرحلة التشغيلية' : 'OPERATIONAL PROTOCOL'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {currentStep.tag}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-heading font-semibold text-white leading-tight">
                {currentStep.title}
              </h3>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                {currentStep.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-sans">
              {currentStep.points.map((pt, pIdx) => (
                <div key={pIdx} className="p-4 rounded-xl bg-[#16171B] border border-[#26282D] hover:border-white/20 transition-colors space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>{isAr ? `معيار ${pIdx + 1}` : `Deliverable ${pIdx + 1}`}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-snug">{pt}</p>
                </div>
              ))}
            </div>
          </m.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

/* ==========================================================================
   MASTER COMPOSITE EXPORT
   ========================================================================== */
export default function WhoWeAreSections({ lang = 'en' }: WhoWeAreProps) {
  return (
    <div data-nav-light="true" data-nav-theme="light">
      <ComparisonToggleSection lang={lang} />
      <ValueModelBilateral lang={lang} />
      <EditorialQuoteSection lang={lang} />
      <TrainingJourneyFlow lang={lang} />
    </div>
  );
}

