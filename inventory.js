/*
 * Inventory count (Andy 2026-10-02) - scan each piece of equipment's data
 * plate; the count totals by model number. Only Andy's and Kenny's phones show
 * the tile. A serial already in the count is not counted twice.
 *
 * Scanning is a live camera: point at a tag, tap Capture, and the camera stays
 * up for the next piece while that tag is read in the background (taps queue
 * up). End, at the bottom, closes the camera.
 *
 * The finished count is emailed as an Excel file to andy@brackettcomfort.com
 * through the same relay the generator checklist uses (kind: "inventory"; the
 * relay fixes the recipient - the app cannot send it anywhere else). Unit Price
 * is left blank per model until Andy has prices; Total Value fills itself in.
 * The count lives on this phone until it is emailed and cleared, and works
 * with zero signal.
 */

// v2 (2026-10-02): Andy is redoing the count from scratch - the first test
// counts under bfc-inventory-v1 are not carried over.
const INV_KEY = "bfc-inventory-v2";
const INV_USERS = ["andy", "kenny"];
const INV_EMAIL_TO = "andy@brackettcomfort.com";   // shown to the user; the relay holds the real address
const INV_XLSX_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
let invMsg = null;   // { kind: "ok"|"warn"|"info", text, undoId? }

function invCanUse() {
  const t = (typeof getTechName === "function" ? getTechName() : "").trim().toLowerCase();
  return INV_USERS.includes(t);
}
function syncInventoryTile() {
  document.getElementById("tileInventory")?.classList.toggle("hidden", !invCanUse());
}

// ---------- storage ----------
function invLoad() {
  try {
    const d = JSON.parse(localStorage.getItem(INV_KEY) || "null");
    if (d && Array.isArray(d.items)) return d;
  } catch (e) {}
  return { started: Date.now(), items: [] };
}
function invSave(d) {
  try { localStorage.setItem(INV_KEY, JSON.stringify(d)); return true; } catch (e) { return false; }
}
const invNormModel = (m) => String(m || "").toUpperCase().replace(/\s+/g, "").trim();
const invNormSerial = (s) => String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
const invWhen = (ts) => new Date(ts).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

// Brand / equipment straight from the model patterns - no telemetry side effects.
function invIdentify(model) {
  if (typeof MODEL_PATTERNS === "undefined") return { brand: "", equip: "" };
  const p = MODEL_PATTERNS.find(x => x.re.test(model));
  return p ? { brand: p.brand || "", equip: p.equipment || "" } : { brand: "", equip: "" };
}

// Add one unit. Returns { ok, id } or { ok:false, reason, dup? }.
function invAdd(model, serial, source, part) {
  const m = invNormModel(model);
  const s = String(serial || "").toUpperCase().trim();
  if (!m) return { ok: false, reason: "nomodel" };
  const d = invLoad();
  const ns = invNormSerial(s);
  if (ns) {
    const dup = d.items.find(it => invNormSerial(it.serial) === ns);
    if (dup) return { ok: false, reason: "dup", dup };
  }
  const id = "inv" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  const who = invIdentify(m);
  d.items.push({ id, model: m, serial: s, part: String(part || "").toUpperCase(), brand: who.brand, equip: who.equip, ts: Date.now(), src: source || "scan" });
  if (!invSave(d)) return { ok: false, reason: "storage" };
  trackEvent("inventory: added " + m + (s ? " / " + s : " (no serial)"));
  return { ok: true, id };
}
function invRemove(id) {
  const d = invLoad();
  d.items = d.items.filter(it => it.id !== id);
  invSave(d);
}
function invGroups(items) {
  const map = new Map();
  for (const it of items) {
    if (!map.has(it.model)) map.set(it.model, { model: it.model, brand: it.brand, equip: it.equip, part: "", items: [] });
    const g = map.get(it.model); g.items.push(it); if (!g.part && it.part) g.part = it.part;
  }
  return [...map.values()].sort((a, b) => b.items.length - a.items.length || a.model.localeCompare(b.model));
}
function invResultText(r, model, serial) {
  if (r.ok) return { kind: "ok", text: "Counted " + invNormModel(model) + (serial ? " · SN " + String(serial).toUpperCase() : " - no serial read, can't check for a repeat"), undoId: r.id };
  if (r.reason === "dup") return { kind: "warn", text: "Already counted - SN " + r.dup.serial + " (" + r.dup.model + ") was scanned " + invWhen(r.dup.ts) + ". Not counted again." };
  if (r.reason === "storage") return { kind: "warn", text: "This phone's storage is full - that one was not saved." };
  return { kind: "warn", text: "No model number read" + (serial ? " (serial " + serial + ")" : "") + " - retake it, or type it in." };
}

