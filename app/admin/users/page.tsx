// "use client"

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { DataTable } from "@/components/data-table" // Make sure this path is correct
// import { UserPlus } from 'lucide-react'
// import { formatDate } from "@/lib/utils"
// import { useState, useEffect } from "react" 
// import { getUsers } from "@/actions/user" // Import the server action

// export default function UsersPage() {
//   const [allUsers, setAllUsers] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   // Fetch data using the server action
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const users = await getUsers()
//         setAllUsers(users)
//       } catch (error) {
//         console.error("Failed to fetch users:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }
    
//     fetchData()
//   }, [])

//   const columns = [
//     {
//       accessorKey: "id",
//       header: "ID",
//     },
//     {
//       accessorKey: "firstName",
//       header: "First Name",
//     },
//     {
//       accessorKey: "lastName",
//       header: "Last Name",
//     },
//     {
//       accessorKey: "email",
//       header: "Email",
//     },
//     {
//       accessorKey: "role",
//       header: "Role",
//       cell: ({ row }) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             row.original.role === "admin"
//               ? "bg-red-100 text-red-800"
//               : row.original.role === "subsidiary_admin"
//                 ? "bg-purple-100 text-purple-800"
//                 : row.original.role === "staff"
//                   ? "bg-blue-100 text-blue-800"
//                   : "bg-green-100 text-green-800"
//           }`}
//         >
//           {row.original.role}
//         </span>
//       ),
//     },
//     {
//       accessorKey: "createdAt",
//       header: "Created At",
//       cell: ({ row }) => formatDate(row.original.createdAt),
//     },
//     {
//       id: "actions",
//       cell: ({ row }) => (
//         <div className="flex items-center gap-2">
//           <Link href={`/admin/users/${row.original.id}`}>
//             <Button variant="outline" size="sm">
//               Edit
//             </Button>
//           </Link>
//         </div>
//       ),
//     },
//   ]

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Users</h1>
//         <Link href="/admin/users/new">
//           <Button>
//             <UserPlus className="mr-2 h-4 w-4" />
//             Add User
//           </Button>
//         </Link>
//       </div>

//       <div className="grid gap-4 md:grid-cols-4">
//         <div className="rounded-lg border bg-card p-6 shadow-sm">
//           <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <p className="text-sm font-medium">Total Users</p>
//           </div>
//           <div className="text-2xl font-bold">{isLoading ? "..." : allUsers.length}</div>
//         </div>
//         <div className="rounded-lg border bg-card p-6 shadow-sm">
//           <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <p className="text-sm font-medium">Admins</p>
//           </div>
//           <div className="text-2xl font-bold text-red-600">
//             {isLoading ? "..." : allUsers.filter((user) => user.role === "admin").length}
//           </div>
//         </div>
//         <div className="rounded-lg border bg-card p-6 shadow-sm">
//           <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <p className="text-sm font-medium">Staff</p>
//           </div>
//           <div className="text-2xl font-bold text-blue-600">
//             {isLoading ? "..." : allUsers.filter((user) => user.role === "staff" || user.role === "subsidiary_admin").length}
//           </div>
//         </div>
//         <div className="rounded-lg border bg-card p-6 shadow-sm">
//           <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <p className="text-sm font-medium">Customers</p>
//           </div>
//           <div className="text-2xl font-bold text-green-600">
//             {isLoading ? "..." : allUsers.filter((user) => user.role === "customer").length}
//           </div>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-32">
//           <p>Loading users...</p>
//         </div>
//       ) : (
//         <DataTable columns={columns} data={allUsers} searchKey="email" />
//       )}
//     </div>
//   )
// }

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { UserPlus, Edit, Trash2 } from 'lucide-react'
import { formatDate } from "@/lib/utils"
import { useState, useEffect } from "react"
import { getUsers, deleteUser } from "@/actions/user"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  createdAt: string | Date
}

export default function UsersPage() {
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch data using the server action
  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const users = await getUsers()
      // Handle potential error response
      if (Array.isArray(users)) {
        setAllUsers(users)
      } else if (users && !users.success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: users.message || "Failed to load users.",
        })
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load users. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDeleteUser() {
    if (!userToDelete) return
    
    setIsDeleting(true)
    try {
      const result = await deleteUser(userToDelete.id)
      
      if (result.success) {
        // Optimistic UI update
        setAllUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete.id))
        
        toast({
          title: "User deleted",
          description: `${userToDelete.firstName} ${userToDelete.lastName} has been deleted.`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Failed to delete user.",
        })
      }
    } catch (error) {
      console.error("Failed to delete user:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsDeleting(false)
      setUserToDelete(null)
    }
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.role === "admin"
              ? "bg-red-100 text-red-800"
              : row.original.role === "subsidiary_admin"
                ? "bg-purple-100 text-purple-800"
                : row.original.role === "staff"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
          }`}
        >
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/users/${row.original.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 hover:bg-red-50"
            onClick={() => setUserToDelete(row.original)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link href="/admin/users/new">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Total Users</p>
          </div>
          <div className="text-2xl font-bold">{isLoading ? "..." : allUsers.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Admins</p>
          </div>
          <div className="text-2xl font-bold text-red-600">
            {isLoading ? "..." : allUsers.filter((user) => user.role === "admin").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Staff</p>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {isLoading ? "..." : allUsers.filter((user) => user.role === "staff" || user.role === "subsidiary_admin").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium">Customers</p>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {isLoading ? "..." : allUsers.filter((user) => user.role === "customer").length}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p>Loading users...</p>
        </div>
      ) : (
        <DataTable columns={columns} data={allUsers} searchKey="email" />
      )}

      {/* Delete User Alert Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {userToDelete?.firstName} {userToDelete?.lastName}'s account and all associated data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}