export type WineRating = {
  publication: string;
  score: string;
  vintage: number;
  sourceUrl: string;
};

// Nur Bewertungen, bei denen Wein und Jahrgang eindeutig mit dem angebotenen Wein übereinstimmen.
export const wineRatings: Record<string, WineRating[]> = {
  W0117: [
    {
      publication: "Falstaff",
      score: "95 Punkte",
      vintage: 2023,
      sourceUrl:
        "https://www.falstaff.com/at/weine/weingut-bischel-2023-appenheim-hundertgulden-riesling-gg",
    },
  ],
  W0118: [
    {
      publication: "Falstaff",
      score: "95+ Punkte",
      vintage: 2023,
      sourceUrl:
        "https://www.falstaff.com/de/weine/weingut-bischel-2023-bingen-scharlachberg-riesling-gg",
    },
  ],
  W0119: [
    {
      publication: "Falstaff",
      score: "95 Punkte",
      vintage: 2023,
      sourceUrl:
        "https://www.falstaff.com/at/weine/weingut-bischel-2023-siefersheim-heerkretz-riesling-gg",
    },
  ],
};
