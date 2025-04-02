import { Star, StarHalf } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  position: string
  rating: number
  image?: string
}

export default function TestimonialCard({ quote, author, position, rating, image }: TestimonialCardProps) {
  // Generate star rating
  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-current text-yellow-500" />)
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-current text-yellow-500" />)
    }

    return stars
  }

  return (
    <div className="flex flex-col rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center space-x-1 mb-4">{renderStars()}</div>
      <blockquote className="text-muted-foreground mb-4 italic">"{quote}"</blockquote>
      <div className="mt-auto flex items-center">
        {image ? (
          <Image src={image || "/placeholder.svg"} alt={author} width={40} height={40} className="rounded-full mr-3" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <span className="text-primary font-medium">{author.charAt(0)}</span>
          </div>
        )}
        <div>
          <div className="font-medium">{author}</div>
          <div className="text-sm text-muted-foreground">{position}</div>
        </div>
      </div>
    </div>
  )
}

