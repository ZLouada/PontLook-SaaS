import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-hero-gradient pt-24">
      <div className="container-site text-center">
        <p className="font-heading text-6xl font-bold text-primary-200">404</p>
        <h1 className="mt-4 text-3xl font-bold">This page doesn’t exist</h1>
        <p className="mx-auto mt-3 max-w-md">
          The page you’re looking for may have moved. Let’s get you back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">Back to home <ArrowRight size={16} /></Link>
          <Link href="/find-training" className="btn-secondary">Find training</Link>
        </div>
      </div>
    </div>
  );
}
