import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PenTool, Printer, Palette, BookOpen, Package, ChevronLeft, ArrowRight } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import VideoPlayer from "@/components/video-player"

export default function StationeryPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
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
                SL Stationery Hub
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Your Partner in Creativity and Productivity
              </p>
            </div>
            <div className="space-x-4">
              <Link href="#services">
                <Button variant="secondary" className="bg-white text-indigo-700 hover:bg-white/90">
                  Our Products
                </Button>
              </Link>
              <Link href="/contact?interest=stationery">
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
              <h2 className="text-3xl font-bold tracking-tighter">About SL Stationery Hub</h2>
              <p className="text-muted-foreground md:text-lg">
                SL Stationery Hub provides premium writing instruments, paper products, and printing services that
                inspire creativity and enhance productivity. We source exceptional products and deliver customized
                solutions for individuals and organizations alike.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Founded in 2019, we've built a reputation for quality, innovation, and exceptional customer service. Our
                carefully curated collection of stationery products combines functionality with aesthetic appeal,
                ensuring that every item we offer meets our high standards of excellence.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">1000+</span>
                  <span className="text-sm text-muted-foreground">Products</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">500+</span>
                  <span className="text-sm text-muted-foreground">Business Clients</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <span className="text-sm text-muted-foreground">Premium Brands</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">24hr</span>
                  <span className="text-sm text-muted-foreground">Turnaround Time</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="SL Stationery Hub Store"
                width={800}
                height={600}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium">Our flagship stationery store</p>
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
              <h2 className="text-3xl font-bold tracking-tighter">Our Products & Services</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                We offer a comprehensive range of stationery products and services to meet your needs.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <PenTool className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Premium Writing Instruments</h3>
              <p className="text-muted-foreground">
                Discover our collection of high-quality pens, pencils, and markers from renowned brands that make
                writing a pleasure.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Luxury fountain pens</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Professional ballpoint pens</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Artist-grade colored pencils</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Precision technical pens</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=stationery&service=writing">
                  <Button className="w-full">Shop Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Paper Products</h3>
              <p className="text-muted-foreground">
                From premium notebooks to specialty papers, we offer a wide range of paper products for every need and
                occasion.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Designer notebooks and journals</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Archival-quality paper</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Specialty cardstock</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Planners and organizers</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=stationery&service=paper">
                  <Button className="w-full">Shop Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <Palette className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Art Supplies</h3>
              <p className="text-muted-foreground">
                Unleash your creativity with our comprehensive range of art supplies for professionals and hobbyists
                alike.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Professional-grade paints</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Drawing and sketching tools</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Canvas and art papers</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Crafting materials</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=stationery&service=art">
                  <Button className="w-full">Shop Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <Printer className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Custom Printing</h3>
              <p className="text-muted-foreground">
                From business cards to banners, our custom printing services deliver high-quality results for all your
                printing needs.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Business cards and stationery</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Brochures and flyers</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Posters and banners</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Custom invitations</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=stationery&service=printing">
                  <Button className="w-full">Get a Quote</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Office Supplies</h3>
              <p className="text-muted-foreground">
                Keep your workspace organized and efficient with our comprehensive range of high-quality office
                supplies.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Filing and organization</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Desk accessories</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Presentation materials</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Shipping supplies</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=stationery&service=office">
                  <Button className="w-full">Shop Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                <PenTool className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Personalized Stationery</h3>
              <p className="text-muted-foreground">
                Make a lasting impression with our custom-designed personalized stationery for individuals and
                businesses.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Monogrammed notecards</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Custom letterheads</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Personalized journals</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Branded corporate gifts</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=stationery&service=personalized">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Featured Products</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Explore our collection of premium stationery products.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Luxury Fountain Pen"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">Artisan Fountain Pen</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hand-crafted luxury fountain pen with 14k gold nib.
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">$149.99</span>
                  <Link
                    href="/portfolio/stationery/products/fountain-pen"
                    className="text-indigo-600 hover:underline text-sm"
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
                  alt="Premium Notebook"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">Executive Leather Journal</h3>
                <p className="mt-1 text-sm text-muted-foreground">Genuine leather-bound journal with premium paper.</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">$79.99</span>
                  <Link
                    href="/portfolio/stationery/products/leather-journal"
                    className="text-indigo-600 hover:underline text-sm"
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
                  alt="Artist Pencil Set"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">Professional Colored Pencil Set</h3>
                <p className="mt-1 text-sm text-muted-foreground">72-piece artist-grade colored pencil collection.</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">$124.99</span>
                  <Link
                    href="/portfolio/stationery/products/pencil-set"
                    className="text-indigo-600 hover:underline text-sm"
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
                  alt="Desk Organizer"
                  width={400}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold">Premium Desk Organizer</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Handcrafted wooden desk organizer with multiple compartments.
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-bold">$89.99</span>
                  <Link
                    href="/portfolio/stationery/products/desk-organizer"
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/portfolio/stationery/products">
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
              <h2 className="text-3xl font-bold tracking-tighter">Product Showcases</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Watch our product demonstrations and see our custom printing process in action.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <VideoPlayer
                title="Luxury Pen Collection"
                description="Explore our collection of premium writing instruments and see the craftsmanship up close."
              />
            </div>
            <div className="space-y-4">
              <VideoPlayer
                title="Custom Printing Process"
                description="Go behind the scenes of our printing facility and see how we create custom stationery."
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
              <h2 className="text-3xl font-bold tracking-tighter">What Our Clients Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Hear from our satisfied clients about their experience with SL Stationery Hub.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="The quality of their products is exceptional. I've been using their personalized stationery for my business correspondence, and it always makes a great impression."
              author="Robert Chen"
              position="CEO, Global Ventures"
              rating={5}
            />
            <TestimonialCard
              quote="Their custom printing service exceeded my expectations. The team was attentive to my needs and delivered beautiful wedding invitations on time and within budget."
              author="Jessica Williams"
              position="Wedding Client"
              rating={5}
            />
            <TestimonialCard
              quote="As an artist, I'm very particular about my supplies. SL Stationery Hub consistently provides me with the highest quality materials for my work."
              author="Michael Thompson"
              position="Professional Artist"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Business Solutions</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                We offer specialized solutions for businesses of all sizes.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Corporate Branding Packages</h3>
              <p className="text-muted-foreground mb-4">
                Establish a consistent and professional brand identity with our comprehensive corporate branding
                packages, including:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Custom letterheads and envelopes</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Business cards for your entire team</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Branded presentation folders</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Corporate gift items</span>
                </li>
              </ul>
              <Link href="/contact?interest=stationery&service=corporate">
                <Button className="w-full">Request a Quote</Button>
              </Link>
            </div>

            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Bulk Ordering Program</h3>
              <p className="text-muted-foreground mb-4">
                Save time and money with our bulk ordering program for businesses and educational institutions:
              </p>
              <ul className="space-y-2 text-muted-foreground mb-6">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Volume discounts on regular orders</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Streamlined ordering process</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span>Free delivery for qualifying orders</span>
                </li>
              </ul>
              <Link href="/contact?interest=stationery&service=bulk">
                <Button className="w-full">Enroll Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Enhance Your Productivity?</h2>
              <p className="md:text-lg text-white/80">
                Whether you're looking for premium writing instruments, custom printing services, or office supplies,
                we're here to help. Contact us today to discuss your needs.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/contact?interest=stationery">
                  <Button variant="secondary" className="bg-white text-indigo-700 hover:bg-white/90">
                    Contact Us
                  </Button>
                </Link>
                <Link href="#services">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Products
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Join Our Newsletter</h3>
                <p className="mb-4 text-white/80">
                  Subscribe to our newsletter to receive updates on new products, special offers, and creative
                  inspiration.
                </p>
                <Link href="/contact?interest=stationery&type=newsletter">
                  <Button className="w-full bg-white text-indigo-700 hover:bg-white/90">Subscribe Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

