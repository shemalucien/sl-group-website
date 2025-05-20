"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import type { CartItem } from "@/actions/cart"
import { formatPrice } from "@/lib/utils"
import { getCurrentUser } from "@/lib/auth"

interface CartSummaryProps {
  cart: CartItem[]
}

export function CartSummary({ cart }: CartSummaryProps) {
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)

  // Calculate shipping (free over $100)
  const shipping = subtotal >= 10000 ? 0 : 995

  // Calculate tax (8.25%)
  const tax = Math.round(subtotal * 0.0825)

  // Calculate total
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      // Check if user is logged in
      const user = await getCurrentUser()

      if (!user) {
        // Redirect to login page with return URL
        router.push(`/auth/login?callbackUrl=${encodeURIComponent("/portfolio/liquor/shop/checkout")}`)
        return
      }

      // Redirect to checkout page
      router.push("/portfolio/liquor/shop/checkout")
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleCheckout} disabled={isCheckingOut || cart.length === 0}>
          {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </CardFooter>
    </Card>
  )
}

