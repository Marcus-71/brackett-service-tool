const CACHE_NAME = "bfc-cache-v431";
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
  "./daikin-sensors.js",
  "./brand-sensors.js",
  "./sensors.js",
  "./toolbox.js",
  "./thermostats.js",
  "./generators.js",
  "./kohler-gens.js",
  "./weather.js",
  "./maint.js",
  "./bulletins.js",
  "./inventory.js",
  "./dchecker/index.html",
  "./guides/daikin-checker-guide.html",
  "./manuals-seed/seed-index.js",
  "./manifest.json",
];
// Update without downloading the whole app again (speed audit 2026-11-12, finding 2: every update
// fetched all 6.4 MB although the median version changes 0.83 MB; on slow 4G the Updating screen
// gave up before the download ended). SHELL_HASHES is the SHA-256 (first 20 hex digits) of each
// APP_SHELL file exactly as published, written by  node tools/shell-hashes.js  (it reads the
// files from the git index, i.e. the bytes the web host serves - not the CRLF working copies).
// Install copies a file from the previous version's cache instead of downloading it ONLY when
// all of these hold; in every other case it downloads the file as it always did:
//   1. this list names a hash for the file,
//   2. the bytes in the old cache hash to exactly that value (checked here, on the phone),
//   3. the app.js just downloaded for THIS version hashes to the value the list holds for it.
// Rule 3 is the guard against a list nobody regenerated: every version changes app.js
// (APP_VERSION), so a list left over from an earlier version never matches and nothing is reused.
// app.js itself is always downloaded. An empty list ({}) or one left over from an earlier version
// simply means "download everything", exactly as before. RULE: the list is regenerated as the
// LAST step before the commit, after every other file is staged. The one unsafe order is
// regenerate -> change another app file -> commit without regenerating: phones would keep their
// old copy of that file.  node tools/shell-hashes.js --check  exits 1 for exactly that state
// (and passes a matching or a merely left-over list); run it as a publish gate / pre-commit hook.
// SHELL_HASHES:BEGIN
const SHELL_HASHES = {
  "./index.html": "54a507c35f50011a6926",
  "./style.css": "d911643a8847295e3e61",
  "./app.js": "94382dbd07e032646e76",
  "./pt-data.js": "683d0d877945d72a0b2a",
  "./data.js": "594beacf3327240e2bcb",
  "./symptoms.js": "3bb3d682db577da6b48e",
  "./unit-scenarios.js": "daeb283e183406a1d4cb",
  "./followups.js": "b1ce8efd013925eff19b",
  "./charging-charts.js": "daec2cb65dd460da0f69",
  "./daikin-sensors.js": "9e76c4d5d59b3b9bc604",
  "./brand-sensors.js": "4f42d941cfd6f71d07dc",
  "./sensors.js": "a5d19473d6fe4358521e",
  "./toolbox.js": "c67328fc6c22100d95ec",
  "./thermostats.js": "19e10a6d11936eb4edfd",
  "./generators.js": "eb5e73ff29d7b0ebd4c7",
  "./kohler-gens.js": "e16661411a2fbac2b479",
  "./weather.js": "5b9215e305c303ac986f",
  "./maint.js": "9354eceec5a7de679f99",
  "./bulletins.js": "467f05732130ca6af440",
  "./inventory.js": "5cfc7dc549d17149b4a9",
  "./dchecker/index.html": "2487e203cbdae9ed9c1d",
  "./guides/daikin-checker-guide.html": "0d7a518082b6f948041a",
  "./manuals-seed/seed-index.js": "573f246fe4f9af5313c9",
  "./manifest.json": "15eb1fe115900d4110be",
};
// SHELL_HASHES:END
const shellHash = async (bytes) => {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  let s = "";
  for (let i = 0; i < 10; i++) s += d[i].toString(16).padStart(2, "0");
  return s;
};
// url -> Response from another version's cache (newest first), for every APP_SHELL file whose
// cached bytes hash to the value SHELL_HASHES publishes. app.js is never in it.
async function reusePlan() {
  const plan = new Map();
  if (!self.crypto || !crypto.subtle || !SHELL_HASHES["./app.js"]) return plan;
  const olds = (await caches.keys())
    .map((n) => [n, +((/^bfc-cache-v(\d+)$/.exec(n) || [])[1] || 0)])
    .filter((x) => x[1] && x[0] !== CACHE_NAME)
    .sort((a, b) => b[1] - a[1]);
  for (const url of APP_SHELL) {
    if (url === "./app.js") continue;
    const want = SHELL_HASHES[url === "./" ? "./index.html" : url];   // "./" is index.html
    if (!want) continue;
    for (const [name] of olds) {   // normally exactly one: the version this phone runs now
      try {
        const hit = await (await caches.open(name)).match(url);
        if (!hit || hit.status !== 200) continue;
        if ((await shellHash(await hit.clone().arrayBuffer())) === want) { plan.set(url, hit); break; }
      } catch (e) {}
    }
  }
  return plan;
}

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
    // Files the previous version's cache already holds byte-for-byte as this version publishes
    // them (see SHELL_HASHES above). Any doubt, any error -> not in the plan -> downloaded.
    // Worked out while app.js is already downloading, so it costs the update no time.
    const reusing = reusePlan().catch(() => new Map());
    const cache = await caches.open(CACHE_NAME);
    // Tell the open app how the download is going, so its Updating screen can give up when
    // NOTHING has arrived for a while rather than at a fixed time. Best effort only.
    const progress = { files: 0, total: APP_SHELL.length, bytes: 0, reused: 0, last: 0 };
    const report = (force) => {
      const now = Date.now();
      if (!force && now - progress.last < 700) return;
      progress.last = now;
      try {
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((pages) => pages.forEach((c) => {
          try { c.postMessage({ type: "bfc-update-progress", version: CACHE_NAME.replace("bfc-cache-", ""), files: progress.files, total: progress.total, bytes: progress.bytes, reused: progress.reused }); } catch (e) {}
        })).catch(() => {});
      } catch (e) {}
    };
    const count = (response) => {
      // Reads a COPY of the body only to count bytes as they arrive; the original goes to the cache.
      try {
        const reader = response.clone().body.getReader();
        const pump = () => reader.read().then((r) => { if (r.done) return; progress.bytes += r.value.length; report(false); return pump(); });
        pump().catch(() => {});
      } catch (e) {}
    };
    // Settles once this version's app.js is in hand: true = its hash is the one SHELL_HASHES
    // holds, so the list was made for exactly this version and reuse is allowed.
    let listProven, failed = false;
    const listOk = new Promise((resolve) => { listProven = resolve; });
    const download = (url) => fetchChecked(url).then(async (response) => {
      if (url === "./app.js") {
        // v336 (audit CODE-03b): right after a publish the web host can still hand out the previous
        // app.js for a few minutes. Storing that under this version's name would leave the phone
        // running the old version for good (and showing the Updating screen on every open). Refuse
        // it: the install fails, the previous version stays, and the next check tries again.
        const bytes = await response.clone().arrayBuffer();
        const m = new TextDecoder().decode(bytes).match(/const APP_VERSION = "([^"]+)"/);
        if (m && m[1] !== CACHE_NAME.replace("bfc-cache-", "")) throw new Error("precache app.js is " + m[1] + ", not " + CACHE_NAME + " - old copy from the web host, try later");
        const mine = SHELL_HASHES["./app.js"] ? await shellHash(bytes).catch(() => "") : "";
        listProven(!!mine && mine === SHELL_HASHES["./app.js"]);
      }
      count(response);
      await cache.put(url, response);
      progress.files++; report(true);
    });
    try {
      await Promise.all(APP_SHELL.map(async (url) => {
        if (url === "./app.js") return download(url);   // always downloaded: it proves the version and the list
        const old = (await reusing).get(url);
        if (!old) return download(url);
        const proven = await listOk;
        if (failed) return;                    // app.js never arrived: this install is over
        if (!proven) return download(url);     // list not made for this version: download as always
        try { await cache.put(url, old); } catch (e) { return download(url); }
        progress.files++; progress.reused++; report(true);
      }));
    } catch (err) {
      failed = true; listProven(false);   // release the files still waiting on app.js; they stop
      // Don't leave a half-filled cache under this version's name behind (the fetch handler
      // searches every cache); the next install starts clean.
      await caches.delete(CACHE_NAME).catch(() => {});
      throw err;
    }
  })());
  self.skipWaiting();
});

