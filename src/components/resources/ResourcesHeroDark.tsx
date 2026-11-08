'use client';

import React, { useState, useEffect, useRef, useTransition, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Locale, isArabicLocale } from '@/i18n/config';

interface SlideCard {
  id: number;
  number: string;
  badgeEn: string;
  badgeAr: string;
  docTypeEn: string;
  docTypeAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  href: string;
  ctaEn: string;
  ctaAr: string;
  accentColor: string;
}

const CARDS: SlideCard[] = [
  {
    id: 0,
    number: 'DOC // 01',
    badgeEn: 'Featured • 8 min read',
    badgeAr: 'مميز • ٨ دقائق قراءة',
    docTypeEn: 'Q2 REPORT',
    docTypeAr: 'تقرير الربع الثاني',
    titleEn: 'The Future of B2B Training',
    titleAr: 'مستقبل التدريب المؤسسي B2B',
    descEn:
      'How GCC enterprises are shifting from broad catalog subscriptions to verified, outcome-based capability delivery.',
    descAr:
      'كيف تتحول المنشآت في الخليج من الاشتراكات العامة إلى برامج بناء الكفاءات الموجهة بالنتائج وقابلة للقياس.',
    href: '/resources/blog',
    ctaEn: 'Read Brief',
    ctaAr: 'قراءة الملخص',
    accentColor: '#FF5C00',
  },
  {
    id: 1,
    number: 'DOC // 02',
    badgeEn: 'Trends • 12 min read',
    badgeAr: 'اتجاهات • ١٢ دقيقة قراءة',
    docTypeEn: 'TREND STUDY',
    docTypeAr: 'دراسة الاتجاهات',
    titleEn: 'L&D Industry Trends',
    titleAr: 'اتجاهات قطاع التدريب والتطوير',
    descEn:
      'Decentralized learning budgets and why AI-assisted simulation cohorts outperform traditional webinar modules.',
    descAr:
      'لامركزية ميزانيات التعلم ولماذا تتفوق مجموعات المحاكاة المدعومة بالذكاء الاصطناعي على الورش التقليدية.',
    href: '/resources/blog',
    ctaEn: 'Read Brief',
    ctaAr: 'قراءة الملخص',
    accentColor: '#FF5C00',
  },
  {
    id: 2,
    number: 'DOC // 03',
    badgeEn: 'Guide • Case Study',
    badgeAr: 'دليل • دراسة حالة',
    docTypeEn: 'PLAYBOOK',
    docTypeAr: 'دليل تطبيقي',
    titleEn: 'Interactive Strategies',
    titleAr: 'استراتيجيات تفاعلية',
    descEn:
      'Action blueprints for regional enterprises transitioning teams to high-stakes practical labs and verified outcomes.',
    descAr:
      'أدلة تنفيذية للمنشآت الإقليمية لنقل الفرق إلى معامل تطبيقية عالية الكفاءة ونتائج معتمدة.',
    href: '/resources/blog',
    ctaEn: 'Read Brief',
    ctaAr: 'قراءة الملخص',
    accentColor: '#FF5C00',
  },
  {
    id: 3,
    number: 'DOC // 04',
    badgeEn: 'Executive ROI • 5 min',
    badgeAr: 'عائد الاستثمار • ٥ دقائق',
    docTypeEn: 'FINANCE WHITEPAPER',
    docTypeAr: 'ورقة بيضاء مالية',
    titleEn: 'Measuring Capability ROI',
    titleAr: 'قياس العائد على بناء القدرات',
    descEn:
      'Proven audit frameworks to correlate specialized executive training directly with measurable business performance.',
    descAr:
      'أطر تدقيق مثبتة لربط التدريب التنفيذي المتخصص مباشرة بالأداء التشغيلي والمالي للمنشأة.',
    href: '/resources/downloads',
    ctaEn: 'Read Brief',
    ctaAr: 'قراءة الملخص',
    accentColor: '#FF5C00',
  },
];

const TOTAL_CARDS = CARDS.length;

interface ResourcesHeroDarkProps {
  lang: Locale;
  customTitle?: string;
  customSubtitle?: string;
}

