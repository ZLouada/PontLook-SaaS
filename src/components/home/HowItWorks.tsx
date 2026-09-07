'use client';

import { useRef } from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { m, useScroll, useSpring } from 'framer-motion';
import SectionHeading from '@/components/shared/SectionHeading';
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
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-lg p-5 flex flex-col gap-3 relative z-10 text-white">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-[#4D7CFF] flex items-center justify-center font-bold">
              <Building2 size={20} />
            </div>
            <div>
              <div className="text-xs font-semibold text-white font-sans">Demand Signal Detected</div>
              <div className="text-[11px] text-slate-400 font-medium">Verified Enterprise · Saudi Arabia</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-4/5 bg-slate-800 rounded-full" />
            <div className="h-2 w-3/5 bg-slate-800 rounded-full" />
          </div>
          <div className="pt-2 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-semibold border border-emerald-500/30 inline-flex items-center gap-1">
              <CheckCircle2 size={12} /> High Intent
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/15 text-[#4D7CFF] text-[11px] font-mono font-semibold border border-blue-500/30">
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
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-lg p-5 flex flex-col gap-3 relative z-10 text-white">
          <div className="flex items-center justify-between pb-2">
            <div className="text-xs font-semibold text-white font-sans">Match Quality Score</div>
            <div className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
              94% Score
            </div>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <m.div
              initial={{ width: '0%' }}
              whileInView={{ width: '94%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Verified Criteria (4/4)</span>
            <span className="text-emerald-400 font-semibold font-mono">Verified Match</span>
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
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-lg p-6 text-center flex flex-col items-center gap-4 relative z-10 text-white">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary p-[2px] shadow-sm">
            <div className="h-full w-full rounded-[14px] bg-slate-900 flex items-center justify-center text-[#4D7CFF]">
              <Award size={26} />
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white font-sans">Warm Introduction Made</div>
            <div className="text-xs text-slate-400 mt-1">Direct access to buyer decision-maker</div>
          </div>
          <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between px-2">
            <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-wider">Status</span>
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/15 px-2.5 py-1 rounded-full border border-emerald-500/30">
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
      className="relative bg-transparent py-16 md:py-24 border-t border-white/10 overflow-hidden"
    >
      {/* Background subtle ambient gradient */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-blue-600/10 via-blue-400/5 to-blue-600/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-4 sm:px-8 lg:px-12">
        <div className="mb-8 sm:mb-12 text-center max-w-[820px] mx-auto">
          <SectionHeading
            eyebrow={dict.how_it_works?.eyebrow || 'How It Works'}
            title={dict.how_it_works?.title || 'From verified pain point to signed contract'}
            subtitle={dict.how_it_works?.subtitle || 'Three steps. Zero wasted meetings.'}
          />
        </div>

        <div ref={containerRef} className="relative space-y-6 sm:space-y-8 max-w-5xl mx-auto">
          {/* Vertical scroll pipeline */}
          <div className="absolute start-[2.25rem] lg:start-[3.75rem] top-12 bottom-12 w-[3px] bg-slate-800 hidden lg:block rounded-full">
            <m.div
              style={{ scaleY, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-[#0052FF] via-[#4D7CFF] to-emerald-500 rounded-full shadow-[0_0_12px_rgba(0,82,255,0.4)]"
            />
          </div>

          {steps.map((s, i) => {
            return (
              <m.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="transform-gpu will-change-transform"
              >
                <m.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="group flex flex-col lg:flex-row items-center gap-5 sm:gap-10 lg:gap-16 bg-slate-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 text-white shadow-2xl hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,82,255,0.15)] transition-all duration-500 relative z-20"
                >
                  {/* Step counter pill (desktop floating) */}
                  <div className="absolute -start-10 lg:-start-16 top-10 hidden lg:flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-mono font-semibold text-base z-30 shadow-apple border-2 border-white/20 ring-1 ring-white/10 group-hover:bg-[#0052FF] group-hover:scale-105 transition-all duration-300">
                    0{i + 1}
                  </div>

                  <div className="flex-1 space-y-3 sm:space-y-4 w-full">
                    <div>
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#0052FF] text-white text-xs font-semibold shadow-2xs">
                        {s.badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-tight leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-lg font-normal">
                      {s.subtitle}
                    </p>
                  </div>

                  <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <div className="w-full max-w-[420px] rounded-2xl bg-slate-950/60 border border-white/10 flex items-center justify-center p-3.5 sm:p-6 relative overflow-hidden group-hover:border-blue-500/30 transition-colors duration-300 min-h-[180px] sm:min-h-[220px]">
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
