"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

interface ProductFiltersProps {
  categories: (string | null)[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "all")

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])

  const [sort, setSort] = useState<string>(searchParams.get("sort") || "newest")

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (selectedCategory === "all") {
      params.delete("category")
    } else {
      params.set("category", selectedCategory)
    }

    if (priceRange[0] === 0 && priceRange[1] === 500) {
      params.delete("price")
    } else {
      params.set("price", `${priceRange[0]}-${priceRange[1]}`)
    }

    if (sort === "newest") {
      params.delete("sort")
    } else {
      params.set("sort", sort)
    }

    router.push(`/portfolio/liquor/shop?${params.toString()}`)
  }, [selectedCategory, priceRange, sort, router, searchParams])

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="category-all"
              checked={selectedCategory === "all"}
              onCheckedChange={() => setSelectedCategory("all")}
            />
            <Label htmlFor="category-all">All Categories</Label>
          </div>
          {categories.map(
            (category) =>
              category && (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategory === category}
                    onCheckedChange={() => setSelectedCategory(category)}
                  />
                  <Label htmlFor={`category-${category}`}>{category}</Label>
                </div>
              ),
          )}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            min={0}
            max={500}
            step={10}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
          />
          <div className="flex items-center justify-between">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-medium mb-3">Sort By</h3>
        <RadioGroup defaultValue={sort} onValueChange={setSort}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="sort-newest" />
            <Label htmlFor="sort-newest">Newest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-asc" id="sort-price-asc" />
            <Label htmlFor="sort-price-asc">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-desc" id="sort-price-desc" />
            <Label htmlFor="sort-price-desc">Price: High to Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="name-asc" id="sort-name-asc" />
            <Label htmlFor="sort-name-asc">Name: A to Z</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="name-desc" id="sort-name-desc" />
            <Label htmlFor="sort-name-desc">Name: Z to A</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedCategory("all")
          setPriceRange([0, 500])
          setSort("newest")
        }}
      >
        Reset Filters
      </Button>
    </div>
  )
}

