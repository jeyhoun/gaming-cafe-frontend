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
import { Users, Search, Mail, Phone, Calendar, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

type MemberStatus = "active" | "inactive" | "suspended"

interface Member {
  id: number
  name: string
  email: string
  phone: string
  joined: string
  balance: string
  status: MemberStatus
}

const initialMembers: Member[] = [
  { id: 1, name: "Alex Rivera", email: "alex.r@email.com", phone: "+994 50 123 45 67", joined: "2024-08-15", balance: "12.50", status: "active" },
  { id: 2, name: "Maya Chen", email: "maya.chen@email.com", phone: "+994 51 234 56 78", joined: "2024-09-02", balance: "0.00", status: "active" },
  { id: 3, name: "Jordan Lee", email: "jordan.lee@email.com", phone: "+994 55 345 67 89", joined: "2024-07-20", balance: "25.00", status: "active" },
  { id: 4, name: "Sam Nakamura", email: "sam.n@email.com", phone: "+994 70 456 78 90", joined: "2024-10-01", balance: "5.25", status: "inactive" },
  { id: 5, name: "Taylor Brooks", email: "taylor.b@email.com", phone: "+994 99 567 89 01", joined: "2024-06-12", balance: "0.00", status: "suspended" },
  { id: 6, name: "Quinn Davis", email: "quinn.d@email.com", phone: "+994 50 678 90 12", joined: "2024-11-05", balance: "18.75", status: "active" },
]

const statusConfig: Record<MemberStatus, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "border-neon-green/40 bg-neon-green/10 text-neon-green",
  },
  inactive: {
    label: "Inactive",
    className: "border-muted-foreground/40 bg-muted/50 text-muted-foreground",
  },
  suspended: {
    label: "Suspended",
    className: "border-neon-amber/40 bg-neon-amber/10 text-neon-amber",
  },
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

export default function MembersPage() {
  const [search, setSearch] = useState("")

  const filteredMembers = initialMembers.filter(
    (m) =>
      search === "" ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search)
  )

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Members
          </h2>
          <p className="text-sm text-muted-foreground">
            Club member list, balances, and status.
          </p>
        </div>

        {/* Members table */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                  <Users className="h-4 w-4 text-neon" />
                </div>
                <div>
                  <CardTitle className="text-base">Club members</CardTitle>
                  <CardDescription className="text-xs">
                    {initialMembers.length} members registered
                  </CardDescription>
                </div>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-9 bg-background pl-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Member
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Email
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Phone
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Joined
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Balance
                  </TableHead>
                  <TableHead className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((m) => {
                  const config = statusConfig[m.status]
                  return (
                    <TableRow
                      key={m.id}
                      className="border-border/30 transition-colors hover:bg-secondary/30"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-border">
                            <AvatarFallback className="bg-secondary text-xs font-semibold text-foreground">
                              {m.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">
                            {m.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm text-foreground">{m.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="font-mono text-sm text-foreground">{m.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-neon" />
                          <span className="text-sm text-foreground">
                            {formatDate(m.joined)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Wallet className="h-3.5 w-3.5 text-neon-green" />
                          <span
                            className={cn(
                              "font-mono text-sm font-medium",
                              parseFloat(m.balance) > 0
                                ? "text-neon-green"
                                : "text-muted-foreground"
                            )}
                          >
                            {m.balance} AZN
                          </span>
                        </div>
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
    </DashboardShell>
  )
}
