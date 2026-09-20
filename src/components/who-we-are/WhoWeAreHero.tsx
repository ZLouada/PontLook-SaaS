'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

interface WhoWeAreHeroProps {
  lang?: 'en' | 'ar';
}

interface LaserPulse {
  lineX: number;
  colIndex: number;
  currentY: number;
  length: number;
  speed: number;
  colorType: 'blue' | 'cyan' | 'white';
  opacity: number;
  direction: 1 | -1; // 1 = down, -1 = up
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

    // Line dots flash state: Map<colIndex, flashIntensity (0 to 1)>
    const dotFlashes = new Map<number, number>();

    // Array of living laser pulses traveling along the lines
    const pulses: LaserPulse[] = [];

    let lastAutoSpawnTime = 0;

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
    };

    updateDimensions();

    const spawnPulse = (
      colIndex: number,
      lineX: number,
      startY: number,
      direction: 1 | -1 = 1,
      customSpeed?: number
    ) => {
      if (pulses.length > 60) return; // Prevent excessive density
      const colors: ('blue' | 'cyan' | 'white')[] = ['blue', 'cyan', 'blue', 'white'];
      const colorType = colors[Math.floor(Math.random() * colors.length)];
      const speed = customSpeed || 400 + Math.random() * 500;
      const length = 50 + Math.random() * 70;

      pulses.push({
        lineX,
        colIndex,
        currentY: startY,
        length,
        speed,
        colorType,
        opacity: 0.85 + Math.random() * 0.15,
        direction,
      });

      // Flash top dot if spawning near top
      if (Math.abs(startY - 2) < 20) {
        dotFlashes.set(colIndex, 1.0);
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      if (newX >= 0 && newX <= width && newY >= 0 && newY <= height) {
        isMouseInside = true;
        mouseX = newX;
        mouseY = newY;

        // Check if mouse crossed any lines between prevMouseX and newX
        if (prevMouseX > -9000 && Math.abs(newX - prevMouseX) > 2) {
          const spacing = width < 640 ? 18 : 24;
          const startX = (width % spacing) / 2;
          const minX = Math.min(prevMouseX, newX);
          const maxX = Math.max(prevMouseX, newX);

          const minCol = Math.floor((minX - startX) / spacing);
          const maxCol = Math.ceil((maxX - startX) / spacing);

          for (let col = minCol; col <= maxCol; col++) {
            const lineX = startX + col * spacing;
            if (lineX >= minX && lineX <= maxX && lineX >= 0 && lineX <= width) {
              // Mouse crossed this line -> shoot downward and upward pulses
              spawnPulse(col, lineX, newY, 1, 600 + Math.random() * 400);
              if (Math.random() > 0.4) {
                spawnPulse(col, lineX, newY, -1, 500 + Math.random() * 300);
              }
              dotFlashes.set(col, 1.0);
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

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('resize', updateDimensions);

    // Initial ambient pulses to populate scene immediately
    const spacing = width < 640 ? 18 : 24;
    const totalLines = Math.ceil(width / spacing) + 1;
    const startX = (width % spacing) / 2;
    for (let i = 0; i < 15; i++) {
      const col = Math.floor(Math.random() * totalLines);
      const lineX = startX + col * spacing;
      spawnPulse(col, lineX, Math.random() * (height || 400), 1);
    }

    // Animation Render Loop
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const currentSpacing = width < 640 ? 18 : 24;
      const baseY = 2; // Baseline at top
      const numLines = Math.ceil(width / currentSpacing) + 1;
      const actualStartX = (width % currentSpacing) / 2;

      // Auto-spawn ambient energetic pulses so it's CONSTANTLY live
      if (time - lastAutoSpawnTime > 160) {
        lastAutoSpawnTime = time;
        const col = Math.floor(Math.random() * numLines);
        const lineX = actualStartX + col * currentSpacing;
        if (lineX >= 0 && lineX <= width) {
          spawnPulse(col, lineX, baseY, 1, 350 + Math.random() * 450);
          if (Math.random() > 0.7) {
            // Also spawn occasional bottom or middle rebound pulse
            const col2 = Math.floor(Math.random() * numLines);
            const lineX2 = actualStartX + col2 * currentSpacing;
            spawnPulse(col2, lineX2, height * (0.6 + Math.random() * 0.3), -1, 300 + Math.random() * 300);
          }
        }
      }

      // Draw horizontal top baseline connecting all tick nodes
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, baseY);
      ctx.lineTo(width, baseY);
      ctx.stroke();

      // Render vertical lines with living harmonic shimmer waves
      for (let i = 0; i <= numLines; i++) {
        const x = actualStartX + i * currentSpacing;
        if (x < 0 || x > width) continue;

        // Multi-frequency harmonic wave for continuous organic shimmer
        const phase = i * 0.18;
        const wave =
          0.45 * Math.sin(time * 0.0018 + phase) +
          0.35 * Math.sin(time * 0.0032 + phase * 1.6) +
          0.2 * Math.cos(time * 0.0009 + phase * 0.7);

        // Proximity to mouse cursor
        let proximity = 0;
        if (isMouseInside) {
          const distToMouse = Math.abs(x - mouseX);
          if (distToMouse < 130) {
            proximity = Math.max(0, 1 - distToMouse / 130);
          }
        }

        // Column flash decay
        let flash = dotFlashes.get(i) || 0;
        if (flash > 0) {
          flash = Math.max(0, flash - dt * 2.8);
          dotFlashes.set(i, flash);
        }

        // Calculate line vertical gradient
        const lineGrad = ctx.createLinearGradient(x, baseY, x, height);

        if (proximity > 0 || flash > 0.1) {
          const boost = Math.max(proximity, flash);
          const topAlpha = 0.12 + boost * 0.35;
          lineGrad.addColorStop(0, `rgba(96, 165, 250, ${topAlpha})`);
          lineGrad.addColorStop(0.3, `rgba(96, 165, 250, ${topAlpha * 0.75})`);
          lineGrad.addColorStop(0.7, `rgba(255, 255, 255, ${topAlpha * 0.2})`);
          lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1 + boost * 0.6;
          ctx.moveTo(x, baseY);
          ctx.lineTo(x, height);
          ctx.stroke();
        } else {
          // Standard living shimmering line
          const shimmerAlpha = Math.max(0.03, 0.065 + wave * 0.035);
          lineGrad.addColorStop(0, `rgba(255, 255, 255, ${shimmerAlpha * 1.5})`);
          lineGrad.addColorStop(0.35, `rgba(255, 255, 255, ${shimmerAlpha})`);
          lineGrad.addColorStop(0.75, `rgba(255, 255, 255, ${shimmerAlpha * 0.35})`);
          lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1;
          ctx.moveTo(x, baseY);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Draw top tick dot
        const dotBaseAlpha = 0.22 + wave * 0.12;
        const totalDotAlpha = Math.min(1, dotBaseAlpha + proximity * 0.65 + flash * 0.85);
        const dotRadius = proximity > 0 ? 1.5 + proximity * 1.5 : flash > 0.2 ? 2.2 : 1.5;

        ctx.beginPath();
        ctx.arc(x, baseY, dotRadius, 0, Math.PI * 2);

        if (proximity > 0 || flash > 0.2) {
          ctx.fillStyle = `rgba(147, 197, 253, ${totalDotAlpha})`;
          ctx.fill();

          // Soft ambient halo around active dot
          ctx.beginPath();
          ctx.arc(x, baseY, dotRadius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${totalDotAlpha * 0.25})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${totalDotAlpha})`;
          ctx.fill();
        }
      }

      // Update and render shooting laser pulses
      for (let j = pulses.length - 1; j >= 0; j--) {
        const p = pulses[j];

        // Move pulse
        p.currentY += p.direction * p.speed * dt;

        const headY = p.currentY;
        const tailY = p.currentY - p.direction * p.length;
        const minY = Math.min(headY, tailY);
        const maxY = Math.max(headY, tailY);

        // Check if pulse has left visible canvas
        if (p.direction === 1 && tailY > height) {
          pulses.splice(j, 1);
          continue;
        }
        if (p.direction === -1 && tailY < baseY) {
          // Hit top terminator dot -> flash!
          dotFlashes.set(p.colIndex, 1.0);
          pulses.splice(j, 1);
          continue;
        }

        // Draw laser gradient trail along line
        const pulseGrad = ctx.createLinearGradient(p.lineX, tailY, p.lineX, headY);

        if (p.colorType === 'cyan') {
          pulseGrad.addColorStop(0, 'rgba(56, 189, 248, 0)');
          pulseGrad.addColorStop(0.65, `rgba(56, 189, 248, ${p.opacity * 0.5})`);
          pulseGrad.addColorStop(1, `rgba(224, 242, 254, ${p.opacity})`);
        } else if (p.colorType === 'white') {
          pulseGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          pulseGrad.addColorStop(0.65, `rgba(191, 219, 254, ${p.opacity * 0.5})`);
          pulseGrad.addColorStop(1, `rgba(255, 255, 255, ${p.opacity})`);
        } else {
          // Blue
          pulseGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
          pulseGrad.addColorStop(0.6, `rgba(96, 165, 250, ${p.opacity * 0.6})`);
          pulseGrad.addColorStop(1, `rgba(191, 219, 254, ${p.opacity})`);
        }

        ctx.beginPath();
        ctx.strokeStyle = pulseGrad;
        ctx.lineWidth = 1.75;
        ctx.moveTo(p.lineX, tailY);
        ctx.lineTo(p.lineX, headY);
        ctx.stroke();

        // Glowing particle head
        if (headY >= baseY && headY <= height) {
          ctx.beginPath();
          ctx.arc(p.lineX, headY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.lineX, headY, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
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
      className="bg-[#08090A] text-white min-h-[100dvh] flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-8 relative overflow-hidden select-none"
    >
      {/* Ambient Depth Glows */}
      <div className="pointer-events-none absolute top-10 start-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-blue-600/[0.04] blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute top-4 start-1/4 w-[500px] h-[350px] bg-blue-500/[0.03] blur-3xl -z-10 rounded-full" />

      {/* TOP CONTENT (First Content - Headline & Subtitle Only) */}
      <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-6 mb-6 sm:mb-10">
        <Reveal className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white leading-[1.12] sm:leading-[1.1] font-heading tracking-tight">
            {isAr ? (
              <>
                من نحن: منصة التوفيق والربط الرائدة <br className="hidden sm:inline" />
                لتدريب الشركات في <span className="text-blue-400 font-bold">المنطقة</span>
              </>
            ) : (
              <>
                Who We Are: The Corporate Training <br className="hidden sm:inline" />
                <span className="text-blue-400 font-bold">Matchmaking Platform</span>
              </>
            )}
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl leading-relaxed text-neutral-400 max-w-2xl sm:max-w-3xl mx-auto font-normal">
            {isAr
              ? 'نربط شركات ومزودي التدريب بصناع القرار في كبرى المؤسسات الذين لديهم احتياجات وتحديات حقيقية يسعون لحلها.'
              : 'We connect corporate training companies with enterprise decision makers who already have a real workforce challenge to solve.'}
          </p>
        </Reveal>
      </div>

      {/* ATTIO-STYLE LIVE ANIMATED VERTICAL LINES CURTAIN (FULL SPACE UNDER FIRST CONTENT) */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-end min-h-[380px] sm:min-h-[460px] mx-auto">
        {/* Full-width interactive Canvas with Attio Pinstripes, Living Waves, and Shooting Laser Pulses */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] overflow-hidden"
          aria-hidden="true"
        >
          <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
        </div>

        {/* BOTTOM FLOATING PILL (Matching Attio's bottom pill in media_1789923371719.png) */}
        <div className="relative z-10 mb-2 sm:mb-4">
          <button
            onClick={scrollToMission}
            className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#111215]/80 hover:bg-[#16171B] border border-[#26282D] hover:border-neutral-600 text-xs sm:text-sm text-neutral-300 hover:text-white shadow-2xl backdrop-blur-xl transition-all active:scale-95 group"
          >
            <span>
              {isAr
                ? 'كيف تضمن PontLook جودة التدريب بدون اشتراك شهري؟'
                : 'How does PontLook match without retainers?'}
            </span>
            <ArrowDown
              size={14}
              className="text-neutral-400 group-hover:text-blue-400 group-hover:translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
