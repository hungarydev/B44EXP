import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Award,
  Globe,
  Building2,
  TrendingUp,
  Shield,
  ArrowRight
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "John Carter",
      title: "Founder & Chief Analyst",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      name: "Sarah Chen",
      title: "Head of Global Research",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop"
    },
    {
      name: "Michael Rodriguez",
      title: "Head of Trading",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
    },
    {
      name: "Emily White",
      title: "Head of Risk Management",
      image: "https://images.unsplash.com/photo-1542345812-d98b5cd6cf68?w=400&h=400&fit=crop"
    }
  ];

  const values = [
    {
      icon: TrendingUp,
      title: "Performance",
      description: "Our success is directly tied to our clients' success. We are driven by delivering consistent, market-leading returns."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We operate with full transparency and place our clients' interests at the forefront of every decision we make."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We uphold the highest standards of research, analysis, and execution, bringing institutional quality to every client."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About First Analysts</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            A legacy of analytical excellence, now empowering private investors with institutional-grade opportunities.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                From Institutions to Individuals
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Since our inception in 2003, First Analysts has been a trusted partner for leading banks and financial institutions across Europe, providing meticulous analytical research and market reports. Our reputation was built on delivering insights that drove institutional success.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                In 2015, we expanded our analytical research team globally with a new office in Vancouver, Canada, enhancing our round-the-clock market coverage.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Recognizing a significant gap in the market, we opened our doors to the private sector in 2022. Our mission is to provide private investors with the same level of first-hand analytical information, at the same time and price, that was once exclusive to large institutions. We cut out the middlemen, giving you direct access to the source of market intelligence.
              </p>
              <Link to={createPageUrl("Journey")}>
                <Button className="bg-green-600 hover:bg-green-700">
                  Explore Our Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative h-96">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&fit=crop" alt="Team meeting" className="absolute w-2/3 h-2/3 rounded-xl shadow-2xl object-cover top-0 left-0" />
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&fit=crop" alt="Business handshake" className="absolute w-2/3 h-2/3 rounded-xl shadow-2xl object-cover bottom-0 right-0 border-8 border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide our every action.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-none shadow-lg card-hover">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Backed by a global team of over 50 expert analysts, our leadership guides the firm's strategic vision and commitment to client success.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                <p className="text-green-600">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}