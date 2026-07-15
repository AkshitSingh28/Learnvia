/**
 * One-off reseed of the Phase-2 tracks + Phase-3 portals into Firestore, using the
 * Firebase CLI's stored login (the same credential `firebase deploy` uses). We mint a
 * short-lived access token from the refresh token and write via the Firestore REST API
 * (the admin-SDK gRPC client refuses non-ADC credentials).
 *
 * The seed data lives in TypeScript (src/lib/seed/phase2.ts, phase3.ts). Those files
 * only use `import type`, so transpileModule strips all imports and leaves self-contained
 * data we can require directly.
 */
const fs = require("fs");
const os = require("os");
const path = require("path");
const ts = require(path.join(__dirname, "..", "node_modules", "typescript"));

const ROOT = path.join(__dirname, "..");
const PROJECT_ID = "aarohan-2701b";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function loadSeed(relTsPath) {
  const src = fs.readFileSync(path.join(ROOT, relTsPath), "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
  }).outputText;
  const outFile = path.join(os.tmpdir(), `seed_${path.basename(relTsPath)}_${Date.now()}.cjs`);
  fs.writeFileSync(outFile, js);
  try { return require(outFile); } finally { fs.unlinkSync(outFile); }
}

// JS value → Firestore REST typed value.
function toValue(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } };
  if (typeof v === "object") return { mapValue: { fields: toFields(v) } };
  return { stringValue: String(v) };
}
function toFields(obj) {
  const fields = {};
  for (const [k, val] of Object.entries(obj)) {
    if (val === undefined) continue;
    fields[k] = toValue(val);
  }
  return fields;
}

async function getAccessToken() {
  const cfg = require(path.join(os.homedir(), ".config", "configstore", "firebase-tools.json"));
  const refresh_token = cfg.tokens && cfg.tokens.refresh_token;
  if (!refresh_token) throw new Error("No firebase-tools refresh token — run `firebase login` first.");
  const body = new URLSearchParams({
    client_id: "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com",
    client_secret: "j9iVZfS8kkCEFUPaAeJV0sAi",
    refresh_token,
    grant_type: "refresh_token",
  });
  const res = await fetch("https://oauth2.googleapis.com/token", { method: "POST", body });
  const json = await res.json();
  if (!json.access_token) throw new Error("Token exchange failed: " + JSON.stringify(json));
  return json.access_token;
}

async function api(token, method, urlPath, body) {
  const res = await fetch(BASE + urlPath, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${urlPath} → ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

async function listIds(token, coll) {
  const ids = [];
  let pageToken;
  do {
    const q = pageToken ? `?pageToken=${encodeURIComponent(pageToken)}&pageSize=300` : "?pageSize=300";
    const json = await api(token, "GET", `/${coll}${q}`);
    (json.documents || []).forEach((d) => ids.push(d.name.split("/").pop()));
    pageToken = json.nextPageToken;
  } while (pageToken);
  return ids;
}

async function main() {
  const token = await getAccessToken();

  const { tracks } = loadSeed("src/lib/seed/phase2.ts");
  const { portals } = loadSeed("src/lib/seed/phase3.ts");
  if (!Array.isArray(tracks) || !Array.isArray(portals)) throw new Error("Seed load failed");

  const upsert = async (coll, items) => {
    const keep = new Set(items.map((x) => x.id));
    const existing = await listIds(token, coll);
    const stale = existing.filter((id) => !keep.has(id));
    for (const id of stale) await api(token, "DELETE", `/${coll}/${id}`);
    // PATCH with no updateMask = full document overwrite (create or replace).
    for (const item of items) await api(token, "PATCH", `/${coll}/${item.id}`, { fields: toFields(item) });
    return { count: items.length, stale };
  };

  const t = await upsert("tracks", tracks);
  const p = await upsert("portals", portals);

  console.log(`Seeded ${t.count} tracks:`, tracks.map((x) => x.id).join(", "));
  console.log(`Seeded ${p.count} portals:`, portals.map((x) => x.id).join(", "));
  if (t.stale.length) console.log("Removed stale tracks:", t.stale.join(", "));
  if (p.stale.length) console.log("Removed stale portals:", p.stale.join(", "));
  console.log("Reseed complete.");
}

main().catch((e) => { console.error("Reseed failed:", e && e.message ? e.message : e); process.exit(1); });
