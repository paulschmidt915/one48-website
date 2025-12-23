
import React from 'react';
import { Wrench, GraduationCap, Handshake } from 'lucide-react';

const ProofSnippets: React.FC = () => {
  const snippets = [
    {
      banner: "Builder",
      title: "Wir bauen funktionierende KI- & Automatisierungs-lösungen.",
      desc: "Wir entwickeln konkrete Tools, Workflows und technische Setups – direkt auf Ihre Prozesse zugeschnitten und sofort nutzbar im Alltag.",
      icon: <Wrench className="w-32 h-32" />,
      colorClass: "text-primary",
      bannerClass: "bg-primary/10 text-primary border-primary/20"
    },
    {
      banner: "Trainer",
      title: "Wir befähigen Teams im Umgang mit KI & digitalen Werkzeugen.",
      desc: "In Workshops und Trainings vermitteln wir genau das Wissen, das Teams brauchen, um selbstständig mit GenAI und Automatisierung zu arbeiten.",
      icon: <GraduationCap className="w-32 h-32" />,
      colorClass: "text-secondary",
      bannerClass: "bg-secondary/10 text-secondary border-secondary/20"
    },
    {
      banner: "Partner",
      title: "Wir verankern KI und Automatisierung im Arbeitsalltag.",
      desc: "Wir arbeiten direkt im Prozess, priorisieren reale Pain Points und sorgen dafür, dass Lösungen genutzt, verstanden und weitergeführt werden.",
      icon: <Handshake className="w-32 h-32" />,
      colorClass: "text-[#374151]",
      bannerClass: "bg-[#374151]/10 text-[#374151] border-[#374151]/30"

    }
  ];

  return (
    <section className="py-12 bg-transparent relative z-10" id="leistungen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {snippets.map((item, idx) => (
            <div key={idx} className="glass bg-white/50 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark p-8 rounded-3xl hover:shadow-2xl transition-all hover:-translate-y-1 group relative overflow-hidden">

              {/* Watermark Icon */}
              <div className={`absolute -top-6 -right-6 opacity-[0.10] dark:opacity-[0.20] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none ${item.colorClass}`}>
                {item.icon}
              </div>

              {/* Category Banner */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest mb-6 ${item.bannerClass}`}>
                {item.banner}
              </div>

              {/* Content */}
              <h3 className="font-display text-xl md:text-2xl font-bold mb-4 leading-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-text-light/60 dark:text-text-dark/60 text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSnippets;
