import type { Wine } from "./wines";

export type Nutrition = {
  energy: string;
  fat: string;
  saturates: string;
  carbohydrates: string;
  sugars: string;
  protein: string;
  salt: string;
};

export type ProductInformation = {
  alcohol?: string;
  ingredients?: string;
  allergens: string;
  nutrition?: Nutrition;
  producer: string;
  sourceLabel: string;
  sourceUrl?: string;
  verification: "verified" | "label-needed";
};

const wineryAddresses: Record<string, string> = {
  "Weingut Daniel Mattern": "Weingut Daniel Mattern, In den Weingärten 5, 67582 Mettenheim, Deutschland",
  "Weingut Bischel": "Weingut Bischel, Sonnenhof 15, 55437 Appenheim, Deutschland",
  "Weingut Geisser": "Weingut Geisser, Längelstraße 1, 76889 Schweigen-Rechtenbach, Deutschland",
  "Schlossgut Diel": "Schlossgut Diel, Burg Layen 16, 55452 Rümmelsheim, Deutschland",
  "Weingut Christian Bamberger": "Weingut Christian Bamberger, Kreuznacher Straße 2, 55566 Bad Sobernheim, Deutschland",
  "Weingut Thanisch": "Weingut Thanisch, 54470 Lieser, Deutschland",
  "Weingut Matthias Müller": "Weingut Matthias Müller, Mainzer Straße 45, 56322 Spay, Deutschland",
  "Weingut Schloss Lieser": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
};

const researched: Record<string, Partial<ProductInformation>> = {
  W0109: {
    alcohol: "alkoholfrei (< 0,5 % vol.)",
    ingredients:
      "Entalkoholisierter Wein (Trauben, Saccharose, Säureregulator: Weinsäure/E334, Stabilisator: Cellulosegummi/E466, Konservierungsstoffe: Sulfite und Ascorbinsäure/E300), Kohlensäure",
    allergens: "Enthält Sulfite",
    nutrition: {
      energy: "96 kJ / 23 kcal",
      fat: "< 0,1 g",
      saturates: "< 0,1 g",
      carbohydrates: "5,2 g",
      sugars: "5,2 g",
      protein: "< 0,1 g",
      salt: "< 0,01 g",
    },
    sourceLabel: "Offizielle Produktseite des Weinguts Daniel Mattern",
    sourceUrl: "https://daniel-mattern.de/produkt/no-limit-sparkling/",
    verification: "verified",
  },
  W0103: {
    alcohol: "10,0 % vol.",
    ingredients:
      "Wein (Trauben, Saccharose, Stabilisator: Cellulosegummi/E466, Konservierungsstoff: Sulfite), Hopfen, Kohlensäure",
    allergens: "Enthält Sulfite",
    nutrition: {
      energy: "313 kJ / 75 kcal",
      fat: "< 0,1 g",
      saturates: "< 0,1 g",
      carbohydrates: "1,2 g",
      sugars: "0,7 g",
      protein: "< 0,1 g",
      salt: "< 0,1 g",
    },
    sourceLabel: "Offizielle Produktseite des Weinguts Daniel Mattern",
    sourceUrl: "https://daniel-mattern.de/produkt/hop-and-grape/",
    verification: "verified",
  },
  W0097: {
    alcohol: "11,5 % vol.",
    allergens: "Enthält Sulfite",
    nutrition: {
      energy: "296 kJ / 71 kcal",
      fat: "0 g",
      saturates: "0 g",
      carbohydrates: "0,14 g",
      sugars: "Angabe der Quelle nicht eindeutig",
      protein: "Angabe nicht veröffentlicht",
      salt: "0 g",
    },
    sourceLabel: "Veröffentlichte Produktdaten im Winestro-Shop; Zutaten und Zuckerwert noch am Rücketikett zu prüfen",
    verification: "label-needed",
  },
  W0111: {
    alcohol: "12,5 % vol.",
    allergens: "Enthält Sulfite",
    sourceLabel: "Veröffentlichte Händlerangaben zum Jahrgang 2024; Zutaten und Nährwerte noch am Rücketikett zu prüfen",
    verification: "label-needed",
  },
  W0081: { alcohol: "11,0 % vol.", sourceLabel: "Veröffentlichte Produktdaten bei Vineshop24", verification: "label-needed" },
  W0080: { alcohol: "12,0 % vol.", sourceLabel: "Veröffentlichte Produktdaten bei Genuss7", verification: "label-needed" },
  W0084: { alcohol: "13,5 % vol.", sourceLabel: "Veröffentlichte Produktdaten bei Genuss7", verification: "label-needed" },
  W0085: { alcohol: "13,5 % vol.", sourceLabel: "Veröffentlichte Produktdaten bei Genuss7", verification: "label-needed" },
};

export function productInformationFor(wine: Wine): ProductInformation {
  const override = researched[wine.id] ?? {};
  return {
    allergens: "Enthält Sulfite – maßgeblich ist das Etikett der angebotenen Flasche",
    producer: wineryAddresses[wine.winery] ?? `${wine.winery}, Deutschland`,
    sourceLabel:
      "Basisangaben aus Bestandsliste und veröffentlichten Hersteller-/Händlerdaten; Alkohol, Abfüller und Allergenangabe werden vor einer verbindlichen Bestellung anhand der Flasche bestätigt",
    verification: "label-needed",
    ...override,
  };
}

