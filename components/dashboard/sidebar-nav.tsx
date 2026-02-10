"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Monitor,
  Users,
  CreditCard,
  Settings,
  Gamepad2,
  CalendarDays,
  BarChart3,
  Headphones,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navGroups = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" },
      { icon: BarChart3, label: "Analytics", href: "/analytics" },
    ],
  },
  {
    label: "Management",
    items: [
      { icon: Monitor, label: "Computers", href: "/computers" },
      { icon: Gamepad2, label: "Sessions", href: "/sessions" },
      { icon: Users, label: "Members", href: "/members" },
      { icon: CalendarDays, label: "Bookings", href: "/bookings" },
    ],
  },
  {
    label: "Finance",
    items: [
      { icon: CreditCard, label: "Billing", href: "/billing" },
    ],
  },
  {
    label: "System",
    items: [
      { icon: User, label: "Profile", href: "/profile" },
      { icon: Headphones, label: "Support", href: "/support" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ],
  },
]

export function SidebarNav() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon/10">
          <Gamepad2 className="h-5 w-5 text-neon" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground">
              NexusPlay
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-neon">
              Admin
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
            )}
            <ul className="flex flex-col gap-1" role="list">
              {group.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-neon/10 text-neon"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive
                            ? "text-neon"
                            : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                        )}
                      />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      {/* Bottom status */}
      {!collapsed && (
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-2 rounded-lg bg-neon/5 px-3 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
            <span className="text-xs font-medium text-muted-foreground">
              System Online
            </span>
          </div>
        </div>
      )}
    </aside>
  )
}
