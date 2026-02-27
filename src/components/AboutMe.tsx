'use client'

import React from 'react';
import Image from 'next/image';
import { Linkedin, GraduationCap, Briefcase, Users, Rocket, Mail, FileText } from 'lucide-react';

interface AboutMeProps {
  onNavigateContact: () => void;
}

const AboutMe: React.FC<AboutMeProps> = ({ onNavigateContact }) => {
  const careerPath = [
    {
      icon: <GraduationCap className="w-3 h-3 text-text-light dark:text-text-dark" />,
      title: "B.Sc. Business Administration",
      date: "2021 - 2023",
      place: "Universität Münster",
      desc: "Schwerpunkt Accounting & Controlling. Bachelorarbeit (Bestnote) zur Analyse und Implementierung von Generativer KI in Finanzabteilungen."
    },
    {
      icon: <Users className="w-3 h-3 text-text-light dark:text-text-dark" />,
      title: "Dozent für KI & Digitalisierung",
      date: "2024",
      place: "paddy.app",
      desc: "Konzeption und Durchführung von Workshops an Schulen. Fokus auf Didaktik und die Übersetzung komplexer Inhalte für Anwender."
    },
    {
      icon: <Briefcase className="w-3 h-3 text-text-light dark:text-text-dark" />,
      title: "Corp. Strategy & AI Ambassador",
      date: "Seit Sept. 2024",
      place: "Bertelsmann",
      desc: "Schnittstelle zwischen Strategie und Tech. Verantwortung für AI-Strategien, GenAI-Rollouts und konkrete Automatisierungs-Cases."
    },
    {
      icon: <Rocket className="w-3 h-3 text-white" />,
      title: "Gründung one48",
      date: "Dez. 2025",
      place: "KI- & Digitalisierungspartner",
      desc: "Um Unternehmen dabei zu helfen, KI nicht nur zu analysieren, sondern im Alltag wirksam umzusetzen – gemeinsam mit den Teams."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass bg-white/40 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

            {/* Image Section with Stack Effect */}
            <div className="md:col-span-5 lg:col-span-4 relative sticky top-8">
              <div className="relative group">
                {/* Faded Box 1 (Back/Right/Orange) */}
                <div className="absolute top-4 left-4 w-full h-full rounded-2xl bg-primary/10 border border-primary/10 transition-transform duration-500 group-hover:rotate-3 group-hover:translate-x-2"></div>

                {/* Faded Box 2 (Middle/Left/Blue) */}
                <div className="absolute top-2 left-2 w-full h-full rounded-2xl bg-secondary/10 border border-secondary/10 transition-transform duration-500 group-hover:-rotate-2 group-hover:-translate-x-1"></div>

                {/* Main Image Container*/}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <Image
                    src="https://www.one48.de/profilepicture1.png"
                    alt="Paul Schmidt"
                    fill
                    className="object-cover shadow-none ring-0 transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="md:col-span-7 lg:col-span-8 space-y-10">
              <div>
                <span className="text-secondary font-medium tracking-wide text-xs lg:text-sm uppercase mb-2 block">Gründer & Lead Consultant</span>
                <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Paul Schmidt</h2>

                <p className="text-lg md:text-xl font-medium leading-relaxed text-text-light dark:text-text-dark">
                  Ich verbinde betriebswirtschaftliche Klarheit mit praktischer KI-Umsetzung.
                  Mein Weg führte von Finance & Controlling über Generative KI bis zur konkreten Umsetzung im Unternehmensalltag.
                </p>
              </div>

              {/* Career Timeline with Gradient Line */}
              <div className="relative space-y-10">
                {/* The 'Cool' Line: Thicker, Centered, nicer fade */}
                <div className="absolute left-0 top-3 bottom-0 w-1 rounded-full bg-gradient-to-b from-neutral-300 to-transparent dark:from-neutral-700"></div>


                {careerPath.map((item, idx) => (
                  // Padding kommt auf jedes Item, damit Dot & Line im selben Bezugssystem liegen
                  <div key={idx} className="relative group pl-10">
                    <div
                      className={`absolute -left-[14px] top-1 flex items-center justify-center w-8 h-8 rounded-full border-[3px] shadow-sm z-10 transition-all duration-300 group-hover:scale-110 ${idx === careerPath.length - 1
                        ? "bg-primary border-primary"
                        : "bg-white dark:bg-surface-dark border-neutral-200 dark:border-neutral-700"
                        }`}
                    >
                      {item.icon}
                    </div>

                    <div className="flex flex-col gap-1 mb-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                        <h3 className="font-display font-bold text-lg text-text-light dark:text-text-dark group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <span className="text-sm font-bold text-secondary">{item.date}</span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-text-light/40 dark:text-text-dark/40">{item.place}</span>
                    </div>
                    <p className="text-text-light/70 dark:text-text-dark/70 text-sm leading-relaxed max-w-xl">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Button Row */}
              <div className="pt-6 flex flex-wrap gap-4 items-center">

                {/* 1. Contact Button (Prominent) */}
                <button
                  onClick={onNavigateContact}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 flex items-center gap-2 group"
                >
                  <Mail className="w-4 h-4" />
                  <span>Kontakt aufnehmen</span>
                </button>

                {/* 2. LinkedIn Button (Subtle Outline) */}
                <a
                  href="https://www.linkedin.com/in/paul-schmidt-550917178/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/5 transition-all text-sm font-medium text-text-light/70 dark:text-text-dark/70 flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                {/* 3. CV Download (Matches LinkedIn Style) */}
                <a
                  href="/cv.pdf" // Placeholder path
                  download
                  className="px-5 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-all text-sm font-medium text-text-light/70 dark:text-text-dark/70 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>CV herunterladen</span>
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
