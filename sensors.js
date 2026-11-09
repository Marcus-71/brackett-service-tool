// Daikin sensor / plug lookup (Andy 2026-11-06: "daikin units needs the sensor charts and what plug number the
// different ones go to ... so they can type in the plug and know what sensor it is and the chart to go with it";
// "theres difference in size of same model also").
// Data: daikin-sensors.js (DAIKIN_SENSOR_MAPS, SENSOR_CHARTS), each map taken from the unit's own service manual
// with file + page. A plug the manual doesn't state is never filled in - it is listed under "Not in the manual".

const snState = { model: "", mapId: "", plug: "", side: "" };

// Daikin maps (daikin-sensors.js) plus every other brand (brand-sensors.js, BRAND_SENSOR_MAPS / BRAND_SENSOR_CHARTS).
let snAll = null;
// Andy 11-09: the two data files (~8 MB) are no longer loaded at app start. They load a few seconds after start, or
// at once when Sensors & Plugs opens. Both stay precached in sw.js, so this works offline.
let snLoaded = typeof DAIKIN_SENSOR_MAPS !== "undefined" && typeof BRAND_SENSOR_MAPS !== "undefined";
let snLoadP = null;
function snEnsure() {
  if (snLoaded) return Promise.resolve();
  if (!snLoadP) {
    const add = (src) => new Promise((ok, bad) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = bad; document.head.appendChild(s); });
    snLoadP = Promise.all(["daikin-sensors.js", "brand-sensors.js"].map(add)).then(() => {
      snLoaded = true; snAll = null;
      if (typeof askIndexCache !== "undefined") askIndexCache = null;   // rebuild Ask Anything with the sensor maps
      document.dispatchEvent(new Event("sensors-loaded"));
    }).catch(e => { snLoadP = null; throw e; });
  }
  return snLoadP;
}
// Background load a few seconds after start - except on low-memory devices (Chrome reports deviceMemory; Andy 11-09:
// older Samsungs), where the maps load only when Sensors & Plugs or Ask Anything needs them.
const snLowMem = typeof navigator !== "undefined" && navigator.deviceMemory && navigator.deviceMemory <= 4;
if (!snLowMem) window.addEventListener("load", () => setTimeout(() => snEnsure().catch(() => {}), 4000));
function snMaps() {
  if (!snAll) snAll = [].concat(typeof DAIKIN_SENSOR_MAPS === "undefined" ? [] : DAIKIN_SENSOR_MAPS, typeof BRAND_SENSOR_MAPS === "undefined" ? [] : BRAND_SENSOR_MAPS);
  return snAll;
}
function snChart(id) {
  if (!id) return null;
  return (typeof SENSOR_CHARTS !== "undefined" && SENSOR_CHARTS.find(c => c.id === id)) || (typeof BRAND_SENSOR_CHARTS !== "undefined" && BRAND_SENSOR_CHARTS.find(c => c.id === id)) || null;
}
function snNorm(s) { return String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, ""); }

// Maps for a typed model. A full model (DZ20VC0361) picks the map(s) with the longest matching token, so a
// size-specific map (DZ20VC0361) beats the family one. A partial model (DZ20) lists every map it could be.
function snMapsForModel(model) {
  const m = snNorm(model);
  if (!m) return [];
  let best = 0, hits = [];
  for (const mp of snMaps()) {
    let sc = 0;
    for (const t of mp.match || []) {
      const tn = snNorm(t);
      if (tn && m.startsWith(tn) && tn.length > sc) sc = tn.length;
    }
    if (sc) hits.push({ mp, sc });
  }
  if (hits.length) {
    // Longest match per side (indoor and outdoor maps can share a family name).
    const out = [];
    for (const side of ["outdoor", "indoor", "generator"]) {
      const s = hits.filter(h => h.mp.side === side);
      if (!s.length) continue;
      best = Math.max(...s.map(h => h.sc));
      out.push(...s.filter(h => h.sc === best).map(h => h.mp));
    }
    return out;
  }
  // Prefix list only for a partly typed model. A full nameplate that matches no token shows "no map" - the
  // 11-09 audit found complete non-K Lennox/Allied models opening the K (A2L board) map this way.
  if (m.length < 2 || m.length > 7) return [];
  return snMaps().filter(mp => (mp.match || []).some(t => snNorm(t).startsWith(m)));
}

