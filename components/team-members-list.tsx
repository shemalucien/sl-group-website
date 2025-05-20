import { useSearchParams } from "next/navigation"
import { TeamMemberCard } from "@/components/team-member-card"
import { getFilteredTeamMembers, getTeamMembers } from "@/lib/data"

interface TeamMembersListProps {
  searchParams?: {
    role?: string
    subsidiary?: string
  }
}

export async function TeamMembersList({ searchParams }: TeamMembersListProps) {
  const role = searchParams?.role || "all"
  const subsidiary = searchParams?.subsidiary || "all"
    console.log("Role:", role)
    console.log("Subsidiary:", subsidiary)

    // const teamMembers = await getTeamMembers(3)

//    // Get filtered team members
//    const teamMembers = await getFilteredTeamMembers({
//     isLeadership: role === "leadership" ? true : undefined,
//     subsidiarySlug: subsidiary !== "all" ? subsidiary : undefined,
//     limit: 3, // Show only 3 on homepage
//   });
  
//   console.log("Filtered Team Members:", teamMembers);

//   if (teamMembers.length === 0) {
//     return (
//       <div className="text-center py-8">
//         <p>No team members found with the selected filters.</p>
//       </div>
//     )
//   }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Our Team</h1>
      {/* {teamMembers.map((member) => (
        <TeamMemberCard
          key={member.id}
          id={member.id}
          name={member.name}
          position={member.position}
          bio={member.bio ? member.bio : ""}
          imageUrl={member.imageUrl || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(member.name)}`}
          email={member.email || ""}
          linkedin={member.linkedin || ""}
          twitter={member.twitter || ""}
          facebook={member.facebook || ""}
          featured={member.featured || false}
          subsidiaryName={member.subsidiary?.name}
        />
      ))} */}
    </div>
  )
}
