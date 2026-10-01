'use client';

import React, { useCallback, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import {
  CircleDollarSign,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import IconFrame from '@/components/shared/IconFrame';
import ConsoleDialog, { type ConsoleRecord } from '@/components/shared/ConsoleDialog';
import { ease, viewportOnce } from '@/lib/motion';

interface ProviderBenefitsCardsProps {
  lang: string;
}

/** Per-card accent, used by the orbiting rim laser and the ambient aura. */
const ACCENTS: Record<string, { rim: string; aura: string; glow: string; dot: string }> = {
  brand: {
    rim: 'rgba(255, 92, 0, 0.95)',
    aura: 'bg-orange-500/25',
    glow: 'group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_28px_60px_-22px_rgba(255,92,0,0.45)]',
    dot: 'bg-[#FF5C00]',
  },
  blue: {
    rim: 'rgba(96, 165, 250, 0.95)',
    aura: 'bg-blue-500/25',
    glow: 'group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_28px_60px_-22px_rgba(59,130,246,0.4)]',
    dot: 'bg-blue-400',
  },
  emerald: {
    rim: 'rgba(52, 211, 153, 0.95)',
    aura: 'bg-emerald-500/25',
    glow: 'group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_28px_60px_-22px_rgba(16,185,129,0.4)]',
    dot: 'bg-emerald-400',
  },
};

export default function ProviderBenefitsCards({ lang }: ProviderBenefitsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  /** Remember where the card sat so the window can spring out of it. */
  const open = useCallback((id: string, el: HTMLElement | null) => {
    if (el) {
      const r = el.getBoundingClientRect();
      setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
    setActiveId(id);
  }, []);

  const benefits: ConsoleRecord[] = [
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

  return (
    <div className="w-full">
      {/* Section header, hung off a lit rule so it reads as a console masthead. */}
      <div className="mb-10 flex items-start gap-4 text-start sm:mb-14 sm:gap-5">
        <m.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: ease.out }}
          className="mt-1.5 hidden w-px flex-1 shrink-0 origin-top self-stretch bg-gradient-to-b from-[#FF5C00] via-[#FF5C00]/30 to-transparent sm:block sm:max-w-px"
          aria-hidden="true"
        />

        <div className="min-w-0 flex-1">
          <TextReveal
            as="h2"
            text={isAr ? 'كيف تعمل الشراكة ومزايا الانضمام' : 'How the Partnership Works & Key Advantages'}
            className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
          />
          <p className="mt-2.5 max-w-2xl font-sans text-sm text-neutral-400 sm:text-base">
            {isAr
              ? 'انقر على أي ميزة لاستعراض التفاصيل، آلية العمل، ونموذج التعاقد المباشر'
              : 'Click on any advantage to inspect full unit economics, qualification criteria, and SLA guarantees.'}
          </p>
        </div>
      </div>

      {/* Circuit: a hairline rail threads the three nodes, with a signal running
          along it. Only the gutters show, so it reads as wiring behind the panels. */}
      <div className="relative" style={{ perspective: reduce ? undefined : 1400 }}>
        <div
          className="pointer-events-none absolute inset-x-0 top-0 hidden md:block"
          aria-hidden="true"
        >
          <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#26282D] to-transparent">
            <div className="rail-pulse absolute inset-0" style={{ '--rail-duration': '7s' } as React.CSSProperties} />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 start-[13px] w-px md:hidden"
          aria-hidden="true"
        >
          <div className="h-full w-px bg-gradient-to-b from-transparent via-[#26282D] to-transparent" />
        </div>

        <div className="relative grid grid-cols-1 gap-5 ps-7 md:grid-cols-3 md:gap-6 md:ps-0">
          {benefits.map((b, i) => {
            const tone = ACCENTS[b.frameVariant] ?? ACCENTS.brand;
            // The deck fans out of a centre stack on entry.
            const from = i === 0 ? 70 : i === 2 ? -70 : 0;

            return (
              <m.div
                key={b.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: from, y: 56, rotateY: from * 0.12, scale: 0.92 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 }}
                viewport={viewportOnce}
                transition={{
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  mass: 0.9,
                }}
                whileHover={reduce ? undefined : { y: -8 }}
                className="group relative h-full transform-gpu will-change-transform"
              >
                {/* Node where the card meets the rail — in the gutter lane on
                    mobile, on the card's top edge once the row goes horizontal. */}
                <span
                  className="pointer-events-none absolute top-8 -start-[19px] z-20 h-2 w-2 -translate-y-1/2 rounded-full ring-4 ring-black md:top-0 md:start-6"
                  aria-hidden="true"
                >
                  <span className={`absolute inset-0 rounded-full ${tone.dot}`} />
                  <span className={`node-halo absolute inset-0 rounded-full ${tone.dot}`} style={{ '--halo-duration': `${2.6 + i * 0.4}s` } as React.CSSProperties} />
                </span>

                {/* Rim laser — a rotating cone masked down to a 1px border. */}
                <span
                  className="pointer-events-none absolute -inset-px z-0 rounded-[18px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 overflow-hidden rounded-[18px]">
                    <span
                      className="conic-rim absolute start-1/2 top-1/2 h-[240%] w-[240%]"
                      style={{
                        background: `conic-gradient(from 0deg, transparent 0%, ${tone.rim} 10%, transparent 24%, transparent 100%)`,
                        '--rim-duration': `${4 + i * 0.5}s`,
                      } as React.CSSProperties}
                    />
                  </span>
                  <span className="absolute inset-px rounded-[17px] bg-[#0B0C0E]" />
                </span>

                <Spotlight
                  radius={320}
                  className={`relative z-10 flex h-full flex-col overflow-hidden rounded-[17px] border border-[#26282D] bg-gradient-to-b from-[#101114] to-[#0B0C0E] text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07),0_12px_34px_-14px_rgba(0,0,0,0.75)] transition-shadow duration-500 ${tone.glow}`}
                >
                  {/* Ambient corner aura */}
                  <div
                    className={`pointer-events-none absolute -top-20 -end-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${tone.aura} opacity-25 group-hover:opacity-90`}
                    aria-hidden="true"
                  />

                  <button
                    type="button"
                    onClick={(e) => open(b.id, e.currentTarget.closest('.group'))}
                    aria-label={`${b.title} - ${isAr ? 'انقر لعرض التفاصيل' : 'Click to inspect breakdown'}`}
                    className="relative z-10 flex h-full cursor-pointer flex-col text-start outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/60"
                  >
                    <div className="relative p-6 pb-0 sm:p-7 sm:pb-0">
                      {/* Oversized ghost ordinal, lit by hover. */}
                      <span
                        className="pointer-events-none absolute -top-3 end-4 select-none font-mono text-[76px] font-bold leading-none text-white/[0.035] transition-all duration-500 group-hover:text-white/[0.08] sm:text-[88px]"
                        aria-hidden="true"
                      >
                        {b.index}
                      </span>

                      <div className="relative mb-5 flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#FF5C00]/30 bg-orange-500/10 font-mono text-xs font-bold text-[#FF5C00] transition-transform duration-300 group-hover:scale-110">
                            {b.index}
                          </span>
                          <span className="truncate rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold text-neutral-400 transition-colors group-hover:border-orange-500/30 group-hover:text-orange-300">
                            {b.badge}
                          </span>
                        </div>
                        <IconFrame variant={b.frameVariant} size="sm">
                          <b.icon size={15} />
                        </IconFrame>
                      </div>

                      <h3 className="relative font-heading text-base font-semibold text-white transition-colors group-hover:text-orange-400 sm:text-lg">
                        {b.title}
                      </h3>

                      <p className="relative mt-2.5 line-clamp-3 font-sans text-xs font-normal leading-relaxed text-neutral-400 sm:text-sm">
                        {b.body}
                      </p>
                    </div>

                    {/* Live peek at the proof widget, cropped behind a fade. The
                        real thing opens full size in the window. */}
                    <div className="relative mt-5 h-[116px] shrink-0 overflow-hidden" aria-hidden="true">
                      <div className="absolute inset-x-5 top-0 sm:inset-x-6">
                        <div
                          className="origin-top-left scale-[0.72] opacity-45 transition-all duration-500 group-hover:scale-[0.78] group-hover:opacity-100 rtl:origin-top-right"
                          style={{ width: '138.9%' }}
                        >
                          {b.mockup}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/80 to-transparent" />
                    </div>

                    {/* Status strip — fills with the accent on hover. */}
                    <div className="relative mt-auto flex items-center justify-between gap-2 overflow-hidden border-t border-[#26282D] px-6 py-3.5 sm:px-7">
                      <span
                        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 rtl:origin-right ${tone.aura}`}
                        aria-hidden="true"
                      />
                      <span className="relative truncate font-sans text-[11px] font-medium text-orange-400/90 transition-colors group-hover:text-white">
                        {isAr ? 'عرض التفاصيل والضمانات' : 'Inspect breakdown & SLAs'}
                      </span>
                      <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-neutral-400 transition-all group-hover:bg-[#FF5C00] group-hover:text-white">
                        <ArrowRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                        />
                      </span>
                    </div>
                  </button>
                </Spotlight>
              </m.div>
            );
          })}
        </div>
      </div>

      <ConsoleDialog
        records={benefits}
        activeId={activeId}
        origin={origin}
        onClose={() => setActiveId(null)}
        onSelect={setActiveId}
        isAr={isAr}
        accent="brand"
        copy={{
          takeawaysTitle: isAr ? 'المزايا والشروط المعتمدة' : 'Guaranteed Advantages & SLAs',
          hint: isAr ? 'انقر في المساحة الفارغة أو زر Esc للإغلاق' : 'Click outside or press Esc to close',
          closeLabel: isAr ? 'إغلاق النافذة' : 'Close modal',
          ctaLabel: isAr ? 'ابدأ طلب التأهيل كشريك' : 'Apply for Provider Partnership',
          ctaHref: `/${lang}/for-providers/apply`,
        }}
      />
    </div>
  );
}
