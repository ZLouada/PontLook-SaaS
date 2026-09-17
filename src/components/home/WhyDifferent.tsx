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
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';

interface CardTheme {
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
    // Card 1: Diagnose Your Skill Gaps (Blue accents, clean dark surface without edge lightning)
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
        accentText: 'text-blue-400',
        badgeBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        iconBg: 'bg-blue-600/15 text-blue-400 border border-blue-500/20',
        buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/40',
        checkColor: 'text-blue-400',
        flipHintBg: 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] group-hover:text-blue-400 group-hover:border-blue-500/30',
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
        accentText: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        iconBg: 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/20',
        buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/40',
        checkColor: 'text-emerald-400',
        flipHintBg: 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] group-hover:text-emerald-400 group-hover:border-emerald-500/30',
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
        accentText: 'text-purple-400',
        badgeBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
        iconBg: 'bg-purple-600/15 text-purple-400 border border-purple-500/20',
        buttonBg: 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-900/40',
        checkColor: 'text-purple-400',
        flipHintBg: 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] group-hover:text-purple-400 group-hover:border-purple-500/30',
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
        accentText: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        iconBg: 'bg-amber-600/15 text-amber-400 border border-amber-500/20',
        buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-900/40',
        checkColor: 'text-amber-400',
        flipHintBg: 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] group-hover:text-amber-400 group-hover:border-amber-500/30',
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
        accentText: 'text-cyan-400',
        badgeBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        iconBg: 'bg-cyan-600/15 text-cyan-400 border border-cyan-500/20',
        buttonBg: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-900/40',
        checkColor: 'text-cyan-400',
        flipHintBg: 'bg-white/[0.04] text-neutral-300 border border-white/[0.08] group-hover:text-cyan-400 group-hover:border-cyan-500/30',
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
        {/* Section Header with Staggered Entrance Animation */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
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

          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="pt-1 flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-mono"
          >
            <m.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            >
              <RotateCw size={12} className="text-neutral-400" />
            </m.div>
            <span>{isAr ? 'انقر على أي بطاقة للقلب وفتح نافذة التفاصيل' : 'Click any card to flip & pop up detail window'}</span>
          </m.div>
        </m.div>

        {/* 5 Side-by-Side Cards (Clean Minimalist AMOLED Black without Edge Lightning, Dynamic Staggered Animations) */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="flex lg:grid lg:grid-cols-5 gap-3.5 sm:gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-none items-stretch"
        >
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
                  variants={{
                    hidden: { opacity: 0, y: 35, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: 'spring', stiffness: 260, damping: 22 },
                    },
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    transition: { type: 'spring', stiffness: 350, damping: 20 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    rotateY: isSelected ? (isAr ? -180 : 180) : 0,
                  }}
                  transition={{
                    duration: 0.55,
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="group relative w-full h-full rounded-2xl bg-[#0A0B0E] border border-white/[0.08] hover:border-white/20 p-4 sm:p-5 flex flex-col justify-between cursor-pointer select-none shadow-xl shadow-black/60 transition-colors duration-200 transform-gpu"
                >
                  {/* Card Front Top */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <m.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        className={`h-9 w-9 rounded-xl ${theme.iconBg} flex items-center justify-center font-bold shadow-sm transition-transform`}
                      >
                        <Icon size={18} />
                      </m.div>
                      <span className="text-xs font-mono font-bold text-neutral-500 tracking-wider">
                        {it.index}
                      </span>
                    </div>

                    {/* Category pill badge */}
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${theme.badgeBg}`}>
                        {it.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-[15px] font-semibold text-white font-heading leading-snug tracking-tight group-hover:text-white transition-colors">
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
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {isAr ? 'نافذة تفاعلية' : 'Interactive window'}
                    </span>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-300 ${theme.flipHintBg}`}>
                      <span>{isAr ? 'افتح النافذة' : 'Flip & open'}</span>
                      <RotateCw size={11} className="transition-transform duration-500 group-hover:rotate-180" />
                    </div>
                  </div>
                </m.div>
              </div>
            );
          })}
        </m.div>
      </div>

      {/* POP-UP WINDOW (MODAL DIALOG WITH MULTI-STAGE 3D FLIP & SPRING ENTRANCE, PURE BLACK BACKGROUND WITHOUT EDGE LIGHTNING) */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop with Smooth Fade-In (Click in empty space to return to normal card) */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={() => setActiveModalId(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Pop-up Window with 3D Flip & Pop-up spring animation (Clean pure black, NO edge lighting) */}
            <m.div
              initial={{
                opacity: 0,
                scale: 0.72,
                rotateX: 25,
                rotateY: isAr ? -45 : 45,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.75,
                rotateX: -20,
                rotateY: isAr ? 45 : -45,
                y: 35,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
              }}
              style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
              className="relative z-10 w-full max-w-2xl sm:max-w-3xl rounded-2xl sm:rounded-3xl bg-[#0A0B0E] border border-white/[0.12] p-5 sm:p-7 text-white shadow-2xl shadow-black my-auto overflow-hidden transform-gpu"
            >
              {/* Top Bar: Staggered Entrance */}
              <m.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center justify-between pb-4 border-b border-white/[0.08] gap-3"
              >
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className={`h-8 w-8 rounded-lg ${activeCard.theme.iconBg} flex items-center justify-center font-bold`}>
                    <activeCard.icon size={16} />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ${activeCard.theme.badgeBg}`}>
                    {activeCard.badge}
                  </span>
                  {activeCard.angle && (
                    <span className={`text-xs font-mono ${activeCard.theme.accentText}`}>
                      {activeCard.angle}
                    </span>
                  )}
                </div>

                <m.button
                  type="button"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveModalId(null)}
                  aria-label={isAr ? 'إغلاق النافذة' : 'Close window'}
                  className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                >
                  <X size={15} />
                </m.button>
              </m.div>

              {/* Modal Body: Sequential Animated Content */}
              <div className="py-4 space-y-4">
                <m.div
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug font-heading">
                    {activeCard.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mt-1.5">
                    {activeCard.text}
                  </p>
                </m.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
                  {/* Strategic Advantages Checklist with Cascading Bullet Animation */}
                  <m.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.35 }}
                    className="rounded-xl p-3.5 bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between space-y-2"
                  >
                    <div className="text-[11px] font-mono font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={11} className={activeCard.theme.accentText} />
                      <span>{isAr ? 'أهم المميزات والقيمة المقدمة' : 'Key Strategic Advantages'}</span>
                    </div>
                    <ul className="space-y-2 text-xs text-neutral-200">
                      {activeCard.takeaways.map((point, pIdx) => (
                        <m.li
                          key={pIdx}
                          initial={{ opacity: 0, x: isAr ? 15 : -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.26 + pIdx * 0.07, type: 'spring', stiffness: 320, damping: 22 }}
                          className="flex items-start gap-2"
                        >
                          <m.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.35, 1] }}
                            transition={{ delay: 0.28 + pIdx * 0.07, duration: 0.35 }}
                            className="shrink-0 mt-0.5"
                          >
                            <CheckCircle2 size={13} className={activeCard.theme.checkColor} />
                          </m.div>
                          <span className="leading-snug">{point}</span>
                        </m.li>
                      ))}
                    </ul>
                  </m.div>

                  {/* Mockup Proof Widget with Smooth Slide-In */}
                  <m.div
                    initial={{ opacity: 0, x: isAr ? -20 : 20, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.26, duration: 0.4 }}
                    className="flex items-center"
                  >
                    {activeCard.mockup}
                  </m.div>
                </div>
              </div>

              {/* Modal Footer: Close Hint & Tactile Interactive CTA Action Button */}
              <m.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.35 }}
                className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3"
              >
                <span className="text-[11px] text-neutral-400 font-mono">
                  {isAr ? 'انقر في المساحة الفارغة أو Esc للإغلاق' : 'Click outside or press Esc to close'}
                </span>

                {activeCard.isExternal ? (
                  <m.a
                    href={activeCard.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl ${activeCard.theme.buttonBg} font-medium text-xs sm:text-sm active:scale-[0.98] transition-all`}
                  >
                    <span>{activeCard.cta}</span>
                    <ExternalLink size={14} className="ms-1.5" />
                  </m.a>
                ) : (
                  <m.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Link
                      href={activeCard.href}
                      className={`inline-flex items-center justify-center px-5 py-2.5 rounded-xl ${activeCard.theme.buttonBg} font-medium text-xs sm:text-sm active:scale-[0.98] transition-all`}
                    >
                      <span>{activeCard.cta}</span>
                      <ArrowRight size={14} className="ms-1.5 rtl:-scale-x-100" />
                    </Link>
                  </m.div>
                )}
              </m.div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
