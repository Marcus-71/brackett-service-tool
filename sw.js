const CACHE_NAME = "bfc-cache-v59";
const APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./pt-data.js",
  "./data.js",
  "./symptoms.js",
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
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_SHELL.map((url) =>
        fetch(url, { cache: "reload" }).then((response) => cache.put(url, response))
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
  // caching them here too would double the storage. Let them hit the network.
  const path = new URL(event.request.url).pathname;
  if (path.includes("/manuals-seed/") && path.endsWith(".pdf")) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
