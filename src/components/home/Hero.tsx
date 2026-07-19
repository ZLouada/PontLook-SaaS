'use client';

import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useDictionary } from '@/components/providers/DictionaryProvider';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 1,
    },
  },
};

const blobAnimation = {
  animate: {
    x: ['0%', '5%', '-2%', '0%'],
    y: ['0%', '-5%', '3%', '0%'],
  },
  transition: {
    duration: 20,
    repeat: Infinity,
    repeatType: 'mirror' as const,
    ease: 'linear',
  },
};

export default function Hero() {
  const dict = useDictionary();
  const params = useParams();
  const lang = (params?.lang as string) || 'en';

  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-24 lg:pt-56 lg:pb-48 min-h-[90vh] flex flex-col justify-center">
      {/* Premium Full-Bleed Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/skyline-bg.jpg"
          alt="GCC Skyline"
          fill
          className="object-cover scale-105"
          priority
        />
        {/* Advanced gradient masks for seamless integration */}
        <div 
          className="absolute inset-0 bg-background" 
          style={{ 
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 40%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 40%, black 100%)'
          }} 
        />
        
        {/* Fluid Moving Mesh Blobs */}
        <m.div 
          animate={blobAnimation.animate}
          transition={blobAnimation.transition}
          className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/20 mix-blend-multiply" 
        />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />
        
        {/* Elegant edge fading */}
        <div className="absolute inset-y-0 start-0 w-1/3 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-y-0 end-0 w-1/3 bg-gradient-to-l from-background via-background/80 to-transparent" />
      </div>

      <div className="container-site relative z-10 mx-auto flex flex-col items-center text-center px-6 sm:px-8 lg:px-12">
        <m.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[900px] flex flex-col items-center"
        >
          {/* Subtle top badge for premium feel */}
          <m.div variants={itemVariants} className="mb-8 hidden sm:flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/40 backdrop-blur-md px-4 py-1.5 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">Transforming GCC Workforces</span>
          </m.div>

          <m.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.05] drop-shadow-sm"
          >
            {dict.hero.headline}
          </m.h1>

          {/* Upgraded Typography */}
          <m.p
            variants={itemVariants}
            className="mt-8 sm:mt-10 text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-[700px] tracking-wide leading-relaxed font-medium"
          >
            {dict.hero.subtitle}
          </m.p>

          <m.div
            variants={itemVariants}
            className="mt-12 sm:mt-14 flex flex-col w-full sm:w-auto sm:flex-row items-center gap-5 sm:gap-6"
          >
            {/* Primary Button */}
            <Link href={`/${lang}/for-providers`} passHref legacyBehavior>
              <m.a
                whileHover={{ y: -2, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="btn-primary flex justify-center items-center w-full sm:w-auto px-8 py-4 text-base rounded-full"
              >
                {dict.hero.btn_provider}
              </m.a>
            </Link>
            
            {/* Secondary Glassmorphic Button */}
            <Link href={`/${lang}/find-training`} passHref legacyBehavior>
              <m.a
                whileHover={{ y: -2, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex justify-center items-center w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-900 border border-slate-200/50 bg-white/70 backdrop-blur-xl hover:bg-white hover:border-slate-300 rounded-full"
              >
                {dict.hero.btn_buyer}
              </m.a>
            </Link>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
