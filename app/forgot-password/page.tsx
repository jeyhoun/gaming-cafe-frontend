"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, Gamepad2, Timer, Loader2, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldown > 0 || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        cache: 'no-store'
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      toast.success(resendCount > 0 ? "LINK RESENT" : "LINK SENT", {
        description: resendCount > 0 
          ? "Reset link has been resent." 
          : "If an account exists with this email, a reset link has been sent.",
        style: {
          background: 'rgba(0, 30, 10, 0.95)',
          border: '1px solid #4ade80',
          color: '#4ade80',
          boxShadow: '0 0 20px -5px rgba(74, 222, 128, 0.4)',
          fontFamily: 'var(--font-jetbrains-mono)',
        },
        icon: <CheckCircle className="h-5 w-5 text-[#4ade80]" />,
        duration: 5000,
      });

      // Logic for cooldown
      const newResendCount = resendCount + 1;
      setResendCount(newResendCount);

      if (newResendCount >= 4) { 
         setCooldown(300); // 5 minutes block
         setResendCount(0); 
      } else {
         setCooldown(60); // 60 seconds cooldown
      }

    } catch (error: any) {
      console.error("Forgot Password Error:", error);
      toast.error("ERROR", {
        description: error.message || "An error occurred while sending the request.",
        style: {
          background: 'rgba(20, 0, 0, 0.9)',
          border: '1px solid hsl(var(--destructive))',
          color: 'hsl(var(--destructive-foreground))',
          fontFamily: 'var(--font-jetbrains-mono)',
        },
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,rgba(var(--neon),0.15),transparent)]"></div>
      
      <Card className="relative z-10 w-full max-w-md border-neon/30 bg-card/40 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(var(--neon),0.3)] transition-all duration-500 hover:shadow-[0_0_60px_-10px_rgba(var(--neon),0.4)] hover:border-neon/50">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-full bg-neon opacity-25 blur transition duration-500 group-hover:opacity-75"></div>
              <div className="relative rounded-full bg-background/80 p-4 ring-1 ring-neon/50 backdrop-blur-sm">
                <Gamepad2 className="h-10 w-10 text-neon" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground font-mono">
            Reset Password
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs uppercase tracking-widest mt-2">
            Enter your email for reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-foreground/80 text-xs uppercase tracking-wider font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={(cooldown > 0 && resendCount >= 4) || isLoading} 
                  className="bg-secondary/30 border-border/50 focus:border-neon/70 focus:ring-neon/20 transition-all duration-300 h-11 pl-4 font-mono text-sm hover:border-neon/30"
                />
              </div>
              <Button 
                type="submit" 
                disabled={cooldown > 0 || isLoading}
                className={`w-full h-11 font-bold tracking-wide shadow-[0_0_20px_-5px_rgba(var(--neon),0.5)] transition-all duration-300 ${
                  cooldown > 0 || isLoading
                    ? "bg-secondary text-muted-foreground cursor-not-allowed" 
                    : "bg-neon text-background hover:bg-neon/90 hover:shadow-[0_0_30px_-5px_rgba(var(--neon),0.7)] hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 font-mono">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    SENDING...
                  </span>
                ) : cooldown > 0 ? (
                  <span className="flex items-center gap-2 font-mono">
                    <Timer className="h-4 w-4" />
                    WAIT ({formatTime(cooldown)})
                  </span>
                ) : (
                  resendCount > 0 ? "Resend link" : "Send reset link"
                )}
              </Button>
              
              {resendCount > 0 && resendCount < 4 && cooldown === 0 && !isLoading && (
                 <p className="text-[10px] text-muted-foreground text-center font-mono uppercase">
                   Remaining attempts: {4 - resendCount}
                 </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="pb-8">
           <div className="text-xs text-muted-foreground text-center w-full font-mono">
            <Link href="/login" className="text-neon hover:text-neon/80 hover:underline transition-colors font-bold ml-1">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon/50 to-transparent opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent opacity-30"></div>
    </div>
  );
}
