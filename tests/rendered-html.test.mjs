import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectUrl = new URL("../", import.meta.url);

test("renders the complete static sales page", async () => {
  const html = await readFile(new URL("dist/client/index.html", projectUrl), "utf8");

  assert.match(html, /DeidiVino Weinliste \| Persönlich ausgewählte Weine/);
  assert.match(html, /Weine, die im Glas Freude machen\./);
  assert.match(html, /Weine zur Auswahl/);
  assert.match(html, />55</);
  assert.match(html, /Sechs gute Gründe, eine Flasche zu öffnen/);
  assert.match(html, /Tribut Grauschiefer Riesling/);
  assert.match(html, /No Limit Sparkling alkoholfrei/);
  assert.match(html, /Charakter im Glas ansehen/);
  assert.match(html, /Flaschenfoto folgt/);
  assert.match(html, /mailto:deidivino\.ffm@gmail\.com/);
  assert.doesNotMatch(html, /Sauvignon Blanc II/);
  assert.match(html, /href="(?:\/DeidiVino)?\/impressum\/"/);
  assert.match(html, /href="(?:\/DeidiVino)?\/datenschutz\/"/);
});

test("prerenders the legal pages", async () => {
  const impressum = await readFile(
    new URL("dist/client/impressum/index.html", projectUrl),
    "utf8",
  );
  const datenschutz = await readFile(
    new URL("dist/client/datenschutz/index.html", projectUrl),
    "utf8",
  );

  assert.match(impressum, /Angaben gemäß § 5 DDG/);
  assert.match(impressum, /Marie-von-Oriola-Straße 24/);
  assert.doesNotMatch(impressum, /022 426 00402/);
  assert.match(datenschutz, /Datenschutzerklärung/);
  assert.match(datenschutz, /Hosting über GitHub Pages/);
});
