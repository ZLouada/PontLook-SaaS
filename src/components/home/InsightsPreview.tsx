import Link from 'next/link';
import SectionHeading from '@/components/shared/SectionHeading';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/posts';

export default function InsightsPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-background py-24 border-t border-border">
      <div className="container-site">
        <SectionHeading
          eyebrow="Insights"
          title="Intelligence from the GCC training market"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/research/${p.slug}`} className="group block h-full">
                <div className="card h-full flex flex-col p-0 overflow-hidden hover:shadow-lifted border-transparent hover:border-border transition-all">
                  <div className={`h-32 w-full bg-gradient-to-r ${['from-blue-500 to-cyan-400', 'from-violet-500 to-fuchsia-500', 'from-emerald-400 to-teal-500'][i % 3]} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                      <span className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-foreground-muted tracking-wide uppercase">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="text-[18px] leading-snug font-semibold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-foreground-muted flex-1">{p.excerpt}</p>
                    <p className="mt-6 text-xs font-medium text-slate-400">{p.date}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center" delay={0.15}>
          <Link href="/research" className="inline-flex items-center text-[15px] font-semibold text-primary hover:text-primary-600 transition-colors">
            All insights <ArrowRight size={18} className="ml-1 rtl:-scale-x-100" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
