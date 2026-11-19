// Von DeidiVino lokal erzeugt.
import type { Wine } from "./wines";
export type Nutrition = {energy:string;fat:string;saturates:string;carbohydrates:string;sugars:string;protein:string;salt:string};
export type ProductInformation = {alcohol?:string;ingredients?:string;allergens:string;nutrition?:Nutrition;producer:string;sourceLabel:string;sourceUrl?:string;verification:"verified"|"label-needed"};
const productInformation: Record<string,Partial<ProductInformation>> = {
  "W0151": {
    "alcohol": "13,5 % vol",
    "ingredients": "Trauben, Saccharose, Stabilisatoren: E466, Kohlendioxid, unter Schutzatmosphäre abgefüllt",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Karl Pfaffmann Erben, Allmendstraße 1, D-76833 Walsheim",
    "sourceLabel": "QR_KP_229, Karl Pfaffmann Lebenswerk Chardonnay Réserve trocken 2025, Höchstnote für Wein aus der Pfalz | BILD-Kaufberater BILD Logo Affiliate Info Affiliate Info Affilia, Karl Pfaffmann Lebenswerk Chardonnay Réserve 2025 PayPal Visa Mastercard Maestro American Express Go",
    "sourceUrl": "https://analyse.karl-pfaffmann.de/QR_KP_229",
    "nutrition": {
      "energy": "344 kJ (83 kcal)",
      "fat": "<0,01g",
      "saturates": "<0,01g",
      "carbohydrates": "1,7 g",
      "sugars": "0,6 g",
      "protein": "<0,01g",
      "salt": "<0,01g"
    }
  },
  "W0149": {
    "alcohol": "13,5% vol",
    "ingredients": "Trauben, Saccharose, Konservierungsstoffe: Sulfite",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Knipser",
    "sourceLabel": "Fotografierte Rücketikett-/Weinangaben",
    "sourceUrl": "https://shop.weingut-knipser.de/wein/2023-gaudenz-weingut-knipser-gbr-cabernet-franc-deutscher-qualitaetswein",
    "nutrition": {
      "energy": "314 kJ / 75 kcal",
      "fat": "<0,1g",
      "saturates": "<0,1g",
      "carbohydrates": "0,8g",
      "sugars": "0,0g",
      "protein": "<0,1g",
      "salt": "<0,01g"
    }
  },
  "W0152": {
    "alcohol": "14,5 % vol",
    "allergens": "Enthält Sulfite",
    "producer": "Markus Schneider",
    "sourceLabel": "Black Print Rotwein · Markus Schneider Pfalz Cuvée, Markus Schneider 2023 Black Print Rotwein",
    "sourceUrl": "https://www.vinoscout.de/products/markus-schneider-black-print",
    "nutrition": {
      "energy": "364 kJ / 87 kcal",
      "fat": "0 g",
      "saturates": "0 g",
      "carbohydrates": "0,2 g",
      "sugars": "0,2 g",
      "protein": "0 g",
      "salt": "0 g"
    }
  },
  "W0064": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Schlossgut Diel, 55452 Burg Layen, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Nahesteiner Weißburgunder 2022",
    "verification": "verified"
  },
  "W0066": {
    "alcohol": "14,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Schlossgut Diel, 55452 Burg Layen, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Grauer Burgunder Réserve 2018; auf der Website als Pinot Gris Réserve geführt",
    "verification": "verified"
  },
  "W0067": {
    "alcohol": "13,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Schlossgut Diel, 55452 Burg Layen, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett der Prestige Cuvée Victor 2018",
    "verification": "verified"
  },
  "W0068": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Schlossgut Diel, 55452 Burg Layen, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Rosé de Diel 2022",
    "verification": "verified"
  },
  "W0121": {
    "alcohol": "13,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Appenheim Spätburgunder trocken 2019",
    "verification": "verified"
  },
  "W0114": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Appenheim Weißburgunder & Chardonnay trocken 2023",
    "verification": "verified"
  },
  "W0115": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Chardonnay Réserve trocken 2022",
    "verification": "verified"
  },
  "W0122": {
    "alcohol": "13,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Gau-Algesheim Johannisberg Spätburgunder trocken 2020",
    "verification": "verified"
  },
  "W0111": {
    "alcohol": "12,5 % vol.",
    "ingredients": "Trauben, Saccharose, Antioxidationsmittel: Sulfite",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett und zugehöriges E-Label des Grauer Burgunder 2024",
    "verification": "verified",
    "nutrition": {
      "energy": "314 kJ / 75 kcal",
      "fat": "< 0,1 g",
      "saturates": "< 0,1 g",
      "carbohydrates": "1,4 g",
      "sugars": "0,4 g",
      "protein": "< 0,1 g",
      "salt": "< 0,01 g"
    }
  },
  "W0123": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Pinot Noir Réserve trocken 2021",
    "verification": "verified"
  },
  "W0119": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Siefersheimer Heerkretz Riesling GG 2023",
    "verification": "verified"
  },
  "W0117": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Appenheimer Hundertgulden Riesling GG 2023",
    "verification": "verified"
  },
  "W0118": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Binger Scharlachberg Riesling GG 2023",
    "verification": "verified"
  },
  "W0116": {
    "alcohol": "12,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Vertrieb: Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Riesling Brut 2022",
    "verification": "verified"
  },
  "W0120": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Gau-Algesheimer St. Laurenzikapelle Riesling GG 2023",
    "verification": "verified"
  },
  "W0112": {
    "alcohol": "12,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Bischel GbR, Sonnenhof 15, 55437 Appenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Rosé trocken 2023",
    "verification": "verified"
  },
  "W0168": {
    "alcohol": "11% vol",
    "ingredients": "Trauben, Saccharose, Konservierungsstoff: Sulfite, Stabilisator: Metaweinsäure",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger, Steinhardter Hof, Kreuznacher Straße 2, 55566 Bad Sobernheim",
    "sourceLabel": "360° Rundgang - Weingut Christian Bamberger, 71826 – E-Label, Kollektion - Weingut Christian Bamberger, Christian Bamberger Augenblick: Cuvée-Kollektion NEO Wein - Castello del Gusto",
    "sourceUrl": "https://www.cb-wein.de/360-start.html",
    "nutrition": {
      "energy": "301 kJ / 72 kcal",
      "fat": "<0,01g",
      "saturates": "<0,01g",
      "carbohydrates": "1,7 g",
      "sugars": "0,8 g",
      "protein": "<0,01g",
      "salt": "<0,01g"
    }
  },
  "W0172": {
    "alcohol": "14,0% vol",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger, Steinhardter Hof, Bad Sobernheim",
    "sourceLabel": "360° Rundgang - Weingut Christian Bamberger, News - Weingut Christian Bamberger, Das Weingut an der Nahe - Weingut Christian Bamberger",
    "sourceUrl": "https://www.cb-wein.de/360-start.html",
    "nutrition": {
      "energy": "",
      "fat": "",
      "saturates": "",
      "carbohydrates": "",
      "sugars": "",
      "protein": "",
      "salt": ""
    }
  },
  "W0171": {
    "alcohol": "11,0 % vol.",
    "ingredients": "Trauben, Saccharose, Konservierungsstoffe: Sulfite, L-Ascorbinsäure, Stabilisator: Metaweinsäure, Apfelsäure, Kohlendioxid",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger",
    "sourceLabel": "360° Rundgang - Weingut Christian Bamberger, 73126 Fräulein Müller – E-Label, 360° Rundgang - Weingut Christian Bamberger, Fräulein Müller aus dem Rosengarten trocken | Christian Bamberger",
    "sourceUrl": "https://www.cb-wein.de/360-start.html",
    "nutrition": {
      "energy": "290 kJ / 70 kcal",
      "fat": "<0,01g",
      "saturates": "<0,01g",
      "carbohydrates": "1,5 g",
      "sugars": "0,6 g",
      "protein": "<0,01g",
      "salt": "<0,01g"
    }
  },
  "W0166": {
    "alcohol": "12,5%",
    "ingredients": "Trauben, Saccharose, Konservierungsstoffe: Sulfite, L-Ascorbinsäure, Stabilisator: Metaweinsäure, Kohlendioxid",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger",
    "sourceLabel": "360° Rundgang - Weingut Christian Bamberger, 73326 Glückslos – E-Label, Gesamtkollektion%203_2024.pdf, Glückslos DQ trocken Weingut Christian Bamberger, Nahe",
    "sourceUrl": "https://www.cb-wein.de/360-start.html",
    "nutrition": {
      "energy": "313 kJ / 75 kcal",
      "fat": "<0,01g",
      "saturates": "<0,01g",
      "carbohydrates": "1,7 g",
      "sugars": "0,7 g",
      "protein": "<0,01g",
      "salt": "<0,01g"
    }
  },
  "W0071": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger – Steinhardter Hof, Kreuznacher Straße 2, 55566 Bad Sobernheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Grauburgunder trocken 2022",
    "verification": "verified"
  },
  "W0169": {
    "alcohol": "12,5%",
    "ingredients": "Trauben, Saccharose, Säureregulator: Äpfelsäure, Konservierungsstoffe: Sulfite, L-Ascorbinsäure, Stabilisator: Metaweinsäure",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger",
    "sourceLabel": "360° Rundgang - Weingut Christian Bamberger, 41726 – E-Label, Das Weingut an der Nahe - Weingut Christian Bamberger, Kollektion - Weingut Christian Bamberger",
    "sourceUrl": "https://www.cb-wein.de/360-start.html",
    "nutrition": {
      "energy": "317 kJ / 76 kcal",
      "fat": "<0,01g",
      "saturates": "<0,01g",
      "carbohydrates": "1,6 g",
      "sugars": "0,7 g",
      "protein": "<0,01g",
      "salt": "<0,01g"
    }
  },
  "W0170": {
    "alcohol": "12% vol",
    "ingredients": "Trauben, Saccharose, Konservierungsstoffe: Sulfite, L-Ascorbinsäure, Stabilisator: Metaweinsäure, Kohlendioxid",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger",
    "sourceLabel": "360° Rundgang - Weingut Christian Bamberger, 40726 – E-Label",
    "sourceUrl": "https://www.cb-wein.de/360-start.html",
    "nutrition": {
      "energy": "295 kJ / 70 kcal",
      "fat": "<0,01g",
      "saturates": "<0,01g",
      "carbohydrates": "2,2 g",
      "sugars": "1,3 g",
      "protein": "<0,01g",
      "salt": "<0,01g"
    }
  },
  "W0082": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger – Steinhardter Hof, Kreuznacher Straße 2, 55566 Bad Sobernheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Riesling Vulkangestein 2021",
    "verification": "verified"
  },
  "W0167": {
    "alcohol": "12,0% vol",
    "ingredients": "Trauben, Saccharose, Konservierungsstoffe: Sulfite, L-Ascorbinsäure, Stabilisator: Metaweinsäure, Kohlendioxid",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger, Steinhardter Hof, Kreuznacher Straße 2, 55566 Bad Sobernheim",
    "sourceLabel": "360° Rundgang - Weingut Christian Bamberger, 40726 – E-Label, Shop CB Wein",
    "sourceUrl": "https://www.cb-wein.de/360-start.html",
    "nutrition": {
      "energy": "295 kJ / 70 kcal",
      "fat": "<0,01g",
      "saturates": "<0,01g",
      "carbohydrates": "2,2 g",
      "sugars": "1,3 g",
      "protein": "<0,01g",
      "salt": "<0,01g"
    }
  },
  "W0084": {
    "alcohol": "13,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger – Steinhardter Hof, Kreuznacher Straße 2, 55566 Bad Sobernheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Spätburgunder Vulkangestein 2020",
    "verification": "verified"
  },
  "W0085": {
    "alcohol": "13,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger – Steinhardter Hof, Kreuznacher Straße 2, 55566 Bad Sobernheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Spätburgunder Vulkangestein 2021",
    "verification": "verified"
  },
  "W0072": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Christian Bamberger – Steinhardter Hof, Kreuznacher Straße 2, 55566 Bad Sobernheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Weißburgunder trocken 2021",
    "verification": "verified"
  },
  "W0100": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Daniel Mattern, 67582 Mettenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Sauvignon Blanc / Chardonnay trocken 2019 (Assemblage Réserve)",
    "verification": "verified"
  },
  "W0099": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Daniel Mattern, 67582 Mettenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Dittelsheim Chardonnay trocken 2021",
    "verification": "verified"
  },
  "W0103": {
    "alcohol": "12,7 % vol.",
    "ingredients": "Trauben, Saccharose, Hopfen, Konservierungsstoffe: Sulfite und L-Ascorbinsäure (E300), Gas und Packgas: Kohlendioxid (E290)",
    "allergens": "Enthält Sulfite",
    "producer": "Daniel Mattern, 67582 Mettenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett und zugehöriges E-Label der angebotenen Flasche (Los HG/05/25)",
    "verification": "verified",
    "nutrition": {
      "energy": "318 kJ / 77 kcal",
      "fat": "< 0,1 g",
      "saturates": "< 0,1 g",
      "carbohydrates": "1,7 g",
      "sugars": "0,9 g",
      "protein": "< 0,1 g",
      "salt": "< 0,1 g"
    }
  },
  "W0097": {
    "alcohol": "11,5 % vol.",
    "ingredients": "Trauben, Saccharose, Stabilisator: Carboxymethylcellulose, Konservierungsstoff: Sulfite",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Daniel Mattern, In den Weingärten 5, 67582 Mettenheim, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett und zugehöriges E-Label des Rosé 2024",
    "verification": "verified",
    "nutrition": {
      "energy": "296 kJ / 71 kcal",
      "fat": "0 g",
      "saturates": "0 g",
      "carbohydrates": "0 g",
      "sugars": "0 g",
      "protein": "0 g",
      "salt": "0 g"
    }
  },
  "W0036": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Geisser GbR, Längelstraße 1, 76889 Schweigen-Rechtenbach, Deutschland; hergestellt in 67346 Speyer",
    "sourceLabel": "Fotografiertes Rücketikett des Chardonnay Brut 2021",
    "verification": "verified"
  },
  "W0040": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Geisser GbR, Längelstraße 1, 76889 Schweigen-Rechtenbach, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Sauvignon Blanc Schweigener Sonnenberg 2022",
    "verification": "verified"
  },
  "W0093": {
    "alcohol": "12,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Matthias Müller, 56322 Spay, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Bopparder Hamm Riesling vom Kieselgallenschiefer 2022",
    "verification": "verified"
  },
  "W0094": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Matthias Müller, 56322 Spay, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Bopparder Hamm Feuerlay Riesling 2022",
    "verification": "verified"
  },
  "W0095": {
    "alcohol": "13,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Matthias Müller, 56322 Spay, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Bopparder Hamm Mandelstein Riesling 2021",
    "verification": "verified"
  },
  "W0052": {
    "alcohol": "10,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Brauneberger Juffer Riesling feinherb 2022",
    "verification": "verified"
  },
  "W0054": {
    "alcohol": "7,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Brauneberger Juffer Riesling Kabinett 2022",
    "verification": "verified"
  },
  "W0051": {
    "alcohol": "12,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Lieser Riesling trocken 2022",
    "verification": "verified"
  },
  "W0053": {
    "alcohol": "10,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Lieser Niederberg Helden Riesling feinherb 2022",
    "verification": "verified"
  },
  "W0063": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Piesporter Goldtröpfchen Riesling trocken 2022",
    "verification": "verified"
  },
  "W0059": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Graacher Himmelreich Riesling trocken 2022",
    "verification": "verified"
  },
  "W0061": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Brauneberger Juffer Sonnenuhr Riesling trocken 2022",
    "verification": "verified"
  },
  "W0060": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Lieser Niederberg Helden Riesling trocken 2022",
    "verification": "verified"
  },
  "W0062": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Wehlener Sonnenuhr Riesling trocken 2022",
    "verification": "verified"
  },
  "W0057": {
    "alcohol": "7,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett der Piesporter Goldtröpfchen Riesling Auslese 2022",
    "verification": "verified"
  },
  "W0056": {
    "alcohol": "7,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1–5, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett der Lieser Niederberg Helden Riesling Auslese Goldkapsel 2022",
    "verification": "verified"
  },
  "W0153": {
    "alcohol": "11,0 % vol",
    "ingredients": "Trauben, Konservierungsstoff: SULFITE",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, Am Markt 1, 54470 Lieser",
    "sourceLabel": "WINZER DES JAHRES - Weingut Schloss Lieser - Thomas Haag, 2025 SL Riesling trocken - Weingut Schloss Lieser Thomas Haag, Der Wein-Informations-Dienst von Winestro.cloud, Weingut Schloss Lieser SL Riesling trocken 2025 | Bremer Weinkolleg",
    "sourceUrl": "https://www.weingut-schloss-lieser.de/",
    "nutrition": {
      "energy": "282 kJ / 68 kcal",
      "fat": "0 g",
      "saturates": "0 g",
      "carbohydrates": "1,5 g",
      "sugars": "0,8 g",
      "protein": "0 g",
      "salt": "<0,01g"
    }
  },
  "W0157": {
    "alcohol": "12,5 Vol%",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser, D-54470 Lieser",
    "sourceLabel": "WINZER DES JAHRES - Weingut Schloss Lieser - Thomas Haag, Riesling Sekt Extra Brut | Schloss-Lieser | Mosel | weinthum, Vinothek der Bauer GmbH & Co. KG",
    "sourceUrl": "https://www.weingut-schloss-lieser.de/",
    "nutrition": {
      "energy": "297 kJ (71 kcal)",
      "fat": "",
      "saturates": "",
      "carbohydrates": "",
      "sugars": "",
      "protein": "",
      "salt": ""
    }
  },
  "W0155": {
    "alcohol": "11,0 % vol",
    "ingredients": "Trauben, Konservierungsstoff:Sulfite",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser",
    "sourceLabel": "WINZER DES JAHRES - Weingut Schloss Lieser - Thomas Haag, Der Wein-Informations-Dienst von Winestro.cloud, 2025 SL Riesling feinherb - Weingut Schloss Lieser Thomas Haag, Schloss Lieser - Thomas Haag – eno",
    "sourceUrl": "https://www.weingut-schloss-lieser.de/",
    "nutrition": {
      "energy": "301 kJ / 72 kcal",
      "fat": "0 g",
      "saturates": "0 g",
      "carbohydrates": "2,4 g",
      "sugars": "1,6 g",
      "protein": "0 g",
      "salt": "<0,01g"
    }
  },
  "W0156": {
    "alcohol": "8,5 vol %",
    "ingredients": "Trauben, Konservierungsstoff: SULFITE",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser",
    "sourceLabel": "WINZER DES JAHRES - Weingut Schloss Lieser - Thomas Haag, 2025 SL Riesling Kabinett - Weingut Schloss Lieser Thomas Haag, Der Wein-Informations-Dienst von Winestro.cloud, Weingut Schloss Lieser SL Riesling Kabinett 2025 | Bremer Weinkolleg",
    "sourceUrl": "https://www.weingut-schloss-lieser.de/",
    "nutrition": {
      "energy": "322 kJ / 77 kcal",
      "fat": "0 g",
      "saturates": "0 g",
      "carbohydrates": "5,9 g",
      "sugars": "5,3 g",
      "protein": "0 g",
      "salt": "<0,01g"
    }
  },
  "W0154": {
    "alcohol": "12,0 vol %",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Schloss Lieser",
    "sourceLabel": "WINZER DES JAHRES - Weingut Schloss Lieser - Thomas Haag, 2023 SL Weissburgunder trocken - Weingut Schloss Lieser Thomas Haag, Schloss Lieser - Thomas Haag – eno",
    "sourceUrl": "https://www.weingut-schloss-lieser.de/",
    "nutrition": {
      "energy": "",
      "fat": "",
      "saturates": "",
      "carbohydrates": "",
      "sugars": "",
      "protein": "",
      "salt": ""
    }
  },
  "W0012": {
    "alcohol": "12,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Thanisch, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Riesling Alte Reben Réserve 2022",
    "verification": "verified"
  },
  "W0005": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Thanisch, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Chardonnay 500 Réserve 2022",
    "verification": "verified"
  },
  "W0006": {
    "alcohol": "12,5 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Thanisch, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Chardonnay 500 Réserve 2023",
    "verification": "verified"
  },
  "W0159": {
    "alcohol": "13,0 % vol.",
    "ingredients": "Trauben, Saccharose, Stabilisator: Metaweinsäure, Antioxidationsmittel: Sulfite",
    "allergens": "Enthält Sulfite",
    "producer": "Weinhaus Thanisch, D-54470 Lieser",
    "sourceLabel": "Nährwertangaben, Thanisch d'Accord trocken 2024 kaufen | Legendäre Weine, Thanisch Mosel Deutschland Wein Wein-Online-Shop Weinversand Wein-Shop Weine wein kaufen shop online",
    "sourceUrl": "https://thanisch.winitas-shop.de/elabel/676",
    "nutrition": {
      "energy": "314 kJ / 75 kcal",
      "fat": "0,0 g",
      "saturates": "<0,01g",
      "carbohydrates": "1,3 g",
      "sugars": "0,5 g",
      "protein": "0,0 g",
      "salt": "0,0 g"
    }
  },
  "W0164": {
    "alcohol": "8,5 Vol%",
    "ingredients": "Trauben, Antioxidationsmittel: Sulfite",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Thanisch",
    "sourceLabel": "Nährwertangaben, Wein Weuste Lieserer Niederberg-Helden Riesling Spätlese edelsüß Weingut Thanisch",
    "sourceUrl": "https://weingut-thanisch.winitas-shop.de/elabel/870",
    "nutrition": {
      "energy": "339 kJ/81 kcal",
      "fat": "0,0 g",
      "saturates": "0,0 g",
      "carbohydrates": "8,3 g",
      "sugars": "7,6 g",
      "protein": "0,0 g",
      "salt": "0,0 g"
    }
  },
  "W0031": {
    "alcohol": "12,5% vol",
    "allergens": "Enthält Sulfite",
    "producer": "Weinhaus Thanisch, D-54470 Lieser",
    "sourceLabel": "Fotografierte Rücketikett-/Weinangaben",
    "nutrition": {
      "energy": "",
      "fat": "",
      "saturates": "",
      "carbohydrates": "",
      "sugars": "",
      "protein": "",
      "salt": ""
    }
  },
  "W0165": {
    "alcohol": "12,5% vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Thanisch",
    "sourceLabel": "Thanisch Mosel Deutschland Wein Wein-Online-Shop Weinversand Wein-Shop Weine wein kaufen shop online",
    "sourceUrl": "https://www.weinhandel-kappus.de/weingut483-weine-Deutschland-Mosel-Thanisch.html",
    "nutrition": {
      "energy": "",
      "fat": "",
      "saturates": "",
      "carbohydrates": "",
      "sugars": "",
      "protein": "",
      "salt": ""
    }
  },
  "W0027": {
    "alcohol": "14,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Thanisch, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Spätburgunder unfiltriert 2020",
    "verification": "verified"
  },
  "W0028": {
    "alcohol": "13,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Thanisch, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Spätburgunder unfiltriert 2021",
    "verification": "verified",
    "nutrition": {
      "energy": "",
      "fat": "",
      "saturates": "",
      "carbohydrates": "",
      "sugars": "",
      "protein": "",
      "salt": ""
    }
  },
  "W0009": {
    "alcohol": "12,0 % vol.",
    "allergens": "Enthält Sulfite",
    "producer": "Weingut Thanisch, 54470 Lieser, Deutschland",
    "sourceLabel": "Fotografiertes Rücketikett des Tribut Grauschiefer Riesling trocken 2023",
    "verification": "verified"
  },
  "W0160": {
    "alcohol": "12,0 % vol",
    "ingredients": "Trauben, Saccharose, Stabilisator: Metaweinsäure, Antioxidationsmittel: Sulfite",
    "allergens": "Enthält Sulfite",
    "producer": "Weinhaus Thanisch, Moselstraße 57a, D-54470 Lieser",
    "sourceLabel": "Nährwertangaben, Thanisch Herzblut Dornfelder 2024 kaufen | Legendäre Weine, Thanisch Wein kaufen | Riesling & Burgunder aus Lieser",
    "sourceUrl": "https://thanisch.winitas-shop.de/elabel/677",
    "nutrition": {
      "energy": "302 kJ/72 kcal",
      "fat": "0,0 g",
      "saturates": "<0,01g",
      "carbohydrates": "2,1 g",
      "sugars": "1,3 g",
      "protein": "0,0 g",
      "salt": "0,0 g"
    }
  }
};
export function productInformationFor(wine: Wine): ProductInformation { const item=productInformation[wine.id]||{}; return {allergens:"Enthält Sulfite",producer: wine.winery+", Deutschland",sourceLabel:"Angaben vor verbindlicher Bestellung anhand der Flasche prüfen",verification:"label-needed",...item}; }
