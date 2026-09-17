'use client';

import { useState, useRef, useEffect } from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useParams } from 'next/navigation';

export default function HowItWorks() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        <div className="space-y-5">
          {/* Top header badge */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-[#0052FF] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/25">
                <Building2 size={22} />
              </div>
              <div>
                <div className="text-base font-semibold text-slate-900 font-sans">
                  {isAr ? 'تم رصد إشارة طلب مؤكدة' : 'Demand Signal Detected'}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {isAr ? 'مؤسسة معتمدة · المملكة العربية السعودية' : 'Verified Enterprise · Saudi Arabia'}
                </div>
              </div>
            </div>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>

          {/* Signal parameters */}
          <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/70 space-y-2.5">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">{isAr ? 'القطاع والمجال' : 'Sector & Domain'}</span>
              <span className="text-slate-900 font-semibold">{isAr ? 'الخدمات المالية والمصرفية' : 'Banking & FinTech'}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">{isAr ? 'حجم القوة العاملة' : 'Workforce Size'}</span>
              <span className="font-mono font-bold text-slate-800">1,200+ {isAr ? 'موظف' : 'Employees'}</span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">{isAr ? 'الميزانية التقديرية' : 'Allocated Budget'}</span>
              <span className="font-mono font-bold text-emerald-600">SAR 450,000+</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-mono font-semibold border border-emerald-200 inline-flex items-center gap-1.5">
              <CheckCircle2 size={13} /> {isAr ? 'أولوية عاجلة' : 'High Intent'}
            </span>
            <span className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#0052FF] text-xs font-mono font-semibold border border-blue-200">
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
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
            <div>
              <div className="text-base font-semibold text-slate-900 font-sans">
                {isAr ? 'مؤشر جودة التطابق' : 'Match Quality Score'}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {isAr ? 'مطابقة متطلبات المحتوى والأثر' : 'Curriculum & Track Record Fit'}
              </div>
            </div>
            <div className="text-xs sm:text-sm font-mono font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              94% Match
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm text-slate-600 font-medium">
              <span>{isAr ? 'اكتمال معايير التأهيل' : 'Criteria Fulfilled'}</span>
              <span className="font-mono font-bold text-slate-900">4 / 4 Complete</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div className="h-full bg-gradient-to-r from-[#0052FF] to-emerald-500 rounded-full w-[94%]" />
            </div>
          </div>

          <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/90 border border-slate-200/50">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span>{isAr ? 'صانع القرار: رئيس الموارد البشرية التنفيذي' : 'Decision Maker: Chief Human Resources Officer'}</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50/90 border border-slate-200/50">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
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
        <div className="space-y-5">
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#0052FF] to-[#FF5C00] p-[2px] shadow-sm">
              <div className="h-full w-full rounded-[14px] bg-white flex items-center justify-center text-[#0052FF]">
                <Award size={22} />
              </div>
            </div>
            <div>
              <div className="text-base font-semibold text-slate-900 font-sans">
                {isAr ? 'تم إتمام التقديم المباشر' : 'Warm Introduction Completed'}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {isAr ? 'تواصل مباشر مع مالك الميزانية المؤسسية' : 'Direct access to enterprise budget owner'}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 space-y-2.5">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">{isAr ? 'حالة الصفقة' : 'Pipeline Status'}</span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 text-xs">
                {isAr ? 'مرحلة تقديم العرض الفني' : 'Proposal Presentation Stage'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">{isAr ? 'ضمان الفرصة' : 'Engagement Guarantee'}</span>
              <span className="font-semibold text-slate-800">{isAr ? 'ضمان استبدال خلال 5 أيام' : '5 Day Replacement Guarantee'}</span>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs sm:text-sm text-slate-500">
            <span>{isAr ? 'بدون عمولات خفية' : 'Zero hidden commission'}</span>
            <span className="font-mono font-bold text-[#0052FF]">{isAr ? 'علاقة تعاقدية مباشرة' : '100% Direct Contract'}</span>
          </div>
        </div>
      ),
    },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    stepRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  // Scroll spy to update active step as user scrolls through the steps on the left
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const centerY = windowHeight * 0.45;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= centerY && rect.bottom >= centerY) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative bg-white text-slate-900 py-16 sm:py-24 lg:py-32 border-t border-slate-200 overflow-hidden"
    >
      {/* Background Full-White Cross (+) Grid Pattern (Matching Attio Style) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 20V28M20 24H28' stroke='%2364748B' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Subtle background ambient glow */}
      <div className="absolute top-1/4 start-1/4 w-[600px] h-[600px] bg-blue-500/[0.04] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 end-1/4 w-[600px] h-[600px] bg-indigo-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Heading & Scrolling Step Triggers */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-12">
            {/* Main Section Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-semibold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                <span>{dict.how_it_works?.eyebrow || (isAr ? 'في ثلاث خطوات بسيطة' : 'Just in three steps')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-[-0.03em] leading-tight font-heading">
                {dict.how_it_works?.title || (isAr ? 'نحدد المنشآت التي تواجه فجوات تدريب حقيقية' : 'We pinpoint organizations facing real skill & training gaps')}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                {dict.how_it_works?.subtitle || (isAr ? 'منهجيتنا: كيف نربط السوق ونتحقق من الاحتياج ونطابق المزود الأنسب' : 'OUR APPROACH: How We Connect the Market: Learn, Diagnose, and Get Matched')}
              </p>
            </div>

            {/* Step triggers on the left that activate as the user scrolls */}
            <div className="space-y-6 sm:space-y-8 pt-2">
              {steps.map((s, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={s.id}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                    onClick={() => handleStepClick(index)}
                    className={`cursor-pointer p-6 sm:p-7 rounded-3xl border transition-all duration-300 ${
                      isActive
                        ? 'bg-white border-[#0052FF]/60 shadow-[0_12px_30px_-8px_rgba(0,82,255,0.15)] ring-1 ring-[#0052FF]/30'
                        : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300 shadow-sm opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-mono font-bold text-sm transition-all ${
                          isActive
                            ? 'bg-[#0052FF] text-white shadow-md shadow-blue-500/30'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {s.number}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h3
                            className={`font-semibold text-base sm:text-lg transition-colors font-heading ${
                              isActive ? 'text-slate-900' : 'text-slate-700'
                            }`}
                          >
                            {s.navTitle}
                          </h3>
                          {isActive && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-[#0052FF] border border-blue-200">
                              {s.badge}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isActive ? 'text-slate-600' : 'text-slate-500'
                          }`}
                        >
                          {s.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Single Card Pop-Up in Place (Attio Style) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 sm:lg:top-36 self-start w-full">
            <div className="w-full max-w-xl mx-auto">
              <AnimatePresence mode="wait">
                <m.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -18 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                  className="w-full"
                >
                  {/* Card with White Transparent Frosted Glass Background */}
                  <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-6 sm:p-8 lg:p-10 overflow-hidden">
                    
                    {/* Top Accent Gradient Bar */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0052FF] via-[#4D7CFF] to-[#FF5C00]/80" />

                    {/* Card Header Info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pt-1">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#0052FF] text-white text-xs font-mono font-semibold shadow-md shadow-blue-500/25">
                          {steps[activeStep].badge}
                        </span>
                        <span className="text-xs font-mono font-medium text-slate-500">
                          {steps[activeStep].highlight}
                        </span>
                      </div>

                      <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-300">
                        {steps[activeStep].number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 tracking-tight leading-snug mb-3 font-heading">
                      {steps[activeStep].title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans mb-8">
                      {steps[activeStep].subtitle}
                    </p>

                    {/* Inner Content Card */}
                    <div className="relative rounded-2xl bg-white/95 border border-slate-200/80 p-5 sm:p-6 shadow-sm">
                      {steps[activeStep].cardContent}
                    </div>

                    {/* Bottom step switcher indicator pills */}
                    <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-200/60 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        {steps.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => handleStepClick(dotIdx)}
                            aria-label={`Go to step ${dotIdx + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              activeStep === dotIdx ? 'w-8 bg-[#0052FF]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => handleStepClick((activeStep + 1) % steps.length)}
                        className="inline-flex items-center gap-1.5 font-semibold text-[#0052FF] hover:text-blue-700 transition-colors"
                      >
                        <span>{isAr ? 'الخطوة التالية' : 'Next Step'}</span>
                        <ArrowRight size={14} className="rtl:-scale-x-100" />
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


