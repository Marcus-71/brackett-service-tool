// Builds unit-scenarios.js (UNIT_SCENARIOS) from the per-brand research files.
//   node tools/build-unit-scenarios.js <dir with *.json> [more dirs/files...]
// Each entry: {id, unit (library model regex as a string), brand, equipment,
// title, summary, steps[], safety?, source ("<manual file> p.N, p.M"), confidence}.
// The source's manual file must be in manuals-seed/seed-index.js; it becomes
// `manual` (seed basename) + `pages`, and the shown source uses the seed title.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const args = process.argv.slice(2);
if (!args.length) { console.error("usage: node tools/build-unit-scenarios.js <dir|file.json>..."); process.exit(1); }

const seedCtx = {};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "manuals-seed", "seed-index.js"), "utf8") + ";this.MANUAL_SEEDS=MANUAL_SEEDS;", seedCtx);
const seeds = new Map(seedCtx.MANUAL_SEEDS.map(s => [s.file.split("/").pop().replace(/\.pdf$/i, "").toLowerCase(), s]));

const symCtx = {};
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "symptoms.js"), "utf8") + ";this.SYMPTOMS=SYMPTOMS;", symCtx);
const baseIds = new Set(symCtx.SYMPTOMS.map(s => s.id));
const equipOk = new Set(symCtx.SYMPTOMS.map(s => s.equipment));
const appText = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");

const files = [];
for (const a of args) {
  if (fs.statSync(a).isDirectory()) for (const f of fs.readdirSync(a)) { if (/\.json$/i.test(f)) files.push(path.join(a, f)); }
  else files.push(a);
}

const out = [], errors = [], warnings = [], seen = new Set();
for (const f of files) {
  let list;
  try { list = JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { errors.push(f + ": bad JSON " + e.message); continue; }
  if (!Array.isArray(list)) { errors.push(f + ": not an array"); continue; }
  for (const s of list) {
    const where = path.basename(f) + " " + (s.id || "(no id)");
    const bad = (m) => errors.push(where + ": " + m);
    if (!s.id || !/^u-[a-z0-9-]+$/.test(s.id)) { bad("id must look like u-brand-family-slug"); continue; }
    if (seen.has(s.id) || baseIds.has(s.id)) { bad("duplicate id"); continue; }
    seen.add(s.id);
    let re;
    try { re = new RegExp(s.unit); } catch (e) { bad("unit regex does not compile"); continue; }
    if (!appText.includes("/" + s.unit + "/")) warnings.push(where + ": unit " + s.unit + " is not a library pattern as written");
    if (!equipOk.has(s.equipment)) bad("equipment '" + s.equipment + "' is not one the app uses");
    if (!s.title || !s.summary) bad("needs title and summary");
    if (!Array.isArray(s.steps) || s.steps.length < 2) bad("needs at least 2 steps");
    if (/\b(tyler|bill|john|mike|kirk|kenny|crown|faith)\b/i.test(JSON.stringify(s))) bad("contains a private name");
    // Manual + pages from the source line.
    const src = String(s.source || "");
    const fileTok = (src.match(/[A-Za-z0-9][A-Za-z0-9._-]*?(?=\.pdf|\.json|\s+p\.|\s*$|,)/) || [""])[0].toLowerCase();
    const seed = seeds.get(fileTok);
    // A manual that is not in the library (a dealer-only document, or one still
    // waiting in the triage inbox) is cited by name with no Open button.
    if (!seed) warnings.push(where + ": source manual '" + fileTok + "' is not in the library - shown without a link");
    const rest = src.slice(src.toLowerCase().indexOf(fileTok) + fileTok.length);
    const pages = [...new Set([...rest.matchAll(/p(?:p|ages?|g)?\.?\s*(\d+)(?:\s*[-–]\s*(\d+))?/gi)].map(m => Number(m[1])))].filter(n => n > 0 && n < 2000);
    if (!pages.length) warnings.push(where + ": no page numbers in source");
    const entry = {
      id: s.id, unit: s.unit, brand: s.brand, equipment: s.equipment,
      title: s.title, summary: s.summary, steps: s.steps,
    };
    if (s.safety) entry.safety = s.safety;
    entry.manual = seed ? fileTok : "";
    entry.pages = pages;
    const seedTitle = seed ? String(seed.title || fileTok).split(" — ")[0] : fileTok.toUpperCase().replace(/^SM-/, "") + " (not in the app's manual library)";
    entry.source = (seed && seed.model && !seedTitle.includes(seed.model) ? seed.model + " " : "") + seedTitle + (pages.length ? ", p." + pages.join(", p.") : "");
    entry.confidence = "manual";
    out.push(entry);
  }
}

for (const w of warnings) console.warn("WARN " + w);
if (errors.length) { for (const e of errors) console.error("ERROR " + e); console.error(errors.length + " error(s); unit-scenarios.js not written"); process.exit(2); }

const header = `/*
 * Unit-specific troubleshooting (v285): heating problems written for one
 * equipment family from its own service / installation manual, with the page.
 * \`unit\` is the Tag Scanner library pattern (MODEL_PATTERNS) for that family,
 * so a scanned model gets its own scenarios. Built by tools/build-unit-scenarios.js
 * - edit the research JSON and rebuild rather than editing this file.
 */
`;
fs.writeFileSync(path.join(ROOT, "unit-scenarios.js"), header + "const UNIT_SCENARIOS = " + JSON.stringify(out, null, 1) + ";\n");
const by = {};
for (const s of out) by[s.brand + " " + s.unit] = (by[s.brand + " " + s.unit] || 0) + 1;
console.log("wrote " + out.length + " scenarios");
for (const [k, n] of Object.entries(by)) console.log("  " + n + "  " + k);
