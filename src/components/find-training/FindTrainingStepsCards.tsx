'use client';

import React, { useCallback, useRef, useState } from 'react';
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  SlidersHorizontal,
  BadgeCheck,
  Scale,
  ArrowRight,
  CheckCircle2,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import IconFrame from '@/components/shared/IconFrame';
import ConsoleDialog, { type ConsoleRecord } from '@/components/shared/ConsoleDialog';
import { ease, viewportOnce } from '@/lib/motion';

interface FindTrainingStepsCardsProps {
  lang: string;
}

/** Per-step tint for the pipeline node, bracket corners and hover wash. */
const TONES: Record<string, { dot: string; text: string; wash: string; bracket: string }> = {
  blue: {
    dot: 'bg-blue-400',
    text: 'text-blue-300',
    wash: 'from-blue-500/[0.07]',
    bracket: 'border-blue-400/70',
  },
  emerald: {
    dot: 'bg-emerald-400',
    text: 'text-emerald-300',
    wash: 'from-emerald-500/[0.07]',
    bracket: 'border-emerald-400/70',
  },
  brand: {
    dot: 'bg-[#FF5C00]',
    text: 'text-orange-300',
    wash: 'from-orange-500/[0.07]',
    bracket: 'border-[#FF5C00]/70',
  },
};

export default function FindTrainingStepsCards({ lang }: FindTrainingStepsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  // The spine fills as the pipeline scrolls through the viewport; each node
  // reads its own slice of this one value.
  const pipelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pipelineRef,
    offset: ['start 78%', 'end 62%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

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

      {/* Pipeline: a spine that fills with scroll, nodes igniting as it passes. */}
      <div ref={pipelineRef} className="relative ps-9 sm:ps-14">
        <div className="pointer-events-none absolute inset-y-2 start-[14px] w-px sm:start-[22px]" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#26282D] to-transparent" />
          <m.div
            style={{ scaleY: reduce ? 1 : progress, transformOrigin: 'top' }}
            className="absolute inset-0 bg-gradient-to-b from-white/80 via-blue-400/80 to-[#FF5C00]/80"
          />
        </div>

        <div className="flex flex-col gap-5 sm:gap-7">
          {steps.map((st, i) => (
            <PipelineRow
              key={st.id}
              record={st}
              i={i}
              total={steps.length}
              progress={progress}
              isAr={isAr}
              reduce={!!reduce}
              onOpen={open}
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

/* -------------------------------------------------------------------------- */

interface PipelineRowProps {
  record: ConsoleRecord;
  i: number;
  total: number;
  progress: MotionValue<number>;
  isAr: boolean;
  reduce: boolean;
  onOpen: (id: string, el: HTMLElement | null) => void;
}

/**
 * One stage of the pipeline. Lives in its own component so each row can derive
 * its own slice of the shared scroll progress with hooks.
 */
function PipelineRow({ record, i, total, progress, isAr, reduce, onOpen }: PipelineRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const tone = TONES[record.frameVariant] ?? TONES.blue;

  // The node ignites just before the spine fill reaches it.
  const at = (i + 0.4) / total;
  const lit = useTransform(progress, [at - 0.12, at], [0, 1]);
  const litOpacity = reduce ? 1 : lit;

  return (
    <m.div
      ref={rowRef}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: ease.out, delay: i * 0.06 }}
      className="group relative"
    >
      {/* Node on the spine. Dim ring always; core + halo arrive with scroll. */}
      <span
        className="pointer-events-none absolute top-8 -start-[27px] z-20 h-2.5 w-2.5 sm:-start-[39px]"
        aria-hidden="true"
      >
        <span className="absolute inset-0 rounded-full border border-[#26282D] bg-black" />
        <m.span style={{ opacity: litOpacity }} className={`absolute inset-[2px] rounded-full ${tone.dot}`} />
        <m.span
          style={{ opacity: litOpacity }}
          className={`node-halo absolute inset-0 rounded-full ${tone.dot}`}
        />
      </span>

      <Spotlight
        radius={520}
        className={`relative overflow-hidden rounded-2xl border border-[#26282D] bg-[#0B0C0E] text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-colors duration-500 group-hover:border-white/25`}
      >
        {/* Tinted wash that sweeps in from the spine side on hover. */}
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${tone.wash} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 rtl:bg-gradient-to-l`}
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-5 p-5 sm:gap-8 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Text column */}
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-3xl font-bold leading-none text-white/15 transition-colors duration-500 group-hover:text-white/40 sm:text-4xl">
                {record.index}
              </span>
              <span className="h-8 w-px bg-[#26282D]" aria-hidden="true" />
              <IconFrame variant={record.frameVariant} size="sm">
                <record.icon size={15} strokeWidth={1.8} />
              </IconFrame>
              <span className="truncate rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold text-neutral-400 transition-colors group-hover:border-white/20 group-hover:text-neutral-200">
                {record.badge}
              </span>
            </div>

            <h3 className="relative inline-block font-heading text-lg font-semibold text-white sm:text-xl">
              {record.title}
              {/* Hairline that draws itself under the title on hover. */}
              <span
                className={`absolute -bottom-1 start-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right ${tone.text}`}
                aria-hidden="true"
              />
            </h3>

            <p className="mt-2.5 font-sans text-sm font-normal leading-relaxed text-neutral-400">
              {record.body}
            </p>

            <div className="mt-5 inline-flex items-center gap-2 font-sans text-[11px] font-medium text-neutral-400 transition-colors group-hover:text-white">
              <span>{isAr ? 'عرض تفاصيل الخطوة ومخرجاتها' : 'Inspect details & deliverables'}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.05] transition-all group-hover:bg-white group-hover:text-black">
                <ArrowRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                />
              </span>
            </div>
          </div>

          {/* Drawer: the proof widget tilts open like a tray being pulled out. */}
          <div
            className="relative hidden lg:block"
            style={{ perspective: reduce ? undefined : 1100 }}
            aria-hidden="true"
          >
            <m.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: -16, y: 26, scale: 0.96 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.18 + i * 0.06, type: 'spring', stiffness: 130, damping: 20 }}
              className="relative transform-gpu rounded-xl transition-transform duration-500 will-change-transform group-hover:-translate-y-1"
              style={{ transformOrigin: 'top center' }}
            >
              {/* Bracket corners frame the readout like a measuring crop. */}
              {[
                'top-[-5px] start-[-5px] border-t border-s',
                'top-[-5px] end-[-5px] border-t border-e',
                'bottom-[-5px] start-[-5px] border-b border-s',
                'bottom-[-5px] end-[-5px] border-b border-e',
              ].map((pos) => (
                <span
                  key={pos}
                  className={`pointer-events-none absolute h-3 w-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${tone.bracket} ${pos}`}
                />
              ))}

              <div className="relative overflow-hidden rounded-xl">
                {record.mockup}
                {/* Refresh sweep over the readout. */}
                <span
                  className="console-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-white/[0.055] to-transparent"
                  style={{ '--scan-duration': `${6 + i * 1.2}s` } as React.CSSProperties}
                />
              </div>
            </m.div>
          </div>
        </div>

        {/* Stretched hit area — keeps the row one target without nesting
            interactive elements inside the readout. */}
        <button
          type="button"
          onClick={() => onOpen(record.id, rowRef.current)}
          aria-label={`${record.title} - ${isAr ? 'انقر لعرض التفاصيل' : 'Click to inspect step details'}`}
          className="absolute inset-0 z-30 cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
        />
      </Spotlight>
    </m.div>
  );
}
