'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Briefcase,
  Mail,
  Building2,
  Globe,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import {
  GCC_COUNTRIES,
  step4ContactSchema,
  type Step4Data,
  type WizardData,
} from '../schemas';
import { FormTextField, PhoneInputWithCountry, StepNavigation } from '../fields';

type Step4Props = {
  data: WizardData;
  onNext: (values: Step4Data, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => void;
  onBack: (e?: React.MouseEvent) => void;
  isSubmitting?: boolean;
};

export default function Step4Contact({ data, onNext, onBack, isSubmitting }: Step4Props) {
  // Infer initial country code from country or existing phone
  const initialCountry = data.country || 'Saudi Arabia';
  const matchedCountry = GCC_COUNTRIES.find((c) => c.name === initialCountry);
  const initialPhoneCode = data.phoneCountryCode || matchedCountry?.dialCode || '+966';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4ContactSchema),
    defaultValues: {
      fullName: data.fullName || '',
      jobTitle: data.jobTitle || '',
      workEmail: data.workEmail || data.email || '',
      organizationName: data.organizationName || data.companyName || '',
      country: initialCountry,
      phoneCountryCode: initialPhoneCode,
      phoneNumber: data.phoneNumber || data.phone || '',
      _gotcha: '',
    },
  });

  const selectedCountry = watch('country');

  // Sync country code dropdown when country selector changes
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = e.target.value;
    setValue('country', countryName, { shouldValidate: true });
    const match = GCC_COUNTRIES.find((c) => c.name === countryName);
    if (match && match.dialCode !== '+') {
      setValue('phoneCountryCode', match.dialCode);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit(
          (values) => onNext(values, e),
          (validationErrors) => {
            console.warn('Step 4 validation errors:', validationErrors);
            const firstKey = Object.keys(validationErrors)[0];
            if (firstKey) {
              const el = document.querySelector(`[name="${firstKey}"]`) as HTMLElement;
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.focus();
              }
            }
          }
        )(e);
      }}
      noValidate
      className="space-y-6"
    >
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={22} className="text-emerald-600" />
          <h2 className="font-heading text-xl font-semibold tracking-normal text-slate-800 sm:text-2xl">
            Enterprise Verification & Contact Details
          </h2>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          We only release curated proposals to verified corporate decision-makers.
        </p>
      </div>

      {/* Grid of contact inputs */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <FormTextField
          label="Full Name"
          placeholder="e.g. Sarah Al-Rashid"
          autoComplete="name"
          icon={<User size={18} />}
          registration={register('fullName')}
          error={errors.fullName}
        />

        {/* Official Job Title */}
        <FormTextField
          label="Official Job Title"
          placeholder="e.g. VP of Human Capital / L&D Director"
          autoComplete="organization-title"
          icon={<Briefcase size={18} />}
          registration={register('jobTitle')}
          error={errors.jobTitle}
          optional
        />

        {/* Corporate Work Email */}
        <FormTextField
          label="Corporate Work Email"
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          hint="Your official email address for receiving proposals"
          icon={<Mail size={18} />}
          registration={register('workEmail')}
          error={errors.workEmail}
        />

        {/* Organization Name */}
        <FormTextField
          label="Organization / Company Name"
          placeholder="e.g. Saudi Aramco, FAB Bank, STC"
          autoComplete="organization"
          icon={<Building2 size={18} />}
          registration={register('organizationName')}
          error={errors.organizationName}
          optional
        />

        {/* Primary Country */}
        <div className="w-full">
          <label htmlFor="country" className="mb-2 block text-sm font-semibold text-slate-800">
            Primary Country of Operation
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-slate-400">
              <Globe size={18} />
            </div>
            <select
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 ps-11 text-base sm:text-sm font-medium text-slate-800 shadow-sm transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {GCC_COUNTRIES.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>
          {errors.country && (
            <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* GCC Direct Phone Number with Dial Code */}
        <PhoneInputWithCountry
          label="Direct Phone / WhatsApp"
          codeRegistration={register('phoneCountryCode')}
          phoneRegistration={register('phoneNumber')}
          codeError={errors.phoneCountryCode}
          phoneError={errors.phoneNumber}
          hint="For proposal dispatch notifications & verification"
        />
      </div>

      {/* Hidden honeypot field for bot protection */}
      <input type="text" {...register('_gotcha')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {/* Enterprise Confidentiality Guarantee Banner */}
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50/90 via-teal-50/60 to-emerald-50/40 p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Lock size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-950">
              Enterprise Confidentiality Guarantee
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-emerald-900/80">
              🔒 Your request is private and shared with a <strong>maximum of 3 matched providers</strong> who fit your exact domain and procurement specifications. Zero vendor spam or unsolicited cold calls.
            </p>
          </div>
        </div>
      </div>

      {/* Action Navigation */}
      <StepNavigation
        onBack={onBack}
        nextLabel="Get 3 Curated Provider Proposals"
        isFinalStep={true}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
