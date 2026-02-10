import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { ComputersTable } from "@/components/dashboard/computers-table"

export default function ComputersPage() {
  return (
    <DashboardShell>
      <ComputersTable />
    </DashboardShell>
  )
}
