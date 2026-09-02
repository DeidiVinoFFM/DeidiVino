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
  W0036: { src: "/wine-images/W0036.webp", alt: "Chardonnay Sekt Brut von Weingut Geisser" },
  W0040: { src: "/wine-images/W0040.webp", alt: "Sauvignon Blanc Sonnenberg von Weingut Geisser" },
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
  W0109: { src: "/wine-images/W0109.webp", alt: "No Limit Sparkling alkoholfrei von Weingut Daniel Mattern" },
  W0116: { src: "/wine-images/W0116.webp", alt: "Riesling Sekt Brut von Weingut Bischel" },
};
