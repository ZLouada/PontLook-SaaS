'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Compass,
  Cpu,
  Lock,
  Plane,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Zap,
  Building2,
  ClipboardCheck,
  Handshake,
  GraduationCap,
  BarChart3,
  Workflow,
} from 'lucide-react';

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
        : 'Buying off-the-shelf training without diagnosing whether they bridge actual capability gaps.',
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
        ? 'تتجاوز المؤسسات عروض المبيعات العشوائية وتقيّم 2–3 مزودين تم فحصهم بدقة ومواءمتهم مع أهدافها المحددة.'
        : 'Enterprises skip sales pitches and evaluate 2–3 thoroughly vetted providers matched to their specific objectives.',
    },
    {
      title: isAr ? 'تعاقدات جاهزة للتنفيذ الفوري' : 'Ready-to-Deliver Engagements',
      desc: isAr
        ? 'يستلم مزودو التدريب كراسات شروط محددة النطاق ومعتمدة الميزانية، ليركز المدربون بنسبة 100% على تحقيق أعلى أثر.'
        : 'Providers receive pre-scoped, budget-approved briefs so facilitators can dedicate 100% of their energy to high-impact delivery.',
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-slate-50/60 py-20 sm:py-28 border-t border-slate-200/80"
      aria-labelledby="mission-title"
    >
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span>{isAr ? 'رسالتنا وسبب وجودنا' : 'OUR MISSION & WHY WE EXIST'}</span>
          </div>

          <h2
            id="mission-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 font-heading tracking-tight leading-[1.15] mb-6"
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

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {isAr
              ? 'لفترة طويلة، عانى سوق تدريب الشركات من الاحتكاك وعدم التكافؤ. تغرق المؤسسات في كتالوجات غير ملائمة، بينما يعتمد أفضل مزودو التدريب على اتصالات عشوائية.'
              : 'For too long, the corporate training market has been plagued by friction. Enterprises waste weeks sifting through generic catalogs, while elite providers rely on unpredictable outbound outreach.'}
          </p>
        </div>

        {/* Split Comparison Cards (2-column layout matching Picture 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Card 1: The Traditional Way (Negative / Friction State) */}
          <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
            {/* Real Cluttered Desk Photo Header */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
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
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-bold uppercase tracking-wider shadow-sm border border-white/60">
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
                <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 font-heading mb-5">
                  {isAr ? 'الطريقة التقليدية' : 'The Traditional Way'}
                </h3>

                {/* Soft Red Container with negative points */}
                <div className="rounded-2xl bg-red-50/70 border border-red-200/70 p-5 sm:p-6 space-y-4">
                  {traditionalPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 border border-red-200">
                        <XCircle size={15} />
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900">
                          {point.title}:{' '}
                          <span className="font-normal text-slate-700">{point.desc}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: The PontLook Way (Positive / Solution State) */}
          <div className="rounded-3xl border border-blue-200/90 bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">
            {/* Real Clean Office Photo Header */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/pontlook-clean-office.webp"
                alt={isAr ? 'مكتب عصري ومشرق يجسد دقة بونت لوك' : 'Clean, bright modern executive desk'}
                fill
                className="object-cover contrast-[1.05]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Badges overlaid on top of photo (as shown in picture 4) */}
              <div className="absolute top-4 start-4 end-4 flex items-center justify-between pointer-events-none">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#0052FF] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {isAr ? 'طريقة بونت لوك' : 'THE PONTLOOK WAY'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  {isAr ? 'موثق ومباشر' : 'VERIFIED & DIRECT'}
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 font-heading mb-5">
                  {isAr ? 'طريقة بونت لوك' : 'The PontLook Way'}
                </h3>

                {/* Soft Emerald Container with positive points */}
                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200/70 p-5 sm:p-6 space-y-4">
                  {pontlookPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                        <CheckCircle2 size={15} />
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900">
                          {point.title}:{' '}
                          <span className="font-normal text-slate-700">{point.desc}</span>
                        </p>
                      </div>
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
        isAr ? 'تقييم حر وغير ملزم لـ 2–3 مزودين معتمدين' : 'Evaluate 2–3 pre-vetted specialists with zero pressure',
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
        : 'Eliminate business development overhead. Providers only pay when connected with verified enterprise decision-makers with confirmed budgets and active training mandates.',
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
      price: isAr ? '2–3 كحد أقصى' : '2–3 Max',
      priceSub: isAr ? 'الدقة والجودة فوق الكمية' : 'Precision Over Volume',
      promise: isAr
        ? 'نلتزم بعدم تقديم أكثر من 2 إلى 3 مزودين لكل طلب تدريبي، لضمان عدم إرهاق الشركات، ومنافسة المزودين بناءً على الجودة والقيمة.'
        : 'We cap provider introductions at 2 to 3 per mandate, ensuring enterprises aren’t overwhelmed and providers compete on merit rather than price wars.',
      points: [
        isAr ? 'حماية وقت مسؤولي الموارد البشرية من العروض العشوائية' : 'HR leaders aren’t flooded with dozens of generic pitches',
        isAr ? 'فرص إغلاق أعلى وأكثر جدوى لمزودي التدريب' : 'Higher win-rates and healthier margins for providers',
        isAr ? 'مواءمة حقيقية مبنية على التخصص والخبرة الإقليمية' : 'Curated matching strictly by domain expertise and GCC track record',
      ],
      tag: isAr ? 'التزام الجودة' : 'Quality Commitment',
      isFeatured: false,
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-white py-24 sm:py-32 border-t border-slate-200/80"
      aria-labelledby="value-model-title"
    >
      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-5">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>{isAr ? 'تسعير شفاف ومواءمة مصالح حقيقية' : 'TRANSPARENT PRICING & INCENTIVE ALIGNMENT'}</span>
          </div>

          <h2
            id="value-model-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 font-heading tracking-tight leading-[1.15] mb-6"
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

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
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
                  ? 'bg-gradient-to-b from-blue-50/50 via-white to-white border-2 border-primary/40 shadow-lg shadow-blue-500/10 relative ring-1 ring-blue-500/20'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300'
              }`}
            >
              {card.isFeatured && (
                <div className="absolute -top-3.5 start-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  {isAr ? 'النموذج الأكثر فاعلية' : 'CORE REVENUE MODEL'}
                </div>
              )}

              <div>
                {/* Eyebrow */}
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-4">
                  {card.eyebrow}
                </span>

                {/* Price Display */}
                <div className="mb-6">
                  <div className={`text-4xl sm:text-5xl font-extrabold font-heading tracking-tight ${card.isFeatured ? 'text-primary' : 'text-slate-900'}`}>
                    {card.price}
                  </div>
                  <div className="text-sm font-medium text-slate-500 mt-1">
                    {card.priceSub}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-100 my-6" />

                {/* Core Promise */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                  {card.promise}
                </p>

                {/* Checklist */}
                <div className="space-y-3.5 mb-8">
                  {card.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tag / Footer Pill */}
              <div className="pt-6 border-t border-slate-100">
                <span
                  className={`inline-flex items-center text-xs font-mono font-semibold px-3 py-1.5 rounded-full ${
                    card.isFeatured
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
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
   SECTION 4: THE END-TO-END TRAINING JOURNEY (4-STEP LIGHT CARDS)
   ========================================================================== */
export function TrainingJourneyFlow({ lang = 'en' }: WhoWeAreProps) {
  const isAr = lang === 'ar';

  const steps = [
    {
      num: '01',
      step: isAr ? 'المرحلة 1: احتياج المؤسسة' : 'Stage 1: Enterprise Need',
      title: isAr ? 'فجوة مهارات مؤسسية وتشخيص' : 'Enterprise Skill Gap & Diagnostic',
      desc: isAr
        ? 'تحدد إدارة الموارد البشرية عجزاً تشغيلياً أو قيادياً حرجاً. استيعاب دقيق: حجم المجموعات، طريقة التنفيذ، المتطلبات بالرياض ودبي، والميزانية.'
        : 'HR identifies a critical operational or leadership deficiency. Deep intake: cohort sizing, delivery mode, Riyadh/Dubai onsite requirements, approved budget.',
      tag: isAr ? 'تم التحقق من النطاق والميزانية' : 'Scope & Budget Verified',
      isLive: true,
      icon: ClipboardCheck,
      iconBg: 'bg-blue-50 border-blue-100 text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      dotColor: 'bg-emerald-500',
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
      step: isAr ? 'جسر الربط المحوري' : 'Stage 2: Focal Bridge',
      title: isAr ? 'توفيق دقيق ومختار' : 'Curated Specialist Matchmaking',
      desc: isAr
        ? 'فرز ذكي وبشري يسلمك 2–3 خبراء معتمدين مع عروض متوافقة تماماً مع الميزانية. تتجاوز المؤسسة مكالمات المبيعات العشوائية وتقيّم الأنسب فوراً.'
        : 'AI + Human curation delivering 2–3 pre-vetted specialists with budget-aligned proposals. HR skips sales pitches and evaluates proven providers.',
      tag: isAr ? 'محرك بونت لوك المركزي' : 'PontLook Core Engine',
      isLive: false,
      icon: Handshake,
      iconBg: 'bg-indigo-50 border-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      dotColor: 'bg-blue-500',
      points: [
        {
          label: isAr ? '2–3 عروض لنخبة المزودين' : '2–3 Pre-Vetted Specialists',
          text: isAr ? 'نخبة مزودي التدريب المفحوصين بدقة واعتماد' : 'Only elite approved providers evaluated',
        },
        {
          label: isAr ? 'مواءمة 100% مع الميزانية' : 'Budget-Aligned Proposals',
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
      step: isAr ? 'المرحلة 3: إطلاق سلس' : 'Stage 3: Seamless Rollout',
      title: isAr ? 'تنفيذ تدريبي مخصص وتأهيل' : 'Tailored Delivery Execution',
      desc: isAr
        ? 'توقيع التعاقد، مواءمة المناهج التدريبية، وبدء المدربين والخبراء. يركز مزودو التدريب بنسبة 100% على تقديم أعلى جودة وتفاعل.'
        : 'Contract execution, tailored curriculum, and facilitator onboarding. Providers focus 100% of their energy on high-impact workshop delivery.',
      tag: isAr ? 'اكتمل التأهيل والبدء' : 'Onboarding Ready',
      isLive: false,
      icon: GraduationCap,
      iconBg: 'bg-teal-50 border-teal-100 text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600',
      badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
      dotColor: 'bg-teal-500',
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
      step: isAr ? 'المرحلة 4: عائد موثق' : 'Stage 4: Verified ROI',
      title: isAr ? 'إغلاق فجوة المهارات وعائد استثماري' : 'Closed Skill Gap & Measurable ROI',
      desc: isAr
        ? 'ارتقاء ملموس بالكفاءات، تقييم موظفين دقيق، وعائد استثماري مستدام لإدارة الشركة. تم سد فجوة الكفاءة بنجاح.'
        : 'Measurable capability uplift, employee post-evaluation, and sustained ROI delivered to executive leadership.',
      tag: isAr ? 'عائد استثماري ملموس' : 'Measurable ROI',
      isLive: false,
      icon: BarChart3,
      iconBg: 'bg-emerald-50 border-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      dotColor: 'bg-emerald-500',
      points: [
        {
          label: isAr ? 'ارتقاء ملموس بالكفاءات' : 'Measurable Capability Uplift',
          text: isAr ? 'توثيق تطور مهارات ومخرجات الموظفين' : 'Documented workforce competency boost',
        },
        {
          label: isAr ? 'تقييم موظفين دقيق' : 'Employee Post-Evaluation',
          text: isAr ? 'قياس أثر التدريب بالأرقام والتحليلات' : 'Data-driven assessments & feedback analytics',
        },
        {
          label: isAr ? 'عائد استثماري مستدام' : 'Verified ROI Capture',
          text: isAr ? 'تحقيق قيمة تشغيلية حقيقية لإدارة الشركة' : 'Tangible business return for leadership',
        },
      ],
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-slate-50/60 text-slate-900 py-24 sm:py-32 border-t border-slate-200/80"
      aria-labelledby="journey-title"
    >
      {/* Dynamic Ambient Background Glows (Light Mode) */}
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-[550px] w-[1000px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,82,255,0.04),transparent_70%)] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-1/4 end-10 h-[380px] w-[450px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04),transparent_70%)] blur-[100px]" />

      <div className="container-site relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-5">
            <Workflow size={14} className="text-blue-600" />
            <span>{isAr ? 'آلية العمل خطوة بخطوة' : 'HOW IT WORKS IN PRACTICE'}</span>
          </div>

          <h2
            id="journey-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 font-heading tracking-tight leading-[1.15] mb-5"
          >
            {isAr ? (
              <>
                رحلة التدريب المتكاملة <br className="hidden sm:inline" />
                <span className="text-primary font-bold">من البداية حتى قياس الأثر</span>
              </>
            ) : (
              <>
                The End-to-End <br className="hidden sm:inline" />
                <span className="text-primary font-bold">Training Journey</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            {isAr
              ? 'جسر شفاف وسلس يربط الاحتياج التدريبي المشخص بالحلول العملية ذات العائد الاستثماري القابل للقياس.'
              : 'A seamless, transparent bridge from diagnosed skill deficit to measurable business impact.'}
          </p>
        </div>

        {/* 2x2 Grid of Pure Light Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-3xl border border-slate-200/90 bg-white hover:border-primary/50 p-6 sm:p-8 lg:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 group overflow-hidden"
            >
              {/* Ambient Corner Glow on Hover */}
              <div
                className="absolute -top-20 -end-20 w-52 h-52 bg-gradient-to-bl from-blue-500/[0.04] via-transparent to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"
              />

              <div>
                {/* Card Top Header: Step Number, Icon, and Tag */}
                <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-xs transition-all duration-300 ${step.iconBg}`}
                    >
                      <step.icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider block">
                        {step.step}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        STEP {step.num}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border ${step.badgeColor}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${step.dotColor} ${
                        step.isLive ? 'animate-pulse' : ''
                      }`}
                    />
                    <span>{step.tag}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight mb-3 group-hover:text-primary transition-colors relative z-10">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal relative z-10">
                  {step.desc}
                </p>
              </div>

              {/* Deliverables / Checklist in dedicated micro-panel */}
              <div className="rounded-2xl bg-slate-50/80 border border-slate-200/70 p-4 sm:p-5 space-y-3 group-hover:border-slate-300/80 transition-colors mt-2 relative z-10">
                {step.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">{point.label}: </span>
                      <span className="font-normal text-slate-600">{point.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Micro-CTA Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              {isAr
                ? 'هل تبحث عن حل لفجوة تدريبية في شركتك؟'
                : 'Need to bridge an enterprise workforce gap?'}
            </span>
            <Link
              href={`/${lang}/find-training`}
              className="text-slate-900 hover:text-primary font-semibold underline underline-offset-4 ms-1 transition-colors"
            >
              {isAr ? 'سجل احتياجك التدريبي مجاناً ←' : 'Post a Training Need →'}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>
              {isAr
                ? 'هل أنت مركز تدريب مؤسسي معتمد؟'
                : 'Are you a top corporate training provider?'}
            </span>
            <Link
              href={`/${lang}/for-providers`}
              className="text-slate-900 hover:text-primary font-semibold underline underline-offset-4 ms-1 transition-colors"
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
