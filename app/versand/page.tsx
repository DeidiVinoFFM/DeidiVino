import type { Metadata } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Versand und Lieferung | DeidiVino",
  description: "Versandkosten und persönliche Lieferung der DeidiVino-Weinauswahl.",
};

export default function VersandPage() {
  return (
    <main className="legal-page shipping-page">
      <p className="legal-kicker">DeidiVino</p>
      <h1>Versand und Lieferung</h1>
      <p className="legal-intro">
        Deine Weine werden in geeigneten Flaschenversandkartons verschickt. Vor der
        verbindlichen Bestellung erhältst Du immer den vollständigen Gesamtpreis
        einschließlich der konkreten Versand- oder Lieferkosten.
      </p>

      <h2>Versand innerhalb Deutschlands</h2>
      <div className="shipping-table" role="table" aria-label="Versandkosten innerhalb Deutschlands">
        <div role="row"><strong role="cell">Bis 6 Flaschen</strong><span role="cell">7,90 €</span></div>
        <div role="row"><strong role="cell">7 bis 12 Flaschen</strong><span role="cell">10,90 €</span></div>
        <div role="row"><strong role="cell">13 bis 18 Flaschen</strong><span role="cell">14,90 €</span></div>
        <div role="row"><strong role="cell">Mehr als 18 Flaschen</strong><span role="cell">Individuell nach Anzahl und Gewicht</span></div>
      </div>
      <p>
        Die Staffel gilt für Standardflaschen mit 0,75 l auf dem deutschen Festland.
        Für Inselzustellungen, Magnumflaschen oder andere Sonderformate können abweichende
        Kosten entstehen; diese werden vor der Bestellung ausdrücklich mitgeteilt.
      </p>

      <h2>Persönliche Lieferung rund um Schöneck-Büdesheim</h2>
      <p>
        Eine persönliche Lieferung ist nach Absprache möglich. Der Lieferaufschlag richtet
        sich nach der einfachen Entfernung ab Schöneck-Büdesheim:
      </p>
      <div className="shipping-table" role="table" aria-label="Lieferkosten rund um Schöneck-Büdesheim">
        <div role="row"><strong role="cell">Bis 5 km</strong><span role="cell">3,00 €</span></div>
        <div role="row"><strong role="cell">Über 5 bis 10 km</strong><span role="cell">5,00 €</span></div>
        <div role="row"><strong role="cell">Über 10 bis 20 km</strong><span role="cell">8,00 €</span></div>
        <div role="row"><strong role="cell">Über 20 km</strong><span role="cell">Nach individueller Vereinbarung</span></div>
      </div>
      <p>Liefertermin und Übergabe werden persönlich abgestimmt.</p>

      <h2>Lieferzeit und Transportrisiko</h2>
      <p>
        Die voraussichtliche Lieferzeit wird in der Bestellbestätigung genannt. Bei
        Verbrauchern trägt DeidiVino das Transportrisiko bis zur Übergabe. Sichtbare
        Transportschäden sollten möglichst direkt beim Zusteller dokumentiert und
        anschließend gemeldet werden; Deine gesetzlichen Rechte bleiben unberührt.
      </p>

      <a className="back-link" href={`${basePath}/`}>← Zurück zur Weinauswahl</a>
    </main>
  );
}
