'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import type { ArticleHeading } from './RichText';

interface BlogChapterNavProps {
  headings: ArticleHeading[];
  isAr?: boolean;
}

/**
 * Intelligently formats verbose blog headings into crisp, punchy chapter titles
 * that scale beautifully across mobile, tablet, and desktop viewports.
 */
function formatChapterTitle(rawText: string, index: number, isAr: boolean): string {
  if (!rawText) return isAr ? `قسم ${index + 1}` : `Chapter ${index + 1}`;

  const text = rawText.trim();
  // If already concise (<= 24 characters), keep as is
  if (text.length <= 24) return text;

  // Strip prefixes like "Chapter 1: Title", "Part 2 - Title", "الفصل الأول: العنوان"
  const splitMatch = text.match(/^(?:chapter|part|section|المبحث|الفصل)?\s*\d*[:\-–—]\s*(.+)$/i);
  if (splitMatch && splitMatch[1] && splitMatch[1].trim().length <= 26) {
    return splitMatch[1].trim();
  }

  if (isAr) {
    let arClean = text
      .replace(/^لماذا\s+(?:تحتاج\s+)?(?:الشركات\s+|المؤسسات\s+)?(?:إلى\s+)?/i, '')
      .replace(/^كيفية\s+/i, '')
      .replace(/^كيف\s+(?:يمكن\s+)?(?:لـ|للموارد\s+البشرية\s+)?(?:بناء\s+)?/i, '')
      .replace(/^أهمية\s+/i, '')
      .replace(/^دور\s+/i, '')
      .trim();

    if (arClean.length <= 24) return arClean;

    // Word boundary trim up to ~22 chars
    const words = arClean.split(/\s+/);
    let result = '';
    for (const w of words) {
      if ((result + ' ' + w).trim().length > 22) break;
      result = (result + ' ' + w).trim();
    }
    return result || arClean.slice(0, 20) + '…';
  }

  // English cleaning: strip verbose starters
  let enClean = text
    .replace(/^why\s+(?:businesses|organizations|companies|teams)?\s*need\s+/i, '')
    .replace(/^how\s+to\s+/i, '')
    .replace(/^how\s+(?:hr|teams|leaders)\s+can\s+(?:build\s+(?:a\s+culture\s+of\s+)?)?/i, '')
    .replace(/^how\s+(?:hr|teams|leaders)\s+can\s+/i, '')
    .replace(/^the\s+importance\s+of\s+/i, '')
    .replace(/^an\s+introduction\s+to\s+/i, '')
    .replace(/^the\s+role\s+of\s+/i, '')
    .replace(/^understanding\s+/i, '')
    .trim();

  // Common phrase cleanups
  enClean = enClean
    .replace(/\bwithout losing creativity\b/i, '')
    .replace(/\band collaboration\b/i, '')
    .replace(/\band operational efficiency\b/i, '& Efficiency')
    .replace(/\band\b/g, '&')
    .trim();

  if (enClean.length <= 24) return enClean;

  // Trim at word boundary up to 24 characters
  const words = enClean.split(/\s+/);
  let result = '';
  for (const w of words) {
    if ((result + ' ' + w).trim().length > 24) break;
    result = (result + ' ' + w).trim();
  }

  return result || enClean.slice(0, 22) + '…';
}

