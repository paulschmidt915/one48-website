import React from 'react';

const Cta: React.FC = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-background-light to-transparent dark:from-background-dark opacity-50 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary opacity-5 dark:opacity-10 rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 text-text-light dark:text-text-dark">
          Bereit für ein Workflow-Upgrade?
        </h2>
        <p className="text-lg text-text-light/60 dark:text-text-dark/60 mb-10 max-w-xl mx-auto">
          Lassen Sie uns besprechen, wie GenAI Ihr operatives Ergebnis konkret beeinflussen kann. Kein Gerede, nur Strategie.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-text-light dark:bg-white text-white dark:text-background-dark font-medium rounded-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Erstgespräch vereinbaren
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;