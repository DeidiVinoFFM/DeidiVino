"use client";

/* eslint-disable @next/next/no-img-element -- Static GitHub Pages has no image-optimization server. */

import {
  ArrowDown,
  AtSign,
  Check,
  Copy,
  ExternalLink,
  Grape,
  Mail,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  UserRound,
  Wine as WineIcon,
} from "lucide-react";
import type { CSSProperties, ImgHTMLAttributes } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { wineDescriptions } from "./data/wine-details";
import { wineMedia } from "./data/wine-media";
import { wineryProfiles, type WineryProfile } from "./data/wineries";
import { inventoryAsOf, wines, type Wine } from "./data/wines";
import { productInformationFor } from "./data/product-information";
import { wineRatings } from "./data/ratings";
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
    image: "mixed-wines-retina.webp",
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

function ImageWithFallback({
  fallbackLabel = "Dieses Bild konnte gerade nicht geladen werden.",
  alt = "",
  onError,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { fallbackLabel?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="image-load-error" role="status">
        <WineIcon aria-hidden="true" size={28} strokeWidth={1.35} />
        <span>{fallbackLabel}</span>
        <button type="button" onClick={() => window.location.reload()}>Seite neu laden</button>
      </div>
    );
  }

  return (
    <img
      {...props}
      alt={alt}
      onError={(event) => {
        onError?.(event);
        setFailed(true);
      }}
    />
  );
}

function servingSuggestion(wine: Wine) {
  const text = `${wine.category} ${wine.style} ${wine.name}`.toLocaleLowerCase("de-DE");
  if (wine.category === "Alkoholfrei") return "Gut gekühlt bei etwa 6–8 °C servieren – ideal als alkoholfreier Aperitif.";
  if (wine.category === "Prickelnd") return "Gut gekühlt bei etwa 7–9 °C servieren – als Aperitif oder Begleiter für einen besonderen Auftakt.";
  if (text.includes("auslese")) return "Leicht gekühlt bei etwa 8–10 °C und in kleinen Gläsern servieren; spannend zu Dessert, Käse oder ganz für sich.";
  if (wine.category === "Rosé") return "Bei etwa 8–10 °C servieren – unkompliziert solo, zu Salaten oder zur leichten Sommerküche.";
  if (wine.category === "Rotwein") return "Leicht temperiert bei etwa 14–16 °C servieren; ein größeres Glas und etwas Luft lassen die Aromen aufblühen.";
  if (text.includes("gg") || text.includes("reserve") || text.includes("réserve")) return "Nicht zu kalt bei etwa 10–12 °C servieren und dem Wein im größeren Glas etwas Luft geben.";
  return "Bei etwa 8–11 °C servieren – ein vielseitiger Begleiter, der auch ohne Essen Freude macht.";
}

