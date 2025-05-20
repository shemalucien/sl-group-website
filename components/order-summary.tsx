
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "@/actions/cart"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"

interface OrderSummaryProps {
  cart: CartItem[]
  storeType?: "liquor" | "tech"
}

export function OrderSummary({ cart, storeType = "liquor" }: OrderSummaryProps) {
  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)

  // Calculate shipping (free over $100 for liquor, $200 for tech)
  const shippingThreshold = storeType === "tech" ? 20000 : 10000
  const shipping = subtotal >= shippingThreshold ? 0 : 995

  // Calculate tax (8.25%)
  const tax = Math.round(subtotal * 0.0825)

  // Calculate total
  const total = subtotal + shipping + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                {item.product?.imageUrl ? (
                  <Image
                    src={item.product.imageUrl || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-secondary">
                    <span className="text-sm text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{item.product?.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <div className="font-medium">{formatPrice((item.product?.price || 0) * item.quantity)}</div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>
    </Card>
  )
}