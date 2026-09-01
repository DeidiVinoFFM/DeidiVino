import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectUrl = new URL("../", import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, projectUrl), "utf8");
}

test("publishes 56 sellable records without internal inventory fields", async () => {
  const source = await read("app/data/wines.ts");
  const marker = "export const wines: Wine[] = ";
  const arrayStart = source.indexOf("[", source.indexOf(marker) + marker.length);
  const wines = JSON.parse(source.slice(arrayStart).trim().replace(/;$/, ""));

  assert.equal(wines.length, 56);
  assert.equal(wines.filter((wine) => wine.featured).length, 6);
  assert.equal(new Set(wines.map((wine) => wine.id)).size, wines.length);
  assert.ok(wines.every((wine) => wine.price > 0 && wine.volume > 0));
  assert.ok(
    wines.every(
      (wine) => Math.abs(wine.unitPrice - wine.price / wine.volume) <= 0.01,
    ),
  );
  assert.doesNotMatch(source, /stockCount|EK netto|EK brutto|Kunden-ID|Partner\/Kunde/);
});

test("keeps selection, search and mobile accessibility in the implementation", async () => {
  const page = await read("app/page.tsx");
  const css = await read("app/globals.css");

  assert.match(page, /placeholder="Wein, Weingut, Rebsorte oder Region"/);
  assert.match(page, /Auswahl anfragen/);
  assert.match(page, /Alkoholfrei/);
  assert.match(page, /Nur wenige Flaschen/);
  assert.match(css, /@media \(max-width: 680px\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
