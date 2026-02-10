"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CalendarDays, Plus, Clock, User, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"

type BookingStatus = "confirmed" | "pending" | "cancelled"

interface Booking {
  id: number
  date: string
  time: string
  customer: string
  pc: string
  duration: string
  status: BookingStatus
}

const initialBookings: Booking[] = [
  { id: 1, date: "2025-02-10", time: "14:00", customer: "Alex Rivera", pc: "PC-03", duration: "2h", status: "confirmed" },
  { id: 2, date: "2025-02-10", time: "16:30", customer: "Maya Chen", pc: "PC-07", duration: "1h", status: "pending" },
  { id: 3, date: "2025-02-11", time: "10:00", customer: "Jordan Lee", pc: "PC-01", duration: "3h", status: "confirmed" },
  { id: 4, date: "2025-02-11", time: "18:00", customer: "Sam Nakamura", pc: "PC-12", duration: "2h", status: "confirmed" },
  { id: 5, date: "2025-02-12", time: "12:00", customer: "Taylor Brooks", pc: "PC-05", duration: "1h", status: "cancelled" },
]

const PC_OPTIONS = ["PC-01", "PC-02", "PC-03", "PC-04", "PC-05", "PC-06", "PC-07", "PC-08", "PC-09", "PC-10", "PC-11", "PC-12"]
const DURATION_OPTIONS = ["1h", "2h", "3h", "4h", "5h"]

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  confirmed: {
    label: "Confirmed",
    className: "border-neon-green/40 bg-neon-green/10 text-neon-green",
  },
  pending: {
    label: "Pending",
    className: "border-neon-amber/40 bg-neon-amber/10 text-neon-amber",
  },
  cancelled: {
    label: "Cancelled",
    className: "border-muted-foreground/40 bg-muted/50 text-muted-foreground",
  },
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("12:00")
  const [newCustomer, setNewCustomer] = useState("")
  const [newPc, setNewPc] = useState("")
  const [newDuration, setNewDuration] = useState("2h")

  function openDialog() {
    const today = new Date().toISOString().slice(0, 10)
    setNewDate(today)
    setNewTime("12:00")
    setNewCustomer("")
    setNewPc("PC-01")
    setNewDuration("2h")
    setDialogOpen(true)
  }

  function handleCreateBooking(e: React.FormEvent) {
    e.preventDefault()
    if (!newDate || !newTime || !newCustomer.trim() || !newPc || !newDuration) return
    const nextId = Math.max(...bookings.map((b) => b.id), 0) + 1
    setBookings((prev) => [
      {
        id: nextId,
        date: newDate,
        time: newTime,
        customer: newCustomer.trim(),
        pc: newPc,
        duration: newDuration,
        status: "pending",
      },
      ...prev,
    ])
    setDialogOpen(false)
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Bookings
          </h2>
          <p className="text-sm text-muted-foreground">
            View and manage PC reservations and scheduled sessions.
          </p>
        </div>

        {/* Bookings table */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                  <CalendarDays className="h-4 w-4 text-neon" />
                </div>
                <div>
                  <CardTitle className="text-base">Reservations</CardTitle>
                  <CardDescription className="text-xs">
                    Upcoming and recent bookings
                  </CardDescription>
                </div>
              </div>
              <Button
                type="button"
                onClick={openDialog}
                className="w-fit gap-2 bg-neon text-primary-foreground hover:bg-neon/90"
              >
                <Plus className="h-4 w-4" />
                New booking
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Date
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Time
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Customer
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    PC
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Duration
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => {
                  const config = statusConfig[b.status]
                  return (
                    <TableRow
                      key={b.id}
                      className="border-border/30 transition-colors hover:bg-secondary/30"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm text-foreground">{formatDate(b.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-neon" />
                          <span className="font-mono text-sm text-foreground">{b.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm text-foreground">{b.customer}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-mono text-sm text-foreground">{b.pc}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm text-foreground">{b.duration}</span>
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
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* New booking dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-border bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">New booking</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Create a new PC reservation. The booking will appear as Pending until confirmed.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateBooking} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-date" className="text-foreground">Date</Label>
                <Input
                  id="new-date"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-time" className="text-foreground">Time</Label>
                <Input
                  id="new-time"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="bg-background"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-customer" className="text-foreground">Customer name</Label>
              <Input
                id="new-customer"
                placeholder="Enter customer name"
                value={newCustomer}
                onChange={(e) => setNewCustomer(e.target.value)}
                className="bg-background"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-pc" className="text-foreground">PC</Label>
                <Select value={newPc} onValueChange={setNewPc}>
                  <SelectTrigger id="new-pc" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PC_OPTIONS.map((pc) => (
                      <SelectItem key={pc} value={pc}>
                        {pc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-duration" className="text-foreground">Duration</Label>
                <Select value={newDuration} onValueChange={setNewDuration}>
                  <SelectTrigger id="new-duration" className="bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="border-border text-foreground hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="gap-2 bg-neon text-primary-foreground hover:bg-neon/90"
              >
                <Plus className="h-4 w-4" />
                Create booking
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
