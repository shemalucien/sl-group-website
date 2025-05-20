import { db } from "@/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Calendar, Plus } from 'lucide-react'
import { formatDate, formatTime } from "@/lib/utils"

export default async function AppointmentsPage() {
  const allAppointments = await db.query.appointments.findMany({
    // orderBy: (appointments, { desc }) => [desc(appointments.date), asc(appointments.time)],
    with: {
      user: true,
      // subsidiary: true,
      // staff: true,
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
      accessorKey: "subsidiary.name",
      header: "Subsidiary",
    },
    {
      accessorKey: "service",
      header: "Service",
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.date),
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => formatTime(row.original.time),
    },
    {
      accessorKey: "staff.firstName",
      header: "Staff",
      cell: ({ row }) => row.original.staff ? `${row.original.staff.firstName} ${row.original.staff.lastName}` : "Not assigned",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "confirmed"
              ? "bg-green-100 text-green-800"
              : row.original.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : row.original.status === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : row.original.status === "completed"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/appointments/${row.original.id}`}>
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

  // Filter appointments for today
  const todayAppointments = allAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date)
    appointmentDate.setHours(0, 0, 0, 0)
    return appointmentDate.getTime() === today.getTime()
  })

  // Filter upcoming appointments (future dates)
  const upcomingAppointments = allAppointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date)
    appointmentDate.setHours(0, 0, 0, 0)
    return appointmentDate.getTime() > today.getTime()
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <Link href="/admin/appointments/new">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total</p>
          </div>
          <div className="text-2xl font-bold">{allAppointments.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Today</p>
          </div>
          <div className="text-2xl font-bold text-blue-600">{todayAppointments.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Upcoming</p>
          </div>
          <div className="text-2xl font-bold text-purple-600">{upcomingAppointments.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Confirmed</p>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {allAppointments.filter(appointment => appointment.status === "confirmed").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Pending</p>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {allAppointments.filter(appointment => appointment.status === "pending").length}
          </div>
        </div>
      </div>

      {/* <DataTable columns={columns} data={allAppointments} /> */}
    </div>
  )
}