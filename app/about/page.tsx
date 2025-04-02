import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About SL Group
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A dynamic and innovative conglomerate dedicated to delivering
                excellence across diverse industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter" id="about">
                About Us
              </h2>
              <p className="text-muted-foreground">
                SL Group is a dynamic and innovative conglomerate dedicated to
                delivering excellence across diverse industries. With a strong
                commitment to quality, sustainability, and customer
                satisfaction, SL Group operates through its specialized
                subsidiaries, each designed to address unique market needs with
                cutting-edge solutions.
              </p>
              <p className="text-muted-foreground">
                Our mission is to empower businesses, individuals, and
                communities by providing tailored services that drive growth,
                efficiency, and unforgettable experiences.
              </p>
            </div>
            <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm">
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
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter" id="vision">
                Our Vision & Mission
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-bold">Vision</h3>
                  <p className="text-muted-foreground">
                    To be a leading force in innovation and service delivery,
                    transforming industries and creating lasting value for our
                    clients, partners, and stakeholders.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-bold">Mission</h3>
                  <p className="text-muted-foreground">
                    SL Group is dedicated to:
                  </p>
                  <ul className="mt-2 space-y-1 text-muted-foreground">
                    <li>
                      • Innovation: Harnessing cutting-edge technology and
                      creative thinking
                    </li>
                    <li>
                      • Sustainability: Promoting eco-friendly practices across
                      all operations
                    </li>
                    <li>
                      • Customer-Centricity: Building enduring relationships
                    </li>
                    <li>
                      • Excellence: Maintaining the highest standards of quality
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="values">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Core Values
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our values guide everything we do at SL Group.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold">Integrity</h3>
              <p className="text-sm text-muted-foreground">
                We operate with honesty, transparency, and accountability.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold">Collaboration</h3>
              <p className="text-sm text-muted-foreground">
                We believe in the power of teamwork and partnerships.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold">Adaptability</h3>
              <p className="text-sm text-muted-foreground">
                We embrace change and continuously evolve to meet market
                demands.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold">Impact</h3>
              <p className="text-sm text-muted-foreground">
                We strive to make a positive difference in the communities we
                serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32" id="why-choose-us">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Why Choose SL Group?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our unique positioning creates powerful synergies that deliver
                comprehensive solutions.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Integrated Excellence</h3>
              <p className="text-muted-foreground">
                Our unique positioning across technology, events, property,
                grooming, and stationery creates powerful synergies that deliver
                comprehensive solutions unavailable elsewhere.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Innovation at Our Core</h3>
              <p className="text-muted-foreground">
                We continuously pioneer new approaches by combining cutting-edge
                technologies with creative thinking, ensuring our clients
                benefit from solutions that anticipate tomorrow's challenges.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Relationship-Focused</h3>
              <p className="text-muted-foreground">
                Beyond transactions, we build lasting relationships where your
                success becomes our mission, offering personalized attention and
                tailored strategies that evolve with your needs.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Environmental Leadership</h3>
              <p className="text-muted-foreground">
                Sustainability drives our operations—from eco-friendly event
                planning to energy-efficient properties and responsibly sourced
                products—creating positive environmental impact at every
                touchpoint.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Proven Excellence</h3>
              <p className="text-muted-foreground">
                Our growing portfolio of success stories and client testimonials
                demonstrates our ability to exceed expectations and deliver
                meaningful results across diverse sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="impact">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Our Impact
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                SL Group represents more than services—we're catalysts for
                positive change.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold">Economic Empowerment</h3>
              <p className="text-sm text-muted-foreground">
                We fuel business growth through technology enablement, create
                employment opportunities, and develop properties that appreciate
                in value—strengthening local economies and individual
                prosperity.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold">Community Connection</h3>
              <p className="text-sm text-muted-foreground">
                Our spaces and events bring people together, fostering
                meaningful interactions and supporting cultural vitality through
                gatherings that celebrate milestones and build stronger
                communities.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
              <h3 className="text-xl font-bold">Sustainable Future</h3>
              <p className="text-sm text-muted-foreground">
                Environmental responsibility permeates every business
                decision—from paperless operations to energy-efficient venues
                and eco-conscious product sourcing—reflecting our commitment to
                planetary wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Join Our Journey
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Together, we'll create possibilities that transcend
                expectations.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/contact">
                <Button
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Explore Our Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
