// Builds dchecker/index.html (the D-Checker Cycle Viewer) from Kenny's repo
// (github.com/KennyJ18code/dchecker) for use INSIDE this app.
//
//   node tools/build-dchecker.js "D:/daikin tool/hvac-dchecker" ["D:/dchecker/library-2026-10-12" ...]
//
// The first argument is the viewer checkout; any further arguments are folders
// of extra recordings (plain decoder .csv or Daikin app .tgz) for the Examples
// picker, e.g. the copies Andy downloaded from Kenny's shop library. Without
// them the picker still gets whatever EXAMPLES below finds in samples/.
//
// Build from the checkout's brackett-plus-v105 branch: our viewer (Service Tool
// hand-off by postMessage with #wait, Daikin .tgz opener, What to check card,
// live feed engine, Start diagnosis, saved Route checklists, the Examples
// picker) plus Kenny's on-device features through his v105 (service-manual
// rules, his decoder for every .tgz, the Route tab with multi-split routes,
// Route evidence, the printable sheet). Left out of that branch: his Supabase
// shop library (uploads, sign-in, Library tab, usage events), short route links
// (#r=) and the QR code that carried them, call notes, and the required
// customer name / address job-details gate. Never build from Kenny's main.
//
// Same build as that repo's README (template.html + sample.csv), plus:
//  - its own service worker is NOT registered. Its activate step deletes every
//    cache on the origin, which would wipe bfc-cache-* and take the whole
//    Service Tool offline copy with it. Our sw.js precaches dchecker/index.html.
//  - its manifest / apple-touch links are dropped (it is not a separate
//    installable app here); the favicon points at our icon.
//  - the example recordings (#demo-recs): every recording in samples/ and the
//    extra folders is read for its start and end time; one job saved twice (the
//    phone's .tgz and a PC .csv export, whatever the file names) is one
//    recording and ships once, as its smaller file. EXAMPLES below picks which
//    recordings ship, by start time, with the model and note a tech sees
//    (written from what the viewer shows when each is opened). A new recording
//    Kenny adds to samples/ ships too, under its file name, with a warning; a
//    recording only in an extra folder ships only when EXAMPLES names it.
//    Shipped files are renamed model + date: no tech, customer or company name
//    travels in a file name. Each is stored gzipped + base64; a .tgz is
//    repacked with only datalabel.txt, header.txt and the .log files
//    (customer.txt, graph.txt and mapping.txt never ship).
//  - the build fails if the viewer ever carries a service worker
//    register/unregister, a Cache Storage or storage-clearing call, an outside
//    sync endpoint (Supabase), or if an example carries a customer.txt or one of
//    the known tech / company names (in its name, label or contents).
//  - nothing else in the viewer is touched.
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const src = process.argv[2];
if (!src) { console.error("usage: node tools/build-dchecker.js <path to hvac-dchecker checkout> [extra recordings folder ...]"); process.exit(1); }
const extraDirs = process.argv.slice(3);

let html = fs.readFileSync(path.join(src, "template.html"), "utf8");
const csv = fs.readFileSync(path.join(src, "sample.csv"), "utf8");

// `from` may be a string or a RegExp (the repo is checked out with CRLF endings).
function swap(from, to, label) {
  const found = typeof from === "string" ? html.includes(from) : from.test(html);
  if (!found) { console.error("build-dchecker: could not find " + label + " - the viewer changed, update this script"); process.exit(1); }
  html = html.replace(from, () => to);
}

