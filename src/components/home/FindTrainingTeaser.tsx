import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight, ClipboardList, Search, Users } from 'lucide-react';

export default function FindTrainingTeaser() {
  return (
    <section className="bg-sky-gradient py-24">
      <div className="container-site">
        <Reveal className="glass mx-auto max-w-4xl rounded-4xl p-10 text-center sm:p-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-400">
            For companies
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Tell us your challenge. We’ll find your training partner.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg">
            One structured needs assessment. We qualify it, match you with proven providers, and
            you compare proposals — free for companies.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-ink">
            <span className="flex items-center gap-2"><ClipboardList size={17} className="text-primary" /> 5-minute assessment</span>
            <span className="flex items-center gap-2"><Search size={17} className="text-primary" /> Expert matching</span>
            <span className="flex items-center gap-2"><Users size={17} className="text-primary" /> Curated introductions</span>
          </div>
          <Link href="/find-training" className="btn-primary mt-9">
            Start the needs assessment <ArrowRight size={17} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
