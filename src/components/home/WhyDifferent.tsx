'use client';

import { useState } from 'react';
import {
  Target,
  ShieldCheck,
  Building2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  X,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { m, AnimatePresence } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';

interface CardItem {
  id: string;
  icon: any;
  span: string;
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

  const [activeModalCard, setActiveModalCard] = useState<CardItem | null>(null);

  const items: CardItem[] = [
    // Card 1: Diagnose Your Skill Gaps
    {
      id: 'diagnose',
      icon: Target,
      span: 'md:col-span-12 lg:col-span-7',
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
        <div className="bg-[#111625] rounded-2xl border border-[#1E293B] w-full p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#0052FF]/20 text-[#4D7CFF] flex items-center justify-center font-bold">
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
            <span className="h-2 w-2 rounded-full bg-[#0052FF] animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-[#0052FF]/15 text-[#4D7CFF] text-[11px] font-mono font-semibold border border-[#0052FF]/30">
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
      span: 'md:col-span-12 lg:col-span-5',
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
        <div className="bg-[#111625] rounded-2xl border border-[#1E293B] w-full p-4 flex flex-col gap-2.5">
          <div className="text-xs font-semibold text-white pb-2 border-b border-neutral-800 font-sans flex items-center justify-between">
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
      span: 'md:col-span-6 lg:col-span-4',
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
        <div className="bg-[#111625] rounded-2xl border border-[#1E293B] w-full p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-[#171717] text-neutral-300 text-[10px] font-semibold uppercase">
              {c?.access?.clientTag || (isAr ? 'جهة مؤسسية · حوكمة ومخاطر' : 'Enterprise Client · GRC')}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30">
              {c?.access?.statusBadge || (isAr ? 'صلاحية الميزانية: مؤكدة' : 'Budget Authority: Confirmed')}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <div className="h-9 w-9 rounded-xl bg-[#0052FF]/20 text-[#4D7CFF] flex items-center justify-center shrink-0">
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
      span: 'md:col-span-6 lg:col-span-4',
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
        <div className="bg-[#111625] rounded-2xl border border-[#1E293B] w-full p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800 text-xs font-semibold text-white font-sans">
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
      span: 'md:col-span-12 lg:col-span-4',
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
        <div className="bg-[#111625] rounded-2xl border border-[#1E293B] w-full p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800 text-xs font-semibold text-white font-sans">
            <span>{c?.hub?.mockupHeader || (isAr ? 'أحدث أدلة ومقالات المنصة' : 'Latest L&D Resources')}</span>
            <BookOpen size={14} className="text-[#4D7CFF]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white font-medium truncate">
                {c?.hub?.item1Title || (isAr ? 'تقرير فجوات مهارات سوق العمل الخليجي' : 'GCC Workforce Skill Gaps Report')}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#0052FF]/20 text-[#4D7CFF] text-[10px] font-mono font-bold shrink-0 border border-[#0052FF]/30">
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

  return (
    <section
      data-nav-dark="true"
      className="relative bg-[#000000] text-white py-16 sm:py-24 lg:py-32 border-t border-[#1F1F1F] overflow-hidden"
    >
      {/* Background Subtle Cross (+) Grid Pattern (Matching Screenshot) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M24 20V28M20 24H28' stroke='%234D7CFF' stroke-width='1.2' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Ambient ambient glow in center */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-[#0052FF]/[0.08] via-purple-600/[0.05] to-[#FF5C00]/[0.05] blur-[160px] pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0052FF]/15 border border-[#0052FF]/30 text-[#4D7CFF] text-xs font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0052FF]" />
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.id}
                className={`${it.span} flex flex-col`}
              >
                <div
                  onClick={() => setActiveModalCard(it)}
                  className="group relative flex flex-col justify-between h-full rounded-3xl border border-[#1F1F1F] bg-[#0A0A0A] hover:bg-[#0D0D0D] p-6 sm:p-8 hover:border-[#0052FF]/60 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_35px_rgba(0,82,255,0.18)] cursor-pointer"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0052FF]/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#141414] text-[#4D7CFF] group-hover:bg-[#0052FF] group-hover:text-white border border-[#262626] group-hover:border-[#0052FF] transition-all duration-300">
                        <Icon size={24} />
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-[#141414] text-neutral-400 border border-[#242424] group-hover:border-[#0052FF]/40 group-hover:text-blue-300 transition-colors">
                        {it.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight mb-2.5 font-heading group-hover:text-white transition-colors">
                      {it.title}
                    </h3>

                    {it.angle && (
                      <p className="text-xs sm:text-sm font-medium text-[#4D7CFF] mb-3">
                        {it.angle}
                      </p>
                    )}

                    <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed mb-6 line-clamp-3">
                      {it.text}
                    </p>
                  </div>

                  <div className="relative z-10 mt-auto pt-2">
                    <div className="w-full rounded-2xl bg-[#080808] border border-[#1A1A1A] p-2.5 sm:p-3 flex items-center justify-center overflow-hidden mb-5">
                      {it.mockup}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#171717]">
                      <span className="inline-flex items-center text-sm font-semibold text-[#4D7CFF] group-hover:text-white transition-colors">
                        <span>{it.cta}</span>
                        <ArrowRight
                          size={16}
                          className="ms-2 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100"
                        />
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">
                        {isAr ? 'انقر للتفاصيل' : 'Click to preview'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal on Hover / Press with Blurred Backdrop */}
      <AnimatePresence>
        {activeModalCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Blurry Backdrop (backdrop-blur-md bg-black/75) */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalCard(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <m.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-2xl bg-[#0A0E1A] border border-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalCard(null)}
                className="absolute top-5 end-5 h-9 w-9 rounded-full bg-[#161F36] hover:bg-[#1E293B] text-neutral-400 hover:text-white flex items-center justify-center transition-colors z-20"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Top info */}
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#0052FF] text-white">
                  {activeModalCard.badge}
                </span>
                {activeModalCard.angle && (
                  <span className="text-xs font-mono text-[#4D7CFF]">
                    {activeModalCard.angle}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug mb-3 font-heading">
                {activeModalCard.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed mb-6">
                {activeModalCard.text}
              </p>

              {/* Takeaways List */}
              <div className="bg-[#0D152A] rounded-2xl p-4 sm:p-5 border border-[#1E293B] mb-6 space-y-2.5">
                <div className="text-xs font-mono font-semibold text-[#4D7CFF] uppercase tracking-wider">
                  {isAr ? 'أهم المميزات والقيمة المقدمة' : 'Key Strategic Advantages'}
                </div>
                {activeModalCard.takeaways.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-200">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Embedded interactive mockup */}
              <div className="mb-6">
                {activeModalCard.mockup}
              </div>

              {/* Action Link Button */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-[#161F36]">
                <button
                  onClick={() => setActiveModalCard(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800/40 transition-colors"
                >
                  {isAr ? 'إغلاق' : 'Close'}
                </button>

                {activeModalCard.isExternal ? (
                  <a
                    href={activeModalCard.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-medium text-sm shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all group/btn"
                  >
                    <span>{activeModalCard.cta}</span>
                    <ExternalLink size={16} className="ms-2" />
                  </a>
                ) : (
                  <Link
                    href={activeModalCard.href}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white font-medium text-sm shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all group/btn"
                  >
                    <span>{activeModalCard.cta}</span>
                    <ArrowRight size={16} className="ms-2 rtl:-scale-x-100" />
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

