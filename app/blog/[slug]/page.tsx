import { db } from "@/db"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  Eye,
  Share2,
  MessageSquare,
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react"
import { BlogPreview } from "@/components/blog-preview"
import { blogPosts, blogPostCategories, blogCategories } from "@/db/schema"
import { eq, and, inArray } from "drizzle-orm"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params

  // Get the blog post with its relations
  const post = await db.query.blogPosts.findFirst({
    where: (blogPosts, { eq, and }) =>
      and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")),
    with: {
      author: true,
      subsidiary: true,
      // blogPostCategories: {
      //   with: {
      //     category: true,
      //   },
      // },
      // comments: {
      //   with: {
      //     user: true, // Fetch the user for the comments
      //   },
      // },
    },
  })

  if (!post) {
    notFound()
  }

   // Increment view count
   await db
   .update(blogPosts)
   .set({ viewCount: (post.viewCount || 0) + 1 })
   .where(eq(blogPosts.id, post.id))

 // Get related posts
 //const categoryIds = post.blogPostCategories.map((pc) => pc.categoryId)

const categories = await db.query.blogCategories.findMany();
const categoryIds: number[] = categories.map((category) => category.id);

 const relatedPosts = await db.query.blogPosts.findMany({
   where: (blogPosts, { eq, and, inArray, ne }) =>
     and(
       eq(blogPosts.status, "published"),
       ne(blogPosts.id, post.id),
       post.subsidiaryId ? eq(blogPosts.subsidiaryId, post.subsidiaryId) : undefined,
       categoryIds.length > 0
         ? inArray(
             blogPosts.id,
             db
               .select({ id: blogPostCategories.postId })
               .from(blogPostCategories)
               .where(inArray(blogPostCategories.categoryId, categoryIds)),
           )
         : undefined,
     ),
   limit: 3,
   with: {
     author: true,
     subsidiary: true,
    //  blogPostCategories: {
    //    with: {
    //      category: true,
    //    },
    //  },
   },
 })


  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  // Parse tags from comma-separated string
  const parseTags = (tags: string | null) => {
    if (!tags) return []
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  const tags = parseTags(post.tags)

  // Get author initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const authorInitials = getInitials(`${post.author.firstName} ${post.author.lastName}`)

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <a href="/blog" className="flex items-center text-muted-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to all posts
          </a>
        </Button>
      </div>

      <article className="max-w-4xl mx-auto">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((pc) => (
            <Badge key={pc.id} variant="outline">
              {pc.name}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {/* Meta information */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={post.author.avatarUrl || undefined}
                alt={`${post.author.firstName} ${post.author.lastName}`}
              />
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">
                {post.author.firstName} {post.author.lastName}
              </div>
              <div className="text-sm text-muted-foreground">{post.author.role || "Author"}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.publishedAt || post.createdAt ? formatDate(post.publishedAt ?? post.createdAt ?? new Date()) : "Unknown date"}
            </span>
            {post.readingTime && (
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readingTime} min read
              </span>
            )}
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {post.viewCount || 0} views
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-8">
            <img src={post.featured_image || "/placeholder.svg"} alt={post.title} className="w-full h-auto rounded-lg" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Share buttons */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-medium flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share:
          </span>
          <Button variant="outline" size="icon" className="rounded-full">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Mail className="h-4 w-4" />
            <span className="sr-only">Share via Email</span>
          </Button>
        </div>

        {/* Author bio */}
        <div className="bg-muted/50 p-6 rounded-lg mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={post.author.avatarUrl || undefined}
                alt={`${post.author.firstName} ${post.author.lastName}`}
              />
              <AvatarFallback>{authorInitials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">About the author</h3>
              <div className="text-lg">
                {post.author.firstName} {post.author.lastName}
              </div>
              <div className="text-sm text-muted-foreground">{post.author.role || "Author"}</div>
            </div>
          </div>
          <p className="text-muted-foreground">
            {post.author.firstName ||
              `${post.author.firstName} ${post.author.lastName} is a contributor to the SL Group blog.`}
          </p>
        </div>

        {/* Comments section */}
        {post.allowComments && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Comments</h3>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Comment
              </Button>
            </div>
            <div className="bg-muted/50 p-8 rounded-lg text-center">
              <p className="text-muted-foreground">Be the first to comment on this article.</p>
            </div>
          </div>
        )}
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <Separator className="mb-8" />
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <BlogPreview
                key={post.id}
                title={post.title}
                excerpt={post.excerpt || ""}
                date={post.publishedAt || post.createdAt ? formatDate(post.publishedAt ?? post.createdAt ?? new Date()) : "Unknown date"}
                author={`${post.author.firstName} ${post.author.lastName}`}
                slug={post.slug}
                subsidiary={post.subsidiary?.slug || "group"}
                featuredImage={post.featured_image}
                readingTime={post.readingTime}
                viewCount={post.viewCount}
                categories={[post.slug]}
                tags={parseTags(post.tags)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Newsletter subscription */}
      <div className="bg-primary/5 p-8 rounded-lg mt-16 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Stay updated with the latest news, insights, and updates from SL Group and our subsidiaries.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

