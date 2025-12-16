import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-light dark:border-neutral-dark bg-surface-light/50 dark:bg-surface-dark/50 text-xs font-medium uppercase tracking-wider text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Change Enablement Studio
          </div>
          
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
            Wir gestalten die <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Zukunft</span> der Arbeit.
          </h1>
          
          <p className="text-lg sm:text-xl text-text-light/70 dark:text-text-dark/70 max-w-lg leading-relaxed">
            Wir entschlüsseln Komplexität für moderne Unternehmen. Eine praxisorientierte Beratung mit Fokus auf Generative AI, Digitalisierung und strukturelle Transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-primary text-white font-medium rounded-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 group">
              Transformation starten
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-neutral-light dark:border-neutral-dark text-text-light dark:text-text-dark font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all flex items-center justify-center">
              Unsere Arbeit
            </button>
          </div>
        </div>

        {/* Visual Element: Futuristic Abstract Graphic */}
        <div className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-glow-light dark:bg-gradient-glow-dark rounded-3xl opacity-40 blur-3xl"></div>
          
          <div className="relative w-full h-full border border-neutral-light dark:border-neutral-dark rounded-3xl overflow-hidden glass bg-surface-light/30 dark:bg-surface-dark/30 shadow-2xl flex items-center justify-center">
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-20" 
              style={{
                backgroundImage: 'linear-gradient(to right, rgba(128,128,128,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            ></div>
            
            {/* Abstract Graphic Construction */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Central Core */}
                <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-secondary to-primary blur-2xl opacity-60 animate-pulse"></div>
                
                {/* Rotating Rings */}
                <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-80" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-400 dark:text-neutral-600" strokeDasharray="10 5" />
                </svg>
                <svg className="absolute inset-0 w-full h-full animate-[spin_15s_linear_infinite_reverse] opacity-60" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" strokeDasharray="4 8" />
                </svg>
                <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] opacity-60" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" strokeDasharray="20 10" />
                </svg>

                {/* Floating Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-4 h-4 bg-surface-light dark:bg-surface-dark border border-secondary rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)] animate-bounce"></div>
                <div className="absolute bottom-0 right-1/4 translate-y-4 w-3 h-3 bg-surface-light dark:bg-surface-dark border border-primary rounded-full shadow-[0_0_15px_rgba(234,88,12,0.5)] animate-bounce" style={{animationDelay: '0.5s'}}></div>
                
                {/* Connecting Lines (Data Stream feel) */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-secondary to-transparent opacity-30 transform rotate-45"></div>
                   <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-30 transform -rotate-45"></div>
                </div>
            </div>
            
            {/* Overlay Text */}
            <div className="absolute bottom-6 left-6 text-xs font-mono text-text-light/50 dark:text-text-dark/50">
               <div>SYSTEM_STATUS: ONLINE</div>
               <div>OPTIMIZATION: ACTIVE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;