'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CountryData, CityData } from '@/data/geoData';

interface CityBudgetCalculatorProps {
  country: CountryData;
  city: CityData;
  lang: 'en' | 'ar';
}

const COHORT_OPTIONS = [
  { id: 'executive', nameEn: 'Executive Board / C-Suite (5 - 10 Leaders)', nameAr: 'الإدارة العليا / المجلس (5 - 10 قادة)', multiplier: 1.0 },
  { id: 'management', nameEn: 'Mid-Senior Management (10 - 25 Managers)', nameAr: 'الإدارة الوسطى (10 - 25 مديراً)', multiplier: 1.6 },
  { id: 'division', nameEn: 'Departmental Cohort (25 - 50+ Professionals)', nameAr: 'قطاع مؤسسي كامل (25 - 50+ موظفاً)', multiplier: 2.5 },
];

export default function CityBudgetCalculator({ country, city, lang }: CityBudgetCalculatorProps) {
  const isAr = lang === 'ar';
  const [selectedCohort, setSelectedCohort] = useState(0);

  // Base tier values in local currency
  const baseRate = country.code === 'us' ? 12000 : country.code === 'uk' ? 9500 : country.code === 'au' ? 15000 : country.code === 'sa' ? 45000 : 40000;
  const currentMultiplier = COHORT_OPTIONS[selectedCohort].multiplier;
  const estimatedMin = Math.round(baseRate * currentMultiplier * 0.85);
  const estimatedMax = Math.round(baseRate * currentMultiplier * 1.35);

  return (
    <div className="rounded-3xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#26282D]">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-neutral-300 mb-3">
            <span>{isAr ? 'حاسبة الميزانية المؤسسية التقديرية' : 'Corporate Budget Estimator'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white font-heading">
            {isAr
              ? `تقدير استثمار التدريب في ${city.nameAr}`
              : `Training Investment Benchmark for ${city.nameEn}`}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {isAr
              ? `عروض تنافسية مباشرة بالعملة المحلية (${country.currency}) بدون هوامش وساطة.`
              : `Direct competitive proposals in local currency (${country.currency}) with zero broker markup.`}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#16171B] p-1.5 rounded-2xl border border-[#26282D] self-start lg:self-auto">
          <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-xl bg-white/[0.08] text-white border border-white/10">
            {country.currency}
          </span>
          <span className="text-xs text-neutral-400 px-2 font-mono">
            {country.currencyNameEn}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        {/* Cohort Selector */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
            {isAr ? 'اختر حجم الدفعة التدريبية:' : 'Select Target Cohort Size:'}
          </span>
          <div className="space-y-2.5">
            {COHORT_OPTIONS.map((opt, idx) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedCohort(idx)}
                className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl text-start text-xs sm:text-sm transition-all duration-200 border ${
                  selectedCohort === idx
                    ? 'bg-white/[0.05] border-white/30 text-white'
                    : 'bg-transparent border-[#26282D] text-neutral-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selectedCohort === idx ? 'border-white bg-white' : 'border-neutral-600'
                    }`}
                  >
                    {selectedCohort === idx && <div className="w-1.5 h-1.5 rounded-full bg-[#08090A]" />}
                  </div>
                  <span className="font-medium">{isAr ? opt.nameAr : opt.nameEn}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
              {isAr ? 'عروض معتمدة من 3 أكاديميات' : '3 Verified Academy Bids'}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0" />
              {isAr ? 'استجابة خلال 48 ساعة' : '48-Hour Response SLA'}
            </span>
          </div>
        </div>

        {/* Estimation Output Card */}
        <div className="lg:col-span-5 bg-[#16171B] border border-[#26282D] rounded-2xl p-6 text-center space-y-4">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
            {isAr ? 'متوسط نطاق الميزانية المقترح' : 'Benchmark Investment Range'}
          </span>
          <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading tracking-tight">
            {country.currencySymbol} {estimatedMin.toLocaleString()} – {estimatedMax.toLocaleString()}
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {isAr
              ? `يشمل تقييم الاحتياجات، والمواد التدريبية، والتنفيذ الحضوري في ${city.nameAr}، وتقارير أثر التدريب.`
              : `Includes needs assessment, bespoke curriculum, on-site facilitation in ${city.nameEn}, and post-training impact evaluation.`}
          </p>
          <div className="pt-2">
            <Link
              href={`/${lang}/find-training`}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-medium text-xs sm:text-sm border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-sm active:scale-[0.98] transition-all duration-200 group sheen"
            >
              <span>{isAr ? 'طلب عروض أسعار دقيقة مجاناً' : 'Request Exact Bids for Free'}</span>
              <ArrowRight size={15} className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
