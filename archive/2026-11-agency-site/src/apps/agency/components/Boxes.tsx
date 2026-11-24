'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/apps/agency/data/categories';

const cards = categories;

const Boxes: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleClick = (i: number) => {
    setActiveCard((prev) => (prev === i ? null : i));
  };

  return (
    <section
      id="boxes"
      className="relative z-10 min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-medium text-white/40">
            Was wir tun
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            Fünf <span className="font-accent italic text-primary">Schwerpunkte</span>
          </h2>
        </div>

        {/* ── Desktop: 5 cards in a row, click-to-expand ── */}
        <div className="hidden lg:flex gap-4 h-[520px]">
          {cards.map((card, i) => {
            const isActive = activeCard === i;
            const isAnyActive = activeCard !== null;

            return (
              <button
                key={card.num}
                onClick={() => handleClick(i)}
                className="relative rounded-3xl overflow-hidden cursor-pointer group text-left"
                style={{
                  flexBasis: 0,
                  flexGrow: isActive ? 5 : isAnyActive ? 0.6 : 1,
                  transition:
                    'flex-grow 800ms cubic-bezier(0.32, 0.72, 0, 1), border-color 500ms ease, box-shadow 500ms ease',
                  backgroundColor: 'rgba(10, 14, 24, 0.6)',
                  backdropFilter: 'blur(20px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                  border: `1px solid ${isActive ? card.color : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isActive
                    ? `inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 80px ${card.glowColor}, 0 16px 64px rgba(0,0,0,0.5)`
                    : 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none"
                  style={{
                    backgroundColor: card.accent,
                    opacity: isActive ? 0.18 : 0.06,
                  }}
                />

                {/* Collapsed view: vertical title */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-6 transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 0 : 1,
                    pointerEvents: isActive ? 'none' : 'auto',
                  }}
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
                    {card.num}
                  </span>
                  <h3
                    className="text-white/80 text-sm font-display font-bold tracking-[0.35em] uppercase whitespace-nowrap"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Expanded view: full content */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-10 transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transitionDelay: isActive ? '250ms' : '0ms',
                  }}
                >
                  {/* Category icon(s), top right */}
                  <div
                    className="pointer-events-none absolute top-6 right-6 flex items-start gap-4 transition-all duration-700"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateY(0)' : 'translateY(-8px)',
                      transitionDelay: isActive ? '350ms' : '0ms',
                    }}
                  >
                    {card.icons ? (
                      card.icons.map((src) => (
                        <div
                          key={src}
                          className="relative w-32 h-32 xl:w-40 xl:h-40 pointer-events-auto transition-transform duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-[-2deg]"
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="160px"
                            className="object-contain"
                          />
                        </div>
                      ))
                    ) : card.icon ? (
                      <div className="relative w-56 h-56 xl:w-72 xl:h-72">
                        <Image
                          src={card.icon}
                          alt=""
                          fill
                          sizes="288px"
                          className="object-contain"
                        />
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium mb-10">
                      {card.num}
                    </span>
                    <h3 className="text-3xl xl:text-4xl font-display font-bold tracking-tight text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="font-accent italic text-base xl:text-lg text-white/60">
                      {card.slogan}
                    </p>
                  </div>

                  <div className="max-w-md">
                    <p className="text-white/70 text-sm xl:text-base leading-relaxed mb-6">
                      {card.description}
                    </p>
                    <Link
                      href={`/${card.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold border transition-all hover:gap-3 hover:bg-white/5"
                      style={{ color: card.accent, borderColor: card.color }}
                    >
                      Mehr erfahren
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Mobile / tablet: stacked accordion ── */}
        <div className="lg:hidden flex flex-col gap-3">
          {cards.map((card, i) => {
            const isActive = activeCard === i;
            return (
              <button
                key={card.num}
                onClick={() => handleClick(i)}
                className="relative w-full rounded-3xl overflow-hidden text-left"
                style={{
                  maxHeight: isActive ? '600px' : '92px',
                  transition:
                    'max-height 700ms cubic-bezier(0.32, 0.72, 0, 1), border-color 500ms ease, box-shadow 500ms ease',
                  backgroundColor: 'rgba(10, 14, 24, 0.6)',
                  backdropFilter: 'blur(20px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
                  border: `1px solid ${isActive ? card.color : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isActive
                    ? `inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 60px ${card.glowColor}, 0 12px 40px rgba(0,0,0,0.5)`
                    : 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                {/* Category icon(s), top right (mobile) */}
                <div
                  className="pointer-events-none absolute top-4 right-4 flex items-start gap-3 transition-all duration-700"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(-8px)',
                    transitionDelay: isActive ? '300ms' : '0ms',
                  }}
                >
                  {card.icons ? (
                    card.icons.map((src) => (
                      <div
                        key={src}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 pointer-events-auto transition-transform duration-500 ease-out hover:-translate-y-1.5 hover:scale-105 hover:rotate-[-2deg]"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </div>
                    ))
                  ) : card.icon ? (
                    <div className="relative w-40 h-40 sm:w-52 sm:h-52">
                      <Image
                        src={card.icon}
                        alt=""
                        fill
                        sizes="208px"
                        className="object-contain"
                      />
                    </div>
                  ) : null}
                </div>

                <div className="p-6 flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
                    {card.num}
                  </span>
                  <h3 className="text-white text-base font-display font-bold tracking-wider uppercase">
                    {card.title}
                  </h3>
                </div>

                <div
                  className="px-6 pb-6 transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transitionDelay: isActive ? '200ms' : '0ms',
                  }}
                >
                  <p className="font-accent italic text-sm text-white/60 mb-4">{card.slogan}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">
                    {card.description}
                  </p>
                  <Link
                    href={`/${card.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold border hover:bg-white/5 transition-all"
                    style={{ color: card.accent, borderColor: card.color }}
                  >
                    Mehr erfahren
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Boxes;
