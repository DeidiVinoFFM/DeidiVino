import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const projectUrl = new URL("../", import.meta.url);

test("renders the complete static sales page", async () => {
  const html = await readFile(new URL("dist/client/index.html", projectUrl), "utf8");

  assert.match(html, /DeidiVino Weinliste September 2026/);
  assert.match(html, /Handverlesen\. Persönlich\. Verfügbar\./);
  assert.match(html, /Verfügbare Positionen/);
  assert.match(html, />56</);
  assert.match(html, /Sechs Weine zum Entdecken/);
  assert.match(html, /Tribut Grauschiefer Riesling/);
  assert.match(html, /No Limit Sparkling alkoholfrei/);
  assert.match(html, /mailto:deidivino\.ffm@gmail\.com/);
  assert.match(html, /href="\/impressum\/"/);
  assert.match(html, /href="\/datenschutz\/"/);
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
  assert.match(datenschutz, /Datenschutzerklärung/);
});
