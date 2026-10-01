'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowRight, BadgeCheck, ChevronRight, X } from '@/components/icons';
import IconFrame, { type IconFrameVariant } from '@/components/shared/IconFrame';
import { ease } from '@/lib/motion';

/** One browsable record inside the window. Every string comes from the caller. */
export interface ConsoleRecord {
  id: string;
  /** Two-digit ordinal, e.g. "02". Doubles as the spine label. */
  index: string;
  icon: React.ElementType;
  frameVariant: IconFrameVariant;
  badge: string;
  title: string;
  angle: string;
  body: string;
  takeaways: string[];
  mockup: React.ReactNode;
}

type Accent = 'brand' | 'neutral';

const ACCENT = {
  brand: {
    line: 'bg-[#FF5C00]',
    text: 'text-[#FF5C00]',
    softText: 'text-orange-300',
    tabActive: 'bg-[#FF5C00]/15 border-[#FF5C00]/45 text-white',
    check: 'text-[#FF5C00]',
    cta: 'bg-[#FF5C00] hover:bg-[#FF6A1A] text-white shadow-lg shadow-orange-500/25',
    aura: 'bg-[#FF5C00]/20',
    rule: 'rgba(255, 92, 0, 0.55)',
  },
  neutral: {
    line: 'bg-white',
    text: 'text-white',
    softText: 'text-neutral-300',
    tabActive: 'bg-white/[0.12] border-white/40 text-white',
    check: 'text-white',
    cta: 'bg-white hover:bg-neutral-200 text-black shadow-lg shadow-black/40',
    aura: 'bg-white/15',
    rule: 'rgba(255, 255, 255, 0.5)',
  },
} as const;

export interface ConsoleDialogProps {
  records: ConsoleRecord[];
  /** `null` keeps the window closed. */
  activeId: string | null;
  /** Viewport-space centre of the card that opened it, so the window grows out of it. */
  origin: { x: number; y: number } | null;
  onClose: () => void;
  onSelect: (id: string) => void;
  isAr: boolean;
  accent?: Accent;
  copy: {
    takeawaysTitle: string;
    hint: string;
    closeLabel: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * A pop-up "console window" that presents a set of records as a browsable
 * stack rather than a one-shot modal: the spine on the left jumps between
 * entries, the arrow keys step through them, and the window itself springs out
 * of whichever card was clicked. Keyboard, focus and scroll-lock behaviour is
 * handled here so call sites only supply content.
 */
export default function ConsoleDialog({
  records,
  activeId,
  origin,
  onClose,
  onSelect,
  isAr,
  accent = 'brand',
  copy,
}: ConsoleDialogProps) {
  const reduce = useReducedMotion();
  const tone = ACCENT[accent];

  const [mounted, setMounted] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const activeIndex = records.findIndex((r) => r.id === activeId);
  const active = activeIndex >= 0 ? records[activeIndex] : undefined;

  /** +1 when stepping forward through the stack, -1 back — drives the slide. */
  const [step, setStep] = useState(0);
  const lastIndex = useRef(activeIndex);

  // Parallax for the proof widget — a few pixels of lag behind the pointer.
  const rawTiltX = useMotionValue(0);
  const rawTiltY = useMotionValue(0);
  const tiltX = useSpring(rawTiltX, { stiffness: 220, damping: 24 });
  const tiltY = useSpring(rawTiltY, { stiffness: 220, damping: 24 });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (activeIndex < 0) {
      lastIndex.current = -1;
      return;
    }
    if (lastIndex.current >= 0 && lastIndex.current !== activeIndex) {
      setStep(activeIndex > lastIndex.current ? 1 : -1);
    } else if (lastIndex.current < 0) {
      setStep(0);
    }
    lastIndex.current = activeIndex;
  }, [activeIndex]);

  const go = useCallback(
    (delta: number) => {
      if (activeIndex < 0 || records.length < 2) return;
      const next = (activeIndex + delta + records.length) % records.length;
      onSelect(records[next].id);
    },
    [activeIndex, onSelect, records]
  );

  // Scroll lock, focus capture and the key map live together: all three only
  // apply while the window is open and must unwind in the same order. The
  // handlers are read through a ref so stepping between records never re-runs
  // the lock or steals focus back off the spine.
  const isOpen = !!active;
  const latest = useRef({ go, onClose, isAr });
  latest.current = { go, onClose, isAr };

