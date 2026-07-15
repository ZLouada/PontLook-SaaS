import type { Metadata } from 'next';
import FindTrainingWizard from '@/components/wizard/FindTrainingWizard';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import { ShieldCheck, Clock, BadgeDollarSign, Target, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Find Corporate Training',
  description:
    'Tell us your workforce challenge. We qualify it and match you with proven GCC corporate training providers — free for companies.',
};

const benefits = [
  {
    icon: Target,
    title: 'Precise Matching',
    text: 'We match you with providers who specialize in your exact challenge, industry, and region.',
  },
  {
    icon: ShieldCheck,
    title: 'Vetted Quality',
    text: 'Every provider in our network has a proven track record of delivering measurable outcomes.',
  },
  {
    icon: Briefcase,
    title: 'Zero Cost For You',
    text: 'Our matching service is entirely free for hiring organizations. We are paid by the providers.',
  },
];

export default function FindTrainingPage() {
  return (
    <>
      <div className="bg-hero-gradient">
        <section className="container-site pt-36 pb-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="chip">For HR & L&D Leaders</span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              Stop wasting time on <span className="text-primary">unqualified</span> training vendors
            </h1>
            <p className="mt-5 text-lg leading-relaxed">
              Tell us your workforce challenge. We qualify your needs and introduce you only to proven GCC training providers who have successfully solved this exact problem before.
            </p>
          </Reveal>
        </section>
      </div>

      <section className="bg-white py-20">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-3 mb-24">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="card h-full text-center flex flex-col items-center !p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary mb-4">
                    <b.icon size={24} />
                  </span>
                  <h3 className="text-lg font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <SectionHeading
            eyebrow="Needs Assessment"
            title="Find your perfect training partner"
            subtitle="Answer five short sections to begin the matching process."
          />
          
          <Reveal className="mx-auto mt-12 max-w-3xl">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-ink">
              <span className="flex items-center gap-1.5"><BadgeDollarSign size={16} className="text-primary" /> Free for companies</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary" /> Confidential</span>
              <span className="flex items-center gap-1.5"><Clock size={16} className="text-primary" /> Progress auto-saves</span>
            </div>
            <FindTrainingWizard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
