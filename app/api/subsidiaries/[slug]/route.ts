import { db } from "@/db"
import { subsidiaries } from "@/db/schema"
import { eq } from "drizzle-orm"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    const subsidiary = await db.query.subsidiaries.findFirst({
      where: eq(subsidiaries.slug, slug),
      with: {
        services: true,
        testimonials: true,
      },
    })

    if (!subsidiary) {
      return NextResponse.json({ error: "Subsidiary not found" }, { status: 404 })
    }

    return NextResponse.json(subsidiary)
  } catch (error) {
    console.error(`Error fetching subsidiary ${params.slug}:`, error)
    return NextResponse.json({ error: "Failed to fetch subsidiary" }, { status: 500 })
  }
}

