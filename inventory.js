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

// Model memory (Andy 2026-10-02). Lennox carton barcodes carry the serial and
// the catalog/part number (1P23K61) but not the model, and the Daikin heat-pump
// caption carries a 6-digit product code before the serial (364451E000585C).
// Once one unit of a part/code has its model - read or typed in a fix - every
// later carton with that code gets the model without typing. Kept apart from
// the count, so "Start a new count" doesn't forget it. Seeded with the pairs
// Andy's first test confirmed on the label.
const INV_MODELS_KEY = "bfc-inventory-models";
const INV_MODEL_SEED = {
  P23K61: "EL22XPV-024-230A01", P25U62: "ML17KC2-024-230A02", P19A47: "SLP99DF090XV60C-02", P24X66: "EL297DF070XE48B",
  P24X49: "EL297UH045XV368", P25K43: "SL22KLV-036-230A01", P19U28: "SL25XPV-060-230A02", P16T33: "CBA38MV-048-230-6-03",
  P29G21: "LC23/37Y9BG", P16F32: "C35-30B-2-1",
  D364451: "DH9VSA361C", D500163: "DH9VSA4810", D500170: "DH9VSA6010",
};
function invModelMap() {
  let m = {};
  try { m = JSON.parse(localStorage.getItem(INV_MODELS_KEY) || "{}") || {}; } catch (e) {}
  return { ...INV_MODEL_SEED, ...m };
}
function invLearnModel(key, model) {
  if (!key || !model) return;
  try {
    const m = JSON.parse(localStorage.getItem(INV_MODELS_KEY) || "{}") || {};
    if (m[key] === model) return;
    m[key] = model;
    localStorage.setItem(INV_MODELS_KEY, JSON.stringify(m));
  } catch (e) {}
}

// Add one unit. Returns { ok, id } or { ok:false, reason, dup? }.
function invAdd(model, serial, source, part, key) {
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
  invLearnModel(key || (part ? "P" + String(part).toUpperCase() : ""), m);
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
      ${(d.fix || []).length ? `<div class="inv-fixes"><div class="inv-manual-h">Check or fix (${d.fix.length}) - not counted yet</div>${invFixHtml(d.fix)}</div>` : ""}
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
// Andy 2026-10-02 (60-photo test, Lennox/Daikin/Amana/Carrier cartons): the
// label is often a small white patch in a wide shot, and shrinking the whole
// photo made its text too small to read. So the reader first finds the white
// label(s) on the brown carton and reads each one cropped at full resolution,
// and only falls back to the whole photo when no label reads.
function invFindLabels(bmp) {
  const W = 320, sc = W / bmp.width, H = Math.max(1, Math.round(bmp.height * sc));
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d"); g.drawImage(bmp, 0, 0, W, H);
  const px = g.getImageData(0, 0, W, H).data, n = W * H;
  // Label stock: bright and grey/white (cardboard is bright but brown).
  let m = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const r = px[i * 4], gg = px[i * 4 + 1], b = px[i * 4 + 2], mn = Math.min(r, gg, b), mx = Math.max(r, gg, b);
    m[i] = mn >= 140 && mx - mn <= 48 ? 1 : 0;
  }
  // Close the gaps that printed text and barcodes leave in the white.
  for (let pass = 0; pass < 2; pass++) {
    const d = new Uint8Array(n);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x;
      d[i] = m[i] || (x > 0 && m[i - 1]) || (x < W - 1 && m[i + 1]) || (y > 0 && m[i - W]) || (y < H - 1 && m[i + W]) ? 1 : 0;
    }
    m = d;
  }
  const seen = new Uint8Array(n), comps = [], st = [];
  for (let s = 0; s < n; s++) {
    if (!m[s] || seen[s]) continue;
    let x0 = W, y0 = H, x1 = 0, y1 = 0, area = 0;
    st.push(s); seen[s] = 1;
    while (st.length) {
      const i = st.pop(), x = i % W, y = (i / W) | 0;
      area++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) if (j >= 0 && m[j] && !seen[j]) { seen[j] = 1; st.push(j); }
    }
    const bw = x1 - x0 + 1, bh = y1 - y0 + 1, fill = area / (bw * bh);
    // A label: a solid-ish rectangle, not a speck and not the whole frame.
    if (area >= n * 0.006 && area <= n * 0.7 && fill >= 0.45 && bw >= 12 && bh >= 8) comps.push({ x0, y0, x1, y1, area });
  }
  comps.sort((a, b) => b.area - a.area);
  // Pad each box (the Lennox model sits on a blue/pink banner above the white)
  // and map it back to full-resolution pixels.
  return comps.slice(0, 2).map(k => {
    const bw = k.x1 - k.x0 + 1, bh = k.y1 - k.y0 + 1;
    const x = Math.max(0, k.x0 - bw * 0.06), y = Math.max(0, k.y0 - bh * 0.2);
    const x2 = Math.min(W, k.x1 + 1 + bw * 0.06), y2 = Math.min(H, k.y1 + 1 + bh * 0.2);
    return { x: x / sc, y: y / sc, w: (x2 - x) / sc, h: (y2 - y) / sc };
  });
}

