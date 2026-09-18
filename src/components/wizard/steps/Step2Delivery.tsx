'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MapPin,
  Video,
  Layers,
  Globe,
  Sparkles,
  BookOpen,
  Check,
} from 'lucide-react';
import {
  DELIVERY_MODES,
  DELIVERY_LANGUAGES,
  CUSTOMIZATION_OPTIONS,
  GCC_CITIES,
  step2DeliverySchema,
  type Step2Data,
  type WizardData,
} from '../schemas';
import { StepNavigation } from '../fields';

const modeIcons = {
  in_person: MapPin,
  virtual: Video,
  hybrid: Layers,
};

type Step2Props = {
  data: WizardData;
  onNext: (values: Step2Data, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => void;
  onBack: (e?: React.MouseEvent) => void;
  isSubmitting?: boolean;
};

export default function Step2Delivery({ data, onNext, onBack, isSubmitting }: Step2Props) {
  const initialMode =
    data.deliveryMode ||
    (data.deliveryFormat?.toLowerCase().includes('in person') || data.deliveryFormat?.toLowerCase().includes('in-person')
      ? 'in_person'
      : data.deliveryFormat?.toLowerCase().includes('virtual')
      ? 'virtual'
      : data.deliveryFormat?.toLowerCase().includes('hybrid')
      ? 'hybrid'
      : 'in_person');

  const initialLanguage =
    data.language === 'arabic' || data.language === 'english' || data.language === 'bilingual'
      ? data.language
      : 'bilingual';

  const initialCustomization = data.customization || 'tailored';

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2DeliverySchema),
    defaultValues: {
      deliveryMode: initialMode,
      city: data.city || 'Riyadh',
      language: initialLanguage,
      customization: initialCustomization,
    },
  });

  const selectedMode = watch('deliveryMode');
  const selectedCity = watch('city');
  const selectedLanguage = watch('language');
  const selectedCustomization = watch('customization');

  const requiresLocation = selectedMode === 'in_person' || selectedMode === 'hybrid';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit((values) => onNext(values, e))(e);
      }}
      noValidate
      className="space-y-8"
    >
      <section className="space-y-3">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-normal text-white sm:text-2xl">
            How should the training be delivered?
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Choose the instructional format that best fits your workforce location and logistics.
          </p>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-3">
          {DELIVERY_MODES.map((mode) => {
            const isSelected = selectedMode === mode.id;
            const Icon = modeIcons[mode.id];

            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setValue('deliveryMode', mode.id as any, { shouldValidate: true })}
                aria-pressed={isSelected}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 text-start transition-all duration-200 active:scale-[0.98] touch-manipulation focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                  isSelected
                    ? 'border border-white/40 bg-white/[0.04] shadow-md ring-1 ring-white/20'
                    : 'border border-[#26282D] bg-[#0F1013] hover:border-white/20 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-white text-black'
                          : 'bg-[#16171B] text-neutral-400 border border-[#26282D]'
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-white bg-white text-black'
                          : 'border-[#26282D] bg-[#16171B]'
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>

                  <h3 className="font-heading mt-3.5 text-base font-semibold text-white">
                    {mode.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                    {mode.description}
                  </p>
                </div>

                <div className="mt-4">
                  <span
                    className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-[#16171B] text-neutral-400 border border-[#26282D]'
                    }`}
                  >
                    {mode.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {errors.deliveryMode && (
          <p className="text-xs font-medium text-red-600" role="alert">
            {errors.deliveryMode.message}
          </p>
        )}
      </section>

      {requiresLocation && (
        <section className="rounded-2xl border border-[#26282D] bg-[#16171B] p-4 sm:p-5">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-white" />
            <h3 className="font-heading text-sm font-semibold text-white">
              Primary Location for In Person Sessions
            </h3>
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            Select your host city so we only match providers with accredited trainers and logistics in your hub.
          </p>

          <div className="mt-3.5 flex flex-wrap gap-2">
            {GCC_CITIES.map((city) => {
              const isSelected = selectedCity === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => setValue('city', city, { shouldValidate: true })}
                  className={`rounded-xl px-4 py-2.5 min-h-[44px] inline-flex items-center justify-center text-xs sm:text-sm font-medium transition-all active:scale-95 touch-manipulation ${
                    isSelected
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'border border-[#26282D] bg-[#0F1013] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]'
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
          {errors.city && (
            <p className="mt-2 text-xs font-medium text-red-600" role="alert">
              {errors.city.message}
            </p>
          )}
        </section>
      )}

      <section className="space-y-3">
        <div>
          <h3 className="font-heading text-base font-semibold text-white">
            Instruction Language
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">
            Ensure instructors can facilitate natively and provide localized course materials.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {DELIVERY_LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setValue('language', lang.id as any, { shouldValidate: true })}
                className={`flex min-h-[52px] items-center justify-between rounded-xl border p-4 text-start transition-all active:scale-[0.98] touch-manipulation ${
                  isSelected
                    ? 'border border-white/40 bg-white/[0.04] shadow-sm ring-1 ring-white/20'
                    : 'border border-[#26282D] bg-[#0F1013] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold text-white">
                    {lang.label}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    {lang.sublabel}
                  </div>
                </div>
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-white bg-white text-black'
                      : 'border-[#26282D] bg-[#16171B]'
                  }`}
                >
                  {isSelected && <Check size={10} strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
        {errors.language && (
          <p className="text-xs font-medium text-red-600" role="alert">
            {errors.language.message}
          </p>
        )}
      </section>

      <section className="space-y-3">
        <div>
          <h3 className="font-heading text-base font-semibold text-white">
            Program Customization Level
          </h3>
          <p className="mt-0.5 text-xs text-neutral-400">
            Do you require tailored curriculum adapted to your internal organizational case studies?
          </p>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          {CUSTOMIZATION_OPTIONS.map((opt) => {
            const isSelected = selectedCustomization === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setValue('customization', opt.id as any, { shouldValidate: true })}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 text-start transition-all active:scale-[0.98] touch-manipulation ${
                  isSelected
                    ? 'border border-white/40 bg-white/[0.04] shadow-sm ring-1 ring-white/20'
                    : 'border border-[#26282D] bg-[#0F1013] hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {opt.recommended ? (
                        <Sparkles size={16} className="text-white" />
                      ) : (
                        <BookOpen size={16} className="text-neutral-500" />
                      )}
                      <span className="text-sm font-semibold text-white">
                        {opt.title}
                      </span>
                    </span>

                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                        isSelected
                          ? 'border-white bg-white text-black'
                          : 'border-[#26282D] bg-[#16171B]'
                      }`}
                    >
                      {isSelected && <Check size={10} strokeWidth={3} />}
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                    {opt.description}
                  </p>
                </div>

                {opt.recommended && (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#16171B] border border-[#26282D] px-2.5 py-0.5 text-[10px] font-bold text-neutral-300">
                      ★ Recommended for Enterprise Organizations
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {errors.customization && (
          <p className="text-xs font-medium text-red-600" role="alert">
            {errors.customization.message}
          </p>
        )}
      </section>

      <StepNavigation
        onBack={onBack}
        nextLabel="Continue to Cohort & Budget"
        isSubmitting={isSubmitting}
        trustMessage="Zero spam guarantee · 3 curated matches maximum"
      />
    </form>
  );
}
