'use client'

import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ onBack }) => {

  // Ensure we start at top if no hash is present, usually handled by scrollIntoView from footer
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 animate-in fade-in duration-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-text-light/60 dark:text-text-dark/60 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Zurück zur Startseite
        </button>

        <div className="glass bg-white/40 dark:bg-white/5 border border-neutral-light dark:border-neutral-dark rounded-3xl p-8 md:p-12 shadow-xl">

          {/* --- IMPRESSUM --- */}
          <section id="impressum" className="mb-16 scroll-mt-32">
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

          <hr className="border-neutral-light dark:border-neutral-dark my-12" />

          {/* --- DATENSCHUTZ --- */}
          <section id="datenschutz" className="scroll-mt-32">
            <h1 className="font-display text-3xl font-bold mb-8 text-primary">Datenschutzerklärung</h1>

            <div className="space-y-8 text-text-light/80 dark:text-text-dark/80 leading-relaxed">
              <p className="font-medium">Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 DSGVO</p>
              <p className="text-sm text-text-light/60 dark:text-text-dark/60">Stand: 21.12.2025</p>

              <div>
                <h2 className="text-xl font-bold mb-3">1. Verantwortlicher</h2>
                <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
                <p className="mt-2">Paul Schmidt</p>
                <p>Überwasserstraße 38, 48143 Münster, Deutschland</p>
                <p>E-Mail: <a href="mailto:paulschmidt@one48.de" className="text-secondary hover:underline">paulschmidt@one48.de</a></p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">2. Allgemeines zur Datenverarbeitung</h2>
                <p>Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Wir verarbeiten personenbezogene Daten nur, wenn dies zur Bereitstellung dieser Website, zur Bearbeitung von Anfragen oder zur Durchführung von Terminbuchungen erforderlich ist.</p>
                <p className="mt-2">Eine automatisierte Entscheidungsfindung (einschließlich Profiling) findet nicht statt.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">3. Rechtsgrundlagen der Verarbeitung</h2>
                <p>Je nach Zweck verarbeiten wir Daten insbesondere auf folgenden Rechtsgrundlagen:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung (z. B. freiwillige Angaben, ggf. Einwilligungscheckbox bei Buchung)</li>
                  <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertrag/vertragsähnliche Anbahnung (z. B. Terminvereinbarung auf Anfrage)</li>
                  <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – berechtigtes Interesse (z. B. sichere, stabile und fehlerfreie Bereitstellung der Website)</li>
                </ul>
                <p className="mt-2">Soweit Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden (z. B. technisch notwendige Cookies), erfolgt dies zusätzlich nach den Vorgaben des deutschen Endgeräte-/Cookie-Rechts (insb. § 25 TDDDG – soweit einschlägig).</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">4. Hosting der Website (Vercel) und Server-Logfiles</h2>
                <p>Diese Website wird über Vercel Inc. gehostet (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA).</p>

                <h3 className="font-bold mt-4 mb-2">4.1 Welche Daten werden verarbeitet?</h3>
                <p>Beim Aufruf der Website werden durch Vercel technisch erforderliche Daten verarbeitet (Server-/Request-Daten), z. B.:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>IP-Adresse (bzw. technische Request-Daten)</li>
                  <li>Datum und Uhrzeit des Zugriffs</li>
                  <li>Referrer-URL</li>
                  <li>Browser-/Geräteinformationen</li>
                  <li>Betriebssystem/Hostname</li>
                  <li>aufgerufene Seite/Resource-Infos</li>
                </ul>

                <h3 className="font-bold mt-4 mb-2">4.2 Zweck und Rechtsgrundlage</h3>
                <p>Zweck ist die technische Bereitstellung, Stabilität, Sicherheit sowie Fehleranalyse.</p>
                <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website).</p>

                <h3 className="font-bold mt-4 mb-2">4.3 Speicherdauer</h3>
                <p>Logdaten werden nur so lange gespeichert, wie es für Betrieb/Sicherheit erforderlich ist. Vercel weist für Runtime Logs eine Aufbewahrung von 3 Tagen aus (planabhängig).</p>

                <h3 className="font-bold mt-4 mb-2">4.4 Drittlandtransfer</h3>
                <p>Vercel ist unter dem EU–US Data Privacy Framework (DPF) zertifiziert; dadurch kann eine Übermittlung in die USA auf eine anerkannte Garantie gestützt werden.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">5. Web Analytics (Vercel Web Analytics)</h2>
                <p>Wir nutzen Vercel Web Analytics, um die Performance und Nutzung der Website auszuwerten und zu verbessern.</p>

                <h3 className="font-bold mt-4 mb-2">5.1 Funktionsweise / Daten</h3>
                <p>Vercel Web Analytics nutzt keine Third-Party-Cookies. Laut Vercel werden Endnutzer über einen Hash aus der eingehenden Request erkannt; Session-Informationen werden nach 24 Stunden verworfen.</p>
                <p className="mt-2">Typische (aggregierte) Messdaten sind z. B.:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Seitenaufrufe und Navigation (aggregiert)</li>
                  <li>Performance-Kennzahlen (Web Vitals)</li>
                  <li>grobe Geräte-/Browserinformationen</li>
                  <li>Referrer-Informationen</li>
                </ul>

                <h3 className="font-bold mt-4 mb-2">5.2 Zweck und Rechtsgrundlage</h3>
                <p>Zweck: Optimierung von Stabilität, Performance und Nutzerfreundlichkeit.</p>
                <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Optimierung).</p>

                <h3 className="font-bold mt-4 mb-2">5.3 Drittlandtransfer</h3>
                <p>Wie beim Hosting kann eine Verarbeitung/Übermittlung in den USA nicht ausgeschlossen werden; Vercel ist DPF-zertifiziert.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">6. Terminbuchung über Microsoft Bookings</h2>
                <p>Auf unserer Website nutzen wir Microsoft Bookings (Microsoft Corporation bzw. Microsoft-Konzerngesellschaften; im EU-Kontext häufig Microsoft Ireland Operations Limited als Vertragspartner je nach Setup).</p>

                <h3 className="font-bold mt-4 mb-2">6.1 Welche Daten werden verarbeitet?</h3>
                <p>Bei der Terminbuchung werden insbesondere verarbeitet:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Name</li>
                  <li>E-Mail-Adresse</li>
                  <li>ggf. Telefonnummer (falls abgefragt)</li>
                  <li>Termindaten (Datum/Uhrzeit, gebuchte Leistung)</li>
                  <li>ggf. Freitextangaben, die Sie im Buchungsformular machen</li>
                </ul>

                <h3 className="font-bold mt-4 mb-2">6.2 Zweck und Rechtsgrundlage</h3>
                <p>Zweck: Organisation und Durchführung von Terminen sowie Kontaktaufnahme im Zusammenhang mit dem Termin.</p>
                <p>Rechtsgrundlage:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>regelmäßig Art. 6 Abs. 1 lit. b DSGVO (Terminvereinbarung auf Anfrage / Vertragserfüllung)</li>
                  <li>ggf. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung bei freiwilligen Zusatzangaben)</li>
                </ul>

                <h3 className="font-bold mt-4 mb-2">6.3 Wo werden Bookings-Daten gespeichert?</h3>
                <p>Microsoft beschreibt, dass Bookings-Daten innerhalb der Microsoft-365-Plattform und in Exchange Online gespeichert werden (u. a. über Shared Mailboxes, in denen Kunden-, Mitarbeiter-, Service- und Termindetails liegen).</p>

                <h3 className="font-bold mt-4 mb-2">6.4 Cookies/Endgerät bei Bookings</h3>
                <p>Beim Aufruf/der Nutzung des Bookings-Widgets kann Microsoft Cookies und ähnliche Technologien einsetzen (z. B. für Anmeldung/Sicherheit/Sitzungssteuerung). Details ergeben sich aus den Microsoft-Datenschutzhinweisen.</p>

                <h3 className="font-bold mt-4 mb-2">6.5 Drittlandtransfer / Garantien</h3>
                <p>Eine Verarbeitung außerhalb der EU/des EWR kann – je nach Microsoft-Setup – nicht ausgeschlossen werden. Microsoft erklärt die Teilnahme am EU–US Data Privacy Framework.</p>
                <p>Außerdem gelten für Microsoft-Online-Services die Regelungen aus dem Microsoft Data Protection Addendum (DPA) (Auftragsverarbeitung).</p>

                <h3 className="font-bold mt-4 mb-2">6.6 Speicherdauer</h3>
                <p>Wir speichern Buchungsdaten so lange, wie dies zur Terminabwicklung erforderlich ist und löschen sie anschließend, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
                <p className="mt-2 italic">Hinweis zur Pflichtangabe: Ohne die als erforderlich gekennzeichneten Daten ist eine Terminbuchung in der Regel nicht möglich.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">7. Kontaktaufnahme (z. B. per E-Mail)</h2>
                <p>Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name, E-Mail-Adresse, Inhalt der Nachricht), um Ihre Anfrage zu bearbeiten.</p>
                <p className="mt-2">Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anfrage/Anbahnung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation)</p>
                <p className="mt-2">Speicherdauer: solange erforderlich für Bearbeitung; darüber hinaus nur, wenn dies zur Dokumentation oder aufgrund gesetzlicher Pflichten erforderlich ist.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">8. Externe Links & Affiliate-Links</h2>
                <p>Unsere Website enthält Links zu externen Webseiten Dritter. Für deren Inhalte und Datenverarbeitung sind ausschließlich die jeweiligen Betreiber verantwortlich.</p>

                <h3 className="font-bold mt-4 mb-2">Affiliate-Links</h3>
                <p>Einige Links können Affiliate-Links sein. Das bedeutet:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Wir erhalten ggf. eine Provision, wenn Sie über einen als „Affiliate" gekennzeichneten Link etwas buchen/kaufen.</li>
                  <li>Für Sie entstehen dadurch keine Mehrkosten.</li>
                </ul>
                <p className="mt-2">Beim Klick auf einen Affiliate-Link verlassen Sie unsere Website. Ab diesem Zeitpunkt richtet sich die Datenverarbeitung nach den Datenschutzbestimmungen des jeweiligen Anbieters/Netzwerks.</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">9. Empfänger / Auftragsverarbeiter</h2>
                <p>Wir setzen Dienstleister ein, die Daten in unserem Auftrag verarbeiten (Art. 28 DSGVO), insbesondere:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Vercel Inc. (Hosting, Web Analytics)</li>
                  <li>Microsoft (Microsoft Bookings / Microsoft 365 Dienste im Rahmen der Terminorganisation)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">10. Datensicherheit</h2>
                <p>Wir nutzen geeignete technische und organisatorische Maßnahmen, insbesondere:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>TLS/SSL-Verschlüsselung (https)</li>
                  <li>Zugriffsbeschränkungen und Berechtigungskonzepte</li>
                  <li>Maßnahmen zur Sicherstellung von Verfügbarkeit, Integrität und Vertraulichkeit</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">11. Ihre Rechte (Betroffenenrechte)</h2>
                <p>Sie haben jederzeit folgende Rechte nach DSGVO:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Auskunft (Art. 15)</li>
                  <li>Berichtigung (Art. 16)</li>
                  <li>Löschung (Art. 17)</li>
                  <li>Einschränkung der Verarbeitung (Art. 18)</li>
                  <li>Datenübertragbarkeit (Art. 20)</li>
                  <li>Widerspruch gegen Verarbeitungen auf Basis von Art. 6 Abs. 1 lit. f DSGVO (Art. 21)</li>
                </ul>
                <p className="mt-2">Wenn eine Verarbeitung auf Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).</p>
                <p className="mt-2">Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an: <a href="mailto:paulschmidt@one48.de" className="text-secondary hover:underline">paulschmidt@one48.de</a></p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">12. Beschwerderecht bei der Aufsichtsbehörde</h2>
                <p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig für Nordrhein-Westfalen ist insbesondere:</p>
                <p className="mt-2">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</p>
                <p>Postfach 20 04 44, 40102 Düsseldorf</p>
                <p>(Visitor: Kavalleriestr. 2–4, 40213 Düsseldorf)</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-3">13. Änderungen dieser Datenschutzerklärung</h2>
                <p>Wir passen diese Datenschutzerklärung an, wenn sich Rechtslage, Website-Funktionen oder eingesetzte Dienstleister ändern.</p>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default LegalPage;
