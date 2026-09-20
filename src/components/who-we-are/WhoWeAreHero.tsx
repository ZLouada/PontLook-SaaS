'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

interface WhoWeAreHeroProps {
  lang?: 'en' | 'ar';
}

interface LineColumn {
  colIndex: number;
  x: number;
  displacement: number; // Horizontal string pluck displacement
  velocity: number;
  flash: number; // Dot brightness flash (0 to 1)
}

interface Comet {
  lineIndex: number;
  currentY: number;
  length: number;
  speed: number;
  opacity: number;
  direction: 1 | -1;
}

interface WaveRipple {
  currentX: number;
  direction: 1 | -1;
  speed: number;
  amplitude: number;
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
    const comets: Comet[] = [];
    const waveRipples: WaveRipple[] = [];

    let lastAutoSpawnTime = 0;
    let lastAmbientRippleTime = 0;

    // Physical harmonic wave function defining undulating top boundary
    const getWaveY = (x: number, t: number): number => {
      const baseOffset = height < 500 ? 45 : 65;
      const w1 = Math.sin(x * 0.0038 + t * 0.0016) * 32;
      const w2 = Math.sin(x * 0.0085 - t * 0.0022) * 18;
      const w3 = Math.cos(x * 0.0022 + t * 0.0009) * 22;
      const w4 = Math.sin(x * 0.015 + t * 0.0031) * 8;

      let mouseDip = 0;
      if (isMouseInside) {
        const dist = Math.abs(x - mouseX);
        if (dist < 180) {
          const factor = 1 - dist / 180;
          mouseDip = Math.sin(dist * 0.04 - t * 0.008) * 16 * factor;
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

      // Re-initialize columns
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
          flash: 0,
        });
      }
    };

    updateDimensions();

    const spawnComet = (
      colIdx: number,
      startY: number,
      direction: 1 | -1 = 1,
      speedBonus = 0
    ) => {
      if (comets.length > 70) return;
      const speed = 380 + Math.random() * 420 + speedBonus;
      const length = 60 + Math.random() * 80;

      comets.push({
        lineIndex: colIdx,
        currentY: startY,
        length,
        speed,
        opacity: 0.85 + Math.random() * 0.15,
        direction,
      });

      if (columns[colIdx]) {
        columns[colIdx].flash = 1.0;
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

        if (prevMouseX > -9000) {
          const deltaX = newX - prevMouseX;
          const mouseSpeed = Math.hypot(deltaX, newY - prevMouseY);

          const minX = Math.min(prevMouseX, newX);
          const maxX = Math.max(prevMouseX, newX);

          for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            if (col.x >= minX - 4 && col.x <= maxX + 4) {
              const pluckStrength = Math.sign(deltaX) * Math.min(mouseSpeed * 0.45, 20);
              col.velocity += pluckStrength * 35;
              col.flash = 1.0;

              spawnComet(i, newY, 1, 200 + mouseSpeed * 2);
              if (Math.random() > 0.5) {
                spawnComet(i, newY, -1, 150 + mouseSpeed);
              }
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

    // Initial ambient comets
    for (let i = 0; i < 15; i++) {
      const randomCol = Math.floor(Math.random() * columns.length);
      spawnComet(randomCol, 100 + Math.random() * 300, 1);
    }

    // Main 60fps Animation Loop
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Periodically spawn ambient comets across waving columns
      if (time - lastAutoSpawnTime > 140) {
        lastAutoSpawnTime = time;
        if (columns.length > 0) {
          const colIdx = Math.floor(Math.random() * columns.length);
          const col = columns[colIdx];
          const startY = getWaveY(col.x, time);
          spawnComet(colIdx, startY, 1, 0);

          col.velocity += (Math.random() - 0.5) * 80;
        }
      }

      // Periodically trigger a gentle ocean ripple across the strings
      if (time - lastAmbientRippleTime > 2200) {
        lastAmbientRippleTime = time;
        const dir = Math.random() > 0.5 ? 1 : -1;
        waveRipples.push({
          currentX: dir === 1 ? -50 : width + 50,
          direction: dir,
          speed: 750,
          amplitude: 14,
        });
      }

      // Advance wave ripples
      for (let r = waveRipples.length - 1; r >= 0; r--) {
        const ripple = waveRipples[r];
        const prevX = ripple.currentX;
        ripple.currentX += ripple.direction * ripple.speed * dt;

        for (let i = 0; i < columns.length; i++) {
          const col = columns[i];
          const minX = Math.min(prevX, ripple.currentX);
          const maxX = Math.max(prevX, ripple.currentX);
          if (col.x >= minX && col.x <= maxX) {
            col.velocity += ripple.direction * ripple.amplitude * 25;
            col.flash = 0.8;
            if (Math.random() > 0.6) {
              const startY = getWaveY(col.x, time);
              spawnComet(i, startY, 1, 100);
            }
          }
        }

        if (
          (ripple.direction === 1 && ripple.currentX > width + 100) ||
          (ripple.direction === -1 && ripple.currentX < -100)
        ) {
          waveRipples.splice(r, 1);
        }
      }

      // 1. UPDATE STRING SPRING PHYSICS
      const SPRING_TENSION = 180;
      const SPRING_DAMPING = 9;

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const acc = -SPRING_TENSION * col.displacement - SPRING_DAMPING * col.velocity;
        col.velocity += acc * dt;
        col.displacement += col.velocity * dt;

        if (col.flash > 0) {
          col.flash = Math.max(0, col.flash - dt * 2.8);
        }
      }

      // 2. DRAW ROLLING MONOCHROME WAVE BASELINE
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
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. DRAW WAVING VERTICAL LINES (PURE NEUTRAL MONOCHROME)
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const topY = getWaveY(col.x, time);

        const phase = i * 0.18;
        const waveShimmer =
          0.45 * Math.sin(time * 0.002 + phase) +
          0.35 * Math.sin(time * 0.0035 + phase * 1.5) +
          0.2 * Math.cos(time * 0.001 + phase * 0.8);

        let proximity = 0;
        if (isMouseInside) {
          const dist = Math.abs(col.x - mouseX);
          if (dist < 120) {
            proximity = Math.max(0, 1 - dist / 120);
          }
        }

        const boost = Math.max(proximity, col.flash);

        // Pure white/silver gradient
        const lineGrad = ctx.createLinearGradient(col.x, topY, col.x, height);

        if (boost > 0.08) {
          const topAlpha = 0.12 + boost * 0.35;
          lineGrad.addColorStop(0, `rgba(255, 255, 255, ${topAlpha})`);
          lineGrad.addColorStop(0.35, `rgba(255, 255, 255, ${topAlpha * 0.7})`);
          lineGrad.addColorStop(0.75, `rgba(255, 255, 255, ${topAlpha * 0.2})`);
          lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          const baseAlpha = Math.max(0.03, 0.07 + waveShimmer * 0.035);
          lineGrad.addColorStop(0, `rgba(255, 255, 255, ${baseAlpha * 1.5})`);
          lineGrad.addColorStop(0.35, `rgba(255, 255, 255, ${baseAlpha})`);
          lineGrad.addColorStop(0.75, `rgba(255, 255, 255, ${baseAlpha * 0.35})`);
          lineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.beginPath();
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = boost > 0.1 ? 1 + boost * 0.6 : 1;

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

        // 4. DRAW TOP TICK DOT AT WAVE CREST (PURE WHITE / SILVER)
        const dotAlpha = Math.min(1, 0.22 + waveShimmer * 0.15 + boost * 0.75);
        const dotRadius = boost > 0.1 ? 1.8 + boost * 1.4 : 1.5;
        const dotX = col.x + col.displacement;

        ctx.beginPath();
        ctx.arc(dotX, topY, dotRadius, 0, Math.PI * 2);

        if (boost > 0.15) {
          ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
          ctx.fill();

          // Soft white halo
          ctx.beginPath();
          ctx.arc(dotX, topY, dotRadius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha * 0.18})`;
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${dotAlpha})`;
          ctx.fill();
        }
      }

      // 5. UPDATE AND RENDER SHOOTING COMETS (PURE WHITE / SILVER TRAILS)
      for (let j = comets.length - 1; j >= 0; j--) {
        const c = comets[j];
        const col = columns[c.lineIndex];
        if (!col) {
          comets.splice(j, 1);
          continue;
        }

        const topY = getWaveY(col.x, time);
        c.currentY += c.direction * c.speed * dt;

        const headY = c.currentY;
        const tailY = c.currentY - c.direction * c.length;

        if (c.direction === 1 && tailY > height) {
          comets.splice(j, 1);
          continue;
        }
        if (c.direction === -1 && tailY < topY) {
          col.flash = 1.0;
          comets.splice(j, 1);
          continue;
        }

        const getXAtY = (yVal: number) => {
          const prog = Math.max(0, Math.min(1, (yVal - topY) / Math.max(1, height - topY)));
          return col.x + col.displacement * Math.sin(prog * Math.PI);
        };

        const headX = getXAtY(headY);
        const tailX = getXAtY(tailY);

        const cometGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        cometGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        cometGrad.addColorStop(0.65, `rgba(255, 255, 255, ${c.opacity * 0.45})`);
        cometGrad.addColorStop(1, `rgba(255, 255, 255, ${c.opacity})`);

        ctx.beginPath();
        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 1.75;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // White glowing particle head
        if (headY >= topY && headY <= height) {
          ctx.beginPath();
          ctx.arc(headX, headY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(headX, headY, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
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
      {/* Subtle Monochrome Ambient Depth (No Blue) */}
      <div className="pointer-events-none absolute top-10 start-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-white/[0.015] blur-3xl -z-10 rounded-full" />

      {/* TOP CONTENT (Headline & Subtitle Only) */}
      <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-6 mb-6 sm:mb-10">
        <Reveal className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-semibold text-white leading-[1.12] sm:leading-[1.1] font-heading tracking-tight">
            {isAr ? (
              <>
                من نحن: منصة التوفيق والربط الرائدة <br className="hidden sm:inline" />
                لتدريب الشركات في <span className="text-white font-bold">المنطقة</span>
              </>
            ) : (
              <>
                Who We Are: The Corporate Training <br className="hidden sm:inline" />
                <span className="text-white font-bold">Matchmaking Platform</span>
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

      {/* ATTIO-STYLE LIVE ANIMATED MONOCHROME WAVE CURTAIN */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-end min-h-[380px] sm:min-h-[480px] mx-auto">
        {/* Full-width interactive Canvas with Waving Baseline, Guitar String Physics & Comets */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-auto [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] overflow-hidden"
          aria-hidden="true"
        >
          <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
        </div>

        {/* BOTTOM FLOATING PILL */}
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
              className="text-neutral-400 group-hover:text-white group-hover:translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
