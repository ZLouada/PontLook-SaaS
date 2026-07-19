'use client';

import { Radar, GitMerge, Handshake } from 'lucide-react';
import { m } from 'framer-motion';

const steps = [
  {
    icon: Radar,
    title: 'We detect the need',
    text: 'Market intelligence surfaces GCC companies with verified workforce challenges — before they start searching.',
    mockup: (
      <div className="w-full max-w-xs rounded-xl border border-border bg-white shadow-lifted p-4 flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-full bg-primary-50 flex items-center justify-center text-primary"><Radar size={16} /></div>
          <div>
            <div className="text-xs font-semibold text-foreground">Demand Signal Detected</div>
            <div className="text-[10px] text-foreground-muted">Just now · Enterprise Tech</div>
          </div>
        </div>
        <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
        <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
        <div className="mt-2 flex gap-2">
          <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-[10px] font-medium border border-emerald-100">High intent</span>
          <span className="px-2 py-1 rounded bg-secondary-50 text-secondary-600 text-[10px] font-medium border border-secondary-100">Leadership</span>
        </div>
      </div>
    )
  },
  {
    icon: GitMerge,
    title: 'We qualify & match',
    text: 'Decision-makers are validated, budgets and timelines confirmed, then matched to the right provider.',
    mockup: (
      <div className="w-full max-w-xs rounded-xl border border-border bg-white shadow-lifted p-4 flex flex-col gap-3 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-semibold text-foreground">Match Confidence</div>
          <div className="text-xs font-bold text-emerald-600">94%</div>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-secondary to-emerald-400 w-[94%]" />
        </div>
        <div className="mt-3 space-y-2">
          {[
            { label: 'Budget Confirmed' },
            { label: 'Decision Maker Verified' },
            { label: 'Timeline Active' }
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-[11px] text-foreground-muted">
              <div className="h-3 w-3 rounded-full bg-emerald-100 flex items-center justify-center"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /></div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    icon: Handshake,
    title: 'You close the deal',
    text: 'Providers receive warm introductions to buyers who are ready. No cold outreach, ever.',
    mockup: (
      <div className="w-full max-w-xs rounded-xl border border-border bg-white shadow-lifted p-5 text-center flex flex-col items-center gap-3 relative z-10">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary p-[1px]">
          <div className="h-full w-full rounded-full bg-white flex items-center justify-center text-primary">
            <Handshake size={20} />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">Introduction Made</div>
          <div className="text-[11px] text-foreground-muted mt-1">Connecting you with the CHRO</div>
        </div>
        <div className="mt-2 w-full pt-3 border-t border-border flex justify-between px-2">
           <div className="h-6 w-6 rounded-full bg-slate-100" />
           <div className="h-6 w-16 bg-primary-50 rounded border border-primary-100" />
        </div>
      </div>
    )
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

export default function HowItWorks() {
  return (
    <section id="who-we-are" className="bg-background py-24 lg:py-32 border-t border-border">
      <div className="container-site px-6 sm:px-8 lg:px-12">
        <div className="mb-20 text-center max-w-[800px] mx-auto">
          <m.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl font-semibold sm:text-5xl lg:text-6xl text-slate-900 tracking-tight"
          >
            From verified pain point to signed contract
          </m.h2>
          <m.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg sm:text-xl text-slate-600 tracking-wide"
          >
            Three steps. Zero wasted meetings.
          </m.p>
        </div>
        
        <m.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 relative"
        >
          <div className="absolute start-[2.5rem] lg:start-[4rem] top-10 bottom-10 w-0.5 bg-primary-100 hidden lg:block" />
          
          {steps.map((s, i) => (
            <m.div 
              key={s.title}
              variants={cardVariants}
            >
              <div className="flex flex-col lg:flex-row items-center gap-12 bg-white rounded-[24px] p-10 lg:p-16 border border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 relative z-20">
                <div className="flex-1 space-y-6 relative z-30">
                  <div className="absolute -start-12 lg:-start-20 top-1 hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-sm z-30 shadow-md">
                    {i + 1}
                  </div>
                  <span className="text-primary font-heading font-semibold tracking-widest text-sm uppercase opacity-100">Step 0{i + 1}</span>
                  <h3 className="text-3xl font-heading font-semibold text-slate-900 opacity-100">{s.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-[500px] opacity-100">{s.text}</p>
                </div>
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                  <div className="w-full max-w-[400px] aspect-[4/3] rounded-[20px] bg-slate-50 border border-slate-200/50 flex items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-secondary" />
                    {s.mockup}
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
