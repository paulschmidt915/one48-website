import type { Metadata } from 'next'
import RollLink from '@/components/RollLink'

export const metadata: Metadata = {
  title: 'Impressum & Datenschutz – Paul Schmidt',
  alternates: { canonical: 'https://www.one48.de/legal' },
}

export default function LegalPage() {
  return (
    <main className="legal" lang="de">
      <RollLink href="/">Zurück</RollLink>

      {/* --- IMPRESSUM --- */}
      <section id="impressum">
        <h1>Impressum</h1>

        <div>
          <div>
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>Paul Schmidt</p>
            <p>Gärtnergasse 9</p>
            <p>1030 Wien</p>
            <p>Österreich</p>
          </div>

          <div>
            <h2>Kontakt</h2>
            <p>E-Mail: <a href="mailto:paulschmidt@one48.de">paulschmidt@one48.de</a></p>
          </div>

          <div>
            <h2>Berufsbezeichnung</h2>
            <p>KI-Berater</p>
          </div>

          <div>
            <h2>Redaktionell verantwortlich</h2>
            <p>Paul Schmidt</p>
            <p>Gärtnergasse 9</p>
            <p>1030 Wien</p>
            <p>Österreich</p>
          </div>

          <div>
            <h2>EU-Streitschlichtung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.</p>
            <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          </div>

          <div>
            <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </div>
        </div>
      </section>

      <hr />

      {/* --- DATENSCHUTZ --- */}
      <section id="datenschutz">
        <h1>Datenschutzerklärung</h1>

        <div>
          <p>Informationen zur Verarbeitung personenbezogener Daten nach Art. 13 DSGVO</p>
          <p>Stand: 21.12.2025</p>

          <div>
            <h2>1. Verantwortlicher</h2>
            <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
            <p>Paul Schmidt</p>
            <p>Gärtnergasse 9, 1030 Wien, Österreich</p>
            <p>E-Mail: <a href="mailto:paulschmidt@one48.de">paulschmidt@one48.de</a></p>
          </div>

          <div>
            <h2>2. Allgemeines zur Datenverarbeitung</h2>
            <p>Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Wir verarbeiten personenbezogene Daten nur, wenn dies zur Bereitstellung dieser Website, zur Bearbeitung von Anfragen oder zur Durchführung von Terminbuchungen erforderlich ist.</p>
            <p>Eine automatisierte Entscheidungsfindung (einschließlich Profiling) findet nicht statt.</p>
          </div>

          <div>
            <h2>3. Rechtsgrundlagen der Verarbeitung</h2>
            <p>Je nach Zweck verarbeiten wir Daten insbesondere auf folgenden Rechtsgrundlagen:</p>
            <ul>
              <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung (z. B. freiwillige Angaben, ggf. Einwilligungscheckbox bei Buchung)</li>
              <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertrag/vertragsähnliche Anbahnung (z. B. Terminvereinbarung auf Anfrage)</li>
              <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – berechtigtes Interesse (z. B. sichere, stabile und fehlerfreie Bereitstellung der Website)</li>
            </ul>
            <p>Soweit Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden (z. B. technisch notwendige Cookies), erfolgt dies zusätzlich nach den Vorgaben des deutschen Endgeräte-/Cookie-Rechts (insb. § 25 TDDDG – soweit einschlägig).</p>
          </div>

          <div>
            <h2>4. Hosting der Website (Vercel) und Server-Logfiles</h2>
            <p>Diese Website wird über Vercel Inc. gehostet (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA).</p>

            <h3>4.1 Welche Daten werden verarbeitet?</h3>
            <p>Beim Aufruf der Website werden durch Vercel technisch erforderliche Daten verarbeitet (Server-/Request-Daten), z. B.:</p>
            <ul>
              <li>IP-Adresse (bzw. technische Request-Daten)</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Referrer-URL</li>
              <li>Browser-/Geräteinformationen</li>
              <li>Betriebssystem/Hostname</li>
              <li>aufgerufene Seite/Resource-Infos</li>
            </ul>

            <h3>4.2 Zweck und Rechtsgrundlage</h3>
            <p>Zweck ist die technische Bereitstellung, Stabilität, Sicherheit sowie Fehleranalyse.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb der Website).</p>

            <h3>4.3 Speicherdauer</h3>
            <p>Logdaten werden nur so lange gespeichert, wie es für Betrieb/Sicherheit erforderlich ist. Vercel weist für Runtime Logs eine Aufbewahrung von 3 Tagen aus (planabhängig).</p>

            <h3>4.4 Drittlandtransfer</h3>
            <p>Vercel ist unter dem EU–US Data Privacy Framework (DPF) zertifiziert; dadurch kann eine Übermittlung in die USA auf eine anerkannte Garantie gestützt werden.</p>
          </div>

          <div>
            <h2>5. Web Analytics (Vercel Web Analytics)</h2>
            <p>Wir nutzen Vercel Web Analytics, um die Performance und Nutzung der Website auszuwerten und zu verbessern.</p>

            <h3>5.1 Funktionsweise / Daten</h3>
            <p>Vercel Web Analytics nutzt keine Third-Party-Cookies. Laut Vercel werden Endnutzer über einen Hash aus der eingehenden Request erkannt; Session-Informationen werden nach 24 Stunden verworfen.</p>
            <p>Typische (aggregierte) Messdaten sind z. B.:</p>
            <ul>
              <li>Seitenaufrufe und Navigation (aggregiert)</li>
              <li>Performance-Kennzahlen (Web Vitals)</li>
              <li>grobe Geräte-/Browserinformationen</li>
              <li>Referrer-Informationen</li>
            </ul>

            <h3>5.2 Zweck und Rechtsgrundlage</h3>
            <p>Zweck: Optimierung von Stabilität, Performance und Nutzerfreundlichkeit.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Optimierung).</p>

            <h3>5.3 Drittlandtransfer</h3>
            <p>Wie beim Hosting kann eine Verarbeitung/Übermittlung in den USA nicht ausgeschlossen werden; Vercel ist DPF-zertifiziert.</p>
          </div>

          <div>
            <h2>6. Terminbuchung über Microsoft Bookings</h2>
            <p>Auf unserer Website nutzen wir Microsoft Bookings (Microsoft Corporation bzw. Microsoft-Konzerngesellschaften; im EU-Kontext häufig Microsoft Ireland Operations Limited als Vertragspartner je nach Setup).</p>

            <h3>6.1 Welche Daten werden verarbeitet?</h3>
            <p>Bei der Terminbuchung werden insbesondere verarbeitet:</p>
            <ul>
              <li>Name</li>
              <li>E-Mail-Adresse</li>
              <li>ggf. Telefonnummer (falls abgefragt)</li>
              <li>Termindaten (Datum/Uhrzeit, gebuchte Leistung)</li>
              <li>ggf. Freitextangaben, die Sie im Buchungsformular machen</li>
            </ul>

            <h3>6.2 Zweck und Rechtsgrundlage</h3>
            <p>Zweck: Organisation und Durchführung von Terminen sowie Kontaktaufnahme im Zusammenhang mit dem Termin.</p>
            <p>Rechtsgrundlage:</p>
            <ul>
              <li>regelmäßig Art. 6 Abs. 1 lit. b DSGVO (Terminvereinbarung auf Anfrage / Vertragserfüllung)</li>
              <li>ggf. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung bei freiwilligen Zusatzangaben)</li>
            </ul>

            <h3>6.3 Wo werden Bookings-Daten gespeichert?</h3>
            <p>Microsoft beschreibt, dass Bookings-Daten innerhalb der Microsoft-365-Plattform und in Exchange Online gespeichert werden (u. a. über Shared Mailboxes, in denen Kunden-, Mitarbeiter-, Service- und Termindetails liegen).</p>

            <h3>6.4 Cookies/Endgerät bei Bookings</h3>
            <p>Beim Aufruf/der Nutzung des Bookings-Widgets kann Microsoft Cookies und ähnliche Technologien einsetzen (z. B. für Anmeldung/Sicherheit/Sitzungssteuerung). Details ergeben sich aus den Microsoft-Datenschutzhinweisen.</p>

            <h3>6.5 Drittlandtransfer / Garantien</h3>
            <p>Eine Verarbeitung außerhalb der EU/des EWR kann – je nach Microsoft-Setup – nicht ausgeschlossen werden. Microsoft erklärt die Teilnahme am EU–US Data Privacy Framework.</p>
            <p>Außerdem gelten für Microsoft-Online-Services die Regelungen aus dem Microsoft Data Protection Addendum (DPA) (Auftragsverarbeitung).</p>

            <h3>6.6 Speicherdauer</h3>
            <p>Wir speichern Buchungsdaten so lange, wie dies zur Terminabwicklung erforderlich ist und löschen sie anschließend, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
            <p className="italic">Hinweis zur Pflichtangabe: Ohne die als erforderlich gekennzeichneten Daten ist eine Terminbuchung in der Regel nicht möglich.</p>
          </div>

          <div>
            <h2>7. Kontaktaufnahme (z. B. per E-Mail)</h2>
            <p>Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name, E-Mail-Adresse, Inhalt der Nachricht), um Ihre Anfrage zu bearbeiten.</p>
            <p>Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anfrage/Anbahnung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation)</p>
            <p>Speicherdauer: solange erforderlich für Bearbeitung; darüber hinaus nur, wenn dies zur Dokumentation oder aufgrund gesetzlicher Pflichten erforderlich ist.</p>
          </div>

          <div>
            <h2>8. Externe Links & Affiliate-Links</h2>
            <p>Unsere Website enthält Links zu externen Webseiten Dritter. Für deren Inhalte und Datenverarbeitung sind ausschließlich die jeweiligen Betreiber verantwortlich.</p>

            <h3>Affiliate-Links</h3>
            <p>Einige Links können Affiliate-Links sein. Das bedeutet:</p>
            <ul>
              <li>Wir erhalten ggf. eine Provision, wenn Sie über einen als „Affiliate" gekennzeichneten Link etwas buchen/kaufen.</li>
              <li>Für Sie entstehen dadurch keine Mehrkosten.</li>
            </ul>
            <p>Beim Klick auf einen Affiliate-Link verlassen Sie unsere Website. Ab diesem Zeitpunkt richtet sich die Datenverarbeitung nach den Datenschutzbestimmungen des jeweiligen Anbieters/Netzwerks.</p>
          </div>

          <div>
            <h2>9. Empfänger / Auftragsverarbeiter</h2>
            <p>Wir setzen Dienstleister ein, die Daten in unserem Auftrag verarbeiten (Art. 28 DSGVO), insbesondere:</p>
            <ul>
              <li>Vercel Inc. (Hosting, Web Analytics)</li>
              <li>Microsoft (Microsoft Bookings / Microsoft 365 Dienste im Rahmen der Terminorganisation)</li>
            </ul>
          </div>

          <div>
            <h2>10. Datensicherheit</h2>
            <p>Wir nutzen geeignete technische und organisatorische Maßnahmen, insbesondere:</p>
            <ul>
              <li>TLS/SSL-Verschlüsselung (https)</li>
              <li>Zugriffsbeschränkungen und Berechtigungskonzepte</li>
              <li>Maßnahmen zur Sicherstellung von Verfügbarkeit, Integrität und Vertraulichkeit</li>
            </ul>
          </div>

          <div>
            <h2>11. Ihre Rechte (Betroffenenrechte)</h2>
            <p>Sie haben jederzeit folgende Rechte nach DSGVO:</p>
            <ul>
              <li>Auskunft (Art. 15)</li>
              <li>Berichtigung (Art. 16)</li>
              <li>Löschung (Art. 17)</li>
              <li>Einschränkung der Verarbeitung (Art. 18)</li>
              <li>Datenübertragbarkeit (Art. 20)</li>
              <li>Widerspruch gegen Verarbeitungen auf Basis von Art. 6 Abs. 1 lit. f DSGVO (Art. 21)</li>
            </ul>
            <p>Wenn eine Verarbeitung auf Einwilligung beruht, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).</p>
            <p>Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an: <a href="mailto:paulschmidt@one48.de">paulschmidt@one48.de</a></p>
          </div>

          <div>
            <h2>12. Beschwerderecht bei der Aufsichtsbehörde</h2>
            <p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig für Nordrhein-Westfalen ist insbesondere:</p>
            <p>Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)</p>
            <p>Postfach 20 04 44, 40102 Düsseldorf</p>
            <p>(Visitor: Kavalleriestr. 2–4, 40213 Düsseldorf)</p>
          </div>

          <div>
            <h2>13. Änderungen dieser Datenschutzerklärung</h2>
            <p>Wir passen diese Datenschutzerklärung an, wenn sich Rechtslage, Website-Funktionen oder eingesetzte Dienstleister ändern.</p>
          </div>

        </div>
      </section>
    </main>
  )
}
