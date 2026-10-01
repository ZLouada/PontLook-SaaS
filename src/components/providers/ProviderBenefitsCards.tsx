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

      {/* Premium Clean 3-Card Grid */}
      <div className="relative">
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((b, i) => {
            const tone = ACCENTS[b.frameVariant] ?? ACCENTS.brand;

            return (
              <m.div
                key={b.id}
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
                className="group relative h-full flex flex-col"
              >
                <Spotlight
                  radius={360}
                  className="relative z-10 flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#202227] hover:border-white/20 bg-[#0C0D11] p-6 sm:p-7 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_32px_-12px_rgba(0,0,0,0.8)] transition-all duration-300"
                >
                  {/* Ambient subtle glow on hover */}
                  <div
                    className={`pointer-events-none absolute -top-16 -end-16 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 ${tone.aura} opacity-0 group-hover:opacity-100`}
                    aria-hidden="true"
                  />

                  <button
                    type="button"
                    onClick={(e) => open(b.id, e.currentTarget.closest('.group'))}
                    aria-label={`${b.title} - ${isAr ? 'انقر لعرض التفاصيل' : 'Click to inspect breakdown'}`}
                    className="relative z-10 flex h-full cursor-pointer flex-col text-start outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/60 w-full"
                  >
                    {/* Top Row: Index Badge & Icon */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#FF5C00]/30 bg-orange-500/10 font-mono text-xs font-bold text-[#FF5C00]">
                          {b.index}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-semibold text-neutral-300">
                          {b.badge}
                        </span>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neutral-300 group-hover:border-orange-500/40 group-hover:text-[#FF5C00] transition-colors">
                        <b.icon size={17} />
                      </div>
                    </div>

                    {/* Headline */}
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-white group-hover:text-orange-400 transition-colors leading-tight">
                      {b.title}
                    </h3>

                    {/* Body */}
                    <p className="mt-2.5 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                      {b.body}
                    </p>

                    {/* Deliverables Takeaways List */}
                    <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2.5">
                      {b.takeaways.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-sans">
                          <CheckCircle2 size={14} className="text-[#FF5C00] shrink-0 mt-0.5" />
                          <span className="leading-snug text-neutral-300">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Strip */}
                    <div className="mt-auto pt-6">
                      <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-medium text-neutral-400 group-hover:text-orange-400 transition-colors">
                        <span>{isAr ? 'عرض التفاصيل والضمانات' : 'Inspect breakdown & SLAs'}</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.05] group-hover:bg-[#FF5C00] group-hover:text-white transition-all">
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
