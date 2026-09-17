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

interface ModalTheme {
  bgClass: string;
  borderClass: string;
  glowColor: string;
  modalShadow: string;
  accentText: string;
  badgeBg: string;
  badgeText: string;
  takeawayBg: string;
  takeawayBorder: string;
  takeawayCheck: string;
  ctaButton: string;
  closeBg: string;
  cardHoverBorder: string;
  cardHoverShadow: string;
  cardIconBgHover: string;
}

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
  theme: ModalTheme;
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
    // Card 1: Diagnose Your Skill Gaps (Electric Blue Theme)
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
      theme: {
        bgClass: 'bg-[#060E1C]/95',
        borderClass: 'border-[#0052FF]/40',
        glowColor: 'rgba(0, 82, 255, 0.3)',
        modalShadow: 'shadow-[0_25px_80px_rgba(0,82,255,0.25)]',
        accentText: 'text-[#4D7CFF]',
        badgeBg: 'bg-[#0052FF]',
        badgeText: 'text-white',
        takeawayBg: 'bg-[#0A162D]/90',
        takeawayBorder: 'border-[#0052FF]/25',
        takeawayCheck: 'text-[#38BDF8]',
        ctaButton: 'bg-gradient-to-r from-[#0052FF] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white shadow-lg shadow-blue-500/30',
        closeBg: 'bg-[#0F2040] hover:bg-[#1E3A8A] text-blue-200',
        cardHoverBorder: 'hover:border-[#0052FF]/60',
        cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(0,82,255,0.22)]',
        cardIconBgHover: 'group-hover:bg-[#0052FF]',
      },
      mockup: (
        <div className="bg-[#0B152A] rounded-2xl border border-[#1E3A8A]/40 w-full p-3.5 sm:p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
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
            <span className="px-2.5 py-1 rounded-lg bg-[#0052FF]/20 text-[#60A5FA] text-[11px] font-mono font-semibold border border-[#0052FF]/40">
              {c?.diagnose?.tag1 || (isAr ? '# فجوات القيادة والتقنية' : '# Leadership & Tech Gaps')}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-semibold border border-emerald-500/30">
              {c?.diagnose?.tag2 || (isAr ? 'خارطة طريق معتمدة' : 'Priority Roadmap')}
            </span>
          </div>
        </div>
      ),
    },

    // Card 2: Matched Directly with the Right Training Partner (Emerald Theme)
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
      theme: {
        bgClass: 'bg-[#04150F]/95',
        borderClass: 'border-emerald-500/40',
        glowColor: 'rgba(16, 185, 129, 0.28)',
        modalShadow: 'shadow-[0_25px_80px_rgba(16,185,129,0.22)]',
        accentText: 'text-emerald-400',
        badgeBg: 'bg-emerald-600',
        badgeText: 'text-white',
        takeawayBg: 'bg-[#082218]/90',
        takeawayBorder: 'border-emerald-500/25',
        takeawayCheck: 'text-emerald-400',
        ctaButton: 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/30',
        closeBg: 'bg-[#0D2F22] hover:bg-[#134E39] text-emerald-200',
        cardHoverBorder: 'hover:border-emerald-500/60',
        cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.22)]',
        cardIconBgHover: 'group-hover:bg-emerald-600',
      },
      mockup: (
        <div className="bg-[#071F15] rounded-2xl border border-emerald-500/25 w-full p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="text-xs font-semibold text-white pb-2 border-b border-emerald-900/40 font-sans flex items-center justify-between">
            <span>{c?.match?.mockupHeader || (isAr ? 'قائمة معايير توافق الشريك' : 'Partner Fit Checklist')}</span>
            <ShieldCheck size={16} className="text-emerald-400" />
          </div>
          <div className="space-y-1.5 text-[11px] text-emerald-100/90">
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

    // Card 3: Direct Access to Verified Decision Makers (Purple Theme)
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
      theme: {
        bgClass: 'bg-[#11071D]/95',
        borderClass: 'border-purple-500/40',
        glowColor: 'rgba(168, 85, 247, 0.28)',
        modalShadow: 'shadow-[0_25px_80px_rgba(168,85,247,0.22)]',
        accentText: 'text-purple-300',
        badgeBg: 'bg-purple-600',
        badgeText: 'text-white',
        takeawayBg: 'bg-[#1D0C30]/90',
        takeawayBorder: 'border-purple-500/25',
        takeawayCheck: 'text-purple-300',
        ctaButton: 'bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-500/30',
        closeBg: 'bg-[#27123F] hover:bg-[#3B1D5D] text-purple-200',
        cardHoverBorder: 'hover:border-purple-500/60',
        cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.22)]',
        cardIconBgHover: 'group-hover:bg-purple-600',
      },
      mockup: (
        <div className="bg-[#180A28] rounded-2xl border border-purple-500/25 w-full p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-200 text-[10px] font-semibold uppercase border border-purple-800/40">
              {c?.access?.clientTag || (isAr ? 'جهة مؤسسية · حوكمة ومخاطر' : 'Enterprise Client · GRC')}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/30">
              {c?.access?.statusBadge || (isAr ? 'صلاحية الميزانية: مؤكدة' : 'Budget Authority: Confirmed')}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <div className="h-9 w-9 rounded-xl bg-purple-600/25 text-purple-300 flex items-center justify-center shrink-0 border border-purple-500/30">
              <Building2 size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white font-sans truncate">
                {c?.access?.role || (isAr ? 'رئيس قطاع الموارد البشرية (CHRO)' : 'Chief Human Resources Officer (CHRO)')}
              </div>
              <div className="text-[10px] text-purple-300/80">{isAr ? 'تعاقد مباشر ومؤكد' : 'Verified Direct Engagement'}</div>
            </div>
          </div>
        </div>
      ),
    },

    // Card 4: Clients Ready to Partner (Amber / Warm Bronze Theme)
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
      theme: {
        bgClass: 'bg-[#180A04]/95',
        borderClass: 'border-[#FF5C00]/40',
        glowColor: 'rgba(255, 92, 0, 0.28)',
        modalShadow: 'shadow-[0_25px_80px_rgba(255,92,0,0.22)]',
        accentText: 'text-[#FB923C]',
        badgeBg: 'bg-[#FF5C00]',
        badgeText: 'text-white',
        takeawayBg: 'bg-[#261106]/90',
        takeawayBorder: 'border-[#FF5C00]/25',
        takeawayCheck: 'text-amber-400',
        ctaButton: 'bg-gradient-to-r from-[#FF5C00] to-[#EA580C] hover:from-[#EA580C] hover:to-[#C2410C] text-white shadow-lg shadow-[#FF5C00]/30',
        closeBg: 'bg-[#361508] hover:bg-[#4D1D0D] text-orange-200',
        cardHoverBorder: 'hover:border-[#FF5C00]/60',
        cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(255,92,0,0.22)]',
        cardIconBgHover: 'group-hover:bg-[#FF5C00]',
      },
      mockup: (
        <div className="bg-[#220E05] rounded-2xl border border-[#FF5C00]/25 w-full p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-orange-950 text-xs font-semibold text-white font-sans">
            <span>{c?.ready?.mockupHeader || (isAr ? 'جاهزية الشراكة | مؤكدة' : 'Partnership Readiness | Verified')}</span>
            <CheckCircle2 size={14} className="text-emerald-400" />
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-orange-200/70 font-medium">{c?.ready?.needLabel || (isAr ? 'الاحتياج التدريبي' : 'Client Need')}</span>
              <span className="font-semibold text-white">{c?.ready?.needVal || (isAr ? 'برنامج القيادة التنفيذية' : 'Executive Leadership Program')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-orange-200/70 font-medium">{c?.ready?.budgetLabel || (isAr ? 'الميزانية المعتمدة' : 'Budget & Scope')}</span>
              <span className="font-mono font-bold text-emerald-400">{c?.ready?.budgetVal || 'Confirmed ($50k to $100k)'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-orange-200/70 font-medium">{c?.ready?.fitLabel || (isAr ? 'التوافق المشترك' : 'Mutual Fit')}</span>
              <span className="text-orange-100 font-medium">{c?.ready?.fitVal || (isAr ? 'توافق كامل على الجدول والمنهج' : 'Aligned on timeline & methodology')}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 5: L&D Knowledge Hub (Sky Blue Theme)
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
      theme: {
        bgClass: 'bg-[#05111D]/95',
        borderClass: 'border-sky-500/40',
        glowColor: 'rgba(14, 165, 233, 0.28)',
        modalShadow: 'shadow-[0_25px_80px_rgba(14,165,233,0.22)]',
        accentText: 'text-sky-400',
        badgeBg: 'bg-sky-600',
        badgeText: 'text-white',
        takeawayBg: 'bg-[#0B1E30]/90',
        takeawayBorder: 'border-sky-500/25',
        takeawayCheck: 'text-sky-400',
        ctaButton: 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-lg shadow-sky-500/30',
        closeBg: 'bg-[#0E283E] hover:bg-[#153C5A] text-sky-200',
        cardHoverBorder: 'hover:border-sky-500/60',
        cardHoverShadow: 'hover:shadow-[0_0_30px_rgba(14,165,233,0.22)]',
        cardIconBgHover: 'group-hover:bg-sky-600',
      },
      mockup: (
        <div className="bg-[#0B1A28] rounded-2xl border border-sky-500/25 w-full p-3.5 sm:p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-sky-950 text-xs font-semibold text-white font-sans">
            <span>{c?.hub?.mockupHeader || (isAr ? 'أحدث أدلة ومقالات المنصة' : 'Latest L&D Resources')}</span>
            <BookOpen size={14} className="text-sky-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white font-medium truncate">
                {c?.hub?.item1Title || (isAr ? 'تقرير فجوات مهارات سوق العمل الخليجي' : 'GCC Workforce Skill Gaps Report')}
              </span>
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold shrink-0 border border-sky-500/30">
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

        {/* Cards Grid: 5 Side-by-Side Cards (Attio Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.id}
                onClick={() => setActiveModalCard(it)}
                className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 ${it.theme.cardHoverBorder} bg-[#0A0A0A] hover:bg-[#0F121A] p-4 sm:p-5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${it.theme.cardHoverShadow} cursor-pointer min-h-[170px] sm:min-h-[190px] overflow-hidden`}
              >
                {/* Subtle hover radial tint */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${it.theme.glowColor}, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] ${it.theme.accentText} ${it.theme.cardIconBgHover} group-hover:text-white border border-white/10 transition-all duration-300`}
                    >
                      <Icon size={18} />
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-white/[0.04] text-neutral-400 border border-white/[0.08] group-hover:border-white/20 transition-colors">
                      {it.badge}
                    </span>
                  </div>

                  {/* Title only */}
                  <h3 className="text-sm sm:text-base font-semibold text-white leading-snug font-heading group-hover:text-neutral-100 transition-colors">
                    {it.title}
                  </h3>
                </div>

                {/* Minimal preview trigger */}
                <div className="relative z-10 pt-3 mt-auto border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  <span>{isAr ? 'عرض التفاصيل' : 'Tap to expand'}</span>
                  <ArrowRight
                    size={13}
                    className={`transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100 ${it.theme.accentText}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Apple 3D Touch Detail Modal with Matched Accent Palette and Staggered Reveal */}
      <AnimatePresence>
        {activeModalCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6">
            {/* Blurry Backdrop with Apple 3D Touch Dimming */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveModalCard(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Apple 3D Touch Modal Dialog Card (Resized, Matched Theme Background) */}
            <m.div
              initial={{ opacity: 0, scale: 0.88, y: 18, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.90, y: 12, filter: 'blur(6px)' }}
              transition={{ type: 'spring', damping: 28, stiffness: 360 }}
              className={`relative z-10 w-full max-w-[560px] max-h-[90vh] overflow-y-auto ${activeModalCard.theme.bgClass} backdrop-blur-2xl border ${activeModalCard.theme.borderClass} rounded-3xl p-5 sm:p-6 ${activeModalCard.theme.modalShadow} overflow-hidden text-white`}
            >
              {/* Matched Ambient Glow at top of modal */}
              <div
                className="absolute -top-16 start-1/2 -translate-x-1/2 w-64 h-32 blur-3xl pointer-events-none rounded-full opacity-60"
                style={{ backgroundColor: activeModalCard.theme.glowColor }}
              />

              {/* Close Button */}
              <button
                onClick={() => setActiveModalCard(null)}
                className={`absolute top-4 end-4 h-8 w-8 rounded-full ${activeModalCard.theme.closeBg} flex items-center justify-center transition-colors z-20`}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              {/* Animated Contents after pop-up expands (Staggered Entrance) */}
              <m.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.12,
                      staggerChildren: 0.06,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                className="relative z-10 space-y-3.5"
              >
                {/* Top Info Badge & Angle */}
                <m.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="flex items-center gap-2.5 flex-wrap pe-8"
                >
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${activeModalCard.theme.badgeBg} ${activeModalCard.theme.badgeText}`}>
                    {activeModalCard.badge}
                  </span>
                  {activeModalCard.angle && (
                    <span className={`text-xs font-mono font-medium ${activeModalCard.theme.accentText}`}>
                      {activeModalCard.angle}
                    </span>
                  )}
                </m.div>

                {/* Title */}
                <m.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug font-heading">
                    {activeModalCard.title}
                  </h3>
                </m.div>

                {/* Text Description */}
                <m.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                    {activeModalCard.text}
                  </p>
                </m.div>

                {/* Takeaways List */}
                <m.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className={`rounded-2xl p-3.5 sm:p-4 border ${activeModalCard.theme.takeawayBg} ${activeModalCard.theme.takeawayBorder} space-y-2`}
                >
                  <div className={`text-[11px] font-mono font-semibold ${activeModalCard.theme.accentText} uppercase tracking-wider`}>
                    {isAr ? 'أهم المميزات والقيمة المقدمة' : 'Key Strategic Advantages'}
                  </div>
                  {activeModalCard.takeaways.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs text-neutral-200">
                      <CheckCircle2 size={14} className={`${activeModalCard.theme.takeawayCheck} shrink-0`} />
                      <span>{point}</span>
                    </div>
                  ))}
                </m.div>

                {/* Embedded Interactive Mockup */}
                <m.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {activeModalCard.mockup}
                </m.div>

                {/* Action Link Button */}
                <m.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-white/10"
                >
                  <button
                    onClick={() => setActiveModalCard(null)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {isAr ? 'إغلاق' : 'Close'}
                  </button>

                  {activeModalCard.isExternal ? (
                    <a
                      href={activeModalCard.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl ${activeModalCard.theme.ctaButton} font-medium text-xs transition-all group/btn`}
                    >
                      <span>{activeModalCard.cta}</span>
                      <ExternalLink size={14} className="ms-2" />
                    </a>
                  ) : (
                    <Link
                      href={activeModalCard.href}
                      className={`w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl ${activeModalCard.theme.ctaButton} font-medium text-xs transition-all group/btn`}
                    >
                      <span>{activeModalCard.cta}</span>
                      <ArrowRight size={14} className="ms-2 rtl:-scale-x-100" />
                    </Link>
                  )}
                </m.div>
              </m.div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
