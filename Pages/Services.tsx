import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  TrendingUp,
  Shield,
  BarChart3,
  Users,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  Building2,
  Globe
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: BarChart3,
      title: "Market Research & Analysis",
      description: "Comprehensive analytical research providing institutional-grade market insights across global commodity markets.",
      features: ["50+ Professional Analysts", "Real-time Market Data", "Daily Market Reports", "Technical Analysis"]
    },
    {
      icon: TrendingUp,
      title: "Options Trading Execution", 
      description: "Strategic options trading in commodities with proven methodologies and risk management techniques.",
      features: ["Call & Put Positions", "Advanced Stop-Loss", "Conservative Strategy", "3-4 Trades Annually"]
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Advanced risk management utilizing financial instruments and conservative trading approaches.",
      features: ["Trailing Stop Losses", "Position Sizing", "Risk Assessment", "Limited Exposure"]
    },
    {
      icon: Users,
      title: "Client Advisory Services",
      description: "Personalized guidance from our team of experts with direct analyst communication and support.",
      features: ["Direct Analyst Access", "Live Chat Support", "Market Guidance", "Trade Timing Advice"]
    }
  ];

  const tradingFocus = [
    {
      commodity: "Gold (GCZ25)",
      description: "Precious metals trading with institutional-grade analysis",
      returns: "100%+ consistent returns",
      risk: "Low risk exposure"
    },
    {
      commodity: "Silver (SIZ25)", 
      description: "Industrial precious metal opportunities",
      returns: "High volatility profits",
      risk: "Managed risk strategies"
    },
    {
      commodity: "Copper (HGZ25)",
      description: "Industrial metal with strong fundamentals",
      returns: "Infrastructure demand driven",
      risk: "Conservative positioning"
    },
    {
      commodity: "Bitcoin (BTZ25)",
      description: "Digital asset with institutional backing",
      returns: "Emerging market opportunities",
      risk: "Advanced risk controls"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            Institutional-grade analytical research and trading services now available to private investors. 
            Same opportunities, same pricing, same professional execution.
          </p>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Business Model
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Performance-based success where we only profit when our clients profit
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Performance-Based Fees Only</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    We charge a 10% performance-based fee only on the profits we generate for our clients. 
                    There are no purchase fees, subscription fees, or hidden costs.
                  </p>
                  <div className="text-2xl font-bold text-green-600">
                    No Profit = No Fee
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">Zero upfront investment required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">Complete alignment with client success</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">Institutional-grade execution and analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">Direct access to our 50+ analyst team</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-center mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Market Analysis</h4>
                    <p className="text-gray-600">Our 50+ analysts identify profitable trading opportunities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Strategic Execution</h4>
                    <p className="text-gray-600">Conservative approach with 3-4 carefully selected trades per year</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Profit Sharing</h4>
                    <p className="text-gray-600">You keep 90% of all profits, we take 10% only on gains</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Trading Services
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for institutional-grade commodity trading
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Focus */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Trading Specialization
            </h2>
            <p className="text-xl text-gray-600">
              Four key commodity markets with proven strategies and risk management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tradingFocus.map((item, index) => (
              <Card key={index} className="border-none shadow-lg text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{item.commodity}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <div className="text-sm font-medium text-green-800">{item.returns}</div>
                    </div>
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">{item.risk}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600">
              Cutting out brokerage firms and their fees to deliver direct access to institutional opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Institutional Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Same market insights and trading opportunities that banks and institutions have used since 2003, 
                  now available to private investors.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Conservative Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Unlike brokerage firms that may execute 10-15 trades yearly, we focus on 3-4 carefully selected 
                  high-probability trades for manageable risk exposure.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Global Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Three global offices (London, Vancouver, New York) with over 50 professional analysts providing 
                  round-the-clock market coverage and analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Access Institutional-Grade Trading?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join private investors who are already benefiting from our institutional-grade research and execution. 
            No upfront fees - we succeed when you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Application")}>
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 font-semibold px-8 py-4">
                Get Approved Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("Risk")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
                View Risk & Reward
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}