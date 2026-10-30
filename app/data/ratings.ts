// Von DeidiVino lokal erzeugt. Bewertungen und Auszeichnungen gelten nur für den passenden Jahrgang.
export type WineRating={kind?:"Bewertung"|"Auszeichnung";publication:string;award?:string|null;score:string;vintage:number|string;sourceUrl:string};
export const wineRatings: Record<string,WineRating[]> = {
  "W0152": [
    {
      "kind": "Bewertung",
      "publication": "Wein Direktimport",
      "award": null,
      "score": "92/100",
      "vintage": 2023,
      "sourceUrl": "https://www.wein-direktimport.de/2023-black-print/10017544"
    },
    {
      "kind": "Bewertung",
      "publication": "Antonio Galloni Vinous",
      "award": null,
      "score": "91/100",
      "vintage": 2023,
      "sourceUrl": "https://www.wein-direktimport.de/2023-black-print/10017544"
    }
  ],
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
