import { db } from "@/db"
import { users, products, orders, blogPosts, jobListings, appointments, notifications, employees } from "@/db/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/admin/overview"
import { RecentOrders } from "@/components/admin/recent-orders"
import { RecentUsers } from "@/components/admin/recent-users"
import { NotificationsPanel } from "@/components/admin/notifications-panel"
import { count, eq } from "drizzle-orm"
import { Users, ShoppingBag, ShoppingCart, FileText, Briefcase, Calendar, Bell } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default async function AdminDashboard() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return null
  }

  // Get counts
  const [
    userCount,
    productCount,
    orderCount,
    blogPostCount,
    jobListingCount,
    appointmentCount,
    notificationCount,
    employeeCount,
  ] = await Promise.all([
    db
      .select({ count: count() })
      .from(users)
      .then((res) => res[0].count),
    db
      .select({ count: count() })
      .from(products)
      .then((res) => res[0].count),
    db
      .select({ count: count() })
      .from(orders)
      .then((res) => res[0].count),
    db
      .select({ count: count() })
      .from(blogPosts)
      .then((res) => res[0].count),
    db
      .select({ count: count() })
      .from(jobListings)
      .then((res) => res[0].count),
    db
      .select({ count: count() })
      .from(appointments)
      .then((res) => res[0].count),
    db
      .select({ count: count() })
      .from(notifications)
      .where(eq(notifications.read, false))
      .then((res) => res[0].count),
    db
      .select({ count: count() })
      .from(employees)
      .then((res) => res[0].count),
  ])

  // Get recent orders
  const recentOrders = (await db.query.orders.findMany({
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    limit: 5,
    with: {
      user: true,
    },
  })).map(order => ({
    ...order,
    status: order.status ?? "Unknown", // Ensure status is a non-null string
    createdAt: order.createdAt ?? new Date(), // Replace null with current date
  }))

  // Get recent users
  const recentUsers = (await db.query.users.findMany({
    orderBy: (users, { desc }) => [desc(users.createdAt)],
    limit: 5,
  })).map(user => ({
    ...user,
    role: user.role ?? "Unknown", // Ensure role is a non-null string
    isActive: user.isActive ?? false, // Replace null with false
    createdAt: user.createdAt ?? new Date(), // Replace null with current date
  }))

  // Get unread notifications
  const unreadNotifications = (await db.query.notifications.findMany({
    where: eq(notifications.read, false),
    orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
    limit: 10,
  }))
    .filter(notification => notification.createdAt !== null)
    .map(notification => ({
      ...notification,
      createdAt: notification.createdAt ?? new Date(), // Replace null with current date
      read: notification.read ?? false, // Replace null with false
    }))
    

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <NotificationsPanel notifications={unreadNotifications} count={notificationCount} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employeeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPostCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Listings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobListingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notificationCount}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="users">Recent Users</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <RecentOrders orders={recentOrders} />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <RecentUsers users={recentUsers} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