// A typed plug: "x12" finds X12A, "12a" finds X12A, "R3T" / "Td" / "discharge" find by code or name.
function snSensorHits(mp, q) {
  const qn = snNorm(q);
  if (!qn) return mp.sensors || [];
  const qw = String(q).toLowerCase().trim();
  return (mp.sensors || []).filter(s => {
    // One entry can name several plugs ("E9 / E26", "X28A (A2P)"): check each name.
    const parts = [snNorm(s.plug)].concat(String(s.plug || "").replace(/\(.*?\)/g, "").split(/[\/,&]|\band\b/i).map(snNorm)).filter(Boolean);
    if (parts.some(p => p === qn || p.startsWith(qn) || p === "X" + qn || p.startsWith("X" + qn) || p.replace(/^CN/, "") === qn)) return true;
    if (s.code && snNorm(s.code) === qn) return true;
    if (s.kind === "eev" && /^(EEV|EV|EXV|EXPANSION)/.test(qn)) return true;
    return qw.length >= 3 && String(s.name || "").toLowerCase().includes(qw);
  });
}

// Plugs the manual names only in the board notes (valve coils, switches, heaters): return those note lines.
function snNoteHits(mp, q) {
  const qn = snNorm(q).replace(/^CN/, "");
  const m = qn.match(/^X?(\d{1,4})([A-Z]?)$/);
  if (!m) return [];
  const re = new RegExp("\\bX" + m[1] + (m[2] || "[A-Z]") + "\\b", "i");
  const text = [mp.notes, mp.test].filter(Boolean).join(" ");
  return [...new Set(text.split(/(?<=[.;])\s+(?=[A-Z(])/).filter(s => re.test(s)).map(s => s.trim()))];
}

function snFmt(n, d) { return n == null || isNaN(n) ? "" : Number(n).toFixed(d).replace(/\.0+$/, ""); }

// Chart rows as {c, f, k, v}. A chart printed in °C only gets °F worked out (and the other way round).
function snRows(ch) {
  const cols = (ch.columns || []).map(c => String(c).toUpperCase());
  const ix = (name) => cols.findIndex(c => c === name || c.startsWith(name));
  const iC = ix("C"), iF = ix("F"), iV = ix("V");
  // One or more resistance columns (plain, or min / nom / max). The reading uses nominal, else the min-max midpoint.
  const iKs = cols.map((c, i) => /OHM/.test(c) ? i : -1).filter(i => i >= 0);
  const scale = (i) => /^OHMS?$/.test(cols[i]) ? 0.001 : 1;
  const iNom = iKs.find(i => /NOM/.test(cols[i]));
  return (ch.rows || []).map(r => {
    const c = iC >= 0 ? r[iC] : (iF >= 0 ? (r[iF] - 32) * 5 / 9 : null);
    const f = iF >= 0 ? r[iF] : (c != null ? c * 9 / 5 + 32 : null);
    const ks = iKs.map(i => r[i] == null ? null : r[i] * scale(i));
    const vals = ks.filter(x => x != null);
    const k = iNom != null && r[iNom] != null ? r[iNom] * scale(iNom) : vals.length ? (Math.min(...vals) + Math.max(...vals)) / 2 : null;
    return { c, f, k, ks, v: iV >= 0 ? r[iV] : null, fCalc: iF < 0, cCalc: iC < 0 };
  }).filter(r => r.c != null && r.k != null);
}

// Reading -> temperature: thermistor curves are close to straight on log(ohms), so interpolate on that.
function snTempFor(ch, kohm) {
  const rows = snRows(ch).slice().sort((a, b) => a.c - b.c);
  if (!rows.length || !(kohm > 0)) return null;
  const desc = rows[0].k > rows[rows.length - 1].k;
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i], b = rows[i + 1];
    const lo = Math.min(a.k, b.k), hi = Math.max(a.k, b.k);
    if (kohm >= lo && kohm <= hi) {
      const t = (Math.log(kohm) - Math.log(a.k)) / (Math.log(b.k) - Math.log(a.k));
      return { c: a.c + t * (b.c - a.c) };
    }
  }
  const first = rows[0], last = rows[rows.length - 1];
  const above = desc ? kohm > first.k : kohm < first.k;
  return { off: above ? "colder" : "hotter", c: above ? first.c : last.c };
}

