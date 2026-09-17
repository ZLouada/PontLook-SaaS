'use client';

import { useState, useEffect } from 'react';
import {
  Target,
  ShieldCheck,
  Building2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  RotateCw,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';

interface CardTheme {
  border: string;
  modalBorder: string;
  glow: string;
  modalGlow: string;
  accentText: string;
  badgeBg: string;
  iconBg: string;
  buttonBg: string;
  checkColor: string;
  flipHintBg: string;
}

interface CardItem {
  id: string;
  index: string;
  icon: any;
  badge: string;
  title: string;
  angle?: string;
  text: string;
  cta: string;
  href: string;
  isExternal: boolean;
  takeaways: string[];
  mockup: React.ReactNode;
  theme: CardTheme;
}

export default function WhyDifferent() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';
  const c = dict.why_different?.cards;

  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  // Lock body scroll and listen for Escape key when pop-up window is open
  useEffect(() => {
    if (!activeModalId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalId(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalId]);

  const items: CardItem[] = [
    // Card 1: Diagnose Your Skill Gaps (Blue accents)
    {
      id: 'diagnose',
      index: '01',
      icon: Target,
      badge: isAr ? 'التشخيص المهاري' : 'Skill Diagnosis',
      title: c?.diagnose?.title || (isAr ? 'تشخيص دقيق لفجوات الكفاءات والمهارات' : 'Diagnose Your Skill Gaps'),
      angle: isAr ? 'تحويل الاحتياجات العامة إلى أولويات تدريبية واضحة' : 'Actionable Workforce Gap Analysis',
      text:
        c?.diagnose?.text ||
        (isAr
          ? 'نساعدك على تحديد الفجوات الحقيقية في الكفاءات عبر مختلف فرق العمل في منشأتك، وتحويل الطلبات غير الدقيقة إلى خطط تطوير واضحة ومجدية.'
          : 'We help you identify hidden capability gaps and workforce challenges across your teams, turning vague training requests into clear, actionable development priorities.'),
      cta: c?.diagnose?.cta || (isAr ? 'استكشف أدلة ومقالات التعلم والتطوير' : 'Explore our L&D guides & blog'),
      href: 'https://blog.pontlook.com',
      isExternal: true,
      takeaways: [
        isAr ? 'تحليل عميق لاحتياجات الفرق التنفيذية' : 'Deep departmental skill gap discovery',
        isAr ? 'تحديد أولويات البرامج ذات الأثر المباشر' : 'Prioritized ROI focused learning roadmaps',
        isAr ? 'تجنب هدر الميزانيات في تدريب غير مجدٍ' : 'Zero wasted corporate training budget',
      ],
      theme: {
        border: 'border-blue-500/25 hover:border-blue-500/50',
        modalBorder: 'border-blue-500/40',
        glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]',
        modalGlow: 'shadow-[0_0_60px_rgba(59,130,246,0.25)]',
        accentText: 'text-blue-400',
        badgeBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
        iconBg: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
        buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30',
        checkColor: 'text-blue-400',
        flipHintBg: 'bg-blue-500/10 text-blue-300 border-blue-500/25 group-hover:bg-blue-500/20',
      },
      mockup: (
        <div className="bg-white/[0.02] rounded-xl border border-white/[0.08] w-full p-3 sm:p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                <Target size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {c?.diagnose?.mockupHeader || (isAr ? 'تقييم فجوات الكفاءات' : 'Skill Gap Assessment')}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {c?.diagnose?.mockupSubheader || (isAr ? 'مستوى الإدارات المؤسسية' : 'Enterprise Department Level')}
                </div>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 text-[10px] font-mono font-semibold border border-blue-500/30">
              {c?.diagnose?.tag1 || (isAr ? '# فجوات القيادة والتقنية' : '# Leadership & Tech Gaps')}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30">
              {c?.diagnose?.tag2 || (isAr ? 'خارطة طريق معتمدة' : 'Priority Roadmap')}
            </span>
          </div>
        </div>
      ),
    },

    // Card 2: Matched Directly with the Right Training Partner (Emerald accents)
    {
      id: 'match',
      index: '02',
      icon: ShieldCheck,
      badge: isAr ? 'المطابقة المباشرة' : 'Direct Matching',
      title: c?.match?.title || (isAr ? 'ربط مباشر مع الشريك التدريبي الأنسب' : 'Matched Directly with the Right Training Partner'),
      angle: isAr ? 'بدون عروض تسويقية مزعجة' : 'Zero Cold Sales Pitches',
      text:
        c?.match?.text ||
        (isAr
          ? 'بدون بحث طويل أو عروض بيع عشوائية. نربط متطلباتك الدقيقة مع جهات تدريبية معتمدة ومثبتة النتائج قادرة على تقديم برامج عالية الأثر.'
          : 'No endless searching or cold sales pitches. We match your specific requirements directly with vetted corporate training firms proven to deliver measurable results.'),
      cta: c?.match?.cta || (isAr ? 'احصل على مطابقة تدريبية' : 'Get matched for training'),
      href: `/${lang}/find-training`,
      isExternal: false,
      takeaways: [
        isAr ? 'مطابقة قائمة على سجل الإنجاز وسابقة الأعمال' : 'Vetted track record and proven case studies',
        isAr ? 'محتوى مخصص ومصمم وفق تحديات منشأتك' : 'Customized curriculum tailored to your exact needs',
        isAr ? 'التزام بالمواعيد والميزانية المحددة مسبقاً' : 'Pre confirmed budget and deployment window',
      ],
      theme: {
        border: 'border-emerald-500/25 hover:border-emerald-500/50',
        modalBorder: 'border-emerald-500/40',
        glow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]',
        modalGlow: 'shadow-[0_0_60px_rgba(16,185,129,0.25)]',
        accentText: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        iconBg: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
        buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30',
        checkColor: 'text-emerald-400',
        flipHintBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25 group-hover:bg-emerald-500/20',
      },
      mockup: (
        <div className="bg-white/[0.02] rounded-xl border border-white/[0.08] w-full p-3 sm:p-3.5 flex flex-col gap-2">
          <div className="text-xs font-semibold text-white pb-1.5 border-b border-white/[0.06] flex items-center justify-between">
            <span>{c?.match?.mockupHeader || (isAr ? 'قائمة معايير توافق الشريك' : 'Partner Fit Checklist')}</span>
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
          </div>
          <div className="space-y-1.5 text-[11px] text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span>{c?.match?.check1 || (isAr ? 'متخصص في مجال عمل منشأتك' : 'Specialized in your industry')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span>{c?.match?.check2 || (isAr ? 'سجل تدريبي موثق في المنطقة' : 'Verified delivery track record')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              <span>{c?.match?.check3 || (isAr ? 'متوافق مع جدولك وميزانيتك' : 'Aligned with your timeline & budget')}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 3: Direct Access to Verified Decision Makers (Purple accents)
    {
      id: 'access',
      index: '03',
      icon: Building2,
      badge: isAr ? 'وصول تنفيذي' : 'Executive Access',
      title: c?.access?.title || (isAr ? 'وصول مباشر لصناع القرار المعتمدين' : 'Direct Access to Verified Decision Makers'),
      angle: c?.access?.angle || (isAr ? 'تحدث مباشرة مع أصحاب الميزانيات وصلاحيات التعاقد' : 'Skip the Gatekeepers. Talk Directly to the Budget Owners.'),
      text:
        c?.access?.text ||
        (isAr
          ? 'لا مزيد من إهدار الوقت في التواصل غير المجدي. نصلك مباشرة برؤساء الموارد البشرية ومدراء المواهب والتنفيذيين الذين يملكون سلطة شراء واحتياجات تدريب حقيقية.'
          : 'Stop wasting time with dead end outreach. We connect you directly with CHROs, VPs of Talent, and C Suite executives who hold verified purchasing authority and active L&D needs.'),
      cta: c?.access?.cta || (isAr ? 'انضم كمزود تدريب' : 'Apply as a Provider'),
      href: `/${lang}/for-providers`,
      isExternal: false,
      takeaways: [
        isAr ? 'وصول مباشر إلى صناع القرار التنفيذيين' : 'Direct connection to CHROs and CLOs',
        isAr ? 'ميزانيات معتمدة ومؤكدة بالريال والدرهم' : 'Confirmed corporate budgets in SAR and AED',
        isAr ? 'بدون وسطاء أو رسوم اشتراك شهرية' : 'Zero intermediaries and $0 monthly retainers',
      ],
      theme: {
        border: 'border-purple-500/25 hover:border-purple-500/50',
        modalBorder: 'border-purple-500/40',
        glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.18)]',
        modalGlow: 'shadow-[0_0_60px_rgba(168,85,247,0.25)]',
        accentText: 'text-purple-400',
        badgeBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
        iconBg: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
        buttonBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30',
        checkColor: 'text-purple-400',
        flipHintBg: 'bg-purple-500/10 text-purple-300 border-purple-500/25 group-hover:bg-purple-500/20',
      },
      mockup: (
        <div className="bg-white/[0.02] rounded-xl border border-white/[0.08] w-full p-3 sm:p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 text-[9px] font-semibold uppercase">
              {c?.access?.clientTag || (isAr ? 'جهة مؤسسية · حوكمة ومخاطر' : 'Enterprise Client · GRC')}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 text-[9px] font-mono font-semibold border border-purple-500/30 shrink-0">
              {c?.access?.statusBadge || (isAr ? 'صلاحية الميزانية: مؤكدة' : 'Budget Authority: Confirmed')}
            </span>
          </div>
          <div className="flex items-center gap-2.5 pt-0.5">
            <div className="h-7 w-7 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Building2 size={15} />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold text-white truncate">
                {c?.access?.role || (isAr ? 'رئيس قطاع الموارد البشرية (CHRO)' : 'Chief Human Resources Officer (CHRO)')}
              </div>
              <div className="text-[9px] text-neutral-400 truncate">{isAr ? 'تعاقد مباشر ومؤكد' : 'Verified Direct Engagement'}</div>
            </div>
          </div>
        </div>
      ),
    },

    // Card 4: Clients Ready to Partner (Amber accents)
    {
      id: 'ready',
      index: '04',
      icon: CheckCircle2,
      badge: isAr ? 'جاهزية التعاقد' : 'Ready to Partner',
      title: c?.ready?.title || (isAr ? 'عملاء مستعدون للتعاقد والشراكة' : 'Clients Ready to Partner'),
      angle: isAr ? 'فرص بميزانيات واضحة وأهداف محددة' : 'Active Purchasing Intent',
      text:
        c?.ready?.text ||
        (isAr
          ? 'نقدر خبرتكم وتخصصكم. بدلاً من الفرص التخمينية، نقدم لكم منظمات جادة جاهزة للاستثمار بميزانيات محددة وأهداف دقيقة لضمان شراكة ناجحة للطرفين.'
          : 'We respect your expertise. Instead of speculative leads, we bring you serious organizations that are ready to invest, with defined budgets and clear goals, creating partnerships where both sides succeed.'),
      cta: c?.ready?.cta || (isAr ? 'تواصل مع عملاء جاهزين' : 'Connect with Ready Clients'),
      href: `/${lang}/for-providers`,
      isExternal: false,
      takeaways: [
        isAr ? 'فرص تدريبية مؤكدة وجاهزة للبدء' : 'Verified immediate enterprise opportunities',
        isAr ? 'ضمان استبدال الفرصة غير المتوافقة' : '5 day lead replacement guarantee',
        isAr ? 'دفع حصري لكل فرصة مؤهلة' : 'Strict pay per qualified lead model',
      ],
      theme: {
        border: 'border-amber-500/25 hover:border-amber-500/50',
        modalBorder: 'border-amber-500/40',
        glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]',
        modalGlow: 'shadow-[0_0_60px_rgba(245,158,11,0.25)]',
        accentText: 'text-amber-400',
        badgeBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
        iconBg: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
        buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30',
        checkColor: 'text-amber-400',
        flipHintBg: 'bg-amber-500/10 text-amber-300 border-amber-500/25 group-hover:bg-amber-500/20',
      },
      mockup: (
        <div className="bg-white/[0.02] rounded-xl border border-white/[0.08] w-full p-3 sm:p-3.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.06] text-xs font-semibold text-white">
            <span>{c?.ready?.mockupHeader || (isAr ? 'جاهزية الشراكة | مؤكدة' : 'Partnership Readiness | Confirmed')}</span>
            <CheckCircle2 size={13} className="text-amber-400 shrink-0" />
          </div>
          <div className="space-y-1 text-[10px] sm:text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">{c?.ready?.needLabel || (isAr ? 'الاحتياج التدريبي' : 'Client Need')}</span>
              <span className="font-semibold text-white">{c?.ready?.needVal || (isAr ? 'برنامج القيادة التنفيذية' : 'Leadership Track')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">{c?.ready?.budgetLabel || (isAr ? 'الميزانية المعتمدة' : 'Budget')}</span>
              <span className="font-mono font-bold text-amber-400">{c?.ready?.budgetVal || 'Confirmed ($50k to $100k)'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400">{c?.ready?.fitLabel || (isAr ? 'التوافق' : 'Mutual Fit')}</span>
              <span className="text-neutral-300">{c?.ready?.fitVal || (isAr ? 'توافق كامل' : '100% Verified')}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 5: L&D Knowledge Hub (Cyan accents)
    {
      id: 'hub',
      index: '05',
      icon: BookOpen,
      badge: isAr ? 'مركز المعرفة' : 'Knowledge Hub',
      title: c?.hub?.title || (isAr ? 'مركز المعرفة والأبحاث التدريبية' : 'L&D Knowledge Hub'),
      angle: isAr ? 'أدلة مجانية ودراسات سوقية موثوقة' : 'Free Practical Frameworks & Benchmarks',
      text:
        c?.hub?.text ||
        (isAr
          ? 'نحلل باستمرار اتجاهات التدريب المؤسسي في المنطقة ونشارك حلولاً عملية وأدلة مجانية على مدونتنا، لمساعدة مسؤولي التطوير على اتخاذ قرارات تدريبية مدروسة.'
          : 'We continuously analyze corporate training trends across the region and share fresh, actionable insights on our blog, providing free frameworks, guides, and research to help you make smarter L&D decisions.'),
      cta: c?.hub?.cta || (isAr ? 'استكشف المدونة والموارد' : 'Explore our blog & resources'),
      href: 'https://blog.pontlook.com',
      isExternal: true,
      takeaways: [
        isAr ? 'أدلة تدقيق وتحليل التعلم والتطوير خطوة بخطوة' : 'Step by step L&D audit frameworks',
        isAr ? 'تقارير دورية حول اتجاهات الرواتب والمهارات' : 'Regional workforce shortage benchmarks',
        isAr ? 'دراسات حالة حول قياس أثر التدريب وعائده' : 'Practical case studies on training ROI',
      ],
      theme: {
        border: 'border-cyan-500/25 hover:border-cyan-500/50',
        modalBorder: 'border-cyan-500/40',
        glow: 'hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]',
        modalGlow: 'shadow-[0_0_60px_rgba(6,182,212,0.25)]',
        accentText: 'text-cyan-400',
        badgeBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
        iconBg: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
        buttonBg: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30',
        checkColor: 'text-cyan-400',
        flipHintBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25 group-hover:bg-cyan-500/20',
      },
      mockup: (
        <div className="bg-white/[0.02] rounded-xl border border-white/[0.08] w-full p-3 sm:p-3.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-white/[0.06] text-xs font-semibold text-white">
            <span>{c?.hub?.mockupHeader || (isAr ? 'أحدث أدلة ومقالات المنصة' : 'Latest L&D Resources')}</span>
            <BookOpen size={13} className="text-cyan-400 shrink-0" />
          </div>
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
              <span className="text-white truncate">
                {c?.hub?.item1Title || (isAr ? 'تقرير فجوات مهارات سوق العمل الخليجي' : 'GCC Workforce Skill Gaps Report')}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-mono font-bold shrink-0 border border-cyan-500/30">
                {c?.hub?.item1Badge || (isAr ? 'دليل جديد' : 'New Guide')}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
              <span className="text-white truncate">
                {c?.hub?.item2Title || (isAr ? 'دليل تشخيص العائد على التدريب المؤسسي' : 'Diagnostic Guide to Corporate Training ROI')}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[9px] font-mono font-bold shrink-0 border border-emerald-500/30">
                {c?.hub?.item2Badge || (isAr ? 'مورد مجاني' : 'Free Resource')}
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const activeCard = items.find((it) => it.id === activeModalId);

  return (
    <section
      data-nav-dark="true"
      className="relative bg-[#000000] text-white py-12 sm:py-16 lg:py-20 border-t border-[#1F1F1F]"
    >
      <div className="container-site relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>{dict.why_different?.eyebrow || (isAr ? 'تحليلات سوقية قابلة للتنفيذ' : 'ACTIONABLE MARKET INTELLIGENCE')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-[-0.03em] leading-tight font-heading">
            {dict.why_different?.title || (isAr ? 'حلول حقيقية على مدونتنا. تعاقدات موثقة على منصتنا.' : 'Real Solutions on Our Blog. Verified Connections on Our Platform.')}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed max-w-2xl mx-auto">
            {dict.why_different?.subtitle ||
              (isAr
                ? 'نحلل التحديات المؤسسية الحقيقية لنقدم أدلة مجانية قابلة للتطبيق، ونربط قادة التدريب مباشرة بمزودي البرامج المعتمدين والمؤهلين لتنفيذ الحل.'
                : 'We analyze real GCC workplace challenges to deliver free, actionable problem solving guides on our blog, and directly connect corporate leaders with the verified training providers ready to implement the solution.')}
          </p>

          <div className="pt-1 flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-mono">
            <RotateCw size={12} className="text-blue-400 animate-spin-slow" />
            <span>{isAr ? 'انقر على أي بطاقة للقلب وفتح نافذة التفاصيل' : 'Click any card to flip & pop up detail window'}</span>
          </div>
        </div>

        {/* 5 Side-by-Side Cards (Pure AMOLED Black with Distinct Colored Accents) */}
        <div className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-none items-stretch">
          {items.map((it) => {
            const Icon = it.icon;
            const isSelected = activeModalId === it.id;
            const theme = it.theme;

            return (
              <div
                key={it.id}
                className="relative w-[85vw] sm:w-[320px] lg:w-auto shrink-0 lg:shrink snap-center [perspective:1200px] h-[390px] sm:h-[410px]"
                onClick={() => setActiveModalId(it.id)}
              >
                <m.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    rotateY: isSelected ? (isAr ? -180 : 180) : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`group relative w-full h-full rounded-2xl bg-[#08080A] border ${theme.border} p-4 sm:p-5 flex flex-col justify-between cursor-pointer select-none shadow-lg transition-all duration-300 ${theme.glow} transform-gpu`}
                >
                  {/* Card Front Top */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`h-9 w-9 rounded-xl ${theme.iconBg} border flex items-center justify-center font-bold shadow-sm`}>
                        <Icon size={18} />
                      </div>
                      <span className="text-xs font-mono font-bold text-neutral-500 tracking-wider">
                        {it.index}
                      </span>
                    </div>

                    {/* Category pill badge */}
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${theme.badgeBg}`}>
                        {it.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-[15px] font-semibold text-white font-heading leading-snug tracking-tight">
                      {it.title}
                    </h3>

                    {/* Subtitle / Angle */}
                    {it.angle && (
                      <p className={`text-[11px] font-mono leading-snug ${theme.accentText}`}>
                        {it.angle}
                      </p>
                    )}

                    {/* Teaser Preview */}
                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed line-clamp-3">
                      {it.text}
                    </p>
                  </div>

                  {/* Card Front Bottom: Flip & Pop-up Trigger Button */}
                  <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {isAr ? 'نافذة تفاعلية' : 'Interactive window'}
                    </span>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all ${theme.flipHintBg}`}>
                      <span>{isAr ? 'افتح النافذة' : 'Flip & open'}</span>
                      <RotateCw size={11} className="transition-transform group-hover:rotate-180" />
                    </div>
                  </div>
                </m.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* POP-UP WINDOW (MODAL DIALOG WITH FLIP-IN ANIMATION & PURE BLACK BACKGROUND) */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop (Click in empty space to return to normal card) */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveModalId(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Pop-up Window with 3D Flip & Pop-up spring animation */}
            <m.div
              initial={{
                opacity: 0,
                scale: 0.82,
                rotateY: isAr ? -50 : 50,
                y: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateY: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.82,
                rotateY: isAr ? 50 : -50,
                y: 25,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 26,
              }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
              className={`relative z-10 w-full max-w-2xl sm:max-w-3xl rounded-2xl sm:rounded-3xl bg-[#060608] border ${activeCard.theme.modalBorder} p-5 sm:p-7 text-white shadow-2xl ${activeCard.theme.modalGlow} my-auto overflow-hidden transform-gpu`}
            >
              {/* Top Bar: Icon, Badge, Angle & Close X Button */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className={`h-8 w-8 rounded-lg ${activeCard.theme.iconBg} border flex items-center justify-center font-bold`}>
                    <activeCard.icon size={16} />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border ${activeCard.theme.badgeBg}`}>
                    {activeCard.badge}
                  </span>
                  {activeCard.angle && (
                    <span className={`text-xs font-mono ${activeCard.theme.accentText}`}>
                      {activeCard.angle}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveModalId(null)}
                  aria-label={isAr ? 'إغلاق النافذة' : 'Close window'}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Modal Body: Title, Text, Strategic Advantages, Proof Widget */}
              <div className="py-4 space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug font-heading">
                    {activeCard.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mt-1.5">
                    {activeCard.text}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
                  {/* Strategic Advantages Checklist */}
                  <div className="rounded-xl p-3.5 bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between space-y-2">
                    <div className="text-[11px] font-mono font-semibold text-neutral-400 uppercase tracking-wider">
                      {isAr ? 'أهم المميزات والقيمة المقدمة' : 'Key Strategic Advantages'}
                    </div>
                    <ul className="space-y-1.5 text-xs text-neutral-200">
                      {activeCard.takeaways.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className={`${activeCard.theme.checkColor} shrink-0 mt-0.5`} />
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mockup Proof Widget */}
                  <div className="flex items-center">
                    {activeCard.mockup}
                  </div>
                </div>
              </div>

              {/* Modal Footer: Close Hint & CTA Action Button */}
              <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
                <span className="text-[11px] text-neutral-400 font-mono">
                  {isAr ? 'انقر في المساحة الفارغة أو Esc للإغلاق' : 'Click outside or press Esc to close'}
                </span>

                {activeCard.isExternal ? (
                  <a
                    href={activeCard.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl ${activeCard.theme.buttonBg} font-medium text-xs sm:text-sm shadow-md active:scale-[0.98] transition-all`}
                  >
                    <span>{activeCard.cta}</span>
                    <ExternalLink size={14} className="ms-1.5" />
                  </a>
                ) : (
                  <Link
                    href={activeCard.href}
                    className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl ${activeCard.theme.buttonBg} font-medium text-xs sm:text-sm shadow-md active:scale-[0.98] transition-all`}
                  >
                    <span>{activeCard.cta}</span>
                    <ArrowRight size={14} className="ms-1.5 rtl:-scale-x-100" />
                  </Link>
                )}
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
