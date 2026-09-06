'use client';

import { useState } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import Card from '@/components/shared/Card';
import {
  Target,
  ShieldCheck,
  Building2,
  Award,
  BadgeDollarSign,
  TrendingUp,
  ChevronRight,
  Search,
  CheckCircle2,
  User,
  CheckSquare,
  FileText,
  MapPin,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { m } from 'framer-motion';
import { useDictionary } from '@/components/providers/DictionaryProvider';

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

function SpotlightCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-8 shadow-apple transition-all duration-300 hover:shadow-xl hover:border-[#0052FF]/30 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 82, 255, 0.08), transparent 70%)`
            : undefined,
        }}
      />
      <div className="relative z-10 flex flex-col h-full justify-between">
        {children}
      </div>
    </div>
  );
}

export default function WhyDifferent() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  const items = [
    {
      icon: Target,
      span: 'lg:col-span-8',
      title: dict.why_different?.cards?.evidence?.title || 'Intelligence-driven targeting',
      text: dict.why_different?.cards?.evidence?.text || 'We find demand signals in the market, not lists to spam. Every opportunity starts with evidence.',
      mockup: (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 w-full p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-8 w-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center font-bold">
              <Search size={14} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-800 font-sans">New Signal Detected</div>
              <div className="text-[10px] text-slate-500 font-medium">Enterprise · 500+ employees</div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-mono font-bold border border-accent/20">
              Leadership Need
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-mono font-bold border border-emerald-100">
              Verified Budget
            </span>
          </div>
        </div>
      ),
    },
    {
      icon: ShieldCheck,
      span: 'lg:col-span-4',
      title: dict.why_different?.cards?.pain?.title || 'Verified business pain',
      text: dict.why_different?.cards?.pain?.text || 'Each challenge is confirmed directly with the company before it ever reaches a provider.',
      mockup: (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 w-full p-4 flex flex-col gap-2">
          <div className="text-[11px] font-bold text-slate-800 mb-1 border-b border-slate-100 pb-2 font-sans">
            Verification Status
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span>Pain point documented</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span>CHRO Sponsor identified</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-700">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span>Budget confirmed</span>
          </div>
        </div>
      ),
    },
    {
      icon: Building2,
      span: 'lg:col-span-4',
      title: dict.why_different?.cards?.deciders?.title || 'Validated decision-makers',
      text: dict.why_different?.cards?.deciders?.text || 'You talk to the CHRO, CEO, or L&D owner with authority to buy, not a gatekeeper.',
      mockup: (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/70 w-full p-4 flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold relative shrink-0">
            <User size={18} />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white">
              <CheckCircle2 size={10} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-semibold text-slate-800 leading-tight font-sans truncate">
              Enterprise Buyer
            </div>
            <div className="text-[10px] text-slate-500 truncate">Chief Human Resources Officer</div>
            <div className="text-[9px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block mt-1">
              Buying Power: Confirmed
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Award,
      span: 'lg:col-span-8',
      title: dict.why_different?.cards?.qualified?.title || 'Qualified opportunities only',
      text: dict.why_different?.cards?.qualified?.text || 'Budget, timeline, and scope checked. If it does not meet the bar, you never see it.',
      mockup: (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-emerald-200/80 w-full p-4 relative overflow-hidden">
          <div className="text-[11px] font-bold text-emerald-700 mb-2 font-sans flex items-center justify-between">
            <span>Ready for Matching</span>
            <CheckSquare size={13} className="text-emerald-600" />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-500 font-medium">Verified Budget</span>
              <span className="font-mono font-bold text-slate-800">$50k – $100k</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-500 font-medium">Timeline</span>
              <span className="font-bold text-slate-800">Q3 Delivery</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-slate-500 font-medium">Program Type</span>
              <span className="font-bold text-slate-800">Executive Leadership</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: BadgeDollarSign,
      span: 'lg:col-span-6',
      title: dict.why_different?.cards?.retainers?.title || 'No retainers',
      text: dict.why_different?.cards?.retainers?.text || 'Pay per qualified lead ($50–$200). Zero monthly retainers. Your investment directly tracks your qualified pipeline.',
      mockup: (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 w-full p-4 flex flex-col gap-2.5">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-800 font-sans">Pricing Model</span>
            <FileText size={13} className="text-accent" />
          </div>
          <div className="h-px w-full bg-slate-100" />
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 font-medium">Pay per Qualified Lead</span>
            <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              $50–$200
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-slate-500 font-medium">Monthly Retainer</span>
            <span className="font-mono font-bold text-slate-400 line-through">$0 / month</span>
          </div>
        </div>
      ),
    },
    {
      icon: TrendingUp,
      span: 'lg:col-span-6',
      title: dict.why_different?.cards?.gcc?.title || 'Pure GCC Focus',
      text: dict.why_different?.cards?.gcc?.text || 'Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman. Built specifically for GCC market dynamics, localization mandates, and Vision 2030 initiatives.',
      mockup: (
        <div className="relative w-full py-5 sm:py-6 px-3 bg-slate-50/80 rounded-2xl overflow-hidden border border-slate-200/80 flex items-center justify-center min-h-[120px]">
          <div className="flex flex-col items-center gap-2 z-10">
            <MapPin size={20} className="text-accent" />
            <div className="flex flex-wrap justify-center gap-1.5">
              <span className="px-2 py-0.5 bg-white border border-slate-200 shadow-2xs rounded-md text-[10px] font-bold text-slate-800">
                Saudi Arabia
              </span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 shadow-2xs rounded-md text-[10px] font-bold text-slate-800">
                UAE
              </span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 shadow-2xs rounded-md text-[10px] font-bold text-slate-800">
                Qatar & GCC
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-white py-12 sm:py-20 lg:py-36 border-t border-slate-200/60 overflow-hidden">
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-4 sm:px-8 lg:px-12">
        <div className="mb-10 sm:mb-16 lg:mb-24">
          <SectionHeading
            eyebrow={dict.why_different?.eyebrow || 'What You Can Expect'}
            title={dict.why_different?.title || 'Built for outcomes, not activity'}
            subtitle={dict.why_different?.subtitle || 'Everything we deliver is verified, validated, and qualified before it reaches you.'}
          />
        </div>
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8"
        >
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <m.div
                key={it.title}
                variants={cardVariants}
                className={`md:col-span-12 ${it.span} transform-gpu will-change-transform flex flex-col`}
              >
                <SpotlightCard className="h-full">
                  <div>
                    <div className="mb-4 sm:mb-6">
                      <span className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-white border border-accent/20">
                        <Icon size={22} className="sm:hidden" />
                        <Icon size={24} className="hidden sm:block" />
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-heading font-semibold text-slate-900 leading-tight mb-2 sm:mb-3 transition-colors">
                      {it.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed tracking-normal mb-5 sm:mb-6">
                      {it.text}
                    </p>
                  </div>

                  <div className="mt-auto pt-2">
                    <div className="w-full rounded-2xl bg-slate-50/80 border border-slate-200/60 p-2 sm:p-3 flex items-center justify-center overflow-hidden mb-5 sm:mb-6 shadow-inner">
                      {it.mockup}
                    </div>

                    <Link
                      href={`/${lang}/for-providers`}
                      className="inline-flex items-center text-sm font-semibold text-accent group-hover:text-accent-secondary transition-colors min-h-[36px] py-1"
                    >
                      {lang === 'ar' ? 'اكتشف آلية العمل' : 'Explore how it works'}{' '}
                      <ChevronRight
                        size={16}
                        className="ms-1 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100"
                      />
                    </Link>
                  </div>
                </SpotlightCard>
              </m.div>
            );
          })}
        </m.div>
      </div>
    </section>
  );
}
