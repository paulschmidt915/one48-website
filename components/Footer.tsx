
import React from 'react';
import { Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'contact' | 'legal') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {

  const handleLegalNavigation = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    onNavigate('legal');
    // Allow time for component to mount
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-neutral-light dark:border-neutral-dark pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content - Simplified */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">

          <div className="max-w-xl">
            {/* Logo matching Navbar */}
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate('landing')}>
              <span className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                <span className="text-text-light dark:text-text-dark">one</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">48</span>
              </span>
            </div>

            {/* Updated Description Text */}
            <p className="text-text-light/60 dark:text-text-dark/60 text-lg leading-relaxed">
              Wir bringen GenAI und Automatisierung in den Arbeitsalltag Ihrer Teams. Gemeinsam lösen wir konkrete Pain Points, bauen funktionierende Workflows und befähigen Teams, diese selbst weiterzuführen.
            </p>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-neutral-light dark:border-neutral-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-text-light/40 dark:text-text-dark/40">
            © 2025 one48 | Paul Schmidt
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <button
              onClick={(e) => handleLegalNavigation(e, 'impressum')}
              className="text-sm text-text-light/40 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark transition-colors bg-transparent border-0 cursor-pointer"
            >
              Impressum
            </button>
            <button
              onClick={(e) => handleLegalNavigation(e, 'datenschutz')}
              className="text-sm text-text-light/40 dark:text-text-dark/40 hover:text-text-light dark:hover:text-text-dark transition-colors bg-transparent border-0 cursor-pointer"
            >
              Datenschutz
            </button>
            <a
              href="https://www.linkedin.com/in/paul-schmidt-550917178/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-light/40 dark:text-text-dark/40 hover:text-secondary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
