import Link from "next/link"
import { TeamMemberCard } from "@/components/team-member-card"
import { Button } from "@/components/ui/button"
import { getTeamMembers,getSubsidiaries } from "@/lib/data"
import { TeamFilters } from "./team-filters"
import { Suspense } from "react"
import { TeamMembersWrapper } from "./team-members-wrapper"
import { ArrowRight } from "lucide-react"

export async function TeamSection() {
  // Fetch featured team members (limit to 3)
  //const teamMembers = await getTeamMembers({ featured: true, limit: 3 })
  const teamMembers = await getTeamMembers(3)

  const subsidiaries = await getSubsidiaries()

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our talented team of professionals is dedicated to providing exceptional service and innovative solutions.
          </p>
        </div>

        <TeamFilters
        subsidiaries={subsidiaries.map((subsidiary) => ({
        id: subsidiary.id,
        name: subsidiary.name,
        slug: subsidiary.slug ?? "",
        isActive: subsidiary.isActive ?? false,
        }))}
        /> 

<Suspense fallback={<div className="text-center py-12">Loading team members...</div>}>
          {/* <TeamMembersWrapper /> */}
        </Suspense>

        {teamMembers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  position={member.position}
                  bio={member.bio ?? ""}
                  imageUrl={member.imageUrl ?? ""}
                  email={member.email ?? ""}
                  linkedin={member.linkedin ?? ""}
                  twitter={member.twitter ?? ""}
                  facebook={member.facebook ?? ""}
                  featured={member.featured ?? false}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/team">
                <Button >
                  View All Team Members <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p>No team members found.</p>
          </div>
        )}
      </div>
    </section>
  )
}

// import { Suspense } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { TeamFilters } from "@/components/team-filters"
// import { TeamMembersWrapper } from "@/components/team-members-wrapper"
// import { getSubsidiaries } from "@/lib/data"

// export async function TeamSection() {
//   const subsidiaries = await getSubsidiaries()

//   return (
//     <section className="py-16 bg-muted/30">
//       <div className="container">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
//           <p className="text-muted-foreground max-w-2xl mx-auto">
//             Our talented team of professionals is dedicated to providing exceptional service and innovative solutions.
//           </p>
//         </div>

//         <TeamFilters
//           subsidiaries={subsidiaries.map((subsidiary) => ({
//             id: subsidiary.id,
//             name: subsidiary.name,
//             slug: subsidiary.slug ?? "",
//             isActive: subsidiary.isActive ?? false,
//           }))}
//         />

//         <Suspense fallback={<div className="text-center py-12">Loading team members...</div>}>
//           <TeamMembersWrapper />
//         </Suspense>

//         <div className="mt-12 text-center">
//           <Link href="/team">
//             <Button variant="outline" size="lg">
//               View All Team Members
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }
