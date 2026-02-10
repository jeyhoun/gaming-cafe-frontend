"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Headphones, Send, Mail, Clock, MessageCircle } from "lucide-react"
import { useState } from "react"

export default function SupportPage() {
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Support
          </h2>
          <p className="text-sm text-muted-foreground">
            Open a ticket or get in touch with the support team.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                    <Headphones className="h-4 w-4 text-neon" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Open a ticket</CardTitle>
                    <CardDescription className="text-xs">
                      Describe your issue and we’ll get back to you as soon as possible
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief summary of your issue"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category" className="bg-background">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[140px] resize-none bg-background"
                    rows={5}
                  />
                </div>
                <Button className="gap-2 bg-neon text-primary-foreground hover:bg-neon/90">
                  <Send className="h-4 w-4" />
                  Send ticket
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info card */}
          <div className="space-y-4">
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Support hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0 text-neon" />
                  <span>Mon – Fri: 09:00 – 22:00</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0 text-neon" />
                  <span>Sat – Sun: 10:00 – 02:00</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0 text-neon" />
                  <a
                    href="mailto:support@nexusplay.az"
                    className="text-foreground underline-offset-4 hover:text-neon hover:underline"
                  >
                    support@nexusplay.az
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4 shrink-0 text-neon" />
                  <span>Response within 24 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
