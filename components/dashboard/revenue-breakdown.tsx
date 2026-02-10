"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { day: "Mon", gaming: 1800, food: 420, merch: 180 },
  { day: "Tue", gaming: 2100, food: 380, merch: 120 },
  { day: "Wed", gaming: 1950, food: 510, merch: 210 },
  { day: "Thu", gaming: 2400, food: 450, merch: 160 },
  { day: "Fri", gaming: 3200, food: 680, merch: 340 },
  { day: "Sat", gaming: 3800, food: 820, merch: 420 },
  { day: "Sun", gaming: 3100, food: 720, merch: 280 },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; fill: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="mb-1 text-xs font-medium text-foreground">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full mr-1.5" style={{ backgroundColor: entry.fill }} />
            {entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}:{" "}
            <span className="font-semibold text-foreground">${entry.value}</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function RevenueBreakdown() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">Weekly Revenue</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Breakdown by category this week
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-neon" />
              <span className="text-xs text-muted-foreground">Gaming</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-neon-green" />
              <span className="text-xs text-muted-foreground">Food</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-neon-amber" />
              <span className="text-xs text-muted-foreground">Merch</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 16%)" />
              <XAxis
                dataKey="day"
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
                axisLine={{ stroke: "hsl(220, 14%, 16%)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="gaming" fill="hsl(174, 100%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="food" fill="hsl(142, 70%, 45%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="merch" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
