'use client';

import { useState } from 'react';
import {
  Target,
  ShieldCheck,
  Building2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';

interface CardItem {
  id: string;
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
}

export default function WhyDifferent() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';
  const isAr = lang === 'ar';
  const c = dict.why_different?.cards;

  const items: CardItem[] = [
    // Card 1: Diagnose Your Skill Gaps
    {
      id: 'diagnose',
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
      mockup: (
        <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] w-full p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                <Target size={16} />
              </div>
              <div>
                <div className="text-xs font-semibold text-white font-sans">
                  {c?.diagnose?.mockupHeader || (isAr ? 'تقييم فجوات الكفاءات' : 'Skill Gap Assessment')}
                </div>
                <div className="text-[10px] text-neutral-400 font-medium">
                  {c?.diagnose?.mockupSubheader || (isAr ? 'مستوى الإدارات المؤسسية' : 'Enterprise Department Level')}
                </div>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-400 text-[11px] font-mono font-semibold border border-blue-500/30">
              {c?.diagnose?.tag1 || (isAr ? '# فجوات القيادة والتقنية' : '# Leadership & Tech Gaps')}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-semibold border border-emerald-500/30">
              {c?.diagnose?.tag2 || (isAr ? 'خارطة طريق معتمدة' : 'Priority Roadmap')}
            </span>
          </div>
        </div>
      ),
    },

    // Card 2: Matched Directly with the Right Training Partner
    {
      id: 'match',
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
      mockup: (
        <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] w-full p-4 flex flex-col gap-2.5">
          <div className="text-xs font-semibold text-white pb-2 border-b border-white/[0.06] font-sans flex items-center justify-between">
            <span>{c?.match?.mockupHeader || (isAr ? 'قائمة معايير توافق الشريك' : 'Partner Fit Checklist')}</span>
            <ShieldCheck size={16} className="text-emerald-400" />
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
              <span>{c?.match?.check3 || (isAr ? 'متوافق مع جدولك وميزانيتك' : 'Aligned with your timeline and budget')}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 3: Direct Access to Verified Decision Makers
    {
      id: 'access',
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
      mockup: (
        <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] w-full p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-neutral-300 text-[10px] font-semibold uppercase">
              {c?.access?.clientTag || (isAr ? 'جهة مؤسسية · حوكمة ومخاطر' : 'Enterprise Client · GRC')}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30">
              {c?.access?.statusBadge || (isAr ? 'صلاحية الميزانية: مؤكدة' : 'Budget Authority: Confirmed')}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <div className="h-9 w-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Building2 size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white font-sans truncate">
                {c?.access?.role || (isAr ? 'رئيس قطاع الموارد البشرية (CHRO)' : 'Chief Human Resources Officer (CHRO)')}
              </div>
              <div className="text-[10px] text-neutral-400">{isAr ? 'تعاقد مباشر ومؤكد' : 'Verified Direct Engagement'}</div>
            </div>
          </div>
        </div>
      ),
    },

    // Card 4: Clients Ready to Partner
    {
      id: 'ready',
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
      mockup: (
        <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] w-full p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06] text-xs font-semibold text-white font-sans">
            <span>{c?.ready?.mockupHeader || (isAr ? 'جاهزية الشراكة | مؤكدة' : 'Partnership Readiness | Verified')}</span>
            <CheckCircle2 size={14} className="text-emerald-400" />
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 font-medium">{c?.ready?.needLabel || (isAr ? 'الاحتياج التدريبي' : 'Client Need')}</span>
              <span className="font-semibold text-white">{c?.ready?.needVal || (isAr ? 'برنامج القيادة التنفيذية' : 'Executive Leadership Program')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 font-medium">{c?.ready?.budgetLabel || (isAr ? 'الميزانية المعتمدة' : 'Budget & Scope')}</span>
              <span className="font-mono font-bold text-emerald-400">{c?.ready?.budgetVal || 'Confirmed ($50k to $100k)'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 font-medium">{c?.ready?.fitLabel || (isAr ? 'التوافق المشترك' : 'Mutual Fit')}</span>
              <span className="text-neutral-300 font-medium">{c?.ready?.fitVal || (isAr ? 'توافق كامل على الجدول والمنهج' : 'Aligned on timeline & methodology')}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 5: L&D Knowledge Hub
    {
      id: 'hub',
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
      mockup: (
        <div className="bg-white/[0.02] rounded-2xl border border-white/[0.08] w-full p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.06] text-xs font-semibold text-white font-sans">
            <span>{c?.hub?.mockupHeader || (isAr ? 'أحدث أدلة ومقالات المنصة' : 'Latest L&D Resources')}</span>
            <BookOpen size={14} className="text-blue-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white font-medium truncate">
                {c?.hub?.item1Title || (isAr ? 'تقرير فجوات مهارات سوق العمل الخليجي' : 'GCC Workforce Skill Gaps Report')}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold shrink-0 border border-blue-500/30">
                {c?.hub?.item1Badge || (isAr ? 'دليل جديد' : 'New Guide')}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white font-medium truncate">
                {c?.hub?.item2Title || (isAr ? 'دليل تشخيص العائد على التدريب المؤسسي' : 'Diagnostic Guide to Corporate Training ROI')}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold shrink-0 border border-emerald-500/30">
                {c?.hub?.item2Badge || (isAr ? 'مورد مجاني' : 'Free Resource')}
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const [activeId, setActiveId] = useState<string>('diagnose');
  const activeCard = items.find((it) => it.id === activeId) || items[0];

  return (
    <section
      data-nav-dark="true"
      className="relative bg-[#000000] text-white py-16 sm:py-24 lg:py-32 border-t border-[#1F1F1F]"
    >
      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <span>{dict.why_different?.eyebrow || (isAr ? 'تحليلات سوقية قابلة للتنفيذ' : 'ACTIONABLE MARKET INTELLIGENCE')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-[-0.03em] leading-tight font-heading">
            {dict.why_different?.title || (isAr ? 'حلول حقيقية على مدونتنا. تعاقدات موثقة على منصتنا.' : 'Real Solutions on Our Blog. Verified Connections on Our Platform.')}
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-neutral-400 font-sans leading-relaxed">
            {dict.why_different?.subtitle ||
              (isAr
                ? 'نحلل التحديات المؤسسية الحقيقية لنقدم أدلة مجانية قابلة للتطبيق، ونربط قادة التدريب مباشرة بمزودي البرامج المعتمدين والمؤهلين لتنفيذ الحل.'
                : 'We analyze real GCC workplace challenges to deliver free, actionable problem solving guides on our blog, and directly connect corporate leaders with the verified training providers ready to implement the solution.')}
          </p>
        </div>

        {/* Side-by-Side Interactive Split: Cards on One Side, Detailed Content Card on Other Side (as drawn in sketch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Selectable Cards List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {items.map((it) => {
              const Icon = it.icon;
              const isActive = activeId === it.id;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setActiveId(it.id)}
                  className={`w-full text-start group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#141720] border-blue-500/50 shadow-lg shadow-blue-500/10'
                      : 'bg-[#0A0B0E] border-white/[0.08] hover:border-white/20 hover:bg-[#0F1117]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-white/[0.05] text-neutral-300 border-white/10 group-hover:text-white'
                        }`}
                      >
                        <Icon size={16} />
                      </span>
                      <span className="text-[11px] font-mono font-medium text-neutral-400 uppercase tracking-wider">
                        {it.badge}
                      </span>
                    </div>
                    <ArrowRight
                      size={14}
                      className={`transition-all ${
                        isActive
                          ? 'text-blue-400 translate-x-0 rtl:-scale-x-100'
                          : 'text-neutral-600 group-hover:text-neutral-400 -translate-x-1 group-hover:translate-x-0 rtl:scale-x-[-1]'
                      }`}
                    />
                  </div>

                  <h3
                    className={`text-sm sm:text-base font-semibold leading-snug font-heading transition-colors ${
                      isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                    }`}
                  >
                    {it.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right Column: Large Detail Card (Exact Match to User Sketch in media_1789674944443.png) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0B0C0E] border border-white/10 p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <m.div
                key={activeCard.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="space-y-5"
              >
                {/* Top Badge & Angle */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-white border border-white/15">
                    {activeCard.badge}
                  </span>
                  {activeCard.angle && (
                    <span className="text-xs font-mono text-neutral-400">
                      {activeCard.angle}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug font-heading">
                  {activeCard.title}
                </h3>

                {/* Text Description */}
                <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
                  {activeCard.text}
                </p>

                {/* Strategic Advantages Checklist */}
                <div className="rounded-2xl p-4 sm:p-5 bg-white/[0.03] border border-white/[0.08] space-y-2.5">
                  <div className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider">
                    {isAr ? 'أهم المميزات والقيمة المقدمة' : 'Key Strategic Advantages'}
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-neutral-200">
                    {activeCard.takeaways.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2.5">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mockup Widget */}
                <div>
                  {activeCard.mockup}
                </div>

                {/* Action CTA Button */}
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
                  <span className="text-xs text-neutral-400 font-mono">
                    {isAr ? 'خطوة تنفيذية واضحة' : 'Direct execution pathway'}
                  </span>
                  {activeCard.isExternal ? (
                    <a
                      href={activeCard.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-md shadow-blue-600/30 active:scale-[0.98] transition-all"
                    >
                      <span>{activeCard.cta}</span>
                      <ExternalLink size={15} className="ms-2" />
                    </a>
                  ) : (
                    <Link
                      href={activeCard.href}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm shadow-md shadow-blue-600/30 active:scale-[0.98] transition-all"
                    >
                      <span>{activeCard.cta}</span>
                      <ArrowRight size={15} className="ms-2 rtl:-scale-x-100" />
                    </Link>
                  )}
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