// ---------- main screen ----------
function renderInventory() {
  const body = document.getElementById("inventoryBody");
  if (!body) return;
  if (!invCanUse()) { body.innerHTML = `<div class="empty-state">Inventory is only on Andy's and Kenny's phones.</div>`; return; }
  const d = invLoad();
  const groups = invGroups(d.items);
  const msg = invMsg ? `<div class="inv-msg ${invMsg.kind}">${escapeHtml(invMsg.text)}${invMsg.undoId ? ` <button type="button" class="gcl-link" id="invUndo">Undo</button>` : ""}</div>` : "";
  body.innerHTML = `
    <div class="inv-top">
      <button type="button" class="gwz-entry inv-scan" id="invStartCam">
        <span class="gwz-entry-icon" aria-hidden="true">📷</span>
        <span class="gwz-entry-text"><b>Scan Tags</b><span>Camera stays on - tap Capture on each tag, End when done</span></span>
        <span class="gwz-entry-go" aria-hidden="true">›</span>
      </button>
      ${msg}
      ${(d.fix || []).length ? `<div class="inv-fixes"><div class="inv-manual-h">Needs fixing (${d.fix.length}) - only part of the tag was read</div>${invFixHtml(d.fix)}</div>` : ""}
      <div class="inv-manual">
        <div class="inv-manual-h">Can't scan it? Type it in</div>
        <div class="inv-manual-row">
          <input id="invModel" class="search-input" type="text" placeholder="Model" autocomplete="off" autocapitalize="characters" spellcheck="false">
          <input id="invSerial" class="search-input" type="text" placeholder="Serial" autocomplete="off" autocapitalize="characters" spellcheck="false">
          <button type="button" id="invAddBtn" class="inv-add-btn">Add</button>
        </div>
      </div>
    </div>
    <div class="inv-sum">
      <div><b>${d.items.length}</b> unit${d.items.length === 1 ? "" : "s"} · <b>${groups.length}</b> model${groups.length === 1 ? "" : "s"}</div>
      <div class="inv-sum-sub">Count started ${escapeHtml(invWhen(d.started))}</div>
    </div>
    <div class="inv-list">
      ${groups.length ? groups.map(g => `
        <details class="inv-grp">
          <summary><span class="inv-count">${g.items.length}</span><span class="inv-model"><b>${escapeHtml(g.model)}</b>${g.part || g.brand || g.equip ? `<span>${escapeHtml([g.part ? "Part " + g.part : "", g.brand, g.equip].filter(Boolean).join(" · "))}</span>` : ""}</span></summary>
          <ul>${g.items.map(it => `<li><span>${it.serial ? "SN " + escapeHtml(it.serial) : "<i>no serial</i>"}<em>${escapeHtml(invWhen(it.ts))}${it.src === "typed" ? " · typed" : it.src === "fixed" ? " · fixed by hand" : ""}</em></span><button type="button" class="inv-del" data-inv-del="${it.id}" aria-label="Remove this one">✕</button></li>`).join("")}</ul>
        </details>`).join("") : `<div class="empty-state">Nothing counted yet. Tap Scan Tags.</div>`}
    </div>
    <div class="inv-actions">
      <button type="button" id="invEmail" class="gcl-finish"${d.items.length ? "" : " disabled"}>Email Excel count to ${escapeHtml(INV_EMAIL_TO)}</button>
      <div id="invSendResult"></div>
      <button type="button" id="invNew" class="gcl-link gcl-discard">Start a new count</button>
    </div>`;
  invWire(body);
}

