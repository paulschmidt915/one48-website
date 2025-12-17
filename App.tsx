import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DecisionNavigator from './components/DecisionNavigator';
import Services from './components/Services';
import ProofSnippets from './components/ProofSnippets';
import Process from './components/Process';
import CaseStudy from './components/CaseStudy';
import AboutMe from './components/AboutMe';
import FAQ from './components/FAQ';
import Cta from './components/Cta';
import Footer from './components/Footer';

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
        <DecisionNavigator />
        <Services />
        <ProofSnippets />
        <Process />
        <CaseStudy />
        <AboutMe />
        <FAQ />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}