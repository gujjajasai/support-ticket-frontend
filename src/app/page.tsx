"use client"

// And if you add the chat interface later, it will be:
// import { ChatInterface } from "@/components/ui/ChatInterface"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentDashboard } from "@/components/ui/AgentDashboard"
import { CustomerDashboard } from "@/components/ui/CustomerDashboard"

// --- TYPE DEFINITIONS ---
export interface Ticket {
  ticketId: number;
  customerId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}
export interface User {
  userId: number;
  name: string;
  email: string;
  role: "Customer" | "Agent";
}

export default function AuthenticationPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8088/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await response.json();
      if (response.ok) {
        setLoggedInUser(data);
      } else {
        alert(`Login Failed: ${data.error}`);
      }
    } catch (error) {
      alert('A network error occurred.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8088/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword, role: "Customer" })
      });
      const data = await response.json();
      if (response.status === 201) {
        alert('Registration Successful! Please log in.');
      } else {
        alert(`Registration Failed: ${data.error || data.message}`);
      }
    } catch (error) {
      alert('A network error occurred.');
    }
  };
  
  if (loggedInUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Support System
            </h1>
            <Button variant="outline" onClick={() => setLoggedInUser(null)}>Logout</Button>
          </div>
          {loggedInUser.role === 'Agent' ? (
            <AgentDashboard user={loggedInUser} />
          ) : (
            <CustomerDashboard user={loggedInUser} />
          )}
        </div>
      </div>
    );
  }

  // LOGIN/REGISTER UI
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader><CardTitle>Login</CardTitle><CardDescription>Access your account.</CardDescription></CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1"><Label htmlFor="login-email">Email</Label><Input id="login-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required /></div>
                <div className="space-y-1"><Label htmlFor="login-password">Password</Label><Input id="login-password" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required /></div>
                <Button className="w-full mt-4" type="submit">Login</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader><CardTitle>Register</CardTitle><CardDescription>Create a new customer account.</CardDescription></CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1"><Label htmlFor="reg-name">Full Name</Label><Input id="reg-name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required /></div>
                <div className="space-y-1"><Label htmlFor="reg-email">Email</Label><Input id="reg-email" type="email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required /></div>
                <div className="space-y-1"><Label htmlFor="reg-password">Password</Label><Input id="reg-password" type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required /></div>
                <Button className="w-full mt-4" type="submit">Create Account</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}