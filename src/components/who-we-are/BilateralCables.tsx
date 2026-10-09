'use client';

import React, { useState, useEffect, useRef } from 'react';

interface BilateralCablesProps {
  isAr?: boolean;
}

interface SpecItem {
  code: string;
  badge: string;
  title: string;
  desc: string;
  protocol: string;
}

export default function BilateralCables({ isAr = false }: BilateralCablesProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const specsEn: SpecItem[] = [
    {
      code: 'SPEC // 01',
      badge: 'Zero buyer cost',
      title: '100% free for buyers',
      desc: 'Zero platform fees, retainers or markups. Free requirements diagnosis and curated shortlist.',
      protocol: 'PROTOCOL · VERIFIED',
    },
    {
      code: 'SPEC // 02',
      badge: 'Verified decision makers',
      title: 'Direct executive access',
      desc: 'Direct connection to CHROs and L&D heads with pre-allocated corporate budgets.',
      protocol: 'PROTOCOL · VERIFIED',
    },
    {
      code: 'SPEC // 03',
      badge: 'Zero retainer risk',
      title: 'Success-based model',
      desc: 'Providers only invest on verified introductions. 100% 5-day replacement SLA guarantee.',
      protocol: 'PROTOCOL · VERIFIED',
    },
    {
      code: 'SPEC // 04',
      badge: 'Merit over volume',
      title: 'Curated precision (2 to 3 max)',
      desc: 'Introductions capped at 2 to 3 per mandate. Providers compete on merit, not price wars.',
      protocol: 'PROTOCOL · VERIFIED',
    },
  ];

  const specsAr: SpecItem[] = [
    {
      code: 'مواصفة // 01',
      badge: 'مجاني للجهات المشترية',
      title: 'مجاني 100% للمؤسسات',
      desc: 'بدون أي رسوم اشتراك شهري أو عمولات خفية. تشخيص مجاني لاحتياجات التدريب وقائمة ترشيحات دقيقة.',
      protocol: 'بروتوكول · موثق',
    },
    {
      code: 'مواصفة // 02',
      badge: 'صناع قرار موثوقين',
      title: 'وصول مباشر للمسؤولين',
      desc: 'اتصال مباشر برؤساء الموارد البشرية ومسؤولي التعلم والتطوير مع ميزانيات تدريبية معتمدة مسبقاً.',
      protocol: 'بروتوكول · موثق',
    },
    {
      code: 'مواصفة // 03',
      badge: 'بدون مخاطرة اشتراكات',
      title: 'نموذج قائم على النتائج',
      desc: 'يستثمر المزودون فقط عند التقديم الموثق. ضمان استبدال بنسبة 100% خلال 5 أيام عمل.',
      protocol: 'بروتوكول · موثق',
    },
    {
      code: 'مواصفة // 04',
      badge: 'الاستحقاق فوق الكمية',
      title: 'دقة الاختيار (2 إلى 3 فقط)',
      desc: 'الترشيحات محدودة بـ 2 إلى 3 مزودين لكل فرصة. يتنافس المزودون بالجودة والخبرة وليس بحرب أسعار.',
      protocol: 'بروتوكول · موثق',
    },
  ];

  const specs = isAr ? specsAr : specsEn;

  // X target coordinates for 4 cards in a 1000-width SVG viewbox
  // In RTL, the cards start from right: card 0 at x=875, card 1 at 625, etc.
  const ax = isAr ? [875, 625, 375, 125] : [125, 375, 625, 875];

  return (
    <div ref={sectionRef} className="w-full">
      {/* Upper Context Header */}
      <div className="mb-16 sm:mb-20">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 mb-4 sm:mb-5">
          {isAr ? 'منصة التوفيق بين شركات التدريب والمؤسسات' : 'THE CORPORATE TRAINING MATCHMAKING PLATFORM'}
        </div>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-black max-w-4xl mb-4 sm:mb-6">
          {isAr
            ? 'نربط شركات التدريب بالمؤسسات التي تمتلك تحدياً حقيقياً بحاجة لحل.'
            : 'We connect training companies with buyers who already have a real problem to solve.'}
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed">
          {isAr
            ? 'صناع قرار مؤسسيون يواجهون تحديات كفاءات حقيقية، ومزودون معتمدون قادرون على حلها. بدون أي وسطاء أو عشوائية.'
            : 'Enterprise decision makers with a real workforce challenge, and accredited providers who can fix it. Nothing in between.'}
        </p>
      </div>

      {/* Bilateral Header */}
      <div className="pt-8 sm:pt-14 mb-8 sm:mb-12">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-500 mb-3 sm:mb-4">
          {isAr ? 'هندسة القيمة المتوازنة' : 'BILATERAL VALUE ARCHITECTURE'}
        </div>
        <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.05] text-black max-w-3xl mb-3 sm:mb-4">
          {isAr ? 'توافق ثنائي متوازن. انعدام الاحتكاك المنصي.' : 'Bilateral alignment. Zero platform friction.'}
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
          {isAr
            ? 'مجاني بالكامل للشركات المشترية، وقائم على النتائج لمزودي التدريب المعتمدين.'
            : 'Free for corporate buyers, success-based for accredited training providers.'}
        </p>
      </div>

      {/* Suspension Cables SVG (hidden on < 900px, matches reference CSS) */}
      <div className="hidden lg:block w-full overflow-hidden select-none mb-[-1px]">
        <svg
          viewBox="0 0 1000 200"
          className="w-full h-auto block"
          aria-hidden="true"
        >
          {/* Main Central Tower Pylon Line */}
          <line
            x1="500"
            y1="0"
            x2="500"
            y2="200"
            stroke="currentColor"
            className="text-black"
            strokeWidth="3"
          />

          {/* Radiating Suspension Cables */}
          {ax.map((a, i) => {
            const isHovered = hoveredCard === i;
            const extraPath = i === 3;
            const extraTarget = isAr ? a + 14 : a - 14;

            return (
              <React.Fragment key={i}>
                <path
                  d={`M500 6 L${a} 198`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={isHovered ? 5 : 1.5}
                  strokeDasharray={600}
                  strokeDashoffset={isVisible ? 0 : 600}
                  className={`text-black transition-all duration-300 ease-out ${
                    isHovered ? 'opacity-100' : 'opacity-70'
                  }`}
                  style={{
                    transitionDelay: `${i * 0.15}s`,
                    transitionProperty: 'stroke-dashoffset, stroke-width, opacity',
                  }}
                />
                {extraPath && (
                  <path
                    d={`M500 22 L${extraTarget} 198`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={isHovered ? 5 : 1.5}
                    strokeDasharray={600}
                    strokeDashoffset={isVisible ? 0 : 600}
                    className={`text-black transition-all duration-300 ease-out ${
                      isHovered ? 'opacity-100' : 'opacity-70'
                    }`}
                    style={{
                      transitionDelay: '0.7s',
                      transitionProperty: 'stroke-dashoffset, stroke-width, opacity',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </svg>
      </div>

      {/* 4 Specification Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-[1.5px] border-black bg-white">
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
              className={`p-6 sm:p-7 min-h-[300px] flex flex-col justify-between cursor-pointer border-b sm:border-b-0 border-black lg:border-b-0 ${
                index < 3 ? 'lg:border-e-[1.5px] lg:border-black' : ''
              } ${index % 2 === 0 ? 'sm:border-e-[1.5px] sm:border-black' : ''} ${
                index === 2 ? 'sm:border-b-0' : ''
              } transition-colors duration-200 outline-none focus-visible:outline-[3px] focus-visible:outline-black ${
                isHovered ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <div>
                <small className="block font-mono text-xs uppercase tracking-wider font-semibold opacity-70 mb-8 sm:mb-10">
                  {item.code} · {item.badge.toUpperCase()}
                </small>
                <h3 className="font-heading font-semibold text-2xl tracking-tight leading-snug mb-3">
                  {item.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isHovered ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  {item.desc}
                </p>
              </div>

              <em className="block not-italic font-mono text-[11px] uppercase tracking-[0.12em] font-semibold opacity-60 mt-6 pt-4 border-t border-current/15">
                {item.protocol}
              </em>
            </article>
          );
        })}
      </div>
    </div>
  );
}
