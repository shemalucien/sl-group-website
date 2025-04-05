"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { createAppointment } from "@/actions/appointments"

const formSchema = z.object({
  date: z.date({
    required_error: "Please select a date for your appointment.",
  }),
  time: z.string({
    required_error: "Please select a time for your appointment.",
  }),
  appointmentType: z.string({
    required_error: "Please select the type of appointment.",
  }),
  purpose: z.string().min(10, {
    message: "Purpose must be at least 10 characters.",
  }),
})

const appointmentTypes = [
  { value: "wine-tasting", label: "Wine Tasting" },
  { value: "consultation", label: "Expert Consultation" },
  { value: "private-event", label: "Private Event" },
]

const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"]

export function AppointmentForm({ userId }: { userId: number }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // Combine date and time
      const dateTime = new Date(values.date)
      const [hours, minutes, period] = values.time.split(/:|\s/)
      let hour = Number.parseInt(hours)
      if (period === "PM" && hour !== 12) hour += 12
      if (period === "AM" && hour === 12) hour = 0
      dateTime.setHours(hour, Number.parseInt(minutes) || 0)

      const result = await createAppointment({
        userId,
        date: dateTime,
        purpose: `${values.appointmentType}: ${values.purpose}`,
      })

      if (result.success) {
        toast({
          title: "Appointment Scheduled",
          description: "Your appointment has been successfully scheduled.",
        })
        router.push("/dashboard/appointments")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to schedule appointment. Please try again.",
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
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => {
                        // Disable dates in the past and weekends
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const day = date.getDay()
                        return date < today || day === 0 || day === 6
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select a weekday for your appointment.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Choose a time slot for your appointment.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="appointmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select the type of appointment you'd like to schedule.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe the purpose of your appointment..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide details about what you'd like to discuss or experience during your appointment.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
        </Button>
      </form>
    </Form>
  )
}

