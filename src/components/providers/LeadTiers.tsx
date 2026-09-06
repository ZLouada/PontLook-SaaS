'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Flame, 
  TrendingUp, 
  Check,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Button from '@/components/shared/Button';
import Reveal from '@/components/shared/Reveal';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { Locale } from '@/i18n';

type LeadTiersProps = {
  dict?: any;
  lang?: string;
  showSignals?: boolean;
};

const defaultSignals = [
  'Decision-maker identity and authority verified',
  'Company size and organizational maturity',
  'Budget disclosed and sanity-checked',
  'Timeline to start',
  'Number and severity of pain points',
  'Depth and specificity of the challenge description',
];

const signalsAr = [
  'التحقق من هوية وصلاحية صانع القرار',
  'حجم المنشأة ومستوى النضج المؤسسي',
  'تحديد الميزانية ومراجعة واقعيتها',
  'الجدول الزمني المستهدف لبدء التنفيذ',
  'تحديد وتصنيف التحديات ونقاط الألم',
  'عمق ودقة تفاصيل ومجالات الاحتياج التدريبي',
];

export default function LeadTiers({ dict, lang, showSignals = true }: LeadTiersProps = {}) {
  const pathname = usePathname() || '/en';
  const contextDict = useDictionary();
  const activeDict = dict || contextDict;

  const resolvedLang = (lang || (pathname.startsWith('/ar') ? 'ar' : 'en')) as Locale;
  const isAr = resolvedLang === 'ar';

  const isProvidersPage = pathname.includes('/for-providers');
  const applyHref = isProvidersPage ? '#apply' : `/${resolvedLang}/for-providers#apply`;
  const providerPageHref = isProvidersPage ? '#apply' : `/${resolvedLang}/for-providers`;

  const eyebrow = activeDict?.provider_teaser?.badge || (isAr ? 'لمزودي ومراكز التدريب' : 'For Training Providers');
  const title = activeDict?.provider_teaser?.headline || (isAr ? 'تدفق متوقع لفرص الشركات والمؤسسات' : 'A predictable pipeline of enterprise opportunities');
  const subtitle = activeDict?.provider_teaser?.subtitle || (isAr
    ? 'يتم تقييم وتصنيف كل فرصة على أساس التحقق من صانع القرار، والميزانية، والجدول الزمني، وعمق الاحتياج.'
    : 'Every lead is scored on decision-maker verification, company size, budget, timeline, and depth of need.');

  const cards = [
    {
      stepNumber: 1,
      step: isAr ? 'المرحلة 01' : 'Step 1',
      tierBadge: isAr ? 'طلب عاجل · تطابق 95%' : 'Hot · 95% Match',
      title: isAr
        ? 'فرص تدريبية ذات طلب عاجل وميزانية معتمدة'
        : 'High-intent enterprise demand with confirmed budget',
      desc: isAr
        ? 'صانع قرار مؤكد، ميزانية معتمدة، بدء التدريب خلال 30 يوماً.'
        : 'Verified decision-maker, confirmed budget, starts within 30 days.',
      canvasBg: 'bg-[#F2EFE9]', // warm sandstone from Odysser
      progressColor: 'bg-[#0052FF]',
      matchPct: '95%',
      targetOrg: isAr ? 'منشأة كبرى بالرياض · مشروع #01' : 'Riyadh Enterprise · Project #01',
      criteria: [
        { label: isAr ? 'صاحب القرار معتمد (CHRO)' : 'Verified Decision-Maker (CHRO)', done: true },
        { label: isAr ? 'الميزانية معتمدة (+300 ألف ريال)' : 'Confirmed Budget (SAR 300k+)', done: true },
        { label: isAr ? 'نافذة البدء: خلال 30 يوماً' : 'Immediate 30-Day Window', done: true },
      ],
      isPartnership: false,
      ctaText: isAr ? 'استكشف الشراكة' : 'Explore the partnership',
      ctaHref: providerPageHref,
    },
    {
      stepNumber: 2,
      step: isAr ? 'المرحلة 02' : 'Step 2',
      tierBadge: isAr ? 'طلب متوسط · تطابق 80%' : 'Warm · 80% Match',
      title: isAr
        ? 'احتياج مؤسسي حقيقي قيد إعداد الميزانية'
        : 'Confirmed workforce pain; budget & timeline forming',
      desc: isAr
        ? 'احتياج وصلاحية مؤكدة، الميزانية أو الجدول قيد الإعداد. نواصل المتابعة لتمرير الفرصة عند جاهزيتها.'
        : 'Confirmed pain and authority; budget or timeline still forming. We stay engaged to pass the lead when ready.',
      canvasBg: 'bg-[#EAEFF5]', // soft blue-gray light tone
      progressColor: 'bg-amber-500',
      matchPct: '80%',
      targetOrg: isAr ? 'منشأة كبرى بدبي · مشروع #02' : 'Dubai Enterprise · Project #02',
      criteria: [
        { label: isAr ? 'التحقق من الإدارة التنفيذية' : 'Executive Authority Validated', done: true },
        { label: isAr ? 'حجم المنشأة: +500 موظف' : '500+ Enterprise Workforce', done: true },
        { label: isAr ? 'الميزانية مجدولة للربع القادم' : 'Budget Staged for Q3', done: false },
      ],
      isPartnership: false,
      ctaText: isAr ? 'استكشف الشراكة' : 'Explore the partnership',
      ctaHref: providerPageHref,
    },
    {
      stepNumber: 3,
      step: isAr ? 'المرحلة 03' : 'Step 3',
      tierBadge: isAr ? 'طلب مبكر · تطابق 60%' : 'Qualified · 60% Match',
      title: isAr
        ? 'فرص تدريبية متوسطة المدى تتيح التمركز المبكر'
        : 'Genuine need verified; earlier in the buying journey',
      desc: isAr
        ? 'احتياج حقيقي موثق في مراحل الشراء الأولى.'
        : 'Genuine need verified; earlier in the buying journey.',
      canvasBg: 'bg-[#F0F2ED]', // soft sage-sand light tone
      progressColor: 'bg-blue-500',
      matchPct: '60%',
      targetOrg: isAr ? 'منشأة بالدوحة · مشروع #03' : 'Doha Enterprise · Project #03',
      criteria: [
        { label: isAr ? 'توجه تدريبي استراتيجي محدد' : 'Strategic Training Need Identified', done: true },
        { label: isAr ? 'قطاع البنوك والخدمات المالية' : 'Banking & Financial Sector', done: true },
        { label: isAr ? 'نافذة تمركز وتسويق مبكر' : 'Early Positioning Window', done: false },
      ],
      isPartnership: false,
      ctaText: isAr ? 'استكشف الشراكة' : 'Explore the partnership',
      ctaHref: providerPageHref,
    },
    {
      stepNumber: 4,
      step: isAr ? 'المرحلة 04' : 'Step 4',
      tierBadge: isAr ? 'نموذج الشراكة' : 'Partnership Model',
      title: isAr
        ? 'تدفق متوقع ومستمر لفرص الأعمال المؤسسية في الخليج'
        : 'A predictable pipeline of enterprise GCC opportunities',
      desc: isAr
        ? 'يتم التحقق من كل فرصة قبل وصولها لفريقك. بدون رسوم شهرية ثابتة، وبدء تجريبي لـ 5 فرص مع ضمان استبدال خلال 5 أيام.'
        : 'Every lead is verified before it reaches your team. Zero monthly retainers, 5-lead proof-of-concept pilot, and a 5-day replacement guarantee.',
      canvasBg: 'bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-slate-50/80',
      targetOrg: isAr ? 'شراكة مزودي التدريب الخليجيين' : 'GCC Training Provider Partnership',
      isPartnership: true,
      highlights: [
        {
          label: isAr
            ? 'الدفع لكل فرصة مؤهلة فقط (0$ رسوم شهرية)'
            : 'Pay-per-qualified-lead ($0 monthly retainer)',
        },
        {
          label: isAr
            ? 'وصول مباشر لصناع القرار (الرؤساء التنفيذيين ومدراء الموارد البشرية)'
            : 'Direct access to CHRO & CEO decision-makers',
        },
        {
          label: isAr
            ? 'تقرير استخباراتي وتحليلي كامل مع كل فرصة'
            : 'Full lead intelligence report with every introduction',
        },
        {
          label: isAr
            ? 'ضمان استبدال فوري لأي جهة اتصال غير مؤهلة'
            : 'Guaranteed replacement for any unqualified contact',
        },
      ],
      ctaText: isAr ? 'طلب الانضمام للشراكة' : 'Apply for Partnership',
      ctaHref: applyHref,
    },
  ];

  const signals = isAr ? signalsAr : defaultSignals;

  // Desktop Scroll-Driven Sticky Architecture
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.25) {
      setActiveStep(0);
    } else if (latest < 0.50) {
      setActiveStep(1);
    } else if (latest < 0.75) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  });

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (containerHeight > 0) {
        const targetScroll = containerTop + (index / 3.2) * containerHeight;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Mobile state
  const [mobileStep, setMobileStep] = useState(0);

  const activeCard = cards[activeStep];

  return (
    <section className="relative bg-white py-8 lg:py-12" id="lead-quality">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-r from-accent/5 via-accent-secondary/5 to-accent/5 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      {/* =========================================================================
          DESKTOP: Odysser Sticky Scroll-Driven Feature Showcase (md:block)
      ========================================================================= */}
      <div ref={containerRef} className="relative h-[380vh] hidden md:block">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden py-8 px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 shrink-0">
            <span className="chip mx-auto text-xs py-1 px-3.5 mb-2.5">
              {eyebrow}
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 font-heading tracking-tight leading-snug">
              {title}
            </h2>
            <p className="mt-2 text-xs lg:text-sm text-slate-600 max-w-lg mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Interactive Step Indicator Pills */}
          <div className="flex items-center justify-center gap-2 mb-6 shrink-0">
            {cards.map((c, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={c.step}
                  type="button"
                  onClick={() => handleStepClick(idx)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 transform-gpu active:scale-95 ${
                    isActive
                      ? 'bg-[#0052FF] text-white shadow-md shadow-blue-500/25 scale-105'
                      : 'bg-white/90 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <span>{c.step}</span>
                  <span className="hidden sm:inline opacity-85 ms-1.5 font-medium">
                    · {c.tierBadge.split('·')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Odysser Stacked Card Showcase Container */}
          <div className="relative w-full max-w-5xl mx-auto">
            {/* Stacked Card Deck Layers Behind Main Card */}
            <div
              className="absolute -top-3 inset-x-6 h-8 rounded-t-[32px] bg-slate-100 border-t border-x border-slate-200/80 -z-10 transition-all duration-500 pointer-events-none"
              style={{
                opacity: activeStep >= 1 ? 0.9 : 0,
                transform: activeStep >= 1 ? 'translateY(0) scale(0.98)' : 'translateY(8px) scale(0.95)',
              }}
            />
            <div
              className="absolute -top-6 inset-x-12 h-8 rounded-t-[28px] bg-slate-200/70 border-t border-x border-slate-300/70 -z-20 transition-all duration-500 pointer-events-none"
              style={{
                opacity: activeStep >= 2 ? 0.7 : 0,
                transform: activeStep >= 2 ? 'translateY(0) scale(0.96)' : 'translateY(8px) scale(0.93)',
              }}
            />
            <div
              className="absolute -top-9 inset-x-16 h-8 rounded-t-[24px] bg-slate-200/40 border-t border-x border-slate-300/50 -z-30 transition-all duration-500 pointer-events-none"
              style={{
                opacity: activeStep >= 3 ? 0.5 : 0,
                transform: activeStep >= 3 ? 'translateY(0) scale(0.94)' : 'translateY(8px) scale(0.91)',
              }}
            />

            {/* Active Card Body */}
            <div className="rounded-[32px] lg:rounded-[36px] border border-slate-200/80 bg-white shadow-apple p-6 sm:p-8 lg:p-12 overflow-hidden relative min-h-[440px] flex items-center">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full transform-gpu will-change-transform"
                >
                  {/* Left Column: Typography & Action */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#0052FF] text-white text-xs font-semibold shadow-2xs">
                        {activeCard.step}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200/70">
                        {activeCard.tierBadge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug font-heading">
                      {activeCard.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md">
                      {activeCard.desc}
                    </p>

                    <div className="pt-2 sm:pt-4">
                      {activeCard.isPartnership ? (
                        <Link
                          href={activeCard.ctaHref}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-xl px-6 py-3.5 text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all transform-gpu hover:scale-105 active:scale-95 group"
                        >
                          <ShieldCheck size={17} className="text-white/90" />
                          <span>{activeCard.ctaText}</span>
                          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100" />
                        </Link>
                      ) : (
                        <Button
                          href={activeCard.ctaHref}
                          variant="primary"
                          size="md"
                          className="rounded-full shadow-sm hover:scale-[1.02] text-sm min-h-[44px]"
                          rightIcon={<ArrowRight size={15} className="rtl:-scale-x-100" />}
                        >
                          {activeCard.ctaText}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Showcase Canvas */}
                  <div className="lg:col-span-6 w-full">
                    <div
                      className={`w-full rounded-2xl sm:rounded-3xl border border-slate-200/80 ${activeCard.canvasBg} p-5 sm:p-7 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[290px] sm:min-h-[320px] shadow-inner`}
                    >
                      {/* Subtle micro dot texture overlay */}
                      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

                      {activeCard.isPartnership ? (
                        /* Step 4: High-Contrast Partnership Summary Card */
                        <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-blue-500/10 p-5 sm:p-6 space-y-4 ring-1 ring-blue-500/10">
                          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0052FF]">
                                <ShieldCheck size={18} />
                              </span>
                              <span className="text-xs font-bold text-slate-900 font-heading">
                                {activeCard.targetOrg}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200/70">
                              {isAr ? 'معتمد' : 'Verified'}
                            </span>
                          </div>

                          {/* 4 Key Highlights */}
                          <div className="space-y-2.5 py-1">
                            {activeCard.highlights?.map((h, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                                  <Check size={11} strokeWidth={3} />
                                </span>
                                <span className="leading-snug">{h.label}</span>
                              </div>
                            ))}
                          </div>

                          {/* Primary Action Button */}
                          <div className="pt-2 border-t border-slate-100">
                            <Link
                              href={activeCard.ctaHref}
                              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-xl px-5 py-3 text-xs font-bold shadow-md shadow-blue-500/25 hover:shadow-blue-500/35 transition-all transform-gpu hover:scale-[1.02] active:scale-[0.98]"
                            >
                              <span>{isAr ? 'طلب الانضمام للشراكة ←' : 'Apply for Partnership →'}</span>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        /* Steps 1, 2, 3: Scored Tier Lead Card */
                        <div className="relative z-10 w-full max-w-xs rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md p-5 sm:p-6 space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                            <span className="text-xs font-semibold text-slate-800">
                              {activeCard.targetOrg}
                            </span>
                            {activeCard.stepNumber === 1 && <Flame size={15} className="text-rose-500" />}
                            {activeCard.stepNumber === 2 && <TrendingUp size={15} className="text-amber-500" />}
                            {activeCard.stepNumber === 3 && <ShieldCheck size={15} className="text-blue-500" />}
                          </div>

                          {/* Animated Progress Bar */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                              <span>{isAr ? 'دقة التطابق' : 'Match Accuracy'}</span>
                              <span className="font-mono font-bold text-slate-800">{activeCard.matchPct}</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <m.div
                                initial={{ width: 0 }}
                                animate={{ width: activeCard.matchPct }}
                                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                                className={`h-full ${activeCard.progressColor} rounded-full`}
                              />
                            </div>
                          </div>

                          {/* Scored Criteria Checklist */}
                          <div className="space-y-2 pt-1">
                            {activeCard.criteria?.map((c) => (
                              <div key={c.label} className="flex items-center gap-2 text-xs text-slate-600">
                                {c.done ? (
                                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                ) : (
                                  <Clock size={14} className="text-slate-400 shrink-0" />
                                )}
                                <span className="truncate">{c.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </m.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          MOBILE: Responsive Touch Showcase Fallback (md:hidden)
      ========================================================================= */}
      <div className="md:hidden space-y-6 px-4">
        {/* Mobile Section Heading */}
        <div className="text-center">
          <span className="chip mx-auto text-xs py-1 px-3 mb-2">
            {eyebrow}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 font-heading tracking-tight leading-snug">
            {title}
          </h2>
          <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Mobile Step Selector Tabs */}
        <div className="flex items-center justify-start gap-1.5 overflow-x-auto pb-2 px-0.5 no-scrollbar scroll-smooth">
          {cards.map((c, idx) => {
            const isActive = mobileStep === idx;
            return (
              <button
                key={c.step}
                type="button"
                onClick={() => setMobileStep(idx)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#0052FF] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70'
                }`}
              >
                <span>{c.step}</span>
                <span className="opacity-80 ms-1 text-[11px]">
                  ({c.isPartnership ? (isAr ? 'شراكة' : 'Model') : c.matchPct})
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Mobile Card */}
        <AnimatePresence mode="wait">
          <m.div
            key={mobileStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-slate-200/80 bg-white shadow-apple p-5 space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0052FF] text-white text-[11px] font-semibold">
                  {cards[mobileStep].step}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200/70">
                  {cards[mobileStep].tierBadge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug font-heading">
                {cards[mobileStep].title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {cards[mobileStep].desc}
              </p>
            </div>

            {/* Visual Canvas on Mobile */}
            <div
              className={`w-full rounded-xl border border-slate-200/80 ${cards[mobileStep].canvasBg} p-4 flex flex-col items-center justify-center relative overflow-hidden`}
            >
              {cards[mobileStep].isPartnership ? (
                <div className="w-full rounded-xl bg-white border border-slate-200 shadow-md p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-900 font-heading">
                      {cards[mobileStep].targetOrg}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      {isAr ? 'معتمد' : 'Verified'}
                    </span>
                  </div>
                  <div className="space-y-2 py-1">
                    {cards[mobileStep].highlights?.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                          <Check size={10} strokeWidth={3} />
                        </span>
                        <span className="leading-snug">{h.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full rounded-xl bg-white border border-slate-200 shadow-md p-4 space-y-3">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 text-xs font-semibold text-slate-800">
                    <span>{cards[mobileStep].targetOrg}</span>
                    {cards[mobileStep].stepNumber === 1 && <Flame size={14} className="text-rose-500" />}
                    {cards[mobileStep].stepNumber === 2 && <TrendingUp size={14} className="text-amber-500" />}
                    {cards[mobileStep].stepNumber === 3 && <ShieldCheck size={14} className="text-blue-500" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>{isAr ? 'دقة التطابق' : 'Match Accuracy'}</span>
                      <span className="font-mono font-bold text-slate-800">{cards[mobileStep].matchPct}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: cards[mobileStep].matchPct }}
                        className={`h-full ${cards[mobileStep].progressColor} rounded-full`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {cards[mobileStep].criteria?.map((c) => (
                      <div key={c.label} className="flex items-center gap-2 text-xs text-slate-600">
                        {c.done ? (
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        ) : (
                          <Clock size={13} className="text-slate-400 shrink-0" />
                        )}
                        <span className="truncate">{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile CTA and Step Switcher Controls */}
            <div className="pt-2 flex flex-col gap-3">
              <Link
                href={cards[mobileStep].ctaHref}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white rounded-xl py-3 text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                <span>{cards[mobileStep].ctaText}</span>
                <ArrowRight size={14} className="rtl:-scale-x-100" />
              </Link>

              {/* Step Navigation Dots / Buttons */}
              <div className="flex items-center justify-between w-full pt-1">
                <button
                  type="button"
                  disabled={mobileStep === 0}
                  onClick={() => setMobileStep((s) => Math.max(0, s - 1))}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500 flex items-center gap-1"
                >
                  <ChevronLeft size={14} className="rtl:rotate-180" />
                  <span>{isAr ? 'السابق' : 'Previous'}</span>
                </button>
                <div className="flex items-center gap-1.5">
                  {cards.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMobileStep(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        mobileStep === i ? 'w-5 bg-[#0052FF]' : 'w-1.5 bg-slate-200'
                      }`}
                      aria-label={`Go to step ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  disabled={mobileStep === cards.length - 1}
                  onClick={() => setMobileStep((s) => Math.min(cards.length - 1, s + 1))}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500 flex items-center gap-1"
                >
                  <span>{isAr ? 'التالي' : 'Next'}</span>
                  <ChevronRight size={14} className="rtl:rotate-180" />
                </button>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>

      {/* Optional: Score Factors / Signals List (Shown on provider page) */}
      {showSignals && (
        <div className="container-site px-4 sm:px-8 lg:px-12 mt-12 sm:mt-16">
          <Reveal
            className="mx-auto max-w-4xl rounded-3xl bg-slate-50 border border-slate-200/70 text-slate-800 p-5 sm:p-8 md:p-12 shadow-sm relative overflow-hidden"
            delay={0.1}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-slate-800 mb-2 font-heading">
                {isAr ? 'عوامل احتساب درجة الفرصة' : 'What drives the score'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans max-w-2xl">
                {isAr
                  ? 'لا ننشر خوارزمية النقاط التفصيلية: المبدأ بسيط وواضح؛ كلما كانت جاهزية ومعلومات المنشأة الطالبة أكثر توثيقاً ووضوحاً، ارتفعت درجة الفرصة وتصنيفها.'
                  : 'We don’t publish exact point algorithms: the philosophy is simple: the more a buyer has verified about their own readiness, the higher the score.'}
              </p>

              <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                {signals.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
