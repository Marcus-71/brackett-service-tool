const CACHE_NAME = "bfc-cache-v293";
// v286: library files that never change between versions (OCR engine, barcode
// reader, PDF viewer, icons, Education PDFs) live in their own cache, kept from
// one version to the next. A version update now downloads only the app's own
// files (~18 MB) instead of everything (~53 MB): it finishes on weak signal and
// phones stop getting stuck on old versions. RULE: if a file in STATIC_FILES
// ever changes under the same name (an Education PDF replaced, a vendor
// upgrade), bump STATIC_CACHE - otherwise phones keep the old copy.
const STATIC_CACHE = "bfc-static-v1";
// The OCR worker is created LSTM-only (createWorker("eng", 1)), so it only ever
// loads one of the two -lstm builds: SIMD on any phone from the last several
// years, the plain one on very old phones. Same test the OCR worker itself runs
// (WebAssembly SIMD feature check), so the file precached here is the file it
// asks for. The two non-LSTM builds (9 MB) could never load and are gone.
const SIMD = (() => {
  try { return WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])); }
  catch (e) { return false; }
})();
const STATIC_FILES = [
  "./education/superheat-subcooling.pdf",
  "./education/thermostat-wiring-heat-pump.pdf",
  "./education/thermostat-wiring-ac-gas-furnace.pdf",
  "./education/furnace-pressure-switch-testing.pdf",
  "./education/furnace-gas-pressure-check.pdf",
  "./vendor/tesseract.min.js",
  "./vendor/worker.min.js",
  SIMD ? "./vendor/tesseract-core-simd-lstm.wasm.js" : "./vendor/tesseract-core-lstm.wasm.js",
  "./vendor/eng.traineddata.gz",
  "./vendor/jspdf.umd.min.js",
  "./vendor/zxing-reader.js",
  "./vendor/zxing_reader.wasm",
  "./pdfjs/pdf.min.js",
  "./pdfjs/pdf.worker.min.js",
  "./icons/brackett-logo.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
];
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./pt-data.js",
  "./data.js",
  "./symptoms.js",
  "./unit-scenarios.js",
  "./followups.js",
  "./charging-charts.js",
  "./toolbox.js",
  "./thermostats.js",
  "./generators.js",
  "./kohler-gens.js",
  "./weather.js",
  "./maint.js",
  "./bulletins.js",
  "./calllog.js",
  "./inventory.js",
  "./dchecker/index.html",
  "./guides/daikin-checker-guide.html",
  "./manuals-seed/seed-index.js",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  // Fetch with {cache:"reload"} instead of cache.addAll() — addAll() honors the
  // browser's regular HTTP cache, so a stale HTTP-cache entry for any shell file
  // would keep getting baked into every new cache version forever. Forcing a
  // real network hit here means a version bump always picks up real changes.
  // ...and check response.ok, which cache.addAll() used to do for us. fetch()
  // only rejects on NETWORK failure, so without this a 404 from a half-finished
  // deploy — or a captive portal answering 200 text/html for every URL, which is
  // exactly what customer and hotel Wi-Fi does — gets cached AS app.js. Install
  // would report success, activate would delete the known-good old cache, and
  // every phone would be left serving a portal page as the app, offline, until
  // the next version bump AND clean signal. Throwing here fails the install, so
  // the previous version stays in place.
  const fetchChecked = (url) => fetch(url, { cache: "reload" }).then((response) => {
    if (!response.ok) throw new Error("precache " + url + " -> HTTP " + response.status);
    const type = response.headers.get("content-type") || "";
    // A portal can also answer 200 — reject HTML standing in for code/data/libraries.
    if (/\.(js|json|css|wasm|gz|pdf|png)$/.test(url) && /text\/html/i.test(type)) {
      throw new Error("precache " + url + " -> got HTML, looks like a captive portal");
    }
    return response;
  });
  event.waitUntil((async () => {
    // Library files: keep what this phone already has. Anything missing comes
    // from the previous version's cache if it is still there (the one-time move
    // from the old all-in-one cache), else from the network.
    const stat = await caches.open(STATIC_CACHE);
    await Promise.all(STATIC_FILES.map(async (url) => {
      if (await stat.match(url)) return;
      const old = await caches.match(url);
      await stat.put(url, old && old.ok ? old : await fetchChecked(url));
    }));
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL.map((url) => fetchChecked(url).then((response) => cache.put(url, response))));
  })());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME && n !== STATIC_CACHE).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Cache-first for app shell, so the tool works with zero signal in the field.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  // Manual PDFs are on-demand: the app stores them in IndexedDB itself, so
  // caching them here too would double the storage.
  //
  // This used to test `path.endsWith(".pdf")`, which only caught the 87 manuals
  // on raw.githubusercontent.com. The other 209 are Lennox Scene7 assets with
  // EXTENSIONLESS paths (/is/content/lennoxinternational/100230-01-000), so every
  // Lennox manual was being stored twice — once here and once in IndexedDB — and
  // "Remove download" only clears IndexedDB, so the space never actually came
  // back. Cache-first also meant a re-download silently served the stale copy.
  // Skip by ORIGIN instead: anything not served from this app is not app shell.
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  // v285: but NOT the manual list itself (seed-index.js is in APP_SHELL). The
  // folder-wide skip sent it to the network on every open - ~60% of startup on
  // good wifi, a hang on weak signal, and an empty Manuals list offline once the
  // browser's own cache had expired.
  if (url.pathname.includes("/manuals-seed/") && !url.pathname.endsWith("/seed-index.js")) return;
  // Ask Anything's library page text (manuals-text/*.json) is fetched at run
  // time from the Cloudflare R2 manuals Worker (brackett-manuals.andy-4ae.workers.dev,
  // since v267; raw.githubusercontent.com before) — cross-origin, so the check above
  // already leaves it alone — and the app caches it in its own IndexedDB with
  // an LRU cap. Never cache it here as well, even if it is ever served from
  // this origin.
  if (url.pathname.includes("/manuals-text/")) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          // Same reasoning as install: never cache an error or a portal page.
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() =>
          // Offline with nothing cached for this exact URL. The old code did
          // `.catch(() => cached)` here, but `cached` is always undefined on
          // this branch — a truthy one already returned above — so respondWith
          // got undefined and the browser reported a network error anyway.
          // For a navigation, fall back to the app shell so the tech lands in
          // the app instead of a browser error page; query strings and deep
          // links included.
          event.request.mode === "navigate"
            ? caches.match("./index.html").then((shell) => shell || Response.error())
            : Response.error()
        );
    })
  );
});
