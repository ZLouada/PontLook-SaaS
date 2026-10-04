'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Globe } from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface GccSectionProps {
  lang?: Locale;
}

const GCC_COUNTRIES = [
  { code: 'sa', name: 'Saudi Arabia', nameAr: 'المملكة العربية السعودية' },
  { code: 'ae', name: 'United Arab Emirates', nameAr: 'الإمارات العربية المتحدة' },
  { code: 'qa', name: 'Qatar', nameAr: 'قطر' },
  { code: 'kw', name: 'Kuwait', nameAr: 'الكويت' },
  { code: 'bh', name: 'Bahrain', nameAr: 'البحرين' },
  { code: 'om', name: 'Oman', nameAr: 'سلطنة عمان' },
];

const PRIORITIES = [
  { en: 'Saudization & Local Talent Mandates', ar: 'مبادرات التوطين والسعودة' },
  { en: 'Emiratization & Leadership Acceleration', ar: 'التوطين وتسريع القيادات الإماراتية' },
  { en: 'AI Adoption & Applied GenAI Upskilling', ar: 'تبني الذكاء الاصطناعي وتطوير الكفاءات' },
  { en: 'Digital Transformation & Enterprise Agility', ar: 'التحول الرقمي والمرونة المؤسسية' },
  { en: 'Regulatory Compliance & Governance Standards', ar: 'الامتثال التنظيمي ومعايير الحوكمة' },
];

export default function GccSection({ lang = 'en' }: GccSectionProps) {
  const isAr = lang === 'ar';

  return (
    <section
      data-nav-light="true"
      className="relative bg-[#F4F7FF]/40 text-[#0F172A] py-24 sm:py-32 border-b border-slate-200/80 overflow-hidden"
    >
      <div className="container-site max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2451BF] mb-2 block font-heading">
            {isAr ? 'التركيز الإقليمي' : 'REGIONAL FOCUS'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191D42] mb-4 font-heading">
            {isAr ? 'صُممت خصيصاً لاحتياجات الخليج' : 'Built for the GCC'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
            {isAr
              ? 'ندرك تماماً خصوصية أسواق الخليج وأولويات التحول الوطني؛ نربط المؤسسات بشركاء تدريب يفهمون الثقافة المؤسسية واللوائح التنظيمية في كل دولة.'
              : 'We understand the unique dynamics of the Gulf region. We connect enterprises with training partners who understand local business culture, national visions, and regional regulatory compliance.'}
          </p>
        </div>

        {/* Country Chips Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
          {GCC_COUNTRIES.map((country) => (
            <div
              key={country.code}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-xs sm:text-sm font-semibold text-slate-800 shadow-xs hover:border-[#2451BF]/40 transition-colors"
            >
              <MapPin size={14} className="text-[#2451BF]" />
              <span>{isAr ? country.nameAr : country.name}</span>
            </div>
          ))}
        </div>

        {/* Workforce Priorities Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6 text-center">
            {isAr ? 'أولويات الكفاءات المؤسسية التي نغطيها' : 'Regional Workforce Priorities We Address'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PRIORITIES.map((p) => (
              <div
                key={p.en}
                className="p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700"
              >
                <div className="w-2 h-2 rounded-full bg-[#3D7BFF] shrink-0" />
                <span>{isAr ? p.ar : p.en}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
