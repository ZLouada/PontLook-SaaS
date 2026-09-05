'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Send, Loader2 } from 'lucide-react';

const schema = z.object({
  name: z.string().trim().min(2, 'Your name is required').max(100, 'Name is too long'),
  email: z.string().trim().max(254, 'Email is too long').email('Enter a valid email'),
  company: z.string().trim().min(2, 'Company is required').max(150, 'Company name is too long'),
  topic: z.enum(['provider', 'company', 'partnership', 'media', 'other'], {
    errorMap: () => ({ message: 'Select a topic' }),
  }),
  message: z.string().trim().min(20, 'Give us at least a couple of sentences (20+ characters)').max(5000, 'Message is too long'),
  _gotcha: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    if (data._gotcha) {
      setSubmitted(true);
      return;
    }

    setIsLoading(true);

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '8b61988b-d8e3-414b-a843-5ea273292bb5',
      from_name: 'PontLook Lead Engine',
      subject: `New Lead Request from PontLook: Contact Form Inquiry (${data.company || data.name})`,
      form_type: 'General Contact Request',
      company_name: data.company,
      company: data.company,
      website: 'N/A',
      full_name: data.name,
      name: data.name,
      business_email: data.email,
      email: data.email,
      phone_number: 'N/A',
      topic: data.topic,
      specialties: data.topic,
      challenges: data.message,
      challenge_notes: data.message,
      headcount_tier: 'N/A',
      budget: 'N/A',
      timeline: 'N/A',
      description: data.message,
      message: data.message,
      _gotcha: data._gotcha || '',
      submitted_at: new Date().toISOString(),
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success !== false) {
        setSubmitted(true);
      } else {
        const errorMsg = result?.message || 'Message submission failed. Please check your details and try again.';
        console.error('Web3Forms contact submission error:', errorMsg);
        alert('Message submission failed. Please check your details and try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      alert('Network error sending your message. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="card text-center !p-6 sm:!p-12">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
        <h3 className="mt-5 text-2xl font-semibold text-slate-800 font-heading">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Thanks for reaching out, we respond to every message within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card !p-5 sm:!p-10" noValidate>
      {/* Invisible spam honeypot */}
      <input type="text" {...register('_gotcha')} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">Name</label>
          <input id="name" className="field-input" {...register('name')} />
          {errors.name && <p className="field-error" role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="field-label">Email</label>
          <input id="email" type="email" className="field-input" {...register('email')} />
          {errors.email && <p className="field-error" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className="field-label">Company</label>
          <input id="company" className="field-input" {...register('company')} />
          {errors.company && <p className="field-error" role="alert">{errors.company.message}</p>}
        </div>
        <div>
          <label htmlFor="topic" className="field-label">Topic</label>
          <select id="topic" className="field-input" {...register('topic')}>
            <option value="">Select…</option>
            <option value="provider">I’m a training provider</option>
            <option value="company">I’m looking for training</option>
            <option value="partnership">Strategic partnership</option>
            <option value="media">Media / speaking</option>
            <option value="other">Something else</option>
          </select>
          {errors.topic && <p className="field-error" role="alert">{errors.topic.message}</p>}
        </div>
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="field-label">Message</label>
        <textarea id="message" rows={5} className="field-input" {...register('message')} />
        {errors.message && <p className="field-error" role="alert">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isLoading} className="btn-primary mt-7 w-full sm:w-auto py-3.5 sm:py-3 disabled:opacity-60 inline-flex items-center justify-center gap-2 active:scale-[0.98] touch-manipulation">
        {isLoading ? (
          <>
            <span>Sending…</span>
            <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            <span>Send message</span>
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
