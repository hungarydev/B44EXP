
import React, { useState, useEffect } from 'react';
import { getAll, getMode } from '@/components/utils/marketService';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SYMBOLS = ["GCZ25", "SIZ25", "HGZ25", "PLJ26", "BTZ25"];
const SYMBOL_NAMES = {
  "GCZ25": "GOLD",
  "SIZ25": "SILVER",
  "HGZ25": "COPPER",
  "PLJ26": "PLATINUM",
  "BTZ25": "BTC"
};

// Local fallback object to ensure component resilience
const MOCK_PRICES_FALLBACK = {
  "GCZ25": { price: 2045.80, ts: Date.now(), source: 'MOCK' },
  "SIZ25": { price: 24.95, ts: Date.now(), source: 'MOCK' },
  "HGZ25": { price: 4.28, ts: Date.now(), source: 'MOCK' },
  "PLJ26": { price: 955.50, ts: Date.now(), source: 'MOCK' },
  "BTZ25": { price: 43500.00, ts: Date.now(), source: 'MOCK' },
};

const SkeletonCard = () => (
  <div className="card animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="h-8 bg-gray-700 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-700 rounded w-full"></div>
  </div>
);

export default function MarketWatch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async (options = {}) => {
    setLoading(true);
    setError(false);
    try {
      const result = await getAll(SYMBOLS, options);
      if (Object.values(result).every(d => d.source === 'MOCK' && getMode() === 'live')) {
        setError(true);
      }
      setData(result);
    } catch {
      setError(true);
      setData(MOCK_PRICES_FALLBACK); // Fallback to local mock on error
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => fetchData({ force: true });

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {SYMBOLS.map(s => <SkeletonCard key={s} />)}
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="card bg-yellow-900/50 border-yellow-700/50 mb-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <div>
              <h3 className="font-semibold text-yellow-200">Couldn’t load live data.</h3>
              <p className="text-sm text-yellow-300">
                You’re viewing safe mock prices. Try toggling Live or refreshing.
              </p>
            </div>
          </div>
        </div>
      )}
       <div className="flex justify-end mb-2">
         <Button onClick={handleRefresh} variant="ghost" size="sm" className="text-muted hover:text-white">
           <RefreshCw className="w-4 h-4 mr-2"/>
           Refresh
         </Button>
       </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {SYMBOLS.map(symbol => {
          const assetData = data?.[symbol];
          if (!assetData) return <SkeletonCard key={symbol} />;
          
          return (
            <div key={symbol} className="card p-4 rounded-2xl shadow border border-gray-800">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-white">{SYMBOL_NAMES[symbol]}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  assetData.source === 'LIVE' ? 'bg-green-500/20 text-green-300' :
                  assetData.source === 'CACHE' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>{assetData.source}</span>
              </div>
              <p className="text-2xl font-semibold my-2 text-white">
                ${assetData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-muted">
                {new Date(assetData.ts).toLocaleTimeString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
