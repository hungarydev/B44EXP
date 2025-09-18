
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  TrendingUp, 
  BarChart3, 
  Shield, 
  Users, 
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Award,
  Globe,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: "Home", href: createPageUrl("Home") },
    { name: "About Us", href: createPageUrl("About") },
    { name: "Services", href: createPageUrl("Services") },
    { name: "Our Journey", href: createPageUrl("Journey") },
    { name: "Client Portal", href: createPageUrl("Portal") },
    { name: "Markets", href: createPageUrl("Markets") },
    { name: "Insights", href: createPageUrl("Insights") },
    { name: "Risk vs Reward", href: createPageUrl("Risk") },
    { name: "Contact Us", href: createPageUrl("Contact") }
  ];

  const isPortalPage = currentPageName === "Portal" || currentPageName === "Application";

  if (isPortalPage) {
    return (
      <div className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
        <style>
          {`
            :root {
              --bg: #0B0F14;
              --surface: #101622;
              --elev: #131C2A;
              --border: #1E2A3A;
              --primary: #0EA47A;
              --primary-contrast: #0B0F14;
              --gold: #CBA135;
              --silver: #AEB7C2;
              --success: #2CB67D;
              --danger: #E5484D;
              --warning: #F5A524;
              --info: #7AA2F7;
              --text: #E6EDF3;
              --text-muted: #AAB3BF;
            }
            
            .app-shell {
              background: var(--bg);
              color: var(--text);
            }
            
            .card {
              background: var(--surface);
              border: 1px solid var(--border);
              border-radius: 12px;
              padding: 16px;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
              transition: all 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            
            .card:hover {
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            
            .card-elevated {
              background: var(--elev);
            }
            
            .btn-primary {
              background: var(--primary);
              color: var(--primary-contrast);
              border: none;
              border-radius: 999px;
              padding: 12px 24px;
              font-weight: 500;
              transition: all 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            
            .btn-primary:hover {
              background: #0D9A70;
            }
            
            .btn-secondary {
              background: transparent;
              color: var(--text);
              border: 1px solid var(--border);
              border-radius: 8px;
              padding: 8px 16px;
              transition: all 150ms cubic-bezier(0.2, 0.8, 0.2, 1);
            }
            
            .btn-secondary:hover {
              background: var(--surface);
            }
            
            .text-muted {
              color: var(--text-muted);
            }
            
            .badge-success {
              background: rgba(44, 182, 125, 0.1);
              color: var(--success);
              border: 1px solid rgba(44, 182, 125, 0.2);
            }
            
            .badge-danger {
              background: rgba(229, 72, 77, 0.1);
              color: var(--danger);
              border: 1px solid rgba(229, 72, 77, 0.2);
            }
            
            .sparkline {
              height: 32px;
              display: flex;
              align-items: end;
              gap: 1px;
            }
            
            .sparkline-bar {
              background: var(--primary);
              width: 2px;
              min-height: 2px;
              border-radius: 1px;
            }
          `}
        </style>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <style>
        {`
          :root {
            --primary-green: #1B5E20;
            --secondary-green: #2E7D32;
            --accent-green: #4CAF50;
            --light-green: #E8F5E8;
            --gold: #FFB300;
          }
          
          .hero-glow {
            background: linear-gradient(135deg, 
              rgba(27, 94, 32, 0.1) 0%,
              rgba(46, 125, 50, 0.15) 50%,
              rgba(76, 175, 80, 0.1) 100%);
          }
          
          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(27, 94, 32, 0.15);
          }
          
          .scroll-smooth {
            scroll-behavior: smooth;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .gradient-text {
            background: linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold gradient-text">First Analysts</div>
                <div className="text-xs text-green-600 font-medium">Trusted Analytical Research</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-all hover:text-green-600 relative group ${
                    location.pathname === item.href
                      ? "text-green-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full ${
                    location.pathname === item.href ? "w-full" : ""
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* Enhanced CTA Buttons */}
            <div className="flex items-center space-x-3">
              <Link to={createPageUrl("Portal")}>
                <Button variant="outline" className="hidden sm:inline-flex border-green-600 text-green-600 hover:bg-green-50 transition-all">
                  Client Portal
                </Button>
              </Link>
              <Link to={createPageUrl("Application")}>
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                  Get Approved
                </Button>
              </Link>

              {/* Enhanced Mobile menu button */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="xl:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold gradient-text">First Analysts</div>
                      <div className="text-xs text-green-600">Menu</div>
                    </div>
                  </div>
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors py-2 border-b border-gray-100 last:border-b-0"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="border-t border-gray-200 pt-6 space-y-3">
                      <Link to={createPageUrl("Portal")} onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full border-green-600 text-green-600">
                          Client Portal
                        </Button>
                      </Link>
                      <Link to={createPageUrl("Application")} onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                          Get Approved
                        </Button>
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold">First Analysts</div>
                  <div className="text-sm text-green-400">Trusted Analytical Research Since 2003</div>
                </div>
              </div>
              <p className="text-gray-300 max-w-md mb-6">
                Leading analytical research firm providing institutional-grade market insights to banks, 
                institutions, and private investors globally. Performance-based success with 100%+ average returns.
              </p>
              <div className="flex space-x-4">
                <div className="p-3 bg-green-800/50 rounded-lg">
                  <Award className="w-6 h-6 text-green-400" />
                </div>
                <div className="p-3 bg-green-800/50 rounded-lg">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div className="p-3 bg-green-800/50 rounded-lg">
                  <Globe className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {navigation.slice(0, 6).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-gray-300 hover:text-green-400 transition-colors flex items-center space-x-2"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Offices */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6">Global Offices</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">London HQ</div>
                    <div className="text-gray-400 text-sm">United Kingdom</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">Vancouver Office</div>
                    <div className="text-gray-400 text-sm">Canada</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">New York Floor</div>
                    <div className="text-gray-400 text-sm">United States</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <div className="text-white font-medium">General Inquiries</div>
                    <div className="text-gray-400 text-sm">info@firstanalysts.com</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 First Analysts Ltd. All rights reserved. Trading involves risk and is not suitable for all investors.
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <span>FCA Regulated</span>
                <span>ISO 27001 Certified</span>
                <span>PCI DSS Compliant</span>
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
