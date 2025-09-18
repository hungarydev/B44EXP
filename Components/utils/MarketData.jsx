// services/marketData.js
const BASE_CCY = "USD";
const COINGECKO_KEY = "CG-958634suM9sAGmqguS1CVfVt";   // your CoinGecko key
const GOLDAPI_KEY   = "goldapi-yu5csmflvkmt9-io";       // your GoldAPI key

// === CACHE & RATE LIMIT ===
const TTL_MS = 60_000;
const MAX_CALLS_PER_MIN = 5;
const CACHE = {};
let windowStart = Date.now();
let callCount = 0;

const now = () => Date.now();
function resetWindowIfNeeded() { 
  if (now() - windowStart >= 60_000) { 
    windowStart = now(); 
    callCount = 0; 
  } 
}
function withinLimit() { 
  resetWindowIfNeeded(); 
  if (callCount >= MAX_CALLS_PER_MIN) return false; 
  callCount++; 
  return true; 
}
function getCached(k) { 
  const q = CACHE[k]; 
  if (!q) return null; 
  return (now() - q.ts <= TTL_MS) ? ({ ...q, source: "cached" }) : null; 
}
function setCache(k, price, source = "live") { 
  const q = { price, ts: now(), source }; 
  CACHE[k] = q; 
  return q; 
}

// === SYMBOL MAP & POINT VALUES ===
function mapSymbolToCode(symbol) {
  const s = symbol.toUpperCase();
  if (s === "BTG26" || s === "BTZ25") return "BTC";
  if (s === "GCG26" || s === "GCZ25") return "XAU";
  if (s === "SIG26" || s === "SIZ25") return "XAG";
  if (s === "PLJ26") return "XPT";
  if (s === "HGG26" || s === "HGZ25") return "XCU";
  return null;
}

export function getPointValue(symbol) {
  const s = symbol.toUpperCase();
  if (s === "GCG26" || s === "GCZ25") return 100;     // per $1 move
  if (s === "SIG26" || s === "SIZ25") return 5000;
  if (s === "HGG26" || s === "HGZ25") return 25000;
  if (s === "PLJ26") return 50;
  if (s === "BTG26" || s === "BTZ25") return 25;
  return 0;
}

// === SAFE FETCH ===
async function safeFetch(url, opts = {}) {
  if (!withinLimit()) return null;
  try { 
    return await fetch(url, opts); 
  } catch { 
    return null; 
  }
}

// === COINGECKO (BTC) ===
async function getBTCPriceUSD() {
  const key = `BTC_${BASE_CCY}`;
  const cached = getCached(key);
  const url = "https://pro-api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
  const headers = {};
  if (COINGECKO_KEY) headers["x-cg-pro-api-key"] = COINGECKO_KEY;

  const res = await safeFetch(url, { headers });
  if (res && res.ok) {
    const j = await res.json();
    const price = Number(j?.bitcoin?.usd ?? 0);
    if (price > 0) return setCache(key, price, "live");
  }
  if (cached) return cached;
  return { price: 0, ts: now(), source: "mock" };
}

// === GOLDAPI (XAU/XAG/XPT/XCU) ===
async function getGoldAPIPrice(code) {
  const key = `${code}_${BASE_CCY}`;
  const cached = getCached(key);
  if (!GOLDAPI_KEY) { 
    return cached ?? { price: 0, ts: now(), source: "mock" }; 
  }
  const url = `https://www.goldapi.io/api/${code}/USD`;
  const headers = { 
    "Content-Type": "application/json", 
    "x-access-token": GOLDAPI_KEY 
  };

  const res = await safeFetch(url, { headers });
  if (res && res.ok) {
    const j = await res.json();
    const price = Number(j?.price ?? j?.price_gram_24k ?? 0);
    if (price > 0) return setCache(key, price, "live");
  }
  if (cached) return cached;
  return { price: 0, ts: now(), source: "mock" };
}

// === PUBLIC API ===
export async function getQuote(symbol) {
  const code = mapSymbolToCode(symbol);
  if (!code) return { price: 0, ts: now(), source: "mock" };
  if (code === "BTC") return await getBTCPriceUSD();         // BTG26
  return await getGoldAPIPrice(code);                        // GCG26/SIG26/PLJ26/HGG26
}

export async function getQuotes(symbols) {
  const out = {};
  await Promise.all(symbols.map(async s => { 
    out[s] = await getQuote(s); 
  }));
  return out;
}