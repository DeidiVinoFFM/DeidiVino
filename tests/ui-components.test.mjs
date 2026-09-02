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
  assert.match(page, /google\.com\/maps\/search\/\?api=1/);
  assert.match(page, /google\.com\/maps\?q=/);
  assert.match(page, /activeMapWine/);
  assert.match(page, /winery-map-dialog/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /const scrollToResults/);
  assert.match(page, /id="weinergebnisse"/);
  assert.match(page, /getBoundingClientRect\(\)\.height/);
  assert.match(page, /window\.requestAnimationFrame/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /overflow-x: auto/);
  assert.match(css, /@media \(max-width: 1120px\)/);
  assert.match(css, /--footer-logo-image/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.wine-card-media/);
  assert.match(css, /\.wine-card-copy/);
  assert.match(css, /\.wine-detail-main/);
  assert.match(css, /\.wine-detail-copy/);
  assert.match(css, /\.winery-map-frame/);
  assert.match(css, /\.detail-dialog/);
  assert.match(css, /\.winery-description/);
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
