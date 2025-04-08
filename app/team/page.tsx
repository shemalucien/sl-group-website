import type { Metadata } from "next"
import { TeamMemberCard } from "@/components/team-member-card"
import { getTeamMembers } from "@/lib/data"

export const metadata: Metadata = {
  title: "Our Team | SL Group",
  description:
    "Meet the talented professionals behind SL Group who are dedicated to delivering exceptional service and innovative solutions.",
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  return (
    <main className="min-h-screen">
      <section className="bg-muted py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 text-center">Our Team</h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">
            Meet the talented professionals behind SL Group who are dedicated to delivering exceptional service and
            innovative solutions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  id={String(member.id)}
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
          ) : (
            <div className="text-center py-12">
              <p>No team members found.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
