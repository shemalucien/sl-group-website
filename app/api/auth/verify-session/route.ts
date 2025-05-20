// app/api/auth/verify-session/route.ts
import { NextResponse } from "next/server"
import { db } from "@/db"
import { sessions } from "@/db/schema"
import { eq } from "drizzle-orm"
import { decryptSession } from "@/lib/session-encryption"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionToken = searchParams.get('session_token')
  
  if (!sessionToken) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  
  const payload = await decryptSession(sessionToken)
  
  if (!payload || !payload.sessionId) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  
  // Double check with the database
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, payload.sessionId as string),
    with: {
      user: {
        columns: {
          id: true,
          role: true,
          subsidiaryId: true
        }
      }
    },
  })
  
  if (!session || new Date(session.expiresAt) < new Date()) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
  
  return NextResponse.json({ 
    valid: true,
    user: {
      id: session.user.id,
      role: session.user.role,
      subsidiaryId: session.user.subsidiaryId
    }
  })
}