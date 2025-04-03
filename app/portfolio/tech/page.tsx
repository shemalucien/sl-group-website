import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, ShieldCheck, Cloud, Laptop, GraduationCap, ChevronLeft, ArrowRight } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import VideoPlayer from "@/components/video-player"

export default function TechPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative">
        <div className="container px-4 md:px-6 relative z-10">
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
                SL Tech Innovators
              </h1>
              <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
                Empowering Businesses with Smart IT Solutions
              </p>
            </div>
            <div className="space-x-4">
              <Link href="#services">
                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-white/90">
                  Our Services
                </Button>
              </Link>
              <Link href="/contact?interest=tech">
                <Button variant="secondary" className="bg-white text-blue-700 hover:bg-white/90">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 w-full h-full">
            <img 
              src="/tech-teamwork.jpg" 
              alt="Background" 
              className="w-full h-full object-cover opacity-40"
            />
          </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">About SL Tech Innovators</h2>
              <p className="text-muted-foreground md:text-lg">
                SL Tech Innovators delivers comprehensive technology services designed to transform business operations
                and drive digital excellence. Our team of experts provides tailored solutions that enable organizations
                to thrive in an increasingly digital landscape.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Founded in 2015, we've grown from a small IT consultancy to a full-service technology partner for
                businesses of all sizes. Our mission is to simplify technology and make it work for you, not the other
                way around.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">200+</span>
                  <span className="text-sm text-muted-foreground">Clients Served</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">50+</span>
                  <span className="text-sm text-muted-foreground">Tech Experts</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">98%</span>
                  <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <span className="text-3xl font-bold text-primary">24/7</span>
                  <span className="text-sm text-muted-foreground">Support Available</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/tech-teamwork.jpg?height=600&width=800"
                alt="SL Tech Innovators Team"
                width={800}
                height={600}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <p className="text-white font-medium">Our dedicated team of technology experts</p>
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
                We offer a comprehensive range of technology services to meet your business needs.
              </p>
            </div>
          </div>

          <Tabs defaultValue="software" className="mt-12">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="software">Software Dev</TabsTrigger>
              <TabsTrigger value="it">IT Support</TabsTrigger>
              <TabsTrigger value="security">Cybersecurity</TabsTrigger>
              <TabsTrigger value="cloud">Cloud Solutions</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
            </TabsList>

            <TabsContent value="software" className="mt-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Custom Software Development</h3>
                  <p className="text-muted-foreground">
                    We design and develop custom software solutions tailored to your specific business needs. Our
                    development process is collaborative, transparent, and focused on delivering value.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Web application development</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Mobile app development (iOS & Android)</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Enterprise software solutions</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>API development and integration</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Legacy system modernization</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/contact?interest=tech&service=software">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/Custom-software-development.jpg?height=600&width=800"
                    alt="Custom Software Development"
                    width={800}
                    height={600}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="it" className="mt-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <Laptop className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Enterprise IT Support</h3>
                  <p className="text-muted-foreground">
                    Our comprehensive IT support services ensure your systems run smoothly, minimizing downtime and
                    maximizing productivity. We offer both on-site and remote support options.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>24/7 helpdesk support</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Network management and monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Hardware and software troubleshooting</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>IT infrastructure management</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Preventive maintenance</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/contact?interest=tech&service=it">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/Enterprise IT Support.jpg?height=600&width=800"
                    alt="IT Support Services"
                    width={800}
                    height={600}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Advanced Cybersecurity</h3>
                  <p className="text-muted-foreground">
                    Protect your business from cyber threats with our comprehensive security solutions. We help you
                    identify vulnerabilities, implement robust security measures, and respond effectively to incidents.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Security assessments and audits</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Endpoint protection</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Network security</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Data protection and encryption</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Security awareness training</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/contact?interest=tech&service=security">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/Advanced Cybersecurity.jpg?height=600&width=800"
                    alt="Cybersecurity Services"
                    width={800}
                    height={600}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cloud" className="mt-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <Cloud className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Cloud Infrastructure</h3>
                  <p className="text-muted-foreground">
                    Leverage the power of cloud computing to enhance scalability, flexibility, and cost-efficiency. We
                    help you migrate to the cloud, optimize your infrastructure, and manage your cloud resources.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Cloud migration strategy and implementation</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Multi-cloud and hybrid cloud solutions</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Cloud security and compliance</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Cloud cost optimization</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Managed cloud services</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/contact?interest=tech&service=cloud">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/Cloud Infrastructure.png?height=600&width=800"
                    alt="Cloud Infrastructure Services"
                    width={800}
                    height={600}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="training" className="mt-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Professional Development</h3>
                  <p className="text-muted-foreground">
                    Invest in your team's skills with our comprehensive training programs. We offer customized training
                    solutions to help your employees stay up-to-date with the latest technologies and best practices.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Technical skills training</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Cybersecurity awareness</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Software and application training</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>IT certification preparation</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Custom training programs</span>
                    </li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/contact?interest=tech&service=training">
                      <Button>Get Started</Button>
                    </Link>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src="/Professional Development.png?height=600&width=800"
                    alt="Professional Development Services"
                    width={800}
                    height={600}
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">See Our Work in Action</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Watch how we've helped businesses transform their operations with our technology solutions.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <VideoPlayer
                title="Custom Software Development Case Study"
                description="How we helped a retail chain increase efficiency by 40% with a custom inventory management system."
              />
            </div>
            <div className="space-y-4">
              <VideoPlayer
                title="Cloud Migration Success Story"
                description="See how we helped a financial services firm securely migrate to the cloud, reducing costs by 30%."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">What Our Clients Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Don't just take our word for it. Here's what our clients have to say about working with us.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="SL Tech Innovators transformed our business with their custom software solution. Our productivity has increased by 35% since implementation."
              author="Sarah Johnson"
              position="CTO, Global Retail Inc."
              rating={5}
            />
            <TestimonialCard
              quote="Their cybersecurity team identified vulnerabilities we weren't even aware of and implemented robust protection measures. I can sleep better at night knowing our data is secure."
              author="Michael Chen"
              position="IT Director, Financial Services Co."
              rating={5}
            />
            <TestimonialCard
              quote="The cloud migration was seamless and their ongoing support has been exceptional. We've reduced our IT costs by 25% while improving performance."
              author="Jessica Williams"
              position="Operations Manager, Healthcare Solutions"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Success Stories</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                Explore how we've helped businesses across industries achieve their technology goals.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Retail Case Study"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Global Retail Chain</h3>
                <p className="mt-2 text-muted-foreground">
                  Custom inventory management system that reduced stockouts by 60% and improved order fulfillment.
                </p>
                <Link href="#" className="mt-4 inline-flex items-center text-blue-600 hover:underline">
                  Read Case Study
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Healthcare Case Study"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Healthcare Provider</h3>
                <p className="mt-2 text-muted-foreground">
                  Secure cloud infrastructure that ensured HIPAA compliance while improving data accessibility.
                </p>
                <Link href="#" className="mt-4 inline-flex items-center text-blue-600 hover:underline">
                  Read Case Study
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Financial Services Case Study"
                  width={600}
                  height={400}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">Financial Services Firm</h3>
                <p className="mt-2 text-muted-foreground">
                  Comprehensive cybersecurity overhaul that protected sensitive financial data and ensured regulatory
                  compliance.
                </p>
                <Link href="#" className="mt-4 inline-flex items-center text-blue-600 hover:underline">
                  Read Case Study
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Transform Your Business?</h2>
              <p className="md:text-lg text-white/80">
                Let's discuss how our technology solutions can help you achieve your business goals. Contact us today
                for a free consultation.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/contact?interest=tech">
                  <Button variant="secondary" className="bg-white text-blue-700 hover:bg-white/90">
                    Contact Us
                  </Button>
                </Link>
                <Link href="#services">
                  <Button variant="secondary" className="bg-white text-blue-700 hover:bg-white/90">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg bg-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Schedule a Free Consultation</h3>
                <p className="mb-4 text-white/80">
                  Our technology experts are ready to discuss your business needs and recommend the right solutions.
                </p>
                <Link href="/contact?interest=tech&type=consultation">
                  <Button className="w-full bg-white text-blue-700 hover:bg-white/90">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

