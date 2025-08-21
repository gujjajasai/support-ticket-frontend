import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { User, Ticket } from '@/app/page';

// Helper functions for styling
function getStatusColor(status: string) { /* ... same as before ... */ }
function getPriorityColor(priority: string) { /* ... same as before ... */ }

export function AgentDashboard({ user }: { user: User }) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8088/api/tickets');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setTickets(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    return (
        <Card>
            <CardHeader><CardTitle>All Active Tickets</CardTitle><CardDescription>Welcome, {user.name}. Manage all customer requests.</CardDescription></CardHeader>
            <CardContent>
                {loading && <p>Loading tickets...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && (
                    <Table>
                        <TableHeader><TableRow><TableHead>Ticket ID</TableHead><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Priority</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {tickets.length === 0 ? (
                                <TableRow><TableCell colSpan={4} className="text-center">No tickets found.</TableCell></TableRow>
                            ) : (
                                tickets.map((ticket) => (
                                    <TableRow key={ticket.ticketId}>
                                        <TableCell>{ticket.ticketId}</TableCell>
                                        <TableCell>{ticket.title}</TableCell>
                                        <TableCell><Badge>{ticket.status}</Badge></TableCell>
                                        <TableCell><Badge>{ticket.priority}</Badge></TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}