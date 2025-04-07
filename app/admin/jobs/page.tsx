import { db } from "@/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Plus, Briefcase } from 'lucide-react'
import { formatDate } from "@/lib/utils"

export default async function JobListingsPage() {
  const allJobs = await db.query.jobListings.findMany({
    orderBy: (jobListings, { desc }) => [desc(jobListings.createdAt)],
    with: {
      subsidiary: true,
    },
  })

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Job Title",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "subsidiary.name",
      header: "Subsidiary",
      cell: ({ row }) => row.original.subsidiary?.name || "N/A",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "employmentType",
      header: "Type",
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original.employmentType.replace('_', ' ')}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "open"
              ? "bg-green-100 text-green-800"
              : row.original.status === "closed"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </span>
      ),
    },
    {
      accessorKey: "applicationDeadline",
      header: "Deadline",
      cell: ({ row }) => formatDate(row.original.applicationDeadline),
    },
    {
      accessorKey: "createdAt",
      header: "Posted Date",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/jobs/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Link href={`/careers/${row.original.slug}`} target="_blank">
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
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <Link href="/admin/jobs/new">
          <Button>
            <Briefcase className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Listings</p>
          </div>
          <div className="text-2xl font-bold">{allJobs.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Open Positions</p>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {allJobs.filter((job) => job.status === "open").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Filled Positions</p>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {allJobs.filter((job) => job.status === "filled").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Closed Positions</p>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {allJobs.filter((job) => job.status === "closed").length}
          </div>
        </div>
      </div>

      {/* <DataTable columns={columns} data={allJobs} /> */}
    </div>
  )
}