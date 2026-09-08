import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectUrl = new URL("../", import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, projectUrl), "utf8");
}

test("publishes 54 sellable records without internal inventory fields", async () => {
  const source = await read("app/data/wines.ts");
  const marker = "export const wines: Wine[] = ";
  const arrayStart = source.indexOf("[", source.indexOf(marker) + marker.length);
  const wines = JSON.parse(source.slice(arrayStart).trim().replace(/;$/, ""));

  assert.equal(wines.length, 54);
  assert.equal(wines.filter((wine) => wine.featured).length, 6);
  assert.equal(new Set(wines.map((wine) => wine.id)).size, wines.length);
  assert.ok(wines.every((wine) => wine.price > 0 && wine.volume > 0));
  assert.ok(
    wines.every(
      (wine) => Math.abs(wine.unitPrice - wine.price / wine.volume) <= 0.01,
    ),
  );
  assert.doesNotMatch(source, /stockCount|EK netto|EK brutto|Kunden-ID|Partner\/Kunde/);
  assert.ok(
    !wines.some(
      (wine) => wine.winery === "Weingut von Winning" && wine.grape === "Sauvignon Blanc",
    ),
  );
});

test("keeps selection, search and mobile accessibility in the implementation", async () => {
  const page = await read("app/page.tsx");
  const css = await read("app/globals.css");
  const layout = await read("app/layout.tsx");

  assert.match(page, /placeholder="Wein, Weingut, Rebsorte oder Region"/);
  assert.match(page, /Jetzt anfragen/);
  assert.match(page, /Webmail verwenden/);
  assert.match(page, /In Gmail öffnen/);
  assert.match(page, /mail\.google\.com\/mail\/\?view=cm/);
  assert.match(page, /Anderen Webmailer verwenden/);
  assert.match(page, /Alkoholfrei/);
  assert.match(page, /Nur noch 1 Flasche/);
  assert.match(page, /Charakter im Glas ansehen/);
  assert.match(page, /Flaschenfoto folgt/);
  assert.match(page, /Offizielle Website des Weinguts/);
  assert.match(page, /wineDescriptions\[activeWine\.id\]/);
  assert.match(page, /wineryProfiles\[wine\.winery\]/);
  assert.doesNotMatch(page, /Google Maps/);
  assert.doesNotMatch(page, /activeMapWine/);
  assert.match(page, /Produkt- und Lebensmittelangaben/);
  assert.match(page, /productInformationFor/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /const scrollToResults/);
  assert.match(page, /id="weinergebnisse"/);
  assert.match(page, /getBoundingClientRect\(\)\.height/);
  assert.match(page, /window\.requestAnimationFrame/);
  assert.match(page, /adviceImage\.decode\(\)/);
  assert.match(page, /loading="eager"/);
  assert.match(page, /className="skip-link" href="#top"/);
  assert.match(page, /deidivino-merkliste/);
  assert.match(page, /sessionStorage/);
  assert.match(page, /updateQuantity/);
  assert.match(page, /Deine Merkliste/);
  assert.match(page, /Mehr über mich/);
  assert.match(page, /ImageWithFallback/);
  assert.match(page, /servingSuggestion/);
  assert.match(page, /wineRatings/);
  assert.match(page, /<main id="top" tabIndex=\{-1\}>/);
  assert.match(page, /mixed-wines-retina\.webp/);
  assert.match(layout, /export const viewport/);
  assert.match(layout, /width: "device-width"/);
  assert.match(layout, /initialScale: 1/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /overflow-x: auto/);
  assert.match(css, /overflow-x: clip/);
  assert.match(css, /-webkit-text-size-adjust: 100%/);
  assert.doesNotMatch(css, /content-visibility: auto/);
  assert.doesNotMatch(css, /contain-intrinsic-size/);
  assert.match(css, /@media \(max-width: 1120px\)/);
  assert.match(css, /--footer-logo-image/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.wine-card-media/);
  assert.match(css, /\.wine-card-copy/);
  assert.match(css, /\.wine-detail-main/);
  assert.match(css, /\.wine-detail-copy/);
  assert.match(css, /\.product-information/);
  assert.match(css, /\.detail-dialog/);
  assert.match(css, /\.winery-description/);
  assert.match(css, /\.skip-link/);
  assert.doesNotMatch(css, /\bInter\b/);
  assert.match(layout, /openGraph:/);
  assert.match(layout, /twitter:/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /mixed-wines-retina\.webp/);
  assert.match(layout, /alternates:/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(layout, /lJxNDekwJizbML81flGZfCShpCr0Tsv0vDiXmXQKdxw/);
  await access(new URL("public/sitemap.xml", projectUrl));
});

test("provides a description for every wine and winery", async () => {
  const winesSource = await read("app/data/wines.ts");
  const marker = "export const wines: Wine[] = ";
  const arrayStart = winesSource.indexOf("[", winesSource.indexOf(marker) + marker.length);
  const wines = JSON.parse(winesSource.slice(arrayStart).trim().replace(/;$/, ""));
  const detailsSource = await read("app/data/wine-details.ts");
  const wineriesSource = await read("app/data/wineries.ts");

  const describedWineIds = new Set(
    [...detailsSource.matchAll(/^\s{2}(W\d{4}):/gm)].map((match) => match[1]),
  );

  assert.equal(describedWineIds.size, wines.length);
  assert.ok(wines.every((wine) => describedWineIds.has(wine.id)));
  assert.ok(wines.every((wine) => wineriesSource.includes(`"${wine.winery}":`)));
  assert.match(wineriesSource, /sourceUrl: "https:\/\//);
});

test("includes all three batches of own wine photographs as deployable web assets", async () => {
  const media = await read("app/data/wine-media.ts");
  const imageDirectory = new URL("public/wine-images/", projectUrl);
  const images = await readdir(imageDirectory);

  assert.equal(images.filter((file) => file.endsWith(".webp")).length, 54);
  assert.equal([...media.matchAll(/^\s{2}W\d{4}:/gm)].length, 54);
  assert.match(media, /W0036: \{ src: "\/wine-images\/W0036\.webp"/);
  assert.match(media, /W0116: \{ src: "\/wine-images\/W0116\.webp"/);
  assert.match(media, /W0103: \{ src: "\/wine-images\/W0103\.webp"/);
  assert.match(media, /W0123: \{ src: "\/wine-images\/W0123\.webp"/);
  assert.doesNotMatch(media, /W0113: \{ src:/);
  await access(new URL("W0036.webp", imageDirectory));
  await access(new URL("W0116.webp", imageDirectory));
  await access(new URL("W0103.webp", imageDirectory));
  await access(new URL("W0123.webp", imageDirectory));
});

test("publishes verified 2024 product data and marks remaining label checks", async () => {
  const productInfo = await read("app/data/product-information.ts");
  const shipping = await read("app/versand/page.tsx");

  assert.match(productInfo, /W0109:/);
  assert.match(productInfo, /W0103:/);
  assert.match(productInfo, /W0097:/);
  assert.match(productInfo, /W0111:/);
  assert.match(productInfo, /Entalkoholisierter Wein/);
  assert.match(productInfo, /318 kJ \/ 77 kcal/);
  assert.match(productInfo, /93 kJ \/ 22 kcal/);
  assert.match(productInfo, /314 kJ \/ 75 kcal/);
  assert.match(productInfo, /W0123: \{ alcohol: "13,0 % vol\."/);
  assert.match(productInfo, /Fotografiertes Rücketikett/);
  assert.match(productInfo, /verification: "label-needed"/);
  assert.match(shipping, /13 bis 18 Flaschen/);
  assert.match(shipping, /14,90 €/);
  assert.match(shipping, /trägt DeidiVino das Transportrisiko bis zur Übergabe/);
  assert.match(shipping, /Die Zahlung erfolgt grundsätzlich per Überweisung/);
  assert.match(shipping, /auch Barzahlung möglich/);
  assert.match(shipping, /nach Eingang des vollständigen Rechnungsbetrags/);
});

test("uses the confirmed address for Christian Bamberger at the Steinhardter Hof", async () => {
  const wineries = await read("app/data/wineries.ts");
  const productInfo = await read("app/data/product-information.ts");

  assert.match(wineries, /Steinhardter Hof/);
  assert.match(wineries, /Kreuznacher Straße 2, 55566 Bad Sobernheim/);
  assert.match(productInfo, /Steinhardter Hof, Kreuznacher Straße 2/);
  assert.doesNotMatch(productInfo, /Steinhardter Hof 2/);
  await access(new URL("public/mixed-wines-retina.webp", projectUrl));
});
