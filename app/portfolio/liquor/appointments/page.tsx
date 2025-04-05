import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AppointmentForm } from "@/components/appointment-form"
import { CalendarIcon, Clock, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AppointmentsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login?callbackUrl=/portfolio/liquor/appointments")
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Book an Appointment
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Schedule a tasting, consultation, or special event with our experts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Types */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Our Services</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Choose from our range of personalized appointment options
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <CalendarIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Wine Tasting</h3>
              <p className="text-muted-foreground">
                Experience a curated selection of fine wines guided by our expert sommeliers.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>45-60 minute session</li>
                <li>Selection of 5-7 wines</li>
                <li>Cheese pairing available</li>
                <li>Private or group options</li>
              </ul>
              <div className="mt-auto pt-4">
                <Button className="w-full" asChild>
                  <a href="#booking-form">Book Wine Tasting</a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Expert Consultation</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations for your collection, event, or special occasion.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>30-45 minute session</li>
                <li>Personalized recommendations</li>
                <li>Event planning assistance</li>
                <li>Collection management advice</li>
              </ul>
              <div className="mt-auto pt-4">
                <Button className="w-full" asChild>
                  <a href="#booking-form">Book Consultation</a>
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-4 rounded-lg border bg-card p-6 shadow-sm">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-800">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">Private Event</h3>
              <p className="text-muted-foreground">
                Host your private event with us, from corporate gatherings to celebrations.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>Custom duration</li>
                <li>Tailored food and beverage</li>
                <li>Space for up to 30 guests</li>
                <li>Full event planning</li>
              </ul>
              <div className="mt-auto pt-4">
                <Button className="w-full" asChild>
                  <a href="#booking-form">Book Private Event</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Book Your Appointment</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Fill out the form below to schedule your appointment with us
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-[800px]">
            <AppointmentForm userId={user.id} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Find answers to common questions about our appointment services
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-[800px] space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How long are the appointments?</h3>
              <p className="text-muted-foreground">
                Wine tastings typically last 45-60 minutes, consultations are 30-45 minutes, and private events can be
                customized to your needs.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Is there a fee for appointments?</h3>
              <p className="text-muted-foreground">
                Wine tastings have a nominal fee that can be applied to purchases made during your visit. Consultations
                are complimentary. Private events have custom pricing based on your requirements.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Can I reschedule my appointment?</h3>
              <p className="text-muted-foreground">
                Yes, you can reschedule or cancel your appointment up to 24 hours before the scheduled time without any
                penalty.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How many people can attend a tasting?</h3>
              <p className="text-muted-foreground">
                Our standard tastings accommodate up to 8 people. For larger groups, please book a private event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Elevate Your Experience?</h2>
              <p className="md:text-lg text-white/80">
                Book your appointment today and let our experts guide you through an unforgettable experience.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button variant="secondary" className="bg-white text-red-800 hover:bg-white/90" asChild>
                  <a href="#booking-form">Book Now</a>
                </Button>
                <Link href="/portfolio/liquor">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="mb-4 text-white/80">
                  If you have any questions or need assistance with booking, our team is here to help.
                </p>
                <Link href="/contact?interest=liquor">
                  <Button className="w-full bg-white text-red-800 hover:bg-white/90">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

