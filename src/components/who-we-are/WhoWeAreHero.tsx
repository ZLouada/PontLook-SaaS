'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUp, ArrowRight, ArrowDown, Sparkles, CheckCircle2, ChevronRight, Users, Award } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/shared/Reveal';

interface WhoWeAreHeroProps {
  lang?: 'en' | 'ar';
}

interface Scenario {
  id: string;
  queryEn: string;
  queryAr: string;
  headerEn: string;
  headerAr: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  snippetEn: string;
  snippetAr: string;
  actionEn: string;
  actionAr: string;
  budgetEn: string;
  budgetAr: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'leadership',
    queryEn: 'Find accredited executive leadership training in Riyadh...',
    queryAr: 'ابحث عن تدريب قيادة تنفيذية معتمد في الرياض...',
    headerEn: 'Based on verified enterprise challenge in Riyadh, matched with 2 accredited providers:',
    headerAr: 'بناءً على احتياج مؤسسي مؤكد في الرياض، تم التوفيق مع مزودين معتمدين:',
    badgeEn: 'Enterprise Brief • Verified',
    badgeAr: 'كراسة معتمدة • تم التحقق',
    titleEn: 'RE: Executive Leadership & Strategic Governance',
    titleAr: 'بخصوص: ورشة عمل القيادة التنفيذية والحوكمة الاستراتيجية',
    snippetEn: 'Pre-scoped for 45 C-suite & VP directors. Objective: Leading through organizational scale & AI transformation.',
    snippetAr: 'تم تشخيص النطاق لـ 45 قيادياً تنفيذياً. الهدف: القيادة خلال التوسع المؤسسي والتحول الرقمي.',
    actionEn: '↳ 2 Vetted proposals ready for HR evaluation',
    actionAr: '↳ تم تجهيز عرضين تدريبيين مفحوصين لمراجعة الموارد البشرية',
    budgetEn: 'SAR 180,000 Budget Confirmed',
    budgetAr: 'الميزانية معتمدة: 180,000 ر.س',
  },
  {
    id: 'cyber',
    queryEn: 'Cybersecurity compliance certification for 180 employees...',
    queryAr: 'شهادة الامتثال للأمن السيبراني لـ 180 موظفاً...',
    headerEn: 'Based on your regulatory requirements in GCC, matched with top specialized firm:',
    headerAr: 'بناءً على المتطلبات التنظيمية في الخليج، تم التوفيق مع مزود متخصص معتمد:',
    badgeEn: 'Financial Sector RFP',
    badgeAr: 'كراسة القطاع المالي',
    titleEn: 'RE: ISO 27001 & Cyber Risk Defense Simulation',
    titleAr: 'بخصوص: محاكاة الدفاع السيبراني والامتثال لمعايير ISO 27001',
    snippetEn: 'Hands-on live cyber range drills. Zero theoretical slides; 100% applied defensive scenarios for banking staff.',
    snippetAr: 'تدريب عملي ومحاكاة هجمات حية. صفر شرائح نظرية؛ تطبيق عملي بنسبة 100% لموظفي البنوك.',
    actionEn: '↳ Facilitator profile & curriculum pre-screened',
    actionAr: '↳ تم فحص واعتماد السيرة الذاتية للمدرب والمنهج مسبقاً',
    budgetEn: 'SAR 240,000 Approved Scope',
    budgetAr: 'نطاق معتمد: 240,000 ر.س',
  },
  {
    id: 'sales',
    queryEn: 'Enterprise B2B negotiation coaching for enterprise sales reps...',
    queryAr: 'تدريب تفاوض مبيعات الشركات B2B لفريق المبيعات...',
    headerEn: 'Based on high-value B2B enterprise pipeline goals, matched with elite sales coach:',
    headerAr: 'بناءً على أهداف إغلاق الصفقات الكبرى، تم التوفيق مع مدرب مبيعات مؤسسية رائد:',
    badgeEn: 'Revenue Accelerator Brief',
    badgeAr: 'كراسة تنمية الإيرادات',
    titleEn: 'RE: High-Stakes Deal Negotiation & Closing Academy',
    titleAr: 'بخصوص: أكاديمية التفاوض المتقدم وإغلاق الصفقات الكبرى',
    snippetEn: 'Live deal roleplay with real enterprise procurement scenarios. Target: Increase win rates from 22% to 38%.',
    snippetAr: 'محاكاة تفاوض حية مع سيناريوهات مشتريات حقيقية. الهدف: رفع معدل إغلاق الصفقات من 22% إلى 38%.',
    actionEn: '↳ Tailored engagement brief ready for kick-off',
    actionAr: '↳ كراسة مخصصة جاهزة لانطلاق التدريب فوراً',
    budgetEn: 'SAR 150,000 Budget Confirmed',
    budgetAr: 'الميزانية معتمدة: 150,000 ر.س',
  },
];

