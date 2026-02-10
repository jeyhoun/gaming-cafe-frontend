"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type PCStatus = "active" | "idle" | "maintenance"

interface PC {
  id: number
  label: string
  status: PCStatus
  user?: string
  game?: string
}

// Deterministic data so server and client render the same (avoids hydration mismatch)
const games = ["Valorant", "CS2", "Fortnite", "Apex", "LoL", "Dota 2", "PUBG", "Overwatch"]
const users = ["Player_1", "xKiller", "ProGamer", "NoScope", "Ace", "Shadow", "Blitz", "Volt"]

function getPCStatus(index: number): PCStatus {
  const x = (index * 7 + 3) % 20
  if (x < 12) return "active"
  if (x < 17) return "idle"
  return "maintenance"
}

const pcs: PC[] = Array.from({ length: 24 }, (_, i) => {
  const status = getPCStatus(i)
  return {
    id: i + 1,
    label: `PC-${String(i + 1).padStart(2, "0")}`,
    status,
    ...(status === "active"
      ? {
          user: users[i % users.length],
          game: games[i % games.length],
        }
      : {}),
  }
})

const statusConfig: Record<PCStatus, { bg: string; dot: string; label: string }> = {
  active: {
    bg: "border-neon/30 bg-neon/5",
    dot: "bg-neon",
    label: "Active",
  },
  idle: {
    bg: "border-border bg-secondary/30",
    dot: "bg-muted-foreground",
    label: "Idle",
  },
  maintenance: {
    bg: "border-neon-amber/30 bg-neon-amber/5",
    dot: "bg-neon-amber",
    label: "Maintenance",
  },
}

export function PCStatusGrid() {
  const activePCs = pcs.filter((pc) => pc.status === "active").length
  const idlePCs = pcs.filter((pc) => pc.status === "idle").length
  const maintenancePCs = pcs.filter((pc) => pc.status === "maintenance").length

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">Station Overview</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Live status of all PC stations
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            {(["active", "idle", "maintenance"] as const).map((status) => (
              <div key={status} className="flex items-center gap-1.5">
                <div className={cn("h-2 w-2 rounded-full", statusConfig[status].dot)} />
                <span className="text-xs text-muted-foreground">
                  {statusConfig[status].label} ({status === "active" ? activePCs : status === "idle" ? idlePCs : maintenancePCs})
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-6 gap-2 md:grid-cols-8 lg:grid-cols-12">
          {pcs.map((pc) => {
            const config = statusConfig[pc.status]
            return (
              <div
                key={pc.id}
                className={cn(
                  "group relative flex flex-col items-center justify-center rounded-lg border p-2 transition-all hover:scale-105",
                  config.bg
                )}
                title={
                  pc.status === "active"
                    ? `${pc.label} - ${pc.user} playing ${pc.game}`
                    : `${pc.label} - ${config.label}`
                }
              >
                <div className={cn("mb-1 h-1.5 w-1.5 rounded-full", config.dot, pc.status === "active" && "animate-pulse")} />
                <span className="text-[10px] font-mono font-medium text-muted-foreground">
                  {pc.label.replace("PC-", "")}
                </span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
