// import { authMiddleware } from "@clerk/nextjs"

// export default authMiddleware({
//   // Public routes that don't require authentication
//   publicRoutes: [
//     "/",
//     "/about",
//     "/contact",
//     "/portfolio",
//     "/portfolio/(.*)",
//     "/api/subsidiaries",
//     "/api/subsidiaries/(.*)",
//   ],
// })

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// }

// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { getSession } from "./lib/auth"

// export async function middleware(request: NextRequest) {
//   // Public routes that don't require authentication
//   const publicRoutes = [
//     "/",
//     "/about",
//     "/contact",
//     "/portfolio/tech",
//     "/portfolio/liquor",
//     "/auth/login",
//     "/auth/register",
//     "/api/auth/login",
//     "/api/auth/register",
//     "/api/subsidiaries",
//     "/api/subsidiaries/(.*)",
//   ]

//   // Check if the requested path is public
//   const isPublicRoute = publicRoutes.some((route) => {
//     if (route.endsWith("(.*)")) {
//       const baseRoute = route.replace("(.*)", "")
//       return request.nextUrl.pathname.startsWith(baseRoute)
//     }
//     return request.nextUrl.pathname === route
//   })

//   // Allow access to public routes without authentication
//   if (isPublicRoute) {
//     return NextResponse.next()
//   }

//   // For protected routes, check if the user is authenticated
//   const session = await getSession()

//   if (!session) {
//     // Redirect to login page if not authenticated
//     const loginUrl = new URL("/auth/login", request.url)
//     loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
//     return NextResponse.redirect(loginUrl)
//   }

//   // Admin-only routes
//   const adminRoutes = ["/admin", "/admin/(.*)"]
//   const isAdminRoute = adminRoutes.some((route) => {
//     if (route.endsWith("(.*)")) {
//       const baseRoute = route.replace("(.*)", "")
//       return request.nextUrl.pathname.startsWith(baseRoute)
//     }
//     return request.nextUrl.pathname === route
//   })

//   // Check if user has admin privileges for admin routes
//   if (isAdminRoute && session.user.role !== "admin") {
//     return NextResponse.redirect(new URL("/unauthorized", request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
// }




// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { getSession } from "./lib/auth"

// export async function middleware(request: NextRequest) {
//   // Public routes that don't require authentication
//   const publicRoutes = [
//     "/",
//     "/about",
//     "/contact",
//     "/portfolio",
//     "/portfolio/tech",
//     "/portfolio/liquor",
//     "/blog",
//     "/careers",
//     "/auth/login",
//     "/auth/register",
//     "/api/auth/login",
//     "/api/auth/register",
//     "/api/subsidiaries",
//     "/api/subsidiaries/(.*)",
//   ]

//   // Check if the requested path is public
//   const isPublicRoute = publicRoutes.some((route) => {
//     if (route.endsWith("(.*)")) {
//       const baseRoute = route.replace("(.*)", "")
//       return request.nextUrl.pathname.startsWith(baseRoute)
//     }
//     return request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + "/")
//   })

//   // Allow access to public routes without authentication
//   if (isPublicRoute) {
//     return NextResponse.next()
//   }

//   // For protected routes, check if the user is authenticated
//   const session = await getSession()

//   if (!session) {
//     // Redirect to login page if not authenticated
//     const loginUrl = new URL("/auth/login", request.url)
//     loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
//     return NextResponse.redirect(loginUrl)
//   }

//   // Admin-only routes
//   const adminRoutes = ["/admin", "/admin/(.*)"]
//   const isAdminRoute = adminRoutes.some((route) => {
//     if (route.endsWith("(.*)")) {
//       const baseRoute = route.replace("(.*)", "")
//       return request.nextUrl.pathname.startsWith(baseRoute)
//     }
//     return request.nextUrl.pathname === route
//   })

//   // Check if user has admin privileges for admin routes
//   if (isAdminRoute && session.user.role !== "admin") {
//     return NextResponse.redirect(new URL("/unauthorized", request.url))
//   }

//   // Dashboard routes
//   const dashboardRoutes = ["/dashboard", "/dashboard/(.*)"]
//   const isDashboardRoute = dashboardRoutes.some((route) => {
//     if (route.endsWith("(.*)")) {
//       const baseRoute = route.replace("(.*)", "")
//       return request.nextUrl.pathname.startsWith(baseRoute)
//     }
//     return request.nextUrl.pathname === route
//   })

//   // Allow access to dashboard for authenticated users
//   if (isDashboardRoute) {
//     return NextResponse.next()
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
// }


import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/about",
    "/contact",
    "/portfolio",
    "/portfolio/tech",
    "/portfolio/liquor",
    "/blog",
    "/careers",
    "/auth/login",
    "/auth/register",
    "/api/auth/login",
    "/api/auth/register",
    "/api/subsidiaries",
    "/api/subsidiaries/(.*)",
  ]

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

  // For protected routes, check if the user is authenticated
  // Use the session_id cookie directly instead of getSession()
  const sessionId = request.cookies.get("session_id")?.value
  
  if (!sessionId) {
    // Redirect to login page if not authenticated
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Since we can't perform database lookups in Edge middleware,
  // we can optionally store essential user info (like role) in a separate cookie
  // Or create an API endpoint to verify sessions and store the result

  // Admin-only routes
  const adminRoutes = ["/admin", "/admin/(.*)"]
  const isAdminRoute = adminRoutes.some((route) => {
    if (route.endsWith("(.*)")) {
      const baseRoute = route.replace("(.*)", "")
      return request.nextUrl.pathname.startsWith(baseRoute)
    }
    return request.nextUrl.pathname === route
  })

  // If it's an admin route, we'll redirect to a server component that can verify admin status
  if (isAdminRoute) {
    return NextResponse.rewrite(new URL("/api/auth/verify-admin?redirect=" + encodeURIComponent(request.nextUrl.pathname), request.url))
  }

  // Dashboard routes
  const dashboardRoutes = ["/admin", "/dashboard/(.*)"]
  const isDashboardRoute = dashboardRoutes.some((route) => {
    if (route.endsWith("(.*)")) {
      const baseRoute = route.replace("(.*)", "")
      return request.nextUrl.pathname.startsWith(baseRoute)
    }
    return request.nextUrl.pathname === route
  })

  // Allow access to dashboard for authenticated users
  if (isDashboardRoute) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}