function invWire(body) {
  body.querySelector("#invStartCam").onclick = () => invOpenCamera();
  invWireFixes(body, renderInventory);
  const add = body.querySelector("#invAddBtn");
  if (add) add.onclick = () => {
    const m = body.querySelector("#invModel").value, s = body.querySelector("#invSerial").value.trim();
    invMsg = invResultText(invAdd(m, s, "typed"), m, s);
    renderInventory();
  };
  ["#invModel", "#invSerial"].forEach(sel => {
    const el = body.querySelector(sel);
    if (el) el.addEventListener("input", () => { const p = el.selectionStart; el.value = el.value.toUpperCase(); try { el.setSelectionRange(p, p); } catch (e) {} });
  });
  const undo = body.querySelector("#invUndo");
  if (undo) undo.onclick = () => { invRemove(invMsg.undoId); invMsg = { kind: "info", text: "Removed." }; renderInventory(); };
  body.querySelectorAll("[data-inv-del]").forEach(b => {
    b.onclick = (e) => {
      e.preventDefault();
      if (!confirm("Remove this one from the count?")) return;
      const open = [...body.querySelectorAll("details.inv-grp[open] summary b")].map(x => x.textContent);
      invRemove(b.dataset.invDel); invMsg = null; renderInventory();
      document.querySelectorAll("#inventoryBody details.inv-grp").forEach(dt => { if (open.includes(dt.querySelector("summary b").textContent)) dt.open = true; });
    };
  });
  body.querySelector("#invEmail").onclick = () => invSendEmail();
  body.querySelector("#invNew").onclick = () => {
    const d = invLoad();
    if (d.items.length && !confirm("Start a new count? The " + d.items.length + " unit(s) counted on this phone will be cleared. Email it first if you need it.")) return;
    invSave({ started: Date.now(), items: [], fix: [] });
    invMsg = null;
    trackEvent("inventory: started a new count");
    renderInventory();
  };
}

// ---------- live camera: Capture, keep going, End ----------
let invCam = null;   // { stream, video, queue, pending, overlay }

async function invOpenCamera() {
  if (invCam) return;
  const ov = document.createElement("div");
  ov.className = "inv-cam";
  ov.innerHTML = `
    <div class="inv-cam-view"><video playsinline muted autoplay></video><div class="inv-cam-frame" aria-hidden="true"></div></div>
    <div class="inv-cam-info">
      <div class="inv-cam-count" id="invCamCount"></div>
      <div class="inv-cam-fixes" id="invCamFix"></div>
      <div class="inv-cam-feed" id="invCamFeed"><div class="inv-cam-line info">Point at the tag's MODEL and SERIAL lines, then tap Capture.</div></div>
    </div>
    <div class="inv-cam-btns">
      <button type="button" class="inv-cam-capture" id="invCapture">📷 Capture</button>
      <button type="button" class="inv-cam-end" id="invEnd">End</button>
    </div>`;
  document.body.appendChild(ov);
  document.body.classList.add("inv-cam-open");
  invCam = { stream: null, video: ov.querySelector("video"), queue: Promise.resolve(), pending: 0, overlay: ov };
  ov.querySelector("#invEnd").onclick = () => invCloseCamera();
  ov.querySelector("#invCapture").onclick = () => invCapture();
  invCamCount();
  invRenderFixes();
  trackEvent("inventory: opened camera");
  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error("This browser can't open the camera here");
    invCam.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
    if (!invCam) { invCam = null; return; }
    invCam.video.srcObject = invCam.stream;
    await invCam.video.play().catch(() => {});
  } catch (err) {
    const blocked = err && (err.name === "NotAllowedError" || err.name === "SecurityError");
    invCamLine("warn", blocked ? "Camera is blocked - allow camera access for this site, then tap Scan Tags again." : "Couldn't open the camera: " + (err && err.message ? err.message : err));
    const cap = ov.querySelector("#invCapture"); if (cap) cap.disabled = true;
  }
}
function invCloseCamera() {
  if (!invCam) return;
  const cam = invCam;
  invCam = null;
  try { cam.stream && cam.stream.getTracks().forEach(t => t.stop()); } catch (e) {}
  cam.overlay.remove();
  document.body.classList.remove("inv-cam-open");
  if (cam.pending) invMsg = { kind: "info", text: cam.pending + " tag(s) still being read - they'll be counted in a moment." };
  if (typeof currentScreen !== "undefined" && currentScreen === "inventory") renderInventory();
}
function invCamLine(kind, text, undoId) {
  const feed = document.getElementById("invCamFeed");
  if (!feed) return;
  const div = document.createElement("div");
  div.className = "inv-cam-line " + kind;
  div.textContent = text;
  if (undoId) {
    const u = document.createElement("button");
    u.type = "button"; u.className = "gcl-link"; u.textContent = "Undo";
    u.onclick = () => { invRemove(undoId); div.textContent = "Removed."; div.className = "inv-cam-line info"; invCamCount(); };
    div.append(" ", u);
  }
  feed.prepend(div);
  while (feed.children.length > 6) feed.lastChild.remove();
}
function invCamCount() {
  const el = document.getElementById("invCamCount");
  if (!el) return;
  const d = invLoad();
  el.textContent = d.items.length + " counted · " + invGroups(d.items).length + " models" + (invCam && invCam.pending ? " · reading " + invCam.pending + "…" : "");
}
// Capture: a real still photo (full resolution, autofocus) where the phone
// supports ImageCapture (Chrome on Android); otherwise the current video frame.
async function invGrab(cam) {
  const track = cam.stream && cam.stream.getVideoTracks()[0];
  if (track && typeof ImageCapture !== "undefined") {
    // Some cameras never answer takePhoto - give it 5 s, then use the frame.
    try {
      const photo = await Promise.race([new ImageCapture(track).takePhoto(), new Promise(res => setTimeout(() => res(null), 5000))]);
      if (photo && photo.size) return photo;
    } catch (e) {}
  }
  const v = cam.video, c = document.createElement("canvas");
  c.width = v.videoWidth; c.height = v.videoHeight;
  c.getContext("2d").drawImage(v, 0, 0, c.width, c.height);
  return await new Promise(res => c.toBlob(res, "image/jpeg", 0.92));
}
function invCapture() {
  const cam = invCam;
  if (!cam || !cam.video.videoWidth) return;
  const flash = cam.overlay.querySelector(".inv-cam-view");
  flash.classList.remove("flash"); void flash.offsetWidth; flash.classList.add("flash");
  cam.pending++;
  invCamCount();
  // Read one tag at a time in order; the camera stays live for the next one.
  const shot = invGrab(cam);
  cam.queue = cam.queue.then(async () => {
    let blob = null;
    try { blob = await shot; } catch (e) {}
    return invReadBlob(blob, cam);
  });
}

