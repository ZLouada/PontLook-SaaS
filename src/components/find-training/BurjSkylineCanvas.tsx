'use client';

import React, { useRef, useEffect, useState } from 'react';

interface BurjSkylineCanvasProps {
  isAr?: boolean;
  className?: string;
}

const LABELS_EN = [
  'Executive Leadership & Ops · Riyadh',
  'Onsite Riyadh · 25 execs',
  'Sales performance · Dubai',
  'AI adoption · Abu Dhabi',
  'Saudization programme · Jeddah',
  'Compliance · Doha',
  'Customer service · Kuwait City',
  'Starts next quarter',
];

const LABELS_AR = [
  'القيادة التنفيذية والعمليات · الرياض',
  'تدريب حضوري بالرياض · 25 قيادياً',
  'أداء المبيعات المؤسسية · دبي',
  'تبني الذكاء الاصطناعي · أبوظبي',
  'برنامج التوطين والتأهيل · جدة',
  'الامتثال والحوكمة · الدوحة',
  'خدمة العملاء والتميز · الكويت',
  'يبدأ الربع القادم',
];

/**
 * Interactive Monochrome Burj Al Arab & Dubai Skyline Canvas
 * Features:
 * - Line drawing of Burj Al Arab with architectural ribbed sail and apex needle
 * - Dubai skyline with illuminated office windows
 * - Animated parabolic match beams connecting the tower to enterprise company windows
 * - Interactive pointer tracking & click-to-fire beam dispatch
 * - High-contrast White-on-Black Palantir telemetry HUD
 */
