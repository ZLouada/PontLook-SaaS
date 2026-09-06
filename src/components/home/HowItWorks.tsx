'use client';

import { useRef } from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { m, useScroll, useSpring } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
import Badge from '@/components/shared/Badge';

import { useDictionary } from '@/components/providers/DictionaryProvider';

export default function HowItWorks() {
  const dict = useDictionary();
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      icon: Building2,
      badge: dict.how_it_works?.step1?.badge || 'Step 01',
      title: dict.how_it_works?.step1?.title || 'Detect Need',
      subtitle:
        dict.how_it_works?.step1?.subtitle ||
        'Market intelligence surfaces GCC companies with verified workforce challenges, before they start searching.',
      mockup: (
        <div className="w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/90 backdrop-blur-md shadow-sm p-5 flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Building2 size={20} />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800 font-sans">Demand Signal Detected</div>
              <div className="text-[11px] text-slate-500 font-medium">Verified Enterprise · Saudi Arabia</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-4/5 bg-slate-100 rounded-full" />
            <div className="h-2 w-3/5 bg-slate-100 rounded-full" />
          </div>
          <div className="pt-2 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-mono font-semibold border border-emerald-200/60 inline-flex items-center gap-1">
              <CheckCircle2 size={12} /> High Intent
            </span>
            <span className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-[11px] font-mono font-semibold border border-accent/20">
              Leadership Training
            </span>
          </div>
        </div>
      ),
    },
    {
      icon: ShieldCheck,
      badge: dict.how_it_works?.step2?.badge || 'Step 02',
      title: dict.how_it_works?.step2?.title || 'Qualify & Match',
      subtitle:
        dict.how_it_works?.step2?.subtitle ||
        'Decision-makers are validated, budgets and timelines confirmed, then matched to the right training provider.',
      mockup: (
        <div className="w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/90 backdrop-blur-md shadow-sm p-5 flex flex-col gap-3 relative z-10">
          <div className="flex items-center justify-between pb-2">
            <div className="text-xs font-semibold text-slate-800 font-sans">Match Quality Score</div>
            <div className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              94% Score
            </div>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <m.div
              initial={{ width: '0%' }}
              whileInView={{ width: '94%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Verified Criteria (4/4)</span>
            <span className="text-emerald-600 font-semibold font-mono">Verified Match</span>
          </div>
        </div>
      ),
    },
    {
      icon: Award,
      badge: dict.how_it_works?.step3?.badge || 'Step 03',
      title: dict.how_it_works?.step3?.title || 'Introduce & Close',
      subtitle:
        dict.how_it_works?.step3?.subtitle ||
        'Providers receive direct, warm introductions to corporate decision-makers ready for proposals.',
      mockup: (
        <div className="w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/90 backdrop-blur-md shadow-sm p-6 text-center flex flex-col items-center gap-4 relative z-10">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary p-[2px] shadow-sm">
            <div className="h-full w-full rounded-[14px] bg-white flex items-center justify-center text-accent">
              <Award size={26} />
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800 font-sans">Warm Introduction Made</div>
            <div className="text-xs text-slate-500 mt-1">Direct access to buyer decision-maker</div>
          </div>
          <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between px-2">
            <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">Status</span>
            <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Proposal Stage
            </span>
          </div>
        </div>
      ),
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="how-it-works"
      className="relative bg-slate-50/70 py-14 sm:py-20 lg:py-36 border-t border-slate-200/60 overflow-hidden"
    >
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-4 sm:px-8 lg:px-12">
        <div className="mb-10 sm:mb-16 lg:mb-20 text-center max-w-[820px] mx-auto">
          <SectionHeading
            eyebrow={dict.how_it_works?.eyebrow || 'How It Works'}
            title={dict.how_it_works?.title || 'From verified pain point to signed contract'}
            subtitle={dict.how_it_works?.subtitle || 'Three steps. Zero wasted meetings.'}
          />
        </div>

        <div ref={containerRef} className="relative space-y-8 sm:space-y-12 max-w-5xl mx-auto">
          <div className="absolute start-[2.25rem] lg:start-[3.75rem] top-12 bottom-12 w-1 bg-slate-200 hidden lg:block rounded-full">
            <m.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-accent via-accent-secondary to-emerald-500 rounded-full"
            />
          </div>

          {steps.map((s, i) => {
            return (
              <m.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="transform-gpu will-change-transform"
              >
                <m.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 lg:gap-16 bg-white rounded-3xl p-5 sm:p-8 lg:p-14 border border-slate-200/70 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-300 relative z-20"
                >
                  <div className="absolute -start-10 lg:-start-16 top-10 hidden lg:flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-white font-mono font-semibold text-base z-30 shadow-sm border-2 border-white">
                    0{i + 1}
                  </div>

                  <div className="flex-1 space-y-4">
                    <Badge variant="accent">{s.badge}</Badge>
                    <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-slate-800">
                      {s.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg font-sans">
                      {s.subtitle}
                    </p>
                  </div>

                  <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
                      {s.mockup}
                    </div>
                  </div>
                </m.div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
