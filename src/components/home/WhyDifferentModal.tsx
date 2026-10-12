'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowRight } from '@/components/icons';
import IconFrame from '@/components/shared/IconFrame';

export interface CardItemData {
  id: string;
  badge: string;
  title: string;
  angle?: string;
  visualMetaphor?: string;
  text: string;
  cta: string;
  href: string;
  isExternal: boolean;
  takeaways: string[];
  mockup: React.ReactNode;
  theme: {
    accentText: string;
    badgeBg: string;
    iconBg: string;
    buttonBg: string;
    checkColor: string;
    flipHintBg: string;
  };
  themeVariant: any;
  icon: any;
}

export interface WhyDifferentModalProps {
  activeCard: any;
  isAr: boolean;
  onClose: () => void;
}

export default function WhyDifferentModal({
  activeCard,
  isAr,
  onClose,
}: WhyDifferentModalProps) {
  useEffect(() => {
    if (!activeCard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCard, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {activeCard && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 xs:p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* modal content */}
          <m.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 16,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 12,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 w-full max-w-2xl sm:max-w-3xl max-h-[85dvh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 text-neutral-900 shadow-2xl my-auto overflow-hidden"
          >
            {/* Modal Top Bar (Fixed Header) */}
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 gap-3 shrink-0"
            >
              <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                <IconFrame variant={activeCard.themeVariant} size="sm">
                  <activeCard.icon size={15} />
                </IconFrame>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold font-sans ${activeCard.theme.badgeBg}`}
                >
                  {activeCard.badge}
                </span>
                {activeCard.angle && (
                  <span
                    className={`text-[11px] sm:text-xs font-medium font-sans ${activeCard.theme.accentText}`}
                  >
                    {activeCard.angle}
                  </span>
                )}
              </div>

              <m.button
                type="button"
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label={isAr ? 'إغلاق النافذة' : 'Close window'}
                className="tap-target h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <X size={17} />
              </m.button>
            </m.div>

            {/* Modal Scrollable Body: Content smoothly scrolls on phone screens */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4 overscroll-contain">
              <m.div
                initial={{ opacity: 0, x: isAr ? 15 : -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 tracking-tight leading-snug font-heading">
                  {activeCard.title}
                </h3>
                <p className="text-sm text-neutral-600 font-sans leading-relaxed mt-1.5">
                  {activeCard.text}
                </p>
              </m.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
                {/* Strategic Advantages Checklist with Cascading Bullet Animation */}
                <m.div
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="rounded-xl p-3 sm:p-3.5 bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-2"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider font-sans mb-1">
                      {isAr ? 'أهم المميزات والقيمة المقدمة' : 'Key Strategic Advantages'}
                    </div>
                    {activeCard.visualMetaphor && (
                      <div className="text-[10px] text-neutral-500 font-sans mb-2 italic">
                        {activeCard.visualMetaphor}
                      </div>
                    )}
                  </div>
                  <ul className="space-y-2 text-[0.8125rem] sm:text-sm text-neutral-700 font-sans">
                    {activeCard.takeaways.map((point: string, pIdx: number) => (
                      <m.li
                        key={pIdx}
                        initial={{ opacity: 0, x: isAr ? 12 : -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.24 + pIdx * 0.06,
                          type: 'spring',
                          stiffness: 320,
                          damping: 22,
                        }}
                        className="leading-snug flex items-start gap-1.5"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            activeCard.theme.checkColor === 'text-[#FF5C00]'
                              ? 'bg-[#FF5C00]'
                              : 'bg-neutral-950'
                          } mt-1 shrink-0`}
                        />
                        <span>{point}</span>
                      </m.li>
                    ))}
                  </ul>
                </m.div>

                {/* Mockup Proof Widget with Smooth Slide-In */}
                <m.div
                  initial={{ opacity: 0, x: isAr ? -15 : 15, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.22, duration: 0.35 }}
                  className="flex items-center"
                >
                  {activeCard.mockup}
                </m.div>
              </div>
            </div>

            {/* Modal Fixed Footer: Close Hint & CTA Button (Full width on phone) */}
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.3 }}
              className="p-3.5 sm:p-5 border-t border-neutral-200 bg-neutral-50 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3"
            >
              <span className="text-[11px] text-neutral-500 font-sans hidden sm:inline">
                {isAr
                  ? 'انقر في المساحة الفارغة أو Esc للإغلاق'
                  : 'Click outside or press Esc to close'}
              </span>

              {activeCard.isExternal ? (
                <m.a
                  href={activeCard.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-xl ${activeCard.theme.buttonBg} font-medium text-sm transition-colors font-sans touch-manipulation active:scale-[0.98]`}
                >
                  <span>{activeCard.cta}</span>
                  <ExternalLink size={14} className="ms-1.5" />
                </m.a>
              ) : (
                <m.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="w-full sm:w-auto"
                >
                  <Link
                    href={activeCard.href}
                    className={`w-full inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-xl ${activeCard.theme.buttonBg} font-medium text-sm transition-colors font-sans touch-manipulation active:scale-[0.98]`}
                  >
                    <span>{activeCard.cta}</span>
                    <ArrowRight size={14} className="ms-1.5 rtl:-scale-x-100" />
                  </Link>
                </m.div>
              )}
            </m.div>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
