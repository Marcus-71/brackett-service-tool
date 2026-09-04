/* Brackett Service Tool — Call Log (manager-only, plain JS, no build step) */

// ============================================================
// CALL LOG — the service manager's phone calls, captured in ~20 seconds
// ============================================================
// Every diagnostic call a tech makes to the service manager is knowledge that
// otherwise evaporates the moment he hangs up. Each entry here feeds two
// things: the Queue (calls the app could not have answered — the content
// backlog for the code/scenario library) and the Summary (where a service
// manager's day actually goes, in numbers management can read).
//
// Speed of entry is the whole design. The form opens with a timer already
// running, the only required field is who called, and everything else is a
// tap or optional. Storage is IndexedDB so it works with zero signal; each
// save also drops a one-line breadcrumb into the existing usage tracker so a
// lost phone does not lose the log. Uses escapeHtml / TECH_NAMES /
// getTechName / closeModal / trackEvent from app.js at call time.

const CALLLOG_DB_NAME = "bfc-calllog-db";
const CALLLOG_STORE = "calls";
const CALLLOG_LAST_TECH_KEY = "bfc-calllog-last-tech";
const CALLLOG_LIST_MAX = 50;
const CALLLOG_MINUTE_CHIPS = [2, 5, 10, 15, 20, 30, 45];
const CALLLOG_IN_TOOL = [["yes", "In the tool"], ["no", "Not in it"], ["partial", "Partly"]];
const CALLLOG_OUTCOMES = [["solved", "Solved on phone"], ["return", "Return trip"], ["parts", "Needed parts"], ["other", "Other"]];
const CALLLOG_VIEW_EL = { log: "calllogLogView", queue: "calllogQueueView", summary: "calllogSummaryView" };
// Plain-English filler only — HVAC words ("furnace", "flashing", "capacitor")
// are exactly what the symptom frequency list is supposed to surface.
const CALLLOG_STOPWORDS = new Set(("a an and the it its is was are were be been being on in at to of for with but not no off out up " +
  "down then than when will wont won't dont don't didnt didn't doesnt doesn't isnt isn't cant can't cannot could would should " +
  "just has had have he she they them said says say this that these those there their from by or so do does did get got " +
  "gets getting like unit system i im i'm we you your one all some keeps keep after before about into over again still also " +
  "very too can only every any both his her him my me our what which who how why where while because if as more most much " +
  "other same such went go going come came back now new old thing things something anything nothing time times").split(" "));

let calllogDbPromise = null;
let calllogMemory = [];            // fallback rows when IndexedDB is unavailable or a write fails
let calllogStorageWarning = "";    // shown on the Log view once storage has degraded
let calllogState = { view: "log", entries: [] };
let calllogTimer = { start: 0, interval: null, picked: null };
let calllogLastLongPress = 0;

// ---- Storage ----------------------------------------------------------------
// Same promise-wrapper shape as the manuals DB, but every call is guarded:
// private browsing, a full disk, or a browser with no IndexedDB at all must
// never throw out of a Save button. Rows that could not be written are kept in
// memory for this session and merged into every read, so the screen never
// silently drops a call the manager just typed.

