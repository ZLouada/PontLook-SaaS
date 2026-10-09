'use client';

import React, { useRef, useEffect } from 'react';

interface RaceBridgeCanvasProps {
  isAr?: boolean;
  className?: string;
  darkMode?: boolean;
}

export default function RaceBridgeCanvas({ isAr = false, className = '', darkMode = true }: RaceBridgeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const TAU = Math.PI * 2;
    const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let D = 1;
    let pt = false;
    let vw = 0;
    let vh = 0;
    let vis = true;
    let animId = 0;
    let t0 = performance.now();
    let TP: [number, number][] = [];

    // Colors: adapt to document theme (default white foreground on black background)
    let FG = darkMode ? '#FFFFFF' : '#000000';
    let BG = darkMode ? '#000000' : '#FFFFFF';

    const updateColors = () => {
      if (darkMode) {
        FG = '#FFFFFF';
        BG = '#000000';
        return;
      }
      const s = getComputedStyle(document.documentElement);
      const k = s.getPropertyValue('--k')?.trim();
      const w = s.getPropertyValue('--w')?.trim();
      FG = k || '#000000';
      BG = w || '#FFFFFF';
    };
    updateColors();

    const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');
    mediaDark.addEventListener('change', updateColors);

    // Obstacle markers for the traditional wandering route
    const OB_EN: [number, string][] = [
      [0.16, 'Overwhelmed HR'],
      [0.36, 'Cold spam outreach'],
      [0.58, 'Dead-end leads'],
      [0.8, '4–8 weeks lost'],
    ];

    const OB_AR: [number, string][] = [
      [0.16, 'إرهاق الموارد البشرية'],
      [0.36, 'رسائل عشوائية باردة'],
      [0.58, 'فرص وهمية غير مجدية'],
      [0.8, '٤-٨ أسابيع مهدورة'],
    ];

    const OB = isAr ? OB_AR : OB_EN;

    // Milestones along the PontLook direct bridge
    const MILESTONES_EN: [number, string][] = [
      [0.08, 'Skill gap & budget'],
      [0.36, 'Diagnose, vet & match'],
      [0.64, 'CHRO calendar access'],
      [0.92, '2–3 providers'],
    ];

    const MILESTONES_AR: [number, string][] = [
      [0.08, 'الفجوة المهارية والميزانية'],
      [0.36, 'التشخيص والفحص والمطابقة'],
      [0.64, 'جدولة لقاء صانع القرار'],
      [0.92, '٢-٣ مزودين معتمدين'],
    ];

    const MILESTONES = isAr ? MILESTONES_AR : MILESTONES_EN;

    const resize = () => {
      D = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * D;
      cv.height = H * D;
      pt = W < H * 0.9;
      vw = pt ? H : W;
      vh = pt ? W : H;

      TP = [];
      const A = vh * 0.1;
      const yT = vh * (pt ? 0.28 : 0.27);
      for (let i = 0; i <= 300; i++) {
        const u = i / 300;
        TP.push([
          44 + u * (vw - 88),
          yT + A * Math.sin(u * 26) * 0.7 + A * 0.5 * Math.sin(u * 61 + 1) + A * 0.4 * Math.sin(u * 9),
        ]);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver((entries) => {
      vis = entries[0].isIntersecting;
    });
    observer.observe(cv);

    const resetRace = () => {
      t0 = performance.now();
    };
    cv.addEventListener('click', resetRace);

    const drawText = (s: string, X: number, Y: number, al: CanvasTextAlign = 'left') => {
      ctx.save();
      ctx.translate(X, Y);
      if (pt) ctx.rotate(-Math.PI / 2);
      ctx.textAlign = al;
      ctx.fillText(s, 0, 0);
      ctx.restore();
    };

    const drawLabel = (s: string, X: number, Y: number) => {
      ctx.font = '500 12px Inter, system-ui, sans-serif';
      const w = ctx.measureText(s).width + 14;
      ctx.save();
      ctx.translate(X, Y);
      if (pt) ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = BG;
      ctx.fillRect(-w / 2, -17, w, 22);
      ctx.strokeStyle = FG;
      ctx.lineWidth = 1;
      ctx.strokeRect(-w / 2, -17, w, 22);
      ctx.fillStyle = FG;
      ctx.textAlign = 'center';
      ctx.fillText(s, 0, -2);
      ctx.restore();
    };

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      if (!vis) return;

      const T = RM ? 12.5 : ((now - t0) / 1000) % 17;
      const day = T < 4 ? T : Math.min(45, 4 + ((T - 4) * 41) / 8);
      const up = cl(day / 4);
      const ut = cl(day / 45);
      const yP = vh * (pt ? 0.54 : 0.74);
      const PA: CanvasTextAlign | null = pt ? 'right' : null;

      ctx.setTransform(D, 0, 0, D, 0, 0);
      ctx.clearRect(0, 0, W, H);

      if (pt) {
        ctx.translate(W, 0);
        ctx.rotate(Math.PI / 2);
      }

      // Left and right anchor towers
      ctx.fillStyle = FG;
      ctx.fillRect(0, 0, 34, vh);
      ctx.fillRect(vw - 34, 0, 34, vh);

      ctx.fillStyle = BG;
      ctx.font = '600 11px Inter, system-ui, sans-serif';

      ctx.save();
      ctx.translate(21, vh / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText(isAr ? 'منشأتك المؤسسية' : 'YOUR ENTERPRISE', 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(vw - 13, vh / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText(isAr ? 'المزود المعتمد' : 'VERIFIED PROVIDER', 0, 0);
      ctx.restore();

      // Top Track Header: The Traditional Way
      ctx.fillStyle = FG;
      ctx.font = '500 12px Inter, system-ui, sans-serif';
      drawText(isAr ? 'المسار التقليدي القديم' : 'THE TRADITIONAL WAY', 50, vh * 0.1, PA || 'left');

      const dayStr = isAr
        ? `اليوم ${Math.floor(day)}${day >= 45 ? ' · حتى ٤٥ يوماً' : ' / ٤٥'}`
        : `Day ${Math.floor(day)}${day >= 45 ? ' · up to 45 days' : ' / 45'}`;
      drawText(dayStr, pt ? 74 : vw - 50, vh * 0.1, 'right');

      // Wandering route background curve
      ctx.lineJoin = 'round';
      ctx.strokeStyle = FG;
      ctx.globalAlpha = 0.12;
      ctx.lineWidth = 1;
      ctx.beginPath();
      TP.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Active progress curve
      const n = Math.floor(ut * 300);
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        if (i === 0) ctx.moveTo(TP[i][0], TP[i][1]);
        else ctx.lineTo(TP[i][0], TP[i][1]);
      }
      ctx.stroke();

      if (TP[n]) {
        ctx.fillStyle = FG;
        ctx.beginPath();
        ctx.arc(TP[n][0], TP[n][1], 5, 0, TAU);
        ctx.fill();
      }

      // Obstacle checkpoints along wandering route
      for (const o of OB) {
        if (ut >= o[0]) {
          const idx = Math.floor(o[0] * 300);
          const p = TP[idx];
          if (p) {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(p[0] - 6, p[1] - 6);
            ctx.lineTo(p[0] + 6, p[1] + 6);
            ctx.moveTo(p[0] + 6, p[1] - 6);
            ctx.lineTo(p[0] - 6, p[1] + 6);
            ctx.stroke();
            drawLabel(o[1], p[0], p[1] - 18);
          }
        }
      }

      // Bottom Track Header: With PontLook Direct Bridge
      ctx.fillStyle = FG;
      ctx.font = '500 12px Inter, system-ui, sans-serif';
      const ly = pt ? yP - vh * 0.2 : yP - vh * 0.25 - 16;
      drawText(isAr ? 'عبر منصة PONTLOCK' : 'WITH PONTLOOK', 50, ly, PA || 'left');

      const pontlookDaysStr =
        up >= 1
          ? isAr
            ? '٣-٥ أيام · مطابقة مباشرة ومعتمدة'
            : '3–5 days · connected, verified, matched'
          : isAr
          ? `اليوم ${Math.floor(day)} / ٥`
          : `Day ${Math.floor(day)} / 3–5`;
      drawText(pontlookDaysStr, pt ? 74 : vw - 50, ly, 'right');

      // Bridge geometry parameters
      const xa = 44;
      const xb = vw - 44;
      const L = xb - xa;
      const xp = xa + L * up;
      const hh = vh * 0.25;
      const yt = yP - hh;
      const x1 = xa + L * 0.22;
      const x2 = xa + L * 0.78;
      const xm = (x1 + x2) / 2;
      const hf = (x2 - x1) / 2;
      const TW: [number, number][] = [
        [0.22, x1],
        [0.78, x2],
      ];

      // Parabolic cable curve
      const cy = (q: number) => {
        if (q <= x1) {
          const u = (q - xa) / (x1 - xa);
          return yP - 8 + (yt - yP + 8) * u + 24 * u * (1 - u);
        }
        if (q <= x2) {
          const r = (q - xm) / hf;
          return yP - 16 - (yP - 16 - yt) * r * r;
        }
        const u = (xb - q) / (xb - x2);
        return yP - 8 + (yt - yP + 8) * u + 24 * u * (1 - u);
      };

      ctx.fillStyle = FG;
      ctx.strokeStyle = FG;
      ctx.lineCap = 'butt';

      // Speed baseline stripes
      ctx.globalAlpha = 0.16;
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        ctx.setLineDash([18, 12]);
        ctx.lineDashOffset = T * (i % 2 ? 9 : -9);
        ctx.beginPath();
        ctx.moveTo(xa, yP + vh * 0.12 + i * 7);
        ctx.lineTo(xb, yP + vh * 0.12 + i * 7);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Tower foundations
      for (const [u, X] of TW) {
        if (up >= u) {
          ctx.fillRect(X - 9, yP, 18, vh * 0.1);
          ctx.fillRect(X - 15, yP + vh * 0.1 - 5, 30, 5);
        }
      }

      // Lower truss zig-zag
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let q = xa; q < xp - 5; q += 10) {
        ctx.moveTo(q, yP + 2);
        ctx.lineTo(q + 5, yP + 12);
        ctx.lineTo(q + 10, yP + 2);
      }
      ctx.stroke();

      // Bridge deck beam
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(xa, yP + 12);
      ctx.lineTo(xp, yP + 12);
      ctx.stroke();
      ctx.fillRect(xa, yP - 3, xp - xa, 5);

      // Guardrail posts
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let q = xa; q < xp; q += 10) {
        ctx.moveTo(q, yP - 3);
        ctx.lineTo(q, yP - 9);
      }
      ctx.moveTo(xa, yP - 9);
      ctx.lineTo(xp, yP - 9);
      ctx.stroke();

      // Suspension bridge upright towers
      for (const [u, X] of TW) {
        if (up >= u) {
          ctx.beginPath();
          ctx.moveTo(X - 9, yP);
          ctx.lineTo(X - 5, yt);
          ctx.lineTo(X + 5, yt);
          ctx.lineTo(X + 9, yP);
          ctx.fill();
          ctx.fillRect(X - 9, yt - 4, 18, 5);
          ctx.strokeStyle = BG;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let k = 1; k <= 5; k++) {
            const yy = yt + (hh * k) / 6;
            ctx.moveTo(X - 8, yy);
            ctx.lineTo(X + 8, yy);
          }
          ctx.stroke();
          ctx.strokeStyle = FG;
        }
      }

      // Suspension cables & vertical hanger ropes
      if (up >= 0.22) {
        for (const off of [0, 4]) {
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let q = xa; q <= xp; q += 4) {
            if (q === xa) ctx.moveTo(q, cy(q) + off);
            else ctx.lineTo(q, cy(q) + off);
          }
          ctx.stroke();
        }

        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let q = xa + 14; q < xp - 12; q += 13) {
          if (Math.abs(q - x1) < 7 || Math.abs(q - x2) < 7) continue;
          ctx.moveTo(q, cy(q) + 2);
          ctx.lineTo(q, yP - 9);
        }
        ctx.stroke();
      }

      // Active construction crane head or crossing vehicles
      if (up < 1) {
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(xp, yP - 3);
        ctx.lineTo(xp, yP - 46);
        ctx.lineTo(xp + 30, yP - 36);
        ctx.moveTo(xp, yP - 46);
        ctx.lineTo(xp - 12, yP - 40);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xp + 26, yP - 37);
        ctx.lineTo(xp + 26, yP - 12);
        ctx.stroke();
        ctx.fillRect(xp + 22, yP - 14, 8, 5);
      } else {
        // High-speed enterprise transport vehicles crossing bridge once open
        for (let k = 0; k < 6; k++) {
          const q = xa + ((T * 40 + (k * L) / 6) % L);
          ctx.fillRect(q, yP - 8, 10, 4);
          ctx.fillRect(q + 2, yP - 11, 5, 3);
        }
      }

      // Milestone labels along the bridge
      for (const [mPos, mLabel] of MILESTONES) {
        if (up >= mPos) {
          const X = xa + (xb - xa) * mPos;
          ctx.fillStyle = FG;
          ctx.beginPath();
          ctx.arc(X, yP, 6, 0, TAU);
          ctx.fill();
          ctx.font = '500 12px Inter, system-ui, sans-serif';
          drawText(mLabel, X, yP + (pt ? 14 : 26), pt ? 'right' : 'center');
        }
      }

      // Touchdown ripple pulse on completion
      if (up >= 1) {
        const k = ((T - 4) % 2) / 2;
        ctx.strokeStyle = FG;
        ctx.globalAlpha = 1 - k;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(xb, yP, 10 + k * 50, 0, TAU);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      mediaDark.removeEventListener('change', updateColors);
      cv.removeEventListener('click', resetRace);
    };
  }, [isAr, darkMode]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[460px] lg:h-[520px] select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        id="c"
        className="absolute inset-0 w-full h-full cursor-pointer block touch-pan-y"
        aria-label={
          isAr
            ? 'سباق تفاعلي: المسار التقليدي يستغرق حتى ٤٥ يوماً من العوائق، بينما مسار PontLook يشيد جسراً مباشراً خلال ٣ إلى ٥ أيام'
            : 'Animated race. The traditional route wanders through obstacles for up to 45 days. The PontLook route builds a straight bridge in 3 to 5 days.'
        }
      />
    </div>
  );
}
