import { signOut } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    await signOut()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, message: "An unexpected error occurred" }, { status: 500 })
  }
}

