import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MapPin,
  Clock
} from "lucide-react";

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form data:", data);
    // Here you would typically call an integration to send the email
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto">
            We're here to help. Reach out to our global team with any questions or inquiries.
          </p>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-600">
                  Our team is available to answer your questions about our services, the application process, or your existing account.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Email Us</h3>
                    <p className="text-gray-600">For general inquiries, support, and information.</p>
                    <a href="mailto:info@firstanalysts.com" className="text-green-600 font-semibold hover:underline">info@firstanalysts.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Our Offices</h3>
                    <p className="text-gray-600 font-medium">London, UK (HQ)</p>
                    <p className="text-gray-600 font-medium">Vancouver, Canada</p>
                    <p className="text-gray-600 font-medium">New York, USA</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Business Hours</h3>
                    <p className="text-gray-600">Our support team is available 24/5 to assist you across all time zones.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register("name", { required: "Full name is required" })} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" {...register("subject", { required: "Subject is required" })} />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} {...register("message", { required: "Message is required" })} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}