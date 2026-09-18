import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/i18n';
import { Locale, i18n } from '@/i18n/config';
import LeadTiers from '@/components/providers/LeadTiers';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import { ShieldCheck, Target, CircleDollarSign, TrendingUp, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import { constructAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'فرص وعملاء تدريب معتمدين للشركات | PontLook'
    : 'Corporate Training Leads & Matchmaking | PontLook';
  const description = isAr
    ? 'احصل على فرص تعاقد وتدريب معتمدة مع كبرى الشركات في السعودية والإمارات. بدون اشتراكات شهرية أو رسوم احتجاز، ادفع فقط مقابل كل عميل مهتم ومؤهل.'
    : 'Acquire vetted enterprise corporate training leads in Saudi Arabia and the UAE. Zero retainers or monthly fees, pay strictly per qualified decision maker.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'for-providers'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/for-providers`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

const providerBenefitsEn = [
  {
    icon: CircleDollarSign,
    title: 'Zero Retainer Risk',
    text: 'No monthly management fees or fixed retainers. You pay strictly per verified decision maker delivered ($50 to $200 per lead).',
  },
  {
    icon: Target,
    title: 'Qualified Enterprise Buyers',
    text: 'Every lead has confirmed corporate training needs, authority, and explicit problem definitions tied to Saudization, Emiratization, or digital upskilling.',
  },
  {
    icon: TrendingUp,
    title: 'Consistent Pipeline',
    text: 'Keep your business development active and predictable throughout the year, even during delivery seasons.',
  },
];

const providerBenefitsAr = [
  {
    icon: CircleDollarSign,
    title: 'انعدام مخاطر الرسوم الشهرية',
    text: 'لا توجد رسوم إدارة أو اشتراكات شهرية ثابتة. الدفع يتم حصراً لكل صانع قرار مؤكد ومؤهل يتم تقديمه لك.',
  },
  {
    icon: Target,
    title: 'عملاء مؤسسيون تم تأهيل احتياجاتهم',
    text: 'كل فرصة تدريبية تتضمن احتياجاً مؤسسياً مؤكداً، وصلاحية قرار واضحة، ومتطلبات متوافقة مع أهداف التوطين أو التحول الرقمي.',
  },
  {
    icon: TrendingUp,
    title: 'تدفق مستمر لفرص الأعمال',
    text: 'حافظ على استمرارية ونمو أعمالك على مدار العام، حتى خلال مواسم التدريب والتنفيذ الميداني.',
  },
];

export default async function ForProvidersPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';
  let dict: any = {};

  try {
    dict = await getDictionary(lang);
  } catch (err) {
    console.error('Error loading dictionary:', err);
  }

  const providerBenefits = isAr ? providerBenefitsAr : providerBenefitsEn;

  return (
    <>
      {/* 1. HERO SECTION (Left-Aligned, Orange Brand Accent, Dashboard Mockup) */}
      <section className="relative overflow-hidden bg-[#08090A] pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
        {/* Ambient Depth Glows */}
        <div className="pointer-events-none absolute top-1/4 start-0 w-[600px] h-[500px] bg-orange-500/[0.03] blur-[160px] -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-1/3 end-0 w-[500px] h-[500px] bg-blue-500/[0.02] blur-[160px] -z-10 rounded-full" />

        <div className="container-site max-w-6xl mx-auto">
          {/* Top Left-Aligned Header Block */}
          <div className="max-w-3xl text-start">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16171B] border border-[#26282D] text-neutral-300 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse" />
                <span>{isAr ? 'لمزودي ومراكز التدريب المعتمدين' : 'For Approved Training Providers'}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] sm:leading-[1.05] font-heading tracking-tight text-start">
                {isAr ? (
                  <>
                    فرص تدريبية للشركات <br />
                    <span className="text-[#FF5C00] font-bold">حسب الطلب.</span>
                  </>
                ) : (
                  <>
                    Enterprise Training Leads <br />
                    <span className="text-[#FF5C00] font-bold">On Demand.</span>
                  </>
                )}
              </h1>

              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal font-sans text-start">
                {isAr
                  ? 'تواصل مباشرة مع صناع القرار في كبرى المنشآت والشركات التي تبحث بنشاط عن حلول تدريبية. بدون رسوم شهرية ثابتة، الدفع فقط لكل فرصة مؤكدة ومؤهلة.'
                  : 'Connect directly with verified corporate decision makers actively seeking training solutions. Zero retainers, 100% pay per lead.'}
              </p>

              {/* Minimized Action Buttons (Orange Primary + Glass Secondary) */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <Link
                  href={`/${lang}/for-providers/apply`}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-sm shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-200 font-sans"
                >
                  <span>{isAr ? 'قدم للانضمام إلى شبكتنا' : 'Apply to Join Network'}</span>
                  <ArrowRight size={15} className="rtl:-scale-x-100" />
                </Link>

                <a
                  href="#tiers"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-200 hover:text-white font-medium text-sm border border-[#26282D] hover:border-white/20 active:scale-95 transition-all duration-200 font-sans"
                >
                  <span>{isAr ? 'استعرض فئات الفرص' : 'Explore Opportunity Tiers'}</span>
                </a>
              </div>

              {/* Trust Value Badges */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs text-neutral-400">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16171B] border border-[#26282D]">
                  <CheckCircle2 size={13} className="text-[#FF5C00] shrink-0" />
                  <span className="font-medium text-neutral-300">
                    {isAr ? 'بدون أي رسوم إدارة شهرية' : 'Zero Monthly Retainers'}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16171B] border border-[#26282D]">
                  <CheckCircle2 size={13} className="text-[#FF5C00] shrink-0" />
                  <span className="font-medium text-neutral-300">
                    {isAr ? 'ميزانيات تدريب مؤكدة ومعتمدة' : 'Verified Budgets'}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16171B] border border-[#26282D]">
                  <CheckCircle2 size={13} className="text-[#FF5C00] shrink-0" />
                  <span className="font-medium text-neutral-300">
                    {isAr ? 'ضمان استبدال بنسبة 100%' : '100% Replacement Guarantee'}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sized Dashboard Mockup Preview (Like ecomflow reference) */}
          <div className="mt-12 sm:mt-16 relative">
            <div className="rounded-2xl sm:rounded-3xl bg-[#0F1013] border border-[#26282D] p-5 sm:p-7 shadow-2xl shadow-black overflow-hidden relative">
              {/* Window Ambient Sheen */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Portal Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#26282D]">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#FF5C00]/15 border border-[#FF5C00]/30 flex items-center justify-center p-1.5">
                    <Image
                      src="/PontLook-Logo-Orange.png"
                      alt="PontLook"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white font-heading flex items-center gap-2">
                      <span>PontLook Provider Portal</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FF5C00]/20 text-[#FF5C00] border border-[#FF5C00]/30">
                        {isAr ? 'مباشر ومحدث' : 'Live Feed'}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 font-sans">
                      {isAr ? 'منصة توجيه وتوزيع طلبات التدريب المؤكدة' : 'Verified Enterprise Training Routing Desk'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-neutral-300">
                    {isAr ? 'النظام متصل وجاهز للربط' : '100% Match Engine Active'}
                  </span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-5 sm:my-6">
                <div className="rounded-xl bg-[#16171B] border border-[#26282D] p-3.5 sm:p-4">
                  <div className="text-[11px] font-medium text-neutral-400 uppercase font-sans">
                    {isAr ? 'قيمة الفرص المتاحة' : 'Pipeline Value'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-heading mt-1 tabular-nums">
                    {isAr ? '680,000 ر.س' : '$180,000'}
                  </div>
                  <div className="text-[10px] font-medium text-[#FF5C00] mt-0.5 font-sans">
                    {isAr ? 'ميزانيات معتمدة ومؤكدة' : 'Confirmed Corporate Budgets'}
                  </div>
                </div>

                <div className="rounded-xl bg-[#16171B] border border-[#26282D] p-3.5 sm:p-4">
                  <div className="text-[11px] font-medium text-neutral-400 uppercase font-sans">
                    {isAr ? 'الفرص المؤهلة النشطة' : 'Active Mandates'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-heading mt-1 tabular-nums">
                    18
                  </div>
                  <div className="text-[10px] font-medium text-emerald-400 mt-0.5 font-sans">
                    {isAr ? '+4 فرص اليوم' : '+4 New Today'}
                  </div>
                </div>

                <div className="rounded-xl bg-[#16171B] border border-[#26282D] p-3.5 sm:p-4">
                  <div className="text-[11px] font-medium text-neutral-400 uppercase font-sans">
                    {isAr ? 'دقة التوافق التدريبي' : 'Match Accuracy'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-heading mt-1 tabular-nums">
                    98.6%
                  </div>
                  <div className="text-[10px] font-medium text-blue-400 mt-0.5 font-sans">
                    {isAr ? 'بناءً على التخصص وسابقة الأعمال' : 'GCC Verified Track Record'}
                  </div>
                </div>

                <div className="rounded-xl bg-[#16171B] border border-[#26282D] p-3.5 sm:p-4">
                  <div className="text-[11px] font-medium text-neutral-400 uppercase font-sans">
                    {isAr ? 'سرعة الربط المباشر' : 'Direct Intro Time'}
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-heading mt-1 tabular-nums">
                    {isAr ? '24 ساعة' : '24 Hours'}
                  </div>
                  <div className="text-[10px] font-medium text-purple-400 mt-0.5 font-sans">
                    {isAr ? 'تواصل مباشر مع صناع القرار' : 'Direct Decision Maker Intro'}
                  </div>
                </div>
              </div>

              {/* Live Incoming Demand Feed Preview */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-sans px-1">
                  {isAr ? 'أحدث فرص التدريب المعتمدة للربط' : 'Recent Verified Mandates Ready for Matching'}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#16171B] border border-[#26282D] p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FF5C00]/15 text-[#FF5C00] border border-[#FF5C00]/30 font-sans">
                        {isAr ? 'القيادة التنفيذية · الرياض' : 'Executive Leadership · Riyadh'}
                      </span>
                      <span className="text-xs font-bold text-white tabular-nums font-sans">
                        {isAr ? '160,000 ر.س' : 'SAR 160,000'}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white font-heading">
                      {isAr ? 'برنامج تطوير القيادات العليا والتعاقب الوظيفي' : 'Senior Executive Succession Track'}
                    </div>
                    <div className="text-xs text-neutral-400 font-sans flex items-center justify-between">
                      <span>{isAr ? 'بنك تجاري رائد · 2,400+ موظف' : 'Tier 1 Commercial Bank · 2,400+ Staff'}</span>
                      <span className="text-emerald-400 font-medium">{isAr ? 'توافق 99%' : '99% Fit'}</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#16171B] border border-[#26282D] p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30 font-sans">
                        {isAr ? 'التحول الرقمي والأمن السيبراني · دبي' : 'Cloud & Cyber Architecture · Dubai'}
                      </span>
                      <span className="text-xs font-bold text-white tabular-nums font-sans">
                        $65,000
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white font-heading">
                      {isAr ? 'معسكرات تدريب مكثفة للمهندسين' : 'Enterprise Engineering Intensive Bootcamp'}
                    </div>
                    <div className="text-xs text-neutral-400 font-sans flex items-center justify-between">
                      <span>{isAr ? 'مجموعة اتصالات إقليمية · 4,500+ موظف' : 'Regional Telecom Group · 4,500+ Staff'}</span>
                      <span className="text-emerald-400 font-medium">{isAr ? 'توافق 97%' : '97% Fit'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY PARTNER SECTION (Redesigned matching Pasted image 20260918161220.png) */}
      <section id="why-partner" className="bg-[#08090A] py-16 sm:py-24 border-t border-[#26282D] scroll-mt-16">
        <div className="container-site max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal>
            {/* Left-Aligned Header */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white font-heading text-start mb-6 sm:mb-8">
              {isAr ? 'كيف تعمل الشراكة:' : 'How it works:'}
            </h2>

            {/* 3 Clean Numbered Cards (Icons removed, inline number badges 1, 2, 3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {providerBenefits.map((b, i) => (
                <div
                  key={b.title}
                  className="rounded-2xl bg-[#0F1013] border border-[#26282D] p-6 sm:p-7 text-start flex flex-col justify-start hover:border-white/20 transition-all duration-300 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-7 h-7 rounded-full bg-white/[0.08] border border-white/10 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                      {i + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white font-heading">
                      {b.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 font-sans font-normal">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 3. OPPORTUNITY TIERS SECTION */}
          <div id="tiers" className="scroll-mt-24 pt-16 sm:pt-24">
            <LeadTiers mode="providers" dict={dict} lang={lang} />
          </div>

          {/* 4. BOTTOM CTA SECTION (No window background, single orange button, second button removed) */}
          <div id="apply" className="scroll-mt-24 pt-16 sm:pt-24 pb-8 sm:pb-12 text-center max-w-3xl mx-auto px-4">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white font-heading leading-tight mb-4">
                {isAr ? 'جاهز لتوسيع قاعدة عملائك المؤسسيين؟' : 'Ready to Scale Your Enterprise Pipeline?'}
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
                {isAr
                  ? 'أكمل نموذج التأهيل وسيقوم فريق الشراكات بمراجعة بياناتك والتواصل معك خلال يومي عمل لبدء استقبال الفرص المؤكدة.'
                  : 'Complete our streamlined qualification form. Our partnerships team will review your profile and reach out within 2 business days to begin delivering verified demand.'}
              </p>

              <div className="flex justify-center">
                <Link
                  href={`/${lang}/for-providers/apply`}
                  className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-[#FF5C00] hover:bg-[#FF6A1A] text-white font-semibold text-sm sm:text-base shadow-lg shadow-orange-500/25 active:scale-95 transition-all duration-200 font-sans"
                >
                  <span>{isAr ? 'ابدأ طلب التأهيل للشراكة' : 'Apply for Provider Partnership'}</span>
                  <ArrowRight size={17} className="rtl:-scale-x-100" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
