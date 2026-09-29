'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  BadgeCheck,
  Scale,
  ArrowRight,
  X,
  CheckCircle2,
  Building2,
  Calendar,
  Sparkles,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import IconFrame from '@/components/shared/IconFrame';

interface FindTrainingStepsCardsProps {
  lang: string;
}

interface StepItem {
  id: string;
  step: string;
  icon: React.ElementType;
  frameVariant: 'blue' | 'emerald' | 'brand';
  badge: string;
  title: string;
  angle: string;
  desc: string;
  takeaways: string[];
  mockup: React.ReactNode;
}

export default function FindTrainingStepsCards({ lang }: FindTrainingStepsCardsProps) {
  const isAr = lang === 'ar';
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key when pop-up window is open
  useEffect(() => {
    if (!activeModalId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalId(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalId]);

  const steps: StepItem[] = [
    {
      id: 'step-specify',
      step: '01',
      icon: SlidersHorizontal,
      frameVariant: 'blue',
      badge: isAr ? 'استيعاب دقيق' : 'Rapid Scoping',
      title: isAr ? 'حدد المتطلبات والاحتياج' : 'Specify Training Needs',
      angle: isAr ? 'استبيان تفاعلي خلال 60 ثانية بدون تعقيدات' : '60-Second Interactive Intake',
      desc: isAr
        ? 'حدد المهارات المستهدفة، أسلوب التدريب (حضوري أو افتراضي)، المدينة، وحجم الفريق في نموذج تفاعلي ومباشر.'
        : 'Define your targeted skills, delivery mode, city, and cohort size in our 60 second interactive questionnaire. No tedious RFP drafting.',
      takeaways: [
        isAr ? 'تغطية متخصصة لأكثر من 20 مجالاً تدريبياً مؤسسياً معتمداً' : 'Specialized coverage across 20+ accredited enterprise training domains',
        isAr ? 'تخصيص فوري للموقع: الرياض، جدة، الدمام، دبي، أبوظبي، أو عن بُعد' : 'Targeted city selection: Riyadh, Jeddah, Dammam, Dubai, Abu Dhabi, or live remote',
        isAr ? 'حصر أهداف البرنامج ومواءمتها مع متطلبات التوطين والتحول الرقمي' : 'Targeted alignment with Saudization, Emiratization, or tech upskilling KPIs',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
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
      step: '02',
      icon: BadgeCheck,
      frameVariant: 'emerald',
      badge: isAr ? 'فحص واعتماد الخبراء' : 'Dual-Screening Vetting',
      title: isAr ? 'المطابقة والتحقق من المدربين' : 'Matching & Faculty Vetting',
      angle: isAr ? 'فرز أكثر من 120 مزود معتمد لضمان نخبة الميسرين' : 'Screening 120+ Accredited GCC Entities',
      desc: isAr
        ? 'يفحص فريقنا المختص أكثر من 120 مزود تدريب معتمد لاختيار أفضل المدربين أصحاب السجلات والإنجازات الموثوقة.'
        : 'Our matching desk screens 120+ accredited providers to select facilitators with verified enterprise outcomes and verified credentials.',
      takeaways: [
        isAr ? 'التحقق المباشر من سجلات وخبرات المدربين والتأكد من مطابقتهم' : 'Independent verification of instructor track records and industry certifications',
        isAr ? 'فحص تقييمات العملاء السابقين والجهات الحكومية والخاصة بالمنطقة' : 'Review of historical participant ratings across GCC corporate deployments',
        isAr ? 'سرية تامة لبيانات مسؤولي الموارد البشرية ومنع أي اتصالات تسويقية مزعجة' : 'Zero cold spam or unsolicited vendor outreach; total decision maker privacy',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
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
      step: '03',
      icon: Scale,
      frameVariant: 'brand',
      badge: isAr ? 'مقارنة شفافة' : 'Proposal Comparison',
      title: isAr ? 'استلم وقارن العروض' : 'Compare Itemized Proposals',
      angle: isAr ? '2 إلى 3 عروض مفصلة خلال 48 ساعة وبدون أي التزام' : '2 to 3 Proposals in 48h · Zero Obligation',
      desc: isAr
        ? 'استلم من 2 إلى 3 عروض مفصلة خلال 48 ساعة متضمنة خطط البرامج والتكاليف الشفافة، وبدون أي التزام بالشراء.'
        : 'Receive 2 to 3 tailored proposals within 48 hours with custom syllabi, transparent pricing, and zero purchase obligation.',
      takeaways: [
        isAr ? 'عروض أسعار مفصلة بالبنود (رسوم التدريب، المواد، التقييم، الشهادات)' : 'Itemized line-by-line budgets with transparent breakdown and zero surprises',
        isAr ? 'حرية كاملة في تقييم واختيار العرض الأنسب لإدارة شركتك' : '100% freedom to review, negotiate, or decline with zero purchasing pressure',
        isAr ? 'خدمة مجانية 100% للمنشآت الباحثة عن تدريب' : '100% free matchmaking service for enterprise buyers with no hidden fees',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
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

  const activeStepItem = steps.find((s) => s.id === activeModalId);

  return (
    <div className="w-full">
      {/* Animated Section Header */}
      <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto">
        <span className="chip mx-auto mb-3">
          {isAr ? 'خطوات بسيطة وسريعة' : 'How It Works'}
        </span>
        <TextReveal
          as="h2"
          text={isAr ? '3 خطوات للحصول على أفضل عروض التدريب' : '3 Simple Steps to Proven Training Solutions'}
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-heading tracking-tight"
        />
        <p className="mt-3 text-sm sm:text-base text-neutral-400 font-sans max-w-2xl mx-auto">
          {isAr
            ? 'عملية توفيق دقيقة وسريعة توفر عليك أسابيع من البحث والتقييم اليدوي. انقر على أي خطوة لاستعراض تفاصيلها.'
            : 'A streamlined matchmaking process saving weeks of vendor searching. Click any step to inspect the vetting rubric.'}
        </p>
      </div>

      {/* 3 Interactive Step Spotlight Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((st) => (
          <Spotlight
            key={st.id}
            radius={280}
            className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-7 sm:p-8 text-start flex flex-col justify-between hover:border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_20px_50px_-15px_rgba(0,0,0,0.9)] transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            {/* Ambient hover aura */}
            <div
              className={`absolute -top-16 -end-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-70 ${
                st.frameVariant === 'blue'
                  ? 'bg-blue-500/30'
                  : st.frameVariant === 'emerald'
                  ? 'bg-emerald-500/30'
                  : 'bg-orange-500/30'
              }`}
            />

            <div
              onClick={() => setActiveModalId(st.id)}
              className="flex-1 flex flex-col justify-between focus:outline-none relative z-10"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveModalId(st.id);
                }
              }}
              aria-label={`${st.title} - ${isAr ? 'انقر لعرض التفاصيل' : 'Click to inspect step details'}`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <IconFrame variant={st.frameVariant} size="md">
                    <st.icon size={20} strokeWidth={1.8} />
                  </IconFrame>
                  <span className="text-2xl font-mono font-bold text-neutral-500 group-hover:text-white transition-colors tracking-wider">
                    {st.step}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-[11px] font-semibold text-neutral-400 bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/10 group-hover:border-white/20 group-hover:text-neutral-200 transition-colors">
                    {st.badge}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white font-heading group-hover:text-neutral-100 transition-colors">
                  {st.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-neutral-400 font-sans font-normal line-clamp-3">
                  {st.desc}
                </p>
              </div>

              {/* Bottom Trigger Hint */}
              <div className="mt-6 pt-4 border-t border-[#26282D] flex items-center justify-between text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400 group-hover:text-white font-sans">
                  <span>{isAr ? 'عرض تفاصيل الخطوة ومخرجاتها' : 'Inspect details & deliverables'}</span>
                </span>
                <span className="w-6 h-6 rounded-full bg-white/[0.04] group-hover:bg-white/15 flex items-center justify-center text-neutral-400 group-hover:text-white transition-all">
                  <ArrowRight size={13} className="rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Spotlight>
        ))}
      </div>

      {/* Detail Pop-up Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeStepItem && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="step-modal-title"
              >
                {/* Backdrop */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveModalId(null)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
                />

                {/* Modal Container */}
                <m.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="relative z-10 w-full max-w-2xl sm:max-w-3xl max-h-[85dvh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0F1013]/98 backdrop-blur-2xl border border-white/15 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_25px_60px_-15px_rgba(0,0,0,0.95)] my-auto overflow-hidden"
                >
                  {/* Fixed Header */}
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.25 }}
                    className="flex items-center justify-between p-4 sm:p-5 border-b border-[#26282D] gap-3 shrink-0"
                  >
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <IconFrame variant={activeStepItem.frameVariant} size="sm">
                        <activeStepItem.icon size={15} />
                      </IconFrame>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold font-sans bg-white/10 text-white border border-white/20">
                        {activeStepItem.badge}
                      </span>
                      <span className="text-[11px] sm:text-xs font-medium font-sans text-neutral-400">
                        {activeStepItem.angle}
                      </span>
                    </div>

                    <m.button
                      type="button"
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveModalId(null)}
                      aria-label={isAr ? 'إغلاق النافذة' : 'Close modal'}
                      className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    >
                      <X size={15} />
                    </m.button>
                  </m.div>

                  {/* Scrollable Body */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
                    <m.div
                      initial={{ opacity: 0, x: isAr ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      <h3
                        id="step-modal-title"
                        className="text-base sm:text-xl font-semibold text-white tracking-tight leading-snug font-heading"
                      >
                        {activeStepItem.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mt-1.5">
                        {activeStepItem.desc}
                      </p>
                    </m.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
                      {/* Strategic Advantages Checklist */}
                      <m.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="rounded-xl p-3.5 sm:p-4 bg-[#16171B] border border-[#26282D] flex flex-col justify-between space-y-2.5"
                      >
                        <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider font-sans">
                          {isAr ? 'أهم الضمانات والمخرجات' : 'Key Advantages & Output'}
                        </div>
                        <ul className="space-y-2 text-xs text-neutral-200 font-sans">
                          {activeStepItem.takeaways.map((point, pIdx) => (
                            <m.li
                              key={pIdx}
                              initial={{ opacity: 0, x: isAr ? 12 : -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.24 + pIdx * 0.06,
                                type: 'spring',
                                stiffness: 320,
                                damping: 22,
                              }}
                              className="flex items-start gap-2 leading-relaxed"
                            >
                              <BadgeCheck size={14} className="text-blue-400 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </m.li>
                          ))}
                        </ul>
                      </m.div>

                      {/* Mockup Proof Widget */}
                      <m.div
                        initial={{ opacity: 0, x: isAr ? -15 : 15, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.22, duration: 0.35 }}
                        className="flex items-center"
                      >
                        {activeStepItem.mockup}
                      </m.div>
                    </div>
                  </div>

                  {/* Fixed Footer */}
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.3 }}
                    className="p-3.5 sm:p-5 border-t border-[#26282D] bg-[#0F1013] shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <span className="text-[11px] text-neutral-400 font-sans hidden sm:inline">
                      {isAr ? 'انقر في المساحة الفارغة أو زر Esc للإغلاق' : 'Click outside or press Esc to close'}
                    </span>

                    <m.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="w-full sm:w-auto"
                    >
                      <Link
                        href={`/${lang}/find-training/request`}
                        onClick={() => setActiveModalId(null)}
                        className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-semibold text-xs sm:text-sm active:scale-[0.98] transition-all font-sans shadow-md"
                      >
                        <span>{isAr ? 'ابدأ طلب التدريب الآن' : 'Request Training Proposals'}</span>
                        <ArrowRight size={14} className="ms-1.5 rtl:-scale-x-100" />
                      </Link>
                    </m.div>
                  </m.div>
                </m.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