// Greyscale canvas of one region, scaled so the text is a readable size.
function invRegionCanvas(bmp, r, target) {
  const sc = Math.min(3, target / Math.max(r.w, r.h), Math.sqrt(4e6 / (r.w * r.h)));
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(r.w * sc)); c.height = Math.max(1, Math.round(r.h * sc));
  const g = c.getContext("2d");
  g.imageSmoothingQuality = "high";
  g.drawImage(bmp, r.x, r.y, r.w, r.h, 0, 0, c.width, c.height);
  const img = g.getImageData(0, 0, c.width, c.height), px = img.data;
  for (let i = 0; i < px.length; i += 4) { const y = 0.3 * px[i] + 0.59 * px[i + 1] + 0.11 * px[i + 2]; px[i] = px[i + 1] = px[i + 2] = y; }
  g.putImageData(img, 0, 0);
  return c;
}

async function invOcrLines(worker, canvas, tag) {
  const lines = [];
  for (const psm of ["3", "11"]) {
    await worker.setParameters({ tessedit_pageseg_mode: psm });
    const { data } = await worker.recognize(canvas);
    // Each line with Tesseract's own confidence, so a clean read outvotes a
    // smudged look-alike (LC23/37Y9BG at 74 vs LC23/37v98G). "blk" groups the
    // lines of one pass so the parser knows which line sits under which.
    const blk = tag + psm;
    if (Array.isArray(data.lines) && data.lines.length) data.lines.forEach(l => lines.push({ text: l.text, conf: l.confidence, blk }));
    else String(data.text || "").split("\n").forEach(t => lines.push({ text: t, conf: 60, blk }));
  }
  return lines;
}

async function invReadLabel(blob, have) {
  have = have || {};
  const done = (r) => (r.model || have.model) && (r.serial || have.serial);
  const worker = await getTessWorker(() => {});
  const bmp = await createImageBitmap(blob);
  const lines = [];
  let r = { model: "", serial: "", part: "" };
  try {
    const labels = invFindLabels(bmp);
    for (let k = 0; k < labels.length; k++) {
      lines.push(...await invOcrLines(worker, invRegionCanvas(bmp, labels[k], 1800), "L" + k));
      r = invParseLabel(lines);
      if (done(r)) break;
    }
    if (!done(r)) {
      lines.push(...await invOcrLines(worker, invRegionCanvas(bmp, { x: 0, y: 0, w: bmp.width, h: bmp.height }, 2000), "F"));
      r = invParseLabel(lines);
    }
  } finally {
    try { await worker.setParameters({ tessedit_pageseg_mode: "6" }); } catch (e) {}
  }
  return { lines, ...r };
}

