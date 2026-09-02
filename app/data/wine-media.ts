export type WineMedia = {
  src: string;
  alt: string;
  credit?: string;
  sourceUrl?: string;
};

// Hier werden ausschließlich Bilder eingetragen, an denen DeidiVino die eigenen
// Rechte hält oder deren Nutzung ausdrücklich freigegeben wurde. Bis ein Foto
// vorliegt, zeigt die Website bewusst einen neutralen Platzhalter.
export const wineMedia: Partial<Record<string, WineMedia>> = {
  W0002: { src: "/wine-images/W0002.webp", alt: "Chardonnay 2023 von Weingut Thanisch" },
  W0005: { src: "/wine-images/W0005.webp", alt: "Chardonnay 500 Reserve 2022 von Weingut Thanisch" },
  W0006: { src: "/wine-images/W0006.webp", alt: "Chardonnay 500 Reserve 2023 von Weingut Thanisch" },
  W0009: { src: "/wine-images/W0009.webp", alt: "Tribut Grauschiefer Riesling 2023 von Weingut Thanisch" },
  W0010: { src: "/wine-images/W0010.webp", alt: "Riesling Spätlese Trocken Niederberg Helden 2022 von Weingut Thanisch" },
  W0012: { src: "/wine-images/W0012.webp", alt: "Alte Reben R Trocken 2022 von Weingut Thanisch" },
  W0027: { src: "/wine-images/W0027.webp", alt: "Spätburgunder Trocken unfiltriert Barrique 2020 von Weingut Thanisch" },
  W0036: { src: "/wine-images/W0036.webp", alt: "Chardonnay Sekt Brut von Weingut Geisser" },
  W0040: { src: "/wine-images/W0040.webp", alt: "Sauvignon Blanc Sonnenberg von Weingut Geisser" },
  W0064: { src: "/wine-images/W0064.webp", alt: "Nahesteiner Weißburgunder 2022 von Schlossgut Diel" },
  W0066: { src: "/wine-images/W0066.webp", alt: "Pinot Gris Reserve 2018 von Schlossgut Diel" },
  W0067: { src: "/wine-images/W0067.webp", alt: "Prestige Cuvée Victor 2018 von Schlossgut Diel" },
  W0068: { src: "/wine-images/W0068.webp", alt: "Rosé de Diel 2022 von Schlossgut Diel" },
  W0071: { src: "/wine-images/W0071.webp", alt: "Grauburgunder von Weingut Christian Bamberger" },
  W0080: { src: "/wine-images/W0080.webp", alt: "Glückslos von Weingut Christian Bamberger" },
  W0081: { src: "/wine-images/W0081.webp", alt: "Augenblick von Weingut Christian Bamberger" },
  W0082: { src: "/wine-images/W0082.webp", alt: "Riesling Vulkangestein von Weingut Christian Bamberger" },
  W0084: { src: "/wine-images/W0084.webp", alt: "Spätburgunder Vulkangestein 2020 von Weingut Christian Bamberger" },
  W0085: { src: "/wine-images/W0085.webp", alt: "Spätburgunder Vulkangestein 2021 von Weingut Christian Bamberger" },
  W0093: { src: "/wine-images/W0093.webp", alt: "Riesling Bopparder Hamm Kieselgallenschiefer von Weingut Matthias Müller" },
  W0094: { src: "/wine-images/W0094.webp", alt: "Riesling Feuerlay GG von Weingut Matthias Müller" },
  W0095: { src: "/wine-images/W0095.webp", alt: "Riesling Mandelstein GG von Weingut Matthias Müller" },
  W0097: { src: "/wine-images/W0097.webp", alt: "Rosé von Weingut Daniel Mattern" },
  W0098: { src: "/wine-images/W0098.webp", alt: "Grauburgunder von Weingut Daniel Mattern" },
  W0099: { src: "/wine-images/W0099.webp", alt: "Dittelsheimer Chardonnay Reserve von Weingut Daniel Mattern" },
  W0100: { src: "/wine-images/W0100.webp", alt: "Dittelsheimer Assemblage Réserve von Weingut Daniel Mattern" },
  W0103: { src: "/wine-images/W0103.webp", alt: "Hop & Grape Perlwein von Weingut Daniel Mattern" },
  W0109: { src: "/wine-images/W0109.webp", alt: "No Limit Sparkling alkoholfrei von Weingut Daniel Mattern" },
  W0116: { src: "/wine-images/W0116.webp", alt: "Riesling Sekt Brut von Weingut Bischel" },
};
