import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  Banknote,
  Bitcoin,
  QrCode,
  DollarSign
} from "lucide-react";

export default function PaymentSection({ user }) {
    const [loanAmount, setLoanAmount] = useState(0);

    const CryptoLoanSearch = () => {
        const [searching, setSearching] = useState(false);
        const [progress, setProgress] = useState(0);
        const [approved, setApproved] = useState(false);

        const handleSearch = () => {
            setSearching(true);
            setProgress(0);
            setApproved(false);
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setSearching(false);
                        setApproved(true);
                        return 100;
                    }
                    return prev + 2.5;
                });
            }, 1000);
        };

        return (
            <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Crypto Backed Loan Finder</h3>
                <p className="text-sm text-gray-500 mb-4">Search for crypto-backed loan providers.</p>
                <Button onClick={handleSearch} disabled={searching || approved}>
                    {searching ? "Scanning Companies..." : approved ? "Approved!" : "Find Loan Provider"}
                </Button>
                {searching && (
                    <div className="mt-4">
                        <p>Scanning through all crypto loan companies...</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}
                {approved && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <h4 className="font-bold text-green-800">Approved with Wirex Loans!</h4>
                        <p className="text-sm text-gray-600">You are pre-approved for a crypto-backed loan.</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <Tabs defaultValue="deposit" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="deposit">Deposit Funds</TabsTrigger>
                <TabsTrigger value="loan">Crypto Backed Loan</TabsTrigger>
            </TabsList>
            <TabsContent value="deposit">
                <Card>
                    <CardHeader><CardTitle>Select Payment Method</CardTitle></CardHeader>
                    <CardContent>
                       <div className="grid md:grid-cols-2 gap-4">
                           <div className="p-4 border rounded-lg flex items-center gap-3"><CreditCard className="w-6 h-6"/> Credit/Debit Card</div>
                           <div className="p-4 border rounded-lg flex items-center gap-3"><Banknote className="w-6 h-6"/> Bank Transfer</div>
                           <div className="p-4 border rounded-lg flex items-center gap-3"><Bitcoin className="w-6 h-6"/> Crypto Payment</div>
                           <div className="p-4 border rounded-lg flex items-center gap-3"><QrCode className="w-6 h-6"/> QR Code Payment</div>
                       </div>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="loan">
                <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle>Apply for a Loan</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                             <div>
                                <Label>Select Loan Amount</Label>
                                <Select onValueChange={(v) => setLoanAmount(parseInt(v))}>
                                    <SelectTrigger><SelectValue placeholder="Select amount" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10000">$10,000</SelectItem>
                                        <SelectItem value="50000">$50,000</SelectItem>
                                        <SelectItem value="100000">$100,000</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {loanAmount > 0 && (
                                <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
                                    <p className="font-semibold">10% Down Payment Required</p>
                                    <p>Amount: <span className="font-bold">${(loanAmount * 0.1).toLocaleString()}</span></p>
                                    <Button className="mt-2">Pay Down Payment</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Loan Provider Search</CardTitle></CardHeader>
                        <CardContent>
                            <CryptoLoanSearch />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    );
}