'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Locale, isArabicLocale } from '@/i18n/config';
import {
  PONTLOOK_CATEGORIES,
  PontLookCategorySlug,
  isValidCategorySlug,
} from '@/constants/categories';
import { ResourceImage } from '@/components/resources/ResourceImage';
import { ArrowRight, Folder, ChevronRight } from '@/components/icons';

export interface ResourceTabItem {
  id: string;
  slug: string;
  title: string;
  categorySlug: PontLookCategorySlug;
  categoryLabel: string;
  type?: 'article' | 'download' | 'podcast' | 'event';
  typeLabel?: string;
  date?: string;
  readTime?: string;
  format?: string;
  excerpt?: string;
  image?: string | null;
  imageAlt?: string | null;
  href: string;
  ctaText?: string;
}

export interface ResourcesCategoryTabsProps {
  lang: Locale;
  items: ResourceTabItem[];
  title?: string;
  subtitle?: string;
  viewAllLink?: {
    href: string;
    label: string;
  };
}

function ResourcesCategoryTabsInner({
  lang,
  items,
  title,
  subtitle,
  viewAllLink,
}: ResourcesCategoryTabsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isAr = isArabicLocale(lang);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Read ?category=... from URL
  const categoryParam = searchParams.get('category');

  const resolvedInitialCategory = useMemo(() => {
    if (categoryParam) {
      const normalized = categoryParam.trim().toLowerCase();
      if (normalized === 'all') return 'all';
      if (isValidCategorySlug(normalized)) return normalized;
    }
    return 'all';
  }, [categoryParam]);

  const [activeCategory, setActiveCategory] = useState<string>(resolvedInitialCategory);

  // Scroll active tab into centered view
  const scrollToTab = (categoryValue: string, smooth = true) => {
    const tabEl = tabRefs.current[categoryValue];
    if (tabEl && scrollContainerRef.current) {
      tabEl.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  // Synchronize when URL search parameters change externally
  useEffect(() => {
    if (categoryParam) {
      const normalized = categoryParam.trim().toLowerCase();
      if (normalized === 'all' || isValidCategorySlug(normalized)) {
        setActiveCategory(normalized);
        scrollToTab(normalized, false);
      }
    } else {
      setActiveCategory('all');
    }
  }, [categoryParam]);

  // Check scroll boundary state for left/right chevrons
  const updateScrollButtons = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const hasOverflow = scrollWidth > clientWidth + 2;
    if (!hasOverflow) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const absScroll = Math.abs(scrollLeft);
    setCanScrollLeft(absScroll > 10);
    setCanScrollRight(scrollWidth - clientWidth - absScroll > 10);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [items]);

  // Handle Tab Click with auto-center and Shallow URL Sync
  const handleTabClick = (categoryValue: string) => {
    setActiveCategory(categoryValue);
    scrollToTab(categoryValue, true);

    if (typeof window !== 'undefined') {
      const currentParams = new URLSearchParams(window.location.search);
      if (categoryValue === 'all') {
        currentParams.delete('category');
      } else {
        currentParams.set('category', categoryValue);
      }
      const qs = currentParams.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;
      window.history.replaceState(null, '', newUrl);
    }
  };

  // Scroll manually via side chevron buttons
  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const factor = direction === 'left' ? -260 : 260;
    const delta = isAr ? -factor : factor;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Build the list of tabs: "All" + 8 Canonical Categories
  const tabs = useMemo(() => {
    const allTab = {
      value: 'all',
      label: isAr ? 'الكل' : 'All',
    };

    const categoryTabs = PONTLOOK_CATEGORIES.map((cat) => ({
      value: cat.value,
      label: isAr ? cat.labelAr : cat.labelEn,
    }));

    return [allTab, ...categoryTabs];
  }, [isAr]);

  // Compute resource item count per category
  const countsByCategory = useMemo(() => {
    const counts: Record<string, number> = {
      all: items.length,
    };
    for (const cat of PONTLOOK_CATEGORIES) {
      counts[cat.value] = items.filter((item) => item.categorySlug === cat.value).length;
    }
    return counts;
  }, [items]);

  // Filter items based on activeCategory
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return items;
    }
    return items.filter((item) => item.categorySlug === activeCategory);
  }, [items, activeCategory]);

  return (
    <section className="mb-20 sm:mb-28 pt-10" dir={isAr ? 'rtl' : 'ltr'}>
      {/* 1. Centered Section Heading */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
        <h2
          className={`font-bold text-3xl md:text-4xl text-neutral-950 tracking-tight ${
            isAr ? 'font-arabic' : 'font-heading tracking-[-0.02em]'
          }`}
        >
          {title || (isAr ? 'أبرز الموارد المعرفية' : 'Featured Resources')}
        </h2>
        {subtitle && (
          <p className="mt-3 text-neutral-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2. Horizontal Category Tab Strip + Bottom Hairline Rule */}
      <div className="relative w-full border-b border-neutral-200 mb-10 sm:mb-12">
        {/* Left Scroll Chevron (Desktop) */}
        {canScrollLeft && (
          <div className="hidden md:flex absolute start-0 top-0 bottom-0 z-20 items-center pe-3 bg-gradient-to-r rtl:bg-gradient-to-l from-white via-white/80 to-transparent">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              aria-label={isAr ? 'التمرير لليمين' : 'Scroll left'}
              className="w-8 h-8 rounded-full bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronRight className="rotate-180" size={14} />
            </button>
          </div>
        )}

        {/* Right Scroll Chevron (Desktop) */}
        {canScrollRight && (
          <div className="hidden md:flex absolute end-0 top-0 bottom-0 z-20 items-center ps-3 bg-gradient-to-l rtl:bg-gradient-to-r from-white via-white/80 to-transparent">
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              aria-label={isAr ? 'التمرير لليسار' : 'Scroll right'}
              className="w-8 h-8 rounded-full bg-white border border-neutral-300 shadow-sm flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:border-neutral-400 hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}

        <div
          ref={scrollContainerRef}
          role="tablist"
          aria-label={isAr ? 'تصنيفات الموارد المعرفية' : 'Resource Categories'}
          className="flex items-end justify-start md:justify-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 px-2 sm:px-6 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => {
            const isSelected = activeCategory === tab.value;
            const count = countsByCategory[tab.value] ?? 0;

            return (
              <button
                key={tab.value}
                ref={(el) => {
                  tabRefs.current[tab.value] = el;
                }}
                role="tab"
                type="button"
                id={`tab-${tab.value}`}
                aria-selected={isSelected}
                aria-controls="featured-resources-panel"
                onClick={() => handleTabClick(tab.value)}
                className={`group inline-flex items-center gap-2 px-4.5 py-3 text-sm whitespace-nowrap transition-all duration-150 cursor-pointer select-none rounded-t-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5C00] ${
                  isAr ? 'font-arabic text-[14px]' : 'font-heading'
                } ${
                  isSelected
                    ? 'bg-neutral-50/90 text-neutral-950 font-bold border-t border-l border-r border-neutral-300 border-b-[3px] border-b-[#FF5C00] shadow-2xs -mb-[1px] z-10'
                    : 'border border-transparent border-b-[3px] border-b-transparent text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/70 font-medium -mb-[1px]'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-mono transition-colors ${
                    isSelected
                      ? 'bg-[#FF5C00]/15 text-[#FF5C00] font-bold'
                      : 'bg-neutral-200/70 text-neutral-600 group-hover:bg-neutral-200 group-hover:text-neutral-900'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Filtered Resource Cards Grid */}
      <div id="featured-resources-panel" role="tabpanel" aria-labelledby={`tab-${activeCategory}`}>
        {filteredItems && filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={item.href}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-neutral-200 hover:border-neutral-400 hover:shadow-lg transition-all duration-300 overflow-hidden shadow-xs"
              >
                {/* Optional Cover Image or Top Accent Line */}
                {item.image ? (
                  <div className="relative aspect-[16/9] w-full shrink-0 bg-neutral-100 overflow-hidden">
                    <ResourceImage
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 start-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md bg-white/95 text-neutral-950 border border-neutral-200/80 shadow-xs ${
                          isAr ? 'font-arabic' : 'font-mono'
                        }`}
                      >
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#2451BF] via-[#3D7BFF] to-[#FF5C00]" />
                )}

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Card Meta Row */}
                    <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 mb-3">
                      {!item.image && (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${
                            isAr ? 'font-arabic' : 'font-mono'
                          } bg-neutral-100 text-neutral-800 border-neutral-200`}
                        >
                          {item.categoryLabel}
                        </span>
                      )}
                      {item.typeLabel && (
                        <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                          {item.typeLabel}
                        </span>
                      )}
                      {(item.readTime || item.date || item.format) && (
                        <span className="font-mono text-[11px] ms-auto">
                          {item.readTime || item.format || item.date}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 group-hover:text-[#FF5C00] transition-colors leading-snug mb-3">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    {item.excerpt && (
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  {/* CTA Footer */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-800 group-hover:text-[#FF5C00] transition-colors">
                    <span>{item.ctaText || (isAr ? 'قراءة المقال' : 'Read Article')}</span>
                    <ArrowRight
                      size={14}
                      className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Original PontLook Empty State */
          <div className="p-10 sm:p-12 rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 text-center max-w-lg mx-auto">
            <h4 className="text-lg sm:text-xl font-heading font-bold text-neutral-950 mb-2">
              {isAr ? 'لا توجد موارد متوفرة في هذا التصنيف حالياً' : 'No resources in this category yet'}
            </h4>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-md mx-auto mb-6">
              {isAr
                ? 'نعمل حالياً على إعداد أحدث الأدلة والأبحاث التنفيذية لهذا المسار. يمكنك تصفح كافة الموارد المتاحة.'
                : 'We are curating executive guides and research for this track. You can browse all available resources.'}
            </p>
            <button
              type="button"
              onClick={() => handleTabClick('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <span>{isAr ? 'عرض كافة الموارد' : 'View all resources'}</span>
              <ArrowRight size={14} className="rtl:-scale-x-100" />
            </button>
          </div>
        )}

        {viewAllLink && filteredItems.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href={viewAllLink.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 bg-white text-neutral-800 hover:text-neutral-950 hover:border-neutral-400 text-xs sm:text-sm font-semibold transition-all shadow-2xs"
            >
              <span>{viewAllLink.label}</span>
              <ArrowRight size={14} className="rtl:-scale-x-100" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ResourcesCategoryTabsSkeleton({
  lang,
  title,
}: {
  lang: Locale;
  title?: string;
}) {
  const isAr = isArabicLocale(lang);

  return (
    <section className="mb-20 sm:mb-28 pt-10" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
        <h2
          className={`font-bold text-3xl md:text-4xl text-neutral-950 tracking-tight ${
            isAr ? 'font-arabic' : 'font-heading tracking-[-0.02em]'
          }`}
        >
          {title || (isAr ? 'أبرز الموارد المعرفية' : 'Featured Resources')}
        </h2>
      </div>
      <div className="w-full border-b border-neutral-200 mb-10 flex justify-center gap-2 animate-pulse">
        <div className="h-11 w-20 bg-neutral-200 rounded-t-xl" />
        <div className="h-11 w-28 bg-neutral-100 rounded-t-xl" />
        <div className="h-11 w-32 bg-neutral-100 rounded-t-xl" />
        <div className="h-11 w-28 bg-neutral-100 rounded-t-xl" />
      </div>
    </section>
  );
}

export default function ResourcesCategoryTabs(props: ResourcesCategoryTabsProps) {
  return (
    <Suspense fallback={<ResourcesCategoryTabsSkeleton lang={props.lang} title={props.title} />}>
      <ResourcesCategoryTabsInner {...props} />
    </Suspense>
  );
}
