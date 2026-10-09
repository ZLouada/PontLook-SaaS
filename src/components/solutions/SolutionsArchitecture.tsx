'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, ShieldCheck, Sparkles, Handshake, ArrowRight } from '@/components/icons';

interface SolutionsArchitectureProps {
  lang: string;
  isAr: boolean;
}

export default function SolutionsArchitecture({ lang, isAr }: SolutionsArchitectureProps) {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: '01',
      code: 'PHASE // INTAKE & TNA',
      titleEn: 'Precision Skill & Budget Intake',
      titleAr: 'تشخيص الاحتياج والتدقيق المالي',
      descEn:
        'The enterprise submits their core training gap through a 60-second structured intake. Our advisory team verifies organizational funding, headcount, timeline, and delivery requirements.',
      descAr:
        'تطرح المنشأة تحديها المهاري عبر نموذج تشخيص منظم في 60 ثانية. يقوم فريقنا بتدقيق ميزانية التدريب المعتمدة، حجم الفريق المستهدف، والجدول الزمني المعتمد.',
      specsEn: [
        'Structured Training Needs Analysis (TNA)',
        'Budget commitment verification (SAR 100k+)',
        'Format specification (Onsite, Hybrid, Virtual)',
      ],
      specsAr: [
        'تحليل الاحتياج التدريبي المؤسسي (TNA)',
        'تدقيق الاعتماد المالي التنفيذي (١٠٠ ألف ريال فما فوق)',
        'تحديد نمط التدريب (حضوري، مدمج، أو افتراضي)',
      ],
    },
    {
      num: '02',
      code: 'PHASE // DUAL VERIFICATION',
      titleEn: 'Double-Blind Accreditation Audit',
      titleAr: 'التدقيق والاعتماد الثنائي',
      descEn:
        'Both sides undergo strict verification. Training providers are audited for regional accreditation (TVTC / KHDA / international bodies), while enterprise buyers remain protected by complete anonymity.',
      descAr:
        'يخضع الطرفان لمعايير تدقيق صارمة. نتحقق من اعتمادات معاهد التدريب (TVTC، KHDA، والشهادات الدولية)، وتبقى بيانات المنشأة محمية ومجهولة الهوية حتى موافقتها.',
      specsEn: [
        'Accreditation & Trainer pedigree check',
        'Enterprise anonymity & NDA preservation',
        'Direct CHRO/L&D authority validation',
      ],
      specsAr: [
        'فحص اعتمادات المعهد وسيرة المدربين الذاتية',
        'حماية سرية المنشأة واتفاقيات عدم الإفصاح',
        'التحقق من الصلاحيات التنفيذية لصناع القرار',
      ],
    },
    {
      num: '03',
      code: 'PHASE // CURATED MATCH',
      titleEn: 'Bespoke 3-Proposal Shortlist',
      titleAr: 'تصفية واختيار أفضل ٣ عروض',
      descEn:
        'Within 48 hours, our bilateral matchmaking algorithm and domain specialists deliver exactly 3 tailored proposals that precisely fit the brief, budget, and cultural context.',
      descAr:
        'خلال 48 ساعة فقط، يقوم محرك المطابقة وفريق الخبراء باختيار 3 عروض تدريبية مفصلة تتطابق تماماً مع أهداف المنشأة وميزانيتها وطبيعة بيئة العمل الخليجية.',
      specsEn: [
        'Guaranteed 48-hour delivery SLA',
        'Max 3 curated offers to prevent review overload',
        'Tailored pricing and course customization',
      ],
      specsAr: [
        'التزام تسليم صارم خلال ٤٨ ساعة فقط',
        '٣ عروض منتقاة بدقة لتفادي التشتت والإرهاق',
        'أسعار مخصصة ومناهج مصممة حسب التحدي',
      ],
    },
    {
      num: '04',
      code: 'PHASE // DIRECT EXECUTION',
      titleEn: 'Direct Contracting with Zero Markup',
      titleAr: 'التعاقد والتنفيذ المباشر',
      descEn:
        'Organizations and training providers connect directly to finalize contracts. PontLook takes zero commission cut from the training delivery, ensuring 100% of budget reaches educational impact.',
      descAr:
        'تتواصل المنشأة ومزود التدريب مباشرة لتوقيع العقود وبدء التدريب. لا تقتطع PontLook أي نسبة من ميزانية التدريب، لضمان استثمار كل ريال في تطوير الكوادر.',
      specsEn: [
        'Direct relationship without intermediary gatekeeping',
        'Zero commission on delivery invoice',
        'Post-training impact review & satisfaction guarantee',
      ],
      specsAr: [
        'علاقة مباشرة بين الطرفين بدون تدخل الوسطاء',
        'صفر عمولة على فواتير التدريب والتنفيذ',
        'تقييم أثر التدريب وضمان الجودة بعد الإنجاز',
      ],
    },
  ];

  return (
    <section id="architecture" className="py-20 sm:py-28 lg:py-32 border-b border-white/10 bg-black relative">
      <div className="container-site max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
            {isAr ? 'هندسة المطابقة وآلية التشغيل' : 'MATCHMAKING ENGINE ARCHITECTURE'}
          </div>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
            {isAr
              ? '٤ مراحل دقيقة تضمن أعلى جودة للمطابقة'
              : 'The 4-Stage Bilateral Matching Protocol'}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            {isAr
              ? 'نظام تشغيلي مصمم بعناية ليقضي على الهدر الزمني والمخاطر المالية، ويضمن أن كل مشروع تدريبي يستند إلى احتياج حقيقي ومزود معتمد.'
              : 'An audited operating workflow designed to eliminate speculative waste, ensure verified executive sponsorship, and execute high-impact training cohorts without delay.'}
          </p>
        </div>

        {/* Interactive Stages Navigator */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Stage Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {stages.map((stg, idx) => {
              const isSelected = activeStage === idx;
              return (
                <button
                  key={stg.num}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`w-full text-start p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-white bg-white/10 text-white shadow-lg'
                      : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-neutral-400">
                      {stg.code}
                    </span>
                    <span
                      className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white text-black font-bold' : 'bg-white/10 text-neutral-400'
                      }`}
                    >
                      {stg.num}
                    </span>
                  </div>
                  <div className="mt-2 text-base sm:text-lg font-heading font-semibold text-white">
                    {isAr ? stg.titleAr : stg.titleEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Display Panel */}
          <div className="lg:col-span-7 rounded-2xl border border-white/20 bg-[#0A0B0D] p-6 sm:p-10 relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                {stages[activeStage].code}
              </span>
              <span className="font-mono text-xs text-neutral-400">
                {isAr ? `المرحلة ${stages[activeStage].num} من ٤` : `Stage ${stages[activeStage].num} of 4`}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
                {isAr ? stages[activeStage].titleAr : stages[activeStage].titleEn}
              </h3>
              <p className="text-base text-neutral-300 leading-relaxed font-normal">
                {isAr ? stages[activeStage].descAr : stages[activeStage].descEn}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                {isAr ? 'معايير التحقق والضمان:' : 'Execution Protocols & Guarantees:'}
              </span>
              {(isAr ? stages[activeStage].specsAr : stages[activeStage].specsEn).map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-3 text-sm text-neutral-200">
                  <div className="h-2 w-2 rounded-full bg-white shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
