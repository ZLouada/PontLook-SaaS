'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Send } from 'lucide-react';

const specialties = [
  'Leadership Development', 'Sales Performance', 'AI & Digital Skills', 'Compliance',
  'Soft Skills & Communication', 'Customer Service', 'Safety Training', 'Executive Coaching',
] as const;

const schema = z.object({
  companyName: z.string().trim().min(2, 'Company name is required').max(150, 'Company name is too long'),
  contactName: z.string().trim().min(2, 'Your name is required').max(100, 'Name is too long'),
  email: z.string().trim().max(254, 'Email is too long').email('Enter a valid business email'),
  phone: z.string().trim().min(7, 'Enter a valid phone number').max(30, 'Phone number is too long'),
  website: z
    .string()
    .trim()
    .min(4, 'Website is required')
    .max(500, 'URL is too long')
    .refine((v) => /^(https?:\/\/)?[\w-]+(\.[\w-]+)+/.test(v), 'Enter a valid website'),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  yearsInBusiness: z.string().min(1, 'Required'),
  markets: z.string().trim().min(2, 'Tell us which GCC markets you serve').max(500, 'Response is too long'),
  message: z.string().trim().min(20, 'Give us at least a couple of sentences (20+ characters)').max(5000, 'Message is too long'),
});

type FormValues = z.infer<typeof schema>;

export default function PartnershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { specialties: [] },
  });

  const selected = watch('specialties');

  const toggle = (s: string) => {
    const next = selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s];
    setValue('specialties', next, { shouldValidate: true });
  };

  const onSubmit = async (_data: FormValues) => {
    // Submission endpoint to be wired to CRM in a later phase.
    // NOTE: PII intentionally NOT stored in localStorage for security.
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card text-center !p-12">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
        <h3 className="mt-5 text-2xl">Application received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed">
          Thank you, our partnerships team will review your profile and reach out within 2 business
          days to schedule your qualification call. Next steps: qualification call → partnership
          agreement → onboarding → first opportunities.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card !p-8 sm:!p-10" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="companyName" className="field-label">Company name</label>
          <input id="companyName" className="field-input" placeholder="Acme Training Group" {...register('companyName')} />
          {errors.companyName && <p className="field-error" role="alert">{errors.companyName.message}</p>}
        </div>
        <div>
          <label htmlFor="website" className="field-label">Website</label>
          <input id="website" className="field-input" placeholder="https://…" {...register('website')} />
          {errors.website && <p className="field-error" role="alert">{errors.website.message}</p>}
        </div>
        <div>
          <label htmlFor="contactName" className="field-label">Your name</label>
          <input id="contactName" className="field-input" placeholder="Full name" {...register('contactName')} />
          {errors.contactName && <p className="field-error" role="alert">{errors.contactName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="field-label">Business email</label>
          <input id="email" type="email" className="field-input" placeholder="you@company.com" {...register('email')} />
          {errors.email && <p className="field-error" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="field-label">Phone</label>
          <input id="phone" type="tel" className="field-input" placeholder="+966 …" {...register('phone')} />
          {errors.phone && <p className="field-error" role="alert">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="yearsInBusiness" className="field-label">Years in business</label>
          <select id="yearsInBusiness" className="field-input" {...register('yearsInBusiness')}>
            <option value="">Select…</option>
            <option value="<2">Less than 2</option>
            <option value="2-5">2–5</option>
            <option value="5-10">5–10</option>
            <option value="10+">10+</option>
          </select>
          {errors.yearsInBusiness && <p className="field-error" role="alert">{errors.yearsInBusiness.message}</p>}
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="field-label">Training specialties</legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {specialties.map((s) => {
            const active = selected.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggle(s)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-primary bg-primary text-white'
                    : 'border-slate-200 bg-white text-body hover:border-primary-300'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {errors.specialties && <p className="field-error" role="alert">{errors.specialties.message}</p>}
      </fieldset>

      <div className="mt-6">
        <label htmlFor="markets" className="field-label">GCC markets you serve</label>
        <input id="markets" className="field-input" placeholder="e.g., Saudi Arabia, UAE, Qatar" {...register('markets')} />
        {errors.markets && <p className="field-error" role="alert">{errors.markets.message}</p>}
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="field-label">Tell us about your ideal client and track record</label>
        <textarea id="message" rows={4} className="field-input" placeholder="Typical engagement size, notable clients, differentiators…" {...register('message')} />
        {errors.message && <p className="field-error" role="alert">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary mt-8 w-full disabled:opacity-60 sm:w-auto">
        {isSubmitting ? 'Submitting…' : 'Apply for partnership'} <Send size={16} />
      </button>
    </form>
  );
}
