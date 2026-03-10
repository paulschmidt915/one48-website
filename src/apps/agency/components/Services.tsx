'use client'

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, RotateCw } from 'lucide-react';

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const useCases = [
    {
      id: "01",
      category: "BUILDER",
      categoryClass: "bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-500/20",
      title: "Automatisierte Wissens-Abfrage",
      shortDesc: "Interne RAG-Systeme für SharePoint & Server.",
      description: "Wir bauen interne Wissensdatenbanken (RAG), die sicher auf Ihren Dokumenten in SharePoint oder lokalen Servern basieren. Ihr Team findet Antworten in Sekunden statt in Stunden. Kein mühsames Suchen mehr in PDF-Wüsten – die KI extrahiert präzise die benötigten Informationen inklusive Quellenbeleg.",
      tags: ["RAG-Systeme", "SharePoint", "Sichere LLMs"]
    },
    {
      id: "02",
      category: "PARTNER",
      categoryClass: "bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-500/20",
      title: "Intelligente E-Mail & Lead-Triage",
      shortDesc: "Auto-Kategorisierung & Antwortentwürfe im CRM.",
      description: "Eingehende Anfragen werden durch KI-Agenten automatisch kategorisiert, priorisiert und mit einem ersten Antwortentwurf versehen. Das reduziert die Reaktionszeit im Support und Sales massiv und stellt sicher, dass keine wichtige Anfrage im Postfach untergeht. Die Integration erfolgt direkt in Ihr bestehendes CRM-System.",
      tags: ["Workflow Automation", "AI Agents", "CRM"]
    },
    {
      id: "03",
      category: "TRAINER",
      categoryClass: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-500/20",
      title: "KI-Enablement & Tool-Workshops",
      shortDesc: "Mitarbeiter zu KI-Piloten ausbilden.",
      description: "Wir befähigen Ihr Team, GenAI-Tools wie ChatGPT, Copilot oder spezialisierte interne Lösungen sicher und effizient in den Arbeitsalltag zu integrieren. Von Prompt-Engineering bis hin zur Identifikation eigener Use Cases – wir machen Ihre Mitarbeiter zu KI-Experten.",
      tags: ["Prompting", "Change Mgmt", "Enablement"]
    }
  ];

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % useCases.length);
    }, 200); // Small delay to allow flip reset visual
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
    }, 200);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Calculate stack positions
  const getStackStyle = (index: number) => {
    // Normalize index relative to activeIndex
    const relativeIndex = (index - activeIndex + useCases.length) % useCases.length;

    // We only want to show the first 3 cards in a stack style
    // 0 = Active (Front)
    // 1 = Behind 1
    // 2 = Behind 2

    if (relativeIndex === 0) {
      // Front card
      return {
        zIndex: 30,
        opacity: 1,
        transform: 'translateX(0) translateY(0) scale(1)',
        pointerEvents: 'auto' as const,
      };
    } else if (relativeIndex === 1) {
      // Second card
      return {
        zIndex: 20,
        opacity: 0.7,
        transform: 'translateX(20px) translateY(20px) scale(0.95)',
        pointerEvents: 'none' as const,
      };
    } else if (relativeIndex === 2) {
      // Third card
      return {
        zIndex: 10,
        opacity: 0.4,
        transform: 'translateX(40px) translateY(40px) scale(0.9)',
        pointerEvents: 'none' as const,
      };
    } else {
      // Others hidden
      return {
        zIndex: 0,
        opacity: 0,
        transform: 'translateX(0) translateY(0) scale(0.8)',
        pointerEvents: 'none' as const,
        display: 'none'
      };
    }
  };

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark relative z-10 border-t border-neutral-light dark:border-neutral-dark overflow-hidden" id="einblicke">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid Layout: Title Left | Stack Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Title */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-light dark:border-neutral-dark bg-white/50 dark:bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-text-light/40 dark:text-text-dark/40 mb-6">
              <Sparkles className="w-3 h-3 text-primary" />
              Lösungen in der Praxis
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Konkrete <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Anwendungs- beispiele.</span>
            </h2>
          </div>

          {/* Right Column: Stack + Navigation */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">

            {/* The Stack Container */}
            <div className="relative w-full max-w-[380px] aspect-square perspective-[1200px]"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {useCases.map((useCase, index) => {
                const style = getStackStyle(index);
                const isActive = (index - activeIndex + useCases.length) % useCases.length === 0;

                return (
                  <div
                    key={useCase.id}
                    className="absolute inset-0 w-full h-full transition-all duration-500 ease-out"
                    style={{
                      ...style,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* The Flippable Card Container */}
                    <div
                      className={`relative w-full h-full cursor-pointer transition-transform duration-700 shadow-2xl rounded-[2.5rem] ${isActive && isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'}`}
                      style={{ transformStyle: 'preserve-3d' }}
                      onClick={isActive ? handleCardClick : undefined}
                    >

                      {/* FRONT SIDE */}
                      <div
                        className="absolute inset-0 w-full h-full bg-white dark:bg-[#1a1f2e] border border-neutral-light dark:border-neutral-700 rounded-[2.5rem] p-8 flex flex-col justify-between overflow-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-neutral-100 to-transparent dark:from-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                        <div>
                          <div className="flex justify-between items-start mb-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${useCase.categoryClass}`}>
                              {useCase.category}
                            </span>
                          </div>

                          <h3 className="font-display text-2xl md:text-3xl font-bold leading-[1.1] mb-4 hyphens-auto">
                            {useCase.title}
                          </h3>
                          <p className="text-base text-text-light/60 dark:text-text-dark/60 font-light">
                            {useCase.shortDesc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-neutral-100 dark:border-neutral-800">
                          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group">
                            <RotateCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" />
                            Tippen für Details
                          </div>
                          {/* Removed 'i' Icon per request */}
                        </div>
                      </div>

                      {/* BACK SIDE */}
                      <div
                        className="absolute inset-0 w-full h-full bg-gradient-to-br from-surface-light to-neutral-50 dark:from-surface-dark dark:to-black border border-primary/20 rounded-[2.5rem] p-8 flex flex-col overflow-hidden"
                        style={{
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="font-bold text-lg text-primary">Details</h4>
                          {/* Removed Reverse Arrow per request */}
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                          <p className="text-base text-text-light/80 dark:text-text-dark/80 leading-relaxed font-light mb-6">
                            {useCase.description}
                          </p>

                          <div className="space-y-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-text-light/40 dark:text-text-dark/40">Fokus-Themen</span>
                            <div className="flex flex-wrap gap-2">
                              {useCase.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 rounded-lg bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700 text-center">
                          <span className="text-[10px] uppercase tracking-widest text-text-light/30 dark:text-text-dark/30">
                            Nochmal tippen zum Schließen
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons (Underneath the cards) */}
            <div className="flex items-center gap-6 mt-12">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-white/5 hover:border-primary transition-all shadow-sm hover:shadow-md group"
                aria-label="Previous Case"
              >
                <ArrowLeft className="w-5 h-5 text-text-light dark:text-text-dark group-hover:text-primary transition-colors" />
              </button>

              <div className="text-sm font-medium font-display tracking-widest text-text-light/40 dark:text-text-dark/40">
                {activeIndex + 1} / {useCases.length}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark flex items-center justify-center hover:bg-neutral-50 dark:hover:bg-white/5 hover:border-primary transition-all shadow-sm hover:shadow-md group"
                aria-label="Next Case"
              >
                <ArrowRight className="w-5 h-5 text-text-light dark:text-text-dark group-hover:text-primary transition-colors" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
