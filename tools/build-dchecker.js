// Builds dchecker/index.html (the D-Checker Cycle Viewer) from Kenny's repo
// (github.com/KennyJ18code/dchecker) for use INSIDE this app.
//
//   node tools/build-dchecker.js "D:/daikin tool/hvac-dchecker"
//
// Same build as that repo's README (template.html + sample.csv), plus three
// changes so it lives safely under our origin:
//  - its own service worker is NOT registered. Its activate step deletes every
//    cache on the origin, which would wipe bfc-cache-* and take the whole
//    Service Tool offline copy with it. Our sw.js precaches dchecker/index.html.
//  - its manifest / apple-touch links are dropped (it is not a separate
//    installable app here); the favicon points at our icon.
//  - the build fails if the viewer ever carries a service worker
//    register/unregister, a Cache Storage or storage-clearing call, or an
//    outside sync endpoint (Kenny's upstream has Supabase fleet sync; the
//    Brackett branch leaves it out).
//  - nothing else in the viewer is touched. Build from the checkout's
//    brackett-plus-latest branch (ours + Kenny's features through v72, no shop-library upload), not Kenny's main.
const fs = require("fs");
const path = require("path");

const src = process.argv[2];
if (!src) { console.error("usage: node tools/build-dchecker.js <path to hvac-dchecker checkout>"); process.exit(1); }

let html = fs.readFileSync(path.join(src, "template.html"), "utf8");
const csv = fs.readFileSync(path.join(src, "sample.csv"), "utf8");

// `from` may be a string or a RegExp (the repo is checked out with CRLF endings).
function swap(from, to, label) {
  const found = typeof from === "string" ? html.includes(from) : from.test(html);
  if (!found) { console.error("build-dchecker: could not find " + label + " - the viewer changed, update this script"); process.exit(1); }
  html = html.replace(from, () => to);
}

swap("__SAMPLE_CSV__", csv, "__SAMPLE_CSV__ placeholder");
swap(/<link rel="manifest" href="manifest\.webmanifest">\r?\n/, "", "manifest link");
swap(/<link rel="apple-touch-icon"[^>]*>\r?\n/, "", "apple-touch-icon link");
// the viewer may carry several favicon links (v51: svg + png); the first becomes ours, the rest go
swap(/<link rel="icon"[^>]*>/, '<link rel="icon" href="../icons/icon-192.png">', "favicon link");
html = html.replace(/<link rel="icon"(?! href="\.\.\/icons\/icon-192\.png">)[^>]*>\r?\n/g, "");
swap("navigator.serviceWorker.register('sw.js')", "Promise.resolve() /* SW disabled inside Brackett Service Tool - see tools/build-dchecker.js */", "service worker registration");

// Anything that could wipe the Service Tool's own caches / storage, register a
// worker, or talk to an outside sync service must not ship inside the app.
for (const [re, what] of [
  [/serviceWorker\.register/, "a service worker registration"],
  [/serviceWorker[\s\S]{0,40}unregister|\.unregister\(/, "a service worker unregister call"],
  [/caches\.(delete|keys|open)\b/, "a Cache Storage call (caches.delete/keys/open)"],
  [/indexedDB\.deleteDatabase|localStorage\.clear\(|sessionStorage\.clear\(/, "a storage-clearing call"],
  [/<link rel="(manifest|apple-touch-icon)"/, "a manifest / apple-touch link"],
  [/supabase\.co|\/rest\/v1\/|\/auth\/v1\//, "an outside sync endpoint (Supabase)"],
]) if (re.test(html)) { console.error("build-dchecker: " + what + " is present - neutralise it before shipping"); process.exit(1); }

const out = path.join(__dirname, "..", "dchecker", "index.html");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log("wrote " + out + " (" + html.length + " bytes)");
