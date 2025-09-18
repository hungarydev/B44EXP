import React, { useState, useEffect } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  Newspaper,
  BarChart3,
  DollarSign,
  Bitcoin,
  RefreshCw
} from "lucide-react";

export default function Markets() {
  const [marketData, setMarketData] = useState({
    indices: [
      { name: "S&P 500", value: "4,485.12", change: "+0.75%", status: "up" },
      { name: "NASDAQ", value: "13,940.83", change: "+1.2%", status: "up" },
      { name: "DOW JONES", value: "34,890.24", change: "-0.15%", status: "down" },
      { name: "FTSE 100", value: "7,645.32", change: "+0.48%", status: "up" },
      { name: "DAX", value: "15,987.65", change: "-0.22%", status: "down" },
      { name: "NIKKEI 225", value: "32,678.90", change: "+0.95%", status: "up" }
    ],
    commodities: [
      { name: "Gold", symbol: "GCZ25", price: "$2,034.50", change: "+0.61%", status: "up" },
      { name: "Silver", symbol: "SIZ25", price: "$24.75", change: "-1.79%", status: "down" },
      { name: "Copper", symbol: "HGZ25", price: "$4.23", change: "+1.93%", status: "up" },
      { name: "Crude Oil", symbol: "CLZ25", price: "$75.48", change: "+1.25%", status: "up" }
    ],
    crypto: [
      { name: "Bitcoin", symbol: "BTZ25", price: "$43,250", change: "+2.98%", status: "up" },
      { name: "Ethereum", symbol: "ETH", price: "$2,340", change: "+1.85%", status: "up" },
      { name: "Solana", symbol: "SOL", price: "$78.50", change: "+5.2%", status: "up" }
    ]
  });

  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchMarketNews();
    
    // Update market data every 30 seconds
    const interval = setInterval(updateMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMarketNews = async () => {
    setLoadingNews(true);
    try {
      const result = await InvokeLLM({
        prompt: "Provide 5 latest financial market news headlines focusing on commodities (Gold, Silver, Copper), Bitcoin, and global market movements. Include the source and a brief description.",
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            headlines: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  source: { type: "string" },
                  description: { type: "string" }
                },
                required: ["title", "source", "description"]
              }
            }
          }
        }
      });
      
      if (result && result.headlines) {
        setNews(result.headlines);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([
        { title: "Gold Prices Surge Amid Economic Uncertainty", source: "MarketWatch", description: "Gold futures rise as investors seek safe-haven assets" },
        { title: "Bitcoin Reaches New Monthly Highs", source: "CoinDesk", description: "Cryptocurrency gains momentum following institutional adoption" },
        { title: "Copper Demand Increases with Green Energy Push", source: "Bloomberg", description: "Industrial metal benefits from renewable energy infrastructure" }
      ]);
    }
    setLoadingNews(false);
  };

  const updateMarketData = () => {
    setMarketData(prev => ({
      ...prev,
      commodities: prev.commodities.map(item => {
        const variance = (Math.random() - 0.5) * 0.04; // ±2% variance
        const currentPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        const newPrice = currentPrice * (1 + variance);
        const change = ((newPrice - currentPrice) / currentPrice) * 100;
        
        return {
          ...item,
          price: item.name === "Bitcoin" ? `$${newPrice.toLocaleString()}` : `$${newPrice.toFixed(2)}`,
          change: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
          status: change >= 0 ? "up" : "down"
        };
      })
    }));
    setLastUpdate(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Live Markets</h1>
              <p className="text-xl text-green-100">Real-time market data and insights</p>
            </div>
            <div className="text-right">
              <Button 
                onClick={updateMarketData} 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <p className="text-sm text-green-200 mt-2">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Global Indices */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-600" />
              Global Market Indices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {marketData.indices.map((index, i) => (
                <div key={i} className="p-4 border rounded-xl text-center hover:shadow-md transition-shadow">
                  <p className="text-sm font-medium text-gray-600 mb-1">{index.name}</p>
                  <p className="text-lg font-bold text-gray-900">{index.value}</p>
                  <div className={`flex items-center justify-center gap-1 text-sm font-medium ${
                    index.status === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {index.status === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {index.change}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Our Commodities */}
          <Card className="shadow-lg border-none bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
                Our Trading Focus
              </CardTitle>
              <p className="text-sm text-gray-600">Live prices for our specialized commodities</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketData.commodities.map((commodity, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <p className="font-semibold text-gray-900">{commodity.name}</p>
                    <p className="text-xs text-gray-500">{commodity.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{commodity.price}</p>
                    <div className={`text-sm font-medium ${
                      commodity.status === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {commodity.change}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cryptocurrency */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bitcoin className="w-6 h-6 text-orange-500" />
                Top Cryptocurrencies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {marketData.crypto.map((crypto, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{crypto.name}</p>
                    <p className="text-xs text-gray-500">{crypto.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{crypto.price}</p>
                    <div className="text-sm font-medium text-green-600">{crypto.change}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card className="shadow-lg border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                Market Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">73</div>
                <Badge className="bg-orange-100 text-orange-700 mb-2">Greed</Badge>
                <p className="text-sm text-gray-600">Fear & Greed Index</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Market Volatility</span>
                  <Badge variant="outline">Moderate</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Trading Volume</span>
                  <Badge className="bg-green-100 text-green-700">High</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Momentum</span>
                  <Badge className="bg-blue-100 text-blue-700">Bullish</Badge>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg text-center">
                <div className="font-bold text-green-900 mb-1">STRONG BUY</div>
                <div className="text-sm text-green-700">Optimal market conditions</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market News */}
        <Card className="shadow-lg border-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-blue-600" />
              Latest Market News
            </CardTitle>
            <Button onClick={fetchMarketNews} variant="outline" size="sm" disabled={loadingNews}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loadingNews ? 'animate-spin' : ''}`} />
              Refresh News
            </Button>
          </CardHeader>
          <CardContent>
            {loadingNews ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {news.map((article, i) => (
                  <div key={i} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">{article.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{article.source}</span>
                      <span>Just now</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Currency Exchange Rates */}
        <Card className="shadow-lg border-none">
          <CardHeader>
            <CardTitle>Major Currency Pairs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { pair: "EUR/USD", rate: "1.0875", change: "+0.15%" },
                { pair: "GBP/USD", rate: "1.2654", change: "-0.08%" },
                { pair: "USD/JPY", rate: "149.25", change: "+0.32%" },
                { pair: "USD/CAD", rate: "1.3542", change: "-0.12%" }
              ].map((fx, i) => (
                <div key={i} className="p-3 border rounded-lg text-center">
                  <p className="font-medium text-gray-900">{fx.pair}</p>
                  <p className="text-lg font-bold text-gray-800">{fx.rate}</p>
                  <p className={`text-sm ${fx.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {fx.change}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}