import { siteConfig } from "../site-config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <a className="back-link" href={`${basePath}/`}>
        ← Zur Weinliste
      </a>
      <p className="eyebrow dark">Rechtliche Angaben</p>
      <h1>Impressum</h1>

      <div className="legal-warning">
        Vor der Veröffentlichung müssen die vollständige ladungsfähige Anschrift und –
        soweit vorhanden – weitere Register- oder Umsatzsteuerangaben ergänzt und
        rechtlich geprüft werden.
      </div>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {siteConfig.name}
        <br />
        Inhaber: {siteConfig.owner}
        <br />
        [Straße und Hausnummer ergänzen]
        <br />
        [PLZ und Ort ergänzen]
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <br />
        Telefon: [Telefonnummer ergänzen]
      </p>

      <h2>Verantwortlich für den Inhalt</h2>
      <p>
        {siteConfig.owner}
        <br />
        [vollständige Anschrift ergänzen]
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Die gesetzlich passende Erklärung zur Teilnahme oder Nichtteilnahme an einem
        Streitbeilegungsverfahren ist vor Veröffentlichung anhand der konkreten
        Unternehmenssituation zu ergänzen.
      </p>
    </main>
  );
}
