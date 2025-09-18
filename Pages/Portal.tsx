 	import React, { useState, useEffect } from "react";
import { User, Trade, SupportTicket } from "@/entities/all";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  ArrowLeft,
  Shield,
  BarChart3,
  DollarSign,
  Eye,
  EyeOff,
  Settings,
  MessageCircle,
  FileText,
  CreditCard,
  LogOut
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import PortalDashboard from "../components/portal/PortalDashboard";
import PortfolioSection from "../components/portal/PortfolioSection";
import LiveTrades from "../components/portal/LiveTrades";
import MarketData from "../components/portal/MarketData";
import TradingSignals from "../components/portal/TradingSignals";
import SupportCenter from "../components/portal/SupportCenter";
import DocumentCenter from "../components/portal/DocumentCenter";
import PaymentSection from "../components/portal/PaymentSection";

export default function Portal() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginStep, setLoginStep] = useState("email"); // email, otp, authenticated
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const currentUser = await User.me();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP generation
    setTimeout(() => {
      setLoginStep("otp");
      setLoading(false);
    }, 2000);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate OTP verification
    setTimeout(async () => {
      try {
        await User.login();
        const currentUser = await User.me();
        setUser(currentUser);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }, 2000);
  };

  const handleLogout = async () => {
    await User.logout();
    setIsAuthenticated(false);
    setUser(null);
    setLoginStep("email");
    setEmail("");
    setOtp("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="shadow-2xl border-none">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
                <p className="text-gray-600">Secure access to your trading account</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {loginStep === "email" && (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Continue"}
                  </Button>
                </form>
              )}

              {loginStep === "otp" && (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      One-Time Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="h-12 pr-12"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      OTP sent to {email}
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-green-600 hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Access Portal"}
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setLoginStep("email")}
                    className="w-full"
                  >
                    Back
                  </Button>
                </form>
              )}

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Need help accessing your account?{" "}
                  <Link to={createPageUrl("Contact")} className="text-green-600 hover:underline">
                    Contact Support
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Link to={createPageUrl("Home")}>
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Portal Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to={createPageUrl("Home")}>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Client Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.full_name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Portal Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-8 h-auto p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-2 py-3">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center gap-2 py-3">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex items-center gap-2 py-3">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Trades</span>
            </TabsTrigger>
            <TabsTrigger value="markets" className="flex items-center gap-2 py-3">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Markets</span>
            </TabsTrigger>
            <TabsTrigger value="signals" className="flex items-center gap-2 py-3">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Signals</span>
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center gap-2 py-3">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2 py-3">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2 py-3">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <PortalDashboard user={user} />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioSection user={user} />
          </TabsContent>

          <TabsContent value="trades">
            <LiveTrades user={user} />
          </TabsContent>

          <TabsContent value="markets">
            <MarketData />
          </TabsContent>

          <TabsContent value="signals">
            <TradingSignals />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentSection user={user} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentCenter user={user} />
          </TabsContent>

          <TabsContent value="support">
            <SupportCenter user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}