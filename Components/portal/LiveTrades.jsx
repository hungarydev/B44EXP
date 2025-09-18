import React, { useState, useEffect } from "react";
import { Trade } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  DollarSign,
  Target
} from "lucide-react";
import { format } from "date-fns";

export default function LiveTrades({ user }) {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveData, setLiveData] = useState({
    GCZ25: { price: 2034.50, change: +12.30, changePercent: +0.61 },
    SIZ25: { price: 24.75, change: -0.45, changePercent: -1.79 },
    HGZ25: { price: 4.23, change: +0.08, changePercent: +1.93 },
    BTZ25: { price: 43250.00, change: +1250.00, changePercent: +2.98 }
  });

  useEffect(() => {
    const loadTrades = async () => {
      if (!user) return;
      
      try {
        const userTrades = await Trade.filter({ client_id: user.id });
        setTrades(userTrades);
      } catch (error) {
        console.error("Error loading trades:", error);
      }
      setLoading(false);
    };

    const updateLivePrices = () => {
      setLiveData(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(symbol => {
          const variance = (Math.random() - 0.5) * 0.02; // ±1% variance
          const newPrice = updated[symbol].price * (1 + variance);
          const change = newPrice - updated[symbol].price;
          const changePercent = (change / updated[symbol].price) * 100;
          
          updated[symbol] = {
            price: newPrice,
            change: change,
            changePercent: changePercent
          };
        });
        return updated;
      });
    };

    loadTrades();
    const interval = setInterval(updateLivePrices, 5000);
    return () => clearInterval(interval);
  }, [user]);

  const activeTrades = trades.filter(t => t.status === 'active');
  const closedTrades = trades.filter(t => t.status === 'closed');

  const getCommodityIcon = (commodity) => {
    const icons = {
      Gold: "🥇",
      Silver: "🥈", 
      Copper: "🔶",
      Bitcoin: "₿"
    };
    return icons[commodity] || "📊";
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Market Prices */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Live Market Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(liveData).map(([symbol, data]) => {
              const commodity = { GCZ25: 'Gold', SIZ25: 'Silver', HGZ25: 'Copper', BTZ25: 'Bitcoin' }[symbol];
              return (
                <div key={symbol} className="p-4 border rounded-lg text-center">
                  <div className="text-2xl mb-1">{getCommodityIcon(commodity)}</div>
                  <div className="font-medium text-sm">{symbol}</div>
                  <div className="text-lg font-bold">${data.price.toFixed(2)}</div>
                  <div className={`text-sm flex items-center justify-center gap-1 ${
                    data.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Trades Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Trades ({activeTrades.length})</TabsTrigger>
          <TabsTrigger value="history">Trade History ({closedTrades.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeTrades.length > 0 ? (
            activeTrades.map((trade) => (
              <Card key={trade.id} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getCommodityIcon(trade.commodity)}</div>
                      <div>
                        <div className="font-bold text-lg">{trade.commodity}</div>
                        <div className="text-gray-600">{trade.symbol}</div>
                      </div>
                    </div>
                    <Badge className={`${
                      trade.position_type === 'call' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {trade.position_type.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Entry Price</div>
                      <div className="font-medium">${trade.entry_price?.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Current Price</div>
                      <div className="font-medium">${liveData[trade.symbol]?.price.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">P&L</div>
                      <div className={`font-medium ${
                        (trade.profit_loss || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(trade.profit_loss || 0) >= 0 ? '+' : ''}${(trade.profit_loss || 0).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Return</div>
                      <div className={`font-medium ${
                        (trade.profit_loss_percentage || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(trade.profit_loss_percentage || 0) >= 0 ? '+' : ''}{(trade.profit_loss_percentage || 0).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Opened: {format(new Date(trade.purchase_date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Expires: {format(new Date(trade.expiry_date), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-none shadow-lg">
              <CardContent className="text-center py-12">
                <Activity className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Trades</h3>
                <p className="text-gray-600">Your active trades will appear here when positions are opened.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {closedTrades.length > 0 ? (
            closedTrades.map((trade) => (
              <Card key={trade.id} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getCommodityIcon(trade.commodity)}</div>
                      <div>
                        <div className="font-bold text-lg">{trade.commodity}</div>
                        <div className="text-gray-600">{trade.symbol}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${
                        trade.position_type === 'call' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {trade.position_type.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">CLOSED</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Entry Price</div>
                      <div className="font-medium">${trade.entry_price?.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Exit Price</div>
                      <div className="font-medium">${trade.current_price?.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Final P&L</div>
                      <div className={`font-bold ${
                        (trade.profit_loss || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(trade.profit_loss || 0) >= 0 ? '+' : ''}${(trade.profit_loss || 0).toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Return</div>
                      <div className={`font-bold ${
                        (trade.profit_loss_percentage || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {(trade.profit_loss_percentage || 0) >= 0 ? '+' : ''}{(trade.profit_loss_percentage || 0).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="border-none shadow-lg">
              <CardContent className="text-center py-12">
                <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Trade History</h3>
                <p className="text-gray-600">Completed trades will appear here with final performance metrics.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}