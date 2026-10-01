'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight, CheckCircle2 } from '@/components/icons';
import { m, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import BorderBeam from '@/components/shared/BorderBeam';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import BorderGlow from '@/components/shared/BorderGlow';
import { ease, dur } from '@/lib/motion';

export default function HowItWorks() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const [activeStep, setActiveStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Re-engineered Garage Shutter Roll-Down (top-to-bottom unroll, zero voids)
  const shutterPercent = useTransform(scrollYProgress, [0, 0.40], [100, 0]);
  const shutterClip = useTransform(shutterPercent, (p) => `inset(0% 0% ${p}% 0%)`);

  // Spring Pop-Up Content (starts only after shutter is 80% down, zero cut-off cards)
  const contentOpacity = useTransform(scrollYProgress, [0.32, 0.50], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.32, 0.52], [0.94, 1]);
  const contentY = useTransform(scrollYProgress, [0.32, 0.52], [28, 0]);

  // Leading bottom rim line
  const lipY = useTransform(scrollYProgress, [0, 0.40], ['0%', '100%']);
  const lipOpacity = useTransform(scrollYProgress, [0.02, 0.08, 0.38, 0.42], [0, 1, 1, 0]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minDistance = 45;

    if (Math.abs(distance) < minDistance) return;

    if (isAr) {
      if (distance > minDistance) {
        setActiveStep((prev) => (prev === 0 ? 2 : prev - 1));
      } else {
        setActiveStep((prev) => (prev + 1) % 3);
      }
    } else {
      if (distance > minDistance) {
        setActiveStep((prev) => (prev + 1) % 3);
      } else {
        setActiveStep((prev) => (prev === 0 ? 2 : prev - 1));
      }
    }
  };

  const steps = [
    // Step 01 - Demand Detection
    {
      id: 'step1',
      stepNumber: '01',
      navTitle: isAr ? 'رصد الاحتياج' : 'Demand Detection',
      tag: isAr ? 'الخطوة 01 // رصد الاحتياج المؤسسي' : 'STEP 01 // DEMAND DETECTION',
      tagColor: 'text-neutral-400',
      headline: isAr
        ? 'رصد احتياجات التدريب المؤسسي المؤكدة قبل طرحها في السوق'
        : 'Detect verified enterprise training demand before it goes public',
      desc: isAr
        ? 'نرصد باستمرار مؤشرات التوظيف، وإعادة الهيكلة، وفجوات الكفاءات عبر الشركات في السعودية والإمارات بميزانيات معتمدة ومؤكدة.'
        : 'Continuous market intelligence detecting workforce restructuring and capability gaps with confirmed corporate budgets.',
      canvasBg: 'bg-[#16171B] border-[#26282D]',
      console: (
        <div className="w-full bg-[#0F1013] rounded-xl border border-[#26282D] p-3 sm:p-4 shadow-2xl space-y-2 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D] text-xs">
            <span className="text-neutral-400 text-[11px] font-medium">
              {isAr ? 'رادار الاحتياج المؤسسي' : 'Enterprise Demand Feed'}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-neutral-200 text-[10px] font-medium">
              <Signal tone="white" size={12} />
              <span>{isAr ? 'إشارة نشطة' : 'Active Signal'}</span>
            </div>
          </div>

          {/* Lead Item 1 */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#16171B] border border-[#26282D] space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                {isAr ? 'الخدمات المالية والمصرفية · الرياض' : 'Banking & FinTech · Riyadh'}
              </span>
              <span className="font-bold text-neutral-100 tabular-nums">SAR 450,000+</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>{isAr ? '1,200+ موظف' : '1,200+ Employees'}</span>
              <span className="text-neutral-300 font-medium">
                {isAr ? 'أولوية عاجلة · القيادة التنفيذية' : 'High Intent · Executive Leadership'}
              </span>
            </div>
          </div>

          {/* Lead Item 2 */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#16171B] border border-[#26282D] space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                {isAr ? 'الطاقة والبنية التحتية · الظهران' : 'Energy & Infrastructure · Dhahran'}
              </span>
              <span className="font-bold text-neutral-200">
                {isAr ? 'ميزانية مؤكدة' : 'Confirmed Budget'}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>{isAr ? 'التحول الرقمي والذكاء الاصطناعي' : 'Digital Transformation & AI'}</span>
              <span className="text-neutral-300 font-medium">
                {isAr ? 'موعد التنفيذ: الربع الثاني' : 'Deployment: Q2'}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    // Step 02 - Fit Scoring
    {
      id: 'step2',
      stepNumber: '02',
      navTitle: isAr ? 'التأهيل والربط' : 'Fit Scoring',
      tag: isAr ? 'الخطوة 02 // التأهيل والربط المعتمد' : 'STEP 02 // FIT SCORING & QUALIFICATION',
      tagColor: 'text-neutral-400',
      headline: isAr
        ? 'تقييم تحليلي وبشري دقيق يطابق المتطلبات الحقيقية مع نخبة الخبراء'
        : 'Deep analyst and human scoring against real enterprise constraints',
      desc: isAr
        ? 'خوارزمية تقييم شاملة تطابق سجل إنجازات المزود، اعتمادات المدربين، ومصادقة رؤساء قطاع الموارد البشرية.'
        : 'Proprietary algorithm evaluating provider track record, trainer credentials, and direct CHRO qualification.',
      canvasBg: 'bg-[#16171B] border-[#26282D]',
      console: (
        <div className="w-full bg-[#0F1013] rounded-xl border border-[#26282D] p-3 sm:p-4 shadow-2xl space-y-2 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D] text-xs">
            <span className="text-neutral-400 text-[11px] font-medium">
              {isAr ? 'منظومة المطابقة والتأهيل' : 'Match & Qualification'}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-white text-xs font-bold">
              <Signal tone="white" size={12} />
              <span>94%</span>
              <span className="text-[10px] font-normal text-neutral-300">{isAr ? 'تطابق' : 'Match'}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-neutral-300 font-medium">
              <span>{isAr ? 'معايير التأهيل المكتملة' : 'Criteria Fulfilled'}</span>
              <span className="font-bold text-white">4 / 4 Complete</span>
            </div>
            <div className="h-1.5 w-full bg-[#16171B] border border-[#26282D] rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-white rounded-full w-[94%]" />
            </div>
          </div>

          {/* Checklist items */}
          <div className="space-y-1 pt-0.5 text-xs text-neutral-300">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#16171B] border border-[#26282D]">
              <span className="truncate block">
                {isAr
                  ? 'صاحب القرار: رئيس الموارد البشرية التنفيذي'
                  : 'Decision Maker: Chief Human Resources Officer'}
              </span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#16171B] border border-[#26282D]">
              <span className="truncate block">
                {isAr
                  ? 'الجدول الزمني المعتمد: خلال 30 يوماً'
                  : 'Timeline: Deployment within 30 days'}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    // Step 03 - Direct Engagement
    {
      id: 'step3',
      stepNumber: '03',
      navTitle: isAr ? 'التعاقد المباشر' : 'Direct Engagement',
      tag: isAr ? 'الخطوة 03 // التقديم المباشر والتعاقد' : 'STEP 03 // DIRECT ENGAGEMENT',
      tagColor: 'text-neutral-400',
      headline: isAr
        ? 'تقديم مباشر وتواصل شخصي مع ضمان الدفع مقابل النتائج'
        : 'Direct warm introductions with pay on success guarantees',
      desc: isAr
        ? 'تنسيق مباشر للاجتماعات مع قادة المنشآت المستعدين لمراجعة العروض والبدء، مع ضمان استبدال الفرصة خلال 5 أيام.'
        : 'Direct executive introductions with decision makers ready to review proposals, backed by a 5-day replacement SLA.',
      canvasBg: 'bg-[#16171B] border-[#26282D]',
      console: (
        <div className="w-full bg-[#0F1013] rounded-xl border border-[#26282D] p-3 sm:p-4 shadow-2xl space-y-2 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D] text-xs">
            <span className="text-neutral-400 text-[11px] font-medium">
              {isAr ? 'لوحة التعاقد المباشر' : 'Direct Engagement Console'}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-neutral-200 text-[10px] font-medium">
              <Signal tone="white" size={12} />
              <span>{isAr ? 'تم التقديم' : 'Intro Complete'}</span>
            </div>
          </div>

          {/* Status Box */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#16171B] border border-[#26282D] space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">{isAr ? 'حالة الفرصة' : 'Pipeline Status'}</span>
              <span className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded text-[10px] border border-white/20">
                {isAr ? 'مرحلة تقديم العرض الفني' : 'Proposal Review Stage'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">{isAr ? 'ضمان الفرصة' : 'Guarantee SLA'}</span>
              <span className="font-medium text-white text-[11px]">
                {isAr ? 'ضمان استبدال خلال 5 أيام' : '5 Day Replacement Guarantee'}
              </span>
            </div>
          </div>

          {/* Contract Terms */}
          <div className="pt-0.5 flex items-center justify-between text-xs text-neutral-400">
            <span>{isAr ? 'بدون عمولات خفية' : 'No hidden fees'}</span>
            <span className="font-bold text-white">
              {isAr ? 'علاقة تعاقدية مباشرة 100%' : '100% Direct Contract'}
            </span>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white lg:bg-black transition-colors duration-500 overflow-visible lg:h-[175vh] py-14 sm:py-20 lg:py-0 border-t border-neutral-200 lg:border-t-0"
      aria-labelledby="how-it-works-title"
    >
      {/* Viewport Stage: Pinned on desktop during the garage door closure */}
      <div className="relative lg:sticky lg:top-0 w-full min-h-screen flex flex-col justify-center items-center z-20 pt-2 sm:pt-4 lg:pt-16 xl:pt-20 pb-8 overflow-hidden">
        
        {/* Background Underlayer (Desktop only): Dark aesthetic connecting seamlessly with Hero */}
        <div
          className="hidden lg:block absolute inset-0 bg-black pointer-events-none"
          aria-hidden="true"
        >
          {/* Subtle dark technical dot grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        {/* ================================================================
            THE WHITE GARAGE SHUTTER CURTAIN (Rolling down over the dark hero)
            ================================================================ */}
        <m.div
          style={
            prefersReducedMotion || !isDesktop
              ? { clipPath: 'none' }
              : { clipPath: shutterClip }
          }
          className="w-full lg:absolute lg:inset-0 lg:h-full bg-white text-neutral-900 shadow-2xl flex flex-col justify-center items-center overflow-hidden z-10 pt-4 sm:pt-6 lg:pt-16 xl:pt-20 pb-8"
        >
          {/* Architectural horizontal garage door shutter slats */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.70]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to bottom,
                  transparent 0px,
                  transparent 38px,
                  rgba(0, 0, 0, 0.025) 38px,
                  rgba(0, 0, 0, 0.05) 39px,
                  transparent 40px
                )
              `,
            }}
            aria-hidden="true"
          />

          {/* Attio-Style Subtle Grid dots */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
            aria-hidden="true"
          />

          {/* ================================================================
              SPRING POP-UP CONTENT INSIDE THE SHUTTER
              ================================================================ */}
          <m.div
            style={
              prefersReducedMotion || !isDesktop
                ? { transform: 'none', opacity: 1 }
                : {
                    scale: contentScale,
                    opacity: contentOpacity,
                    y: contentY,
                  }
            }
            className="container-site relative z-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full flex flex-col justify-center"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Section Title, Subtitle, Highlights & Dedicated "Join Network" button */}
              <div className="lg:col-span-5 flex flex-col items-start text-start space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold uppercase tracking-wider font-sans">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  <span>{isAr ? 'آلية العمل خطوة بخطوة' : 'HOW IT WORKS // POSTFLOWS'}</span>
                </div>

                <TextReveal
                  as="h2"
                  text={dict.how_it_works?.title || (isAr ? 'الرحلة من التحدي إلى الحل.' : 'The journey from challenge to solution.')}
                  className="text-xl xs:text-2xl sm:text-4xl lg:text-[40px] font-semibold text-neutral-950 tracking-tight leading-[1.18] font-heading"
                />

                <p className="text-xs xs:text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
                  {dict.how_it_works?.subtitle ||
                    (isAr
                      ? 'ربط صناع القرار بشركات تدريب الشركات عبر طلب موثق ومؤكد'
                      : 'Connecting decision-makers with corporate training firms through verified demand')}
                </p>

                {/* Benefit Checkpoints */}
                <div className="space-y-2.5 pt-1 w-full text-xs sm:text-sm text-neutral-700 font-sans">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-neutral-950 shrink-0" />
                    <span>{isAr ? 'ميزانيات معتمدة مؤكدة مع الإدارة المالية' : 'Pre-allocated corporate training budgets'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-neutral-950 shrink-0" />
                    <span>{isAr ? 'مواءمة دقيقة مع 2 إلى 3 خبراء معتمدين كحد أقصى' : '2 to 3 curated specialists per mandate (Zero bidding wars)'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-neutral-950 shrink-0" />
                    <span>{isAr ? 'بدون اشتراكات شهرية، الدفع فقط مقابل النتائج' : 'Strict pay-on-success model with 5-day replacement SLA'}</span>
                  </div>
                </div>

                {/* Requested Prominent Button: "Join network" / subtitle: "for training providers" */}
                <div className="pt-3 w-full sm:w-auto">
                  <Magnetic strength={0.2} activeDistance={35} className="w-full sm:w-auto">
                    <Link
                      href={`/${lang}/for-providers/apply`}
                      className="group inline-flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-neutral-950 hover:bg-black border border-neutral-900 transition-all duration-200 shadow-xl w-full sm:min-w-[280px]"
                    >
                      <div className="flex flex-col text-start">
                        <span className="text-sm sm:text-base font-semibold text-white transition-colors">
                          {isAr ? 'انضم إلى الشبكة' : 'Join network'}
                        </span>
                        <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                          {isAr ? 'لمزودي التدريب' : 'for training providers'}
                        </span>
                      </div>
                      <div className="h-9 w-9 rounded-xl bg-white/10 group-hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors shrink-0">
                        <ArrowRight size={16} className="rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </Magnetic>
                </div>
              </div>

              {/* RIGHT COLUMN: Steps Tabs on Top + Live Card with Mockup */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                
                {/* Step Navigation Tabs on Top - 3 cols on all screen sizes */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full py-1">
                  {steps.map((st, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setActiveStep(idx)}
                        className={`group relative flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 xs:px-1.5 sm:px-4 rounded-xl border transition-all duration-200 text-[9px] xs:text-[10px] sm:text-xs font-medium cursor-pointer active:scale-95 ${
                          isActive
                            ? 'text-white border-neutral-950 bg-neutral-950 shadow-sm'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:text-neutral-900 hover:bg-neutral-200/70'
                        }`}
                      >
                        <span className={`text-[9px] xs:text-[10px] sm:text-[11px] font-mono font-bold shrink-0 ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                          {st.stepNumber}
                        </span>
                        <span className="truncate font-semibold">{st.navTitle}</span>
                        {isActive && (
                          <div className="shrink-0 ms-0.5 sm:ms-1 hidden xs:block">
                            <Signal tone="white" size={12} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Card */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="w-full"
                >
                  <AnimatePresence mode="wait">
                    <m.div
                      key={currentStep.id}
                      initial={{ opacity: 0, y: 12, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -12, scale: 0.99 }}
                      transition={{ duration: dur.base, ease: ease.out }}
                      className="relative rounded-2xl sm:rounded-3xl border border-neutral-800 bg-[#0F1013] p-3.5 xs:p-4 sm:p-6 lg:p-7 shadow-2xl overflow-hidden transition-colors"
                    >
                      <BorderBeam size={260} duration={12} colorFrom="rgba(255,255,255,0.3)" colorTo="rgba(255,255,255,0.05)" />
                      <BorderGlow glowColor="rgba(255, 255, 255, 0.15)" size={280} opacity={0.4} />

                      <div className="space-y-4 relative z-10">
                        {/* Card Header with Eyebrow and Headline */}
                        <div className="space-y-1.5 text-start">
                          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${currentStep.tagColor}`}>
                            {currentStep.tag}
                          </span>
                          <h3 className="text-base sm:text-lg lg:text-xl font-heading font-semibold text-white leading-snug">
                            {currentStep.headline}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                            {currentStep.desc}
                          </p>
                        </div>

                        {/* Console Mockup Display */}
                        <CardTilt3D maxTilt={4} glareOpacity={0.08} className="w-full pt-1">
                          <div className={`w-full rounded-xl sm:rounded-2xl ${currentStep.canvasBg} border p-2.5 sm:p-3.5 shadow-inner`}>
                            {currentStep.console}
                          </div>
                        </CardTilt3D>
                      </div>

                      {/* Card Bottom Progress Dots */}
                      <div className="flex items-center justify-between pt-3 mt-4 border-t border-[#26282D] text-xs text-neutral-400">
                        <div className="flex items-center gap-1.5">
                          {steps.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => setActiveStep(dotIdx)}
                              aria-label={`Go to step ${dotIdx + 1}`}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeStep === dotIdx ? 'w-5 bg-white' : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => setActiveStep((activeStep + 1) % steps.length)}
                          className="inline-flex items-center gap-1.5 font-medium text-xs text-neutral-300 hover:text-white transition-colors"
                        >
                          <span>{isAr ? 'الخطوة التالية' : 'Next Step'}</span>
                          <ArrowRight size={12} className="rtl:-scale-x-100" />
                        </button>
                      </div>

                    </m.div>
                  </AnimatePresence>
                </div>

              </div>

            </div>
          </m.div>
        </m.div>

        {/* Shutter Leading Bottom Rim Line (Desktop only) */}
        <m.div
          style={
            prefersReducedMotion || !isDesktop
              ? { display: 'none' }
              : { top: lipY, opacity: lipOpacity }
          }
          className="hidden lg:block absolute left-0 right-0 h-[2px] bg-neutral-300 shadow-[0_4px_12px_rgba(0,0,0,0.5)] z-30 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

