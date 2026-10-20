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
import { ArrowRight, ChevronDown, Check } from '@/components/icons';

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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  // Synchronize when URL search parameters change externally
  useEffect(() => {
    if (categoryParam) {
      const normalized = categoryParam.trim().toLowerCase();
      if (normalized === 'all' || isValidCategorySlug(normalized)) {
        setActiveCategory(normalized);
      }
    } else {
      setActiveCategory('all');
    }
  }, [categoryParam]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Handle Tab Click with Shallow URL Sync
  const handleTabClick = (categoryValue: string) => {
    setActiveCategory(categoryValue);
    setIsDropdownOpen(false);

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

  const activeTabObj = useMemo(() => {
    return tabs.find((t) => t.value === activeCategory) || tabs[0];
  }, [tabs, activeCategory]);

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
        <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
          {title || (isAr ? 'أبرز الموارد المعرفية' : 'Featured Resources')}
        </h2>
        {subtitle && (
          <p className="mt-3 font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2. CATEGORY FILTER (BOXED LIKE PAYLOAD CMS) */}
      <div className="mb-10 sm:mb-12">
        {/* A. Payload CMS Style Dropdown Select Box */}
        <div className="max-w-md mx-auto mb-6 px-4 relative" ref={dropdownRef}>
          <button
            type="button"
            id="category-select-button"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-white border border-neutral-300 hover:border-neutral-900 focus:border-neutral-950 transition-all shadow-xs cursor-pointer select-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C00] shrink-0" />
              <div className="flex items-baseline gap-2 truncate">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 shrink-0">
                  {isAr ? 'التصنيف:' : 'Category:'}
                </span>
                <span className="font-heading font-bold text-sm sm:text-base text-neutral-950 truncate">
                  {activeTabObj.label}
                </span>
              </div>
            </div>
            <ChevronDown
              size={18}
              className={`text-neutral-500 shrink-0 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180 text-neutral-950' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              role="listbox"
              aria-labelledby="category-select-button"
              className="absolute start-4 end-4 top-full mt-2 z-30 bg-white border border-neutral-200 rounded-2xl shadow-xl p-2 max-h-80 overflow-y-auto no-scrollbar animate-in fade-in duration-150"
            >
              {tabs.map((tab) => {
                const isSelected = activeCategory === tab.value;
                return (
                  <button
                    key={tab.value}
                    role="option"
                    aria-selected={isSelected}
                    type="button"
                    onClick={() => handleTabClick(tab.value)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-sans text-sm transition-colors cursor-pointer select-none text-start ${
                      isSelected
                        ? 'bg-neutral-950 text-white font-semibold'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 font-medium'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isSelected && <Check size={16} className="text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
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
                      <span className="px-3 py-1 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md bg-white/95 text-neutral-950 border border-neutral-200/80 shadow-xs">
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
                        <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold uppercase tracking-wider border bg-neutral-100 text-neutral-800 border-neutral-200">
                          {item.categoryLabel}
                        </span>
                      )}
                      {item.typeLabel && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                          {item.typeLabel}
                        </span>
                      )}
                      {(item.readTime || item.date || item.format) && (
                        <span className="font-mono text-[11px] tabular-nums ms-auto">
                          {item.readTime || item.format || item.date}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-lg sm:text-xl font-semibold tracking-tight text-neutral-950 group-hover:text-[#FF5C00] transition-colors leading-[1.3] mb-3">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    {item.excerpt && (
                      <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 font-normal">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  {/* CTA Footer */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between font-sans text-xs font-semibold tracking-tight text-neutral-800 group-hover:text-[#FF5C00] transition-colors">
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
        <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
          {title || (isAr ? 'أبرز الموارد المعرفية' : 'Featured Resources')}
        </h2>
      </div>
      <div className="max-w-md mx-auto mb-10 px-4 animate-pulse">
        <div className="h-14 w-full bg-neutral-100 rounded-2xl border border-neutral-200" />
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
