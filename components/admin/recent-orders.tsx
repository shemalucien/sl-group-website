import { formatPrice, formatDateTime } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Order {
  id: number
  userId: number
  status: string
  total: number
  createdAt: Date
  user: {
    email: string
    firstName: string | null
    lastName: string | null
  }
}

interface RecentOrdersProps {
  orders: Order[]
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <Link href="/admin/orders">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    {order.user.firstName && order.user.lastName
                      ? `${order.user.firstName} ${order.user.lastName}`
                      : order.user.email}
                  </TableCell>
                  <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "processing"
                            ? "secondary"
                            : order.status === "cancelled"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

