import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { User, Ticket } from '@/app/page';
import { ChatInterface } from './ChatInterface'; // Import the chat component

export function CustomerDashboard({ user }: { user: User }) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tickets`);
                if (!response.ok) throw new Error("Failed to fetch tickets");
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error("Failed to fetch customer tickets:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, [user.userId]);

    return (
        <div>
            <Card>
                <CardHeader><CardTitle>My Ticket History</CardTitle></CardHeader>
                <CardContent>
                    {loading ? <p>Loading your tickets...</p> :
                        <Table>
                            <TableHeader><TableRow><TableHead>Ticket ID</TableHead><TableHead>Title</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {tickets.length > 0 ? tickets.map(ticket => (
                                    <TableRow key={ticket.ticketId}>
                                        <TableCell>{ticket.ticketId}</TableCell>
                                        <TableCell>{ticket.title}</TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                    </TableRow>
                                )) : <TableRow><TableCell colSpan={3} className="text-center">You have no tickets yet.</TableCell></TableRow>}
                            </TableBody>
                        </Table>
                    }
                </CardContent>
            </Card>
            <ChatInterface />
        </div>
    );
}