import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"

interface TeamMemberCardProps {
  id: string
  name: string
  position: string
  bio: string
  imageUrl: string
  email?: string
  linkedin?: string
  twitter?: string
  facebook?: string
  featured?: boolean
}

export function TeamMemberCard({
  id,
  name,
  position,
  bio,
  imageUrl,
  email,
  linkedin,
  twitter,
  facebook,
  featured = false,
}: TeamMemberCardProps) {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? "border-primary/20" : ""}`}
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={imageUrl || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(name)}`}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <Link href={`/team/${id}`} className="no-underline">
          <h3 className="text-xl font-bold mb-1 hover:text-primary transition-colors">{name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-3">{position}</p>
        <p className="text-sm line-clamp-3 mb-4">{bio}</p>

        <div className="flex space-x-3">
          {email && (
            <a
              href={`mailto:${email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail size={18} />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <Linkedin size={18} />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${name}'s Twitter profile`}
            >
              <Twitter size={18} />
            </a>
          )}
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${name}'s Facebook profile`}
            >
              <Facebook size={18} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
