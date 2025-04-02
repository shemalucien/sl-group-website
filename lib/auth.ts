import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const requireAuth = () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return userId
}

export const requireAdmin = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // Here you would typically check if the user has admin privileges
  // For now, we'll just return the userId
  // In a real application, you might want to check against a database or Clerk metadata

  return userId
}