// Pure text parser - kept separate so it can be tested on saved OCR output.
const INV_SER_FIX = { "0": "D", "8": "B", "6": "G", "4": "A", "5": "S", "2": "Z", "1": "I" };
// Reads from Andy's 60-photo test (2026-10-02) set these rules:
//  - Lennox: model on the banner, often with dashes and no slash
//    (EL22XPV-024-230A01, SLP99DF090XV60C-02); serial 4 digits + letter +
//    5 digits (5823H01796).
//  - Daikin / Amana / Goodman furnaces and coils: a bare 10-digit serial that
//    starts with year + month (2605278803), printed twice, model under it.
//  - Daikin heat pumps: "SER. NO. / NO FABR. E000585" and the barcode caption
//    *364451E000585C* - the serial is the letter + 6 digits.
//  - Carrier tickets and side labels: "MODEL: 26RCAL", "SERIAL #: 34JYHHPH0951".
const INV_LABEL_SER = /\b(?:SERIAL|SER\s*\.?\s*NO|S\/N|NO\s*\.?\s*FABR)\b\.?\s*(?:#|NO\b\.?)?\s*:?/;
const INV_LABEL_MOD = /\bMODEL\b\.?\s*(?:#|NO\b\.?)?\s*:?/;
function invEdit1(a, b) {   // true when a and b differ by at most one character
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, d = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++d > 1) return false;
    if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; }
  }
  return d + (a.length - i) + (b.length - j) <= 1;
}
// Near-identical reads vote together; the best-read spelling stands for them.
function invPickVote(map) {
  const ks = [...map.keys()];
  let best = "", bestScore = 0;
  for (const k of ks) {
    const score = ks.filter(o => invEdit1(k, o)).reduce((s, o) => s + map.get(o), 0);
    const better = score > bestScore || (score === bestScore && (map.get(k) > map.get(best) || (map.get(k) === map.get(best) && k.length > best.length)));
    if (better) { best = k; bestScore = score; }
  }
  return best;
}
function invSerialForm(tok) {
  let t = tok.replace(/[^A-Z0-9]/g, "");
  // All ten digits with a real month in places 3-4 is Daikin/Goodman
  // (2602071568); a Lennox serial's places 3-4 are its year (5823H01796), so
  // the two can't be mixed up.
  if (/^(1[5-9]|2\d)(0[1-9]|1[0-2])\d{6}$/.test(t)) return t;
  if (/^[S85]\d{4}[A-Z0-9]\d{5}$/.test(t)) t = t.slice(1);
  if (/^\d{4}[A-Z0-9]\d{5}$/.test(t)) {
    if (/\d/.test(t[4])) t = t.slice(0, 4) + (INV_SER_FIX[t[4]] || t[4]) + t.slice(5);
    return /^\d{4}[A-Z]\d{5}$/.test(t) && !/^00/.test(t) ? t : "";           // Lennox
  }
  if (/^(1[5-9]|2\d)(0[1-9]|1[0-2])\d{6}$/.test(t)) return t;                    // Daikin / Amana / Goodman
  const cap = t.match(/^\d{6}([A-Z]\d{6})[A-Z0-9]$/);                            // Daikin barcode caption
  if (cap) return cap[1];
  return "";
}
function invModelForm(tok) {
  const t = tok.replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/g, "");
  if (/^[A-Z]\d{5,}[A-Z]?$/.test(t)) return "";   // a Daikin serial (E000585C), not a model
  if (/^[A-Z]{1,5}\d{2,3}[A-Z]?(?:-\d{1,3})?\/\d{2,3}[A-Z0-9]*(?:-[A-Z0-9]{1,4})*$/.test(t)) return t.length >= 6 ? t : "";   // LC23/37Y9BG
  if (/^[A-Z]{1,5}\d{2,3}[A-Z0-9]{0,10}(?:-[A-Z0-9]{1,6}){1,5}$/.test(t)) return t;                                          // EL22XPV-024-230A01
  if (/^[A-Z]{1,6}\d[A-Z0-9]{4,14}$/.test(t) && (t.match(/[A-Z]/g) || []).length >= 2 && (t.match(/\d/g) || []).length >= 2 && !/^(WO|REV|LB|LOT|PO)\d/.test(t)) return t;   // DM97MC1005CN
  return "";
}
function invParseLabel(lines) {
  // Lines are strings or { text, conf, blk }; a read's weight is its confidence.
  const items = (lines || []).map(l => typeof l === "string" ? { text: l, conf: 60, blk: "" } : { text: String(l.text || ""), conf: Number(l.conf) || 0, blk: l.blk || "" })
    .map(l => ({ t: l.text.toUpperCase().replace(/[‒-―−]/g, "-").replace(/[|]/g, " ").replace(/\s+/g, " ").trim(), w: Math.max(1, l.conf), blk: l.blk })).filter(l => l.t);
  const sv = new Map(), mv = new Map();
  const add = (map, k, w) => { if (k) map.set(k, (map.get(k) || 0) + w); };
  const serialish = (tok) => { const t = tok.replace(/[^A-Z0-9]/g, ""); return t.length >= 6 && t.length <= 16 && /\d{3}/.test(t) ? t : ""; };
  items.forEach((it, i) => {
    const { t: l, w } = it;
    // The value after a printed label, or the first thing on the next line
    // of the same read when the label sits on its own line.
    const after = (re) => {
      const m = l.match(re);
      if (!m) return null;
      const rest = l.slice(m.index + m[0].length).split(" ").filter(Boolean);
      const next = items[i + 1] && items[i + 1].blk === it.blk ? items[i + 1].t.split(" ") : [];
      return { rest, next };
    };
    const s = after(INV_LABEL_SER);
    if (s) {
      const v = s.rest.map(serialish).find(Boolean) || s.next.map(serialish).find(Boolean) || "";
      let sn = invSerialForm(v);
      if (!sn && /^[A-Z][0-9OQDIL]{6}$/.test(v)) sn = v[0] + v.slice(1).replace(/[OQD]/g, "0").replace(/[IL]/g, "1");   // E000585 read as EQ00585
      if (!sn && !invModelForm(v) && /\d{4}/.test(v)) sn = v;                                                        // Carrier 34JYHHPH0951
      add(sv, sn, w * 3);
    }
    const m = after(INV_LABEL_MOD);
    if (m) {
      const v = [...m.rest, ...m.next].map(x => x.replace(/^[^A-Z0-9]+|[^A-Z0-9]+$/g, "")).find(x => x.length >= 4 && /[A-Z]/.test(x) && /\d/.test(x)) || "";
      add(mv, v, w * 3);
    }
    const toks = l.split(" ");
    for (const tok of toks) add(sv, invSerialForm(tok), w);
    // A model alone on its line (the banner, or the line under the serial)
    // counts more than one that turns up inside a sentence.
    const joined = l.replace(/\s*-\s*/g, "-").replace(/\s*\/\s*/g, "/").split(" ");
    const lw = joined.length <= 2 ? w * 1.5 : w * 0.6;
    for (const tok of joined) add(mv, invModelForm(tok), lw);
  });
  const serial = invPickVote(sv);
  if (serial) for (const k of [...mv.keys()]) if (k === serial) mv.delete(k);
  const model = invPickVote(mv);
  // Part number: Lennox catalog number (22C62, 29A51) - printed three times
  // on the carton; the most-seen read wins.
  const pv = new Map();
  for (const { t: l } of items) for (const tok of l.replace(/[^A-Z0-9 ]/g, " ").split(/\s+/)) if (/^\d{2}[A-Z]\d{2}$/.test(tok)) pv.set(tok, (pv.get(tok) || 0) + 1);
  let part = "", pbest = 0;
  for (const [t, n] of pv) if (n > pbest) { pbest = n; part = t; }
  return { model, serial, part };
}

