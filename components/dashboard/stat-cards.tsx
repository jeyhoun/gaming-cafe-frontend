"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Gamepad2, DollarSign, Users, TrendingUp, TrendingDown } from "lucide-react"
import type { ReactNode } from "react"

interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: ReactNode
  trend: {
    value: string
    positive: boolean
  }
  accentColor: string
  iconBg: string
}

function StatCard({ title, value, subtitle, icon, trend, accentColor, iconBg }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden border-border/50 bg-card">
      <div className={`absolute inset-x-0 top-0 h-px ${accentColor}`} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </span>
            <span className="text-3xl font-bold tracking-tight text-foreground font-mono">
              {value}
            </span>
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5">
          {trend.positive ? (
            <TrendingUp className="h-3.5 w-3.5 text-neon-green" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-destructive" />
          )}
          <span
            className={`text-xs font-semibold ${
              trend.positive ? "text-neon-green" : "text-destructive"
            }`}
          >
            {trend.value}
          </span>
          <span className="text-xs text-muted-foreground">vs last week</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatCards() {
  const stats: StatCardProps[] = [
    {
      title: "Active PCs",
      value: "42",
      subtitle: "of 60 total stations",
      icon: <Monitor className="h-5 w-5 text-neon" />,
      trend: { value: "+12%", positive: true },
      accentColor: "bg-neon",
      iconBg: "bg-neon/10",
    },
    {
      title: "Busy Sessions",
      value: "38",
      subtitle: "avg 2.4h per session",
      icon: <Gamepad2 className="h-5 w-5 text-neon-green" />,
      trend: { value: "+8%", positive: true },
      accentColor: "bg-neon-green",
      iconBg: "bg-neon-green/10",
    },
    {
      title: "Daily Revenue",
      value: "$2,847",
      subtitle: "across all services",
      icon: <DollarSign className="h-5 w-5 text-neon-amber" />,
      trend: { value: "+23%", positive: true },
      accentColor: "bg-neon-amber",
      iconBg: "bg-neon-amber/10",
    },
    {
      title: "Online Users",
      value: "156",
      subtitle: "24 new today",
      icon: <Users className="h-5 w-5 text-chart-4" />,
      trend: { value: "-3%", positive: false },
      accentColor: "bg-chart-4",
      iconBg: "bg-chart-4/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
