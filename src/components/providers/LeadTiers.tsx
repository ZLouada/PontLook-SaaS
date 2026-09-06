'use client';

import React from 'react';
import Link from 'next/link';

interface TierData {
  step: string;
  badge: string;
  title: string;
  description: string;
  project: string;
  accuracy: string;
  barColor: string;
  barWidth: string;
  checklist: string[];
  isCtaCard?: boolean;
}

const TIERS_EN: TierData[] = [
  {
    step: 'Step 1',
    badge: 'Hot · 95% Match',
    title: 'High-intent enterprise demand with confirmed budget',
    description: 'Verified decision-maker, confirmed budget, starts within 30 days.',
    project: 'Riyadh Enterprise · Project #01',
    accuracy: '95%',
    barColor: 'bg-blue-600',
    barWidth: 'w-[95%]',
    checklist: [
      'Verified Decision-Maker (CHRO)',
      'Confirmed Budget (SAR 300k+)',
      'Immediate 30-Day Window'
    ]
  },
  {
    step: 'Step 2',
    badge: 'Warm · 80% Match',
    title: 'Confirmed workforce pain; budget & timeline forming',
    description: 'Confirmed pain and authority; budget or timeline still forming. We stay engaged to pass the lead when ready.',
    project: 'Dubai Enterprise · Project #02',
    accuracy: '80%',
    barColor: 'bg-amber-500',
    barWidth: 'w-[80%]',
    checklist: [
      'Executive Authority Validated',
      '500+ Enterprise Workforce',
      'Budget Staged for Q3'
    ]
  },
  {
    step: 'Step 3',
    badge: 'Qualified · 60% Match',
    title: 'Genuine need verified; earlier in the buying journey',
    description: 'Genuine need verified; earlier in the buying journey.',
    project: 'Doha Enterprise · Project #03',
    accuracy: '60%',
    barColor: 'bg-blue-500',
    barWidth: 'w-[60%]',
    checklist: [
      'Strategic Training Need Identified',
      'Banking & Financial Sector',
      'Early Positioning Window'
    ]
  },
  {
    step: 'Step 4',
    badge: 'Partnership Model',
    title: 'Explore the partnership: Predictable enterprise client pipeline',
    description: 'Every lead is verified before introduction. Zero monthly retainers, 5-lead proof-of-concept pilot, and a 5-day replacement guarantee.',
    project: 'GCC Provider Partnership',
    accuracy: '100% Guaranteed',
    barColor: 'bg-emerald-500',
    barWidth: 'w-full',
    checklist: [
      'Pay-Per-Qualified-Lead ($0 Retainer)',
      'Direct Access to C-Suite & HR Directors',
      'Full Lead Intelligence Report Included'
    ],
    isCtaCard: true
  }
];

const TIERS_AR: TierData[] = [
  {
    step: 'المرحلة 1',
    badge: 'فرصة مؤكدة · دقة 95%',
    title: 'طلب مؤسسي عالي الأهمية بميزانية معتمدة',
    description: 'صانع قرار معتمد، ميزانية معتمدة، وتاريخ بدء خلال 30 يوماً.',
    project: 'مؤسسة في الرياض · فرصة #01',
    accuracy: '95%',
    barColor: 'bg-blue-600',
    barWidth: 'w-[95%]',
    checklist: [
      'صانع قرار معتمد (رئيس قطاع الموارد البشرية)',
      'ميزانية معتمدة (+300 ألف ريال)',
      'نافذة بدء فورية خلال 30 يوماً'
    ]
  },
  {
    step: 'المرحلة 2',
    badge: 'فرصة واعدة · دقة 80%',
    title: 'تحدي وظيفي مؤكد؛ الميزانية والجدول الزمني قيد الصياغة',
    description: 'تم التحقق من الاحتياج والصلاحية؛ الميزانية أو الجدول الزمني قيد الاعتماد.',
    project: 'مؤسسة في دبي · فرصة #02',
    accuracy: '80%',
    barColor: 'bg-amber-500',
    barWidth: 'w-[80%]',
    checklist: [
      'صلاحية القرار معتمدة',
      'فريق عمل مؤسسي يتجاوز 500 موظف',
      'ميزانية مخصصة للربع الثالث'
    ]
  },
  {
    step: 'المرحلة 3',
    badge: 'فرصة مبكرة · دقة 60%',
    title: 'احتياج تدريبي حقيقي في مرحلة التخطيط الأولي',
    description: 'احتياج حقيقي تم التحقق منه؛ في مرحلة مبكرة من رحلة الشراء والتعاقد.',
    project: 'مؤسسة في الدوحة · فرصة #03',
    accuracy: '60%',
    barColor: 'bg-blue-500',
    barWidth: 'w-[60%]',
    checklist: [
      'تحديد احتياج تدريبي استراتيجي',
      'قطاع البنوك والخدمات المالية',
      'نافذة تواصل مبكرة وبناء علاقة'
    ]
  },
  {
    step: 'المرحلة 4',
    badge: 'نموذج الشراكة',
    title: 'استكشف نموذج الشراكة: تدفق مستمر لفرص الشركات والمؤسسات',
    description: 'كل فرصة يتم التحقق منها قبل تقديمها. بدون رسوم شهرية ثابتة، تجربة قيادية لـ 5 فرص، وضمان استبدال الفرصة خلال 5 أيام.',
    project: 'شراكة مزودي التدريب في الخليج',
    accuracy: 'ضمان 100%',
    barColor: 'bg-emerald-500',
    barWidth: 'w-full',
    checklist: [
      'دفع لكل فرصة مؤهلة ($0 رسوم اشتراك)',
      'وصول مباشر لصناع القرار ورؤساء الموارد البشرية',
      'تقرير معلوماتي وتحليلي متكامل لكل فرصة'
    ],
    isCtaCard: true
  }
];

