// "use server"

// import { cookies } from "next/headers"
// import { db } from "@/db"
// import { products } from "@/db/schema"
// import { eq } from "drizzle-orm"
// import { revalidatePath } from "next/cache"

// // Define cart item type
// export type CartItem = {
//   productId: number
//   quantity: number
//   product?: {
//     id: number
//     name: string
//     price: number
//     imageUrl: string | null
//     stock: number
//   }
// }

// // Get cart from cookies or create a new one
// export async function getCart(): Promise<CartItem[]> {
//   const cookieStore = cookies()
//   const cartCookie = cookieStore.get("cart")

//   if (!cartCookie) {
//     return []
//   }

//   try {
//     const cart = JSON.parse(cartCookie.value) as CartItem[]

//     // Fetch product details for each cart item
//     const cartWithProducts = await Promise.all(
//       cart.map(async (item) => {
//         const product = await db.query.products.findFirst({
//           where: eq(products.id, item.productId),
//         })

//         return {
//           ...item,
//           product: product || undefined,
//         }
//       }),
//     )

//     // Filter out items with deleted products
//     return cartWithProducts.filter((item) => item.product)
//   } catch (error) {
//     console.error("Failed to parse cart cookie:", error)
//     return []
//   }
// }

// // Add item to cart
// export async function addToCart({
//   productId,
//   quantity,
// }: {
//   productId: number
//   quantity: number
// }) {
//   try {
//     // Check if product exists and has enough stock
//     const product = await db.query.products.findFirst({
//       where: eq(products.id, productId),
//     })

//     if (!product) {
//       return { success: false, message: "Product not found" }
//     }

//     if (product.stock < quantity) {
//       return { success: false, message: "Not enough stock available" }
//     }

//     const cookieStore = cookies()
//     const cartCookie = cookieStore.get("cart")

//     let cart: CartItem[] = []

//     if (cartCookie) {
//       try {
//         cart = JSON.parse(cartCookie.value)
//       } catch (error) {
//         console.error("Failed to parse cart cookie:", error)
//       }
//     }

//     // Check if product is already in cart
//     const existingItemIndex = cart.findIndex((item) => item.productId === productId)

//     if (existingItemIndex !== -1) {
//       // Update quantity if product is already in cart
//       cart[existingItemIndex].quantity += quantity

//       // Check if new quantity exceeds stock
//       if (cart[existingItemIndex].quantity > product.stock) {
//         cart[existingItemIndex].quantity = product.stock
//       }
//     } else {
//       // Add new item to cart
//       cart.push({ productId, quantity })
//     }

//     // Save cart to cookie
//     cookieStore.set("cart", JSON.stringify(cart), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 60 * 60 * 24 * 7, // 1 week
//       path: "/",
//     })

//     revalidatePath("/portfolio/liquor/shop/cart")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to add item to cart:", error)
//     return { success: false, message: "Failed to add item to cart" }
//   }
// }

// // Update cart item quantity
// export async function updateCartItemQuantity({
//   productId,
//   quantity,
// }: {
//   productId: number
//   quantity: number
// }) {
//   try {
//     if (quantity < 1) {
//       return { success: false, message: "Quantity must be at least 1" }
//     }

//     // Check if product exists and has enough stock
//     const product = await db.query.products.findFirst({
//       where: eq(products.id, productId),
//     })

//     if (!product) {
//       return { success: false, message: "Product not found" }
//     }

//     if (product.stock < quantity) {
//       return { success: false, message: "Not enough stock available" }
//     }

//     const cookieStore = cookies()
//     const cartCookie = cookieStore.get("cart")

//     if (!cartCookie) {
//       return { success: false, message: "Cart is empty" }
//     }

//     let cart: CartItem[] = []

//     try {
//       cart = JSON.parse(cartCookie.value)
//     } catch (error) {
//       console.error("Failed to parse cart cookie:", error)
//       return { success: false, message: "Failed to update cart" }
//     }

