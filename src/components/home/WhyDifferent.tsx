'use client';

import { useState } from 'react';
import SectionHeading from '@/components/shared/SectionHeading';
import {
  Target,
  ShieldCheck,
  Building2,
  CheckCircle2,
  BookOpen,
  ArrowRight,
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
  const c = dict.why_different?.cards;

  const items = [
    // Card 1: Diagnose Your Skill Gaps
    {
      id: 'diagnose',
      icon: Target,
      span: 'md:col-span-12 lg:col-span-7',
      title: c?.diagnose?.title || 'Diagnose Your Skill Gaps',
      text:
        c?.diagnose?.text ||
        'We help you identify hidden capability gaps and workforce challenges across your teams—turning vague training requests into clear, actionable development priorities.',
      cta: c?.diagnose?.cta || 'Explore our L&D guides & blog',
      href: 'https://blog.pontlook.com',
      isExternal: true,
      mockup: (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 w-full p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#0052FF]/10 text-[#0052FF] flex items-center justify-center font-bold">
                <Target size={16} />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-800 font-sans">
                  {c?.diagnose?.mockupHeader || 'Skill Gap Assessment'}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  {c?.diagnose?.mockupSubheader || 'Enterprise Department Level'}
                </div>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-mono font-semibold border border-blue-200/60">
              {c?.diagnose?.tag1 || '# Leadership & Tech Gaps'}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-mono font-semibold border border-emerald-200/60">
              {c?.diagnose?.tag2 || 'Priority Roadmap'}
            </span>
          </div>
        </div>
      ),
    },

    // Card 2: Matched Directly with the Right Training Partner
    {
      id: 'match',
      icon: ShieldCheck,
      span: 'md:col-span-12 lg:col-span-5',
      title: c?.match?.title || 'Matched Directly with the Right Training Partner',
      text:
        c?.match?.text ||
        'No endless searching or cold sales pitches. We match your specific requirements directly with pre-vetted corporate training firms proven to deliver measurable results.',
      cta: c?.match?.cta || 'Get matched for training',
      href: `/${lang}/find-training`,
      isExternal: false,
      mockup: (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 w-full p-4 flex flex-col gap-2.5">
          <div className="text-xs font-semibold text-slate-800 pb-1.5 border-b border-slate-100 font-sans flex items-center justify-between">
            <span>{c?.match?.mockupHeader || 'Partner Fit Checklist'}</span>
            <ShieldCheck size={15} className="text-emerald-600" />
          </div>
          <div className="space-y-1.5 text-[11px] text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              <span>{c?.match?.check1 || 'Specialized in your industry'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              <span>{c?.match?.check2 || 'Verified delivery track record'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              <span>{c?.match?.check3 || 'Aligned with your timeline & budget'}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 3: Direct Access to Verified Decision-Makers
    {
      id: 'access',
      icon: Building2,
      span: 'md:col-span-6 lg:col-span-4',
      title: c?.access?.title || 'Direct Access to Verified Decision-Makers',
      angle: c?.access?.angle || 'Skip the Gatekeepers. Talk Directly to the Budget Owners.',
      text:
        c?.access?.text ||
        'Stop wasting time with dead-end outreach. We connect you directly with CHROs, VPs of Talent, and C-Level executives who hold verified purchasing authority and active L&D needs.',
      cta: c?.access?.cta || 'Apply as a Provider',
      href: `/${lang}/for-providers`,
      isExternal: false,
      mockup: (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 w-full p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold tracking-wide uppercase">
              {c?.access?.clientTag || 'Enterprise Client · GRC'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold border border-emerald-200/60">
              {c?.access?.statusBadge || 'Budget Authority: Confirmed'}
            </span>
          </div>
          <div className="flex items-center gap-3 pt-1">
            <div className="h-9 w-9 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <Building2 size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-800 font-sans truncate">
                {c?.access?.role || 'Chief Human Resources Officer (CHRO)'}
              </div>
              <div className="text-[10px] text-slate-500">Verified Direct Engagement</div>
            </div>
          </div>
        </div>
      ),
    },

    // Card 4: Ready-to-Partner Clients
    {
      id: 'ready',
      icon: CheckCircle2,
      span: 'md:col-span-6 lg:col-span-4',
      title: c?.ready?.title || 'Ready-to-Partner Clients',
      text:
        c?.ready?.text ||
        'We respect your expertise. Instead of speculative leads, we bring you serious organizations that are ready to invest, with defined budgets and clear goals—creating partnerships where both sides succeed.',
      cta: c?.ready?.cta || 'Connect with Ready Clients',
      href: `/${lang}/for-providers`,
      isExternal: false,
      mockup: (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 w-full p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 text-xs font-semibold text-slate-800 font-sans">
            <span>{c?.ready?.mockupHeader || 'Partnership Readiness | Verified'}</span>
            <CheckCircle2 size={14} className="text-emerald-600" />
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{c?.ready?.needLabel || 'Client Need'}</span>
              <span className="font-semibold text-slate-800">{c?.ready?.needVal || 'Executive Leadership Program'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{c?.ready?.budgetLabel || 'Budget & Scope'}</span>
              <span className="font-mono font-bold text-emerald-600">{c?.ready?.budgetVal || 'Confirmed ($50k - $100k)'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">{c?.ready?.fitLabel || 'Mutual Fit'}</span>
              <span className="text-slate-700 font-medium">{c?.ready?.fitVal || 'Aligned on timeline & methodology'}</span>
            </div>
          </div>
        </div>
      ),
    },

    // Card 5: L&D Knowledge Hub
    {
      id: 'hub',
      icon: BookOpen,
      span: 'md:col-span-12 lg:col-span-4',
      title: c?.hub?.title || 'L&D Knowledge Hub',
      text:
        c?.hub?.text ||
        'We continuously analyze corporate training trends across the region and share fresh, actionable insights on our blog—providing free frameworks, guides, and research to help you make smarter L&D decisions.',
      cta: c?.hub?.cta || 'Explore our blog & resources',
      href: 'https://blog.pontlook.com',
      isExternal: true,
      mockup: (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 w-full p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 text-xs font-semibold text-slate-800 font-sans">
            <span>{c?.hub?.mockupHeader || 'Latest L&D Resources'}</span>
            <BookOpen size={14} className="text-[#0052FF]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-800 font-medium truncate">
                {c?.hub?.item1Title || 'GCC Workforce Skill Gaps Report'}
              </span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-mono font-bold shrink-0 border border-blue-200/60">
                {c?.hub?.item1Badge || 'New Guide'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-800 font-medium truncate">
                {c?.hub?.item2Title || 'Diagnostic Guide to Corporate Training ROI'}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold shrink-0 border border-emerald-200/60">
                {c?.hub?.item2Badge || 'Free Resource'}
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative bg-white py-12 sm:py-16 lg:py-20 border-t border-slate-200/60 overflow-hidden">
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-accent/10 via-accent-secondary/10 to-accent/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

      <div className="container-site px-4 sm:px-8 lg:px-12">
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            eyebrow={dict.why_different?.eyebrow || 'ACTIONABLE MARKET INTELLIGENCE'}
            title={dict.why_different?.title || 'Real Solutions on Our Blog. Verified Connections on Our Platform.'}
            subtitle={
              dict.why_different?.subtitle ||
              'We analyze real GCC workplace challenges to deliver free, actionable problem-solving guides on our blog—and directly connect corporate leaders with the verified training providers ready to implement the solution.'
            }
          />
        </div>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6"
        >
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <m.div
                key={it.id}
                variants={cardVariants}
                className={`${it.span} transform-gpu will-change-transform flex flex-col`}
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

                    {it.angle && (
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-2.5 tracking-tight">
                        {it.angle}
                      </p>
                    )}

                    <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed tracking-normal mb-5 sm:mb-6">
                      {it.text}
                    </p>
                  </div>

                  <div className="mt-auto pt-2">
                    <div className="w-full rounded-2xl bg-slate-50/80 border border-slate-200/60 p-2 sm:p-3 flex items-center justify-center overflow-hidden mb-5 sm:mb-6 shadow-inner">
                      {it.mockup}
                    </div>

                    {it.isExternal ? (
                      <a
                        href={it.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-[#0052FF] hover:text-blue-700 transition-colors min-h-[36px] py-1 group/btn"
                      >
                        <span>{it.cta}</span>
                        <ArrowRight
                          size={16}
                          className="ms-1.5 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:-scale-x-100"
                        />
                      </a>
                    ) : (
                      <Link
                        href={it.href}
                        className="inline-flex items-center text-sm font-semibold text-[#0052FF] hover:text-blue-700 transition-colors min-h-[36px] py-1 group/btn"
                      >
                        <span>{it.cta}</span>
                        <ArrowRight
                          size={16}
                          className="ms-1.5 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 rtl:-scale-x-100"
                        />
                      </Link>
                    )}
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
