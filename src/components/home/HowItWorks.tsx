'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight, CheckCircle2 } from '@/components/icons';
import { m, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import Press from '@/components/shared/Press';
import BorderGlow from '@/components/shared/BorderGlow';
import { ease, dur, spring, viewportOnceMobile } from '@/lib/motion';

/**
 * Step cards travel on the axis the swipe pushed them: the outgoing card leaves
 * the way the finger went and the next one arrives from the opposite edge, so a
 * swipe reads as moving through a deck rather than as a crossfade.
 */
const cardSwap: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 40, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -40, scale: 0.98 }),
};

export default function HowItWorks() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const [activeStep, setActiveStep] = useState(0);
  /** +1 when advancing, -1 when going back — drives which way the card leaves. */
  const [direction, setDirection] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /** Moves to a step and records which way the deck travelled to get there. */
  const goToStep = (next: number) => {
    setDirection((prev) => {
      const forward = (next - activeStep + 3) % 3 === 1;
      return next === activeStep ? prev : forward ? 1 : -1;
    });
    setActiveStep(next);
  };

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

  // Garage Door Opening: The dark garage shutter lifts UP from bottom to top (0% to 40% of scroll)
  const shutterPercent = useTransform(scrollYProgress, [0, 0.40], [0, 100]);
  const shutterClip = useTransform(shutterPercent, (p) => `inset(0% 0% ${p}% 0%)`);

  // Leading bottom metallic rim line lifting UP as the door opens
  const lipY = useTransform(scrollYProgress, [0, 0.40], ['100%', '0%']);
  const lipOpacity = useTransform(scrollYProgress, [0.02, 0.08, 0.36, 0.42], [0, 1, 1, 0]);

  // Spring Pop-Up: White section & windows pop up with an energetic spring as the garage door opens
  const contentOpacity = useTransform(scrollYProgress, [0.12, 0.40], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.12, 0.44], [0.88, 1]);
  const contentY = useTransform(scrollYProgress, [0.12, 0.44], [50, 0]);

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

    // A drag toward the start of the reading direction advances the deck, so the
    // meaning of a left-swipe flips under Arabic.
    const forward = isAr ? distance < 0 : distance > 0;
    goToStep(forward ? (activeStep + 1) % 3 : activeStep === 0 ? 2 : activeStep - 1);
  };

  const steps = [
    // Step 01 - Tell Us
    {
      id: 'step1',
      stepNumber: '01',
      navTitle: isAr ? 'أخبرنا باحتياجك' : 'Tell Us',
      mobileNavTitle: isAr ? 'أخبرنا' : 'Tell Us',
      tag: isAr ? 'الخطوة 01 · دقيقتان' : 'STEP 01 · 2 MINUTES',
      tagColor: 'text-neutral-950',
      headline: isAr
        ? 'أخبرنا بما يحتاج فريقك إلى تحقيقه وتعلّمه'
        : 'Tell us what your workforce needs to achieve',
      desc: isAr
        ? 'حدد تحدي فريقك، والجدول الزمني، وعدد الموظفين. بدون أي مصطلحات تقنية معقدة.'
        : "Submit your department's challenge, timeline, and team size. No technical jargon required.",
      canvasBg: 'bg-neutral-50/90 border-neutral-200/80',
      console: (
        <div className="w-full bg-white rounded-xl border border-neutral-200/80 p-3 sm:p-4 shadow-sm space-y-2.5 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 text-xs">
            <span className="text-neutral-700 text-[11px] font-medium">
              {isAr ? 'طلب تدريب جديد' : 'New Training Request'}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50/80 border border-blue-200 text-blue-950 text-[10px] font-semibold">
              <Signal tone="accent" size={12} />
              <span className="text-blue-900">{isAr ? 'تم استلام الطلب' : 'Request Received'}</span>
            </div>
          </div>

          {/* Lead Details */}
          <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-50/90 border border-neutral-200/70 space-y-1.5 text-xs shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">{isAr ? 'القطاع والموقع' : 'Sector & Location'}</span>
              <span className="font-semibold text-neutral-950">
                {isAr ? 'الخدمات المالية · الرياض' : 'Financial Services · Riyadh'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">{isAr ? 'التحدي التدريبي' : 'Training Challenge'}</span>
              <span className="font-medium text-neutral-900">
                {isAr ? 'القيادة التنفيذية والاستراتيجية الرقمية' : 'Executive Decision-Making & Digital Strategy'}
              </span>
            </div>
            <div className="flex items-center justify-between pt-0.5 border-t border-neutral-200/60 text-[11px]">
              <span className="text-neutral-500">{isAr ? 'حالة الميزانية' : 'Budget Status'}</span>
              <span className="font-bold text-neutral-950">SAR 150,000+ ({isAr ? 'مؤكدة' : 'Confirmed'})</span>
            </div>
          </div>
        </div>
      ),
    },

    // Step 02 - Review Matches
    {
      id: 'step2',
      stepNumber: '02',
      navTitle: isAr ? 'مراجعة الخبراء' : 'Review Matches',
      mobileNavTitle: isAr ? 'المراجعة' : 'Review',
      tag: isAr ? 'الخطوة 02 · 48 ساعة' : 'STEP 02 · 48 HOURS',
      tagColor: 'text-neutral-950',
      headline: isAr
        ? 'راجع من 2 إلى 3 عروض لخبراء تم اختيارهم بعناية'
        : 'Review 2 to 3 handpicked, proven proposals',
      desc: isAr
        ? 'نفحص مزودي التدريب مسبقاً وفق خبرتهم الإقليمية، وسوابق أعمالهم، وملاءمة الحقيبة التدريبية.'
        : 'We pre-screen providers for regional experience, real case studies, and exact curriculum fit.',
      canvasBg: 'bg-neutral-50/90 border-neutral-200/80',
      console: (
        <div className="w-full bg-white rounded-xl border border-neutral-200/80 p-3 sm:p-4 shadow-sm space-y-2.5 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 text-xs">
            <span className="text-neutral-700 text-[11px] font-medium">
              {isAr ? 'عروض الخبراء المعتمدين' : 'Verified Provider Matches'}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-950 text-xs font-bold">
              <Signal tone="neutral" size={12} />
              <span>{isAr ? '2 مطابقات مؤكدة' : '2 Curated Matches'}</span>
            </div>
          </div>

          {/* Provider Matches */}
          <div className="space-y-1.5 text-xs text-neutral-800">
            <div className="p-2 sm:p-2.5 rounded-lg bg-neutral-50/90 border border-neutral-200/70 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-950 block">
                  {isAr ? 'معهد القيادة (معتمد سعودياً)' : 'Leadership Institute (KSA Certified)'}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {isAr ? 'سجل تسليم مثبت في القطاع المالي' : 'Proven delivery in banking & fintech'}
                </span>
              </div>
              <span className="text-xs font-bold text-neutral-950 px-2 py-0.5 bg-white border border-neutral-200 rounded">
                98% Fit
              </span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-lg bg-neutral-50/90 border border-neutral-200/70 flex items-center justify-between">
              <div>
                <span className="font-semibold text-neutral-950 block">
                  {isAr ? 'شركاء التدريب التنفيذي (الإمارات)' : 'Executive Training Partners (UAE)'}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {isAr ? 'خبراء تدريب وتطوير معتمدون' : 'Certified executive coaches'}
                </span>
              </div>
              <span className="text-xs font-bold text-neutral-950 px-2 py-0.5 bg-white border border-neutral-200 rounded">
                95% Fit
              </span>
            </div>
          </div>
          <div className="pt-0.5 text-center text-[10px] text-neutral-500">
            {isAr ? 'بدون عروض تسويقية مزعجة · بدون مزايدات' : 'No spam · Zero bidding wars'}
          </div>
        </div>
      ),
    },

    // Step 03 - Execute & Train
    {
      id: 'step3',
      stepNumber: '03',
      navTitle: isAr ? 'بدء التدريب' : 'Start Training',
      mobileNavTitle: isAr ? 'التنفيذ' : 'Train',
      tag: isAr ? 'الخطوة 03 · مباشرة وسلسة' : 'STEP 03 · SEAMLESS',
      tagColor: 'text-neutral-950',
      headline: isAr
        ? 'تواصل مباشرة وأطلق برنامجك التدريبي'
        : 'Connect directly and launch your program',
      desc: isAr
        ? 'تعاقد مباشرة مع جهة التدريب المختارة. مجاناً للشركات؛ ونجاح المزود مرتبط بنجاحكم.'
        : 'Contract directly with your chosen specialist. Free for companies; providers succeed when you succeed.',
      canvasBg: 'bg-neutral-50/90 border-neutral-200/80',
      console: (
        <div className="w-full bg-white rounded-xl border border-neutral-200/80 p-3 sm:p-4 shadow-sm space-y-2.5 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 text-xs">
            <span className="text-neutral-700 text-[11px] font-medium">
              {isAr ? 'الربط المباشر وجدولة الانطلاق' : 'Direct Introduction'}
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-950 text-[10px] font-semibold">
              <Signal tone="neutral" size={12} />
              <span>{isAr ? 'تمت الجدولة' : 'Kickoff Scheduled'}</span>
            </div>
          </div>

          {/* Status Box */}
          <div className="p-2.5 sm:p-3 rounded-lg bg-neutral-50/90 border border-neutral-200/70 space-y-1.5 text-xs shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">{isAr ? 'حالة التنسيق' : 'Engagement Status'}</span>
              <span className="font-semibold text-neutral-950 bg-neutral-100 px-2 py-0.5 rounded text-[10px] border border-neutral-200">
                {isAr ? 'اجتماع انطلاق البرنامج محدد' : 'Kickoff Session Confirmed'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">{isAr ? 'رسوم المنصة على الشركة' : 'Cost to Enterprise'}</span>
              <span className="font-bold text-neutral-950 text-[11px]">
                SAR 0 ({isAr ? 'مجاناً 100%' : '100% Free'})
              </span>
            </div>
          </div>

          {/* Contract Terms */}
          <div className="pt-0.5 flex items-center justify-between text-xs text-neutral-500">
            <span>{isAr ? 'بدون وسطاء أو عمولات خفية' : 'Zero middleman retainers'}</span>
            <span className="font-bold text-neutral-950">
              {isAr ? 'علاقة تعاقدية مباشرة' : 'Direct Executive Contract'}
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
      className="relative bg-white transition-colors duration-500 overflow-visible lg:h-[175vh] lg:sm:h-[185vh] h-auto py-12 xs:py-16 sm:py-20 lg:py-0 border-t border-neutral-200 lg:border-t-0"
      aria-labelledby="how-it-works-title"
    >
      {/* Viewport Stage: Pinned during the garage door opening on desktop; natural flow on mobile */}
      <div className="relative lg:sticky top-0 w-full min-h-0 lg:min-h-[100dvh] h-auto lg:h-[100dvh] flex flex-col justify-center items-center z-20 pt-0 sm:pt-4 lg:pt-16 xl:pt-20 pb-0 lg:pb-8 overflow-visible lg:overflow-hidden bg-white">
        
        {/* Attio-Style Subtle Grid dots on the white floor */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Ambient subtle backlight glow on the white showroom floor */}
        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-neutral-900/[0.02] blur-[150px] pointer-events-none rounded-full" />

        {/* ================================================================
            THE WHITE CONTENT
            Reveals and pops up as the garage door rolls open upwards on desktop;
            natural smooth presentation on mobile
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
            
            {/* LEFT COLUMN: Section Title, Subtitle, Highlights & White "Join Network" Window */}
            {/* Each column reveals as it enters. On desktop this sits inside the
                garage-door sequence and is barely visible; on a phone, where the
                garage door is switched off, it is the entrance. */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnceMobile}
              transition={{ duration: dur.slow, ease: ease.out }}
              className="lg:col-span-5 flex flex-col items-start text-start space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold uppercase tracking-wider font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 animate-pulse" />
                <span>{dict.how_it_works?.eyebrow || (isAr ? 'آلية العمل' : 'HOW IT WORKS')}</span>
              </div>

              <TextReveal
                as="h2"
                text={dict.how_it_works?.title || (isAr ? 'من تشخيص الفجوة المهارية إلى التدريب في 3 خطوات واضحة' : 'From Skill Gap to Training in 3 Straightforward Steps')}
                className="text-[1.5rem] xs:text-[1.75rem] sm:text-4xl lg:text-[40px] font-semibold text-neutral-950 tracking-tight leading-[1.18] font-heading"
              />

              <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed">
                {dict.how_it_works?.subtitle ||
                  (isAr
                    ? 'بدون مزايدات. بدون اتصالات مبيعات مزعجة. شراكات تدريبية دقيقة وموثوقة فقط.'
                    : 'Zero bidding wars. No endless cold calls. Just verified, tailor-made partnerships.')}
              </p>

              {/* Benefit Checkpoints */}
              <div className="space-y-2.5 pt-1 w-full text-sm text-neutral-700 font-sans">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-neutral-950 shrink-0" />
                  <span>{isAr ? 'مجاناً 100% للمنشآت والشركات' : '100% Free for corporate organizations'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-neutral-950 shrink-0" />
                  <span>{isAr ? 'عروض منتقاة من 2 إلى 3 خبراء معتمدين (بدون مزايدات)' : '2 to 3 curated specialists per mandate (Zero bidding wars)'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-neutral-950 shrink-0" />
                  <span>{isAr ? 'علاقة تعاقدية مباشرة وبدون اشتراكات شهرية' : 'Direct executive contracting with zero retainers'}</span>
                </div>
              </div>

              {/* White "Join network" Window Card */}
              <div className="pt-3 w-full sm:w-auto">
                <Magnetic strength={0.2} activeDistance={35} className="w-full sm:w-auto">
                  <Press className="w-full sm:w-auto" strength={0.7} vibrate>
                    <Link
                      href={`/${lang}/for-providers/apply`}
                      className="group inline-flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200/90 hover:border-neutral-300 transition-all duration-200 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.1)] w-full sm:min-w-[280px]"
                    >
                      <div className="flex flex-col text-start">
                        <span className="text-sm sm:text-base font-semibold text-neutral-950 transition-colors">
                          {isAr ? 'انضم إلى الشبكة' : 'Join network'}
                        </span>
                        <span className="text-xs text-neutral-500 transition-colors">
                          {isAr ? 'لمزودي التدريب' : 'for training providers'}
                        </span>
                      </div>
                      <div className="h-9 w-9 rounded-xl bg-neutral-950 hover:bg-black text-white flex items-center justify-center transition-colors shrink-0 shadow-sm shadow-neutral-900/10">
                        <ArrowRight size={16} className="rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </Press>
                </Magnetic>
              </div>
            </m.div>

            {/* RIGHT COLUMN: Step Tabs on Top + Large White Window with Mockup */}
            <m.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnceMobile}
              transition={{ duration: dur.slow, ease: ease.out, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col space-y-4"
            >

              {/* Step Navigation Tabs on Top - 3 cols on all screen sizes */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full py-1">
                {steps.map((st, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={st.id}
                      onClick={() => goToStep(idx)}
                      className={`group relative flex min-h-[44px] items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-2.5 px-1.5 xs:px-2 sm:px-4 rounded-xl border transition-colors duration-200 text-[11px] xs:text-xs font-medium cursor-pointer ${
                        isActive
                          ? 'text-white border-neutral-950'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:text-neutral-950 hover:bg-neutral-50'
                      }`}
                    >
                      {/* The filled pill slides between tabs rather than blinking
                          from one to the next. */}
                      {isActive && (
                        <m.span
                          layoutId="hiw-active-tab"
                          transition={prefersReducedMotion ? { duration: 0 } : spring.snappy}
                          className="absolute inset-0 rounded-xl bg-neutral-950 shadow-md"
                          aria-hidden="true"
                        />
                      )}
                      <span className={`relative z-10 text-[10px] xs:text-[11px] font-mono font-bold shrink-0 ${isActive ? 'text-white/60' : 'text-neutral-400'}`}>
                        {st.stepNumber}
                      </span>
                      <span className="relative z-10 font-semibold block sm:hidden">{st.mobileNavTitle}</span>
                      <span className="relative z-10 font-semibold hidden sm:block truncate">{st.navTitle}</span>
                      {isActive && (
                        <div className="relative z-10 shrink-0 ms-0.5 sm:ms-1 hidden xs:block">
                          <Signal tone="neutral" size={12} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Step White Window Card */}
              <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="w-full"
              >
                {/* `custom` carries the travel direction so the outgoing card
                    leaves the way the swipe pushed it. */}
                <AnimatePresence mode="wait" custom={direction}>
                  <m.div
                    key={currentStep.id}
                    custom={direction}
                    variants={cardSwap}
                    initial={prefersReducedMotion ? 'center' : 'enter'}
                    animate="center"
                    exit={prefersReducedMotion ? 'center' : 'exit'}
                    transition={{ duration: dur.base, ease: ease.out }}
                    className="relative rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-4 xs:p-4 sm:p-6 lg:p-7 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden transition-colors"
                  >
                    <BorderGlow glowColor="rgba(255, 92, 0, 0.15)" size={280} opacity={0.35} />

                    <div className="space-y-4 relative z-10">
                      {/* Card Header with Eyebrow and Headline */}
                      <div className="space-y-1.5 text-start">
                        <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider font-mono ${currentStep.tagColor}`}>
                          {currentStep.tag}
                        </span>
                        <h3 className="text-lg sm:text-lg lg:text-xl font-heading font-semibold text-neutral-950 leading-snug">
                          {currentStep.headline}
                        </h3>
                        <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                          {currentStep.desc}
                        </p>
                      </div>

                      {/* Inner Console Window Mockup Display */}
                      <CardTilt3D maxTilt={4} glareOpacity={0.06} className="w-full pt-1">
                        <div className={`w-full rounded-xl sm:rounded-2xl ${currentStep.canvasBg} border p-2.5 sm:p-3.5 shadow-inner`}>
                          {currentStep.console}
                        </div>
                      </CardTilt3D>
                    </div>

                    {/* Card Bottom Progress Dots */}
                    <div className="flex items-center justify-between pt-1 mt-3 border-t border-neutral-200 text-xs text-neutral-500">
                      <div className="flex items-center">
                        {steps.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => goToStep(dotIdx)}
                            aria-label={`Go to step ${dotIdx + 1}`}
                            aria-current={activeStep === dotIdx}
                            className="group flex h-11 w-6 items-center justify-center"
                          >
                            <span
                              className={`block h-1.5 rounded-full transition-all duration-300 ${
                                activeStep === dotIdx
                                  ? 'w-5 bg-neutral-950'
                                  : 'w-1.5 bg-neutral-300 group-hover:bg-neutral-400'
                              }`}
                            />
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => goToStep((activeStep + 1) % steps.length)}
                        className="inline-flex min-h-[44px] items-center gap-1.5 font-medium text-xs text-neutral-600 hover:text-neutral-950 transition-colors"
                      >
                        <span>{isAr ? 'الخطوة التالية' : 'Next Step'}</span>
                        <ArrowRight size={12} className="rtl:-scale-x-100" />
                      </button>
                    </div>

                  </m.div>
                </AnimatePresence>
              </div>

            </m.div>

          </div>
        </m.div>

        {/* ================================================================
            THE DARK GARAGE SHUTTER CURTAIN (Lifts UP from bottom to top)
            Covers the white section at scroll=0 on desktop only
            ================================================================ */}
        <m.div
          style={
            prefersReducedMotion || !isDesktop
              ? { display: 'none' }
              : { clipPath: shutterClip }
          }
          className="hidden lg:flex w-full absolute inset-0 h-full bg-black text-white shadow-2xl flex-col justify-start items-center overflow-hidden z-30 pointer-events-none select-none"
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

          {/* Architectural horizontal garage door shutter slats */}
          <div
            className="absolute inset-0 opacity-[0.75]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  to bottom,
                  transparent 0px,
                  transparent 38px,
                  rgba(255, 255, 255, 0.035) 38px,
                  rgba(255, 255, 255, 0.07) 39px,
                  transparent 40px
                )
              `,
            }}
          />
        </m.div>

        {/* Shutter Leading Bottom Metallic Rim Line lifting up as door opens (Desktop only) */}
        <m.div
          style={
            prefersReducedMotion || !isDesktop
              ? { display: 'none' }
              : { top: lipY, opacity: lipOpacity }
          }
          className="hidden lg:block absolute left-0 right-0 h-[2px] bg-neutral-300 shadow-[0_4px_16px_rgba(0,0,0,0.6)] z-40 pointer-events-none"
          aria-hidden="true"
        />

      </div>
    </section>
  );
}

