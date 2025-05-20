import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard"
import { StaffDashboard } from "@/components/dashboard/staff-dashboard"
import { SubsidiaryAdminDashboard } from "@/components/dashboard/subsidiary-admin-dashboard"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/dashboard")
  }

  // Render different dashboard based on user role
  switch (user.role) {
    case "admin":
      redirect("/admin")
    case "subsidiary_admin":
      return <SubsidiaryAdminDashboard user={user} />
    case "staff":
      return <StaffDashboard user={user} />
    case "customer":
    default:
      return <CustomerDashboard user={user} />
  }
}