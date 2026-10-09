/**
 * Brackett Ask AI Relay — Google Apps Script web app.
 *
 * Holds the Anthropic API key SERVER-SIDE so it never lives in the public app.
 * The Service Tool POSTs { question, passages, entries, token }; this calls Claude and
 * returns { answer }.
 *
 * Runs on the WORK account andy@brackettcomfort.com (moved 2026-10-09 from Andy's personal Gmail).
 * Deploy as a web app: Execute as Me, Who has access: Anyone. The app's ASK_AI_RELAY holds the /exec URL.
 * Script properties (Project Settings → Script properties): ANTHROPIC_KEY, APP_TOKEN.
 * After pasting a new version: Deploy → Manage deployments → pencil → Version: New version → Deploy
 * (keeps the same /exec URL the app uses).
 *
 * v2 (2026-10-06): Andy — "thorough for the guys in the field and not a don't know good luck answers".
 * Stronger model, room for full step-by-step answers, Haiku fallback if the main model errors.
 * v3: effort medium + 4000 tokens (thinking can't starve the answer), cut-short note, manual pages before
 *     app entries (the unit line stays first), wrong-unit escape line, fallbackReason in the reply.
 */

var MODEL = 'claude-sonnet-5-5';            // thorough answers
var FALLBACK_MODEL = 'claude-haiku-4-5';   // used only if MODEL errors / is overloaded
var MAX_TOKENS = 4000;                      // room for thinking + a full answer
var EFFORT = 'medium';                      // Sonnet 5.5 thinks by default; medium keeps it quicker
var DAILY_CAP = 400;                        // safety cap on calls per day
var CONTEXT_CHARS = 40000;

var SYSTEM_PROMPT =
  "You are the senior field-service tech backing up Brackett Comfort's HVAC and generator technicians. " +
  "The tech is standing at the equipment right now and needs to get it fixed today. Give them a complete, usable answer — never a 'don't know, good luck'.\n" +
  "\n" +
  "HOW TO ANSWER\n" +
  "1. Start with what the code / symptom actually means on THIS unit (one or two lines).\n" +
  "2. Most likely causes, most likely first.\n" +
  "3. Numbered test steps: what to measure, where (terminals, pins, wire numbers, connectors), the expected value, and what a pass or fail tells them. Pull every value from the manual excerpts and app entries.\n" +
  "4. The fix, then how to clear the code and confirm the repair.\n" +
  "\n" +
  "RULES\n" +
  "- The app has already identified the unit. When the question or an app entry names a model, family, engine or controller, treat it as known. Never say a model 'isn't listed' and never ask for the model or serial number when one is already in the question or context.\n" +
  "- Use the manual excerpts and app entries first and cite them like (Diagnostic Repair Manual p.110). App entries are Brackett's checked data for that unit — trust their specs and code meanings.\n" +
  "- Exact numbers (gaps, torques, pressures, charge, voltages, resistances, part numbers) must come from the excerpts or entries. If one isn't there, say so in one short line, then give the standard field practice for that equipment type labeled 'general practice' — never present an invented number as the manufacturer's.\n" +
  "- NEVER end with only 'contact the dealer', 'call tech support', 'check the manual' or 'ask your parts supplier'. If a part number isn't in the excerpts, say where to read it (data plate, the unit's illustrated parts list, the part's own label, wire numbers to match) AND still give the full diagnostic steps so the tech can prove the part is bad first.\n" +
  "- If the manual excerpts plainly describe a different unit than THE TECH'S UNIT, say so in one line before answering.\n" +
  "- Follow-up questions (e.g. 'need the wiring harness', 'where is it') refer to the unit and code already in the question — answer for that unit.\n" +
  "- If the question is ambiguous, answer the most likely case first, then one line on the alternative. Don't ask questions back.\n" +
  "- Bridge field slang to manual wording (e.g. a Generac 'crank sensor' is the manual's 'RPM sensor').\n" +
  "- Write for a phone screen: short numbered steps and bullets, plain words, no headings, no filler. Thorough but tight — usually 8 to 25 lines.\n" +
  "- One-line safety note when gas, high voltage, refrigerant or a running engine is involved.";

