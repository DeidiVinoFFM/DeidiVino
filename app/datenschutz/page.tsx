import { siteConfig } from "../site-config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <a className="back-link" href={`${basePath}/`}>← Zur Weinauswahl</a>
      <p className="eyebrow dark">Informationen zum Datenschutz</p>
      <h1>Datenschutzerklärung</h1>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:
      </p>
      <p>
        {siteConfig.name}
        <br />
        Inhaber: {siteConfig.owner}
        <br />
        {siteConfig.street}
        <br />
        {siteConfig.postalCode} {siteConfig.city}
        <br />
        {siteConfig.country}
        <br />
        Telefon: <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phoneDisplay}</a>
        <br />
        E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>

      <h2>2. Hosting über GitHub Pages</h2>
      <p>
        Diese Website wird über GitHub Pages bereitgestellt, einen Dienst von GitHub. Beim
        Aufruf der Website werden technisch erforderliche Verbindungsdaten verarbeitet.
        Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene
        Seite oder Datei, Referrer-URL sowie Angaben zu Browser und Betriebssystem gehören.
        GitHub weist darauf hin, IP-Adressen von Besucherinnen und Besuchern von
        GitHub-Pages-Websites zu Sicherheitszwecken zu protokollieren und zu speichern.
      </p>
      <p>
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Mein
        berechtigtes Interesse liegt in der sicheren, stabilen und wirtschaftlichen
        Bereitstellung dieser Website. Eine Verarbeitung von Daten in den USA kann nicht
        ausgeschlossen werden. Informationen zur Datenverarbeitung und zu internationalen
        Datentransfers enthält die {" "}
        <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">
          Datenschutzerklärung von GitHub
        </a>.
      </p>

      <h2>3. Suche, Filter und gemerkte Weine</h2>
      <p>
        Die Suche, die Filter und die Merkliste funktionieren ausschließlich lokal in
        Deinem Browser. Deine Auswahl wird nicht dauerhaft gespeichert und nicht an mich
        oder GitHub übermittelt. Erst wenn Du auf „Jetzt anfragen“ klickst, wird Dein
        E-Mail-Programm mit einem vorbereiteten Nachrichtentext geöffnet. Du entscheidest
        selbst, ob und mit welchem Inhalt Du die Nachricht versendest.
      </p>

      <h2>4. Kontaktaufnahme per E-Mail oder Telefon</h2>
      <p>
        Wenn Du per E-Mail oder Telefon Kontakt aufnimmst, verarbeite ich die von Dir
        mitgeteilten Daten, um Deine Anfrage zu beantworten. Geht es um eine konkrete
        Bestellung oder eine vorvertragliche Anfrage, ist Art. 6 Abs. 1 lit. b DSGVO die
        Rechtsgrundlage. Bei sonstigen Anliegen erfolgt die Verarbeitung auf Grundlage von
        Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse liegt in der Bearbeitung und
        Beantwortung Deiner Anfrage.
      </p>
      <p>
        Für die E-Mail-Kommunikation nutze ich Gmail, einen Dienst der Google Ireland
        Limited, Gordon House, Barrow Street, Dublin 4, Irland. Dabei kann eine Verarbeitung
        von Daten außerhalb der Europäischen Union, insbesondere in den USA, nicht
        ausgeschlossen werden. Weitere Informationen findest Du in der {" "}
        <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer">
          Datenschutzerklärung von Google
        </a>.
      </p>
      <p>
        Anfragedaten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich
        sind und keine gesetzlichen Aufbewahrungspflichten oder Ansprüche einer Löschung
        entgegenstehen. Daten zu Bestellungen und Geschäftsunterlagen werden entsprechend
        den gesetzlichen handels- und steuerrechtlichen Aufbewahrungsfristen gespeichert.
      </p>

      <h2>5. Link zu Instagram</h2>
      <p>
        Diese Website enthält lediglich einen externen Link zu meinem Instagram-Profil. Es
        werden keine Instagram-Inhalte eingebettet und beim bloßen Besuch dieser Website
        keine Daten an Instagram übertragen. Erst wenn Du den Link anklickst, verlässt Du
        diese Website. Ab diesem Zeitpunkt verarbeitet Meta Platforms Ireland Limited die
        beim Aufruf anfallenden Daten nach eigener Verantwortlichkeit. Einzelheiten findest
        Du in der {" "}
        <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noreferrer">
          Datenschutzrichtlinie von Instagram
        </a>.
      </p>

      <h2>6. Cookies, Analyse und externe Inhalte</h2>
      <p>
        Diese Website setzt keine Cookies, keine Analyse- oder Werbewerkzeuge und keine
        extern geladenen Schriftarten ein. Es sind keine Videos, Karten, Social-Media-Feeds
        oder sonstigen Inhalte von Drittanbietern eingebettet.
      </p>

      <h2>7. Deine Rechte</h2>
      <p>Dir stehen nach der DSGVO insbesondere folgende Rechte zu:</p>
      <ul>
        <li>Auskunft über Deine verarbeiteten personenbezogenen Daten (Art. 15 DSGVO),</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
        <li>Löschung Deiner Daten, soweit die Voraussetzungen vorliegen (Art. 17 DSGVO),</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO) und</li>
        <li>Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO).</li>
      </ul>
      <p>
        Zur Ausübung Deiner Rechte genügt eine Nachricht an {" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Du hast außerdem das
        Recht, Dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
        Für Hessen ist dies insbesondere die {" "}
        <a href="https://datenschutz.hessen.de/" target="_blank" rel="noreferrer">
          hessische Datenschutz-Aufsichtsbehörde
        </a>, Gustav-Stresemann-Ring 1, 65189 Wiesbaden.
      </p>

      <h2>8. Aktualität dieser Erklärung</h2>
      <p>
        Diese Datenschutzerklärung entspricht dem technischen Stand der Website vom
        1. September 2026. Wenn Funktionen, Dienstleister oder Kommunikationswege geändert
        werden, wird sie entsprechend angepasst.
      </p>
    </main>
  );
}
