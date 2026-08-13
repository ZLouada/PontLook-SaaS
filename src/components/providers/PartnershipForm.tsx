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
  companyName: z.string().trim().min(1, 'Company name is required').max(150, 'Company name is too long'),
  contactName: z.string().trim().min(1, 'Your name is required').max(100, 'Name is too long'),
  email: z.string().trim().min(1, 'Business email is required').email('Enter a valid business email').max(254, 'Email is too long'),
  phone: z.string().trim().optional().or(z.literal('')),
  website: z.string().trim().optional().or(z.literal('')),
  specialties: z.array(z.string()).optional().default([]),
  yearsInBusiness: z.string().optional().or(z.literal('')),
  markets: z.string().trim().optional().or(z.literal('')),
  message: z.string().trim().optional().or(z.literal('')),
});

type FormValues = z.infer<typeof schema>;

export default function PartnershipForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      website: '',
      specialties: [],
      yearsInBusiness: '',
      markets: '',
      message: '',
    },
  });

  const selected = watch('specialties') || [];

  const toggle = (e: React.MouseEvent, s: string) => {
    e.preventDefault();
    e.stopPropagation();
    const next = selected.includes(s) ? selected.filter((x) => x !== s) : [...selected, s];
    setValue('specialties', next, { shouldValidate: true });
  };

  const onSubmit = async (formData: FormValues, e?: React.BaseSyntheticEvent | React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsLoading(true);

    const payload = {
      company_name: formData.companyName || 'N/A',
      website: formData.website || 'N/A',
      full_name: formData.contactName || 'N/A',
      business_email: formData.email || 'N/A',
      phone: formData.phone || 'N/A',
      years_in_business: formData.yearsInBusiness || 'N/A',
      specialties: Array.isArray(formData.specialties) ? formData.specialties.join(', ') : (formData.specialties || 'N/A'),
      challenges: 'N/A',
      markets_served: formData.markets || 'N/A',
      headcount: 'N/A',
      budget: 'N/A',
      timeline: 'N/A',
      description: formData.message || 'N/A',
      message: formData.message || 'N/A',
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://formspree.io/f/xppawggd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const resData = await response.json().catch(() => ({}));
        console.error('Formspree error response:', resData);
        alert('Submission failed. Please verify your contact information and try again.');
      }
    } catch (error) {
      console.error('Network submission error:', error);
      alert('Network connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit((data) => onSubmit(data, e))(e);
      }}
      className="card !p-8 sm:!p-10"
      noValidate
    >
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
                onClick={(e) => toggle(e, s)}
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

      <button type="submit" disabled={isLoading} className="btn-primary mt-8 w-full disabled:opacity-60 sm:w-auto">
        {isLoading ? 'Submitting…' : 'Apply for partnership'} <Send size={16} />
      </button>
    </form>
  );
}
