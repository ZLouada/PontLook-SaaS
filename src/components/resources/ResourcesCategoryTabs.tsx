'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Locale, isArabicLocale } from '@/i18n/config';
import {
  PONTLOOK_CATEGORIES,
  PontLookCategorySlug,
  isValidCategorySlug,
} from '@/constants/categories';
import { ResourceImage } from '@/components/resources/ResourceImage';
import { ArrowRight, Folder } from '@/components/icons';

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

  // Handle Tab Click with Shallow URL Sync
  const handleTabClick = (categoryValue: string) => {
    setActiveCategory(categoryValue);

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
          className={`font-bold text-3xl md:text-4xl text-slate-950 dark:text-white tracking-tight ${
            isAr ? 'font-arabic' : 'font-heading tracking-[-0.02em]'
          }`}
        >
          {title || (isAr ? 'أبرز الموارد المعرفية' : 'Featured Resources')}
        </h2>
        {subtitle && (
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* 2. Horizontal Category Tab Strip + Bottom Hairline Rule */}
      <div className="w-full border-b border-slate-200 dark:border-slate-800 mb-10 sm:mb-12">
        <div
          role="tablist"
          aria-label={isAr ? 'تصنيفات الموارد المعرفية' : 'Resource Categories'}
          className="flex items-end justify-start md:justify-center overflow-x-auto no-scrollbar gap-1 md:gap-2 -mb-[1px] px-2 sm:px-4"
        >
          {tabs.map((tab) => {
            const isSelected = activeCategory === tab.value;

            return (
              <button
                key={tab.value}
                role="tab"
                type="button"
                id={`tab-${tab.value}`}
                aria-selected={isSelected}
                aria-controls="featured-resources-panel"
                onClick={() => handleTabClick(tab.value)}
                className={`px-5 py-3 text-sm whitespace-nowrap transition-colors duration-150 cursor-pointer select-none ${
                  isAr ? 'font-arabic' : 'font-heading'
                } ${
                  isSelected
                    ? 'bg-slate-100/90 text-slate-950 font-semibold border-t border-l border-r border-[#2451BF] border-b-[3px] border-b-slate-950 dark:bg-slate-900/90 dark:text-white dark:border-t dark:border-l dark:border-r dark:border-[#3D7BFF] dark:border-b-[3px] dark:border-b-[#FF5500]'
                    : 'border border-transparent border-b-[3px] border-b-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium'
                }`}
              >
                {tab.label}
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
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md"
              >
                {/* Optional Cover Image or Top Accent Line */}
                {item.image ? (
                  <div className="relative aspect-[16/9] w-full shrink-0 bg-slate-100 dark:bg-slate-800 overflow-hidden">
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
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md bg-white/90 text-slate-900 border border-white/40 shadow-2xs ${
                          isAr ? 'font-arabic' : 'font-mono'
                        }`}
                      >
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#2451BF] via-[#3D7BFF] to-[#FF5500]" />
                )}

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Card Meta Row */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      {!item.image && (
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${
                            isAr ? 'font-arabic' : 'font-mono'
                          } bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700`}
                        >
                          {item.categoryLabel}
                        </span>
                      )}
                      {item.typeLabel && (
                        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">
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
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-slate-950 dark:text-white group-hover:text-[#FF5C00] transition-colors leading-snug mb-3">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    {item.excerpt && (
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  {/* CTA Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#FF5C00] transition-colors">
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
          /* Empty State when Category has no items */
          <div className="p-12 sm:p-16 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-center max-w-lg mx-auto">
            <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-slate-800 text-[#FF5C00] flex items-center justify-center mx-auto mb-4">
              <Folder size={24} />
            </div>
            <h4 className="text-lg font-heading font-bold text-slate-950 dark:text-white mb-2">
              {isAr ? 'لا توجد موارد متوفرة في هذا التصنيف حالياً' : 'No resources in this category yet'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {isAr
                ? 'نعمل حالياً على إعداد أدلة وأبحاث حصرية لهذا المسار التدريبي. يمكنك استعراض كافة الموارد الأخرى.'
                : 'We are curating executive guides and research for this track. You can browse all available resources.'}
            </p>
            <button
              type="button"
              onClick={() => handleTabClick('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              <span>{isAr ? 'عرض كافة الموارد' : 'View all resources'}</span>
              <ArrowRight size={13} className="rtl:-scale-x-100" />
            </button>
          </div>
        )}

        {viewAllLink && filteredItems.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href={viewAllLink.href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white hover:border-slate-400 text-xs sm:text-sm font-semibold transition-all shadow-2xs"
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
          className={`font-bold text-3xl md:text-4xl text-slate-950 dark:text-white tracking-tight ${
            isAr ? 'font-arabic' : 'font-heading tracking-[-0.02em]'
          }`}
        >
          {title || (isAr ? 'أبرز الموارد المعرفية' : 'Featured Resources')}
        </h2>
      </div>
      <div className="w-full border-b border-slate-200 dark:border-slate-800 mb-10 flex justify-center gap-2 animate-pulse">
        <div className="h-10 w-20 bg-slate-200 dark:bg-slate-800 rounded-sm" />
        <div className="h-10 w-28 bg-slate-100 dark:bg-slate-900 rounded-sm" />
        <div className="h-10 w-32 bg-slate-100 dark:bg-slate-900 rounded-sm" />
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
