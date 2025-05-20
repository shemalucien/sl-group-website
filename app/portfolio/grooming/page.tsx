import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, User, Sparkles, Brush, ShoppingBag, ChevronLeft, ArrowRight } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import VideoPlayer from "@/components/video-player"

export default function GroomingPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
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
                SL Grooming Studio
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">Where Style Meets Precision</p>
            </div>
            <div className="space-x-4">
              <Link href="#services">
                <Button variant="secondary" className="bg-white text-teal-700 hover:bg-white/90">
                  Our Services
                </Button>
              </Link>
              <Link href="/contact?interest=grooming">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Book Appointment
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
              <h2 className="text-3xl font-bold tracking-tighter">About SL Grooming Studio</h2>
              <p className="text-muted-foreground md:text-lg">
                SL Grooming Studio elevates the traditional salon experience through exceptional service, master
                craftsmanship, and an atmosphere of refined luxury. We cater to clients of all genders who appreciate
                precision, style, and the finer details.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Founded in 2018, our studio combines traditional techniques with modern trends to create personalized
                looks that enhance your natural features. Our team of skilled stylists and grooming specialists are
                dedicated to providing an exceptional experience from the moment you walk through our doors.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">5000+</span>
                  <span className="text-sm text-muted-foreground">Happy Clients</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">15+</span>
                  <span className="text-sm text-muted-foreground">Master Stylists</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">20+</span>
                  <span className="text-sm text-muted-foreground">Premium Products</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">4.9</span>
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="SL Grooming Studio Interior"
                width={800}
                height={600}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium">Our elegant and modern grooming studio</p>
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
                We offer a comprehensive range of grooming services for all genders.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <Scissors className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Precision Haircuts</h3>
              <p className="text-muted-foreground">
                Our expert stylists create personalized haircuts that complement your features, lifestyle, and personal
                style.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Men's classic and modern cuts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Women's styling and cuts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Children's haircuts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Consultation included</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=grooming&service=haircuts">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Beard Grooming</h3>
              <p className="text-muted-foreground">
                Enhance your facial hair with our expert beard grooming services, from shaping and trimming to luxury
                treatments.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Beard shaping and design</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Hot towel treatments</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Beard conditioning</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Mustache styling</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=grooming&service=beard">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Hair Treatments</h3>
              <p className="text-muted-foreground">
                Revitalize your hair with our premium treatments designed to nourish, strengthen, and enhance your
                natural beauty.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Deep conditioning</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Scalp treatments</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Hair masks</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Anti-frizz therapy</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=grooming&service=treatments">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <Brush className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Coloring & Highlights</h3>
              <p className="text-muted-foreground">
                Transform your look with our expert color services, from subtle highlights to bold transformations.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Full color services</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Balayage and ombré</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Highlights and lowlights</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Gray coverage</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=grooming&service=coloring">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Facial Treatments</h3>
              <p className="text-muted-foreground">
                Rejuvenate your skin with our premium facial treatments designed to cleanse, exfoliate, and nourish.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Classic facials</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Deep cleansing</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Anti-aging treatments</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Hydrating masks</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=grooming&service=facial">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Premium Products</h3>
              <p className="text-muted-foreground">
                Take home the same professional-grade products we use in our studio to maintain your look between
                visits.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Luxury hair care</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Beard care essentials</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Styling products</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Skincare collection</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=grooming&service=products">
                  <Button className="w-full">Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Style Gallery</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Browse through our portfolio of styles and transformations.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Men's Haircut"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Women's Styling"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Beard Grooming"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Hair Coloring"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Facial Treatment"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Hair Treatment"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Modern Style"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Classic Cut"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/portfolio/grooming/gallery">
              <Button variant="outline">View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Style Transformations</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Watch our stylists in action and see the amazing transformations we create.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <VideoPlayer
                title="Complete Style Makeover"
                description="Watch this dramatic transformation as our master stylist creates a completely new look."
              />
            </div>
            <div className="space-y-4">
              <VideoPlayer
                title="Beard Grooming Masterclass"
                description="Learn the techniques our experts use to shape and style the perfect beard."
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
                Hear from our satisfied clients about their experience at SL Grooming Studio.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="I've never felt more confident with my hair. The stylist took the time to understand exactly what I wanted and delivered beyond my expectations."
              author="James Wilson"
              position="Regular Client"
              rating={5}
            />
            <TestimonialCard
              quote="The beard grooming service is exceptional. My beard has never looked better, and the hot towel treatment was incredibly relaxing."
              author="Michael Chen"
              position="First-time Client"
              rating={5}
            />
            <TestimonialCard
              quote="I love the attention to detail and the relaxing atmosphere. The hair treatment has made such a difference to my damaged hair."
              author="Sarah Johnson"
              position="Monthly Client"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Meet Our Stylists</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Our team of expert stylists and grooming specialists are dedicated to providing exceptional service.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-3">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Alex Thompson"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold">Alex Thompson</h3>
                <p className="text-sm text-muted-foreground">Master Stylist</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Jessica Lee"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold">Jessica Lee</h3>
                <p className="text-sm text-muted-foreground">Color Specialist</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="David Rodriguez"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold">David Rodriguez</h3>
                <p className="text-sm text-muted-foreground">Beard Specialist</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Emma Wilson"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold">Emma Wilson</h3>
                <p className="text-sm text-muted-foreground">Facial Therapist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Ready for a New Look?</h2>
              <p className="md:text-lg text-white/80">
                Whether you're looking for a simple trim or a complete style transformation, our team is ready to help
                you look and feel your best.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/contact?interest=grooming">
                  <Button variant="secondary" className="bg-white text-teal-700 hover:bg-white/90">
                    Book Appointment
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
                <h3 className="text-xl font-bold mb-4">First-Time Client Special</h3>
                <p className="mb-4 text-white/80">
                  Enjoy 20% off your first service with us. Experience the SL Grooming Studio difference today.
                </p>
                <Link href="/contact?interest=grooming&promo=firsttime">
                  <Button className="w-full bg-white text-teal-700 hover:bg-white/90">Claim Offer</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

