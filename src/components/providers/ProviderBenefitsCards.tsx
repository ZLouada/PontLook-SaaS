'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { m, useReducedMotion } from 'framer-motion';
import {
  CircleDollarSign,
  Target,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import ConsoleDialog, { type ConsoleRecord } from '@/components/shared/ConsoleDialog';
import { ease, viewportOnce } from '@/lib/motion';

interface ProviderBenefitsCardsProps {
  lang: string;
}

export default function ProviderBenefitsCards({ lang }: ProviderBenefitsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  const benefits: ConsoleRecord[] = [
    {
      id: 'pay-per-lead',
      index: '01',
      icon: CircleDollarSign,
      badge: isAr ? 'نموذج الدفع بالأداء' : 'Performance-Based',
      title: isAr ? 'انعدام مخاطر الرسوم الشهرية' : 'Zero Retainer Risk',
      angle: isAr ? 'صفر اشتراكات ثابتة · دفع حصري لكل مشترٍ مؤهل' : 'Zero Retainers · Pay Per Qualified Buyer',
      body: isAr
        ? 'لا توجد رسوم إدارة أو اشتراكات شهرية ثابتة. الدفع يتم حصراً لكل صانع قرار مؤكد ومؤهل يتم تقديمه لك مع كراسة متطلبات واضحة.'
        : 'No monthly management fees or fixed retainers. You pay strictly per verified decision maker delivered ($50 to $200 per lead).',
      takeaways: [
        isAr ? 'انعدام الالتزامات التعاقدية الطويلة أو رسوم الوكالات التقليدية' : 'No binding annual contracts or recurring agency retainer fees',
        isAr ? 'ضمان استبدال فوري 100% لأي فرصة لا تطابق شروط التأهيل المعتمدة' : '100% instant lead replacement SLA for non-qualifying contacts',
        isAr ? 'تكلفة استحواذ عملاء محسوبة بدقة وقابلة للتوسع وفق طاقتك الاستيعابية' : 'Predictable CAC scaling directly aligned with your delivery bandwidth',
      ],
      mockup: (
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-orange-500/10 text-[#FF5C00] flex items-center justify-center font-bold">
                <CircleDollarSign size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
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
            <div className="p-2 rounded-lg bg-[#0F1013] border border-[#26282D]">
              <div className="text-[9px] text-neutral-500 uppercase font-semibold">{isAr ? 'الاشتراك الشهري التقليدي' : 'Traditional Retainer'}</div>
              <div className="text-xs sm:text-sm font-semibold text-neutral-400 line-through mt-0.5">$3,500 / {isAr ? 'شهر' : 'mo'}</div>
              <div className="text-[9px] text-red-400 mt-0.5">{isAr ? 'نتائج غير مضمونة' : 'Zero output guarantee'}</div>
            </div>
            <div className="p-2 rounded-lg bg-orange-500/5 border border-orange-500/30">
              <div className="text-[9px] text-orange-400 uppercase font-semibold">{isAr ? 'نموذج PontLook' : 'PontLook Model'}</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">$0 {isAr ? 'اشتراك' : 'Retainer'}</div>
              <div className="text-[9px] text-emerald-400 mt-0.5 font-medium">{isAr ? 'دفع فقط عند استلام الفرصة' : 'Pay strictly per lead'}</div>
            </div>
          </div>

          <div className="text-[10px] text-neutral-400 flex items-center gap-1.5 pt-0.5">
            <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
            <span className="truncate">{isAr ? 'اتفاقية مستوى الخدمة: استبدال أي فرصة غير مطابقة خلال 48 ساعة' : 'SLA: Instant replacement for any disputed lead within 48h'}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'qualified-buyers',
      index: '02',
      icon: Target,
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
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-orange-500/10 text-[#FF5C00] flex items-center justify-center font-bold">
                <Target size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
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

          <div className="space-y-1.5 text-[10px] sm:text-[11px]">
            <div className="flex items-center justify-between p-1.5 sm:p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'صانع القرار المستهدف:' : 'Decision Maker:'}</span>
              <span className="text-white font-medium">{isAr ? 'نائب رئيس الموارد البشرية' : 'VP of HR (Riyadh)'}</span>
            </div>
            <div className="flex items-center justify-between p-1.5 sm:p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'المجال التدريبي:' : 'Training Domain:'}</span>
              <span className="text-orange-400 font-medium">{isAr ? 'تطوير القيادات التنفيذية' : 'Executive Leadership'}</span>
            </div>
            <div className="flex items-center justify-between p-1.5 sm:p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'حجم الفوج والميزانية:' : 'Cohort & Budget:'}</span>
              <span className="text-emerald-400 font-medium">35 {isAr ? 'متدرب' : 'execs'} · SAR 120k+</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'consistent-pipeline',
      index: '03',
      icon: TrendingUp,
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
        <div className="bg-black rounded-xl border border-[#26282D] w-full p-3 sm:p-3.5 flex flex-col gap-2 font-sans">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-orange-500/10 text-[#FF5C00] flex items-center justify-center font-bold">
                <TrendingUp size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">
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

          <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
            <div className="p-1.5 sm:p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <div className="text-[9px] text-neutral-400 font-mono">Q1 (Jan-Mar)</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">14 {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-orange-400">{isAr ? 'القيادات' : 'Leadership'}</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <div className="text-[9px] text-neutral-400 font-mono">Q2 (Apr-Jun)</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">19 {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-blue-400">{isAr ? 'التحول' : 'Digital Ops'}</div>
            </div>
            <div className="p-1.5 sm:p-2 rounded bg-orange-500/5 border border-orange-500/30">
              <div className="text-[9px] text-orange-400 font-mono font-semibold">Q3-Q4</div>
              <div className="text-xs sm:text-sm font-bold text-white mt-0.5">25+ {isAr ? 'فرصة' : 'Leads'}</div>
              <div className="text-[9px] text-emerald-400">{isAr ? 'التوطين' : 'Localization'}</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

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

      {/* Modern 3-Card Grid (Horizontal flow on mobile, 3-col on desktop) */}
      <div className="relative">
        <div className="relative flex md:grid gap-3.5 xs:gap-4 sm:gap-6 md:grid-cols-3 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory px-3 -mx-3 xs:px-4 xs:-mx-4 sm:px-0 sm:mx-0">
          {benefits.map((b, i) => (
            <m.div
              key={b.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                delay: i * 0.1,
                type: 'spring',
                stiffness: 160,
                damping: 22,
              }}
              whileHover={reduce ? undefined : { y: -6 }}
              className="group relative h-full flex flex-col w-[88vw] xs:w-[82vw] sm:w-[65vw] md:w-auto shrink-0 snap-center"
            >
              <Spotlight
                radius={360}
                className="relative z-10 flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#202227] hover:border-white/20 bg-[#0C0D11] p-4 xs:p-5 sm:p-7 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_32px_-12px_rgba(0,0,0,0.8)] transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setActiveId(b.id)}
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
          ))}
        </div>

        {/* Mobile Horizontal Flow Indicator */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-3" aria-hidden="true">
          {benefits.map((b) => (
            <span key={b.id} className="h-1 w-5 rounded-full bg-white/20" />
          ))}
        </div>
      </div>

      {/* Redesigned Clean & Modern Window Pop-up */}
      <ConsoleDialog
        records={benefits}
        activeId={activeId}
        onClose={() => setActiveId(null)}
        onSelect={setActiveId}
        isAr={isAr}
        accent="brand"
        copy={{
          takeawaysTitle: isAr ? 'المزايا والشروط المعتمدة' : 'GUARANTEED ADVANTAGES & SLAS',
          hint: isAr ? 'انقر خارج النافذة أو زر Esc للإغلاق' : 'Click outside or press Esc to close',
          closeLabel: isAr ? 'إغلاق النافذة' : 'Close window',
          ctaLabel: isAr ? 'ابدأ طلب التأهيل كشريك' : 'Apply for Provider Partnership',
          ctaHref: `/${lang}/for-providers/apply`,
        }}
      />
    </div>
  );
}
