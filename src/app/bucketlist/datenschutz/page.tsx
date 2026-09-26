import type { Metadata } from 'next'

const url = 'https://www.one48.de/bucketlist/datenschutz'
const title = 'Datenschutzerklärung – Bucketlist'
const description = 'Welche Daten die iPhone-App Bucketlist verarbeitet, wohin sie gehen und welche Rechte du hast.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { title, description, url, siteName: 'one48', locale: 'de_DE', type: 'article' },
}

const link = 'underline decoration-[#35C8B4] decoration-2 underline-offset-2 hover:text-[#1A7F72] break-words'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold">{title}</h2>
      {children}
    </section>
  )
}

function Mail() {
  return (
    <a href="mailto:paulschmidt@one48.de" className={link}>
      paulschmidt@one48.de
    </a>
  )
}

const serverData: [string, string][] = [
  ['Kennung, E-Mail-Adresse und Name von Apple', 'Anmeldung, Zuordnung deiner Daten'],
  ['Profil: Name, Handle, Profilbild (falls gesetzt)', 'Anzeige bei veröffentlichten Listen'],
  [
    'Orte: Google-ID, Name, Lage, Stadt, Land, Kategorie, deine Notizen, Tags, Besuche, Bewertungen',
    'Sync zwischen deinen Geräten',
  ],
  [
    'Deine Listen mit Einträgen, Notizen und Sichtbarkeit',
    'Sync; bei „Öffentlich“ oder „Per Link“ für andere sichtbar',
  ],
  ['Welchen Listen du folgst', 'Sync; andere sehen nur die Anzahl der Follower, nie wer folgt'],
  ['Wen du blockiert hast', 'Sync; die Blockierten erfahren es nicht'],
  ['Meldungen, die du abschickst', 'Moderation (siehe unten)'],
  [
    'Technische Protokolle (IP-Adresse, Zeitpunkt, Anfrage)',
    'Betrieb und Sicherheit, von Supabase kurzzeitig gespeichert',
  ],
]

export default function BucketlistPrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#111111] font-body">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#1A7F72]">Bucketlist</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Datenschutzerklärung</h1>
        <p className="mt-3 text-[#6B6B6B]">Stand: 26. September 2026</p>

        <article className="mt-8 space-y-10 rounded-3xl bg-white p-6 leading-relaxed shadow-sm ring-1 ring-black/5 sm:p-10">
          <Section title="Verantwortlich">
            <p>
              Paul Schmidt
              <br />
              Gärtnergasse 9, 1030 Wien, Österreich
              <br />
              E-Mail: <Mail />
            </p>
          </Section>

          <Section title="Kurz gesagt">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Bucketlist funktioniert <strong>ohne Konto</strong>. Dann bleiben deine Orte und Listen auf deinem
                iPhone.
              </li>
              <li>
                Mit einem Konto (Anmelden mit Apple) liegen deine Orte und Listen zusätzlich auf unserem Server in{' '}
                <strong>Frankfurt am Main</strong> (Supabase, Rechenzentrum von Amazon Web Services, Region
                eu-central-1), damit sie auf allen deinen Geräten gleich sind.
              </li>
              <li>
                Dein <strong>Standort</strong> geht nie an unseren Server. Für Suchen in der Nähe geht er an Google.
              </li>
              <li>Keine Werbung, kein Tracking, keine Analyse-Werkzeuge, kein Verkauf von Daten.</li>
            </ul>
          </Section>

          <Section title="Ohne Konto">
            <p>
              Die App speichert auf deinem iPhone: deine Orte (mit Notizen, Tags, Besuchen, Bewertungen und Fotos von
              Google), deine Listen, die Listen, denen du folgst, wen du blockiert hast, und die zuletzt gesehene
              Kartenposition. Diese Daten verlassen das Gerät nur, wenn du sie selbst exportierst.
            </p>
            <p>
              <strong>Google Maps Platform</strong> (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
              Irland): Die Karte, die Ortssuche und Ortsdetails (Öffnungszeiten, Fotos, Bewertungen, Adresse) lädt
              die App direkt bei Google. Dabei erhält Google deine IP-Adresse, deine Suchbegriffe, die angefragten
              Orte und, für Treffer in deiner Nähe, deinen Standort. Google erfährt dabei nicht, wer du bei
              Bucketlist bist. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (die Suche ist die Funktion, die du
              nutzt). Google kann Daten in die USA übermitteln; Google ist unter dem EU-US Data Privacy Framework
              zertifiziert. Datenschutzerklärung von Google:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={link}>
                policies.google.com/privacy
              </a>
            </p>
            <p>
              <strong>Standort:</strong> Die App fragt nach der Freigabe „Beim Verwenden der App“. Sie nutzt den
              Standort für die Karte, Entfernungen und die Suche in der Nähe und speichert auf dem Gerät nur die
              letzte Position (für den Start der Karte und die Suche beim Teilen aus anderen Apps). Ohne Freigabe
              funktioniert die App weiter.
            </p>
          </Section>

          <Section title="Mit Konto">
            <p>
              <strong>Anmelden mit Apple</strong> (Apple Distribution International Ltd., Hollyhill Industrial
              Estate, Cork, Irland): Apple gibt uns eine Kennung, auf Wunsch deinen Namen und deine E-Mail-Adresse
              (auch eine anonyme Weiterleitungsadresse von Apple). Ein Passwort gibt es bei uns nicht.
            </p>
            <p>
              <strong>Was auf unserem Server liegt</strong> (Supabase Inc., Auftragsverarbeiter, Server in Frankfurt
              am Main):
            </p>
            <dl className="divide-y divide-black/5 rounded-2xl ring-1 ring-black/5">
              {serverData.map(([data, purpose]) => (
                <div key={data} className="px-4 py-3">
                  <dt className="font-semibold">{data}</dt>
                  <dd className="text-[#6B6B6B]">{purpose}</dd>
                </div>
              ))}
            </dl>
            <p>
              Öffnungszeiten, Fotos, Bewertungen, Website und Telefonnummer von Google speichern wir nicht auf dem
              Server; jedes Gerät lädt sie selbst. Name und Lage eines Google-Orts erneuert der Server höchstens alle
              28 Tage bei Google (ohne Bezug zu dir).
            </p>
            <p>
              Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertrag: du nutzt Konto und Sync). Die Übertragung ist
              verschlüsselt (TLS).
            </p>
            <p>
              <strong>Veröffentlichte Listen:</strong> Stellst du eine Liste auf „Öffentlich“, sehen alle Nutzer der
              App sie mit Titel, Beschreibung, Einträgen und deren öffentlicher Notiz sowie deinem Namen, Handle und
              Profilbild. „Per Link“ sieht nur, wer den Link hat. Deine anderen Orte, privaten Notizen, Tags, Besuche
              und Bewertungen sieht niemand.
            </p>
            <p>
              <strong>Melden und Blockieren:</strong> Meldest du eine Liste oder ein Profil, speichern wir den Grund,
              deine Angaben, wer gemeldet hat und was gemeldet wurde, und schicken die Meldung per E-Mail an die
              Moderation (Versand über Resend, Resend Inc., USA, auf Grundlage der EU-Standardvertragsklauseln).
              Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (Schutz der Nutzer vor rechtswidrigen und anstößigen
              Inhalten). Meldungen löschen wir 12 Monate nach ihrer Bearbeitung.
            </p>
          </Section>

          <Section title="Speicherdauer und Löschen">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Dein Konto und alle Daten dazu bleiben, bis du das Konto löschst: App → Einstellungen → Konto →
                „Konto löschen“. Dann löschen wir sofort Konto, Profil, Profilbild, Orte, Listen (auch
                veröffentlichte), Follows, Blockierungen und deine Meldungen und widerrufen die Anmeldung mit Apple.
                Auf dem iPhone kannst du deine Daten dabei behalten oder mitlöschen.
              </li>
              <li>
                Einzelne gelöschte Orte und Listen markiert der Server zunächst als gelöscht, damit es alle deine
                Geräte erfahren, und entfernt sie nach 90 Tagen endgültig.
              </li>
              <li>Sicherungskopien der Datenbank (sofern eingerichtet) überschreiben sich nach 7 Tagen.</li>
            </ul>
          </Section>

          <Section title="Deine Rechte">
            <p>
              Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
              Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20; der Export in den Einstellungen gibt dir deine
              Daten als JSON-Datei) und Widerspruch gegen Verarbeitungen nach Art. 6 Abs. 1 lit. f (Art. 21). Wende
              dich dafür an <Mail />.
            </p>
            <p>
              Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel bei der
              Österreichischen Datenschutzbehörde (Barichgasse 40–42, 1030 Wien,{' '}
              <a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className={link}>
                dsb.gv.at
              </a>
              ).
            </p>
          </Section>

          <Section title="Kinder">
            <p>Die App richtet sich nicht an Kinder unter 16 Jahren.</p>
          </Section>

          <Section title="Änderungen">
            <p>
              Ändert sich die Verarbeitung, passen wir diese Erklärung an und weisen in der App darauf hin.
            </p>
          </Section>
        </article>

        <p className="mt-8 text-sm text-[#6B6B6B]">
          Diese Seite liegt auf one48.de. Für den Besuch der Website selbst gilt die{' '}
          <a href="/legal#datenschutz" className={link}>
            Datenschutzerklärung von one48
          </a>
          .
        </p>
      </div>
    </div>
  )
}
