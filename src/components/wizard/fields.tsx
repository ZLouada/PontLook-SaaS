'use client';

import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type BaseProps = {
  label: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
};

export function TextField({
  label, error, registration, type = 'text', placeholder,
}: BaseProps & { type?: string; placeholder?: string }) {
  const id = registration.name;
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="field-input"
        aria-invalid={!!error}
        {...registration}
      />
      {error && <p className="field-error" role="alert">{error.message}</p>}
    </div>
  );
}

export function SelectField({
  label, error, registration, options,
}: BaseProps & { options: readonly string[] }) {
  const id = registration.name;
  return (
    <div>
      <label htmlFor={id} className="field-label">{label}</label>
      <select id={id} className="field-input" aria-invalid={!!error} {...registration}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p className="field-error" role="alert">{error.message}</p>}
    </div>
  );
}

export function TextArea({
  label, error, registration, placeholder, rows = 4, optional,
}: BaseProps & { placeholder?: string; rows?: number; optional?: boolean }) {
  const id = registration.name;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-slate-400">(optional)</span>}
      </label>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        className="field-input"
        aria-invalid={!!error}
        {...registration}
      />
      {error && <p className="field-error" role="alert">{error.message}</p>}
    </div>
  );
}

export function StepNav({
  onBack, isSubmitting, nextLabel = 'Continue',
}: { onBack?: () => void; isSubmitting?: boolean; nextLabel?: string }) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {onBack ? (
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
      ) : (
        <span />
      )}
      <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
        {isSubmitting ? 'Saving…' : nextLabel}
      </button>
    </div>
  );
}
