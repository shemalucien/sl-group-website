import './globals.css'
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Script from "next/script"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import ConditionalFooter from "@/components/conditional--footer"
import { ChatWidget } from '@/components/chat/chat-widget'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SL Group - Innovation. Excellence. Impact.",
  description:
    "SL Group is a dynamic and innovative conglomerate dedicated to delivering excellence across diverse industries.",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SL Group",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: "/icons/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SL Group" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <ConditionalFooter />
          </div>
          <Toaster />
          <ChatWidget />
          <PWAInstallPrompt />
        </ThemeProvider>
        <Script src="/pwa.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
