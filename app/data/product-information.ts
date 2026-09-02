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
  "Weingut Christian Bamberger": "Weingut Christian Bamberger, Steinhardter Hof 2, 55566 Bad Sobernheim, Deutschland",
  "Weingut Thanisch": "Weingut Thanisch, 54470 Lieser, Deutschland",
  "Weingut Matthias Müller": "Weingut Matthias Müller, Mainzer Straße 45, 56322 Spay, Deutschland",
  "Weingut Schloss Lieser": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
};

const researched: Record<string, Partial<ProductInformation>> = {
  W0036: {
    alcohol: "12,5 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Weingut Geisser GbR, Längelstraße 1, 76889 Schweigen-Rechtenbach, Deutschland; hergestellt in 67346 Speyer",
    sourceLabel: "Fotografiertes Rücketikett des Chardonnay Brut 2021",
    verification: "verified",
  },
  W0040: {
    alcohol: "12,5 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Weingut Geisser GbR, Längelstraße 1, 76889 Schweigen-Rechtenbach, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Sauvignon Blanc Schweigener Sonnenberg 2022",
    verification: "verified",
  },
  W0064: {
    alcohol: "12,5 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Schlossgut Diel, 55452 Burg Layen, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Nahesteiner Weißburgunder 2022",
    verification: "verified",
  },
  W0066: {
    alcohol: "14,0 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Schlossgut Diel, 55452 Burg Layen, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Grauer Burgunder Réserve 2018; auf der Website als Pinot Gris Réserve geführt",
    verification: "verified",
  },
  W0067: {
    alcohol: "13,5 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Schlossgut Diel, 55452 Burg Layen, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett der Prestige Cuvée Victor 2018",
    verification: "verified",
  },
  W0068: {
    alcohol: "12,5 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Schlossgut Diel, 55452 Burg Layen, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Rosé de Diel 2022",
    verification: "verified",
  },
  W0093: {
    alcohol: "12,0 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Weingut Matthias Müller, 56322 Spay, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Bopparder Hamm Riesling vom Kieselgallenschiefer 2022",
    verification: "verified",
  },
  W0094: {
    alcohol: "12,5 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Weingut Matthias Müller, 56322 Spay, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Bopparder Hamm Feuerlay Riesling 2022",
    verification: "verified",
  },
  W0095: {
    alcohol: "13,5 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Weingut Matthias Müller, 56322 Spay, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Bopparder Hamm Mandelstein Riesling 2021",
    verification: "verified",
  },
  W0098: {
    alcohol: "13,0 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Weingut Daniel Mattern, 67582 Mettenheim, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Grauburgunder trocken 2023",
    verification: "verified",
  },
  W0099: {
    alcohol: "13,0 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Weingut Daniel Mattern, 67582 Mettenheim, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Dittelsheim Chardonnay trocken 2021",
    verification: "verified",
  },
  W0100: {
    alcohol: "13,0 % vol.",
    allergens: "Enthält Sulfite",
    producer: "Weingut Daniel Mattern, 67582 Mettenheim, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett des Sauvignon Blanc / Chardonnay trocken 2019 (Assemblage Réserve)",
    verification: "verified",
  },
  W0109: {
    alcohol: "alkoholfrei (< 0,1 % vol.)",
    ingredients:
      "Entalkoholisierter Wein (Trauben, Saccharose, Säureregulator: Weinsäure/E334, Stabilisator: Cellulosegummi/E466, Konservierungsstoffe: Sulfite und Ascorbinsäure/E300), Kohlensäure",
    allergens: "Enthält Sulfite",
    nutrition: {
      energy: "93 kJ / 22 kcal",
      fat: "< 0,1 g",
      saturates: "< 0,1 g",
      carbohydrates: "5,0 g",
      sugars: "5,0 g",
      protein: "< 0,1 g",
      salt: "< 0,01 g",
    },
    producer: "Abfüller D-RP 200703; Vertrieb: Daniel Mattern, 67582 Mettenheim, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett der angebotenen Flasche (Los L-241048; mindestens haltbar bis Ende 04/2028)",
    verification: "verified",
  },
  W0103: {
    alcohol: "12,7 % vol.",
    ingredients:
      "Trauben, Saccharose, Hopfen, Konservierungsstoffe: Sulfite und L-Ascorbinsäure (E300), Gas und Packgas: Kohlendioxid (E290)",
    allergens: "Enthält Sulfite",
    nutrition: {
      energy: "318 kJ / 77 kcal",
      fat: "< 0,1 g",
      saturates: "< 0,1 g",
      carbohydrates: "1,7 g",
      sugars: "0,9 g",
      protein: "< 0,1 g",
      salt: "< 0,1 g",
    },
    producer: "Daniel Mattern, 67582 Mettenheim, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett und zugehöriges E-Label der angebotenen Flasche (Los HG/05/25)",
    verification: "verified",
  },
  W0097: {
    alcohol: "11,5 % vol.",
    ingredients: "Trauben, Saccharose, Stabilisator: Carboxymethylcellulose, Konservierungsstoff: Sulfite",
    allergens: "Enthält Sulfite",
    nutrition: {
      energy: "296 kJ / 71 kcal",
      fat: "0 g",
      saturates: "0 g",
      carbohydrates: "0 g",
      sugars: "0 g",
      protein: "0 g",
      salt: "0 g",
    },
    producer: "Weingut Daniel Mattern, In den Weingärten 5, 67582 Mettenheim, Deutschland",
    sourceLabel: "Fotografiertes Rücketikett und zugehöriges E-Label des Rosé 2024",
    verification: "verified",
  },
  W0111: {
    alcohol: "12,5 % vol.",
    allergens: "Enthält Sulfite",
    sourceLabel: "Veröffentlichte Händlerangaben zum Jahrgang 2024; Zutaten und Nährwerte noch am Rücketikett zu prüfen",
    verification: "label-needed",
  },
  W0048: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Weißburgunder trocken 2022", verification: "verified" },
  W0051: { alcohol: "12,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Lieser Riesling trocken 2022", verification: "verified" },
  W0052: { alcohol: "10,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Brauneberger Juffer Riesling feinherb 2022", verification: "verified" },
  W0053: { alcohol: "10,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Lieser Niederberg Helden Riesling feinherb 2022", verification: "verified" },
  W0054: { alcohol: "7,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Brauneberger Juffer Riesling Kabinett 2022", verification: "verified" },
  W0056: { alcohol: "7,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett der Lieser Niederberg Helden Riesling Auslese Goldkapsel 2022", verification: "verified" },
  W0057: { alcohol: "7,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett der Piesporter Goldtröpfchen Riesling Auslese 2022", verification: "verified" },
  W0059: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Graacher Himmelreich Riesling trocken 2022", verification: "verified" },
  W0060: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Lieser Niederberg Helden Riesling trocken 2022", verification: "verified" },
  W0061: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Brauneberger Juffer Sonnenuhr Riesling trocken 2022", verification: "verified" },
  W0062: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Wehlener Sonnenuhr Riesling trocken 2022", verification: "verified" },
  W0063: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Piesporter Goldtröpfchen Riesling trocken 2022", verification: "verified" },
  W0071: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Christian Bamberger, Steinhardter Hof 2, 55566 Bad Sobernheim, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Grauburgunder trocken 2022", verification: "verified" },
  W0072: { alcohol: "13,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Christian Bamberger, Steinhardter Hof 2, 55566 Bad Sobernheim, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Weißburgunder trocken 2021", verification: "verified" },
  W0080: { alcohol: "12,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Christian Bamberger, Steinhardter Hof 2, 55566 Bad Sobernheim, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Glückslos trocken 2023", verification: "verified" },
  W0081: { alcohol: "11,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Christian Bamberger, Steinhardter Hof 2, 55566 Bad Sobernheim, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Augenblick trocken 2023", verification: "verified" },
  W0082: { alcohol: "13,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Christian Bamberger, Steinhardter Hof 2, 55566 Bad Sobernheim, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Riesling Vulkangestein 2021", verification: "verified" },
  W0084: { alcohol: "13,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Christian Bamberger, Steinhardter Hof 2, 55566 Bad Sobernheim, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Spätburgunder Vulkangestein 2020", verification: "verified" },
  W0085: { alcohol: "13,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Christian Bamberger, Steinhardter Hof 2, 55566 Bad Sobernheim, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Spätburgunder Vulkangestein 2021", verification: "verified" },
  W0002: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Abfüller: Weinhaus Thanisch, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Chardonnay trocken 2023", verification: "verified" },
  W0005: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Thanisch, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Chardonnay 500 Réserve 2022", verification: "verified" },
  W0006: { alcohol: "12,5 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Thanisch, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Chardonnay 500 Réserve 2023", verification: "verified" },
  W0009: { alcohol: "12,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Thanisch, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Tribut Grauschiefer Riesling trocken 2023", verification: "verified" },
  W0010: { alcohol: "12,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Thanisch, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett der Riesling Spätlese trocken Lieserer Niederberg Helden 2022", verification: "verified" },
  W0012: { alcohol: "12,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Thanisch, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Riesling Alte Reben Réserve 2022", verification: "verified" },
  W0027: { alcohol: "14,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Thanisch, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Spätburgunder unfiltriert 2020", verification: "verified" },
  W0028: { alcohol: "13,0 % vol.", allergens: "Enthält Sulfite", producer: "Weingut Thanisch, 54470 Lieser, Deutschland", sourceLabel: "Fotografiertes Rücketikett des Spätburgunder unfiltriert 2021", verification: "verified" },
};

export function productInformationFor(wine: Wine): ProductInformation {
  const override = researched[wine.id] ?? {};
  return {
    allergens: "Enthält Sulfite",
    producer: wineryAddresses[wine.winery] ?? `${wine.winery}, Deutschland`,
    sourceLabel:
      "Basisangaben aus Bestandsliste und veröffentlichten Hersteller-/Händlerdaten; Alkohol, Abfüller und Allergenangabe werden vor einer verbindlichen Bestellung anhand der Flasche bestätigt",
    verification: "label-needed",
    ...override,
  };
}
