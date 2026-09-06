'use client';

import Reveal from '@/components/shared/Reveal';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { ArrowRight, ShieldCheck, Building2, Target } from 'lucide-react';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { usePathname } from 'next/navigation';

export default function FinalCta() {
  const dict = useDictionary();
  const pathname = usePathname() || '/en';
  const lang = pathname.startsWith('/ar') ? 'ar' : 'en';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 py-14 sm:py-20 lg:py-36 border-t border-slate-200/80">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-accent/10 blur-3xl pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-4 sm:px-8 lg:px-12 text-center max-w-5xl mx-auto">
        <Reveal>
          <div className="mb-5 sm:mb-6 inline-block">
            <Badge variant="accent" icon={<ShieldCheck size={14} className="text-accent" />}>
              {dict.final_cta.badge}
            </Badge>
          </div>

          <h2 className="mx-auto max-w-4xl text-3xl font-heading font-semibold text-slate-800 sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] sm:leading-[1.12]">
            {dict.final_cta.title}
          </h2>

          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-xl text-slate-600 leading-relaxed font-sans font-normal">
            {dict.final_cta.subtitle}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row w-full max-w-md sm:max-w-none mx-auto">
            <Button
              href={`/${lang}/for-providers`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
              leftIcon={<Building2 size={18} className="text-white/90" />}
              rightIcon={<ArrowRight size={17} className="rtl:-scale-x-100" />}
            >
              {dict.final_cta.btn_provider}
            </Button>

            <Button
              href={`/${lang}/find-training`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-h-[48px]"
              leftIcon={<Target size={18} className="text-slate-700" />}
            >
              {dict.final_cta.btn_buyer}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