  useEffect(() => {
    if (!isOpen) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const frame = requestAnimationFrame(() => windowRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        latest.current.onClose();
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const forward = latest.current.isAr ? e.key === 'ArrowLeft' : e.key === 'ArrowRight';
        latest.current.go(forward ? 1 : -1);
        return;
      }

      if (e.key !== 'Tab') return;

      // Keep Tab inside the window — it is the only interactive region.
      const nodes = windowRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement;

      if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (current === first || current === windowRef.current)) {
        e.preventDefault();
        last.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      restoreFocusTo.current?.focus?.();
    };
  }, [isOpen]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || e.pointerType === 'touch') return;
      const rect = e.currentTarget.getBoundingClientRect();
      rawTiltX.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
      rawTiltY.set(((e.clientY - rect.top) / rect.height - 0.5) * 12);
    },
    [rawTiltX, rawTiltY, reduce]
  );

  const resetTilt = useCallback(() => {
    rawTiltX.set(0);
    rawTiltY.set(0);
  }, [rawTiltX, rawTiltY]);

  if (!mounted) return null;

  // Offset the window's entrance so it appears to grow out of the clicked card.
  const travel = (() => {
    if (reduce || !origin || typeof window === 'undefined') return { x: 0, y: 0 };
    return {
      x: (origin.x - window.innerWidth / 2) * 0.55,
      y: (origin.y - window.innerHeight / 2) * 0.55,
    };
  })();

  const slide = reduce ? 0 : step * 28;
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / records.length) * 100 : 0;

  return createPortal(
    <AnimatePresence>
      {active && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="console-dialog-title"
        >
          {/* Backdrop — blurs the page and pulls a vignette in from the edges. */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 cursor-pointer bg-black/80 backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.75)_100%)]" />
            <div className="grain absolute inset-0" />
          </m.div>

          {/* Window */}
          <m.div
            ref={windowRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.86, x: travel.x, y: travel.y }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: travel.x * 0.45, y: travel.y * 0.45 }}
            transition={{ type: 'spring', stiffness: 250, damping: 26, mass: 0.9 }}
            className="relative z-10 my-auto flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/95 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_40px_90px_-20px_rgba(0,0,0,0.95)] outline-none backdrop-blur-2xl sm:rounded-[26px]"
          >
            {/* Drifting graph paper + accent aura, pinned to the window frame so
                they stay put while the body scrolls. */}
            <div className="console-grid pointer-events-none absolute inset-0 overflow-hidden opacity-70" aria-hidden="true" />
            <div
              className={`pointer-events-none absolute -top-24 ${isAr ? '-left-24' : '-right-24'} h-64 w-64 rounded-full blur-[90px] ${tone.aura}`}
              aria-hidden="true"
            />

            {/* Title bar */}
            <div className="relative z-10 flex shrink-0 items-center gap-3 border-b border-[#26282D] bg-black/80 px-3.5 py-3 sm:px-5">
              <span className="font-mono text-[11px] tabular-nums text-neutral-500">
                {active.index}
                <span className="mx-1 text-neutral-600">/</span>
                {String(records.length).padStart(2, '0')}
              </span>

              <div className="mx-auto hidden items-center gap-2 sm:flex">
                <IconFrame variant={active.frameVariant} size="xs" glow={false}>
                  <active.icon size={13} />
                </IconFrame>
                <span className="max-w-[22rem] truncate font-sans text-xs font-medium text-neutral-300">
                  {active.angle}
                </span>
              </div>

              <m.button
                type="button"
                whileHover={{ rotate: 90, scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label={copy.closeLabel}
                className="ms-auto flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors hover:bg-white/20 hover:text-white sm:ms-0"
              >
                <X size={15} />
              </m.button>
            </div>

            {/* Position readout */}
            <div className="relative z-10 h-px shrink-0 bg-[#26282D]" aria-hidden="true">
              <m.div
                className={`absolute inset-y-0 start-0 ${tone.line}`}
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.45, ease: ease.out }}
              />
            </div>

            <div className="relative z-10 flex min-h-0 flex-1 flex-col sm:flex-row">
              {/* Spine — jumps between records without closing the window. */}
              <div className="flex shrink-0 items-center gap-2 overflow-x-auto border-b border-[#26282D] px-3.5 py-2.5 scrollbar-none sm:w-[128px] sm:flex-col sm:items-stretch sm:overflow-visible sm:border-b-0 sm:border-e sm:px-3 sm:py-4">
                {records.map((r) => {
                  const isActive = r.id === active.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => onSelect(r.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group/tab relative flex shrink-0 items-center gap-2 rounded-xl border px-2.5 py-2 text-start transition-all duration-200 sm:w-full ${
                        isActive
                          ? tone.tabActive
                          : 'border-transparent text-neutral-500 hover:border-[#26282D] hover:bg-white/[0.04] hover:text-neutral-200'
                      }`}
                    >
                      <span className="font-mono text-[11px] font-bold tabular-nums">{r.index}</span>
                      <span className="hidden truncate text-[11px] font-medium leading-tight sm:block">
                        {r.badge}
                      </span>
                      {isActive && (
                        <span
                          className={`absolute bottom-0 start-2 end-2 h-0.5 rounded-full sm:bottom-auto sm:end-auto sm:start-0 sm:top-2 sm:h-[calc(100%-1rem)] sm:w-0.5 ${tone.line}`}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Record body */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-7">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={active.id}
                    initial={{ opacity: 0, x: isAr ? -slide : slide }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isAr ? slide : -slide }}
                    transition={{ duration: 0.28, ease: ease.out }}
                    className="space-y-5"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 font-sans text-[11px] font-semibold ${
                            accent === 'brand'
                              ? 'border-orange-500/25 bg-orange-500/10 text-orange-400'
                              : 'border-white/20 bg-white/10 text-white'
                          }`}
                        >
                          {active.badge}
                        </span>
                        <span className="font-sans text-[11px] font-medium text-neutral-500 sm:hidden">
                          {active.angle}
                        </span>
                      </div>

                      <h3
                        id="console-dialog-title"
                        className="mt-3 font-heading text-xl font-semibold leading-tight tracking-tight text-white sm:text-3xl"
                      >
                        {active.title}
                      </h3>

                      <p className="mt-2.5 max-w-2xl font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
                        {active.body}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                      {/* Guarantees — each line draws itself in. */}
                      <div className="rounded-2xl border border-[#26282D] bg-black p-4">
                        <div className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                          <span className={`h-3 w-0.5 rounded-full ${tone.line}`} aria-hidden="true" />
                          {copy.takeawaysTitle}
                        </div>

                        <ul className="mt-3.5 space-y-2.5 font-sans text-xs leading-relaxed text-neutral-200 sm:text-[13px]">
                          {active.takeaways.map((point, i) => (
                            <m.li
                              key={point}
                              initial={{ opacity: 0, x: isAr ? 14 : -14 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.08 + i * 0.07,
                                type: 'spring',
                                stiffness: 320,
                                damping: 24,
                              }}
                              className="flex items-start gap-2.5 border-s border-[#26282D] ps-3"
                            >
                              <BadgeCheck size={14} className={`mt-0.5 shrink-0 ${tone.check}`} />
                              <span>{point}</span>
                            </m.li>
                          ))}
                        </ul>
                      </div>

                      {/* Proof widget in a readout frame with pointer parallax. */}
                      <div
                        onPointerMove={onPointerMove}
                        onPointerLeave={resetTilt}
                        className="relative overflow-hidden rounded-2xl border border-[#26282D] bg-black p-3 sm:p-4"
                        style={{ perspective: 900 }}
                      >
                        <div
                          className="console-scan pointer-events-none absolute inset-x-0 top-0 h-10"
                          style={{
                            background: `linear-gradient(to bottom, transparent, ${tone.rule}, transparent)`,
                            opacity: 0.16,
                          }}
                          aria-hidden="true"
                        />
                        <m.div style={reduce ? undefined : { x: tiltX, y: tiltY }} className="relative">
                          {active.mockup}
                        </m.div>
                      </div>
                    </div>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Footer: step controls on the left, commitment on the right. */}
            <div className="relative z-10 flex shrink-0 flex-col gap-3 border-t border-[#26282D] bg-black/90 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
              <div className="flex items-center gap-2">
                {records.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label={records[(activeIndex - 1 + records.length) % records.length].title}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#26282D] bg-white/[0.04] text-neutral-400 transition-all hover:border-white/25 hover:text-white active:scale-95"
                    >
                      <ChevronRight size={15} className="rotate-180 rtl:rotate-0" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label={records[(activeIndex + 1) % records.length].title}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#26282D] bg-white/[0.04] text-neutral-400 transition-all hover:border-white/25 hover:text-white active:scale-95"
                    >
                      <ChevronRight size={15} className="rtl:rotate-180" />
                    </button>
                  </>
                )}
                <span className="ms-1 hidden font-sans text-[11px] text-neutral-500 lg:inline">
                  {copy.hint}
                </span>
              </div>

              <m.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={copy.ctaHref}
                  onClick={onClose}
                  className={`inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 font-sans text-xs font-semibold transition-colors sm:text-sm ${tone.cta}`}
                >
                  <span>{copy.ctaLabel}</span>
                  <ArrowRight size={14} className="rtl:-scale-x-100" />
                </Link>
              </m.div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
