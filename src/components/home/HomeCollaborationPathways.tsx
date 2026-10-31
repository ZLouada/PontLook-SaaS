'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';

interface HomeCollaborationPathwaysProps {
  isAr?: boolean;
  lang: string;
  dict?: any;
}

interface StoryChapter {
  id: string;
  num: string;
  badge: string;
  title: string;
  desc: string;
  previewHeader: string;
  rows: [string, string][];
  protocol: string;
  ctaText: string;
  ctaHref: string;
}

export default function HomeCollaborationPathways({
  isAr = false,
  lang,
  dict,
}: HomeCollaborationPathwaysProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const exp = dict?.experience_cards;

  const chaptersEn: StoryChapter[] = [
    {
      id: 'provider',
      num: '01',
      badge: 'For Training Firms',
      title:
        exp?.cards?.provider?.title ||
        'Deliver Training to Ready Corporate Clients',
      desc:
        exp?.cards?.provider?.subtitle ||
        'Partner with qualified GCC enterprises that have active corporate budgets and confirmed decision-maker buy-in.',
      previewHeader:
        exp?.cards?.provider?.previewHeader ||
        'PARTNER PIPELINE · ACTIVE ENGAGEMENTS',
      rows: [
        ['Verified Corporate Budgets', 'Pre-approved SAR / AED'],
        ['Direct Executive Access', 'Meet CHROs & CLOs directly'],
        ['Zero Retainer Risk', 'Pay only for qualified leads'],
      ],
      protocol: 'PROTOCOL · PROVIDER NETWORK',
      ctaText: exp?.cards?.provider?.cta || 'Join as a Training Provider',
      ctaHref: `/${lang}/for-providers`,
    },
    {
      id: 'enterprise',
      num: '02',
      badge: 'For Enterprises',
      title:
        exp?.cards?.enterprise?.title ||
        'Find & Match with Vetted Training Specialists',
      desc:
        exp?.cards?.enterprise?.subtitle ||
        'Tell us your workforce challenge and get directly matched with verified providers equipped to solve it.',
      previewHeader:
        exp?.cards?.enterprise?.previewHeader ||
        'ENTERPRISE MATCHING · CURATED PROGRAM',
      rows: [
        ['100% Free for Buyers', '$0 Platform Fees'],
        ['Curated Precision', '2 to 3 handpicked proposals'],
        ['Zero Procurement Friction', 'No cold calls or vendor spam'],
      ],
      protocol: 'PROTOCOL · ENTERPRISE MATCH',
      ctaText: exp?.cards?.enterprise?.cta || 'Find a Training Specialist',
      ctaHref: `/${lang}/find-training`,
    },
    {
      id: 'knowledge',
      num: '03',
      badge: 'Knowledge & Research',
      title:
        exp?.cards?.hub?.title ||
        'Explore Actionable L&D Insights & Guides',
      desc:
        exp?.cards?.hub?.subtitle ||
        'Dive into free, research-backed frameworks, workforce reports, and practical guides on regional talent trends.',
      previewHeader:
        exp?.cards?.hub?.previewHeader ||
        'KNOWLEDGE HUB · OPEN ACCESS TOOLKITS',
      rows: [
        ['Workforce Benchmarks', 'GCC skill shortage & talent reports'],
        ['Diagnostic Frameworks', 'Step-by-step L&D audit templates'],
        ['Practical ROI Case Studies', 'Real corporate impact data'],
      ],
      protocol: 'PROTOCOL · OPEN ACCESS',
      ctaText: exp?.cards?.hub?.cta || 'Explore Free Resources',
      ctaHref: `/${lang}/resources`,
    },
    {
      id: 'advisory',
      num: '04',
      badge: 'Executive Advisory',
      title:
        exp?.cards?.consultation?.title ||
        'Need Guidance? Speak Directly with Our Team',
      desc:
        exp?.cards?.consultation?.subtitle ||
        "Have unique workforce requirements or want to learn how PontLook works for your organization? We're here to help.",
      previewHeader:
        exp?.cards?.consultation?.previewHeader ||
        'DIRECT ADVISORY · EXECUTIVE CONSULTATION',
      rows: [
        ['1-on-1 Consultation', 'Discuss exact workforce objectives'],
        ['Custom Provider Roadmap', 'Tailored scouting & qualification'],
        ['Response SLA', 'Within 24 Hours · Confidential'],
      ],
      protocol: 'PROTOCOL · EXECUTIVE CONSULT',
      ctaText: exp?.cards?.consultation?.cta || 'Book a Discovery Call',
      ctaHref: `/${lang}/contact`,
    },
  ];

  const chaptersAr: StoryChapter[] = [
    {
      id: 'provider',
      num: '٠١',
      badge: 'لمزودي ومراكز التدريب',
      title:
        exp?.cards?.provider?.title ||
        'قدم التدريب لعملاء مؤسسيين جاهزين',
      desc:
        exp?.cards?.provider?.subtitle ||
        'ارتبط بمنشآت خليجية مؤهلة تمتلك ميزانيات تدريبية معتمدة وموافقة تنفيذية مؤكدة.',
      previewHeader:
        exp?.cards?.provider?.previewHeader ||
        'خط أنابيب الشركاء · مشاريع نشطة',
      rows: [
        ['ميزانيات معتمدة ومخصصة', 'تمويل مؤكد بالريال والدرهم'],
        ['وصول تنفيذي مباشر', 'مديرو الموارد البشرية والتدريب'],
        ['انعدام مخاطرة الاشتراكات', 'دفع حصري مقابل الفرص المؤهلة'],
      ],
      protocol: 'بروتوكول · شبكة المزودين',
      ctaText: exp?.cards?.provider?.cta || 'قدم للانضمام إلى الشبكة',
      ctaHref: `/${lang}/for-providers`,
    },
    {
      id: 'enterprise',
      num: '٠٢',
      badge: 'للشركات والمؤسسات',
      title:
        exp?.cards?.enterprise?.title ||
        'اعثر على خبير التدريب الأنسب لفريقك',
      desc:
        exp?.cards?.enterprise?.subtitle ||
        'أخبرنا بما يحتاج فريقك إلى إتقانه. نختار لك 2 إلى 3 عروض لخبراء معتمدين خلال 48 ساعة.',
      previewHeader:
        exp?.cards?.enterprise?.previewHeader ||
        'مطابقة المنشآت · برنامج منتقى',
      rows: [
        ['مجاني 100% للشركات', 'صفر رسوم منصة أو عمولات خفية'],
        ['دقة الاختيار والتوفيق', 'من 2 إلى 3 عروض منتقاة بعناية'],
        ['انعدام التعقيدات الإدارية', 'بدون مكالمات عشوائية أو إزعاج'],
      ],
      protocol: 'بروتوكول · مطابقة المنشآت',
      ctaText: exp?.cards?.enterprise?.cta || 'اطلب مطابقة تدريبية',
      ctaHref: `/${lang}/find-training`,
    },
    {
      id: 'knowledge',
      num: '٠٣',
      badge: 'مركز المعرفة والأبحاث',
      title:
        exp?.cards?.hub?.title ||
        'حمّل أدلة ونماذج التطوير المؤسسي العملية',
      desc:
        exp?.cards?.hub?.subtitle ||
        'معايير فجوات المهارات الخليجية، وبيانات التوطين، ونماذج قياس أثر التدريب وعائده — مجاناً بالكامل.',
      previewHeader:
        exp?.cards?.hub?.previewHeader ||
        'مركز المعرفة · أدلة مفتوحة الوصول',
      rows: [
        ['مؤشرات القوى العاملة', 'تقارير نقص الكفاءات ونسب التوطين'],
        ['أطر عمل تشخيصية', 'نماذج وقوائم تدقيق الاحتياج خطوة بخطوة'],
        ['دراسات حالة واقعية', 'بيانات حقيقية لقياس أثر التدريب'],
      ],
      protocol: 'بروتوكول · وصول مفتوح',
      ctaText: exp?.cards?.hub?.cta || 'تصفح الأدلة والموارد',
      ctaHref: `/${lang}/resources`,
    },
    {
      id: 'advisory',
      num: '٠٤',
      badge: 'استشارة تنفيذية خاصة',
      title:
        exp?.cards?.consultation?.title ||
        'استشارة مباشرة مع فريق خبراء بونت لوك',
      desc:
        exp?.cards?.consultation?.subtitle ||
        'ناقش متطلبات التدريب المؤسسي الخاصة بمنشأتك مباشرة مع فريقنا الاستشاري.',
      previewHeader:
        exp?.cards?.consultation?.previewHeader ||
        'استشارة مباشرة · جلسة تنفيذية',
      rows: [
        ['استشارة فردية مخصصة', 'مراجعة مستهدفات منشأتكم التدريبية'],
        ['خارطة طريق مخصصة', 'تحديد واختيار المزودين الأنسب لاحتياجكم'],
        ['سرعة الاستجابة', 'خلال 24 ساعة · سرية تامة 100%'],
      ],
      protocol: 'بروتوكول · استشارة تنفيذية',
      ctaText: exp?.cards?.consultation?.cta || 'احجز مكالمة استكشافية',
      ctaHref: `/${lang}/contact`,
    },
  ];

  const chapters = isAr ? chaptersAr : chaptersEn;
  const currentChapter = chapters[activeIdx] || chapters[0];

  const updateScrollIndex = useCallback(() => {
    const storyEl = storyRef.current;
    if (!storyEl) return;

    const r = storyEl.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const scrollableHeight = r.height - vh;

    if (scrollableHeight <= 0) return;

    // When the top of storyEl passes 0, user is scrolling through this section
    const progress = Math.min(1, Math.max(0, -r.top / scrollableHeight));
    const n = chapters.length;
    const nextIdx = Math.min(n - 1, Math.floor(progress * n));

    setActiveIdx(nextIdx);
  }, [chapters.length]);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollIndex();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollIndex();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [updateScrollIndex]);

  const scrollToChapter = (idx: number) => {
    const storyEl = storyRef.current;
    if (!storyEl) return;

    const r = storyEl.getBoundingClientRect();
    const vh = window.innerHeight || 800;
    const scrollableHeight = r.height - vh;
    const currentScrollY = window.scrollY || window.pageYOffset;

    // Precise absolute document coordinate
    const targetScroll =
      currentScrollY + r.top + (idx / chapters.length + 0.02) * scrollableHeight;

    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section
      ref={storyRef}
      id="collaboration-pathways"
      className="relative h-[280vh] md:h-[400vh] bg-black select-none touch-pan-y border-t border-white/20"
    >
      {/* Sticky 100svh Viewport */}
      <div className="sticky top-0 h-[100svh] min-h-[580px] overflow-hidden bg-black text-white flex items-center touch-pan-y">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center">
            
            {/* LEFT SIDE: Stepper + Headline + Subtitle + Action CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Upper Eyebrow Context */}
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
                {isAr
                  ? 'مسارات التعاون والربط المؤسسي · 4 خيارات'
                  : 'COLLABORATION PATHWAYS · 4 OPTIONS'}
              </div>

              {/* Stepper Titles (Pure Black & White) */}
              <div className="flex flex-wrap lg:flex-col gap-2.5 sm:gap-3 mb-5 sm:mb-7 font-mono text-xs">
                {chapters.map((ch, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => scrollToChapter(idx)}
                      className={`flex items-center gap-2.5 transition-all duration-200 text-start cursor-pointer outline-none ${
                        isActive
                          ? 'text-white font-semibold lg:translate-x-1.5 rtl:lg:-translate-x-1.5'
                          : 'text-neutral-500 font-normal hover:text-neutral-300'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-200 shrink-0 ${
                          isActive
                            ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] scale-125'
                            : 'bg-white/20'
                        }`}
                      />
                      <span className="text-[11px] sm:text-xs tracking-wide">
                        {ch.num} · {ch.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Main Headline */}
              <h2 className="font-heading font-semibold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.08] text-white transition-opacity duration-200">
                {currentChapter.title}
              </h2>

              {/* Subtitle */}
              <p className="mt-3 sm:mt-5 font-sans text-sm sm:text-base md:text-lg text-neutral-400 leading-relaxed font-normal max-w-xl">
                {currentChapter.desc}
              </p>

              {/* Action Buttons (Pure Black & White) */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={currentChapter.ctaHref}
                  className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-black text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-black hover:text-white transition-colors duration-200"
                >
                  <span>{currentChapter.ctaText}</span>
                  <ArrowRight size={14} className="ms-2 rtl:-scale-x-100" />
                </Link>
                <Link
                  href={`/${lang}/resources`}
                  className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-transparent text-white text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-white hover:text-black transition-colors duration-200"
                >
                  <span>{isAr ? 'تصفح المدونة' : 'Browse Resources'}</span>
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE: Content Facing the Title (Pure Black & White Canvas) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Category Tag & Live Telemetry Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  <span className="text-white font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] font-semibold">
                    {currentChapter.previewHeader}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono text-neutral-400">
                  {isAr
                    ? `المسار ${activeIdx + 1} من 04`
                    : `OPTION 0${activeIdx + 1} / 04`}
                </span>
              </div>

              {/* Open, Clean Content Rows directly on black canvas */}
              <div className="divide-y divide-white/10">
                {currentChapter.rows.map(([col1, col2], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-4 py-4 sm:py-5.5 transition-all duration-200 group"
                  >
                    <span className="font-normal text-white text-sm sm:text-base lg:text-lg group-hover:text-white transition-colors">
                      {col1}
                    </span>
                    <span className="text-neutral-400 text-end font-light font-mono text-xs sm:text-sm lg:text-base shrink-0">
                      {col2}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Telemetry Status Bar (Pure Black & White) */}
              <div className="pt-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-400 border-t border-white/20">
                <span className="flex items-center gap-2 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                  {isAr ? 'بروتوكول ربط معتمد' : 'VERIFIED PARTNERSHIP PROTOCOL'}
                </span>
                <span className="text-neutral-400 uppercase tracking-wider font-mono">
                  {currentChapter.protocol}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