// Pressure transducer chart: rows [V, PSIG, (manual's unit)]. Straight-line interpolation both ways.
function snPressRows(ch) { return (ch.rows || []).map(r => ({ v: r[0], p: r[1], o: r[2] })).sort((a, b) => a.v - b.v); }
function snLerp(rows, x, kx, ky) {
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i], b = rows[i + 1], lo = Math.min(a[kx], b[kx]), hi = Math.max(a[kx], b[kx]);
    if (x >= lo && x <= hi) return a[ky] + (x - a[kx]) * (b[ky] - a[ky]) / (b[kx] - a[kx]);
  }
  return null;
}
function snPressHtml(ch, key) {
  const rows = snPressRows(ch), u3 = (ch.columns || [])[2];
  return `<details class="sn-chart" open>
    <summary>📈 ${escapeHtml(ch.name || "Pressure sensor output")}</summary>
    <div class="sn-read"><label>Your DC volts <input class="sn-volt" data-chart="${escapeHtml(ch.id)}" data-key="${escapeHtml(key)}" data-dir="v" type="number" inputmode="decimal" step="any" placeholder="V"></label>
      <label>or gauge psig <input class="sn-volt" data-chart="${escapeHtml(ch.id)}" data-key="${escapeHtml(key)}" data-dir="p" type="number" inputmode="decimal" step="any" placeholder="psig"></label>
      <span class="sn-read-out" id="snOut-${escapeHtml(key)}">Plugged in and powered: measure DC volts signal-to-ground at the plug. Or type your gauge reading to see the volts it should put out.</span></div>
    <table class="sn-table"><thead><tr><th>Volts DC</th><th>psig</th>${u3 ? `<th>${escapeHtml(u3)}</th>` : ""}</tr></thead><tbody>
    ${rows.map(r => `<tr data-v="${r.v}"><td>${snFmt(r.v, 2)}</td><td>${snFmt(r.p, 0)}</td>${u3 ? `<td>${r.o == null ? "" : snFmt(r.o, 3)}</td>` : ""}</tr>`).join("")}
    </tbody></table>
    <div class="sn-src">Chart: ${escapeHtml(ch.source || "")}.${u3 ? " psig worked out from the manual's " + escapeHtml(u3) + "." : ""}${ch.notes ? " " + escapeHtml(ch.notes) : ""}</div>
  </details>`;
}
document.addEventListener("input", (e) => {
  const el = e.target;
  if (!el.classList || !el.classList.contains("sn-volt")) return;
  const ch = snChart(el.dataset.chart), out = document.getElementById("snOut-" + el.dataset.key);
  if (!ch || !out) return;
  const box = el.closest(".sn-chart");
  box.querySelectorAll(".sn-volt").forEach(o => { if (o !== el) o.value = ""; });
  box.querySelectorAll("tr.sn-hit").forEach(r => r.classList.remove("sn-hit"));
  const x = parseFloat(el.value), rows = snPressRows(ch);
  if (isNaN(x)) return;
  let v;
  if (el.dataset.dir === "v") {
    const p = snLerp(rows, x, "v", "p");
    if (p == null) { out.innerHTML = `<b>Outside the sensor's range</b> (${snFmt(rows[0].v, 2)}-${snFmt(rows[rows.length - 1].v, 2)} V). Near 0 V or near the 5 V supply = open/shorted sensor or wiring - check the supply volts at the plug first.`; return; }
    out.innerHTML = `Sensor says <b>${snFmt(p, 0)} psig</b>. Compare with your gauge on the same side - well off, replace the sensor (supply volts OK first).`;
    v = x;
  } else {
    v = snLerp(rows, x, "p", "v");
    if (v == null) { out.innerHTML = `<b>Outside the sensor's range</b> (${snFmt(rows[0].p, 0)}-${snFmt(rows[rows.length - 1].p, 0)} psig).`; return; }
    out.innerHTML = `At ${snFmt(x, 0)} psig the sensor should put out about <b>${snFmt(v, 2)} V DC</b>.`;
  }
  let best = null, bd = 1e9;
  box.querySelectorAll("tbody tr").forEach(r => { const d = Math.abs(Number(r.dataset.v) - v); if (d < bd) { bd = d; best = r; } });
  if (best) best.classList.add("sn-hit");
});

