// import { auth } from "@clerk/nextjs/server"
// import { redirect } from "next/navigation"

// export const requireAuth = () => {
//   const { userId } = auth()

//   if (!userId) {
//     redirect("/sign-in")
//   }

//   return userId
// }

// export const requireAdmin = async () => {
//   const { userId } = auth()

//   if (!userId) {
//     redirect("/sign-in")
//   }

//   // Here you would typically check if the user has admin privileges
//   // For now, we'll just return the userId
//   // In a real application, you might want to check against a database or Clerk metadata

//   return userId
// }

import { db } from "@/db"
import { sessions, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

export type User = {
  id: number
  email: string
  firstName: string | null
  lastName: string | null
  role: "admin" | "subsidiary_admin" | "staff" | "customer"
  subsidiaryId: number | null
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")?.value

  if (!sessionId) {
    return null
  }

  const session = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
    with: {
      user: true,
    },
  })

  if (!session) {
    return null
  }

  // Check if session is expired
  if (new Date(session.expiresAt) < new Date()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId))
    cookieStore.set("session_id", "", { expires: new Date(0), path: "/" })
    return null
  }

  return session
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")?.value
  console.log("Session ID:", sessionId)
  if (!sessionId) {
    return null
  }
  
  if (!session) {
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
    role: session.user.role ?? "customer",
    subsidiaryId: session.user.subsidiaryId,
  }
}

export async function signIn(email: string, password: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) {
    return { success: false, message: "Invalid email or password" }
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)

  if (!passwordMatch) {
    return { success: false, message: "Invalid email or password" }
  }

  // Create a new session
  const sessionId = uuidv4()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // Session expires in 7 days

  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  })

  // Set the session cookie
  const cookieStore = await cookies()
  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return { success: true }
}

export async function signUp(email: string, password: string, firstName: string, lastName: string) {
  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (existingUser) {
    return { success: false, message: "Email already in use" }
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10)

  // Create the user
  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash,
      firstName,
      lastName,
      role: "customer", // Default role
    })
    .returning()

  // Create a session
  const sessionId = uuidv4()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 7) // Session expires in 7 days

  await db.insert(sessions).values({
    id: sessionId,
    userId: user.id,
    expiresAt,
  })

  // Set the session cookie
  const cookieStore = await cookies();
  cookieStore.set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return { success: true }
}

export async function signOut() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")?.value

  if (sessionId) {
    await db.delete(sessions).where(eq(sessions.id, sessionId))
  }

  cookieStore.delete("session_id")
}

export async function requireAuth() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")?.value

  if (!sessionId) {
    redirect("/auth/login")
  }

  return sessionId
}

export async function requireAdmin() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.role !== "admin") {
    redirect("/unauthorized")
  }

  return user
}

export async function requireSubsidiaryAccess(subsidiaryId: number) {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Admin has access to everything
  if (user.role === "admin") {
    return user
  }

  // Subsidiary admin or staff can only access their own subsidiary
  if ((user.role === "subsidiary_admin" || user.role === "staff") && user.subsidiaryId === subsidiaryId) {
    return user
  }

  redirect("/unauthorized")
}

