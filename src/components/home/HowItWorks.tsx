'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight, CheckCircle2 } from '@/components/icons';
import { m, AnimatePresence } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import BorderBeam from '@/components/shared/BorderBeam';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import BorderGlow from '@/components/shared/BorderGlow';
import { spring, ease, dur } from '@/lib/motion';

export default function HowItWorks() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const [activeStep, setActiveStep] = useState(0);

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
      tagColor: 'text-amber-400',
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
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'رادار الاحتياج المؤسسي' : 'Enterprise Demand Feed'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-emerald-400 text-[10px] font-medium">
              <Signal />
              <span>{isAr ? 'إشارة نشطة' : 'Active Signal'}</span>
            </div>
          </div>

          {/* Lead Item 1 */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#16171B] border border-[#26282D] space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                {isAr ? 'الخدمات المالية والمصرفية · الرياض' : 'Banking & FinTech · Riyadh'}
              </span>
              <span className="font-bold text-emerald-400 tabular-nums">SAR 450,000+</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>{isAr ? '1,200+ موظف' : '1,200+ Employees'}</span>
              <span className="text-amber-400 font-medium">
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
              <span className="font-bold text-blue-400">
                {isAr ? 'ميزانية مؤكدة' : 'Confirmed Budget'}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>{isAr ? 'التحول الرقمي والذكاء الاصطناعي' : 'Digital Transformation & AI'}</span>
              <span className="text-emerald-400 font-medium">
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
      tagColor: 'text-purple-400',
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
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'منظومة المطابقة والتأهيل' : 'Match & Qualification'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-emerald-400 text-xs font-bold">
              <Signal />
              <span>94%</span>
              <span className="text-[10px] font-normal">{isAr ? 'تطابق' : 'Match'}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-neutral-300 font-medium">
              <span>{isAr ? 'معايير التأهيل المكتملة' : 'Criteria Fulfilled'}</span>
              <span className="font-bold text-white">4 / 4 Complete</span>
            </div>
            <div className="h-1.5 w-full bg-[#16171B] border border-[#26282D] rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full w-[94%]" />
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
      tagColor: 'text-teal-400',
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
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'لوحة التعاقد المباشر' : 'Direct Engagement Console'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-teal-400 text-[10px] font-medium">
              <Signal />
              <span>{isAr ? 'تم التقديم' : 'Intro Complete'}</span>
            </div>
          </div>

          {/* Status Box */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#16171B] border border-[#26282D] space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">{isAr ? 'حالة الفرصة' : 'Pipeline Status'}</span>
              <span className="font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
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
            <span className="font-bold text-teal-400">
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
      data-nav-dark="true"
      className="relative bg-black text-white py-14 sm:py-20 lg:py-24 scroll-mt-20 overflow-hidden"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/4 start-10 w-[500px] h-[500px] bg-white/[0.015] blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 end-10 w-[500px] h-[500px] bg-white/[0.01] blur-[160px] pointer-events-none rounded-full" />

      <div className="container-site relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Section Title, Subtitle, Highlights & Dedicated "Join Network" button */}
          <div className="lg:col-span-5 flex flex-col items-start text-start space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-semibold uppercase tracking-wider font-sans">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>{isAr ? 'آلية العمل خطوة بخطوة' : 'HOW IT WORKS // POSTFLOWS'}</span>
            </div>

            <TextReveal
              as="h2"
              text={dict.how_it_works?.title || (isAr ? 'الرحلة من التحدي إلى الحل.' : 'The journey from challenge to solution.')}
              className="text-2xl sm:text-4xl lg:text-[42px] font-semibold text-white tracking-tight leading-[1.18] font-heading"
            />

            <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
              {dict.how_it_works?.subtitle ||
                (isAr
                  ? 'ربط صناع القرار بشركات تدريب الشركات عبر طلب موثق ومؤكد'
                  : 'Connecting decision-makers with corporate training firms through verified demand')}
            </p>

            {/* Benefit Checkpoints */}
            <div className="space-y-2.5 pt-1 w-full text-xs sm:text-sm text-neutral-300 font-sans">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>{isAr ? 'ميزانيات معتمدة مؤكدة مع الإدارة المالية' : 'Pre-allocated corporate training budgets'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>{isAr ? 'مواءمة دقيقة مع 2 إلى 3 خبراء معتمدين كحد أقصى' : '2 to 3 curated specialists per mandate (Zero bidding wars)'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>{isAr ? 'بدون اشتراكات شهرية، الدفع فقط مقابل النتائج' : 'Strict pay-on-success model with 5-day replacement SLA'}</span>
              </div>
            </div>

            {/* Requested Prominent Button: "Join network" / subtitle: "for training providers" */}
            <div className="pt-3 w-full sm:w-auto">
              <Magnetic strength={0.2} activeDistance={35}>
                <Link
                  href={`/${lang}/for-providers/apply`}
                  className="group inline-flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#16171B] hover:bg-[#1C1E24] border border-white/15 hover:border-white/35 transition-all duration-200 shadow-xl w-full sm:min-w-[280px]"
                >
                  <div className="flex flex-col text-start">
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-white transition-colors">
                      {isAr ? 'انضم إلى الشبكة' : 'Join network'}
                    </span>
                    <span className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      {isAr ? 'لمزودي التدريب' : 'for training providers'}
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-white/[0.08] group-hover:bg-white/[0.16] border border-white/10 flex items-center justify-center text-white transition-colors shrink-0">
                    <ArrowRight size={16} className="rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* RIGHT COLUMN: Steps Tabs on Top + Live Card with Mockup */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Step Navigation Tabs on Top */}
            <div className="flex items-center justify-start gap-1.5 sm:gap-2.5 w-full overflow-x-auto scrollbar-none py-1">
              {steps.map((st, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={st.id}
                    onClick={() => setActiveStep(idx)}
                    className={`group relative shrink-0 flex-1 min-w-[110px] sm:min-w-0 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 sm:px-4 rounded-xl border transition-all duration-200 text-xs font-medium cursor-pointer active:scale-95 ${
                      isActive
                        ? 'text-white border-white/25 bg-white/[0.08]'
                        : 'bg-[#111215] text-neutral-400 border-white/10 hover:border-white/20 hover:text-neutral-200'
                    }`}
                  >
                    <span className={`text-[11px] font-mono font-bold shrink-0 ${isActive ? st.tagColor : 'text-neutral-500'}`}>
                      {st.stepNumber}
                    </span>
                    <span className="truncate font-semibold">{st.navTitle}</span>
                    {isActive && (
                      <div className="shrink-0 ms-1">
                        <Signal size={14} />
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
                  className="relative rounded-2xl sm:rounded-3xl border border-white/15 hover:border-white/25 bg-[#0F1013] p-4 sm:p-6 lg:p-7 shadow-2xl overflow-hidden transition-colors"
                >
                  <BorderBeam size={260} duration={12} colorFrom="#FF5C00" colorTo="#0052FF" />
                  <BorderGlow glowColor="rgba(255, 92, 0, 0.35)" size={280} opacity={0.5} />

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
                    <CardTilt3D maxTilt={4} glareOpacity={0.12} className="w-full pt-1">
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
      </div>
    </section>
  );
}

