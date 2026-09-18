import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import Link from 'next/link';

import { Locale, i18n } from '@/i18n/config';

import { constructAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }> | { lang: Locale };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang as Locale) || 'en';
  const isAr = lang === 'ar';

  const title = isAr
    ? 'سياسة الخصوصية | منصة PontLook للتدريب'
    : 'Privacy Policy | PontLook B2B Matchmaking';
  const description = isAr
    ? 'سياسة الخصوصية الرسمية لمنصة PontLook: كيف نحمي بيانات العملاء، إدارة ملفات تعريف الارتباط، والامتثال للأنظمة القانونية.'
    : 'PontLook Privacy Policy: Read how we protect data, handle enterprise business inquiries, manage cookies, and adhere to privacy regulations.';

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: constructAlternates(lang, 'privacy-policy'),
    openGraph: {
      title,
      description,
      url: `https://pontlook.com/${lang}/privacy-policy`,
      siteName: 'PontLook',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ lang: Locale }> | { lang: Locale } }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const isAr = lang === 'ar';

  return (
    <>
      <section className="bg-[#08090A] pt-36 pb-16 relative overflow-hidden border-b border-[#26282D]">
        <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-6">
          <Reveal>
            <span className="chip mx-auto">{isAr ? 'الامتثال والخصوصية' : 'Legal & Compliance'}</span>
            <h1 className="mt-6 text-4xl font-semibold sm:text-5xl lg:text-6xl text-white leading-tight font-heading tracking-[-0.03em]">
              {isAr ? (
                <>
                  سياسة <span className="text-white">الخصوصية</span>
                </>
              ) : (
                <>
                  Privacy <span className="text-white">Policy</span>
                </>
              )}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-sans">
              {isAr
                ? 'تاريخ السريان: 3 أغسطس 2026 | تعمل تحت إدارة Firstnestcare, LLC'
                : 'Effective Date: August 3, 2026 | Operates under Firstnestcare, LLC'}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#08090A] py-20">
        <div className="container-site max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="prose prose-invert max-w-none space-y-12 text-neutral-300 leading-relaxed font-sans">
              <div className="bg-[#0F1013] p-8 rounded-2xl sm:rounded-3xl border border-[#26282D]">
                <h2 className="text-2xl font-semibold text-white mb-4 font-heading">
                  1. Overview & Data Controller
                </h2>
                <p className="mb-4">
                  Welcome to PontLook (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). PontLook is a B2B corporate training matchmaking platform operating under <strong>Firstnestcare, LLC</strong>. We are committed to safeguarding the privacy of our website visitors, clients, training providers, and corporate partners.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website at <Link href={`/${lang}`} className="text-white hover:underline underline-offset-4">pontlook.com</Link>, interact with our platform services, purchase products, or communicate with us.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 font-heading">
                  2. Information Collection
                </h2>
                <p className="mb-4">
                  We collect information that you voluntarily provide to us as well as data automatically generated during your visits:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-400">
                  <li>
                    <strong className="text-white">Personal & Business Information:</strong> Name, professional title, business email address, phone number, company name, corporate address, industry category, and training requirements submitted via inquiry forms or account setups.
                  </li>
                  <li>
                    <strong className="text-white">Financial & Transaction Data:</strong> Payment details, credit card or PayPal billing information, invoice history, and order details processed through our secure payment channels.
                  </li>
                  <li>
                    <strong className="text-white">Technical & Usage Data:</strong> Internet Protocol (IP) address, browser type, device specifications, operating system, referrer URLs, page view durations, and interaction metrics.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 font-heading">
                  3. How We Use Your Information
                </h2>
                <p className="mb-4">
                  We utilize the collected information for legitimate business purposes, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-400">
                  <li>Facilitating B2B matchmaking between verified corporate buyers and qualified training providers.</li>
                  <li>Processing orders, invoicing, and managing customer account records.</li>
                  <li>Responding to inquiries, customer support requests, and scheduling discovery calls.</li>
                  <li>Optimizing website functionality, service performance, and user experience.</li>
                  <li>Sending administrative notifications, service updates, and relevant marketing communications (where permitted).</li>
                  <li>Ensuring security, detecting fraud, and complying with legal obligations.</li>
                </ul>
              </div>

              <div className="bg-[#0F1013] p-8 rounded-2xl sm:rounded-3xl border border-[#26282D]">
                <h2 className="text-2xl font-semibold text-white mb-4 font-heading">
                  4. Third Party Disclosures & Service Partners
                </h2>
                <p className="mb-4">
                  We do not sell, rent, or trade your personal information to third parties. We share data only with trusted partners and service providers necessary to operate our services:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-neutral-400">
                  <li>
                    <strong className="text-white">Fourthwall:</strong> We partner with Fourthwall for ecommerce store operations, merchandise fulfillment, and transaction processing. When purchasing merchandise or custom items through our store, your order and payment information is securely processed in accordance with Fourthwall&apos;s privacy and security standards.
                  </li>
                  <li>
                    <strong className="text-white">Google Analytics:</strong> We use Google Analytics to analyze web traffic, visitor behavior, and site performance. Google Analytics collects anonymized interaction data via cookies to assist us in improving our platform.
                  </li>
                  <li>
                    <strong className="text-white">Service Providers:</strong> Hosting providers, CRM platform providers, email service vendors, and payment processors who operate under strict confidentiality and data protection obligations.
                  </li>
                  <li>
                    <strong className="text-white">Legal Compliance:</strong> We may disclose information if required by law, subpoena, court order, or to protect the rights, safety, and property of Firstnestcare, LLC / PontLook and our users.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 font-heading">
                  5. Cookies & Tracking Technologies
                </h2>
                <p className="mb-4">
                  PontLook uses cookies, web beacons, and similar tracking technologies to enhance user navigation, measure campaign effectiveness, and deliver personalized content.
                </p>
                <p className="mb-4">
                  Types of cookies we use include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-400 mb-4">
                  <li><strong className="text-white">Essential Cookies:</strong> Necessary for core site functionality and secure authentication.</li>
                  <li><strong className="text-white">Analytical Cookies:</strong> Managed via Google Analytics to track aggregate usage and traffic patterns.</li>
                  <li><strong className="text-white">Preference Cookies:</strong> Used to remember user settings such as language preferences.</li>
                </ul>
                <p>
                  You can control or disable cookies through your browser settings. However, disabling essential cookies may impact certain platform features.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4 font-heading">
                  6. User Rights (California & EEA Residents)
                </h2>
                <p className="mb-4">
                  Depending on your jurisdiction, you possess specific rights regarding your personal data:
                </p>
                
                <div className="space-y-4">
                  <div className="p-6 bg-[#0F1013] border border-[#26282D] rounded-2xl">
                    <h3 className="text-lg font-semibold text-white mb-2 font-heading">California Residents (CCPA / CPRA)</h3>
                    <ul className="list-disc pl-6 space-y-1 text-neutral-400 text-sm">
                      <li>Right to know what personal data is collected, disclosed, or sold.</li>
                      <li>Right to request deletion of your personal information.</li>
                      <li>Right to correct inaccurate personal data.</li>
                      <li>Right to opt out of the sale or sharing of personal data (PontLook does not sell user data).</li>
                      <li>Right to non discrimination for exercising CCPA rights.</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-[#0F1013] border border-[#26282D] rounded-2xl">
                    <h3 className="text-lg font-semibold text-white mb-2 font-heading">European Economic Area (EEA) Residents (GDPR)</h3>
                    <ul className="list-disc pl-6 space-y-1 text-neutral-400 text-sm">
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
                <h2 className="text-2xl font-semibold text-white mb-4 font-heading">
                  7. Data Retention & Security
                </h2>
                <p className="mb-4">
                  We implement reasonable technical, organizational, and administrative security measures to protect your personal data against unauthorized access, loss, misuse, or alteration. We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or to satisfy legal, accounting, or regulatory requirements.
                </p>
              </div>

              <div className="bg-[#0F1013] p-8 rounded-2xl sm:rounded-3xl border border-[#26282D]">
                <h2 className="text-2xl font-semibold text-white mb-4 font-heading">
                  8. Contact Us
                </h2>
                <p className="mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
                </p>
                <div className="text-neutral-400 font-medium space-y-1 text-sm">
                  <p className="font-semibold text-white text-base">Firstnestcare, LLC d/b/a PontLook</p>
                  <p>31 Continental Dr, Newark, Delaware 19713, US</p>
                  <p>Email: <a href="mailto:contact@pontlook.com" className="text-white underline underline-offset-4 hover:text-neutral-300">contact@pontlook.com</a></p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
