'use client';

import { useState, useRef, useEffect } from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useParams } from 'next/navigation';

export default function HowItWorks() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const steps = [
    {
      id: 'step1',
      number: '01',
      icon: Building2,
      badge: dict.how_it_works?.step1?.badge || (isAr ? 'المرحلة 01' : 'Step 01'),
      navTitle: isAr ? 'رصد الاحتياج الفعلي' : 'Detect Need',
      title: dict.how_it_works?.step1?.title || (isAr ? 'رصد الاحتياج التدريبي' : 'Detect Need'),
      subtitle:
        dict.how_it_works?.step1?.subtitle ||
        (isAr
          ? 'ترصد تحليلات السوق المنظمات والشركات التي تواجه تحديات حقيقية في الكفاءات قبل أن تبدأ بالبحث العلني.'
          : 'Market intelligence surfaces enterprise organizations with verified workforce challenges before they start searching.'),
      highlight: isAr ? 'إشارة طلب مؤكدة' : 'Active Enterprise Signal',
      cardContent: (
        <div className="space-y-4">
          {/* Top header badge */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#0052FF] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30">
                <Building2 size={20} />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 font-sans">
                  {isAr ? 'تم رصد إشارة طلب مؤكدة' : 'Demand Signal Detected'}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {isAr ? 'مؤسسة معتمدة · المملكة العربية السعودية' : 'Verified Enterprise · Saudi Arabia'}
                </div>
              </div>
            </div>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>

          {/* Signal parameters */}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">{isAr ? 'القطاع والمجال' : 'Sector & Domain'}</span>
              <span className="text-slate-900 font-semibold">{isAr ? 'الخدمات المالية والمصرفية' : 'Banking & FinTech'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">{isAr ? 'حجم القوة العاملة' : 'Workforce Size'}</span>
              <span className="font-mono font-bold text-slate-800">1,200+ {isAr ? 'موظف' : 'Employees'}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">{isAr ? 'الميزانية التقديرية' : 'Allocated Budget'}</span>
              <span className="font-mono font-bold text-emerald-600">SAR 450,000+</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-mono font-semibold border border-emerald-200 inline-flex items-center gap-1.5">
              <CheckCircle2 size={13} /> {isAr ? 'أولوية عاجلة' : 'High Intent'}
            </span>
            <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#0052FF] text-xs font-mono font-semibold border border-blue-200">
              {isAr ? 'برامج القيادة التنفيذية' : 'Executive Leadership'}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'step2',
      number: '02',
      icon: ShieldCheck,
      badge: dict.how_it_works?.step2?.badge || (isAr ? 'المرحلة 02' : 'Step 02'),
      navTitle: isAr ? 'التأهيل والمطابقة' : 'Qualify & Match',
      title: dict.how_it_works?.step2?.title || (isAr ? 'التأهيل والربط الذكي' : 'Qualify & Match'),
      subtitle:
        dict.how_it_works?.step2?.subtitle ||
        (isAr
          ? 'يتم التحقق المباشر من أصحاب القرار والميزانيات والجداول الزمنية، ثم مطابقتهم مع مزود التدريب الأنسب.'
          : 'Decision makers are validated, budgets and timelines confirmed, then matched directly to the right training provider.'),
      highlight: isAr ? 'مطابقة معايير 94%' : '94% Match Fit Score',
      cardContent: (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
            <div>
              <div className="text-sm font-semibold text-slate-900 font-sans">
                {isAr ? 'مؤشر جودة التطابق' : 'Match Quality Score'}
              </div>
              <div className="text-xs text-slate-500">
                {isAr ? 'مطابقة متطلبات المحتوى والأثر' : 'Curriculum & Track Record Fit'}
              </div>
            </div>
            <div className="text-sm font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              94% Match
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-600 font-medium">
              <span>{isAr ? 'اكتمال معايير التأهيل' : 'Criteria Fulfilled'}</span>
              <span className="font-mono font-bold text-slate-900">4 / 4 Complete</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
              <div className="h-full bg-gradient-to-r from-[#0052FF] to-emerald-500 rounded-full w-[94%]" />
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs text-slate-700">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/50">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>{isAr ? 'صانع القرار: رئيس الموارد البشرية التنفيذي' : 'Decision Maker: Chief Human Resources Officer'}</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/50">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>{isAr ? 'الجدول الزمني المعتمد: خلال 30 يوماً' : 'Timeline: Deployment within 30 days'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'step3',
      number: '03',
      icon: Award,
      badge: dict.how_it_works?.step3?.badge || (isAr ? 'المرحلة 03' : 'Step 03'),
      navTitle: isAr ? 'التقديم والتعاقد' : 'Close Engagement',
      title: dict.how_it_works?.step3?.title || (isAr ? 'التقديم المباشر والتعاقد' : 'Introduce & Close'),
      subtitle:
        dict.how_it_works?.step3?.subtitle ||
        (isAr
          ? 'يحصل مزودو التدريب على تقديم مباشر وتواصل شخصي مع صناع القرار المستعدين لتلقي العروض وتوقيع العقود.'
          : 'Providers receive direct, warm introductions to corporate decision makers ready for proposals and execution.'),
      highlight: isAr ? 'جاهز لتقديم العرض' : 'Direct Introduction Ready',
      cardContent: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#FF5C00] p-[2px] shadow-sm">
              <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center text-[#0052FF]">
                <Award size={22} />
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900 font-sans">
                {isAr ? 'تم إتمام التقديم المباشر' : 'Warm Introduction Completed'}
              </div>
              <div className="text-xs text-slate-500">
                {isAr ? 'تواصل مباشر مع مالك الميزانية المؤسسية' : 'Direct access to enterprise budget owner'}
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">{isAr ? 'حالة الصفقة' : 'Pipeline Status'}</span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {isAr ? 'مرحلة تقديم العرض الفني' : 'Proposal Presentation Stage'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-medium">{isAr ? 'ضمان الفرصة' : 'Engagement Guarantee'}</span>
              <span className="font-semibold text-slate-800">{isAr ? 'ضمان استبدال خلال 5 أيام' : '5 Day Replacement Guarantee'}</span>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between text-xs text-slate-500">
            <span>{isAr ? 'بدون عمولات خفية' : 'Zero hidden commission'}</span>
            <span className="font-mono font-bold text-[#0052FF]">{isAr ? 'علاقة تعاقدية مباشرة' : '100% Direct Contract'}</span>
          </div>
        </div>
      ),
    },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    stepRefs[index].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <section
      id="how-it-works"
      className="relative bg-[#000000] text-white py-16 sm:py-24 lg:py-32 border-t border-[#1F1F1F] overflow-hidden"
    >
      {/* Background glow highlights */}
      <div className="absolute top-1/4 start-1/4 w-[600px] h-[600px] bg-[#0052FF]/[0.07] blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 end-1/4 w-[600px] h-[600px] bg-[#FF5C00]/[0.05] blur-[140px] pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Title & Step Navigation (Attio style) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0052FF]/15 border border-[#0052FF]/30 text-[#4D7CFF] text-xs font-semibold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF] animate-pulse" />
                <span>{dict.how_it_works?.eyebrow || (isAr ? 'في ثلاث خطوات بسيطة' : 'Just in three steps')}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.03em] leading-tight font-heading">
                {dict.how_it_works?.title || (isAr ? 'نحدد المنشآت التي تواجه فجوات تدريب حقيقية' : 'We pinpoint organizations facing real skill & training gaps')}
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
                {dict.how_it_works?.subtitle || (isAr ? 'منهجيتنا: كيف نربط السوق ونتحقق من الاحتياج ونطابق المزود الأنسب' : 'OUR APPROACH: How We Connect the Market: Learn, Diagnose, and Get Matched')}
              </p>
            </div>

            {/* Interactive Timeline Tabs */}
            <div className="space-y-3 pt-2">
              {steps.map((s, index) => {
                const isActive = activeStep === index;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleStepClick(index)}
                    className={`w-full text-start p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                      isActive
                        ? 'bg-[#0A1128] border-[#0052FF] shadow-[0_0_24px_rgba(0,82,255,0.25)]'
                        : 'bg-[#0A0A0A] border-[#1F1F1F] hover:border-neutral-700 hover:bg-[#121212]'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono font-bold text-sm transition-colors ${
                        isActive
                          ? 'bg-[#0052FF] text-white'
                          : 'bg-[#171717] text-neutral-400'
                      }`}
                    >
                      {s.number}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`font-semibold text-sm sm:text-base transition-colors ${
                            isActive ? 'text-white' : 'text-neutral-300'
                          }`}
                        >
                          {s.navTitle}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0052FF]/20 text-[#4D7CFF] border border-[#0052FF]/40">
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed ${
                          isActive ? 'text-neutral-300' : 'text-neutral-500'
                        }`}
                      >
                        {s.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: "White and dark blue" Cards */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            {steps.map((s, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={s.id}
                  ref={stepRefs[index]}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`relative transition-all duration-500 ${
                    isActive ? 'scale-[1.01]' : 'opacity-85 hover:opacity-100'
                  }`}
                >
                  {/* Outer Dark Blue Container */}
                  <div className="relative rounded-3xl bg-[#070D1E] border border-[#1E293B] hover:border-[#0052FF]/60 p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
                    
                    {/* Top Accent Light Bar */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0052FF] via-[#4D7CFF] to-[#FF5C00]/80" />

                    {/* Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#0052FF] text-white text-xs font-mono font-semibold shadow-md shadow-blue-600/30">
                          {s.badge}
                        </span>
                        <span className="text-xs font-mono text-[#4D7CFF]">
                          {s.highlight}
                        </span>
                      </div>

                      <span className="text-2xl sm:text-3xl font-mono font-bold text-neutral-600">
                        {s.number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-snug mb-3 font-heading">
                      {s.title}
                    </h3>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-8">
                      {s.subtitle}
                    </p>

                    {/* Crisp White Inner Card */}
                    <div className="relative rounded-2xl bg-white text-slate-900 p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-slate-200">
                      {s.cardContent}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

