'use client';

import React from 'react';
import { m, useReducedMotion } from 'framer-motion';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Target,
  GraduationCap,
  Layers,
} from '@/components/icons';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import CardTilt3D from '@/components/shared/CardTilt3D';
import BorderGlow from '@/components/shared/BorderGlow';
import { viewportOnce } from '@/lib/motion';

interface FindTrainingBentoImpactProps {
  lang: string;
}

export default function FindTrainingBentoImpact({ lang }: FindTrainingBentoImpactProps) {
  const isAr = lang === 'ar';
  const reduce = useReducedMotion();

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
      {/* Section Header */}
      <div className="mb-10 sm:mb-16 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
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

      {/* Bento Grid (2 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Left Card: AT THE SOURCE */}
        <div className="lg:col-span-6">
          <CardTilt3D maxTilt={3} className="h-full">
            <Spotlight
              radius={380}
              className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-[#26282D] hover:border-white/20 bg-gradient-to-b from-[#111216] to-[#0A0B0E] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-2xl transition-all duration-300"
            >
              <BorderGlow glowColor="rgba(255, 92, 0, 0.2)" size={260} opacity={0.5} />

              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-mono font-semibold uppercase tracking-wider">
                    <Layers size={13} className="text-[#FF5C00]" />
                    <span>{isAr ? 'من المنبع' : 'AT THE SOURCE'}</span>
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {isAr ? 'توفيق ذكي ومباشر' : 'Direct Concierge Pipeline'}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 font-heading leading-snug">
                  {isAr
                    ? 'ربط مباشر من التحدي إلى التنفيذ المعتمد'
                    : 'The Right Training Partner. Without the Guesswork.'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mb-8 font-sans leading-relaxed">
                  {isAr
                    ? 'بدلاً من البحث في آلاف الدورات الجاهزة، نحدد جوهر التحدي ونطابقه مع المزود الأكثر كفاءة في منطقتك.'
                    : 'Skip the endless catalog browsing. We map your specific performance gaps directly to providers with verified regional track records.'}
                </p>

                {/* Pipeline Flow Diagram */}
                <div className="relative space-y-4 my-6">
                  {pipelineStages.map((stage, idx) => {
                    const IconComponent = stage.icon;
                    return (
                      <div key={stage.label} className="relative">
                        <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl bg-[#16171B]/90 border border-[#26282D] hover:border-[#FF5C00]/40 transition-colors">
                          <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-[#FF5C00]/30 text-[#FF5C00] flex items-center justify-center shrink-0">
                            <IconComponent size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-xs sm:text-sm font-semibold text-white">
                                {stage.label}
                              </h4>
                              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/[0.04] text-neutral-400 border border-white/5">
                                {stage.tag}
                              </span>
                            </div>
                            <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5">
                              {stage.desc}
                            </p>
                          </div>
                        </div>

                        {/* Connector Arrow between nodes */}
                        {idx < pipelineStages.length - 1 && (
                          <div className="flex justify-center my-1.5">
                            <div className="w-[1.5px] h-3 bg-gradient-to-b from-[#FF5C00] to-orange-500/30" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Value Note */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <ShieldCheck size={14} className="text-[#FF5C00]" />
                  <span>{isAr ? 'اعتماد واختيار مخصص 100%' : '100% Curated & Vetted'}</span>
                </span>
                <span className="font-mono text-neutral-400">
                  {isAr ? 'صفر تكلفة للمؤسسات' : '$0 Procurement Cost'}
                </span>
              </div>
            </Spotlight>
          </CardTilt3D>
        </div>

        {/* Right Card: THE COMPOUND EFFECT */}
        <div className="lg:col-span-6">
          <CardTilt3D maxTilt={3} className="h-full">
            <Spotlight
              radius={380}
              className="relative h-full overflow-hidden rounded-2xl sm:rounded-3xl border border-orange-500/30 bg-gradient-to-b from-[#131419] to-[#0A0B0E] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-[0_20px_50px_rgba(255,92,0,0.06),inset_0_1px_0_0_rgba(255,255,255,0.12)] transition-all duration-300"
            >
              <BorderGlow glowColor="rgba(255, 92, 0, 0.25)" size={260} opacity={0.6} />

              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.08]">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-[#FF5C00]/40 text-[#FF5C00] text-xs font-mono font-bold uppercase tracking-wider">
                    <Sparkles size={13} className="text-[#FF5C00]" />
                    <span>{isAr ? 'الأثر التراكمي' : 'THE COMPOUND EFFECT'}</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                    {isAr ? 'عائد استثماري مثبت' : 'Measured Enterprise ROI'}
                  </span>
                </div>

                {/* Massive 3.5x Stat */}
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-none bg-gradient-to-r from-white via-white to-orange-200 bg-clip-text">
                    3.5x
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#FF5C00] font-heading">
                    {isAr ? 'مضاعفة استبقاء المهارات' : 'Skill Retention Multiplier'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 mb-6 font-sans leading-relaxed">
                  {isAr
                    ? 'البرامج التدريبية المصممة خصيصاً لسياق الشركة وفريق العمل تحقق أثراً تدريبياً يفوق بـ 3.5 أضعاف الاشتراكات العامة في مكتبات الدورات المسجلة.'
                    : 'Tailored executive and workforce cohorts matched to your specific workflow deliver 3.5x higher skill retention compared to generic off-the-shelf course libraries.'}
                </p>

                {/* Trajectory Growth Graph */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1013] border border-[#26282D] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-300 font-semibold">
                      {isAr ? 'مقارنة استبقاء المهارات بعد التدريب' : 'Skill Retention & Execution Curve'}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">12 Months Track</span>
                  </div>

                  {/* SVG Chart Graphic */}
                  <div className="relative h-28 w-full pt-2">
                    <svg
                      viewBox="0 0 320 80"
                      className="w-full h-full overflow-visible"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

                      {/* Generic Course Flat/Declining Curve (Dashed gray) */}
                      <path
                        d="M 10 50 Q 80 52, 160 62 T 310 70"
                        stroke="#666666"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* PontLook Cohort Exponential Curve (Solid Orange Glowing) */}
                      <path
                        d="M 10 70 Q 100 65, 180 30 T 310 12"
                        stroke="#FF5C00"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* End point dot */}
                      <circle cx="310" cy="12" r="4" fill="#FF5C00" className="animate-pulse" />
                    </svg>

                    {/* Chart Legend */}
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-neutral-400 pt-2 border-t border-white/[0.05]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#FF5C00]" />
                        <span className="text-white font-medium">
                          {isAr ? 'برامج PontLook المخصصة' : 'PontLook Cohorts (3.5x)'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-neutral-600" />
                        <span>{isAr ? 'مكتبات الدورات العامة' : 'Generic Catalog Courses'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Micro-summary */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-[#FF5C00]" />
                  <span>{isAr ? 'عائد ملموس على الاستثمار' : 'Validated Capability ROI'}</span>
                </span>
                <span className="font-mono text-[#FF5C00] font-semibold text-[11px] sm:text-xs">
                  {isAr ? 'استجابة خلال 48 ساعة' : '48h Concierge Turnaround'}
                </span>
              </div>
            </Spotlight>
          </CardTilt3D>
        </div>
      </div>
    </div>
  );
}
