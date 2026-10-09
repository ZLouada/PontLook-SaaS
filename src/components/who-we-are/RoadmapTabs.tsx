'use client';

import React, { useState } from 'react';

interface RoadmapTabsProps {
  isAr?: boolean;
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
}

export default function RoadmapTabs({ isAr = false }: RoadmapTabsProps) {
  const [activeStage, setActiveStage] = useState(0);

  const stagesEn: StageData[] = [
    {
      tag: '01 / DIAGNOSTIC',
      tabTitle: 'Enterprise need',
      headerSmall: 'STAGE 01 · DIAGNOSE EXACT SKILL GAPS & BUDGET',
      heading: 'Enterprise skill gap & diagnostic',
      body: 'HR identifies a critical operational or leadership deficiency. Deep intake: cohort sizing, delivery mode, Riyadh/Dubai onsite requirements, approved budget.',
      deliverables: [
        {
          label: 'DELIVERABLE 1',
          desc: 'Deficiency tagged: operational and leadership gap analysis',
        },
        {
          label: 'DELIVERABLE 2',
          desc: 'Cohort sizing: onsite Riyadh, Dubai, or live-virtual delivery',
        },
        {
          label: 'DELIVERABLE 3',
          desc: 'Budget confirmed: pre-allocated budget and learning objectives',
        },
      ],
    },
    {
      tag: '02 / MATCHMAKING',
      tabTitle: 'Specialist match',
      headerSmall: 'STAGE 02 · 2 TO 3 PRE-VETTED PROVIDER PROPOSALS',
      heading: 'Specialist match',
      body: 'Two to three pre-vetted providers put forward proposals against your diagnosed need. No open bidding, no price wars—only proven domain specialists.',
      deliverables: [
        {
          label: 'DELIVERABLE 1',
          desc: 'Accreditation verified: credentials & enterprise track record',
        },
        {
          label: 'DELIVERABLE 2',
          desc: 'Tailored proposals: scope aligned with diagnosed outcomes',
        },
        {
          label: 'DELIVERABLE 3',
          desc: 'Executive bridge: direct calendar access with decision makers',
        },
      ],
    },
    {
      tag: '03 / ROLLOUT',
      tabTitle: 'Tailored rollout',
      headerSmall: 'STAGE 03 · CURRICULUM ALIGNMENT & KICKOFF',
      heading: 'Tailored rollout',
      body: 'Curriculum alignment and kickoff with the provider you choose. Clear milestones, localized scheduling, and operational synchronization.',
      deliverables: [
        {
          label: 'DELIVERABLE 1',
          desc: 'Curriculum customization: content targeted to operational KPIs',
        },
        {
          label: 'DELIVERABLE 2',
          desc: 'Logistics coordination: venue, materials, and live tooling setup',
        },
        {
          label: 'DELIVERABLE 3',
          desc: 'Kickoff alignment: milestone checkpoints and facilitator briefing',
        },
      ],
    },
    {
      tag: '04 / IMPACT',
      tabTitle: 'Measurable ROI',
      headerSmall: 'STAGE 04 · CAPABILITY UPLIFT & EXECUTIVE ROI',
      heading: 'Measurable ROI',
      body: 'Capability uplift and executive ROI. Transparent evaluation metrics that demonstrate tangible workforce transformation.',
      deliverables: [
        {
          label: 'DELIVERABLE 1',
          desc: 'Post-training evaluation: learning retention & application audit',
        },
        {
          label: 'DELIVERABLE 2',
          desc: 'Executive ROI report: leadership capability metrics delivered',
        },
        {
          label: 'DELIVERABLE 3',
          desc: 'Sustained impact: reinforcement sessions & follow-through',
        },
      ],
    },
  ];

  const stagesAr: StageData[] = [
    {
      tag: '01 / التشخيص',
      tabTitle: 'احتياج المنشأة',
      headerSmall: 'المرحلة 01 · تشخيص الفجوات المهارية والميزانية بدقة',
      heading: 'تحليل الفجوة التدريبية المؤسسية والتشخيص',
      body: 'تحدد إدارة الموارد البشرية فجوة تشغيلية أو قيادية حرجة. فحص دقيق: حجم الفوج، أسلوب التدريب، المتطلبات الميدانية في الرياض أو دبي، والميزانية المعتمدة.',
      deliverables: [
        {
          label: 'المخرج الأول',
          desc: 'تحديد الفجوة: تحليل شامل للاحتياجات التشغيلية والقيادية',
        },
        {
          label: 'المخرج الثاني',
          desc: 'حجم الفوج: تدريب حضوري في الرياض، دبي، أو افتراضي مباشر',
        },
        {
          label: 'المخرج الثالث',
          desc: 'تأكيد الميزانية: رصد الميزانية المخصصة ومستهدفات التعلم',
        },
      ],
    },
    {
      tag: '02 / المطابقة',
      tabTitle: 'مطابقة متخصصة',
      headerSmall: 'المرحلة 02 · عروض من 2 إلى 3 مزودين معتمدين فقط',
      heading: 'مطابقة متخصصة وعالية الدقة',
      body: 'يقدم ٢ إلى ٣ مزودين معتمدين فقط مقترحات تفصيلية تلبي الاحتياج المشخص بدقة. بدون مناقصات مفتوحة أو رسائل عشوائية.',
      deliverables: [
        {
          label: 'المخرج الأول',
          desc: 'فحص الاعتماد: سجل إنجازات المزود وخبرته المؤسسية',
        },
        {
          label: 'المخرج الثاني',
          desc: 'مقترحات مخصصة: نطاق عمل متوافق مع المخرجات المستهدفة',
        },
        {
          label: 'المخرج الثالث',
          desc: 'ربط تنفيذي: جدولة لقاءات مباشرة مع صناع القرار',
        },
      ],
    },
    {
      tag: '03 / التنفيذ',
      tabTitle: 'تنفيذ مفصل',
      headerSmall: 'المرحلة 03 · مواءمة المنهج التدريبي والانطلاق',
      heading: 'تنفيذ تدريبي مخصص ومتكامل',
      body: 'مواءمة المحتوى التدريبي وجدول الإطلاق مع المزود المعتمد الذي تم اختياره، بمواعيد دقيقة وتنسيق ميداني كامل.',
      deliverables: [
        {
          label: 'المخرج الأول',
          desc: 'تخصيص المنهج: محتوى يستهدف مؤشرات الأداء التشغيلية',
        },
        {
          label: 'المخرج الثاني',
          desc: 'التنسيق اللوجستي: تجهيز القاعات والمواد والمنصات التدريبية',
        },
        {
          label: 'المخرج الثالث',
          desc: 'انطلاق التدريب: مراجعة المراحل وتوجيه المدربين المعتمدين',
        },
      ],
    },
    {
      tag: '04 / الأثر',
      tabTitle: 'عائد استثماري',
      headerSmall: 'المرحلة 04 · تطوير الكفاءات وعائد الاستثمار التنفيذي',
      heading: 'أثر مستدام وعائد استثماري ملموس',
      body: 'قياس مباشر وموثق لتطور مهارات الكوادر وعائد الاستثمار المحقق للإدارة العليا وفق أعلى المعايير.',
      deliverables: [
        {
          label: 'المخرج الأول',
          desc: 'تقييم ما بعد التدريب: قياس مؤشرات التعلم والتطبيق العملي',
        },
        {
          label: 'المخرج الثاني',
          desc: 'تقرير الإدارة العليا: إحصائيات عائد الاستثمار وتطور الكفاءات',
        },
        {
          label: 'المخرج الثالث',
          desc: 'استدامة المهارات: جلسات تعزيز ومتابعة لضمان دوام الأثر',
        },
      ],
    },
  ];

  const stages = isAr ? stagesAr : stagesEn;
  const current = stages[activeStage];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
          {isAr ? 'خارطة طريق تشغيلية من 4 مراحل' : '4-STAGE OPERATIONAL ROADMAP'}
        </div>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white max-w-4xl mb-4 sm:mb-5">
          {isAr ? 'رحلة التدريب المؤسسي المتكاملة' : 'The end to end training journey'}
        </h2>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
          {isAr
            ? 'جسر شفاف وسلس ينقلك من تشخيص الفجوة المهارية إلى تحقيق أثر أعمال ملموس ومستدام.'
            : 'A seamless, transparent bridge from diagnosed skill deficit to measurable business impact.'}
        </p>
      </div>

      {/* Tabs Bar */}
      <div
        role="tablist"
        aria-label={isAr ? 'مراحل رحلة التدريب' : 'Training journey stages'}
        className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-white/20"
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
      </div>
    </div>
  );
}
