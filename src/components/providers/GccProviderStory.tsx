'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GccProviderStoryProps {
  isAr?: boolean;
}

interface StoryChapter {
  h: string;
  s: string;
  t: string;
  r: [string, string][];
}

const CH_EN: StoryChapter[] = [
  {
    h: 'Stop chasing companies',
    s: 'Verified opportunities, not cold lists',
    t: 'Verified opportunity',
    r: [
      ['Retail group · Riyadh', '400 employees'],
      ['Hospitality group · Dubai', 'Leadership, retention'],
      ['Logistics firm · Doha', 'Training starts within 30 days'],
    ],
  },
  {
    h: 'Start with proven pain',
    s: 'We confirm the business problem first',
    t: 'Pain signals confirmed',
    r: [
      ['High staff turnover', 'Confirmed'],
      ['Middle managers need support', 'Confirmed'],
      ['AI adoption has stalled', 'Confirmed'],
    ],
  },
  {
    h: 'Talk to the decision-maker',
    s: 'The person who signs, not a gatekeeper',
    t: 'Decision-maker validated',
    r: [
      ['HR Director', 'Business email verified'],
      ['Budget range', 'Shared'],
      ['Timeline', 'This quarter'],
    ],
  },
  {
    h: 'Pay only for qualified leads',
    s: 'Every lead is graded before it reaches you',
    t: 'Lead grades',
    r: [
      ['Hot', 'Ready to buy now'],
      ['Warm', 'Real need, budget forming'],
      ['Qualified', 'Confirmed pain, earlier stage'],
    ],
  },
];

const CH_AR: StoryChapter[] = [
  {
    h: 'توقف عن ملاحقة الشركات',
    s: 'فرص حقيقية مؤكدة، لا قوائم اتصالات باردة',
    t: 'فرصة تدريبية موثقة',
    r: [
      ['مجموعة تجزئة كبرى · الرياض', '400 موظف'],
      ['مجموعة ضيافة وفنادق · دبي', 'القيادة التنفيذية واستبقاء المواهب'],
      ['شركة لوجستية · الدوحة', 'التدريب يبدأ خلال 30 يوماً'],
    ],
  },
  {
    h: 'ابدأ بتحدٍ واحتياج حقيقي',
    s: 'نتحقق من وجود المشكلة المؤسسية أولاً',
    t: 'مؤشرات التحدي المهارية مؤكدة',
    r: [
      ['دوران وظيفي مرتفع في الإدارات', 'مؤكد'],
      ['حاجة الإدارة الوسطى للتمكين القيادي', 'مؤكد'],
      ['تعثر تبني أدوات الذكاء الاصطناعي', 'مؤكد'],
    ],
  },
  {
    h: 'تحدث مباشرة مع صاحب القرار',
    s: 'الشخص المخول بالتعاقد، لا الوسطاء أو المتدربين',
    t: 'صانع القرار موثق ومعتمد',
    r: [
      ['مدير الموارد البشرية التنفيذي', 'بريد إلكتروني مؤسسي موثق'],
      ['نطاق الميزانية المرصودة', 'محدد ومعتمد'],
      ['الجدول الزمني للتنفيذ', 'خلال هذا الربع'],
    ],
  },
  {
    h: 'ادفع فقط مقابل الفرص المؤهلة',
    s: 'كل فرصة تُصنف وتُفحص قبل أن تصل إلى جدولك',
    t: 'تصنيفات الفرص',
    r: [
      ['مؤكدة (Hot)', 'جاهز للتعاقد والشراء الفوري'],
      ['نشطة (Warm)', 'احتياج حقيقي وميزانية قيد الاعتماد'],
      ['مؤهلة (Qualified)', 'تحدٍ معتمد في مرحلة التخطيط المسبق'],
    ],
  },
];

