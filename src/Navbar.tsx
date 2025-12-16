import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Methodik', href: '#methodik' },
    { label: 'Einblicke', href: '#einblicke' }
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-neutral-light dark:border-neutral-dark glass bg-background-light/80 dark:bg-background-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <span className="font-display font-bold text-2xl tracking-tight">one48</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-sm font-medium hover:text-secondary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#kontakt"
              className="px-5 py-2.5 bg-text-light dark:bg-white text-white dark:text-background-dark font-medium rounded-full hover:shadow-lg transition-all text-sm"
            >
              Kontakt aufnehmen
            </a>
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
                className="block px-3 py-3 rounded-md text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a 
              href="#kontakt"
              className="block mt-4 px-3 py-3 text-center bg-text-light text-white rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;