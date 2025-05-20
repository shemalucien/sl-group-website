import { db } from "@/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { formatPrice, formatDate } from "@/lib/utils"

export default async function OrdersPage() {
  const allOrders = await db.query.orders.findMany({
    orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    with: {
      user: true,
    },
  })

  const columns = [
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "user.email",
      header: "Customer",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => formatPrice(row.original.total),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "delivered"
              ? "bg-green-100 text-green-800"
              : row.original.status === "shipped"
                ? "bg-blue-100 text-blue-800"
                : row.original.status === "processing"
                  ? "bg-yellow-100 text-yellow-800"
                  : row.original.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </span>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.paymentStatus === "completed"
              ? "bg-green-100 text-green-800"
              : row.original.paymentStatus === "refunded"
                ? "bg-purple-100 text-purple-800"
                : row.original.paymentStatus === "failed"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.paymentStatus.charAt(0).toUpperCase() + row.original.paymentStatus.slice(1)}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/orders/${row.original.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Orders</p>
          </div>
          <div className="text-2xl font-bold">{allOrders.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Pending</p>
          </div>
          <div className="text-2xl font-bold text-gray-600">
            {allOrders.filter((order) => order.status === "pending").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Processing</p>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {allOrders.filter((order) => order.status === "processing").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Shipped</p>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {allOrders.filter((order) => order.status === "shipped").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Delivered</p>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {allOrders.filter((order) => order.status === "delivered").length}
          </div>
        </div>
      </div>

      {/* <DataTable columns={columns} data={allOrders} /> */}
    </div>
  )
}