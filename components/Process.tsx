import React from 'react';
import { Layers, Users, Zap } from 'lucide-react';

const Process: React.FC = () => {
  const principles = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Mensch im Mittelpunkt",
      desc: "Technologie ist wertlos, wenn sie nicht genutzt wird. Wir fokussieren uns auf Change Management und UX."
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Modulare Architektur",
      desc: "Keine monolithischen Black-Boxes. Wir bauen Systeme, die mit Ihrem Unternehmen wachsen und anpassbar bleiben."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Radikale Geschwindigkeit",
      desc: "Lange Konzeptphasen waren gestern. Wir setzen auf schnelles Prototyping und iteratives Lernen am echten Problem."
    }
  ];

  return (
    <section className="py-24 bg-surface-light dark:bg-surface-dark relative" id="methodik">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="text-primary font-medium tracking-wider text-sm uppercase">Unsere Arbeitsweise</span>
            <h2 className="font-display text-4xl font-bold mt-2 mb-6">Wie wir arbeiten.</h2>
            <p className="text-text-light/70 dark:text-text-dark/70 text-lg leading-relaxed mb-8">
              Wir sind keine klassische Unternehmensberatung, die Folien liefert und verschwindet. Wir sind Ihr technischer Sparringspartner und Co-Pilot bei der Umsetzung.
            </p>
            <div className="h-1 w-20 bg-secondary rounded-full"></div>
          </div>

          <div className="space-y-8">
            {principles.map((p, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-background-light dark:bg-background-dark border border-neutral-light dark:border-neutral-dark flex items-center justify-center text-secondary group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-text-light/60 dark:text-text-dark/60 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Process;