# DeidiVino – statische Weinliste

Konkrete, mobil optimierte Verkaufs- und Beratungsseite für die aktuell
verfügbaren DeidiVino-Weine. Das Projekt ist für GitHub Pages vorbereitet.

## Enthaltene Funktionen

- 56 verfügbare Wein-/Jahrgangspositionen aus dem Stand vom 1. September 2026
- Suche nach Wein, Weingut, Region, Rebsorte und Stil
- Filter nach Weinart und Preisbereich
- sechs hervorgehobene Einstiegspositionen
- Merkliste für mehrere Weine
- vorausgefüllte E-Mail-Anfrage ohne Server oder Kontaktformular
- responsive Darstellung für Smartphone, Tablet und Desktop
- Impressum- und Datenschutzseiten als zu vervollständigende Vorlagen
- automatisierte Veröffentlichung über GitHub Actions

Die ursprüngliche Excel-Masterdatei ist bewusst **nicht** Bestandteil dieses
Projekts. Kundendaten, Einkaufspreise und exakte Lagerzahlen werden nicht in den
öffentlichen Website-Code übernommen.

## Vor Veröffentlichung zwingend ergänzen

1. In `app/impressum/page.tsx`:
   - vollständige ladungsfähige Anschrift
   - Telefonnummer
   - gegebenenfalls Register- und Umsatzsteuerangaben
   - passende Erklärung zur Verbraucherstreitbeilegung
2. In `app/datenschutz/page.tsx`:
   - Verantwortlichenanschrift
   - Angaben zum tatsächlich verwendeten Hosting
   - Aufbewahrungsfristen und Rechtsgrundlagen der E-Mail-Kommunikation
3. Versandkosten und Liefergebiet verbindlich festlegen und auf der Website ergänzen.
4. Produktpflichtangaben für den konkreten Fernabsatzprozess rechtlich prüfen.
5. Die hervorgehobenen sechs Weine in `app/data/wines.ts` fachlich bestätigen.

## Kontaktdaten ändern

E-Mail-Adresse, Instagram-Link und Inhabername stehen zentral in:

`app/site-config.ts`

## Weinbestand aktualisieren

Die öffentlichen Produktdaten stehen in:

`app/data/wines.ts`

Nur Daten veröffentlichen, die Kund:innen sehen dürfen. Die Masterdatei mit
Vorgängen, Kundendaten und Einkaufspreisen niemals in das öffentliche GitHub-
Repository hochladen.

Bei Aktualisierungen sind insbesondere anzupassen:

- Jahrgang und Verfügbarkeit
- Verkaufspreis und Grundpreis je Liter
- Kennzeichnung „Nur wenige Flaschen“
- `inventoryAsOf`

## Lokal prüfen

Voraussetzung: Node.js 22 oder neuer.

```bash
npm ci
npm run build
```

## Auf GitHub Pages veröffentlichen

1. Ein neues GitHub-Repository anlegen, beispielsweise `deidivino-weinliste`.
2. Den gesamten Projektinhalt in das Repository übertragen.
3. Als Standardbranch `main` verwenden.
4. Unter **Settings → Pages → Build and deployment** als Quelle
   **GitHub Actions** auswählen.
5. Änderungen nach `main` übertragen. Der enthaltene Workflow baut und
   veröffentlicht die Seite automatisch.

Die Adresse lautet anschließend üblicherweise:

`https://DEIN-GITHUB-NAME.github.io/deidivino-weinliste/`

Diese Adresse kann im Google-Unternehmensprofil als Website hinterlegt werden.
Bei Verwendung einer eigenen Domain sind zusätzlich DNS- und GitHub-Pages-
Einstellungen erforderlich.

## Technischer Aufbau

- Next.js/Vinext als statischer Export
- React für Suche, Filter und Merkliste
- lokale Bilder und Systemschriften
- keine Cookies, keine Analysewerkzeuge, keine eingebetteten Drittanbieterinhalte
- GitHub Actions für den Pages-Deploy

