// import Image from "next/image"
// import Link from "next/link"
// import { Card, CardContent } from "@/components/ui/card"
// import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"

// interface TeamMemberCardProps {
//   id: string
//   name: string
//   position: string
//   bio: string
//   imageUrl: string
//   email?: string
//   linkedin?: string
//   twitter?: string
//   facebook?: string
//   featured?: boolean
// }

// export function TeamMemberCard({
//   id,
//   name,
//   position,
//   bio,
//   imageUrl,
//   email,
//   linkedin,
//   twitter,
//   facebook,
//   featured = false,
// }: TeamMemberCardProps) {
//   return (
//     <Card
//       className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${featured ? "border-primary/20" : ""}`}
//     >
//       <div className="aspect-square relative overflow-hidden">
//         <Image
//           src={imageUrl || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(name)}`}
//           alt={name}
//           fill
//           className="object-cover transition-transform duration-300 hover:scale-105"
//         />
//       </div>
//       <CardContent className="p-4">
//         <Link href={`/team/${id}`} className="no-underline">
//           <h3 className="text-xl font-bold mb-1 hover:text-primary transition-colors">{name}</h3>
//         </Link>
//         <p className="text-sm text-muted-foreground mb-3">{position}</p>
//         <p className="text-sm line-clamp-3 mb-4">{bio}</p>

//         <div className="flex space-x-3">
//           {email && (
//             <a
//               href={`mailto:${email}`}
//               className="text-muted-foreground hover:text-primary transition-colors"
//               aria-label={`Email ${name}`}
//             >
//               <Mail size={18} />
//             </a>
//           )}
//           {linkedin && (
//             <a
//               href={linkedin}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-muted-foreground hover:text-primary transition-colors"
//               aria-label={`${name}'s LinkedIn profile`}
//             >
//               <Linkedin size={18} />
//             </a>
//           )}
//           {twitter && (
//             <a
//               href={twitter}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-muted-foreground hover:text-primary transition-colors"
//               aria-label={`${name}'s Twitter profile`}
//             >
//               <Twitter size={18} />
//             </a>
//           )}
//           {facebook && (
//             <a
//               href={facebook}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-muted-foreground hover:text-primary transition-colors"
//               aria-label={`${name}'s Facebook profile`}
//             >
//               <Facebook size={18} />
//             </a>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

import Image from "next/image"
import Link from "next/link"
import { Mail, Linkedin, Twitter, Facebook } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TeamMemberCardProps {
  id: number
  name: string
  position: string
  bio: string
  imageUrl: string
  email?: string
  linkedin?: string
  twitter?: string
  facebook?: string
  featured?: boolean
  subsidiaryName?: string
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
  featured,
  subsidiaryName,
}: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-64 w-full">
        <Image
          src={imageUrl || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(name)}`}
          alt={name}
          fill
          className="object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">Leadership</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-muted-foreground mb-3">{position}</p>
        {subsidiaryName && (
          <p className="text-sm text-muted-foreground mb-4">
            <Badge variant="outline" className="font-normal">
              {subsidiaryName}
            </Badge>
          </p>
        )}
        <p className="line-clamp-3 text-sm">{bio}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        <div className="flex space-x-2">
          {email && (
            <Link href={`mailto:${email}`} aria-label={`Email ${name}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mail className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {linkedin && (
            <Link href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn profile`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {twitter && (
            <Link href={twitter} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Twitter profile`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {facebook && (
            <Link href={facebook} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Facebook profile`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
        <Link href={`/team/${id}`}>
          <Button variant="outline" size="sm">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

