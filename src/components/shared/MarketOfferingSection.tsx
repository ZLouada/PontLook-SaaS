import React from 'react';
import Link from 'next/link';
import { Locale, Dictionary } from '@/i18n';
import { isArabicLocale } from '@/i18n/config';
import {
  ShieldCheck,
  Building2,
  BadgeCheck,
  FileText,
  Handshake,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Scale,
  CircleDollarSign,
  Users,
} from '@/components/icons';

interface MarketOfferingSectionProps {
  lang: Locale;
  dictionary: Dictionary;
  className?: string;
  showProviderPricing?: boolean;
}

export default function MarketOfferingSection({
  lang,
  dictionary,
  className = '',
  showProviderPricing = true,
}: MarketOfferingSectionProps) {
  const isAr = isArabicLocale(lang);
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const offering = dictionary.marketOffering;
  const tokens = dictionary.marketTokens;

  if (!offering) return null;

  const trackIcons = [ShieldCheck, Building2, Scale, Users];

  return (
    <section
      id="market-offering"
      className={`relative w-full py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-black text-neutral-200 ${className}`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF5C00]/5 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#FF5C00]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* Top Header / Eyebrow */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#FF5C00]/30 bg-[#FF5C00]/10 text-[#FF5C00] text-xs font-mono font-medium tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5C00]" />
            <span>
              {tokens?.countryName || offering.country} • {isAr ? 'عروض السوق والامتثال' : 'Market Offerings & Compliance'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {isAr
              ? `حلول التدريب المعتمدة لسلاسل الإمداد والهندسة في ${tokens?.countryName || offering.country}`
              : `Accredited Training Matchmaking for ${tokens?.countryName || offering.country}'s Engineering & Energy Supply Chain`}
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            {offering.coreValueProp}
          </p>
        </div>

        {/* Target Profiles & Regulatory Matrix Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Side A Buyers */}
          <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm space-y-4 hover:border-[#FF5C00]/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#FF5C00]/15 text-[#FF5C00] uppercase tracking-wider">
                {isAr ? 'الجانب أ: مشتريات الشركات' : 'Side A: Corporate Buyers'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#FF5C00]" />
                <span>{tokens?.hubCities || 'GCC'}</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white">
              {isAr ? 'الشركات المستهدفة ومراكز القرار' : 'Target Corporate Decision-Makers'}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {offering.targetBuyers}
            </p>

            {tokens && (
              <div className="pt-2 border-t border-white/5 space-y-2 text-xs text-neutral-400 font-mono">
                <div className="flex items-start gap-2">
                  <span className="text-neutral-500 min-w-[120px]">{isAr ? 'التفويض والأنظمة:' : 'Mandate:'}</span>
                  <span className="text-neutral-200 font-sans">{tokens.localizationMandate}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-500 min-w-[120px]">{isAr ? 'الهيئات المعتمدة:' : 'Regulators:'}</span>
                  <span className="text-[#FF5C00] font-sans">{tokens.mandatoryRegulators}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-500 min-w-[120px]">{isAr ? 'مخاطر عدم الامتثال:' : 'Non-Compliance:'}</span>
                  <span className="text-red-400 font-sans">{tokens.nonComplianceRisk}</span>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Link
                href={`/${lang}/intake`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#FF5C00] hover:text-[#ff7828] transition-colors group"
              >
                <span>{isAr ? 'طلب عروض تدريب مخصصة مجاناً' : 'Request Matched Providers (100% Free)'}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Side B Training Providers */}
          <div className="relative p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-sm space-y-4 hover:border-[#FF5C00]/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-blue-500/15 text-blue-400 uppercase tracking-wider">
                {isAr ? 'الجانب ب: مزودو التدريب المعتمدون' : 'Side B: Accredited Providers'}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>{tokens?.decisionCycle || '30-90 Days'}</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white">
              {isAr ? 'المعاهد الاستشارية ومزودو التدريب' : 'Target Training Institutes'}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {offering.targetProviders}
            </p>

            {tokens && (
              <div className="pt-2 border-t border-white/5 space-y-2 text-xs text-neutral-400 font-mono">
                <div className="flex items-start gap-2">
                  <span className="text-neutral-500 min-w-[120px]">{isAr ? 'عملة الشراء:' : 'Currency:'}</span>
                  <span className="text-neutral-200 font-sans">{tokens.buyerCurrency}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-500 min-w-[120px]">{isAr ? 'شروط الدفع:' : 'Terms:'}</span>
                  <span className="text-neutral-200 font-sans">{tokens.providerBilling}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral-500 min-w-[120px]">{isAr ? 'أوقات العمل:' : 'Hours:'}</span>
                  <span className="text-neutral-200 font-sans">{tokens.businessHours}</span>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Link
                href={`/${lang}/intake?role=provider`}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <span>{isAr ? 'انضم لشبكة المزودين المعتمدين' : 'Apply as Accredited Provider'}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Core Renewable & EPC Training Domains */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-[#FF5C00] uppercase tracking-wider">
                {isAr ? 'المسارات التخصصية' : 'Specialized Tracks'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {isAr
                  ? `المسارات التدريبية الأربعة الأكثر طلباً في ${tokens?.countryName || offering.country}`
                  : `4 Core Engineering & Compliance Tracks in ${tokens?.countryName || offering.country}`}
              </h3>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              {isAr ? 'مطابقة لمعايير السلامة والتوطين' : 'Aligned to Regional Mandates'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offering.tracks.map((track, idx) => {
              const IconComp = trackIcons[idx % trackIcons.length];
              return (
                <div
                  key={track.id || idx}
                  className="relative p-6 sm:p-7 rounded-2xl border border-white/10 bg-neutral-900/40 hover:bg-neutral-900/70 hover:border-[#FF5C00]/40 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center text-[#FF5C00]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-neutral-500 uppercase">
                        {isAr ? `المسار 0${idx + 1}` : `Track 0${idx + 1}`}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-white group-hover:text-[#FF5C00] transition-colors">
                      {track.title}
                    </h4>

                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {track.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-500">
                      {isAr ? 'مجموعات تدريبية (10+ متدربين)' : 'Enterprise Cohorts (10+ Learners)'}
                    </span>
                    <Link
                      href={`/${lang}/intake`}
                      className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1 group-hover:text-[#FF5C00]"
                    >
                      <span>{isAr ? 'طلب المسار' : 'Request Cohort'}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Corporate Buyers Choose PontLook (3 Reasons) */}
        {offering.whyChoose && offering.whyChoose.length > 0 && (
          <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-neutral-950 relative overflow-hidden space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono text-[#FF5C00] uppercase tracking-wider">
                {isAr ? 'لماذا بونت لوك؟' : 'The PontLook Advantage'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {isAr
                  ? 'لماذا يعتمد مديرو الموارد البشرية والهندسة على بونت لوك؟'
                  : 'Why HR & EPC Directors Source Through PontLook'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offering.whyChoose.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center text-[#FF5C00] text-sm font-mono font-bold">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Side B: 10-Field Verified Lead File & Deal Math (for Providers) */}
        {showProviderPricing && (
          <div className="space-y-8 pt-4">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                {isAr ? 'الشفافية ونموذج العمل' : 'Data Integrity & Unit Economics'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {isAr
                  ? 'ملف الطلب المعتمد المكون من 10 حقول ونموذج التسعير'
                  : '10-Field Verified Lead File & Transparent Deal Math'}
              </h3>
              <p className="text-sm text-neutral-400 mt-2">
                {isAr
                  ? 'لا نبيع قوائم بريد عشوائية. كل طلب يتم التحقق منه هاتفياً ومطابقته مع ميزانية التدريب والجدول الزمني.'
                  : 'We never sell scrapings or contact lists. Every request is telephone-verified for budget authority, headcount (50–500), and 30–90 day deployment windows.'}
              </p>
            </div>

            {/* 10-Field Lead File Breakdown */}
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-900/50 space-y-4">
              <div className="flex items-center gap-2 text-sm font-mono text-white font-semibold">
                <FileText className="w-4 h-4 text-[#FF5C00]" />
                <span>{isAr ? 'عناصر الملف المعتمد (10 حقول مكتملة)' : 'Standard 10-Field Verified Dossier Delivered per Match'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {offering.leadFields.map((field, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-white/5 bg-black/40 text-xs text-neutral-300 font-mono flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5C00] shrink-0" />
                    <span className="truncate">{field}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Tiers & Unit Economics Table */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile C */}
              <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Profile C</span>
                  <BadgeCheck className="w-4 h-4 text-neutral-400" />
                </div>
                <h4 className="text-base font-semibold text-white">
                  {isAr ? 'منسق التدريب والسلامة' : 'L&D / HSE Coordinator'}
                </h4>
                <div className="text-xl font-bold font-mono text-white">
                  {offering.pricingTiers.profileC}
                </div>
                <p className="text-xs text-neutral-400">
                  {isAr ? 'مطابقة المتطلبات التشغيلية والفنية الميدانية' : 'Operational training and site compliance needs'}
                </p>
              </div>

              {/* Profile A */}
              <div className="p-6 rounded-2xl border border-[#FF5C00]/40 bg-neutral-900/80 space-y-3 relative shadow-lg shadow-[#FF5C00]/5">
                <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto px-2 py-0.5 rounded text-[10px] font-mono bg-[#FF5C00] text-black font-bold uppercase">
                  {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#FF5C00] uppercase">Profile A</span>
                  <BadgeCheck className="w-4 h-4 text-[#FF5C00]" />
                </div>
                <h4 className="text-base font-semibold text-white">
                  {isAr ? 'مدير الموارد البشرية / CHRO' : 'HR Director / CHRO'}
                </h4>
                <div className="text-xl font-bold font-mono text-[#FF5C00]">
                  {offering.pricingTiers.profileA}
                </div>
                <p className="text-xs text-neutral-300">
                  {isAr ? 'ميزانية معتمدة وبرامج توطين للكوادر الوطنية' : 'Direct budget authority & nationalization mandates'}
                </p>
              </div>

              {/* Profile B */}
              <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Profile B</span>
                  <BadgeCheck className="w-4 h-4 text-neutral-400" />
                </div>
                <h4 className="text-base font-semibold text-white">
                  {isAr ? 'المدير التنفيذي / مدير مشاريع EPC' : 'EPC MD / SME CEO'}
                </h4>
                <div className="text-xl font-bold font-mono text-white">
                  {offering.pricingTiers.profileB}
                </div>
                <p className="text-xs text-neutral-400">
                  {isAr ? 'عقود كبرى واستشارات عقود FIDIC وإدارة المشاريع' : 'High ACV contracts, FIDIC claims & project delivery'}
                </p>
              </div>
            </div>

            {/* Model B & Guarantee Card */}
            <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-neutral-950 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="w-5 h-5 text-[#FF5C00]" />
                  <h4 className="text-base font-semibold text-white">
                    {isAr ? 'الخيار ب: المشاركة في الإيرادات' : 'Model B (Rev-Share Alternative)'}
                  </h4>
                </div>
                <span className="text-xs font-mono text-[#FF5C00] font-semibold">
                  {offering.pricingTiers.modelB}
                </span>
              </div>

              <div className="flex items-start gap-3 pt-2 text-xs text-neutral-400 leading-relaxed">
                <Handshake className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium">{isAr ? 'ضمان الجودة وسياسة الدفع: ' : 'Ironclad Quality Guarantee: '}</span>
                  {offering.pricingTiers.guarantee}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Dual Action Callout */}
        <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/80 to-black text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {isAr
              ? `ابدأ الآن مع بونت لوك في ${tokens?.countryName || offering.country}`
              : `Ready to Deploy Verified Corporate Training in ${tokens?.countryName || offering.country}?`}
          </h3>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base">
            {isAr
              ? 'سواء كنت شركة هندسية بحاجة إلى تأهيل كوادر معتمد أو معهداً تدريبياً يبحث عن طلبات تدريب مؤكدة، نحن نضمن التوفيق المباشر.'
              : 'Whether you are an engineering contractor requiring audit-ready cohorts or an accredited institute seeking verified enterprise requests, PontLook bridges the gap.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href={`/${lang}/intake`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FF5C00] hover:bg-[#ff7828] text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#FF5C00]/20"
            >
              <span>{isAr ? 'طلب تدريب لشركتك (مجاناً)' : 'Submit Training Request (100% Free)'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>

            <Link
              href={`/${lang}/intake?role=provider`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>{isAr ? 'التسجيل كمزود تدريب معتمد' : 'Apply as Accredited Provider'}</span>
              <ArrowIcon className="w-4 h-4 text-neutral-400" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