// ---------- reading a label ----------
// Andy 2026-10-02: warehouse cartons are not data plates - the Lennox carton
// label has no "MODEL"/"SERIAL" words. Its small center box prints the model
// on the dark top line and the serial on the lighter line under the little
// barcode; the 9-digit number near the bottom is a lot number, not the serial.
// The plain tag reader missed or mixed these up, so inventory first reads the
// whole label in greyscale (page + sparse modes) and parses it with carton
// rules, then falls back to the tag reader for nameplates.
async function invReadLabel(blob) {
  const worker = await getTessWorker(() => {});
  const bmp = await createImageBitmap(blob);
  const sc = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * sc); c.height = Math.round(bmp.height * sc);
  const g = c.getContext("2d");
  g.drawImage(bmp, 0, 0, c.width, c.height);
  const img = g.getImageData(0, 0, c.width, c.height), px = img.data;
  for (let i = 0; i < px.length; i += 4) { const y = 0.3 * px[i] + 0.59 * px[i + 1] + 0.11 * px[i + 2]; px[i] = px[i + 1] = px[i + 2] = y; }
  g.putImageData(img, 0, 0);
  const lines = [];
  try {
    for (const psm of ["3", "11"]) {
      await worker.setParameters({ tessedit_pageseg_mode: psm });
      const { data } = await worker.recognize(c);
      // Each line with Tesseract's own confidence, so a clean read outvotes a
      // smudged look-alike (LC23/37Y9BG at 74 vs LC23/37v98G).
      if (Array.isArray(data.lines) && data.lines.length) data.lines.forEach(l => lines.push({ text: l.text, conf: l.confidence }));
      else lines.push(...String(data.text || "").split("\n"));
    }
  } finally {
    try { await worker.setParameters({ tessedit_pageseg_mode: "6" }); } catch (e) {}
  }
  return { lines, ...invParseLabel(lines) };
}

