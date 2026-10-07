'use client';

import React, { useState, useCallback } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import {
  SlidersHorizontal,
  BadgeCheck,
  Scale,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
  FileText,
  Clock,
} from '@/components/icons';
import TextReveal from '@/components/shared/TextReveal';

interface MetricItem {
  valueEn: string;
  valueAr: string;
  labelEn: string;
  labelAr: string;
}

interface StepCardData {
  id: string;
  index: string;
  cubeType: 'scoping' | 'vetting' | 'comparison';
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
  takeaways: { en: string; ar: string }[];
  renderBackContent: (isAr: boolean) => React.ReactNode;
}

interface FindTrainingStepsCardsProps {
  lang: string;
}

/**
 * 3D Isometric Cube Visual with Floating Animation
 * Inspired by Pradis (pradis.webflow.io) 3D isometric cube architecture
 */
function IsometricCubeVisual({
  type,
  isHovered,
  reduce,
}: {
  type: 'scoping' | 'vetting' | 'comparison';
  isHovered: boolean;
  reduce: boolean | null;
}) {
  const drawCube = (cx: number, cy: number, s: number, key: string) => {
    const dx = s * 0.866;
    const dy = s * 0.5;

    const topPath = `M ${cx} ${cy - s} L ${cx + dx} ${cy - dy} L ${cx} ${cy} L ${cx - dx} ${cy - dy} Z`;
    const leftPath = `M ${cx} ${cy} L ${cx - dx} ${cy - dy} L ${cx - dx} ${cy + dy} L ${cx} ${cy + s} Z`;
    const rightPath = `M ${cx} ${cy} L ${cx + dx} ${cy - dy} L ${cx + dx} ${cy + dy} L ${cx} ${cy + s} Z`;

    return (
      <g key={key}>
        {/* Top Face */}
        <path
          d={topPath}
          fill={isHovered ? 'rgba(255, 92, 0, 0.65)' : 'rgba(255, 92, 0, 0.45)'}
          stroke="#FF5C00"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />
        {/* Left Face */}
        <path
          d={leftPath}
          fill={isHovered ? 'rgba(255, 92, 0, 0.40)' : 'rgba(255, 92, 0, 0.26)'}
          stroke="#FF5C00"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />
        {/* Right Face */}
        <path
          d={rightPath}
          fill={isHovered ? 'rgba(255, 92, 0, 0.25)' : 'rgba(255, 92, 0, 0.14)'}
          stroke="#FF5C00"
          strokeWidth="1.2"
          strokeLinejoin="round"
          className="transition-colors duration-300"
        />
      </g>
    );
  };

  return (
    <div className="relative w-full h-20 sm:h-22 flex items-center justify-center pointer-events-none select-none">
      <svg
        viewBox="0 0 100 80"
        className="w-24 h-20 overflow-visible transition-all duration-300"
        style={{
          filter: isHovered
            ? 'drop-shadow(0 0 14px rgba(255, 92, 0, 0.55))'
            : 'drop-shadow(0 0 6px rgba(255, 92, 0, 0.25))',
        }}
      >
        {type === 'scoping' && (
          <m.g
            animate={reduce ? undefined : { y: [-3.5, 3.5, -3.5] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Main Central Cube */}
            {drawCube(50, 42, 20, 'scoping-main')}
            {/* Satellite Floating Micro-Cube */}
            {drawCube(80, 22, 8, 'scoping-satellite')}
          </m.g>
        )}

        {type === 'vetting' && (
          <m.g
            animate={reduce ? undefined : { y: [3, -3, 3] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Lower Interlocking Cube */}
            {drawCube(38, 48, 17, 'vetting-lower')}
            {/* Upper Interlocking Cube */}
            {drawCube(62, 32, 17, 'vetting-upper')}
          </m.g>
        )}

        {type === 'comparison' && (
          <m.g
            animate={reduce ? undefined : { y: [-3, 3, -3] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Base Left Cube */}
            {drawCube(32, 54, 15, 'comp-left')}
            {/* Base Right Cube */}
            {drawCube(68, 54, 15, 'comp-right')}
            {/* Top Apex Cube */}
            {drawCube(50, 28, 15, 'comp-apex')}
          </m.g>
        )}
      </svg>
    </div>
  );
}

export default function FindTrainingStepsCards({ lang }: FindTrainingStepsCardsProps) {
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

  const steps: StepCardData[] = [
    {
      id: 'step-specify',
      index: '01',
      cubeType: 'scoping',
      icon: SlidersHorizontal,
      categoryEn: 'RAPID SCOPING',
      categoryAr: 'استيعاب دقيق',
      statusEn: '60-SEC INTAKE',
      statusAr: 'استيعاب 60 ثانية',
      titleEn: 'SPECIFY TRAINING NEEDS',
      titleAr: 'تحديد الاحتياج المؤسسي',
      subEn: 'Interactive Scope Definition',
      subAr: 'تحديد فوري للمتطلبات',
      quoteEn:
        'Define your required skills, delivery mode, and cohort size in 60 seconds. Zero tedious RFP drafting or endless agency briefings.',
      quoteAr:
        'حدد المهارات المستهدفة وحجم الفوج وأسلوب التدريب في 60 ثانية، بدون كراسات شروط معقدة أو استشارات لا تنتهي.',
      metrics: [
        {
          valueEn: '60s',
          valueAr: '60 ثانية',
          labelEn: 'INTERACTIVE INTAKE',
          labelAr: 'استيعاب فوري',
        },
        {
          valueEn: '20+ Domains',
          valueAr: '20+ مجالاً',
          labelEn: 'SPECIALIZED COVERAGE',
          labelAr: 'تخصصات معتمدة',
        },
      ],
      backTitleEn: 'ENTERPRISE SCOPE SPECIFICATION',
      backTitleAr: 'كراسة مواصفات التدريب',
      backSubEn: 'Submitted Scope Parameters & Deliverables',
      backSubAr: 'معايير الاحتياج المحددة والجاهزة للمطابقة',
      takeaways: [
        { en: 'Specialized coverage across 20+ corporate domains', ar: 'تغطية متخصصة لأكثر من 20 مجالاً تدريبياً معتمداً' },
        { en: 'Targeted city selection across GCC & live remote', ar: 'تخصيص فوري: الرياض، جدة، دبي، أو عن بُعد' },
        { en: 'Aligned with Saudization & tech upskilling KPIs', ar: 'مواءمة الأهداف مع مؤشرات التوطين والتحول' },
      ],
      renderBackContent: (isAr) => (
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-[11px] font-mono">{isAr ? 'المجال المستهدف:' : 'Domain Scope:'}</span>
            <span className="text-white font-medium text-xs">{isAr ? 'القيادة التنفيذية وإدارة التغيير' : 'Executive Leadership & Ops'}</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-[11px] font-mono">{isAr ? 'الموقع والفوج:' : 'Location & Cohort:'}</span>
            <span className="text-white font-medium text-xs">{isAr ? 'حضوري بالرياض · 25 متدرباً' : 'Onsite Riyadh · 25 Execs'}</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FF5C00]/[0.08] border border-[#FF5C00]/30">
            <span className="text-neutral-300 text-[11px] font-mono">{isAr ? 'الجدول الزمني:' : 'Timeline:'}</span>
            <span className="text-[#FF5C00] font-bold text-xs">{isAr ? 'الربع القادم · تسليم فوري' : 'Upcoming Quarter Start'}</span>
          </div>
        </div>
      ),
    },
    {
      id: 'step-matching',
      index: '02',
      cubeType: 'vetting',
      icon: BadgeCheck,
      categoryEn: 'DUAL VETTING',
      categoryAr: 'فحص واعتماد الخبراء',
      statusEn: '100% VETTED',
      statusAr: 'معتمد 100%',
      titleEn: 'FACULTY & ENTITY VETTING',
      titleAr: 'فحص واعتماد المدربين',
      subEn: 'Screened GCC Training Desks',
      subAr: 'تدقيق مستقل للنخبة',
      quoteEn:
        'Screening 120+ accredited GCC training entities. Every facilitator audited for verified enterprise track records and 4.9+ feedback ratings.',
      quoteAr:
        'فحص وتدقيق أكثر من 120 منشأة تدريبية معتمدة لاختيار أفضل المدربين التنفيذيين أصحاب السجلات والإنجازات الموثوقة.',
      metrics: [
        {
          valueEn: '120+ Entities',
          valueAr: '120+ منشأة',
          labelEn: 'ACCREDITED NETWORK',
          labelAr: 'شبكة معتمدة بالخليج',
        },
        {
          valueEn: '4.9 / 5.0',
          valueAr: '4.9 / 5.0',
          labelEn: 'HISTORICAL SATISFACTION',
          labelAr: 'معدل رضا المتدربين',
        },
      ],
      backTitleEn: 'PROVIDER VETTING SCORECARD',
      backTitleAr: 'معايير تدقيق واعتماد المزود',
      backSubEn: 'Compliance & Quality Standards Audited',
      backSubAr: 'مؤشرات الجودة والخبرة التنفيذية المعتمدة',
      takeaways: [
        { en: 'Independent verification of facilitator credentials', ar: 'تحقق مستقل من سجلات المدربين والشهادات' },
        { en: 'Historical participant audit across GCC enterprises', ar: 'مراجعة تقييمات المشاركين في برامج سابقة' },
        { en: 'Total privacy: zero unsolicited vendor spam', ar: 'سرية تامة لبيانات مسؤولي الموارد البشرية' },
      ],
      renderBackContent: (isAr) => (
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-[11px] font-mono">{isAr ? 'الاعتماد المؤسسي:' : 'Accreditation:'}</span>
            <span className="text-white font-medium text-xs flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#FF5C00]" /> {isAr ? 'مرخص ومعتمد بالخليج' : 'Verified GCC Entity'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/10">
            <span className="text-neutral-400 text-[11px] font-mono">{isAr ? 'خبرة الميسر التنفيذي:' : 'Facilitator:'}</span>
            <span className="text-white font-medium text-xs flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#FF5C00]" /> 10+ {isAr ? 'سنوات إقليمية' : 'Yrs Regional'}
            </span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FF5C00]/[0.08] border border-[#FF5C00]/30">
            <span className="text-neutral-300 text-[11px] font-mono">{isAr ? 'تقييم المشاركين:' : 'Participant Rating:'}</span>
            <span className="text-[#FF5C00] font-bold text-xs flex items-center gap-1">
              <CheckCircle2 size={12} className="text-[#FF5C00]" /> 4.9 / 5.0
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'step-compare',
      index: '03',
      cubeType: 'comparison',
      icon: Scale,
      categoryEn: 'PROPOSAL AUDIT',
      categoryAr: 'مقارنة العروض المعتمدة',
      statusEn: '48H DELIVERY',
      statusAr: 'تسليم 48 ساعة',
      titleEn: 'COMPARE ITEMIZE PROPOSALS',
      titleAr: 'مقارنة العروض المفصلة',
      subEn: 'Side-by-Side Scope Transparency',
      subAr: 'شفافية تامة للأسعار والمناهج',
      quoteEn:
        'Receive 2 to 3 tailored, itemized proposals in 48 hours. Transparent faculty rates, detailed course syllabi, and zero hidden platform markups.',
      quoteAr:
        'استلم 2 إلى 3 عروض مفصلة وشفافة خلال 48 ساعة، بأسعار واضحة ومناهج معتمدة وبدون أي تكاليف خفية أو وسطاء.',
      metrics: [
        {
          valueEn: '2–3 Offers',
          valueAr: '2–3 عروض',
          labelEn: 'CURATED PROPOSALS',
          labelAr: 'عروض مدققة ومطابقة',
        },
        {
          valueEn: '48 Hours',
          valueAr: '48 ساعة',
          labelEn: 'SLA DELIVERY WINDOW',
          labelAr: 'مهلة التسليم المضمونة',
        },
      ],
      backTitleEn: 'COMPARATIVE PROPOSAL MATRIX',
      backTitleAr: 'مصفوفة مقارنة العروض',
      backSubEn: 'Transparent Itemized Scope & Deliverables',
      backSubAr: 'بنود تعاقدية شفافة ومفصلة بدون أي وساطة',
      takeaways: [
        { en: 'Direct interview with matched facilitators prior to award', ar: 'مقابلة الميسرين مباشرة قبل توقيع التعاقد' },
        { en: 'Clear line-item pricing with zero markups', ar: 'شفافية كاملة لتفاصيل تكلفة التدريب والمواد' },
        { en: 'Guaranteed proposal delivery within 48-hour SLA', ar: 'استلام كافة العروض المطابقة خلال 48 ساعة' },
      ],
      renderBackContent: (isAr) => (
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="p-2 rounded-lg bg-white/[0.02] border border-white/10">
              <span className="text-[9px] text-neutral-400 font-mono block">{isAr ? 'العرض الأول' : 'Proposal A'}</span>
              <span className="text-xs font-bold text-white block mt-0.5">SAR 125k</span>
              <span className="text-[9px] text-neutral-400 block truncate">{isAr ? 'أكاديمية إقليمية' : 'Tier-1 Academy'}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#FF5C00]/[0.08] border border-[#FF5C00]/30">
              <span className="text-[9px] text-[#FF5C00] font-mono block">{isAr ? 'العرض الثاني' : 'Proposal B'}</span>
              <span className="text-xs font-bold text-white block mt-0.5">SAR 110k</span>
              <span className="text-[9px] text-orange-200/80 block truncate">{isAr ? 'بيت خبرة تخصصي' : 'Boutique Firm'}</span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/10 flex items-center gap-2 text-[11px] text-neutral-300">
            <ShieldCheck size={14} className="text-[#FF5C00] shrink-0" />
            <span>{isAr ? 'تسليم العروض ومطابقتها خلال 48 ساعة كحد أقصى' : 'Guaranteed 48h delivery SLA with line-item detail'}</span>
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
          <span>{isAr ? 'مسار المطابقة // خارطة الطريق التنفيذية' : 'MATCHING ROADMAP // WORKFLOW'}</span>
        </div>

        <TextReveal
          as="h2"
          text={isAr ? '3 خطوات بسيطة لتدريب معتمد وموثوق' : '3 Simple Steps to Proven Training'}
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-tight"
        />

        <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'مواصفات تنفيذية فائقة الدقة. انقر على أي بطاقة لقلبها ومعاينة خطوات الاستيعاب والفحص ومقارنة العروض.'
            : 'Minimal words, verified precision. Click any card to flip and inspect scoping rubrics, faculty vetting, and itemized comparison.'}
        </p>
      </div>

      {/* 3 Palantir-Style Dog-Ear Vertical Cards with Isometric Cubes in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {steps.map((step, idx) => {
          const isFlipped = !!flippedCards[idx];
          const isHovered = hoveredCard === idx;

          return (
            <div
              key={step.id}
              className="relative w-full h-[560px] sm:h-[550px] lg:h-[570px]"
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
                {/* FRONT FACE: Palantir Clean Tech Card with Isometric Cube */}
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
                          {step.index}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                          {isAr ? step.categoryAr : step.categoryEn}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300">
                        {isAr ? step.statusAr : step.statusEn}
                      </span>
                    </div>

                    {/* 3D Animated Isometric Cube (Pradis Style) */}
                    <div className="pt-2">
                      <IsometricCubeVisual
                        type={step.cubeType}
                        isHovered={isHovered}
                        reduce={reduce}
                      />
                    </div>

                    {/* Middle: Clean Corporate Typography & Quote */}
                    <div className="space-y-3 my-auto">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold font-heading text-white tracking-tight leading-snug group-hover:text-neutral-100 transition-colors">
                          {isAr ? step.titleAr : step.titleEn}
                        </h3>
                        <p className="text-xs font-mono text-[#FF5C00] mt-1 tracking-wide">
                          {isAr ? step.subAr : step.subEn}
                        </p>
                      </div>

                      {/* Executive Impact Quote */}
                      <blockquote className="text-[13px] sm:text-sm text-neutral-300/90 font-sans leading-relaxed border-s-2 border-white/20 ps-3 italic">
                        &ldquo;{isAr ? step.quoteAr : step.quoteEn}&rdquo;
                      </blockquote>
                    </div>

                    {/* Bottom: Key Metrics & Interactive Flip Prompt */}
                    <div className="space-y-3.5 pt-3 border-t border-white/[0.08]">
                      <div className="grid grid-cols-2 gap-2 text-start">
                        {step.metrics.map((m, mIdx) => (
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
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-[#FF5C00] transition-colors pt-0.5">
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
                          {isAr ? 'المواصفات' : 'SPEC'} {'//'} {step.index}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">
                          {isAr ? 'خطوة معتمدة' : 'VERIFIED'}
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

                    {/* Back Content Body */}
                    <div className="my-auto space-y-3">
                      <div>
                        <h4 className="text-base font-bold font-heading text-white">
                          {isAr ? step.backTitleAr : step.backTitleEn}
                        </h4>
                        <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                          {isAr ? step.backSubAr : step.backSubEn}
                        </p>
                      </div>

                      {/* Dynamic Compact Component */}
                      {step.renderBackContent(isAr)}

                      {/* Takeaways List */}
                      <div className="space-y-1.5 pt-1">
                        {step.takeaways.map((point, pIdx) => (
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
