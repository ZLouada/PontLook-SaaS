'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
  CircleDollarSign,
  Target,
  TrendingUp,
  CheckCircle2,
} from '@/components/icons';
import TextReveal from '@/components/shared/TextReveal';
import { ease } from '@/lib/motion';

interface BenefitItem {
  id: string;
  index: string;
  icon: any;
  badge: string;
  title: string;
  angle: string;
  body: string;
  takeaways: string[];
  mockup: React.ReactNode;
}

interface ProviderBenefitsCardsProps {
  lang: string;
}

export default function ProviderBenefitsCards({ lang }: ProviderBenefitsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isUserClicking = useRef(false);

  const benefits: BenefitItem[] = [
    {
      id: 'pay-per-lead',
      index: '01',
      icon: CircleDollarSign,
      badge: isAr ? 'نموذج الدفع بالأداء' : 'Performance-Based',
      title: isAr ? 'انعدام مخاطر الرسوم الشهرية' : 'Zero Retainer Risk',
      angle: isAr ? 'صفر اشتراكات ثابتة · دفع حصري لكل مشترٍ مؤهل' : 'Zero Retainers · Pay Per Qualified Buyer',
      body: isAr
        ? 'لا توجد رسوم إدارة أو اشتراكات شهرية ثابتة. الدفع يتم حصراً لكل صانع قرار مؤكد ومؤهل يتم تقديمه لك مع كراسة متطلبات واضحة.'
        : 'No monthly management fees or fixed retainers. You pay strictly per verified decision maker delivered ($50 to $200 per lead).',
      takeaways: [
        isAr ? 'انعدام الالتزامات التعاقدية أو رسوم الوكالات' : 'No binding contracts or retainer fees',
        isAr ? 'ضمان استبدال فوري 100% لأي فرصة غير مطابقة' : '100% instant lead replacement SLA',
        isAr ? 'تكلفة استحواذ عملاء محسوبة وقابلة للتوسع' : 'Predictable CAC aligned with capacity',
      ],
      mockup: (
        <div className="bg-black/90 rounded-xl border border-white/10 w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <CircleDollarSign size={13} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
                  {isAr ? 'مقارنة اقتصاديات الاستحواذ' : 'Acquisition Unit Economics'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'الرسوم الشهرية مقابل PontLook' : 'Traditional Retainer vs PontLook'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'عائد مضمون' : 'Guaranteed ROI'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="text-[9px] text-neutral-400 uppercase font-mono font-medium">{isAr ? 'الاشتراك الشهري التقليدي' : 'Traditional Retainer'}</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-400 line-through mt-0.5">$3,500 / {isAr ? 'شهر' : 'mo'}</div>
              <div className="text-[9px] text-neutral-400 mt-0.5">{isAr ? 'نتائج غير مضمونة' : 'Zero output guarantee'}</div>
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.08] border border-white/20">
              <div className="text-[9px] text-white uppercase font-mono font-semibold">{isAr ? 'نموذج PontLook' : 'PontLook Model'}</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">$0 {isAr ? 'اشتراك' : 'Retainer'}</div>
              <div className="text-[9px] text-white mt-0.5 font-medium">{isAr ? 'دفع فقط عند استلام الفرصة' : 'Pay strictly per lead'}</div>
            </div>
          </div>

          <div className="text-[10px] text-neutral-300 flex items-center gap-1.5 pt-1 border-t border-white/[0.06]">
            <CheckCircle2 size={12} className="text-white shrink-0" />
            <span className="truncate">{isAr ? 'استبدال أي فرصة غير مطابقة خلال 48 ساعة' : 'SLA: Instant replacement for any disputed lead within 48h'}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'qualified-buyers',
      index: '02',
      icon: Target,
      badge: isAr ? 'معايير BANT التنفيذية' : 'BANT Verified',
      title: isAr ? 'عملاء مؤسسيون تم تأهيل احتياجاتهم' : 'Qualified Enterprise Buyers',
      angle: isAr ? 'صلاحيات ميزانية معتمدة واحتياجات دقيقة' : 'Confirmed Budget Authority & Strategic Scope',
      body: isAr
        ? 'كل فرصة تدريبية تتضمن احتياجاً مؤسسياً مؤكداً، وصلاحية قرار واضحة، ومتطلبات متوافقة مع أهداف التوطين أو التحول الرقمي أو القيادة.'
        : 'Every lead has confirmed corporate training needs, authority, and explicit problem definitions tied to Saudization, Emiratization, or digital upskilling.',
      takeaways: [
        isAr ? 'تواصل مباشر مع رؤساء الموارد والتدريب' : 'Direct engagement with CHROs & VP HR',
        isAr ? 'معرفة مسبقة بحجم المجموعات والميزانية' : 'Pre-scoped cohort sizes & budget range',
        isAr ? 'تجنب المكالمات الاستكشافية غير المجدية' : 'Zero wasted meetings with unbudgeted leads',
      ],
      mockup: (
        <div className="bg-black/90 rounded-xl border border-white/10 w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <Target size={13} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
                  {isAr ? 'بطاقة تأهيل الفرصة المؤسسية' : 'Enterprise Lead Dossier'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'عينة من بيانات الفرصة المسلمة' : 'Sample Verified Lead Specification'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'مؤهل تنفيذي' : 'Tier-A Qualified'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="text-neutral-400 text-[11px]">{isAr ? 'صانع القرار المستهدف:' : 'Decision Maker:'}</span>
              <span className="text-white font-medium text-xs">{isAr ? 'نائب رئيس الموارد البشرية' : 'VP of HR (Riyadh)'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="text-neutral-400 text-[11px]">{isAr ? 'المجال التدريبي:' : 'Training Domain:'}</span>
              <span className="text-white font-medium text-xs">{isAr ? 'تطوير القيادات التنفيذية' : 'Executive Leadership'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.08] border border-white/20">
              <span className="text-neutral-300 text-[11px]">{isAr ? 'حجم الفوج والميزانية:' : 'Cohort & Budget:'}</span>
              <span className="text-white font-semibold text-xs">35 {isAr ? 'متدرب' : 'execs'} · SAR 120k+</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'consistent-pipeline',
      index: '03',
      icon: TrendingUp,
      badge: isAr ? 'استقرار الإيرادات' : 'Revenue Predictability',
      title: isAr ? 'تدفق مستمر لفرص الأعمال' : 'Consistent Pipeline',
      angle: isAr ? 'توزيع ذكي للطلب المؤسسي على مدار الفصول' : 'Multi-City GCC Inflow Across All Quarters',
      body: isAr
        ? 'حافظ على استمرارية ونمو أعمالك على مدار العام، وتجاوز فترات الركود الموسمي عبر استقبال طلبات مؤكدة وجاهزة للتعاقد.'
        : 'Keep your business development active and predictable throughout the year, even during delivery seasons.',
      takeaways: [
        isAr ? 'توجيه آلي للطلبات المتوافقة مع تخصصك' : 'Algorithmic routing matching credentials',
        isAr ? 'تغطية واسعة: الرياض، جدة، دبي، أبوظبي' : 'Active coverage across Riyadh, Dubai, etc.',
        isAr ? 'التركيز 100% على التميز في التدريب' : 'Focus 100% on delivery excellence',
      ],
      mockup: (
        <div className="bg-black/90 rounded-xl border border-white/10 w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <TrendingUp size={13} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
                  {isAr ? 'جدول توزيع الفرص الفصلي' : 'Quarterly Opportunity Schedule'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'توزيع تدفق الطلبات عبر الفصول' : 'Active Intake Distribution'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'طلب نشط' : 'Active Demand'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="text-[9px] text-neutral-400 font-mono">Q1 (Jan-Mar)</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">14 {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-neutral-400">{isAr ? 'القيادات' : 'Leadership'}</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="text-[9px] text-neutral-400 font-mono">Q2 (Apr-Jun)</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">19 {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-neutral-400">{isAr ? 'التحول' : 'Digital Ops'}</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white/[0.08] border border-white/20">
              <div className="text-[9px] text-white font-mono font-semibold">Q3-Q4</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">25+ {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-neutral-300">{isAr ? 'التوطين' : 'Localization'}</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const isClickLocked = useRef(false);
  const clickUnlockTimer = useRef<NodeJS.Timeout | null>(null);

  /* Scroll-spy tracking for desktop Attio-style pinning */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 112px', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isClickLocked.current) return;
    if (latest < 0.33) {
      setActiveStep(0);
    } else if (latest < 0.67) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    isClickLocked.current = true;

    if (clickUnlockTimer.current) {
      clearTimeout(clickUnlockTimer.current);
    }

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const totalScrollable = Math.max(0, containerRef.current.offsetHeight - window.innerHeight);

      // Target position for step 0, 1, 2
      const targetRatio = index === 0 ? 0.05 : index === 1 ? 0.5 : 0.95;
      const targetScroll = containerTop + targetRatio * totalScrollable;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }

    // Keep locked for 1800ms during smooth scroll
    clickUnlockTimer.current = setTimeout(() => {
      isClickLocked.current = false;
    }, 1800);
  }, []);

  // Unlock immediately upon manual wheel or touch scroll
  useEffect(() => {
    const handleUserScroll = () => {
      if (isClickLocked.current) {
        isClickLocked.current = false;
        if (clickUnlockTimer.current) clearTimeout(clickUnlockTimer.current);
      }
    };

    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      if (clickUnlockTimer.current) clearTimeout(clickUnlockTimer.current);
    };
  }, []);

  const currentBenefit = benefits[activeStep] || benefits[0];

  return (
    <div className="w-full">
      {/* Animated Section Header */}
      <div className="mb-8 sm:mb-12 text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
          <span>{isAr ? 'مزايا ونموذج الشراكة' : 'PARTNERSHIP ADVANTAGES'}</span>
        </div>

        <TextReveal
          as="h2"
          text={isAr ? 'كيف تعمل الشراكة ومزايا الانضمام' : 'How the Partnership Works & Key Advantages'}
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-tight"
        />

        <p className="text-sm sm:text-base text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'نموذج دفع حصري لكل فرصة مؤهلة بدون اشتراكات شهرية، مع ضمانات استبدال صارمة وتدفق مستمر للطلبات المؤسسية.'
            : 'Performance-based growth with zero retainers. Explore our unit economics, buyer qualification rubric, and pipeline consistency.'}
        </p>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP ATTIO-STYLE STICKY SCROLL SECTION                     */}
      {/* ============================================================== */}
      <div ref={containerRef} className="hidden lg:block relative min-h-[280vh]">
        <div className="sticky top-28 xl:top-32 w-full">
          <div className="grid grid-cols-12 gap-6 xl:gap-8 2xl:gap-10 items-center">
            {/* Left Column: Attio-style Navigation Titles in Orange (Minimized) */}
            <div className="col-span-4 xl:col-span-4 2xl:col-span-4 flex flex-col space-y-3">
              {benefits.map((b, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className="group relative flex items-start gap-3 text-start w-full py-1.5 transition-all duration-300 outline-none cursor-pointer"
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {/* Vertical Indicator Bar: Proportional height */}
                    <div
                      className={`w-1 rounded-full transition-all duration-300 shrink-0 ${
                        isActive
                          ? 'h-9 sm:h-10 bg-[#FF5C00]'
                          : 'h-5 sm:h-6 bg-white/10 group-hover:bg-white/20'
                      }`}
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-mono text-[11px] transition-colors duration-300 ${
                            isActive ? 'text-[#FF5C00] font-bold' : 'text-neutral-500'
                          }`}
                        >
                          {b.index}
                        </span>
                        <span
                          className={`text-[10px] font-mono tracking-wider uppercase transition-colors duration-300 ${
                            isActive ? 'text-[#FF5C00]/90 font-medium' : 'text-neutral-500'
                          }`}
                        >
                          {b.badge}
                        </span>
                      </div>

                      {/* Main Title: Minimized scale, elegant font size */}
                      <div
                        className={`font-heading text-sm sm:text-base lg:text-lg font-medium tracking-tight transition-colors duration-300 mt-0.5 leading-snug ${
                          isActive
                            ? 'text-[#FF5C00] font-semibold'
                            : 'text-neutral-500 group-hover:text-neutral-300'
                        }`}
                      >
                        {b.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Free-standing content panel (no card chrome) */}
            <div className="col-span-8 xl:col-span-8 2xl:col-span-8">
              <div className="relative min-h-[380px] sm:min-h-[400px] lg:min-h-[430px] xl:min-h-[450px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <m.div
                    key={currentBenefit.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.24, ease: ease.out }}
                    className="relative z-10 flex flex-col justify-between h-full space-y-4"
                  >
                    {/* Top Content Area: Monochrome Header & Angle */}
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/15 text-neutral-300 text-[10px] sm:text-[11px] font-mono font-medium">
                        <span>{currentBenefit.badge}</span>
                      </div>

                      <h3 className="font-heading text-base sm:text-lg lg:text-xl font-semibold text-white tracking-tight leading-tight mt-1.5">
                        {currentBenefit.angle}
                      </h3>

                      <p className="mt-1 text-xs sm:text-[13px] text-neutral-400 font-sans leading-relaxed max-w-xl font-normal">
                        {currentBenefit.body}
                      </p>
                    </div>

                    {/* Middle: Takeaways in crisp Black & White */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2.5 border-t border-white/[0.08]">
                      {currentBenefit.takeaways.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-neutral-300 font-sans">
                          <CheckCircle2 size={12} className="text-white shrink-0 mt-0.5" />
                          <span className="leading-snug text-neutral-300">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom: Mockup Widget in pure Black & White */}
                    <div>
                      {currentBenefit.mockup}
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE / TABLET VIEW (Segmented Tab Bar + Card View)           */}
      {/* ============================================================== */}
      <div className="lg:hidden space-y-4">
        {/* Mobile Tab Control with Orange active indicator */}
        <div className="flex items-center justify-between gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
          {benefits.map((b, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all duration-200 outline-none text-xs font-medium ${
                  isActive
                    ? 'bg-black text-[#FF5C00] font-semibold border border-[#FF5C00]/30 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="font-mono text-[9px] block opacity-80">{b.index}</span>
                <span className="truncate block mt-0.5 text-[11px]">{b.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile free-standing content (no card chrome) */}
        <div className="relative space-y-3.5">
          <AnimatePresence mode="wait">
            <m.div
              key={currentBenefit.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: ease.out }}
              className="space-y-3"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/15 text-neutral-300 text-[10px] font-mono font-medium">
                  <span>{currentBenefit.badge}</span>
                </div>

                <h3 className="font-heading text-base font-semibold text-white tracking-tight mt-2 leading-snug">
                  {currentBenefit.angle}
                </h3>

                <p className="mt-1 text-xs text-neutral-400 font-sans leading-relaxed">
                  {currentBenefit.body}
                </p>
              </div>

              {/* Takeaways list */}
              <div className="space-y-1.5 pt-2.5 border-t border-white/[0.08]">
                {currentBenefit.takeaways.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                    <CheckCircle2 size={12} className="text-white shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              {/* Mockup */}
              <div>
                {currentBenefit.mockup}
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
