"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { addToCart } from "@/actions/cart"

interface AddToCartButtonProps {
  product: {
    id: number
    name: string
    stock: number
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const result = await addToCart({
        productId: product.id,
        quantity,
      })

      if (result.success) {
        toast({
          title: "Added to cart",
          description: `${product.name} (${quantity}) has been added to your cart.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to add item to cart.",
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
      setIsAddingToCart(false)
    }
  }

  if (product.stock <= 0) {
    return (
      <Button disabled className="w-full">
        Out of Stock
      </Button>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={(e) => {
            const value = Number.parseInt(e.target.value)
            if (!isNaN(value) && value >= 1 && value <= product.stock) {
              setQuantity(value)
            }
          }}
          className="w-16 mx-2 text-center"
        />
        <Button variant="outline" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button className="w-full" onClick={handleAddToCart} disabled={isAddingToCart}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        {isAddingToCart ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  )
}

