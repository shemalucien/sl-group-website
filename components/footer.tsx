// import Link from "next/link"
// import { Facebook, Instagram, Linkedin } from "lucide-react"

// export default function Footer() {
//   return (
//     <footer className="w-full border-t bg-background">
//       <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           <div className="space-y-4">
//             <h3 className="text-lg font-bold">SL Group</h3>
//             <p className="text-sm text-muted-foreground">Innovation. Excellence. Impact.</p>
//             <div className="flex space-x-4">
//               <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
//                 <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
//                 <span className="sr-only">LinkedIn</span>
//               </Link>
//               <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
//                 <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
//                 <span className="sr-only">Instagram</span>
//               </Link>
//               <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
//                 <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
//                 <span className="sr-only">Facebook</span>
//               </Link>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold">Our Companies</h3>
//             <ul className="grid gap-2 text-sm">
//               <li>
//                 <Link href="/portfolio/tech" className="text-muted-foreground hover:text-primary">
//                   SL Tech Innovators
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/portfolio/events" className="text-muted-foreground hover:text-primary">
//                   SL Elite Events
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/portfolio/properties" className="text-muted-foreground hover:text-primary">
//                   SL Prime Properties
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/portfolio/grooming" className="text-muted-foreground hover:text-primary">
//                   SL Grooming Studio
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/portfolio/stationery" className="text-muted-foreground hover:text-primary">
//                   SL Stationery Hub
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/portfolio/liquor" className="text-muted-foreground hover:text-primary">
//                   SL Liquor & Market
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold">Company</h3>
//             <ul className="grid gap-2 text-sm">
//               <li>
//                 <Link href="/about" className="text-muted-foreground hover:text-primary">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about#vision" className="text-muted-foreground hover:text-primary">
//                   Vision & Mission
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about#values" className="text-muted-foreground hover:text-primary">
//                   Core Values
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about#impact" className="text-muted-foreground hover:text-primary">
//                   Our Impact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="space-y-4">
//             <h3 className="text-sm font-bold">Connect With Us</h3>
//             <ul className="grid gap-2 text-sm">
//               <li className="text-muted-foreground">Email: connect@slgroup.com</li>
//               <li className="text-muted-foreground">Phone: +XXX-XXX-XXXX</li>
//               <li className="text-muted-foreground">Social: @SLGroupGlobal</li>
//               <li>
//                 <Link href="/contact" className="text-primary hover:underline">
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
//           <p>&copy; {new Date().getFullYear()} SL Group. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

interface Subsidiary {
  id: number
  name: string
  slug: string
  isActive: boolean
}

export default function Footer() {
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

    fetchSubsidiaries()
  }, [])

  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">SL Group</h3>
            <p className="text-sm text-muted-foreground">Innovation. Excellence. Impact.</p>
            <div className="flex space-x-4">
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Our Companies</h3>
            <ul className="grid gap-2 text-sm">
              {!isLoading &&
                subsidiaries.map((subsidiary) => (
                  <li key={subsidiary.id}>
                    <Link href={`/portfolio/${subsidiary.slug}`} className="text-muted-foreground hover:text-primary">
                      {subsidiary.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Company</h3>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/about#vision" className="text-muted-foreground hover:text-primary">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link href="/about#values" className="text-muted-foreground hover:text-primary">
                  Core Values
                </Link>
              </li>
              <li>
                <Link href="/about#impact" className="text-muted-foreground hover:text-primary">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold">Connect With Us</h3>
            <ul className="grid gap-2 text-sm">
              <li className="text-muted-foreground">Email: connect@slgroup.com</li>
              <li className="text-muted-foreground">Phone: +XXX-XXX-XXXX</li>
              <li className="text-muted-foreground">Social: @SLGroupGlobal</li>
              <li>
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SL Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


