"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { DollarSign, Clock, Sliders, Save } from "lucide-react"
import { useState } from "react"

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const

export default function SettingsPage() {
  const [pricePerHour, setPricePerHour] = useState("2.50")
  const [currency, setCurrency] = useState("AZN")
  const [openTime, setOpenTime] = useState("09:00")
  const [closeTime, setCloseTime] = useState("02:00")
  const [notifications, setNotifications] = useState(true)
  const [soundEffects, setSoundEffects] = useState(false)
  const [autoLogout, setAutoLogout] = useState(true)
  const [sessionReminder, setSessionReminder] = useState(true)

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Admin Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Configure pricing, opening hours, and system preferences for your gaming club.
          </p>
        </div>

        {/* Price per hour */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                <DollarSign className="h-4 w-4 text-neon" />
              </div>
              <div>
                <CardTitle className="text-base">Price per hour</CardTitle>
                <CardDescription className="text-xs">
                  Set the hourly rate for gaming sessions
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Amount</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={pricePerHour}
                  onChange={(e) => setPricePerHour(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AZN">AZN</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="TRY">TRY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Club opening hours */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                <Clock className="h-4 w-4 text-neon" />
              </div>
              <div>
                <CardTitle className="text-base">Club opening hours</CardTitle>
                <CardDescription className="text-xs">
                  Set when your club opens and closes (same schedule for all days)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="open">Opening time</Label>
                <Input
                  id="open"
                  type="time"
                  value={openTime}
                  onChange={(e) => setOpenTime(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="close">Closing time</Label>
                <Input
                  id="close"
                  type="time"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Applied to: {DAYS.join(", ")}
            </p>
          </CardContent>
        </Card>

        {/* System preferences */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                <Sliders className="h-4 w-4 text-neon" />
              </div>
              <div>
                <CardTitle className="text-base">System preferences</CardTitle>
                <CardDescription className="text-xs">
                  Notifications, sounds, and session behavior
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-0">
            <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="notifications" className="text-sm font-medium">
                  Desktop notifications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Show alerts for new sessions and low balance
                </p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="sound" className="text-sm font-medium">
                  Sound effects
                </Label>
                <p className="text-xs text-muted-foreground">
                  Play sounds for session start/end and alerts
                </p>
              </div>
              <Switch
                id="sound"
                checked={soundEffects}
                onCheckedChange={setSoundEffects}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="autologout" className="text-sm font-medium">
                  Auto-logout inactive sessions
                </Label>
                <p className="text-xs text-muted-foreground">
                  End sessions after a period of inactivity
                </p>
              </div>
              <Switch
                id="autologout"
                checked={autoLogout}
                onCheckedChange={setAutoLogout}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-4">
              <div>
                <Label htmlFor="reminder" className="text-sm font-medium">
                  Session time reminder
                </Label>
                <p className="text-xs text-muted-foreground">
                  Notify users when their session is about to end
                </p>
              </div>
              <Switch
                id="reminder"
                checked={sessionReminder}
                onCheckedChange={setSessionReminder}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex justify-end">
          <Button className="gap-2 bg-neon text-primary-foreground hover:bg-neon/90">
            <Save className="h-4 w-4" />
            Save changes
          </Button>
        </div>
      </div>
    </DashboardShell>
  )
}
