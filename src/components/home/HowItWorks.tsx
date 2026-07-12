import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { Radar, GitMerge, Handshake } from 'lucide-react';

const steps = [
  {
    icon: Radar,
    title: 'We detect the need',
    text: 'Market intelligence surfaces GCC companies with verified workforce challenges — before they start searching.',
  },
  {
    icon: GitMerge,
    title: 'We qualify & match',
    text: 'Decision-makers are validated, budgets and timelines confirmed, then matched to the right provider.',
  },
  {
    icon: Handshake,
    title: 'You close the deal',
    text: 'Providers receive warm introductions to buyers who are ready. No cold outreach, ever.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-sky-gradient py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="How it works"
          title="From verified pain point to signed contract"
          subtitle="Three steps. Zero wasted meetings."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="card h-full">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cta-gradient text-white">
                    <s.icon size={22} />
                  </span>
                  <span className="font-heading text-sm font-bold text-primary-300">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
