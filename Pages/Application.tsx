import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User } from "@/entities/all";
import { UploadFile } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  User as UserIcon,
  Home,
  DollarSign,
  TrendingUp,
  Upload,
  BarChart,
  Shield,
  FileText,
  CheckCircle,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const steps = [
  { id: 1, name: "Personal Information", icon: UserIcon },
  { id: 2, name: "Financial Profile", icon: DollarSign },
  { id: 3, name: "KYC Documents", icon: Upload },
  { id: 4, name: "Review & Submit", icon: FileText }
];

export default function Application() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kycFile, setKycFile] = useState(null);
  const [formValues, setFormValues] = useState({});

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  
  const allValues = watch();

  const handleNext = async () => {
    // This will trigger validation for the current fields
    const isValid = await handleSubmit(() => {
      setFormValues(prev => ({ ...prev, ...allValues }));
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    })();
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const finalData = { ...formValues, ...data };
    
    try {
      // 1. Upload KYC file if it exists
      let kycFileUrl = null;
      if (kycFile) {
        const { file_url } = await UploadFile({ file: kycFile });
        kycFileUrl = file_url;
      }

      // 2. Create user record
      await User.create({
        ...finalData,
        full_name: finalData.fullName,
        email: finalData.email,
        phone: finalData.phone,
        address: finalData.address,
        date_of_birth: finalData.dob,
        account_status: "pending",
        kyc_status: kycFile ? "submitted" : "pending",
        // The Document entity would be created here if we had a backend function
        // For now, we are just storing the user data.
      });

      // 3. Navigate to success page
      setCurrentStep(5); // Show success view
    } catch (error) {
      console.error("Application submission error:", error);
      // Handle error display
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep - 1) / (steps.length - 1) * 100;

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center p-8 shadow-2xl border-green-500">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your application. Our team will review your information and get back to you within 2-3 business days. You will receive an email confirmation shortly.
          </p>
          <Button onClick={() => navigate(createPageUrl("Home"))}>Back to Homepage</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Become a Client</CardTitle>
          <CardDescription className="text-center text-lg">
            Complete the secure application to get approved for institutional-grade trading.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2">
              {steps.map(step => (
                <div key={step.id} className={`text-center w-1/4 ${currentStep >= step.id ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                  <step.icon className="mx-auto mb-1 w-6 h-6" />
                  <span className="text-xs">{step.name}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...register("fullName", { required: true })} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...register("email", { required: true })} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" {...register("phone", { required: true })} />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" {...register("dob", { required: true })} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" {...register("address", { required: true })} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Financial Profile</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Available Liquidity (USD)</Label>
                    <Select onValueChange={(v) => setValue("liquidity", v)}>
                      <SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25000">$10,000 - $50,000</SelectItem>
                        <SelectItem value="75000">$50,000 - $100,000</SelectItem>
                        <SelectItem value="200000">$100,000 - $500,000</SelectItem>
                        <SelectItem value="500000">$500,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Trading Experience</Label>
                    <Select onValueChange={(v) => setValue("trading_experience", v)}>
                      <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novice">Novice (Less than 1 year)</SelectItem>
                        <SelectItem value="average">Average (1-5 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Risk Profile</Label>
                  <Select onValueChange={(v) => setValue("risk_profile", v)}>
                    <SelectTrigger><SelectValue placeholder="Select risk profile" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span>Conservative (Capital preservation is key)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="moderate">
                        <div className="flex items-center gap-2">
                          <BarChart className="w-4 h-4 text-yellow-600" />
                          <span>Moderate (Balanced growth and risk)</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="aggressive">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-red-600" />
                          <span>Aggressive (High growth potential)</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">KYC Document Upload</h3>
                <p className="text-gray-600">Please upload a clear, color photo of your government-issued ID (Passport or Driving License). This is required for AML checks.</p>
                <Input type="file" accept="image/png, image/jpeg, application/pdf" onChange={(e) => setKycFile(e.target.files[0])} />
                {kycFile && (
                  <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <FileText className="w-5 h-5 text-green-700" />
                    <span className="font-medium text-green-800">{kycFile.name}</span>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Review & Submit</h3>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between"><span>Full Name:</span> <span className="font-medium">{allValues.fullName}</span></div>
                    <div className="flex justify-between"><span>Email:</span> <span className="font-medium">{allValues.email}</span></div>
                    <div className="flex justify-between"><span>Liquidity:</span> <span className="font-medium">${parseInt(allValues.liquidity || 0).toLocaleString()} (approx)</span></div>
                    <div className="flex justify-between"><span>Experience:</span> <span className="font-medium capitalize">{allValues.trading_experience}</span></div>
                    <div className="flex justify-between"><span>Risk Profile:</span> <span className="font-medium capitalize">{allValues.risk_profile}</span></div>
                    <div className="flex justify-between"><span>KYC Document:</span> <span className="font-medium">{kycFile ? kycFile.name : 'Not provided'}</span></div>
                  </CardContent>
                </Card>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" {...register("terms", { required: true })} />
                  <Label htmlFor="terms">I confirm that all information is accurate and I agree to the terms and conditions.</Label>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handlePrev}>Previous</Button>
              )}
              {currentStep < 4 && (
                <Button type="button" onClick={handleNext}>Next</Button>
              )}
              {currentStep === 4 && (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Application"}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}