// ---- example recordings ----
// The twelve a tech can pick, in this order, each matched by the recording's first reading (local time, to the minute).
// model / note: what the viewer identifies (Cycle tab system line, Route tab) and what the recording shows.
const EXAMPLES = [
  { start: "2025-11-26 10:24", id: "DZ6VS_2025-11-26", model: "Daikin FIT R-410A heat pump, DZ6VS", note: "Heating, 69 min: indoor code E7 and outdoor retry codes logged, then a steady 120 rps run" },
  { start: "2026-02-11 08:54", id: "DZ6VS_2026-02-11", model: "Daikin FIT R-410A heat pump, DZ6VS", note: "Heating, 61 min: outdoor code 90 logged (not in the service manual's code table); steady 120 rps" },
  { start: "2026-09-23 11:51", id: "ASZS6S_2026-09-23", model: "Amana ASZS6S heat pump (R-410A, FIT platform)", note: "Cooling and heating, 47 min: cooling readings outside the manual's analysis chart (discharge superheat high, high pressure low); chart route" },
  { start: "2026-09-16 13:31", id: "GVZC-AVZC20_2026-09-16", model: "Goodman / Amana GVZC / AVZC20 heat pump (R-410A)", note: "Cooling, 45 min: discharge superheat low at speed, liquid returning to the compressor; chart route" },
  { start: "2026-09-21 11:29", id: "GZV7S-AZV7_2026-09-21", model: "Goodman / Amana GZV7S / AZV7 heat pump (R-32, FIT platform)", note: "Cooling, 59 min: normal run at a steady 32 rps (the log has gaps)" },
  { start: "2026-09-21 10:36", id: "GXV7S-AXV7_2026-09-21", model: "Goodman / Amana GXV7S / AXV7 air conditioner (R-32, FIT platform)", note: "Cooling, 47 min: normal run at a steady 32 rps (the log has gaps)" },
  { start: "2026-06-15 14:02", id: "FIT-R32_2026-06-15", model: "Daikin FIT R-32 heat pump (DC6VS / DH6VSA family)", note: "Cooling, 31 min: failed indoor gas-pipe thermistor drives the EEV wide open and floods the compressor (confirmed by the repair)" },
  { start: "2026-07-01 08:30", id: "DH9VS_2026-07-01", model: "Daikin FIT R-32 DH9VS double-fan heat pump", note: "Cooling, 59 min: compressor running hotter than its compression explains; suction dropping as the valve opens" },
  { start: "2025-08-05 14:33", id: "DH9VS_2025-08-05", model: "Daikin FIT R-32 DH9VS double-fan heat pump", note: "Cooling, 50 min: short cycling, 4 of 5 runs" },
  { start: "2026-09-19 10:19", id: "Multi-split_2026-09-19", model: "Daikin multi-split, 3 rooms (outdoor model not settled by the log)", note: "Cooling, 10.5 h without stopping: normal run; the Route tab offers the manual's problem checklist" },
  { start: "2026-04-07 10:11", id: "Multi-split_2026-04-07", model: "Daikin multi-split, 3 rooms (MXM/MXT large or MXS-T/MXL-T)", note: "Cooling then heating, 2.5 h: a satisfied room keeps its fan on over a warm coil; heating peak-cut from high head pressure" },
  { start: "2026-02-27 12:42", id: "Multi-split_2026-02-27", model: "Daikin multi-split, 3 rooms (outdoor model not settled by the log)", note: "Heating, 41 min: room A transmission faults logged" },
];
// known recordings left out of the twelve (so they are not mistaken for new ones): two more normal runs and a third peak-cut multi-split
const NOT_SHIPPED = ["2026-10-02 10:26", "2026-09-22 18:34", "2026-03-26 09:46"];
// tech and company names that must never ship in an example (file name, label or contents)
const PRIVATE_NAMES = /\b(tyler|bill|john|mike|kirk|kenny|crown|faith)\b/i;

