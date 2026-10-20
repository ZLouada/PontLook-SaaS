'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface ProviderConnectionFlowProps {
  lang: string;
}

export default function ProviderConnectionFlow({ lang }: ProviderConnectionFlowProps) {
  const isAr = lang === 'ar';

  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const s = sectionRef.current;
    const wrap = wrapRef.current;
    const colsEl = colsRef.current;
    const eyeEl = eyeRef.current;
    const h2El = headingRef.current;
    const ctaEl = ctaRef.current;

    if (!s || !wrap || !colsEl) return;

    const cols = Array.from(colsEl.children) as HTMLElement[];
    const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const TAU = Math.PI * 2;

    let W = 0;
    let H = 0;
    let Y = 0;
    let XS: number[] = [];
    let vis = false;
    let go = false;
    let t0 = 0;
    let E: {
      tg?: SVGPathElement | null;
      ln?: SVGPathElement[];
      d?: SVGElement[];
      q?: SVGPathElement[];
      l?: SVGTextElement[];
      sf?: SVGCircleElement[];
      sig?: SVGCircleElement | null;
      halo?: SVGCircleElement | null;
      rp?: SVGCircleElement | null;
    } = {};

    const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ar = (cx: number, cy: number, r: number, a0: number, a1: number) => {
      const p = (a: number) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      const [x0, y0] = p(a0);
      const [x1, y1] = p(a1);
      return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    };

    function build() {
      if (!wrap || getComputedStyle(wrap).display === 'none') return;
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      if (W === 0 || H === 0) return;

      Y = H * 0.78;
      XS = cols.map((c) => c.offsetLeft + 7);

      const a = XS[0];
      const b = XS[2];
      let d = `M${a} ${Y}`;
      for (let i = 0; i <= 440; i++) {
        const t = i / 440;
        const e = Math.sin(Math.PI * t);
        const cx = a + (b - a) * t;
        const cy = Y - H * 0.12 - H * 0.26 * (0.25 + 0.75 * e);
        const r = H * 0.17 * (0.35 + 0.65 * e);
        const g = t * TAU * 8.5 + Math.sin(t * 9) * 0.8;
        d += `L${(cx + r * 1.7 * Math.cos(g)).toFixed(1)} ${(cy + r * Math.sin(g * 1.07 + 0.6)).toFixed(1)}`;
      }

      const R = 30;
      const Q = [-135, -45, 45, 135].map((x) => (x * Math.PI) / 180);
      const L = 'BANT';

      wrap.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        <path class="tg" d="${d}"/>
        <path class="ln" d="M0 ${Y}L${W} ${Y}"/>
        <path class="ln th" d="M${XS[2]} ${Y}L${W} ${Y}"/>
        <g class="mk">
          ${XS.map(
            (x, i) =>
              `<circle class="sf" data-f="${i}" cx="${x}" cy="${Y}" r="${
                i === 1 ? 66 : i === 3 ? 24 : 20
              }"/>`
          ).join('')}
          <circle data-d="0" cx="${XS[0]}" cy="${Y}" r="7" fill="#F3EFE6"/>
          ${Q.map(
            (q, k) =>
              `<path class="arc" data-q="${k}" d="${ar(
                XS[1],
                Y,
                R,
                q - 0.6,
                q + 0.6
              )}"/><text class="ltr" data-l="${k}" x="${
                XS[1] + Math.cos(q) * 50
              }" y="${Y + Math.sin(q) * 50}">${L[k]}</text>`
          ).join('')}
          <circle data-d="1" cx="${XS[1]}" cy="${Y}" r="6" fill="#F3EFE6"/>
          <path data-d="2" d="M${XS[2]} ${Y - 20}L${XS[2]} ${Y + 20}" stroke="#F3EFE6" stroke-width="4"/>
          <circle data-d="3" cx="${XS[3]}" cy="${Y}" r="11" fill="#F3EFE6"/>
          <circle class="rp" cx="${XS[3]}" cy="${Y}" r="11" fill="none" stroke="#FF5A00" stroke-width="2" opacity="0"/>
          <circle class="halo" r="16" cy="${Y}" cx="${XS[0]}" fill="#FF5A00" opacity="0"/>
          <circle class="sig" r="6" cy="${Y}" cx="${XS[0]}" fill="#FF5A00" opacity="0"/>
        </g>
      </svg>`;

      const sv = wrap.firstElementChild as SVGSVGElement | null;
      if (!sv) return;

      E = {
        tg: sv.querySelector<SVGPathElement>('.tg'),
        ln: Array.from(sv.querySelectorAll<SVGPathElement>('.ln')),
        d: Array.from(sv.querySelectorAll<SVGElement>('[data-d]')),
        q: Array.from(sv.querySelectorAll<SVGPathElement>('[data-q]')),
        l: Array.from(sv.querySelectorAll<SVGTextElement>('[data-l]')),
        sf: Array.from(sv.querySelectorAll<SVGCircleElement>('.sf')),
        sig: sv.querySelector<SVGCircleElement>('.sig'),
        halo: sv.querySelector<SVGCircleElement>('.halo'),
        rp: sv.querySelector<SVGCircleElement>('.rp'),
      };

      if (!E.tg || !E.ln || E.ln.length < 2) return;

      const tl = E.tg.getTotalLength();
      const ll = E.ln[0].getTotalLength();
      E.tg.style.strokeDasharray = `${tl}`;
      E.ln[0].style.strokeDasharray = `${ll}`;
      E.ln[1].style.opacity = '0';

      const st = (el: SVGPathElement, len: number, dur: number, del: number) => {
        el.style.strokeDashoffset = go ? '0' : `${len}`;
        el.style.transition = go
          ? 'none'
          : `stroke-dashoffset ${dur}s cubic-bezier(.4,0,.2,1) ${del}s`;
      };

      st(E.tg, tl, 3.2, 0);
      st(E.ln[0], ll, 1.8, 2.6);

      sv.addEventListener('click', replay);
      if (go) {
        sv.classList.add('go');
        E.ln[1].style.opacity = '1';
      }
    }

    function start() {
      go = true;
      t0 = performance.now() + (RM ? 0 : 4800);
      if (!wrap || !wrap.firstElementChild) return;
      const sv = wrap.firstElementChild as SVGSVGElement;
      sv.classList.add('go');
      if (E.tg) E.tg.style.strokeDashoffset = '0';
      if (E.ln && E.ln[0]) E.ln[0].style.strokeDashoffset = '0';
      setTimeout(() => {
        if (E.ln && E.ln[1]) {
          E.ln[1].style.transition = 'opacity .6s';
          E.ln[1].style.opacity = '1';
        }
      }, 3800);
    }

    function replay() {
      go = false;
      build();
      requestAnimationFrame(() => requestAnimationFrame(start));
    }

    const SIG = 7000;
    const HOLD = 1800;

    function paint(now: number) {
      if (!E.sig || !E.halo || !E.d || !E.q || !E.l || !E.rp || XS.length < 4) return;
      const T = now - t0;
      const x0 = XS[0];
      const x3 = XS[3];
      const span = x3 - x0;
      let p = cl((T % (SIG + HOLD)) / SIG);
      if (RM) p = 1;
      const x = x0 + span * p;
      const live = RM || T >= 0;

      E.sig.setAttribute('cx', `${x}`);
      E.halo.setAttribute('cx', `${x}`);
      const o = live ? 1 : 0;
      E.sig.setAttribute('opacity', `${o}`);
      E.halo.setAttribute('opacity', `${o * 0.2}`);

      E.d.forEach((el, i) => {
        const age = span !== 0 ? ((x - XS[i]) / span) * SIG : 0;
        const lit = live && age >= 0 ? cl(1 - age / 1100) : 0;
        const base = [7, 6, 0, 11][i];
        if (base) el.setAttribute('r', `${base * (1 + 0.55 * lit)}`);
        el.setAttribute(i === 2 ? 'stroke' : 'fill', lit > 0.02 ? '#FF5A00' : '#F3EFE6');
      });

      E.q.forEach((el, k) => {
        const on =
          span > 0
            ? live && x > XS[1] - 30 + k * 20
            : live && x < XS[1] + 30 - k * 20;
        el.style.stroke = on ? '#FF5A00' : '#F3EFE6';
        if (E.l && E.l[k]) {
          E.l[k].style.fill = on ? '#F3EFE6' : '#9B968B';
        }
      });

      const rt = live ? ((T % (SIG + HOLD)) - SIG) / 1200 : -1;
      if (rt >= 0 && rt < 1 && !RM) {
        E.rp.setAttribute('r', `${11 + rt * 38}`);
        E.rp.setAttribute('opacity', `${1 - rt}`);
      } else {
        E.rp.setAttribute('opacity', '0');
      }
    }

    let animId: number;
    function tick(now: number) {
      animId = requestAnimationFrame(tick);
      if (!vis || !go || !E.sig) return;
      paint(now);
    }

    // Interactive focal circle highlighting when hovering columns
    const cleanups: (() => void)[] = [];
    cols.forEach((c, i) => {
      const on = () => {
        if (E.sf) {
          E.sf.forEach((f, k) => {
            f.style.opacity = k === i ? '1' : '0';
          });
        }
      };
      const off = () => {
        if (E.sf) {
          E.sf.forEach((f) => {
            f.style.opacity = '0';
          });
        }
      };
      c.addEventListener('mouseenter', on);
      c.addEventListener('mouseleave', off);
      c.addEventListener('focus', on);
      c.addEventListener('blur', off);

      cleanups.push(() => {
        c.removeEventListener('mouseenter', on);
        c.removeEventListener('mouseleave', off);
        c.removeEventListener('focus', on);
        c.removeEventListener('blur', off);
      });
    });

    build();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    };
    window.addEventListener('resize', handleResize);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(build);
    }

    // Scroll reveal observer
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            if (en.target === colsEl) {
              if (!go) start();
              obs.unobserve(en.target);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    [eyeEl, h2El, colsEl, ctaEl].forEach((el) => {
      if (el) io.observe(el);
    });

    const visibilityObserver = new IntersectionObserver((entries) => {
      vis = entries[0].isIntersecting;
    });
    visibilityObserver.observe(s);

    if (RM) {
      go = true;
      vis = true;
    }

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      io.disconnect();
      visibilityObserver.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [isAr]);

  const columns = [
    {
      n: '01',
      meta: isAr ? 'مزود التدريب' : 'Training Firm',
      title: isAr ? 'مركزك التدريبي' : 'Your Training Firm',
      desc: isAr ? 'خبرات تدريبية متخصصة لدول الخليج' : 'Specialized GCC Expertise',
      foot: isAr ? 'جاهزية التنفيذ' : 'Delivery Ready',
    },
    {
      n: '02',
      meta: isAr ? 'محرك الربط' : 'Connection Engine',
      title: isAr ? 'منصة بونت لوك' : 'PontLook Platform',
      desc: isAr ? 'تدقيق ومطابقة معتمدة BANT' : 'Verified BANT Audit & Match',
      foot: isAr ? 'صفر اشتراكات · ضمان 100%' : 'Zero Retainer · 100% SLA',
    },
    {
      n: '03',
      meta: isAr ? 'قناة التعاقد' : 'Direct Pipeline',
      title: isAr ? 'تعاقد مباشر' : 'Direct Engagement',
      desc: isAr ? 'بدون وساطة أو مناقصات باردة' : 'Zero Cold Bidding Cycles',
      foot: isAr ? 'كراسة شروط معتمدة' : 'Pre-Scoped Mandates',
    },
    {
      n: '04',
      meta: isAr ? 'المنشأة المتعاقدة' : 'Corporate Buyer',
      title: isAr ? 'عملاء مؤسسيون' : 'Enterprise Client',
      desc: isAr ? 'ميزانية معتمدة 120 إلى 250+ ألف ر.س' : 'SAR 120k to 250k+ Budget',
      foot: isAr ? 'الرياض · دبي · الدوحة' : 'Riyadh · Dubai · Doha',
    },
  ];

  return (
    <section
      id="connection-bridge"
      ref={sectionRef}
      className="dcd js scroll-mt-16 select-none"
      aria-labelledby="dcd-h"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="dcd-in">
        {/* Eyebrow & Main Title */}
        <p className="dcd-eye" ref={eyeRef}>
          {isAr ? 'نموذج الربط المباشر' : 'Direct Connection Architecture'}
        </p>
        <h2 id="dcd-h" ref={headingRef}>
          {isAr ? (
            <>
              ربط الخبرات التدريبية <em>بالطلب المؤسسي المؤكد</em>
            </>
          ) : (
            <>
              Connecting Training Expertise with <em>Confirmed Demand</em>
            </>
          )}
        </h2>

        {/* Generative Interactive SVG Diagram Canvas */}
        <div className="dcd-line" aria-hidden="true" ref={wrapRef} />

        {/* 4 Feature Columns Grid / Mobile Vertical Timeline */}
        <div className="dcd-cols" ref={colsRef}>
          {columns.map((col, idx) => (
            <article
              key={col.n}
              ref={(el) => {
                colRefs.current[idx] = el;
              }}
              className="col"
              style={{ '--i': idx } as React.CSSProperties}
              tabIndex={0}
            >
              <div className="meta">
                <i>{col.n}</i>
                <span>{col.meta}</span>
              </div>
              <h3>{col.title}</h3>
              <p>{col.desc}</p>
              <b>{col.foot}</b>
            </article>
          ))}
        </div>

        {/* Editorial Direct Action Conversion CTA */}
        <div className="dcd-cta" id="apply" ref={ctaRef}>
          <h3>
            {isAr
              ? 'جاهز لملء جدول تدريبك بطلبات مؤكدة؟'
              : 'Ready to fill your delivery schedule with qualified clients?'}
          </h3>
          <div>
            <p>
              {isAr
                ? 'أكمل نموذج التأهيل المبدئي خلال 4 دقائق وسيتواصل معك فريق الشراكات لتفعيل ملفك خلال 48 ساعة.'
                : 'Complete our 4-minute qualification form. Our team will activate your profile within 48 hours.'}
            </p>
            <div className="acts">
              <Link href={`/${lang}/for-providers/apply`} className="pri">
                <span>{isAr ? 'تقديم طلب الانضمام كشريك معتمد' : 'Apply as Verified Provider'}</span>
                <span aria-hidden="true" className={isAr ? 'inline-block -scale-x-100' : ''}>
                  →
                </span>
              </Link>
              <a href="#story" className="sec">
                {isAr ? 'مزايا ونموذج الشراكة' : 'Partnership Model & SLAs'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
