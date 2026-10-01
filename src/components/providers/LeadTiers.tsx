'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import { m } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useParams } from 'next/navigation';
import Signal from '@/components/shared/Signal';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import BorderBeam from '@/components/shared/BorderBeam';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import BorderGlow from '@/components/shared/BorderGlow';
import { dur, ease, viewportOnce } from '@/lib/motion';

interface TierData {
  step: string;
  badge: string;
  title: string;
  description: string;
  project: string;
  accuracy: string;
  barColor: string;
  barWidth: string;
  checklist: string[];
  isCtaCard?: boolean;
}

const TIERS_EN: TierData[] = [
  {
    step: 'Tier 01',
    badge: 'Hot · 95% Match',
    title: 'Ready to Contract · Immediate 30-Day Window',
    description: 'Verified CHRO/VP HR, confirmed budget authority, RFP scoped and ready for proposals.',
    project: 'Riyadh Enterprise · Executive Leadership',
    accuracy: '95% Accuracy',
    barColor: 'bg-[#FF5C00]',
    barWidth: 'w-[95%]',
    checklist: [
      'Verified CHRO / Decision Maker',
      'Confirmed Budget (SAR 250k+)',
      'Immediate 30-Day Deployment Window',
    ],
  },
  {
    step: 'Tier 02',
    badge: 'Warm · 80% Match',
    title: 'Active Requirement · Budget Staged for Q3/Q4',
    description: 'Validated training challenge and executive sponsor; finalizing cohort schedule and vendor shortlist.',
    project: 'Dubai Enterprise · AI & Tech Upskilling',
    accuracy: '80% Accuracy',
    barColor: 'bg-[#FF5C00]/80',
    barWidth: 'w-[80%]',
    checklist: [
      'Executive Sponsor Confirmed',
      '500+ Regional Workforce',
      'Vendor Evaluation Window Active',
    ],
  },
  {
    step: 'Tier 03',
    badge: 'Qualified · 60% Match',
    title: 'Strategic Need · Early Discovery RFP',
    description: 'Corporate capability gap identified and approved for preliminary provider scouting.',
    project: 'Doha Enterprise · Compliance & Risk',
    accuracy: '60% Accuracy',
    barColor: 'bg-[#FF5C00]/60',
    barWidth: 'w-[60%]',
    checklist: [
      'Strategic Scope Defined',
      'Banking & Financial Services',
      'Pre-RFP Engagement Opportunity',
    ],
  },
  {
    step: 'SLA Guarantee',
    badge: '100% Guaranteed',
    title: 'Zero Retainer Risk · Complete Quality SLA',
    description: 'Never pay monthly agency retainers. Zero upfront cost. Instant 100% lead replacement if any contact fails qualification.',
    project: 'PontLook Provider Partnership SLA',
    accuracy: '100% SLA Guarantee',
    barColor: 'bg-[#FF5C00]',
    barWidth: 'w-full',
    checklist: [
      '$0 Monthly Retainer · Pay Per Lead',
      '100% Instant Replacement SLA',
      'Keep 100% of Training Delivery Fees',
    ],
    isCtaCard: true,
  },
];

