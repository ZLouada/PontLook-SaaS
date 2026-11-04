'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { Clock, Layers, ChevronDown } from '@/components/icons';
import type { ArticleHeading } from './RichText';

interface BlogTableOfContentsProps {
  headings: ArticleHeading[];
  isAr?: boolean;
  readTime?: string;
  className?: string;
}

export function BlogTableOfContents({
  headings,
  isAr = false,
  readTime,
  className = '',
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  // Scroll progress and active heading detection
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      // 1. Calculate reading scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(Math.round(currentProgress));
      }

      // 2. Determine current active heading
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null);

      if (headingElements.length === 0) return;

      const scrollPosition = window.scrollY + 140; // Offset for header navbar

      let currentActive = headingElements[0].id;
      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          currentActive = el.id;
        } else {
          break;
        }
      }

      startTransition(() => {
        setActiveId(currentActive);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
      setActiveId(id);
      window.history.replaceState(null, '', `#${id}`);
      setIsOpenMobile(false);
    }
  };

  return (
    <nav
      aria-label={isAr ? 'جدول محتويات المقال' : 'Table of Contents'}
      className={`rounded-2xl border border-neutral-200/90 bg-white shadow-xs p-5 transition-all duration-200 ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-neutral-100">
        <div className="flex items-center gap-2 text-neutral-900 font-heading text-sm font-bold tracking-tight">
          <Layers size={16} className="text-[#FF5C00]" />
          <span>{isAr ? 'محتويات هذا المقال' : 'Table of Contents'}</span>
        </div>

        {readTime && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
            <Clock size={12} />
            <span>{readTime}</span>
          </div>
        )}
      </div>

      {/* Reading Scroll Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
          <span>{isAr ? 'تقدم القراءة' : 'Reading Progress'}</span>
          <span className="font-semibold text-neutral-800">{scrollProgress}%</span>
        </div>
        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF5C00] to-amber-500 rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Mobile Accordion Toggle */}
      <div className="lg:hidden mb-2">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full flex items-center justify-between py-2 text-xs font-semibold text-neutral-700 hover:text-black"
        >
          <span>{isOpenMobile ? (isAr ? 'إخفاء الأقسام' : 'Hide Sections') : (isAr ? 'عرض كل الأقسام' : 'Show All Sections')}</span>
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpenMobile ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* List of Headings */}
      <ul className={`space-y-1.5 ${isOpenMobile ? 'block' : 'hidden lg:block'}`}>
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <li
              key={heading.id}
              className={`${isH3 ? (isAr ? 'pr-4' : 'pl-4') : ''}`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleHeadingClick(e, heading.id)}
                className={`group flex items-start gap-2 py-1.5 px-2.5 rounded-lg text-xs leading-snug transition-all duration-150 ${
                  isActive
                    ? 'bg-[#FF5C00]/10 text-neutral-950 font-semibold border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#FF5C00]'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-colors ${
                    isActive ? 'bg-[#FF5C00]' : 'bg-neutral-300 group-hover:bg-neutral-400'
                  }`}
                />
                <span className="line-clamp-2">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