function openCallLogDb() {
  if (calllogDbPromise) return calllogDbPromise;
  calllogDbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") { reject(new Error("IndexedDB unavailable")); return; }
    let req;
    try { req = indexedDB.open(CALLLOG_DB_NAME, 1); } catch (e) { reject(e); return; }
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(CALLLOG_STORE)) {
        db.createObjectStore(CALLLOG_STORE, { keyPath: "id" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error("IndexedDB blocked"));
  });
  return calllogDbPromise;
}
function callLogStorageDegraded() {
  calllogStorageWarning = "Storage is unavailable on this phone (private browsing, or it's full). Calls stay in memory until the app is closed — copy the summary out before then.";
}
async function callLogGetAll() {
  let rows = [];
  try {
    const db = await openCallLogDb();
    rows = await new Promise((resolve, reject) => {
      const req = db.transaction(CALLLOG_STORE, "readonly").objectStore(CALLLOG_STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (e) { callLogStorageDegraded(); }
  const seen = new Set(rows.map(r => r.id));
  return [...rows, ...calllogMemory.filter(r => !seen.has(r.id))];
}
async function callLogPut(record) {
  try {
    const db = await openCallLogDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(CALLLOG_STORE, "readwrite");
      tx.objectStore(CALLLOG_STORE).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    calllogMemory = calllogMemory.filter(r => r.id !== record.id);
    return true;
  } catch (e) {
    callLogStorageDegraded();
    const i = calllogMemory.findIndex(r => r.id === record.id);
    if (i >= 0) calllogMemory[i] = record; else calllogMemory.push(record);
    return false;
  }
}
async function callLogDelete(id) {
  calllogMemory = calllogMemory.filter(r => r.id !== id);
  try {
    const db = await openCallLogDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(CALLLOG_STORE, "readwrite");
      tx.objectStore(CALLLOG_STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) { callLogStorageDegraded(); }
}

function callLogNewId() {
  try { if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
  return Date.now() + "-" + Math.random().toString(36).slice(2, 10);
}
function callLogLastTech() {
  try { return localStorage.getItem(CALLLOG_LAST_TECH_KEY) || ""; } catch (e) { return ""; }
}
function callLogRememberTech(name) {
  try { localStorage.setItem(CALLLOG_LAST_TECH_KEY, name); } catch (e) { /* not worth blocking on */ }
}

// ---- Small formatters -------------------------------------------------------

function callLogClock(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
}
function callLogHm(min) {
  const m = Math.max(0, Math.round(min || 0));
  if (m < 60) return m + "m";
  return Math.floor(m / 60) + "h " + (m % 60) + "m";
}
function callLogTimeOfDay(d) {
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?([AP]M)/i, (m, p) => p.toLowerCase());
}
function callLogWhen(ts) {
  const d = new Date(ts);
  if (isNaN(d)) return "";
  const diff = Date.now() - d.getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return min + " min ago";
  if (d.toDateString() === new Date().toDateString()) return Math.round(min / 60) + " h ago";
  if (diff < 6 * 86400000) return d.toLocaleDateString([], { weekday: "short" }) + " " + callLogTimeOfDay(d);
  return d.toLocaleDateString([], { month: "short", day: "numeric" }) + ", " + callLogTimeOfDay(d);
}
function callLogUnitLabel(e) {
  return [e.brand, e.model].filter(Boolean).join(" ");
}
// One box on the form ("Goodman GMVC96", "Daikin", "DZ6VSA2410AB") is faster
// than two; split it back into the record's brand/model on save. A leading
// word with no digit in it is the brand, the rest is the model.
function callLogSplitUnit(s) {
  const v = String(s || "").trim().replace(/\s+/g, " ");
  if (!v) return { brand: "", model: "" };
  const parts = v.split(" ");
  if (parts.length === 1) return /\d/.test(v) ? { brand: "", model: v } : { brand: v, model: "" };
  if (!/\d/.test(parts[0])) return { brand: parts[0], model: parts.slice(1).join(" ") };
  return { brand: "", model: v };
}
function callLogLabelFor(pairs, value) {
  const hit = pairs.find(p => p[0] === value);
  return hit ? hit[1] : value;
}
// Monday 00:00 of the week containing d — reports run Mon–Sun.
function callLogWeekStart(d) {
  const w = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  w.setDate(w.getDate() - ((w.getDay() + 6) % 7));
  return w;
}
function callLogTruncate(s, n) {
  s = String(s || "");
  return s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;
}

// ---- Screen -----------------------------------------------------------------

async function renderCallLog() {
  const entries = await callLogGetAll();
  entries.sort((a, b) => String(b.ts || "").localeCompare(String(a.ts || "")));   // newest first
  calllogState.entries = entries;

  const queue = callLogQueue();
  const badge = document.getElementById("calllogQueueCount");
  if (badge) { badge.textContent = queue.length; badge.classList.toggle("hidden", !queue.length); }
  document.querySelectorAll("#calllogSeg .cl-seg-btn").forEach(b => b.classList.toggle("on", b.dataset.view === calllogState.view));
  for (const v of Object.keys(CALLLOG_VIEW_EL)) {
    document.getElementById(CALLLOG_VIEW_EL[v]).classList.toggle("hidden", v !== calllogState.view);
  }
  if (calllogState.view === "queue") renderCallLogQueue(queue);
  else if (calllogState.view === "summary") renderCallLogSummary();
  else renderCallLogList();
}

document.getElementById("calllogSeg").addEventListener("click", (e) => {
  const btn = e.target.closest(".cl-seg-btn");
  if (!btn || !CALLLOG_VIEW_EL[btn.dataset.view]) return;
  calllogState.view = btn.dataset.view;
  renderCallLog();
});

// ---- Log view ----

function callLogRowHtml(e) {
  const unit = callLogUnitLabel(e);
  const sym = callLogTruncate(e.symptom, 70);
  return `<div class="card cl-row" data-id="${escapeHtml(e.id)}">
    <div class="cl-row-top">
      <span class="cl-row-tech">${escapeHtml(e.tech)}</span>
      <span class="cl-row-min">${escapeHtml(String(e.minutes || 0))} min</span>
      ${unit ? `<span class="cl-row-unit">${escapeHtml(unit)}</span>` : ""}
      <span class="cl-row-when">${escapeHtml(callLogWhen(e.ts))}</span>
    </div>
    <div class="cl-row-sym">${sym ? escapeHtml(sym) : `<span class="cl-dim">no symptom noted</span>`}${e.inTool === "no" ? ` <span class="tag cl-tag-missing">not in tool</span>` : ""}</div>
    <button type="button" class="cl-row-del" aria-label="Delete this call">✕</button>
  </div>`;
}

function renderCallLogList() {
  const el = document.getElementById("calllogLogView");
  const rows = calllogState.entries.slice(0, CALLLOG_LIST_MAX);
  el.innerHTML = `
    ${calllogStorageWarning ? `<div class="caution-box cl-warn">${escapeHtml(calllogStorageWarning)}</div>` : ""}
    <button type="button" class="scan-identify cl-log-btn" id="calllogNewBtn">＋ Log a call</button>
    ${rows.length
      ? rows.map(callLogRowHtml).join("")
      : `<div class="empty-state">Nothing logged yet. Tap ＋ Log a call the moment the phone rings — the timer runs while you talk, so the length is free.</div>`}
  `;
  document.getElementById("calllogNewBtn").onclick = () => openCallEntryForm(null);
  el.querySelectorAll(".cl-row").forEach(callLogWireRow);
}

// Tap = edit. Long-press (or the ✕) = delete, after a confirm. The long-press
// timer is cancelled by any real movement so a scroll never reads as a press.
function callLogWireRow(row) {
  const id = row.dataset.id;
  let pressTimer = null, startX = 0, startY = 0;
  const cancel = () => { clearTimeout(pressTimer); pressTimer = null; };
  row.addEventListener("click", (e) => {
    if (e.target.closest(".cl-row-del")) return;
    if (Date.now() - calllogLastLongPress < 800) return;   // the tap that ended the long-press
    const rec = calllogState.entries.find(r => r.id === id);
    if (rec) openCallEntryForm(rec);
  });
  row.querySelector(".cl-row-del").onclick = (e) => { e.stopPropagation(); callLogConfirmDelete(id); };
  row.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".cl-row-del")) return;
    startX = e.clientX; startY = e.clientY;
    cancel();
    pressTimer = setTimeout(() => { pressTimer = null; calllogLastLongPress = Date.now(); callLogConfirmDelete(id); }, 650);
  });
  row.addEventListener("pointermove", (e) => {
    if (pressTimer && (Math.abs(e.clientX - startX) > 10 || Math.abs(e.clientY - startY) > 10)) cancel();
  });
  row.addEventListener("pointerup", cancel);
  row.addEventListener("pointercancel", cancel);
  row.addEventListener("pointerleave", cancel);
  row.addEventListener("contextmenu", (e) => e.preventDefault());
}

async function callLogConfirmDelete(id) {
  const rec = calllogState.entries.find(r => r.id === id);
  if (!rec) return;
  if (!confirm(`Delete ${rec.tech}'s call${rec.symptom ? ` (${callLogTruncate(rec.symptom, 40)})` : ""}?`)) return;
  await callLogDelete(id);
  renderCallLog();
}

// ---- Queue view ----

function callLogQueue() {
  return calllogState.entries
    .filter(e => e.inTool !== "yes" && !e.addedToTool)
    .sort((a, b) => String(a.ts || "").localeCompare(String(b.ts || "")));   // oldest first — work the backlog in order
}

function renderCallLogQueue(queue) {
  const el = document.getElementById("calllogQueueView");
  if (!queue.length) {
    el.innerHTML = `<div class="empty-state">Queue is clear — every logged call is either already in the tool or has been added. Nice.</div>`;
    return;
  }
  el.innerHTML = `
    <div class="cl-queue-intro">${queue.length} call${queue.length === 1 ? "" : "s"} the app couldn't have answered. Add each one to Error Codes or Diagnostic Help, then tap Added.</div>
    ${queue.map(e => {
      const unit = callLogUnitLabel(e);
      const d = new Date(e.ts);
      const when = isNaN(d) ? "" : d.toLocaleDateString([], { month: "short", day: "numeric" });
      return `<div class="card cl-q-row" data-id="${escapeHtml(e.id)}">
        <div class="cl-q-unit">${unit ? escapeHtml(unit) : `<span class="cl-dim">no model noted</span>`}${e.inTool === "partial" ? ` <span class="tag">partly in</span>` : ""}</div>
        <div class="cl-q-sym">${e.symptom ? escapeHtml(e.symptom) : `<span class="cl-dim">no symptom noted</span>`}</div>
        ${e.answer ? `<div class="cl-q-ans">${escapeHtml(e.answer)}</div>` : ""}
        <div class="card-meta">${escapeHtml(e.tech)} · ${escapeHtml(String(e.minutes || 0))} min · ${escapeHtml(when)} · ${escapeHtml(callLogLabelFor(CALLLOG_OUTCOMES, e.outcome))}</div>
        <button type="button" class="cl-added-btn">Added ✓</button>
      </div>`;
    }).join("")}
  `;
  el.querySelectorAll(".cl-q-row").forEach(row => {
    const id = row.dataset.id;
    row.querySelector(".cl-added-btn").onclick = async (e) => {
      e.stopPropagation();
      const rec = calllogState.entries.find(r => r.id === id);
      if (!rec) return;
      await callLogPut({ ...rec, addedToTool: true });
      renderCallLog();
    };
    row.addEventListener("click", (e) => {
      if (e.target.closest(".cl-added-btn")) return;
      const rec = calllogState.entries.find(r => r.id === id);
      if (rec) openCallEntryForm(rec);
    });
  });
}

// ---- Summary view ----

function callLogSymptomWords(entries) {
  const counts = new Map();
  for (const e of entries) {
    const seen = new Set();   // count a word once per call, not once per mention
    for (const raw of String(e.symptom || "").toLowerCase().split(/[^a-z0-9]+/)) {
      const w = raw.trim();
      if (!w || seen.has(w) || CALLLOG_STOPWORDS.has(w)) continue;
      // Keep short tokens only when they look like a code ("e4", "p8") — a
      // bare "4" out of "4 flashes" says nothing on its own.
      if (w.length < 3 && !(/\d/.test(w) && /[a-z]/.test(w))) continue;
      seen.add(w);
      counts.set(w, (counts.get(w) || 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 5);
}
function callLogTopModels(entries) {
  const counts = new Map();
  for (const e of entries) {
    const label = callLogUnitLabel(e);
    if (!label) continue;
    const key = label.toUpperCase();
    const cur = counts.get(key) || { label, n: 0 };
    cur.n += 1;
    counts.set(key, cur);
  }
  return [...counts.values()].sort((a, b) => b.n - a.n || a.label.localeCompare(b.label)).slice(0, 5).map(x => [x.label, x.n]);
}

function callLogStats() {
  const all = calllogState.entries;
  const now = new Date();
  const weekStart = callLogWeekStart(now);
  const inWeek = (e, start, end) => { const t = new Date(e.ts).getTime(); return t >= start.getTime() && (!end || t < end.getTime()); };
  const week = all.filter(e => inWeek(e, weekStart));
  const minutes = week.reduce((n, e) => n + (Number(e.minutes) || 0), 0);
  const perTech = new Map();
  for (const e of week) {
    const cur = perTech.get(e.tech) || { tech: e.tech, n: 0, min: 0 };
    cur.n += 1; cur.min += Number(e.minutes) || 0;
    perTech.set(e.tech, cur);
  }
  const techs = [...perTech.values()].sort((a, b) => b.n - a.n || b.min - a.min || a.tech.localeCompare(b.tech));
  const notIn = week.filter(e => e.inTool !== "yes").length;
  const weeks = [];
  for (let i = 3; i >= 0; i--) {
    const start = new Date(weekStart); start.setDate(start.getDate() - i * 7);
    const end = new Date(start); end.setDate(end.getDate() + 7);
    const rows = all.filter(e => inWeek(e, start, end));
    weeks.push({ start, n: rows.length, min: rows.reduce((n, e) => n + (Number(e.minutes) || 0), 0) });
  }
  return {
    weekStart, calls: week.length, minutes,
    avg: week.length ? Math.round(minutes / week.length) : 0,
    techs, notIn, notInPct: week.length ? Math.round(notIn / week.length * 100) : 0,
    models: callLogTopModels(all), words: callLogSymptomWords(all), weeks,
  };
}

function renderCallLogSummary() {
  const el = document.getElementById("calllogSummaryView");
  const s = callLogStats();
  const weekLabel = s.weekStart.toLocaleDateString([], { month: "short", day: "numeric" });
  const maxN = s.techs.length ? s.techs[0].n : 1;
  const list = (title, pairs) => pairs.length ? `
    <div class="cl-sum-title">${title}</div>
    <div class="card cl-sum-card">${pairs.map(([label, n]) => `<div class="cl-rep-row"><span class="cl-rep-label">${escapeHtml(label)}</span><span class="cl-rep-n">×${n}</span></div>`).join("")}</div>` : "";
  el.innerHTML = `
    <div class="cl-sum-title">This week · from Mon ${escapeHtml(weekLabel)}</div>
    <div class="cl-stats">
      <div class="cl-stat"><div class="cl-stat-n">${s.calls}</div><div class="cl-stat-k">calls</div></div>
      <div class="cl-stat"><div class="cl-stat-n">${escapeHtml(callLogHm(s.minutes))}</div><div class="cl-stat-k">on the phone</div></div>
      <div class="cl-stat"><div class="cl-stat-n">${s.avg}</div><div class="cl-stat-k">min / call</div></div>
    </div>
    <div class="cl-sum-title">Calls per tech · this week</div>
    <div class="card cl-sum-card">${s.techs.length
      ? s.techs.map(t => `<div class="cl-bar-row">
          <span class="cl-bar-name">${escapeHtml(t.tech)}</span>
          <span class="cl-bar"><span class="cl-bar-fill" style="width:${Math.round(t.n / maxN * 100)}%"></span></span>
          <span class="cl-bar-n">${t.n} · ${escapeHtml(callLogHm(t.min))}</span>
        </div>`).join("")
      : `<div class="cl-dim">No calls logged this week yet.</div>`}</div>
    <div class="cl-sum-title">Not in the tool · this week</div>
    <div class="card cl-sum-card cl-notin"><span class="cl-notin-pct">${s.notInPct}%</span><span class="cl-notin-sub">${s.notIn} of ${s.calls} call${s.calls === 1 ? "" : "s"} the app couldn't have answered</span></div>
    ${list("Most repeated models · all time", s.models)}
    ${list("Most repeated symptoms · all time", s.words)}
    <div class="cl-sum-title">Last 4 weeks</div>
    <div class="cl-weeks">${s.weeks.map(w => `<div class="cl-week">
      <div class="cl-week-n">${w.n}</div>
      <div class="cl-week-min">${escapeHtml(callLogHm(w.min))}</div>
      <div class="cl-week-k">${escapeHtml(w.start.toLocaleDateString([], { month: "short", day: "numeric" }))}</div>
    </div>`).join("")}</div>
    <div class="cl-sum-actions">
      <button type="button" id="calllogCopyBtn">📋 Copy as text</button>
      <button type="button" id="calllogCsvBtn">⬇ Download CSV</button>
    </div>
    <div id="calllogSumNote" class="scan-status hidden"></div>
  `;
  document.getElementById("calllogCopyBtn").onclick = () => callLogCopyReport(s);
  document.getElementById("calllogCsvBtn").onclick = () => callLogDownloadCsv();
}

function callLogNote(msg) {
  const el = document.getElementById("calllogSumNote");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("hidden");
}

function callLogReportText(s) {
  const fmtDay = (d) => d.toLocaleDateString([], { month: "short", day: "numeric" });
  const lines = [
    `Call Log — week of Mon ${fmtDay(s.weekStart)}`,
    `Calls: ${s.calls} · Time on the phone: ${callLogHm(s.minutes)} · Avg: ${s.avg} min/call`,
    `Not in the tool: ${s.notIn} of ${s.calls} (${s.notInPct}%)`,
    "",
    "Calls per tech (this week)",
    ...(s.techs.length ? s.techs.map(t => `  ${t.tech} — ${t.n} call${t.n === 1 ? "" : "s"}, ${callLogHm(t.min)}`) : ["  none yet"]),
  ];
  if (s.models.length) lines.push("", "Most repeated models (all time)", ...s.models.map(([l, n]) => `  ${l} ×${n}`));
  if (s.words.length) lines.push("", "Most repeated symptoms (all time)", ...s.words.map(([l, n]) => `  ${l} ×${n}`));
  lines.push("", "Last 4 weeks", ...s.weeks.map(w => `  ${fmtDay(w.start)}: ${w.n} call${w.n === 1 ? "" : "s"} · ${callLogHm(w.min)}`));
  const v = (typeof APP_VERSION !== "undefined") ? APP_VERSION : "";
  lines.push("", `Brackett Service Tool ${v}`.trim());
  return lines.join("\n");
}

async function callLogCopyReport(s) {
  const text = callLogReportText(s);
  let ok = false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); ok = true; }
  } catch (e) { /* fall through to the textarea trick */ }
  if (!ok) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select(); ta.setSelectionRange(0, text.length);
      ok = document.execCommand("copy");
      ta.remove();
    } catch (e) { ok = false; }
  }
  callLogNote(ok ? "Copied — paste it into a text or email." : "Couldn't reach the clipboard on this phone. Download the CSV instead.");
}

