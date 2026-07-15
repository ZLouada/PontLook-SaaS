import Link from 'next/link';
import Reveal from '@/components/shared/Reveal';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FindTrainingTeaser() {
  return (
    <section className="bg-background py-24 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="container-site flex justify-center relative z-10">
        <Reveal className="w-full max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-400 mb-4">
            For companies
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900 font-heading tracking-tight drop-shadow-sm">
            Tell us your challenge. We’ll find your partner.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-slate-600 mb-12">
            One structured needs assessment. We qualify it, match you with proven providers, and
            you compare proposals — free for companies.
          </p>
          
          <Link href="/find-training" className="block max-w-[800px] mx-auto group">
            <div className="relative rounded-[40px] p-[1px] bg-gradient-to-r from-violet-500 via-primary to-cyan-400 opacity-90 hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-primary to-cyan-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-[40px]" />
              <div className="relative bg-white rounded-[40px] px-6 py-5 flex items-center gap-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-cyan-100 text-primary shrink-0">
                  <Sparkles size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-400 font-medium text-[15px]">Tell us about your training challenge...</p>
                </div>
                <div className="shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white group-hover:bg-primary-600 transition-colors">
                  <ArrowRight size={18} />
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