function doGet(e) {
  return json({ ok: true, service: 'brackett-ask-ai', model: MODEL, version: 3 });
}

function doPost(e) {
  try {
    var body = {};
    try { body = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (x) {}
    var q = (body.question || '').toString().trim().slice(0, 2000);
    if (!q) return json({ error: 'No question.' });

    // Shared-password lock: if APP_TOKEN is set, the request must carry it.
    var wantToken = PropertiesService.getScriptProperties().getProperty('APP_TOKEN');
    if (wantToken && (body.token || '').toString() !== wantToken) return json({ error: 'Unauthorized.' });

    var key = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_KEY');
    if (!key) return json({ error: 'Relay not configured — no API key set.' });

    if (overDailyCap()) return json({ error: "Daily AI limit reached — try again tomorrow." });

    var content = buildContext(body) + '\n\nTECH QUESTION: ' + q;
    var r = callClaude(key, MODEL, content, true);
    var why = '';
    if (!r.answer) { why = r.error || ''; r = callClaude(key, FALLBACK_MODEL, content, false); }
    if (r.answer) {
      bumpDailyCount();
      var out = { answer: r.answer, model: r.model };
      if (why) out.fallbackReason = String(why).slice(0, 200);
      return json(out);
    }
    return json({ error: r.error || 'LLM error' });
  } catch (err) {
    return json({ error: String(err) });
  }
}

function callClaude(key, model, content, withEffort) {
  var resp = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    payload: JSON.stringify(Object.assign({
      model: model,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: content }]
    }, withEffort ? { output_config: { effort: EFFORT } } : {})),
    muteHttpExceptions: true
  });
  var data = {};
  try { data = JSON.parse(resp.getContentText()); } catch (x) {}
  var text = '';
  if (data && data.content) data.content.forEach(function (b) { if (b && b.type === 'text' && b.text) text += b.text; });
  if (text && data.stop_reason === 'max_tokens') text += '\n\n(Answer cut short - ask again with a narrower question.)';
  if (text) return { answer: text, model: model };
  return { error: (data && data.error && data.error.message) || ('LLM error ' + resp.getResponseCode()) };
}

function buildContext(body) {
  var out = '';
  var passages = body.passages || [];
  var entries = body.entries || [];
  // The unit line first, then the manual pages (where the numbers live), then the app entries -
  // so a long context trims entries, not the manual.
  var unitEntries = entries.filter(function (en) { return en && en.kind === 'Unit'; });
  var otherEntries = entries.filter(function (en) { return !(en && en.kind === 'Unit'); });
  unitEntries.forEach(function (en) {
    out += '=== THE TECH\'S UNIT ===\n' + (en.title || '') + '\n' + (en.text || '') + '\n\n';
  });
  if (passages.length) {
    out += '=== EXCERPTS FROM THE MANUFACTURER MANUALS ===\n';
    passages.forEach(function (p) {
      out += '[' + (p.title || 'Manual') + ', page ' + (p.page || '?') + ']\n' + (p.text || '') + '\n\n';
    });
  }
  if (otherEntries.length) {
    out += '=== BRACKETT APP ENTRIES (codes, specs, fixes) ===\n';
    otherEntries.forEach(function (en) {
      out += '(' + (en.kind || 'entry') + ') ' + (en.title || '') + '\n' + (en.text || '') + '\n\n';
    });
  }
  if (!out) out = '(No manual excerpts or app entries matched — answer from standard HVAC/generator field practice, label it general practice, and still give full test steps.)';
  return out.slice(0, CONTEXT_CHARS);
}

// ── simple per-day call cap ──────────────────────────────────────────────────
function dayKey() {
  return 'aiCount_' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd');
}
function overDailyCap() {
  var n = Number(PropertiesService.getScriptProperties().getProperty(dayKey()) || '0');
  return n >= DAILY_CAP;
}
function bumpDailyCount() {
  var props = PropertiesService.getScriptProperties();
  var k = dayKey();
  props.setProperty(k, String(Number(props.getProperty(k) || '0') + 1));
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
