import { db } from "@/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Plus } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { formatPrice } from "@/lib/utils"

export default async function EmployeesPage() {
  const allEmployees: {
    id: string;
    user: { firstName: string; lastName: string };
    position: string;
    department: string | null;
    subsidiary: { name: string };
    salary: number;
    status: string;
  }[] = (await db.query.employees.findMany({
    orderBy: (employees, { desc }) => [desc(employees.createdAt)],
    with: {
      user: true,
      subsidiary: true,
    },
  })).map(employee => ({
    ...employee,
    id: employee.id.toString(),
    salary: employee.salary ?? 0,
    status: employee.status ?? "unknown",
    user: {
      firstName: employee.user?.firstName ?? "N/A",
      lastName: employee.user?.lastName ?? "N/A",
    },
    subsidiary: employee.subsidiary ?? { name: "N/A" },
  }));

  const columns: ColumnDef<typeof allEmployees[number]>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "user.firstName",
      header: "First Name",
    },
    {
      accessorKey: "user.lastName",
      header: "Last Name",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "subsidiary.name",
      header: "Subsidiary",
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }: { row: { original: { salary: number } } }) => formatPrice(row.original.salary),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: { status: string } } }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "active"
              ? "bg-green-100 text-green-800"
              : row.original.status === "on_leave"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.status === "active" ? "Active" : row.original.status === "on_leave" ? "On Leave" : "Terminated"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }: { row: { original: { id: string } } }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/employees/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Link href="/admin/employees/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </div>

      {/* <DataTable columns={columns} data={allEmployees} /> */}
    </div>
  )
}