//     // Find item in cart
//     const existingItemIndex = cart.findIndex((item) => item.productId === productId)

//     if (existingItemIndex === -1) {
//       return { success: false, message: "Item not found in cart" }
//     }

//     // Update quantity
//     cart[existingItemIndex].quantity = quantity

//     // Save cart to cookie
//     cookieStore.set("cart", JSON.stringify(cart), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 60 * 60 * 24 * 7, // 1 week
//       path: "/",
//     })

//     revalidatePath("/portfolio/liquor/shop/cart")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to update cart item:", error)
//     return { success: false, message: "Failed to update cart item" }
//   }
// }

// // Remove item from cart
// export async function removeFromCart(productId: number) {
//   try {
//     const cookieStore = cookies()
//     const cartCookie = cookieStore.get("cart")

//     if (!cartCookie) {
//       return { success: false, message: "Cart is empty" }
//     }

//     let cart: CartItem[] = []

//     try {
//       cart = JSON.parse(cartCookie.value)
//     } catch (error) {
//       console.error("Failed to parse cart cookie:", error)
//       return { success: false, message: "Failed to remove item from cart" }
//     }

//     // Remove item from cart
//     cart = cart.filter((item) => item.productId !== productId)

//     // Save cart to cookie
//     cookieStore.set("cart", JSON.stringify(cart), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 60 * 60 * 24 * 7, // 1 week
//       path: "/",
//     })

//     revalidatePath("/portfolio/liquor/shop/cart")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to remove item from cart:", error)
//     return { success: false, message: "Failed to remove item from cart" }
//   }
// }

// // Clear cart
// export async function clearCart() {
//   try {
//     const cookieStore = cookies()

//     cookieStore.set("cart", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       maxAge: 0, // Expire immediately
//       path: "/",
//     })

//     revalidatePath("/portfolio/liquor/shop/cart")
//     return { success: true }
//   } catch (error) {
//     console.error("Failed to clear cart:", error)
//     return { success: false, message: "Failed to clear cart" }
//   }
// }


"use server"

import { cookies } from "next/headers"
import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// Define cart item type
export type CartItem = {
  productId: number
  quantity: number
  product?: {
    id: number
    name: string
    price: number
    imageUrl: string | null
    stock: number
    subsidiaryId: number
    category: string | null
  }
}

// Get cart from cookies or create a new one
export async function getCart(): Promise<CartItem[]> {
  const cookieStore = await cookies()
  const cartCookie = cookieStore.get("cart")

  if (!cartCookie) {
    return []
  }

  try {
    const cart = JSON.parse(cartCookie.value) as CartItem[]

    // Fetch product details for each cart item
    const cartWithProducts = await Promise.all(
      cart.map(async (item) => {
        const product = await db.query.products.findFirst({
          where: eq(products.id, item.productId),
        })

        return {
          ...item,
          product: product && product.stock !== null ? {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            stock: product.stock,
            subsidiaryId: product.subsidiaryId || 0,
            category: product.category,
          } : undefined,
        }
      }),
    )

    // Filter out items with deleted products
      return cartWithProducts.filter((item) => item.product)
  } catch (error) {
    console.error("Failed to parse cart cookie:", error)
    return []
  }
}