function callLogCsv(entries) {
  const q = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const head = ["date", "time", "tech", "minutes", "brand", "model", "symptom", "answer", "in_tool", "outcome", "added_to_tool"];
  const rows = entries.slice().sort((a, b) => String(a.ts || "").localeCompare(String(b.ts || ""))).map(e => {
    const d = new Date(e.ts);
    const date = isNaN(d) ? "" : d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const time = isNaN(d) ? "" : String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
    return [date, time, e.tech, e.minutes, e.brand, e.model, e.symptom, e.answer, e.inTool, e.outcome, e.addedToTool ? "yes" : "no"].map(q).join(",");
  });
  return [head.map(q).join(","), ...rows].join("\r\n");
}

function callLogDownloadCsv() {
  try {
    const d = new Date();
    const stamp = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    // BOM so Excel opens it as UTF-8 (the ° and × in answers otherwise garble).
    const blob = new Blob(["\uFEFF" + callLogCsv(calllogState.entries)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "brackett-call-log-" + stamp + ".csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoke on a delay: pulling the URL out from under the click on the same
    // tick makes some Android browsers download an empty file.
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    callLogNote(`Downloading ${calllogState.entries.length} call${calllogState.entries.length === 1 ? "" : "s"} as CSV.`);
  } catch (e) {
    callLogNote("Couldn't build the download on this phone. Use Copy as text instead.");
  }
}

// ---- Entry form -------------------------------------------------------------
// Opens with the timer already running, so opening it when the phone rings
// captures the call length for free. Everything but "who called" is optional
// — a half-filled entry beats no entry.

function callLogStopTimer() {
  if (calllogTimer.interval) clearInterval(calllogTimer.interval);
  calllogTimer.interval = null;
}
function callLogStartTimer() {
  callLogStopTimer();
  calllogTimer.start = Date.now();
  calllogTimer.picked = null;
  const tick = () => {
    const el = document.getElementById("cl-timer");
    // The modal can close underneath us (backdrop tap, swipe back) without
    // going through Save/Cancel — stop ticking the moment it is gone.
    if (!el || document.getElementById("modalBackdrop").classList.contains("hidden")) { callLogStopTimer(); return; }
    if (calllogTimer.picked != null) return;
    el.textContent = callLogClock(Date.now() - calllogTimer.start);
  };
  tick();
  calllogTimer.interval = setInterval(tick, 1000);
}
function callLogTechChoices(current) {
  const base = (typeof TECH_NAMES !== "undefined" ? TECH_NAMES : []).filter(n => n.toLowerCase() !== "andy");
  const first = [current, callLogLastTech()].filter(Boolean);
  return [...new Set([...first, ...base])].filter(n => n.toLowerCase() !== "andy");
}
function callLogChipsHtml(id, pairs, value) {
  return `<div class="cl-chips" id="${id}">${pairs.map(([v, label]) =>
    `<button type="button" class="chip cl-chip${v === value ? " active" : ""}" data-value="${escapeHtml(v)}">${escapeHtml(label)}</button>`).join("")}</div>`;
}
function callLogChipValue(id) {
  const on = document.querySelector(`#${id} .cl-chip.active`);
  return on ? on.dataset.value : "";
}
function callLogWireChips(id, onPick) {
  const box = document.getElementById(id);
  box.addEventListener("click", (e) => {
    const chip = e.target.closest(".cl-chip");
    if (!chip) return;
    box.querySelectorAll(".cl-chip").forEach(c => c.classList.toggle("active", c === chip));
    if (onPick) onPick(chip.dataset.value);
  });
}

function openCallEntryForm(existing) {
  const modal = document.getElementById("modal");
  const isNew = !existing;
  const c = existing || { tech: callLogLastTech(), minutes: null, brand: "", model: "", symptom: "", answer: "", inTool: "no", outcome: "solved" };
  const techs = callLogTechChoices(c.tech);
  modal.innerHTML = `
    <div class="cl-timer-row">
      <div class="cl-timer" id="cl-timer">${isNew ? "00:00" : escapeHtml(String(c.minutes || 0)) + " min"}</div>
      <div class="cl-timer-hint">${isNew ? "Running — tap a length below to stop it, or just hit Save when you hang up." : "Tap a length to change it."}</div>
    </div>
    ${callLogChipsHtml("cl-min-chips", CALLLOG_MINUTE_CHIPS.map(n => [String(n), n === 45 ? "45+" : String(n)]), c.minutes != null ? String(c.minutes) : "")}
    <div class="form-field"><label>Who called</label>${callLogChipsHtml("cl-tech-chips", techs.map(n => [n, n]), c.tech)}</div>
    <div class="form-field"><label>Brand / model</label><input id="cl-unit" value="${escapeHtml(callLogUnitLabel(c))}" placeholder="Brand + model, if you got it" autocapitalize="characters" autocomplete="off" spellcheck="false"></div>
    <div class="form-field"><label>Symptom</label><input id="cl-symptom" value="${escapeHtml(c.symptom || "")}" placeholder="What was it doing?" autocomplete="off"></div>
    <div class="form-field"><label>What I told them</label><textarea id="cl-answer" rows="3" placeholder="The fix, or how you got there">${escapeHtml(c.answer || "")}</textarea></div>
    <div class="form-field"><label>Was it in the tool?</label>${callLogChipsHtml("cl-intool-chips", CALLLOG_IN_TOOL, c.inTool || "no")}</div>
    <div class="form-field"><label>Outcome</label>${callLogChipsHtml("cl-outcome-chips", CALLLOG_OUTCOMES, c.outcome || "solved")}</div>
    <div class="modal-actions">
      <button id="cancelEditBtn">Cancel</button>
      ${!isNew ? `<button class="danger" id="deleteCallBtn">Delete</button>` : ""}
      <button class="primary" id="saveCallBtn">Save</button>
    </div>
  `;
  if (isNew) callLogStartTimer();
  else { callLogStopTimer(); calllogTimer.picked = c.minutes != null ? Number(c.minutes) : null; }

  callLogWireChips("cl-min-chips", (v) => {
    calllogTimer.picked = Number(v);
    document.getElementById("cl-timer").textContent = (v === "45" ? "45+" : v) + " min";
  });
  callLogWireChips("cl-tech-chips");
  callLogWireChips("cl-intool-chips");
  callLogWireChips("cl-outcome-chips");

  document.getElementById("cancelEditBtn").onclick = () => { callLogStopTimer(); closeModal(); };
  if (!isNew) {
    document.getElementById("deleteCallBtn").onclick = async () => {
      if (!confirm("Delete this call?")) return;
      closeModal();
      await callLogDelete(existing.id);
      renderCallLog();
    };
  }
  document.getElementById("saveCallBtn").onclick = async () => {
    const tech = callLogChipValue("cl-tech-chips");
    if (!tech) { alert("Tap who called — that's the only thing it needs."); return; }
    let minutes;
    if (calllogTimer.picked != null) minutes = calllogTimer.picked;
    else if (isNew) minutes = Math.max(1, Math.round((Date.now() - calllogTimer.start) / 60000));
    else minutes = Number(existing.minutes) || 1;
    const unit = callLogSplitUnit(document.getElementById("cl-unit").value);
    const rec = {
      id: existing ? existing.id : callLogNewId(),
      ts: existing && existing.ts ? existing.ts : new Date().toISOString(),
      tech, minutes,
      brand: unit.brand, model: unit.model,
      symptom: document.getElementById("cl-symptom").value.trim(),
      answer: document.getElementById("cl-answer").value.trim(),
      inTool: callLogChipValue("cl-intool-chips") || "no",
      outcome: callLogChipValue("cl-outcome-chips") || "other",
      addedToTool: existing ? !!existing.addedToTool : false,
    };
    callLogStopTimer();
    closeModal();
    callLogRememberTech(tech);
    await callLogPut(rec);
    renderCallLog();
    // Cloud breadcrumb — a copy in the office's usage sheet so a lost phone
    // doesn't lose the log. Best-effort: queued offline by trackEvent itself,
    // and never allowed to stand between the manager and a saved call.
    if (isNew && typeof trackEvent === "function") {
      try {
        trackEvent(callLogTruncate(`CALLLOG: ${tech} | ${minutes}m | ${callLogUnitLabel(rec) || "-"} | ${rec.symptom || "-"}`, 120));
      } catch (e) { /* the call is saved locally regardless */ }
    }
  };
  document.getElementById("modalBackdrop").classList.remove("hidden");
  if (isNew) modal.scrollTop = 0;
}
