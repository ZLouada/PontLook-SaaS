import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import {
  ArrowRight,
  TrendingUp,
  Activity,
  Zap,
  Clock,
  Target,
  CheckCircle2,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Who We Are',
  description: 'We connect corporate training companies with GCC decision-makers who already have a real workforce challenge to solve.',
};

const benefits = [
  {
    icon: TrendingUp,
    title: 'Stop relying on unpredictable referrals',
    text: 'Build a proactive, reliable pipeline of qualified opportunities.'
  },
  {
    icon: Activity,
    title: 'Keep your pipeline active during delivery',
    text: 'Your business development doesn\'t pause when you are delivering a program.'
  },
  {
    icon: Zap,
    title: 'Use an outsourced growth engine',
    text: 'Scale without the overhead of hiring and managing an internal sales team.'
  },
  {
    icon: Clock,
    title: 'Start relevant conversations faster',
    text: 'Skip the cold outreach. Talk to decision-makers who want to hear from you.'
  },
  {
    icon: Target,
    title: 'Focus on what your team does best',
    text: 'We handle the prospecting; you handle the closing and delivery.'
  }
];

const whyChooseUs = [
  'Keep trainers focused on delivery',
  'Reduce referral dependence',
  'Reach hard-to-access decision-makers',
  'Avoid retainers',
  'Predictable pipeline',
  'Scale without overhead'
];

type Props = {
  params: { lang: string };
};

export default function WhoWeArePage({ params: { lang } }: Props) {
  return (
    <>
      <section className="bg-hero-gradient pt-36 pb-20 relative overflow-hidden">
        <div className="container-site max-w-4xl relative z-10">
          <Reveal>
            <span className="chip">The GCC Corporate Training Matchmaking Platform</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-slate-900">
              We connect corporate training companies with <span className="text-primary">GCC decision-makers</span> who already have a real workforce challenge to solve.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-3xl">
              We are not a traditional lead generation agency. We are a specialist matchmaking platform built exclusively for the Middle East corporate training market.
            </p>
            <p className="mt-6 text-xl font-semibold text-slate-800">
              The right training provider. The right decision-maker. The right business problem.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`/${lang}/for-providers#apply`} className="btn-primary">
                Get Qualified Leads <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Built for Training Companies */}
      <section className="bg-white py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Built for Training Companies"
            title="Accelerate your growth"
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.1}>
                <div className="card h-full !p-8 bg-white hover:shadow-xl transition-shadow duration-300 border border-slate-100 rounded-2xl">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary mb-6">
                    <b.icon size={26} strokeWidth={1.5} />
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">{b.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do / Contrast */}
      <section className="bg-slate-50 py-24 relative">
        <div className="absolute inset-0 bg-secondary-50/50 mix-blend-multiply" />
        <div className="container-site relative z-10">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200/60">
              <div className="space-y-4 pr-6">
                <div className="inline-flex items-center gap-2 text-rose-500 font-semibold bg-rose-50 px-4 py-2 rounded-full text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  Traditional Agencies
                </div>
                <h3 className="text-2xl font-bold text-slate-400 line-through decoration-rose-300 decoration-2">Most agencies ask for a retainer before results.</h3>
                <p className="text-slate-500">Vague reporting, long-term contracts, and no guarantee of closing deals.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden md:block" />
                <div className="space-y-4 md:pl-8">
                  <div className="inline-flex items-center gap-2 text-primary font-semibold bg-primary-50 px-4 py-2 rounded-full text-sm">
                    <ShieldCheck size={16} />
                    Our Approach
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">We only get paid when we deliver a qualified lead.</h3>
                  <p className="text-slate-600 text-lg">No retainer. No vague reporting. We win when you get real opportunities.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Our Clients Choose Us */}
      <section className="bg-white py-24">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Why Our Clients Choose Us"
                  title="Dependable opportunity generation without building an internal sales team."
                  alignment="left"
                />
                <div className="mt-10 space-y-4">
                  {whyChooseUs.map((item, i) => (
                    <Reveal key={item} delay={0.1 * i}>
                      <div className="flex items-center gap-4 bg-slate-50/80 rounded-xl p-4 border border-slate-100">
                        <CheckCircle2 className="text-secondary shrink-0" size={24} />
                        <span className="text-lg font-medium text-slate-800">{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
            <div>
              <Reveal delay={0.3} className="bg-gradient-to-br from-primary-50 to-white p-10 rounded-3xl border border-primary-100/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Building2 size={120} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 relative z-10">The Ownership Split</h3>
                <p className="text-lg text-slate-700 leading-relaxed relative z-10">
                  <strong className="text-primary">We take ownership</strong> of research, prospecting, qualification, and initial outreach.
                </p>
                <p className="mt-4 text-lg text-slate-700 leading-relaxed relative z-10">
                  <strong className="text-primary">So your team can take ownership</strong> of the conversation, proposal, and delivery.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-400 rounded-full blur-[100px] opacity-20"></div>
        
        <div className="container-site relative z-10 text-center max-w-4xl mx-auto">
          <Reveal>
            <span className="chip bg-white/10 text-white border-white/20">Our Promise</span>
            <h2 className="mt-8 text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              We deliver verified GCC decision-makers with a confirmed corporate-training need and a relevant reason to speak with you.
            </h2>
            <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex-1">
                <p className="text-xl font-medium text-white">You only pay per qualified lead delivered.</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex-1">
                <p className="text-xl font-medium text-white">If a lead does not meet the criteria we agreed, we replace it.</p>
              </div>
            </div>
            <p className="mt-12 text-2xl font-bold text-primary-200">
              No retainer. No risk. Just qualified opportunities for your training business.
            </p>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${lang}/for-providers#apply`} className="btn-primary w-full sm:w-auto h-14 px-8 text-[15px] flex items-center justify-center">
                Start Receiving Qualified Leads
              </Link>
              <Link href={`/${lang}/contact`} className="btn-secondary w-full sm:w-auto h-14 px-8 text-[15px] bg-transparent text-white border border-white/20 hover:bg-white/10 flex items-center justify-center transition-colors rounded-full font-semibold">
                Book a Discovery Call
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
