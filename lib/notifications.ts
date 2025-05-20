import { db } from "@/db"
import { notifications } from "@/db/schema"
import { eq } from "drizzle-orm"

export type NotificationType = "order" | "appointment" | "payment" | "system" | "message"

export interface NotificationData {
  userId: number
  type: NotificationType
  title: string
  message: string
  link?: string
  metadata?: Record<string, any>
}

export async function createNotification(data: NotificationData) {
  return db.insert(notifications).values({
    userId: data.userId,
    type: data.type,
    title: data.title,
    message: data.message,
    link: data.link,
    metadata: data.metadata ? JSON.stringify(data.metadata) : null,
    read: false,
    createdAt: new Date(),
  })
}

export async function markNotificationAsRead(id: number) {
  return db.update(notifications).set({ read: true }).where(eq(notifications.id, id))
}

export async function markAllNotificationsAsRead(userId: number) {
  return db.update(notifications).set({ read: true }).where(eq(notifications.userId, userId))
}

export async function deleteNotification(id: number) {
  return db.delete(notifications).where(eq(notifications.id, id))
}

export function formatNotificationTime(date: Date | string): string {
  const notificationDate = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - notificationDate.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) {
    return "just now"
  } else if (diffMins < 60) {
    return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
  } else {
    return notificationDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}
