/* Brackett Service Tool —
 app logic (no build step, plain JS) */

// ============================================================
// Shared helpers
// ============================================================

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[m]));
}
function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

// The sticky search/filter bar needs to sit exactly below the topbar, but the
// topbar's real height varies by device (safe-area inset, font rendering) —
// a hardcoded CSS value drifts and causes the two to overlap when scrolling.
// Measure it live instead.
function syncTopbarHeight() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  document.documentElement.style.setProperty("--topbar-h", topbar.getBoundingClientRect().height + "px");
}
if ("ResizeObserver" in window) {
  new ResizeObserver(syncTopbarHeight).observe(document.querySelector(".topbar"));
} else {
  window.addEventListener("resize", syncTopbarHeight);
}
syncTopbarHeight();
// A tech in the field types a real sentence ("ac compressor is showing the
// same pressure on suction as head"), not a keyword list. Requiring every
// single word to match — including "is", "the", "on", "as" — made long
// sentences fail almost by design: those filler words rarely all appear
// together in any one card's text, so a perfectly good query returned
// nothing (or worse, matched some unrelated card that happened to contain
// enough of the filler words). Strip common English stopwords before
// matching so only the words that actually carry meaning have to line up.
const SEARCH_STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","to","of","in","on","at","for","with",
  "as","by","from","it","its","this","that","these","those","and","or","but","not","so","than","then",
  "too","very","just","also","if","i","im","my","me","we","our","you","your","he","she","they","them",
  "their","his","her","do","does","did","doing","has","have","had","having","will","would","can","could",
  "should","shall","must","may","might","up","down","out","about","into","over","again","once","here",
  "there","when","where","why","how","what","which","who","whom","whose","whats",
  "all","any","both","each","more","most","other","only","own","same",
  "get","got","showing","show","shows","seems","seem",
  // Near-zero discriminating power in an HVAC-only corpus — almost every
  // scenario in here IS about "ac"/"the unit"/"the system", so the word
  // itself never narrows anything down. The equipment filter chip is the
  // real tool for that distinction, not a free-text keyword.
  "ac","hvac","unit","units","system","systems",
  // Generic fault-adjectives a tech says out loud ("cap is bad", "sounds
  // wrong") but this app's own scenario text almost never uses — it says
  // "failed", "shorted", "leaking", "worn" instead. Requiring the literal
  // word "bad" excluded the correct capacitor-test scenario just because it
  // never happened to use that exact word. Drop these as REQUIRED terms;
  // they add noise, not precision, in this corpus.
  "bad","broken","wrong","messed","funky","faulty","problem","problems",
  "issue","issues","trouble","malfunctioning","weird","acting",
  // Negative contractions, with and without the apostrophe a phone may or may
  // not insert. Their expansions ("will not", "does not", "is not") are
  // already stopwords above, so "won't start" and "will not start" have to
  // search the same. Before this, typing "why wont the blower start" returned
  // NOTHING, because "wont" became a required term and the scenario text
  // spells it "won't" or "will not".
  "wont","won't","dont","don't","doesnt","doesn't","didnt","didn't",
  "cant","can't","cannot","isnt","isn't","arent","aren't","wasnt","wasn't",
  "hasnt","hasn't","havent","haven't","wouldnt","wouldn't","couldnt","couldn't",
  "shouldnt","shouldn't","aint","ain't","thats","that's","whats","what's",
]);
// Field slang and trade shorthand that means the same thing as a term this
// app's own text uses. A tech typing "low side" needs to find scenarios
// written around "suction" — exact wording is not how techs talk on a call.
// Each group is a set of interchangeable phrases; matching ANY one phrase in
// a group satisfies that whole concept (longest phrase checked first so a
// multi-word alias is consumed before its component words are).
const SEARCH_ALIAS_GROUPS = [
  ["low side", "suction"],
  ["high side", "head pressure", "discharge pressure", "head", "discharge"],
  ["not starting", "wont start", "won't start", "doesn't start", "does not start", "not coming on", "wont kick on", "won't kick on", "not turning on", "no start"],
  ["not shutting off", "wont turn off", "won't turn off", "runs constantly", "runs non stop", "runs nonstop", "never stops", "won't shut off", "wont shut off", "doesn't shut off", "never shuts off", "runs continuously", "runs all the time", "keeps running"],
  ["short cycling", "short cycles", "cycling on and off", "turns on and off", "kicks on and off"],
  ["frozen", "iced up", "ice up", "icing up", "icing", "frosted", "frost"],
  ["compressor", "comp"],
  ["capacitor", "cap"],
  ["condenser fan", "outdoor fan", "outside fan"],
  ["blower", "indoor fan", "squirrel cage"],
  ["breaker", "circuit breaker", "tripping the breaker", "trips the breaker"],
  ["refrigerant", "freon", "charge"],
  ["humming", "hums", "buzzing"],
  ["not draining", "wont drain", "won't drain", "backed up", "overflowing", "backing up"],
  ["musty smell", "musty", "mildew smell"],
  ["burning smell", "electrical smell", "smells like burning", "smells hot"],
  ["low airflow", "weak airflow", "not enough air", "weak air", "poor airflow"],
  ["reversing valve", "4 way valve", "four way valve", "changeover valve", "4-way valve"],
  ["expansion valve", "txv", "metering device", "piston", "orifice"],
  ["same pressure", "equal pressure", "equalized pressure", "pressures are the same", "pressures equalized", "matching pressure", "even pressure"],
  // Dual-fuel vocabulary. These must stay BELOW the reversing-valve group above,
  // which owns "changeover valve" — the loop consumes the longest phrase in the
  // first group that matches, so that one is claimed before bare "changeover"
  // falls through to the balance-point group here.
  ["dual fuel", "dual-fuel", "hybrid heat", "hybrid", "fossil fuel kit", "gas pack heat pump"],
  ["balance point", "changeover", "change over", "switchover", "switch over", "changeover temperature", "crossover temp"],
  ["aux heat", "auxiliary heat", "backup heat", "back up heat", "supplemental heat", "strip heat", "second stage heat"],
  ["emergency heat", "em heat", "e heat"],
  ["twinned", "twinning", "twin"],
  ["variable capacity", "variable speed", "inverter driven", "inverter"],
  // Residential controls vocabulary. The zone-board group has to stay ABOVE the
  // damper group: it owns "damper control" (the panel), and the loop consumes
  // the longest phrase in the first group that matches, so the panel is claimed
  // before bare "damper" below can swallow it. "zone damper" still lands in the
  // damper group, which is what a tech asking about one means.
  ["zone board", "zone panel", "zoning panel", "damper control", "zone control", "zoning board"],
  // Bypass sits above the plain damper group for the same reason: otherwise
  // "bypass damper" gets eaten as "damper" + a leftover "bypass" and becomes
  // two separate concepts the row has to satisfy, instead of the one thing the
  // tech actually asked about.
  ["bypass damper", "bypass", "barometric bypass"],
  ["damper", "dampers", "zone damper", "damper motor", "damper actuator"],
  ["zone sensor", "smart sensor", "room sensor", "remote sensor", "remote room sensor"],
  ["wall control", "system control", "infinity control", "infinity touch", "touch control"],
  ["thermostat", "tstat", "stat", "wall stat"],
  ["communicating", "comm bus", "abcd bus", "abcd", "data bus", "serial bus"],
  ["firmware", "software version", "software update", "firmware update", "update the control"],
];

// A query typed the way a tech actually talks — "why won't the blower start?"
// or "compressor hums, will not start" — used to return NOTHING at all.
// Leftover words kept whatever punctuation was stuck to them, and the
// word-boundary regex cannot match past it: \bstart?\b wants a word character
// after the "?" and there never is one. Because textIncludes requires EVERY
// unit to hit, a single comma or question mark killed the entire search.
// Strip the punctuation that only ever ends up attached to a word, and keep
// the characters that live INSIDE real terms — hyphens (live-dead-live,
// R-410A), apostrophes (doesn't) and slashes (on/off, C/S/R).
function normalizeQuery(q) {
  const DOT = "";                              // stands in for a real decimal point
  return String(q || "")
    .toLowerCase()
    .replace(/(\d)\.(\d)/g, "$1" + DOT + "$2")       // protect 0.5 before periods are stripped
    .replace(/[‘’]/g, "'")                 // smart apostrophe off a phone keyboard
    .replace(/[.,;:!?()\[\]{}"“”]+/g, " ") // sentence punctuation only
    .split(/\s+/)
    .map(w => w.replace(/^['\-\/]+|['\-\/]+$/g, "")) // trim edge dashes/quotes, keep inner ones
    .filter(Boolean)
    .join(" ")
    .split(DOT).join(".")
    .trim();
}
// Break a query into match "units" — each unit is either an alias group (any
// one of its phrases counts as a hit) or a single leftover meaningful word.
function buildSearchUnits(q) {
  let text = " " + normalizeQuery(q) + " ";
  const units = [];
  for (const group of SEARCH_ALIAS_GROUPS) {
    const sorted = [...group].sort((a, b) => b.length - a.length);
    for (const phrase of sorted) {
      const idx = text.indexOf(" " + phrase + " ");
      if (idx !== -1) {
        units.push({ alts: group });
        text = text.slice(0, idx) + " " + text.slice(idx + phrase.length + 2);
        break;   // one hit per concept group, even if more than one alias appears
      }
    }
  }
  const leftover = text.split(/\s+/).filter(Boolean).filter(w => !SEARCH_STOPWORDS.has(w));
  leftover.forEach(w => units.push({ alts: [w] }));
  if (!units.length) q.toLowerCase().split(/\s+/).filter(Boolean).forEach(w => units.push({ alts: [w] }));
  return units;
}
// Plain substring matching lets a short alias bleed into an unrelated word
// that happens to contain the same letters — "cap" (meant as capacitor
// shorthand) silently matched inside "capacity", "capable", "cap tube".
// Word-boundary matching (with an optional trailing "s" for simple plurals)
// keeps "comp" finding "compressor/compressors" while no longer matching
// "company" or "complete".
// The same Lennox alert code is printed two ways depending on where you read
// it: the 7-segment display and the service manuals show "E427", while the
// LennoxPros code database (where most of our rows came from) lists a bare
// "427". Word-boundary matching treats those as different tokens — "E480"
// never matches "480" — so a tech typing exactly what is on the display
// could miss the row. Feed both spellings into the haystack for any row whose
// code is one of those forms.
function codeSearchAliases(code) {
  const c = String(code || "").trim();
  let m = c.match(/^E(\d{2,4})$/i);
  if (m) return [m[1]];
  m = c.match(/^(\d{2,4})$/);
  if (m) return ["E" + m[1]];
  // Bosch Climate 5000 G3 prints its long-scheme codes with a space ("EC 52").
  // Techs type them both ways; feed the other spelling into the haystack.
  m = c.match(/^([A-Za-z]{2})\s([0-9A-Za-z]{2})$/);
  if (m) return [m[1] + m[2]];
  m = c.match(/^([A-Za-z]{2})([0-9A-Za-z]{2})$/);
  if (m) return [m[1] + " " + m[2]];
  return [];
}
const termRegexCache = new Map();
function hayHasTerm(hay, term) {
  let re = termRegexCache.get(term);
  if (!re) {
    re = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?\\b");
    termRegexCache.set(term, re);
  }
  return re.test(hay);
}
function textIncludes(fields, q) {
  if (!q) return true;
  const hay = fields.filter(Boolean).join(" ").toLowerCase();
  return buildSearchUnits(q).every(u => u.alts.some(a => hayHasTerm(hay, a)));
}
// Count of query concepts a card actually contains — used to surface the
// closest matches when a strict all-units search comes up empty, so a
// well-typed sentence never hits a hard dead end.
function searchScore(fields, q) {
  if (!q) return 0;
  const hay = fields.filter(Boolean).join(" ").toLowerCase();
  return buildSearchUnits(q).reduce((n, u) => n + (u.alts.some(a => hayHasTerm(hay, a)) ? 1 : 0), 0);
}

function closeModal() {
  document.getElementById("modalBackdrop").classList.add("hidden");
  if (currentPdfObjectUrl) {
    URL.revokeObjectURL(currentPdfObjectUrl);
    currentPdfObjectUrl = null;
  }
}
document.getElementById("modalBackdrop").addEventListener("click", (e) => {
  if (e.target.id === "modalBackdrop") closeModal();
});

// ============================================================
// Screen navigation
// ============================================================

const SCREEN_TITLES = {
  home: "Brackett Service Tool",
  ask: "Ask Anything",
  codes: "Error Codes",
  diagnostics: "Diagnostic Help",
  manuals: "Manuals",
  toolbox: "Toolbox",
  tstat: "Thermostats",
  gen: "Generators",
  scanner: "Tag Scanner",
  charge: "Charging Calc",
  warranty: "Warranty Check",
  sqft: "House Size",
  request: "Request Info",
};
const ADD_HANDLERS = {
  codes: () => openCodeEditForm(null),
  diagnostics: () => openSymptomEditForm(null),
  manuals: () => openManualEditForm({
    brand: manualsState.brand && manualsState.brand !== UNFILED_BRAND ? manualsState.brand : "",
    model: manualsState.model && manualsState.model !== GENERAL_MODEL ? manualsState.model : "",
  }),
  toolbox: () => openToolboxEditForm(null),
};

let currentScreen = "home";
// Where the tech came FROM, so the swipe-back gesture can retrace one step at
// a time (scanner -> codes -> swipe -> scanner) instead of dumping to Home.
let screenHistory = [];

function showScreen(name, fromBack) {
  if (!fromBack && name !== currentScreen) {
    screenHistory.push(currentScreen);
    if (screenHistory.length > 20) screenHistory.shift();
  }
  currentScreen = name;
  for (const id of ["homeScreen", "askScreen", "codesScreen", "diagScreen", "manualsScreen", "toolboxScreen", "tstatScreen", "genScreen", "scannerScreen", "chargeScreen", "warrantyScreen", "sqftScreen", "requestScreen"]) {
    document.getElementById(id).classList.add("hidden");
  }
  const screenEl = { home: "homeScreen", ask: "askScreen", codes: "codesScreen", diagnostics: "diagScreen", manuals: "manualsScreen", toolbox: "toolboxScreen", tstat: "tstatScreen", gen: "genScreen", scanner: "scannerScreen", charge: "chargeScreen", warranty: "warrantyScreen", sqft: "sqftScreen", request: "requestScreen" }[name];
  document.getElementById(screenEl).classList.remove("hidden");
  document.getElementById("screenTitle").textContent = SCREEN_TITLES[name];
  document.getElementById("backBtn").classList.toggle("hidden", name === "home");

  const addBtn = document.getElementById("addBtn");
  if (name === "home" || !ADD_HANDLERS[name]) {
    addBtn.classList.add("hidden");
  } else {
    addBtn.classList.remove("hidden");
    addBtn.onclick = ADD_HANDLERS[name];
  }

  if (name === "ask") { askIndexCache = null; renderAsk(); }
  if (name === "codes") renderCodes();
  if (name === "diagnostics") renderSymptoms();
  if (name === "manuals") renderManuals();
  if (name === "toolbox") renderToolbox();
  if (name === "tstat") renderTstats();
  if (name === "gen") renderGens();
  if (name === "charge") renderChargeCalc();

  if (name !== "home") trackEvent("viewed " + SCREEN_TITLES[name]);

  // Toggling the back/add buttons changes the topbar's own height (its tallest
  // child differs per screen), which should retrigger ResizeObserver — but that
  // firing isn't reliable on every device/browser, so resync explicitly here too.
  syncTopbarHeight();
}

document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", () => showScreen(tile.dataset.screen));
});
document.getElementById("backBtn").addEventListener("click", () => showScreen("home"));

// ---- Swipe right = back up ONE level ----
// Peels the topmost layer only: open modal, then the PDF reader / warranty
// portal, then a manuals folder level, then the previous screen. The topbar
// back button still jumps straight Home for when that's what you want.
function goBackOneStep() {
  if (document.querySelector(".tech-picker-overlay")) return; // must pick a name first
  if (!document.getElementById("modalBackdrop").classList.contains("hidden")) { closeModal(); return; }
  if (!document.getElementById("pdfViewer").classList.contains("hidden")) { closePdfReader(false); return; }
  if (!document.getElementById("portalViewer").classList.contains("hidden")) { closePortalEmbed(false); return; }
  if (currentScreen === "manuals" && (manualsState.model || manualsState.brand)) {
    if (manualsState.model) manualsState.model = null;
    else manualsState.brand = null;
    renderManuals();
    return;
  }
  if (screenHistory.length) { showScreen(screenHistory.pop(), true); return; }
  if (currentScreen !== "home") showScreen("home", true);
}

// The gesture works from anywhere on the screen, not just the edge — but a
// touch that starts inside a form field or a sideways-scrollable strip (filter
// chips, a zoomed PDF page) belongs to that element, so it never fires there.
const SWIPE_MIN_X = 70;   // must travel this far right
const SWIPE_MAX_Y = 60;   // more drift than this = it was a scroll
let swipeTrack = null;
function swipeBlockedAt(el) {
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    if (n.tagName === "INPUT" || n.tagName === "TEXTAREA" || n.tagName === "SELECT") return true;
    if (n.scrollWidth > n.clientWidth + 1) {
      const ox = getComputedStyle(n).overflowX;
      if (ox === "auto" || ox === "scroll") return true;
    }
  }
  return false;
}
document.addEventListener("touchstart", (e) => {
  if (e.touches.length !== 1 || swipeBlockedAt(e.target)) { swipeTrack = null; return; }
  const t = e.touches[0];
  swipeTrack = { x: t.clientX, y: t.clientY, lx: t.clientX, ly: t.clientY, t: Date.now() };
}, { passive: true });
document.addEventListener("touchmove", (e) => {
  if (!swipeTrack) return;
  const t = e.touches[0];
  swipeTrack.lx = t.clientX;
  swipeTrack.ly = t.clientY;
  if (Math.abs(t.clientY - swipeTrack.y) > SWIPE_MAX_Y) swipeTrack = null;
}, { passive: true });
document.addEventListener("touchend", () => {
  if (!swipeTrack) return;
  const dx = swipeTrack.lx - swipeTrack.x;
  const dy = Math.abs(swipeTrack.ly - swipeTrack.y);
  const dt = Date.now() - swipeTrack.t;
  swipeTrack = null;
  if (dx >= SWIPE_MIN_X && dy <= SWIPE_MAX_Y && dx > 1.5 * dy && dt <= 800) goBackOneStep();
}, { passive: true });
document.addEventListener("touchcancel", () => { swipeTrack = null; }, { passive: true });

// ============================================================
// ERROR CODES
// ============================================================

const CODES_STORAGE_KEY = "bfc_user_codes_v1";
const CODES_DELETED_KEY = "bfc_deleted_ids_v1";
let codesState = { search: "", brand: "All", equipment: "All" };

function loadUserCodes() { try { return JSON.parse(localStorage.getItem(CODES_STORAGE_KEY)) || []; } catch { return []; } }
// Every read path was already try/catch guarded; the writes were not, so a
// full or blocked store threw straight out of a Save button.
function safeSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch (e) { return false; }
}
function saveUserCodes(list) { safeSet(CODES_STORAGE_KEY, list); }
function loadDeletedCodeIds() { try { return JSON.parse(localStorage.getItem(CODES_DELETED_KEY)) || []; } catch { return []; } }
function saveDeletedCodeIds(list) { safeSet(CODES_DELETED_KEY, list); }

function getAllCodes() {
  const userCodes = loadUserCodes();
  const deleted = new Set(loadDeletedCodeIds());
  const userIds = new Set(userCodes.map(c => c.id));
  const base = ERROR_CODES.filter(c => !deleted.has(c.id) && !userIds.has(c.id));
  return [...base, ...userCodes.filter(c => !deleted.has(c.id))];
}

// Filters render as dropdowns (not chip buttons) so long brand/equipment lists
// don't eat half the phone screen. "All" is shown with a friendlier label.
function renderChips(containerId, values, active, onPick, allLabel) {
  const el = document.getElementById(containerId);
  el.innerHTML = "";
  for (const v of values) {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v === "All" ? (allLabel || "All") : v;
    el.appendChild(opt);
  }
  el.value = active;
  el.onchange = () => onPick(el.value);
}

function renderCodes() {
  const all = getAllCodes();
  // Chip options reflect the OTHER active filter, so a brand/equipment with zero
  // matches for the current selection never shows up as a dead-end heading.
  const brands = ["All", ...uniqueSorted(all.filter(c => codesState.equipment === "All" || c.equipment === codesState.equipment).map(c => c.brand))];
  const equips = ["All", ...uniqueSorted(all.filter(c => codesState.brand === "All" || c.brand === codesState.brand).map(c => c.equipment))];
  if (!brands.includes(codesState.brand)) codesState.brand = "All";
  if (!equips.includes(codesState.equipment)) codesState.equipment = "All";

  renderChips("brandChips", brands, codesState.brand, (v) => { codesState.brand = v; renderCodes(); }, "All Brands");
  renderChips("equipChips", equips, codesState.equipment, (v) => { codesState.equipment = v; renderCodes(); }, "All Equipment");

  const filtered = all.filter(c =>
    (codesState.brand === "All" || c.brand === codesState.brand) &&
    (codesState.equipment === "All" || c.equipment === codesState.equipment) &&
    textIncludes([c.brand, c.family, c.equipment, c.code, ...codeSearchAliases(c.code), c.title, c.meaning, ...(c.causes||[]), ...(c.steps||[])], codesState.search)
  ).sort((a, b) => a.brand.localeCompare(b.brand) || a.code.localeCompare(b.code));

  const results = document.getElementById("codesResults");
  const empty = document.getElementById("codesEmptyState");
  results.innerHTML = "";
  empty.classList.toggle("hidden", filtered.length !== 0);
  for (const code of filtered) results.appendChild(buildCodeCard(code));
}

function buildCodeCard(code) {
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = () => openCodeDetail(code.id);
  const confTag = code.confidence === "verify" ? `<span class="tag verify">verify</span>` : `<span class="tag common">common</span>`;
  card.innerHTML = `
    <div class="card-top">
      <div>
        <div class="card-code">${escapeHtml(code.code)}</div>
        <div class="card-title">${escapeHtml(code.title)}</div>
      </div>
      ${confTag}
    </div>
    <div class="card-meta">
      <span>${escapeHtml(code.brand)}${code.family ? " · " + escapeHtml(code.family) : ""}</span>
      <span>·</span>
      <span>${escapeHtml(code.equipment)}</span>
    </div>
  `;
  return card;
}

function openCodeDetail(id) {
  const code = getAllCodes().find(c => c.id === id);
  if (!code) return;
  const modal = document.getElementById("modal");
  const causes = (code.causes || []).map(c => `<li>${escapeHtml(c)}</li>`).join("");
  const steps = (code.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join("");
  modal.innerHTML = `
    <h2>${escapeHtml(code.code)} — ${escapeHtml(code.title)}</h2>
    <div class="sub">${escapeHtml(code.brand)}${code.family ? " · " + escapeHtml(code.family) : ""} · ${escapeHtml(code.equipment)}</div>
    <div class="detail-section"><h3>What it means</h3><p>${escapeHtml(code.meaning || "—")}</p></div>
    ${causes ? `<div class="detail-section"><h3>Likely causes</h3><ul>${causes}</ul></div>` : ""}
    ${steps ? `<div class="detail-section"><h3>Diagnostic steps</h3><ol>${steps}</ol></div>` : ""}
    ${code.safety ? `<div class="safety-box">⚠ ${escapeHtml(code.safety)}</div>` : ""}
    <div class="modal-actions">
      <button id="closeModalBtn">Close</button>
      <button class="primary" id="editCodeBtn">Edit / correct</button>
    </div>
  `;
  document.getElementById("closeModalBtn").onclick = closeModal;
  document.getElementById("editCodeBtn").onclick = () => openCodeEditForm(code);
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

function openCodeEditForm(existing) {
  const modal = document.getElementById("modal");
  const isNew = !existing;
  const c = existing || { brand: "", family: "", equipment: "Gas Furnace", code: "", title: "", meaning: "", causes: [], steps: [], safety: "", confidence: "verify" };
  modal.innerHTML = `
    <h2>${isNew ? "Add a code" : "Edit code"}</h2>
    <div class="sub">Saved on this device.</div>
    <div class="form-field"><label>Brand</label><input id="f-brand" value="${escapeHtml(c.brand)}" placeholder="e.g. Carrier"></div>
    <div class="form-field"><label>Family / related brands (optional)</label><input id="f-family" value="${escapeHtml(c.family || "")}" placeholder="e.g. Bryant / Payne"></div>
    <div class="form-field"><label>Equipment type</label>
      <select id="f-equipment">${["Gas Furnace","Electric Furnace","Condenser/Heat Pump","Air Handler","Mini-Split","Other"].map(o => `<option value="${o}" ${c.equipment===o?"selected":""}>${o}</option>`).join("")}</select>
    </div>
    <div class="form-field"><label>Code / flash pattern</label><input id="f-code" value="${escapeHtml(c.code)}" placeholder="e.g. 4 flashes or P8"></div>
    <div class="form-field"><label>Title</label><input id="f-title" value="${escapeHtml(c.title)}" placeholder="Short name of the fault"></div>
    <div class="form-field"><label>What it means</label><textarea id="f-meaning">${escapeHtml(c.meaning || "")}</textarea></div>
    <div class="form-field"><label>Likely causes (one per line)</label><textarea id="f-causes">${escapeHtml((c.causes||[]).join("\n"))}</textarea></div>
    <div class="form-field"><label>Diagnostic steps (one per line, in order)</label><textarea id="f-steps">${escapeHtml((c.steps||[]).join("\n"))}</textarea></div>
    <div class="form-field"><label>Safety note (optional)</label><textarea id="f-safety">${escapeHtml(c.safety || "")}</textarea></div>
    <div class="form-field"><label>Confidence</label>
      <select id="f-confidence">
        <option value="verify" ${c.confidence==="verify"?"selected":""}>Needs verification</option>
        <option value="common" ${c.confidence==="common"?"selected":""}>Confirmed / commonly reliable</option>
      </select>
    </div>
    <div class="modal-actions">
      <button id="cancelEditBtn">Cancel</button>
      ${!isNew ? `<button class="danger" id="deleteCodeBtn">Delete</button>` : ""}
      <button class="primary" id="saveCodeBtn">Save</button>
    </div>
  `;
  document.getElementById("cancelEditBtn").onclick = () => existing ? openCodeDetail(existing.id) : closeModal();
  if (!isNew) {
    document.getElementById("deleteCodeBtn").onclick = () => {
      if (!confirm("Delete this code from your device?")) return;
      saveDeletedCodeIds([...loadDeletedCodeIds(), existing.id]);
      saveUserCodes(loadUserCodes().filter(u => u.id !== existing.id));
      closeModal(); renderCodes();
    };
  }
  document.getElementById("saveCodeBtn").onclick = () => {
    const brand = document.getElementById("f-brand").value.trim();
    const code = document.getElementById("f-code").value.trim();
    const title = document.getElementById("f-title").value.trim();
    if (!brand || !code || !title) { alert("Brand, code, and title are required."); return; }
    const entry = {
      id: existing ? existing.id : "user-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      brand, family: document.getElementById("f-family").value.trim(),
      equipment: document.getElementById("f-equipment").value,
      code, title,
      meaning: document.getElementById("f-meaning").value.trim(),
      causes: document.getElementById("f-causes").value.split("\n").map(s => s.trim()).filter(Boolean),
      steps: document.getElementById("f-steps").value.split("\n").map(s => s.trim()).filter(Boolean),
      safety: document.getElementById("f-safety").value.trim(),
      confidence: document.getElementById("f-confidence").value,
    };
    const userCodes = loadUserCodes().filter(u => u.id !== entry.id);
    userCodes.push(entry);
    saveUserCodes(userCodes);
    if (existing) saveDeletedCodeIds(loadDeletedCodeIds().filter(id => id !== entry.id));
    closeModal(); renderCodes();
  };
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

document.getElementById("codesSearchInput").addEventListener("input", (e) => { codesState.search = e.target.value; renderCodes(); });

// ============================================================
// ASK ANYTHING — one plain-English box over the whole library
// ============================================================
// Retrieval only. It searches every code, symptom, thermostat, generator,
// board tool and manual already vetted into the app, then routes to that
// item's OWN detail view. It never generates prose and never invents a code,
// spec or step — an answer here is exactly as trustworthy as the screen it
// came from, which is the whole point. Reuses the same HVAC-aware search
// engine (alias groups, boundary matching) the other screens use, so "comp",
// "cap", "no cool", "flash code" etc. all resolve. Fully offline.

let askState = { search: "", kind: "All", brand: "All", equip: "All", _lastQ: null };
let askIndexCache = null;
let askManualToken = 0;      // guards the async in-manual search against stale renders
let askManualTimer = null;
// Server-side AI relay (holds the API key; app never sees it). Empty = feature
// dormant (no button). Fill in the deployed Apps Script /exec URL to turn it on.
const ASK_AI_RELAY = "https://script.google.com/macros/s/AKfycbzk5Pv9A4IIs8MSqnmv2xRFDVbS82PMWvStg_gSSUPTSXe0rOTzhUpNA7186htaGAtRjA/exec";
// Shared password the relay checks (its APP_TOKEN script property must match).
// Not a strong secret — it rides in this public file — but combined with the
// obscure URL + the relay's daily cap it stops anyone who finds the URL from
// burning the account's credits.
const ASK_AI_APP_TOKEN = "bkt-ask-9f3Kx7Qm2Zp";
let askAiToken = 0;

// Each kind knows its human label and how to open one of its items. Codes and
// fixes are ANSWERS; the rest are references — so when scores tie, answers
// surface first (rank order below).
const ASK_KIND = {
  code:    { label: "Code",       rank: 0, open: (id) => openCodeDetail(id) },
  symptom: { label: "Fix",        rank: 1, open: (id) => openSymptomDetail(id) },
  tstat:   { label: "Thermostat", rank: 2, open: (id) => openTstatDetail(id) },
  gen:     { label: "Generator",  rank: 3, open: (id) => openGenDetail(id) },
  tool:    { label: "Tool",       rank: 4, open: (id) => openToolboxDetail(id) },
  manual:  { label: "Manual",     rank: 5, open: (id) => openManualDetail(id) },
};

// A broad spread on purpose — not just fault codes. These teach a tech the
// whole range they can ask across the manuals: specs, sequence of operation,
// charging targets, airflow, gas, reversing-valve wiring, maintenance, venting.
const ASK_EXAMPLES = [
  "no cool heat pump", "goodman 3 flashes", "sequence of operation",
  "target subcooling", "what size capacitor", "MCA and breaker size",
  "manifold pressure", "blower dip switch settings",
  "does O or B energize in cooling", "force defrost",
  "oil capacity", "vent pipe size",
];

// Built once per screen visit (showScreen nulls the cache), reused on every
// keystroke — so live typing never rebuilds ~10k haystacks.
function askBuildIndex() {
  const items = [];
  for (const c of getAllCodes()) {
    items.push({
      kind: "code", id: c.id, brand: c.brand || "", equip: c.equipment || "",
      title: c.code + " — " + c.title,
      sub: [c.brand, c.family, c.equipment].filter(Boolean).join(" · "),
      titleHay: [c.brand, c.code, ...codeSearchAliases(c.code), c.title].filter(Boolean).join(" ").toLowerCase(),
      hay: [c.brand, c.family, c.equipment, c.code, ...codeSearchAliases(c.code), c.title, c.meaning, ...(c.causes || []), ...(c.steps || [])].filter(Boolean).join(" ").toLowerCase(),
    });
  }
  for (const s of getAllSymptoms()) {
    items.push({
      kind: "symptom", id: s.id, brand: "", equip: s.equipment || "",
      title: s.title,
      sub: [s.equipment, s.summary].filter(Boolean).join(" · "),
      hay: [s.equipment, s.title, s.summary, ...(s.steps || [])].filter(Boolean).join(" ").toLowerCase(),
    });
  }
  for (const t of tstatEntries()) {
    items.push({
      kind: "tstat", id: t.id, brand: t.brand || "", equip: "Thermostat",
      title: [t.brand, t.family].filter(Boolean).join(" "),
      sub: (t.models || []).slice(0, 4).join(", "),
      hay: tstatSearchFields(t).filter(Boolean).join(" ").toLowerCase(),
    });
  }
  for (const g of genEntries()) {
    items.push({
      kind: "gen", id: g.id, brand: "Generac", equip: "Generator",
      title: [g.series, g.family].filter(Boolean).join(" · "),
      sub: [g.controller, g.engine].filter(Boolean).join(" · "),
      hay: genSearchFields(g).filter(Boolean).join(" ").toLowerCase(),
    });
  }
  for (const t of getAllToolboxEntries()) {
    items.push({
      kind: "tool", id: t.id, brand: t.brand || "", equip: "",
      title: t.toolName + (t.title ? " — " + t.title : ""),
      sub: [t.brand, t.family].filter(Boolean).join(" · "),
      hay: [t.brand, t.family, t.toolName, t.title, t.whenToUse, t.era, ...(t.platforms || []), ...(t.requirements || []), ...(t.steps || []), ...(t.notes || [])].filter(Boolean).join(" ").toLowerCase(),
    });
  }
  // Manuals: the seed index IS the shared library. openManualDetail() takes the
  // same seed id and handles download-or-open, so a cloud manual works too.
  if (typeof MANUAL_SEEDS !== "undefined") {
    for (const seed of MANUAL_SEEDS) {
      items.push({
        kind: "manual", id: seedIdOf(seed), brand: seed.brand || "", equip: "",
        title: seed.title || (seed.file || "").split("/").pop(),
        sub: [seed.brand, seed.model].filter(Boolean).join(" · "),
        hay: [seed.brand, seed.model, seed.title, seed.notes].filter(Boolean).join(" ").toLowerCase(),
      });
    }
  }
  return items;
}

// How many query concepts a haystack contains — same semantics the codes/
// tstat/gen screens use (word-boundary match, plus a numeric-substring fallback
// so "1100" finds a code embedded in a longer string).
function askUnitHits(units, hay) {
  let score = 0;
  for (const u of units) {
    if (u.alts.some(a => hayHasTerm(hay, a) || (/\d/.test(a) && a.length >= 3 && hay.includes(a)))) score++;
  }
  return score;
}
// Full score, plus a secondary count of concepts that land in the item's
// HEADLINE (code + name) — so for "3 flashes" the row titled "3 flashes" beats
// a "9 flashes" row that only matched the number somewhere in its steps.
function askScoreItem(units, it) {
  const sc = askUnitHits(units, it.hay);
  const tsc = sc ? askUnitHits(units, it.titleHay || (it.title + " " + it.sub).toLowerCase()) : 0;
  return { sc, tsc };
}

function renderAsk() {
  const q = askState.search.trim();
  const examples = document.getElementById("askExamples");
  const results = document.getElementById("askResults");
  const empty = document.getElementById("askEmptyState");
  results.innerHTML = "";

  // A changed question is a fresh search — drop any brand/type narrowing so the
  // follow-up chips reflect the NEW results, not the last query's, and clear the
  // last query's in-manual hits so they don't linger under new results.
  if (q !== askState._lastQ) {
    askState.brand = "All"; askState.equip = "All"; askState._lastQ = q;
    const mh = document.getElementById("askManualHits"); if (mh) mh.innerHTML = "";
    const ai = document.getElementById("askAi"); if (ai) { ai.innerHTML = ""; ai.dataset.answeredFor = ""; }
  }

  if (!askIndexCache) askIndexCache = askBuildIndex();

  // Kind filter: only offer kinds that exist, each with a live count.
  const counts = {};
  for (const it of askIndexCache) counts[it.kind] = (counts[it.kind] || 0) + 1;
  const kindOpts = ["All", ...Object.keys(ASK_KIND).filter(k => counts[k])];
  if (!kindOpts.includes(askState.kind)) askState.kind = "All";
  const kindSel = document.getElementById("askKindChips");
  kindSel.innerHTML = "";
  for (const k of kindOpts) {
    const opt = document.createElement("option");
    opt.value = k;
    opt.textContent = k === "All" ? "Everything" : ASK_KIND[k].label + " (" + counts[k] + ")";
    if (k === askState.kind) opt.selected = true;
    kindSel.appendChild(opt);
  }
  kindSel.onchange = () => { askState.kind = kindSel.value; renderAsk(); };

  // No query yet — show what's in here + tappable example questions.
  if (!q) {
    empty.classList.add("hidden");
    document.getElementById("askNarrow").innerHTML = "";
    document.getElementById("askManualHits").innerHTML = "";
    const total = askIndexCache.length;
    const chips = ASK_EXAMPLES.map(x => `<button class="ask-chip" data-q="${escapeHtml(x)}">${escapeHtml(x)}</button>`).join("");
    examples.innerHTML = `
      <div class="ask-lead">Searches <strong>${total.toLocaleString()}</strong> vetted entries — ${counts.code || 0} codes · ${counts.symptom || 0} fixes · ${counts.tstat || 0} thermostats · ${counts.gen || 0} generators · ${counts.tool || 0} tools · ${counts.manual || 0} manuals. It only shows what's really in here.</div>
      <div class="ask-chip-label">Try:</div>
      <div class="ask-chip-row">${chips}</div>`;
    examples.classList.remove("hidden");
    examples.querySelectorAll(".ask-chip").forEach(b => {
      b.onclick = () => {
        const el = document.getElementById("askInput");
        el.value = b.dataset.q; askState.search = b.dataset.q; renderAsk(); el.focus();
      };
    });
    return;
  }
  examples.classList.add("hidden");

  const units = buildSearchUnits(q);
  const need = units.length;
  const pool = askState.kind === "All" ? askIndexCache : askIndexCache.filter(i => i.kind === askState.kind);

  const scored = [];
  for (const it of pool) {
    const { sc, tsc } = askScoreItem(units, it);
    if (sc > 0) scored.push({ it, sc, tsc });
  }
  // Prefer items that contain EVERY concept; if none do, fall back to the
  // closest partial matches so a well-typed sentence never dead-ends.
  let hits = scored.filter(x => x.sc === need);
  let partial = false;
  if (!hits.length) { hits = scored.filter(x => x.sc >= Math.max(1, Math.ceil(need * 0.6))); partial = hits.length > 0; }
  hits.sort((a, b) => b.sc - a.sc || b.tsc - a.tsc || ASK_KIND[a.it.kind].rank - ASK_KIND[b.it.kind].rank || a.it.title.length - b.it.title.length || a.it.title.localeCompare(b.it.title));

  // ----- Narrowing question -----
  // After a broad first search, ask ONE follow-up (brand, then equipment type)
  // so a 60-hit list collapses to the relevant unit in a tap. Chips are built
  // from the actual matches and only appear when they'd genuinely split the set.
  // Picking a brand keeps brand-less generic fixes too, so a cross-brand answer
  // never vanishes just because the tech named a brand.
  const shown = hits.filter(({ it }) =>
    (askState.brand === "All" || it.brand === askState.brand || !it.brand) &&
    (askState.equip === "All" || it.equip === askState.equip || !it.equip));

  const narrow = document.getElementById("askNarrow");
  narrow.innerHTML = "";

  const activeTags = [];
  if (askState.brand !== "All") activeTags.push(["brand", askState.brand]);
  if (askState.equip !== "All") activeTags.push(["equip", askState.equip]);
  if (activeTags.length) {
    const row = document.createElement("div");
    row.className = "ask-narrow-tags";
    row.innerHTML = activeTags.map(([k, v]) => `<button class="ask-narrow-tag" data-k="${k}">${escapeHtml(v)} <span class="x">✕</span></button>`).join("");
    row.querySelectorAll(".ask-narrow-tag").forEach(b => { b.onclick = () => { askState[b.dataset.k] = "All"; renderAsk(); }; });
    narrow.appendChild(row);
  }

  if (shown.length > 6) {
    const facet = (key) => {
      const m = new Map();
      for (const { it } of shown) { const v = it[key]; if (v) m.set(v, (m.get(v) || 0) + 1); }
      return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    };
    const askQuestion = (label, key, f) => {
      const box = document.createElement("div");
      box.className = "ask-narrow-q";
      box.innerHTML = `<div class="ask-chip-label">${label}</div><div class="ask-chip-row">` +
        f.slice(0, 8).map(([v, n]) => `<button class="ask-chip" data-v="${escapeHtml(v)}">${escapeHtml(v)} <span class="ask-chip-n">${n}</span></button>`).join("") +
        `</div>`;
      box.querySelectorAll(".ask-chip").forEach(b => { b.onclick = () => { askState[key] = b.dataset.v; renderAsk(); }; });
      narrow.appendChild(box);
    };
    const brands = askState.brand === "All" ? facet("brand") : [];
    if (brands.length >= 2) {
      askQuestion("Which brand?", "brand", brands);
    } else if (askState.equip === "All") {
      const equips = facet("equip");
      if (equips.length >= 2) askQuestion("Which type?", "equip", equips);
    }
  }

  empty.classList.toggle("hidden", shown.length !== 0);

  const MAX = 60;
  if (partial && shown.length) {
    const note = document.createElement("div");
    note.className = "ask-note";
    note.textContent = "No exact match — closest entries in the library:";
    results.appendChild(note);
  }
  for (const { it } of shown.slice(0, MAX)) results.appendChild(askCard(it));
  if (shown.length > MAX) {
    const more = document.createElement("div");
    more.className = "ask-note";
    more.textContent = "+" + (shown.length - MAX) + " more — pick a brand or type above, or add a model to narrow it down.";
    results.appendChild(more);
  }

  // Offer a plain-English AI answer (only when the relay is configured).
  renderAskAiControl(q);

  // Also search INSIDE the manuals the tech has downloaded (async, debounced).
  askScheduleManualSearch(q);
}

// Debounced so we don't scan IndexedDB on every keystroke; a token guards
// against a slow scan landing after the query already moved on.
function askScheduleManualSearch(q) {
  clearTimeout(askManualTimer);
  const token = ++askManualToken;
  if (q.trim().length < 3) { document.getElementById("askManualHits").innerHTML = ""; return; }
  askManualTimer = setTimeout(() => askRunManualSearch(q, token), 300);
}

async function askRunManualSearch(q, token) {
  const box = document.getElementById("askManualHits");
  if (!box) return;
  let hits = [];
  try { hits = await searchManualText(q, 12); } catch (e) {}
  if (token !== askManualToken) return;   // superseded by a newer query
  box.innerHTML = "";
  if (hits.length) {
    const head = document.createElement("div");
    head.className = "ask-manual-head";
    head.textContent = "Found inside your downloaded manuals";
    box.appendChild(head);
    for (const h of hits) box.appendChild(askManualCard(h));
    return;
  }
  // Nothing inside the manuals — if none are indexed yet, tell the tech how to
  // make them searchable (this note disappears once any manual is indexed).
  let indexed = 0;
  try { indexed = await manualTextCount(); } catch (e) {}
  if (token !== askManualToken) return;
  if (indexed === 0) {
    const note = document.createElement("div");
    note.className = "ask-note ask-manual-note";
    note.textContent = "Tip: open a manual once on signal and Ask can search inside its pages too.";
    box.appendChild(note);
  }
}

function askManualCard(h) {
  const card = document.createElement("div");
  card.className = "card ask-card ask-manual-card";
  card.onclick = () => openManualAtPage(h.id, h.page);
  const meta = [h.brand, h.model].filter(Boolean).map(escapeHtml).join(" · ");
  card.innerHTML = `
    <div class="card-top">
      <div class="ask-card-text">
        <div class="card-title">${escapeHtml(h.title)}</div>
        <div class="card-meta"><span>${meta}${meta ? " · " : ""}page ${h.page}</span></div>
        <div class="ask-snippet">${escapeHtml(h.snippet)}</div>
      </div>
      <span class="ask-badge ask-badge-manual">Manual</span>
    </div>`;
  return card;
}

// ---- AI answer layer ----
// The keyword search can only point at pages; it can't understand a question
// or bridge the tech's wording to the manual's. This asks a server-side relay
// (which holds the API key) for a plain-English answer, GROUNDED in the manual
// passages + code/fix entries we retrieve on-device. Online only; offline the
// tech still has the full keyword search + manuals.

// Fuller page text around the match, for feeding the model as context.
function askTrimAround(text, units, len) {
  const low = text.toLowerCase();
  let idx = -1;
  for (const u of units) for (const a of u.alts) {
    const p = low.indexOf(a);
    if (p >= 0 && (idx < 0 || p < idx)) idx = p;
  }
  if (idx < 0) idx = 0;
  const start = Math.max(0, idx - Math.floor(len / 3));
  return text.slice(start, start + len).trim();
}
async function askManualPassages(q, limit) {
  const units = buildSearchUnits(q);
  const threshold = Math.max(1, Math.ceil(units.length * 0.5));   // relaxed — context for the model
  let recs = [];
  try { recs = await manualTextGetAll(); } catch (e) { return []; }
  const scored = [];
  for (const rec of recs) {
    if (rec.tv !== TEXT_INDEX_VERSION || !rec.pages) continue;
    for (let i = 0; i < rec.pages.length; i++) {
      const sc = askUnitHits(units, rec.pages[i].toLowerCase());
      if (sc >= threshold) scored.push({ id: rec.id, title: rec.title, page: i + 1, sc, raw: rec.pages[i] });
    }
  }
  scored.sort((a, b) => b.sc - a.sc);
  return scored.slice(0, limit || 4).map(s => ({ id: s.id, title: s.title, page: s.page, text: askTrimAround(s.raw, units, 1200) }));
}
// Top structured entries, with their meaning/steps, for grounding.
function askAiEntries(q, limit) {
  const units = buildSearchUnits(q);
  const idx = askIndexCache || (askIndexCache = askBuildIndex());
  const scored = [];
  for (const it of idx) { const { sc } = askScoreItem(units, it); if (sc > 0) scored.push({ it, sc }); }
  scored.sort((a, b) => b.sc - a.sc);
  return scored.slice(0, limit || 5).map(({ it }) => ({ kind: ASK_KIND[it.kind].label, title: it.title, text: askEntryText(it) }));
}
function askEntryText(it) {
  if (it.kind === "code") { const c = getAllCodes().find(x => x.id === it.id); return c ? [c.meaning, (c.causes || []).join("; "), (c.steps || []).slice(0, 5).join("; ")].filter(Boolean).join(" | ") : ""; }
  if (it.kind === "symptom") { const s = getAllSymptoms().find(x => x.id === it.id); return s ? [s.summary, (s.steps || []).slice(0, 5).join("; ")].filter(Boolean).join(" | ") : ""; }
  return it.sub || "";
}

async function askAiAnswer(question) {
  const box = document.getElementById("askAi");
  if (!box || !ASK_AI_RELAY) return;
  askNoteReask(question);   // did the previous answer go unused before this one?
  const token = ++askAiToken;
  box.dataset.answeredFor = question;
  box.innerHTML = `<div class="ask-ai-card"><div class="ask-ai-status"><span class="ask-ai-spin"></span>Reading your manuals…</div></div>`;
  let passages = [], entries = [];
  try { passages = await askManualPassages(question, 4); } catch (e) {}
  try { entries = askAiEntries(question, 5); } catch (e) {}
  if (token !== askAiToken) return;
  let data = null;
  try {
    const resp = await fetch(ASK_AI_RELAY, { method: "POST", body: JSON.stringify({ question, passages, entries, token: ASK_AI_APP_TOKEN }) });
    data = await resp.json();
  } catch (e) { data = { error: "network" }; }
  if (token !== askAiToken) return;
  if (!data || data.error) {
    const msg = (data && data.error === "network")
      ? "Couldn't reach the answer service — check signal and try again."
      : "AI couldn't answer" + (data && data.error ? " (" + escapeHtml(String(data.error)) + ")" : "") + ".";
    box.innerHTML = `<div class="ask-ai-card ask-ai-err">${msg}</div>`;
    return;
  }
  const cites = passages.map(p => `<button class="ask-ai-cite" data-id="${escapeHtml(p.id)}" data-page="${p.page}">${escapeHtml(p.title)} · p.${p.page}</button>`).join("");
  box.innerHTML = `
    <div class="ask-ai-card">
      <div class="ask-ai-head">🤖 AI answer <span class="ask-ai-tag">verify before field use</span></div>
      <div class="ask-ai-body">${escapeHtml(data.answer).replace(/\n/g, "<br>")}</div>
      ${cites ? `<div class="ask-ai-cites"><span class="ask-ai-cites-label">Sources you can open:</span>${cites}</div>` : ""}
      <div class="ask-fb" data-q="${escapeHtml(question)}">
        <span class="ask-fb-q">Did this help?</span>
        <button class="ask-fb-btn" data-fb="up" type="button" aria-label="Yes, this helped">👍</button>
        <button class="ask-fb-btn" data-fb="down" type="button" aria-label="No, it missed">👎</button>
      </div>`;
  // Opening a source = a quiet "yes, this pointed me somewhere useful."
  box.querySelectorAll(".ask-ai-cite").forEach(b => {
    b.onclick = () => { askMarkEngaged(question); trackEvent("AI opened source: " + question); openManualAtPage(b.dataset.id, Number(b.dataset.page)); };
  });
  wireAskFeedback(box, question);
  // Log EVERY answer with whether the AI actually had a manual to lean on, so
  // even the guys who close it without tapping still tell us what they needed.
  const grounded = passages.length ? ("grounded:" + passages.length + "p") : "no-manual-match";
  trackEvent("AI answered [" + grounded + "]: " + question);
  askLastAnswer = { question: question, ts: Date.now(), engaged: false };
}

// Re-ask / engagement tracking. If a tech gets an answer, doesn't tap anything,
// and fires a reworded question soon after, that silence is itself a signal the
// first answer missed — logged as a quiet thumbs-down.
let askLastAnswer = null;
function askMarkEngaged(question) { if (askLastAnswer && askLastAnswer.question === question) askLastAnswer.engaged = true; }
function askNoteReask(nextQuestion) {
  const prev = askLastAnswer;
  if (!prev || prev.engaged || prev.question === nextQuestion) return;
  if (Date.now() - prev.ts > 5 * 60 * 1000) return;   // only a fresh follow-up counts
  trackEvent("AI reasked: " + prev.question + " -> " + nextQuestion);
  prev.engaged = true;   // don't double-count if they reword again
}

// Thumbs + reason chips on an answer card. One tap on 👍, or one tap on a 👎
// reason, is all it takes — anything typed in the note rides along.
function wireAskFeedback(box, question) {
  const fb = box.querySelector(".ask-fb");
  if (!fb) return;
  fb.querySelector('[data-fb="up"]').onclick = () => {
    askMarkEngaged(question);
    trackEvent("AI up: " + question);
    fb.innerHTML = `<span class="ask-fb-done">✓ Thanks — glad it helped.</span>`;
  };
  fb.querySelector('[data-fb="down"]').onclick = () => {
    askMarkEngaged(question);
    fb.classList.add("ask-fb-open");
    fb.innerHTML = `
      <span class="ask-fb-q">What was off?</span>
      <div class="ask-fb-reasons">
        <button class="ask-fb-reason" data-r="wrong info" type="button">Wrong info</button>
        <button class="ask-fb-reason" data-r="not in manual" type="button">Not in manual</button>
        <button class="ask-fb-reason" data-r="too vague" type="button">Too vague</button>
        <button class="ask-fb-reason" data-r="wrong equipment" type="button">Wrong equipment</button>
      </div>
      <input class="ask-fb-note" type="text" placeholder="What were you looking for? (optional)" maxlength="200">`;
    const noteEl = fb.querySelector(".ask-fb-note");
    fb.querySelectorAll(".ask-fb-reason").forEach(rb => {
      rb.onclick = () => {
        const note = (noteEl.value || "").trim();
        trackEvent("AI down [" + rb.dataset.r + "]: " + question + (note ? " -- " + note : ""));
        fb.innerHTML = `<span class="ask-fb-done">✓ Thanks — we'll tighten this up.</span>`;
      };
    });
  };
}

// The "Get a direct answer" control above the results (only when the relay is
// configured). Enter in the box, or tapping it, fires askAiAnswer.
function renderAskAiControl(q) {
  const box = document.getElementById("askAi");
  if (!box) return;
  if (!ASK_AI_RELAY || q.trim().length < 4) { box.innerHTML = ""; box.dataset.answeredFor = ""; return; }
  if (box.dataset.answeredFor === q) return;   // keep the answer/spinner already shown for this q
  if (!navigator.onLine) {
    box.innerHTML = `<div class="ask-ai-offline">🤖 AI answers need a signal — showing what's saved on this phone.</div>`;
    return;
  }
  box.innerHTML = `<button class="ask-ai-btn" type="button">🤖 Get a direct answer</button>`;
  box.querySelector(".ask-ai-btn").onclick = () => askAiAnswer(q);
}

function askCard(it) {
  const card = document.createElement("div");
  card.className = "card ask-card";
  card.onclick = () => ASK_KIND[it.kind].open(it.id);
  card.innerHTML = `
    <div class="card-top">
      <div class="ask-card-text">
        <div class="card-title">${escapeHtml(it.title)}</div>
        ${it.sub ? `<div class="card-meta"><span>${escapeHtml(it.sub)}</span></div>` : ""}
      </div>
      <span class="ask-badge ask-badge-${it.kind}">${ASK_KIND[it.kind].label}</span>
    </div>`;
  return card;
}

document.getElementById("askInput").addEventListener("input", (e) => { askState.search = e.target.value; renderAsk(); });
// Enter / the phone keyboard's Search-Go key = submit the question: drop the
// keyboard so results are visible (was "just sitting there" behind it), make
// sure they're rendered, and fire the AI answer when the relay is set up.
document.getElementById("askInput").addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  e.preventDefault();
  const q = e.target.value.trim();
  askState.search = q;
  renderAsk();
  e.target.blur();
  if (ASK_AI_RELAY && navigator.onLine && q.length >= 4) askAiAnswer(q);
});

// Voice input — an OPTION on top of typing. Speech-to-text runs through the
// browser's Web Speech API, which on most phones transcribes server-side, so
// the mic needs signal; the search it feeds is fully offline. The button only
// appears where the browser actually supports recognition.
const AskSpeech = window.SpeechRecognition || window.webkitSpeechRecognition;
let askRecognition = null;
let askListening = false;
let askVoiceHintTimer = null;

(function initAskVoice() {
  const btn = document.getElementById("askMicBtn");
  if (!btn || !AskSpeech) return;   // unsupported → leave the mic hidden, typing still works
  btn.classList.remove("hidden");
  btn.addEventListener("click", () => {
    if (askListening) { try { askRecognition && askRecognition.stop(); } catch (e) {} return; }
    startAskVoice();
  });
})();

function showAskVoiceHint(msg) {
  const el = document.getElementById("askVoiceHint");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(askVoiceHintTimer);
  askVoiceHintTimer = setTimeout(() => el.classList.add("hidden"), 4500);
}

function startAskVoice() {
  const btn = document.getElementById("askMicBtn");
  const input = document.getElementById("askInput");
  try { askRecognition = new AskSpeech(); } catch (e) { return; }
  const original = input.getAttribute("placeholder");
  askRecognition.lang = "en-US";
  askRecognition.interimResults = true;   // fill the box live as they speak
  askRecognition.continuous = false;
  askRecognition.maxAlternatives = 1;
  askListening = true;
  btn.classList.add("listening");
  input.setAttribute("placeholder", "Listening… say the code, unit, or problem");
  const hint = document.getElementById("askVoiceHint");
  if (hint) hint.classList.add("hidden");

  askRecognition.onresult = (ev) => {
    let text = "";
    for (let i = ev.resultIndex; i < ev.results.length; i++) text += ev.results[i][0].transcript;
    text = text.trim();
    if (!text) return;
    input.value = text;
    askState.search = text;
    renderAsk();
  };
  askRecognition.onerror = (ev) => {
    const e = ev && ev.error;
    if (e === "not-allowed" || e === "service-not-allowed") showAskVoiceHint("Microphone is blocked — allow mic access in the browser to ask by voice.");
    else if (e === "network") showAskVoiceHint("Voice needs signal to hear you — type it instead when you're offline.");
    else if (e === "no-speech") showAskVoiceHint("Didn't catch that — tap the mic and try again.");
    else if (e === "audio-capture") showAskVoiceHint("No microphone found on this device.");
  };
  askRecognition.onend = () => {
    askListening = false;
    btn.classList.remove("listening");
    input.setAttribute("placeholder", original);
    // Run the search on the FINAL transcript when dictation ends — some browsers
    // deliver the last result and the end event in an order that left the
    // results not yet refreshed, so the screen "just sat there".
    if (input.value.trim()) {
      askState.search = input.value.trim();
      renderAsk();
      trackEvent("asked by voice");
    }
  };

  try { askRecognition.start(); }
  catch (e) { askRecognition.onend(); }
}

// ============================================================
// DIAGNOSTIC HELP (symptoms)
// ============================================================

const DIAG_STORAGE_KEY = "bfc_user_symptoms_v1";
const DIAG_DELETED_KEY = "bfc_deleted_symptom_ids_v1";
let diagState = { search: "", equipment: "All" };

function loadUserSymptoms() { try { return JSON.parse(localStorage.getItem(DIAG_STORAGE_KEY)) || []; } catch { return []; } }
function saveUserSymptoms(list) { safeSet(DIAG_STORAGE_KEY, list); }
function loadDeletedSymptomIds() { try { return JSON.parse(localStorage.getItem(DIAG_DELETED_KEY)) || []; } catch { return []; } }
function saveDeletedSymptomIds(list) { safeSet(DIAG_DELETED_KEY, list); }

function getAllSymptoms() {
  const userSymptoms = loadUserSymptoms();
  const deleted = new Set(loadDeletedSymptomIds());
  const userIds = new Set(userSymptoms.map(s => s.id));
  const base = SYMPTOMS.filter(s => !deleted.has(s.id) && !userIds.has(s.id));
  return [...base, ...userSymptoms.filter(s => !deleted.has(s.id))];
}

function renderSymptoms() {
  const all = getAllSymptoms();
  const equips = ["All", ...uniqueSorted(all.map(s => s.equipment))];
  renderChips("diagEquipChips", equips, diagState.equipment, (v) => { diagState.equipment = v; renderSymptoms(); }, "All Equipment");

  const scoped = all.filter(s => diagState.equipment === "All" || s.equipment === diagState.equipment);
  const fields = (s) => [s.title, s.summary, s.equipment, ...(s.steps || [])];
  const query = diagState.search.trim();

  let filtered, usedFallback = false;
  if (!query) {
    filtered = scoped.slice().sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Score every candidate once against the same concept units, then both
    // decide strict pass/fail AND rank by relevance from that one pass —
    // matches are real answers to a search, not a browse list, so the best
    // one should be first, not buried alphabetically behind an 8th-best hit.
    const units = buildSearchUnits(query);
    const scored = scoped.map(s => {
      const title = (s.title || "").toLowerCase();
      const hay = fields(s).filter(Boolean).join(" ").toLowerCase();
      let score = 0, titleBonus = 0;
      for (const u of units) {
        if (!u.alts.some(a => hayHasTerm(hay, a))) continue;
        score++;
        // Same strict/fallback tier, but a concept that shows up in the TITLE
        // outranks one that only happens to appear somewhere in the steps —
        // "cap is bad" should lead with a capacitor scenario, not whichever
        // unrelated card alphabetically happens to mention "bad" first.
        if (u.alts.some(a => hayHasTerm(title, a))) titleBonus += 0.5;
      }
      return { s, score, rank: score + titleBonus };
    });
    const ranked = (rows) => rows.sort((a, b) => b.rank - a.rank || a.s.title.localeCompare(b.s.title)).map(x => x.s);

    const strict = scored.filter(x => x.score === units.length);
    if (strict.length) {
      filtered = ranked(strict);
    } else {
      // A real sentence with several concepts can legitimately fail a strict
      // all-of-them match. Rather than a dead end, fall back to whatever
      // shares the most concepts with the query. Short queries (1-2 concepts
      // total) only need ONE hit to be worth showing — requiring 2 out of 2
      // would reject every partial match a short search could ever produce.
      const threshold = units.length <= 2 ? 1 : 2;
      const fallback = scored.filter(x => x.score >= threshold);
      if (fallback.length) { filtered = ranked(fallback).slice(0, 8); usedFallback = true; }
      else filtered = [];
    }
  }

  const results = document.getElementById("diagResults");
  const empty = document.getElementById("diagEmptyState");
  results.innerHTML = "";
  empty.classList.toggle("hidden", filtered.length !== 0);
  if (filtered.length === 0) { renderDiagEmptyState(); return; }
  if (usedFallback) {
    const note = document.createElement("div");
    note.className = "diag-fallback-note";
    note.textContent = `No exact match for "${diagState.search.trim()}" — closest topics below.`;
    results.appendChild(note);
  }
  for (const s of filtered) results.appendChild(buildSymptomCard(s));
}

// Nothing local matched. If there's an actual search term and the device is
// online, offer a plain web search — no API key, no backend, no ongoing cost.
// (Deliberately not an AI-generated answer: that would need a server to hold
// a secret key, since anything embedded in this static app's JS is public.)
// Report a dead-end search once the tech has stopped typing. This is the other
// half of the feedback loop: a question the tool couldn't answer is exactly the
// content that should exist, so it goes into the daily digest to be researched
// and added rather than dying silently on someone's phone.
let unansweredTimer = null, lastUnanswered = "";
function reportUnanswered(query) {
  clearTimeout(unansweredTimer);
  unansweredTimer = setTimeout(() => {
    const q = query.trim();
    if (q.length < 4 || q === lastUnanswered) return;
    lastUnanswered = q;
    trackEvent("NO ANSWER FOR: " + q.slice(0, 90));
  }, 3000);
}

function renderDiagEmptyState() {
  const empty = document.getElementById("diagEmptyState");
  const query = diagState.search.trim();
  if (!query) {
    empty.innerHTML = `No matching symptoms. Try a different search, or add this one.`;
    return;
  }
  reportUnanswered(query);
  if (!navigator.onLine) {
    empty.innerHTML = `No matching symptoms for "${escapeHtml(query)}". Try a different search, or add this one. (You're offline — web search isn't available right now.)`;
    return;
  }
  const parts = [query, "hvac troubleshooting"];
  if (diagState.equipment !== "All") parts.unshift(diagState.equipment);
  const searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(parts.join(" "));
  empty.innerHTML = `
    No matching symptoms for "${escapeHtml(query)}". Try a different search, or add this one.
    <div style="margin-top:0.7rem;">
      <a href="${searchUrl}" target="_blank" rel="noopener" class="chip" style="display:inline-block; text-decoration:none;">🔍 Search the web for this</a>
    </div>
  `;
}

function buildSymptomCard(s) {
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = () => openSymptomDetail(s.id);
  card.innerHTML = `
    <div class="card-top">
      <div>
        <div class="card-title">${escapeHtml(s.title)}</div>
      </div>
    </div>
    <div class="card-meta">
      <span>${escapeHtml(s.equipment)}</span>
      ${getFollowups(s.id) ? `<span class="fu-badge">Guided</span>` : ""}
    </div>
    ${s.summary ? `<div class="card-meta">${escapeHtml(s.summary)}</div>` : ""}
  `;
  return card;
}

function openSymptomDetail(id) {
  const s = getAllSymptoms().find(x => x.id === id);
  if (!s) return;
  const modal = document.getElementById("modal");
  const steps = (s.steps || []).map(x => `<li>${escapeHtml(x)}</li>`).join("");
  modal.innerHTML = `
    <h2>${escapeHtml(s.title)}</h2>
    <div class="sub">${escapeHtml(s.equipment)}</div>
    ${s.summary ? `<div class="detail-section"><p>${escapeHtml(s.summary)}</p></div>` : ""}
    <div id="followupBox"></div>
    ${steps ? `<div class="detail-section"><h3>Checklist</h3><ol>${steps}</ol></div>` : ""}
    ${s.safety ? `<div class="safety-box">⚠ ${escapeHtml(s.safety)}</div>` : ""}
    <div class="modal-actions">
      <button id="closeModalBtn">Close</button>
      <button class="primary" id="editSymptomBtn">Edit / correct</button>
    </div>
  `;
  startFollowups(s);
  document.getElementById("closeModalBtn").onclick = closeModal;
  document.getElementById("editSymptomBtn").onclick = () => openSymptomEditForm(s);
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

// ---- Follow-up narrowing questions --------------------------------------
// Finding the right scenario still leaves a tech choosing between the two or
// three causes it lists. These walk that last step: ask for the one reading
// that separates them, then say plainly what it means and what to do — so a
// newer tech gets to an actual answer instead of a checklist to interpret.
const fuState = { symptom: null, questions: null, index: 0, history: [], verdict: null, seen: [], tried: [], fixed: false, exhausted: false };

function getFollowups(id) {
  if (typeof SYMPTOM_FOLLOWUPS === "undefined") return null;
  const list = SYMPTOM_FOLLOWUPS[id];
  return Array.isArray(list) && list.length ? list : null;
}

function startFollowups(s) {
  const questions = getFollowups(s.id);
  fuState.symptom = s;
  fuState.questions = questions;
  fuState.index = 0;
  fuState.history = [];
  fuState.verdict = null;
  fuState.seen = [0];
  fuState.tried = [];
  fuState.fixed = false;
  fuState.exhausted = false;
  renderFollowups();
}

// "Try this -> did it fix it?" loop. The first verdict is the most likely
// thing; if it did not fix the problem the tech should not be left staring at
// one paragraph. "What's next" walks, in order: the next narrowing question
// the chain still has, then the branches of this chain the tech's answers
// skipped (the other things it could be, one at a time), then the checklist.
function fuMarkTried(v) { if (v && !fuState.tried.includes(v)) fuState.tried.push(v); }
function nextUntriedBranch() {
  const qs = fuState.questions || [];
  const answered = fuState.history.map(h => h.verdict).filter(Boolean);
  for (let i = 0; i < qs.length; i++) {
    const q = qs[i];
    for (const o of (q.options || q.bands || [])) {
      const v = o.verdict;
      if (!v || typeof v !== "string") continue;
      if (/^(?:no reading|that is not|not your problem|this is fine|normal)/i.test(v)) continue;
      if (fuState.tried.includes(v) || answered.includes(v)) continue;
      return { ask: q.ask, label: o.label || "", verdict: v, index: i };
    }
  }
  return null;
}
function fuNotFixed() {
  fuMarkTried(fuState.verdict);
  trackEvent("fix did not work, asked for next: " + (fuState.symptom.title || "").slice(0, 60));
  const more = nextOrphanQuestion();
  if (more !== null) {                       // another narrowing question first
    fuState.seen.push(more);
    fuState.index = more;
    fuState.verdict = null;
    renderFollowups();
    return;
  }
  const alt = nextUntriedBranch();           // then the other branches of this chain
  if (alt) {
    fuState.history.push({ ask: "Next thing to try", answer: alt.label ? "If it is instead: " + alt.label : "Another possibility", verdict: "" });
    fuState.verdict = alt.verdict;
    renderFollowups();
    return;
  }
  fuState.exhausted = true;                  // nothing left in the chain - point at the checklist
  fuState.verdict = "";
  renderFollowups();
}
function fuFixed() {
  fuState.fixed = true;
  trackEvent("fix confirmed: " + (fuState.symptom.title || "").slice(0, 60));
  renderFollowups();
}

// The lowest question in this chain that nothing links to and the tech hasn't
// been shown yet, or null. "Linked" means some option or band anywhere in the
// chain carries `next: i` — those are reachable by answering, so they must not
// be offered as leftovers.
function nextOrphanQuestion() {
  const qs = fuState.questions || [];
  const linked = new Set();
  qs.forEach(q => (q.options || q.bands || []).forEach(o => {
    if (typeof o.next === "number") linked.add(o.next);
  }));
  for (let i = 1; i < qs.length; i++) {
    if (!linked.has(i) && !fuState.seen.includes(i)) return i;
  }
  return null;
}

// Both choice options and number bands answer the same way: land on a verdict,
// hand off to a later question, or both (a verdict that still has more to check).
function answerFollowup(outcome, chosenLabel) {
  const q = fuState.questions[fuState.index];
  fuState.history.push({ ask: q.ask, answer: chosenLabel, verdict: outcome.verdict || "" });
  if (typeof outcome.next === "number" && outcome.next > fuState.index && outcome.next < fuState.questions.length) {
    fuState.index = outcome.next;
    fuState.seen.push(outcome.next);
    fuState.verdict = null;
  } else {
    fuState.verdict = outcome.verdict || "";
  }
  renderFollowups();
  if (fuState.verdict) trackEvent("narrowed a diagnosis: " + (fuState.symptom.title || "").slice(0, 60));
}

function renderFollowups() {
  const box = document.getElementById("followupBox");
  if (!box) return;
  if (!fuState.questions) { box.innerHTML = ""; return; }

  // The final answer's verdict gets its own callout below, so don't repeat it
  // inside the trail — the tech should see one conclusion, not the same
  // paragraph twice.
  const history = fuState.history.map((h, i) => {
    const isLast = i === fuState.history.length - 1;
    const showVerdict = h.verdict && !(isLast && fuState.verdict);
    return `
    <div class="fu-answered">
      <div class="fu-answered-q">${escapeHtml(h.ask)}</div>
      <div class="fu-answered-a">${escapeHtml(h.answer)}</div>
      ${showVerdict ? `<div class="fu-answered-v">${escapeHtml(h.verdict)}</div>` : ""}
    </div>
  `;
  }).join("");

  let body = "";
  if (fuState.verdict) {
    // 499 questions across 364 chains were unreachable: they were authored as
    // sequential procedures, but the engine only advances on an explicit
    // `next`, so the first verdict ended the chain and everything after it was
    // dead. 52 of those buried questions carry safety content — A2L
    // ventilation and ignition-source checks before hot work, CO checks, leak
    // checks after gas work, the compressor ground test. Rather than rewrite
    // hundreds of chains, offer the rest of the procedure after the verdict.
    // Chains where every question is properly linked have nothing orphaned and
    // are completely unaffected.
    const more = nextOrphanQuestion();
    const nth = fuState.tried.length;
    body = `
      <div class="fu-verdict"><strong>${nth ? "Next thing to try" : "What it points to"}</strong><p>${escapeHtml(fuState.verdict)}</p></div>
      ${fuState.fixed ? `<div class="fu-done">✅ Fixed — nice. Close it out and note what you found.</div>` : `
      <div class="fu-outcome">
        <button class="fu-opt fu-yes" id="fuFixedBtn">✅ That fixed it</button>
        <button class="fu-opt fu-no" id="fuNotFixedBtn">❌ Didn't fix it — what's next?</button>
      </div>`}
      ${more !== null && !fuState.fixed ? `<button class="fu-more" id="fuMoreBtn">There's more to check on this one →</button>` : ""}
      <button class="fu-restart" id="fuRestartBtn">Start these questions over</button>
    `;
  } else if (fuState.exhausted) {
    body = `
      <div class="fu-verdict fu-exhausted"><strong>That's every branch of this one</strong><p>You've ruled out ${fuState.tried.length} thing${fuState.tried.length === 1 ? "" : "s"} here. Work the checklist below in order — it covers the same causes the long way — and if it still doesn't land, search Diagnostic Help for the symptom again; a neighbouring scenario may fit better. Send it in from Request Info if the app missed it.</p></div>
      <button class="fu-restart" id="fuRestartBtn">Start these questions over</button>
    `;
  } else {
    const q = fuState.questions[fuState.index];
    body = `<div class="fu-ask">${escapeHtml(q.ask)}</div>` + (q.type === "number" ? renderFollowupNumber(q) : renderFollowupChoice(q));
  }

  box.innerHTML = `
    <div class="fu-wrap">
      <div class="fu-head">Narrow it down</div>
      ${history}
      ${body}
    </div>
  `;

  const restart = document.getElementById("fuRestartBtn");
  if (restart) restart.onclick = () => startFollowups(fuState.symptom);
  const yes = document.getElementById("fuFixedBtn"); if (yes) yes.onclick = fuFixed;
  const no = document.getElementById("fuNotFixedBtn"); if (no) no.onclick = fuNotFixed;
  const moreBtn = document.getElementById("fuMoreBtn");
  if (moreBtn) moreBtn.onclick = () => {
    const idx = nextOrphanQuestion();
    if (idx === null) return;
    fuMarkTried(fuState.verdict);
    fuState.seen.push(idx);
    fuState.index = idx;
    fuState.verdict = null;
    renderFollowups();
  };
  if (fuState.verdict || fuState.exhausted) return;

  const q = fuState.questions[fuState.index];
  if (q.type === "number") {
    document.getElementById("fuCalcBtn").onclick = () => submitFollowupNumber(q);
    const skip = document.getElementById("fuSkipBtn");
    if (skip) skip.onclick = () => answerFollowup(skipOutcome(q), "Could not measure it");
  } else {
    box.querySelectorAll(".fu-opt").forEach((btn, i) => {
      btn.onclick = () => answerFollowup(q.options[i], q.options[i].label);
    });
  }
}

function renderFollowupChoice(q) {
  return `<div class="fu-opts">` + (q.options || []).map(o =>
    `<button class="fu-opt">${escapeHtml(o.label)}</button>`
  ).join("") + `</div>`;
}

function renderFollowupNumber(q) {
  const fields = (q.fields || []).map(f => `
    <label class="fu-field">
      <span>${escapeHtml(f.label)}</span>
      <input type="number" step="any" inputmode="decimal" id="fu-f-${escapeHtml(f.key)}" placeholder="${escapeHtml(f.placeholder || "")}">
    </label>
  `).join("");
  return `
    <div class="fu-fields">${fields}</div>
    <div class="fu-num-actions">
      <button class="fu-opt fu-calc" id="fuCalcBtn">Check it</button>
      <button class="fu-skip" id="fuSkipBtn">I can't measure this</button>
    </div>
    <div class="fu-err hidden" id="fuErr"></div>
  `;
}

// A tech who can't get the reading shouldn't hit a dead end — jump to the next
// question if there is one, otherwise fall through to the checklist below.
function skipOutcome(q) {
  const rest = fuState.index + 1;
  if (rest < fuState.questions.length) return { next: rest };
  return { verdict: "No reading to go on — work the checklist below in order; it covers the same causes the long way." };
}

function submitFollowupNumber(q) {
  const fields = q.fields || [];
  const vals = fields.map(f => parseFloat((document.getElementById("fu-f-" + f.key) || {}).value));
  const err = document.getElementById("fuErr");
  const showErr = (msg) => { if (err) { err.textContent = msg; err.classList.remove("hidden"); } };
  if (vals.some(v => !isFinite(v))) {
    // Said "both numbers" on every question, but 7 of the 8 number questions
    // have a single field — asking for a second number that isn't on screen.
    showErr(fields.length > 1
      ? "Fill in both numbers, or tap \"I can't measure this\"."
      : "Enter a number, or tap \"I can't measure this\".");
    return;
  }
  let metric;
  if (q.compare === "ratio") {
    if (fields.length !== 2) { showErr("This question is set up wrong — tell the office. Tap \"I can't measure this\" to keep going."); return; }
    if (!vals[1]) { showErr("The second number can't be zero."); return; }
    metric = vals[0] / vals[1];
  } else {
    metric = vals[0];
  }
  // Fail LOUDLY on a malformed question. The old line read
  // `(q.bands||[]).find(...) || (q.bands||[])[q.bands.length-1]`, which threw
  // on undefined bands (so "Check it" just did nothing, with the error only in
  // the console), silently no-opped on an empty bands array, and — worst —
  // when no band matched it fell back to the LAST band and showed its label as
  // if it had matched, i.e. a confidently wrong answer off a real measurement.
  const bands = Array.isArray(q.bands) ? q.bands : [];
  if (!bands.length) { showErr("This question is set up wrong — tell the office. Tap \"I can't measure this\" to keep going."); return; }
  const band = bands.find(b => typeof b.under !== "number" || metric < b.under);
  if (!band) { showErr("That reading is outside every range this question covers — tell the office. Tap \"I can't measure this\" to keep going."); return; }
  const shown = q.compare === "ratio"
    ? `${vals[0]} vs ${vals[1]} (${Math.round(metric * 100)}%) — ${band.label}`
    : `${vals[0]} — ${band.label}`;
  answerFollowup(band, shown);
}

function openSymptomEditForm(existing) {
  const modal = document.getElementById("modal");
  const isNew = !existing;
  const s = existing || { equipment: "Gas Furnace", title: "", summary: "", steps: [], safety: "" };
  modal.innerHTML = `
    <h2>${isNew ? "Add a symptom" : "Edit symptom"}</h2>
    <div class="sub">Saved on this device.</div>
    <div class="form-field"><label>Equipment type</label>
      <select id="f-equipment">${["Gas Furnace","Electric Furnace","Condenser/Heat Pump","Air Handler","Mini-Split","Other"].map(o => `<option value="${o}" ${s.equipment===o?"selected":""}>${o}</option>`).join("")}</select>
    </div>
    <div class="form-field"><label>Symptom title</label><input id="f-title" value="${escapeHtml(s.title)}" placeholder="e.g. No heat — gas furnace"></div>
    <div class="form-field"><label>Summary</label><textarea id="f-summary">${escapeHtml(s.summary || "")}</textarea></div>
    <div class="form-field"><label>Checklist steps (one per line, in order)</label><textarea id="f-steps">${escapeHtml((s.steps||[]).join("\n"))}</textarea></div>
    <div class="form-field"><label>Safety note (optional)</label><textarea id="f-safety">${escapeHtml(s.safety || "")}</textarea></div>
    <div class="modal-actions">
      <button id="cancelEditBtn">Cancel</button>
      ${!isNew ? `<button class="danger" id="deleteSymptomBtn">Delete</button>` : ""}
      <button class="primary" id="saveSymptomBtn">Save</button>
    </div>
  `;
  document.getElementById("cancelEditBtn").onclick = () => existing ? openSymptomDetail(existing.id) : closeModal();
  if (!isNew) {
    document.getElementById("deleteSymptomBtn").onclick = () => {
      if (!confirm("Delete this symptom from your device?")) return;
      saveDeletedSymptomIds([...loadDeletedSymptomIds(), existing.id]);
      saveUserSymptoms(loadUserSymptoms().filter(u => u.id !== existing.id));
      closeModal(); renderSymptoms();
    };
  }
  document.getElementById("saveSymptomBtn").onclick = () => {
    const title = document.getElementById("f-title").value.trim();
    if (!title) { alert("Title is required."); return; }
    const entry = {
      id: existing ? existing.id : "user-symptom-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      equipment: document.getElementById("f-equipment").value,
      title,
      summary: document.getElementById("f-summary").value.trim(),
      steps: document.getElementById("f-steps").value.split("\n").map(s => s.trim()).filter(Boolean),
      safety: document.getElementById("f-safety").value.trim(),
    };
    const userSymptoms = loadUserSymptoms().filter(u => u.id !== entry.id);
    userSymptoms.push(entry);
    saveUserSymptoms(userSymptoms);
    if (existing) saveDeletedSymptomIds(loadDeletedSymptomIds().filter(id => id !== entry.id));
    closeModal(); renderSymptoms();
  };
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

document.getElementById("diagSearchInput").addEventListener("input", (e) => { diagState.search = e.target.value; renderSymptoms(); });

// ============================================================
// TOOLBOX (board programming tools — CoolCloud, Data Loader, etc.)
// ============================================================

const TOOLBOX_STORAGE_KEY = "bfc_user_toolbox_v1";
const TOOLBOX_DELETED_KEY = "bfc_deleted_toolbox_ids_v1";
let toolboxState = { search: "", brand: "All", era: "All" };
const TOOLBOX_ERA_LABEL = { current: "Current", legacy: "Legacy" };

function loadUserToolbox() { try { return JSON.parse(localStorage.getItem(TOOLBOX_STORAGE_KEY)) || []; } catch { return []; } }
function saveUserToolbox(list) { safeSet(TOOLBOX_STORAGE_KEY, list); }
function loadDeletedToolboxIds() { try { return JSON.parse(localStorage.getItem(TOOLBOX_DELETED_KEY)) || []; } catch { return []; } }
function saveDeletedToolboxIds(list) { safeSet(TOOLBOX_DELETED_KEY, list); }

function getAllToolboxEntries() {
  const userEntries = loadUserToolbox();
  const deleted = new Set(loadDeletedToolboxIds());
  const userIds = new Set(userEntries.map(t => t.id));
  const base = TOOLBOX.filter(t => !deleted.has(t.id) && !userIds.has(t.id));
  return [...base, ...userEntries.filter(t => !deleted.has(t.id))];
}

function renderToolbox() {
  const all = getAllToolboxEntries();
  const brands = ["All", ...uniqueSorted(all.map(t => t.brand))];
  renderChips("toolboxBrandChips", brands, toolboxState.brand, (v) => { toolboxState.brand = v; renderToolbox(); }, "All Brands");
  const eras = ["All", ...uniqueSorted(all.map(t => TOOLBOX_ERA_LABEL[t.era] || "").filter(Boolean))];
  renderChips("toolboxEraChips", eras, toolboxState.era, (v) => { toolboxState.era = v; renderToolbox(); }, "Current + Legacy");

  const filtered = all.filter(t =>
    (toolboxState.brand === "All" || t.brand === toolboxState.brand) &&
    (toolboxState.era === "All" || (TOOLBOX_ERA_LABEL[t.era] || "") === toolboxState.era) &&
    textIncludes([t.brand, t.family, t.toolName, t.title, t.whenToUse, t.era, ...(t.platforms||[]), ...(t.requirements||[]), ...(t.steps||[]), ...(t.notes||[])], toolboxState.search)
  ).sort((a, b) => a.brand.localeCompare(b.brand) || ((a.era === "legacy") - (b.era === "legacy")) || a.toolName.localeCompare(b.toolName));

  const results = document.getElementById("toolboxResults");
  const empty = document.getElementById("toolboxEmptyState");
  results.innerHTML = "";
  empty.classList.toggle("hidden", filtered.length !== 0);
  for (const t of filtered) results.appendChild(buildToolboxCard(t));
}

function buildToolboxCard(t) {
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = () => openToolboxDetail(t.id);
  const confTag = t.confidence === "verify" ? `<span class="tag verify">verify</span>` : `<span class="tag common">common</span>`;
  card.innerHTML = `
    <div class="card-top">
      <div>
        <div class="card-code">${escapeHtml(t.toolName)}</div>
        <div class="card-title">${escapeHtml(t.title)}</div>
      </div>
      ${confTag}
    </div>
    <div class="card-meta">
      <span>${escapeHtml(t.brand)}${t.family ? " · " + escapeHtml(t.family) : ""}</span>
    </div>
    ${(t.era || (t.platforms || []).length) ? `<div class="tstat-badges">
      ${t.era ? `<span class="tstat-badge ${t.era === "legacy" ? "tbx-legacy" : "tbx-current"}">${escapeHtml(TOOLBOX_ERA_LABEL[t.era] || t.era)}</span>` : ""}
      ${(t.platforms || []).map(p => `<span class="tstat-badge">${escapeHtml(p)}</span>`).join("")}
    </div>` : ""}
  `;
  return card;
}

function openToolboxDetail(id) {
  const t = getAllToolboxEntries().find(x => x.id === id);
  if (!t) return;
  const modal = document.getElementById("modal");
  const requirements = (t.requirements || []).map(r => `<li>${escapeHtml(r)}</li>`).join("");
  const steps = (t.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join("");
  const notes = (t.notes || []).map(n => `<li>${escapeHtml(n)}</li>`).join("");
  const eraLine = t.era ? `<span class="tstat-badge ${t.era === "legacy" ? "tbx-legacy" : "tbx-current"}">${escapeHtml(TOOLBOX_ERA_LABEL[t.era] || t.era)}</span>` : "";
  const platLine = (t.platforms || []).map(p => `<span class="tstat-badge">${escapeHtml(p)}</span>`).join("");
  const manualBtns = (t.manuals || []).map(m => {
    const seed = typeof tstatFindSeed === "function" ? tstatFindSeed(m) : null;
    const label = escapeHtml(m.title || (seed && seed.title) || "Manual");
    if (seed) return `<button class="tstat-manual-btn" data-seed="${escapeHtml(seed.file)}">${label}</button>`;
    return "";
  }).join("");
  const linkBtns = (t.links || []).filter(l => l && l.url).map(l => `<a class="tstat-manual-btn ext" href="${escapeHtml(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label || l.url)} <span class="tstat-note">opens in browser - needs signal</span></a>`).join("");
  modal.innerHTML = `
    <h2>${escapeHtml(t.toolName)} — ${escapeHtml(t.title)}</h2>
    <div class="sub">${escapeHtml(t.brand)}${t.family ? " · " + escapeHtml(t.family) : ""}</div>
    ${(eraLine || platLine) ? `<div class="tstat-badges">${eraLine}${platLine}</div>` : ""}
    <div class="detail-section"><h3>When to use it</h3><p>${escapeHtml(t.whenToUse || "—")}</p></div>
    ${requirements ? `<div class="detail-section"><h3>What you need</h3><ul>${requirements}</ul></div>` : ""}
    ${steps ? `<div class="detail-section"><h3>Steps</h3><ol>${steps}</ol></div>` : ""}
    ${t.caution ? `<div class="caution-box">⚠ ${escapeHtml(t.caution)}</div>` : ""}
    ${notes ? `<div class="detail-section"><h3>Good to know</h3><ul>${notes}</ul></div>` : ""}
    ${(manualBtns || linkBtns) ? `<div class="detail-section"><h3>Guides &amp; links</h3><div class="tstat-manuals">${manualBtns}${linkBtns}</div></div>` : ""}
    ${t.source ? `<div class="detail-section"><p class="tstat-source">Source: ${escapeHtml(t.source)}</p></div>` : ""}
    <div class="modal-actions">
      <button id="closeModalBtn">Close</button>
      <button class="primary" id="editToolboxBtn">Edit / correct</button>
    </div>
  `;
  document.getElementById("closeModalBtn").onclick = closeModal;
  document.getElementById("editToolboxBtn").onclick = () => openToolboxEditForm(t);
  modal.querySelectorAll(".tstat-manual-btn[data-seed]").forEach(btn => {
    btn.onclick = () => { trackEvent("opened toolbox guide: " + btn.textContent.trim().slice(0, 60)); openManualDetail(seedIdOf({ file: btn.dataset.seed })); };
  });
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

function openToolboxEditForm(existing) {
  const modal = document.getElementById("modal");
  const isNew = !existing;
  const t = existing || { brand: "", family: "", toolName: "", equipment: "Other", title: "", whenToUse: "", requirements: [], steps: [], caution: "", confidence: "verify" };
  modal.innerHTML = `
    <h2>${isNew ? "Add a tool" : "Edit tool"}</h2>
    <div class="sub">Saved on this device.</div>
    <div class="form-field"><label>Brand</label><input id="f-brand" value="${escapeHtml(t.brand)}" placeholder="e.g. Carrier"></div>
    <div class="form-field"><label>Family / applies to (optional)</label><input id="f-family" value="${escapeHtml(t.family || "")}" placeholder="e.g. Infinity / Evolution"></div>
    <div class="form-field"><label>Tool name</label><input id="f-toolname" value="${escapeHtml(t.toolName)}" placeholder="e.g. CoolCloud HVAC App"></div>
    <div class="form-field"><label>Title</label><input id="f-title" value="${escapeHtml(t.title)}" placeholder="Short description of the procedure"></div>
    <div class="form-field"><label>When to use it</label><textarea id="f-when">${escapeHtml(t.whenToUse || "")}</textarea></div>
    <div class="form-field"><label>What you need (one per line)</label><textarea id="f-requirements">${escapeHtml((t.requirements||[]).join("\n"))}</textarea></div>
    <div class="form-field"><label>Steps (one per line, in order)</label><textarea id="f-steps">${escapeHtml((t.steps||[]).join("\n"))}</textarea></div>
    <div class="form-field"><label>Caution (optional)</label><textarea id="f-caution">${escapeHtml(t.caution || "")}</textarea></div>
    <div class="form-field"><label>Confidence</label>
      <select id="f-confidence">
        <option value="verify" ${t.confidence==="verify"?"selected":""}>Needs verification</option>
        <option value="common" ${t.confidence==="common"?"selected":""}>Confirmed / commonly reliable</option>
      </select>
    </div>
    <div class="modal-actions">
      <button id="cancelEditBtn">Cancel</button>
      ${!isNew ? `<button class="danger" id="deleteToolboxBtn">Delete</button>` : ""}
      <button class="primary" id="saveToolboxBtn">Save</button>
    </div>
  `;
  document.getElementById("cancelEditBtn").onclick = () => existing ? openToolboxDetail(existing.id) : closeModal();
  if (!isNew) {
    document.getElementById("deleteToolboxBtn").onclick = () => {
      if (!confirm("Delete this tool entry from your device?")) return;
      saveDeletedToolboxIds([...loadDeletedToolboxIds(), existing.id]);
      saveUserToolbox(loadUserToolbox().filter(u => u.id !== existing.id));
      closeModal(); renderToolbox();
    };
  }
  document.getElementById("saveToolboxBtn").onclick = () => {
    const brand = document.getElementById("f-brand").value.trim();
    const toolName = document.getElementById("f-toolname").value.trim();
    const title = document.getElementById("f-title").value.trim();
    if (!brand || !toolName || !title) { alert("Brand, tool name, and title are required."); return; }
    const entry = {
      id: existing ? existing.id : "user-toolbox-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      brand, family: document.getElementById("f-family").value.trim(),
      toolName, title,
      whenToUse: document.getElementById("f-when").value.trim(),
      requirements: document.getElementById("f-requirements").value.split("\n").map(s => s.trim()).filter(Boolean),
      steps: document.getElementById("f-steps").value.split("\n").map(s => s.trim()).filter(Boolean),
      caution: document.getElementById("f-caution").value.trim(),
      confidence: document.getElementById("f-confidence").value,
    };
    const userEntries = loadUserToolbox().filter(u => u.id !== entry.id);
    userEntries.push(entry);
    saveUserToolbox(userEntries);
    if (existing) saveDeletedToolboxIds(loadDeletedToolboxIds().filter(id => id !== entry.id));
    closeModal(); renderToolbox();
  };
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

document.getElementById("toolboxSearchInput").addEventListener("input", (e) => { toolboxState.search = e.target.value; renderToolbox(); });

// ============================================================
// THERMOSTATS - one card per thermostat family: terminals, wiring
// notes, installer setup, on-screen codes, troubleshooting, and the
// official manuals (opened in the in-app reader when they are in the
// library). Data lives in thermostats.js (THERMOSTATS), organized
// from manufacturer install guides only.
// ============================================================

const TSTAT_TYPE_LABELS = {
  "smart-wifi": "Smart / Wi-Fi",
  "communicating": "Communicating",
  "programmable": "Programmable",
  "non-programmable": "Non-programmable",
  "wireless-redlink": "Wireless (RedLINK)",
  "zone-control": "Zone control",
  "accessory": "Accessory / adapter",
};
const TSTAT_TYPE_ORDER = ["smart-wifi", "communicating", "programmable", "non-programmable", "wireless-redlink", "zone-control", "accessory"];
let tstatState = { search: "", brand: "All", type: "All" };

function tstatEntries() { return (typeof THERMOSTATS !== "undefined") ? THERMOSTATS : []; }

// Techs type partial model numbers ("TH6220", "1F85", "T755") - whole-token
// matching would miss TH6220U2000, so any query word containing a digit also
// matches as a plain substring of the model/code text.
function tstatIncludes(fields, q) {
  if (!q) return true;
  const hay = fields.filter(Boolean).join(" ").toLowerCase();
  return buildSearchUnits(q).every(u => u.alts.some(a => hayHasTerm(hay, a) || (/\d/.test(a) && a.length >= 3 && hay.includes(a))));
}

function tstatSearchFields(t) {
  return [
    t.brand, t.family, (t.models || []).join(" "), t.aka, TSTAT_TYPE_LABELS[t.type] || t.type, t.stages,
    ...(t.terminals || []).map(x => x.t + " " + x.fn),
    ...(t.diagnostics || []).map(x => x.code + " " + x.meaning),
    ...(t.troubleshooting || []).map(x => x.symptom),
    ...(t.wiringNotes || []),
    ...(t.manuals || []).map(x => x.title),
  ];
}

function renderTstats() {
  const all = tstatEntries();
  const brands = ["All", ...uniqueSorted(all.map(t => t.brand))];
  renderChips("tstatBrandChips", brands, tstatState.brand, (v) => { tstatState.brand = v; renderTstats(); }, "All Brands");
  const typesPresent = new Set(all.map(t => t.type));
  const typeSel = document.getElementById("tstatTypeChips");
  typeSel.innerHTML = "";
  for (const v of ["All", ...TSTAT_TYPE_ORDER.filter(x => typesPresent.has(x))]) {
    const opt = document.createElement("option");
    opt.value = v; opt.textContent = v === "All" ? "All Types" : TSTAT_TYPE_LABELS[v];
    if (v === tstatState.type) opt.selected = true;
    typeSel.appendChild(opt);
  }
  typeSel.onchange = () => { tstatState.type = typeSel.value; renderTstats(); };

  const filtered = all.filter(t =>
    (tstatState.brand === "All" || t.brand === tstatState.brand) &&
    (tstatState.type === "All" || t.type === tstatState.type) &&
    tstatIncludes(tstatSearchFields(t), tstatState.search)
  ).sort((a, b) => a.brand.localeCompare(b.brand) || (a.sort || 0) - (b.sort || 0) || a.family.localeCompare(b.family));

  const results = document.getElementById("tstatResults");
  const empty = document.getElementById("tstatEmptyState");
  results.innerHTML = "";
  empty.classList.toggle("hidden", filtered.length !== 0);
  for (const t of filtered) results.appendChild(buildTstatCard(t));
}

function tstatPowerBadge(t) {
  const c = t.power && t.power.cWire;
  if (c === "required") return `<span class="tstat-badge need-c">C wire required</span>`;
  if (c === "optional") return `<span class="tstat-badge opt-c">C wire optional</span>`;
  if (c === "not-used") return `<span class="tstat-badge no-c">No C wire</span>`;
  return "";
}

function buildTstatCard(t) {
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = () => openTstatDetail(t.id);
  const models = (t.models || []);
  const shown = models.slice(0, 4).join(", ") + (models.length > 4 ? ` +${models.length - 4} more` : "");
  const nCodes = (t.diagnostics || []).length;
  const nDocs = (t.manuals || []).length;
  card.innerHTML = `
    <div class="card-top">
      ${t.img ? `<img class="tstat-thumb" src="${escapeHtml(t.img)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
      <div class="tstat-card-text">
        <div class="card-code">${escapeHtml(t.family)}</div>
        <div class="card-title">${escapeHtml(t.brand)}${t.aka ? " · " + escapeHtml(t.aka) : ""}</div>
      </div>
      <span class="tag ${t.confidence === "common" ? "common" : "verify"}">${TSTAT_TYPE_LABELS[t.type] ? escapeHtml(TSTAT_TYPE_LABELS[t.type]) : "verify"}</span>
    </div>
    <div class="card-meta">
      ${shown ? `<span>${escapeHtml(shown)}</span>` : ""}
    </div>
    <div class="tstat-badges">
      ${tstatPowerBadge(t)}
      ${(t.terminals || []).length ? `<span class="tstat-badge">${(t.terminals || []).length} terminals</span>` : ""}
      ${nCodes ? `<span class="tstat-badge">${nCodes} codes</span>` : ""}
      ${nDocs ? `<span class="tstat-badge">${nDocs} manual${nDocs === 1 ? "" : "s"}</span>` : ""}
    </div>
  `;
  return card;
}

// Which seed manual (if any) a thermostat's manual reference points at, so
// the button opens the in-app reader instead of leaving the app.
function tstatFindSeed(ref) {
  if (!ref || typeof MANUAL_SEEDS === "undefined") return null;
  const key = (ref.seedFile || ref.url || "").split("/").pop().toLowerCase();
  if (!key) return null;
  return MANUAL_SEEDS.find(s => s.file.split("/").pop().toLowerCase() === key || (s.filename || "").toLowerCase() === key) || null;
}

function tstatHit(text, q) {
  if (!q) return false;
  const hay = String(text || "").toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).some(w => w.length >= 2 && hay.includes(w));
}

function openTstatDetail(id) {
  const t = tstatEntries().find(x => x.id === id);
  if (!t) return;
  const q = tstatState.search;
  const modal = document.getElementById("modal");
  const p = t.power || {};
  const cWireText = { required: "C (common) wire REQUIRED", optional: "C wire optional", "not-used": "No C wire used" }[p.cWire] || "";
  const powerBits = [cWireText, p.batteries ? "Batteries: " + p.batteries : "", p.notes].filter(Boolean);

  const termRows = (t.terminals || []).map(x => `
    <tr class="${tstatHit(x.t + " " + x.fn, q) ? "hit" : ""}"><td class="tstat-term${String(x.t).length <= 10 ? " short" : ""}">${escapeHtml(x.t)}</td><td>${escapeHtml(x.fn)}${x.notes ? `<div class="tstat-note">${escapeHtml(x.notes)}</div>` : ""}</td></tr>`).join("");
  const wiringNotes = (t.wiringNotes || []).map(s => `<li>${escapeHtml(s)}</li>`).join("");
  const s = t.setup || {};
  const settingRows = (s.keySettings || []).map(x => `
    <tr><td class="tstat-term${String(x.setting).length <= 10 ? " short" : ""}">${escapeHtml(x.setting)}</td><td>${escapeHtml(x.options || "")}${x.notes ? `<div class="tstat-note">${escapeHtml(x.notes)}</div>` : ""}</td></tr>`).join("");
  const diagRows = (t.diagnostics || []).map(x => `
    <tr class="${tstatHit(x.code + " " + x.meaning, q) ? "hit" : ""}"><td class="tstat-term${String(x.code).length <= 10 ? " short" : ""}">${escapeHtml(x.code)}</td><td><b>${escapeHtml(x.meaning)}</b>${x.action ? `<div class="tstat-note">${escapeHtml(x.action)}</div>` : ""}</td></tr>`).join("");
  const tsBlocks = (t.troubleshooting || []).map(x => `
    <div class="tstat-ts ${tstatHit(x.symptom, q) ? "hit" : ""}"><b>${escapeHtml(x.symptom)}</b>
      ${(x.causes || []).length ? `<div class="tstat-note">Check: ${escapeHtml((x.causes || []).join(" · "))}</div>` : ""}
      ${(x.fixes || []).length ? `<ul>${(x.fixes || []).map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul>` : ""}
    </div>`).join("");
  const manualBtns = (t.manuals || []).map((m, i) => {
    const seed = tstatFindSeed(m);
    const label = escapeHtml(m.title || (seed && seed.title) || "Manual");
    const kind = m.docType ? `<span class="tstat-doctype">${escapeHtml(m.docType)}</span>` : "";
    if (seed) return `<button class="tstat-manual-btn" data-seed="${escapeHtml(seed.file)}">${kind}${label}</button>`;
    if (m.url) return `<a class="tstat-manual-btn ext" href="${escapeHtml(m.url)}" target="_blank" rel="noopener">${kind}${label} <span class="tstat-note">opens in browser - needs signal</span></a>`;
    return "";
  }).join("");
  const models = (t.models || []).join(", ");

  modal.innerHTML = `
    ${t.img ? `<img class="tstat-hero" src="${escapeHtml(t.img)}" alt="" onerror="this.remove()">` : ""}
    <h2>${escapeHtml(t.family)}</h2>
    <div class="sub">${escapeHtml(t.brand)}${t.aka ? " · " + escapeHtml(t.aka) : ""} · ${escapeHtml(TSTAT_TYPE_LABELS[t.type] || t.type || "")}${t.stages ? " · " + escapeHtml(t.stages) : ""}</div>
    ${models ? `<div class="detail-section"><h3>Models</h3><p class="tstat-models">${escapeHtml(models)}</p></div>` : ""}
    ${powerBits.length ? `<div class="detail-section"><h3>Power</h3><p>${powerBits.map(escapeHtml).join("<br>")}</p></div>` : ""}
    ${termRows ? `<div class="detail-section"><h3>Terminals</h3><table class="tstat-table">${termRows}</table></div>` : ""}
    ${wiringNotes ? `<div class="detail-section"><h3>Wiring notes</h3><ul>${wiringNotes}</ul></div>` : ""}
    ${(s.access || settingRows || s.factoryReset || s.installerTest) ? `<div class="detail-section"><h3>Installer setup</h3>
      ${s.access ? `<p><b>Get in:</b> ${escapeHtml(s.access)}</p>` : ""}
      ${settingRows ? `<table class="tstat-table">${settingRows}</table>` : ""}
      ${s.installerTest ? `<p><b>System test:</b> ${escapeHtml(s.installerTest)}</p>` : ""}
      ${s.factoryReset ? `<p><b>Factory reset:</b> ${escapeHtml(s.factoryReset)}</p>` : ""}
    </div>` : ""}
    ${diagRows ? `<div class="detail-section"><h3>Codes &amp; alerts</h3><table class="tstat-table">${diagRows}</table></div>` : ""}
    ${tsBlocks ? `<div class="detail-section"><h3>Troubleshooting</h3>${tsBlocks}</div>` : ""}
    ${(t.tips || []).length ? `<div class="detail-section"><h3>Field notes</h3><ul>${(t.tips || []).map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>` : ""}
    ${manualBtns ? `<div class="detail-section"><h3>Manuals</h3><div class="tstat-manuals">${manualBtns}</div></div>` : ""}
    ${t.sourceNotes ? `<div class="detail-section"><p class="tstat-source">Source: ${escapeHtml(t.sourceNotes)}</p></div>` : ""}
    <div class="modal-actions">
      <button id="closeModalBtn">Close</button>
    </div>
  `;
  document.getElementById("closeModalBtn").onclick = closeModal;
  modal.querySelectorAll(".tstat-manual-btn[data-seed]").forEach(btn => {
    btn.onclick = () => { trackEvent("opened thermostat manual: " + btn.textContent.trim().slice(0, 60)); openManualDetail(seedIdOf({ file: btn.dataset.seed })); };
  });
  const firstHit = modal.querySelector(".hit");
  document.getElementById("modalBackdrop").classList.remove("hidden");
  if (firstHit) setTimeout(() => firstHit.scrollIntoView({ block: "center" }), 50);
  trackEvent("viewed thermostat: " + t.brand + " " + t.family);
}

document.getElementById("tstatSearchInput").addEventListener("input", (e) => { tstatState.search = e.target.value; renderTstats(); });

// ============================================================
// GENERATORS - Generac air-cooled home standby: one card per family
// (units sharing a controller + engine + manual set). Alarm/warning
// codes, specs, maintenance, troubleshooting and the official manuals
// (opened in the in-app reader when they are in the library). Data
// lives in generators.js (GENERATORS), organized from Generac's own
// owner's/install manuals and support articles only.
// ============================================================

let genState = { search: "", series: "All", ctrl: "All" };

function genEntries() { return (typeof GENERATORS !== "undefined") ? GENERATORS : []; }

// A tech types "7043", "G0070430", "007043-0", "22kw" or a code like "1100".
// Normalise the model forms so all of them hit the same family.
function genNormModel(s) {
  const u = String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  let m;
  if ((m = u.match(/^G?0{1,2}(\d{4})(\d)?$/))) return m[1];         // G0070430 / 0070430 / 007043-0 -> 7043
  if ((m = u.match(/^(\d{4})$/))) return m[1];
  return "";
}
function genSearchFields(g) {
  return [
    g.series, g.family, g.controller, g.engine, (g.kw || []).map(k => k + "kw " + k + " kw").join(" "),
    ...(g.models || []).map(m => [m.g, m.digits, m.desc, "0" + m.digits, "00" + m.digits].join(" ")),
    ...(g.alarms || []).map(a => a.code + " " + a.name + " " + a.meaning),
    ...(g.warnings || []).map(a => a.code + " " + a.name + " " + a.meaning),
    ...(g.troubleshooting || []).map(x => x.symptom),
    ...(() => { const st = genStartupFor(g); return st ? (st.groups || []).flatMap(gr => [gr.group, ...(gr.steps || [])]) : []; })(),
    ...(g.manuals || []).map(x => x.title),
    g.fuel, g.years,
  ];
}
function genIncludes(fields, q) {
  if (!q) return true;
  const hay = fields.filter(Boolean).join(" ").toLowerCase();
  const norm = genNormModel(q);
  if (norm && hay.includes(norm.toLowerCase())) return true;
  return buildSearchUnits(q).every(u => u.alts.some(a => hayHasTerm(hay, a) || (/\d/.test(a) && a.length >= 3 && hay.includes(a))));
}

function renderGens() {
  const all = genEntries();
  renderChips("genSeriesChips", ["All", ...uniqueSorted(all.map(g => g.series))], genState.series, (v) => { genState.series = v; renderGens(); }, "All Series");
  renderChips("genCtrlChips", ["All", ...uniqueSorted(all.map(g => g.controller))], genState.ctrl, (v) => { genState.ctrl = v; renderGens(); }, "All Controllers");
  const filtered = all.filter(g =>
    (genState.series === "All" || g.series === genState.series) &&
    (genState.ctrl === "All" || g.controller === genState.ctrl) &&
    genIncludes(genSearchFields(g), genState.search)
  ).sort((a, b) => (a.sort || 0) - (b.sort || 0) || a.series.localeCompare(b.series) || a.family.localeCompare(b.family));
  const results = document.getElementById("genResults");
  const empty = document.getElementById("genEmptyState");
  results.innerHTML = "";
  empty.classList.toggle("hidden", filtered.length !== 0);
  for (const g of filtered) results.appendChild(buildGenCard(g));
}

function buildGenCard(g) {
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = () => openGenDetail(g.id);
  const digits = uniqueSorted((g.models || []).map(m => m.digits).filter(Boolean));
  const shown = digits.slice(0, 6).join(", ") + (digits.length > 6 ? ` +${digits.length - 6} more` : "");
  const nCodes = (g.alarms || []).length + (g.warnings || []).length;
  const nDocs = (g.manuals || []).length;
  card.innerHTML = `
    <div class="card-top">
      ${g.img ? `<img class="tstat-thumb" src="${escapeHtml(g.img)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
      <div class="tstat-card-text">
        <div class="card-code">${escapeHtml(g.family)}</div>
        <div class="card-title">${escapeHtml(g.series)} · ${escapeHtml(g.controller || "")}${g.engine ? " · " + escapeHtml(g.engine) : ""}</div>
      </div>
      <span class="tag ${(g.sort || 30) <= 10 ? "common" : "verify"}">${(g.kw || []).length ? escapeHtml((g.kw.length > 1 ? g.kw[0] + "-" + g.kw[g.kw.length - 1] : g.kw[0]) + " kW") : "verify"}</span>
    </div>
    <div class="card-meta">${shown ? `<span>Models ${escapeHtml(shown)}</span>` : ""}</div>
    <div class="tstat-badges">
      ${nCodes ? `<span class="tstat-badge">${nCodes} codes</span>` : ""}
      ${(g.troubleshooting || []).length ? `<span class="tstat-badge">${(g.troubleshooting || []).length} symptoms</span>` : ""}
      ${nDocs ? `<span class="tstat-badge">${nDocs} manual${nDocs === 1 ? "" : "s"}</span>` : ""}
      ${g.years ? `<span class="tstat-badge">${escapeHtml(g.years)}</span>` : ""}
    </div>`;
  return card;
}

// Startup/commissioning is shared by controller platform, not per-family - see GEN_STARTUP in generators.js.
function genStartupFor(g) {
  const c = g.controller || "", f = g.family || "";
  if (g.startupKey && typeof GEN_STARTUP !== "undefined" && GEN_STARTUP[g.startupKey]) return GEN_STARTUP[g.startupKey];
  let key = null;
  if (/Power Zone 200/.test(c)) key = "pz200";
  else if (/VSCF/.test(c) || /VSCF/.test(f)) key = "evo1";
  else if (/Evolution 2\.0/.test(c)) key = "evo2";
  else if (/Evolution 1\.0/.test(c)) key = "evo1";
  else if (/Nexus/.test(c) && !/Pre-Nexus/.test(c)) key = "nexus";
  else if (/PowerPact/.test(c) || /PowerPact/.test(f)) key = "powerpact";
  else if (/CorePower/.test(c) || /CorePower/.test(f)) key = "corepower";
  else if (/2008 series/.test(f)) key = "series2008";
  else if (/Pre-Nexus/.test(c) || /LED bezel/.test(f) || /legacy/i.test(f)) key = "legacy_led";
  return (typeof GEN_STARTUP !== "undefined" && key) ? GEN_STARTUP[key] : null;
}

function openGenDetail(id, focusModel) {
  const g = genEntries().find(x => x.id === id);
  if (!g) return;
  const q = genState.search;
  const modal = document.getElementById("modal");
  const hit = (txt) => tstatHit(txt, q);
  const codeRows = (rows) => (rows || []).map(a => `
    <tr class="${hit(a.code + " " + a.name + " " + a.meaning) ? "hit" : ""}"><td class="tstat-term short">${escapeHtml(a.code)}</td><td><b>${escapeHtml(a.name || "")}</b>${a.display ? `<div class="tstat-note">Screen: ${escapeHtml(a.display)}</div>` : ""}${a.meaning ? `<div>${escapeHtml(a.meaning)}</div>` : ""}${(a.causes || []).length ? `<div class="tstat-note">Causes: ${escapeHtml(a.causes.join(" · "))}</div>` : ""}${(a.steps || []).length ? `<ul>${a.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul>` : ""}${a.clear ? `<div class="tstat-note">Clear: ${escapeHtml(a.clear)}</div>` : ""}</td></tr>`).join("");
  const sp = g.specs || {};
  const specLabels = { oil: "Oil", oilCapacity: "Oil capacity", sparkPlug: "Spark plug", plugGap: "Plug gap", valveClearance: "Valve clearance", battery: "Battery", airFilter: "Air filter", fuelPressure: "Fuel pressure", exercise: "Exercise" };
  const specRows = Object.keys(specLabels).filter(k => sp[k]).map(k => `<tr><td class="tstat-term short">${escapeHtml(specLabels[k])}</td><td>${escapeHtml(sp[k])}</td></tr>`).join("");
  const maintRows = (g.maintenance || []).map(x => `<tr><td class="tstat-term${String(x.interval).length <= 10 ? " short" : ""}">${escapeHtml(x.interval)}</td><td>${escapeHtml(x.task)}</td></tr>`).join("");
  const tsBlocks = (g.troubleshooting || []).map(x => `
    <div class="tstat-ts ${hit(x.symptom) ? "hit" : ""}"><b>${escapeHtml(x.symptom)}</b>
      ${(x.causes || []).length ? `<div class="tstat-note">Check: ${escapeHtml(x.causes.join(" · "))}</div>` : ""}
      ${(x.fixes || []).length ? `<ul>${x.fixes.map(f => `<li>${escapeHtml(f)}</li>`).join("")}</ul>` : ""}
    </div>`).join("");
  const manualBtns = (g.manuals || []).map(m => {
    const seed = tstatFindSeed(m);
    const label = escapeHtml(m.title || (seed && seed.title) || "Manual");
    const kind = m.docType ? `<span class="tstat-doctype">${escapeHtml(m.docType)}</span>` : "";
    if (seed) return `<button class="tstat-manual-btn" data-seed="${escapeHtml(seed.file)}">${kind}${label}</button>`;
    if (m.url) return `<a class="tstat-manual-btn ext" href="${escapeHtml(m.url)}" target="_blank" rel="noopener">${kind}${label} <span class="tstat-note">opens in browser - needs signal</span></a>`;
    return "";
  }).join("");
  const focus = focusModel ? genNormModel(focusModel) : "";
  const modelRows = (g.models || []).map(m => `<tr class="${focus && m.digits === focus ? "hit" : ""}"><td class="tstat-term short">${escapeHtml(m.digits || "")}</td><td>${escapeHtml(m.g || "")}${m.desc ? `<div class="tstat-note">${escapeHtml(m.desc)}</div>` : ""}</td></tr>`).join("");

  modal.innerHTML = `
    ${g.img ? `<img class="tstat-hero" src="${escapeHtml(g.img)}" alt="" onerror="this.remove()">` : ""}
    <h2>${escapeHtml(g.family)}</h2>
    <div class="sub">${escapeHtml(g.series)} · ${escapeHtml(g.controller || "")}${g.engine ? " · " + escapeHtml(g.engine) : ""}${g.fuel ? " · " + escapeHtml(g.fuel) : ""}${g.years ? " · " + escapeHtml(g.years) : ""}</div>
    ${modelRows ? `<div class="detail-section"><h3>Models</h3><table class="tstat-table">${modelRows}</table></div>` : ""}
    ${specRows ? `<div class="detail-section"><h3>Specs</h3><table class="tstat-table">${specRows}</table></div>` : ""}
    ${(() => { const st = genStartupFor(g); return st ? `<div class="detail-section"><h3>Startup / commissioning</h3>${st.warn ? `<p class="tstat-note"><b>${escapeHtml(st.warn)}</b></p>` : ""}${(st.groups || []).map(gr => `<div class="tstat-ts"><b>${escapeHtml(gr.group)}</b><ol>${(gr.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol></div>`).join("")}</div>` : ""; })()}
    ${maintRows ? `<div class="detail-section"><h3>Maintenance</h3><table class="tstat-table">${maintRows}</table></div>` : ""}
    ${(g.alarms || []).length ? `<div class="detail-section"><h3>Alarm codes (red - unit shuts down)</h3><table class="tstat-table">${codeRows(g.alarms)}</table></div>` : ""}
    ${(g.warnings || []).length ? `<div class="detail-section"><h3>Warnings (yellow - keeps running)</h3><table class="tstat-table">${codeRows(g.warnings)}</table></div>` : ""}
    ${tsBlocks ? `<div class="detail-section"><h3>Troubleshooting</h3>${tsBlocks}</div>` : ""}
    ${(g.installNotes || []).length ? `<div class="detail-section"><h3>Install notes</h3><ul>${g.installNotes.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>` : ""}
    ${(g.tips || []).length ? `<div class="detail-section"><h3>Field notes</h3><ul>${g.tips.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div>` : ""}
    ${manualBtns ? `<div class="detail-section"><h3>Manuals</h3><div class="tstat-manuals">${manualBtns}</div></div>` : ""}
    ${g.sourceNotes ? `<div class="detail-section"><p class="tstat-source">Source: ${escapeHtml(g.sourceNotes)}</p></div>` : ""}
    <div class="modal-actions"><button id="closeModalBtn">Close</button></div>`;
  document.getElementById("closeModalBtn").onclick = closeModal;
  modal.querySelectorAll(".tstat-manual-btn[data-seed]").forEach(btn => {
    btn.onclick = () => { trackEvent("opened generator manual: " + btn.textContent.trim().slice(0, 60)); openManualDetail(seedIdOf({ file: btn.dataset.seed })); };
  });
  const firstHit = modal.querySelector(".hit");
  document.getElementById("modalBackdrop").classList.remove("hidden");
  if (firstHit) setTimeout(() => firstHit.scrollIntoView({ block: "center" }), 50);
  trackEvent("viewed generator: " + g.series + " " + g.family);
}

// Tag scanner hook: a Generac model on the plate opens its family here.
function genFamilyForModel(model) {
  // Liquid-cooled Protector models are alphanumeric (RG/QT/SG + kW) - match them by the model's `lc` prefix before the numeric-only air-cooled logic.
  const uLC = String(model || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const lcFam = genEntries().find(g => (g.models || []).some(m => m.lc && uLC.startsWith(m.lc)));
  if (lcFam) return lcFam;
  const d = genNormModel(model);
  if (!d) return null;
  // Exact G-number first (G0070430 and G0070431 can sit in different families), then the 4-digit form.
  const u = String(model || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const m5 = u.match(/^G?0{1,2}(\d{5})$/);
  const full = m5 ? "G00" + m5[1] : "";
  return (full && genEntries().find(g => (g.models || []).some(m => m.g === full)))
    || genEntries().find(g => (g.models || []).some(m => m.digits === d)) || null;
}

document.getElementById("genSearchInput").addEventListener("input", (e) => { genState.search = e.target.value; renderGens(); });

// ============================================================
// MANUALS (PDFs stored in IndexedDB, works fully offline)
// ============================================================

const MANUALS_DB_NAME = "bfc-manuals-db";
const MANUALS_STORE = "manuals";
const MANUAL_TEXT_STORE = "manual_text";   // extracted full text, keyed by manual id
const TEXT_INDEX_VERSION = 1;              // bump to force re-extraction after a parser change
let manualsDbPromise = null;
let currentPdfObjectUrl = null;
const UNFILED_BRAND = "Unfiled";
const GENERAL_MODEL = "General";
let manualsState = { search: "", brand: null, model: null };

function openManualsDb() {
  if (manualsDbPromise) return manualsDbPromise;
  manualsDbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(MANUALS_DB_NAME, 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(MANUALS_STORE)) {
        db.createObjectStore(MANUALS_STORE, { keyPath: "id" });
      }
      // v2: full-text index of downloaded manuals, so Ask can search INSIDE them.
      if (!db.objectStoreNames.contains(MANUAL_TEXT_STORE)) {
        db.createObjectStore(MANUAL_TEXT_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return manualsDbPromise;
}
async function manualTextGetAll() {
  const db = await openManualsDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(MANUAL_TEXT_STORE, "readonly").objectStore(MANUAL_TEXT_STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
async function manualTextGet(id) {
  const db = await openManualsDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(MANUAL_TEXT_STORE, "readonly").objectStore(MANUAL_TEXT_STORE).get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}
async function manualTextPut(record) {
  const db = await openManualsDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MANUAL_TEXT_STORE, "readwrite");
    tx.objectStore(MANUAL_TEXT_STORE).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function manualTextDelete(id) {
  const db = await openManualsDb();
  return new Promise((resolve) => {
    const tx = db.transaction(MANUAL_TEXT_STORE, "readwrite");
    tx.objectStore(MANUAL_TEXT_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();   // best-effort cleanup
  });
}
async function manualsGetAll() {
  const db = await openManualsDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MANUALS_STORE, "readonly");
    const req = tx.objectStore(MANUALS_STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
async function manualsPut(record) {
  const db = await openManualsDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MANUALS_STORE, "readwrite");
    tx.objectStore(MANUALS_STORE).put(record);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function manualsDelete(id) {
  const db = await openManualsDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(MANUALS_STORE, "readwrite");
    tx.objectStore(MANUALS_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  // Its blob is gone, so its full-text index can't be opened anymore — drop it.
  await manualTextDelete(id);
}

// ============================================================
// Full-text search INSIDE downloaded manuals
// ============================================================
// pdf.js pulls the text off each page of a manual the tech has downloaded and
// we stash it in IndexedDB, so Ask can search the words on the pages — not just
// the manual's title. Only downloaded manuals get indexed (they're on the phone
// already), which keeps it offline-first: search what you carry. Extraction is
// heavy, so it runs in the background, one manual at a time.

let manualIndexBusy = false;

async function extractManualText(m) {
  await ensurePdfJs();
  const data = await m.blob.arrayBuffer();
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const pages = [];
  try {
    for (let n = 1; n <= doc.numPages; n++) {
      const page = await doc.getPage(n);
      const tc = await page.getTextContent();
      pages.push(tc.items.map(it => it.str).join(" ").replace(/\s+/g, " ").trim());
      page.cleanup && page.cleanup();
    }
  } finally {
    doc.destroy();
  }
  return { id: m.id, title: m.title || m.filename || "", brand: m.brand || "", model: m.model || "", pages, indexedAt: Date.now(), tv: TEXT_INDEX_VERSION };
}

// Index one manual only if we don't already have a current text record for it.
async function indexManualTextIfNeeded(m) {
  if (!m || !m.blob) return false;
  const existing = await manualTextGet(m.id);
  if (existing && existing.tv === TEXT_INDEX_VERSION) return false;
  try {
    const rec = await extractManualText(m);
    await manualTextPut(rec);
    return true;
  } catch (e) { return false; }
}

// Background sweep: index every downloaded-but-unindexed manual, one at a time,
// yielding between each so the UI stays responsive. Covers manuals a tech
// downloaded before this feature existed.
async function indexAllDownloaded() {
  if (manualIndexBusy) return;
  manualIndexBusy = true;
  try {
    const downloaded = (await manualsGetAll()).filter(m => m && m.blob);
    const haveIds = new Set((await manualTextGetAll()).filter(r => r.tv === TEXT_INDEX_VERSION).map(r => r.id));
    for (const m of downloaded) {
      if (haveIds.has(m.id)) continue;
      await indexManualTextIfNeeded(m);
      await new Promise(r => setTimeout(r, 60));   // breathe between big PDFs
    }
  } catch (e) { /* best effort */ }
  manualIndexBusy = false;
}

async function manualTextCount() {
  try { return (await manualTextGetAll()).filter(r => r.tv === TEXT_INDEX_VERSION).length; }
  catch (e) { return 0; }
}

// Search the stored page text. Returns the best-matching page per manual so one
// big manual can't flood the list.
async function searchManualText(q, limit) {
  const units = buildSearchUnits(q);
  const need = units.length;
  const threshold = Math.max(1, Math.ceil(need * 0.6));
  let recs;
  try { recs = await manualTextGetAll(); } catch (e) { return []; }
  const bestByManual = new Map();
  for (const rec of recs) {
    if (rec.tv !== TEXT_INDEX_VERSION || !rec.pages) continue;
    for (let i = 0; i < rec.pages.length; i++) {
      const hay = rec.pages[i].toLowerCase();
      if (!hay) continue;
      const sc = askUnitHits(units, hay);
      if (sc < threshold) continue;
      const prev = bestByManual.get(rec.id);
      if (!prev || sc > prev.sc) {
        bestByManual.set(rec.id, { id: rec.id, title: rec.title, brand: rec.brand, model: rec.model, page: i + 1, sc, snippet: askSnippet(rec.pages[i], units) });
      }
    }
  }
  const out = [...bestByManual.values()].sort((a, b) => b.sc - a.sc || a.title.localeCompare(b.title));
  return out.slice(0, limit || 12);
}

// A short readable excerpt centered on the first matched term.
function askSnippet(text, units) {
  const low = text.toLowerCase();
  let idx = -1;
  for (const u of units) for (const a of u.alts) {
    const p = low.indexOf(a);
    if (p >= 0 && (idx < 0 || p < idx)) idx = p;
  }
  if (idx < 0) idx = 0;
  const start = Math.max(0, idx - 55);
  let s = text.slice(start, start + 170).trim();
  if (start > 0) s = "…" + s;
  if (start + 170 < text.length) s = s + "…";
  return s;
}

// Open a downloaded manual jumped to the page a search hit landed on.
async function openManualAtPage(id, page) {
  const rec = (await manualsGetAll()).find(x => x.id === id);
  if (!rec || !rec.blob) { openManualDetail(id); return; }   // download gone — fall back
  // keep listing metadata fresh from the seed index
  const meta = (await manualCatalog()).find(x => x.id === id);
  if (meta) { rec.title = meta.title; rec.brand = meta.brand; rec.model = meta.model; rec.notes = meta.notes; }
  closeModal();
  openPdfReader(rec, { page });
}

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  const mb = bytes / (1024 * 1024);
  return mb >= 1 ? mb.toFixed(1) + " MB" : (bytes / 1024).toFixed(0) + " KB";
}

function manualBrandOf(m) { return m.brand && m.brand.trim() ? m.brand.trim() : UNFILED_BRAND; }
function manualModelOf(m) { return m.model && m.model.trim() ? m.model.trim() : GENERAL_MODEL; }

function renderManualBreadcrumb() {
  const el = document.getElementById("manualBreadcrumb");
  const parts = [];
  parts.push({ label: "All Brands", onClick: () => { manualsState.brand = null; manualsState.model = null; renderManuals(); } });
  if (manualsState.brand) {
    if (manualsState.model) {
      parts.push({ label: manualsState.brand, onClick: () => { manualsState.model = null; renderManuals(); } });
      parts.push({ label: manualsState.model, current: true });
    } else {
      parts.push({ label: manualsState.brand, current: true });
    }
  }
  el.innerHTML = "";
  parts.forEach((p, i) => {
    if (i > 0) {
      const sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = "›";
      el.appendChild(sep);
    }
    if (p.current) {
      const span = document.createElement("span");
      span.className = "crumb-current";
      span.textContent = p.label;
      el.appendChild(span);
    } else {
      const btn = document.createElement("button");
      btn.textContent = p.label;
      btn.onclick = p.onClick;
      el.appendChild(btn);
    }
  });
}

function buildFolderCard(icon, title, meta, onClick) {
  const card = document.createElement("div");
  card.className = "folder-card";
  card.onclick = onClick;
  card.innerHTML = `
    <div class="folder-icon">${icon}</div>
    <div class="folder-info">
      <div class="folder-title">${escapeHtml(title)}</div>
      <div class="folder-meta">${escapeHtml(meta)}</div>
    </div>
    <div class="folder-chevron">›</div>
  `;
  return card;
}

async function renderManuals() {
  const all = await manualCatalog();
  const results = document.getElementById("manualResults");
  const empty = document.getElementById("manualEmptyState");
  renderBulletinBanner();
  results.innerHTML = "";
  document.getElementById("manualBreadcrumb").classList.toggle("hidden", !!manualsState.search);

  // Search overrides folder browsing with a flat result list across everything.
  if (manualsState.search) {
    const filtered = all.filter(m => textIncludes([m.brand, m.model, m.title, m.notes], manualsState.search))
      .sort((a, b) => manualBrandOf(a).localeCompare(manualBrandOf(b)) || (a.title||"").localeCompare(b.title||""));
    empty.classList.toggle("hidden", filtered.length !== 0);
    for (const m of filtered) results.appendChild(buildManualCard(m));
    return;
  }

  renderManualBreadcrumb();

  if (!manualsState.brand) {
    const byBrand = new Map();
    for (const m of all) {
      const b = manualBrandOf(m);
      if (!byBrand.has(b)) byBrand.set(b, []);
      byBrand.get(b).push(m);
    }
    const brands = [...byBrand.keys()].sort((a, b) => a === UNFILED_BRAND ? 1 : b === UNFILED_BRAND ? -1 : a.localeCompare(b));
    empty.classList.toggle("hidden", brands.length !== 0);
    for (const b of brands) {
      const count = byBrand.get(b).length;
      results.appendChild(buildFolderCard("📁", b, `${count} manual${count === 1 ? "" : "s"}`, () => { manualsState.brand = b; renderManuals(); }));
    }
    return;
  }

  const inBrand = all.filter(m => manualBrandOf(m) === manualsState.brand);

  if (!manualsState.model) {
    const byModel = new Map();
    for (const m of inBrand) {
      const mo = manualModelOf(m);
      if (!byModel.has(mo)) byModel.set(mo, []);
      byModel.get(mo).push(m);
    }
    const models = [...byModel.keys()].sort((a, b) => a === GENERAL_MODEL ? 1 : b === GENERAL_MODEL ? -1 : a.localeCompare(b));
    empty.classList.toggle("hidden", models.length !== 0);
    for (const mo of models) {
      const count = byModel.get(mo).length;
      results.appendChild(buildFolderCard("📁", mo, `${count} manual${count === 1 ? "" : "s"}`, () => { manualsState.model = mo; renderManuals(); }));
    }
    return;
  }

  const files = inBrand.filter(m => manualModelOf(m) === manualsState.model)
    .sort((a, b) => (a.title||"").localeCompare(b.title||""));
  empty.classList.toggle("hidden", files.length !== 0);
  for (const m of files) results.appendChild(buildManualCard(m));
}

function buildManualCard(m) {
  const card = document.createElement("div");
  card.className = "manual-card";
  card.onclick = () => openManualDetail(m.id);
  const stateTxt = m.downloaded ? formatBytes(m.size) + " · on this phone" : "☁ tap to download";
  card.innerHTML = `
    <div class="manual-icon">${m.downloaded ? "📄" : "☁️"}</div>
    <div class="manual-info">
      <div class="manual-title">${escapeHtml(m.title || m.filename)}</div>
      <div class="manual-meta">${[m.brand, m.model].filter(Boolean).map(escapeHtml).join(" · ")}${m.brand||m.model ? " · " : ""}${stateTxt}</div>
    </div>
  `;
  return card;
}

async function openManualDetail(id) {
  const all = await manualCatalog();
  let m = all.find(x => x.id === id);
  if (!m) return;
  const modal = document.getElementById("modal");
  const header = `
    <h2>${escapeHtml(m.title || m.filename)}</h2>
    <div class="sub">${[m.brand, m.model].filter(Boolean).map(escapeHtml).join(" · ")}</div>
    ${m.notes ? `<div class="detail-section"><p>${escapeHtml(m.notes)}</p></div>` : ""}`;

  // Not on this phone yet — download it now (needs signal once), then reopen.
  if (!m.downloaded) {
    if (!navigator.onLine) {
      modal.innerHTML = `${header}
        <div class="detail-section"><p>📵 This manual isn't stored on this phone yet, and there's no signal to download it. Get to coverage and tap it again — after that first download it works offline forever.</p></div>
        <div class="modal-actions"><button id="closeModalBtn">Close</button></div>`;
      document.getElementById("closeModalBtn").onclick = closeModal;
      document.getElementById("modalBackdrop").classList.remove("hidden");
      return;
    }
    modal.innerHTML = `${header}
      <div class="detail-section"><p id="manualDlStatus">Downloading… stay online, this can take a minute on big manuals.</p></div>
      <div class="modal-actions"><button id="closeModalBtn">Close</button></div>`;
    document.getElementById("closeModalBtn").onclick = closeModal;
    document.getElementById("modalBackdrop").classList.remove("hidden");
    try {
      m = await downloadSeedManual(m);
    } catch (err) {
      const st = document.getElementById("manualDlStatus");
      if (st) st.textContent = "Download failed (" + (err && err.message ? err.message : err) + ") — check signal and tap the manual again.";
      return;
    }
    renderManuals();
  }

  closeModal();
  openPdfReader(m);
}

// Detail actions (Save copy / Remove download) live behind the reader's info
// button — reading happens on-screen, nothing has to go to the phone's Files.
function openManualInfo(m) {
  const modal = document.getElementById("modal");
  if (currentPdfObjectUrl) { URL.revokeObjectURL(currentPdfObjectUrl); currentPdfObjectUrl = null; }
  currentPdfObjectUrl = URL.createObjectURL(m.blob);
  const isSeed = m.id.startsWith("manual-seed-");
  modal.innerHTML = `
    <h2>${escapeHtml(m.title || m.filename)}</h2>
    <div class="sub">${[m.brand, m.model].filter(Boolean).map(escapeHtml).join(" · ")}${m.brand||m.model ? " · " : ""}${formatBytes(m.size)} · on this phone</div>
    ${m.notes ? `<div class="detail-section"><p>${escapeHtml(m.notes)}</p></div>` : ""}
    <div class="modal-actions">
      <button id="closeModalBtn">Close</button>
      <a id="downloadBtn" class="primary" style="display:flex;align-items:center;justify-content:center;text-decoration:none;" href="${currentPdfObjectUrl}" download="${escapeHtml(m.filename || "manual.pdf")}">Save copy</a>
      <button class="danger" id="deleteManualBtn">${isSeed ? "Remove download" : "Delete"}</button>
    </div>
  `;
  document.getElementById("closeModalBtn").onclick = closeModal;
  document.getElementById("deleteManualBtn").onclick = async () => {
    const msg = isSeed
      ? "Remove this manual's downloaded copy to free space? It stays listed and can be re-downloaded anytime."
      : "Delete this manual from the device?";
    if (!confirm(msg)) return;
    await manualsDelete(m.id);
    closeModal(); closePdfReader(); renderManuals();
  };
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

// ============================================================
// Shop bulletins — documents we are not allowed to host here
// ============================================================
// Carrier dealer bulletins are stamped "Not For Further Distribution", and this
// repo is PUBLIC, so those PDFs must never be committed to it. Instead they live
// in a Brackett-controlled shared folder and each phone imports them once. Once
// imported they are ordinary manuals: stored offline in IndexedDB, listed under
// their brand/model folders, searchable, and they open in the in-app reader.
//
// To publish a batch: drop the PDFs in the folder, then set `url`, bump
// `version`, update `count`, and deploy. Every tech gets a pill on next open.
// Leaving `url` empty keeps the whole feature dormant — no pill, no banner.
// The folder link is safe to sit in this PUBLIC repo only because the folder is
// shared with named Brackett accounts rather than "anyone with the link" —
// Google enforces the permission, so the URL by itself grants nothing. If that
// sharing is ever loosened to link-anyone, this URL effectively publishes
// documents stamped "Not For Further Distribution" and must come back out.
const BULLETIN_PACK = {
  version: 2,                    // bump to re-notify everyone
  // How many PDFs are waiting. Set it only when the number is actually known;
  // null renders the pill and banner without a count rather than printing a
  // stale one. Google Drive's file list is virtualised, so a folder that has
  // grown past a hundred files cannot be counted reliably from the browser —
  // a wrong number here reads as "I already added those" and the tech skips
  // the batch.
  count: null,
  label: "Carrier and Payne shop bulletins",
  note: "Dealer bulletins - confidential, do not forward outside Brackett.",
  url: "https://drive.google.com/drive/folders/1MrkE0ABvpRoXeUDmnOxi7lq-_O3G-C3Z",
};
const BULLETIN_ACK_KEY = "bfc_bulletin_pack_ack";

function bulletinAckedVersion() {
  try {
    const v = JSON.parse(localStorage.getItem(BULLETIN_ACK_KEY));
    return typeof v === "number" && isFinite(v) ? v : 0;
  } catch (e) { return 0; }
}
// "100 " when the count is known, "" when it is not, so the pill and banner
// read naturally either way instead of printing "null".
function bulletinCountPrefix() {
  const n = BULLETIN_PACK.count;
  return typeof n === "number" && isFinite(n) && n > 0 ? n + " " : "";
}
function bulletinPackPending() {
  return !!BULLETIN_PACK.url && BULLETIN_PACK.version > bulletinAckedVersion();
}
function ackBulletinPack() {
  safeSet(BULLETIN_ACK_KEY, BULLETIN_PACK.version);
  const pill = document.getElementById("bulletinPill");
  if (pill) pill.remove();
  renderBulletinBanner();
  trackEvent("added shop bulletins");
}

// Sits on the Manuals screen so a tech who dismisses the pill can still find it.
function renderBulletinBanner() {
  const el = document.getElementById("bulletinBanner");
  if (!el) return;
  if (!bulletinPackPending()) { el.classList.add("hidden"); el.innerHTML = ""; return; }
  el.classList.remove("hidden");
  el.innerHTML = `
    <div class="bulletin-banner-title">${escapeHtml(bulletinCountPrefix())}${escapeHtml(BULLETIN_PACK.label)} to add</div>
    <div class="bulletin-banner-body">These can't be stored on the app's server, so they come from the shop folder. Open it, download them to this phone, then tap + Add and pick them all at once. ${escapeHtml(BULLETIN_PACK.note)}</div>
    <div class="bulletin-banner-actions">
      <a class="bulletin-open" href="${escapeHtml(BULLETIN_PACK.url)}" target="_blank" rel="noopener">Open the shop folder</a>
      <button class="bulletin-done" id="bulletinDoneBtn">Done, I added them</button>
    </div>`;
  const done = document.getElementById("bulletinDoneBtn");
  if (done) done.onclick = ackBulletinPack;
}

function showBulletinPill() {
  if (!bulletinPackPending()) return;
  if (document.getElementById("bulletinPill")) return;
  const pill = document.createElement("button");
  pill.id = "bulletinPill";
  // Same pill styling; the shared stack keeps it clear of the update pill so a
  // tech who has both waiting can still read and tap each one.
  pill.className = "update-pill bulletin-pill";
  pill.type = "button";
  const lead = bulletinCountPrefix() ? bulletinCountPrefix() + "new " : "New ";
  pill.innerHTML = `<span>${escapeHtml(lead)}${escapeHtml(BULLETIN_PACK.label)}</span><span class="update-pill-cta">Tap to add</span>`;
  pill.onclick = () => {
    pill.remove();
    showScreen("manuals");
    renderBulletinBanner();
    const b = document.getElementById("bulletinBanner");
    if (b) b.scrollIntoView({ block: "nearest" });
  };
  pillStack().appendChild(pill);
}

function openManualEditForm(prefill) {
  const p = prefill || {};
  const modal = document.getElementById("modal");
  modal.innerHTML = `
    <h2>Add a manual</h2>
    <div class="sub">Pick a PDF already saved on this phone (e.g. downloaded from a manufacturer site). It's stored on-device and works offline after that. You can select several PDFs at once - each one is saved separately using its filename as the title.</div>
    <div class="form-field"><label>PDF file(s)</label><input id="f-file" type="file" accept="application/pdf" multiple></div>
    <div class="form-field"><label>Brand</label><input id="f-brand" value="${escapeHtml(p.brand || "")}" placeholder="e.g. Carrier"></div>
    <div class="form-field"><label>Model / system (optional)</label><input id="f-model" value="${escapeHtml(p.model || "")}" placeholder="e.g. 58TP080"></div>
    <div class="form-field"><label>Title</label><input id="f-title" placeholder="e.g. Installation & service manual"></div>
    <div class="form-field"><label>Notes (optional)</label><textarea id="f-notes"></textarea></div>
    <div class="upload-progress" id="uploadProgress"></div>
    <div class="modal-actions">
      <button id="cancelEditBtn">Cancel</button>
      <button class="primary" id="saveManualBtn">Save</button>
    </div>
  `;
  document.getElementById("cancelEditBtn").onclick = closeModal;
  const fileInput = document.getElementById("f-file");
  const progress = document.getElementById("uploadProgress");
  fileInput.addEventListener("change", () => {
    // Count only the PDFs — a stray non-PDF in the selection is skipped at save
    // time, so promising to add it here would just be wrong.
    const pdfs = [...fileInput.files].filter(f => !f.type || f.type === "application/pdf");
    const n = pdfs.length;
    const titleField = document.getElementById("f-title");
    if (n === 1 && !titleField.value) {
      titleField.value = pdfs[0].name.replace(/\.pdf$/i, "");
    }
    // On a batch the per-file title box would be meaningless — each file keeps
    // its own filename as the title, so say so instead of letting one typed
    // title silently apply to all of them.
    if (n > 1) {
      titleField.value = "";
      titleField.placeholder = n + " files selected - each keeps its own filename as the title";
      progress.textContent = n + " PDFs ready to add. Brand, model and notes below apply to all of them.";
    } else {
      titleField.placeholder = "e.g. Installation & service manual";
      progress.textContent = "";
    }
  });
  document.getElementById("saveManualBtn").onclick = async () => {
    const files = [...fileInput.files];
    if (!files.length) { alert("Choose a PDF file first."); return; }
    const bad = files.filter(f => f.type && f.type !== "application/pdf");
    if (bad.length === files.length) { alert("Please choose PDF files."); return; }
    const brand = document.getElementById("f-brand").value.trim();
    const model = document.getElementById("f-model").value.trim();
    const notes = document.getElementById("f-notes").value.trim();
    const typedTitle = document.getElementById("f-title").value.trim();
    const good = files.filter(f => !f.type || f.type === "application/pdf");
    let saved = 0;
    const failed = [];
    for (const file of good) {
      progress.textContent = good.length > 1
        ? "Saving " + (saved + 1) + " of " + good.length + "…"
        : "Saving…";
      try {
        await manualsPut({
          // Date.now() repeats inside a fast loop, so the index keeps ids unique.
          id: "manual-" + Date.now() + "-" + saved + "-" + Math.random().toString(36).slice(2, 7),
          brand, model, notes,
          title: (good.length === 1 && typedTitle) ? typedTitle : file.name.replace(/\.pdf$/i, ""),
          filename: file.name,
          mimeType: file.type || "application/pdf",
          size: file.size,
          blob: file,
          addedAt: Date.now(),
        });
        saved++;
      } catch (err) {
        // One bad file (or a full device) must not throw away the rest of the batch.
        failed.push(file.name + " (" + err.message + ")");
      }
    }
    renderManuals();
    if (!failed.length && !bad.length) { closeModal(); return; }
    progress.textContent = "Saved " + saved + " of " + good.length + "."
      + (bad.length ? " Skipped " + bad.length + " non-PDF file(s)." : "")
      + (failed.length ? " Failed: " + failed.join(", ") : "");
  };
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

document.getElementById("manualSearchInput").addEventListener("input", (e) => { manualsState.search = e.target.value; renderManuals(); });

function seedIdOf(seed) { return "manual-seed-" + seed.file.split("/").pop().replace(/\.pdf$/i, ""); }

// Seeds may point at a manufacturer CDN instead of a file in this repo (the
// Lennox library is hosted on Adobe Scene7 and serves CORS *), which keeps
// hundreds of MB of PDFs out of the repo while still working on-demand.

// On-demand manuals: every seed manual is always LISTED, but its PDF stays on
// the server until the tech opens it — first open downloads and stores it on
// this device, after which it works offline like everything else. This keeps
// first install small now that the library is hundreds of MB. Devices that
// already downloaded manuals under the old seed-everything model keep them.
async function manualCatalog() {
  const local = await manualsGetAll();
  const localById = new Map(local.map(m => [m.id, m]));
  const out = [];
  if (typeof MANUAL_SEEDS !== "undefined") {
    for (const seed of MANUAL_SEEDS) {
      const id = seedIdOf(seed);
      const rec = localById.get(id);
      if (rec) {
        rec.seedFile = seed.file; rec.downloaded = true;
        // keep listing metadata fresh from the index even for stored copies
        rec.brand = seed.brand; rec.model = seed.model; rec.title = seed.title; rec.notes = seed.notes;
        out.push(rec); localById.delete(id);
      } else {
        out.push({ id, brand: seed.brand, model: seed.model, title: seed.title, notes: seed.notes, filename: seed.filename || seed.file.split("/").pop(), seedFile: seed.file, downloaded: false });
      }
    }
  }
  for (const rec of localById.values()) { rec.downloaded = true; out.push(rec); }
  return out;
}

async function downloadSeedManual(m, onStatus) {
  if (onStatus) onStatus("Downloading… stay online, this can take a minute on big manuals.");
  const resp = await fetch(m.seedFile);
  if (!resp.ok) throw new Error("Server returned " + resp.status);
  const blob = await resp.blob();
  const record = {
    id: m.id, brand: m.brand, model: m.model, title: m.title, notes: m.notes,
    filename: m.filename, mimeType: "application/pdf", size: blob.size, blob, addedAt: Date.now(),
  };
  await manualsPut(record);
  trackEvent("downloaded manual: " + m.title);
  // Index its text in the background so Ask can search inside it — don't block
  // the tech opening the manual they just downloaded.
  setTimeout(() => { indexManualTextIfNeeded(record); }, 0);
  return record;
}

// ============================================================
// In-app PDF reader (pdf.js rendered on canvas). Phones don't
// render PDFs in iframes — this is why manuals looked "broken"
// in the field. pdf.js is self-hosted and precached by the SW,
// so reading works fully offline like everything else.
// ============================================================

let pdfJsPromise = null;
function ensurePdfJs() {
  if (window.pdfjsLib) return Promise.resolve();
  if (pdfJsPromise) return pdfJsPromise;
  pdfJsPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "pdfjs/pdf.min.js";
    s.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs/pdf.worker.min.js";
      resolve();
    };
    s.onerror = () => { pdfJsPromise = null; reject(new Error("couldn't load the PDF engine")); };
    document.head.appendChild(s);
  });
  return pdfJsPromise;
}

const PDF_KEEP_RANGE = 4; // pages kept rendered on each side of the visible one
const pdfView = {
  doc: null, manual: null, holders: [], rendered: new Set(), rendering: new Set(),
  zoom: 1, observer: null, current: 1, historyArmed: false,
};

async function openPdfReader(m, opts) {
  const targetPage = opts && opts.page ? opts.page : 0;
  const viewer = document.getElementById("pdfViewer");
  const scroll = document.getElementById("pdfScroll");
  document.getElementById("pdfViewerTitle").textContent = m.title || m.filename || "Manual";
  document.getElementById("pdfPageBtn").textContent = "–";
  scroll.innerHTML = `<div class="pdf-viewer-msg">Opening…</div>`;
  viewer.classList.remove("hidden");
  // Android back gesture should close the reader, not exit the app.
  history.pushState({ bfcPdf: 1 }, "");
  pdfView.historyArmed = true;
  pdfView.manual = m;
  try {
    await ensurePdfJs();
    const data = await m.blob.arrayBuffer();
    const doc = await pdfjsLib.getDocument({ data }).promise;
    if (pdfView.manual !== m) { doc.destroy(); return; } // closed while loading
    pdfView.doc = doc;
    pdfView.zoom = 1;
    pdfView.rendered = new Set();
    pdfView.rendering = new Set();
    pdfView.current = 1;
    // Placeholder heights from page 1's aspect ratio; each page corrects its
    // own holder to exact size on first render.
    const p1 = await doc.getPage(1);
    const vp1 = p1.getViewport({ scale: 1 });
    const cssW = pdfBaseWidth();
    const estH = Math.round(cssW * (vp1.height / vp1.width));
    scroll.innerHTML = "";
    // width:max-content wrapper — lets a zoomed-in page scroll all the way
    // left instead of getting clipped by auto-margin centering
    const wrap = document.createElement("div");
    wrap.className = "pdf-pages";
    scroll.appendChild(wrap);
    pdfView.holders = [];
    for (let n = 1; n <= doc.numPages; n++) {
      const holder = document.createElement("div");
      holder.className = "pdf-page";
      holder.dataset.page = n;
      holder.style.width = cssW + "px";
      holder.style.height = estH + "px";
      wrap.appendChild(holder);
      pdfView.holders.push(holder);
    }
    document.getElementById("pdfPageBtn").textContent = "1 / " + doc.numPages;
    if (pdfView.observer) pdfView.observer.disconnect();
    pdfView.observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) pdfRenderPage(Number(e.target.dataset.page));
      }
    }, { root: scroll, rootMargin: "700px 0px" });
    pdfView.holders.forEach(h => pdfView.observer.observe(h));
    // Jump to a search-hit page: set current first so kickstart paints there,
    // then scroll once layout exists (placeholder heights are close enough; the
    // page corrects its own height on render).
    if (targetPage > 1 && targetPage <= doc.numPages) {
      pdfView.current = targetPage;
      document.getElementById("pdfPageBtn").textContent = targetPage + " / " + doc.numPages;
      requestAnimationFrame(() => {
        const holder = pdfView.holders[targetPage - 1];
        if (holder) scroll.scrollTop = holder.offsetTop;
      });
    }
    pdfKickstart();
    trackEvent("read manual: " + (m.title || m.filename));
  } catch (err) {
    scroll.innerHTML = `<div class="pdf-viewer-msg">Couldn't open this manual (${escapeHtml(err && err.message ? err.message : String(err))}). Try removing the download from ⓘ and tapping it again.</div>`;
  }
}

function pdfBaseWidth() {
  // fit-width with a small gutter, capped for tablets/desktop
  return Math.min(document.getElementById("pdfScroll").clientWidth - 12, 900);
}

// Observer callbacks can lag (throttled tabs, backgrounded PWA) — paint the
// pages at the current position directly; the observer handles scrolling.
function pdfKickstart() {
  if (!pdfView.doc) return;
  const from = Math.max(1, pdfView.current - 1);
  const to = Math.min(pdfView.doc.numPages, pdfView.current + 2);
  for (let n = from; n <= to; n++) pdfRenderPage(n);
}

async function pdfRenderPage(n) {
  if (!pdfView.doc || pdfView.rendered.has(n) || pdfView.rendering.has(n)) return;
  pdfView.rendering.add(n);
  const doc = pdfView.doc;
  try {
    const page = await doc.getPage(n);
    if (pdfView.doc !== doc) return;
    const holder = pdfView.holders[n - 1];
    const vp1 = page.getViewport({ scale: 1 });
    const scale = (pdfBaseWidth() / vp1.width) * pdfView.zoom;
    const vp = page.getViewport({ scale });
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(vp.width * ratio);
    canvas.height = Math.floor(vp.height * ratio);
    canvas.style.width = Math.floor(vp.width) + "px";
    canvas.style.height = Math.floor(vp.height) + "px";
    holder.style.width = Math.floor(vp.width) + "px";
    holder.style.height = Math.floor(vp.height) + "px";
    await page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: vp,
      transform: ratio !== 1 ? [ratio, 0, 0, ratio, 0, 0] : null,
    }).promise;
    if (pdfView.doc !== doc) return;
    holder.replaceChildren(canvas);
    pdfView.rendered.add(n);
    pdfTrimRendered();
  } catch (err) {
    // render errors on one page shouldn't kill the reader
  } finally {
    pdfView.rendering.delete(n);
  }
}

// Big manuals would run a phone out of memory if every visited page kept its
// canvas — blank out pages far from the current one (placeholder keeps height).
function pdfTrimRendered() {
  for (const n of [...pdfView.rendered]) {
    if (Math.abs(n - pdfView.current) > PDF_KEEP_RANGE) {
      pdfView.holders[n - 1].replaceChildren();
      pdfView.rendered.delete(n);
    }
  }
}

function pdfUpdateCurrent() {
  if (!pdfView.doc) return;
  const scroll = document.getElementById("pdfScroll");
  const mid = scroll.scrollTop + scroll.clientHeight / 2;
  let cur = 1;
  for (const h of pdfView.holders) {
    if (h.offsetTop <= mid) cur = Number(h.dataset.page); else break;
  }
  if (cur !== pdfView.current) {
    pdfView.current = cur;
    document.getElementById("pdfPageBtn").textContent = cur + " / " + pdfView.doc.numPages;
    pdfTrimRendered();
  }
}

function pdfSetZoom(z) {
  if (!pdfView.doc) return;
  const scroll = document.getElementById("pdfScroll");
  const old = pdfView.zoom;
  pdfView.zoom = Math.min(4, Math.max(0.5, z));
  if (pdfView.zoom === old) return;
  const f = pdfView.zoom / old;
  // scale placeholders + keep the same spot on the page under the viewport
  const anchor = scroll.scrollTop + scroll.clientHeight / 2;
  for (const h of pdfView.holders) {
    h.style.width = Math.floor(parseFloat(h.style.width) * f) + "px";
    h.style.height = Math.floor(parseFloat(h.style.height) * f) + "px";
    h.replaceChildren();
  }
  pdfView.rendered.clear();
  scroll.scrollTop = anchor * f - scroll.clientHeight / 2;
  // re-render what's on screen now
  pdfView.holders.forEach(h => pdfView.observer.unobserve(h));
  pdfView.holders.forEach(h => pdfView.observer.observe(h));
  pdfKickstart();
}

function closePdfReader(fromPop) {
  const viewer = document.getElementById("pdfViewer");
  if (viewer.classList.contains("hidden")) return;
  viewer.classList.add("hidden");
  if (pdfView.observer) { pdfView.observer.disconnect(); pdfView.observer = null; }
  if (pdfView.doc) { pdfView.doc.destroy(); pdfView.doc = null; }
  pdfView.manual = null;
  pdfView.holders = [];
  pdfView.rendered.clear();
  document.getElementById("pdfScroll").innerHTML = "";
  if (pdfView.historyArmed && !fromPop) history.back();
  pdfView.historyArmed = false;
}

window.addEventListener("popstate", () => {
  if (!document.getElementById("pdfViewer").classList.contains("hidden")) {
    closePdfReader(true);
  }
  if (!document.getElementById("portalViewer").classList.contains("hidden")) {
    closePortalEmbed(true);
  }
});
document.getElementById("pdfCloseBtn").onclick = () => closePdfReader(false);
document.getElementById("pdfZoomInBtn").onclick = () => pdfSetZoom(pdfView.zoom * 1.3);
document.getElementById("pdfZoomOutBtn").onclick = () => pdfSetZoom(pdfView.zoom / 1.3);
document.getElementById("pdfInfoBtn").onclick = () => { if (pdfView.manual) openManualInfo(pdfView.manual); };
document.getElementById("pdfPageBtn").onclick = () => {
  if (!pdfView.doc) return;
  const p = parseInt(prompt("Go to page (1-" + pdfView.doc.numPages + ")", pdfView.current), 10);
  if (p >= 1 && p <= pdfView.doc.numPages) {
    document.getElementById("pdfScroll").scrollTop = pdfView.holders[p - 1].offsetTop - 6;
  }
};
let pdfScrollTick = false;
document.getElementById("pdfScroll").addEventListener("scroll", () => {
  if (pdfScrollTick) return;
  pdfScrollTick = true;
  requestAnimationFrame(() => { pdfScrollTick = false; pdfUpdateCurrent(); });
});

// Rotating the phone changes fit-width — re-lay pages out at the new width.
// All holders share one width (height varies by aspect), so one factor works.
let pdfResizeTimer = null;
window.addEventListener("resize", () => {
  if (!pdfView.doc || document.getElementById("pdfViewer").classList.contains("hidden")) return;
  clearTimeout(pdfResizeTimer);
  pdfResizeTimer = setTimeout(() => {
    if (!pdfView.doc || !pdfView.holders.length) return;
    const target = pdfBaseWidth() * pdfView.zoom;
    const curW = parseFloat(pdfView.holders[0].style.width);
    if (!curW || Math.abs(target - curW) < 2) return;
    const f = target / curW;
    for (const h of pdfView.holders) {
      h.style.width = Math.floor(parseFloat(h.style.width) * f) + "px";
      h.style.height = Math.floor(parseFloat(h.style.height) * f) + "px";
      h.replaceChildren();
    }
    pdfView.rendered.clear();
    pdfView.holders.forEach(h => pdfView.observer.unobserve(h));
    pdfView.holders.forEach(h => pdfView.observer.observe(h));
    pdfKickstart();
  }, 250);
});

// ============================================================
// Request Info — techs email gaps/ideas to the office (mailto:,
// no backend needed; the phone's mail app does the sending)
// ============================================================

const REQUEST_EMAIL = "andy@brackettcomfort.com";
document.getElementById("rq-send").addEventListener("click", () => {
  const name = document.getElementById("rq-name").value.trim();
  const type = document.getElementById("rq-type").value;
  const model = document.getElementById("rq-model").value.trim();
  const msg = document.getElementById("rq-msg").value.trim();
  const note = document.getElementById("rq-note");
  if (!msg) {
    note.textContent = "Type what you need first — even one line helps.";
    note.classList.remove("hidden");
    return;
  }
  const subject = `[Service Tool] ${type}${model ? " — " + model : ""}`;
  const body =
    `Request type: ${type}\n` +
    (model ? `Brand/model: ${model}\n` : "") +
    (name ? `From: ${name}\n` : "") +
    `\n${msg}\n\n` +
    `—\nSent from Brackett Service Tool ${APP_VERSION}`;
  window.location.href = `mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  trackEvent("sent info request: " + type);
  note.textContent = "Your email app should be opening with everything filled in — hit Send there and it goes to the office.";
  note.classList.remove("hidden");
});

// ============================================================
// Charging Calculator — gauge readings → sat temps → verdicts
// PT data from official charts (see pt-data.js). Targets are the
// standard field rules of thumb, clearly labeled as such.
// ============================================================

function ccNum(id) {
  const v = document.getElementById(id).value.trim();
  return v === "" ? null : parseFloat(v);
}

function ccVerdict(kind, txt, hint) {
  const cls = kind === "ok" ? "cc-ok" : kind === "warn" ? "cc-warn" : kind === "bad" ? "cc-bad" : "cc-need";
  return `<div class="cc-line ${cls}"><span class="cc-flag">${kind === "ok" ? "✅" : kind === "warn" ? "⚠️" : kind === "bad" ? "🔴" : "✏️"}</span><div>${txt}${hint ? `<div class="cc-hint">${hint}</div>` : ""}</div></div>`;
}

function ccTargetBox(label, value, sub) {
  return `<div class="cc-target-box"><div class="cc-target-label">${escapeHtml(label)}</div><div class="cc-target-value">${value}</div>${sub ? `<div class="cc-target-sub">${sub}</div>` : ""}</div>`;
}

// Tells the tech what to expect BEFORE they read the gauges — target suction/
// head psig (from the same rule-of-thumb DTD/CTOA ranges the verdicts below
// use, run backward through the PT chart) plus target superheat/subcooling.
// This is deliberately built only from the industry rule-of-thumb ranges
// already cited elsewhere in this file, not invented per-model numbers — a
// real per-model charging chart from the unit's own literature always wins.
function renderChargeTargets(chart, refrig, meter, eff, od, id_, wb, scTarget, scTargetIsDefault) {
  const boxes = [];

  // Target suction, from the 30-42°F DTD rule the suction verdict uses below.
  if (id_ == null) {
    boxes.push(ccTargetBox("Target suction", "—", "enter indoor return temp"));
  } else {
    const evapLo = id_ - 42, evapHi = id_ - 30;
    const suctLo = ptInvert(chart.dew, evapLo), suctHi = ptInvert(chart.dew, evapHi);
    if (suctLo == null || suctHi == null) {
      boxes.push(ccTargetBox("Target suction", "off chart", "check the indoor return reading"));
    } else {
      boxes.push(ccTargetBox("Target suction", `${Math.round(suctLo)}-${Math.round(suctHi)} psig`, `evap ${Math.round(evapLo)}-${Math.round(evapHi)}°F`));
    }
  }

  // Target head, from the CTOA rule the head verdict uses below.
  if (od == null) {
    boxes.push(ccTargetBox("Target head", "—", "enter outdoor temp"));
  } else {
    const [ctoaLo, ctoaHi] = eff === "high" ? [12, 22] : [18, 30];
    const condLo = od + ctoaLo, condHi = od + ctoaHi;
    const headLo = ptInvert(chart.bubble, condLo), headHi = ptInvert(chart.bubble, condHi);
    if (headLo == null || headHi == null) {
      boxes.push(ccTargetBox("Target head", "off chart", "check the outdoor temp reading"));
    } else {
      const effLabel = eff === "high" ? "high-eff" : "standard";
      boxes.push(ccTargetBox("Target head", `${Math.round(headLo)}-${Math.round(headHi)} psig`, `${effLabel} condenser, ${od}°F out`));
    }
  }

  // Target superheat — orifice needs a real formula (od + indoor wet bulb);
  // TXV/EEV self-manages superheat, so the real target lives in subcooling.
  if (meter === "orifice") {
    if (od == null || wb == null) {
      boxes.push(ccTargetBox("Target superheat", "—", "orifice needs outdoor temp + indoor wet bulb"));
    } else {
      const target = ((3 * wb) - 80 - od) / 2;
      if (target < 5) {
        boxes.push(ccTargetBox("Target superheat", "too low to use", "cool/dry conditions — weigh the charge instead"));
      } else {
        boxes.push(ccTargetBox("Target superheat", `~${Math.round(target)}°F`, `fixed-orifice, ${od}°F out / ${wb}°F WB in`));
      }
    }
  } else {
    boxes.push(ccTargetBox("Target superheat", "6-15°F", "TXV/EEV self-manages SH — charge to subcooling"));
  }

  // Target subcooling — nameplate value always wins; 10°F is a fallback only.
  boxes.push(ccTargetBox("Target subcooling", `${scTarget}°F`, scTargetIsDefault ? "10°F default — check the nameplate" : "from nameplate"));

  document.getElementById("cc-targets").innerHTML =
    `<div class="cc-section-label">🎯 Targets for this call</div><div class="cc-target-grid">${boxes.join("")}</div>`
    + renderChartLinks(refrig);
}

// The targets above are rules of thumb. When the manufacturer published a real
// chart for this refrigerant, offer it — a tech should charge to the printed
// table for the unit in front of them, not to a formula, whenever one exists.
function renderChartLinks(refrig) {
  if (typeof CHARGING_CHARTS === "undefined") return "";
  const matches = CHARGING_CHARTS.filter(c => (c.refrigerant || "").toUpperCase().replace(/[^A-Z0-9]/g, "") === (refrig || "").toUpperCase().replace(/[^A-Z0-9]/g, ""));
  if (!matches.length) return "";
  const items = matches.map(c =>
    `<button class="cc-chart-link" data-chart="${escapeHtml(c.id)}">
       <span class="cc-chart-brand">${escapeHtml(c.brand)}</span>
       <span class="cc-chart-models">${escapeHtml(String(c.models).slice(0, 70))}</span>
     </button>`).join("");
  return `<div class="cc-section-label">📋 Manufacturer charts for ${escapeHtml(refrig)}</div>
    <div class="cc-chart-links">${items}</div>`;
}

function openChargingChart(id) {
  const c = (typeof CHARGING_CHARTS !== "undefined" ? CHARGING_CHARTS : []).find(x => x.id === id);
  if (!c) return;
  const cols = c.colAxis ? Object.keys(c.rows[0].values || {}) : null;
  const head = cols
    ? `<tr><th>${escapeHtml(c.rowAxis)}</th>${cols.map(k => `<th>${escapeHtml(k)}</th>`).join("")}</tr>`
    : `<tr><th>${escapeHtml(c.rowAxis)}</th><th>Value</th></tr>`;
  const body = c.rows.map(r => cols
    ? `<tr><th>${escapeHtml(r.row)}</th>${cols.map(k => `<td>${escapeHtml(String(r.values[k] ?? ""))}</td>`).join("")}</tr>`
    : `<tr><th>${escapeHtml(r.row)}</th><td>${escapeHtml(String(Object.values(r.values || {})[0] ?? ""))}</td></tr>`
  ).join("");
  const modal = document.getElementById("modal");
  modal.innerHTML = `
    <h2>${escapeHtml(c.brand)} charging chart</h2>
    <div class="sub">${escapeHtml(c.refrigerant)} · ${escapeHtml(c.meteringDevice || "")}</div>
    <div class="detail-section"><p>${escapeHtml(c.models)}</p></div>
    ${c.notes ? `<div class="detail-section"><p>${escapeHtml(c.notes)}</p></div>` : ""}
    <div class="cc-chart-scroll"><table class="cc-chart-table">${head}${body}</table></div>
    <div class="detail-section"><h3>Units</h3><p>${escapeHtml(c.units)}</p></div>
    <div class="detail-section"><h3>Source</h3><p>${escapeHtml(c.source)}</p></div>
    <div class="modal-actions"><button id="closeModalBtn">Close</button></div>
  `;
  document.getElementById("closeModalBtn").onclick = closeModal;
  document.getElementById("modalBackdrop").classList.remove("hidden");
  trackEvent("opened charging chart: " + c.brand + " " + c.refrigerant);
}

function renderChargeCalc() {
  const refrig = document.getElementById("cc-refrig").value;
  const chart = PT_CHARTS[refrig];
  const meter = document.getElementById("cc-meter").value;
  const eff = document.getElementById("cc-eff").value;
  const od = ccNum("cc-od"), id_ = ccNum("cc-id");
  const suct = ccNum("cc-suct"), head = ccNum("cc-head");
  let sh = ccNum("cc-sh"); const slt = ccNum("cc-slt");
  let sc = ccNum("cc-sc"); const llt = ccNum("cc-llt");
  const scTargetRaw = ccNum("cc-sctarget");
  const scTarget = scTargetRaw ?? 10;
  const wb = ccNum("cc-wb");

  renderChargeTargets(chart, refrig, meter, eff, od, id_, wb, scTarget, scTargetRaw == null);
  document.querySelectorAll("#cc-targets .cc-chart-link").forEach(b => {
    b.onclick = () => openChargingChart(b.dataset.chart);
  });

  const out = [];
  const flags = { lowCharge: 0, overcharge: 0, restriction: 0, airflow: 0 };

  const evapSat = suct != null ? ptInterp(chart.dew, suct) : null;
  const condSat = head != null ? ptInterp(chart.bubble, head) : null;
  if (sh == null && slt != null && evapSat != null) sh = slt - evapSat;
  if (sc == null && llt != null && condSat != null) sc = condSat - llt;

  // --- Suction / evaporator ---
  if (suct == null) {
    out.push(ccVerdict("need", "<strong>Suction pressure:</strong> enter suction psig to read the evaporator."));
  } else if (evapSat == null) {
    out.push(ccVerdict("bad", `<strong>Suction ${suct} psig is outside the ${refrig} chart</strong> — double-check the reading and the refrigerant selection.`));
  } else {
    let txt = `<strong>Suction ${suct} psig → evaporator saturating at ${evapSat.toFixed(0)}°F</strong> (${refrig}${chart.glide ? ", dew point" : ""}).`;
    if (id_ == null) {
      out.push(ccVerdict("need", txt, "Enter the indoor return temp to judge whether that's normal (typical evap runs ~35°F below return air)."));
    } else {
      const dtd = id_ - evapSat;
      if (dtd >= 30 && dtd <= 42) out.push(ccVerdict("ok", txt + ` That's ${dtd.toFixed(0)}°F below the ${id_}°F return — normal range (~30-42°F).`));
      else if (dtd > 42) { flags.lowCharge++; flags.airflow++; out.push(ccVerdict("bad", txt + ` That's ${dtd.toFixed(0)}°F below the ${id_}°F return — LOW suction.`, "Common causes: low charge, low indoor airflow (filter/coil/blower), metering device underfeeding, liquid-line restriction.")); }
      else if (dtd < 20) out.push(ccVerdict("bad", txt + ` Only ${dtd.toFixed(0)}°F below the ${id_}°F return — HIGH suction.`, "Common causes: high load/high return temp, metering overfeeding, or a compressor that isn't pumping (check compression ratio)."));
      else out.push(ccVerdict("warn", txt + ` ${dtd.toFixed(0)}°F below the ${id_}°F return — slightly high side of normal.`, "Recheck with a stable indoor temp; high load pulls suction up."));
    }
  }

  // --- Head / condenser ---
  if (head == null) {
    out.push(ccVerdict("need", "<strong>Head pressure:</strong> enter head psig to read the condenser."));
  } else if (condSat == null) {
    out.push(ccVerdict("bad", `<strong>Head ${head} psig is outside the ${refrig} chart</strong> — double-check the reading and the refrigerant selection.`));
  } else {
    let txt = `<strong>Head ${head} psig → condensing at ${condSat.toFixed(0)}°F</strong>${chart.glide ? " (bubble point)" : ""}.`;
    if (od == null) {
      out.push(ccVerdict("need", txt, "Enter the outdoor temp to judge it — condensers typically run 15-30°F over ambient depending on efficiency."));
    } else {
      const ctoa = condSat - od;
      const [lo, hi] = eff === "high" ? [12, 22] : [18, 30];
      if (ctoa >= lo && ctoa <= hi) out.push(ccVerdict("ok", txt + ` ${ctoa.toFixed(0)}°F over the ${od}°F outdoor — normal for a ${eff === "high" ? "high-efficiency" : "standard"} condenser (~${lo}-${hi}°F over).`));
      else if (ctoa > hi) { flags.overcharge++; flags.restriction++; out.push(ccVerdict("bad", txt + ` ${ctoa.toFixed(0)}°F over the ${od}°F outdoor — HIGH head.`, "Common causes: dirty/blocked condenser coil, condenser fan problem, overcharge, air/non-condensables in the system, recirculating discharge air.")); }
      else { flags.lowCharge++; out.push(ccVerdict("bad", txt + ` Only ${ctoa.toFixed(0)}°F over the ${od}°F outdoor — LOW head.`, "Common causes: low charge, mild weather (verify with subcooling), or a compressor not building pressure.")); }
    }
  }

  // --- Subcooling ---
  if (sc == null) {
    out.push(ccVerdict("need", "<strong>Subcooling:</strong> enter it directly, or give head psig + liquid line temp and it computes here."));
  } else {
    let txt = `<strong>Subcooling ${sc.toFixed(0)}°F</strong> (target ~${scTarget}°F${ccNum("cc-sctarget") == null ? " — using 10°F default, check the nameplate" : " from nameplate"}).`;
    if (Math.abs(sc - scTarget) <= 3) out.push(ccVerdict("ok", txt + " On target."));
    else if (sc > scTarget + 3) {
      flags.overcharge++; flags.restriction++;
      out.push(ccVerdict("bad", txt + " HIGH — liquid is backing up in the condenser.", "Common causes: overcharge, liquid-line restriction (drier, kinked line), TXV/EEV underfeeding. Pair with suction: low suction + high SC points at restriction/underfeed; normal suction + high SC points at overcharge."));
    } else if (sc < 4) { flags.lowCharge++; out.push(ccVerdict("bad", txt + " LOW — not enough liquid seal in the condenser.", "Common causes: undercharge/leak. Low SC + high SH + low suction is the classic low-charge signature.")); }
    else out.push(ccVerdict("warn", txt + " A little low — verify charge against the nameplate value before adding."));
  }

  // --- Superheat ---
  if (sh == null) {
    out.push(ccVerdict("need", "<strong>Superheat:</strong> enter it directly, or give suction psig + suction line temp and it computes here."));
  } else {
    let txt = `<strong>Superheat ${sh.toFixed(0)}°F</strong> at the suction line${chart.glide ? " (vs dew point — correct for " + refrig + ")" : ""}.`;
    if (meter === "orifice") {
      if (od != null && wb != null) {
        const target = ((3 * wb) - 80 - od) / 2;
        if (target < 5) out.push(ccVerdict("warn", txt + ` Target superheat computes to ${target.toFixed(0)}°F for ${od}°F outdoor / ${wb}°F indoor WB — too low to charge by superheat in these conditions.`, "Don't add charge on a cool/dry day using superheat — recover conditions or weigh the charge."));
        else if (Math.abs(sh - target) <= 4) out.push(ccVerdict("ok", txt + ` Target ≈ ${target.toFixed(0)}°F for these conditions — on target.`));
        else if (sh > target + 4) { flags.lowCharge++; out.push(ccVerdict("bad", txt + ` Target ≈ ${target.toFixed(0)}°F — HIGH superheat, coil is being starved.`, "Common causes: low charge, restriction, low indoor load.")); }
        else { flags.overcharge++; out.push(ccVerdict("bad", txt + ` Target ≈ ${target.toFixed(0)}°F — LOW superheat, risk of flooding the compressor.`, "Common causes: overcharge on a fixed orifice, high indoor load/humidity. Below ~5°F, stop and recover charge before running.")); }
      } else {
        out.push(ccVerdict("need", txt, "Fixed-orifice target superheat needs outdoor temp AND indoor wet bulb — enter both and the target computes here."));
      }
    } else {
      if (sh >= 6 && sh <= 15) out.push(ccVerdict("ok", txt + " Normal for TXV/EEV (~6-15°F at the condensing unit; the valve controls superheat — charge to subcooling)."));
      else if (sh > 15) { flags.lowCharge++; flags.restriction++; out.push(ccVerdict("bad", txt + " HIGH for a TXV system.", "Common causes: low charge (check SC), plugged drier/restriction, TXV starving (lost bulb charge, plugged inlet screen).")); }
      else out.push(ccVerdict("bad", txt + " LOW — flood risk.", "Common causes: TXV overfeeding (bulb loose/uninsulated), massive overcharge. Below ~5°F protect the compressor first.")); }
  }

  // --- Pattern read ---
  const patterns = [];
  if (flags.lowCharge >= 2 && flags.overcharge === 0) patterns.push("Multiple readings point at LOW CHARGE — leak-search before topping off.");
  if (flags.overcharge >= 2 && flags.lowCharge === 0) patterns.push("Multiple readings point at OVERCHARGE — recover, don't vent.");
  if (flags.restriction >= 2) patterns.push("High subcool with starved low side is the classic LIQUID-LINE RESTRICTION / underfeed pattern — check the filter-drier temperature drop.");
  if (patterns.length) out.push(`<div class="cc-pattern">🧭 ${patterns.map(escapeHtml).join("<br>")}</div>`);

  document.getElementById("cc-results").innerHTML = `<div class="card cc-card">${out.join("")}</div>`;
}

for (const fid of ["cc-refrig","cc-meter","cc-eff","cc-od","cc-id","cc-suct","cc-head","cc-sh","cc-slt","cc-sc","cc-llt","cc-sctarget","cc-wb"]) {
  document.getElementById(fid).addEventListener("input", renderChargeCalc);
  document.getElementById(fid).addEventListener("change", renderChargeCalc);
}

// ============================================================
// Scan-to-chart — photograph the outdoor and indoor tags and the
// calc finds the manufacturer's own charging table for that exact
// matchup, highlights the row, and feeds the printed subcool target
// into the math instead of the 10°F default.
// ============================================================

function ccNormModel(s) {
  return String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}

// Matchable tokens out of a chart's free-text `models` line. A token is a
// model prefix like "ML16KP2-024", "DX6VS", "4TTX8", "GSX" — not prose.
const CC_TOKEN_STOP = new Set(["AND","THE","FOR","WITH","TON","SEER","FIT","EEV","TXV","OUTDOOR","INDOOR","UNITS","LISTED","TABLE","HEAT","PUMP","GAS","AIR"]);
function ccChartTokens(chart) {
  const out = [];
  for (const raw of String(chart.models || "").split(/[\s,()\/]+/)) {
    // pattern strings like "DX6VS***1*A*" match by their literal prefix
    const t = raw.split("*")[0].replace(/[^A-Za-z0-9-]/g, "");
    if (!t || t !== t.toUpperCase()) continue;               // prose is mixed-case
    const keep = (n) => {
      if (!n || CC_TOKEN_STOP.has(n)) return;
      if (!(n.length >= 4 && /\d/.test(n)) && !(n.length === 3 && /^[A-Z]{3}$/.test(n))) return;
      out.push(n);
    };
    keep(ccNormModel(t));
    // "ML15KSPV-018/-024/…" lists only carry the first size as a full token —
    // the dash-prefix base (ML15KSPV) has to match the other sizes too.
    if (t.includes("-")) keep(ccNormModel(t.split("-")[0]));
  }
  return [...new Set(out)];
}

// Rank charts for a scanned outdoor model — longest matching prefix wins.
function ccMatchCharts(outModel) {
  const m = ccNormModel(outModel);
  if (!m || typeof CHARGING_CHARTS === "undefined") return [];
  const hits = [];
  for (const c of CHARGING_CHARTS) {
    let best = 0;
    for (const t of ccChartTokens(c)) if (m.startsWith(t) && t.length > best) best = t.length;
    if (best) hits.push({ chart: c, score: best });
  }
  return hits.sort((a, b) => b.score - a.score);
}

// On a matchup chart (rows like "ML15KSPV-018 / CBK43UHE-018"), find the row
// for this outdoor+indoor pair. Outdoor narrows first when it's present in
// the row text; indoor then has to match the row's indoor half.
function ccMatchRow(chart, outModel, inModel) {
  const om = ccNormModel(outModel), im = ccNormModel(inModel);
  if (!im) return -1;
  let bestIdx = -1, bestLen = 0;
  chart.rows.forEach((r, i) => {
    const parts = String(r.row).split("/").map(p => ccNormModel(p));
    if (parts.length < 2) return;                            // not a matchup row
    const ro = parts[0];
    if (om && ro && !(om.startsWith(ro) || ro.startsWith(om))) return;
    // Indoor half may list several sizes: "CBK48MVT-018/024" splits into
    // ["CBK48MVT018", "024"] — a bare-digit continuation inherits the alpha
    // base of the model before it.
    let base = "";
    for (const part of parts.slice(1)) {
      let cand = part;
      if (/^\d+$/.test(part) && base) cand = base + part;
      else { const m2 = part.match(/^(.*?[A-Z])\d+$/); base = m2 ? m2[1] : ""; }
      if (!cand) continue;
      if (im.startsWith(cand) || cand.startsWith(im)) {
        if (cand.length > bestLen) { bestLen = cand.length; bestIdx = i; }
      }
    }
  });
  return bestIdx;
}

// Efficiency tier straight from the model number. Most residential families
// embed the nominal SEER right after the family prefix (GSX16, RA14, XC13,
// DX13SA); Trane single-digit tiers read 4TTR4 = 14. Inverter/variable-speed
// families are high-efficiency by construction. Returns "std", "high", or
// null when the model doesn't say - null means leave the picker alone.
function ccInferEff(model) {
  const m = ccNormModel(model);
  if (!m) return null;
  // inverter / variable-speed families - always high-efficiency condensers
  if (/^(ML15KSPV|ML16KP|SL22KLV|SL25|SL28|XP2[0-9]|XC2[0-9]|EL18KCV|EL22|GSXV|GSZV|ASXV|ASZV|AVZC|GVZC|24VNA|25VNA|DX20VC|DZ20VC|D[CHZ][679]VS|DZ17VS|RA20|RP20)/.test(m)) return "high";
  let n = null, x;
  if ((x = m.match(/^(?:GSX|GSZ|ASX|ASZ|DSX|DSZ|SSX|SSZ|ANX|ANZ|VSX|VSZ|GSC|GSH|GLXS|GLZS)(\d{2})/))) n = +x[1];
  else if ((x = m.match(/^D[XZ](\d{2})(?:S|TC)/))) n = +x[1];
  else if ((x = m.match(/^(?:RA|WA|RP|WP|RD)(\d{2})/))) n = +x[1];
  else if ((x = m.match(/^(1[34])AJ[MN]/))) n = +x[1];
  else if ((x = m.match(/^[45]T[TW][RXBZV](\d)/))) n = x[1] === "0" ? 20 : 10 + +x[1];
  else if ((x = m.match(/^X[CP](\d{2})/))) n = +x[1];
  else if ((x = m.match(/^(\d{2})(?:ACX|HPX)/))) n = +x[1];
  else if ((x = m.match(/^EL(\d{2})X/))) n = +x[1];
  else if ((x = m.match(/^ML(\d{2})X/))) n = +x[1];
  if (n == null || n < 10 || n > 26) return null;
  return n >= 15 ? "high" : "std";
}

// Refrigerant from the model family, for units with no chart in the library.
// Conservative by design: only families whose refrigerant generation is
// unambiguous. Trane's leading digit literally encodes it (4 = R-410A,
// 5 = R-454B; the R-22 era was 2). R-22 families (GSC13/GSH13...) return
// null - the calc has no R-22 tables and guessing would be worse.
function ccInferRefrig(model) {
  const m = ccNormModel(model);
  if (!m) return null;
  // R-454B era
  if (/^(ML15KSPV|ML16KP|SL22KLV|EL18KCV|EL22KCV|5T[TW][RXW])/.test(m)) return "R-454B";
  // R-32 era (outdoor units only - a furnace model like DR96 says nothing
  // about which refrigerant the paired condenser runs)
  if (/^(GLXS|GLZS|D[CH][345]S[QE]|DC6VS|DH6VS|DC9VS|DH7VS|DH9VS)/.test(m)) return "R-32";
  // R-410A era
  if (/^(GSX1|GSZ1|ASX1|ASZ1|DSX1|DSZ1|SSX1|SSZ1|ANX1|ANZ1|VSX1|VSZ1|GSXV|GSZV|ASXV|ASZV|AVZC|GVZC)/.test(m)) return "R-410A";
  if (/^(DX1[3-8]|DZ1[3-8]|DX20VC|DZ20VC|DZ17VS)/.test(m)) return "R-410A";
  if (/^4T[TW][RXBZV]/.test(m)) return "R-410A";
  if (/^(X[CP]1[3-9]|X[CP]2[0-9]|1[346]ACX|14HPX|ML1[467]X|EL1[678]X|SL2[58]X)/.test(m)) return "R-410A";
  if (/^(RA1[3-9]|RA20|RP1[4-9]|RP20|WA1[3-5]|WP1[4-5]|1[34]AJ[MN])/.test(m)) return "R-410A";
  if (/^(24VNA|25VNA|24A[BC]|25H[BC])/.test(m)) return "R-410A";
  if (/^Y[CH][JG]/.test(m)) return "R-410A";
  return null;
}

// Metering from a matched chart's own meteringDevice line - only when the
// document actually commits to one.
function ccInferMeter(chart) {
  const d = String(chart && chart.meteringDevice || "").toLowerCase();
  if (!d || d.includes("both") || d.includes("not stated")) return null;
  if (d.includes("orifice") || d.includes("piston")) return "orifice";
  if (d.includes("txv") || d.includes("eev")) return "txv";
  return null;
}

async function ccScanPhoto(which, file) {
  const st = document.getElementById("ccScanStatus");
  const show = (msg) => { if (msg) { st.textContent = msg; st.classList.remove("hidden"); } else st.classList.add("hidden"); };
  trackEvent("charge calc scanned " + which + " tag");
  try {
    show("Reading the " + which + " tag… first scan on a phone takes ~15-30 seconds.");
    const fields = await ocrTagFields(file, show);
    show(null);
    if (!fields.model) {
      show("Couldn't find a model number on the " + which + " tag — try a straighter, closer shot, or type it in the box.");
      return;
    }
    document.getElementById(which === "outdoor" ? "ccOutModel" : "ccInModel").value = fields.model;
    ccApplyScan();
  } catch (err) {
    show("Scan failed: " + (err && err.message ? err.message : err) + " — you can type the model instead.");
  }
}

function ccApplyScan() {
  const outModel = document.getElementById("ccOutModel").value.trim();
  const inModel = document.getElementById("ccInModel").value.trim();
  const box = document.getElementById("ccScanResult");
  if (!outModel && !inModel) { box.innerHTML = ""; return; }

  // Furnaces have no business in a refrigerant charging calc - a furnace
  // model says nothing about the condenser, its refrigerant, or its charge.
  // Catch them by the same pattern table the tag scanner uses and say so
  // instead of half-matching something.
  const isFurnace = (m) => {
    if (!m) return false;
    const id = identifyModel(m, "", null);
    return !!(id && /Furnace/i.test(id.equipment || ""));
  };
  if (isFurnace(outModel)) {
    box.innerHTML = `<div class="cc-scan-miss"><strong>${escapeHtml(outModel)}</strong> is a furnace — the charging scan needs the OUTDOOR unit's tag. Scan the condenser or heat pump data plate instead (and the indoor coil/air handler for matchup tables).</div>`;
    trackEvent("charge scan rejected furnace: " + outModel);
    return;
  }
  if (isFurnace(inModel)) {
    box.innerHTML = `<div class="cc-scan-miss"><strong>${escapeHtml(inModel)}</strong> is a furnace — for the indoor side, scan the COIL or air-handler tag (that is what the matchup tables are keyed by), not the furnace.</div>`;
    trackEvent("charge scan rejected furnace: " + inModel);
    return;
  }

  // What the model number alone already tells us, chart or no chart.
  const autoSet = [];
  const eff = ccInferEff(outModel);
  if (eff) {
    const effSel = document.getElementById("cc-eff");
    if (effSel.value !== eff) { effSel.value = eff; }
    autoSet.push("condenser type: " + (eff === "high" ? "high-efficiency (15+ SEER)" : "standard (up to ~14 SEER)") + " from the model number");
  }
  const refrigGuess = ccInferRefrig(outModel);
  if (refrigGuess) {
    const sel = document.getElementById("cc-refrig");
    const want = [...sel.options].find(o => ccNormModel(o.value) === ccNormModel(refrigGuess));
    if (want && sel.value !== want.value) {
      sel.value = want.value;
      autoSet.push("refrigerant: " + refrigGuess + " from the model family");
    }
  }

  let hits = ccMatchCharts(outModel);
  // Indoor-only scan: offer any matchup chart whose rows mention this indoor.
  if (!hits.length && inModel) {
    hits = (typeof CHARGING_CHARTS !== "undefined" ? CHARGING_CHARTS : [])
      .filter(c => ccMatchRow(c, "", inModel) !== -1)
      .map(c => ({ chart: c, score: 1 }));
  }
  if (!hits.length) {
    box.innerHTML = `<div class="cc-scan-miss">No factory chart for <strong>${escapeHtml(outModel || inModel)}</strong> in the offline library — the rule-of-thumb targets below still apply. Check the unit's own charging sticker or nameplate subcool value and enter it above.</div>`
      + (autoSet.length ? `<div class="cc-scan-applied">✅ Auto-set ${escapeHtml(autoSet.join("; "))}.</div>` : "");
    trackEvent("charge scan no chart: " + (outModel || inModel));
    renderChargeCalc();
    return;
  }
  // Metering device, when the matched document commits to one.
  const meter = ccInferMeter(hits[0].chart);
  if (meter) {
    document.getElementById("cc-meter").value = meter;
    autoSet.push("metering: " + (meter === "txv" ? "TXV/EEV" : "fixed orifice/piston") + " from the factory chart");
  }
  // Refrigerant follows the BEST-matched chart - the document beats the
  // model-family guess when both speak.
  {
    const sel = document.getElementById("cc-refrig");
    const want = [...sel.options].find(o => ccNormModel(o.value) === ccNormModel(hits[0].chart.refrigerant));
    if (want && sel.value !== want.value) {
      sel.value = want.value;
      autoSet.push("refrigerant: " + hits[0].chart.refrigerant + " from the factory chart");
    }
  }

  const cards = [];
  let applied = null;
  for (const { chart } of hits.slice(0, 3)) {
    const rowIdx = ccMatchRow(chart, outModel, inModel);
    let rowHtml = "";
    if (rowIdx !== -1) {
      const r = chart.rows[rowIdx];
      const vals = Object.entries(r.values).map(([k, v]) =>
        `<li><span class="k">${escapeHtml(k)}</span>${escapeHtml(String(v))}</li>`).join("");
      rowHtml = `<div class="cc-scan-rowhit"><strong>Your matchup:</strong> ${escapeHtml(r.row)}<ul class="scan-id-facts">${vals}</ul></div>`;
      // Feed the printed cooling subcool target into the calc once.
      if (!applied && /subcool/i.test(chart.id)) {
        const coolKey = Object.keys(r.values).find(k => /cool/i.test(k) && !/heat/i.test(k)) || Object.keys(r.values)[0];
        const n = parseFloat(String(r.values[coolKey]).replace(/[^0-9.\-]/g, ""));
        if (!isNaN(n)) {
          document.getElementById("cc-sctarget").value = n;
          applied = { chart, key: coolKey, n };
        }
      }
      trackEvent("charge scan matched row: " + chart.id);
    } else {
      trackEvent("charge scan matched chart: " + chart.id);
    }
    cards.push(`<div class="cc-scan-hit">
      <div><strong>${escapeHtml(chart.brand)}</strong> — ${escapeHtml(chart.refrigerant)} factory chart${rowIdx !== -1 ? "" : (inModel ? " (indoor model didn't match a row — open the chart and pick your matchup)" : " (scan or type the indoor model to pin your exact row)")}</div>
      ${rowHtml}
      <button class="cc-chart-link" data-chart="${escapeHtml(chart.id)}">📋 Open the full chart</button>
    </div>`);
  }
  const notes = autoSet.slice();
  if (applied) notes.push(`subcool target: <strong>${applied.n}°F</strong> from the factory table (${escapeHtml(applied.key)}) — the readings below now judge against the printed number, not the 10°F default`);
  box.innerHTML = cards.join("")
    + (notes.length ? `<div class="cc-scan-applied">✅ Auto-set — ${notes.map(n => /</.test(n) ? n : escapeHtml(n)).join("; ")}.</div>` : "");
  box.querySelectorAll(".cc-chart-link").forEach(b => { b.onclick = () => openChargingChart(b.dataset.chart); });
  renderChargeCalc();
}

document.getElementById("ccScanOutBtn").addEventListener("click", () => document.getElementById("ccScanOutInput").click());
document.getElementById("ccScanInBtn").addEventListener("click", () => document.getElementById("ccScanInInput").click());
document.getElementById("ccScanOutInput").addEventListener("change", (e) => {
  const f = e.target.files && e.target.files[0]; if (f) ccScanPhoto("outdoor", f); e.target.value = "";
});
document.getElementById("ccScanInInput").addEventListener("change", (e) => {
  const f = e.target.files && e.target.files[0]; if (f) ccScanPhoto("indoor", f); e.target.value = "";
});
document.getElementById("ccOutModel").addEventListener("change", ccApplyScan);
document.getElementById("ccInModel").addEventListener("change", ccApplyScan);

// ============================================================
// Gauge / thermometer display scan - photograph the digital manifold
// screen (techs run Fieldpiece SM480V / SMAN series) and pull the numbers
// off it: LOW / HIGH psig, SH / SC, T1 (suction line) / T2 (liquid line)
// probe temps and the refrigerant name. Nothing is written into the calc
// until the tech confirms each value and the field it goes to. Analog
// needle gauges cannot be read this way - the card says so.
// ============================================================
const CC_GAUGE_FIELDS = [
  ["cc-suct", "Suction psig"], ["cc-head", "Head psig"], ["cc-sh", "Superheat F"], ["cc-sc", "Subcooling F"],
  ["cc-slt", "Suction line temp F"], ["cc-llt", "Liquid line temp F"], ["cc-od", "Outdoor temp F"], ["cc-id", "Indoor return F"], ["cc-wb", "Indoor wet bulb F"], ["", "Ignore"],
];
function ccGaugeParse(raw) {
  // Normalise the OCR soup: degree glyphs, PSIG/PSI, O->0 inside numbers, commas as decimals.
  let t = String(raw || "").replace(/[\u00B0\u00BA\u02DA]/g, " deg ").replace(/\r/g, "\n");
  t = t.replace(/(\d)[,](\d)/g, "$1.$2");
  // digit look-alikes inside number-ish tokens (OCR reads 1l8 for 118, 34Z for 342, 1O5 for 105)
  t = t.replace(/(?<![A-Za-z-])\b(?=[0-9OoIlZSB.]{2,}\b)(?=[^\s]*\d)[0-9OoIlZSB.]+\b(?![A-Za-z])/g, tok => tok.replace(/[oO]/g, "0").replace(/[Il]/g, "1").replace(/Z/g, "2").replace(/S/g, "5").replace(/B/g, "8"));
  t = t.replace(/\bR[-\s]?4[1l][0O]A\b/gi, "R-410A").replace(/\bR[-\s]?4[5S]4B\b/gi, "R-454B").replace(/\bR[-\s]?3[2Z]\b/gi, "R-32").replace(/\bR[-\s]?[2Z][2Z]\b/gi, "R-22");
  const up = t.toUpperCase();
  const found = [];                                    // {value, label, field, why}
  const used = new Set();
  const num = "(-?\\d{1,3}(?:\\.\\d{1,2})?)";
  const take = (re, label, field, why) => {
    let m; const r = new RegExp(re, "g");
    while ((m = r.exec(up))) {
      const v = parseFloat(m[1]);
      if (!isFinite(v)) continue;
      const key = field + ":" + v;
      if (used.has(key)) continue; used.add(key);
      found.push({ value: v, label, field, why });
      return true;
    }
    return false;
  };
  // refrigerant shown on the display
  const rm = up.match(/\bR[-\s]?(410A|454B|32|22|407C|134A|404A|407A|448A|449A)\b/);
  const refrig = rm ? "R-" + rm[1] : "";
  // labelled pressures (Fieldpiece prints LOW / HIGH next to the PSIG numbers)
  take("(?<![A-Z])LOW(?![A-Z])[^\\d-]{0,12}" + num, "LOW psig", "cc-suct", "LOW label");
  take("(?<![A-Z])HIGH(?![A-Z])[^\\d-]{0,12}" + num, "HIGH psig", "cc-head", "HIGH label");
  // superheat / subcool
  take("(?<![A-Z])(?:SUPERHEAT|SUPER HEAT|SH)(?![A-Z])[^\\d-]{0,8}" + num, "Superheat", "cc-sh", "SH label");
  take("(?<![A-Z])(?:SUBCOOL(?:ING)?|SUB COOL|SC)(?![A-Z])[^\\d-]{0,8}" + num, "Subcooling", "cc-sc", "SC label");
  // probe temps: T1 = low-side pipe clamp, T2 = high-side (Fieldpiece convention); also SUCT/LIQ words
  take("(?<![A-Z0-9])T1(?![A-Z])[^\\d-]{0,8}" + num, "T1 (suction line)", "cc-slt", "T1 probe");
  take("(?<![A-Z0-9])T2(?![A-Z])[^\\d-]{0,8}" + num, "T2 (liquid line)", "cc-llt", "T2 probe");
  take("\\b(?:SUCT(?:ION)?|LINE TEMP LOW|LOW LINE)\\b[^\\d-]{0,10}" + num + "\\s*(?:DEG|F\\b)", "Suction line temp", "cc-slt", "SUCT label");
  take("\\b(?:LIQ(?:UID)?|LINE TEMP HIGH|HIGH LINE)\\b[^\\d-]{0,10}" + num + "\\s*(?:DEG|F\\b)", "Liquid line temp", "cc-llt", "LIQ label");
  take("\\b(?:OUTDOOR|AMBIENT|OAT|ODT)\\b[^\\d-]{0,10}" + num, "Outdoor temp", "cc-od", "OUTDOOR label");
  take("\\b(?:RETURN|INDOOR|RAT|DB)\\b[^\\d-]{0,10}" + num, "Indoor return", "cc-id", "RETURN label");
  take("\\b(?:WB|WET BULB)\\b[^\\d-]{0,10}" + num, "Indoor wet bulb", "cc-wb", "WB label");
  // unlabelled psig values: smaller one = suction, larger = head, only if not already labelled
  const psi = []; let m; const pr = new RegExp(num + "\\s*PSI(?:G)?\\b", "g");
  while ((m = pr.exec(up))) { const v = parseFloat(m[1]); if (isFinite(v) && v >= 0 && v <= 800) psi.push(v); }
  const haveSuct = found.some(f => f.field === "cc-suct"), haveHead = found.some(f => f.field === "cc-head");
  if (psi.length && !(haveSuct && haveHead)) {
    const uniq = [...new Set(psi)].sort((a, b) => a - b);
    if (uniq.length >= 2) { if (!haveSuct) found.push({ value: uniq[0], label: "psig (lower)", field: "cc-suct", why: "lower of two PSIG values" }); if (!haveHead) found.push({ value: uniq[uniq.length - 1], label: "psig (higher)", field: "cc-head", why: "higher of two PSIG values" }); }
    else if (uniq.length === 1) { const v = uniq[0]; const guess = v > 200 ? "cc-head" : "cc-suct"; if (!found.some(f => f.field === guess)) found.push({ value: v, label: "psig", field: guess, why: v > 200 ? "over 200 psig - looks like head" : "under 200 psig - looks like suction" }); }
  }
  // leftover temperatures (deg F) the tech can assign by hand
  const tr = new RegExp(num + "\\s*(?:DEG\\s*F?|F\\b)", "g"); const temps = [];
  while ((m = tr.exec(up))) { const v = parseFloat(m[1]); if (isFinite(v) && v > -40 && v < 300 && !found.some(f => f.value === v)) temps.push(v); }
  for (const v of [...new Set(temps)].slice(0, 4)) found.push({ value: v, label: "temp F (unlabelled)", field: "", why: "no label read next to it - pick the field or ignore" });
  // plausibility: a value outside the range its box can mean is demoted to "unlabelled" for the tech to place by hand
  const range = { "cc-suct": [5, 400], "cc-head": [100, 800], "cc-sh": [0, 80], "cc-sc": [0, 80], "cc-slt": [-20, 200], "cc-llt": [-20, 250], "cc-od": [-40, 140], "cc-id": [30, 120], "cc-wb": [30, 100] };
  // OCR often drops the decimal point on the display ("524F" for 52.4 F): a 3-4 digit temperature is re-read with one decimal
  for (const f of found) if (/^cc-(slt|llt|od|id|wb|sh|sc)$/.test(f.field) && Number.isInteger(f.value) && f.value >= 200 && f.value <= 1999) { f.value = f.value / 10; f.why += " (decimal restored)"; }
  for (const f of found) { const r = range[f.field]; if (r && (f.value < r[0] || f.value > r[1])) { f.why += " - out of range for that box"; f.label += " (?)"; f.field = ""; } }
  return { refrig, found: found.filter((f, i, arr) => f.field || arr.findIndex(g => g.value === f.value) === i), raw: t };
}
async function ccScanGauge(file) {
  const st = document.getElementById("ccGaugeStatus");
  const show = (msg) => { if (msg) { st.textContent = msg; st.classList.remove("hidden"); } else st.classList.add("hidden"); };
  trackEvent("charge calc scanned gauge display");
  try {
    show("Reading the display... first scan on a phone takes ~15-30 seconds.");
    const base = await preprocessPhoto(file);
    const worker = await getTessWorker(show);
    let best = null;
    for (const deg of [0, 180, 90, 270]) {
      const { data } = await worker.recognize(deg ? rotateCanvas(base, deg) : base);
      const parsed = ccGaugeParse(data.text || "");
      const score = parsed.found.filter(f => f.field).length + (parsed.refrig ? 1 : 0);
      if (!best || score > best.score) best = { parsed, score, deg };
      if (score >= 3) break;
    }
    show(null);
    ccRenderGauge(best.parsed);
  } catch (err) {
    show("Scan failed: " + (err && err.message ? err.message : err) + " - type the readings in the boxes.");
  }
}
function ccRenderGauge(parsed) {
  const box = document.getElementById("ccGaugeResult");
  const rows = parsed.found;
  if (!rows.length && !parsed.refrig) {
    box.innerHTML = `<div class="card cc-card cc-gauge"><b>Could not read any numbers off that photo.</b><div class="cc-note">Works on digital displays (Fieldpiece SM480V / SMAN, Testo, clamp thermometers) - fill the screen, no glare, hold it square. Analog needle gauges can't be read - type those in.</div><div class="cc-gauge-raw">Seen: ${escapeHtml(parsed.raw.replace(/\s+/g, " ").slice(0, 160))}</div></div>`;
    return;
  }
  const opt = (sel) => CC_GAUGE_FIELDS.map(([v, l]) => `<option value="${v}" ${v === sel ? "selected" : ""}>${escapeHtml(l)}</option>`).join("");
  box.innerHTML = `
    <div class="card cc-card cc-gauge">
      <b>Read off the display - check each one, then Apply</b>
      ${parsed.refrig ? `<label class="cc-gauge-row"><input type="checkbox" class="cc-gauge-ref" checked> Refrigerant <b>${escapeHtml(parsed.refrig)}</b> <span class="cc-note">(shown on the gauge)</span></label>` : ""}
      ${rows.map((r, i) => `<div class="cc-gauge-row"><span class="cc-gauge-val">${escapeHtml(String(r.value))}</span><span class="cc-gauge-lbl">${escapeHtml(r.label)}</span><select class="cc-gauge-sel" data-i="${i}">${opt(r.field)}</select></div>`).join("")}
      <div class="cc-note">Only the boxes you pick get filled; anything you already typed is left alone unless you tick overwrite. Labels come from the words next to each number - if the display was at an angle, double-check LOW vs HIGH.</div>
      <label class="cc-gauge-row"><input type="checkbox" id="ccGaugeOverwrite"> overwrite values already typed</label>
      <div class="cc-scan-row"><button type="button" id="ccGaugeApply">✅ Apply to the calc</button><button type="button" id="ccGaugeDismiss">Dismiss</button></div>
    </div>`;
  document.getElementById("ccGaugeDismiss").onclick = () => { box.innerHTML = ""; };
  document.getElementById("ccGaugeApply").onclick = () => {
    const overwrite = document.getElementById("ccGaugeOverwrite").checked;
    const applied = [];
    const refBox = box.querySelector(".cc-gauge-ref");
    if (refBox && refBox.checked && parsed.refrig) { const sel = document.getElementById("cc-refrig"); if ([...sel.options].some(o => o.value === parsed.refrig || o.textContent === parsed.refrig)) { sel.value = parsed.refrig; applied.push("refrigerant " + parsed.refrig); } }
    const taken = new Set();
    box.querySelectorAll(".cc-gauge-sel").forEach(sel => {
      const fid = sel.value; if (!fid || taken.has(fid)) return;
      const r = rows[+sel.dataset.i]; const el = document.getElementById(fid); if (!el) return;
      if (el.value !== "" && !overwrite) return;
      el.value = r.value; taken.add(fid); applied.push(CC_GAUGE_FIELDS.find(f => f[0] === fid)[1] + " " + r.value);
    });
    renderChargeCalc();
    trackEvent("gauge scan applied: " + applied.length + " values");
    box.innerHTML = applied.length ? `<div class="cc-scan-applied">✅ Set from the gauge photo - ${escapeHtml(applied.join("; "))}. Check them against the display before you trust the result.</div>` : `<div class="cc-note">Nothing applied - every picked box already had a value (tick overwrite to replace).</div>`;
  };
}
document.getElementById("ccGaugeBtn").addEventListener("click", () => document.getElementById("ccGaugeInput").click());
document.getElementById("ccGaugeInput").addEventListener("change", (e) => { const f = e.target.files && e.target.files[0]; if (f) ccScanGauge(f); e.target.value = ""; });

// ============================================================
// Field calculators — weigh-in, gas meter clocking, cylinder check.
// Pure arithmetic on numbers the tech reads off plates and dials;
// the only built-in constants are the published line-set adders
// (sourced in the on-screen note) and the P/T tables already in the app.
// ============================================================

const fcNum = (id) => {
  const v = document.getElementById(id).value.trim();
  if (v === "") return null;
  const n = parseFloat(v);
  return isNaN(n) ? null : n;
};

function fcWeighRender() {
  const out = document.getElementById("fc-wi-out");
  const lb = fcNum("fc-wi-lb") ?? 0, oz = fcNum("fc-wi-oz") ?? 0;
  const base = fcNum("fc-wi-base"), len = fcNum("fc-wi-len");
  const sizeSel = document.getElementById("fc-wi-size").value;
  const perFt = sizeSel === "custom" ? fcNum("fc-wi-custom") : parseFloat(sizeSel);
  document.getElementById("fc-wi-custom").parentElement.style.display = sizeSel === "custom" ? "" : "none";
  if ((lb === 0 && oz === 0) || base == null || len == null || perFt == null) {
    out.innerHTML = "Enter the nameplate charge, line length, and line size — the total to weigh in computes here.";
    return;
  }
  const nameplateOz = lb * 16 + oz;
  const adjOz = (len - base) * perFt;
  const totalOz = nameplateOz + adjOz;
  if (totalOz <= 0) { out.innerHTML = "That comes out at or below zero — recheck the numbers."; return; }
  const tLb = Math.floor(totalOz / 16), tOz = totalOz - tLb * 16;
  out.innerHTML = `<strong>Weigh in ${tLb} lb ${tOz.toFixed(1)} oz</strong> (${(totalOz / 16).toFixed(2)} lb total)<br>` +
    `= nameplate ${lb} lb ${oz} oz ` +
    (adjOz >= 0
      ? `+ ${adjOz.toFixed(1)} oz for the ${(len - base).toFixed(0)} ft of liquid line past the ${base} ft the factory charge covers`
      : `− ${Math.abs(adjOz).toFixed(1)} oz because the line set is ${(base - len).toFixed(0)} ft SHORTER than the factory charge covers`);
}

function fcClockRender() {
  const out = document.getElementById("fc-gm-out");
  const dial = parseFloat(document.getElementById("fc-gm-dial").value);
  const sec = fcNum("fc-gm-sec"), hv = fcNum("fc-gm-hv") ?? 1000, plate = fcNum("fc-gm-plate");
  if (sec == null || sec <= 0) {
    out.innerHTML = "Time one full revolution of the test dial and the input BTU computes here.";
    return;
  }
  const btuh = (3600 / sec) * dial * hv;
  let verdict = "";
  if (plate) {
    const pct = (btuh / plate) * 100;
    if (pct > 105) verdict = ` — <strong>${pct.toFixed(0)}% of nameplate: OVERFIRED.</strong> Check manifold pressure and orifice sizing before anything else.`;
    else if (pct < 90) verdict = ` — ${pct.toFixed(0)}% of nameplate: underfired. Check gas pressure, orifices, and whether another appliance was still running during the clock.`;
    else verdict = ` — ${pct.toFixed(0)}% of nameplate, within the normal range.`;
  }
  out.innerHTML = `<strong>${Math.round(btuh).toLocaleString()} BTU/h actual input</strong>${verdict}`;
}

function fcCylRender() {
  const out = document.getElementById("fc-cyl-out");
  const refrig = document.getElementById("fc-cyl-ref").value;
  const t = fcNum("fc-cyl-temp");
  if (t == null) { out.innerHTML = "Enter the cylinder temperature and the expected static pressure computes here."; return; }
  const chart = PT_CHARTS[refrig];
  const p = ptInvert(chart.bubble, t);
  if (p == null) { out.innerHTML = "That temperature is outside the " + refrig + " table — double-check it."; return; }
  out.innerHTML = `<strong>A ${refrig} cylinder at ${t}°F with liquid inside should sit at ~${Math.round(p)} psig static</strong>` +
    (chart.glide ? "<br>(bubble-point pressure — on a zeotrope the tank rides the liquid's bubble line; a few psi of drift is normal as the blend fractionates)" : "");
}

for (const id of ["fc-wi-lb","fc-wi-oz","fc-wi-base","fc-wi-len","fc-wi-size","fc-wi-custom"]) {
  document.getElementById(id).addEventListener("input", fcWeighRender);
  document.getElementById(id).addEventListener("change", fcWeighRender);
}
for (const id of ["fc-gm-dial","fc-gm-sec","fc-gm-hv","fc-gm-plate"]) {
  document.getElementById(id).addEventListener("input", fcClockRender);
  document.getElementById(id).addEventListener("change", fcClockRender);
}
for (const id of ["fc-cyl-ref","fc-cyl-temp"]) {
  document.getElementById(id).addEventListener("input", fcCylRender);
  document.getElementById(id).addEventListener("change", fcCylRender);
}
document.querySelectorAll(".fc-tool").forEach(d => {
  d.addEventListener("toggle", () => { if (d.open) trackEvent("opened field calc: " + d.querySelector("summary").textContent.trim()); });
});
fcWeighRender(); fcClockRender(); fcCylRender();

// ============================================================
// Tag Scanner — photo → on-device OCR → model/serial → unit ID
// ============================================================

// Model-number pattern table. Order matters: more specific patterns first.
// brand/equipment strings must match the values used in data.js so the
// jump-to-codes buttons land on real filter selections.
const MODEL_PATTERNS = [
  // --- coverage:lennox-furn-legacy (v125) ---
  { re: /^G(HR)?26Q/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G26 / GHR26 legacy condensing gas furnace (G26Q upflow, GHR26Q horizontal/downflow)", notes: ["Model form is family + Q + design digit + dash + input MBh: G26Q3-75, GHR26Q4/5-100. A trailing -1 on a wiring-diagram title (G26Q3-75-1) is the revision, not part of the size.","G26/GHR26 -1 and -2 units are intermittent pilot (Johnson G776 / Lennox 69J3601 / 41K8701, ONE control LED). -3 through -6 are SureLight with TWO board LEDs - two completely different code tables, both in Error Codes.","GHR26-1 uses the EGC-1 board (DIAG #1 / DIAG #2), which reads right-to-left compared with SureLight - check the board silkscreen before decoding.","Do not read the LEDs with the blower access panel off - there is a sight glass in the panel for that.","LP conversion manifold pressure is 7.5 in. w.c., NOT the 10 in. w.c. used elsewhere in the Lennox line (H-93-12).","Service Literature Corp. 9721-L11 (G26) / 9722-L11 (GHR26) is in Manuals."] },
  { re: /^G(HR)?32[QV]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G32 / GHR32 legacy two-stage condensing gas furnace (Q standard blower, V variable-speed blower)", notes: ["Q = PSC blower, V = variable-speed (VSP-controlled ICM) blower, per the Product Spec titles. Forms: G32Q3-75, G32V5-100/125-4, GHR32Q4/5-120.","TWO different diagnostic tables exist for this family and both are in Error Codes: the 9-pin SureLight two-LED table, and the later two-stage 12-pin control table (DS1/DS2) which adds a separate high-fire pressure switch code (OFF / FAST FLASH).","Low flame signal threshold differs by board: .61 microamps on the SureLight table, .23 microamps on the two-stage table. Read the board part number before judging a flame current.","G32V/GHR32V also carry a VSP blower board with its own DS LEDs - those are blower status, not fault codes.","Service Literature Corp. 9729-L12 (G32Q), 9816-L10 (G32V), 0001-L2 (GHR32Q/GHR32V) are in Manuals."] },
  { re: /^G23Q/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G23(X) legacy upflow standard-efficiency gas furnace", notes: ["Spec-table forms: G23Q2-50, G23Q2X-50, G23Q2/3-75, G23Q4/5-75, G23Q3-100. The (X) on the spec table means the X-suffix variant shares that row.","G23-1 through -4 are intermittent pilot on a Johnson G776 control with ONE LED; G23(X)-5 and -6 are SureLight with TWO LEDs. Both tables are in Error Codes.","Nameplate trap: some G23 nameplates print 7 in. w.c. manifold pressure. The correct natural-gas setting is 3.5 in. w.c. (H-93-12).","Repeat ignition lockouts on early units are usually the pilot assembly lifting flame, not the control - improved pilot kit 81J0501PR (H-94-8).","Service Literature Corp. 9814-L8 is in Manuals."] },
  { re: /^G20R?Q/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G20 / G20E / G20R / G20RE legacy standing-pilot and intermittent-pilot gas furnace (G20 upflow, G20R downflow)", notes: ["Forms: G20Q2-50, G20Q3E-75, G20Q2X-50, G20RQ2/3E-50, G20RQ3XE-75. The E means electronic (intermittent pilot) ignition; no E means standing pilot.","Standing-pilot G20/G20R units have no ignition control and no diagnostic LED at all - troubleshoot the Robertshaw or Honeywell pilot gas valve directly.","G20E/G20RE use a Robertshaw intermittent-pilot module. The service literature does not publish an LED code table for it, so there are no G20 flash codes in Error Codes.","If a Honeywell 80N9201 was fitted as a replacement (kit 53L90), pre-purge becomes 45 s nominal and the trial for ignition 70 s, with no post-purge - it looks like a slow-lighting furnace but is normal (H-01-1).","Service Literature Corp. 9418-L9 (G20) and Corp. 9419-L9 (G20RE) are in Manuals."] },
  { re: /^(G|GSR)21[QV]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G21 / G21V / GSR21 / GSR21V Pulse-combustion condensing gas furnace", notes: ["Pulse models put the input in the model number with no dash: G21Q360, G21Q4/5100, GSR21V5100. Q = relay/PSC blower, V = VSP-controlled variable-speed blower.","Three interchangeable ignition controls were factory fitted and they signal OPPOSITE ways: on the Lennox GC1 the LED is normally OFF (lit = lockout or fault); on the GC3 and Johnson G891 the LED is normally ON. Both tables are in Error Codes.","GC1 units use a separate external Watchguard board (WG1/A18) above the control box; GC3 and G891 do the Watchguard internally.","G891 flame signal must be read with transducer 78H5401 - a flickering LED above 2.5 microamps is a known control quirk, not a low flame signal (H-05-3).","Indoor blower that will not shut off after a heat cycle on a 52J18 GC-3 control is the ignition control, not the fan timer - kit 60J00 (H-99-5).","Service Literature Corp. 9815-L9 is in Manuals."] },
  { re: /^G2[47]M/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G24M / G24MCE / G27M legacy multi-position gas furnace (SureLight era)", notes: ["Forms: G24M-45, G24M2-60, G24M3-60, G27M-100, G27M3-75A-1. G24MCE-2T/-4T/-6T is the export T-voltage variant.","SureLight two-LED table applies (Error Codes). Earlier G24M units shipped with a direct-spark-ignition control instead - check which board is actually in the unit.","G27M SureLight board terminal designations are documented jointly with G26 in H-97-7.","Nuisance pressure-switch trips in windy weather on G24M and 80MGF are addressed by induced-draft-blower/pressure-switch kits 11K95/11K96/11K98/11K99 (H-95-4).","Service Literature Corp. 9723-L12 (G24M) and Corp. 9703-L2 (G27M) are in Manuals."] },
  { re: /^G29M/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G29M multi-position two-stage gas furnace (50 Hz export, EGC-3ACE control)", notes: ["Documented forms are G29M-1T and G29M-2T; the T is the same export voltage convention used on G24MCE.","G29M does NOT use the SureLight two-LED table. Its board is the EGC-3ACE DSI control with DIAG 1 / DIAG 2 LEDs and its own seven-state table - in Error Codes as its own family.","Hard lockout reset sequence is specific: power off, thermostat HEAT to OFF, power on, thermostat OFF to HEAT.","Board has a red diagnostic recall button (hold for the last failure code) and an erase jumper (power off, short 10 s).","Two-stage control replacement kit 40W53 is shared with G27M; wiring diagrams for converted units are in the doc index.","Installation Instructions 504071M are in Manuals - there is no G29M Service Literature."] },
  { re: /^G25MV/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G25MV multi-position variable-speed gas furnace (RAM burner control)", notes: ["Forms: G25MV3-60, G25MV3-60/75, G25MV5-100, G25MV5-120.","Burner control A3 is a RAM Electronics board with a SINGLE diagnostic LED and a flash-count table (2 to 6 flashes) - it is NOT SureLight and NOT the generic Lennox flash list. Its own family is in Error Codes.","Hot surface ignition: 30 s pre-purge, 35 s ignitor warm-up, 7 s trial. Three trials then 60-minute lockout. Flame current must be 1 to 5 microamps; below 1 microamp the control drops out.","Later units may carry a White-Rodgers HSI ignition board instead (see the G25MV wiring diagram title) - confirm the board before using the RAM table.","Service Literature Corp. 9505-L2 is in Manuals."] },
  { re: /^G41UF/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G41UF single-pipe upflow condensing gas furnace (SureLight, 12-pin)", notes: ["Full label form is G41UF-24B-045 / G41UF-36C-090 / G41UF-60D-135; the short form G41UF-045 is just the input.","SureLight board with two LEDs and a 12-PIN connector - the rollout code text says 12-pin, unlike the 9-pin G26-era board. Its own table is in Error Codes.","Low flame signal threshold is 0.18 microamps; drop-out is 0.15 microamps.","Timing: 15 s pre-purge, 20 s ignitor warm-up, 4 s trial for ignition, 5 s post-purge, blower on 45 s after the gas valve.","Service Literature Corp. 0303-L2 is in Manuals."] },
  { re: /^G43UF/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G43UF two-pipe upflow condensing gas furnace (G41UF successor)", notes: ["Forms: G43UF-045 through -135, full label G43UF-24B-045-1, G43UF-36C-090.","Three different control boards were used and the thresholds move with them: 32M88 (DS1 green, low flame 0.18 microamps, 75 V minimum) and 78M47 / 100973-01 (DS1 RED, low flame 1.5 microamps, 90 V minimum). Read the board number first.","On 78M47 and 100973-01 the ignitor energizes only for the first 3 seconds of the 4 second trial.","Pressure-switch faults on upflow units using the left-hand drain connection are often a blocked collector box drain port (H-06-5).","Service Literature Corp. 0416-L4 is in Manuals."] },
  { re: /^G42UH/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G42UH legacy upflow/horizontal gas furnace (documentation gap)", notes: ["The official Lennox document index carries exactly one document for this family - a wiring diagram. There is no Service Literature, no Installation Instructions and no Product Spec.","No diagnostic code table, sample model forms or nomenclature legend could be confirmed from an official source, so nothing is published for it in Error Codes.","Work from the wiring diagram on the unit and the board part number stamped on the control."] },
  { re: /^80MGF/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox 80MGF legacy multi-position gas furnace (G24M sibling)", notes: ["Forms: 80MGF-45 through -140, 80MGF2-45, and revision markers 80MGF-1/-5/-9/-11.","Two control generations: EGC / EGC-1 (DIAG #1 / DIAG #2, seven states) on early units and SureLight two-LED on later ones. Both tables are in Error Codes - identify the board before decoding.","80MGF-1 and -3 originally used a RAM ignition control (RAM-to-Heatcraft replacement kit).","80MGF-5 and -7 have a documented pressure switch lockout issue (H-97-1); windy-weather nuisance trips share the G24M induced-draft kits (H-95-4).","Service Literature Corp. 9801-L2 is in Manuals."] },
  { re: /^80UHG/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox 80UHG legacy upflow/horizontal gas furnace", notes: ["Forms: 80UHG-45 through -120, 80UHG2-45/-60/-75, 80UHG3-60/-75.","This service literature carries BOTH the SureLight two-LED table (low flame signal 0.2 microamps) and the EGC-2 DIAG #1 / DIAG #2 table for 80UHG-1 units. Both are in Error Codes.","The EGC-2 board takes the Lennox Diagnostic Module 11K75 on its edge connector, which spells out the fault in words.","Low gas pressure switch installation is covered jointly with G24M and 80MGF in H-99-8.","Service Literature Corp. 9728-L12 is in Manuals."] },
  { re: /^90UGF/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox 90UGF / 90UGFA legacy upflow condensing gas furnace (SureLight)", notes: ["Forms: 90UGF-50/-100/-125, 90UGFA-50 through -125, 90UGFA3-75, 90UGFA4/5-125.","SureLight two-LED table applies (Error Codes) - same 9-pin board family as G26/G32.","Shares flue transition kit 59M03 with G26 and G32; the replaced kits were 77K31, 67K45 and 18J20 (H-04-2).","Service Literature Corp. 9720-L11 is in Manuals."] },
  { re: /^G(SR)?14(?![0-9])/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G14 / GSR14 Pulse-combustion gas furnace (1980s generation)", notes: ["Only one confirmed label fragment exists in the official text (G14-100-2) - the Service Literature for both families is an image-only scan with no text layer, so no nomenclature legend could be confirmed.","No diagnostic code table is published for these families in Error Codes; use the wiring diagram and the Pulse service guidelines (H-93-15) instead.","Pulse platform: gas diaphragm kit H-01-8 and the Pulse Furnace Inspection Record LB-91177 apply to G14/GSR14 as well as G21/GSR21.","Service Literature Corp. 8907-L6 (G14) and Corp. 8902-L2 (GSR14) are in Manuals - they open and are readable as page images."] },
  { re: /^G16(?![0-9])/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G16 / G16R / G16X legacy upflow gas furnace (standing pilot era)", notes: ["Nomenclature trap: three different pilot/ignition systems were fitted across this one family - White-Rodgers Gas Energy System, Robertshaw Pilot System and Penn Pilot Ignition - and the model number does not tell you which. Confirm from the wiring diagram on the unit.","The Service Literature (Corp. 844-L3, 1984) is an image-only scan, so no model table or code table could be confirmed from text. Nothing is published for G16 in Error Codes.","Service Literature Corp. 844-L3 is in Manuals as page images."] },
  { re: /^G17Q/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G17 / G17R / G17X legacy upflow gas furnace (standing pilot / Robertshaw intermittent pilot)", notes: ["Spec-table forms: G17Q2-50, G17Q2X50, G17Q3-75, G17Q3X75, G17Q3/4-100, G17Q5/6-125.","G17X units use a Robertshaw intermittent-pilot module. The service literature publishes no LED code table for it, so there are no G17 flash codes in Error Codes.","Damper spring update H-92-5 covers G17 and G20 together.","Service Literature Corp. 9132-L11 is in Manuals."] },
  { re: /^G19(?![0-9])/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G19 legacy upflow gas furnace (documentation gap)", notes: ["The official Lennox index holds only two documents for this family - an Installation Instructions and a Product Spec sheet. There is no Service Literature.","No sample model forms or diagnostic table could be confirmed, so nothing is published for G19 in Error Codes."] },
  { re: /^G(8|9)[DQ]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G8 / G9 legacy gas furnace (1960s-70s generation)", notes: ["Confirmed label forms from Product Spec titles only: G8D1, G8Q2, G9D, G9Q1. D and Q are the cabinet/blower letters used across this generation.","No Service Literature exists in the official index for G8 or G9 - only thin installation and spec sheets. No diagnostic table is published in Error Codes.","Deliberately narrow regex: it requires D or Q after the digit so it cannot swallow the Nortek/Nordyne G7S/G8S prefixes."] },
  { re: /^G1[012][DQRE]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G10 / G11E / G12 / G12E legacy gas furnace (1970s generation)", notes: ["Confirmed label forms from Product Spec titles: G10D, G10Q3-110, G11E-200V, G12D, G12Q, G12DE, G12QE, G12RD, G12RQ. E marks the electronic-ignition versions.","The G11E and G12/G12E Service Literature PDFs are image-only scans with no text layer, so no code table could be confirmed - nothing is published for these families in Error Codes.","Known documented complaints: nuisance pilot outage on G12 and G12R-3 (H-80-3) and Robertshaw ignition control miswiring on G11E (H-80-2).","Service Literature CORPG11E and CORPG12 are in Manuals as page images."] },
  { re: /^GS([6-9]|A7)/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox GS6 / GS7 / GS8 / GS9 legacy gas furnace (oldest documented generation)", notes: ["Confirmed label forms from Product Spec titles: GS6-130, GS6-145, GS7D, GS7Q, GSA7, GS8D, GS8Q, GS81Q, GS9Q.","Only 1960s-era Installation Instructions exist - no Service Literature, no code table. Nothing is published for these families in Error Codes.","The regex requires a digit 6-9 (or A7) after GS so it cannot collide with Goodman GSX / GSZ or with Lennox GSR14 / GSR21."] },
  { re: /^(80|92|95)AF[12]/, brand: "Lennox", equipment: "Gas Furnace", series: "Aire-Flo (Lennox) 80AF1 / 92AF1 / 95AF1 / 95AF2V gas furnace - Lennox ML/EL platform under the Aire-Flo badge", notes: ["Full label form is efficiency + AF + stage digit + cabinet code + input + blower: 92AF1UH045P08B, 95AF1UH070P12. UH = upflow/horizontal, DF = downflow, V suffix = variable speed.","Aire-Flo is a Lennox value badge - the Installation Instructions carry the Lennox limited-warranty text.","80AF1, 92AF1 and 95AF1 share ONE single-LED integrated-control table (LED off/on plus 1-9 flashes) - it is in Error Codes.","95AF2UHV / 95AF2DFV is two-stage and has a DIFFERENT table on a red LED (3 flashes = low-fire pressure/rollout/limit, 5 flashes not used), plus a green High Heat State LED and an amber CFM LED. Both are in Error Codes.","The control stores the last five faults - press and release the push button to recall, hold longer than 5 seconds to clear.","Installation Instructions 507325-01, 507328-01, 507272-04, 507273-03, 507267-04 and 507054-01 are in Manuals. There is no Aire-Flo Service Literature."] },
  { re: /^AF(80|9[025])/, brand: "Lennox", equipment: "Gas Furnace", series: "Aire-Flo (Lennox) AF80 / AF90 / AF92 / AF92V / AF95 gas furnace - older badge generation, pre-dates the 80AF/92AF/95AF naming", notes: ["Confirmed label forms from doc titles: AF80MPGBB, AF90MPB, AF92V. MP = multi-position cabinet.","Naming order flip trap: the legacy generation is AF first (AF80/AF90/AF92), the current generation is efficiency first (80AF1/92AF1/95AF1). They are not the same furnaces.","AF90MPB is documented with a White-Rodgers SmartValve I gas valve/control, not a Lennox SureLight board, so the Lennox SureLight tables do not apply. No code table is published for this generation in Error Codes.","Installation Instructions for AF90MPB and AF92V are in Manuals."] },
  // --- end coverage:lennox-furn-legacy ---
  // --- coverage:lennox-xpg20-17xp (v125) ---

  // --- end coverage:lennox-xpg20-17xp ---
  // --- coverage:lennox-achp-legacy (v124) ---
  { re: /^HS(1[0-46-9]|2[0-79]|32|40)[-0-9]/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox HS10 through HS40 legacy split air conditioners (HS10/11/12/13/14/16/17/18/19/20/21/22/23/24/25/26/27/29/32/40) - R-22 except HS40 (R-407C)", notes: ["AC-only outdoor units. No family in this span has a defrost board, an LED fault display or a 7-segment - the one exception is HS21, which carries the TSC5 two-speed control with four binary diagnostic lights (D8 D4 D2 D1).","Capacity code is NOT tons x 12 on the older units. HS17-953, HS17-1353, HS17-1853, HS17-2753 and the -141 / -211 / -261 / -311 / -411 / -461 / -511 / -651 series are legacy 3- and 4-digit codes with no arithmetic tie to tonnage - read tonnage off the Product Specifications sheet or the nameplate, never off the model number.","Within the same nameplate family the paired numbers ending -x11 and -x13 (for example HS21-411 vs HS21-413) are the 1-phase and 3-phase build of the same tonnage.","The later units in the span do switch to tons x 12 (HS26-018 through HS26-060, HS29-018 through HS29-060, HS32-024 through HS32-060). Both conventions appear inside a single prefix, so do not assume from the prefix alone.","HS29 goes well past residential - 072, 090, 120, 180 and 240 are 6, 7.5, 10, 15 and 20 ton light commercial on the same prefix.","HS29 charge is set by the approach method (liquid line minus outdoor ambient) with a per-model target - see the Diagnostic Help entry, the values are in Corp. 9802-L3 table 4.","HS32-1 uses a two-pole contactor; HS32-2 and later use a SINGLE-pole contactor, which means line voltage is present at components with the unit sitting idle (Corp. 9910-L4).","HS40 is R-407C - a blend that needs POE oil and liquid charging. No Service Literature exists for it, only the installation instructions.","A trailing letter after the capacity code is the voltage/phase class (Y, G, J, M, P, T, S seen on wiring-diagram titles). Lennox does not print a single legend table for it in this literature - read it off the unit wiring diagram, not from the model string."] },
  { re: /^HP(1[0-24]|1[6-9]|2[0-79]|32|40)[-0-9]/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox HP10 through HP40 legacy split heat pumps (HP10/11/12/14/16/17/18/19/20/21/22/23/24/25/26/27/29/32/40) - R-22 except HP40 (R-407C)", notes: ["Three different defrost generations live under this one prefix block. HP10-HP18: mechanical/electromechanical defrost timer or a field-added defrost control kit, no diagnostics at all. HP19-HP27: CMC1 solid-state defrost control (Hamilton Standard) - timing pins and TST pins read with a voltmeter, still NO LED fault codes. HP29 and HP32: two-LED (LED 1 / LED 2) defrost control board with a printed fault table.","HP29 changed defrost board in April 2002 and the two LED tables are not interchangeable. Check the build date before reading LEDs - the pre-4/2002 table has 3 states, the later one has 7.","HP32 has the same split: -1 and -3 units use the 5-state table (Corp. 0004-L3 table 2, defrost thermostat closes at 35F), -4 units use the 7-state table (table 3, defrost thermostat closes at 42F).","HP13 is deliberately NOT matched here - it is handled by the AC13/HP13 pattern, because the 2006-2010 R-22 HP13 shares the prefix with the 1970s-era HP13 and carries a DS2/DS1 defrost board.","HP21 is the odd one out: two-speed compressor with a TSC-2, TSC-3 or TSC-6 control. TSC-2 and TSC-3 have one red diagnostic LED; TSC-6 has four binary diagnostic lights (D8 D4 D2 D1) with a 15-code table. Do not apply single-speed troubleshooting to it.","Same legacy capacity-code trap as the HS side - HP14-413V, HP17-953, HP21-411/-413 and the -141/-211/-261/-311/-461/-511/-651 series are not tons x 12; later units (HP26-018 through -060, HP29-018 through -120) are.","HP40 is R-407C with no Service Literature published - installation instructions only.","A low-pressure or loss-of-charge switch is optional on most of this span. If no switch is fitted the factory jumper must stay in the pressure-switch terminals or the board will read a permanent open."] },
  { re: /^10(AC|HP)[BCE]?[-0-9]/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox 10AC / 10ACB / 10ACC / 10ACE air conditioners and 10HP / 10HPB heat pumps - 10 SEER R-22 value line", notes: ["NO DASH before the capacity code on 10AC, 10ACB, 10HP and 10HPB: the model reads 10ACB24, 10HPB36, 10AC60 - not 10ACB-024. A scanner or search built only against the dashed Lennox convention silently misses this whole line. 10ACC and 10ACE did switch back to the dashed form (10ACC-018, 10ACC-024-02), so both spellings are live inside one pattern.","Capacity code here is tons x 12 divided by nothing special - 12, 18, 24, 30, 36, 42, 48, 60 read as 1, 1.5, 2, 2.5, 3, 3.5, 4 and 5 tons.","A trailing single digit on the old 10AC parts (10AC301, 10AC302, 10AC421, 10AC422) is a build variant, not a capacity.","10HPB is the only prefix in the group with a diagnostic display: a two-LED defrost control board. Units built before April 2002 use the 3-state table, units built April 2002 and later use the 6-state table (10HPB has no low-pressure-switch row, unlike its 12HPB and HP29 siblings).","10AC, 10ACB, 10ACC, 10ACE and the older 10HP have no board of any kind - contactor, run capacitor and a time-delay relay on some units.","10ACB and 10HPB share the cracked Aeroquip suction ball valve issue with 12ACB/12HPB/HS29/HP29 (bulletin C-99-2)."] },
  { re: /^12(AC|HP)B[0-9]/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox 12ACB air conditioners and 12HPB heat pumps - 12 SEER R-22, 2 to 5 tons", notes: ["Same NO-DASH trap as the 10-series: 12ACB36, 12HPB42 - never 12HPB-042. Confirmed directly in both service manuals.","Capacity codes 24, 30, 36, 42, 48, 60 = 2, 2.5, 3, 3.5, 4, 5 tons.","12HPB carries a two-LED defrost control board and its Service Literature prints BOTH tables - the 5-state early table (normal / time delay / pressure switch open / pressure switch lockout / board malfunction) and the 7-state April-2002-and-later table. Match the table to the board in front of you, not to the model number.","12ACB is AC only - no board, no LEDs.","12HPB24 does not match up correctly with the CB29M-21/26 air handler - see Service and Application Note HP-04-3 before blaming the equipment for a capacity complaint."] },
  { re: /^13(ACC|ACD|HPD)N?[-0-9]/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox 13ACC / 13ACD air conditioners and 13HPD heat pumps - 13 SEER R-22, also badged Aire-Flo on the nitrogen-charge sheets", notes: ["Dashed capacity code, tons x 12: 13ACD-018 through 13ACD-060 = 1.5 to 5 tons.","An N straight after the prefix (13ACDN018-230-15) marks the dry-nitrogen holding-charge build sold for R-22 replacement work - the pattern allows for it.","13HPD is the only one of the three with a display: a defrost control board with a green DS2 and a red DS1, 7 states. 13ACC and 13ACD are AC only with no board.","The 13HPD board is the shared 100269-XX time/temperature control also used on HP13 and 13HPX - the false high-pressure-lockout bulletin HP-07-01 applies to it.","Some 13ACD and 13HPD Product Specification sheets are printed with the Aire-Flo badge. The unit is a Lennox - treat the badge as a label, not a different machine."] },
  { re: /^(AC13|HP13)-[0-9]{3}/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox AC13 air conditioners and HP13 heat pumps - 13 SEER R-22 dry-charge line (2006-2010); also catches the 1970s-80s HP13 legacy heat pump", notes: ["Two different machines wear HP13. The one you will normally meet is the 2006-2010 R-22 scroll unit (HP13-018 through HP13-060, Corp. 0610-L1) with a green DS2 / red DS1 defrost board. The other is a 1970s-80s electromechanical HP13 with no board at all. Tell them apart on the data plate: scroll compressor and a defrost control board with two LEDs means the later unit.","HP13 is intentionally excluded from the HP10-HP40 legacy pattern so this entry wins - otherwise the modern unit would inherit the wrong (no-board) troubleshooting notes.","AC13 is AC only - no board, no LEDs.","Capacity code is tons x 12 (018 = 1.5 t through 060 = 5 t). Full model numbers run out to a voltage and revision block, e.g. AC13-048-230-05.","The HP13 defrost board is the shared 100269-XX control used on 13HPD and 13HPX. Its table is printed in Corp. 0610-L1 table 1 and is field-for-field the same as 13HPD except that HP13 does not mark the pressure switches optional.","HP13 is on the equipment-affected list of Service and Application Note HP-07-01 - the false high-pressure lockout.","AC13 and HP13 ARI-match with CB26UH-R air handlers per their Product Specifications."] },
  { re: /^13HPX-[0-9]{3}/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox 13HPX split heat pump - 13 SEER R-410A (Merit), 1.5 to 5 tons", notes: ["Read 13HPX-036-230-13 as HP (heat pump) X (R-410A) 13 (nominal SEER) 036 (3 tons) 230 (208/230V 1ph 60Hz) then the minor revision number. Revisions -01 through -17 are all in the field.","Defrost Control Board with a green DS2 and a red DS1, 7 states - the same 100269-XX time/temperature control as 13HPD and HP13.","Serial number decodes as Location(2) + Year(2) + Month letter(1) + a 5 or 6 digit unique number - 19 09 C 05716 is Saltillo Mexico, 2009, March. Location 58 is Marshalltown IA. Month letters run A = January upward.","Charge by subcooling against the printed per-model target - Corp. 0619-L4 table 1 gives -18 = 9F, -24 = 14F, -30 = 7F, -36 = 8F, -42 = 6F, -48 = 11F, -60 = 11F, -61 = 6F, all +/- 1F.","Approach targets (liquid line minus outdoor ambient) from table 2: -18 = 6F, -24 = 7F, -30 = 8F, -36 = 13F, -42 = 9F, -48 = 6F, -60 = 9F, -61 = 10F, all +/- 1F.","Affected by HP-07-01 (false high-pressure lockout after a low-pressure lockout) and by HP-13-01 (true suction port access, shared with 14HPX).","13HPX-060-230-13 was re-rated by AHRI - see HP-12-03 before quoting capacity."] },
  { re: /^16HPX-[0-9]{3}/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox 16HPX split heat pump - 16 SEER R-410A (Merit), two-stage, 2 to 5 tons", notes: ["Read 16HPX-036-230A01 as 16 (nominal SEER) HP (heat pump) X (R-410A) 036 (3 tons) 230 (208/230V 1ph 60Hz) A (ratings revision / all regions) then the revision number.","Demand Defrost Control A108 with a green DS2 and a red DS1 - the widest fault table in the legacy Lennox split line: status, sensor faults, pressure fault/lockout pairs, discharge line temperature and discharge sensor, all on a 5-strike counter.","Discharge line temperature trips at 285F (140C) and the compressor stays off until it falls below 225F (107C). Do NOT read the HPXA16 number here - that older board trips at 300F.","Two-stage scroll. Verify the shift from Y1 to Y2 with the field checklist printed in this manual (the same table published standalone as bulletin C-05-2), not by ear.","16HPX-024, -036 and -048 shipped with an incorrect wiring diagram - see bulletin HP-19-01."] },
  { re: /^H[SP]X[AB](12|15|16|19)-[0-9]{3}/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox HSXA12 / HSXA15 / HSXB15 / HSXA16 / HSXA19 air conditioners and HPXA12 / HPXA15 / HPXB15 / HPXA16 / HPXA19 heat pumps - R-410A Elite and Signature era", notes: ["Dashed capacity code, tons x 12 (018 = 1.5 t through 060 = 5 t). HSXA19 and HPXA19 add a -038 alternate 3-ton match.","The B in HSXB15 / HPXB15 is a revision of the same 15 SEER unit, not a different product - Lennox publishes A and B in one manual. What the B adds is the Lennox System Operation Monitor (A132).","THREE different board generations hide behind this one prefix shape and their LED tables are not interchangeable:","  HPXA12 and HPXA19 - Demand Defrost Control, LED 1 / LED 2 naming, 8 states, boards 60L3901 (3-strike) / 46M8201 and 56M8501 (5-strike). HPXA19 is the 56M8501 build and adds the DELAY jumper.","  HPXA15 and HPXB15 - NOT a demand defrost board at all. HPXA15-1 uses the 5-state time/temperature table, HPXA15-2, -3 and HPXB15 use the 7-state April-2002-era table. Anyone who reads the HPXA12 demand-defrost table onto an HPXA15 will misdiagnose it.","  HPXA16 - Defrost Control Board, DS2 Green / DS1 Red naming, 14 states with 5-strike counters and a 300F discharge-line trip.","HSXA12, HSXA15, HSXB15, HSXA16 and HSXA19 are AC only and carry no defrost board. HSXB15, HPXB15, HSXA19 and HPXA19 do carry the LSOM (A132) monitor with its own green/red/yellow LEDs.","HSXA16, HPXA16, HSXA19 and HPXA19 are two-stage scroll units using LSOM I (a molded plug with an integral full-wave rectifier), not LSOM II. That matters when you go looking for the 24VDC to the unloader solenoid.","HPXA12 and HPXA16-024 / HSXA16-024 detail: the 2-ton units use a start capacitor (C7) and potential relay (K31) for starting assist.","Scroll compressors in this family ship with 3MA (32MMMA) POE oil."] },
  // --- end coverage:lennox-achp-legacy ---
  // --- coverage:lennox-minisplit (v124) ---
  { re: /^MS7-?(?:C[IO]|H[IO])-?[0-9]{2}/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox MS7 single-zone mini-split (MS7-CI / MS7-CO air conditioner, MS7-HI / MS7-HO heat pump; catalog names MS7C and MS7H) - R-410A, Corp. 1122-L6", notes: ["Read MS7-CO-12P1A as MS (mini-split) 7 (series) CO (CO air conditioner outdoor, HO heat pump outdoor, CI a/c indoor, HI heat pump indoor) 12 (nominal tons: 09=0.75, 12=1, 18=1.5, 24=2, 30=2.5) P (208/230V-1ph; L=115V) then minor and major revision.","There is no 30 kBtu air conditioner - the 30 size is heat pump only (MS7-HI-30P / MS7-HO-30P).","THREE different diagnostic displays live in one manual. 9-12 kBtu: yellow/red/green blink counts on the outdoor control. 18-24 kBtu: a four-LED on/off/blink pattern (D40 green, D41 red, D42 orange, D43 yellow) that is a pattern, not a number - read it off Table 19 in the manual, it is not in Error Codes. 30 kBtu: a two-character alphanumeric display (E1, H5, PH ...).","Only the blink-count table (9-12 kBtu) and the 30 kBtu character table are in Error Codes. If you are staring at four LEDs on an 18 or 24 you are on the pattern table - open the service manual.","Inactive product - superseded by MS8 - but the Corp. 1122-L6 service literature is still the correct reference for units in the field."] },
  { re: /^MS8(?:Z|-?(?:C[IO]|H[IO]|ZO)-?[0-9]{2})/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox MS8 single-zone (MS8-CI / MS8-CO / MS8-HI / MS8-HO) and MS8Z multi-zone (MS8-ZO) mini-split - R-410A, Corp. 1243-L9 / 1244-L9 / 1205-L2", notes: ["Read MS8-CI-12-P1A as MS 8 (series) CI (unit type) 12 (1 ton) P (208/230V-1ph; L=115V) 1 (minor revision) A (major revision). Multi-zone reads MS8-ZO-18P2A where the digit after the voltage letter is the ZONE COUNT (2, 3 or 4), not a revision.","Corp. 1243-L9 is the 115V single-zone book, Corp. 1244-L9 the 208-230V single-zone book, Corp. 1205-L2 the MS8Z multi-zone book.","The code shows on the INDOOR character display; the outdoor LEDs (yellow/red/green blink counts) carry a parallel code. Table 18 covers 09-12 and 30 kBtu, Table 19 covers 18-24 kBtu - the two tables are NOT the same, check the size before you read a code.","MS8Z: all sizes except -036 use the Table 17 indoor display codes (b5, b7, C5, dd, dn, EE, EU, E1 ...). The -036 four-zone size has its own Table 20 code list plus a Table 21 zone-specific list (11-17 = zone A, 21-27 = zone B, 31-37 = zone C, 41-47 = zone D).","dd is not a fault - it is the pre-operation / trial-run mode you enter from the remote (cooling, setpoint 86F, press - + - + - + for three seconds). dn means that trial run found a wiring or EXV fault.","Field bulletin ACC-12-11 covers condensate pump wiring on MS7 and MS8 - a common cause of nuisance EE / high-water alarms."] },
  { re: /^(?:MWM[AB]|M33[AB]|3WMB)[0-9]{3}/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox MWMA / MWMB wall-mount, M33A / M33B 3x3 cassette and 3WMB036 wall indoor units - legacy MLA / MPA / MPB / 3PB R-410A platform (Corp. 1816-L7, Corp. 1602-L9)", notes: ["Read MWMA012S4-2P as M (mini-split) WM (wall-mounted non-ducted; 22 = 2x2 cassette, 33 = 3x3 cassette, CF = ceiling/floor, MD = medium static ducted, FM = floor console) A (1st generation; B 2nd) 012 (1 ton) S (standard efficiency) 4 (R-410A) then minor revision and voltage (P = 208/230V, L = 115V).","These heads belong to the LEGACY outdoor platform (MLA, MPA, MPB, 3PB) whose code scheme is plain E / F / P two-character codes - NOT the EC / EH / EL / PC codes of the later MLB / MPC / 3PC platform. Confirm the outdoor model before you read a code table.","Indoor codes come off a RUNNING-LIGHT SHORT-FLASH COUNT qualified by the timer light: timer OFF = E-codes, timer ON = F-codes, timer FLASHING = P-codes. Two flashes with the timer off is E1 (indoor/outdoor comm), which the OUTDOOR display reports as E2.","Multi-zone outdoor units have a two-digit display plus an SW1 Spot Check push-button that steps through live sensor, frequency and EXV values - see Diagnostic Help.","M22A and MFMA appear on BOTH this legacy platform and the current MLB / MPC platform. The badge on the head does not tell you which code table applies - the outdoor unit does."] },
  { re: /^(?:MWCA|MCA|MWHA|MHA)[0-9]{3}/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox MCA cooling-only / MHA heat-pump single-zone mini-split with MWCA / MWHA wall head - R-410A, Corp. 1907/1908-L5 and Corp. 1913/1914-L8", notes: ["Read MCA012S4S-1P as M (mini-split) C (cooling only; H = heat pump) A (1st generation) 012 (1 ton) S (standard efficiency) 4 (R-410A) S (single circuit) 1 (minor revision) P (208/230V-1ph; L = 115V, 012 only). The matching head is MWCA / MWHA with the same digits minus the circuits letter.","The MCA and MHA diagnostic books print the SAME code table - one row set covers both. Do not look for a separate heat-pump list.","The outdoor unit has no display. The code is read from the INDOOR unit: count the short flashes of the running light, then read the timer light - OFF gives E0-EC, ON gives F0-F5, FLASHING gives p0-p4.","p0 (1 flash, timer flashing) is IPM / IGBT overcurrent. Pull power, let the electrolytics bleed, then do the P-to-UVWN and UVW-to-N diode checks before condemning anything.","This is the generation BEFORE MCB / MHB. MCB and MHB use alphanumeric EH / EL / EC / PC codes instead - do not read this table onto them."] },
  { re: /^(?:MWCB|MCB|MWHB|MHB)[0-9]{3}/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox MCB cooling-only / MHB heat-pump single-zone mini-split with MWCB / MWHB wall head - R-410A, service manuals 100041 (unit info) and 100042 (error codes)", notes: ["Read MCB012S4S-1P as M (mini-split) C (cooling only; H = heat pump) B (2nd generation) 012 (1 ton) S (standard efficiency) 4 (R-410A) S (single circuit) 1 (minor revision) P (208/230V-1ph; L = 115V, 012 only).","Codes are alphanumeric on the INDOOR display and use the same EH / EL / EC / PC scheme as the current MLB / MPC platform: EH = indoor hardware, EL = indoor/link, EC = outdoor component, PC = outdoor protection.","The outdoor board has NO display on this family. The outdoor unit LED only tells you slow flash = standby, lit = normal, fast flash = outdoor unit error - the number comes from the indoor display.","EH 0b is a display-board-to-main-board communication error inside the indoor unit, not an indoor-to-outdoor fault. Do not chase F1/F2 for it.","100042 also carries an Engineering Mode parameter readout and a printed Complaint Form worth filling in before a warranty call."] },
  { re: /^(?:M22D|M33D|M1WD|MFMD|MDDD|MMDD)[0-9]{3}/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox Powered by Samsung R-32 indoor units - M22D 2x2 cassette, M33D 4x4 cassette, M1WD one-way cassette, MFMD floor console, MDDD high-static ducted, MMDD medium-static ducted (service manuals 100211 / 100212)", notes: ["Read M33D018S6-1P as M (mini-split) 33 (4-way 3x3 cassette; 22 = 4-way 2x2, 1W = one-way, FM = floor console, DD = high static ducted, MD = medium static ducted) D (4th generation) 018 (1.5 tons) S (single zone; M = multi) 6 (R-32) 1 (minor revision) P (208/230V-1ph).","The 6 in the refrigerant position means R-32 (A2L). This is a wholly different OEM platform from the Lennox-native MLA / MLB families - it uses Samsung's numeric ExxX self-diagnosis codes, not EC / EH / PC.","Codes appear on the indoor LED cluster (blue/red or blue/yellow depending on cabinet) and on the outdoor 88-segment display. The service manual's LED matrix tells you which code the flash pattern means.","Same-numbered codes are shared with the 3WMD / 3WPD system line (manual 100220); 100220's own self-diagnosis table is shorter (the A2L leak-sensor rows E116 / E695 / E697-E700 sit in its Others reference list instead), but the code meanings match.","TRAP: the wall units MWMD / MWHD / MWZD are listed in manual 100212 with these E-codes AND in manual 100219 with C-prefix codes for the same faults. Whichever prefix the display shows is the table you want."] },
  { re: /^MMD[0-9]{3}/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox Powered by Samsung MMD multi-position air handler (R-32) - the ducted indoor unit of the Samsung mini-split platform (service manuals 100211 / 100212)", notes: ["Read MMD024M6-1P as M (mini-split) M (multi-position air handler) D (4th generation) 024 (2 tons) M (multi zone; S = single) 6 (R-32) 1 (minor revision) P (208/230V-1ph). Optional electric heat 3 to 5 kW.","Do not confuse MMD with MMDA / MMDB (legacy and current R-410A medium-static ducted heads) or MMDD (the R-32 medium-static ducted head). MMD followed immediately by three digits is the air handler.","Uses the Samsung numeric E-code self-diagnosis scheme, same table as the rest of the R-32 platform."] },
  { re: /^(?:MWMD|MWZD)[0-9]{3}/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox Powered by Samsung MWMD high-efficiency and MWZD (with refrigerant detection) wall-mount indoor units - R-32 (service manual 100219, also listed in 100212)", notes: ["Read MWMD012S6-1P as M (mini-split) WM (wall-mount high efficiency; WH = wall-mount standard efficiency, WZ = wall-mount standard efficiency WITH the refrigerant detection system) D (4th generation) 012 (1 ton) S (single zone; M = multi) 6 (R-32) 1 (minor revision) P (208/230V-1ph).","MWZD carries an on-board A2L refrigerant detection sensor. A leak response will run the indoor blower and hold the compressor off - that is the RDS doing its job, not a blower fault.","CODE PREFIX TRAP: manual 100219 (11/2025, dedicated to the wall line) prints C-prefix codes - C101, C121, C154, C221, C440, C464 ... Manual 100212 lists the same wall models with E-prefix codes for the same faults. Match the letter you see on the display to the manual, do not translate.","The outdoor half of the pair is MWHD / MWLD / MWPD (wall-only outdoor) or MMPD / MMLD (mixed indoor type) - read the second letter of the outdoor model as the matching indoor type and the third as the unit type (H = standard heat pump, L = cold climate heat pump, P = heat pump)."] },
  { re: /^3W[MP]D[0-9]{3}/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox Powered by Samsung 3WMD036 wall indoor + 3WPD036 outdoor 3-ton single-zone system - R-32 (service manual 100220)", notes: ["Read 3WPD036S6S-1P as 3 (3-ton outdoor unit for the 3WPD/3WMD wall system) WP (heat pump; WM = wall-mounted indoor) D (4th generation) 036 (3 tons) S (standard efficiency) 6 (R-32) S (single circuit) 1 (minor revision) P (208/230V-1ph).","Only the 036 (3 ton) capacity was found in the Lennox document library for this line.","Despite 3WMD being a wall-mount head, this system uses the NUMERIC E-prefix Samsung code table (E121, E154, E202, E416 ...), not the C-prefix table of the MWMD / MWHD wall manual 100219. The 100220 code meanings match 100211 / 100212, though 100220 prints the A2L leak-sensor rows (E116, E695, E697-E700) in a separate Others list rather than the main self-diagnosis table.","Do not confuse with 3PB036 / 3WMB036 (R-410A legacy) or 3PC036 / 3WMC036 (R-410A current) - the leading 3 means the same thing but the refrigerant digit and the code table do not."] },
  // --- end coverage:lennox-minisplit ---
  // --- coverage:ductless-other (v124) ---
  { re: /^A[OSBGDRMCU][UL]H[0-9]{2}K/, brand: "Fujitsu", equipment: "Mini-Split", series: "Fujitsu Halcyon / AIRSTAGE H-Series R-32 current line - ASUH wall mount, AOUH / AOLH outdoor, ABUH ceiling suspended, AGUH floor, ADUH slim duct, ARUH mid-static duct, AMUH multi-position AHU, ACUH compact cassette, AUUH large cassette", notes: ["Read AOUH24KWAH3 as A (heat pump for North America) O (model type: O outdoor, S wall, B ceiling suspended, G floor, D slim duct, R mid static duct, M multi-position AHU, C compact cassette, U large cassette) U (power supply: U = 208-230V/60Hz, L = 115V) H (system generation, currently H) 24 (capacity in kBtu/h) K (function: R-32 inverter heat pump) W (tier) A (series) H (feature) 3 (number of connectable heads - outdoor units only).","The K in position 6 is what tells you R-32. R-32 is A2L (mildly flammable) - AIRSTAGE H-Series is certified to UL 60335-2-40 4th edition.","Tier letter: T top, Z high, M mid, P standard+, N entry, U mid-tier universal PAC, W multi-zone. A W-tier outdoor (AOUH**KWA*n) is the multi-zone condenser and the trailing digit 2-5 is the number of heads; 1 or no digit is single zone.","Feature letter on outdoor units: S standard, H XLTH, P XLTH+. On indoor units S standard, B black.","115V product carries L in the power-supply position - ASLH / AOLH, not ASUH / AOUH.","No board-level code table is published for this generation on the public Fujitsu site - the Service and Design & Technical manuals sit behind the connect.fujitsugeneral.com dealer login. On a wired-remote system try the E:00-E:14 self-diagnosis readout (Error Codes, Fujitsu wired remote family) before assuming there is no code.","Do not confuse ARUH (Fujitsu mid-static duct) with Goodman/Amana ARUF air handlers or with LG ARUM/ARUB Multi V S outdoor units."] },
  { re: /^A[OSBGDRMCU]U[0-9]{1,2}R[A-Z0-9]/, brand: "Fujitsu", equipment: "Mini-Split", series: "Fujitsu Halcyon R-410A legacy - ASU / AOU single-zone (RLF, RLS, RLS3, RL2, RLQ), AOU**RLXFZ Hybrid Flex multi-zone outdoor, AUU / AOU **RC cassette systems (roughly 2008-2023, retired line)", notes: ["Layout is A + model-type letter + U + capacity in kBtu/h + generation code, e.g. ASU7RLF1 (7,000 Btu/h wall mount), ASU9RL2 / AOU9RL2 (115V system), AUU24RC / AOU24RC (cassette), AOU36RLXFZ1 (Hybrid Flex multi-zone).","RLXFZ / RLXFZH / RLXFZ1 outdoor units are the multi-zone Hybrid Flex condensers - the ASU7RLF1 submittal lists AOU18/24/36/45/48 RLXFZ as its compatible condensers.","This whole generation is R-410A. The retired-product page for it is fujitsugeneral.com/us/support/downloads/halcyon/manual-retired.html.","Wired-remote cassette systems (AUU/AOU **RC) display E:EE and then a two-character code E:00 through E:14 when you run the self diagnosis - that table is in Error Codes under the Fujitsu wired remote family.","Wireless-remote wall units of this generation have NO published blink-count table. Both lamps flashing (or the TIMER lamp alone) means stop and call service, nothing more specific.","Only ASU / AOU / AUU strings appear in the documents sourced here; ARU / ABU / AGU / ADU legacy heads follow the same layout but were not confirmed on a sourced legacy document.","AOUG / ASUG (**LMAS1) multi-zone product named in some distributor listings could not be confirmed from any official Fujitsu document - do not read this family's data onto it."] },
  { re: /^L[AS][NU]?[0-9]{3}HSV/, brand: "LG", equipment: "Mini-Split", series: "LG single-zone wall mount - LSN/LSU Standard and LAN/LAU Art Cool Mirror high-efficiency inverter (HSV, HSV4, HSV5 generations), R-410A", notes: ["Read LAN181HSV5 as L (LG) A (frame type: A Art Cool, S Standard, C 4-way cassette, D low-static duct, H high-static duct, V vertical/horizontal AHU) N (N indoor, U outdoor, neither = system) 18 (18,000 Btu/h) 1 (generation) HSV (high-efficiency inverter style) 5 (generation/revision).","Indoor and outdoor carry the same number - LSN091HSV pairs with LSU091HSV. A model with no N or U (LA090HSV5) is the system number.","Fault codes come off the INDOOR LEDs as a two-digit blink: LED1 blinks the tens digit, LED2 blinks the ones digit. On this family LED1 is the heating LED and LED2 the cooling LED.","The outdoor PCB carries its own LED pair (LED1 green, LED2 red) showing the same 21-67 numbers. To see them, remove the outdoor top cover and the lid of the PCB box.","Do not confuse the L prefix here with Lennox LRP packaged units or Trane L8V1 / L9X1 furnaces."] },
  { re: /^L[ACDHSUV][NU][0-9]{3}[A-Z]/, brand: "LG", equipment: "Mini-Split", series: "LG L-nomenclature ducted, cassette, AHU and multi outdoor - LUU multi/LGRED outdoor, LHN and LDN ceiling-concealed duct, LCN 4-way cassette, LVN vertical-horizontal AHU", notes: ["Read LHN248HV as L (LG) H (frame type: H high-static duct, D low-static duct, C 4-way cassette, V vertical/horizontal AHU, A Art Cool, S standard, U outdoor) N (indoor; U outdoor) 24 (24,000 Btu/h) 8 (generation) HV (style / heat pump).","LUU***HV is the 2012-era DC inverter multi outdoor (buyer-facing name for AUUW**GD2); LUU***HHV is the current LGRED single-zone ducted outdoor. Same prefix, two different generations - check the label date and the indoor unit it is paired with before you read a code table onto it.","The 2012 multi/cassette platform reads faults as CH numbers on the indoor display and as an LED1/LED2 blink pair on both boards. Beware: on that platform the OUTDOOR LED1 is RED and LED2 is GREEN - the opposite of the HSV single-zone tech paper.","No official code table was located for the current LGRED generation; the legacy 21-67 numbering may or may not still apply, so confirm against the unit's own literature before using it."] },
  { re: /^(?:AUUW|ATNH|ABNH)[0-9]{2}[A-Z]/, brand: "LG", equipment: "Mini-Split", series: "LG global-nomenclature multi system - AUUW** DC inverter multi outdoor and ATNH / ABNH cassette and high-static duct indoor (the factory name printed alongside the LUU / LCN / LHN buyer name)", notes: ["Read AUUW24GD2 as A/L (brand) U (outdoor unit) U (universal) W (inverter heat pump) 24 (24,000 Btu/h) G (1ph 220-240V 50Hz or 220V 60Hz) D (standard inverter) 2 (serial). The service manual prints it as AUUW24GD2 [LUU247HV] - same machine.","Read ABNH24GGLA2 as A/L (brand) B/N (indoor) H (high static duct; C cassette) 24 (capacity) G (electrical) G (chassis: G=BG, R=BR, P=TP, M=TM) L (look) A (function) 2 (serial). ATNH**GPLE2 is the compact/4-way cassette chassis, printed with [LCN**7HV].","TRAP: Fujitsu's current large cassette is AUUH**K... - four letters then digits with an H in position four. LG's outdoor is AUUW then two digits. Read position four before you decide the brand.","Codes on this platform are the 2012 General Service Manual CH numbers (indoor 01-10, outdoor 21-67)."] },
  { re: /^K[NSU]SAL[0-9]{3}[A-Z]/, brand: "LG", equipment: "Mini-Split", series: "LG R-32 Art Cool Deluxe single-zone wall mount - KNSAL indoor / KUSAL outdoor / KSSAL system (current K-nomenclature)", notes: ["Read KNSAL091A as K (refrigerant: K = R-32) N (component: N indoor, U outdoor, S system) S (product category: single) A (product type: wall mounted) L (product grade: Deluxe/Premier) 09 (9,000 Btu/h) 1 (generation) A (function/voltage: 208-230V).","The FIRST letter is the refrigerant on this scheme - a K-prefix LG mini-split is R-32 (A2L). LG runs the legacy L-prefix scheme and this K-prefix scheme side by side right now.","Pairing: outdoor KUSAL091A + indoor KNSAL091A + controller AKB76044813 = system KSSAL091A.","LG requires LATS (LG Air Conditioner Technical Solution) software for piping and charge design on current systems.","No official self-diagnosis table was located for the K-series - do not assume the legacy 21-67 blink numbering applies without confirming it on the unit's own literature."] },
  { re: /^ARU[BM][0-9]{3}[A-Z]{2,3}[0-9]/, brand: "LG", equipment: "Other", series: "LG Multi V S with LGRED outdoor unit - ARUM036GSS5 / ARUM048GSS5 / ARUB060GSS4 (light commercial VRF outdoor, R-410A)", notes: ["Read ARUM036GSS5 as ARU (Multi V outdoor unit, R-410A) M (combination heat pump or heat recovery; B = other type) 036 (36 MBh) G (208-230V/60Hz/1ph) S (side discharge) S (standard) 5 (fifth generation).","TRAP: Fujitsu's legacy mid-static ducted indoor is also ARU, but Fujitsu puts DIGITS straight after ARU (ARU24RLF) while LG puts a letter (ARUM036...). Read the fourth character.","This is the VRF-family outdoor unit, not a residential mini-split - piping and controls design goes through LATS and the Multi V engineering manual."] },
  { re: /^AR[0-9]{2}[A-Z]{3}/, brand: "Samsung", equipment: "Mini-Split", series: "Samsung AR** single-zone high-wall indoor unit - Wind-Free 2.0 / 2.0e / 3.0 / 3.0e, Wind-Free Standard / Premium / IAQ (R-32) and Max Heat / Quantum", notes: ["Layout is AR + two capacity digits + the series block, e.g. AR09TSFABWKNCV (Wind-Free 2.0, 9,000 Btu/h), AR18KSFPDWQNCV (Quantum/Genesis), AR09DXFAMWKXCV (Wind-Free Standard R-32).","TRAP: Samsung is AR + DIGITS. Goodman/Amana ARUF, ARPT and ARPF air handlers are AR + LETTERS. If characters three and four are digits it is a Samsung head.","The matched outdoor unit carries its own RNS / RXS number - Samsung's own bulletin pairs AR**TSF*BWKNCV with RNS***BT and AR**TSF*BWKXCV with RXS****T.","Faults show on the indoor display as Exxx or Cxxx - which letter you get is set by installation option segment 22, not by the fault. Same number either way.","On 9K and 12K systems the outdoor unit has no display: the fault is a YEL/GRN/RED lamp pattern on the outdoor board. That table is in Error Codes.","Samsung publishes no position-by-position nomenclature chart for the AR line; the capacity digits and the E-code behaviour are confirmed, the individual series letters are not."] },
  { re: /^RNS[0-9]{2,4}[A-Z]/, brand: "Samsung", equipment: "Mini-Split", series: "Samsung RNS single-zone outdoor unit - the condenser that pairs with an AR** Wind-Free / Quantum high-wall head", notes: ["Samsung Technical Bulletin TB2020-0015 states the pairing directly: AR**TSF*BWKNCV runs with RNS***BT, AR**TSF*BWKXCV runs with RXS****T.","The RXS half of that pairing is deliberately NOT matched here: Daikin's single-zone outdoor units are also RXS + digits (RXS12LVJU) and the app already claims that prefix. Read the badge on an RXS unit.","AJ is NOT the single-zone outdoor prefix - AJ0** is the Free Joint Multi (FJM) multi-zone platform with a completely different code table.","The outdoor board on 9K/12K units reports by YEL/GRN/RED lamp pattern; larger units show the same numbers on the indoor display as Exxx/Cxxx.","Samsung does not publish a position-by-position chart for this outdoor number - only the pairing above is confirmed."] },
  { re: /^AJ0[0-9]{2}[A-Z]{2,3}/, brand: "Samsung", equipment: "Mini-Split", series: "Samsung Free Joint Multi (FJM) AJ0** multi-zone system - AJ020/024/030/036/048 TXJ / TXS outdoor units and AJ015/018 TN* indoor units, R-410A", notes: ["Outdoor examples from the service manual model index: AJ020TXJ2CH, AJ024TXJ3CH, AJ020TXS3CH, AJ030TXS4CH, AJ036TXJ4CH, AJ048TXJ5CH. Indoor examples: AJ015TNJDCH, AJ018TNLDCH, AJ018TNNDCH.","The outdoor board is labelled PCB MAIN-OUT and shows the fault itself on its two-character display; the indoor side shows a 3-digit number on the wired remote after you press Test.","This platform will not run with a single indoor unit - Samsung prohibits one-indoor installation and the pipe check / auto addressing routine must not be used that way.","E199 on power-up is normal before commissioning: it means the pipe check / auto addressing routine has not been completed. Press K1 to start it.","The FJM E-numbers overlap the single-zone RAC numbers but the tables are NOT identical (FJM adds E1xx address codes, E3xx per-branch pipe sensors and E5xx/E590 rows) - use the FJM family."] },
  // --- end coverage:ductless-other ---
  // --- coverage:lennox-achp-current (v124) ---
  { re: /^EL18KSLV/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Elite EL18KSLV slim side-discharge variable-capacity (inverter) heat pump - R-454B", notes: ["Side-discharge slim cabinet. This is the Elite twin of the Signature ML15KSPV - it is NOT the same platform as the top-discharge EL18XCV / EL19KPV / EL21KLV inverter line, and it does NOT use the E4xx alert / inverter red-green LED table.","Faults show as a plain number on the outdoor Service Monitor Board (codes 1-6, 8-13, 16-18, 20, 23-27, 39, 42-46, 51 and LE per Service Literature 100203-01-000). Most match the ML15KSPV service-monitor-board list in Error Codes - EXCEPT code 20: on the EL18KSLV code 20 is DC or AC voltage low (6-strike lockout), NOT the ML15KSPV's IPM overcurrent. Check supply voltage and the DC bus before touching the drive.","Sensors land at CN-21 (024/036) or CN-14 (048/060): Te defrost, Ts suction, Td discharge, Tc condensing, Tao outdoor air. Low-pressure switch at CN25/CN13, high-pressure switch at CN-24/CN12, pressure transducer at CN-20/CN21.","Line voltage limits from the manual: not below 187 VAC at compressor start, not below 197 VAC running, never above 253 VAC. Code 6 is a voltage code, not an inverter failure.","R-454B (A2L). Weigh-in is the only charging method the manual accepts on this unit; it is also the one R-454B model excluded from the 30-ft factory-charge change (SVC note 100205).","The wiring diagram silkscreens LED1-LED5 on the board - no decoded LED-flash table was found in the Service Literature text, so read the number on the Service Monitor Board, not the LEDs."] },
  { re: /^(EL19KPV|EL21KLV|EL23XCV|SL25KCV)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Elite EL19KPV / EL21KLV heat pumps, Elite EL23XCV and Dave Lennox Signature SL25KCV air conditioners - communicating variable-capacity (inverter) outdoor units", notes: ["EL19KPV, EL21KLV and SL25KCV are R-454B (A2L); EL23XCV is R-410A. Same outdoor control and same Table 7 alert-code table on all four.","Two places to read a fault: the 7-segment display on the outdoor control (Ennn), and the inverter board's own RED and GREEN LEDs. Count red flashes first, then green - the pair maps to the same fault. Both are in Error Codes.","Inverter LEDs at rest: 024 and 036 units show RED on solid, GREEN off. 048 and 060 units show RED on solid AND GREEN on solid. Both off means the inverter is not energized - that is a power problem, not a fault.","Only the latest ACTIVE fault or lockout is displayed, and fault codes outrank the status codes. Powering up clears whatever is on the display, so read it before you cut power.","Manual reset is either pulling the R wire off the outdoor control R terminal or cycling the indoor unit off and on - killing 24VAC drops the contactor, which is what actually resets the inverter.","There is no low-pressure switch on these units - the suction pressure transducer emulates one. Cut-out 35 PSIG, cut-in 80 PSIG, alarm clears above 90 PSIG. High-pressure switch opens at 590 PSIG and closes at 418 PSIG.","Capacity codes run 024 / 036 / 048 / 060 only - there is no 1.5-ton size on this inverter tier."] },
  { re: /^(SL18XC1|SL18XP1)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Dave Lennox Signature SL18XC1 air conditioner / SL18XP1 heat pump - two-stage iComfort-communicating (R-410A, outdoor control 103369-XX)", notes: ["Two-stage scroll, NOT an inverter. It has a 7-segment Ennn display on the outdoor control but there is no inverter board and no red/green inverter LED table - do not read the E423-E441 inverter list onto it.","Outdoor control is the A175 family, part 103369-03 or later. A replacement control MUST be programmed for unit type (AC or HP), number of stages, unit capacity and outdoor fan RPM profile before it will run correctly.","Alert codes are the standard communicating set already in Error Codes (E105, E120, E124, E125, E126, E131, E180, E401, E403, E409-E421, E600).","Sensor harness trap: the 4-pin sensor plug goes in TABS UP. Upside down swaps coil and discharge, which can throw a nuisance 415 or silently kill defrost - see bulletin C-14-08.","Capacities 024 / 030 / 036 / 042 / 048 / 060 - this tier has the 2.5 and 3.5 ton sizes the KC2/KP2 two-stage line does not."] },
  { re: /^(ML14KP1|EL16KP1)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Merit ML14KP1 / Elite EL16KP1 single-stage heat pump - R-454B, A108 Demand Defrost Control", notes: ["Diagnostics are the two LEDs on the A108 demand defrost control: DS1 is RED, DS2 is GREEN. Read them as a pair against the A108 table in Error Codes - a single LED tells you nothing.","No discharge line sensor on these R-454B models. A fixed 10K resistor stands in for it, so a discharge fault here means a shorted or open RESISTOR, not a hot compressor.","Five strikes on any one code within a single thermostat demand = lockout. Reset by cycling 24VAC to the control or jumpering the TEST pins on P1.","P1 defrost termination shunt: 50 / 70 / 90 / 100 F, factory 50 F. If the shunt is missing the control defaults to 90 F. P3 nominal defrost time: 140 (factory) / 100 / 60 / 165 seconds; missing shunt defaults to 140.","P5 DELAY jumper ships INSTALLED - the compressor cycles off 30 seconds going in and out of defrost. That clunk is normal. The 30-second delay is ignored while TEST is jumpered.","Low-pressure switch S87 opens at 25 +/- 5 psig and closes at 40 +/- 5 psig; high-pressure switch S4 opens at 590 +/- 15 psig. Below 15 F ambient the control ignores the low-pressure switch for the first 10 minutes of compressor run.","R-454B (A2L). Units built from June 2025 may be factory charged for 30 ft of line set instead of 15 ft - check the nameplate for 'Factory Charge (30FT)' before you add refrigerant (SVC note 100205).","Read ML14KP1-036-230A01 as ML (Merit) 14 (SEER2 tier) K (R-454B) P (heat pump) 1 (single stage) 036 (3 ton) 230 (208-230V 1ph) then ratings revision and revision level."] },
  { re: /^(ML16XP1|EL15XP1|EL16XP1)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Merit ML16XP1 / Elite EL15XP1 / Elite EL16XP1 single-stage heat pump - R-410A, A108 Demand Defrost Control", notes: ["This rule sits ahead of the generic Lennox rules on purpose: without it ML16XP1 lands on the legacy 13ACX/14HPX rule and EL16XP1 lands on the SL25XPV/EL1[678]X inverter rule. These are single-stage A108 units, not inverters and not board-less.","Same A108 board and same DS1 (red) / DS2 (green) table as the R-454B ML14KP1 / EL16KP1 - the manuals print it word for word.","Unlike the R-454B versions, these DO have a real discharge line sensor: the control drops the compressor above 285 F discharge and restarts it below 225 F.","Five strikes per code within one demand = lockout; reset by cycling 24VAC or jumpering TEST on P1.","Low-pressure switch opens at 25 +/- 5 psig, closes at 40 +/- 5 psig; high-pressure switch opens at 590 +/- 15 psig.","A Fan Motor / Fan Blade Replacement Kit (507935-01-000) exists for 3-5 ton ML16XP1 and EL16XP1 - worth knowing before you chase a fan vibration."] },
  { re: /^ML14XP1/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Merit ML14XP1 single-stage heat pump - R-410A, CMC1 time/temperature defrost control (100269-XX)", notes: ["This rule sits ahead of the generic ^ML1[467]X rule on purpose - ML14XP1 uses the simpler CMC1 time/temperature board, not the A108 demand defrost board its ML16XP1 sibling uses.","CMC1 has NO ambient or coil sensor, so there are no sensor fault codes and no discharge codes - the LED table is pressure switches only. Do not read the A108 table onto it.","DS2 is GREEN and DS1 is RED. One extra state exists here that A108 does not have: DS2 ON with DS1 slow flashing means the low-pressure switch is being IGNORED because ambient is below 15 F. That is normal, not a fault.","Defrost interval on P1: 30 / 60 / 90 minutes; maximum defrost period is fixed at 14 minutes. Board 100269-02 defaults to 60 minutes, 100269-04 defaults to 90; a missing jumper defaults to 90.","Five pressure-switch strikes in one thermostat demand = lockout. Reset by cycling 24V control power or shorting the TEST pins for 2 seconds.","High-pressure switch opens at 590 +/- 15 psig and resets at 418 +/- 15 psig; low-pressure switch opens at 25 +/- 5 psig and resets at 40 +/- 5 psig."] },
  { re: /^(ML17XP1|EL17XP1)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Merit ML17XP1 / Elite EL17XP1 single-stage heat pump - R-410A", notes: ["GAP: Lennox publishes no Service Literature for either of these families - only installation instructions, the EHB and a user manual. The defrost board generation (A108 demand defrost vs CMC1 time/temperature) is NOT confirmed by any official document.","Identify the board at the unit before you use a code table: A108 is silkscreened 'DEMAND DEFROST CONTROL' and has ambient and coil sensor inputs at P4; CMC1 (part 100269-XX, printed next to the P1 timing pins) has pressure inputs only.","Both families are the tier above ML16XP1 / EL16XP1 in the same generation, and every sibling in that generation that does have Service Literature uses A108 - but that is inference, so verify at the unit.","Nomenclature: ML/EL 17 X P 1 - 036 - 230 A 01, where X = R-410A, P = heat pump outdoor unit, 1 = single stage."] },
  { re: /^(ML13KC1|ML14KC1|ML17KC2)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Merit ML13KC1 / ML14KC1 single-stage and ML17KC2 two-stage air conditioner - R-454B", notes: ["There is NO control board in these condensers. The high- and low-pressure switches wire straight in series with the compressor contactor coil, so there is no LED, no display, no stored fault and nothing to reset. If a tech is hunting for a code here, there isn't one.","Diagnose by metering across the pressure switches or by reading system pressures directly - an open switch simply drops the contactor.","ML17KC2 is a two-stage scroll staged by a two-stage room thermostat off Y1/Y2. There is no staging board in the outdoor unit.","R-454B (A2L). Units built from June 2025 may carry the 30-ft factory charge (9 oz more than the old 15-ft charge) - the nameplate says 'Factory Charge (30FT)' and the carton label has a pink band. Check before adding refrigerant.","Read ML13KC1-036-230A01 as ML (Merit) 13 (SEER2 tier) K (R-454B) C (air conditioner) 1 (single stage; 2 = two stage on the KC2) 036 (3 ton) 230 (208-230V 1ph; 233 = 3 phase) then ratings revision and revision level.","Capacities 018-060 on the single-stage models; the two-stage ML17KC2 starts at 024 (no 1.5 ton)."] },
  { re: /^(EL15KC1|EL16KC1)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Elite EL15KC1 / EL16KC1 single-stage air conditioner - R-454B", notes: ["Elite tier of the same board-less platform as ML13KC1 / ML14KC1 - no control board, no LED, no code. Pressure switches feed the contactor coil directly.","R-454B (A2L). Check the nameplate for 'Factory Charge (30FT)' before adding charge on units built from June 2025 (SVC note 100205).","EL16KC1 lists split capacity codes 041/042 (3.5 ton) and 047/048 (4 ton) as well as 018-060 - the number on the plate may not be the tonnage you expect.","Read EL15KC1-036-230A01 as EL (Elite) 15 (SEER2 tier) K (R-454B) C (air conditioner) 1 (single stage) 036 (3 ton) 230 (208-230V 1ph) then ratings revision and revision level."] },
  { re: /^ML18XC2/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Merit ML18XC2 two-stage air conditioner - R-410A", notes: ["No control board. Two-stage scroll staged directly by a two-stage room thermostat on Y1/Y2; the pressure switches wire in series with the contactor coil. No LED and no code.","R-410A predecessor of the R-454B ML17KC2 - same board-less approach, different refrigerant.","Read ML18XC2-036-230 as ML (Merit) 18 (SEER tier) X (R-410A) C (air conditioner) 2 (two stage) 036 (3 ton) 230 (208-230V 1ph). Capacities 024-060, no 1.5-ton size."] },
  { re: /^(EL16XC1|EL17XC1)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Elite EL16XC1 / EL17XC1 single-stage air conditioner - R-410A", notes: ["This rule sits ahead of the generic Lennox EL1[678]X rule on purpose - without it these land on the SL25XPV/EL18XCV inverter family, which is the wrong machine entirely. These are single-stage condensers with NO control board and no code.","Pressure switches wire straight to the contactor coil. Meter the switch or read pressures; there is nothing to reset.","3-ton capacity trap: SVC note 100095 (Sept 2023) reduced the AHRI Appendix-M rated capacity of EL16XC1-036 and ML14XC1-036 by 8 percent (34,600 to 31,800 Btuh). SEER/EER and all Appendix-M1 SEER2/EER2 numbers are unchanged - if the paperwork and the plate disagree, check which rating table it came from.","EL16XC1 has no Service Literature of its own in the Lennox document index - the board-less conclusion comes from its EHB and from every sibling in the same generation."] },
  { re: /^XPG20/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox XPG20 two-stage heat pump - legacy R-410A, SunSource solar-assist compatible", notes: ["GAP: there is no XPG20 Service Literature or unit-information manual in the Lennox document index at all - only a SunSource kit instruction and generic multi-platform heat-pump literature. No control board and no code table could be sourced.","Do not assume it shares the XP21N control. XPG20 is an earlier two-stage platform; the board must be identified at the unit before any code table is used.","If the unit has a SunSource solar module, the module is an accessory package (its own literature, 506315-01-000) and not part of the heat pump's own diagnostics.","Replacement Defrost Control Kit 16V38 (507834-01-000) covers various Lennox heat pumps of this era - check that kit's model list before ordering a board."] },
  { re: /^EL[0-9]{3}[KX][CP]/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Elite EL072-EL240 KC/KP (R-454B) and XC/XP (R-410A) light-commercial split condensers and heat pumps, 6-20 ton, 3-phase", notes: ["The series is called ELKC / ELKP / ELXC / ELXP in the literature, but that is NOT what is on the data label. The rating plate reads EL120KCSDT1Y - three capacity digits come before the refrigerant letter, so scan for EL072KC / EL090XP / EL120KC and so on.","Read EL120KCSDT1Y as EL (Elite) 120 (10 ton; 072 = 6, 090 = 7.5, 150 = 12.5, 180 = 15, 240 = 20) K (R-454B; X = R-410A) C (air conditioner; P = heat pump) S/D (single or dual refrigerant circuit) T (two-stage compressor) 1 (minor design sequence) Y (208/230V 3ph; G = 460V 3ph, J = 575V 3ph).","These are partial-unit condensers with no diagnostic control board of their own - none of the four Service Literature manuals has a control-board diagnostics section. Codes come from whatever indoor unit or blower coil (ELKA and similar) they are matched to.","Heat pump versions (ELKP / ELXP) are single-circuit only in 072 / 090 / 120 - there is no 150-240 heat pump size.","Three-phase only; minimum SCCR is 5 kA on every size.","Field charge is per the line-set length table in the manual (25 ft baseline), not a weigh-in-and-forget number.","This rule deliberately runs ahead of the existing ^EL(29[67]|19[56]|280|180) furnace rule: EL180KC is a 15-ton commercial condenser, not an EL180 furnace."] },
  // --- end coverage:lennox-achp-current ---
  // --- coverage:ameristar-legacy (v124) ---
  { re: /^M4AC[346]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Ameristar M4AC3 / M4AC4 / M4AC6 legacy R-410A split system air conditioner (1.5-5 ton, the generation before the A4AC / A5AC line)", notes: ["This unit has NO diagnostic code display. The outdoor control is a compressor contactor, run capacitors and a high/low pressure switch pair - there is no LED, no 7-segment and no fault table anywhere in the literature. Diagnose it on pressures, superheat/subcooling, amps and the safety string; do not go hunting for a code.","Read M4AC3018C1000NA as M4AC3 (series) 018 (nominal capacity) C (revision) 1000 (config block) NA (suffix). No digit-by-digit legend is printed in any recovered M-series document - this reading comes off real model numbers and the official warranty table, not a published map.","M4AC3017 / 023 / 029 are the small-footprint cabinet of the 018 / 024 / 030 tonnage and carry only a one year base warranty against the standard term - the same convention as A4AC3023 against A4AC3024.","Fixed orifice: charge to the printed Superheat Charging Chart. Field TXV: charge to 10 F subcooling, then set the valve for 9 F (+/- 3 F) superheat. Both tables are in Diagnostic Help.","Factory charge covers 15 ft of liquid line and 150 ft is the maximum line length. The manual states this unit is NOT designed to operate with a low ambient kit - do not add one and do not modify the control system.","MCA / MOP by size (Table 4): 018 = 10.4 / 15, 024 = 14.4 / 25, 030 = 15.2 / 25, 036 = 19.9 / 35, 042 = 28.2 / 45, 043 = 21.6 / 35, 048 = 32.0 / 50, 060 = 31.1 / 50.","M2AC3 is the older R-22 predecessor of this same cabinet - check the data plate refrigerant before you put R-410A gauges on an M-series condenser."] },
  { re: /^M4HP[346]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Ameristar M4HP3 / M4HP4 / M4HP6 legacy R-410A split system heat pump (1.5-5 ton, the generation before the A4HP / A5HP line)", notes: ["This unit has NO diagnostic code display. The submittal lists the refrigeration controls as condenser fan, compressor contactor, high pressure switch and low pressure switch - defrost and protection on this generation are analog (pressure switches plus T3 / T4 thermistors), so there is no code to read and none to look up.","T3 is the outdoor coil sensor and T4 the outdoor ambient sensor. The only published diagnostic for them is the T3 / T4 Sensor Resistance Table (88-M4HP001-1A-EN) - it is in Diagnostic Help, values in kilo-ohms from -4 F to 282 F.","Read M4HP6018B1000AA as M4HP6 (series) 018 (nominal capacity, 1.5 ton) B (revision) 1000 (config block) AA (suffix). Same inferred layout as M4AC; no printed nomenclature legend exists for the M-series.","Orifice metering on the M4HP6 submittal entries - charge these by superheat unless a field TXV kit was installed. M4HP6018 factory charge is 5 lb 5 oz, 3/4 in vapor and 3/8 in liquid, 208/230-1-60, MCA 10.4 A / MOP 15 A.","Rated to run to 115 F outdoor ambient.","M2HP3 is the older R-22 predecessor - check the data plate refrigerant before gauging an M-series heat pump."] },
  { re: /^M4AH[346]/, brand: "Trane", equipment: "Air Handler", series: "Ameristar M4AH3 / M4AH4 / M4AH4E / M4AH4P / M4AH6 legacy multi-position air handler (1.5-5 ton, matches the M4AC and M4HP outdoor units)", notes: ["No control board and no diagnostic display - blower speed is a field-selected tap (Low / Middle / High), not an electronic module. Nothing on this air handler stores or shows a fault code.","M4AH is the AIR HANDLER prefix. The SEER number in the document filenames describes the matched system rating, not a property of the air handler on its own.","The Low and Middle taps are only published out to 0.5 in. W.C. external static; the High tap is the only one with data out to 0.8 in. W.C. If the duct measures above 0.5 in. W.C. you are off the table on the two lower taps.","Field-installed electric heat kits: MAYHTR1A05BKR* = 5 kW, 08* = 7.5 kW, 10* = 10 kW (all fit sizes 18-60); 15* = 15 kW and 20* = 20 kW are double-breaker panels and fit sizes 36-60 only.","Mobile home minimums stated in the guide: size 42 must move at least 1335 CFM, size 48 at least 1584 CFM.","Metering is set by the matched outdoor unit - a factory piston (C050 through C090 by match) or a field MAYTXVAC kit. Read the matched-system table before deciding whether to charge on superheat or subcooling.","Cover states R-410A OR R-22 - this cabinet was sold into both generations, so confirm the refrigerant on the outdoor unit data plate."] },
  { re: /^M4P[HW][34]/, brand: "Trane", equipment: "Other", series: "Ameristar M4PH4 / M4PH3 / M4PW4 legacy packaged heat pump and air conditioner (single cabinet, 2-5 ton, 14 SEER, R-410A)", notes: ["No diagnostic code display on this platform either. The control PCB protects with hard cutouts only - pressure switches, a discharge line limit and the T3 / T4 thermistors. Nothing flashes a code, so read the cutout setpoints in Diagnostic Help instead of looking for one.","Cutouts: high pressure stops at 638 PSIG and resumes at 464 PSIG after a 3 minute delay; low pressure stops at 21 PSIG and resumes at 44 PSIG after a 3 minute delay; discharge temperature stops above 275 F and resumes below 194 F.","Four low pressure trips inside 30 minutes locks out the compressor and outdoor fan - the unit has to be powered down and back up to clear it. That lockout is the closest thing this unit has to a stored fault.","If T3 or T4 goes open or shorted the compressor, outdoor fan AND reversing valve circuit all shut down together - that three-at-once pattern is the sensor signature.","SW3 on the control PCB: SW3-1 ON forces a manual defrost (put it back to OFF afterward), SW3-3 ON = 30 minute defrost check interval and SW3-3 OFF = 60 minute interval.","T4 below 5 F stops the compressor; it restarts above 10.4 F. Crankcase heater energizes when the compressor is off and T4 is below 41 F, and drops out at 45 F or whenever the compressor runs.","Reversing valve is energized in HEATING on this platform (install guide Fig. 6-1 wiring note: the B wire energizes the reversing valve in heating and cuts off in cooling). Thermostat wire colors from Table 8-2: red and black power, white heat 1, white/black heat 2, green blower, yellow compressor, blue reversing valve.","M4PH3 and M4PW4 are confirmed real prefixes from the official M-series warranty table (GW-659-1918) but no readable literature for them was recovered - treat the M4PH4 setpoints above as M4PH4 only until the data plate says otherwise."] },
  { re: /^M4PG[34]/, brand: "Trane", equipment: "Other", series: "Ameristar M4PG4 / M4PG3 legacy packaged gas/electric unit (single cabinet, gas heat plus electric cooling)", notes: ["No diagnostic code display was documented for this family, and no readable installation or service manual for it survives - the only install guide found is truncated in the archive and the remaining files are image-only certificates.","Confirmed model numbers include M4PG4024A1060A, M4PG4030A1060A, M4PG4036A1090A, M4PG4042A1090A, M4PG4048A1090A, M4PG4060B1090A / B1130A and the C revisions of the same sizes. The second number group (060 / 090 / 110 / 130) moves independently of the tonnage code, but no nomenclature legend was recovered - do not read a heat input off the model number, take it off the data plate.","Gap: nomenclature, wiring, gas train and any furnace-side ignition code table for M4PG4 are all unsourced. Work the gas side off the ignition control's own label and do not assume the A-series Ameristar furnace e-codes apply here.","M4PG3 is confirmed real from the official M-series warranty table (GW-659-1918); nothing else about it was recoverable."] },
  // --- end coverage:ameristar-legacy ---
  // --- coverage:lennox-ah-pkg (v124) ---
  { re: /^CBH?[0-9]{2}(?![0-9])/, brand: "Lennox", equipment: "Air Handler", series: "Lennox CB / CBH legacy blower coil air handlers - CB15, CB17, CB18, CB19, CB21V, CB26UH, CB27UH, CB28UH, CB29M, CB30M, CB30U, CB31MV and the horizontal-only CBH17 / CBH19 / CBH21 / CBH21V", notes: ["There is no fault code on this generation. CB15/17/18/19/26UH/27UH/28UH/29M/30M/30U are a blower relay or contactor and nothing else - if you are hunting for a flash code you are at the wrong unit.","CBH is the horizontal-only cabinet of the matching CB (CBH17 vs CB17, CBH21V vs CB21V). Same internals, separate SKU.","CB21 / CBH21 / B21 do carry a Blower Drive Control A15 (BDC) with three status lights - ON/OFF, HI/LOW and HEAT. Those are state lights, not fault codes; the table is in Error Codes.","CB21V / CBH21V / CB31MV use a GE/Emerson ICM2.3 variable speed motor. Troubleshoot it from the symptom/cause chart in the CB31MV service literature (Corp. 9618-L9), not from a code.","CB26UH model number: CB 26 UH - 030 - R - 230 - 1. The R in the metering position means a factory-installed RFCIV; no R means a TXV (Corp. 0527-L10).","Do not confuse these with CBA / CBX / CBK - those carry the coil/refrigerant letter (A = aluminum coil, X = HFC-410A, K = R-454B) and are matched by the separate Lennox CBA/CBX/CBK rule."] },
  { re: /^ELA[0-9]{3}/, brand: "Lennox", equipment: "Air Handler", series: "Lennox ELA light commercial air handler, 6-20 ton - ELA072, ELA090, ELA120, ELA150, ELA180, ELA240 (R-410A, original line)", notes: ["There is no numbered fault code table for this unit. The service literature troubleshoots by component, and the only readout on the LVC2 (A183) VFD control board is a power LED.","Model reads ELA072S4S / ELA090S4D - the trailing letters are cabinet/voltage options, not a code.","Blower speed is set by which output terminal A183 signals on the A96 variable frequency drive. A183 uses inverse logic: 1 VDC at a terminal means that speed is ENABLED, 24 VDC means it is not.","The A96 inverter is gated by inverter protection relay K232. If A96 trips, K232-1 opens and the thermostat goes completely dead - that reads as a dead transformer if you do not know to look."] },
  { re: /^EL[0-9]{3}[KX]A/, brand: "Lennox", equipment: "Air Handler", series: "Lennox EL072XA-EL240XA (R-410A) and EL072KA-EL240KA (R-454B) light commercial air handlers, 6-20 ton", notes: ["READ THE NAMEPLATE ORDER: the model is EL072KA / EL072XA, not ELKA072 / ELXA072. The Lennox document library files them as the ELKA and ELXA families but the data label prints the capacity between EL and the refrigerant letters.","XA = R-410A, KA = R-454B (A2L). EL180XA and EL180KA look like the EL180 gas furnace prefix - they are not; this rule is deliberately placed above the EL180/EL280/EL296 furnace rule.","No numbered fault code table exists for these air handlers either. Component-level troubleshooting plus the LVC2 (A183) power LED is all the service literature gives you.","KA units carry the R-454B RDS non-communicating blower control board. Its multicolor LED and red wink codes are already in Error Codes under the Lennox RDS rooftop family."] },
  { re: /^1[0-5](?:GCS|CHA|CHP|GEP|HPP)X?(?![A-Z])/, brand: "Lennox", equipment: "Other", series: "Lennox residential packaged units, numeric SEER tier first - 10GCS / 12GCS / 13GCS / 13GCSX / 15GCSX gas-electric, 10CHA / 13CHA / 13CHAX / 15CHAX cooling only, 10CHP / 12CHP / 13CHP / 13CHPX / 15CHPX heat pump, plus 13GEP and 13HPP", notes: ["GCS and GEP = gas heat / electric cool. CHA = cooling only. CHP and HPP = heat pump. A trailing X is the higher-efficiency revision of the same base model.","Gas models: one red LED on the blower/ignition control (A3). Slow flash and fast flash are normal; 2/3/4/5 flash and steady on are the faults. Table is in Error Codes.","Heat pump models: a two-LED defrost control (DS1 red, DS2 green) read as a PAIR. Table is in Error Codes.","TRAP on the defrost board - the pressure switch inputs are only watched while Y1 is active. With Y1 off you see Normal or Anti-Short-Cycle even though a switch is open.","13GEP natural gas units have NOx screens inside the heat exchanger that break down and let the flame impinge on the clam. Service note H-15-01 says look for and remove the screen unless local code requires low-NOx.","CHA16 / CHP16 / CHP20 / GCS16 / GCS20 / CHA24 / CHP24 / GCS24 write the tier AFTER the letters and are matched by the separate rule."] },
  { re: /^(?:GCS|CHA|CHP)(?:1[0-9]|2[0-4])(?![0-9])/, brand: "Lennox", equipment: "Other", series: "Lennox older packaged units, letters first - GCS16 / GCS20 / GCS24 gas-electric, CHA16 / CHA24 cooling only, CHP16 / CHP20 / CHP24 heat pump (2 ton through 12.5 ton)", notes: ["These are the pre-numeric-tier naming generation and they are largely electromechanical - contactor, sequencer, relays. The service literature reviewed for CHA16 / CHP16 / CHP20 shows no diagnostic board and no LED at all.","Capacity is spelled out in the suffix and it is not tons: GCS16-072 is 6 ton, GCS24-653 is 5 ton, CHA24-1353 is 10 ton. Read the rating plate, do not infer.","GCS16 and CHA16 exist in both a 2-5 ton book and separate 6-12.5 ton and 15/20 ton books. Pull the manual that matches the capacity code, not just the prefix.","Not to be confused with the Lennox CX/CH/CR3x indoor coils - those are matched by the separate coil rule."] },
  { re: /^LRP1[35]/, brand: "Lennox", equipment: "Other", series: "Lennox LRP13 and LRP15 residential packaged units (R-454B generation) - LRP13ACK / LRP13GEK / LRP13GXK / LRP13GNK / LRP13HPK / LRP15GEK / LRP15GXK / LRP15HPK, and the non-K LRP13AC / LRP13GE / LRP15GE listings", notes: ["AC = cooling only, GE = gas/electric standard NOx, GX = low NOx, GN = ultra-low NOx, HP = heat pump, DF = dual fuel. A trailing K is the R-454B (A2L) generation.","The existing LRP rule only covers LRP14 and LRP16. This rule is what catches the current LRP13 and LRP15 units.","Gas heat: ignition control A3, one LED. Slow/fast flash normal, steady off = no power or dead board, steady on = internal control failure, 2/3/4/5 flash are the faults. Same table as LRP14/LRP16.","Heat pump: defrost control with DS1 red and DS2 green, read as a pair. Same table as LRP14/LRP16 and the 13CHP packaged units.","K units also carry the RDS non-communicating blower control board with a multicolor LED and red wink codes - that table is already in Error Codes under the Lennox RDS rooftop family and it is the six-code version, not the five-code CBK fan coil version.","The blower on LRP13/15/16 is an ECM with its own CFM LED that flashes once per 100 CFM commanded."] },
  { re: /^Z[GCH]D[0-9]/, brand: "Lennox", equipment: "Other", series: "Lennox Raider light-commercial packaged rooftop, R-454B (A2L), 3-12.5 ton - ZGD gas/electric, ZCD electric/electric (AC), ZHD heat pump (3-10 ton)", notes: ["Lennox replaced its commercial RTU line for R-454B in 2025; Raider is the 3-12.5 ton family (refrigerant digit 5 = R-454B). Tonnage digits: 036=3t, 048=4t, 060=5t, 072/074=6t, 078=6.5t, 092=7.5t (NOT 090), 102=8.5t, 120=10t, 150=12.5t.", "Control is the Lennox CORE Control System (M4 Unit Controller) - a newer platform than Prodigy, with numeric alarm codes that largely carry over Prodigy's numbering. The CORE Application Guide (485115) and the Prodigy 2.0/M3 guide (507242, for legacy units) are both in Manuals -> Lennox.", "This is a Z-prefix DISTINCT from the York Z-series RTUs: Lennox Raider is Z + G/C/H + D + tonnage (a letter D in position 3); York Sun Pro / Predator is Z + F/H/J/R + a digit."] },
  { re: /^L[GCHD][HMTXA][0-9]/, brand: "Lennox", equipment: "Other", series: "Lennox packaged rooftop - Model L (LGM/LCM/LHM/LDM), Enlight (LGT/LCT/LHT/LDT), Xion (LGX/LCX/LHX) R-454B; and legacy Landmark/Energence (LGH/LCH/LHH) R-410A. 2nd letter G=gas/electric, C=electric/electric, H=heat pump, D=dual-fuel", notes: ["Light-commercial single-package rooftop, 3-25+ ton (the 3-12.5 ton sizes are in range). Current Model L / Enlight / Xion are R-454B (A2L, refrigerant digit 5); LGH/LCH/LHH Landmark/Energence are the R-410A predecessors still common in the field. Tonnage: 092=7.5t (NOT 090), 120=10t, 150=12.5t.", "Two controller generations: legacy units run Prodigy 2.0 / M3 (numeric alarm codes 1-193, asterisked codes close the service relay); current units run the Lennox CORE / M4 Unit Controller. Identify the controller before using a code table. Both application guides (Prodigy 507242, CORE 485115) are in Manuals -> Lennox.", "Sample Prodigy/M3 alarm codes: 1=loss of power/single-phase; 4*=smoke; 5*=blower airflow switch open; 6*=dirty filter; 8*=strike-3 blower lockout; 12-18=compressor high-pressure/high-temp trips; 40/41=return-air over-heat/under-cool; 42=blower overload; 91/92=economizer enthalpy sensor; 121-126=line frequency/voltage/phasing; 129=VFD shutdown; 188-191=inverter alarms.", "Distinct from the Lennox LRP residential packaged units and the EL072-240 KC/KP light-commercial SPLIT condensers already in the scanner."] },
  { re: /^2S[AGH]1[3-6]/, brand: "Lennox", equipment: "Other", series: "Aire-Flo 2S packaged units sold through Lennox - 2SA13 cooling only, 2SG13 gas/electric, 2SH13 heat pump", notes: ["These are Allied Air (A.A.C., a Lennox International Inc. company) built units carried in the LennoxPros document library under the Aire-Flo badge. The install books are titled '(2,4)SA13', '(2,4)PGE/SG(13/15)' and '(2,4)SH13' - the 4-prefix sibling is the Allied Air part number, so Allied Air 4PGE / 4SCU / 4SHP information applies to the same hardware.","No Lennox Service Literature exists for this line at all. Everything diagnostic is inside the Installation Instructions.","2SG13 gas heat uses the same one-LED ignition control table as the Lennox packaged gas units: slow flash and fast flash normal, 2/3/4/5 flash faults, steady = micro-controller self-check failure.","2SH13 uses the same two-LED defrost control (DS1 red, DS2 green) as 13CHP and LRP - service note HP-07-01 lists 2SH13, 2HP13 and 13CHP together on defrost control 97M82 / part 100269-01.","HP-07-01: on revision-259 boards a low pressure lockout turns into a FALSE high pressure lockout when the Y signal drops. Revision 285 (catalog 30W87 / part 100269-02) fixes it.","2AC13 / 2HP13 also appear in the Lennox library under Aire-Flo but only as Product Specifications - equipment type unconfirmed, so no rule was written for them."] },
  // --- end coverage:lennox-ah-pkg ---
  // --- coverage:lennox-furn-legacy (v124) ---
  { re: /^G(HR)?26Q/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G26 / GHR26 legacy condensing gas furnace (G26Q upflow, GHR26Q horizontal/downflow)", notes: ["Model form is family + Q + design digit + dash + input MBh: G26Q3-75, GHR26Q4/5-100. A trailing -1 on a wiring-diagram title (G26Q3-75-1) is the revision, not part of the size.","G26/GHR26 -1 and -2 units are intermittent pilot (Johnson G776 / Lennox 69J3601 / 41K8701, ONE control LED). -3 through -6 are SureLight with TWO board LEDs - two completely different code tables, both in Error Codes.","GHR26-1 uses the EGC-1 board (DIAG #1 / DIAG #2), which reads right-to-left compared with SureLight - check the board silkscreen before decoding.","Do not read the LEDs with the blower access panel off - there is a sight glass in the panel for that.","LP conversion manifold pressure is 7.5 in. w.c., NOT the 10 in. w.c. used elsewhere in the Lennox line (H-93-12).","Service Literature Corp. 9721-L11 (G26) / 9722-L11 (GHR26) is in Manuals."] },
  { re: /^G(HR)?32[QV]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G32 / GHR32 legacy two-stage condensing gas furnace (Q standard blower, V variable-speed blower)", notes: ["Q = PSC blower, V = variable-speed (VSP-controlled ICM) blower, per the Product Spec titles. Forms: G32Q3-75, G32V5-100/125-4, GHR32Q4/5-120.","TWO different diagnostic tables exist for this family and both are in Error Codes: the 9-pin SureLight two-LED table, and the later two-stage 12-pin control table (DS1/DS2) which adds a separate high-fire pressure switch code (OFF / FAST FLASH).","Low flame signal threshold differs by board: .61 microamps on the SureLight table, .23 microamps on the two-stage table. Read the board part number before judging a flame current.","G32V/GHR32V also carry a VSP blower board with its own DS LEDs - those are blower status, not fault codes.","Service Literature Corp. 9729-L12 (G32Q), 9816-L10 (G32V), 0001-L2 (GHR32Q/GHR32V) are in Manuals."] },
  { re: /^G23Q/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G23(X) legacy upflow standard-efficiency gas furnace", notes: ["Spec-table forms: G23Q2-50, G23Q2X-50, G23Q2/3-75, G23Q4/5-75, G23Q3-100. The (X) on the spec table means the X-suffix variant shares that row.","G23-1 through -4 are intermittent pilot on a Johnson G776 control with ONE LED; G23(X)-5 and -6 are SureLight with TWO LEDs. Both tables are in Error Codes.","Nameplate trap: some G23 nameplates print 7 in. w.c. manifold pressure. The correct natural-gas setting is 3.5 in. w.c. (H-93-12).","Repeat ignition lockouts on early units are usually the pilot assembly lifting flame, not the control - improved pilot kit 81J0501PR (H-94-8).","Service Literature Corp. 9814-L8 is in Manuals."] },
  { re: /^G20R?Q/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G20 / G20E / G20R / G20RE legacy standing-pilot and intermittent-pilot gas furnace (G20 upflow, G20R downflow)", notes: ["Forms: G20Q2-50, G20Q3E-75, G20Q2X-50, G20RQ2/3E-50, G20RQ3XE-75. The E means electronic (intermittent pilot) ignition; no E means standing pilot.","Standing-pilot G20/G20R units have no ignition control and no diagnostic LED at all - troubleshoot the Robertshaw or Honeywell pilot gas valve directly.","G20E/G20RE use a Robertshaw intermittent-pilot module. The service literature does not publish an LED code table for it, so there are no G20 flash codes in Error Codes.","If a Honeywell 80N9201 was fitted as a replacement (kit 53L90), pre-purge becomes 45 s nominal and the trial for ignition 70 s, with no post-purge - it looks like a slow-lighting furnace but is normal (H-01-1).","Service Literature Corp. 9418-L9 (G20) and Corp. 9419-L9 (G20RE) are in Manuals."] },
  { re: /^(G|GSR)21[QV]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G21 / G21V / GSR21 / GSR21V Pulse-combustion condensing gas furnace", notes: ["Pulse models put the input in the model number with no dash: G21Q360, G21Q4/5100, GSR21V5100. Q = relay/PSC blower, V = VSP-controlled variable-speed blower.","Three interchangeable ignition controls were factory fitted and they signal OPPOSITE ways: on the Lennox GC1 the LED is normally OFF (lit = lockout or fault); on the GC3 and Johnson G891 the LED is normally ON. Both tables are in Error Codes.","GC1 units use a separate external Watchguard board (WG1/A18) above the control box; GC3 and G891 do the Watchguard internally.","G891 flame signal must be read with transducer 78H5401 - a flickering LED above 2.5 microamps is a known control quirk, not a low flame signal (H-05-3).","Indoor blower that will not shut off after a heat cycle on a 52J18 GC-3 control is the ignition control, not the fan timer - kit 60J00 (H-99-5).","Service Literature Corp. 9815-L9 is in Manuals."] },
  { re: /^G2[47]M/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G24M / G24MCE / G27M legacy multi-position gas furnace (SureLight era)", notes: ["Forms: G24M-45, G24M2-60, G24M3-60, G27M-100, G27M3-75A-1. G24MCE-2T/-4T/-6T is the export T-voltage variant.","SureLight two-LED table applies (Error Codes). Earlier G24M units shipped with a direct-spark-ignition control instead - check which board is actually in the unit.","G27M SureLight board terminal designations are documented jointly with G26 in H-97-7.","Nuisance pressure-switch trips in windy weather on G24M and 80MGF are addressed by induced-draft-blower/pressure-switch kits 11K95/11K96/11K98/11K99 (H-95-4).","Service Literature Corp. 9723-L12 (G24M) and Corp. 9703-L2 (G27M) are in Manuals."] },
  { re: /^G29M/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G29M multi-position two-stage gas furnace (50 Hz export, EGC-3ACE control)", notes: ["Documented forms are G29M-1T and G29M-2T; the T is the same export voltage convention used on G24MCE.","G29M does NOT use the SureLight two-LED table. Its board is the EGC-3ACE DSI control with DIAG 1 / DIAG 2 LEDs and its own seven-state table - in Error Codes as its own family.","Hard lockout reset sequence is specific: power off, thermostat HEAT to OFF, power on, thermostat OFF to HEAT.","Board has a red diagnostic recall button (hold for the last failure code) and an erase jumper (power off, short 10 s).","Two-stage control replacement kit 40W53 is shared with G27M; wiring diagrams for converted units are in the doc index.","Installation Instructions 504071M are in Manuals - there is no G29M Service Literature."] },
  { re: /^G25MV/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G25MV multi-position variable-speed gas furnace (RAM burner control)", notes: ["Forms: G25MV3-60, G25MV3-60/75, G25MV5-100, G25MV5-120.","Burner control A3 is a RAM Electronics board with a SINGLE diagnostic LED and a flash-count table (2 to 6 flashes) - it is NOT SureLight and NOT the generic Lennox flash list. Its own family is in Error Codes.","Hot surface ignition: 30 s pre-purge, 35 s ignitor warm-up, 7 s trial. Three trials then 60-minute lockout. Flame current must be 1 to 5 microamps; below 1 microamp the control drops out.","Later units may carry a White-Rodgers HSI ignition board instead (see the G25MV wiring diagram title) - confirm the board before using the RAM table.","Service Literature Corp. 9505-L2 is in Manuals."] },
  { re: /^G41UF/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G41UF single-pipe upflow condensing gas furnace (SureLight, 12-pin)", notes: ["Full label form is G41UF-24B-045 / G41UF-36C-090 / G41UF-60D-135; the short form G41UF-045 is just the input.","SureLight board with two LEDs and a 12-PIN connector - the rollout code text says 12-pin, unlike the 9-pin G26-era board. Its own table is in Error Codes.","Low flame signal threshold is 0.18 microamps; drop-out is 0.15 microamps.","Timing: 15 s pre-purge, 20 s ignitor warm-up, 4 s trial for ignition, 5 s post-purge, blower on 45 s after the gas valve.","Service Literature Corp. 0303-L2 is in Manuals."] },
  { re: /^G43UF/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G43UF two-pipe upflow condensing gas furnace (G41UF successor)", notes: ["Forms: G43UF-045 through -135, full label G43UF-24B-045-1, G43UF-36C-090.","Three different control boards were used and the thresholds move with them: 32M88 (DS1 green, low flame 0.18 microamps, 75 V minimum) and 78M47 / 100973-01 (DS1 RED, low flame 1.5 microamps, 90 V minimum). Read the board number first.","On 78M47 and 100973-01 the ignitor energizes only for the first 3 seconds of the 4 second trial.","Pressure-switch faults on upflow units using the left-hand drain connection are often a blocked collector box drain port (H-06-5).","Service Literature Corp. 0416-L4 is in Manuals."] },
  { re: /^G42UH/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G42UH legacy upflow/horizontal gas furnace (documentation gap)", notes: ["The official Lennox document index carries exactly one document for this family - a wiring diagram. There is no Service Literature, no Installation Instructions and no Product Spec.","No diagnostic code table, sample model forms or nomenclature legend could be confirmed from an official source, so nothing is published for it in Error Codes.","Work from the wiring diagram on the unit and the board part number stamped on the control."] },
  { re: /^80MGF/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox 80MGF legacy multi-position gas furnace (G24M sibling)", notes: ["Forms: 80MGF-45 through -140, 80MGF2-45, and revision markers 80MGF-1/-5/-9/-11.","Two control generations: EGC / EGC-1 (DIAG #1 / DIAG #2, seven states) on early units and SureLight two-LED on later ones. Both tables are in Error Codes - identify the board before decoding.","80MGF-1 and -3 originally used a RAM ignition control (RAM-to-Heatcraft replacement kit).","80MGF-5 and -7 have a documented pressure switch lockout issue (H-97-1); windy-weather nuisance trips share the G24M induced-draft kits (H-95-4).","Service Literature Corp. 9801-L2 is in Manuals."] },
  { re: /^80UHG/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox 80UHG legacy upflow/horizontal gas furnace", notes: ["Forms: 80UHG-45 through -120, 80UHG2-45/-60/-75, 80UHG3-60/-75.","This service literature carries BOTH the SureLight two-LED table (low flame signal 0.2 microamps) and the EGC-2 DIAG #1 / DIAG #2 table for 80UHG-1 units. Both are in Error Codes.","The EGC-2 board takes the Lennox Diagnostic Module 11K75 on its edge connector, which spells out the fault in words.","Low gas pressure switch installation is covered jointly with G24M and 80MGF in H-99-8.","Service Literature Corp. 9728-L12 is in Manuals."] },
  { re: /^90UGF/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox 90UGF / 90UGFA legacy upflow condensing gas furnace (SureLight)", notes: ["Forms: 90UGF-50/-100/-125, 90UGFA-50 through -125, 90UGFA3-75, 90UGFA4/5-125.","SureLight two-LED table applies (Error Codes) - same 9-pin board family as G26/G32.","Shares flue transition kit 59M03 with G26 and G32; the replaced kits were 77K31, 67K45 and 18J20 (H-04-2).","Service Literature Corp. 9720-L11 is in Manuals."] },
  { re: /^G(SR)?14(?![0-9])/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G14 / GSR14 Pulse-combustion gas furnace (1980s generation)", notes: ["Only one confirmed label fragment exists in the official text (G14-100-2) - the Service Literature for both families is an image-only scan with no text layer, so no nomenclature legend could be confirmed.","No diagnostic code table is published for these families in Error Codes; use the wiring diagram and the Pulse service guidelines (H-93-15) instead.","Pulse platform: gas diaphragm kit H-01-8 and the Pulse Furnace Inspection Record LB-91177 apply to G14/GSR14 as well as G21/GSR21.","Service Literature Corp. 8907-L6 (G14) and Corp. 8902-L2 (GSR14) are in Manuals - they open and are readable as page images."] },
  { re: /^G16(?![0-9])/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G16 / G16R / G16X legacy upflow gas furnace (standing pilot era)", notes: ["Nomenclature trap: three different pilot/ignition systems were fitted across this one family - White-Rodgers Gas Energy System, Robertshaw Pilot System and Penn Pilot Ignition - and the model number does not tell you which. Confirm from the wiring diagram on the unit.","The Service Literature (Corp. 844-L3, 1984) is an image-only scan, so no model table or code table could be confirmed from text. Nothing is published for G16 in Error Codes.","Service Literature Corp. 844-L3 is in Manuals as page images."] },
  { re: /^G17Q/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G17 / G17R / G17X legacy upflow gas furnace (standing pilot / Robertshaw intermittent pilot)", notes: ["Spec-table forms: G17Q2-50, G17Q2X50, G17Q3-75, G17Q3X75, G17Q3/4-100, G17Q5/6-125.","G17X units use a Robertshaw intermittent-pilot module. The service literature publishes no LED code table for it, so there are no G17 flash codes in Error Codes.","Damper spring update H-92-5 covers G17 and G20 together.","Service Literature Corp. 9132-L11 is in Manuals."] },
  { re: /^G19(?![0-9])/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G19 legacy upflow gas furnace (documentation gap)", notes: ["The official Lennox index holds only two documents for this family - an Installation Instructions and a Product Spec sheet. There is no Service Literature.","No sample model forms or diagnostic table could be confirmed, so nothing is published for G19 in Error Codes."] },
  { re: /^G(8|9)[DQ]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G8 / G9 legacy gas furnace (1960s-70s generation)", notes: ["Confirmed label forms from Product Spec titles only: G8D1, G8Q2, G9D, G9Q1. D and Q are the cabinet/blower letters used across this generation.","No Service Literature exists in the official index for G8 or G9 - only thin installation and spec sheets. No diagnostic table is published in Error Codes.","Deliberately narrow regex: it requires D or Q after the digit so it cannot swallow the Nortek/Nordyne G7S/G8S prefixes."] },
  { re: /^G1[012][DQRE]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G10 / G11E / G12 / G12E legacy gas furnace (1970s generation)", notes: ["Confirmed label forms from Product Spec titles: G10D, G10Q3-110, G11E-200V, G12D, G12Q, G12DE, G12QE, G12RD, G12RQ. E marks the electronic-ignition versions.","The G11E and G12/G12E Service Literature PDFs are image-only scans with no text layer, so no code table could be confirmed - nothing is published for these families in Error Codes.","Known documented complaints: nuisance pilot outage on G12 and G12R-3 (H-80-3) and Robertshaw ignition control miswiring on G11E (H-80-2).","Service Literature CORPG11E and CORPG12 are in Manuals as page images."] },
  { re: /^GS([6-9]|A7)/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox GS6 / GS7 / GS8 / GS9 legacy gas furnace (oldest documented generation)", notes: ["Confirmed label forms from Product Spec titles: GS6-130, GS6-145, GS7D, GS7Q, GSA7, GS8D, GS8Q, GS81Q, GS9Q.","Only 1960s-era Installation Instructions exist - no Service Literature, no code table. Nothing is published for these families in Error Codes.","The regex requires a digit 6-9 (or A7) after GS so it cannot collide with Goodman GSX / GSZ or with Lennox GSR14 / GSR21."] },
  { re: /^(80|92|95)AF[12]/, brand: "Lennox", equipment: "Gas Furnace", series: "Aire-Flo (Lennox) 80AF1 / 92AF1 / 95AF1 / 95AF2V gas furnace - Lennox ML/EL platform under the Aire-Flo badge", notes: ["Full label form is efficiency + AF + stage digit + cabinet code + input + blower: 92AF1UH045P08B, 95AF1UH070P12. UH = upflow/horizontal, DF = downflow, V suffix = variable speed.","Aire-Flo is a Lennox value badge - the Installation Instructions carry the Lennox limited-warranty text.","80AF1, 92AF1 and 95AF1 share ONE single-LED integrated-control table (LED off/on plus 1-9 flashes) - it is in Error Codes.","95AF2UHV / 95AF2DFV is two-stage and has a DIFFERENT table on a red LED (3 flashes = low-fire pressure/rollout/limit, 5 flashes not used), plus a green High Heat State LED and an amber CFM LED. Both are in Error Codes.","The control stores the last five faults - press and release the push button to recall, hold longer than 5 seconds to clear.","Installation Instructions 507325-01, 507328-01, 507272-04, 507273-03, 507267-04 and 507054-01 are in Manuals. There is no Aire-Flo Service Literature."] },
  { re: /^AF(80|9[02])/, brand: "Lennox", equipment: "Gas Furnace", series: "Aire-Flo (Lennox) AF80 / AF90 / AF92 / AF92V gas furnace - older badge generation, pre-dates the 80AF/92AF/95AF naming", notes: ["Confirmed label forms from doc titles: AF80MPGBB, AF90MPB, AF92V. MP = multi-position cabinet.","Naming order flip trap: the legacy generation is AF first (AF80/AF90/AF92), the current generation is efficiency first (80AF1/92AF1/95AF1). They are not the same furnaces.","AF90MPB is documented with a White-Rodgers SmartValve I gas valve/control, not a Lennox SureLight board, so the Lennox SureLight tables do not apply. No code table is published for this generation in Error Codes.","Installation Instructions for AF90MPB and AF92V are in Manuals."] },
  // --- end coverage:lennox-furn-legacy ---
  // --- coverage:lennox-furn-current (v124) ---
  { re: /^ML195/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox Merit ML195UH / ML195DF 95% gas furnace", notes: ["Two-LED SureLight board (LED #1 red, LED #2 green) - read the DS1/DS2 pattern, not a flash count. Table is in Error Codes.","Flame sense on this board: below 1.5 microamps is a low-flame fault, 0.5 microamps is the minimum sense current.","Rollout code on this table also means the 12-pin connector is not seated - check the harness before condemning the switch.","Serial range 5911J-5912J had the gold-contact pressure switch problem (H-14-01)."] },
  { re: /^ML197/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox Merit ML197UHEK 97% R-454B-ready gas furnace (2026 launch)", notes: ["7-segment E-code display, not a flash-count board - the full table is in Error Codes under the ML197UHEK / ML297UHV(K) family.","Carries Low GWP (A2L) refrigerant leak detection: codes E150-E164 and E390 are the sensor set, and E164 is just the test button being pressed.","E106 twin communication fault is unique to this control - it means one twinned furnace lost power or the two 24VAC supplies are out of phase.","Flame signal on this control: normal above 1.5, low 0.5-1.4, drop out below 0.4 microamps.","Lennox has not published Service Literature for ML197 yet - the code table above came out of the Installation Instructions."] },
  // --- end coverage:lennox-furn-current ---
  // --- coverage:allied (v123) ---
  { re: /^A7(?:AC|HP|CP|SCP)[0-9]{2}[FTV]/, brand: "Allied Air", equipment: "Condenser/Heat Pump", series: "Armstrong Air / AirEase A7AC13F / A7AC14F / A7AC22V air conditioners and A7HP14F / A7HP19V / A7CP21V / A7SCP18V heat pumps - 2025 R-454B line", notes: ["R-454B (A2L). The system must be installed with an Allied Approved Refrigerant Detection System (RDS) sensor and RDS Blower Control Board - do not operate until the RDS is proven.","Read A7AC14F36P-**A as A (AirEase | Armstrong Air) 7 (R-454B) AC (air conditioner; HP heat pump, CP cold-climate heat pump, SCP side-discharge cold-climate) 14 (SEER2 tier) F (fixed speed; V variable) 36 (3 tons) P (208-230V/60Hz/1PH) then major and minor revision.","Capacity digits: 18 = 1.5 t, 24 = 2 t, 30 = 2.5 t, 36 = 3 t, 41/42 = 3.5 t, 47/48 = 4 t, 59/60 = 5 t.","A is the BRAND position and the diagram prints 'A = AirEase | Armstrong Air' - the same unit badged Ducane or Concord drops the A and reads 7AC14F...","The variable models (22V, 19V, 21V, 18V) have a 7-segment display and a push button on the outdoor control. Allied does NOT publish that alert-code table - the manual says alarm information is on the unit access panel and points to the AlliedConnect service manual. Do not read the 4SCU20LX table onto these.","Charge with LIQUID refrigerant by subcooling to the target on the unit charging label. The R-454B cylinder has a 1/4 in. LH flare - you need a LH female flare adapter.","A7AC22V charge mode: jumper the two CHRG MODE pins on the outdoor control to force 100% capacity; it self-exits after 60 minutes.","A7AC13F is sold only in the Northern US and Canada."] },
  { re: /^7(?:AC|HP|CP|SCP|SHP)[0-9]{2}[FTV]/, brand: "Allied Air", equipment: "Condenser/Heat Pump", series: "Ducane / Concord 7AC13F / 7AC14F / 7AC17T air conditioners and 7HP14F / 7HP19V / 7SCP18V / 7SHP15V heat pumps - the Armstrong A7 unit without the brand letter", notes: ["Same machine as the Armstrong Air / AirEase A7 line - the Ducane and Concord model number simply starts at the refrigerant digit 7 with no brand position.","Read 7AC14F36P-**A as 7 (R-454B) AC (air conditioner) 14 (SEER2 tier) F (fixed speed; V variable) 36 (3 tons) P (208-230V/60Hz/1PH) then major and minor revision.","R-454B (A2L) - Allied Approved RDS sensor and RDS Blower Control Board required.","No public alert-code table for the variable 7HP19V / 7SCP18V - same AlliedConnect gate as the Armstrong twins."] },
  { re: /^7AH[12W][AR][CEV]/, brand: "Allied Air", equipment: "Air Handler", series: "Armstrong Air / AirEase / Ducane / Concord 7AH1AC / 7AH1AE / 7AH1AV / 7AH1RE / 7AH2AE / 7AH2AV / 7AHWAC / 7AHWAE one-piece R-454B air handler", notes: ["All four badges use the identical model number - there is no brand letter on this air handler.","Read 7AH1AE36PX-71 as 7 (R-454B) AH (air handler) 1 (one-piece cabinet) A (1st generation series) E (constant-torque motor; V variable speed, C PSC) 36 (3 tons) P (208-230V/60Hz/1PH) X (TXV metering) then the control position ('-' = 24V) and major revision 71 = R-454B only.","No diagnostic code table on the air handler itself. On an A2L system the leak response comes from the RDS Blower Control Board - a flashing BLUE LED plus blower on / compressor off is leak-detection mode, not a blower fault."] },
  { re: /^4S(?:CU|HP)(?:20|2[23])LX/, brand: "Allied Air", equipment: "Condenser/Heat Pump", series: "Armstrong Air / AirEase 4SCU20LX / 4SCU23LX air conditioner and 4SHP20LX / 4SHP22LX heat pump - inverter-driven variable capacity (R-410A, Comfort Sync)", notes: ["This tier has an OUTDOOR CONTROL WITH A 7-SEGMENT DISPLAY showing Ennn alert codes, plus a separate inverter board with red and green LEDs that flash an inverter code. Codes also appear on the Comfort Sync Wi-Fi thermostat.","Fault and lockout codes take precedence over status codes, and only the latest ACTIVE code is shown. Powering up clears all currently displayed codes; codes also clear themselves when conditions return to normal.","On power-up the display shows the control firmware version, then the self-discovered unit type - AC or HP, or three bars if it cannot tell.","Pressure switch setpoints on this platform: low pressure opens below 40 PSIG and closes above 90 PSIG; high pressure opens at 590 PSIG and closes at 418 PSIG.","Only the 4SCU20LX / 4SHP20LX service manual was sourced - 4SCU23LX, 4SHP18LX and 4SHP22LX are in the same tier but their tables were not verified.","The 4SHP18LX form is caught by the general 4SHP rule; this rule exists so the 20/22/23 LX units point at the inverter code table."] },
  { re: /^4SCU(?:1[3-8]|2[03])L[BESTX]/, brand: "Allied Air", equipment: "Condenser/Heat Pump", series: "Armstrong Air / AirEase 4SCU13LB / 13LE / 14LB / 14LE / 16LE / 16LS / 16LT / 17LE / 18LS / 18LT / 20LX / 23LX split air conditioner (R-410A)", notes: ["Read 4SCU13LE124P-5 as 4 (R-410A) SCU (split air conditioner) 13 (nominal SEER) LE (louvered tier letter) 1 (series) 24 (nominal capacity, 24,000 Btuh) P (208-230V/60Hz/1PH) then major and minor revision.","Tier letters seen on the line-up: LB, LE, LS, LT, LX. The LX tier is the inverter-driven variable-capacity unit.","Single-stage LB/LE tiers have NO diagnostic board - contactor, capacitor and protection switches only, nothing flashes a code.","4SCU20LX is different: it has an outdoor control with a 7-segment display and a separate inverter board. Its E-code table is in Error Codes under the Allied Air LX inverter family.","Do not confuse with Ducane/Concord, which use 4AC13/4AC14/4AC16 for the same efficiency tiers."] },
  { re: /^4SHP(?:1[3-8]|2[0-2])L[BESTX]/, brand: "Allied Air", equipment: "Condenser/Heat Pump", series: "Armstrong Air / AirEase 4SHP13LB / 13LE / 14LB / 14LE / 15LE / 16LE / 16LS / 16LT / 17LE / 18LS / 18LT / 18LX / 20LX / 22LX split heat pump (R-410A)", notes: ["Read 4SHP16LS124P-2 as 4 (R410A refrigerant) SHP (split heat pump) 16 (16 SEER nominal) LS (louvered, two stage, communicating enabled) 1 (series) 24 (nominal capacity 24,000 Btuh) P (208-230V/60Hz/1PH) then major and minor revision code.","The defrost control board carries two LEDs - DS1 red and DS2 green - with a simple state table (normal / anti-short-cycle / low-pressure fault or lockout / high-pressure fault or lockout). See Error Codes under the Allied Air 4SHP defrost control family.","Defrost thermostat closes at 29 F on the outdoor coil; defrost interval pins select 30, 60 or 90 minutes of accumulated compressor run time.","The 4SHP16LS spec sheet states the control saves the last 10 fault codes through a power interruption.","4SHP20LX is the inverter-driven variable unit - it has the 7-segment E-code display instead, in its own Error Codes family."] },
  { re: /^4(?:AC|HP)1[3-6][BLT]{0,2}[0-9]/, brand: "Allied Air", equipment: "Condenser/Heat Pump", series: "Ducane / Concord 4AC13B / 4AC13L / 4AC14B / 4AC16L / 4AC16LT air conditioner and 4HP13L / 4HP16 heat pump (R-410A value tier)", notes: ["Ducane and Concord equivalent of the Armstrong 4SCU / 4SHP tiers, but with a DIFFERENT product-type code (AC / HP instead of SCU / SHP) and different tier letters - B = wire guard, L = louvered. Do not merge the two families.","Read 4AC13L24P-1A as 4 (R-410A) AC (air conditioner; HP heat pump) 13 (nominal SEER) L (louvered coil guard; B wire guard) 24 (nominal capacity 24,000 Btuh) P (208-230V/60Hz/1PH) then revision.","No diagnostic board on the air conditioners. The 4HP defrost board was not confirmed against a Ducane/Concord document - if it has the DS1/DS2 LED pair, work it with the 4SHP table but verify against the unit's own wiring diagram first."] },
  { re: /^PRP(?:AC|GE|GN|GX|HP|DF)1[46]/, brand: "Allied Air", equipment: "Other", series: "Armstrong Air / AirEase / Ducane / Concord PRPGE / PRPGN gas-electric, PRPAC straight-cool, PRPHP heat pump and PRPDF dual-fuel Premium Residential packaged unit", notes: ["Read PRPGE1436-090EP-1A as PRP (premium residential package unit) GE (gas/electric; GX or GN low-NOx, AC straight cool, HP heat pump, DF dual fuel) 14 (SEER family) 36 (3 tons) 090 (heating input, 90,000 Btuh) E (ECM constant torque) P (voltage) then major and minor revision.","Tonnage digits 24, 30, 36, 42, 48, 60. Heating input digits 54, 72, 90, 108, 126.","The gas section's direct spark ignition control flashes RATE-CODED fault codes on a single LED - slow flash, fast flash, then 2/3/4/5/6 flash and steady. See Error Codes under the Allied Air packaged ignition control family.","Blower CFM LED: one full flash = 100 CFM, a fast/half flash = 50 CFM (1150 CFM reads as 11 full flashes plus one half).","Blower is delayed 30 seconds after W1/W2 is energized, and the control ignores a second-stage call during the first-stage timing period.","Ducane and Concord list the identical PRP prefixes - the badge on the cabinet does not change the model number."] },
  { re: /^RP(?:AC|GE|HP|CE)1[35]/, brand: "Allied Air", equipment: "Other", series: "Armstrong Air / AirEase / Ducane / Concord RPGE13 / RPGE15 gas-electric, RPHP13 / RPHP15 heat pump, RPAC13 straight-cool and RPCE13 packaged unit (pre-PRP generation)", notes: ["Earlier residential packaged line that preceded the PRP prefix; the same four badges list it.","No dedicated code table was sourced for this generation - if the gas section uses the same direct spark ignition control, the packaged LED table applies, but confirm the board part number first.","Read the trailing digits the same way as the PRP units: SEER family, tonnage, then heating input for the gas-electric models."] },
  { re: /^4PGE1[35]/, brand: "Allied Air", equipment: "Other", series: "Armstrong Air / AirEase / Ducane / Concord 4PGE13 / 4PGE15 packaged gas-electric unit", notes: ["Listed in Allied's official packaged-unit catalog alongside the RP and PRP families; no separate installation manual was sourced this pass, so no code table is claimed for it here.","Do not confuse the leading 4 (refrigerant/product digit) with the 4SCU / 4SHP split-system families."] },
  { re: /^R?BC[ES][2-7]/, brand: "Allied Air", equipment: "Air Handler", series: "Armstrong Air / AirEase / Ducane / Concord BCE3 / BCE4 / BCE5 / BCE7 blower coil and BCS2 / RBCS2 air handler (R-410A)", notes: ["Read BCE5C18MA1P-50 as BC (blower coil) E (enhanced feature set) 5 (5 series, one-piece platform, OmniGuard) C (PSC motor; E constant torque, V variable speed) 18 (1.5 ton) M (multi-position) A (208/230V-1ph-60Hz) 1P (piston metering; 4X = R-410A TXV) then revision 50 = OmniGuard coil.","TRAP: the motor/control letter is the FOURTH character - BCE5C, BCE5E and BCE5V are three different motors. Do not stop reading at BCE5.","No diagnostic LED or status-code board on these air handlers. No airflow is a blower relay, transformer, limit or motor problem, not a code.","The newer R-454B replacement for this line is the 7AH family."] },
  { re: /^EFV[0-9]/, brand: "Allied Air", equipment: "Air Handler", series: "Armstrong Air / AirEase / Ducane / Concord EFV air handler", notes: ["Listed in Allied Air's official air-handler catalog on armstrongair.com, ducanehvac.com and concord-air.com. No installation or product-specification document was sourced this pass, so no nomenclature decode and no code table is claimed for it here - treat the model number positions as unknown until you have the unit's own literature.","Like the rest of the Allied air-handler line it has no diagnostic LED; a no-airflow call is a blower relay, transformer, limit or motor problem."] },
  { re: /^A(?:801|802|931|961|972)EK?/, brand: "Allied Air", equipment: "Gas Furnace", series: "Armstrong Air / AirEase A801E / A802E / A931E / A961E / A972E (and A801EK / A802EK / A931EK / A961EK / A972EK) gas furnace - non-communicating integrated control", notes: ["Faults show as Ennn on a 7-SEGMENT display on the integrated control - see Error Codes under the Allied Air non-communicating integrated control family. Range is E110 through E290 only; if you are reading E1xx communication codes or E3xx/E4xx codes you are at the ComfortSync board instead.","Rating-plate form: A80UH2E110C20 = A (flagship) 80 (AFUE) UH (upflow/horizontal; DF downflow) 2 (control generation) E (constant torque) then heating input x1000, cabinet width letter and add-on cooling tons.","'A801E' / 'A802E' / 'A931E' / 'A961E' / 'A972E' (and the -K variants) are the catalog names for the same furnaces; the number stamped on the rating plate uses the UH / DF form.","The A96DFMV installation manual (Issue 1034) prints the SAME numeric codes as this board WITHOUT the leading E - a display-convention change across control revisions, not a different fault set."] },
  { re: /^A(?:80|93|96)(?:UH|DF)[0-9]/, brand: "Allied Air", equipment: "Gas Furnace", series: "Armstrong Air / AirEase A80UH2E / A93UH.E / A96UH.E gas furnace (rating-plate form of A801E / A802E / A931E / A961E) - non-communicating integrated control", notes: ["Faults show as Ennn on a 7-SEGMENT display on the integrated control - see Error Codes under the Allied Air non-communicating integrated control family. Range is E110 through E290 only; if you are reading E1xx communication codes or E3xx/E4xx codes you are at the ComfortSync board instead.","Rating-plate form: A80UH2E110C20 = A (flagship) 80 (AFUE) UH (upflow/horizontal; DF downflow) 2 (control generation) E (constant torque) then heating input x1000, cabinet width letter and add-on cooling tons.","'A801E' / 'A802E' / 'A931E' / 'A961E' / 'A972E' (and the -K variants) are the catalog names for the same furnaces; the number stamped on the rating plate uses the UH / DF form.","The A96DFMV installation manual (Issue 1034) prints the SAME numeric codes as this board WITHOUT the leading E - a display-convention change across control revisions, not a different fault set."] },
  { re: /^(?:80|92|96|97)G[12](?:UH|E)/, brand: "Allied Air", equipment: "Gas Furnace", series: "Ducane / Concord 80G1E / 80G2UHE / 92G1E / 96G1E / 97G2E gas furnace - the Armstrong A80x/A93x/A96x/A97x twin, non-communicating integrated control", notes: ["Faults show as Ennn on a 7-SEGMENT display on the integrated control - see Error Codes under the Allied Air non-communicating integrated control family. Range is E110 through E290 only; if you are reading E1xx communication codes or E3xx/E4xx codes you are at the ComfortSync board instead.","Rating-plate form: A80UH2E110C20 = A (flagship) 80 (AFUE) UH (upflow/horizontal; DF downflow) 2 (control generation) E (constant torque) then heating input x1000, cabinet width letter and add-on cooling tons.","'A801E' / 'A802E' / 'A931E' / 'A961E' / 'A972E' (and the -K variants) are the catalog names for the same furnaces; the number stamped on the rating plate uses the UH / DF form.","The A96DFMV installation manual (Issue 1034) prints the SAME numeric codes as this board WITHOUT the leading E - a display-convention change across control revisions, not a different fault set.","The Ducane/Concord rating plate reads 80G2UH110CE20 - the AFUE and generation digits come first, then UH/DF, then input, width, E and cooling tons.","The service manual 508187-01 covers A80UH2E and 80G2UHE side by side, which is the official statement that the two are the same furnace."] },
  { re: /^A96(?:UH|DF)MV/, brand: "Allied Air", equipment: "Gas Furnace", series: "Armstrong Air / AirEase A96UHMV / A96DFMV 96% variable-speed gas furnace - integrated control, numeric codes printed WITHOUT the E prefix", notes: ["Same fault set as the non-communicating integrated control family, but this manual revision prints the numbers bare (110, 111, 200 ...) instead of E110 / E111 / E200. Match on the number, ignore the missing E.","DF in the model number is the downflow cabinet, UH is upflow/horizontal.","This is NOT the ComfortSync board - it has no E1xx communication codes, no E31x airflow-cutback codes and no E4xx compressor LSOM codes."] },
  { re: /^A9[78](?:US|DS)[0-9M]V/, brand: "Allied Air", equipment: "Gas Furnace", series: "Armstrong Air / AirEase A97USMV / A97US2V / A97DSMV / A97DS2V (A97US2VX) 97% two-stage variable-speed gas furnace - ComfortSync integrated control", notes: ["Faults show as Ennn on the 7-segment display of the ComfortSync-enabled integrated control - see Error Codes under the Allied Air ComfortSync variable-speed family. This board adds communication codes (E120-E131, E180), airflow-cutback codes (E310-E313), zoning/relay codes (E344-E370) and compressor LSOM codes (E400-E409) that the simpler non-communicating board does not have.","Rating-plate form: A97US2V080C20X = A (flagship) 97 (AFUE) US (upflow; DS downflow) 2 (two stage) V (variable speed) then heating input x1000, cabinet width letter, add-on cooling tons and X (the service-manual family suffix).","If the display shows only E110-E290 codes you are probably at the simpler non-communicating board - check which control is in the cabinet before you work a code list."] },
  { re: /^A9[78]MVK?/, brand: "Allied Air", equipment: "Gas Furnace", series: "Armstrong Air / AirEase A97MV / A98MV (A98MVK) variable-speed gas furnace - ComfortSync integrated control", notes: ["Faults show as Ennn on the 7-segment display of the ComfortSync-enabled integrated control - see Error Codes under the Allied Air ComfortSync variable-speed family. This board adds communication codes (E120-E131, E180), airflow-cutback codes (E310-E313), zoning/relay codes (E344-E370) and compressor LSOM codes (E400-E409) that the simpler non-communicating board does not have.","Rating-plate form: A97US2V080C20X = A (flagship) 97 (AFUE) US (upflow; DS downflow) 2 (two stage) V (variable speed) then heating input x1000, cabinet width letter, add-on cooling tons and X (the service-manual family suffix).","If the display shows only E110-E290 codes you are probably at the simpler non-communicating board - check which control is in the cabinet before you work a code list."] },
  { re: /^A(?:802|972)VK?/, brand: "Allied Air", equipment: "Gas Furnace", series: "Armstrong Air / AirEase A802V / A972V (A802VK / A972VK) two-stage variable-speed gas furnace - ComfortSync integrated control", notes: ["Faults show as Ennn on the 7-segment display of the ComfortSync-enabled integrated control - see Error Codes under the Allied Air ComfortSync variable-speed family. This board adds communication codes (E120-E131, E180), airflow-cutback codes (E310-E313), zoning/relay codes (E344-E370) and compressor LSOM codes (E400-E409) that the simpler non-communicating board does not have.","Rating-plate form: A97US2V080C20X = A (flagship) 97 (AFUE) US (upflow; DS downflow) 2 (two stage) V (variable speed) then heating input x1000, cabinet width letter, add-on cooling tons and X (the service-manual family suffix).","If the display shows only E110-E290 codes you are probably at the simpler non-communicating board - check which control is in the cabinet before you work a code list."] },
  { re: /^(?:80|96|97)G2V/, brand: "Allied Air", equipment: "Gas Furnace", series: "Ducane / Concord 80G2V / 96G2V / 97G2V (80G2VK / 97G2VK) two-stage variable-speed gas furnace - the Armstrong A802V / A972V twin, ComfortSync integrated control", notes: ["Faults show as Ennn on the 7-segment display of the ComfortSync-enabled integrated control - see Error Codes under the Allied Air ComfortSync variable-speed family. This board adds communication codes (E120-E131, E180), airflow-cutback codes (E310-E313), zoning/relay codes (E344-E370) and compressor LSOM codes (E400-E409) that the simpler non-communicating board does not have.","Rating-plate form: A97US2V080C20X = A (flagship) 97 (AFUE) US (upflow; DS downflow) 2 (two stage) V (variable speed) then heating input x1000, cabinet width letter, add-on cooling tons and X (the service-manual family suffix).","If the display shows only E110-E290 codes you are probably at the simpler non-communicating board - check which control is in the cabinet before you work a code list.","Ducane and Concord list 80G2VK and 97G2VK on their current gas-furnace pages; the K is the catalog suffix, the control is the same."] },
  { re: /^A95(?:UH|DF)[0-9]D/, brand: "Allied Air", equipment: "Gas Furnace", series: "Armstrong Air / AirEase A95UH / A95DF 95% gas furnace (catalog names A951A / A951S / A952V) - legacy integrated control, red LED flash codes", notes: ["Diagnostics on this generation are a RED LED FLASH COUNT, not a 7-segment display - 1 through 9 flashes plus LED off and LED on. See Error Codes under the Allied Air legacy red-LED family. Do not read the Ennn tables onto it.","The control stores the last FIVE fault codes. Press and release the push button to flash them, newest first; hold it more than 5 seconds to clear the history.","Variable-speed members add a GREEN high-heat-state LED and an AMBER CFM LED (one amber flash = 100 CFM).","9 flashes means reversed line polarity - the wiring diagram warns the control WILL lock out on reversed polarity.","Rating-plate form: A95UH1D110C16S = A (flagship) 95 (AFUE) UH (upflow/horizontal; DF downflow) 1 (single stage) D (direct drive) 110 (heating input x1000) C (21.0 in. cabinet width; B 17.5, D 24.5) 16 (4 ton add-on cooling; 12 = 3 ton, 20 = 5 ton) S (stainless heat exchanger; A aluminized) then a numeric revision code.","The catalog names A951A / A951S / A951E / A952V / A962V / A931A are NOT what is stamped on the rating plate."] },
  { re: /^95G[12]UH/, brand: "Allied Air", equipment: "Gas Furnace", series: "Ducane / Concord 95G1UH / 95G2UH (95G2UHV variable speed) 95% gas furnace - the Armstrong A951/A952V twin, legacy integrated control with red LED flash codes", notes: ["Diagnostics on this generation are a RED LED FLASH COUNT, not a 7-segment display - 1 through 9 flashes plus LED off and LED on. See Error Codes under the Allied Air legacy red-LED family. Do not read the Ennn tables onto it.","The control stores the last FIVE fault codes. Press and release the push button to flash them, newest first; hold it more than 5 seconds to clear the history.","Variable-speed members add a GREEN high-heat-state LED and an AMBER CFM LED (one amber flash = 100 CFM).","9 flashes means reversed line polarity - the wiring diagram warns the control WILL lock out on reversed polarity.","Rating-plate form: A95UH1D110C16S = A (flagship) 95 (AFUE) UH (upflow/horizontal; DF downflow) 1 (single stage) D (direct drive) 110 (heating input x1000) C (21.0 in. cabinet width; B 17.5, D 24.5) 16 (4 ton add-on cooling; 12 = 3 ton, 20 = 5 ton) S (stainless heat exchanger; A aluminized) then a numeric revision code.","The catalog names A951A / A951S / A951E / A952V / A962V / A931A are NOT what is stamped on the rating plate.","The A952V and 95G2V share one installation manual (507266-05), which is the official statement that they are the same furnace.","On 95G2UHV models the amber CFM LED and the green high-heat LED are both present; the plain 95G2UH has the red LED only."] },
  // --- end coverage:allied ---
  // --- coverage:icp (v123) ---
  { re: /^[FG]9MXT/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite F9MXT / G9MXT 96% two-stage ECM condensing gas furnace, 35 in. tall", notes: ["Codes are flash counts on the status LED at the furnace control - see Error Codes under 'ICP ... (F/G)9MXT'. Short flashes then long flashes: 6 short + 1 long is code 6+1.","Recall the last stored code without a thermostat call: with 115V on, briefly (2-3 sec) disconnect and reconnect one main limit wire; the LED flashes the last stored code, then the control runs its component test.","Component self-test: jumper C to TEST/TWIN for about 2 seconds until the LED goes off - inducer, 15-second igniter, LO-HT / HI-HT / COOL blower speeds, then a low-speed inducer purge.","Code 9 (high-heat pressure switch) exists only on this two-stage board - the single-stage N9MSB board has no code 9.","F and G are alternate brand letters for the identical furnace; the manual cover prints (F/G)9MXT.","Read F9MXT0601216A as 9M (90%+ multipoise) XT (two-stage ECM) 060 (kBtuh input) 12 (cabinet) 16 (cooling airflow) A (series)."] },
  { re: /^[NR]9MS[BE]/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest N9MSB / N9MSE single-stage PSC condensing gas furnace, 35 in. tall", notes: ["Same flash-code medium as (F/G)9MXT but a shorter table - see Error Codes under 'ICP ... N9MSB / N9MSE'. There is NO code 9 on this single-stage board.","B-series and C-series board revisions print the identical code table (440 04 4412 01 and 440 04 4413 02).","Recall the last stored code by briefly disconnecting and reconnecting one main limit wire with 115V on and no thermostat call.","Component self-test: jumper C to TEST/TWIN for about 2 seconds.","Flame sense on every ICP furnace board: 4.0 to 6.0 microamps DC nominal, below 0.5 microamps DC is a fault."] },
  { re: /^N(80|92|95)[EMV]S[LNU]/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest N80ESN / N80ESL / N80VSL / N80MSN / N92ESN / N92MSN / N95ESN / N95MSU Performance-tier gas furnace", notes: ["80 / 92 / 95 is the AFUE. The two-letter suffix (ES, VS, MS) is not decoded by any official ICP document that was sourced - do not read it as the master nomenclature's single-letter motor/stage positions.","Look at the control before counting flashes: the older boards in this line use the N9MSB single-stage flash table, the newer ECM boards use a 3-digit fault display. Confirm which one is in the unit.","N80ESN / N80ESL are non-condensing 80% furnaces; the rest of the family is condensing."] },
  { re: /^N96[MV]S[NL]/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest N96MSN / N96VSN 96% ECM condensing gas furnace with 3-digit fault display", notes: ["This board shows faults on a 3-DIGIT DISPLAY, not the amber flash LED. There is NO code list in the app for it - no official ICP code table was published for this display.","Do NOT apply the N9MSB or (F/G)9MXT flash-code table to this furnace - it is a different control.","Product Data confirms an 18-speed constant-torque ECM blower and the 3-digit display; the install/service manual with the code list was not on shareddocs.com."] },
  { re: /^[FG]9MVE/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest F9MVE / G9MVE 96% two-stage variable-speed ECM condensing gas furnace", notes: ["Codes are on the amber status LED - see Error Codes under 'ICP ... (F/G)9MVE / F96VTN / G96VTN'.","Status code recall: disconnect the R thermostat lead, reset power, set SW1-1 ON. Up to 7 stored codes flash in order; the 8th flash is the heartbeat. Codes self-erase after 72 hours.","Component test: disconnect R, reset power, set SW1-6 ON - inducer at high-heat speed, igniter 15 s, blower 15 s, then inducer to low-heat speed 10 s.","Service replacement control must be the NON-modulating board with software V17 or later, and model plug PL4 must be moved over and power cycled or you get code 2+5.","The WWYY number printed on the control board is the BOARD date code - it is not the unit serial number (the unit serial runs YY then WW)."] },
  { re: /^[FG]96VTN/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest F96VTN / G96VTN 96% two-stage variable-speed condensing gas furnace (9MVE successor)", notes: ["Same board and same code table as (F/G)9MVE - use the Error Codes family 'ICP ... (F/G)9MVE / F96VTN / G96VTN'.","TRAP inside 440 01 4800 02: the Check Pressure Switch text says the light 'flashes a status code 32' and the recall text calls the 8th code 'Code 11'. That is leftover two-digit Carrier wording. Read 32 as code 3 and 11 as the heartbeat - the short-plus-long flash table is authoritative.","Read 96 = AFUE, V = variable speed, T = two-stage, N = series letter."] },
  { re: /^[FGNR]9MAC/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest F9MAC / G9MAC / N9MAC / R9MAC variable-speed modulating four-way multipoise condensing gas furnace", notes: ["DIFFERENT board from the two-stage furnaces - see Error Codes under 'ICP ... *9MAC / F97CMN modulating'. It adds 1+5, 3+5, 4+1, 4+2 and 4+3, and its code 9 covers the medium pressure switch as well as the high.","2+5 means the opposite thing here: this board needs a MODULATING service replacement control (software V17 or later). On the two-stage board 2+5 wants a non-modulating one.","A true RMS meter is REQUIRED for 115 VAC voltage, current and power measurements on a modulating furnace.","Manifold pressure is set at TWO points (minimum heat and maximum heat) with a rotary adjustment switch - one click per second, faster than that and the pressure will not change.","SW1-3 ON boosts inducer speed for windy installations that nuisance-trip the pressure switches.","Only the wildcard *9MAC is printed on the official guide; F9MAC / G9MAE / N9MP were never confirmed individually on an ICP document."] },
  { re: /^[FG](97CMN|96CTN|80CTL)/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest F97CMN / G97CMN modulating, F96CTN / G96CTN two-stage and F80CTL / G80CTL 80% Ion communicating gas furnace", notes: ["F97CMN/G97CMN prints exactly the modulating code table - use Error Codes 'ICP ... *9MAC / F97CMN modulating'. Numeric codes are on the furnace control's amber LED, not on the wall control.","The Ion System Control / Observer wall control shows equipment faults only as named events (Last 10 System Events, tagged FN for furnace) - go to the board for the number.","97 / 96 / 80 = AFUE, C = communicating, M = modulating, T = two-stage.","No dedicated F80CTL / G80CTL manual was found on shareddocs.com - treat its code list as the modulating table until a manual is sourced."] },
  { re: /^[FG]80VTL/, brand: "ICP", equipment: "Gas Furnace", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest F80VTL / G80VTL 80% two-stage variable-speed gas furnace (non-communicating)", notes: ["Named only in the Performance Series brochure - no ICP service or installation manual was sourced, so no code table is claimed for it here.","Do not confuse F80VTL (non-communicating, VTL) with F80CTL (Ion communicating, CTL)."] },
  { re: /^[NRS]4[AH][3-9][ST]?[0-9]{2}/, brand: "ICP", equipment: "Condenser/Heat Pump", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite N4A / N4H Performance Series R-410A split air conditioner and heat pump", notes: ["No diagnostic LED and no code board on this tier - the outdoor unit is contactor, capacitor and protection switches only. Nothing flashes a code.","Read N4A4S18AKANA as N (Performance tier) 4 (R-410A) A (air conditioner; H = heat pump) 4 (14 SEER) S (single stage; T = two-stage) 18 (1.5 ton) A (standard grille) K (208/230-1-60) then sales and engineering digits.","Capacity: 18/19 = 1.5 t, 24/25 = 2 t, 30/31 = 2.5 t, 36/37 = 3 t, 42/43 = 3.5 t, 48/49 = 4 t, 60/61 = 5 t.","The same model number is sold under every ICP nameplate - the badge on the cabinet does not change the model, so parts cross the badges.","N4A7 and N4H6 are the two-stage members; the rest of the family is single-stage.","Charge by subcooling using the R-410A chart in the N4H4 Technical Support Manual against the rating-plate target."] },
  { re: /^NX[AH][4-6][0-9]{2}/, brand: "ICP", equipment: "Condenser/Heat Pump", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite NXA4 / NXA6 / NXH5 / NXH6 Performance Series R-410A split air conditioner and heat pump", notes: ["Same non-communicating platform as N4A/N4H - no diagnostic LED, no code table.","X in position 2 is the R-410A marker on this sub-series; position 3 is A (AC) or H (heat pump) and position 4 is the SEER digit."] },
  { re: /^NH4[AH]4[0-9]{2}/, brand: "ICP", equipment: "Condenser/Heat Pump", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite NH4A4 / NH4H4 ducted horizontal-discharge R-410A air conditioner and heat pump", notes: ["Horizontal (ducted) cabinet version of the N4A4/N4H4 - same nomenclature positions, plus 3-phase voltage codes H (208/230-3-60) and L (460-3-60).","No diagnostic LED on this tier.","Do not read NH as a heat-pump marker - the type letter is position 4 (A or H), for example NH4A424AKA100 is an air conditioner."] },
  { re: /^[NRQ]5[AH][0-9][STV][0-9]{2}/, brand: "ICP", equipment: "Condenser/Heat Pump", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite N5A / N5H / R5A / R5H / Q5H Performance Series R-454B split air conditioner and heat pump", notes: ["R-454B (A2L). Non-sparking tools, and a nitrogen pressure test must NOT lose pressure for a full hour on a gauge with resolution within 5% of the holding charge.","Charge by subcooling on TXV systems; factory charge covers 15 ft of lineset, then add or remove 0.6 oz per foot of 3/8 in. liquid line. Allow 15 minutes to stabilize after an adjustment.","Read N5A4S18AKANA as N (Performance tier) 5 (R-454B) A (AC; H = heat pump) 4 (SEER2 digit) S (single stage; T two-stage, V variable) 18 (1.5 ton) A K A N plus the series letter.","TRAP: position 1 is re-skinned per brand. N5A4S Product Data prints 'N = Heil' and N5H5S Product Data prints 'N = Tempstar' - the same letter. Read position 1 as the product tier, never as the brand.","No fault-code table exists in the app for this generation - no ICP service manual for the R-454B boards was published."] },
  { re: /^[CHT]5[AH][0-9][STV][0-9]{2}/, brand: "ICP", equipment: "Condenser/Heat Pump", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite C5 / H5 / T5 Ion communicating R-454B split air conditioner and heat pump", notes: ["Ion communicating tier: C, H and T in position 1 are interchangeable brand letters for the same physical unit (C5A8T, H5A8T and T5A8T are one product).","Faults are reported through the Ion System Control - it shows named events, not numbers. The R-454B inverter boards have no published code table, so do NOT reuse the R-410A CVA9 fault list here.","The 2025 warranty certificate lists C5A1V, C5A8T, C5A6S, C5H0V, C5H3V, C5H6S, C5H8T and their H5*/T5* twins. Any B5* prefix is unconfirmed - it does not appear on any official ICP document.","R-454B (A2L): non-sparking tools, and the nitrogen holding-charge test must hold for 1 hour."] },
  { re: /^[CHT]V[AH][5-9]/, brand: "ICP", equipment: "Condenser/Heat Pump", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite (C,H,T)VA9 and (C,H,T)VH8 Ion variable-speed R-410A split air conditioner and heat pump", notes: ["Codes are flash counts on the AMBER STATUS LED of the outdoor AOC board - see Error Codes under 'ICP ... Ion (C,H,T)VA9 / (C,H,T)VH8'. The wall control never shows the number.","The green COMM LED on the same board is a communication indicator, not a fault: OFF until a valid command is received, then ON; it stays OFF on a non-communicating thermostat.","Codes escalate - 31 to 84, 32 to 83, 33 to 48, 49 to 95, 59 to 74, 61 to 76, 62 to 85, 63 to 86, 72 to 82, 79 to 88, 91 to 97, 92 to 96, 98 to 99. Work the base code's cause list when you see the lockout.","VA9 = variable-speed AC, VH8 = variable-speed heat pump. C, H and T are interchangeable first letters for the same unit.","Charge by subcooling in forced high stage; favorable window is 65-100 F outdoor and 70-80 F indoor, 25 minutes to stabilize. Inaccurate charge causes nuisance fault codes."] },
  { re: /^[CHT][CS][AH][5-9](?![BMQ])/, brand: "ICP", equipment: "Condenser/Heat Pump", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite CCA7 / CSA6 / CSA5 Ion System R-410A air conditioner (two-stage and single-stage tiers)", notes: ["CCA7 is the two-stage 17 SEER unit, CSA6 is single-stage 16 SEER, CSA5 is single-stage 15 SEER; CVA9 (variable speed) is caught by its own rule.","No service manual with a code table was sourced for these three tiers - only the variable-speed (C,H,T)VA9/VH8 manual has the Table 6 fault list. Do not assume it carries over.","Position 2 is the compressor/communication tier letter (V variable, C two-stage communicating, S single-stage communicating), position 3 is A or H, position 4 is the SEER digit."] },
  { re: /^[CHT]4[AH][5-9][ST]/, brand: "ICP", equipment: "Condenser/Heat Pump", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite C4A7T / C4A6S / C4H7T / C4H5S Ion-tier R-410A split air conditioner and heat pump (with H4* and T4* twins)", notes: ["The warranty certificate groups C4A7T with H4A7T and T4A7T - the same unit under three brand letters. Position 1 is the brand skin, not a product difference.","4 = R-410A, A or H = AC or heat pump, then the SEER digit, then T (two-stage) or S (single-stage).","No fault-code table was published for this tier - only the variable-speed (C,H,T)VA9/VH8 service manual has one."] },
  { re: /^F[ESVXM][MUA]4X/, brand: "ICP", equipment: "Air Handler", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite FEM4X / FVM4X / FXM4X / FSM4X / FSA4X / FMU4X / FSU4X R-410A fan coil", notes: ["No diagnostic LED and no status-code board on these fan coils - they are switched by the outdoor unit or the thermostat. A no-airflow call is a blower relay, transformer, limit or motor problem, not a code.","Read FVM4X2400A as F (fan coil) V (motor type: S standard PSC, E high-efficiency ECM, C communicating, X ECM, V variable speed) M (multiposition; U = upflow) 4 (R-410A) X (TXV; P = piston) 2400 (2 ton) then the sales/feature code.","Electric heat kits use their own EHK nomenclature - EHK05AKN1 is a 5 kW, 208/230-1ph kit."] },
  { re: /^P[AHDG][DJRSX][3-9][0-9]{2}/, brand: "ICP", equipment: "Other", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite PGD4 / PGS4 / PGX4 / PHD4 / PHR4 / PHR5 / PAR4 / PAJ4 small package unit (gas-electric, heat pump, AC)", notes: ["No status-code table was published for these packaged units - diagnosis is the high-pressure switch, Time Guard II anti-short-cycle timer, and the furnace section's own controls.","Read PGD424000K002G1 as P (package) G (gas/electric; A = AC, H = heat pump, D = dual fuel) D (tier: D standard, J dedicated horizontal, S stainless HX mainline) 4 (SEER digit) 24 (2 ton) 000 (heat input kBtuh) K (208/230-1-60) 00 (options) then feature, sales and engineering digits.","Motormaster II low-ambient kit is a field accessory required for cooling below 40 F outdoor.","Natural gas manifold pressure on the gas-electric models is 3.2 to 3.8 in. w.c.","Only PGD4 and PGS4 were confirmed against their own Product Data nomenclature page; PGX4, PHR4, PHR5, PAR4 and PAJ4 follow the same table but were not individually confirmed."] },
  { re: /^(SYST0101CW|TSTAT0101SC|SYSTXCCITC|TSTAT0713)/, brand: "ICP", equipment: "Other", series: "Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest Ion System Control (SYST0101CW) and Observer communicating wall control (TSTAT0101SC)", notes: ["There is NO numeric fault-code table for these wall controls. Equipment faults appear as named events only - do not go looking for a number here.","Observer: Service Menus > Last 10 System Faults. Each entry carries an equipment tag - HP heat pump, AC air conditioner, FN furnace, FC fan coil. Set the date in the DATE menu BEFORE logging the history.","Ion System Control: Service Menu > Service Information > Last 10 System Events, Run/Fault History (resettable fault counters, cycle counters, run times) and Model/Serial Numbers - the model/serial list is lost when a board is replaced.","Ion System Control only: View Diagnostics gives the top 3 most likely root causes for the most recent fault, on compatible equipment.","For the number, read the amber STATUS LED on the equipment board itself.","4-wire communicating bus (A, B, C, D). To chase a comm fault, strip the bus down to the indoor unit, prove that link, then add one device at a time.","(F,G)8MV and (F,G)9MV two-stage communicating furnaces do not fully support the Furnace Status screen and do not support Zoning Status."] },
  // --- end coverage:icp ---
  // --- Nortek Global HVAC (Frigidaire / Maytag / Gibson / Westinghouse / Tappan / Kelvinator / Intertherm / Miller / Nordyne) ---
  // Kept at the top on purpose: FT5/MSA-style Nortek prefixes would otherwise be swallowed by Carrier/Lennox rules below.
  { re: /^(FT4B[GI]|FS4B[GI]|FSH1BG|PSH1BG|PSH4B[GI]|FSA1BG|PSA1BG|PSA4B[GI])/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Frigidaire / Maytag / Tappan / Westinghouse / Broan / NuTone / Philco / Nordyne / Intertherm) iQ Drive inverter split system, 19-25.5 SEER - FT4BG/FT4BI (HP) and FS4BG/FS4BI (AC), badge variants FSH1BG/PSH1BG/PSH4BG/PSH4BI/FSA1BG/PSA1BG/PSA4BG/PSA4BI", notes: ["There is NO numbered flash-code table on iQ Drive - see Error Codes under 'Nortek ... iQ Drive inverter split system'","Diagnosis is the touchscreen controller's FAULT STATUS / FAULT HISTORY screens plus per-board LEDs on five boards","Trap: after power is removed the inverter red LED keeps blinking about a minute - wait 60 seconds before touching inverter parts","G suffix = 17-19.9 SEER design series, I suffix = 20-25 SEER design series"] },
  { re: /^[CDEFJMP]S?[HT]4BF/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Frigidaire / Maytag / Tappan / Westinghouse / Broan / NuTone / Nordyne) FT4BF / DT4BF / ET4BF / JT4BF / CSH4BF / MSH4BF / PSH4BF 16 SEER two-stage R-410A split heat pump - Emerson CoreSense 10-code module", notes: ["Codes are in Error Codes under 'Nortek ... CoreSense module 10-code'","Trap: there are TWO LEDs in the outdoor box - the CoreSense module and the defrost control board, each with its own table","Trap: earlier revisions of this same platform shipped with a Comfort Alert module instead (wiring diagrams 710964A / 710965A) - look at the module before counting flashes","Nomenclature: FT 4 B F - 048 K A = heat pump, R-410A, braze 15-17 SEER series, 48,000 BTU/h, 208/230-1-60, revision A","Adaptive demand defrost: sacrificial defrost after 34 min accumulated run time in heat below 35 F coil, default 70 F termination"] },
  { re: /^[BCEFGHJMPVW]SH[1-4][BMQ][DEFI]5?/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Maytag / Frigidaire / Gibson / Westinghouse / Broan / Nordyne) *SH-prefix split heat pump (CSH/MSH/PSH/FSH/BSH/GSH/HSH/VSH/WSH/ESH 1BE-4BF), 13-16 SEER R-410A", notes: ["Codes are in Error Codes: CoreSense 6-code (13-15 SEER) or CoreSense 10-code (15-16 SEER) plus the defrost board 2-character display","Trap: the CoreSense normal state is SOLID YELLOW on the 13-15 SEER table and SOLID GREEN on the 15-16 SEER table","The CoreSense module is 'select models' on this platform - confirm it is physically present","No Maytag-badge (CSH/MSH/PSH) doc in the archive prints a model nomenclature chart; the M=Maytag brand letter IS confirmed on MSH4BE/MSH4BF QRDs"] },
  { re: /^[CDEFJMNPTVW]T[3-7][BQ][DEFNPQU]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Frigidaire / Gibson / Kelvinator / Tappan / Westinghouse / Broan / NuTone / Nordyne / Intertherm / Miller) *T-prefix split heat pump (FT/DT/ET/JT/NT/MT/T 4B_-6B_ and the older 5-series flat-top), 13-16 SEER", notes: ["Codes are in Error Codes: CoreSense 6-code, Comfort Alert, or the defrost board 2-character display depending on the era","The 5-series (DT5BD/FT5BD/JT5BD/T5(B,Q)D) is the 13 SEER flat-top platform with the Comfort Alert module","FT5BU / JT5BU are the manufactured-housing variants"] },
  { re: /^[BCEFGHJMPRSVW]SA[1-6][BMQ][DEFGI]5?/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (all badges) *SA-series split system - SA = split AC on this platform, 13-16 SEER R-410A (BSA2 / CSA1 / CSA4 / ESA1 / FSA1 / GSA2 / GSA3 / HSA1 / HSA4 / MSA4 / MSA6 / PSA1 / PSA2 / PSA4 / RSA3 / VSA1 / VSA4 / WSA2 / WSA3 / WSA4)", notes: ["Codes are in Error Codes: Comfort Alert (13 SEER, D suffix) or CoreSense 10-code (14-16 SEER, E/F suffix)","The newest R-32 SEER2 platform (*SA3B*/*SA3M*/*SA3Q*/RSA3*) and the R-454B '5'-suffix platform (*SA4B*5, HSA4M*5) have NO diagnostics module at all - stop looking for an LED","Nomenclature (Product Identifier sheet): [badge] SA [stage 1/2/V] [fitting B=braze Q=quick-connect] [efficiency D=13 E=14 F=15-16 G=17-20] [4=R-410A] [coil C/M] [compressor E/R/S] [metering E/N/P/X] [2-digit MBTU] [K=208/230-1-60]","Trap: quick-connect (Q) variants such as GSA2QD / GSA2QE are cost-reduced and do NOT carry the module even though their brazed siblings do"] },
  { re: /^[CDEFGHJMNPRVW]S[3-6][BQ][ADEFGX]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (all badges) older *S4B* / *S5B* / *S6B* split system air conditioner (DS/ES/FS/JS/MS/NS/RS/WS/CS 4B_-6B_), 13-16 SEER R-410A", notes: ["Codes are in Error Codes: Comfort Alert (D suffix) or CoreSense 10-code (E/F suffix)","No per-character nomenclature legend was found for this older 4-character naming scheme in any Nortek doc - the fitting letter (B braze / Q quick-connect) and efficiency letter (D/E/F/G) are readable from the family name but are not a sourced decode","Several of these families' own manuals say the diagnostics module is on 'Select Models' only"] },
  { re: /^SA[1-6][BQ][DEF]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Nordyne unbranded) SA2BD / SA4BD / SA4BE split system air conditioner", notes: ["Codes are in Error Codes: Comfort Alert (SA2BD/SA4BD) or CoreSense 10-code (SA4BE)"] },
  { re: /^S[345][BQ][DNPX]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Nordyne unbranded) S3BN / S4BD / S5QD / S5BP / S5BXM light-commercial and 3-phase split air conditioner, 7.5-10 ton on S5BP", notes: ["No diagnostics module is documented for these families - they are contactor-and-pressure-switch units","S5BP is a 7.5-10 ton 3-phase unit; treat it as light commercial"] },
  { re: /^T[356][BPQ][DNPQ]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Nordyne unbranded / Intertherm / Miller) T3BN / T5BP / T6BQ / T5(B,Q)D split heat pump", notes: ["T5(B,Q)D carries the Comfort Alert module - see Error Codes","T3BN / T5BP / T6BQ were not deep-read by the gatherer; no diagnostics content was found in their docs"] },
  { re: /^B6[45]?[BEV][MWXV]/, brand: "Nortek", equipment: "Air Handler", series: "Nortek (all badges) B6 / B64 / B65 multi-poise air handler - motor letter B=PSC, E=fixed-speed ECM (FSHE), V=variable-speed ECM (VSHE)", notes: ["Codes are in Error Codes: AN2 red LED first, then the FSHE 7-segment display (motor E) or the VSHE green/red pair (motor V)","Motor letter is the 3rd character: B=PSC (no motor board display at all), E=FSHE, V=VSHE","Metering device suffix: X=TXV, 0=piston, I/AI=EXV","Cabinet letter at the end: A=14.25 in, B=19.75 in, C=22.5 in","Trap: the FSHE 7-segment display can read upside down depending on install orientation"] },
  { re: /^B[2-5][BSV][MVW]/, brand: "Nortek", equipment: "Air Handler", series: "Nortek (all badges) B2 / B3 / B4 / B5 air handler (B2BV, B3BM, B3BV, B3SM, B3VM, B4SM, B4VM-E, B4VM-X, B5BM, B5BV, B5SM, B5VM)", notes: ["Codes are in Error Codes: AN2 red LED, plus VSHE green/red on the V-motor models","B4VM-E and PAH4VM-E use an ELECTRONIC expansion valve and pair with iQ Drive outdoor units - their EXV troubleshooting lives in Nordyne addendum 7088380, which is NOT in this archive","Motor letter: S=single speed, B=PSC multi-speed, V=variable-speed ECM"] },
  { re: /^GB[45][BV][MW]/, brand: "Nortek", equipment: "Air Handler", series: "Nortek (all badges) GB4 / GB5 air handler (GB4VM-X, GB5BM, GB5BMMO, GB5BW, GB5VM)", notes: ["Codes are in Error Codes: AN2 red LED, plus VSHE green/red on the V-motor models","Same platform and same control boards as the B5/B6 air handlers"] },
  { re: /^MB[5-7]5?[BEV]?M?/, brand: "Nortek", equipment: "Air Handler", series: "Nortek (all badges) MB5 / MB6 / MB7 / MB75 modular air handler (MB6(B,E,V)M, MB7EM, MB7VM, MB75VM, MB75EM)", notes: ["Codes are in Error Codes: AN2 red LED, then FSHE 7-segment (E motor) or VSHE green/red (V motor)","MB7VM's install manual in this archive (1050228F-0) is predominantly French - an English edition may exist in current literature","MB75EM has no downloaded literature at all in this archive"] },
  { re: /^PAH[24][BV]M/, brand: "Nortek", equipment: "Air Handler", series: "Nortek (all badges) PAH2 / PAH4 air handler (PAH2BM, PAH2VM, PAH4VM-E, PAH4VMX)", notes: ["Codes are in Error Codes: AN2 red LED, plus VSHE green/red on the V-motor models","PAH4VM-E has an electronic expansion valve for iQ Drive systems - EXV faults need Nordyne addendum 7088380, not in this archive"] },
  { re: /^UMD[0-9]{2}MSK/, brand: "Nortek", equipment: "Air Handler", series: "Nortek (Frigidaire / Gibson / Nordyne / Intertherm) UMD24 / UMD36 / UMD48 / UMD60MSK3IH R32 Ultra Side Discharge INDOOR unit, 2-5 ton", notes: ["Codes are in Error Codes under 'Nortek ... R32 Ultra Side Discharge indoor units' - a flash-pattern table, not the legacy AN2/FSHE/VSHE boards","Pairs with the UXC/UXH outdoor unit, which has its own 58-code table","R32 is an A2L mildly flammable refrigerant - a leak indication is a safety event"] },
  { re: /^C[3-8][45]?[BDQ][AVQH]/, brand: "Nortek", equipment: "Other", series: "Nortek (all badges) C3 / C4 / C5 / C6 / C7 / C74 / C75 / C8 / C84 / C85 indoor evaporator coil (cased and uncased)", notes: ["Coil-only tag: the matching outdoor unit's data plate carries the system charge and electrical specs","Metering device is encoded in the suffix: 0=piston/orifice, X=TXV, T=TXV, I=EXV. Piston/orifice charges by SUPERHEAT, TXV by SUBCOOLING","No diagnostic codes exist for a coil - there is no board"] },
  { re: /^FG[678][RSTM]/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Frigidaire / Tappan / Westinghouse / NuTone / Gibson / Broan / Nordyne) FG6 / FG7 / FG8 gas furnace - FG6 = G6/L1 board, FG7 and FG8 = G7 board, FG8SD = alphanumeric E-code display", notes: ["Codes are in Error Codes: 'G6/L1 board' (red flash count + yellow flame) for FG6, 'G7 board' (green+red pair) for FG7/FG8SA, 'E-code display' for FG8SD","Trap: FG7S(A,K), FG7S(C,L) and FG7S(D,M) may instead carry an Emerson board with a single red LED and numbered flash codes 1-12 - open the door and look","Trap: PN 624690 (the G7 board) is the field board-swap replacement for the older PN 624631 (G6/L1) board, so the model number does not tell you which table applies","Nomenclature: FG7 [S=single stage / T=two stage] [cabinet A=14.25 B=17.50 C=21.00 D=24.50 in] - [input Btuh/1000] [NOx tier C/D/U] - [motor V=VSHE E=FSHE T=5-tap ECM][cooling tons]","Trap for decodeCapacity: Nortek furnace input codes include 045/054/072/090/096/100/108/120/126/144, several of which the app's current furnace capacity regex does not list"] },
  { re: /^KG[678][RST]/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Frigidaire / Gibson / Broan / Nordyne) KG6 / KG7 / KG8 gas furnace - KG6 = G6/L1 board, KG7 and KG8 = G7 board", notes: ["Codes are in Error Codes: 'G6/L1 board' for KG6R*, 'G7 board' for KG6T(A,K), KG7* and KG8SA","Trap: KG6T(A,K) uses the NEWER G7 green+red board despite the G6 model prefix","Trap: the catalog cross-lists KG6T(A,K) and KG7T(A,K) against consecutive revisions of the same manual (709045B / 709045C) - the board and table are identical either way"] },
  { re: /^(G6R[ACDKL]|GL1R[AC]|L1R[AC])/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Nordyne unbranded / Intertherm / Miller) G6R / GL1R / L1R manufactured-housing and modular gas furnace - G6/L1 board (red flash count + yellow flame)", notes: ["Codes are in Error Codes under 'Nortek ... G6/L1 gas furnace'","Nomenclature: G 6 R [input Btuh/1000: 040-144] [design series C/D] - [CFM/100]. Example G6RD-120C-19 = 120,000 BTU/h input, upflow condensing, ~1900 CFM","Sourcing caveat: G6RA/RC/RD/RK/RL ship only a 1-2 page spec sheet in this archive; their flash table was taken from the identical board documented in sibling families' install manuals"] },
  { re: /^G[78][ST][A-Z]/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Nordyne unbranded / Intertherm / Miller) G7S / G7T / G8S gas furnace - the unbranded model-prefix form of the FG7/KG7/MGC2 G7 platform (G7SA/G7SC/G7SD/G7SK/G7SL/G7SM single stage, G7TA/G7TC/G7TE/G7TK/G7TL/G7TN two stage, G8SA)", notes: ["Codes are in Error Codes under 'Nortek ... G7 board' (green + red status pair, yellow flame)","Two-stage and ECM models add a separate motor control board with its own green/red pair","Trap: does NOT collide with the Lennox G60/G61 or G71MPP rules - those need a digit or '1' in the third position"] },
  { re: /^MG[CF]?[123][A-Z]/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Maytag / Broan / Nordyne / Intertherm / Miller) MG / MGC / MGF gas furnace - MGF1 and MGC1 = G6/L1 board, MGC2 / MGC3 / MG2 / MG3 = G7 board, MG1E and MG2R also document an Emerson 1-12 board", notes: ["Codes are in Error Codes: 'G6/L1 board' for MGF1*/MGC1*, 'G7 board' for MGC2*/MGC3*/MG2S/MG3*, 'Emerson 1-12 board' for MG1E and MG2R, 'E-code display' for MGC3SD","Trap: MG1E and MG2R are the newest A2L-ready downflow furnaces and may carry EITHER the Nordyne G7 board or an Emerson board with numbered flash codes - look at the board","Gap: MGC1RA, MGC1RC and MGF1TA spec sheets confirm a SmartStart (G6/L1) board but never print its flash table","Gap: MGC3SD's ECM motor board has an alphanumeric menu whose numeric Err sub-codes are not in the install manual"] },
  { re: /^PG[CF][12][A-Z]/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Maytag / Nordyne) PGC / PGF gas furnace - PGC1 and PGF1R*/PGF1TE = G6/L1 board, PGC2 and PGF1T(C,L)/TA/TK = G7 board, PGC2MQ = modulating G7", notes: ["Codes are in Error Codes: 'G6/L1 board' or 'G7 board' by family; PGC2MQ adds the modulating-specific states","PGC2MQ is a 97.1% AFUE modulating furnace: normal is a GREEN HEART-BEAT pulse, not steady green, and it has a second (high-fire) pressure switch","PGF1TE-iQ Drive is the family that actually carries the iQ Drive install manual (708766a); its MGF1TE-iQ sibling is the same physical furnace"] },
  { re: /^M[1-7](R[CL]|[BGMS])/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Nordyne unbranded / Intertherm / Miller) M-series manufactured-housing furnace: M1/M1B/M1G/M1M (and the M5S OIL variant on the same chassis), M2RC/M2RL, M3RL, M4R(C,L), M7RL", notes: ["Codes are in Error Codes: 'M1 and RG1' for M1M/M1B, 'G6/L1 board' for M2/M3RL, 'G7 board' for M4R(C,L)/M7RL, and the oil primary control family for M5S","Trap: M1 and RG1 are the SAME chassis and share a parts list and install manual - and it ships as gas (M1M direct ignition, M1B gas gun) OR oil (M5S). Look at the burner","Bare 'M1' and 'M2' with no suffix letter will not match this rule - the tech will get the not-in-library path"] },
  { re: /^RG1/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Nordyne unbranded / Intertherm / Miller) RG1 / RG1D manufactured-housing gas furnace - same chassis and manual as the M1 family", notes: ["Codes are in Error Codes under 'Nortek ... M1 and RG1'","RG1D shares document numbers D306174-C and 709243* with the M1 family and the M5S oil furnace - treat them as one platform"] },
  { re: /^CMF[239]/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Maytag / Broan / Nordyne / Intertherm / Miller) CMF2 / CMF3 / CMF95 manufactured-housing furnace - CMF95 uses the Nordyne 'Channel' 3-LED board; CMF2 and CMF3 are dual-fuel chassis with gas ('PG') and oil ('PO') variants", notes: ["Codes are in Error Codes: 'CMF95 Channel board' for CMF95, the oil primary control family for CMF2/CMF3 oil ('PO') models","Gap: the gas-gun / power-burner ('PG') side of CMF2 and CMF3 has only narrative troubleshooting in every doc read - no LED table exists for it","CMF95 distinguishes a HARD lockout (needs power cycled) from SOFT lockouts that clear on their own (1 hour after failed ignition, 5 minutes after a pressure switch fault)"] },
  { re: /^E[1-7]E[BDHMU]/, brand: "Nortek", equipment: "Air Handler", series: "Nortek (Maytag / Broan / Nordyne / Intertherm / Miller) E3EB / E3EH / E4EB / E6EB / E7ED / E7EM / E7EU mobile-home electric furnace", notes: ["E7ED / E7EM / E7EU use the SAME FSHE 7-segment motor control board as the B6/B64 air handlers - that table is in Error Codes","E3EB / E4EB / E6EB are multi-speed PSC units with no control-board display at all - work them as resistance heat: sequencers, limits, element checks","Trap: these are NOT the Coleman/York EB-series mobile-home electric furnaces, which have their own separate rule in this table","E1's only document in this archive extracted to 30 characters - it is effectively blank/image-only"] },
  { re: /^H[4678]HK/, brand: "Nortek", equipment: "Other", series: "Nortek (all badges) H4HK / H6HK / H7HK / H8HK electric heater kit for B/GB/MB/PAH air handlers", notes: ["No diagnostic codes - this is a heat-strip kit","Standard kW steps are 3, 5, 8, 10, 15, 20, 25, 30 kW at 240 VAC 1-phase, with 208 V and 3-phase 9/15 kW variants","Trap: the circuit breakers supplied with the kit are short-circuit and disconnect protection only, NOT branch-circuit overcurrent protection - size field OCPD from the unit data label"] },
  { re: /^(PDF2|DF6)S[EF]/, brand: "Nortek", equipment: "Gas Furnace", series: "Nortek (Frigidaire / Maytag / Tappan / Westinghouse / Broan / NuTone / Nordyne / Intertherm / Miller) DF6SE / DF6SF / PDF2SE / PDF2SF gas-electric packaged unit (dual fuel pack), up to 15 SEER", notes: ["Codes are in Error Codes: 'Gen-1 pack board' (5 red codes) for DF6SE/DF6SF/PDF2SE/PDF2SF, 'Gen-2 pack board' (10 red codes + green) for the -A and -B revisions","The -A and -B revisions also offer the optional Emerson Comfort Alert module on the compressor circuit","Gen-2 charging is by SUBCOOLING using Figures 19-22, valid at compressor HIGH speed only - not on a single-stage call","No family-specific model nomenclature diagram exists in any Dual Fuel install manual sampled"] },
  { re: /^V?Q[1-9][0-9]{0,2}[BRS][DEFPN]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (all badges) Q-series packaged heat pump (Q3RD through Q8SF, Q94RD, Q95RD, Q104SD, VQ104SD, VQ6SE)", notes: ["Codes are in Error Codes: 'digital 2-digit defrost board' (Q7RE/Q7RF/Q8SF/Q94RD/Q95RD/Q104SD/VQ104SD), 'demand defrost board 624733' (Q5RF/Q5RF-A only), 'A2L leak sensor' (Q95RD)","Trap: Q5RD and Q5RF are NOT the same board generation - Q5RD is an older 13 SEER single-stage round-duct unit with no LED table at all","Trap: Q7RD / Q7RD-A are an earlier 13 SEER single-stage sub-generation that predates the digital display seen on Q7RE/Q7RF","Q8SF also carries an AN2 blower board and an ECM motor control board with their own LEDs","GQ3RD / GQ4SD, Q3B, Q3RD, Q4RD, Q4SD, Q5SN, Q6SD-X, Q6SE, Q6SP have demand defrost with test pins but no documented LED status table"] },
  { re: /^V?P[3-9][0-9]{0,2}[BRS][ACDEFMP]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (all badges) P-series packaged air conditioner (P3RD through P8SE, P94RD, P95RD, VP95RD)", notes: ["Straight-AC packaged units have NO integrated diagnostic board in any manual sampled - just a contactor, a time delay relay and optional pressure switches. Do not go looking for an LED","Exception: P95RD and VP95RD are R-454B units with an A2L refrigerant leak detection sensor - that LED table IS in Error Codes","P95RD / P94RD charge by SUPERHEAT using the unit's own suction-line superheat table"] },
  { re: /^(GP|GQ)[3-7][RS][DF]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Nordyne unbranded) GP-series packaged air conditioner and GQ-series packaged heat pump", notes: ["No diagnostic board table is documented for these families in any manual sampled","GQ heat pumps have a demand defrost board with test pins (forced defrost / anti-short-cycle bypass) but no LED status table"] },
  { re: /^PP[AH][1-3][RS][DEF]/, brand: "Nortek", equipment: "Condenser/Heat Pump", series: "Nortek (Maytag-badge) PPA-series packaged air conditioner and PPH-series packaged heat pump - the Maytag model-prefix parallel to Frigidaire's P and Q series", notes: ["Codes are in Error Codes: PPH2RF/PPH2RF-A share the 624733 demand defrost table with Q5RF, PPH3RF shares the digital 2-digit table with Q7RF, PPH3SF shares with Q8SF, PPH1SE shares Comfort Alert with Q4SE","Confirmed only where the same document literally lists both family names - PPH2RD/RE, PPH2SD/SE, PPH3RD and PPH3RE do NOT print an LED table in their own manuals even though their Q-series counterparts do","The whole PPA line (PPA1/PPA2/PPA3) has no documented diagnostic board"] },
  { re: /^[GU]X[CH][0-9]{2}MSK/, brand: "Nortek", equipment: "Mini-Split", series: "Nortek (Frigidaire / Maytag / Gibson / Nordyne / Intertherm) Ultra Side Discharge single-zone mini-split OUTDOOR unit - UXC/UXH..MSK3IH is the R32 generation, GXC..MSK4DH is the R-410A generation", notes: ["Codes are in Error Codes: 'R32 Ultra Side Discharge outdoor' (58-code table) for UXC/UXH, 'R-410A GXC outdoor' (27-code table) for GXC","Trap: case matters on both tables. E1 is high-pressure protection, e1 is a high-pressure SENSOR error; EE is the outdoor memory chip, ee is the DRIVE memory chip","Do not apply the 58-code R32 table to an R-410A GXC unit or vice versa","The mini-split nomenclature chart uses a FIXED brand letter G = Generic for the whole G-series inverter platform - the model number does not encode which brand sells it"] },
  { re: /^DC[CG][0-9]|^DCH(036|048|060|072|074|090|102|120|150)/, brand: "Daikin", equipment: "Other", series: "Daikin Applied light-commercial packaged rooftop (DC-series), 3-20 ton, R-410A - DCC air conditioner, DCG gas/electric, DCH heat pump", notes: ["Single-package commercial RTU, R-410A, 3-phase. Tonnage digits: 036=3t, 048=4t, 060=5t, 072=6t, 090=7.5t, 102=8.5t, 120=10t, 150=12.5t. This is a SEPARATE line from the MicroTech-controlled Rebel (DPS) - do NOT apply MicroTech alarm codes here.", "The DCH heat-pump branch is deliberately anchored to the 3-digit commercial tonnage codes and placed ahead of the Nortek ductless rule: Nortek's D-generation mini-splits (DXH/DHH/DKH) share a broad prefix pattern, and a bare DCH would otherwise be mis-claimed as a Nortek mini-split.", "Control is a generic Integrated Ignition Control (IIC) board read by LED flash count: 1=external lockout (ignition failure / flame loss after 3 tries; auto-reset after 1 hr or power-cycle 5+ sec); 2=pressure switch stuck open; 3=pressure switch stuck closed; 4=primary limit open; 5=flame sensed with the gas valve closed (miswiring); 6=short-cycle compressor delay (anti-short-cycle, normal). LED off after a power cycle = replace the control.", "Catalog 257-2 and the DCG (IM 1211) / DCC-DCH (IM 1215) install manuals are in Manuals -> Daikin.", "Do not confuse with Goodman-built GPC/GPG/GPH residential packaged units (2-5 ton) sold through Daikin Comfort."] },
  { re: /^[GD][XHKCF]H[0-9]{2}/, brand: "Nortek", equipment: "Mini-Split", series: "Nortek (Frigidaire / Maytag / Gibson / Nordyne / Intertherm) ductless mini-split indoor and outdoor units - G-prefix is the R-410A generation (GXH/GHH/GKH/GCH/GDH/GFH), D-prefix is the R32 generation (DXH/DHH/DKH)", notes: ["Codes are in Error Codes: 'Flex Match outdoor' (3-colour flash counts) for the R-410A multi-zone ODU, 'Flex Match indoor' (E/F/C codes) for cassettes and floor-ceiling units, 'single-zone indoor' for the high-wall units","Trap: the R32 Flex Match OUTDOOR unit (DXH_FMK3IH) has NO code table in its manual at all - only the R-410A generation's ODU does","Trap: the single-zone high-wall and U-Crown manuals LIST codes (F0, F1, F2, C5, E1, E5, E6, E8, U8, H3, H6) but never define them - use the matching outdoor unit's table","R32 is an A2L mildly flammable refrigerant"] },
  { re: /^KSK4DH|^GHH[0-9]{2}KSK/, brand: "Nortek", equipment: "Mini-Split", series: "Nortek (Gibson / Nordyne) U-Crown mini-split (KSK4DH indoor / GHH..KSK4DH, GXH..KSK4DH)", notes: ["The U-Crown indoor manual lists codes C5, E5, E6, E8, F1, F2, H6 and U8 but prints only generic guidance, not individual meanings - see Error Codes for the orientation entry","Use the matching outdoor unit's documented table where the same code letters appear"] },
  { re: /^O[345]([CHLM]D|-[0-9])/, brand: "Nortek", equipment: "Other", series: "Nortek (all badges) O3 / O4 / O4HD / O4LD / O4MD / O5HD / O5LD / O5MD oil furnace (highboy, lowboy, midboy, counterflow)", notes: ["Codes are in Error Codes under 'Nortek ... oil primary control' - Honeywell R7184 or Beckett 7505 cad-cell primary","Trap: the R7184 signals with flash RATE, not flash count - fast (0.5 s on / 0.5 s off) is lockout, slow (2 s on / 2 s off) is recycle","Press RESET during the run state to read cad-cell resistance as a flash count (1 = 0-400, 2 = 400-800, 3 = 800-1600, 4 = over 1600 ohms). It must be under about 1600 ohms","Gap: all four O3 documents in this archive are image-only scans with no extractable text - O3 coverage is unverified","Suffix -091A / -140A / -168A is the firing-rate/burner code, not a tonnage"] },
  { re: /^POF/, brand: "Nortek", equipment: "Other", series: "Nortek (all badges) POF oil furnace", notes: ["Codes are in Error Codes under 'Nortek ... oil primary control'","Same Honeywell R7184-family cad-cell primary control as the whole O3/O4/O5 line"] },
  // --- end Nortek ---
  // --- Daikin residential unitary ---
  { re: /^D[MC]97MC/, brand: "Daikin", equipment: "Gas Furnace", series: "DM97MC/DC97MC modulating gas furnace (ComfortNet communicating)", notes: ["Fault codes for this exact family are in Error Codes (E0-b9)."] },
  { re: /^D[MC]96VC/, brand: "Daikin", equipment: "Gas Furnace", series: "DM96VC/DC96VC two-stage variable-speed gas furnace", notes: ["Install manual is in Manuals → Daikin."] },
  { re: /^D[MC]9[26]SN/, brand: "Daikin", equipment: "Gas Furnace", series: "DM92SN/DM96SN/DC96SN single-stage gas furnace", notes: ["Shares the Goodman GM9S80-style E-code board family."] },
  { re: /^D[XZ]1[68]TC/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "DX/DZ 16-18TC condenser or heat pump (ComfortNet)", notes: ["Comfort Alert codes 01-09 for this family are in Error Codes.", "DZ = heat pump, DX = straight cool."] },
  { re: /^D[CHZ][679]VS/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin FIT inverter outdoor unit (DC/DH/DZ 6-9VS)", notes: ["Full FIT E-code table is in Error Codes.", "Communicating system — check Data 1/2 bus (0.6-0.9VDC bias) on comm issues.", "R-410A and R-32 FIT system service manuals are in Manuals → Daikin."] },
  { re: /^D[CHXZ](17|20)V[SC]/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin FIT/premium inverter outdoor (DZ17VSA / DX20VC / DZ20VC class)", notes: ["E-code table in Error Codes applies (DX20VC/DZ20VC service manual is in Manuals → Daikin — codes E31/E45 are specific to that platform)."] },
  { re: /^D[CH][345]S[QE]/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin R-32 single-stage AC/heat pump (DC3S/DC4S/DC5S/DH4S/DH5S)", notes: ["Copeland CoreSense/ComfortAlert diagnostics — alert codes 01-09 in Error Codes apply.", "R-32 single-stage service manual RS6200301 is in Manuals → Daikin."] },
  { re: /^D[CHZ]7TC/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin R-32 two-stage AC / heat pump (DC7TC air conditioner, DH7TC / DZ7TC heat pump - 17.2 SEER2, 2-5 ton)", notes: ["R-32 (A2L). Two-stage scroll staged by the Daikin One+ / two-stage thermostat. Copeland CoreSense / ComfortAlert alert codes 01-09 in Error Codes apply - same diagnostics platform as the DC/DH single-stage R-32 units; there is no Daikin E-code display on this tier (that is the VS inverter units only).", "Read DH7TCA4810 as D (Daikin) H (heat pump; C = air conditioner - both R-32) 7 (SEER2 tier, ~17) T (two-stage) C (variation) A (major rev) 48 (4 ton) 10 (electrical / minor rev). Capacity code: 18=1.5t, 24=2t, 30=2.5t, 36=3t, 48=4t, 60=5t.", "R-32 two-stage service manual (shared Daikin/Goodman R-32 platform) is in Manuals → Daikin."] },
  { re: /^DR96SN/, brand: "Daikin", equipment: "Gas Furnace", series: "Daikin DR96SN single-stage multi-speed 96-97% furnace (R-32-era lineup)", notes: [] },
  // Prior-generation Daikin unitary, confirmed against Daikin's own spec
  // sheets (SS-DX13SA on daikincomfort.com) and product pages (DP14GM/DP14HM).
  { re: /^D[XZ]1[3-6]S[AN]/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin single-stage condenser or heat pump (DX/DZ 13-16 S-series — prior generation)", notes: ["Goodman GSX/GSZ platform — service manual RS6200006 in Manuals → Goodman applies.", "Comfort Alert-style codes 01-09 apply if a monitor module is fitted."] },
  { re: /^DP1[3-6][GH][MEC]/, brand: "Daikin", equipment: "Other", series: "Daikin packaged unit (DP GM gas-electric / DP HM heat pump)", notes: ["Goodman package platform — the package-unit manuals in Manuals → Goodman → Packaged units apply."] },
  { re: /^DPS[- ]?[0-9]/, brand: "Daikin", equipment: "Other", series: "Daikin Applied Rebel packaged rooftop (DPS), 3-28 ton, R-410A - MicroTech III controlled", notes: ["Single-package commercial RTU (Rebel). Model reads like DPS-010-AHHG4 or DPS010...: DPS, then a 3-digit tonnage (003=3t ... 025=25t, 028=28t). R-410A on this size range (R-32 is only on the larger 45-75 ton Rebel Applied C-cabinet).", "Control is MicroTech III with 3 alarm classes: Warning (auto-clear - e.g. 24=dirty filter, 28=airflow, 40=low superheat, 50/52=over/under economizing), Problem (limits capacity - e.g. 130=low refrigerant charge, 150-167=per-circuit high/low pressure), and Fault (shuts the unit down, most need a manual clear - 208=airflow, 212/216=low/high discharge air temp, 220=high return air temp, 250=emergency stop, 252=freeze). Read them at the keypad or over BACnet/Modbus. The MicroTech III protocol/alarm doc (ED 15112) is in Manuals -> Daikin.", "DPSA (Rebel Applied, 45-230 ton) is a different, larger product - not this rule."] },
  { re: /^DV[0-9]{2}[FP]EC/, brand: "Daikin", equipment: "Air Handler", series: "Daikin DV**FEC/PEC EEV air handler (R-32 FIT indoor)", notes: ["Air-handler code table (EE/Eb/Ed/E5/EF, d/b series, 70-77) in Error Codes applies.", "R-32 FIT system service manual is in Manuals → Daikin."] },
  { re: /^D[FM]VE/, brand: "Daikin", equipment: "Air Handler", series: "DFVE/DMVE EEV-series communicating air handler (Daikin FIT indoor)", notes: ["Air-handler diagnostic codes (EC/EE/EF, d, b series) are in Error Codes."] },
  { re: /^DOZP/, brand: "Daikin", equipment: "Other", series: "Daikin One zone panel (DOZP)", notes: ["Zone error codes 25-95 and DOZP troubleshooting flows are in Diagnostic Help (search 'DOZP')."] },
  { re: /^(FTXV|RXT)[0-9]{2}[A-Z]/, brand: "Daikin", equipment: "Mini-Split", series: "Daikin Aurora R-32 single-zone wall-mount heat pump - FTXV** indoor / RXT** outdoor (e.g. FTXV12AVJU9 with RXT12AVJU9), low-ambient cold-climate, 20-21 SEER2", notes: ["R-32 (A2L). Swing-inverter cold-climate ductless: up to 100% heating capacity at 5F, operates to -13F. Wi-Fi capable, IR remote.", "Read FTXV12AVJU9 as FTXV (Aurora R-32 wall indoor; RXT = the matching outdoor) 12 (12,000 BTU/h = 1 ton) A (rev) VJU9 (series / 230V). Sizes 09/12/15/18/24.", "Indoor two-character error codes (U/A/C/E/F/H/J/L/P) apply, same scheme as the other Daikin single-zone ductless in Error Codes; service manual is in Manuals → Daikin."] },
  { re: /^(FTXS|FDXS|CTXS|CTXG|CDXS|FVXS|RXS|FTX|FTK|RK|RX)[0-9BX]/, brand: "Daikin", equipment: "Mini-Split", series: "Daikin single-zone ductless indoor/outdoor (wall mount, floor console, slim duct; incl. 19 Series FTK/RK)", notes: ["Full two-character error code table (U/A/C/E/F/H/J/L/P) is in Error Codes.", "19 Series service manual with per-code procedures is in Manuals → Daikin.", "CTXG/CTXS/CDXS/FVXS head-specific checks (PCB jumpers, Hall IC, fan connector voltages) are in Diagnostic Help."] },
  { re: /^(RMXS|[234]MXS|MXS)[0-9]?/, brand: "Daikin", equipment: "Mini-Split", series: "Daikin multi-zone mini-split outdoor unit", notes: ["Multi-zone code table is in Error Codes; branch provider issues are in Diagnostic Help."] },
  // --- Goodman / Amana ---
  { re: /^AVZC1[68]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Amana/Goodman AVZC inverter heat pump (ClimateTalk communicating)", notes: ["Its full diagnostic code table (EE/Eb/b/d/7x) is in Error Codes."] },
  { re: /^(GSXV|GSZV|ASXV|ASZV)/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana side-discharge inverter condenser or heat pump", notes: ["Inverter unit — CoolCloud app connects to the board for diagnostics (see Toolbox)."] },
  { re: /^(GSX|ASX|DSX|SSX|ANX|VSX)[0-9]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana single-speed AC condenser", notes: ["Service manual RS6200006 (covers this family) is in Manuals → Goodman.", "Comfort Alert-style codes 01-09 apply if a monitor module is fitted."] },
  { re: /^(GSZ|ASZ|DSZ|SSZ|ANZ|VSZ)[0-9]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana heat pump", notes: ["Service manual RS6200006 (covers this family) is in Manuals → Goodman."] },
  { re: /^(GM9C96|GC9C96|AM9C96|AC9C96)/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana 96% two-stage furnace (9-speed ECM)", notes: ["Service manual RS6612020 is in Manuals → Goodman — fault codes are on its pages 35-36."] },
  { re: /^(GM9S|GC9S|AM9S|AC9S|VM9S|VC9S)[0-9]{4}/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana 80/96% single-stage furnace", notes: ["E-codes (E0/E1/E2/Eb/EC) + flash codes are in Error Codes."] },
  // Previous-generation lineup, confirmed against Goodman's own spec/install
  // literature (SS-GMEC96, SS-GME8, shared install manual GME8/GMH8/GDH8/
  // GMS8/GDS8/GHS8). Field population is huge even though the current
  // manuals in our library cover the newer naming.
  { re: /^(GMSS|GCSS|GMES|GCES|GMEC|GCEC)9[26]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman 92/96% furnace (GMSS/GMES single-stage, GMEC two-stage — prior generation)", notes: ["Flash codes and E-codes in Error Codes apply — same board families as the current lineup."] },
  { re: /^(GMS|GDS|GHS|GME|GMH|GDH)8[0-9]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman 80% furnace (GMS8/GDS8/GHS8 single-stage, GME8/GMH8/GDH8 two-stage — prior generation)", notes: ["Goodman flash codes in Error Codes apply."] },
  // 90-95% legacy lineup, confirmed against Goodman's own spec sheets
  // (SS-GMV95, SS-GMH95, SS-GKS9) and install manual GMH95/GCH95/GME95/GCH9.
  { re: /^(GMV9|GCV9|GMH9|GCH9|GME9|GKS9)[0-9]?/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman 90-95% furnace (GKS9 single-stage, GMH95/GME95 two-stage, GMV95 variable-speed — prior generation)", notes: ["Goodman flash codes in Error Codes apply."] },
  { re: /^(GSC1[3-6]|GSH1[3-6])/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman GSC/GSH condenser or heat pump (13-16 SEER — prior generation, R-22 and early R-410A)", notes: ["Service manual RS6200006 family applies; check the data plate for refrigerant type before gauging up."] },
  { re: /^(CAPF|CAPT|CAUF|CHPF|CSCF)[0-9]/, brand: "Goodman", equipment: "Other", series: "Goodman/Amana/Daikin cased evaporator coil (CAPF/CAPT/CAUF/CHPF/CSCF)", notes: ["Coil-only tag: the matching outdoor unit's data plate carries the system charge and electrical specs.", "Metering device decides the charging method: piston/fixed orifice = charge by SUPERHEAT (chart method in Diagnostic Help and the Charging Calc), TXV or EEV = charge by SUBCOOLING. Check which this coil actually has before pulling out gauges.", "CAPT models ship with a factory TXV (subcooling); the other families may be piston or field-added TXV - look at the liquid line entry."] },
  // Daikin-branded vertical cased coil — its install manual is in our library.
  { re: /^CAPEA[0-9]/, brand: "Daikin", equipment: "Other", series: "Daikin CAPEA vertical cased coil (EEV, FIT indoor)", notes: ["Install manual is in Manuals → Daikin.", "Transformer supply tap and DS1 dip-switch setup for this coil are in Diagnostic Help (search 'CAPEA').", "EEV coil - charge by SUBCOOLING against the Daikin FIT charging tables in the Charging Calc; on R-32 FIT systems use the Charge Verification test in Diagnostic Help."] },
  { re: /^(GMVC|GCVC|AMVC|ACVC)9[67]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana two-stage variable-speed furnace (ComfortNet)", notes: ["Uses the shared ComfortNet dual 7-segment code set — see Goodman codes in Error Codes.", "Service manual RS6612014 is in Manuals → Goodman."] },
  { re: /^(GMVM|GCVM|AMVM|ACVM)9[78]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana 97-98% modulating communicating furnace (Daikin DM97MC platform)", notes: ["Same code set as the Daikin DM97MC entries in Error Codes (E0-b9).", "Service manual RS6612015 is in Manuals → Goodman."] },
  { re: /^(GR9S|AR9S)/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana GR9S/AR9S single-stage multi-speed 96-97% furnace (R-32-era lineup)", notes: [] },
  { re: /^(GLZS4|ALZS4)/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana GLZS4/ALZS4 single-stage R-32 heat pump", notes: ["R-32 single-stage service manual RS6200301 (shared platform) is in Manuals → Daikin."] },
  { re: /^(GLXS4|ALXS4)/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana GLXS4/ALXS4 single-stage R-32 AC condenser", notes: ["R-32 single-stage service manual RS6200301 (shared platform) is in Manuals → Daikin."] },
  { re: /^(GP|AP)[GCHU][GMU0-9]/, brand: "Goodman", equipment: "Other", series: "Goodman/Amana packaged unit (gas-electric / AC / heat pump)", notes: ["Package-unit install + service manuals (IO-398E, IOG-3021B, RS6300012, RS6300014) are in Manuals → Goodman → Packaged units."] },
  { re: /^GVZC20/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman GVZC20 inverter heat pump (ComfortBridge)", notes: ["Inverter unit — CoolCloud app connects to the board for diagnostics (see Toolbox)."] },
  { re: /^(AMST|ARUF|ASPT|AVPTC|AWUF)/, brand: "Goodman", equipment: "Air Handler", series: "Goodman/Amana air handler", notes: ["PCBJA-board diagnostic codes (EC/EE/EF, d, b series) in Error Codes apply to the communicating models."] },
  // Modular blowers (MBVC1200, MBVK12BP...) — named in the Daikin FIT system
  // service manuals in our library. With a heat kit these ARE the electric
  // furnace; the air-handler electrical path in Diagnostic Help covers them.
  { re: /^MBV[CK][0-9]/, brand: "Goodman", equipment: "Air Handler", series: "Goodman/Daikin modular blower (MBVC/MBVK — electric heat or FIT indoor)", notes: ["With an electric heat kit installed, work it as an electric furnace — the air handler power-path and heat-strip scenarios in Diagnostic Help apply.", "On a Daikin FIT system the communicating code table in Error Codes applies."] },
  // --- Carrier / Bryant / Payne ---
  { re: /^59MN7/, brand: "Carrier", equipment: "Gas Furnace", series: "Carrier Infinity 98 modulating furnace (59MN7C)", notes: ["Full major.minor status-code table (10.1-53.2) is in Error Codes under 'Carrier Infinity'."] },
  { re: /^59TP6/, brand: "Carrier", equipment: "Gas Furnace", series: "Carrier Performance 96 two-stage furnace (59TP6)", notes: ["Install/service manual is in Manuals → Carrier."] },
  { re: /^59TN[0-9]/, brand: "Carrier", equipment: "Gas Furnace", series: "Carrier Infinity 96 two-stage variable-speed gas furnace (59TN6)", notes: ["Infinity communicating control - the Carrier Infinity major.minor status-code table in Error Codes (same family as the 59MN7C) applies.", "Install/service manual (59TN6B) is in Manuals → Carrier."] },
  { re: /^59(SC|SP)[0-9]/, brand: "Carrier", equipment: "Gas Furnace", series: "Carrier Comfort series single-stage furnace", notes: ["Uses the standard Carrier flash-code board — see Bryant/Payne flash codes in Error Codes."] },
  { re: /^58[A-Z]{2}/, brand: "Carrier", equipment: "Gas Furnace", series: "Carrier 58-series gas furnace", notes: ["Standard flash-code list in Error Codes applies to most non-communicating models."] },
  // Payne-branded — same Carrier Corp platform, one standard tier (no
  // good/better/best split). No official Payne serial-date format exists
  // (checked payne.com/hvacpartners.com/shareddocs.com directly) — the age
  // field will come back blank for these, and that's correct, not a bug.
  { re: /^PG(9[0-9]|8[0-9])[A-Z]/, brand: "Carrier", equipment: "Gas Furnace", series: "Payne-branded gas furnace (Carrier platform)", notes: ["Payne = Carrier — the standard Carrier/Bryant/Payne flash-code list in Error Codes applies.", "No official source documents a Payne serial date format — the tag's own date/warranty info is more reliable than a guess."] },
  { re: /^2[4567][A-Z]{3}/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Carrier Infinity/Performance/Comfort AC or heat pump (24/25/26/27-series)", notes: ["24VNA9/25VNA8: full 39-code fault table is in Error Codes."] },
  { re: /^G[AH][0-9][ST]AN/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Carrier/Bryant Builder (new-construction) R-454B AC (GA) / heat pump (GH) - GA4SAN5 / GA5SAN5 / GA8TAN5, GH5SAN5 / GH8TAN5", notes: ["R-454B (A2L) Builder tier - the SAME model number is sold under both Carrier and Bryant badges. NO diagnostic control board: single-stage (GA4/GA5/GH5) are contactor-only; two-stage GA8TAN5 / GH8TAN5 troubleshoot on compressor winding / unloader tests, no LED fault table.", "Read GH8TAN5 as G (Builder tier) H (heat pump; A = air conditioner) 8 (efficiency; 4/5 = single-stage, 8 = two-stage) T (compressor: S single-stage, T two-stage) A N 5 (R-454B), then capacity digits.", "Install manuals for GA4SAN5 / GA8TAN5 / GH8TAN5 are in Manuals → Carrier. Charge R-454B by the metering device: piston = superheat, TXV = subcooling."] },
  { re: /^P[AH](8T|5S|4S|13|14|15|16)[A-Z]/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Payne-branded AC or heat pump (Carrier platform)", notes: ["Payne = Carrier — standard fault-code list in Error Codes applies where the board matches."] },
  // Bryant-branded furnaces use a bare 3-digit-plus-letter model number (no
  // brand prefix at all), confirmed against Bryant's own product literature —
  // widened from the original 9xx-only pattern once the research turned up
  // just as many 8xx-prefix Bryant furnaces (880TA, 830CA, 820T...).
  { re: /^[89][0-9]{2}[A-Z]{1,2}[0-9]?/, brand: "Carrier", equipment: "Gas Furnace", series: "Bryant-branded gas furnace (Carrier platform)", notes: ["Bryant = Carrier — the standard Carrier/Bryant/Payne flash-code list in Error Codes applies."] },
  // Bryant-branded condensers/heat pumps: 3-digit-prefix + T/S/V + AN suffix
  // (191VAN, 148TAN, 146SAN...). Confirmed against Carrier's own serial-format
  // service manual, which documents Bryant units on the same numbering.
  { re: /^(1[0-9]{2}|2[0-9]{2})[TSV]AN/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant-branded AC or heat pump (Carrier platform)", notes: ["Bryant = Carrier — standard fault-code list in Error Codes applies where the board matches."] },
  // Mini-split platform shared across Carrier/Bryant/Payne badges.
  { re: /^45MUAA/, brand: "Carrier", equipment: "Air Handler", series: "Carrier Comfort Crossover ducted air handler (45MUAAQ) for 37M/38M mini-split systems - R-454B", notes: ["This is the DUCTED indoor air handler that pairs with a 37MURAQ / 38MURAQ mini-split outdoor unit, not a wall head. Same Samsung/Toshiba-Carrier ductless code scheme (EC / EH / EL / PC) as the mini-split system in Error Codes.", "Placed ahead of the generic 45M mini-split rule so it is labeled as the air handler it actually is."] },
  { re: /^(3[78]M|40M|45M|538K|615[AP]HA|619[AMP]H|DHM|D5MAHA)/, brand: "Carrier", equipment: "Mini-Split", series: "Carrier/Bryant/Payne-branded ductless mini-split", notes: ["Same underlying mini-split platform is sold under all three badges."] },
  { re: /^(F[EJTM]5|FE4A|FE5A|FV4C|FX4D|FB4C|PF5M)[A-Z0-9]/, brand: "Carrier", equipment: "Air Handler", series: "Carrier/Bryant/Payne air handler", notes: [] },
  { re: /^(FT4|FF[0-9M]|FZ[0-9]|F54)[A-Z0-9]/, brand: "Carrier", equipment: "Air Handler", series: "Carrier/Bryant/Payne current residential fan coil - FT4B, FF-series, FZ-series, F54 (R-454B-ready lineup)", notes: ["Current-generation Carrier fan coils. R-454B-ready models carry the A2L RDS / Dissipation control board (LED codes) - a blower running with no thermostat call can be a leak-mitigation response, not a fault.", "This rule DELIBERATELY excludes the FM* prefixes: Carrier's FMA/FMC/FMU overlap ICP/Heil's F_M4X fan coils (matched by the ICP rule). Confirm the badge before decoding an FM* fan coil.", "No numbered fault code on the blower itself - diagnose blower relay, motor, transformer and the RDS board."] },
  // Prior-generation fan coils, confirmed against Carrier's own product data
  // (FA4A-9PD covers FA4A/FB4A/FC4B; FY4A/FA4C product data on Carrier docs).
  { re: /^(FA4[AC]|FB4[AB]|FC4[BC]|FY4[AC]|FX4[ABC])[A-Z0-9]/, brand: "Carrier", equipment: "Air Handler", series: "Carrier/Bryant/Payne fan coil (FA4/FB4/FC4/FY4/FX4 — prior generation)", notes: [] },
  { re: /^CNPV[PTU][0-9]/, brand: "Carrier", equipment: "Other", series: "Carrier/Bryant/Payne cased N coil (CNPVP/CNPVT)", notes: ["Coil-only tag: the matching outdoor unit's data plate carries the system charge and electrical specs.", "Metering device decides the charging method: piston/fixed orifice = charge by SUPERHEAT (chart method in the Charging Calc), TXV = charge by SUBCOOLING. Check which this coil actually has."] },
  { re: /^C(AAMP|VAMA|VAVA)/, brand: "Carrier", equipment: "Other", series: "Carrier/Bryant/Payne R-454B cased coil - CAAMP (cased A-coil), CVAMA / CVAVA (cased V-coil) with A2L Refrigerant Detection System", notes: ["R-454B (A2L). This coil carries the A2L mitigation hardware: an internal refrigerant leak sensor plus a Dissipation/RDS control board that flashes LED codes and, on a leak, runs the indoor blower and holds the compressor off. A blower running with no call can be the RDS doing its job, not a fault.", "Coil-only tag: system charge and electrical are on the matching outdoor unit's plate. Metering device sets the method: piston = superheat, TXV = subcooling.", "Install manuals (IM-CAAMP / IM-CVAMA / IM-CVAVA) are in Manuals → Carrier."] },
  // Residential/light-commercial packaged units, confirmed against Carrier's
  // own product data (48ES-05PD; shareddocs SUP covering 48/50 ES-EZ-VL-VT).
  // 48TC/48HC rooftops carry the IGC board whose codes are in Error Codes.
  { re: /^(48|50)(ES|EZ|VL|VT|VG|SD|GC|TC|HC|LC|NG|FE|GE)[A-Z0-9-]/, brand: "Carrier", equipment: "Other", series: "Carrier/Bryant packaged unit (48 = gas-electric, 50 = electric/heat pump; NG = R-454B residential 2-stage gas-electric, FE/GE = R-454B WeatherMaker light-commercial rooftop)", notes: ["On 48TC/48HC/Bryant 580J rooftops, the IGC board flash codes (1-9, steady, off) are in Error Codes.", "48/50FE and 48/50GE light-commercial rooftops use the SystemVu control (R-454B) with its own troubleshooting doc, NOT the IGC flash codes."] },
  { re: /^5(51|59|81|82)L/, brand: "Carrier", equipment: "Other", series: "Bryant Legacy/Preferred light-commercial packaged rooftop, R-454B - 559L / 551L electric-cool or heat pump, 582L / 581L gas-electric (~5.5-15 ton)", notes: ["R-454B light-commercial rooftop - separate numbering from the 48/50 residential line. Board present; work it from the unit's own service literature (product data PDS582-559L).", "Not a residential split - expect 3-phase power and a light-commercial parts path."] },
  // Confirmed against Carrier's own residential AC/HP service manual (24-25-2SM)
  // and a matching Bryant install manual — the serial format below is real,
  // scoped to split AC/HP units 2006+, and now implemented in decodeSerialAge.
  // --- Lennox ---
  { re: /^SLP9[89]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox SLP98/SLP99 variable-capacity communicating furnace", notes: ["Full E-code table (E105-E409) is in Error Codes.", "Alert-code guide for the whole communicating system is in Manuals → Lennox."] },
  { re: /^G71MPP/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G71MPP variable-capacity communicating furnace (2004-2011 era)", notes: ["Uses the same integrated-control E-code table (E105-E409) as SLP99 — see Lennox codes in Error Codes.", "Install + homeowner manuals are in Manuals → Lennox → G71MPP."] },
  { re: /^EL(29[67]|19[56]|280|180)/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox Elite gas furnace (EL180/EL195/EL196/EL280/EL296/EL297)", notes: ["Service manual for this exact model is in Manuals → Lennox — tap the model folder.", "Communicating models report the numbered alert codes (105-4xx) in Error Codes."] },
  { re: /^SL(29[78]|280)/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox Dave Lennox Signature gas furnace (SL280/SL297)", notes: ["Service manual is in Manuals → Lennox.", "SL280UHNV/EL180UHNE have a service note on incorrect manifold pressure/orifice info (H-19-04) — see Manuals → Lennox."] },
  { re: /^ML(1[89][036]|29[67])/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox Merit gas furnace (ML180/ML193/ML196/ML296)", notes: ["Service manual is in Manuals → Lennox.", "ML296V + Harmony III zoning has its own service note in Manuals → Lennox."] },
  { re: /^EL(18|22)KCV/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Elite R-454B variable-capacity communicating AC (EL18KCV/EL22KCV)", notes: ["Communicating — Lennox alert codes 400-446 in Error Codes apply (shown on S30/S40 thermostat).", "R-454B is an A2L refrigerant: paired indoor units carry leak-detection sensors — refrigerant detection codes 150-164 are in Error Codes.", "Spec sheets are in Manuals → Lennox."] },
  { re: /^ML15KSPV/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox ML15KSPV R-454B inverter heat pump", notes: ["This board has its OWN numeric fault codes (1-55 plus LE/73) on the service monitor board — they are in Error Codes and have nothing to do with the S30/S40 alert codes that share the same numbers.", "R-454B (A2L) — the indoor side carries refrigerant detection; codes 150-164 are in Error Codes.", "Charging: put SW1 on the display board in charge mode and the display reports subcooling for you in COOLING only. In heating you must gauge the liquid line yourself. Targets by indoor matchup are in the Charging Calc.", "Weigh-in is the only approved way to charge this system — there is no high-side port in cooling or low-side port in heating.", "Service manual (100230) is in Manuals → Lennox."] },
  { re: /^(SL22KLV|ML16K[SP])/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox R-454B heat pump (SL22KLV / ML16KP2)", notes: ["R-454B (A2L) — the indoor side carries refrigerant detection; codes 150-164 are in Error Codes.", "Service manual is in Manuals → Lennox.", "Inverter-driven: gauge-pressure charging targets don't apply the same way — check the unit's charging procedure."] },
  { re: /^(SL25XPV|SL25XCV|SL28XCV|XP2[015]|XC2[0145]|EL1[678]X|EL22XPV)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox communicating AC/heat pump", notes: ["Alert codes 400-446 for these outdoor units are in Error Codes (shown on the S30/S40 thermostat).", "Inverter units: alert code 427 during defrost has a known inverter software fix — units after serial 5817F already have it."] },
  { re: /^1[346]ACX|^14HPX|^ML1[467]X/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Merit AC/heat pump", notes: [] },
  // Prior-generation Elite outdoor units (lennox.com product-spec pages for
  // XC13; Lennox's own XP14 literature) and legacy G-series furnaces
  // (Lennox service literature: G40UH corp 0006-L3, G60UH corp 0204-L2).
  { re: /^Z[FHJR][0-9]/, brand: "York", equipment: "Other", series: "York / Johnson Controls Sun Pro / Predator light-commercial packaged rooftop, 3-12.5 ton - ZF (Sun Pro gas-electric/AC), ZH/ZJ (Predator AC), ZR (AC with reheat); R-410A", notes: ["Single-package commercial RTU, R-410A, 3-phase. Tonnage digits are cooling MBH/12: ZF 3-6t uses 036/048/060/072; ZH/ZJ/ZR use 037/049/061/078/090/102/120/150 (078=6.5t ... 150=12.5t). Heat-type letter in the model: C=cooling only, E=electric heat, H/J=1-stage gas, N/S=2-stage gas, K/L/P/Q=low-NOx.", "Control is Simplicity (base UCB board) with numeric LED flash codes: FC2=anti-short-cycle delay (not a fault); FC3/FC4=high-pressure trip stage 1/2 (opens 625 / closes 500 psig on R-410A); FC5/FC6=low-pressure trip stage 1/2 (opens 50 / closes 70); FC7/FC8=freeze-stat stage 1/2 (26F open / 41F close); FC9=ignition lockout / heat fail (check the ignition board's own codes first); FC10=low-ambient lockout; FC11=economizer free-cooling lockout; FC12=fan overload; FC13=low-voltage lockout (<19.2VAC); FC14=EPROM failure. LAST ERROR button: press once to replay the last 5 codes, twice within 5 sec to clear.", "Newer 6.5-12.5t XP/ZJ units use Simplicity SE, which shows fault TEXT on an LCD (or a MAP Gateway) instead of flash counts - there is no numeric flash table on SE. Tech guide / install manuals are in Manuals -> York.", "Legacy R-22 twins (D-prefix Sunline 2000 / Predator, B-prefix heat pumps) share this control family but use R-22 pressure setpoints."] },
  { re: /^XP(078|090|102|120|150)/, brand: "York", equipment: "Condenser/Heat Pump", series: "York / Johnson Controls XP single-package HEAT PUMP rooftop, 6.5-12.5 ton (R-410A) - the heat-pump counterpart of the ZF/ZH commercial line", notes: ["This rule sits ahead of the Lennox X[CP]1[3-9] rule on purpose: York commercial XP uses 3-digit tonnage codes (XP078/090/102/120/150 = 6.5/7.5/8.5/10/12.5 ton), which the 2-digit Lennox XP13-25 heat-pump rule would otherwise mis-claim.", "Single-package commercial heat pump, R-410A, 3-phase. Simplicity SE control (LCD fault text). Install manual is in Manuals -> York.", "Not to be confused with the Lennox residential XP13-XP25 split heat pumps or the York residential YH-series."] },
  { re: /^X[CP]1[3-9]/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Elite XC (AC) / XP (heat pump) — prior generation", notes: ["Communicating-capable later models report numbered alert codes in Error Codes."] },
  { re: /^G(40|50|51|60|61)[A-Z]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox legacy G-series gas furnace (G40/G50/G51/G60/G61)", notes: ["SureLight board era - two-LED flash diagnostics; service literature for several G-series models is in Manuals → Lennox."] },
  { re: /^LRP1[46]/, brand: "Lennox", equipment: "Other", series: "Lennox LRP14/LRP16 residential packaged unit (gas-electric or heat pump)", notes: ["Service manual is in Manuals → Lennox → LRP14/LRP16.", "LRP14HP: nuisance low-pressure lockouts below 30°F are usually the defrost timer left on the 90-minute default — see Diagnostic Help.", "LRP14HP has a known incorrect-wiring-diagram notice; LRP16HP has a 9-pin relay mis-wiring notice — both in Manuals → Lennox."] },
  // Mini-splits. Current families are MWLD/MWPD/MWHD (indoor) and MMPD/MMLD
  // (outdoor, single and multi-zone); the older platform is MLB/MPC/3PC/3PB
  // plus the MCF/MFM/MMD/MWM/3WM indoor heads and M22A/M33C.
  { re: /^(MWLD|MWPD|MWHD|MMPD|MMLD)/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox mini-split / multi-split (current MW/MM platform)", notes: ["Full E-code list with Lennox's own troubleshooting steps is in Error Codes — search the E-number.", "E101/C101 (comm error) is the most common: F1/F2 must be 16/2 stranded shielded, straight run, 0.1-0.9 VDC — see Diagnostic Help.", "Service manual 100227 is in Manuals → Lennox."] },
  { re: /^(MLB|MPC|3PC|3PB|MCF[AB]|MFMA|MMD[AB]|MWMC|3WMC|M22A|M33C)/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox mini-split (MLB/MPC/3PC legacy platform)", notes: ["This platform uses EC/EH/EL/PC/F-prefix display codes — the code tables are in the service manual, Manuals → Lennox → 3PC/MLB/MPC.", "Outdoor boards have a point check (spot check) function that reads sensor values directly — see Diagnostic Help."] },
  { re: /^(ML[AB]|MP[AB]|MSA|MHA)[0-9]/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox mini-split", notes: ["Mini-split error codes are in Error Codes; service manuals are in Manuals → Lennox."] },
  { re: /^(CBA|CBX|CBK)[0-9]/, brand: "Lennox", equipment: "Air Handler", series: "Lennox air handler", notes: ["Service manual for CBA27UHE and CBK48MVT (R-454B) is in Manuals → Lennox.", "Communicating air handlers report the numbered alert codes in Error Codes.", "On ML15KSPV / ML16KP2 / SL22KLV systems the target subcooling is keyed by THIS indoor model - the matchup tables are in the Charging Calc."] },
  { re: /^C[XHR]3[0-9]/, brand: "Lennox", equipment: "Air Handler", series: "Lennox indoor coil (CX/CH/CR 3x series)", notes: ["CX35 aluminum coils with factory TXV: check that the copper flare seal bonnet was removed from the equalizer fitting — if left on, the TXV cannot control superheat (service note C-15-07). See Diagnostic Help."] },
  // --- Trane / American Standard ---
  { re: /^S[89][VXB][12]|^L9X1/, brand: "Trane", equipment: "Gas Furnace", series: "Trane S-series gas furnace", notes: ["S9V2-VS install/operation manual is in Manuals → Trane.", "A951X IFC e-codes in Error Codes apply to current S-series boards."] },
  { re: /^(TUD|TUH|TDD|TDH|TUX|TUC|TDC|TUE|TME|AUD|ADD)[12]?[A-Z0-9]/, brand: "Trane", equipment: "Gas Furnace", series: "Trane/American Standard gas furnace (legacy lettered platform)", notes: [] },
  { re: /^4TT[RXBZV][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane AC condenser (4TTR/4TTX; 4TTV = XV18/XV20i variable-speed)", notes: ["Condensing unit installer's guide is in Manuals → Trane.", "4TTV variable-speed units are communicating — codes surface on the thermostat/Diagnostics app, not a flash LED."] },
  { re: /^4TW[RXBZV][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane heat pump (4TWR/4TWX; 4TWV = XV18/XV20i variable-speed)", notes: ["4TWV variable-speed units are communicating — codes surface on the thermostat/Diagnostics app, not a flash LED."] },
  { re: /^4A7|^4A6/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "American Standard AC/heat pump", notes: ["American Standard = Trane."] },
  { re: /^(TEM[3468]|TAM[4-9]X?|GAM[45]|TMM[45])/, brand: "Trane", equipment: "Air Handler", series: "Trane/American Standard air handler", notes: [] },
  // Prior-generation air handlers, confirmed against Trane's own product
  // literature (4TEC3F installer's guide 22-1774-18, TWE product data
  // 22-1655-08): 4TEC convertible and TWE modular variable-speed.
  { re: /^4TEC[0-9]|^TWE[0-9]/, brand: "Trane", equipment: "Air Handler", series: "Trane/American Standard air handler (4TEC convertible / TWE variable-speed — prior generation)", notes: [] },
  // Trane/American Standard packaged units + coils — confirmed families, no
  // prior coverage at all for this equipment class under this brand.
  { re: /^4[TWY]C[CYZ][0-9]|^4DC[YZ][0-9]|^4WHC[0-9]/, brand: "Trane", equipment: "Other", series: "Trane/American Standard packaged unit (gas-electric / AC / heat pump)", notes: [] },
  { re: /^[YWT][SH]C[0-9]/, brand: "Trane", equipment: "Other", series: "Trane / American Standard Precedent light-commercial packaged rooftop, 3-10 ton - YSC/YHC gas-electric, WSC/WHC heat pump, TSC/THC electric-cool (second letter S = standard eff, H = high eff)", notes: ["Single-package commercial RTU. Tonnage digits: 036=3t, 048=4t, 060=5t, 072=6t, 090/092=7.5t, 102=8.5t, 120=10t. 3-phase power is typical - meter before assuming voltage.", "Control is ReliaTel on the field population: the RTRM green System LED blinks twice (1/4-sec) every 2 seconds when a fault is latched; the specific fault is spread across the module LEDs (RTRM / RTOM / economizer RTEM / ignition IGN), not one numeric table. Economizer RTEM flash codes: 1=actuator, 2=CO2, 3=return humidity, 4=return temp, 6=outdoor humidity, 7=outdoor temp, 8=mixed-air temp. The ReliaTel Diagnostic Manual (RT-SVD03G-EN) is in Manuals -> Trane.", "Units built 2023+ use the newer Symbio 700 digital controller instead of ReliaTel - identify the board before troubleshooting; Symbio reports on a display/app, not LED flash counts.", "Trane refreshed the Precedent line to R-454B in 2024-25; older field units are R-410A."] },
  { re: /^4[TP]XC|^4AXA|^4PXFH/, brand: "Trane", equipment: "Air Handler", series: "Trane/American Standard evaporator coil", notes: ["Metering device decides the charging method: piston/fixed orifice = charge by SUPERHEAT (chart method in the Charging Calc), TXV = charge by SUBCOOLING. Check which this coil actually has."] },
  { re: /^(M5THS|MSTHS|4TXK|4MXW)/, brand: "Trane", equipment: "Mini-Split", series: "Trane ductless mini-split", notes: ["E/P error code table is in Error Codes.", "No official Trane source confirms this is a Mitsubishi-built platform, despite that being commonly repeated — treat that claim as unconfirmed."] },
  // --- Trane / American Standard R-454B (A2L) "5-series" — the A2L transition flips the leading model digit 4→5 (4TTV8→5TTV8, 4A7A7→5A7A7) ---
  { re: /^5T[TW][RVXBZ][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane R-454B split system — 5TTR/5TTV air conditioner, 5TWR/5TWV heat pump (R-454B successor to the 4TTR/4TWR line; 5TTV8 = variable-speed Premier, 5TWR7 = Priority 17)", notes: ["R-454B (A2L). Variable-speed (…V…) units are communicating — codes surface on the thermostat / Trane Diagnostics app, not a flash LED.", "The matched indoor coil/air handler carries the A2L leak sensor + Mitigation Control Board (MCB); on a leak the MCB forces a blower/compressor override. Trane has not published a numeric MCB fault-code table as of this writing — work the leak sensor and MCB per the install manual."] },
  { re: /^5A[67][A-Z0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "American Standard R-454B split system — 5A6 heat pump / 5A7 air conditioner (R-454B successor to 4A6/4A7; 5A6V0/5A7V0 = variable-speed Platinum 20)", notes: ["American Standard = Trane. R-454B (A2L). Variable-speed (V) units are communicating — codes report on the thermostat / Diagnostics, not a flash LED.", "Matched indoor unit carries the A2L leak sensor + Mitigation Control Board."] },
  { re: /^5HCL[0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane 5HCL low-profile R-454B heat pump (pairs with the 5TDM5 low-profile air handler)", notes: ["R-454B (A2L). Low-profile platform — pairs with the 5TDM5 air handler."] },
  { re: /^(5TEM|5TDM|5TAM)[A-Z0-9]/, brand: "Trane", equipment: "Air Handler", series: "Trane/American Standard R-454B air handler — 5TEMC variable-speed convertible, 5TDM5 low-profile, 5TAMX (American Standard Forefront Platinum)", notes: ["R-454B (A2L). Factory A2L leak sensor + Mitigation Control Board (MCB). On a leak the MCB overrides blower/compressor — a blower running with no call can be the RDS, not a fault.", "Product data (5TEMC AHR-PSD012B, 5TDM5 AHR-PSD016A) is in Manuals → Trane."] },
  { re: /^5[YW]C[CZ][0-9]/, brand: "Trane", equipment: "Other", series: "Trane R-454B packaged unit — 5YCC single-stage gas/electric (Choice 14), 5WCZ5 two-stage heat pump (Priority 15), 2–5 ton", notes: ["R-454B (A2L). Packaged unit — carries the A2L leak sensor + Mitigation Control Board.", "Work refrigerant faults from the unit's own service literature."] },
  // --- York / JCI family ---
  { re: /^DGA[AH]/, brand: "York", equipment: "Gas Furnace", series: "York/Coleman DGAA/DGAH mobile-home furnace", notes: ["Its flash-code table is in Error Codes; service manual in Manuals → York."] },
  { re: /^TM9V|^TM9E|^TM8|^TG9S|^TG8S/, brand: "York", equipment: "Gas Furnace", series: "York/Luxaire/Coleman TM/TG gas furnace", notes: ["TM9V install manual is in Manuals → York."] },
  { re: /^YC[JGESD]|^YFK|^YCG/, brand: "York", equipment: "Condenser/Heat Pump", series: "York AC condenser", notes: [] },
  { re: /^Y[HZ][JGEF]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York heat pump", notes: [] },
  // York/Luxaire/Coleman "Stellar"-era HDB condensing units (H*DB012-060, 1-5 ton)
  // and their H*RA heat-pump twin. Confirmed against York Technical Guide
  // 550.38-TG2Y (in Manuals → York). Legacy R-22, no diagnostic board.
  { re: /^H[0-9]DB[0-9]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York/Luxaire/Coleman HDB-series split-system AC condensing unit (Stellar era, e.g. H1DB018S06 = 1.5 ton)", notes: ["Legacy R-22 unit - NO fault-code board. The outdoor box is a contactor, run capacitor and internal compressor protection (high-pressure relief valve + temp sensor) only. Diagnose mechanically; work it with the AC scenarios in Diagnostic Help.", "Charge target (per the tech guide): 15 deg superheat / 15 deg subcooling at the condenser. Over 20 deg subcooling drives condensing temp too high; keep condensing temp under 140 deg F.", "Capacity from the model: 012=1t, 018=1.5t, 024=2t, 030=2.5t, 036=3t, 042=3.5t, 048=4t, 060=5t. The H1DB / H2DB digit is a design series, not tonnage.", "Common field accessories: Start-Assist / Hard-Start kit for low-voltage starting, and a 5-minute off-cycle timer to stop short-cycling.", "Technical Guide 550.38-TG2Y is in Manuals → York. York/JCI publish no public serial-date decode - use the JCI serial lookup for age."] },
  { re: /^H[0-9]RA[0-9]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York/Luxaire/Coleman HRA-series split-system heat pump (Stellar era, the heat-pump twin of the HDB air conditioner, e.g. H1RA018S06)", notes: ["Legacy R-22 unit - NO fault-code board. Outdoor box is contactor, capacitor, reversing valve and a defrost control only. Diagnose mechanically; use the heat-pump scenarios in Diagnostic Help.", "Charge target: 15 deg superheat / 15 deg subcooling (verify against the rating plate, and charge in cooling). Capacity code: 018=1.5t, 024=2t, 030=2.5t, 036=3t, 042=3.5t, 048=4t, 060=5t.", "The HDB Technical Guide (550.38-TG2Y, in Manuals → York) covers the shared platform. York/JCI publish no public serial-date decode."] },
  // --- Added from Tag Scanner telemetry misses (v139, 2026-08-24) ---
  // York/JCI/Guardian RAC (AC) and RHC (heat pump) value-series split systems.
  // David scanned RAC13L30B23S; RAC13J...S21 is sold under both York and Guardian.
  { re: /^RAC[0-9]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York/Guardian (Johnson Controls) RAC-series single-stage AC condenser (e.g. RAC13 = 13 SEER R-410A; sold under the York and Guardian value badges)", notes: ["Single-stage R-410A value unit - NO diagnostic board. Contactor, run capacitor and pressure switches only; diagnose mechanically with the AC scenarios in Diagnostic Help.", "Charge by subcooling to the rating-plate target (TXV). Capacity digits = tons: 18=1.5t, 24=2t, 30=2.5t, 36=3t, 42=3.5t, 48=4t, 60=5t (RAC13L30 = 2.5 ton).", "RHC is the heat-pump twin. York/JCI publish no public serial-date decode."] },
  { re: /^RHC[0-9]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York/Guardian (Johnson Controls) RHC-series single-stage heat pump (the heat-pump twin of the RAC air conditioner, R-410A)", notes: ["Single-stage R-410A value unit - NO diagnostic board beyond a defrost control. Use the heat-pump scenarios in Diagnostic Help.", "Charge by subcooling to the rating plate (charge in cooling). Capacity digits = tons: 18=1.5t … 60=5t."] },
  // Goodman/Amana/Janitrol CK-series legacy R-22 split AC condenser (CK/CKL/CKJ,
  // 10 SEER, 1.5-5 ton). Scanned as CK30-1B; still common in older homes.
  { re: /^CK[JL]?[0-9]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana/Janitrol CK-series legacy R-22 split AC condenser (CK / CKL / CKJ, 10 SEER, 1.5-5 ton; e.g. CK30-1B = 2.5 ton)", notes: ["Legacy R-22 unit - NO diagnostic board. Contactor, run capacitor and internal compressor protection only; diagnose mechanically.", "Capacity code: CK18=1.5t, CK24=2t, CK30=2.5t, CK36=3t, CK42=3.5t, CK48=4t, CK60=5t. The trailing -1 / -1A / -1B / -1D is the revision.", "CKJ = Janitrol badge, CKL = low-profile cabinet; same platform. Goodman service manual RS6100004 covers the CK line."] },
  // Carrier Infinity 48XZ residential DUAL-FUEL (hybrid heat) PACKAGED unit -
  // heat pump + gas furnace in one cabinet. Jon scanned 48XZ-060130311 (5 ton).
  { re: /^48XZ/, brand: "Carrier", equipment: "Other", series: "Carrier Infinity 48XZ dual-fuel (hybrid heat) packaged unit - heat pump + gas-furnace section in one cabinet (Carrier's Infinity packaged line)", notes: ["Communicating Infinity unit - faults report through the Infinity System Control as major.minor status codes, NOT a flash LED. Check the control's fault history first; see Error Codes -> 'Carrier Infinity'.", "It is an all-in-one PACKAGE unit and DUAL FUEL: both the gas-furnace diagnostics AND the heat-pump/AC diagnostics in Diagnostic Help apply. Capacity 060 = 5 ton."] },
  // Air handlers confirmed against JCI's own literature: AHE single-piece
  // 3-position (UIM 697883), AHR technical guide, AVC communicating
  // (york.com), JHET fixed-speed (luxaire.com).
  { re: /^(AH[ERVX]|AV[CV]|MVC|JH[EC])[0-9A-Z]/, brand: "York", equipment: "Air Handler", series: "York/Luxaire/Coleman air handler (AHE/AHR/AHV/AVC/AVV/MVC/JHE/JHC). JHE/JHC are the current R-454B-matched ECM air handlers — the model number encodes the factory A2L leak sensor (…S = sensor present, …N = none)", notes: ["JHE/JHC pair with the R-454B condensers/heat pumps (YC3/YC4/YC6, YH4/YH5); JHC is the communicating variant. JHE tech guide is in Manuals → York."] },
  // Coleman EB-series mobile-home electric furnace (EB10B-EB23B) — the
  // companion to the DGAA/DGAH gas furnaces already covered.
  { re: /^EB[12][0-9][A-Z]/, brand: "York", equipment: "Electric Furnace", series: "Coleman EB-series mobile-home electric furnace", notes: ["Work it with the electric furnace scenarios in Diagnostic Help - sequencers, limits, and element checks all apply.", "Same mobile-home platform as the DGAA/DGAH gas furnaces."] },
  // --- Rheem / Ruud ---
  { re: /^R9[2567][0-9]?[TVMP]/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem/Ruud R9x condensing gas furnace", notes: ["PlusOne 7-segment diagnostics on board; EcoNet-capable models report codes to the EcoNet stat."] },
  { re: /^R80[12][TV]/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem/Ruud 80% gas furnace", notes: [] },
  // Legacy Classic-era furnaces, confirmed against Rheem's own literature
  // (G11-518 RGPH spec, G11-532 RGRA/RGRB, and the pts.myrheem historical
  // IO covering RGRA/RGRB/RGTA/RGRS/RGTS/RGRT).
  { re: /^RG[PRT][AHBST]/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem/Ruud Classic-era gas furnace (RGPH/RGRA/RGRB/RGTA/RGRS/RGTS/RGRT — prior generation)", notes: ["Flash-code board era - the rh-f flash codes in Error Codes apply to most of these controls."] },
  // Ruud's own top ("Ultra"/"Achiever Plus") tier gets a distinct U-prefix not
  // shared with Rheem — everything else Ruud sells uses the SAME R/W-prefix
  // letters as Rheem (no simple letter swap, despite that being commonly
  // assumed — confirmed against rheem.com and ruud.com directly).
  { re: /^U(9[78]M?V|802V)/, brand: "Rheem", equipment: "Gas Furnace", series: "Ruud Ultra Series modulating gas furnace (Rheem platform, Ruud-exclusive tier)", notes: [] },
  { re: /^U[AP](1[3-9]|20)/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Ruud Ultra/Achiever Plus AC or heat pump (Rheem platform, Ruud-exclusive tier)", notes: [] },
  { re: /^RA1[3-9]|^WA1[3-5]|^RA20/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem/Ruud AC condenser", notes: ["Endeavor-line RA14AY / RA15AY (…AY suffix) are R-454B (A2L); the matched coil/air handler carries the PlusOne RDS leak sensor + mitigation board."] },
  // Classic/Value-series R-410A condensers that pre-date the RA-prefix naming
  // (13AJN / 13AJM = 13 SEER, 14AJM = 14.5 SEER; Rheem IO 92-21354-78-02
  // "13 & 14.5 SEER Series Condensing Units"). Seen in the field 2026-08 on a
  // 2013 14AJM30A01 whose bilingual tag also defeated the label reader.
  { re: /^1[34]AJ[MN]/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem Classic/Value Series AC condenser (13AJN/13AJM 13 SEER, 14AJM 14.5 SEER, R-410A, prior generation)", notes: ["Factory-charged R-410A; the tag prints the outdoor-unit charge (e.g. 112 oz) - line-set adders and the matched coil decide the final charge. Install doc 92-21354-78-02."] },
  { re: /^R[PD]1[4-8]|^WP1[4-5]|^WSP?14|^RP(19|20)/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem/Ruud heat pump", notes: ["RP17 install manual is in Manuals → Rheem.","Endeavor-line RP14AY / RP15AY and RD16AY / RD18AY (…AY) are R-454B (A2L). Note RD17AZ is still R-410A — check the model suffix, don't assume A2L from the RD prefix. RP14AY/RP15AY install manual is in Manuals → Rheem."] },
  { re: /^R[HF][12][TVP]|^RB2T|^RHMV|^WH1[TP]/, brand: "Rheem", equipment: "Air Handler", series: "Rheem/Ruud air handler", notes: ["RH2TY (two-stage) / RH2VY (variable, communicating) are the R-454B (A2L) Endeavor air handlers; the model encodes the A2L sensor (blank = factory sensor, L = less sensor). RH2TY tech guide is in Manuals → Rheem."] },
  { re: /^RCF[YZ]?/, brand: "Rheem", equipment: "Other", series: "Rheem/Ruud evaporator coil", notes: ["Metering device decides the charging method: piston/fixed orifice = charge by SUPERHEAT (chart method in the Charging Calc), TXV = charge by SUBCOOLING. Check which this coil actually has.","RCFY is the current R-454B (A2L) coil for the Endeavor line."] },
  { re: /^RQ[NPR]M/, brand: "Rheem", equipment: "Other", series: "Rheem Classic Series packaged heat pump", notes: [] },
  { re: /^(RL[NPK]L|RKNL|RK[KM]A|RGE[ACD])/, brand: "Rheem", equipment: "Other", series: "Rheem / Ruud light-commercial packaged rooftop - RLNL/RLPL Commercial Classic AC (13/14 SEER, R-410A), RLKL Value AC, RKNL gas/electric, RGEA/RGEC/RGED Prestige gas/electric; legacy R-22 RKKA/RKMA", notes: ["Single-package commercial RTU, 3-12.5+ ton, 3-phase. The tonnage TIER is a LETTER after the 4-character family code, not the digits alone: RLNL-A / RLPL-A = 3-5 ton, RLNL-B / RLPL-B = 6-12.5 ton, RLNL-G = 15-25 ton (out of range). Read the tier letter before parsing size.", "Control is the RTU-C (ClearControl) unit controller: a 16x2 LCD with a 5-button keypad that shows plain-language alarm TEXT (e.g. 'HPS Trip C.1' = high-pressure switch trip, circuit 1), NOT a numeric flash-code table. An optional Comfort Alert module adds compressor/phase diagnostics.", "Rheem deliberately keys the high-pressure and low-pressure safety switches with different wire colors AND different connector sizes to prevent cross-wiring between circuits and between HP/LP - do not force a mismatched plug.", "Product/spec data (S11-955, RLNL/RLPL) is in Manuals -> Rheem."] },
  { re: /^(FAH[FSM]W|FSHSR|FPH[SFM]R)/, brand: "Rheem", equipment: "Mini-Split", series: "Rheem Floating Air ductless mini-split", notes: [] },
  // No official Rheem or Ruud source states a serial date-code format — both
  // rheem.com and ruud.com's own "find your serial number" pages show only
  // where the tag is, not how to read it. The commonly repeated WWYY rule
  // (and the equally common MMYY claim) are both unconfirmed either way, so
  // decodeSerialAge deliberately returns nothing for this brand.
  // --- Mitsubishi ---
  { re: /^MSZ|^MFZ|^MLZ|^SLZ|^SEZ|^SVZ|^PKA|^PLA|^PCA|^PEAD|^PVA/, brand: "Mitsubishi", equipment: "Mini-Split", series: "Mitsubishi indoor unit", notes: ["Check indoor LED blink pattern; MXZ outdoor service manual is in Manuals → Mitsubishi."] },
  { re: /^MUZ|^MXZ|^MUFZ|^PUZ|^SUZ/, brand: "Mitsubishi", equipment: "Mini-Split", series: "Mitsubishi outdoor unit — heat pump (MXZ = multi-zone)", notes: ["MXZ service manual with check codes is in Manuals → Mitsubishi.", "Officially confirmed 3rd-letter convention: Z = heat pump, Y = cooling only (e.g. MUZ vs MUY, PUZ vs PUY)."] },
  { re: /^MUY|^PUY/, brand: "Mitsubishi", equipment: "Mini-Split", series: "Mitsubishi outdoor unit — cooling only", notes: ["Cooling-only: no heating mode. Check the indoor head's own capability before assuming heat is available.", "MXZ service manual with check codes is in Manuals → Mitsubishi."] },
  // MVZ multi-position air handler (mylinkdrive/mitsubishicomfort official)
  // and PUMY single-phase multi-zone outdoor (P-series on mylinkdrive).
  { re: /^MVZ[A-Z0-9-]/, brand: "Mitsubishi", equipment: "Air Handler", series: "Mitsubishi MVZ multi-position air handler (ducted indoor for MXZ multi-zone)", notes: ["Pairs with MXZ outdoor units - the MXZ LED1/LED2 codes in Error Codes cover the outdoor side."] },
  { re: /^PUMY[A-Z0-9-]/, brand: "Mitsubishi", equipment: "Mini-Split", series: "Mitsubishi PUMY multi-zone outdoor unit (P-series/CITY MULTI S)", notes: ["Check codes surface on the indoor controllers - see Mitsubishi codes in Error Codes."] },

  // --- Generac air-cooled home standby generators (data-label model forms G0070430 / 007043-0 / 0070430) ---
  { re: /^G0\d{6}$/, brand: "Generac", equipment: "Generator", series: "Generac air-cooled home standby generator", notes: ["G-number form (G0070430) - the same unit prints as 007043-0 on the data tag","Open in Generators for the family: specs, alarm codes, manuals"] },
  { re: /^00\d{4}-\d$/, brand: "Generac", equipment: "Generator", series: "Generac air-cooled home standby generator", notes: ["Data-tag form (007043-0 = G0070430)","Open in Generators for the family: specs, alarm codes, manuals"] },
  { re: /^00\d{5}$/, brand: "Generac", equipment: "Generator", series: "Generac air-cooled home standby generator", notes: ["Data-tag form with the dash dropped (0070430 = G0070430)","Open in Generators for the family: specs, alarm codes, manuals"] },
  { re: /^(52|54|55|57|58|59|60|61|62|64|65|67|69|70|71|72|73)\d{2}$/, brand: "Generac", equipment: "Generator", series: "Generac air-cooled home standby generator", notes: ["4-digit form (7043 = G0070430 / 007043-0)","Open in Generators for the family: specs, alarm codes, manuals"] },
  { re: /^RG0\d{2}/, brand: "Generac", equipment: "Generator", series: "Generac Protector liquid-cooled home standby (RG, 22-80 kW, Evolution)", notes: ["LIQUID-COOLED - it has a radiator, coolant and a water pump; do NOT service it like an air-cooled unit.","RG022 = 22 kW ... RG060 = 60 kW, RG080 = 80 kW. The digits after the kW code are a platform code, not a fuel/voltage value.","Open in Generators for specs, the Evolution alarm/warning codes, startup, and the diagnostic manual."] },
  { re: /^QT\d{3}/, brand: "Generac", equipment: "Generator", series: "Generac Protector QT industrial liquid-cooled (Nexus, 22-150 kW)", notes: ["Industrial liquid-cooled genset on the Nexus 2-line-LCD panel. QT022 = 22 kW ... QT150 = 150 kW.","Open in Generators for the Nexus named-alarm list, startup, and manuals.","This industrial Nexus is NOT the residential air-cooled Nexus - the fault codes differ."] },
  { re: /^SG\d{3}/, brand: "Generac", equipment: "Generator", series: "Generac SG industrial spark-ignited gaseous (H-100, 35-150 kW)", notes: ["Industrial spark-ignited gaseous genset on the H-100 dual-LCD control panel. SG035 = 35 kW ... SG150 = 150 kW.","Open in Generators for the H-100 alarm channels, startup, and manuals.","Not a Lennox SG rooftop: Generac SG is followed by DIGITS (SG035); Lennox Strategos is SG followed by a letter (SGH)."] },
  // --- end Generac ---
  // --- coverage:york (v123) ---
  { re: /^Y[XZ]V[0-9]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York YXV / YZV Affinity, Coleman AC21, Luxaire AL21 - variable-capacity inverter split system, up to 20 SEER, R-410A", notes: ["Two separate fault systems on one unit. The OUTDOOR CONTROL board scrolls plain-English TEXT banners on the outdoor display (no numbers); the INVERTER DRIVE board flashes NUMERIC blink counts on LED602/603/604. Both tables are in Error Codes.","On the outdoor control, a solid RED LED1 means a fault is present; yellow is the normal status heartbeat.","Read faults from the outdoor display: Menu > MODES > FAULT MODE > CURRENT SYSTEM FAULTS. STORED SYSTEM FAULTS keeps the 10 most recent.","Charge Verification mode on the outdoor display gives live superheat, subcool, compressor RPM, EEV step and input watts without hooking up gauges.","Nomenclature YXV36B21SA: Y=York, X=premium AC (Z=premium heat pump), V=20 SEER modulating, 36=capacity MBH code, B=R-410A, 2=208/230-1-60, 1=generation, S=standard (H=hard start kit), A=style letter.","Needs an Hx wi-fi communicating thermostat plus a matched AVV air handler or CM coil for full communicating operation."] },
  { re: /^Y[XZ]T[0-9]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York YXT / YZT, Coleman AC19, Luxaire AL19 - 19 SEER two-stage split system, R-410A", notes: ["Real 2-digit NUMERIC codes on a pair of 7-segment displays, not flash counts - the table is in Error Codes.","Set the thermostat to SYSTEM OFF, then press the board push-button 2-6 seconds to show current and stored faults; hold it over 6 seconds with no call to clear the fault array.","Codes 25, 26 and 30 do NOT clear with the normal reset - they are configuration faults with their own procedure.","Normal standby is a solid green LED at 2 seconds on / 2 seconds off; flashing green is the anti-short-cycle countdown d5 to d1.","The outdoor fan runs 15 seconds before the compressor on every cycle and varies its own speed - that is not a fault."] },
  { re: /^YC[2-6][0-9A-Z]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York YC2D / YC2E / YC2F / YC3 / YC4 / YC6 SEER2 single-stage air conditioner (13.4-16 SEER2), R-410A", notes: ["There are NO electronic diagnostics on this tier - no board, no LED, no fault memory. Confirmed by reading the full install manual. Work it as contactor, capacitor, compressor windings, fan motor and gauges.","Nomenclature YC2E18SB21SA: Y=York, C=air conditioner, 2E=efficiency tier (2D=13.4, 2E=14.3, 2F=15.2 SEER2), 18=capacity code (18=1.5T ... 60=5T), S=single stage, B=R-410A, 2=208/230-1-60, 1=generation, S=standard, A=style.","Charge chart is printed on the unit data plate. Some models need the factory hard-start kit when a field TXV kit is added.","Coleman and Luxaire do NOT sell this tier as YC - they badge it XC3 / XC4 / XC6 and TCD2 / TCE2 / TCF2.","YORK's newest YC3 (13.4) / YC4 (14.3) / YC6 (16 SEER2) are the R-454B (A2L) 'LGWP' successors on this same no-diagnostics outdoor tier — the outdoor unit still has no board, but the MATCHED indoor coil/air handler now carries the A2L leak sensor + mitigation board. YC3/YC4/YC6 install manual and YC4 tech guide are in Manuals → York."] },
  { re: /^YH[2-6][0-9A-Z]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York YH2E / YH-series SEER2 single-stage heat pump, R-410A (the heat-pump twin of YC2E)", notes: ["Same no-diagnostics platform as the YC single-stage air conditioners - defrost control only, no fault code table.","The H product-type letter is inferred from York's own AC/HP letter pattern (C=AC, H=heat pump, X=premium AC, Z=premium HP); a YH2E-specific nomenclature chart was not located.","YH4 (14.3) / YH5 (15.2 SEER2) are the R-454B (A2L) successors on this tier — outdoor unit is still defrost-control-only, but the matched indoor unit carries the A2L leak sensor + mitigation board. YH4 install manual and YH5 tech guide are in Manuals → York."] },
  { re: /^(TC[DEF]2|XC[346]|CC17|TC17|AC(19|21)|AL(19|21))[0-9A-Z]/, brand: "York", equipment: "Condenser/Heat Pump", series: "Coleman / Luxaire split system - XC3 / XC4 / XC6 and TCD2 / TCE2 / TCF2 single-stage (York YC-tier), CC17 (Coleman) / TC17 (Luxaire) legacy 2-stage, AC19 / AC21 (Coleman) and AL19 / AL21 (Luxaire) flagship 2-stage and variable", notes: ["Coleman and Luxaire do not simply relabel York's model prefixes on this line - the prefixes are genuinely different, so the same hardware appears under three unrelated names.","AC21 / AL21 are the Coleman/Luxaire names for York's YXV / YZV variable-capacity platform; AC19 / AL19 are the YXT / YZT 19 SEER two-stage platform. Use those York families in Error Codes.","XC3 / XC4 / XC6 and TCD2 / TCE2 / TCF2 are the YC single-stage tier - no electronic diagnostics at all.","The legacy 2-stage tier is NOT shared: Coleman calls it CC17, Luxaire calls it TC17.","Trap: this is not Lennox. Lennox XC13 through XC25 always have TWO digits after XC; the York-family prefixes are XC3 / XC4 / XC6 with a single digit."] },
  { re: /^T[CH][GJ][DF][0-9A-Z]/, brand: "York", equipment: "Other", series: "Coleman / Luxaire packaged unit - TCGD / TCGF / TCJD / TCJF gas-electric and AC, THGD / THGF / THJD / THJF heat pump (York badge = YCJD / YCJF / YHJD / YHJF)", notes: ["Same equipment as the York YCJ / YHJ packaged line already in the scanner, sold under the Coleman and Luxaire badges.","No package-unit-specific code table was sourced in this pass - see the generic packaged-unit scenarios in Diagnostic Help."] },
  { re: /^T[CH][34]B[0-9A-Z]/, brand: "York", equipment: "Condenser/Heat Pump", series: "Coleman / Luxaire TC3B / TC4B air conditioner and TH3B / TH4B heat pump (13-14 SEER prior generation)", notes: ["Prior-generation Coleman/Luxaire split systems; no dedicated fault-code table was sourced for them in this pass.","Trap: this is not the Nortek *T-series (FT4B / DT4B / JT5B) - those have the family letter in position 1 and a T in position 2."] },
  { re: /^P[CGDH][35][0-9]/, brand: "York", equipment: "Other", series: "York / Coleman / Luxaire (Johnson Controls Ducted Systems) R-454B packaged unit — PC (AC + optional electric heat), PH (heat pump + electric), PG (AC + gas heat), PD (heat pump + gas heat); tier digit 3 = 13.4 SEER2, 5 = 15.2 SEER2, 2–5 ton", notes: ["R-454B (A2L). Carries a Mitigation Control Board (RDS) with an A2L leak sensor near the coil drain pan. Board RED LED: slow 2s-on/2s-off = normal; 2 flashes + buzzer = refrigerant leak above 15% LFL (ventilate, find/repair the leak — the sensor also trips on gas/propane, so check gas piping too); 3 flashes + buzzer = refrigerant sensor failure (cycle power, else replace the sensor); 4 flashes + buzzer = sensor comms lost (check the A2L sensor plug/cable at the board); solid red = board failure.", "On a leak the board intercepts thermostat calls and forces a mitigation response (blower on, compressor held off) — a blower running with no call can be the RDS doing its job, not a fault. Stored codes persist 30 days: hold the board push-button 2–5 s to display, >5 s to clear (only with no active fault).", "Install manual (PC3 series) is in Manuals → York."] },
  { re: /^(HMH[0-9]|HMCG[0-9]|H[CH][0-9]{3}[A-Z])/, brand: "York", equipment: "Condenser/Heat Pump", series: "York / Coleman / Luxaire horizontal (side) discharge inverter outdoor unit - HMH7 modulating heat pump, HMCG2 modulating air conditioner, HH8 / HC8 R-454B multi-speed", notes: ["All three families print the SAME numeric outdoor-unit fault table (codes 1-97) - it is in Error Codes as one family. Codes 22 and 97 are heat-pump only; code 16 is a cooling-overload code.","Where the code appears depends on size. 24k/36k HMH7 and HMCG2 show it on LED1 (tens) + LED2 (ones) on the main board; HH8 and the 48k/60k units show it on a 7-segment display. Query parameter P.0 to read the active code.","LED3 changes what LED1/LED2 mean: LED3 ON = the blink count is a DRIVE fault (separate table in Error Codes), LED3 flashing with LED1/LED2 off = compressor preheat, all three off = no fault.","Nomenclature HMCG22B241S: H=horizontal discharge, M=modulating (1/2/3=stages, V=variable), C=air conditioner (H=heat pump), G2=16 SEER2 efficiency series, 2=208/230-1-60, B=R-410A (D=R-454B), 24=2 ton, 1=generation, S=standard control (C=communicating, B/W=wireless).","HH8 uses the newer positional form HH824E2S11: H=horizontal, H=heat pump, 8=18 SEER2, 24=2 ton, E=R-454B, 2=208/230-1-60, S=standard control, 1=factory option, 1=generation, A=style.","HH8 is R-454B (A2L) - it has a refrigerant detection system, and its LED1 is read as a reflection off the delta plate. No 4-ton model exists; a 5-ton HH860 is set to lower-capacity mode for 4-ton jobs.","Setback clearance is only 8 inches on the side-discharge cabinets, versus about 24 inches for a conventional top-discharge unit."] },
  { re: /^TM9[YTM]|^TML[VTX]|^TL[89]E/, brand: "York", equipment: "Gas Furnace", series: "York / Coleman / Luxaire TM9Y / TM9T / TM9M (96% two-stage standard ECM), TMLV / TMLT / TMLX (80% Low-NOx two-stage variable speed), TL8E / TL9E (80% / 95% single-stage Ultra Low NOx) gas furnace", notes: ["Same standard Integrated Furnace Control and the SAME 1 to 13 red-flash table as TM8 / TM9V / TM9E - see the York UTEC integrated furnace control family in Error Codes.","TMLV is the 80% Low-NOx version of TM8V and ships under the same install manual and document number.","The LAST ERROR button flashes the 5 most recent stored codes, newest first, with a 2 second gap. Two green flashes means the memory is empty; hold the button over 5 seconds to clear it (3 green flashes confirms).","Flame sense reference: about 3.7 microamps DC normal, warning starts at 1.5 microamps, lockout at 0.1 microamps.","A T-prefix model number does NOT identify the badge - the same manual covers York (Y), Coleman (C) and Luxaire (L) versions.","TM9M / TM9T / TMLT / TMLX added from the York LX Series brochure (yorknow.com tm9ybrochure.pdf) - same LX standard-IFC board family"] },
  { re: /^Z[89][EV][ST][0-9A-Z]/, brand: "York", equipment: "Gas Furnace", series: "Coleman / Luxaire Z8ES / Z8ET / Z8VT (80% AFUE) and Z9ES / Z9ET / Z9VT (96-97% AFUE) gas furnace - badge-exclusive naming for the TM/TL platform", notes: ["Coleman and Luxaire sell this platform under their own Z8 / Z9 names alongside the shared TM / TL prefixes. Third letter: E=standard ECM, V=variable speed; fourth letter: S=single stage, T=two stage.","Standard Integrated Furnace Control - use the York UTEC integrated furnace control family in Error Codes, not the modulating table."] },
  { re: /^[YCLT]P(9C|LC)[0-9A-Z]/, brand: "York", equipment: "Gas Furnace", series: "York YP9C / YPLC, Coleman CP9C / CPLC, Luxaire LP9C / LPLC, shared TP9C / TPLC - modulating ECM gas furnace (up to 98% AFUE, and the 80% Low-NOx twin)", notes: ["This board does NOT use the same flash table as the TM/TL standard IFC furnaces. It is a separate family in Error Codes - 6 red flashes here is a GAS VALVE COMMUNICATION error, not the pressure-switch cycling fault it means on the standard board.","Amber flashes on this board are capacity-reduction warnings, not lockouts: 4 amber = circulating air restriction, 5 amber = vent or combustion air restriction (also normal above 4000 ft).","Normal idle is ONE green flash. Two green flashes means the error memory is empty; three means it was just cleared. Rapid green is factory speed-up test mode - cycle power to exit.","Normal firing sequence: inducer proves airflow, igniter heats 17-20 s, valve opens at 70 percent for 30-45 s, drops to the 35 percent minimum, then modulates 35-100 percent. Stepping down mid-call is normal behavior, not short cycling.","The Y / C / L / T first letter is only the badge - all four are the same furnace and the same install manual."] },
  { re: /^G[YMF]9S[0-9]{3}[A-Z][0-9]{2}/, brand: "York", equipment: "Gas Furnace", series: "York GY9S / Luxaire and Coleman GM9S / GF9S - legacy 91-94% AFUE tubular heat exchanger condensing furnace (40-135 MBH, upflow UP and downflow-horizontal DH)", notes: ["YORK GM9S IS NOT GOODMAN GM9S. York's layout is GM9S + 3-digit input MBH + cabinet letter + 2-digit airflow code, e.g. GM9S080C16UP11 or GY9S120D20UP11. Goodman's is GM9S + 6 or 7 digits, e.g. GM9S800603AN. If digit 8 of the model is a LETTER it is the York furnace.","Decode: GY9S 080 C 16 UP 11 = 80,000 BTU/h input, cabinet C (21 in), 1600 CFM blower, UPflow (DH = downflow/horizontal), style 11.","Single tri-color LED behind a clear view port in the blower compartment door. Its table is a SEPARATE family in Error Codes - it is close to, but not the same as, the newer TM/TL table (5 red is the manual-reset rollout here, 11 red is a limit open over 5 minutes, and there is a rapid-red twinning code).","The board has a LAST ERROR button that replays up to five stored codes with no active thermostat call.","Faults 6, 7 and 8 are soft lockouts - a watchdog circuit restarts the furnace automatically after 60 minutes, which is why the customer says heat came back on its own.","Air temperature rise by model: 35-65 F on the 40 MBH, 40-70 F or 45-75 F on the rest - read the rating plate. Manifold 3.5 in wc natural / 9.8 in wc LP at sea level; inlet 4.5-10.5 in wc natural, 8.0-13.0 in wc LP."] },
  { re: /^(PS9|FC9S|FL9S)[A-Z][0-9]{2}N[0-9]{3}/, brand: "York", equipment: "Gas Furnace", series: "York Affinity PS9 / Coleman FC9S / Luxaire FL9S - legacy 92-94% AFUE single-stage condensing furnace (40-135 MBH input, upflow UP and downflow-horizontal DH)", notes: ["Decode: PS9 C 16 N 100 UP 11 = cabinet C (21 in), 1600 CFM blower, N = natural gas, 100,000 BTU/h input, UPflow (DH = downflow/horizontal), style 11. Note the capacity sits AFTER the gas letter on this family, unlike GY9S.","Same tri-color LED board and the SAME flash table as the GY9S / GM9S family - one family covers both in Error Codes.","Air temperature rise 35-65 F on the 40 MBH, 40-70 F or 45-75 F on the rest; AFUE 92 percent except 94 percent on the 40 MBH.","PS9 is the York Affinity badge of this platform; FC9S and FL9S are the same furnace and share the install manual."] },
  { re: /^P[123]UR[A-Z][0-9]{2}N[0-9]{5}/, brand: "York", equipment: "Gas Furnace", series: "York Diamond 90 P1UR / P2UR / P3UR - 92-94.3% AFUE tubular heat exchanger upflow condensing furnace (40-140 MBH input / 37-130 MBH output)", notes: ["The D in a model like P3URD20N13001 is the CABINET letter, not part of the family name - P3URD, P3URC, P3URB and P3URA are all the same P3UR family.","Decode: P3UR D 20 N 13001 = 3rd generation Diamond 90, cabinet D (24-1/2 in), 2000 CFM blower, N = natural gas, 130 MBH OUTPUT (140 MBH input), style 01.","This board is OLDER than the GY9S/PS9 board and uses a DIFFERENT table - single-color LED, so there are no red/green/amber colors to count. CONTINUOUS FLASH and STEADY ON both exist and mean different things. Separate family in Error Codes.","11 flashes on THIS board means the rollout jumper soldered into the board is broken or the unit is improperly grounded - it does not mean a limit switch on this family.","Inlet gas pressure range 4.5-10.5 in wc natural, 8.0-13.0 in wc LP.","Input/output pairs from the technical guide: 40/37, 60/55, 80/74 or 76, 100/93 or 94, 120/111, 140/130 MBH."] },
  { re: /^G9T|^FG9/, brand: "York", equipment: "Gas Furnace", series: "Coleman / Luxaire G9T-UP / G9T-DH and FG9-UP - the Coleman and Luxaire badge of the York Diamond 90 P*UR condensing furnace (40-140 MBH input)", notes: ["The install manual is literally titled 'P*UR / G9T-UP / FG9-UP' - same furnace, same single-color LED board, same flash table as the P1UR/P2UR/P3UR family in Error Codes.","No model-number nomenclature legend was published for the G9T / FG9 form; only the family names appear in the shared manual.","Trap: this is not the Nortek G7/G8 furnace family - those have a 7 or an 8 in position 2."] },
  { re: /^Y[89][12]E[0-9A-Z]/, brand: "York", equipment: "Gas Furnace", series: "York Y81E / Y82E (80% AFUE) and Y91E / Y92E (96-97% AFUE) next-generation gas furnace, 2024 and newer", notes: ["GAP: no installation manual or technical guide has been published on any official York host for this line yet - only sell sheets. There is no fault-code table to look up.","The sell sheet says the board has self-diagnostics with a fault code display, but the codes are not published. If you meet one in the field, capture the board part number and the code.","Up to 120 MBH (a 26 MBH option exists for multi-family), 33 in cabinet, 5-speed ECM blower, stainless secondary heat exchanger."] },
  { re: /^AE[0-9]{2}[A-Z]/, brand: "York", equipment: "Air Handler", series: "York / Coleman / Luxaire AE-series standard ECM single-piece multi-position air handler", notes: ["No fault-code system - the AE is a tapped ECM air handler with no diagnostic display. Work it as blower, ECM module, CFM jumpers and heat-kit relays.","Model form AE24B / AE42C / AE48D: prefix, 2-digit nominal capacity code, cabinet letter.","Its variable-speed siblings AVC and MVC also have no code table; only the communicating AVV does - that one IS in Error Codes."] },
  { re: /^(JD[UEP]|JMC|JME|JMET)[0-9]/, brand: "York", equipment: "Air Handler", series: "York / Coleman / Luxaire next-generation air handler - JDU (4-stage), JDE (2-stage), JDP (fixed speed), JMC (constant CFM modular), JME / JMET (modular multi-speed)", notes: ["GAP: no installation manual has been published on an official host for this naming wave - only a JME sell sheet. No fault codes, no nomenclature chart.","These appear alongside AE / AVC / AVV / MVC on the current site and look like their eventual replacement.","JHE / JHC and JHET are handled by the main York air-handler rule above (JHE/JHC are the R-454B-matched units, JHE tech guide is in Manuals → York); this rule picks up the remaining J-series."] },
  // --- end coverage:york ---
  // --- coverage:rheem (v123) ---
  { re: /^R9(2[1]?|5[1]?|6[2]?|7M?|8M?)[TVP]/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem / Ruud PlusOne Diagnostics condensing gas furnace - both naming generations: legacy R92P/R95P/R95T/R96V/R97V/R98V and current R921T/R921V/R951T/R951V/R962V/R97MV/R98MV", notes: ["Codes are in Error Codes under 'Rheem Ruud PlusOne furnace - dual 7-segment display'. The full 39-entry table (status glyphs, d1-d8, 10-14, 22/23/33, 44/45/46/55/57, 60/61/66/68, 77/78, 26/82/93) is the same on both naming generations - fault code label 92-103343-01-00 covers them all.","Clear fault history by toggling dipswitch SW3-6 off/on three full times; two horizontal bars display for 4 seconds to confirm.","The AFUE digits move: R92P became R921V/R921T, R95T became R951T, R96V became R962V, R97V became R97MV, R98V became R98MV. Same furnace tier, same display, same codes.","A Ruud badge does NOT mean a U prefix - Ruud sells R801T/R801V/R802V/R921T/R921V/R951T/R951V/R962V under the Ruud name. Only U97MV and U98MV are Ruud-exclusive U prefixes.","EcoNet-capable models report the same codes in plain text on the thermostat and in the app, with history."] },
  { re: /^[RUW]A(NL|PM)/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem / Ruud / WeatherKing (-)ANL 13 SEER and (-)APM 14.5 SEER R-410A condensing unit (RANL/UANL/WANL, RAPM/UAPM/WAPM)", notes: ["R-410A, not R-22 - the model legend prints L = R-410A. Do not treat this as an R-22 unit because of its age.","No control board and no diagnostic LED - contactor, run capacitor and optional pressure switches only. There is nothing to flash a code.","High pressure control opens at 450 PSIG.","Charging targets from the manual: superheat 12-15 F, subcooling 9-12 F, indoor airflow about 400 CFM per ton.","Read it as (-) A N L - 024 J A Z: brand letter, A = remote condensing unit, N = standard efficiency / P = high efficiency, L = R-410A, three digits = BTU/h x 1000, J = 208/230-1-60 (C = 3-phase 208/230, D = 460-3, Y = 575-3), A = full featured, Z = scroll compressor."] },
  { re: /^[RUW]A(JB|KA|LB|MA|MB|NB|PA|WD)/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem / Ruud / WeatherKing Classic-era condensing unit (RAJB/RAKA/RALB/RAMA/RAMB/RANB/RAPA/RAWD and the UA / WA twins)", notes: ["R-22 era. RAMB is the Classic XII Super High Efficiency line, 1.5 to 5 ton, SEER up to 14.3; the RAMB--JAZ/JBZ sub-series has a Copeland Scroll.","No diagnostic board on this generation - do not look for an LED.","Model form RAMB-036JA: three digits = BTU/h x 1000, J = 208/230-1-60 or C = 208/230-3-60, trailing letter = design variation.","Warranty trap: compressor coverage was 10 years (not the usual 5) on RAMA / RAMB / RANB / RAPA and their U and W twins."] },
  { re: /^[RUW]AWL/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem / Ruud / WeatherKing (-)AWL light-commercial air-cooled condensing unit, 6.5 to 20 ton", notes: ["This is a light-commercial tonnage line, not a residential split - expect 3-phase power and a different parts path.","No residential-style diagnostic board is documented for it."] },
  { re: /^[RUW]P(KA|LA|MB|MC|NJ|PA|WC)/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem / Ruud / WeatherKing Classic-era split heat pump (RPKA/RPLA/RPMB/RPMC/RPNJ/RPPA/RPWC and the UP / WP twins)", notes: ["R-22 era, no diagnostic board documented - the outdoor box is a defrost control, contactor and capacitor.","Warranty trap: compressor coverage was 10 years on RPMC / RPNJ / RPPA and their U and W twins, 5 years on the rest."] },
  { re: /^[RUW]PWL/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem / Ruud / WeatherKing (-)PWL legacy split heat pump - defrost control board with two status LEDs", notes: ["Codes are in Error Codes under 'Rheem Ruud WeatherKing (-)PWL heat pump - defrost board LED1 / LED2 pair'. Both LEDs flashing together is NORMAL, not a fault.","The table reads as a PAIR - LED1 state plus LED2 state. Note which LED is which before you read it.","Both LEDs alternating means the 5 minute anti-short-cycle delay is running, not a failure."] },
  { re: /^[RUW]PRL/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem / Ruud / WeatherKing (-)PRL two-stage heat pump on the Comfort Control2 System - ICC board with a dual 7-segment display", notes: ["Codes are in Error Codes under 'Rheem Ruud WeatherKing Comfort Control2 outdoor unit - ICC dual 7-segment'.","The 7-segment codes ONLY exist when the system is wired serial-communicating (R, C, 1-Data, 2-Data). The same unit can be installed with a conventional 24V two-stage stat, and then there are no codes at all.","Read fault history: press TEST and SW2 with insulated probes. Clear it: hold TEST and SW2 for five seconds until the top and bottom segments flash.","A flashing L before a number (L21, L29) is a LOCKOUT, not the live fault - fix the underlying 21 or 29 condition first.","Wire length limits: 100 ft thermostat to indoor unit, 125 ft indoor to outdoor. Indoor transformer 40 VA minimum.","The (-)HPL air handler it pairs with has its OWN Comfort Control2 code table - a different board and different codes."] },
  { re: /^[RUW]G(PH|PJ|PK|LH|LJ|LK|VH|VJ|RA|RC|RJ|RS|RT|TA|TC|TJ|FD)/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem / Ruud / WeatherKing Classic-era gas furnace on the UT Electronic Controls IFC - (-)GPH Silhouette II 80%, (-)GPJ/(-)GPK/(-)GLH/(-)GLJ/(-)GLK/(-)GVH/(-)GVJ, (-)GRC/(-)GTC and (-)GRA/(-)GRJ/(-)GRS/(-)GRT/(-)GTA/(-)GTJ, (-)GFD", notes: ["Codes are in Error Codes under 'Rheem Ruud WeatherKing legacy furnace - UT Electronic Controls IFC (green STATUS + amber FLAME)'. There are TWO LEDs: a GREEN status LED that blinks 1-5, and a separate AMBER flame LED whose off / rapid blink / slow blink / steady-on states are their own table.","This is NOT the app's generic 7-flash Rheem furnace table. That one is a red LED with codes up to 7 including reversed polarity. Look at the board and the LED colour before counting.","Board is UT Electronic Controls 1012-925 (115 VAC igniter) or 1028-928 (spark ignition). Troubleshooting guide form 92-101654-01-00.","Ignition sequence timings the manual prints: 30 s pre-purge, 4 ignition trials with the gas valve energised only 7 s each, 180 s blower and inducer run between the 2nd and 3rd trial, 1 hour lockout after 4 trials, blower on 20 s after burners light, 10 s post-purge, blower off within 3 minutes.","Manifold pressure 3.5 in w.c. natural / 10.0 in w.c. LP, within plus or minus 0.3 in w.c. Inlet 5 in w.c. for adjustment.","Do NOT oil the blower or inducer motor - they are permanently lubricated and adding lubricant voids the warranty.","The brand letter is the first character: RG = Rheem, UG = Ruud, WG = WeatherKing. One manual covers all three."] },
  { re: /^[RUW]GFG/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem / Ruud / WeatherKing (-)GFG Prestige Series 90+ AFUE modulating gas furnace", notes: ["Confirmed as a real, still-warrantied family (Limited Lifetime heat exchanger) by Rheem's own current Residential Limited Warranty, form 92-26150-38-14 - but no installation or service manual for it is reachable on any official host.","The control board and its code table are NOT confirmed for this family. Read the legend on the blower door rather than assuming either the PlusOne 7-segment table or the legacy blink table applies."] },
  { re: /^[RUW]HP[LN]/, brand: "Rheem", equipment: "Air Handler", series: "Rheem / Ruud / WeatherKing (-)HPL Premium and (-)HPN High Efficiency air handler on the Comfort Control2 System", notes: ["Codes are in Error Codes under 'Rheem Ruud WeatherKing Comfort Control2 air handler - ICC 7-segment'. d1 / d4 / d5 / d6 / d7 / d8 are all memory-card or motor-mismatch faults, not motor failures.","Read it as (-) H P L - HM 24 21 J C: H = air handler, P = 16 SEER Premium, L = R-410A, HM = multi-position (upflow / horizontal left from the factory), cabinet 21 or 24, capacity 24 to 60, J = 208/240-1-60, C = equipped with the Comfort Control2 System. No C means no communicating board and no codes.","On Demand Dehumidification airflow reduction: 85% on 2 ton, 80% on 3, 4 and 5 ton."] },
  { re: /^[RUW]H(SL|LL|KL|ML|GL|GM)/, brand: "Rheem", equipment: "Air Handler", series: "Rheem / Ruud / WeatherKing (-)HSL PSC, (-)HLL X-13 constant torque, (-)HKL constant CFM, (-)HML, (-)HGL and (-)HGM multi-position air handler", notes: ["No diagnostic board and no code table on the PSC and X-13 models - do not look for an LED.","Read it as (-) H S L -- HM 18 17 J A: H = air handler, S = standard/PSC or L = high efficiency X-13, L = R-410A, HM = multi-position, capacity digits, cabinet 17 (17.5 in, 600-1200 CFM) / 21 / 24 (24.5 in, 1600-1800 CFM), voltage A = 115-1-60 / J = 208-240-1-60 / D = 480-3-60, A = 1st design.","Capacity trap: on (-)HSL the two digits are the actual BTU/h in thousands. On (-)HLL they are a RANGE - 24 = 18k or 24k, 36 = 30k or 36k, 38 = 30k/36k/42k, 48 = 42k or 48k.","These units have NO internal filter rack - an external base RXHF-17/21/24 or rack RXHF-B17/B21/B24 is required.","Ships with the indoor coil installed and cannot be ordered without one."] },
  { re: /^[RUW]H[AB]L/, brand: "Rheem", equipment: "Air Handler", series: "Rheem / Ruud / WeatherKing (-)HAL PSC and (-)HBL constant torque FRONT RETURN / wall-mount air handler", notes: ["No diagnostic board and no code table.","Configured vertical upflow ONLY - it cannot be installed in any other position.","Read it as (-) H A L -- FR 24 P J N 00 A: A = PSC standard efficiency or B = constant torque high efficiency, L = R-410A, FR = front return, capacity 18/24/30/36, metering P = piston or T = TXV, J = 208/240-1-60, disconnect N = none or B = breaker, then electric heat 00/05/08/10 kW.","Metering letter decides the charging method: P = piston, charge by superheat; T = TXV, charge by subcooling.","Replaced in 2015 by the all-aluminum RF1P / RF1T series, which the app already matches."] },
  { re: /^[RUW]B(EA|EH|HA|HB|HC|HJ|HK|HP)/, brand: "Rheem", equipment: "Air Handler", series: "Rheem / Ruud / WeatherKing Classic-era air handler and electric furnace (RBEA/RBEH/RBHA/RBHB/RBHC/RBHJ/RBHK/RBHP and the UB / WB twins)", notes: ["No diagnostic board on this generation - work it as an electric furnace: sequencers, limits, element and blower checks.","RBHP is the 34 in cabinet constant-torque single-stage model still listed in Ruud's 2014 catalog; the rest are older.","Electric resistance heating element carried a 5 year warranty on this generation (the replaceable fuse link is excluded)."] },
  { re: /^[RUW]H(GE|GF)/, brand: "Rheem", equipment: "Electric Furnace", series: "Rheem / Ruud / WeatherKing (-)HGE / (-)HGF Classic-era electric furnace", notes: ["No diagnostic board - sequencers, limits, elements and the blower are the whole troubleshooting path.","Do not confuse with the (-)HGL / (-)HGM air handlers, which are a different family despite the shared HG."] },
  { re: /^WSA1[3-5]/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "WeatherKing WSA13 / WSA14 / WSA15 single-stage air conditioner (legacy cabinet), 1.5 to 2.5 ton", notes: ["The app's existing WeatherKing rule is ^WA1[3-5] and does not reach WSA14AY - this rule covers the S variant.","WSA14AY is 15.2 SEER2 / 12 EER2, 17.1 to 28.6 kBTU, single-stage, in the legacy iC cabinet.","2025-2026 models carry a Patented Refrigerant Detection System (A2L leak detection) - a leak indication on this unit is a safety event, not a nuisance code."] },
  { re: /^(R(QKA|QLA|QMA|SKA|SMA|RKA|RMA|JKA|JMA|LKA|LMA|KKA|KMA|RCF|REF|RGF|PDC)|U(QKA|QLA|QMA|SKA|SMA|RKA|RMA|JKA|JMA|LKA|LMA|KKA|KMA|RCF|REF|UGF|PDC)|W(QKA|QLA|QMA|SKA|SMA|RKA|RMA|JKA|JMA|LKA|LMA|KKA|KMA|RCF|REF|RGF|PDC))/, brand: "Rheem", equipment: "Other", series: "Rheem / Ruud / WeatherKing Classic-era packaged equipment (RQKA/RQLA/RQMA, RSKA/RSMA, RRKA/RRMA, RJKA/RJMA, RLKA/RLMA, RKKA/RKMA, RRCF/RREF/RRGF, RPDC and the U / W twins)", notes: ["Packaged unit: the whole system is in one cabinet outdoors, so there is no separate indoor blower or coil to check.","No diagnostic board is documented for this generation.","Warranty trap: compressor coverage was 10 years on RQMA / RSMA / RRMA / RJMA / RLMA / RKMA and their U and W twins.","Ruud's gas-pack letter differs from Rheem's: Rheem RRGF, WeatherKing WRGF, but Ruud UUGF."] },
  { re: /^[RUW]O(BC|NC|UC)/, brand: "Rheem", equipment: "Other", series: "Rheem / Ruud / WeatherKing (-)OBC / (-)ONC / (-)OUC oil furnace", notes: ["Oil, not gas - the diagnostics are the oil primary control (lockout, cad cell), not a furnace blink code.","Heat exchanger carried a LIMITED LIFETIME warranty on this family; the oil burner itself carried 3 years."] },
  { re: /^RC(H|CL|CU)/, brand: "Rheem", equipment: "Other", series: "Rheem / Ruud RCH uncased replacement air-handler N-coil and RCCL / RCCU cased coil", notes: ["Coil-only tag: the matched outdoor unit's data plate carries the system charge and electrical data.","Metering device decides the charging method - piston or fixed orifice charges by SUPERHEAT, TXV by SUBCOOLING. Check which this coil actually has.","No diagnostic codes exist for a coil - there is no board."] },
  // --- end coverage:rheem ---
  // --- coverage:trane (v123) ---
  { re: /^5T[TW][ABRVX][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane 5TTR/5TTA/5TTX/5TTV air conditioner and 5TWR/5TWA/5TWX/5TWV heat pump - R-454B 5-series, 13-20 SEER2", notes: ["Digit 1 is the refrigerant: 2=R-22, 4=R-410A, 5=R-454B. A 5T unit is R-454B (A2L) - recover, evacuate and charge with A2L-rated equipment.","Digit 4 is the product family (R=wire top grille, X=WeatherGuard top, V=variable speed, A=light commercial, B=XB). Digit 5 is the SEER2 tier (3=13, 4=14, 5=15, 6=16, 7=17, 8=18, 0=20). Digit 4 is NOT a stage count.","5TTA3/5TTA4 and 5TTR3/5TTR4 are the same physical 13/14 SEER2 units - Trane dual-lists them on paperwork.","5TTV/5TWV (TruComfort) are Trane Link communicating - faults show at the thermostat/Trane Home app, not as an outdoor flash code.","Flash codes for the single-stage 5TWR4/5TWR6/5TWX5/5TWX6 defrost board are already in Error Codes - that table has no 8 FLASH and puts low-ambient lockout at 7.","Subcooling target moves 9-12 F by tonnage - pull the target off that model's Product Data table, not a single shop number."] },
  { re: /^5H[CP]L[0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane / American Standard 5HPL and 5HCL Low Profile side-discharge inverter heat pump (HC = cold climate, HP = standard), R-454B", notes: ["This platform has a real numbered error code display on the outdoor board - the full 58-code table is in Error Codes.","Case matters on that display: uppercase E1/E3 are compressor pressure PROTECTION trips, lowercase e1/e3 are pressure SENSOR faults. Different repair.","One unbranded model number covers both Trane and American Standard on this line - unlike 5TTR vs 5A7A, there is no badge swap here.","Preheat the compressor 8 hours on crankcase heat before the first test run or liquid slugging can wreck it.","SA1-3/SA1-4 select standard / strong / energy saving / self-adaptation mode, SA2-1/2 select the defrost mode, SA2-3/4 select noise reduction - a unit that seems weak, loud or slow to defrost may just be dip-switched.","3 minute anti-short-cycle delay after a power cycle; Trane specifies a thermostat with a 5 minute compressor delay.","Digits 2-3 are the system type (HP=heat pump, HC=cold climate heat pump), digit 4 L=side discharge, digit 5 is the SEER2 tier (9=19)."] },
  { re: /^5A[67]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "American Standard 5A7A/5A7V air conditioner and 5A6H/5A6V heat pump - R-454B twins of the Trane 5TT/5TW line (Gold 17, AccuComfort Platinum 18/20)", notes: ["American Standard swaps the brand digit: Trane 5TTR7 = American Standard 5A7A7, Trane 5TWV8 = 5A6V8. Digit 3 is 7 on AC, 6 on heat pumps.","The wire-top-grille line is badge-swapped, but the Low Profile 5HCL/5HPL line is not - it keeps one model number for both brands.","V8/V0 AccuComfort units are variable speed and communicating - diagnose at the control/thermostat, not at an outdoor LED.","Same refrigerant digit rule as Trane: 4A7/4A6 = R-410A, 5A7/5A6 = R-454B."] },
  { re: /^2T[TW][RB][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane / American Standard Weathertron 2TTR/2TTB condensing unit and 2TWR/2TWB heat pump - legacy R-22, pre-2010", notes: ["Leading 2 = R-22. Same model grammar as the later 4TTR/4TWR R-410A units, so the rest of the tag reads the same way.","R-22 is phase-out - no virgin supply. Price a sealed-system repair against replacement before opening the system.","The legacy single-LED demand defrost board on these is counted in FLASHES PER SECOND, not flash groups - that family is already in Error Codes.","Trane's pre-2010 literature lives in the trane-history section of elibrary.tranetechnologies.com, not the residential-hvac section."] },
  { re: /^5T[AEM]M[456CX]/, brand: "Trane", equipment: "Air Handler", series: "Trane / American Standard 5TAM5 and 5TAMX Hyperion, 5TEM4/5TEM6/5TEMC TruComfort, 5TMM5 - R-454B air handlers", notes: ["Digit 5 is the tier: 4/5/6 = 24V conventional, C and X = communicating (Trane Link / American Standard AccuLink).","Digit 10 is the airflow type: C = constant torque (CTM), V = variable speed. Digit 11 is nominal tons.","American Standard uses the identical 5TEMC/5TAMX numbers - badge only, same platform.","Digit 6 is the cabinet width (B/C/D) - that is what has to match the furnace or coil footprint."] },
  { re: /^P0V0[A-D]/, brand: "Trane", equipment: "Air Handler", series: "Trane P0V0 120V Modular variable speed air handler", notes: ["120 volt unit - do not assume 208/230V at the disconnect before you meter it.","Tag form is P0V0<cabinet>000M<tons>0SDA, e.g. P0V0A000M30SDA = 14.5 in cabinet, 3 ton. Cabinet letters A=14.5, B=17.5, C=21, D=24.5 in.","4-way multi-poise (M) with a variable speed blower - airflow is set at the control, not by tap."] },
  { re: /^5[TPMD]XC|^5AXA|^5PXFH/, brand: "Trane", equipment: "Air Handler", series: "Trane / American Standard 5TXC / 5PXC / 5MXC / 5DXC cased coil, 5AXA uncased coil, 5PXFH horizontal flat coil - R-454B", notes: ["Digit 1 = 5 means R-454B; the same coil families exist as 4TXC/4PXC/4AXA/4PXFH for R-410A.","Metering device decides the charging method - digit 11 is 3 = TXV non-bleed (charge by subcooling) or 6 = FCCV flow control/check valve.","5MXC coils take a separate 5AYTXVH3A R-454B TXV kit when one is required - confirm what is actually in the coil before charging by subcool.","Digit 15 also encodes the plant: A/B/C = Trenton NJ, V/W/X = Vidalia GA.","Digit 4 is the coil feature: C = cased A-coil, A = uncased A-coil, F = cased horizontal flat."] },
  { re: /^5[TWYD]C[CZ][45]/, brand: "Trane", equipment: "Other", series: "Trane / American Standard 5TCC4 AC, 5YCC4/5YCZ5 gas-electric, 5WCC4/5WCZ5 heat pump and 5DCZ5 EarthWise hybrid dual fuel packaged units - R-454B", notes: ["Digit 2 is the type: T = air conditioner, Y = gas/electric, W = heat pump, D = dual fuel. Digit 3 C = convertible, H = horizontal only.","Digit 4 is the tier: C = Choice single-stage, Z = Priority two-stage. Digit 5 is 4 = 14 SEER2 or 5 = 15 SEER2.","Digits 11-13 are the gas heat input in MBH (000 on AC and heat pump models) - that is how you size the burner section from the tag.","5DCZ5 hybrid dual fuel is new this generation: it has both a gas heat section and a heat pump, so a no-heat call can be either side."] },
  { re: /^L8V1/, brand: "Trane", equipment: "Gas Furnace", series: "Trane / American Standard L8V1 80% single-stage variable-speed Ultra-Low NOx gas furnace (California and Colorado)", notes: ["Same 7-segment IFC family as the S-series, but the existing S[89][VXB][12]/L9X1 rule does not reach L8V1.","No DIP switches on this control - everything is set with the Menu and Option buttons. err = active alarm, L6F = last 6 stored faults (hold Option 5 seconds inside L6F to clear), run = Test Mode.","Certified below 14 ng/J NOx for SCAQMD 1111 and SJVAPCD 4905 - a standard-NOx furnace is not a legal swap in those districts.","Typical flame current is 0.75 to 3.0 microamps on this control.","Display shows status, not just faults: IdL idle, HT1 gas heat stage 1, ARF airflow, C0F continuous fan, CL1/CL2 cooling, XP1/XP2 heat pump, dFt defrost."] },
  { re: /^A[45](AC|HP)[0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Ameristar A4AC/A4HP (R-410A) and A5AC/A5HP (R-454B) split system air conditioner and heat pump", notes: ["Brand letter A = Ameristar; digit 2 is the refrigerant generation, 4 = R-410A and 5 = R-454B, the same rule Trane uses in digit 1.","Odd capacity codes just under an even one (A4AC3023 vs A4AC3024) are the small-footprint cabinet of the same nominal tonnage - not a typo and not a different tonnage.","Ameristar is the budget tier of the Trane / American Standard family, assembled in Tyler TX - warranty and registration run through americanstandardair.com.","No Ameristar-specific outdoor fault-code table was located on an official host; work these like the Trane 4TTR/4TWR era boards.","A5AC/A5HP were confirmed from ameristarhvac.com Energy Guide labels only - the A5-series installer's guide is still an open gap."] },
  { re: /^E4HL[0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Ameristar E4HL5 side-discharge inverter heat pump - 15.2 SEER2 / 8.1 HSPF2, 24V", notes: ["24V inverter unit in a side-discharge cabinet - it is an inverter, so do not judge it by contactor-and-run-cap logic.","Two cabinets: 1.5-3 ton is 31.6 x 35.8 x 14.1 in with a 3/4 in vapor line, 3.5-5 ton is 52.4 x 37.4 x 14.4 in with 7/8 in.","Pairs with the E4AH5 air handler; that combination is what the published SEER2 is rated on."] },
  { re: /^E4AH[0-9]/, brand: "Trane", equipment: "Air Handler", series: "Ameristar E4AH5 side-discharge companion air handler (CTM blower, factory TXV)", notes: ["Factory-installed TXV on every size - charge by subcooling.","Tonnage switch on the 3 ton and 5 ton models; set it to the outdoor unit or airflow will be wrong.","Upflow and horizontal right/left only. Field-installed BAYHTR16 electric heat kits.","Constant torque (CTM) motor, not variable speed - static pressure still has to be measured."] },
  { re: /^A[45]AH[0-9V]/, brand: "Trane", equipment: "Air Handler", series: "Ameristar A4AH4 / A4AH5 multi-position air handler and A5AHV variable speed (R-454B generation)", notes: ["A4AH5V and A5AHV are the variable-speed versions; plain A4AH4/A4AH5 are constant torque (CTM).","Flow control varies by model - field TXV on most, orifice on TMM4 and the 4MXC coil, FCCV on one A4AH4. Check the model before choosing subcool or superheat.","Ameristar TMM4/TMM5 air handlers carry no brand letter and are already matched by the Trane/American Standard TMM rule.","All-aluminum coil, insulated galvanized cabinet, approved for manufactured/mobile housing."] },
  { re: /^A801X|^A951X|^A952V/, brand: "Trane", equipment: "Gas Furnace", series: "Ameristar A801X 80%, A951X 95-96% and A952V 96% variable-speed gas furnace - Trane / American Standard integrated furnace control platform", notes: ["A801X has its own 7-segment IFC e-code table in Error Codes - it is the A951X list minus e09, because an 80% furnace has no condensate/inducer pressure switch.","A951X is the same prefix as the Trane / American Standard A951X already in Error Codes - use that table for A951X and A952V.","Button map: err = active alarm, L6F = last 6 faults (hold Option 5 seconds inside L6F to clear), run = Test Mode, Cr = code release number.","Hold Menu + Option together 15 seconds in Idle to reset factory defaults - the display flashes FD three times.","Some A801X sizes have a separate California Low-NOx model number - read the data label, not the sell sheet."] },
  { re: /^4[TWY]CA4/, brand: "Trane", equipment: "Other", series: "Ameristar 4TCA4 AC, 4WCA4 heat pump and 4YCA4 gas/electric packaged unit - 13.4 SEER2 / 6.7 HSPF2, R-410A", notes: ["Do not confuse with the Trane 4TCC/4WCC/4YCC packaged rule - Ameristar puts A in digit 4 where Trane puts C/Y/Z.","Rotary compressor on the 2 and 2.5 ton sizes, scroll from 3 ton up - start-component diagnosis differs.","Small footprint for tight lot lines and manufactured homes; assembled in Vidalia GA.","4YCA4 gas/electric was still listed COMING SOON on the 2023 sell sheet - confirm the unit shipped before ordering parts to that number."] },
  { re: /^4MXC/, brand: "Trane", equipment: "Air Handler", series: "Ameristar 4MXC multi-position cased evaporator coil - orifice flow control", notes: ["Orifice, not TXV - charge these by superheat.","The Ameristar 4AXA uncased all-aluminum coil is already matched by the Trane / American Standard coil rule; only 4MXC needed a rule of its own.","Cooling and heat pump compatible, approved for manufactured/mobile housing.","Do not read this as the Trane 4MXW mini-split prefix - different product."] },
  // --- end coverage:trane ---
  // --- coverage:bryant (v123) ---
  { re: /^11[3-6][A-Z]NA/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant Legacy Line single-stage AC with Puron - 113ANA / 114CNA / 116BNA", notes: ["No diagnostic LED and no code board on this class - the outdoor unit is contactor and relay only, so there is nothing to flash a code.","Read it as 1(AC) 1(Legacy Line tier) SEER-digit MajorSeries N(208-230-1) A(dense grille) then 3-digit capacity 018-060.","Tier digit is position 2: 1 = Legacy Line, 2 = Preferred, 8 = Evolution. Do not read the first three digits as SEER."] },
  { re: /^12[3-7][A-Z]N/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant Preferred Series AC with Puron - 123A / 126B / 126C / 127A", notes: ["No diagnostic LED on this class - no code table applies.","127A is the two-stage scroll model of the group (up to 17 SEER); 123A is the 13 SEER entry.","Tier digit 2 = Preferred. Full catalog-number tail is not documented on an official host - confirm capacity off the rating plate."] },
  { re: /^(BA|CA)13N[A-Z]/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant BA13NA / CA13NA 13 SEER single-stage AC with Puron", notes: ["Older naming generation than the 1xx/2xx numbering - same platform, no diagnostic LED.","BA13/CA13 then N (208/230-60-1) then Major Series letter then capacity 018-060, then variation: G = dense grille copper coil, L = dense grille aluminum coil, N = northern region.","Aluminum-coil (L) versions phased in March 2021 through February 2022 - coil metal changes the repair, check the tag."] },
  { re: /^21[45][A-Z]{1,2}N/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant Legacy Line heat pump with Puron - 215BNA / 214DNC (215SAN is caught by the older Bryant rule above)", notes: ["No diagnostic LED documented on this class.","Layout is 2(HP) 1(Legacy Line) 5(14.3 SEER2) then OD design type, Major Series, voltage N, then capacity 018-060 with no separator - use fixed-width, not a delimiter split.","Suction accumulator and loss-of-charge switch are standard - a no-heat with an open LOC is a charge problem, not a board problem."] },
  { re: /^22[56][A-Z]N/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant Preferred Series heat pump with Puron - 225BNA / 226A / 226C", notes: ["225B is single-stage; 226A and 226C are the two-stage scroll siblings.","No diagnostic LED - high-pressure switch, loss-of-charge switch and crankcase heater are the only protection devices.","Capacity codes on this family include 037 and 061 alongside the usual 018-060."] },
  { re: /^(180C|280A)NV/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant Evolution Extreme variable-speed AC/HP, first generation - 180CNV / 280ANV (VFD inverter scroll)", notes: ["Codes are read as a two-digit flash on the amber status LED at the outdoor board, or off the Evolution wall control - see Error Codes under 'Bryant Evolution Extreme 180CNV / 280ANV'.","Short flashes are the first digit, long flashes the second: 3 short then 2 long is code 32.","LED continuously flashing means Emergency Mode - a plain thermostat is installed instead of an Evolution control, so the unit runs fixed nominal capacity only.","TRAP: these numbers are NOT the Carrier 24VNA9/25VNA8 numbers. Code 49 here is a 230VAC dropout, not an over-current, and this board has no fan-inverter codes at all."] },
  { re: /^(186C|284A)NV/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant Evolution Extreme variable-speed AC/HP, second generation - 186CNV / 284ANV (PCM + VFD, Bluetooth)", notes: ["Different code scheme from 180CNV/280ANV: two-part base-expansion codes (for example 31-58) reported by the wall control - see Error Codes under 'Carrier Greenspeed PCM/VFD platform'.","Position 13 is the compressor build: F = variable-speed rotary, E = variable-speed scroll. Parts differ.","Bluetooth module feeds the Bryant Service Tech App - recent fault codes and reprogramming come from there, not from a flash count.","Model plug lives on the PCM and must be present at power-up; installing one with power on will not clear a 25-62."] },
  { re: /^(189B|288B)NV/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant Evolution V variable-speed AC/HP - 189BNV / 288BNV (inverter, 18-19 SEER tier)", notes: ["Evolution V is the smaller-cabinet inverter tier below Evolution Extreme - do not read 186B, 186CNV and 189BNV as the same product.","Layout: product digit, 8 = Evolution tier, SEER digit, B = Puron, N = 208-230-1, V = variable speed, then capacity.","Fault reporting is through the Evolution wall control; no separate flash-code table was found for this tier."] },
  { re: /^186B[A-Z]/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Bryant Evolution Series fixed-speed 16 SEER AC with Puron - 186B", notes: ["NAME TRAP: 186B is the fixed-speed Evolution AC. 186CNV is the Evolution Extreme variable-speed AC. Match the fourth through sixth characters, not just '186'.","No diagnostic LED documented on the fixed-speed sibling."] },
  { re: /^(31[05][AJ]|(340|350|352|355)[ACM])AV/, brand: "Carrier", equipment: "Gas Furnace", series: "Bryant 4-way multipoise gas furnace - 310/315 (80% AFUE) and 340/350/352/355 (90%+ condensing)", notes: ["Standard Carrier/Bryant/Payne integrated furnace control with a 2-digit amber status LED - the existing Carrier/Bryant/Payne flash-code list in Error Codes applies.","Tier letter: A = fixed-capacity or 2-stage fixed, J = low NOx, C = deluxe 2-stage variable speed, M = modulating (Perfect Heat gas valve).","The AAV suffix is overloaded - 310AAV is an 80% single-stage, 355AAV is a 90%+ 2-stage. The leading 3-digit size code decides, not the suffix.","310/315 model string reads type code, model code, brand, V, electrical, 3-digit cooling CFM code, 3-digit heating Btuh code, series letter, then a variations suffix."] },
  { re: /^38(TX|TD|TR|YC|YD|YZ|HD)[A-Z]/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Carrier legacy 38-series split-system AC/HP (pre-24/25 numbering, 10-13 SEER class, some R-22)", notes: ["No diagnostic LED and no communicating control on this class - nothing to read but pressures, amps and the contactor.","38TRA is R-22 with an AccuRater fixed-orifice metering device; vintage decides the refrigerant, so confirm on the rating plate before recovering.","Reads as the 38xxx type code, 3-digit nominal capacity 018-060, electrical code, then a series/packaging digit - for example 38TRA018-31.","Do not confuse with 38M ductless (38MURA and similar), which is a different platform entirely."] },
  // --- end coverage:bryant ---
  // --- coverage:goodman (v123) ---
  { re: /^(?:GSX|GSZ|ASX|ASZ)[NBMHC][0-9]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman / Amana 2023 SEER2 condenser and heat pump - GSXN4 / GSXB4 / GSXH5 / GSZB4 / GSZH5 and the Amana ASXN4 / ASXB4 / ASXH5 / ASZB4 / ASZH5 twins (R-410A)", notes: ["Read position 4 as the FEATURE letter, not a SEER number: N=Value, B=Classic, M=Multi-Family, H=Enhanced, C=Premium, V=Ultimate. The digit after it is the SEER2 tier. GSXH5 is not '5 SEER'.","GSXH5 / GSZH5 / ASXH5 / ASZH5 replaced the single-stage GSX16 / GSZ16 per service manual RS6200006r103.","Codes: if a diagnostics module is fitted, the Comfort Alert / CoreSense rows already in Error Codes apply. RS6200006r103 documents that module on the Amana-badged ASX/ASZ (and DSX/DSZ) units - do not assume a Goodman-badged GSX/GSZ has one until you look at the board.","Model layout: prefix + 5 digits (3-digit capacity, electrical, refrigerant), e.g. GSXH501810, GSXN403610.","Service manual RS6200006 (already in Manuals) covers this family."] },
  { re: /^[GA]L[XZ]S[35][0-9]{0,2}B/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman / Amana R-32 single-stage condenser and heat pump - GLXS3B / GLXS5B / GLZS5B and Amana ALXS3B / ALXS5B / ALZS5B", notes: ["R-32 is an A2L (mildly flammable) refrigerant. These units carry a factory leak-detection sensor and a dedicated A2L PCB with its own red LED - that flash-pattern table is already in Error Codes under the Daikin R-32 single-stage / A2L PCB family and applies here unchanged.","Nomenclature: G(brand) L(split system R-32) X(condenser) or Z(heat pump) S(single-stage) <SEER2 tier digit> B(standard) <region N/S/A> <2-digit capacity> <electrical> <variation> <revs>, e.g. GLXS3BN1810AA, GLZS560BA10AA.","SEER2 tier digit: 3=13.4-13.7, 4=13.8-14.5, 5=14.6-15.9, 6=16.0-16.9, 7=17.0-17.9, 8=18.0-18.9, 9=19.0+.","GLXS4* and GLZS4* are already matched by the app's existing GLXS4/GLZS4 rules - only the 3 and 5 tiers needed a new rule.","Compressors use POE oil only - not compatible with mineral-oil (3GS) lubricant.","Service manual RS6200301 covers this whole R-32 single-stage line."] },
  { re: /^G[XZ]V[0-9]S/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman R-32 side-discharge INVERTER condenser and heat pump - GXV6S / GXV9S (AC) and GZV6S / GZV7S / GZV9S (heat pump), communicating", notes: ["Nomenclature: G X(condenser R-32) or Z(heat pump R-32), V(variable speed compressor), SEER2 tier digit, S(side discharge, communicating), region N/S/A, 2-digit capacity, electrical, variation, revisions - e.g. GXV9SA3610AA, GZV7SA4810AA.","SEER2 tier digit: 6=16.0-16.9, 7=17.0-17.9, 9=19.0+.","The outdoor board HAS diagnostic indicator lights, a seven-segment LED display and fault code storage (stated in SS-GXV6S-R32 and SS-GZV9S-R32) - but Goodman has published NO code table for it on any public host as of this pass. Read the display, then use CoolCloud / the communicating thermostat for the fault text.","R-32 is an A2L refrigerant - recover, evacuate and charge with A2L-rated equipment.","GZV6S-M is the Multi-Family variant of GZV6S and matches this rule.","Do not read the older GSXV9/GSZV9 (R-410A inverter) material on these - different refrigerant and different platform."] },
  { re: /^[GA]L[XZ]T[0-9]C/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman GLXT7C two-stage communicating R-32 condenser and GLZT7C heat pump (top-flow)", notes: ["Nomenclature: G L(split system R-32) X(condenser) or Z(heat pump) T(TWO-STAGE compressor) 7(17.0-17.9 SEER2) C(communicating, top flow) <region> <2-digit capacity> <electrical> <variation> <revs> - e.g. GLXT7CA3610AA.","The T means two-stage. This is NOT an inverter unit - do not confuse it with the GXV/GZV side-discharge inverters.","SS-GLXT7C-R32 lists 'Copeland ComfortAlert built in diagnostics' as a standard feature, so the Comfort Alert / CoreSense rows already in Error Codes apply to this family.","It also lists commissioning and diagnostics via Bluetooth, plus factory-installed filter drier, transformer and high/low pressure switches.","R-32 (A2L) - use A2L-rated recovery and charging equipment."] },
  { re: /^[GAV][MCD]ES80[0-9]{4,5}[A-Z]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman / Amana 80% AFUE single-stage gas furnace - GMES80 / GCES80 / VMES80 / VCES80 and Amana AMES80 / ACES80 / ADES80 (PCBBF145 board)", notes: ["Codes: single RED LED on the PCBBF145(S) board, read through the observation window in the blower access door. That chart is in Error Codes - it stops at 8 flashes plus a continuous/rapid flash for reversed polarity.","A -U (ultra-low NOx) model in this family uses a DIFFERENT board, PCBBF161, with a pressure TRANSDUCER and 'PS NULL' faults - that is a separate family in Error Codes.","Reset from lockout: thermostat off more than 5 and less than 20 seconds, or open the disconnect at least 5 seconds. The board also auto-resets one hour after lockout.","Nomenclature (Goodman, 13 digits): G(brand) M(upflow/horizontal) or D(dedicated downflow) E(constant torque / multi-speed ECM) or S(PSC) S(single stage) 80(AFUE) <3-digit MBTU> <max CFM 3/4/5> <cabinet A=14 B=17.5 C=21 D=24.5 in> <NOx N or X> <major rev> <minor rev>. Amana is 14 digits and uses C for downflow and C/M/S in the gas-valve position.","Manifold pressure 3.5 in. w.c. +/- 0.3 natural gas, 10 in. w.c. +/- 0.3 propane; propane second-stage line regulator 11 in. w.c. with all appliances running.","Control board fuse is a 3A automotive fuse.","Service manual RS6621003 is in Manuals."] },
  { re: /^[GAV][MCD]EC80[0-9]{4,5}[A-Z]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman / Amana 80% AFUE TWO-STAGE gas furnace with multi-speed ECM - GMEC80 / GCEC80 and Amana AMEC80 / ACEC80 (PCBBF139 board)", notes: ["THREE LEDs on the PCBBF139 board: RED is faults, AMBER is heat/flame status, GREEN is cool/fan status. Amber and green flashes are normal-operation indications, not faults.","The red list runs to 12 flashes - much longer than the single-stage PCBBF145 list. Do not read one board's chart on the other.","Red 3 SINGLE flashes = 1st stage pressure switch stuck open; red 3 DOUBLE flashes = 2nd stage pressure switch stuck open. Watch the flash shape, not just the count.","Red 5 flashes covers open rollout OR an open board fuse - check the fuse before condemning the rollout switch.","Set the heat anticipator on the room thermostat to 0.7 amps.","Service manual RS6621005 is in Manuals."] },
  { re: /^[GA][MC]VC80[0-9]{4,5}[A-Z]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman / Amana 80% AFUE two-stage VARIABLE-SPEED ComfortNet gas furnace - GMVC80 / GCVC80 and Amana AMVC80 / ACVC80", notes: ["Dual 7-SEGMENT display, not a flash count. Lockout after three failed ignition attempts in one heat call reads EE0.","Reset from lockout three ways: automatic after one hour, interrupt 115V power, or drop the thermostat call for 1 to 20 seconds and restore it. If the cause is still there it will lock out again.","Communicating (ComfortNet) - the same fault can be read at the thermostat instead of at the board.","The variable-speed motor has 120 volts at it at all times, even with no call; it takes its commands over the 4-pin harness. Check the motor with the Goodman UTT-01 UltraCheck-EZ tool before replacing the motor assembly or end bell.","The service manual's own code chart prints its code column as display graphics, so only EE0 is documented in text. The fault DESCRIPTIONS match the Daikin DM80VC/DC80VC twin's E-code set but no doc states the two tables are identical - verify at the unit.","Service manual RS6621009 is in Manuals."] },
  { re: /^(?:GM9S|GC9S|AM9S|AC9S|VM9S|VC9S)[0-9]{6}/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman / Amana GM9S / GC9S / AM9S / AC9S / VM9S / VC9S single-stage 80 or 96% gas furnace (7-segment E-code display)", notes: ["COLLISION GUARD: the 6-digit run after the prefix is what separates Goodman's GM9S from York's unrelated GM9S furnace. Goodman is GM9S + 6 digits + letters (GM9S800403AU). York is GM9S + 3 digits + a letter + digits (GM9S060B12MP11).","Codes: E0 / E1 / E2 / Eb / EC on the 7-segment display - already in Error Codes.","To view stored faults: press Left or Right until L 6 F is displayed, then press Center. To clear: hold Center 5 to 30 seconds; the display flashes - - - three times and returns to L 6 F.","Manifold gas pressure for the E0 flowchart: natural gas 3.2 to 3.8 in. w.c., LP 9.7 to 10.3 in. w.c.","The same E-code set is documented as applying to Daikin-badged DM**SN and DM**SN-U furnaces.","Service manual RS6621008r2 is in Manuals."] },
  { re: /^(?:GD9S|GRVS|GDVS|GR9T|GD9T|GRVT|GDVT|GRVM|GDVM|CDVS)[0-9]{6}/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman R-32-era gas furnace - GD9S / GRVS / GR9T / GD9T / GRVT / GDVT / GRVM / GDVM (downflow, variable-speed and two-stage members of the GR9S family)", notes: ["Nomenclature: G R(rise/upflow R-32) or D(downflow R-32), then V(variable speed ECM / ComfortBridge) or 9(multi-speed ECM, 9 taps), then M(modulating) / S(single-stage) / T(two-stage) gas valve, then AFUE 80/92/96/97, 3-digit MBTU/h, max CFM 3=1200 4=1600 5=2000, cabinet A=14 B=17.5 C=21 D=24.5 in, NOx N/X/U, then two revision letters.","NOx letter: N = natural gas under 40 ng/J, X = low NOx 80%, U = ULTRA-low NOx under 14 ng/J. A -U model in the 80% single-stage tier uses the PCBBF161 transducer board, not a pressure switch.","Model layout is prefix + 6 digits + letters, e.g. GD9S800805C, GRVS800604BUA, GR9T960403AN.","GR9S and AR9S are already matched by an existing rule upstream.","No family-specific fault-code table has been published for these yet - work them with the matching Goodman board family in Error Codes and confirm the board part number at the unit."] },
  { re: /^(?:AMVT|AHVE|AWST|ACST)[0-9]{2}[A-Z]/, brand: "Goodman", equipment: "Air Handler", series: "Goodman / Amana R-32 air handler - AMVT (multi-position variable-speed communicating), AHVE (horizontal-discharge multi-position, EEV), AWST (wall mount), ACST (ceiling mount)", notes: ["Nomenclature: A(corporate air handler) <application C=ceiling, H=horizontal-discharge multi-positional, M=multi-positional, W=wall> <motor S=MS-ECM, V=VS-ECM communicating> <expansion E=EEV, F=flowrator, T=TXV> <2-digit capacity> <cabinet width> <cabinet N=uncased, P=painted, U=unpainted> <electrical 0=115V, 1=208/230V> <refrigerant 3=R-32> <2-digit electric heat kW> <revs>, e.g. AMVT30BP1300AA, AHVE24BP1300AA.","A V in the motor position means a communicating VS-ECM - the PCBJA-board diagnostic codes already in Error Codes apply.","R-32 units carry a factory refrigerant sensor; the A2L PCB LED table in Error Codes applies.","AMST is already matched by an existing rule upstream."] },
  { re: /^(?:ARPT|ARPF|AEPT|AEPF)[0-9]{3}/, brand: "Goodman", equipment: "Air Handler", series: "Goodman / Amana ARPT / ARPF / AEPT / AEPF air handler (R-410A era - AR = PSC motor, AE = ECM motor)", notes: ["Nomenclature (IO-230J): AE = air handler with ECM motor, AR = air handler with PSC motor; next letter P = painted cabinet, U = unpainted galvanized; next letter T = TXV, F = Flowrater; then 3-digit capacity (018=1.5t, 024=2t, 030/032=2.5t, 036=3t, 042=3.5t, 048/049=4t, 060/061=5t); then 00 = no factory heat; then feature letter; then 1 = 208-230/1/60; then revision. Example ARUF02400A1A.","TRAP: feature letter B means DEDICATED DOWNFLOW - those units may NOT be installed upflow or horizontal. A B anywhere else in the model number does not mean that.","Metering letter decides the charging method: F = Flowrater (fixed orifice) charge by SUPERHEAT, T = TXV charge by SUBCOOLING.","No fault-code display on these - work them as an air handler power path. AEPT models have an ECM motor with soft start, controlled off-delays and constant CFM.","Electric heat is an accessory (HKR kits) and does not ship with the unit.","Install manual IO-230J is in Manuals."] },
  { re: /^D[XZ][0-9]S[EQ][NSA0-9]/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin DX3SE / DX4SE / DX5SE condenser and DZ4SE / DZ5SE heat pump (SEER2 generation)", notes: ["Nomenclature: D(Daikin) X(AC) or Z(heat pump) <SEER2 tier digit> S(single stage) or T(two stage) or V(variable) <feature letter> <region N/S/A> <2-digit capacity> <electrical> <revs>, e.g. DX3SEN3610AA, DX4SEA3610AA.","TRAP: DZ4SEA as a MODEL FAMILY (spec sheet SS-DZ4SEA) is a separate light-COMMERCIAL SKU - three-phase only, fixed 14.3 SEER2, 3-5 ton. But an A in the region position of a residential DZ4SE label (DZ4SEA3610AA) just means All Regions. Read the nameplate electrical data to tell them apart.","These are the Daikin-badged twins of the Goodman GSX/GSZ platform - the Comfort Alert codes already in Error Codes apply where a module is fitted.","Install manual IM-IOD-4036D (DX4SE) is on daikincomfort.com."] },
  { re: /^D[MCD]80[A-Z]{2}[0-9]/, brand: "Daikin", equipment: "Gas Furnace", series: "Daikin 80% AFUE gas furnace - DM80VC / DC80VC (two-stage variable-speed), DM80HS / DD80HS (modified two-stage), DM80SE-U (ultra-low NOx single-stage)", notes: ["DM80VC / DC80VC use an integrated control with a DUAL 7-segment display - its E-code set (E0, E1, E2, E3, E8, E9, EA, EF, d0) is in Error Codes.","E1/E2 are the LOW stage pressure switch (PS1); E8/E9 are the HIGH stage pressure switch (PS2). Do not mix them up on a two-stage furnace.","DM80SE-U is ultra-low NOx - service manual RSD6621008. DM80HS/DD80HS is the older modified two-stage platform - service manual RSD6621005.","The Goodman GMVC80 / GCVC80 is the same physical platform badge-for-badge, but no doc states the two code tables are identical - confirm the board at the unit."] },
  { re: /^D[MC]96[HSTV][A-Z][0-9]/, brand: "Daikin", equipment: "Gas Furnace", series: "Daikin 96% AFUE gas furnace - DM96SC / DM96SE / DM96TN / DM96VE / DM96HS and the DC96 downflow twins", notes: ["Nomenclature: D(Daikin) M(upflow/horizontal) or C(downflow/horizontal) 96(AFUE) <gas valve S=single, T=two stage, V=variable, H on DM96HS> <motor N=multi-speed ECM 9 taps, C, E> <3-digit MBTU 040-120> <max CFM 3=1200 4=1600 5=2000> <cabinet A=14 B=17.5 C=21 D=24.5 in> <NOx N=low, U=ultra-low> <major rev> <minor rev>. Example DM96SN0603BNAA.","TRAP: the MBTU block here is THREE digits (060), while the older Goodman 80% legacy furnace prints TWO (60). Do not read a capacity across the two schemes.","A -U model name means Ultra-Low NOx and the U shows up in the NOx position of the printed model number (DM96SC0603BU).","Board: self-diagnostic control with constant memory fault history on a 3-digit 7-segment LED display with push buttons.","Codes: the Goodman/Amana/Daikin single-stage flash-code family in Error Codes was verified against the DM96SE/DC96SE service manual RSD6612015 and applies to the single-stage members.","DM96SN / DC96SN and DM96VC / DC96VC are already matched by existing rules upstream."] },
  { re: /^D[RD]9[0-9][A-Z]{2}[0-9]/, brand: "Daikin", equipment: "Gas Furnace", series: "Daikin R-32-era gas furnace - DR96TN / DD96TN two-stage nine-speed ECM and family", notes: ["Same position scheme as the Goodman GR/GD R-32 furnaces: D(Daikin) R(rise/upflow) or D(downflow), AFUE, gas valve and motor letters, MBTU, CFM, cabinet, NOx, revisions.","Service manual RSD6612304 (May 2024) covers DR96TN / DD96TN.","DR96SN is already matched by an existing rule upstream."] },
  { re: /^C[AHS][CPU][FTE]A[0-9]{4}[A-DN]3/, brand: "Goodman", equipment: "Other", series: "Goodman / Amana R-32 indoor coil - CAPTA / CHPTA / CSCFA / CAUFA / CHPEA and family (A-coil, refrigerant digit 3 = R-32)", notes: ["Read CHPTA1818A3AA as C (indoor coil) H (horizontal; A upflow/downflow, S horizontal slab) P (cased painted; C cased unpainted, U uncased) T (TXV; F flowrator, E electronic expansion valve) A (A-coil 7 mm) 18 (capacity) 18 (height/width) A (14.0 in cabinet; B 17.5, C 21.0, D 24.5, N not applicable) 3 (R-32) then major and minor revision.","R-32 (A2L) coil - match it only with an R-32 outdoor unit and an R-32-rated air handler or furnace; the older R-410A CAPF/CHPF coils carry no refrigerant digit 3.","Coil-only tag - diagnostic codes come from the outdoor unit or the furnace/air handler board."] },
  { re: /^MBVB[0-9]{2}[BCD]P/, brand: "Goodman", equipment: "Air Handler", series: "Goodman / Amana MBVB modular blower - variable-speed ComfortBridge (R-32 era; MBVK is the ClimateTalk version)", notes: ["Read MBVB12BP1X00AA as MB (modular blower) V (variable speed) B (ComfortBridge communicating; K ClimateTalk) 12 (1200 CFM; 16 = 1600, 20 = 2000) B (17.5 in cabinet; C 21.0, D 24.5) P (painted) 1 (208/230V 1ph) X (no circuit breaker) 00 (factory electric heat kW, 00 = none) then major and minor revision.","Blower-only cabinet - pair it with a matching cased coil; fault codes are on the ComfortBridge outdoor unit and thermostat, not a furnace-style LED."] },
  { re: /^D(?:MST|MVT)[0-9]{2}[A-Z]/, brand: "Daikin", equipment: "Air Handler", series: "Daikin-badged DMST (multi-speed ECM) / DMVT (variable-speed communicating) R-32 multi-position air handler - same unit as Goodman/Amana AMST / AMVT", notes: ["The first letter is the BRAND position: D = Daikin Air Handler, A = Corporate (Goodman / Amana) Air Handler - everything after it reads the same (SS-GAMST-R32 / SS-GAMVT-R32).","Read DMST24BU1300AA as D (Daikin) M (multi-position) S (MS-ECM; V = VS-ECM communicating) T (TXV) 24 (2 ton) B (17.5 in cabinet) U (unpainted) 1 (208/230V 1ph) 3 (R-32) 00 (no factory heat kW) then major and minor revision.","Install and spec documents are filed under Goodman AMST in Manuals (IO-4011H, SS-GAMST-R32)."] },
  // --- end coverage:goodman ---
  // --- Bosch Home Comfort ---
  // Nomenclature (from Bosch's own product-specification diagrams):
  //   Brand(B) Application(O=Outdoor/I=Indoor/P=Packaged) UnitType(V=Vertical/W=Wall/
  //   C=Ceiling/H|B=Packaged) Series(A|B) -- Capacity(kBTU) Performance(M=Max/R=Regular/
  //   X=AC-only) Connected(T=Connected/C=Comm-capable/X=No) Refrigerant(B=R454B/N=R410A)
  //   -- Power(M=208/230-1-60) Efficiency(SEER2 digits) Compressor(E=EVI/S=Standard/R/X)
  // The refrigerant letter sits in the LAST position of the middle block, which is why
  // ...MTB- reads R-454B and ...HDN1- reads R-410A. Keep the two specific patterns above
  // the generic one - the loop takes the first match.
  { re: /^BO[VWCHB][A-D]-\d{2}[A-Z]{2}B-M\d{2}[A-Z]?/, brand: "Bosch", equipment: "Condenser/Heat Pump", series: "Bosch IDS R-454B outdoor unit (2026 Premium / Light / Ultra nameplate form, e.g. BOVA-60MTB-M19E)", notes: ["The B in the refrigerant position of the middle block means R-454B (A2L) - this one is safe to read off the model string.", "Fault codes are in Error Codes under 'Bosch IDS R-454B 2026'.", "b-prefix codes on the outdoor display are INDOOR faults - go to the air handler."] },
  { re: /^BO[VWCHB][A-D]-\d{2}[A-Z]{1,3}N1?-M\d{2}[A-Z]?/, brand: "Bosch", equipment: "Condenser/Heat Pump", series: "Bosch IDS R-410A outdoor unit (e.g. BOVA-36HDN1-M20G, BOVA-60HDN1-M20G)", notes: ["The N in the refrigerant position means R-410A - safe to read off the model string.", "Fault codes are in Error Codes under 'Bosch IDS R-410A'.", "IDS 2.0 service manual (07.2021) is in Manuals -> Bosch."] },
  { re: /^BO[VWCHB][A-D]-\d{2}[A-Z0-9]{2,5}-M\d{2}[A-Z]?/, brand: "Bosch", equipment: "Condenser/Heat Pump", series: "Bosch IDS outdoor unit (long nameplate form)", notes: ["Read the refrigerant letter in the last position of the middle block: B = R-454B, N = R-410A.", "Both the R-410A and R-454B IDS code tables are in Error Codes - the family label on each card names the refrigerant."] },
  // Short tags printed on IOM covers and some cartons/labels. Anchored with $ so they do
  // not swallow a full nameplate. Bosch is inconsistent about which number is capacity:
  // the Ultra IOM prints both BOVB19-36 and BOVB36-19 for the same unit.
  { re: /^BO[VWCHB][A-D]\d{2}-\d{2}$/, brand: "Bosch", equipment: "Condenser/Heat Pump", series: "Bosch IDS outdoor unit (IOM short tag, e.g. BOVA24-15, BOVB15-36, BOVB19-60, BOVB36-20)", notes: ["This short form does NOT reliably tell you the refrigerant. BOVB20 is used for a 2023 R-410A unit AND a 2026 R-454B unit - read the nameplate.", "Bosch prints the two numbers in both orders (BOVB19-36 and BOVB36-19) for the same Ultra unit.", "15 = IDS Light R-410A era, 18/20 = IDS Connected R-410A era, 15/19/20 also appear on 2026 R-454B units - the refrigerant comes from the nameplate, not this tag."] },
  { re: /^BVA-\d{2}WN1-M\d{2}/, brand: "Bosch", equipment: "Air Handler", series: "Bosch IDS R-410A air handler (BVA-24WN1-M20 / BVA-36WN1-M20 / BVA-48WN1-M20 / BVA-60WN1-M20)", notes: ["N1 in the model string means R-410A - safe to read here.", "The 05.2019 BVA install manual has NO fault-code content; codes for this system are on the OUTDOOR board - see the Bosch IDS R-410A family in Error Codes."] },
  { re: /^BI[VC][AB]\d{2}(-\d{2})?/, brand: "Bosch", equipment: "Air Handler", series: "Bosch IDS air handler, current generation (BIVA15 / BIVA20 / BICA16 compact ceiling / BIVB19-36 / BIVB19-48 / BIVB19-60)", notes: ["On 2026 R-454B systems the indoor board reports faults as a single-LED FLASH COUNT - that table is in Error Codes.", "The same faults appear at the outdoor display as b-prefix codes.", "This pattern does not establish refrigerant on its own - check the nameplate."] },
  { re: /^BPHA-\d{2}[A-Z]{2}B-M\d{2}[A-Z]?/, brand: "Bosch", equipment: "Other", series: "Bosch IDP R-454B packaged unit (current nomenclature, e.g. BPHA-36RCB-M16S)", notes: ["The B in the refrigerant position means R-454B (A2L).", "Fault codes are in Error Codes under 'Bosch IDP R-454B packaged unit' - note o37 and PF exist only on IDP.", "The outdoor board display is what Bosch calls the digital tube; indoor faults also show as LED1 flash counts."] },
  { re: /^BRBA-\d{2}[A-Z0-9]+-M\d{2}/, brand: "Bosch", equipment: "Other", series: "Bosch IDP packaged unit, legacy R-410A (BRBA-36HWD1N1-M18 / BRBA-60HWD1N1-M18)", notes: ["N1 in the model string means R-410A.", "This is the pre-R-454B IDP Premium generation - the 2026 IDP code table in Error Codes is for the R-454B units and may not match this board."] },
  { re: /^BMS500-AA[US]\d{3}-[01]AH[WCD]X[BC]/, brand: "Bosch", equipment: "Mini-Split", series: "Bosch Climate 5000 ductless indoor head (W = wall, C = 4-way cassette, D = ducted)", notes: ["Trailing letter tells the generation: B = G2, C = G3. G2 also appears with a trailing A on some outdoor strings.", "REFRIGERANT IS NEVER STATED in any G2 or G3 Climate 5000 service manual - do not infer it from the model. Read the label on the outdoor unit.", "9k to 18k units have NO display - the RUN and TIMER lamp blink counts are the whole readout.", "Codes: use the short E/F/P family; G3 ducted and cassette units may also print the long EH/EL/EC/PC codes."] },
  { re: /^BMS500-AAS\d{3}-[01]CSX[RHL][ABC]/, brand: "Bosch", equipment: "Mini-Split", series: "Bosch Climate 5000 single-zone outdoor unit (R = Regular, H = Max Performance, L = light commercial 48k/60k)", notes: ["Trailing letter: C = G3, A or B = G2.", "REFRIGERANT IS NEVER STATED in the G2 or G3 manuals - read the label on the unit.", "On the light commercial L models (48k and 60k) the IPM board carries LED2 and LED3 - that table is in Error Codes.", "The 0-prefix capacity block (e.g. BMS500-AAS012-0CSXR*) is the 115V unit."] },
  { re: /^BMS500-AAM\d{3}-1CSX[RH][ABC]/, brand: "Bosch", equipment: "Mini-Split", series: "Bosch Climate 5000 multizone outdoor unit (18k / 27k / 36k / 48k, 2 to 5 zone)", notes: ["Trailing letter: C = G3, A or B = G2. THIS MATTERS - the G2 and G3 multizone code sets are completely different and are separate families in Error Codes.", "G2 multizone codes are E/F/P strings whose meanings differ from the single-zone codes of the same name; G3 multizone uses EC/PC strings.", "REFRIGERANT IS NEVER STATED in these manuals - read the label on the unit.", "Point check is entered with SW1 on both generations."] },
];

// Nominal capacity from the digits embedded in most model numbers.
// Keyed off equipment type: cooling gear embeds tonnage codes (BTU/12),
// furnaces embed input BTU, mini-splits embed BTU in thousands directly.
function decodeCapacity(model, equipment) {
  if (equipment === "Gas Furnace") {
    // 054/072/096/108/126/144 are Nortek (Frigidaire/Maytag/Gibson/Intertherm) furnace input codes.
    const f = model.match(/(040|045|054|060|070|072|080|090|096|100|108|110|115|120|126|130|140|144)(?=[A-Z0-9]|$)/);
    if (f) return `~${parseInt(f[1],10)},000 BTU/h input (furnace sizes are input BTU)`;
    return null;
  }
  if (equipment === "Mini-Split") {
    const s = model.match(/^[A-Z]+-?[0-9]?[A-Z]*?(09|12|15|18|24|30|36|42|48)(?=[A-Z0-9]|$)/);
    if (s) return `~${parseInt(s[1],10)},000 BTU/h nominal`;
    return null;
  }
  let m = model.match(/(018|024|030|036|042|048|060)(?=[A-Z0-9-]|$)/);
  // Some brands (Carrier 24VNA936, 25VNA836) embed 2-digit tonnage codes instead.
  if (!m) m = model.match(/(18|24|30|36|42|48|60)(?=[A-Z])/);
  if (m) {
    const btu = parseInt(m[1], 10);
    const tons = Math.round((btu / 12) * 2) / 2;
    return `~${tons} ton (${btu},000 BTU/h nominal)`;
  }
  return null;
}

// Manufacture-date estimate from serial number, by brand convention.
// These are estimates — conventions changed over the years.
//
// Sanity guards matter more than coverage here: a mis-read data plate must NOT
// produce a confident-looking date. A tech uses this for warranty decisions, so
// "no decode" is always better than a wrong year.
const SERIAL_YEAR_MAX = new Date().getFullYear() + 1;   // allow a little stock lead time
function plausibleYear(yy) {
  const y = 2000 + Number(yy);
  return y >= 1990 && y <= SERIAL_YEAR_MAX ? y : null;
}
function plausibleWeek(ww) {
  const w = Number(ww);
  return w >= 1 && w <= 53 ? w : null;   // there is no week 00
}
function decodeSerialAge(brand, serial, equipment) {
  if (!serial) return null;
  const s = serial.replace(/[^A-Z0-9]/g, "");
  // Too short, or a degenerate string like 0000000000 / 1111111111 that usually
  // means the OCR grabbed a border or a run of repeated characters.
  if (s.length < 6) return null;
  if (/^(.)\1+$/.test(s)) return null;
  if (/^0+$/.test(s.replace(/[A-Z]/g, ""))) return null;
  let m, y, w;
  if (brand === "Goodman" || brand === "Daikin") {
    if ((m = s.match(/^([0-9]{2})(0[1-9]|1[0-2])/)) && (y = plausibleYear(m[1])))
      return `Made ${m[2]}/${y} (Goodman/Daikin serials start YYMM — estimate)`;
  }
  if (brand === "Carrier") {
    // Confirmed against Carrier's own residential AC/HP service manual
    // (catalog 24-25-2SM) and a matching Bryant install manual (Bryant is
    // built on the same Carrier Corp line): WW YY [plant] NNNNN, units 2006+.
    // Document explicitly scopes this to split-system AC/HP — not confirmed
    // for furnaces or air handlers, so only decode there.
    if (equipment === "Condenser/Heat Pump") {
      if ((m = s.match(/^([0-9]{2})([0-9]{2})([A-Z])/)) && (w = plausibleWeek(m[1])) && (y = plausibleYear(m[2])))
        return `Made week ${w} of ${y}, plant ${m[3]} (confirmed Carrier/Bryant format, 2006+ split AC/HP)`;
      if ((m = s.match(/^([0-9]{2})([0-9]{2})/)) && (w = plausibleWeek(m[1])) && (y = plausibleYear(m[2])))
        return `Made week ${w} of ${y} (confirmed Carrier/Bryant format, 2006+ split AC/HP)`;
    }
    // Furnaces/air handlers on this platform (including Payne, which has no
    // official serial documentation at all): no confirmed source — don't guess.
  }
  if (brand === "Trane") {
    // No official Trane/American Standard document states a residential serial
    // date format (the light-commercial WWYY format they DO publish explicitly
    // excludes residential equipment). What IS confirmed: Trane/American
    // Standard data plates print an explicit date field — furnaces say "DATE OF
    // MANUFACTURE: MM/YY", coils/air handlers say "MFG DATE"/"MFR. DATE". Point
    // the tech at that instead of a serial guess.
    return "Not decoded from serial — Trane/American Standard plates print an explicit manufacture date field (look for \"DATE OF MANUFACTURE\" or \"MFG DATE\" on the tag)";
  }
  if (brand === "ICP") {
    // ICP doc 516 01 2310 00SS (Electrical Data Supplement, 5/26/2015) prints the
    // serial as 10 characters: plant letter, YY, WW (fiscal week), 5-digit sequence
    // (U1523 12345 = plant U, 2015, week 23). That doc covers the RHS light-commercial
    // rooftop, so on a residential split this is an estimate - the rating plate wins.
    if ((m = s.match(/^[A-Z]([0-9]{2})([0-4][0-9]|5[0-3])[0-9]{5}$/)) && (y = plausibleYear(m[1])) && +m[2] >= 1)
      return `Made ${y}, week ${m[2]} (ICP 10-character serial: plant-YY-WW-sequence per ICP doc 516 01 2310 00SS, stated for light-commercial - estimate on residential splits; the board's own WWYY date code is NOT the unit serial)`;
  }
  if (brand === "Nortek") {
    // Nordyne/Nortek install-instructions addendum 7091540 (10/13) itemizes the
    // 12-digit serial as XX P YY MM SSSSS - unit type, plant, 2-digit year,
    // 2-digit month, sequence; the Product Identifier posters (599B/837F/838F/840F)
    // describe the same plant + year + month + sequence order without digit
    // positions. Decode only when the string is the full 12 digits and the
    // month is real, and say it is an estimate.
    if ((m = s.match(/^[0-9]{2}[0-9A-Z]([0-9]{2})(0[1-9]|1[0-2])[0-9]{5}$/)) && (y = plausibleYear(m[1])))
      return `Made ${m[2]}/${y} (Nortek/Nordyne 12-digit serial: type-plant-YY-MM-sequence per addendum 7091540 - estimate)`;
  }
  if (brand === "Lennox") {
    // Confirmed against Lennox alert code guide 100017: the nameplate serial is
    // PPYYMNNNNN — plant, year, month letter, sequence (their own example, 5817F,
    // reads as plant 58 / 2017 / month F). Lennox doesn't publish the month-letter
    // map in that doc, so show the letter rather than guess at a month.
    if ((m = s.match(/^[0-9]{2}([0-9]{2})([A-Z])/)) && (y = plausibleYear(m[1])))
      return `Made ${y}, month code ${m[2]} (Lennox nameplate serial is PPYYM… — plant, year, month)`;
    if ((m = s.match(/^[0-9]{2}([0-9]{2})[0-9]/)) && (y = plausibleYear(m[1])))
      return `Made ${y} (Lennox nameplate serial is PPYYM… — digits 3-4 are the year)`;
  }
  // Rheem/Ruud: checked directly against rheem.com's and ruud.com's own serial
  // pages — both show only where the tag is, no decode. Neither WWYY nor MMYY
  // (both circulate as "common knowledge") is officially confirmed either way,
  // so — unlike the brands above — deliberately no decode here at all.
  // York/Luxaire/Coleman and Mitsubishi: same story, no official date format
  // found; York/JCI's own resolution path is their serial lookup tool
  // (m.upgnet.com/SN/<serial>), not a local decode.
  return null;
}

// Letters an OCR commonly reports for a stamped DIGIT on a faded or embossed
// data plate. Used ONLY to recover a missed model (see identifyModel) — we turn
// these letters back into digits and re-test against the known library.
const OCR_LETTER_TO_DIGIT = { O: "0", D: "0", Q: "0", I: "1", L: "1", Z: "2", S: "5", G: "6", B: "8" };

// Plausible re-reads of a garbled model: every combination of turning the
// digit-lookalike letters back into digits, fewest changes first (most likely
// re-read first). Bounded so a long string can't explode.
function ocrModelCandidates(model) {
  const chars = model.split("");
  const pos = [];
  for (let i = 0; i < chars.length && pos.length < 10; i++) {
    if (OCR_LETTER_TO_DIGIT[chars[i]]) pos.push(i);
  }
  if (!pos.length) return [];
  const cands = [];
  const total = 1 << pos.length;
  for (let mask = 1; mask < total; mask++) {   // skip 0 == the original (already tried)
    const c = chars.slice();
    let edits = 0;
    for (let b = 0; b < pos.length; b++) {
      if (mask & (1 << b)) { c[pos[b]] = OCR_LETTER_TO_DIGIT[c[pos[b]]]; edits++; }
    }
    cands.push({ s: c.join(""), edits });
  }
  cands.sort((a, b) => a.edits - b.edits);
  return cands.slice(0, 600).map(c => c.s);
}

function identifyModel(rawModel, rawSerial, brandHint) {
  const model = (rawModel || "").toUpperCase().replace(/\s+/g, "");
  if (!model) return null;
  const serial = (rawSerial || "").toUpperCase().trim();
  for (const p of MODEL_PATTERNS) {
    if (p.re.test(model)) {
      return {
        model, serial,
        brand: p.brand, equipment: p.equipment, series: p.series,
        capacity: decodeCapacity(model, p.equipment),
        age: decodeSerialAge(p.brand, serial, p.equipment),
        notes: p.notes,
      };
    }
  }
  // Exact match missed. Faded/embossed plates make OCR swap stamped DIGITS for
  // lookalike LETTERS (0->O, 1->I, 5->S, 8->B, 6->G ...). Try plausible re-reads
  // against the SAME library; a re-read that lands on a known family is returned
  // as a SUGGESTION for the tech to confirm on the tag. A wrong re-read matches
  // nothing, so this can never invent a unit.
  for (const cand of ocrModelCandidates(model)) {
    for (const p of MODEL_PATTERNS) {
      if (p.re.test(cand)) {
        trackEvent("OCR re-read: " + model + " -> " + cand + " = " + p.brand + " " + p.series);
        return {
          model: cand, serial,
          brand: p.brand, equipment: p.equipment, series: p.series,
          capacity: decodeCapacity(cand, p.equipment),
          age: decodeSerialAge(p.brand, serial, p.equipment),
          notes: p.notes,
          ocrGuess: true, rawModel: model,
        };
      }
    }
  }
  // Not in the offline library — keep whatever the tag itself told us so the
  // tech still gets a brand, an age estimate, and targeted internet lookups.
  // Also report the miss: an unrecognized model is the clearest signal of what
  // the library is missing, and it costs the tech nothing to send.
  trackEvent("MODEL NOT IN LIBRARY: " + model + (brandHint ? " (" + brandHint + ")" : ""));
  return {
    model, serial, brand: null,
    brandGuess: brandHint || null,
    age: brandHint ? decodeSerialAge(brandHint, serial) : null,
  };
}

// Brand names as printed on data plates → the brand string used in data.js.
// Lets us salvage a brand ID (and serial-age decode) even when the model
// number itself isn't in MODEL_PATTERNS yet.
const BRAND_NAME_HINTS = [
  ["AMERICAN STANDARD", "Trane"], ["GOODMAN", "Goodman"], ["AMANA", "Goodman"],
  ["DAIKIN", "Daikin"], ["CARRIER", "Carrier"], ["BRYANT", "Carrier"], ["PAYNE", "Carrier"],
  ["LENNOX", "Lennox"], ["TRANE", "Trane"], ["YORK", "York"], ["COLEMAN", "York"],
  ["LUXAIRE", "York"], ["RHEEM", "Rheem"], ["RUUD", "Rheem"], ["MITSUBISHI", "Mitsubishi"],
  ["FRIGIDAIRE", "Nortek"], ["MAYTAG", "Nortek"], ["GIBSON", "Nortek"], ["TAPPAN", "Nortek"], ["KELVINATOR", "Nortek"], ["WESTINGHOUSE", "Nortek"], ["NORDYNE", "Nortek"], ["NORTEK", "Nortek"], ["INTERTHERM", "Nortek"], ["MILLER", "Nortek"], ["BROAN", "Nortek"], ["NUTONE", "Nortek"], ["PHILCO", "Nortek"], ["GRANDAIRE", "Nortek"],
  ["GENERAC", "Generac"], ["HONEYWELL GENERATOR", "Generac"], ["GUARDIAN", "Generac"], ["CENTURION", "Generac"], ["POWERPACT", "Generac"], ["CORE POWER", "Generac"], ["COREPOWER", "Generac"], ["ECOGEN", "Generac"], ["SYNERGY", "Generac"], ["POWERMATE", "Generac"], ["EATON", "Generac"], ["SIEMENS", "Generac"],
  ["FUJITSU GENERAL", "Fujitsu"], ["FUJITSU", "Fujitsu"], ["HALCYON", "Fujitsu"], ["AIRSTAGE", "Fujitsu"], ["LG ELECTRONICS", "LG"], ["SAMSUNG", "Samsung"],
  ["MERIT", "Lennox"], ["ELITE", "Lennox"], ["DAVE LENNOX SIGNATURE", "Lennox"], ["SIGNATURE COLLECTION", "Lennox"],
  ["AIRE FLO", "Lennox"],
  ["AIRE-FLO", "Lennox"], ["AIREFLO", "Lennox"],
  ["ARMSTRONG AIR", "Allied Air"], ["ARMSTRONG", "Allied Air"], ["AIREASE", "Allied Air"], ["AIR EASE", "Allied Air"], ["DUCANE", "Allied Air"], ["CONCORD", "Allied Air"], ["ALLIED AIR", "Allied Air"],
  ["WEATHERKING", "Rheem"], ["WEATHER KING", "Rheem"],
  ["HEIL", "ICP"], ["TEMPSTAR", "ICP"], ["COMFORTMAKER", "ICP"], ["ARCOAIRE", "ICP"], ["DAY & NIGHT", "ICP"], ["DAY AND NIGHT", "ICP"], ["KEEPRITE", "ICP"], ["AIRQUEST", "ICP"], ["INTERNATIONAL COMFORT PRODUCTS", "ICP"],
  ["CHAMPION", "York"], ["FRASER-JOHNSTON", "York"], ["FRASER JOHNSTON", "York"],
  ["AMERISTAR", "Trane"], ["WEATHERTRON", "Trane"], ["TRUCOMFORT", "Trane"], ["ACCUCOMFORT", "Trane"],
];
function detectBrandInText(up) {
  for (const [word, brand] of BRAND_NAME_HINTS) if (up.includes(word)) return brand;
  return null;
}

// Pull likely model/serial strings out of raw OCR text.
function extractTagFields(text) {
  const up = text.toUpperCase();
  const lines = up.split(/\n+/).map(l => l.trim()).filter(Boolean);
  let model = "", serial = "";
  // "(?:NUMBER|NO...)?" explicitly eats the filler word in "MODEL NUMBER" /
  // "SERIAL NUMBER" / "SERIAL NO." so the capture lands on the actual value —
  // otherwise the word NUMBER itself gets captured, rejected, and the real
  // serial on that line is lost.
  // Bilingual plates (Rheem, Carrier, anything sold in Canada) print
  // "MODEL NO./ MODELE N° 14AJM30A01" and "SERIAL NO./ N° DE SERIE W4613...":
  // the FILLER group below eats any run of NO. / NUMBER / N° / MODELE /
  // DE SERIE / slashes between the English label and the value, otherwise the
  // regex stalls on the "/" and the real model number is never captured (a
  // real 2013 Rheem tag scanned as "could not read" for exactly this reason).
  // OCR renders the degree sign as °, º, *, ?, o or 0.
  const FILLER = "(?:[\\s.:#/-]*(?:NUMBER|NUM|N[O0\\u00B0\\u00BA*?]\\.?|MOD[E\\u00C8\\u00C9]LE|MODELE|DE\\s+S[E\\u00C8\\u00C9]RIE|S[E\\u00C8\\u00C9]RIE))*";
  const modelLabel = new RegExp("(?:MODEL|MODLE|M/N|MOD|M0DEL)" + FILLER + "[.:#/ ]*\\s*([A-Z0-9][A-Z0-9./-]{4,24})");
  const serialLabel = new RegExp("(?:SERIAL|SER|S/N|5/N)" + FILLER + "[.:#/ ]*\\s*([A-Z0-9][A-Z0-9-]{5,24})");
  for (const line of lines) {
    if (!model) { const m = line.match(modelLabel); if (m && !/NUMBER|NO\.?$/.test(m[1])) model = m[1]; }
    if (!serial) { const m = line.match(serialLabel); if (m && !/NUMBER|NO\.?$/.test(m[1])) serial = m[1]; }
  }
  // No labels found — look for any token matching a known model pattern.
  if (!model) {
    const tokens = up.match(/[A-Z0-9./-]{5,24}/g) || [];
    for (const t of tokens) {
      const cleaned = t.replace(/[./]/g, "");
      if (MODEL_PATTERNS.some(p => p.re.test(cleaned))) { model = cleaned; break; }
    }
  }
  // Serial fallback: many brands (Goodman/Daikin/Amana) use an all-digit
  // serial — grab the longest 8-16 digit run that isn't part of the model.
  if (!serial) {
    // Deliberately written WITHOUT lookbehind. Safari only gained lookbehind in
    // 16.4, and an unsupported lookbehind is a PARSE-time SyntaxError — the
    // whole of app.js would fail to execute, leaving a permanently blank app on
    // any older iPhone rather than just breaking the scanner. Same result via a
    // capture group: match an optional preceding character, then require it not
    // be alphanumeric.
    // Split on anything that isn't alphanumeric and keep the tokens that are
    // ALL digits — a token boundary is exactly what the lookbehind/lookahead
    // pair was expressing ("a digit run with no letter or digit glued to
    // either end"), and it says it more plainly.
    const best = up.split(/[^A-Z0-9]+/)
      .filter(t => /^[0-9]{8,16}$/.test(t))
      .filter(t => !model.includes(t))
      .sort((a, b) => b.length - a.length);
    if (best.length) serial = best[0];
  }
  return { model: model.replace(/[.]+$/, ""), serial: serial.replace(/[.]+$/, ""), brandHint: detectBrandInText(up) };
}

let tessWorkerPromise = null;
function loadTesseract() {
  if (window.Tesseract) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "vendor/tesseract.min.js";
    s.onload = resolve;
    s.onerror = () => reject(new Error("Could not load the OCR engine files."));
    document.head.appendChild(s);
  });
}
async function getTessWorker(onStatus) {
  await loadTesseract();
  if (!tessWorkerPromise) {
    const base = new URL(".", location.href).href;
    tessWorkerPromise = Tesseract.createWorker("eng", 1, {
      workerPath: base + "vendor/worker.min.js",
      corePath: base + "vendor/",
      langPath: base + "vendor",
      gzip: true,
      logger: (m) => { if (m.status && onStatus) onStatus(m.status + (m.progress ? ` ${Math.round(m.progress*100)}%` : "")); },
    });
  }
  return tessWorkerPromise;
}

// Downscale the photo before OCR — phone photos are huge and slow to process.
async function preprocessPhoto(file) {
  const bmp = await createImageBitmap(file);
  const maxDim = 1600;
  const scale = Math.min(1, maxDim / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return canvas;
}

// Same pixels turned by 90/180/270 degrees. Tesseract reads horizontal text
// only and the bundled worker has no orientation detection, so a plate shot
// sideways (a photo taken with the phone turned, which the tech never
// notices) came back "couldn't find a model number" every time.
function rotateCanvas(src, deg) {
  const out = document.createElement("canvas");
  const swap = deg === 90 || deg === 270;
  out.width = swap ? src.height : src.width;
  out.height = swap ? src.width : src.height;
  const ctx = out.getContext("2d");
  ctx.translate(out.width / 2, out.height / 2);
  ctx.rotate(deg * Math.PI / 180);
  ctx.drawImage(src, -src.width / 2, -src.height / 2);
  return out;
}

// OCR a tag photo and pull model/serial out of it. Reads upright first, and
// if no model number turns up tries the photo turned 90, 270 and 180 degrees
// before giving up. Returns the first pass that yields a model, else the best
// of the failed passes (so a serial found upright is not thrown away).
async function ocrTagFields(file, onStatus) {
  const base = await preprocessPhoto(file);
  const worker = await getTessWorker(onStatus);
  let best = null;
  for (const deg of [0, 90, 270, 180]) {
    if (deg && onStatus) onStatus("No model number yet - reading the photo turned " + deg + " degrees...");
    const canvas = deg ? rotateCanvas(base, deg) : base;
    const { data } = await worker.recognize(canvas);
    const fields = extractTagFields(data.text || "");
    fields.text = data.text || "";
    if (fields.model) { if (deg) trackEvent("tag read after rotate " + deg); return fields; }
    if (!best || (fields.serial && !best.serial)) best = fields;
  }
  return best;
}

function scanStatus(msg) {
  const el = document.getElementById("scanStatus");
  if (msg) { el.textContent = msg; el.classList.remove("hidden"); }
  else el.classList.add("hidden");
}

// Failed-scan photo storage — when OCR can't read a tag, keep the photo on
// THIS phone (IndexedDB, separate tiny DB) so the tech can send it to Andy or
// show it on-site. Nothing leaves the device automatically. Keeps the newest 20.
const FAILED_SCANS_DB = "bfc-failed-scans-db";
const FAILED_SCANS_STORE = "scans";
function openFailedScansDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(FAILED_SCANS_DB, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(FAILED_SCANS_STORE)) {
        db.createObjectStore(FAILED_SCANS_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function saveFailedScan(blob) {
  try {
    const db = await openFailedScansDb();
    const rec = { id: Date.now() + "-" + Math.random().toString(36).slice(2, 8), blob, tech: getTechName(), ts: new Date().toLocaleString() };
    await new Promise((resolve, reject) => {
      const tx = db.transaction(FAILED_SCANS_STORE, "readwrite");
      tx.objectStore(FAILED_SCANS_STORE).put(rec);
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
    });
    // prune to newest 20
    const all = await new Promise((resolve, reject) => {
      const tx = db.transaction(FAILED_SCANS_STORE, "readonly");
      const r = tx.objectStore(FAILED_SCANS_STORE).getAll();
      r.onsuccess = () => resolve(r.result || []); r.onerror = () => reject(r.error);
    });
    if (all.length > 20) {
      all.sort((a, b) => (a.id < b.id ? -1 : 1));
      const drop = all.slice(0, all.length - 20);
      const tx = db.transaction(FAILED_SCANS_STORE, "readwrite");
      drop.forEach(d => tx.objectStore(FAILED_SCANS_STORE).delete(d.id));
    }
    return rec;
  } catch (e) { return null; }
}
// Let the tech hand the photo off: native share sheet (Messages/email/etc.)
// where supported, otherwise download the image so they can attach it manually.
async function sendFailedScan(blob, rec) {
  const name = "unreadable-tag-" + (rec && rec.tech ? rec.tech.replace(/\s+/g, "") + "-" : "") + Date.now() + ".jpg";
  const file = new File([blob], name, { type: blob.type || "image/jpeg" });
  const caption = "Tag the scanner couldn't read" + (rec && rec.tech ? " — " + rec.tech : "") + (rec && rec.ts ? " — " + rec.ts : "");
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: "Unreadable HVAC tag", text: caption });
      trackEvent("sent unreadable tag photo");
      return;
    }
  } catch (e) {
    if (e && e.name === "AbortError") return; // tech dismissed the share sheet
  }
  // Fallback: download the image so it lands in Photos/Downloads to attach.
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  trackEvent("saved unreadable tag photo to device");
}

async function scanTagPhoto(file) {
  trackEvent("scanned a tag photo");
  const preview = document.getElementById("scanPreview");
  preview.src = URL.createObjectURL(file);
  preview.classList.remove("hidden");
  document.getElementById("scanResult").innerHTML = "";
  try {
    scanStatus("Reading the tag… first scan on a phone takes ~15-30 seconds.");
    const fields = await ocrTagFields(file, scanStatus);
    scanStatus(null);
    document.getElementById("scanModelInput").value = fields.model;
    document.getElementById("scanSerialInput").value = fields.serial;
    if (!fields.model) {
      trackEvent("scan unreadable - no model found");
      scanStatus("I can't read the tag — please try again (straighter, closer, better lit), or enter the model number manually below.");
      const rec = await saveFailedScan(file);
      const box = document.getElementById("scanResult");
      box.innerHTML = `<div class="scan-id-card"><div class="card"><p>📷 Photo saved on this phone. If you can't get a clean scan, send it to Andy and he'll add the unit.</p><div class="scan-actions"><button class="primary-act" id="scanSendFail">📤 Send this photo to Andy</button></div></div></div>`;
      const btn = document.getElementById("scanSendFail");
      if (btn) btn.onclick = () => sendFailedScan(file, rec);
    } else {
      renderScanResult(identifyModel(fields.model, fields.serial, fields.brandHint));
    }
  } catch (err) {
    scanStatus("Scan failed: " + (err && err.message ? err.message : err) + " — you can still type the model number below.");
  }
}

// Internet lookup buttons — the fallback when the offline library doesn't
// have the unit (and a handy extra when it does). Each opens the phone's
// browser with a prefilled search; no data leaves the app otherwise.
function scanWebLinks(info) {
  if (!navigator.onLine) {
    return `<div class="scan-offline-note">📵 No signal right now — when you're back online, buttons to pull this model's info from the internet will appear here automatically.</div>`;
  }
  const g = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;
  const brand = info.brand || info.brandGuess || "";
  const links = [];
  if (!info.brand) {
    links.push(`<a href="${g(`"${info.model}" hvac model number`)}" target="_blank" rel="noopener">🌐 Web: what is this unit?</a>`);
  }
  links.push(`<a href="${g(`${brand} ${info.model} hvac specifications`.trim())}" target="_blank" rel="noopener">🔍 Web: ${escapeHtml(info.model)} specs</a>`);
  links.push(`<a href="${g(`"${info.model}" installation OR service manual pdf`)}" target="_blank" rel="noopener">📄 Web: find the manual (PDF)</a>`);
  if (info.serial && !info.age) {
    links.push(`<a href="${g(`${brand || "hvac"} serial number ${info.serial} manufacture date`)}" target="_blank" rel="noopener">📅 Web: unit age from serial</a>`);
  }
  return links.join("");
}

let lastScanInfo = null;

function renderScanResult(info) {
  scanStatus(null);
  lastScanInfo = info;
  const box = document.getElementById("scanResult");
  if (!info) { box.innerHTML = ""; return; }
  const facts = [];
  if (info.brand) {
    facts.push(["Brand", info.brand]);
    facts.push(["Equipment type", info.equipment]);
    facts.push(["Series", info.series]);
    if (info.capacity) facts.push(["Capacity", info.capacity]);
  } else if (info.brandGuess) {
    facts.push(["Brand", info.brandGuess + " (read off the tag)"]);
  }
  if (info.age) facts.push(["Age", info.age]);
  const codeCount = info.brand ? getAllCodes().filter(c => c.brand === info.brand && c.equipment === info.equipment).length : 0;
  const notes = (info.notes || []).map(n => `<li><span class="k">Note</span>${escapeHtml(n)}</li>`).join("");
  const factsHtml = facts.map(([k, v]) => `<li><span class="k">${escapeHtml(k)}</span>${escapeHtml(v)}</li>`).join("");
  const unknown = !info.brand ? `<p>Model <strong>${escapeHtml(info.model)}</strong> isn't in the offline library yet — ${navigator.onLine ? "use the Web buttons below to pull its info from the internet" : "no signal, so get to coverage and the internet lookup buttons will light up"}. Tell the office so it gets added for offline use.</p>` : "";
  const ocrBanner = info.ocrGuess ? `<p class="scan-ocr-note">📷 The scan read <strong>${escapeHtml(info.rawModel)}</strong>, which looks like an OCR misread. Closest known model is <strong>${escapeHtml(info.model)}</strong> — <strong>check the tag</strong> to confirm before trusting the details below (watch 0/O and 1/I).</p>` : "";
  const manualsBrand = info.brand || info.brandGuess;
  box.innerHTML = `
    <div class="scan-id-card">
      <div class="card">
        <div class="card-top"><div><div class="card-code">${escapeHtml(info.model)}</div>${info.serial ? `<div class="card-sub">S/N ${escapeHtml(info.serial)}</div>` : ""}</div></div>
        ${unknown}
        ${ocrBanner}
        <ul class="scan-id-facts">${factsHtml}${notes}</ul>
        <div class="scan-actions">
          ${info.brand ? `<button class="primary-act" id="scanGoCodes">⚡ ${escapeHtml(info.brand)} ${escapeHtml(info.equipment)} codes (${codeCount})</button>` : ""}
          <button id="scanGoDiag">🩺 Diagnostics${info.equipment ? " for " + escapeHtml(info.equipment) : ""}</button>
          ${manualsBrand ? `<button id="scanGoManuals">📄 ${escapeHtml(manualsBrand)} manuals</button>` : ""}
          ${(info.brand === "Generac" && typeof genFamilyForModel === "function" && genFamilyForModel(info.model)) ? `<button class="primary-act" id="scanGoGen">🔌 Open in Generators</button>` : ""}
          ${scanWebLinks(info)}
        </div>
      </div>
    </div>`;
  const goCodes = document.getElementById("scanGoCodes");
  if (goCodes) goCodes.onclick = () => {
    codesState.brand = info.brand; codesState.equipment = info.equipment; codesState.search = "";
    document.getElementById("codesSearchInput").value = "";
    showScreen("codes");
  };
  document.getElementById("scanGoDiag").onclick = () => {
    diagState.equipment = info.equipment || "All"; diagState.search = "";
    document.getElementById("diagSearchInput").value = "";
    showScreen("diagnostics");
  };
  const goManuals = document.getElementById("scanGoManuals");
  if (goManuals) goManuals.onclick = () => {
    manualsState.brand = manualsBrand; manualsState.model = null; manualsState.search = "";
    document.getElementById("manualSearchInput").value = "";
    showScreen("manuals");
  };
  const goGen = document.getElementById("scanGoGen");
  if (goGen) goGen.onclick = () => {
    const fam = genFamilyForModel(info.model);
    genState.search = ""; document.getElementById("genSearchInput").value = "";
    showScreen("gen");
    if (fam) openGenDetail(fam.id, info.model);
  };
}

// If the tech scanned with no signal and then gets coverage, swap the
// "no signal" note for the live internet lookup buttons on the spot.
window.addEventListener("online", () => {
  if (lastScanInfo && document.getElementById("scanResult").innerHTML) renderScanResult(lastScanInfo);
});

document.getElementById("tagPhotoInput").addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (file) scanTagPhoto(file);
  e.target.value = "";
});
document.getElementById("scanIdentifyBtn").addEventListener("click", () => {
  const model = document.getElementById("scanModelInput").value.trim();
  const serial = document.getElementById("scanSerialInput").value.trim();
  if (!model) { scanStatus("Type or scan a model number first."); return; }
  scanStatus(null);
  trackEvent("identified unit: " + model);
  renderScanResult(identifyModel(model, serial));
});

// ============================================================
// Warranty Check — scan the tag, jump to the maker's own warranty
// lookup with the serial in hand. Every URL below was verified
// against the manufacturer's live site (2026-08). Warranty follows
// the BADGE on the tag, not the platform: a Bryant-badged Carrier
// goes to bryant.com, an American Standard to americanstandardair.
// ============================================================

// embed: Daikin-family's lookup page reads ?serial/&model/&lastname from the
// URL, auto-runs the search on load, defaults Install Type to Residential, and
// sends no frame-blocking headers — so it runs INSIDE the app, filled in.
// jci: m.upgnet.com/SN/<serial> opens the results directly (no typing at all).
// captcha: the maker's lookup sits behind a CAPTCHA, which no app is allowed
// to fill for you — best legal automation is serial-copied + open their page.
const WARRANTY_PORTALS = {
  "SAMSUNG": { label: "Samsung HVAC warranty lookup", url: "https://www.samsunghvac.com/warranty-lookup", needs: "serial number", note: "Product registration is at https://www.samsunghvac.com/product-registration. Registration questions: registrations@samsunghvac.com; general support customersupport@samsunghvac.com." },
  "LG ELECTRONICS": { label: "LG DFS warranty lookup (LG ductless / HVAC)", url: "https://lg-dfs-warranty.com/warranty-lookup", needs: "serial number", note: "Registration is at https://www.lg-dfs-warranty.com/register. LG HVAC contractor support runs through lghvac.com/contact-us/. LG data plates read 'LG Electronics' - that is the badge string this entry keys on." },
  "FUJITSU": { label: "Fujitsu warranty lookup and registration (Fujitsu General America)", url: "https://access.fujitsugeneral.com/en-US/warranty/lookup/serialnumber", needs: "serial number", note: "Registration is at https://access.fujitsugeneral.com/en-US/warranty/register. The access.fujitsugeneral.com site sits behind a Cloudflare human check, so it may make you clear a challenge before the serial box appears. Fujitsu General America service line 888-888-3424, servicehvac@fujitsugeneral.com." },
  "lennox": { label: "Lennox Consumer Warranty Lookup", url: "https://www.lennox.com/support/warranty", needs: "model number + serial number (and purchase/install date if available)", note: "Legacy G-series and Aire-Flo furnaces in this group are long out of warranty; use the lookup to confirm any heat-exchanger coverage. Product registration is at https://www.lennox.com/support/product-registration. Lennox technical support: 1-800-9-LENNOX." },
  "CONCORD": { label: "Concord warranty registration (Allied Air)", url: "https://www.concord-air.com/warranty-and-support/warranty-registration/", needs: "model number, serial number, installation date, installing dealer", note: "Same Allied Air backend as Armstrong Air, AirEase and Ducane. Register within 60 days for the 10-year parts period. 1-800-448-5872." },
  "DUCANE": { label: "Ducane warranty registration (Allied Air)", url: "https://www.ducanehvac.com/owner-support/warranty-registration/", needs: "model number, serial number, installation date, installing dealer", note: "Same Allied Air backend as Armstrong Air, AirEase and Concord. Register within 60 days for the 10-year parts period. 1-800-448-5872." },
  "AIREASE": { label: "AirEase warranty registration (Allied Air)", url: "https://www.alliedairregistration.com/html/ALDWelcome.htm", needs: "model number, serial number, installation date, installing dealer", note: "AirEase is the same hardware as Armstrong Air - the model number nomenclature itself prints 'A = AirEase | Armstrong Air'. Same Allied Air registration backend. 1-800-448-5872." },
  "ARMSTRONG AIR": { label: "Armstrong Air warranty registration (Allied Air)", url: "https://www.armstrongair.com/owners/warranty-registration/", needs: "model number, serial number, installation date, installing dealer", note: "Registers through the shared Allied Air portal at alliedairregistration.com. Register within 60 days of installation for the 10-year parts period; otherwise 5 years. 1-800-448-5872." },
  "ALLIED": { label: "Allied Air warranty registration and coverage lookup (Armstrong Air / AirEase / Ducane / Concord)", url: "https://www.alliedairregistration.com/html/ALDWelcome.htm", needs: "model number, serial number, installation date and the installing dealer's name and address (email for the confirmation)", note: "One shared Allied Air backend behind four brand front doors: armstrongair.com/owners/warranty-registration/, ducanehvac.com/owner-support/warranty-registration/, concord-air.com/warranty-and-support/warranty-registration/ and the AirEase equivalent. Extended-warranty period lookup is at https://apps.alliedconnect.com/WarrantyPeriodLookup/ExtendedWarrantyLookup.aspx?Alias=ALD&USERSORG=AR01. Registration within 60 days of installation is what earns the 10-year parts period; unregistered equipment defaults to 5 years (stated on the 4SHP16LS and BCE5C spec sheets). Allied Air Enterprises LLC, 215 Metropolitan Drive, West Columbia SC 29170, 1-800-448-5872." },
  "WEATHERKING": { label: "WeatherKing warranty verification (registermyunit.com)", url: "https://weatherking.registermyunit.com/en-US/warranty/brand?brand=weatherking", needs: "serial number (no spaces) - tap Verify existing Warranty; homeowner last name + state unlock the certificate", note: "WeatherKing is Rheem's third badge and runs on the same registermyunit.com platform as Rheem and Ruud. Verified reachable (HTTP 200). Factory / warranty line 479-646-4311 (Fort Smith AR); California warranty line 866-251-4090." },
  "ARCOAIRE": { label: "Arcoaire registration lookup (ICP)", url: "https://productregistration2.icpusa.com/public/ManageRegistration?brand=ICP", needs: "last name plus either the confirmation number or the 10-digit serial number", note: "Arcoaire is an International Comfort Products badge - every ICP brand registers on the same portal. Registration lookup only; there is no public warranty-status search. Consumer Relations 1-877-591-8908." },
  "COMFORTMAKER": { label: "Comfortmaker registration lookup (ICP)", url: "https://productregistration2.icpusa.com/public/ManageRegistration?brand=ICP", needs: "last name plus either the confirmation number or the 10-digit serial number", note: "Comfortmaker is an International Comfort Products badge - every ICP brand registers on the same portal. Registration lookup only; there is no public warranty-status search. Consumer Relations 1-877-591-8908." },
  "TEMPSTAR": { label: "Tempstar registration lookup (ICP)", url: "https://productregistration2.icpusa.com/public/ManageRegistration?brand=ICP", needs: "last name plus either the confirmation number or the 10-digit serial number", note: "Tempstar is an International Comfort Products badge - every ICP brand registers on the same portal. Registration lookup only; there is no public warranty-status search. Consumer Relations 1-877-591-8908." },
  "HEIL": { label: "Heil registration lookup (ICP)", url: "https://productregistration2.icpusa.com/public/ManageRegistration?brand=ICP", needs: "last name plus either the confirmation number or the 10-digit serial number", note: "Heil is an International Comfort Products badge - every ICP brand registers on the same portal. Registration lookup only; there is no public warranty-status search. Consumer Relations 1-877-591-8908." },
  "ICP": { label: "ICP registration lookup (Heil / Tempstar / Comfortmaker / Arcoaire / Day & Night / KeepRite / AirQuest)", url: "https://productregistration2.icpusa.com/public/ManageRegistration?brand=ICP", needs: "last name plus either the confirmation number or the 10-digit serial number - no model number and no zip code", note: "This finds an existing REGISTRATION, not a warranty status - ICP publishes no public warranty-status lookup. New registration is at https://productregistration2.icpusa.com/Public/RegistrationForm?brand=icp and needs model and 10-digit serial for up to 6 units plus installing dealer details. Registration within 90 days of install is what earns the 10-year parts period; otherwise 5 years. For coverage questions call ICP Consumer Relations 1-877-591-8908 or the installing dealer. Claims by mail: ICP, Warranty Claims, P.O. Box 4808, Syracuse, NY 13221." },
  "ameristar": { label: "Ameristar warranty (register / lookup)", url: "https://ameristarhvac.com/warranty/", needs: "serial number; registration must be completed online within sixty (60) days of the Commencement Date or only the base warranty terms apply", note: "Confirmed from the M-series warranty table GW-659-1918 printed in the M4AC3 installation manual: register at ameristarhvac.com (Begin Online Registration) within 60 days or the base terms apply. Registered terms on the legacy M-series are ten (10) years - compressor / outdoor coil / parts on M4AC3 (018, 24, 30, 36, 42, 43, 48, 60), M4AC4, M4AC6, M4HP3, M4HP4, M4HP6; indoor coil and parts on air handlers M4AH3 / M4AH4 / M4AH6; parts on furnaces M801P / M951P / M952V with a 20 year heat exchanger. The one base term that is legible in the recovered copy is the exception: M4AC3017 / 023 / 029 and the R-22 M2AC3 / M2HP3 get only ONE year base. Registration also runs through American Standard: americanstandardair.com or 855-260-2975; general line 1-844-997-4569." },
  "americanStandard": { label: "American Standard warranty lookup", url: "https://www.americanstandardair.com/resources/warranty-and-registration/lookup/", needs: "serial number + customer last name", note: "Same manufacturer as Trane; American Standard literature carries a DLR- document prefix where Trane uses ODR-." },
  "trane": { label: "Trane residential warranty lookup", url: "https://www.trane.com/residential/en/resources/warranty-and-registration/lookup/", needs: "serial number (add the customer last name for the certificate)", note: "Register within 60 days of installation or only base warranty terms apply. Registration line 1-855-260-2975; residential support 1-866-720-5051." },
  "GOODMAN":           { label: "Goodman warranty lookup", url: "https://www.goodmanmfg.com/warranty-lookup", needs: "serial number", embed: "https://warranty.goodmanmfg.com/entitlement/GenericEntitlementLookup.htm?site=Goodman" },
  "AMANA":             { label: "Amana warranty lookup", url: "https://www.amana-hac.com/warranty-lookup", needs: "serial number", embed: "https://warranty.goodmanmfg.com/entitlement/GenericEntitlementLookup.htm?site=Amana" },
  "DAIKIN":            { label: "Daikin warranty lookup", url: "https://daikincomfort.com/warranty-lookup", needs: "serial number", embed: "https://warranty.goodmanmfg.com/entitlement/GenericEntitlementLookup.htm?site=Daikin" },
  "CARRIER":           { label: "Carrier warranty lookup", url: "https://www.carrier.com/residential/en/us/warranty-lookup/", needs: "serial number", captcha: true },
  "BRYANT":            { label: "Bryant warranty lookup", url: "https://www.bryant.com/en/us/warranty-lookup/", needs: "serial number", captcha: true },
  "PAYNE":             { label: "Payne registration & warranty", url: "https://www.payne.com/en/us/registration-warranty", needs: "serial number", captcha: true, note: "The Carrier lookup also accepts Payne serials if this page sends you in circles." },
  "LENNOX":            { label: "Lennox warranty lookup", url: "https://www.lennox.com/residential/owners/assistance/warranty/", needs: "serial number (formats like 5817F04321 / A12A345678) - the lookup is right on the page", captcha: true, note: "Warranty CLAIMS still go through a Lennox dealer; the lookup is free to anyone." },
  "TRANE":             { label: "Trane warranty lookup", url: "https://www.trane.com/residential/en/resources/warranty-and-registration/lookup/", needs: "serial number (+ last name for the certificate)" },
  "AMERICAN STANDARD": { label: "American Standard warranty lookup", url: "https://www.americanstandardair.com/resources/warranty-and-registration/lookup/", needs: "serial number + customer last name" },
  "YORK":              { label: "York warranty & registration", url: "https://www.york.com/residential-equipment/warranty-and-registration", needs: "serial number", jci: true },
  "LUXAIRE":           { label: "Luxaire warranty & registration", url: "https://www.luxaire.com/residential-equipment/warranty-and-registration", needs: "serial number", jci: true },
  "COLEMAN":           { label: "Coleman warranty & registration", url: "https://www.colemanac.com/residential-equipment/warranty-and-registration", needs: "serial number", jci: true },
  "RHEEM":             { label: "Rheem warranty verification", url: "https://rheem.registermyunit.com/en-US/warranty/brand?brand=rheem", needs: "serial number - tap Verify existing Warranty; homeowner last name + state unlock the certificate", note: "Rheem moved verification to registermyunit.com; the old rheem.com page just points here now." },
  "RUUD":              { label: "Ruud warranty verification", url: "https://ruud.registermyunit.com/en-US/warranty/brand?brand=ruud", needs: "serial number (no spaces) - tap Verify existing Warranty; homeowner last name + state unlock the certificate" },
  "MITSUBISHI":        { label: "Mitsubishi Electric warranties", url: "https://www.mitsubishicomfort.com/warranties", needs: "no public serial lookup - call 800-433-4822 with the serial", note: "METUS has no public serial lookup; registration status comes from customer care or the installing contractor's METUS account." },
  // Nortek Global HVAC badges (Frigidaire / Maytag / Gibson / Westinghouse / Tappan / Kelvinator / Broan / NuTone / Intertherm / Miller).
  // Nortek was acquired by Rheem; registration + lookup run on registermyunit.com (Rheem's MyRheem platform), one wizard per badge.
  "FRIGIDAIRE":        { label: "Frigidaire warranty lookup / registration (registermyunit.com)", url: "https://frigidaire.registermyunit.com/warranty/wizard?brand=frigidaire", needs: "serial number - the wizard's top-right serial box returns registration and coverage status without an account; full registration needs model, serial, install date, installer and homeowner details", note: "Frigidaire (Nortek Global HVAC, now Rheem-owned): 5-year limited parts unregistered, 10-year when registered within 60 days of install (CA and Quebec get 10 automatically). Support 1-800-422-4328." },
  "MAYTAG":            { label: "Maytag HVAC warranty registration (registermyunit.com)", url: "https://maytag.registermyunit.com/warranty/wizard?brand=maytag", needs: "model + serial + install date - the Maytag wizard goes straight into registration; try the serial box first, it runs on the same backend as Frigidaire's", note: "Maytag HVAC = Nortek Global HVAC (Rheem-owned). Register within 60 days for the extended term. Support 1-800-422-4328." },
  "GIBSON":            { label: "Gibson warranty registration (registermyunit.com)", url: "https://gibson.registermyunit.com/en-US/warranty/wizard?brand=gibson", needs: "model + serial + install date; warranty terms page at gibsonhvac.com/central-system-warranty/", note: "Gibson = Nortek Global HVAC (Rheem-owned): 3-year unregistered, 10-year registered within 60 days. Support 1-800-422-4328." },
  "NORTEK":            { label: "Nortek Global HVAC warranty (Westinghouse / Tappan / Kelvinator / Broan / NuTone / Intertherm / Miller / Nordyne)", url: "https://www.nortekhvac.com/", needs: "model + serial; call 1-800-422-4328 with the serial - the other Nortek badges register through the same registermyunit.com platform but only Frigidaire, Maytag and Gibson have public wizard URLs", note: "All Nortek badges share one warranty policy: register within 60 days of install for the extended term; unregistered coverage is the shorter base term dated from install (or manufacture when no install proof)." },
  "BOSCH":             { label: "Bosch warranty lookup (ARC Spare Parts Finder)", url: "https://arc.bosch-homecomfort.us/SparePartsFinder?type=material-serial&lang=en", needs: "serial number - the ARC material/serial search; a login control sits top-right but the search box rendered without a login wall", note: "Bosch has no standalone anonymous serial-lookup page on bosch-homecomfort.com - ARC (Aftermarket Resource Center) is the real tool. Bosch's own FAQ says the warranty START DATE is based on the MANUFACTURE date, so an unregistered unit's coverage is dated from the factory, not the install. Warranty phone 1-800-283-3787 (Mon-Thu 8-6 ET, Fri 8-5); warranty_returns@us.bosch.com." },
};
// The literal badge printed on the tag decides the portal.
function detectBadgeInText(up) {
  for (const badge of Object.keys(WARRANTY_PORTALS)) if (up.includes(badge)) return badge;
  return null;
}
// Model-pattern brand -> default badge when the tag text didn't say.
const BRAND_TO_BADGE = { Goodman: "GOODMAN", Daikin: "DAIKIN", Carrier: "CARRIER", Lennox: "LENNOX", Trane: "TRANE", York: "YORK", Rheem: "RHEEM", Mitsubishi: "MITSUBISHI", Bosch: "BOSCH", Nortek: "NORTEK", ICP: "ICP", "Allied Air": "ALLIED", LG: "LG ELECTRONICS", Fujitsu: "FUJITSU", Samsung: "SAMSUNG" };

function warrantyStatus(msg) {
  const el = document.getElementById("warrantyStatus");
  if (msg) { el.textContent = msg; el.classList.remove("hidden"); }
  else el.classList.add("hidden");
}

async function warrantyScanPhoto(file) {
  trackEvent("warranty scanned a tag");
  const preview = document.getElementById("warrantyPreview");
  preview.src = URL.createObjectURL(file);
  preview.classList.remove("hidden");
  document.getElementById("warrantyResult").innerHTML = "";
  try {
    warrantyStatus("Reading the tag… first scan on a phone takes ~15-30 seconds.");
    const fields = await ocrTagFields(file, warrantyStatus);
    warrantyStatus(null);
    if (fields.serial) document.getElementById("warrantySerialInput").value = fields.serial;
    if (fields.model) document.getElementById("warrantyModelInput").value = fields.model;
    if (!fields.serial && !fields.model) {
      warrantyStatus("Couldn't find a serial or model on the photo — try a straighter, closer shot, or type them below.");
      return;
    }
    renderWarrantyResult(fields.model, fields.serial, detectBadgeInText((fields.text || "").toUpperCase()));
  } catch (err) {
    warrantyStatus("Scan failed: " + (err && err.message ? err.message : err) + " — you can type the serial below.");
  }
}

async function warrantyCopy(text, btn) {
  try {
    await navigator.clipboard.writeText(text);
    const was = btn.textContent; btn.textContent = "✓ Copied";
    setTimeout(() => { btn.textContent = was; }, 1500);
  } catch { warrantyStatus("Couldn't copy — long-press the field to copy it by hand."); }
}

// Full-screen embedded portal (same shell as the PDF reader). Only used for
// makers whose lookup page allows framing AND pre-fills itself from the URL.
let portalOpen = false;
function openPortalEmbed(url, title) {
  const v = document.getElementById("portalViewer");
  document.getElementById("portalViewerTitle").textContent = title;
  document.getElementById("portalExternalLink").href = url;
  document.getElementById("portalFrame").src = url;
  v.classList.remove("hidden");
  history.pushState({ bfcPortal: 1 }, "");
  portalOpen = true;
}
function closePortalEmbed(fromPop) {
  const v = document.getElementById("portalViewer");
  if (v.classList.contains("hidden")) return;
  v.classList.add("hidden");
  document.getElementById("portalFrame").src = "about:blank";
  if (portalOpen && !fromPop) history.back();
  portalOpen = false;
}
document.getElementById("portalCloseBtn").onclick = () => closePortalEmbed(false);

function warrantyOwnerFields() {
  return {
    lastName: document.getElementById("warrantyLastNameInput").value.trim(),
    zip: document.getElementById("warrantyZipInput").value.trim(),
    state: document.getElementById("warrantyStateInput").value.trim().toUpperCase(),
  };
}

function renderWarrantyResult(model, serial, badgeFromTag) {
  const box = document.getElementById("warrantyResult");
  const info = model ? identifyModel(model, serial, null) : null;
  let badge = badgeFromTag;
  if (!badge && info && info.brand) badge = BRAND_TO_BADGE[info.brand] || null;
  const portal = badge ? WARRANTY_PORTALS[badge] : null;

  const facts = [];
  if (info && info.brand) { facts.push(["Unit", info.brand + " " + (info.equipment || "")]); if (info.age) facts.push(["Age (from serial)", info.age]); }
  const factsHtml = facts.map(([k, v]) => `<li><span class="k">${escapeHtml(k)}</span>${escapeHtml(v)}</li>`).join("");

  const offline = !navigator.onLine;
  const owner = warrantyOwnerFields();
  let portalHtml = "";
  if (portal) {
    const links = [];
    let needsLine = `That page asks for: <strong>${escapeHtml(portal.needs)}</strong>.${portal.note ? " " + escapeHtml(portal.note) : ""}`;
    if (portal.embed && serial) {
      // Daikin family: their page fills itself from these params and runs the
      // search on load, Install Type already on Residential.
      const embedUrl = portal.embed
        + "&serial=" + encodeURIComponent(serial)
        + "&model=" + encodeURIComponent(model || "")
        + "&lastname=" + encodeURIComponent(owner.lastName);
      links.push(`<button class="scan-btn warranty-portal" id="warrantyEmbedBtn" data-url="${escapeHtml(embedUrl)}">🛡️ Run the lookup — right here, filled in</button>`);
      needsLine = `Serial${model ? " + model" : ""}${owner.lastName ? " + homeowner name" : ""} go in by themselves; Residential is pre-selected. ${owner.lastName ? "" : "Add the homeowner's last name above first if you want the FULL registered coverage table."}`;
    } else if (portal.jci && serial) {
      links.push(`<a class="scan-btn warranty-portal" href="https://m.upgnet.com/SN/${encodeURIComponent(serial)}" target="_blank" rel="noopener">🛡️ Open results for S/N ${escapeHtml(serial)} — no typing</a>`);
      needsLine = `That link opens the JCI record for this exact serial — nothing to fill in.`;
    }
    // The maker's own page, always available (primary when nothing better exists).
    // When we have a serial, tapping it also drops the serial on the clipboard.
    const hasPrimary = links.length > 0;
    const copyNote = serial && !hasPrimary ? ` data-copy="${escapeHtml(serial)}"` : "";
    links.push(`<a class="scan-btn warranty-portal${hasPrimary ? " warranty-secondary" : ""}" href="${portal.url}" target="_blank" rel="noopener"${copyNote}${offline ? ' aria-disabled="true"' : ""}>${hasPrimary ? "↗ Or open the maker's page in the browser" : "🛡️ " + escapeHtml(portal.label)}</a>`);
    if (portal.captcha && serial) {
      needsLine += ` Their site runs a human-check (CAPTCHA), so no app is allowed to fill it for you — <strong>your serial goes on the clipboard when you tap; just paste it</strong>.`;
    } else if (serial && !portal.embed && !portal.jci) {
      needsLine += ` <strong>Your serial goes on the clipboard when you tap — just paste it.</strong>`;
    }
    if (/^(RHEEM|RUUD)$/.test(badge) && (owner.lastName || owner.state)) {
      needsLine += ` For the certificate their form wants: last name <strong>${escapeHtml(owner.lastName || "—")}</strong>, state <strong>${escapeHtml(owner.state || "—")}</strong>.`;
    }
    portalHtml = `
      <p class="warranty-needs">${needsLine}</p>
      ${offline ? `<p class="warranty-needs">📵 No signal right now — the button will work once you're back in coverage.</p>` : ""}
      ${links.join("")}`;
  } else {
    portalHtml = `<p class="warranty-needs">Couldn't tell which badge is on the tag — pick the maker:</p>
      <div class="warranty-badge-grid">${Object.entries(WARRANTY_PORTALS).map(([b, p]) =>
        `<button class="warranty-badge" data-badge="${escapeHtml(b)}">${escapeHtml(b.charAt(0) + b.slice(1).toLowerCase())}</button>`).join("")}</div>`;
  }

  box.innerHTML = `
    <div class="card">
      ${serial ? `<div class="card-top"><div><div class="card-code">S/N ${escapeHtml(serial)}</div>${model ? `<div class="card-sub">${escapeHtml(model)}</div>` : ""}</div></div>` : (model ? `<div class="card-top"><div><div class="card-code">${escapeHtml(model)}</div></div></div>` : "")}
      ${factsHtml ? `<ul class="scan-id-facts">${factsHtml}</ul>` : ""}
      <div class="scan-actions">
        ${serial ? `<button id="warrantyCopySerial">📋 Copy serial</button>` : ""}
        ${model ? `<button id="warrantyCopyModel">📋 Copy model</button>` : ""}
      </div>
      ${portalHtml}
      <p class="warranty-needs">Real coverage depends on REGISTRATION, not just age — if the portal shows nothing, the unit may be unregistered and on the shorter base warranty.</p>
    </div>`;
  const cs = document.getElementById("warrantyCopySerial");
  if (cs) cs.onclick = () => warrantyCopy(serial, cs);
  const cm = document.getElementById("warrantyCopyModel");
  if (cm) cm.onclick = () => warrantyCopy(model, cm);
  const eb = document.getElementById("warrantyEmbedBtn");
  if (eb) eb.onclick = () => {
    if (!navigator.onLine) { warrantyStatus("📵 The maker's lookup needs signal — try again in coverage."); return; }
    trackEvent("warranty embed lookup: " + badge);
    openPortalEmbed(eb.dataset.url, (portal ? portal.label : "Warranty lookup"));
  };
  // Copy-on-tap: portals we can't fill get the serial dropped on the clipboard
  // as the tap opens them, so the tech only pastes.
  box.querySelectorAll("[data-copy]").forEach(a => {
    a.addEventListener("click", () => {
      try { navigator.clipboard.writeText(a.dataset.copy); } catch {}
      trackEvent("warranty portal opened w/ serial copied: " + badge);
    });
  });
  box.querySelectorAll(".warranty-badge").forEach(b => {
    b.onclick = () => { trackEvent("warranty badge picked: " + b.dataset.badge); renderWarrantyResult(model, serial, b.dataset.badge); };
  });
  if (badge) trackEvent("warranty portal offered: " + badge);
}

document.getElementById("warrantyPhotoInput").addEventListener("change", (e) => {
  const f = e.target.files && e.target.files[0];
  if (f) warrantyScanPhoto(f);
  e.target.value = "";
});
document.getElementById("warrantyGoBtn").addEventListener("click", () => {
  const serial = document.getElementById("warrantySerialInput").value.trim();
  const model = document.getElementById("warrantyModelInput").value.trim();
  if (!serial && !model) { warrantyStatus("Scan the tag or type a serial number first."); return; }
  warrantyStatus(null);
  renderWarrantyResult(model, serial, null);
});

document.getElementById("sqftGoBtn").addEventListener("click", sqftLookup);
document.getElementById("sqftAddrInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); sqftLookup(); }
});
// Some counties need a town for the records lookup (the tech only types the
// street). The select only appears for those counties, pre-set to the town
// most calls come from.
function sqftSyncTownSelect() {
  const cfg = SQFT_COUNTIES[document.getElementById("sqftCountySelect").value] || {};
  const label = document.getElementById("sqftTownLabel");
  const sel = document.getElementById("sqftTownSelect");
  if (!cfg.towns || !cfg.towns.length) { label.classList.add("hidden"); sel.innerHTML = ""; return; }
  sel.innerHTML = cfg.towns.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("");
  label.classList.remove("hidden");
}
document.getElementById("sqftCountySelect").addEventListener("change", sqftSyncTownSelect);
document.addEventListener("DOMContentLoaded", sqftSyncTownSelect);
// Copy and pick buttons inside result cards are re-rendered per lookup - delegate once.
document.getElementById("sqftResult").addEventListener("click", (e) => {
  const pick = e.target.closest(".sqft-pickbtn");
  if (pick) { sqftPickParcel(pick.dataset.county, pick.dataset.parcel); return; }
  const btn = e.target.closest(".sqft-copybtn");
  if (!btn) return;
  const text = btn.dataset.copy || "";
  if (navigator.clipboard && text) {
    navigator.clipboard.writeText(text).then(
      () => { btn.textContent = "Copied - paste it in their search"; },
      () => { btn.textContent = "Could not copy - type it there"; });
  }
});

// ============================================================
// Network status
// ============================================================

function updateNetStatus() {
  const pill = document.getElementById("netStatus");
  if (navigator.onLine) { pill.textContent = "● online"; pill.className = "status-pill online"; }
  else { pill.textContent = "● offline (cached)"; pill.className = "status-pill offline"; }
}
window.addEventListener("online", updateNetStatus);
window.addEventListener("offline", updateNetStatus);

// ============================================================
// Install prompt (Android/Chrome)
// ============================================================

let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.getElementById("installBanner").classList.remove("hidden");
});
document.getElementById("installBtn").addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.getElementById("installBanner").classList.add("hidden");
});
document.getElementById("dismissInstall").addEventListener("click", () => {
  document.getElementById("installBanner").classList.add("hidden");
});

// ============================================================
// Service worker
// ============================================================

if ("serviceWorker" in navigator) {
  // A new version installs and takes over in the background, but the page a
  // tech is looking at is still running the old code — so without this they'd
  // keep seeing the old version until the next time they open the app. Offer a
  // reload instead of forcing one: an automatic refresh mid-job would wipe out
  // whatever they were part-way through on screen.
  let updateOffered = false;
  function offerUpdate() {
    if (updateOffered) return;
    updateOffered = true;
    showUpdatePill();
  }

  // Watch a freshly-downloading worker and surface the pill the moment it
  // reaches "installed" (its cache is complete and it's ready to serve). This
  // is the earliest, most reliable signal: it fires as soon as the download
  // finishes, so a tech who opens the app once on signal sees the nudge on
  // THAT open instead of only after a second launch. We only pill when a
  // controller already exists — a first-ever install (no controller yet) is
  // the initial setup, not an update worth reloading for.
  function watchWorker(worker) {
    if (!worker) return;
    worker.addEventListener("statechange", () => {
      if (worker.state === "installed" && navigator.serviceWorker.controller) offerUpdate();
    });
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").then((reg) => {
      // A version that finished installing between sessions is already waiting.
      if (reg.waiting && navigator.serviceWorker.controller) offerUpdate();
      watchWorker(reg.installing);
      reg.addEventListener("updatefound", () => watchWorker(reg.installing));

      // Check for a new deploy promptly — on open, and again whenever the app
      // returns to the foreground or regains signal. A PWA a tech leaves open
      // for days would otherwise only ever check at a cold start.
      const check = () => { reg.update().catch(() => {}); };
      check();
      document.addEventListener("visibilitychange", () => { if (!document.hidden) check(); });
      window.addEventListener("online", check);
    }).catch(() => {});
  });

  // Secondary trigger: the new worker took control of this page (skipWaiting +
  // clients.claim). A page loaded before its worker claimed it starts with no
  // controller, so the first handover is the initial claim, not an update —
  // track that so the initial setup isn't mistaken for a new version.
  let haveBaselineController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!haveBaselineController) { haveBaselineController = true; return; }
    offerUpdate();
  });
}

// One shared bottom-centered stack holds every floating notice, so the update
// pill and the bulletin pill can never overlap or crowd — CSS spaces and
// orders them; when only one is present it just sits at the bottom.
function pillStack() {
  let stack = document.getElementById("pillStack");
  if (!stack) {
    stack = document.createElement("div");
    stack.id = "pillStack";
    document.body.appendChild(stack);
  }
  return stack;
}

function showUpdatePill() {
  if (document.getElementById("updatePill")) return;
  const pill = document.createElement("button");
  pill.id = "updatePill";
  pill.className = "update-pill";
  pill.type = "button";
  pill.innerHTML = `<span>Update ready</span><span class="update-pill-cta">Tap to reload</span>`;
  pill.onclick = () => { trackEvent("took an update"); location.reload(); };
  pillStack().appendChild(pill);
}

// ============================================================
// Init
// ============================================================

// Keep in sync with CACHE_NAME in sw.js — shown on the home screen so a tech
// (or the office) can tell at a glance whether a phone has the latest content.
// ===== House Size ============================================================
//
// Square footage off the county assessor's own records, for load calcs.
//
// v111: answers are now self-served in the app through the relay (see the
// SQFT_RELAY comment further down). The county notes below predate the relay
// but the facts in them still hold - they document WHY each county needs the
// path it got, and the link/locate config they describe is still used for the
// secondary links on answer cards and for miss/error fallbacks.
//
// WHAT THE NUMBER MEANS. Verified against the Vanderburgh assessor's sketch for
// 10526 Stephanie Ln: the sketch shows "1s Br B" 1752 plus "1s Br C" 240 = 1992,
// which is exactly the SquareFootage field. The 504 sq ft garage, the deck and
// the stoop are NOT in it, and neither is the basement under that 1752 section.
// So the field is ABOVE-GRADE FINISHED LIVING AREA. A conditioned basement has
// to be added by hand - which is why the UI says so instead of just printing a
// number a tech might size off directly.
//
// WHY THE TWO COUNTIES WORK DIFFERENTLY. Only Vanderburgh publishes building
// data through an API a browser is allowed to call:
//
//   Vanderburgh - Evansville/Vanderburgh GIS ArcGIS REST. Sends
//     Access-Control-Allow-Origin, and the parcel layer carries SquareFootage,
//     YearBuilt, StoryHeight, beds/baths, acreage. Full lookup in the app.
//
//   Warrick - has no such service. Their Think GIS viewer and the assessor's
//     XSoft Engage site both answer without CORS headers, so the app cannot
//     read them. What IS callable is Indiana's statewide parcel service, which
//     covers Warrick with addresses and parcel numbers but carries NO building
//     square footage. So for Warrick the app resolves the address to the exact
//     parcel, then hands off one tap into the assessor's record for that
//     parcel. The tech reads the number there rather than being handed a
//     number this app cannot actually see.
//
// Do not "fix" Warrick by scraping those two sites - the app runs from a
// browser and the browser will refuse the read.
//
// BUT: every county on the XSoft Engage platform posts the full Property
// Record Card as a PUBLIC PDF on Azure blob storage at a predictable URL
// (engageblob.blob.core.windows.net/<county>/pdf/<year>/<parcel>.pdf - found
// via Bryce's sqft Telegram bot, verified 8/12/2026 for Vanderburgh, Warrick,
// Posey and Daviess). Page 2 of that card carries the "Cost Ladder": EVERY
// floor's square footage as its own row - including Bsmt (basement) and Crawl,
// the numbers nothing else publishes. The blob sends no CORS header, so the
// app cannot READ the PDF - but a plain link opens it in one tap, no login.
// Cards are per assessment year; early in a new year the current card may not
// be posted yet, so cards also offer last year's as a fallback link.
function engagePrcUrl(slug, parcel, yearsBack) {
  const y = new Date().getFullYear() - (yearsBack || 0);
  return "https://engageblob.blob.core.windows.net/" + slug + "/pdf/" + y + "/" + encodeURIComponent(parcel) + ".pdf";
}
// v111: the app no longer hands out links as the primary answer. A small relay
// (Google Apps Script, Andy's account, project "Brackett House Size Relay")
// fetches what the browser is not allowed to read - Engage's JSON, Beacon's
// report page, and the public-records fallback - and returns one JSON answer.
// The relay is the only way to a no-extra-taps answer: every assessor source
// except the two ArcGIS layers refuses cross-origin browser reads.
//   relay: "lookup"   - county records the relay can read directly (Engage
//                       counties by address search; Gibson via the statewide
//                       parcel layer + Beacon, falling back to records)
//   relay: "fallback" - no readable county source; public property records
//                       (RentCast) by street + town + state
//   towns             - shown as a select when the records source needs a town
const SQFT_RELAY = "https://script.google.com/macros/s/AKfycbwdh3jkS2jYfn5oC2sEyCMaNaNFiq1etmSyZwIxv-h8045PnzebdT3KJQfX3bWStjsPrg/exec";
const SQFT_COUNTIES = {
  vanderburgh: {
    label: "Vanderburgh",
    relay: "lookup",
    // cityStrip: not a Town select - just names peeled off the typed address
    cityStrip: ["Evansville", "Darmstadt"],
    mode: "full",
    url: "https://maps.evansvillegis.com/arcgis_server/rest/services/ASSESSOR/PARCEL_DATA/MapServer/0/query",
    addrField: "PROPSTREET",
    recordUrl: (p) => "https://engage.xsoftinc.com/vanderburgh/map/getparcellist?search-envelop=" + encodeURIComponent(p),
    prcSlug: "vanderburgh",
    assessorPhone: "812-435-5267",
  },
  warrick: {
    label: "Warrick",
    relay: "lookup",
    cityStrip: ["Newburgh", "Boonville", "Chandler", "Lynnville", "Elberfeld", "Tennyson"],
    mode: "locate",
    url: "https://gisdata.in.gov/server/rest/services/Hosted/Parcel_Boundaries_of_Indiana_Current/FeatureServer/0/query",
    addrField: "prop_add",
    countyFips: "18173",
    recordUrl: (p) => "https://engage.xsoftinc.com/warrick/map/getparcellist?search-envelop=" + encodeURIComponent(p),
    prcSlug: "warrick",
    assessorPhone: "812-897-6125",
  },
  // More Indiana counties, all locate-mode off the same statewide parcel
  // service - only the DESTINATION differs, and it is whatever that county
  // actually runs:
  //   - XSoft Engage counties (Posey, Daviess) take a parcel-deep link,
  //     exactly like Warrick.
  //   - Think GIS counties (Spencer, Perry, Dubois) and Beacon counties
  //     (Gibson) have no parcel-deep URL, so the card copies the parcel
  //     number and opens their search for the tech to paste into.
  // Every destination URL below was read off the county's own website, not
  // guessed from a slug - Beacon's ?site= slugs land on a generic chooser.
  spencer: {
    label: "Spencer Co, IN",
    relay: "fallback",
    state: "IN",
    towns: ["Rockport", "Santa Claus", "Dale", "Chrisney", "Grandview", "Richland", "Gentryville", "Hatfield"],
    mode: "locate",
    url: "https://gisdata.in.gov/server/rest/services/Hosted/Parcel_Boundaries_of_Indiana_Current/FeatureServer/0/query",
    addrField: "prop_add",
    countyFips: "18147",
    searchUrl: "https://spencerin.wthgis.com/",
    searchName: "Spencer County GIS (Think GIS)",
  },
  perry: {
    label: "Tell City (Perry Co), IN",
    relay: "fallback",
    state: "IN",
    towns: ["Tell City", "Cannelton", "Troy", "Leopold", "Rome", "Derby", "Bristow"],
    mode: "locate",
    url: "https://gisdata.in.gov/server/rest/services/Hosted/Parcel_Boundaries_of_Indiana_Current/FeatureServer/0/query",
    addrField: "prop_add",
    countyFips: "18123",
    searchUrl: "https://perryin.wthgis.com/",
    searchName: "Perry County GIS (Think GIS)",
  },
  posey: {
    label: "Posey Co, IN",
    relay: "lookup",
    cityStrip: ["Mt Vernon", "Mount Vernon", "Poseyville", "Cynthiana", "New Harmony", "Wadesville", "Griffin"],
    mode: "locate",
    url: "https://gisdata.in.gov/server/rest/services/Hosted/Parcel_Boundaries_of_Indiana_Current/FeatureServer/0/query",
    addrField: "prop_add",
    countyFips: "18129",
    recordUrl: (p) => "https://engage.xsoftinc.com/posey/map/getparcellist?search-envelop=" + encodeURIComponent(p),
    prcSlug: "posey",
  },
  gibson: {
    label: "Gibson Co, IN",
    relay: "lookup",
    // towns feed the records fallback when Beacon refuses the relay's server
    towns: ["Princeton", "Fort Branch", "Haubstadt", "Oakland City", "Owensville", "Patoka", "Francisco", "Somerville", "Mackey", "Hazleton"],
    mode: "locate",
    url: "https://gisdata.in.gov/server/rest/services/Hosted/Parcel_Boundaries_of_Indiana_Current/FeatureServer/0/query",
    addrField: "prop_add",
    countyFips: "18051",
    // Beacon accepts a direct parcel-report deep link (PageTypeID=4 +
    // KeyValue, no PageID needed - verified in a real browser 8/12/2026 on
    // parcel 26-04-25-102-000.393-020: the report's Residential Dwellings
    // section lists each floor incl. the B = basement row with base/finished
    // sq ft, plus finished area, heat type, beds/baths and year built).
    recordUrl: (p) => "https://beacon.schneidercorp.com/Application.aspx?AppID=114&LayerID=1283&PageTypeID=4&KeyValue=" + encodeURIComponent(p),
    recordTip: "On that report, <strong>Residential Dwellings</strong> lists each floor with its own square footage — the <strong>B</strong> row is the basement (base = footprint, finish = finished living area) — plus finished area, heat type, beds/baths and year built.",
    searchUrl: "https://beacon.schneidercorp.com/Application.aspx?AppID=114&LayerID=1283&PageTypeID=1&PageID=928",
    searchName: "Gibson County GIS (Beacon)",
  },
  daviess: {
    label: "Daviess Co (Washington), IN",
    relay: "lookup",
    cityStrip: ["Washington", "Odon", "Montgomery", "Elnora", "Plainville", "Cannelburg", "Alfordsville"],
    mode: "locate",
    url: "https://gisdata.in.gov/server/rest/services/Hosted/Parcel_Boundaries_of_Indiana_Current/FeatureServer/0/query",
    addrField: "prop_add",
    countyFips: "18027",
    recordUrl: (p) => "https://engage.xsoftinc.com/daviess/map/getparcellist?search-envelop=" + encodeURIComponent(p),
    prcSlug: "daviess",
  },
  washington: {
    label: "Washington Co (Salem), IN",
    relay: "fallback",
    state: "IN",
    towns: ["Salem", "New Pekin", "Campbellsburg", "Fredericksburg", "Hardinsburg", "Little York", "Saltillo"],
    mode: "locate",
    url: "https://gisdata.in.gov/server/rest/services/Hosted/Parcel_Boundaries_of_Indiana_Current/FeatureServer/0/query",
    addrField: "prop_add",
    countyFips: "18175",
    searchUrl: "https://washingtonin.wthgis.com/",
    searchName: "Washington County GIS (Think GIS)",
  },
  // Knox is on XSoft Engage (so its record-card PDFs are public), but like
  // Dubois it submitted its ~30k parcels to the statewide layer with no
  // property addresses (checked 8/12/2026), so the app can't resolve an
  // address to a parcel. Their own Engage search takes addresses directly
  // and each result links its record card. Phone verified on the county's
  // Engage contact page 8/12/2026.
  knox: {
    label: "Knox Co (Vincennes), IN",
    // Engage's own search takes street addresses, so the relay can answer
    // Knox in full even though the statewide layer has no Knox addresses.
    relay: "lookup",
    prcSlug: "knox",
    cityStrip: ["Vincennes", "Bicknell", "Monroe City", "Oaktown", "Bruceville", "Sandborn", "Edwardsport", "Wheatland", "Decker", "Freelandville"],
    mode: "link",
    searchUrl: "https://engage.xsoftinc.com/knox",
    searchName: "Knox County assessor search (XSoft Engage)",
    assessorPhone: "812-885-2513",
    note: "Search the address there, open the parcel, then open its property record card (PDF). The Cost Ladder on page 2 lists every floor separately - Bsmt = basement, Crawl = crawl space - with base and finished sq ft for each.",
  },
  // Dubois is link-mode, not locate: the county submitted 34,837 parcels to
  // the statewide layer with NO property addresses on any of them (checked
  // 8/12/2026), so an address can't be resolved to a parcel from here. Their
  // own Think GIS search takes addresses directly.
  dubois: {
    label: "Dubois Co (Jasper), IN",
    relay: "fallback",
    state: "IN",
    towns: ["Jasper", "Huntingburg", "Ferdinand", "Birdseye", "Holland", "Ireland", "Dubois", "St Anthony", "Schnellville", "Celestine"],
    mode: "link",
    searchUrl: "https://duboisin.wthgis.com/",
    searchName: "Dubois County GIS (Think GIS)",
    assessorPhone: "812-481-7010",
    note: "Search the address there, then open the parcel's property record card for building sizes and the sketch.",
  },
  webster: {
    label: "Webster Co, KY",
    relay: "fallback",
    state: "KY",
    towns: ["Providence", "Dixon", "Sebree", "Clay", "Slaughters", "Wheatcroft", "Poole", "Blackford"],
    mode: "link",
    // Verified off webstercountypva.com's own Quick Links, 8/12/2026
    searchUrl: "https://beacon.schneidercorp.com/Application.aspx?AppID=915&LayerID=17737&PageTypeID=2&PageID=7917",
    searchName: "Webster County PVA property search (Beacon)",
    assessorPhone: "270-639-7016",
    note: "The PVA record card lists each floor and the basement as separate lines with their own square footage.",
  },
  // The three below have no data service at all - not even one that could
  // resolve an address to a parcel. Beacon/qPublic actively block programmatic
  // reads (their pages 403 anything that is not a real browser), so "link"
  // mode does not fetch anything: it opens the county's own search in the
  // phone's browser with the address copied, and the tech pastes it there.
  henderson: {
    label: "Henderson Co, KY",
    relay: "fallback",
    state: "KY",
    towns: ["Henderson", "Corydon", "Robards", "Spottsville", "Reed", "Smith Mills", "Baskett"],
    mode: "link",
    // Verified off hendersoncopva.com's own Quick Links, 8/12/2026
    searchUrl: "https://beacon.schneidercorp.com/Application.aspx?AppID=884&LayerID=16702&PageTypeID=2&PageID=7417",
    searchName: "Henderson County PVA property search (Beacon)",
    assessorPhone: "270-827-6024",
    note: "The PVA record card lists each floor and the basement as separate lines with their own square footage.",
  },
  white: {
    label: "Carmi (White Co, IL)",
    relay: "fallback",
    state: "IL",
    towns: ["Carmi", "Grayville", "Crossville", "Norris City", "Enfield", "Springerton", "Maunie", "Mill Shoals"],
    mode: "link",
    // The old link here pointed at White County GEORGIA (wrong AppID) - White
    // County IL is not on qPublic at all. Their real GIS is an ArcGIS
    // Experience app (linked off whitecounty-il.gov); its parcel layer has
    // owners and addresses but its improvements table is empty (checked
    // 8/13/2026), so records fallback carries the sqft answer.
    searchUrl: "https://experience.arcgis.com/experience/f893acf6d54a4db9b4411827c18b39dd",
    searchName: "White County GIS (ArcGIS)",
    assessorPhone: "618-382-2332",
    note: "The county GIS shows the parcel and owner; building sizes are not published there.",
  },
  wabash: {
    label: "Mt Carmel (Wabash Co, IL)",
    relay: "fallback",
    state: "IL",
    towns: ["Mt Carmel", "Allendale", "Keensburg", "Bellmont"],
    mode: "link",
    // Wabash County publishes no property search at all - the treasurer's
    // parcel page is tax amounts only and the recorder is subscription-gated.
    searchUrl: "",
    searchName: "",
    assessorPhone: "618-262-4463",
    note: "Wabash County has no online property records. The assessor's office (Mt Carmel courthouse, 401 N Market St) reads the record card over the phone.",
  },
};

// Assessors store the abbreviated form. A tech typing "Stephanie Lane" should
// still find "10526 STEPHANIE LN".
const SQFT_STREET_ABBR = [
  [/\bLANE\b/g, "LN"], [/\bROAD\b/g, "RD"], [/\bSTREET\b/g, "ST"],
  [/\bAVENUE\b/g, "AVE"], [/\bDRIVE\b/g, "DR"], [/\bCOURT\b/g, "CT"],
  [/\bCIRCLE\b/g, "CIR"], [/\bBOULEVARD\b/g, "BLVD"], [/\bPLACE\b/g, "PL"],
  [/\bTERRACE\b/g, "TER"], [/\bPARKWAY\b/g, "PKWY"], [/\bTRAIL\b/g, "TRL"],
  [/\bHIGHWAY\b/g, "HWY"], [/\bNORTH\b/g, "N"], [/\bSOUTH\b/g, "S"],
  [/\bEAST\b/g, "E"], [/\bWEST\b/g, "W"],
];
function sqftNormalizeAddress(raw) {
  let s = String(raw || "").toUpperCase().replace(/[.,#]/g, " ").replace(/\s+/g, " ").trim();
  for (const [re, to] of SQFT_STREET_ABBR) s = s.replace(re, to);
  return s;
}

// Techs type whole addresses - "210 maryland street jasper, IN" - but the
// records sources want street only, with the town passed separately. Peel
// zip, state and a trailing town name off the typed text; when the town names
// one from the county's list, the Town select gets set to it automatically.
const SQFT_STATE_TAIL = /[\s,]+(IN|KY|IL|INDIANA|KENTUCKY|ILLINOIS)\.?\s*$/i;
function sqftCleanTyped(typed, cfg) {
  let s = String(typed || "").trim();
  let town = "";
  s = s.replace(/[\s,]+\d{5}(-\d{4})?\s*$/, "");
  s = s.replace(SQFT_STATE_TAIL, "");
  const names = (cfg && (cfg.towns || cfg.cityStrip)) || [];
  const upper = s.toUpperCase();
  for (const t of names) {
    const tu = String(t).toUpperCase();
    if (upper.endsWith(tu) && upper.length > tu.length) {
      const cut = s.slice(0, s.length - t.length).replace(/[\s,]+$/, "");
      // only treat it as a town if something address-like remains
      if (/\d/.test(cut)) { s = cut; town = t; break; }
    }
  }
  if (s.indexOf(",") >= 0) s = s.split(",")[0].trim();
  return { street: s, town: town };
}
// Counties submit addresses to the statewide layer in whatever style their own
// system uses - Vanderburgh abbreviates (LILY RD), Perry spells out (Lily
// Road). One normalized form misses half of them, so a lookup tries each
// distinct variant until one hits: abbreviated, spelled out, then the raw
// typed text.
const SQFT_STREET_EXPAND = SQFT_STREET_ABBR
  .filter(([re]) => !/NORTH|SOUTH|EAST|WEST/.test(re.source))
  .map(([re, to]) => [new RegExp("\\b" + to + "\\b", "g"), re.source.replace(/\\b/g, "")]);
function sqftAddressVariants(raw) {
  const upper = String(raw || "").toUpperCase().replace(/[.,#]/g, " ").replace(/\s+/g, " ").trim();
  const abbreviated = sqftNormalizeAddress(raw);
  let expanded = upper;
  for (const [re, to] of SQFT_STREET_EXPAND) expanded = expanded.replace(re, to);
  return [...new Set([abbreviated, expanded, upper])];
}
// ArcGIS where clauses are SQL - a quote in the typed address would break out
// of the string literal, so double it the way SQL expects.
const sqftSqlEscape = (s) => String(s).replace(/'/g, "''");

const SQFT_CACHE_KEY = "bfc_sqft_cache";
function sqftCacheRead() {
  try {
    const v = JSON.parse(localStorage.getItem(SQFT_CACHE_KEY));
    return v && typeof v === "object" ? v : {};
  } catch (e) { return {}; }
}
function sqftCacheWrite(key, rows) {
  const all = sqftCacheRead();
  all[key] = { at: Date.now(), rows };
  // keep the most recent 40 so a tech can re-open this morning's addresses
  // with no signal in a crawlspace
  const keys = Object.keys(all).sort((a, b) => (all[b].at || 0) - (all[a].at || 0));
  const trimmed = {};
  for (const k of keys.slice(0, 40)) trimmed[k] = all[k];
  safeSet(SQFT_CACHE_KEY, trimmed);
}

function sqftStatus(msg, show) {
  const el = document.getElementById("sqftStatus");
  if (!el) return;
  el.textContent = msg || "";
  el.classList.toggle("hidden", show === false || !msg);
}

const sqftNum = (n) => (typeof n === "number" && isFinite(n) ? n.toLocaleString("en-US") : null);

async function sqftLookup() {
  const countyKey = document.getElementById("sqftCountySelect").value;
  const cfg = SQFT_COUNTIES[countyKey];
  const typed = document.getElementById("sqftAddrInput").value.trim();
  const result = document.getElementById("sqftResult");
  result.innerHTML = "";
  if (!typed) { sqftStatus("Type a street address first - number and street, like 10526 Stephanie Ln."); return; }

  // Peel town/state/zip off the typed text; a recognized town also flips the
  // Town select so "210 maryland street jasper, IN" just works.
  const cleaned = sqftCleanTyped(typed, cfg);
  const street = cleaned.street || typed;
  const townSel = document.getElementById("sqftTownSelect");
  if (cleaned.town && cfg.towns && cfg.towns.indexOf(cleaned.town) >= 0) townSel.value = cleaned.town;
  const town = cfg.towns && cfg.towns.length ? (townSel.value || cfg.towns[0]) : "";
  const addr = sqftNormalizeAddress(street);
  const cacheKey = "v2|" + countyKey + "|" + (town ? town + "|" : "") + addr;

  if (!navigator.onLine) {
    const hit = sqftCacheRead()[cacheKey];
    if (hit && hit.rows && hit.rows.ok) {
      sqftStatus("No signal - showing the copy saved on this phone.");
      result.innerHTML = sqftCardAnswer(hit.rows, cfg, countyKey);
      return;
    }
    sqftStatus("The records lookup needs signal. Get to coverage and try again - answers are saved on the phone for re-opening.");
    return;
  }

  sqftStatus("Checking the " + cfg.label + " records...");
  try {
    let r = null;
    if (cfg.relay === "lookup") {
      r = await sqftRelayCall({ fn: "lookup", county: countyKey, q: addr, street: street, city: town });
      // Assessors store abbreviated street types, but not all of them - if
      // the abbreviated form missed, retry with exactly what the tech typed.
      if (r && !r.ok && /no match/i.test(r.error || "") && addr !== street.toUpperCase()) {
        const retry = await sqftRelayCall({ fn: "lookup", county: countyKey, q: street, street: street, city: town });
        if (retry && retry.ok) r = retry;
      }
    } else if (cfg.relay === "fallback") {
      r = await sqftRelayCall({ fn: "fallback", street: street, city: town, state: cfg.state });
    } else {
      // no relay path for this county - old handoff card
      sqftStatus("");
      result.innerHTML = sqftCardLink(typed, cfg);
      trackEvent("house size lookup " + cfg.label);
      return;
    }
    if (r && r.ok && r.pick) {
      sqftStatus("");
      result.innerHTML = sqftCardPick(r.pick, cfg, countyKey);
      return;
    }
    if (!r || !r.ok) {
      if (cfg.mode === "full" && await sqftFullDirect(cfg, typed)) return;
      sqftStatus("");
      result.innerHTML = sqftCardMiss(typed, cfg, countyKey, r && r.error);
      return;
    }
    r.wantTown = town;
    sqftCacheWrite(cacheKey, r);
    sqftStatus("");
    result.innerHTML = sqftCardAnswer(r, cfg, countyKey);
    trackEvent("house size lookup " + cfg.label);
  } catch (e) {
    // relay unreachable - Vanderburgh still has its direct county-GIS net
    if (cfg.mode === "full" && await sqftFullDirect(cfg, typed).catch(() => false)) return;
    sqftStatus("The records lookup did not answer (" + (e && e.message ? e.message : "network error") + "). Try again" + (cfg.assessorPhone ? ", or call the assessor at " + cfg.assessorPhone + "." : "."));
  }
}

async function sqftRelayCall(params) {
  const clean = {};
  for (const k of Object.keys(params)) if (params[k] !== "" && params[k] != null) clean[k] = params[k];
  const url = SQFT_RELAY + "?" + new URLSearchParams(clean).toString();
  // Apps Script's edge intermittently 404s (and sometimes drops) requests -
  // measured 3 failures in 12 hits the hour after deploy. Three attempts
  // with backoff turns that into a non-event.
  let lastErr = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { credentials: "omit" });
      if (res.ok) return await res.json();
      lastErr = new Error("relay HTTP " + res.status);
      if (res.status !== 404 && res.status < 500) break;
    } catch (e) {
      lastErr = e; // network hiccup - worth the same retries
    }
    if (attempt < 2) await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
  }
  throw lastErr || new Error("relay did not answer");
}

// Vanderburgh's own county GIS allows direct browser reads (the only source
// that does, besides the statewide layer) - kept as a net for relay outages.
// Renders the pre-relay full card. Returns true if it rendered.
async function sqftFullDirect(cfg, typed) {
  let rows = [];
  for (const variant of sqftAddressVariants(typed)) {
    rows = await sqftQuery(cfg, variant);
    if (rows.length) break;
  }
  if (!rows.length) return false;
  sqftStatus("");
  sqftRenderRows(rows, cfg, "vanderburgh", false);
  trackEvent("house size lookup " + cfg.label);
  return true;
}

async function sqftPickParcel(countyKey, parcel) {
  const cfg = SQFT_COUNTIES[countyKey];
  const typed = document.getElementById("sqftAddrInput").value.trim();
  const street = sqftCleanTyped(typed, cfg).street || typed;
  const townSel = document.getElementById("sqftTownSelect");
  const town = cfg.towns && cfg.towns.length ? (townSel.value || cfg.towns[0]) : "";
  const result = document.getElementById("sqftResult");
  sqftStatus("Pulling that parcel...");
  try {
    const r = await sqftRelayCall({ fn: "parcel", county: countyKey, parcel: parcel, q: street, street: street, city: town });
    if (r && r.ok) r.wantTown = town;
    sqftStatus("");
    result.innerHTML = (r && r.ok) ? sqftCardAnswer(r, cfg, countyKey) : sqftCardMiss(typed, cfg, countyKey, r && r.error);
    if (r && r.ok) trackEvent("house size lookup " + cfg.label);
  } catch (e) {
    sqftStatus("The records lookup did not answer. Try again.");
  }
}

function sqftCardPick(picks, cfg, countyKey) {
  const rows = picks.map((m) => {
    const cls = sqftClassNote(m.cls);
    const warn = cls && !/^residential/.test(cls) ? " - not residential" : "";
    return `<button class="sqft-open sqft-pickbtn" type="button" data-county="${escapeHtml(countyKey)}" data-parcel="${escapeHtml(m.parcel)}">${escapeHtml([m.address, m.city].filter(Boolean).join(", "))}${escapeHtml(warn)}</button>`;
  }).join("");
  return `<div class="sqft-card"><div class="sqft-locate">More than one parcel matches - tap the right one:</div>${rows}</div>`;
}

function sqftCardAnswer(r, cfg, countyKey) {
  const living = sqftNum(r.sqft);
  const isAssessor = r.source === "assessor";
  const caption = isAssessor
    ? "Finished living area, per the county assessor"
    : "Living area, from public property records";
  // Records sources fuzzy-match: asking for a Jasper address can silently
  // return the same street number in Ferdinand. If the answer's address
  // does not name the town the tech asked for, say so in red.
  const townMismatch = !isAssessor && r.wantTown && r.address &&
    r.address.toUpperCase().indexOf(String(r.wantTown).toUpperCase()) < 0;
  const mismatchWarn = townMismatch
    ? `<div class="sqft-warn">This matched <strong>${escapeHtml(r.address)}</strong> - NOT ${escapeHtml(r.wantTown)}. Same street name in a nearby town is common. If the house really is in ${escapeHtml(r.wantTown)}, this is a DIFFERENT house - check the town picker or the spelling.</div>`
    : "";
  const buildings = (r.buildings || []).map((b) =>
    sqftLine(b.type || "Building", b.sqft ? (sqftNum(b.sqft) + " sq ft" + (b.year ? " (" + b.year + ")" : "")) : null)).join("");
  const floors = (r.floors || []).length ? `
    <table class="sqft-floors"><tr><th>Floor</th><th>Base</th><th>Finished</th></tr>
    ${r.floors.map((f) => `<tr><td>${escapeHtml(f.label)}</td><td>${escapeHtml(sqftNum(f.base) || "")}</td><td>${escapeHtml(sqftNum(f.finished) || "")}</td></tr>`).join("")}
    </table>
    <div class="sqft-sketch-tip"><strong>B</strong> = basement: base is the footprint, finished is finished living area.</div>` : "";
  const excl = isAssessor
    ? `<div class="sqft-excl"><strong>Not in that number:</strong> unfinished basement, crawl space, garage, porches and unfinished attic. Conditioned basement space gets added to your load calc.</div>`
    : `<div class="sqft-excl"><strong>Check the basement:</strong> public-records totals sometimes skip a finished basement. If it is conditioned, count it in your load calc.</div>`;
  const links = [];
  if (r.links && r.links.prc) links.push(`<a class="sqft-open" href="${escapeHtml(r.links.prc)}" target="_blank" rel="noopener">Open the property record card (PDF) -&gt;</a>`);
  if (r.links && r.links.beacon) links.push(`<a class="sqft-open" href="${escapeHtml(r.links.beacon)}" target="_blank" rel="noopener">Open the Beacon report -&gt;</a>`);
  const prcTip = r.links && r.links.prc
    ? `<div class="sqft-sketch-tip">The card's <strong>Cost Ladder</strong> (page 2) lists every floor separately - <strong>Bsmt</strong> = basement, <strong>Crawl</strong> = crawl space - with base and finished sq ft for each. Card missing? <a href="${escapeHtml(r.links.prcLastYear || r.links.prc)}" target="_blank" rel="noopener">try last year's</a>.</div>`
    : "";
  const val = r.valuation && /^[0-9]+$/.test(String(r.valuation)) ? "$" + Number(r.valuation).toLocaleString("en-US") : null;
  return `<div class="sqft-card">
    <div class="sqft-addr">${escapeHtml([r.address, r.city].filter(Boolean).join(", ") || "")}</div>
    ${r.parcel ? `<div class="sqft-parcel">Parcel ${escapeHtml(r.parcel)}${r.owner ? " - " + escapeHtml(r.owner) : ""}</div>` : ""}
    ${mismatchWarn}
    <div class="sqft-hero">
      <span class="sqft-hero-n">${living ? escapeHtml(living) : "not recorded"}</span>
      <span class="sqft-hero-u">${living ? "sq ft" : ""}</span>
    </div>
    <div class="sqft-hero-cap">${escapeHtml(caption)}</div>
    <div class="sqft-grid">
      ${sqftLine("Year built", r.yearBuilt || null)}
      ${sqftLine("Bedrooms", r.beds || null)}
      ${sqftLine("Bathrooms", r.baths || null)}
      ${sqftLine("Assessed value", val)}
      ${buildings}
    </div>
    ${floors}
    ${excl}
    ${links.join("")}
    ${prcTip}
    <div class="sqft-sketch-tip">Source: ${escapeHtml(r.sourceName || "county records")}${cfg.assessorPhone ? " - assessor " + escapeHtml(cfg.assessorPhone) : ""}</div>
  </div>`;
}

function sqftCardMiss(typed, cfg, countyKey, err) {
  const engageUrl = cfg.relay === "lookup" && countyKey !== "gibson" ? "https://engage.xsoftinc.com/" + countyKey : "";
  const searchUrl = cfg.searchUrl || engageUrl;
  const searchName = cfg.searchName || (engageUrl ? cfg.label + " Co assessor search (Engage)" : "");
  return `<div class="sqft-card">
    <div class="sqft-addr">${escapeHtml(typed)}</div>
    <div class="sqft-parcel">${escapeHtml(cfg.label)}</div>
    <div class="sqft-locate">No answer from the records (${escapeHtml(err || "no match")}). Try just the number and street name - leave off the city and the suffix.</div>
    ${searchUrl ? `<button class="sqft-open sqft-copy sqft-copybtn" type="button" data-copy="${escapeHtml(typed)}">Copy the address</button>
    <a class="sqft-open" href="${escapeHtml(searchUrl)}" target="_blank" rel="noopener">Open ${escapeHtml(searchName)} -&gt;</a>` : ""}
    ${cfg.assessorPhone ? `<div class="sqft-sketch-tip">Assessor's office: ${escapeHtml(cfg.assessorPhone)}</div>` : ""}
  </div>`;
}

async function sqftQuery(cfg, addr) {
  const params = new URLSearchParams({ f: "json", returnGeometry: "false", resultRecordCount: "12" });
  if (cfg.mode === "full") {
    params.set("where", `UPPER(${cfg.addrField}) LIKE '%${sqftSqlEscape(addr)}%'`);
    params.set("outFields", "PARCELID,PROPSTREET,PROPCITY,PROPZIP,SquareFootage,YearBuilt,StoryHeight,Bedrooms,Bathrooms,Halfbaths,fin_rooms,acreage,PROPERTYCLASS,grade,condition,OWNER1");
    params.set("orderByFields", "PROPSTREET");
  } else {
    params.set("where", `county_fips='${cfg.countyFips}' AND UPPER(${cfg.addrField}) LIKE '%${sqftSqlEscape(addr)}%'`);
    params.set("outFields", "parcel_id,prop_add,prop_city,prop_zip,dlgf_prop_class_code");
    params.set("orderByFields", "prop_add");
  }
  const res = await fetch(cfg.url + "?" + params.toString(), { credentials: "omit" });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "query rejected");
  // de-dupe: the statewide layer repeats a parcel once per geometry part
  const seen = new Set();
  const out = [];
  for (const f of data.features || []) {
    const a = f.attributes || {};
    const id = a.PARCELID || a.parcel_id || JSON.stringify(a);
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(a);
  }
  return out;
}

// 5xx is residential in the Indiana DLGF class scheme. The distinction that
// matters here is residential vs not - a tech pulling a "square footage" off a
// warehouse row and sizing a house from it is the failure this guards against.
function sqftClassNote(code) {
  const c = String(code || "").trim();
  if (!c) return "";
  if (/^5/.test(c)) return "residential";
  if (/^1/.test(c)) return "agricultural — NOT a dwelling class, check before sizing";
  return "NOT a residential class — this is commercial/industrial, confirm before sizing a house off it";
}

function sqftRenderRows(rows, cfg, countyKey, fromCache) {
  const el = document.getElementById("sqftResult");
  el.innerHTML = rows.map((a) => (cfg.mode === "full" ? sqftCardFull(a, cfg) : sqftCardLocate(a, cfg))).join("");
  if (fromCache) {
    const note = document.createElement("p");
    note.className = "sqft-cached";
    note.textContent = "Saved copy — re-run it in coverage if the house was recently remodelled.";
    el.appendChild(note);
  }
}

function sqftLine(label, value) {
  if (value === null || value === undefined || value === "" || value === "0") return "";
  return `<div class="sqft-row"><span class="sqft-k">${escapeHtml(label)}</span><span class="sqft-v">${escapeHtml(String(value))}</span></div>`;
}

function sqftCardFull(a, cfg) {
  const living = sqftNum(a.SquareFootage);
  const cls = sqftClassNote(a.PROPERTYCLASS);
  const notResidential = cls && !/^residential/.test(cls);
  const baths = [
    typeof a.Bathrooms === "number" && a.Bathrooms > 0 ? a.Bathrooms + " full" : null,
    typeof a.Halfbaths === "number" && a.Halfbaths > 0 ? a.Halfbaths + " half" : null,
  ].filter(Boolean).join(", ");
  const acres = typeof a.acreage === "number" && a.acreage > 0 ? a.acreage.toFixed(2) + " acres" : null;
  const story = typeof a.StoryHeight === "number" && a.StoryHeight > 0 ? String(a.StoryHeight) : null;

  return `<div class="sqft-card">
    <div class="sqft-addr">${escapeHtml([a.PROPSTREET, a.PROPCITY].filter(Boolean).join(", "))}</div>
    <div class="sqft-parcel">Parcel ${escapeHtml(a.PARCELID || "")}</div>
    ${notResidential ? `<div class="sqft-warn">⚠ Class ${escapeHtml(String(a.PROPERTYCLASS))} — ${escapeHtml(cls)}.</div>` : ""}
    <div class="sqft-hero">
      <span class="sqft-hero-n">${living ? escapeHtml(living) : "not recorded"}</span>
      <span class="sqft-hero-u">${living ? "sq ft" : ""}</span>
    </div>
    <div class="sqft-hero-cap">Above-grade finished living area, per the assessor</div>
    <div class="sqft-grid">
      ${sqftLine("Stories", story)}
      ${sqftLine("Year built", a.YearBuilt > 0 ? a.YearBuilt : null)}
      ${sqftLine("Bedrooms", a.Bedrooms > 0 ? a.Bedrooms : null)}
      ${sqftLine("Bathrooms", baths)}
      ${sqftLine("Finished rooms", a.fin_rooms && a.fin_rooms !== "0" ? a.fin_rooms : null)}
      ${sqftLine("Lot", acres)}
      ${sqftLine("Class", a.PROPERTYCLASS ? a.PROPERTYCLASS + " (" + cls + ")" : null)}
      ${sqftLine("Grade / condition", [a.grade, a.condition].filter(Boolean).join(" / "))}
    </div>
    <div class="sqft-excl"><strong>Not in that number:</strong> basement (finished or not), garage, porch, deck, unfinished attic. If the basement is conditioned, measure it and add it.</div>
    <a class="sqft-open" href="${escapeHtml(engagePrcUrl(cfg.prcSlug, a.PARCELID || ""))}" target="_blank" rel="noopener">Open the property record card (PDF) →</a>
    <div class="sqft-sketch-tip">The card's <strong>Cost Ladder</strong> (page 2) lists every floor separately — <strong>Bsmt</strong> = basement, <strong>Crawl</strong> = crawl space — with its own square footage, and the sketch is on the same card. Card missing? <a href="${escapeHtml(engagePrcUrl(cfg.prcSlug, a.PARCELID || "", 1))}" target="_blank" rel="noopener">try last year's</a>, or <a href="${escapeHtml(cfg.recordUrl(a.PARCELID || ""))}" target="_blank" rel="noopener">open the assessor's map record</a>.</div>
  </div>`;
}

function sqftCardLink(typedAddr, cfg) {
  const hasSearch = !!cfg.searchUrl;
  return `<div class="sqft-card">
    <div class="sqft-addr">${escapeHtml(typedAddr)}</div>
    <div class="sqft-parcel">${escapeHtml(cfg.label)}</div>
    <div class="sqft-locate">${hasSearch
      ? escapeHtml(cfg.label) + " does not allow this app to read its records directly, but their own search works fine on a phone. Copy the address, open the search, and paste it in."
      : escapeHtml(cfg.note)}</div>
    ${hasSearch ? `<button id="sqftCopyBtn" class="sqft-open sqft-copy" type="button">Copy the address</button>
    <a class="sqft-open" href="${escapeHtml(cfg.searchUrl)}" target="_blank" rel="noopener">Open ${escapeHtml(cfg.searchName)} →</a>
    <div class="sqft-sketch-tip">${escapeHtml(cfg.note)}</div>` : ""}
    <div class="sqft-excl"><strong>If the house has a basement:</strong> check whether the record's living-area total includes it — most list the basement as its own line and leave it OUT of the total. Conditioned basement space gets added to your load calc either way.</div>
    <div class="sqft-sketch-tip">Assessor's office: ${escapeHtml(cfg.assessorPhone)}</div>
  </div>`;
}

function sqftCardLocate(a, cfg) {
  const cls = sqftClassNote(a.dlgf_prop_class_code);
  const notResidential = cls && !/^residential/.test(cls);
  const parcel = a.parcel_id || "";
  // Three destination shapes, best first:
  //   - XSoft Engage counties: the record-card PDF itself, direct from the
  //     county's public blob storage - floor-by-floor sq ft incl. basement.
  //   - Other Engage-linked counties: a parcel-deep map link.
  //   - Think GIS / Beacon counties: search page + parcel on the clipboard.
  const deep = typeof cfg.recordUrl === "function";
  let dest;
  if (cfg.prcSlug) {
    dest = `<a class="sqft-open" href="${escapeHtml(engagePrcUrl(cfg.prcSlug, parcel))}" target="_blank" rel="noopener">Open the property record card (PDF) →</a>
       <div class="sqft-sketch-tip">The card's <strong>Cost Ladder</strong> (page 2) lists every floor separately — <strong>Bsmt</strong> = basement, <strong>Crawl</strong> = crawl space — with base and finished sq ft for each, plus year built and the sketch. Card missing? <a href="${escapeHtml(engagePrcUrl(cfg.prcSlug, parcel, 1))}" target="_blank" rel="noopener">try last year's</a>, or <a href="${escapeHtml(cfg.recordUrl(parcel))}" target="_blank" rel="noopener">open the assessor's map record</a>.</div>`;
  } else if (deep) {
    dest = `<a class="sqft-open" href="${escapeHtml(cfg.recordUrl(parcel))}" target="_blank" rel="noopener">Open the ${escapeHtml(cfg.label)} assessor record →</a>
       <div class="sqft-sketch-tip">${cfg.recordTip || `On that page, <strong>Improvement Info</strong> lists each building and its size; <strong>Sketch</strong> shows the basement and foundation type.`}</div>`;
  } else {
    dest = `<button class="sqft-open sqft-copy sqft-copybtn" type="button" data-copy="${escapeHtml(parcel)}">Copy the parcel number</button>
       <a class="sqft-open" href="${escapeHtml(cfg.searchUrl)}" target="_blank" rel="noopener">Open ${escapeHtml(cfg.searchName)} →</a>
       <div class="sqft-sketch-tip">Paste the parcel number (or the address) into their search box, then open the property record card for the building sizes and sketch.</div>`;
  }
  const explain = cfg.prcSlug
    ? `This is the right parcel. The county posts its full record card as a public PDF — the square footage, floor by floor, is one tap away. No login.`
    : `${escapeHtml(cfg.label)} does not publish building sizes in a form this app can read, so the square footage is not shown here. This is the right parcel — open it and read the size off the assessor's own record.`;
  const bsmt = cfg.prcSlug
    ? `<div class="sqft-excl"><strong>Basement:</strong> on the card, the Cost Ladder's <strong>Bsmt</strong>/<strong>Crawl</strong> rows carry their own sq ft — the base number is the footprint, the finish number is how much of it is finished living area. Conditioned basement space gets added to your load calc.</div>`
    : `<div class="sqft-excl"><strong>If the house has a basement:</strong> the living-area total on the record usually leaves it out — the basement is its own line or its own sketch block. Conditioned basement space gets added to your load calc.</div>`;
  return `<div class="sqft-card">
    <div class="sqft-addr">${escapeHtml([a.prop_add, a.prop_city].filter(Boolean).join(", "))}</div>
    <div class="sqft-parcel">Parcel ${escapeHtml(parcel)}</div>
    ${notResidential ? `<div class="sqft-warn">⚠ Class ${escapeHtml(String(a.dlgf_prop_class_code))} — ${escapeHtml(cls)}.</div>` : ""}
    <div class="sqft-locate">${explain}</div>
    ${dest}
    ${bsmt}
  </div>`;
}

const APP_VERSION = "v152";

// ============================================================
// Usage tracking — silent, posts to the office's Google Form
// ============================================================
// Each app open is logged (tech name, real open time, app version) to the
// "App Usage" Google Form, which lands in Andy's responses sheet. Opens with
// no signal queue up in localStorage and flush next time the phone is online,
// keeping their original open time. The tech name is asked ONCE per phone
// (picker below), then remembered forever.

const TRACK_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfZ9Dv1jlj3h4uzomWlHsgS-OcaDMhb0sbaE2YbXLCP2swsQQ/formResponse";
const TRACK_FIELDS = { tech: "entry.1065853688", event: "entry.1998798241", version: "entry.872662639" };
const TECH_NAMES = ["James", "Gus", "Jon", "Cameron", "Bryce", "Ron", "Dustin", "Lincoln", "Dave", "Adam", "Kenny", "Mark", "Damien", "Vern", "Joey", "Drew", "Andy"];
const TECH_KEY = "bfc-tech-name";
const TRACK_QUEUE_KEY = "bfc-track-queue";

function getTechName() { return localStorage.getItem(TECH_KEY) || ""; }

function readTrackQueue() {
  try { return JSON.parse(localStorage.getItem(TRACK_QUEUE_KEY) || "[]"); } catch (e) { return []; }
}

function trackEvent(eventName) {
  let queue = readTrackQueue();
  queue.push({ e: eventName, t: new Date().toLocaleString(), v: APP_VERSION });
  if (queue.length > 200) queue = queue.slice(-200);
  safeSet(TRACK_QUEUE_KEY, queue);
  flushTrackQueue();
}

let trackFlushing = false;
async function flushTrackQueue() {
  if (trackFlushing || !navigator.onLine) return;
  const tech = getTechName();
  if (!tech) return;
  trackFlushing = true;
  try {
    while (readTrackQueue().length) {
      const item = readTrackQueue()[0];
      const body = new URLSearchParams();
      body.set(TRACK_FIELDS.tech, tech);
      body.set(TRACK_FIELDS.event, item.e + " @ " + item.t);
      body.set(TRACK_FIELDS.version, item.v || APP_VERSION);
      // no-cors: Google Forms accepts the POST but the response is opaque.
      // A network failure still rejects, which leaves the item queued.
      await fetch(TRACK_URL, { method: "POST", mode: "no-cors", body });
      const queue = readTrackQueue();
      queue.shift();
      safeSet(TRACK_QUEUE_KEY, queue);
    }
  } catch (e) { /* offline or blocked — events stay queued for next time */ }
  trackFlushing = false;
}
window.addEventListener("online", flushTrackQueue);

// Log what techs search for, 2 seconds after they stop typing — tells the
// office which lookups matter and which come up empty. Skips repeats.
function logSearches(inputId, label) {
  const el = document.getElementById(inputId);
  if (!el) return;
  let timer, last = "";
  el.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const v = el.value.trim();
      if (v.length >= 2 && v !== last) { last = v; trackEvent(label + ": " + v); }
    }, 2000);
  });
}
logSearches("askInput", "asked");
logSearches("codesSearchInput", "searched codes");
logSearches("diagSearchInput", "searched diagnostics");
logSearches("manualSearchInput", "searched manuals");
logSearches("toolboxSearchInput", "searched toolbox");
logSearches("tstatSearchInput", "searched thermostats");

function showTechPicker() {
  const ov = document.createElement("div");
  ov.className = "tech-picker-overlay";
  const nameBtns = TECH_NAMES.map((n) =>
    `<button class="tech-name-btn" data-name="${n}">${n}</button>`).join("");
  ov.innerHTML =
    `<div class="tech-picker">
      <img src="icons/icon-192.png" alt="" class="tech-picker-logo">
      <h2>Whose phone is this?</h2>
      <p>One-time setup — tap your name so the office knows who's using the app. You'll never see this again.</p>
      <div class="tech-picker-names">${nameBtns}</div>
      <div class="tech-picker-other">
        <input id="techOtherInput" type="text" autocomplete="name" placeholder="Not listed? Type your name">
        <button id="techOtherBtn">That's me</button>
      </div>
    </div>`;
  document.body.appendChild(ov);
  const pick = (name) => {
    // The setItem used to come first and unguarded. If localStorage throws —
    // storage full, or an old private-browsing mode — the overlay never came
    // down and the app was unusable on first run, which is the worst possible
    // moment to fail. Dismiss the overlay no matter what; a name we could not
    // persist just means the picker asks again next launch.
    try { localStorage.setItem(TECH_KEY, name); } catch (e) { /* not worth blocking on */ }
    ov.remove();
    trackEvent("app opened");
  };
  ov.querySelectorAll(".tech-name-btn").forEach((b) => { b.onclick = () => pick(b.dataset.name); });
  ov.querySelector("#techOtherBtn").onclick = () => {
    const v = ov.querySelector("#techOtherInput").value.trim();
    if (v) pick(v);
  };
}

async function renderVersionFooter() {
  const el = document.getElementById("appVersion");
  if (!el) return;
  let manualCount = "";
  try { manualCount = " · " + (await manualCatalog()).length + " manuals"; } catch (e) {}
  el.textContent = APP_VERSION + " · " + getAllCodes().length + " codes · " + getAllSymptoms().length + " scenarios · " + tstatEntries().length + " thermostats" + manualCount;
}

updateNetStatus();
showScreen("home");
renderVersionFooter();

if (getTechName()) trackEvent("app opened");
else showTechPicker();

// Only nudge a tech who has already picked their name — the picker overlay sits
// above everything, so a pill fired underneath it would just be missed.
if (getTechName()) showBulletinPill();

// Full-text index any already-downloaded manuals once the app is idle, so Ask
// can search inside manuals a tech downloaded before this feature shipped.
(function scheduleManualIndexing() {
  const run = () => indexAllDownloaded();
  if ("requestIdleCallback" in window) requestIdleCallback(run, { timeout: 8000 });
  else setTimeout(run, 4000);
})();
