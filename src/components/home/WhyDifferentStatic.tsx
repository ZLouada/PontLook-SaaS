import React from 'react';
import Link from 'next/link';
import {
  Target,
  BadgeCheck,
  Building2,
  Handshake,
  BookOpen,
  ArrowRight,
} from '@/components/icons';
import Signal from '@/components/shared/Signal';
import IconFrame, { type IconFrameVariant } from '@/components/shared/IconFrame';
import { Locale } from '@/i18n/config';

interface WhyDifferentStaticProps {
  lang: Locale;
  dict: any;
}

export default function WhyDifferentStatic({ lang, dict }: WhyDifferentStaticProps) {
  const isAr = lang === 'ar';
  const c = dict?.why_different?.cards;

  const items = [
    // Card 1: Diagnose
    {
      id: 'diagnose',
      index: '01',
      icon: Target,
      badge: isAr ? 'تشخيص' : 'DIAGNOSE',
      title: c?.diagnose?.title || (isAr ? 'شخّص فجواتك المهارية بدقة' : 'Pinpoint Your Exact Skill Gaps'),
      angle: isAr ? 'تشخيص السبب الجذري قبل إنفاق الميزانية' : 'Root Cause Skill Diagnosis',
      text:
        c?.diagnose?.text ||
        (isAr
          ? 'متردد بين التدريب الإداري، أو التقني، أو تطوير ثقافة العمل؟ نساعدك على تشخيص السبب الجذري قبل إنفاق الميزانية.'
          : 'Unsure whether you need management training, technical upskilling, or cultural alignment? We help you diagnose the root cause before spending budget.'),
      cta: c?.diagnose?.cta || (isAr ? 'اقرأ أدلة التشخيص المهاري' : 'Read our diagnosis guides'),
      href: `/${lang}/resources/blog`,
      takeaways: [
        isAr ? 'تحليل عميق لاحتياجات الفرق التنفيذية' : 'Deep departmental skill gap discovery',
        isAr ? 'تحديد أولويات البرامج ذات الأثر المباشر' : 'Prioritized ROI focused learning roadmaps',
        isAr ? 'تجنب هدر الميزانيات في تدريب غير مجدٍ' : 'Eliminate wasted corporate training budget',
      ],
      badgeBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200',
      themeVariant: 'dark' as IconFrameVariant,
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
            <span className="px-2 py-0.5 rounded-md bg-neutral-200/70 text-neutral-900 text-[10px] font-medium font-sans">
              {c?.diagnose?.tagLeadership || (isAr ? 'فجوة القيادة التنفيذية' : 'Leadership Pipeline')}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-200/70 text-neutral-900 text-[10px] font-medium font-sans">
              {c?.diagnose?.tagSales || (isAr ? 'تباطؤ سرعة المبيعات' : 'B2B Sales Velocity')}
            </span>
          </div>
        </div>
      ),
    },

    // Card 2: 100% Verified
    {
      id: 'vetted',
      index: '02',
      icon: BadgeCheck,
      badge: isAr ? 'معتمد وموثق' : 'VETTED',
      title: c?.vetted?.title || (isAr ? 'مزودو تدريب معتمدون خليجياً 100%' : '100% Verified Regional Providers'),
      angle: isAr ? 'فحص السجل والاعتمادات الرسمية' : 'Proof of Track Record Over Pitches',
      text:
        c?.vetted?.text ||
        (isAr
          ? 'لا نعتمد على العروض التسويقية البراقة. كل مزود تدريب يتم فحص سجل إنجازاته، واعتماداته الرسمية، وملاءمته لبيئة العمل الخليجية.'
          : 'No marketing fluff. Every training partner is rigorously screened for proven track record, enterprise references, and cultural alignment.'),
      cta: c?.vetted?.cta || (isAr ? 'استكشف معايير الاعتماد' : 'See our vetting standards'),
      href: `/${lang}/find-training`,
      takeaways: [
        isAr ? 'فحص دقيق لتراخيص واعتمادات المؤسسات' : 'Official institutional credential verification',
        isAr ? 'تقييم مراجع حقيقية وتوصيات من شركات سابقة' : 'Verified past enterprise client reviews',
        isAr ? 'فهم عميق لمتطلبات وثقافة العمل الخليجية' : 'Deep GCC regional cultural alignment',
      ],
      badgeBg: 'bg-emerald-500/10 text-emerald-800 border border-emerald-500/25',
      themeVariant: 'emerald' as IconFrameVariant,
      mockup: (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/90 w-full p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <IconFrame variant="emerald" size="xs">
                <BadgeCheck size={14} />
              </IconFrame>
              <div>
                <div className="text-xs font-semibold text-neutral-900 font-sans">
                  {c?.vetted?.mockupHeader || (isAr ? 'مزود تدريب معتمد في السعودية والإمارات' : 'Saudi & UAE Accredited Provider')}
                </div>
                <div className="text-[10px] text-neutral-500 font-sans">
                  {c?.vetted?.mockupSubheader || (isAr ? 'مؤسسة معتمدة رسمياً' : 'Institutionally Verified')}
                </div>
              </div>
            </div>
            <Signal tone="emerald" size={12} />
          </div>
          <div className="flex items-center gap-2 text-[10px] text-emerald-800 font-medium font-sans pt-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span>{c?.vetted?.badgeRating || (isAr ? 'تقييم 4.9/5 · 12+ عقداً مؤسسياً ناجحاً' : '4.9/5 Rating · 12+ Enterprise Cohorts')}</span>
          </div>
        </div>
      ),
    },

    // Card 3: Free for Enterprise Clients
    {
      id: 'free',
      index: '03',
      icon: Building2,
      badge: isAr ? 'مجاناً للشركات' : 'ZERO RISK',
      title: c?.free?.title || (isAr ? 'مجاناً 100% للشركات والمنشآت' : '100% Free For Enterprise Clients'),
      angle: isAr ? 'بدون رسوم اشتراك أو عمولات مشتريات' : 'Zero Client Fees, Pure Value',
      text:
        c?.free?.text ||
        (isAr
          ? 'لا اشتراكات، لا رسوم استشارات مخفية، ولا هوامش ربح على التدريب. تدفع للشركاء التدريبيين مباشرة وبنفس أسعارهم الأصلية.'
          : 'Zero subscription fees, zero platform markups, zero hidden retainers. You pay verified trainers directly at transparent rates.'),
      cta: c?.free?.cta || (isAr ? 'تعرف على نموذج عملنا' : 'Understand how we make money'),
      href: `/${lang}/who-we-are`,
      takeaways: [
        isAr ? 'استخدام مجاني بالكامل لمدراء الموارد البشرية' : 'Completely free for enterprise HR leaders',
        isAr ? 'علاقة تعاقدية مباشرة مع المزودين دون وسطاء' : 'Direct bilateral contracts with providers',
        isAr ? 'أسعار تدريب أصلية ومباشرة بدون هوامش مضافة' : 'Zero markup on corporate training fees',
      ],
      badgeBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200',
      themeVariant: 'dark' as IconFrameVariant,
      mockup: (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/90 w-full p-3 flex flex-col gap-1.5 font-sans">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-200 text-xs font-semibold text-neutral-900">
            <span>{c?.free?.mockupHeader || (isAr ? 'تكلفة المنصة على المنشأة' : 'PontLook Enterprise Pricing')}</span>
            <span className="text-emerald-700 font-bold">$0</span>
          </div>
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-neutral-600">
            <span>{c?.free?.feeSubscription || (isAr ? 'رسوم الاشتراك' : 'Subscription')}</span>
            <span className="font-semibold text-neutral-900">$0</span>
          </div>
          <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-neutral-600">
            <span>{c?.free?.feeMatchmaking || (isAr ? 'رسوم التوفيق والربط' : 'Matchmaking')}</span>
            <span className="font-semibold text-neutral-900">$0</span>
          </div>
        </div>
      ),
    },

    // Card 4: Pre-Scoped, Funded Engagements
    {
      id: 'ready',
      index: '04',
      icon: Handshake,
      badge: isAr ? 'جاهزية' : 'SERIOUS',
      title: c?.ready?.title || (isAr ? 'فرص محددة النطاق وبميزانيات مؤكدة' : 'Pre-Scoped, Funded Engagements'),
      angle: isAr ? 'ميزانيات مؤكدة وموافقة تنفيذية مسبقة' : 'Active Purchasing Intent',
      text:
        c?.ready?.text ||
        (isAr
          ? 'يتم التحقق من ميزانية وجدية كل طلب مؤسسي وموافقة صاحب القرار قبل ربطه بأي شريك تدريبي.'
          : 'Every corporate request is verified for budget, timeline, and decision-maker buy-in before reaching a training partner.'),
      cta: c?.ready?.cta || (isAr ? 'استعرض الفرص النشطة' : 'View active demand'),
      href: `/${lang}/for-providers`,
      takeaways: [
        isAr ? 'فرص تدريبية مؤكدة وجاهزة للبدء' : 'Verified immediate enterprise opportunities',
        isAr ? 'ضمان استبدال الفرصة غير المتوافقة' : '5 day lead replacement guarantee',
        isAr ? 'دفع حصري لكل فرصة مؤهلة' : 'Strict pay per qualified lead model',
      ],
      badgeBg: 'bg-orange-500/10 text-[#FF5C00] border border-[#FF5C00]/25',
      themeVariant: 'brand' as IconFrameVariant,
      mockup: (
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/90 w-full p-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-200 text-xs font-semibold text-neutral-900 font-sans">
            <span>{c?.ready?.mockupHeader || (isAr ? 'جاهزية الشراكة | مؤكدة' : 'Partnership Readiness | Confirmed')}</span>
            <Signal tone="orange" size={12} />
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
              <span className="text-[#FF5C00] font-semibold">{c?.ready?.fitVal || (isAr ? 'توافق كامل' : '100% Verified')}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 5: Free Regional L&D Toolkits
    {
      id: 'hub',
      index: '05',
      icon: BookOpen,
      badge: isAr ? 'أدلة مجانية' : 'LEARN',
      title: c?.hub?.title || (isAr ? 'حقائب وأدلة تطويرية مجانية' : 'Free Regional L&D Toolkits'),
      angle: isAr ? 'أدلة مجانية ودراسات سوقية موثوقة' : 'Free Practical Frameworks & Benchmarks',
      text:
        c?.hub?.text ||
        (isAr
          ? 'أدلة عملية، ومؤشرات فجوات التوطين الخليجية، ونماذج قياس عائد الاستثمار على التدريب — مجاناً بالكامل على مدونتنا.'
          : 'Practical guides, Saudization/Emiratization workforce benchmarks, and corporate training ROI templates—completely free on our blog.'),
      cta: c?.hub?.cta || (isAr ? 'تصفح الأدلة والموارد المجانية' : 'Browse free resources'),
      href: `/${lang}/resources`,
      takeaways: [
        isAr ? 'أدلة تدقيق وتحليل التعلم والتطوير خطوة بخطوة' : 'Step by step L&D audit frameworks',
        isAr ? 'تقارير دورية حول اتجاهات الرواتب والمهارات' : 'Regional workforce shortage benchmarks',
        isAr ? 'دراسات حالة حول قياس أثر التدريب وعائده' : 'Practical case studies on training ROI',
      ],
      badgeBg: 'bg-neutral-100 text-neutral-950 border border-neutral-200',
      themeVariant: 'dark' as IconFrameVariant,
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

  return (
    <section
      data-nav-light="true"
      data-nav-theme="light"
      className="relative bg-white text-neutral-900 py-12 xs:py-14 sm:py-16 lg:py-20 border-t border-neutral-200"
    >
      <div className="container-site relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-5 sm:mb-8 text-center max-w-3xl mx-auto space-y-2 sm:space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold uppercase tracking-wider font-sans mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-950 animate-pulse" />
            <span>{dict?.why_different?.eyebrow || (isAr ? 'حلول عملية مباشرة' : 'PROBLEM SOLVED')}</span>
          </div>

          <h2 className="h-section text-neutral-950">
            {dict?.why_different?.title || (isAr ? 'حدد فجواتك بدقة. ارتبط بنخبة الخبراء المعتمدين. بدون أي تعقيدات مشتريات.' : 'Pinpoint your gaps. Connect with vetted experts. Zero procurement friction.')}
          </h2>

          <p className="text-sm text-neutral-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {dict?.why_different?.subtitle ||
              (isAr
                ? 'نحلل التحديات المؤسسية الحقيقية لنقدم أدلة مجانية قابلة للتطبيق، ونربط قادة التدريب مباشرة بمزودي البرامج المعتمدين والمؤهلين لتنفيذ الحل.'
                : 'We analyze real GCC workplace challenges to deliver free, actionable problem solving guides on our blog, and directly connect corporate leaders with the verified training providers ready to implement the solution.')}
          </p>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 font-sans">
            <span>{isAr ? 'اسحب لعرض جميع البطاقات · انقر لفتح النافذة' : 'Swipe to view cards · Tap any card to open window'}</span>
          </div>
        </div>

        {/* cards grid */}
        <div className="rail items-stretch gap-3 px-1 -mx-1 pb-2 sm:gap-3.5 sm:pb-3 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.id}
                className="relative w-[78vw] sm:w-[250px] lg:w-auto shrink-0 lg:shrink snap-center h-[272px] sm:h-[280px] lg:h-[305px] xl:h-[295px]"
              >
                <div className="h-full w-full">
                  <div className="group relative w-full h-full rounded-2xl bg-white border border-neutral-200/90 p-3.5 sm:p-4 lg:p-3 xl:p-4 flex flex-col justify-between cursor-pointer select-none shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300">
                    {/* Card Front Top */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium font-sans ${it.badgeBg}`}>
                          {it.badge}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {it.index}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-0.5">
                        <IconFrame variant={it.themeVariant} size="sm">
                          <Icon size={18} />
                        </IconFrame>
                        <h3 className="font-heading font-semibold text-neutral-950 text-sm sm:text-base leading-snug line-clamp-2">
                          {it.title}
                        </h3>
                      </div>

                      {it.angle && (
                        <p className="text-[11px] sm:text-xs font-semibold text-neutral-800 line-clamp-1 font-sans">
                          {it.angle}
                        </p>
                      )}

                      <p className="text-[11px] sm:text-xs text-neutral-600 line-clamp-2 leading-relaxed font-sans">
                        {it.text}
                      </p>
                    </div>

                    {/* Card Mockup Visual */}
                    <div className="w-full my-auto">
                      {it.mockup}
                    </div>

                    {/* Card Footer CTA */}
                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-medium text-neutral-800 font-sans">
                      <span className="truncate">{it.cta}</span>
                      <ArrowRight size={13} className="rtl:-scale-x-100 text-neutral-400 shrink-0 ms-1" />
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
