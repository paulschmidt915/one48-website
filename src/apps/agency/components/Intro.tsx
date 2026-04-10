'use client'

import React from 'react';
import Image from 'next/image';

const Intro: React.FC = () => {
  return (
    <section
      id="intro"
      className="relative z-10 min-h-screen flex items-center px-6 sm:px-10 lg:px-16 py-24 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left: Image ── */}
        <div className="relative mx-auto lg:mx-0 w-full max-w-md">
          <div className="relative group">
            {/* Backdrop accents */}
            <div className="absolute top-4 left-4 w-full h-full rounded-3xl bg-primary/10 border border-primary/15 transition-transform duration-500 group-hover:rotate-2 group-hover:translate-x-1" />
            <div className="absolute top-2 left-2 w-full h-full rounded-3xl bg-secondary/10 border border-secondary/15 transition-transform duration-500 group-hover:-rotate-1 group-hover:-translate-x-1" />

            <div className="relative rounded-3xl overflow-hidden bg-neutral-light">
              <Image
                src="/profilepicture1.png"
                alt="Paul Schmidt — Gründer von one48"
                width={800}
                height={1000}
                priority
                className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* ── Right: Text ── */}
        <div className="space-y-8 max-w-xl">
          <span className="block text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-secondary">
            Gründer · one48
          </span>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium leading-snug text-white">
            Ich bin Paul, Gründer von{' '}
            <span className="font-accent italic text-primary">one48</span>.
            <br />
            Wir helfen Unternehmen, KI sinnvoll einzusetzen, digitale Produkte zu bauen und Komplexität in{' '}
            <span className="font-accent italic text-secondary">Klarheit</span> zu verwandeln.
          </p>
          <div className="flex gap-x-10 gap-y-3 flex-wrap text-[11px] font-medium uppercase tracking-[0.2em] text-text-dark/30">
            <span>KI-Strategie</span>
            <span>Automation</span>
            <span>Apps</span>
            <span>Research</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