// ---------- barcodes (read off the same photo) ----------
// Andy 2026-10-02, 60-photo test: text OCR misread most carton labels, but the
// barcodes on them hold the exact values - Daikin/Amana/Goodman: Code 128
// serial (2605278803) + model, and a square code "CYP~MODEL~REV~SERIAL~date";
// Lennox: "S5823H01796" serial + "1P23K61" part, square code with both; Daikin
// heat pumps: Code 39 "364451E000585C" (product code + serial + check char).
// Chrome on Android reads barcodes natively; the bundled zxing-wasm reader
// (vendor/, MIT) covers every phone and works with no signal.
let invZxingPromise = null;
function invLoadZxing() {
  if (window.ZXingWASM) return Promise.resolve(window.ZXingWASM);
  if (!invZxingPromise) invZxingPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "vendor/zxing-reader.js";
    s.onload = () => {
      try {
        ZXingWASM.setZXingModuleOverrides({ locateFile: (p, prefix) => p.endsWith(".wasm") ? new URL("vendor/zxing_reader.wasm", location.href).href : prefix + p });
        resolve(ZXingWASM);
      } catch (e) { reject(e); }
    };
    s.onerror = () => { invZxingPromise = null; reject(new Error("barcode reader didn't load")); };
    document.head.appendChild(s);
  });
  return invZxingPromise;
}
async function invBarcodeTexts(blob) {
  const out = [];
  if (typeof BarcodeDetector !== "undefined") {
    try {
      const bmp = await createImageBitmap(blob);
      for (const c of await new BarcodeDetector().detect(bmp)) out.push({ format: String(c.format || ""), text: String(c.rawValue || "") });
    } catch (e) {}
  }
  try {
    const Z = await invLoadZxing();
    for (const b of await Z.readBarcodes(blob, { tryHarder: true, maxNumberOfSymbols: 16 })) out.push({ format: String(b.format || ""), text: String(b.text || "") });
  } catch (e) {}
  return out;
}
// Pure: barcode texts -> { model, serial, part, key }. Kept separate so it can
// be tested on saved reads.
function invParseBarcodes(codes) {
  const r = { model: "", serial: "", part: "", key: "" };
  const sv = new Map(), mv = new Map();
  const add = (map, k, w) => { if (k) map.set(k, (map.get(k) || 0) + w); };
  for (const c of codes || []) {
    const raw = String(c.text || "").toUpperCase().trim();
    if (!raw) continue;
    let m = raw.match(/^[A-Z]{2,4}~([A-Z0-9\/\-]{4,})~[A-Z0-9]*~([A-Z0-9]{6,})~/);    // CYP~CAPTA6030C3~AA~2605278803~...
    if (m) { add(mv, m[1], 3); add(sv, m[2], 3); continue; }
    if (raw.startsWith("[)>")) {                                                     // [)>RS06 GS P23K61 GS S5823H01796
      for (const f of raw.split(/[\x1d\x1e\x04\u241d\u241e\u2404]/)) {
        if (/^S[A-Z0-9]{6,}$/.test(f)) add(sv, f.slice(1), 2.5);
        else if (/^1?P[A-Z0-9]{3,}$/.test(f) && !r.part) r.part = f.replace(/^1?P/, "");
      }
      continue;
    }
    const t = raw.split(/\s+/)[0];
    if (/^S\d{4}[A-Z]\d{5}$/.test(t)) { add(sv, t.slice(1), 3); continue; }        // Lennox (S)Serial
    if (/^1P[A-Z0-9]{3,12}$/.test(t)) { if (!r.part) r.part = t.slice(2); continue; }  // Lennox (1P)Part
    if (/^2P[A-Z0-9\/\-]{4,}$/.test(t)) { add(mv, t.slice(2), 3); continue; }       // Lennox model (LC23/37Y9BG)
    if (/^\d{12,14}$/.test(t)) continue;                                              // UPC / EAN
    if (/^(1[5-9]|2\d)(0[1-9]|1[0-2])\d{6}$/.test(t)) { add(sv, t, 3); continue; }  // Daikin / Amana / Goodman
    m = t.match(/^(\d{6})([A-Z]\d{6}).$/);                                            // Daikin heat pump caption
    if (m) { add(sv, m[2], 2); if (!r.key) r.key = "D" + m[1]; continue; }
    m = t.match(/^([A-Z]\d{6}).$/);                                                   // Daikin side label (E000169 + check)
    if (m) { add(sv, m[1], 1.5); continue; }
    const mod = invModelForm(t);
    if (mod) add(mv, mod, 2);
  }
  r.serial = invPickVote(sv);
  r.model = invPickVote(mv);
  if (!r.key && r.part) r.key = "P" + r.part;
  r.serials = [...sv.keys()];
  return r;
}

