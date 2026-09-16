import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, MapPin, Clock } from 'lucide-react';
import { getDictionary } from '@/i18n';
import { Locale, i18n } from '@/i18n/config';

import { constructAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'اتصل بنا | منصة PontLook لدعم وشراكات التدريب'
    : 'Contact PontLook | Enterprise Partnerships & Support';
  const description = isAr
    ? 'تواصل مع فريق PontLook لاستفسارات التدريب المؤسسي، طلبات انضمام مزودي التدريب، أو شراكات الأعمال في السعودية والإمارات والخليج.'
    : 'Get in touch with PontLook for corporate training inquiries, provider partnership applications, or enterprise support across Saudi Arabia and the UAE.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'contact'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/contact`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

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
    location: 'Riyadh · Dubai · Serving the Region',
    hours: 'Sunday to Thursday · 9:00 to 18:00 (GST)',
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
