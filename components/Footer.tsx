import React from 'react';
import { ArrowRight, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-neutral-light dark:border-neutral-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-gradient-to-br from-secondary to-primary rounded-md flex items-center justify-center text-white font-display font-bold text-xs">
                1
              </div>
              <span className="font-display font-bold text-xl">one48</span>
            </div>
            <p className="text-text-light/50 dark:text-text-dark/50 text-sm leading-relaxed">
              Wir helfen ambitionierten Unternehmen, sich im Lärm der modernen Technologie zurechtzufinden.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Studio</h4>
            <ul className="space-y-3 text-sm text-text-light/60 dark:text-text-dark/60">
              <li><a href="#" className="hover:text-primary transition-colors">Über uns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Methodik</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Karriere</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kontakt</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Leistungen</h4>
            <ul className="space-y-3 text-sm text-text-light/60 dark:text-text-dark/60">
              <li><a href="#" className="hover:text-primary transition-colors">AI Beratung</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Digitale Strategie</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Unternehmenstraining</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Systemintegration</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Auf dem Laufenden bleiben</h4>
            <p className="text-xs text-text-light/50 dark:text-text-dark/50 mb-4">
              Neueste Einblicke zu AI und Change Management.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="E-Mail Adresse"
                className="w-full bg-background-light dark:bg-background-dark border border-neutral-light dark:border-neutral-dark rounded px-3 py-2 text-sm focus:outline-none focus:border-secondary transition-colors text-text-light dark:text-text-dark"
              />
              <button className="bg-secondary text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-neutral-light dark:border-neutral-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-light/40 dark:text-text-dark/40">
            © 2023 one48 Consultancy. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-text-light/40 dark:text-text-dark/40 hover:text-secondary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-text-light/40 dark:text-text-dark/40 hover:text-secondary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;