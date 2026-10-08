'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GccProviderHeroProps {
  isAr?: boolean;
}

const PR_EN = [
  ['Leadership', 'High turnover'],
  ['AI skills', 'AI adoption'],
  ['Sales', 'Pipeline gaps'],
  ['Compliance', 'Saudization'],
  ['Soft skills', 'Communication'],
  ['Safety', 'Onboarding'],
  ['Management', 'Middle managers'],
  ['Digital', 'Transformation'],
];

const PR_AR = [
  ['القيادة التنفيذية', 'الدوران الوظيفي'],
  ['مهارات الذكاء الاصطناعي', 'تبني التقنية'],
  ['مبيعات الشركات', 'فجوة الصفقات'],
  ['الامتثال والرقابة', 'متطلبات التوطين'],
  ['المهارات الناعمة', 'التواصل المؤسسي'],
  ['السلامة المهنية', 'تأهيل الموظفين'],
  ['الإدارة الوسطى', 'تطوير القيادات'],
  ['التحول الرقمي', 'سد الفجوة المهارية'],
];

export default function GccProviderHero({ isAr = false }: GccProviderHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bigWordRef = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);

  const [hudText, setHudText] = useState('SEQUENCING PROVIDER GENOME 0%');

  const pairs = isAr ? PR_AR : PR_EN;
  const word = isAr ? 'المزودون' : 'Providers';

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const K = 170;
    const TAU = Math.PI * 2;
    let W = 0;
    let H = 0;
    let D = 1;

    const resize = () => {
      D = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * D;
      cv.height = H * D;
      ctx.setTransform(D, 0, 0, D, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const lp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ez = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const sm = (v: number, a: number, b: number) => ez(cl((v - a) / (b - a)));

    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Node points: 2 strands
    const P: { s: number; i: number; a: number; b: number; c: number }[] = [];
    for (let s = 0; s < 2; s++) {
      for (let i = 0; i < K; i++) {
        P.push({ s, i, a: rnd(-1, 1), b: rnd(-1, 1), c: rnd(-1, 1) });
      }
    }

    // Ambient floating dust particles
    const dust = Array.from({ length: 320 }, () => ({
      x: rnd(-1, 1),
      y: rnd(-1, 1),
      z: rnd(0.2, 1),
      v: rnd(0.01, 0.05),
    }));

    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let targetScrollP = 0;
    let smoothScrollP = 0;
    let blast = 0;
    let shock: { x: number; y: number; t: number } | null = null;
    let pulses: { i: number; t: number; s: number }[] = [];
    let lastP = 0;
    const t0 = performance.now();
    let animId: number;

    const onPointerMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onPointerDown = (e: PointerEvent) => {
      blast = 1;
      shock = { x: e.clientX, y: e.clientY, t: 0 };
    };

    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerdown', onPointerDown);

    // Track scroll
    const onScroll = () => {
      if (!heroRef.current) return;
      const hh = heroRef.current.offsetHeight - window.innerHeight;
      if (hh <= 0) return;
      const p = cl(window.scrollY / hh);
      targetScrollP = p;

      // Big word letter animation
      if (bigWordRef.current) {
        const letters = bigWordRef.current.querySelectorAll('i');
        letters.forEach((l, idx) => {
          const k = cl(p * 5 - idx * 0.14);
          (l as HTMLElement).style.opacity = `${1 - k}`;
          (l as HTMLElement).style.transform = `translateY(${-k * 26}px)`;
          (l as HTMLElement).style.filter = `blur(${k * 10}px)`;
        });
      }

      // Lead text animation
      if (leadRef.current) {
        const leadOpacity = sm(p, 0.45, 0.65) * (1 - sm(p, 0.9, 0.99));
        const leadY = (1 - sm(p, 0.45, 0.7)) * 40;
        leadRef.current.style.opacity = `${leadOpacity}`;
        leadRef.current.style.transform = `translateY(${leadY}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      if (window.scrollY > window.innerHeight * 5.2) return;

      // Butter-smooth damped scroll progression (never snaps or accelerates abruptly)
      smoothScrollP += (targetScrollP - smoothScrollP) * 0.045;

      const t = (now - t0) / 1000;
      const asm = RM ? 1 : ez(cl(t / 3.6));
      const sep = sm(smoothScrollP, 0.32, 0.88) * 0.24;

      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      blast *= 0.955;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(5, 7, 13, 0.32)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      const R = Math.min(W, H) * 0.2;
      const len = H * 1.7;

      // Gentle zoom - restrained so points don't rush toward camera
      const zoom = 1 + smoothScrollP * 0.25;

      // Calm, slow idle rotation with subtle scroll progression (walks slowly, no speedup)
      const baseSpin = t * 0.2;
      const scrollSpin = smoothScrollP * 0.55;
      const spin = baseSpin + scrollSpin + mx * 0.35;

      // Gentle tilt and stable twist amount (never unwinds or whips fast)
      const tl = -0.35 + smoothScrollP * 0.12 + my * 0.06;
      const ct = Math.cos(tl);
      const st = Math.sin(tl);
      const TW = TAU * 3.2;

      // Slow vertical translation creating steady walking cadence down the helix
      const walkOffset = smoothScrollP * 0.26;

      if (shock) {
        shock.t += 0.016;
        if (shock.t > 1.6) shock = null;
      }

      const A: any[][] = [[], []];

      for (const q of P) {
        const u = q.i / (K - 1);
        const ang = u * TW + q.s * Math.PI + spin;
        const e = ez(cl(asm * 1.6 - u * 0.6));
        const bl = blast * W * 0.55;

        // Coordinates with calm vertical walk traversal
        const X = lp(q.a * W * 0.7, R * Math.cos(ang), e) + q.a * bl + (q.s ? 1 : -1) * sep * W * 0.18;
        const Y = lp(q.b * H * 0.7, (u - 0.5 - walkOffset) * len, e) + q.b * bl;
        const Z = lp(q.c * R * 2, R * Math.sin(ang), e);

        const rx = X * ct - Y * st;
        const ry = X * st + Y * ct;
        const f = 1100 / (1100 - Z);
        let sx = W / 2 + rx * f * zoom;
        let sy = H / 2 + ry * f * zoom;
        let bright = 1;

        if (shock) {
          const d = Math.hypot(sx - shock.x, sy - shock.y);
          const r = shock.t * 1000;
          const g = Math.exp(-Math.pow((d - r) / 70, 2)) * (1.6 - shock.t);
          const k = (g * 45) / (d || 1);
          sx += (sx - shock.x) * k;
          sy += (sy - shock.y) * k;
          bright += g * 2;
        }

        A[q.s][q.i] = { sx, sy, Z, f, e, bright };
      }

      // Base pair rungs between strands
      for (let i = 0; i < K; i += 3) {
        const a = A[0][i];
        const b = A[1][i];
        if (!a || !b) continue;
        const dp = (a.Z + b.Z) / (4 * R) + 0.5;
        if (a.e < 0.2) continue;

        ctx.strokeStyle = `rgba(255, 92, 0, ${(0.16 + 0.35 * dp) * a.e * (1 + sep * 0.8)})`;
        ctx.lineWidth = 1 + sep;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // Strand dots - PontLook Orange theme
      for (let s = 0; s < 2; s++) {
        ctx.fillStyle = s ? '#FF5C00' : '#FFA048';
        for (let i = 0; i < K; i++) {
          const o = A[s][i];
          if (!o) continue;
          const dp = cl((o.Z / R + 1) / 2);
          const al = cl((0.18 + 0.82 * dp) * o.bright * (0.4 + 0.6 * o.e));
          const r = Math.max(0.3, (1.1 + 2.4 * dp) * Math.abs(o.f) * (i % 3 ? 1 : 2.1));

          ctx.globalAlpha = al;
          ctx.beginPath();
          ctx.arc(o.sx, o.sy, r, 0, TAU);
          ctx.fill();

          if (i % 3 === 0) {
            ctx.globalAlpha = al * 0.22;
            ctx.beginPath();
            ctx.arc(o.sx, o.sy, r * 3.6, 0, TAU);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Energy pulses
      if (asm >= 1 && now - lastP > 130) {
        lastP = now;
        pulses.push({ i: Math.floor(rnd(0, K / 3)) * 3, t: 0, s: rnd(0.012, 0.03) });
      }

      pulses = pulses.filter((o) => (o.t += o.s) < 1);
      ctx.fillStyle = '#fff';

      for (const o of pulses) {
        const a = A[0][o.i];
        const b = A[1][o.i];
        if (!a || !b) continue;
        const X = lp(a.sx, b.sx, ez(o.t));
        const Y = lp(a.sy, b.sy, ez(o.t));

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(X, Y, 2.6, 0, TAU);
        ctx.fill();

        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.arc(X, Y, 11, 0, TAU);
        ctx.fill();
      }

      // 3D floating enterprise domain tags (Orange glow)
      ctx.globalAlpha = 1;
      ctx.font = '500 10.5px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#FFB280';

      if (asm >= 1 && smoothScrollP < 0.9) {
        for (let i = 6, k = 0; i < K; i += 15, k++) {
          const a = A[0][i];
          const b = A[1][i];
          if (!a || !b) continue;
          const pr = pairs[k % pairs.length];
          const L = a.sx < b.sx;

          if (a.Z > R * 0.3) {
            ctx.globalAlpha = 0.85 * (a.Z / R);
            ctx.textAlign = L ? 'right' : 'left';
            ctx.fillText(pr[0], a.sx + (L ? -12 : 12), a.sy + 3);
          }
          if (b.Z > R * 0.3) {
            ctx.globalAlpha = 0.85 * (b.Z / R);
            ctx.textAlign = L ? 'left' : 'right';
            ctx.fillText(pr[1], b.sx + (L ? 12 : -12), b.sy + 3);
          }
        }
      }

      // Ambient dust particles (Warm golden amber)
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#FFA048';
      for (const d of dust) {
        d.y -= d.v * 0.004;
        if (d.y < -1) d.y = 1;
        ctx.globalAlpha = 0.45 * d.z;
        ctx.fillRect(
          W / 2 + (d.x + mx * 0.05 * d.z) * W * 0.6,
          H / 2 + d.y * H * 0.55,
          d.z * 1.6,
          d.z * 1.6
        );
      }

      // Shockwave ring
      if (shock) {
        ctx.globalAlpha = (0.6 * (1.6 - shock.t)) / 1.6;
        ctx.strokeStyle = '#FF5C00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(shock.x, shock.y, shock.t * 1000, 0, TAU);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Update HUD state
      const nextHud =
        asm < 1
          ? isAr
            ? `تسلسل جينات المزود ${Math.round(asm * 100)}%`
            : `SEQUENCING PROVIDER GENOME ${Math.round(asm * 100)}%`
          : blast > 0.15
          ? isAr
            ? 'إعادة التسلسل التدريبي…'
            : 'RE-SEQUENCING…'
          : isAr
          ? `رابط المزود ↔ الشركات ${Math.round(sep * 100)}%`
          : `PROVIDER ↔ COMPANY LINK ${Math.round(sep * 100)}%`;

      setHudText(nextHud);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isAr, pairs]);

  return (
    <section ref={heroRef} id="hero" className="relative h-[440vh] select-none bg-black">
      {/* Pinned 100vh Viewport */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,92,0,0.1)_0,#05070D_70%)] bg-black">
        {/* Interactive 3D Canvas */}
        <canvas
          ref={canvasRef}
          id="c"
          className="absolute inset-0 w-full h-full cursor-crosshair block"
          aria-label="Animated DNA helix linking training providers to GCC companies"
        />

        {/* Top-Left Telemetry HUD */}
        <div
          id="hud"
          className="absolute start-[2.2vw] top-[calc(88px+env(safe-area-inset-top,0px))] font-sans font-medium text-[11px] tracking-[0.14em] text-[#FF5C00] pointer-events-none z-10"
        >
          {hudText}
        </div>

        {/* Center Scroll-Revealed Lead Section */}
        <div
          ref={leadRef}
          id="lead"
          className="absolute inset-0 grid place-content-center text-center opacity-0 pointer-events-none px-[5vw] z-10 transition-transform duration-75 ease-out"
        >
          <h2 className="font-heading font-light text-[clamp(2.2rem,6vw,5.6rem)] leading-[1.04] tracking-tight text-white max-w-5xl mx-auto">
            {isAr ? (
              <>
                توقف عن ملاحقة الشركات. <br />
                ارتبط بالمنشآت التي تبحث عنك الآن.
              </>
            ) : (
              <>
                Stop chasing companies. <br />
                Match with the ones that need you.
              </>
            )}
          </h2>

          <p className="mt-7 text-neutral-300 text-sm sm:text-base font-sans">
            {isAr ? 'منظومة التشغيل والربط لـ' : 'Operating System for'}
            <b className="block text-white font-medium mt-1">
              {isAr ? 'مزودي تدريب الشركات في الخليج' : 'GCC Corporate Training Providers'}
            </b>
          </p>

          <div className="mt-8 flex justify-center gap-3 pointer-events-auto">
            <a
              href="#connection-bridge"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5C00] hover:bg-[#FF6A1A] text-white text-xs sm:text-sm font-sans font-semibold rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200"
            >
              <span>{isAr ? 'انضم كشريك تدريب' : 'Apply as provider'}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom Banner with Metadata & Massive Word */}
        <div className="absolute inset-x-0 bottom-[0.5vh] sm:bottom-[1vh] px-[1vw] sm:px-[1.5vw] pointer-events-none z-10">
          {/* Metadata Cards */}
          <div className="flex justify-end gap-[2vw] font-sans font-normal text-[10px] sm:text-[10.5px] leading-[1.25] tracking-[0.04em] uppercase mb-[0.8vw] text-slate-300 px-[0.5vw]">
            <div className="border-s border-white/40 ps-2 max-w-[150px]">
              {isAr ? (
                <>أنت الآن<br />تدخل المنظومة</>
              ) : (
                <>You are<br />now<br />entering</>
              )}
            </div>
            <div className="border-s border-white/40 ps-2 max-w-[150px]">
              {isAr ? (
                <>الوقت: 3 دقائق<br />مرّر<br />للاستكشاف</>
              ) : (
                <>Time: 3 mins<br />scroll<br />to explore</>
              )}
            </div>
            <div className="border-s border-white/40 ps-2 max-w-[160px] hidden sm:block">
              {isAr
                ? 'خط الفرص المؤهلة لمزودي التدريب في الخليج'
                : 'The qualified pipeline for GCC training providers'}
            </div>
            <div className="border-s border-white/40 ps-2 max-w-[150px] hidden sm:block">
              {isAr ? (
                <>انقر في أي مكان<br />لإعادة تسلسل<br />الشبكة</>
              ) : (
                <>Click anywhere<br />to re-sequence<br />the helix</>
              )}
            </div>
          </div>

          {/* Massive Word: Providers - Fills entire screen width display */}
          <h1
            ref={bigWordRef}
            id="big"
            className="w-full flex justify-between items-baseline font-heading font-light text-[clamp(4.2rem,22vw,25.5vw)] leading-[0.78] tracking-tight whitespace-nowrap text-[#E4EAF6] select-none overflow-hidden"
            aria-label={word}
          >
            {word.split('').map((char, idx) => (
              <b
                key={idx}
                className="inline-block animate-[in_1.2s_cubic-bezier(0.2,0.8,0.2,1)_forwards] shrink-0"
                style={{
                  animationDelay: `calc(1.8s + ${idx} * 0.09s)`,
                }}
              >
                <i className="inline-block not-italic will-change-transform">{char}</i>
              </b>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