const CARD_CONFIGS = [
  {
    zIndexClass: 'z-10',
    spacingClass: 'mb-[25vh]',
    shadowClass: 'shadow-xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]'
  },
  {
    zIndexClass: 'z-20',
    spacingClass: 'mb-[25vh]',
    shadowClass: 'shadow-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]'
  },
  {
    zIndexClass: 'z-30',
    spacingClass: 'mb-[25vh]',
    shadowClass: 'shadow-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]'
  },
  {
    zIndexClass: 'z-40',
    spacingClass: '',
    shadowClass: 'shadow-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]'
  }
];

export default function LeadTiers(_props?: { dict?: any; lang?: string; showSignals?: boolean }) {
  const lang = _props?.lang || 'en';
  const isAr = lang === 'ar';
  const tiers = isAr ? TIERS_AR : TIERS_EN;

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight">
            {isAr ? 'تدفق متوقع لفرص الشركات والمؤسسات' : 'A predictable pipeline of enterprise opportunities'}
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            {isAr
              ? 'يتم تقييم كل فرصة بناءً على التحقق من صانع القرار، وحجم الشركة، والميزانية، والجدول الزمني، وعمق الاحتياج لتكون على دراية تامة بتفاصيل كل فرصة.'
              : "Every lead is scored on decision-maker verification, company size, budget, timeline, and depth of need, so you always know exactly what you're walking into."}
          </p>
        </div>

        {/* Sticky Stacked Cards Container */}
        <div className="relative max-w-5xl mx-auto pb-32">
          {tiers.map((tier, idx) => {
            const config = CARD_CONFIGS[idx] || CARD_CONFIGS[0];

            return (
              <div
                key={tier.step}
                className={`sticky top-28 ${config.zIndexClass} ${config.spacingClass} bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 ${config.shadowClass} transition-transform duration-200`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                        {tier.step}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {tier.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight leading-snug">
                      {tier.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="pt-2">
                      {tier.isCtaCard ? (
                        <Link
                          href={`/${lang}/for-providers#apply`}
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all"
                        >
                          {isAr ? 'قدم للانضمام إلى الشراكة ←' : 'Apply for partnership →'}
                        </Link>
                      ) : (
                        <Link
                          href={`/${lang}/for-providers#apply`}
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition-all"
                        >
                          {isAr ? 'استكشف نموذج الشراكة ←' : 'Explore the partnership →'}
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Preview Card */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 p-6 space-y-4">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase">
                        {tier.project}
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          <span>{isAr ? 'دقة التطابق' : 'Match Accuracy'}</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{tier.accuracy}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className={`h-full rounded-full ${tier.barColor} ${tier.barWidth}`} />
                        </div>
                      </div>

                      <ul className="space-y-2.5 pt-2 text-xs text-slate-700 dark:text-slate-300">
                        {tier.checklist.map((item, cIdx) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            <span className="flex-shrink-0 text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
