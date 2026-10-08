'use client';

import React from 'react';

interface ProviderProtocolBreakdownProps {
  isAr?: boolean;
}

export default function ProviderProtocolBreakdown({
  isAr = false,
}: ProviderProtocolBreakdownProps) {
  const phases = [
    {
      phase: '01',
      code: 'SYS.SIGNAL_EXTRACTION',
      titleEn: 'Regulatory & Workforce Signal Extraction',
      titleAr: 'رصد المؤشرات التنظيمية والتحديات المهارية',
      taglineEn: 'Real-time telemetry across GCC enterprise mandates',
      taglineAr: 'رصد حي ومباشر للمتطلبات واللوائح في كبرى منشآت الخليج',
      descEn:
        'Continuous intelligence monitoring across 1,400+ GCC enterprises. We track Nitaqat Saudization tier shifts (Platinum & High-Green mandates), Tawteen Emiratization quotas, HRDF/Hadaf subsidy allocation cycles, and SAMA/CBUAE governance audits to identify authentic corporate training demand before RFPs go public.',
      descAr:
        'رصد استخباراتي مستمر لأكثر من 1400 منشأة كبرى في الخليج. نتتبع تحولات نطاقات التوطين، ونسب التوطين الإلزامية، ودورات دعم صندوق الموارد البشرية "هدف"، ومتطلبات الامتثال المصرفي لـ "ساما" ومصرف الإمارات المركزي لتحديد الاحتياجات التدريبية الحقيقية قبل طرحها للمنافسات العامة.',
      chips: isAr
        ? [
            'مخصصات صندوق "هدف"',
            'معايير نطاقات التوطين',
            'حوكمة ساما والمصرف المركزي',
            'خطط إحلال القيادات',
          ]
        : [
            'HRDF / HADAF ALLOCATIONS',
            'NITAQAT SAUDIZATION TIERS',
            'SAMA / CBUAE GOVERNANCE',
            'TAWTEEN LOCALIZATION QUOTAS',
          ],
      telemetry: isAr
        ? 'المدخلات: رصد 1,400+ منشأة خليجية · تصفية الاحتياج الحقيقي'
        : 'INPUT: 1,400+ GCC MONITORED CORPS · RAW SIGNALS AUDITED',
      badgeColor: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
    },
    {
      phase: '02',
      code: 'SYS.BANT_VERIFICATION',
      titleEn: 'Economic Buyer Validation & BANT Audit',
      titleAr: 'التحقق من الميزانية واعتماد صاحب القرار',
      taglineEn: 'Strict verification with C-level budget holders',
      taglineAr: 'تدقيق مباشر وصارم مع الرؤساء التنفيذيين ومديري الموارد البشرية',
      descEn:
        'Zero speculative lists or gatekeeper screenings. Every lead is audited via direct corporate email and telephone qualification with the economic buyer—CHRO, VP of Human Capital, or Chief Learning Officer. We confirm funded budget authority (SAR 150K–850K+), deployment urgency (<30-60 days), and exact cohort scope.',
      descAr:
        'لا قوائم تقديرية ولا وسطاء استكشافيين. كل فرصة تخضع لتدقيق مباشر عبر البريد الإلكتروني المؤسسي والهاتف مع أصحاب القرار التنفيذيين (رؤساء الموارد البشرية وكبار مسؤولي التدريب). نتحقق من جاهزية الميزانية المعتمدة (150 إلى 850 ألف ريال)، ونافذة التنفيذ، ونطاق المتدربين.',
      chips: isAr
        ? [
            'اعتماد صانع القرار التنفيذي',
            'ميزانية معتمدة 150 ألف ر.س+',
            'نافذة تنفيذ أقل من 30-60 يوماً',
            'استبعاد تام للمتدربين والوسطاء',
          ]
        : [
            'CHRO / C-SUITE SIGN-OFF',
            'CONFIRMED BUDGET SAR 150K+',
            'EXECUTION WINDOW <30-60 DAYS',
            'ZERO GATEKEEPER NOISE',
          ],
      telemetry: isAr
        ? 'بوابة التدقيق: مطابقة BANT معتمدة 100% · ضمان الاستبدال الفوري'
        : 'GATE: 100% BANT SIGN-OFF · ZERO-RISK REPLACEMENT SLA',
      badgeColor: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    },
    {
      phase: '03',
      code: 'SYS.DOMAIN_DISPATCH',
      titleEn: 'Exclusive Domain Matching & Direct Dispatch',
      titleAr: 'التوجيه الحصري المتخصص والربط المباشر',
      taglineEn: 'Curated 1-on-1 routing with zero price commoditization',
      taglineAr: 'توجيه مباشر ومنظم بدون مزادات استنزافية للأسعار',
      descEn:
        'Verified corporate opportunities are dispatched strictly to accredited providers specializing in the exact required domain (Executive Leadership, SAMA Banking Compliance, AI Literacy, Technical Upskilling). No open bidding wars. A maximum of 2–3 elite providers are introduced directly into the buyer’s calendar.',
      descAr:
        'يتم توجيه الفرص المؤكدة حصرياً للمزودين المعتمدين المتخصصين في المجال الدقيق المطلوب (القيادة التنفيذية، الامتثال المصرفي، مهارات الذكاء الاصطناعي، الكفاءات الفنية). بدون مناقصات استنزافية للأسعار، وبحد أقصى مزودين أو ثلاثة نخبة يتم ربطهم مباشرة بجدول العميل.',
      chips: isAr
        ? [
            'ربط تقويمي مباشر 1-إلى-1',
            'توزيع حصري لمزودين محددين',
            'سرعة التوجيه أقل من 72 ساعة',
            'احتفاظ بنسبة 100% من عوائد التدريب',
          ]
        : [
            'DIRECT 1-ON-1 CALENDAR INTRO',
            'MAX 2-3 MATCHED PROVIDERS',
            '<72H DISPATCH LATENCY',
            'KEEP 100% OF TRAINING REVENUE',
          ],
      telemetry: isAr
        ? 'سرعة الربط: إحالة مباشرة خلال 72 ساعة لجدول صانع القرار'
        : 'DISPATCH SLA: <72 HOURS DIRECT CALENDAR INTRODUCTION',
      badgeColor: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
    },
  ];

  return (
    <section id="protocol-breakdown" className="w-full bg-[#07090E] py-16 sm:py-24 relative z-10 scroll-mt-24">
      <div className="container-site max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-sky-400/20 bg-sky-400/5 font-mono text-[11px] text-sky-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>{isAr ? 'بروتوكول التحقق والربط المؤسسي' : 'ENTERPRISE MATCHMAKING ARCHITECTURE'}</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12]">
            {isAr ? (
              <>
                كيف يعمل محرك بونت لوك. <br />
                <span className="text-slate-400">توجيه مؤسسي دقيق خطوة بخطوة.</span>
              </>
            ) : (
              <>
                The Verification & Routing Protocol. <br />
                <span className="text-slate-400">Step-by-step institutional intelligence.</span>
              </>
            )}
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {isAr
              ? 'نلغي جهود المبيعات الباردة والاستنزاف التسويقي. نظامنا يرصد متطلبات منشآت الخليج، ويدقق ميزانيات صناع القرار، ويوجه الفرص المؤكدة مباشرة إلى مراكز التدريب المؤهلة.'
              : 'We eliminate cold calling and commoditized RFP portals. Our system monitors regional enterprise demand, verifies C-level budget allocations, and routes pre-scoped opportunities directly to specialized training providers.'}
          </p>
        </div>

        {/* 3-Column Architecture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {phases.map((p) => (
            <div
              key={p.phase}
              className="bg-[#0C1018] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative group hover:border-sky-400/40 hover:bg-[#101522] transition-all"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-2 start-2 font-mono text-[10px] text-slate-600 select-none">
                +
              </div>
              <div className="absolute top-2 end-2 font-mono text-[10px] text-slate-600 select-none">
                +
              </div>

              <div>
                {/* Phase Badge & Code */}
                <div className="flex items-center justify-between font-mono text-xs mb-4">
                  <span className={`px-2 py-0.5 border text-[11px] font-semibold ${p.badgeColor}`}>
                    PHASE {p.phase}
                  </span>
                  <span className="text-slate-500 text-[10px]">{p.code}</span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {isAr ? p.titleAr : p.titleEn}
                </h3>

                <div className="font-mono text-[11px] text-sky-300 mt-1 mb-4">
                  {isAr ? p.taglineAr : p.taglineEn}
                </div>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isAr ? p.descAr : p.descEn}
                </p>

                {/* Technical Signal Chips */}
                <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-1.5">
                  {p.chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/5 border border-white/10 font-mono text-[10px] text-slate-300"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Monospace Telemetry Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-slate-400">
                <span className="text-emerald-400">▶ </span>
                <span>{p.telemetry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
