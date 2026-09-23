/**
 * Brackett Service Tool — failed-scan photo relay (Google Apps Script)
 * =====================================================================
 * When the Tag Scanner / Maintenance Figures OCR can't read a data plate, the
 * app POSTs the photo here and this script drops it into a Drive folder
 * ("Brackett Failed Scans") that is shared with Andy's work account. The app
 * side is app.js -> SCAN_PHOTO_RELAY / flushScanPhotos().
 *
 * Runs on a PERSONAL Gmail account (the brackettcomfort.com Workspace account
 * blocks "Anyone" web-app access). Scope is drive.file only: the script can see
 * and touch ONLY files/folders it created itself — never the rest of the Drive.
 *
 * Drive access goes through the Drive Advanced Service (Drive API v3, symbol
 * `Drive`), NOT DriveApp. DriveApp.createFolder / getFolderById demand the full
 * https://www.googleapis.com/auth/drive scope and fail under drive.file; the
 * REST-backed advanced service works with drive.file for items the app creates.
 *
 * DEPLOY (one time, ~5 minutes)
 * ------------------------------
 *  1. Sign in to the personal Gmail account, open https://script.google.com and
 *     click "New project". Name it "Brackett Scan Photo Relay".
 *  2. Gear icon (Project Settings) -> tick "Show 'appsscript.json' manifest file
 *     in editor". Back in the editor, open appsscript.json and replace its
 *     contents with tools/scan-photo-relay.appsscript.json.
 *  3. Services (+) in the left sidebar -> "Drive API" -> Version: v3 -> Add.
 *     (The pasted manifest already declares this under
 *     dependencies.enabledAdvancedServices, so it usually shows as enabled
 *     already — just confirm "Drive" appears under Services with v3.)
 *  4. Open Code.gs, delete the stub, paste this whole file. Save (Ctrl+S).
 *  5. Project Settings -> Script properties -> Add script property:
 *        APP_TOKEN = the value of SCAN_PHOTO_APP_TOKEN in app.js
 *     (Leave it out entirely and the relay accepts any caller — don't.)
 *  6. In the editor, pick the function "setup" in the toolbar dropdown and Run.
 *     Google asks for consent: "Review permissions" -> choose the account ->
 *     "Advanced" -> "Go to Brackett Scan Photo Relay (unsafe)" -> Allow.
 *     The only permission listed is "See, edit, create, and delete only the
 *     specific Google Drive files you use with this app" (drive.file).
 *     Check the Execution log: it prints the folder URL and confirms the share
 *     to andy@brackettcomfort.com. (An email "shared a folder with you" lands
 *     in the work inbox — that is the same folder.)
 *  7. Deploy -> New deployment -> type: Web app.
 *        Description:    scan photo relay
 *        Execute as:     Me
 *        Who has access: Anyone
 *     Deploy, then copy the Web app URL (ends in /exec).
 *  8. Paste that URL into SCAN_PHOTO_RELAY in app.js, bump the app version as
 *     usual, and ship. Opening the /exec URL in a browser should show
 *     {"ok":true,"service":"brackett-scan-photos"}.
 *
 * Re-deploying after a code change: Deploy -> Manage deployments -> pencil ->
 * Version: New version -> Deploy. The /exec URL stays the same. (That is all
 * the sweep feature below needs — paste the new code, save, then do exactly
 * that. It uses no new OAuth scope, so there is no re-consent step.)
 *
 * WIRE FORMAT (POST body, JSON, sent as text/plain so the browser skips the
 * CORS preflight — same trick as the Ask AI relay):
 *   Upload (the default — any body without an `action` field):
 *     { token, id, tech, ts, kind, read, version, mime, b64 }
 *     Reply: { ok:true, name, fileId, dup? }  or  { ok:false, error }
 *   Sweep (see CLEANUP below):
 *     { token, action:"sweep" }
 *     Reply: { ok:true, action:"sweep", trashed:[{id,name}], failed:[{id,name,error}] }
 *            or  { ok:false, error }
 *
 * CLEANUP (sweep)
 * ---------------
 * This account owns every photo it uploads, and in Drive only the OWNER can
 * trash a file. The daily triage job runs on the work account, which has
 * writer access to the folder: it can rename files but not trash them. So the
 * convention is:
 *   1. The triage job renames each finished photo so its name STARTS WITH the
 *      literal prefix "RESOLVED_" (e.g. "RESOLVED_2026-09-23_101502_...jpg").
 *   2. It then POSTs { token, action:"sweep" } to this relay.
 *   3. sweepResolved_() lists the folder for RESOLVED_ files, re-checks the
 *      prefix in JS (Drive's `name contains` is a token match, not a prefix
 *      match), and marks each one trashed: true — at most 200 per call.
 * Files go to Drive Trash, never a hard delete (Drive.Files.remove is never
 * called), so anything swept by mistake can be restored from Trash for 30 days.
 * Nothing outside the relay's own folder is ever listed or touched.
 * sweepResolved() (no underscore) runs the same sweep from the editor.
 */

