"use server"

import { db } from "@/db"
import { notifications } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { count } from "drizzle-orm"

export async function createNotification({
  userId,
  title,
  message,
  type,
  relatedId,
  relatedType,
}: {
  userId: number
  title: string
  message: string
  type: string
  relatedId?: number
  relatedType?: string
}) {
  try {
    await db.insert(notifications).values({
      userId,
      title,
      message,
      type,
      relatedId,
      relatedType,
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to create notification:", error)
    return { success: false, message: "Failed to create notification" }
  }
}

export async function markNotificationAsRead(id: number) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return { success: false, message: "Not authenticated" }
    }

    // Check if the notification belongs to the current user
    const notification = await db.query.notifications.findFirst({
      where: eq(notifications.id, id),
    })

    if (!notification) {
      return { success: false, message: "Notification not found" }
    }

    if (notification.userId !== currentUser.id && currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" }
    }

    await db.update(notifications).set({ read: true }).where(eq(notifications.id, id))

    revalidatePath("/admin/dashboard")
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Failed to mark notification as read:", error)
    return { success: false, message: "Failed to mark notification as read" }
  }
}

export async function markAllNotificationsAsRead(userId: number) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return { success: false, message: "Not authenticated" }
    }

    // Only allow users to mark their own notifications as read, or admins to mark any
    if (currentUser.id !== userId && currentUser.role !== "admin") {
      return { success: false, message: "Unauthorized" }
    }

    await db.update(notifications).set({ read: true }).where(eq(notifications.userId, userId))

    revalidatePath("/admin/dashboard")
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error) {
    console.error("Failed to mark all notifications as read:", error)
    return { success: false, message: "Failed to mark all notifications as read" }
  }
}

export async function getUnreadNotificationsCount(userId: number) {
  try {
    const result = await db
      .select({ count: count() })
      .from(notifications)
      .where(eq(notifications.userId, userId) && eq(notifications.read, false))

    return { success: true, count: result[0].count }
  } catch (error) {
    console.error("Failed to get unread notifications count:", error)
    return { success: false, message: "Failed to get unread notifications count" }
  }
}

