'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { useParams } from 'next/navigation';

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
    step: 'Step 1',
    badge: 'Hot · 95% Match',
    title: 'High intent enterprise demand with confirmed budget',
    description: 'Verified decision maker, confirmed budget, starts within 30 days.',
    project: 'Riyadh Enterprise · Project #01',
    accuracy: '95%',
    barColor: 'bg-blue-600',
    barWidth: 'w-[95%]',
    checklist: [
      'Verified Decision Maker (CHRO)',
      'Confirmed Budget (SAR 300k+)',
      'Immediate 30 Day Window'
    ]
  },
  {
    step: 'Step 2',
    badge: 'Warm · 80% Match',
    title: 'Confirmed workforce pain; budget & timeline forming',
    description: 'Confirmed pain and authority; budget or timeline still forming. We stay engaged to pass the lead when ready.',
    project: 'Dubai Enterprise · Project #02',
    accuracy: '80%',
    barColor: 'bg-amber-500',
    barWidth: 'w-[80%]',
    checklist: [
      'Executive Authority Validated',
      '500+ Enterprise Workforce',
      'Budget Staged for Q3'
    ]
  },
  {
    step: 'Step 3',
    badge: 'Qualified · 60% Match',
    title: 'Genuine need verified; earlier in the buying journey',
    description: 'Genuine need verified; earlier in the buying journey.',
    project: 'Doha Enterprise · Project #03',
    accuracy: '60%',
    barColor: 'bg-blue-500',
    barWidth: 'w-[60%]',
    checklist: [
      'Strategic Training Need Identified',
      'Banking & Financial Sector',
      'Early Positioning Window'
    ]
  },
  {
    step: 'Step 4',
    badge: 'Partnership Model',
    title: 'Explore the partnership: Predictable enterprise client pipeline',
    description: 'Every lead is verified before introduction. Zero monthly retainers, 5 lead proof of concept pilot, and a 5 day replacement guarantee.',
    project: 'Enterprise Provider Partnership',
    accuracy: '100% Guaranteed',
    barColor: 'bg-[#FF5C00]',
    barWidth: 'w-full',
    checklist: [
      'Pay Per Qualified Lead ($0 Retainer)',
      'Direct Access to C Suite & HR Directors',
      'Full Lead Intelligence Report Included'
    ],
    isCtaCard: true
  }
];

const TIERS_AR: TierData[] = [
  {
    step: 'المرحلة 1',
    badge: 'فرصة مؤكدة · دقة 95%',
    title: 'احتياج تدريبي نشط وموثق لدى صانع قرار معتمد',
    description: 'صانع قرار تنفيذي مؤكد، متطلب تدريبي قائم، استعداد وجاهزية تامة للتواصل والنقاش.',
    project: 'جهة مصرفية كبرى بالرياض · فرصة #01',
    accuracy: '95%',
    barColor: 'bg-emerald-500',
    barWidth: 'w-[95%]',
    checklist: [
      'صانع قرار تنفيذي معتمد',
      'احتياج تدريبي نشط ومحدد',
      'صلاحية تفاوض وميزانية قائمة'
    ]
  },
  {
    step: 'المرحلة 2',
    badge: 'فرصة قيد الإعداد · دقة 80%',
    title: 'مبادرة تدريب وتطوير مخططة للربع القادم',
    description: 'مبادرة معتمدة وتحدي مؤسسي واضح؛ قيد إعداد خطة التنفيذ للشهر القادم.',
    project: 'مجموعة قابضة في دبي · فرصة #02',
    accuracy: '80%',
    barColor: 'bg-amber-500',
    barWidth: 'w-[80%]',
    checklist: [
      'صلاحية القرار معتمدة',
      'فريق عمل مؤسسي يتجاوز 500 موظف',
      'ميزانية مخصصة للربع الثالث'
    ]
  },
  {
    step: 'المرحلة 3',
    badge: 'فرصة مبكرة · دقة 60%',
    title: 'احتياج تدريبي حقيقي في مرحلة التخطيط الأولي',
    description: 'احتياج حقيقي تم التحقق منه؛ في مرحلة مبكرة من رحلة الشراء والتعاقد.',
    project: 'مؤسسة في الدوحة · فرصة #03',
    accuracy: '60%',
    barColor: 'bg-blue-500',
    barWidth: 'w-[60%]',
    checklist: [
      'تحديد احتياج تدريبي استراتيجي',
      'قطاع البنوك والخدمات المالية',
      'نافذة تواصل مبكرة وبناء علاقة'
    ]
  },
  {
    step: 'المرحلة 4',
    badge: 'نموذج الشراكة',
    title: 'استكشف نموذج الشراكة: تدفق مستمر لفرص الشركات والمؤسسات',
    description: 'كل فرصة يتم التحقق منها قبل تقديمها. بدون رسوم شهرية ثابتة، تجربة قيادية لـ 5 فرص، وضمان استبدال الفرصة خلال 5 أيام.',
    project: 'شراكة مزودي التدريب المعتمدين',
    accuracy: 'ضمان 100%',
    barColor: 'bg-emerald-500',
    barWidth: 'w-full',
    checklist: [
      'دفع لكل فرصة مؤهلة ($0 رسوم اشتراك)',
      'وصول مباشر لصناع القرار ورؤساء الموارد البشرية',
      'تقرير معلوماتي وتحليلي متكامل لكل فرصة'
    ],
    isCtaCard: true
  }
];

