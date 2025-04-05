// import { db } from "@/db"
// import { subsidiaries, services, testimonials } from "@/db/schema"

// async function seed() {
//   console.log("Seeding database...")

//   try {
//     // Clear existing data
//     await db.delete(testimonials)
//     await db.delete(services)
//     await db.delete(subsidiaries)

//     // Insert subsidiaries
//     const [techSubsidiary] = await db
//       .insert(subsidiaries)
//       .values({
//         name: "SL Tech Innovators",
//         slug: "tech",
//         tagline: "Empowering Businesses with Smart IT Solutions",
//         description:
//           "SL Tech Innovators delivers comprehensive technology services designed to transform business operations and drive digital excellence.",
//         iconName: "Building2",
//         primaryColor: "blue-600",
//         secondaryColor: "blue-800",
//       })
//       .returning()

//     const [eventsSubsidiary] = await db
//       .insert(subsidiaries)
//       .values({
//         name: "SL Elite Events",
//         slug: "events",
//         tagline: "Creating Unforgettable Moments, One Event at a Time",
//         description:
//           "SL Elite Events specializes in crafting exceptional experiences through meticulous planning and creative execution.",
//         iconName: "Calendar",
//         primaryColor: "pink-600",
//         secondaryColor: "purple-700",
//       })
//       .returning()

//     const [propertiesSubsidiary] = await db
//       .insert(subsidiaries)
//       .values({
//         name: "SL Prime Properties",
//         slug: "properties",
//         tagline: "Your Gateway to Premium Living and Event Spaces",
//         description: "SL Prime Properties offers an exclusive portfolio of luxury real estate solutions.",
//         iconName: "Home",
//         primaryColor: "amber-600",
//         secondaryColor: "amber-800",
//       })
//       .returning()

//     const [groomingSubsidiary] = await db
//       .insert(subsidiaries)
//       .values({
//         name: "SL Grooming Studio",
//         slug: "grooming",
//         tagline: "Where Style Meets Precision",
//         description: "SL Grooming Studio elevates the traditional salon experience through exceptional service.",
//         iconName: "Scissors",
//         primaryColor: "teal-600",
//         secondaryColor: "teal-800",
//       })
//       .returning()

//     const [stationerySubsidiary] = await db
//       .insert(subsidiaries)
//       .values({
//         name: "SL Stationery Hub",
//         slug: "stationery",
//         tagline: "Your Partner in Creativity and Productivity",
//         description: "SL Stationery Hub provides premium writing instruments, paper products, and printing services.",
//         iconName: "PenTool",
//         primaryColor: "indigo-600",
//         secondaryColor: "purple-600",
//       })
//       .returning()

//     const [liquorSubsidiary] = await db
//       .insert(subsidiaries)
//       .values({
//         name: "SL Liquor & Market",
//         slug: "liquor",
//         tagline: "Premium Convenience at Your Fingertips",
//         description:
//           "SL Liquor & Market brings together the best of both worlds - a carefully curated liquor selection alongside daily grocery essentials.",
//         iconName: "Wine",
//         primaryColor: "red-900",
//         secondaryColor: "red-700",
//       })
//       .returning()

//     // Insert services for Tech subsidiary
//     await db.insert(services).values([
//       {
//         subsidiaryId: techSubsidiary.id,
//         name: "Custom Software Development",
//         description: "We design and develop custom software solutions tailored to your specific business needs.",
//         iconName: "Code",
//       },
//       {
//         subsidiaryId: techSubsidiary.id,
//         name: "IT Support",
//         description: "Our comprehensive IT support services ensure your systems run smoothly.",
//         iconName: "Laptop",
//       },
//       {
//         subsidiaryId: techSubsidiary.id,
//         name: "Cybersecurity",
//         description: "Protect your business from cyber threats with our comprehensive security solutions.",
//         iconName: "ShieldCheck",
//       },
//     ])

//     // Insert testimonials
//     await db.insert(testimonials).values([
//       {
//         subsidiaryId: techSubsidiary.id,
//         quote:
//           "SL Tech Innovators transformed our business with their custom software solution. Our productivity has increased by 35% since implementation.",
//         author: "Sarah Johnson",
//         position: "CTO, Global Retail Inc.",
//         rating: 5,
//       },
//       {
//         subsidiaryId: eventsSubsidiary.id,
//         quote:
//           "SL Elite Events made our wedding day absolutely perfect. Their attention to detail and creative vision exceeded our expectations.",
//         author: "Emily & James",
//         position: "Wedding Clients",
//         rating: 5,
//       },
//       {
//         subsidiaryId: liquorSubsidiary.id,
//         quote:
//           "The wine selection is exceptional, and the staff is incredibly knowledgeable. They helped me select the perfect wine for a special dinner party.",
//         author: "Michael Chen",
//         position: "Regular Customer",
//         rating: 5,
//       },
//     ])

