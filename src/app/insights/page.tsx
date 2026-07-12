import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Intelligence on the GCC corporate training market — HR & leadership, AI & workforce, market analysis, and how we qualify opportunities.',
};

const categories = ['All', 'HR & Leadership', 'GCC Market', 'AI & Workforce', 'Corporate Training'];

export default function InsightsPage({ searchParams }: { searchParams: { category?: string } }) {
  const active = searchParams.category && categories.includes(searchParams.category) ? searchParams.category : 'All';
  const posts = getAllPosts().filter((p) => active === 'All' || p.category === active);

  return (
    <div className="bg-hero-gradient min-h-screen">
      <section className="container-site pt-36 pb-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="chip">Insights</span>
          <h1 className="mt-5 text-4xl font-bold">Intelligence from the GCC training market</h1>
          <p className="mt-4 text-lg">
            Market analysis, HR and leadership insight, and a transparent look at how we qualify
            opportunities.
          </p>
        </Reveal>

        <nav aria-label="Categories" className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              href={c === 'All' ? '/insights' : `/insights?category=${encodeURIComponent(c)}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === c ? 'bg-primary text-white' : 'bg-white text-body shadow-soft hover:text-primary'
              }`}
            >
              {c}
            </Link>
          ))}
        </nav>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link href={`/insights/${p.slug}`} className="card block h-full">
                <div className="flex items-center justify-between">
                  <span className="chip !py-1 text-xs">{p.category}</span>
                  <span className="text-xs text-slate-400">{p.readingTime}</span>
                </div>
                <h2 className="mt-4 text-lg leading-snug">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed">{p.excerpt}</p>
                <p className="mt-4 text-xs text-slate-400">{p.date}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="mt-16 text-center text-slate-500">No articles in this category yet.</p>
        )}
      </section>
    </div>
  );
}
