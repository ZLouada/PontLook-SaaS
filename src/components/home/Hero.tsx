'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-28">
      {/* Background Skyline */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/skyline-bg.jpg')] bg-cover bg-bottom bg-no-repeat opacity-80"
        aria-hidden
      />
      {/* Gradient Overlay to fade to white at the bottom */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-white/40 to-white"
        aria-hidden
      />

      <div className="container-site relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
        
        {/* Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur-md"
        >
          <Sparkles size={14} className="text-primary-400" />
          <span>GCC corporate training · Qualified opportunity engine</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 font-heading text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
        >
          Stop chasing companies. Start talking to the ones that{' '}
          <span className="bg-gradient-to-r from-[#2451BF] to-[#3D7BFF] bg-clip-text text-transparent">
            already need training.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-body"
        >
          We identify GCC organizations experiencing real workforce challenges and connect them with the corporate training providers most equipped to solve them.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/for-providers"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2451BF] to-[#3D7BFF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(36,81,191,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(36,81,191,0.35)] active:scale-[0.98]"
          >
            I&apos;m a training provider <ArrowRight size={16} />
          </Link>
          
          <Link
            href="/find-training"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-ink shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white active:scale-[0.98]"
          >
            I&apos;m looking for training <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
