#!/usr/bin/env node
/*
 * build-manual-text.js - page text for Ask Anything grounding.
 *
 * Ask Anything used to search only the manuals a phone had already downloaded
 * and indexed with pdf.js, so a question about a manual that lived in the
 * library but not on THAT phone came back "no-manual-match". This pulls the
 * text off every page of every library PDF once, offline, so the app can fetch
 * just the page text of the few manuals a question points at.
 *
 * Run it from the root of the `manuals` branch checkout (the folder holding
 * manuals-seed/):
 *
 *   node <hvac-codes>/tools/build-manual-text.js [--seed manuals-seed] [--out manuals-text] [--jobs 6] [--force]
 *
 * For every manuals-seed/<name>.pdf it writes manuals-text/<name>.json:
 *   { v: 1, file: "<name>.pdf", pages: ["page 1 text", "page 2 text", ...] }
 * A manual whose JSON would be over ~2 MB is split into <name>.p1.json,
 * <name>.p2.json ... ({ v, file, part, start, pages }) and <name>.json becomes a
 * small stub ({ v, file, pageCount, parts: [...] }) so a client that only knows
 * the file name can still find the parts.
 * manuals-text/index.json lists [{ file, pages, bytes, parts? }] for every
 * manual that has text; manuals-text/no-text.json lists the scanned / image-only
 * PDFs (and any pdftotext failures) that were skipped.
 *
 * Extraction is pdftotext (xpdf/poppler, ships with Git for Windows) in its
 * default reading-order mode, NOT -layout: -layout interleaves the two text
 * columns of a typical service manual line by line, while reading order keeps
 * prose intact and still keeps table rows together (checked on the Generac
 * Evo diagnostic manual Table 1-3, Carrier 24-25-9SM Table 3, Lennox 13ACX
 * Table 1).
 *
 * Incremental: a PDF is skipped when its output is newer than the PDF (or it
 * is already listed in no-text.json and hasn't changed). --force rebuilds all.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const args = process.argv.slice(2);
function arg(name, dflt) {
  const i = args.indexOf("--" + name);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : dflt;
}
const SEED_DIR = path.resolve(arg("seed", "manuals-seed"));
const OUT_DIR = path.resolve(arg("out", "manuals-text"));
const JOBS = Math.max(1, parseInt(arg("jobs", "6"), 10) || 6);
const FORCE = args.includes("--force");
const PDFTOTEXT = process.env.PDFTOTEXT || "pdftotext";
const PAGE_CAP = 6000;              // chars per page
const SPLIT_BYTES = parseInt(arg("split", "2000000"), 10); // ~2 MB per JSON file
const TIMEOUT_MS = 180000;          // one PDF must not stall the whole build
const MIN_ALNUM_TOTAL = 80;         // below this the PDF is a scan / image only
const MIN_ALNUM_PER_PAGE = 15;      // ...or a multi-page doc with only stamps/page numbers

function mtime(p) { try { return fs.statSync(p).mtimeMs; } catch (e) { return 0; } }
function baseOf(file) { return file.replace(/\.pdf$/i, ""); }

function runPdftotext(pdf) {
  return new Promise((resolve) => {
    const chunks = [];
    let err = "";
    let done = false;
    const child = spawn(PDFTOTEXT, ["-enc", "UTF-8", "-q", pdf, "-"], { windowsHide: true });
    const timer = setTimeout(() => { if (!done) { done = true; child.kill(); resolve({ error: "timeout" }); } }, TIMEOUT_MS);
    child.stdout.on("data", (d) => chunks.push(d));
    child.stderr.on("data", (d) => { err += d; });
    child.on("error", (e) => { if (!done) { done = true; clearTimeout(timer); resolve({ error: String(e.message || e) }); } });
    child.on("close", (code) => {
      if (done) return;
      done = true; clearTimeout(timer);
      const text = Buffer.concat(chunks).toString("utf8");
      if (code !== 0 && !text.trim()) resolve({ error: "pdftotext exit " + code + (err ? ": " + err.trim().slice(0, 200) : "") });
      else resolve({ text });
    });
  });
}

// One string per page: whitespace collapsed, control characters dropped,
// capped so one dense parts-list page can't dominate the download.
function normalisePage(s) {
  return s
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, PAGE_CAP);
}
function splitPages(text) {
  const raw = text.split("\f");
  if (raw.length > 1 && raw[raw.length - 1].trim() === "") raw.pop();   // pdftotext ends every page with \f
  return raw.map(normalisePage);
}

function removeOutputs(base) {
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f === base + ".json" || (f.startsWith(base + ".p") && /^\.p\d+\.json$/.test(f.slice(base.length)))) {
      fs.unlinkSync(path.join(OUT_DIR, f));
    }
  }
}

// Writes the JSON (split when too big). Returns the index entry.
function writeManual(file, pages) {
  const base = baseOf(file);
  removeOutputs(base);
  const whole = JSON.stringify({ v: 1, file, pages });
  const wholeBytes = Buffer.byteLength(whole);
  if (wholeBytes <= SPLIT_BYTES) {
    fs.writeFileSync(path.join(OUT_DIR, base + ".json"), whole);
    return { file, pages: pages.length, bytes: wholeBytes };
  }
  // Split into parts of <= ~2 MB each, keeping page order.
  const parts = [];
  let cur = [], curBytes = 0, start = 1, next = 1;
  const flush = () => {
    if (!cur.length) return;
    const name = base + ".p" + (parts.length + 1) + ".json";
    parts.push({ name, start, pages: cur });
    cur = []; curBytes = 0; start = next;
  };
  for (const p of pages) {
    const b = Buffer.byteLength(JSON.stringify(p)) + 1;
    if (cur.length && curBytes + b > SPLIT_BYTES - 2000) flush();
    cur.push(p); curBytes += b; next++;
  }
  flush();
  let bytes = 0;
  for (const [i, pt] of parts.entries()) {
    const s = JSON.stringify({ v: 1, file, part: i + 1, start: pt.start, pages: pt.pages });
    fs.writeFileSync(path.join(OUT_DIR, pt.name), s);
    bytes += Buffer.byteLength(s);
  }
  // Stub last: its mtime is what the incremental check looks at.
  const stub = JSON.stringify({ v: 1, file, pageCount: pages.length, parts: parts.map(p => ({ name: p.name, start: p.start, pages: p.pages.length })) });
  fs.writeFileSync(path.join(OUT_DIR, base + ".json"), stub);
  bytes += Buffer.byteLength(stub);
  return { file, pages: pages.length, bytes, parts: parts.map(p => p.name) };
}

// Index entry for an up-to-date output we are not rebuilding.
function entryFromExisting(file, prevIndex) {
  const base = baseOf(file);
  const prev = prevIndex.get(file);
  const mainPath = path.join(OUT_DIR, base + ".json");
  let obj;
  try { obj = JSON.parse(fs.readFileSync(mainPath, "utf8")); } catch (e) { return null; }
  if (obj.parts) {
    let bytes = fs.statSync(mainPath).size;
    for (const p of obj.parts) bytes += mtime(path.join(OUT_DIR, p.name)) ? fs.statSync(path.join(OUT_DIR, p.name)).size : 0;
    return { file, pages: obj.pageCount, bytes, parts: obj.parts.map(p => p.name) };
  }
  if (prev && !prev.parts && prev.pages === (obj.pages || []).length) return prev;
  return { file, pages: (obj.pages || []).length, bytes: fs.statSync(mainPath).size };
}

async function main() {
  const t0 = Date.now();
  if (!fs.existsSync(SEED_DIR)) { console.error("No seed folder at " + SEED_DIR); process.exit(1); }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pdfs = fs.readdirSync(SEED_DIR).filter(f => /\.pdf$/i.test(f)).sort();

  const prevIndex = new Map();
  try { for (const e of JSON.parse(fs.readFileSync(path.join(OUT_DIR, "index.json"), "utf8"))) prevIndex.set(e.file, e); } catch (e) {}
  const noTextPath = path.join(OUT_DIR, "no-text.json");
  const noTextMtime = mtime(noTextPath);
  const prevNoText = new Map();
  try { for (const e of JSON.parse(fs.readFileSync(noTextPath, "utf8"))) prevNoText.set(e.file, e); } catch (e) {}

  const index = [], noText = [];
  let built = 0, skipped = 0, doneCount = 0;
  const queue = pdfs.slice();

  async function worker() {
    while (queue.length) {
      const file = queue.shift();
      const pdf = path.join(SEED_DIR, file);
      const out = path.join(OUT_DIR, baseOf(file) + ".json");
      const pdfM = mtime(pdf);
      if (!FORCE && mtime(out) > pdfM) {
        const e = entryFromExisting(file, prevIndex);
        if (e) { index.push(e); skipped++; doneCount++; continue; }
      }
      if (!FORCE && prevNoText.has(file) && noTextMtime > pdfM && !mtime(out)) {
        noText.push(prevNoText.get(file)); skipped++; doneCount++; continue;
      }
      const r = await runPdftotext(pdf);
      doneCount++;
      if (r.error) {
        removeOutputs(baseOf(file));
        noText.push({ file, reason: r.error });
      } else {
        const pages = splitPages(r.text);
        const alnum = pages.reduce((n, p) => n + (p.match(/[A-Za-z0-9]/g) || []).length, 0);
        if (!pages.length || alnum < MIN_ALNUM_TOTAL || (pages.length >= 4 && alnum / pages.length < MIN_ALNUM_PER_PAGE)) {
          removeOutputs(baseOf(file));
          noText.push({ file, pages: pages.length, chars: alnum, reason: "no text layer (scanned or image-only)" });
        } else {
          index.push(writeManual(file, pages));
          built++;
        }
      }
      if (doneCount % 50 === 0) process.stdout.write("  " + doneCount + "/" + pdfs.length + " (" + Math.round((Date.now() - t0) / 1000) + " s)\n");
    }
  }
  await Promise.all(Array.from({ length: JOBS }, worker));

  // Outputs whose PDF is gone.
  const want = new Set(pdfs.map(baseOf));
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f === "index.json" || f === "no-text.json" || !f.endsWith(".json")) continue;
    const b = f.replace(/(\.p\d+)?\.json$/, "");
    if (!want.has(b)) fs.unlinkSync(path.join(OUT_DIR, f));
  }

  index.sort((a, b) => a.file.localeCompare(b.file));
  noText.sort((a, b) => a.file.localeCompare(b.file));
  fs.writeFileSync(path.join(OUT_DIR, "index.json"), JSON.stringify(index));
  fs.writeFileSync(noTextPath, JSON.stringify(noText, null, 1));

  const total = index.reduce((n, e) => n + e.bytes, 0);
  const largest = index.slice().sort((a, b) => b.bytes - a.bytes)[0];
  console.log("PDFs: " + pdfs.length + "  built: " + built + "  up to date: " + skipped);
  console.log("With text: " + index.length + "  no text / failed: " + noText.length);
  console.log("Split into parts: " + index.filter(e => e.parts).length);
  console.log("Total text JSON: " + (total / 1048576).toFixed(1) + " MB");
  if (largest) console.log("Largest: " + largest.file + " " + (largest.bytes / 1048576).toFixed(2) + " MB, " + largest.pages + " pages" + (largest.parts ? " (" + largest.parts.length + " parts)" : ""));
  console.log("Time: " + ((Date.now() - t0) / 1000).toFixed(1) + " s");
}
main().catch((e) => { console.error(e); process.exit(1); });
