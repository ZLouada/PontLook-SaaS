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
    const ctx = cv.getContext('2d', { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    // Ultra-optimized node count on mobile (42 per strand = 84 total) for 60-120fps lock
    const K = isMobile ? 42 : 160;
    const TAU = Math.PI * 2;
    let W = 0;
    let H = 0;
    let D = 1;

    const resize = () => {
      const mobile = window.innerWidth < 768;
      D = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
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

    // Double-helix node points
    const P: { s: number; i: number; a: number; b: number; c: number }[] = [];
    for (let s = 0; s < 2; s++) {
      for (let i = 0; i < K; i++) {
        P.push({ s, i, a: rnd(-1, 1), b: rnd(-1, 1), c: rnd(-1, 1) });
      }
    }

    // Ambient floating dust particles (disabled on mobile to eliminate draw call overhead)
    const dust = isMobile
      ? []
      : Array.from({ length: 140 }, () => ({
          x: rnd(-1, 1),
          y: rnd(-1, 1),
          z: rnd(0.2, 1),
          v: rnd(0.01, 0.04),
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
    let isVisible = true;

    // Pause canvas execution completely when out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    if (heroRef.current) observer.observe(heroRef.current);

    const onPointerMove = (e: PointerEvent) => {
      if (isMobile) return; // Skip pointer parallax on mobile touch screens
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };

    // Strict tap detector: guarantees scrolling swipes never trigger explosions on mobile!
    let pointerDownPos = { x: 0, y: 0, time: 0 };
    const onPointerDown = (e: PointerEvent) => {
      pointerDownPos = { x: e.clientX, y: e.clientY, time: performance.now() };
    };

    const onPointerUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      const duration = performance.now() - pointerDownPos.time;
      if (dist < 10 && duration < 320) {
        blast = 1;
        shock = { x: e.clientX, y: e.clientY, t: 0 };
      }
    };

    cv.addEventListener('pointermove', onPointerMove, { passive: true });
    cv.addEventListener('pointerdown', onPointerDown, { passive: true });
    cv.addEventListener('pointerup', onPointerUp, { passive: true });

    // Pre-cache letter elements to avoid DOM querySelectorAll on scroll
    const letterNodes = bigWordRef.current
      ? (Array.from(bigWordRef.current.querySelectorAll('i')) as HTMLElement[])
      : [];

    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        if (!heroRef.current) return;
        const hh = heroRef.current.offsetHeight - window.innerHeight;
        if (hh <= 0) return;
        const p = cl(window.scrollY / hh);
        targetScrollP = p;

        if (letterNodes.length > 0) {
          letterNodes.forEach((l, idx) => {
            const k = cl(p * 5 - idx * 0.14);
            l.style.opacity = `${1 - k}`;
            l.style.transform = `translateY(${-k * 26}px)`;
          });
        }

        if (leadRef.current) {
          const leadOpacity = sm(p, 0.45, 0.65) * (1 - sm(p, 0.9, 0.99));
          const leadY = (1 - sm(p, 0.45, 0.7)) * 40;
          leadRef.current.style.opacity = `${leadOpacity}`;
          leadRef.current.style.transform = `translateY(${leadY}px)`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      if (!isVisible) return;

      // Mobile responds instantly to touch scroll (0.12), desktop smoothly glides (0.045)
      const scrollLerp = isMobile ? 0.12 : 0.045;
      smoothScrollP += (targetScrollP - smoothScrollP) * scrollLerp;

      const t = (now - t0) / 1000;
      const asm = RM ? 1 : ez(cl(t / 2.8));
      const sep = sm(smoothScrollP, 0.32, 0.88) * 0.24;

      if (!isMobile) {
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;
      }
      blast *= 0.92; // Fast decay eliminates lingering draw cost
      if (blast < 0.005) blast = 0;

      // Mobile: hardware-accelerated clearRect with standard source-over blending
      // Desktop: cinematic lighter blend with subtle motion-blur trail
      if (isMobile) {
        ctx.clearRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'source-over';
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(5, 7, 13, 0.32)';
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = 'lighter';
      }

      const R = Math.min(W, H) * (isMobile ? 0.22 : 0.2);
      const len = H * 1.65;
      const zoom = 1 + smoothScrollP * 0.24;

      const baseSpin = t * 0.22;
      const scrollSpin = smoothScrollP * 0.55;
      const spin = baseSpin + scrollSpin + mx * 0.3;

      const tl = -0.35 + smoothScrollP * 0.12 + my * 0.05;
      const ct = Math.cos(tl);
      const st = Math.sin(tl);
      const TW = TAU * 3.2;

      const walkOffset = smoothScrollP * 0.26;

      if (shock) {
        shock.t += isMobile ? 0.032 : 0.02;
        if (shock.t > 1.4) shock = null;
      }

      const A: { sx: number; sy: number; Z: number; f: number; e: number; bright: number }[][] = [[], []];
      const bl = blast * W * 0.4;

      for (const q of P) {
        const u = q.i / (K - 1);
        const ang = u * TW + q.s * Math.PI + spin;
        const e = ez(cl(asm * 1.6 - u * 0.6));

        const X = lp(q.a * W * 0.6, R * Math.cos(ang), e) + q.a * bl + (q.s ? 1 : -1) * sep * W * 0.18;
        const Y = lp(q.b * H * 0.6, (u - 0.5 - walkOffset) * len, e) + q.b * bl;
        const Z = lp(q.c * R * 2, R * Math.sin(ang), e);

        const rx = X * ct - Y * st;
        const ry = X * st + Y * ct;
        const f = 1100 / (1100 - Z);
        let sx = W / 2 + rx * f * zoom;
        let sy = H / 2 + ry * f * zoom;
        let bright = 1;

        // Ultra-fast shockwave displacement using squared bounding-box filter
        if (shock) {
          const dx = sx - shock.x;
          const dy = sy - shock.y;
          const r = shock.t * 850;
          if (Math.abs(dx) < r + 60 && Math.abs(dy) < r + 60) {
            const d = Math.hypot(dx, dy);
            const distFromWave = Math.abs(d - r);
            if (distFromWave < 55) {
              const g = (1 - distFromWave / 55) * (1.4 - shock.t);
              const k = (g * 32) / (d || 1);
              sx += dx * k;
              sy += dy * k;
              bright += g * 1.6;
            }
          }
        }

        A[q.s][q.i] = { sx, sy, Z, f, e, bright };
      }

      // Base pair rungs connecting matching nodes
      for (let i = 0; i < K; i += 3) {
        const a = A[0][i];
        const b = A[1][i];
        if (!a || !b || a.e < 0.2) continue;
        const dp = (a.Z + b.Z) / (4 * R) + 0.5;

        ctx.strokeStyle = `rgba(255, 92, 0, ${(0.18 + 0.36 * dp) * a.e * (1 + sep * 0.8)})`;
        ctx.lineWidth = 1 + sep;
        ctx.beginPath();
        ctx.moveTo(a.sx, a.sy);
        ctx.lineTo(b.sx, b.sy);
        ctx.stroke();
      }

      // Strand node particles - PontLook Signature Orange theme
      for (let s = 0; s < 2; s++) {
        ctx.fillStyle = s ? '#FF5C00' : '#FFA048';
        for (let i = 0; i < K; i++) {
          const o = A[s][i];
          if (!o) continue;
          const dp = cl((o.Z / R + 1) / 2);
          const al = cl((0.2 + 0.8 * dp) * o.bright * (0.4 + 0.6 * o.e));
          const r = Math.max(0.4, (1.2 + 2.2 * dp) * Math.abs(o.f) * (i % 3 ? 1 : 1.9));

          ctx.globalAlpha = al;
          ctx.beginPath();
          ctx.arc(o.sx, o.sy, r, 0, TAU);
          ctx.fill();

          // Skip glow outer rings on mobile for instant rasterization
          if (!isMobile && i % 3 === 0) {
            ctx.globalAlpha = al * 0.2;
            ctx.beginPath();
            ctx.arc(o.sx, o.sy, r * 3.4, 0, TAU);
            ctx.fill();
          }
        }
      }
      ctx.globalAlpha = 1;

      // Traveling energy pulses
      if (asm >= 1 && now - lastP > 150) {
        lastP = now;
        pulses.push({ i: Math.floor(rnd(0, K / 3)) * 3, t: 0, s: rnd(0.014, 0.028) });
      }

      pulses = pulses.filter((o) => (o.t += o.s) < 1);
      ctx.fillStyle = '#fff';

      for (const o of pulses) {
        const a = A[0][o.i];
        const b = A[1][o.i];
        if (!a || !b) continue;
        const X = lp(a.sx, b.sx, ez(o.t));
        const Y = lp(a.sy, b.sy, ez(o.t));

        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(X, Y, 2.2, 0, TAU);
        ctx.fill();

        if (!isMobile) {
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.arc(X, Y, 8, 0, TAU);
          ctx.fill();
        }
      }

      // Enterprise domain tags (desktop only to prevent CPU font layout overhead on mobile)
      if (!isMobile && asm >= 1 && smoothScrollP < 0.9) {
        ctx.globalAlpha = 1;
        ctx.font = '500 10.5px Inter, system-ui, sans-serif';
        ctx.fillStyle = '#FFB280';

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

      // Ambient dust particles (desktop only)
      if (!isMobile && dust.length > 0) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FFA048';
        for (const d of dust) {
          d.y -= d.v * 0.003;
          if (d.y < -1) d.y = 1;
          ctx.globalAlpha = 0.45 * d.z;
          ctx.fillRect(
            W / 2 + (d.x + mx * 0.05 * d.z) * W * 0.6,
            H / 2 + d.y * H * 0.55,
            d.z * 1.5,
            d.z * 1.5
          );
        }
      }

      // Shockwave pulse ring
      if (shock) {
        ctx.globalAlpha = Math.max(0, (0.5 * (1.4 - shock.t)) / 1.4);
        ctx.strokeStyle = '#FF5C00';
        ctx.lineWidth = isMobile ? 1.5 : 2;
        ctx.beginPath();
        ctx.arc(shock.x, shock.y, shock.t * 850, 0, TAU);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;

      // Update HUD telemetry
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
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerdown', onPointerDown);
      cv.removeEventListener('pointerup', onPointerUp);
    };
  }, [isAr, pairs]);

  return (
    <section ref={heroRef} id="hero" className="relative h-[200vh] md:h-[440vh] select-none bg-black touch-pan-y">
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black touch-pan-y">
        {/* Subtle radial ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,92,0,0.12)_0,#05070D_70%)] pointer-events-none" />

        {/* Interactive 3D Canvas */}
        <canvas
          ref={canvasRef}
          id="c"
          className="absolute inset-0 w-full h-full cursor-crosshair block touch-pan-y"
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
          className="absolute inset-0 grid place-content-center text-center opacity-0 pointer-events-none px-[5vw] z-10 transition-transform duration-75 ease-out pb-[6vh]"
        >
          <h2 className="font-heading font-light text-[clamp(2.2rem,6vw,5.6rem)] leading-[1.04] tracking-tight text-white max-w-5xl mx-auto md:drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
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

          <p className="mt-7 text-neutral-300 text-sm sm:text-base font-sans md:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
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
          <div className="flex justify-start gap-[2vw] sm:gap-[2.5vw] font-sans font-normal text-[10px] sm:text-[10.5px] leading-[1.25] tracking-[0.04em] uppercase mb-[0.8vw] text-slate-200 px-[0.5vw]">
            <div className="border-s border-white/50 ps-2.5 max-w-[150px]">
              {isAr ? (
                <>أنت الآن<br />تدخل المنظومة</>
              ) : (
                <>You are<br />now<br />entering</>
              )}
            </div>
            <div className="border-s border-white/50 ps-2.5 max-w-[150px]">
              {isAr ? (
                <>الوقت: 3 دقائق<br />مرّر<br />للاستكشاف</>
              ) : (
                <>Time: 3 mins<br />scroll<br />to explore</>
              )}
            </div>
            <div className="border-s border-white/50 ps-2.5 max-w-[160px] hidden sm:block">
              {isAr
                ? 'خط الفرص المؤهلة لمزودي التدريب في الخليج'
                : 'The qualified pipeline for GCC training providers'}
            </div>
            <div className="border-s border-white/50 ps-2.5 max-w-[150px] hidden sm:block">
              {isAr ? (
                <>انقر في أي مكان<br />لإعادة تسلسل<br />الشبكة</>
              ) : (
                <>Click anywhere<br />to re-sequence<br />the helix</>
              )}
            </div>
          </div>

          {/* Massive Word: Providers */}
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
