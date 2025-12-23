
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: 'landing' | 'contact' | 'legal') => void;
  currentView: 'landing' | 'contact' | 'legal';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Methodik', href: '#methodik' },
    { label: 'Einblicke', href: '#einblicke' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (currentView !== 'landing') {
      onNavigate('landing');
      // Delay scrolling slightly to allow rendering
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-neutral-light dark:border-neutral-dark glass bg-background-light/80 dark:bg-background-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 cursor-pointer group bg-transparent border-0 p-0"
            >
              <span className="font-display font-bold text-3xl md:text-4xl tracking-tight">
                <span className="text-text-light dark:text-text-dark">one</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">48</span>
              </span>
            </button>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-sm font-medium hover:text-secondary transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => onNavigate('contact')}
              className={`px-5 py-2.5 font-medium rounded-full transition-all text-sm ${currentView === 'contact' ? 'bg-primary text-white shadow-lg' : 'bg-text-light dark:bg-white text-white dark:text-background-dark hover:shadow-lg'}`}
            >
              Kontakt aufnehmen
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-light dark:text-text-dark p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-neutral-light dark:border-neutral-dark absolute w-full bg-background-light/95 dark:bg-background-dark/95">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="block px-3 py-3 rounded-md text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { onNavigate('contact'); setIsOpen(false); }}
              className="w-full block mt-4 px-3 py-3 text-center bg-text-light text-white rounded-md font-medium"
            >
              Kontakt aufnehmen
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
