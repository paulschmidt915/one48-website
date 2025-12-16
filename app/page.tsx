import Link from "next/link";

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 relative selection:bg-blue-100 selection:text-blue-900">

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            one<span className="text-blue-600">48</span>
          </Link>
          <nav className="hidden gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400 sm:flex">
            <Link href="#services" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              Leistungen
            </Link>
            <Link href="#about" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              Über mich
            </Link>
            <Link href="#contact" className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
              Kontakt
            </Link>
          </nav>
          <Link
            href="mailto:kontakt@one48.de"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Anfragen
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              Jetzt durchstarten mit KI
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
              Künstliche Intelligenz für <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Ihr Unternehmen</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Als Berater und Trainer begleite ich Sie auf dem Weg in die KI-Zukunft.
              Praxisnah, strategisch und auf Ihre Bedürfnisse zugeschnitten.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#contact"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:ring-2 hover:ring-blue-600/50 sm:w-auto"
              >
                Kostenloses Erstgespräch
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#services"
                className="flex w-full items-center justify-center rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 sm:w-auto"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>

          {/* Decorative background blur */}
          <div className="absolute top-0 -z-10 h-full w-full overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
            <div className="absolute -top-[20%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-400 blur-[100px] filter"></div>
            <div className="absolute top-[20%] right-[20%] h-[400px] w-[400px] rounded-full bg-indigo-400 blur-[100px] filter"></div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">Meine Leistungen</h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Maßgeschneiderte Lösungen, um Ihr Unternehmen fit für die Zukunft zu machen.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Service 1 */}
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <BrainIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold leading-7 text-zinc-900 dark:text-white">KI-Strategie & Beratung</h3>
                <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Wir analysieren Ihre Prozesse und identifizieren Potenziale für den Einsatz von Künstlicher Intelligenz. Gemeinsam entwickeln wir eine Roadmap für die Implementierung.
                </p>
              </div>

              {/* Service 2 */}
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <UsersIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold leading-7 text-zinc-900 dark:text-white">Training & Workshops</h3>
                <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Befähigen Sie Ihr Team im Umgang mit KI-Tools wie ChatGPT, Midjourney und Copilot. Praxisnahe Workshops für Einsteiger und Fortgeschrittene.
                </p>
              </div>

              {/* Service 3 */}
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <RocketIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold leading-7 text-zinc-900 dark:text-white">Implementierung</h3>
                <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                  Begleitung bei der Auswahl und Einführung passender KI-Software. Sicherstellung von Datenschutz und Compliance-Richtlinien.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-6">
                  Über mich
                </h2>
                <div className="space-y-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  <p>
                    Hi, ich bin <span className="font-semibold text-zinc-900 dark:text-white">Paul Schmidt</span>.
                    Als leidenschaftlicher Experte für Künstliche Intelligenz helfe ich Unternehmen dabei, die Lücke zwischen technologischer Innovation und praktischer Anwendung zu schließen.
                  </p>
                  <p>
                    Mein Ansatz ist pragmatisch: KI ist kein Selbstzweck, sondern ein Werkzeug, um Probleme zu lösen und Wettbewerbsvorteile zu sichern.
                  </p>

                  <ul className="space-y-3 mt-8">
                    {["Erfahrene Expertise in Generative AI", "Fokus auf anwendbare Business-Cases", "Individuelle Trainingsformate"].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="flex-none rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <CheckIcon className="h-4 w-4" />
                        </div>
                        <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square w-full max-w-md mx-auto rounded-3xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative">
                  {/* Placeholder for Profile Picture - Using a generic stylish gradient/pattern for MVP if no image is available */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-zinc-300">
                    <span className="text-6xl">PS</span>
                    {/* Note: User can replace this with <Image /> later */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-24 bg-zinc-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>

          <div className="mx-auto max-w-3xl px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Bereit für die Zukunft?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-zinc-300 mb-10">
              Lassen Sie uns unverbindlich darüber sprechen, wie KI Ihrem Unternehmen helfen kann. Ich freue mich auf Ihre Nachricht.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="mailto:kontakt@one48.de"
                className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-100 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row text-center sm:text-left">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} one48 - Paul Schmidt. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            {/* MVP Links - can be updated to specific pages later */}
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Impressum</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-50">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
