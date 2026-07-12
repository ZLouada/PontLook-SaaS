import Reveal from '@/components/shared/Reveal';

const stats = [
  { value: '$1.2B+', label: 'GCC corporate training market' },
  { value: '68%', label: 'of GCC firms report skills gaps' },
  { value: '30 days', label: 'typical time-to-first-opportunity' },
  { value: '0', label: 'retainers — pay per qualified lead' },
];

export default function TrustBar() {
  return (
    <section className="border-y border-primary-100 bg-white">
      <Reveal className="container-site">
        <div className="grid grid-cols-2 gap-8 py-10 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="pb-4 text-center text-xs text-slate-400">
          Illustrative market figures — verified statistics coming soon.
        </p>
      </Reveal>
    </section>
  );
}
