'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  Check,
} from 'lucide-react';
import OrbBadge from '@/components/shared/OrbBadge';
import CountryFlag from '@/components/shared/CountryFlag';

interface ProviderApplicationWizardProps {
  lang: string;
  isAr: boolean;
}

const DOMAINS_EN = [
  'Executive Leadership & Strategy',
  'Artificial Intelligence & Digital Skills',
  'Sales & Commercial Performance',
  'QHSE, Safety & Industrial Standards',
  'Banking, Finance & Risk Compliance',
  'Customer Experience & Service Excellence',
  'Saudization & National Workforce Enablement',
  'Project Management & Agile Operations',
];

const DOMAINS_AR = [
  'القيادة التنفيذية والاستراتيجية',
  'الذكاء الاصطناعي والمهارات الرقمية',
  'مبيعات وأداء الفرق التجارية',
  'السلامة والصحة المهنية والمعايير الصناعية',
  'المالية والمصرفية والامتثال',
  'تجربة العملاء والتميز المؤسسي',
  'برامج التوطين وتأهيل الكفاءات الوطنية',
  'إدارة المشاريع والتحول المؤسسي',
];

const DELIVERY_MODES_EN = [
  { id: 'in_person', label: 'In Person Onsite' },
  { id: 'virtual', label: 'Virtual Live Interactive' },
  { id: 'blended', label: 'Blended Executive Format' },
];

const DELIVERY_MODES_AR = [
  { id: 'in_person', label: 'تدريب حضوري مباشر' },
  { id: 'virtual', label: 'تدريب افتراضي تفاعلي' },
  { id: 'blended', label: 'تدريب مدمج هجين' },
];

const GCC_MARKETS_EN = [
  'Saudi Arabia (Riyadh, Eastern Province, Jeddah)',
  'United Arab Emirates (Dubai, Abu Dhabi)',
  'Qatar',
  'Kuwait',
  'Bahrain & Oman',
];

const GCC_MARKETS_AR = [
  'المملكة العربية السعودية (الرياض، الشرقية، جدة)',
  'الإمارات العربية المتحدة (دبي، أبوظبي)',
  'دولة قطر',
  'دولة الكويت',
  'البحرين وسلطنة عمان',
];

// Map each market label (EN index) to its flag code(s)
const MARKET_FLAG_CODES: Record<number, string[]> = {
  0: ['SA'],           // Saudi Arabia
  1: ['AE'],           // UAE
  2: ['QA'],           // Qatar
  3: ['KW'],           // Kuwait
  4: ['BH', 'OM'],     // Bahrain & Oman
};

const YEARS_OPTIONS_EN = [
  { value: 'under_2', label: 'Less than 2 years' },
  { value: '2_to_5', label: '2 to 5 years' },
  { value: '5_to_10', label: '5 to 10 years' },
  { value: '10_plus', label: '10+ years' },
];

const YEARS_OPTIONS_AR = [
  { value: 'under_2', label: 'أقل من سنتين' },
  { value: '2_to_5', label: 'من 2 إلى 5 سنوات' },
  { value: '5_to_10', label: 'من 5 إلى 10 سنوات' },
  { value: '10_plus', label: 'أكثر من 10 سنوات' },
];

const COHORT_OPTIONS_EN = [
  { value: 'exec_1_5', label: 'Executive 1 to 5 Leaders' },
  { value: 'dept_6_20', label: 'Department Teams 6 to 20 Participants' },
  { value: 'cross_20_50', label: 'Cross Functional 20 to 50 Participants' },
  { value: 'large_50_plus', label: 'Large Scale 50+ Workforce' },
];

const COHORT_OPTIONS_AR = [
  { value: 'exec_1_5', label: 'قيادات تنفيذية 1 إلى 5' },
  { value: 'dept_6_20', label: 'فرق وأقسام 6 إلى 20 مشاركاً' },
  { value: 'cross_20_50', label: 'إدارات مشتركة 20 إلى 50 مشاركاً' },
  { value: 'large_50_plus', label: 'كوادر ومجموعات كبرى 50 فأكثر' },
];

const REFERRAL_OPTIONS_EN = [
  'LinkedIn',
  'Executive Referral',
  'Google Search',
  'Industry Conference or Event',
  'Other',
];

const REFERRAL_OPTIONS_AR = [
  'لينكد إن',
  'توصية من زميل أو شريك أعمال',
  'محرك بحث جوجل',
  'مؤتمر أو فعالية متخصصة',
  'مصدر آخر',
];

