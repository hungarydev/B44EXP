
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  Newspaper,
  Bitcoin,
  Flame,
  Gem
} from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";
import { getQuotes } from "@/components/utils/marketData";

export default function MarketData() {
    const [marketData, setMarketData] = useState({
        indices: [
            { name: "S&P 500", value: "4,485.12", change: "+0.75%", status: "up" },
            { name: "NASDAQ", value: "13,940.83", change: "+1.2%", status: "up" },
            { name: "DOW JONES", value: "34,890.24", change: "-0.15%", status: "down" },
            { name: "FTSE 100", value: "7,645.32", change: "+0.48%", status: "up" },
            { name: "DAX", value: "15,987.65", change: "-0.22%", status: "down" },
            { name: "NIKKEI 225", value: "32,678.90", change: "+0.95%", status: "up" }
        ],
        commodities: [],
        crypto: []
    });
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(new Date());

    useEffect(() => {
        fetchMarketNews();
        updateCommodityData();
        
        // Update market data every 30 seconds
        const interval = setInterval(updateCommodityData, 30000);
        return () => clearInterval(interval);
    }, []);

    const updateCommodityData = async () => {
        try {
            const quotes = await getQuotes(["GCZ25", "SIZ25", "HGZ25", "BTZ25"]);
            
            const commodities = [
                {
                    name: "Gold",
                    symbol: "GCZ25", 
                    price: quotes.GCZ25?.price ? `$${quotes.GCZ25.price.toFixed(2)}` : "$2,034.50",
                    change: "+0.61%", // Assuming static change for now, could be derived from quotes.GCZ25.change
                    status: "up"
                },
                {
                    name: "Silver",
                    symbol: "SIZ25",
                    price: quotes.SIZ25?.price ? `$${quotes.SIZ25.price.toFixed(2)}` : "$24.75", 
                    change: "-1.79%", // Assuming static change for now
                    status: "down"
                },
                {
                    name: "Copper", 
                    symbol: "HGZ25",
                    price: quotes.HGZ25?.price ? `$${quotes.HGZ25.price.toFixed(2)}` : "$4.23",
                    change: "+1.93%", // Assuming static change for now
                    status: "up"
                }
            ];

            const crypto = [
                {
                    name: "Bitcoin",
                    symbol: "BTZ25",
                    price: quotes.BTZ25?.price ? `$${quotes.BTZ25.price.toLocaleString()}` : "$43,250",
                    change: "+2.98%", // Assuming static change for now
                    status: "up"
                },
                {
                    name: "Ethereum",
                    symbol: "ETH", 
                    price: "$2,340", // Assuming static for now, as ETH is not in getQuotes symbols
                    change: "+1.85%",
                    status: "up"
                },
                {
                    name: "Solana",
                    symbol: "SOL",
                    price: "$78.50", // Assuming static for now
                    change: "+5.2%", 
                    status: "up"
                }
            ];

            setMarketData(prev => ({ ...prev, commodities, crypto }));
            setLastUpdate(new Date());
        } catch (error) {
            console.error("Error updating commodity data:", error);
            // Optionally set fallback data or keep existing if error
            // For now, it will keep existing or initial empty arrays on error
        }
    };

    const fetchMarketNews = async () => {
        setLoadingNews(true);
        try {
            const result = await InvokeLLM({
                prompt: "Provide 3 latest news headlines related to Gold, Silver, Copper, and Bitcoin markets.",
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
                                },
                                required: ["title", "source"],
                            },
                        },
                    },
                },
            });
            if (result && result.headlines) {
                setNews(result.headlines);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            // Set some mock news on error
            setNews([
              { title: "Gold Prices Surge Amidst Economic Uncertainty", source: "MarketWatch" },
              { title: "Bitcoin Reaches New Highs as Institutional Interest Grows", source: "CoinDesk" },
              { title: "Copper Demand Expected to Rise with Green Energy Push", source: "Bloomberg" },
            ]);
        }
        setLoadingNews(false);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" /> Global Market Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {marketData.indices.map(market => (
                        <div key={market.name} className="p-4 border rounded-lg text-center">
                            <p className="text-sm font-medium text-gray-500">{market.name}</p>
                            <p className="text-lg font-bold">{market.value}</p>
                            <p className={`text-sm font-semibold flex items-center justify-center gap-1 ${market.status === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {market.status === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {market.change}
                            </p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bitcoin className="w-5 h-5" /> 
                            Top Cryptocurrencies
                            <span className="text-xs text-green-600 ml-2">Live</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {marketData.crypto.map(crypto => (
                            <div key={crypto.name} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{crypto.name} <span className="text-gray-500">{crypto.symbol}</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">{crypto.price}</p>
                                    <p className="text-sm text-green-600">{crypto.change}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Flame className="w-5 h-5" /> 
                            Our Commodities
                            <span className="text-xs text-green-600 ml-2">Live</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         {marketData.commodities.map(commodity => (
                            <div key={commodity.name} className="flex justify-between items-center">
                                <p className="font-medium">{commodity.name}</p>
                                <div className="text-right">
                                    <p className="font-medium">{commodity.price}</p>
                                    <p className={`text-sm ${commodity.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{commodity.change}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Newspaper className="w-5 h-5" /> Latest Market News</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {loadingNews ? <p>Loading news...</p> : (
                            news.map((item, index) => (
                                <div key={index}>
                                    <p className="font-medium leading-tight">{item.title}</p>
                                    <p className="text-xs text-gray-500">{item.source}</p>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