export function BlogChapterNav({ headings, isAr = false }: BlogChapterNavProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id || '');
  const [progress, setProgress] = useState<number>(0);
  const navRef = useRef<HTMLElement | null>(null);
  const progressBarRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const headingElementsRef = useRef<{ id: string; el: HTMLElement }[]>([]);

  // Auto-scroll active pill into view inside the horizontal nav container
  const scrollActivePillIntoView = useCallback((id: string) => {
    const nav = navRef.current;
    const linkEl = linkRefs.current[id];
    if (!nav || !linkEl) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
      const scrollLeft = linkEl.offsetLeft - nav.clientWidth / 2 + linkEl.clientWidth / 2;
      nav.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    // Resolve heading elements once and cache in ref
    const updateHeadingCache = () => {
      const elements: { id: string; el: HTMLElement }[] = [];
      const allHeadings = document.querySelectorAll<HTMLElement>(
        '#article-content h2, #article-content h3'
      );

      headings.forEach((h, idx) => {
        let el = document.getElementById(h.id);
        if (!el && allHeadings[idx]) {
          el = allHeadings[idx];
          if (!el.id) el.id = h.id;
        }
        if (el) {
          elements.push({ id: h.id, el });
        }
      });

      headingElementsRef.current = elements;
    };

    updateHeadingCache();

    let rafId: number | null = null;
    let articleEl: HTMLElement | null = null;

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!articleEl) {
          articleEl = document.getElementById('article-content');
        }

        let p = 0;
        if (!articleEl) {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            p = Math.min(1, Math.max(0, window.scrollY / totalHeight));
          }
        } else {
          const r = articleEl.getBoundingClientRect();
          const total = r.height - window.innerHeight * 0.4;
          if (total > 0) {
            p = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.15) / total));
          }
        }

        // Direct GPU composited update of progress bar without React re-render
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${p})`;
        }

        // Only update React state when rounded percentage changes to avoid render thrashing
        setProgress((prev) => {
          const prevPct = Math.round(prev * 100);
          const newPct = Math.round(p * 100);
          return prevPct !== newPct ? p : prev;
        });

        // Detect active heading from cached elements
        const headingElements = headingElementsRef.current;
        if (headingElements.length > 0) {
          if (p >= 0.92) {
            const lastId = headingElements[headingElements.length - 1].id;
            setActiveId((prev) => {
              if (prev !== lastId) {
                scrollActivePillIntoView(lastId);
                return lastId;
              }
              return prev;
            });
          } else {
            let current = headingElements[0].id;
            const threshold = window.innerHeight * 0.38;
            for (let i = 0; i < headingElements.length; i++) {
              const { id, el } = headingElements[i];
              if (el.getBoundingClientRect().top < threshold) {
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
          }
        }

        rafId = null;
      });
    };

    const onResize = () => {
      articleEl = null;
      updateHeadingCache();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [headings, scrollActivePillIntoView]);

  if (!headings || headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
    e.preventDefault();
    let el = document.getElementById(id);
    if (!el) {
      const allHeadings = document.querySelectorAll<HTMLElement>(
        '#article-content h2, #article-content h3'
      );
      if (allHeadings[index]) el = allHeadings[index];
    }

    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 118;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      setActiveId(id);
      scrollActivePillIntoView(id);
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const pctDisplay = `${Math.round(progress * 100)}%`;

  return (
    <div
      className="sticky top-[52px] sm:top-[60px] z-30 bg-white/95 backdrop-blur-md border-b border-[#ECE7E2] shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-5 h-12 relative">
        {/* Horizontal Scrollable Chapters with subtle edge fade */}
        <nav
          ref={navRef}
          aria-label={isAr ? 'أقسام المقال' : 'Article Chapters'}
          className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 min-w-0 scroll-smooth touch-pan-x"
        >
          {headings.map((heading, idx) => {
            const isActive = activeId === heading.id;
            const shortTitle = formatChapterTitle(heading.text, idx, isAr);
            const chapterNum = String(idx + 1).padStart(2, '0');

            return (
              <a
                key={heading.id}
                ref={(node) => {
                  linkRefs.current[heading.id] = node;
                }}
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id, idx)}
                title={heading.text}
                aria-current={isActive ? 'true' : undefined}
                className={`group flex items-center shrink-0 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'bg-[#0B0B10] text-white border border-[#0B0B10] shadow-[0_2px_8px_rgba(11,11,16,0.18)] font-semibold'
                    : 'bg-[#F7F5F2] hover:bg-[#FFF1E6] text-[#4F4F5B] hover:text-[#0B0B10] border border-[#ECE7E2] hover:border-[#FFD2B0] shadow-2xs'
                }`}
              >
                {/* Numeric index prefix with PontLook orange accent */}
                <span
                  className={`font-mono text-[10px] sm:text-[11px] font-bold transition-colors ${
                    isActive
                      ? 'text-[#FF5A1F]'
                      : 'text-[#615C54] group-hover:text-[#FF5A1F]'
                  } mr-1.5 rtl:ml-1.5 rtl:mr-0`}
                >
                  {chapterNum}
                </span>

                {/* Shortened, scalable chapter label */}
                <span className="truncate max-w-[140px] sm:max-w-[200px]">
                  {shortTitle}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Reading Progress Percentage Capsule */}
        <div className="flex items-center gap-2 shrink-0 pl-3 sm:pl-4 rtl:pr-3 rtl:sm:pr-4 border-l rtl:border-r border-[#ECE7E2]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F7F5F2] border border-[#ECE7E2] shadow-2xs">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                progress >= 0.98 ? 'bg-[#10B981]' : 'bg-[#FF5A1F] animate-pulse'
              }`}
              aria-hidden="true"
            />
            <span className="font-heading text-xs font-bold text-[#0B0B10] tabular-nums font-mono leading-none">
              {pctDisplay}
            </span>
          </div>
        </div>

        {/* Precision Laser Reading Progress Indicator along bottom edge */}
        <div className="absolute left-0 right-0 bottom-[-1px] h-[2px] overflow-hidden pointer-events-none">
          <i
            ref={progressBarRef}
            aria-hidden="true"
            className="h-full w-full bg-gradient-to-r from-[#FF5A1F] via-[#FF7A33] to-[#FF5A1F] block shadow-[0_1px_4px_rgba(255,90,31,0.5)] will-change-transform"
            style={{
              transform: `scaleX(${progress})`,
              transformOrigin: isAr ? 'right' : 'left',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogChapterNav;