var FOLDER_NAME = "Brackett Failed Scans";
var SHARE_WITH  = "andy@brackettcomfort.com";
var DAILY_CAP   = 200;                   // uploads per calendar day (Chicago)
var MAX_BYTES   = 8 * 1024 * 1024;       // decoded image size cap
var TZ          = "America/Chicago";

// ---------------------------------------------------------------- endpoints

function doGet() {
  return json_({ ok: true, service: "brackett-scan-photos" });
}

function doPost(e) {
  try {
    var body = parseBody_(e);
    if (!body) return json_({ ok: false, error: "bad json" });

    var props = PropertiesService.getScriptProperties();
    var wantToken = props.getProperty("APP_TOKEN");
    if (wantToken && String(body.token || "") !== wantToken) {
      return json_({ ok: false, error: "bad token" });
    }

    // Cleanup request from the triage job (see CLEANUP in the header). No id /
    // image / daily cap — it only trashes files already renamed RESOLVED_*.
    if (body.action === "sweep") {
      var swept = sweepResolved_(getFolder_(props));
      return json_({ ok: true, action: "sweep", trashed: swept.trashed, failed: swept.failed });
    }

    var id = sanitize_(body.id, 40);
    if (!id) return json_({ ok: false, error: "missing id" });

    var mime = String(body.mime || "image/jpeg").toLowerCase();
    if (!/^image\/[a-z0-9.+-]+$/.test(mime)) return json_({ ok: false, error: "not an image" });

    var b64 = String(body.b64 || "").replace(/^data:[^,]*,/, "");
    if (!b64) return json_({ ok: false, error: "no image data" });
    // Decoded size ~= 3/4 of the base64 length; reject before decoding.
    if (Math.floor(b64.length * 3 / 4) > MAX_BYTES) return json_({ ok: false, error: "too big" });

    var folderId = getFolder_(props);

    // Idempotent: the phone retries until it hears ok, so a reply lost in
    // transit must not produce a second copy.
    var existing = findById_(folderId, id);
    if (existing) return json_({ ok: true, name: existing.name, fileId: existing.id, dup: true });

    if (!bumpDailyCount_(props)) return json_({ ok: false, error: "cap" });

    var bytes;
    try { bytes = Utilities.base64Decode(b64); }
    catch (err) { return json_({ ok: false, error: "bad base64" }); }
    if (!bytes || !bytes.length) return json_({ ok: false, error: "empty image" });
    if (bytes.length > MAX_BYTES) return json_({ ok: false, error: "too big" });

    var tech = sanitize_(body.tech, 24) || "unknown";
    var kind = sanitize_(body.kind, 24) || "unreadable";
    var name = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd_HHmmss") +
      "_" + tech + "_" + kind + "_" + id + "." + extFor_(mime);

    var description =
      "tech: " + String(body.tech || "?") +
      " | taken: " + String(body.ts || "?") +
      " | kind: " + kind +
      " | read: " + String(body.read || "") +
      " | app: " + String(body.version || "?") +
      " | photo id: " + id;
    var file = Drive.Files.create(
      { name: name, parents: [folderId], description: description, mimeType: mime },
      Utilities.newBlob(bytes, mime, name),
      { fields: "id,name" }
    );
    return json_({ ok: true, name: name, fileId: file.id });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

// -------------------------------------------------------------- one-time setup

/** Run once from the editor: creates the folder and shares it with Andy. */
function setup() {
  var props = PropertiesService.getScriptProperties();
  var folderId = getFolder_(props);
  try {
    Drive.Permissions.create(
      { role: "writer", type: "user", emailAddress: SHARE_WITH },
      folderId,
      { sendNotificationEmail: true }
    );
    Logger.log("Shared with " + SHARE_WITH + " (writer).");
  } catch (err) {
    Logger.log("Could not share automatically (" + err + "). Share the folder by hand from Drive.");
  }
  Logger.log("Folder: https://drive.google.com/drive/folders/" + folderId);
  Logger.log("Folder id stored in script property FOLDER_ID = " + folderId);
  if (!props.getProperty("APP_TOKEN")) {
    Logger.log("WARNING: script property APP_TOKEN is not set - the relay will accept any caller.");
  }
}

// ------------------------------------------------------------------- cleanup

var RESOLVED_PREFIX = "RESOLVED_";
var SWEEP_CAP       = 200;               // files trashed per sweep call

/** Run from the editor: trashes RESOLVED_* files in the relay folder and logs the result. */
function sweepResolved() {
  var folderId = getFolder_(PropertiesService.getScriptProperties());
  var res = sweepResolved_(folderId);
  Logger.log("Sweep of folder " + folderId + ": trashed " + res.trashed.length +
    ", failed " + res.failed.length);
  Logger.log(JSON.stringify(res));
}

/**
 * Moves every file in the folder whose name starts with RESOLVED_ to Drive
 * Trash (recoverable for 30 days). Returns { trashed:[{id,name}],
 * failed:[{id,name,error}] }. Only ever sets trashed:true — never a hard
 * delete — and never looks outside the given folder. Stops at SWEEP_CAP.
 */
function sweepResolved_(folderId) {
  // Collect first, trash second: trashing while paging shrinks the
  // `trashed = false` result set under the page token, so later pages would
  // skip files.
  var targets = [];
  var pageToken = null;
  do {
    var params = {
      q: "'" + folderId + "' in parents and name contains '" + RESOLVED_PREFIX + "' and trashed = false",
      fields: "nextPageToken,files(id,name)",
      pageSize: 100
    };
    if (pageToken) params.pageToken = pageToken;
    var res = Drive.Files.list(params);
    var list = (res && res.files) || [];
    for (var i = 0; i < list.length && targets.length < SWEEP_CAP; i++) {
      var name = String(list[i].name || "");
      // `name contains` matches tokens anywhere in the name; only a true prefix counts.
      if (name.indexOf(RESOLVED_PREFIX) === 0) targets.push({ id: list[i].id, name: name });
    }
    pageToken = res && res.nextPageToken;
  } while (pageToken && targets.length < SWEEP_CAP);

  var trashed = [];
  var failed = [];
  for (var j = 0; j < targets.length; j++) {
    try {
      Drive.Files.update({ trashed: true }, targets[j].id);
      trashed.push(targets[j]);
    } catch (err) {
      failed.push({ id: targets[j].id, name: targets[j].name, error: String(err && err.message || err) });
    }
  }
  return { trashed: trashed, failed: failed };
}

// -------------------------------------------------------------------- helpers

function parseBody_(e) {
  try {
    var raw = e && e.postData && e.postData.contents;
    if (!raw) return null;
    var obj = JSON.parse(raw);
    return (obj && typeof obj === "object") ? obj : null;
  } catch (err) { return null; }
}

/** Returns the folder id (string), creating the folder on first use. */
function getFolder_(props) {
  var fid = props.getProperty("FOLDER_ID");
  if (fid) {
    try {
      var f = Drive.Files.get(fid, { fields: "id,trashed" });
      if (f && f.id && !f.trashed) return f.id;
    } catch (err) { /* deleted or unreachable — recreate below */ }
  }
  var folder = Drive.Files.create(
    { name: FOLDER_NAME, mimeType: "application/vnd.google-apps.folder" },
    null,
    { fields: "id,webViewLink" }
  );
  props.setProperty("FOLDER_ID", folder.id);
  return folder.id;
}

/** Returns { id, name } of an existing upload for this photo id, or null. */
function findById_(folderId, id) {
  try {
    var safeId = id.replace(/'/g, "");
    var res = Drive.Files.list({
      q: "'" + folderId + "' in parents and name contains '" + safeId + "' and trashed = false",
      fields: "files(id,name)",
      pageSize: 10
    });
    var list = (res && res.files) || [];
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].name || "").indexOf(id) !== -1) return { id: list[i].id, name: list[i].name };
    }
  } catch (err) { /* search failure must not block the upload */ }
  return null;
}

// Counter lives in one script property as "yyyy-MM-dd:n". A short lock keeps
// two phones uploading at the same instant from both reading the same n.
function bumpDailyCount_(props) {
  var today = Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd");
  var lock = LockService.getScriptLock();
  var locked = false;
  try { locked = lock.tryLock(5000); } catch (err) { locked = false; }
  try {
    var cur = String(props.getProperty("DAY_COUNT") || "");
    var n = 0;
    if (cur.indexOf(today + ":") === 0) n = parseInt(cur.slice(today.length + 1), 10) || 0;
    if (n >= DAILY_CAP) return false;
    props.setProperty("DAY_COUNT", today + ":" + (n + 1));
    return true;
  } finally {
    if (locked) { try { lock.releaseLock(); } catch (err) {} }
  }
}

function sanitize_(v, max) {
  return String(v == null ? "" : v).replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, max || 40);
}

function extFor_(mime) {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/heic" || mime === "image/heif") return "heic";
  return "jpg";
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
