'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { LAND_DATA } from './landData';

const DR = Math.PI / 180;
const TAU = Math.PI * 2;
const CW = 480;
const RW = 240;

const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lp = (a: number, b: number, t: number) => a + (b - a) * t;
const ez = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const sm = (v: number, a: number, b: number) => ez(cl((v - a) / (b - a)));
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

interface CityNode {
  n: string;
  X: number;
  Y: number;
  Z: number;
  ph: number;
  sx: number;
  sy: number;
  z: number;
}

interface Arc {
  A: CityNode;
  B: CityNode;
  om: number;
  t: number;
  k: number;
  l: string;
  sp: number;
  lift: number;
  to: CityNode;
}

export default function Hero() {
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const bigWordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const smallScreen = window.innerWidth < 700;

    // Decode run-length land mask
    const XC: number[] = [];
    const YS: number[] = [];
    const SP: number[] = [];

    const b = atob(LAND_DATA);
    let pos = 0;
    for (let r = 0; r < RW; r++) {
      let c = 0;
      let land = false;
      const lat = (90 - (r + 0.5) * 0.75) * DR;
      const cl_ = Math.cos(lat);
      const sl = Math.sin(lat);
      while (c < CW && pos < b.length) {
        const n = b.charCodeAt(pos++);
        if (land && lat > -60 * DR) {
          for (let k = c; k < c + n; k++) {
            if (smallScreen && (k + r) % 2) continue;
            const lo = (-180 + (k + 0.5) * 0.75) * DR;
            XC.push(cl_ * Math.cos(lo));
            YS.push(cl_ * Math.sin(lo));
            SP.push(sl);
          }
        }
        c += n;
        land = !land;
      }
    }

    const N = XC.length;
    const FX = Float32Array.from(XC);
    const FY = Float32Array.from(YS);
    const FZ = Float32Array.from(SP);
    const BK = [0, 1, 2, 3, 4].map(() => new Float32Array(N * 2));
    const BC = [0, 0, 0, 0, 0];

    const mkC = (n: string, la: number, lo: number): CityNode => ({
      n,
      X: Math.cos(la * DR) * Math.cos(lo * DR),
      Y: Math.cos(la * DR) * Math.sin(lo * DR),
      Z: Math.sin(la * DR),
      ph: rnd(0, 6),
      sx: 0,
      sy: 0,
      z: -1,
    });

    const cityData = isAr
      ? [
          ['الرياض', 24.7, 46.7],
          ['جدة', 21.5, 39.2],
          ['دبي', 25.2, 55.3],
          ['أبوظبي', 24.45, 54.4],
          ['الدوحة', 25.3, 51.5],
          ['مدينة الكويت', 29.4, 48],
          ['المنامة', 26.2, 50.6],
          ['مسقط', 23.6, 58.6],
          ['نيوآرك · المقر', 39.7, -75.7],
        ]
      : [
          ['RIYADH', 24.7, 46.7],
          ['JEDDAH', 21.5, 39.2],
          ['DUBAI', 25.2, 55.3],
          ['ABU DHABI', 24.45, 54.4],
          ['DOHA', 25.3, 51.5],
          ['KUWAIT CITY', 29.4, 48],
          ['MANAMA', 26.2, 50.6],
          ['MUSCAT', 23.6, 58.6],
          ['NEWARK, DE · HQ', 39.7, -75.7],
        ];

    const CT: CityNode[] = cityData.map(([name, lat, lon]) =>
      mkC(name as string, lat as number, lon as number)
    );

    const LB = isAr
      ? [
          'فجوة القيادة التنفيذية',
          'تسريع مبيعات الشركات',
          'التأهيل الرقمي والذكاء الاصطناعي',
          'برامج التوطين والسعودة',
          'التدريب على الامتثال والحوكمة',
          'تطوير الإدارة الوسطى',
          'رفع كفاءة خدمة العملاء',
        ]
      : [
          'Executive leadership gap',
          'B2B sales velocity lag',
          'Digital & AI upskilling',
          'Saudization programme',
          'Compliance training',
          'Middle-manager development',
          'Customer service uplift',
        ];

    let W = 0;
    let H = 0;
    let D = 1;
    let R = 0;
    let cx = 0;
    let cy = 0;
    let p = 0;
    let vis = true;
    let drag = 0;
    let dn = false;
    let lx = 0;
    let mv = 0;
    let cnt = 0;
    let lastA = 0;
    let arcs: Arc[] = [];
    let intro1 = false;
    const t0 = performance.now();

    const ST = Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rnd(0.4, 1.3),
      f: rnd(0, 6),
    }));

    const rs = () => {
      if (!cv) return;
      D = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth;
      H = cv.clientHeight;
      cv.width = W * D;
      cv.height = H * D;
      ctx.setTransform(D, 0, 0, D, 0, 0);
      const pt = W < 760;
      R = pt ? W * 1.05 : Math.min(W * 0.44, H * 0.8);
      cx = W / 2;
      cy = H * (pt ? 0.82 : 1.0);
    };

    rs();
    window.addEventListener('resize', rs, { passive: true });

    let observer: IntersectionObserver | null = null;
    if (heroRef.current) {
      observer = new IntersectionObserver((entries) => {
        vis = entries[0]?.isIntersecting ?? true;
      });
      observer.observe(heroRef.current);
    }

    const P3 = (
      X: number,
      Y: number,
      Z: number,
      c0: number,
      s0: number,
      cp: number,
      sp: number,
      rr: number
    ): [number, number, number] => {
      const a = X * c0 + Y * s0;
      const b = Y * c0 - X * s0;
      return [cx + rr * b, cy - rr * (cp * Z - sp * a), sp * Z + cp * a];
    };

    const mkArc = (A: CityNode, B: CityNode, l: string, slow?: boolean): Arc => {
      const om = Math.acos(cl(A.X * B.X + A.Y * B.Y + A.Z * B.Z, -1, 1));
      return {
        A,
        B,
        om,
        t: 0,
        k: 0,
        l,
        sp: slow ? 0.0042 : rnd(0.011, 0.018),
        lift: 0.08 + om * 0.1,
        to: B,
      };
    };

    const spawn = (a?: number | null, b?: number | null, slow?: boolean) => {
      let fromIdx = a ?? Math.floor(rnd(0, 8));
      let toIdx = b;
      if (toIdx == null) {
        do {
          toIdx = Math.floor(rnd(0, 8));
        } while (toIdx === fromIdx);
      }
      arcs.push(mkArc(CT[fromIdx], CT[toIdx], LB[cnt % LB.length], slow));
      cnt++;
    };

    const onPointerDown = (e: PointerEvent) => {
      dn = true;
      lx = e.clientX;
      mv = 0;
      try {
        cv.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dn) return;
      const dx = e.clientX - lx;
      lx = e.clientX;
      mv += Math.abs(dx);
      drag -= dx * 0.22;
    };

    const onPointerUp = (e: PointerEvent) => {
      dn = false;
      if (mv < 5) {
        const r = cv.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        let bi = -1;
        let bd = 140;
        CT.slice(0, 8).forEach((c, i) => {
          if (c.z > 0.05) {
            const d = Math.hypot(c.sx - px, c.sy - py);
            if (d < bd) {
              bd = d;
              bi = i;
            }
          }
        });
        if (bi < 0) spawn();
        else {
          let a: number;
          do {
            a = Math.floor(rnd(0, 8));
          } while (a === bi);
          spawn(a, bi);
        }
      }
    };

    cv.addEventListener('pointerdown', onPointerDown);
    cv.addEventListener('pointermove', onPointerMove);
    cv.addEventListener('pointerup', onPointerUp);

    const BA = [0.12, 0.28, 0.5, 0.75, 1];
    const BS = [0.9, 1.1, 1.4, 1.7, 2];
    let animId: number;

    const frame = (now: number) => {
      animId = requestAnimationFrame(frame);
      if (!vis) return;

      const t = (now - t0) / 1000;
      const k = RM ? 1 : ez(cl(t / 5.2));
      if (!dn) drag *= 0.985;

      const l0 =
        (lp(-75.7, 49, k) + (k >= 1 ? Math.sin(t * 0.12) * 5 : 0) + drag) * DR;
      const ph = (lp(40, -26, k) + p * 17) * DR;
      const c0 = Math.cos(l0);
      const s0 = Math.sin(l0);
      const cp = Math.cos(ph);
      const sp = Math.sin(ph);
      const rr = R * (1 + p * 0.3);

      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      // Starfield background
      ctx.fillStyle = '#fff';
      for (const s of ST) {
        ctx.globalAlpha = 0.25 + 0.5 * Math.abs(Math.sin(t * 0.8 + s.f));
        ctx.fillRect(s.x * W, s.y * H * 0.7, s.r, s.r);
      }

      // Outer radial glow
      const gOuter = ctx.createRadialGradient(
        cx,
        cy,
        rr * 0.97,
        cx,
        cy,
        rr * 1.12
      );
      gOuter.addColorStop(0, 'rgba(255,255,255,.28)');
      gOuter.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = gOuter;
      ctx.beginPath();
      ctx.arc(cx, cy, rr * 1.12, 0, TAU);
      ctx.fill();

      // Earth dark core
      ctx.fillStyle = '#020202';
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, TAU);
      ctx.fill();

      // Project land points into 5 depth tiers
      BC.fill(0);
      for (let i = 0; i < N; i++) {
        const a = FX[i] * c0 + FY[i] * s0;
        const z = sp * FZ[i] + cp * a;
        if (z <= 0) continue;
        const b = FY[i] * c0 - FX[i] * s0;
        const lv =
          z < 0.12 ? 0 : z < 0.3 ? 1 : z < 0.55 ? 2 : z < 0.8 ? 3 : 4;
        const q = BK[lv];
        const n = BC[lv];
        q[n] = cx + rr * b;
        q[n + 1] = cy - rr * (cp * FZ[i] - sp * a);
        BC[lv] = n + 2;
      }

      ctx.fillStyle = '#fff';
      for (let l = 0; l < 5; l++) {
        ctx.globalAlpha = BA[l];
        const s = BS[l] * Math.max(0.8, rr / 650);
        const q = BK[l];
        ctx.beginPath();
        for (let i = 0; i < BC[l]; i += 2) {
          ctx.rect(q[i] - s / 2, q[i + 1] - s / 2, s, s);
        }
        ctx.fill();
      }

      // Atmospheric rim gradient & circle
      const gRim = ctx.createRadialGradient(cx, cy, rr * 0.86, cx, cy, rr);
      gRim.addColorStop(0, 'rgba(255,255,255,0)');
      gRim.addColorStop(1, 'rgba(255,255,255,.22)');
      ctx.globalAlpha = 1;
      ctx.fillStyle = gRim;
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.55)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, rr, 0, TAU);
      ctx.stroke();

      // City nodes and beacons
      ctx.font = isAr
        ? '500 10px Cairo, system-ui, sans-serif'
        : '500 10px Inter, system-ui, sans-serif';
      ctx.textAlign = 'left';

      for (const c of CT) {
        const q = P3(c.X, c.Y, c.Z, c0, s0, cp, sp, rr);
        c.sx = q[0];
        c.sy = q[1];
        c.z = q[2];
        if (q[2] < 0.04) continue;
        const a = cl(q[2] * 1.6);
        const pu = (t * 0.7 + c.ph) % 1;
        ctx.globalAlpha = a;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(q[0] - 5, q[1] - 5, 10, 10);
        ctx.fillStyle = '#fff';
        ctx.fillRect(q[0] - 1.5, q[1] - 1.5, 3, 3);
        ctx.globalAlpha = a * (1 - pu) * 0.6;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 6 + pu * 22, 0, TAU);
        ctx.stroke();
        ctx.globalAlpha = a * 0.85;
        ctx.fillText(c.n, q[0] + 13, q[1] + 3);
      }

      // Spawn initial arc & continuous background matches
      if (!RM) {
        if (!intro1 && t > 0.9) {
          intro1 = true;
          spawn(8, 0, true);
        }
        if (k >= 1 && now - lastA > lp(1100, 420, p)) {
          lastA = now;
          spawn();
        }
      }

      // Draw match arcs
      arcs = arcs.filter((o) => o.k < 110);
      ctx.lineWidth = 1.4;

      for (const o of arcs) {
        o.t = Math.min(1, o.t + o.sp);
        if (o.t >= 1) o.k++;
        const pts: [number, number, number][] = [];
        for (let i = 0; i <= 40; i++) {
          const u = (i / 40) * o.t;
          const s = Math.sin(o.om) || 1;
          const s1 = Math.sin((1 - u) * o.om) / s;
          const s2 = Math.sin(u * o.om) / s;
          const f = 1 + o.lift * Math.sin(Math.PI * u);
          pts.push(
            P3(
              (o.A.X * s1 + o.B.X * s2) * f,
              (o.A.Y * s1 + o.B.Y * s2) * f,
              (o.A.Z * s1 + o.B.Z * s2) * f,
              c0,
              s0,
              cp,
              sp,
              rr
            )
          );
        }

        ctx.strokeStyle = '#fff';
        for (let i = 1; i < pts.length; i++) {
          if (pts[i][2] < 0.02 || pts[i - 1][2] < 0.02) continue;
          ctx.globalAlpha =
            (0.08 + 0.92 * Math.pow(i / 40, 2)) *
            (1 - Math.max(0, o.k - 60) / 50);
          ctx.beginPath();
          ctx.moveTo(pts[i - 1][0], pts[i - 1][1]);
          ctx.lineTo(pts[i][0], pts[i][1]);
          ctx.stroke();
        }

        const h = pts[pts.length - 1];
        if (h[2] > 0.02 && o.t < 1) {
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(h[0], h[1], 2.6, 0, TAU);
          ctx.fill();
        }

        // Landing challenge badge over target city
        if (o.t >= 1 && o.to.z > 0.05) {
          const d = o.to;
          const al = 1 - o.k / 110;
          ctx.globalAlpha = al;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(d.sx, d.sy, 4 + o.k * 0.55, 0, TAU);
          ctx.stroke();
          ctx.font = isAr
            ? '500 11px Cairo, system-ui, sans-serif'
            : '500 11px Inter, system-ui, sans-serif';
          const w = ctx.measureText(o.l).width + 16;
          const bx = cl(d.sx - w / 2, 6, W - w - 6);
          const by = d.sy - 46 - o.k * 0.12;
          ctx.fillStyle = '#000';
          ctx.fillRect(bx, by, w, 22);
          ctx.strokeRect(bx + 0.5, by + 0.5, w, 22);
          ctx.fillStyle = '#fff';
          ctx.fillText(o.l, bx + 8, by + 15);
          ctx.font = isAr
            ? '500 10px Cairo, system-ui, sans-serif'
            : '500 10px Inter, system-ui, sans-serif';
        }
      }

      // Scroll vignette layer for high text readability
      ctx.globalAlpha = sm(p, 0.28, 0.7) * 0.5;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    };

    requestAnimationFrame(frame);

    // Cache DOM references for scroll animations
    const letterNodes = bigWordRef.current
      ? (Array.from(bigWordRef.current.querySelectorAll('i')) as HTMLElement[])
      : [];
    const charNodes = h1Ref.current
      ? (Array.from(h1Ref.current.querySelectorAll('.char-node')) as HTMLElement[])
      : [];

    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        if (!heroRef.current) return;
        const total = heroRef.current.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        p = cl(window.scrollY / total);

        // 1. Scrub big word "PontLook" letters
        if (letterNodes.length > 0) {
          letterNodes.forEach((l, i) => {
            const k = cl(p * 6 - i * 0.15);
            l.style.opacity = `${1 - k}`;
            l.style.transform = `translateY(${-k * 26}px)`;
            l.style.filter = `blur(${k * 10}px)`;
          });
        }

        // 2. Scrub center lead container
        if (leadRef.current) {
          const leadOpacity = cl((p - 0.24) / 0.06);
          leadRef.current.style.opacity = `${leadOpacity}`;
          leadRef.current.style.pointerEvents = p > 0.62 ? 'auto' : 'none';
        }

        // 3. Sequential character / word scrub on headline
        if (charNodes.length > 0) {
          const n = cl((p - 0.3) / 0.3) * charNodes.length;
          charNodes.forEach((c, i) => {
            c.style.opacity = i < n ? '1' : '0.14';
          });
        }

        // 4. Scrub subtext and CTAs
        if (subRef.current) {
          const subProgress = sm(p, 0.62, 0.74);
          subRef.current.style.opacity = `${subProgress}`;
          subRef.current.style.transform = `translateY(${(1 - subProgress) * 24}px)`;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', rs);
      window.removeEventListener('scroll', onScroll);
      cv.removeEventListener('pointerdown', onPointerDown);
      cv.removeEventListener('pointermove', onPointerMove);
      cv.removeEventListener('pointerup', onPointerUp);
      if (observer) observer.disconnect();
    };
  }, [isAr]);

  return (
    <section
      ref={heroRef}
      id="hero"
      data-nav-dark="true"
      className="relative h-[320vh] md:h-[430vh] select-none bg-black touch-pan-y"
    >
      {/* Sticky Pinned 100svh Viewport */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-black touch-pan-y">
        {/* Interactive 3D Earth Globe Canvas */}
        <canvas
          ref={canvasRef}
          id="g"
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing block touch-pan-y"
          aria-label="Interactive Earth. Drag to rotate. Match arcs connect GCC companies with verified corporate training providers."
        />

        {/* Center Scroll-Revealed Headline & CTAs */}
        <div
          ref={leadRef}
          id="lead"
          className="absolute inset-0 grid place-content-center text-center px-[5vw] opacity-0 pointer-events-none z-20"
        >
          <h1
            ref={h1Ref}
            className="font-heading font-light text-[clamp(2.1rem,5.2vw,4.9rem)] leading-[1.06] tracking-tight max-w-[1100px] mx-auto text-white"
            aria-label={
              isAr
                ? 'ابحث عن نخبة مدربي الشركات. دون إهدار وقت، أو عشوائية، أو تخمين.'
                : 'Find Vetted Corporate Trainers. Without the Search, Spam, or Guesswork.'
            }
          >
            {isAr ? (
              <>
                <span className="inline-block">
                  {['ابحث', 'عن', 'نخبة', 'مدربي', 'الشركات.'].map(
                    (word, wIdx) => (
                      <span
                        key={wIdx}
                        className="char-node inline-block px-[0.16em] transition-opacity duration-150"
                        style={{ opacity: 0.14 }}
                      >
                        {word}
                      </span>
                    )
                  )}
                </span>
                <br />
                <span className="inline-block">
                  {['دون', 'إهدار', 'وقت،', 'أو', 'عشوائية،', 'أو', 'تخمين.'].map(
                    (word, wIdx) => (
                      <span
                        key={wIdx}
                        className="char-node inline-block px-[0.16em] transition-opacity duration-150"
                        style={{ opacity: 0.14 }}
                      >
                        {word}
                      </span>
                    )
                  )}
                </span>
              </>
            ) : (
              <>
                <span className="inline-block">
                  {'Find Vetted Corporate Trainers.'.split(' ').map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="inline-block mr-[0.28em] whitespace-nowrap"
                    >
                      {word.split('').map((char, cIdx) => (
                        <span
                          key={cIdx}
                          className="char-node inline-block transition-opacity duration-150"
                          style={{ opacity: 0.14 }}
                        >
                          {char}
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
                <br />
                <span className="inline-block">
                  {'Without the Search, Spam, or Guesswork.'.split(' ').map(
                    (word, wIdx) => (
                      <span
                        key={wIdx}
                        className="inline-block mr-[0.28em] whitespace-nowrap"
                      >
                        {word.split('').map((char, cIdx) => (
                          <span
                            key={cIdx}
                            className="char-node inline-block transition-opacity duration-150"
                            style={{ opacity: 0.14 }}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    )
                  )}
                </span>
              </>
            )}
          </h1>

          <div
            ref={subRef}
            id="sub"
            className="mt-[30px] opacity-0 transition-transform duration-75"
          >
            <p className="max-w-[600px] mx-auto mb-7 text-neutral-300 text-base sm:text-[17px] font-sans leading-relaxed">
              {isAr
                ? 'نربط الشركات في الخليج بنخبة خبراء التدريب المعتمدين والمناسبين لاحتياجات كفاءاتكم، مجاناً 100% للمنشآت.'
                : 'We match GCC companies facing workforce challenges directly with verified training specialists, 100% free for organizations.'}
            </p>
            <div className="flex gap-3 justify-center items-center flex-wrap">
              <Link
                href={`/${lang}/find-training`}
                className="inline-flex items-center justify-center border border-white px-6 py-3 font-sans font-medium text-[15px] bg-white text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                {isAr ? 'ابحث عن شريك تدريب' : 'Find a Training Partner'}
              </Link>
              <Link
                href={`/${lang}/for-providers`}
                className="inline-flex items-center justify-center border border-white px-6 py-3 font-sans font-medium text-[15px] text-white bg-black/40 hover:bg-white hover:text-black transition-colors duration-200 backdrop-blur-sm"
              >
                {isAr ? 'انضم كمزود تدريب' : 'Join as a Training Provider'}
              </Link>
            </div>
          </div>
        </div>

        {/* Lowered Edge-to-Edge "PontLook" Brand Typography at the Bottom Baseline */}
        <div className="absolute inset-x-0 bottom-0 sm:bottom-[0.5vh] px-[1vw] sm:px-[1.5vw] pointer-events-none z-10 overflow-hidden">
          <h1
            ref={bigWordRef}
            id="big"
            className="w-full flex justify-between items-baseline font-heading font-light text-[clamp(4.2rem,22vw,25.5vw)] leading-[0.78] tracking-tight whitespace-nowrap text-[#DCDCDC] select-none"
            aria-label="PontLook"
          >
            {['P', 'o', 'n', 't', 'L', 'o', 'o', 'k'].map((char, idx) => (
              <b
                key={idx}
                className="inline-block animate-[in_1.2s_cubic-bezier(0.2,0.8,0.2,1)_forwards] shrink-0"
                style={{
                  animationDelay: `calc(1.8s + ${idx} * 0.08s)`,
                }}
              >
                <i className="inline-block not-italic will-change-transform">
                  {char}
                </i>
              </b>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
