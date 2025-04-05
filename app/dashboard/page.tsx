import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { StaffDashboard } from "@/components/dashboard/staff-dashboard"
import { SubsidiaryAdminDashboard } from "@/components/dashboard/subsidiary-admin-dashboard"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/dashboard")
  }

  return (
    <main className="flex-1">
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Show different dashboard based on user role */}
        {user.role === "customer" && <UserDashboard user={user} />}
        {user.role === "staff" && <StaffDashboard user={user} />}
        {user.role === "subsidiary_admin" && <SubsidiaryAdminDashboard user={user} />}
        {user.role === "admin" && (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You are logged in as an administrator. Please use the admin dashboard for full access to all features.
            </p>
            <a href="/admin" className="text-primary hover:underline">
              Go to Admin Dashboard
            </a>
          </div>
        )}
      </div>
    </main>
  )
}

