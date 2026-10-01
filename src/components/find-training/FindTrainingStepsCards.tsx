'use client';

import React, { useCallback, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import {
  SlidersHorizontal,
  BadgeCheck,
  Scale,
  ArrowRight,
  CheckCircle2,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import ConsoleDialog, { type ConsoleRecord } from '@/components/shared/ConsoleDialog';
import { ease, viewportOnce } from '@/lib/motion';

interface FindTrainingStepsCardsProps {
  lang: string;
}

const ACCENTS: Record<
  string,
  {
    border: string;
    aura: string;
    badge: string;
    text: string;
    iconBorder: string;
    iconText: string;
    indexBorder: string;
    indexBg: string;
    indexText: string;
    checkText: string;
  }
> = {
  blue: {
    border: 'border-blue-500/30',
    aura: 'bg-blue-500/10',
    badge: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    text: 'group-hover:text-blue-400',
    iconBorder: 'group-hover:border-blue-500/40',
    iconText: 'group-hover:text-blue-400',
    indexBorder: 'border-blue-500/30',
    indexBg: 'bg-blue-500/10',
    indexText: 'text-blue-400',
    checkText: 'text-blue-400',
  },
  emerald: {
    border: 'border-emerald-500/30',
    aura: 'bg-emerald-500/10',
    badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    text: 'group-hover:text-emerald-400',
    iconBorder: 'group-hover:border-emerald-500/40',
    iconText: 'group-hover:text-emerald-400',
    indexBorder: 'border-emerald-500/30',
    indexBg: 'bg-emerald-500/10',
    indexText: 'text-emerald-400',
    checkText: 'text-emerald-400',
  },
  brand: {
    border: 'border-orange-500/30',
    aura: 'bg-orange-500/10',
    badge: 'border-orange-500/30 bg-orange-500/10 text-orange-400',
    text: 'group-hover:text-orange-400',
    iconBorder: 'group-hover:border-orange-500/40',
    iconText: 'group-hover:text-[#FF5C00]',
    indexBorder: 'border-[#FF5C00]/30',
    indexBg: 'bg-orange-500/10',
    indexText: 'text-[#FF5C00]',
    checkText: 'text-[#FF5C00]',
  },
};

export default function FindTrainingStepsCards({ lang }: FindTrainingStepsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const open = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      const r = el.getBoundingClientRect();
      setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
    setActiveId(id);
  }, []);

  const steps: ConsoleRecord[] = [
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

  return (
    <div className="w-full">
      {/* Animated Section Header */}
      <div className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
        <m.span
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: ease.out }}
          className="chip mx-auto mb-3"
        >
          {isAr ? 'خطوات بسيطة وسريعة' : 'How It Works'}
        </m.span>
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

      {/* Premium Clean 3-Card Grid (Horizontal flow on mobile, 3-col on desktop) */}
      <div className="relative">
        <div className="relative flex md:grid gap-4 sm:gap-6 md:grid-cols-3 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory px-4 -mx-4 sm:px-0 sm:mx-0">
          {steps.map((st, i) => {
            const tone = ACCENTS[st.frameVariant] ?? ACCENTS.brand;

            return (
              <m.div
                key={st.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 160,
                  damping: 22,
                }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="group relative h-full flex flex-col w-[85vw] sm:w-[65vw] md:w-auto shrink-0 snap-center"
              >
                <Spotlight
                  radius={360}
                  className="relative z-10 flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#202227] hover:border-white/20 bg-[#0C0D11] p-5 sm:p-7 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_32px_-12px_rgba(0,0,0,0.8)] transition-all duration-300"
                >
                  {/* Ambient subtle glow on hover */}
                  <div
                    className={`pointer-events-none absolute -top-16 -end-16 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 ${tone.aura} opacity-0 group-hover:opacity-100`}
                    aria-hidden="true"
                  />

                  <button
                    type="button"
                    onClick={(e) => open(st.id, e.currentTarget.closest('.group'))}
                    aria-label={`${st.title} - ${isAr ? 'انقر لعرض التفاصيل' : 'Click to inspect step details'}`}
                    className="relative z-10 flex h-full cursor-pointer flex-col text-start outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/60 w-full"
                  >
                    {/* Top Row: Index Badge & Icon */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${tone.indexBorder} ${tone.indexBg} font-mono text-xs font-bold ${tone.indexText}`}
                        >
                          {st.index}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold text-neutral-300">
                          {st.badge}
                        </span>
                      </div>
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neutral-300 ${tone.iconBorder} ${tone.iconText} transition-colors`}
                      >
                        <st.icon size={17} />
                      </div>
                    </div>

                    {/* Headline */}
                    <h3
                      className={`font-heading text-lg sm:text-xl font-semibold text-white ${tone.text} transition-colors leading-tight`}
                    >
                      {st.title}
                    </h3>

                    {/* Body */}
                    <p className="mt-2.5 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                      {st.body}
                    </p>

                    {/* Deliverables Takeaways List */}
                    <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2.5">
                      {st.takeaways.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                          <CheckCircle2 size={14} className={`${tone.checkText} shrink-0 mt-0.5`} />
                          <span className="leading-snug text-neutral-300">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Strip */}
                    <div className="mt-auto pt-6">
                      <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">
                        <span>{isAr ? 'عرض التفاصيل والضمانات' : 'Inspect details & rubric'}</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.05] group-hover:bg-white group-hover:text-black transition-all">
                          <ArrowRight
                            size={12}
                            className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                          />
                        </span>
                      </div>
                    </div>
                  </button>
                </Spotlight>
              </m.div>
            );
          })}
        </div>

        {/* Mobile Horizontal Flow Indicator */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-3" aria-hidden="true">
          {steps.map((st) => (
            <span
              key={st.id}
              className="h-1 w-5 rounded-full bg-white/20"
            />
          ))}
        </div>
      </div>

      <ConsoleDialog
        records={steps}
        activeId={activeId}
        origin={origin}
        onClose={() => setActiveId(null)}
        onSelect={setActiveId}
        isAr={isAr}
        accent="neutral"
        copy={{
          takeawaysTitle: isAr ? 'أهم الضمانات والمخرجات' : 'Key Advantages & Output',
          hint: isAr ? 'انقر في المساحة الفارغة أو زر Esc للإغلاق' : 'Click outside or press Esc to close',
          closeLabel: isAr ? 'إغلاق النافذة' : 'Close modal',
          ctaLabel: isAr ? 'ابدأ طلب التدريب الآن' : 'Request Training Proposals',
          ctaHref: `/${lang}/find-training/request`,
        }}
      />
    </div>
  );
}