// Versions before v303 have no forced update: their page only offers a reload, so a tech could keep
// working on the old code for the rest of the day. When this worker replaces one of them it reloads
// the open app itself (Andy 2026-10-20: "so they dont have a choice"). Newer pages reload on their
// own at a safe moment, so they are left alone.
const FORCED_UPDATE_SINCE = 303;
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = (await caches.keys()).filter((n) => n !== CACHE_NAME && n !== STATIC_CACHE);
    const oldVersions = names.map((n) => +((/^bfc-cache-v(\d+)$/.exec(n) || [])[1] || 0)).filter(Boolean);
    await Promise.all(names.map((n) => caches.delete(n)));
    await self.clients.claim();
    // NOT awaited: the reload's own request waits until this worker has finished activating, so
    // waiting on it here would deadlock (the page hung on the old version in the v273 test).
    if (oldVersions.length && Math.min(...oldVersions) < FORCED_UPDATE_SINCE) {
      self.clients.matchAll({ type: "window" }).then((pages) => pages.forEach((c) => c.navigate(c.url).catch(() => {})));
    }
  })());
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
  // v315: the app reads sw.js itself to learn the newest version; never answer that
  // from (or store it in) this cache, or the check reads the old version forever.
  if (url.pathname.endsWith("/sw.js")) return;
  // v345: look only in THIS version's caches. caches.match() searches every cache, oldest first,
  // and the old version's cache is still there for a moment while activate deletes it - so the
  // forced reload right after an update got the OLD app.js back and the phone stayed old
  // (Cameron v304 / Joe v308 10-19/20: "forced update" then reopened on the same version;
  // reproduced in scratch\sw-race\e2e-old-phone.js).
  const ownMatch = (req) => caches.open(CACHE_NAME).then((c) => c.match(req))
    .then((hit) => hit || caches.open(STATIC_CACHE).then((c) => c.match(req)));
  event.respondWith(
    ownMatch(event.request).then((cached) => {
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
            ? ownMatch("./index.html").then((shell) => shell || Response.error())
            : Response.error()
        );
    })
  );
});
