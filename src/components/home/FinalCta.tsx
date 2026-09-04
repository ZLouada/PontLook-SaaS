'use client';

import Reveal from '@/components/shared/Reveal';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { ArrowRight, ShieldCheck, Building2, Target } from 'lucide-react';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 py-28 lg:py-40 border-t border-slate-200/80">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-accent/10 blur-3xl pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-6 sm:px-8 lg:px-12 text-center max-w-5xl mx-auto">
        <Reveal>
          <div className="mb-6 inline-block">
            <Badge variant="accent" icon={<ShieldCheck size={14} className="text-accent" />}>
              Outsourced Growth Engine
            </Badge>
          </div>

          <h2 className="mx-auto max-w-4xl text-3xl font-heading font-semibold text-slate-800 sm:text-5xl lg:text-6xl tracking-tight leading-[1.12]">
            Stop chasing. Start closing with companies that already need you.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-slate-600 leading-relaxed font-sans font-normal">
            Join the GCC’s intelligence-driven training marketplace — as a provider or as a buyer.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href="/en/for-providers"
              variant="primary"
              size="lg"
              leftIcon={<Building2 size={18} className="text-white/90" />}
              rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
            >
              Become a partner provider
            </Button>

            <Button
              href="/en/find-training"
              variant="secondary"
              size="lg"
              leftIcon={<Target size={18} className="text-slate-700" />}
            >
              Find corporate training
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
