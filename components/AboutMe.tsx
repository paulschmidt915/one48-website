import React from 'react';
import { Linkedin } from 'lucide-react';

const AboutMe: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass bg-white/40 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

            {/* Image Placeholder */}
            <div className="md:col-span-4 lg:col-span-4 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative group">
                <img
                  src="/profilepicture.png"
                  alt="Paul Schmidt"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10"></div>
            </div>

            {/* Text Content */}
            <div className="md:col-span-8 lg:col-span-8 space-y-6">
              <div>
                <span className="text-secondary font-medium tracking-wide text-sm uppercase">Gründer & Lead Consultant</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Paul Schmidt</h2>
              </div>

              <div className="space-y-4 text-text-light/70 dark:text-text-dark/70 leading-relaxed text-lg">
                <p>
                  [Platzhalter: Kurze Einleitung. "Als ich vor X Jahren in die Tech-Welt eintauchte..."]
                </p>
                <p>
                  [Platzhalter: Werdegang. Erfahrung bei großen Tech-Firmen, Gründung von one48, Fokus auf pragmatische Lösungen.]
                </p>
                <p>
                  "Meine Mission ist es, die Brücke zwischen komplexer Technologie und echtem geschäftlichen Nutzen zu schlagen. Kein Buzzword-Bingo, sondern messbare Ergebnisse."
                </p>
              </div>

              <div className="pt-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-light dark:border-neutral-dark bg-surface-light dark:bg-surface-dark hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-sm font-medium"
                >
                  <Linkedin className="w-4 h-4 text-[#0077b5]" />
                  Auf LinkedIn vernetzen
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;