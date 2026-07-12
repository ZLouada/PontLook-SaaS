import type { Metadata } from 'next';
import FindTrainingWizard from '@/components/wizard/FindTrainingWizard';
import Reveal from '@/components/shared/Reveal';
import { ShieldCheck, Clock, BadgeDollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Find Corporate Training',
  description:
    'Tell us your workforce challenge. We qualify it and match you with proven GCC corporate training providers — free for companies.',
};

export default function FindTrainingPage() {
  return (
    <div className="bg-hero-gradient">
      <section className="container-site pt-36 pb-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="chip">Needs assessment · ~5 minutes</span>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            Find the right training partner
          </h1>
          <p className="mt-4 text-lg">
            Answer five short sections. We qualify your needs and introduce you to providers who
            have solved this exact challenge before.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm font-medium text-ink">
            <span className="flex items-center gap-1.5"><BadgeDollarSign size={16} className="text-primary" /> Free for companies</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary" /> Confidential</span>
            <span className="flex items-center gap-1.5"><Clock size={16} className="text-primary" /> Progress auto-saves</span>
          </div>
        </Reveal>
        <div className="mx-auto mt-12 max-w-3xl">
          <FindTrainingWizard />
        </div>
      </section>
    </div>
  );
}
