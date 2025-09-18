// src/services/marketData.js - Renamed and upgraded as per objectives

const MOCK_PRICES = {
  "GCZ25": { price: 2045.80, ts: Date.now(), source: 'MOCK' },
  "SIZ25": { price: 24.95, ts: Date.now(), source: 'MOCK' },
  "HGZ25": { price: 4.28, ts: Date.now(), source: 'MOCK' },
  "BTZ25": { price: 43500.00, ts: Date.now(), source: 'MOCK' },
  "PLJ26": { price: 955.50, ts: Date.now(), source: 'MOCK' },
};

const GOLDAPI_KEY = "goldapi-yu5csmflvkmt9-io";
const MEMORY_CACHE = {};
const STORAGE_KEY = 'marketCache:v1';
const MODE_KEY = 'marketMode';

let currentMode = 'mock';

// --- Private Helpers ---

function getStorageCache() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setStorageCache(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to write to localStorage", e);
  }
}

function mapSymbolToCode(symbol) {
  const s = symbol.toUpperCase();
  if (s === "BTZ25") return "BTC"; // Coingecko
  if (s === "GCZ25") return "XAU"; // GoldAPI
  if (s === "SIZ25") return "XAG"; // GoldAPI
  if (s === "PLJ26") return "XPT"; // GoldAPI - Platinum
  if (s === "HGZ25") return "XCU"; // GoldAPI - Copper
  return null;
}

async function fetchFromGoldAPI(code) {
    if (!GOLDAPI_KEY) return null;
    try {
        const res = await fetch(`https://www.goldapi.io/api/${code}/USD`, {
            headers: { "x-access-token": GOLDAPI_KEY }
        });
        if (!res.ok) return null;
        const data = await res.json();
        return { asset: code, price: data.price, ts: Date.now(), source: 'LIVE' };
    } catch {
        return null;
    }
}

// For now, BTC is mocked as GoldAPI doesn't support it.
// A real implementation would use CoinGecko or another crypto API.
async function fetchBTC() {
    return { asset: 'BTC', price: MOCK_PRICES.BTZ25.price, ts: Date.now(), source: 'MOCK' };
}


// --- Public API ---

export function setMode(mode) {
  if (mode === 'live' || mode === 'mock') {
    currentMode = mode;
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {}
  }
}

export function getMode() {
  try {
    const storedMode = localStorage.getItem(MODE_KEY);
    const urlParams = new URLSearchParams(window.location.search);
    const urlMode = urlParams.get('mode');

    if (urlMode === 'live' || urlMode === 'mock') {
      currentMode = urlMode;
      localStorage.setItem(MODE_KEY, urlMode);
      return urlMode;
    }
    if (storedMode === 'live' || storedMode === 'mock') {
      currentMode = storedMode;
      return storedMode;
    }
  } catch {}
  return 'mock';
}

export async function getAsset(symbol, options = {}) {
    const force = options.force || false;
    const now = Date.now();

    // 1. Handle Mock Mode
    if (getMode() === 'mock' && !force) {
        return MOCK_PRICES[symbol] || null;
    }
    
    // 2. Check Memory Cache (10s TTL)
    if (!force && MEMORY_CACHE[symbol] && (now - MEMORY_CACHE[symbol].ts < 10000)) {
        return { ...MEMORY_CACHE[symbol], source: 'CACHE' };
    }

    // 3. Check Storage Cache (60s TTL)
    const storageCache = getStorageCache();
    if (!force && storageCache && storageCache[symbol] && (now - storageCache[symbol].ts < 60000)) {
        MEMORY_CACHE[symbol] = storageCache[symbol]; // warm up memory cache
        return { ...storageCache[symbol], source: 'CACHE' };
    }
    
    // 4. Fetch Live Data
    const code = mapSymbolToCode(symbol);
    let liveData = null;
    if (code === 'BTC') {
        liveData = await fetchBTC();
    } else if (code) {
        liveData = await fetchFromGoldAPI(code);
    }

    // 5. Success: Update caches and return
    if (liveData && liveData.price) {
        MEMORY_CACHE[symbol] = liveData;
        const currentStorage = getStorageCache() || {};
        currentStorage[symbol] = liveData;
        setStorageCache(currentStorage);
        return liveData;
    }

    // 6. Fallback Strategy
    if (MEMORY_CACHE[symbol]) return { ...MEMORY_CACHE[symbol], source: 'CACHE (Stale)' };
    if (storageCache && storageCache[symbol]) return { ...storageCache[symbol], source: 'CACHE (Stale)' };
    return MOCK_PRICES[symbol]; // Final fallback
}


export async function getAll(symbols, options = {}) {
    const results = {};
    const promises = symbols.map(symbol => getAsset(symbol, options).then(data => {
        results[symbol] = data;
    }));
    await Promise.all(promises);
    return results;
}

// Initialize mode on load
getMode();