'use client';

import SectionHeading from '@/components/shared/SectionHeading';
import { Target, ShieldCheck, Building2, Award, Zap, TrendingUp, ChevronRight, Search, CheckCircle2, User, CheckSquare, FileText, MapPin } from 'lucide-react';
import Link from 'next/link';
import { m } from 'framer-motion';

const items = [
  {
    icon: Target,
    title: 'Intelligence-driven targeting',
    text: 'We find demand signals in the market — not lists to spam. Every opportunity starts with evidence.',
    mockup: (
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-slate-200/80 w-4/5 p-4 flex flex-col gap-2.5">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold"><Search size={14} /></div>
          <div>
            <div className="text-[11px] font-bold text-slate-800 font-poppins">New Signal Detected</div>
            <div className="text-[10px] text-slate-500 font-medium">Enterprise · 500+ employees</div>
          </div>
        </div>
        <div className="flex gap-2">
           <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-[10px] font-bold border border-indigo-100">Leadership Need</span>
           <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100">Verified Budget</span>
        </div>
      </div>
    )
  },
  {
    icon: ShieldCheck,
    title: 'Verified business pain',
    text: 'Each challenge is confirmed directly with the company before it ever reaches a provider.',
    mockup: (
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-slate-200/80 w-4/5 p-4 flex flex-col gap-2">
        <div className="text-[11px] font-bold text-slate-800 mb-1 border-b border-slate-100 pb-2 font-poppins">Verification Status</div>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700"><CheckCircle2 size={13} className="text-emerald-500"/><span>Pain point documented</span></div>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700"><CheckCircle2 size={13} className="text-emerald-500"/><span>CHRO Sponsor identified</span></div>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700"><CheckCircle2 size={13} className="text-emerald-500"/><span>Budget confirmed</span></div>
      </div>
    )
  },
  {
    icon: Building2,
    title: 'Validated decision-makers',
    text: 'You talk to the CHRO, CEO, or L&D owner with authority to buy — not a gatekeeper.',
    mockup: (
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-slate-200/80 w-4/5 p-4 flex items-center gap-3.5">
        <div className="h-10 w-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold relative">
          <User size={18} />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
            <CheckCircle2 size={10} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-bold text-slate-900 leading-tight font-poppins truncate">Enterprise Buyer</div>
          <div className="text-[10px] text-slate-500 truncate">Chief Human Resources Officer</div>
          <div className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block mt-1">Buying Power: Confirmed</div>
        </div>
      </div>
    )
  },
  {
    icon: Award,
    title: 'Qualified opportunities only',
    text: 'Budget, timeline, and scope checked. If it does not meet the bar, you never see it.',
    mockup: (
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-emerald-200/80 w-4/5 p-4 relative overflow-hidden">
        <div className="text-[11px] font-bold text-emerald-700 mb-2 font-poppins flex items-center justify-between">
          <span>Ready for Matching</span>
          <CheckSquare size={13} className="text-emerald-600" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px]"><span className="text-slate-500 font-medium">Verified Budget</span><span className="font-bold text-slate-800">$50k – $100k</span></div>
          <div className="flex justify-between items-center text-[10px]"><span className="text-slate-500 font-medium">Timeline</span><span className="font-bold text-slate-800">Q3 Delivery</span></div>
          <div className="flex justify-between items-center text-[10px]"><span className="text-slate-500 font-medium">Program Type</span><span className="font-bold text-slate-800">Executive Leadership</span></div>
        </div>
      </div>
    )
  },
  {
    icon: Zap,
    title: 'No retainers',
    text: 'Pay per qualified lead delivered. Your investment directly tracks your revenue pipeline.',
    mockup: (
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-slate-200/80 w-4/5 p-4 flex flex-col gap-2.5">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-bold text-slate-800 font-poppins">Pricing Model</span>
          <FileText size={13} className="text-primary"/>
        </div>
        <div className="h-px w-full bg-slate-100"/>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-500 font-medium">Pay per Qualified Lead</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Fixed Fee</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-500 font-medium">Monthly Retainer</span>
          <span className="font-bold text-slate-400 line-through">$0 / month</span>
        </div>
      </div>
    )
  },
  {
    icon: TrendingUp,
    title: 'GCC specialization',
    text: 'Saudi Arabia, UAE, and the wider GCC — tailored to local market dynamics and corporate regulations.',
    mockup: (
      <div className="relative w-4/5 aspect-[2/1] bg-slate-50/80 rounded-xl overflow-hidden border border-slate-200/80 flex items-center justify-center">
        <div className="flex flex-col items-center gap-1.5 z-10">
          <MapPin size={20} className="text-primary drop-shadow-sm" />
          <div className="flex gap-2">
             <span className="px-2 py-0.5 bg-white border border-slate-200 shadow-xs rounded text-[9px] font-bold text-slate-800">Saudi Arabia</span>
             <span className="px-2 py-0.5 bg-white border border-slate-200 shadow-xs rounded text-[9px] font-bold text-slate-800">UAE</span>
          </div>
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
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 22,
    },
  },
};

export default function WhyDifferent() {
  return (
    <section className="relative bg-white py-24 lg:py-36 border-t border-slate-200/60 overflow-hidden">
      {/* Ambient glow mesh */}
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-blue-400/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-6 sm:px-8 lg:px-12">
        <div className="mb-16 lg:mb-24">
          <SectionHeading
            eyebrow="What You Can Expect"
            title="Built for outcomes, not activity"
            subtitle="Everything we deliver is verified, validated, and qualified before it reaches you."
          />
        </div>
        <m.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <m.div key={it.title} variants={cardVariants} className="transform-gpu will-change-transform">
                <m.div 
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="flex flex-col h-full group bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-slate-200/80 shadow-xl shadow-slate-900/5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="mb-6">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white shadow-sm border border-blue-100">
                      <Icon size={24} />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-poppins text-slate-900 leading-tight mb-3 transition-colors">
                    {it.title}
                  </h3>
                  <p className="text-base text-slate-600 font-sans leading-relaxed tracking-wide mb-8 flex-1">
                    {it.text}
                  </p>
                  
                  {/* Mockup Frame */}
                  <div className="w-full aspect-[16/9] rounded-xl bg-slate-50/90 border border-slate-200/60 flex items-center justify-center overflow-hidden mb-6 relative z-10 shadow-inner">
                    {it.mockup}
                  </div>

                  <Link href="/en/for-providers" className="inline-flex items-center text-sm font-bold text-primary group-hover:text-blue-700 transition-colors">
                    Explore how it works <ChevronRight size={16} className="ms-1 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100" />
                  </Link>
                </m.div>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
