'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import type { ArticleHeading } from './RichText';

interface BlogChapterNavProps {
  headings: ArticleHeading[];
  isAr?: boolean;
}

export function BlogChapterNav({ headings, isAr = false }: BlogChapterNavProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || '');
  const [progress, setProgress] = useState<number>(0);
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  // Auto-scroll active pill into view inside the horizontal nav
  const scrollActivePillIntoView = useCallback((id: string) => {
    const nav = navRef.current;
    const linkEl = linkRefs.current[id];
    if (!nav || !linkEl) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    // Check if the link is outside the visible area of the nav
    if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
      const scrollLeft = linkEl.offsetLeft - nav.clientWidth / 2 + linkEl.clientWidth / 2;
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    // Resolve heading elements once or dynamically with fallback to querySelector
    const resolveHeadingElements = () => {
      const elements: { id: string; el: HTMLElement }[] = [];
      const allH2 = document.querySelectorAll<HTMLElement>(
        '#article-content h2, #article-content h3'
      );

      headings.forEach((h, idx) => {
        let el = document.getElementById(h.id);
        if (!el && allH2[idx]) {
          el = allH2[idx];
          // Ensure element has the id so hash linking works
          if (!el.id) el.id = h.id;
        }
        if (el) {
          elements.push({ id: h.id, el });
        }
      });

      return elements;
    };

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
        const p = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.2) / total));
        setProgress(p);
      }

      // Detect active heading
      const headingElements = resolveHeadingElements();
      if (headingElements.length === 0) return;

      let current = headingElements[0].id;
      for (let i = 0; i < headingElements.length; i++) {
        const { id, el } = headingElements[i];
        if (el.getBoundingClientRect().top < window.innerHeight * 0.45) {
          current = id;
        }
      }

      setActiveId((prev) => {
        if (prev !== current) {
          scrollActivePillIntoView(current);
          return current;
        }
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [headings, scrollActivePillIntoView]);

  if (!headings || headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
    e.preventDefault();
    let el = document.getElementById(id);
    if (!el) {
      const allH2 = document.querySelectorAll<HTMLElement>(
        '#article-content h2, #article-content h3'
      );
      if (allH2[index]) el = allH2[index];
    }

    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      setActiveId(id);
      scrollActivePillIntoView(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const pctDisplay = `${Math.round(progress * 100)}%`;

  return (
    <div
      className="sticky top-[56px] sm:top-[64px] z-30 bg-white/95 backdrop-blur-md border-y border-[#ECE7E2] transition-colors"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-6 h-14 relative">
        {/* Horizontal Scrollable Chapters */}
        <nav
          ref={navRef}
          aria-label={isAr ? 'أقسام المقال' : 'Chapters'}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 min-w-0 scroll-smooth"
        >
          {headings.map((heading, idx) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                ref={(node) => {
                  linkRefs.current[heading.id] = node;
                }}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id, idx)}
                title={heading.text}
                className={`flex-none max-w-[200px] sm:max-w-[280px] truncate px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer select-none ${
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

        {/* Reading Progress Percentage with clear divider */}
        <div className="flex items-center shrink-0 pl-3 rtl:pr-3 border-l rtl:border-r border-[#ECE7E2]">
          <span className="font-heading text-xs sm:text-sm font-bold text-[#0B0B10] tabular-nums font-mono px-1">
            {pctDisplay}
          </span>
        </div>

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
