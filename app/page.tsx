import Link from "next/link"
import { ArrowRight, Building2, Calendar, Home, Scissors, PenTool, Wine } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary/90 to-primary relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  SL GROUP
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">Innovation. Excellence. Impact.</p>
              </div>
              <div className="space-x-4">
                <Link href="/about">
                  <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Learn More
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/Tech.jpg" 
              alt="Background" 
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">About Us</h2>
                <p className="text-muted-foreground md:text-xl">
                  SL Group is a dynamic and innovative conglomerate dedicated to delivering excellence across diverse
                  industries. With a strong commitment to quality, sustainability, and customer satisfaction, SL Group
                  operates through its specialized subsidiaries, each designed to address unique market needs with
                  cutting-edge solutions.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/about">
                    <Button className="flex items-center gap-1">
                      Learn More <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-lg p-6 space-y-2">
                  <h3 className="font-bold">Our Vision</h3>
                  <p className="text-sm text-muted-foreground">
                    To be a leading force in innovation and service delivery, transforming industries and creating
                    lasting value.
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-6 space-y-2">
                  <h3 className="font-bold">Our Mission</h3>
                  <p className="text-sm text-muted-foreground">
                    Dedicated to innovation, sustainability, customer-centricity, and excellence in everything we do.
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-6 space-y-2 col-span-2">
                  <h3 className="font-bold">Core Values</h3>
                  <ul className="text-sm text-muted-foreground grid grid-cols-1 gap-2">
                    <li>• Integrity</li>
                    <li>• Collaboration</li>
                    <li>• Adaptability</li>
                    <li>• Impact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Portfolio</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our specialized subsidiaries, each designed to address unique market needs with cutting-edge
                  solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">SL Tech Innovators</h3>
                  <p className="text-sm text-muted-foreground">
                    Empowering Businesses with Smart IT Solutions. Custom software development, IT support,
                    cybersecurity, and more.
                  </p>
                </div>
                <Link href="/portfolio/tech">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">SL Elite Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating Unforgettable Moments, One Event at a Time. Wedding planning, corporate events, themed
                    parties, and more.
                  </p>
                </div>
                <Link href="/portfolio/events">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Home className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">SL Prime Properties</h3>
                  <p className="text-sm text-muted-foreground">
                    Your Gateway to Premium Living and Event Spaces. Luxury apartments, event venues, and property
                    management.
                  </p>
                </div>
                <Link href="/portfolio/properties">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Scissors className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">SL Grooming Studio</h3>
                  <p className="text-sm text-muted-foreground">
                    Where Style Meets Precision. Premium salon offering haircuts, grooming, and styling services for all
                    genders.
                  </p>
                </div>
                <Link href="/portfolio/grooming">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <PenTool className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">SL Stationery Hub</h3>
                  <p className="text-sm text-muted-foreground">
                    Your Partner in Creativity and Productivity. High-quality office supplies, art materials, and custom
                    printing services.
                  </p>
                </div>
                <Link href="/portfolio/stationery">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Wine className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold">SL Liquor & Market</h3>
                  <p className="text-sm text-muted-foreground">
                    Premium Convenience at Your Fingertips. Curated selection of fine wines, craft beers, spirits, and
                    gourmet groceries.
                  </p>
                </div>
                <Link href="/portfolio/liquor">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
              {/* <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                  <h3 className="font-bold">Why Choose SL Group?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Integrated Excellence Across Industries</li>
                    <li>• Innovation at Our Core</li>
                    <li>• Relationship-Focused Partnership</li>
                    <li>• Environmental Leadership</li>
                    <li>• Proven Excellence</li>
                  </ul>
                </div>
                <Link href="/about#why-choose-us">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div> */}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join Our Journey</h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you're an entrepreneur seeking technological transformation, a couple planning your perfect
                  wedding, a property investor, someone looking for premium grooming services, or a business needing
                  quality stationery solutions—SL Group invites you to experience our difference.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/contact">
                  <Button variant="secondary" className="w-full">
                    Contact Us Today
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

