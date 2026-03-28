'use client'

import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TrackerLegalPage() {
  const router = useRouter();

  // Handle smooth scrolling to hash on initial load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-text-light/60 dark:text-text-dark/60 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zur Startseite
        </button>

        <div className="glass bg-white/40 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark rounded-3xl p-8 md:p-12 shadow-xl">

          {/* --- DATENSCHUTZ --- */}
          <section id="privacy" className="mb-16 scroll-mt-32">
            <h1 className="font-display text-3xl font-bold mb-8 text-primary">Datenschutzerklärung</h1>

            <div className="space-y-8 text-text-light/80 dark:text-text-dark/80 leading-relaxed">
              <div>
                <h2 className="text-xl font-bold mb-3">1. Verantwortlicher</h2>
                <p>Verantwortlich für die Datenverarbeitung im Rahmen der Foodtracker App ist:</p>
                <p className="mt-2">Paul Schmidt</p>
                <p>Überwasserstraße 38</p>
                <p>48143 Münster</p>
                <p>Deutschland</p>
                <p>E-Mail: <a href="mailto:paulschmidt@one48.de" className="text-secondary hover:underline">paulschmidt@one48.de</a></p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">2. Erhobene Daten</h2>
                <p>Die folgenden Daten werden durch die Nutzung der App erhoben und verarbeitet:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>E-Mail-Adresse:</strong> Für die Registrierung und Anmeldung (Firebase Authentication).</li>
                  <li><strong>Ernährungsdaten:</strong> Aufgezeichnete Mahlzeiten, Makronährstoffe und Kalorien.</li>
                  <li><strong>Körperdaten:</strong> Eingegebenes Gewicht, Körperfettanteil und Körpermaße.</li>
                  <li><strong>Rezepte & Favoriten:</strong> Gespeicherte oder generierte Rezepte.</li>
                  <li><strong>Aktive Energie aus Apple Health:</strong> Diese Daten werden nur lokal auf Ihrem Gerät gelesen und für Berechnungen verwendet. Sie werden nicht auf unseren Servern gespeichert.</li>
                  <li><strong>Spracheingaben:</strong> Werden temporär zur Transkription an die OpenAI-API übertragen.</li>
                  <li><strong>Fotos von Nährwerttabellen:</strong> Werden temporär zur automatischen Erkennung der Nährwerte an die OpenAI-API übertragen.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">3. Weitergabe von Daten an Drittanbieter</h2>
                <p>Wir nutzen folgende externe Dienste zur Bereitstellung der App-Funktionalitäten:</p>
                <ul className="list-disc pl-5 mt-2 space-y-4">
                  <li>
                    <strong>Firebase / Google:</strong> Wir nutzen Firebase (Authentication und Realtime Database) für das Hosting der Datenbank und die Nutzerauthentifizierung. Die Daten werden auf Servern in der EU (europe-west1) gespeichert. Weitere Informationen zum Datenschutz bei Google finden Sie unter: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">https://policies.google.com/privacy</a>.
                  </li>
                  <li>
                    <strong>OpenAI:</strong> Wir nutzen Dienste von OpenAI zur Verarbeitung von Spracheingaben (Audio-Transkription), zum automatisierten Parsing von Fotos von Nährwerttabellen und zur Rezeptgenerierung. Die Inhalte (Sprache, Fotos) werden nur temporär für die jeweilige Anfrage an die OpenAI-API gesendet. Weitere Informationen zum Datenschutz bei OpenAI finden Sie unter: <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">https://openai.com/policies/privacy-policy</a>.
                  </li>
                  <li>
                    <strong>Apple HealthKit:</strong> Die App liest lokale HealthKit-Daten (wie die aktive Energie) auf Ihrem Endgerät aus. Diese Daten verbleiben lokal auf Ihrem Gerät und werden ausdrücklich nicht an unsere Server oder Dritte weitergegeben.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">4. Datenlöschung</h2>
                <p>Sie haben die volle Kontrolle über Ihre Daten. Sie können all Ihre in der App gespeicherten Daten sowie Ihren Account eigenständig dauerhaft löschen (unter dem Menüpunkt: Account → Daten löschen).</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">5. Ihre Rechte</h2>
                <p>Nach der DSGVO stehen Ihnen folgende Rechte zu:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Recht auf Auskunft über Ihre verarbeiteten Daten</li>
                  <li>Recht auf Berichtigung unrichtiger Daten</li>
                  <li>Recht auf Löschung („Recht auf Vergessenwerden")</li>
                  <li>Recht auf Widerspruch gegen die weitere Verarbeitung</li>
                </ul>
                <p className="mt-2">Zur Ausübung Ihrer Rechte können Sie sich jederzeit per E-Mail an uns wenden: <a href="mailto:paulschmidt@one48.de" className="text-secondary hover:underline">paulschmidt@one48.de</a>.</p>
              </div>
            </div>
          </section>

          <hr className="border-neutral-light dark:border-neutral-dark my-12" />

          {/* --- TERMS (AGB / Nutzungsbedingungen) --- */}
          <section id="terms" className="mb-16 scroll-mt-32">
            <h1 className="font-display text-3xl font-bold mb-8 text-primary">Nutzungsbedingungen (AGB / EULA)</h1>

            <div className="space-y-6 text-text-light/80 dark:text-text-dark/80 leading-relaxed">
              <div>
                <h2 className="text-xl font-bold mb-2">1. Vertragspartner & Leistungsgegenstand</h2>
                <p>Diese Nutzungsbedingungen (im Folgenden "Terms") regeln die Nutzung der Foodtracker App. Vertragspartner ist Paul Schmidt (siehe Impressum). Die App dient der Erfassung von Ernährungs- und Körperdaten sowie der Bereitstellung von KI-generierten Rezepten und Nährwertanalysen.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">2. KI-Haftungsausschluss</h2>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                  <p className="font-semibold text-primary/90">
                    Alle durch KI generierten Inhalte (insbesondere Rezepte, Nährwertangaben und Speiseempfehlungen) sind automatisch erstellt und ohne Gewähr. Der Anbieter übernimmt keinerlei Haftung für gesundheitliche Schäden, die durch die Nutzung KI-generierter Inhalte entstehen. Die Inhalte ersetzen keine professionelle Ernährungs- oder Medizinberatung.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">3. Nutzungsbeschränkungen</h2>
                <p>Die Nutzung der App ist nur für private, nicht-kommerzielle Zwecke gestattet. Jegliche Form von Reverse Engineering, die systematische Datenextraktion, das Umgehen technischer Schutzmaßnahmen oder die missbräuchliche Nutzung der integrierten API-Dienste (wie der OpenAI-Anbindung) ist untersagt.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">4. Kündigung / Datenlöschung</h2>
                <p>Sie können die Nutzung der App jederzeit beenden. Über die integrierte Löschfunktion ("Account → Daten löschen") können Sie Ihren Account sowie alle damit verknüpften serverseitigen Daten jederzeit unwiderruflich löschen. Der Anbieter behält sich das Recht vor, Accounts bei einem Verstoß gegen diese Terms zu sperren oder zu löschen.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">5. Anwendbares Recht</h2>
                <p>Für diese Nutzungsbedingungen sowie das Nutzungsverhältnis gilt ausschließlich deutsches Recht unter Ausschluss des UN-Kaufrechts.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">6. Standard-EULA von Apple</h2>
                <p>Für den Bezug der App über den Apple App Store gilt ergänzend die Standard End User License Agreement (EULA) von Apple, soweit in diesen Terms nichts Abweichendes oder Spezifischeres geregelt ist.</p>
              </div>
            </div>
          </section>

          <hr className="border-neutral-light dark:border-neutral-dark my-12" />

          {/* --- IMPRESSUM --- */}
          <section id="impressum" className="scroll-mt-32">
            <h1 className="font-display text-3xl font-bold mb-8 text-primary">Impressum</h1>

            <div className="space-y-6 text-text-light/80 dark:text-text-dark/80">
              <div>
                <h2 className="text-xl font-bold mb-2">Angaben gemäß § 5 TMG</h2>
                <p>Paul Schmidt</p>
                <p>Überwasserstraße 38</p>
                <p>48143 Münster</p>
                <p>Deutschland</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Kontakt</h2>
                <p>E-Mail: <a href="mailto:paulschmidt@one48.de" className="text-secondary hover:underline">paulschmidt@one48.de</a></p>
                <p>Telefon: 01522 4583167</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Berufsbezeichnung</h2>
                <p>KI-Berater</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Redaktionell verantwortlich</h2>
                <p>Paul Schmidt</p>
                <p>Überwasserstraße 38</p>
                <p>48143 Münster</p>
                <p>Deutschland</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">EU-Streitschlichtung</h2>
                <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">https://ec.europa.eu/consumers/odr/</a>.</p>
                <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
                <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
