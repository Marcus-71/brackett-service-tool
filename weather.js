// ============================================================
// Local Weather & Humidity — live outdoor conditions for the
// Brackett service area (Evansville, IN 47715 / station KEVV),
// pulled from the free NWS/NOAA API (no key, CORS-open). Drives
// the sweat-point tool, feeds the Charging Calc's outdoor temp,
// and backs the humidity diagnostics. Online enhancement: the
// last good reading is cached so the screen still shows a value
// offline (flagged stale).
// ============================================================
const WX_AREA = {
  label: "Evansville, IN 47715",
  zone: "Climate Zone 4A - mixed-humid",
  station: "KEVV",
  stationName: "Evansville Regional Airport",
  obsUrl: "https://api.weather.gov/stations/KEVV/observations/latest"
};
const WX_CACHE_KEY = "bfc-wx-cache";
const WX_FRESH_MIN = 20; // minutes before we refetch

// Approximate design conditions for Evansville, per the ASHRAE 2021
// Handbook of Fundamentals (station WMO 724320), rounded from the
// published data. Field context only - NOT a stamped Manual J figure.
const WX_DESIGN = {
  summer1DB: 91, summer1WB: 75, summer04DB: 94, designDewpoint: 75, designWB: 78, winter99DB: 14, winter996DB: 8
};

function wxCToF(c) { return (c === null || c === undefined) ? null : (c * 9 / 5 + 32); }
function wxRound(n, dec) { return (n === null || n === undefined || isNaN(n)) ? null : (dec ? Math.round(n * 10) / 10 : Math.round(n)); }
function wxGetCached() { try { return JSON.parse(localStorage.getItem(WX_CACHE_KEY) || "null"); } catch (e) { return null; } }
function wxSaveCache(o) { try { localStorage.setItem(WX_CACHE_KEY, JSON.stringify(o)); } catch (e) {} }
function wxAgeMin(o) { return (!o || !o.fetchedAt) ? Infinity : (Date.now() - o.fetchedAt) / 60000; }

// Fetch the latest KEVV observation. Resolves to
// {tempF,dewF,rh,desc,obsTime,fetchedAt} or, if the network is down,
// the cached reading flagged .stale (or null if nothing cached).
async function wxFetch(force) {
  const cached = wxGetCached();
  if (!force && cached && wxAgeMin(cached) < WX_FRESH_MIN) return cached;
  if (!navigator.onLine) return cached ? Object.assign({}, cached, { stale: true }) : null;
  try {
    const res = await fetch(WX_AREA.obsUrl, { headers: { "Accept": "application/geo+json" } });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const p = (await res.json()).properties;
    const rh = p.relativeHumidity && p.relativeHumidity.value;
    const obs = {
      tempF: wxRound(wxCToF(p.temperature && p.temperature.value), true),
      dewF: wxRound(wxCToF(p.dewpoint && p.dewpoint.value), true),
      rh: (rh === null || rh === undefined) ? null : Math.round(rh),
      desc: p.textDescription || "",
      obsTime: p.timestamp || "",
      fetchedAt: Date.now()
    };
    if (obs.tempF === null && obs.dewF === null) throw new Error("no data");
    wxSaveCache(obs);
    return obs;
  } catch (e) {
    return cached ? Object.assign({}, cached, { stale: true }) : null;
  }
}

function wxObsTimeText(obs) {
  if (!obs || !obs.obsTime) return "";
  try { return new Date(obs.obsTime).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }); }
  catch (e) { return obs.obsTime; }
}