const CARD_CONFIGS = [
  {
    zIndexClass: 'z-10',
    spacingClass: 'mb-6 sm:mb-8',
    shadowClass: 'shadow-xl shadow-[0_-8px_30px_rgba(0,0,0,0.06)]'
  },
  {
    zIndexClass: 'z-20',
    spacingClass: 'mb-6 sm:mb-8',
    shadowClass: 'shadow-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]'
  },
  {
    zIndexClass: 'z-30',
    spacingClass: 'mb-6 sm:mb-8',
    shadowClass: 'shadow-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]'
  },
  {
    zIndexClass: 'z-40',
    spacingClass: '',
    shadowClass: 'shadow-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.1)]'
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
    textHeading: string;
    textBody: string;
    pillOuter: string;
    pillInner: string;
    pillText: string;
    buttonClass: string;
    innerCardBg: string;
    innerCardBorder: string;
    meterColor: string;
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
      'Zero Cold Prospecting: Qualified demand delivered to you',
    ],
    cta: 'Join the Provider Network',
    href: '/for-providers',
    isExternal: false,
    clayTheme: {
      bgClass: 'bg-[#F7F9E8]',
      borderClass: 'border-[#DCE59B]',
      textHeading: 'text-[#1C2307]',
      textBody: 'text-[#44501D]',
      pillOuter: 'bg-[#EBF0C2] border-[#DCE59B]',
      pillInner: 'bg-white/85 border-[#DCE59B]',
      pillText: 'text-[#3E4A14]',
      buttonClass: 'bg-[#3E4A14] hover:bg-[#2B350A] text-white shadow-md shadow-[#3E4A14]/20',
      innerCardBg: 'bg-white/95',
      innerCardBorder: 'border-[#DCE59B]',
      meterColor: 'bg-[#5C701B]',
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
      'Zero Procurement Risk: Transparent, competitive proposals',
    ],
    cta: 'Get Matched for Training',
    href: '/find-training',
    isExternal: false,
    clayTheme: {
      bgClass: 'bg-[#FDF2F8]',
      borderClass: 'border-[#F5D0FE]',
      textHeading: 'text-[#38093C]',
      textBody: 'text-[#701A75]',
      pillOuter: 'bg-[#FCE7F3] border-[#F5D0FE]',
      pillInner: 'bg-white/85 border-[#F5D0FE]',
      pillText: 'text-[#701A75]',
      buttonClass: 'bg-[#701A75] hover:bg-[#531057] text-white shadow-md shadow-[#701A75]/20',
      innerCardBg: 'bg-white/95',
      innerCardBorder: 'border-[#F5D0FE]',
      meterColor: 'bg-[#A21CAF]',
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
      bgClass: 'bg-[#F0F9FF]',
      borderClass: 'border-[#BAE6FD]',
      textHeading: 'text-[#082F49]',
      textBody: 'text-[#0C4A6E]',
      pillOuter: 'bg-[#E0F2FE] border-[#BAE6FD]',
      pillInner: 'bg-white/85 border-[#BAE6FD]',
      pillText: 'text-[#0369A1]',
      buttonClass: 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-md shadow-[#0284C7]/20',
      innerCardBg: 'bg-white/95',
      innerCardBorder: 'border-[#BAE6FD]',
      meterColor: 'bg-[#0284C7]',
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
      bgClass: 'bg-[#FFF7ED]',
      borderClass: 'border-[#FED7AA]',
      textHeading: 'text-[#431407]',
      textBody: 'text-[#7C2D12]',
      pillOuter: 'bg-[#FFEDD5] border-[#FED7AA]',
      pillInner: 'bg-white/85 border-[#FED7AA]',
      pillText: 'text-[#C2410C]',
      buttonClass: 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-md shadow-[#EA580C]/20',
      innerCardBg: 'bg-white/95',
      innerCardBorder: 'border-[#FED7AA]',
      meterColor: 'bg-[#EA580C]',
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
      bgClass: 'bg-[#F7F9E8]',
      borderClass: 'border-[#DCE59B]',
      textHeading: 'text-[#1C2307]',
      textBody: 'text-[#44501D]',
      pillOuter: 'bg-[#EBF0C2] border-[#DCE59B]',
      pillInner: 'bg-white/85 border-[#DCE59B]',
      pillText: 'text-[#3E4A14]',
      buttonClass: 'bg-[#3E4A14] hover:bg-[#2B350A] text-white shadow-md shadow-[#3E4A14]/20',
      innerCardBg: 'bg-white/95',
      innerCardBorder: 'border-[#DCE59B]',
      meterColor: 'bg-[#5C701B]',
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
      bgClass: 'bg-[#FDF2F8]',
      borderClass: 'border-[#F5D0FE]',
      textHeading: 'text-[#38093C]',
      textBody: 'text-[#701A75]',
      pillOuter: 'bg-[#FCE7F3] border-[#F5D0FE]',
      pillInner: 'bg-white/85 border-[#F5D0FE]',
      pillText: 'text-[#701A75]',
      buttonClass: 'bg-[#701A75] hover:bg-[#531057] text-white shadow-md shadow-[#701A75]/20',
      innerCardBg: 'bg-white/95',
      innerCardBorder: 'border-[#F5D0FE]',
      meterColor: 'bg-[#A21CAF]',
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
      bgClass: 'bg-[#F0F9FF]',
      borderClass: 'border-[#BAE6FD]',
      textHeading: 'text-[#082F49]',
      textBody: 'text-[#0C4A6E]',
      pillOuter: 'bg-[#E0F2FE] border-[#BAE6FD]',
      pillInner: 'bg-white/85 border-[#BAE6FD]',
      pillText: 'text-[#0369A1]',
      buttonClass: 'bg-[#0284C7] hover:bg-[#0369A1] text-white shadow-md shadow-[#0284C7]/20',
      innerCardBg: 'bg-white/95',
      innerCardBorder: 'border-[#BAE6FD]',
      meterColor: 'bg-[#0284C7]',
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
      bgClass: 'bg-[#FFF7ED]',
      borderClass: 'border-[#FED7AA]',
      textHeading: 'text-[#431407]',
      textBody: 'text-[#7C2D12]',
      pillOuter: 'bg-[#FFEDD5] border-[#FED7AA]',
      pillInner: 'bg-white/85 border-[#FED7AA]',
      pillText: 'text-[#C2410C]',
      buttonClass: 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-md shadow-[#EA580C]/20',
      innerCardBg: 'bg-white/95',
      innerCardBorder: 'border-[#FED7AA]',
      meterColor: 'bg-[#EA580C]',
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
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight font-heading">
              {isAr ? 'تدفق متوقع لفرص الشركات والمؤسسات' : 'A predictable pipeline of enterprise opportunities'}
            </h2>
            <p className="mt-4 text-base text-slate-600">
              {isAr
                ? 'يتم تقييم كل فرصة بناءً على التحقق من صانع القرار، وحجم الشركة، والميزانية، والجدول الزمني، وعمق الاحتياج لتكون على دراية تامة بتفاصيل كل فرصة.'
                : "Every lead is scored on decision maker verification, company size, budget, timeline, and depth of need, so you always know exactly what you're walking into."}
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto pb-6">
            {tiers.map((tier, idx) => {
              const config = CARD_CONFIGS[idx] || CARD_CONFIGS[0];
              return (
                <div
                  key={tier.step}
                  className={`sticky top-28 ${config.zIndexClass} ${config.spacingClass} liquid-glass-panel rounded-3xl p-6 sm:p-10 ${config.shadowClass} transition-transform duration-200`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Details */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                          {tier.step}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {tier.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight leading-snug font-heading">
                        {tier.title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                        {tier.description}
                      </p>

                      {tier.isCtaCard && (
                        <div className="pt-2">
                          <Link
                            href={`/${lang}/for-providers/apply`}
                            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-medium shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 active:scale-[0.98] transition-all"
                          >
                            <span>{isAr ? 'قدم للانضمام إلى الشراكة' : 'Apply for partnership'}</span>
                            <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Right Preview Card */}
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl liquid-glass-panel-inset p-6 space-y-4">
                        <div className="text-xs font-semibold text-slate-500 tracking-wide uppercase font-mono">
                          {tier.project}
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                            <span>{isAr ? 'دقة التطابق' : 'Match Accuracy'}</span>
                            <span className="font-mono font-bold text-slate-900">{tier.accuracy}</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                            <div className={`h-full rounded-full ${tier.barColor} ${tier.barWidth}`} />
                          </div>
                        </div>

                        <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                          {tier.checklist.map((item, cIdx) => (
                            <li key={cIdx} className="flex items-center gap-2">
                              <span className="flex-shrink-0 text-emerald-600 font-bold">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Section 5: Start with Our Insights, Partner for Real Impact (Clay.com Cards with White Grid)
  const exp = dict?.experience_cards;
  const fallbackCards = isAr ? EXPERIENCE_CARDS_AR : EXPERIENCE_CARDS_EN;

  return (
    <section
      className="relative py-16 sm:py-24 lg:py-32 bg-white border-t border-slate-200 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, #F1F5F9 1px, transparent 1px), linear-gradient(to bottom, #F1F5F9 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0052FF] text-xs font-semibold uppercase tracking-wider mb-4">
            <span>{isAr ? 'خيارات الشراكة والتعاون' : 'COLLABORATION PATHWAYS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tracking-[-0.03em] leading-tight font-heading">
            {exp?.title || (isAr ? 'ابدأ برؤى وأبحاث مدروسة. اعقد شراكات تثمر أثراً حقيقياً.' : 'Start with Our Insights. Partner for Real Impact.')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-sans">
            {exp?.subtitle ||
              (isAr
                ? 'لا نكتفي بربط احتياجات الشركات مع خبراء التدريب المعتمدين على أرض الواقع. استكشف مدونتنا للاطلاع على أطر عمل وأدلة مجانية، وعندما تكون جاهزاً، نوصلك مباشرة بالشريك الأنسب.'
                : "We don't just bridge corporate needs with expert providers on the ground. Explore our blog for free, in depth L&D guides, regional skill benchmarks, and diagnostic frameworks, and whenever you're ready, let us match you directly with the verified training experts who execute the solution.")}
          </p>

          {/* Top Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-8">
            <a
              href="https://blog.pontlook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl bg-[#0052FF] hover:bg-blue-700 text-white font-medium text-sm shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{exp?.btn_blog || (isAr ? 'استكشف المدونة والموارد' : 'Explore the Blog & Resources')}</span>
              <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
            </a>

            <Link
              href={`/${lang}/find-training`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-2xl bg-white text-slate-800 font-medium text-sm border border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
            >
              <span>{exp?.btn_match || (isAr ? 'ابدأ الربط للتدريب' : 'Get Matched for Training')}</span>
              <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
            </Link>
          </div>
        </div>

        {/* Sticky Stacked Clay.com Style Cards */}
        <div className="relative max-w-5xl mx-auto pb-8 space-y-6 sm:space-y-8">
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
                className={`sticky top-28 ${config.zIndexClass} ${theme.bgClass} ${theme.borderClass} border-2 rounded-3xl p-6 sm:p-10 ${config.shadowClass} transition-all duration-300`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Details */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Layered Rounded Pill Badges (Clay.com style) */}
                    <div className="inline-flex items-center p-1 rounded-full border shadow-2xs gap-1.5 backdrop-blur-xs flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${theme.pillOuter} ${theme.pillText}`}>
                        {badgeOption}
                      </span>
                      <span className={`px-3.5 py-1 rounded-full text-xs font-medium ${theme.pillInner} ${theme.pillText}`}>
                        {badgePersona}
                      </span>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-semibold ${theme.textHeading} tracking-tight leading-snug font-heading`}>
                      {title}
                    </h3>

                    <p className={`text-sm sm:text-base ${theme.textBody} leading-relaxed font-sans`}>
                      {subtitle}
                    </p>

                    <div className="pt-2">
                      {isExternal ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center px-6 py-3.5 rounded-xl ${theme.buttonClass} font-medium text-sm transition-all`}
                        >
                          <span>{cta}</span>
                          <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
                        </a>
                      ) : (
                        <Link
                          href={href.startsWith('http') ? href : `/${lang}${href}`}
                          className={`inline-flex items-center justify-center px-6 py-3.5 rounded-xl ${theme.buttonClass} font-medium text-sm transition-all`}
                        >
                          <span>{cta}</span>
                          <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Right Preview Card */}
                  <div className="lg:col-span-5">
                    <div className={`rounded-2xl ${theme.innerCardBg} ${theme.innerCardBorder} border p-6 space-y-4 shadow-sm`}>
                      <div className="text-xs font-semibold text-slate-500 tracking-wide uppercase font-mono">
                        {previewHeader}
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                          <span>{metricLabel}</span>
                          <span className="font-mono font-bold text-slate-900">{metricValue}</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${theme.meterColor} ${metricWidth}`} />
                        </div>
                      </div>

                      <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                        {checklist.map((item: string, cIdx: number) => (
                          <li key={cIdx} className="flex items-center gap-2">
                            <CheckCircle2 size={15} className="flex-shrink-0 text-emerald-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

