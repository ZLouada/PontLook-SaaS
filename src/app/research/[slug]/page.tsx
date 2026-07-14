import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAllPosts, getPost } from '@/lib/posts';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function InsightPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="bg-hero-gradient">
      <article className="container-site max-w-3xl pt-36 pb-24">
        <Link href="/research" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          <ArrowLeft size={15} /> All insights
        </Link>
        <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
          <span className="chip !py-1 text-xs">{post.category}</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
        <div className="prose-custom mt-10">
          <MDXRemote source={post.content} />
        </div>
        <div className="mt-14 rounded-3xl bg-cta-gradient p-8 text-center sm:p-10">
          <h2 className="text-2xl font-bold !text-white">Facing this challenge in your organization?</h2>
          <p className="mt-2 text-primary-100">Tell us about it — we’ll match you with providers who’ve solved it before.</p>
          <Link href="/find-training" className="btn mt-6 bg-white text-primary shadow-lifted hover:bg-primary-50">
            Start the needs assessment <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </div>
  );
}
