import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import '../globals.css';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-[#08090A] pt-24">
      <div className="container-site text-center mx-auto px-4">
        <p className="font-heading text-6xl font-bold text-white/30 tracking-tight">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-white font-heading tracking-[-0.03em]">
          This page does not exist
        </h1>
        <p className="mx-auto mt-3 max-w-md text-neutral-400 text-sm sm:text-base font-sans">
          The page you are looking for may have moved. Let us get you back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/en" className="btn-primary inline-flex items-center gap-2">
            <span>Back to home</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