const TIERS_AR: TierData[] = [
  {
    step: 'المستوى 01',
    badge: 'فرصة مؤكدة · دقة 95%',
    title: 'جاهز للتعاقد · نافذة تنفيذ خلال 30 يوماً',
    description: 'صانع قرار تنفيذي موثق، ميزانية معتمدة ومخصصة، وكراسة متطلبات تدريبية مكتملة وجاهزة لتلقي العروض.',
    project: 'جهة كبرى بالرياض · القيادة التنفيذية',
    accuracy: 'دقة 95%',
    barColor: 'bg-[#FF5C00]',
    barWidth: 'w-[95%]',
    checklist: [
      'صانع قرار تنفيذي معتمد ومباشر',
      'ميزانية معتمدة ومخصصة (250+ ألف ر.س)',
      'نافذة تنفيذ عاجلة خلال 30 يوماً',
    ],
  },
  {
    step: 'المستوى 02',
    badge: 'فرصة قيد الإعداد · دقة 80%',
    title: 'احتياج تدريبي مؤكد · ميزانية مخصصة للربع القادم',
    description: 'تحدي مؤسسي واضح واعتماد من الإدارة العليا؛ يجري إعداد القائمة المختصرة لمزودي التدريب.',
    project: 'مجموعة كبرى في دبي · التحول الرقمي والذكاء الاصطناعي',
    accuracy: 'دقة 80%',
    barColor: 'bg-[#FF5C00]/80',
    barWidth: 'w-[80%]',
    checklist: [
      'راعي تنفيذي معتمد للبرنامج',
      'كوادر تتجاوز 500 موظف',
      'تقييم العروض لاختيار المزود الأنسب',
    ],
  },
  {
    step: 'المستوى 03',
    badge: 'فرصة مبكرة · دقة 60%',
    title: 'احتياج استراتيجي · استكشاف العروض المبدئية',
    description: 'تحديد فجوة مهارات معتمدة والبدء في استكشاف كفاءات وبيوت الخبرة التدريبية المتخصصة.',
    project: 'مؤسسة في الدوحة · الامتثال وإدارة المخاطر',
    accuracy: 'دقة 60%',
    barColor: 'bg-[#FF5C00]/60',
    barWidth: 'w-[60%]',
    checklist: [
      'تحديد النطاق المبدئي بوضوح',
      'قطاع مالي ومصرفي مرموق',
      'فرصة تواصل مبكر وبناء أسبقية',
    ],
  },
  {
    step: 'ضمان الشراكة',
    badge: 'ضمان 100%',
    title: 'صفر مخاطر اشتراكات · ضمان استبدال فوري',
    description: 'بدون أي اشتراكات شهرية أو رسوم وكالات ثابتة. استبدال فوري 100% لأي فرصة لا تطابق معايير التأهيل المعتمدة.',
    project: 'اتفاقية مستوى الخدمة لمزودي PontLook',
    accuracy: 'ضمان 100% معتمد',
    barColor: 'bg-[#FF5C00]',
    barWidth: 'w-full',
    checklist: [
      'صفر اشتراكات شهرية · الدفع لكل فرصة',
      'ضمان استبدال فوري 100% خلال 48 ساعة',
      'الاحتفاظ بـ 100% من أتعاب التدريب',
    ],
    isCtaCard: true,
  },
];

const CARD_CONFIGS = [
  {
    zIndexClass: 'z-10',
    topClass: 'top-20 sm:top-24 lg:top-24',
    spacingClass: 'mb-6 sm:mb-8 lg:mb-20',
    shadowClass: 'shadow-[0_12px_36px_-10px_rgba(0,0,0,0.08)]'
  },
  {
    zIndexClass: 'z-20',
    topClass: 'top-24 sm:top-28 lg:top-28',
    spacingClass: 'mb-6 sm:mb-8 lg:mb-20',
    shadowClass: 'shadow-[0_16px_42px_-10px_rgba(0,0,0,0.10)]'
  },
  {
    zIndexClass: 'z-30',
    topClass: 'top-28 sm:top-32 lg:top-32',
    spacingClass: 'mb-6 sm:mb-8 lg:mb-20',
    shadowClass: 'shadow-[0_20px_48px_-10px_rgba(0,0,0,0.12)]'
  },
  {
    zIndexClass: 'z-40',
    topClass: 'top-32 sm:top-36 lg:top-36',
    spacingClass: 'mb-0',
    shadowClass: 'shadow-[0_24px_54px_-10px_rgba(0,0,0,0.14)]'
  }
];

interface ExperienceCardData {
  id: string;
  badgePersona: string;
  badgeOption: string;
  title: string;
  subtitle: string;
  previewHeader: string;
  metricLabel: string;
  metricValue: string;
  metricWidth: string;
  checklist: string[];
  cta: string;
  href: string;
  isExternal?: boolean;
  clayTheme: {
    bgClass: string;
    borderClass: string;
    pillOuter: string;
    pillInner: string;
    buttonClass: string;
    innerCardBg: string;
    innerCardBorder: string;
    meterColor: string;
    checkColor?: string;
  };
}

