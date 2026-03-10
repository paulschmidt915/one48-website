'use client'

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      title: "Umsetzung im Alltag",
      desc: "Wir starten mit einem konkreten Anwendungsfall direkt im Arbeitsalltag. Ein funktionierender Pilot schafft Klarheit und bildet die Basis für alles Weitere.",
      color: "text-secondary",
      // Venn Circle specific props
      vennColor: "bg-secondary",
      vennPosition: "top-0 left-0 translate-x-[10%]", // Top Left
    },
    {
      id: 1,
      title: "Befähigen statt ersetzen",
      desc: "Unser Ziel ist es, Teams handlungsfähig zu machen – nicht externe Abhängigkeiten zu schaffen. Wissen, Verantwortung und Weiterentwicklung bleiben im Unternehmen.",
      color: "text-primary",
      // Venn Circle specific props
      vennColor: "bg-primary",
      vennPosition: "top-0 right-0 -translate-x-[10%]", // Top Right
    },
    {
      id: 2,
      title: "Schnell wirksam, nachhaltig verankert",
      desc: "Wir erzielen früh sichtbare Ergebnisse und verankern Lösungen so, dass sie langfristig genutzt und weitergeführt werden.",
      color: "text-emerald-600",
      // Venn Circle specific props
      vennColor: "bg-emerald-500",
      vennPosition: "bottom-0 left-1/2 -translate-x-1/2 -translate-y-[10%]", // Bottom Center
    }
  ];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="py-12 lg:py-24 bg-surface-light dark:bg-surface-dark overflow-hidden" id="methodik">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header - Compact on Mobile */}
        <div className="mb-8 lg:mb-24 text-center lg:text-left">
          <span className="text-primary font-medium tracking-wider text-xs lg:text-sm uppercase block mb-1">Unsere Arbeitsweise</span>
          <h2 className="font-display text-3xl lg:text-5xl font-bold">Das Prinzip one48.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">

          {/* LEFT COLUMN: Venn Diagram (DESKTOP ONLY) */}
          <div className="hidden lg:block relative w-full aspect-square max-w-[450px] mx-auto lg:mx-0 order-1">
            <div className="relative w-full h-full">
              {/* Circles */}
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`absolute w-[60%] h-[60%] rounded-full mix-blend-multiply dark:mix-blend-screen transition-all duration-700 ease-in-out blur-2xl
                      ${step.vennColor} ${step.vennPosition}
                      ${activeStep === idx ? 'opacity-90 scale-105 z-20' : 'opacity-20 scale-95'}
                    `}
                ></div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Content */}
          <div className="order-2 flex flex-col justify-center min-h-[300px] lg:min-h-[400px]">

            {/* MOBILE ONLY: Compact Bar Indicator */}
            <div className="flex lg:hidden w-full items-center justify-start gap-2 mb-6">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out
                       ${activeStep === idx
                      ? `w-16 ${step.vennColor} opacity-100 shadow-lg`
                      : 'w-3 bg-neutral-200 dark:bg-neutral-800 opacity-50'
                    }
                     `}
                />
              ))}
            </div>

            {/* Text Content */}
            <div className="mb-6 lg:mb-12">
              {/* Use key to trigger animation on change */}
              <div key={activeStep} className="animate-in fade-in slide-in-from-right-4 duration-500">
                <span className={`block text-5xl lg:text-8xl font-display font-bold opacity-10 mb-2 lg:mb-6 ${steps[activeStep].color}`}>
                  0{steps[activeStep].id + 1}
                </span>

                <h3 className="font-display text-2xl lg:text-4xl font-bold mb-3 lg:mb-6 leading-tight">
                  {steps[activeStep].title}
                </h3>

                <p className="text-base lg:text-lg text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </div>
            </div>

            {/* Buttons - Compact on Mobile */}
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                onClick={handlePrev}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-neutral-light dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-primary transition-all group"
                aria-label="Vorheriger Schritt"
              >
                <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-text-light dark:text-text-dark group-hover:text-primary transition-colors" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border border-neutral-light dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-primary transition-all group"
                aria-label="Nächster Schritt"
              >
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-text-light dark:text-text-dark group-hover:text-primary transition-colors" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;
