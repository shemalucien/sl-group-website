// app/api/auth/verify-admin/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const session = await getSession()
  const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/admin"
  
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
  
  if (session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url))
  }
  
  // If user is admin, redirect to the original destination
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}