function snChartHtml(ch, key) {
  if (!ch) return "";
  if (ch.kind === "pressure") return snPressHtml(ch, key);
  const rows = snRows(ch);
  const hasV = rows.some(r => r.v != null);
  const kCols = (ch.columns || []).filter(c => /ohm/i.test(c));
  const kHeads = kCols.length > 1 ? kCols.map(c => "kΩ " + (/min/i.test(c) ? "min" : /max/i.test(c) ? "max" : /nom/i.test(c) ? "nominal" : "")) : ["kΩ"];
  const calcNote = rows.some(r => r.fCalc) ? " °F worked out from the manual's °C." : rows.some(r => r.cCalc) ? " °C worked out from the manual's °F." : "";
  return `<details class="sn-chart" open>
    <summary>📈 ${escapeHtml(ch.name || "Resistance chart")}</summary>
    ${rows.length >= 5 ? `<div class="sn-read"><label>Your reading <input class="sn-ohm" data-chart="${escapeHtml(ch.id)}" data-key="${escapeHtml(key)}" type="number" inputmode="decimal" step="any" placeholder="kΩ"></label> <span class="sn-read-out" id="snOut-${escapeHtml(key)}">Unplug it, measure across the pins, type the kΩ.</span></div>` : `<p class="sn-note">Check points only - the manual prints just these few values, so no reading-to-temperature conversion.</p>`}
    <table class="sn-table"><thead><tr><th>°F</th><th>°C</th>${kHeads.map(h => `<th>${escapeHtml(h)}</th>`).join("")}${hasV ? "<th>Volts DC</th>" : ""}</tr></thead><tbody>
    ${rows.map(r => `<tr data-c="${r.c}"><td>${snFmt(r.f, 0)}</td><td>${snFmt(r.c, 1)}</td>${r.ks.map(k => `<td>${k == null ? "" : snFmt(k, k < 10 ? 2 : 1)}</td>`).join("")}${hasV ? `<td>${r.v == null ? "" : snFmt(r.v, 2)}</td>` : ""}</tr>`).join("")}
    </tbody></table>
    <div class="sn-src">Chart: ${escapeHtml(ch.source || "")}.${calcNote}${ch.notes ? " " + escapeHtml(ch.notes) : ""}</div>
  </details>`;
}

function snSensorHtml(mp, s, i, open) {
  const ch = snChart(s.chart);
  const key = mp.id + "-" + i;
  const head = `<span class="sn-plug${s.kind === "eev" ? " sn-plug-eev" : ""}">${escapeHtml(s.plug || "?")}</span>${s.kind === "eev" ? `<span class="sn-pins">EEV</span>` : ""}${s.pins ? `<span class="sn-pins">pins ${escapeHtml(s.pins)}</span>` : ""} <b>${escapeHtml(s.name || "")}</b>${s.code ? ` <span class="sn-code">${escapeHtml(s.code)}</span>` : ""}`;
  const body = `
    ${s.location ? `<p><span class="k">Where</span> ${escapeHtml(s.location)}</p>` : ""}
    ${(s.errorCodes || []).length ? `<p><span class="k">Codes</span> ${escapeHtml(s.errorCodes.join(", "))}</p>` : ""}
    ${s.spec ? `<p class="sn-spec"><span class="k">${s.kind === "eev" ? (/\d\s*(Ω|ohm)/i.test(s.spec) ? "Coil Ω" : "Check") : "Spec"}</span> ${escapeHtml(s.spec)}</p>` : ""}
    ${s.kind === "pressure" && !ch ? `<p class="sn-note">Pressure sensor - the manual gives no volts-to-pressure figures for it. Check its DC volts per the test below.</p>` : ""}
    ${s.kind === "eev" && !s.spec ? `<p class="sn-note">EEV coil - the manual gives no ohm figure for it.</p>` : ""}
    ${s.kind !== "pressure" && s.kind !== "eev" && s.kind !== "other" && !ch ? `<p class="sn-note">No resistance chart for this one in the manual.</p>` : ""}
    ${s.test ? `<p><span class="k">Test</span> ${escapeHtml(s.test)}</p>` : ""}
    ${snChartHtml(ch, key)}
    <div class="sn-src">Plug: ${escapeHtml(s.source || "")}</div>`;
  return `<details class="sn-sensor"${open ? " open" : ""}><summary>${head}</summary>${body}</details>`;
}