// Read one capture: barcodes first (exact), then the model memory, then text
// OCR of the label for whatever is still missing, then the tag reader.
// Small barcodes in a wide shot: read them again on each label, enlarged.
async function invBarcodeCrops(blob) {
  const out = [];
  try {
    const Z = await invLoadZxing(), bmp = await createImageBitmap(blob);
    for (const r of invFindLabels(bmp)) {
      const sc = Math.min(2, Math.sqrt(12e6 / (r.w * r.h)));
      const c = document.createElement("canvas"); c.width = Math.round(r.w * sc); c.height = Math.round(r.h * sc);
      const g = c.getContext("2d"); g.imageSmoothingQuality = "high"; g.drawImage(bmp, r.x, r.y, r.w, r.h, 0, 0, c.width, c.height);
      for (const b of await Z.readBarcodes(g.getImageData(0, 0, c.width, c.height), { tryHarder: true, maxNumberOfSymbols: 16 })) out.push({ format: String(b.format || ""), text: String(b.text || "") });
    }
  } catch (e) {}
  return out;
}
async function invReadFields(blob) {
  let codes = await invBarcodeTexts(blob);
  let bc = invParseBarcodes(codes);
  if (!bc.model || !bc.serial) { codes = codes.concat(await invBarcodeCrops(blob)); bc = invParseBarcodes(codes); }
  let { model, serial, part, key } = bc, how = model || serial ? "barcode" : "";
  // Only barcodes and the model memory are exact. A value read from the
  // label text alone can be off by a character, so the unit waits for Andy
  // to check it (one tap) instead of being counted wrong.
  let sureM = !!model, sureS = !!serial;
  if (!model && key) { const mm = invModelMap()[key]; if (mm) { model = mm; sureM = true; how = how ? how + "+memory" : "memory"; } }
  if (!model || !serial) {
    try {
      const r = await invReadLabel(blob, { model, serial });
      if (!model && r.model) {
        model = r.model; how = how ? how + "+text" : "text";
        // A text model that is already known (memory, or in this count) is safe.
        const nm = invNormModel(model);
        const known = [...new Set([...Object.values(invModelMap()), ...invLoad().items.map(it => it.model)])];
        sureM = known.includes(nm);
        // One smudged character off a model already known (DHO9VSA361C): show
        // the known spelling on the check card - still checked, not counted.
        if (!sureM) { const near = known.find(k => invEdit1(k, nm)); if (near) model = near; }
      }
      if (!serial && r.serial) { serial = r.serial; how = how ? how + "+text" : "text"; }
      // Two different serials in the barcodes (a neighbour's label in the
      // shot): the one the text also shows wins.
      if (bc.serials.length > 1 && r.serial && bc.serials.includes(r.serial)) serial = r.serial;
      if (!part && r.part) part = r.part;
    } catch (e) {}
  }
  // (v246) No tag-reader fallback here: on a blurry carton it added 20-35 s
  // and found the model once in 60 photos - the check card is faster.
  if (!key && part) key = "P" + String(part).toUpperCase();
  return { model: invNormModel(model), serial: String(serial || "").toUpperCase().trim(), part, key, how, sure: !!(model && serial && sureM && sureS) };
}

