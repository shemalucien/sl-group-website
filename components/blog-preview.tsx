import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface BlogPreviewProps {
  title: string
  excerpt: string
  date: string
  author: string
  slug: string
  subsidiary: string
}

export function BlogPreview({ title, excerpt, date, author, slug, subsidiary }: BlogPreviewProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <CardHeader className="p-0">
          <div className="h-48 bg-muted relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              {subsidiary === "tech" && <div className="text-4xl text-primary/40">SL Tech</div>}
              {subsidiary === "liquor" && <div className="text-4xl text-primary/40">SL Liquor</div>}
              {subsidiary === "group" && <div className="text-4xl text-primary/40">SL Group</div>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">{author}</div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {date}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

