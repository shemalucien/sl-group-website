import { redirect } from "next/navigation"
import { getCart } from "@/actions/cart"
import { getCurrentUser } from "@/lib/auth"
import { CheckoutForm } from "@/components/checkout-form"
import { OrderSummary } from "@/components/order-summary"

export default async function CheckoutPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/portfolio/liquor/shop/checkout")
  }

  const cart = await getCart()

  if (cart.length === 0) {
    redirect("/portfolio/liquor/shop/cart")
  }

  return (
    <main className="flex-1">
      <div className="container px-4 md:px-6 py-6 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <CheckoutForm user={user} />
          </div>
          <div>
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </main>
  )
}

