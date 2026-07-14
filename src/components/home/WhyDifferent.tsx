import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { Target, ShieldCheck, Briefcase, Award, WalletCards, Globe } from 'lucide-react';

const items = [
  {
    icon: Target,
    title: 'Intelligence-driven targeting',
    text: 'We find demand signals in the market — not lists to spam. Every opportunity starts with evidence.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified business pain',
    text: 'Each challenge is confirmed directly with the company before it ever reaches a provider.',
  },
  {
    icon: Briefcase,
    title: 'Validated decision-makers',
    text: 'You talk to the CHRO, CEO, or L&D owner with authority to buy — not a gatekeeper.',
  },
  {
    icon: Award,
    title: 'Qualified opportunities only',
    text: 'Budget, timeline, and scope checked. If it does not meet the bar, you never see it.',
  },
  {
    icon: WalletCards,
    title: 'No retainers',
    text: 'Pay per qualified lead or success-based commission. Your cost tracks your revenue.',
  },
  {
    icon: Globe,
    title: 'GCC specialization',
    text: 'Saudi Arabia, UAE, and the wider GCC — including Saudization and Emiratization dynamics.',
  },
];

export default function WhyDifferent() {
  return (
    <section className="bg-white py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="What You Can Expect"
          title="Built for outcomes, not activity"
          subtitle="Everything we deliver is verified, validated, and qualified before it reaches you."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.08}>
              <div className="card h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                  <it.icon size={21} />
                </span>
                <h3 className="mt-4 text-lg">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
