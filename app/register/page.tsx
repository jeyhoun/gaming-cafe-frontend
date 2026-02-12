"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Gamepad2, Loader2, UserPlus, AlertCircle } from "lucide-react"

const formSchema = z.object({
  username: z.string().min(3, "İstifadəçi adı ən azı 3 simvol olmalıdır").max(50, "İstifadəçi adı ən çox 50 simvol ola bilər"),
  email: z.string().email("Düzgün email daxil edin"),
  password: z.string().min(6, "Şifrə ən azı 6 simvol olmalıdır"),
})

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch("http://127.0.0.1:8080/api/v1/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: 'no-store',
      })

      const data = await response.json()

      if (!response.ok || (data.code && data.code !== 200)) {
        throw new Error(data.message || "Qeydiyyat uğursuz oldu")
      }
      
      if (!data.data?.accessToken) {
        throw new Error("Qeydiyyat zamanı xəta baş verdi")
      }

      localStorage.setItem("accessToken", data.data.accessToken)
      if (data.data?.refreshToken) {
        localStorage.setItem("refreshToken", data.data.refreshToken)
      }

      // İstifadəçi məlumatlarını yadda saxla
      if (data.data) {
        localStorage.setItem("user", JSON.stringify({
          username: data.data.username,
          email: data.data.email,
          id: data.data.id
        }))
      }

      setIsSuccess(true)
      
      setTimeout(() => {
        router.push("/")
      }, 2500)

    } catch (error: any) {
      console.error("Registration Error:", error)
      
      toast.error("REGISTRATION FAILED", {
        description: error.message,
        style: {
          background: 'rgba(20, 0, 0, 0.9)',
          border: '1px solid hsl(var(--destructive))',
          color: 'hsl(var(--destructive-foreground))',
          fontFamily: 'var(--font-jetbrains-mono)',
        },
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
        duration: 5000,
      })
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon/20 via-background to-background animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex h-32 w-32 items-center justify-center mb-8">
            <div className="absolute inset-0 animate-ping rounded-full bg-neon opacity-20 duration-1000"></div>
            <div className="absolute inset-4 animate-pulse rounded-full bg-neon opacity-40 duration-700"></div>
            <UserPlus className="h-16 w-16 text-neon animate-bounce" />
          </div>
          
          <h2 className="text-3xl font-bold tracking-[0.2em] text-neon animate-pulse mb-2 font-mono">
            CREATING PROFILE
          </h2>
          <p className="text-muted-foreground text-sm tracking-widest mb-8 animate-pulse">
            ESTABLISHING SECURE CONNECTION
          </p>
          
          <div className="h-1 w-64 overflow-hidden rounded-full bg-secondary/50 border border-neon/20">
            <div className="h-full bg-neon shadow-[0_0_10px_rgba(var(--neon),0.8)] animate-[width_2s_ease-in-out_forwards] w-0" style={{ width: '100%', transition: 'width 2s ease-in-out' }}></div>
          </div>
        </div>
      </div>
    )
  }

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
                <UserPlus className="h-10 w-10 text-neon" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground font-mono">
            NEW <span className="text-neon">OPERATOR</span>
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs uppercase tracking-widest mt-2">
            Register for System Access
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 text-xs uppercase tracking-wider font-semibold">Codename</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="username" 
                        {...field} 
                        className="bg-secondary/30 border-border/50 focus:border-neon/70 focus:ring-neon/20 transition-all duration-300 h-11 pl-4 font-mono text-sm hover:border-neon/30"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive font-mono text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 text-xs uppercase tracking-wider font-semibold">Email Frequency</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="m@example.com" 
                        {...field} 
                        className="bg-secondary/30 border-border/50 focus:border-neon/70 focus:ring-neon/20 transition-all duration-300 h-11 pl-4 font-mono text-sm hover:border-neon/30"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive font-mono text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 text-xs uppercase tracking-wider font-semibold">Access Key</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        {...field} 
                        className="bg-secondary/30 border-border/50 focus:border-neon/70 focus:ring-neon/20 transition-all duration-300 h-11 pl-4 font-mono text-sm hover:border-neon/30"
                      />
                    </FormControl>
                    <FormMessage className="text-destructive font-mono text-xs" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full h-11 bg-neon text-background hover:bg-neon/90 font-bold tracking-wide shadow-[0_0_20px_-5px_rgba(var(--neon),0.5)] transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(var(--neon),0.7)] hover:scale-[1.02] active:scale-[0.98]" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    REGISTERING...
                  </>
                ) : (
                  "INITIATE REGISTRATION"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="pb-8">
          <div className="text-xs text-muted-foreground text-center w-full font-mono">
            ALREADY AUTHORIZED?{" "}
            <Link href="/login" className="text-neon hover:text-neon/80 hover:underline transition-colors font-bold ml-1">
              LOGIN
            </Link>
          </div>
        </CardFooter>
      </Card>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon/50 to-transparent opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent opacity-30"></div>
    </div>
  )
}
