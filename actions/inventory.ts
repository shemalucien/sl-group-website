"use server"

import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { requireAdmin } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateProductStock({
  productId,
  stock,
}: {
  productId: number
  stock: number
}) {
  try {
    // Check if user is admin
    await requireAdmin()

    // Update product stock
    await db.update(products).set({ stock, updatedAt: new Date() }).where(eq(products.id, productId))

    revalidatePath("/admin/inventory")
    revalidatePath("/admin/products")
    revalidatePath(`/portfolio/liquor/shop/product/${productId}`)

    return { success: true }
  } catch (error) {
    console.error("Failed to update product stock:", error)
    return { success: false, message: "Failed to update product stock" }
  }
}

export async function getLowStockProducts() {
  try {
    // Check if user is admin
    await requireAdmin()

    // Get products with low stock
    const lowStockProducts = await db.query.products.findMany({
      where: (products, { lte }) => lte(products.stock, 20),
      orderBy: (products, { asc }) => [asc(products.stock)],
    })

    return { success: true, data: lowStockProducts }
  } catch (error) {
    console.error("Failed to get low stock products:", error)
    return { success: false, message: "Failed to get low stock products" }
  }
}

