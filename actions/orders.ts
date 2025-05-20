"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { orders } from "@/db/schema"
import { getCart } from "./cart"
import { getCurrentUser } from "@/lib/auth"

export async function createOrder(data: any) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      throw new Error("User not authenticated")
    }

    const cart = await getCart()

    if (cart.length === 0) {
      throw new Error("Cart is empty")
    }

    // Calculate order totals
    const subtotal = cart.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)
    const shippingThreshold = data.storeType === "tech" ? 20000 : 10000
    const shipping = subtotal >= shippingThreshold ? 0 : 995
    const tax = Math.round(subtotal * 0.0825)
    const total = subtotal + shipping + tax

    // Create order in database
    const [order] = await db
      .insert(orders)
      .values({
        userId: user.id,
        status: "pending",
        total,
        subtotal,
        tax,
        shipping,
        shippingAddress: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
        billingAddress: `${data.address}, ${data.city}, ${data.state} ${data.zipCode}`,
        paymentMethod: data.paymentMethod,
        items: JSON.stringify(cart),
        storeType: data.storeType || "liquor",
        notes: data.notes || "",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    revalidatePath(`/portfolio/${data.storeType}/shop/order-confirmation/${order.id}`)
    return order
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await db.query.orders.findFirst({
      where: (orders, { eq }) => eq(orders.id, Number(id)),
    })

    return order
  } catch (error) {
    console.error("Error getting order:", error)
    throw error
  }
}

export async function getUserOrders(userId: string) {
  try {
    const userOrders = await db.query.orders.findMany({
      where: (orders, { eq }) => eq(orders.userId, Number(userId)),
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    })

    return userOrders
  } catch (error) {
    console.error("Error getting user orders:", error)
    throw error
  }
}