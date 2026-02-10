"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { time: "6AM", sessions: 8, revenue: 120 },
  { time: "8AM", sessions: 15, revenue: 280 },
  { time: "10AM", sessions: 28, revenue: 520 },
  { time: "12PM", sessions: 42, revenue: 890 },
  { time: "2PM", sessions: 48, revenue: 1100 },
  { time: "4PM", sessions: 52, revenue: 1450 },
  { time: "6PM", sessions: 58, revenue: 1820 },
  { time: "8PM", sessions: 55, revenue: 2200 },
  { time: "10PM", sessions: 45, revenue: 2580 },
  { time: "12AM", sessions: 30, revenue: 2847 },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs font-medium text-foreground">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-xs text-muted-foreground">
            {entry.dataKey === "sessions" ? "Sessions" : "Revenue"}:{" "}
            <span className="font-semibold text-neon">
              {entry.dataKey === "revenue" ? `$${entry.value}` : entry.value}
            </span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function SessionChart() {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-foreground">Session Activity</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Today&apos;s session and revenue trend
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-neon" />
              <span className="text-xs text-muted-foreground">Sessions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-neon/40" />
              <span className="text-xs text-muted-foreground">Revenue</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(174, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174, 100%, 50%)" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(174, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 16%)" />
              <XAxis
                dataKey="time"
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
                axisLine={{ stroke: "hsl(220, 14%, 16%)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="sessions"
                stroke="hsl(174, 100%, 50%)"
                strokeWidth={2}
                fill="url(#sessionGradient)"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(174, 100%, 50%)"
                strokeWidth={1}
                strokeOpacity={0.4}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
