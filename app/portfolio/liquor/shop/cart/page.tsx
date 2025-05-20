import { getCart } from "@/actions/cart"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function CartPage() {
  const cart = await getCart()
  // Check if the cart is empty
  // If the cart is empty, show a message to the user
  // If the cart is not empty, show the cart items and summary

  const isEmpty = cart.length === 0

  const cartItems = cart.map((item) => ({
    id: item.productId,
    name: item.product,
    price: 100,
    quantity: item.quantity,
    imageUrl: "",
  }))
  const cartTotal = cart.reduce((total, item) => total + 10 * item.quantity, 0)
  const cartSummary = {
    items: cartItems,
    total: cartTotal,
  }
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)
  const cartId = cart[0]?.productId || "cart-12345" // Replace with actual cart ID logic
  const cartData = {
    id: cartId,
    items: cartItems,
    total: cartTotal,
    count: cartCount,
  }
  // Check if the cart is empty
  // If the cart is empty, show a message to the user
  // If the cart is not empty, show the cart items and summary
  // const isEmpty = cart.length === 0
  // const cartItems = cart.map((item) => ({

  return (
    <main className="flex-1">
      <div className="container px-4 md:px-6 py-6 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Cart</h1>
          <Link href="/portfolio/liquor/shop">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link href="/portfolio/liquor/shop">
              <Button>Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <CartItems cart={cart} />
            </div>
            <div>
              <CartSummary cart={cart} />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

