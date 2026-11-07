'use client';

import React, { useEffect, useState, useRef } from 'react';
import type { ArticleHeading } from './RichText';

interface BlogChapterNavProps {
  headings: ArticleHeading[];
  isAr?: boolean;
}

export function BlogChapterNav({ headings, isAr = false }: BlogChapterNavProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const handleScroll = () => {
      const art = document.getElementById('article-content');
      if (!art) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          setProgress(Math.min(1, Math.max(0, window.scrollY / totalHeight)));
        }
        return;
      }

      // Calculate article-specific reading percentage
      const r = art.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      if (total > 0) {
        const p = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.25) / total));
        setProgress(p);
      }

      // Active heading detection
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null);

      if (headingElements.length === 0) return;

      let current = headingElements[0].id;
      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el.getBoundingClientRect().top < window.innerHeight * 0.45) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 130;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
      setActiveId(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const pctDisplay = `${Math.round(progress * 100)}%`;

  return (
    <div
      className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-y border-[#ECE7E2] transition-colors"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 h-14 relative">
        {/* Horizontal Scrollable Chapters */}
        <nav
          ref={navRef}
          aria-label={isAr ? 'أقسام المقال' : 'Chapters'}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 min-w-0"
        >
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`flex-none px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0B0B10] text-white shadow-xs font-semibold'
                    : 'text-[#7A7A85] hover:text-[#0B0B10] hover:bg-[#FFF1E6]'
                }`}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>

        {/* Reading Progress Percentage */}
        <span className="shrink-0 font-heading text-xs sm:text-sm font-semibold text-[#0B0B10] tabular-nums font-mono px-2">
          {pctDisplay}
        </span>

        {/* Orange Reading Progress Bar along bottom border */}
        <i
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-[-1px] h-[3px] bg-[#FF5A1F] block pointer-events-none transition-transform duration-75 ease-out"
          style={{
            transform: `scaleX(${progress})`,
            transformOrigin: isAr ? 'right' : 'left',
          }}
        />
      </div>
    </div>
  );
}

export default BlogChapterNav;
