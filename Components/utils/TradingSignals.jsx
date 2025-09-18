import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Zap,
    BarChart,
    BrainCircuit,
    ChevronRight,
    Loader2
} from "lucide-react";
import { InvokeLLM } from "@/integrations/Core";

const initialSignals = [
    { commodity: "Gold", signal: "Strong Buy", confidence: "92%", reason: "Bullish MACD crossover and positive inflation data." },
    { commodity: "Silver", signal: "Hold", confidence: "78%", reason: "Consolidating within a key range, awaiting breakout." },
];

export default function TradingSignals() {
    const [signals, setSignals] = useState(initialSignals);
    const [loading, setLoading] = useState(false);
    const [selectedSignal, setSelectedSignal] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);

    const refreshSignals = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setSignals([
                { commodity: "Gold", signal: "Strong Buy", confidence: "93%", reason: "Updated inflation data strengthens bullish case." },
                { commodity: "Silver", signal: "Buy", confidence: "85%", reason: "Breakout above resistance confirmed." },
                { commodity: "Copper", signal: "Hold", confidence: "75%", reason: "Industrial demand indicators are mixed." },
                { commodity: "Bitcoin", signal: "Strong Buy", confidence: "95%", reason: "Positive on-chain metrics and ETF inflows." }
            ]);
            setLoading(false);
        }, 1500);
    };
    
    const getAnalysis = async (commodity) => {
        setSelectedSignal(commodity);
        setAnalysis("");
        setLoadingAnalysis(true);
        try {
          const result = await InvokeLLM({
            prompt: `Provide a brief technical analysis for ${commodity}. Include key support and resistance levels, and the current trend outlook.`,
            add_context_from_internet: true,
          });
          setAnalysis(result);
        } catch (e) {
          setAnalysis(`Error fetching analysis for ${commodity}. Please try again.`);
        } finally {
          setLoadingAnalysis(false);
        }
    };

    const getSignalColor = (signal) => {
        if (signal.includes("Buy")) return "bg-green-100 text-green-800";
        if (signal.includes("Sell")) return "bg-red-100 text-red-800";
        return "bg-gray-100 text-gray-800";
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            AI Trading Signals
                        </CardTitle>
                        <Button variant="outline" size="sm" onClick={refreshSignals} disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Refresh Signals
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {signals.map(signal => (
                            <div key={signal.commodity} className="p-4 border rounded-lg flex items-center justify-between hover:bg-gray-50 cursor-pointer" onClick={() => getAnalysis(signal.commodity)}>
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-gray-100 rounded-md"><BarChart /></div>
                                    <div>
                                        <p className="font-bold text-lg">{signal.commodity}</p>
                                        <p className="text-sm text-gray-500">{signal.reason}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <Badge className={getSignalColor(signal.signal)}>{signal.signal}</Badge>
                                    <p className="text-sm text-gray-500 mt-1">Conf: {signal.confidence}</p>
                                  </div>
                                  <ChevronRight className="text-gray-400"/>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-blue-500" />
                            Quick Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedSignal ? (
                        loadingAnalysis ? (
                           <div className="flex items-center justify-center h-48">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                           </div>
                        ) : (
                          <div>
                            <h3 className="font-bold text-lg mb-2">{selectedSignal} Analysis</h3>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{analysis}</p>
                          </div>
                        )
                      ) : (
                        <div className="text-center text-gray-500 py-10">
                            <p>Select a signal to view detailed analysis.</p>
                        </div>
                      )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}