import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-cta-gradient py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-primary-300/20 blur-3xl"
      />
      <Reveal className="container-site text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold !text-white sm:text-4xl">
          Stop chasing. Start closing with companies that already need you.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-primary-100">
          Join the GCC’s intelligence-driven training marketplace — as a provider or as a buyer.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/for-providers" className="btn bg-white text-primary shadow-lifted hover:bg-primary-50">
            Become a partner provider <ArrowRight size={17} />
          </Link>
          <Link href="/find-training" className="btn border border-white/50 text-white hover:bg-white/10">
            Find corporate training
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
