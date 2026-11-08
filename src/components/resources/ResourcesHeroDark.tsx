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
    <section className="relative w-full bg-black text-white rounded-b-[2.5rem] sm:rounded-b-[3.5rem] lg:rounded-b-[48px] overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 border-b border-neutral-900 shadow-2xl">
      {/* Background Subtle Technical Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 select-none">
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
        <span className="absolute top-12 left-1/4 font-mono text-[10px] text-neutral-600">00.1900</span>
        <span className="absolute top-20 right-1/4 font-mono text-[10px] text-neutral-600">20.4278</span>
        <span className="absolute top-1/2 left-1/3 font-mono text-[10px] text-neutral-600">10.5035</span>
        <span className="absolute bottom-12 left-1/2 font-mono text-[10px] text-neutral-600">-2.0157</span>
        <span className="absolute bottom-16 right-1/3 font-mono text-[10px] text-neutral-600">-0.0488</span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Top Header Bar: Search relocated to the high end of the header so it doesn't bother the screen */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          {/* Mobile Filter by Topic pill strip */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs font-mono text-neutral-400">
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

          <div className="hidden lg:block" />

          {/* Search Bar at high end of header */}
          <form onSubmit={handleSearchSubmit} className="relative z-30 shrink-0 ms-auto">
            <div className="relative flex items-center rounded-full border border-neutral-800 bg-[#0C0D12]/90 hover:border-neutral-600 focus-within:border-neutral-400 transition-all duration-200 px-3.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md shadow-lg">
              <Search
                size={14}
                className="text-neutral-400 shrink-0 me-2.5 transition-colors group-focus-within:text-white"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في الرؤى والأبحاث...' : 'search insights...'}
                className="w-36 sm:w-52 md:w-64 bg-transparent text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none"
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
        </div>

        {/* Main Composition: Crisp Vector Typography on the Left, Pure 3D Wireframe Diagram on the Right */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-8 xl:gap-12 relative">
          {/* Desktop Vertical Topic Sidebar on far left */}
          <div
            className={`hidden lg:flex flex-col justify-end shrink-0 select-none pb-4 ${
              isAr ? 'pl-2' : 'pr-2'
            }`}
          >
            <div
              className={`flex items-center gap-3 text-xs tracking-wider text-neutral-500 [writing-mode:vertical-rl] ${
                isAr ? 'rotate-0' : 'rotate-180'
              }`}
            >
              <span className="font-sans font-bold text-white tracking-normal text-sm">
                {isAr ? 'تصنيف المحتوى' : 'Filter by Topic'}
              </span>
              <span className="text-neutral-600">|</span>
              <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-400">
                {topics.map((t, idx) => (
                  <React.Fragment key={idx}>
                    <Link href={t.href} className="hover:text-white transition-colors">
                      {isAr ? t.labelAr : t.labelEn}
                    </Link>
                    {idx < topics.length - 1 && <span className="text-neutral-600">•</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Left Column: Razor-sharp Vector Title, Subtitle, and Lower Card */}
          <div className="w-full lg:w-[42%] xl:w-[40%] flex flex-col justify-between shrink-0 z-10">
            <div>
              {/* Native Vector Heading - Crisp on all screens, no raster blur */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] font-extrabold text-white tracking-tight leading-[1.06] mb-4 drop-shadow-sm">
                {displayTitle}
              </h1>

              {/* Native Vector Subtitle */}
              <p className="font-sans text-neutral-300 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl">
                {displaySubtitle}
              </p>
            </div>

            {/* Featured Card: Positioned 'bellow a little bit' with comfortable top spacing */}
            <div className="mt-8 sm:mt-10 lg:mt-14">
              <div className="relative rounded-2xl border border-white/15 bg-[#0C0D12]/95 p-5 sm:p-6 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/30 group">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
                    {isAr ? slide.badgeAr : slide.badgeEn}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 tabular-nums">
                    {slide.number} / 04
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                  {isAr ? slide.titleAr : slide.titleEn}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3 mb-4">
                  {isAr ? slide.excerptAr : slide.excerptEn}
                </p>

                <Link
                  href={`/${lang}${slide.href}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-neutral-200 transition-colors group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 duration-200"
                >
                  <span>{isAr ? slide.ctaAr : slide.ctaEn}</span>
                  <ArrowUpRight size={15} className="transition-transform group-hover:scale-110" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Pure 3D Wireframe Network Diagram with Crisp Vector Badges */}
          <div className="w-full lg:w-[58%] xl:w-[60%] relative flex flex-col justify-between min-h-[400px] sm:min-h-[460px] lg:min-h-[520px]">
            {/* Diagram Canvas with authentic 3D wireframe artwork (no blurry raster text) */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative w-full aspect-[694/517] max-w-[760px]">
                {/* Crisp 2x retina wireframe graphic */}
                <Image
                  src="/images/resources/hero-wireframe-diagram@2x.webp"
                  alt="L&D Resource Network Visualisation"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-contain object-center select-none pointer-events-none"
                />

                {/* --- Vector Crisp Badges Overlaid at Exact Geometric Positions --- */}

                {/* 1. Badge: L&D Industry Trends */}
                <div className="absolute top-[48%] left-[14%] -translate-y-1/2 flex flex-col items-start pointer-events-none">
                  <span className="font-sans text-[11px] sm:text-xs font-semibold text-white drop-shadow-md tracking-tight whitespace-nowrap">
                    {isAr ? 'اتجاهات القطاع' : 'L&D Industry Trends'}
                  </span>
                </div>

                {/* 2. Badge: Top Cube (+ Expand) */}
                <button
                  type="button"
                  onClick={() => setActiveSlide(3)}
                  className="absolute top-[24%] left-[45%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-white/95 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md shadow-md cursor-pointer transition-all duration-200 hover:scale-105"
                  aria-label="Expand Enterprise Transformation"
                >
                  + Expand
                </button>

                {/* 3. Badge: Future of B2B Training */}
                <div className="absolute top-[62%] left-[64%] -translate-y-1/2 flex flex-col items-start pointer-events-none select-none">
                  <span className="font-sans text-[11px] sm:text-xs font-semibold text-white drop-shadow-md tracking-tight whitespace-nowrap">
                    {isAr ? 'مستقبل تدريب B2B' : 'Future of B2B Training'}
                  </span>
                  <span className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider text-neutral-300 bg-neutral-900/90 border border-neutral-700/80 shadow-sm">
                    {isAr ? 'دليل • دراسة حالة' : 'GUIDE • Case Study'}
                  </span>
                </div>

                {/* 4. Badge: Right Document (+ Expand) */}
                <button
                  type="button"
                  onClick={() => setActiveSlide(2)}
                  className="absolute top-[23%] left-[86%] -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold text-white/95 bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md shadow-md cursor-pointer transition-all duration-200 hover:scale-105"
                  aria-label="Expand Interactive Strategies"
                >
                  + Expand
                </button>

                {/* 5. Badge: Interactive Strategies */}
                <div className="absolute top-[59%] left-[76%] -translate-y-1/2 flex flex-col items-start pointer-events-none select-none">
                  <span className="font-sans text-[11px] sm:text-xs font-semibold text-white drop-shadow-md tracking-tight whitespace-nowrap">
                    {isAr ? 'استراتيجيات تفاعلية' : 'Interactive Strategies'}
                  </span>
                  <span className="mt-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider text-neutral-300 bg-neutral-900/90 border border-neutral-700/80 shadow-sm">
                    {isAr ? 'ملف PDF • ٨ دقائق' : 'PDF • 8 min read'}
                  </span>
                </div>

                {/* Interactive Hotspot Targets on the Diagram Nodes (Highlight Active Slide) */}
                {/* Node 1: Article / L&D Industry Trends */}
                <button
                  type="button"
                  onClick={() => setActiveSlide(1)}
                  className={`absolute top-[68%] left-[16%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === 1
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 bg-white/30'
                      : 'hover:scale-110 bg-transparent'
                  }`}
                  aria-label="View L&D Industry Trends"
                />

                {/* Node 2: Top Wireframe Cube */}
                <button
                  type="button"
                  onClick={() => setActiveSlide(3)}
                  className={`absolute top-[34%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === 3
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 bg-white/30'
                      : 'hover:scale-110 bg-transparent'
                  }`}
                  aria-label="View Enterprise Workforce Transformation"
                />

                {/* Node 3: Center Scroll */}
                <button
                  type="button"
                  onClick={() => setActiveSlide(0)}
                  className={`absolute top-[68%] left-[51%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === 0
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 bg-white/30'
                      : 'hover:scale-110 bg-transparent'
                  }`}
                  aria-label="View Future of B2B Training"
                />

                {/* Node 4: Far Right Document */}
                <button
                  type="button"
                  onClick={() => setActiveSlide(2)}
                  className={`absolute top-[38%] left-[84%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === 2
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-125 bg-white/30'
                      : 'hover:scale-110 bg-transparent'
                  }`}
                  aria-label="View Interactive Strategies"
                />
              </div>
            </div>

            {/* Bottom Right Crisp Vector Monospace Slide Switcher: "01 / 04 →" */}
            <div className="flex items-center justify-end mt-4 select-none z-20">
              <button
                type="button"
                onClick={handleNextSlide}
                aria-label="Next slide"
                className="group inline-flex items-center gap-2.5 font-mono text-sm sm:text-base font-semibold text-white tracking-wider cursor-pointer hover:text-white transition-colors px-2 py-1"
              >
                <span className="tabular-nums tracking-widest">{slide.number} / 04</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 inline-flex items-center">
                  <ArrowRight size={18} className="rtl:rotate-180 text-white" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
