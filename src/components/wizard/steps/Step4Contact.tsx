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
  ChevronDown,
} from 'lucide-react';
import {
  GCC_COUNTRIES,
  step4ContactSchema,
  type Step4Data,
  type WizardData,
} from '../schemas';
import { FormTextField, PhoneInputWithCountry, StepNavigation } from '../fields';
import OrbBadge from '@/components/shared/OrbBadge';
import CountryFlag from '@/components/shared/CountryFlag';

type Step4Props = {
  data: WizardData;
  onNext: (values: Step4Data, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => void;
  onBack: (e?: React.MouseEvent) => void;
  isSubmitting?: boolean;
};

export default function Step4Contact({ data, onNext, onBack, isSubmitting }: Step4Props) {
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
  const currentCountry = GCC_COUNTRIES.find((c) => c.name === selectedCountry) || GCC_COUNTRIES[0];

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
        handleSubmit((vals) => onNext(vals, e))(e);
      }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <OrbBadge state="connecting" size={20} />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Final Step // Enterprise Verification
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">
          Where should verified providers send their proposals?
        </h3>
        <p className="text-sm text-neutral-400 font-sans">
          All inquiries are verified by PontLook. Direct executive access only, zero automated vendor solicitations.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormTextField
          label="Full Name"
          placeholder="e.g. Sarah Al Rashid"
          autoComplete="name"
          icon={<User size={18} />}
          registration={register('fullName')}
          error={errors.fullName}
        />

        <FormTextField
          label="Official Job Title"
          placeholder="e.g. VP of Human Capital / L&D Director"
          autoComplete="organization-title"
          icon={<Briefcase size={18} />}
          registration={register('jobTitle')}
          error={errors.jobTitle}
          optional
        />

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

        <FormTextField
          label="Organization / Company Name"
          placeholder="e.g. Saudi Aramco, FAB Bank, STC"
          autoComplete="organization"
          icon={<Building2 size={18} />}
          registration={register('organizationName')}
          error={errors.organizationName}
          optional
        />

        <div className="w-full">
          <label htmlFor="country" className="mb-2 block text-sm font-semibold text-neutral-300">
            Primary Country of Operation
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
              <CountryFlag code={currentCountry.code} className="w-5 h-3.5 rounded-sm shadow-sm border border-white/10" />
            </div>
            <select
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="w-full appearance-none rounded-xl border border-[#26282D] bg-[#16171B] px-4 py-3.5 ps-11 pe-9 text-base sm:text-sm font-medium text-white shadow-sm transition-all focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
            >
              {GCC_COUNTRIES.map((c) => (
                <option key={c.code} value={c.name} className="bg-[#16171B] text-white">
                  {c.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-500">
              <ChevronDown size={15} />
            </div>
          </div>
          {errors.country && (
            <p className="mt-1.5 text-xs font-medium text-red-600" role="alert">
              {errors.country.message}
            </p>
          )}
        </div>

        <PhoneInputWithCountry
          label="Direct Phone / WhatsApp"
          codeRegistration={register('phoneCountryCode')}
          phoneRegistration={register('phoneNumber')}
          codeError={errors.phoneCountryCode}
          phoneError={errors.phoneNumber}
          hint="For proposal dispatch notifications & verification"
          selectedDialCode={watch('phoneCountryCode')}
        />
      </div>

      <input type="text" {...register('_gotcha')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="rounded-2xl border border-[#26282D] bg-[#16171B] p-4 sm:p-5">
        <div className="flex items-start gap-3.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F1013] border border-[#26282D] text-emerald-400 shadow-sm">
            <Lock size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Enterprise Confidentiality Guarantee
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-400">
              Your request is private and shared with a <strong>maximum of 3 matched providers</strong> who fit your exact domain and procurement specifications. Zero vendor spam or unsolicited cold calls.
            </p>
          </div>
        </div>
      </div>

      <StepNavigation
        onBack={onBack}
        nextLabel="Get 3 Curated Provider Proposals"
        isFinalStep={true}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