// Pure text parser - kept separate so it can be tested on saved OCR output.
const INV_SER_FIX = { "0": "D", "8": "B", "6": "G", "4": "A", "5": "S", "2": "Z", "1": "I" };
function invParseLabel(lines) {
  // Lines are strings or { text, conf }; a read's weight is its confidence.
  const items = (lines || []).map(l => typeof l === "string" ? { text: l, conf: 60 } : { text: String(l.text || ""), conf: Number(l.conf) || 0 })
    .map(l => ({ t: l.text.toUpperCase().replace(/[‒-―−]/g, "-").trim(), w: Math.max(1, l.conf) })).filter(l => l.t);
  // Serial: Lennox-style 4 digits + letter + 5 digits (7122F47534). The
  // letter is often read as a digit (D -> 0), and the barcode caption adds an
  // "S" prefix (S6026D01744, read as 8...). Votes across both passes, plus
  // partial reads that start or end the same way.
  const votes = new Map(), parts = [];
  for (const { t: l, w } of items) {
    for (let tok of l.replace(/[^A-Z0-9 ]/g, " ").split(/\s+/)) {
      if (/^[S85]\d{4}[A-Z0-9]\d{5}$/.test(tok)) tok = tok.slice(1);
      if (/^\d{4}[A-Z0-9]\d{5}$/.test(tok)) {
        if (/\d/.test(tok[4])) tok = tok.slice(0, 4) + (INV_SER_FIX[tok[4]] || tok[4]) + tok.slice(5);
        if (/^\d{4}[A-Z]\d{5}$/.test(tok) && !/^00/.test(tok)) votes.set(tok, (votes.get(tok) || 0) + w);
      } else if (/^[0-9A-Z]{5,9}$/.test(tok) && /\d/.test(tok)) parts.push(tok);
    }
  }
  let serial = "", best = -1;
  for (const [t, n] of votes) {
    const score = n * 2 + 60 * parts.filter(p => p.length >= 5 && (t.startsWith(p) || t.endsWith(p))).length;
    if (score > best) { best = score; serial = t; }
  }
  // Model: a letter-led model with a slash (LC23/37Y9BG, CRX35-30/36B-6F-1).
  // It is printed twice on the label, so repeats win.
  const mv = new Map();
  for (const { t: l, w } of items) {
    const t = l.replace(/\s*-\s*/g, "-").replace(/\s*\/\s*/g, "/");
    for (const m of t.matchAll(/(?:^|[^A-Z0-9])([A-Z]{1,5}\d{2,3}[A-Z]?(?:-\d{1,3})?\/\d{2,3}[A-Z0-9]*(?:-[A-Z0-9]{1,4})*)(?=$|[^A-Z0-9\/-])/g)) {
      const mod = m[1].replace(/-+$/, "");
      if (mod.length >= 6) mv.set(mod, (mv.get(mod) || 0) + w);
    }
  }
  let model = "", mbest = 0;
  for (const [t, n] of mv) if (n > mbest || (n === mbest && t.length > model.length)) { mbest = n; model = t; }
  // Part number: Lennox catalog number (22C62, 29A51) - printed three times
  // on the carton; the most-seen read wins.
  const pv = new Map();
  for (const { t: l } of items) for (const tok of l.replace(/[^A-Z0-9 ]/g, " ").split(/\s+/)) if (/^\d{2}[A-Z]\d{2}$/.test(tok)) pv.set(tok, (pv.get(tok) || 0) + 1);
  let part = "", pbest = 0;
  for (const [t, n] of pv) if (n > pbest) { pbest = n; part = t; }
  return { model, serial, part };
}

// Read one capture: carton rules first, the tag reader fills any gap.
// Andy 2026-10-02: the carton has separate barcodes for serial and model in
// different orientations (serial runs up the left side). Barcode data carries
// an identifier - "S" = serial, "1P" = part number - so where the phone can
// read barcodes (Chrome on Android) they settle which number is which. OCR of
// the picture stays the main reader.
async function invReadBarcodes(blob) {
  const out = { serial: "", part: "", model: "" };
  if (typeof BarcodeDetector === "undefined") return out;
  try {
    const bmp = await createImageBitmap(blob);
    const codes = await new BarcodeDetector().detect(bmp);
    for (const c of codes || []) {
      const v = String(c.rawValue || "").toUpperCase().replace(/\s+/g, "");
      if (/^S\d{4}[A-Z]\d{5}$/.test(v)) out.serial = v.slice(1);
      else if (/^1P[A-Z0-9]{3,12}$/.test(v)) out.part = v.slice(2);
      else if (!out.model && /^[A-Z]{1,5}\d{2,3}[A-Z]?(?:-\d{1,3})?\/\d{2,3}[A-Z0-9-]*$/.test(v)) out.model = v;
    }
  } catch (e) {}
  return out;
}
async function invReadFields(blob) {
  let model = "", serial = "", part = "", how = "";
  const bc = await invReadBarcodes(blob);
  try { const r = await invReadLabel(blob); model = r.model; serial = r.serial; part = r.part || ""; how = "carton"; } catch (e) {}
  if (bc.serial) { serial = bc.serial; how += "+barcode"; }
  if (bc.model && !model) model = bc.model;
  if (bc.part) part = bc.part;
  if (!model || !serial) {
    try {
      const f = await ocrTagFields(blob, () => {});
      // A bare digit run (serialSource "digits") is often a lot / order
      // number on a carton - only trust a serial read off its own label.
      const fSerial = f && f.serial && f.serialSource !== "digits" ? String(f.serial).trim() : "";
      if (!model && f && f.model) { model = String(f.model).trim(); how = how ? how + "+tag" : "tag"; }
      if (!serial && fSerial) { serial = fSerial; how = how ? how + "+tag" : "tag"; }
    } catch (e) {}
  }
  return { model: invNormModel(model), serial: String(serial || "").toUpperCase().trim(), part, how };
}

