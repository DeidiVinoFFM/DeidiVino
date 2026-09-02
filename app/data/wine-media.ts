export type WineMedia = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl?: string;
};

// Hier werden ausschließlich Bilder eingetragen, deren Nutzung für DeidiVino
// ausdrücklich freigegeben ist oder an denen DeidiVino die eigenen Rechte hält.
// Bis zur Freigabe bzw. Anlieferung eigener Flaschenfotos zeigt die Website
// bewusst einen neutralen Platzhalter.
export const wineMedia: Partial<Record<string, WineMedia>> = {};
