
import React, { useEffect, useState } from 'react';
import { ScreenShare } from 'lucide-react';

interface HeroProps {
  onNavigateContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateContact }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="space-y-8 relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-light dark:border-neutral-dark bg-surface-light/50 dark:bg-surface-dark/50 text-xs font-medium tracking-wider text-secondary">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="md:hidden">Umsetzungspartner für AI & Automatisierung</span>
            <span className="hidden md:inline">Umsetzungspartner für AI, Automatisierung und Enablement</span>
          </div>

          <div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Digitaler Wandel</span>, der im Alltag funktioniert.
            </h1>
            <h2 className="font-display text-2xl sm:text-3xl text-text-light dark:text-text-dark font-medium">
              Gemeinsam geplant. Mit Ihrem Team umgesetzt.
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-text-light/70 dark:text-text-dark/70 max-w-lg leading-relaxed">
            Wir bringen GenAI und Automatisierung in den Arbeitsalltag Ihrer Teams.
            Gemeinsam lösen wir konkrete Pain Points, bauen funktionierende Workflows und befähigen Teams, diese selbst weiterzuführen.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            {/* Primary CTA */}
            <button
              onClick={onNavigateContact}
              className="px-6 py-4 bg-primary text-white font-medium rounded-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20 flex items-center justify-center gap-2 group"
            >
              Erstgespräch vereinbaren
              <ScreenShare className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>


            {/* Tertiary CTA with Spotlight Effect */}
            <button
              onClick={() => handleScrollTo('check')}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--x', `${x}px`);
                e.currentTarget.style.setProperty('--y', `${y}px`);
              }}
              className="group relative px-6 py-4 bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-300 dark:border-neutral-700 text-text-light dark:text-text-dark font-medium rounded-lg overflow-hidden transition-colors hover:border-secondary/30 flex items-center justify-center gap-2"
            >
              {/* Dynamic Spotlight Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(37, 99, 235, 0.15) 0%, transparent 60%)`
                }}
              />

              <span className="relative z-10 flex items-center gap-2">
                In 1 Minute herausfinden, wie wir Ihnen helfen können!
              </span>
            </button>
          </div>
        </div>

        {/* Visual Element: Scroll-Animated Glass Cards */}
        <div className="relative h-[500px] w-full flex items-center justify-center perspective-[1000px]">

          {/* Animated Background Glows (Blue & Orange) */}
          <div
            className="absolute top-1/4 left-0 w-64 h-64 bg-secondary/40 dark:bg-secondary/30 rounded-full blur-[80px] transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.1}px)` }}
          ></div>
          <div
            className="absolute bottom-1/4 right-0 w-80 h-80 bg-primary/40 dark:bg-primary/30 rounded-full blur-[100px] transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * -0.15}px)` }}
          ></div>

          {/* Floating Glass Cards Container */}
          <div className="relative w-full h-full flex items-center justify-center transform-style-3d">

            {/* Card 1: Back / Left / Blueish */}
            <div
              className="absolute w-56 h-72 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-2xl shadow-2xl transition-transform duration-75 ease-out will-change-transform z-10"
              style={{
                transform: `
                  translateX(-80px) 
                  translateY(${40 + scrollY * -0.05}px) 
                  rotateZ(${-15 + scrollY * 0.02}deg) 
                  rotateY(-10deg)
                `
              }}
            >
              {/* Internal shine/reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-50"></div>
            </div>

            {/* Card 2: Center / Main / Mixed */}
            <div
              className="absolute w-64 h-80 rounded-3xl border border-white/30 dark:border-white/10 bg-white/20 dark:bg-white/5 backdrop-blur-3xl shadow-2xl transition-transform duration-75 ease-out will-change-transform z-20"
              style={{
                transform: `
                  translateY(${scrollY * -0.12}px) 
                  rotateZ(${5 - scrollY * 0.01}deg)
                  scale(${1 + scrollY * 0.0005})
                `
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 rounded-3xl"></div>
            </div>

            {/* Card 3: Front / Right / Orangish */}
            <div
              className="absolute w-52 h-64 rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-2xl shadow-2xl transition-transform duration-75 ease-out will-change-transform z-30"
              style={{
                transform: `
                  translateX(90px) 
                  translateY(${-20 + scrollY * -0.2}px) 
                  rotateZ(${20 + scrollY * 0.03}deg)
                  rotateX(10deg)
                `
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
