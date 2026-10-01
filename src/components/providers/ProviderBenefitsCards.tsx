'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  CircleDollarSign,
  Target,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
} from '@/components/icons';
import TextReveal from '@/components/shared/TextReveal';
import { ease } from '@/lib/motion';

interface BenefitRecord {
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

interface ProviderBenefitsCardsProps {
  lang: string;
}

export default function ProviderBenefitsCards({ lang }: ProviderBenefitsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const benefits: BenefitRecord[] = [
    {
      id: 'pay-per-lead',
      index: '01',
      icon: CircleDollarSign,
      frameVariant: 'brand',
      badge: isAr ? 'نموذج الدفع بالأداء' : 'Performance-Based',
      title: isAr ? 'انعدام مخاطر الرسوم الشهرية' : 'Pay Per Lead, Not Per Month',
      angle: isAr ? 'صفر اشتراكات ثابتة · دفع حصري لكل صانع قرار' : 'Zero Retainers · Pay Per Qualified Buyer',
      body: isAr
        ? 'لا توجد رسوم إدارة أو اشتراكات شهرية ثابتة. الدفع يتم حصراً لكل صانع قرار مؤكد ومؤهل يتم تقديمه لك مع كراسة متطلبات واضحة.'
        : 'No monthly management fees or fixed retainers. You pay strictly per verified decision maker delivered ($50 to $200 per lead).',
      takeaways: [
        isAr ? 'انعدام الالتزامات التعاقدية الطويلة أو رسوم الوكالات التقليدية' : 'No binding annual contracts or recurring agency retainer fees',
        isAr ? 'ضمان استبدال فوري 100% لأي فرصة لا تطابق شروط التأهيل المعتمدة' : '100% instant lead replacement SLA for non-qualifying contacts',
        isAr ? 'تكلفة استحواذ عملاء محسوبة بدقة وقابلة للتوسع وفق طاقتك الاستيعابية' : 'Predictable CAC scaling directly aligned with your delivery bandwidth',
      ],
      mockup: (
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-orange-500/10 text-[#FF5C00] flex items-center justify-center font-bold">
                <CircleDollarSign size={15} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'مقارنة اقتصاديات الاستحواذ' : 'Acquisition Unit Economics'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'الرسوم الشهرية مقابل PontLook' : 'Traditional Retainer vs PontLook'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {isAr ? 'عائد استثماري مضمون' : 'Guaranteed ROI'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0F1013] border border-[#26282D]">
              <div className="text-[10px] text-neutral-500 uppercase">{isAr ? 'الاشتراك الشهري التقليدي' : 'Traditional Retainer'}</div>
              <div className="text-sm font-semibold text-neutral-400 line-through mt-0.5">$3,500 / {isAr ? 'شهر' : 'mo'}</div>
              <div className="text-[10px] text-red-400 mt-1">{isAr ? 'نتائج غير مضمونة' : 'Zero output guarantee'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-orange-500/5 border border-orange-500/30">
              <div className="text-[10px] text-orange-400 uppercase font-semibold">{isAr ? 'نموذج PontLook' : 'PontLook Model'}</div>
              <div className="text-sm font-bold text-white mt-0.5">$0 {isAr ? 'اشتراك' : 'Retainer'}</div>
              <div className="text-[10px] text-emerald-400 mt-1 font-medium">{isAr ? 'دفع فقط عند استلام الفرصة' : 'Pay strictly per lead'}</div>
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
            <span>{isAr ? 'اتفاقية مستوى الخدمة: استبدال أي فرصة غير مطابقة خلال 48 ساعة' : 'SLA: Instant replacement for any disputed lead within 48h'}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'qualified-buyers',
      index: '02',
      icon: Target,
      frameVariant: 'blue',
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
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-orange-500/10 text-[#FF5C00] flex items-center justify-center font-bold">
                <Target size={15} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'بطاقة تأهيل الفرصة المؤسسية' : 'Enterprise Lead Dossier'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'عينة من بيانات الفرصة المسلمة' : 'Sample Verified Lead Specification'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {isAr ? 'مؤهل تنفيذي' : 'Tier-A Qualified'}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'صانع القرار المستهدف:' : 'Decision Maker:'}</span>
              <span className="text-white font-medium">{isAr ? 'نائب رئيس الموارد البشرية (الرياض)' : 'VP of Human Resources (Riyadh)'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'المجال التدريبي:' : 'Training Domain:'}</span>
              <span className="text-orange-400 font-medium">{isAr ? 'برنامج تطوير القيادات التنفيذية' : 'Executive Leadership Acceleration'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'حجم الفوج والميزانية:' : 'Cohort & Budget:'}</span>
              <span className="text-emerald-400 font-medium">35 {isAr ? 'متدرب' : 'execs'} · SAR 120,000+</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'consistent-pipeline',
      index: '03',
      icon: TrendingUp,
      frameVariant: 'emerald',
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
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-orange-500/10 text-[#FF5C00] flex items-center justify-center font-bold">
                <TrendingUp size={15} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'جدول توزيع الفرص الفصلي' : 'Quarterly Opportunity Schedule'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'توزيع تدفق الطلبات عبر الفصول' : 'Active Intake Distribution'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {isAr ? 'طلب نشط' : 'Active Demand'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <div className="text-[10px] text-neutral-400 font-mono">Q1 (Jan-Mar)</div>
              <div className="text-sm font-bold text-white mt-0.5">14 {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-orange-400">{isAr ? 'تأهيل القيادات' : 'Leadership'}</div>
            </div>
            <div className="p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <div className="text-[10px] text-neutral-400 font-mono">Q2 (Apr-Jun)</div>
              <div className="text-sm font-bold text-white mt-0.5">19 {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-blue-400">{isAr ? 'التحول الرقمي' : 'Digital Ops'}</div>
            </div>
            <div className="p-2 rounded bg-orange-500/5 border border-orange-500/30">
              <div className="text-[10px] text-orange-400 font-mono font-semibold">Q3-Q4</div>
              <div className="text-sm font-bold text-white mt-0.5">25+ {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-emerald-400">{isAr ? 'برامج التوطين' : 'Localization'}</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentBenefit = benefits[activeStep] || benefits[0];

  return (
    <div className="w-full">
      {/* Animated Section Header */}
      <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
          <span>{isAr ? 'مزايا ونموذج الشراكة' : 'PARTNERSHIP ADVANTAGES'}</span>
        </div>

        <TextReveal
          as="h2"
          text={isAr ? 'كيف تعمل الشراكة ومزايا الانضمام' : 'How the Partnership Works & Key Advantages'}
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-tight"
        />

        <p className="text-xs xs:text-sm sm:text-base text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'نموذج دفع حصري لكل فرصة مؤهلة بدون اشتراكات شهرية، مع ضمانات استبدال صارمة وتدفق مستمر للطلبات المؤسسية.'
            : 'Performance-based growth with zero retainers. Explore our unit economics, buyer qualification rubric, and pipeline consistency.'}
        </p>
      </div>

      {/* Premium Master Interactive Console */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#26282D] bg-[#0A0B0E] p-4 xs:p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.85)] relative overflow-hidden text-white">
        {/* Subtle Ambient Depth (No Grid Lines, No Scanner) */}
        <div className="pointer-events-none absolute -top-24 right-0 w-80 h-80 bg-orange-500/[0.04] rounded-full blur-[100px]" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-[100px]" aria-hidden="true" />

        {/* Step Selector Tabs Bar */}
        <div className="flex items-center gap-1.5 xs:gap-2 p-1.5 rounded-2xl bg-[#121318] border border-[#26282D] mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
          {benefits.map((b, i) => {
            const isActive = activeStep === i;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveStep(i)}
                className={`relative flex items-center gap-2 xs:gap-2.5 px-3 xs:px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <m.div
                    layoutId="active-provider-benefit-tab"
                    className="absolute inset-0 rounded-xl bg-white/[0.10] border border-white/20 shadow-sm"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                )}
                <span
                  className={`relative z-10 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md font-mono text-[10px] sm:text-xs font-bold ${
                    isActive ? 'bg-[#FF5C00] text-white' : 'bg-white/[0.05] text-neutral-400 border border-white/10'
                  }`}
                >
                  {b.index}
                </span>
                <span className="relative z-10 font-sans tracking-tight">{b.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Active Benefit Content Stage */}
        <AnimatePresence mode="wait">
          <m.div
            key={currentBenefit.id}
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
                  <span>{currentBenefit.angle}</span>
                </span>

                <h3 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-white font-heading tracking-tight leading-tight">
                  {currentBenefit.title}
                </h3>

                <p className="mt-2.5 text-xs xs:text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-xl">
                  {currentBenefit.body}
                </p>
              </div>

              {/* Key Advantages / SLAs list */}
              <div className="pt-3 border-t border-[#26282D] space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  {isAr ? 'المزايا والشروط المعتمدة' : 'GUARANTEED ADVANTAGES & SLAS'}
                </div>

                <div className="space-y-2">
                  {currentBenefit.takeaways.map((point: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-[#26282D] text-xs sm:text-sm text-neutral-300"
                    >
                      <ShieldCheck size={16} className="text-[#FF5C00] mt-0.5 shrink-0" />
                      <span className="leading-snug">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sleek Mockup Dossier (Without Scanner) */}
            <div className="lg:col-span-5 w-full">
              <div className="rounded-2xl border border-[#26282D] bg-[#0F1013] p-3 sm:p-4 shadow-xl">
                {currentBenefit.mockup}
              </div>
            </div>
          </m.div>
        </AnimatePresence>

        {/* Bottom Navigation & CTA Bar */}
        <div className="mt-8 pt-6 border-t border-[#26282D] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev === 0 ? benefits.length - 1 : prev - 1))}
              aria-label={isAr ? 'الميزة السابقة' : 'Previous benefit'}
              className="h-9 w-9 rounded-xl border border-[#26282D] bg-white/[0.04] hover:bg-white/[0.10] text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight size={16} className={isAr ? '' : 'rotate-180'} />
            </button>

            <span className="font-mono text-xs text-neutral-400 px-2 tabular-nums">
              {currentBenefit.index} / {String(benefits.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => setActiveStep((prev) => (prev === benefits.length - 1 ? 0 : prev + 1))}
              aria-label={isAr ? 'الميزة التالية' : 'Next benefit'}
              className="h-9 w-9 rounded-xl border border-[#26282D] bg-white/[0.04] hover:bg-white/[0.10] text-neutral-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight size={16} className={isAr ? 'rotate-180' : ''} />
            </button>
          </div>

          <Link
            href={`/${lang}/for-providers/apply`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 sm:px-8 rounded-xl bg-[#FF5C00] hover:bg-[#e05200] text-white font-semibold text-xs sm:text-sm shadow-md active:scale-95 transition-all font-sans"
          >
            <span>{isAr ? 'ابدأ طلب التأهيل كشريك' : 'Apply for Provider Partnership'}</span>
            <ArrowRight size={15} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
