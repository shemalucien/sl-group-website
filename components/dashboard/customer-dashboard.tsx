import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/db"
import { orders, appointments, notifications } from "@/db/schema"
import { eq } from "drizzle-orm"
import { ShoppingBag, Calendar, Bell } from "lucide-react"
import { formatPrice, formatDate } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CustomerDashboardProps {
  user: {
    id: number
    email: string
    firstName: string | null
    lastName: string | null
    role: string
  }
}

export async function CustomerDashboard({ user }: CustomerDashboardProps) {
  // Fetch user's orders
  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, user.id),
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    limit: 5,
  })

  // Fetch user's appointments
  const userAppointments = await db.query.appointments.findMany({
    where: eq(appointments.userId, user.id),
    orderBy: (appointments, { asc }) => [asc(appointments.date)],
    limit: 5,
  })

  // Fetch user's notifications
  const userNotifications = await db.query.notifications.findMany({
    where: eq(notifications.userId, user.id),
    orderBy: (notifications, { desc }) => [desc(notifications.createdAt)],
    limit: 10,
  })

  // Count unread notifications
  const unreadCount = userNotifications.filter((notification) => !notification.read).length

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName || user.email}</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userOrders.length}</div>
            <p className="text-xs text-muted-foreground">
              {userOrders.length === 0 || !userOrders[0].createdAt ? "No orders yet" : `Last order on ${formatDate(userOrders[0].createdAt)}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {userAppointments.length === 0
                ? "No appointments scheduled"
                : `Next appointment on ${formatDate(userAppointments[0].date)}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">
              {unreadCount === 0 ? "No new notifications" : `${unreadCount} unread notifications`}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          {userOrders.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No orders yet</h3>
              <p className="text-muted-foreground mt-2">You haven't placed any orders yet.</p>
              <Link href="/portfolio/liquor/shop">
                <Button className="mt-4">Shop Now</Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-5 p-4 font-medium">
                <div>Order ID</div>
                <div>Date</div>
                <div>Status</div>
                <div>Total</div>
                <div></div>
              </div>
              {userOrders.map((order) => (
                <div key={order.id} className="grid grid-cols-5 p-4 border-t items-center">
                  <div>#{order.id}</div>
                  <div>{order.createdAt ? formatDate(order.createdAt) : "N/A"}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "processing"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Unknown"}
                    </span>
                  </div>
                  <div>{formatPrice(order.total)}</div>
                  <div>
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          {userAppointments.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No appointments scheduled</h3>
              <p className="text-muted-foreground mt-2">You don't have any appointments scheduled.</p>
              <Link href="/portfolio/liquor/appointments">
                <Button className="mt-4">Book an Appointment</Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="grid grid-cols-4 p-4 font-medium">
                <div>Date</div>
                <div>Purpose</div>
                <div>Status</div>
                <div></div>
              </div>
              {userAppointments.map((appointment) => (
                <div key={appointment.id} className="grid grid-cols-4 p-4 border-t items-center">
                  <div>{formatDate(appointment.date)}</div>
                  <div>{appointment.purpose}</div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1) : "Unknown"}
                    </span>
                  </div>
                  <div>
                    <Link href={`/dashboard/appointments/${appointment.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          {userNotifications.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground mt-2">You don't have any notifications yet.</p>
            </div>
          ) : (
            <div className="rounded-md border">
              {userNotifications.map((notification) => (
                <div key={notification.id} className={`p-4 border-t ${!notification.read ? "bg-muted/50" : ""}`}>
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground">{notification.createdAt ? formatDate(notification.createdAt) : "N/A"}</span>
                  </div>
                  <p className="text-sm mt-1">{notification.message}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

