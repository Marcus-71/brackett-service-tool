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
function textIncludes(fields, q) {
  if (!q) return true;
  const hay = fields.filter(Boolean).join(" ").toLowerCase();
  // Match each typed word independently (AND, any order) rather than the whole
  // query as one literal phrase — "high head low suction" should find "high
  // HEAD pressure + LOW SUCTION pressure" even though "pressure" sits between them.
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  return words.every(w => hay.includes(w));
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
  for (const id of ["homeScreen", "codesScreen", "diagScreen", "manualsScreen", "toolboxScreen", "scannerScreen"]) {
    document.getElementById(id).classList.add("hidden");
  }
  const screenEl = { home: "homeScreen", codes: "codesScreen", diagnostics: "diagScreen", manuals: "manualsScreen", toolbox: "toolboxScreen", scanner: "scannerScreen" }[name];
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
function saveUserCodes(list) { localStorage.setItem(CODES_STORAGE_KEY, JSON.stringify(list)); }
function loadDeletedCodeIds() { try { return JSON.parse(localStorage.getItem(CODES_DELETED_KEY)) || []; } catch { return []; } }
function saveDeletedCodeIds(list) { localStorage.setItem(CODES_DELETED_KEY, JSON.stringify(list)); }

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
    textIncludes([c.brand, c.family, c.equipment, c.code, c.title, c.meaning, ...(c.causes||[]), ...(c.steps||[])], codesState.search)
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
function saveUserSymptoms(list) { localStorage.setItem(DIAG_STORAGE_KEY, JSON.stringify(list)); }
function loadDeletedSymptomIds() { try { return JSON.parse(localStorage.getItem(DIAG_DELETED_KEY)) || []; } catch { return []; } }
function saveDeletedSymptomIds(list) { localStorage.setItem(DIAG_DELETED_KEY, JSON.stringify(list)); }

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

  const filtered = all.filter(s =>
    (diagState.equipment === "All" || s.equipment === diagState.equipment) &&
    textIncludes([s.title, s.summary, s.equipment, ...(s.steps||[])], diagState.search)
  ).sort((a, b) => a.title.localeCompare(b.title));

  const results = document.getElementById("diagResults");
  const empty = document.getElementById("diagEmptyState");
  results.innerHTML = "";
  empty.classList.toggle("hidden", filtered.length !== 0);
  if (filtered.length === 0) renderDiagEmptyState();
  for (const s of filtered) results.appendChild(buildSymptomCard(s));
}

