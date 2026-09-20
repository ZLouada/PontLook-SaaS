'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight } from 'lucide-react';
import { m, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import OrbBadge from '@/components/shared/OrbBadge';

export default function HowItWorks() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Lock flag to prevent scroll listener from glitching/overriding manual tab clicks
  const isManualClickRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minDistance = 45;

    if (Math.abs(distance) < minDistance) return;

    if (isAr) {
      if (distance > minDistance) {
        setActiveStep((prev) => (prev === 0 ? 2 : prev - 1));
      } else {
        setActiveStep((prev) => (prev + 1) % 3);
      }
    } else {
      if (distance > minDistance) {
        setActiveStep((prev) => (prev + 1) % 3);
      } else {
        setActiveStep((prev) => (prev === 0 ? 2 : prev - 1));
      }
    }
  };

  // Track scroll progress through the 300vh container on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // If a manual button click initiated smooth scrolling, ignore scroll updates to avoid glitching
    if (isManualClickRef.current) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

    if (latest < 0.33) {
      setActiveStep(0);
    } else if (latest < 0.66) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  });

  useEffect(() => {
    if (isManualClickRef.current) return;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const current = scrollYProgress.get();
    if (current < 0.33) {
      setActiveStep(0);
    } else if (current < 0.66) {
      setActiveStep(1);
    } else {
      setActiveStep(2);
    }
  }, [scrollYProgress]);

  // Release lock if user scrolls manually with mouse wheel or touch gesture
  useEffect(() => {
    const handleUserScroll = () => {
      if (isManualClickRef.current) {
        isManualClickRef.current = false;
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      }
    };
    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // Smooth scroll to corresponding step in the 300vh sequence without glitching
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return;
    }
    if (!containerRef.current) return;

    isManualClickRef.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const containerHeight = containerRef.current.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = containerHeight - viewportHeight;

    const targetProgress = [0.10, 0.50, 0.90][index];
    const targetY = containerTop + scrollableDistance * targetProgress;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 850);
  };

  const cards = [
    // Card 1: Step 01 - Amber / Gold Accent
    {
      id: 'step1',
      stepNumber: '01',
      navTitle: isAr ? 'رصد الاحتياج' : 'Demand Detection',
      shortTitle: isAr ? 'رصد' : 'Demand',
      tag: isAr ? 'الخطوة 01 // رصد الاحتياج المؤسسي' : 'STEP 01 // DEMAND DETECTION',
      tagColor: 'text-amber-400',
      headline: isAr
        ? 'رصد احتياجات التدريب المؤسسي المؤكدة قبل طرحها في السوق'
        : 'Detect verified enterprise training demand before it goes public',
      actionText: isAr ? 'اكتشف المزيد' : 'Learn more',
      actionHref: `/${lang}/for-providers`,
      points: [
        {
          title: isAr ? 'استخبارات سوقية مستمرة >' : 'Continuous Market Intelligence >',
          desc: isAr
            ? 'نرصد باستمرار مؤشرات التوظيف، وإعادة الهيكلة، وفجوات الكفاءات عبر الشركات في السعودية والإمارات.'
            : 'We monitor hiring trends, restructuring mandates, and capability gaps across Saudi Arabia and the UAE.',
        },
        {
          title: isAr ? 'ميزانيات تدريبية معتمدة >' : 'Verified Enterprise Budgets >',
          desc: isAr
            ? 'كل إشارة احتياج ترصدها المنصة تقابلها ميزانية معتمدة مؤكدة مع أصحاب الصلاحية المالية.'
            : 'Every demand signal has verified allocated budget confirmed with corporate financial decision makers.',
        },
        {
          title: isAr ? 'فرص حقيقية بدون تخمين >' : 'Zero Speculation >',
          desc: isAr
            ? 'لا وجود لمناقصات عامة مكررة أو أدلة جامدة، بل منظمات حقيقية مستعدة لبدء التدريب فوراً.'
            : 'No generic public RFPs or dead directories, only active corporate organizations ready to upskill.',
        },
      ],
      canvasBg: 'bg-[#16171B] border-[#26282D]',
      console: (
        <div className="w-full bg-[#0F1013] rounded-xl border border-[#26282D] p-3 sm:p-4 shadow-2xl space-y-2 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D] text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'رادار الاحتياج المؤسسي' : 'Enterprise Demand Feed'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-emerald-400 text-[10px] font-medium">
              <OrbBadge state="searching" size={20} />
              <span>{isAr ? 'إشارة نشطة' : 'Active Signal'}</span>
            </div>
          </div>

          {/* Lead Item 1 */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#16171B] border border-[#26282D] space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                {isAr ? 'الخدمات المالية والمصرفية · الرياض' : 'Banking & FinTech · Riyadh'}
              </span>
              <span className="font-bold text-emerald-400 tabular-nums">SAR 450,000+</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>{isAr ? '1,200+ موظف' : '1,200+ Employees'}</span>
              <span className="text-amber-400 font-medium">
                {isAr ? 'أولوية عاجلة · القيادة التنفيذية' : 'High Intent · Executive Leadership'}
              </span>
            </div>
          </div>

          {/* Lead Item 2 */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#16171B] border border-[#26282D] space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">
                {isAr ? 'الطاقة والبنية التحتية · الظهران' : 'Energy & Infrastructure · Dhahran'}
              </span>
              <span className="font-bold text-blue-400">
                {isAr ? 'ميزانية مؤكدة' : 'Confirmed Budget'}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 text-[11px]">
              <span>{isAr ? 'التحول الرقمي والذكاء الاصطناعي' : 'Digital Transformation & AI'}</span>
              <span className="text-emerald-400 font-medium">
                {isAr ? 'موعد التنفيذ: الربع الثاني' : 'Deployment: Q2'}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 2: Step 02 - Purple / Violet Accent
    {
      id: 'step2',
      stepNumber: '02',
      navTitle: isAr ? 'التأهيل والربط' : 'Fit Scoring',
      shortTitle: isAr ? 'التأهيل' : 'Scoring',
      tag: isAr ? 'الخطوة 02 // التأهيل والربط الذكي' : 'STEP 02 // FIT SCORING & QUALIFICATION',
      tagColor: 'text-purple-400',
      headline: isAr
        ? 'تأهيل دقيق يطابق المتطلبات الحقيقية مع نخبة الخبراء'
        : 'Deep AI & human scoring matching actual enterprise constraints',
      actionText: isAr ? 'طابق برنامجك الآن' : 'Get matched',
      actionHref: `/${lang}/find-training`,
      points: [
        {
          title: isAr ? 'مؤشر تطابق 94% >' : '94% Match Fit Scoring >',
          desc: isAr
            ? 'خوارزمية تقييم شاملة تطابق سجل إنجازات المزود، اعتمادات المدربين، ومنهجية التنفيذ.'
            : 'Proprietary algorithm evaluating provider track record, trainer accreditations, and methodology.',
        },
        {
          title: isAr ? 'توثيق أصحاب القرار >' : 'CHRO & Talent Head Validation >',
          desc: isAr
            ? 'نتحقق شخصياً من الاحتياج مع مدراء التطوير ورؤساء قطاع الموارد البشرية أصحاب القرار النهائي.'
            : 'We directly confirm needs with Heads of L&D, Chief Human Resource Officers, and VP talent buyers.',
        },
        {
          title: isAr ? 'استيفاء معايير التأهيل 4 من 4 >' : '4 Point Criteria Fulfillment >',
          desc: isAr
            ? 'تحقق إلزامي من الجدول الزمني، مستوى المستفيدين، أسلوب التدريب، ومؤشرات قياس الأثر.'
            : 'Strict validation across timeline, participant level, delivery format, and ROI performance metrics.',
        },
      ],
      canvasBg: 'bg-[#16171B] border-[#26282D]',
      console: (
        <div className="w-full bg-[#0F1013] rounded-xl border border-[#26282D] p-3 sm:p-4 shadow-2xl space-y-2 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D] text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'منظومة المطابقة الذكية' : 'AI Match & Qualification'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-emerald-400 text-xs font-bold">
              <OrbBadge state="solving" size={20} />
              <span>94%</span>
              <span className="text-[10px] font-normal">{isAr ? 'تطابق' : 'Match'}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-neutral-300 font-medium">
              <span>{isAr ? 'معايير التأهيل المكتملة' : 'Criteria Fulfilled'}</span>
              <span className="font-bold text-white">4 / 4 Complete</span>
            </div>
            <div className="h-1.5 w-full bg-[#16171B] border border-[#26282D] rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full w-[94%]" />
            </div>
          </div>

          {/* Checklist items */}
          <div className="space-y-1 pt-0.5 text-xs text-neutral-300">
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#16171B] border border-[#26282D]">
              <span className="truncate block">
                {isAr
                  ? 'صاحب القرار: رئيس الموارد البشرية التنفيذي'
                  : 'Decision Maker: Chief Human Resources Officer'}
              </span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-[#16171B] border border-[#26282D]">
              <span className="truncate block">
                {isAr
                  ? 'الجدول الزمني المعتمد: خلال 30 يوماً'
                  : 'Timeline: Deployment within 30 days'}
              </span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 3: Step 03 - Teal / Emerald Accent
    {
      id: 'step3',
      stepNumber: '03',
      navTitle: isAr ? 'التقديم والتعاقد' : 'Engagement',
      shortTitle: isAr ? 'التعاقد' : 'Engagement',
      tag: isAr ? 'الخطوة 03 // التقديم المباشر والتعاقد' : 'STEP 03 // ENGAGEMENT & SUCCESS',
      tagColor: 'text-teal-400',
      headline: isAr
        ? 'تقديم مباشر وتواصل شخصي مع ضمان الدفع مقابل النتائج'
        : 'Direct warm introductions with pay on success guarantees',
      actionText: isAr ? 'انضم كمزود معتمد' : 'Learn more',
      actionHref: `/${lang}/for-providers/apply`,
      points: [
        {
          title: isAr ? 'تقديم شخصي واجتماع مباشر >' : 'Warm Executive Introduction >',
          desc: isAr
            ? 'تنسيق مباشر للاجتماعات وجدول الأعمال مع قادة المنشآت المستعدين لمراجعة العروض والبدء.'
            : 'Direct calendar access and tailored briefing with corporate decision makers ready for proposal review.',
        },
        {
          title: isAr ? 'دفع حصري مقابل الفرصة المؤهلة >' : 'Strict Pay on Success Model >',
          desc: isAr
            ? 'بدون اشتراكات شهرية، وبدون رسوم إدراج. تستثمر فقط عند استلام فرصة مؤهلة ومحققة.'
            : 'Zero subscription fees, zero listing retainers. You only invest when a real qualified match is delivered.',
        },
        {
          title: isAr ? 'ضمان استبدال خلال 5 أيام >' : '5 Day Replacement SLA Guarantee >',
          desc: isAr
            ? 'إذا لم تتطابق الفرصة مع معايير التأهيل المعتمدة، نستبدلها فوراً وبدون أي تكلفة إضافية.'
            : 'If an introduction does not meet confirmed qualification criteria, we replace it at zero cost.',
        },
      ],
      canvasBg: 'bg-[#16171B] border-[#26282D]',
      console: (
        <div className="w-full bg-[#0F1013] rounded-xl border border-[#26282D] p-3 sm:p-4 shadow-2xl space-y-2 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D] text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'لوحة التعاقد المباشر' : 'Direct Engagement Console'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#16171B] border border-[#26282D] text-teal-400 text-[10px] font-medium">
              <OrbBadge state="connecting" size={20} />
              <span>{isAr ? 'تم التقديم' : 'Intro Complete'}</span>
            </div>
          </div>

          {/* Status Box */}
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#16171B] border border-[#26282D] space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">{isAr ? 'حالة الفرصة' : 'Pipeline Status'}</span>
              <span className="font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded text-[10px] border border-emerald-500/30">
                {isAr ? 'مرحلة تقديم العرض الفني' : 'Proposal Review Stage'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">{isAr ? 'ضمان الفرصة' : 'Guarantee SLA'}</span>
              <span className="font-medium text-white text-[11px]">
                {isAr ? 'ضمان استبدال خلال 5 أيام' : '5 Day Replacement Guarantee'}
              </span>
            </div>
          </div>

          {/* Contract Terms */}
          <div className="pt-0.5 flex items-center justify-between text-xs text-neutral-400">
            <span>{isAr ? 'بدون عمولات خفية' : 'Zero hidden fees'}</span>
            <span className="font-bold text-teal-400">
              {isAr ? 'علاقة تعاقدية مباشرة 100%' : '100% Direct Contract'}
            </span>
          </div>
        </div>
      ),
    },
  ];

  const activeCard = cards[activeStep];

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      data-nav-dark="true"
      className="relative bg-[#08090A] text-white pt-8 pb-12 sm:pt-20 sm:pb-16 lg:py-0 lg:min-h-[300vh] scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Pure AMOLED Ambient Lighting - Zero Blue Lights */}
      <div className="absolute top-1/4 start-1/4 w-[600px] h-[600px] bg-white/[0.015] blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 end-1/4 w-[600px] h-[600px] bg-white/[0.01] blur-[180px] pointer-events-none rounded-full" />

      {/* Viewport Container: Normal Flow on Mobile, Sticky on Desktop */}
      <div className="relative lg:sticky lg:top-0 lg:h-screen lg:max-h-[100dvh] lg:flex lg:flex-col lg:justify-center pt-0 lg:pt-28 pb-0 lg:pb-6 px-0 sm:px-6 lg:px-8">
        <div className="container-site relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center my-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="mb-4 sm:mb-5 text-center max-w-3xl mx-auto shrink-0 px-2">
            <h2 className="text-xl sm:text-3xl lg:text-[28px] font-semibold text-white tracking-[-0.03em] leading-tight font-heading">
              {dict.how_it_works?.title || (isAr ? 'نرصد بدقة المنشآت التي تواجه فجوات تدريبية ومهارية حقيقية' : 'We pinpoint organizations facing real skill & training gaps')}
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
              {isAr ? 'تعلم، شخص، وطابق' : 'Learn, Diagnose, and Get Matched'}
            </p>
          </div>

          {/* 3 Step Switcher Tabs (Touch-friendly, Zero-clipping on Mobile) */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 mb-4 sm:mb-5 w-full max-w-lg mx-auto overflow-x-auto scrollbar-none px-4 sm:px-0 py-1">
            {cards.map((card, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={card.id}
                  onClick={() => handleStepClick(idx)}
                  className={`group relative shrink-0 sm:flex-1 min-w-[105px] sm:min-w-0 flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-3 sm:px-3.5 rounded-full border transition-all duration-200 text-xs font-medium active:scale-95 ${
                    isActive
                      ? 'bg-white/[0.08] text-white border-white/30 shadow-sm'
                      : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/20 hover:text-neutral-200'
                  }`}
                >
                  <span className={`text-[11px] font-mono font-bold shrink-0 ${isActive ? card.tagColor : 'text-neutral-500'}`}>
                    {card.stepNumber}
                  </span>
                  <span className="truncate">
                    <span className="sm:hidden">{card.shortTitle}</span>
                    <span className="hidden sm:inline">{card.navTitle}</span>
                  </span>
                  {isActive && (
                    <div className="shrink-0">
                      <OrbBadge
                        state={idx === 0 ? 'searching' : idx === 1 ? 'solving' : 'connecting'}
                        size={20}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Showcase Card: Touch-Swipeable on Mobile */}
          <div
            className="w-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <m.div
                key={activeCard.id}
                initial={{ opacity: 0, y: 10, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative rounded-2xl sm:rounded-3xl bg-[#0F1013] border border-[#26282D] hover:border-white/20 transition-colors duration-300 p-3.5 sm:p-5 lg:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.75)] overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-8 items-center">
                  
                  {/* Left Column: Category Tag, Title, Action Link, 3 Points with Chevrons */}
                  <div className="lg:col-span-6 flex flex-col items-start text-start">
                    {/* Eyebrow Tag with Accent Color */}
                    <div className={`${activeCard.tagColor} text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1`}>
                      {activeCard.tag}
                    </div>

                    {/* High-Contrast Bold Headline */}
                    <h3 className="text-base sm:text-xl lg:text-[22px] font-heading font-medium text-white tracking-[-0.025em] leading-snug mb-2">
                      {activeCard.headline}
                    </h3>

                    {/* Linear Style Action Link (Learn more ->) */}
                    <Link
                      href={activeCard.actionHref}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors duration-200 mb-2.5 group"
                    >
                      <span>{activeCard.actionText}</span>
                      <ArrowRight
                        size={13}
                        className="rtl:-scale-x-100 text-neutral-400 group-hover:text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all"
                      />
                    </Link>

                    {/* 3 Points with Chevrons */}
                    <div className="space-y-1.5 sm:space-y-2 w-full pt-1.5 border-t border-[#26282D]">
                      {activeCard.points.map((pt) => (
                        <div key={pt.title} className="space-y-0.5">
                          <div className="text-xs sm:text-[13px] font-semibold text-neutral-100 font-heading">
                            {pt.title}
                          </div>
                          <p className="text-[11px] sm:text-xs text-neutral-400 leading-snug font-sans">
                            {pt.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Accent Tinted Canvas with Dark Console */}
                  <div className="lg:col-span-6 w-full">
                    <div className={`w-full rounded-xl sm:rounded-2xl ${activeCard.canvasBg} border p-2.5 sm:p-4 shadow-inner relative overflow-hidden flex items-center justify-center`}>
                      {activeCard.console}
                    </div>
                  </div>

                </div>

                {/* Bottom Step Switcher Indicators inside card */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#26282D] text-xs text-neutral-400 w-full">
                  <div className="flex items-center gap-2">
                    {cards.map((c, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => handleStepClick(dotIdx)}
                        aria-label={`Go to step ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeStep === dotIdx ? 'w-6 bg-white' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleStepClick((activeStep + 1) % cards.length)}
                    className="inline-flex items-center gap-1 font-medium text-xs text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>{isAr ? 'الخطوة التالية' : 'Next Step'}</span>
                    <ArrowRight size={12} className="rtl:-scale-x-100" />
                  </button>
                </div>

              </m.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
