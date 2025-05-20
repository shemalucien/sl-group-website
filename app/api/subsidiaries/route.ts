import { db } from "@/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const allSubsidiaries = await db.query.subsidiaries.findMany({
      with: {
        services: true,
      },
    })

    return NextResponse.json(allSubsidiaries)
  } catch (error) {
    console.error("Error fetching subsidiaries:", error)
    return NextResponse.json({ error: "Failed to fetch subsidiaries" }, { status: 500 })
  }
}

