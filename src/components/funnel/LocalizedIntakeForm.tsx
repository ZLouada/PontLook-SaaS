'use client';

import React, { useState } from 'react';
import type { Locale } from '@/i18n/config';
import { isArabicLocale, getCountryCode } from '@/i18n/config';
import {
  ShieldCheck,
  Building2,
  BadgeCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
} from '@/components/icons';

interface MarketTokens {
  countryName?: string;
  countryCode?: string;
  hubCities?: string;
  mandatoryRegulators?: string;
  localizationMandate?: string;
  nonComplianceRisk?: string;
  siteSafetyCodes?: string;
  buyerCurrency?: string;
  providerBilling?: string;
  decisionCycle?: string;
  businessHours?: string;
}

interface LocalizedIntakeFormProps {
  lang: Locale;
  initialRole?: 'buyer' | 'provider';
  marketTokens?: MarketTokens;
}

export default function LocalizedIntakeForm({
  lang,
  initialRole = 'buyer',
  marketTokens,
}: LocalizedIntakeFormProps) {
  const isAr = isArabicLocale(lang);
  const countryCode = getCountryCode(lang);
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Defaults based on locale
  const defaultCountry =
    countryCode === 'sa'
      ? 'Saudi Arabia'
      : countryCode === 'ae'
      ? 'United Arab Emirates'
      : 'Saudi Arabia';

  const defaultPhonePrefix =
    countryCode === 'sa' ? '+966' : countryCode === 'ae' ? '+971' : '+966';

  const defaultCurrency =
    countryCode === 'sa' ? 'SAR' : countryCode === 'ae' ? 'AED' : 'USD';

  // Dynamic Regulator Options based on geo-locale
  const regulatorOptions =
    countryCode === 'sa'
      ? [
          {
            id: 'tvtc',
            labelEn: 'TVTC Accredited',
            labelAr: 'معتمد من المؤسسة العامة للتدريب التقني والمهني (TVTC)',
          },
          {
            id: 'hrdf',
            labelEn: 'HRDF (Hadaf) Reimbursement Eligible',
            labelAr: 'مؤهل لدعم صندوق تنمية الموارد البشرية (هدف)',
          },
          {
            id: 'sce',
            labelEn: 'SCE Recognized (Saudi Council of Engineers)',
            labelAr: 'معتمد لدى الهيئة السعودية للمهندسين (SCE)',
          },
          {
            id: 'safety',
            labelEn: 'NEBOSH / ISO 14001/45001 / HCIS / Mostadam',
            labelAr: 'نيبوش / آيزو / الأمن الصناعي (HCIS) / مستدام',
          },
        ]
      : countryCode === 'ae'
      ? [
          {
            id: 'khda',
            labelEn: 'KHDA Approved (Dubai Mainland)',
            labelAr: 'مرخص من هيئة المعرفة والتنمية البشرية (KHDA دبي)',
          },
          {
            id: 'actvet_oshad',
            labelEn: 'ACTVET / OSHAD Approved (Abu Dhabi)',
            labelAr: 'معتمد من مركز أبوظبي للتدريب التقني (ACTVET) وأوشاد (OSHAD)',
          },
          {
            id: 'nafis',
            labelEn: 'Nafis Aligned (Emiratization Training Partner)',
            labelAr: 'متوافق مع مبادرات برنامج نافس لتوطين الكفاءات',
          },
          {
            id: 'safety',
            labelEn: 'NEBOSH / ISO 14001/45001 / Al Sa\'fat / Estidama',
            labelAr: 'نيبوش / آيزو / السعفات الخضراء / استدامة',
          },
        ]
      : [
          {
            id: 'tvtc_khda',
            labelEn: 'TVTC / KHDA Accredited',
            labelAr: 'اعتماد المؤسسة العامة (TVTC) أو هيئة المعرفة (KHDA)',
          },
          {
            id: 'hrdf_nafis',
            labelEn: 'HRDF (Hadaf) / Nafis Eligible',
            labelAr: 'مؤهل لبرامج الدعم الحكومي (هدف / نافس)',
          },
          {
            id: 'engineering_council',
            labelEn: 'SCE Recognized / Regional Engineering Councils',
            labelAr: 'معتمد لدى الهيئات الهندسية الخليجية',
          },
          {
            id: 'safety',
            labelEn: 'NEBOSH / ISO / OSHAD / HCIS Safety Codes',
            labelAr: 'معايير السلامة المهنية الدولية (NEBOSH / ISO / HCIS)',
          },
        ];

  // Form State
  const [role, setRole] = useState<'buyer' | 'provider'>(initialRole);
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [country, setCountry] = useState(defaultCountry);
  const [city, setCity] = useState('');
  const [phonePrefix, setPhonePrefix] = useState(defaultPhonePrefix);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [headcount, setHeadcount] = useState('50_250');
  const [cohortSize, setCohortSize] = useState<'1_5_execs' | '6_20_team' | '21_50_dept' | '50_plus_enterprise'>('6_20_team');
  const [timeline, setTimeline] = useState<'immediate' | 'within_30_days' | 'next_quarter' | 'planning'>('within_30_days');
  const [budgetBand, setBudgetBand] = useState<'under_10k' | '10k_25k' | '25k_50k' | '50k_plus' | 'pending_guidance'>('10k_25k');
  const [currency, setCurrency] = useState(defaultCurrency);
  const [selectedRegulators, setSelectedRegulators] = useState<string[]>([
    regulatorOptions[0]?.id || 'tvtc',
  ]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>(['engineering']);
  const [accreditationNumber, setAccreditationNumber] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleRegulator = (id: string) => {
    setSelectedRegulators((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleDomain = (domainId: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domainId)
        ? prev.filter((d) => d !== domainId)
        : [...prev, domainId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const payload = {
        fullName,
        jobTitle,
        workEmail,
        organizationName,
        country,
        city,
        phoneCountryCode: phonePrefix,
        phoneNumber,
        domains: selectedDomains,
        cohortSize,
        timeline,
        budgetBand,
        currency,
        role,
        regulators: selectedRegulators,
        accreditationNumber,
        headcount,
        additionalContext,
      };

      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit intake. Please verify your details.');
      }

      setLeadId(data.leadId || `PL-${Date.now().toString(36).toUpperCase()}`);
      setSubmitSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl border border-[#FF5C00]/40 bg-neutral-900/90 text-center space-y-6 shadow-2xl shadow-[#FF5C00]/10 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-[#FF5C00]/15 border border-[#FF5C00]/30 flex items-center justify-center mx-auto text-[#FF5C00]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FF5C00]/10 text-[#FF5C00] uppercase tracking-wider">
            {isAr ? 'تم استلام طلبك بنجاح' : 'Intake Request Confirmed'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {role === 'buyer'
              ? isAr
                ? 'جاري فحص المتطلبات والتوفيق مع المزودين المعتمدين'
                : 'Matching Your Cohort With Pre-Vetted Providers'
              : isAr
              ? 'تم استلام طلب الانضمام لشبكة المزودين المعتمدين'
              : 'Provider Application Received for Qualification'}
          </h3>
          <p className="text-sm text-neutral-300 max-w-lg mx-auto">
            {role === 'buyer'
              ? isAr
                ? 'خلال 48 ساعة، سيتواصل معك فريق التحقق لتقديم 2 إلى 3 عروض مخصصة مطابقة لهيئات الاعتماد المطلوبة بدون أي رسوم.'
                : 'Within 48 hours, our procurement concierge will deliver 2 to 3 tailored proposals meeting your exact regulatory and cohort requirements at $0 cost.'
              : isAr
              ? 'يقوم فريق التدقيق بالتحقق من الترخيص وربط ملف مركزك بطلبات التدريب المؤكدة في منطقتك.'
              : 'Our verification desk will review your licenses and activate your verified lead routing pipeline.'}
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-black/50 text-xs font-mono text-neutral-400 space-y-1 max-w-md mx-auto text-start">
          <div className="flex justify-between">
            <span>{isAr ? 'الرقم المرجعي:' : 'Reference ID:'}</span>
            <span className="text-white font-bold">{leadId}</span>
          </div>
          <div className="flex justify-between">
            <span>{isAr ? 'الدولة / العملة:' : 'Market / Currency:'}</span>
            <span className="text-[#FF5C00] font-bold">{country} ({currency})</span>
          </div>
          <div className="flex justify-between">
            <span>{isAr ? 'البريد الإلكتروني:' : 'Contact:'}</span>
            <span className="text-neutral-200">{workEmail}</span>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={() => {
              setSubmitSuccess(false);
              setFullName('');
              setWorkEmail('');
              setOrganizationName('');
            }}
            className="text-xs font-mono text-[#FF5C00] hover:underline"
          >
            {isAr ? 'تقديم طلب جديد' : 'Submit another request'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-white/10 bg-neutral-900/70 backdrop-blur-md p-6 sm:p-10 shadow-2xl relative">
      {/* Role Toggle Switch */}
      <div className="flex items-center justify-center mb-8">
        <div className="p-1 rounded-2xl bg-black/60 border border-white/10 inline-flex">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              role === 'buyer'
                ? 'bg-[#FF5C00] text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isAr ? '🏢 طلب تدريب للشركات (مجاناً)' : '🏢 Corporate Buyer (100% Free)'}
          </button>

          <button
            type="button"
            onClick={() => setRole('provider')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              role === 'provider'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {isAr ? '🎓 انضمام مزود تدريب معتمد' : '🎓 Accredited Provider Application'}
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-mono">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Contact & Company Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <Building2 className="w-4 h-4 text-[#FF5C00]" />
            <h4 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
              {isAr ? '1. بيانات المنشأة وجهة الاتصال' : '1. Enterprise & Contact Profile'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'الاسم الكامل *' : 'Full Name *'}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={isAr ? 'م. سلطان القحطاني' : 'Eng. Sarah Jenkins'}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'المسمى الوظيفي *' : 'Job Title *'}
              </label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder={
                  role === 'buyer'
                    ? isAr
                      ? 'مدير الموارد البشرية / مدير التدريب'
                      : 'HR Director / HSE Lead / EPC MD'
                    : isAr
                    ? 'المدير التنفيذي / مدير تطوير الأعمال'
                    : 'Managing Director / Business Head'
                }
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'البريد الإلكتروني للعمل *' : 'Corporate Work Email *'}
              </label>
              <input
                type="email"
                required
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'اسم المنشأة / الشركة *' : 'Organization Name *'}
              </label>
              <input
                type="text"
                required
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder={isAr ? 'شركة المقاولات والطاقة المتجددة' : 'Solar EPC & Engineering Ltd.'}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Country, City & Direct WhatsApp */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <ShieldCheck className="w-4 h-4 text-[#FF5C00]" />
            <h4 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
              {isAr ? '2. الدولة والمدينة والهاتف المباشر' : '2. Geo-Location & Direct Phone'}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'الدولة *' : 'Country *'}
              </label>
              <select
                value={country}
                onChange={(e) => {
                  const c = e.target.value;
                  setCountry(c);
                  if (c === 'Saudi Arabia') {
                    setPhonePrefix('+966');
                    setCurrency('SAR');
                  } else if (c === 'United Arab Emirates') {
                    setPhonePrefix('+971');
                    setCurrency('AED');
                  }
                }}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              >
                <option value="Saudi Arabia">Saudi Arabia (المملكة العربية السعودية)</option>
                <option value="United Arab Emirates">United Arab Emirates (الإمارات العربية المتحدة)</option>
                <option value="Qatar">Qatar (قطر)</option>
                <option value="Kuwait">Kuwait (الكويت)</option>
                <option value="Bahrain">Bahrain (البحرين)</option>
                <option value="Oman">Oman (عُمان)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'المدينة *' : 'City *'}
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={countryCode === 'sa' ? (isAr ? 'الرياض / الدمام / جدة' : 'Riyadh / Dammam / Jeddah') : (isAr ? 'دبي / أبوظبي / الشارقة' : 'Dubai / Abu Dhabi / Sharjah')}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'رقم الواتساب / الجوال *' : 'Direct WhatsApp / Phone *'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={phonePrefix}
                  className="w-20 px-3 py-3 rounded-xl border border-white/10 bg-neutral-800 text-xs font-mono text-center text-white"
                />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="50 123 4567"
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Regulatory Compliance Checkboxes (Localized) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-[#FF5C00]" />
              <h4 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                {role === 'buyer'
                  ? isAr
                    ? '3. اعتمادات وتراخيص مزود التدريب المطلوبة'
                    : '3. Required Provider Accreditations'
                  : isAr
                  ? '3. تراخيص واعتمادات المركز الحالية'
                  : '3. Your Current Accreditations'}
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#FF5C00]">
              {countryCode === 'sa' ? 'KSA Mandates' : countryCode === 'ae' ? 'UAE Mandates' : 'GCC Accreditations'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {regulatorOptions.map((reg) => {
              const isChecked = selectedRegulators.includes(reg.id);
              return (
                <button
                  type="button"
                  key={reg.id}
                  onClick={() => toggleRegulator(reg.id)}
                  className={`p-3.5 rounded-xl border text-start transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'border-[#FF5C00] bg-[#FF5C00]/10 text-white'
                      : 'border-white/10 bg-black/40 text-neutral-400 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      isChecked ? 'bg-[#FF5C00] border-[#FF5C00]' : 'border-neutral-500'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
                  </div>
                  <span className="text-xs font-sans leading-snug">
                    {isAr ? reg.labelAr : reg.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Cohort Scope, Budget & Currency */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#FF5C00]" />
              <h4 className="text-sm font-mono uppercase tracking-wider text-white font-semibold">
                {role === 'buyer'
                  ? isAr
                    ? '4. حجم المجموعة والجدول الزمني والميزانية'
                    : '4. Cohort Scope, Timeline & Budget'
                  : isAr
                  ? '4. الطاقة الاستيعابية والجدول الزمني'
                  : '4. Training Delivery Capacity & Timeline'}
              </h4>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              {isAr ? `العملة: ${currency}` : `Currency: ${currency}`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'حجم المجموعة التدريبية *' : 'Cohort Size *'}
              </label>
              <select
                value={cohortSize}
                onChange={(e) => setCohortSize(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              >
                <option value="1_5_execs">{isAr ? '1–5 قياديين وتنفيذيين' : '1–5 Executives'}</option>
                <option value="6_20_team">{isAr ? '6–20 متدرباً (فريق هندسي)' : '6–20 Learners (Engineering Team)'}</option>
                <option value="21_50_dept">{isAr ? '21–50 متدرباً (قسم متكامل)' : '21–50 Learners (Department)'}</option>
                <option value="50_plus_enterprise">{isAr ? '50+ متدرباً (برنامج مؤسسي موسع)' : '50+ Enterprise Scale'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? 'الجدول الزمني لبدء التدريب *' : 'Start Timeline *'}
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              >
                <option value="immediate">{isAr ? 'فوري (خلال أسبوعين)' : 'Immediate (Within 2 Weeks)'}</option>
                <option value="within_30_days">{isAr ? 'خلال 30 يوماً' : 'Within 30 Days'}</option>
                <option value="next_quarter">{isAr ? 'الربع القادم (30–90 يوماً)' : 'Next Quarter (30–90 Days)'}</option>
                <option value="planning">{isAr ? 'تخطيط ميزانية سنوية' : 'Annual Budget Planning'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-400 mb-1">
                {isAr ? `نطاق الميزانية المعتمدة (${currency}) *` : `Budget Band (${currency}) *`}
              </label>
              <select
                value={budgetBand}
                onChange={(e) => setBudgetBand(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
              >
                <option value="10k_25k">
                  {currency === 'SAR' ? '40,000 – 100,000 SAR' : currency === 'AED' ? '40,000 – 100,000 AED' : '$10,000 – $25,000 USD'}
                </option>
                <option value="25k_50k">
                  {currency === 'SAR' ? '100,000 – 200,000 SAR' : currency === 'AED' ? '100,000 – 200,000 AED' : '$25,000 – $50,000 USD'}
                </option>
                <option value="50k_plus">
                  {currency === 'SAR' ? '200,000+ SAR' : currency === 'AED' ? '200,000+ AED' : '$50,000+ USD'}
                </option>
                <option value="under_10k">
                  {currency === 'SAR' ? 'أقل من 40,000 SAR' : currency === 'AED' ? 'أقل من 40,000 AED' : 'Under $10,000 USD'}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Provider Specific Section */}
        {role === 'provider' && (
          <div className="p-4 sm:p-6 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-semibold text-white">
                {isAr ? 'بيانات الترخيص وشروط الشراكة' : 'Accreditation Details & Agreement'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-1">
                  {isAr ? 'رقم رخصة التدريب المعتمدة' : 'Official License / Accreditation #'}
                </label>
                <input
                  type="text"
                  value={accreditationNumber}
                  onChange={(e) => setAccreditationNumber(e.target.value)}
                  placeholder="e.g. TVTC-94812 / KHDA-6291"
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="flex items-center pt-5">
                <span className="text-xs text-neutral-300">
                  {isAr
                    ? '🔒 0$ رسوم اشتراك شهرية · تجربة أول 5 فرص مجاناً · تسوية المستحقات خلال 7 أيام عمل.'
                    : '🔒 $0 Monthly retainers · First 5 leads free pilot · 7-day invoice settlement rule.'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Specific Training Challenge / Notes */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 mb-1">
            {role === 'buyer'
              ? isAr
                ? 'ملاحظات إضافية أو تفاصيل التحدي الميداني'
                : 'Specific Requirements or Workforce Challenges'
              : isAr
              ? 'مجالات التدريب الأكثر تميزاً لدى مركزكم'
              : 'Key Core Delivery Capabilities'}
          </label>
          <textarea
            rows={3}
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder={
              role === 'buyer'
                ? isAr
                  ? 'مثال: نحتاج لتأهيل 15 مهندساً سعودياً حديث التخرج في مشاريع الطاقة الشمسية واجتياز اختبارات السلامة قبل التعيين الميداني.'
                  : 'Example: Need 15 engineers certified for high-voltage solar EPC site mobilization under Mostadam & HCIS standards.'
                : isAr
                ? 'مثال: مركز معتمد من TVTC متخصص في عقود فيديك FIDIC والسلامة الصناعية NEBOSH IGC.'
                : 'Example: TVTC-accredited consultancy with 12 faculty members specialized in FIDIC and NEBOSH IGC.'
            }
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-sm text-white focus:outline-none focus:border-[#FF5C00]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF5C00]" />
            <span>
              {role === 'buyer'
                ? isAr
                  ? 'خدمة مجانية 100% للشركات · اتفاقية سرية بيانات (NDA)'
                  : '100% Free for Corporate Buyers · Strict NDA Protected'
                : isAr
                ? 'بدون رسوم اشتراك شهري · ضمان استبدال الفرص غير المؤهلة'
                : 'Zero Retainers · 100% Free Replacement for Disputed Leads'}
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 ${
              role === 'buyer'
                ? 'bg-[#FF5C00] hover:bg-[#ff7828] text-black shadow-[#FF5C00]/20'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{isAr ? 'جاري الإرسال والتدقيق...' : 'Validating & Submitting...'}</span>
              </>
            ) : (
              <>
                <span>
                  {role === 'buyer'
                    ? isAr
                      ? 'إرسال طلب التدريب (مجاناً)'
                      : 'Submit Training Request (100% Free)'
                    : isAr
                    ? 'تقديم طلب الانضمام كشريك معتمد'
                    : 'Submit Accredited Provider Application'}
                </span>
                <ArrowIcon className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
