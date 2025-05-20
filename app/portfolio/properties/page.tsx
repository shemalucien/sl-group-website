import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Building, Calendar, Key, ChevronLeft, ArrowRight } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import VideoPlayer from "@/components/video-player"

export default function PropertiesPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
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
                SL Prime Properties
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Your Gateway to Premium Living and Event Spaces
              </p>
            </div>
            <div className="space-x-4">
              <Link href="#services">
                <Button variant="secondary" className="bg-white text-amber-700 hover:bg-white/90">
                  Our Services
                </Button>
              </Link>
              <Link href="/contact?interest=properties">
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
              <h2 className="text-3xl font-bold tracking-tighter">About SL Prime Properties</h2>
              <p className="text-muted-foreground md:text-lg">
                SL Prime Properties offers an exclusive portfolio of luxury real estate solutions, from residential
                accommodations to sophisticated event venues. We provide discerning clients with spaces that reflect
                elegance, comfort, and distinction.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Established in 2017, we've curated a collection of premium properties in prime locations, each offering
                unique features and amenities. Our commitment to excellence ensures that every property in our portfolio
                meets the highest standards of quality and luxury.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <span className="text-sm text-muted-foreground">Luxury Properties</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">15+</span>
                  <span className="text-sm text-muted-foreground">Event Venues</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">98%</span>
                  <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">24/7</span>
                  <span className="text-sm text-muted-foreground">Property Management</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Luxury Property"
                width={800}
                height={600}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium">Our signature luxury apartment building</p>
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
                We offer a comprehensive range of real estate services to meet your needs.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Luxury Apartments</h3>
              <p className="text-muted-foreground">
                Experience the epitome of luxury living in our meticulously designed apartments, featuring premium
                amenities and stunning views.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Premium locations</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>High-end finishes</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Exclusive amenities</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=properties&service=apartments">
                  <Button className="w-full">View Properties</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Event Venues</h3>
              <p className="text-muted-foreground">
                Host unforgettable events in our distinctive venues, perfect for weddings, corporate functions, and
                special celebrations.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Versatile spaces</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>State-of-the-art facilities</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Customizable layouts</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=properties&service=venues">
                  <Button className="w-full">Explore Venues</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Short-Term Rentals</h3>
              <p className="text-muted-foreground">
                Enjoy the comfort of home with the luxury of a hotel in our premium short-term accommodations for
                business or leisure.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Fully furnished</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Flexible terms</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Concierge services</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=properties&service=rentals">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Key className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Property Management</h3>
              <p className="text-muted-foreground">
                Let us handle the details of property management with our comprehensive services for property owners and
                investors.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Tenant screening</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Maintenance coordination</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>Financial reporting</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=properties&service=management">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Featured Properties</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Explore our collection of premium properties and find your perfect space.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Luxury Apartment"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">The Skyline Residences</h3>
                <p className="mt-2 text-muted-foreground">
                  Luxurious 3-bedroom apartments with panoramic city views, premium amenities, and concierge service.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">$3,500/month</span>
                  <Link href="/portfolio/properties/skyline" className="text-amber-600 hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Event Venue"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">The Grand Ballroom</h3>
                <p className="mt-2 text-muted-foreground">
                  Elegant event space for up to 300 guests, featuring crystal chandeliers and a sophisticated ambiance.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">$5,000/event</span>
                  <Link href="/portfolio/properties/grand-ballroom" className="text-amber-600 hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Short-Term Rental"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Executive Suites</h3>
                <p className="mt-2 text-muted-foreground">
                  Fully furnished short-term accommodations ideal for business travelers and executives.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">$250/night</span>
                  <Link href="/portfolio/properties/executive-suites" className="text-amber-600 hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/portfolio/properties/listings">
              <Button variant="outline">View All Properties</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Virtual Tours</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Experience our properties from the comfort of your home with our virtual tours.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <VideoPlayer
                title="The Skyline Residences Tour"
                description="Take a virtual tour of our premium 3-bedroom apartments with panoramic city views."
              />
            </div>
            <div className="space-y-4">
              <VideoPlayer
                title="The Grand Ballroom Showcase"
                description="Explore our elegant event venue perfect for weddings, galas, and corporate events."
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
                Hear from our satisfied clients about their experience with SL Prime Properties.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="Living at The Skyline Residences has been an absolute pleasure. The amenities are top-notch, the views are breathtaking, and the management team is incredibly responsive."
              author="David Thompson"
              position="Resident since 2021"
              rating={5}
            />
            <TestimonialCard
              quote="We hosted our wedding at The Grand Ballroom and it was everything we dreamed of. The space is stunning and the staff went above and beyond to make our day special."
              author="Jessica & Michael"
              position="Wedding Clients"
              rating={5}
            />
            <TestimonialCard
              quote="As a property investor, I've been extremely satisfied with SL Prime Properties' management services. They've maximized my rental income while minimizing my stress."
              author="Robert Chen"
              position="Property Investor"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Experience Luxury Living?</h2>
              <p className="md:text-lg text-white/80">
                Whether you're looking for a new home, an event venue, or property management services, we're here to
                help. Contact us today to discuss your needs.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/contact?interest=properties">
                  <Button variant="secondary" className="bg-white text-amber-700 hover:bg-white/90">
                    Contact Us
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
                <h3 className="text-xl font-bold mb-4">Schedule a Viewing</h3>
                <p className="mb-4 text-white/80">
                  Our property specialists are ready to show you our premium properties and answer any questions you may
                  have.
                </p>
                <Link href="/contact?interest=properties&type=viewing">
                  <Button className="w-full bg-white text-amber-700 hover:bg-white/90">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

