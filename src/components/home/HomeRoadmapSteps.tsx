'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';

interface HomeRoadmapStepsProps {
  isAr?: boolean;
  lang: string;
  dict?: any;
}

interface Deliverable {
  label: string;
  desc: string;
}

interface StageData {
  tag: string;
  tabTitle: string;
  headerSmall: string;
  heading: string;
  body: string;
  deliverables: Deliverable[];
  ctaLabel: string;
  ctaHref: string;
}

export default function HomeRoadmapSteps({
  isAr = false,
  lang,
  dict,
}: HomeRoadmapStepsProps) {
  const [activeStage, setActiveStage] = useState(0);

  const stagesEn: StageData[] = [
    {
      tag: '01 / DIAGNOSTIC',
      tabTitle: dict?.how_it_works?.step1?.navTitle || 'Tell Us',
      headerSmall: 'STAGE 01 · 2 MINUTES · DIAGNOSE EXACT SKILL GAPS',
      heading:
        dict?.how_it_works?.step1?.title ||
        'Tell us what your workforce needs to achieve',
      body:
        dict?.how_it_works?.step1?.subtitle ||
        "Submit your department's challenge, timeline, and team size. No technical jargon required. We benchmark current organizational capabilities against market-leading standards across leadership, sales, and applied technology.",
      deliverables: [
        {
          label: 'FOCUS AREA 1',
          desc: 'Executive Leadership: C-Suite decision agility and leadership alignment',
        },
        {
          label: 'FOCUS AREA 2',
          desc: 'B2B Sales Velocity: Accelerate deal conversion pace and revenue execution',
        },
        {
          label: 'FOCUS AREA 3',
          desc: 'Applied AI & GCC Standards: Practical upskilling and Vision 2030 compliance',
        },
      ],
      ctaLabel: 'Find a training specialist',
      ctaHref: `/${lang}/find-training`,
    },
    {
      tag: '02 / MATCHMAKING',
      tabTitle: dict?.how_it_works?.step2?.navTitle || 'Review Matches',
      headerSmall: 'STAGE 02 · 48 HOURS · 2 TO 3 HANDPICKED PROPOSALS',
      heading:
        dict?.how_it_works?.step2?.title ||
        'Review 2 to 3 handpicked, proven proposals',
      body:
        dict?.how_it_works?.step2?.subtitle ||
        'We pre-screen providers for regional GCC experience, verified corporate client references, and exact curriculum fit. Zero open bidding wars, zero vendor spam—only proven domain specialists competing on merit.',
      deliverables: [
        {
          label: 'SPECIFICATION 1',
          desc: 'Accreditation verified: Institutional credentials, client references & track record',
        },
        {
          label: 'SPECIFICATION 2',
          desc: 'Curated precision: 2 to 3 pre-scoped proposals tailored directly to your outcomes',
        },
        {
          label: 'SPECIFICATION 3',
          desc: 'Zero bidding wars: Fair, merit-based selection with confirmed budget parameters',
        },
      ],
      ctaLabel: 'Explore vetting standards',
      ctaHref: `/${lang}/find-training`,
    },
    {
      tag: '03 / CONNECTION',
      tabTitle: dict?.how_it_works?.step3?.navTitle || 'Direct Connection',
      headerSmall: 'STAGE 03 · SEAMLESS · EXECUTIVE ACCESS & ROLLOUT',
      heading:
        dict?.how_it_works?.step3?.title ||
        'Direct Connection & Program Launch',
      body:
        dict?.how_it_works?.step3?.subtitle ||
        'Direct agreement between your organization and the accredited training specialist. 100% free for companies with zero platform fees. Providers only invest on verified introductions, backed by our 5-day replacement SLA guarantee.',
      deliverables: [
        {
          label: 'DELIVERABLE 1',
          desc: 'Executive bridge: Direct calendar access with decision makers and lead facilitators',
        },
        {
          label: 'DELIVERABLE 2',
          desc: 'Zero buyer fees: 100% free with zero platform fees, retainers, or hidden margins',
        },
        {
          label: 'DELIVERABLE 3',
          desc: 'Quality SLA guarantee: 100% 5-day lead and provider replacement assurance',
        },
      ],
      ctaLabel: 'Join as a provider',
      ctaHref: `/${lang}/for-providers`,
    },
  ];

  const stagesAr: StageData[] = [
    {
      tag: '01 / التشخيص',
      tabTitle: dict?.how_it_works?.step1?.navTitle || 'أخبرنا باحتياجك',
      headerSmall: 'المرحلة 01 · دقيقتان · تشخيص دقيق للفجوات المهارية',
      heading:
        dict?.how_it_works?.step1?.title ||
        'أخبرنا بما يحتاج فريقك إلى تحقيقه وتعلّمه',
      body:
        dict?.how_it_works?.step1?.subtitle ||
        'حدد تحدي فريقك، والجدول الزمني، وعدد الموظفين. بدون أي مصطلحات تقنية معقدة. نحلل كفاءات إداراتكم الحالية مقارنة بأفضل المعايير في القيادة، والتقنية، والمبيعات.',
      deliverables: [
        {
          label: 'المحور الأول',
          desc: 'القيادة التنفيذية: سرعة اتخاذ القرارات ومواءمة الإدارات العليا',
        },
        {
          label: 'المحور الثاني',
          desc: 'مسار المبيعات B2B: تسريع وتيرة إغلاق الصفقات وتحقيق المستهدفات',
        },
        {
          label: 'المحور الثالث',
          desc: 'الذكاء الاصطناعي ومعايير الخليج: مهارات تطبيقية ومستهدفات التوطين 2030',
        },
      ],
      ctaLabel: 'ابدأ تشخيص الفجوة المهارية',
      ctaHref: `/${lang}/find-training`,
    },
    {
      tag: '02 / المطابقة',
      tabTitle: dict?.how_it_works?.step2?.navTitle || 'مراجعة الخبراء',
      headerSmall: 'المرحلة 02 · 48 ساعة · عروض من 2 إلى 3 خبراء معتمدين',
      heading:
        dict?.how_it_works?.step2?.title ||
        'راجع من 2 إلى 3 عروض لخبراء تم اختيارهم بعناية',
      body:
        dict?.how_it_works?.step2?.subtitle ||
        'نفحص مزودي التدريب مسبقاً وفق خبرتهم الإقليمية وسوابق أعمالهم وملاءمة الحقيبة التدريبية. بدون مزايدات مفتوحة أو اتصالات تسويقية مزعجة؛ ترشيحات نوعية تتنافس بالجودة فقط.',
      deliverables: [
        {
          label: 'المعيار الأول',
          desc: 'اعتماد موثق: فحص التراخيص المؤسسية وتوصيات الشركات السابقة',
        },
        {
          label: 'المعيار الثاني',
          desc: 'دقة الترشيح: عروض من 2 إلى 3 مزودين فقط متوافقة مع مخرجاتكم المستهدفة',
        },
        {
          label: 'المعيار الثالث',
          desc: 'بدون حرب أسعار: تنافس قائم على الاستحقاق والجودة بميزانيات معتمدة',
        },
      ],
      ctaLabel: 'استكشف معايير الاعتماد',
      ctaHref: `/${lang}/find-training`,
    },
    {
      tag: '03 / الربط المباشر',
      tabTitle: dict?.how_it_works?.step3?.navTitle || 'الربط المباشر',
      headerSmall: 'المرحلة 03 · مباشرة وسلسة · تواصل تنفيذي وتدشين التدريب',
      heading:
        dict?.how_it_works?.step3?.title ||
        'الربط المباشر وتدشين البرنامج التدريبي',
      body:
        dict?.how_it_works?.step3?.subtitle ||
        'تعاقد مباشر بين المنشأة ومزود التدريب المعتمد عبر PontLook. مجاناً 100% للشركات وبدون أي عمولات أو وسطاء. يستثمر المزود فقط عند نجاح التقديم الموثق مع ضمان استبدال خلال 5 أيام.',
      deliverables: [
        {
          label: 'المخرج الأول',
          desc: 'ربط تنفيذي: وصول مباشر لتقويم صناع القرار والمدربين المعتمدين',
        },
        {
          label: 'المخرج الثاني',
          desc: 'مجاني تماماً: صفر رسوم منصة أو اشتراكات شهرية أو تكاليف خفية',
        },
        {
          label: 'المخرج الثالث',
          desc: 'ضمان الجودة: التزام باستبدال الفرصة أو المزود بنسبة 100% خلال 5 أيام عمل',
        },
      ],
      ctaLabel: 'انضم كمزود تدريب معتمد',
      ctaHref: `/${lang}/for-providers`,
    },
  ];

  const stages = isAr ? stagesAr : stagesEn;
  const current = stages[activeStage];

  return (
    <section className="border-t border-white/20 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
          {dict?.how_it_works?.eyebrow ||
            (isAr ? 'آلية العمل · 3 خطوات تشغيلية' : '3-STAGE OPERATIONAL ROADMAP')}
        </div>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white max-w-4xl mb-4 sm:mb-5">
          {dict?.how_it_works?.title ||
            (isAr
              ? 'من تشخيص الفجوة المهارية إلى التدريب في 3 خطوات واضحة'
              : 'From Skill Gap to Training in 3 Straightforward Steps')}
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
          {dict?.how_it_works?.subtitle ||
            (isAr
              ? 'بدون مزايدات. بدون اتصالات مبيعات مزعجة. شراكات تدريبية دقيقة وموثوقة فقط.'
              : 'Zero bidding wars. No endless cold calls. Just verified, tailor-made partnerships.')}
        </p>
      </div>

      {/* Tabs Bar */}
      <div
        role="tablist"
        aria-label={isAr ? 'مراحل رحلة التدريب' : 'Training journey stages'}
        className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-b border-white/20"
      >
        {stages.map((stage, i) => {
          const isSelected = activeStage === i;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveStage(i)}
              className={`text-start p-4 sm:p-5 lg:p-6 border-t-[5px] sm:border-t-[6px] transition-all duration-200 cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-white ${
                isSelected
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-neutral-700 hover:bg-neutral-900 hover:border-white/60'
              }`}
            >
              <b className="block font-mono text-xs sm:text-sm font-semibold tracking-wider mb-1.5 sm:mb-2">
                {stage.tag}
              </b>
              <span className="block font-heading font-semibold text-lg sm:text-xl lg:text-2xl tracking-tight">
                {stage.tabTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Deliverables Tabpanel */}
      <div
        role="tabpanel"
        aria-live="polite"
        className="mt-8 sm:mt-10 border-[1.5px] border-white/20 p-6 sm:p-10 md:p-14 bg-black"
      >
        <small className="block font-mono text-xs uppercase tracking-[0.14em] font-semibold text-neutral-400 mb-3 sm:mb-4">
          {current.headerSmall}
        </small>

        <h3 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug mb-3 sm:mb-4">
          {current.heading}
        </h3>

        <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed mb-8 sm:mb-10 font-normal">
          {current.body}
        </p>

        {current.deliverables.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-white/15">
            {current.deliverables.map((del, dIdx) => (
              <div
                key={dIdx}
                className="border-t-[1.5px] border-white/30 pt-3.5 sm:pt-4"
              >
                <b className="block font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-1.5 sm:mb-2">
                  {del.label}
                </b>
                <span className="text-sm sm:text-base text-white font-medium leading-relaxed block">
                  {del.desc}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tabpanel Footer Action */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={current.ctaHref}
            className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-black text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-black hover:text-white transition-colors duration-200"
          >
            <span>{current.ctaLabel}</span>
            <ArrowRight size={15} className="ms-2 rtl:-scale-x-100" />
          </Link>

          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-transparent text-white text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            {isAr ? 'احجز استشارة استكشافية' : 'Book a discovery call'}
          </Link>
        </div>
      </div>
    </section>
  );
}
