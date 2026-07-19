'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight, Sparkles } from 'lucide-react';

const searchTerms = [
  "We need leadership training for new managers...",
  "Looking for an executive coach in Riyadh...",
  "Upskilling our engineering team in AI...",
  "Tell us your exact training challenge..."
];

export default function FindTrainingTeaser() {
  const router = useRouter();
  const [placeholder, setPlaceholder] = useState('');
  const [termIndex, setTermIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      const currentTerm = searchTerms[termIndex];
      if (placeholder.length < currentTerm.length) {
        timeout = setTimeout(() => {
          setPlaceholder(currentTerm.slice(0, placeholder.length + 1));
        }, 50); // Typing speed
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000); // Wait before deleting
      }
    } else {
      if (placeholder.length > 0) {
        timeout = setTimeout(() => {
          setPlaceholder(placeholder.slice(0, -1));
        }, 30); // Deleting speed
      } else {
        setTermIndex((prev) => (prev + 1) % searchTerms.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [placeholder, isTyping, termIndex]);

  return (
    <section className="bg-background py-32 border-t border-slate-200/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none" />
      
      <div className="container-site flex justify-center relative z-10 px-6 sm:px-8">
        <Reveal className="w-full max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-6">
            For companies
          </p>
          <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl text-slate-900 font-heading tracking-tight drop-shadow-sm leading-tight">
            Tell us your challenge.<br className="hidden sm:block" /> We’ll find your partner.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed tracking-wide text-slate-600 font-medium mb-16">
            One structured needs assessment. We qualify it, match you with proven providers, and
            you compare proposals — free for companies.
          </p>
          
          <div className="block max-w-[800px] mx-auto group cursor-pointer" onClick={() => router.push('/find-training')}>
            <div className="relative rounded-[40px] p-[1px] bg-gradient-to-r from-violet-500 via-primary to-cyan-400 opacity-90 group-hover:opacity-100 transition-opacity duration-300 shadow-xl focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              {/* Glowing Aura Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-primary to-cyan-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-[40px]" />
              
              <div className="relative bg-white rounded-[40px] px-2 py-2 sm:px-4 sm:py-3 flex items-center gap-3 sm:gap-4 shadow-sm group-hover:bg-slate-50/90 transition-colors">
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-cyan-100 text-primary shrink-0">
                  <Sparkles size={24} />
                </div>
                
                <div className="flex-1 text-left px-4 sm:px-0 relative flex items-center h-12">
                  <input
                    type="text"
                    readOnly
                    className="w-full h-full bg-transparent outline-none text-slate-700 text-base sm:text-lg font-medium cursor-pointer placeholder-transparent"
                    placeholder={placeholder}
                  />
                  {/* Absolute positioning to simulate the typing placeholder since native placeholder doesn't animate well natively with cursor */}
                  <div className="absolute inset-y-0 left-4 sm:left-0 flex items-center pointer-events-none">
                    <span className="text-slate-400 text-base sm:text-lg font-medium">
                      {placeholder}
                      <span className="inline-block w-[2px] h-5 bg-primary ml-1 animate-pulse align-middle" />
                    </span>
                  </div>
                </div>
                
                <div className="shrink-0 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-slate-900 text-white group-hover:bg-primary group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
