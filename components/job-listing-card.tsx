import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JobListingCardProps {
  title: string
  location: string
  type: string
  subsidiary: string
  slug: string
}

export function JobListingCard({ title, location, type, subsidiary, slug }: JobListingCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{subsidiary}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{type}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link href={`/careers/${slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

