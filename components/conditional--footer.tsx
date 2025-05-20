"use client"

import { usePathname } from "next/navigation"
import Footer from "./footer"

export default function ConditionalFooter() {
  // Get the current pathname using the usePathname hook
  const pathname = usePathname()

  // Check if the current path is an admin path
  const isAdminRoute = pathname?.startsWith("/admin")

  // Only render the Footer if not on an admin route
  if (isAdminRoute) {
    return null
  }

  return <Footer />
}
