'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Send } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Your name is required'),
  email: z.string().email('Enter a valid email'),
  company: z.string().min(2, 'Company is required'),
  topic: z.enum(['provider', 'company', 'partnership', 'media', 'other'], {
    errorMap: () => ({ message: 'Select a topic' }),
  }),
  message: z.string().min(20, 'Give us at least a couple of sentences (20+ characters)'),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    // Endpoint to be wired to CRM/email in a later phase.
    if (typeof window !== 'undefined') {
      localStorage.setItem('contact-message', JSON.stringify({ ...data, at: Date.now() }));
    }
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="card text-center !p-12">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
        <h3 className="mt-5 text-2xl">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed">
          Thanks for reaching out — we respond to every message within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card !p-8 sm:!p-10" noValidate>
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
      <button type="submit" disabled={isSubmitting} className="btn-primary mt-7 disabled:opacity-60">
        {isSubmitting ? 'Sending…' : 'Send message'} <Send size={16} />
      </button>
    </form>
  );
}
