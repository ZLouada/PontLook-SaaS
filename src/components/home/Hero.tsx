'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';
import { ShieldCheck, Building2, TrendingUp, ArrowRight, Target } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 18,
      mass: 0.9,
    },
  },
};

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-20 lg:pt-32 lg:pb-36 min-h-[92vh] flex flex-col justify-center">
      {/* Premium Full-Bleed Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/skyline-bg.jpg"
          alt="GCC Skyline"
          fill
          className="object-cover scale-105 opacity-20"
          priority
        />
        {/* Advanced Gradient Mask */}
        <div
          className="absolute inset-0 bg-background"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 50%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 50%, black 100%)'
          }}
        />

        {/* Ambient Glow Orbs - $25,000 Premium SaaS Mesh */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-600/15 via-indigo-500/10 to-blue-400/15 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute top-10 start-1/4 w-[350px] h-[350px] bg-primary/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute bottom-10 end-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />

        {/* Backdrop Blur Layer */}
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
      </div>

      <div className="container-site relative z-10 mx-auto flex flex-col items-center text-center px-6 sm:px-8 lg:px-12">
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[940px] flex flex-col items-center transform-gpu will-change-transform"
        >
          {/* Top Enterprise B2B Badge */}
          <m.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/70 backdrop-blur-md px-4.5 py-1.5 shadow-sm shadow-slate-900/5">
            <ShieldCheck size={16} className="text-primary shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-800 font-sans">
              Transforming GCC Workforces
            </span>
          </m.div>

          {/* Main Headline */}
          <m.h1
            variants={itemVariants}
            className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[70px] leading-[1.12] drop-shadow-sm font-poppins"
          >
            {dict.hero.headline}
          </m.h1>

          {/* Subtitle */}
          <m.p
            variants={itemVariants}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-600 max-w-[760px] tracking-wide leading-relaxed font-sans font-normal"
          >
            {dict.hero.subtitle}
          </m.p>

          {/* Action Buttons */}
          <m.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 sm:gap-5"
          >
            {/* Primary Button */}
            <Link href={`/${lang}/for-providers`}>
              <m.div
                whileHover={{ y: -3, boxShadow: '0 20px 35px -10px rgba(36,81,191,0.35)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="btn-primary flex justify-center items-center w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-full shadow-lg shadow-primary/20 transform-gpu cursor-pointer"
              >
                <Building2 size={18} className="me-2 text-white/90" />
                {dict.hero.btn_provider}
                <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
              </m.div>
            </Link>

            {/* Secondary Glassmorphic Button */}
            <Link href={`/${lang}/find-training`}>
              <m.div
                whileHover={{ y: -3, boxShadow: '0 15px 30px -10px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex justify-center items-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-900 border border-slate-200/80 bg-white/80 backdrop-blur-md hover:bg-white hover:border-slate-300 rounded-full shadow-sm transform-gpu cursor-pointer"
              >
                <Target size={18} className="me-2 text-slate-700" />
                {dict.hero.btn_buyer}
              </m.div>
            </Link>
          </m.div>

          {/* Quick Metrics Bar */}
          <m.div
            variants={itemVariants}
            className="mt-14 pt-8 border-t border-slate-200/60 w-full max-w-2xl grid grid-cols-3 gap-4 text-center"
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 flex items-center justify-center gap-1">
                <ShieldCheck size={18} className="text-primary" />
                <span>100%</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Verified Decision-Makers</p>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 flex items-center justify-center gap-1">
                <TrendingUp size={18} className="text-emerald-500" />
                <span>Zero</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Monthly Retainer Risk</p>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 flex items-center justify-center gap-1">
                <Building2 size={18} className="text-indigo-500" />
                <span>6</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">GCC Markets Covered</p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
