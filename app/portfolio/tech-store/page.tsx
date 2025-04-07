import type { Metadata } from "next"
import { getSubsidiaryBySlug, getSubsidiaryServices } from "@/lib/data"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Laptop, Printer, Wifi, Mouse, PenToolIcon as Tool } from "lucide-react"

export const metadata: Metadata = {
  title: "SL Tech Store | SL Group",
  description: "Your One-Stop IT Solutions Hub",
}

export default async function TechStorePage() {
  const subsidiary = await getSubsidiaryBySlug("tech-store")

  if (!subsidiary) {
    notFound()
  }

  const services = await getSubsidiaryServices(subsidiary.id)



  const icons = {
    laptop: Laptop,
    printer: Printer,
    wifi: Wifi,
    mouse: Mouse,
    tool: Tool,
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-green-600 to-green-400 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  SL Tech Store
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">{subsidiary.tagline}</p>
              </div>
              <div className="space-x-4">
                <Link href="/portfolio/tech-store/shop">
                  <Button variant="secondary" className="bg-white text-green-600 hover:bg-white/90">
                    Shop Now
                  </Button>
                </Link>
                <Link href="#services">
                  <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                    Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Overview</h2>
                <p className="text-muted-foreground md:text-lg">
                  SL Tech Store delivers a seamless technology retail experience by offering a curated selection of
                  premium hardware backed by expert services. Whether you're a business scaling up or an individual
                  upgrading your setup, we provide the right tools and support to power your productivity.
                </p>
                <h3 className="text-xl font-bold">Our Objective</h3>
                <p className="text-muted-foreground">
                  To be the go-to provider of high-quality, reliable IT equipment and support for businesses,
                  institutions, and individuals seeking end-to-end hardware solutions.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/portfolio/tech-store/shop">
                    <Button className="flex items-center gap-1">
                      Browse Products <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="SL Tech Store"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Specializations</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a wide range of premium IT hardware and services to meet your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {services.services.map((service) => {
                const IconComponent = icons[service.iconName as keyof typeof icons] || Laptop

                return (
                  <div
                    key={service.id}
                    className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <Link href={`/portfolio/tech-store/shop?category=${service.name}`}>
                      <Button variant="outline" className="w-full">
                        Explore
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Featured Products</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our selection of premium IT hardware and accessories.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col space-y-3 rounded-lg border bg-card p-4 shadow-sm">
                  <div className="aspect-square overflow-hidden rounded-md">
                    <img
                      src={`/placeholder.svg?height=200&width=200&text=Product+${i}`}
                      alt={`Product ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Premium Laptop {i}</h3>
                    <p className="text-sm text-muted-foreground">High-performance laptop for business use</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">$1,299.99</p>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/portfolio/tech-store/shop">
                <Button>
                  View All Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Business Solutions Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Business Solutions"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Business Solutions</h2>
                <p className="text-muted-foreground md:text-lg">
                  We offer comprehensive IT solutions for businesses of all sizes. From equipment leasing and
                  procurement programs to on-site installation and setup services, we have everything you need to power
                  your business technology ecosystem.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                    <span>Equipment leasing and procurement programs</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                    <span>On-site installation and setup services</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                    <span>Warranty tracking and inventory management</span>
                  </li>
                  <li className="flex items-center">
                    <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
                    <span>Bulk supply solutions for enterprises</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/contact?subsidiary=tech-store&business=true">
                    <Button className="flex items-center gap-1">
                      Contact Business Sales <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Upgrade Your Technology?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Visit our store or shop online to explore our premium selection of IT hardware and services.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/portfolio/tech-store/shop">
                  <Button variant="secondary" className="w-full bg-white text-green-600 hover:bg-white/90">
                    Shop Now
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

