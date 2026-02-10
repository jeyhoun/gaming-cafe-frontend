"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Monitor } from "lucide-react"

interface Session {
  id: number
  user: string
  initials: string
  station: string
  game: string
  duration: string
  amount: string
  status: "active" | "ended"
}

const sessions: Session[] = [
  { id: 1, user: "Marcus Chen", initials: "MC", station: "PC-04", game: "Valorant", duration: "3h 24m", amount: "$15.20", status: "active" },
  { id: 2, user: "Sarah Lee", initials: "SL", station: "PC-12", game: "League of Legends", duration: "2h 10m", amount: "$9.80", status: "active" },
  { id: 3, user: "Jake Rivera", initials: "JR", station: "PC-07", game: "Counter-Strike 2", duration: "1h 45m", amount: "$7.50", status: "active" },
  { id: 4, user: "Emma Wilson", initials: "EW", station: "PC-19", game: "Fortnite", duration: "4h 02m", amount: "$18.00", status: "ended" },
  { id: 5, user: "David Park", initials: "DP", station: "PC-22", game: "Apex Legends", duration: "2h 38m", amount: "$11.40", status: "active" },
  { id: 6, user: "Lily Zhang", initials: "LZ", station: "PC-15", game: "Dota 2", duration: "1h 15m", amount: "$5.60", status: "ended" },
]

export function RecentSessions() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">Recent Sessions</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Latest gaming sessions across all stations
            </CardDescription>
          </div>
          <button
            type="button"
            className="text-xs font-medium text-neon transition-colors hover:text-neon/80"
          >
            View all
          </button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-4 rounded-lg border border-border/50 bg-secondary/20 p-3 transition-colors hover:bg-secondary/40"
            >
              <Avatar className="h-9 w-9 border border-border">
                <AvatarFallback className="bg-secondary text-xs font-semibold text-foreground">
                  {session.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{session.user}</span>
                  <Badge
                    variant={session.status === "active" ? "default" : "secondary"}
                    className={
                      session.status === "active"
                        ? "h-4 bg-neon/10 px-1.5 text-[9px] text-neon border border-neon/20"
                        : "h-4 px-1.5 text-[9px]"
                    }
                  >
                    {session.status === "active" ? "Live" : "Ended"}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Monitor className="h-3 w-3" />
                    {session.station}
                  </span>
                  <span>{session.game}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-sm font-semibold text-foreground font-mono">{session.amount}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {session.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