export default function ProviderApplicationWizard({ lang, isAr }: ProviderApplicationWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    // Step 1: Organization & Identity
    companyName: '',
    website: '',
    fullName: '',
    role: '',
    yearsInBusiness: '2_to_5',

    // Step 2: Capabilities
    specialties: [] as string[],
    deliveryModes: ['in_person'] as string[],

    // Step 3: Markets & Scale
    markets: ['Saudi Arabia (Riyadh, Eastern Province, Jeddah)'] as string[],
    cohortScale: 'dept_6_20',
    differentiators: '',

    // Step 4: Contact & Verification
    businessEmail: '',
    phone: '',
    referralSource: 'LinkedIn',
    agreementConfirmed: false,

    // Honeypot
    _gotcha: '',
  });

  const domains = isAr ? DOMAINS_AR : DOMAINS_EN;
  const deliveryModes = isAr ? DELIVERY_MODES_AR : DELIVERY_MODES_EN;
  const gccMarkets = isAr ? GCC_MARKETS_AR : GCC_MARKETS_EN;
  const yearsOptions = isAr ? YEARS_OPTIONS_AR : YEARS_OPTIONS_EN;
  const cohortOptions = isAr ? COHORT_OPTIONS_AR : COHORT_OPTIONS_EN;
  const referralOptions = isAr ? REFERRAL_OPTIONS_AR : REFERRAL_OPTIONS_EN;

  const toggleSpecialty = (domain: string) => {
    setFormData((prev) => {
      const exists = prev.specialties.includes(domain);
      const next = exists ? prev.specialties.filter((item) => item !== domain) : [...prev.specialties, domain];
      return { ...prev, specialties: next };
    });
  };

  const toggleDeliveryMode = (id: string) => {
    setFormData((prev) => {
      const exists = prev.deliveryModes.includes(id);
      if (exists && prev.deliveryModes.length === 1) return prev; // keep at least one
      const next = exists ? prev.deliveryModes.filter((item) => item !== id) : [...prev.deliveryModes, id];
      return { ...prev, deliveryModes: next };
    });
  };

  const toggleMarket = (market: string) => {
    setFormData((prev) => {
      const exists = prev.markets.includes(market);
      if (exists && prev.markets.length === 1) return prev; // keep at least one
      const next = exists ? prev.markets.filter((item) => item !== market) : [...prev.markets, market];
      return { ...prev, markets: next };
    });
  };

  const handleNext = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    // Step validations
    if (step === 1) {
      if (!formData.companyName.trim()) {
        setErrorMessage(isAr ? 'يرجى إدخال اسم المنشأة التدريبية' : 'Please enter your organization name');
        return;
      }
      if (!formData.fullName.trim()) {
        setErrorMessage(isAr ? 'يرجى إدخال الاسم الكامل' : 'Please enter your full name');
        return;
      }
      if (!formData.role.trim()) {
        setErrorMessage(isAr ? 'يرجى إدخال المسمى الوظيفي' : 'Please enter your job role or title');
        return;
      }
    }

    if (step === 2) {
      if (formData.specialties.length === 0) {
        setErrorMessage(
          isAr
            ? 'يرجى اختيار تخصص تدريبي واحد على الأقل'
            : 'Please select at least one training specialty'
        );
        return;
      }
    }

    if (step === 3) {
      if (formData.markets.length === 0) {
        setErrorMessage(
          isAr ? 'يرجى اختيار سوق خليجي واحد على الأقل' : 'Please select at least one target market'
        );
        return;
      }
    }

    if (step < 4) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMessage('');
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.businessEmail.trim() || !formData.businessEmail.includes('@')) {
      setErrorMessage(isAr ? 'يرجى إدخال بريد عمل رسمي صحيح' : 'Please enter a valid work email address');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMessage(
        isAr ? 'يرجى إدخال رقم هاتف أو واتساب صحيح' : 'Please enter a valid phone or WhatsApp number'
      );
      return;
    }

    if (!formData.agreementConfirmed) {
      setErrorMessage(
        isAr
          ? 'يرجى تأكيد الجاهزية والاعتماد لمتابعة الطلب'
          : 'Please confirm trainer capacity and credentials to proceed'
      );
      return;
    }

    if (formData._gotcha) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);

    const ref = `PL PRV ${Date.now().toString(36).toUpperCase()}`;
    setApplicationRef(ref);

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '8b61988b-d8e3-414b-a843-5ea273292bb5',
      from_name: 'PontLook Provider Qualification Desk',
      subject: `New Provider Application: ${formData.companyName} (${formData.fullName}) · ${ref}`,
      form_type: 'Training Provider Partnership Application',
      company_name: formData.companyName,
      website: formData.website || 'N/A',
      full_name: formData.fullName,
      role: formData.role,
      years_in_business: formData.yearsInBusiness,
      specialties: formData.specialties.join(', '),
      delivery_modes: formData.deliveryModes.join(', '),
      markets: formData.markets.join(', '),
      cohort_scale: formData.cohortScale,
      differentiators: formData.differentiators || 'None specified',
      business_email: formData.businessEmail,
      phone: formData.phone,
      referral_source: formData.referralSource,
      reference_code: ref,
      submitted_at: new Date().toISOString(),
      _gotcha: formData._gotcha,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success !== false) {
        setIsSubmitted(true);
        window.scrollTo({ top: 100, behavior: 'smooth' });
      } else {
        const msg = data?.message || 'Submission failed. Please verify your details and try again.';
        setErrorMessage(msg);
      }
    } catch (err) {
      console.error('Provider application submission error:', err);
      setErrorMessage(
        isAr
          ? 'حدث خطأ في الاتصال بالشبكة. يرجى إعادة المحاولة.'
          : 'Network connection issue. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
        <div className="bg-[#0F1013] border border-[#26282D] rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-blue-500/10 blur-3xl pointer-events-none" />

          <div className="flex justify-center mb-6">
            <OrbBadge state="solving" size={64} label={applicationRef || 'PL PRV CONFIRMED'} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-white font-heading tracking-tight mb-3">
            {isAr ? 'تم استلام طلب الشراكة بنجاح' : 'Partner Application Received'}
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto mb-8 font-normal">
            {isAr
              ? 'شكراً لكم. يقوم فريق الشراكات بمراجعة بيانات مؤسستكم التدريبية، وسنتواصل معكم عبر البريد والواتساب خلال يومي عمل لجدولة مكالمة التأهيل وبدء استقبال الفرص.'
              : 'Thank you for applying. Our partnerships team is reviewing your profile and credentials. We will reach out via email and WhatsApp within 2 business days to schedule your qualification call.'}
          </p>

          {/* Roadmap */}
          <div className="bg-[#16171B] border border-[#26282D] rounded-2xl p-5 sm:p-6 text-start mb-8 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
              {isAr ? 'مسار التأهيل والاعتماد' : 'Qualification Roadmap'}
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-black text-xs font-bold font-mono">
                1
              </span>
              <div>
                <div className="text-sm font-semibold text-white">
                  {isAr ? 'مراجعة الاعتمادات وسجل التدريب' : 'Faculty & Credential Verification'}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {isAr ? 'خلال يومي عمل كحد أقصى' : 'Completed within 2 business days'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F1013] border border-[#26282D] text-neutral-300 text-xs font-bold font-mono">
                2
              </span>
              <div>
                <div className="text-sm font-semibold text-white">
                  {isAr ? 'مكالمة التعارف والتوافق 20 دقيقة' : '20 Minute Alignment Consultation'}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {isAr
                    ? 'تحديد مجالات التركيز والميزانيات المستهدفة'
                    : 'Target budget tiers and industry preferences alignment'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F1013] border border-[#26282D] text-neutral-300 text-xs font-bold font-mono">
                3
              </span>
              <div>
                <div className="text-sm font-semibold text-white">
                  {isAr ? 'تفعيل العضوية واستقبال الفرص' : 'Network Activation & Lead Delivery'}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {isAr
                    ? 'استلام بيانات أصحاب القرار للشركات المهتمة'
                    : 'Receive verified decision maker opportunities directly'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`/${lang}/for-providers`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold text-sm border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs active:scale-[0.98] transition-all duration-200"
            >
              <span>{isAr ? 'العودة لصفحة مزودي التدريب' : 'Return to Providers Overview'}</span>
              <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
            </Link>

            <Link
              href={`/${lang}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white font-medium text-sm border border-[#26282D] hover:border-white/20 shadow-xs transition-all duration-200"
            >
              <span>{isAr ? 'الصفحة الرئيسية' : 'Homepage'}</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
        <Link
          href={`/${lang}/for-providers`}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} className={isAr ? 'rotate-180' : ''} />
          <span>{isAr ? 'العودة إلى نظرة عامة' : 'Back to Providers Overview'}</span>
        </Link>

        <div className="flex items-center gap-2">
          <OrbBadge
            state={step === 1 ? 'working' : step === 2 ? 'shaping' : step === 3 ? 'weaving' : 'connecting'}
            size={20}
            label={isAr ? `الخطوة ${step} من 4` : `Step ${step} of 4`}
          />
        </div>
      </div>

      {/* Sleek Progress Bar */}
      <div className="w-full h-2 bg-[#16171B] rounded-full overflow-hidden mb-8 border border-[#26282D]">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Main Card Container */}
      <div className="bg-[#0F1013] border border-[#26282D] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="pointer-events-none absolute top-0 right-0 w-80 h-32 bg-white/[0.02] blur-3xl" />

        {/* Step 1: Organization & Identity */}
        {step === 1 && (
          <div>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#16171B] border border-[#26282D] font-mono text-xs text-neutral-300 font-semibold uppercase tracking-wider mb-3">
                {isAr ? 'الخطوة 1 · معلومات المنشأة' : 'Step 1 · Basic Information'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white font-heading tracking-tight">
                {isAr ? 'معلومات عن مؤسستكم التدريبية' : 'Tell us about your training organization'}
              </h1>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                {isAr
                  ? 'نتعاون مع المعاهد التدريبية المعتمدة ومراكز التدريب المتخصصة لتزويدهم بعملاء مؤسسيين مؤهلين.'
                  : 'We partner with accredited boutique academies and enterprise training institutions across the GCC.'}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  {isAr ? 'اسم الشركة أو المعهد التدريبي' : 'Company or Institute Name'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder={
                    isAr ? 'مثال: أكاديمية المستقبل للتدريب والتطوير' : 'e.g. Apex Executive Academy'
                  }
                  className="w-full bg-[#16171B] border border-[#26282D] focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all outline-none shadow-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  {isAr ? 'الموقع الإلكتروني أو الملف التعريفي' : 'Website or Portfolio Link'}
                </label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#16171B] border border-[#26282D] focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all outline-none shadow-xs"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    {isAr ? 'الاسم الكامل لمسؤول التواصل' : 'Your Full Name'}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={isAr ? 'الاسم الثلاثي' : 'e.g. Tariq Al Mansoor'}
                    className="w-full bg-[#16171B] border border-[#26282D] focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                    {isAr ? 'المسمى الوظيفي' : 'Your Job Title / Seniority'}{' '}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder={
                      isAr
                        ? 'مثال: الرئيس التنفيذي، مدير تطوير الأعمال'
                        : 'e.g. Managing Director, Head of Corporate Training'
                    }
                    className="w-full bg-[#16171B] border border-[#26282D] focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all outline-none shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  {isAr ? 'سنوات الخبرة في التدريب المؤسسي' : 'Years Operating in Enterprise Training'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {yearsOptions.map((opt) => {
                    const isSelected = formData.yearsInBusiness === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, yearsInBusiness: opt.value })}
                        className={`px-3 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-white/[0.08] border-white/40 text-white font-semibold shadow-xs'
                            : 'bg-[#16171B] border-[#26282D] text-neutral-300 hover:bg-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Training Capabilities */}
        {step === 2 && (
          <div>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#16171B] border border-[#26282D] font-mono text-xs text-neutral-300 font-semibold uppercase tracking-wider mb-3">
                {isAr ? 'الخطوة 2 · مجالات التدريب والتخصص' : 'Step 2 · Capabilities & Focus'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white font-heading tracking-tight">
                {isAr ? 'ما هي مجالات تخصصكم التدريبي؟' : 'What are your core training specialties?'}
              </h1>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                {isAr
                  ? 'حدد كافة المجالات التي تمتلكون فيها برامج معتمدة وخبرات تنفيذية مثبتة مع كبرى الشركات.'
                  : 'Select all disciplines where your faculty holds accredited credentials and verified client outcomes.'}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-3">
                  {isAr ? 'مجالات التدريب الأساسية' : 'Core Training Disciplines'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {domains.map((dom) => {
                    const isSelected = formData.specialties.includes(dom);
                    return (
                      <button
                        key={dom}
                        type="button"
                        onClick={() => toggleSpecialty(dom)}
                        className={`text-start p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm transition-all ${
                          isSelected
                            ? 'bg-white/[0.08] border-white/40 text-white font-semibold shadow-xs'
                            : 'bg-[#16171B] border-[#26282D] text-neutral-300 hover:bg-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        <span className="leading-snug">{dom}</span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-all ${
                            isSelected
                              ? 'bg-white border-white text-black'
                              : 'border-[#26282D] bg-[#16171B]'
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-3">
                  {isAr ? 'طرق التنفيذ والتقديم' : 'Primary Delivery Formats'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {deliveryModes.map((mode) => {
                    const isSelected = formData.deliveryModes.includes(mode.id);
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => toggleDeliveryMode(mode.id)}
                        className={`p-3.5 rounded-xl border text-center text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-white/[0.08] border-white/40 text-white font-semibold shadow-xs'
                            : 'bg-[#16171B] border-[#26282D] text-neutral-300 hover:bg-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Geographic Reach & Scale */}
        {step === 3 && (
          <div>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#16171B] border border-[#26282D] font-mono text-xs text-neutral-300 font-semibold uppercase tracking-wider mb-3">
                {isAr ? 'الخطوة 3 · التغطية الجغرافية والحجم' : 'Step 3 · Geographic Reach & Scale'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white font-heading tracking-tight">
                {isAr ? 'أين تنفذون برامجكم التدريبية؟' : 'Where do you deliver corporate programs?'}
              </h1>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                {isAr
                  ? 'يستقبل بونت لوك طلبات تدريبية مستمرة من جهات وشركات كبرى في مدن الأعمال الخليجية.'
                  : 'PontLook receives corporate training requests across major business hubs in the GCC.'}
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-3">
                  {isAr ? 'الأسواق والمناطق المستهدفة' : 'Active Target GCC Markets'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {gccMarkets.map((mkt, mktIdx) => {
                    const isSelected = formData.markets.includes(mkt);
                    const flags = MARKET_FLAG_CODES[mktIdx] || [];
                    return (
                      <button
                        key={mkt}
                        type="button"
                        onClick={() => toggleMarket(mkt)}
                        className={`w-full text-start p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm transition-all ${
                          isSelected
                            ? 'bg-white/[0.08] border-white/40 text-white font-semibold shadow-xs'
                            : 'bg-[#16171B] border-[#26282D] text-neutral-300 hover:bg-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex items-center gap-1 shrink-0">
                            {flags.map((code) => (
                              <CountryFlag
                                key={code}
                                code={code}
                                className="w-5 h-3.5 rounded-sm shadow-sm border border-white/10"
                              />
                            ))}
                          </div>
                          <span className="truncate">{mkt}</span>
                        </div>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-all ${
                            isSelected
                              ? 'bg-white border-white text-black'
                              : 'border-[#26282D] bg-[#16171B]'
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-3">
                  {isAr ? 'الحجم النموذجي للمجموعات التدريبية' : 'Typical Cohort Engagement Scale'}
                </label>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {cohortOptions.map((opt) => {
                    const isSelected = formData.cohortScale === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, cohortScale: opt.value })}
                        className={`p-3.5 text-start rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'bg-white/[0.08] border-white/40 text-white font-semibold shadow-xs'
                            : 'bg-[#16171B] border-[#26282D] text-neutral-300 hover:bg-white/[0.04] hover:border-white/20'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  {isAr ? 'أبرز الاعتمادات أو العملاء السابقين' : 'Notable Accreditations or Past Clients'}
                </label>
                <textarea
                  rows={3}
                  value={formData.differentiators}
                  onChange={(e) => setFormData({ ...formData, differentiators: e.target.value })}
                  placeholder={
                    isAr
                      ? 'مثال: اعتمادات معهد PMI، هيئات تنظيمية محلية، أو تجارب سابقة مع كبرى الهيئات والشركات...'
                      : 'e.g. PMI, NEBOSH, HRCI accreditations, or notable enterprise and government track record...'
                  }
                  className="w-full bg-[#16171B] border border-[#26282D] focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 transition-all outline-none resize-none shadow-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact & Verification */}
        {step === 4 && (
          <div>
            <div className="mb-6 sm:mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#16171B] border border-[#26282D] font-mono text-xs text-neutral-300 font-semibold uppercase tracking-wider mb-3">
                {isAr ? 'الخطوة 4 · التواصل والتحقق' : 'Step 4 · Verification & Next Steps'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white font-heading tracking-tight">
                {isAr ? 'بيانات التواصل لاستقبال الفرص' : 'Where should we deliver qualified opportunities?'}
              </h1>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                {isAr
                  ? 'سيتواصل فريق الشراكات معكم لجدولة مكالمة التحقق ومطابقة أولى الفرص التدريبية المتاحة.'
                  : 'Our partnerships team will reach out directly to finalize accreditation verification and begin lead delivery.'}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  {isAr ? 'البريد الإلكتروني الرسمي للعمل' : 'Official Work Email'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    placeholder="partner@institution.com"
                    className="w-full bg-[#16171B] border border-[#26282D] focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all outline-none shadow-xs"
                  />
                  <Mail size={16} className="absolute end-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  {isAr ? 'رقم الهاتف المباشر أو الواتساب' : 'Direct Phone or WhatsApp with Country Code'}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+966 50 123 4567"
                    className="w-full bg-[#16171B] border border-[#26282D] focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-500 transition-all outline-none shadow-xs"
                  />
                  <Phone size={16} className="absolute end-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 font-medium mb-2">
                  {isAr ? 'كيف سمعتم عن بونت لوك؟' : 'How did you hear about PontLook?'}
                </label>
                <select
                  value={formData.referralSource}
                  onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                  className="w-full bg-[#16171B] border border-[#26282D] focus:border-white/40 focus:ring-1 focus:ring-white/20 rounded-xl px-4 py-3.5 text-sm text-white transition-all outline-none shadow-xs"
                >
                  {referralOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#16171B] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.agreementConfirmed}
                    onChange={(e) => setFormData({ ...formData, agreementConfirmed: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-[#26282D] bg-[#16171B] text-white focus:ring-white/20"
                  />
                  <span className="text-xs sm:text-sm text-neutral-400 group-hover:text-neutral-200 leading-relaxed select-none">
                    {isAr
                      ? 'أؤكد أن مؤسستنا تمتلك مدربين معتمدين وجاهزية فعلية لتنفيذ برامج التدريب المؤسسي للشركات.'
                      : 'I confirm that our organization has verified trainers and active capacity to deliver corporate training programs.'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mt-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Actions Bar */}
        <div className="mt-8 pt-6 border-t border-[#26282D] flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 py-3 px-5 rounded-xl bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white font-medium text-xs sm:text-sm border border-[#26282D] hover:border-white/20 shadow-xs transition-all"
            >
              <ArrowLeft size={16} className={isAr ? 'rotate-180' : ''} />
              <span>{isAr ? 'السابق' : 'Previous'}</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold text-xs sm:text-sm border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs active:scale-[0.98] transition-all"
            >
              <span>{isAr ? 'المتابعة' : 'Continue'}</span>
              <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] text-white font-semibold text-xs sm:text-sm border border-[#26282D] hover:border-white/30 backdrop-blur-md shadow-xs active:scale-[0.98] disabled:opacity-50 transition-all"
            >
              <span>
                {isSubmitting
                  ? isAr
                    ? 'جارٍ التقديم...'
                    : 'Submitting...'
                  : isAr
                    ? 'إرسال طلب الانضمام للشراكة'
                    : 'Submit Partner Application'}
              </span>
              <ArrowRight size={16} className={isAr ? 'rotate-180' : ''} />
            </button>
          )}
        </div>
      </div>

      {/* Trust Micro-Badges at the bottom */}
      <div className="mt-8 grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-[#0F1013] border border-[#26282D] rounded-xl shadow-xs">
          <div className="text-xs font-mono text-neutral-400 font-medium">
            {isAr ? '0$ رسوم اشتراك' : 'Zero Retainers'}
          </div>
        </div>
        <div className="p-3 bg-[#0F1013] border border-[#26282D] rounded-xl shadow-xs">
          <div className="text-xs font-mono text-neutral-400 font-medium">
            {isAr ? 'شركات موثقة فقط' : 'Vetted Enterprise Buyers'}
          </div>
        </div>
        <div className="p-3 bg-[#0F1013] border border-[#26282D] rounded-xl shadow-xs">
          <div className="text-xs font-mono text-neutral-400 font-medium">
            {isAr ? 'رد خلال يومي عمل' : '2 Day Response SLA'}
          </div>
        </div>
      </div>
    </div>
  );
}
