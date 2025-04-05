"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { updateProductStock } from "@/actions/inventory"

interface UpdateStockButtonProps {
  productId: number
  currentStock: number
}

export function UpdateStockButton({ productId, currentStock }: UpdateStockButtonProps) {
  const [open, setOpen] = useState(false)
  const [stock, setStock] = useState(currentStock)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateStock = async () => {
    setIsUpdating(true)
    try {
      const result = await updateProductStock({
        productId,
        stock,
      })

      if (result.success) {
        toast({
          title: "Stock updated",
          description: "The product stock has been updated successfully.",
        })
        setOpen(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update stock.",
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
      setIsUpdating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
          <DialogDescription>Update the current stock level for this product.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stock" className="text-right">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(Number.parseInt(e.target.value) || 0)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateStock} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Stock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

