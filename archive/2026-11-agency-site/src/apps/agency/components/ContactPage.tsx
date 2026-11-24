'use client'

import React from 'react';
import { Mail, Phone, User, ArrowLeft } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {

  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-light/60 dark:text-text-dark/60 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zur Startseite
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass bg-white/40 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark rounded-3xl p-8 sticky top-32">
              <h1 className="font-display text-3xl font-bold mb-8">Kontakt</h1>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-light/40 dark:text-text-dark/40 mb-1">Berater</p>
                    <p className="text-lg font-medium">Paul Schmidt</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-light/40 dark:text-text-dark/40 mb-1">E-Mail</p>
                    <a href="mailto:paulschmidt@one48.de" className="text-lg font-medium hover:text-primary transition-colors">paulschmidt@one48.de</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-text-light/40 dark:text-text-dark/40 mb-1">Telefon</p>
                    <a href="tel:+4915224583167" className="text-lg font-medium hover:text-primary transition-colors">01522 4583167</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="w-full rounded-3xl overflow-hidden border border-neutral-light dark:border-neutral-dark bg-surface-light dark:bg-surface-dark shadow-sm">
              {/* Wrapper gibt die Höhe vor */}
              <div className="w-full h-[780px] lg:h-[860px]">
                <iframe
                  src="https://app.cal.eu/one48/30min?embed=true&layout=month_view&overlayCalendar=true"
                  title="Termin buchen"
                  loading="lazy"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
