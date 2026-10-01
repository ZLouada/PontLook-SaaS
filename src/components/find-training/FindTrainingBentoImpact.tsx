'use client';

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Target,
  GraduationCap,
  Layers,
} from '@/components/icons';
import TextReveal from '@/components/shared/TextReveal';

interface FindTrainingBentoImpactProps {
  lang: string;
}

export default function FindTrainingBentoImpact({ lang }: FindTrainingBentoImpactProps) {
  const isAr = lang === 'ar';

  const pipelineStages = [
    {
      label: isAr ? 'التحدي الميداني' : 'Your Challenge',
      desc: isAr ? 'فجوات مهارية، قيادة، أو تحول تقني' : 'Specific skill gap or transformation goal',
      icon: Target,
      tag: isAr ? 'المدخلات' : 'Input',
    },
    {
      label: isAr ? 'محرك PontLook' : 'PontLook Engine',
      desc: isAr ? 'فحص الاعتمادات، تقييمات سابقة، ومواءمة' : 'Vetting faculty, credentials & regional SLA',
      icon: Cpu,
      tag: isAr ? 'المطابقة' : 'Match',
    },
    {
      label: isAr ? 'المزود المعتمد' : 'Top-Tier Provider',
      desc: isAr ? 'منهج مخصص ومدرب تنفيذي موثق' : 'Tailored syllabus & verified facilitator',
      icon: GraduationCap,
      tag: isAr ? 'النتيجة' : 'Delivery',
    },
  ];

  return (
    <div className="w-full">
      {/* Section Header (Pure Monochrome) */}
      <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span>{isAr ? 'القيمة والأثر الميداني' : 'MEASURABLE OUTCOMES'}</span>
        </div>

        <TextReveal
          as="h2"
          text={
            isAr
              ? 'الشريك التدريبي الأنسب. بدون تخمين أو هدر.'
              : 'The Right Training Partner. Without the Guesswork.'
          }
          className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-tight"
        />

        <p className="text-xs xs:text-sm sm:text-base text-neutral-400 font-sans max-w-2xl mx-auto leading-relaxed">
          {isAr
            ? 'نربط تحديات منشأتك مباشرة مع نخبة بيوت الخبرة التدريبية المعتمدة لضمان أثر تدريبي حقيقي ومستدام.'
            : 'Connecting corporate capability challenges directly to vetted execution, backed by measurable ROI metrics.'}
        </p>
      </div>

      {/* Single Unified Window Container (Black, White, and Grey) */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-b from-[#131418] to-[#0A0B0D] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        {/* Window Title Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5 border-b border-white/[0.08] bg-black/40 text-xs font-mono">
          {/* Window Control Dots (Silver / Monochrome) */}
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ms-2 text-neutral-400 hidden sm:inline text-[11px]">
              {isAr ? 'منظومة المطابقة والقياس المؤسسي' : 'enterprise_matching_matrix.sys'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span>{isAr ? 'مجاني 100% للشركات' : '100% FREE FOR ENTERPRISES'}</span>
            </span>
          </div>
        </div>

        {/* 2-Panel Split inside the Single Window */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Panel: Direct Concierge Pipeline */}
          <div className="lg:col-span-6 p-5 sm:p-7 lg:p-9 flex flex-col justify-between">
            <div>
              {/* Header Tag */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/[0.06]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white text-xs font-mono font-semibold uppercase tracking-wider">
                  <Layers size={13} className="text-white" />
                  <span>{isAr ? 'من المنبع' : 'AT THE SOURCE'}</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  {isAr ? 'توفيق ذكي ومباشر' : 'Direct Concierge Pipeline'}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-heading leading-snug">
                {isAr
                  ? 'ربط مباشر من التحدي إلى التنفيذ المعتمد'
                  : 'The Right Training Partner. Without the Guesswork.'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mb-6 font-sans leading-relaxed">
                {isAr
                  ? 'بدلاً من البحث في آلاف الدورات الجاهزة، نحدد جوهر التحدي ونطابقه مع المزود الأكثر كفاءة في منطقتك.'
                  : 'Skip the endless catalog browsing. We map your specific performance gaps directly to providers with verified regional track records.'}
              </p>

              {/* Pipeline Flow Diagram (Straight Lines, Not Wavy) */}
              <div className="relative space-y-3.5 my-4">
                {pipelineStages.map((stage, idx) => {
                  const IconComponent = stage.icon;
                  return (
                    <div key={stage.label} className="relative">
                      <div className="flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl bg-[#16171B]/90 border border-white/10 hover:border-white/25 transition-colors">
                        <div className="h-9 w-9 rounded-xl bg-white/[0.06] border border-white/15 text-white flex items-center justify-center shrink-0">
                          <IconComponent size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs sm:text-sm font-semibold text-white">
                              {stage.label}
                            </h4>
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/10">
                              {stage.tag}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5">
                            {stage.desc}
                          </p>
                        </div>
                      </div>

                      {/* Straight Connector Line (Not Wavy) */}
                      {idx < pipelineStages.length - 1 && (
                        <div className="flex justify-center my-1">
                          <div className="w-[1.5px] h-2.5 bg-white/20" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Value Note */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <ShieldCheck size={14} className="text-white" />
                <span>{isAr ? 'اعتماد واختيار مخصص 100%' : '100% Curated & Vetted'}</span>
              </span>
              <span className="font-mono text-neutral-400">
                {isAr ? 'صفر تكلفة للمؤسسات' : '$0 Procurement Cost'}
              </span>
            </div>
          </div>

          {/* Right Panel: Measured Enterprise ROI */}
          <div className="lg:col-span-6 p-5 sm:p-7 lg:p-9 bg-black/35 border-t lg:border-t-0 lg:border-s border-white/[0.08] flex flex-col justify-between">
            <div>
              {/* Header Tag */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-white/[0.06]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono font-bold uppercase tracking-wider">
                  <Sparkles size={13} className="text-white" />
                  <span>{isAr ? 'الأثر التراكمي' : 'THE COMPOUND EFFECT'}</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-300 font-semibold">
                  {isAr ? 'عائد استثماري مثبت' : 'Measured Enterprise ROI'}
                </span>
              </div>

              {/* Massive 3.5x Stat (Pure White) */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-none">
                  3.5x
                </span>
                <span className="text-base sm:text-lg font-bold text-neutral-200 font-heading">
                  {isAr ? 'مضاعفة استبقاء المهارات' : 'Skill Retention Multiplier'}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 mb-6 font-sans leading-relaxed">
                {isAr
                  ? 'البرامج التدريبية المصممة خصيصاً لسياق الشركة وفريق العمل تحقق أثراً تدريبياً يفوق بـ 3.5 أضعاف الاشتراكات العامة في مكتبات الدورات المسجلة.'
                  : 'Tailored executive and workforce cohorts matched to your specific workflow deliver 3.5x higher skill retention compared to generic off-the-shelf course libraries.'}
              </p>

              {/* Straight Linear Metric Comparison (Clean & Not Wavy) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1013] border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-semibold">
                    {isAr ? 'مقارنة استبقاء المهارات بعد التدريب' : 'Skill Retention & Execution Metric'}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">12 Months Track</span>
                </div>

                <div className="space-y-3.5 pt-1">
                  {/* Item 1: PontLook Cohorts */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-white flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
                        <span>{isAr ? 'برامج PontLook المخصصة' : 'PontLook Cohorts'}</span>
                      </span>
                      <span className="font-mono text-xs font-bold text-white">3.5x (88%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-white rounded-full w-[88%] shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                    </div>
                  </div>

                  {/* Item 2: Generic Catalog Courses */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-neutral-400 flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-neutral-600" />
                        <span>{isAr ? 'مكتبات الدورات العامة' : 'Generic Catalog Courses'}</span>
                      </span>
                      <span className="font-mono text-xs text-neutral-400">1.0x (24%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-neutral-600 rounded-full w-[24%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Micro-summary */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-white" />
                <span>{isAr ? 'عائد ملموس على الاستثمار' : 'Validated Capability ROI'}</span>
              </span>
              <span className="font-mono text-neutral-300 font-semibold text-[11px] sm:text-xs">
                {isAr ? 'استجابة خلال 48 ساعة' : '48h Concierge Turnaround'}
              </span>
            </div>
          </div>
        </div>

        {/* Window Footer Bar */}
        <div className="px-5 sm:px-8 py-3 bg-black/60 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-white" />
            <span className="text-neutral-300">
              {isAr ? 'عروض أسعار تفصيلية ومقارنة واضحة بدون أي التزام' : 'Itemized vendor proposals with guaranteed pricing transparency'}
            </span>
          </div>
          <span className="font-mono text-white font-semibold text-[11px] sm:text-xs">
            {isAr ? 'صفر تكلفة للمؤسسات' : '$0 Procurement Cost'}
          </span>
        </div>
      </div>
    </div>
  );
}
