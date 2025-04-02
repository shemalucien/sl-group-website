import Link from "next/link"
import { Building2, Calendar, Home, Scissors, PenTool, Wine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSubsidiaries } from "@/lib/data";

// export default async function PortfolioPage() {
//   const subsidiaries = await getSubsidiaries();
//   console.log(subsidiaries);
//   return (
//     <main className="flex-1">
//       <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="space-y-2">
//               <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Portfolio</h1>
//               <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
//                 Discover our specialized subsidiaries, each designed to address unique market needs with cutting-edge
//                 solutions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full py-12 md:py-24 lg:py-32" id="tech">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
//             <div className="space-y-4">
//               <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                 <Building2 className="h-6 w-6" />
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter">SL Tech Innovators</h2>
//               <p className="text-xl text-muted-foreground">Empowering Businesses with Smart IT Solutions</p>
//               <p className="text-muted-foreground">
//                 SL Tech Innovators delivers comprehensive technology services designed to transform business operations
//                 and drive digital excellence. Our team of experts provides tailored solutions that enable organizations
//                 to thrive in an increasingly digital landscape.
//               </p>
//               <div className="space-y-2">
//                 <h3 className="font-bold">Specializations:</h3>
//                 <ul className="space-y-1 text-muted-foreground">
//                   <li>• Custom software development</li>
//                   <li>• Enterprise IT support and management</li>
//                   <li>• Advanced cybersecurity solutions</li>
//                   <li>• Cloud infrastructure and migration</li>
//                   <li>• Professional development and technical training programs</li>
//                 </ul>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Link href="/contact?interest=tech">
//                   <Button>Get in Touch</Button>
//                 </Link>
//                 <Link href="/portfolio/tech">
//                   <Button variant="outline">Learn More</Button>
//                 </Link>
//               </div>
//             </div>
//             <div className="rounded-lg bg-muted p-8 h-full">
//               <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
//                 <Building2 className="h-24 w-24 text-primary/60" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="events">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
//             <div className="rounded-lg bg-background p-8 h-full order-last lg:order-first">
//               <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
//                 <Calendar className="h-24 w-24 text-primary/60" />
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                 <Calendar className="h-6 w-6" />
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter">SL Elite Events</h2>
//               <p className="text-xl text-muted-foreground">Creating Unforgettable Moments, One Event at a Time</p>
//               <p className="text-muted-foreground">
//                 SL Elite Events specializes in crafting exceptional experiences through meticulous planning and creative
//                 execution. From corporate functions to personal celebrations, we transform visions into flawlessly
//                 executed events.
//               </p>
//               <div className="space-y-2">
//                 <h3 className="font-bold">Specializations:</h3>
//                 <ul className="space-y-1 text-muted-foreground">
//                   <li>• Luxury wedding planning and coordination</li>
//                   <li>• Corporate events and conferences</li>
//                   <li>• Themed celebrations and milestone occasions</li>
//                   <li>• Dignified funeral and memorial services</li>
//                   <li>• Strategic team retreats and experiences</li>
//                 </ul>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Link href="/contact?interest=events">
//                   <Button>Get in Touch</Button>
//                 </Link>
//                 <Link href="/portfolio/events">
//                   <Button variant="outline">Learn More</Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full py-12 md:py-24 lg:py-32" id="properties">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
//             <div className="space-y-4">
//               <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                 <Home className="h-6 w-6" />
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter">SL Prime Properties</h2>
//               <p className="text-xl text-muted-foreground">Your Gateway to Premium Living and Event Spaces</p>
//               <p className="text-muted-foreground">
//                 SL Prime Properties offers an exclusive portfolio of luxury real estate solutions, from residential
//                 accommodations to sophisticated event venues. We provide discerning clients with spaces that reflect
//                 elegance, comfort, and distinction.
//               </p>
//               <div className="space-y-2">
//                 <h3 className="font-bold">Specializations:</h3>
//                 <ul className="space-y-1 text-muted-foreground">
//                   <li>• Luxury apartment rentals and sales</li>
//                   <li>• Distinctive event venues</li>
//                   <li>• Premium short-term accommodations</li>
//                   <li>• Comprehensive property management services</li>
//                 </ul>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Link href="/contact?interest=properties">
//                   <Button>Get in Touch</Button>
//                 </Link>
//                 <Link href="/portfolio/properties">
//                   <Button variant="outline">Learn More</Button>
//                 </Link>
//               </div>
//             </div>
//             <div className="rounded-lg bg-muted p-8 h-full">
//               <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
//                 <Home className="h-24 w-24 text-primary/60" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="grooming">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
//             <div className="rounded-lg bg-background p-8 h-full order-last lg:order-first">
//               <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
//                 <Scissors className="h-24 w-24 text-primary/60" />
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                 <Scissors className="h-6 w-6" />
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter">SL Grooming Studio</h2>
//               <p className="text-xl text-muted-foreground">Where Style Meets Precision</p>
//               <p className="text-muted-foreground">
//                 SL Grooming Studio elevates the traditional salon experience through exceptional service, master
//                 craftsmanship, and an atmosphere of refined luxury. We cater to clients of all genders who appreciate
//                 precision, style, and the finer details.
//               </p>
//               <div className="space-y-2">
//                 <h3 className="font-bold">Specializations:</h3>
//                 <ul className="space-y-1 text-muted-foreground">
//                   <li>• Custom haircuts and styling for men and women</li>
//                   <li>• Women's specialized hair treatments and styling</li>
//                   <li>• Expert beard grooming and shaping</li>
//                   <li>• Traditional and modern shaving services</li>
//                   <li>• Facial treatments and skincare for all</li>
//                   <li>• Curated selection of premium grooming products</li>
//                 </ul>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Link href="/contact?interest=grooming">
//                   <Button>Get in Touch</Button>
//                 </Link>
//                 <Link href="/portfolio/grooming">
//                   <Button variant="outline">Learn More</Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full py-12 md:py-24 lg:py-32" id="stationery">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
//             <div className="space-y-4">
//               <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                 <PenTool className="h-6 w-6" />
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter">SL Stationery Hub</h2>
//               <p className="text-xl text-muted-foreground">Your Partner in Creativity and Productivity</p>
//               <p className="text-muted-foreground">
//                 SL Stationery Hub provides premium writing instruments, paper products, and printing services that
//                 inspire creativity and enhance productivity. We source exceptional products and deliver customized
//                 solutions for individuals and organizations alike.
//               </p>
//               <div className="space-y-2">
//                 <h3 className="font-bold">Specializations:</h3>
//                 <ul className="space-y-1 text-muted-foreground">
//                   <li>• Premium office supplies and accessories</li>
//                   <li>• Professional-grade art materials</li>
//                   <li>• Custom printing and design services</li>
//                   <li>• Personalized stationery collections</li>
//                   <li>• Corporate and educational bulk ordering programs</li>
//                 </ul>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Link href="/contact?interest=stationery">
//                   <Button>Get in Touch</Button>
//                 </Link>
//                 <Link href="/portfolio/stationery">
//                   <Button variant="outline">Learn More</Button>
//                 </Link>
//               </div>
//             </div>
//             <div className="rounded-lg bg-muted p-8 h-full">
//               <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
//                 <PenTool className="h-24 w-24 text-primary/60" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="liquor">
//         <div className="container px-4 md:px-6">
//           <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
//             <div className="rounded-lg bg-background p-8 h-full order-last lg:order-first">
//               <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
//                 <Wine className="h-24 w-24 text-primary/60" />
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                 <Wine className="h-6 w-6" />
//               </div>
//               <h2 className="text-3xl font-bold tracking-tighter">SL Liquor & Market</h2>
//               <p className="text-xl text-muted-foreground">Premium Convenience at Your Fingertips</p>
//               <p className="text-muted-foreground">
//                 SL Liquor & Market offers a curated selection of alcoholic beverages, gourmet groceries, and everyday
//                 essentials. We provide discerning clients with convenience and quality.
//               </p>
//               <div className="space-y-2">
//                 <h3 className="font-bold">Specializations:</h3>
//                 <ul className="space-y-1 text-muted-foreground">
//                   <li>• Curated selection of alcoholic beverages</li>
//                   <li>• Gourmet groceries</li>
//                   <li>• Everyday essentials</li>
//                 </ul>
//               </div>
//               <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                 <Link href="/contact?interest=liquor">
//                   <Button>Get in Touch</Button>
//                 </Link>
//                 <Link href="/portfolio/liquor">
//                   <Button variant="outline">Learn More</Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
//         <div className="container px-4 md:px-6">
//           <div className="flex flex-col items-center justify-center space-y-4 text-center">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter">Join Our Journey</h2>
//               <p className="mx-auto max-w-[700px] md:text-xl">
//                 Whether you're an entrepreneur seeking technological transformation, a couple planning your perfect
//                 wedding, a property investor, someone looking for premium grooming services, or a business needing
//                 quality stationery solutions—SL Group invites you to experience our difference.
//               </p>
//             </div>
//             <div>
//               <Link href="/contact">
//                 <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
//                   Contact Us Today
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }


