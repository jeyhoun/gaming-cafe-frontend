"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, Calendar, Shield } from "lucide-react"

const profile = {
  name: "Jeyhun Mammadsaidov",
  email: "jeyhoon@gamingclubdev.az",
  phone: "+994 55 555 55 55",
  role: "Owner",
  joined: "2024-01-15",
  lastLogin: "2025-02-10, 14:32",
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}

export default function ProfilePage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Profile
          </h2>
          <p className="text-sm text-muted-foreground">
            Your account and profile information.
          </p>
        </div>

        {/* Profile overview card */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                <User className="h-4 w-4 text-neon" />
              </div>
              <div>
                <CardTitle className="text-base">Profile overview</CardTitle>
                <CardDescription className="text-xs">
                  Account details and role
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Avatar className="h-20 w-20 border-2 border-neon/30">
                <AvatarImage src="/placeholder-user.jpg" alt={profile.name} />
                <AvatarFallback className="bg-neon/10 text-2xl font-semibold text-neon">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-foreground">{profile.name}</h3>
                <Badge
                  variant="secondary"
                  className="w-fit border-neon/20 bg-neon/10 px-2 py-0.5 text-xs font-semibold text-neon"
                >
                  {profile.role}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Member since {formatDate(profile.joined)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & account details */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                <Mail className="h-4 w-4 text-neon" />
              </div>
              <div>
                <CardTitle className="text-base">Contact & account</CardTitle>
                <CardDescription className="text-xs">
                  Email, phone, and login info
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">{profile.email}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Phone</p>
                  <p className="font-mono text-sm text-foreground">{profile.phone}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Last login</p>
                  <p className="text-sm text-foreground">{profile.lastLogin}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security / role info */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                <Shield className="h-4 w-4 text-neon" />
              </div>
              <div>
                <CardTitle className="text-base">Role & access</CardTitle>
                <CardDescription className="text-xs">
                  Your permissions as {profile.role}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have full access to the NexusPlay admin dashboard: dashboard, computers, sessions,
              members, bookings, analytics, billing, support, and settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
