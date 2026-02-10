"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Gamepad2, Search, Monitor, User, Clock, Square } from "lucide-react"
import { cn } from "@/lib/utils"

type SessionStatus = "active" | "ended"

interface Session {
  id: number
  pc: string
  customer: string
  started: string
  duration: string
  game: string
  status: SessionStatus
}

const initialSessions: Session[] = [
  { id: 1, pc: "PC-01", customer: "Alex Rivera", started: "14:00", duration: "2h 14m", game: "Valorant", status: "active" },
  { id: 2, pc: "PC-02", customer: "Maya Chen", started: "15:30", duration: "1h 32m", game: "CS2", status: "active" },
  { id: 3, pc: "PC-04", customer: "Jordan Lee", started: "12:00", duration: "3h 45m", game: "League of Legends", status: "active" },
  { id: 4, pc: "PC-07", customer: "Sam Nakamura", started: "16:15", duration: "0h 47m", game: "Fortnite", status: "active" },
  { id: 5, pc: "PC-08", customer: "Taylor Brooks", started: "13:02", duration: "1h 58m", game: "Apex Legends", status: "active" },
  { id: 6, pc: "PC-10", customer: "Quinn Davis", started: "10:00", duration: "4h 12m", game: "Dota 2", status: "active" },
  { id: 7, pc: "PC-03", customer: "Casey Park", started: "09:30", duration: "2h 00m", game: "Overwatch 2", status: "ended" },
  { id: 8, pc: "PC-06", customer: "Drew Patel", started: "11:00", duration: "1h 30m", game: "PUBG", status: "ended" },
]

const statusConfig: Record<SessionStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "border-neon-green/40 bg-neon-green/10 text-neon-green",
  },
  ended: {
    label: "Ended",
    className: "border-muted-foreground/40 bg-muted/50 text-muted-foreground",
  },
}

export default function SessionsPage() {
  const [filterStatus, setFilterStatus] = useState<SessionStatus | "ALL">("ALL")
  const [search, setSearch] = useState("")

  const filteredSessions = initialSessions.filter((s) => {
    const matchesStatus = filterStatus === "ALL" || s.status === filterStatus
    const matchesSearch =
      search === "" ||
      s.pc.toLowerCase().includes(search.toLowerCase()) ||
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.game.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const activeCount = initialSessions.filter((s) => s.status === "active").length
  const endedCount = initialSessions.filter((s) => s.status === "ended").length

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            Active and past gaming sessions.
          </p>
        </div>

        {/* Sessions table */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                    <Gamepad2 className="h-4 w-4 text-neon" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Gaming sessions</CardTitle>
                    <CardDescription className="text-xs">
                      {activeCount} active, {endedCount} ended
                    </CardDescription>
                  </div>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search PC, customer, game..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-9 bg-background pl-8"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/30 p-0.5">
                {(["ALL", "active", "ended"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFilterStatus(status)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                      filterStatus === status
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {status === "ALL" ? "All" : status === "active" ? "Active" : "Ended"}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    PC
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Customer
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Started
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Duration
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Game
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((s) => {
                  const config = statusConfig[s.status]
                  return (
                    <TableRow
                      key={s.id}
                      className="border-border/30 transition-colors hover:bg-secondary/30"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-lg border",
                              s.status === "active"
                                ? "border-neon/20 bg-neon/5"
                                : "border-border bg-muted/30"
                            )}
                          >
                            <Monitor
                              className={cn(
                                "h-4 w-4",
                                s.status === "active" ? "text-neon" : "text-muted-foreground"
                              )}
                            />
                          </div>
                          <span className="font-mono text-sm font-semibold text-foreground">
                            {s.pc}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 border border-border">
                            <AvatarFallback className="bg-secondary text-[10px] font-semibold text-foreground">
                              {s.customer
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground">{s.customer}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm text-foreground">{s.started}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-neon" />
                          <span className="font-mono text-sm text-foreground">{s.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-foreground">{s.game}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "font-mono text-[10px] font-semibold",
                            config.className
                          )}
                        >
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {s.status === "active" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 gap-1.5 text-xs text-neon-amber hover:bg-neon-amber/10 hover:text-neon-amber"
                          >
                            <Square className="h-3.5 w-3.5" />
                            <span className="hidden xl:inline">End session</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