//     console.log("Database seeded successfully!")
//   } catch (error) {
//     console.error("Error seeding database:", error)
//     process.exit(1)
//   }
// }

// seed()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error("Seed script failed:", error)
//     process.exit(1)
//   })


import { db } from "@/db"
import {
  subsidiaries,
  services,
  testimonials,
  users,
  products,
  blogPosts,
  jobListings,
  socialMediaPosts,
} from "@/db/schema"
import bcrypt from "bcryptjs"

async function seed() {
  console.log("Seeding database...")

  try {
    // Clear existing data
    await db.delete(socialMediaPosts)
    await db.delete(jobListings)
    await db.delete(blogPosts)
    await db.delete(products)
    await db.delete(testimonials)
    await db.delete(services)
    await db.delete(users)
    await db.delete(subsidiaries)

    // Insert subsidiaries - only Tech and Liquor are active
    const [techSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Tech Innovators",
        slug: "tech",
        tagline: "Empowering Businesses with Smart IT Solutions. Custom software development, IT support,cybersecurity, and more.",
        description:
          "SL Tech Innovators delivers comprehensive technology services designed to transform business operations and drive digital excellence.",
        iconName: "Building2",
        primaryColor: "blue-600",
        secondaryColor: "blue-800",
        isActive: true,
      })
      .returning()

    const [eventsSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Elite Events",
        slug: "events",
        tagline: "Creating Unforgettable Moments, One Event at a Time. Wedding planning, corporate events, themed parties, and more.",
        description:
          "SL Elite Events specializes in crafting exceptional experiences through meticulous planning and creative execution.",
        iconName: "Calendar",
        primaryColor: "pink-600",
        secondaryColor: "purple-700",
        isActive: false, // Inactive
      })
      .returning()

    const [propertiesSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Prime Properties",
        slug: "properties",
        tagline: "Your Gateway to Premium Living and Event Spaces. Luxury apartments, event venues, and property management.",
        description: "SL Prime Properties offers an exclusive portfolio of luxury real estate solutions.",
        iconName: "Home",
        primaryColor: "amber-600",
        secondaryColor: "amber-800",
        isActive: false, // Inactive
      })
      .returning()

    const [groomingSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Grooming Studio",
        slug: "grooming",
        tagline: "Where Style Meets Precision. Premium salon offering haircuts, grooming, and styling services for all genders.",
        description: "SL Grooming Studio elevates the traditional salon experience through exceptional service.",
        iconName: "Scissors",
        primaryColor: "teal-600",
        secondaryColor: "teal-800",
        isActive: false, // Inactive
      })
      .returning()

    const [stationerySubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Stationery Hub",
        slug: "stationery",
        tagline: "Your Partner in Creativity and Productivity. High-quality office supplies, art materials, and custom printing services.",
        description: "SL Stationery Hub provides premium writing instruments, paper products, and printing services.",
        iconName: "PenTool",
        primaryColor: "indigo-600",
        secondaryColor: "purple-600",
        isActive: false, // Inactive
      })
      .returning()

    const [liquorSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Liquor & Market",
        slug: "liquor",
        tagline: "Premium Convenience at Your Fingertips. Curated selection of fine wines, craft beers, spirits, and gourmet groceries.",
        description:
          "SL Liquor & Market brings together the best of both worlds - a carefully curated liquor selection alongside daily grocery essentials.",
        iconName: "Wine",
        primaryColor: "red-900",
        secondaryColor: "red-700",
        isActive: true,
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

    // Insert services for Liquor subsidiary
    await db.insert(services).values([
      {
        subsidiaryId: liquorSubsidiary.id,
        name: "Premium Beverages",
        description:
          "Discover our extensive collection of fine wines, craft beers, and premium spirits from around the world.",
        iconName: "Wine",
      },
      {
        subsidiaryId: liquorSubsidiary.id,
        name: "Gourmet Market",
        description:
          "Shop our selection of high-quality groceries, fresh produce, and everyday essentials for your convenience.",
        iconName: "ShoppingCart",
      },
      {
        subsidiaryId: liquorSubsidiary.id,
        name: "Delivery Services",
        description: "Enjoy the convenience of home delivery and subscription services for your favorite products.",
        iconName: "Truck",
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
        subsidiaryId: liquorSubsidiary.id,
        quote:
          "The wine selection is exceptional, and the staff is incredibly knowledgeable. They helped me select the perfect wine for a special dinner party.",
        author: "Michael Chen",
        position: "Regular Customer",
        rating: 5,
      },
    ])

    // Create admin user
    const adminPasswordHash = await bcrypt.hash("admin123", 10)
    await db.insert(users).values({
      email: "admin@slgroup.com",
      passwordHash: adminPasswordHash,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    })

    // Create subsidiary admin users
    const userPasswordHash = await bcrypt.hash("password123", 10)
    await db.insert(users).values([
      {
        email: "tech@slgroup.com",
        passwordHash: userPasswordHash,
        firstName: "Tech",
        lastName: "Admin",
        role: "subsidiary_admin",
        subsidiaryId: techSubsidiary.id,
      },
      {
        email: "liquor@slgroup.com",
        passwordHash: userPasswordHash,
        firstName: "Liquor",
        lastName: "Admin",
        role: "subsidiary_admin",
        subsidiaryId: liquorSubsidiary.id,
      },
    ])

    // Create customer user
    await db.insert(users).values({
      email: "customer@example.com",
      passwordHash: userPasswordHash,
      firstName: "John",
      lastName: "Customer",
      role: "customer",
    })

    // Insert products for Liquor & Market
    await db.insert(products).values([
      {
        name: "Château Grand Reserve",
        description: "2018 Bordeaux Blend, France. A premium red wine with notes of black currant, cedar, and tobacco.",
        price: 8999, // $89.99
        category: "wine",
        stock: 24,
        isActive: true,
      },
      {
        name: "Highland Single Malt",
        description: "18-Year Aged Whiskey, Scotland. Smooth with hints of honey, oak, and a gentle smoky finish.",
        price: 12999, // $129.99
        category: "spirits",
        stock: 15,
        isActive: true,
      },
      {
        name: "Craft IPA Collection",
        description: "Set of 6 premium craft IPAs from local breweries. Variety of hoppy flavors and strengths.",
        price: 1899, // $18.99
        category: "beer",
        stock: 50,
        isActive: true,
      },
    ])

    // Insert blog posts
    await db.insert(blogPosts).values([
      {
        title: "The Future of Tech Innovation",
        slug: "future-of-tech-innovation",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        excerpt: "Exploring emerging technologies and their impact on business operations.",
        authorId: 35, // Admin user
        subsidiaryId: techSubsidiary.id,
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        title: "Wine Tasting: A Beginner's Guide",
        slug: "wine-tasting-beginners-guide",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        excerpt: "Learn the basics of wine tasting and how to appreciate different varieties.",
        authorId: 35, // Admin user
        subsidiaryId: liquorSubsidiary.id,
        isPublished: true,
        publishedAt: new Date(),
      },
    ])

    // Insert job listings
    await db.insert(jobListings).values([
      {
        title: "Software Developer",
        description: "We're looking for a talented software developer to join our team.",
        requirements: "3+ years of experience with React, Node.js, and TypeScript.",
        location: "Remote",
        type: "Full-time",
        subsidiaryId: techSubsidiary.id,
        isActive: true,
      },
      {
        title: "Sales Associate",
        description: "Join our team as a sales associate at SL Liquor & Market.",
        requirements: "Previous retail experience and knowledge of wines and spirits.",
        location: "On-site",
        type: "Full-time",
        subsidiaryId: liquorSubsidiary.id,
        isActive: true,
      },
    ])

    // Insert social media posts
    await db.insert(socialMediaPosts).values([
      {
        platform: "instagram",
        postUrl: "https://instagram.com/p/example1",
        imageUrl: "/placeholder.svg?height=300&width=300",
        caption: "Exploring new tech innovations at our R&D center! #SLTech #Innovation",
        subsidiaryId: techSubsidiary.id,
      },
      {
        platform: "instagram",
        postUrl: "https://instagram.com/p/example2",
        imageUrl: "/placeholder.svg?height=300&width=300",
        caption: "New wine collection just arrived! Come taste it this weekend. #SLLiquor #WineTasting",
        subsidiaryId: liquorSubsidiary.id,
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


