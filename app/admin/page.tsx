// import { db } from "@/db"
// import { users, products, orders, blogPosts, jobListings, appointments } from "@/db/schema"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ew } from "@/components/admin/overview"
// import { RecentOrders } from "@/components/admin/recent-orders"
// import { RecentUsers } from "@/components/admin/recent-users"
// import { count } from "drizzle-orm"
// import { Users, ShoppingBag, ShoppingCart, FileText, Briefcase, Calendar } from "lucide-react"

// export default async function AdminDashboard() {
//   // Get counts
//   const [userCount, productCount, orderCount, blogPostCount, jobListingCount, appointmentCount] = await Promise.all([
//     db
//       .select({ count: count() })
//       .from(users)
//       .then((res) => res[0].count),
//     db
//       .select({ count: count() })
//       .from(products)
//       .then((res) => res[0].count),
//     db
//       .select({ count: count() })
//       .from(orders)
//       .then((res) => res[0].count),
//     db
//       .select({ count: count() })
//       .from(blogPosts)
//       .then((res) => res[0].count),
//     db
//       .select({ count: count() })
//       .from(jobListings)
//       .then((res) => res[0].count),
//     db
//       .select({ count: count() })
//       .from(appointments)
//       .then((res) => res[0].count),
//   ])

//   // Get recent orders
//   const recentOrders = await db.query.orders.findMany({
//     orderBy: (orders, { desc }) => [desc(orders.createdAt)],
//     limit: 5,
//     with: {
//       user: true,
//     },
//   })

//   // Get recent users
//   const recentUsers = await db.query.users.findMany({
//     orderBy: (users, { desc }) => [desc(users.createdAt)],
//     limit: 5,
//   })

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Dashboard</h1>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{userCount}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Products</CardTitle>
//             <ShoppingBag className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{productCount}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Orders</CardTitle>
//             <ShoppingCart className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{orderCount}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{blogPostCount}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Job Listings</CardTitle>
//             <Briefcase className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{jobListingCount}</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Appointments</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{appointmentCount}</div>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="overview" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="orders">Recent Orders</TabsTrigger>
//           <TabsTrigger value="users">Recent Users</TabsTrigger>
//         </TabsList>
//         <TabsContent value="overview" className="space-y-4">
//           <Overview />
//         </TabsContent>
//         <TabsContent value="orders" className="space-y-4">
//           <RecentOrders orders={recentOrders} />
//         </TabsContent>
//         <TabsContent value="users" className="space-y-4">
//           <RecentUsers users={recentUsers} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }


import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { StaffDashboard } from "@/components/dashboard/staff-dashboard"
import { SubsidiaryAdminDashboard } from "@/components/dashboard/subsidiary-admin-dashboard"
import AdminDashboard from "./dashboard/page"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/admin/dashboard")
  }

  return (
    <main className="flex-1">
      <div className="container px-4 md:px-6 py-8">
        {/* <h1 className="text-3xl font-bold mb-8">Dashboard</h1> */}

        {/* Show different dashboard based on user role */}
        {user.role === "customer" && <UserDashboard user={user} />}
        {user.role === "staff" && <StaffDashboard user={user} />}
        {user.role === "subsidiary_admin" && <SubsidiaryAdminDashboard user={user} />}
        {user.role === "admin" && (
          // <div className="space-y-4">
          //   <p className="text-muted-foreground">
          //     You are logged in as an administrator. Please use the admin dashboard for full access to all features.
          //   </p>
          //   <a href="/admin/dashboard" className="text-primary hover:underline">
          //     Go to Admin Dashboard
          //   </a>
          // </div>
          // Redirect to the dashboard page
          <AdminDashboard />
        )}
      </div>
    </main>
  )
}