function untarBuf(buf) {   // -> [{name, data}]
  const out = []; let p = 0;
  while (p + 512 <= buf.length) {
    const name = buf.subarray(p, p + 100).toString("latin1").replace(/\0.*$/s, ""); if (!name) break;
    const size = parseInt(buf.subarray(p + 124, p + 136).toString("latin1").replace(/\0.*$/s, "").trim() || "0", 8);
    const type = String.fromCharCode(buf[p + 156]);
    const prefix = buf.subarray(p + 345, p + 500).toString("latin1").replace(/\0.*$/s, "");
    p += 512;
    if (type === "0" || type === "\0") out.push({ name: (prefix ? prefix + "/" : "") + name, data: buf.subarray(p, p + size) });
    p += Math.ceil(size / 512) * 512;
  }
  return out;
}
function tarBuf(files) {   // plain ustar, files only
  const parts = [];
  for (const f of files) {
    const h = Buffer.alloc(512);
    h.write(f.name.slice(0, 99), 0, "latin1");
    h.write("0000644\0", 100, "latin1"); h.write("0000000\0", 108, "latin1"); h.write("0000000\0", 116, "latin1");
    h.write(f.data.length.toString(8).padStart(11, "0") + "\0", 124, "latin1");
    h.write("00000000000\0", 136, "latin1");
    h.write("        ", 148, "latin1"); h.write("0", 156, "latin1"); h.write("ustar\0" + "00", 257, "latin1");
    let sum = 0; for (const b of h) sum += b; h.write(sum.toString(8).padStart(6, "0") + "\0 ", 148, "latin1");
    parts.push(h, f.data, Buffer.alloc((512 - (f.data.length % 512)) % 512));
  }
  parts.push(Buffer.alloc(1024));
  return Buffer.concat(parts);
}
// first and last reading of a recording (local clock time, compared as if UTC)
const ms = s => s ? Date.UTC(+s[1], +s[2] - 1, +s[3], +s[4], +s[5], +(s[6] || 0)) : null;
function spanOf(kind, raw) {
  if (kind === "tgz") {
    const stamps = [];
    for (const m of untarBuf(zlib.gunzipSync(raw)).filter(m => /\.log$/i.test(m.name))) {
      const u = m.data; let p = 48;
      while (p + 14 <= u.length) { const ts = u.subarray(p, p + 14).toString("latin1"); if (!/^\d{14}$/.test(ts)) break; stamps.push(ts); p += 14;
        while (p + 2 <= u.length) { if (u[p] === 0xff && u[p + 1] === 0xff) { p += 2; break; } p += 3 + u[p + 2]; } }
    }
    stamps.sort(); const re = /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/;
    return stamps.length ? [ms(re.exec(stamps[0])), ms(re.exec(stamps[stamps.length - 1]))] : null;
  }
  const rows = raw.toString("utf8").replace(/^\uFEFF/, "").trim().split(/\r?\n/).slice(1).map(l => l.split(",")[0]);
  const t = c => { let m = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d\d)(?::(\d\d))?/.exec(c); if (m) return ms([0, m[3], m[1], m[2], m[4], m[5], m[6]]);
    m = /^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2}) (\d{1,2}):(\d\d)(?::(\d\d))?/.exec(c); return m ? ms(m) : null; };
  const a = t(rows[0] || ""), b = t(rows[rows.length - 1] || "");
  return a != null && b != null ? [a, b] : null;
}
const startMs = s => ms(/^(\d{4})-(\d\d)-(\d\d) (\d\d):(\d\d)$/.exec(s));
const near = (a, b) => a != null && b != null && Math.abs(a - b) <= 120e3;
const sameRec = (x, y) => x.span && y.span && near(x.span[0], y.span[0]) && near(x.span[1], y.span[1]);
const recs = [];
for (const [dir, isSamples] of [[path.join(src, "samples"), true], ...extraDirs.map(d => [d, false])]) {
  if (!fs.existsSync(dir)) { console.warn("build-dchecker: WARNING no folder " + dir); continue; }
  for (const f of fs.readdirSync(dir).sort()) {
    const m = /^(.+)\.(csv|tgz)$/i.exec(f); if (!m) continue;
    const raw = fs.readFileSync(path.join(dir, f)), kind = m[2].toLowerCase();
    let span = null; try { span = spanOf(kind, raw); } catch (e) { console.warn("build-dchecker: could not read the times in " + path.join(dir, f) + ": " + e.message); }
    recs.push({ path: path.join(dir, f), file: f, base: m[1], kind, size: raw.length, span, isSamples });
  }
}
const groups = [];
for (const r of recs) { const g = groups.find(g => g.some(x => (x.isSamples && r.isSamples && x.base === r.base) || sameRec(x, r))); if (g) g.push(r); else groups.push([r]); }
const firstSpan = (() => { try { return spanOf("csv", Buffer.from(csv)); } catch (e) { return null; } })();   // the built-in demo
const plan = [];
for (const ex of EXAMPLES) {
  const g = groups.find(g => g.some(r => r.span && near(r.span[0], startMs(ex.start))));
  if (!g) { console.warn("build-dchecker: WARNING example " + ex.id + " (recording starting " + ex.start + ") not found - pass the folder that holds it"); continue; }
  plan.push({ g, ex });
}
for (const g of groups) {
  if (plan.some(p => p.g === g) || g.some(r => r.span && NOT_SHIPPED.some(s => near(r.span[0], startMs(s))))) continue;
  const s = g.find(r => r.isSamples);
  if (s) { console.warn("build-dchecker: WARNING new recording samples/" + s.file + " ships under its file name; add it to EXAMPLES with a label"); plan.push({ g, ex: { id: s.base, model: s.base, note: "Example recording" } }); }
  else console.log("skipped (not in EXAMPLES): a recording starting " + (g[0].span ? new Date(g[0].span[0]).toISOString().slice(0, 16).replace("T", " ") : "?"));
}
const demos = [];
for (const { g, ex } of plan) {
  const pick = g.slice().sort((a, b) => a.size - b.size)[0];   // the smaller file of the recording
  const raw = fs.readFileSync(pick.path);
  let packed, text;
  if (pick.kind === "tgz") {
    const keep = untarBuf(zlib.gunzipSync(raw)).filter(m => /(^|\/)(datalabel\.txt|header\.txt|[^/]+\.log)$/i.test(m.name));
    if (!keep.some(m => /datalabel\.txt$/i.test(m.name)) || !keep.some(m => /\.log$/i.test(m.name))) { console.error("build-dchecker: " + pick.file + " has no datalabel.txt + .log"); process.exit(1); }
    packed = zlib.gzipSync(tarBuf(keep), { level: 9 }); text = keep.map(m => m.name + "\n" + m.data.toString("latin1")).join("\n");
  } else { packed = zlib.gzipSync(raw, { level: 9 }); text = raw.toString("utf8"); }
  const first = firstSpan && sameRec({ span: firstSpan }, pick);
  const d = { id: ex.id, file: ex.id + "." + pick.kind, kind: pick.kind, model: ex.model, note: ex.note + (first ? " (the demo the viewer opens first)" : ""), data: packed.toString("base64") };
  if (PRIVATE_NAMES.test([d.id, d.file, d.model, d.note].join(" ")) || PRIVATE_NAMES.test(text)) { console.error("build-dchecker: a tech / company name is in example " + d.id + " - it must not ship"); process.exit(1); }
  if (pick.kind === "tgz" && untarBuf(zlib.gunzipSync(packed)).some(m => /customer\.txt$/i.test(m.name))) { console.error("build-dchecker: customer.txt left in " + d.id); process.exit(1); }
  demos.push(d);
  console.log("example " + String(demos.length).padStart(2) + ": " + d.file + " <- " + (pick.isSamples ? "samples/" + pick.file : "extra folder") + " (" + pick.size + " bytes, " + packed.length + " packed)" + (g.length > 1 ? "; same recording also in " + (g.length - 1) + " other file(s)" : "") + (first ? "; also the built-in sample.csv" : ""));
}

swap("__SAMPLE_CSV__", csv, "__SAMPLE_CSV__ placeholder");
swap("__DEMO_RECS__", JSON.stringify(demos).replace(/</g, "\\u003c"), "__DEMO_RECS__ placeholder (example recordings)");
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
  [/__DEMO_RECS__|__SAMPLE_CSV__/, "an unfilled placeholder"],
]) if (re.test(html)) { console.error("build-dchecker: " + what + " is present - neutralise it before shipping"); process.exit(1); }

const out = path.join(__dirname, "..", "dchecker", "index.html");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
const bytes = Buffer.byteLength(html);
console.log("wrote " + out + " (" + bytes + " bytes; " + demos.length + " example recordings)" + (bytes > 3e6 ? " - WARNING over 3 MB, and every phone precaches it" : ""));
