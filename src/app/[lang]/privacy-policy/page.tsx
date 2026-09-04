import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'PontLook Privacy Policy: Information collection, usage, third-party disclosures (Fourthwall, Google Analytics), cookies, and user rights under Firstnestcare, LLC.',
};

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <>
      <section className="bg-hero-gradient pt-36 pb-16 relative overflow-hidden">
        <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-6">
          <Reveal>
            <span className="chip mx-auto">Legal & Compliance</span>
            <h1 className="mt-6 text-4xl font-semibold sm:text-5xl lg:text-6xl text-slate-800 leading-tight font-heading">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Effective Date: August 3, 2026 | Operates under Firstnestcare, LLC
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 border-t border-slate-100">
        <div className="container-site max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="prose prose-slate max-w-none space-y-12 text-slate-700 leading-relaxed font-sans">
              <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/70">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  1. Overview & Data Controller
                </h2>
                <p className="mb-4">
                  Welcome to PontLook (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). PontLook is a B2B corporate training matchmaking platform operating under <strong>Firstnestcare, LLC</strong>. We are committed to safeguarding the privacy of our website visitors, clients, training providers, and corporate partners.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website at <Link href={`/${lang}`} className="text-primary hover:underline">pontlook.com</Link>, interact with our platform services, purchase products, or communicate with us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  2. Information Collection
                </h2>
                <p className="mb-4">
                  We collect information that you voluntarily provide to us as well as data automatically generated during your visits:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>
                    <strong>Personal & Business Information:</strong> Name, professional title, business email address, phone number, company name, corporate address, industry category, and training requirements submitted via inquiry forms or account setups.
                  </li>
                  <li>
                    <strong>Financial & Transaction Data:</strong> Payment details, credit card or PayPal billing information, invoice history, and order details processed through our secure payment channels.
                  </li>
                  <li>
                    <strong>Technical & Usage Data:</strong> Internet Protocol (IP) address, browser type, device specifications, operating system, referrer URLs, page view durations, and interaction metrics.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  3. How We Use Your Information
                </h2>
                <p className="mb-4">
                  We utilize the collected information for legitimate business purposes, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Facilitating B2B matchmaking between verified GCC corporate buyers and corporate training providers.</li>
                  <li>Processing orders, invoicing, and managing customer account records.</li>
                  <li>Responding to inquiries, customer support requests, and scheduling discovery calls.</li>
                  <li>Optimizing website functionality, service performance, and user experience.</li>
                  <li>Sending administrative notifications, service updates, and relevant marketing communications (where permitted).</li>
                  <li>Ensuring security, detecting fraud, and complying with legal obligations.</li>
                </ul>
              </div>

              <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/70">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  4. Third-Party Disclosures & Service Partners
                </h2>
                <p className="mb-4">
                  We do not sell, rent, or trade your personal information to third parties. We share data only with trusted partners and service providers necessary to operate our services:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-slate-600">
                  <li>
                    <strong>Fourthwall:</strong> We partner with Fourthwall for e-commerce store operations, merchandise fulfillment, and transaction processing. When purchasing merchandise or custom items through our store, your order and payment information is securely processed in accordance with Fourthwall&apos;s privacy and security standards.
                  </li>
                  <li>
                    <strong>Google Analytics:</strong> We use Google Analytics to analyze web traffic, visitor behavior, and site performance. Google Analytics collects anonymized interaction data via cookies to assist us in improving our platform.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Hosting providers, CRM platform providers, email service vendors, and payment processors who operate under strict confidentiality and data protection obligations.
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> We may disclose information if required by law, subpoena, court order, or to protect the rights, safety, and property of Firstnestcare, LLC / PontLook and our users.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  5. Cookies & Tracking Technologies
                </h2>
                <p className="mb-4">
                  PontLook uses cookies, web beacons, and similar tracking technologies to enhance user navigation, measure campaign effectiveness, and deliver personalized content.
                </p>
                <p className="mb-4">
                  Types of cookies we use include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><strong>Essential Cookies:</strong> Necessary for core site functionality and secure authentication.</li>
                  <li><strong>Analytical Cookies:</strong> Managed via Google Analytics to track aggregate usage and traffic patterns.</li>
                  <li><strong>Preference Cookies:</strong> Used to remember user settings such as language preferences.</li>
                </ul>
                <p>
                  You can control or disable cookies through your browser settings. However, disabling essential cookies may impact certain platform features.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  6. User Rights (California & EEA Residents)
                </h2>
                <p className="mb-4">
                  Depending on your jurisdiction, you possess specific rights regarding your personal data:
                </p>
                
                <div className="space-y-4">
                  <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">California Residents (CCPA / CPRA)</h3>
                    <ul className="list-disc pl-6 space-y-1 text-slate-600 text-sm">
                      <li>Right to know what personal data is collected, disclosed, or sold.</li>
                      <li>Right to request deletion of your personal information.</li>
                      <li>Right to correct inaccurate personal data.</li>
                      <li>Right to opt-out of the sale or sharing of personal data (PontLook does not sell user data).</li>
                      <li>Right to non-discrimination for exercising CCPA rights.</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-white border border-slate-200 rounded-2xl">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">European Economic Area (EEA) Residents (GDPR)</h3>
                    <ul className="list-disc pl-6 space-y-1 text-slate-600 text-sm">
                      <li>Right of access to your personal data held by us.</li>
                      <li>Right to rectification of incomplete or inaccurate data.</li>
                      <li>Right to erasure (&quot;Right to be forgotten&quot;).</li>
                      <li>Right to restrict or object to data processing.</li>
                      <li>Right to data portability in a structured, standard format.</li>
                      <li>Right to withdraw consent at any time without affecting lawful processing prior to withdrawal.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  7. Data Retention & Security
                </h2>
                <p className="mb-4">
                  We implement reasonable technical, organizational, and administrative security measures to protect your personal data against unauthorized access, loss, misuse, or alteration. We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or to satisfy legal, accounting, or regulatory requirements.
                </p>
              </div>

              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
                <h2 className="text-2xl font-semibold text-slate-800 mb-4 font-heading">
                  8. Contact Us
                </h2>
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
                </p>
                <div className="text-slate-700 font-medium space-y-1 text-sm">
                  <p className="font-semibold text-slate-800 text-base">Firstnestcare, LLC d/b/a PontLook</p>
                  <p>31 Continental Dr, Newark, Delaware 19713, US</p>
                  <p>Email: <a href="mailto:contact@pontlook.com" className="text-primary hover:underline">contact@pontlook.com</a></p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
