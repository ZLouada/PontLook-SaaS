'use client';

import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight, ShieldCheck, Building2, Target } from 'lucide-react';
import { m } from 'framer-motion';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32 border-t border-slate-800">
      {/* Ambient Mesh Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-blue-500/20 blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/20 blur-3xl pointer-events-none rounded-full" />

      <div className="container-site relative z-10 px-6 sm:px-8 lg:px-12 text-center max-w-5xl mx-auto">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 mb-6 shadow-sm">
            <ShieldCheck size={15} className="text-blue-400" />
            <span>Outsourced Growth Engine</span>
          </div>

          <h2 className="mx-auto max-w-4xl text-3xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] font-poppins drop-shadow-md">
            Stop chasing. Start closing with companies that already need you.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed font-sans font-normal">
            Join the GCC’s intelligence-driven training marketplace — as a provider or as a buyer.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/en/for-providers">
              <m.div 
                whileHover={{ y: -3, boxShadow: '0 20px 35px -10px rgba(36,81,191,0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary inline-flex justify-center items-center px-8 py-4 text-base font-semibold rounded-full shadow-xl shadow-primary/30 transform-gpu cursor-pointer"
              >
                <Building2 size={18} className="me-2 text-white/90" />
                Become a partner provider 
                <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
              </m.div>
            </Link>

            <Link href="/en/find-training">
              <m.div 
                whileHover={{ y: -3, boxShadow: '0 15px 30px -10px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex justify-center items-center px-8 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full shadow-sm transform-gpu cursor-pointer transition-all"
              >
                <Target size={18} className="me-2 text-slate-300" />
                Find corporate training
              </m.div>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
