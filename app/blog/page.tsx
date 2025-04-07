
import { db } from "@/db"
import { BlogPreview } from "@/components/blog-preview"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Eye } from "lucide-react"
import { blogPosts, blogPostCategories } from "@/db/schema"

export default async function BlogPage() {


  // Get all published blog posts
  const blogPosts = await db.query.blogPosts.findMany({
    limit: 10,
    offset: 0,
    where: (blogPosts, { eq }) => eq(blogPosts.status, "published"),
    orderBy: (blogPosts, { desc }) => [desc(blogPosts.publishedAt || blogPosts.createdAt)],
    with: {
      author: true,
      subsidiary: true,
      // blogPostCategories: {
      //   with: {
      //     category: true,
      //   },
      // },
    },
  })

  console.log("Blog Posts:", blogPosts)

  // Get featured posts - update to use correct field name
  const featuredPosts = await db.query.blogPosts.findMany({
    where: (blogPosts, { eq, and }) => and(
      eq(blogPosts.status, "published"), 
      eq(blogPosts.is_featured, true) // or is_featured if you change schema
    ),
    orderBy: (blogPosts, { desc }) => [desc(blogPosts.publishedAt || blogPosts.createdAt)],
    limit: 3,
    with: {
      author: true,
      subsidiary: true,
    },
  })
  console.log("Featured Posts:", featuredPosts)


    // Get all categories for filtering
    const categories = await db.query.blogCategories.findMany({
      orderBy: (blogCategories, { asc }) => [asc(blogCategories.name)],
    })

    const categoryIds: number[] = categories.map((category) => category.id);
  
    // Group posts by subsidiary
    const groupedBySubsidiary = blogPosts.reduce(
      (acc, post) => {
        const subsidiaryName = post.subsidiary?.name || "SL Group"
        if (!acc[subsidiaryName]) {
          acc[subsidiaryName] = []
        }
        acc[subsidiaryName].push(post)
        return acc
      },
      {} as Record<string, typeof blogPosts>,
    )
  
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
  


  return (
    <div className="container py-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">SL Group Blog</h1>
        <p className="text-xl text-muted-foreground">Insights, news, and updates from across our family of companies</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-9" />
        </div>
        <Button>Search</Button>
      </div>

     

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <div key={post.id} className="relative group">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary/10">
                      {post.subsidiary?.name || "SL Group"}
                    </div>
                  )}
                </div>
                <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  <a href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </a>
                </h3>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <span>{formatDate(post.publishedAt || post.createdAt || new Date())}</span>
                  {post.readingTime && (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readingTime} min read
                    </span>
                  )}
                  {post.viewCount > 0 && (
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.viewCount} views
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button variant="outline" className="rounded-full" size="sm">
          All Categories
        </Button>
        {categories.map((category) => (
          <Button key={category.id} variant="outline" className="rounded-full" size="sm">
            {category.name}
          </Button>
        ))}
      </div>

      {/* Tabs by Subsidiary */}
      <Tabs defaultValue="all" className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          {Object.keys(groupedBySubsidiary).map((subsidiary) => (
            <TabsTrigger key={subsidiary} value={subsidiary}>
              {subsidiary}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogPreview
                key={post.id}
                title={post.title}
                excerpt={post.excerpt || ""}
                date={formatDate((post.publishedAt || post.createdAt) ?? new Date())}
                author={`${post.author.email}`}
                slug={post.slug}
                subsidiary={post.subsidiary?.slug || "group"}
                featuredImage={post.featured_image}
                readingTime={post.readingTime}
                viewCount={post.viewCount}
                categories={categories.map ((category) => category.name)}
                tags={parseTags(post.tags)}
              />
            ))}
          </div>
        </TabsContent>

        {Object.entries(groupedBySubsidiary).map(([subsidiary, posts]) => (
          <TabsContent key={subsidiary} value={subsidiary}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPreview
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt || ""}
                  date={formatDate((post.publishedAt || post.createdAt) ?? new Date())}
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
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-10" />

      {/* Newsletter Subscription */}
      <div className="bg-primary/5 p-8 rounded-lg mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Stay updated with the latest news, insights, and updates from SL Group and our subsidiaries.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input placeholder="Enter your email" className="flex-1" />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  )
}