export default function ResourcesHeroDark({
  lang,
  customTitle,
  customSubtitle,
}: ResourcesHeroDarkProps) {
  const isAr = isArabicLocale(lang);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isOldDefaultTitle =
    !customTitle ||
    customTitle.toLowerCase().includes('the pontlook l&d resource hub') ||
    customTitle.toLowerCase().includes('مركز موارد التدريب والتطوير في pontlook');

  const displayTitle = isOldDefaultTitle
    ? isAr
      ? 'مركز موارد التدريب والتطوير'
      : 'L&D Resource Hub'
    : customTitle;

  const isOldDefaultSubtitle =
    !customSubtitle ||
    customSubtitle.toLowerCase().includes('insights, strategies, and resources to help organisations build stronger workforces') ||
    customSubtitle.includes('رؤى واستراتيجيات وموارد لمساعدة المنشآت على بناء كوادر أقوى');

  const displaySubtitle = isOldDefaultSubtitle
    ? isAr
      ? 'استكشف أحدث الرؤى العملية، واتجاهات القطاع، ومستقبل تدريب وتطوير الكفاءات المؤسسية.'
      : 'Explore actionable insights, industry trends, and the future of enterprise training.'
    : customSubtitle;

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  }, []);

  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TOTAL_CARDS);
  }, []);

  const prevCard = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TOTAL_CARDS) % TOTAL_CARDS);
  }, []);

  const selectCard = (idx: number) => {
    if (idx === currentIndex) return;
    setCurrentIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight') {
        if (isAr) prevCard();
        else nextCard();
      } else if (e.key === 'ArrowLeft') {
        if (isAr) nextCard();
        else prevCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAr, nextCard, prevCard]);

  // Touch Swipe for Mobile / Tablet
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (diff > 45) {
        if (isAr) nextCard();
        else prevCard();
      } else if (diff < -45) {
        if (isAr) prevCard();
        else nextCard();
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isAr, nextCard, prevCard]);

  const handleFilterClick = (filterId: string, cardIdx: number, filterLabel: string) => {
    setActiveFilter(filterId);
    selectCard(cardIdx);
    showToast(isAr ? `تم التصنيف حسب: ${filterLabel}` : `Filtered by: ${filterLabel}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    startTransition(() => {
      router.push(`/${lang}/resources/blog?q=${encodeURIComponent(searchQuery.trim())}`);
    });
  };

  const handleDownloadGuide = () => {
    showToast(
      isAr
        ? 'جاري تجهيز دليل PontLook الشامل للموارد التدريبية...'
        : 'Compiling PontLook Q2 Intelligence PDF Guide...'
    );
    setTimeout(() => {
      router.push(`/${lang}/resources/downloads`);
    }, 900);
  };

  // 3D Depth Card Transform Calculator (Precision Vector Geometry)
  const getCardStyle = (i: number): React.CSSProperties => {
    const relativePos = (i - currentIndex + TOTAL_CARDS) % TOTAL_CARDS;
    const sign = isAr ? -1 : 1;

    if (relativePos === 0) {
      return {
        transform: `translateX(0px) translateY(0px) translateZ(0px) rotateY(${sign * -4}deg) rotateX(1deg) scale(1)`,
        opacity: 1,
        zIndex: 40,
        filter: 'brightness(1.02) blur(0px)',
        pointerEvents: 'auto',
      };
    } else if (relativePos === 1) {
      return {
        transform: `translateX(${sign * 85}px) translateY(-12px) translateZ(-80px) rotateY(${sign * -14}deg) rotateX(2deg) scale(0.92)`,
        opacity: 0.6,
        zIndex: 30,
        filter: 'brightness(0.7) blur(0.5px)',
        pointerEvents: 'auto',
      };
    } else if (relativePos === 2) {
      return {
        transform: `translateX(${sign * 160}px) translateY(-24px) translateZ(-160px) rotateY(${sign * -20}deg) rotateX(3deg) scale(0.85)`,
        opacity: 0.35,
        zIndex: 20,
        filter: 'brightness(0.48) blur(1px)',
        pointerEvents: 'auto',
      };
    } else {
      return {
        transform: `translateX(${sign * 220}px) translateY(-36px) translateZ(-240px) rotateY(${sign * -24}deg) scale(0.78)`,
        opacity: 0.15,
        zIndex: 10,
        filter: 'brightness(0.3) blur(2px)',
        pointerEvents: 'none',
      };
    }
  };

  const filters = [
    { id: 'all', labelEn: '[ All ]', labelAr: '[ الكل ]', cardIdx: 0 },
    { id: 'trends', labelEn: 'Industry Trends', labelAr: 'اتجاهات القطاع', cardIdx: 1 },
    { id: 'cases', labelEn: 'Case Studies', labelAr: 'دراسات الحالة', cardIdx: 2 },
    { id: 'stories', labelEn: 'Success Stories', labelAr: 'قصص النجاح', cardIdx: 0 },
    { id: 'whitepapers', labelEn: 'Whitepapers', labelAr: 'أوراق بيضاء', cardIdx: 3 },
  ];

  return (
    <section className="relative w-full bg-black text-slate-100 rounded-b-[2.5rem] sm:rounded-b-[3.5rem] lg:rounded-b-[48px] overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 border-b border-neutral-900 shadow-2xl selection:bg-[#FF5C00]/30 selection:text-white">
      {/* 1. Soft atmospheric light glow without grid lines or squares */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 65% 45%, rgba(255, 92, 0, 0.08) 0%, rgba(234, 88, 12, 0.02) 40%, transparent 75%)',
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 2. Main Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Typographic Pitch, Filter Bar & Trust Metrics */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-7">
            {/* Main Headline & Subtitle */}
            <div className="space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-md">
                {displayTitle}
              </h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-md font-normal leading-relaxed">
                {displaySubtitle}
              </p>
            </div>

            {/* Filter Pills Bar + Inline Search */}
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-2xl w-full max-w-xl overflow-x-auto no-scrollbar backdrop-blur-md shadow-lg">
              {filters.map((f) => {
                const isActive = activeFilter === f.id;
                const label = isAr ? f.labelAr : f.labelEn;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleFilterClick(f.id, f.cardIdx, label)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-white bg-white/15 shadow-sm border border-white/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

              {/* Search Toggle / Input */}
              <div className="ms-auto flex items-center pr-1.5">
                {isSearchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center gap-1">
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={isAr ? 'بحث...' : 'Search...'}
                      className="w-28 sm:w-36 bg-white/10 text-xs text-white placeholder:text-slate-500 rounded-lg px-2.5 py-1 outline-none border border-[#FF5C00]/50 focus:border-[#FF5C00]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="text-slate-400 hover:text-white text-xs px-1"
                    >
                      ✕
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 text-slate-400 hover:text-white transition rounded-lg hover:bg-white/10 cursor-pointer"
                    title={isAr ? 'ابحث في الموارد' : 'Search Hub'}
                    aria-label="Search Hub"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Metric Micro-Callout for Enterprise B2B Trust */}
            <div className="pt-4 border-t border-white/5 flex items-center gap-6 sm:gap-8 text-xs text-slate-400">
              <div>
                <span className="block text-xl font-bold font-heading text-white tracking-tight">
                  84%
                </span>
                <span className="text-slate-400 text-[11px]">
                  {isAr ? 'معدل تبني التدريب بالخليج' : 'GCC L&D adoption'}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <span className="block text-xl font-bold font-heading text-white tracking-tight">
                  3.2x
                </span>
                <span className="text-slate-400 text-[11px]">
                  {isAr ? 'مؤشر استبقاء المهارات' : 'Skill retention index'}
                </span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]" />
                </span>
                <span className="text-[11px] text-slate-300">
                  {isAr ? 'جلسات الربع الثاني متاحة' : 'Q2 Briefings live'}
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 3D Depth Card Carousel (The Focal Stack)    */}
          {/* ========================================================= */}
          <div
            className="lg:col-span-7 relative h-[480px] sm:h-[520px] flex items-center justify-center select-none"
            style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
          >
            <div
              ref={containerRef}
              className="relative w-full max-w-[340px] sm:max-w-[420px] h-[450px]"
            >
              {CARDS.map((card, i) => {
                const isActive = currentIndex === i;
                const style = getCardStyle(i);

                return (
                  <article
                    key={card.id}
                    onClick={() => selectCard(i)}
                    style={{
                      ...style,
                      transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                      willChange: 'transform, opacity, filter',
                    }}
                    className={`absolute inset-0 rounded-2xl p-7 flex flex-col justify-between cursor-pointer ${
                      isActive
                        ? 'border border-[#FF5C00]/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,1),0_0_40px_-5px_rgba(255,92,0,0.35),inset_0_1px_2px_0_rgba(255,255,255,0.25)]'
                        : 'border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95),inset_0_1px_1px_0_rgba(255,255,255,0.12)]'
                    }`}
                  >
                    {/* Background Glass Gradient */}
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(20, 22, 28, 0.96) 0%, rgba(10, 11, 15, 0.98) 100%)',
                      }}
                    />

                    {/* Folder Tab Notch Effect */}
                    <div
                      className={`absolute -top-[10px] w-[90px] h-[12px] bg-[#14161c] border-t border-l border-r border-white/20 rounded-t-[6px] pointer-events-none ${
                        isAr ? 'right-7' : 'left-7'
                      }`}
                    />

                    {/* Content Layers (Relative for Z-Index Above Background) */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      {/* Header Meta */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <span
                          className={`text-[11px] uppercase tracking-wider font-semibold flex items-center gap-2 ${
                            isActive ? 'text-[#FF5C00]' : 'text-slate-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full inline-block ${
                              isActive
                                ? 'bg-[#FF5C00] shadow-[0_0_8px_#FF5C00]'
                                : 'bg-slate-400'
                            }`}
                          />
                          {isAr ? card.badgeAr : card.badgeEn}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono tracking-wider">
                          {card.number}
                        </span>
                      </div>

                      {/* Central Pure Vector SVG Visualizations */}
                      <div className="my-4 h-28 w-full rounded-xl bg-white/[0.02] border border-white/5 p-3 flex items-center justify-center relative overflow-hidden transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF5C00]/10 to-transparent pointer-events-none" />

                        {/* Card 0: Minimal Curved Line Metric Chart */}
                        {card.id === 0 && (
                          <svg
                            className="w-full h-full text-slate-400"
                            viewBox="0 0 320 90"
                            fill="none"
                            stroke="currentColor"
                          >
                            <line
                              x1="10"
                              y1="80"
                              x2="310"
                              y2="80"
                              stroke="rgba(255,255,255,0.06)"
                              strokeDasharray="3 3"
                            />
                            <line
                              x1="10"
                              y1="10"
                              x2="10"
                              y2="80"
                              stroke="rgba(255,255,255,0.06)"
                              strokeDasharray="3 3"
                            />
                            <path
                              d="M 20 60 C 100 65, 140 45, 160 45 C 180 45, 230 25, 300 20"
                              stroke="#FF5C00"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M 20 70 C 110 70, 140 45, 160 45 C 180 45, 220 58, 300 55"
                              stroke="rgba(148, 163, 184, 0.25)"
                              strokeWidth="1.2"
                              strokeDasharray="2 2"
                            />
                            <circle cx="160" cy="45" r="4" fill="#FF5C00" />
                            <circle
                              cx="160"
                              cy="45"
                              r="9"
                              stroke="#FF5C00"
                              strokeOpacity="0.35"
                              strokeWidth="1.5"
                            />
                          </svg>
                        )}

                        {/* Card 1: Isometric 3D Wireframe Cube */}
                        {card.id === 1 && (
                          <svg
                            className="w-24 h-24 text-slate-500"
                            viewBox="0 0 100 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          >
                            <polygon
                              points="50,15 85,32 50,49 15,32"
                              stroke="rgba(255,255,255,0.4)"
                              fill="rgba(255,255,255,0.02)"
                            />
                            <polygon
                              points="15,32 50,49 50,85 15,68"
                              stroke="rgba(255,255,255,0.2)"
                            />
                            <polygon
                              points="50,49 85,32 85,68 50,85"
                              stroke="rgba(255,255,255,0.3)"
                            />
                            <line
                              x1="50"
                              y1="49"
                              x2="50"
                              y2="20"
                              stroke="#FF5C00"
                              strokeDasharray="2 2"
                              strokeOpacity="0.9"
                            />
                          </svg>
                        )}

                        {/* Card 2: Abstract Open Folio Graphic */}
                        {card.id === 2 && (
                          <svg
                            className="w-24 h-24 text-slate-400"
                            viewBox="0 0 100 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          >
                            <path
                              d="M20 70 C 35 60, 45 60, 50 68 C 55 60, 65 60, 80 70 L 80 35 C 65 25, 55 25, 50 33 C 45 25, 35 25, 20 35 Z"
                              stroke="rgba(255,255,255,0.4)"
                            />
                            <line
                              x1="50"
                              y1="33"
                              x2="50"
                              y2="68"
                              stroke="rgba(255,255,255,0.3)"
                            />
                            <circle cx="50" cy="50" r="3" fill="#FF5C00" />
                          </svg>
                        )}

                        {/* Card 3: Ascending Capability ROI Step Graphic */}
                        {card.id === 3 && (
                          <svg
                            className="w-28 h-24 text-slate-400"
                            viewBox="0 0 100 100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          >
                            <line
                              x1="20"
                              y1="75"
                              x2="35"
                              y2="75"
                              stroke="rgba(255,255,255,0.4)"
                            />
                            <line
                              x1="35"
                              y1="75"
                              x2="35"
                              y2="55"
                              stroke="rgba(255,255,255,0.4)"
                            />
                            <line
                              x1="35"
                              y1="55"
                              x2="55"
                              y2="55"
                              stroke="rgba(255,255,255,0.4)"
                            />
                            <line
                              x1="55"
                              y1="55"
                              x2="55"
                              y2="35"
                              stroke="rgba(255,255,255,0.4)"
                            />
                            <line
                              x1="55"
                              y1="35"
                              x2="80"
                              y2="35"
                              stroke="rgba(255,255,255,0.4)"
                            />
                            <circle cx="80" cy="35" r="4" fill="#FF5C00" />
                          </svg>
                        )}
                      </div>

                      {/* Title & Brief Excerpt */}
                      <div className="space-y-2">
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                          {isAr ? card.titleAr : card.titleEn}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed line-clamp-3">
                          {isAr ? card.descAr : card.descEn}
                        </p>
                      </div>

                      {/* Card Footer Action */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <Link
                          href={`/${lang}${card.href}`}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-[#FF5C00] transition-colors group"
                        >
                          <span>{isAr ? card.ctaAr : card.ctaEn}</span>
                          <span className="text-xs transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                            ↗
                          </span>
                        </Link>
                        <span className="text-[11px] text-slate-400 font-mono tracking-wider">
                          {isAr ? card.docTypeAr : card.docTypeEn}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM INTERACTIVE BAR: Counter, Controls & PDF Action    */}
        {/* ========================================================= */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Pagination Counter & Direction Buttons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm sm:text-base font-mono tracking-widest">
              <span className="font-bold text-white">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-400">04</span>
            </div>

            <div className="flex items-center gap-1.5 ms-2">
              <button
                type="button"
                onClick={prevCard}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
                aria-label={isAr ? 'البطاقة السابقة' : 'Previous Brief'}
              >
                <svg
                  className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={nextCard}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
                aria-label={isAr ? 'البطاقة التالية' : 'Next Brief'}
              >
                <svg
                  className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Download Complete PDF Guide Action */}
          <button
            type="button"
            onClick={handleDownloadGuide}
            className="group flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition-colors py-2 px-3.5 rounded-lg hover:bg-white/5 cursor-pointer"
          >
            <span>
              {isAr ? 'تحميل دليل تقارير التدريب كاملاً (PDF)' : 'Download Complete PDF Guide'}
            </span>
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-[#FF5C00] group-hover:translate-y-0.5 transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/95 border border-[#FF5C00]/40 text-orange-200 text-xs px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-xl transition-all duration-300 flex items-center gap-2 ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <svg className="w-4 h-4 text-[#FF5C00] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>{toastMessage}</span>
      </div>
    </section>
  );
}
