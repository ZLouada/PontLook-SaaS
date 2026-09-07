import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import '../globals.css';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-transparent pt-24 text-white">
      <div className="container-site text-center mx-auto">
        <p className="font-heading text-6xl font-bold text-blue-500">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white">This page doesn’t exist</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-300">
          The page you’re looking for may have moved. Let’s get you back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary">Back to home <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}
