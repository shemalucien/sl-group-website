import { db } from "@/db"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Filter } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { category, sort, price } = searchParams

  // Fetch products with filters
  const allProducts = await db.query.products.findMany({
    where: (products, { eq, and, gte, lte, inArray }) => {
      const conditions = [eq(products.isActive, true)]

      if (category && category !== "all") {
        conditions.push(eq(products.category, category as string))
      }

      if (price) {
        const [min, max] = (price as string).split("-").map(Number)
        if (min) conditions.push(gte(products.price, min * 100))
        if (max) conditions.push(lte(products.price, max * 100))
      }

      return and(...conditions)
    },
    orderBy: (products, { asc, desc }) => {
      if (sort === "price-asc") return [asc(products.price)]
      if (sort === "price-desc") return [desc(products.price)]
      if (sort === "name-asc") return [asc(products.name)]
      if (sort === "name-desc") return [desc(products.name)]
      return [desc(products.createdAt)] // Default sort
    },
  })

  // Get unique categories for filters
  const categories = [...new Set(allProducts.map((product) => product.category))].filter(Boolean)

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                SL Liquor & Market Shop
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Browse our premium selection of wines, spirits, and gourmet products
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portfolio/liquor/shop/cart">
                <Button variant="secondary" className="bg-white text-red-800 hover:bg-white/90">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  View Cart
                </Button>
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 sm:hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:hidden">
                  <div className="py-4">
                    <ProductFilters categories={categories} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden sm:block w-full md:w-64 shrink-0">
              <div className="sticky top-20">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <ProductFilters categories={categories} />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Products</h2>
                <p className="text-muted-foreground">{allProducts.length} products</p>
              </div>

              {allProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters or check back later for new products.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

