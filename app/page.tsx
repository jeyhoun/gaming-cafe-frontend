import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { StatCards } from "@/components/dashboard/stat-cards"
import { SessionChart } from "@/components/dashboard/session-chart"
import { RevenueBreakdown } from "@/components/dashboard/revenue-breakdown"
import { PCStatusGrid } from "@/components/dashboard/pc-status-grid"
import { RecentSessions } from "@/components/dashboard/recent-sessions"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <StatCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SessionChart />
        <RevenueBreakdown />
      </div>
      <PCStatusGrid />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentSessions />
        </div>
        <QuickActions />
      </div>
    </DashboardShell>
  )
}
