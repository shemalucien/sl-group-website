import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Gift, Heart, Building, ChevronLeft, ArrowRight } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import VideoPlayer from "@/components/video-player"

export default function EventsPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-600 to-purple-700 text-white">
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
                SL Elite Events
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Creating Unforgettable Moments, One Event at a Time
              </p>
            </div>
            <div className="space-x-4">
              <Link href="#services">
                <Button variant="secondary" className="bg-white text-purple-700 hover:bg-white/90">
                  Our Services
                </Button>
              </Link>
              <Link href="/contact?interest=events">
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
              <h2 className="text-3xl font-bold tracking-tighter">About SL Elite Events</h2>
              <p className="text-muted-foreground md:text-lg">
                SL Elite Events specializes in crafting exceptional experiences through meticulous planning and creative
                execution. From corporate functions to personal celebrations, we transform visions into flawlessly
                executed events.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Founded in 2016, our team of experienced event planners brings creativity, attention to detail, and a
                passion for excellence to every event we organize. We believe that every event tells a story, and we're
                dedicated to making yours unforgettable.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">500+</span>
                  <span className="text-sm text-muted-foreground">Events Organized</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">98%</span>
                  <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">25+</span>
                  <span className="text-sm text-muted-foreground">Event Specialists</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">100+</span>
                  <span className="text-sm text-muted-foreground">Venue Partners</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="SL Elite Events Team"
                width={800}
                height={600}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium">Our creative team of event specialists</p>
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
                We offer a comprehensive range of event planning and management services.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Luxury Wedding Planning</h3>
              <p className="text-muted-foreground">
                From intimate ceremonies to grand celebrations, we create bespoke wedding experiences that reflect your
                unique love story and personal style.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Full-service wedding planning</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Destination weddings</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Custom decor and styling</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Vendor coordination</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=events&service=weddings">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Corporate Events</h3>
              <p className="text-muted-foreground">
                Elevate your corporate events with our professional planning and execution services, designed to impress
                clients and motivate teams.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Conferences and seminars</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Product launches</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Team building activities</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Gala dinners and award ceremonies</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=events&service=corporate">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Themed Celebrations</h3>
              <p className="text-muted-foreground">
                Create magical moments with our themed celebrations, perfect for birthdays, anniversaries, and special
                milestones.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Birthday parties</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Anniversary celebrations</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Custom theme development</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Entertainment coordination</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=events&service=celebrations">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Memorial Services</h3>
              <p className="text-muted-foreground">
                Honor and celebrate the life of your loved ones with our dignified and thoughtful memorial service
                planning.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Funeral arrangements</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Memorial services</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Celebration of life events</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Compassionate coordination</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=events&service=memorial">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Team Retreats</h3>
              <p className="text-muted-foreground">
                Build stronger teams with our strategic retreat planning services, designed to foster collaboration and
                innovation.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Corporate retreats</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Team building activities</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Strategic planning sessions</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Wellness and leadership programs</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=events&service=retreats">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Custom Event Planning</h3>
              <p className="text-muted-foreground">
                Whatever your vision, we can bring it to life with our bespoke event planning services tailored to your
                specific needs.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Personalized event concepts</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Venue selection and management</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Catering and entertainment</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Full-service event coordination</span>
                </li>
              </ul>
              <div className="pt-4 mt-auto">
                <Link href="/contact?interest=events&service=custom">
                  <Button className="w-full">Learn More</Button>
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
              <h2 className="text-3xl font-bold tracking-tighter">Event Gallery</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Browse through our portfolio of stunning events we've organized.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Wedding Event"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Corporate Event"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Birthday Celebration"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Team Retreat"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Gala Dinner"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Product Launch"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Anniversary Party"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Conference Setup"
                width={400}
                height={400}
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/portfolio/events/gallery">
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
              <h2 className="text-3xl font-bold tracking-tighter">Event Highlights</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Watch videos of our most memorable events and see our team in action.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <VideoPlayer
                title="Luxury Wedding Showcase"
                description="A stunning beachfront wedding we organized for 200 guests with custom decor and entertainment."
              />
            </div>
            <div className="space-y-4">
              <VideoPlayer
                title="Corporate Conference Highlights"
                description="A three-day international conference for a tech company with 500+ attendees."
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
                Don't just take our word for it. Here's what our clients have to say about their experience with us.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="SL Elite Events made our wedding day absolutely perfect. Their attention to detail and creative vision exceeded our expectations. We couldn't have asked for a better team to bring our dream wedding to life."
              author="Emily & James"
              position="Wedding Clients"
              rating={5}
            />
            <TestimonialCard
              quote="Our annual corporate conference was flawlessly executed by the SL Elite Events team. From venue selection to technical setup, everything was handled professionally and with great care."
              author="Robert Chen"
              position="Marketing Director, Tech Solutions Inc."
              rating={5}
            />
            <TestimonialCard
              quote="The team retreat organized by SL Elite Events was exactly what our company needed. The activities were thoughtfully planned and helped strengthen our team bonds. Highly recommended!"
              author="Sarah Williams"
              position="HR Manager, Global Finance"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-600 to-purple-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Create Unforgettable Moments?</h2>
              <p className="md:text-lg text-white/80">
                Let's discuss how we can bring your vision to life. Contact us today to start planning your next event.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/contact?interest=events">
                  <Button variant="secondary" className="bg-white text-purple-700 hover:bg-white/90">
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
                <h3 className="text-xl font-bold mb-4">Schedule a Free Consultation</h3>
                <p className="mb-4 text-white/80">
                  Our event specialists are ready to discuss your vision and create a customized plan for your event.
                </p>
                <Link href="/contact?interest=events&type=consultation">
                  <Button className="w-full bg-white text-purple-700 hover:bg-white/90">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

