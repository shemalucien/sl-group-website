import { notFound } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getOrderById } from "@/actions/orders"
import { formatPrice } from "@/lib/utils"

interface OrderConfirmationPageProps {
  params: {
    id: string
  }
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const order = await getOrderById(params.id)

  if (!order) {
    notFound()
  }

  const items = JSON.parse(order.items as string)

  return (
    <main className="flex-1">
      <div className="container px-4 md:px-6 py-6 md:py-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed</h1>
            <p className="text-muted-foreground mt-2">
              Thank you for your order! Your order number is <span className="font-medium">{order.id}</span>
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Items</h3>
                <div className="space-y-3">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p>{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice((item.product.price || 0) * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-muted-foreground">{order.shippingAddress as string}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-muted-foreground capitalize">{order.paymentMethod}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(order.tax)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/dashboard">View in Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/portfolio/liquor/shop">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