const EXPERIENCE_CARDS_EN: ExperienceCardData[] = [
  {
    id: 'provider',
    badgePersona: 'For Training Providers',
    badgeOption: 'Option 1',
    title: 'Connect Directly with Ready Corporate Clients',
    subtitle: 'Partner with pre qualified GCC enterprises that have active training budgets and executive buy in.',
    previewHeader: 'PARTNER PIPELINE · ACTIVE ENGAGEMENTS',
    metricLabel: 'Lead Quality Score',
    metricValue: '98%',
    metricWidth: 'w-[98%]',
    checklist: [
      'Verified Budget: Pre approved corporate funding (SAR / AED)',
      'Direct Executive Access: Meet CHROs & CLOs directly',
      'End Cold Prospecting: Qualified demand delivered to you',
    ],
    cta: 'Join the Provider Network',
    href: '/for-providers',
    isExternal: false,
    clayTheme: {
      bgClass: 'bg-white text-neutral-900',
      borderClass: 'border-neutral-200/90 hover:border-neutral-900',
      pillOuter: 'bg-neutral-100 border border-neutral-200 text-neutral-950',
      pillInner: 'bg-neutral-100 border border-neutral-200 text-neutral-800',
      buttonClass: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10 active:scale-[0.98]',
      innerCardBg: 'bg-neutral-50 text-neutral-900',
      innerCardBorder: 'border-neutral-200',
      meterColor: 'bg-neutral-950',
      checkColor: 'text-neutral-950',
    }
  },
  {
    id: 'enterprise',
    badgePersona: 'For Enterprises',
    badgeOption: 'Option 2',
    title: 'Find & Match with Vetted Training Specialists',
    subtitle: 'Tell us your workforce challenge and get directly matched with verified providers equipped to solve it.',
    previewHeader: 'ENTERPRISE MATCHING · CUSTOM PROGRAM',
    metricLabel: 'Provider Fit Score',
    metricValue: '96%',
    metricWidth: 'w-[96%]',
    checklist: [
      'Vetted Track Record: Proven regional corporate experience',
      'Tailored Curriculum: Aligned with your specific skill gaps',
      'De-Risked Procurement: Transparent, competitive proposals',
    ],
    cta: 'Get Matched for Training',
    href: '/find-training',
    isExternal: false,
    clayTheme: {
      bgClass: 'bg-white text-neutral-900',
      borderClass: 'border-neutral-200/90 hover:border-neutral-900',
      pillOuter: 'bg-neutral-100 border border-neutral-200 text-neutral-950',
      pillInner: 'bg-neutral-100 border border-neutral-200 text-neutral-800',
      buttonClass: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10 active:scale-[0.98]',
      innerCardBg: 'bg-neutral-50 text-neutral-900',
      innerCardBorder: 'border-neutral-200',
      meterColor: 'bg-neutral-950',
      checkColor: 'text-neutral-950',
    }
  },
  {
    id: 'hub',
    badgePersona: 'Knowledge & Research',
    badgeOption: 'Option 3',
    title: 'Explore Actionable L&D Insights & Guides',
    subtitle: 'Dive into free, research backed frameworks, workforce reports, and practical guides on regional talent trends.',
    previewHeader: 'KNOWLEDGE HUB · LATEST RESOURCES',
    metricLabel: 'Practical Value',
    metricValue: 'Free Access',
    metricWidth: 'w-full',
    checklist: [
      'Workforce Benchmarks: GCC skill shortage & talent reports',
      'Diagnostic Frameworks: Step by step L&D audit templates',
      'Best Practices: Practical case studies on corporate ROI',
    ],
    cta: 'Explore the Blog & Resources',
    href: 'https://blog.pontlook.com',
    isExternal: true,
    clayTheme: {
      bgClass: 'bg-white text-neutral-900',
      borderClass: 'border-neutral-200/90 hover:border-neutral-900',
      pillOuter: 'bg-neutral-100 border border-neutral-200 text-neutral-950',
      pillInner: 'bg-neutral-100 border border-neutral-200 text-neutral-800',
      buttonClass: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 hover:border-neutral-900 active:scale-[0.98]',
      innerCardBg: 'bg-neutral-50 text-neutral-900',
      innerCardBorder: 'border-neutral-200',
      meterColor: 'bg-neutral-950',
      checkColor: 'text-neutral-950',
    }
  },
  {
    id: 'consultation',
    badgePersona: 'Personal Consultation',
    badgeOption: 'Option 4',
    title: 'Need Guidance? Speak Directly with Our Team',
    subtitle: 'Have unique workforce requirements or want to learn how PontLook works for your organization? We are here to help.',
    previewHeader: 'DIRECT ADVISORY · CONSULTATION',
    metricLabel: 'Response Time',
    metricValue: 'Within 24 Hours',
    metricWidth: 'w-full',
    checklist: [
      '1 on 1 Consultation: Discuss your exact workforce objectives',
      'Platform Walkthrough: See how our diagnostic matching works',
      'Custom Advisory: Tailored recommendations with no obligation',
    ],
    cta: 'Contact Our Advisory Team',
    href: '/contact',
    isExternal: false,
    clayTheme: {
      bgClass: 'bg-white text-neutral-900',
      borderClass: 'border-neutral-200/90 hover:border-neutral-900',
      pillOuter: 'bg-neutral-100 border border-neutral-200 text-neutral-950',
      pillInner: 'bg-neutral-100 border border-neutral-200 text-neutral-800',
      buttonClass: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10 active:scale-[0.98]',
      innerCardBg: 'bg-neutral-50 text-neutral-900',
      innerCardBorder: 'border-neutral-200',
      meterColor: 'bg-neutral-950',
      checkColor: 'text-neutral-950',
    }
  },
];