export default async function PortfolioPage() {
  const subsidiaries = await getSubsidiaries();
  
  // Define the order of sections if needed
  const sectionOrder = ['tech', 'events', 'properties', 'grooming', 'stationery', 'liquor'];
  
  // Sort subsidiaries based on predefined order
  const sortedSubsidiaries = [...subsidiaries].sort((a, b) => 
    sectionOrder.indexOf(a.slug) - sectionOrder.indexOf(b.slug)
  );

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Portfolio</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover our specialized subsidiaries, each designed to address unique market needs with cutting-edge
                solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {sortedSubsidiaries.map((subsidiary, index) => {
        // Determine if the section should have a muted background (alternating)
        const isMutedBg = index % 2 !== 0;
        // Determine if the image should be on the left (for even indexes)
        const isImageLeft = index % 2 === 0;
        
        // Get the icon component based on iconName
        const IconComponent = getIconComponent(subsidiary.iconName);
        
        return (
          <section 
            key={subsidiary.id} 
            className={`w-full py-12 md:py-24 lg:py-32 ${isMutedBg ? 'bg-muted' : ''}`} 
            id={subsidiary.slug}
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                {isImageLeft ? (
                  <>
                    <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h2 className="text-3xl font-bold tracking-tighter">{subsidiary.name}</h2>
                      <p className="text-xl text-muted-foreground">{subsidiary.tagline}</p>
                      <p className="text-muted-foreground">{subsidiary.description}</p>
                      {subsidiary.services && (
                        <div className="space-y-2">
                          <h3 className="font-bold">Specializations:</h3>
                          <ul className="space-y-1 text-muted-foreground">
                            {subsidiary.services.map((service, i) => (
                              <li key={i}>• {service.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href={`/contact?interest=${subsidiary.slug}`}>
                          <Button>Get in Touch</Button>
                        </Link>
                        <Link href={`/portfolio/${subsidiary.slug}`}>
                          <Button variant="outline">Learn More</Button>
                        </Link>
                      </div>
                    </div>
                    <div className="rounded-lg bg-muted p-8 h-full">
                      <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
                        <IconComponent className="h-24 w-24 text-primary/60" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-lg bg-background p-8 h-full order-last lg:order-first">
                      <div className="aspect-video rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 flex items-center justify-center">
                        <IconComponent className="h-24 w-24 text-primary/60" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h2 className="text-3xl font-bold tracking-tighter">{subsidiary.name}</h2>
                      <p className="text-xl text-muted-foreground">{subsidiary.tagline}</p>
                      <p className="text-muted-foreground">{subsidiary.description}</p>
                      {subsidiary.services && (
                        <div className="space-y-2">
                          <h3 className="font-bold">Specializations:</h3>
                          <ul className="space-y-1 text-muted-foreground">
                            {subsidiary.services.map((service, i) => (
                              <li key={i}>• {service.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="flex flex-col gap-2 min-[400px]:flex-row">
                        <Link href={`/contact?interest=${subsidiary.slug}`}>
                          <Button>Get in Touch</Button>
                        </Link>
                        <Link href={`/portfolio/${subsidiary.slug}`}>
                          <Button variant="outline">Learn More</Button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">Join Our Journey</h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Whether you're an entrepreneur seeking technological transformation, a couple planning your perfect
                wedding, a property investor, someone looking for premium grooming services, or a business needing
                quality stationery solutions—SL Group invites you to experience our difference.
              </p>
            </div>
            <div>
              <Link href="/contact">
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Contact Us Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper function to get the icon component based on iconName
function getIconComponent(iconName: string) {
  switch (iconName) {
    case 'Building2':
      return Building2;
    case 'Calendar':
      return Calendar;
    case 'Home':
      return Home;
    case 'Scissors':
      return Scissors;
    case 'PenTool':
      return PenTool;
    case 'Wine':
      return Wine;
    default:
      return Building2;
  }
}