import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Read the manifest file from the public directory
    const manifestPath = path.join(process.cwd(), "public", "manifest.json")
    const manifestContent = fs.readFileSync(manifestPath, "utf8")
    const manifest = JSON.parse(manifestContent)

    // Return the manifest with the correct content type
    return NextResponse.json(manifest, {
      headers: {
        "Content-Type": "application/manifest+json",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    })
  } catch (error) {
    console.error("Error serving manifest:", error)
    return NextResponse.json({ error: "Failed to serve manifest" }, { status: 500 })
  }
}
