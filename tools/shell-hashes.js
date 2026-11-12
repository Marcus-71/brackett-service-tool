// Writes SHELL_HASHES in sw.js: the SHA-256 (first 20 hex digits) of every APP_SHELL file, so a
// phone that updates copies the files that did not change from its old cache instead of
// downloading them again (see the comment above SHELL_HASHES in sw.js for the rules).
//
//   node tools/shell-hashes.js            regenerate the list in sw.js (run AFTER `git add` of the
//                                         changed files, as the last step before the commit)
//   node tools/shell-hashes.js --check    change nothing; publish gate / pre-commit hook. Exit 1
//                                         only for a list that phones would trust but that is
//                                         wrong (see the three states where --check is handled)
//   node tools/shell-hashes.js --disk     hash the files as they sit on disk instead of the git
//                                         index. ONLY for a folder that holds the files exactly as
//                                         the web host serves them (a test rig, a git archive made
//                                         with core.autocrlf=false). Never in the working copy:
//                                         its files have CRLF line ends, the published ones LF, so
//                                         every hash would be wrong (harmless - phones would just
//                                         download everything - but useless).
//
// The hashes are taken from the git INDEX (what the commit will publish), not from the working
// files. A list that is not regenerated is safe: sw.js only trusts it when the app.js it has just
// downloaded matches the list's own app.js hash, and every version changes app.js. The one thing
// that must never happen is regenerating the list and THEN changing another app file without
// regenerating again - hence "last step before the commit" and the --check gate.
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { execFileSync } = require("child_process");

const root = path.join(__dirname, "..");
const check = process.argv.includes("--check");
const disk = process.argv.includes("--disk");
const swPath = path.join(root, "sw.js");
const sw = fs.readFileSync(swPath, "utf8");

const shell = sw.match(/const APP_SHELL = \[([\s\S]*?)\];/);
if (!shell) { console.error("shell-hashes: APP_SHELL not found in sw.js"); process.exit(1); }
const files = [...shell[1].matchAll(/"(\.\/[^"]*)"/g)].map((m) => m[1]).filter((u) => u !== "./");
if (files.length < 10 || !files.includes("./app.js")) { console.error("shell-hashes: APP_SHELL looks wrong (" + files.length + " files)"); process.exit(1); }

const bytesOf = (rel) => disk
  ? fs.readFileSync(path.join(root, rel))
  : execFileSync("git", ["cat-file", "blob", ":" + rel], { cwd: root, maxBuffer: 256 * 1024 * 1024 });
const list = {};
for (const url of files) {
  const rel = url.slice(2);
  let bytes;
  try { bytes = bytesOf(rel); } catch (e) { console.error("shell-hashes: cannot read " + rel + (disk ? "" : " from the git index (is it added?)")); process.exit(1); }
  list[url] = crypto.createHash("sha256").update(bytes).digest("hex").slice(0, 20);
}

const block = /(\/\/ SHELL_HASHES:BEGIN\r?\n)const SHELL_HASHES = \{[\s\S]*?\};(\r?\n\/\/ SHELL_HASHES:END)/;
const now = sw.match(block);
if (!now) { console.error("shell-hashes: SHELL_HASHES block not found in sw.js"); process.exit(1); }
const eol = /\r\n/.test(now[1]) ? "\r\n" : "\n";
const text = "const SHELL_HASHES = {" + eol + files.map((u) => "  " + JSON.stringify(u) + ": " + JSON.stringify(list[u]) + ",").join(eol) + eol + "};";
const next = sw.replace(block, (all, a, b) => a + text + b);

if (check) {
  // Three states. MATCH: every hash is right - phones reuse unchanged files. STALE: the list's
  // app.js hash is not this app.js - sw.js ignores the whole list and phones download everything,
  // as before this feature (safe, only slower). WRONG: the list's app.js hash IS this app.js but
  // another file's hash is not that file - phones would trust the list and keep an old copy of
  // that file. Only WRONG fails.
  if (next === sw) { console.log("shell-hashes: MATCH - list matches the " + files.length + " staged files"); process.exit(0); }
  let had = {};
  try { had = JSON.parse(now[0].slice(now[0].indexOf("{"), now[0].lastIndexOf("}") + 1).replace(/,(\s*)\}$/, "$1}")); } catch (e) { had = null; }
  if (had && had["./app.js"] !== list["./app.js"]) { console.log("shell-hashes: STALE (safe) - the list was not made for this app.js; phones will download every file. Run  node tools/shell-hashes.js  then  git add sw.js  to turn reuse on."); process.exit(0); }
  const wrong = had ? files.filter((u) => had[u] !== list[u]) : ["(list unreadable)"];
  console.error("shell-hashes: WRONG - the list matches app.js but not " + wrong.join(", ") + ". Phones would keep their old copy. Run  node tools/shell-hashes.js  and  git add sw.js  before committing.");
  process.exit(1);
} else if (next === sw) {
  console.log("shell-hashes: already up to date (" + files.length + " files)");
} else {
  fs.writeFileSync(swPath, next);
  console.log("shell-hashes: wrote " + files.length + " hashes into sw.js" + (disk ? " (from disk)" : " (from the git index) - now  git add sw.js"));
}
