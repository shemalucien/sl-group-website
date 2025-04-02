import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wine, ShoppingCart, Gift, Truck, Calendar, Award, ChevronLeft, ArrowRight } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import VideoPlayer from "@/components/video-player"

export default function LiquorPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Link
              href="/portfolio"
              className="flex items-center text-sm font-medium text-white/80 hover:text-white mb-4"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Portfolio
            </Link>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                SL Liquor & Market
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">Premium Convenience at Your Fingertips</p>
            </div>
            <div className="space-x-4">
              <Link href="#services">
                <Button variant="secondary" className="bg-white text-red-800 hover:bg-white/90">
                  Our Services
                </Button>
              </Link>
              <Link href="/contact?interest=liquor">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">About SL Liquor & Market</h2>
              <p className="text-muted-foreground md:text-lg">
                SL Liquor & Market brings together the best of both worlds - a carefully curated liquor selection
                alongside daily grocery essentials. We specialize in premium alcoholic beverages from around the world
                while maintaining a well-stocked mini supermarket for your convenience.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Our mission is to become the preferred neighborhood destination for quality liquor and grocery needs,
                combining convenience with exceptional service. Our knowledgeable staff can recommend perfect pairings
                and help you discover new favorites.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">1000+</span>
                  <span className="text-sm text-muted-foreground">Premium Products</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <span className="text-sm text-muted-foreground">Local Suppliers</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">12+</span>
                  <span className="text-sm text-muted-foreground">Expert Staff</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">7 Days</span>
                  <span className="text-sm text-muted-foreground">Extended Hours</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="SL Liquor & Market Store"
                width={800}
                height={600}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium">Our premium liquor and market store</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="services">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Our Services</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                We offer a comprehensive range of premium products and services to meet your needs.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <Wine className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Premium Beverages</h3>
              <p className="text-muted-foreground">
                Discover our extensive collection of fine wines, craft beers, and premium spirits from around the world.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Curated wine selection</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Craft and imported beers</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Premium spirits and liqueurs</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Limited edition releases</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=liquor&service=beverages">
                  <Button className="w-full">Explore Selection</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Gourmet Market</h3>
              <p className="text-muted-foreground">
                Shop our selection of high-quality groceries, fresh produce, and everyday essentials for your
                convenience.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Imported and local gourmet foods</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Fresh produce and dairy</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Ready-to-eat gourmet meals</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Household necessities</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=liquor&service=market">
                  <Button className="w-full">Shop Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Gift Services</h3>
              <p className="text-muted-foreground">
                Perfect for any occasion, our custom gift baskets and corporate gifting solutions make a lasting
                impression.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Specialty gift baskets</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Corporate gifting solutions</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Custom wine and spirits packages</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Elegant gift wrapping</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=liquor&service=gifts">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Delivery Services</h3>
              <p className="text-muted-foreground">
                Enjoy the convenience of home delivery and subscription services for your favorite products.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Same-day local delivery</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Monthly subscription boxes</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Scheduled recurring deliveries</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Corporate office delivery</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=liquor&service=delivery">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Tastings & Events</h3>
              <p className="text-muted-foreground">
                Join our regular wine tastings, mixology classes, and food pairing events led by industry experts.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Weekly wine tastings</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Craft beer sampling</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Mixology workshops</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Food and wine pairing events</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=liquor&service=events">
                  <Button className="w-full">View Calendar</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Expert Consultation</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations from our team of sommeliers and mixologists to enhance your experience.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Wine pairing advice</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Cocktail recipe consultation</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Cellar building guidance</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Event planning assistance</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=liquor&service=consultation">
                  <Button className="w-full">Book Consultation</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Featured Products</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Explore our selection of premium beverages and gourmet items.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Premium Red Wine"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">Château Grand Reserve</h3>
                <p className="mt-1 text-sm text-muted-foreground">2018 Bordeaux Blend, France</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">$89.99</span>
                  <Link
                    href="/portfolio/liquor/products/chateau-grand-reserve"
                    className="text-red-700 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Craft Whiskey"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">Highland Single Malt</h3>
                <p className="mt-1 text-sm text-muted-foreground">18-Year Aged Whiskey, Scotland</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">$129.99</span>
                  <Link
                    href="/portfolio/liquor/products/highland-single-malt"
                    className="text-red-700 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Artisan Cheese"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">Artisan Cheese Selection</h3>
                <p className="mt-1 text-sm text-muted-foreground">Premium Assortment, Local Creamery</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">$42.99</span>
                  <Link
                    href="/portfolio/liquor/products/artisan-cheese"
                    className="text-red-700 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Gift Basket"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">Luxury Gift Basket</h3>
                <p className="mt-1 text-sm text-muted-foreground">Wine, Cheese, and Gourmet Treats</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">$149.99</span>
                  <Link
                    href="/portfolio/liquor/products/luxury-gift-basket"
                    className="text-red-700 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/portfolio/liquor/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Experience SL Liquor & Market</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Take a virtual tour of our store and see our expert staff in action.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <VideoPlayer
                title="Store Tour"
                description="Take a virtual tour of our premium liquor selection and gourmet market."
              />
            </div>
            <div className="space-y-4">
              <VideoPlayer
                title="Wine Tasting Event"
                description="Watch highlights from our recent wine tasting event featuring local vineyards."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">What Our Customers Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Hear from our satisfied customers about their experience with SL Liquor & Market.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="The wine selection is exceptional, and the staff is incredibly knowledgeable. They helped me select the perfect wine for a special dinner party, and my guests were impressed!"
              author="Sarah Johnson"
              position="Regular Customer"
              rating={5}
            />
            <TestimonialCard
              quote="I love the convenience of having premium liquor and groceries in one place. Their delivery service is prompt, and the subscription box has introduced me to new favorites every month."
              author="Michael Chen"
              position="Subscription Member"
              rating={5}
            />
            <TestimonialCard
              quote="The gift basket I ordered for a corporate event was beautifully presented and contained high-quality products. Our clients were delighted, and I'll definitely be ordering again."
              author="Jessica Williams"
              position="Corporate Client"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Join Our Wine Club</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Become a member of our exclusive wine club and enjoy special benefits.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Explorer Membership</h3>
              <p className="text-2xl font-bold mb-4">$49/month</p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>2 curated wines monthly</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>10% discount on all purchases</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Access to member-only tastings</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Monthly newsletter</span>
                </li>
              </ul>
              <Link href="/contact?interest=liquor&service=wineclub&tier=explorer">
                <Button className="w-full">Join Now</Button>
              </Link>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm relative">
              <div className="absolute top-0 right-0 bg-red-700 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Connoisseur Membership</h3>
              <p className="text-2xl font-bold mb-4">$89/month</p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>4 premium wines monthly</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>15% discount on all purchases</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Exclusive tasting events</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Quarterly sommelier consultation</span>
                </li>
              </ul>
              <Link href="/contact?interest=liquor&service=wineclub&tier=connoisseur">
                <Button className="w-full">Join Now</Button>
              </Link>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">Collector Membership</h3>
              <p className="text-2xl font-bold mb-4">$149/month</p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>4 rare and limited edition wines</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>20% discount on all purchases</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Priority access to special releases</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-red-700 flex-shrink-0 mt-0.5" />
                  <span>Personal cellar management advice</span>
                </li>
              </ul>
              <Link href="/contact?interest=liquor&service=wineclub&tier=collector">
                <Button className="w-full">Join Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Experience Premium Convenience</h2>
              <p className="md:text-lg text-white/80">
                Whether you're looking for a rare bottle of wine, gourmet ingredients for a special meal, or everyday
                essentials, SL Liquor & Market is your one-stop destination for quality and convenience.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/contact?interest=liquor">
                  <Button variant="secondary" className="bg-white text-red-800 hover:bg-white/90">
                    Visit Us Today
                  </Button>
                </Link>
                <Link href="#services">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Sign Up for Delivery</h3>
                <p className="mb-4 text-white/80">
                  Get your favorite products delivered straight to your door. Sign up for our delivery service today.
                </p>
                <Link href="/contact?interest=liquor&service=delivery&type=signup">
                  <Button className="w-full bg-white text-red-800 hover:bg-white/90">Sign Up Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

