"use server"

import { db } from "@/db"
import { payments, orders, rentals, notifications } from "@/db/schema"
import { getCurrentUser } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"
import { formatPrice } from "@/lib/utils"

export async function processPayment({
  amount,
  method,
  relatedId,
  relatedType,
  metadata,
}: {
  amount: number
  method: string
  relatedId: number
  relatedType: string
  metadata?: any
}) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return { success: false, message: "Not authenticated" }
    }

    // In a real application, you would integrate with a payment gateway here
    // For now, we'll simulate a successful payment

    // Generate a fake transaction ID
    const transactionId = `txn_${Math.random().toString(36).substring(2, 15)}`

    // Create a payment record
    await db.insert(payments).values({
      userId: currentUser.id,
      amount,
      method,
      status: "completed", // In a real app, this would initially be "pending"
      transactionId,
      relatedId,
      relatedType,
      metadata: metadata || {},
    })

    // Update the related entity (order, rental, etc.)
    // This would depend on the relatedType
    if (relatedType === "order") {
      await db
        .update(orders)
        .set({
          status: "processing",
          paymentIntentId: transactionId,
        })
        .where(eq(orders.id, relatedId))

      revalidatePath(`/portfolio/liquor/shop/orders/${relatedId}`)
    } else if (relatedType === "rental") {
      await db
        .update(rentals)
        .set({
          status: "active",
          paymentStatus: "paid",
        })
        .where(eq(rentals.id, relatedId))

      revalidatePath(`/dashboard/rentals/${relatedId}`)
    }

    // Create a notification for the user
    await db.insert(notifications).values({
      userId: currentUser.id,
      title: "Payment Successful",
      message: `Your payment of ${formatPrice(amount)} has been processed successfully.`,
      type: "payment",
      relatedId,
      relatedType,
    })

    revalidatePath("/dashboard")
    revalidatePath("/admin/dashboard")

    return { success: true, transactionId }
  } catch (error) {
    console.error("Payment processing error:", error)
    return { success: false, message: "Failed to process payment" }
  }
}

export async function getPaymentsByUser(userId: number) {
  try {
    const userPayments = await db.query.payments.findMany({
      where: eq(payments.userId, userId),
      orderBy: (payments, { desc }) => [desc(payments.createdAt)],
    })

    return { success: true, data: userPayments }
  } catch (error) {
    console.error("Failed to fetch user payments:", error)
    return { success: false, message: "Failed to fetch payments" }
  }
}

export async function getPaymentsByRelated(relatedId: number, relatedType: string) {
  try {
    const relatedPayments = await db.query.payments.findMany({
      where: (payments, { eq, and }) => and(eq(payments.relatedId, relatedId), eq(payments.relatedType, relatedType)),
      orderBy: (payments, { desc }) => [desc(payments.createdAt)],
    })

    return { success: true, data: relatedPayments }
  } catch (error) {
    console.error("Failed to fetch related payments:", error)
    return { success: false, message: "Failed to fetch payments" }
  }
}