function snMapHtml(mp, q) {
  const hits = snSensorHits(mp, q);
  const noteHits = !hits.length && q ? snNoteHits(mp, q) : [];
  const sideIcon = mp.side === "indoor" ? "🏠 Indoor" : mp.side === "generator" ? "⚡ Generator" : "🌳 Outdoor";
  const sizes = (mp.sizes || []).length && !(mp.sizes.length === 1 && /^all$/i.test(mp.sizes[0])) ? " · sizes " + mp.sizes.join(", ") : "";
  return `<div class="card sn-map">
    <div class="sn-map-h"><span class="sn-side">${sideIcon}</span> <b>${escapeHtml(mp.title)}</b></div>
    <div class="sn-models">${escapeHtml(mp.models || "")}${escapeHtml(sizes)}${mp.board ? " · " + escapeHtml(mp.board) : ""}</div>
    ${mp.notes ? `<details class="sn-gaps"${q ? "" : " open"}><summary>📝 Board notes</summary><p class="sn-note">${escapeHtml(mp.notes)}</p></details>` : ""}
    ${hits.length ? hits.map(s => snSensorHtml(mp, s, (mp.sensors || []).indexOf(s), !!q || hits.length === 1)).join("")
      : noteHits.length ? `<div class="sn-sensor sn-notehit"><p><b>${escapeHtml(q.toUpperCase())}</b> is not a sensor plug, but the manual names it:</p><ul>${noteHits.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ul></div>`
      : `<p class="sn-none">Plug <b>${escapeHtml(q)}</b> is not in this board's sensor list. ${mp.side === "generator" ? "Check the wiring diagram inside the generator's controller door - it names each plug and wire number." : "It may be a fan, valve, heater or power plug - check the wiring diagram on the unit's panel."}</p>`}
    ${(mp.replacement || []).length ? `<details class="sn-gaps sn-repl"${q ? "" : " open"}><summary>🔧 Replacement board (${mp.replacement.length})</summary>${mp.replacement.map(r => `<div class="sn-repl-item"><p><b>${escapeHtml(r.board || "")}</b>${r.kit ? " · kit " + escapeHtml(r.kit) : ""}${r.replaces ? "<br>Replaces: " + escapeHtml(r.replaces) : ""}</p>${r.differences ? `<p><span class="k">What's different</span> ${escapeHtml(r.differences)}</p>` : ""}${(r.steps || []).length ? `<ol>${r.steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>` : ""}${r.source ? `<p class="sn-src">Source: ${escapeHtml(r.source)}</p>` : ""}</div>`).join("")}</details>` : ""}
    ${!q && mp.test ? `<p class="sn-test"><span class="k">How to test</span> ${escapeHtml(mp.test)}</p>` : ""}
    ${(mp.gaps || []).length ? `<details class="sn-gaps"><summary>Not in the manual (${mp.gaps.length})</summary><ul>${mp.gaps.map(g => `<li>${escapeHtml(g)}</li>`).join("")}</ul></details>` : ""}
    <div class="sn-src">Source: ${escapeHtml((mp.sources || []).map(s => s.file + " p." + s.pages + (s.what ? " (" + s.what + ")" : "")).join("; "))}</div>
  </div>`;
}

function snFillPicker() {
  const sel = document.getElementById("snMapSel");
  if (!sel || sel.dataset.filled) return;
  sel.dataset.filled = "1";
  const opt = (mp) => `<option value="${escapeHtml(mp.id)}">${escapeHtml(mp.title)}</option>`;
  const by = (side) => snMaps().filter(m => m.side === side).sort((a, b) => a.title.localeCompare(b.title));
  sel.innerHTML = `<option value="">- or pick the unit -</option><optgroup label="Outdoor units">${by("outdoor").map(opt).join("")}</optgroup><optgroup label="Indoor units">${by("indoor").map(opt).join("")}</optgroup><optgroup label="Generators">${by("generator").map(opt).join("")}</optgroup>`;
}

function renderSensors() {
  const box = document.getElementById("snResults");
  if (!box) return;
  if (!snLoaded) {
    box.innerHTML = `<p class="sn-hint">Loading the sensor maps…</p>`;
    snEnsure().then(renderSensors).catch(() => { box.innerHTML = `<div class="empty-state">Couldn't load the sensor maps. Check the connection, or close and reopen the app.</div>`; });
    return;
  }
  snFillPicker();
  const mi = document.getElementById("snModel"), pi = document.getElementById("snPlug"), sel = document.getElementById("snMapSel");
  if (mi && mi.value !== snState.model) mi.value = snState.model;
  if (pi && pi.value !== snState.plug) pi.value = snState.plug;
  if (sel) sel.value = snState.mapId;
  document.querySelectorAll(".sn-side-btn").forEach(b => b.classList.toggle("active", b.dataset.side === snState.side));
  const q = snState.plug.trim();
  let maps, head = "";
  if (snState.mapId) maps = snMaps().filter(m => m.id === snState.mapId);
  else if (snState.model.trim()) {
    maps = snMapsForModel(snState.model);
    if (!maps.length) {
      box.innerHTML = `<div class="empty-state">No sensor map for <b>${escapeHtml(snState.model)}</b> yet. Pick the unit from the list, or check the wiring diagram on the unit's panel - it names each plug.</div>`;
      return;
    }
  } else if (q) { maps = snMaps(); head = `<p class="sn-hint">Plug <b>${escapeHtml(q)}</b> on every board we have - type the model above to narrow it to your unit. The same plug is a different sensor on different models.</p>`; }
  else {
    box.innerHTML = `<p class="sn-hint">Type the model off the tag (the size digits matter - boards differ by size), or pick the unit. Then type the plug printed on the board next to the connector (X12A, X19A…). Leave the plug blank to see every sensor on that board.</p>`;
    return;
  }
  if (snState.side) maps = maps.filter(m => m.side === snState.side);
  if (q) maps = maps.filter(m => snSensorHits(m, q).length || snState.mapId || snState.model.trim());
  if (!maps.length) { box.innerHTML = head + `<div class="empty-state">Nothing found for that plug. Check the letters printed on the board next to the connector.</div>`; return; }
  box.innerHTML = head + maps.map(m => snMapHtml(m, q)).join("");
}

