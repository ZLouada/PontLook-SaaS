'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import {
  XCircle,
  CheckCircle2,
  BadgeCheck,
  SlidersHorizontal,
  Handshake,
  GraduationCap,
  TrendingUp,
  Workflow,
  ArrowRight,
  ArrowLeft,
  X,
  Target,
} from '@/components/icons';
import { m, AnimatePresence } from 'framer-motion';
import Signal from '@/components/shared/Signal';
import TextReveal from '@/components/shared/TextReveal';
import BorderBeam from '@/components/shared/BorderBeam';
import CardTilt3D from '@/components/shared/CardTilt3D';
import Magnetic from '@/components/shared/Magnetic';
import BorderGlow from '@/components/shared/BorderGlow';

interface WhoWeAreProps {
  lang?: 'en' | 'ar';
}

/* ==========================================================================
   SECTION 2: MISSION & THE SPLIT-CARD COMPARISON ENGINE (LIGHT THEME + PHOTOS)
   ========================================================================== */
export function MissionSplitComparison({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';

  const traditionalPoints = [
    {
      title: isAr ? 'بحث لا نهائي ورسائل عشوائية' : 'Endless Searching & Cold Spam',
      desc: isAr
        ? 'فرق الموارد البشرية تغرق في أدلة ودورات عامة؛ بينما يرسل مزودو التدريب مئات الرسائل الباردة غير المقروءة.'
        : 'HR sifting through generic directories; providers blasting hundreds of unread cold emails.',
    },
    {
      title: isAr ? 'احتياجات غامضة ودورات غير ملائمة' : 'Vague Needs & Misaligned Courses',
      desc: isAr
        ? 'شراء برامج تدريبية معلبة وجاهزة دون تشخيص مسبق لما إذا كانت تسد فجوات الكفاءة الحقيقية لدى الموظفين.'
        : 'Buying off the shelf training without diagnosing whether they bridge actual capability gaps.',
    },
    {
      title: isAr ? 'جلسات استكشافية غير مدفوعة وطرق مسدودة' : 'Unpaid Discovery & Dead Ends',
      desc: isAr
        ? 'شركات التدريب تهدر ساعات في مكالمات استكشافية مع عملاء يفتقرون إلى الميزانية المعتمدة أو سلطة اتخاذ القرار.'
        : 'Training firms wasting hours on exploratory discovery calls with leads who lack budget or authority.',
    },
  ];

  const pontlookPoints = [
    {
      title: isAr ? 'تشخيص دقيق قبل التوفيق' : 'Diagnosed Before Matching',
      desc: isAr
        ? 'نحدد فجوات المهارات الدقيقة، وقيود المجموعات، ومتطلبات التنفيذ مع قادة الموارد البشرية قبل البدء في التواصل.'
        : 'We identify the team’s exact skill gaps and workforce challenges with HR before reaching out.',
    },
    {
      title: isAr ? 'نخبة مختارة من الخبراء المعتمدين' : 'Curated, Proven Specialists',
      desc: isAr
        ? 'تتجاوز المؤسسات عروض المبيعات العشوائية وتقيّم 2 إلى 3 مزودين تم فحصهم بدقة ومواءمتهم مع أهدافها المحددة.'
        : 'Enterprises skip sales pitches and evaluate 2 to 3 thoroughly vetted providers matched to their specific objectives.',
    },
    {
      title: isAr ? 'تعاقدات جاهزة للتنفيذ الفوري' : 'Ready to Deliver Engagements',
      desc: isAr
        ? 'يستلم مزودو التدريب كراسات شروط محددة النطاق ومعتمدة الميزانية، ليركز المدربون بنسبة 100% على تحقيق أعلى أثر.'
        : 'Providers receive pre scoped, budget approved briefs so facilitators can dedicate 100% of their energy to high impact delivery.',
    },
  ];

  return (
    <section
      id="our-mission"
      className="relative overflow-hidden bg-black pt-16 sm:pt-20 pb-20 sm:pb-28 text-white scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby="mission-title"
    >
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <TextReveal
            as="h2"
            text={
              isAr
                ? 'إصلاح منظومة تدريب الشركات المنفصلة عن الواقع'
                : 'Fixing the Disconnected Corporate Training Ecosystem'
            }
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-[1.15] mb-6"
          />

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
            {isAr
              ? 'لفترة طويلة، عانى سوق تدريب الشركات من الاحتكاك وعدم التكافؤ. تغرق المؤسسات في كتالوجات غير ملائمة، بينما يعتمد أفضل مزودو التدريب على اتصالات عشوائية.'
              : 'For too long, the corporate training market has been plagued by friction. Enterprises waste weeks sifting through generic catalogs, while elite providers rely on unpredictable outbound outreach.'}
          </p>
        </div>

        {/* Split Comparison Cards (2-column layout matching Picture 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Card 1: The Traditional Way (Negative / Friction State) */}
          <CardTilt3D maxTilt={4} glareOpacity={0.10} className="h-full">
            <div className="rounded-3xl border border-[#26282D] hover:border-red-900/40 bg-[#0F1013] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_15px_35px_-10px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col text-white h-full relative">
              <BorderGlow glowColor="rgba(239, 68, 68, 0.3)" size={280} opacity={0.5} />
              {/* Real Cluttered Desk Photo Header */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black">
                <Image
                  src="/images/traditional-cluttered-desk.webp"
                  alt={isAr ? 'بيئة العمل التقليدية المزدحمة' : 'Traditional cluttered and overwhelmed desk'}
                  fill
                  className="object-cover brightness-[0.85] contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Badges overlaid on top of photo (as shown in picture 4) */}
                <div className="absolute top-4 start-4 end-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#0F1013]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-md border border-[#26282D]">
                    {isAr ? 'البحث التقليدي عن التدريب' : 'TRADITIONAL TRAINING SEARCH'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-md border border-red-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    {isAr ? 'أسابيع ضائعة' : 'WEEKS LOST'}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-2xl sm:text-[26px] font-bold text-white font-heading mb-5">
                    {isAr ? 'الطريقة التقليدية' : 'The Traditional Way'}
                  </h3>

                  {/* Soft Red Container with negative points */}
                  <div className="rounded-2xl bg-[#16171B] border border-red-900/30 p-5 sm:p-6 space-y-4">
                    {traditionalPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-200">
                          <XCircle size={15} />
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-white">
                            {point.title}:{' '}
                            <span className="font-normal text-neutral-300">{point.desc}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardTilt3D>

          {/* Card 2: The PontLook Way (Positive / Solution State) */}
          <CardTilt3D maxTilt={4} glareOpacity={0.12} className="h-full">
            <div className="rounded-3xl border border-white/20 hover:border-white/35 bg-[#0F1013] overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_20px_50px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col text-white relative h-full">
              <BorderBeam size={260} duration={14} colorFrom="#FF5C00" colorTo="#10B981" />
              <BorderGlow glowColor="rgba(16, 185, 129, 0.35)" size={280} opacity={0.5} />
              {/* Real Clean Architecture Photo Header */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-black">
                <Image
                  src="/images/pontlook-clean-office.webp"
                  alt={isAr ? 'مكتب عصري ومشرق يجسد دقة بونت لوك' : 'Clean, bright modern executive desk'}
                  fill
                  className="object-cover contrast-[1.05]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* Badges overlaid on top of photo */}
                <div className="absolute top-4 start-4 end-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F1013]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider border border-[#26282D] shadow-md">
                    <Signal />
                    <span>{isAr ? 'طريقة بونت لوك' : 'THE PONTLOOK WAY'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-400 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/40 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {isAr ? 'موثق ومباشر' : 'VERIFIED & DIRECT'}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-2xl sm:text-[26px] font-bold text-white font-heading mb-5">
                    {isAr ? 'طريقة بونت لوك' : 'The PontLook Way'}
                  </h3>

                  {/* Soft Emerald Container with positive points */}
                  <div className="rounded-2xl bg-[#16171B] border border-emerald-900/30 p-5 sm:p-6 space-y-4">
                    {pontlookPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                          <CheckCircle2 size={15} />
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold text-white">
                            {point.title}:{' '}
                            <span className="font-normal text-neutral-300">{point.desc}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardTilt3D>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 3: VALUE MODEL & BILATERAL ALIGNMENT (LIGHT THEME)
   ========================================================================== */
export function ValueModelBilateral({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';

  const models = [
    {
      eyebrow: isAr ? 'للمؤسسات والشركات' : 'FOR ENTERPRISE BUYERS',
      price: isAr ? 'مجاني 100%' : '100% Free',
      priceSub: isAr ? 'بدون أي رسوم نهائياً' : 'Free, always',
      promise: isAr
        ? 'وصول كامل إلى محرك التشخيص، وتحديد المواصفات، وقائمة الشركاء المؤهلين بدون أي رسوم اشتراك شهرية أو عمولات خفية.'
        : 'Corporate teams access the diagnostic engine, requirements scoping, and curated partner shortlist with no retainers and no platform fees.',
      points: [
        isAr ? 'تشخيص دقيق للاحتياجات التدريبية قبل التوفيق' : 'No subscription fees or hidden service markups',
        isAr ? 'تقييم حر وغير ملزم لـ 2 إلى 3 مزودين معتمدين' : 'Evaluate 2 to 3 vetted specialists with zero pressure',
        isAr ? 'عروض تدريبية مفصلة حسب الميزانية ومطابقة للمستهدفات' : 'Custom proposals tailored directly to your team’s KPIs',
      ],
      tag: isAr ? 'ميزة تنافسية للشركات' : 'Enterprise Advantage',
      isFeatured: false,
    },
    {
      eyebrow: isAr ? 'لمزودي ومراكز التدريب' : 'FOR TRAINING PROVIDERS',
      price: isAr ? 'مبني على النتائج' : 'Success-Based',
      priceSub: isAr ? 'ادفع لكل فرصة مؤكدة' : 'Pay Per Verified Lead',
      promise: isAr
        ? 'تخلص من تكاليف التسويق البارد. ادفع فقط عند الربط المباشر بصناع قرار معتمدين لديهم ميزانيات معتمدة واحتياجات مؤكدة.'
        : 'Eliminate business development overhead. Providers only pay when connected with verified enterprise decision makers with confirmed budgets and active training mandates.',
      points: [
        isAr ? 'بدون أي اشتراكات أو تكاليف تأسيسية دورية' : 'No upfront retainers, no arbitrary monthly agency fees',
        isAr ? 'بيانات كاملة وسياق تفصيلي لاحتياجات العميل' : 'Comprehensive intake briefs with verified budget parameters',
        isAr ? 'ضمان استبدال فوري بنسبة 100% لأي فرصة غير مطابقة' : '100% replacement guarantee if scope criteria are not met',
      ],
      tag: isAr ? 'ضمان الاستبدال' : 'Replacement Guarantee',
      isFeatured: true,
    },
    {
      eyebrow: isAr ? 'ضمان جودة ثنائي الأطراف' : 'BILATERAL QUALITY ASSURANCE',
      price: isAr ? '2 إلى 3 كحد أقصى' : '2 to 3 Max',
      priceSub: isAr ? 'الدقة والجودة فوق الكمية' : 'Precision Over Volume',
      promise: isAr
        ? 'نلتزم بعدم تقديم أكثر من 2 إلى 3 مزودين لكل طلب تدريبي، لضمان عدم إرهاق الشركات، ومنافسة المزودين بناءً على الجودة والقيمة.'
        : 'We cap provider introductions at 2 to 3 per mandate, ensuring enterprises aren’t overwhelmed and providers compete on merit rather than price wars.',
      points: [
        isAr ? 'حماية وقت مسؤولي الموارد البشرية من العروض العشوائية' : 'HR leaders aren’t flooded with dozens of generic pitches',
        isAr ? 'فرص إغلاق أعلى وأكثر جدوى لمزودي التدريب' : 'Higher win rates and healthier margins for providers',
        isAr ? 'مواءمة حقيقية مبنية على التخصص والخبرة الإقليمية' : 'Curated matching strictly by domain expertise and GCC track record',
      ],
      tag: isAr ? 'التزام الجودة' : 'Quality Commitment',
      isFeatured: false,
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-black py-24 sm:py-32 text-white"
      aria-labelledby="value-model-title"
    >
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2
            id="value-model-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-[1.15] mb-6"
          >
            {isAr ? (
              <>
                ادفع فقط مقابل <span className="text-primary font-bold">النتائج المؤهلة</span>. وبدون اشتراكات شهرية.
              </>
            ) : (
              <>
                Pay Only for <span className="text-primary font-bold">Qualified Outcomes</span>. No Retainers.
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
            {isAr
              ? 'نربط نموذج عملنا مباشرة بالقيمة الملموسة. تستفيد الشركات من محرك التشخيص مجاناً، بينما يدفع مزودو التدريب فقط مقابل الفرص الموثقة.'
              : 'We align our revenue directly with customer value. Enterprises access our diagnostic network for free, while training providers only pay for verified, budget-confirmed introductions.'}
          </p>
        </div>

        {/* 3 Pricing/Trust Architecture Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch pt-4">
          {models.map((card, idx) => (
            <div key={idx} className="relative flex flex-col h-full">
              {card.isFeatured && (
                <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider shadow-lg z-20 whitespace-nowrap pointer-events-none">
                  {isAr ? 'النموذج الأكثر فاعلية' : 'CORE REVENUE MODEL'}
                </div>
              )}

              <div
                className={`rounded-3xl p-5 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full ${
                  card.isFeatured
                    ? 'bg-[#0F1013] border border-blue-500/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_20px_50px_-10px_rgba(0,82,255,0.22)] text-white'
                    : 'bg-[#0F1013] border border-[#26282D] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:border-white/20 text-white'
                }`}
              >
                {card.isFeatured && (
                  <BorderBeam size={260} duration={12} colorFrom="#0052FF" colorTo="#4D7CFF" />
                )}

                <div>
                  {/* Eyebrow */}
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-4">
                    {card.eyebrow}
                  </span>

                  {/* Price Display */}
                  <div className="mb-6">
                    <div className={`text-4xl sm:text-5xl font-extrabold font-heading tracking-tight ${card.isFeatured ? 'text-primary' : 'text-white'}`}>
                      {card.price}
                    </div>
                    <div className="text-sm font-medium text-neutral-400 mt-1">
                      {card.priceSub}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#26282D] my-6" />

                  {/* Core Promise */}
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-normal">
                    {card.promise}
                  </p>

                  {/* Checklist */}
                  <div className="space-y-2.5 mb-8">
                    {card.points.map((point, pIdx) => (
                      <div key={pIdx} className="text-sm text-neutral-400">
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tag / Footer Pill */}
                <div className="pt-6 border-t border-[#26282D]">
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full ${
                      card.isFeatured
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-[#16171B] text-neutral-300 border border-[#26282D]'
                    }`}
                  >
                    {card.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION 4: THE END TO END TRAINING JOURNEY (UNIFIED MASTER CARD)
   ========================================================================== */
export function TrainingJourneyFlow({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [modalStageIndex, setModalStageIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const elapsedRef = useRef(0);
  const STEP_DURATION = 5000; // 5 seconds per stage

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key when pop-up window is open
  useEffect(() => {
    if (modalStageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalStageIndex(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalStageIndex]);

  const handleStepChange = (newStep: number) => {
    elapsedRef.current = 0;
    setProgress(0);
    setActiveStep(newStep);
  };

  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
  }, [activeStep]);

  useEffect(() => {
    if (isPaused || modalStageIndex !== null) return;

    const startTime = performance.now() - elapsedRef.current;
    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      elapsedRef.current = elapsed;
      const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(pct);

      if (elapsed >= STEP_DURATION) {
        elapsedRef.current = 0;
        setProgress(0);
        setActiveStep((prev) => (prev + 1) % 4);
      } else {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeStep, isPaused, modalStageIndex]);

  // Mobile swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minDistance = 50;
    if (isAr) {
      if (distance > minDistance) {
        handleStepChange(activeStep === 0 ? 3 : activeStep - 1);
      } else if (distance < -minDistance) {
        handleStepChange((activeStep + 1) % 4);
      }
    } else {
      if (distance > minDistance) {
        handleStepChange((activeStep + 1) % 4);
      } else if (distance < -minDistance) {
        handleStepChange(activeStep === 0 ? 3 : activeStep - 1);
      }
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const steps = [
    {
      num: '01',
      navTitle: isAr ? '01 فجوة المهارات' : '01 Enterprise Need',
      step: isAr ? 'المرحلة 1: احتياج المؤسسة' : 'Stage 1: Enterprise Need',
      title: isAr ? 'فجوة مهارات مؤسسية وتشخيص' : 'Enterprise Skill Gap & Diagnostic',
      desc: isAr
        ? 'تحدد إدارة الموارد البشرية عجزاً تشغيلياً أو قيادياً حرجاً. استيعاب دقيق: حجم المجموعات، طريقة التنفيذ، المتطلبات بالرياض ودبي، والميزانية.'
        : 'HR identifies a critical operational or leadership deficiency. Deep intake: cohort sizing, delivery mode, Riyadh/Dubai onsite requirements, approved budget.',
      tag: isAr ? 'تم التحقق من النطاق والميزانية' : 'Scope & Budget Verified',
      icon: SlidersHorizontal,
      iconColor: 'text-neutral-200',
      iconBg: 'bg-white/10 text-white border-white/20',
      points: [
        {
          label: isAr ? 'تم تصنيف الفجوة' : 'Deficiency Tagged',
          text: isAr ? 'حصر العجز التشغيلي والقيادي وتحديد الأهداف' : 'Operational & leadership gap analysis',
        },
        {
          label: isAr ? 'استيعاب النطاق' : 'Cohort Sizing & Mode',
          text: isAr ? 'حضوري بالرياض/دبي أو تدريب افتراضي تفاعلي' : 'Onsite Riyadh, Dubai, or virtual delivery',
        },
        {
          label: isAr ? 'ميزانية معتمدة' : 'Approved Budget',
          text: isAr ? 'تحديد الميزانية والأهداف التدريبية مسبقاً' : 'Pre-allocated budget & learning objectives',
        },
      ],
      takeaways: [
        isAr ? 'حصر الفجوات التشغيلية والقيادية بالتعاون مع مسؤولي الموارد البشرية' : 'Comprehensive workforce deficiency audit conducted with HR leaders',
        isAr ? 'تحديد دقيق لأعداد الموظفين المستهدفين والمدن (الرياض، دبي، أو افتراضياً)' : 'Exact cohort sizing and location mapping (Riyadh, Dubai, or live-virtual)',
        isAr ? 'مواءمة الميزانية المعتمدة قبل طرح المتطلبات على المزودين' : 'Pre-allocated budget validation prior to provider engagement',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <SlidersHorizontal size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'مصفوفة تشخيص فجوات الكفاءة' : 'Capability Gap Matrix'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'حصر متطلبات الفوج والأهداف' : 'Pre-Delivery Diagnostic Brief'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {isAr ? 'تم التحقق' : 'Verified'}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'فجوة القيادة التنفيذية:' : 'Executive Leadership Gap:'}</span>
              <span className="text-white font-medium">{isAr ? '35 مدير إدارة · الرياض' : '35 Managers · Riyadh'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'التحول الرقمي والذكاء الاصطناعي:' : 'Digital Transformation:'}</span>
              <span className="text-blue-400 font-medium">{isAr ? '60 محلل بيانات · تدريب هجين' : '60 Analysts · Hybrid'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'الميزانية والجدول الزمني:' : 'Budget & Timeline:'}</span>
              <span className="text-emerald-400 font-medium">{isAr ? 'معتمدة بالكامل · انطلاق فوري' : 'Fully Approved · Q1 Start'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      navTitle: isAr ? '02 توفيق الخبراء' : '02 Specialist Match',
      step: isAr ? 'المرحلة 2: جسر الربط المحوري' : 'Stage 2: Focal Bridge',
      title: isAr ? 'توفيق دقيق ومختار' : 'Curated Specialist Matchmaking',
      desc: isAr
        ? 'فرز تحليلي وبشري يسلمك 2 إلى 3 خبراء معتمدين مع عروض متوافقة تماماً مع الميزانية. تتجاوز المؤسسة مكالمات المبيعات العشوائية وتقيّم الأنسب فوراً.'
        : 'Analyst-led curation delivering 2 to 3 vetted specialists with budget aligned proposals. HR skips sales pitches and evaluates proven providers.',
      tag: isAr ? 'محرك بونت لوك المركزي' : 'PontLook Core Engine',
      icon: BadgeCheck,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
      points: [
        {
          label: isAr ? 'عروض لنخبة المزودين' : '2 to 3 Vetted Specialists',
          text: isAr ? 'نخبة مزودي التدريب المفحوصين بدقة واعتماد' : 'Only elite approved providers evaluated',
        },
        {
          label: isAr ? 'مواءمة 100% مع الميزانية' : 'Budget Aligned Proposals',
          text: isAr ? 'عروض أسعار واضحة مطابقة للميزانية المعتمدة' : 'Clear pricing matched to approved budget',
        },
        {
          label: isAr ? 'دقة توافق 98%' : '98% Fit Confidence',
          text: isAr ? 'سجل إنجازات وتقييمات موثقة للمدربين' : 'Verified instructor credentials & past client ratings',
        },
      ],
      takeaways: [
        isAr ? 'استلام 2 إلى 3 عروض مفصلة من نخبة مزودي التدريب المفحوصين' : '2 to 3 tailored proposals from pre-vetted elite corporate providers',
        isAr ? 'تسعير شفاف وبنود واضحة متطابقة 100% مع الميزانية بدون عمولات خفية' : '100% itemized pricing aligned to budget with zero intermediary markups',
        isAr ? 'درجة ثقة وملاءمة 98% مبنية على سجل تدريب مؤسسي موثق' : '98% verified fit confidence supported by regional GCC track records',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                <BadgeCheck size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'لوحة فحص ومطابقة الخبراء' : 'Curated Matchmaking Console'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'أفضل 3 عروض متوافقة' : 'Top 3 Shortlisted Proposals'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {isAr ? 'مطابقة 98%' : '98% Fit'}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-white font-medium">{isAr ? 'مزود أ (خبير قيادة معتمد):' : 'Provider Alpha (Leadership):'}</span>
              <span className="text-emerald-400 font-semibold">{isAr ? 'توافق 98% · 20+ عميل خليجي' : '98% Match · 20+ GCC Clients'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-white font-medium">{isAr ? 'مزود ب (معهد تدريب مرخص):' : 'Provider Beta (Operations):'}</span>
              <span className="text-blue-400 font-semibold">{isAr ? 'توافق 95% · ورش عمل تفاعلية' : '95% Match · Interactive Onsite'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-white font-medium">{isAr ? 'مزود ج (تطوير تنفيذي):' : 'Provider Gamma (Executive):'}</span>
              <span className="text-neutral-300 font-semibold">{isAr ? 'توافق 92% · تسعير مطابق' : '92% Match · Budget Aligned'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      navTitle: isAr ? '03 تنفيذ مخصص' : '03 Tailored Rollout',
      step: isAr ? 'المرحلة 3: إطلاق سلس' : 'Stage 3: Seamless Rollout',
      title: isAr ? 'تنفيذ تدريبي مخصص وتأهيل' : 'Tailored Delivery Execution',
      desc: isAr
        ? 'توقيع التعاقد، مواءمة المناهج التدريبية، وبدء المدربين والخبراء. يركز مزودو التدريب بنسبة 100% على تقديم أعلى جودة وتفاعل.'
        : 'Contract execution, tailored curriculum, and facilitator onboarding. Providers focus 100% of their energy on high impact workshop delivery.',
      tag: isAr ? 'اكتمل التأهيل والبدء' : 'Onboarding Ready',
      icon: GraduationCap,
      iconColor: 'text-teal-400',
      iconBg: 'bg-teal-600/20 text-teal-400 border-teal-500/30',
      points: [
        {
          label: isAr ? 'مواءمة المناهج التدريبية' : 'Tailored Curriculum',
          text: isAr ? 'تخصيص المحتوى التدريبي وفق أهداف الشركة' : 'Content customized to strategic skill gaps',
        },
        {
          label: isAr ? 'بدء المدربين والخبراء' : 'Facilitator Onboarding',
          text: isAr ? 'مواءمة مباشرة مع نخبة الميسرين المعتمدين' : 'Direct alignment with master trainers',
        },
        {
          label: isAr ? 'جاهزية المتدربين' : 'Cohort Readiness',
          text: isAr ? 'انطلاق سلس للبرنامج وتأهيل كامل للمتدربين' : 'Seamless kickoff and cohort onboarding',
        },
      ],
      takeaways: [
        isAr ? 'مواءمة المنهج والمحتوى التدريبي مع حالات عملية واقعية من بيئة المنشأة' : 'Curriculum adapted with real workplace case studies and organizational datasets',
        isAr ? 'اجتماع تنسيق ومواءمة مباشر مع كبار المدربين والميسرين قبل انطلاق البرنامج' : 'Direct alignment briefing between master facilitators and executive sponsors',
        isAr ? 'جاهزية كاملة للمتدربين مع تأهيل رقمي وجداول حضور دقيقة' : 'Seamless cohort kickoff, digital workbook onboarding, and attendance tracking',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
                <GraduationCap size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'خطة التنفيذ ومواءمة المنهج' : 'Execution & Syllabus Tracker'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'جاهزية الفوج والمدربين' : 'Cohort Readiness Console'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-teal-500/10 text-teal-400 border border-teal-500/20">
              {isAr ? 'انطلاق سلس' : 'Kickoff Ready'}
            </span>
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'المرحلة 1: القياس القبلي والتأهيل:' : 'Phase 1: Pre-Assessment & Setup:'}</span>
              <span className="text-emerald-400 font-medium">{isAr ? 'اكتمل 100%' : '100% Completed'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'المرحلة 2: ورش العمل التطبيقية:' : 'Phase 2: Applied Simulations:'}</span>
              <span className="text-teal-400 font-medium">{isAr ? 'قيد التنفيذ التفاعلي' : 'Active In-Progress'}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <span className="text-neutral-400">{isAr ? 'المرحلة 3: مشروع التخرج المهني:' : 'Phase 3: Real Business Capstone:'}</span>
              <span className="text-neutral-300 font-medium">{isAr ? 'مجدول بنهاية الشهر' : 'Scheduled End-of-Month'}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      navTitle: isAr ? '04 عائد موثق' : '04 Measurable ROI',
      step: isAr ? 'المرحلة 4: عائد موثق' : 'Stage 4: Verified ROI',
      title: isAr ? 'إغلاق فجوة المهارات وعائد استثماري' : 'Closed Skill Gap & Measurable ROI',
      desc: isAr
        ? 'ارتقاء ملموس بالكفاءات، تقييم موظفين دقيق، وعائد استثماري مستدام لإدارة الشركة. تم سد فجوة الكفاءة بنجاح.'
        : 'Measurable capability uplift, employee post evaluation, and sustained ROI delivered to executive leadership.',
      tag: isAr ? 'عائد استثماري ملموس' : 'Measurable ROI',
      icon: TrendingUp,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
      points: [
        {
          label: isAr ? 'ارتقاء ملموس بالكفاءات' : 'Measurable Capability Uplift',
          text: isAr ? 'توثيق تطور مهارات ومخرجات الموظفين' : 'Documented workforce competency boost',
        },
        {
          label: isAr ? 'تقييم موظفين دقيق' : 'Employee Post Evaluation',
          text: isAr ? 'قياس أثر التدريب بالأرقام والتحليلات' : 'Data-driven assessments & feedback analytics',
        },
        {
          label: isAr ? 'عائد استثماري مستدام' : 'Verified ROI Capture',
          text: isAr ? 'تحقيق قيمة تشغيلية حقيقية لإدارة الشركة' : 'Tangible business return for leadership',
        },
      ],
      takeaways: [
        isAr ? 'قياس كمي ودقيق لارتقاء كفاءات المتدربين مقارنة بالتقييم القبلي' : 'Quantitative post-evaluation measuring capability lift against baseline metrics',
        isAr ? 'تقارير أثر تفصيلية واستبانات رضا موثقة تُقدم للإدارة التنفيذية' : 'Executive report detailing participant mastery, satisfaction, and operational impact',
        isAr ? 'عائد استثماري ملموس ومستدام يعزز إنتاجية المنشأة ويقلل الهدر' : 'Defensible ROI delivered to C-suite, closing workforce skill gaps definitively',
      ],
      mockup: (
        <div className="bg-[#16171B] rounded-xl border border-[#26282D] w-full p-4 flex flex-col gap-3 font-sans">
          <div className="flex items-center justify-between pb-2 border-b border-[#26282D]">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <TrendingUp size={14} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">
                  {isAr ? 'لوحة قياس الأثر والعائد المؤسسي' : 'Executive ROI Impact Dashboard'}
                </div>
                <div className="text-[10px] text-neutral-400">
                  {isAr ? 'مخرجات التقييم البعدي للمتدربين' : 'Post-Training Workforce Uplift'}
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {isAr ? 'عائد موثق' : 'Verified ROI'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <div className="text-[10px] text-neutral-400 font-sans">{isAr ? 'ارتقاء الكفاءة' : 'Efficiency'}</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">+38%</div>
              <div className="text-[9px] text-neutral-500">{isAr ? 'تحسن تشغيلي' : 'Ops Uplift'}</div>
            </div>
            <div className="p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <div className="text-[10px] text-neutral-400 font-sans">{isAr ? 'ثبات المعرفة' : 'Retention'}</div>
              <div className="text-sm font-bold text-white mt-0.5">94%</div>
              <div className="text-[9px] text-neutral-500">{isAr ? 'اختبار بعدي' : 'Post-Test'}</div>
            </div>
            <div className="p-2 rounded bg-[#0F1013] border border-[#26282D]">
              <div className="text-[10px] text-neutral-400 font-sans">{isAr ? 'تقييم المدرب' : 'Rating'}</div>
              <div className="text-sm font-bold text-orange-400 mt-0.5">4.9 / 5</div>
              <div className="text-[9px] text-neutral-500">{isAr ? 'رضا المشاركين' : 'Satisfaction'}</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      id="training-journey"
      className="relative overflow-hidden bg-black text-white pt-20 sm:pt-28 pb-20 sm:pb-28 scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby="journey-title"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-[550px] w-[1000px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,82,255,0.04),transparent_70%)] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 end-10 h-[380px] w-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04),transparent_70%)] blur-[100px]" />

      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#26282D] text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-5">
            <Workflow size={14} className="text-blue-500" />
            <span>{isAr ? 'آلية العمل خطوة بخطوة' : 'HOW IT WORKS IN PRACTICE'}</span>
          </div>

          <TextReveal
            as="h2"
            text={
              isAr
                ? 'رحلة التدريب المتكاملة من البداية حتى قياس الأثر'
                : 'The End to End Training Journey'
            }
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-[1.15] mb-5"
          />

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal font-sans">
            {isAr
              ? 'جسر شفاف وسلس يربط الاحتياج التدريبي المشخص بالحلول العملية ذات العائد الاستثماري القابل للقياس.'
              : 'A seamless, transparent bridge from diagnosed skill deficit to measurable business impact.'}
          </p>
        </div>

        {/* 4-Step Segmented Navigation Header (Touch-optimized with live white line) */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 w-full max-w-4xl mx-auto overflow-x-auto scrollbar-none px-4 sm:px-0 py-1">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => handleStepChange(idx)}
                className={`group relative shrink-0 sm:flex-1 min-w-[125px] sm:min-w-0 flex flex-col justify-between py-2.5 sm:py-3 px-3 sm:px-4 rounded-2xl border transition-all duration-200 text-xs font-medium cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-white/[0.08] text-white border-white/30 shadow-lg'
                    : 'bg-[#0F1013] text-neutral-400 border-[#26282D] hover:border-white/20 hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between w-full gap-2 mb-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`text-[11px] font-mono font-bold shrink-0 ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                      {s.num}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap truncate">
                      {s.navTitle.replace(/^\d+\s*/, '')}
                    </span>
                  </div>
                  {isActive && (
                    <div className="shrink-0">
                      <Signal size={16} />
                    </div>
                  )}
                </div>

                {/* White Progress Line on Active Tab */}
                <div className="w-full h-[3px] rounded-full bg-white/10 overflow-hidden">
                  {isActive ? (
                    <div
                      className="h-full bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                      style={{ width: `${progress}%` }}
                    />
                  ) : idx < activeStep ? (
                    <div className="h-full bg-white/30 rounded-full w-full" />
                  ) : (
                    <div className="h-full w-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Unified Master Card Container (Houses the entire 4-stage journey in ONE card) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl border border-[#26282D] hover:border-white/25 bg-[#0F1013] p-4 sm:p-8 lg:p-12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_24px_50px_-12px_rgba(0,0,0,0.85)] overflow-hidden text-white transition-all duration-300"
        >
          <BorderBeam size={320} duration={16} colorFrom="#FF5C00" colorTo="#0052FF" />
          {/* Ambient Corner Glow */}
          <div className="absolute -top-24 -end-24 w-72 h-72 bg-gradient-to-bl from-blue-500/[0.06] via-purple-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <m.div
              key={currentStep.num}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
            >
              {/* Left Column: Stage Metadata, Title, Description & Step Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16171B] border border-[#26282D] text-xs font-semibold text-white">
                    <Signal size={14} />
                    <span>{currentStep.step}</span>
                    <span className="text-neutral-500 font-mono">· {currentStep.num}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{currentStep.tag}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-heading tracking-tight leading-tight">
                  {currentStep.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans font-normal">
                  {currentStep.desc}
                </p>

                {/* Directional Step Navigation */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleStepChange(activeStep === 0 ? steps.length - 1 : activeStep - 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-[#26282D] transition-all cursor-pointer active:scale-95 font-sans"
                  >
                    <ArrowLeft size={14} className="rtl:-scale-x-100" />
                    <span>{isAr ? 'المرحلة السابقة' : 'Previous Stage'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStepChange((activeStep + 1) % steps.length)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-medium bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 hover:border-white/30 transition-all cursor-pointer active:scale-95 shadow-sm font-sans"
                  >
                    <span>{isAr ? 'المرحلة التالية' : 'Next Stage'}</span>
                    <ArrowRight size={14} className="rtl:-scale-x-100" />
                  </button>
                </div>
              </div>

              {/* Right Column: Deliverables & Verification Console */}
              <div className="lg:col-span-6">
                <div className="rounded-2xl bg-[#16171B] border border-[#26282D] p-5 sm:p-6 space-y-4 shadow-xl">
                  {/* Console Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#26282D]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans">
                      {isAr ? 'مخرجات المرحلة والتحقق المعتمد' : 'Key Deliverables & Verification'}
                    </div>
                    <div className="text-xs font-bold text-white font-mono">
                      {activeStep + 1} / {steps.length}
                    </div>
                  </div>

                  {/* Progress Gauge: Live White Line */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-neutral-400 font-sans">
                      <span>{isAr ? 'مستوى تقدم المرحلة الحالية' : 'Live Stage Progress'}</span>
                      <span className="font-semibold text-white font-mono">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* 3 Checklist Deliverables */}
                  <ul className="space-y-2.5 pt-2">
                    {currentStep.points.map((point, pIdx) => (
                      <li key={pIdx} className="text-xs sm:text-sm leading-snug font-sans">
                        <span className="font-semibold text-white">{point.label}: </span>
                        <span className="text-neutral-400">{point.text}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Interactive Stage Deep Dive Trigger */}
                  <div className="pt-2 border-t border-[#26282D]/80">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPaused(true);
                        setModalStageIndex(activeStep);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer font-sans group active:scale-95"
                    >
                      <span>{isAr ? 'عرض وثائق ومخرجات هذه المرحلة' : 'Inspect Deliverables & Artifacts'}</span>
                      <ArrowRight size={13} className="rtl:-scale-x-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        {/* Micro-CTA Footer */}
        <div className="mt-14 pt-8 border-t border-[#26282D]/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              {isAr
                ? 'هل تبحث عن حل لفجوة تدريبية في شركتك؟'
                : 'Need to bridge an enterprise workforce gap?'}
            </span>
            <Link
              href={`/${lang}/find-training`}
              className="text-white hover:text-neutral-300 font-semibold underline underline-offset-4 ms-1 transition-colors"
            >
              {isAr ? 'سجل احتياجك التدريبي مجاناً ←' : 'Post a Training Need →'}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white/60" />
            <span>
              {isAr
                ? 'هل أنت مركز تدريب مؤسسي معتمد؟'
                : 'Are you a top corporate training provider?'}
            </span>
            <Link
              href={`/${lang}/for-providers`}
              className="text-white hover:text-neutral-300 font-semibold underline underline-offset-4 ms-1 transition-colors"
            >
              {isAr ? 'انضم كشريك تدريب معتمد ←' : 'Apply as an Approved Provider →'}
            </Link>
          </div>
        </div>
      </div>

      {/* Stage Detail Pop-Up Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {modalStageIndex !== null && steps[modalStageIndex] && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
                role="dialog"
                aria-modal="true"
                aria-labelledby="journey-modal-title"
              >
                {/* Backdrop */}
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setModalStageIndex(null)}
                  className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
                />

                {/* Modal Container */}
                <m.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="relative z-10 w-full max-w-2xl sm:max-w-3xl max-h-[85dvh] sm:max-h-[88vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0F1013] border border-[#26282D] text-white shadow-2xl shadow-black my-auto overflow-hidden"
                >
                  {/* Header */}
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.25 }}
                    className="flex items-center justify-between p-4 sm:p-5 border-b border-[#26282D] gap-3 shrink-0"
                  >
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div className={`h-8 w-8 rounded-lg ${steps[modalStageIndex].iconBg} flex items-center justify-center font-bold`}>
                        {React.createElement(steps[modalStageIndex].icon, { size: 16 })}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold font-sans bg-white/[0.06] text-white border border-white/10">
                        {steps[modalStageIndex].step}
                      </span>
                      <span className="text-[11px] sm:text-xs font-medium font-sans text-neutral-400">
                        {steps[modalStageIndex].tag}
                      </span>
                    </div>

                    <m.button
                      type="button"
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setModalStageIndex(null)}
                      aria-label={isAr ? 'إغلاق النافذة' : 'Close modal'}
                      className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                    >
                      <X size={15} />
                    </m.button>
                  </m.div>

                  {/* Scrollable Body */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 overscroll-contain">
                    <m.div
                      initial={{ opacity: 0, x: isAr ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                    >
                      <h3
                        id="journey-modal-title"
                        className="text-base sm:text-xl font-semibold text-white tracking-tight leading-snug font-heading"
                      >
                        {steps[modalStageIndex].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mt-1.5">
                        {steps[modalStageIndex].desc}
                      </p>
                    </m.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-stretch">
                      {/* Takeaways / SLAs */}
                      <m.div
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="rounded-xl p-3.5 sm:p-4 bg-[#16171B] border border-[#26282D] flex flex-col justify-between space-y-2.5"
                      >
                        <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider font-sans">
                          {isAr ? 'شروط وضمانات المرحلة' : 'Deliverables & SLAs'}
                        </div>
                        <ul className="space-y-2 text-xs text-neutral-200 font-sans">
                          {steps[modalStageIndex].takeaways.map((point: string, pIdx: number) => (
                            <m.li
                              key={pIdx}
                              initial={{ opacity: 0, x: isAr ? 12 : -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.24 + pIdx * 0.06,
                                type: 'spring',
                                stiffness: 320,
                                damping: 22,
                              }}
                              className="flex items-start gap-2 leading-relaxed"
                            >
                              <BadgeCheck size={14} className="text-blue-400 shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </m.li>
                          ))}
                        </ul>
                      </m.div>

                      {/* Mockup proof widget */}
                      <m.div
                        initial={{ opacity: 0, x: isAr ? -15 : 15, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ delay: 0.22, duration: 0.35 }}
                        className="flex items-center"
                      >
                        {steps[modalStageIndex].mockup}
                      </m.div>
                    </div>
                  </div>

                  {/* Fixed Footer */}
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.3 }}
                    className="p-3.5 sm:p-5 border-t border-[#26282D] bg-[#0F1013] shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <span className="text-[11px] text-neutral-400 font-sans hidden sm:inline">
                      {isAr ? 'انقر في المساحة الفارغة أو زر Esc للإغلاق' : 'Click outside or press Esc to close'}
                    </span>

                    <m.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="w-full sm:w-auto"
                    >
                      <Link
                        href={`/${lang}/find-training/request`}
                        onClick={() => setModalStageIndex(null)}
                        className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm active:scale-[0.98] transition-all font-sans shadow-md shadow-blue-500/20"
                      >
                        <span>{isAr ? 'ابدأ طلب التدريب الآن' : 'Request Training Proposals'}</span>
                        <ArrowRight size={14} className="ms-1.5 rtl:-scale-x-100" />
                      </Link>
                    </m.div>
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

/* ==========================================================================
   MASTER COMPOSITE EXPORT
   ========================================================================== */
export default function WhoWeAreSections({ lang = 'en' }: WhoWeAreProps) {
  return (
    <>
      <MissionSplitComparison lang={lang} />
      <ValueModelBilateral lang={lang} />
      <TrainingJourneyFlow lang={lang} />
    </>
  );
}
