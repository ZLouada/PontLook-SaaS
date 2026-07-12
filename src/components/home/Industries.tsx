import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';

const industries = [
  'Banking & Finance', 'Retail & E-commerce', 'Healthcare', 'Oil, Gas & Energy',
  'Construction & Real Estate', 'Government & Semi-Government', 'Hospitality & Tourism',
  'Technology & Telecom', 'Logistics & Supply Chain', 'Manufacturing', 'Insurance', 'Education',
];

export default function Industries() {
  return (
    <section className="bg-sky-gradient py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Industries served"
          title="Wherever the GCC is hiring, upskilling, and transforming"
        />
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3" delay={0.1}>
          {industries.map((ind) => (
            <span key={ind} className="chip bg-white">
              {ind}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
