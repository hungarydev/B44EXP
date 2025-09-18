import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Shield,
  Users,
  Globe,
  BarChart3,
  Award,
  ArrowRight,
  CheckCircle,
  Building2,
  Coins,
  Target,
  Star,
  Zap
} from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Years of Experience", value: "20+", icon: Award },
    { label: "Global Clients", value: "500+", icon: Users },
    { label: "Countries Served", value: "25+", icon: Globe },
    { label: "Average Returns", value: "100%+", icon: TrendingUp }
  ];

  const commodities = [
    {
      name: "Gold",
      symbol: "GCZ25",
      description: "Precious metal trading with proven strategies",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&h=300&fit=crop",
      performance: "+127.3%"
    },
    {
      name: "Silver", 
      symbol: "SIZ25",
      description: "Industrial precious metal opportunities",
      image: "https://images.unsplash.com/photo-1609447025817-bae2c6a50415?w=400&h=300&fit=crop",
      performance: "+98.7%"
    },
    {
      name: "Copper",
      symbol: "HGZ25", 
      description: "Industrial metal with strong fundamentals",
      image: "https://images.unsplash.com/photo-1582736509285-99c1ba26b863?w=400&h=300&fit=crop",
      performance: "+145.2%"
    },
    {
      name: "Bitcoin",
      symbol: "BTZ25",
      description: "Digital asset with institutional backing",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop",
      performance: "+203.8%"
    }
  ];

  const testimonials = [
    {
      name: "David Thompson",
      title: "Portfolio Manager, Goldman Sachs",
      content: "First Analysts has been our trusted research partner for over 15 years. Their market insights are unparalleled.",
      rating: 5
    },
    {
      name: "Sarah Mitchell", 
      title: "Private Investor",
      content: "Achieved 124% returns in my first year. The performance-based fee model aligns perfectly with my success.",
      rating: 5
    },
    {
      name: "Robert Chen",
      title: "Investment Director, Deutsche Bank",
      content: "Their conservative approach with exceptional returns makes them stand out in the industry.",
      rating: 5
    }
  ];

  const trustSignals = [
    "FCA Regulated",
    "ISO 27001 Certified", 
    "PCI DSS Compliant",
    "GDPR Compliant"
  ];

  return (
    <div className="scroll-smooth">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-green-700/50 rounded-full text-green-100 text-sm font-medium mb-4">
                  <Zap className="w-4 h-4 mr-2" />
                  Trusted Since 2003
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent leading-tight">
                  Trusted Analytical Research
                  <span className="block text-green-300">Leading Market Insights</span>
                </h1>
                <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl">
                  We provide institutional-grade market research to both banks and private clients, delivering consistent high returns with limited risk exposure since 2003.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to={createPageUrl("Application")}>
                  <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 font-semibold px-8 py-4 text-lg">
                    Get Approved Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Portal")}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                    Client Portal
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-4">
                {trustSignals.map((signal, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-green-800/50 px-3 py-1 rounded-full">
                    <Shield className="w-4 h-4 text-green-300" />
                    <span className="text-sm text-green-200">{signal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Live Performance</h3>
                  <p className="text-green-200">Real-time market insights</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {commodities.map((commodity) => (
                    <div key={commodity.name} className="bg-white/10 p-4 rounded-xl text-center">
                      <div className="text-lg font-semibold">{commodity.name}</div>
                      <div className="text-2xl font-bold text-green-300">{commodity.performance}</div>
                      <div className="text-xs text-green-200">YTD Return</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              From Institutions to Individual Investors
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Founded in 2003 in London, serving European banks & institutions. Global expansion in 2015 with Vancouver office. 
              In 2022, we opened to private investors with our performance-based fee model.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">2003 - London HQ</h3>
              <p className="text-gray-600">Established our headquarters in London, serving European banks and financial institutions with premium analytical research.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Globe className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">2015 - Global Expansion</h3>
              <p className="text-gray-600">Opened our Vancouver research office, expanding our analytical team globally for 24/7 market coverage.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">2022 - Private Sector</h3>
              <p className="text-gray-600">Launched New York trading floor and opened doors to private investors, democratizing institutional-grade insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Performance-Based Success Model
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We only succeed when you succeed. Our 10% performance-based fee ensures complete alignment with your investment goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">No Risk, No Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-4">
                  Zero upfront costs. We charge only 10% on profits generated for you. 
                  If you don't make money, neither do we.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0%</div>
                  <div className="text-sm text-gray-500">Upfront Fees</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-none shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">50+ Expert Analysts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-4">
                  Global team of professional analysts with collective experience spanning two decades 
                  in financial markets.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-500">Market Coverage</div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-none shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Conservative Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center mb-4">
                  Only 3-4 carefully selected trades per year with proven risk management 
                  and trailing stop-loss protection.
                </p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">100%+</div>
                  <div className="text-sm text-gray-500">Avg Annual Returns</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trading Focus */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Trading Specialization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specializing in options trading across four key commodity markets with institutional-grade analysis and execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commodities.map((commodity, index) => (
              <Card key={index} className="card-hover overflow-hidden border-none shadow-lg group">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src={commodity.image} 
                    alt={commodity.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {commodity.performance}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {commodity.name}
                    <span className="text-sm text-gray-500 font-mono">{commodity.symbol}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{commodity.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors">
                    View Analysis
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Institutions & Private Investors
            </h2>
            <p className="text-xl text-gray-600">See what our clients say about our performance</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Highlight */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Proven Track Record of Excellence
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">100%+ average returns consistently delivered</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">Limited risk exposure with advanced stop-loss strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">Directional trading (Calls & Puts) for any market condition</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">Conservative approach with only 3-4 trades annually</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg">Institutional-grade research & risk management</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl("Risk")}>
                  <Button className="bg-green-600 hover:bg-green-700">
                    View Risk & Reward Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Services")}>
                  <Button variant="outline">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-center mb-6">Performance Metrics</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-600 mb-2">127.3%</div>
                  <div className="text-gray-600">Best Performing Trade (Gold)</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">87.5%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">3.2</div>
                    <div className="text-sm text-gray-600">Avg Trades/Year</div>
                  </div>
                </div>
                <div className="text-center pt-4 border-t border-gray-200">
                  <div className="text-lg font-semibold text-gray-900 mb-2">Risk Management</div>
                  <div className="text-sm text-gray-600">Advanced trailing stop-loss & position sizing ensures capital preservation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-emerald-800"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Access Institutional-Grade Trading?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of private investors who have gained access to institutional-grade trading opportunities. 
            Get approved today and start your journey to consistent profits with our performance-based model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to={createPageUrl("Application")}>
              <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 font-semibold px-8 py-4">
                Get Approved Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to={createPageUrl("Portal")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
                Access Client Portal
              </Button>
            </Link>
          </div>
          <div className="text-center text-green-200">
            <p className="text-sm">No upfront fees • Performance-based pricing • Institutional-grade insights</p>
          </div>
        </div>
      </section>
    </div>
  );
}