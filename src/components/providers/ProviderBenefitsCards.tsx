'use client';

import React, { useState, useRef, useCallback } from 'react';
import { m, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
  CircleDollarSign,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from '@/components/icons';
import TextReveal from '@/components/shared/TextReveal';
import ConsoleDialog, { type ConsoleRecord } from '@/components/shared/ConsoleDialog';
import { ease } from '@/lib/motion';

interface ProviderBenefitsCardsProps {
  lang: string;
}

export default function ProviderBenefitsCards({ lang }: ProviderBenefitsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const isUserClicking = useRef(false);

  const benefits: ConsoleRecord[] = [
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
        isAr ? 'انعدام الالتزامات التعاقدية الطويلة أو رسوم الوكالات التقليدية' : 'No binding annual contracts or recurring agency retainer fees',
        isAr ? 'ضمان استبدال فوري 100% لأي فرصة لا تطابق شروط التأهيل المعتمدة' : '100% instant lead replacement SLA for non-qualifying contacts',
        isAr ? 'تكلفة استحواذ عملاء محسوبة بدقة وقابلة للتوسع وفق طاقتك الاستيعابية' : 'Predictable CAC scaling directly aligned with your delivery bandwidth',
      ],
      mockup: (
        <div className="bg-black/90 rounded-2xl border border-white/10 w-full p-4 sm:p-5 flex flex-col gap-3 font-sans shadow-lg">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <CircleDollarSign size={15} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white leading-tight">
                  {isAr ? 'مقارنة اقتصاديات الاستحواذ' : 'Acquisition Unit Economics'}
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-400">
                  {isAr ? 'الرسوم الشهرية مقابل PontLook' : 'Traditional Retainer vs PontLook'}
                </div>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'عائد استثماري مضمون' : 'Guaranteed ROI'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[10px] text-neutral-400 uppercase font-mono font-medium">{isAr ? 'الاشتراك الشهري التقليدي' : 'Traditional Retainer'}</div>
              <div className="text-sm sm:text-base font-semibold text-neutral-400 line-through mt-1">$3,500 / {isAr ? 'شهر' : 'mo'}</div>
              <div className="text-[10px] text-neutral-400 mt-1">{isAr ? 'نتائج غير مضمونة' : 'Zero output guarantee'}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.08] border border-white/20">
              <div className="text-[10px] text-white uppercase font-mono font-semibold">{isAr ? 'نموذج PontLook' : 'PontLook Model'}</div>
              <div className="text-sm sm:text-base font-bold text-white mt-1">$0 {isAr ? 'اشتراك' : 'Retainer'}</div>
              <div className="text-[10px] text-white mt-1 font-medium">{isAr ? 'دفع فقط عند استلام الفرصة' : 'Pay strictly per lead'}</div>
            </div>
          </div>

          <div className="text-[11px] text-neutral-300 flex items-center gap-2 pt-1 border-t border-white/[0.06]">
            <CheckCircle2 size={13} className="text-white shrink-0" />
            <span className="truncate">{isAr ? 'اتفاقية مستوى الخدمة: استبدال أي فرصة غير مطابقة خلال 48 ساعة' : 'SLA: Instant replacement for any disputed lead within 48h'}</span>
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
        isAr ? 'التواصل المباشر مع رؤساء الموارد البشرية ومدراء التدريب والتطوير' : 'Direct engagement with CHROs, VP HR, and Heads of L&D',
        isAr ? 'معرفة مسبقة بحجم المجموعات، المدينة المستهدفة، والميزانية المخصصة' : 'Pre-scoped cohort sizes, delivery city, and approved budget range',
        isAr ? 'تجنب المكالمات الاستكشافية غير المجدية مع جهات غير جادة' : 'Zero wasted discovery meetings with unbudgeted prospects',
      ],
      mockup: (
        <div className="bg-black/90 rounded-2xl border border-white/10 w-full p-4 sm:p-5 flex flex-col gap-3 font-sans shadow-lg">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <Target size={15} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white leading-tight">
                  {isAr ? 'بطاقة تأهيل الفرصة المؤسسية' : 'Enterprise Lead Dossier'}
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-400">
                  {isAr ? 'عينة من بيانات الفرصة المسلمة' : 'Sample Verified Lead Specification'}
                </div>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'مؤهل تنفيذي' : 'Tier-A Qualified'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-neutral-400">{isAr ? 'صانع القرار المستهدف:' : 'Decision Maker:'}</span>
              <span className="text-white font-medium">{isAr ? 'نائب رئيس الموارد البشرية' : 'VP of HR (Riyadh)'}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-neutral-400">{isAr ? 'المجال التدريبي:' : 'Training Domain:'}</span>
              <span className="text-white font-medium">{isAr ? 'تطوير القيادات التنفيذية' : 'Executive Leadership'}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.08] border border-white/20">
              <span className="text-neutral-300">{isAr ? 'حجم الفوج والميزانية:' : 'Cohort & Budget:'}</span>
              <span className="text-white font-semibold">35 {isAr ? 'متدرب' : 'execs'} · SAR 120k+</span>
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
        isAr ? 'توجيه آلي للطلبات المتوافقة مع تخصص وخبرة مدربيك' : 'Algorithmic routing matching your exact facilitator credentials',
        isAr ? 'تغطية واسعة لكبرى المراكز التجارية: الرياض، جدة، دبي، وأبوظبي' : 'Active coverage across Riyadh, Jeddah, Dubai, and Abu Dhabi',
        isAr ? 'التركيز 100% على تقديم المحتوى عالي القيمة بدلاً من البحث البارد' : 'Focus 100% on delivery excellence while PontLook fuels business dev',
      ],
      mockup: (
        <div className="bg-black/90 rounded-2xl border border-white/10 w-full p-4 sm:p-5 flex flex-col gap-3 font-sans shadow-lg">
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <TrendingUp size={15} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-white leading-tight">
                  {isAr ? 'جدول توزيع الفرص الفصلي' : 'Quarterly Opportunity Schedule'}
                </div>
                <div className="text-[10px] sm:text-[11px] text-neutral-400">
                  {isAr ? 'توزيع تدفق الطلبات عبر الفصول' : 'Active Intake Distribution'}
                </div>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'طلب نشط' : 'Active Demand'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[10px] text-neutral-400 font-mono">Q1 (Jan-Mar)</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">14 {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[10px] text-neutral-400">{isAr ? 'القيادات' : 'Leadership'}</div>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[10px] text-neutral-400 font-mono">Q2 (Apr-Jun)</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">19 {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[10px] text-neutral-400">{isAr ? 'التحول' : 'Digital Ops'}</div>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-white/[0.08] border border-white/20">
              <div className="text-[10px] text-white font-mono font-semibold">Q3-Q4</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-1">25+ {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[10px] text-neutral-300">{isAr ? 'التوطين' : 'Localization'}</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  /* Scroll-spy tracking for desktop Attio-style pinning */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isUserClicking.current) return;
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
    isUserClicking.current = true;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const containerTop = rect.top + scrollTop;
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      // Position within the corresponding segment
      const targetPercent = index === 0 ? 0.05 : index === 1 ? 0.5 : 0.95;
      const targetScroll = containerTop + targetPercent * totalScrollable;

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isUserClicking.current = false;
      }, 700);
    }
  }, []);

  const currentBenefit = benefits[activeStep] || benefits[0];

  return (
    <div className="w-full">
      {/* Animated Section Header */}
      <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto space-y-3.5">
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
      <div ref={containerRef} className="hidden lg:block relative min-h-[240vh]">
        <div className="sticky top-28 xl:top-32 w-full">
          <div className="grid grid-cols-12 gap-8 xl:gap-14 items-center">
            {/* Left Column: Attio-style Navigation Titles in Orange */}
            <div className="col-span-5 xl:col-span-4 flex flex-col space-y-5">
              {benefits.map((b, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className="group relative flex items-start gap-3.5 text-start w-full py-2.5 transition-all duration-300 outline-none cursor-pointer"
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {/* Vertical Indicator Bar: Orange when active */}
                    <div
                      className={`w-1 rounded-full transition-all duration-300 shrink-0 ${
                        isActive
                          ? 'h-14 sm:h-16 bg-[#FF5C00]'
                          : 'h-8 sm:h-10 bg-white/10 group-hover:bg-white/20'
                      }`}
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-xs transition-colors duration-300 ${
                            isActive ? 'text-[#FF5C00] font-bold' : 'text-neutral-500'
                          }`}
                        >
                          {b.index}
                        </span>
                        <span
                          className={`text-[11px] font-mono tracking-wider uppercase transition-colors duration-300 ${
                            isActive ? 'text-[#FF5C00]/90 font-semibold' : 'text-neutral-500'
                          }`}
                        >
                          {b.badge}
                        </span>
                      </div>

                      {/* Main Title: Vibrant Orange when active, muted when inactive */}
                      <div
                        className={`font-heading text-xl sm:text-2xl lg:text-[26px] font-semibold tracking-tight transition-colors duration-300 mt-1 leading-snug ${
                          isActive
                            ? 'text-[#FF5C00]'
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

            {/* Right Column: Attio-style Black & White Content Panel */}
            <div className="col-span-7 xl:col-span-8">
              <div className="relative rounded-3xl border border-white/10 bg-[#0B0C10] p-7 xl:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden min-h-[500px] flex flex-col justify-between">
                {/* Subtle Monochrome Tech Dots underlayer */}
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <AnimatePresence mode="wait">
                  <m.div
                    key={currentBenefit.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease: ease.out }}
                    className="relative z-10 flex flex-col justify-between h-full space-y-6"
                  >
                    {/* Top Content Area: Monochrome Header & Angle */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/15 text-neutral-300 text-xs font-mono font-medium">
                        <span>{currentBenefit.badge}</span>
                      </div>

                      <h3 className="font-heading text-2xl xl:text-3xl font-semibold text-white tracking-tight leading-tight mt-3">
                        {currentBenefit.angle}
                      </h3>

                      <p className="mt-2 text-sm xl:text-base text-neutral-400 font-sans leading-relaxed max-w-2xl font-normal">
                        {currentBenefit.body}
                      </p>
                    </div>

                    {/* Middle: Takeaways in crisp Black & White */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.08]">
                      {currentBenefit.takeaways.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs xl:text-[13px] text-neutral-300 font-sans">
                          <CheckCircle2 size={15} className="text-white shrink-0 mt-0.5" />
                          <span className="leading-snug text-neutral-300">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom: Mockup Widget in pure Black & White */}
                    <div className="pt-2">
                      {currentBenefit.mockup}
                    </div>

                    {/* Footer Trigger to open full console breakdown modal */}
                    <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => setActiveModalId(currentBenefit.id)}
                        className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>{isAr ? 'عرض المواصفات والضمانات الكاملة' : 'Inspect full specifications & SLAs'}</span>
                        <ArrowRight size={13} className="rtl:-scale-x-100" />
                      </button>

                      <span className="text-[11px] font-mono text-neutral-500">
                        {currentBenefit.index} / 03
                      </span>
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
      <div className="lg:hidden space-y-6">
        {/* Mobile Tab Control with Orange active indicator */}
        <div className="flex items-center justify-between gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-2xl">
          {benefits.map((b, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex-1 py-2 px-2 rounded-xl text-center transition-all duration-200 outline-none text-xs font-medium ${
                  isActive
                    ? 'bg-black text-[#FF5C00] font-semibold border border-[#FF5C00]/30 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="font-mono text-[10px] block opacity-80">{b.index}</span>
                <span className="truncate block mt-0.5">{b.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Black & White Card */}
        <div className="relative rounded-2xl border border-white/10 bg-[#0B0C10] p-5 shadow-xl overflow-hidden space-y-5">
          <AnimatePresence mode="wait">
            <m.div
              key={currentBenefit.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: ease.out }}
              className="space-y-4"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/15 text-neutral-300 text-[11px] font-mono font-medium">
                  <span>{currentBenefit.badge}</span>
                </div>

                <h3 className="font-heading text-lg font-semibold text-white tracking-tight mt-2.5 leading-snug">
                  {currentBenefit.angle}
                </h3>

                <p className="mt-1.5 text-xs text-neutral-400 font-sans leading-relaxed">
                  {currentBenefit.body}
                </p>
              </div>

              {/* Takeaways list */}
              <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                {currentBenefit.takeaways.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                    <CheckCircle2 size={13} className="text-white shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              {/* Mockup */}
              <div>
                {currentBenefit.mockup}
              </div>

              {/* Modal trigger */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModalId(currentBenefit.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  <span>{isAr ? 'عرض المواصفات والضمانات' : 'Inspect breakdown & SLAs'}</span>
                  <ArrowRight size={12} className="rtl:-scale-x-100" />
                </button>
                <span className="text-[10px] font-mono text-neutral-500">
                  {currentBenefit.index} / 03
                </span>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Dialog for detailed inspection */}
      <ConsoleDialog
        records={benefits}
        activeId={activeModalId}
        onClose={() => setActiveModalId(null)}
        onSelect={setActiveModalId}
        isAr={isAr}
        accent="brand"
        copy={{
          takeawaysTitle: isAr ? 'المزايا والشروط المعتمدة' : 'GUARANTEED ADVANTAGES & SLAS',
          hint: isAr ? 'انقر خارج النافذة أو زر Esc للإغلاق' : 'Click outside or press Esc to close',
          closeLabel: isAr ? 'إغلاق النافذة' : 'Close window',
          ctaLabel: isAr ? 'قدم كشريك تدريب معتمد' : 'Apply as Verified Provider',
          ctaHref: `/${lang}/for-providers/apply`,
        }}
      />
    </div>
  );
}
