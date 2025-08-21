"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PaperPlaneIcon, ChatBubbleIcon, Cross2Icon } from '@radix-ui/react-icons';

interface Message { author: 'user' | 'bot'; content: string; }

export function ChatInterface() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { author: 'bot', content: 'Hello! I am your AI Support Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { author: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const historyForApi = newMessages.filter(msg => msg.content !== 'Hello! I am your AI Support Assistant. How can I help you today?');
            
            const response = await fetch('http://localhost:3001/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ history: historyForApi.slice(0, -1), message: input })
            });

            if (!response.ok) throw new Error("Failed to get response from AI agent.");

            const data = await response.json();
            const botMessage: Message = { author: 'bot', content: data.reply };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = { author: 'bot', content: "Sorry, I'm having trouble connecting right now." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return <Button className="fixed bottom-8 right-8 rounded-full h-16 w-16 shadow-lg z-50" onClick={() => setIsOpen(true)}><ChatBubbleIcon className="h-8 w-8" /></Button>;
    }

    return (
        <Card className="fixed bottom-8 right-8 w-96 h-[600px] shadow-lg flex flex-col z-50">
            <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                <div className="flex items-center space-x-4"><Avatar><AvatarFallback>AI</AvatarFallback></Avatar><div><CardTitle className="text-base">Support Assistant</CardTitle><p className="text-xs text-green-500">Online</p></div></div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><Cross2Icon /></Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (<div key={index} className={`flex items-end gap-2 ${msg.author === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`rounded-lg p-3 max-w-xs text-sm ${msg.author === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}><p>{msg.content}</p></div></div>))}
                {isLoading && <p className="text-xs text-gray-500 self-start">Assistant is typing...</p>}
                <div ref={messagesEndRef} />
            </CardContent>
            <CardFooter className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2"><Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." disabled={isLoading} autoComplete="off" /><Button type="submit" disabled={isLoading}><PaperPlaneIcon /></Button></form>
            </CardFooter>
        </Card>
    );
}