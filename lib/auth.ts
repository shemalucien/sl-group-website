"use server"
import { db } from "@/db"
import { sessions, users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import { encryptSession, decryptSession } from "@/lib/session-encryption"

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
  const encryptedToken = cookieStore.get("session_token")?.value

  if (!encryptedToken) {
    return null
  }

  // Decrypt the session token
  const decrypted = await decryptSession(encryptedToken)
  if (!decrypted || !decrypted.sessionId) {
    return null
  }

  const sessionId = decrypted.sessionId as string

  // Get the session from database using decrypted session ID
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
    const newCookieStore = await cookies()
    newCookieStore.delete("session_token")
    return null
  }

  return session
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession()
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

  // Create encrypted session token
  const encryptedToken = await encryptSession({
    sessionId,
    userId: user.id,
    role: user.role,
    expiresAt: expiresAt.toISOString()
  })

  const cookieStore = await cookies()
  cookieStore.set({
    name: "session_token",
    value: encryptedToken,
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

  // Create encrypted session token
  const encryptedToken = await encryptSession({
    sessionId,
    userId: user.id,
    role: user.role,
    expiresAt: expiresAt.toISOString()
  })

  const cookieStore = await cookies()
  cookieStore.set({
    name: "session_token",
    value: encryptedToken,
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
  const encryptedToken = cookieStore.get("session_token")?.value

  if (encryptedToken) {
    // Decrypt to get the session ID
    const decrypted = await decryptSession(encryptedToken)
    if (decrypted && decrypted.sessionId) {
      // Delete from database
      await db.delete(sessions).where(eq(sessions.id, decrypted.sessionId as string))
    }
  }

  // Remove the cookie regardless
  const newCookieStore = await cookies()
  newCookieStore.delete("session_token")
}

export async function requireAuth() {
  const session = await getSession()
  
  if (!session) {
    redirect("/auth/login")
  }

  return session
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

export async function requireSubsidiaryAdmin() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.role !== "subsidiary_admin" && user.role !== "admin") {
    redirect("/unauthorized")
  }

  return user
}

export async function requireStaff() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.role !== "staff" && user.role !== "subsidiary_admin" && user.role !== "admin") {
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