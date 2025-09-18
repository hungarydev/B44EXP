import React, { useState } from "react";
import { Document } from "@/entities/all";
import { UploadFile } from "@/integrations/Core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    FileText,
    Upload,
    Download,
    Eye,
    CheckCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const legalDocs = [
    { name: "Privacy Policy", type: "privacy_policy", url: "/docs/privacy_policy.pdf" },
    { name: "Risk Disclosure Statement", type: "risk_disclosure", url: "/docs/risk_disclosure.pdf" },
    { name: "Crypto Backed Loan Agreement", type: "loan_agreement", url: "/docs/loan_agreement.pdf" },
    { name: "Non-Disclosure Agreement (NDA)", type: "nda", url: "/docs/nda.pdf" },
];

export default function DocumentCenter({ user }) {
  const [kycFile, setKycFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleKycUpload = async () => {
    if (!kycFile) return;
    setUploading(true);
    try {
        const { file_url } = await UploadFile({ file: kycFile });
        await Document.create({
            client_id: user.id,
            document_type: kycFile.type.includes('pdf') ? 'passport' : 'driving_license',
            file_url: file_url,
        });
        // You might want to update user's KYC status here too
        alert("File uploaded successfully!");
        setKycFile(null);
    } catch(e) {
        console.error("KYC Upload failed", e);
        alert("Upload failed. Please try again.");
    } finally {
        setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Upload className="w-5 h-5"/> Upload KYC Documents</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-grow">
                    <Label htmlFor="kyc-file">Photo ID (Passport or Driving License)</Label>
                    <Input id="kyc-file" type="file" onChange={(e) => setKycFile(e.target.files[0])} />
                </div>
                <Button onClick={handleKycUpload} disabled={!kycFile || uploading}>
                    {uploading ? "Uploading..." : "Upload Document"}
                </Button>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5"/> Important Legal Documents</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 mb-6">
                    {legalDocs.map(doc => (
                        <div key={doc.name} className="flex justify-between items-center p-3 border rounded-lg">
                            <p className="font-medium">{doc.name}</p>
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2"/>View</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl h-[90vh]">
                                        <DialogHeader><DialogTitle>{doc.name}</DialogTitle></DialogHeader>
                                        <iframe src={doc.url} className="w-full h-full border-0" title={doc.name}></iframe>
                                    </DialogContent>
                                </Dialog>
                                <a href={doc.url} download>
                                  <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2"/>Download</Button>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                    <Checkbox id="agree-terms" checked={agreed} onCheckedChange={setAgreed} />
                    <Label htmlFor="agree-terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                       I have read, understood, and agree to the terms and conditions of all official documents.
                    </Label>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}