const EXPERIENCE_CARDS_AR: ExperienceCardData[] = [
  {
    id: 'provider',
    badgePersona: 'لمزودي ومراكز التدريب',
    badgeOption: 'الخيار 1',
    title: 'تواصل مباشرة مع عملاء مؤسسيين مستعدين للتعاقد',
    subtitle: 'اعقد شراكات مع كبرى المنشآت الخليجية المؤهلة مسبقاً، بميزانيات تدريب معتمدة ودعم من الإدارة التنفيذية.',
    previewHeader: 'مسار الشركاء · تعاقدات نشطة',
    metricLabel: 'درجة جودة الفرص',
    metricValue: '98%',
    metricWidth: 'w-[98%]',
    checklist: [
      'ميزانية مؤكدة: تمويل مؤسسي معتمد مسبقاً (ريال سعودي / درهم إماراتي)',
      'وصول تنفيذي مباشر: قابل مدراء الموارد البشرية والتعلم مباشرة',
      'انعدام التنقيب البارد: طلب حقيقي مؤهل يصلك مباشرة',
    ],
    cta: 'انضم إلى شبكة المزودين',
    href: '/for-providers',
    isExternal: false,
    clayTheme: {
      bgClass: 'bg-white text-neutral-900',
      borderClass: 'border-neutral-200/90 hover:border-neutral-900',
      pillOuter: 'bg-neutral-100 border border-neutral-200 text-neutral-950',
      pillInner: 'bg-neutral-100 border border-neutral-200 text-neutral-800',
      buttonClass: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10 active:scale-[0.98]',
      innerCardBg: 'bg-neutral-50 text-neutral-900',
      innerCardBorder: 'border-neutral-200',
      meterColor: 'bg-neutral-950',
      checkColor: 'text-neutral-950',
    }
  },
  {
    id: 'enterprise',
    badgePersona: 'للشركات والمؤسسات',
    badgeOption: 'الخيار 2',
    title: 'ابحث وتطابق مع نخبة أخصائيي التدريب المعتمدين',
    subtitle: 'أخبرنا عن تحدي الكفاءات في منشأتك وتطابق مباشرة مع مزودي التدريب المعتمدين القادرين على حله بكفاءة.',
    previewHeader: 'مطابقة المؤسسات · برامج مخصصة',
    metricLabel: 'درجة ملاءمة المزود',
    metricValue: '96%',
    metricWidth: 'w-[96%]',
    checklist: [
      'سجل إنجازات معتمد: خبرة مؤسسية إقليمية مثبتة وموثوقة',
      'مناهج مفصلة: مصممة خصيصاً لسد فجواتك المهارية المحددة',
      'انعدام مخاطر الشراء: عروض تنافسية واضحة وشفافة بالكامل',
    ],
    cta: 'ابدأ الربط للتدريب',
    href: '/find-training',
    isExternal: false,
    clayTheme: {
      bgClass: 'bg-white text-neutral-900',
      borderClass: 'border-neutral-200/90 hover:border-neutral-900',
      pillOuter: 'bg-neutral-100 border border-neutral-200 text-neutral-950',
      pillInner: 'bg-neutral-100 border border-neutral-200 text-neutral-800',
      buttonClass: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10 active:scale-[0.98]',
      innerCardBg: 'bg-neutral-50 text-neutral-900',
      innerCardBorder: 'border-neutral-200',
      meterColor: 'bg-neutral-950',
      checkColor: 'text-neutral-950',
    }
  },
  {
    id: 'hub',
    badgePersona: 'المعرفة والأبحاث',
    badgeOption: 'الخيار 3',
    title: 'استكشف أدلة ورؤى التعلم والتطوير العملية',
    subtitle: 'تعمق في أطر عمل مجانية مدعومة بالأبحاث، وتقارير القوى العاملة، وأدلة عملية حول اتجاهات المواهب الإقليمية.',
    previewHeader: 'مركز المعرفة · أحدث الموارد والأدلة',
    metricLabel: 'القيمة العملية',
    metricValue: 'وصول مجاني بالكامل',
    metricWidth: 'w-full',
    checklist: [
      'معايير القوى العاملة: تقارير نقص المهارات والمواهب في الخليج',
      'أطر تشخيصية: نماذج تدقيق وتحليل التعلم والتطوير خطوة بخطوة',
      'أفضل الممارسات: دراسات حالة عملية حول العائد على الاستثمار التدريبي',
    ],
    cta: 'استكشف المدونة والموارد',
    href: 'https://blog.pontlook.com',
    isExternal: true,
    clayTheme: {
      bgClass: 'bg-white text-neutral-900',
      borderClass: 'border-neutral-200/90 hover:border-neutral-900',
      pillOuter: 'bg-neutral-100 border border-neutral-200 text-neutral-950',
      pillInner: 'bg-neutral-100 border border-neutral-200 text-neutral-800',
      buttonClass: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 hover:border-neutral-900 active:scale-[0.98]',
      innerCardBg: 'bg-neutral-50 text-neutral-900',
      innerCardBorder: 'border-neutral-200',
      meterColor: 'bg-neutral-950',
      checkColor: 'text-neutral-950',
    }
  },
  {
    id: 'consultation',
    badgePersona: 'استشارة خاصة',
    badgeOption: 'الخيار 4',
    title: 'هل تحتاج إلى استشارة؟ تحدث مباشرة مع فريقنا',
    subtitle: 'هل لديك متطلبات تدريبية خاصة بكوادر منشأتك أو تود معرفة كيف تعمل منصة PontLook لصالحك؟ نحن هنا لمساعدتك.',
    previewHeader: 'استشارات مباشرة · جلسة نقاش',
    metricLabel: 'سرعة الاستجابة',
    metricValue: 'خلال 24 ساعة',
    metricWidth: 'w-full',
    checklist: [
      'استشارة فردية 1 على 1: ناقش أهدافك المهارية بدقة',
      'استعراض المنصة: تعرف عملياً على آلية المطابقة والتشخيص المتبادلة',
      'توجيه مخصص: توصيات واستشارات مصممة لمنشأتك دون أي التزام',
    ],
    cta: 'تواصل مع فريقنا الاستشاري',
    href: '/contact',
    isExternal: false,
    clayTheme: {
      bgClass: 'bg-white text-neutral-900',
      borderClass: 'border-neutral-200/90 hover:border-neutral-900',
      pillOuter: 'bg-neutral-100 border border-neutral-200 text-neutral-950',
      pillInner: 'bg-neutral-100 border border-neutral-200 text-neutral-800',
      buttonClass: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10 active:scale-[0.98]',
      innerCardBg: 'bg-neutral-50 text-neutral-900',
      innerCardBorder: 'border-neutral-200',
      meterColor: 'bg-neutral-950',
      checkColor: 'text-neutral-950',
    }
  },
];

