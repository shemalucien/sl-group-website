"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { addToCart } from "@/actions/cart"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string | null
    price: number
    imageUrl: string | null
    category: string | null
    stock: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const result = await addToCart({
        productId: product.id,
        quantity: 1,
      })

      if (result.success) {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
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

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card">
      <Link href={`/portfolio/liquor/shop/product/${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <Image
            src={product.imageUrl || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/portfolio/liquor/shop/product/${product.id}`}>
          <h3 className="font-bold hover:underline">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold">{formatPrice(product.price)}</span>
          <div className="flex items-center">
            {product.stock > 0 ? (
              <Button size="sm" onClick={handleAddToCart} disabled={isAddingToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            ) : (
              <Button size="sm" disabled>
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

