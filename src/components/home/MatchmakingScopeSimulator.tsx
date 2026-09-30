'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
} from '@/components/icons';
import CardTilt3D from '@/components/shared/CardTilt3D';
import BorderGlow from '@/components/shared/BorderGlow';
import Magnetic from '@/components/shared/Magnetic';
import CounterTicker from '@/components/shared/CounterTicker';

interface MatchmakingScopeSimulatorProps {
  lang?: string;
}

export default function MatchmakingScopeSimulator({ lang = 'en' }: MatchmakingScopeSimulatorProps) {
  const isAr = lang === 'ar';
  const rawId = useId();
  const gradId = rawId.replace(/:/g, '_');

  const domains = [
    {
      id: 'leadership',
      labelEn: 'Executive Leadership',
      labelAr: 'القيادة التنفيذية',
      icon: GraduationCap,
      accreditationEn: 'Global C-Suite Vetted',
      accreditationAr: 'معايير قيادية دولية',
    },
    {
      id: 'ai',
      labelEn: 'AI & Digital Transformation',
      labelAr: 'التحول الرقمي والذكاء الاصطناعي',
      icon: Cpu,
      accreditationEn: 'Applied Enterprise Labs',
      accreditationAr: 'مختبرات تطبيقية للمؤسسات',
    },
    {
      id: 'sales',
      labelEn: 'Strategic B2B Sales',
      labelAr: 'المبيعات والتفاوض التجاري',
      icon: TrendingUp,
      accreditationEn: 'Complex Pipeline Methodologies',
      accreditationAr: 'منهجيات إغلاق الصفقات الكبرى',
    },
    {
      id: 'grc',
      labelEn: 'Cybersecurity & GRC',
      labelAr: 'الحوكمة والأمن السيبراني',
      icon: ShieldCheck,
      accreditationEn: 'ISO & Regional Regulators Aligned',
      accreditationAr: 'متوافق مع الهيئات التنظيمية',
    },
  ];

  const regions = [
    { id: 'sa', labelEn: '🇸🇦 Saudi Arabia', labelAr: '🇸🇦 المملكة العربية السعودية', hubEn: 'Riyadh & Jeddah Hubs', hubAr: 'مراكز الرياض وجدة' },
    { id: 'ae', labelEn: '🇦🇪 UAE', labelAr: '🇦🇪 الإمارات العربية المتحدة', hubEn: 'Dubai & Abu Dhabi Hubs', hubAr: 'مراكز دبي وأبوظبي' },
    { id: 'qa', labelEn: '🇶🇦 Qatar', labelAr: '🇶🇦 دولة قطر', hubEn: 'Doha Enterprise Hub', hubAr: 'مركز الدوحة للأعمال' },
    { id: 'kw', labelEn: '🇰🇼 Kuwait', labelAr: '🇰🇼 دولة الكويت', hubEn: 'Kuwait City Hub', hubAr: 'مركز العاصمة الكويت' },
  ];

  const cohorts = [
    { id: 'cohort-sm', labelEn: '10–25 Seats', labelAr: '10–25 متدرباً', tierEn: 'Focused Leadership Pod', tierAr: 'مجموعة قيادية مركزة' },
    { id: 'cohort-md', labelEn: '25–75 Seats', labelAr: '25–75 متدرباً', tierEn: 'Mid-Management Department', tierAr: 'قطاع وإدارة وسطى' },
    { id: 'cohort-lg', labelEn: '75+ Seats', labelAr: '75+ متدرباً', tierEn: 'Enterprise Strategic Rollout', tierAr: 'تطبيق مؤسسي شامل' },
  ];

  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedCohort, setSelectedCohort] = useState(cohorts[0]);

  // Dynamic compatibility calculation based on selections
  const compatibilityScore = selectedCohort.id === 'cohort-lg' ? 99.4 : selectedDomain.id === 'ai' ? 98.9 : 99.1;

  return (
    <div className="w-full my-12 sm:my-16">
      <CardTilt3D maxTilt={3.5} className="w-full">
        <div className="relative rounded-3xl border border-[#26282D] bg-[#0E0F12]/95 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden backdrop-blur-xl">
          <BorderGlow color="rgba(255, 92, 0, 0.35)" size={280} />

          {/* Ambient Background Gradient */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/[0.04] blur-3xl rounded-full" />

          {/* Header */}
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-mono font-medium mb-3">
              <Sparkles size={13} className="animate-spin-slow" />
              <span>
                {isAr ? 'محاكي المطابقة المؤسسية التفاعلي' : 'INTERACTIVE MATCHMAKING SIMULATOR'}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-heading tracking-tight">
              {isAr ? 'حاكي عملية المطابقة التدريبية لمنشأتك' : 'Simulate Your Corporate Match in Real Time'}
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              {isAr
                ? 'حدد احتياج فريقك بالأسفل وشاهد كيف تقوم خوارزمية بونت لوك باختيار وفحص 3 عروض تدريبية معتمدة تناسب معاييرك بدقة.'
                : 'Select your workforce scope below to preview how PontLook matches and curates 3 verified training proposals tailored to your criteria.'}
            </p>
          </div>

          {/* Step 1: Controls Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 sm:mb-10">
            {/* Control 1: Domain */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                {isAr ? '1. مجال التدريب المطلوب' : '1. Select Capability Domain'}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {domains.map((dom) => {
                  const isSelected = selectedDomain.id === dom.id;
                  const Icon = dom.icon;
                  return (
                    <button
                      key={dom.id}
                      type="button"
                      onClick={() => setSelectedDomain(dom)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-start transition-all duration-200 ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500/50 text-white shadow-sm shadow-orange-500/10'
                          : 'bg-[#16171B] border-[#26282D] text-neutral-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/[0.05] text-neutral-400'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold truncate">
                          {isAr ? dom.labelAr : dom.labelEn}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate">
                          {isAr ? dom.accreditationAr : dom.accreditationEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Region */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                {isAr ? '2. المركز الإقليمي' : '2. Regional Jurisdiction'}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {regions.map((reg) => {
                  const isSelected = selectedRegion.id === reg.id;
                  return (
                    <button
                      key={reg.id}
                      type="button"
                      onClick={() => setSelectedRegion(reg)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-start transition-all duration-200 ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500/50 text-white shadow-sm shadow-orange-500/10'
                          : 'bg-[#16171B] border-[#26282D] text-neutral-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold truncate">
                          {isAr ? reg.labelAr : reg.labelEn}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate">
                          {isAr ? reg.hubAr : reg.hubEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 3: Cohort Scale */}
            <div className="space-y-2.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                {isAr ? '3. حجم المتدربين' : '3. Workforce Cohort Size'}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {cohorts.map((coh) => {
                  const isSelected = selectedCohort.id === coh.id;
                  return (
                    <button
                      key={coh.id}
                      type="button"
                      onClick={() => setSelectedCohort(coh)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-start transition-all duration-200 ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500/50 text-white shadow-sm shadow-orange-500/10'
                          : 'bg-[#16171B] border-[#26282D] text-neutral-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold truncate">
                          {isAr ? coh.labelAr : coh.labelEn}
                        </div>
                        <div className="text-[10px] text-neutral-500 truncate">
                          {isAr ? coh.tierAr : coh.tierEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Visual Match Bridge & Interactive Telemetry Output */}
          <div className="relative z-10 rounded-2xl border border-white/10 bg-[#16171B]/90 p-5 sm:p-7">
            {/* SVG Bridge Visualizer */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 py-4 px-2">
              {/* Left Enterprise Node */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0E0F12] border border-[#26282D] shrink-0 w-full md:w-auto">
                <div className="h-10 w-10 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-mono">
                    {isAr ? 'منشأتك المؤسسية' : 'Your Organization'}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {isAr ? selectedDomain.labelAr : selectedDomain.labelEn}
                  </div>
                </div>
              </div>

              {/* Center Animated Connection Filaments */}
              <div className="relative flex-1 w-full flex items-center justify-center py-2">
                <div className="w-full flex items-center justify-center relative">
                  <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
                    <line
                      x1="0"
                      y1="16"
                      x2="100%"
                      y2="16"
                      stroke="#26282D"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="0"
                      y1="16"
                      x2="100%"
                      y2="16"
                      stroke={`url(#${gradId})`}
                      strokeWidth="2.5"
                      className="animate-pulse"
                    />
                    <defs>
                      <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#FF5C00" stopOpacity="1" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute px-3 py-1 rounded-full bg-[#0E0F12] border border-orange-500/40 text-[11px] font-mono text-orange-300 font-semibold shadow-xs">
                    {isAr ? 'جاري الفرز والمطابقة' : 'PontLook Concierge Vetting'}
                  </span>
                </div>
              </div>

              {/* Right Vetted Providers Pod */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0E0F12] border border-[#26282D] shrink-0 w-full md:w-auto">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-mono">
                    {isAr ? 'عروض معتمدة ومطابقة' : 'Curated GCC Proposals'}
                  </div>
                  <div className="text-sm font-bold text-emerald-400">
                    {isAr ? '3 معاهد ومراكز معتمدة' : '3 Accredited Providers'}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="mt-6 pt-6 border-t border-[#26282D] grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 rounded-xl bg-[#0E0F12] border border-[#26282D] text-center">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  <CounterTicker value={compatibilityScore} decimals={1} suffix="%" />
                </div>
                <div className="mt-1 text-[11px] text-neutral-400 font-mono uppercase">
                  {isAr ? 'مؤشر التوافق الدقيق' : 'Match Score'}
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-[#0E0F12] border border-[#26282D] text-center">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono flex items-center justify-center gap-1.5">
                  <Clock size={18} className="text-neutral-400" />
                  <span>48h</span>
                </div>
                <div className="mt-1 text-[11px] text-neutral-400 font-mono uppercase">
                  {isAr ? 'سرعة استلام العروض' : 'Proposal SLA'}
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-[#0E0F12] border border-[#26282D] text-center">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">
                  $0.00
                </div>
                <div className="mt-1 text-[11px] text-neutral-400 font-mono uppercase">
                  {isAr ? 'تكلفة المنصة للشركات' : 'Cost to Hiring Org'}
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-[#0E0F12] border border-[#26282D] text-center">
                <div className="text-xl sm:text-2xl font-bold text-white font-mono">
                  100%
                </div>
                <div className="mt-1 text-[11px] text-neutral-400 font-mono uppercase">
                  {isAr ? 'سرية بيانات المنشأة' : 'Confidentiality'}
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#26282D]/60">
              <div className="text-xs text-neutral-400 text-center sm:text-start">
                <span className="text-neutral-200 font-semibold">
                  {isAr ? 'المطابقة المحددة:' : 'Configured scope:'}
                </span>{' '}
                {isAr ? selectedDomain.labelAr : selectedDomain.labelEn} •{' '}
                {isAr ? selectedRegion.labelAr : selectedRegion.labelEn} •{' '}
                {isAr ? selectedCohort.labelAr : selectedCohort.labelEn}
              </div>

              <Magnetic strength={0.22} activeDistance={35} className="w-full sm:w-auto">
                <Link
                  href={`/${lang}/find-training/request`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all duration-200"
                >
                  <span>
                    {isAr
                      ? 'اطرح هذا الطلب التدريبي الآن (مجاناً)'
                      : 'Request Proposals for This Scope'}
                  </span>
                  <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </CardTilt3D>
    </div>
  );
}
