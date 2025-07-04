import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ChevronLeft, Star } from "lucide-react"
import { formatPrice } from "@/lib/utils"

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const productId = Number.parseInt(params.id)

  if (isNaN(productId)) {
    notFound()
  }

  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  if (!product) {
    notFound()
  }

  // Fetch related products (same category)
  const relatedProducts = await db.query.products.findMany({
    where: (products, { eq, and, ne }) =>
      and(eq(products.category, product.category || ""), ne(products.id, productId), eq(products.isActive, true)),
    limit: 4,
  })

  return (
    <main className="flex-1">
      <div className="container px-4 md:px-6 py-6 md:py-12">
        <Link
          href="/portfolio/liquor/shop"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.imageUrl || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-xl font-bold mt-2 text-red-700">{formatPrice(product.price)}</p>

              {product.category && (
                <div className="mt-2">
                  <Link
                    href={`/portfolio/liquor/shop?category=${product.category}`}
                    className="inline-block bg-muted text-muted-foreground text-sm px-3 py-1 rounded-full hover:bg-muted/80"
                  >
                    {product.category}
                  </Link>
                </div>
              )}

              <div className="flex items-center mt-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">(12 reviews)</span>
              </div>
            </div>

            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-medium mr-2">Availability:</span>
                {product.stock && product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>

              <AddToCartButton product={{ ...product, stock: product.stock ?? 0 }} />

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Product Details:</h3>
                <ul className="space-y-1 text-sm">
                  <li>Category: {product.category || "Uncategorized"}</li>
                  <li>SKU: PROD-{product.id}</li>
                  <li>Shipping: 2-3 business days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group relative overflow-hidden rounded-lg border">
                  <Link href={`/portfolio/liquor/shop/product/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.imageUrl || "/placeholder.svg?height=300&width=300"}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{relatedProduct.name}</h3>
                      <p className="mt-1 font-bold text-red-700">{formatPrice(relatedProduct.price)}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