// Add item to cart
export async function addToCart({
  productId,
  quantity,
}: {
  productId: number
  quantity: number
}) {
  try {
    // Check if product exists and has enough stock
    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    })

    if (!product) {
      return { success: false, message: "Product not found" }
    }

    if (product.stock === null || product.stock < quantity) {
      return { success: false, message: "Not enough stock available" }
    }

    const cookieStore = await cookies()
    const cartCookie = cookieStore.get("cart")

    let cart: CartItem[] = []

    if (cartCookie) {
      try {
        cart = JSON.parse(cartCookie.value)
      } catch (error) {
        console.error("Failed to parse cart cookie:", error)
      }
    }

    // Check if product is already in cart
    const existingItemIndex = cart.findIndex((item) => item.productId === productId)

    if (existingItemIndex !== -1) {
      // Update quantity if product is already in cart
      cart[existingItemIndex].quantity += quantity

      // Check if new quantity exceeds stock
      if (cart[existingItemIndex].quantity > product.stock) {
        cart[existingItemIndex].quantity = product.stock
      }
    } else {
      // Add new item to cart
      cart.push({ productId, quantity })
    }

    // Save cart to cookie
    cookieStore.set("cart", JSON.stringify(cart), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Revalidate both store cart paths to ensure UI updates
    revalidatePath("/portfolio/liquor/shop/cart")
    revalidatePath("/portfolio/tech-store/shop/cart")
    
    return { success: true }
  } catch (error) {
    console.error("Failed to add item to cart:", error)
    return { success: false, message: "Failed to add item to cart" }
  }
}

// Update cart item quantity
export async function updateCartItemQuantity({
  productId,
  quantity,
}: {
  productId: number
  quantity: number
}) {
  try {
    if (quantity < 1) {
      return { success: false, message: "Quantity must be at least 1" }
    }

    // Check if product exists and has enough stock
    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    })

    if (!product) {
      return { success: false, message: "Product not found" }
    }

    if (product.stock === null || product.stock < quantity) {
      return { success: false, message: "Not enough stock available" }
    }

    const cookieStore = await cookies()
    const cartCookie = cookieStore.get("cart")

    if (!cartCookie) {
      return { success: false, message: "Cart is empty" }
    }

    let cart: CartItem[] = []

    try {
      cart = JSON.parse(cartCookie.value)
    } catch (error) {
      console.error("Failed to parse cart cookie:", error)
      return { success: false, message: "Failed to update cart" }
    }

    // Find item in cart
    const existingItemIndex = cart.findIndex((item) => item.productId === productId)

    if (existingItemIndex === -1) {
      return { success: false, message: "Item not found in cart" }
    }

    // Update quantity
    cart[existingItemIndex].quantity = quantity

    // Save cart to cookie
    cookieStore.set("cart", JSON.stringify(cart), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Revalidate both store cart paths
    revalidatePath("/portfolio/liquor/shop/cart")
    revalidatePath("/portfolio/tech-store/shop/cart")
    
    return { success: true }
  } catch (error) {
    console.error("Failed to update cart item:", error)
    return { success: false, message: "Failed to update cart item" }
  }
}

// Remove item from cart
export async function removeFromCart(productId: number) {
  try {
    const cookieStore = await cookies()
    const cartCookie = cookieStore.get("cart")

    if (!cartCookie) {
      return { success: false, message: "Cart is empty" }
    }

    let cart: CartItem[] = []

    try {
      cart = JSON.parse(cartCookie.value)
    } catch (error) {
      console.error("Failed to parse cart cookie:", error)
      return { success: false, message: "Failed to remove item from cart" }
    }

    // Remove item from cart
    cart = cart.filter((item) => item.productId !== productId)

    // Save cart to cookie
    cookieStore.set("cart", JSON.stringify(cart), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Revalidate both store cart paths
    revalidatePath("/portfolio/liquor/shop/cart")
    revalidatePath("/portfolio/tech-store/shop/cart")
    
    return { success: true }
  } catch (error) {
    console.error("Failed to remove item from cart:", error)
    return { success: false, message: "Failed to remove item from cart" }
  }
}

// Clear cart
export async function clearCart() {
  try {
    const cookieStore = await cookies()

    cookieStore.set("cart", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
      path: "/",
    })

    // Revalidate both store cart paths
    revalidatePath("/portfolio/liquor/shop/cart")
    revalidatePath("/portfolio/tech-store/shop/cart")
    
    return { success: true }
  } catch (error) {
    console.error("Failed to clear cart:", error)
    return { success: false, message: "Failed to clear cart" }
  }
}
