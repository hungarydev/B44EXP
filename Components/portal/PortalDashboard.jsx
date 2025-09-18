import React, { useState, useEffect, useCallback } from "react";
import { Trade } from "@/entities/all";
import { getQuotes } from "@/components/utils/marketData";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  AlertTriangle,
  Target,
  Activity,
  Shield,
  ArrowRight,
  Plus
} from "lucide-react";

export default function PortalDashboard({ user }) {
  const [trades, setTrades] = useState([]);
  const [quotes, setQuotes] = useState({});
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    if (!user) return;
    
    try {
      const userTrades = await Trade.filter({ client_id: user.id });
      setTrades(userTrades);
      
      const symbols = [...new Set(userTrades.map(t => t.symbol))];
      if (symbols.length > 0) {
        const liveQuotes = await getQuotes(symbols);
        setQuotes(liveQuotes);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 60000);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  const calculateStats = () => {
    const activeTrades = trades.filter(t => t.status === 'active');
    
    let totalValue = 0;
    let totalPnL = 0;
    
    activeTrades.forEach(trade => {
      const currentPrice = quotes[trade.symbol]?.price || trade.current_price || trade.entry_price;
      const tradeValue = trade.contract_size * currentPrice;
      const tradePnL = (currentPrice - trade.entry_price) * trade.contract_size;
      
      totalValue += tradeValue;
      totalPnL += tradePnL;
    });
    
    return {
      portfolioValue: totalValue,
      totalPnL,
      activeTrades: activeTrades.length,
      monthlyReturn: 18.7,
      successRate: 87.5
    };
  };

  const generateSparklineData = () => Array.from({ length: 12 }, () => Math.random() * 40 + 30);

  const stats = calculateStats();

  const KPICard = ({ label, value, delta, deltaType, sparklineData }) => (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <span className="text-muted text-sm font-medium">{label}</span>
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          deltaType === 'positive' ? 'badge-success' : 
          deltaType === 'negative' ? 'badge-danger' : 
          'text-muted'
        }`}>
          {deltaType === 'positive' && '▲'}
          {deltaType === 'negative' && '▼'}
          {delta}
        </div>
      </div>
      <div className="text-2xl font-bold mb-3" style={{color: 'var(--text)'}}>{value}</div>
      <div className="sparkline">
        {sparklineData.map((height, i) => (
          <div key={i} className="sparkline-bar" style={{height: `${height}%`}} />
        ))}
      </div>
    </div>
  );

  const DonutChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-6" style={{color: 'var(--text)'}}>Portfolio Allocation</h3>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="50" fill="none" stroke="var(--border)" strokeWidth="12" />
              {/* Mock donut segments */}
              <circle cx="64" cy="64" r="50" fill="none" stroke="var(--gold)" strokeWidth="12" 
                      strokeDasharray="94.2" strokeDashoffset="0" />
              <circle cx="64" cy="64" r="50" fill="none" stroke="var(--silver)" strokeWidth="12" 
                      strokeDasharray="62.8" strokeDashoffset="-94.2" />
              <circle cx="64" cy="64" r="50" fill="none" stroke="var(--primary)" strokeWidth="12" 
                      strokeDasharray="47.1" strokeDashoffset="-157" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xs text-muted">Total Value</div>
              <div className="text-lg font-bold" style={{color: 'var(--text)'}}>
                ${stats.portfolioValue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            { symbol: 'GCZ25', name: 'Gold', percent: 35, color: 'var(--gold)' },
            { symbol: 'SIZ25', name: 'Silver', percent: 25, color: 'var(--silver)' },
            { symbol: 'BTZ25', name: 'Bitcoin', percent: 20, color: 'var(--primary)' },
            { symbol: 'HGZ25', name: 'Copper', percent: 20, color: 'var(--info)' }
          ].map(item => (
            <div key={item.symbol} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{background: item.color}} />
                <span style={{color: 'var(--text)'}}>{item.name}</span>
              </div>
              <span className="text-muted">{item.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PnLHeatmap = () => {
    const heatmapData = [
      { symbol: 'GCZ25', pnl: 12.5, date: 'Dec 15' },
      { symbol: 'SIZ25', pnl: -3.2, date: 'Dec 14' },
      { symbol: 'HGZ25', pnl: 8.7, date: 'Dec 13' },
      { symbol: 'BTZ25', pnl: 24.3, date: 'Dec 12' },
      { symbol: 'PLJ26', pnl: -1.8, date: 'Dec 11' },
      { symbol: 'GCZ25', pnl: 15.2, date: 'Dec 10' },
      { symbol: 'SIZ25', pnl: 4.1, date: 'Dec 9' },
      { symbol: 'BTZ25', pnl: -7.3, date: 'Dec 8' }
    ];

    const getHeatmapColor = (pnl) => {
      if (pnl > 15) return 'var(--success)';
      if (pnl > 5) return 'rgba(44, 182, 125, 0.6)';
      if (pnl > 0) return 'rgba(44, 182, 125, 0.3)';
      if (pnl > -5) return 'rgba(229, 72, 77, 0.3)';
      return 'var(--danger)';
    };

    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4" style={{color: 'var(--text)'}}>P&L Heatmap</h3>
        <div className="grid grid-cols-4 gap-2">
          {heatmapData.map((item, i) => (
            <div 
              key={i}
              className="aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
              style={{ 
                background: getHeatmapColor(item.pnl),
                color: Math.abs(item.pnl) > 5 ? 'white' : 'var(--text)'
              }}
              title={`${item.symbol} ${item.date}: ${item.pnl > 0 ? '+' : ''}${item.pnl}%`}
            >
              <div>{item.symbol.slice(0, 3)}</div>
              <div>{item.pnl > 0 ? '+' : ''}{item.pnl}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* KPI Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
        
        {/* Charts Skeleton */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
            <div className="h-32 bg-gray-700 rounded-full w-32 mx-auto mb-6"></div>
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="h-4 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
          <div className="card animate-pulse">
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="aspect-square bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (trades.length === 0) {
    return (
      <div className="card text-center py-16">
        <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" style={{color: 'var(--text-muted)'}} />
        <h3 className="text-xl font-semibold mb-2" style={{color: 'var(--text)'}}>No Active Positions</h3>
        <p className="text-muted mb-6">Get started by exploring our current trading opportunities</p>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          View Trading Signals
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2" style={{color: 'var(--text)'}}>
              Welcome back, {user?.full_name}
            </h2>
            <p className="text-muted">Your portfolio is performing well today</p>
          </div>
          <Shield className="w-12 h-12" style={{color: 'var(--primary)'}} />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          label="Portfolio Value"
          value={`$${stats.portfolioValue.toLocaleString()}`}
          delta="+12.5%"
          deltaType="positive"
          sparklineData={generateSparklineData()}
        />
        <KPICard 
          label="Monthly Returns"
          value={`+${stats.monthlyReturn}%`}
          delta="+3.2%"
          deltaType="positive"
          sparklineData={generateSparklineData()}
        />
        <KPICard 
          label="Active Trades"
          value={stats.activeTrades}
          delta="+2"
          deltaType="positive"
          sparklineData={generateSparklineData()}
        />
        <KPICard 
          label="Success Rate"
          value={`${stats.successRate}%`}
          delta="+2.1%"
          deltaType="positive"
          sparklineData={generateSparklineData()}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <DonutChart data={[]} />
        <PnLHeatmap />
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold" style={{color: 'var(--text)'}}>Recent Activity</h3>
          <button className="btn-secondary text-sm">
            View All <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
        <div className="space-y-3">
          {trades.slice(0, 5).map((trade, i) => {
            const livePrice = quotes[trade.symbol]?.price;
            const currentPrice = livePrice || trade.current_price || trade.entry_price;
            const profitLoss = (currentPrice - trade.entry_price) * trade.contract_size;
            
            return (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{background: 'var(--elev)'}}>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    profitLoss > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="font-medium" style={{color: 'var(--text)'}}>{trade.commodity}</div>
                    <div className="text-sm text-muted">{trade.position_type.toUpperCase()} • {trade.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${
                    profitLoss > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {profitLoss > 0 ? '+' : ''}${profitLoss.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted">
                    {livePrice && <span className="text-blue-400">Live</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}