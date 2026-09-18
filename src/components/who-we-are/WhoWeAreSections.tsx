'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  XCircle,
  ShieldCheck,
  ClipboardCheck,
  Handshake,
  GraduationCap,
  BarChart3,
  Workflow,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

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
      className="relative overflow-hidden bg-[#08090A] py-20 sm:py-28 text-white"
      aria-labelledby="mission-title"
    >
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#26282D] text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span>{isAr ? 'رسالتنا وسبب وجودنا' : 'OUR MISSION & WHY WE EXIST'}</span>
          </div>

          <h2
            id="mission-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-[1.15] mb-6"
          >
            {isAr ? (
              <>
                إصلاح منظومة تدريب الشركات <br className="hidden sm:inline" />
                <span className="text-primary font-bold">المنفصلة عن الواقع</span>
              </>
            ) : (
              <>
                Fixing the Disconnected <br className="hidden sm:inline" />
                <span className="text-primary font-bold">Corporate Training Ecosystem</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal">
            {isAr
              ? 'لفترة طويلة، عانى سوق تدريب الشركات من الاحتكاك وعدم التكافؤ. تغرق المؤسسات في كتالوجات غير ملائمة، بينما يعتمد أفضل مزودو التدريب على اتصالات عشوائية.'
              : 'For too long, the corporate training market has been plagued by friction. Enterprises waste weeks sifting through generic catalogs, while elite providers rely on unpredictable outbound outreach.'}
          </p>
        </div>

        {/* Split Comparison Cards (2-column layout matching Picture 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Card 1: The Traditional Way (Negative / Friction State) */}
          <div className="rounded-3xl border border-[#26282D] bg-[#0F1013] overflow-hidden shadow-xl transition-all duration-300 flex flex-col text-white">
            {/* Real Cluttered Desk Photo Header */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#08090A]">
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
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-sm border border-white/60">
                  {isAr ? 'البحث التقليدي عن التدريب' : 'TRADITIONAL TRAINING SEARCH'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  {isAr ? 'أسابيع ضائعة' : 'WEEKS LOST'}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
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

          {/* Card 2: The PontLook Way (Positive / Solution State) */}
          <div className="rounded-3xl border border-[#26282D] bg-[#0F1013] overflow-hidden shadow-xl transition-all duration-300 flex flex-col text-white">
            {/* Real Clean Architecture Photo Header */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#08090A]">
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
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/[0.08] text-white text-[11px] font-bold uppercase tracking-wider border border-white/20 shadow-md">
                  {isAr ? 'طريقة بونت لوك' : 'THE PONTLOOK WAY'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-500/30 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {isAr ? 'موثق ومباشر' : 'VERIFIED & DIRECT'}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-[26px] font-bold text-white font-heading mb-5">
                  {isAr ? 'طريقة بونت لوك' : 'The PontLook Way'}
                </h3>

                {/* Soft Emerald Container with positive points */}
                <div className="rounded-2xl bg-[#16171B] border border-emerald-900/30 p-5 sm:p-6 space-y-3.5">
                  {pontlookPoints.map((point, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="font-semibold text-white">
                        {point.title}:{' '}
                        <span className="font-normal text-neutral-300">{point.desc}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
      priceSub: isAr ? 'بدون أي رسوم نهائياً' : 'Zero Fees, Always',
      promise: isAr
        ? 'وصول كامل إلى محرك التشخيص، وتحديد المواصفات، وقائمة الشركاء المؤهلين بدون أي رسوم اشتراك شهرية أو عمولات خفية.'
        : 'Corporate teams access the diagnostic engine, requirements scoping, and curated partner shortlist with zero retainers and zero platform fees.',
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
        isAr ? 'بدون أي اشتراكات أو تكاليف تأسيسية دورية' : 'Zero upfront retainers or arbitrary monthly agency fees',
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
      className="relative overflow-hidden bg-[#08090A] py-24 sm:py-32 text-white"
      aria-labelledby="value-model-title"
    >
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#26282D] text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-5">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>{isAr ? 'تسعير شفاف ومواءمة مصالح حقيقية' : 'TRANSPARENT PRICING & INCENTIVE ALIGNMENT'}</span>
          </div>

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
                Pay Only for <span className="text-primary font-bold">Qualified Outcomes</span>. Zero Retainers.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {models.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                card.isFeatured
                  ? 'bg-[#0F1013] border border-white/30 shadow-2xl relative text-white'
                  : 'bg-[#0F1013] border border-[#26282D] shadow-xl hover:border-white/20 text-white'
              }`}
            >
              {card.isFeatured && (
                <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {isAr ? 'النموذج الأكثر فاعلية' : 'CORE REVENUE MODEL'}
                </div>
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
        setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
      } else if (distance < -minDistance) {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }
    } else {
      if (distance > minDistance) {
        setActiveStep((prev) => (prev + 1) % steps.length);
      } else if (distance < -minDistance) {
        setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
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
      icon: ClipboardCheck,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
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
    },
    {
      num: '02',
      navTitle: isAr ? '02 توفيق الخبراء' : '02 Specialist Match',
      step: isAr ? 'المرحلة 2: جسر الربط المحوري' : 'Stage 2: Focal Bridge',
      title: isAr ? 'توفيق دقيق ومختار' : 'Curated Specialist Matchmaking',
      desc: isAr
        ? 'فرز ذكي وبشري يسلمك 2 إلى 3 خبراء معتمدين مع عروض متوافقة تماماً مع الميزانية. تتجاوز المؤسسة مكالمات المبيعات العشوائية وتقيّم الأنسب فوراً.'
        : 'AI + Human curation delivering 2 to 3 vetted specialists with budget aligned proposals. HR skips sales pitches and evaluates proven providers.',
      tag: isAr ? 'محرك بونت لوك المركزي' : 'PontLook Core Engine',
      icon: Handshake,
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
          label: isAr ? 'جاهزية المتدربين' : 'Zero Administrative Drag',
          text: isAr ? 'انطلاق سلس للبرنامج وتأهيل كامل للمتدربين' : 'Seamless kickoff and cohort onboarding',
        },
      ],
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
      icon: BarChart3,
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
    },
  ];

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section
      className="relative overflow-hidden bg-[#08090A] text-white py-20 sm:py-28"
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

          <h2
            id="journey-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-heading tracking-tight leading-[1.15] mb-5"
          >
            {isAr ? (
              <>
                رحلة التدريب المتكاملة <br className="hidden sm:inline" />
                <span className="text-blue-400 font-bold">من البداية حتى قياس الأثر</span>
              </>
            ) : (
              <>
                The End to End <br className="hidden sm:inline" />
                <span className="text-blue-400 font-bold">Training Journey</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto font-normal font-sans">
            {isAr
              ? 'جسر شفاف وسلس يربط الاحتياج التدريبي المشخص بالحلول العملية ذات العائد الاستثماري القابل للقياس.'
              : 'A seamless, transparent bridge from diagnosed skill deficit to measurable business impact.'}
          </p>
        </div>

        {/* 4-Step Segmented Navigation Header (Touch-optimized) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 mb-6 sm:mb-8 w-full max-w-4xl mx-auto overflow-x-auto scrollbar-none py-1">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`group relative flex-1 min-w-[130px] sm:min-w-0 flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-2xl border transition-all duration-200 text-xs font-medium cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-white/[0.08] text-white border-white/30 shadow-lg'
                    : 'bg-[#0F1013] text-neutral-400 border-[#26282D] hover:border-white/20 hover:text-neutral-200'
                }`}
              >
                <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-blue-400' : 'text-neutral-500'}`}>
                  {s.num}
                </span>
                <span className="truncate">
                  {s.navTitle}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Unified Master Card Container (Houses the entire 4-stage journey in ONE card) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative rounded-3xl border border-[#26282D] bg-[#0F1013] p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden text-white transition-all duration-300"
        >
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
                    <currentStep.icon size={15} className={currentStep.iconColor} />
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
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white border border-[#26282D] disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer active:scale-95 font-sans"
                  >
                    <ArrowLeft size={14} className="rtl:-scale-x-100" />
                    <span>{isAr ? 'المرحلة السابقة' : 'Previous Stage'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
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
                    <div className="text-xs font-bold text-blue-400 font-mono">
                      {activeStep + 1} / {steps.length}
                    </div>
                  </div>

                  {/* Progress Gauge */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-neutral-400 font-sans">
                      <span>{isAr ? 'مستوى تقدم رحلة التدريب' : 'Journey Progress'}</span>
                      <span className="font-semibold text-white">{((activeStep + 1) / steps.length) * 100}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
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
              className="text-white hover:text-blue-400 font-semibold underline underline-offset-4 ms-1 transition-colors"
            >
              {isAr ? 'سجل احتياجك التدريبي مجاناً ←' : 'Post a Training Need →'}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>
              {isAr
                ? 'هل أنت مركز تدريب مؤسسي معتمد؟'
                : 'Are you a top corporate training provider?'}
            </span>
            <Link
              href={`/${lang}/for-providers`}
              className="text-white hover:text-blue-400 font-semibold underline underline-offset-4 ms-1 transition-colors"
            >
              {isAr ? 'انضم كشريك تدريب معتمد ←' : 'Apply as an Approved Provider →'}
            </Link>
          </div>
        </div>
      </div>
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
