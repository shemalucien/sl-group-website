// import type { Metadata } from "next"
// import { getSubsidiaryBySlug, getSubsidiaryServices } from "@/lib/data"
// import { notFound } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { ArrowRight, Code, HelpCircle, Shield, Cloud, GraduationCap } from "lucide-react"

// export const metadata: Metadata = {
//   title: "SL Tech Solutions | SL Group",
//   description: "Quality Technology, Expert Guidance, Complete Solutions",
// }

// export default async function TechSolutionsPage() {
//   const subsidiary = await getSubsidiaryBySlug("tech-solutions")

//   if (!subsidiary) {
//     notFound()
//   }

//   const services = await getSubsidiaryServices(subsidiary.id)
//   console.log("Services:", services)
//   if (!services) {
//     notFound()
//   }

//   const icons = {
//     code: Code,
//     "help-circle": HelpCircle,
//     shield: Shield,
//     cloud: Cloud,
//     "graduation-cap": GraduationCap,
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
//                   SL Tech Solutions
//                 </h1>
//                 <p className="mx-auto max-w-[700px] md:text-xl">{subsidiary.tagline}</p>
//               </div>
//               <div className="space-x-4">
//                 <Link href="/contact?subsidiary=tech-solutions">
//                   <Button variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
//                     Get a Consultation
//                   </Button>
//                 </Link>
//                 <Link href="#services">
//                   <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
//                     Our Services
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Overview Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
//               <div>
//                 <div className="rounded-lg overflow-hidden">
//                   <img
//                     src="/placeholder.svg?height=400&width=600"
//                     alt="SL Tech Solutions Office"
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-4">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Overview</h2>
//                 <p className="text-muted-foreground md:text-lg">
//                   SL Tech Solutions is your comprehensive technology partner, delivering a premium retail and service
//                   experience. We specialize in curated IT hardware, professional consulting, white-glove implementation,
//                   and ongoing support—everything you need to power your personal or business technology ecosystem.
//                 </p>
//                 <h3 className="text-xl font-bold">Our Mission</h3>
//                 <p className="text-muted-foreground">
//                   To empower businesses, institutions, and individuals by delivering reliable, premium-grade technology
//                   solutions paired with expert services—providing a seamless, end-to-end digital experience.
//                 </p>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Link href="/contact?subsidiary=tech-solutions">
//                     <Button className="flex items-center gap-1">
//                       Contact Us <ArrowRight className="h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Services Section */}
//         <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Services</h2>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   We offer a comprehensive range of technology services to meet your business needs.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
//               {services.map((service) => {
//                 const IconComponent = icons[service.iconName as keyof typeof icons] || Code

//                 return (
//                   <div
//                     key={service.id}
//                     className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm"
//                   >
//                     <div className="space-y-2">
//                       <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
//                         <IconComponent className="h-6 w-6" />
//                       </div>
//                       <h3 className="font-bold">{service.name}</h3>
//                       <p className="text-sm text-muted-foreground">{service.description}</p>
//                     </div>
//                     <Link href={`/contact?service=${service.name}&subsidiary=tech-solutions`}>
//                       <Button variant="outline" className="w-full">
//                         Learn More
//                       </Button>
//                     </Link>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Us Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose Us</h2>
//                 <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   What sets SL Tech Solutions apart from the competition.
//                 </p>
//               </div>
//             </div>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
//               <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
//                 <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
//                   <Shield className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">Expert Team</h3>
//                 <p className="text-muted-foreground">
//                   Our team consists of certified professionals with years of experience in the technology industry.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
//                 <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
//                   <Cloud className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">Cutting-Edge Solutions</h3>
//                 <p className="text-muted-foreground">
//                   We stay at the forefront of technology to provide you with the most innovative solutions.
//                 </p>
//               </div>
//               <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
//                 <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
//                   <HelpCircle className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-bold">Dedicated Support</h3>
//                 <p className="text-muted-foreground">
//                   We provide ongoing support to ensure your technology solutions continue to meet your needs.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
//                   Ready to Transform Your Technology?
//                 </h2>
//                 <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//                   Contact us today to discuss how SL Tech Solutions can help your business thrive in the digital age.
//                 </p>
//               </div>
//               <div className="w-full max-w-sm space-y-2">
//                 <Link href="/contact?subsidiary=tech-solutions">
//                   <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-white/90">
//                     Get Started Today
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

