
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { SupportTicket } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
    MessageSquare,
    Phone,
    Ticket,
    Send
} from "lucide-react";

export default function SupportCenter({ user }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  
  const loadTickets = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userTickets = await SupportTicket.filter({ client_id: user.id }, "-created_date");
      setTickets(userTickets);
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const onSubmit = async (data) => {
    try {
      await SupportTicket.create({ ...data, client_id: user.id });
      reset();
      loadTickets();
    } catch(e) {
      console.error("Failed to create ticket", e);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
        case 'open': return 'bg-blue-100 text-blue-800';
        case 'in_progress': return 'bg-yellow-100 text-yellow-800';
        case 'resolved': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Ticket className="w-5 h-5"/> Create a New Support Ticket</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" {...register("subject", { required: true })} placeholder="e.g., Question about my portfolio"/>
                        </div>
                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" {...register("message", { required: true })} rows={5} placeholder="Please describe your issue in detail..."/>
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : <><Send className="w-4 h-4 mr-2"/>Submit Ticket</>}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>My Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? <p>Loading tickets...</p> : (
                        tickets.length > 0 ? (
                        <Accordion type="single" collapsible>
                            {tickets.map(ticket => (
                                <AccordionItem key={ticket.id} value={ticket.id}>
                                    <AccordionTrigger>
                                        <div className="flex justify-between w-full pr-4">
                                            <span>{ticket.subject}</span>
                                            <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-4">
                                        <p><strong>Your Message:</strong> {ticket.message}</p>
                                        {ticket.response && <p className="p-3 bg-gray-100 rounded-lg"><strong>Our Response:</strong> {ticket.response}</p>}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                        ) : <p className="text-center text-gray-500 py-4">You have no support tickets.</p>
                    )}
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-green-600"/>
                        <div>
                            <p className="font-semibold">Live Chat with Broker</p>
                            <p className="text-sm text-gray-500">For urgent trading matters.</p>
                             <Button size="sm" className="mt-1">Start Chat</Button>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-blue-600"/>
                        <div>
                            <p className="font-semibold">General Support</p>
                            <p className="text-sm text-gray-500">Available 24/5 for any questions.</p>
                            <p className="font-medium">info@firstanalysts.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
