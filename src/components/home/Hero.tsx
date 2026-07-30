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
    <section className="relative overflow-hidden bg-slate-950 pt-24 pb-20 lg:pt-36 lg:pb-40 min-h-[92vh] flex flex-col justify-center text-white">
      {/* Background Video Loop with High-Contrast Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/skyline-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-25 transform-gpu"
        >
          <source src="/videos/skyline-loop.mp4" type="video/mp4" />
        </video>
        
        {/* Fallback Image */}
        <Image
          src="/skyline-bg.jpg"
          alt="GCC Skyline"
          fill
          className="object-cover scale-105 opacity-20 -z-10"
          priority
        />

        {/* High-Contrast HP/Vercel-style Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/90 to-slate-950 pointer-events-none" />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-blue-600/20 via-indigo-500/15 to-blue-400/20 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute top-10 start-1/4 w-[400px] h-[400px] bg-primary/15 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
        <div className="absolute bottom-10 end-1/4 w-[450px] h-[450px] bg-indigo-500/15 blur-3xl -z-10 transform-gpu pointer-events-none rounded-full" />
      </div>

      <div className="container-site relative z-10 mx-auto flex flex-col items-center text-center px-6 sm:px-8 lg:px-12">
        <m.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[960px] flex flex-col items-center transform-gpu will-change-transform"
        >
          {/* Top Enterprise Announcement Badge */}
          <m.div 
            variants={itemVariants} 
            className="mb-6 inline-flex items-center gap-2 backdrop-blur-md bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full px-4.5 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-sm shadow-blue-500/10"
          >
            <ShieldCheck size={16} className="text-blue-400 shrink-0" />
            <span className="font-sans">
              Transforming GCC Workforces
            </span>
          </m.div>

          {/* Main Headline */}
          <m.h1
            variants={itemVariants}
            className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.12] drop-shadow-md font-poppins"
          >
            {dict.hero.headline}
          </m.h1>

          {/* Subtitle */}
          <m.p
            variants={itemVariants}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-300 max-w-[780px] tracking-wide leading-relaxed font-sans font-normal"
          >
            {dict.hero.subtitle}
          </m.p>

          {/* Dual Action CTAs */}
          <m.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 sm:gap-5"
          >
            {/* Primary Button with Hover Gradient Glow */}
            <Link href={`/${lang}/for-providers`}>
              <m.div
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 transform-gpu hover:-translate-y-0.5 flex justify-center items-center w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-full cursor-pointer"
              >
                <Building2 size={18} className="me-2 text-white/90" />
                {dict.hero.btn_provider}
                <ArrowRight size={17} className="ms-2 rtl:-scale-x-100" />
              </m.div>
            </Link>
            
            {/* Secondary Glassmorphic Button */}
            <Link href={`/${lang}/find-training`}>
              <m.div
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex justify-center items-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-white border border-slate-700/80 bg-slate-900/80 backdrop-blur-md hover:bg-slate-800 hover:border-slate-600 rounded-full shadow-sm transform-gpu cursor-pointer transition-all"
              >
                <Target size={18} className="me-2 text-slate-300" />
                {dict.hero.btn_buyer}
              </m.div>
            </Link>
          </m.div>

          {/* Quick Metrics Bar */}
          <m.div 
            variants={itemVariants} 
            className="mt-14 pt-8 border-t border-slate-800/80 w-full max-w-2xl grid grid-cols-3 gap-4 text-center"
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold font-poppins text-white flex items-center justify-center gap-1.5">
                <ShieldCheck size={18} className="text-blue-400" />
                <span>100%</span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">Verified Decision-Makers</p>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-poppins text-white flex items-center justify-center gap-1.5">
                <TrendingUp size={18} className="text-emerald-400" />
                <span>Zero</span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">Monthly Retainer Risk</p>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-poppins text-white flex items-center justify-center gap-1.5">
                <Building2 size={18} className="text-indigo-400" />
                <span>6</span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">GCC Markets Covered</p>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
