import { db } from "@/db"
import { orders, orderItems, products, inventory } from "@/db/schema"
import { eq, and, gte, lte, desc, count, sum, sql, asc } from "drizzle-orm"
import { formatPrice } from "./utils"

export type ReportType = "sales" | "inventory" | "customers" | "employees" | "payroll" | "rentals" | "payments"

export type ReportPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom"

export interface ReportFilters {
  startDate?: Date
  endDate?: Date
  subsidiaryId?: number
  period?: ReportPeriod
  category?: string
  status?: string
}

export async function generateSalesReport(filters: ReportFilters) {
  const { startDate, endDate, subsidiaryId } = filters

  // Base query conditions
  const conditions = []

  if (startDate) {
    conditions.push(gte(orders.createdAt, startDate))
  }

  if (endDate) {
    conditions.push(lte(orders.createdAt, endDate))
  }

  if (subsidiaryId) {
    conditions.push(eq(orders.subsidiaryId, subsidiaryId))
  }

  // Get total sales
  const salesResult = await db
    .select({
      totalOrders: count(orders.id),
      totalRevenue: sum(orders.total),
    })
    .from(orders)
    .where(and(...conditions))

  // Get sales by product category
  const salesByCategory = await db
    .select({
      category: products.category,
      totalSales: sum(orderItems.quantity),
      totalRevenue: sum(orderItems.price),
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .where(and(...conditions))
    .groupBy(products.category)
    .orderBy(desc(sum(orderItems.price)))

  // Get top selling products
  const topProducts = await db
    .select({
      productId: products.id,
      productName: products.name,
      totalSales: sum(orderItems.quantity),
      totalRevenue: sum(orderItems.price),
    })
    .from(orderItems)
    .innerJoin(products, eq(orderItems.productId, products.id))
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .where(and(...conditions))
    .groupBy(products.id, products.name)
    .orderBy(desc(sum(orderItems.quantity)))
    .limit(10)

  return {
    summary: {
      totalOrders: salesResult[0].totalOrders,
      totalRevenue: formatPrice(Number(salesResult[0].totalRevenue) || 0),
    },
    salesByCategory: salesByCategory.map((item) => ({
      category: item.category,
      totalSales: item.totalSales,
      totalRevenue: formatPrice(Number(item.totalRevenue) || 0),
    })),
    topProducts: topProducts.map((product) => ({
      id: product.productId,
      name: product.productName,
      totalSales: product.totalSales,
      totalRevenue: formatPrice(Number(product.totalRevenue) || 0),
    })),
  }
}

export async function generateInventoryReport(filters: ReportFilters) {
  const { subsidiaryId, category } = filters

  // Base query conditions
  const conditions = []

  if (subsidiaryId) {
    conditions.push(eq(products.subsidiaryId, subsidiaryId))
  }

  if (category) {
    conditions.push(eq(products.category, category))
  }

  // Get inventory summary
  const inventorySummary = await db
    .select({
      totalProducts: count(products.id),
      totalStock: sum(inventory.quantity),
      totalValue: sum(sql`${products.price} * ${inventory.quantity}`),
    })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .where(and(...conditions))

  // Get low stock items
  const lowStockItems = await db
    .select({
      productId: products.id,
      productName: products.name,
      currentStock: inventory.quantity,
      reorderLevel: inventory.reorderLevel,
    })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .where(and(...conditions, lte(inventory.quantity, inventory.reorderLevel)))
    .orderBy(asc(inventory.quantity))
    .limit(20)

  // Get inventory by category
  const inventoryByCategory = await db
    .select({
      category: products.category,
      totalItems: count(products.id),
      totalStock: sum(inventory.quantity),
      totalValue: sum(sql`${products.price} * ${inventory.quantity}`),
    })
    .from(inventory)
    .innerJoin(products, eq(inventory.productId, products.id))
    .where(and(...conditions))
    .groupBy(products.category)
    .orderBy(desc(sum(inventory.quantity)))

  return {
    summary: {
      totalProducts: inventorySummary[0].totalProducts,
      totalStock: inventorySummary[0].totalStock || 0,
      totalValue: formatPrice(Number(inventorySummary[0].totalValue) || 0),
    },
    lowStockItems: lowStockItems.map((item) => ({
      id: item.productId,
      name: item.productName,
      currentStock: item.currentStock,
      reorderLevel: item.reorderLevel,
      status: item.currentStock === 0 ? "Out of Stock" : "Low Stock",
    })),
    inventoryByCategory: inventoryByCategory.map((item) => ({
      category: item.category,
      totalItems: item.totalItems,
      totalStock: item.totalStock || 0,
      totalValue: formatPrice(Number(item.totalValue) || 0),
    })),
  }
}

// Additional report generation functions would be implemented similarly
