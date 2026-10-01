'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  SlidersHorizontal,
  BadgeCheck,
  Scale,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from '@/components/icons';
import TextReveal from '@/components/shared/TextReveal';
import { ease } from '@/lib/motion';

interface StepRecord {
  id: string;
  index: string;
  icon: React.ElementType;
  frameVariant?: string;
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

  const steps: StepRecord[] = [
    {
      id: 'step-specify',
      index: '01',
      icon: SlidersHorizontal,
      frameVariant: 'blue',
      badge: isAr ? 'استيعاب دقيق' : 'Rapid Scoping',
      title: isAr ? 'حدد المتطلبات والاحتياج' : 'Specify Training Needs',
      angle: isAr ? 'استبيان تفاعلي خلال 60 ثانية بدون تعقيدات' : '60-Second Interactive Intake',
      body: isAr
        ? 'حدد المهارات المستهدفة، أسلوب التدريب (حضوري أو افتراضي)، المدينة، وحجم الفريق في نموذج تفاعلي ومباشر.'
        : 'Define your targeted skills, delivery mode, city, and cohort size in our 60 second interactive questionnaire. No tedious RFP drafting.',
      takeaways: [
        isAr ? 'تغطية متخصصة لأكثر من 20 مجالاً تدريبياً مؤسسياً معتمداً' : 'Specialized coverage across 20+ accredited enterprise training domains',
        isAr ? 'تخصيص فوري للموقع: الرياض، جدة، الدمام، دبي، أبوظبي، أو عن بُعد' : 'Targeted city selection: Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi, or live remote',
        isAr ? 'حصر أهداف البرنامج ومواءمتها مع متطلبات التوطين والتحول الرقمي' : 'Targeted alignment with Saudization, Emiratization, or tech upskilling KPIs',
      ],
      mockup: (
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <SlidersHorizontal size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'ملف كراسة التدريب المؤسسي' : 'Enterprise RFP Intake Brief'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'بيانات الاحتياج المسجلة' : 'Submitted Scope Specifications'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {isAr ? 'جاهز للمطابقة' : 'Intake Ready'}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'المجال المستهدف:' : 'Domain:'}</span>
              <span className="text-white font-medium">{isAr ? 'القيادة التنفيذية وإدارة التغيير' : 'Executive Leadership & Change'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'الموقع والفوج:' : 'Location & Cohort:'}</span>
              <span className="text-orange-400 font-medium">{isAr ? 'حضوري بالرياض · 25 متدرب' : 'Onsite Riyadh · 25 Executives'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'الجدول الزمني المستهدف:' : 'Target Timeline:'}</span>
              <span className="text-emerald-400 font-medium">{isAr ? 'خلال الربع القادم' : 'Upcoming Quarter Start'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step-matching',
      index: '02',
      icon: BadgeCheck,
      frameVariant: 'emerald',
      badge: isAr ? 'فحص واعتماد الخبراء' : 'Dual-Screening Vetting',
      title: isAr ? 'المطابقة والتحقق من المدربين' : 'Matching & Faculty Vetting',
      angle: isAr ? 'فرز أكثر من 120 مزود معتمد لضمان نخبة الميسرين' : 'Screening 120+ Accredited GCC Entities',
      body: isAr
        ? 'يفحص فريقنا المختص أكثر من 120 مزود تدريب معتمد لاختيار أفضل المدربين أصحاب السجلات والإنجازات الموثوقة.'
        : 'Our matching desk screens 120+ accredited providers to select facilitators with verified enterprise outcomes and verified credentials.',
      takeaways: [
        isAr ? 'التحقق المباشر من سجلات وخبرات المدربين والتأكد من مطابقتهم' : 'Independent verification of instructor track records and industry certifications',
        isAr ? 'فحص تقييمات العملاء السابقين والجهات الحكومية والخاصة بالمنطقة' : 'Review of historical participant ratings across GCC corporate deployments',
        isAr ? 'سرية تامة لبيانات مسؤولي الموارد البشرية ومنع أي اتصالات تسويقية مزعجة' : 'Zero cold spam or unsolicited vendor outreach; total decision maker privacy',
      ],
      mockup: (
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <BadgeCheck size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'معايير فحص واعتماد المزود' : 'Provider Vetting Scorecard'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'مؤشرات جودة التدريب المعتمدة' : 'Compliance & Quality Standards'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {isAr ? 'معتمد 100%' : '100% Vetted'}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-300">{isAr ? 'اعتماد المنشأة والترخيص المهني:' : 'Accredited Corporate Entity:'}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> {isAr ? 'مرخص' : 'Verified'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-300">{isAr ? 'خبرة المدرب التنفيذي:' : 'Facilitator Seniority:'}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> 10+ {isAr ? 'سنوات بالخليج' : 'Yrs GCC'}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-300">{isAr ? 'معدل رضا المتدربين السابق:' : 'Historical Satisfaction:'}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> 4.9 / 5.0
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
      frameVariant: 'brand',
      badge: isAr ? 'مقارنة شفافة' : 'Proposal Comparison',
      title: isAr ? 'استلم وقارن العروض' : 'Compare Itemized Proposals',
      angle: isAr ? '2 إلى 3 عروض مفصلة خلال 48 ساعة وبدون أي التزام' : '2 to 3 Proposals in 48h · Zero Obligation',
      body: isAr
        ? 'استلم من 2 إلى 3 عروض مفصلة خلال 48 ساعة متضمنة خطط البرامج والتكاليف الشفافة، وبدون أي التزام بالشراء.'
        : 'Receive 2 to 3 tailored proposals within 48 hours with custom syllabi, transparent pricing, and zero purchase obligation.',
      takeaways: [
        isAr ? 'عروض أسعار مفصلة بالبنود (رسوم التدريب، المواد، التقييم، الشهادات)' : 'Itemized line-by-line budgets with transparent breakdown and zero surprises',
        isAr ? 'حرية كاملة في تقييم واختيار العرض الأنسب لإدارة شركتك' : '100% freedom to review, negotiate, or decline with zero purchasing pressure',
        isAr ? 'خدمة مجانية 100% للمنشآت الباحثة عن تدريب' : '100% free matchmaking service for enterprise buyers with no hidden fees',
      ],
      mockup: (
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-orange-500/10 text-[#FF5C00] flex items-center justify-center font-bold">
                <Scale size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'جدول مقارنة العروض المتطابقة' : 'Comparative Proposal Matrix'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'عروض معتمدة خلال 48 ساعة' : 'Standardized Evaluation Grid'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {isAr ? 'مواءمة الميزانية' : 'Budget Fit'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0F1013] border border-[#26282D]">
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">{isAr ? 'العرض أ' : 'Proposal Alpha'}</div>
              <div className="text-xs font-bold text-white mt-1">{isAr ? 'ورش مكثفة حضوري' : 'Intensive Onsite'}</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">{isAr ? 'مطابقة تامة للميزانية' : 'Target Budget Match'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0F1013] border border-[#26282D]">
              <div className="text-[10px] text-neutral-400 uppercase font-semibold">{isAr ? 'العرض ب' : 'Proposal Beta'}</div>
              <div className="text-xs font-bold text-white mt-1">{isAr ? 'تدريب هجين + مشاريع' : 'Blended + Projects'}</div>
              <div className="text-[10px] text-blue-400 mt-0.5">{isAr ? 'تأهيل كفاءات ممتد' : 'Extended Follow-up'}</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[activeStep] || steps[0];

  return (
    <div className="w-full">
      {/* Animated Section Header */}
      <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
          <span>{isAr ? 'منظومة التوفيق والمطابقة' : 'HOW MATCHMAKING WORKS'}</span>
        </div>

        <TextReveal
          as="h2"
          text={isAr ? '3 خطوات للحصول على أفضل عروض التدريب' : '3 Simple Steps to Proven Training Solutions'}
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-tight"
        />

        <p className="text-xs xs:text-sm sm:text-base text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'عملية توفيق دقيقة وسريعة توفر عليك أسابيع من البحث والتقييم اليدوي. تصفح الخطوات لاستكشاف معايير التدقيق والضمانات.'
            : 'A streamlined matchmaking process saving weeks of vendor searching. Navigate the steps to inspect the vetting rubric.'}
        </p>
      </div>

      {/* Premium Master Interactive Console */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#26282D] bg-[#0A0B0E] p-4 xs:p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] relative overflow-hidden text-white">
        {/* Subtle Ambient Depth (No Grid Lines, No Scanner) */}
        <div className="pointer-events-none absolute -top-24 right-0 w-80 h-80 bg-blue-500/[0.04] rounded-full blur-[100px]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-orange-500/[0.02] rounded-full blur-[100px]" aria-hidden="true" />

        {/* Step Selector Tabs Bar */}
        <div className="flex items-center gap-1.5 xs:gap-2 p-1.5 rounded-2xl bg-[#121318] border border-[#26282D] mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
          {steps.map((st, i) => {
            const isActive = activeStep === i;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setActiveStep(i)}
                className={`relative flex items-center gap-2 xs:gap-2.5 px-3 xs:px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <m.div
                    layoutId="active-find-step-tab"
                    className="absolute inset-0 rounded-xl bg-white/[0.10] border border-white/20 shadow-sm"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                )}
                <span className={`relative z-10 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md font-mono text-[10px] sm:text-xs font-bold ${
                  isActive ? 'bg-[#FF5C00] text-white' : 'bg-white/[0.05] text-neutral-400 border border-white/10'
                }`}>
                  {st.index}
                </span>
                <span className="relative z-10 font-sans tracking-tight">{st.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Content Stage */}
        <AnimatePresence mode="wait">
          <m.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: ease.out }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start relative z-10"
          >
            {/* Left Column: Details & Key Advantages */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/[0.04] border border-[#26282D] text-neutral-300 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{currentStep.angle}</span>
                </span>

                <h3 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white font-heading tracking-tight leading-tight">
                  {currentStep.title}
                </h3>

                <p className="mt-2.5 text-xs xs:text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-xl">
                  {currentStep.body}
                </p>
              </div>

              {/* Key Advantages / Output list */}
              <div className="pt-3 border-t border-[#26282D] space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  {isAr ? 'المزايا والمخرجات الأساسية' : 'KEY ADVANTAGES & OUTPUT'}
                </div>

                <div className="space-y-2">
                  {currentStep.takeaways.map((point: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-[#26282D] text-xs sm:text-sm text-neutral-300">
                      <ShieldCheck size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Mockup Dossier (Without Scanner) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl border border-[#26282D] bg-[#0F1013] p-3 sm:p-4 shadow-xl">
                {currentStep.mockup}
              </div>
            </div>
          </m.div>
        </AnimatePresence>

        {/* Bottom Navigation & CTA Bar */}
        <div className="mt-8 pt-6 border-t border-[#26282D] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))}
              aria-label={isAr ? 'الخطوة السابقة' : 'Previous step'}
              className="h-9 w-9 rounded-xl border border-[#26282D] bg-white/[0.04] hover:bg-white/[0.10] text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight size={16} className={isAr ? '' : 'rotate-180'} />
            </button>

            <span className="font-mono text-xs text-neutral-400 px-2 tabular-nums">
              {currentStep.index} / {String(steps.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))}
              aria-label={isAr ? 'الخطوة التالية' : 'Next step'}
              className="h-9 w-9 rounded-xl border border-[#26282D] bg-white/[0.04] hover:bg-white/[0.10] text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight size={16} className={isAr ? 'rotate-180' : ''} />
            </button>
          </div>

          <Link
            href={`/${lang}/find-training/request`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 sm:px-8 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs sm:text-sm shadow-md active:scale-95 transition-all font-sans"
          >
            <span>{isAr ? 'ابدأ طلب عروض التدريب' : 'Request Training Proposals'}</span>
            <ArrowRight size={15} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
