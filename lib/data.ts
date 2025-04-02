import { db } from "@/db"
import { subsidiaries, testimonials } from "@/db/schema"
import { eq } from "drizzle-orm"
import { cache } from "react"

import * as dotenv from "dotenv";

dotenv.config();

// Use React's cache to avoid duplicate requests
export const getSubsidiaries = cache(async () => {
  try {
    const data = await db.query.subsidiaries.findMany({
      with: {
        services: true,
      },
    })

    return data
  } catch (error) {
    console.error("Error fetching subsidiaries:", error)
    return []
  }
})

export const getSubsidiaryBySlug = cache(async (slug: string) => {
  try {
    const data = await db.query.subsidiaries.findFirst({
      where: eq(subsidiaries.slug, slug),
      with: {
        services: true,
        testimonials: true,
      },
    })

    return data
  } catch (error) {
    console.error(`Error fetching subsidiary ${slug}:`, error)
    return null
  }
})

export const getTestimonials = cache(async (subsidiaryId?: number) => {
  try {
    if (subsidiaryId) {
      return await db.query.testimonials.findMany({
        where: eq(testimonials.subsidiaryId, subsidiaryId),
      })
    }

    // Get all testimonials if no subsidiaryId is provided
    return await db.query.testimonials.findMany({
      with: {
        subsidiary: true,
      },
    })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
})

