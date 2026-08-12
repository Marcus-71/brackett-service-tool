const CACHE_NAME = "bfc-cache-v104";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./pt-data.js",
  "./data.js",
  "./symptoms.js",
  "./followups.js",
  "./charging-charts.js",
  "./toolbox.js",
  "./manuals-seed/seed-index.js",
  "./manifest.json",
  "./vendor/tesseract.min.js",
  "./vendor/worker.min.js",
  "./vendor/tesseract-core.wasm.js",
  "./vendor/tesseract-core-simd.wasm.js",
  "./vendor/tesseract-core-lstm.wasm.js",
  "./vendor/tesseract-core-simd-lstm.wasm.js",
  "./vendor/eng.traineddata.gz",
  "./pdfjs/pdf.min.js",
  "./pdfjs/pdf.worker.min.js",
  "./icons/brackett-logo.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_SHELL.map((url) =>
        fetch(url, { cache: "reload" }).then((response) => {
          if (!response.ok) throw new Error("precache " + url + " -> HTTP " + response.status);
          const type = response.headers.get("content-type") || "";
          // A portal can also answer 200 — reject HTML standing in for code/data.
          if (/\.(js|json|css)$/.test(url) && /text\/html/i.test(type)) {
            throw new Error("precache " + url + " -> got HTML, looks like a captive portal");
          }
          return cache.put(url, response);
        })
      ))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
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
  if (url.pathname.includes("/manuals-seed/")) return;
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