// Nothing local matched. If there's an actual search term and the device is
// online, offer a plain web search — no API key, no backend, no ongoing cost.
// (Deliberately not an AI-generated answer: that would need a server to hold
// a secret key, since anything embedded in this static app's JS is public.)
function renderDiagEmptyState() {
  const empty = document.getElementById("diagEmptyState");
  const query = diagState.search.trim();
  if (!query) {
    empty.innerHTML = `No matching symptoms. Try a different search, or add this one.`;
    return;
  }
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
    <div class="card-meta"><span>${escapeHtml(s.equipment)}</span></div>
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
    ${steps ? `<div class="detail-section"><h3>Checklist</h3><ol>${steps}</ol></div>` : ""}
    ${s.safety ? `<div class="safety-box">⚠ ${escapeHtml(s.safety)}</div>` : ""}
    <div class="modal-actions">
      <button id="closeModalBtn">Close</button>
      <button class="primary" id="editSymptomBtn">Edit / correct</button>
    </div>
  `;
  document.getElementById("closeModalBtn").onclick = closeModal;
  document.getElementById("editSymptomBtn").onclick = () => openSymptomEditForm(s);
  document.getElementById("modalBackdrop").classList.remove("hidden");
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
function saveUserToolbox(list) { localStorage.setItem(TOOLBOX_STORAGE_KEY, JSON.stringify(list)); }
function loadDeletedToolboxIds() { try { return JSON.parse(localStorage.getItem(TOOLBOX_DELETED_KEY)) || []; } catch { return []; } }
function saveDeletedToolboxIds(list) { localStorage.setItem(TOOLBOX_DELETED_KEY, JSON.stringify(list)); }

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
        out.push({ id, brand: seed.brand, model: seed.model, title: seed.title, notes: seed.notes, filename: seed.file.split("/").pop(), seedFile: seed.file, downloaded: false });
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
  return record;
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
  { re: /^2[45]VNA/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Carrier Infinity variable-speed AC/HP (24VNA9/25VNA8)", notes: ["Full 39-code fault table for this family is in Error Codes."] },
  { re: /^24[A-Z]{3}/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Carrier AC condenser", notes: [] },
  { re: /^25[A-Z]{3}/, brand: "Carrier", equipment: "Condenser/Heat Pump", series: "Carrier heat pump", notes: [] },
  { re: /^9[0-9]{2}[A-Z]/, brand: "Carrier", equipment: "Gas Furnace", series: "Bryant 9xx-series gas furnace", notes: ["Bryant = Carrier; the Bryant/Payne flash codes in Error Codes apply."] },
  // --- Lennox ---
  { re: /^SLP9[89]/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox SLP98/SLP99 variable-capacity communicating furnace", notes: ["Full E-code table (E105-E409) is in Error Codes.", "Alert-code guide for the whole communicating system is in Manuals → Lennox."] },
  { re: /^G71MPP/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox G71MPP variable-capacity communicating furnace (2004-2011 era)", notes: ["Uses the same integrated-control E-code table (E105-E409) as SLP99 — see Lennox codes in Error Codes.", "Install + homeowner manuals are in Manuals → Lennox → G71MPP."] },
  { re: /^EL296|^EL196|^EL180/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox Elite gas furnace (EL296/EL196/EL180)", notes: ["EL296UHV install manual and EL180UHE spec sheet are in Manuals → Lennox."] },
  { re: /^SL297/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox SL297NV ultra-low-NOx two-stage furnace (Dave Lennox Signature)", notes: ["DLSC furnace spec sheet is in Manuals → Lennox."] },
  { re: /^(ML1[89]0|ML29[67]|SL280)/, brand: "Lennox", equipment: "Gas Furnace", series: "Lennox Merit/Signature gas furnace", notes: [] },
  { re: /^EL(18|22)KCV/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Elite R-454B variable-capacity communicating AC (EL18KCV/EL22KCV)", notes: ["Communicating — Lennox alert codes 400-446 in Error Codes apply (shown on S30/S40 thermostat).", "R-454B is an A2L refrigerant: paired indoor units carry leak-detection sensors — related furnace codes E150-E164 are in Error Codes.", "Spec sheets are in Manuals → Lennox."] },
  { re: /^(SL25XPV|SL25XCV|XP2[05]|XC2[015]|EL18XCV|EL16X)/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox communicating AC/heat pump", notes: ["Alert codes 400-446 for these outdoor units are in Error Codes (shown on the S40 thermostat)."] },
  { re: /^1[346]ACX|^14HPX|^ML1[46]XC/, brand: "Lennox", equipment: "Condenser/Heat Pump", series: "Lennox Merit AC/heat pump", notes: [] },
  { re: /^(CBA|CBX|CBK)[0-9]/, brand: "Lennox", equipment: "Air Handler", series: "Lennox air handler", notes: [] },
  // --- Trane / American Standard ---
  { re: /^S9V2|^S9X2|^S8X2|^S9B1/, brand: "Trane", equipment: "Gas Furnace", series: "Trane S-series gas furnace", notes: ["S9V2-VS install/operation manual is in Manuals → Trane.", "A951X IFC e-codes in Error Codes apply to current S-series boards."] },
  { re: /^(TUD|TUH|TDD|TUE|TME|AUD|ADD)[12]?[A-Z0-9]/, brand: "Trane", equipment: "Gas Furnace", series: "Trane/American Standard gas furnace (legacy lettered platform)", notes: [] },
  { re: /^4TT[RXBZ][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane AC condenser (4TTR/4TTX)", notes: ["Condensing unit installer's guide is in Manuals → Trane."] },
  { re: /^4TW[RXBZ][0-9]/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "Trane heat pump (4TWR/4TWX)", notes: [] },
  { re: /^4A7|^4A6/, brand: "Trane", equipment: "Condenser/Heat Pump", series: "American Standard AC/heat pump", notes: ["American Standard = Trane."] },
  { re: /^(TEM[468]|TAM[4-9]|GAM[45])/, brand: "Trane", equipment: "Air Handler", series: "Trane air handler", notes: [] },
  { re: /^(M5THS|MSTHS)/, brand: "Trane", equipment: "Mini-Split", series: "Trane ductless mini-split", notes: ["E/P error code table is in Error Codes."] },
  // --- York / JCI family ---
  { re: /^DGA[AH]/, brand: "York", equipment: "Gas Furnace", series: "York/Coleman DGAA/DGAH mobile-home furnace", notes: ["Its flash-code table is in Error Codes; service manual in Manuals → York."] },
  { re: /^TM9V|^TM9E|^TM8|^TG9S|^TG8S/, brand: "York", equipment: "Gas Furnace", series: "York/Luxaire/Coleman TM/TG gas furnace", notes: ["TM9V install manual is in Manuals → York."] },
  { re: /^YC[JGESD]|^YFK|^YCG/, brand: "York", equipment: "Condenser/Heat Pump", series: "York AC condenser", notes: [] },
  { re: /^Y[HZ][JGEF]/, brand: "York", equipment: "Condenser/Heat Pump", series: "York heat pump", notes: [] },
  // --- Rheem / Ruud ---
  { re: /^R9[2567][TVP]/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem/Ruud R9x condensing gas furnace", notes: ["PlusOne 7-segment diagnostics on board; EcoNet-capable models report codes to the EcoNet stat."] },
  { re: /^R80[12]V|^R801T/, brand: "Rheem", equipment: "Gas Furnace", series: "Rheem/Ruud 80% gas furnace", notes: [] },
  { re: /^RA1[3-7]|^WA1[3-7]|^RA20/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem/Ruud AC condenser", notes: [] },
  { re: /^RP1[4-7]|^WP1[4-7]|^RP20/, brand: "Rheem", equipment: "Condenser/Heat Pump", series: "Rheem/Ruud heat pump", notes: ["RP17 install manual is in Manuals → Rheem."] },
  { re: /^RH[12]T|^RH[12]V/, brand: "Rheem", equipment: "Air Handler", series: "Rheem/Ruud air handler", notes: [] },
  // --- Mitsubishi ---
  { re: /^MSZ|^MFZ|^MLZ|^SEZ|^SVZ|^PKA|^PEAD/, brand: "Mitsubishi", equipment: "Mini-Split", series: "Mitsubishi indoor unit", notes: ["Check indoor LED blink pattern; MXZ outdoor service manual is in Manuals → Mitsubishi."] },
  { re: /^MUZ|^MXZ|^MUFZ|^PUZ/, brand: "Mitsubishi", equipment: "Mini-Split", series: "Mitsubishi outdoor unit (MXZ = multi-zone)", notes: ["MXZ service manual with check codes is in Manuals → Mitsubishi."] },
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
function decodeSerialAge(brand, serial) {
  if (!serial) return null;
  const s = serial.replace(/[^A-Z0-9]/g, "");
  let m;
  if (brand === "Goodman" || brand === "Daikin") {
    if ((m = s.match(/^([0-2][0-9])(0[1-9]|1[0-2])/))) return `Made ${m[2]}/20${m[1]} (Goodman/Daikin serials start YYMM — estimate)`;
  }
  if (brand === "Carrier") {
    if ((m = s.match(/^([0-4][0-9]|5[0-3])([0-2][0-9])/))) return `Made week ${m[1]} of 20${m[2]} (Carrier serials start WWYY — estimate)`;
  }
  if (brand === "Trane") {
    if ((m = s.match(/^([0-2][0-9])[0-9]/))) return `Made 20${m[1]} (Trane serials since ~2010 start with the year — estimate)`;
  }
  if (brand === "Lennox") {
    if ((m = s.match(/^[0-9]{2}([0-2][0-9])[A-Z]/))) return `Made 20${m[1]} (Lennox serials: digits 3-4 are the year — estimate)`;
  }
  if (brand === "Rheem") {
    if ((m = s.match(/^[A-Z]?([0-4][0-9]|5[0-3])([0-2][0-9])/))) return `Made week ${m[1]} of 20${m[2]} (Rheem serials embed WWYY — estimate)`;
  }
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
        age: decodeSerialAge(p.brand, serial),
        notes: p.notes,
      };
    }
  }
  // Not in the offline library — keep whatever the tag itself told us so the
  // tech still gets a brand, an age estimate, and targeted internet lookups.
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
    const digitRuns = (up.match(/(?<![A-Z0-9])[0-9]{8,16}(?![A-Z0-9])/g) || [])
      .filter(t => !model.includes(t))
      .sort((a, b) => b.length - a.length);
    if (digitRuns.length) serial = digitRuns[0];
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
}

// ============================================================
// Init
// ============================================================

// Keep in sync with CACHE_NAME in sw.js — shown on the home screen so a tech
// (or the office) can tell at a glance whether a phone has the latest content.
const APP_VERSION = "v52";

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
renderVersionFooter();
