import { db } from "@/db";
import {
  subsidiaries,
  services,
  testimonials,
  users,
  products,
  blogPosts,
  jobListings,
  socialMediaPosts,
  blogPostCategories,
  blogComments,
  blogCategories,
  teamMembers,
  sessions,
  employees,
  inventory
} from "@/db/schema";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  try {
    // Clear existing data
    await db.delete(socialMediaPosts);
    await db.delete(jobListings);
    await db.delete(blogPosts);
    await db.delete(products);
    await db.delete(testimonials);
    await db.delete(services);
    await db.delete(sessions);
    await db.delete(teamMembers);
    await db.delete(employees);
    await db.delete(users);
    await db.delete(subsidiaries);
    await db.delete(blogPostCategories);
    await db.delete(blogComments);
    await db.delete(inventory);

    // Insert SL Tech Solutions (parent)
    const [techSolutions] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Tech Solutions",
        slug: "tech-solutions",
        tagline: "Quality Technology, Expert Guidance, Complete Solutions",
        mission:
          "To empower businesses, institutions, and individuals by delivering reliable, premium-grade technology solutions paired with expert services—providing a seamless, end-to-end digital experience.",
        objective:
          "To deliver a premium retail and service experience through curated IT hardware, expert consulting, and ongoing support.",
        description:
          "SL Tech Solutions is your comprehensive technology partner, delivering a premium retail and service experience. We specialize in curated IT hardware, professional consulting, white-glove implementation, and ongoing support—everything you need to power your personal or business technology ecosystem.",
        iconName: "laptop",
        primaryColor: "#3B82F6",
        secondaryColor: "#93C5FD",
        isActive: true,
        logoUrl: "/logos/tech-solutions.png",
        coverImageUrl: "/covers/tech-solutions.jpg",
        address: "123 Tech Avenue, Silicon Valley, CA",
        phone: "+1-800-123-4567",
        email: "info@sltechsolutions.com",
        website: "https://www.sltechsolutions.com",
        socialMediaLinks: {
          facebook: "https://facebook.com/sltechsolutions",
          twitter: "https://twitter.com/sltechsolutions",
          linkedin: "https://linkedin.com/company/sltechsolutions",
        },
      })
      .returning();

    // Insert SL Tech Innovators (child)
    const [techInnovators] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Tech Innovators",
        slug: "tech-innovators",
        tagline: "Empowering Businesses with Smart IT Solutions.",
        mission:
          "To help businesses streamline operations, enhance productivity, and achieve their goals through innovative technology.",
        objective:
          "Deliver smart IT solutions for digital transformation and business growth.",
        description:
          "SL Tech Innovators delivers comprehensive technology services designed to transform business operations and drive digital excellence. Our team of experts provides tailored solutions that enable organizations to thrive in an increasingly digital landscape.",
        iconName: "Building2",
        primaryColor: "blue-600",
        secondaryColor: "blue-800",
        isActive: true,
        parentId: techSolutions.id,
        logoUrl: "/logos/tech-innovators.png",
        coverImageUrl: "/covers/tech-innovators.jpg",
        address: "456 Innovation Drive, Silicon Valley, CA",
        phone: "+1-800-456-7890",
        email: "contact@sltechinnovators.com",
        website: "https://www.sltechinnovators.com",
        socialMediaLinks: {
          linkedin: "https://linkedin.com/company/sltechinnovators",
        },
      })
      .returning();

    // Insert SL Tech Store (child)
    const [techStore] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Tech Store",
        slug: "tech-store",
        tagline: "Your One-Stop IT Solutions Hub.",
        mission:
          "To be the go-to provider of high-quality, reliable IT equipment and support for businesses, institutions, and individuals seeking end-to-end hardware solutions.",
        objective:
          "Provide seamless retail experiences and expert-backed hardware solutions for every type of user.",
        description:
          "SL Tech Store delivers a seamless technology retail experience by offering a curated selection of premium hardware backed by expert services. Whether you’re a business scaling up or an individual upgrading your setup, we provide the right tools and support to power your productivity.",
        iconName: "monitor",
        primaryColor: "#10B981",
        secondaryColor: "#6EE7B7",
        isActive: true,
        parentId: techSolutions.id,
        logoUrl: "/logos/tech-store.png",
        coverImageUrl: "/covers/tech-store.jpg",
        address: "789 Retail Lane, Silicon Valley, CA",
        phone: "+1-800-987-6543",
        email: "support@sltechstore.com",
        website: "https://www.sltechstore.com",
        socialMediaLinks: {
          instagram: "https://instagram.com/sltechstore",
          facebook: "https://facebook.com/sltechstore",
        },
      })
      .returning();

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
        isActive: false, // Inactive
      })
      .returning();

    const [propertiesSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Prime Properties",
        slug: "properties",
        tagline: "Your Gateway to Premium Living and Event Spaces",
        description:
          "SL Prime Properties offers an exclusive portfolio of luxury real estate solutions.",
        iconName: "Home",
        primaryColor: "amber-600",
        secondaryColor: "amber-800",
        isActive: false, // Inactive
      })
      .returning();

    const [groomingSubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Grooming Studio",
        slug: "grooming",
        tagline: "Where Style Meets Precision",
        description:
          "SL Grooming Studio elevates the traditional salon experience through exceptional service.",
        iconName: "Scissors",
        primaryColor: "teal-600",
        secondaryColor: "teal-800",
        isActive: false, // Inactive
      })
      .returning();

    const [stationerySubsidiary] = await db
      .insert(subsidiaries)
      .values({
        name: "SL Stationery Hub",
        slug: "stationery",
        tagline: "Your Partner in Creativity and Productivity",
        description:
          "SL Stationery Hub provides premium writing instruments, paper products, and printing services.",
        iconName: "PenTool",
        primaryColor: "indigo-600",
        secondaryColor: "purple-600",
        isActive: false, // Inactive
      })
      .returning();

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
        isActive: true,
      })
      .returning();

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
        description:
          "Enjoy the convenience of home delivery and subscription services for your favorite products.",
        iconName: "Truck",
      },
    ]);

    await db.insert(services).values([
      {
        subsidiaryId: techInnovators.id,
        name: "Custom Software Development",
        description:
          "Tailored software solutions designed to meet your unique business requirements, from web platforms to enterprise systems.",
        iconName: "Code",
      },
      {
        subsidiaryId: techInnovators.id,
        name: "Enterprise IT Support",
        description:
          "Comprehensive technical support and IT management services to keep your business running smoothly.",
        iconName: "Laptop2",
      },
      {
        subsidiaryId: techInnovators.id,
        name: "Advanced Cybersecurity Solutions",
        description:
          "End-to-end security assessments, penetration testing, and compliance-focused protection plans.",
        iconName: "ShieldCheck",
      },
      {
        subsidiaryId: techInnovators.id,
        name: "Cloud Infrastructure & Migration",
        description:
          "Cloud strategy, implementation, and migration services to modernize and optimize your business operations.",
        iconName: "CloudUpload",
      },
      {
        subsidiaryId: techInnovators.id,
        name: "Technical Training & Development",
        description:
          "Upskilling programs, workshops, and certifications to equip your team with cutting-edge technical knowledge.",
        iconName: "GraduationCap",
      },
    ]);

    await db.insert(services).values([
      {
        subsidiaryId: techStore.id,
        name: "Premium IT Hardware Sales",
        description:
          "A wide range of high-performance laptops, desktops, and workstations for professionals and businesses.",
        iconName: "Monitor",
      },
      {
        subsidiaryId: techStore.id,
        name: "Office & Networking Equipment",
        description:
          "Printers, routers, projectors, and all-in-one devices to fully equip your office environment.",
        iconName: "Router",
      },
      {
        subsidiaryId: techStore.id,
        name: "Installation & Setup Services",
        description:
          "On-site installation, configuration, and system integration for all hardware purchases.",
        iconName: "Tool",
      },
      {
        subsidiaryId: techStore.id,
        name: "Equipment Leasing & Procurement",
        description:
          "Flexible leasing options and procurement services for institutions and enterprise clients.",
        iconName: "PackageCheck",
      },
      {
        subsidiaryId: techStore.id,
        name: "E-Waste Recycling & Data Migration",
        description:
          "Safe disposal of old equipment and secure data migration from legacy systems.",
        iconName: "Recycle",
      },
    ]);

    await db.insert(services).values([
      {
        subsidiaryId: techSolutions.id,
        name: "Technology Consulting & Advisory",
        description:
          "End-to-end digital strategy and technology consulting for organizations seeking transformation and growth.",
        iconName: "Lightbulb",
      },
      {
        subsidiaryId: techSolutions.id,
        name: "Managed IT Solutions",
        description:
          "Fully-managed services combining infrastructure, support, security, and updates into a single package.",
        iconName: "ServerCog",
      },
      {
        subsidiaryId: techSolutions.id,
        name: "End-to-End Tech Ecosystem Packages",
        description:
          "Comprehensive technology bundles that include both hardware and IT services tailored for specific industries.",
        iconName: "Box",
      },
      {
        subsidiaryId: techSolutions.id,
        name: "Tech Audits & Optimization",
        description:
          "Business-wide assessments and actionable plans for optimizing performance, cost, and security.",
        iconName: "ClipboardList",
      },
    ]);

    // Insert testimonials
    await db.insert(testimonials).values([
      {
        subsidiaryId: techInnovators.id,
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
    ]);

    // Create admin user
    const adminPasswordHash = await bcrypt.hash("admin123", 10);
    await db.insert(users).values({
      email: "admin@slgroup.com",
      passwordHash: adminPasswordHash,
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    });

    // Create subsidiary admin users
    const userPasswordHash = await bcrypt.hash("password123", 10);
    await db.insert(users).values([
      {
        email: "tech@slgroup.com",
        passwordHash: userPasswordHash,
        firstName: "Tech",
        lastName: "Admin",
        role: "subsidiary_admin",
        subsidiaryId: techInnovators.id,
      },
      {
        email: "liquor@slgroup.com",
        passwordHash: userPasswordHash,
        firstName: "Liquor",
        lastName: "Admin",
        role: "subsidiary_admin",
        subsidiaryId: liquorSubsidiary.id,
      },
    ]);

    // Create customer user
    await db.insert(users).values({
      email: "customer@example.com",
      passwordHash: userPasswordHash,
      firstName: "John",
      lastName: "Customer",
      role: "customer",
    });

    // Insert products for Liquor & Market
    await db.insert(products).values([
      {
        name: "Château Grand Reserve",
        description:
          "2018 Bordeaux Blend, France. A premium red wine with notes of black currant, cedar, and tobacco.",
        price: 8999, // $89.99
        category: "wine",
        stock: 24,
        isActive: true,
        subsidiaryId: liquorSubsidiary.id,
      },
      {
        name: "Highland Single Malt",
        description:
          "18-Year Aged Whiskey, Scotland. Smooth with hints of honey, oak, and a gentle smoky finish.",
        price: 12999, // $129.99
        category: "spirits",
        stock: 15,
        isActive: true,
        subsidiaryId: liquorSubsidiary.id,
      },
      {
        name: "Craft IPA Collection",
        description:
          "Set of 6 premium craft IPAs from local breweries. Variety of hoppy flavors and strengths.",
        price: 1899, // $18.99
        category: "beer",
        stock: 50,
        isActive: true,
        subsidiaryId: liquorSubsidiary.id,
      },
    ]);

    // Ensure the blog_post_categories table exists
    await db.execute(`
  CREATE TABLE IF NOT EXISTS blog_post_categories (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE CASCADE
  );
`);

    // Ensure the user with id 5 exists
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, 5),
    });

    if (!user) {
      await db.insert(users).values({
        id: 5,
        email: "admin@example.com",
        passwordHash: "hashedpassword", // If using password hash
        role: "admin", // Modify as per your roles
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Step 1: Fetch category IDs dynamically by category slug
    const technologyCategory = await db.query.blogCategories.findFirst({
      where: (blogCategories, { eq }) => eq(blogCategories.slug, "technology"),
    });

    const wineCategory = await db.query.blogCategories.findFirst({
      where: (blogCategories, { eq }) => eq(blogCategories.slug, "wine"),
    });

    if (!technologyCategory) {
      await db.insert(blogCategories).values({
        name: "Technology",
        slug: "technology",
      });
    }

    if (!wineCategory) {
      await db.insert(blogCategories).values({
        name: "Wine",
        slug: "wine",
      });
    }


    // Check if categories exist before inserting blog post categories
    if (technologyCategory && wineCategory) {
      console.log(technologyCategory.id, wineCategory.id);
      // Step 2: Insert blog posts
      const [techPost, winePost] = await db
        .insert(blogPosts)
        .values([
          {
            title: "The Future of Tech Innovation",
            slug: "future-of-tech-innovation",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            excerpt:
              "Exploring emerging technologies and their impact on business operations.",
            featured_image: "/images/future-of-tech.jpg",
            metaTitle: "The Future of Tech Innovation | SL Tech Innovators",
            metaDescription:
              "Explore the emerging technologies and their future impact on business operations.",
            status: "published", // Set to 'published'
            tags: "technology, innovation, future",
            readingTime: 5, // Estimated reading time in minutes
            viewCount: 100,
            is_featured: true,
            allowComments: true,
            authorId: 5, // Admin user
            subsidiaryId: techInnovators.id,
            publishedAt: new Date(),
          },
          {
            title: "Wine Tasting: A Beginner's Guide",
            slug: "wine-tasting-beginners-guide",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            excerpt:
              "Learn the basics of wine tasting and how to appreciate different varieties.",
            featured_image: "/images/wine-tasting.jpg",
            metaTitle: "Wine Tasting: A Beginner's Guide | SL Liquor & Market",
            metaDescription:
              "A beginner's guide to wine tasting, learning about varieties and tasting techniques.",
            status: "published",
            tags: "wine, tasting, guide",
            readingTime: 3,
            viewCount: 50,
            is_featured: false,
            allowComments: true,
            authorId: 5, // Admin user
            subsidiaryId: liquorSubsidiary.id,
            publishedAt: new Date(),
          },
        ])
        .returning();
      // Pass "id" as an array;    
      console.log(techPost.id, winePost.id);
      // Step 3: Insert blog post categories (many-to-many relationship)
      await db.insert(blogPostCategories).values([
        {
          postId: techPost.id, // Post ID for "The Future of Tech Innovation"
          categoryId: technologyCategory.id, // Dynamically fetched category ID for technology
        },
        {
          postId: winePost.id, // Post ID for "Wine Tasting: A Beginner's Guide"
          categoryId: wineCategory.id, // Dynamically fetched category ID for wine
        },
      ]);

      // Step 4: Insert blog comments (if needed)
      await db.insert(blogComments).values([
        {
          postId: techPost.id, // Post ID for "The Future of Tech Innovation"
          userId: 5, // Admin user or replace with actual user ID
          name: "John Doe",
          email: "john.doe@example.com",
          content: "Great article! Really excited about the future of tech.",
          isApproved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: winePost.id, // Post ID for "Wine Tasting: A Beginner's Guide"
          userId: 5, // Admin user or replace with actual user ID
          name: "Jane Smith",
          email: "jane.smith@example.com",
          content:
            "This guide is so helpful! I can't wait to try wine tasting.",
          isApproved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      // If categories do not exist, log a message or handle it
      console.log("One or more categories could not be found.");
    }

    // Insert job listings with updated schema
    await db.insert(jobListings).values([
      {
        title: "Software Developer",
        slug: "software-developer", // Unique slug
        description:
          "We're looking for a talented software developer to join our team.",
        requirements:
          "3+ years of experience with React, Node.js, and TypeScript.",
        benefits: "Health insurance, paid time off, 401(k).",
        department: "Engineering", // Optional department field
        location: "Remote",
        employmentType: "Full-time", // "Full-time", "Part-time", "Contract", "Remote"
        status: "open", // Could be "open", "filled", or "closed"
        applicationDeadline: new Date("2025-05-31T23:59:59"), // Optional deadline
        salary: "$80,000 - $120,000", // Optional salary range
        applicationCount: 0, // Default to 0
        subsidiaryId: techInnovators.id,
        isActive: true,
      },
      {
        title: "Sales Associate",
        slug: "sales-associate", // Unique slug
        description:
          "Join our team as a sales associate at SL Liquor & Market.",
        requirements:
          "Previous retail experience and knowledge of wines and spirits.",
        benefits: "Employee discounts, health insurance.",
        department: "Sales", // Optional department field
        location: "On-site",
        employmentType: "Full-time", // "Full-time", "Part-time", "Contract", "Remote"
        status: "open", // Could be "open", "filled", or "closed"
        applicationDeadline: new Date("2025-06-15T23:59:59"), // Optional deadline
        salary: "Competitive", // Optional salary range
        applicationCount: 0, // Default to 0
        subsidiaryId: liquorSubsidiary.id,
        isActive: true,
      },
    ]);

    // Insert social media posts
    await db.insert(socialMediaPosts).values([
      {
        platform: "instagram",
        postUrl: "https://instagram.com/p/example1",
        imageUrl: "/placeholder.svg?height=300&width=300",
        caption:
          "Exploring new tech innovations at our R&D center! #SLTech #Innovation",
        subsidiaryId: techInnovators.id,
      },
      {
        platform: "instagram",
        postUrl: "https://instagram.com/p/example2",
        imageUrl: "/placeholder.svg?height=300&width=300",
        caption:
          "New wine collection just arrived! Come taste it this weekend. #SLLiquor #WineTasting",
        subsidiaryId: liquorSubsidiary.id,
      },
    ]);


    // seed employees


    await db.insert(employees).values([
      {
        userId: 1, // Example user ID
        position: "Software Engineer",
        department: "Engineering",
        hireDate: new Date(),
        salary: 80000, // Example salary in cents
        status: "active",
        subsidiaryId: techInnovators.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // Example user ID
        position: "Sales Associate",
        department: "Sales",
        hireDate: new Date(),
        salary: 40000, // Example salary in cents
        status: "active",
        subsidiaryId: liquorSubsidiary.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more employee records as needed
    ]);


    // Seed team members
    const teamMembersData = [
      {
        name: "John Smith",
        position: "Chief Executive Officer",
        bio: "John Smith is the CEO of SL Group with over 20 years of experience in business management and strategic leadership. He has successfully led the company through significant growth and expansion into multiple industries.\n\nUnder his leadership, SL Group has become one of the most diversified and respected business groups in the region, with a strong focus on innovation and customer satisfaction.",
        imageUrl: "/images/team/john-smith.jpg",
        email: "john.smith@slgroup.com",
        linkedin: "https://linkedin.com/in/johnsmith",
        twitter: "https://twitter.com/johnsmith",
        expertise: "Strategic Leadership, Business Development, Corporate Finance, Mergers & Acquisitions",
        education: "MBA, Harvard Business School, BSc in Business Administration",
        featured: true,
        sortOrder: 1,
        subsidiaryId: null,
        isLeadership: true,
        isActive: true,
      },
      {
        name: "Sarah Johnson",
        position: "Chief Operating Officer",
        bio: "Sarah Johnson serves as the COO of SL Group, overseeing the day-to-day administrative and operational functions of the company. With her extensive background in operations management, she has implemented efficient processes across all subsidiaries.\n\nSarah is passionate about operational excellence and has been instrumental in streamlining operations across all SL Group subsidiaries.",
        imageUrl: "/images/team/sarah-johnson.jpg",
        email: "sarah.johnson@slgroup.com",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        expertise: "Operations Management, Process Optimization, Supply Chain Management, Team Leadership",
        education: "MSc in Operations Management, BSc in Business Administration",
        featured: true,
        sortOrder: 2,
        subsidiaryId: null,
        isLeadership: true,
        isActive: true,
      },
      {
        name: "Michael Chen",
        position: "Chief Technology Officer",
        bio: "Michael Chen is the CTO of SL Group, responsible for overseeing all technical aspects of the company. He leads our technology strategy and ensures that all our subsidiaries leverage cutting-edge technology to maintain competitive advantage.\n\nWith a background in software engineering and a passion for innovation, Michael has been instrumental in driving digital transformation across the SL Group portfolio.",
        imageUrl: "/images/team/michael-chen.jpg",
        email: "michael.chen@slgroup.com",
        linkedin: "https://linkedin.com/in/michaelchen",
        twitter: "https://twitter.com/michaelchen",
        expertise: "Software Development, Digital Transformation, IT Infrastructure, Cybersecurity",
        education: "MSc in Computer Science, BSc in Software Engineering",
        featured: true,
        sortOrder: 3,
        subsidiaryId: techInnovators.id,
        isLeadership: true,
        isActive: true
      },
      {
        name: "Emily Rodriguez",
        position: "Chief Marketing Officer",
        bio: "Emily Rodriguez is the CMO of SL Group, leading all marketing and brand strategy initiatives across our diverse portfolio of businesses. With her creative approach and data-driven mindset, she has successfully positioned each subsidiary in their respective markets.\n\nEmily has a proven track record of building strong brands and developing effective marketing campaigns that drive business growth.",
        imageUrl: "/images/team/emily-rodriguez.jpg",
        email: "emily.rodriguez@slgroup.com",
        linkedin: "https://linkedin.com/in/emilyrodriguez",
        twitter: "https://twitter.com/emilyrodriguez",
        expertise: "Brand Strategy, Digital Marketing, Consumer Behavior, Market Research",
        education: "MBA with Marketing Specialization, BA in Communications",
        featured: false,
        sortOrder: 4,
        subsidiaryId: techSolutions.id,
        isLeadership: true,
        isActive: true,
      },
      {
        name: "David Okonkwo",
        position: "Chief Financial Officer",
        bio: "David Okonkwo serves as the CFO of SL Group, overseeing all financial operations, reporting, and strategy. His expertise in financial management has been crucial in maintaining the group's strong financial health and supporting its expansion plans.\n\nWith a background in investment banking and corporate finance, David brings valuable insights to the company's financial decision-making process.",
        imageUrl: "/images/team/david-okonkwo.jpg",
        email: "david.okonkwo@slgroup.com",
        linkedin: "https://linkedin.com/in/davidokonkwo",
        expertise: "Financial Planning, Investment Strategy, Risk Management, Corporate Finance",
        education: "CFA, MBA in Finance, BSc in Economics",
        featured: false,
        sortOrder: 5,
        subsidiaryId: null,
        isLeadership: true,
        isActive: true,
      },
      {
        name: "Lisa Wong",
        position: "Head of Human Resources",
        bio: "Lisa Wong leads the Human Resources department at SL Group, focusing on talent acquisition, employee development, and fostering a positive company culture. She has implemented innovative HR practices that have significantly improved employee satisfaction and retention across all subsidiaries.\n\nLisa is passionate about creating an inclusive workplace where employees can thrive and reach their full potential.",
        imageUrl: "/images/team/lisa-wong.jpg",
        email: "lisa.wong@slgroup.com",
        linkedin: "https://linkedin.com/in/lisawong",
        expertise: "Talent Management, Organizational Development, Employee Relations, HR Strategy",
        education: "MA in Human Resource Management, BA in Psychology",
        featured: false,
        sortOrder: 6,
        subsidiaryId: liquorSubsidiary.id,
      },

    ]

    console.log(`Seeding ${teamMembersData.length} team members...`)

    // for (const member of teamMembersData) {
    //   await db.insert(teamMembers).values(member).onConflictDoNothing()
    // }

    console.log("Team members seeded successfully!")

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }

  // seed inventory 
  await db.insert(inventory).values([
    {
      productId: 1, // Example product ID
      quantity: 100,
      reorderLevel: 20,
      reorderQuantity: 50,
      location: "Warehouse A",
    },
    {
      productId: 2, // Example product ID
      quantity: 50,
      reorderLevel: 10,
      reorderQuantity: 30,
      location: "Warehouse B",
    },
    // Add more inventory records as needed
  ]);
  // seed orders 

  // Insert products for Tech Store

  // seed notifications

}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  });
