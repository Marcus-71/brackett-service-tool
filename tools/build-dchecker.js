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
//  - nothing else in the viewer is touched, so re-running this after Kenny
//    pushes an update picks the update up.
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
swap(/<link rel="apple-touch-icon" href="icons\/apple-touch-icon\.png">\r?\n/, "", "apple-touch-icon link");
swap('<link rel="icon" href="icons/icon-192.png">', '<link rel="icon" href="../icons/icon-192.png">', "favicon link");
swap("navigator.serviceWorker.register('sw.js')", "Promise.resolve() /* SW disabled inside Brackett Service Tool - see tools/build-dchecker.js */", "service worker registration");

if (/serviceWorker\.register/.test(html)) { console.error("build-dchecker: a service worker registration is still present"); process.exit(1); }

const out = path.join(__dirname, "..", "dchecker", "index.html");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log("wrote " + out + " (" + html.length + " bytes)");
