import type { Metadata } from 'next';
import Reveal from '@/components/shared/Reveal';
import { getAllPosts } from '@/lib/posts';
import InsightsClient from './InsightsClient';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Intelligence on the GCC corporate training market — HR & leadership, AI & workforce, market analysis, and how we qualify opportunities.',
};

export default function InsightsPage() {
  const posts = getAllPosts();

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
        <Suspense fallback={<p className="mt-10 text-center">Loading insights...</p>}>
          <InsightsClient posts={posts} />
        </Suspense>
      </section>
    </div>
  );
}
