import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-primary-50 py-24 border-y border-border">
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 glow-primary opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-secondary-100/50 pointer-events-none" />
      <Reveal className="container-site relative z-10 text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold text-slate-900 sm:text-5xl tracking-tight leading-[1.15] font-heading drop-shadow-sm">
          Stop chasing. Start closing with companies that already need you.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-slate-700 leading-relaxed font-medium">
          Join the GCC’s intelligence-driven training marketplace — as a provider or as a buyer.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/for-providers" className="btn bg-primary text-white hover:bg-primary-600">
            Become a partner provider <ArrowRight size={17} />
          </Link>
          <Link href="/find-training" className="btn bg-white border border-border text-foreground hover:border-primary hover:text-primary">
            Find corporate training
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
