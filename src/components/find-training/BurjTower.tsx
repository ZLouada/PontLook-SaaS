import React from 'react';
import Image from 'next/image';

/**
 * Burj Al Arab vector architectural companion visual for the find-training hero.
 * Renders the exact shape and line illustration provided by the user.
 */
export default function BurjTower({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Ambient lighting halo giving architectural depth against the dark background */}
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[64%] w-[75%] -translate-x-1/2 rounded-full bg-white/[0.045] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[22%] w-[110%] -translate-x-1/2 rounded-[50%] bg-white/[0.03] blur-[70px]" />

      <Image
        src="/burj-al-arab.png"
        alt="Burj Al Arab"
        width={352}
        height={562}
        priority
        className="relative z-10 h-auto max-h-[580px] w-auto max-w-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.02]"
      />
    </div>
  );
}
