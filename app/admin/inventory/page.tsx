import { db } from "@/db"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { UpdateStockButton } from "@/components/admin/update-stock-button"

export default async function InventoryPage() {
  const inventory = await db.query.products.findMany({
    orderBy: (products, { asc }) => [asc(products.name)],
  })

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => formatPrice(row.original.price),
    },
    {
      accessorKey: "stock",
      header: "Current Stock",
      cell: ({ row }) => (
        <span
          className={`font-medium ${
            row.original.stock <= 5 ? "text-red-600" : row.original.stock <= 20 ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {row.original.stock}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <UpdateStockButton productId={row.original.id} currentStock={row.original.stock} />,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button>Generate Inventory Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Products</p>
          </div>
          <div className="text-2xl font-bold">{inventory.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Low Stock Items</p>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {inventory.filter((product) => product.stock <= 20 && product.stock > 5).length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Out of Stock Items</p>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {inventory.filter((product) => product.stock <= 5).length}
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={inventory} />
    </div>
  )
}

