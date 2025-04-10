import { db } from "@/db"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { formatPrice, formatDate } from "@/lib/utils"
import { Download } from 'lucide-react'

export default async function PaymentsPage() {
  const allPayments = await db.query.payments.findMany({
    orderBy: (payments, { desc }) => [desc(payments.createdAt)],
    // with: {
    // order: {
    //     with: {
    //       user: true,
    //     },
    //   },
    // },
  })

  const columns = [
    {
      accessorKey: "id",
      header: "Payment ID",
    },
    {
      accessorKey: "order.id",
      header: "Order ID",
    },
    {
      accessorKey: "order.user.email",
      header: "Customer",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => formatPrice(row.original.amount),
    },
    {
      accessorKey: "method",
      header: "Method",
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original.method.replace('_', ' ')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "completed"
              ? "bg-green-100 text-green-800"
              : row.original.status === "refunded"
                ? "bg-purple-100 text-purple-800"
                : row.original.status === "failed"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </span>
      ),
    },
    {
      accessorKey: "paymentDate",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.paymentDate),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            View
          </Button>
          {row.original.status === "completed" && (
            <Button variant="outline" size="sm">
              Refund
            </Button>
          )}
        </div>
      ),
    },
  ]

  // Calculate total revenue
  const totalRevenue = allPayments
    .filter(payment => payment.status === "completed")
    .reduce((sum, payment) => sum + Number(payment.amount), 0)

  // Calculate refunded amount
  const refundedAmount = allPayments
    .filter(payment => payment.status === "refunded")
    .reduce((sum, payment) => sum + Number(payment.amount), 0)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payments</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Revenue</p>
          </div>
          <div className="text-2xl font-bold text-green-600">{formatPrice(totalRevenue)}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Completed Payments</p>
          </div>
          <div className="text-2xl font-bold">
            {allPayments.filter((payment) => payment.status === "completed").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Pending Payments</p>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {allPayments.filter((payment) => payment.status === "pending").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Refunded Amount</p>
          </div>
          <div className="text-2xl font-bold text-purple-600">{formatPrice(refundedAmount)}</div>
        </div>
      </div>

      {/* <DataTable columns={columns} data={allPayments} /> */}
    </div>
  )
}