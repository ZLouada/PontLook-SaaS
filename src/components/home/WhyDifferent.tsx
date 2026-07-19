'use client';

import SectionHeading from '@/components/shared/SectionHeading';
import { Target, ShieldCheck, Briefcase, Award, WalletCards, Globe, ChevronRight, Search, CheckCircle2, User, CheckSquare, FileText, MapPin } from 'lucide-react';
import Link from 'next/link';
import { m } from 'framer-motion';

const items = [
  {
    icon: Target,
    title: 'Intelligence-driven targeting',
    text: 'We find demand signals in the market — not lists to spam. Every opportunity starts with evidence.',
    mockup: (
      <div className="bg-white rounded-lg shadow-sm border border-border w-3/4 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-8 w-8 rounded-full bg-primary-50 text-primary flex items-center justify-center"><Search size={14} /></div>
          <div>
            <div className="text-[10px] font-semibold text-slate-800">New Signal Detected</div>
            <div className="text-[9px] text-slate-500">Retail · 500+ employees</div>
          </div>
        </div>
        <div className="flex gap-2">
           <span className="px-2 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[9px] font-medium border border-indigo-100">Leadership Gap</span>
           <span className="px-2 py-1 rounded-full bg-slate-50 text-slate-600 text-[9px] font-medium border border-slate-200">High Intent</span>
        </div>
      </div>
    )
  },
  {
    icon: ShieldCheck,
    title: 'Verified business pain',
    text: 'Each challenge is confirmed directly with the company before it ever reaches a provider.',
    mockup: (
      <div className="bg-white rounded-lg shadow-sm border border-border w-3/4 p-4 flex flex-col gap-2">
        <div className="text-[10px] font-semibold text-slate-800 mb-1 border-b border-border pb-2">Verification Checklist</div>
        <div className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500"/><span className="text-[10px] text-slate-600">Pain point documented</span></div>
        <div className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500"/><span className="text-[10px] text-slate-600">Sponsor identified</span></div>
        <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full border border-slate-200 animate-pulse bg-slate-50" /><span className="text-[10px] text-slate-400">Timeline pending</span></div>
      </div>
    )
  },
  {
    icon: Briefcase,
    title: 'Validated decision-makers',
    text: 'You talk to the CHRO, CEO, or L&D owner with authority to buy — not a gatekeeper.',
    mockup: (
      <div className="bg-white rounded-lg shadow-sm border border-border w-3/4 p-4 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-100 to-primary-100 flex items-center justify-center text-primary-600 relative">
          <User size={18} />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
            <CheckCircle2 size={8} />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-[11px] font-bold text-slate-900 leading-tight">Sarah Ahmed</div>
          <div className="text-[9px] text-slate-500 mt-0.5">Chief Human Resources Officer</div>
          <div className="text-[8px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1">Authority: Approved</div>
        </div>
      </div>
    )
  },
  {
    icon: Award,
    title: 'Qualified opportunities only',
    text: 'Budget, timeline, and scope checked. If it does not meet the bar, you never see it.',
    mockup: (
      <div className="bg-white rounded-lg shadow-sm border border-emerald-200 w-3/4 p-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-50 rounded-bl-lg flex items-center justify-center">
          <CheckSquare size={12} className="text-emerald-600" />
        </div>
        <div className="text-[10px] font-semibold text-emerald-700 mb-2">Ready for Matching</div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[9px]"><span className="text-slate-500">Budget</span><span className="font-semibold text-slate-700">$50k - $100k</span></div>
          <div className="flex justify-between items-center text-[9px]"><span className="text-slate-500">Timeline</span><span className="font-semibold text-slate-700">Q3 2026</span></div>
          <div className="flex justify-between items-center text-[9px]"><span className="text-slate-500">Type</span><span className="font-semibold text-slate-700">Executive Coaching</span></div>
        </div>
      </div>
    )
  },
  {
    icon: WalletCards,
    title: 'No retainers',
    text: 'Pay per qualified lead or success-based commission. Your cost tracks your revenue.',
    mockup: (
      <div className="bg-white rounded-lg shadow-sm border border-border w-3/4 p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="text-[10px] font-semibold text-slate-800">Lead Acquired</div>
          <FileText size={12} className="text-primary"/>
        </div>
        <div className="h-px w-full bg-slate-100"/>
        <div className="flex justify-between items-center">
          <span className="text-[9px] text-slate-500">Cost per Lead</span>
          <span className="text-[11px] font-bold text-emerald-600">Fixed Fee</span>
        </div>
        <div className="flex justify-between items-center mt-[-4px]">
          <span className="text-[9px] text-slate-500">Retainer</span>
          <span className="text-[10px] font-semibold text-slate-400 line-through">$5,000/mo</span>
        </div>
      </div>
    )
  },
  {
    icon: Globe,
    title: 'GCC specialization',
    text: 'Saudi Arabia, UAE, and the wider GCC — including Saudization and Emiratization dynamics.',
    mockup: (
      <div className="relative w-3/4 aspect-[2/1] bg-slate-50 rounded-lg overflow-hidden border border-border flex items-center justify-center">
        <div className="flex flex-col items-center gap-1.5 z-10">
          <MapPin size={20} className="text-primary drop-shadow-sm" />
          <div className="flex gap-1.5">
             <span className="px-1.5 py-0.5 bg-white border border-border shadow-sm rounded text-[8px] font-bold text-slate-700">KSA</span>
             <span className="px-1.5 py-0.5 bg-white border border-border shadow-sm rounded text-[8px] font-bold text-slate-700">UAE</span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
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

export default function WhyDifferent() {
  return (
    <section className="bg-white py-24 lg:py-32 border-t border-slate-200/50">
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
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((it) => (
            <m.div key={it.title} variants={cardVariants}>
              <m.div 
                whileHover={{ scale: 1.01, borderColor: "rgba(59, 130, 246, 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex flex-col h-full group cursor-pointer bg-white rounded-[24px] p-8 border border-slate-200/50 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] transition-shadow duration-300"
              >
                <div className="mb-6">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white shadow-sm">
                    <it.icon size={24} />
                  </span>
                </div>
                <h3 className="text-[22px] font-heading font-semibold text-slate-900 leading-tight mb-3 transition-colors opacity-100">{it.title}</h3>
                <p className="text-base text-slate-600 leading-relaxed tracking-wide mb-8 flex-1 opacity-100">{it.text}</p>
                
                {/* Simulated Mockup Frame */}
                <div className="w-full aspect-[16/9] rounded-[16px] bg-[#F7F8FA] border border-slate-200/50 flex items-center justify-center overflow-hidden mb-6 transition-colors relative z-10 shadow-inner">
                   {it.mockup}
                </div>

                <Link href="/for-providers" className="inline-flex items-center text-[15px] font-semibold text-primary group-hover:text-primary-600 transition-colors">
                  Explore how it works <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </m.div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