import type { Metadata } from "next"
import { getSubsidiaryBySlug, getSubsidiaryServices } from "@/lib/data"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Code, HelpCircle, Shield, Cloud, GraduationCap } from "lucide-react"

export const metadata: Metadata = {
  title: "SL Tech Solutions | SL Group",
  description: "Quality Technology, Expert Guidance, Complete Solutions",
}

export default async function TechSolutionsPage() {
  const subsidiary = await getSubsidiaryBySlug("tech-solutions")

  if (!subsidiary) {
    notFound()
  }

  const services = await getSubsidiaryServices(subsidiary.id)
  console.log("Services:", services)
  if (!services) {
    notFound()
  }

  const icons = {
    code: Code,
    "help-circle": HelpCircle,
    shield: Shield,
    cloud: Cloud,
    "graduation-cap": GraduationCap,
  }

   // Assuming children data is part of the subsidiary object
   const children = subsidiary.children || []

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  SL Tech Solutions
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">{subsidiary.tagline}</p>
              </div>
              <div className="space-x-4">
                <Link href="/contact?subsidiary=tech-solutions">
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
                    Get a Consultation
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
              <div>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="SL Tech Solutions Office"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Overview</h2>
                <p className="text-muted-foreground md:text-lg">
                  SL Tech Solutions is your comprehensive technology partner, delivering a premium retail and service
                  experience. We specialize in curated IT hardware, professional consulting, white-glove implementation,
                  and ongoing support—everything you need to power your personal or business technology ecosystem.
                </p>
                <h3 className="text-xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower businesses, institutions, and individuals by delivering reliable, premium-grade technology
                  solutions paired with expert services—providing a seamless, end-to-end digital experience.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/contact?subsidiary=tech-solutions">
                    <Button className="flex items-center gap-1">
                      Contact Us <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

         {/* Children Section */}
         <section id="children" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Subsidiaries</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SL Tech Solutions proudly supports its subsidiaries in delivering specialized services.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm"
                >
                  <div className="space-y-2">
                    <h3 className="font-bold">{child.name}</h3>
                    <p className="text-sm text-muted-foreground">{child.tagline}</p>
                    <p className="text-sm text-muted-foreground">{child.description}</p>
                  </div>
                  <Link href={`/portfolio/${child.slug}`}>
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Services</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a comprehensive range of technology services to meet your business needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {services.services.map((service) => {
                const IconComponent = icons[service.iconName as keyof typeof icons] || Code

                return (
                  <div
                    key={service.id}
                    className="flex flex-col justify-between space-y-4 rounded-lg border bg-card p-6 shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <Link href={`/contact?service=${service.name}&subsidiary=tech-solutions`}>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose Us</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  What sets SL Tech Solutions apart from the competition.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Expert Team</h3>
                <p className="text-muted-foreground">
                  Our team consists of certified professionals with years of experience in the technology industry.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <Cloud className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Cutting-Edge Solutions</h3>
                <p className="text-muted-foreground">
                  We stay at the forefront of technology to provide you with the most innovative solutions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 text-center shadow-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  We provide ongoing support to ensure your technology solutions continue to meet your needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Technology?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contact us today to discuss how SL Tech Solutions can help your business thrive in the digital age.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link href="/contact?subsidiary=tech-solutions">
                  <Button variant="secondary" className="w-full bg-white text-blue-600 hover:bg-white/90">
                    Get Started Today
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


