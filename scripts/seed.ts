import { db } from "@/db"
import { subsidiaries, services, testimonials } from "@/db/schema"

async function seed() {
  console.log("Seeding database...")

  try {
    // Clear existing data
    await db.delete(testimonials)
    await db.delete(services)
    await db.delete(subsidiaries)

    // Insert subsidiaries
    const [techSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Tech Innovators",
        slug: "tech",
        tagline: "Empowering Businesses with Smart IT Solutions",
        description:
          "SL Tech Innovators delivers comprehensive technology services designed to transform business operations and drive digital excellence.",
        iconName: "Building2",
        primaryColor: "blue-600",
        secondaryColor: "blue-800",
      })
      .returning()

    const [eventsSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Elite Events",
        slug: "events",
        tagline: "Creating Unforgettable Moments, One Event at a Time",
        description:
          "SL Elite Events specializes in crafting exceptional experiences through meticulous planning and creative execution.",
        iconName: "Calendar",
        primaryColor: "pink-600",
        secondaryColor: "purple-700",
      })
      .returning()

    const [propertiesSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Prime Properties",
        slug: "properties",
        tagline: "Your Gateway to Premium Living and Event Spaces",
        description: "SL Prime Properties offers an exclusive portfolio of luxury real estate solutions.",
        iconName: "Home",
        primaryColor: "amber-600",
        secondaryColor: "amber-800",
      })
      .returning()

    const [groomingSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Grooming Studio",
        slug: "grooming",
        tagline: "Where Style Meets Precision",
        description: "SL Grooming Studio elevates the traditional salon experience through exceptional service.",
        iconName: "Scissors",
        primaryColor: "teal-600",
        secondaryColor: "teal-800",
      })
      .returning()

    const [stationerySubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Stationery Hub",
        slug: "stationery",
        tagline: "Your Partner in Creativity and Productivity",
        description: "SL Stationery Hub provides premium writing instruments, paper products, and printing services.",
        iconName: "PenTool",
        primaryColor: "indigo-600",
        secondaryColor: "purple-600",
      })
      .returning()

    const [liquorSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Liquor & Market",
        slug: "liquor",
        tagline: "Premium Convenience at Your Fingertips",
        description:
          "SL Liquor & Market brings together the best of both worlds - a carefully curated liquor selection alongside daily grocery essentials.",
        iconName: "Wine",
        primaryColor: "red-900",
        secondaryColor: "red-700",
      })
      .returning()

    // Insert services for Tech subsidiary
    await db.insert(services).values([
      {
        subsidiaryId: techSubsidiary.id,
        name: "Custom Software Development",
        description: "We design and develop custom software solutions tailored to your specific business needs.",
        iconName: "Code",
      },
      {
        subsidiaryId: techSubsidiary.id,
        name: "IT Support",
        description: "Our comprehensive IT support services ensure your systems run smoothly.",
        iconName: "Laptop",
      },
      {
        subsidiaryId: techSubsidiary.id,
        name: "Cybersecurity",
        description: "Protect your business from cyber threats with our comprehensive security solutions.",
        iconName: "ShieldCheck",
      },
    ])

    // Insert testimonials
    await db.insert(testimonials).values([
      {
        subsidiaryId: techSubsidiary.id,
        quote:
          "SL Tech Innovators transformed our business with their custom software solution. Our productivity has increased by 35% since implementation.",
        author: "Sarah Johnson",
        position: "CTO, Global Retail Inc.",
        rating: 5,
      },
      {
        subsidiaryId: eventsSubsidiary.id,
        quote:
          "SL Elite Events made our wedding day absolutely perfect. Their attention to detail and creative vision exceeded our expectations.",
        author: "Emily & James",
        position: "Wedding Clients",
        rating: 5,
      },
      {
        subsidiaryId: liquorSubsidiary.id,
        quote:
          "The wine selection is exceptional, and the staff is incredibly knowledgeable. They helped me select the perfect wine for a special dinner party.",
        author: "Michael Chen",
        position: "Regular Customer",
        rating: 5,
      },
    ])

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed script failed:", error)
    process.exit(1)
  })