// Ohms box -> temperature, and highlight the nearest chart row.
document.addEventListener("input", (e) => {
  const el = e.target;
  if (!el.classList || !el.classList.contains("sn-ohm")) return;
  const ch = snChart(el.dataset.chart), out = document.getElementById("snOut-" + el.dataset.key);
  const tbl = el.closest(".sn-chart").querySelector(".sn-table");
  tbl.querySelectorAll("tr.sn-hit").forEach(r => r.classList.remove("sn-hit"));
  const k = parseFloat(el.value);
  if (!ch || !out) return;
  if (!(k > 0)) { out.textContent = "Unplug it, measure across the pins, type the kΩ."; return; }
  const t = snTempFor(ch, k);
  if (!t) { out.textContent = ""; return; }
  if (t.off) { out.innerHTML = `<b>Off the chart</b> - reads ${t.off} than ${snFmt(t.c * 9 / 5 + 32, 0)}°F. Near 0 = shorted, very high = open: replace the sensor.`; return; }
  out.innerHTML = `Sensor says <b>${snFmt(t.c * 9 / 5 + 32, 0)}°F</b> (${snFmt(t.c, 1)}°C). Compare with a thermometer on the same pipe or air - more than about 5°F apart, replace it.`;
  let bestRow = null, bd = 1e9;
  tbl.querySelectorAll("tbody tr").forEach(r => { const d = Math.abs(Number(r.dataset.c) - t.c); if (d < bd) { bd = d; bestRow = r; } });
  if (bestRow) bestRow.classList.add("sn-hit");
});

function snWire() {
  const mi = document.getElementById("snModel"), pi = document.getElementById("snPlug"), sel = document.getElementById("snMapSel");
  if (!mi || mi.dataset.wired) return;
  mi.dataset.wired = "1";
  let tm = null;
  const later = () => { clearTimeout(tm); tm = setTimeout(() => { if (snState.model || snState.plug) trackEvent("sensor lookup: " + (snState.model || snState.mapId || "-") + " | " + (snState.plug || "-")); }, 2500); };
  mi.addEventListener("input", () => { snState.model = mi.value; snState.mapId = ""; renderSensors(); later(); });
  pi.addEventListener("input", () => { snState.plug = pi.value; renderSensors(); later(); });
  sel.addEventListener("change", () => { snState.mapId = sel.value; if (sel.value) { snState.model = ""; } renderSensors(); later(); });
  document.querySelectorAll(".sn-side-btn").forEach(b => b.addEventListener("click", () => { snState.side = snState.side === b.dataset.side ? "" : b.dataset.side; renderSensors(); }));
}

// Open the screen for a model (tag scanner) or a map (Ask Anything).
function openSensors(opts) {
  opts = opts || {};
  snState.model = opts.model || ""; snState.mapId = opts.mapId || ""; snState.plug = opts.plug || ""; snState.side = "";
  showScreen("sensors");
}
function sensorsOnShow() { snWire(); renderSensors(); }
