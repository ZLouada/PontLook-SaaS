'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Locale, isArabicLocale } from '@/i18n/config';
import { Search, ArrowUpRight, ArrowRight } from '@/components/icons';

interface SlideResource {
  id: number;
  number: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  badgeEn: string;
  badgeAr: string;
  ctaEn: string;
  ctaAr: string;
  href: string;
}

const SLIDES: SlideResource[] = [
  {
    id: 0,
    number: '01',
    titleEn: 'The Future of B2B Training',
    titleAr: 'مستقبل تدريب الشركات B2B',
    excerptEn:
      'The future of B2B training is explored in depth, examining how data and innovative frameworks drive real workforce impact.',
    excerptAr:
      'استكشاف معمّق لمستقبل التدريب المؤسسي وتوظيف تحليلات البيانات لقياس العائد ورفع كفاءة فرق العمل.',
    badgeEn: 'GUIDE • Case Study',
    badgeAr: 'دليل • دراسة حالة',
    ctaEn: 'Read Article',
    ctaAr: 'قراءة المقال',
    href: '/resources/blog',
  },
  {
    id: 1,
    number: '02',
    titleEn: 'L&D Industry Trends',
    titleAr: 'اتجاهات قطاع التدريب والتطوير',
    excerptEn:
      'Key metrics and data-driven shifts shaping corporate learning priorities, regional nationalization, and talent retention in 2025.',
    excerptAr:
      'أبرز المؤشرات والتحولات القائمة على البيانات لتشكيل أولويات التدريب المؤسسي ومستهدفات التوطين واستبقاء المواهب.',
    badgeEn: 'REPORT • Market Analysis',
    badgeAr: 'تقرير • تحليل السوق',
    ctaEn: 'Explore Trends',
    ctaAr: 'استكشف الاتجاهات',
    href: '/resources/blog',
  },
  {
    id: 2,
    number: '03',
    titleEn: 'Interactive Strategies',
    titleAr: 'استراتيجيات تفاعلية',
    excerptEn:
      'Actionable frameworks and immersive learning playbooks designed to maximize employee engagement and skill acquisition.',
    excerptAr:
      'أطر عمل عملية وأدلة تطبيقية مصممة لرفع التفاعل المؤسسي وتسريع اكتساب المهارات التطبيقية.',
    badgeEn: 'PDF • 8 min read',
    badgeAr: 'ملف PDF • ٨ دقائق قراءة',
    ctaEn: 'Download Guide',
    ctaAr: 'تحميل الدليل',
    href: '/resources/downloads',
  },
  {
    id: 3,
    number: '04',
    titleEn: 'Enterprise Workforce Transformation',
    titleAr: 'التحول الشامل للقوى العاملة',
    excerptEn:
      'Executive blueprints for scaling capability building, aligning competency models with Vision 2030, and proving business ROI.',
    excerptAr:
      'أدلة تنفيذية لقياس العائد على التدريب ومواءمة برامج التطوير مع المعايير المعتمدة وأولويات القيادة.',
    badgeEn: 'WHITEPAPER • Executive Brief',
    badgeAr: 'ورقة بيضاء • ملخص تنفيذي',
    ctaEn: 'Read Brief',
    ctaAr: 'قراءة الملخص',
    href: '/resources',
  },
];

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

  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

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

  const slide = SLIDES[activeSlide];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    startTransition(() => {
      router.push(`/${lang}/resources/blog?q=${encodeURIComponent(searchQuery.trim())}`);
    });
  };

  const topics = [
    { labelEn: 'Featured', labelAr: 'المميز', href: `/${lang}/resources` },
    { labelEn: 'All', labelAr: 'الكل', href: `/${lang}/resources` },
    { labelEn: 'Industry Trends', labelAr: 'اتجاهات القطاع', href: `/${lang}/resources/blog` },
    { labelEn: 'Success Stories', labelAr: 'قصص النجاح', href: `/${lang}/resources/blog` },
    { labelEn: 'Whitepapers', labelAr: 'تقارير تنفيذية', href: `/${lang}/resources/downloads` },
  ];

  return (
    <section className="relative w-full bg-black text-white rounded-b-[2.5rem] sm:rounded-b-[3.5rem] lg:rounded-b-[48px] overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12 lg:pb-14 border-b border-neutral-900 shadow-2xl">
      {/* Subtle global technical grid backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-30 select-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* ========================================================================= */}
        {/* DESKTOP 1:1 COMPOSITION (lg and above): EXACT COPY OF REFERENCE MOCKUP    */}
        {/* ========================================================================= */}
        <div className="hidden lg:block relative w-full aspect-[1024/517] max-w-[1360px] mx-auto rounded-3xl overflow-hidden select-none">
          {/* Master 2x Retina Artwork: Wireframe Diagram, 3D Cubes, Connecting Nodes */}
          <Image
            src="/images/resources/hero-canvas-background@2x.webp"
            alt="L&D Resource Network Visualisation"
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1360px"
            className="object-cover object-center select-none pointer-events-none"
          />

          {/* 1. ONE CRISP TITLE (Single Line Across Top-Left to Mid): "L&D Resource Hub" */}
          <div
            className={`absolute top-[8.5%] z-20 ${
              isAr ? 'right-[5.27%]' : 'left-[5.27%]'
            }`}
          >
            <h1 className="font-heading font-extrabold text-white tracking-tight leading-none whitespace-nowrap drop-shadow-md text-[clamp(2.2rem,4.1vw,3.85rem)]">
              {displayTitle}
            </h1>
          </div>

          {/* 2. CRISP VECTOR SUBTITLE (Directly below Title) */}
          <div
            className={`absolute top-[22.8%] z-20 max-w-[37%] ${
              isAr ? 'right-[5.27%]' : 'left-[5.27%]'
            }`}
          >
            <p className="font-sans text-neutral-300 font-normal leading-relaxed text-[clamp(11px,1.15vw,15px)]">
              {displaySubtitle}
            </p>
          </div>

          {/* 3. VERTICAL TOPIC FILTER (Left of Card) */}
          <div
            className={`absolute top-[46.5%] z-20 h-[44%] flex items-center justify-end ${
              isAr ? 'right-[3.0%]' : 'left-[3.0%]'
            }`}
          >
            <div
              className={`flex items-center gap-2.5 text-[10px] xl:text-[11px] tracking-wider text-neutral-500 [writing-mode:vertical-rl] ${
                isAr ? 'rotate-0' : 'rotate-180'
              }`}
            >
              <span className="font-sans font-bold text-white tracking-normal text-xs">
                {isAr ? 'تصنيف المحتوى' : 'Filter by Topic'}
              </span>
              <span className="text-neutral-700">|</span>
              <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
                {topics.map((t, idx) => (
                  <React.Fragment key={idx}>
                    <Link
                      href={t.href}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {isAr ? t.labelAr : t.labelEn}
                    </Link>
                    {idx < topics.length - 1 && <span className="text-neutral-700">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* 4. FUNCTIONAL SEARCH BAR (Directly below Subtitle, above Card) */}
          <form
            onSubmit={handleSearchSubmit}
            className={`absolute top-[34.2%] z-20 w-[22.8%] h-[7.5%] min-h-[38px] ${
              isAr ? 'right-[10.55%]' : 'left-[10.55%]'
            }`}
          >
            <div className="relative w-full h-full flex items-center rounded-xl border border-neutral-800 bg-[#0C0D12]/90 hover:border-neutral-600 focus-within:border-neutral-400 transition-all duration-200 px-3.5 backdrop-blur-md shadow-lg">
              <Search
                size={14}
                className="text-neutral-400 shrink-0 me-2.5 transition-colors group-focus-within:text-white"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في الرؤى والأبحاث...' : 'search insights...'}
                className="w-full bg-transparent text-xs xl:text-sm text-white placeholder:text-neutral-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-500 hover:text-white text-xs px-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* 5. INTERACTIVE FEATURED CARD (Directly below Search Bar) */}
          <div
            className={`absolute top-[46.0%] z-20 w-[22.8%] h-[45%] rounded-2xl border border-white/15 bg-[#0C0D12]/95 p-4 xl:p-5 flex flex-col justify-between backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/30 group ${
              isAr ? 'right-[10.55%]' : 'left-[10.55%]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] xl:text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  {isAr ? slide.badgeAr : slide.badgeEn}
                </span>
                <span className="font-mono text-[9px] xl:text-[10px] text-neutral-500 tabular-nums">
                  {slide.number} / 04
                </span>
              </div>

              <h3 className="font-heading text-sm xl:text-base font-bold text-white tracking-tight mb-1.5 line-clamp-2 group-hover:text-white transition-colors">
                {isAr ? slide.titleAr : slide.titleEn}
              </h3>

              <p className="font-sans text-[11px] xl:text-xs text-neutral-400 leading-relaxed line-clamp-3">
                {isAr ? slide.excerptAr : slide.excerptEn}
              </p>
            </div>

            <Link
              href={`/${lang}${slide.href}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-neutral-200 transition-colors group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 duration-200"
            >
              <span>{isAr ? slide.ctaAr : slide.ctaEn}</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:scale-110" />
            </Link>
          </div>

          {/* 6. INTERACTIVE HOTSPOTS ON 3D NETWORK NODES */}
          {/* Node 0: Center Scroll (Future of B2B Training) */}
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            className={`absolute top-[67%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full transition-all duration-300 cursor-pointer z-30 ${
              activeSlide === 0
                ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 bg-white/25 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'hover:scale-110 bg-transparent'
            }`}
            aria-label="View Future of B2B Training"
          />

          {/* Node 1: Article (L&D Industry Trends) */}
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            className={`absolute top-[71%] left-[44%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full transition-all duration-300 cursor-pointer z-30 ${
              activeSlide === 1
                ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 bg-white/25 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'hover:scale-110 bg-transparent'
            }`}
            aria-label="View L&D Industry Trends"
          />

          {/* Node 2: Far Right Document (Interactive Strategies) */}
          <button
            type="button"
            onClick={() => setActiveSlide(2)}
            className={`absolute top-[48%] left-[89%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full transition-all duration-300 cursor-pointer z-30 ${
              activeSlide === 2
                ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 bg-white/25 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'hover:scale-110 bg-transparent'
            }`}
            aria-label="View Interactive Strategies"
          />

          {/* Node 3: Top Wireframe Cube */}
          <button
            type="button"
            onClick={() => setActiveSlide(3)}
            className={`absolute top-[41%] left-[64%] -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full transition-all duration-300 cursor-pointer z-30 ${
              activeSlide === 3
                ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 bg-white/25 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'hover:scale-110 bg-transparent'
            }`}
            aria-label="View Enterprise Transformation"
          />

          {/* 7. SLIDE SWITCHER AT BOTTOM RIGHT: "01 / 04 →" */}
          <div
            className={`absolute bottom-[4.5%] z-20 select-none ${
              isAr ? 'left-[4.0%]' : 'right-[4.0%]'
            }`}
          >
            <button
              type="button"
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="group inline-flex items-center gap-2.5 font-mono text-sm xl:text-base font-semibold text-white tracking-wider cursor-pointer hover:text-white transition-colors px-2 py-1"
            >
              <span className="tabular-nums tracking-widest">{slide.number} / 04</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 inline-flex items-center">
                <ArrowRight size={18} className="rtl:rotate-180 text-white" />
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET RESPONSIVE FALLBACK (< lg): CLEAN STACKED PRESENTATION    */}
        {/* ========================================================================= */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Mobile Topic Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs font-mono text-neutral-400">
            <span className="font-semibold text-white uppercase shrink-0">
              {isAr ? 'تصنيف:' : 'Filter:'}
            </span>
            <div className="flex items-center gap-2">
              {topics.map((t, idx) => (
                <React.Fragment key={idx}>
                  <Link href={t.href} className="hover:text-white transition-colors whitespace-nowrap">
                    {isAr ? t.labelAr : t.labelEn}
                  </Link>
                  {idx < topics.length - 1 && <span className="text-neutral-600">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Clean Vector Title & Subtitle */}
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2.5">
              {displayTitle}
            </h1>
            <p className="font-sans text-neutral-300 text-sm sm:text-base leading-relaxed">
              {displaySubtitle}
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative flex items-center rounded-xl border border-neutral-800 bg-[#0C0D12]/90 hover:border-neutral-600 focus-within:border-neutral-400 transition-all duration-200 px-3.5 py-2.5 backdrop-blur-md shadow-lg">
              <Search
                size={16}
                className="text-neutral-400 shrink-0 me-2.5"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في الرؤى والأبحاث...' : 'search insights...'}
                className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-neutral-500 hover:text-white text-xs px-1"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </form>

          {/* 3D Wireframe Visual Canvas on Mobile */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-800/80 bg-black">
            <Image
              src="/images/resources/hero-canvas-background@2x.webp"
              alt="L&D Resource Network Visualisation"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right"
            />
          </div>

          {/* Featured Card */}
          <div className="rounded-2xl border border-white/15 bg-[#0C0D12]/95 p-5 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                {isAr ? slide.badgeAr : slide.badgeEn}
              </span>
              <button
                type="button"
                onClick={handleNextSlide}
                className="font-mono text-xs text-white hover:text-neutral-200 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{slide.number} / 04</span>
                <ArrowRight size={13} className="rtl:rotate-180" />
              </button>
            </div>

            <h3 className="font-heading text-base font-bold text-white tracking-tight mb-2">
              {isAr ? slide.titleAr : slide.titleEn}
            </h3>

            <p className="font-sans text-xs text-neutral-300 leading-relaxed mb-4">
              {isAr ? slide.excerptAr : slide.excerptEn}
            </p>

            <Link
              href={`/${lang}${slide.href}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-neutral-200 transition-colors"
            >
              <span>{isAr ? slide.ctaAr : slide.ctaEn}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
