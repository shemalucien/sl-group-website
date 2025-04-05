import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Calendar, User } from "lucide-react"
import Link from "next/link"

interface UserDashboardProps {
  user: {
    id: number
    email: string
    firstName: string | null
    lastName: string | null
  }
}

export function UserDashboard({ user }: UserDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">No orders yet</p>
            <Button asChild className="w-full mt-4" size="sm">
              <Link href="/portfolio/liquor/shop">Shop Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">No upcoming appointments</p>
            <Button asChild className="w-full mt-4" size="sm">
              <Link href="/portfolio/liquor/appointments">Book Appointment</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-md font-medium">
              {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Customer Account</p>
            <Button asChild className="w-full mt-4" size="sm" variant="outline">
              <Link href="/dashboard/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your recent orders and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">You haven't placed any orders yet.</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Schedule</CardTitle>
              <CardDescription>View your upcoming and past appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">You don't have any appointments scheduled.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

