// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { ShieldAlert } from "lucide-react"

// export default function UnauthorizedPage() {
//   return (
//     <main className="flex-1">
//       <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-6 py-8 text-center">
//         <ShieldAlert className="h-16 w-16 text-destructive mb-6" />
//         <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
//         <p className="text-muted-foreground mb-8 max-w-md">
//           You don't have permission to access this page. Please contact an administrator if you believe this is an
//           error.
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4">
//           <Button asChild>
//             <Link href="/">Return to Home</Link>
//           </Button>
//           <Button variant="outline" asChild>
//             <Link href="/contact">Contact Support</Link>
//           </Button>
//         </div>
//       </div>
//     </main>
//   )
// }


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-10">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="rounded-full bg-red-100 p-6 mb-6">
          <ShieldAlert className="h-12 w-12 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page. If you believe this is an error, please contact your
          administrator.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

