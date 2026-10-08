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

const TITLES_EN = [
  '01 · Verified Demand',
  '02 · Proven Pain',
  '03 · Decision Maker',
  '04 · Qualified Leads',
];

const TITLES_AR = [
  '٠١ · الطلب الموثق',
  '٠٢ · الاحتياج الحقيقي',
  '٠٣ · صانع القرار',
  '٠٤ · الفرص المؤهلة',
];

export default function GccProviderStory({ isAr = false }: GccProviderStoryProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const pnRef = useRef<HTMLDivElement>(null);
  const pcRef = useRef<HTMLDivElement>(null);
  const ctRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const chapters = isAr ? CH_AR : CH_EN;
  const titles = isAr ? TITLES_AR : TITLES_EN;
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
        // Morphing polygon & size calculations - Scaled to prevent overlap with headline
        const e = lq < 0.5 ? sm(lq, 0, 0.5) : lq < 0.8 ? 1 : 1 - sm(lq, 0.8, 1);
        const sk = (1 - e) * 8;
        
        // Constrain width and height so card never covers or collides with top headline
        const isMobile = window.innerWidth < 768;
        const w = isMobile ? lp(34, 92, e) : lp(28, 78, e);
        const h = isMobile ? lp(22, 50, e) : lp(22, 46, e);

        pnRef.current.style.width = `${w}vw`;
        pnRef.current.style.height = `${h}vh`;
        pnRef.current.style.clipPath = `polygon(${sk}% 0, 100% 0, ${100 - sk}% 100%, 0 100%)`;
        pcRef.current.style.opacity = `${e * e * e}`;

        const ctOpacity = 1 - sm(lq, 0.72, 0.95);
        ctRef.current.style.opacity = `${ctOpacity}`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [chapters.length]);

  return (
    <section ref={storyRef} id="story" className="relative h-[720vh] bg-black select-none">
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
        {/* Subtle radial background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF5C00]/5 rounded-full blur-[140px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Desktop Left Vertical Chapter Indicator with TITLES (Replaces A, B, C, D) */}
        <div
          id="ix"
          className="hidden md:flex absolute start-[3vw] top-1/2 -translate-y-1/2 flex-col gap-4 z-30 pointer-events-none"
        >
          {titles.map((title, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isActive
                    ? 'text-white font-semibold translate-x-1'
                    : 'text-white/25 font-normal'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FF5C00] shadow-[0_0_10px_#FF5C00] scale-125'
                      : 'bg-white/20'
                  }`}
                />
                <span className="text-xs tracking-wide font-mono whitespace-nowrap">
                  {title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Top Chapter Indicator Pill */}
        <div className="md:hidden absolute top-[calc(76px+env(safe-area-inset-top,0px))] inset-x-0 flex justify-center z-30 pointer-events-none px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111215] border border-white/10 backdrop-blur-md shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] shadow-[0_0_6px_#FF5C00]" />
            <span className="text-[11px] font-mono text-white font-medium">
              {titles[activeIdx]}
            </span>
            <span className="text-[10px] font-mono text-neutral-500">
              ({activeIdx + 1}/4)
            </span>
          </div>
        </div>

        {/* Center Headline & Subtitle - Scaled & Positioned to Never Collide with Panel */}
        <div
          ref={ctRef}
          id="ct"
          className="absolute top-[10vh] sm:top-[11vh] md:top-[12vh] inset-x-0 text-center px-4 sm:px-[6vw] z-20 pointer-events-none transition-opacity duration-150"
        >
          <h2 className="font-heading font-light text-[clamp(1.75rem,4.2vw,3.8rem)] leading-[1.1] tracking-tight text-white max-w-4xl mx-auto">
            {currentChapter.h}
          </h2>

          <p className="mt-3 sm:mt-4 text-neutral-400 text-xs sm:text-sm md:text-base font-sans">
            {isAr ? 'منظومة التشغيل والربط لـ' : 'Operating System for'}
            <b className="block text-neutral-200 font-medium text-sm sm:text-base md:text-lg mt-0.5 sm:mt-1">
              {currentChapter.s}
            </b>
          </p>
        </div>

        {/* Dynamic Morphing Enterprise Blueprint Panel - Fixed Height Scale & Pure Dark Surface */}
        <div
          ref={pnRef}
          id="pn"
          className="absolute start-1/2 bottom-[4vh] sm:bottom-[5vh] -translate-x-1/2 overflow-hidden z-10 transition-all duration-75 ease-out shadow-2xl rounded-2xl sm:rounded-3xl border border-white/10 bg-[linear-gradient(160deg,#141519,#0D0E12_60%,#08090B)]"
          style={{
            width: '28vw',
            height: '22vh',
            clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)',
          }}
        >
          {/* Subtle Blueprint 48px Grid Overlay (Neutral Monospace, No Blue) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_48px),repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_48px)]"
            aria-hidden="true"
          />

          {/* Panel Content (Centered, Scaled for Mobile & Desktop) */}
          <div
            ref={pcRef}
            id="pc"
            className="absolute inset-0 grid place-content-center px-4 sm:px-8 transition-opacity duration-150"
          >
            <div className="w-[min(620px,86vw)] max-w-xl mx-auto">
              <small className="block text-[#FF5C00] font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase mb-2.5 sm:mb-4">
                {currentChapter.t}
              </small>

              <div className="flex flex-col">
                {currentChapter.r.map(([col1, col2], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-4 py-2.5 sm:py-3.5 border-t border-white/10 font-sans text-xs sm:text-sm md:text-base"
                  >
                    <b className="font-normal text-white">{col1}</b>
                    <span className="text-neutral-400 text-end font-light text-[11px] sm:text-xs md:text-sm">{col2}</span>
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
