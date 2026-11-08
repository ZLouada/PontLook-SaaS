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

  return (
    <section className="relative w-full bg-black text-white rounded-b-[2.5rem] sm:rounded-b-[3.5rem] lg:rounded-b-[48px] overflow-hidden pt-24 sm:pt-28 lg:pt-30 pb-12 sm:pb-16 lg:pb-18 border-b border-neutral-900 shadow-2xl">
      {/* Hidden accessible H1 for SEO & screen readers */}
      <h1 className="sr-only">
        {customTitle || (isAr ? 'مركز موارد التدريب والتطوير' : 'L&D Resource Hub')}
      </h1>
      <p className="sr-only">
        {customSubtitle ||
          (isAr
            ? 'استكشف أحدث الرؤى العملية، واتجاهات القطاع، ومستقبل تدريب وتطوير الكفاءات المؤسسية.'
            : 'Explore actionable insights, industry trends, and the future of enterprise training.')}
      </p>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* High end of the header: Search Bar placed at the top so it doesn't bother the screen */}
        <div className="flex items-center justify-end mb-3 sm:mb-4">
          <form onSubmit={handleSearchSubmit} className="relative z-30">
            <div className="relative flex items-center rounded-full border border-neutral-800 bg-[#0C0D12]/90 hover:border-neutral-700 focus-within:border-neutral-500 transition-all duration-200 px-3.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-md shadow-lg">
              <Search
                size={15}
                className="text-neutral-400 shrink-0 me-2.5 transition-colors group-focus-within:text-white"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'ابحث في الرؤى...' : 'search insights...'}
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

        {/* Hero Artwork Canvas: Displays the WHOLE uncropped artwork with full title, subtitle & diagram */}
        <div className="relative w-full aspect-[1024/517] min-h-[380px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px]">
          {/* Authentic full artwork image (clean plate with whole title and isometric diagram) */}
          <Image
            src="/images/resources/hero-plate-full@2x.webp"
            alt="L&D Resource Hub"
            fill
            priority
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-contain object-center select-none pointer-events-none"
          />

          {/* Interactive Card: Positioned 'bellow a little bit' in the lower-left area */}
          <div className="absolute bottom-[3%] sm:bottom-[4%] lg:bottom-[5%] left-[8%] sm:left-[9%] lg:left-[9.5%] w-[84%] sm:w-[48%] md:w-[38%] lg:w-[32%] xl:w-[29%] max-w-[360px] z-20">
            <div className="relative rounded-2xl border border-white/15 bg-black/85 p-4 sm:p-5 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-white/30 group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  {isAr ? slide.badgeAr : slide.badgeEn}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-neutral-500 tabular-nums">
                  {slide.number} / 04
                </span>
              </div>

              <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight mb-1.5 group-hover:text-white transition-colors">
                {isAr ? slide.titleAr : slide.titleEn}
              </h3>

              <p className="font-sans text-[11px] sm:text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-3">
                {isAr ? slide.excerptAr : slide.excerptEn}
              </p>

              <Link
                href={`/${lang}${slide.href}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white transition-colors group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 duration-200"
              >
                <span>{isAr ? slide.ctaAr : slide.ctaEn}</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:scale-110" />
              </Link>
            </div>
          </div>

          {/* Interactive Hotspot Targets on the Diagram Nodes */}
          {/* Node 1: Article / L&D Industry Trends */}
          <button
            type="button"
            onClick={() => setActiveSlide(1)}
            className={`absolute top-[68%] left-[47%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
              activeSlide === 1 ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110 bg-white/20' : 'hover:scale-110 bg-transparent'
            }`}
            aria-label="View L&D Industry Trends"
          />

          {/* Node 2: Top Wireframe Cube */}
          <button
            type="button"
            onClick={() => setActiveSlide(3)}
            className={`absolute top-[28%] left-[68%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
              activeSlide === 3 ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110 bg-white/20' : 'hover:scale-110 bg-transparent'
            }`}
            aria-label="View Enterprise Workforce Transformation"
          />

          {/* Node 3: Center Scroll */}
          <button
            type="button"
            onClick={() => setActiveSlide(0)}
            className={`absolute top-[62%] left-[69%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
              activeSlide === 0 ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110 bg-white/20' : 'hover:scale-110 bg-transparent'
            }`}
            aria-label="View Future of B2B Training"
          />

          {/* Node 4: Far Right Document */}
          <button
            type="button"
            onClick={() => setActiveSlide(2)}
            className={`absolute top-[32%] left-[90%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full transition-all duration-300 cursor-pointer ${
              activeSlide === 2 ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110 bg-white/20' : 'hover:scale-110 bg-transparent'
            }`}
            aria-label="View Interactive Strategies"
          />

          {/* Bottom Right Interactive Slide Switcher: Sits right on top of the graphic's 01 / 04 → */}
          <button
            type="button"
            onClick={handleNextSlide}
            aria-label="Next slide"
            className="absolute bottom-[3%] sm:bottom-[4%] right-[5%] sm:right-[6%] z-20 group inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-white tracking-wider cursor-pointer bg-black/70 hover:bg-black/90 px-2.5 py-1 rounded transition-colors"
          >
            <span className="tabular-nums tracking-widest">{slide.number} / 04</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 inline-flex items-center">
              <ArrowRight size={15} className="rtl:rotate-180 text-white" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
