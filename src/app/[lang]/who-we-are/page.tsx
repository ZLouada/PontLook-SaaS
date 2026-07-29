import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  MessageSquare, 
  Award, 
  ShieldCheck, 
  Users, 
  Clock, 
  DollarSign, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Who We Are — The GCC Corporate Training Matchmaking Platform',
  description: 'We connect corporate training companies with GCC decision-makers who already have a real workforce challenge to solve.',
};

const featureCards = [
  {
    icon: TrendingUp,
    title: 'Stop relying on unpredictable referrals.',
    description: 'Eliminate feast-or-famine cycles by replacing word-of-mouth with a consistent, structured outbound growth engine.',
  },
  {
    icon: Clock,
    title: 'Keep your pipeline active during delivery.',
    description: 'Maintain steady sales outreach and lead generation even when your facilitators are 100% focused on client workshops.',
  },
  {
    icon: Zap,
    title: 'Use an outsourced growth engine.',
    description: 'Scale your enterprise business development without hiring, training, or managing expensive internal sales teams.',
  },
  {
    icon: MessageSquare,
    title: 'Start relevant conversations faster.',
    description: 'Engage HR, L&D, and C-level decision-makers right when they are actively seeking solutions for workforce challenges.',
  },
  {
    icon: Award,
    title: 'Focus on what your team does best.',
    description: 'Spend your time closing deals and delivering world-class training while we handle prospect discovery and qualification.',
  },
];

const benefitPoints = [
  {
    icon: ShieldCheck,
    title: 'Zero Retainer Risk',
    desc: 'Pay strictly per qualified lead delivered, ensuring 100% alignment with your revenue growth.',
  },
  {
    icon: Users,
    title: 'Verified GCC Decision-Makers',
    desc: 'Direct connections with HR Directors, CHROs, L&D heads, and C-Suite executives across the Gulf.',
  },
  {
    icon: Target,
    title: 'Context-Rich Intelligence',
    desc: 'Every lead comes with company background, specific workforce pain points, and buyer context.',
  },
  {
    icon: Clock,
    title: 'Time & Cost Efficiency',
    desc: 'Save hundreds of hours of manual research and prospecting for your internal business development team.',
  },
  {
    icon: BarChart3,
    title: 'Consistent Pipeline Growth',
    desc: 'Maintain a predictable stream of enterprise opportunities throughout the year, even in delivery seasons.',
  },
  {
    icon: DollarSign,
    title: 'Maximum ROI & Higher Close Rates',
    desc: 'Engage prospects with pre-identified training needs, leading to shorter sales cycles and higher win rates.',
  },
];

export default async function WhoWeArePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-hero-gradient pt-36 pb-24 relative overflow-hidden">
        <div className="container-site max-w-5xl relative z-10 text-center mx-auto px-6">
          <Reveal>
            <span className="chip mx-auto">Who We Are</span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 leading-[1.15]">
              Who We Are — The GCC Corporate Training <span className="text-primary">Matchmaking Platform</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-3xl mx-auto font-medium">
              We connect corporate training companies with GCC decision-makers who already have a real workforce challenge to solve.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Built for Training Companies - 5 Feature Cards */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="container-site mx-auto px-6">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                Built for Training Companies
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900 font-heading">
                A Predictable Engine for Enterprise Growth
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Designed specifically for corporate training providers seeking sustainable, high-margin client acquisition across the GCC.
              </p>
            </div>
          </Reveal>

          {/* Grid Layout for Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featureCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="h-full bg-slate-50/80 border border-slate-200/80 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:bg-white hover:border-primary/30 hover:-translate-y-1 group flex flex-col justify-between">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 font-poppins leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-base">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Do - Pay Only for Qualified Leads */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80" />
        <div className="container-site max-w-5xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary-300 text-xs font-semibold uppercase tracking-wider mb-6 border border-primary/30">
                <Sparkles size={14} />
                <span>What We Do</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading leading-tight mb-6">
                Pay Only for <span className="text-primary-400">Qualified Leads</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">
                We operate on a zero-retainer, pay-per-lead model designed to eliminate risk for training providers. No monthly setup fees, no promises of arbitrary outreach volume — you pay strictly when we deliver a verified decision-maker who has a confirmed corporate training need.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-primary-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-base">Zero Retainers</h4>
                    <p className="text-slate-400 text-sm mt-1">No ongoing management or setup fees.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-primary-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-base">Verified Buyers</h4>
                    <p className="text-slate-400 text-sm mt-1">Vetted HR & L&D leaders in the GCC.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={22} className="text-primary-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-base">Replacement Guarantee</h4>
                    <p className="text-slate-400 text-sm mt-1">Full replacement if criteria are not met.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Our Clients Choose Us - 6 Benefit Points */}
      <section className="bg-white py-24">
        <div className="container-site mx-auto px-6 max-w-6xl">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full">
                Proven Advantages
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-slate-900 font-heading">
                Why Our Clients Choose Us
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Here is why corporate training leaders partner with PontLook to accelerate their growth.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefitPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Reveal key={index} delay={index * 0.08}>
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/70 hover:border-primary/40 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 font-poppins">
                      {point.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Promise & Call to Action */}
      <section className="bg-gradient-to-b from-slate-50 to-primary-50/40 py-24 border-t border-slate-200/60">
        <div className="container-site max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="bg-white border border-primary-100 p-10 md:p-16 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-6">
                Our Guarantee
              </span>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-heading leading-tight mb-6">
                Our Promise
              </h2>
              
              <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                We deliver verified GCC decision-makers with a confirmed corporate-training need... <span className="text-primary font-bold">No retainer. No risk.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href={`/${lang}/for-providers`} 
                  className="btn-primary flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  Start Receiving Qualified Leads
                  <ArrowRight size={18} className="ms-2 rtl:rotate-180" />
                </Link>
                
                <Link 
                  href={`/${lang}/contact`} 
                  className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-200 transition-all"
                >
                  Book a Discovery Call
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
