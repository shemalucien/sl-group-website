import type React from "react"
import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    // Check if user is admin
    await requireAdmin()

    return (
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 p-8">{children}</div>
      </div>
    )
  } catch (error) {
    redirect("/auth/login?callbackUrl=/admin")
  }
}

