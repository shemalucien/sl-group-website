import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Facebook, Twitter, Linkedin, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getTeamMemberById } from "@/lib/data"

interface TeamMemberPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const teamMember = await getTeamMemberById(Number(params.id))

  if (!teamMember) {
    return {
      title: "Team Member Not Found | SL Group",
    }
  }

  return {
    title: `${teamMember.name} | SL Group Team`,
    description: `Learn more about ${teamMember.name}, ${teamMember.position} at SL Group.`,
  }
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const teamMember = await getTeamMemberById(Number(params.id))

  if (!teamMember) {
    notFound()
  }

  return (
    <main className="min-h-screen py-16">
      <div className="container">
        <Link href="/team" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Team
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-6">
                <Image
                  src={
                    teamMember.imageUrl ||
                    `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(teamMember.name)}`
                  }
                  alt={teamMember.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <h1 className="text-2xl font-bold mb-1">{teamMember.name}</h1>
              <p className="text-muted-foreground mb-4">{teamMember.position}</p>

              <div className="flex space-x-4 mb-6">
                {teamMember.email && (
                  <a
                    href={`mailto:${teamMember.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`Email ${teamMember.name}`}
                  >
                    <Mail size={20} />
                  </a>
                )}
                {teamMember.linkedin && (
                  <a
                    href={teamMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${teamMember.name}'s LinkedIn profile`}
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {teamMember.twitter && (
                  <a
                    href={teamMember.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${teamMember.name}'s Twitter profile`}
                  >
                    <Twitter size={20} />
                  </a>
                )}
                {teamMember.facebook && (
                  <a
                    href={teamMember.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${teamMember.name}'s Facebook profile`}
                  >
                    <Facebook size={20} />
                  </a>
                )}
              </div>

              {teamMember.email && (
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact {teamMember.name.split(" ")[0]}
                </Button>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About {teamMember.name}</h2>
                <div className="prose max-w-none">
                  {teamMember.bio &&
                    teamMember.bio.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>

                {teamMember.expertise && (
                  <>
                    <h3 className="text-lg font-semibold mt-8 mb-3">Areas of Expertise</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {teamMember.expertise.split(",").map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                    </ul>
                  </>
                )}

                {teamMember.education && (
                  <>
                    <h3 className="text-lg font-semibold mt-8 mb-3">Education</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {teamMember.education.split(",").map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
