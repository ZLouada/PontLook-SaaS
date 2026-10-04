'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  XCircle,
  CheckCircle2,
  BadgeCheck,
  SlidersHorizontal,
  Handshake,
  GraduationCap,
  TrendingUp,
  Workflow,
  ArrowRight,
  ArrowLeft,
  X,
  Target,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
} from '@/components/icons';
import { m, AnimatePresence } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import BorderGlow from '@/components/shared/BorderGlow';
import { spring, ease, dur } from '@/lib/motion';

import ComparisonToggleContent from './ComparisonToggleContent';

interface WhoWeAreProps {
  lang?: 'en' | 'ar';
}

/* ==========================================================================
   SECTION 1: THE INTERACTIVE COMPARISON TOGGLE (ECOMFLOW INSPIRATION)
   ========================================================================== */
export function ComparisonToggleSection({ lang = 'en' }: WhoWeAreProps) {
  return (
    <section
      id="our-mission"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-12 sm:py-16 lg:py-20 border-t border-neutral-200 overflow-hidden"
    >
      <ComparisonToggleContent lang={lang} />
    </section>
  );
}

/* ==========================================================================
   SECTION 2: LINEAR ISOMETRIC VALUE MODEL (LESS CONTENT, HIGH IMPACT)
   ========================================================================== */
