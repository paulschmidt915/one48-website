
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import DecisionNavigator from './components/DecisionNavigator';
import Services from './components/Services';
import ProofSnippets from './components/ProofSnippets';
import Process from './components/Process';
import AboutMe from './components/AboutMe';
import FAQ from './components/FAQ';
import Cta from './components/Cta';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';
import LegalPage from './components/LegalPage';
import PrivateArea from './components/PrivateArea';
import One48Planner from './components/One48Planner';
import { getRedirectResult, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

type View = 'landing' | 'contact' | 'legal' | 'private' | 'planner';

export default function App() {
  const [view, setView] = useState<View>(() => {
    const path = window.location.pathname;
    // Check if URL ends with /privat (ignoring trailing slash)
    if (path === '/privat' || path === '/privat/') {
      return 'private';
    }
    return 'landing';
  });

  // Scroll to top when view changes and handle minimal URL sync
  useEffect(() => {
    window.scrollTo(0, 0);

    if (view !== 'private' && view !== 'planner' && window.location.pathname.includes('/privat')) {
      window.history.pushState(null, '', '/');
    }
  }, [view]);

  // Firebase Auth & Redirect Handling
  useEffect(() => {
    // 1. Handle Redirect Result (especially for mobile)
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Successfully returned from Redirect Login!");
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const accessToken = credential?.accessToken;
          if (accessToken) {
            sessionStorage.setItem('one48-gapi-token', accessToken);
          }
          // Store auth state for PrivateArea and jump to planner
          sessionStorage.setItem('one48-auth', 'true');
          setView('planner');
        }
      } catch (error) {
        console.error("Redirect Login Error in App:", error);
      }
    };
    handleRedirect();

    // 2. Auth State Observer
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User detected globally:", user.uid);
        // If we are on landing, maybe the user wants to go to their planner
        // But we only auto-redirect if we have the 'one48-auth' session or just came from redirect
        // For now, let's follow the user's suggestion to redirect to planner if logged in and on landing
        if (view === 'landing') {
          // Check if they previously entered the password
          const isPrivateAuthed = sessionStorage.getItem('one48-auth') === 'true';
          if (isPrivateAuthed) {
            setView('planner');
          }
        }
      }
    });

    return () => unsubscribe();
  }, [view]);

  const navigateTo = (newView: View) => {
    setView(newView);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary opacity-10 dark:opacity-20 rounded-full blur-orb-1"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-primary opacity-10 dark:opacity-15 rounded-full blur-orb-2"></div>
      </div>

      <Navbar onNavigate={navigateTo} currentView={view} />

      <main>
        {view === 'landing' && (
          <>
            <Hero onNavigateContact={() => navigateTo('contact')} />
            <ProofSnippets />
            {/* <DecisionNavigator /> - Hidden for now */}
            <Process />
            <Services />
            <AboutMe onNavigateContact={() => navigateTo('contact')} />
            <FAQ />
            <Cta onNavigateContact={() => navigateTo('contact')} />
          </>
        )}
        {view === 'contact' && (
          <ContactPage onBack={() => navigateTo('landing')} />
        )}
        {view === 'legal' && (
          <LegalPage onBack={() => navigateTo('landing')} />
        )}
        {view === 'private' && (
          <PrivateArea onNavigate={navigateTo} />
        )}
        {view === 'planner' && (
          <One48Planner onBack={() => navigateTo('private')} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
