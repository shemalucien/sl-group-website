import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { ProfileForm } from "@/components/dashboard/profile-form"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/dashboard/profile")
  }

  return (
    <main className="flex-1">
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <ProfileForm user={user} />
      </div>
    </main>
  )
}

