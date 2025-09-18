import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Globe,
  DollarSign,
  TrendingUp,
  Award,
  ArrowRight
} from "lucide-react";

export default function Journey() {
  const timelineEvents = [
    {
      year: "2003",
      title: "First Analysts is Born",
      location: "London, UK",
      icon: Building2,
      description: "Founded with a mission to provide elite analytical research to top-tier banks and financial institutions across Europe. Our London headquarters opens."
    },
    {
      year: "2015",
      title: "Global Expansion",
      location: "Vancouver, Canada",
      icon: Globe,
      description: "We expand our analytical operations to North America, opening a research floor in Vancouver to provide 24-hour market coverage and attract new global talent."
    },
    {
      year: "2022",
      title: "Opening to the Private Sector",
      location: "New York, USA",
      icon: DollarSign,
      description: "Building on two decades of success, we open a trading floor in New York and extend our institutional-grade services to private investors for the first time."
    },
    {
      year: "Today",
      title: "A New Era of Trading",
      location: "Global",
      icon: TrendingUp,
      description: "We serve a diverse clientele of both institutional and private investors, committed to our performance-only fee model and delivering exceptional returns."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Journey</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            Over two decades of analytical excellence, global expansion, and a commitment to democratizing finance.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-green-200 hidden md:block"></div>

            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`relative mb-12 md:mb-20 flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="w-full md:w-5/12 p-6 bg-gray-50 rounded-lg shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <event.icon className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-500 text-sm">{event.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
                
                {/* Year Circle */}
                <div className="absolute left-1/2 -translate-x-1/2 w-28 h-28 bg-white border-4 border-green-600 rounded-full flex items-center justify-center text-2xl font-bold text-green-600 z-10 hidden md:flex">
                  {event.year}
                </div>
                <div className="w-24 h-24 my-4 md:hidden bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold z-10">
                  {event.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-green-600" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Future is Bright</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We continue to innovate and expand our services, leveraging technology and our deep market expertise to find new opportunities for our clients. Our journey is far from over, and we invite you to be a part of our future success.
          </p>
          <Link to={createPageUrl("Application")}>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Join Our Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}