'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GccProviderStoryProps {
  isAr?: boolean;
}

interface StoryChapter {
  id: string;
  num: string;
  title: string;
  h: string;
  s: string;
  t: string;
  r: [string, string][];
}

const CH_EN: StoryChapter[] = [
  {
    id: 'demand',
    num: '01',
    title: 'Verified Demand',
    h: 'Stop chasing companies',
    s: 'Verified opportunities, not cold lists',
    t: 'VERIFIED OPPORTUNITY',
    r: [
      ['Retail group · Riyadh', '400 employees'],
      ['Hospitality group · Dubai', 'Leadership, retention'],
      ['Logistics firm · Doha', 'Training starts within 30 days'],
    ],
  },
  {
    id: 'pain',
    num: '02',
    title: 'Proven Pain',
    h: 'Start with proven pain',
    s: 'We confirm the business problem first',
    t: 'PAIN SIGNALS CONFIRMED',
    r: [
      ['High staff turnover', 'Confirmed'],
      ['Middle managers need support', 'Confirmed'],
      ['AI adoption has stalled', 'Confirmed'],
    ],
  },
  {
    id: 'decision-maker',
    num: '03',
    title: 'Decision Maker',
    h: 'Talk to the decision-maker',
    s: 'The person who signs, not a gatekeeper',
    t: 'DECISION-MAKER VALIDATED',
    r: [
      ['HR Director', 'Business email verified'],
      ['Budget range', 'Shared'],
      ['Timeline', 'This quarter'],
    ],
  },
  {
    id: 'qualified-leads',
    num: '04',
    title: 'Qualified Leads',
    h: 'Pay only for qualified leads',
    s: 'Every lead is graded before it reaches you',
    t: 'LEAD GRADES',
    r: [
      ['Hot', 'Ready to buy now'],
      ['Warm', 'Real need, budget forming'],
      ['Qualified', 'Confirmed pain, earlier stage'],
    ],
  },
];

const CH_AR: StoryChapter[] = [
  {
    id: 'demand',
    num: '٠١',
    title: 'الطلب الموثق',
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
    id: 'pain',
    num: '٠٢',
    title: 'الاحتياج الحقيقي',
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
    id: 'decision-maker',
    num: '٠٣',
    title: 'صانع القرار',
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
    id: 'qualified-leads',
    num: '٠٤',
    title: 'الفرص المؤهلة',
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
  const [activeIdx, setActiveIdx] = useState(0);

  const chapters = isAr ? CH_AR : CH_EN;
  const currentChapter = chapters[activeIdx] || chapters[0];

  useEffect(() => {
    const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

    const onScroll = () => {
      const storyEl = storyRef.current;
      if (!storyEl) return;

      const r = storyEl.getBoundingClientRect();
      const scrollableHeight = r.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const q = cl(-r.top / scrollableHeight);
      const n = chapters.length;
      const i = Math.min(n - 1, Math.floor(q * n));
      setActiveIdx(i);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [chapters.length]);

  return (
    <section ref={storyRef} id="story" className="relative h-[480vh] bg-black select-none">
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black text-white flex items-center">
        {/* Ambient Subtle Background Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[#FF5C00]/5 rounded-full blur-[150px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* LEFT SIDE: Stepper + Headline + Subtitle */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Stepper Titles */}
              <div className="flex flex-wrap lg:flex-col gap-2.5 sm:gap-3.5 mb-5 sm:mb-7 font-mono text-xs">
                {chapters.map((ch, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <div
                      key={ch.id}
                      className={`flex items-center gap-2.5 transition-all duration-300 ${
                        isActive
                          ? 'text-white font-semibold lg:translate-x-1.5 rtl:lg:-translate-x-1.5'
                          : 'text-neutral-500 font-normal hover:text-neutral-300'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 shrink-0 ${
                          isActive
                            ? 'bg-[#FF5C00] shadow-[0_0_10px_#FF5C00] scale-125'
                            : 'bg-white/20'
                        }`}
                      />
                      <span className="text-[11px] sm:text-xs tracking-wide">
                        {ch.num} · {ch.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Main Headline */}
              <h2 className="font-heading font-light text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.08] tracking-tight text-white transition-opacity duration-200">
                {currentChapter.h}
              </h2>

              {/* Subtitle */}
              <p className="mt-4 sm:mt-5 text-neutral-400 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
                {isAr ? 'منظومة التشغيل والربط لـ' : 'Operating System for'}{' '}
                <b className="text-neutral-100 font-medium block sm:inline mt-1 sm:mt-0">
                  {currentChapter.s}
                </b>
              </p>
            </div>

            {/* RIGHT SIDE: Content Facing the Title (En Face, No Black Window Box) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Category Tag & Live Telemetry Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5C00] shadow-[0_0_8px_#FF5C00]" />
                  <span className="text-[#FF5C00] font-mono text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold">
                    {currentChapter.t}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-neutral-500">
                  {isAr ? `المرحلة ${activeIdx + 1} من 4` : `PHASE 0${activeIdx + 1} / 04`}
                </span>
              </div>

              {/* Open, Clean Content Rows directly on black canvas */}
              <div className="divide-y divide-white/10">
                {currentChapter.r.map(([col1, col2], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-4 py-4 sm:py-5.5 transition-all duration-200 group"
                  >
                    <span className="font-normal text-white text-sm sm:text-base lg:text-lg group-hover:text-[#FFA048] transition-colors">
                      {col1}
                    </span>
                    <span className="text-neutral-400 text-end font-light font-mono text-xs sm:text-sm lg:text-base shrink-0">
                      {col2}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Telemetry Status Bar */}
              <div className="pt-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-500 border-t border-white/10">
                <span className="flex items-center gap-2 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
                  {isAr ? 'بيانات مؤكدة ومعتمدة' : 'VERIFIED INTAKE SIGNAL'}
                </span>
                <span>{isAr ? 'الاستجابة: أقل من 48 ساعة' : 'SLA: < 48H DISPATCH'}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
