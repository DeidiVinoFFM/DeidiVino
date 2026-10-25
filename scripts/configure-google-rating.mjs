import { writeFileSync } from "node:fs";

const apiKey = process.env.GOOGLE_MAPS_BROWSER_API_KEY?.trim();
if (!apiKey || apiKey.includes("HIER")) {
  console.error("Repository-Secret GOOGLE_MAPS_BROWSER_API_KEY fehlt. Veröffentlichung abgebrochen; die bestehende Website bleibt erhalten.");
  process.exit(1);
}
writeFileSync(new URL("../public/google-rating-config.json", import.meta.url), JSON.stringify({ apiKey }) + "\n");
console.log("Google-Bewertung konfiguriert (Browser-Schlüssel wird im ausgelieferten Frontend sichtbar).");
