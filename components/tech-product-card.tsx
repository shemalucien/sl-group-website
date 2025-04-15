"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { addToCart } from "@/actions/cart"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TechProductCardProps {
  product: {
    id: number
    name: string
    description: string | null
    price: number
    imageUrl: string | null
    category: string | null
    stock: number
    isNew?: boolean
    rating?: number
  }
}

export function TechProductCard({ product }: TechProductCardProps) {
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
      <Link href={`/portfolio/tech-store/shop/product/${product.id}`}>
        <div className="aspect-square overflow-hidden relative">
          <Image
            src={product.imageUrl || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.isNew && (
            <Badge className="absolute top-2 right-2 bg-green-600">New</Badge>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/portfolio/tech-store/shop/product/${product.id}`}>
          <h3 className="font-bold hover:underline">{product.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        
        {product.rating && (
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < (product.rating ?? 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-2 flex justify-between items-center">
          <span className="font-bold text-green-600">{formatPrice(product.price)}</span>
          <div className="flex items-center">
            {product.stock > 0 ? (
              <Button 
                size="sm" 
                onClick={handleAddToCart} 
                disabled={isAddingToCart}
                className="bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            ) : (
              <Button size="sm" disabled className="bg-gray-400">
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}