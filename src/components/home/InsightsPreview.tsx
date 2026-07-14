import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';

export default function InsightsPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Insights"
          title="Intelligence from the GCC training market"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/research/${p.slug}`} className="card block h-full">
                <span className="chip !py-1 text-xs">{p.category}</span>
                <h3 className="mt-4 text-lg leading-snug">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed">{p.excerpt}</p>
                <p className="mt-4 text-xs text-slate-400">{p.date}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center" delay={0.15}>
          <Link href="/research" className="btn-secondary">
            All insights <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