export function ValueModelBilateral({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';

  const specs = [
    {
      code: 'SPEC // 01',
      title: isAr ? 'مجاني 100% للمؤسسات' : '100% Free for Buyers',
      desc: isAr
        ? 'وصول كامل إلى محرك التشخيص وقائمة الشركاء بدون أي اشتراكات أو عمولات خفية.'
        : 'Zero platform fees, retainers, or markups. Free requirements diagnosis and curated shortlist.',
      badge: isAr ? 'صفر تكلفة للمشتري' : 'Zero Buyer Cost',
      accent: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    },
    {
      code: 'SPEC // 02',
      title: isAr ? 'وصول تنفيذي مباشر' : 'Direct Executive Access',
      desc: isAr
        ? 'ربط مباشر مع مسؤولي الموارد البشرية والتدريب أصحاب الميزانيات وصلاحيات التعاقد المعتمدة.'
        : 'Direct connection to CHROs and L&D heads with pre-allocated corporate budgets.',
      badge: isAr ? 'صناع قرار معتمدون' : 'Verified Decision Makers',
      accent: 'border-blue-200 bg-blue-50 text-blue-800',
    },
    {
      code: 'SPEC // 03',
      title: isAr ? 'نموذج مبني على النتائج' : 'Success-Based Model',
      desc: isAr
        ? 'يدفع مزودو التدريب فقط عند استلام فرصة مؤكدة، مع ضمان استبدال فوري خلال 5 أيام.'
        : 'Providers only invest on verified introductions. 100% 5-day replacement SLA guarantee.',
      badge: isAr ? 'استثمار مرتبط بالنتيجة' : 'Zero Retainer Risk',
      accent: 'border-amber-200 bg-amber-50 text-amber-800',
    },
    {
      code: 'SPEC // 04',
      title: isAr ? 'دقة الاختيار (2 إلى 3 كحد أقصى)' : 'Curated Precision (2 to 3 Max)',
      desc: isAr
        ? 'نطرح 2 إلى 3 مزودين فقط لكل متطلب، لمنع حرب الأسعار وضمان المنافسة على الجودة.'
        : 'Introductions capped at 2 to 3 per mandate. Providers compete on merit, not price wars.',
      badge: isAr ? 'الدقة فوق الكمية' : 'Merit Over Volume',
      accent: 'border-purple-200 bg-purple-50 text-purple-800',
    },
  ];

  return (
    <section
      id="value-model"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-12 xs:py-16 sm:py-20 lg:py-24 border-t border-neutral-200 overflow-hidden"
      aria-labelledby="value-model-title"
    >
      <div className="container-site relative z-10 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 xs:mb-12 sm:mb-16 space-y-2 xs:space-y-3">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-[10px] xs:text-xs font-semibold uppercase tracking-wider font-sans">
            <ShieldCheck size={14} className="text-blue-600 shrink-0" />
            <span>{isAr ? 'هيكلية النموذج التجاري' : 'BILATERAL VALUE ARCHITECTURE'}</span>
          </div>

          <h2
            id="value-model-title"
            className="text-xl xs:text-2xl sm:text-4xl lg:text-[42px] font-semibold text-neutral-950 font-heading tracking-tight leading-[1.18]"
          >
            {isAr
              ? 'مواءمة ثنائية متكافئة. بدون أي رسوم اشتراك.'
              : 'Bilateral Alignment. Zero Platform Friction.'}
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'نموذج صُمم لتكافؤ المصالح: مجاني للمؤسسات والشركات، ومبني على النتائج لمزودي التدريب.'
              : 'A bilateral model engineered for alignment: free for corporate buyers, success-based for accredited training providers.'}
          </p>
        </div>

        {/* 4 Technical Architecture Specs (White Pop-up Cards in 2-col mobile / 4-col desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-5 items-stretch">
          {specs.map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', damping: 22, stiffness: 300, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-xl sm:rounded-2xl border border-neutral-200/90 hover:border-neutral-400 bg-white p-2.5 xs:p-3.5 sm:p-6 flex flex-col justify-between shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_-8px_rgba(0,0,0,0.12)] text-neutral-900 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-100/60 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-50/80 transition-colors" />
              
              <div className="space-y-1.5 xs:space-y-2 sm:space-y-3 font-sans relative z-10">
                <div className="flex items-center justify-between gap-1 flex-wrap">
                  <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                    {item.code}
                  </span>
                  <span className={`px-1.5 xs:px-2 sm:px-2.5 py-0.5 rounded-full text-[7.5px] xs:text-[8px] sm:text-[10px] font-semibold border ${item.accent}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-[11px] xs:text-xs sm:text-base font-heading font-semibold text-neutral-950 leading-snug group-hover:text-black transition-colors">
                  {item.title}
                </h3>

                <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-600 font-sans leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 xs:pt-3 sm:pt-4 mt-2 xs:mt-3 sm:mt-4 border-t border-neutral-100 flex items-center justify-between text-[8px] xs:text-[9px] sm:text-[11px] text-neutral-500 font-mono relative z-10">
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="truncate">PROTOCOL</span>
                </span>
                <span className="text-neutral-900 font-bold tracking-wider">VERIFIED</span>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
}



/* ==========================================================================
   SECTION 4: THE END TO END TRAINING JOURNEY (UNIFIED TIMELINE)
   ========================================================================== */
export function TrainingJourneyFlow({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      category: isAr ? '01 / التشخيص' : '01 / DIAGNOSTIC',
      navTitle: isAr ? 'رصد وتشخيص الفجوة' : 'Enterprise Need',
      cardTitle: isAr ? 'تشخيص الفجوة' : 'Enterprise Need',
      cardBrief: isAr ? 'حصر الفجوات وتوثيق الميزانية' : 'Diagnose exact skill gaps & budget',
      title: isAr ? 'تشخيص فجوة المهارات وتوثيق الميزانية' : 'Enterprise Skill Gap & Diagnostic',
      desc: isAr
        ? 'تحدد إدارة الموارد البشرية عجزاً تشغيلياً أو قيادياً حرجاً. استيعاب دقيق: حجم المجموعات، طريقة التنفيذ، المتطلبات بالرياض ودبي، والميزانية.'
        : 'HR identifies a critical operational or leadership deficiency. Deep intake: cohort sizing, delivery mode, Riyadh/Dubai onsite requirements, approved budget.',
      tag: isAr ? 'تم التحقق من النطاق والميزانية' : 'Scope & Budget Verified',
      icon: SlidersHorizontal,
      points: [
        isAr ? 'حصر الفجوات التشغيلية والقيادية بالتعاون مع مسؤولي الموارد البشرية' : 'Deficiency Tagged: Operational and leadership gap analysis',
        isAr ? 'تحديد دقيق لأعداد الموظفين المستهدفين والمدن (الرياض، دبي، أو افتراضياً)' : 'Cohort Sizing: Onsite Riyadh, Dubai, or live-virtual delivery',
        isAr ? 'مواءمة الميزانية المعتمدة قبل طرح المتطلبات على المزودين' : 'Budget Confirmed: Pre-allocated budget and learning objectives',
      ],
    },
    {
      num: '02',
      category: isAr ? '02 / التوفيق' : '02 / MATCHMAKING',
      navTitle: isAr ? 'توفيق الخبراء' : 'Specialist Match',
      cardTitle: isAr ? 'توفيق الخبراء' : 'Specialist Match',
      cardBrief: isAr ? '2 إلى 3 عروض مفحوصة ومؤكدة' : '2 to 3 pre-vetted provider proposals',
      title: isAr ? 'توفيق دقيق ومختار (2 إلى 3 خبراء)' : 'Curated Specialist Matchmaking',
      desc: isAr
        ? 'فرز تحليلي وبشري يسلمك 2 إلى 3 خبراء معتمدين مع عروض متوافقة تماماً مع الميزانية. تتجاوز المؤسسة مكالمات المبيعات العشوائية وتقيّم الأنسب فوراً.'
        : 'Analyst-led curation delivering 2 to 3 vetted specialists with budget-aligned proposals. HR skips sales pitches and evaluates proven providers.',
      tag: isAr ? 'محرك بونت لوك المركزي' : 'PontLook Core Engine',
      icon: BadgeCheck,
      points: [
        isAr ? 'استلام 2 إلى 3 عروض مفصلة من نخبة مزودي التدريب المفحوصين' : '2 to 3 Curated Providers: Only elite approved providers evaluated',
        isAr ? 'تسعير شفاف وبنود واضحة متطابقة 100% مع الميزانية' : 'Budget Aligned Proposals: Clear pricing matched to approved budget',
        isAr ? 'درجة ثقة وملاءمة 98% مبنية على سجل تدريب مؤسسي موثق' : '98% Fit Confidence: Verified instructor credentials & past ratings',
      ],
    },
    {
      num: '03',
      category: isAr ? '03 / التنفيذ' : '03 / ROLLOUT',
      navTitle: isAr ? 'تنفيذ مخصص' : 'Tailored Rollout',
      cardTitle: isAr ? 'تنفيذ مخصص' : 'Tailored Rollout',
      cardBrief: isAr ? 'مواءمة المناهج وانطلاق التدريب' : 'Curriculum alignment & kickoff',
      title: isAr ? 'تنفيذ تدريبي مخصص وتأهيل المجموعات' : 'Tailored Delivery Execution',
      desc: isAr
        ? 'توقيع التعاقد، مواءمة المناهج التدريبية، وبدء المدربين والخبراء. يركز مزودو التدريب بنسبة 100% على تقديم أعلى جودة وتفاعل.'
        : 'Contract execution, tailored curriculum, and facilitator onboarding. Providers focus 100% of their energy on high-impact workshop delivery.',
      tag: isAr ? 'جاهزية الانطلاق' : 'Kickoff Ready',
      icon: GraduationCap,
      points: [
        isAr ? 'مواءمة المحتوى التدريبي مع حالات عملية واقعية من بيئة المنشأة' : 'Tailored Curriculum: Content customized to strategic skill gaps',
        isAr ? 'اجتماع تنسيق مباشر مع كبار المدربين والميسرين قبل انطلاق البرنامج' : 'Facilitator Onboarding: Direct alignment with master trainers',
        isAr ? 'جاهزية كاملة للمتدربين مع تأهيل رقمي وجداول حضور دقيقة' : 'Cohort Readiness: Seamless kickoff and digital onboarding',
      ],
    },
    {
      num: '04',
      category: isAr ? '04 / الأثر' : '04 / IMPACT',
      navTitle: isAr ? 'عائد موثق' : 'Measurable ROI',
      cardTitle: isAr ? 'عائد موثق' : 'Measurable ROI',
      cardBrief: isAr ? 'سد فجوة الكفاءة وقياس الأثر' : 'Capability uplift & executive ROI',
      title: isAr ? 'إغلاق فجوة المهارات وعائد استثماري ملموس' : 'Closed Skill Gap & Measurable ROI',
      desc: isAr
        ? 'ارتقاء ملموس بالكفاءات، تقييم موظفين دقيق، وعائد استثماري مستدام لإدارة الشركة. تم سد فجوة الكفاءة بنجاح.'
        : 'Measurable capability uplift, employee post evaluation, and sustained ROI delivered to executive leadership.',
      tag: isAr ? 'عائد استثماري موثق' : 'Verified ROI Capture',
      icon: TrendingUp,
      points: [
        isAr ? 'قياس كمي ودقيق لارتقاء كفاءات المتدربين مقارنة بالتقييم القبلي' : 'Measurable Uplift: Documented workforce competency boost',
        isAr ? 'تقارير أثر تفصيلية واستبانات رضا موثقة تُقدم للإدارة التنفيذية' : 'Post Evaluation: Data-driven assessments & feedback analytics',
        isAr ? 'عائد استثماري ملموس ومستدام يعزز إنتاجية المنشأة ويقلل الهدر' : 'Defensible ROI: Tangible business return delivered to C-suite',
      ],
    },
  ];

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      id="training-journey"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-12 xs:py-16 sm:py-24 border-t border-neutral-200 overflow-hidden"
      aria-labelledby="journey-title"
    >
      <div className="container-site relative z-10 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 xs:mb-10 sm:mb-12 space-y-2 xs:space-y-3">
          <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-[10px] xs:text-xs font-semibold uppercase tracking-wider font-sans">
            <Workflow size={14} className="text-neutral-900 shrink-0" />
            <span>{isAr ? 'المراحل التشغيلية الأربع' : '4-STAGE OPERATIONAL ROADMAP'}</span>
          </div>

          <h2
            id="journey-title"
            className="text-xl xs:text-2xl sm:text-4xl font-semibold text-neutral-950 font-heading tracking-tight leading-tight"
          >
            {isAr
              ? 'رحلة التدريب من التشخيص حتى قياس الأثر'
              : 'The End to End Training Journey'}
          </h2>

          <p className="text-xs xs:text-sm sm:text-base text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'جسر شفاف وسلس يربط الاحتياج التدريبي المشخص بالحلول العملية ذات العائد الاستثماري القابل للقياس.'
              : 'A seamless, transparent bridge from diagnosed skill deficit to measurable business impact.'}
          </p>
        </div>

        {/* 4 Ecomflow-Inspired Stage Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-4 sm:mb-6 w-full">
          {steps.map((st, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`group relative text-start p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[105px] sm:min-h-[120px] ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md shadow-neutral-900/15'
                    : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50/80 shadow-xs'
                }`}
              >
                <div>
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider block ${
                    isActive ? 'text-white/70' : 'text-neutral-400'
                  }`}>
                    {st.category}
                  </span>
                  <h4 className={`text-xs sm:text-sm font-heading font-bold mt-1 leading-snug ${
                    isActive ? 'text-white' : 'text-neutral-950'
                  }`}>
                    {st.cardTitle}
                  </h4>
                  <p className={`text-[10px] sm:text-[11px] font-sans mt-0.5 leading-tight line-clamp-2 ${
                    isActive ? 'text-white/80' : 'text-neutral-500'
                  }`}>
                    {st.cardBrief}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 mt-auto">
                  <ArrowRight
                    size={13}
                    className={`rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 ${
                      isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-950'
                    }`}
                  />
                </div>

                {/* Connecting Arrow Notch pointing down to the active content below */}
                {isActive && (
                  <div
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[9px] border-t-neutral-900 z-20 hidden md:block"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel (Ecomflow Connected Container) */}
        <AnimatePresence mode="wait">
          <m.div
            key={currentStep.num}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: ease.out }}
            className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-4 sm:p-7 lg:p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06),0_10px_25px_-5px_rgba(0,0,0,0.03)] text-neutral-900 space-y-4 sm:space-y-6 relative overflow-hidden"
          >
            {/* Top Modal Window Header */}
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-neutral-100 text-xs font-mono text-neutral-500">
              <span className="text-[10px] sm:text-xs font-mono text-neutral-900 font-bold uppercase tracking-wider truncate">
                STAGE {currentStep.num} • {isAr ? 'المرحلة التشغيلية' : 'OPERATIONAL PROTOCOL'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                {currentStep.tag}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 items-start">
              <div className="lg:col-span-4 space-y-1 sm:space-y-1.5 text-start">
                <h3 className="text-base sm:text-xl font-heading font-semibold text-neutral-950 leading-snug">
                  {currentStep.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                  {currentStep.desc}
                </p>
              </div>

              {/* 3 Deliverables */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-start">
                {currentStep.points.map((pt, pIdx) => (
                  <div key={pIdx} className="p-2.5 sm:p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-300 transition-colors space-y-1">
                    <div className="flex items-center gap-1.5 text-neutral-900 font-bold text-[11px] sm:text-xs">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{isAr ? `معيار ${pIdx + 1}` : `Deliverable ${pIdx + 1}`}</span>
                    </div>
                    <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed font-sans">{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </m.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

/* ==========================================================================
   MASTER COMPOSITE EXPORT
   ========================================================================== */
export default function WhoWeAreSections({ lang = 'en' }: WhoWeAreProps) {
  return (
    <div data-nav-light="true" data-nav-theme="light">
      <ValueModelBilateral lang={lang} />
      <TrainingJourneyFlow lang={lang} />
    </div>
  );
}

