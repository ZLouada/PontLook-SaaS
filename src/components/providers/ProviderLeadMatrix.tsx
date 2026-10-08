'use client';

import React from 'react';

interface ProviderLeadMatrixProps {
  isAr?: boolean;
}

export default function ProviderLeadMatrix({ isAr = false }: ProviderLeadMatrixProps) {
  const rows = [
    {
      dimensionEn: 'Readiness Timeline',
      dimensionAr: 'نافذة الجاهزية والتنفيذ',
      code: 'DIM_01',
      tier1En: 'Immediate 30-Day Window · Live RFP active',
      tier1Ar: 'نافذة فورية خلال 30 يوماً · كراسة شروط معتمدة',
      tier2En: 'Active Need · Budget staged for Q3 / Q4 (<60–90 days)',
      tier2Ar: 'احتياج نشط · ميزانية مجدولة للربع القادم (60-90 يوماً)',
      disqualifiedEn: 'Unspecified timeline / Idle inquiry ("sometime next year")',
      disqualifiedAr: 'موعد غير محدد / استفسار عام ("ربما العام القادم")',
    },
    {
      dimensionEn: 'Budget Verification',
      dimensionAr: 'اعتماد الميزانية والتمويل',
      code: 'DIM_02',
      tier1En: 'SAR 250K–850K+ · Approved & allocated funds',
      tier1Ar: '250,000 إلى 850,000+ ر.س · ميزانية معتمدة ومخصصة',
      tier2En: 'SAR 120K–250K · Fiscal plan approved, finalizing tier',
      tier2Ar: '120,000 إلى 250,000 ر.س · خطة معتمدة بانتظار العروض',
      disqualifiedEn: 'Unfunded / Zero designated budget / "Looking for free pilots"',
      disqualifiedAr: 'بدون تمويل مخصص / "نبحث عن ورش عمل تجريبية مجانية"',
    },
    {
      dimensionEn: 'Decision Maker Sponsor',
      dimensionAr: 'صفة صانع القرار والراعي',
      code: 'DIM_03',
      tier1En: 'CHRO / VP Human Capital / Chief Learning Officer direct',
      tier1Ar: 'رئيس الموارد البشرية / نائب الرئيس للتطوير المؤسسي مباشرة',
      tier2En: 'L&D Director / Talent Committee Sponsor verified',
      tier2Ar: 'مدير التدريب والتطوير / راعي لجنة المواهب موثق',
      disqualifiedEn: 'Junior HR coordinator / intern / general info email inquiry',
      disqualifiedAr: 'منسق موارد بشرية مبتدئ / متدرب / بريد عام بدون سلطة',
    },
    {
      dimensionEn: 'Compliance & Regulatory Driver',
      dimensionAr: 'المحفز التنظيمي والتشريعي',
      code: 'DIM_04',
      tier1En: 'Tied to HRDF / Hadaf subsidy or SAMA/CBUAE mandate',
      tier1Ar: 'مرتبط بدعم صندوق "هدف" أو اشتراطات ساما والمصرف المركزي',
      tier2En: 'Mandatory Nitaqat Saudization or Strategic KPI retention',
      tier2Ar: 'متطلبات توطين نيتاقات أو أهداف استراتيجية للحفاظ على الكفاءات',
      disqualifiedEn: 'No regulatory driver, no business accountability or sponsor',
      disqualifiedAr: 'لا متطلب تنظيمي ولا مسؤولية أعمال تنفيذية محددة',
    },
    {
      dimensionEn: 'Dispatch Protocol',
      dimensionAr: 'بروتوكول التوجيه والربط',
      code: 'DIM_05',
      tier1En: 'Instant 1-on-1 direct calendar introduction (<72 hrs)',
      tier1Ar: 'ربط مباشر وفوري بجدول صانع القرار (أقل من 72 ساعة)',
      tier2En: 'Curated technical brief & structured vendor shortlist',
      tier2Ar: 'ملخص متطلبات فني وتوجيه لقائمة مختصرة منتقاة',
      disqualifiedEn: 'REJECTED: Automatically filtered out by audit engine',
      disqualifiedAr: 'مستبعدة: استبعاد آلي عبر محرك التدقيق والتحقق',
    },
    {
      dimensionEn: 'Quality SLA Guarantee',
      dimensionAr: 'ضمان الجودة والاستبدال',
      code: 'DIM_06',
      tier1En: '100% Instant Lead Replacement if criteria fail audit',
      tier1Ar: 'استبدال فوري 100% في حال عدم مطابقة أي معيار',
      tier2En: '100% Instant Lead Replacement if criteria fail audit',
      tier2Ar: 'استبدال فوري 100% في حال عدم مطابقة أي معيار',
      disqualifiedEn: 'N/A (Never reaches provider network)',
      disqualifiedAr: 'لا ينطبق (لا تصل نهائياً لشبكة المزودين)',
    },
  ];

  return (
    <section id="lead-matrix" className="w-full bg-[#05070D] py-16 sm:py-24 border-t border-white/10 relative z-10 scroll-mt-24">
      <div className="container-site max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-emerald-400/20 bg-emerald-400/5 font-mono text-[11px] text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{isAr ? 'مصفوفة تصنيف الفرص التدريبية' : 'LEAD TAXONOMY & GRADING MATRIX'}</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.12]">
            {isAr ? (
              <>
                معايير الفرز والتقييم المؤسسي. <br />
                <span className="text-slate-400">فصل الفرص الجادة عن الاستفسارات الباردة.</span>
              </>
            ) : (
              <>
                Institutional Lead Taxonomy Matrix. <br />
                <span className="text-slate-400">Strict technical grading protocol.</span>
              </>
            )}
          </h2>

          <p className="mt-4 font-sans text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {isAr
              ? 'كل فرصة تصلك تكون مفروزة ومحددة بدقة. لن تضيع وقتك في متابعة جهات غير ممولة أو متدربين يستكشفون السوق.'
              : 'Every opportunity is graded before it reaches your calendar. You never waste delivery capacity on unfunded teams, vague scopes, or exploratory gatekeepers.'}
          </p>
        </div>

        {/* Matrix Container */}
        <div className="border border-white/10 bg-[#0C1018] overflow-hidden">
          {/* Matrix Header Banner */}
          <div className="bg-[#111724] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-sky-400 font-semibold">TABLE_SPEC: SYS.LEAD_TAXONOMY_V4</span>
              <span className="text-slate-600">|</span>
              <span>{isAr ? 'تصنيف BANT المعتمد' : 'BANT QUALIFICATION STANDARD'}</span>
            </div>
            <span className="hidden sm:inline-block text-emerald-400 font-medium">100% AUDIT PASS RATE</span>
          </div>

          {/* Desktop Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#0A0E17] font-mono text-xs">
                  <th className="py-4 px-4 sm:px-6 text-start text-slate-400 font-medium w-1/4">
                    {isAr ? 'معيار التدقيق المؤسسي' : 'AUDIT DIMENSION'}
                  </th>
                  <th className="py-4 px-4 sm:px-6 text-start w-1/4 border-s border-white/10 bg-emerald-950/15">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-emerald-400 font-bold">TIER 1 · HOT</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                      {isAr ? 'جاهز للتعاقد الفوري' : 'Ready to Contract'}
                    </div>
                  </th>
                  <th className="py-4 px-4 sm:px-6 text-start w-1/4 border-s border-white/10 bg-amber-950/15">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-amber-400 font-bold">TIER 2 · WARM</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                      {isAr ? 'احتياج نشط ومجدول' : 'Active Requirement'}
                    </div>
                  </th>
                  <th className="py-4 px-4 sm:px-6 text-start w-1/4 border-s border-white/10 bg-red-950/15">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-red-400 font-bold">DISQUALIFIED</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                      {isAr ? 'مستبعدة نهائياً' : 'Filtered & Rejected'}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-sans text-xs sm:text-sm">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    {/* Dimension Name */}
                    <td className="py-4 px-4 sm:px-6 text-slate-200">
                      <div className="font-mono text-[10px] text-sky-400 mb-0.5">{row.code}</div>
                      <div className="font-semibold">{isAr ? row.dimensionAr : row.dimensionEn}</div>
                    </td>

                    {/* Tier 1 Hot */}
                    <td className="py-4 px-4 sm:px-6 border-s border-white/10 bg-emerald-950/5 text-slate-200">
                      <div className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-mono font-bold">✓</span>
                        <span className="leading-snug">{isAr ? row.tier1Ar : row.tier1En}</span>
                      </div>
                    </td>

                    {/* Tier 2 Warm */}
                    <td className="py-4 px-4 sm:px-6 border-s border-white/10 bg-amber-950/5 text-slate-300">
                      <div className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-mono font-bold">●</span>
                        <span className="leading-snug">{isAr ? row.tier2Ar : row.tier2En}</span>
                      </div>
                    </td>

                    {/* Disqualified */}
                    <td className="py-4 px-4 sm:px-6 border-s border-white/10 bg-red-950/5 text-slate-400">
                      <div className="flex items-start gap-1.5">
                        <span className="text-red-400 font-mono font-bold">✕</span>
                        <span className="leading-snug line-through opacity-75">
                          {isAr ? row.disqualifiedAr : row.disqualifiedEn}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Matrix Footer SLA Callout */}
          <div className="bg-[#111724] border-t border-white/10 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">SLA GUARANTEE:</span>
              <span>
                {isAr
                  ? 'أي فرصة تفشل في مطابقة المعايير المذكورة تُستبدل مجاناً وفوراً بنسبة 100%.'
                  : 'Any lead failing to meet verified BANT criteria is instantly replaced under our 100% SLA.'}
              </span>
            </div>
            <a
              href="#intake-terminal"
              className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-[11px] font-semibold transition-colors"
            >
              [APPLY_AS_PROVIDER]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
