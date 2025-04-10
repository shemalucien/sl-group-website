import { db } from "@/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from 'lucide-react'
import { formatPrice, formatDate } from "@/lib/utils"

export default async function RentalsPage() {
  const allRentals = await db.query.rentals.findMany({
    orderBy: (rentals, { desc }) => [desc(rentals.createdAt)],
    with: {
      user: true,
      // item: true,
    },
  })

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "user.email",
      header: "Customer",
      cell: ({ row }) => `${row.original.user.firstName} ${row.original.user.lastName}`,
    },
    {
      accessorKey: "item.name",
      header: "Item",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => formatDate(row.original.startDate),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => formatDate(row.original.endDate),
    },
    {
      accessorKey: "totalPrice",
      header: "Total Price",
      cell: ({ row }) => formatPrice(row.original.totalPrice),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "active"
              ? "bg-green-100 text-green-800"
              : row.original.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : row.original.status === "completed"
                  ? "bg-blue-100 text-blue-800"
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
            row.original.paymentStatus === "paid"
              ? "bg-green-100 text-green-800"
              : row.original.paymentStatus === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : row.original.paymentStatus === "refunded"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.paymentStatus.charAt(0).toUpperCase() + row.original.paymentStatus.slice(1)}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/rentals/${row.original.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ]

  // Get today's date
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Filter active rentals
  const activeRentals = allRentals.filter(rental => rental.status === "active")

  // Filter overdue rentals
  const overdueRentals = allRentals.filter(rental => {
    const endDate = new Date(rental.endDate)
    return rental.status === "active" && endDate < today
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rentals</h1>
        <Link href="/admin/rentals/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Rental
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Rentals</p>
          </div>
          <div className="text-2xl font-bold">{allRentals.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Active</p>
          </div>
          <div className="text-2xl font-bold text-green-600">{activeRentals.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Overdue</p>
          </div>
          <div className="text-2xl font-bold text-red-600">{overdueRentals.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Completed</p>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {allRentals.filter(rental => rental.status === "completed").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Cancelled</p>
          </div>
          <div className="text-2xl font-bold text-gray-600">
            {allRentals.filter(rental => rental.status === "cancelled").length}
          </div>
        </div>
      </div>

      {/* <DataTable columns={columns} data={allRentals} /> */}
    </div>
  )
}