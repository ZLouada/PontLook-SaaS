import { getDictionary } from '@/i18n';
import { Locale, i18n } from '@/i18n/config';
import PartnershipForm from '@/components/providers/PartnershipForm';
import LeadTiers from '@/components/providers/LeadTiers';
import Reveal from '@/components/shared/Reveal';
import SectionHeading from '@/components/shared/SectionHeading';
import { ShieldCheck, Target, DollarSign, Users, Award } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'For Training Providers: B2B Lead Generation | PontLook',
  },
  description:
    'Receive verified corporate training opportunities across Saudi Arabia and the UAE. Zero retainers or subscription fees—pay only for qualified decision-makers.',
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

const providerBenefits = [
  {
    icon: DollarSign,
    title: 'Zero Retainer Risk',
    text: 'No monthly management fees or fixed retainers. You pay strictly per verified decision-maker delivered.',
  },
  {
    icon: Target,
    title: 'Pre-Qualified GCC Buyers',
    text: 'Every lead has confirmed corporate training needs, authority, and explicit problem definitions.',
  },
  {
    icon: Award,
    title: 'Consistent Pipeline',
    text: 'Keep your business development active and predictable throughout the year, even during delivery seasons.',
  },
];

export default async function ForProvidersPage({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  let dict: any = {};

  try {
    dict = await getDictionary(lang);
  } catch (err) {
    console.error('Error loading dictionary:', err);
  }

  return (
    <>
      {/* Light Hero Section */}
      <div className="bg-hero-gradient">
        <section className="container-site pt-36 pb-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="chip mx-auto">For Training Providers</span>
            <h1 className="mt-5 text-4xl font-extrabold sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
              Enterprise Training Leads <span className="text-primary">On Demand</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Connect directly with GCC corporate decision-makers actively seeking training solutions. Zero retainers, 100% pay-per-lead.
            </p>
          </Reveal>
        </section>
      </div>

      {/* Main Content Area */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="container-site max-w-6xl mx-auto px-6 space-y-24">
          {/* 3 Quick Value Props */}
          <div>
            <SectionHeading
              eyebrow="Why Partner with PontLook"
              title="Predictable Enterprise Pipeline"
              subtitle="Designed specifically for GCC training providers seeking verified opportunities without retainers."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {providerBenefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.1}>
                  <div className="card h-full text-center flex flex-col items-center !p-8 bg-slate-50/80 border border-slate-200/80 rounded-3xl hover:bg-white hover:shadow-lg transition-all duration-300">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary mb-4">
                      <b.icon size={24} />
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Lead Tiers Section */}
          <LeadTiers dict={dict} lang={lang} />

          {/* Partnership Form Section */}
          <div id="apply" className="scroll-mt-24">
            <SectionHeading
              eyebrow="Provider Application"
              title="Apply to Join Our Network"
              subtitle="Submit your company credentials and training specializations to begin receiving qualified enterprise requests."
            />
            <Reveal className="mx-auto mt-12 max-w-3xl">
              <PartnershipForm dict={dict} lang={lang} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
