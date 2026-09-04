import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PontLook Terms of Service covering service overview, eligibility (13+), account registration, payment authorization, limited license, disclaimers, and governing law (San Francisco, CA / Delaware).',
};

export default async function TermsOfServicePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-hero-gradient pt-36 pb-16 relative overflow-hidden">
        <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-6">
          <Reveal>
            <span className="chip mx-auto">Legal & Terms</span>
            <h1 className="mt-6 text-4xl font-semibold sm:text-5xl lg:text-6xl text-slate-800 leading-tight font-heading">
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Effective Date: August 3, 2026 | Operates under Firstnestcare, LLC
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="container-site max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="prose prose-slate max-w-none space-y-12 text-slate-700 leading-relaxed font-sans">
              {/* 1. Service Overview */}
              <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/70">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  1. Service Overview & Agreement
                </h2>
                <p className="mb-4">
                  These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website, services, applications, and tools offered by PontLook (&quot;PontLook,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated under <strong>Firstnestcare, LLC</strong>.
                </p>
                <p>
                  PontLook is a B2B corporate training matchmaking platform designed to identify GCC organizations with active workforce challenges and connect them with qualified corporate training providers. By accessing or using our platform, you agree to be bound by these Terms and our <Link href={`/${lang}/privacy-policy`} className="text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>

              {/* 2. Eligibility */}
              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  2. Eligibility (Age 13+)
                </h2>
                <p className="mb-4">
                  You must be at least 13 years of age (or the legal minimum age in your jurisdiction) to access or use the PontLook platform. If you are using our services on behalf of a company, organization, or legal entity, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>You have full legal authority to bind that entity to these Terms.</li>
                  <li>Your registration and use of the services comply with all applicable local, state, national, and international laws and regulations.</li>
                  <li>All information you provide to PontLook is accurate, current, and complete.</li>
                </ul>
              </div>

              {/* 3. Account Registration & Responsibilities */}
              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  3. Account Registration & Responsibilities
                </h2>
                <p className="mb-4">
                  To access certain features of our matchmaking services or client dashboards, you may be required to register for an account. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Maintain confidential login credentials and prevent unauthorized access to your account.</li>
                  <li>Promptly notify us at <a href="mailto:contact@pontlook.com" className="text-primary hover:underline">contact@pontlook.com</a> if you suspect any security breach or unauthorized use.</li>
                  <li>Accept full responsibility for all activities conducted under your account credentials.</li>
                </ul>
              </div>

              {/* 4. Payment Authorization & Pricing */}
              <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/70">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  4. Payment Authorization & Financial Terms
                </h2>
                <p className="mb-4">
                  PontLook operates on a zero-retainer, pay-per-lead model for training provider partnerships as well as verified store sales. By placing an order or authorizing a lead delivery package:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-slate-600">
                  <li>
                    <strong>Payment Methods:</strong> You authorize PontLook and its designated payment processors (including Fourthwall, credit card networks, and PayPal) to charge your selected payment method for all agreed fees and applicable taxes.
                  </li>
                  <li>
                    <strong>Fee Schedule:</strong> Fees for lead packages or services are specified at the time of order confirmation or in your executed provider agreement.
                  </li>
                  <li>
                    <strong>No Retainers:</strong> Services are billed strictly based on delivered and qualified leads or approved transactions; no ongoing monthly setup fees apply unless explicitly agreed in writing.
                  </li>
                  <li>
                    <strong>Late Payments:</strong> Unpaid invoices may incur late interest at the rate of 1.5% per month or the maximum rate permitted by applicable law.
                  </li>
                </ul>
              </div>

              {/* 5. Limited License & Intellectual Property */}
              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  5. Limited License & Intellectual Property
                </h2>
                <p className="mb-4">
                  Subject to your compliance with these Terms, PontLook grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use the platform for internal business operations.
                </p>
                <p className="mb-4 font-semibold text-slate-800">
                  Intellectual Property Ownership:
                </p>
                <p className="text-slate-600">
                  All software, platform code, design elements, graphics, text, branding, logos, trademarks, and match qualification algorithms are the sole property of Firstnestcare, LLC / PontLook or its licensors. You may not copy, modify, distribute, reverse engineer, or create derivative works without prior written authorization.
                </p>
              </div>

              {/* 6. Prohibited Activities */}
              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  6. Prohibited Conduct
                </h2>
                <p className="mb-4">
                  When using PontLook, you agree that you will not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Scrape, mine, or harvest data from the platform using automated tools, bots, or scripts.</li>
                  <li>Impersonate any person or entity, or misrepresent your affiliation with a corporate training provider or buyer.</li>
                  <li>Resell, redistribute, or publish lead intelligence data provided by PontLook to unauthorized third parties.</li>
                  <li>Attempt to bypass security measures or disrupt platform infrastructure.</li>
                </ul>
              </div>

              {/* 7. Disclaimers & Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  7. Disclaimers & Limitation of Liability
                </h2>
                <p className="mb-4">
                  THE PLATFORM AND SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="mb-4">
                  WHILE PONTLCOK QUALIFIES DECISION-MAKERS AND MATCHES CORPORATE TRAINING NEEDS, WE DO NOT GUARANTEE THAT EVERY MATCH WILL RESULT IN A CLOSED COMMERCIAL TRANSACTION.
                </p>
                <p className="text-slate-600">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL FIRSTNESTCARE, LLC, PONTLCOK, ITS DIRECTORS, EMPLOYEES, OR PARTNERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM.
                </p>
              </div>

              {/* 8. Governing Law & Jurisdiction */}
              <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/70">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  8. Governing Law & Jurisdiction (San Francisco, CA / Delaware)
                </h2>
                <p className="mb-4">
                  These Terms shall be governed by, construed, and enforced in accordance with the laws of the <strong>State of Delaware</strong> and the <strong>State of California (San Francisco)</strong>, United States, without giving effect to conflict of law principles.
                </p>
                <p className="text-slate-600">
                  Any legal suit, action, or proceeding arising out of or related to these Terms or the PontLook platform shall be instituted exclusively in the state or federal courts located in San Francisco, California or New Castle County, Delaware, and each party irrevocably submits to the jurisdiction of such courts.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