function WineCard({
  wine,
  selected,
  onToggle,
  onShowWine,
  onShowWinery,
  featureLabel,
}: {
  wine: Wine;
  selected: boolean;
  onToggle: () => void;
  onShowWine: () => void;
  onShowWinery: () => void;
  featureLabel?: string;
}) {
  const media = wineMedia[wine.id];
  const availabilityClass =
    wine.availability === "Nur noch 1 Flasche"
      ? " is-last"
      : wine.availability === "Nur noch wenige Flaschen"
        ? " is-low"
        : "";

  return (
    <article className={`wine-card${selected ? " is-selected" : ""}`}>
      <div className="wine-card-topline">
        <span className="region-label region-label-static">
          {wine.region}
        </span>
        <span className={`availability${availabilityClass}`}>{wine.availability}</span>
      </div>

      <div className={`wine-card-media${media ? " has-image" : ""}`}>
        {media ? (
          <>
            <ImageWithFallback src={`${basePath}${media.src}`} alt={media.alt} loading="lazy" />
            {media.credit && <small>{media.credit}</small>}
          </>
        ) : (
          <div className="wine-image-placeholder" aria-label="Flaschenfoto folgt">
            <WineIcon aria-hidden="true" size={34} strokeWidth={1.35} />
            <span>Flaschenfoto folgt</span>
          </div>
        )}
      </div>

      <div className="wine-card-copy">
        {featureLabel && <span className="feature-label">{featureLabel}</span>}

        <p className="winery-name">
          <button type="button" onClick={onShowWinery}>
            {wineryShortName(wine.winery)}
            <span aria-hidden="true">＋</span>
          </button>
        </p>
        <h3>
          <button type="button" onClick={onShowWine}>
            {wine.name}
          </button>
        </h3>
        <button className="wine-detail-hint" type="button" onClick={onShowWine}>
          Charakter im Glas ansehen
          <span aria-hidden="true">→</span>
        </button>

        {wineRatings[wine.id]?.[0] ? (
          <button className="card-rating" type="button" onClick={onShowWine}>
            {wineRatings[wine.id][0].score} · {wineRatings[wine.id][0].publication}
          </button>
        ) : null}

        <div className="wine-tags" aria-label="Weininformationen">
          <span>{wine.vintage}</span>
          <span>{wine.grape}</span>
          <span>{wine.style}</span>
        </div>
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
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [selectionReady, setSelectionReady] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [webmailOpen, setWebmailOpen] = useState(false);
  const [activeWine, setActiveWine] = useState<Wine | null>(null);
  const [activeWinery, setActiveWinery] = useState<WineryProfile | null>(null);
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "all" | "email" | "subject" | "body" | "error"
  >("idle");

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

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.sessionStorage.getItem("deidivino-merkliste");
        if (saved) {
          const parsed = JSON.parse(saved) as Record<string, number>;
          const valid = Object.fromEntries(
            Object.entries(parsed).filter(
              ([id, quantity]) => wines.some((wine) => wine.id === id) && Number.isInteger(quantity) && quantity > 0 && quantity <= 99,
            ),
          );
          setSelectedQuantities(valid);
        }
      } catch {
        window.sessionStorage.removeItem("deidivino-merkliste");
      } finally {
        setSelectionReady(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!selectionReady) return;
    window.sessionStorage.setItem("deidivino-merkliste", JSON.stringify(selectedQuantities));
  }, [selectedQuantities, selectionReady]);

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

  const selectedWines = wines
    .filter((wine) => selectedQuantities[wine.id])
    .map((wine) => ({ wine, quantity: selectedQuantities[wine.id] }));
  const selectedBottleCount = selectedWines.reduce((sum, item) => sum + item.quantity, 0);
  const selectedSubtotal = selectedWines.reduce(
    (sum, item) => sum + item.wine.price * item.quantity,
    0,
  );

  const scrollToSection = (id: string) => {
    const performScroll = () => {
      const target = document.getElementById(id);
      if (!target) return;

      const header = document.querySelector<HTMLElement>(".site-header");
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const target = document.getElementById(id);
    const adviceImage = id === "beratung" ? target?.querySelector("img") : null;
    const imageReady =
      adviceImage instanceof HTMLImageElement && !adviceImage.complete
        ? adviceImage.decode().catch(() => undefined)
        : Promise.resolve();

    void Promise.all([fontsReady, imageReady]).then(() => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(performScroll));
    });
  };

  const scrollToResults = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById("weinergebnisse");
        if (!target) return;

        const header = document.querySelector<HTMLElement>(".site-header");
        const controls = document.querySelector<HTMLElement>(".catalog-controls");
        const headerHeight = header?.getBoundingClientRect().height ?? 0;
        const controlsHeight =
          controls && window.getComputedStyle(controls).position === "sticky"
            ? controls.getBoundingClientRect().height + 16
            : 0;
        const top =
          window.scrollY + target.getBoundingClientRect().top - headerHeight - controlsHeight - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    });
  };

  const updateCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    scrollToResults();
  };

  const updateBudget = (nextBudget: string) => {
    setBudget(nextBudget);
    scrollToResults();
  };

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    const controls = document.querySelector<HTMLElement>(".catalog-controls");
    if (controls && window.getComputedStyle(controls).position === "sticky") {
      scrollToResults();
    }
  };

  const discoverCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    window.requestAnimationFrame(() => scrollToSection("weine"));
  };

  const toggleWine = (id: string) => {
    setSelectedQuantities((current) => {
      if (current[id]) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: 1 };
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setSelectedQuantities((current) => ({
      ...current,
      [id]: Math.max(1, Math.min(99, Math.round(quantity))),
    }));
  };

  const removeWine = (id: string) => {
    setSelectedQuantities((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const inquiryBody = selectedWines.length
    ? `Hallo Dieter,\n\nich interessiere mich für folgende Weine:\n\n${selectedWines
        .map(({ wine, quantity }) => `– ${quantity} × ${wine.name}, ${wine.winery}, ${wine.vintage} (je ${formatEuro(wine.price)})`)
        .join("\n")}\n\nWarenwert laut aktueller Auswahl: ${formatEuro(selectedSubtotal)} (zuzüglich gegebenenfalls anfallender Lieferkosten).\n\nBitte gib mir kurz Rückmeldung zu Verfügbarkeit, Lieferung innerhalb Deutschlands und Gesamtpreis.\n\nViele Grüße`
    : "Hallo Dieter,\n\nich hätte gern eine persönliche Weinempfehlung. Hier ein paar Anhaltspunkte:\n\n– Geschmack: \n– Anlass oder Essen: \n– Budget je Flasche: \n– Anzahl Flaschen: \n\nViele Grüße";

  const inquirySubject = selectedWines.length
    ? "Meine Weinauswahl bei DeidiVino"
    : "Persönliche Weinempfehlung";
  const inquiryUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    inquirySubject,
  )}&body=${encodeURIComponent(inquiryBody)}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    siteConfig.email,
  )}&su=${encodeURIComponent(inquirySubject)}&body=${encodeURIComponent(inquiryBody)}`;
  const inquiryClipboardText = `An: ${siteConfig.email}\nBetreff: ${inquirySubject}\n\n${inquiryBody}`;

  const copyText = async (
    text: string,
    successStatus: "all" | "email" | "subject" | "body",
  ) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand("copy");
        textArea.remove();
        if (!copied) throw new Error("Kopieren nicht verfügbar");
      }
      setCopyStatus(successStatus);
      window.setTimeout(() => setCopyStatus("idle"), 3000);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 5000);
    }
  };

  const copyStatusMessage =
    copyStatus === "all"
      ? "Die vollständige Anfrage wurde kopiert."
      : copyStatus === "email"
        ? "E-Mail-Adresse kopiert."
        : copyStatus === "subject"
          ? "Betreff kopiert."
          : copyStatus === "body"
            ? "Nachrichtentext kopiert."
            : copyStatus === "error"
              ? `Kopieren war nicht möglich. Bitte schreibe an ${siteConfig.email}.`
              : "";

  return (
    <>
      <a className="skip-link" href="#top">Direkt zum Inhalt</a>
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
              width={1000}
              height={239}
            />
          </button>
          <nav aria-label="Hauptnavigation">
            <button type="button" onClick={() => scrollToSection("empfehlungen")}>Favoriten</button>
            <button type="button" onClick={() => scrollToSection("weine")}>Weine entdecken</button>
            <button type="button" onClick={() => scrollToSection("beratung")}>Persönliche Beratung</button>
            <button className="nav-wishlist" type="button" onClick={() => setWishlistOpen(true)}>
              Merkliste{selectedWines.length > 0 ? ` (${selectedBottleCount})` : ""}
            </button>
          </nav>
          <a className="header-contact" href={`mailto:${siteConfig.email}`}>
            <Mail aria-hidden="true" size={17} />
            Schreib mir
          </a>
        </div>
      </header>

      <noscript>
        <div className="noscript-notice">
          Bilder und Weininformationen sind sichtbar. Für Filter, Detailfenster und Merkliste
          aktiviere bitte JavaScript und lade die Seite neu.
        </div>
      </noscript>

      <main id="top" tabIndex={-1}>
        <section className="hero-shell page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
              <p className="eyebrow">Deutsche Weine · persönliche Beratung aus Schöneck</p>
            <h1 id="hero-title">Deutsche Weine, die im Glas Freude machen.</h1>
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
              <button className="copy-inquiry-button" type="button" onClick={() => setWebmailOpen(true)}>
                <Mail aria-hidden="true" size={17} />
                Webmail verwenden
              </button>
            </div>
            <dl className="hero-stats">
              <div><dt>Weine zur Auswahl</dt><dd>{wines.length}</dd></div>
              <div><dt>Weingüter mit Handschrift</dt><dd>{wineryCount}</dd></div>
              <div><dt>Für jedes Budget</dt><dd>{Math.round(minPrice)}–{Math.round(maxPrice)} €</dd></div>
            </dl>
          </div>
          <figure className="hero-image">
            <ImageWithFallback
              src={`${basePath}/mixed-wines-retina.webp`}
              alt="Eine von Dieter Grün zusammengestellte Auswahl verschiedener Weinflaschen im Weinkeller"
              width={1264}
              height={944}
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
                selected={Boolean(selectedQuantities[wine.id])}
                onToggle={() => toggleWine(wine.id)}
                onShowWine={() => setActiveWine(wine)}
                onShowWinery={() => setActiveWinery(wineryProfiles[wine.winery])}
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
                <ImageWithFallback
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
                  onChange={(event) => updateQuery(event.target.value)}
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
                    onClick={() => updateCategory(item)}
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
                    onClick={() => updateBudget(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p id="weinergebnisse" className="result-count" aria-live="polite">
              {filteredWines.length} {filteredWines.length === 1 ? "Wein passt" : "Weine passen"} zu Deiner Auswahl
            </p>

            {filteredWines.length ? (
              <div className="catalog-grid">
                {filteredWines.map((wine) => (
                  <WineCard
                    key={wine.id}
                    wine={wine}
                    selected={Boolean(selectedQuantities[wine.id])}
                    onToggle={() => toggleWine(wine.id)}
                    onShowWine={() => setActiveWine(wine)}
                    onShowWinery={() => setActiveWinery(wineryProfiles[wine.winery])}
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
                    scrollToResults();
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
            <ImageWithFallback
              src={`${basePath}/dieter-gruen.webp`}
              alt="Dieter Grün von DeidiVino mit einem Glas Wein"
              loading="eager"
              width={632}
              height={948}
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
            <button className="about-link" type="button" onClick={() => setAboutOpen(true)}>
              <UserRound aria-hidden="true" size={17} />
              Mehr über mich
            </button>
            <div className="advice-contact">
              <a className="button button-light" href={inquiryUrl}>
                <Mail aria-hidden="true" size={18} />
                E-Mail öffnen
              </a>
              <button className="copy-inquiry-button light" type="button" onClick={() => setWebmailOpen(true)}>
                <Mail aria-hidden="true" size={17} />
                Webmail verwenden
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
            <span
              className="footer-logo"
              style={{ "--footer-logo-image": `url("${basePath}/deidivino-logo.png")` } as CSSProperties}
            >
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
            <a href={`${basePath}/versand/`}>Versand & Lieferung</a>
          </div>
        </div>
        <div className="page-width footer-note">
          <p>
            Alle Preise sind Gesamtpreise. Gemäß § 19 UStG wird keine Umsatzsteuer
            ausgewiesen (Kleinunternehmerregelung). Hinzu kommen die unter {" "}
            <a href={`${basePath}/versand/`}>Versand und Lieferung</a> genannten Kosten.
            Soweit nicht anders angegeben: 0,75 l. Lieferung ausschließlich
            innerhalb Deutschlands. Angebot freibleibend und solange der Vorrat reicht.
            Stand: {inventoryAsOf}.
          </p>
          <p>Abgabe von Wein und Sekt ausschließlich an Personen ab 16 Jahren.</p>
        </div>
      </footer>

      {selectedWines.length > 0 && !footerVisible && (
        <aside className="inquiry-bar" aria-label="Gemerkt für Deine Anfrage">
          <div>
            <strong>{selectedBottleCount} {selectedBottleCount === 1 ? "Flasche" : "Flaschen"} gemerkt</strong>
            <button type="button" onClick={() => setWishlistOpen(true)}>Merkliste ansehen</button>
          </div>
          <div className="inquiry-actions">
            <button className="copy-icon-button" type="button" onClick={() => setWebmailOpen(true)} aria-label="Webmail-Optionen öffnen" title="Webmail verwenden">
              <Mail aria-hidden="true" size={18} />
            </button>
            <a className="button button-primary" href={inquiryUrl}>
              <Mail aria-hidden="true" size={18} />
              Jetzt anfragen
            </a>
          </div>
        </aside>
      )}

      <Dialog open={webmailOpen} onOpenChange={setWebmailOpen}>
        <DialogContent className="webmail-dialog">
          <DialogHeader>
            <DialogTitle>Wie möchtest Du Deine Anfrage senden?</DialogTitle>
            <DialogDescription>
              Mit Gmail oder einer eingerichteten Mail-App werden Empfänger, Betreff und Nachricht automatisch befüllt.
            </DialogDescription>
          </DialogHeader>

          <div className="webmail-options">
            <a className="webmail-option primary" href={gmailUrl} target="_blank" rel="noreferrer">
              <span><Mail aria-hidden="true" size={20} />In Gmail öffnen</span>
              <small>Alle drei Felder werden automatisch eingetragen.</small>
              <ExternalLink aria-hidden="true" size={17} />
            </a>
            <a className="webmail-option" href={inquiryUrl}>
              <span><Mail aria-hidden="true" size={20} />Standard-Mail-App öffnen</span>
              <small>Funktioniert auch mit einem im Browser eingerichteten Webmailer.</small>
            </a>
          </div>

          <div className="manual-webmail">
            <h3>Anderen Webmailer verwenden</h3>
            <p>Öffne dort „Neue Nachricht“ und kopiere die Angaben jeweils in das passende Feld.</p>

            <div className="mail-field-row">
              <span>An</span>
              <strong>{siteConfig.email}</strong>
              <button type="button" onClick={() => copyText(siteConfig.email, "email")}>
                {copyStatus === "email" ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
                {copyStatus === "email" ? "Kopiert" : "Kopieren"}
              </button>
            </div>
            <div className="mail-field-row">
              <span>Betreff</span>
              <strong>{inquirySubject}</strong>
              <button type="button" onClick={() => copyText(inquirySubject, "subject")}>
                {copyStatus === "subject" ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
                {copyStatus === "subject" ? "Kopiert" : "Kopieren"}
              </button>
            </div>
            <div className="mail-body-field">
              <div>
                <span>Nachricht</span>
                <button type="button" onClick={() => copyText(inquiryBody, "body")}>
                  {copyStatus === "body" ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
                  {copyStatus === "body" ? "Kopiert" : "Text kopieren"}
                </button>
              </div>
              <pre>{inquiryBody}</pre>
            </div>
            <button className="copy-all-button" type="button" onClick={() => copyText(inquiryClipboardText, "all")}>
              <Copy aria-hidden="true" size={17} />
              Alles zusammen kopieren
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={wishlistOpen} onOpenChange={setWishlistOpen}>
        <DialogContent className="wishlist-dialog">
          <DialogHeader>
            <DialogTitle>Deine Merkliste</DialogTitle>
            <DialogDescription>
              Passe die gewünschte Flaschenzahl an. Die Auswahl bleibt bis zum Schließen dieses Browser-Tabs erhalten.
            </DialogDescription>
          </DialogHeader>

          {selectedWines.length ? (
            <>
              <div className="wishlist-items">
                {selectedWines.map(({ wine, quantity }) => (
                  <article className="wishlist-item" key={wine.id}>
                    <div className="wishlist-thumb">
                      {wineMedia[wine.id] ? (
                        <ImageWithFallback
                          src={`${basePath}${wineMedia[wine.id].src}`}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <WineIcon aria-hidden="true" size={24} />
                      )}
                    </div>
                    <div className="wishlist-copy">
                      <small>{wineryShortName(wine.winery)} · {wine.vintage}</small>
                      <strong>{wine.name}</strong>
                      <span>{formatEuro(wine.price)} je Flasche</span>
                    </div>
                    <div className="quantity-control" aria-label={`Flaschenzahl für ${wine.name}`}>
                      <button
                        type="button"
                        aria-label={`Eine Flasche ${wine.name} weniger`}
                        disabled={quantity <= 1}
                        onClick={() => updateQuantity(wine.id, quantity - 1)}
                      >
                        <Minus aria-hidden="true" size={16} />
                      </button>
                      <input
                        aria-label={`Anzahl Flaschen ${wine.name}`}
                        type="number"
                        min="1"
                        max="99"
                        inputMode="numeric"
                        value={quantity}
                        onChange={(event) => updateQuantity(wine.id, Number(event.target.value) || 1)}
                      />
                      <button
                        type="button"
                        aria-label={`Eine Flasche ${wine.name} mehr`}
                        onClick={() => updateQuantity(wine.id, quantity + 1)}
                      >
                        <Plus aria-hidden="true" size={16} />
                      </button>
                    </div>
                    <strong className="wishlist-line-total">{formatEuro(wine.price * quantity)}</strong>
                    <button
                      className="wishlist-remove"
                      type="button"
                      aria-label={`${wine.name} aus der Merkliste entfernen`}
                      onClick={() => removeWine(wine.id)}
                    >
                      <Trash2 aria-hidden="true" size={17} />
                    </button>
                  </article>
                ))}
              </div>
              <div className="wishlist-summary">
                <span>{selectedBottleCount} {selectedBottleCount === 1 ? "Flasche" : "Flaschen"}</span>
                <strong>Warenwert {formatEuro(selectedSubtotal)}</strong>
                <small>Zuzüglich gegebenenfalls anfallender Lieferkosten.</small>
              </div>
              <div className="wishlist-actions">
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => setSelectedQuantities({})}
                >
                  Merkliste leeren
                </button>
                <a className="button button-primary" href={inquiryUrl}>
                  <Mail aria-hidden="true" size={18} />
                  Auswahl anfragen
                </a>
              </div>
            </>
          ) : (
            <div className="wishlist-empty">
              <ShoppingBag aria-hidden="true" size={34} />
              <strong>Noch nichts gemerkt</strong>
              <p>Schließe dieses Fenster und tippe bei interessanten Weinen auf „Merken“.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="about-dialog detail-dialog">
          <DialogHeader>
            <p className="detail-dialog-eyebrow">Persönliche Weinberatung</p>
            <DialogTitle>Hallo, ich bin Dieter.</DialogTitle>
            <DialogDescription>Zertifizierter Sommelier und Weinhändler</DialogDescription>
          </DialogHeader>
          <div className="about-dialog-content">
            <ImageWithFallback
              src={`${basePath}/dieter-gruen.webp`}
              alt="Dieter Grün von DeidiVino mit einem Glas Wein"
              loading="lazy"
              width={632}
              height={948}
            />
            <div>
              <p>
                Hinter DeidiVino stehe ich, Dieter Grün. Meine Weinliebe begann mit dem ersten
                bewussten Schluck – und mit der Neugier darauf, warum Herkunft, Rebsorte und
                Handwerk im Glas so unterschiedlich schmecken können.
              </p>
              <p>
                Als zertifizierter Sommelier und Weinhändler stelle ich ein handverlesenes
                Sortiment aus deutschen Weinregionen zusammen: von Sekt, Weiß-, Rosé- und
                Rotwein bis zu besonderen Reserve- und Naturweinen. Dabei wähle ich nur Weine
                aus, die ich selbst gern öffne und persönlich empfehlen kann.
              </p>
              <p>
                Ob Du Dich schon lange für Wein begeisterst oder gerade Deine Lieblingsweine
                entdeckst: Ich höre zu, frage nach Anlass, Geschmack und Budget und begleite
                Dich mit einer Auswahl, die wirklich zu Dir passt. Auf Wunsch stelle ich auch
                individuelle Weinpakete zusammen oder gestalte private und betriebliche
                Weinverkostungen.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(activeWine)}
        onOpenChange={(open) => {
          if (!open) setActiveWine(null);
        }}
      >
        <DialogContent className="detail-dialog wine-detail-dialog">
          {activeWine && (
            <>
              <DialogHeader>
                <p className="detail-dialog-eyebrow">{activeWine.region} · {activeWine.vintage}</p>
                <DialogTitle>{activeWine.name}</DialogTitle>
                <DialogDescription>
                  <button
                    type="button"
                    className="detail-winery-link"
                    onClick={() => {
                      setActiveWine(null);
                      window.setTimeout(
                        () => setActiveWinery(wineryProfiles[activeWine.winery]),
                        120,
                      );
                    }}
                  >
                    {activeWine.winery} kennenlernen →
                  </button>
                </DialogDescription>
              </DialogHeader>

              <div className="wine-detail-main">
                <div className={`detail-wine-media${wineMedia[activeWine.id] ? " has-image" : ""}`}>
                  {wineMedia[activeWine.id] ? (
                    <ImageWithFallback
                      src={`${basePath}${wineMedia[activeWine.id]?.src}`}
                      alt={wineMedia[activeWine.id]?.alt ?? activeWine.name}
                    />
                  ) : (
                    <div className="wine-image-placeholder large" aria-label="Flaschenfoto folgt">
                      <WineIcon aria-hidden="true" size={52} strokeWidth={1.15} />
                      <span>DeidiVino-Flaschenfoto folgt</span>
                    </div>
                  )}
                </div>

                <div className="wine-detail-copy">
                  <div className="wine-character">
                    <p className="detail-label">Charakter im Glas</p>
                    <p>{wineDescriptions[activeWine.id]}</p>
                    <p className="serving-suggestion"><strong>Mein Serviertipp:</strong> {servingSuggestion(activeWine)}</p>
                  </div>

                  {wineRatings[activeWine.id]?.length ? (
                    <div className="wine-ratings" aria-label="Veröffentlichte Weinbewertungen">
                      <span>Ausgezeichnet</span>
                      {wineRatings[activeWine.id].map((rating) => (
                        <a key={`${rating.publication}-${rating.score}`} href={rating.sourceUrl} target="_blank" rel="noreferrer">
                          <strong>{rating.score}</strong> {rating.publication} · Jahrgang {rating.vintage}
                          <ExternalLink aria-hidden="true" size={14} />
                        </a>
                      ))}
                    </div>
                  ) : null}

                  <div className="detail-wine-facts" aria-label="Weininformationen">
                    <span>{activeWine.grape}</span>
                    <span>{activeWine.style}</span>
                    <span>{formatVolume(activeWine.volume)}</span>
                    <strong>{formatEuro(activeWine.price)}</strong>
                  </div>

                  {(() => {
                    const product = productInformationFor(activeWine);
                    return (
                      <details className="product-information">
                        <summary>Produkt- und Lebensmittelangaben</summary>
                        <div className="product-information-content">
                          <dl className="product-facts-list">
                            <div><dt>Bezeichnung</dt><dd>{activeWine.category === "Alkoholfrei" ? "Entalkoholisierter, perlender Wein" : `${activeWine.category}, ${activeWine.style}`}</dd></div>
                            <div><dt>Herkunft</dt><dd>Deutschland · {activeWine.region}</dd></div>
                            <div><dt>Nennvolumen</dt><dd>{formatVolume(activeWine.volume)}</dd></div>
                            {product.alcohol && <div><dt>Alkohol</dt><dd>{product.alcohol}</dd></div>}
                            <div><dt>Allergene</dt><dd><strong>{product.allergens}</strong></dd></div>
                            <div><dt>Verantwortlicher Betrieb</dt><dd>{product.producer}</dd></div>
                          </dl>

                          {product.ingredients && (
                            <div className="product-ingredients">
                              <h4>Zutaten</h4>
                              <p>{product.ingredients}</p>
                            </div>
                          )}

                          {product.nutrition && (
                            <div className="nutrition-block">
                              <h4>Durchschnittliche Nährwerte je 100 ml</h4>
                              <dl>
                                <div><dt>Brennwert</dt><dd>{product.nutrition.energy}</dd></div>
                                <div><dt>Fett</dt><dd>{product.nutrition.fat}</dd></div>
                                <div><dt>davon gesättigte Fettsäuren</dt><dd>{product.nutrition.saturates}</dd></div>
                                <div><dt>Kohlenhydrate</dt><dd>{product.nutrition.carbohydrates}</dd></div>
                                <div><dt>davon Zucker</dt><dd>{product.nutrition.sugars}</dd></div>
                                <div><dt>Eiweiß</dt><dd>{product.nutrition.protein}</dd></div>
                                <div><dt>Salz</dt><dd>{product.nutrition.salt}</dd></div>
                              </dl>
                            </div>
                          )}

                        </div>
                      </details>
                    );
                  })()}

                  <button
                    type="button"
                    className={`detail-select-button${selectedQuantities[activeWine.id] ? " is-selected" : ""}`}
                    onClick={() => toggleWine(activeWine.id)}
                  >
                    {selectedQuantities[activeWine.id] ? (
                      <Check aria-hidden="true" size={18} />
                    ) : (
                      <Plus aria-hidden="true" size={18} />
                    )}
                    {selectedQuantities[activeWine.id] ? "Für die Anfrage gemerkt" : "Für die Anfrage merken"}
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(activeWinery)}
        onOpenChange={(open) => {
          if (!open) setActiveWinery(null);
        }}
      >
        <DialogContent className="detail-dialog winery-detail-dialog">
          {activeWinery && (
            <>
              <DialogHeader>
                <p className="detail-dialog-eyebrow">Weingut aus {activeWinery.region}</p>
                <DialogTitle>{activeWinery.name}</DialogTitle>
                <DialogDescription>Die Handschrift hinter den Weinen</DialogDescription>
              </DialogHeader>
              <div className="winery-monogram" aria-hidden="true">
                <Grape size={42} strokeWidth={1.25} />
              </div>
              <p className="winery-description">{activeWinery.description}</p>
              <a
                className="official-winery-link"
                href={activeWinery.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                Offizielle Website des Weinguts
                <ExternalLink aria-hidden="true" size={17} />
              </a>
              <small className="source-note">
                Kurzporträt auf Grundlage der veröffentlichten Angaben des Weinguts.
              </small>
            </>
          )}
        </DialogContent>
      </Dialog>

      <p className="copy-status" aria-live="polite">
        {copyStatusMessage}
      </p>
    </>
  );
}
