'use client';

import React, { useState } from 'react';
import { Check, X, ShieldCheck, Target, Sparkles, SlidersHorizontal, Scale } from '@/components/icons';

interface SolutionsBreakdownProps {
  lang: string;
  isAr: boolean;
}

export default function SolutionsBreakdown({ lang, isAr }: SolutionsBreakdownProps) {
  const comparisonItems = [
    {
      featureEn: 'Time to Curated Proposals',
      featureAr: 'المدة الزمنية لاستلام العروض',
      directoriesEn: '3 – 6 weeks of manual search',
      directoriesAr: '٣ - ٦ أسابيع من البحث اليدوي',
      brokersEn: '4 – 8 weeks of negotiations',
      brokersAr: '٤ - ٨ أسابيع من المفاوضات',
      pontlookEn: '48 hours (exact 3 proposals)',
      pontlookAr: '٤٨ ساعة (٣ عروض محددة بدقة)',
    },
    {
      featureEn: 'Cost for Enterprise Buyers',
      featureAr: 'التكلفة على المنشآت الطالبة للتدريب',
      directoriesEn: 'Subscription or paywall fees',
      directoriesAr: 'اشتراكات مدفوعة أو وصول مقيد',
      brokersEn: '25% – 35% commission markup',
      brokersAr: 'عمولة وسيط بين ٢٥٪ إلى ٣٥٪',
      pontlookEn: '100% Free for buyers (Zero markup)',
      pontlookAr: 'مجاني ١٠٠٪ بدون أي هوامش مضافة',
    },
    {
      featureEn: 'Provider Pricing Model',
      featureAr: 'نموذج التكلفة لمزودي التدريب',
      directoriesEn: 'Upfront directory listing fees',
      directoriesAr: 'رسوم سنوية باهظة للإدراج بالدليل',
      brokersEn: 'High monthly retainers (No ROI guarantee)',
      brokersAr: 'اشتراك شهري مرتفع بدون ضمان عائد',
      pontlookEn: 'Zero retainer · 100% Pay per qualified lead',
      pontlookAr: 'بدون اشتراك · دفع فقط عند نتائج مؤهلة',
    },
    {
      featureEn: 'Budget & Decision Maker Verification',
      featureAr: 'التحقق من الميزانية وسلطة القرار',
      directoriesEn: 'Zero verification (Spam risk)',
      directoriesAr: 'لا يوجد أي تحقق (مخاطرة إزعاج)',
      brokersEn: 'Inconsistent manual screening',
      brokersAr: 'فحص يدوي غير منتظم',
      pontlookEn: 'Pre-verified CHRO & confirmed budgets',
      pontlookAr: 'تحقق مسبق من صناع القرار والميزانيات',
    },
    {
      featureEn: 'GCC Regulatory Compliance',
      featureAr: 'المواءمة التنظيمية الخليجية (توطين / TVTC)',
      directoriesEn: 'Generic international catalogs',
      directoriesAr: 'كتالوجات دولية عامة غير متوافقة',
      brokersEn: 'Ad-hoc, varies by rep',
      brokersAr: 'عشوائي يختلف حسب مسؤول الوساطة',
      pontlookEn: 'Full TVTC, Nitaqat & Nafis alignment',
      pontlookAr: 'مواءمة تامة مع مستهدفات التوطين والاعتمادات',
    },
  ];

  return (
    <section className="py-20 sm:py-28 lg:py-32 border-b border-white/10 bg-black relative">
      <div className="container-site max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
            {isAr ? 'المشكلة والحل الجذري' : 'THE COORDINATION BREAKDOWN'}
          </div>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
            {isAr
              ? 'لماذا تفشل النماذج التقليدية في شراء التدريب المؤسسي؟'
              : 'Why Traditional Corporate Training Procurement Breaks Down'}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {isAr
              ? 'تعتمد السوق التقليدية إما على أدلة اتصال قديمة تستهلك وقت مديري الموارد البشرية، أو على وكلاء يفرضون هوامش ربح ضخمة. صُممت PontLook لتكون طبقة المطابقة المباشرة والذكية.'
              : 'The legacy market relies on uncurated directories that cause search fatigue, or agency brokers who inflate costs. PontLook re-engineers the transaction as an open, bilateral matchmaking layer.'}
          </p>
        </div>

        {/* 3 Core Dilemma Cards */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1 */}
          <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0B0D] space-y-3">
            <span className="font-mono text-xs text-neutral-400 block">DILEMMA // 01</span>
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">
              {isAr ? 'إرهاق البحث والتصفح' : 'Vendor Search Fatigue'}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {isAr
                ? 'يقضي قادة التدريب أسابيع في غربلة مئات الكتالوجات العامة بدون معرفة كفاءة المدرب الحقيقي في بيئة العمل الخليجية.'
                : 'L&D teams spend weeks scrolling directories, sorting through unverified credentials and outdated generic course catalogs.'}
            </p>
          </div>

          {/* Box 2 */}
          <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0B0D] space-y-3">
            <span className="font-mono text-xs text-neutral-400 block">DILEMMA // 02</span>
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">
              {isAr ? 'عمولات الوساطة وهوامش الربح' : 'Broker Markup & Lock-in'}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {isAr
                ? 'يقتطع الوسطاء التقليديون حتى 35% من ميزانية التدريب كعمولة وسيط، مما يقلل من جودة التنفيذ ويشعل الأسعار.'
                : 'Placement agencies add steep 25–35% markups that eat into training budgets while shielding clients from direct trainer engagement.'}
            </p>
          </div>

          {/* Box 3 */}
          <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0A0B0D] space-y-3">
            <span className="font-mono text-xs text-neutral-400 block">DILEMMA // 03</span>
            <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">
              {isAr ? 'مخاطرة التسويق والمكالمات الباردة' : 'Speculative Sales Waste'}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {isAr
                ? 'يهدر أفضل مزودي التدريب حتى 70% من وقتهم في مطاردة عملاء بدون ميزانية مؤكدة أو دفع اشتراكات شهرية بدون عائد.'
                : 'Elite academies waste up to 70% of their bandwidth pitching unresponsive gatekeepers and paying upfront listing fees with no conversion guarantee.'}
            </p>
          </div>
        </div>

        {/* Detailed Comparison Matrix Table */}
        <div className="mt-16 sm:mt-20">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              {isAr ? 'مقارنة الحلول: النماذج القديمة مقابل PontLook' : 'The Benchmark Matrix: Legacy vs PontLook'}
            </h3>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline-block">
              {isAr ? 'مقارنة حيادية مبنية على القيمة' : 'Objective Performance Breakdown'}
            </span>
          </div>

          <div className="overflow-x-auto border border-white/20 rounded-2xl bg-[#090A0D]">
            <table className="w-full text-start text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15 bg-white/[0.03] text-neutral-300 font-mono text-[11px] sm:text-xs">
                  <th className="p-4 sm:p-5 font-semibold text-start w-1/4">
                    {isAr ? 'المعيار' : 'Dimension'}
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-start w-1/4 text-neutral-400">
                    {isAr ? 'الأدلة وقوائم المزودين' : 'Vendor Directories'}
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-start w-1/4 text-neutral-400">
                    {isAr ? 'وكلاء ومكاتب الوساطة' : 'Agency Brokers'}
                  </th>
                  <th className="p-4 sm:p-5 font-bold text-start w-1/4 bg-white/[0.08] text-white">
                    <span className="flex items-center gap-1.5 text-white">
                      <Sparkles size={13} className="text-white" />
                      PontLook Solution
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-neutral-300">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-white">
                      {isAr ? item.featureAr : item.featureEn}
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      {isAr ? item.directoriesAr : item.directoriesEn}
                    </td>
                    <td className="p-4 sm:p-5 text-neutral-400">
                      {isAr ? item.brokersAr : item.brokersEn}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-white bg-white/[0.05]">
                      <div className="flex items-center gap-2">
                        <Check size={14} className="text-white shrink-0" />
                        <span>{isAr ? item.pontlookAr : item.pontlookEn}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
