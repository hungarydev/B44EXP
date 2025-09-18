import React from "react";
import {
  Shield,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle,
  BarChart3,
  Percent
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Risk() {
  const contractSpecs = [
    { name: "Gold (GCZ25)", tickSize: "$0.10", tickValue: "$10.00" },
    { name: "Silver (SIZ25)", tickSize: "$0.005", tickValue: "$25.00" },
    { name: "Copper (HGZ25)", tickSize: "$0.0005", tickValue: "$12.50" },
    { name: "Bitcoin (BTZ25)", tickSize: "$5.00", tickValue: "$25.00" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Risk vs. Reward</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            Our philosophy balances aggressive return targets with a disciplined, conservative approach to risk management.
          </p>
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Maximizing Returns, Minimizing Exposure
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At First Analysts, our reputation is built on delivering consistent, high returns. We proudly boast returns often exceeding 100% on a consistent basis for our clients. However, this performance is not achieved through reckless speculation. It is the result of a meticulously crafted trading methodology that prioritizes capital preservation.
              </p>
              <p className="text-lg text-gray-600">
                Our approach is fundamentally different from the high-volume trading common at brokerage firms. We believe that over-trading is unmanageable for private clients and introduces unnecessary risk. Instead, our team of over 50 analysts collectively identifies a handful of high-conviction opportunities each year.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center border-none shadow-lg bg-green-50">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>100%+ Consistent Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Our proven methods consistently deliver market-beating performance.</p>
                </CardContent>
              </Card>
              <Card className="text-center border-none shadow-lg bg-red-50">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>Limited Risk Exposure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">A conservative strategy with only 3-4 trades per year minimizes market exposure.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management Techniques */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Risk Management Toolkit</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We employ a suite of sophisticated financial instruments and strategies to protect our clients' capital.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Trailing Stop Loss</h3>
                <p className="text-gray-600">A cornerstone of our strategy. This dynamic tool automatically protects profits by moving the stop-price as the market moves in a favorable direction, while locking in gains if the market reverses.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Directional Market Trading</h3>
                <p className="text-gray-600">We take full advantage of both market directions by trading both Call (up) and Put (down) positions, allowing us to generate profit in rising or falling markets.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Collective Analyst Gauge</h3>
                <p className="text-gray-600">Trade decisions are not made in isolation. Our 50+ analysts reach a collective consensus before any trade is executed, ensuring each position is thoroughly vetted from multiple expert perspectives.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Specifications */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contract Specifications</h2>
            <p className="text-xl text-gray-600">Understanding the instruments we trade.</p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {contractSpecs.map((spec, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">{spec.name}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Percent className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Tick Size</div>
                        <div className="font-medium">{spec.tickSize}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-500">Value per Tick</div>
                        <div className="font-medium">{spec.tickValue}</div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-600">
                    The tick size represents the minimum price fluctuation of the contract, and the tick value is the monetary gain or loss associated with that movement. Our team uses this data to precisely calculate position sizing and risk parameters for every trade.
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}