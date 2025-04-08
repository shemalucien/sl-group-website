"use client"

import { useSearchParams } from "next/navigation"
import { TeamMembersList } from "@/components/team-members-list"

export function TeamMembersWrapper() {
  const searchParams = useSearchParams()

  const role = searchParams.get("role") || "all"
  const subsidiary = searchParams.get("subsidiary") || "all"

  console.log("Role:", role)
    console.log("Subsidiary:", subsidiary)

  return <TeamMembersList searchParams={{ role, subsidiary }} />
    // return (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //     <h1 className="text-4xl font-bold mb-4 text-center">Our Team</h1>
    //     <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
    //       Meet the talented professionals behind SL Group who are dedicated to delivering exceptional service and
    //       innovative solutions.
    //       {role && <span> - Role: {role}</span>}
    //       {subsidiary && <span> - Subsidiary: {subsidiary}</span>}
    //     </p>
        
    //     </div>
    // )

}
