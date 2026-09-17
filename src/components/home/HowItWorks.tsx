'use client';

import { useState, useRef, useEffect } from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useParams } from 'next/navigation';

export default function HowItWorks() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [stepScrollProgress, setStepScrollProgress] = useState(0);

  // Pinned scroll sequence: track progress through the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.33) {
      setActiveStep(0);
      setStepScrollProgress(latest / 0.33);
    } else if (latest < 0.66) {
      setActiveStep(1);
      setStepScrollProgress((latest - 0.33) / 0.33);
    } else {
      setActiveStep(2);
      setStepScrollProgress(Math.min(1, (latest - 0.66) / 0.34));
    }
  });

  useEffect(() => {
    const current = scrollYProgress.get();
    if (current < 0.33) {
      setActiveStep(0);
    } else if (current < 0.66) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  }, [scrollYProgress]);

  // Smooth scroll to corresponding step in the 300vh sequence when clicked
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = containerRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;

    const targetProgress = [0.08, 0.48, 0.88][index];
    const targetY = containerTop + scrollableDistance * targetProgress;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const steps = [
    {
      id: 'step1',
      number: '01',
      icon: Building2,
      badge: dict.how_it_works?.step1?.badge || (isAr ? 'المرحلة 01' : 'Step 01'),
      navTitle: isAr ? 'رصد الاحتياج الفعلي' : 'Detect Need',
      title: dict.how_it_works?.step1?.title || (isAr ? 'رصد الاحتياج التدريبي' : 'Detect Need'),
      subtitle:
        dict.how_it_works?.step1?.subtitle ||
        (isAr
          ? 'ترصد تحليلات السوق المنظمات والشركات التي تواجه تحديات حقيقية في الكفاءات قبل أن تبدأ بالبحث العلني.'
          : 'Market intelligence surfaces enterprise organizations with verified workforce challenges before they start searching.'),
      highlight: isAr ? 'إشارة طلب مؤكدة' : 'Active Enterprise Signal',
      cardContent: (
        <div className="space-y-3">
          {/* Top header badge */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-[#0052FF] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25">
                <Building2 size={18} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold text-slate-900 font-sans">
                  {isAr ? 'تم رصد إشارة طلب مؤكدة' : 'Demand Signal Detected'}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                  {isAr ? 'مؤسسة معتمدة · المملكة العربية السعودية' : 'Verified Enterprise · Saudi Arabia'}
                </div>
              </div>
            </div>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>

          {/* Signal parameters */}
          <div className="bg-slate-50/90 rounded-xl p-2.5 sm:p-3 border border-slate-200/70 space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{isAr ? 'القطاع والمجال' : 'Sector & Domain'}</span>
              <span className="text-slate-900 font-semibold">{isAr ? 'الخدمات المالية والمصرفية' : 'Banking & FinTech'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{isAr ? 'حجم القوة العاملة' : 'Workforce Size'}</span>
              <span className="font-mono font-bold text-slate-800">1,200+ {isAr ? 'موظف' : 'Employees'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{isAr ? 'الميزانية التقديرية' : 'Allocated Budget'}</span>
              <span className="font-mono font-bold text-emerald-600">SAR 450,000+</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-mono font-semibold border border-emerald-200 inline-flex items-center gap-1">
              <CheckCircle2 size={12} /> {isAr ? 'أولوية عاجلة' : 'High Intent'}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0052FF] text-[11px] font-mono font-semibold border border-blue-200">
              {isAr ? 'برامج القيادة التنفيذية' : 'Executive Leadership'}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'step2',
      number: '02',
      icon: ShieldCheck,
      badge: dict.how_it_works?.step2?.badge || (isAr ? 'المرحلة 02' : 'Step 02'),
      navTitle: isAr ? 'التأهيل والمطابقة' : 'Qualify & Match',
      title: dict.how_it_works?.step2?.title || (isAr ? 'التأهيل والربط الذكي' : 'Qualify & Match'),
      subtitle:
        dict.how_it_works?.step2?.subtitle ||
        (isAr
          ? 'يتم التحقق المباشر من أصحاب القرار والميزانيات والجداول الزمنية، ثم مطابقتهم مع مزود التدريب الأنسب.'
          : 'Decision makers are validated, budgets and timelines confirmed, then matched directly to the right training provider.'),
      highlight: isAr ? 'مطابقة معايير 94%' : '94% Match Fit Score',
      cardContent: (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80">
            <div>
              <div className="text-xs sm:text-sm font-semibold text-slate-900 font-sans">
                {isAr ? 'مؤشر جودة التطابق' : 'Match Quality Score'}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                {isAr ? 'مطابقة متطلبات المحتوى والأثر' : 'Curriculum & Track Record Fit'}
              </div>
            </div>
            <div className="text-[11px] sm:text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              94% Match
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>{isAr ? 'اكتمال معايير التأهيل' : 'Criteria Fulfilled'}</span>
              <span className="font-mono font-bold text-slate-900">4 / 4 Complete</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div className="h-full bg-gradient-to-r from-[#0052FF] to-emerald-500 rounded-full w-[94%]" />
            </div>
          </div>

          <div className="space-y-1.5 pt-0.5 text-xs text-slate-700">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50/90 border border-slate-200/50">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              <span>{isAr ? 'صانع القرار: رئيس الموارد البشرية التنفيذي' : 'Decision Maker: Chief Human Resources Officer'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50/90 border border-slate-200/50">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              <span>{isAr ? 'الجدول الزمني المعتمد: خلال 30 يوماً' : 'Timeline: Deployment within 30 days'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step3',
      number: '03',
      icon: Award,
      badge: dict.how_it_works?.step3?.badge || (isAr ? 'المرحلة 03' : 'Step 03'),
      navTitle: isAr ? 'التقديم والتعاقد' : 'Close Engagement',
      title: dict.how_it_works?.step3?.title || (isAr ? 'التقديم المباشر والتعاقد' : 'Introduce & Close'),
      subtitle:
        dict.how_it_works?.step3?.subtitle ||
        (isAr
          ? 'يحصل مزودو التدريب على تقديم مباشر وتواصل شخصي مع صناع القرار المستعدين لتلقي العروض وتوقيع العقود.'
          : 'Providers receive direct, warm introductions to corporate decision makers ready for proposals and execution.'),
      highlight: isAr ? 'جاهز لتقديم العرض' : 'Direct Introduction Ready',
      cardContent: (
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-200/80">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#FF5C00] p-[2px] shadow-sm">
              <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center text-[#0052FF]">
                <Award size={18} />
              </div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-slate-900 font-sans">
                {isAr ? 'تم إتمام التقديم المباشر' : 'Warm Introduction Completed'}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                {isAr ? 'تواصل مباشر مع مالك الميزانية المؤسسية' : 'Direct access to enterprise budget owner'}
              </div>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{isAr ? 'حالة الصفقة' : 'Pipeline Status'}</span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                {isAr ? 'مرحلة تقديم العرض الفني' : 'Proposal Presentation Stage'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{isAr ? 'ضمان الفرصة' : 'Engagement Guarantee'}</span>
              <span className="font-semibold text-slate-800">{isAr ? 'ضمان استبدال خلال 5 أيام' : '5 Day Replacement Guarantee'}</span>
            </div>
          </div>

          <div className="pt-0.5 flex items-center justify-between text-xs text-slate-500">
            <span>{isAr ? 'بدون عمولات خفية' : 'Zero hidden commission'}</span>
            <span className="font-mono font-bold text-[#0052FF]">{isAr ? 'علاقة تعاقدية مباشرة' : '100% Direct Contract'}</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      data-nav-dark="true"
      className="relative bg-[#000000] text-white border-t border-[#1F1F1F] min-h-[300vh]"
    >
      {/* Subtle pure AMOLED ambient glow */}
      <div className="absolute top-1/3 start-1/4 w-[500px] h-[500px] bg-blue-600/[0.06] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/3 end-1/4 w-[500px] h-[500px] bg-indigo-600/[0.04] blur-[160px] pointer-events-none rounded-full" />

      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen max-h-[100dvh] flex flex-col justify-center overflow-visible py-2 sm:py-4">
        <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12 w-full max-w-7xl mx-auto">
          
          {/* Desktop Layout (Two Columns) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading & 3 White Step Cards */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              {/* Main Section Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                  <span>{dict.how_it_works?.eyebrow || (isAr ? 'في ثلاث خطوات بسيطة' : 'Just in three steps')}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-white tracking-[-0.02em] leading-tight font-heading">
                  {dict.how_it_works?.title || (isAr ? 'نحدد المنشآت التي تواجه فجوات تدريب حقيقية' : 'We pinpoint organizations facing real skill & training gaps')}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  {dict.how_it_works?.subtitle || (isAr ? 'منهجيتنا: كيف نربط السوق ونتحقق من الاحتياج ونطابق المزود الأنسب' : 'OUR APPROACH: How We Connect the Market: Learn, Diagnose, and Get Matched')}
                </p>
              </div>

              {/* 3 White Step Cards */}
              <div className="space-y-2.5 pt-0.5">
                {steps.map((s, index) => {
                  const isActive = activeStep === index;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleStepClick(index)}
                      className={`cursor-pointer p-3.5 sm:p-4 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                        isActive
                          ? 'bg-white text-slate-900 border-2 border-[#0052FF] shadow-[0_12px_32px_rgba(0,82,255,0.22)] ring-2 ring-[#0052FF]/25 scale-[1.01] opacity-100'
                          : 'bg-white/85 backdrop-blur-md text-slate-800 border border-slate-200/80 shadow-sm opacity-40 hover:opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono font-bold text-xs transition-all ${
                            isActive
                              ? 'bg-[#0052FF] text-white shadow-sm'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {s.number}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm sm:text-base font-heading text-slate-900 truncate">
                              {s.navTitle}
                            </h3>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-[#0052FF] border border-blue-200 shrink-0">
                                {s.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed truncate mt-0.5">
                            {s.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Active step progress indicator line */}
                      {isActive && (
                        <div className="absolute bottom-0 inset-x-0 h-[2.5px] bg-slate-100">
                          <div
                            className="h-full bg-[#0052FF] transition-all duration-150"
                            style={{ width: `${Math.min(100, Math.max(0, stepScrollProgress * 100))}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Pop-Up White Card (Attio Style) */}
            <div className="lg:col-span-7 w-full">
              <div className="w-full max-w-lg mx-auto">
                <AnimatePresence mode="wait">
                  <m.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.95, y: 14 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -14 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                    className="w-full"
                  >
                    {/* Crisp White Showcase Card on Pure AMOLED Black */}
                    <div className="relative rounded-2xl sm:rounded-3xl bg-white text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-slate-100 p-5 sm:p-6 lg:p-7 overflow-hidden">
                      
                      {/* Top Accent Gradient Bar */}
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0052FF] via-[#4D7CFF] to-[#FF5C00]" />

                      {/* Card Header Info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pt-0.5">
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[#0052FF] text-white text-[11px] font-mono font-semibold shadow-sm">
                            {steps[activeStep].badge}
                          </span>
                          <span className="text-xs font-mono font-medium text-slate-500">
                            {steps[activeStep].highlight}
                          </span>
                        </div>

                        <span className="text-xl sm:text-2xl font-mono font-bold text-slate-300">
                          {steps[activeStep].number}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 tracking-tight leading-snug mb-1 font-heading">
                        {steps[activeStep].title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-3.5">
                        {steps[activeStep].subtitle}
                      </p>

                      {/* Inner Content Card */}
                      <div className="relative rounded-xl bg-slate-50/90 border border-slate-200/80 p-3.5 sm:p-4 shadow-sm">
                        {steps[activeStep].cardContent}
                      </div>

                      {/* Bottom step switcher indicator pills */}
                      <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-slate-200/60 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          {steps.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              onClick={() => handleStepClick(dotIdx)}
                              aria-label={`Go to step ${dotIdx + 1}`}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeStep === dotIdx ? 'w-7 bg-[#0052FF]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                              }`}
                            />
                          ))}
                        </div>

                        <button
                          onClick={() => handleStepClick((activeStep + 1) % steps.length)}
                          className="inline-flex items-center gap-1 font-semibold text-[#0052FF] hover:text-blue-700 transition-colors"
                        >
                          <span>{isAr ? 'الخطوة التالية' : 'Next Step'}</span>
                          <ArrowRight size={13} className="rtl:-scale-x-100" />
                        </button>
                      </div>

                    </div>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Mobile Layout (Stacked & Compact View) */}
          <div className="lg:hidden flex flex-col justify-center gap-3 py-1">
            {/* Header */}
            <div className="space-y-1 text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-blue-400 text-[10px] font-semibold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                <span>{dict.how_it_works?.eyebrow || (isAr ? 'في ثلاث خطوات بسيطة' : 'Just in three steps')}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug font-heading">
                {dict.how_it_works?.title || (isAr ? 'نحدد المنشآت التي تواجه فجوات تدريب حقيقية' : 'We pinpoint organizations facing real skill & training gaps')}
              </h2>
            </div>

            {/* 3 Mobile Step Tabs */}
            <div className="grid grid-cols-3 gap-1.5">
              {steps.map((s, index) => {
                const isActive = activeStep === index;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleStepClick(index)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      isActive
                        ? 'bg-white text-slate-900 border-[#0052FF] shadow-md ring-1 ring-[#0052FF]'
                        : 'bg-white/80 text-slate-700 border-slate-200 opacity-50'
                    }`}
                  >
                    <div className="text-[11px] font-mono font-bold text-[#0052FF]">{s.number}</div>
                    <div className="text-[10px] font-semibold truncate">{s.navTitle}</div>
                  </button>
                );
              })}
            </div>

            {/* Showcase Card on Mobile */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -10 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  className="w-full"
                >
                  <div className="relative rounded-xl bg-white text-slate-900 shadow-xl border border-slate-100 p-3.5 sm:p-4 overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0052FF] via-[#4D7CFF] to-[#FF5C00]" />

                    <div className="flex items-center justify-between gap-2 mb-2 pt-0.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#0052FF] text-white text-[10px] font-mono font-semibold">
                        {steps[activeStep].badge}
                      </span>
                      <span className="text-lg font-mono font-bold text-slate-300">
                        {steps[activeStep].number}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 leading-snug mb-1 font-heading">
                      {steps[activeStep].title}
                    </h3>

                    <div className="relative rounded-lg bg-slate-50/90 border border-slate-200/80 p-2.5 shadow-sm text-xs">
                      {steps[activeStep].cardContent}
                    </div>

                    {/* Bottom Nav */}
                    <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-200/60 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        {steps.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => handleStepClick(dotIdx)}
                            aria-label={`Go to step ${dotIdx + 1}`}
                            className={`h-1.5 rounded-full transition-all ${
                              activeStep === dotIdx ? 'w-5 bg-[#0052FF]' : 'w-1.5 bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => handleStepClick((activeStep + 1) % steps.length)}
                        className="inline-flex items-center gap-1 font-semibold text-[#0052FF]"
                      >
                        <span>{isAr ? 'التالي' : 'Next'}</span>
                        <ArrowRight size={12} className="rtl:-scale-x-100" />
                      </button>
                    </div>

                  </div>
                </m.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
