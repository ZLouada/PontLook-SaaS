'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';

export default function HowItWorks() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';

  const cards = [
    // Card 1: Step 01 - Amber / Gold Accent
    {
      id: 'step1',
      stepNumber: '01',
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
            ? 'نرصد باستمرار مؤشرات التوظيف، إعادة الهيكلة، وفجوات الكفاءات عبر الشركات في السعودية والإمارات.'
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
      // Right side: Amber Tinted Canvas with Authentic Dark Console
      canvasBg: 'bg-[#17150E] border-amber-500/25',
      console: (
        <div className="w-full bg-[#0B0C0E] rounded-xl border border-white/10 p-4 sm:p-5 shadow-2xl space-y-3 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'رادار الاحتياج المؤسسي' : 'Enterprise Demand Feed'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAr ? 'إشارة نشطة' : 'Active Signal'}</span>
            </div>
          </div>

          {/* Lead Item 1 */}
          <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-1.5 text-xs">
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
          <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-1.5 text-xs">
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
      tag: isAr ? 'الخطوة 02 // التأهيل والربط الذكي' : 'STEP 02 // FIT SCORING & QUALIFICATION',
      tagColor: 'text-purple-400',
      headline: isAr
        ? 'تأهيل دقيق لأصحاب القرار، الميزانيات، والجداول الزمنية'
        : 'Score and qualify decision makers, budgets, and timelines',
      actionText: isAr ? 'اكتشف آلية المطابقة' : 'Learn more',
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
      // Right side: Purple Tinted Canvas with Authentic Dark Console
      canvasBg: 'bg-[#151222] border-purple-500/25',
      console: (
        <div className="w-full bg-[#0B0C0E] rounded-xl border border-white/10 p-4 sm:p-5 shadow-2xl space-y-3 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'منظومة المطابقة الذكية' : 'AI Match & Qualification'}
              </span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <span>94%</span>
              <span className="text-[10px] font-normal">{isAr ? 'تطابق' : 'Match'}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-neutral-300 font-medium">
              <span>{isAr ? 'معايير التأهيل المكتملة' : 'Criteria Fulfilled'}</span>
              <span className="font-bold text-white">4 / 4 Complete</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full w-[94%]" />
            </div>
          </div>

          {/* Checklist items */}
          <div className="space-y-1.5 pt-1 text-xs text-neutral-300">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>
                {isAr
                  ? 'صاحب القرار: رئيس الموارد البشرية التنفيذي'
                  : 'Decision Maker: Chief Human Resources Officer'}
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.04] border border-white/[0.08]">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>
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
      // Right side: Teal Tinted Canvas with Authentic Dark Console
      canvasBg: 'bg-[#0E1715] border-teal-500/25',
      console: (
        <div className="w-full bg-[#0B0C0E] rounded-xl border border-white/10 p-4 sm:p-5 shadow-2xl space-y-3 font-sans">
          {/* Console Window Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-neutral-400 text-[11px] font-medium ms-2">
                {isAr ? 'لوحة التعاقد المباشر' : 'Direct Engagement Console'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-400 text-[10px] font-semibold">
              <CheckCircle2 size={12} />
              <span>{isAr ? 'تم التقديم' : 'Intro Complete'}</span>
            </div>
          </div>

          {/* Status Box */}
          <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">{isAr ? 'حالة الفرصة' : 'Pipeline Status'}</span>
              <span className="font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded text-[11px] border border-emerald-500/30">
                {isAr ? 'مرحلة تقديم العرض الفني' : 'Proposal Review Stage'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">{isAr ? 'ضمان الفرصة' : 'Guarantee SLA'}</span>
              <span className="font-medium text-white">
                {isAr ? 'ضمان استبدال خلال 5 أيام' : '5 Day Replacement Guarantee'}
              </span>
            </div>
          </div>

          {/* Contract Terms */}
          <div className="pt-1 flex items-center justify-between text-xs text-neutral-400">
            <span>{isAr ? 'بدون عمولات خفية' : 'Zero hidden fees'}</span>
            <span className="font-bold text-teal-400">
              {isAr ? 'علاقة تعاقدية مباشرة 100%' : '100% Direct Contract'}
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      data-nav-dark="true"
      className="relative bg-[#000000] text-white py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Subtle Pure AMOLED Ambient Lighting (Zero Grids) */}
      <div className="absolute top-1/4 start-1/4 w-[600px] h-[600px] bg-blue-600/[0.04] blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 end-1/4 w-[600px] h-[600px] bg-purple-600/[0.03] blur-[180px] pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 text-start max-w-3xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              <span>{dict.how_it_works?.eyebrow || (isAr ? 'في ثلاث خطوات فقط' : 'Just in three steps')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.03em] leading-tight font-heading">
              {dict.how_it_works?.title || (isAr ? 'نرصد بدقة المنشآت التي تواجه فجوات تدريبية ومهارية حقيقية' : 'We pinpoint organizations facing real skill & training gaps')}
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
              {dict.how_it_works?.subtitle || (isAr ? 'منهجيتنا: كيف نربط السوق ونتحقق من الاحتياج ونطابق المزود الأنسب' : 'OUR APPROACH: How We Connect the Market: Learn, Diagnose, and Get Matched')}
            </p>
          </Reveal>
        </div>

        {/* 3 Horizontal Showcase Cards Stack (Twingate Style) */}
        <div className="space-y-8 sm:space-y-10">
          {cards.map((card, index) => (
            <Reveal key={card.id} delay={index * 0.1}>
              <div className="relative rounded-3xl bg-[#0B0C0E] border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300 p-6 sm:p-8 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Category Tag, Title, Action Pill, 3 Points with Chevrons */}
                  <div className="lg:col-span-6 flex flex-col items-start text-start">
                    {/* Eyebrow Tag with Accent Color */}
                    <div className={`${card.tagColor} text-xs font-bold uppercase tracking-wider mb-2.5`}>
                      {card.tag}
                    </div>

                    {/* High-Contrast Bold Headline */}
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-heading font-medium text-white tracking-[-0.03em] leading-tight mb-4">
                      {card.headline}
                    </h3>

                    {/* Dark Action Pill (Learn more >) */}
                    <Link
                      href={card.actionHref}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/15 transition-all duration-200 mb-6 group"
                    >
                      <span>{card.actionText}</span>
                      <ArrowRight
                        size={13}
                        className="rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform"
                      />
                    </Link>

                    {/* 3 Points with Chevrons */}
                    <div className="space-y-4 w-full pt-1 border-t border-white/10">
                      {card.points.map((pt) => (
                        <div key={pt.title} className="space-y-1">
                          <div className="text-sm sm:text-base font-semibold text-neutral-100 font-heading">
                            {pt.title}
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                            {pt.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Accent Tinted Canvas with Dark Console */}
                  <div className="lg:col-span-6 w-full">
                    <div className={`w-full rounded-2xl ${card.canvasBg} border p-4 sm:p-7 shadow-inner relative overflow-hidden flex items-center justify-center`}>
                      {card.console}
                    </div>
                  </div>

                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

