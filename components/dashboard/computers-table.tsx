"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Monitor,
  Play,
  Square,
  Lock,
  Search,
  Filter,
  Power,
  Wifi,
  WifiOff,
  Clock,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ComputerStatus = "FREE" | "BUSY" | "OFFLINE"

interface Computer {
  id: number
  number: string
  status: ComputerStatus
  user: string | null
  sessionTime: string | null
  game: string | null
  earnings: string | null
  specs: string
}

const initialComputers: Computer[] = [
  { id: 1, number: "PC-01", status: "BUSY", user: "Alex Rivera", sessionTime: "2h 14m", game: "Valorant", earnings: "$8.50", specs: "RTX 4070 / i7-13700K" },
  { id: 2, number: "PC-02", status: "BUSY", user: "Maya Chen", sessionTime: "1h 32m", game: "CS2", earnings: "$6.00", specs: "RTX 4070 / i7-13700K" },
  { id: 3, number: "PC-03", status: "FREE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4060 / i5-13600K" },
  { id: 4, number: "PC-04", status: "BUSY", user: "Jordan Lee", sessionTime: "3h 45m", game: "League of Legends", earnings: "$14.25", specs: "RTX 4070 / i7-13700K" },
  { id: 5, number: "PC-05", status: "OFFLINE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4060 / i5-13600K" },
  { id: 6, number: "PC-06", status: "FREE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4070 / i7-13700K" },
  { id: 7, number: "PC-07", status: "BUSY", user: "Sam Nakamura", sessionTime: "0h 47m", game: "Fortnite", earnings: "$3.00", specs: "RTX 4080 / i9-13900K" },
  { id: 8, number: "PC-08", status: "BUSY", user: "Taylor Brooks", sessionTime: "1h 58m", game: "Apex Legends", earnings: "$7.50", specs: "RTX 4070 / i7-13700K" },
  { id: 9, number: "PC-09", status: "FREE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4060 / i5-13600K" },
  { id: 10, number: "PC-10", status: "BUSY", user: "Quinn Davis", sessionTime: "4h 12m", game: "Dota 2", earnings: "$16.00", specs: "RTX 4080 / i9-13900K" },
  { id: 11, number: "PC-11", status: "OFFLINE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4060 / i5-13600K" },
  { id: 12, number: "PC-12", status: "FREE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4070 / i7-13700K" },
  { id: 13, number: "PC-13", status: "BUSY", user: "Casey Park", sessionTime: "0h 23m", game: "Overwatch 2", earnings: "$1.50", specs: "RTX 4070 / i7-13700K" },
  { id: 14, number: "PC-14", status: "FREE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4060 / i5-13600K" },
  { id: 15, number: "PC-15", status: "BUSY", user: "Drew Patel", sessionTime: "2h 05m", game: "PUBG", earnings: "$8.00", specs: "RTX 4080 / i9-13900K" },
  { id: 16, number: "PC-16", status: "FREE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4060 / i5-13600K" },
  { id: 17, number: "PC-17", status: "BUSY", user: "Morgan Swift", sessionTime: "1h 11m", game: "Rocket League", earnings: "$4.50", specs: "RTX 4070 / i7-13700K" },
  { id: 18, number: "PC-18", status: "OFFLINE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4060 / i5-13600K" },
  { id: 19, number: "PC-19", status: "FREE", user: null, sessionTime: null, game: null, earnings: null, specs: "RTX 4070 / i7-13700K" },
  { id: 20, number: "PC-20", status: "BUSY", user: "Riley Kim", sessionTime: "5h 30m", game: "Valorant", earnings: "$21.00", specs: "RTX 4080 / i9-13900K" },
]

const statusConfig: Record<ComputerStatus, { label: string; className: string; icon: typeof Wifi }> = {
  FREE: {
    label: "FREE",
    className: "border-neon-green/40 bg-neon-green/10 text-neon-green",
    icon: Wifi,
  },
  BUSY: {
    label: "BUSY",
    className: "border-neon/40 bg-neon/10 text-neon",
    icon: Monitor,
  },
  OFFLINE: {
    label: "OFFLINE",
    className: "border-muted-foreground/40 bg-muted/50 text-muted-foreground",
    icon: WifiOff,
  },
}