async function invReadBlob(blob, cam) {
  let line;
  if (!blob) {
    line = { kind: "warn", text: "The camera didn't give a picture - tap Capture again." };
  } else {
    const r = await invReadFields(blob);
    if (r.model && r.serial) {
      line = invResultText(invAdd(r.model, r.serial, "scan", r.part), r.model, r.serial);
    } else {
      // Andy 2026-10-02: a half read is never counted silently - it waits for
      // a fix, and its photo goes to the failed-tag folder for the triage.
      const kind = !r.model && !r.serial ? "inventory-unreadable" : !r.serial ? "inventory-no-serial" : "inventory-no-model";
      const photoId = typeof newScanPhotoId === "function" ? newScanPhotoId() : "";
      trackEvent("INVENTORY SCAN - " + (kind === "inventory-unreadable" ? "NOTHING READ" : kind === "inventory-no-serial" ? "NO SERIAL | model: " + r.model : "NO MODEL | serial: " + r.serial) + (photoId ? " | photo: " + photoId : ""));
      if (typeof saveFailedScan === "function") saveFailedScan(blob, { id: photoId, kind, read: [r.model ? "model " + r.model : "", r.serial ? "serial " + r.serial : ""].filter(Boolean).join(", ") }).catch(() => {});
      invAddFix({ model: r.model, serial: r.serial, part: r.part, photoId });
      line = { kind: "warn", text: !r.model && !r.serial ? "Couldn't read that tag - fix it above, or retake." : "Got the " + (r.model ? "model (" + r.model + ")" : "serial (" + r.serial + ")") + " but not the " + (r.model ? "serial" : "model") + " - fill it in above." };
    }
  }
  cam.pending = Math.max(0, cam.pending - 1);
  if (invCam === cam) { invCamLine(line.kind, line.text, line.undoId); invCamCount(); invRenderFixes(); }
  else { invMsg = line; if (typeof currentScreen !== "undefined" && currentScreen === "inventory") renderInventory(); }
}

// ---------- half reads waiting for a fix ----------
function invAddFix(f) {
  const d = invLoad();
  d.fix = d.fix || [];
  d.fix.unshift({ id: "fix" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), model: f.model || "", serial: f.serial || "", part: f.part || "", photoId: f.photoId || "", ts: Date.now() });
  invSave(d);
}
function invFixHtml(fix) {
  return fix.map(f => `
    <div class="inv-fix" data-inv-fix="${f.id}">
      <div class="inv-fix-h">Needs ${!f.model && !f.serial ? "model and serial" : !f.serial ? "the serial" : "the model"} · ${escapeHtml(invWhen(f.ts))}</div>
      <div class="inv-manual-row">
        <input class="search-input" data-fix-model type="text" placeholder="Model" value="${escapeHtml(f.model)}" autocomplete="off" autocapitalize="characters" spellcheck="false">
        <input class="search-input" data-fix-serial type="text" placeholder="Serial" value="${escapeHtml(f.serial)}" autocomplete="off" autocapitalize="characters" spellcheck="false">
        <button type="button" class="inv-add-btn" data-fix-ok>Count</button>
      </div>
      <button type="button" class="gcl-link" data-fix-skip>Skip - retake it instead</button>
    </div>`).join("");
}
function invWireFixes(root, after) {
  root.querySelectorAll("[data-inv-fix]").forEach(card => {
    const id = card.dataset.invFix;
    card.querySelectorAll("input").forEach(el => el.addEventListener("input", () => { const p = el.selectionStart; el.value = el.value.toUpperCase(); try { el.setSelectionRange(p, p); } catch (e) {} }));
    const drop = () => { const d = invLoad(); d.fix = (d.fix || []).filter(x => x.id !== id); invSave(d); };
    card.querySelector("[data-fix-ok]").onclick = () => {
      const m = card.querySelector("[data-fix-model]").value, sr = card.querySelector("[data-fix-serial]").value.trim();
      const fx = (invLoad().fix || []).find(x => x.id === id) || {};
      const r = invAdd(m, sr, "fixed", fx.part);
      const t = invResultText(r, m, sr);
      if (r.ok || r.reason === "dup") drop();
      if (invCam) { invCamLine(t.kind, t.text, t.undoId); invCamCount(); } else invMsg = t;
      after();
    };
    card.querySelector("[data-fix-skip]").onclick = () => { drop(); after(); };
  });
}
function invRenderFixes() {
  const box = document.getElementById("invCamFix");
  if (!box) return;
  const fix = invLoad().fix || [];
  box.innerHTML = invFixHtml(fix);
  invWireFixes(box, invRenderFixes);
}

