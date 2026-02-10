"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Power, AlertTriangle, Receipt } from "lucide-react"

const actions = [
  {
    icon: UserPlus,
    label: "New Member",
    desc: "Register a new club member",
    color: "text-neon",
    bg: "bg-neon/10 hover:bg-neon/20",
  },
  {
    icon: Power,
    label: "Start Session",
    desc: "Assign a PC to a user",
    color: "text-neon-green",
    bg: "bg-neon-green/10 hover:bg-neon-green/20",
  },
  {
    icon: AlertTriangle,
    label: "Report Issue",
    desc: "Log a station problem",
    color: "text-neon-amber",
    bg: "bg-neon-amber/10 hover:bg-neon-amber/20",
  },
  {
    icon: Receipt,
    label: "Generate Report",
    desc: "Export today's summary",
    color: "text-chart-4",
    bg: "bg-chart-4/10 hover:bg-chart-4/20",
  },
]

export function QuickActions() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              className={`flex flex-col items-center gap-2 rounded-xl border border-border/50 p-4 transition-all ${action.bg}`}
            >
              <action.icon className={`h-5 w-5 ${action.color}`} />
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xs font-semibold text-foreground">{action.label}</span>
                <span className="text-[10px] text-muted-foreground text-center">{action.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
