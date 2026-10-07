'use client';

import React, { useState, useCallback } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import {
  CircleDollarSign,
  Target,
  TrendingUp,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
} from '@/components/icons';
import TextReveal from '@/components/shared/TextReveal';

interface MetricItem {
  valueEn: string;
  valueAr: string;
  labelEn: string;
  labelAr: string;
}

interface ProviderCardData {
  id: string;
  index: string;
  icon: any;
  categoryEn: string;
  categoryAr: string;
  statusEn: string;
  statusAr: string;
  titleEn: string;
  titleAr: string;
  subEn: string;
  subAr: string;
  quoteEn: string;
  quoteAr: string;
  metrics: MetricItem[];
  backTitleEn: string;
  backTitleAr: string;
  backSubEn: string;
  backSubAr: string;
  slaEn: string;
  slaAr: string;
  takeaways: { en: string; ar: string }[];
  renderBackContent: (isAr: boolean) => React.ReactNode;
}

interface ProviderBenefitsCardsProps {
  lang: string;
}

export default function ProviderBenefitsCards({ lang }: ProviderBenefitsCardsProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();

  // Track flipped state for each card independently
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  // Track hovered state for border lighting
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const toggleFlip = useCallback((idx: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  }, []);

  const cards: ProviderCardData[] = [
    {
      id: 'zero-retainer',
      index: '01',
      icon: CircleDollarSign,
      categoryEn: 'ECONOMIC MODEL',
      categoryAr: 'نموذج الاستحواذ',
      statusEn: 'ACTIVE SLA',
      statusAr: 'اتفاقية نشطة',
      titleEn: 'ZERO RETAINER RISK',
      titleAr: 'انعدام مخاطر الرسوم',
      subEn: 'Performance-Based Acquisition',
      subAr: 'استحواذ قائم حصراً على النتائج',
      quoteEn:
        'Zero monthly management retainers. Zero agency lock-in. You pay exclusively per verified corporate decision maker delivered with confirmed budget authority.',
      quoteAr:
        'صفر اشتراكات شهرية، وصفر التزامات وكالات. الدفع يتم حصراً لكل صانع قرار معتمد مع كراسة متطلبات مؤكدة وميزانية مرصودة.',
      metrics: [
        {
          valueEn: '$0',
          valueAr: '0 ر.س',
          labelEn: 'MONTHLY RETAINER',
          labelAr: 'رسوم إدارة شهرية',
        },
        {
          valueEn: '100%',
          valueAr: '100%',
          labelEn: 'INSTANT REPLACEMENT SLA',
          labelAr: 'ضمان استبدال فوري',
        },
      ],
      backTitleEn: 'ACQUISITION UNIT ECONOMICS',
      backTitleAr: 'مقارنة اقتصاديات الاستحواذ',
      backSubEn: 'Traditional Retainer vs PontLook Performance',
      backSubAr: 'الرسوم الشهرية التقليدية مقابل نموذج PontLook',
      slaEn: 'Instant replacement for any disputed lead within 48 hours.',
      slaAr: 'ضمان استبدال فوري لأي فرصة غير مطابقة خلال 48 ساعة.',
      takeaways: [
        { en: 'Zero upfront management or agency fees', ar: 'انعدام الالتزامات التعاقدية أو رسوم الوكالات' },
        { en: 'Strictly pay per verified enterprise buyer ($50–$200)', ar: 'دفع حصري لكل صانع قرار مؤهل ومؤكد' },
        { en: 'Predictable CAC directly aligned with firm capacity', ar: 'تكلفة استحواذ عملاء محسوبة وقابلة للتوسع' },
      ],
      renderBackContent: (isAr) => (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                {isAr ? 'الوكالة التقليدية' : 'Traditional Retainer'}
              </span>
              <div className="my-1.5">
                <span className="text-sm font-semibold text-neutral-500 line-through block">
                  $3,500 / {isAr ? 'شهر' : 'mo'}
                </span>
                <span className="text-[10px] text-neutral-500 block">
                  {isAr ? 'نتائج غير مضمونة' : 'Zero output guarantee'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#FF5C00]/[0.08] border border-[#FF5C00]/30 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-[#FF5C00] uppercase tracking-wider font-semibold">
                {isAr ? 'نموذج PontLook' : 'PontLook Model'}
              </span>
              <div className="my-1.5">
                <span className="text-base font-bold text-white block">
                  $0 {isAr ? 'اشتراك' : 'Retainer'}
                </span>
                <span className="text-[10px] text-orange-200/80 block">
                  {isAr ? 'دفع فقط عند استلام الفرصة' : 'Pay strictly per lead'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center gap-2 text-[11px] text-neutral-300">
            <ShieldCheck size={14} className="text-[#FF5C00] shrink-0" />
            <span>{isAr ? 'ضمان استبدال فوري لأي فرصة غير مطابقة خلال 48 ساعة' : '100% instant lead replacement SLA within 48 hours'}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'bant-verified',
      index: '02',
      icon: Target,
      categoryEn: 'BUYER AUDIT',
      categoryAr: 'تدقيق المشترين',
      statusEn: 'TIER-A QUALIFIED',
      statusAr: 'مؤهل تنفيذي',
      titleEn: 'QUALIFIED ENTERPRISE BUYERS',
      titleAr: 'عملاء مؤسسيون مؤهلون',
      subEn: 'Pre-Scoped Budget Authority',
      subAr: 'صلاحيات ميزانية معتمدة',
      quoteEn:
        'Direct connection with VP HR and CHRO leadership. Every opportunity arrives with confirmed corporate budget, scoped cohorts, and explicit corporate training mandates.',
      quoteAr:
        'تواصل مباشر مع نواب رؤساء الموارد البشرية والتدريب. كل فرصة تأتي بميزانية معتمدة، وأفواج محددة، واحتياجات تدريبية موثقة.',
      metrics: [
        {
          valueEn: 'CHRO / VP',
          valueAr: 'قيادات HR',
          labelEn: 'DECISION MAKER LEVEL',
          labelAr: 'صناع القرار المستهدفون',
        },
        {
          valueEn: 'SAR 120k+',
          valueAr: '+120 ألف ر.س',
          labelEn: 'AVG MANDATE SCOPE',
          labelAr: 'متوسط حجم التعاقد',
        },
      ],
      backTitleEn: 'ENTERPRISE LEAD DOSSIER',
      backTitleAr: 'بطاقة تأهيل الفرصة المؤسسية',
      backSubEn: 'BANT-Verified Corporate Mandate Specification',
      backSubAr: 'معايير BANT التنفيذية المعتمدة مسبقاً',
      slaEn: 'Zero unvetted or unbudgeted exploratory meetings.',
      slaAr: 'صفر اجتماعات استكشافية غير مجدية أو بدون ميزانية معتمدة.',
      takeaways: [
        { en: 'Direct engagement with CHROs & VP of HR', ar: 'تواصل مباشر مع رؤساء الموارد والتدريب' },
        { en: 'Pre-scoped cohort sizes & training mandates', ar: 'معرفة مسبقة بحجم المجموعات والميزانية' },
        { en: 'Zero wasted time with exploratory tire-kickers', ar: 'تجنب المكالمات الاستكشافية غير المجدية' },
      ],
      renderBackContent: (isAr) => (
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-[11px] font-mono">{isAr ? 'صانع القرار:' : 'Decision Maker:'}</span>
            <span className="text-white font-medium text-xs">{isAr ? 'نائب رئيس الموارد (الرياض)' : 'VP HR / CHRO (Riyadh)'}</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-[11px] font-mono">{isAr ? 'المجال التدريبي:' : 'Domain Scope:'}</span>
            <span className="text-white font-medium text-xs">{isAr ? 'القيادات التنفيذية والتحول' : 'Executive Leadership & Ops'}</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FF5C00]/[0.08] border border-[#FF5C00]/30">
            <span className="text-neutral-300 text-[11px] font-mono">{isAr ? 'الميزانية والفوج:' : 'Cohort & Budget:'}</span>
            <span className="text-[#FF5C00] font-bold text-xs">35 {isAr ? 'تنفيذياً' : 'Execs'} · SAR 120k+</span>
          </div>
        </div>
      ),
    },
    {
      id: 'pipeline-engine',
      index: '03',
      icon: TrendingUp,
      categoryEn: 'PIPELINE DISPATCH',
      categoryAr: 'محرك التدفق',
      statusEn: 'MULTI-CITY GCC',
      statusAr: 'عواصم الخليج',
      titleEn: 'CONSISTENT GCC PIPELINE',
      titleAr: 'تدفق مستمر لفرص الأعمال',
      subEn: 'Algorithmic Demand Routing',
      subAr: 'توجيه آلي للطلب المؤسسي',
      quoteEn:
        'Continuous corporate demand routing across Riyadh, Jeddah, Dubai, and Abu Dhabi. Smooth out seasonal dips with steady quarterly corporate intake.',
      quoteAr:
        'توجيه آلي للطلبات المؤسسية عبر الرياض وجدة ودبي وأبوظبي. تجاوز فترات الركود الموسمي عبر استقبال طلبات مؤكدة على مدار العام.',
      metrics: [
        {
          valueEn: '4+ Hubs',
          valueAr: '4+ عواصم',
          labelEn: 'GCC ENTERPRISE HUBS',
          labelAr: 'مراكز الأعمال الخليجية',
        },
        {
          valueEn: 'Quarterly',
          valueAr: 'فصلي مستمر',
          labelEn: 'CAPACITY SMOOTHING',
          labelAr: 'استقرار التدفق والإيرادات',
        },
      ],
      backTitleEn: 'QUARTERLY INTAKE SCHEDULE',
      backTitleAr: 'جدول توزيع الفرص الفصلي',
      backSubEn: 'Active Multi-Quarter Inflow Across GCC Enterprise Hubs',
      backSubAr: 'توزيع تدفق الطلبات عبر فصول العام في مدن الخليج',
      slaEn: 'Algorithmic routing matching verified provider credentials.',
      slaAr: 'توجيه آلي مطابق تماماً لخبراتك واعتماداتك التدريبية الموثقة.',
      takeaways: [
        { en: 'Automated matching to your core training specialties', ar: 'توجيه آلي للطلبات المتوافقة مع تخصصك' },
        { en: 'Multi-city coverage: Riyadh, Dubai, Abu Dhabi & Doha', ar: 'تغطية واسعة: الرياض، جدة، دبي، أبوظبي' },
        { en: 'Focus 100% on delivery while we maintain pipeline', ar: 'التركيز 100% على التميز في التدريب' },
      ],
      renderBackContent: (isAr) => (
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/10">
              <span className="text-[9px] text-neutral-400 font-mono block">Q1</span>
              <span className="text-xs font-bold text-white block mt-0.5">14+ {isAr ? 'فرصة' : 'Leads'}</span>
              <span className="text-[9px] text-neutral-500 block truncate">{isAr ? 'القيادات' : 'Leadership'}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/10">
              <span className="text-[9px] text-neutral-400 font-mono block">Q2</span>
              <span className="text-xs font-bold text-white block mt-0.5">19+ {isAr ? 'فرصة' : 'Leads'}</span>
              <span className="text-[9px] text-neutral-500 block truncate">{isAr ? 'التقنية' : 'Digital Ops'}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FF5C00]/[0.08] border border-[#FF5C00]/30">
              <span className="text-[9px] text-[#FF5C00] font-mono font-semibold block">Q3-Q4</span>
              <span className="text-xs font-bold text-white block mt-0.5">25+ {isAr ? 'فرصة' : 'Leads'}</span>
              <span className="text-[9px] text-orange-200/80 block truncate">{isAr ? 'التوطين' : 'National'}</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center gap-2 text-[11px] text-neutral-300">
            <ShieldCheck size={14} className="text-[#FF5C00] shrink-0" />
            <span>{isAr ? 'الرياض · جدة · دبي · أبوظبي · الدوحة' : 'Active routing: Riyadh, Dubai, Abu Dhabi & Doha'}</span>
          </div>
        </div>
      ),
    },
  ];

  // Cut-corner clip path calculation (Palantir document cut)
  const frontClipPath = isAr
    ? 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)'
    : 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)';

  const backClipPath = isAr
    ? 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)'
    : 'polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)';

  return (
    <div className="w-full">
      {/* Section Header: Minimalist Palantir Architectural Style */}
      <div className="mb-10 sm:mb-14 text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono font-medium tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse" />
          <span>{isAr ? 'معمارية الشراكة // المواصفات التنفيذية' : 'PARTNERSHIP ARCHITECTURE // SPEC'}</span>
        </div>

        <TextReveal
          as="h2"
          text={isAr ? 'نمو فوري ومستدام. بدون رسوم شهرية.' : 'High-Velocity Growth. Zero Retainers.'}
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-tight"
        />

        <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'مواصفات تنفيذية فائقة الدقة. انقر على أي بطاقة لقلبها ومعاينة الاقتصاديات ومعايير التأهيل وتدفق الطلبات.'
            : 'Minimal words, verified metrics. Click any card to flip and inspect unit economics, buyer rubrics, and pipeline flow.'}
        </p>
      </div>

      {/* 3 Palantir-Style Dog-Ear Vertical Cards in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {cards.map((card, idx) => {
          const isFlipped = !!flippedCards[idx];
          const isHovered = hoveredCard === idx;

          return (
            <div
              key={card.id}
              className="relative w-full h-[540px] sm:h-[530px] lg:h-[550px]"
              style={{ perspective: '1200px' }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* 3D Flipping Card Container */}
              <m.div
                animate={{
                  rotateY: reduce ? 0 : isFlipped ? 180 : 0,
                  opacity: reduce && isFlipped ? 0.95 : 1,
                }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-full"
              >
                {/* ======================================================== */}
                {/* FRONT FACE: Palantir Clean Tech Card with Dog-Ear Corner */}
                {/* ======================================================== */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  onClick={() => toggleFlip(idx)}
                  className="absolute inset-0 w-full h-full cursor-pointer group select-none transition-all duration-300"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isFlipped}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(idx);
                    }
                  }}
                >
                  {/* Outer Border Layer with Chamfer Cut */}
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      clipPath: frontClipPath,
                      backgroundColor: isHovered
                        ? 'rgba(255, 92, 0, 0.45)'
                        : 'rgba(255, 255, 255, 0.12)',
                    }}
                  />

                  {/* Inner Surface with Chamfer Cut */}
                  <div
                    className="absolute inset-[1px] bg-[#0C0D11] p-6 sm:p-7 flex flex-col justify-between transition-colors duration-300 group-hover:bg-[#0F1016]"
                    style={{ clipPath: frontClipPath }}
                  >
                    {/* Dog-Ear Triangle Corner Flap */}
                    <div
                      className={`absolute top-0 pointer-events-none transition-all duration-300 w-6 h-6 ${
                        isAr ? 'left-0' : 'right-0'
                      }`}
                      style={{
                        clipPath: isAr
                          ? 'polygon(100% 0, 0 100%, 100% 100%)'
                          : 'polygon(0 0, 0 100%, 100% 100%)',
                        backgroundColor: isHovered
                          ? 'rgba(255, 92, 0, 0.35)'
                          : 'rgba(255, 255, 255, 0.12)',
                        borderBottom: isHovered
                          ? '1px solid rgba(255, 92, 0, 0.6)'
                          : '1px solid rgba(255, 255, 255, 0.25)',
                        borderLeft: !isAr
                          ? isHovered
                            ? '1px solid rgba(255, 92, 0, 0.6)'
                            : '1px solid rgba(255, 255, 255, 0.25)'
                          : undefined,
                        borderRight: isAr
                          ? isHovered
                            ? '1px solid rgba(255, 92, 0, 0.6)'
                            : '1px solid rgba(255, 255, 255, 0.25)'
                          : undefined,
                      }}
                    />

                    {/* Top Telemetry Bar */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#FF5C00]">
                          {card.index}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                          {isAr ? card.categoryAr : card.categoryEn}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300">
                        {isAr ? card.statusAr : card.statusEn}
                      </span>
                    </div>

                    {/* Middle: Clean Palantir Corporate Typography & Quote */}
                    <div className="space-y-4 my-auto">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight leading-snug group-hover:text-neutral-100 transition-colors">
                          {isAr ? card.titleAr : card.titleEn}
                        </h3>
                        <p className="text-xs font-mono text-[#FF5C00] mt-1 tracking-wide">
                          {isAr ? card.subAr : card.subEn}
                        </p>
                      </div>

                      {/* Palantir Impact Quote */}
                      <blockquote className="text-[13px] sm:text-sm text-neutral-300/90 font-sans leading-relaxed border-s-2 border-white/20 ps-3 italic">
                        &ldquo;{isAr ? card.quoteAr : card.quoteEn}&rdquo;
                      </blockquote>
                    </div>

                    {/* Bottom: High-Density Key Metrics & Interactive Flip Prompt */}
                    <div className="space-y-4 pt-3 border-t border-white/[0.08]">
                      <div className="grid grid-cols-2 gap-2 text-start">
                        {card.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] group-hover:border-white/15 transition-colors"
                          >
                            <div className="text-sm sm:text-base font-bold font-heading text-white">
                              {isAr ? m.valueAr : m.valueEn}
                            </div>
                            <div className="text-[9px] font-mono text-neutral-400 mt-0.5 uppercase tracking-wider truncate">
                              {isAr ? m.labelAr : m.labelEn}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Flip Action Indicator */}
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-[#FF5C00] transition-colors pt-1">
                        <span className="flex items-center gap-1.5 text-[11px]">
                          <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                          <span>{isAr ? 'انقر لقلب البطاقة والمعاينة' : 'Click to flip & inspect'}</span>
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">⟲</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================================================== */}
                {/* BACK FACE: Detailed Flipped Dossier (Self-Contained)     */}
                {/* ======================================================== */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 w-full h-full select-none"
                >
                  {/* Outer Border Layer with Matching Reversed Cut */}
                  <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                      clipPath: backClipPath,
                      backgroundColor: 'rgba(255, 92, 0, 0.45)',
                    }}
                  />

                  {/* Inner Surface */}
                  <div
                    className="absolute inset-[1px] bg-[#0E0F14] p-5 sm:p-6 flex flex-col justify-between"
                    style={{ clipPath: backClipPath }}
                  >
                    {/* Dog-Ear Triangle Corner Flap for Back Face */}
                    <div
                      className={`absolute top-0 pointer-events-none w-6 h-6 ${
                        isAr ? 'right-0' : 'left-0'
                      }`}
                      style={{
                        clipPath: isAr
                          ? 'polygon(0 0, 0 100%, 100% 100%)'
                          : 'polygon(100% 0, 0 100%, 100% 100%)',
                        backgroundColor: 'rgba(255, 92, 0, 0.35)',
                        borderBottom: '1px solid rgba(255, 92, 0, 0.6)',
                        borderRight: !isAr ? '1px solid rgba(255, 92, 0, 0.6)' : undefined,
                        borderLeft: isAr ? '1px solid rgba(255, 92, 0, 0.6)' : undefined,
                      }}
                    />

                    {/* Back Header with Close / Flip Button */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-[#FF5C00]">
                          {isAr ? 'المواصفات' : 'SPEC'} {'//'} {card.index}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          {isAr ? 'ملف تدقيق' : 'AUDITED'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(idx);
                        }}
                        className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors text-[10px] font-mono flex items-center gap-1"
                        title={isAr ? 'قلب البطاقة للواجهة' : 'Flip back to front'}
                      >
                        <RefreshCw size={11} />
                        <span>{isAr ? 'رجوع' : 'Back'}</span>
                      </button>
                    </div>

                    {/* Back Content Body (Unit Economics / Rubric / Schedule) */}
                    <div className="my-auto space-y-3">
                      <div>
                        <h4 className="text-base font-bold font-heading text-white">
                          {isAr ? card.backTitleAr : card.backTitleEn}
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                          {isAr ? card.backSubAr : card.backSubEn}
                        </p>
                      </div>

                      {/* Dynamic Compact Component */}
                      {card.renderBackContent(isAr)}

                      {/* Takeaways List */}
                      <div className="space-y-1.5 pt-1">
                        {card.takeaways.map((point, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-1.5 text-[11px] text-neutral-300 font-sans">
                            <CheckCircle2 size={12} className="text-[#FF5C00] shrink-0 mt-0.5" />
                            <span className="leading-snug">{isAr ? point.ar : point.en}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Back Action Controls: Flip Back (Clean, Full-Width) */}
                    <div className="pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(idx);
                        }}
                        className="w-full py-2.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-white/10 text-xs font-mono transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <RefreshCw size={12} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                        <span>{isAr ? 'قلب للواجهة' : 'Flip to Front'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
