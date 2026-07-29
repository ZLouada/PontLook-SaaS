'use client';

import { useRef } from 'react';
import { Building2, ShieldCheck, Award, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';
import { m, useScroll, useSpring } from 'framer-motion';

const steps = [
  {
    icon: Building2,
    badge: 'Step 01',
    title: 'Detect Need',
    subtitle: 'Market intelligence surfaces GCC companies with verified workforce challenges — before they start searching.',
    mockup: (
      <div className="w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-lg p-5 flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Building2 size={20} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 font-poppins">Demand Signal Detected</div>
            <div className="text-[11px] text-slate-500 font-medium">Verified Enterprise · Saudi Arabia</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-4/5 bg-slate-100 rounded-full" />
          <div className="h-2 w-3/5 bg-slate-100 rounded-full" />
        </div>
        <div className="pt-2 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60 inline-flex items-center gap-1">
            <CheckCircle2 size={12} /> High Intent
          </span>
          <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200/60">
            Leadership Training
          </span>
        </div>
      </div>
    )
  },
  {
    icon: ShieldCheck,
    badge: 'Step 02',
    title: 'Qualify & Match',
    subtitle: 'Decision-makers are validated, budgets and timelines confirmed, then matched to the right training provider.',
    mockup: (
      <div className="w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-lg p-5 flex flex-col gap-3 relative z-10">
        <div className="flex items-center justify-between pb-2">
          <div className="text-xs font-bold text-slate-900 font-poppins">Match Quality Score</div>
          <div className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            94% Score
          </div>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <m.div 
            initial={{ width: '0%' }}
            whileInView={{ width: '94%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full" 
          />
        </div>
        <div className="mt-2 space-y-2">
          {[
            'CHRO & L&D Director Verified',
            'Corporate Budget Confirmed',
            '30-Day Delivery Timeline'
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    icon: Award,
    badge: 'Step 03',
    title: 'Close Deal',
    subtitle: 'Providers receive direct, warm introductions to corporate decision-makers ready for proposals.',
    mockup: (
      <div className="w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md shadow-lg p-6 text-center flex flex-col items-center gap-4 relative z-10">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-md">
          <div className="h-full w-full rounded-[14px] bg-white flex items-center justify-center text-primary">
            <Award size={26} />
          </div>
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 font-poppins">Warm Introduction Made</div>
          <div className="text-xs text-slate-500 mt-1">Direct access to buyer decision-maker</div>
        </div>
        <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between px-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</span>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Proposal Stage
          </span>
        </div>
      </div>
    )
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    <section id="how-it-works" className="relative bg-slate-50/70 py-24 lg:py-36 border-t border-slate-200/60 overflow-hidden">
      {/* Ambient background glow orb */}
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-blue-400/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-6 sm:px-8 lg:px-12">
        <div className="mb-20 text-center max-w-[820px] mx-auto">
          <m.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-block mb-4"
          >
            How It Works
          </m.span>
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-heading text-3xl font-extrabold sm:text-5xl lg:text-6xl text-slate-900 tracking-tight font-poppins leading-[1.12]"
          >
            From verified pain point to signed contract
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 tracking-wide font-sans max-w-2xl mx-auto"
          >
            Three steps. Zero wasted meetings.
          </m.p>
        </div>
        
        <div ref={containerRef} className="relative space-y-12 max-w-6xl mx-auto">
          {/* Animated 3-Step Process Line */}
          <div className="absolute start-[2.25rem] lg:start-[3.75rem] top-12 bottom-12 w-1 bg-slate-200 hidden lg:block rounded-full">
            <m.div 
              style={{ scaleY, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-blue-600 via-indigo-600 to-emerald-500 rounded-full shadow-[0_0_12px_rgba(36,81,191,0.6)]"
            />
          </div>
          
          {steps.map((s, i) => {
            const Icon = s.icon;
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
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-14 border border-slate-200/80 shadow-xl shadow-slate-900/5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative z-20"
                >
                  {/* Step Number Circle */}
                  <div className="absolute -start-10 lg:-start-16 top-10 hidden lg:flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white font-bold font-poppins text-lg z-30 shadow-lg border-2 border-white">
                    {i + 1}
                  </div>

                  <div className="flex-1 space-y-4">
                    <span className="text-primary font-heading font-bold tracking-widest text-xs uppercase bg-primary/10 px-3 py-1 rounded-full inline-block">
                      {s.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-poppins text-slate-900">
                      {s.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg font-sans">
                      {s.subtitle}
                    </p>
                  </div>

                  <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <div className="w-full max-w-[420px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200/60 flex items-center justify-center p-6 relative overflow-hidden shadow-inner">
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
