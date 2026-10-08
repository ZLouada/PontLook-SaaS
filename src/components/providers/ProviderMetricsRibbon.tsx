'use client';

import React from 'react';

interface ProviderMetricsRibbonProps {
  isAr?: boolean;
}

export default function ProviderMetricsRibbon({ isAr = false }: ProviderMetricsRibbonProps) {
  const metrics = [
    {
      id: 'budgets',
      code: 'MTR_01',
      value: isAr ? '180M+ ر.س' : '$48.2M+',
      subVal: isAr ? 'ميزانيات مرصودة' : 'SAR 180M+ EQUIV',
      label: isAr
        ? 'ميزانيات تدريب مرصودة ونشطة'
        : 'Enterprise L&D Budgets Monitored',
      detail: isAr
        ? 'مخصصات برامج "هدف" وصناديق التدريب المؤسسي المعتمدة'
        : 'Active HRDF/Hadaf & corporate enterprise appropriations',
      status: 'VERIFIED',
    },
    {
      id: 'decision_makers',
      code: 'MTR_02',
      value: '100%',
      subVal: isAr ? 'رؤساء تنفيذيون وموارد بشرية' : 'C-LEVEL / CHRO ONLY',
      label: isAr
        ? 'صناع قرار ومسؤولو ميزانية موثقون'
        : 'C-Level & CHRO Direct Verification',
      detail: isAr
        ? 'التحقق المباشر من البريد المؤسسي والهاتف التنفيذي'
        : 'Zero gatekeepers or exploratory agency screenings',
      status: 'AUDITED',
    },
    {
      id: 'sla',
      code: 'MTR_03',
      value: isAr ? '< 72 ساعة' : '< 72 HRS',
      subVal: isAr ? 'سرعة التوجيه المباشر' : 'DISPATCH LATENCY',
      label: isAr
        ? 'اتفاقية مستوى الخدمة للتوجيه'
        : 'Direct Match-to-Intro SLA',
      detail: isAr
        ? 'ربط مباشر بجدول صانع القرار خلال 72 ساعة من الاعتماد'
        : 'Calendar engagement within 72 hours of BANT sign-off',
      status: 'GUARANTEED',
    },
    {
      id: 'retainer',
      code: 'MTR_04',
      value: isAr ? '0 ر.س' : '$0 / 0 SAR',
      subVal: isAr ? 'صفر اشتراك شهري' : 'PERFORMANCE ONLY',
      label: isAr
        ? 'انعدام مخاطر رسوم الاحتجاز'
        : 'Zero Retainer Platform Risk',
      detail: isAr
        ? 'الدفع فقط مقابل الفرصة المؤهلة والمتحققة بنسبة 100%'
        : 'Strict pay-per-qualified lead; zero recurring platform fees',
      status: 'ACTIVE_SLA',
    },
  ];

  return (
    <section className="w-full bg-[#07090E] border-y border-white/10 relative z-10">
      <div className="container-site max-w-7xl mx-auto py-8 sm:py-10">
        {/* Header Telemetry Badge */}
        <div className="flex items-center justify-between mb-4 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-sky-400 font-semibold">[TELEMETRY_DATA_RIBBON]</span>
            <span className="text-slate-600">--</span>
            <span>{isAr ? 'مؤشرات الأداء المؤسسي لشبكة المزودين' : 'INSTITUTIONAL PERFORMANCE AUDIT'}</span>
          </div>
          <span className="hidden sm:inline-block text-slate-500">SYS_METRICS_V4</span>
        </div>

        {/* 4-Column Grid with Hairline Dividers & Corner Markers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {metrics.map((m) => (
            <div
              key={m.id}
              className="bg-[#0C1018] p-5 sm:p-6 flex flex-col justify-between relative group hover:bg-[#111724] transition-colors"
            >
              {/* Corner crosshairs */}
              <div className="absolute top-1.5 start-1.5 font-mono text-[9px] text-slate-600 select-none">
                +
              </div>
              <div className="absolute top-1.5 end-1.5 font-mono text-[9px] text-slate-600 select-none">
                +
              </div>

              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-2">
                  <span className="text-sky-400 font-semibold">{m.code}</span>
                  <span className="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px]">
                    {m.status}
                  </span>
                </div>

                <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {m.value}
                </div>

                <div className="font-mono text-[10px] text-sky-300 font-medium tracking-wider mt-1">
                  {m.subVal}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <div className="font-sans text-xs sm:text-sm font-semibold text-slate-200">
                  {m.label}
                </div>
                <p className="font-sans text-[11px] sm:text-xs text-slate-400 mt-1 leading-normal">
                  {m.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
