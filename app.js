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
  scanner: "Tag Scanner",
  charge: "Charging Calc",
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

function showScreen(name) {
  currentScreen = name;
  for (const id of ["homeScreen", "codesScreen", "diagScreen", "manualsScreen", "toolboxScreen", "scannerScreen", "chargeScreen", "requestScreen"]) {
    document.getElementById(id).classList.add("hidden");
  }
  const screenEl = { home: "homeScreen", codes: "codesScreen", diagnostics: "diagScreen", manuals: "manualsScreen", toolbox: "toolboxScreen", scanner: "scannerScreen", charge: "chargeScreen", request: "requestScreen" }[name];
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

  if (currentPdfObjectUrl) { URL.revokeObjectURL(currentPdfObjectUrl); currentPdfObjectUrl = null; }
  currentPdfObjectUrl = URL.createObjectURL(m.blob);
  const isSeed = m.id.startsWith("manual-seed-");
  modal.innerHTML = `
    <h2>${escapeHtml(m.title || m.filename)}</h2>
    <div class="sub">${[m.brand, m.model].filter(Boolean).map(escapeHtml).join(" · ")}${m.brand||m.model ? " · " : ""}${formatBytes(m.size)} · on this phone</div>
    ${m.notes ? `<div class="detail-section"><p>${escapeHtml(m.notes)}</p></div>` : ""}
    <iframe class="pdf-frame" src="${currentPdfObjectUrl}"></iframe>
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
    closeModal(); renderManuals();
  };
  document.getElementById("modalBackdrop").classList.remove("hidden");
}

function openManualEditForm(prefill) {
  const p = prefill || {};
  const modal = document.getElementById("modal");
  modal.innerHTML = `
    <h2>Add a manual</h2>
    <div class="sub">Pick a PDF already saved on this phone (e.g. downloaded from a manufacturer site). It's stored on-device and works offline after that.</div>
    <div class="form-field"><label>PDF file</label><input id="f-file" type="file" accept="application/pdf"></div>
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
  fileInput.addEventListener("change", () => {
    const f = fileInput.files[0];
    if (f && !document.getElementById("f-title").value) {
      document.getElementById("f-title").value = f.name.replace(/\.pdf$/i, "");
    }
  });
  document.getElementById("saveManualBtn").onclick = async () => {
    const file = fileInput.files[0];
    if (!file) { alert("Choose a PDF file first."); return; }
    if (file.type && file.type !== "application/pdf") { alert("Please choose a PDF file."); return; }
    const record = {
      id: "manual-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
      brand: document.getElementById("f-brand").value.trim(),
      model: document.getElementById("f-model").value.trim(),
      title: document.getElementById("f-title").value.trim() || file.name,
      notes: document.getElementById("f-notes").value.trim(),
      filename: file.name,
      mimeType: file.type || "application/pdf",
      size: file.size,
      blob: file,
      addedAt: Date.now(),
    };
    document.getElementById("uploadProgress").textContent = "Saving…";
    try {
      await manualsPut(record);
      closeModal();
      renderManuals();
    } catch (err) {
      document.getElementById("uploadProgress").textContent = "Failed to save: " + err.message;
    }
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
  { re: /^DV[0-9]{2}[FP]EC/, brand: "Daikin", equipment: "Air Handler", series: "Daikin DV**FEC/PEC EEV air handler (R-32 FIT indoor)", notes: ["Air-handler code table (EE/Eb/Ed/E5/EF, d/b series, 70-77) in Error Codes applies.", "R-32 FIT system service manual is in Manuals → Daikin."] },
  { re: /^D[FM]VE/, brand: "Daikin", equipment: "Air Handler", series: "DFVE/DMVE EEV-series communicating air handler (Daikin FIT indoor)", notes: ["Air-handler diagnostic codes (EC/EE/EF, d, b series) are in Error Codes."] },
  { re: /^DOZP/, brand: "Daikin", equipment: "Other", series: "Daikin One zone panel (DOZP)", notes: ["Zone error codes 25-95 and DOZP troubleshooting flows are in Diagnostic Help (search 'DOZP')."] },
  { re: /^(FTXS|FDXS|RXS|FTX|FTK|RK|RX)[0-9BX]/, brand: "Daikin", equipment: "Mini-Split", series: "Daikin single-zone wall-mount mini-split (incl. 19 Series FTK/RK)", notes: ["Full two-character error code table (U/A/C/E/F/H/J/L/P) is in Error Codes.", "19 Series service manual with per-code procedures is in Manuals → Daikin."] },
  { re: /^(RMXS|[234]MXS|MXS)[0-9]?/, brand: "Daikin", equipment: "Mini-Split", series: "Daikin multi-zone mini-split outdoor unit", notes: ["Multi-zone code table is in Error Codes; branch provider issues are in Diagnostic Help."] },
  // --- Goodman / Amana ---
  { re: /^AVZC1[68]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Amana/Goodman AVZC inverter heat pump (ClimateTalk communicating)", notes: ["Its full diagnostic code table (EE/Eb/b/d/7x) is in Error Codes."] },
  { re: /^(GSXV|GSZV|ASXV|ASZV)/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana side-discharge inverter condenser or heat pump", notes: ["Inverter unit — CoolCloud app connects to the board for diagnostics (see Toolbox)."] },
  { re: /^(GSX|ASX|DSX|SSX|ANX|VSX)[0-9]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana single-speed AC condenser", notes: ["Service manual RS6200006 (covers this family) is in Manuals → Goodman.", "Comfort Alert-style codes 01-09 apply if a monitor module is fitted."] },
  { re: /^(GSZ|ASZ|DSZ|SSZ|ANZ|VSZ)[0-9]/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana heat pump", notes: ["Service manual RS6200006 (covers this family) is in Manuals → Goodman."] },
  { re: /^(GM9C96|GC9C96|AM9C96|AC9C96)/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana 96% two-stage furnace (9-speed ECM)", notes: ["Service manual RS6612020 is in Manuals → Goodman — fault codes are on its pages 35-36."] },
  { re: /^(GM9S|GC9S|AM9S|AC9S|VM9S|VC9S)/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana 80/96% single-stage furnace", notes: ["E-codes (E0/E1/E2/Eb/EC) + flash codes are in Error Codes."] },
  { re: /^(GMVC|GCVC|AMVC|ACVC)9[67]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana two-stage variable-speed furnace (ComfortNet)", notes: ["Uses the shared ComfortNet dual 7-segment code set — see Goodman codes in Error Codes.", "Service manual RS6612014 is in Manuals → Goodman."] },
  { re: /^(GMVM|GCVM|AMVM|ACVM)9[78]/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana 97-98% modulating communicating furnace (Daikin DM97MC platform)", notes: ["Same code set as the Daikin DM97MC entries in Error Codes (E0-b9).", "Service manual RS6612015 is in Manuals → Goodman."] },
  { re: /^(GR9S|AR9S)/, brand: "Goodman", equipment: "Gas Furnace", series: "Goodman/Amana GR9S/AR9S single-stage multi-speed 96-97% furnace (R-32-era lineup)", notes: [] },
  { re: /^(GLZS4|ALZS4)/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana GLZS4/ALZS4 single-stage R-32 heat pump", notes: ["R-32 single-stage service manual RS6200301 (shared platform) is in Manuals → Daikin."] },
  { re: /^(GLXS4|ALXS4)/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman/Amana GLXS4/ALXS4 single-stage R-32 AC condenser", notes: ["R-32 single-stage service manual RS6200301 (shared platform) is in Manuals → Daikin."] },
  { re: /^(GP|AP)[GCHU][GMU0-9]/, brand: "Goodman", equipment: "Other", series: "Goodman/Amana packaged unit (gas-electric / AC / heat pump)", notes: ["Package-unit install + service manuals (IO-398E, IOG-3021B, RS6300012, RS6300014) are in Manuals → Goodman → Packaged units."] },
  { re: /^GVZC20/, brand: "Goodman", equipment: "Condenser/Heat Pump", series: "Goodman GVZC20 inverter heat pump (ComfortBridge)", notes: ["Inverter unit — CoolCloud app connects to the board for diagnostics (see Toolbox)."] },
  { re: /^(AMST|ARUF|ASPT|AVPTC|AWUF)/, brand: "Goodman", equipment: "Air Handler", series: "Goodman/Amana air handler", notes: ["PCBJA-board diagnostic codes (EC/EE/EF, d, b series) in Error Codes apply to the communicating models."] },
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
  { re: /^LRP1[46]/, brand: "Lennox", equipment: "Other", series: "Lennox LRP14/LRP16 residential packaged unit (gas-electric or heat pump)", notes: ["Service manual is in Manuals → Lennox → LRP14/LRP16.", "LRP14HP: nuisance low-pressure lockouts below 30°F are usually the defrost timer left on the 90-minute default — see Diagnostic Help.", "LRP14HP has a known incorrect-wiring-diagram notice; LRP16HP has a 9-pin relay mis-wiring notice — both in Manuals → Lennox."] },
  // Mini-splits. Current families are MWLD/MWPD/MWHD (indoor) and MMPD/MMLD
  // (outdoor, single and multi-zone); the older platform is MLB/MPC/3PC/3PB
  // plus the MCF/MFM/MMD/MWM/3WM indoor heads and M22A/M33C.
  { re: /^(MWLD|MWPD|MWHD|MMPD|MMLD)/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox mini-split / multi-split (current MW/MM platform)", notes: ["Full E-code list with Lennox's own troubleshooting steps is in Error Codes — search the E-number.", "E101/C101 (comm error) is the most common: F1/F2 must be 16/2 stranded shielded, straight run, 0.1-0.9 VDC — see Diagnostic Help.", "Service manual 100227 is in Manuals → Lennox."] },
  { re: /^(MLB|MPC|3PC|3PB|MCF[AB]|MFMA|MMD[AB]|MWMC|3WMC|M22A|M33C)/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox mini-split (MLB/MPC/3PC legacy platform)", notes: ["This platform uses EC/EH/EL/PC/F-prefix display codes — the code tables are in the service manual, Manuals → Lennox → 3PC/MLB/MPC.", "Outdoor boards have a point check (spot check) function that reads sensor values directly — see Diagnostic Help."] },
  { re: /^(ML[AB]|MP[AB]|MSA|MHA)[0-9]/, brand: "Lennox", equipment: "Mini-Split", series: "Lennox mini-split", notes: ["Mini-split error codes are in Error Codes; service manuals are in Manuals → Lennox."] },
  { re: /^(CBA|CBX|CBK)[0-9]/, brand: "Lennox", equipment: "Air Handler", series: "Lennox air handler", notes: ["Service manual for CBA27UHE and CBK48MVT (R-454B) is in Manuals → Lennox.", "Communicating air handlers report the numbered alert codes in Error Codes."] },
  { re: /^C[XHR]3[0-9]/, brand: "Lennox", equipment: "Air Handler", series: "Lennox indoor coil (CX/CH/CR 3x series)", notes: ["CX35 aluminum coils with factory TXV: check that the copper flare seal bonnet was removed from the equalizer fitting — if left on, the TXV cannot control superheat (service note C-15-07). See Diagnostic Help."] },
  // --- Trane / American Standard ---
  { re: /^S[89][VXB][12]|^L9X1/, brand: "Trane", equipment: "Gas Furnace", series: "Trane S-series gas furnace", notes: ["S9V2-VS install/operation manual is in Manuals → Trane.", "A951X IFC e-codes in Error Codes apply to current S-series boards."] },
  { re: /^(TUD|TUH|TDD|TDH|TUX|TUC|TDC|TUE|TME|AUD|ADD)[12]?[A-Z0-9]/, brand: "Trane", equipment: "Gas Furnace", series: "Trane/American Standard gas furnace (legacy lettered platform)", notes: [] },
  { re: /^4TT[RXBZ][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane AC condenser (4TTR/4TTX)", notes: ["Condensing unit installer's guide is in Manuals → Trane."] },
  { re: /^4TW[RXBZ][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane heat pump (4TWR/4TWX)", notes: [] },
  { re: /^4A7|^4A6/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "American Standard AC/heat pump", notes: ["American Standard = Trane."] },
  { re: /^(TEM[468]|TAM[4-9]X?|GAM[45]|TMM[45])/, brand: "Trane", equipment: "Air Handler", series: "Trane/American Standard air handler", notes: [] },
  // Trane/American Standard packaged units + coils — confirmed families, no
  // prior coverage at all for this equipment class under this brand.
  { re: /^4[TWY]C[CYZ][0-9]|^4DC[YZ][0-9]|^4WHC[0-9]/, brand: "Trane", equipment: "Other", series: "Trane/American Standard packaged unit (gas-electric / AC / heat pump)", notes: [] },
  { re: /^4[TP]XC|^4AXA|^4PXFH/, brand: "Trane", equipment: "Air Handler", series: "Trane/American Standard evaporator coil", notes: [] },
  { re: /^(M5THS|MSTHS|4TXK|4MXW)/, brand: "Trane", equipment: "Mini-Split", series: "Trane ductless mini-split", notes: ["E/P error code table is in Error Codes.", "No official Trane source confirms this is a Mitsubishi-built platform, despite that being commonly repeated — treat that claim as unconfirmed."] },
  // --- York / JCI family ---
  { re: /^DGA[AH]/, brand: "York", equipment: "Gas Furnace", series: "York/Coleman DGAA/DGAH mobile-home furnace", notes: ["Its flash-code table is in Error Codes; service manual in Manuals → York."] },
  { re: /^TM9V|^TM9E|^TM8|^TG9S|^TG8S/, brand: "York", equipment: "Gas Furnace", series: "York/Luxaire/Coleman TM/TG gas furnace", notes: ["TM9V install manual is in Manuals → York."] },
  { re: /^YC[JGESD]|^YFK|^YCG/, brand: "York", equipment: "Condenser/Heat Pump", series: "York AC condenser", notes: [] },
  { re: /^Y[HZ][JGEF]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York heat pump", notes: [] },
  // --- Rheem / Ruud ---
  { re: /^R9[2567][0-9]?[TVMP]/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem/Ruud R9x condensing gas furnace", notes: ["PlusOne 7-segment diagnostics on board; EcoNet-capable models report codes to the EcoNet stat."] },
  { re: /^R80[12][TV]/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem/Ruud 80% gas furnace", notes: [] },
  // Ruud's own top ("Ultra"/"Achiever Plus") tier gets a distinct U-prefix not
  // shared with Rheem — everything else Ruud sells uses the SAME R/W-prefix
  // letters as Rheem (no simple letter swap, despite that being commonly
  // assumed — confirmed against rheem.com and ruud.com directly).
  { re: /^U(9[78]M?V|802V)/, brand: "Rheem", equipment: "Gas Furnace", series: "Ruud Ultra Series modulating gas furnace (Rheem platform, Ruud-exclusive tier)", notes: [] },
  { re: /^U[AP]1[6-9]/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Ruud Ultra/Achiever Plus AC or heat pump (Rheem platform, Ruud-exclusive tier)", notes: [] },
  { re: /^RA1[3-9]|^WA1[3-5]|^RA20/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem/Ruud AC condenser", notes: [] },
  { re: /^R[PD]1[4-8]|^WP1[4-5]|^WSP?14|^RP(19|20)/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem/Ruud heat pump", notes: ["RP17 install manual is in Manuals → Rheem."] },
  { re: /^R[HF][12][TVP]|^RB2T|^RHMV|^WH1[TP]/, brand: "Rheem", equipment: "Air Handler", series: "Rheem/Ruud air handler", notes: [] },
  { re: /^RCF[YZ]?/, brand: "Rheem", equipment: "Other", series: "Rheem/Ruud evaporator coil", notes: [] },
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
  const modelLabel = /(?:MODEL|MODLE|M\/N|MOD|M0DEL)(?:\s*(?:NUMBER|NUM|N[O0]\.?))?[.:# ]*\s*([A-Z0-9][A-Z0-9./-]{4,24})/;
  const serialLabel = /(?:SERIAL|SER|S\/N|5\/N)(?:\s*(?:NUMBER|NUM|N[O0]\.?))?[.:# ]*\s*([A-Z0-9][A-Z0-9-]{5,24})/;
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
    const canvas = await preprocessPhoto(file);
    const worker = await getTessWorker(scanStatus);
    const { data } = await worker.recognize(canvas);
    scanStatus(null);
    const fields = extractTagFields(data.text || "");
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
const APP_VERSION = "v77";

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
  el.textContent = APP_VERSION + " · " + getAllCodes().length + " codes · " + getAllSymptoms().length + " scenarios" + manualCount;
}

updateNetStatus();
showScreen("home");
renderVersionFooter();

if (getTechName()) trackEvent("app opened");
else showTechPicker();
