// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Menu, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { ModeToggle } from "@/components/mode-toggle"

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Link href="/" className="font-bold text-xl">
//             SL GROUP
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-6">
//           <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
//             Home
//           </Link>
//           <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
//             About
//           </Link>
//           <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
//             Portfolio
//           </Link>
//           <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
//             Contact
//           </Link>
//         </nav>

//         <div className="flex items-center gap-2">
//           <ModeToggle />
//           <Link href="/contact" className="hidden md:inline-flex">
//             <Button>Get in Touch</Button>
//           </Link>

//           {/* Mobile Menu Button */}
//           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             <span className="sr-only">Toggle menu</span>
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t">
//           <div className="container py-4 grid gap-4">
//             <Link
//               href="/"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               href="/about"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               About
//             </Link>
//             <Link
//               href="/portfolio"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Portfolio
//             </Link>
//             <Link
//               href="/contact"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Contact
//             </Link>
//             <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
//               <Button className="w-full">Get in Touch</Button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Menu, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { ModeToggle } from "@/components/mode-toggle"

// interface Subsidiary {
//   id: number
//   name: string
//   slug: string
//   isActive: boolean
// }

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     async function fetchSubsidiaries() {
//       try {
//         const response = await fetch("/api/subsidiaries")
//         if (!response.ok) {
//           throw new Error("Failed to fetch subsidiaries")
//         }
//         const data = await response.json()
//         // Filter only active subsidiaries
//         setSubsidiaries(data.filter((sub: Subsidiary) => sub.isActive))
//       } catch (error) {
//         console.error("Error fetching subsidiaries:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchSubsidiaries()
//   }, [])

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Link href="/" className="font-bold text-xl">
//             SL GROUP
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-6">
//           <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
//             Home
//           </Link>
//           <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
//             About
//           </Link>
//           <div className="relative group">
//             <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
//               Portfolio
//             </Link>
//             {!isLoading && subsidiaries.length > 0 && (
//               <div className="absolute left-0 mt-2 w-48 bg-background rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                 {subsidiaries.map((subsidiary) => (
//                   <Link
//                     key={subsidiary.id}
//                     href={`/portfolio/${subsidiary.slug}`}
//                     className="block px-4 py-2 text-sm hover:bg-muted"
//                   >
//                     {subsidiary.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//           <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
//             Blog
//           </Link>
//           <Link href="/careers" className="text-sm font-medium transition-colors hover:text-primary">
//             Careers
//           </Link>
//           <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
//             Contact
//           </Link>
//         </nav>

//         <div className="flex items-center gap-2">
//           <ModeToggle />
//           <Link href="/contact" className="hidden md:inline-flex">
//             <Button>Get in Touch</Button>
//           </Link>

//           {/* Mobile Menu Button */}
//           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             <span className="sr-only">Toggle menu</span>
//           </Button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t">
//           <div className="container py-4 grid gap-4">
//             <Link
//               href="/"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               href="/about"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               About
//             </Link>
//             <Link
//               href="/portfolio"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Portfolio
//             </Link>
//             {!isLoading && subsidiaries.length > 0 && (
//               <div className="pl-4 space-y-2">
//                 {subsidiaries.map((subsidiary) => (
//                   <Link
//                     key={subsidiary.id}
//                     href={`/portfolio/${subsidiary.slug}`}
//                     className="flex items-center py-1 text-sm transition-colors hover:text-primary"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {subsidiary.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//             <Link
//               href="/blog"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Blog
//             </Link>
//             <Link
//               href="/careers"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Careers
//             </Link>
//             <Link
//               href="/contact"
//               className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Contact
//             </Link>
//             <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
//               <Button className="w-full">Get in Touch</Button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

interface Subsidiary {
  id: number
  name: string
  slug: string
  isActive: boolean
}

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  useEffect(() => {
    async function fetchSubsidiaries() {
      try {
        const response = await fetch("/api/subsidiaries")
        if (!response.ok) {
          throw new Error("Failed to fetch subsidiaries")
        }
        const data = await response.json()
        // Filter only active subsidiaries
        setSubsidiaries(data.filter((sub: Subsidiary) => sub.isActive))
      } catch (error) {
        console.error("Error fetching subsidiaries:", error)
      } finally {
        setIsLoading(false)
      }
    }

    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          console.log("User data:", userData)
          setUser(userData)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoadingUser(false)
      }
    }

    fetchSubsidiaries()
    fetchUser()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            SL GROUP
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <div className="relative group flex items-center">
            <Link href="/portfolio" className="text-sm font-medium transition-colors hover:text-primary">
              Portfolio
            </Link>
            {!isLoading && subsidiaries.length > 0 && (
              <div className="absolute left-0 mt-24 w-48 bg-background rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {subsidiaries.map((subsidiary) => (
                  <Link
                    key={subsidiary.id}
                    href={`/portfolio/${subsidiary.slug}`}
                    className="block px-4 py-2 text-sm hover:bg-muted"
                  >
                    {subsidiary.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="/careers" className="text-sm font-medium transition-colors hover:text-primary">
            Careers
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />

          {!isLoadingUser && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login" className="hidden md:inline-flex">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}

          <Link href="/contact" className="hidden md:inline-flex">
            <Button>Get in Touch</Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 grid gap-4">
            <Link
              href="/"
              className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfolio
            </Link>
            {!isLoading && subsidiaries.length > 0 && (
              <div className="pl-4 space-y-2">
                {subsidiaries.map((subsidiary) => (
                  <Link
                    key={subsidiary.id}
                    href={`/portfolio/${subsidiary.slug}`}
                    className="flex items-center py-1 text-sm transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {subsidiary.name}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/blog"
              className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/careers"
              className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {!isLoadingUser && user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center py-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
            )}

            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Get in Touch</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

