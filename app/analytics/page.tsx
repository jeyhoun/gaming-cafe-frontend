"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Calendar } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const weeklySessionsData = [
  { day: "Mon", sessions: 312, revenue: 1240 },
  { day: "Tue", sessions: 285, revenue: 1180 },
  { day: "Wed", sessions: 298, revenue: 1210 },
  { day: "Thu", sessions: 340, revenue: 1350 },
  { day: "Fri", sessions: 420, revenue: 1680 },
  { day: "Sat", sessions: 485, revenue: 1940 },
  { day: "Sun", sessions: 398, revenue: 1590 },
]

const topGamesData = [
  { name: "Valorant", hours: 1240 },
  { name: "CS2", hours: 980 },
  { name: "League of Legends", hours: 890 },
  { name: "Fortnite", hours: 720 },
  { name: "Dota 2", hours: 650 },
  { name: "Apex Legends", hours: 480 },
]

function WeeklyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value: number; dataKey: string }>
  label?: string
}) {
  if (active && payload?.length && label) {
    const sessions = payload.find((p) => p.dataKey === "sessions")?.value
    const revenue = payload.find((p) => p.dataKey === "revenue")?.value
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">
          Sessions: <span className="font-semibold text-neon">{sessions}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Revenue: <span className="font-semibold text-neon">${revenue}</span>
        </p>
      </div>
    )
  }
  return null
}

function TopGamesTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ value: number; payload: { name: string } }>
}) {
  if (active && payload?.length) {
    const p = payload[0]
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs font-medium text-foreground">{p.payload.name}</p>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-neon">{p.value}h</span> play time
        </p>
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        {/* Page header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Trends, top games, and performance insights (no overlap with dashboard).
          </p>
        </div>

        {/* Weekly sessions & revenue */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                <Calendar className="h-4 w-4 text-neon" />
              </div>
              <div>
                <CardTitle className="text-base">Weekly sessions & revenue</CardTitle>
                <CardDescription className="text-xs">
                  Last 7 days — sessions and revenue per day
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklySessionsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="weeklyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(174, 100%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(174, 100%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  />
                  <Tooltip content={<WeeklyTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="sessions"
                    stroke="hsl(174, 100%, 50%)"
                    strokeWidth={2}
                    fill="url(#weeklyGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top games by play time */}
        <Card className="border-border/50 bg-card">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10">
                <BarChart3 className="h-4 w-4 text-neon" />
              </div>
              <div>
                <CardTitle className="text-base">Top games by play time</CardTitle>
                <CardDescription className="text-xs">
                  Last 30 days — total hours per game
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topGamesData}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(220, 14%, 16%)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
                    axisLine={{ stroke: "hsl(220, 14%, 16%)" }}
                    tickLine={false}
                    tickFormatter={(v: number) => `${v}h`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                  />
                  <Tooltip content={<TopGamesTooltip />} cursor={{ fill: "hsl(220, 16%, 14%)" }} />
                  <Bar
                    dataKey="hours"
                    fill="hsl(174, 100%, 50%)"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
