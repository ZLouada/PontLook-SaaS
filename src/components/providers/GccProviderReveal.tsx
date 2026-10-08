'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GccProviderRevealProps {
  isAr?: boolean;
}

const PIPELINE_STEPS_EN = [
  {
    step: 'PHASE 01',
    title: 'Workforce & Signal Detection',
    desc: 'Live intelligence tracks corporate expansions, Saudization / Emiratization quotas, and organizational skills gaps before RFP publication.',
  },
  {
    step: 'PHASE 02',
    title: 'BANT & Economic Buyer Validation',
    desc: 'Direct verification with HR Directors and L&D heads. We confirm approved training budgets, timelines, and delivery format.',
  },
  {
    step: 'PHASE 03',
    title: 'Exclusive Provider Dispatch',
    desc: 'Mandate is dispatched exclusively to the verified provider matching the exact domain. Zero competing lists, zero cold outreach.',
  },
];

const PIPELINE_STEPS_AR = [
  {
    step: 'المرحلة ٠١',
    title: 'رصد المؤشرات والتحديات المهارية',
    desc: 'رصد استخباراتي استباقي لتوسعات الشركات واشتراطات التوطين والامتثال وفجوات الكفاءات قبل طرح المناقصات العامة.',
  },
  {
    step: 'المرحلة ٠٢',
    title: 'توثيق صانع القرار والميزانية',
    desc: 'تحقق مباشر مع مدراء الموارد البشرية والتدريب، واعتماد نطاق الميزانية المرصودة وموعد بدء التنفيذ التدريبي.',
  },
  {
    step: 'المرحلة ٠٣',
    title: 'الربط الحصري المباشر',
    desc: 'إرسال الفرصة حصرياً للمزود المتخصص المطابق لمتطلبات التعاقد، بدون منافسة عشوائية أو مكالمات بيع باردة.',
  },
];

const LEAD_DETAILS_EN = [
  {
    grade: 'HOT',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    title: 'Immediate Engagement',
    desc: 'Budget fully signed off, training kick-off mandated within 30 days, HR Director directly engaged.',
  },
  {
    grade: 'WARM',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    title: 'Budget Approved in Cycle',
    desc: 'Confirmed organizational pain, scope defined, procurement cycle underway for the upcoming quarter.',
  },
  {
    grade: 'QUALIFIED',
    badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    title: 'Pre-Scoped Need',
    desc: 'Verified executive intent and leadership gap, currently establishing project specifications.',
  },
];

const LEAD_DETAILS_AR = [
  {
    grade: 'مؤكدة (HOT)',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    title: 'تعاقد وشراء فوري',
    desc: 'الميزانية معتمدة بالكامل، انطلاق البرنامج التدريبي خلال 30 يوماً، وتواصل مباشر مع صاحب القرار.',
  },
  {
    grade: 'نشطة (WARM)',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    title: 'ميزانية قيد الاعتماد',
    desc: 'احتياج مؤسسي موثق، وتحديد أهداف البرنامج، وتنسيق الإجراءات للربع المالي القادم.',
  },
  {
    grade: 'مؤهلة (QUALIFIED)',
    badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    title: 'احتياج محدد مسبقاً',
    desc: 'تحدٍ مهاري معتمد لدى الإدارة التنفيذية، وفي مرحلة تحديد المواصفات والمحاور التدريبية.',
  },
];

const FEATURES_EN = [
  {
    title: 'No retainers',
    desc: 'You pay for results, not for access to a list. Zero monthly recurring fees.',
  },
  {
    title: 'Pay per qualified lead',
    desc: 'Every opportunity is audited, graded, and validated before reaching your delivery schedule.',
  },
  {
    title: 'Built for the GCC',
    desc: 'Saudization, Emiratization, and regional compliance mandates shape every direct match.',
  },
];

const FEATURES_AR = [
  {
    title: 'بدون اشتراكات شهرية',
    desc: 'تدفع فقط مقابل النتائج والفرص المؤكدة، لا لقاء اشتراكات دورية أو رسوم مسبقة.',
  },
  {
    title: 'دفع لكل عميل مؤهل',
    desc: 'كل فرصة تُفرز وتُصنف وتُدقق قبل أن تصل إليك لتضمن الجدوى والعائد الاستثماري.',
  },
  {
    title: 'مصممة لواقع الخليج',
    desc: 'متطلبات التوطين، ونطاقات، واشتراطات الامتثال الإقليمية توجه كل ربط مباشر.',
  },
];

