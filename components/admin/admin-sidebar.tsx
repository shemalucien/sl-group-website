"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, ShoppingBag, FileText, Briefcase, Calendar, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Blog Posts",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Job Listings",
    href: "/admin/jobs",
    icon: Briefcase,
  },
  {
    title: "Appointments",
    href: "/admin/appointments",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="flex items-center justify-center mb-8 pt-4">
        <h1 className="text-xl font-bold">SL Group Admin</h1>
      </div>

      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
              pathname === item.href ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

