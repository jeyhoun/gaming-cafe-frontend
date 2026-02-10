"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Search, ChevronDown, Gamepad2, DollarSign, Monitor } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"

type NotificationType = "session" | "revenue" | "system"

interface NotificationItem {
  id: number
  type: NotificationType
  title: string
  message: string
  time: string
  unread: boolean
}

const notifications: NotificationItem[] = [
  { id: 1, type: "session", title: "Session ended", message: "PC-04 — Jordan Lee, 3h 45m", time: "2m ago", unread: true },
  { id: 2, type: "revenue", title: "Daily target reached", message: "Revenue today: $2,847", time: "15m ago", unread: true },
  { id: 3, type: "system", title: "PC-05 back online", message: "Station is available again", time: "1h ago", unread: true },
  { id: 4, type: "session", title: "Session started", message: "PC-07 — Sam Nakamura, Fortnite", time: "2h ago", unread: false },
  { id: 5, type: "revenue", title: "Weekly summary", message: "Revenue +23% vs last week", time: "Yesterday", unread: false },
]

const unreadCount = notifications.filter((n) => n.unread).length

function NotificationIcon({ type }: { type: NotificationType }) {
  switch (type) {
    case "session":
      return <Gamepad2 className="h-4 w-4 text-neon" />
    case "revenue":
      return <DollarSign className="h-4 w-4 text-neon-amber" />
    case "system":
      return <Monitor className="h-4 w-4 text-neon-green" />
    default:
      return <Bell className="h-4 w-4 text-muted-foreground" />
  }
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Overview of your gaming club" },
  "/computers": { title: "Computer Management", subtitle: "Manage all PC stations" },
  "/analytics": { title: "Analytics", subtitle: "Performance metrics and insights" },
  "/sessions": { title: "Sessions", subtitle: "Active and past gaming sessions" },
  "/members": { title: "Members", subtitle: "Club member management" },
  "/bookings": { title: "Bookings", subtitle: "Reservation scheduling" },
  "/billing": { title: "Billing", subtitle: "Financial transactions" },
  "/support": { title: "Support", subtitle: "Help and support tickets" },
  "/settings": { title: "Settings", subtitle: "System configuration" },
  "/profile": { title: "Profile", subtitle: "Your account and profile information" },
}

export function TopBar() {
  const [searchFocused, setSearchFocused] = useState(false)
  const pathname = usePathname()
  const page = pageTitles[pathname] ?? { title: "Dashboard", subtitle: "" }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      {/* Left: Page title + breadcrumb */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold text-foreground">{page.title}</h1>
          <p className="text-xs text-muted-foreground">
            {page.subtitle}
          </p>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex items-center">
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 transition-all ${
            searchFocused
              ? "border-neon/50 bg-secondary"
              : "border-border bg-secondary/50"
          }`}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search stations, members..."
            className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search stations and members"
          />
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            <span className="text-xs">{'/'}</span>
          </kbd>
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-4">
        {/* Notification bell + panel */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-neon text-[10px] font-bold text-background">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={8}
            className="w-[360px] border-border bg-card p-0 text-card-foreground"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
              <button
                type="button"
                className="text-xs font-medium text-neon transition-colors hover:text-neon/80"
              >
                Mark all read
              </button>
            </div>
            <ScrollArea className="h-[320px]">
              <div className="flex flex-col">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "flex gap-3 border-b border-border px-4 py-3 transition-colors last:border-b-0 hover:bg-secondary/50",
                      n.unread && "bg-neon/5"
                    )}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <NotificationIcon type={n.type} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">{n.title}</p>
                        {n.unread && (
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{n.message}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t border-border px-4 py-2">
              <button
                type="button"
                className="w-full rounded-md py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                View all notifications
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Divider */}
        <div className="h-8 w-px bg-border" />

        {/* User profile → Profile page */}
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-lg px-2 py-1 transition-colors hover:bg-secondary"
          aria-label="Go to profile"
        >
          <Avatar className="h-8 w-8 border border-neon/30">
            <AvatarImage src="/placeholder-user.jpg" alt="Admin avatar" />
            <AvatarFallback className="bg-neon/10 text-xs font-semibold text-neon">
              AK
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:flex flex-col items-start">
            <span className="text-sm font-medium text-foreground">Jeyhun Mammadsaidov</span>
            <Badge variant="secondary" className="h-4 px-1.5 text-[9px] font-semibold text-neon border-neon/20 bg-neon/10">
              Owner
            </Badge>
          </div>
          <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-muted-foreground" />
        </Link>
      </div>
    </header>
  )
}
