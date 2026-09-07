import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, MapPin, Clock } from 'lucide-react';
import { getDictionary } from '@/i18n';
import { Locale, i18n } from '@/i18n/config';

export const metadata: Metadata = {
  title: {
    absolute: 'Contact PontLook: Enterprise Partnerships & Support',
  },
  description:
    'Get in touch with PontLook for corporate training inquiries, provider partnership applications, or enterprise support across Saudi Arabia, UAE, and the GCC.',
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  let dict: any = {};

  try {
    dict = await getDictionary(lang);
  } catch (err) {
    console.error('Error loading dictionary:', err);
  }

  const contactData = dict?.contact || {
    chip: 'Contact',
    title: 'Let’s talk',
    subtitle: 'Whether you deliver training or need it, we’ll point you in the right direction, usually within one business day.',
    emailLabel: 'contact@pontlook.com',
    location: 'Riyadh · Dubai · Serving the GCC',
    hours: 'Sunday–Thursday · 9:00–18:00 (GST)',
  };

  return (
    <div className="bg-hero-gradient">
      <section className="container-site grid gap-14 pt-36 pb-24 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <span className="chip">{contactData.chip}</span>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-800 font-heading">
            {contactData.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {contactData.subtitle}
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <Mail size={18} />
              </span>
              <a href="mailto:contact@pontlook.com" className="font-medium text-ink hover:text-primary">
                {contactData.emailLabel}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <MapPin size={18} />
              </span>
              <span>{contactData.location}</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <Clock size={18} />
              </span>
              <span>{contactData.hours}</span>
            </li>
          </ul>
        </Reveal>
        <Reveal className="lg:col-span-3" delay={0.1}>
          <ContactForm />
        </Reveal>
      </section>
    </div>
  );
}
