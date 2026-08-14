import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import Link from 'next/link';
import { PackageX, Clock, RefreshCw, CreditCard, ShieldCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Returns & FAQ Policy',
  description: 'Official PontLook Returns & FAQ Policy covering made-to-order product resolutions, 30-day quality issue reporting, cancellation policies, refund processing (PayPal & Credit Cards), and Fourthwall fulfillment partner terms.',
};

const policyHighlights = [
  {
    icon: PackageX,
    title: 'Made-to-Order Products',
    desc: 'Each physical product or custom merchandise piece is printed and fulfilled individually upon order placement.',
  },
  {
    icon: Clock,
    title: '30-Day Resolution Window',
    desc: 'Misprinted, damaged, or defective items must be reported within 30 days of delivery for a replacement or refund.',
  },
  {
    icon: RefreshCw,
    title: 'Order Cancellations',
    desc: 'Orders can be cancelled prior to submission to production. Once in production with Fourthwall, cancellations are locked.',
  },
  {
    icon: CreditCard,
    title: 'Refund Processing',
    desc: 'Approved refunds are credited back to your original payment method (PayPal or Credit Card) within 3-7 business days.',
  },
];

export default async function ReturnsFAQPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-hero-gradient pt-36 pb-16 relative overflow-hidden">
        <div className="container-site max-w-4xl relative z-10 text-center mx-auto px-6">
          <Reveal>
            <span className="chip mx-auto">Customer Support & Policies</span>
            <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
              Returns &amp; FAQ <span className="text-primary">Policy</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Clear, transparent guidelines for merchandise orders, quality assurance, cancellations, and refunds.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quick Highlights Grid */}
      <section className="bg-white py-12 border-t border-slate-100">
        <div className="container-site max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policyHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={index} delay={index * 0.08}>
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16">
        <div className="container-site max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="prose prose-slate max-w-none space-y-12 text-slate-700 leading-relaxed font-sans">
              {/* 1. Made-to-Order Overview */}
              <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/80">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                  1. Made-to-Order Fulfillment Policy
                </h2>
                <p className="mb-4">
                  PontLook merchandise and store items are created using a made-to-order production model in collaboration with our official fulfillment partner, <strong>Fourthwall</strong>.
                </p>
                <p>
                  Because every item is custom printed and manufactured specifically when an order is placed, we do not maintain a warehouse of pre-printed stock. Consequently, we cannot accept standard returns or exchanges for buyer&apos;s remorse, sizing errors, or preference changes.
                </p>
              </div>

              {/* 2. 30-Day Quality Issue Reporting */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                  2. 30-Day Quality Guarantee & Defect Reporting
                </h2>
                <p className="mb-4">
                  We stand by the quality of our merchandise. If your order arrives with any of the following issues, you are entitled to a replacement item at no extra charge or a full refund:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li>Manufacturing, stitching, or material defects.</li>
                  <li>Misprinted, skewed, or discolored graphics.</li>
                  <li>Items damaged during transit.</li>
                  <li>Receiving the incorrect item, color, or size relative to your order receipt.</li>
                </ul>

                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-primary" />
                    How to Submit a Quality Claim:
                  </h3>
                  <ol className="list-decimal pl-6 space-y-2 text-slate-700 text-sm">
                    <li>Contact our support team within <strong>30 days of delivery</strong> at <a href="mailto:contact@pontlook.com" className="text-primary hover:underline">contact@pontlook.com</a>.</li>
                    <li>Provide your order number and full name.</li>
                    <li>Attach clear photographs showing the defect, damage, or misprint alongside the shipping label.</li>
                  </ol>
                  <p className="mt-3 text-xs text-slate-500">
                    Once verified, a replacement will be dispatched immediately, or a refund will be issued without requiring you to ship the defective item back.
                  </p>
                </div>
              </div>

              {/* 3. Cancellation Policy */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                  3. Order Cancellation Policy
                </h2>
                <p className="mb-4">
                  Because production begins rapidly after an order is placed:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>
                    <strong>Pre-Production Cancellations:</strong> You may request an order cancellation by contacting us immediately after ordering. If production has not commenced, your order will be cancelled and fully refunded.
                  </li>
                  <li>
                    <strong>In-Production Orders:</strong> Once Fourthwall transmits the item to the manufacturing queue, the order cannot be cancelled, modified, or recalled.
                  </li>
                </ul>
              </div>

              {/* 4. Refund Processing */}
              <div className="bg-slate-50/80 p-8 rounded-3xl border border-slate-200/80">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                  4. Refund Processing & Payment Authorization
                </h2>
                <p className="mb-4">
                  All approved refunds are submitted to your original form of payment:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-slate-600">
                  <li>
                    <strong>Credit / Debit Cards:</strong> Refunds will appear on your bank statement within 3 to 7 business days, depending on your card issuer.
                  </li>
                  <li>
                    <strong>PayPal:</strong> Refunds credited to PayPal accounts are typically available within 24 to 48 hours.
                  </li>
                  <li>
                    <strong>Currency:</strong> Refunds are issued in the currency of original purchase (USD / local equivalent).
                  </li>
                </ul>
              </div>

              {/* 5. Fourthwall Fulfillment Partner Terms */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 font-heading">
                  5. Fourthwall Fulfillment Partner Terms
                </h2>
                <p className="mb-4">
                  PontLook partners with <strong>Fourthwall</strong> for e-commerce hosting, payment processing, manufacturing, and global logisitic fulfillment. By purchasing merchandise on our store:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Your order is processed securely through Fourthwall&apos;s PCI-compliant checkout infrastructure.</li>
                  <li>Global shipping and delivery times are estimated at checkout based on destination customs and local postal operations.</li>
                  <li>PontLook and Fourthwall adhere strictly to international consumer protection regulations and carrier claims procedures.</li>
                </ul>
              </div>

              {/* 6. Contact & Support */}
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2 font-heading">
                    Need Help With an Order?
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Our support team is ready to assist you with any questions regarding returns, orders, or quality inquiries.
                  </p>
                </div>
                <Link
                  href={`/${lang}/contact`}
                  className="btn-primary inline-flex items-center gap-2 text-sm shrink-0 px-6 py-3 rounded-full"
                >
                  <Mail size={16} />
                  Contact Support
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
