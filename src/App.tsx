import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Philosophy from './Philosophy';
import Stats from './Stats';
import CaseStudy from './CaseStudy';
import Cta from './Cta';
import Footer from './Footer';

/**
 * App acts as the main Page component in Next.js terms.
 * Ideally, the Navbar and Footer would be in a layout.tsx,
 * while the sections would be in page.tsx.
 */
export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary opacity-10 dark:opacity-20 rounded-full blur-orb-1"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-primary opacity-10 dark:opacity-15 rounded-full blur-orb-2"></div>
      </div>

      <Navbar />

      <main>
        <Hero />
        <Services />
        <Philosophy />
        <Stats />
        <CaseStudy />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}