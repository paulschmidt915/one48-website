import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      id: "01",
      title: "Generative AI Strategie",
      description: "Wir entwickeln nicht nur Prompts, sondern ganze Ökosysteme. Implementierung von LLMs, die auf Ihren firmeneigenen Daten basieren, sicher und skalierbar.",
      tags: ["LLM Integration", "RAG Architekturen", "Prompt Engineering"]
    },
    {
      id: "02",
      title: "Digitale Transformation",
      description: "Der Weg weg von Legacy-Systemen hin zu einer modularen Cloud-Infrastruktur. Wir bereinigen Ihre Datenarchitektur, damit KI überhaupt erst möglich wird.",
      tags: ["Cloud Migration", "Data Cleaning", "API Design"]
    },
    {
      id: "03",
      title: "Change Enablement",
      description: "Technologie scheitert oft am Menschen. Wir begleiten Ihre Teams durch Workshops und Trainings, um Ängste abzubauen und echte Nutzung zu fördern.",
      tags: ["Kulturwandel", "Upskilling", "Adoption Tracking"]
    }
  ];

  return (
    <section className="py-24 bg-surface-light dark:bg-surface-dark relative z-10" id="leistungen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">Unsere Expertise.</h2>
          <p className="text-text-light/70 dark:text-text-dark/70 text-xl max-w-2xl">
            Keine Standardlösungen. Wir bieten maßgeschneiderte Architektur für Ihr digitales Wachstum.
          </p>
        </div>

        <div className="flex flex-col">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative border-t border-neutral-light dark:border-neutral-dark py-12 md:py-16 hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors duration-500 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
                {/* ID */}
                <span className="font-display text-xl md:text-2xl text-text-light/30 dark:text-text-dark/30 font-medium">
                  /{service.id}
                </span>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-display text-3xl md:text-5xl font-bold mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-primary transition-all duration-300">
                      {service.title}
                    </h3>
                    <ArrowUpRight className="w-8 h-8 md:w-12 md:h-12 text-text-light/20 dark:text-text-dark/20 group-hover:text-primary group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <p className="text-lg text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap content-start gap-2">
                      {service.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-4 py-2 rounded-full border border-neutral-light dark:border-neutral-dark text-sm font-medium text-text-light/60 dark:text-text-dark/60 bg-background-light dark:bg-background-dark group-hover:border-primary/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Closing Line */}
          <div className="border-t border-neutral-light dark:border-neutral-dark"></div>
        </div>
      </div>
    </section>
  );
};

export default Services;