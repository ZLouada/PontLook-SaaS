'use client';

import React, { useState, useRef, useCallback } from 'react';
import { m, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
  SlidersHorizontal,
  BadgeCheck,
  Scale,
  CheckCircle2,
} from '@/components/icons';
import TextReveal from '@/components/shared/TextReveal';
import { ease } from '@/lib/motion';

interface StepItem {
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

interface FindTrainingStepsCardsProps {
  lang: string;
}

export default function FindTrainingStepsCards({ lang }: FindTrainingStepsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isUserClicking = useRef(false);

  const steps: StepItem[] = [
    {
      id: 'step-specify',
      index: '01',
      icon: SlidersHorizontal,
      badge: isAr ? 'استيعاب دقيق' : 'Rapid Scoping',
      title: isAr ? 'حدد المتطلبات والاحتياج' : 'Specify Training Needs',
      angle: isAr ? 'استبيان تفاعلي خلال 60 ثانية بدون تعقيدات' : '60-Second Interactive Intake',
      body: isAr
        ? 'حدد المهارات المستهدفة، أسلوب التدريب (حضوري أو افتراضي)، المدينة، وحجم الفريق في نموذج تفاعلي ومباشر.'
        : 'Define your targeted skills, delivery mode, city, and cohort size in our 60 second interactive questionnaire. No tedious RFP drafting.',
      takeaways: [
        isAr ? 'تغطية متخصصة لأكثر من 20 مجالاً تدريبياً معتمداً' : 'Specialized coverage across 20+ training domains',
        isAr ? 'تخصيص فوري: الرياض، جدة، دبي، أو عن بُعد' : 'Targeted city selection across GCC & live remote',
        isAr ? 'مواءمة أهداف البرنامج مع مؤشرات التوطين والتحول' : 'Aligned with Saudization & tech upskilling KPIs',
      ],
      mockup: (
        <div className="bg-black/90 rounded-xl border border-white/10 w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <SlidersHorizontal size={13} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
                  {isAr ? 'ملف كراسة التدريب المؤسسي' : 'Enterprise RFP Intake Brief'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'بيانات الاحتياج المسجلة' : 'Submitted Scope Specifications'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'جاهز للمطابقة' : 'Intake Ready'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="text-neutral-400 text-[11px]">{isAr ? 'المجال المستهدف:' : 'Domain:'}</span>
              <span className="text-white font-medium text-xs">{isAr ? 'القيادة التنفيذية وإدارة التغيير' : 'Executive Leadership & Change'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="text-neutral-400 text-[11px]">{isAr ? 'الموقع والفوج:' : 'Location & Cohort:'}</span>
              <span className="text-neutral-200 font-medium text-xs">{isAr ? 'حضوري بالرياض · 25 متدرب' : 'Onsite Riyadh · 25 Executives'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.08] border border-white/20">
              <span className="text-neutral-300 text-[11px]">{isAr ? 'الجدول الزمني:' : 'Target Timeline:'}</span>
              <span className="text-white font-semibold text-xs">{isAr ? 'خلال الربع القادم' : 'Upcoming Quarter Start'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step-matching',
      index: '02',
      icon: BadgeCheck,
      badge: isAr ? 'فحص واعتماد الخبراء' : 'Dual-Screening Vetting',
      title: isAr ? 'المطابقة والتحقق من المدربين' : 'Matching & Faculty Vetting',
      angle: isAr ? 'فرز أكثر من 120 مزود معتمد لضمان نخبة الميسرين' : 'Screening 120+ Accredited GCC Entities',
      body: isAr
        ? 'يفحص فريقنا المختص أكثر من 120 مزود تدريب معتمد لاختيار أفضل المدربين أصحاب السجلات والإنجازات الموثوقة.'
        : 'Our matching desk screens 120+ accredited providers to select facilitators with verified enterprise outcomes and verified credentials.',
      takeaways: [
        isAr ? 'تحقق مستقل من سجلات المدربين والشهادات' : 'Independent verification of facilitator records',
        isAr ? 'مراجعة تقييمات المشاركين في برامج سابقة' : 'Review of historical participant ratings in GCC',
        isAr ? 'سرية تامة لبيانات مسؤولي الموارد البشرية' : 'Zero cold spam; total decision maker privacy',
      ],
      mockup: (
        <div className="bg-black/90 rounded-xl border border-white/10 w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <BadgeCheck size={13} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
                  {isAr ? 'معايير فحص واعتماد المزود' : 'Provider Vetting Scorecard'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'مؤشرات جودة التدريب المعتمدة' : 'Compliance & Quality Standards'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'معتمد 100%' : '100% Vetted'}
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="text-neutral-400 text-[11px]">{isAr ? 'اعتماد المنشأة والترخيص المهني:' : 'Accredited Corporate Entity:'}</span>
              <span className="text-white font-medium text-xs flex items-center gap-1">
                <CheckCircle2 size={12} className="text-white" /> {isAr ? 'مرخص ومعتمد' : 'Verified Entity'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="text-neutral-400 text-[11px]">{isAr ? 'خبرة المدرب التنفيذي:' : 'Facilitator Seniority:'}</span>
              <span className="text-white font-medium text-xs flex items-center gap-1">
                <CheckCircle2 size={12} className="text-white" /> 10+ {isAr ? 'سنوات بالخليج' : 'Yrs GCC'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.08] border border-white/20">
              <span className="text-neutral-300 text-[11px]">{isAr ? 'معدل رضا المتدربين السابق:' : 'Historical Satisfaction:'}</span>
              <span className="text-white font-semibold text-xs flex items-center gap-1">
                <CheckCircle2 size={12} className="text-white" /> 4.9 / 5.0
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step-compare',
      index: '03',
      icon: Scale,
      badge: isAr ? 'مقارنة شفافة' : 'Proposal Comparison',
      title: isAr ? 'استلم وقارن العروض' : 'Compare Itemized Proposals',
      angle: isAr ? '2 إلى 3 عروض مفصلة خلال 48 ساعة وبدون أي التزام' : '2 to 3 Proposals in 48h · Zero Obligation',
      body: isAr
        ? 'استلم من 2 إلى 3 عروض مفصلة خلال 48 ساعة متضمنة خطط البرامج والتكاليف الشفافة، وبدون أي التزام بالشراء.'
        : 'Receive 2 to 3 tailored proposals within 48 hours with custom syllabi, transparent pricing, and zero purchase obligation.',
      takeaways: [
        isAr ? 'عروض أسعار مفصلة بالبنود بدون رسوم مخفية' : 'Itemized line-by-line budgets, zero surprises',
        isAr ? 'حرية كاملة في تقييم واختيار العرض الأنسب' : '100% freedom to review with zero pressure',
        isAr ? 'خدمة مجانية 100% للمنشآت الباحثة عن تدريب' : '100% free matchmaking for enterprise buyers',
      ],
      mockup: (
        <div className="bg-black/90 rounded-xl border border-white/10 w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans shadow-md">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-white/10 text-white flex items-center justify-center font-bold border border-white/15">
                <Scale size={13} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
                  {isAr ? 'جدول مقارنة العروض المتطابقة' : 'Comparative Proposal Matrix'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'عروض معتمدة خلال 48 ساعة' : 'Standardized Evaluation Grid'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white border border-white/20">
              {isAr ? 'مواءمة الميزانية' : 'Budget Fit'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
              <div className="text-[9px] text-neutral-400 uppercase font-mono font-medium">{isAr ? 'العرض أ' : 'Proposal Alpha'}</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{isAr ? 'ورش مكثفة حضوري' : 'Intensive Onsite'}</div>
              <div className="text-[9px] text-neutral-300 mt-0.5">{isAr ? 'مطابقة تامة للميزانية' : 'Target Budget Match'}</div>
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.08] border border-white/20">
              <div className="text-[9px] text-white uppercase font-mono font-semibold">{isAr ? 'العرض ب' : 'Proposal Beta'}</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{isAr ? 'تدريب هجين + مشاريع' : 'Blended + Projects'}</div>
              <div className="text-[9px] text-white mt-0.5">{isAr ? 'تأهيل كفاءات ممتد' : 'Extended Follow-up'}</div>
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

  const currentStep = steps[activeStep] || steps[0];

  return (
    <div className="w-full">
      {/* Animated Section Header */}
      <div className="mb-6 sm:mb-8 text-center max-w-3xl mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
          <span>{isAr ? 'خطوات الحصول على التدريب' : 'HOW IT WORKS'}</span>
        </div>

        <TextReveal
          as="h2"
          text={isAr ? '3 خطوات بسيطة للحصول على تدريب معتمد' : '3 Simple Steps to Proven Training'}
          className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-heading tracking-tight leading-tight"
        />

        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-xl mx-auto leading-relaxed">
          {isAr
            ? 'مسار منظم يختصر أسابيع من البحث عن جهات التدريب، مع معايير تدقيق صارمة وشفافية كاملة في العروض.'
            : 'A streamlined matchmaking process saving weeks of vendor searching. Explore our vetting rubric, cohort scoping, and proposal transparency.'}
        </p>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP ATTIO-STYLE STICKY SCROLL SECTION                     */}
      {/* ============================================================== */}
      <div ref={containerRef} className="hidden lg:block relative min-h-[200vh]">
        <div className="sticky top-20 xl:top-24 w-full">
          <div className="grid grid-cols-12 gap-6 xl:gap-10 items-center">
            {/* Left Column: Attio-style Navigation Titles in Orange (Minimized) */}
            <div className="col-span-5 xl:col-span-4 flex flex-col space-y-3.5">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className="group relative flex items-start gap-3 text-start w-full py-1.5 transition-all duration-300 outline-none cursor-pointer"
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {/* Vertical Indicator Bar: Proportional height */}
                    <div
                      className={`w-1 rounded-full transition-all duration-300 shrink-0 ${
                        isActive
                          ? 'h-10 sm:h-12 bg-[#FF5C00]'
                          : 'h-6 sm:h-7 bg-white/10 group-hover:bg-white/20'
                      }`}
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-mono text-[11px] transition-colors duration-300 ${
                            isActive ? 'text-[#FF5C00] font-bold' : 'text-neutral-500'
                          }`}
                        >
                          {s.index}
                        </span>
                        <span
                          className={`text-[10px] font-mono tracking-wider uppercase transition-colors duration-300 ${
                            isActive ? 'text-[#FF5C00]/90 font-medium' : 'text-neutral-500'
                          }`}
                        >
                          {s.badge}
                        </span>
                      </div>

                      {/* Main Title: Minimized scale, elegant font size */}
                      <div
                        className={`font-heading text-base sm:text-lg lg:text-xl font-medium tracking-tight transition-colors duration-300 mt-0.5 leading-snug ${
                          isActive
                            ? 'text-[#FF5C00] font-semibold'
                            : 'text-neutral-500 group-hover:text-neutral-300'
                        }`}
                      >
                        {s.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Attio-style Black & White Content Panel (Calibrated scale) */}
            <div className="col-span-7 xl:col-span-8">
              <div className="relative rounded-2xl border border-white/10 bg-[#0B0C10] p-5 sm:p-6 lg:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden flex flex-col justify-between">
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
                    key={currentStep.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.24, ease: ease.out }}
                    className="relative z-10 flex flex-col justify-between h-full space-y-4"
                  >
                    {/* Top Content Area: Monochrome Header & Angle */}
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/15 text-neutral-300 text-[11px] font-mono font-medium">
                        <span>{currentStep.badge}</span>
                      </div>

                      <h3 className="font-heading text-lg sm:text-xl lg:text-2xl font-semibold text-white tracking-tight leading-tight mt-2">
                        {currentStep.angle}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-xl font-normal">
                        {currentStep.body}
                      </p>
                    </div>

                    {/* Middle: Takeaways in crisp Black & White */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/[0.08]">
                      {currentStep.takeaways.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                          <CheckCircle2 size={13} className="text-white shrink-0 mt-0.5" />
                          <span className="leading-snug text-neutral-300">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom: Mockup Widget in pure Black & White */}
                    <div>
                      {currentStep.mockup}
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
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all duration-200 outline-none text-xs font-medium ${
                  isActive
                    ? 'bg-black text-[#FF5C00] font-semibold border border-[#FF5C00]/30 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <span className="font-mono text-[9px] block opacity-80">{s.index}</span>
                <span className="truncate block mt-0.5 text-[11px]">{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Black & White Card */}
        <div className="relative rounded-xl border border-white/10 bg-[#0B0C10] p-4 shadow-xl overflow-hidden space-y-3.5">
          <AnimatePresence mode="wait">
            <m.div
              key={currentStep.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: ease.out }}
              className="space-y-3"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/15 text-neutral-300 text-[10px] font-mono font-medium">
                  <span>{currentStep.badge}</span>
                </div>

                <h3 className="font-heading text-base font-semibold text-white tracking-tight mt-2 leading-snug">
                  {currentStep.angle}
                </h3>

                <p className="mt-1 text-xs text-neutral-400 font-sans leading-relaxed">
                  {currentStep.body}
                </p>
              </div>

              {/* Takeaways list */}
              <div className="space-y-1.5 pt-2.5 border-t border-white/[0.08]">
                {currentStep.takeaways.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-neutral-300 font-sans">
                    <CheckCircle2 size={12} className="text-white shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>

              {/* Mockup */}
              <div>
                {currentStep.mockup}
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
