"use client";

/* eslint-disable @next/next/no-img-element -- Static GitHub Pages has no image-optimization server. */

import {
  ArrowDown,
  AtSign,
  Check,
  Copy,
  Grape,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Sparkles,
  Wine as WineIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { inventoryAsOf, wines, type Wine } from "./data/wines";
import { siteConfig } from "./site-config";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const categories = ["Alle", "Weißwein", "Rotwein", "Rosé", "Prickelnd", "Alkoholfrei"];

const budgets = [
  { label: "Alle Preise", value: "all" },
  { label: "Bis 12 €", value: "under12" },
  { label: "12–20 €", value: "12to20" },
  { label: "20–29 €", value: "20to30" },
  { label: "Ab 30 €", value: "over30" },
];

const featuredLabels: Record<string, string> = {
  W0009: "Starker Einstieg",
  W0036: "Fein prickelnd",
  W0111: "Passt zu vielem",
  W0027: "Rot mit Charakter",
  W0057: "Für den Ausklang",
  W0121: "Besondere Herkunft",
};

const discoveryCards = [
  {
    category: "Alle",
    image: "mixed-wines.webp",
    eyebrow: "Quer durch den Keller",
    title: "Entdeckungen für jeden Anlass",
    copy: "Von frisch und leicht bis kraftvoll und vielschichtig – hier beginnt Deine Suche.",
  },
  {
    category: "Rosé",
    image: "rose-wines.webp",
    eyebrow: "Rosé",
    title: "Leichtigkeit im Glas",
    copy: "Trocken, saftig und unkompliziert: perfekt für Terrasse, Freunde und lange Abende.",
  },
  {
    category: "Prickelnd",
    image: "sparkling-wines.webp",
    eyebrow: "Sekt & Secco",
    title: "Wenn es etwas zu feiern gibt",
    copy: "Feine Perlage für den Empfang, den besonderen Moment oder einfach zwischendurch.",
  },
];

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
  const availabilityClass =
    wine.availability === "Nur noch 1 Flasche"
      ? " is-last"
      : wine.availability === "Nur noch wenige Flaschen"
        ? " is-low"
        : "";

  return (
    <article className={`wine-card${selected ? " is-selected" : ""}`}>
      <div className="wine-card-topline">
        <span className="region-label">
          <MapPin aria-hidden="true" size={14} />
          {wine.region}
        </span>
        <span className={`availability${availabilityClass}`}>{wine.availability}</span>
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
          <small>{formatVolume(wine.volume)} · {formatEuro(wine.unitPrice)}/l</small>
        </div>
        <button
          type="button"
          className="select-wine-button"
          aria-pressed={selected}
          onClick={onToggle}
        >
          {selected ? <Check aria-hidden="true" size={17} /> : <Plus aria-hidden="true" size={17} />}
          {selected ? "Gemerkt" : "Merken"}
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
  const [footerVisible, setFooterVisible] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const featuredWines = wines.filter((wine) => wine.featured);
  const wineryCount = new Set(wines.map((wine) => wine.winery)).size;
  const minPrice = Math.min(...wines.map((wine) => wine.price));
  const maxPrice = Math.max(...wines.map((wine) => wine.price));

  useEffect(() => {
    if (["#empfehlungen", "#entdecken", "#weine", "#beratung"].includes(window.location.hash)) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px 110px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const discoverCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    window.requestAnimationFrame(() => scrollToSection("weine"));
  };

  const toggleWine = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const inquiryBody = selectedWines.length
    ? `Hallo Dieter,\n\nich interessiere mich für folgende Weine:\n\n${selectedWines
        .map((wine) => `– ${wine.name}, ${wine.winery}, ${wine.vintage} (${formatEuro(wine.price)})`)
        .join("\n")}\n\nBitte gib mir kurz Rückmeldung zu Verfügbarkeit, Lieferung innerhalb Deutschlands und Gesamtpreis.\n\nViele Grüße`
    : "Hallo Dieter,\n\nich hätte gern eine persönliche Weinempfehlung. Hier ein paar Anhaltspunkte:\n\n– Geschmack: \n– Anlass oder Essen: \n– Budget je Flasche: \n– Anzahl Flaschen: \n\nViele Grüße";

  const inquirySubject = selectedWines.length
    ? "Meine Weinauswahl bei DeidiVino"
    : "Persönliche Weinempfehlung";
  const inquiryUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    inquirySubject,
  )}&body=${encodeURIComponent(inquiryBody)}`;
  const inquiryClipboardText = `An: ${siteConfig.email}\nBetreff: ${inquirySubject}\n\n${inquiryBody}`;

  const copyInquiry = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(inquiryClipboardText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = inquiryClipboardText;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand("copy");
        textArea.remove();
        if (!copied) throw new Error("Kopieren nicht verfügbar");
      }
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 3000);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 5000);
    }
  };

  return (
    <>
      <div className="age-strip">Wein und Sekt gibt es bei DeidiVino ausschließlich ab 16 Jahren.</div>

      <header className="site-header">
        <div className="site-header-inner">
          <button
            type="button"
            className="brand-link"
            aria-label="Zur DeidiVino-Startseite"
            onClick={() => scrollToSection("top")}
          >
            <img
              src={`${basePath}/deidivino-logo.png`}
              alt="DeidiVino – Pure Taste"
            />
          </button>
          <nav aria-label="Hauptnavigation">
            <button type="button" onClick={() => scrollToSection("empfehlungen")}>Favoriten</button>
            <button type="button" onClick={() => scrollToSection("weine")}>Weine entdecken</button>
            <button type="button" onClick={() => scrollToSection("beratung")}>Persönliche Beratung</button>
          </nav>
          <a className="header-contact" href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden="true" size={17} />
            Schreib mir
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-shell page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Persönlich für Dich ausgewählt</p>
            <h1 id="hero-title">Weine, die im Glas Freude machen.</h1>
            <p className="hero-intro">
              Ich suche Weine aus, die ich selbst gern öffne: charaktervoll, ehrlich gemacht
              und mit einem überzeugenden Preis-Genuss-Verhältnis. Schau Dich in Ruhe um –
              oder erzähl mir, was Du vorhast, und ich stelle Dir etwas Passendes zusammen.
            </p>
            <div className="hero-actions">
              <button className="button button-primary" type="button" onClick={() => scrollToSection("weine")}>
                Weine entdecken
                <ArrowDown aria-hidden="true" size={18} />
              </button>
              <a className="button button-ghost" href={inquiryUrl}>
                <Mail aria-hidden="true" size={18} />
                Dieter um Rat fragen
              </a>
              <button className="copy-inquiry-button" type="button" onClick={copyInquiry}>
                {copyStatus === "copied" ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
                {copyStatus === "copied" ? "Anfrage kopiert" : "Anfrage für Webmail kopieren"}
              </button>
            </div>
            <dl className="hero-stats">
              <div><dt>Weine zur Auswahl</dt><dd>{wines.length}</dd></div>
              <div><dt>Weingüter mit Handschrift</dt><dd>{wineryCount}</dd></div>
              <div><dt>Für jedes Budget</dt><dd>{Math.round(minPrice)}–{Math.round(maxPrice)} €</dd></div>
            </dl>
          </div>
          <figure className="hero-image">
            <img
              src={`${basePath}/mixed-wines.webp`}
              alt="Eine von Dieter Grün zusammengestellte Auswahl verschiedener Weinflaschen im Weinkeller"
              loading="eager"
              fetchPriority="high"
            />
            <figcaption>Direkt aus meinem Keller – eine Auswahl, hinter der ich stehe.</figcaption>
          </figure>
        </section>

        <section id="empfehlungen" className="section page-width" aria-labelledby="featured-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow dark">Meine Favoriten für Dich</p>
              <h2 id="featured-heading">Sechs gute Gründe, eine Flasche zu öffnen</h2>
            </div>
            <p>
              Mal frisch und unkompliziert, mal mit Tiefe und besonderer Herkunft: Diese
              Weine zeigen, wie vielseitig die aktuelle Auswahl ist – und sind ein schöner
              Startpunkt, wenn Du Dich inspirieren lassen möchtest.
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

        <section id="entdecken" className="discovery-section page-width" aria-labelledby="discovery-heading">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow dark">Wonach ist Dir heute?</p>
              <h2 id="discovery-heading">Finde Deinen Moment im Glas</h2>
            </div>
          </div>
          <div className="discovery-grid">
            {discoveryCards.map((card) => (
              <button
                type="button"
                className="discovery-card"
                key={card.title}
                onClick={() => discoverCategory(card.category)}
              >
                <img
                  src={`${basePath}/${card.image}`}
                  alt=""
                  loading="lazy"
                />
                <span className="discovery-overlay">
                  <small>{card.eyebrow}</small>
                  <strong>{card.title}</strong>
                  <span>{card.copy}</span>
                  <em>Passende Weine ansehen →</em>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="weine" className="section catalog-section" aria-labelledby="catalog-heading">
          <div className="page-width">
            <div className="section-heading catalog-title">
              <div>
                <p className="eyebrow dark">Was darf es sein?</p>
                <h2 id="catalog-heading">Finde den Wein, der zu Dir passt</h2>
              </div>
              <p>
                Nutze die Suche oder wähle Weinart und Preisrahmen. Interessante Flaschen
                kannst Du merken und anschließend gemeinsam unverbindlich anfragen.
              </p>
            </div>

            <div className="catalog-controls" aria-label="Weine filtern">
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

              <div className="filter-group budget-filter" aria-label="Preisrahmen">
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
              {filteredWines.length} {filteredWines.length === 1 ? "Wein passt" : "Weine passen"} zu Deiner Auswahl
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
                <h3>Noch nicht das Richtige dabei?</h3>
                <p>Ändere Deine Auswahl oder schreib mir – oft finde ich im Gespräch schneller den passenden Wein.</p>
                <button
                  type="button"
                  className="button button-dark"
                  onClick={() => {
                    setCategory("Alle");
                    setBudget("all");
                    setQuery("");
                  }}
                >
                  Alles wieder anzeigen
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="beratung" className="advice-section page-width" aria-labelledby="advice-heading">
          <div className="advice-portrait">
            <img
              src={`${basePath}/dieter-gruen.webp`}
              alt="Dieter Grün von DeidiVino mit einem Glas Wein"
              loading="lazy"
            />
          </div>
          <div className="advice-copy">
            <p className="eyebrow">Persönlich statt kompliziert</p>
            <h2 id="advice-heading">Welcher Wein passt zu Dir?</h2>
            <p>
              Erzähl mir kurz, was Du gern trinkst, für welchen Anlass Du suchst und was Du
              ausgeben möchtest. Ich antworte Dir persönlich mit einer kleinen Auswahl, die
              wirklich zu Deinen Vorstellungen passt.
            </p>
            <div className="advice-contact">
              <a className="button button-light" href={inquiryUrl}>
                <Mail aria-hidden="true" size={18} />
                E-Mail öffnen
              </a>
              <button className="copy-inquiry-button light" type="button" onClick={copyInquiry}>
                {copyStatus === "copied" ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
                {copyStatus === "copied" ? "Anfrage kopiert" : "Für Webmail kopieren"}
              </button>
              <a className="phone-link" href={`tel:${siteConfig.phoneHref}`}>
                <Phone aria-hidden="true" size={18} />
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <div className="advice-points">
              <div>
                <Sparkles aria-hidden="true" size={21} />
                <span>Anlass</span>
                <strong>Alltag, Menü, Geschenk oder besonderer Abend</strong>
              </div>
              <div>
                <Grape aria-hidden="true" size={21} />
                <span>Geschmack</span>
                <strong>Von frisch und mineralisch bis kraftvoll oder feinherb</strong>
              </div>
              <div>
                <WineIcon aria-hidden="true" size={21} />
                <span>Budget</span>
                <strong>Gute Entdeckungen und besondere Flaschen</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="steps-section page-width" aria-labelledby="steps-heading">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow dark">So kommen die Weine zu Dir</p>
              <h2 id="steps-heading">Einfach auswählen und persönlich abstimmen</h2>
            </div>
          </div>
          <ol className="steps-list">
            <li>
              <span>1</span>
              <div><strong>Lieblingsweine merken</strong><p>Wähle interessante Flaschen aus – oder bitte direkt um eine Empfehlung.</p></div>
            </li>
            <li>
              <span>2</span>
              <div><strong>Unverbindlich anfragen</strong><p>Öffne eine vorausgefüllte E-Mail oder kopiere die Anfrage in Deinen bevorzugten Webmailer.</p></div>
            </li>
            <li>
              <span>3</span>
              <div><strong>Alles Weitere klären</strong><p>Du erhältst Verfügbarkeit, Gesamtpreis und die Lieferdetails für Deutschland.</p></div>
            </li>
          </ol>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-grid">
          <div>
            <span className="footer-logo">
              <img
                src={`${basePath}/deidivino-logo.png`}
                alt="DeidiVino – Pure Taste"
                loading="lazy"
              />
            </span>
            <p>Weine mit Persönlichkeit – ausgesucht und beraten von Dieter Grün.</p>
          </div>
          <div className="footer-links">
            <a href={`mailto:${siteConfig.email}`}><Mail aria-hidden="true" size={16} />{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phoneHref}`}><Phone aria-hidden="true" size={16} />{siteConfig.phoneDisplay}</a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><AtSign aria-hidden="true" size={16} />{siteConfig.instagramHandle}</a>
          </div>
          <div className="legal-links">
            <a href={`${basePath}/impressum/`}>Impressum</a>
            <a href={`${basePath}/datenschutz/`}>Datenschutz</a>
          </div>
        </div>
        <div className="page-width footer-note">
          <p>
            Alle Preise sind Gesamtpreise. Gemäß § 19 UStG wird keine Umsatzsteuer
            ausgewiesen (Kleinunternehmerregelung). Hinzu kommen gegebenenfalls
            Versandkosten. Soweit nicht anders angegeben: 0,75 l. Lieferung ausschließlich
            innerhalb Deutschlands. Angebot freibleibend und solange der Vorrat reicht.
            Stand: {inventoryAsOf}.
          </p>
          <p>Abgabe von Wein und Sekt ausschließlich an Personen ab 16 Jahren.</p>
        </div>
      </footer>

      {selectedWines.length > 0 && !footerVisible && (
        <aside className="inquiry-bar" aria-label="Gemerkt für Deine Anfrage">
          <div>
            <strong>{selectedWines.length} {selectedWines.length === 1 ? "Wein gemerkt" : "Weine gemerkt"}</strong>
            <button type="button" onClick={() => setSelectedIds([])}>Auswahl löschen</button>
          </div>
          <div className="inquiry-actions">
            <button className="copy-icon-button" type="button" onClick={copyInquiry} aria-label="Anfrage für Webmail kopieren" title="Für Webmail kopieren">
              {copyStatus === "copied" ? <Check aria-hidden="true" size={18} /> : <Copy aria-hidden="true" size={18} />}
            </button>
            <a className="button button-primary" href={inquiryUrl}>
              <Mail aria-hidden="true" size={18} />
              Jetzt anfragen
            </a>
          </div>
        </aside>
      )}

      <p className="copy-status" aria-live="polite">
        {copyStatus === "copied"
          ? "Anfrage kopiert. Du kannst sie jetzt in Gmail, Web.de oder einem anderen Maildienst einfügen."
          : copyStatus === "error"
            ? `Kopieren war nicht möglich. Bitte schreibe an ${siteConfig.email}.`
            : ""}
      </p>
    </>
  );
}
