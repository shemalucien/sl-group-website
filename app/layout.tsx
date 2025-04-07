// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import { ThemeProvider } from "@/components/theme-provider"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "SL Group - Innovation. Excellence. Impact.",
//   description:
//     "SL Group is a dynamic and innovative conglomerate dedicated to delivering excellence across diverse industries.",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//           <div className="flex flex-col min-h-screen">
//             <Header />
//             {children}
//             <Footer />
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }



// import './globals.css'

"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import { usePathname } from "next/navigation"


const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "SL Group - Innovation. Excellence. Impact.",
//   description:
//     "SL Group is a dynamic and innovative conglomerate dedicated to delivering excellence across diverse industries.",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
//           <div className="flex flex-col min-h-screen">
//             <Header />
//             {children}
//             <Footer />
//           </div>
//           <Toaster />
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


// "use client"

// import { ThemeProvider } from "@/components/theme-provider"
// import { Toaster } from "@/components/ui/toaster"
// import Header from "@/components/header"
// import Footer from "@/components/footer"
// import { usePathname } from "next/navigation"
// import { Inter } from "next/font/google"

// const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get the current pathname using the usePathname hook
  const pathname = usePathname()
  
  // Check if the current path is an admin path
  const isAdminRoute = pathname?.startsWith("/admin")
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            {!isAdminRoute && <Footer />}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
