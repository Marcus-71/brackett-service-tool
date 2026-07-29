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
  for (const id of ["homeScreen", "codesScreen", "diagScreen", "manualsScreen", "toolboxScreen"]) {
    document.getElementById(id).classList.add("hidden");
  }
  const screenEl = { home: "homeScreen", codes: "codesScreen", diagnostics: "diagScreen", manuals: "manualsScreen", toolbox: "toolboxScreen" }[name];
  document.getElementById(screenEl).classList.remove("hidden");
  document.getElementById("screenTitle").textContent = SCREEN_TITLES[name];
  document.getElementById("backBtn").classList.toggle("hidden", name === "home");

  const addBtn = document.getElementById("addBtn");
  if (name === "home") {
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
  const all = await manualsGetAll();
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
  card.innerHTML = `
    <div class="manual-icon">📄</div>
    <div class="manual-info">
      <div class="manual-title">${escapeHtml(m.title || m.filename)}</div>
      <div class="manual-meta">${[m.brand, m.model].filter(Boolean).map(escapeHtml).join(" · ")}${m.brand||m.model ? " · " : ""}${formatBytes(m.size)}</div>
    </div>
  `;
  return card;
}

async function openManualDetail(id) {
  const all = await manualsGetAll();
  const m = all.find(x => x.id === id);
  if (!m) return;
  const modal = document.getElementById("modal");
  if (currentPdfObjectUrl) { URL.revokeObjectURL(currentPdfObjectUrl); currentPdfObjectUrl = null; }
  currentPdfObjectUrl = URL.createObjectURL(m.blob);
  modal.innerHTML = `
    <h2>${escapeHtml(m.title || m.filename)}</h2>
    <div class="sub">${[m.brand, m.model].filter(Boolean).map(escapeHtml).join(" · ")}${m.brand||m.model ? " · " : ""}${formatBytes(m.size)}</div>
    ${m.notes ? `<div class="detail-section"><p>${escapeHtml(m.notes)}</p></div>` : ""}
    <iframe class="pdf-frame" src="${currentPdfObjectUrl}"></iframe>
    <div class="modal-actions">
      <button id="closeModalBtn">Close</button>
      <a id="downloadBtn" class="primary" style="display:flex;align-items:center;justify-content:center;text-decoration:none;" href="${currentPdfObjectUrl}" download="${escapeHtml(m.filename || "manual.pdf")}">Download</a>
      <button class="danger" id="deleteManualBtn">Delete</button>
    </div>
  `;
  document.getElementById("closeModalBtn").onclick = closeModal;
  document.getElementById("deleteManualBtn").onclick = async () => {
    if (!confirm("Delete this manual from the device?")) return;
    // Remember deleted seed manuals so the seed top-up doesn't re-download them
    if (m.id.startsWith("manual-seed-")) {
      const gone = JSON.parse(localStorage.getItem(MANUALS_SEED_DELETED_KEY) || "[]");
      if (!gone.includes(m.id)) { gone.push(m.id); localStorage.setItem(MANUALS_SEED_DELETED_KEY, JSON.stringify(gone)); }
    }
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

const MANUALS_SEED_FLAG = "bfc_manuals_seed_v1"; // legacy one-shot flag, no longer consulted
const MANUALS_SEED_DELETED_KEY = "bfc_manuals_seed_deleted_v1";
async function seedManualsIfNeeded() {
  if (typeof MANUAL_SEEDS === "undefined" || !navigator.onLine) return;
  // Top-up, not one-shot: every online launch, fetch any seed manual this device
  // doesn't have yet. A device that seeded before new manuals were added to the
  // list would otherwise never receive them (the old MANUALS_SEED_FLAG bug).
  try {
    const existing = new Set((await manualsGetAll()).map(m => m.id));
    const deleted = new Set(JSON.parse(localStorage.getItem(MANUALS_SEED_DELETED_KEY) || "[]"));
    let added = 0;
    for (const seed of MANUAL_SEEDS) {
      const filename = seed.file.split("/").pop();
      const id = "manual-seed-" + filename.replace(/\.pdf$/i, "");
      if (existing.has(id) || deleted.has(id)) continue;
      const resp = await fetch(seed.file);
      if (!resp.ok) continue;
      const blob = await resp.blob();
      await manualsPut({
        id,
        brand: seed.brand, model: seed.model, title: seed.title, notes: seed.notes,
        filename, mimeType: "application/pdf", size: blob.size, blob, addedAt: Date.now(),
      });
      added++;
    }
    if (added && currentScreen === "manuals") renderManuals();
  } catch (err) {
    // offline or fetch failed mid-way — missing files retry on next launch while online
  }
}

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
const APP_VERSION = "v38";

async function renderVersionFooter() {
  const el = document.getElementById("appVersion");
  if (!el) return;
  let manualCount = "";
  try { manualCount = " · " + (await manualsGetAll()).length + " manuals"; } catch (e) {}
  el.textContent = APP_VERSION + " · " + getAllCodes().length + " codes · " + getAllSymptoms().length + " scenarios" + manualCount;
}

updateNetStatus();
showScreen("home");
renderVersionFooter();
seedManualsIfNeeded().then(renderVersionFooter);
