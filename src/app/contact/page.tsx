import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to the Pontlook team — providers, companies, and partners welcome.',
};

export default function ContactPage() {
  return (
    <div className="bg-hero-gradient">
      <section className="container-site grid gap-14 pt-36 pb-24 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <span className="chip">Contact</span>
          <h1 className="mt-5 text-4xl font-bold leading-tight">Let’s talk</h1>
          <p className="mt-4 text-lg leading-relaxed">
            Whether you deliver training or need it, we’ll point you in the right direction —
            usually within one business day.
          </p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary"><Mail size={18} /></span>
              <a href="mailto:hello@pontlook.com" className="font-medium text-ink hover:text-primary">hello@pontlook.com</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary"><MapPin size={18} /></span>
              Riyadh · Dubai · Serving the GCC
            </li>
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary"><Clock size={18} /></span>
              Sunday–Thursday · 9:00–18:00 (GST)
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
