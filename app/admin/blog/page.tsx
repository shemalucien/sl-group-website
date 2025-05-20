import { db } from "@/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Plus, FileText } from 'lucide-react'
import { formatDate } from "@/lib/utils"

export default async function BlogPostsPage() {
  const allPosts = await db.query.blogPosts.findMany({
    orderBy: (blogPosts, { desc }) => [desc(blogPosts.createdAt)],
    with: {
      author: true,
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
      header: "Title",
    },
    {
      accessorKey: "author.firstName",
      header: "Author",
      cell: ({ row }) => `${row.original.author.firstName} ${row.original.author.lastName}`,
    },
    {
      accessorKey: "subsidiary.name",
      header: "Subsidiary",
      cell: ({ row }) => row.original.subsidiary?.name || "N/A",
    },
    {
      accessorKey: "published",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.published ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      accessorKey: "publishedAt",
      header: "Published Date",
      cell: ({ row }) => row.original.publishedAt ? formatDate(row.original.publishedAt) : "Not published",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/blog/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Link href={`/blog/${row.original.slug}`} target="_blank">
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
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/blog/new">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Posts</p>
          </div>
          <div className="text-2xl font-bold">{allPosts.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Published</p>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {allPosts.filter((post) => post.published).length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Drafts</p>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {allPosts.filter((post) => !post.published).length}
          </div>
        </div>
      </div>

      {/* <DataTable columns={columns} data={allPosts} /> */}
    </div>
  )
}