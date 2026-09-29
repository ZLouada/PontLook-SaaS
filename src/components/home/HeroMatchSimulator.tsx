'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import {
  Building2,
  BadgeCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
  MapPin,
  Cpu,
  GraduationCap,
  TrendingUp,
  type LucideIcon,
} from '@/components/icons';
import BorderBeam from '@/components/shared/BorderBeam';
import NumberTicker from '@/components/shared/NumberTicker';
import IconFrame from '@/components/shared/IconFrame';

interface CityOption {
  id: string;
  nameEn: string;
  nameAr: string;
  countryEn: string;
  countryAr: string;
  regulatoryEn: string;
  regulatoryAr: string;
  baseAcademies: number;
}

interface DomainOption {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: LucideIcon;
  multiplier: number;
}

const CITIES: CityOption[] = [
  {
    id: 'riyadh',
    nameEn: 'Riyadh',
    nameAr: 'الرياض',
    countryEn: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    regulatoryEn: 'TVTC & HRDF Aligned',
    regulatoryAr: 'معتمد من المؤسسة العامة وهدف',
    baseAcademies: 28,
  },
  {
    id: 'dubai',
    nameEn: 'Dubai',
    nameAr: 'دبي',
    countryEn: 'UAE',
    countryAr: 'الإمارات',
    regulatoryEn: 'KHDA & DED Aligned',
    regulatoryAr: 'معتمد من هيئة المعرفة وتنمية المجتمع',
    baseAcademies: 32,
  },
  {
    id: 'abu-dhabi',
    nameEn: 'Abu Dhabi',
    nameAr: 'أبوظبي',
    countryEn: 'UAE',
    countryAr: 'الإمارات',
    regulatoryEn: 'ACTVET Certified',
    regulatoryAr: 'معتمد من مركز أبوظبي للتدريب',
    baseAcademies: 22,
  },
  {
    id: 'doha',
    nameEn: 'Doha',
    nameAr: 'الدوحة',
    countryEn: 'Qatar',
    countryAr: 'قطر',
    regulatoryEn: 'Qatar Vision 2030 Aligned',
    regulatoryAr: 'متوافق مع ركيزة رؤية قطر 2030',
    baseAcademies: 18,
  },
];

const DOMAINS: DomainOption[] = [
  {
    id: 'ai',
    nameEn: 'AI & Digital Tech',
    nameAr: 'الذكاء الاصطناعي والتقنية',
    icon: Cpu,
    multiplier: 1.15,
  },
  {
    id: 'leadership',
    nameEn: 'Executive Leadership',
    nameAr: 'القيادة التنفيذية',
    icon: GraduationCap,
    multiplier: 1.3,
  },
  {
    id: 'sales',
    nameEn: 'B2B Sales & Negotiation',
    nameAr: 'المبيعات والتفاوض',
    icon: TrendingUp,
    multiplier: 1.05,
  },
  {
    id: 'cyber',
    nameEn: 'Cybersecurity & GRC',
    nameAr: 'الأمن والالتزام',
    icon: ShieldCheck,
    multiplier: 0.95,
  },
];

