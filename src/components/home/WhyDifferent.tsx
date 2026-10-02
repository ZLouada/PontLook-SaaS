'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Target,
  BadgeCheck,
  Building2,
  Handshake,
  BookOpen,
  ArrowRight,
  ExternalLink,
  X,
} from '@/components/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import Signal from '@/components/shared/Signal';
import Spotlight from '@/components/shared/Spotlight';
import TextReveal from '@/components/shared/TextReveal';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Press from '@/components/shared/Press';
import Rail from '@/components/shared/Rail';
import IconFrame, { type IconFrameVariant } from '@/components/shared/IconFrame';
import { useFinePointer } from '@/lib/useDevice';
import { staggerContainer, staggerItem, viewportOnce } from '@/lib/motion';

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
  themeVariant: IconFrameVariant;
}

export default function WhyDifferent() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';
  const c = dict.why_different?.cards;

  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const isDesktopPointer = useFinePointer();

  useEffect(() => {
    setMounted(true);
  }, []);

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
    // Card 1: Diagnose Your Skill Gaps (Target icon, clean enterprise look)
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
        isAr ? 'تجنب هدر الميزانيات في تدريب غير مجدٍ' : 'Eliminate wasted corporate training budget',
      ],
      theme: {
        accentText: 'text-neutral-950',
        badgeBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-200',
        iconBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:border-neutral-950',
        buttonBg: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10',
        checkColor: 'text-neutral-950',
        flipHintBg: 'bg-neutral-100 text-neutral-700 border border-neutral-200 group-hover:border-neutral-900',
      },
      themeVariant: 'dark',
      mockup: (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/90 w-full p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <IconFrame variant="dark" size="xs">
                <Target size={14} />
              </IconFrame>
              <div>
                <div className="text-xs font-semibold text-neutral-900 font-sans">
                  {c?.diagnose?.mockupHeader || (isAr ? 'تقييم فجوات الكفاءات' : 'Skill Gap Assessment')}
                </div>
                <div className="text-[10px] text-neutral-500 font-sans">
                  {c?.diagnose?.mockupSubheader || (isAr ? 'مستوى الإدارات المؤسسية' : 'Enterprise Department Level')}
                </div>
              </div>
            </div>
            <Signal tone="neutral" size={12} />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <span className="px-2 py-0.5 rounded-md bg-white text-neutral-700 text-[10px] font-medium border border-neutral-200 font-sans shadow-xs">
              {c?.diagnose?.tag1 || (isAr ? '# فجوات القيادة والتقنية' : '# Leadership & Tech Gaps')}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-950 text-[10px] font-medium border border-neutral-200 font-sans">
              {c?.diagnose?.tag2 || (isAr ? 'خارطة طريق معتمدة' : 'Priority Roadmap')}
            </span>
          </div>
        </div>
      ),
    },

    // Card 2: Matched Directly with the Right Training Partner (BadgeCheck icon)
    {
      id: 'match',
      index: '02',
      icon: BadgeCheck,
      badge: isAr ? 'المطابقة المباشرة' : 'Direct Matching',
      title: c?.match?.title || (isAr ? 'ربط مباشر مع الشريك التدريبي الأنسب' : 'Matched Directly with the Right Training Partner'),
      angle: isAr ? 'بدون عروض تسويقية مزعجة' : 'No Cold Sales Pitches',
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
        accentText: 'text-neutral-950',
        badgeBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-200',
        iconBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:border-neutral-950',
        buttonBg: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10',
        checkColor: 'text-neutral-950',
        flipHintBg: 'bg-neutral-100 text-neutral-700 border border-neutral-200 group-hover:border-neutral-900',
      },
      themeVariant: 'dark',
      mockup: (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/90 w-full p-3 flex flex-col gap-2">
          <div className="text-xs font-semibold text-neutral-900 pb-1.5 border-b border-neutral-200 flex items-center justify-between font-sans">
            <span>{c?.match?.mockupHeader || (isAr ? 'قائمة معايير توافق الشريك' : 'Partner Fit Checklist')}</span>
            <Signal tone="neutral" size={12} />
          </div>
          <div className="space-y-1.5 text-[11px] text-neutral-600 font-sans">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
              <span>{c?.match?.check1 || (isAr ? 'متخصص في مجال عمل منشأتك' : 'Specialized in your industry')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
              <span>{c?.match?.check2 || (isAr ? 'سجل تدريبي موثق في المنطقة' : 'Verified delivery track record')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 shrink-0" />
              <span>{c?.match?.check3 || (isAr ? 'متوافق مع جدولك وميزانيتك' : 'Aligned with your timeline & budget')}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 3: Direct Access to Verified Decision Makers (Building2 icon)
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
        isAr ? 'بدون وسطاء أو رسوم اشتراك شهرية' : 'Direct access without monthly retainers',
      ],
      theme: {
        accentText: 'text-neutral-950',
        badgeBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-200',
        iconBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:border-neutral-950',
        buttonBg: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10',
        checkColor: 'text-neutral-950',
        flipHintBg: 'bg-neutral-100 text-neutral-700 border border-neutral-200 group-hover:border-neutral-900',
      },
      themeVariant: 'dark',
      mockup: (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/90 w-full p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-700 text-[9px] font-medium uppercase font-sans shadow-xs">
              {c?.access?.clientTag || (isAr ? 'جهة مؤسسية · حوكمة ومخاطر' : 'Enterprise Client · GRC')}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-950 text-[9px] font-medium border border-neutral-200 shrink-0 font-sans">
              {c?.access?.statusBadge || (isAr ? 'صلاحية الميزانية: مؤكدة' : 'Budget Authority: Confirmed')}
            </span>
          </div>
          <div className="flex items-center gap-2.5 pt-0.5">
            <div className="h-7 w-7 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
              <Signal tone="neutral" size={12} />
            </div>
            <div className="min-w-0 font-sans">
              <div className="text-[11px] font-semibold text-neutral-900 truncate">
                {c?.access?.role || (isAr ? 'رئيس قطاع الموارد البشرية (CHRO)' : 'Chief Human Resources Officer (CHRO)')}
              </div>
              <div className="text-[9px] text-neutral-500 truncate">{isAr ? 'تعاقد مباشر ومؤكد' : 'Verified Direct Engagement'}</div>
            </div>
          </div>
        </div>
      ),
    },

    // Card 4: Clients Ready to Partner (Handshake icon - authentic B2B business partnership)
    {
      id: 'ready',
      index: '04',
      icon: Handshake,
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
        accentText: 'text-neutral-950',
        badgeBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-200',
        iconBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:border-neutral-950',
        buttonBg: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10',
        checkColor: 'text-neutral-950',
        flipHintBg: 'bg-neutral-100 text-neutral-700 border border-neutral-200 group-hover:border-neutral-900',
      },
      themeVariant: 'dark',
      mockup: (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/90 w-full p-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-200 text-xs font-semibold text-neutral-900 font-sans">
            <span>{c?.ready?.mockupHeader || (isAr ? 'جاهزية الشراكة | مؤكدة' : 'Partnership Readiness | Confirmed')}</span>
            <Signal tone="neutral" size={12} />
          </div>
          <div className="space-y-1 text-[10px] sm:text-[11px] font-sans">
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">{c?.ready?.needLabel || (isAr ? 'الاحتياج التدريبي' : 'Client Need')}</span>
              <span className="font-semibold text-neutral-900">{c?.ready?.needVal || (isAr ? 'برنامج القيادة التنفيذية' : 'Leadership Track')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">{c?.ready?.budgetLabel || (isAr ? 'الميزانية المعتمدة' : 'Budget')}</span>
              <span className="font-bold text-neutral-950">{c?.ready?.budgetVal || 'Confirmed ($50k to $100k)'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500">{c?.ready?.fitLabel || (isAr ? 'التوافق' : 'Mutual Fit')}</span>
              <span className="text-neutral-700">{c?.ready?.fitVal || (isAr ? 'توافق كامل' : '100% Verified')}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 5: L&D Knowledge Hub (BookOpen icon)
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
        accentText: 'text-neutral-950',
        badgeBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:bg-neutral-200',
        iconBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200 group-hover:border-neutral-950',
        buttonBg: 'bg-neutral-950 hover:bg-black text-white shadow-md shadow-neutral-900/10',
        checkColor: 'text-neutral-950',
        flipHintBg: 'bg-neutral-100 text-neutral-700 border border-neutral-200 group-hover:border-neutral-900',
      },
      themeVariant: 'dark',
      mockup: (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/90 w-full p-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-200 text-xs font-semibold text-neutral-900 font-sans">
            <span>{c?.hub?.mockupHeader || (isAr ? 'أحدث أدلة ومقالات المنصة' : 'Latest L&D Resources')}</span>
            <Signal tone="neutral" size={12} />
          </div>
          <div className="space-y-1.5 pt-0.5 font-sans">
            <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
              <span className="text-neutral-900 truncate">
                {c?.hub?.item1Title || (isAr ? 'تقرير فجوات مهارات سوق العمل الخليجي' : 'GCC Workforce Skill Gaps Report')}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-950 text-[9px] font-bold shrink-0 border border-neutral-200">
                {c?.hub?.item1Badge || (isAr ? 'دليل جديد' : 'New Guide')}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
              <span className="text-neutral-900 truncate">
                {c?.hub?.item2Title || (isAr ? 'دليل تشخيص العائد على التدريب المؤسسي' : 'Diagnostic Guide to Corporate Training ROI')}
              </span>
              <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-950 text-[9px] font-bold shrink-0 border border-neutral-200">
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
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-12 xs:py-14 sm:py-16 lg:py-20 border-t border-neutral-200"
    >
      <div className="container-site relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 sm:mb-8 text-center max-w-3xl mx-auto space-y-2 sm:space-y-2.5"
        >
          <TextReveal
            as="h2"
            text={dict.why_different?.title || (isAr ? 'تحول عمليتنا التشخيصية طلبات تدريب الشركات المبهمة إلى خطط تطوير منظمة وقابلة للتنفيذ.' : 'Our diagnostic process turns vague corporate training requests into structured, actionable development roadmaps.')}
            className="h-section text-neutral-950"
          />

          <p className="text-sm text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {dict.why_different?.subtitle ||
              (isAr
                ? 'نحلل التحديات المؤسسية الحقيقية لنقدم أدلة مجانية قابلة للتطبيق، ونربط قادة التدريب مباشرة بمزودي البرامج المعتمدين والمؤهلين لتنفيذ الحل.'
                : 'We analyze real GCC workplace challenges to deliver free, actionable problem solving guides on our blog, and directly connect corporate leaders with the verified training providers ready to implement the solution.')}
          </p>

          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-sans"
          >
            <span>{isAr ? 'اسحب لعرض جميع البطاقات · انقر لفتح النافذة' : 'Swipe to view cards · Tap any card to open window'}</span>
          </m.div>
        </m.div>

        {/* cards grid / carousel - compact card deck */}
        <Rail
          className="items-stretch gap-3 px-1 -mx-1 pb-2 sm:gap-3.5 sm:pb-3 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0"
          reveal={{
            variants: staggerContainer(0.08),
            initial: 'hidden',
            whileInView: 'show',
            viewport: viewportOnce,
          }}
          dots
          dotTone="dark"
          ariaLabel={isAr ? 'بطاقات ما يميزنا' : 'What makes us different'}
          dotLabel={(i) =>
            isAr ? `الانتقال إلى البطاقة ${i + 1}` : `Go to card ${i + 1}`
          }
        >
          {items.map((it) => {
            const Icon = it.icon;
            const theme = it.theme;
            const cardGlow = 'hover:border-neutral-900/60 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)]';

            return (
              <m.div
                key={it.id}
                variants={staggerItem}
                className="relative w-[78vw] sm:w-[250px] lg:w-auto shrink-0 lg:shrink snap-center h-[272px] sm:h-[280px] lg:h-[305px] xl:h-[295px]"
                onClick={() => setActiveModalId(it.id)}
              >
                {/* Rail writes its distance-from-centre depth here, clear of the
                    stagger transform above and the press transform below. */}
                <div data-rail-depth className="h-full w-full transform-gpu">
                  {isDesktopPointer ? (
                    <CardTilt3D maxTilt={6} glareOpacity={0.06} className="w-full h-full">
                      <Spotlight radius={280} className="w-full h-full rounded-2xl">
                        <m.div
                          whileTap={{ scale: 0.98 }}
                          className={`group relative w-full h-full rounded-2xl bg-white border border-neutral-200/90 p-3.5 sm:p-4 lg:p-3 xl:p-4 flex flex-col justify-between cursor-pointer select-none shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 ${cardGlow}`}
                        >
                          {/* Ambient subtle back-glow on hover */}
                          <div className="pointer-events-none absolute -top-8 -end-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-neutral-900/5" />

                          {/* Card Front Top */}
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between">
                              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium font-sans ${theme.badgeBg}`}>
                                {it.badge}
                              </span>
                              <span className="text-[11px] font-mono text-neutral-400">
                                {it.index}
                              </span>
                            </div>

                            <h3 className="text-[0.9375rem] sm:text-base lg:text-xs xl:text-sm font-semibold text-neutral-950 tracking-tight leading-snug font-heading group-hover:text-neutral-950 transition-colors">
                              {it.title}
                            </h3>

                            <p className="text-[0.8125rem] sm:text-xs text-neutral-600 font-sans leading-relaxed line-clamp-2">
                              {it.text}
                            </p>
                          </div>

                          {/* Card Front Bottom */}
                          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                            <IconFrame variant={it.themeVariant} size="xs">
                              <Icon size={14} strokeWidth={1.75} />
                            </IconFrame>

                            <div className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 group-hover:text-neutral-950 transition-colors duration-200">
                              <span>{isAr ? 'افتح النافذة' : 'Open window'}</span>
                              <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100 text-neutral-400 group-hover:text-neutral-950" />
                            </div>
                          </div>
                        </m.div>
                      </Spotlight>
                    </CardTilt3D>
                  ) : (
                    /* Touch: no tilt, no spotlight — the swipe drives depth and the
                       press spring answers the finger. */
                    <Press className="h-full w-full" strength={0.65} vibrate>
                      <div className="group relative w-full h-full rounded-2xl bg-white border border-neutral-200/90 p-4 flex flex-col justify-between cursor-pointer select-none shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] overflow-hidden">
                        {/* Card Front Top */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium font-sans ${theme.badgeBg}`}>
                              {it.badge}
                            </span>
                            <span className="text-[11px] font-mono text-neutral-400">
                              {it.index}
                            </span>
                          </div>

                          <h3 className="text-[0.9375rem] sm:text-base font-semibold text-neutral-950 tracking-tight leading-snug font-heading">
                            {it.title}
                          </h3>

                          <p className="text-[0.8125rem] text-neutral-600 font-sans leading-relaxed line-clamp-3">
                            {it.text}
                          </p>
                        </div>

                        {/* Card Front Bottom */}
                        <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
                          <IconFrame variant={it.themeVariant} size="xs">
                            <Icon size={14} strokeWidth={1.75} />
                          </IconFrame>

                          <div className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600">
                            <span>{isAr ? 'افتح النافذة' : 'Open window'}</span>
                            <ArrowRight size={12} className="rtl:-scale-x-100 text-neutral-400" />
                          </div>
                        </div>
                      </div>
                    </Press>
                  )}
                </div>
              </m.div>
            );
          })}
        </Rail>
      </div>

      {/* modal, portalled to body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeCard && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 xs:p-3 sm:p-6 overflow-y-auto" role="dialog" aria-modal="true">
                {/* backdrop */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveModalId(null)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                />

                {/* modal content */}
                <m.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 12,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 w-full max-w-2xl sm:max-w-3xl max-h-[85dvh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl bg-white border border-neutral-200 text-neutral-900 shadow-2xl my-auto overflow-hidden"
                >
                  {/* Modal Top Bar (Fixed Header) */}
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.25 }}
                    className="flex items-center justify-between p-4 sm:p-5 border-b border-neutral-200 gap-3 shrink-0"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                      <IconFrame variant={activeCard.themeVariant} size="sm">
                        <activeCard.icon size={15} />
                      </IconFrame>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold font-sans ${activeCard.theme.badgeBg}`}>
                        {activeCard.badge}
                      </span>
                      {activeCard.angle && (
                        <span className={`text-[11px] sm:text-xs font-medium font-sans ${activeCard.theme.accentText}`}>
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
                      className="tap-target h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-950 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    >
                      <X size={17} />
                    </m.button>
                  </m.div>

                  {/* Modal Scrollable Body: Content smoothly scrolls on phone screens */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 sm:space-y-4 overscroll-contain">
                    <m.div
                      initial={{ opacity: 0, x: isAr ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      <h3 className="text-lg sm:text-xl font-semibold text-neutral-950 tracking-tight leading-snug font-heading">
                        {activeCard.title}
                      </h3>
                      <p className="text-sm text-neutral-600 font-sans leading-relaxed mt-1.5">
                        {activeCard.text}
                      </p>
                    </m.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
                      {/* Strategic Advantages Checklist with Cascading Bullet Animation */}
                      <m.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="rounded-xl p-3 sm:p-3.5 bg-neutral-50 border border-neutral-200 flex flex-col justify-between space-y-2"
                      >
                        <div className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider font-sans">
                          {isAr ? 'أهم المميزات والقيمة المقدمة' : 'Key Strategic Advantages'}
                        </div>
                        <ul className="space-y-2 text-[0.8125rem] sm:text-sm text-neutral-700 font-sans">
                          {activeCard.takeaways.map((point, pIdx) => (
                            <m.li
                              key={pIdx}
                              initial={{ opacity: 0, x: isAr ? 12 : -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.24 + pIdx * 0.06, type: 'spring', stiffness: 320, damping: 22 }}
                              className="leading-snug flex items-start gap-1.5"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 mt-1 shrink-0" />
                              <span>{point}</span>
                            </m.li>
                          ))}
                        </ul>
                      </m.div>

                      {/* Mockup Proof Widget with Smooth Slide-In */}
                      <m.div
                        initial={{ opacity: 0, x: isAr ? -15 : 15, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.22, duration: 0.35 }}
                        className="flex items-center"
                      >
                        {activeCard.mockup}
                      </m.div>
                    </div>
                  </div>

                  {/* Modal Fixed Footer: Close Hint & CTA Button (Full width on phone) */}
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.3 }}
                    className="p-3.5 sm:p-5 border-t border-neutral-200 bg-neutral-50 shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3"
                  >
                    <span className="text-[11px] text-neutral-500 font-sans hidden sm:inline">
                      {isAr ? 'انقر في المساحة الفارغة أو Esc للإغلاق' : 'Click outside or press Esc to close'}
                    </span>

                    {activeCard.isExternal ? (
                      <m.a
                        href={activeCard.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`w-full sm:w-auto inline-flex items-center justify-center min-h-[46px] px-5 py-3 rounded-xl ${activeCard.theme.buttonBg} font-medium text-sm transition-colors font-sans`}
                      >
                        <span>{activeCard.cta}</span>
                        <ExternalLink size={14} className="ms-1.5" />
                      </m.a>
                    ) : (
                      <m.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="w-full sm:w-auto"
                      >
                        <Link
                          href={activeCard.href}
                          className={`w-full inline-flex items-center justify-center min-h-[46px] px-5 py-3 rounded-xl ${activeCard.theme.buttonBg} font-medium text-sm transition-colors font-sans`}
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
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
