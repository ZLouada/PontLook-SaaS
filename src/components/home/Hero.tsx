'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Building2, Flame, ShieldCheck, Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-36 pb-20 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-primary-200/40 blur-3xl"
      />
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="chip">
              <ShieldCheck size={15} className="mr-1.5" /> GCC market specialists · Saudi Arabia · UAE
            </span>
          </motion.div>
          <motion.h1
            className="mt-6 text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-[3.4rem]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            Stop chasing companies. Start talking to companies that{' '}
            <span className="text-primary">already need training.</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            We identify GCC organizations experiencing verified workforce challenges and connect
            them with the right corporate training providers. Qualified opportunities only — no
            retainers, no cold outreach.
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <Link href="/for-providers" className="btn-primary">
              I&apos;m a Training Provider <ArrowRight size={17} />
            </Link>
            <Link href="/find-training" className="btn-secondary">
              I&apos;m Looking for Corporate Training
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass animate-float rounded-3xl p-7">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <BadgeCheck size={14} /> Verified Opportunity
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
                <Flame size={13} /> Hot · 92
              </span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                <Building2 size={20} />
              </span>
              <div>
                <p className="font-heading text-sm font-semibold text-ink">
                  Leading Saudi Retail Group
                </p>
                <p className="text-xs text-slate-500">Riyadh · 1,200 employees</p>
              </div>
            </div>
            <div className="mt-5 space-y-2.5 text-sm">
              <p className="flex items-center gap-2">
                <BadgeCheck size={15} className="shrink-0 text-primary" />
                Decision-maker verified · CHRO
              </p>
              <p className="flex items-center gap-2">
                <Wallet size={15} className="shrink-0 text-primary" />
                Budget confirmed · starts within 30 days
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Leadership Development', 'Middle Managers', 'Saudization'].map((t) => (
                <span key={t} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-600">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full bg-primary-300/30 blur-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
