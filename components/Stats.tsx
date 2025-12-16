import React from 'react';

const Stats: React.FC = () => {
  // Stats updated to reflect market studies/potential rather than past projects
  const stats = [
    { value: "~40%", label: "Produktivitäts-Steigerung durch GenAI" },
    { value: "60-70%", label: "Automatisierbare Arbeitszeit" },
    { value: "24/7", label: "Verfügbarkeit intelligenter Services" },
    { value: "15%+", label: "Umsatzwachstum bei digital Leaders" }
  ];

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <span className="text-xs font-medium text-primary tracking-widest uppercase">Das Marktpotenzial</span>
            <h3 className="mt-2 text-2xl font-display font-semibold">Warum jetzt handeln?</h3>
            <p className="text-sm text-text-light/50 dark:text-text-dark/50 mt-2 italic">
              *Basierend auf aktuellen Studien führender Wirtschaftsinstitute (z.B. McKinsey, Goldman Sachs)
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center sm:divide-x divide-neutral-light dark:divide-neutral-dark">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 flex flex-col items-center">
              <div className="text-4xl sm:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-text-light to-text-light/60 dark:from-white dark:to-white/60 mb-3">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-text-light/70 dark:text-text-dark/70 leading-snug max-w-[150px]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;