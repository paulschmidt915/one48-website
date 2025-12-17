import React from 'react';
import { Rocket, TrendingUp, ShieldCheck } from 'lucide-react';

const ProofSnippets: React.FC = () => {
  const snippets = [
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Logistik-Optimierung",
      desc: "Implementierung eines KI-gestützten Routenplans für einen internationalen Logistiker.",
      result: "-20% Treibstoffkosten"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-secondary" />,
      title: "Marketing-Automation",
      desc: "Aufbau einer Content-Engine für ein E-Commerce Unternehmen.",
      result: "3x Output bei gleichen Ressourcen"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: "Legal Tech RAG",
      desc: "Dokumentenanalyse-System für eine mittelständische Kanzlei.",
      result: "90% schnellere Recherche"
    }
  ];

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold">Ergebnisse statt Versprechen.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {snippets.map((item, idx) => (
            <div key={idx} className="glass bg-white/50 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark p-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-surface-light dark:bg-surface-dark border border-neutral-light dark:border-neutral-dark flex items-center justify-center mb-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-text-light/60 dark:text-text-dark/60 text-sm mb-6 leading-relaxed">
                {item.desc}
              </p>
              <div className="pt-4 border-t border-neutral-light dark:border-neutral-dark">
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                  {item.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProofSnippets;