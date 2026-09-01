import { siteConfig } from "../site-config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <a className="back-link" href={`${basePath}/`}>
        ← Zur Weinliste
      </a>
      <p className="eyebrow dark">Rechtliche Angaben</p>
      <h1>Datenschutzerklärung</h1>

      <div className="legal-warning">
        Diese Vorlage beschreibt die technisch umgesetzte statische Website ohne
        Analysewerkzeuge, Cookies oder Kontaktformular. Verantwortlichenanschrift und
        tatsächliche Hosting-Konfiguration müssen vor Veröffentlichung ergänzt und geprüft
        werden.
      </div>

      <h2>1. Verantwortliche Stelle</h2>
      <p>
        {siteConfig.name}, Inhaber {siteConfig.owner}
        <br />
        [vollständige Anschrift ergänzen]
        <br />
        E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>

      <h2>2. Bereitstellung der Website</h2>
      <p>
        Beim Aufruf einer über GitHub Pages bereitgestellten Website verarbeitet der
        Hostinganbieter technisch erforderliche Verbindungsdaten, insbesondere IP-Adresse,
        Zeitpunkt des Abrufs, angeforderte Datei sowie Browser- und Geräteinformationen.
        Einzelheiten sind in den Datenschutzinformationen des tatsächlich eingesetzten
        Hostinganbieters zu dokumentieren.
      </p>

      <h2>3. Lokale Funktionen</h2>
      <p>
        Suchfilter und die Merkliste funktionieren ausschließlich im Browser. Die Auswahl
        wird nicht dauerhaft gespeichert und nicht an einen Server übertragen. Erst beim
        Anklicken von „Auswahl anfragen“ wird das lokale E-Mail-Programm geöffnet.
      </p>

      <h2>4. Kontakt per E-Mail</h2>
      <p>
        Wenn Du per E-Mail Kontakt aufnimmst, werden die von Dir übermittelten Angaben zur
        Bearbeitung Deiner Anfrage und gegebenenfalls zur Vertragsabwicklung verarbeitet.
        Aufbewahrungsdauer und Rechtsgrundlagen sind entsprechend der tatsächlichen
        Geschäftsprozesse zu ergänzen.
      </p>

      <h2>5. Externer Link zu Instagram</h2>
      <p>
        Die Website enthält lediglich einen Link zu Instagram. Beim bloßen Seitenaufruf
        werden keine Inhalte von Instagram eingebettet. Erst beim Anklicken des Links wird
        eine Verbindung zum externen Anbieter hergestellt.
      </p>

      <h2>6. Cookies und Reichweitenmessung</h2>
      <p>
        In der bereitgestellten Fassung werden keine Cookies, Analysewerkzeuge, externen
        Schriftarten oder Werbetracker eingesetzt.
      </p>

      <h2>7. Betroffenenrechte</h2>
      <p>
        Die vollständigen Informationen zu Auskunft, Berichtigung, Löschung,
        Einschränkung, Widerspruch, Datenübertragbarkeit und Beschwerderecht sind vor der
        Veröffentlichung rechtlich passend zu ergänzen.
      </p>
    </main>
  );
}
