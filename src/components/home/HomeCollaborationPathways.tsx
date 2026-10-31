'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';

interface HomeCollaborationPathwaysProps {
  isAr?: boolean;
  lang: string;
  dict?: any;
}

interface PathwayCard {
  option: string;
  badge: string;
  title: string;
  desc: string;
  previewHeader: string;
  metricLabel: string;
  metricValue: string;
  checklist: string[];
  protocol: string;
  ctaText: string;
  ctaHref: string;
}

const STACK_CONFIGS = [
  {
    topClass: 'top-20 sm:top-24 lg:top-28',
    zIndex: 10,
    spacing: 'mb-8 sm:mb-12 lg:mb-16',
  },
  {
    topClass: 'top-24 sm:top-28 lg:top-32',
    zIndex: 20,
    spacing: 'mb-8 sm:mb-12 lg:mb-16',
  },
  {
    topClass: 'top-28 sm:top-32 lg:top-36',
    zIndex: 30,
    spacing: 'mb-8 sm:mb-12 lg:mb-16',
  },
  {
    topClass: 'top-32 sm:top-36 lg:top-40',
    zIndex: 40,
    spacing: 'mb-0',
  },
];

export default function HomeCollaborationPathways({
  isAr = false,
  lang,
  dict,
}: HomeCollaborationPathwaysProps) {
  const exp = dict?.experience_cards;

  const pathwaysEn: PathwayCard[] = [
    {
      option: 'OPTION // 01',
      badge: 'FOR TRAINING FIRMS',
      title:
        exp?.cards?.provider?.title ||
        'Deliver Training to Ready Corporate Clients',
      desc:
        exp?.cards?.provider?.subtitle ||
        'Partner with qualified GCC enterprises that have active corporate budgets and executive buy-in.',
      previewHeader:
        exp?.cards?.provider?.previewHeader ||
        'PARTNER PIPELINE · ACTIVE ENGAGEMENTS',
      metricLabel: exp?.cards?.provider?.metricLabel || 'Lead Quality Score',
      metricValue: exp?.cards?.provider?.metricValue || '98% Accuracy',
      checklist: (exp?.cards?.provider?.checklist as string[]) || [
        'Verified Corporate Budgets: Pre-approved funding in SAR & AED',
        'Direct Executive Access: Direct introductions to CHROs & L&D heads',
        'Zero Retainer Risk: No monthly retainers or speculative bids',
      ],
      protocol: 'PROTOCOL · PROVIDER NETWORK',
      ctaText: exp?.cards?.provider?.cta || 'Apply to Join Network',
      ctaHref: `/${lang}/for-providers`,
    },
    {
      option: 'OPTION // 02',
      badge: 'FOR ENTERPRISES',
      title:
        exp?.cards?.enterprise?.title ||
        'Find the Right Training Specialist for Your Team',
      desc:
        exp?.cards?.enterprise?.subtitle ||
        'Share what your team needs to achieve. We curate 2–3 handpicked, pre-scoped training proposals within 48 hours.',
      previewHeader:
        exp?.cards?.enterprise?.previewHeader ||
        'ENTERPRISE MATCHING · CURATED PROGRAM',
      metricLabel: exp?.cards?.enterprise?.metricLabel || 'Provider Fit Score',
      metricValue: exp?.cards?.enterprise?.metricValue || '96% Match',
      checklist: (exp?.cards?.enterprise?.checklist as string[]) || [
        '100% Free for Buyers: Zero platform fees or procurement markups',
        'Curated Precision: 2 to 3 handpicked proposals, zero bidding wars',
        'Zero Sales Spam: No cold calls or unwanted vendor outreach',
      ],
      protocol: 'PROTOCOL · ENTERPRISE MATCH',
      ctaText: exp?.cards?.enterprise?.cta || 'Request Training Matches',
      ctaHref: `/${lang}/find-training`,
    },
    {
      option: 'OPTION // 03',
      badge: 'KNOWLEDGE & RESEARCH',
      title:
        exp?.cards?.hub?.title ||
        'Download Practical L&D Frameworks & Toolkits',
      desc:
        exp?.cards?.hub?.subtitle ||
        'GCC workforce benchmarks, localization data, and training ROI templates—completely free on our blog.',
      previewHeader:
        exp?.cards?.hub?.previewHeader ||
        'KNOWLEDGE HUB · OPEN ACCESS TOOLKITS',
      metricLabel: exp?.cards?.hub?.metricLabel || 'Practical Value',
      metricValue: exp?.cards?.hub?.metricValue || '100% Free Access',
      checklist: (exp?.cards?.hub?.checklist as string[]) || [
        'Workforce Benchmarks: GCC skill shortage & Saudization reports',
        'Diagnostic Frameworks: Step-by-step L&D audit templates',
        'Proven Case Studies: Real data on measuring corporate training ROI',
      ],
      protocol: 'PROTOCOL · OPEN ACCESS',
      ctaText: exp?.cards?.hub?.cta || 'Explore Free Resources',
      ctaHref: `/${lang}/resources`,
    },
    {
      option: 'OPTION // 04',
      badge: 'EXECUTIVE ADVISORY',
      title:
        exp?.cards?.consultation?.title ||
        'Need Guidance? Speak Directly with Our Team',
      desc:
        exp?.cards?.consultation?.subtitle ||
        'Discuss your specific enterprise training requirements directly with our executive advisory team.',
      previewHeader:
        exp?.cards?.consultation?.previewHeader ||
        'DIRECT ADVISORY · EXECUTIVE CONSULTATION',
      metricLabel: exp?.cards?.consultation?.metricLabel || 'Advisory SLA',
      metricValue: exp?.cards?.consultation?.metricValue || 'Within 24 Hours',
      checklist: (exp?.cards?.consultation?.checklist as string[]) || [
        '1-on-1 Consultation: Discuss exact organizational objectives',
        'Tailored Roadmap: Custom provider scouting and qualification',
        '100% Confidential: No commitment and zero pressure',
      ],
      protocol: 'PROTOCOL · EXECUTIVE CONSULT',
      ctaText: exp?.cards?.consultation?.cta || 'Book an Exploratory Call',
      ctaHref: `/${lang}/contact`,
    },
  ];

  const pathwaysAr: PathwayCard[] = [
    {
      option: 'الخيار // 01',
      badge: 'لمزودي ومراكز التدريب',
      title:
        exp?.cards?.provider?.title ||
        'قدم التدريب لعملاء مؤسسيين جاهزين',
      desc:
        exp?.cards?.provider?.subtitle ||
        'ارتبط بمنشآت خليجية مؤهلة تمتلك ميزانيات تدريبية معتمدة وموافقة تنفيذية مؤكدة.',
      previewHeader:
        exp?.cards?.provider?.previewHeader ||
        'خط أنابيب الشركاء · مشاريع نشطة',
      metricLabel: exp?.cards?.provider?.metricLabel || 'درجة جودة الفرص',
      metricValue: exp?.cards?.provider?.metricValue || 'دقة 98%',
      checklist: (exp?.cards?.provider?.checklist as string[]) || [
        'ميزانيات معتمدة: تمويل مؤسسي مؤكد بالريال والدرهم',
        'وصول تنفيذي مباشر: لقاءات مباشرة مع مديري الموارد البشرية والتدريب',
        'انعدام المخاطرة: بدون رسوم اشتراك شهري أو مزايدات غير مضمونة',
      ],
      protocol: 'بروتوكول · شبكة المزودين',
      ctaText: exp?.cards?.provider?.cta || 'قدم للانضمام إلى الشبكة',
      ctaHref: `/${lang}/for-providers`,
    },
    {
      option: 'الخيار // 02',
      badge: 'للشركات والمؤسسات',
      title:
        exp?.cards?.enterprise?.title ||
        'اعثر على خبير التدريب الأنسب لفريقك',
      desc:
        exp?.cards?.enterprise?.subtitle ||
        'أخبرنا بما يحتاج فريقك إلى إتقانه. نختار لك 2 إلى 3 عروض لخبراء معتمدين خلال 48 ساعة.',
      previewHeader:
        exp?.cards?.enterprise?.previewHeader ||
        'مطابقة المنشآت · برنامج منتقى',
      metricLabel: exp?.cards?.enterprise?.metricLabel || 'درجة ملاءمة المزود',
      metricValue: exp?.cards?.enterprise?.metricValue || 'توافق 96%',
      checklist: (exp?.cards?.enterprise?.checklist as string[]) || [
        'مجاني 100% للشركات: بدون أي رسوم منصة أو هوامش مشتريات إضافية',
        'دقة الاختيار: 2 إلى 3 عروض منتقاة بعناية وبدون مزايدات عشوائية',
        'بدون إزعاج تسويقي: انعدام المكالمات العشوائية وعروض المبيعات المزعجة',
      ],
      protocol: 'بروتوكول · مطابقة المنشآت',
      ctaText: exp?.cards?.enterprise?.cta || 'اطلب مطابقة تدريبية',
      ctaHref: `/${lang}/find-training`,
    },
    {
      option: 'الخيار // 03',
      badge: 'مركز المعرفة والأبحاث',
      title:
        exp?.cards?.hub?.title ||
        'حمّل أدلة ونماذج التطوير المؤسسي العملية',
      desc:
        exp?.cards?.hub?.subtitle ||
        'معايير فجوات المهارات الخليجية، وبيانات التوطين، ونماذج قياس أثر التدريب وعائده — مجاناً بالكامل.',
      previewHeader:
        exp?.cards?.hub?.previewHeader ||
        'مركز المعرفة · أدلة مفتوحة الوصول',
      metricLabel: exp?.cards?.hub?.metricLabel || 'القيمة العملية',
      metricValue: exp?.cards?.hub?.metricValue || 'وصول مجاني بالكامل',
      checklist: (exp?.cards?.hub?.checklist as string[]) || [
        'مؤشرات القوى العاملة: تقارير نقص الكفاءات ونسب التوطين الخليجية',
        'أطر عمل تشخيصية: نماذج وقوائم تدقيق الاحتياج التدريبي خطوة بخطوة',
        'دراسات حالة واقعية: بيانات حقيقية لقياس العائد على الاستثمار التدريبي',
      ],
      protocol: 'بروتوكول · وصول مفتوح',
      ctaText: exp?.cards?.hub?.cta || 'تصفح الأدلة والموارد',
      ctaHref: `/${lang}/resources`,
    },
    {
      option: 'الخيار // 04',
      badge: 'استشارة تنفيذية خاصة',
      title:
        exp?.cards?.consultation?.title ||
        'استشارة مباشرة مع فريق خبراء بونت لوك',
      desc:
        exp?.cards?.consultation?.subtitle ||
        'ناقش متطلبات التدريب المؤسسي الخاصة بمنشأتك مباشرة مع فريقنا الاستشاري.',
      previewHeader:
        exp?.cards?.consultation?.previewHeader ||
        'استشارة مباشرة · جلسة تنفيذية',
      metricLabel: exp?.cards?.consultation?.metricLabel || 'التزام الاستجابة',
      metricValue: exp?.cards?.consultation?.metricValue || 'خلال 24 ساعة',
      checklist: (exp?.cards?.consultation?.checklist as string[]) || [
        'استشارة فردية مخصصة: مراجعة مستهدفات منشأتكم التدريبية بالتفصيل',
        'خارطة طريق مخصصة: تحديد واختيار المزودين الأنسب لاحتياجكم بدقة',
        'سرية تامة 100%: بدون أي التزام أو ضغوط تعاقدية',
      ],
      protocol: 'بروتوكول · استشارة تنفيذية',
      ctaText: exp?.cards?.consultation?.cta || 'احجز جلسة استشارية',
      ctaHref: `/${lang}/contact`,
    },
  ];

  const pathways = isAr ? pathwaysAr : pathwaysEn;

  return (
    <section className="border-t border-white/20 py-16 sm:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Context Header */}
      <div className="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 mb-3 sm:mb-4">
            {isAr
              ? 'مسارات التعاون والربط المؤسسي · 4 خيارات'
              : 'COLLABORATION PATHWAYS · 4 OPTIONS'}
          </div>
          <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white max-w-3xl mb-4 sm:mb-5">
            {exp?.title ||
              (isAr
                ? 'ابدأ برؤى وأبحاث مدروسة. اعقد شراكات تثمر أثراً حقيقياً.'
                : 'Start with Our Insights. Partner for Real Impact.')}
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed">
            {exp?.subtitle ||
              (isAr
                ? 'لا نكتفي بربط احتياجات الشركات مع نخبة مزودي التدريب على أرض الواقع. استكشف مدونتنا للاطلاع على أدلة مجانية ومعايير مهارية خليجية وأطر تشخيصية دقيقة، وعندما تكون جاهزاً، دعنا نوفق بينك وبين خبراء التدريب المعتمدين لتنفيذ الحلول فوراً.'
                : "We don't just bridge corporate needs with expert providers on the ground. Explore our blog for free, in-depth L&D guides, regional skill benchmarks, and diagnostic frameworks, and whenever you're ready, let us match you directly with the verified training experts who execute the solution.")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href={`/${lang}/resources`}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-black hover:text-white transition-colors duration-200"
          >
            <span>{exp?.btn_blog || (isAr ? 'استكشف الموارد المجانية' : 'Explore Free Resources')}</span>
            <ArrowRight size={14} className="ms-2 rtl:-scale-x-100" />
          </Link>
          <Link
            href={`/${lang}/find-training`}
            className="inline-flex items-center justify-center px-6 sm:px-3 py-3 bg-transparent text-white text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            <span>{exp?.btn_match || (isAr ? 'ابدأ طلب مطابقة' : 'Find Training Partner')}</span>
            <ArrowRight size={14} className="ms-2 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>

      {/* Sticky Stacked Cards Stream */}
      <div className="relative max-w-5xl mx-auto pb-16 sm:pb-24 lg:pb-36">
        {pathways.map((card, idx) => {
          const config = STACK_CONFIGS[idx] || STACK_CONFIGS[0];

          return (
            <div
              key={idx}
              className={`sticky ${config.topClass} ${config.spacing}`}
              style={{ zIndex: config.zIndex }}
            >
              <article className="w-full bg-black border-[1.5px] border-white/20 p-6 sm:p-8 lg:p-10 shadow-[0_-12px_36px_rgba(0,0,0,0.9),0_20px_50px_rgba(0,0,0,0.85)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                  {/* Left Details */}
                  <div className="lg:col-span-7 space-y-4">
                    <small className="block font-mono text-xs uppercase tracking-wider font-semibold text-neutral-400">
                      {card.option} · {card.badge}
                    </small>

                    <h3 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                      {card.desc}
                    </p>

                    <div className="pt-2">
                      <Link
                        href={card.ctaHref}
                        className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-black text-xs sm:text-sm font-semibold tracking-wide border-[1.5px] border-white hover:bg-black hover:text-white transition-colors duration-200"
                      >
                        <span>{card.ctaText}</span>
                        <ArrowRight size={14} className="ms-2 rtl:-scale-x-100" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Architectural Specifications Panel */}
                  <div className="lg:col-span-5">
                    <div className="border-[1.5px] border-white/20 bg-neutral-950 p-4 sm:p-6 space-y-3.5">
                      <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-neutral-400 tracking-wider uppercase tabular-nums border-b border-white/10 pb-2">
                        {card.previewHeader}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center font-mono text-xs text-neutral-300">
                          <span>{card.metricLabel}</span>
                          <span className="font-bold text-white tabular-nums">
                            {card.metricValue}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-white w-full" />
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/10">
                        {card.checklist.map((item, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300 font-sans"
                          >
                            <span className="font-mono text-xs font-bold text-white mt-0.5 shrink-0">
                              —
                            </span>
                            <span className="leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/10 font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                        {card.protocol}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