// ---- The Local Weather screen ----
async function renderWeather() {
  const body = document.getElementById("wxBody");
  if (!body) return;
  body.innerHTML = `<div class="wx-loading">Getting current conditions for ${WX_AREA.stationName} (${WX_AREA.station})…</div>`;
  const obs = await wxFetch(false);
  if (!obs || (obs.tempF === null && obs.dewF === null)) {
    body.innerHTML = `<div class="disclaimer">No weather yet. This needs signal the first time. When you're back in coverage, reopen this screen.</div>` + wxReferenceCardHtml();
    return;
  }
  const staleNote = obs.stale ? `<div class="wx-stale">📵 Offline — showing the last reading from ${wxObsTimeText(obs)}.</div>` : "";
  const dew = obs.dewF;
  const sweatBig = (dew !== null)
    ? `<div class="wx-sweat">
         <div class="wx-sweat-head">💧 Today's sweat point (dew point)</div>
         <div class="wx-sweat-num">${Math.round(dew)}°F</div>
         <div class="wx-sweat-sub">Any surface colder than about <strong>${Math.round(dew)}°F</strong> in an attic or other unconditioned space will sweat right now. Supply air runs ~55-58°F — below this — so any breach in a duct's vapor jacket up there will condense.</div>
         <div class="wx-surface-row">
           <label>Measured surface temp °F</label>
           <input id="wxSurfT" type="number" inputmode="decimal" placeholder="e.g. 57">
         </div>
         <div id="wxSurfVerdict" class="wx-surface-verdict"></div>
         <div class="wx-note-small">Attic air can hold <em>more</em> moisture than outside (bath fans, leaks, wet framing), so the real attic dew point can run a few degrees higher than this — treat it as the floor, not the ceiling.</div>
       </div>` : "";
  const rhText = (obs.rh !== null) ? `${obs.rh}%` : "—";
  const rhFlag = (obs.rh !== null && obs.rh >= 70) ? " wx-hi" : "";
  body.innerHTML = `
    ${staleNote}
    <div class="wx-headline">
      <div class="wx-place">${WX_AREA.label} · ${WX_AREA.stationName} (${WX_AREA.station})</div>
      <div class="wx-asof">as of ${wxObsTimeText(obs)}${obs.desc ? " · " + escapeHtml(obs.desc) : ""}</div>
    </div>
    <div class="wx-now">
      <div class="wx-cell"><div class="wx-cell-num">${obs.tempF !== null ? Math.round(obs.tempF) + "°" : "—"}</div><div class="wx-cell-lbl">Outdoor temp</div></div>
      <div class="wx-cell"><div class="wx-cell-num">${dew !== null ? Math.round(dew) + "°" : "—"}</div><div class="wx-cell-lbl">Dew point</div></div>
      <div class="wx-cell${rhFlag}"><div class="wx-cell-num">${rhText}</div><div class="wx-cell-lbl">Humidity</div></div>
    </div>
    ${sweatBig}
    <div class="wx-actions">
      <button id="wxToCharge" class="primary-act">🌡️ Use this outdoor temp in Charging Calc</button>
      <button id="wxRefresh">🔄 Refresh</button>
    </div>
    ${wxReferenceCardHtml()}`;
  const surf = document.getElementById("wxSurfT");
  if (surf) surf.addEventListener("input", () => {
    const el = document.getElementById("wxSurfVerdict");
    const s = parseFloat(surf.value);
    if (isNaN(s) || dew === null) { el.textContent = ""; el.className = "wx-surface-verdict"; return; }
    const d = Math.round(dew);
    if (s <= dew) { el.innerHTML = `⚠️ <strong>WILL sweat</strong> — surface ${wxRound(s)}°F is at/below the ${d}°F dew point (by ${Math.max(0, Math.round(dew - s))}°F).`; el.className = "wx-surface-verdict wx-bad"; }
    else { el.innerHTML = `✓ No condensation — surface ${wxRound(s)}°F is ${Math.round(s - dew)}°F above the ${d}°F dew point. Stay above dew point to keep it dry.`; el.className = "wx-surface-verdict wx-good"; }
  });
  const toCharge = document.getElementById("wxToCharge");
  if (toCharge) toCharge.onclick = () => { showScreen("charge"); if (typeof wxFillOutdoorTemp === "function") wxFillOutdoorTemp(true, true); };
  const refresh = document.getElementById("wxRefresh");
  if (refresh) refresh.onclick = async () => { await wxFetch(true); renderWeather(); trackEvent("refreshed local weather"); };
}

function wxReferenceCardHtml() {
  const d = WX_DESIGN;
  return `
  <div class="wx-ref">
    <div class="detail-section">
      <h3>Evansville climate (Zone 4A, mixed-humid)</h3>
      <ul class="wx-ref-list">
        <li><span class="k">Summer design</span>~${d.summer1DB}°F dry bulb / ${d.summer1WB}°F wet bulb (1%); ~${d.summer04DB}°F at 0.4%. Design dew point ~${d.designDewpoint}°F — summer dew points routinely sit mid-60s to high-70s°F.</li>
        <li><span class="k">Winter design</span>~${d.winter99DB}°F (99%), ~${d.winter996DB}°F (99.6%).</li>
        <li><span class="k">Duct insulation</span>IECC requires <strong>R-8 minimum</strong> for supply ducts in a vented attic here. R-8 is a code floor, not a target — in a 120-140°F attic with 55°F supply air and 70°F+ dew points it's marginal, which is why code-minimum R-8 flex still sweats once the vapor jacket is breached or the insulation is compressed. Upgrade the R-value or bury/encapsulate in hot-humid attics.</li>
        <li><span class="k">Indoor humidity</span>Target 45-55% RH. In this climate ~350 CFM/ton favors latent (moisture) removal; ~400 is the sensible/latent balance point.</li>
      </ul>
      <p class="wx-ref-src">Design figures approximate, per ASHRAE 2021 Handbook of Fundamentals (Evansville / KEVV). Field context, not a stamped Manual J.</p>
    </div>
  </div>`;
}

// Pull the live outdoor temp into the Charging Calc. auto=true only fills
// when the field is empty (non-destructive); force=true overwrites. Always
// refreshes the humid-day context note under the targets.
async function wxFillOutdoorTemp(auto, force) {
  const note = document.getElementById("ccWxNote");
  const obs = await wxFetch(false);
  if (!obs || obs.tempF === null) { if (note) note.innerHTML = ""; return; }
  const od = document.getElementById("cc-od");
  if (od && (force || (auto && od.value.trim() === ""))) {
    od.value = String(Math.round(obs.tempF));
    od.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (note) {
    const humid = (obs.dewF !== null && obs.dewF >= 65) || (obs.rh !== null && obs.rh >= 70);
    const humidLine = humid
      ? ` <strong>Humid out</strong> — expect a tighter 14-17°F sensible split (return-to-supply); a low split alone isn't proof of low airflow or overcharge. Verify the charge by superheat/subcooling, not ΔT. Orifice → superheat; TXV/EEV → subcooling.`
      : "";
    note.innerHTML = `🌡️ ${WX_AREA.station} now: <strong>${Math.round(obs.tempF)}°F</strong>${obs.dewF !== null ? `, dew point ${Math.round(obs.dewF)}°F` : ""}${obs.rh !== null ? `, RH ${obs.rh}%` : ""}${obs.stale ? " (last cached)" : ""}.${humidLine}`;
  }
}
