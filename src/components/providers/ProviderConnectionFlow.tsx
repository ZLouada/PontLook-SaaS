'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

interface ProviderConnectionFlowProps {
  lang: string;
}

export default function ProviderConnectionFlow({ lang }: ProviderConnectionFlowProps) {
  const isAr = lang === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inViewXs, setInViewXs] = useState(false);
  const [inViewCta, setInViewCta] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [stat1, setStat1] = useState(4);
  const [stat2, setStat2] = useState(48);

  const xsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const selectCard = useCallback((index: number) => {
    setActiveIndex(index);
    setProgressKey((prev) => prev + 1);
  }, []);

  const prev = useCallback(() => {
    const nextIndex = (activeIndex - 1 + 4) % 4;
    selectCard(nextIndex);
  }, [activeIndex, selectCard]);

  const next = useCallback(() => {
    const nextIndex = (activeIndex + 1) % 4;
    selectCard(nextIndex);
  }, [activeIndex, selectCard]);

  // Card hover with 110ms debounce on pointer devices
  const handleMouseEnterCard = (index: number) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      if (index !== activeIndex) {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
          selectCard(index);
        }, 110);
      }
    }
  };

  const handleMouseLeaveCard = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  // Keyboard navigation across cards
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let delta = 0;
    if (e.key === 'ArrowRight') delta = isAr ? -1 : 1;
    else if (e.key === 'ArrowLeft') delta = isAr ? 1 : -1;
    else if (e.key === 'ArrowDown') delta = 1;
    else if (e.key === 'ArrowUp') delta = -1;
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectCard(index);
      return;
    }

    if (delta !== 0) {
      e.preventDefault();
      const nextIndex = (index + delta + 4) % 4;
      selectCard(nextIndex);
      cardsRef.current[nextIndex]?.focus();
    }
  };

  // Intersection Observer for the cards section (triggering autoplay)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = xsRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInViewXs(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setInViewXs(entries[0].isIntersecting);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Intersection Observer for the CTA section (triggering circular gauges & countup)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ctaRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInViewCta(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInViewCta(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Countup animation for stats in CTA
  useEffect(() => {
    if (!inViewCta) return;
    if (typeof window === 'undefined') return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setStat1(4);
      setStat2(48);
      return;
    }

    setStat1(0);
    setStat2(0);
    const duration = 1400;
    const t0 = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - t0) / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      setStat1(Math.round(4 * ease));
      setStat2(Math.round(48 * ease));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inViewCta]);

  const stages = [
    {
      n: '01',
      tag: isAr ? 'مركز التدريب' : 'Training Firm',
      vLabel: isAr ? 'مركز التدريب' : 'Training Firm',
      title: isAr ? 'مركزك التدريبي' : 'Your Training Firm',
      desc: isAr ? 'خبرات تدريبية متخصصة لدول الخليج' : 'Specialized GCC Expertise',
      foot: isAr ? 'طاقة استيعابية جاهزة' : 'Delivery Ready',
      renderVisual: () => (
        <div className="v1">
          <s /><s /><s />
          <div className="tile">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="3" width="14" height="18" rx="1.5" />
              <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
            </svg>
          </div>
        </div>
      ),
      renderIcon: () => (
        <svg viewBox="0 0 24 24">
          <rect x="5" y="3" width="14" height="18" rx="1.5" />
          <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
        </svg>
      ),
    },
    {
      n: '02',
      tag: isAr ? 'محرك الربط' : 'Connection Engine',
      vLabel: isAr ? 'محرك الربط' : 'Connection Engine',
      title: isAr ? 'منصة بونت لوك' : 'PontLook Platform',
      desc: isAr ? 'مطابقة آلية وتأهيل BANT' : 'Verified BANT Audit & Match',
      foot: isAr ? 'صفر اشتراكات · ضمان 100%' : 'Zero Retainer · 100% SLA',
      renderVisual: () => (
        <div className="v2">
          <div className="sw" />
          <div className="rn" />
          <div className="rn" />
          <em>B</em><em>A</em><em>N</em><em>T</em>
          <div className="tile ac">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.6" />
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
              <circle cx="12" cy="19" r="1.6" />
              <circle cx="12" cy="12" r="2.2" />
              <path d="M12 7v3M7 12h3M14 12h3M12 14v3" />
            </svg>
          </div>
        </div>
      ),
      renderIcon: () => (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.6" />
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
          <circle cx="12" cy="19" r="1.6" />
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 7v3M7 12h3M14 12h3M12 14v3" />
        </svg>
      ),
    },
    {
      n: '03',
      tag: isAr ? 'قناة التعاقد' : 'Direct Pipeline',
      vLabel: isAr ? 'قناة التعاقد' : 'Direct Pipeline',
      title: isAr ? 'تعاقد مباشر' : 'Direct Engagement',
      desc: isAr ? 'بدون وساطة أو مناقصات باردة' : 'Zero Cold Bidding Cycles',
      foot: isAr ? 'كراسة شروط معتمدة' : 'Pre-Scoped Mandates',
      renderVisual: () => (
        <div className="v3">
          <u />
          <div className="ln" />
          <div className="pk" />
          <div className="tile">
            <svg viewBox="0 0 24 24">
              <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8z" />
            </svg>
          </div>
          <u />
        </div>
      ),
      renderIcon: () => (
        <svg viewBox="0 0 24 24">
          <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8z" />
        </svg>
      ),
    },
    {
      n: '04',
      tag: isAr ? 'المنشأة المتعاقدة' : 'Corporate Buyer',
      vLabel: isAr ? 'المنشأة المتعاقدة' : 'Corporate Buyer',
      title: isAr ? 'عملاء مؤسسيون' : 'Enterprise Client',
      desc: isAr ? 'ميزانية معتمدة 120-250+ ألف ر.س' : 'SAR 120k–250k+ Budget',
      foot: isAr ? 'الرياض · دبي · الدوحة' : 'Riyadh · Dubai · Doha',
      renderVisual: () => (
        <div className="v4">
          <i /><i /><i />
          <div className="tile">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2M3 13h18" />
            </svg>
          </div>
        </div>
      ),
      renderIcon: () => (
        <svg viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2M3 13h18" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="connection-bridge"
      className="relative py-12 sm:py-20 px-3.5 xs:px-4 sm:px-6 lg:px-8 bg-black overflow-hidden scroll-mt-16"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-[#FF5A00]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className={`dcb ${isPaused ? 'paused' : ''}`} aria-labelledby="dcb-h">
        {/* Header Bar: Eye-brow, Title, Navigation Arrows & Stage Counter */}
        <div className="dcb-hd">
          <div>
            <div className="dcb-eye">
              {isAr ? 'نموذج الربط المباشر' : 'DIRECT CONNECTION ARCHITECTURE'}
            </div>
            <h2 id="dcb-h">
              {isAr
                ? 'ربط الخبرات التدريبية بالطلب المؤسسي المؤكد'
                : 'Connecting Training Expertise with Confirmed Demand'}
            </h2>
          </div>
          <div className="dcb-nav">
            <button
              type="button"
              onClick={prev}
              aria-label={isAr ? 'المرحلة السابقة' : 'Previous stage'}
            >
              {isAr ? '→' : '←'}
            </button>
            <span>
              <b className="cnt">0{activeIndex + 1}</b> / 04
            </span>
            <button
              type="button"
              onClick={next}
              aria-label={isAr ? 'المرحلة التالية' : 'Next stage'}
            >
              {isAr ? '←' : '→'}
            </button>
          </div>
        </div>

        {/* 4 Expanding Interactive Panels (Accordion) */}
        <div
          ref={xsRef}
          className="xs"
          role="tablist"
          aria-label={isAr ? 'مراحل الربط المباشر' : 'Direct connection stages'}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {stages.map((stage, idx) => {
            const isActive = activeIndex === idx;
            return (
              <article
                key={stage.n}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className={`xp ${isActive ? 'on' : ''} ${isActive && inViewXs ? 'auto' : ''}`}
                role="tab"
                tabIndex={0}
                data-n={stage.n}
                aria-selected={isActive}
                onClick={() => selectCard(idx)}
                onFocus={() => selectCard(idx)}
                onMouseEnter={() => handleMouseEnterCard(idx)}
                onMouseLeave={handleMouseLeaveCard}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <span className="xp-num">{stage.n}</span>
                <span className="xp-tag">{stage.tag}</span>
                <span className="xp-ico">{stage.renderIcon()}</span>
                <span className="xp-v">{stage.vLabel}</span>

                {/* Animated Interactive Visualizer */}
                <div className="xp-vis" aria-hidden="true">
                  {stage.renderVisual()}
                </div>

                {/* Card Expanded Content Body */}
                <div className="xp-body">
                  <h3>{stage.title}</h3>
                  <p>{stage.desc}</p>
                  <span className="xp-ft">{stage.foot}</span>
                </div>

                {/* 6s Progress Bar for Auto Slide Progression */}
                {isActive && (
                  <i
                    key={progressKey}
                    className="xp-pr"
                    style={{
                      animationPlayState: isPaused ? 'paused' : 'running',
                    }}
                    onAnimationEnd={next}
                  />
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Block with Moving Gradient Border & Circular Radial Gauges */}
        <div
          ref={ctaRef}
          id="apply"
          className={`cta ${inViewCta ? 'in' : ''}`}
        >
          <div className="cta-l">
            <h3>
              {isAr
                ? 'جاهز لملء جدول تدريبك بطلبات مؤكدة؟'
                : 'Ready to fill your delivery schedule with qualified clients?'}
            </h3>
            <p>
              {isAr
                ? 'أكمل نموذج التأهيل المبدئي خلال 4 دقائق وسيتواصل معك فريق الشراكات لتفعيل ملفك خلال 48 ساعة.'
                : 'Complete our 4-minute qualification form. Our team will activate your profile within 48 hours.'}
            </p>
            <div className="btns">
              <Link href={`/${lang}/for-providers/apply`} className="pri">
                <span>{isAr ? 'تقديم طلب الانضمام كشريك معتمد' : 'Apply as Verified Provider'}</span>
                <span aria-hidden="true" className={isAr ? 'inline-block -scale-x-100' : ''}>
                  →
                </span>
              </Link>
              <a href="#story" className="sec">
                {isAr ? 'مزايا ونموذج الشراكة' : 'Partnership Model & SLAs'}
              </a>
            </div>
            <div className="mt-4 text-[11px] text-neutral-400 font-mono">
              {isAr
                ? '🔒 انضمام مجاني · استكمال الطلب في 4 دقائق · احتفظ بكامل أتعاب تنفيذ التدريب بنسبة 100%.'
                : '🔒 Free to join · 4-minute application · Keep 100% of your training delivery fees.'}
            </div>
          </div>

          <div className="cta-r" aria-hidden="true">
            <div className="dl" style={{ '--o': '65' } as React.CSSProperties}>
              <svg viewBox="0 0 120 120">
                <circle className="bg" cx="60" cy="60" r="52" />
                <circle className="fg" cx="60" cy="60" r="52" />
              </svg>
              <div>
                <b data-c="4">{stat1}</b>
                <span>{isAr ? 'دقائق للطلب' : 'minute form'}</span>
              </div>
            </div>
            <div className="dl" style={{ '--o': '30' } as React.CSSProperties}>
              <svg viewBox="0 0 120 120">
                <circle className="bg" cx="60" cy="60" r="52" />
                <circle className="fg" cx="60" cy="60" r="52" />
              </svg>
              <div>
                <b data-c="48">{stat2}</b>
                <span>{isAr ? 'ساعة للتفعيل' : 'hours to activate'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
