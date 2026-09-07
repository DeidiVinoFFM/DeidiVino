import type { Metadata } from "next";
import { siteConfig } from "../site-config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Impressum | DeidiVino",
  description: "Impressum und Kontaktangaben von DeidiVino.",
  alternates: { canonical: "https://deidivinoffm.github.io/DeidiVino/impressum/" },
};

export default function ImpressumPage() {
  return (
    <main className="legal-page">
      <a className="back-link" href={`${basePath}/`}>← Zur Weinauswahl</a>
      <p className="eyebrow dark">Rechtliche Angaben</p>
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
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
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={`tel:${siteConfig.phoneHref}`}>{siteConfig.phoneDisplay}</a>
        <br />
        E-Mail: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>

      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
        einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <p><small>Stand: 1. September 2026</small></p>
    </main>
  );
}
