"use client";
import { useEffect, useState } from "react";

type Attribution = { provider?: string; providerURI?: string };
type Place = { rating?: number | null; userRatingCount?: number | null; displayName?: string | null; attributions?: Attribution[]; fetchFields: (options: { fields: string[] }) => Promise<unknown> };
type MapsWindow = Window & { google?: { maps: { importLibrary: (name: string) => Promise<{ Place: new (options: { id: string }) => Place }> } }; deidivinoMapsReady?: () => void; gm_authFailure?: () => void };
const placeId = "ChIJZx116z4bvUcRqgBWoQuePsY";
const profile = `https://www.google.com/maps/search/?api=1&query=DeidiVino&query_place_id=${placeId}`;
let mapsPromise: Promise<void> | undefined;
function loadMaps(key: string) {
  if ((window as MapsWindow).google?.maps) return Promise.resolve();
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise<void>((resolve, reject) => {
    const w = window as MapsWindow;
    const script = document.createElement("script");
    const timer = window.setTimeout(() => reject(new Error("timeout")), 20000);
    w.deidivinoMapsReady = () => { clearTimeout(timer); resolve(); };
    w.gm_authFailure = () => { clearTimeout(timer); reject(new Error("auth")); };
    script.onerror = () => { clearTimeout(timer); reject(new Error("network")); };
    script.async = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&loading=async&libraries=places&v=quarterly&language=de&callback=deidivinoMapsReady`;
    document.head.appendChild(script);
  });
  return mapsPromise;
}
// Share in-flight work across React remounts; no persistent ratings cache.
let ratingPromise: Promise<Place> | undefined;
function loadRating(): Promise<Place> {
  if (!ratingPromise) ratingPromise = (async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/google-rating-config.json`, { cache: "no-store" });
    if (!response.ok) throw new Error("config");
    const config = await response.json();
    if (typeof config.apiKey !== "string" || !config.apiKey.trim() || config.apiKey.includes("HIER")) throw new Error("key");
    await loadMaps(config.apiKey.trim());
    const lib = await (window as MapsWindow).google!.maps.importLibrary("places");
    const result = new lib.Place({ id: placeId });
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      await Promise.race([
        result.fetchFields({ fields: ["rating", "userRatingCount"] }),
        new Promise((_, reject) => { timer = setTimeout(() => reject(new Error("timeout")), 20000); }),
      ]);
    } finally { clearTimeout(timer); }
    return result;
  })();
  return ratingPromise;
}
export function GoogleRating() {
  const [state, setState] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [place, setPlace] = useState<Place | null>(null);
  useEffect(() => {
    let active = true;
    loadRating().then(result => {
      if (!active) return;
      setPlace(result);
      setState(typeof result.rating === "number" && result.rating >= 0 && result.rating <= 5 && (result.userRatingCount ?? 0) > 0 ? "ready" : "empty");
    }).catch(() => { if (active) setState("error"); });
    return () => { active = false; };
  }, []);
  return <aside className="google-rating" aria-label="Google-Kundenbewertungen">
    <div aria-live="polite" aria-busy={state === "loading"}>
      {state === "loading" && <p>Bewertung wird geladen …</p>}
      {state === "ready" && place && <>
        <a className="google-rating-line" href={profile} target="_blank" rel="noopener noreferrer">
          <span className="google-rating-score"><span className="rating-stars" aria-hidden="true"><span style={{ width: `${place.rating! / 5 * 100}%` }}>★★★★★</span>★★★★★</span><strong>{place.rating!.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} / 5</strong></span>
          <span className="google-rating-meta">{place.userRatingCount!.toLocaleString("de-DE")} {place.userRatingCount === 1 ? "Bewertung" : "Bewertungen"} · <span className="google-attribution">Google Maps</span> <span aria-hidden="true">↗</span></span>
        </a>
        {place.attributions?.map((a, i) => <p key={i}>{a.providerURI?.startsWith("https://") ? <a href={a.providerURI} target="_blank" rel="noopener noreferrer">{a.provider}</a> : a.provider}</p>)}
      </>}
      {state === "empty" && <p>Für dieses Profil ist derzeit keine Bewertung verfügbar.</p>}
      {state === "error" && <p>Die Bewertung konnte nicht geladen werden. Bitte versuche es nach dem Neuladen der Seite erneut.</p>}
    </div>
    {(state === "empty" || state === "error") && <a href={profile} target="_blank" rel="noopener noreferrer">Bewertungen auf Google Maps ansehen ↗</a>}
  </aside>;
}
