"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { processPayment } from "@/actions/payments"
import { toast } from "@/components/ui/use-toast"
import { formatPrice } from "@/lib/utils"

const paymentSchema = z.object({
  paymentMethod: z.enum(["credit_card", "momo", "cash"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  momoNumber: z.string().optional(),
})

interface PaymentFormProps {
  amount: number
  relatedId: number
  relatedType: string
  onSuccess?: () => void
  onCancel?: () => void
}

export function PaymentForm({ amount, relatedId, relatedType, onSuccess, onCancel }: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "credit_card",
    },
  })

  const paymentMethod = form.watch("paymentMethod")

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    setIsSubmitting(true)

    try {
      const result = await processPayment({
        amount,
        method: values.paymentMethod,
        relatedId,
        relatedType,
        metadata: {
          ...(values.paymentMethod === "credit_card" && {
            cardNumber: values.cardNumber,
            cardExpiry: values.cardExpiry,
          }),
          ...(values.paymentMethod === "momo" && {
            momoNumber: values.momoNumber,
          }),
        },
      })

      if (result.success) {
        toast({
          title: "Payment successful",
          description: "Your payment has been processed successfully.",
        })

        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast({
          title: "Payment failed",
          description: result.message || "There was an error processing your payment.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Complete your payment of {formatPrice(amount)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="credit_card" />
                        </FormControl>
                        <FormLabel className="font-normal">Credit Card</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="momo" />
                        </FormControl>
                        <FormLabel className="font-normal">Mobile Money</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {paymentMethod === "credit_card" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="4242 4242 4242 4242" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="cardExpiry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardCvc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {paymentMethod === "momo" && (
              <FormField
                control={form.control}
                name="momoNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Money Number</FormLabel>
                    <FormControl>
                      <Input placeholder="07XXXXXXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end space-x-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : `Pay ${formatPrice(amount)}`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

