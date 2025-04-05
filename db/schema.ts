// import { relations } from "drizzle-orm"
// import { integer, pgTable, serial, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core"

// // Subsidiaries table
// export const subsidiaries = pgTable("subsidiaries", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   slug: varchar("slug", { length: 100 }).notNull().unique(),
//   tagline: varchar("tagline", { length: 255 }),
//   description: text("description"),
//   iconName: varchar("icon_name", { length: 50 }),
//   primaryColor: varchar("primary_color", { length: 20 }),
//   secondaryColor: varchar("secondary_color", { length: 20 }),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// })

// // Services table
// export const services = pgTable("services", {
//   id: serial("id").primaryKey(),
//   subsidiaryId: integer("subsidiary_id")
//     .notNull()
//     .references(() => subsidiaries.id),
//   name: varchar("name", { length: 100 }).notNull(),
//   description: text("description"),
//   iconName: varchar("icon_name", { length: 50 }),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// })

// // Testimonials table
// export const testimonials = pgTable("testimonials", {
//   id: serial("id").primaryKey(),
//   subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
//   quote: text("quote").notNull(),
//   author: varchar("author", { length: 100 }).notNull(),
//   position: varchar("position", { length: 100 }),
//   rating: integer("rating"),
//   imageUrl: varchar("image_url", { length: 255 }),
//   createdAt: timestamp("created_at").defaultNow(),
//   updatedAt: timestamp("updated_at").defaultNow(),
// })

// // Contact form submissions
// export const contactSubmissions = pgTable("contact_submissions", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100 }).notNull(),
//   email: varchar("email", { length: 100 }).notNull(),
//   phone: varchar("phone", { length: 20 }),
//   company: varchar("company", { length: 100 }),
//   interest: varchar("interest", { length: 50 }),
//   message: text("message").notNull(),
//   createdAt: timestamp("created_at").defaultNow(),
//   isRead: boolean("is_read").default(false),
// })

// // Define relations
// export const subsidiariesRelations = relations(subsidiaries, ({ many }) => ({
//   services: many(services),
//   testimonials: many(testimonials),
// }))

// export const servicesRelations = relations(services, ({ one }) => ({
//   subsidiary: one(subsidiaries, {
//     fields: [services.subsidiaryId],
//     references: [subsidiaries.id],
//   }),
// }))

// export const testimonialsRelations = relations(testimonials, ({ one }) => ({
//   subsidiary: one(subsidiaries, {
//     fields: [testimonials.subsidiaryId],
//     references: [subsidiaries.id],
//   }),
// }))


import { relations } from "drizzle-orm"
import { integer, pgTable, serial, text, timestamp, varchar, boolean, json, pgEnum } from "drizzle-orm/pg-core"

// Subsidiaries table
export const subsidiaries = pgTable("subsidiaries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  tagline: varchar("tagline", { length: 255 }),
  description: text("description"),
  iconName: varchar("icon_name", { length: 50 }),
  primaryColor: varchar("primary_color", { length: 20 }),
  secondaryColor: varchar("secondary_color", { length: 20 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  subsidiaryId: integer("subsidiary_id")
    .notNull()
    .references(() => subsidiaries.id),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  iconName: varchar("icon_name", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  quote: text("quote").notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  position: varchar("position", { length: 100 }),
  rating: integer("rating"),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 100 }),
  interest: varchar("interest", { length: 50 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  isRead: boolean("is_read").default(false),
})

// User roles enum
export const roleEnum = pgEnum("role", ["admin", "subsidiary_admin", "staff", "customer"])

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  role: roleEnum("role").default("customer"),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Sessions table
export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at").notNull(),
})

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImageUrl: varchar("featured_image_url", { length: 255 }),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Job listings
export const jobListings = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  requirements: text("requirements"),
  location: varchar("location", { length: 100 }),
  type: varchar("type", { length: 50 }), // full-time, part-time, contract
  subsidiaryId: integer("subsidiary_id")
    .notNull()
    .references(() => subsidiaries.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Job applications
export const jobApplications = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id")
    .notNull()
    .references(() => jobListings.id),
  applicantName: varchar("applicant_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  resumeUrl: varchar("resume_url", { length: 255 }),
  coverLetter: text("cover_letter"),
  status: varchar("status", { length: 50 }).default("pending"), // pending, reviewed, interviewed, rejected, hired
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Social media posts
export const socialMediaPosts = pgTable("social_media_posts", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(), // instagram, facebook, tiktok, etc.
  postUrl: varchar("post_url", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  caption: text("caption"),
  subsidiaryId: integer("subsidiary_id").references(() => subsidiaries.id),
  createdAt: timestamp("created_at").defaultNow(),
})

// Products for Liquor & Market
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: integer("price").notNull(), // stored in cents
  imageUrl: varchar("image_url", { length: 255 }),
  category: varchar("category", { length: 100 }), // wine, spirits, beer, etc.
  stock: integer("stock").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Appointments for Liquor & Market
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  date: timestamp("date").notNull(),
  purpose: text("purpose"),
  status: varchar("status", { length: 50 }).default("scheduled"), // scheduled, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Orders for Liquor & Market
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status", { length: 50 }).default("pending"), // pending, processing, shipped, delivered, cancelled
  total: integer("total").notNull(), // stored in cents
  shippingAddress: json("shipping_address"),
  paymentIntentId: varchar("payment_intent_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Order items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(), // price at time of purchase, in cents
})

// Define relations
export const subsidiariesRelations = relations(subsidiaries, ({ many }) => ({
  services: many(services),
  testimonials: many(testimonials),
  users: many(users),
  blogPosts: many(blogPosts),
  jobListings: many(jobListings),
  socialMediaPosts: many(socialMediaPosts),
}))

export const servicesRelations = relations(services, ({ one }) => ({
  subsidiary: one(subsidiaries, {
    fields: [services.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  subsidiary: one(subsidiaries, {
    fields: [testimonials.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const usersRelations = relations(users, ({ one, many }) => ({
  subsidiary: one(subsidiaries, {
    fields: [users.subsidiaryId],
    references: [subsidiaries.id],
  }),
  sessions: many(sessions),
  blogPosts: many(blogPosts),
  appointments: many(appointments),
  orders: many(orders),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  subsidiary: one(subsidiaries, {
    fields: [blogPosts.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const jobListingsRelations = relations(jobListings, ({ one, many }) => ({
  subsidiary: one(subsidiaries, {
    fields: [jobListings.subsidiaryId],
    references: [subsidiaries.id],
  }),
  applications: many(jobApplications),
}))

export const jobApplicationsRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobListings, {
    fields: [jobApplications.jobId],
    references: [jobListings.id],
  }),
}))

export const socialMediaPostsRelations = relations(socialMediaPosts, ({ one }) => ({
  subsidiary: one(subsidiaries, {
    fields: [socialMediaPosts.subsidiaryId],
    references: [subsidiaries.id],
  }),
}))

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}))

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}))

