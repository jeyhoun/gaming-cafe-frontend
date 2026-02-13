"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, Gamepad2, Loader2, AlertCircle, Lock } from "lucide-react";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      console.log("No token found in URL");
      setIsVerifying(false);
      setErrorMessage("Token not found in URL.");
      return;
    }

    const verifyToken = async () => {
      console.log("Starting verification for token:", token);
      try {
        const url = `http://127.0.0.1:8080/api/v1/auth/reset-password/verify?token=${token}`;
        console.log("Fetching URL:", url);

        const response = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Verification response data:", data);

        if (data.data?.valid === true) {
          console.log("Token is valid");
          setIsValid(true);
        } else {
          console.warn("Token is invalid according to backend response");
          setErrorMessage("Invalid or expired token.");
        }
      } catch (error: any) {
        console.error("Verification error details:", error);
        setErrorMessage(`Failed to verify token: ${error.message}`);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting new password...");
      const response = await fetch("http://127.0.0.1:8080/api/v1/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ 
            token: token,
            newPassword: newPassword 
        }),
        cache: 'no-store'
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
      console.log("Reset password response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      toast.success("PASSWORD RESET SUCCESSFUL", {
        description: "You can now login with your new password.",
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

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error: any) {
      console.error("Reset Password Error:", error);
      toast.error("ERROR", {
        description: error.message || "An error occurred.",
        style: {
          background: 'rgba(20, 0, 0, 0.9)',
          border: '1px solid hsl(var(--destructive))',
          color: 'hsl(var(--destructive-foreground))',
          fontFamily: 'var(--font-jetbrains-mono)',
        },
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-neon font-mono">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="text-lg tracking-widest animate-pulse">VERIFYING TOKEN...</p>
      </div>
    );
  }

  if (!isValid) {
    return (
      <Card className="relative z-10 w-full max-w-md border-destructive/50 bg-card/40 backdrop-blur-xl">
        <CardHeader className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <CardTitle className="text-xl text-destructive font-mono">INVALID LINK</CardTitle>
          <CardDescription className="mt-2 text-destructive/80 font-mono text-xs">
            {errorMessage || "This password reset link is invalid or has expired."}
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center pb-6">
          <Link href="/forgot-password">
            <Button variant="outline" className="border-neon/50 text-neon hover:bg-neon/10">
              Request New Link
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="relative z-10 w-full max-w-md border-neon/30 bg-card/40 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(var(--neon),0.3)] transition-all duration-500 hover:shadow-[0_0_60px_-10px_rgba(var(--neon),0.4)] hover:border-neon/50">
      <CardHeader className="space-y-1 text-center pb-2">
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-neon opacity-25 blur transition duration-500 group-hover:opacity-75"></div>
            <div className="relative rounded-full bg-background/80 p-4 ring-1 ring-neon/50 backdrop-blur-sm">
              <Lock className="h-10 w-10 text-neon" />
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground font-mono">
          Set New Password
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs uppercase tracking-widest mt-2">
          Enter your new secure password
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="newPassword" className="text-foreground/80 text-xs uppercase tracking-wider font-semibold">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-secondary/30 border-border/50 focus:border-neon/70 focus:ring-neon/20 transition-all duration-300 h-11 pl-4 font-mono text-sm hover:border-neon/30"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-foreground/80 text-xs uppercase tracking-wider font-semibold">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-secondary/30 border-border/50 focus:border-neon/70 focus:ring-neon/20 transition-all duration-300 h-11 pl-4 font-mono text-sm hover:border-neon/30"
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-11 bg-neon text-background hover:bg-neon/90 font-bold tracking-wide shadow-[0_0_20px_-5px_rgba(var(--neon),0.5)] transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(var(--neon),0.7)] hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2 font-mono">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  UPDATING...
                </span>
              ) : (
                "RESET PASSWORD"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,rgba(var(--neon),0.15),transparent)]"></div>
      
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[300px] text-neon font-mono z-10">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p className="text-lg tracking-widest animate-pulse">LOADING...</p>
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon/50 to-transparent opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent opacity-30"></div>
    </div>
  );
}
