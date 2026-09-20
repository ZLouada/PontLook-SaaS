'use client';

import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { ChevronRight, ArrowLeft, ArrowRight, Loader2, Lock } from 'lucide-react';
import { GCC_COUNTRIES } from './schemas';
import CountryFlag from '@/components/shared/CountryFlag';

type BaseProps = {
  label: string;
  error?: FieldError;
  optional?: boolean;
  hint?: string;
  id?: string;
};

export function FormTextField({
  label,
  error,
  registration,
  type = 'text',
  placeholder,
  optional,
  hint,
  autoComplete,
  icon,
}: BaseProps & {
  registration: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  icon?: React.ReactNode;
}) {
  const id = registration.name;
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-neutral-300">
          {label}
        </label>
        {optional && (
          <span className="text-xs font-normal text-neutral-500">
            Optional
          </span>
        )}
      </div>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-neutral-500">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`w-full rounded-xl border bg-[#16171B] px-4 py-3.5 text-base sm:text-sm text-white shadow-sm transition-all placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/20 ${
            icon ? 'ps-11' : ''
          } ${
            hasError
              ? 'border-red-500 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-400'
              : 'border-[#26282D] hover:border-white/20 focus:border-white/40 focus:ring-white/20'
          }`}
          {...registration}
        />
      </div>

      {hint && !hasError && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-neutral-500">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600" role="alert">
          <span>{error?.message}</span>
        </p>
      )}
    </div>
  );
}

export function FormSelectField({
  label,
  error,
  registration,
  options,
  placeholder = 'Select an option...',
  optional,
  hint,
}: BaseProps & {
  registration: UseFormRegisterReturn;
  options: readonly { value: string; label: string }[] | readonly string[];
  placeholder?: string;
}) {
  const id = registration.name;
  const hasError = Boolean(error);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-neutral-300">
          {label}
        </label>
        {optional && (
          <span className="text-xs font-normal text-neutral-500">
            Optional
          </span>
        )}
      </div>

      <div className="relative">
        <select
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`w-full appearance-none rounded-xl border bg-[#16171B] px-4 py-3.5 pe-10 text-base sm:text-sm text-white shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-white/20 ${
            hasError
              ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-400'
              : 'border-[#26282D] hover:border-white/20 focus:border-white/40 focus:ring-white/20'
          }`}
          {...registration}
        >
          <option value="" className="bg-[#16171B] text-white">{placeholder}</option>
          {options.map((opt) => {
            const isObj = typeof opt === 'object';
            const val = isObj ? opt.value : opt;
            const text = isObj ? opt.label : opt;
            return (
              <option key={val} value={val} className="bg-[#16171B] text-white">
                {text}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-500">
          <ChevronRight size={18} className="rotate-90" />
        </div>
      </div>

      {hint && !hasError && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-neutral-500">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error?.message}
        </p>
      )}
    </div>
  );
}

export function PhoneInputWithCountry({
  label,
  phoneRegistration,
  codeRegistration,
  phoneError,
  codeError,
  hint,
  selectedDialCode,
}: {
  label: string;
  phoneRegistration: UseFormRegisterReturn;
  codeRegistration: UseFormRegisterReturn;
  phoneError?: FieldError;
  codeError?: FieldError;
  hint?: string;
  selectedDialCode?: string;
}) {
  const phoneId = phoneRegistration.name;
  const hasError = Boolean(phoneError || codeError);
  const activeCountry = GCC_COUNTRIES.find((c) => c.dialCode === selectedDialCode) || GCC_COUNTRIES[0];

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={phoneId} className="text-sm font-semibold text-neutral-300">
          {label}
        </label>
        <span className="text-xs font-medium text-neutral-500">Direct verification line</span>
      </div>

      <div className="flex gap-2">
        <div className="relative w-[130px] sm:w-[155px] shrink-0">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <CountryFlag code={activeCountry.code} className="w-5 h-3.5 rounded-sm shadow-sm border border-white/10" />
          </div>
          <select
            id={codeRegistration.name}
            className="w-full appearance-none rounded-xl border border-[#26282D] bg-[#16171B] ps-10 pe-6 py-3.5 text-base sm:text-sm font-medium text-white shadow-sm transition-all hover:border-white/20 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
            {...codeRegistration}
          >
            {GCC_COUNTRIES.map((c) => (
              <option key={c.code} value={c.dialCode} className="bg-[#16171B] text-white">
                {c.dialCode} ({c.name})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2 text-neutral-500">
            <ChevronRight size={14} className="rotate-90" />
          </div>
        </div>

        <div className="relative flex-1 min-w-0">
          <input
            id={phoneId}
            type="tel"
            placeholder="50 123 4567"
            aria-invalid={hasError}
            aria-describedby={hasError ? `${phoneId}-error` : hint ? `${phoneId}-hint` : undefined}
            className={`w-full rounded-xl border bg-[#16171B] px-4 py-3.5 text-base sm:text-sm text-white shadow-sm transition-all placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/20 ${
              hasError
                ? 'border-red-500 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-400'
                : 'border-[#26282D] hover:border-white/20 focus:border-white/40 focus:ring-white/20'
            }`}
            {...phoneRegistration}
          />
        </div>
      </div>

      {hint && !hasError && (
        <p id={`${phoneId}-hint`} className="mt-1.5 text-xs text-neutral-500">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={`${phoneId}-error`} className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {phoneError?.message || codeError?.message}
        </p>
      )}
    </div>
  );
}

export function StepNavigation({
  onBack,
  isSubmitting,
  nextLabel = 'Continue',
  isFinalStep = false,
  trustMessage,
}: {
  onBack?: (e?: React.MouseEvent) => void;
  isSubmitting?: boolean;
  nextLabel?: string;
  isFinalStep?: boolean;
  trustMessage?: string;
}) {
  return (
    <div className="mt-8 sm:mt-10 border-t border-[#26282D] pt-4 sm:pt-6">
      {trustMessage && (
        <div className="mb-3 sm:mb-4 flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-400">
          <Lock size={13} className="text-emerald-600 shrink-0" />
          <span className="text-center">{trustMessage}</span>
        </div>
      )}

      {/* Sticky action bar on mobile, standard layout on desktop */}
      <div className="sticky bottom-0 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 sm:py-0 bg-[#08090A]/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t border-[#26282D] sm:border-t-0 shadow-[0_-4px_12px_rgba(0,0,0,0.3)] sm:shadow-none pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-0 z-20">
        <div className="flex flex-col-reverse items-center justify-between gap-2.5 sm:gap-3 sm:flex-row">
          {onBack ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBack(e);
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#26282D] bg-transparent hover:bg-white/[0.05] px-5 py-3 text-sm font-semibold text-neutral-300 hover:text-white shadow-xs transition-all active:scale-[0.98] sm:w-auto min-h-[44px] touch-manipulation"
            >
              <ArrowLeft size={16} className="rtl:rotate-180 shrink-0" />
              <span>Back</span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 sm:py-4 text-base sm:text-sm font-semibold shadow-xs transition-all hover:shadow active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:w-auto min-h-[48px] touch-manipulation ${
              isFinalStep
                ? 'bg-white/[0.05] hover:bg-white/[0.10] text-emerald-400 border border-[#26282D] hover:border-emerald-400/40 backdrop-blur-md'
                : 'bg-white/[0.05] hover:bg-white/[0.10] text-white border border-[#26282D] hover:border-white/30 backdrop-blur-md'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin shrink-0" />
                <span>Verifying & Submitting...</span>
              </>
            ) : (
              <>
                <span>{nextLabel}</span>
                <ArrowRight size={16} className="rtl:rotate-180 shrink-0" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
