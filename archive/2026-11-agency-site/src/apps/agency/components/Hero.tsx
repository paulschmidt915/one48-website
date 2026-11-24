'use client'

import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollDown?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollDown }) => {
  return (
    <section className="relative z-10 h-screen flex flex-col px-6 sm:px-10 lg:px-16 pt-28 pb-12 overflow-hidden">

      {/* ── Main Headline ── */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <h1 className="relative z-10 text-[clamp(3rem,10vw,9rem)] font-display font-bold leading-[1.15] tracking-tight select-none">
          <span className="block font-accent italic text-primary">Turning AI</span>
          <span className="block text-white pl-[1.2em] sm:pl-[1.8em] lg:pl-[2.2em]">into action</span>
        </h1>
      </div>

      {/* ── Inviting scroll cue ── */}
      <div className="flex justify-center">
        <button
          onClick={onScrollDown}
          className="group flex flex-col items-center gap-4 text-white/50 hover:text-white transition-colors cursor-pointer"
          aria-label="Mehr über one48 erfahren"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium">
            Was ist one48?
          </span>
          <div className="w-px h-14 bg-gradient-to-b from-white/5 via-white/30 to-white/60" />
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
