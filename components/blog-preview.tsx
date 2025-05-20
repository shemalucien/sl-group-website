// import Link from "next/link"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Calendar } from "lucide-react"

// interface BlogPreviewProps {
//   title: string
//   excerpt: string
//   date: string
//   author: string
//   slug: string
//   subsidiary: string
// }

// export function BlogPreview({ title, excerpt, date, author, slug, subsidiary }: BlogPreviewProps) {
//   return (
//     <Link href={`/blog/${slug}`}>
//       <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
//         <CardHeader className="p-0">
//           <div className="h-48 bg-muted relative">
//             <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
//               {subsidiary === "tech" && <div className="text-4xl text-primary/40">SL Tech</div>}
//               {subsidiary === "liquor" && <div className="text-4xl text-primary/40">SL Liquor</div>}
//               {subsidiary === "group" && <div className="text-4xl text-primary/40">SL Group</div>}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-6">
//           <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
//           <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
//         </CardContent>
//         <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
//           <div className="text-sm text-muted-foreground">{author}</div>
//           <div className="flex items-center text-sm text-muted-foreground">
//             <Calendar className="h-3 w-3 mr-1" />
//             {date}
//           </div>
//         </CardFooter>
//       </Card>
//     </Link>
//   )
// }


import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Eye, Tag } from "lucide-react"

interface BlogPreviewProps {
  title: string
  excerpt: string
  date: string
  author: string
  slug: string
  subsidiary: string
  featuredImage?: string | null
  readingTime?: number | null
  viewCount?: number | null
  categories?: string[]
  tags?: string[]
}

export function BlogPreview({
  title,
  excerpt,
  date,
  author,
  slug,
  subsidiary,
  featuredImage,
  readingTime,
  viewCount,
  categories = [],
  tags = [],
}: BlogPreviewProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <CardHeader className="p-0">
          <div className="h-48 bg-muted relative">
            {featuredImage ? (
              <img src={featuredImage || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                {subsidiary === "tech" && <div className="text-4xl text-primary/40">SL Tech</div>}
                {subsidiary === "liquor" && <div className="text-4xl text-primary/40">SL Liquor</div>}
                {subsidiary === "group" && <div className="text-4xl text-primary/40">SL Group</div>}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.slice(0, 2).map((category, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {category}
                </Badge>
              ))}
              {categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{categories.length - 2} more
                </Badge>
              )}
            </div>
          )}
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0 flex flex-col items-start gap-2">
          <div className="text-sm text-muted-foreground">{author}</div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {date}
            </span>
            {readingTime && (
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {readingTime} min read
              </span>
            )}
            {viewCount && viewCount > 0 && (
              <span className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                {viewCount} views
              </span>
            )}
          </div>
          {tags && tags.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap mt-2">
              <Tag className="h-3 w-3 text-muted-foreground" />
              {tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs text-muted-foreground">
                  {tag}
                  {index < Math.min(tags.length, 3) - 1 ? "," : ""}
                </span>
              ))}
              {tags.length > 3 && <span className="text-xs text-muted-foreground">+{tags.length - 3} more</span>}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}


