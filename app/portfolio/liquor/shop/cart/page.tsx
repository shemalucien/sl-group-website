import { getCart } from "@/actions/cart"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function CartPage() {
  const cart = await getCart()
  const isEmpty = cart.length === 0

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