async function invReadBlob(blob, cam) {
  let line;
  if (!blob) {
    line = { kind: "warn", text: "The camera didn't give a picture - tap Capture again." };
  } else {
    const r = await invReadFields(blob);
    if (r.sure) {
      line = invResultText(invAdd(r.model, r.serial, "scan", r.part, r.key), r.model, r.serial);
    } else {
      // Andy 2026-10-02: a half read is never counted silently - it waits for
      // a fix, and its photo goes to the failed-tag folder for the triage.
      const kind = r.model && r.serial ? "inventory-check" : !r.model && !r.serial ? "inventory-unreadable" : !r.serial ? "inventory-no-serial" : "inventory-no-model";
      const photoId = typeof newScanPhotoId === "function" ? newScanPhotoId() : "";
      trackEvent("INVENTORY SCAN - " + (kind === "inventory-check" ? "CHECK | model: " + r.model + " | serial: " + r.serial + " | how: " + r.how : kind === "inventory-unreadable" ? "NOTHING READ" : kind === "inventory-no-serial" ? "NO SERIAL | model: " + r.model : "NO MODEL | serial: " + r.serial) + (photoId ? " | photo: " + photoId : ""));
      if (typeof saveFailedScan === "function") saveFailedScan(blob, { id: photoId, kind, read: [r.model ? "model " + r.model : "", r.serial ? "serial " + r.serial : ""].filter(Boolean).join(", ") }).catch(() => {});
      invAddFix({ model: r.model, serial: r.serial, part: r.part, key: r.key, photoId });
      line = { kind: "warn", text: kind === "inventory-check" ? "Read " + r.model + " · SN " + r.serial + " off the label text - check it above and tap Count." : !r.model && !r.serial ? "Couldn't read that tag - fix it above, or retake." : "Got the " + (r.model ? "model (" + r.model + ")" : "serial (" + r.serial + ")") + " but not the " + (r.model ? "serial" : "model") + " - fill it in above." };
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
  d.fix.unshift({ id: "fix" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), model: f.model || "", serial: f.serial || "", part: f.part || "", key: f.key || "", photoId: f.photoId || "", ts: Date.now() });
  invSave(d);
}
function invFixHtml(fix) {
  return fix.map(f => `
    <div class="inv-fix" data-inv-fix="${f.id}">
      <div class="inv-fix-h">${f.model && f.serial ? "Check this read - tap Count if it matches the label" : "Needs " + (!f.model && !f.serial ? "model and serial" : !f.serial ? "the serial" : "the model")} · ${escapeHtml(invWhen(f.ts))}</div>
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
      const r = invAdd(m, sr, "fixed", fx.part, fx.key);
      // Andy 2026-10-02: tie the hand-typed answer to the saved photo, so the
      // triage sees what the reader got next to what is really on the tag.
      if (fx.photoId) trackEvent("INVENTORY FIX | photo: " + fx.photoId + " | read: model " + (fx.model || "-") + ", serial " + (fx.serial || "-") + " | corrected: model " + invNormModel(m) + ", serial " + (String(sr).toUpperCase() || "-"));
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
