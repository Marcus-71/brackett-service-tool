/* Brackett Service Tool — app logic (no build step, plain JS) */

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
  "there","when","where","why","how","all","any","both","each","more","most","other","only","own","same",
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
  codes: "Error Codes",
  diagnostics: "Diagnostic Help",
  manuals: "Manuals",
  toolbox: "Toolbox",
  tstat: "Thermostats",
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
  for (const id of ["homeScreen", "codesScreen", "diagScreen", "manualsScreen", "toolboxScreen", "tstatScreen", "scannerScreen", "chargeScreen", "warrantyScreen", "sqftScreen", "requestScreen"]) {
    document.getElementById(id).classList.add("hidden");
  }
  const screenEl = { home: "homeScreen", codes: "codesScreen", diagnostics: "diagScreen", manuals: "manualsScreen", toolbox: "toolboxScreen", tstat: "tstatScreen", scanner: "scannerScreen", charge: "chargeScreen", warranty: "warrantyScreen", sqft: "sqftScreen", request: "requestScreen" }[name];
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

  if (name === "codes") renderCodes();
  if (name === "diagnostics") renderSymptoms();
  if (name === "manuals") renderManuals();
  if (name === "toolbox") renderToolbox();
  if (name === "tstat") renderTstats();
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
const fuState = { symptom: null, questions: null, index: 0, history: [], verdict: null, seen: [] };

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
    body = `
      <div class="fu-verdict"><strong>What it points to</strong><p>${escapeHtml(fuState.verdict)}</p></div>
      ${more !== null ? `<button class="fu-more" id="fuMoreBtn">There's more to check on this one →</button>` : ""}
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
  const moreBtn = document.getElementById("fuMoreBtn");
  if (moreBtn) moreBtn.onclick = () => {
    const idx = nextOrphanQuestion();
    if (idx === null) return;
    fuState.seen.push(idx);
    fuState.index = idx;
    fuState.verdict = null;
    renderFollowups();
  };
  if (fuState.verdict) return;

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
let toolboxState = { search: "", brand: "All" };

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

  const filtered = all.filter(t =>
    (toolboxState.brand === "All" || t.brand === toolboxState.brand) &&
    textIncludes([t.brand, t.family, t.toolName, t.title, t.whenToUse, ...(t.requirements||[]), ...(t.steps||[])], toolboxState.search)
  ).sort((a, b) => a.brand.localeCompare(b.brand) || a.toolName.localeCompare(b.toolName));

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
  `;
  return card;
}

function openToolboxDetail(id) {
  const t = getAllToolboxEntries().find(x => x.id === id);
  if (!t) return;
  const modal = document.getElementById("modal");
  const requirements = (t.requirements || []).map(r => `<li>${escapeHtml(r)}</li>`).join("");
  const steps = (t.steps || []).map(s => `<li>${escapeHtml(s)}</li>`).join("");
  modal.innerHTML = `
    <h2>${escapeHtml(t.toolName)} — ${escapeHtml(t.title)}</h2>
    <div class="sub">${escapeHtml(t.brand)}${t.family ? " · " + escapeHtml(t.family) : ""}</div>
    <div class="detail-section"><h3>When to use it</h3><p>${escapeHtml(t.whenToUse || "—")}</p></div>
    ${requirements ? `<div class="detail-section"><h3>What you need</h3><ul>${requirements}</ul></div>` : ""}
    ${steps ? `<div class="detail-section"><h3>Steps</h3><ol>${steps}</ol></div>` : ""}
    ${t.caution ? `<div class="caution-box">⚠ ${escapeHtml(t.caution)}</div>` : ""}
    <div class="modal-actions">
      <button id="closeModalBtn">Close</button>
      <button class="primary" id="editToolboxBtn">Edit / correct</button>
    </div>
  `;
  document.getElementById("closeModalBtn").onclick = closeModal;
  document.getElementById("editToolboxBtn").onclick = () => openToolboxEditForm(t);
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
// MANUALS (PDFs stored in IndexedDB, works fully offline)
// ============================================================

const MANUALS_DB_NAME = "bfc-manuals-db";
const MANUALS_STORE = "manuals";
let manualsDbPromise = null;
let currentPdfObjectUrl = null;
const UNFILED_BRAND = "Unfiled";
const GENERAL_MODEL = "General";
let manualsState = { search: "", brand: null, model: null };

function openManualsDb() {
  if (manualsDbPromise) return manualsDbPromise;
  manualsDbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(MANUALS_DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(MANUALS_STORE)) {
        db.createObjectStore(MANUALS_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return manualsDbPromise;
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
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MANUALS_STORE, "readwrite");
    tx.objectStore(MANUALS_STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
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
  // Same pill styling, but lifted clear of the update pill so a tech who has
  // both waiting can still read and tap each one.
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
  document.body.appendChild(pill);
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

async function openPdfReader(m) {
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
  // --- Daikin residential unitary ---
  { re: /^D[MC]97MC/, brand: "Daikin", equipment: "Gas Furnace", series: "DM97MC/DC97MC modulating gas furnace (ComfortNet communicating)", notes: ["Fault codes for this exact family are in Error Codes (E0-b9)."] },
  { re: /^D[MC]96VC/, brand: "Daikin", equipment: "Gas Furnace", series: "DM96VC/DC96VC two-stage variable-speed gas furnace", notes: ["Install manual is in Manuals → Daikin."] },
  { re: /^D[MC]9[26]SN/, brand: "Daikin", equipment: "Gas Furnace", series: "DM92SN/DM96SN/DC96SN single-stage gas furnace", notes: ["Shares the Goodman GM9S80-style E-code board family."] },
  { re: /^D[XZ]1[68]TC/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "DX/DZ 16-18TC condenser or heat pump (ComfortNet)", notes: ["Comfort Alert codes 01-09 for this family are in Error Codes.", "DZ = heat pump, DX = straight cool."] },
  { re: /^D[CHZ][679]VS/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin FIT inverter outdoor unit (DC/DH/DZ 6-9VS)", notes: ["Full FIT E-code table is in Error Codes.", "Communicating system — check Data 1/2 bus (0.6-0.9VDC bias) on comm issues.", "R-410A and R-32 FIT system service manuals are in Manuals → Daikin."] },
  { re: /^D[CHXZ](17|20)V[SC]/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin FIT/premium inverter outdoor (DZ17VSA / DX20VC / DZ20VC class)", notes: ["E-code table in Error Codes applies (DX20VC/DZ20VC service manual is in Manuals → Daikin — codes E31/E45 are specific to that platform)."] },
  { re: /^D[CH][345]S[QE]/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin R-32 single-stage AC/heat pump (DC3S/DC4S/DC5S/DH4S/DH5S)", notes: ["Copeland CoreSense/ComfortAlert diagnostics — alert codes 01-09 in Error Codes apply.", "R-32 single-stage service manual RS6200301 is in Manuals → Daikin."] },
  { re: /^DR96SN/, brand: "Daikin", equipment: "Gas Furnace", series: "Daikin DR96SN single-stage multi-speed 96-97% furnace (R-32-era lineup)", notes: [] },
  // Prior-generation Daikin unitary, confirmed against Daikin's own spec
  // sheets (SS-DX13SA on daikincomfort.com) and product pages (DP14GM/DP14HM).
  { re: /^D[XZ]1[3-6]S[AN]/, brand: "Daikin", equipment: "Condenser/Heat Pump", series: "Daikin single-stage condenser or heat pump (DX/DZ 13-16 S-series — prior generation)", notes: ["Goodman GSX/GSZ platform — service manual RS6200006 in Manuals → Goodman applies.", "Comfort Alert-style codes 01-09 apply if a monitor module is fitted."] },
  { re: /^DP1[3-6][GH][MEC]/, brand: "Daikin", equipment: "Other", series: "Daikin packaged unit (DP GM gas-electric / DP HM heat pump)", notes: ["Goodman package platform — the package-unit manuals in Manuals → Goodman → Packaged units apply."] },
  { re: /^DV[0-9]{2}[FP]EC/, brand: "Daikin", equipment: "Air Handler", series: "Daikin DV**FEC/PEC EEV air handler (R-32 FIT indoor)", notes: ["Air-handler code table (EE/Eb/Ed/E5/EF, d/b series, 70-77) in Error Codes applies.", "R-32 FIT system service manual is in Manuals → Daikin."] },
  { re: /^D[FM]VE/, brand: "Daikin", equipment: "Air Handler", series: "DFVE/DMVE EEV-series communicating air handler (Daikin FIT indoor)", notes: ["Air-handler diagnostic codes (EC/EE/EF, d, b series) are in Error Codes."] },
  { re: /^DOZP/, brand: "Daikin", equipment: "Other", series: "Daikin One zone panel (DOZP)", notes: ["Zone error codes 25-95 and DOZP troubleshooting flows are in Diagnostic Help (search 'DOZP')."] },
  { re: /^(FTXS|FDXS|CTXS|CTXG|CDXS|FVXS|RXS|FTX|FTK|RK|RX)[0-9BX]/, brand: "Daikin", equipment: "Mini-Split", series: "Daikin single-zone ductless indoor/outdoor (wall mount, floor console, slim duct; incl. 19 Series FTK/RK)", notes: ["Full two-character error code table (U/A/C/E/F/H/J/L/P) is in Error Codes.", "19 Series service manual with per-code procedures is in Manuals → Daikin.", "CTXG/CTXS/CDXS/FVXS head-specific checks (PCB jumpers, Hall IC, fan connector voltages) are in Diagnostic Help."] },
  { re: /^(RMXS|[234]MXS|MXS)[0-9]?/, brand: "Daikin", equipment: "Mini-Split", series: "Daikin multi-zone mini-split outdoor unit", notes: ["Multi-zone code table is in Error Codes; branch provider issues are in Diagnostic Help."] },
  // --- Goodman / Amana ---
  { re: /^AVZC1[68]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Amana/Goodman AVZC inverter heat pump (ClimateTalk communicating)", notes: ["Its full diagnostic code table (EE/Eb/b/d/7x) is in Error Codes."] },
  { re: /^(GSXV|GSZV|ASXV|ASZV)/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana side-discharge inverter condenser or heat pump", notes: ["Inverter unit — CoolCloud app connects to the board for diagnostics (see Toolbox)."] },
  { re: /^(GSX|ASX|DSX|SSX|ANX|VSX)[0-9]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana single-speed AC condenser", notes: ["Service manual RS6200006 (covers this family) is in Manuals → Goodman.", "Comfort Alert-style codes 01-09 apply if a monitor module is fitted."] },
  { re: /^(GSZ|ASZ|DSZ|SSZ|ANZ|VSZ)[0-9]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana heat pump", notes: ["Service manual RS6200006 (covers this family) is in Manuals → Goodman."] },
  { re: /^(GM9C96|GC9C96|AM9C96|AC9C96)/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana 96% two-stage furnace (9-speed ECM)", notes: ["Service manual RS6612020 is in Manuals → Goodman — fault codes are on its pages 35-36."] },
  { re: /^(GM9S|GC9S|AM9S|AC9S|VM9S|VC9S)/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana 80/96% single-stage furnace", notes: ["E-codes (E0/E1/E2/Eb/EC) + flash codes are in Error Codes."] },
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
  { re: /^59(SC|SP)[0-9]/, brand: "Carrier", equipment: "Gas Furnace", series: "Carrier Comfort series single-stage furnace", notes: ["Uses the standard Carrier flash-code board — see Bryant/Payne flash codes in Error Codes."] },
  { re: /^58[A-Z]{2}/, brand: "Carrier", equipment: "Gas Furnace", series: "Carrier 58-series gas furnace", notes: ["Standard flash-code list in Error Codes applies to most non-communicating models."] },
  // Payne-branded — same Carrier Corp platform, one standard tier (no
  // good/better/best split). No official Payne serial-date format exists
  // (checked payne.com/hvacpartners.com/shareddocs.com directly) — the age
  // field will come back blank for these, and that's correct, not a bug.
  { re: /^PG(9[0-9]|8[0-9])[A-Z]/, brand: "Carrier", equipment: "Gas Furnace", series: "Payne-branded gas furnace (Carrier platform)", notes: ["Payne = Carrier — the standard Carrier/Bryant/Payne flash-code list in Error Codes applies.", "No official source documents a Payne serial date format — the tag's own date/warranty info is more reliable than a guess."] },
  { re: /^2[4567][A-Z]{3}/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Carrier Infinity/Performance/Comfort AC or heat pump (24/25/26/27-series)", notes: ["24VNA9/25VNA8: full 39-code fault table is in Error Codes."] },
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
  { re: /^(3[78]M|40M|45M|538K|615[AP]HA|DHM|D5MAHA)/, brand: "Carrier", equipment: "Mini-Split", series: "Carrier/Bryant/Payne-branded ductless mini-split", notes: ["Same underlying mini-split platform is sold under all three badges."] },
  { re: /^(F[EJTM]5|FE4A|FE5A|FV4C|FX4D|FB4C|PF5M)[A-Z0-9]/, brand: "Carrier", equipment: "Air Handler", series: "Carrier/Bryant/Payne air handler", notes: [] },
  // Prior-generation fan coils, confirmed against Carrier's own product data
  // (FA4A-9PD covers FA4A/FB4A/FC4B; FY4A/FA4C product data on Carrier docs).
  { re: /^(FA4[AC]|FB4[AB]|FC4[BC]|FY4[AC]|FX4[ABC])[A-Z0-9]/, brand: "Carrier", equipment: "Air Handler", series: "Carrier/Bryant/Payne fan coil (FA4/FB4/FC4/FY4/FX4 — prior generation)", notes: [] },
  { re: /^CNPV[PTU][0-9]/, brand: "Carrier", equipment: "Other", series: "Carrier/Bryant/Payne cased N coil (CNPVP/CNPVT)", notes: ["Coil-only tag: the matching outdoor unit's data plate carries the system charge and electrical specs.", "Metering device decides the charging method: piston/fixed orifice = charge by SUPERHEAT (chart method in the Charging Calc), TXV = charge by SUBCOOLING. Check which this coil actually has."] },
  // Residential/light-commercial packaged units, confirmed against Carrier's
  // own product data (48ES-05PD; shareddocs SUP covering 48/50 ES-EZ-VL-VT).
  // 48TC/48HC rooftops carry the IGC board whose codes are in Error Codes.
  { re: /^(48|50)(ES|EZ|VL|VT|VG|SD|GC|TC|HC|LC)[A-Z0-9-]/, brand: "Carrier", equipment: "Other", series: "Carrier/Bryant packaged unit (48 = gas-electric, 50 = electric/heat pump)", notes: ["On 48TC/48HC/Bryant 580J rooftops, the IGC board flash codes (1-9, steady, off) are in Error Codes."] },
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
  { re: /^4[TP]XC|^4AXA|^4PXFH/, brand: "Trane", equipment: "Air Handler", series: "Trane/American Standard evaporator coil", notes: ["Metering device decides the charging method: piston/fixed orifice = charge by SUPERHEAT (chart method in the Charging Calc), TXV = charge by SUBCOOLING. Check which this coil actually has."] },
  { re: /^(M5THS|MSTHS|4TXK|4MXW)/, brand: "Trane", equipment: "Mini-Split", series: "Trane ductless mini-split", notes: ["E/P error code table is in Error Codes.", "No official Trane source confirms this is a Mitsubishi-built platform, despite that being commonly repeated — treat that claim as unconfirmed."] },
  // --- York / JCI family ---
  { re: /^DGA[AH]/, brand: "York", equipment: "Gas Furnace", series: "York/Coleman DGAA/DGAH mobile-home furnace", notes: ["Its flash-code table is in Error Codes; service manual in Manuals → York."] },
  { re: /^TM9V|^TM9E|^TM8|^TG9S|^TG8S/, brand: "York", equipment: "Gas Furnace", series: "York/Luxaire/Coleman TM/TG gas furnace", notes: ["TM9V install manual is in Manuals → York."] },
  { re: /^YC[JGESD]|^YFK|^YCG/, brand: "York", equipment: "Condenser/Heat Pump", series: "York AC condenser", notes: [] },
  { re: /^Y[HZ][JGEF]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York heat pump", notes: [] },
  // Air handlers confirmed against JCI's own literature: AHE single-piece
  // 3-position (UIM 697883), AHR technical guide, AVC communicating
  // (york.com), JHET fixed-speed (luxaire.com).
  { re: /^(AH[ERVX]|AV[CV]|MVC|JHET)[0-9]/, brand: "York", equipment: "Air Handler", series: "York/Luxaire/Coleman air handler (AHE/AHR/AHV/AVC/AVV/MVC/JHET)", notes: [] },
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
  { re: /^U[AP]1[6-9]/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Ruud Ultra/Achiever Plus AC or heat pump (Rheem platform, Ruud-exclusive tier)", notes: [] },
  { re: /^RA1[3-9]|^WA1[3-5]|^RA20/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem/Ruud AC condenser", notes: [] },
  // Classic/Value-series R-410A condensers that pre-date the RA-prefix naming
  // (13AJN / 13AJM = 13 SEER, 14AJM = 14.5 SEER; Rheem IO 92-21354-78-02
  // "13 & 14.5 SEER Series Condensing Units"). Seen in the field 2026-08 on a
  // 2013 14AJM30A01 whose bilingual tag also defeated the label reader.
  { re: /^1[34]AJ[MN]/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem Classic/Value Series AC condenser (13AJN/13AJM 13 SEER, 14AJM 14.5 SEER, R-410A, prior generation)", notes: ["Factory-charged R-410A; the tag prints the outdoor-unit charge (e.g. 112 oz) - line-set adders and the matched coil decide the final charge. Install doc 92-21354-78-02."] },
  { re: /^R[PD]1[4-8]|^WP1[4-5]|^WSP?14|^RP(19|20)/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem/Ruud heat pump", notes: ["RP17 install manual is in Manuals → Rheem."] },
  { re: /^R[HF][12][TVP]|^RB2T|^RHMV|^WH1[TP]/, brand: "Rheem", equipment: "Air Handler", series: "Rheem/Ruud air handler", notes: [] },
  { re: /^RCF[YZ]?/, brand: "Rheem", equipment: "Other", series: "Rheem/Ruud evaporator coil", notes: ["Metering device decides the charging method: piston/fixed orifice = charge by SUPERHEAT (chart method in the Charging Calc), TXV = charge by SUBCOOLING. Check which this coil actually has."] },
  { re: /^RQ[NPR]M/, brand: "Rheem", equipment: "Other", series: "Rheem Classic Series packaged heat pump", notes: [] },
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
    const f = model.match(/(040|045|060|070|080|090|100|110|115|120|130|140)(?=[A-Z0-9]|$)/);
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
      scanStatus("Couldn't confidently find a model number in the photo. Try a straighter, closer, better-lit shot — or type the model number below.");
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
  const manualsBrand = info.brand || info.brandGuess;
  box.innerHTML = `
    <div class="scan-id-card">
      <div class="card">
        <div class="card-top"><div><div class="card-code">${escapeHtml(info.model)}</div>${info.serial ? `<div class="card-sub">S/N ${escapeHtml(info.serial)}</div>` : ""}</div></div>
        ${unknown}
        <ul class="scan-id-facts">${factsHtml}${notes}</ul>
        <div class="scan-actions">
          ${info.brand ? `<button class="primary-act" id="scanGoCodes">⚡ ${escapeHtml(info.brand)} ${escapeHtml(info.equipment)} codes (${codeCount})</button>` : ""}
          <button id="scanGoDiag">🩺 Diagnostics${info.equipment ? " for " + escapeHtml(info.equipment) : ""}</button>
          ${manualsBrand ? `<button id="scanGoManuals">📄 ${escapeHtml(manualsBrand)} manuals</button>` : ""}
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
  "BOSCH":             { label: "Bosch warranty lookup (ARC Spare Parts Finder)", url: "https://arc.bosch-homecomfort.us/SparePartsFinder?type=material-serial&lang=en", needs: "serial number - the ARC material/serial search; a login control sits top-right but the search box rendered without a login wall", note: "Bosch has no standalone anonymous serial-lookup page on bosch-homecomfort.com - ARC (Aftermarket Resource Center) is the real tool. Bosch's own FAQ says the warranty START DATE is based on the MANUFACTURE date, so an unregistered unit's coverage is dated from the factory, not the install. Warranty phone 1-800-283-3787 (Mon-Thu 8-6 ET, Fri 8-5); warranty_returns@us.bosch.com." },
};
// The literal badge printed on the tag decides the portal.
function detectBadgeInText(up) {
  for (const badge of Object.keys(WARRANTY_PORTALS)) if (up.includes(badge)) return badge;
  return null;
}
// Model-pattern brand -> default badge when the tag text didn't say.
const BRAND_TO_BADGE = { Goodman: "GOODMAN", Daikin: "DAIKIN", Carrier: "CARRIER", Lennox: "LENNOX", Trane: "TRANE", York: "YORK", Rheem: "RHEEM", Mitsubishi: "MITSUBISHI", Bosch: "BOSCH" };

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
    renderWarrantyResult(fields.model, fields.serial, detectBadgeInText((data.text || "").toUpperCase()));
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
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });

  // A new version installs and takes over in the background, but the page a
  // tech is looking at is still running the old code — so without this they'd
  // keep seeing the old version until the next time they open the app. Offer a
  // reload instead of forcing one: an automatic refresh mid-job would wipe out
  // whatever they were part-way through on screen.
  // Distinguish "a worker just took control for the first time" from "a newer
  // worker replaced the one we had". Only the second is an update worth
  // reloading for. A page loaded before its worker claimed it starts with no
  // controller, so the first handover there is the initial claim, not an
  // update — track that rather than snapshotting once, or every later update
  // on that install gets swallowed.
  let haveBaselineController = !!navigator.serviceWorker.controller;
  let updateOffered = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!haveBaselineController) { haveBaselineController = true; return; }
    if (updateOffered) return;
    updateOffered = true;
    showUpdatePill();
  });
}

function showUpdatePill() {
  if (document.getElementById("updatePill")) return;
  const pill = document.createElement("button");
  pill.id = "updatePill";
  pill.className = "update-pill";
  pill.type = "button";
  pill.innerHTML = `<span>Update ready</span><span class="update-pill-cta">Tap to reload</span>`;
  pill.onclick = () => { trackEvent("took an update"); location.reload(); };
  document.body.appendChild(pill);
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

const APP_VERSION = "v115";

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
