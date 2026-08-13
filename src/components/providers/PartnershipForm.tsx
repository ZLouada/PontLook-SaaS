'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { useDictionary } from './DictionaryProvider';

const defaultSpecialties = [
  'Leadership Development', 'Sales Performance', 'AI & Digital Skills', 'Compliance',
  'Soft Skills & Communication', 'Customer Service', 'Safety Training', 'Executive Coaching',
] as const;

export default function PartnershipForm() {
  const dict = useDictionary();
  const t = dict?.forProviders?.form || {};

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    fullName: '',
    businessEmail: '',
    phone: '',
    yearsInBusiness: '',
    specialties: [] as string[],
    challenges: [] as string[],
    headcount: '',
    budget: '',
    timeline: '',
    description: '',
    markets: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSpecialty = (e: React.MouseEvent, s: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData((prev) => {
      const current = prev?.specialties || [];
      const next = current.includes(s)
        ? current.filter((x) => x !== s)
        : [...current, s];
      return { ...prev, specialties: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsLoading(true);

    const payload = {
      company_name: formData.companyName || 'N/A',
      website: formData.website || 'N/A',
      full_name: formData.fullName || 'N/A',
      business_email: formData.businessEmail || 'N/A',
      phone: formData.phone || 'N/A',
      years_in_business: formData.yearsInBusiness || 'N/A',
      specialties: (formData.specialties || []).join(', ') || 'N/A',
      challenges: (formData.challenges || []).join(', ') || 'N/A',
      headcount: formData.headcount || 'N/A',
      budget: formData.budget || 'N/A',
      timeline: formData.timeline || 'N/A',
      markets_served: formData.markets || 'N/A',
      description: formData.description || formData.message || 'N/A',
      message: formData.message || formData.description || 'N/A',
      submitted_at: new Date().toISOString(),
    };

    try {
      const res = await fetch('https://formspree.io/f/xppawggd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        console.error('Formspree error response:', data);
        alert('Submission error. Please verify your details.');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card text-center !p-12">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
        <h3 className="mt-5 text-2xl">{t?.successTitle || 'Application received'}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {t?.successMessage ||
            'Thank you, our partnerships team will review your profile and reach out within 2 business days to schedule your qualification call. Next steps: qualification call → partnership agreement → onboarding → first opportunities.'}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card !p-8 sm:!p-10"
      noValidate={false}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="companyName" className="field-label">
            {t?.companyName || 'Company name'} <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="field-input"
            placeholder={t?.companyNamePlaceholder || 'Acme Training Group'}
          />
        </div>
        <div>
          <label htmlFor="website" className="field-label">
            {t?.website || 'Website'}
          </label>
          <input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="field-input"
            placeholder={t?.websitePlaceholder || 'https://…'}
          />
        </div>
        <div>
          <label htmlFor="fullName" className="field-label">
            {t?.fullName || 'Your name'} <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="field-input"
            placeholder={t?.fullNamePlaceholder || 'Full name'}
          />
        </div>
        <div>
          <label htmlFor="businessEmail" className="field-label">
            {t?.businessEmail || 'Business email'} <span className="text-red-500">*</span>
          </label>
          <input
            id="businessEmail"
            name="businessEmail"
            type="email"
            value={formData.businessEmail}
            onChange={handleChange}
            required
            className="field-input"
            placeholder={t?.businessEmailPlaceholder || 'you@company.com'}
          />
        </div>
        <div>
          <label htmlFor="phone" className="field-label">
            {t?.phone || 'Phone'}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="field-input"
            placeholder={t?.phonePlaceholder || '+966 …'}
          />
        </div>
        <div>
          <label htmlFor="yearsInBusiness" className="field-label">
            {t?.yearsInBusiness || 'Years in business'}
          </label>
          <select
            id="yearsInBusiness"
            name="yearsInBusiness"
            value={formData.yearsInBusiness}
            onChange={handleChange}
            className="field-input"
          >
            <option value="">Select…</option>
            <option value="<2">Less than 2</option>
            <option value="2-5">2–5</option>
            <option value="5-10">5–10</option>
            <option value="10+">10+</option>
          </select>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="field-label">
          {t?.specialties || 'Training specialties'}
        </legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {(defaultSpecialties || []).map((s) => {
            const active = (formData?.specialties || []).includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={(e) => toggleSpecialty(e, s)}
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
      </fieldset>

      <div className="mt-6">
        <label htmlFor="markets" className="field-label">
          {t?.markets || 'GCC markets you serve'}
        </label>
        <input
          id="markets"
          name="markets"
          value={formData.markets}
          onChange={handleChange}
          className="field-input"
          placeholder={t?.marketsPlaceholder || 'e.g., Saudi Arabia, UAE, Qatar'}
        />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="field-label">
          {t?.message || 'Tell us about your ideal client and track record'}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="field-input"
          placeholder={t?.messagePlaceholder || 'Typical engagement size, notable clients, differentiators…'}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary mt-8 w-full disabled:opacity-60 sm:w-auto"
      >
        {isLoading ? (t?.submitting || 'Submitting…') : (t?.submit || 'Apply for partnership')}{' '}
        <Send size={16} />
      </button>
    </form>
  );
}