export default function WhoWeAreHero({ lang = 'en' }: WhoWeAreHeroProps) {
  const isAr = lang === 'ar';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const activeScenario = SCENARIOS[activeScenarioIdx];

  // Smooth Attio-style interactive vertical lines canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -9999;
    let mouseY = -9999;
    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }
    window.addEventListener('resize', updateDimensions);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const spacing = width < 640 ? 18 : 24; // Distance between vertical lines
      const baseY = 2; // Baseline top Y coordinate
      const totalLines = Math.ceil(width / spacing) + 1;
      const startX = (width % spacing) / 2;

      // Draw top baseline rule
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, baseY);
      ctx.lineTo(width, baseY);
      ctx.stroke();

      // Draw vertical lines and top tick dots
      for (let i = 0; i <= totalLines; i++) {
        const x = startX + i * spacing;
        if (x < 0 || x > width) continue;

        // Proximity to mouse cursor
        const distToMouse = Math.abs(x - mouseX);
        const maxDist = 140;
        const proximity = Math.max(0, 1 - distToMouse / maxDist);

        // Calculate gradient for line
        const grad = ctx.createLinearGradient(x, baseY, x, height);
        
        if (proximity > 0) {
          // Highlighted line near mouse cursor
          const baseAlpha = 0.08 + proximity * 0.28;
          grad.addColorStop(0, `rgba(96, 165, 250, ${baseAlpha})`);
          grad.addColorStop(0.35, `rgba(96, 165, 250, ${baseAlpha * 0.7})`);
          grad.addColorStop(0.75, `rgba(255, 255, 255, ${baseAlpha * 0.25})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1 + proximity * 0.5;
          ctx.moveTo(x, baseY);
          ctx.lineTo(x, height);
          ctx.stroke();

          // Highlighted top dot
          ctx.beginPath();
          ctx.arc(x, baseY, 2 + proximity * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${0.4 + proximity * 0.6})`;
          ctx.fill();
        } else {
          // Normal elegant subdued line
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
          grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.04)');
          grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.015)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.moveTo(x, baseY);
          ctx.lineTo(x, height);
          ctx.stroke();

          // Normal subtle top dot
          ctx.beginPath();
          ctx.arc(x, baseY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
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
      className="bg-[#08090A] text-white min-h-[100dvh] flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-6 sm:pb-10 relative overflow-hidden select-none"
    >
      {/* Ambient Depth Glows */}
      <div className="pointer-events-none absolute top-10 start-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-blue-600/[0.04] blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute top-4 start-1/4 w-[500px] h-[350px] bg-blue-500/[0.03] blur-3xl -z-10 rounded-full" />

      {/* TOP CONTENT (First Content) */}
      <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-6 mb-6 sm:mb-8">
        <Reveal className="flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold text-white leading-[1.12] sm:leading-[1.1] font-heading tracking-tight">
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

      {/* ATTIO-STYLE VERTICAL LINES CURTAIN SECTION (UNDER THE FIRST CONTENT) */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center min-h-[360px] sm:min-h-[420px] max-w-7xl mx-auto px-4 sm:px-6">
        {/* Background Canvas with Attio Pinstripe Grid & Dots */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-auto [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] overflow-hidden"
          aria-hidden="true"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* FLOATING INTERACTIVE ATTIO-STYLE CARD */}
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
          {/* Main Container matching Attio's ask container */}
          <div className="w-full rounded-2xl bg-[#0F1013]/90 backdrop-blur-xl border border-[#26282D] shadow-2xl p-3 sm:p-5 transition-all">
            {/* Search / Query Input Bar */}
            <div className="relative flex items-center justify-between gap-3 rounded-xl bg-[#17181D] border border-[#2B2D33] px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-inner">
              <span className="text-xs sm:text-sm text-neutral-400 truncate select-none font-normal">
                {isAr ? activeScenario.queryAr : activeScenario.queryEn}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  aria-label={isAr ? 'إرسال' : 'Submit query'}
                  className="size-7 sm:size-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-600/20 transition-transform active:scale-95"
                >
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>

            {/* Response Section */}
            <div className="mt-4 px-1">
              <p className="text-xs sm:text-[13px] text-neutral-400 font-medium leading-relaxed">
                {isAr ? activeScenario.headerAr : activeScenario.headerEn}
              </p>

              {/* Nested Result Brief Card (Attio Email / Artifact Card) */}
              <AnimatePresence mode="wait">
                <m.div
                  key={activeScenario.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="mt-3 rounded-xl bg-[#141519] border border-[#26282D] hover:border-neutral-700 p-3.5 sm:p-4 shadow-lg transition-colors"
                >
                  {/* Top Bar: Badge + Stacked Avatars */}
                  <div className="flex items-center justify-between gap-2 border-b border-[#212328] pb-2.5 mb-2.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-300 uppercase tracking-wider">
                      <CheckCircle2 size={12} className="text-blue-400" />
                      {isAr ? activeScenario.badgeAr : activeScenario.badgeEn}
                    </span>

                    <div className="flex items-center -space-x-1.5 rtl:space-x-reverse">
                      <div className="w-5 h-5 rounded-full bg-blue-600 border border-[#141519] flex items-center justify-center text-[9px] font-bold text-white">
                        P1
                      </div>
                      <div className="w-5 h-5 rounded-full bg-emerald-600 border border-[#141519] flex items-center justify-center text-[9px] font-bold text-white">
                        P2
                      </div>
                      <span className="text-[10px] font-medium text-neutral-400 ps-2">
                        {isAr ? '2 معتمدين' : '2 Vetted'}
                      </span>
                    </div>
                  </div>

                  {/* Title & Snippet */}
                  <h2 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                    {isAr ? activeScenario.titleAr : activeScenario.titleEn}
                  </h2>
                  <p className="mt-1 text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-normal">
                    {isAr ? activeScenario.snippetAr : activeScenario.snippetEn}
                  </p>

                  {/* Footer metadata & Action */}
                  <div className="mt-3 pt-2.5 border-t border-[#212328] flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                      {isAr ? activeScenario.actionAr : activeScenario.actionEn}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] border border-[#26282D] text-neutral-300">
                      {isAr ? activeScenario.budgetAr : activeScenario.budgetEn}
                    </span>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>

            {/* Quick Scenario Switcher Chips */}
            <div className="mt-3.5 pt-3 border-t border-[#212328] flex items-center justify-center gap-2 flex-wrap">
              {SCENARIOS.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioIdx(idx)}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                    activeScenarioIdx === idx
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 font-semibold'
                      : 'bg-white/[0.02] border-[#26282D] text-neutral-400 hover:text-neutral-200 hover:border-neutral-600'
                  }`}
                >
                  {idx === 0
                    ? isAr
                      ? 'القيادة التنفيذية'
                      : 'Executive Leadership'
                    : idx === 1
                    ? isAr
                      ? 'الأمن السيبراني'
                      : 'Cybersecurity'
                    : isAr
                    ? 'المبيعات المؤسسية'
                    : 'B2B Sales'}
                </button>
              ))}
            </div>
          </div>

          {/* BOTTOM FLOATING PILL (Matching Attio's Bottom Question Pill) */}
          <button
            onClick={scrollToMission}
            className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#16171B]/90 hover:bg-[#1C1D23] border border-[#2B2D33] hover:border-neutral-600 text-xs sm:text-sm text-neutral-300 hover:text-white shadow-xl backdrop-blur-md transition-all active:scale-95 group"
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