export default function BurjSkylineCanvas({ isAr = false, className = '' }: BurjSkylineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hudText, setHudText] = useState(isAr ? 'جاري مسح الشركات الخليجية 0%' : 'SCANNING GCC COMPANIES 0%');

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const TAU = Math.PI * 2;
    const labels = isAr ? LABELS_AR : LABELS_EN;

    let W = 0;
    let H = 0;
    let D = 1;
    let animId = 0;
    let vis = true;

    const FG = '#FFFFFF';
    const BG = '#000000';

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ez = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Skyline Building and Window models
    interface Building {
      x: number;
      w: number;
      h: number;
    }
    interface WindowDot {
      x: number;
      y: number;
      ph: number;
      o: number;
    }
    interface MatchBeam {
      w: WindowDot;
      t: number;
      k: number;
      l: string;
    }

    let buildings: Building[] = [];
    let windows: WindowDot[] = [];
    let beams: MatchBeam[] = [];
    let matchCount = 0;
    let lastAutoBeam = 0;
    let glow = 0;
    let mx = 0;
    let tx = 0;
    let asm = 0;
    const t0 = performance.now();

    const seaLines = Array.from({ length: 60 }, () => ({
      u: Math.random(),
      x: Math.random(),
      w: rnd(10, 70),
      f: rnd(0, 6),
    }));

    const hz = () => H * 0.74;
    const bx = () => (isAr ? W * 0.44 : W * 0.56);
    const S = () => Math.min(H * 0.6, W * 0.9);

    const buildSkyline = () => {
      buildings = [];
      windows = [];
      let px = -10;
      const bCenter = bx();
      const bScale = S();

      while (px < W + 20) {
        const w = rnd(26, 64);
        const near = Math.abs(px + w / 2 - bCenter) < bScale * 0.3;
        const h = rnd(H * 0.05, H * 0.22) * (near ? 0.3 : 1);
        buildings.push({ x: px, w, h });

        const count = Math.floor((w * h) / 900);
        for (let k = 0; k < count; k++) {
          windows.push({
            x: px + rnd(5, w - 5),
            y: hz() - rnd(8, h - 4),
            ph: rnd(0, 6),
            o: Math.random(),
          });
        }
        px += w + rnd(2, 8);
      }
    };

    const resize = () => {
      D = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * D;
      cv.height = H * D;
      ctx.setTransform(D, 0, 0, D, 0, 0);
      buildSkyline();
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver((entries) => {
      vis = entries[0].isIntersecting;
    });
    observer.observe(cv);

    const onPointerMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    };

    const fireBeam = (px?: number, py?: number) => {
      const lit = windows.filter((w) => w.o < asm);
      if (!lit.length) return;
      let best = lit[Math.floor(Math.random() * lit.length)];

      if (px !== undefined && py !== undefined) {
        let minDist = 1e9;
        for (const w of lit) {
          const d = Math.hypot(w.x - px, w.y - py);
          if (d < minDist) {
            minDist = d;
            best = w;
          }
        }
      }

      beams.push({
        w: best,
        t: 0,
        k: 0,
        l: labels[matchCount % labels.length],
      });
      matchCount++;
    };

    const onPointerDown = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      fireBeam(e.clientX - r.left - mx * -10, e.clientY - r.top);
    };

    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerdown', onPointerDown);

    const SAIL = new Path2D('M0,-.86C.3,-.62 .46,-.3 .42,0L0,0Z');

    const drawTower = (fl: number, t: number, rv: number) => {
      ctx.save();
      ctx.translate(bx() + mx * -22, hz());
      ctx.scale(S() * (isAr ? -1 : 1), S() * fl);
      ctx.beginPath();
      ctx.rect(-0.2, -1.05 * rv, 1, 1.05 * rv);
      ctx.clip();

      ctx.fillStyle = FG;
      ctx.fill(SAIL);

      ctx.save();
      ctx.clip(SAIL);
      ctx.strokeStyle = BG;
      ctx.lineWidth = 0.006;

      for (let i = 0; i < 22; i++) {
        ctx.globalAlpha = cl(0.15 + 0.7 * Math.pow(Math.sin(t * 1.6 - i * 0.4), 2) + glow * 0.4);
        ctx.beginPath();
        ctx.moveTo(0.02 * i, 0);
        ctx.lineTo(0.02 * i, -1);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 0.002;
      for (let y = 0; y < 0.9; y += 0.04) {
        ctx.beginPath();
        ctx.moveTo(0, -y);
        ctx.lineTo(0.45, -y);
        ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;

      // Spine and needle spire
      ctx.strokeStyle = FG;
      ctx.lineWidth = 0.009;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -0.86);
      ctx.stroke();

      ctx.lineWidth = 0.004;
      ctx.lineTo(0, -1);
      ctx.stroke();

      // Helipad platform & base pod
      ctx.fillStyle = FG;
      ctx.fillRect(-0.08, -0.56, 0.08, 0.01);
      ctx.beginPath();
      ctx.ellipse(0.15, 0, 0.5, 0.018, 0, 0, TAU);
      ctx.fill();

      ctx.restore();
    };

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      if (!vis) return;

      const t = (now - t0) / 1000;
      const rv = RM ? 1 : ez(cl(t / 2.2));
      asm = RM ? 1 : ez(cl((t - 0.8) / 3));
      mx += (tx - mx) * 0.05;
      glow *= 0.94;
      const h = hz();
      const b = bx();

      ctx.clearRect(0, 0, W, H);

      // Deep void black base fill
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Moon halo / radiant background circle
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(b - S() * 0.55 + mx * -6, h - S() * 0.78, H * 0.07, 0, TAU);
      ctx.stroke();

      // Skyline buildings
      ctx.save();
      ctx.translate(mx * -10, 0);
      for (const q of buildings) {
        ctx.fillStyle = BG;
        ctx.fillRect(q.x, h - q.h, q.w, q.h);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.strokeRect(q.x + 0.5, h - q.h + 0.5, q.w, q.h);
      }

      // Lit office windows
      ctx.fillStyle = FG;
      for (const w of windows) {
        if (w.o > asm) continue;
        const a = 0.45 + 0.55 * Math.pow(Math.sin(t * 1.3 + w.ph), 2);
        ctx.globalAlpha = a;
        ctx.fillRect(w.x, w.y, 2.5, 3.5);

        // Water reflection shimmer
        ctx.globalAlpha = 0.12 * a;
        ctx.fillRect(w.x, h + (h - w.y) * 0.8, 2.5, 7);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // Horizon waterline
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h + 0.5);
      ctx.lineTo(W, h + 0.5);
      ctx.stroke();

      // Water surface ripples
      for (const s of seaLines) {
        ctx.globalAlpha = 0.1 + 0.25 * Math.pow(Math.sin(t * 2 + s.f), 2);
        ctx.fillStyle = FG;
        ctx.fillRect(s.x * W, h + 8 + s.u * s.u * (H - h - 10), s.w, 1);
      }

      // Draw Burj Al Arab tower reflection & solid tower
      ctx.globalAlpha = 0.16;
      drawTower(-1, t, rv);
      ctx.globalAlpha = 1;
      drawTower(1, t, rv);

      // Auto fire beams
      if (asm >= 1 && !RM && now - lastAutoBeam > 2200) {
        lastAutoBeam = now;
        fireBeam();
      }

      // Origin point at the Burj helipad
      const T = [b + mx * -22, h - S()];
      beams = beams.filter((o) => o.k < 80);

      // Render beams and company match popups
      for (const o of beams) {
        o.t = Math.min(1, o.t + 0.025);
        o.k = o.t >= 1 ? o.k + 1 : 0;
        const X = o.w.x + mx * -10;
        const Y = o.w.y;
        const cx = (T[0] + X) / 2;
        const cy = Math.min(T[1], Y) - 60;

        // Quadratic curved beam
        ctx.strokeStyle = FG;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let i = 0; i <= 30; i++) {
          const u = (i / 30) * o.t;
          const px = Math.pow(1 - u, 2) * T[0] + 2 * (1 - u) * u * cx + u * u * X;
          const py = Math.pow(1 - u, 2) * T[1] + 2 * (1 - u) * u * cy + u * u * Y;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Beam touchdown pulse & verified company label tag
        if (o.t >= 1) {
          if (o.k === 1) glow = 1;
          ctx.globalAlpha = 1 - o.k / 80;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(X, Y, 4 + o.k * 0.7, 0, TAU);
          ctx.stroke();

          ctx.font = '500 11px Inter, system-ui, sans-serif';
          ctx.textAlign = 'center';
          const tw = ctx.measureText(o.l).width + 16;
          const lx = cl(X, tw / 2 + 6, W - tw / 2 - 6);

          ctx.fillStyle = BG;
          ctx.fillRect(lx - tw / 2, Y - 40 - o.k * 0.1, tw, 22);
          ctx.strokeStyle = FG;
          ctx.strokeRect(lx - tw / 2, Y - 40 - o.k * 0.1, tw, 22);

          ctx.fillStyle = FG;
          ctx.fillText(o.l, lx, Y - 25 - o.k * 0.1);
          ctx.globalAlpha = 1;
        }
      }

      // Live Telemetry text
      const nextHud =
        asm < 1
          ? isAr
            ? `جاري مسح الشركات الخليجية ${Math.round(asm * 100)}%`
            : `SCANNING GCC COMPANIES ${Math.round(asm * 100)}%`
          : isAr
          ? `تم التوفيق: ${matchCount} · انقر لإطلاق مسار تدريب`
          : `MATCHES MADE ${matchCount} · CLICK TO SEND A BEAM`;

      setHudText(nextHud);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isAr]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[460px] sm:min-h-[560px] lg:min-h-[640px] bg-black select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        id="c"
        className="absolute inset-0 w-full h-full cursor-crosshair block"
        aria-label={
          isAr
            ? 'رسم معماري لبرج العرب وأفق دبي مع مسارات التوفيق الذكي إلى نوافذ الشركات'
            : 'Line drawing of the Burj Al Arab and a Dubai skyline with match beams reaching company windows'
        }
      />

      {/* High-Contrast White Telemetry HUD */}
      <div
        id="hud"
        className="absolute start-4 top-4 font-mono font-medium text-[11px] sm:text-[12px] tracking-wider text-white bg-black/70 border border-white/20 px-3 py-1 rounded-sm backdrop-blur-xs pointer-events-none z-10"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white me-2 animate-ping" />
        {hudText}
      </div>
    </div>
  );
}