export default function GccProviderReveal({ isAr = false }: GccProviderRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [tabIdx, setTabIdx] = useState(0);

  const headlineText = isAr
    ? 'تمكين خط تدريب الشركات في الخليج'
    : "Powering the GCC's corporate training pipeline";

  const pipeline = isAr ? PIPELINE_STEPS_AR : PIPELINE_STEPS_EN;
  const leadDetails = isAr ? LEAD_DETAILS_AR : LEAD_DETAILS_EN;
  const features = isAr ? FEATURES_AR : FEATURES_EN;

  useEffect(() => {
    const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

    const onScroll = () => {
      const heading = headlineRef.current;
      if (!heading) return;

      const r = heading.getBoundingClientRect();
      const progress = cl((window.innerHeight * 0.9 - r.top) / (window.innerHeight * 0.7));

      const spans = heading.querySelectorAll('.rv-char');
      const total = spans.length;
      const activeCount = Math.floor(progress * total);

      spans.forEach((span, idx) => {
        (span as HTMLElement).style.opacity = idx < activeCount ? '1' : '0.15';
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = headlineText.split(' ');

  return (
    <section
      ref={containerRef}
      id="w"
      className="bg-black text-white py-[14vh] px-5 sm:px-8 lg:px-12 relative z-10 select-none border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Sub-Navigation Links */}
        <div className="flex gap-6 sm:gap-8 flex-wrap text-xs sm:text-sm mb-12 sm:mb-16 text-neutral-400 font-sans">
          <a href="#w" className="hover:text-white transition-colors">
            {isAr ? 'لماذا ينضم المزودون' : 'Why providers join'}
          </a>
          <a href="#w" className="hover:text-white transition-colors">
            {isAr ? 'درجات وتصنيف الفرص' : 'Lead grades'}
          </a>
          <a href="#w" className="hover:text-white transition-colors">
            {isAr ? 'نموذج العمل' : 'The model'}
          </a>
          <a
            href="#connection-bridge"
            className="hover:text-[#FFA048] transition-colors font-semibold text-[#FF5C00]"
          >
            {isAr ? 'طلب الانضمام' : 'Apply'}
          </a>
        </div>

        {/* Massive Scroll-Driven Reveal Headline in Pure White */}
        <h2
          ref={headlineRef}
          id="rv"
          className="font-heading font-light text-[clamp(2.4rem,7vw,6.8rem)] leading-[1.03] tracking-[-0.03em] max-w-6xl text-white"
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} className="inline-block me-3">
              {word.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="rv-char inline-block opacity-15 transition-opacity duration-200"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* Dynamic Interactive Panel with Toggle Tabs */}
        <div className="mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
              {isAr
                ? 'نرصد المنشآت التي تواجه تحديات تدريبية حقيقية، نتحقق من عمق الاحتياج، ونؤكد صلاحية صانع القرار، ثم نسلمك الفرصة جاهزة للتعاقد.'
                : 'Market intelligence identifies verified enterprise demand. We confirm approved budgets and executive decision-makers before dispatching the lead to your firm.'}
            </p>

            {/* Dark Enterprise Toggle Pill Buttons */}
            <div
              className="inline-flex self-start sm:self-auto p-1 rounded-full bg-[#111215] border border-white/10"
              role="tablist"
            >
              <button
                type="button"
                onClick={() => setTabIdx(0)}
                className={`py-2 px-5 sm:px-6 rounded-full font-mono text-xs font-semibold tracking-wider cursor-pointer transition-all duration-200 ${
                  tabIdx === 0
                    ? 'bg-[#FF5C00] text-white shadow-lg shadow-orange-500/25'
                    : 'bg-transparent text-neutral-400 hover:text-white'
                }`}
              >
                {isAr ? 'مسار الربط (Pipeline)' : 'PIPELINE FLOW'}
              </button>
              <button
                type="button"
                onClick={() => setTabIdx(1)}
                className={`py-2 px-5 sm:px-6 rounded-full font-mono text-xs font-semibold tracking-wider cursor-pointer transition-all duration-200 ${
                  tabIdx === 1
                    ? 'bg-[#FF5C00] text-white shadow-lg shadow-orange-500/25'
                    : 'bg-transparent text-neutral-400 hover:text-white'
                }`}
              >
                {isAr ? 'تصنيف الفرص (Lead Details)' : 'LEAD DETAILS'}
              </button>
            </div>
          </div>

          {/* Panel Content Changing dynamically between PIPELINE and LEAD DETAILS */}
          <div className="mt-8 transition-all duration-300">
            {tabIdx === 0 ? (
              /* Pipeline Flow Cards */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {pipeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-[#0C0D11] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-[#FF5C00] tracking-widest block mb-2">
                        {item.step}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Lead Details / Grading Cards */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {leadDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 sm:p-6 rounded-2xl bg-[#0C0D11] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold tracking-wider mb-3 ${item.badgeColor}`}
                      >
                        {item.grade}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-heading">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3-Column Feature Grid (Dark Enterprise Styled) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 sm:mt-24 pt-10 border-t border-white/10">
          {features.map((feat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-xs font-mono text-[#FF5C00] font-semibold mb-2">
                0{idx + 1}
              </span>
              <h3 className="font-heading font-medium text-xl sm:text-2xl mb-2.5 text-white">
                {feat.title}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
