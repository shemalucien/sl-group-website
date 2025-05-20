import { getUserById } from "@/actions/user"
import UserEditForm from "@/components/UserEditForm"

type Params = {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: Params) {
  const userId = Number(params.id)
  const user = await getUserById(userId)

  console.log("User data on edit:", user)

  if (!user) {
    return <div className="p-6">User not found</div>
  }

  // Only pass non-sensitive data to client
  const { id, firstName, lastName, email, role } = user

  console.log("User data to pass to form:", { id, firstName, lastName, email, role })

  return (
    <UserEditForm
      user={{ id, firstName, lastName, email, role }}
    />
  )
}
