import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Users, Package } from "lucide-react"
import Link from "next/link"

interface SubsidiaryAdminDashboardProps {
  user: {
    id: number
    email: string
    firstName: string | null
    lastName: string | null
    subsidiaryId: number | null
  }
}

export function SubsidiaryAdminDashboard({ user }: SubsidiaryAdminDashboardProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Total orders</p>
            <Button asChild className="w-full mt-4" size="sm">
              <Link href="/dashboard/orders">View All</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Total products</p>
            <Button asChild className="w-full mt-4" size="sm">
              <Link href="/dashboard/products">Manage Products</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground mt-1">Total staff members</p>
            <Button asChild className="w-full mt-4" size="sm">
              <Link href="/dashboard/staff">Manage Staff</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subsidiary Performance</CardTitle>
              <CardDescription>View key metrics for your subsidiary.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Revenue</div>
                  <div className="text-2xl font-bold">$0.00</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Customers</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Appointments</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground mb-1">Low Stock Items</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage and process customer orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">No recent orders to display.</div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Monitor and update your inventory.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>You can manage your inventory here.</p>
                <Button asChild className="mt-4">
                  <Link href="/dashboard/inventory">View Full Inventory</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Schedule</CardTitle>
              <CardDescription>View and manage upcoming appointments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">No upcoming appointments.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

