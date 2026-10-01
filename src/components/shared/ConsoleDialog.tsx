'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, ShieldCheck, X } from '@/components/icons';
import { ease } from '@/lib/motion';

export interface ConsoleRecord {
  id: string;
  index: string;
  icon: React.ElementType;
  frameVariant?: string;
  badge: string;
  title: string;
  angle: string;
  body: string;
  takeaways: string[];
  mockup: React.ReactNode;
}

export interface ConsoleDialogProps {
  records: ConsoleRecord[];
  activeId: string | null;
  origin?: { x: number; y: number } | null;
  onClose: () => void;
  onSelect: (id: string) => void;
  isAr: boolean;
  accent?: 'brand' | 'neutral';
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
  const [mounted, setMounted] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const activeIndex = records.findIndex((r) => r.id === activeId);
  const active = activeIndex >= 0 ? records[activeIndex] : undefined;

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (delta: number) => {
      if (activeIndex < 0 || records.length < 2) return;
      const next = (activeIndex + delta + records.length) % records.length;
      onSelect(records[next].id);
    },
    [activeIndex, onSelect, records]
  );

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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {active && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-2.5 xs:p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="console-dialog-title"
        >
          {/* Backdrop Blur */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 cursor-pointer bg-black/80 backdrop-blur-md"
          />

          {/* Clean Modern Modal Window — Proportioned to fit without scrolling */}
          <m.div
            ref={windowRef}
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative z-10 my-auto flex max-h-[94dvh] lg:max-h-[min(90dvh,640px)] w-full max-w-4xl lg:max-w-5xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-[#26282D] bg-[#0A0B0E] text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)] outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ring-0"
          >
            {/* Ambient Background Aura */}
            <div
              className={`pointer-events-none absolute -top-24 ${isAr ? '-left-24' : '-right-24'} h-72 w-72 rounded-full blur-[100px] ${
                accent === 'brand' ? 'bg-orange-500/[0.08]' : 'bg-blue-500/[0.08]'
              }`}
              aria-hidden="true"
            />

            {/* Top Bar: Title & Close Button */}
            <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-[#26282D] bg-[#0E0F14] px-4 sm:px-6 py-2.5 sm:py-3">
              <div className="flex items-center gap-2 xs:gap-2.5">
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md font-mono text-[10px] sm:text-xs font-bold bg-[#FF5C00]/15 text-[#FF5C00] border border-[#FF5C00]/30">
                  {active.index}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white font-sans tracking-tight">
                  {active.badge}
                </span>
                <span className="hidden sm:inline-block text-neutral-600">·</span>
                <span className="hidden sm:inline-block text-xs text-neutral-400 font-sans truncate max-w-xs md:max-w-md">
                  {active.angle}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={copy.closeLabel}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-white/[0.06] hover:bg-white/[0.14] text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Top Segmented Tabs Bar */}
            <div className="relative z-10 flex items-center gap-1.5 xs:gap-2 border-b border-[#26282D] bg-[#0A0B0E] px-4 sm:px-6 py-2 overflow-x-auto scrollbar-none">
              {records.map((r, i) => {
                const isActive = r.id === active.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onSelect(r.id)}
                    className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {isActive && (
                      <m.div
                        layoutId="console-dialog-active-tab"
                        className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/[0.10] border border-white/20 shadow-sm"
                        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      />
                    )}
                    <span
                      className={`relative z-10 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded font-mono text-[10px] sm:text-xs font-bold ${
                        isActive ? 'bg-[#FF5C00] text-white' : 'bg-white/[0.05] text-neutral-400'
                      }`}
                    >
                      {r.index}
                    </span>
                    <span className="relative z-10 font-sans tracking-tight">{r.badge}</span>
                  </button>
                );
              })}
            </div>

            {/* Stage Content — Proportioned and fitted so it doesn't need to scroll on desktop */}
            <div className="min-h-0 flex-1 overflow-y-auto lg:overflow-hidden p-3.5 xs:p-4 sm:p-5 lg:px-6 lg:py-4 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: ease.out }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-center"
                >
                  {/* Left Column: Details & Key Advantages */}
                  <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold bg-white/[0.04] border border-[#26282D] text-neutral-300 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00]" />
                        <span>{active.angle}</span>
                      </span>

                      <h3
                        id="console-dialog-title"
                        className="text-lg xs:text-xl sm:text-2xl font-semibold text-white font-heading tracking-tight leading-snug"
                      >
                        {active.title}
                      </h3>

                      <p className="mt-1 text-xs sm:text-[13px] text-neutral-400 font-sans leading-relaxed max-w-xl">
                        {active.body}
                      </p>
                    </div>

                    {/* Key Advantages / SLAs List */}
                    <div className="pt-2 border-t border-[#26282D] space-y-2">
                      <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                        {copy.takeawaysTitle}
                      </div>

                      <div className="space-y-1.5">
                        {active.takeaways.map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl bg-white/[0.02] border border-[#26282D] text-xs leading-snug text-neutral-300 font-sans"
                          >
                            <ShieldCheck size={14} className="text-[#FF5C00] mt-0.5 shrink-0" />
                            <span className="leading-snug">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Clean Mockup Container (No Scanner, No Grid Lines) */}
                  <div className="lg:col-span-5 w-full">
                    <div className="rounded-2xl border border-[#26282D] bg-[#0F1013] p-2.5 sm:p-3 shadow-xl">
                      {active.mockup}
                    </div>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>

            {/* Bottom Bar: Pager & Primary CTA */}
            <div className="relative z-10 flex shrink-0 flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 xs:gap-3 border-t border-[#26282D] bg-[#0E0F14] px-4 sm:px-6 py-2.5 sm:py-3">
              <div className="flex items-center justify-between sm:justify-start gap-2.5">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label={isAr ? 'السابق' : 'Previous'}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-[#26282D] bg-white/[0.04] text-neutral-400 hover:border-white/20 hover:text-white transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronRight size={14} className={isAr ? '' : 'rotate-180'} />
                  </button>

                  <span className="font-mono text-xs text-neutral-400 px-2 tabular-nums">
                    {active.index} / {String(records.length).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label={isAr ? 'التالي' : 'Next'}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-[#26282D] bg-white/[0.04] text-neutral-400 hover:border-white/20 hover:text-white transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronRight size={14} className={isAr ? 'rotate-180' : ''} />
                  </button>
                </div>

                <span className="hidden md:inline font-sans text-[11px] text-neutral-500">
                  {copy.hint}
                </span>
              </div>

              <Link
                href={copy.ctaHref}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 sm:px-6 py-2 bg-[#FF5C00] hover:bg-[#e05200] text-white font-semibold text-xs sm:text-sm shadow-md active:scale-95 transition-all font-sans"
              >
                <span>{copy.ctaLabel}</span>
                <ArrowRight size={14} className="rtl:-scale-x-100" />
              </Link>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
