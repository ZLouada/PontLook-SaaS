'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { m, useReducedMotion, type MotionProps } from 'framer-motion';

export interface RailProps {
  children: React.ReactNode;
  /** Classes for the scroller itself — sizing, gap, breakpoint switch to a grid. */
  className?: string;
  /**
   * Motion props for the scroller. The scroller is a motion element so a
   * `staggerContainer` set here still propagates to slides using `staggerItem`
   * — variant inheritance only crosses motion components, so a plain wrapper
   * here would silently leave every slide stuck in its `hidden` state.
   */
  reveal?: MotionProps;
  /** Render pagination under the rail. */
  dots?: boolean;
  /** Dots sit on a white section (`dark` ink) or a black one (`light` ink). */
  dotTone?: 'dark' | 'light';
  /** Breakpoint class that hides the dots once the rail becomes a grid. */
  dotsHiddenAt?: string;
  dotLabel?: (index: number) => string;
  onIndexChange?: (index: number) => void;
  ariaLabel?: string;
}

/**
 * Horizontal snap rail for touch screens.
 *
 * Desktop turns these decks into real grids, so a phone used to get the grid's
 * leftovers: a plain overflow scroller with nothing reacting to the swipe. This
 * adds the part that was missing — slides scale and fade by their distance from
 * the rail's centre as you drag, so the deck reads as depth rather than as a
 * clipped row.
 *
 * Geometry comes from `getBoundingClientRect`, never `scrollLeft`, because the
 * sign and origin of `scrollLeft` differ across engines in RTL. Slide depth is
 * written to a child marked `data-rail-depth` when one exists, which keeps it
 * clear of any `transform` framer-motion is already driving on the slide itself.
 */
export default function Rail({
  children,
  className = '',
  reveal,
  dots = false,
  dotTone = 'dark',
  dotsHiddenAt = 'lg:hidden',
  dotLabel,
  onIndexChange,
  ariaLabel,
}: RailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const reduce = useReducedMotion();

  const depthNode = (slide: Element): HTMLElement =>
    (slide.querySelector('[data-rail-depth]') as HTMLElement) ?? (slide as HTMLElement);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;

    const slides = Array.from(el.children) as HTMLElement[];
    const isScrollable = el.scrollWidth - el.clientWidth > 8;

    setSlideCount(slides.length);
    setScrollable(isScrollable);

    // Grid mode (desktop) — hand every slide back untouched.
    if (!isScrollable) {
      slides.forEach((slide) => {
        const node = depthNode(slide);
        node.style.transform = '';
        node.style.opacity = '';
      });
      return;
    }

    const railBox = el.getBoundingClientRect();
    const railCenter = railBox.left + railBox.width / 2;
    let nearest = 0;
    let nearestDistance = Infinity;

    slides.forEach((slide, i) => {
      const box = slide.getBoundingClientRect();
      const offset = box.left + box.width / 2 - railCenter;
      const distance = Math.abs(offset);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = i;
      }

      if (reduce) return;

      // Normalise against the slide's own width so the falloff feels the same
      // whether a slide is 74vw or 88vw.
      const d = Math.min(Math.abs(offset) / Math.max(box.width, 1), 1);
      const node = depthNode(slide);
      node.style.transform = `scale(${(1 - 0.055 * d).toFixed(4)}) translate3d(0, ${(7 * d).toFixed(2)}px, 0)`;
      node.style.opacity = `${(1 - 0.32 * d).toFixed(3)}`;
    });

    setActive(nearest);
  }, [reduce]);

  const onScroll = useCallback(() => {
    if (frame.current !== null) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      measure();
    });
  }, [measure]);

  useEffect(() => {
    onIndexChange?.(active);
    // The callback identity is not part of what we are reacting to.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    Array.from(el.children).forEach((child) => ro.observe(child));

    return () => {
      ro.disconnect();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  const scrollToIndex = (index: number) => {
    const el = railRef.current;
    const slide = el?.children[index];
    if (!slide) return;
    // `scrollIntoView` resolves the inline axis itself, which keeps this correct
    // under `dir="rtl"` without second-guessing scrollLeft's sign.
    slide.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <div className="relative">
      <m.div
        ref={railRef}
        onScroll={onScroll}
        className={`rail ${className}`}
        role={scrollable ? 'group' : undefined}
        aria-label={ariaLabel}
        {...reveal}
      >
        {children}
      </m.div>

      {dots && slideCount > 1 && (
        <div
          className={`flex ${dotsHiddenAt} items-center justify-center gap-0.5 pt-1`}
          role="tablist"
          aria-label={ariaLabel}
        >
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={dotLabel?.(i) ?? `Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className="group flex h-11 w-7 items-center justify-center"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? 'w-5' : 'w-1.5'
                } ${
                  dotTone === 'dark'
                    ? active === i
                      ? 'bg-neutral-950'
                      : 'bg-neutral-300 group-hover:bg-neutral-400'
                    : active === i
                    ? 'bg-white'
                    : 'bg-white/25 group-hover:bg-white/40'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