export default function LeadTiers(_props?: {
  dict?: any;
  lang?: string;
  showSignals?: boolean;
  mode?: 'providers' | 'experience';
}) {
  const contextDict = useDictionary();
  const params = useParams();
  const dict = _props?.dict || contextDict;
  const lang = _props?.lang || (params?.lang as string) || 'en';
  const isAr = lang === 'ar';
  const mode = _props?.mode || 'experience';

  if (mode === 'providers') {
    const tiers = isAr ? TIERS_AR : TIERS_EN;
    return (
      <section
        data-nav-dark="true"
        className="relative py-16 sm:py-24 lg:py-32 bg-black text-white"
      >
        {/* ambient glow */}
        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/[0.02] blur-[180px] pointer-events-none rounded-full" />

        <div className="container-site relative z-10 px-3.5 xs:px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10 xs:mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#26282D] text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span>{isAr ? 'مستويات التأهيل والمطابقة' : 'QUALIFICATION TIERS'}</span>
            </div>
            <TextReveal
              as="h2"
              text={isAr ? 'تدفق متوقع لفرص الشركات والمؤسسات' : 'A predictable pipeline of enterprise opportunities'}
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight font-heading"
            />
            <p className="mt-3 xs:mt-4 text-sm xs:text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-sans">
              {isAr
                ? 'يتم تقييم كل فرصة بناءً على التحقق من صانع القرار، وحجم الشركة، والميزانية، والجدول الزمني، وعمق الاحتياج لتكون على دراية تامة بتفاصيل كل فرصة.'
                : "Every lead is scored on decision maker verification, company size, budget, timeline, and depth of need, so you always know exactly what you're walking into."}
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto pb-16 sm:pb-24 lg:pb-36">
            {tiers.map((tier, idx) => {
              const config = CARD_CONFIGS[idx] || CARD_CONFIGS[0];
              return (
                <div
                  key={tier.step}
                  className={`sticky ${config.topClass} ${config.zIndexClass} ${config.spacingClass}`}
                >
                  <m.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: dur.base, delay: idx * 0.05, ease: ease.out }}
                  >
                    <CardTilt3D maxTilt={4} glareOpacity={0.12} className="w-full">
                      <Spotlight
                        radius={340}
                        className={`relative overflow-hidden bg-[#0F1013] border border-[#26282D] hover:border-orange-500/40 text-white rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-7 lg:p-10 ${config.shadowClass} backdrop-blur-xl transition-[border-color,box-shadow] duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]`}
                      >
                        <BorderGlow glowColor="rgba(255, 92, 0, 0.22)" size={320} opacity={0.6} />
                        {idx === 0 && (
                          <BorderBeam size={260} duration={10} colorFrom="#FF5C00" colorTo="#FFA066" />
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xs:gap-5 sm:gap-8 items-center relative z-10">
                          {/* Left Details */}
                          <div className="lg:col-span-7 space-y-2.5 xs:space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-1.5 xs:gap-2">
                              <span className="px-2 xs:px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] xs:text-xs font-bold font-mono bg-white/[0.08] text-white border border-[#26282D]">
                                {tier.step}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2 xs:px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] xs:text-xs font-semibold bg-orange-500/10 text-[#FF5C00] border border-orange-500/30">
                                <Signal tone="orange" size={14} speed={1 - idx * 0.12} />
                                <span>{tier.badge}</span>
                              </span>
                            </div>

                            <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-snug font-heading">
                              {tier.title}
                            </h3>

                            <p className="text-xs sm:text-sm lg:text-base text-neutral-400 leading-relaxed font-sans">
                              {tier.description}
                            </p>

                            {tier.isCtaCard && (
                              <div className="pt-2">
                                <Magnetic strength={0.22} activeDistance={35}>
                                  <Link
                                    href={`/${lang}/for-providers/apply`}
                                    className="w-full xs:w-auto inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-xs xs:text-sm shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
                                  >
                                    <span>{isAr ? 'قدم للانضمام إلى الشراكة' : 'Apply for partnership'}</span>
                                    <ArrowRight size={16} className="ms-2 rtl:-scale-x-100" />
                                  </Link>
                                </Magnetic>
                              </div>
                            )}
                          </div>

                          {/* Right Preview Card */}
                          <div className="lg:col-span-5">
                            <div className="rounded-xl sm:rounded-2xl bg-[#16171B] border border-[#26282D] p-3.5 xs:p-4 sm:p-6 space-y-2.5 xs:space-y-3 sm:space-y-4 text-white">
                              <div className="text-[10px] xs:text-[11px] sm:text-xs font-semibold text-neutral-400 tracking-wide uppercase">
                                {tier.project}
                              </div>

                              <div>
                                <div className="flex justify-between text-[11px] xs:text-xs font-semibold text-neutral-300 mb-1 sm:mb-1.5">
                                  <span>{isAr ? 'دقة التطابق' : 'Match Accuracy'}</span>
                                  <span className="font-bold text-[#FF5C00] tabular-nums">{tier.accuracy}</span>
                                </div>
                                <div className="h-1.5 sm:h-2 w-full rounded-full bg-white/10 overflow-hidden">
                                  <div className={`h-full rounded-full ${tier.barColor} ${tier.barWidth} transition-all duration-500`} />
                                </div>
                              </div>

                              <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2 pt-1 text-[11px] xs:text-xs text-neutral-300">
                                {tier.checklist.map((item, cIdx) => (
                                  <li key={cIdx} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5C00] shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Spotlight>
                    </CardTilt3D>
                  </m.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Section 5: Partnership & Insights
  const exp = dict?.experience_cards;
  const fallbackCards = isAr ? EXPERIENCE_CARDS_AR : EXPERIENCE_CARDS_EN;

  return (
    <section
      data-nav-light="true"
      data-nav-theme="light"
      className="relative py-16 sm:py-24 lg:py-32 bg-white text-neutral-900 border-t border-neutral-200"
    >
      {/* ambient glow */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neutral-900/[0.02] blur-[180px] pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-3.5 xs:px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 xs:mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-950 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
            <span>{isAr ? 'خيارات الشراكة والتعاون' : 'COLLABORATION PATHWAYS'}</span>
          </div>

          <TextReveal
            as="h2"
            text={exp?.title || (isAr ? 'ابدأ برؤى وأبحاث مدروسة. اعقد شراكات تثمر أثراً حقيقياً.' : 'Start with Our Insights. Partner for Real Impact.')}
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-950 tracking-[-0.03em] leading-tight font-heading"
          />
          <p className="mt-3 xs:mt-4 text-sm xs:text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto font-sans">
            {exp?.subtitle ||
              (isAr
                ? 'لا نكتفي بربط احتياجات الشركات مع خبراء التدريب المعتمدين على أرض الواقع. استكشف مدونتنا للاطلاع على أطر عمل وأدلة مجانية، وعندما تكون جاهزاً، نوصلك مباشرة بالشريك الأنسب.'
                : "We don't just bridge corporate needs with expert providers on the ground. Explore our blog for free, in depth L&D guides, regional skill benchmarks, and diagnostic frameworks, and whenever you're ready, let us match you directly with the verified training experts who execute the solution.")}
          </p>

          {/* Top Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 xs:gap-3.5 sm:gap-4 mt-6 xs:mt-8">
            <Magnetic strength={0.22} activeDistance={35}>
              <a
                href="https://blog.pontlook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 xs:px-7 py-2.5 xs:py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300 font-medium text-xs xs:text-sm shadow-xs active:scale-[0.98] transition-all"
              >
                <span>{exp?.btn_blog || (isAr ? 'استكشف المدونة والموارد' : 'Explore the Blog & Resources')}</span>
                <ArrowRight size={16} className="ms-2 rtl:-scale-x-100" />
              </a>
            </Magnetic>

            <Magnetic strength={0.22} activeDistance={35}>
              <Link
                href={`/${lang}/find-training`}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 xs:px-7 py-2.5 xs:py-3.5 rounded-2xl bg-neutral-950 hover:bg-black text-white font-medium text-xs xs:text-sm shadow-lg shadow-neutral-900/10 active:scale-[0.98] transition-all"
              >
                <span>{exp?.btn_match || (isAr ? 'ابدأ الربط للتدريب' : 'Get Matched for Training')}</span>
                <ArrowRight size={16} className="ms-2 rtl:-scale-x-100" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Sticky Stacked Style Cards (Full responsive sticky animation on both mobile & desktop) */}
        <div className="relative max-w-5xl mx-auto pb-16 sm:pb-24 lg:pb-36">
          {fallbackCards.map((card, idx) => {
            const config = CARD_CONFIGS[idx] || CARD_CONFIGS[0];
            const dictCard = exp?.cards?.[card.id as 'provider' | 'enterprise' | 'hub' | 'consultation'];

            const title = dictCard?.title || card.title;
            const subtitle = dictCard?.subtitle || card.subtitle;
            const badgePersona = dictCard?.badgePersona || card.badgePersona;
            const badgeOption = dictCard?.badgeOption || card.badgeOption;
            const previewHeader = dictCard?.previewHeader || card.previewHeader;
            const metricLabel = dictCard?.metricLabel || card.metricLabel;
            const metricValue = dictCard?.metricValue || card.metricValue;
            const metricWidth = dictCard?.metricWidth || card.metricWidth;
            const checklist: string[] = (dictCard?.checklist as string[]) || card.checklist;
            const cta = dictCard?.cta || card.cta;
            const href = dictCard?.href || card.href;
            const isExternal = card.isExternal || href.startsWith('http');

            const theme = card.clayTheme;

            return (
              <div
                key={card.id}
                className={`sticky ${config.topClass} ${config.zIndexClass} ${config.spacingClass}`}
              >
                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: dur.base, delay: idx * 0.05, ease: ease.out }}
                >
                  <CardTilt3D maxTilt={4} glareOpacity={0.06} className="w-full">
                    <Spotlight
                      radius={340}
                      className={`relative overflow-hidden ${theme.bgClass} ${theme.borderClass} border rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-7 ${config.shadowClass} backdrop-blur-xl transition-[border-color,box-shadow] duration-300`}
                    >
                      <BorderGlow glowColor="rgba(255, 92, 0, 0.15)" size={320} opacity={0.35} />
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center relative z-10">
                      {/* Left Details */}
                      <div className="lg:col-span-7 space-y-3 xs:space-y-4">
                        {/* Layered Rounded Pill Badges */}
                        <div className="inline-flex items-center p-1 rounded-full border border-neutral-200 bg-neutral-50 shadow-xs gap-1.5 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] xs:text-[11px] font-semibold ${theme.pillOuter}`}>
                            {badgeOption}
                          </span>
                          <span className={`px-2.5 xs:px-3 py-0.5 rounded-full text-[10px] xs:text-[11px] font-medium ${theme.pillInner}`}>
                            {badgePersona}
                          </span>
                        </div>

                        <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-neutral-950 tracking-tight leading-snug font-heading">
                          {title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
                          {subtitle}
                        </p>

                        <div className="pt-1">
                          <Magnetic strength={0.2} activeDistance={30}>
                            {isExternal ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full xs:w-auto inline-flex items-center justify-center px-4 xs:px-5 py-2 xs:py-2.5 rounded-xl ${theme.buttonClass} font-medium text-xs sm:text-sm transition-all`}
                              >
                                <span>{cta}</span>
                                <ArrowRight size={15} className="ms-2 rtl:-scale-x-100" />
                              </a>
                            ) : (
                              <Link
                                href={href.startsWith('http') ? href : `/${lang}${href}`}
                                className={`w-full xs:w-auto inline-flex items-center justify-center px-4 xs:px-5 py-2 xs:py-2.5 rounded-xl ${theme.buttonClass} font-medium text-xs sm:text-sm transition-all`}
                              >
                                <span>{cta}</span>
                                <ArrowRight size={15} className="ms-2 rtl:-scale-x-100" />
                              </Link>
                            )}
                          </Magnetic>
                        </div>
                      </div>

                      {/* Right Preview Card */}
                      <div className="lg:col-span-5">
                        <div className={`rounded-xl sm:rounded-2xl ${theme.innerCardBg} ${theme.innerCardBorder} border p-3 xs:p-4 sm:p-5 space-y-2.5 xs:space-y-3 shadow-md`}>
                          <div className="text-[10px] xs:text-[11px] font-semibold text-neutral-500 tracking-wide uppercase">
                            {previewHeader}
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-semibold text-neutral-600 mb-1">
                              <span>{metricLabel}</span>
                              <span className="font-bold text-neutral-950 tabular-nums">{metricValue}</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-neutral-200 overflow-hidden">
                              <div className={`h-full rounded-full ${theme.meterColor} ${metricWidth}`} />
                            </div>
                          </div>

                          <ul className="space-y-1.5 pt-1 text-xs text-neutral-700">
                            {checklist.map((item: string, cIdx: number) => (
                              <li key={cIdx} className="flex items-start gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 mt-1 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Spotlight>
                </CardTilt3D>
              </m.div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}

