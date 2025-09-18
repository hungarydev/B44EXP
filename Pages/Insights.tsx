import React, { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  TrendingUp,
  BarChart3,
  Target,
  Lightbulb,
  Award,
  Zap,
  FileText,
  Calendar
} from "lucide-react";

export default function Insights() {
  const [selectedCommodity, setSelectedCommodity] = useState("Gold");
  const [analysis, setAnalysis] = useState("");
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  const insights = [
    {
      title: "Q4 2024 Market Outlook",
      category: "Market Analysis",
      date: "Dec 15, 2024",
      summary: "Comprehensive analysis of commodity markets heading into 2025, highlighting key opportunities in precious metals and digital assets.",
      readTime: "8 min read"
    },
    {
      title: "Gold's Bull Run Continues",
      category: "Commodity Focus",
      date: "Dec 12, 2024", 
      summary: "Technical and fundamental analysis supporting our bullish stance on gold futures, with price targets and risk management strategies.",
      readTime: "6 min read"
    },
    {
      title: "Bitcoin Options Strategy",
      category: "Digital Assets",
      date: "Dec 10, 2024",
      summary: "How institutional adoption is creating new opportunities for options trading in cryptocurrency markets.",
      readTime: "10 min read"
    }
  ];

  const tradingSignals = [
    {
      commodity: "Gold (GCZ25)",
      signal: "STRONG BUY",
      confidence: "92%",
      target: "$2,100",
      analysis: "Bullish momentum with strong fundamental support"
    },
    {
      commodity: "Silver (SIZ25)", 
      signal: "BUY",
      confidence: "78%",
      target: "$26.50",
      analysis: "Industrial demand recovery driving price action"
    },
    {
      commodity: "Copper (HGZ25)",
      signal: "HOLD",
      confidence: "65%",
      target: "$4.45",
      analysis: "Consolidation phase before next move higher"
    },
    {
      commodity: "Bitcoin (BTZ25)",
      signal: "STRONG BUY", 
      confidence: "88%",
      target: "$50,000",
      analysis: "Institutional inflows supporting upward trajectory"
    }
  ];

  const keyMetrics = [
    { label: "Portfolio Success Rate", value: "87.5%", change: "+2.3%" },
    { label: "Average Trade Duration", value: "4.2 months", change: "-0.8%" },
    { label: "Risk-Adjusted Returns", value: "145.7%", change: "+12.4%" },
    { label: "Maximum Drawdown", value: "8.2%", change: "-1.1%" }
  ];

  const getAnalysis = async (commodity) => {
    setSelectedCommodity(commodity);
    setLoadingAnalysis(true);
    try {
      const result = await InvokeLLM({
        prompt: `Provide a detailed technical and fundamental analysis for ${commodity} including key support/resistance levels, market drivers, and short-term outlook. Focus on options trading opportunities.`,
        add_context_from_internet: true
      });
      setAnalysis(result);
    } catch (error) {
      setAnalysis(`Analysis for ${commodity} is temporarily unavailable. Our team is working to provide updated insights.`);
    }
    setLoadingAnalysis(false);
  };

  const getSignalColor = (signal) => {
    if (signal.includes("STRONG BUY")) return "bg-green-600 text-white";
    if (signal.includes("BUY")) return "bg-green-100 text-green-800";
    if (signal.includes("SELL")) return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Market Insights</h1>
          <p className="text-xl text-green-100">Professional analysis and trading signals from our 50+ analyst team</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="signals" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-14">
            <TabsTrigger value="signals" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Trading Signals
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Deep Analysis
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Market Reports
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Performance
            </TabsTrigger>
          </TabsList>

          {/* Trading Signals */}
          <TabsContent value="signals" className="space-y-6">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Live Trading Signals
                </CardTitle>
                <p className="text-gray-600">AI-powered signals updated in real-time by our analyst team</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {tradingSignals.map((signal, i) => (
                    <div key={i} className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{signal.commodity}</h3>
                          <p className="text-sm text-gray-600">{signal.analysis}</p>
                        </div>
                        <Badge className={getSignalColor(signal.signal)}>{signal.signal}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Confidence:</span>
                          <span className="font-medium ml-1">{signal.confidence}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Target:</span>
                          <span className="font-medium ml-1">{signal.target}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deep Analysis */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="shadow-lg border-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-6 h-6 text-blue-600" />
                      Commodity Analysis: {selectedCommodity}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingAnalysis ? (
                      <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      </div>
                    ) : (
                      <div className="prose max-w-none">
                        {analysis ? (
                          <p className="text-gray-700 whitespace-pre-wrap">{analysis}</p>
                        ) : (
                          <p className="text-gray-500 text-center py-12">
                            Select a commodity to view detailed analysis
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="shadow-lg border-none">
                  <CardHeader>
                    <CardTitle>Select Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {["Gold", "Silver", "Copper", "Bitcoin"].map((commodity) => (
                      <Button
                        key={commodity}
                        variant={selectedCommodity === commodity ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => getAnalysis(commodity)}
                      >
                        <BarChart3 className="w-4 h-4 mr-2" />
                        {commodity} Analysis
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-none mt-6">
                  <CardHeader>
                    <CardTitle>Market Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <div className="font-bold text-green-900">BULLISH</div>
                      <div className="text-sm text-green-700">Overall Market Sentiment</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Volatility Index:</span>
                        <span className="font-medium">23.5 (Low)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Positions:</span>
                        <span className="font-medium">12 Trades</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <span className="font-medium text-green-600">87.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Market Reports */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-green-600" />
                  Latest Research Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight, i) => (
                    <div key={i} className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{insight.title}</h3>
                        <Badge variant="outline">{insight.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{insight.summary}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {insight.date}
                          </span>
                          <span>{insight.readTime}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Read Full Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Metrics */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyMetrics.map((metric, i) => (
                <Card key={i} className="shadow-lg border-none">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                    <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                    <div className={`text-sm font-medium ${
                      metric.change.startsWith('+') ? 'text-green-600' : 
                      metric.change.startsWith('-') && metric.label.includes('Drawdown') ? 'text-green-600' :
                      'text-red-600'
                    }`}>
                      {metric.change} vs last quarter
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-600" />
                  Performance Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">2024 Year-to-Date</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Returns:</span>
                        <span className="font-bold text-green-600">+147.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Best Performing Asset:</span>
                        <span className="font-medium">Bitcoin (+203.8%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Trades Executed:</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Winning Trades:</span>
                        <span className="font-medium">28 (87.5%)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Risk Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Sharpe Ratio:</span>
                        <span className="font-bold">2.34</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Drawdown:</span>
                        <span className="font-medium">8.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volatility:</span>
                        <span className="font-medium">18.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Beta vs Market:</span>
                        <span className="font-medium">0.73</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}