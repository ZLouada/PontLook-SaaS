'use client';

import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { useSearchParams } from 'next/navigation';

const categories = ['All', 'HR & Leadership', 'GCC Market', 'AI & Workforce', 'Corporate Training'];

export default function InsightsClient({ posts }: { posts: any[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');
  const active = categoryParam && categories.includes(categoryParam) ? categoryParam : 'All';
  const filteredPosts = posts.filter((p) => active === 'All' || p.category === active);

  return (
    <>
      <nav aria-label="Categories" className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <Link
            key={c}
            href={c === 'All' ? '/research' : `/research?category=${encodeURIComponent(c)}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === c ? 'bg-primary text-white' : 'bg-white text-body shadow-soft hover:text-primary'
            }`}
          >
            {c}
          </Link>
        ))}
      </nav>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <Link href={`/research/${p.slug}`} className="card block h-full">
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
      {filteredPosts.length === 0 && (
        <p className="mt-16 text-center text-slate-500">No articles in this category yet.</p>
      )}
    </>
  );
}
