'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from '@/components/icons';
import Reveal from '@/components/shared/Reveal';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import ArchitecturalBridge from './ArchitecturalBridge';
import ComparisonToggleContent from './ComparisonToggleContent';
import { m, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface WhoWeAreHeroProps {
  lang?: 'en' | 'ar';
}

export default function WhoWeAreHero({ lang = 'en' }: WhoWeAreHeroProps) {
  const isAr = lang === 'ar';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDoorOpen, setIsDoorOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Pinned scroll controller across the Hero and Door opening sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track scroll state for navbar theme and pointer interactions
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setIsDoorOpen(latest > 0.28);
    });
  }, [scrollYProgress]);

  // 1. Hero text fade-out and slight lift as doors begin parting
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.12], [0, -35]);
  const heroTextScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.94]);

  // 2. 3D Double Door Opening (Left & Right panels swing open)
  // Left door swings open towards the left (negative Y rotation, slides left)
  const leftDoorRotate = useTransform(
    scrollYProgress,
    [0.03, 0.38],
    prefersReducedMotion ? [0, 0] : [0, isDesktop ? -80 : -45]
  );
  const leftDoorX = useTransform(
    scrollYProgress,
    [0.03, 0.38],
    ['0%', isDesktop ? '-35%' : '-100%']
  );

  // Right door swings open towards the right (positive Y rotation, slides right)
  const rightDoorRotate = useTransform(
    scrollYProgress,
    [0.03, 0.38],
    prefersReducedMotion ? [0, 0] : [0, isDesktop ? 80 : 45]
  );
  const rightDoorX = useTransform(
    scrollYProgress,
    [0.03, 0.38],
    ['0%', isDesktop ? '35%' : '100%']
  );

  // Overall door opacity fade-out towards the end of the swing
  const doorOpacity = useTransform(scrollYProgress, [0, 0.32, 0.38], [1, 1, 0]);

  // 3. White room content pop-up (revealed directly behind the opening doors)
  const contentOpacity = useTransform(scrollYProgress, [0.06, 0.32], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.06, 0.36], [0.92, 1]);
  const contentY = useTransform(scrollYProgress, [0.06, 0.36], [40, 0]);

  // Smooth scroll down to view the full comparison engine
  const scrollToMission = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetY = scrollTop + rect.top + (rect.height - window.innerHeight) * 0.52;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      data-nav-dark={!isDoorOpen ? 'true' : undefined}
      data-nav-light={isDoorOpen ? 'true' : undefined}
      data-nav-theme={isDoorOpen ? 'light' : 'dark'}
      className="relative w-full h-[180vh] sm:h-[190vh] lg:h-[210vh] bg-black select-none"
    >
      {/* Pinned Viewport Container: stays fixed during the door opening animation */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center">

        {/* ================================================================
            LAYER 1 (BACK): THE CRISP WHITE ROOM (Comparison Engine)
            Revealed and pops up as the dark doors swing open
            ================================================================ */}
        <div
          id="our-mission"
          className="absolute inset-0 w-full h-full bg-white text-neutral-900 flex flex-col justify-start items-center overflow-y-auto z-10 pt-36 sm:pt-40 lg:pt-40 pb-20 select-text scrollbar-none"
        >
          {/* Pop-Up White Content */}
          <m.div
            style={
              prefersReducedMotion
                ? { opacity: 1, transform: 'none' }
                : {
                    scale: contentScale,
                    opacity: contentOpacity,
                    y: contentY,
                  }
            }
            className="w-full flex flex-col justify-start items-center"
          >
            <ComparisonToggleContent lang={lang} />
          </m.div>
        </div>

        {/* ================================================================
            LAYER 2 (FRONT): THE 3D GRAND DOUBLE DOORS (Dark Canvas + Bridge)
            Splits and opens outward like double doors on scroll
            ================================================================ */}
        <div
          style={{
            perspective: isDesktop ? '1400px' : '900px',
            transformStyle: 'preserve-3d',
            pointerEvents: isDoorOpen ? 'none' : 'auto',
          }}
          className="absolute inset-0 w-full h-full z-20 overflow-hidden"
          aria-hidden={isDoorOpen ? 'true' : 'false'}
        >
          {/* LEFT DOOR PANEL */}
          <m.div
            style={
              prefersReducedMotion
                ? { opacity: doorOpacity }
                : {
                    transformOrigin: 'left center',
                    rotateY: leftDoorRotate,
                    x: leftDoorX,
                    opacity: doorOpacity,
                    willChange: 'transform, opacity',
                  }
            }
            className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden bg-black shadow-2xl"
          >
            {/* Inner canvas spanning full viewport width, anchored at left: 0 */}
            <div className="absolute top-0 left-0 w-[200%] h-full bg-black pointer-events-none">
              {/* Ambient radial lighting glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]" />
              {/* Full-Screen Architectural Bridge */}
              <ArchitecturalBridge className="w-full h-full" />
            </div>

            {/* Right-edge door seam highlight & physical shadow */}
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/5 via-white/30 to-white/5 shadow-[-3px_0_15px_rgba(0,0,0,0.95)] z-30" />
          </m.div>

          {/* RIGHT DOOR PANEL */}
          <m.div
            style={
              prefersReducedMotion
                ? { opacity: doorOpacity }
                : {
                    transformOrigin: 'right center',
                    rotateY: rightDoorRotate,
                    x: rightDoorX,
                    opacity: doorOpacity,
                    willChange: 'transform, opacity',
                  }
            }
            className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden bg-black shadow-2xl"
          >
            {/* Inner canvas spanning full viewport width, shifted left by -100% */}
            <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-black pointer-events-none">
              {/* Ambient radial lighting glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]" />
              {/* Full-Screen Architectural Bridge */}
              <ArchitecturalBridge className="w-full h-full" />
            </div>

            {/* Left-edge door seam highlight & physical shadow */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/5 via-white/30 to-white/5 shadow-[3px_0_15px_rgba(0,0,0,0.95)] z-30" />
          </m.div>
        </div>

        {/* ================================================================
            LAYER 3: HERO TEXT & ACTIONS OVERLAY
            Centered on top of the doors when closed, lifts and fades on scroll
            ================================================================ */}
        <m.div
          style={{
            opacity: heroTextOpacity,
            y: heroTextY,
            scale: heroTextScale,
            pointerEvents: isDoorOpen ? 'none' : 'auto',
          }}
          className="relative z-30 container-site max-w-4xl text-center mx-auto px-3.5 xs:px-4 sm:px-6 flex flex-col items-center justify-between h-[85vh] sm:h-[82vh] pt-20 sm:pt-24 lg:pt-28 pb-4"
        >
          {/* Headlines & Subtitle */}
          <Reveal className="flex flex-col items-center">
            {/* Main Headline */}
            <TextReveal
              as="h1"
              onScroll={false}
              text={
                isAr
                  ? 'منصة مطابقة تدريب الشركات'
                  : 'The Corporate Training Matchmaking Platform'
              }
              className="text-2xl xs:text-3xl sm:text-5xl lg:text-[60px] font-semibold text-white leading-[1.15] sm:leading-[1.1] font-heading tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
            />

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm xs:text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-300 max-w-2xl sm:max-w-3xl mx-auto font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
              {isAr
                ? 'نربط شركات ومزودي التدريب بصناع القرار في كبرى المؤسسات الذين لديهم احتياجات وتحديات حقيقية يسعون لحلها.'
                : 'We connect corporate training companies with enterprise decision makers who already have a real workforce challenge to solve.'}
            </p>
          </Reveal>

          {/* Bottom Scroll Prompt Button */}
          <div className="relative z-10 mb-2 sm:mb-4">
            <button
              type="button"
              onClick={scrollToMission}
              className="inline-flex items-center gap-2 sm:gap-3 px-3.5 xs:px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-[#111215]/85 hover:bg-[#16171B] border border-[#26282D] hover:border-neutral-500 text-[11px] sm:text-sm text-neutral-200 hover:text-white shadow-2xl backdrop-blur-xl transition-all active:scale-95 group max-w-[92vw] cursor-pointer"
            >
              <Signal />
              <span>
                {isAr
                  ? 'اكتشف الفرق: طريقة بونت لوك مقابل الطريقة التقليدية'
                  : 'Explore the difference: PontLook vs Traditional'}
              </span>
              <ArrowDown
                size={14}
                className="text-neutral-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </m.div>

      </div>
    </section>
  );
}