export default function HeroMatchSimulator() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const [selectedCity, setSelectedCity] = useState<CityOption>(CITIES[0]);
  const [selectedDomain, setSelectedDomain] = useState<DomainOption>(DOMAINS[0]);

  const estimatedAcademies = Math.round(selectedCity.baseAcademies * selectedDomain.multiplier);
  const matchConfidence = 99.4;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 sm:mt-16 text-start">
      {/* Container with BorderBeam */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-[#26282D] bg-[#0F1013]/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl shadow-black/80 overflow-hidden">
        {/* Animated laser border beam */}
        <BorderBeam size={240} duration={10} colorFrom="#FF5C00" colorTo="#0052FF" />

        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#26282D]">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              {isAr ? 'محاكي المطابقة المؤسسية الفورية' : 'Live GCC Matchmaking Telemetry'}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neutral-300">
            <Sparkles size={12} className="text-amber-400" />
            <span>{isAr ? 'بيانات حية ومحدثة' : 'Real-Time Network Feed'}</span>
          </div>
        </div>

        {/* Interactive Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 my-6">
          {/* 1. City Hub Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
              {isAr ? '1. اختر المركز الإقليمي:' : '1. Target GCC Hub:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CITIES.map((c) => {
                const isSelected = c.id === selectedCity.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCity(c)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium text-start transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-white/[0.10] border-white/30 text-white shadow-sm'
                        : 'bg-[#16171B] border-[#26282D] text-neutral-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <span>{isAr ? c.nameAr : c.nameEn}</span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {isAr ? c.countryAr.slice(0, 8) : c.countryEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Domain Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2.5">
              {isAr ? '2. التخصص المطلوب:' : '2. Capability Domain:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DOMAINS.map((d) => {
                const isSelected = d.id === selectedDomain.id;
                const Icon = d.icon;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDomain(d)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium text-start transition-all border flex items-center gap-2 ${
                      isSelected
                        ? 'bg-orange-500/15 border-orange-500/40 text-orange-300 shadow-sm'
                        : 'bg-[#16171B] border-[#26282D] text-neutral-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span className="truncate">{isAr ? d.nameAr : d.nameEn}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Telemetry Output Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#16171B] border border-[#26282D] grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div>
            <span className="text-[11px] text-neutral-400 font-sans block mb-1">
              {isAr ? 'المراكز الجاهزة' : 'Vetted Academies'}
            </span>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-1">
              <NumberTicker value={estimatedAcademies} />
              <span className="text-xs font-normal text-emerald-400 font-mono">+</span>
            </div>
            <span className="text-[10px] text-neutral-500 block mt-0.5 truncate">
              {isAr ? 'جاهزة لتقديم العروض' : 'Ready to quote'}
            </span>
          </div>

          {/* Metric 2 */}
          <div>
            <span className="text-[11px] text-neutral-400 font-sans block mb-1">
              {isAr ? 'سرعة استلام العروض' : 'Turnaround SLA'}
            </span>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white">
              {'< 48h'}
            </div>
            <span className="text-[10px] text-neutral-500 block mt-0.5 truncate">
              {isAr ? 'متوسط سرعة الإنجاز' : 'Average time to 3 RFPs'}
            </span>
          </div>

          {/* Metric 3 */}
          <div>
            <span className="text-[11px] text-neutral-400 font-sans block mb-1">
              {isAr ? 'الاعتماد التنظيمي' : 'Accreditation'}
            </span>
            <div className="text-xs sm:text-sm font-semibold text-white truncate pt-1">
              {isAr ? selectedCity.regulatoryAr : selectedCity.regulatoryEn}
            </div>
            <span className="text-[10px] text-emerald-400 block mt-0.5">
              {isAr ? 'معايير حكومية موثقة' : 'Government vetted'}
            </span>
          </div>

          {/* Metric 4 */}
          <div>
            <span className="text-[11px] text-neutral-400 font-sans block mb-1">
              {isAr ? 'تكلفة المطابقة' : 'Buyer Pricing'}
            </span>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white">
              $0
            </div>
            <span className="text-[10px] text-emerald-400 block mt-0.5 font-medium">
              {isAr ? 'مجاني 100% للشركات' : '100% Free for Enterprise'}
            </span>
          </div>
        </div>

        {/* Instant Action Row */}
        <div className="mt-5 pt-4 border-t border-[#26282D] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <BadgeCheck size={16} className="text-emerald-400" />
            <span>
              {isAr
                ? `مطابقة سرية ومضمونة لـ ${selectedDomain.nameAr} في ${selectedCity.nameAr}`
                : `Confidential matchmaking for ${selectedDomain.nameEn} in ${selectedCity.nameEn}`}
            </span>
          </div>

          <Link
            href={`/${lang}/find-training/request`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-xs shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
          >
            <span>{isAr ? 'طلب عروض تدريبية لهذا التخصص' : 'Request Match Proposals Now'}</span>
            <ArrowRight size={14} className="rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
