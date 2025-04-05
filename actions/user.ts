"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateUserProfile({
  userId,
  firstName,
  lastName,
  email,
}: {
  userId: number
  firstName: string
  lastName: string
  email: string
}) {
  try {
    // Check if user is authenticated
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { success: false, message: "You must be logged in to update your profile" }
    }

    // Check if user is updating their own profile or is an admin
    if (currentUser.id !== userId && currentUser.role !== "admin") {
      return { success: false, message: "You are not authorized to update this profile" }
    }

    // Check if email is already in use by another user
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq, and, ne }) => and(eq(users.email, email), ne(users.id, userId)),
    })

    if (existingUser) {
      return { success: false, message: "Email is already in use by another user" }
    }

    // Update user profile
    await db
      .update(users)
      .set({
        firstName,
        lastName,
        email,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error("Failed to update user profile:", error)
    return { success: false, message: "Failed to update profile" }
  }
}

