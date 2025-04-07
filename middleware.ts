import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decryptSession } from "./lib/session-encryption"

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/portfolio",
  "/portfolio/tech",
  "/portfolio/tech-solutions",
  "/portfolio/tech-store",
  "/portfolio/liquor",
  "/portfolio/events",
  "/portfolio/properties",
  "/portfolio/grooming",
  "/portfolio/stationery",
  "/blog",
  "/careers",
  "/auth/login",
  "/auth/register",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/verify-session",
  "/api/subsidiaries",
  "/api/subsidiaries/(.*)",
]

// Api endpoint to verify session in Edge Runtime
export async function POST(request: Request) {
  const body = await request.json()
  const sessionToken = body.sessionToken
  
  if (!sessionToken) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  
  const payload = await decryptSession(sessionToken)
  
  if (!payload || !payload.sessionId || new Date(payload.expiresAt as string) < new Date()) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  
  return NextResponse.json({ 
    valid: true,
    user: {
      id: payload.userId,
      role: payload.role
    }
  })
}

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Check if the requested path is public
  const isPublicRoute = publicRoutes.some((route) => {
    if (route.endsWith("(.*)")) {
      const baseRoute = route.replace("(.*)", "")
      return request.nextUrl.pathname.startsWith(baseRoute)
    }
    return request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + "/")
  })

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, decrypt and verify the session token
  const sessionToken = request.cookies.get('session_token')?.value
  
  if (!sessionToken) {
    // Redirect to login page if not authenticated
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(loginUrl)
  }
  
  // Decrypt and verify the session
  const payload = await decryptSession(sessionToken)
  
  if (!payload || !payload.sessionId || new Date(payload.expiresAt as string) < new Date()) {
    // Session is invalid or expired
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(loginUrl)
  }

  // Admin-only routes
  const adminRoutes = ["/admin", "/admin/(.*)"]
  const isAdminRoute = adminRoutes.some((route) => {
    if (route.endsWith("(.*)")) {
      const baseRoute = route.replace("(.*)", "")
      return request.nextUrl.pathname.startsWith(baseRoute)
    }
    return request.nextUrl.pathname === route
  })

  // Check if user has admin privileges for admin routes
  if (isAdminRoute && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  // Subsidiary admin routes
  const subsidiaryAdminRoutes = ["/subsidiary-admin", "/subsidiary-admin/(.*)"]
  const isSubsidiaryAdminRoute = subsidiaryAdminRoutes.some((route) => {
    if (route.endsWith("(.*)")) {
      const baseRoute = route.replace("(.*)", "")
      return request.nextUrl.pathname.startsWith(baseRoute)
    }
    return request.nextUrl.pathname === route
  })

  // Check if user has subsidiary admin privileges for subsidiary admin routes
  if (isSubsidiaryAdminRoute && payload.role !== "subsidiary_admin" && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  // Staff routes
  const staffRoutes = ["/staff", "/staff/(.*)"]
  const isStaffRoute = staffRoutes.some((route) => {
    if (route.endsWith("(.*)")) {
      const baseRoute = route.replace("(.*)", "")
      return request.nextUrl.pathname.startsWith(baseRoute)
    }
    return request.nextUrl.pathname === route
  })

  // Check if user has staff privileges for staff routes
  if (
    isStaffRoute &&
    payload.role !== "staff" &&
    payload.role !== "subsidiary_admin" &&
    payload.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}