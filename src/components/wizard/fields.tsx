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
        <label htmlFor={id} className="text-sm font-semibold text-white">
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
          className={`w-full rounded-xl border bg-slate-800/80 px-4 py-3.5 text-base sm:text-sm text-white shadow-sm transition-all placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            icon ? 'ps-11' : ''
          } ${
            hasError
              ? 'border-red-500 bg-red-950/30 text-red-200 focus:border-red-500 focus:ring-red-400'
              : 'border-white/10 hover:border-white/20 focus:border-blue-500 focus:ring-blue-500'
          }`}
          {...registration}
        />
      </div>

      {hint && !hasError && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-400">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400" role="alert">
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
        <label htmlFor={id} className="text-sm font-semibold text-white">
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
          className={`w-full appearance-none rounded-xl border bg-slate-800/80 px-4 py-3.5 pe-10 text-base sm:text-sm text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            hasError
              ? 'border-red-500 bg-red-950/30 text-red-200 focus:border-red-500 focus:ring-red-400'
              : 'border-white/10 hover:border-white/20 focus:border-blue-500 focus:ring-blue-500'
          }`}
          {...registration}
        >
          <option value="" className="bg-slate-900 text-white">{placeholder}</option>
          {options.map((opt) => {
            const isObj = typeof opt === 'object';
            const val = isObj ? opt.value : opt;
            const text = isObj ? opt.label : opt;
            return (
              <option key={val} value={val} className="bg-slate-900 text-white">
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
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-400">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-400" role="alert">
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
        <label htmlFor={phoneId} className="text-sm font-semibold text-white">
          {label}
        </label>
        <span className="text-xs font-medium text-slate-400">Direct GCC verification line</span>
      </div>

      <div className="flex gap-2">
        <div className="relative w-[115px] sm:w-[145px] shrink-0">
          <select
            id={codeRegistration.name}
            className="w-full appearance-none rounded-xl border border-white/10 bg-slate-800/80 px-3 py-3.5 pe-7 text-base sm:text-sm font-medium text-white shadow-sm transition-all hover:border-white/20 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...codeRegistration}
          >
            {GCC_COUNTRIES.map((c) => (
              <option key={c.code} value={c.dialCode} className="bg-slate-900 text-white">
                {c.flag} {c.dialCode} ({c.code})
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2 text-slate-400">
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
            className={`w-full rounded-xl border bg-slate-800/80 px-4 py-3.5 text-base sm:text-sm text-white shadow-sm transition-all placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              hasError
                ? 'border-red-500 bg-red-950/30 text-red-200 focus:border-red-500 focus:ring-red-400'
                : 'border-white/10 hover:border-white/20 focus:border-blue-500 focus:ring-blue-500'
            }`}
            {...phoneRegistration}
          />
        </div>
      </div>

      {hint && !hasError && (
        <p id={`${phoneId}-hint`} className="mt-1.5 text-xs text-slate-400">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={`${phoneId}-error`} className="mt-1.5 text-xs font-medium text-red-400" role="alert">
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
    <div className="mt-8 sm:mt-10 border-t border-white/10 pt-4 sm:pt-6">
      {trustMessage && (
        <div className="mb-3 sm:mb-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400">
          <Lock size={13} className="text-emerald-400 shrink-0" />
          <span className="text-center">{trustMessage}</span>
        </div>
      )}

      {/* Sticky action bar on mobile, standard layout on desktop */}
      <div className="sticky bottom-0 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 sm:py-0 bg-slate-900/95 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-t border-white/10 sm:border-t-0 shadow-2xl sm:shadow-none pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-0 z-20">
        <div className="flex flex-col-reverse items-center justify-between gap-2.5 sm:gap-3 sm:flex-row">
          {onBack ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBack(e);
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 px-5 py-3 text-sm font-semibold text-slate-300 shadow-xs transition-all hover:bg-slate-700 hover:text-white active:scale-[0.98] sm:w-auto min-h-[44px] touch-manipulation"
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
            className={`inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 sm:py-4 text-base sm:text-sm font-semibold shadow-xl transition-all hover:shadow active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:w-auto min-h-[48px] touch-manipulation ${
              isFinalStep
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600'
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