export function ComputersTable() {
  const [computers, setComputers] = useState<Computer[]>(initialComputers)
  const [filterStatus, setFilterStatus] = useState<ComputerStatus | "ALL">("ALL")
  const [search, setSearch] = useState("")
  const [dialogState, setDialogState] = useState<{
    open: boolean
    action: "start" | "end" | "lock" | null
    computer: Computer | null
  }>({ open: false, action: null, computer: null })

  const filteredComputers = computers.filter((pc) => {
    const matchesStatus = filterStatus === "ALL" || pc.status === filterStatus
    const matchesSearch =
      search === "" ||
      pc.number.toLowerCase().includes(search.toLowerCase()) ||
      (pc.user && pc.user.toLowerCase().includes(search.toLowerCase())) ||
      (pc.game && pc.game.toLowerCase().includes(search.toLowerCase()))
    return matchesStatus && matchesSearch
  })

  const counts = {
    total: computers.length,
    free: computers.filter((c) => c.status === "FREE").length,
    busy: computers.filter((c) => c.status === "BUSY").length,
    offline: computers.filter((c) => c.status === "OFFLINE").length,
  }

  function openDialog(action: "start" | "end" | "lock", computer: Computer) {
    setDialogState({ open: true, action, computer })
  }

  function confirmAction() {
    if (!dialogState.computer || !dialogState.action) return

    setComputers((prev) =>
      prev.map((pc) => {
        if (pc.id !== dialogState.computer!.id) return pc
        switch (dialogState.action) {
          case "start":
            return { ...pc, status: "BUSY" as ComputerStatus, user: "New User", sessionTime: "0h 00m", game: "Selecting...", earnings: "$0.00" }
          case "end":
            return { ...pc, status: "FREE" as ComputerStatus, user: null, sessionTime: null, game: null, earnings: null }
          case "lock":
            return { ...pc, status: "OFFLINE" as ComputerStatus, user: null, sessionTime: null, game: null, earnings: null }
          default:
            return pc
        }
      })
    )
    setDialogState({ open: false, action: null, computer: null })
  }

  const actionLabels = {
    start: { title: "Start Session", description: "Begin a new gaming session on this computer.", confirmText: "Start Session", color: "text-neon-green" },
    end: { title: "End Session", description: "End the current session and free up this computer.", confirmText: "End Session", color: "text-neon-amber" },
    lock: { title: "Lock Computer", description: "Set this computer to offline/maintenance mode.", confirmText: "Lock Computer", color: "text-destructive" },
  }

  return (
    <>
      {/* Summary cards row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total PCs", value: counts.total, icon: <Monitor className="h-4 w-4 text-foreground" />, accent: "bg-foreground" },
          { label: "Free", value: counts.free, icon: <Power className="h-4 w-4 text-neon-green" />, accent: "bg-neon-green" },
          { label: "Busy", value: counts.busy, icon: <Wifi className="h-4 w-4 text-neon" />, accent: "bg-neon" },
          { label: "Offline", value: counts.offline, icon: <WifiOff className="h-4 w-4 text-muted-foreground" />, accent: "bg-muted-foreground" },
        ].map((item) => (
          <Card key={item.label} className="relative overflow-hidden border-border/50 bg-card">
            <div className={cn("absolute inset-x-0 top-0 h-px", item.accent)} />
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                {item.icon}
              </div>
              <div>
                <p className="text-2xl font-bold font-mono text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main table card */}
      <Card className="border-border/50 bg-card">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">All Computers</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Manage and monitor all PC stations in real-time
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search PCs, users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-40 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Search computers"
                />
              </div>
              {/* Filter tabs */}
              <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/30 p-0.5">
                <Filter className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                {(["ALL", "FREE", "BUSY", "OFFLINE"] as const).map((status) => (
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
                    {status === "ALL" ? "All" : status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Computer</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Current User</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Game</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Session Time</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Earnings</TableHead>
                <TableHead className="text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComputers.map((pc) => {
                const config = statusConfig[pc.status]
                return (
                  <TableRow key={pc.id} className="border-border/30 transition-colors hover:bg-secondary/30">
                    {/* Computer number */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg border",
                          pc.status === "BUSY" ? "border-neon/20 bg-neon/5" :
                          pc.status === "FREE" ? "border-neon-green/20 bg-neon-green/5" :
                          "border-border bg-muted/30"
                        )}>
                          <Monitor className={cn(
                            "h-4 w-4",
                            pc.status === "BUSY" ? "text-neon" :
                            pc.status === "FREE" ? "text-neon-green" :
                            "text-muted-foreground"
                          )} />
                        </div>
                        <div>
                          <p className="font-mono text-sm font-semibold text-foreground">{pc.number}</p>
                          <p className="text-[10px] text-muted-foreground">{pc.specs}</p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Status badge */}
                    <TableCell>
                      <Badge variant="outline" className={cn("gap-1.5 font-mono text-[10px] font-bold tracking-wider", config.className)}>
                        <config.icon className="h-3 w-3" />
                        {config.label}
                      </Badge>
                    </TableCell>

                    {/* Current user */}
                    <TableCell>
                      {pc.user ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 border border-border">
                            <AvatarFallback className="bg-secondary text-[10px] font-semibold text-foreground">
                              {pc.user.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-foreground">{pc.user}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">--</span>
                      )}
                    </TableCell>

                    {/* Game */}
                    <TableCell>
                      {pc.game ? (
                        <span className="text-sm text-foreground">{pc.game}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">--</span>
                      )}
                    </TableCell>

                    {/* Session time */}
                    <TableCell>
                      {pc.sessionTime ? (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-neon" />
                          <span className="font-mono text-sm text-foreground">{pc.sessionTime}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">--</span>
                      )}
                    </TableCell>

                    {/* Earnings */}
                    <TableCell>
                      {pc.earnings ? (
                        <span className="font-mono text-sm font-semibold text-neon-green">{pc.earnings}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">--</span>
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {pc.status === "FREE" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openDialog("start", pc)}
                            className="h-8 gap-1.5 text-xs text-neon-green hover:bg-neon-green/10 hover:text-neon-green"
                          >
                            <Play className="h-3.5 w-3.5" />
                            <span className="hidden xl:inline">Start</span>
                          </Button>
                        )}
                        {pc.status === "BUSY" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openDialog("end", pc)}
                            className="h-8 gap-1.5 text-xs text-neon-amber hover:bg-neon-amber/10 hover:text-neon-amber"
                          >
                            <Square className="h-3.5 w-3.5" />
                            <span className="hidden xl:inline">End</span>
                          </Button>
                        )}
                        {pc.status !== "OFFLINE" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openDialog("lock", pc)}
                            className="h-8 gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Lock className="h-3.5 w-3.5" />
                            <span className="hidden xl:inline">Lock</span>
                          </Button>
                        )}
                        {pc.status === "OFFLINE" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openDialog("start", { ...pc, status: "FREE" })}
                            className="h-8 gap-1.5 text-xs text-neon-green hover:bg-neon-green/10 hover:text-neon-green"
                          >
                            <Power className="h-3.5 w-3.5" />
                            <span className="hidden xl:inline">Power On</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {filteredComputers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <User className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No computers match your filter</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation dialog */}
      <Dialog open={dialogState.open} onOpenChange={(open) => setDialogState((s) => ({ ...s, open }))}>
        <DialogContent className="border-border bg-card">
          {dialogState.action && dialogState.computer && (
            <>
              <DialogHeader>
                <DialogTitle className={cn("text-foreground", actionLabels[dialogState.action].color)}>
                  {actionLabels[dialogState.action].title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {actionLabels[dialogState.action].description}
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/50">
                    <Monitor className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-semibold text-foreground">{dialogState.computer.number}</p>
                    {dialogState.computer.user && (
                      <p className="text-xs text-muted-foreground">
                        Current user: {dialogState.computer.user}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDialogState({ open: false, action: null, computer: null })} className="text-muted-foreground hover:text-foreground">
                  Cancel
                </Button>
                <Button onClick={confirmAction} className="gap-1.5 bg-neon text-background hover:bg-neon/90">
                  {actionLabels[dialogState.action].confirmText}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
