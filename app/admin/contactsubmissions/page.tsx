

import { db } from "@/db"
import { users, products, orders, blogPosts, jobListings, appointments, notifications, employees, teamMembers,contactSubmissions } from "@/db/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/admin/overview"
import { RecentOrders } from "@/components/admin/recent-orders"
import { RecentUsers } from "@/components/admin/recent-users"
import { NotificationsPanel } from "@/components/admin/notifications-panel"
import { count, eq } from "drizzle-orm"
import { Users, ShoppingBag, ShoppingCart, FileText, Briefcase, Calendar, Bell } from "lucide-react"
import { getCurrentUser } from "@/lib/auth"

export default async function ContactSubmissionsPage() {
  // Get Contact Submissions
  const unreadContactSubmissions = (await db.query.contactSubmissions.findMany({
    orderBy: (contactSubmissions, { desc }) => [desc(contactSubmissions.createdAt)],
    limit: 5,
  }))
    .filter(submission => submission.createdAt !== null)
    .map(submission => ({
      ...submission,
      createdAt: submission.createdAt,
      isRead: submission.isRead ?? false,
    }))

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Contact Submissions</h1>
      <p className="text-muted-foreground">
        View and manage all contact submissions from your users.
      </p>

      <div className="overflow-hidden rounded-md border">
        <table className="w-full table-auto border-collapse bg-background text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {unreadContactSubmissions.map((submission, index) => (
              <tr key={index} className="border-t">
                <td className="p-4">{submission.name}</td>
                <td className="p-4">{submission.email}</td>
                <td className="p-4">{submission.message}</td>
                <td className="p-4">{submission.createdAt ? submission.createdAt.toLocaleString() : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 bg-muted text-muted-foreground">
        <span>Showing 1–5 of {unreadContactSubmissions.length}</span>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-primary text-white rounded-md">Previous</button>
          <button className="px-4 py-2 bg-primary text-white rounded-md">Next</button>
        </div>
      </div>
    </div>
  )
}
