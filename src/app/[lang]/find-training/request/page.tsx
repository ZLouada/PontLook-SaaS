import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, ShieldCheck, BadgeDollarSign, CheckCircle2 } from 'lucide-react';
import MultiStepFunnel from '@/components/funnel/MultiStepFunnel';
import { Locale, i18n } from '@/i18n/config';
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
    ? 'طلب عروض تدريبية مخصصة للشركات | PontLook'
    : 'Request Corporate Training Proposals | PontLook';
  const description = isAr
    ? 'اطرح متطلبات تدريب فريقك واستلم عروض أسعار تفصيلية من أفضل معاهد ومزودي التدريب المعتمدين بالخليج خلال 48 ساعة. خدمة مجانية 100% للشركات.'
    : 'Submit your corporate training RFP and receive 2 to 3 matched proposals from vetted training providers in 48 hours. 100% free for enterprise buyers.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'find-training/request'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/find-training/request`,
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

function FunnelLoadingFallback() {
  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
      <div className="flex animate-pulse flex-col items-center space-y-4">
        <div className="h-6 w-48 rounded-full bg-slate-200" />
        <div className="h-4 w-72 rounded-full bg-slate-100" />
        <div className="mt-8 h-64 w-full rounded-2xl bg-slate-100" />
      </div>
    </div>
  );
}

export default async function FindTrainingRequestPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-hero-gradient pt-24 sm:pt-28 pb-16 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-blue-500/10 via-primary/5 to-blue-500/10 blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute top-10 start-1/4 w-[350px] h-[350px] bg-blue-500/5 blur-3xl -z-10 rounded-full" />

      <div className="container-site max-w-4xl mx-auto px-4 sm:px-6">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
          <Link
            href={`/${lang}/find-training`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} className={isAr ? 'rotate-180' : ''} />
            <span>{isAr ? 'العودة لنظرة عامة' : 'Back to Training Overview'}</span>
          </Link>

          <span className="text-xs text-primary font-bold uppercase tracking-wider">
            {isAr ? 'طلب تدريب مؤسسي' : 'Enterprise Intake'}
          </span>
        </div>

        {/* Header Intro */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <Building2 size={13} className="text-blue-600" />
            <span>{isAr ? 'خدمة مجانية 100% للشركات' : '100% Free for Enterprises'}</span>
          </span>

          <h1 className="text-2xl sm:text-4xl font-semibold text-slate-900 font-heading tracking-tight">
            {isAr ? 'حدد متطلبات التدريب المؤسسي' : 'Define Your Workforce Training Scope'}
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            {isAr
              ? 'أكمل النموذج في 60 ثانية لاستلام عروض أسعار تفصيلية ومناهج مقترحة من أفضل مزودي التدريب المعتمدين بالخليج.'
              : 'Complete this 60 second questionnaire to receive itemized proposals and syllabi from vetted training academies across the GCC.'}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <BadgeDollarSign size={15} className="text-primary" />
              <span>{isAr ? 'صفر تكلفة للشركات' : '$0 Cost for Buyers'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>{isAr ? 'عروض خلال 48 ساعة' : 'Proposals in 48 Hours'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-600" />
              <span>{isAr ? 'سرية تامة ومضمونة' : 'Strict Confidentiality'}</span>
            </span>
          </div>
        </div>

        {/* Multi-Step Intake Funnel */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-10 shadow-xl shadow-slate-100/70">
          <Suspense fallback={<FunnelLoadingFallback />}>
            <MultiStepFunnel initialLang={lang} />
          </Suspense>
        </div>

        {/* Trust Footnotes */}
        <div className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-white/80 border border-slate-200 rounded-2xl shadow-xs">
            <div className="text-xs text-slate-600 font-semibold">
              {isAr ? '120+ مزود معتمد' : '120+ Vetted Providers'}
            </div>
          </div>
          <div className="p-3 bg-white/80 border border-slate-200 rounded-2xl shadow-xs">
            <div className="text-xs text-slate-600 font-semibold">
              {isAr ? 'بدون أي التزام بالشراء' : 'Zero Purchase Obligation'}
            </div>
          </div>
          <div className="p-3 bg-white/80 border border-slate-200 rounded-2xl shadow-xs">
            <div className="text-xs text-slate-600 font-semibold">
              {isAr ? 'متوافق مع حماية البيانات' : 'KSA PDPL Aligned'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