// ---------- Excel (.xlsx), built here with no library ----------
// An .xlsx is a zip of a few XML files; this writes it uncompressed
// ("stored"), which Excel, Google Sheets and phone viewers all open.
const INV_CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
function invCrc32(bytes) { let c = 0xFFFFFFFF; for (let i = 0; i < bytes.length; i++) c = INV_CRC[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function invZip(files) {   // files: [{ name, text }]
  const enc = new TextEncoder(), parts = [], central = [];
  const u16 = (n) => [n & 255, (n >>> 8) & 255], u32 = (n) => [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255];
  let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name), data = enc.encode(f.text), crc = invCrc32(data);
    const local = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0)]);
    parts.push(local, name, data);
    central.push(new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0x21), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(name.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset)]), name);
    offset += local.length + name.length + data.length;
  }
  const cdSize = central.reduce((n, p) => n + p.length, 0);
  const end = new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length), ...u32(cdSize), ...u32(offset), ...u16(0)]);
  const all = [...parts, ...central, end], out = new Uint8Array(all.reduce((n, p) => n + p.length, 0));
  let p = 0; for (const x of all) { out.set(x, p); p += x.length; }
  return out;
}
const invX = (s) => String(s == null ? "" : s).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const invCol = (i) => { let s = ""; i++; while (i) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };
// A cell is a string, a number, or { v, f, s } (f = formula; s = style:
// 1 bold, 2 currency, 3 bold currency).
function invSheetXml(rows, widths) {
  const cell = (c, ref) => {
    const o = (c && typeof c === "object") ? c : { v: c };
    const s = o.s ? ` s="${o.s}"` : "";
    if (o.f) return `<c r="${ref}"${s}><f>${invX(o.f)}</f></c>`;
    if (typeof o.v === "number") return `<c r="${ref}"${s}><v>${o.v}</v></c>`;
    if (o.v == null || o.v === "") return s ? `<c r="${ref}"${s}/>` : "";
    return `<c r="${ref}" t="inlineStr"${s}><is><t xml:space="preserve">${invX(o.v)}</t></is></c>`;
  };
  const cols = `<cols>${widths.map((w, i) => `<col min="${i + 1}" max="${i + 1}" width="${w}" customWidth="1"/>`).join("")}</cols>`;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>${cols}<sheetData>${rows.map((r, ri) => `<row r="${ri + 1}">${r.map((c, ci) => cell(c, invCol(ci) + (ri + 1))).join("")}</row>`).join("")}</sheetData></worksheet>`;
}
function invXlsx(d) {
  const groups = invGroups(d.items);
  const B = (v) => ({ v, s: 1 });
  // Andy 2026-10-02: Unit Price stays blank until he has prices per model;
  // Total Value fills itself in from Count x Unit Price.
  const totals = [[B("Model"), B("Part #"), B("Brand"), B("Equipment"), B("Count"), B("Unit Price"), B("Total Value")]];
  groups.forEach((g, i) => { const r = i + 2; totals.push([g.model, g.part, g.brand, g.equip, g.items.length, { v: "", s: 2 }, { f: `IF(F${r}="","",E${r}*F${r})`, s: 2 }]); });
  const last = groups.length + 1;
  totals.push([B("TOTAL"), "", "", "", { f: `SUM(E2:E${last})`, s: 1 }, "", { f: `IF(COUNT(G2:G${last})=0,"",SUM(G2:G${last}))`, s: 3 }]);
  const units = [[B("Model"), B("Serial"), B("Part #"), B("Brand"), B("Equipment"), B("Scanned"), B("How")]];
  d.items.forEach(it => units.push([it.model, it.serial, it.part || "", it.brand, it.equip, new Date(it.ts).toLocaleString(), it.src === "typed" ? "typed" : it.src === "fixed" ? "fixed by hand" : "scanned"]));
  const ns = 'xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"', nr = 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  const rels = 'xmlns="http://schemas.openxmlformats.org/package/2006/relationships"';
  const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/";
  const CT = "application/vnd.openxmlformats-officedocument.spreadsheetml.";
  return invZip([
    { name: "[Content_Types].xml", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="${CT}sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="${CT}worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="${CT}worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="${CT}styles+xml"/></Types>` },
    { name: "_rels/.rels", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships ${rels}><Relationship Id="rId1" Type="${R}officeDocument" Target="xl/workbook.xml"/></Relationships>` },
    { name: "xl/workbook.xml", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook ${ns} ${nr}><sheets><sheet name="Totals by model" sheetId="1" r:id="rId1"/><sheet name="Every unit" sheetId="2" r:id="rId2"/></sheets><calcPr fullCalcOnLoad="1"/></workbook>` },
    { name: "xl/_rels/workbook.xml.rels", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships ${rels}><Relationship Id="rId1" Type="${R}worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="${R}worksheet" Target="worksheets/sheet2.xml"/><Relationship Id="rId3" Type="${R}styles" Target="styles.xml"/></Relationships>` },
    { name: "xl/styles.xml", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet ${ns}><numFmts count="1"><numFmt numFmtId="164" formatCode="&quot;$&quot;#,##0.00"/></numFmts><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="1" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>` },
    { name: "xl/worksheets/sheet1.xml", text: invSheetXml(totals, [22, 10, 14, 22, 8, 12, 14]) },
    { name: "xl/worksheets/sheet2.xml", text: invSheetXml(units, [22, 20, 10, 14, 22, 20, 12]) },
  ]);
}
// Email body: price slots left open for Andy to fill in later.
function invSummaryText(d) {
  return invGroups(d.items).map(g => g.items.length + " x " + g.model + (g.part ? " [part " + g.part + "]" : "") + (g.brand ? " (" + g.brand + (g.equip ? " " + g.equip : "") + ")" : "") + "   Unit price: $______   Total: $______").join("\n");
}

// ---------- email ----------
async function invSendEmail() {
  const d = invLoad();
  if (!d.items.length) return;
  const out = document.getElementById("invSendResult");
  const btn = document.getElementById("invEmail");
  const label = "Email Excel count to " + INV_EMAIL_TO;
  const show = (cls, html) => { if (out) out.innerHTML = `<div class="inv-msg ${cls}">${html}</div>`; };
  const xlsx = invXlsx(d);
  const date = (typeof genClToday === "function") ? genClToday() : new Date().toISOString().slice(0, 10);
  const fileName = "Brackett-inventory-" + date + ".xlsx";
  if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
  try {
    if (!navigator.onLine) throw new Error("offline");
    let b64 = "";
    for (let i = 0; i < xlsx.length; i += 8192) b64 += String.fromCharCode.apply(null, xlsx.subarray(i, i + 8192));
    const payload = {
      kind: "inventory",
      xlsxBase64: btoa(b64),
      fileName,
      tech: getTechName() || "",
      units: d.items.length,
      models: invGroups(d.items).length,
      summary: invSummaryText(d).slice(0, 8000),
      date,
      appVersion: typeof APP_VERSION !== "undefined" ? APP_VERSION : "",
    };
    const resp = await fetch(GEN_CHECKLIST_RELAY, { method: "POST", body: JSON.stringify(payload) });
    const j = await resp.json();
    if (!j || !j.ok) throw new Error((j && j.error) || "relay error");
    trackEvent("inventory: emailed " + d.items.length + " units");
    show("ok", "Sent to " + escapeHtml(INV_EMAIL_TO) + " - " + d.items.length + " units, " + invGroups(d.items).length + " models. The count stays on this phone until you start a new one.");
  } catch (err) {
    // No signal or the relay refused it: hand the Excel file to the phone's
    // share sheet (Gmail etc.) instead, so the count still gets out.
    const why = String(err && err.message || err) === "offline" ? "No signal" : "The email relay didn't take it (" + escapeHtml(String(err && err.message || err)) + ")";
    let shared = false;
    try {
      const file = new File([xlsx], fileName, { type: INV_XLSX_TYPE });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "Brackett inventory count", text: "Inventory count " + date + " - send to " + INV_EMAIL_TO });
        shared = true;
      }
    } catch (e) {}
    if (!shared) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([xlsx], { type: INV_XLSX_TYPE }));
      a.download = fileName; document.body.appendChild(a); a.click(); a.remove();
    }
    show("warn", why + " - " + (shared ? "sent it to your share sheet instead; pick Gmail and send it to " : "saved the Excel file to this phone instead; email it to ") + escapeHtml(INV_EMAIL_TO) + ".");
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = label; }
  }
}

syncInventoryTile();
