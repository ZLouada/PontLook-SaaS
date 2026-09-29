'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import {
  CircleDollarSign,
  Target,
  TrendingUp,
  ArrowRight,
  X,
  BadgeCheck,
  CheckCircle2,
  SlidersHorizontal,
  Calendar,
  Building2,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import IconFrame from '@/components/shared/IconFrame';
import CardTilt3D from '@/components/shared/CardTilt3D';

interface ProviderBenefitsCardsProps {
  lang: string;
}

interface BenefitItem {
  id: string;
  index: string;
  icon: React.ElementType;
  frameVariant: 'brand' | 'blue' | 'emerald';
  badge: string;
  title: string;
  angle: string;
  text: string;
  takeaways: string[];
  mockup: React.ReactNode;
}

export default function ProviderBenefitsCards({ lang }: ProviderBenefitsCardsProps) {
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

  const benefits: BenefitItem[] = [
    {
      id: 'pay-per-lead',
      index: '01',
      icon: CircleDollarSign,
      frameVariant: 'brand',
      badge: isAr ? 'نموذج الدفع بالأداء' : 'Performance-Based',
      title: isAr ? 'انعدام مخاطر الرسوم الشهرية' : 'Pay Per Lead, Not Per Month',
      angle: isAr ? 'صفر اشتراكات ثابتة · دفع حصري لكل صانع قرار' : 'Zero Retainers · Pay Per Qualified Buyer',
      text: isAr
        ? 'لا توجد رسوم إدارة أو اشتراكات شهرية ثابتة. الدفع يتم حصراً لكل صانع قرار مؤكد ومؤهل يتم تقديمه لك مع كراسة متطلبات واضحة.'
        : 'No monthly management fees or fixed retainers. You pay strictly per verified decision maker delivered ($50 to $200 per lead).',
      takeaways: [
        isAr ? 'انعدام الالتزامات التعاقدية الطويلة أو رسوم الوكالات التقليدية' : 'No binding annual contracts or recurring agency retainer fees',
        isAr ? 'ضمان استبدال فوري 100% لأي فرصة لا تطابق شروط التأهيل المعتمدة' : '100% instant lead replacement SLA for non-qualifying contacts',
        isAr ? 'تكلفة استحواذ عملاء محسوبة بدقة وقابلة للتوسع وفق طاقتك الاستيعابية' : 'Predictable CAC scaling directly aligned with your delivery bandwidth',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
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
      text: isAr
        ? 'كل فرصة تدريبية تتضمن احتياجاً مؤسسياً مؤكداً، وصلاحية قرار واضحة، ومتطلبات متوافقة مع أهداف التوطين أو التحول الرقمي أو القيادة.'
        : 'Every lead has confirmed corporate training needs, authority, and explicit problem definitions tied to Saudization, Emiratization, or digital upskilling.',
      takeaways: [
        isAr ? 'التواصل المباشر مع رؤساء الموارد البشرية ومدراء التدريب والتطوير' : 'Direct engagement with CHROs, VP HR, and Heads of L&D',
        isAr ? 'معرفة مسبقة بحجم المجموعات، المدينة المستهدفة، والميزانية المخصصة' : 'Pre-scoped cohort sizes, delivery city, and approved budget range',
        isAr ? 'تجنب المكالمات الاستكشافية غير المجدية مع جهات غير جادة' : 'Zero wasted discovery meetings with unbudgeted prospects',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
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
      text: isAr
        ? 'حافظ على استمرارية ونمو أعمالك على مدار العام، وتجاوز فترات الركود الموسمي عبر استقبال طلبات مؤكدة وجاهزة للتعاقد.'
        : 'Keep your business development active and predictable throughout the year, even during delivery seasons.',
      takeaways: [
        isAr ? 'توجيه آلي للطلبات المتوافقة مع تخصص وخبرة مدربيك' : 'Algorithmic routing matching your exact facilitator credentials',
        isAr ? 'تغطية واسعة لكبرى المراكز التجارية: الرياض، جدة، دبي، وأبوظبي' : 'Active coverage across Riyadh, Jeddah, Dubai, and Abu Dhabi',
        isAr ? 'التركيز 100% على تقديم المحتوى عالي القيمة بدلاً من البحث البارد' : 'Focus 100% on delivery excellence while PontLook fuels business dev',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
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

  const activeBenefit = benefits.find((b) => b.id === activeModalId);

  return (
    <div className="w-full">
      {/* Animated Section Header */}
      <div className="mb-8 sm:mb-10 text-start">
        <TextReveal
          as="h2"
          text={isAr ? 'كيف تعمل الشراكة ومزايا الانضمام' : 'How the Partnership Works & Key Advantages'}
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-heading tracking-tight"
        />
        <p className="mt-2 text-sm sm:text-base text-neutral-400 font-sans">
          {isAr
            ? 'انقر على أي ميزة لاستعراض التفاصيل، آلية العمل، ونموذج التعاقد المباشر'
            : 'Click on any advantage to inspect full unit economics, qualification criteria, and SLA guarantees.'}
        </p>
      </div>

      {/* 3 Interactive Spotlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {benefits.map((b) => (
          <CardTilt3D key={b.id} maxTilt={6} glareOpacity={0.14} className="h-full">
            <Spotlight
              radius={280}
              className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-7 text-start flex flex-col justify-between hover:border-orange-500/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_20px_50px_-15px_rgba(255,92,0,0.15)] transition-all duration-300 group cursor-pointer relative overflow-hidden h-full"
            >
              {/* Ambient hover aura */}
              <div
                className={`absolute -top-16 -end-16 w-36 h-36 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-70 ${
                  b.frameVariant === 'brand'
                    ? 'bg-orange-500/30'
                    : b.frameVariant === 'blue'
                    ? 'bg-blue-500/30'
                    : 'bg-emerald-500/30'
                }`}
              />

              <div
                onClick={() => setActiveModalId(b.id)}
                className="flex-1 flex flex-col justify-between focus:outline-none relative z-10"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveModalId(b.id);
                  }
                }}
                aria-label={`${b.title} - ${isAr ? 'انقر لعرض التفاصيل' : 'Click to inspect breakdown'}`}
              >
                <div>
                  {/* Header row: Index & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#FF5C00] flex items-center justify-center text-xs font-bold font-mono shrink-0 group-hover:scale-105 transition-transform">
                        {b.index}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-400 bg-white/[0.04] px-2.5 py-0.5 rounded-full border border-white/10 group-hover:border-orange-500/30 group-hover:text-orange-300 transition-colors">
                        {b.badge}
                      </span>
                    </div>
                    <IconFrame variant={b.frameVariant} size="xs">
                      <b.icon size={14} />
                    </IconFrame>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white font-heading group-hover:text-orange-400 transition-colors">
                    {b.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans font-normal line-clamp-3">
                    {b.text}
                  </p>
                </div>

                {/* Bottom Interactive Trigger Pill */}
                <div className="mt-5 pt-4 border-t border-[#26282D] flex items-center justify-between text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-orange-400/90 font-sans">
                    <span>{isAr ? 'عرض التفاصيل والضمانات' : 'Inspect breakdown & SLAs'}</span>
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/[0.04] group-hover:bg-orange-500/20 flex items-center justify-center text-neutral-400 group-hover:text-[#FF5C00] transition-all">
                    <ArrowRight size={13} className="rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Spotlight>
          </CardTilt3D>
        ))}
      </div>

      {/* Pop-up Detail Modal with Portal, Backdrop, and AnimatePresence */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeBenefit && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="benefit-modal-title"
              >
                {/* Backdrop overlay */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveModalId(null)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
                />

                {/* Modal Window Container */}
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
                      <IconFrame variant={activeBenefit.frameVariant} size="sm">
                        <activeBenefit.icon size={15} />
                      </IconFrame>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold font-sans bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {activeBenefit.badge}
                      </span>
                      <span className="text-[11px] sm:text-xs font-medium font-sans text-neutral-400">
                        {activeBenefit.angle}
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
                        id="benefit-modal-title"
                        className="text-base sm:text-xl font-semibold text-white tracking-tight leading-snug font-heading"
                      >
                        {activeBenefit.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mt-1.5">
                        {activeBenefit.text}
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
                          {isAr ? 'المزايا والشروط المعتمدة' : 'Guaranteed Advantages & SLAs'}
                        </div>
                        <ul className="space-y-2 text-xs text-neutral-200 font-sans">
                          {activeBenefit.takeaways.map((point, pIdx) => (
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
                              <BadgeCheck size={14} className="text-orange-400 shrink-0 mt-0.5" />
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
                        {activeBenefit.mockup}
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
                        href={`/${lang}/for-providers/apply`}
                        onClick={() => setActiveModalId(null)}
                        className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-medium text-xs sm:text-sm active:scale-[0.98] transition-all font-sans shadow-md shadow-orange-500/20"
                      >
                        <span>{isAr ? 'ابدأ طلب التأهيل كشريك' : 'Apply for Provider Partnership'}</span>
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
