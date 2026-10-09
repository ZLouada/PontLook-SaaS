'use client';

import React, { useRef, useEffect } from 'react';

interface RaceBridgeCanvasProps {
  isAr?: boolean;
  className?: string;
  darkMode?: boolean;
}

export default function RaceBridgeCanvas({
  isAr = false,
  className = '',
  darkMode = true,
}: RaceBridgeCanvasProps) {
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
    let sc = 1;
    let vis = true;
    let animId = 0;
    let t0 = performance.now();
    let TP: [number, number][] = [];

    // Colors: crisp white on black for dark mode
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

    // Obstacle markers along traditional wandering route
    const OB_EN: [number, string][] = [
      [0.16, 'Overwhelmed HR'],
      [0.36, 'Cold spam outreach'],
      [0.58, 'Dead-end leads'],
      [0.80, '4–8 weeks lost'],
    ];

    const OB_AR: [number, string][] = [
      [0.16, 'إرهاق الموارد البشرية'],
      [0.36, 'رسائل عشوائية باردة'],
      [0.58, 'فرص وهمية غير مجدية'],
      [0.80, '٤-٨ أسابيع مهدورة'],
    ];

    const OB = isAr ? OB_AR : OB_EN;

    // Milestones along PontLook direct bridge
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
      W = cv.clientWidth || 360;
      H = cv.clientHeight || 280;
      cv.width = Math.round(W * D);
      cv.height = Math.round(H * D);

      // Scale factor dynamically proportional to width (1.0 on desktop, ~0.65-0.75 on mobile)
      sc = Math.min(1.1, Math.max(0.68, W / 820));

      const towerW = Math.round(Math.max(22, Math.min(36, W * 0.05)));
      const xa = towerW + 10 * sc;
      const xb = W - towerW - 10 * sc;
      const L = xb - xa;
      const yT = H * 0.27;
      const A = Math.min(26, H * 0.085);

      TP = [];
      for (let i = 0; i <= 300; i++) {
        const u = i / 300;
        TP.push([
          xa + u * L,
          yT +
            A * Math.sin(u * 26) * 0.7 +
            A * 0.5 * Math.sin(u * 61 + 1) +
            A * 0.4 * Math.sin(u * 9),
        ]);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = new IntersectionObserver(
      (entries) => {
        vis = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(cv);

    const resetRace = () => {
      t0 = performance.now();
    };
    cv.addEventListener('click', resetRace);

    const drawLabel = (s: string, X: number, Y: number) => {
      const fontSize = Math.max(8.5, Math.round(11 * sc));
      ctx.font = `500 ${fontSize}px Inter, system-ui, sans-serif`;
      const w = ctx.measureText(s).width + 10 * sc;
      const h = 17 * sc;
      ctx.save();
      ctx.translate(X, Y);
      ctx.fillStyle = BG;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeStyle = FG;
      ctx.lineWidth = 1;
      ctx.strokeRect(-w / 2, -h / 2, w, h);
      ctx.fillStyle = FG;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s, 0, 0);
      ctx.restore();
    };

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      if (!vis) return;

      // Smooth loop timeline
      const elapsed = (now - t0) / 1000;
      const T = RM ? 12.5 : elapsed % 17;
      const day = T < 4 ? (T / 4) * 4 : Math.min(45, 4 + ((T - 4) * 41) / 8);
      const up = cl(day / 4);
      const ut = cl(day / 45);

      ctx.setTransform(D, 0, 0, D, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const towerW = Math.round(Math.max(22, Math.min(36, W * 0.05)));
      const xa = towerW + 10 * sc;
      const xb = W - towerW - 10 * sc;
      const L = xb - xa;
      const yP = H * 0.72;

      // Left anchor tower
      ctx.fillStyle = FG;
      ctx.fillRect(0, 0, towerW, H);
      ctx.fillStyle = BG;
      const towerFontSize = Math.max(8.5, Math.round(11 * sc));
      ctx.font = `600 ${towerFontSize}px Inter, system-ui, sans-serif`;
      ctx.save();
      ctx.translate(towerW / 2, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isAr ? 'منشأتك المؤسسية' : 'YOUR ENTERPRISE', 0, 0);
      ctx.restore();

      // Right anchor tower
      ctx.fillStyle = FG;
      ctx.fillRect(W - towerW, 0, towerW, H);
      ctx.fillStyle = BG;
      ctx.save();
      ctx.translate(W - towerW / 2, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isAr ? 'المزود المعتمد' : 'VERIFIED PROVIDER', 0, 0);
      ctx.restore();

      // ==========================================
      // TRACK 1: THE TRADITIONAL WAY (Top Track)
      // ==========================================
      const trackHeaderY = Math.max(14, H * 0.09);
      const trackFontSize = Math.max(9, Math.round(12 * sc));
      ctx.fillStyle = FG;
      ctx.font = `500 ${trackFontSize}px Inter, system-ui, sans-serif`;

      // Title on left
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(
        isAr ? 'المسار التقليدي القديم' : 'THE TRADITIONAL WAY',
        towerW + 10 * sc,
        trackHeaderY
      );

      // Progress counter on right
      const dayStr = isAr
        ? `اليوم ${Math.floor(day)}${day >= 45 ? ' · حتى ٤٥ يوماً' : ' / ٤٥'}`
        : `Day ${Math.floor(day)}${day >= 45 ? ' · up to 45 days' : ' / 45'}`;
      ctx.textAlign = 'right';
      ctx.fillText(dayStr, W - towerW - 10 * sc, trackHeaderY);

      // Faint path guide line
      ctx.lineJoin = 'round';
      ctx.strokeStyle = FG;
      ctx.globalAlpha = 0.12;
      ctx.lineWidth = 1;
      ctx.beginPath();
      TP.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Active progress along wandering curve
      const n = Math.floor(ut * 300);
      ctx.lineWidth = 1.6 * sc;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        if (i === 0) ctx.moveTo(TP[i][0], TP[i][1]);
        else ctx.lineTo(TP[i][0], TP[i][1]);
      }
      ctx.stroke();

      if (TP[n]) {
        ctx.fillStyle = FG;
        ctx.beginPath();
        ctx.arc(TP[n][0], TP[n][1], 4.5 * sc, 0, TAU);
        ctx.fill();
      }

      // Obstacle markers
      for (const o of OB) {
        if (ut >= o[0]) {
          const idx = Math.floor(o[0] * 300);
          const p = TP[idx];
          if (p) {
            ctx.lineWidth = 1.8 * sc;
            ctx.beginPath();
            ctx.moveTo(p[0] - 5 * sc, p[1] - 5 * sc);
            ctx.lineTo(p[0] + 5 * sc, p[1] + 5 * sc);
            ctx.moveTo(p[0] + 5 * sc, p[1] - 5 * sc);
            ctx.lineTo(p[0] - 5 * sc, p[1] + 5 * sc);
            ctx.stroke();
            drawLabel(o[1], p[0], p[1] - 14 * sc);
          }
        }
      }

      // ==========================================
      // TRACK 2: WITH PONTLOOK (Bottom Bridge)
      // ==========================================
      const hh = Math.min(100, H * 0.25);
      const yt = yP - hh;
      const ly = yP - hh - 12 * sc;

      ctx.fillStyle = FG;
      ctx.font = `500 ${trackFontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(
        isAr ? 'عبر منصة PONTLOCK' : 'WITH PONTLOOK',
        towerW + 10 * sc,
        ly
      );

      const pontlookDaysStr =
        up >= 1
          ? isAr
            ? '٣-٥ أيام · مطابقة مباشرة ومعتمدة'
            : '3–5 days · connected, verified, matched'
          : isAr
          ? `اليوم ${Math.floor(day)} / ٥`
          : `Day ${Math.floor(day)} / 3–5`;
      ctx.textAlign = 'right';
      ctx.fillText(pontlookDaysStr, W - towerW - 10 * sc, ly);

      // Geometry for the direct suspension bridge
      const xp = xa + L * up;
      const x1 = xa + L * 0.22;
      const x2 = xa + L * 0.78;
      const xm = (x1 + x2) / 2;
      const hf = (x2 - x1) / 2;
      const TW: [number, number][] = [
        [0.22, x1],
        [0.78, x2],
      ];

      // Parabolic suspension cable curve formula
      const cy = (q: number) => {
        if (q <= x1) {
          const u = (q - xa) / (x1 - xa);
          return yP - 8 * sc + (yt - yP + 8 * sc) * u + 24 * sc * u * (1 - u);
        }
        if (q <= x2) {
          const r = (q - xm) / hf;
          return yP - 16 * sc - (yP - 16 * sc - yt) * r * r;
        }
        const u = (xb - q) / (xb - x2);
        return yP - 8 * sc + (yt - yP + 8 * sc) * u + 24 * sc * u * (1 - u);
      };

      ctx.fillStyle = FG;
      ctx.strokeStyle = FG;
      ctx.lineCap = 'butt';

      // Speed baseline stripes below the deck
      ctx.globalAlpha = 0.16;
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.setLineDash([16 * sc, 10 * sc]);
        ctx.lineDashOffset = T * (i % 2 ? 8 : -8);
        ctx.beginPath();
        ctx.moveTo(xa, yP + 14 * sc + i * 5 * sc);
        ctx.lineTo(xb, yP + 14 * sc + i * 5 * sc);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Bridge pylons foundation
      for (const [u, X] of TW) {
        if (up >= u) {
          ctx.fillRect(X - 8 * sc, yP, 16 * sc, H * 0.1);
          ctx.fillRect(X - 13 * sc, yP + H * 0.1 - 4 * sc, 26 * sc, 4 * sc);
        }
      }

      // Truss lattice work beneath bridge deck
      ctx.lineWidth = 1;
      ctx.beginPath();
      const step = Math.max(7, Math.round(10 * sc));
      for (let q = xa; q < xp - 4; q += step) {
        ctx.moveTo(q, yP + 2);
        ctx.lineTo(q + step / 2, yP + 10 * sc);
        ctx.lineTo(q + step, yP + 2);
      }
      ctx.stroke();

      // Lower truss chord
      ctx.lineWidth = 1.8 * sc;
      ctx.beginPath();
      ctx.moveTo(xa, yP + 10 * sc);
      ctx.lineTo(xp, yP + 10 * sc);
      ctx.stroke();

      // Solid roadway deck
      ctx.fillRect(xa, yP - 2.5 * sc, xp - xa, 4.5 * sc);

      // Guardrail posts and top cable
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let q = xa; q < xp; q += step) {
        ctx.moveTo(q, yP - 2.5 * sc);
        ctx.lineTo(q, yP - 7 * sc);
      }
      ctx.moveTo(xa, yP - 7 * sc);
      ctx.lineTo(xp, yP - 7 * sc);
      ctx.stroke();

      // Suspension bridge towers above deck
      for (const [u, X] of TW) {
        if (up >= u) {
          ctx.beginPath();
          ctx.moveTo(X - 8 * sc, yP);
          ctx.lineTo(X - 4 * sc, yt);
          ctx.lineTo(X + 4 * sc, yt);
          ctx.lineTo(X + 8 * sc, yP);
          ctx.fill();
          ctx.fillRect(X - 8 * sc, yt - 4 * sc, 16 * sc, 4 * sc);

          // Tower cross struts
          ctx.strokeStyle = BG;
          ctx.lineWidth = 1.8 * sc;
          ctx.beginPath();
          for (let k = 1; k <= 5; k++) {
            const yy = yt + (hh * k) / 6;
            ctx.moveTo(X - 7 * sc, yy);
            ctx.lineTo(X + 7 * sc, yy);
          }
          ctx.stroke();
          ctx.strokeStyle = FG;
        }
      }

      // Main suspension parabolic cables & vertical hangers
      if (up >= 0.22) {
        for (const off of [0, 3 * sc]) {
          ctx.lineWidth = 1.8 * sc;
          ctx.beginPath();
          for (let q = xa; q <= xp; q += 4) {
            if (q === xa) ctx.moveTo(q, cy(q) + off);
            else ctx.lineTo(q, cy(q) + off);
          }
          ctx.stroke();
        }

        // Vertical hanger cables
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let q = xa + 12 * sc; q < xp - 10 * sc; q += 11 * sc) {
          if (Math.abs(q - x1) < 6 * sc || Math.abs(q - x2) < 6 * sc) continue;
          ctx.moveTo(q, cy(q) + 2);
          ctx.lineTo(q, yP - 7 * sc);
        }
        ctx.stroke();
      }

      // Moving vehicle / construction head
      if (up < 1) {
        ctx.lineWidth = 2 * sc;
        ctx.beginPath();
        ctx.moveTo(xp, yP - 3 * sc);
        ctx.lineTo(xp, yP - 36 * sc);
        ctx.lineTo(xp + 24 * sc, yP - 28 * sc);
        ctx.moveTo(xp, yP - 36 * sc);
        ctx.lineTo(xp - 10 * sc, yP - 32 * sc);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xp + 20 * sc, yP - 29 * sc);
        ctx.lineTo(xp + 20 * sc, yP - 10 * sc);
        ctx.stroke();
        ctx.fillRect(xp + 17 * sc, yP - 12 * sc, 7 * sc, 4 * sc);
      } else {
        // Completed traffic flow cars
        for (let k = 0; k < 6; k++) {
          const q = xa + (((T * 38 * sc + (k * L) / 6) % L) + L) % L;
          ctx.fillRect(q, yP - 7 * sc, 9 * sc, 3.5 * sc);
          ctx.fillRect(q + 2 * sc, yP - 10 * sc, 4.5 * sc, 3 * sc);
        }
      }

      // Milestones along PontLook bridge with staggered offsets
      MILESTONES.forEach((s, idx) => {
        if (up >= s[0]) {
          const X = xa + L * s[0];
          ctx.fillStyle = FG;
          ctx.beginPath();
          ctx.arc(X, yP, 4.5 * sc, 0, TAU);
          ctx.fill();

          ctx.font = `500 ${Math.max(8.5, Math.round(11 * sc))}px Inter, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          // Stagger Y position to guarantee zero label collisions on mobile
          const yOff = idx % 2 === 0 ? 15 * sc : 28 * sc;
          ctx.fillText(s[1], X, yP + yOff);
        }
      });

      // Touchdown ripple pulse on completion
      if (up >= 1) {
        const k = ((T - 4) % 2) / 2;
        ctx.strokeStyle = FG;
        ctx.globalAlpha = 1 - k;
        ctx.lineWidth = 2 * sc;
        ctx.beginPath();
        ctx.arc(xb, yP, 8 * sc + k * 40 * sc, 0, TAU);
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
      className={`relative w-full h-[260px] xs:h-[290px] sm:h-[350px] md:h-[420px] lg:h-[480px] select-none ${className}`}
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
