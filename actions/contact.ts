"use server"

import { db } from "@/db"
import { contactSubmissions } from "@/db/schema"
import { z } from "zod"

// Define the schema for contact form validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export async function submitContactForm(values: ContactFormValues) {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(values)

    // Insert the data into the database
    await db.insert(contactSubmissions).values({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || null,
      company: validatedData.company || null,
      interest: validatedData.interest || null,
      message: validatedData.message,
    })

    // Return success
    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Error submitting contact form:", error)

    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: "Validation failed",
        errors: error.errors,
      }
    }

    // Return generic error
    return { success: false, message: "Failed to submit your message. Please try again later." }
  }
}

