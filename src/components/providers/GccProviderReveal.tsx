'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GccProviderRevealProps {
  isAr?: boolean;
}

const CP_EN = [
  'We find organisations with live workforce challenges, verify the pain, confirm the decision-maker and hand you the opportunity. You skip the cold outreach and talk to buyers who already need training.',
  'Market intelligence finds the signal. Pain verification and decision-maker validation confirm it. Only then is the lead graded Hot, Warm or Qualified and sent to a provider who fits.',
];

const CP_AR = [
  'نرصد المنشآت والشركات التي تواجه تحديات مهارية وتدريبية حقيقية، نتحقق من عمق الاحتياج، ونؤكد هوية صانع القرار، ثم نسلمك الفرصة جاهزة. تتخطى المبيعات الباردة وتتحدث مباشرة مع مشترين يحتاجون لتدريبك الآن.',
  'الرصد الاستخباراتي الميداني يلتقط الإشارة، والتحقق المباشر يثبت الاحتياج وصلاحية صانع القرار. وفقط بعد ذلك تُصنف الفرصة (مؤكدة، نشطة، أو مؤهلة) وتُرسل للمزود المتخصص المطابق.',
];

const FEATURES_EN = [
  {
    title: 'No retainers',
    desc: 'You pay for results, not for access to a list.',
  },
  {
    title: 'Pay per qualified lead',
    desc: 'Every lead is graded Hot, Warm or Qualified before it reaches you.',
  },
  {
    title: 'Built for the GCC',
    desc: 'Saudization, Emiratization and regional compliance needs shape every match.',
  },
];

const FEATURES_AR = [
  {
    title: 'بدون اشتراكات شهرية',
    desc: 'تدفع فقط مقابل النتائج والفرص المؤكدة، لا لقاء قوائم اتصالات ميتة.',
  },
  {
    title: 'دفع لكل عميل مؤهل',
    desc: 'كل فرصة تُفرز وتصنف قبل أن تصل إليك لتضمن الجدوى والعائد.',
  },
  {
    title: 'مصممة لواقع الخليج',
    desc: 'متطلبات التوطين، ونيتاقات، واشتراطات الامتثال الإقليمية توجه كل ربط.',
  },
];

export default function GccProviderReveal({ isAr = false }: GccProviderRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [tabIdx, setTabIdx] = useState(0);

  const headlineText = isAr
    ? 'تمكين خط تدريب الشركات في الخليج'
    : "Powering the GCC's corporate training pipeline";

  const cp = isAr ? CP_AR : CP_EN;
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
        (span as HTMLElement).style.opacity = idx < activeCount ? '1' : '0.12';
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Split headline into words and letters for granular scroll reveal
  const words = headlineText.split(' ');

  return (
    <section
      ref={containerRef}
      id="w"
      className="bg-[#FFFFFF] text-[#0F172A] py-[16vh] px-[2.2vw] relative z-10 transition-colors select-none"
    >
      {/* Sub-Navigation Links */}
      <div className="flex gap-8 flex-wrap text-sm mb-[10vh] text-[#475569] font-sans">
        <a href="#w" className="hover:text-[#0F172A] transition-colors">
          {isAr ? 'لماذا ينضم المزودون' : 'Why providers join'}
        </a>
        <a href="#w" className="hover:text-[#0F172A] transition-colors">
          {isAr ? 'درجات وتصنيف الفرص' : 'Lead grades'}
        </a>
        <a href="#w" className="hover:text-[#0F172A] transition-colors">
          {isAr ? 'نموذج العمل' : 'The model'}
        </a>
        <a href="#connection-bridge" className="hover:text-[#FF5C00] transition-colors font-semibold text-[#FF5C00]">
          {isAr ? 'طلب الانضمام' : 'Apply'}
        </a>
      </div>

      {/* Massive Scroll-Driven Reveal Headline */}
      <h2
        ref={headlineRef}
        id="rv"
        className="font-heading font-light text-[clamp(2.4rem,7.5vw,7.2rem)] leading-[1.02] tracking-[-0.03em] max-w-6xl text-[#0F172A]"
      >
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block me-3">
            {word.split('').map((char, cIdx) => (
              <span
                key={cIdx}
                className="rv-char inline-block opacity-10 transition-opacity duration-200"
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>

      {/* Content Columns with Tab Toggle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[6vw] mt-[10vh]">
        <div />

        <div>
          <p className="text-[#475569] text-base sm:text-lg max-w-lg mb-6 leading-relaxed font-sans min-h-[96px]">
            {cp[tabIdx]}
          </p>

          {/* Toggle pill buttons */}
          <div
            className="inline-flex border border-[#D7E2F8] rounded-full p-[3px]"
            role="tablist"
          >
            <button
              type="button"
              onClick={() => setTabIdx(0)}
              className={`border-0 py-2 px-5 rounded-full font-sans font-medium text-xs tracking-wider cursor-pointer transition-all ${
                tabIdx === 0
                  ? 'bg-[#D7E2F8] text-[#0F172A] shadow-xs'
                  : 'bg-transparent text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              {isAr ? 'خط الفرص' : 'PIPELINE'}
            </button>
            <button
              type="button"
              onClick={() => setTabIdx(1)}
              className={`border-0 py-2 px-5 rounded-full font-sans font-medium text-xs tracking-wider cursor-pointer transition-all ${
                tabIdx === 1
                  ? 'bg-[#D7E2F8] text-[#0F172A] shadow-xs'
                  : 'bg-transparent text-[#475569] hover:text-[#0F172A]'
              }`}
            >
              {isAr ? 'التفاصيل' : 'DETAILS'}
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 mt-[12vh] border-t border-[#D7E2F8]">
        {features.map((feat, idx) => (
          <div key={idx} className="pt-7 pe-6">
            <h3 className="font-heading font-light text-2xl sm:text-3xl mb-2 text-[#0F172A]">
              {feat.title}
            </h3>
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-sans">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
