export type WineryProfile = {
  name: string;
  region: string;
  locationLabel: string;
  description: string;
  sourceUrl: string;
};

export const wineryProfiles: Record<string, WineryProfile> = {
  "Weingut Daniel Mattern": {
    name: "Weingut Daniel Mattern",
    region: "Rheinhessen",
    locationLabel: "In den Weingärten 5, 67582 Mettenheim",
    description:
      "Daniel Mattern gründete sein Weingut 2011. Er arbeitet naturnah und macht eigenständige Weine, in denen Rebsorte, Boden und Herkunft klar erkennbar bleiben. Neben klassischen Stillweinen ist immer wieder Platz für ungewöhnliche Ideen – genau das macht seine kleine Kollektion so spannend.",
    sourceUrl: "https://daniel-mattern.de/",
  },
  "Weingut Bischel": {
    name: "Weingut Bischel",
    region: "Rheinhessen",
    locationLabel: "Sonnenhof 15, 55437 Appenheim",
    description:
      "Das Weingut Bischel bewirtschaftet Weinberge rund um Appenheim, Gau-Algesheim, Bingen und Siefersheim. Kalkstein, Quarzit und Porphyr geben den Weinen ihren eigenen Charakter. Ob Gutswein oder Großes Gewächs: Die Herkunft soll im Glas immer zu erkennen sein.",
    sourceUrl: "https://www.weingut-bischel.de/",
  },
  "Weingut Geisser": {
    name: "Weingut Geisser",
    region: "Pfalz",
    locationLabel: "Längelstraße 1, 76889 Schweigen-Rechtenbach",
    description:
      "Das Pfälzer Weingut Geisser verbindet klassische Rebsorten mit einem klaren, zeitgemäßen Stil. Die Weine machen unkompliziert Freude und lassen trotzdem erkennen, was Böden und Lagen mitbringen. Bodenständiges Handwerk trifft hier auf viel Lust am Genuss.",
    sourceUrl: "https://weingut-geisser.de/",
  },
  "Schlossgut Diel": {
    name: "Schlossgut Diel",
    region: "Nahe",
    locationLabel: "Burg Layen, 55452 Rümmelsheim",
    description:
      "Schlossgut Diel steht für fein gearbeitete Weine von der Nahe – vor allem Riesling, Burgundersorten und anspruchsvolle Sekte. Die Kollektion verbindet klare Herkunft mit eleganter Balance. Viele Weine wirken zunächst leise und fein, zeigen mit etwas Zeit im Glas aber erstaunliche Tiefe.",
    sourceUrl: "https://diel.eu/",
  },
  "Weingut Christian Bamberger": {
    name: "Weingut Christian Bamberger",
    region: "Nahe",
    locationLabel: "Kreuznacher Straße 2, 55566 Bad Sobernheim",
    description:
      "Das Weingut Christian Bamberger am Steinhardter Hof blickt auf eine Weinbautradition bis 1658 zurück. Christian Bamberger führt das Gut seit 2007 in 14. Generation und verbindet die Erfahrung seiner Familie mit einer klaren eigenen Handschrift. Vulkangestein und die Lagen der Nahe verleihen vielen Weinen ihre würzige Spannung.",
    sourceUrl: "https://www.cb-wein.de/",
  },
  "Weingut Thanisch": {
    name: "Weingut Thanisch",
    region: "Mosel",
    locationLabel: "Weingut Thanisch, 54470 Lieser",
    description:
      "Die Familie Thanisch betreibt in Lieser seit 1648 Weinbau. Rieslinge mit typischer Moselfrische stehen im Mittelpunkt, daneben zeigen Burgundersorten und im Holz ausgebaute Weine eine ganz andere Seite des Hauses. Die Auswahl reicht von lebendiger Schieferfrische bis zu konzentrierten Weinen für ein besonderes Essen.",
    sourceUrl: "https://thanisch.de/",
  },
  "Weingut Matthias Müller": {
    name: "Weingut Matthias Müller",
    region: "Mittelrhein",
    locationLabel: "Mainzer Straße 45, 56322 Spay",
    description:
      "Matthias Müller arbeitet im Bopparder Hamm, einer der markanten Rieslinglagen am Mittelrhein. Reife Frucht, Würze und die kühle Spannung des Schiefers prägen seine Weine. Besonders reizvoll ist, wie unterschiedlich die einzelnen Lagen innerhalb dieses Hangs schmecken.",
    sourceUrl: "https://www.weingut-matthiasmueller.de/",
  },
  "Weingut Schloss Lieser": {
    name: "Weingut Schloss Lieser",
    region: "Mosel",
    locationLabel: "Am Markt 1–5, 54470 Lieser",
    description:
      "Thomas Haag und sein Team stehen für präzise Moselrieslinge aus bekannten Steillagen. Naturnahe Arbeit, selektive Handlese und ein feines Gespür für Frucht, Säure und Schiefer bestimmen den Stil. Die Weine verbinden Feinheit mit Konzentration und gewinnen oft noch mit etwas Zeit und Luft.",
    sourceUrl: "https://www.weingut-schloss-lieser.de/",
  },
};
