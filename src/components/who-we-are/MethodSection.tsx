'use client';

import React from 'react';
import { Check, Flame, Zap, ShieldCheck } from 'lucide-react';
import type { Locale } from '@/i18n/config';

interface MethodSectionProps {
  lang?: Locale;
}

export default function MethodSection({ lang = 'en' }: MethodSectionProps) {
  const isAr = lang === 'ar';

  const tiers = [
    {
      score: '90–100',
      grade: isAr ? 'جاهزية عالية (Hot)' : 'Hot Tier',
      badge: 'Tier A',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      icon: Flame,
      desc: isAr
        ? 'ميزانية مؤكدة، وصاحب قرار مباشر متفاعل، وجدول زمني محدد للتنفيذ الفوري.'
        : 'Confirmed budget, direct decision-maker engaged, and immediate execution timeline.',
    },
    {
      score: '70–89',
      grade: isAr ? 'جاهزية واعدة (Warm)' : 'Warm Tier',
      badge: 'Tier B',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: Zap,
      desc: isAr
        ? 'تحدي كفاءات مشخص، وميزانية قيد الموافقة النهائية، وجدول زمني خلال الربع الحالي.'
        : 'Diagnosed capability gap, budget in final approval, and timeline within current quarter.',
    },
    {
      score: '50–69',
      grade: isAr ? 'فرصة مؤهلة (Qualified)' : 'Qualified Tier',
      badge: 'Tier C',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: ShieldCheck,
      desc: isAr
        ? 'احتياج تدريبي موثق، والتواصل جارٍ لتأكيد مواعيد الجلسات الاستكشافية.'
        : 'Documented training need with active discovery underway for timeline confirmation.',
    },
  ];

  const bullets = [
    isAr ? 'التحقق من تحديات العمل الفعلية' : 'Business pain verification',
    isAr ? 'توثيق هوية صاحب القرار والمشرفين' : 'Decision-maker validation',
    isAr ? 'إشارات الميزانية والجدول الزمني' : 'Budget and timeline signals',
    isAr ? 'دفع لكل فرصة مؤهلة فقط' : 'Pay-per-qualified-lead model',
    isAr ? 'بدون اشتراكات شهرية أو عقود احتكار' : 'Zero monthly retainers',
    isAr ? 'تخصص إقليمي حصري لدول الخليج' : 'GCC regional specialization',
  ];

  return (
    <section
      id="our-method"
      data-nav-light="true"
      className="relative bg-white text-[#0F172A] py-24 sm:py-32 border-b border-slate-100 overflow-hidden"
    >
      <div className="container-site max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2451BF] mb-2 block font-heading">
            {isAr ? 'منهجية التأهيل والتقييم' : 'OUR QUALIFICATION METHOD'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#191D42] mb-4 font-heading">
            {isAr ? 'منهجية تأهيل يمكنك الوثوق بها' : 'A qualification method you can trust'}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {isAr
              ? 'كل فرصة تدريبية تخضع لتصنيف صارم وموثق قبل تقديمها للمزودين.'
              : 'Every opportunity is rigorously graded and verified before introduction to providers.'}
          </p>
        </div>

        {/* 3 Qualification Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.grade}
                className="bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${tier.badgeColor}`}>
                      {tier.badge}
                    </span>
                    <Icon size={18} className="text-slate-500" />
                  </div>

                  <div className="text-2xl font-bold text-[#191D42] mb-1 font-heading">
                    {tier.score}
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 mb-3">
                    {tier.grade}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {tier.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Trust Bullets Grid */}
        <div className="bg-[#F4F7FF]/60 border border-blue-200/60 rounded-2xl p-6 sm:p-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2451BF] mb-4 text-center">
            {isAr ? 'معايير التحقق الثابتة لكل فرصة' : 'Standard Verification Safeguards'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {bullets.map((b) => (
              <div key={b} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
                <div className="w-5 h-5 rounded-full bg-[#2451BF]/10 text-[#2451BF] flex items-center justify-center shrink-0">
                  <Check size={12} className="stroke-[3]" />
                </div>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
