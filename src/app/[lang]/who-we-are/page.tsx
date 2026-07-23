import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import FAQAccordion from '@/components/faq/FAQAccordion';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently Asked Questions about PontLook.',
};

const faqs = [
  { question: "What does your PontLook do?", answer: "We help corporate training providers reach verified GCC decision-makers who have a relevant training need and a reason to speak." },
  { question: "Do you provide corporate training?", answer: "No. We do not deliver training programmes; we connect specialist training companies with qualified corporate buyers." },
  { question: "Who do you help?", answer: "We work with mid-sized corporate training providers offering leadership, soft skills, digital transformation, compliance, onboarding, and workforce-development programmes." },
  { question: "Which decision-makers do you target?", answer: "We identify and qualify CEOs, Managing Directors, HR Directors, CHROs, and L&D Managers who influence or own training decisions." },
  { question: "Which markets do you cover?", answer: "Our focus is the GCC: the UAE, Saudi Arabia, Qatar, Kuwait, and Bahrain." },
  { question: "Which industries do you target?", answer: "We focus on construction, real estate, financial services, technology, healthcare, hospitality, manufacturing, and logistics." },
  { question: "Is this just a contact list?", answer: "No. A contact list gives you names and emails; we provide researched prospects with context on their role, company, pain point, and potential need." },
  { question: "How do you qualify each lead?", answer: "We verify the person’s current role, company fit, industry, business challenge, and the evidence that makes your training offer relevant." },
  { question: "How does your pricing work?", answer: "You pay per qualified lead delivered and accepted—rather than paying a monthly retainer for activity or promises." },
  { question: "Do I need to sign a long-term contract?", answer: "No. Our model is designed without a monthly retainer or long-term commitment; you pay for qualified opportunities delivered." },
  { question: "What happens if a lead does not meet our criteria?", answer: "We replace any lead that does not meet the qualification criteria agreed with you at the beginning." },
  { question: "Can you target UAE or Saudi Arabia only?", answer: "Yes. We can focus campaigns on one GCC country, selected cities, or a wider GCC market based on where you deliver training." },
  { question: "Will the leads be relevant to our programme?", answer: "That is the goal: we match the prospect’s documented business problem with the type of training your company provides." },
  { question: "Do you guarantee that every lead will close?", answer: "No ethical agency can guarantee a sale. We guarantee qualified, researched opportunities; your offer, follow-up, sales process, and pricing determine the final result." },
  { question: "What do we need to provide before starting?", answer: "You tell us your ideal client profile, training solutions, target industries, preferred countries, decision-maker roles, and lead qualification criteria." },
  { question: "How quickly can we get started?", answer: "Once we agree on your targeting and lead criteria, we begin research and outreach to identify suitable opportunities." },
];

export default function FAQPage({ params: { lang } }: { params: { lang: string } }) {
  return (
    <>
      <section className="bg-hero-gradient pt-36 pb-20 relative overflow-hidden">
        <div className="container-site max-w-4xl relative z-10 text-center mx-auto">
          <Reveal>
            <span className="chip mx-auto">Help & Information</span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-slate-900">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about how PontLook connects corporate training companies with qualified GCC decision-makers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-24" id="faq">
        <div className="container-site max-w-3xl mx-auto">
          <FAQAccordion faqs={faqs} />

          <Reveal delay={0.4}>
            <div className="mt-16 bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-10 rounded-3xl text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
              <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
                We&apos;re here to help. Reach out to our team to discuss your specific needs and how we can support your growth in the GCC.
              </p>
              <Link href={`/${lang}/contact`} className="btn-primary inline-flex">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
