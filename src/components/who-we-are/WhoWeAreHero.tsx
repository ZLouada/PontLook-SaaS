'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDown } from '@/components/icons';
import Reveal from '@/components/shared/Reveal';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';

interface WhoWeAreHeroProps {
  lang?: 'en' | 'ar';
}

interface LineColumn {
  colIndex: number;
  x: number;
  displacement: number; // Horizontal string wave displacement
  velocity: number;
}

export default function WhoWeAreHero({ lang = 'en' }: WhoWeAreHeroProps) {
  const isAr = lang === 'ar';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let lastTime = performance.now();
    let prevMouseX = -9999;
    let prevMouseY = -9999;
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseInside = false;

    let columns: LineColumn[] = [];

    // Organic wave height function for the top undulating boundary
    const getWaveY = (x: number, t: number): number => {
      const baseOffset = height < 500 ? 45 : 65;
      const w1 = Math.sin(x * 0.0038 + t * 0.0015) * 32;
      const w2 = Math.sin(x * 0.0085 - t * 0.0020) * 18;
      const w3 = Math.cos(x * 0.0022 + t * 0.0009) * 22;
      const w4 = Math.sin(x * 0.015 + t * 0.0028) * 8;

      let mouseDip = 0;
      if (isMouseInside) {
        const dist = Math.abs(x - mouseX);
        if (dist < 160) {
          const factor = 1 - dist / 160;
          mouseDip = Math.sin(dist * 0.04 - t * 0.006) * 14 * factor;
        }
      }

      return baseOffset + w1 + w2 + w3 + w4 + mouseDip;
    };

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = width < 640 ? 18 : 24;
      const numLines = Math.ceil(width / spacing) + 1;
      const startX = (width % spacing) / 2;

      columns = [];
      for (let i = 0; i <= numLines; i++) {
        columns.push({
          colIndex: i,
          x: startX + i * spacing,
          displacement: 0,
          velocity: 0,
        });
      }
    };

    updateDimensions();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      if (newX >= 0 && newX <= width && newY >= 0 && newY <= height) {
        isMouseInside = true;
        mouseX = newX;
        mouseY = newY;

        if (prevMouseX > -9000) {
          const deltaX = newX - prevMouseX;
          const mouseSpeed = Math.hypot(deltaX, newY - prevMouseY);

          const minX = Math.min(prevMouseX, newX);
          const maxX = Math.max(prevMouseX, newX);

          for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            if (col.x >= minX - 4 && col.x <= maxX + 4) {
              const pluckStrength = Math.sign(deltaX) * Math.min(mouseSpeed * 0.35, 16);
              col.velocity += pluckStrength * 25;
            }
          }
        }

        prevMouseX = newX;
        prevMouseY = newY;
      } else {
        isMouseInside = false;
        mouseX = -9999;
        mouseY = -9999;
        prevMouseX = -9999;
        prevMouseY = -9999;
      }
    };

    const handlePointerLeave = () => {
      isMouseInside = false;
      mouseX = -9999;
      mouseY = -9999;
      prevMouseX = -9999;
      prevMouseY = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const newX = e.touches[0].clientX - rect.left;
      const newY = e.touches[0].clientY - rect.top;

      if (newX >= 0 && newX <= width && newY >= 0 && newY <= height) {
        isMouseInside = true;
        mouseX = newX;
        mouseY = newY;

        if (prevMouseX > -9000) {
          const deltaX = newX - prevMouseX;
          const touchSpeed = Math.hypot(deltaX, newY - prevMouseY);

          const minX = Math.min(prevMouseX, newX);
          const maxX = Math.max(prevMouseX, newX);

          for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            if (col.x >= minX - 4 && col.x <= maxX + 4) {
              const pluckStrength = Math.sign(deltaX) * Math.min(touchSpeed * 0.35, 16);
              col.velocity += pluckStrength * 25;
            }
          }
        }

        prevMouseX = newX;
        prevMouseY = newY;
      }
    };

    const handleTouchEnd = () => {
      isMouseInside = false;
      mouseX = -9999;
      mouseY = -9999;
      prevMouseX = -9999;
      prevMouseY = -9999;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('resize', updateDimensions);

    // 60fps render loop
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Spring physics for strings
      const SPRING_TENSION = 140;
      const SPRING_DAMPING = 8;

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const acc = -SPRING_TENSION * col.displacement - SPRING_DAMPING * col.velocity;
        col.velocity += acc * dt;
        col.displacement += col.velocity * dt;
      }

      // 2. Continuous wave baseline connecting top dots
      ctx.beginPath();
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const waveY = getWaveY(col.x, time);
        const drawX = col.x + col.displacement;

        if (i === 0) {
          ctx.moveTo(drawX, waveY);
        } else {
          ctx.lineTo(drawX, waveY);
        }
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Vertical wave pinstripe lines (clean, subtle, no lights)
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const topY = getWaveY(col.x, time);

        // Gentle ambient wave breathing
        const phase = i * 0.18;
        const waveShimmer =
          0.5 * Math.sin(time * 0.0018 + phase) +
          0.3 * Math.sin(time * 0.003 + phase * 1.5) +
          0.2 * Math.cos(time * 0.001 + phase * 0.8);

        const baseAlpha = Math.max(0.025, 0.065 + waveShimmer * 0.025);

        const lineGrad = ctx.createLinearGradient(col.x, topY, col.x, height);
        lineGrad.addColorStop(0, `rgba(255, 255, 255, ${baseAlpha * 1.4})`);
        lineGrad.addColorStop(0.35, `rgba(255, 255, 255, ${baseAlpha})`);
        lineGrad.addColorStop(0.75, `rgba(255, 255, 255, ${baseAlpha * 0.3})`);
        lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1;

        // Wave curvature along string length
        const segments = 12;
        const stepY = (height - topY) / segments;
        ctx.moveTo(col.x + col.displacement, topY);

        for (let s = 1; s <= segments; s++) {
          const curY = topY + s * stepY;
          const progress = s / segments;
          const harmonicSway = Math.sin(progress * Math.PI);
          const curX = col.x + col.displacement * harmonicSway;
          ctx.lineTo(curX, curY);
        }
        ctx.stroke();

        // 4. Subtle top tick dot at wave crest (no glowing halos or flashes)
        const dotAlpha = 0.20 + waveShimmer * 0.10;
        const dotX = col.x + col.displacement;

        ctx.beginPath();
        ctx.arc(dotX, topY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const scrollToMission = () => {
    const el = document.getElementById('our-mission');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      data-nav-dark="true"
      ref={containerRef}
      className="bg-black text-white min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-32 lg:pt-36 pb-8 relative z-10 overflow-hidden select-none shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
    >
      {/* TOP CONTENT (Headline & Subtitle Only) */}
      <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-3.5 xs:px-4 sm:px-6 mb-6 sm:mb-10">
        <Reveal className="flex flex-col items-center">
          {/* Top Architectural Status Pill */}
          <div className="mb-5 sm:mb-6 inline-flex items-center gap-2 xs:gap-2.5 px-3 xs:px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#16171B]/85 border border-[#26282D] hover:border-white/30 backdrop-blur-xl shadow-xl transition-all duration-300 max-w-[94vw]">
            <Signal />
            <span className="text-[11px] xs:text-xs sm:text-sm font-medium truncate">
              <span
                className="text-shimmer"
                data-text={
                  isAr
                    ? 'منظومة التوفيق والربط المعتمد · شفافية تامة 100%'
                    : 'Curated Matchmaking Architecture · 100% Transparent'
                }
              >
                {isAr
                  ? 'منظومة التوفيق والربط المعتمد · شفافية تامة 100%'
                  : 'Curated Matchmaking Architecture · 100% Transparent'}
              </span>
            </span>
          </div>

          <TextReveal
            as="h1"
            onScroll={false}
            text={
              isAr
                ? 'منصة مطابقة تدريب الشركات'
                : 'The Corporate Training Matchmaking Platform'
            }
            className="text-2xl xs:text-3xl sm:text-5xl lg:text-[60px] font-semibold text-white leading-[1.15] sm:leading-[1.1] font-heading tracking-tight"
          />
          <p className="mt-4 sm:mt-5 text-sm xs:text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-400 max-w-2xl sm:max-w-3xl mx-auto font-normal">
            {isAr
              ? 'نربط شركات ومزودي التدريب بصناع القرار في كبرى المؤسسات الذين لديهم احتياجات وتحديات حقيقية يسعون لحلها.'
              : 'We connect corporate training companies with enterprise decision makers who already have a real workforce challenge to solve.'}
          </p>
        </Reveal>
      </div>

      {/* animated wave curtain */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-end min-h-[380px] sm:min-h-[480px] mx-auto">
        <div
          className="absolute inset-0 w-full h-full pointer-events-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] overflow-hidden"
          aria-hidden="true"
        >
          <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
        </div>

        {/* scroll indicator */}
        <div className="relative z-10 mb-2 sm:mb-4">
          <button
            onClick={scrollToMission}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 xs:px-3.5 sm:px-6 py-2 sm:py-3 rounded-full bg-[#111215]/80 hover:bg-[#16171B] border border-[#26282D] hover:border-neutral-600 text-[11px] sm:text-sm text-neutral-300 hover:text-white shadow-2xl backdrop-blur-xl transition-all active:scale-95 group max-w-[92vw]"
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
      </div>
    </section>
  );
}
