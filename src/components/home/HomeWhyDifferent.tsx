'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';

interface HomeWhyDifferentProps {
  isAr?: boolean;
  lang: string;
  dict?: any;
}

interface SpecItem {
  code: string;
  badge: string;
  title: string;
  angle: string;
  desc: string;
  protocol: string;
  href: string;
  cta: string;
}

export default function HomeWhyDifferent({
  isAr = false,
  lang,
  dict,
}: HomeWhyDifferentProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const c = dict?.why_different?.cards;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const specsEn: SpecItem[] = [
    {
      code: 'SPEC // 01',
      badge: 'DIAGNOSE',
      title: c?.diagnose?.title || 'Pinpoint Your Exact Skill Gaps',
      angle: 'Root Cause Skill Diagnosis',
      desc:
        c?.diagnose?.text ||
        'Unsure whether you need management training, technical upskilling, or cultural alignment? We help you diagnose the root cause before spending budget.',
      protocol: 'PROTOCOL · DIAGNOSTIC',
      href: `/${lang}/resources`,
      cta: c?.diagnose?.cta || 'Read diagnosis guides',
    },
    {
      code: 'SPEC // 02',
      badge: 'VETTED',
      title: c?.match?.title || '100% Verified Regional Providers',
      angle: 'Proof of Track Record Over Pitches',
      desc:
        c?.match?.text ||
        'No marketing fluff. Every training partner is rigorously screened for proven track record, enterprise references, and cultural alignment.',
      protocol: 'PROTOCOL · ACCREDITED',
      href: `/${lang}/find-training`,
      cta: c?.match?.cta || 'See vetting standards',
    },
    {
      code: 'SPEC // 03',
      badge: 'DIRECT ACCESS',
      title: c?.access?.title || 'Direct Access to Budget Owners',
      angle: 'Skip Gatekeepers. Direct Connection.',
      desc:
        c?.access?.text ||
        'Training providers connect directly with CHROs and L&D leaders who have active, funded requirements—not gatekeepers or interns.',
      protocol: 'PROTOCOL · EXECUTIVE',
      href: `/${lang}/for-providers`,
      cta: c?.access?.cta || 'Join as a provider',
    },
    {
      code: 'SPEC // 04',
      badge: 'OPPORTUNITIES',
      title: c?.ready?.title || 'Pre-Scoped, Funded Engagements',
      angle: 'Real Client Needs, Not Cold Leads',
      desc:
        c?.ready?.text ||
        'Every corporate request is verified for budget, timeline, and decision-maker buy-in before reaching a training partner.',
      protocol: 'PROTOCOL · FUNDED',
      href: `/${lang}/for-providers`,
      cta: c?.ready?.cta || 'View active demand',
    },
    {
      code: 'SPEC // 05',
      badge: 'FREE TOOLKITS',
      title: c?.hub?.title || 'Free Regional L&D Toolkits',
      angle: 'Free Frameworks & Benchmarks',
      desc:
        c?.hub?.text ||
        'Practical guides, Saudization/Emiratization workforce benchmarks, and corporate training ROI templates—completely free on our blog.',
      protocol: 'PROTOCOL · OPEN ACCESS',
      href: `/${lang}/resources`,
      cta: c?.hub?.cta || 'Browse free resources',
    },
  ];

  const specsAr: SpecItem[] = [
    {
      code: 'مواصفة // 01',
      badge: 'تشخيص',
      title: c?.diagnose?.title || 'شخّص فجواتك المهارية بدقة',
      angle: 'تشخيص السبب الجذري قبل إنفاق الميزانية',
      desc:
        c?.diagnose?.text ||
        'متردد بين التدريب الإداري، أو التقني، أو تطوير ثقافة العمل؟ نساعدك على تشخيص السبب الجذري قبل إنفاق الميزانية.',
      protocol: 'بروتوكول · تشخيصي',
      href: `/${lang}/resources`,
      cta: c?.diagnose?.cta || 'اقرأ أدلة التشخيص المهاري',
    },
    {
      code: 'مواصفة // 02',
      badge: 'معتمد وموثق',
      title: c?.match?.title || 'مزودو تدريب معتمدون خليجياً 100%',
      angle: 'فحص السجل والاعتمادات الرسمية',
      desc:
        c?.match?.text ||
        'لا نعتمد على العروض التسويقية البراقة. كل مزود تدريب يتم فحص سجل إنجازاته، واعتماداته الرسمية، وملاءمته لبيئة العمل الخليجية.',
      protocol: 'بروتوكول · معتمد',
      href: `/${lang}/find-training`,
      cta: c?.match?.cta || 'استكشف معايير الاعتماد',
    },
    {
      code: 'مواصفة // 03',
      badge: 'وصول مباشر',
      title: c?.access?.title || 'وصول مباشر لأصحاب الميزانيات',
      angle: 'تجاوز الوسطاء. تواصل مباشر مع صناع القرار',
      desc:
        c?.access?.text ||
        'يتواصل مزودو التدريب مباشرة مع رؤساء قطاع الموارد البشرية والتدريب أصحاب الميزانيات المعتمدة، وليس مع وسطاء.',
      protocol: 'بروتوكول · تنفيذي',
      href: `/${lang}/for-providers`,
      cta: c?.access?.cta || 'انضم كمزود تدريب',
    },
    {
      code: 'مواصفة // 04',
      badge: 'فرص مؤكدة',
      title: c?.ready?.title || 'فرص محددة النطاق وبميزانيات مؤكدة',
      angle: 'احتياجات عملاء حقيقية وليست بيانات تسويقية',
      desc:
        c?.ready?.text ||
        'يتم التحقق من ميزانية وجدية كل طلب مؤسسي وموافقة صاحب القرار قبل ربطه بأي شريك تدريبي.',
      protocol: 'بروتوكول · مؤكد',
      href: `/${lang}/for-providers`,
      cta: c?.ready?.cta || 'استعرض الفرص النشطة',
    },
    {
      code: 'مواصفة // 05',
      badge: 'أدلة مجانية',
      title: c?.hub?.title || 'حقائب وأدلة تطويرية مجانية',
      angle: 'أدلة مجانية ودراسات سوقية موثوقة',
      desc:
        c?.hub?.text ||
        'أدلة عملية، ومؤشرات فجوات التوطين الخليجية، ونماذج قياس عائد الاستثمار على التدريب — مجاناً بالكامل على مدونتنا.',
      protocol: 'بروتوكول · وصول مفتوح',
      href: `/${lang}/resources`,
      cta: c?.hub?.cta || 'تصفح الأدلة والموارد المجانية',
    },
  ];

  const specs = isAr ? specsAr : specsEn;

  // X target coordinates for exactly 5 cards in a 1000-width SVG viewbox
  // 5 cards: 100, 300, 500, 700, 900 (or reversed in RTL)
  const ax = isAr ? [900, 700, 500, 300, 100] : [100, 300, 500, 700, 900];

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/20 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto w-full"
    >
      {/* Upper Context Header */}
      <div className="mb-12 sm:mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
          {dict?.why_different?.eyebrow ||
            (isAr ? 'حلول عملية مباشرة · هندسة القيمة المتوازنة' : 'PROBLEM SOLVED · BILATERAL VALUE ARCHITECTURE')}
        </div>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white max-w-4xl mb-4 sm:mb-6">
          {dict?.why_different?.title ||
            (isAr
              ? 'حدد فجواتك بدقة. ارتبط بنخبة الخبراء المعتمدين. بدون أي تعقيدات مشتريات.'
              : 'Pinpoint your gaps. Connect with vetted experts. Zero procurement friction.')}
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
          {dict?.why_different?.subtitle ||
            (isAr
              ? 'نحلل تحديات بيئة العمل الخليجية لنقدم أدلة مجانية وعملية لحل المشكلات على مدونتنا، ونربط قادة الشركات مباشرة بمزودي التدريب المعتمدين والمستعدين لتنفيذ الحل.'
              : 'We analyze real GCC workplace challenges to deliver free, actionable problem-solving guides on our blog, and directly connect corporate leaders with the verified training providers ready to implement the solution.')}
        </p>
      </div>

      {/* Suspension Cables SVG: 5 cables radiating to 5 cards */}
      <div className="hidden lg:block w-full overflow-hidden select-none mb-[-1px]">
        <svg
          viewBox="0 0 1000 160"
          className="w-full h-auto block"
          aria-hidden="true"
        >
          {/* Main Central Tower Pylon Line */}
          <line
            x1="500"
            y1="0"
            x2="500"
            y2="160"
            stroke="currentColor"
            className="text-white"
            strokeWidth="3"
          />

          {/* Radiating Suspension Cables (1 cable for each of the 5 cards) */}
          {ax.map((a, i) => {
            const isHovered = hoveredCard === i;

            return (
              <path
                key={i}
                d={`M500 4 L${a} 158`}
                fill="none"
                stroke="currentColor"
                strokeWidth={isHovered ? 4.5 : 1.5}
                strokeDasharray={600}
                strokeDashoffset={isVisible ? 0 : 600}
                className={`text-white transition-all duration-300 ease-out ${
                  isHovered ? 'opacity-100' : 'opacity-60'
                }`}
                style={{
                  transitionDelay: `${i * 0.08}s`,
                  transitionProperty: 'stroke-dashoffset, stroke-width, opacity',
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* 5 Specification Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-[1.5px] border-white/20 bg-black">
        {specs.map((item, index) => {
          const isHovered = hoveredCard === index;

          return (
            <article
              key={index}
              tabIndex={0}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onFocus={() => setHoveredCard(index)}
              onBlur={() => setHoveredCard(null)}
              className={`p-6 sm:p-7 min-h-[340px] flex flex-col justify-between cursor-pointer border-b sm:border-b-0 border-white/20 lg:border-b-0 ${
                index < 4 ? 'lg:border-e-[1.5px] lg:border-white/20' : ''
              } ${index % 2 === 0 ? 'sm:border-e-[1.5px] sm:border-white/20' : ''} ${
                index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              } transition-colors duration-200 outline-none focus-visible:outline-[2px] focus-visible:outline-white ${
                isHovered ? 'bg-white text-black' : 'bg-black text-white'
              }`}
            >
              <div>
                <small
                  className={`block font-mono text-xs uppercase tracking-wider font-semibold mb-6 sm:mb-8 ${
                    isHovered ? 'text-neutral-600' : 'text-neutral-400'
                  }`}
                >
                  {item.code} · {item.badge}
                </small>
                <h3
                  className={`font-heading font-semibold text-xl xl:text-2xl tracking-tight leading-snug mb-2 ${
                    isHovered ? 'text-black' : 'text-white'
                  }`}
                >
                  {item.title}
                </h3>
                {item.angle && (
                  <div
                    className={`font-mono text-[11px] uppercase tracking-wider font-medium mb-3 ${
                      isHovered ? 'text-neutral-600' : 'text-neutral-400'
                    }`}
                  >
                    {item.angle}
                  </div>
                )}
                <p
                  className={`text-sm leading-relaxed ${
                    isHovered ? 'text-neutral-700' : 'text-neutral-300'
                  }`}
                >
                  {item.desc}
                </p>
              </div>

              <div className="pt-6">
                <em
                  className={`block not-italic font-mono text-[11px] uppercase tracking-[0.12em] font-semibold pt-4 border-t ${
                    isHovered
                      ? 'border-black/20 text-neutral-600'
                      : 'border-white/20 text-neutral-400'
                  }`}
                >
                  {item.protocol}
                </em>
                <Link
                  href={item.href}
                  className={`mt-4 inline-flex items-center gap-1.5 font-sans text-xs font-semibold tracking-wide transition-colors ${
                    isHovered ? 'text-black hover:underline' : 'text-white hover:text-neutral-300'
                  }`}
                >
                  <span>{item.cta}</span>
                  <ArrowRight size={13} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
