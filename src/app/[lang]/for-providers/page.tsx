import { getDictionary } from '@/i18n';
import { Locale, i18n } from '@/i18n/config';
import PartnershipForm from '@/components/providers/PartnershipForm';
import LeadTiers from '@/components/providers/LeadTiers';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import { ShieldCheck, Target, DollarSign, Users, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'For Training Providers: B2B Lead Generation | PontLook',
  },
  description:
    'Receive verified corporate training opportunities across Saudi Arabia and the UAE. Zero retainers or subscription fees—pay only for qualified decision-makers.',
};

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
    title: 'Pre-Qualified GCC Buyers',
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
    title: 'عملاء خليجيون تم تأهيل احتياجاتهم',
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
      <div className="bg-hero-gradient">
        <section className="container-site pt-28 sm:pt-36 pb-12 sm:pb-20 px-4 sm:px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="chip mx-auto">
              {isAr ? 'لمزودي ومراكز التدريب' : 'For Training Providers'}
            </span>
            <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-semibold text-slate-800 leading-tight font-heading">
              {isAr ? (
                <>
                  فرص تدريبية للشركات والمؤسسات <span className="text-primary">حسب الطلب</span>
                </>
              ) : (
                <>
                  Enterprise Training Leads <span className="text-primary">On Demand</span>
                </>
              )}
            </h1>
            <p className="mt-4 sm:mt-5 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {isAr
                ? 'تواصل مباشرة مع صناع القرار في الشركات الخليجية التي تبحث بنشاط عن حلول تدريبية. بدون رسوم شهرية ثابتة، الدفع فقط لكل فرصة مؤكدة ومؤهلة.'
                : 'Connect directly with GCC corporate decision-makers actively seeking training solutions. Zero retainers, 100% pay-per-lead.'}
            </p>
          </Reveal>
        </section>
      </div>

      <section className="bg-white py-12 sm:py-20 border-t border-slate-100">
        <div className="container-site max-w-6xl mx-auto px-4 sm:px-6 space-y-14 sm:space-y-24">
          <div>
            <SectionHeading
              eyebrow={isAr ? 'لماذا الشراكة مع بونت لوك' : 'Why Partner with PontLook'}
              title={isAr ? 'تدفق متوقع لفرص الشركات والمؤسسات' : 'Predictable Enterprise Pipeline'}
              subtitle={
                isAr
                  ? 'مصمم خصيصاً لمزودي التدريب في الخليج الساعين للحصول على فرص موثقة دون أي اشتراكات دورية.'
                  : 'Designed specifically for GCC training providers seeking verified opportunities without retainers.'
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

          <LeadTiers dict={dict} lang={lang} />

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
