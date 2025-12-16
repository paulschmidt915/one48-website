import React from 'react';
import { ArrowRight } from 'lucide-react';

const CaseStudy: React.FC = () => {
  return (
    <section className="py-20 border-t border-neutral-light dark:border-neutral-dark bg-surface-light dark:bg-surface-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer h-[400px]">
            <img 
              alt="Abstrakte Datenvisualisierung für ein Finanz-Dashboard" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-0 group-hover:saturate-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVRKlsnhUj_qOqm78JfznsSsAiFg2LVCBPH7zCYG0xMrAk-LLftXwb-zw69j4J3FJb19-XPd01b96WrAqpAPHoVi-QFuz3_kEWfJxVhhvS1RDUPqgSgozfC7xtIovYojSvdYXpZK2n8jQBx1WmqDnQ9XlczSxGQetqd77vkAR_dz4rfowi7CmhKnWS5PhefP0VCOhECZSYtjwYJ82BCU-aAoP325EQwpftw9oNwD_-fQ1rAqYQJ-SPCTkq18mTL3U1ZcCBSuZMyYMi"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div>
                <span className="text-primary font-bold tracking-wide text-sm uppercase mb-2 block">FinTech Sektor</span>
                <h3 className="text-white font-display text-2xl font-bold">Automatisierung der Risikobewertung</h3>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl font-bold mb-6">Echte Ergebnisse.</h2>
            <h3 className="font-display text-xl text-text-light/80 dark:text-text-dark/80 font-medium mb-4">
              Wie wir einem mittelständischen Finanzunternehmen geholfen haben, die Bearbeitungszeit um 70% zu reduzieren.
            </h3>
            <p className="text-text-light/60 dark:text-text-dark/60 leading-relaxed mb-8">
              Durch die Integration eines benutzerdefinierten RAG-Systems (Retrieval-Augmented Generation) haben wir es dem Compliance-Team ermöglicht, Tausende von Regulierungsdokumenten in Sekunden abzufragen und so einen manuellen 2-Tage-Prozess auf 15 Minuten zu verkürzen.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-text-light dark:text-text-dark font-semibold border-b border-secondary pb-1 hover:text-secondary transition-colors group">
              Case Study lesen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;