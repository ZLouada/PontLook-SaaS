'use client';

import React from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { ChevronRight, ArrowLeft, ArrowRight, Loader2, Lock } from 'lucide-react';
import { GCC_COUNTRIES } from './schemas';

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
        <label htmlFor={id} className="text-sm font-semibold text-slate-800">
          {label}
        </label>
        {optional && (
          <span className="text-xs font-normal text-slate-400">
            Optional
          </span>
        )}
      </div>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-slate-400">
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
          className={`w-full rounded-xl border bg-white px-4 py-3.5 text-base sm:text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            icon ? 'ps-11' : ''
          } ${
            hasError
              ? 'border-red-500 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-400'
              : 'border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-blue-600'
          }`}
          {...registration}
        />
      </div>

      {hint && !hasError && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
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
        <label htmlFor={id} className="text-sm font-semibold text-slate-800">
          {label}
        </label>
        {optional && (
          <span className="text-xs font-normal text-slate-400">
            Optional
          </span>
        )}
      </div>

      <div className="relative">
        <select
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`w-full appearance-none rounded-xl border bg-white px-4 py-3.5 pe-10 text-base sm:text-sm text-slate-900 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            hasError
              ? 'border-red-500 bg-red-50/20 focus:border-red-500 focus:ring-red-400'
              : 'border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-blue-600'
          }`}
          {...registration}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => {
            const isObj = typeof opt === 'object';
            const val = isObj ? opt.value : opt;
            const text = isObj ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400">
          <ChevronRight size={18} className="rotate-90" />
        </div>
      </div>

      {hint && !hasError && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">
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
}: {
  label: string;
  phoneRegistration: UseFormRegisterReturn;
  codeRegistration: UseFormRegisterReturn;
  phoneError?: FieldError;
  codeError?: FieldError;
  hint?: string;
}) {
  const phoneId = phoneRegistration.name;
  const hasError = Boolean(phoneError || codeError);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={phoneId} className="text-sm font-semibold text-slate-800">
          {label}
        </label>
        <span className="text-xs font-medium text-slate-400">Direct GCC verification line</span>
      </div>

      <div className="flex gap-2">
        {/* Country Dial Code Dropdown */}
        <div className="relative w-[115px] sm:w-[145px] shrink-0">
          <select
            id={codeRegistration.name}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3.5 pe-7 text-base sm:text-sm font-medium text-slate-900 shadow-sm transition-all hover:border-slate-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...codeRegistration}
          >
            {GCC_COUNTRIES.map((c) => (
              <option key={c.code} value={c.dialCode}>
                {c.flag} {c.dialCode} ({c.code})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2 text-slate-400">
            <ChevronRight size={14} className="rotate-90" />
          </div>
        </div>

        {/* Local Phone Number Input */}
        <div className="relative flex-1 min-w-0">
          <input
            id={phoneId}
            type="tel"
            placeholder="50 123 4567"
            aria-invalid={hasError}
            aria-describedby={hasError ? `${phoneId}-error` : hint ? `${phoneId}-hint` : undefined}
            className={`w-full rounded-xl border bg-white px-4 py-3.5 text-base sm:text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              hasError
                ? 'border-red-500 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-400'
                : 'border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-blue-600'
            }`}
            {...phoneRegistration}
          />
        </div>
      </div>

      {hint && !hasError && (
        <p id={`${phoneId}-hint`} className="mt-1.5 text-xs text-slate-500">
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
    <div className="mt-8 sm:mt-10 border-t border-slate-100 pt-6">
      {trustMessage && (
        <div className="mb-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500">
          <Lock size={13} className="text-emerald-600" />
          <span>{trustMessage}</span>
        </div>
      )}

      <div className="flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
        {onBack ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBack(e);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] sm:w-auto"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            <span>Back</span>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base sm:text-sm font-bold shadow-md transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:w-auto ${
            isFinalStep
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-900/20 hover:from-emerald-500 hover:to-teal-500 hover:shadow-lg'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-900/20 hover:from-blue-500 hover:to-blue-600 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Verifying & Submitting...</span>
            </>
          ) : (
            <>
              <span>{nextLabel}</span>
              <ArrowRight size={16} className="rtl:rotate-180" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
