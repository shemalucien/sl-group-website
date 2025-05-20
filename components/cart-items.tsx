"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { updateCartItemQuantity, removeFromCart, type CartItem } from "@/actions/cart"
import { formatPrice } from "@/lib/utils"

interface CartItemsProps {
  cart: CartItem[]
}

export function CartItems({ cart }: CartItemsProps) {
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null)
  const [removingItemId, setRemovingItemId] = useState<number | null>(null)

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    setUpdatingItemId(productId)
    try {
      const result = await updateCartItemQuantity({ productId, quantity })

      if (!result.success) {
        toast({
          title: "Error",
          description: result.message || "Failed to update quantity.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUpdatingItemId(null)
    }
  }

  const handleRemoveItem = async (productId: number) => {
    setRemovingItemId(productId)
    try {
      const result = await removeFromCart(productId)

      if (result.success) {
        toast({
          title: "Item removed",
          description: "The item has been removed from your cart.",
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to remove item.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setRemovingItemId(null)
    }
  }

  return (
    <div className="space-y-6">
      {cart.map((item) => (
        <div key={item.productId} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-6">
          {/* Product Image */}
          <Link href={`/portfolio/liquor/shop/product/${item.productId}`} className="shrink-0">
            <div className="relative aspect-square w-24 h-24 overflow-hidden rounded-md border">
              <Image
                src={item.product?.imageUrl || "/placeholder.svg?height=96&width=96"}
                alt={item.product?.name || "Product"}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          {/* Product Details */}
          <div className="flex-1 space-y-1">
            <Link href={`/portfolio/liquor/shop/product/${item.productId}`} className="font-medium hover:underline">
              {item.product?.name}
            </Link>
            <p className="text-sm text-muted-foreground">{formatPrice(item.product?.price || 0)}</p>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
              disabled={updatingItemId === item.productId || removingItemId === item.productId || item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              min="1"
              max={item.product?.stock || 1}
              value={item.quantity}
              onChange={(e) => {
                const value = Number.parseInt(e.target.value)
                if (!isNaN(value) && value >= 1) {
                  handleUpdateQuantity(item.productId, value)
                }
              }}
              className="h-8 w-12 mx-2 text-center"
              disabled={updatingItemId === item.productId || removingItemId === item.productId}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
              disabled={
                updatingItemId === item.productId ||
                removingItemId === item.productId ||
                item.quantity >= (item.product?.stock || 1)
              }
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="font-medium">{formatPrice((item.product?.price || 0) * item.quantity)}</p>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => handleRemoveItem(item.productId)}
            disabled={updatingItemId === item.productId || removingItemId === item.productId}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}

