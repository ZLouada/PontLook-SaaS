import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import Signal from '@/components/shared/Signal';
import { Locale } from '@/i18n/config';
import { AlertCircle, TrendingDown, Cpu, ShieldCheck } from 'lucide-react';

interface HowItWorksStaticProps {
  lang: Locale;
  dict: any;
}

export default function HowItWorksStatic({ lang, dict }: HowItWorksStaticProps) {
  const isAr = lang === 'ar';

  const problems = [
    {
      id: 'p1',
      icon: AlertCircle,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50 border-amber-200/90 text-amber-950',
      title: isAr ? 'فجوة القيادة التنفيذية' : 'Executive Leadership Gap',
      desc: isAr ? 'بطء اتخاذ القرارات C-Suite' : 'Slow C-Suite Decisions',
      position: 'top-1 start-1 sm:top-1.5 sm:start-1.5',
    },
    {
      id: 'p2',
      icon: TrendingDown,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50 border-rose-200/90 text-rose-950',
      title: isAr ? 'بطء مسار المبيعات B2B' : 'B2B Sales Velocity Lag',
      desc: isAr ? '-32% إغلاق الصفقات' : '-32% Conversion Pace',
      position: 'top-1 end-1 sm:top-1.5 end-1 sm:end-1.5',
    },
    {
      id: 'p3',
      icon: Cpu,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 border-blue-200/90 text-blue-950',
      title: isAr ? 'تأخر التحول الرقمي و AI' : 'Digital & AI Upskilling',
      desc: isAr ? 'نقص المهارات التطبيقية' : 'Applied Tech Gap',
      position: 'bottom-7 start-1 sm:bottom-7 sm:start-1.5',
    },
    {
      id: 'p4',
      icon: ShieldCheck,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200/90 text-emerald-950',
      title: isAr ? 'شهادات اعتماد خليجية' : 'Accredited GCC Certs',
      desc: isAr ? 'مستهدفات التوطين 2030' : 'Vision 2030 Standards',
      position: 'bottom-7 end-1 sm:bottom-7 end-1 sm:end-1.5',
    },
  ];

  return (
    <section
      id="how-it-works"
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white transition-colors duration-500 overflow-visible lg:h-[175vh] lg:sm:h-[185vh] h-auto py-12 xs:py-16 sm:py-20 lg:py-0 border-t border-neutral-200 lg:border-t-0"
      aria-labelledby="how-it-works-title"
    >
      {/* Viewport Stage */}
      <div className="relative lg:sticky top-0 w-full min-h-0 lg:min-h-[100dvh] h-auto lg:h-[100dvh] flex flex-col justify-center items-center z-20 pt-16 sm:pt-20 lg:pt-20 xl:pt-24 pb-4 lg:pb-6 overflow-visible lg:overflow-hidden bg-white">
        {/* The White Content */}
        <div className="container-site relative z-20 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col items-start text-start space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold uppercase tracking-wider font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 animate-pulse" />
                <span>{dict?.how_it_works?.eyebrow || (isAr ? 'آلية العمل' : 'HOW IT WORKS')}</span>
              </div>

              <h2
                id="how-it-works-title"
                className="text-[1.35rem] xs:text-[1.5rem] sm:text-3xl lg:text-[34px] xl:text-[36px] font-semibold text-neutral-950 tracking-tight leading-[1.18] font-heading"
              >
                {dict?.how_it_works?.title || (isAr ? 'من تشخيص الفجوة المهارية إلى التدريب في 3 خطوات واضحة' : 'From Skill Gap to Training in 3 Straightforward Steps')}
              </h2>

              {/* White "Join network" Window Card */}
              <div className="pt-3 w-full sm:w-auto">
                <Link
                  href={`/${lang}/for-providers/apply`}
                  prefetch={false}
                  className="group inline-flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200/90 hover:border-neutral-300 transition-all duration-200 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(0,0,0,0.1)] w-full sm:min-w-[280px]"
                >
                  <div className="flex flex-col text-start">
                    <span className="text-sm sm:text-base font-semibold text-neutral-950 transition-colors">
                      {isAr ? 'انضم إلى الشبكة' : 'Join network'}
                    </span>
                    <span className="text-xs text-neutral-500 transition-colors">
                      {isAr ? 'لمزودي التدريب' : 'for training providers'}
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-xl bg-neutral-950 hover:bg-black text-white flex items-center justify-center transition-colors shrink-0 shadow-sm shadow-neutral-900/10">
                    <ArrowRight size={16} className="rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Step Navigation Tabs */}
              <div className="order-2 grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full py-0.5">
                {/* Step 1 Tab - Active */}
                <div className="group relative flex min-h-[44px] items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 xs:px-2 sm:px-3 rounded-xl border text-[11px] xs:text-xs font-medium select-none text-white border-neutral-950 bg-neutral-950 shadow-md">
                  <span className="relative z-10 text-[10px] xs:text-[11px] font-mono font-bold shrink-0 text-white/60">
                    01
                  </span>
                  <span className="relative z-10 font-semibold block sm:hidden">
                    {isAr ? 'تشخيص' : 'DIAGNOSE'}
                  </span>
                  <span className="relative z-10 font-semibold hidden sm:block truncate">
                    {isAr ? 'تشخيص الفجوة' : 'Diagnose Gaps'}
                  </span>
                  <div className="relative z-10 shrink-0 ms-0.5 sm:ms-1 hidden xs:block">
                    <Signal tone="neutral" size={12} />
                  </div>
                </div>

                {/* Step 2 Tab */}
                <div className="group relative flex min-h-[44px] items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 xs:px-2 sm:px-3 rounded-xl border text-[11px] xs:text-xs font-medium select-none bg-white text-neutral-600 border-neutral-200">
                  <span className="relative z-10 text-[10px] xs:text-[11px] font-mono font-bold shrink-0 text-neutral-400">
                    02
                  </span>
                  <span className="relative z-10 font-semibold block sm:hidden">
                    {isAr ? 'تطابق' : 'SCOOP'}
                  </span>
                  <span className="relative z-10 font-semibold hidden sm:block truncate">
                    {isAr ? 'حصر المزودين' : 'Scoop Matches'}
                  </span>
                </div>

                {/* Step 3 Tab */}
                <div className="group relative flex min-h-[44px] items-center justify-center gap-1 sm:gap-1.5 py-2 px-1.5 xs:px-2 sm:px-3 rounded-xl border text-[11px] xs:text-xs font-medium select-none bg-white text-neutral-600 border-neutral-200">
                  <span className="relative z-10 text-[10px] xs:text-[11px] font-mono font-bold shrink-0 text-neutral-400">
                    03
                  </span>
                  <span className="relative z-10 font-semibold block sm:hidden">
                    {isAr ? 'ربط مباشر' : 'MATCH'}
                  </span>
                  <span className="relative z-10 font-semibold hidden sm:block truncate">
                    {isAr ? 'ربط وتعاقد' : 'Direct Match'}
                  </span>
                </div>
              </div>

              {/* Active Step 01 Window Card */}
              <div className="order-1 w-full">
                <div className="relative rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-3.5 xs:p-4 sm:p-5 lg:p-5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)] overflow-hidden">
                  <div className="space-y-2.5 sm:space-y-3 relative z-10">
                    <div className="space-y-1 text-start">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block">
                        01 · DIAGNOSE
                      </span>
                      <h3 className="text-base sm:text-lg font-heading font-semibold text-neutral-950 leading-snug">
                        {isAr ? 'تحديد دقيق للفجوة المهارية واحتياج المنظمة الفعلي' : 'Pinpoint Capability Gaps Before Spending Budget'}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-neutral-600 font-sans leading-relaxed">
                        {isAr
                          ? 'نحلل التحدي المؤسسي الداخلي لديك: قيادة، مبيعات، تحول رقمي، أو امتثال، ونحدد نطاق التدريب المطلوب بدقة.'
                          : 'We diagnose your true organizational bottleneck: leadership, sales velocity, AI upskilling, or compliance, defining exact requirements.'}
                      </p>
                    </div>

                    {/* Step 01 Console Mockup (Diagnostic Box) */}
                    <div className="w-full pt-0.5">
                      <div className="relative w-full rounded-2xl bg-white border border-neutral-200/90 p-3 sm:p-5 overflow-hidden font-sans shadow-xs">
                        {/* Top HUD Diagnostics Header */}
                        <div className="relative z-10 flex items-center justify-between pb-2 mb-2 border-b border-neutral-200/70 text-xs">
                          <div className="flex items-center gap-1.5 text-neutral-700">
                            <span className="font-mono text-[10px] text-neutral-400 font-bold">[ 01_DIAGNOSE ]</span>
                            <span className="font-semibold text-[11px] sm:text-xs">
                              {isAr ? 'فحص الاحتياج المهاري للمنظمة' : 'Enterprise Skill Diagnostics'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                            </span>
                            <span>{isAr ? 'مسح نشط' : 'Scanning Active'}</span>
                          </div>
                        </div>

                        {/* Center 3D Box & Scanner Stage */}
                        <div className="relative z-10 h-44 sm:h-48 w-full flex items-center justify-center my-0.5">
                          <div className="absolute top-2 start-2 w-3.5 h-3.5 border-t-2 border-s-2 border-emerald-500/70 rounded-tl pointer-events-none" />
                          <div className="absolute top-2 end-2 w-3.5 h-3.5 border-t-2 border-e-2 border-emerald-500/70 rounded-tr pointer-events-none" />
                          <div className="absolute bottom-2 start-2 w-3.5 h-3.5 border-b-2 border-s-2 border-emerald-500/70 rounded-bl pointer-events-none" />
                          <div className="absolute bottom-2 end-2 w-3.5 h-3.5 border-b-2 border-e-2 border-emerald-500/70 rounded-br pointer-events-none" />

                          <div className="relative flex items-center justify-center">
                            <svg
                              viewBox="0 0 200 200"
                              className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-[0_12px_24px_rgba(20,40,30,0.16)]"
                            >
                              <ellipse cx="100" cy="175" rx="70" ry="18" fill="rgba(0,0,0,0.08)" />
                              <polygon points="30,85 100,122 100,172 30,135" fill="#203E2D" stroke="#2B543D" strokeWidth="1.5" />
                              <rect x="52" y="108" width="26" height="8" rx="4" transform="skewY(27)" fill="#0F1F17" />
                              <polygon points="100,122 170,85 170,135 100,172" fill="#2F5B42" stroke="#3D7555" strokeWidth="1.5" />
                              <circle cx="135" cy="128" r="14" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="2 3" />
                              <path d="M 130,128 L 135,123 L 140,128 L 135,133 Z" fill="rgba(255,255,255,0.25)" />
                              <polygon points="100,45 170,82 100,119 30,82" fill="#3A6E50" stroke="#4D8C67" strokeWidth="1.5" />
                              <polygon points="100,45 168,81 100,117 32,81" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                            </svg>

                            <div className="pointer-events-none absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.8)] z-20">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 rounded-full bg-white" />
                            </div>
                          </div>

                          {/* 4 Callout Badges */}
                          {problems.map((prob) => {
                            const IconComp = prob.icon;
                            return (
                              <div
                                key={prob.id}
                                className={`absolute ${prob.position} z-30 max-w-[125px] xs:max-w-[140px] sm:max-w-[160px] p-1.5 sm:p-2 rounded-xl border ${prob.bgColor} shadow-sm`}
                              >
                                <div className="flex items-start gap-1.5">
                                  <IconComp size={12} className={`${prob.iconColor} shrink-0 mt-0.5`} />
                                  <div className="min-w-0">
                                    <div className="text-[9.5px] sm:text-[10.5px] font-bold leading-tight truncate">
                                      {prob.title}
                                    </div>
                                    <div className="text-[8px] sm:text-[9px] opacity-75 leading-tight truncate">
                                      {prob.desc}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Bottom Pill */}
                        <div className="relative z-10 pt-2 border-t border-neutral-200/70 flex items-center justify-center text-center">
                          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{isAr ? 'تم تشخيص احتياجات المنشأة وحصر الفجوات بدقة' : 'Workforce Skill Gaps Successfully Profiled'}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Progress Dots */}
                  <div className="flex items-center justify-between pt-1 mt-2.5 border-t border-neutral-200 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <span className="block h-1.5 w-5 rounded-full bg-neutral-950" />
                      <span className="block h-1.5 w-1.5 rounded-full bg-neutral-300" />
                      <span className="block h-1.5 w-1.5 rounded-full bg-neutral-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
