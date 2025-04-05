"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, Facebook, Twitter } from "lucide-react"

// Mock data for social media posts
const socialPosts = {
  instagram: [
    {
      id: 1,
      imageUrl: "/placeholder.svg?height=300&width=300",
      caption: "Exploring new tech innovations at our R&D center! #SLTech #Innovation",
      likes: 245,
      date: "2 days ago",
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg?height=300&width=300",
      caption: "New wine collection just arrived! Come taste it this weekend. #SLLiquor #WineTasting",
      likes: 189,
      date: "5 days ago",
    },
    {
      id: 3,
      imageUrl: "/placeholder.svg?height=300&width=300",
      caption: "Team building day at SL Group! #TeamSpirit #WorkCulture",
      likes: 320,
      date: "1 week ago",
    },
  ],
  facebook: [
    {
      id: 1,
      imageUrl: "/placeholder.svg?height=300&width=300",
      caption: "We're excited to announce our new partnership with local vineyards! #SLLiquor",
      likes: 156,
      comments: 32,
      date: "3 days ago",
    },
    {
      id: 2,
      imageUrl: "/placeholder.svg?height=300&width=300",
      caption: "Join us for our tech workshop next month! Register now. #SLTech #Workshop",
      likes: 98,
      comments: 24,
      date: "1 week ago",
    },
  ],
  twitter: [
    {
      id: 1,
      content:
        "Excited to share our latest tech solution that's helping businesses streamline operations! #SLTech #Innovation",
      retweets: 45,
      likes: 132,
      date: "1 day ago",
    },
    {
      id: 2,
      content:
        "Join us this weekend for a special wine tasting event at SL Liquor & Market! #WineTasting #WeekendPlans",
      retweets: 28,
      likes: 87,
      date: "4 days ago",
    },
    {
      id: 3,
      content:
        "We're hiring! Check out our careers page for exciting opportunities at SL Group. #JobOpportunities #Careers",
      retweets: 56,
      likes: 104,
      date: "1 week ago",
    },
  ],
}

export function SocialFeed() {
  const [activeTab, setActiveTab] = useState("instagram")

  return (
    <Tabs defaultValue="instagram" className="w-full" onValueChange={setActiveTab}>
      <div className="flex justify-center mb-6">
        <TabsList>
          <TabsTrigger value="instagram" className="flex items-center gap-2">
            <Instagram className="h-4 w-4" /> Instagram
          </TabsTrigger>
          <TabsTrigger value="facebook" className="flex items-center gap-2">
            <Facebook className="h-4 w-4" /> Facebook
          </TabsTrigger>
          <TabsTrigger value="twitter" className="flex items-center gap-2">
            <Twitter className="h-4 w-4" /> Twitter
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="instagram" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPosts.instagram.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image src={post.imageUrl || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <p className="text-sm line-clamp-2">{post.caption}</p>
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>{post.likes} likes</span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="facebook" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socialPosts.facebook.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src={post.imageUrl || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <p className="text-sm line-clamp-3">{post.caption}</p>
                <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                  <span>
                    {post.likes} likes • {post.comments} comments
                  </span>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="twitter" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPosts.twitter.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardContent className="p-4">
                <p className="text-sm mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex gap-4">
                    <span>{post.retweets} retweets</span>
                    <span>{post.likes} likes</span>
                  </div>
                  <span>{post.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

