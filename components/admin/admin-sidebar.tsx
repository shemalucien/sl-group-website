// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import {
//   LayoutDashboard,
//   Users,
//   ShoppingBag,
//   FileText,
//   Briefcase,
//   Calendar,
//   Settings,
//   LogOut,
//   DollarSign,
//   Bell,
//   BarChart,
//   Image,
//   Package,
// } from "lucide-react"
// import { signOut } from "@/lib/auth-client"

// const sidebarItems = [
//   { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
//   { title: "Users", href: "/admin/users", icon: Users },
//   { title: "Employees", href: "/admin/employees", icon: Users },
//   { title: "Products", href: "/admin/products", icon: ShoppingBag },
//   { title: "Inventory", href: "/admin/inventory", icon: Package },
//   { title: "Orders", href: "/admin/orders", icon: ShoppingBag },
//   { title: "Payments", href: "/admin/payments", icon: DollarSign },
//   { title: "Blog Posts", href: "/admin/blog", icon: FileText },
//   { title: "Job Listings", href: "/admin/jobs", icon: Briefcase },
//   { title: "Appointments", href: "/admin/appointments", icon: Calendar },
//   { title: "Rentals", href: "/admin/rentals", icon: Package },
//   { title: "Reports", href: "/admin/reports", icon: BarChart },
//   { title: "Media Library", href: "/admin/media", icon: Image },
//   { title: "Notifications", href: "/admin/notifications", icon: Bell },
//   { title: "Settings", href: "/admin/settings", icon: Settings },
// ]

// export function AdminSidebar() {
//   const pathname = usePathname()

//   const handleSignOut = async () => {
//     await signOut()
//   }

//   return (
//     <div className="w-full sm:w-64 bg-slate-900 text-white min-h-screen p-4 overflow-y-auto flex flex-col">
//       <div className="flex items-center justify-center mb-8 pt-4">
//         <h1 className="text-xl font-bold text-center">SL Group Admin</h1>
//       </div>

//       <nav className="space-y-1 flex-1">
//         {sidebarItems.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={cn(
//               "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
//               pathname === item.href
//                 ? "bg-slate-800 text-white"
//                 : "text-slate-300 hover:bg-slate-800 hover:text-white"
//             )}
//           >
//             <item.icon className="mr-3 h-5 w-5" />
//             {item.title}
//           </Link>
//         ))}
//       </nav>

//       <button
//         onClick={handleSignOut}
//         className="flex items-center w-full px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors"
//       >
//         <LogOut className="mr-3 h-5 w-5" />
//         Sign Out
//       </button>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  FileText,
  Briefcase,
  Calendar,
  Settings,
  LogOut,
  DollarSign,
  Bell,
  BarChart,
  Image,
  Package,
  Menu,
  X,
} from "lucide-react"
import { signOut } from "@/lib/auth-client"

const sidebarItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Employees", href: "/admin/employees", icon: Users },
  { title: "Products", href: "/admin/products", icon: ShoppingBag },
  { title: "Inventory", href: "/admin/inventory", icon: Package },
  { title: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { title: "Payments", href: "/admin/payments", icon: DollarSign },
  { title: "Blog Posts", href: "/admin/blog", icon: FileText },
  { title: "Job Listings", href: "/admin/jobs", icon: Briefcase },
  { title: "Appointments", href: "/admin/appointments", icon: Calendar },
  { title: "Rentals", href: "/admin/rentals", icon: Package },
  { title: "Reports", href: "/admin/reports", icon: BarChart },
  { title: "Media Library", href: "/admin/media", icon: Image },
  { title: "Notifications", href: "/admin/notifications", icon: Bell },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-white bg-slate-800 p-2 rounded-md">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "bg-slate-900 text-white p-4 min-h-screen flex flex-col transition-all duration-300 z-40",
          "fixed sm:relative top-0 left-0",
          isOpen ? "w-56 sm:w-64" : "w-0 sm:w-64",
          !isOpen && "sm:block overflow-hidden", // hide content when collapsed on mobile
        )}
      >
        <div className={cn("mb-8 pt-4 px-2", isOpen ? "block" : "hidden sm:block")}>
          <h1 className="text-xl font-bold text-center">SL Group Admin</h1>
        </div>

        <nav className="space-y-1 flex-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-3 text-sm rounded-md transition-colors",
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className={cn("ml-3", !isOpen && "hidden sm:inline")}>
                  {item.title}
                </span>
              </Link>
            )
          })}
        </nav>

        <button
          onClick={handleSignOut}
          className={cn(
            "flex items-center px-3 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors",
            !isOpen && "justify-center sm:justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          <span className={cn("ml-3", !isOpen && "hidden sm:inline")}>Sign Out</span>
        </button>
      </div>
    </>
  )
}
