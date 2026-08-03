import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import LeadTiers from '@/components/providers/LeadTiers';
import PartnershipForm from '@/components/providers/PartnershipForm';
import {
  ArrowRight, BadgeCheck, CalendarCheck, FileSignature, LineChart, PhoneCall,
  Rocket, SearchCheck, ShieldCheck, Wallet,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Training Providers | PontLook',
  description:
    'Receive verified corporate training opportunities across the GCC on a pay-per-lead model.',
};

const methodology = [
  {
    icon: SearchCheck,
    title: 'Signal detection',
    text: 'Hiring surges, restructures, compliance deadlines, Saudization/Emiratization targets, expansion news: we monitor the signals that precede training demand.',
  },
  {
    icon: PhoneCall,
    title: 'Direct verification',
    text: 'We speak with the company. The pain point, its urgency, and the decision-maker’s authority are confirmed, not assumed.',
  },
  {
    icon: LineChart,
    title: 'Scoring & tiering',
    text: 'Budget, timeline, company size, and depth of need feed a structured score. Only opportunities at 50+ ever reach a provider.',
  },
  {
    icon: BadgeCheck,
    title: 'Matched delivery',
    text: 'Opportunities route to the provider whose specialty, language coverage, and track record best fit, with full context attached.',
  },
];

const onboarding = [
  { icon: FileSignature, step: 'Apply', text: 'Submit the partnership application below.' },
  { icon: PhoneCall, step: 'Qualification call', text: 'We validate mutual fit: specialties, capacity, markets.' },
  { icon: ShieldCheck, step: 'Agreement', text: 'Simple partnership contract. No retainer, no lock-in.' },
  { icon: Rocket, step: 'Onboarding', text: 'Profile setup: specialties, languages, delivery formats, references.' },
  { icon: CalendarCheck, step: 'Lead delivery', text: 'Qualified opportunities begin flowing, each scored and tiered.' },
  { icon: LineChart, step: 'Feedback loop', text: 'Your outcomes tune our matching: quality compounds over time.' },
];

export default function ForProvidersPage() {
  return (
    <>
      <section className="bg-hero-gradient pt-36 pb-20">
        <div className="container-site max-w-3xl">
          <Reveal>
            <span className="chip">For training providers</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Predictable revenue from buyers who are <span className="text-primary">already looking</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed">
              Referrals are unpredictable. Cold outreach is expensive. We deliver verified,
              decision-maker-confirmed opportunities from GCC companies with real budgets, and you
              only pay when a lead is qualified.
            </p>
            <Link href="#apply" className="btn-primary mt-8">
              Apply for partnership <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Qualification methodology"
            title="How an opportunity earns its way to you"
            subtitle="Four gates between market noise and your inbox."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.08}>
                <div className="card h-full !p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                    <m.icon size={20} />
                  </span>
                  <h3 className="mt-4 text-lg">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LeadTiers />

      <section className="py-20 bg-slate-50/60">
        <div className="container-site px-6">
          <Reveal className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm max-w-4xl mx-auto text-center">
            <div className="mx-auto mb-6 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#2451BF]">
              <Wallet size={24} />
            </div>
            <h2 className="text-slate-900 dark:text-white font-bold text-3xl md:text-4xl tracking-tight mb-4">
              No retainers. Ever.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Pay per qualified lead, or a success-based commission on closed business, your
              choice at contract stage. If we don’t deliver qualified opportunities, you pay
              nothing. Our revenue only exists when yours does.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Onboarding"
            title="From application to first opportunity"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {onboarding.map((o, i) => (
              <Reveal key={o.step} delay={(i % 3) * 0.08}>
                <div className="card flex h-full items-start gap-4 !p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <o.icon size={19} />
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-primary-300">Step {i + 1}</p>
                    <h3 className="text-base">{o.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed">{o.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="bg-sky-gradient py-24 scroll-mt-24">
        <div className="container-site max-w-3xl">
          <SectionHeading
            eyebrow="Partnership application"
            title="Join the provider network"
            subtitle="Tell us about your firm. If there’s a fit, you’ll hear from us within 2 business days."
          />
          <Reveal className="mt-12" delay={0.1}>
            <PartnershipForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
