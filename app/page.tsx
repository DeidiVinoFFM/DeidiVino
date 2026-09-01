"use client";

import {
  ArrowDown,
  AtSign,
  Check,
  Grape,
  Mail,
  MapPin,
  Plus,
  Search,
  Sparkles,
  Wine as WineIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { inventoryAsOf, wines, type Wine } from "./data/wines";
import { siteConfig } from "./site-config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const categories = [
  "Alle",
  "Weißwein",
  "Rotwein",
  "Rosé",
  "Prickelnd",
  "Alkoholfrei",
];

const budgets = [
  { label: "Alle Preise", value: "all" },
  { label: "Bis 12 €", value: "under12" },
  { label: "12–20 €", value: "12to20" },
  { label: "20–29 €", value: "20to30" },
  { label: "Ab 30 €", value: "over30" },
];

const featuredLabels: Record<string, string> = {
  W0009: "Preis–Leistung",
  W0036: "Prickelnd",
  W0111: "Allrounder",
  W0027: "Rot mit Charakter",
  W0057: "Edelsüßer Abschluss",
  W0121: "Besondere Lage",
};

function formatEuro(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

function formatVolume(value: number) {
  return `${value.toLocaleString("de-DE", { maximumFractionDigits: 3 })} l`;
}

function matchesBudget(wine: Wine, budget: string) {
  if (budget === "under12") return wine.price <= 12;
  if (budget === "12to20") return wine.price > 12 && wine.price < 20;
  if (budget === "20to30") return wine.price >= 20 && wine.price < 30;
  if (budget === "over30") return wine.price >= 30;
  return true;
}

function wineryShortName(winery: string) {
  return winery.replace(/^Weingut /, "");
}

function WineCard({
  wine,
  selected,
  onToggle,
  featureLabel,
}: {
  wine: Wine;
  selected: boolean;
  onToggle: () => void;
  featureLabel?: string;
}) {
  const isLow = wine.availability === "Nur wenige Flaschen";

  return (
    <article className={`wine-card${selected ? " is-selected" : ""}`}>
      <div className="wine-card-topline">
        <span className="region-label">
          <MapPin aria-hidden="true" size={14} />
          {wine.region}
        </span>
        <span className={`availability${isLow ? " is-low" : ""}`}>
          {wine.availability}
        </span>
      </div>

      {featureLabel && <span className="feature-label">{featureLabel}</span>}

      <p className="winery-name">{wineryShortName(wine.winery)}</p>
      <h3>{wine.name}</h3>

      <div className="wine-tags" aria-label="Weininformationen">
        <span>{wine.vintage}</span>
        <span>{wine.grape}</span>
        <span>{wine.style}</span>
      </div>

      <div className="wine-card-bottom">
        <div>
          <strong>{formatEuro(wine.price)}</strong>
          <small>
            {formatVolume(wine.volume)} · {formatEuro(wine.unitPrice)}/l
          </small>
        </div>
        <button
          type="button"
          className="select-wine-button"
          aria-pressed={selected}
          onClick={onToggle}
        >
          {selected ? <Check aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
          {selected ? "Vorgemerkt" : "Vormerken"}
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const [category, setCategory] = useState("Alle");
  const [budget, setBudget] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const featuredWines = wines.filter((wine) => wine.featured);
  const wineryCount = new Set(wines.map((wine) => wine.winery)).size;
  const minPrice = Math.min(...wines.map((wine) => wine.price));
  const maxPrice = Math.max(...wines.map((wine) => wine.price));

  const filteredWines = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("de-DE");
    return wines.filter((wine) => {
      const matchesCategory = category === "Alle" || wine.category === category;
      const matchesText =
        normalizedQuery.length === 0 ||
        [wine.name, wine.winery, wine.region, wine.grape, wine.style, wine.profile]
          .join(" ")
          .toLocaleLowerCase("de-DE")
          .includes(normalizedQuery);
      return matchesCategory && matchesBudget(wine, budget) && matchesText;
    });
  }, [budget, category, query]);

  const selectedWines = wines.filter((wine) => selectedIds.includes(wine.id));

  const toggleWine = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const inquiryBody = selectedWines.length
    ? `Hallo Dieter,\n\nich interessiere mich für folgende Weine:\n\n${selectedWines
        .map(
          (wine) =>
            `– ${wine.name}, ${wine.winery}, ${wine.vintage} (${formatEuro(wine.price)})`,
        )
        .join("\n")}\n\nBitte gib mir kurz Rückmeldung zu Verfügbarkeit, Abholung/Versand und Gesamtpreis.\n\nViele Grüße`
    : "Hallo Dieter,\n\nich interessiere mich für Deine aktuelle Weinauswahl und freue mich über eine persönliche Empfehlung. Mein Geschmack, Anlass und Budget:\n\n– Geschmack: \n– Anlass: \n– Budget je Flasche: \n– Anzahl Flaschen: \n\nViele Grüße";

  const inquiryUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    selectedWines.length ? "Weinanfrage DeidiVino" : "Persönliche Weinempfehlung",
  )}&body=${encodeURIComponent(inquiryBody)}`;

  return (
    <>
      <div className="age-strip">Wein und Sekt werden ausschließlich an Personen ab 16 Jahren abgegeben.</div>

      <header className="site-header">
        <div className="site-header-inner">
          <a className="brand-link" href="#top" aria-label="DeidiVino – Startseite">
            <img src={`${basePath}/deidivino-logo.png`} alt="DeidiVino – Pure Taste" />
          </a>
          <nav aria-label="Hauptnavigation">
            <a href="#empfehlungen">Einstieg</a>
            <a href="#sortiment">Weine</a>
            <a href="#beratung">Beratung</a>
          </nav>
          <a className="header-contact" href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden="true" size={17} />
            Kontakt
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-shell page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Aktuelle Auswahl · {inventoryAsOf}</p>
            <h1 id="hero-title">Handverlesen. Persönlich. Verfügbar.</h1>
            <p className="hero-intro">
              Charaktervolle Weine ausgewählter deutscher Weingüter – vom unkomplizierten
              Feierabendwein bis zur großen Lage. Entdecke die aktuelle Auswahl oder lass
              Dich persönlich beraten.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#sortiment">
                Auswahl entdecken
                <ArrowDown aria-hidden="true" size={18} />
              </a>
              <a className="button button-ghost" href={inquiryUrl}>
                <Mail aria-hidden="true" size={18} />
                Empfehlung anfragen
              </a>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>Verfügbare Positionen</dt>
                <dd>{wines.length}</dd>
              </div>
              <div>
                <dt>Ausgewählte Weingüter</dt>
                <dd>{wineryCount}</dd>
              </div>
              <div>
                <dt>Preisspanne</dt>
                <dd>
                  {Math.round(minPrice)}–{Math.round(maxPrice)} €
                </dd>
              </div>
            </dl>
          </div>
          <div className="hero-image" aria-hidden="true">
            <img src={`${basePath}/hero-wine.webp`} alt="" />
          </div>
        </section>

        <section id="empfehlungen" className="section page-width" aria-labelledby="featured-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark">Schneller Einstieg</p>
              <h2 id="featured-heading">Sechs Weine zum Entdecken</h2>
            </div>
            <p>
              Eine Auswahl über unterschiedliche Stilrichtungen und Preisstufen hinweg –
              zusammengestellt aus dem aktuell verfügbaren Sortiment.
            </p>
          </div>
          <div className="featured-grid">
            {featuredWines.map((wine) => (
              <WineCard
                key={wine.id}
                wine={wine}
                selected={selectedIds.includes(wine.id)}
                onToggle={() => toggleWine(wine.id)}
                featureLabel={featuredLabels[wine.id]}
              />
            ))}
          </div>
        </section>

        <section id="sortiment" className="section catalog-section" aria-labelledby="catalog-heading">
          <div className="page-width">
            <div className="section-heading catalog-title">
              <div>
                <p className="eyebrow dark">Sofort verfügbare Weine</p>
                <h2 id="catalog-heading">Aktuelle Auswahl</h2>
              </div>
              <p>
                Filtere nach Weinart oder Budget. Über „Vormerken“ kannst Du mehrere Weine
                gemeinsam und unverbindlich anfragen.
              </p>
            </div>

            <div className="catalog-controls" aria-label="Weinliste filtern">
              <label className="search-field">
                <span className="sr-only">Weine durchsuchen</span>
                <Search aria-hidden="true" size={19} />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Wein, Weingut, Rebsorte oder Region"
                />
              </label>

              <div className="filter-group" aria-label="Weinart">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`filter-chip${category === item ? " is-active" : ""}`}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="filter-group budget-filter" aria-label="Budget">
                {budgets.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className={`filter-chip subtle${budget === item.value ? " is-active" : ""}`}
                    aria-pressed={budget === item.value}
                    onClick={() => setBudget(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="result-count" aria-live="polite">
              {filteredWines.length} {filteredWines.length === 1 ? "Position" : "Positionen"}
            </p>

            {filteredWines.length ? (
              <div className="catalog-grid">
                {filteredWines.map((wine) => (
                  <WineCard
                    key={wine.id}
                    wine={wine}
                    selected={selectedIds.includes(wine.id)}
                    onToggle={() => toggleWine(wine.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <WineIcon aria-hidden="true" size={32} />
                <h3>Keine passende Position gefunden</h3>
                <p>Setze einen Filter zurück oder schreib mir direkt für eine persönliche Empfehlung.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setCategory("Alle");
                    setBudget("all");
                    setQuery("");
                  }}
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="beratung" className="advice-section page-width" aria-labelledby="advice-heading">
          <div className="advice-copy">
            <p className="eyebrow">Persönliche Weinberatung</p>
            <h2 id="advice-heading">Du musst Dich nicht durch {wines.length} Positionen probieren.</h2>
            <p>
              Nenne mir einfach Anlass, Geschmacksrichtung, Budget und gewünschte
              Flaschenzahl. Ich antworte mit einer kleinen, konkreten Auswahl aus dem
              verfügbaren Bestand.
            </p>
            <a className="button button-light" href={inquiryUrl}>
              <Mail aria-hidden="true" size={18} />
              Persönliche Auswahl anfragen
            </a>
          </div>
          <div className="advice-points">
            <div>
              <Sparkles aria-hidden="true" size={22} />
              <span>Anlass</span>
              <strong>Alltag, Menü, Geschenk oder besonderer Abend</strong>
            </div>
            <div>
              <Grape aria-hidden="true" size={22} />
              <span>Geschmack</span>
              <strong>Frisch, mineralisch, kräftig, feinherb oder rot</strong>
            </div>
            <div>
              <WineIcon aria-hidden="true" size={22} />
              <span>Budget</span>
              <strong>Vom Entdeckerwein bis zur besonderen Lage</strong>
            </div>
          </div>
        </section>

        <section className="steps-section page-width" aria-labelledby="steps-heading">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow dark">So funktioniert die Anfrage</p>
              <h2 id="steps-heading">Drei einfache Schritte</h2>
            </div>
          </div>
          <ol className="steps-list">
            <li>
              <span>1</span>
              <div>
                <strong>Weine vormerken</strong>
                <p>Wähle interessante Positionen aus oder bitte direkt um Beratung.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Anfrage senden</strong>
                <p>Die vorausgefüllte E-Mail enthält Deine Auswahl – noch ohne Kaufverpflichtung.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Details abstimmen</strong>
                <p>Du erhältst Bestätigung, Gesamtpreis sowie Informationen zu Abholung oder Versand.</p>
              </div>
            </li>
          </ol>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-grid">
          <div>
            <img src={`${basePath}/deidivino-logo.png`} alt="DeidiVino – Pure Taste" />
            <p>Handverlesene Weine und persönliche Beratung.</p>
          </div>
          <div className="footer-links">
            <a href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" size={16} />
              {siteConfig.email}
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
              <AtSign aria-hidden="true" size={16} />
              {siteConfig.instagramHandle}
            </a>
          </div>
          <div className="legal-links">
            <a href={`${basePath}/impressum/`}>Impressum</a>
            <a href={`${basePath}/datenschutz/`}>Datenschutz</a>
          </div>
        </div>
        <div className="page-width footer-note">
          <p>
            Alle Preise sind Bruttopreise inklusive 19 % MwSt. und verstehen sich zuzüglich
            gegebenenfalls anfallender Versandkosten. Soweit nicht anders angegeben: 0,75 l.
            Angebot freibleibend und solange der Vorrat reicht. Stand: {inventoryAsOf}.
          </p>
          <p>Abgabe von Wein und Sekt ausschließlich an Personen ab 16 Jahren.</p>
        </div>
      </footer>

      {selectedWines.length > 0 && (
        <aside className="inquiry-bar" aria-label="Vorgemerkte Weine">
          <div>
            <strong>
              {selectedWines.length} {selectedWines.length === 1 ? "Wein" : "Weine"} vorgemerkt
            </strong>
            <button type="button" onClick={() => setSelectedIds([])}>
              Auswahl löschen
            </button>
          </div>
          <a className="button button-primary" href={inquiryUrl}>
            <Mail aria-hidden="true" size={18} />
            Auswahl anfragen
          </a>
        </aside>
      )}
    </>
  );
}
