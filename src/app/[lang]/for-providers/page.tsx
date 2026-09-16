import type { Metadata } from 'next';
import { getDictionary } from '@/i18n';
import { Locale, i18n } from '@/i18n/config';
import PartnershipForm from '@/components/providers/PartnershipForm';
import LeadTiers from '@/components/providers/LeadTiers';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import { ShieldCheck, Target, DollarSign, Users, Award, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
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
    ? 'احصل على فرص تعاقد وتدريب معتمدة مع كبرى الشركات في السعودية والإمارات. بدون اشتراكات شهرية أو رسوم احتجاز—ادفع فقط مقابل كل عميل مهتم ومؤهل.'
    : 'Acquire pre-vetted enterprise corporate training leads in Saudi Arabia and the UAE. Zero retainers or monthly fees—pay strictly per qualified decision-maker.';

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
    icon: DollarSign,
    title: 'Zero Retainer Risk',
    text: 'No monthly management fees or fixed retainers. You pay strictly per verified decision-maker delivered ($50–$200 per lead).',
  },
  {
    icon: Target,
    title: 'Pre-Qualified Enterprise Buyers',
    text: 'Every lead has confirmed corporate training needs, authority, and explicit problem definitions tied to Saudization, Emiratization, or digital upskilling.',
  },
  {
    icon: Award,
    title: 'Consistent Pipeline',
    text: 'Keep your business development active and predictable throughout the year, even during delivery seasons.',
  },
];

const providerBenefitsAr = [
  {
    icon: DollarSign,
    title: 'انعدام مخاطر الرسوم الشهرية',
    text: 'لا توجد رسوم إدارة أو اشتراكات شهرية ثابتة. الدفع يتم حصراً لكل صانع قرار مؤكد ومؤهل يتم تقديمه لك.',
  },
  {
    icon: Target,
    title: 'عملاء مؤسسيون تم تأهيل احتياجاتهم',
    text: 'كل فرصة تدريبية تتضمن احتياجاً مؤسسياً مؤكداً، وصلاحية قرار واضحة، ومتطلبات متوافقة مع أهداف التوطين أو التحول الرقمي.',
  },
  {
    icon: Award,
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
      <div className="relative overflow-hidden bg-hero-gradient min-h-[100dvh] flex flex-col justify-between items-center pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 sm:px-6">
        {/* Ambient Depth Glows */}
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-gradient-to-r from-blue-500/10 via-primary/5 to-blue-500/10 blur-3xl -z-10 rounded-full" />
        <div className="pointer-events-none absolute top-10 start-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-3xl -z-10 rounded-full" />

        {/* Vertically Centered Content (Optically balanced) */}
        <div className="container-site relative z-10 mx-auto max-w-4xl text-center my-auto -translate-y-3 sm:-translate-y-6 py-2">
          <Reveal className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs">
              <ShieldCheck size={14} className="text-blue-600" />
              <span>{isAr ? 'لمزودي ومراكز التدريب المعتمدين' : 'For Approved Training Providers'}</span>
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-slate-900 leading-[1.12] sm:leading-[1.08] font-heading tracking-tight">
              {isAr ? (
                <>
                  فرص تدريبية للشركات والمؤسسات <br className="hidden sm:inline" />
                  <span className="text-primary font-bold">حسب الطلب</span>
                </>
              ) : (
                <>
                  Enterprise Training Leads <br className="hidden sm:inline" />
                  <span className="text-primary font-bold">On Demand</span>
                </>
              )}
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              {isAr
                ? 'تواصل مباشرة مع صناع القرار في كبرى المنشآت والشركات التي تبحث بنشاط عن حلول تدريبية. بدون رسوم شهرية ثابتة، الدفع فقط لكل فرصة مؤكدة ومؤهلة.'
                : 'Connect directly with verified corporate decision-makers actively seeking training solutions. Zero retainers, 100% pay-per-lead.'}
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <a
                href="#apply"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-8 rounded-full bg-primary hover:bg-primary-600 text-white font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200"
              >
                <span>{isAr ? 'قدم للانضمام إلى شبكتنا' : 'Apply to Join Network'}</span>
                <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
              </a>

              <a
                href="#tiers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 sm:py-4 px-8 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all duration-200"
              >
                <span>{isAr ? 'استعرض فئات الفرص' : 'Explore Opportunity Tiers'}</span>
              </a>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm text-slate-600">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800">
                  {isAr ? 'بدون أي رسوم إدارة شهرية' : 'Zero Monthly Retainers'}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800">
                  {isAr ? 'ميزانيات تدريب مؤكدة ومعتمدة' : 'Pre-Verified Budgets'}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs">
                <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                <span className="font-medium text-slate-800">
                  {isAr ? 'ضمان استبدال بنسبة 100%' : '100% Replacement Guarantee'}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Bouncing Scroll Down Prompt */}
        <div className="relative z-10 pb-3 sm:pb-4 flex flex-col items-center">
          <a
            href="#why-partner"
            className="group flex flex-col items-center text-slate-400 hover:text-primary transition-colors text-xs font-medium"
            aria-label={isAr ? 'انتقل إلى الأسفل' : 'Scroll down'}
          >
            <span className="mb-1 hidden sm:inline tracking-wider uppercase text-[11px] font-mono">
              {isAr ? 'اكتشف المزيد' : 'Discover More'}
            </span>
            <ChevronDown size={18} className="animate-bounce text-slate-400 group-hover:text-primary" />
          </a>
        </div>
      </div>

      <section id="why-partner" className="bg-white py-12 sm:py-20 border-t border-slate-100 scroll-mt-16">
        <div className="container-site max-w-6xl mx-auto px-4 sm:px-6 space-y-14 sm:space-y-24">
          <div>
            <SectionHeading
              eyebrow={isAr ? 'لماذا الشراكة مع بونت لوك' : 'Why Partner with PontLook'}
              title={isAr ? 'تدفق متوقع لفرص الشركات والمؤسسات' : 'Predictable Enterprise Pipeline'}
              subtitle={
                isAr
                  ? 'مصمم خصيصاً لمزودي التدريب الساعين للحصول على فرص موثقة دون أي اشتراكات دورية.'
                  : 'Designed specifically for professional training providers seeking verified opportunities without retainers.'
              }
            />
            <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 md:grid-cols-3">
              {providerBenefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.1}>
                  <div className="card h-full text-center flex flex-col items-center !p-6 sm:!p-8 bg-slate-50/80 border border-slate-200/70 rounded-3xl hover:bg-white hover:shadow-md transition-all duration-300">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary mb-4">
                      <b.icon size={24} />
                    </span>
                    <h3 className="text-lg font-semibold text-slate-800 font-heading">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div id="tiers" className="scroll-mt-24">
            <LeadTiers mode="providers" dict={dict} lang={lang} />
          </div>

          <div id="apply" className="scroll-mt-24">
            <SectionHeading
              eyebrow={isAr ? 'طلب الانضمام للشراكة' : 'Provider Application'}
              title={isAr ? 'قدم للانضمام إلى شبكتنا المعتمدة' : 'Apply to Join Our Network'}
              subtitle={
                isAr
                  ? 'أرسل بيانات شركتك وتخصصاتكم التدريبية لتبدأ في استقبال طلبات التدريب المؤسسية المؤهلة.'
                  : 'Submit your company credentials and training specializations to begin receiving qualified enterprise requests.'
              }
            />
            <Reveal className="mx-auto mt-8 sm:mt-12 max-w-3xl">
              <PartnershipForm dict={dict} lang={lang} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
