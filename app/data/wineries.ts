export type WineryProfile = {
  name: string;
  region: string;
  description: string;
  sourceUrl: string;
};

export const wineryProfiles: Record<string, WineryProfile> = {
  "Weingut Daniel Mattern": {
    name: "Weingut Daniel Mattern",
    region: "Rheinhessen",
    description:
      "Daniel Mattern gründete sein Weingut 2011. Im Mittelpunkt stehen eigenständige Weine, die Rebsorte, Boden und Herkunft klar erkennen lassen – naturnah gearbeitet, neugierig gedacht und ohne Scheu vor ungewöhnlichen Ideen.",
    sourceUrl: "https://daniel-mattern.de/",
  },
  "Weingut Bischel": {
    name: "Weingut Bischel",
    region: "Rheinhessen",
    description:
      "Das Weingut Bischel in Appenheim arbeitet mit Weinbergen rund um Appenheim, Gau-Algesheim, Bingen und Siefersheim. Kalkstein, Quarzit und Porphyr prägen eine Kollektion, die Herkunft und sorgfältiges Handwerk verbindet.",
    sourceUrl: "https://www.weingut-bischel.de/",
  },
  "Weingut Geisser": {
    name: "Weingut Geisser",
    region: "Pfalz",
    description:
      "Das Pfälzer Weingut Geisser verbindet klassische Rebsorten mit einer geradlinigen, zeitgemäßen Stilistik. Die Weine sind auf Trinkfreude angelegt und zeigen zugleich, was ihre unterschiedlichen Böden und Lagen mitbringen.",
    sourceUrl: "https://weingut-geisser.de/",
  },
  "Schlossgut Diel": {
    name: "Schlossgut Diel",
    region: "Nahe",
    description:
      "Schlossgut Diel steht für fein herausgearbeitete Weine von der Nahe – besonders Riesling, Burgundersorten und anspruchsvolle Sekte. Präzision, Herkunft und eine elegante Balance ziehen sich durch die Kollektion.",
    sourceUrl: "https://diel.eu/",
  },
  "Weingut Christian Bamberger": {
    name: "Weingut Christian Bamberger",
    region: "Nahe",
    description:
      "Bei Christian Bamberger reicht die familiäre Weinbautradition bis 1658 zurück. Seit 2007 führt er das Gut in 14. Generation und verbindet die Erfahrung der Familie mit einer klaren, charaktervollen Handschrift.",
    sourceUrl: "https://www.cb-wein.de/",
  },
  "Weingut Thanisch": {
    name: "Weingut Thanisch",
    region: "Mosel",
    description:
      "Das familiengeführte Weingut Thanisch in Lieser blickt auf Weinbau seit 1648 zurück. Moseltypische Rieslinge bilden das Herzstück; daneben zeigen Burgundersorten und im Holz ausgebaute Weine eine spannende zweite Seite des Hauses.",
    sourceUrl: "https://thanisch.de/",
  },
  "Weingut Matthias Müller": {
    name: "Weingut Matthias Müller",
    region: "Mittelrhein",
    description:
      "Matthias Müller arbeitet im Bopparder Hamm, dessen steile Schieferlagen zu den markanten Riesling-Terroirs des Mittelrheins zählen. Die Weine verbinden reife Frucht, Würze und die kühle Spannung des Schiefers.",
    sourceUrl: "https://www.weingut-matthiasmueller.de/",
  },
  "Weingut Schloss Lieser": {
    name: "Weingut Schloss Lieser",
    region: "Mosel",
    description:
      "Thomas Haag und sein Team stehen für präzise Moselrieslinge aus renommierten Steillagen. Naturnahe Arbeit, selektive Handlese und ein feines Gespür für das Zusammenspiel von Frucht, Säure und Schiefer prägen den Stil.",
    sourceUrl: "https://www.weingut-schloss-lieser.de/",
  },
};
