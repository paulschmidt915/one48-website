import React from 'react';

const Philosophy: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-text-light dark:bg-black z-0"></div>
      <div 
        className="absolute inset-0 opacity-10 z-0 pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/noise.png')" }}
      ></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtitle removed per request */}
        
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
          "Technologie ist der einfache Teil. <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
            Wertschöpfung entsteht durch Akzeptanz.
          </span>"
        </h2>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Wir glauben an einen menschenzentrierten Ansatz für High-Tech-Probleme. Wir liefern nicht nur ein Strategiepapier, sondern ein funktionierendes System, das Ihr Team tatsächlich nutzt.
        </p>
      </div>
    </section>
  );
};

export default Philosophy;