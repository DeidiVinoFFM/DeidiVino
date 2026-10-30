// Von DeidiVino lokal erzeugt. Bewertungen und Auszeichnungen gelten nur für den passenden Jahrgang.
export type WineRating={kind?:"Bewertung"|"Auszeichnung";publication:string;award?:string|null;score:string;vintage:number|string;sourceUrl:string};
export const wineRatings: Record<string,WineRating[]> = {
  "W0119": [
    {
      "kind": "Bewertung",
      "publication": "Falstaff",
      "award": null,
      "score": "95 Punkte",
      "vintage": 2023,
      "sourceUrl": "https://www.falstaff.com/at/weine/weingut-bischel-2023-siefersheim-heerkretz-riesling-gg"
    }
  ],
  "W0117": [
    {
      "kind": "Bewertung",
      "publication": "Falstaff",
      "award": null,
      "score": "95 Punkte",
      "vintage": 2023,
      "sourceUrl": "https://www.falstaff.com/at/weine/weingut-bischel-2023-appenheim-hundertgulden-riesling-gg"
    }
  ],
  "W0118": [
    {
      "kind": "Bewertung",
      "publication": "Falstaff",
      "award": null,
      "score": "95+ Punkte",
      "vintage": 2023,
      "sourceUrl": "https://www.falstaff.com/de/weine/weingut-bischel-2023-bingen-scharlachberg-riesling-gg"
    }
  ]
};