export default function GccProviderStory({ isAr = false }: GccProviderStoryProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const pnRef = useRef<HTMLDivElement>(null);
  const pcRef = useRef<HTMLDivElement>(null);
  const ctRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const chapters = isAr ? CH_AR : CH_EN;
  const currentChapter = chapters[activeIdx] || chapters[0];

  useEffect(() => {
    const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const lp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ez = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const sm = (v: number, a: number, b: number) => ez(cl((v - a) / (b - a)));

    const onScroll = () => {
      const storyEl = storyRef.current;
      if (!storyEl) return;

      const r = storyEl.getBoundingClientRect();
      const scrollableHeight = r.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const q = cl(-r.top / scrollableHeight);
      const n = chapters.length;
      const i = Math.min(n - 1, Math.floor(q * n));
      const lq = q * n - i;

      setActiveIdx(i);

      if (pnRef.current && pcRef.current && ctRef.current) {
        // Morphing polygon & size calculations
        const e = lq < 0.5 ? sm(lq, 0, 0.5) : lq < 0.8 ? 1 : 1 - sm(lq, 0.8, 1);
        const sk = (1 - e) * 11;
        const w = lp(26, 100, e);
        const h = lp(24, 100, e);

        pnRef.current.style.width = `${w}vw`;
        pnRef.current.style.height = `${h}vh`;
        pnRef.current.style.clipPath = `polygon(${sk}% 0, 100% 0, ${100 - sk}% 100%, 0 100%)`;
        pcRef.current.style.opacity = `${e * e * e}`;

        const ctOpacity = 1 - sm(lq, 0.38, 0.62);
        const ctTranslate = -sm(lq, 0.4, 1) * 60;
        ctRef.current.style.opacity = `${ctOpacity}`;
        ctRef.current.style.transform = `translateY(${ctTranslate}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [chapters.length]);

  return (
    <section ref={storyRef} id="story" className="relative h-[720vh] bg-[#0A1020] select-none">
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Left Vertical Chapter Indicator [A] B C D */}
        <div
          id="ix"
          className="absolute start-[2.2vw] top-1/2 -translate-y-1/2 flex flex-col gap-2 font-mono text-lg text-white/35 z-30 pointer-events-none"
        >
          {['A', 'B', 'C', 'D'].map((letter, idx) => {
            const isActive = idx === activeIdx;
            return (
              <span
                key={letter}
                className={`transition-all duration-200 ${
                  isActive ? 'text-white font-bold scale-110' : 'text-white/30'
                }`}
              >
                {isActive ? `[${letter}]` : letter}
              </span>
            );
          })}
        </div>

        {/* Center Headline & Subtitle */}
        <div
          ref={ctRef}
          id="ct"
          className="absolute top-[13vh] sm:top-[15vh] inset-x-0 text-center px-[7vw] z-20 pointer-events-none transition-transform duration-75"
        >
          <h2 className="font-heading font-light text-[clamp(2.1rem,5.6vw,5.2rem)] leading-[1.05] tracking-tight text-white max-w-5xl mx-auto">
            {currentChapter.h}
          </h2>

          <p className="mt-5 text-[#9FB1D1] text-sm sm:text-base font-sans">
            {isAr ? 'منظومة التشغيل والربط لـ' : 'Operating System for'}
            <b className="block text-[#E6ECF8] font-normal text-base sm:text-lg mt-0.5">
              {currentChapter.s}
            </b>
          </p>
        </div>

        {/* Dynamic Morphing Blueprint Panel */}
        <div
          ref={pnRef}
          id="pn"
          className="absolute start-1/2 bottom-0 -translate-x-1/2 overflow-hidden z-10 transition-all duration-75 ease-out shadow-2xl bg-[linear-gradient(160deg,#16306F,#0B1736_60%,#081025)]"
          style={{
            width: '26vw',
            height: '24vh',
            clipPath: 'polygon(11% 0, 100% 0, 89% 100%, 0 100%)',
          }}
        >
          {/* Subtle Blueprint 64px Grid Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(90deg,#7FB8FF14_0_1px,transparent_1px_64px),repeating-linear-gradient(0deg,#7FB8FF14_0_1px,transparent_1px_64px)]"
            aria-hidden="true"
          />

          {/* Panel Content (Centered) */}
          <div
            ref={pcRef}
            id="pc"
            className="absolute inset-0 grid place-content-center px-[6vw] transition-opacity duration-150"
          >
            <div className="w-[min(680px,88vw)] max-w-2xl mx-auto">
              <small className="block text-[#7FB8FF] font-sans text-[11px] font-semibold tracking-[0.14em] uppercase mb-4">
                {currentChapter.t}
              </small>

              <div className="flex flex-col">
                {currentChapter.r.map(([col1, col2], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-6 py-4 sm:py-5 border-t border-[#7FB8FF]/25 font-sans text-[clamp(14px,1.9vw,21px)]"
                  >
                    <b className="font-normal text-white">{col1}</b>
                    <span className="text-[#9FB1D1] text-end font-light">{col2}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
