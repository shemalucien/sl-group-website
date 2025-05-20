"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"

import {requireAdmin} from "@/lib/auth" // Adjust the import path as necessary

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


// export async function getUsers() {
//   return await db.query.users.findMany({
//     orderBy: (users, { desc }) => [desc(users.createdAt)],
//   })
// }


/**
 * Get all users from the database
 */
export async function getUsers() {
  try {
    // You might want to add authorization here
    const currentUser = await getCurrentUser()
    if (!currentUser || !["admin", "subsidiary_admin"].includes(currentUser.role)) {
      return { success: false, message: "Unauthorized access" }
    }

    const allUsers = await db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    })
    
    return allUsers
  } catch (error) {
    console.error("Failed to get users:", error)
    throw new Error("Failed to get users")
  }
}

/**
 * Get a single user by ID
 */
export async function getUserById(userId: number) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || !["admin", "subsidiary_admin"].includes(currentUser.role)) {
      return { success: false, message: "Unauthorized access" }
    }

    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    })
    
    if (!user) {
      return { success: false, message: "User not found" }
    }
    
    return user
  } catch (error) {
    console.error(`Failed to get user ${userId}:`, error)
    return { success: false, message: "Failed to get user" }
  }
}

/**
 * Update a user
 */
export async function updateUser({
  userId,
  firstName,
  lastName,
  email,
  role,
}: {
  userId: number
  firstName: string
  lastName: string
  email: string
  role: string
}) {
  try {
    // Check if user is authenticated
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { success: false, message: "You must be logged in to update a user" }
    }

    // Check if user is updating their own profile or is an admin/subsidiary_admin
    if (currentUser.id !== userId && !["admin", "subsidiary_admin"].includes(currentUser.role)) {
      return { success: false, message: "You are not authorized to update this user" }
    }

    // Only admins can change roles
    if (role && currentUser.role !== "admin") {
      return { success: false, message: "Only admins can change user roles" }
    }

    // Check if email is already in use by another user
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq, and, ne }) => and(eq(users.email, email), ne(users.id, userId)),
    })

    if (existingUser) {
      return { success: false, message: "Email is already in use by another user" }
    }

    // Update user
    await db
    .update(users)
    .set({
      firstName,
      lastName,
      email,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))

    revalidatePath("/admin/users")
    return { success: true }
  } catch (error) {
    console.error("Failed to update user:", error)
    return { success: false, message: "Failed to update user" }
  }
}

/**
 * Delete a user
 */
export async function deleteUser(userId: number) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, message: "Only admins can delete users" }
    }

    // Check if the user is trying to delete themselves
    if (currentUser.id === userId) {
      return { success: false, message: "You cannot delete your own account" }
    }

    // Delete the user
    await db
      .delete(users)
      .where(eq(users.id, userId))
    
    // Revalidate the users path to update the UI
    revalidatePath("/admin/users")
    
    return { success: true }
  } catch (error) {
    console.error(`Failed to delete user ${userId}:`, error)
    return { success: false, message: error || "Failed to delete user" }
  }
}